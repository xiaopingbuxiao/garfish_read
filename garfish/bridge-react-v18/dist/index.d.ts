import * as React from 'react';
import { createRoot, hydrateRoot, Root } from 'react-dom/client';

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

type OptionalType<T, U, H, R, E> = {
  React: T;
  createRoot: U;
  hydrateRoot: H;
  errorBoundary: ErrorBoundary<E>;
  renderResults: Record<string, R>;
  renderType: RenderTypes | (() => RenderTypes);
  el: string;
  canUpdate: boolean; // by default, allow parcels created with garfish-react-bridge to be updated
  suppressComponentDidCatchWarning: boolean;
  domElements: Record<string, HTMLElement>;
  updateResolves: Record<string, Array<any>>;
};

type UserOptions<T, U, H, R, C, E> = TypeComponent<C> &
  Partial<OptionalType<T, U, H, R, E>>;

declare type Options = UserOptions<typeof React, typeof createRoot, typeof hydrateRoot, Root, any, React.ReactNode>;
declare global {
    interface Window {
        __GARFISH__: boolean;
    }
}
declare function reactBridge(this: any, userOpts: Options): (this: any, appInfo: any, props: any) => Promise<{
    render: (appInfo: PropsInfo) => any;
    destroy: (appInfo: PropsInfo) => any;
}>;

export { PropsInfo, reactBridge };
