declare type Callback<T, K> = (...args: ArgsType<T>) => K;
declare type ArgsType<T> = T extends Array<any> ? T : Array<any>;
declare class SyncHook<T, K> {
    type: string;
    listeners: Set<Callback<T, K>>;
    constructor(type?: string);
    on(fn: Callback<T, K>): void;
    once(fn: Callback<T, K>): void;
    emit(...data: ArgsType<T>): void;
    remove(fn: Callback<T, K>): boolean;
    removeAll(): void;
}

declare type CallbackReturnType$1 = void | false | Promise<void | false>;
declare class AsyncHook<T, ExternalEmitReturnType = CallbackReturnType$1> extends SyncHook<T, CallbackReturnType$1 | Promise<ExternalEmitReturnType>> {
    emit(...data: ArgsType<T>): Promise<void | false | ExternalEmitReturnType>;
}

declare class SyncWaterfallHook<T extends Record<string, any>> extends SyncHook<[
    T
], T> {
    onerror: (errMsg: string | Error) => void;
    constructor(type: string);
    emit(data: T): T;
}

declare type CallbackReturnType<T> = T | false | Promise<T | false>;
declare class AsyncWaterfallHook<T extends Record<string, any>> extends SyncHook<[
    T
], CallbackReturnType<T>> {
    onerror: (errMsg: string | Error) => void;
    constructor(type: string);
    emit(data: T): Promise<T | false>;
}

declare type Plugin<T extends Record<string, any>> = {
    [k in keyof T]?: Parameters<T[k]['on']>[0];
} & {
    name: string;
    version?: string;
};
declare class PluginSystem<T extends Record<string, any>> {
    lifecycle: T;
    lifecycleKeys: Array<keyof T>;
    registerPlugins: Record<string, Plugin<T>>;
    constructor(lifecycle: T);
    usePlugin(plugin: Plugin<T>): void;
    removePlugin(pluginName: string): void;
    inherit<T extends PluginSystem<any>>({ lifecycle, registerPlugins }: T): this & T;
}

export { AsyncHook, AsyncWaterfallHook, Plugin, PluginSystem, SyncHook, SyncWaterfallHook };
