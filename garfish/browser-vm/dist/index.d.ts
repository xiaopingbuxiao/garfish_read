import { interfaces } from '@garfish/core';
import * as _garfish_hooks from '@garfish/hooks';
import { Loader, LoaderOptions } from '@garfish/loader';

interface DocumentGetterData {
    value: any;
    propName: PropertyKey;
    proxyDocument: Document;
    rootNode?: null | Element | ShadowRoot;
    customValue?: any;
}

declare class Sandbox {
    id: number;
    type: string;
    closed: boolean;
    initComplete: boolean;
    version: string;
    global?: Window & typeof globalThis;
    loader: Loader;
    options: SandboxOptions;
    hooks: _garfish_hooks.PluginSystem<{
        closed: _garfish_hooks.SyncHook<[], void>;
        stared: _garfish_hooks.SyncHook<[(FakeWindow | undefined)?], void>;
        appendNode: _garfish_hooks.SyncHook<[Element, Element, Element, string], void>;
        documentGetter: _garfish_hooks.SyncWaterfallHook<DocumentGetterData>;
        beforeClearEffect: _garfish_hooks.SyncHook<[], void>;
        afterClearEffect: _garfish_hooks.SyncHook<[], void>;
        beforeInvoke: _garfish_hooks.SyncHook<[{
            code: string;
        }, (string | undefined)?, (Record<string, any> | undefined)?, (interfaces.ExecScriptOptions | undefined)?], void>;
        afterInvoke: _garfish_hooks.SyncHook<[{
            code: string;
        }, (string | undefined)?, (Record<string, any> | undefined)?, (interfaces.ExecScriptOptions | undefined)?], void>;
        invokeError: _garfish_hooks.SyncHook<[Error, (string | undefined)?, (Record<string, any> | undefined)?, (interfaces.ExecScriptOptions | undefined)?], void>;
    }>;
    replaceGlobalVariables: ReplaceGlobalVariables;
    deferClearEffects: Set<() => void>;
    isExternalGlobalVariable: Set<PropertyKey>;
    isProtectVariable: (p: PropertyKey) => boolean;
    isInsulationVariable: (P: PropertyKey) => boolean;
    dynamicStyleSheetElementSet: Set<HTMLStyleElement>;
    styledComponentCSSRulesMap: WeakMap<HTMLStyleElement, CSSRuleList>;
    private optimizeCode;
    private envVariable;
    constructor(options: SandboxOptions);
    start(): void;
    close(): void;
    reset(): void;
    createProxyWindow(moduleKeys?: Array<string>): any;
    getModuleData(): {
        recoverList: (() => void)[];
        createdList: ((context: Window | undefined) => void)[];
        overrideList: {};
        prepareList: (() => void)[];
    };
    clearEffects(): void;
    optimizeGlobalMethod(tempEnvKeys?: Array<string>): string;
    createExecParams(codeRef: {
        code: string;
    }, env: Record<string, any>): {
        window: (Window & typeof globalThis) | undefined;
    };
    processExecError(e: any, url?: string, env?: Record<string, any>, options?: interfaces.ExecScriptOptions): void;
    execScript(code: string, env?: {}, url?: string, options?: interfaces.ExecScriptOptions): void;
    static getNativeWindow(): Window & typeof globalThis;
    static canSupport(): boolean;
}

declare type FakeWindow = Window & Record<PropertyKey, any>;
declare type Module = (sandbox: Sandbox) => OverridesData | void;
interface OverridesData {
    recover?: () => void;
    prepare?: () => void;
    created?: (context: Sandbox['global']) => void;
    override?: Record<PropertyKey, any>;
}
interface ReplaceGlobalVariables {
    recoverList: Array<OverridesData['recover']>;
    prepareList: Array<OverridesData['prepare']>;
    createdList: Array<OverridesData['created']>;
    overrideList: Record<PropertyKey, any>;
}
interface SandboxOptions {
    namespace: string;
    baseUrl?: string;
    fixBaseUrl?: boolean;
    disableWith?: boolean;
    strictIsolation?: boolean;
    modules?: Array<Module>;
    addSourceList?: (sourceInfo: Array<{
        tagName: string;
        url: string;
    }> | {
        tagName: string;
        url: string;
    }) => void;
    loaderOptions?: LoaderOptions;
    styleScopeId?: () => string;
    el?: () => Element | ShadowRoot | null;
    protectVariable?: () => Array<PropertyKey>;
    insulationVariable?: () => Array<PropertyKey>;
}

declare module '@garfish/core' {
    export default interface Garfish {
        setGlobalValue(key: string, value?: any): void;
        getGlobalObject: () => Window & typeof globalThis;
        clearEscapeEffect: (key: string, value?: any) => void;
    }
    namespace interfaces {
        interface SandboxConfig {
            modules?: Array<Module> | Record<string, Module>;
        }
        interface Config {
            protectVariable?: PropertyKey[];
            insulationVariable?: PropertyKey[];
        }
        interface AppInfo {
            protectVariable?: PropertyKey[];
            insulationVariable?: PropertyKey[];
        }
        interface App {
            vmSandbox?: Sandbox;
        }
    }
}
declare function GarfishBrowserVm(): (Garfish: interfaces.Garfish) => interfaces.Plugin;

export { FakeWindow, GarfishBrowserVm, Module, OverridesData, ReplaceGlobalVariables, SandboxOptions, Sandbox as default };
