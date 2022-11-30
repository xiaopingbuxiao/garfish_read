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

type OptionalType<T extends new (...args: any) => any> = {
  Vue: T;
  canUpdate: boolean; // by default, allow parcels created with garfish-react-bridge to be updated
  appOptions: (
    opts: Record<string, any>,
  ) => Record<string, any> | Record<string, any>;
  handleInstance: (vueInstance: InstanceType<T>, opts: PropsInfo) => void;
};

type UserOptions<
  T extends new (...args: any) => any,
  U,
> = TypeComponent<U> & Partial<OptionalType<T>>;

declare type Options = UserOptions<vue.VueConstructor, vue.Component>;
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
