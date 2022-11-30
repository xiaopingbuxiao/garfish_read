import { PluginSystem, SyncHook, SyncWaterfallHook, AsyncHook } from '@garfish/hooks';
import { Node, DOMApis } from '@garfish/utils';

interface ScopeData {
    appName: string;
    rootElId: string;
}
declare class StyleManager {
    styleCode: string;
    url: string | null;
    scopeData: ScopeData | null;
    private depsStack;
    constructor(styleCode: string, url?: string);
    correctPath(baseUrl?: string): void;
    transformCode(code: string): string;
    setDep(node: Node): void;
    setScope(data: ScopeData): void;
    isSameOrigin(node: Node): boolean;
    renderAsStyleElement(extraCode?: string): HTMLStyleElement;
    clone(): any;
}

declare class ModuleManager {
    moduleCode: string;
    url: string | null;
    originUrl?: string;
    alias: string | null;
    constructor(moduleCode: string, url?: string);
    setAlias(name: string): void;
    clone(): any;
}

declare type Renderer = Record<string, (node: Node) => null | Element | Comment>;
declare class TemplateManager {
    url: string | undefined;
    DOMApis: DOMApis;
    astTree: Array<Node>;
    private pretreatmentStore;
    constructor(template: string, url?: string);
    getNodesByTagName<T>(...tags: Array<keyof T>): Record<keyof T, Node[]>;
    createElements(renderer: Renderer, parent: Element): Element[];
    toResolveUrl(node: Node, type: string, baseUrl?: string): void;
    ignoreChildNodesCreation(node: Element): Element;
    findAllMetaNodes(): Node[];
    findAllLinkNodes(): Node[];
    findAllJsNodes(): Node[];
    findAttributeValue(node: Node, type: string): string | undefined;
    cloneNode(node: Node): Node;
    clone(): any;
}

declare class JavaScriptManager {
    async: boolean;
    mimeType: string;
    scriptCode: string;
    url?: string;
    private depsStack;
    constructor(scriptCode: string, url?: string);
    isModule(): boolean;
    isInlineScript(): boolean;
    setMimeType(mimeType: string): void;
    setAsyncAttribute(val: boolean): void;
    setDep(node: Node): void;
    isSameOrigin(node: Node): boolean;
    clone(): any;
}

declare enum FileTypes {
    js = "js",
    css = "css",
    module = "module",
    template = "template"
}

declare type Manager = StyleManager | ModuleManager | TemplateManager | JavaScriptManager;
interface LoaderOptions {
    /**
     * The unit is byte
     */
    maxSize?: number;
}
interface CacheValue<T extends Manager> {
    url: string;
    code: string;
    size: number;
    scope: string;
    fileType: FileTypes | '';
    resourceManager: T | null;
}
interface LoadedHookArgs<T extends Manager> {
    result: Response;
    value: CacheValue<T>;
}
declare enum CrossOriginCredentials {
    anonymous = "same-origin",
    'use-credentials' = "include"
}
declare type LifeCycle = Loader['hooks']['lifecycle'];
declare type LoaderLifecycle = Partial<{
    [k in keyof LifeCycle]: Parameters<LifeCycle[k]['on']>[0];
}>;
interface LoaderPlugin extends LoaderLifecycle {
    name: string;
    version?: string;
}
declare class Loader {
    personalId: symbol;
    StyleManager: typeof StyleManager;
    ModuleManager: typeof ModuleManager;
    TemplateManager: typeof TemplateManager;
    JavaScriptManager: typeof JavaScriptManager;
    /** @deprecated */
    requestConfig: RequestInit | ((url: string) => RequestInit);
    hooks: PluginSystem<{
        error: SyncHook<[Error, {
            scope: string;
        }], void>;
        loaded: SyncWaterfallHook<LoadedHookArgs<Manager>>;
        clear: SyncWaterfallHook<{
            scope: string;
            fileType?: FileTypes | undefined;
        }>;
        beforeLoad: SyncWaterfallHook<{
            url: string;
            scope: string;
            requestConfig: ResponseInit;
        }>;
        fetch: AsyncHook<[string, RequestInit], false | void | Response>;
    }>;
    private options;
    private loadingList;
    private cacheStore;
    constructor(options?: LoaderOptions);
    setOptions(options: Partial<LoaderOptions>): void;
    clear(scope: string, fileType?: FileTypes): void;
    clearAll(fileType?: FileTypes): void;
    usePlugin(options: LoaderPlugin): void;
    setLifeCycle(lifeCycle: Partial<LoaderLifecycle>): void;
    loadModule(url: string): Promise<CacheValue<ModuleManager>>;
    load<T extends Manager>({ scope, url, isRemoteModule, crossOrigin, defaultContentType, }: {
        scope: string;
        url: string;
        isRemoteModule?: boolean;
        crossOrigin?: NonNullable<HTMLScriptElement['crossOrigin']>;
        defaultContentType?: string;
    }): Promise<LoadedHookArgs<T>['value']>;
}

export { CacheValue, CrossOriginCredentials, JavaScriptManager, LoadedHookArgs, Loader, LoaderLifecycle, LoaderOptions, LoaderPlugin, Manager, ModuleManager, StyleManager, TemplateManager };
