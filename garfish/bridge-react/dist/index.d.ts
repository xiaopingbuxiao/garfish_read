import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

type ErrorBoundary<T> = (
  caughtError: Error | any,
  props: any,
) => T | null;

type RenderTypes =
  | 'createRoot'
  | 'unstable_createRoot'
  | 'createBlockingRoot'
  | 'unstable_createBlockingRoot'
  | 'render'
  | 'hydrate';

type OptionalType<T, U, E> = {
  React: T;
  ReactDOM: U;
  errorBoundary: ErrorBoundary<E>;
  renderResults: Record<string, U>;
  renderType: RenderTypes | (() => RenderTypes);
  el: string;
  canUpdate: boolean; // by default, allow parcels created with garfish-react-bridge to be updated
  suppressComponentDidCatchWarning: boolean;
  domElements: Record<string, HTMLElement>;
  updateResolves: Record<string, Array<any>>;
};

type UserOptions<T, U, C, E> = TypeComponent<C> &
  Partial<OptionalType<T, U, E>>;

declare type Options = UserOptions<typeof React, typeof ReactDOM, any, React.ReactNode>;
declare global {
    interface Window {
        __GARFISH__: boolean;
    }
}
declare function reactBridge(this: any, userOptions: Options): (this: any, appInfo: any, props: any) => Promise<{
    render: (appInfo: any) => any;
    destroy: (appInfo: any) => any;
}>;

export { PropsInfo, reactBridge };
