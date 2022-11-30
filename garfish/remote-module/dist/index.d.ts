import * as _garfish_loader from '@garfish/loader';
import { ModuleManager, Loader } from '@garfish/loader';
import * as _garfish_hooks from '@garfish/hooks';
import { PluginSystem, SyncHook, SyncWaterfallHook, AsyncWaterfallHook } from '@garfish/hooks';

declare class Actuator {
    private manager;
    env: Record<string, any>;
    constructor(manager: ModuleManager, externals?: Record<string, any>);
    execScript(): Record<string, any>;
}

declare type PartialPart<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]-?: T[P];
} & {
    [P in K]?: T[P];
};
declare type ModuleConfig = PartialPart<Required<Omit<ModuleInfo, 'version'> & {
    alias: Record<string, string>;
}>, 'externals'>;
interface ModuleInfo {
    cache: boolean;
    version: string;
    externals: Record<string, any>;
    error: null | ((err: Error, info: ModuleInfo, alias: string) => any);
    adapter: null | ((cjsModule: Record<string, any>) => Record<string, any>);
}
declare const cacheModules: any;
declare const loader: Loader;

interface BeforeLoadArgs {
    url: string;
    options?: ModuleConfig;
}
interface afterLoadArgs {
    url: string;
    code: string;
    exports: Record<string, any>;
}
declare const hooks: PluginSystem<{
    preloaded: SyncHook<[ModuleManager], any>;
    initModule: SyncHook<[Actuator], any>;
    beforeLoadModule: SyncWaterfallHook<BeforeLoadArgs>;
    asyncBeforeLoadModule: AsyncWaterfallHook<BeforeLoadArgs>;
    afterLoadModule: SyncWaterfallHook<afterLoadArgs>;
    asyncAfterLoadModule: AsyncWaterfallHook<afterLoadArgs>;
}>;

declare function preload(urls: string | Array<string>): Promise<_garfish_loader.CacheValue<_garfish_loader.ModuleManager>[]>;

declare type ESModuleResult<T> = {
    default: T;
    __esModule: true;
};
declare function esModule<T extends Promise<any>>(obj: T): Promise<ESModuleResult<T extends Promise<infer P> ? P : T>>;
declare function esModule<T extends ESModuleResult<any>>(obj: T): T;
declare function esModule<T>(obj: T): ESModuleResult<T>;

declare function loadModule(urlOrAlias: string, options?: ModuleConfig): Promise<Record<string, any> | null>;

declare function loadModuleSync(urlOrAlias: string, options?: ModuleConfig): Record<string, any> | null;

declare function setModuleConfig(obj: Partial<ModuleConfig>): void;

declare const Apis: {
    preload: typeof preload;
    esModule: typeof esModule;
    loadModule: typeof loadModule;
    loadModuleSync: typeof loadModuleSync;
    setModuleConfig: typeof setModuleConfig;
    hooks: _garfish_hooks.PluginSystem<{
        preloaded: _garfish_hooks.SyncHook<[_garfish_loader.ModuleManager], any>;
        initModule: _garfish_hooks.SyncHook<[Actuator], any>;
        beforeLoadModule: _garfish_hooks.SyncWaterfallHook<BeforeLoadArgs>;
        asyncBeforeLoadModule: _garfish_hooks.AsyncWaterfallHook<BeforeLoadArgs>;
        afterLoadModule: _garfish_hooks.SyncWaterfallHook<afterLoadArgs>;
        asyncAfterLoadModule: _garfish_hooks.AsyncWaterfallHook<afterLoadArgs>;
    }>;
    loader: _garfish_loader.Loader;
    cacheModules: any;
};

export { cacheModules, Apis as default, esModule, hooks, loadModule, loadModuleSync, loader, preload, setModuleConfig };
