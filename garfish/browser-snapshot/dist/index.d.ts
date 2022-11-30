import { interfaces } from '@garfish/core';

declare class Sandbox {
    name: string;
    protectVariable: Array<PropertyKey>;
    targetToProtect: Window | Object;
    private isInBrowser;
    type: string;
    isRunning: Boolean;
    private patchList;
    constructor(name: string, protectVariable?: Array<PropertyKey>, targetToProtect?: Window | Object, isInBrowser?: Boolean);
    activate(): void;
    deactivate(clearEffects?: boolean): void;
}

declare module '@garfish/core' {
    namespace interfaces {
        interface Config {
            protectVariable?: PropertyKey[];
            insulationVariable?: PropertyKey[];
            sandbox?: SandboxConfig | false;
        }
        interface App {
            snapshotSandbox?: Sandbox;
        }
        interface Plugin {
            openBrowser?: boolean;
        }
    }
}

interface SandboxConfig$1 {
    snapshot?: boolean;
    disableWith?: boolean;
    strictIsolation?: boolean;
}
interface BrowserConfig {
    open?: boolean;
    protectVariable?: PropertyKey[];
}
declare function GarfishBrowserSnapshot(op?: BrowserConfig): (Garfish: interfaces.Garfish) => interfaces.Plugin;

export { GarfishBrowserSnapshot, SandboxConfig$1 as SandboxConfig, Sandbox as default };
