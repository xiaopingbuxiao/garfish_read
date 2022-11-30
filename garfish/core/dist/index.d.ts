import { PluginSystem, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook } from '@garfish/hooks';
import * as LoaderInterface from '@garfish/loader';
import { Loader, TemplateManager } from '@garfish/loader';
import { EventEmitter2 } from 'eventemitter2';
import { Queue } from '@garfish/utils';

declare module '@garfish/core' {
    export default interface Garfish {
        preloadApp: (appName: string) => void;
    }
}

declare const HOOKS_API: {
    SyncHook: typeof SyncHook;
    AsyncHook: typeof AsyncHook;
    SyncWaterfallHook: typeof SyncWaterfallHook;
    AsyncWaterfallHook: typeof AsyncWaterfallHook;
};
declare class Garfish extends EventEmitter2 {
    running: boolean;
    version: string;
    flag: symbol;
    loader: Loader;
    hooks: PluginSystem<{
        beforeBootstrap: SyncHook<[interfaces.Options], void>;
        bootstrap: SyncHook<[interfaces.Options], void>;
        beforeRegisterApp: SyncHook<[interfaces.AppInfo | interfaces.AppInfo[]], void>;
        registerApp: SyncHook<[Record<string, interfaces.AppInfo>], void>;
        beforeLoad: AsyncHook<[interfaces.AppInfo], false | void | Promise<false | void>>;
        afterLoad: AsyncHook<[interfaces.AppInfo, interfaces.App | null], false | void | Promise<false | void>>;
        errorLoadApp: SyncHook<[Error, interfaces.AppInfo], void>;
    }>;
    channel: EventEmitter2;
    options: interfaces.Options;
    externals: Record<string, any>;
    activeApps: Array<interfaces.App>;
    plugins: interfaces.Plugins;
    cacheApps: Record<string, interfaces.App>;
    appInfos: Record<string, interfaces.AppInfo>;
    private loading;
    get props(): Record<string, any>;
    constructor(options: interfaces.Options);
    setOptions(options: Partial<interfaces.Options>): this;
    createPluginSystem<T extends (api: typeof HOOKS_API) => any>(callback: T): PluginSystem<ReturnType<T>>;
    usePlugin(plugin: (context: Garfish) => interfaces.Plugin, ...args: Array<any>): this;
    run(options?: interfaces.Options): this;
    registerApp(list: interfaces.AppInfo | Array<interfaces.AppInfo>): this;
    setExternal(nameOrExtObj: string | Record<string, any>, value?: any): this;
    loadApp(appName: string, options?: Partial<Omit<interfaces.AppInfo, 'name'>>): Promise<interfaces.App | null>;
}

declare class ESModuleLoader {
    private app;
    private globalVarKey;
    private moduleCache;
    private lock;
    constructor(app: App);
    private execModuleCode;
    private createBlobUrl;
    private setBlobUrl;
    private fetchModuleResource;
    private getUrl;
    private preloadStaticModuleAsync;
    private analysisModule;
    destroy(): void;
    load(code: string, env: Record<string, any>, url?: string, options?: interfaces.ExecScriptOptions): Promise<void>;
}

interface PerformanceData {
    resourceLoadTime: number;
    blankScreenTime: number;
    firstScreenTime: number;
    isFirstRender: boolean;
    entry: string;
    action: string;
}
interface CallbackFunction {
    (performanceData: PerformanceData): void;
}
interface Config {
    attributes: boolean;
    childList: boolean;
    subtree: boolean;
}
interface IOptions {
    subAppRootSelector: interfaces.DomGetter;
    domObserverMaxTime?: number;
    waitSubAppNotifyMaxTime?: number;
    observeConfig?: Config;
}
declare class SubAppObserver {
    private observer;
    private timeLag;
    private reportTimeLag;
    private observeTimer;
    private dataTimer;
    private entry;
    private subAppBeforeLoadTime;
    private subAppBeforeMountTime;
    private subAppStartPageShowTime;
    private subAppPageShowTime;
    private domQuerySelector;
    private finishAction;
    private config;
    private isRecordFinish;
    private isCallBackFinish;
    private isStartShowFlag;
    private isSubAppNotifyFinish;
    private targetSubscriber;
    private cbEntryList;
    private performanceData;
    constructor(options: IOptions);
    subscribePerformanceData(callback: CallbackFunction): void;
    subscribePerformanceDataOnce(callback: CallbackFunction): void;
    unsubscribePerformanceData(callback: CallbackFunction): void;
    subAppBeforeLoad(entry: string): void;
    subAppBeforeMount(): void;
    subAppUnmount(): void;
    afterRenderNotify(): void;
    private _mutationObserverCallback;
    private _subAppEndObserver;
    private _subAppStartObserver;
    private _subAppPerformanceDataHandle;
    private _subAppClickEventObserver;
    private _handleCallback;
    private _handleSubscribeCallback;
}

