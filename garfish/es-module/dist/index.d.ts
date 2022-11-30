import { Loader, LoaderOptions } from '@garfish/loader';
import { interfaces } from '@garfish/core';

interface Output {
    map: string;
    code: string;
}

declare type MemoryModule = Record<string, any>;
declare type Module = {
    [key: string]: any;
    [Symbol.toStringTag]: 'Module';
};

declare type ModuleResource = Output & {
    storeId: string;
    realUrl: string;
    exports: Array<string>;
};
interface RuntimeOptions {
    scope: string;
    loaderOptions?: LoaderOptions;
    execCode?: (output: ModuleResource, provider: ReturnType<Runtime['generateProvider']>) => void;
}
declare class Runtime {
    private modules;
    private memoryModules;
    loader: Loader;
    options: RuntimeOptions;
    resources: Record<string, ModuleResource | Promise<void>>;
    constructor(options?: RuntimeOptions);
    private execCode;
    private importModule;
    private getModule;
    private generateProvider;
    private analysisModule;
    private compileAndFetchCode;
    import(storeId: string): MemoryModule;
    importByUrl(storeId: string, requestUrl?: string): Promise<Module | undefined>;
    importByCode(code: string, storeId: string, metaUrl?: string): Promise<Module | undefined>;
}

interface Options {
    excludes?: Array<string> | ((name: string) => boolean);
}
declare function GarfishEsModule(options?: Options): (Garfish: interfaces.Garfish) => interfaces.Plugin;

export { GarfishEsModule, Runtime as default };
