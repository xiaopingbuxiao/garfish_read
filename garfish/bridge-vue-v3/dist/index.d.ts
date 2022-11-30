import * as vue from 'vue';

type PropsInfo = {
  appName: string;
  dom: Element | ShadowRoot | Document;
  basename: string;
  appRenderInfo: Record<string, any>;
  props: Record<string, any>;
};

type LoadRootComponent<T> = (opts: PropsInfo) => Promise<T>;

type TypeComponent<T> =
  | {
      rootComponent: T;
      loadRootComponent?: LoadRootComponent<T>;
    }
  | {
      rootComponent?: T;
      loadRootComponent: LoadRootComponent<T>;
    };

type OptionalType<T, K> = {
  createApp: T;
  canUpdate: boolean; // by default, allow parcels created with garfish-react-bridge to be updated
  appOptions: (
    opts: Record<string, any>,
  ) => Record<string, any> | Record<string, any>;
  handleInstance: (vueInstance: K, opts: PropsInfo) => void;
};

type UserOptions<T, U, K> = TypeComponent<U> &
  Partial<OptionalType<T, K>>;

declare type Options = UserOptions<vue.CreateAppFunction<Element>, vue.Component, vue.App>;
declare global {
    interface Window {
        __GARFISH__: boolean;
    }
}
declare function vueBridge(this: any, userOpts: Options): (this: any, appInfo: any, props: any) => Promise<{
    render: (props: any) => any;
    destroy: (props: any) => any;
    update: (props: any) => any;
}>;

export { vueBridge };