declare type CustomerLoader = (provider: interfaces.Provider, appInfo: interfaces.AppInfo, path?: string) => Promise<interfaces.LoaderResult | void> | interfaces.LoaderResult | void;
declare type AppInfo = interfaces.AppInfo & {
    appId?: number;
};
declare class App {
    appId: number;
    scriptCount: number;
    display: boolean;
    mounted: boolean;
    strictIsolation: boolean;
    esmQueue: Queue;
    esModuleLoader: ESModuleLoader;
    name: string;
    isHtmlMode: boolean;
    global: any;
    appContainer: HTMLElement;
    cjsModules: Record<string, any>;
    htmlNode: HTMLElement | ShadowRoot;
    customExports: Record<string, any>;
    sourceList: Array<{
        tagName: string;
        url: string;
    }>;
    sourceListMap: Map<string, {
        tagName: string;
        url: string;
    }>;
    appInfo: AppInfo;
    context: Garfish;
    hooks: interfaces.AppHooks;
    provider?: interfaces.Provider;
    entryManager: TemplateManager;
    appPerformance: SubAppObserver;
    customLoader?: CustomerLoader;
    childGarfishConfig: interfaces.ChildGarfishConfig;
    private active;
    mounting: boolean;
    private unmounting;
    private resources;
    private globalEnvVariables;
    constructor(context: Garfish, appInfo: AppInfo, entryManager: TemplateManager, resources: interfaces.ResourceModules, isHtmlMode: boolean, customLoader?: CustomerLoader);
    get rootElement(): Document | Element | ShadowRoot;
    get getSourceList(): {
        tagName: string;
        url: string;
    }[];
    addSourceList(sourceInfo: Array<{
        tagName: string;
        url: string;
    }> | {
        tagName: string;
        url: string;
    }): void;
    getProvider(): Promise<interfaces.Provider>;
    isNoEntryScript(url?: string): boolean | undefined;
    execScript(code: string, env: Record<string, any>, url?: string, options?: interfaces.ExecScriptOptions): void;
    runCode(code: string, env: Record<string, any>, url?: string, options?: interfaces.ExecScriptOptions): void;
    show(): Promise<boolean>;
    hide(): boolean;
    mount(): Promise<boolean>;
    unmount(): boolean;
    getExecScriptEnv(noEntry?: boolean): {
        require: any;
        __GARFISH_EXPORTS__: Record<string, any>;
        __GARFISH_GLOBAL_ENV__: Record<string, any>;
    } | {
        __GARFISH_EXPORTS__: Record<string, any>;
        __GARFISH_GLOBAL_ENV__: Record<string, any>;
    };
    compileAndRenderContainer(): Promise<{
        asyncScripts: Promise<void>;
    }>;
    private canMount;
    private stopMountAndClearEffect;
    private callRender;
    private callDestroy;
    private addContainer;
    private renderTemplate;
    private checkAndGetProvider;
}

declare function globalLifecycle(): PluginSystem<{
    beforeBootstrap: SyncHook<[interfaces.Options], void>;
    bootstrap: SyncHook<[interfaces.Options], void>;
    beforeRegisterApp: SyncHook<[interfaces.AppInfo | interfaces.AppInfo[]], void>;
    registerApp: SyncHook<[Record<string, interfaces.AppInfo>], void>;
    beforeLoad: AsyncHook<[interfaces.AppInfo], false | void | Promise<false | void>>;
    afterLoad: AsyncHook<[interfaces.AppInfo, interfaces.App | null], false | void | Promise<false | void>>;
    errorLoadApp: SyncHook<[Error, interfaces.AppInfo], void>;
}>;
declare function appLifecycle(): PluginSystem<{
    beforeEval: SyncHook<[interfaces.AppInfo, string, (Record<string, any> | undefined)?, (string | undefined)?, ({
        async?: boolean | undefined;
        noEntry?: boolean | undefined;
    } | undefined)?], void>;
    afterEval: SyncHook<[interfaces.AppInfo, string, (Record<string, any> | undefined)?, (string | undefined)?, ({
        async?: boolean | undefined;
        noEntry?: boolean | undefined;
    } | undefined)?], void>;
    beforeMount: SyncHook<[interfaces.AppInfo, interfaces.App, boolean], void>;
    afterMount: SyncHook<[interfaces.AppInfo, interfaces.App, boolean], void>;
    errorMountApp: SyncHook<[Error, interfaces.AppInfo], void>;
    beforeUnmount: SyncHook<[interfaces.AppInfo, interfaces.App, boolean], void>;
    afterUnmount: SyncHook<[interfaces.AppInfo, interfaces.App, boolean], void>;
    errorUnmountApp: SyncHook<[Error, interfaces.AppInfo], void>;
    errorExecCode: SyncHook<[Error, interfaces.AppInfo, string, (Record<string, any> | undefined)?, (string | undefined)?, ({
        async?: boolean | undefined;
        noEntry?: boolean | undefined;
    } | undefined)?], void>;
}>;

