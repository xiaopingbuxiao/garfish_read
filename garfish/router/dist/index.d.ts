import { interfaces } from '@garfish/core';

declare type RouterHook = (to: CurrentRouterInfo, from: CurrentRouterInfo, next: any) => void;
declare type RouterChange = (path: string) => void;
interface RouterInfo {
    fullPath: string;
    path: string;
    query: Object;
    state: Object;
}
interface CurrentRouterInfo extends RouterInfo {
    matched: Array<interfaces.AppInfo>;
}
interface Options$1 {
    basename?: string;
    listening?: boolean;
    current?: CurrentRouterInfo;
    autoRefreshApp?: boolean;
    apps: Array<interfaces.AppInfo>;
    beforeEach?: RouterHook;
    afterEach?: RouterHook;
    routerChange?: (url: string) => void;
    active: (appInfo: interfaces.AppInfo, rootPath: string | undefined) => Promise<void>;
    deactive: (appInfo: interfaces.AppInfo, rootPath: string | undefined) => Promise<void>;
    notMatch?: (path: string) => void;
}
declare function setRouterConfig(options: Partial<Options$1>): void;

interface RouterInterface {
    push: ({ path, query, basename, }: {
        path: string;
        basename?: string;
        query?: {
            [key: string]: string;
        };
    }) => void;
    replace: ({ path, query, basename, }: {
        path: string;
        basename?: string;
        query?: {
            [key: string]: string;
        };
    }) => void;
    beforeEach: (hook: RouterHook) => void;
    afterEach: (hook: RouterHook) => void;
    registerRouter: (Apps: interfaces.AppInfo | Array<interfaces.AppInfo>) => void;
    routerChange: (hook: RouterChange) => void;
    setRouterConfig: typeof setRouterConfig;
    listenRouterAndReDirect: ({ apps, basename, autoRefreshApp, active, deactive, notMatch, }: Options$1) => void;
    routerConfig: Options$1;
}

declare module '@garfish/core' {
    export default interface Garfish {
        router: RouterInterface;
        apps: Record<string, interfaces.App>;
    }
    namespace interfaces {
        interface Config {
            autoRefreshApp?: boolean;
            onNotMatchRouter?: (path: string) => Promise<void> | void;
        }
        interface AppInfo {
            activeWhen?: string | ((path: string) => boolean);
            active?: (appInfo: AppInfo, rootPath: string) => void;
            deactive?: (appInfo: AppInfo, rootPath: string) => void;
            rootPath?: string;
            basename?: string;
        }
    }
}

interface Options {
    autoRefreshApp?: boolean;
    onNotMatchRouter?: (path: string) => Promise<void> | void;
}
declare function GarfishRouter(_args?: Options): (Garfish: interfaces.Garfish) => interfaces.Plugin;

export { GarfishRouter, RouterInterface };
