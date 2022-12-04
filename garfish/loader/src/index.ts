import {
  SyncHook,
  SyncWaterfallHook,
  PluginSystem,
  AsyncHook,
} from '@garfish/hooks';
import {
  error,
  __LOADER_FLAG__,
  isJsType,
  isCssType,
  isHtmlType,
} from '@garfish/utils';
import { StyleManager } from './managers/style';
import { ModuleManager } from './managers/module';
import { TemplateManager } from './managers/template';
import { JavaScriptManager } from './managers/javascript';
import { getRequest, copyResult, mergeConfig } from './utils';
import { FileTypes, cachedDataSet, AppCacheContainer } from './appCache';

// Export types and manager constructor
export * from './managers/style';
export * from './managers/module';
export * from './managers/template';
export * from './managers/javascript';

export type Manager =
  | StyleManager
  | ModuleManager
  | TemplateManager
  | JavaScriptManager;

export interface LoaderOptions {
  /**
   * The unit is byte
   */
  maxSize?: number;
}

export interface CacheValue<T extends Manager> {
  url: string;
  code: string;
  size: number;
  scope: string;
  fileType: FileTypes | '';
  resourceManager: T | null;
}

export interface LoadedHookArgs<T extends Manager> {
  result: Response;
  value: CacheValue<T>;
}

export enum CrossOriginCredentials {
  anonymous = 'same-origin',
  'use-credentials' = 'include',
}

type LifeCycle = Loader['hooks']['lifecycle'];

export type LoaderLifecycle = Partial<{
  [k in keyof LifeCycle]: Parameters<LifeCycle[k]['on']>[0];
}>;

export interface LoaderPlugin extends LoaderLifecycle {
  name: string;
  version?: string;
}

export class Loader {
  public personalId = __LOADER_FLAG__;
  public StyleManager = StyleManager;
  public ModuleManager = ModuleManager;
  public TemplateManager = TemplateManager;
  public JavaScriptManager = JavaScriptManager;
  /** @deprecated */
  public requestConfig: RequestInit | ((url: string) => RequestInit);

  public hooks = new PluginSystem({ /* 之前已经看过hooks 源码  loader 的所有生命周期如下  */
    error: new SyncHook<[Error, { scope: string }], void>(),
    loaded: new SyncWaterfallHook<LoadedHookArgs<Manager>>('loaded'),
    clear: new SyncWaterfallHook<{
      scope: string;
      fileType?: FileTypes;
    }>('clear'),
    beforeLoad: new SyncWaterfallHook<{
      url: string;
      scope: string;
      requestConfig: ResponseInit;
    }>('beforeLoad'),
    fetch: new AsyncHook<[string, RequestInit], Response | void | false>(
      'fetch',
    ),
  });

  private options: LoaderOptions;
  private loadingList: Record<string, null | Promise<CacheValue<any>>>;
  private cacheStore: { [name: string]: AppCacheContainer };

  constructor(options?: LoaderOptions) {
    this.options = options || {};
    this.loadingList = Object.create(null);
    this.cacheStore = Object.create(null);
  }

  setOptions(options: Partial<LoaderOptions>) {
    this.options = { ...this.options, ...options };
  }

  clear(scope: string, fileType?: FileTypes) {
    const appCacheContainer = this.cacheStore[scope];
    if (appCacheContainer) {
      appCacheContainer.clear(fileType);
      this.hooks.lifecycle.clear.emit({ scope, fileType });
    }
  }

  clearAll(fileType?: FileTypes) {
    for (const scope in this.cacheStore) {
      this.clear(scope, fileType);
    }
  }
  /* 在已有的生命周期上注册事件 */
  usePlugin(options: LoaderPlugin) { 
    this.hooks.usePlugin(options);
  }
 /* 在已有的生命周期上注册事件 这里已经限定了 name 为 loader-lifecycle 后面是有什么作用？？？ */
  setLifeCycle(lifeCycle: Partial<LoaderLifecycle>) {
    this.hooks.usePlugin({
      name: 'loader-lifecycle',
      ...lifeCycle,
    });
  }

  loadModule(url: string) {
    return this.load<ModuleManager>({
      scope: 'modules',
      url,
      isRemoteModule: true,
    });
  }