declare type AppInterface = App;
declare type GarfishInterface = Garfish;
declare namespace interfaces {
    interface StyleManager extends LoaderInterface.StyleManager {
    }
    interface ModuleManager extends LoaderInterface.ModuleManager {
    }
    interface TemplateManager extends LoaderInterface.TemplateManager {
    }
    interface JavaScriptManager extends LoaderInterface.JavaScriptManager {
    }
    interface ResourceModules {
        link: Array<StyleManager>;
        js: Array<JavaScriptManager>;
        modules: Array<ModuleManager>;
    }
    interface App extends AppInterface {
    }
    interface Garfish extends GarfishInterface {
    }
    type AppHooks = ReturnType<typeof appLifecycle>;
    type GlobalHooks = ReturnType<typeof globalLifecycle>;
    type Lifecycle = AppHooks['lifecycle'] & GlobalHooks['lifecycle'];
    type PluginLifecycle = {
        [k in keyof Lifecycle]: Parameters<Lifecycle[k]['on']>[0];
    };
    type DomGetter = string | (() => Element | null) | (() => Promise<Element>);
    interface LoaderResult {
        mount: interfaces.Provider['render'];
        unmount: interfaces.Provider['destroy'];
    }
    interface AppRenderInfo {
        isMount?: boolean;
        isUnmount?: boolean;
    }
    interface Provider {
        destroy: ({ appName, dom, appRenderInfo, props, }: {
            appName: string;
            dom: Element | ShadowRoot | Document;
            appRenderInfo: AppRenderInfo;
            props?: Record<string, any>;
        }) => void;
        render: ({ appName, dom, basename, appRenderInfo, props, }: {
            appName: String;
            dom: Element | ShadowRoot | Document;
            basename?: string;
            appRenderInfo: AppRenderInfo;
            props?: Record<string, any>;
        }) => void;
    }
    interface SandboxConfig {
        open?: boolean;
        snapshot?: boolean;
        fixBaseUrl?: boolean;
        disableWith?: boolean;
        strictIsolation?: boolean;
    }
    interface Config {
        appID?: string;
        nested?: boolean;
        apps?: Array<AppInfo>;
        disableStatistics?: boolean;
        disablePreloadApp?: boolean;
        plugins?: Array<(context: Garfish) => Plugin>;
    }
    interface AppGlobalConfig {
        basename?: string;
        nested?: boolean;
        domGetter?: DomGetter;
        props?: Record<string, any>;
        sandbox?: false | SandboxConfig;
        disableSourceListCollect?: boolean;
    }
    interface GlobalLifecycle extends Partial<PluginLifecycle> {
        customLoader?: CustomerLoader;
        loader?: LoaderInterface.LoaderLifecycle;
    }
    type AppLifecycle = Pick<GlobalLifecycle, keyof AppHooks['lifecycle']> & {
        customLoader?: CustomerLoader;
    };
    type AppConfig = Partial<AppGlobalConfig> & {
        name: string;
        entry: string;
        cache?: boolean;
        activeWhen?: string | ((path: string) => boolean);
        nested?: any;
        noCheckProvider?: boolean;
    };
    interface Options extends Config, AppGlobalConfig, GlobalLifecycle {
    }
    interface AppInfo extends AppConfig, AppLifecycle {
    }
    interface Plugin extends Partial<PluginLifecycle> {
        name: string;
        version?: string;
        hooks?: PluginSystem<any>;
    }
    interface Plugins {
    }
    interface ExecScriptOptions {
        node?: Node;
        async?: boolean;
        noEntry?: boolean;
        isInline?: boolean;
        isModule?: boolean;
        originScript?: HTMLScriptElement;
    }
    interface ChildGarfishConfig {
        sandbox?: {
            noEntryScripts?: string[];
        };
    }
}

export { Garfish as default, interfaces };
