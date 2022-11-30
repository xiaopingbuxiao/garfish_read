import Garfish, { interfaces } from '@garfish/core';
export { default as Garfish, interfaces } from '@garfish/core';

declare global {
    interface Window {
        Garfish: Garfish;
        __GARFISH__: boolean;
    }
}
declare const GarfishInstance: Garfish;

interface CustomOptions {
    loading: (loadingParams: {
        isLoading: boolean;
        error: Error;
    }) => Element;
    delay: number;
    config?: interfaces.Config;
}
declare function defineCustomElements(htmlTag: string, options: CustomOptions): void;

export { GarfishInstance as default, defineCustomElements };