  // Unable to know the final data type, so through "generics"
  async load<T extends Manager>({  /* 先不细究 就是用来加载远程资源的 */
    scope,
    url,
    isRemoteModule = false,
    crossOrigin = 'anonymous',
    defaultContentType = '',
  }: {
    scope: string;
    url: string;
    isRemoteModule?: boolean;
    crossOrigin?: NonNullable<HTMLScriptElement['crossOrigin']>;
    defaultContentType?: string;
  }): Promise<LoadedHookArgs<T>['value']> {
    const { options, loadingList, cacheStore } = this;

    const res = loadingList[url]; /* 先从 loadingList 中查看是否存在 url 为key 如果存在就返回 */
    if (res) {
      return res;
    }
    
    let appCacheContainer = cacheStore[scope]; /* 如果 loadingList url 不存在  查看是否存在当前的scope  */
    if (!appCacheContainer) {
      appCacheContainer = cacheStore[scope] = new AppCacheContainer(
        options.maxSize,
      );
    }

    if (appCacheContainer.has(url)) {
      return Promise.resolve(copyResult(appCacheContainer.get(url)));
    } else {
      // If other containers have cache
      for (const key in cacheStore) {
        const container = cacheStore[key];
        if (container !== appCacheContainer) {
          if (container.has(url)) {
            const result = container.get(url);
            cachedDataSet.add(result);   // appCacheContainer 是通过url 来缓存的  因此加入是多个应用引用了 同一个react 此时就会命中
            appCacheContainer.set(url, result, result.fileType);
            return Promise.resolve(copyResult(result));
          }
        }
      }
    }

    const requestConfig = mergeConfig(this, url);
    // Tells browsers to include credentials in both same- and cross-origin requests, and always use any credentials sent back in responses.
    requestConfig.credentials = CrossOriginCredentials[crossOrigin];//告诉浏览器在同源请求和跨源请求中都包含凭据，并始终使用在响应中发送回的任何凭据。 
    const resOpts = this.hooks.lifecycle.beforeLoad.emit({    // fetch 的  credentials:include | same-origin | omit
      url,                                                    // 一些 html 的标签设置 crossorigin: anonymous | use-credentials
      scope,
      requestConfig,
    });

    const request = getRequest(this.hooks.lifecycle.fetch);  // {type:"fetch",listeners:Set<>} // 如果你想要自定义 fetch 的话 只能注册一次，因为 fetch 是 AsyncHook 多次注册 只有第一次会执行
    const loadRes = request(resOpts.url, resOpts.requestConfig)
      .then(({ code, size, result, type,mimeType }) => {
        let managerCtor,
          fileType: FileTypes | '' = '';

        if (isRemoteModule) {
          fileType = FileTypes.module;
          managerCtor = ModuleManager;
        } else if (
          isHtmlType({ type, src: result.url }) ||
          isHtmlType({
            type: defaultContentType,
          })
        ) {
          fileType = FileTypes.template;
          managerCtor = TemplateManager;
        } else if (
          isJsType({ type: defaultContentType }) ||
          isJsType({ type, src: result.url })
        ) {
          fileType = FileTypes.js;
          managerCtor = JavaScriptManager;
        } else if (
          isCssType({ src: result.url, type }) ||
          isCssType({
            type: defaultContentType,
          })
        ) {
          fileType = FileTypes.css;
          managerCtor = StyleManager;
        }

        // 不同的类型创建不同的 manager     Use result.url, resources may be redirected
        const resourceManager: Manager | null = managerCtor
          ? new managerCtor(code, result.url)
          : null;

        // The results will be cached this time.
        // So, you can transform the request result.
        const data = this.hooks.lifecycle.loaded.emit({
          result,
          value: {
            url,
            scope,
            resourceManager,
            fileType: fileType || '',
            // For performance reasons, take an approximation
            size: size || code.length,
            code: resourceManager ? '' : code,
          },
        });

        fileType && appCacheContainer.set(url, data.value, fileType);
        return copyResult(data.value as any);
      })
      .catch((e) => {
        __DEV__ && error(e);
        this.hooks.lifecycle.error.emit(e, { scope });
        throw e; // Let the upper application catch the error
      })
      .finally(() => {
        loadingList[url] = null;   // 将结果返回 clone 一下 返回 同时下面又通过 url 将结果再次缓存了一次
      });

    loadingList[url] = loadRes;
    return loadRes;
  }
}
