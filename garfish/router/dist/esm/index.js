var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.ts
import { createKey, routerLog } from "@garfish/utils";

// src/config.ts
var __GARFISH_ROUTER_UPDATE_FLAG__ = "__GARFISH_ROUTER_UPDATE_FLAG__";
var __GARFISH_ROUTER_FLAG__ = "__GARFISH_ROUTER_FLAG__";
var __GARFISH_BEFORE_ROUTER_EVENT__ = "garfish:before-routing-event";
var RouterConfig = {
  basename: "/",
  current: {
    fullPath: "/",
    path: "/",
    matched: [],
    query: {},
    state: {}
  },
  apps: [],
  beforeEach: (to, from, next) => next(),
  afterEach: (to, from, next) => next(),
  active: () => Promise.resolve(),
  deactive: () => Promise.resolve(),
  routerChange: () => {
  },
  autoRefreshApp: true,
  listening: true
};
function set(field, value) {
  RouterConfig[field] = value;
}
function setRouterConfig(options) {
  Object.assign(RouterConfig, options);
}

// src/utils/urlUt.ts
function parseQuery(query = "") {
  const res = {};
  if (query) {
    query.slice(1).split("&").map((item) => {
      const pairs = item.split("=");
      res[pairs[0]] = pairs;
    });
  }
  return res;
}
function getPath(basename = "/", pathname) {
  if (basename === "/" || basename === "") {
    return pathname || location.pathname;
  } else {
    return (pathname || location.pathname).replace(new RegExp(`^/?${basename}`), "");
  }
}
function getAppRootPath(appInfo) {
  const path = getPath(appInfo.basename, location.pathname);
  let appRootPath = appInfo.basename === "/" ? "" : appInfo.basename || "";
  if (typeof appInfo.activeWhen === "string") {
    appRootPath += appInfo.activeWhen;
  } else {
    appRootPath += path.split("").reduce((pre, next) => {
      if (typeof appInfo.activeWhen === "function" && !appInfo.activeWhen(pre))
        return pre + next;
      return pre;
    }, "");
  }
  return appRootPath;
}

// src/utils/index.ts
async function asyncForEach(arr, callback) {
  const length = arr.length;
  let k = 0;
  while (k < length) {
    const kValue = arr[k];
    await callback(kValue, k, arr);
    k++;
  }
}
function toMiddleWare(to, from, cb) {
  return new Promise((resolve, reject) => {
    try {
      cb(to, from, resolve);
    } catch (err) {
      reject(err);
    }
  });
}
function createEvent(type) {
  let e;
  if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {
    e = document.createEvent("UIEvents");
    e.initUIEvent(type.toLowerCase(), true, false, window, 0);
  } else {
    e = new Event(type.toLowerCase());
  }
  return e;
}

// src/utils/customEvent.ts
var NativeCustomEvent = typeof global !== "undefined" ? global == null ? void 0 : global.CustomEvent : null;
function useNative() {
  try {
    const p = new NativeCustomEvent("cat", { detail: { foo: "bar" } });
    return p.type === "cat" && p.detail.foo === "bar";
  } catch (e) {
  }
  return false;
}
var CustomEvent;
if (NativeCustomEvent && useNative()) {
  CustomEvent = NativeCustomEvent;
} else if (typeof document !== "undefined" && typeof document.createEvent === "function") {
  CustomEvent = function(type, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    const evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(type, params.bubbles || false, params.cancelable || false, params.detail || null);
    return evt;
  };
} else {
  CustomEvent = function(type, params) {
    const e = document.createEventObject();
    e.type = type;
    if (params) {
      e.bubbles = Boolean(params.bubbles);
      e.cancelable = Boolean(params.cancelable);
      e.detail = params.detail;
    } else {
      e.bubbles = false;
      e.cancelable = false;
      e.detail = void 0;
    }
    return e;
  };
}
var customEvent_default = CustomEvent;

// src/utils/navEvent.ts
import { validURL } from "@garfish/utils";
function createPopStateEvent(state, originalMethodName) {
  let evt;
  try {
    evt = new PopStateEvent("popstate", { state });
  } catch (err) {
    evt = document.createEvent("PopStateEvent");
    evt.initPopStateEvent("popstate", false, false, state);
  }
  evt.garfish = true;
  evt.garfishTrigger = originalMethodName;
  return evt;
}
var callCapturedEventListeners = (type) => {
  const eventArguments = createPopStateEvent(window.history.state, type);
  window.dispatchEvent(eventArguments);
};
var handlerParams = function(path, query, basename) {
  if (!path || typeof path !== "string")
    return "";
  let url = path;
  if (url[0] !== "/")
    url = "/" + url;
  if (Object.prototype.toString.call(query) === "[object Object]") {
    const qs = Object.keys(query).map((key) => `${key}=${query[key]}`).join("&");
    url += qs ? "?" + qs : "";
  }
  if (basename !== "/")
    url = basename + url;
  if (url[0] !== "/")
    url = "/" + url;
  return url;
};
var push = ({
  path,
  query,
  basename
}) => {
  if (!basename)
    basename = RouterConfig.basename || "/";
  let url = null;
  if (validURL(path)) {
    url = /(^https?:)|(^\/\/)/.test(path) ? path : `//${path}`;
  } else {
    url = handlerParams(path, query, basename);
  }
  history.pushState(__spreadValues({ [__GARFISH_ROUTER_UPDATE_FLAG__]: true }, history.state), "", url);
};
var replace = ({
  path,
  query,
  basename
}) => {
  if (!basename)
    basename = RouterConfig.basename || "/";
  let url = null;
  if (validURL(path)) {
    url = /^(https?:)(\/\/)/.test(path) ? path : `//${path}`;
  } else {
    url = handlerParams(path, query, basename);
  }
  history.replaceState(__spreadValues({ [__GARFISH_ROUTER_UPDATE_FLAG__]: true }, history.state), "", url);
};

// src/linkTo.ts
var hasActive = (activeWhen, path) => {
  if (typeof activeWhen === "string") {
    if (activeWhen[0] !== "/")
      activeWhen = `/${activeWhen}`;
    if (activeWhen === "/" && path === activeWhen)
      return true;
    const activeWhenArr = activeWhen.split("/");
    const pathArr = path.split("/");
    let flag = true;
    activeWhenArr.forEach((pathItem, index) => {
      if (pathItem && pathItem !== pathArr[index]) {
        flag = false;
      }
    });
    return flag;
  } else {
    return activeWhen(path);
  }
};
var linkTo = async ({
  toRouterInfo,
  fromRouterInfo,
  eventType
}) => {
  const {
    current,
    apps,
    deactive,
    active,
    notMatch,
    beforeEach: beforeEach2,
    afterEach: afterEach2,
    autoRefreshApp
  } = RouterConfig;
  const deactiveApps = current.matched.filter((appInfo) => !hasActive(appInfo.activeWhen, getPath(appInfo.basename, location.pathname)));
  const activeApps = apps.filter((appInfo) => {
    return hasActive(appInfo.activeWhen, getPath(appInfo.basename, location.pathname));
  });
  const needToActive = activeApps.filter(({ name }) => {
    return !current.matched.some(({ name: cName }) => name === cName);
  });
  const to = __spreadProps(__spreadValues({}, toRouterInfo), {
    matched: needToActive
  });
  const from = __spreadProps(__spreadValues({}, fromRouterInfo), {
    matched: deactiveApps
  });
  await toMiddleWare(to, from, beforeEach2);
  if (current.matched.length > 0) {
    await asyncForEach(deactiveApps, async (appInfo) => await deactive(appInfo, getPath(appInfo.basename, location.pathname)));
  }
  setRouterConfig({
    current: {
      path: getPath(RouterConfig.basename),
      fullPath: location.pathname,
      matched: activeApps,
      state: history.state,
      query: parseQuery(location.search)
    }
  });
  const curState = window.history.state || {};
  if (eventType !== "popstate" && (curState[__GARFISH_ROUTER_UPDATE_FLAG__] || autoRefreshApp)) {
    callCapturedEventListeners(eventType);
  }
  await asyncForEach(needToActive, async (appInfo) => {
    const appRootPath = getAppRootPath(appInfo);
    await active(appInfo, appRootPath);
  });
  if (activeApps.length === 0 && notMatch)
    notMatch(location.pathname);
  await toMiddleWare(to, from, afterEach2);
};

// src/agentRouter.ts
var normalAgent = () => {
  const addRouterListener = function() {
    window.addEventListener(__GARFISH_BEFORE_ROUTER_EVENT__, function(env) {
      RouterConfig.routerChange && RouterConfig.routerChange(location.pathname);
      linkTo(env.detail);
    });
  };
  if (!window[__GARFISH_ROUTER_FLAG__]) {
    const rewrite = function(type) {
      const hapi = history[type];
      return function() {
        const urlBefore = window.location.pathname + window.location.hash;
        const stateBefore = history == null ? void 0 : history.state;
        const res = hapi.apply(this, arguments);
        const urlAfter = window.location.pathname + window.location.hash;
        const stateAfter = history == null ? void 0 : history.state;
        const e = createEvent(type);
        e.arguments = arguments;
        if (urlBefore !== urlAfter || JSON.stringify(stateBefore) !== JSON.stringify(stateAfter)) {
          window.dispatchEvent(new customEvent_default(__GARFISH_BEFORE_ROUTER_EVENT__, {
            detail: {
              toRouterInfo: {
                fullPath: urlAfter,
                query: parseQuery(location.search),
                path: getPath(RouterConfig.basename, urlAfter),
                state: stateAfter
              },
              fromRouterInfo: {
                fullPath: urlBefore,
                query: parseQuery(location.search),
                path: getPath(RouterConfig.basename, urlBefore),
                state: stateBefore
              },
              eventType: type
            }
          }));
        }
        return res;
      };
    };
    history.pushState = rewrite("pushState");
    history.replaceState = rewrite("replaceState");
    window.addEventListener("popstate", function(event) {
      if (event && typeof event === "object" && event.garfish)
        return;
      if (history.state && typeof history.state === "object")
        delete history.state[__GARFISH_ROUTER_UPDATE_FLAG__];
      window.dispatchEvent(new customEvent_default(__GARFISH_BEFORE_ROUTER_EVENT__, {
        detail: {
          toRouterInfo: {
            fullPath: location.pathname,
            query: parseQuery(location.search),
            path: getPath(RouterConfig.basename)
          },
          fromRouterInfo: {
            fullPath: RouterConfig.current.fullPath,
            path: getPath(RouterConfig.basename, RouterConfig.current.path),
            query: RouterConfig.current.query
          },
          eventType: "popstate"
        }
      }));
    }, false);
    window[__GARFISH_ROUTER_FLAG__] = true;
  }
  addRouterListener();
};
var initRedirect = () => {
  linkTo({
    toRouterInfo: {
      fullPath: location.pathname,
      path: getPath(RouterConfig.basename),
      query: parseQuery(location.search),
      state: history.state
    },
    fromRouterInfo: {
      fullPath: "/",
      path: "/",
      query: {},
      state: {}
    },
    eventType: "pushState"
  });
};
var listen = () => {
  normalAgent();
  initRedirect();
};

// src/context.ts
var beforeEach = (hook) => {
  set("beforeEach", hook);
};
var afterEach = (hook) => {
  set("afterEach", hook);
};
var routerChange = (hook) => {
  set("routerChange", hook);
};
var registerRouter = (Apps) => {
  const unregisterApps = Apps.filter((app) => !RouterConfig.apps.some((item) => app.name === item.name));
  set("apps", RouterConfig.apps.concat(unregisterApps));
};
var listenRouterAndReDirect = ({
  apps,
  basename = "/",
  autoRefreshApp,
  active,
  deactive,
  notMatch,
  listening = true
}) => {
  registerRouter(apps);
  setRouterConfig({
    basename,
    autoRefreshApp,
    active,
    deactive,
    notMatch,
    listening
  });
  listen();
};
var Router = {
  push,
  replace,
  beforeEach,
  afterEach,
  registerRouter,
  routerChange,
  listenRouterAndReDirect,
  setRouterConfig,
  routerConfig: RouterConfig
};
var context_default = Router;

// src/index.ts
function GarfishRouter(_args) {
  return function(Garfish) {
    Garfish.apps = {};
    Garfish.router = context_default;
    return {
      name: "router",
      version: "1.12.0",
      bootstrap(options) {
        let activeApp = null;
        const unmounts = {};
        const { basename } = options;
        const { autoRefreshApp = true, onNotMatchRouter = () => null } = Garfish.options;
        async function active(appInfo, rootPath = "/") {
          routerLog(`${appInfo.name} active`, {
            appInfo,
            rootPath,
            listening: RouterConfig.listening
          });
          if (!RouterConfig.listening)
            return;
          const { name, active: active2, cache = true } = appInfo;
          if (active2)
            return active2(appInfo, rootPath);
          appInfo.rootPath = rootPath;
          const currentApp = activeApp = createKey();
          const app = await Garfish.loadApp(appInfo.name, {
            cache,
            basename: rootPath,
            entry: appInfo.entry,
            domGetter: appInfo.domGetter
          });
          if (app) {
            app.appInfo.basename = rootPath;
            const call = async (app2, isRender) => {
              if (!app2)
                return;
              const isDes = cache && app2.mounted;
              if (isRender) {
                return await app2[isDes ? "show" : "mount"]();
              } else {
                return app2[isDes ? "hide" : "unmount"]();
              }
            };
            Garfish.apps[name] = app;
            unmounts[name] = () => {
              if (app.mounting) {
                delete Garfish.cacheApps[name];
              }
              call(app, false);
            };
            if (currentApp === activeApp) {
              await call(app, true);
            }
          }
        }
        async function deactive(appInfo, rootPath) {
          routerLog(`${appInfo.name} deactive`, {
            appInfo,
            rootPath
          });
          activeApp = null;
          const { name, deactive: deactive2 } = appInfo;
          if (deactive2)
            return deactive2(appInfo, rootPath);
          const unmount = unmounts[name];
          unmount && unmount();
          delete Garfish.apps[name];
          const needToDeleteApps = context_default.routerConfig.apps.filter((app) => {
            if (appInfo.rootPath === app.basename)
              return true;
          });
          if (needToDeleteApps.length > 0) {
            needToDeleteApps.forEach((app) => {
              delete Garfish.appInfos[app.name];
              delete Garfish.cacheApps[app.name];
            });
            context_default.setRouterConfig({
              apps: context_default.routerConfig.apps.filter((app) => {
                return !needToDeleteApps.some((needDelete) => app.name === needDelete.name);
              })
            });
          }
        }
        const apps = Object.values(Garfish.appInfos);
        const appList = apps.filter((app) => {
          if (!app.basename)
            app.basename = basename;
          return !!app.activeWhen;
        });
        const listenOptions = {
          basename,
          active,
          deactive,
          autoRefreshApp,
          notMatch: onNotMatchRouter,
          apps: appList,
          listening: true
        };
        routerLog("listenRouterAndReDirect", listenOptions);
        listenRouterAndReDirect(listenOptions);
      },
      registerApp(appInfos) {
        const appList = Object.values(appInfos);
        context_default.registerRouter(appList.filter((app) => !!app.activeWhen));
        if (!Garfish.running)
          return;
        routerLog("registerApp initRedirect", appInfos);
        initRedirect();
      }
    };
  };
}
export {
  GarfishRouter
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9jb25maWcudHMiLCAiLi4vLi4vc3JjL3V0aWxzL3VybFV0LnRzIiwgIi4uLy4uL3NyYy91dGlscy9pbmRleC50cyIsICIuLi8uLi9zcmMvdXRpbHMvY3VzdG9tRXZlbnQudHMiLCAiLi4vLi4vc3JjL3V0aWxzL25hdkV2ZW50LnRzIiwgIi4uLy4uL3NyYy9saW5rVG8udHMiLCAiLi4vLi4vc3JjL2FnZW50Um91dGVyLnRzIiwgIi4uLy4uL3NyYy9jb250ZXh0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB7IGNyZWF0ZUtleSwgcm91dGVyTG9nIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgUm91dGVyQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHJvdXRlciwge1xuICBpbml0UmVkaXJlY3QsXG4gIFJvdXRlckludGVyZmFjZSxcbiAgbGlzdGVuUm91dGVyQW5kUmVEaXJlY3QsXG59IGZyb20gJy4vY29udGV4dCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAZ2FyZmlzaC9jb3JlJyB7XG4gIGV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBHYXJmaXNoIHtcbiAgICByb3V0ZXI6IFJvdXRlckludGVyZmFjZTtcbiAgICBhcHBzOiBSZWNvcmQ8c3RyaW5nLCBpbnRlcmZhY2VzLkFwcD47XG4gIH1cblxuICBleHBvcnQgbmFtZXNwYWNlIGludGVyZmFjZXMge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgICAgIGF1dG9SZWZyZXNoQXBwPzogYm9vbGVhbjtcbiAgICAgIG9uTm90TWF0Y2hSb3V0ZXI/OiAocGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEFwcEluZm8ge1xuICAgICAgYWN0aXZlV2hlbj86IHN0cmluZyB8ICgocGF0aDogc3RyaW5nKSA9PiBib29sZWFuKTsgLy8gXHU2MjRCXHU1MkE4XHU1MkEwXHU4RjdEXHVGRjBDXHU1M0VGXHU0RTBEXHU1ODZCXHU1MTk5XHU4REVGXHU3NTMxXG4gICAgICBhY3RpdmU/OiAoYXBwSW5mbzogQXBwSW5mbywgcm9vdFBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgICAgIGRlYWN0aXZlPzogKGFwcEluZm86IEFwcEluZm8sIHJvb3RQYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgICByb290UGF0aD86IHN0cmluZztcbiAgICAgIGJhc2VuYW1lPzogc3RyaW5nO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdHlwZSB7IFJvdXRlckludGVyZmFjZSB9IGZyb20gJy4vY29udGV4dCc7XG5cbmludGVyZmFjZSBPcHRpb25zIHtcbiAgYXV0b1JlZnJlc2hBcHA/OiBib29sZWFuO1xuICBvbk5vdE1hdGNoUm91dGVyPzogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoUm91dGVyKF9hcmdzPzogT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKEdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCk6IGludGVyZmFjZXMuUGx1Z2luIHtcbiAgICBHYXJmaXNoLmFwcHMgPSB7fTtcbiAgICBHYXJmaXNoLnJvdXRlciA9IHJvdXRlcjtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncm91dGVyJyxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuXG4gICAgICBib290c3RyYXAob3B0aW9uczogaW50ZXJmYWNlcy5PcHRpb25zKSB7XG4gICAgICAgIGxldCBhY3RpdmVBcHA6IG51bGwgfCBzdHJpbmcgPSBudWxsO1xuICAgICAgICBjb25zdCB1bm1vdW50czogUmVjb3JkPHN0cmluZywgRnVuY3Rpb24+ID0ge307XG4gICAgICAgIGNvbnN0IHsgYmFzZW5hbWUgfSA9IG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHsgYXV0b1JlZnJlc2hBcHAgPSB0cnVlLCBvbk5vdE1hdGNoUm91dGVyID0gKCkgPT4gbnVsbCB9ID1cbiAgICAgICAgICBHYXJmaXNoLm9wdGlvbnM7XG5cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gYWN0aXZlKFxuICAgICAgICAgIGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgICAgICAgICByb290UGF0aDogc3RyaW5nID0gJy8nLFxuICAgICAgICApIHtcbiAgICAgICAgICByb3V0ZXJMb2coYCR7YXBwSW5mby5uYW1lfSBhY3RpdmVgLCB7XG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgcm9vdFBhdGgsXG4gICAgICAgICAgICBsaXN0ZW5pbmc6IFJvdXRlckNvbmZpZy5saXN0ZW5pbmcsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBJbiB0aGUgbGlzdGVuaW5nIHN0YXRlLCB0cmlnZ2VyIHRoZSByZW5kZXJpbmcgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgICAgICAgaWYgKCFSb3V0ZXJDb25maWcubGlzdGVuaW5nKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCB7IG5hbWUsIGFjdGl2ZSwgY2FjaGUgPSB0cnVlIH0gPSBhcHBJbmZvO1xuICAgICAgICAgIGlmIChhY3RpdmUpIHJldHVybiBhY3RpdmUoYXBwSW5mbywgcm9vdFBhdGgpO1xuICAgICAgICAgIGFwcEluZm8ucm9vdFBhdGggPSByb290UGF0aDtcblxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRBcHAgPSAoYWN0aXZlQXBwID0gY3JlYXRlS2V5KCkpO1xuICAgICAgICAgIGNvbnN0IGFwcCA9IGF3YWl0IEdhcmZpc2gubG9hZEFwcChhcHBJbmZvLm5hbWUsIHtcbiAgICAgICAgICAgIGNhY2hlLFxuICAgICAgICAgICAgYmFzZW5hbWU6IHJvb3RQYXRoLFxuICAgICAgICAgICAgZW50cnk6IGFwcEluZm8uZW50cnksXG4gICAgICAgICAgICBkb21HZXR0ZXI6IGFwcEluZm8uZG9tR2V0dGVyLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGFwcCkge1xuICAgICAgICAgICAgYXBwLmFwcEluZm8uYmFzZW5hbWUgPSByb290UGF0aDtcblxuICAgICAgICAgICAgY29uc3QgY2FsbCA9IGFzeW5jIChhcHA6IGludGVyZmFjZXMuQXBwLCBpc1JlbmRlcjogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWFwcCkgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCBpc0RlcyA9IGNhY2hlICYmIGFwcC5tb3VudGVkO1xuICAgICAgICAgICAgICBpZiAoaXNSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYXBwW2lzRGVzID8gJ3Nob3cnIDogJ21vdW50J10oKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwW2lzRGVzID8gJ2hpZGUnIDogJ3VubW91bnQnXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBHYXJmaXNoLmFwcHNbbmFtZV0gPSBhcHA7XG4gICAgICAgICAgICB1bm1vdW50c1tuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgYXBwbGljYXRpb24gZHVyaW5nIHJlbmRlcmluZyBhbmQgZGlzY2FyZCB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICAgICAgICAgICAgaWYgKGFwcC5tb3VudGluZykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBHYXJmaXNoLmNhY2hlQXBwc1tuYW1lXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYWxsKGFwcCwgZmFsc2UpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBcHAgPT09IGFjdGl2ZUFwcCkge1xuICAgICAgICAgICAgICBhd2FpdCBjYWxsKGFwcCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZGVhY3RpdmUoYXBwSW5mbzogaW50ZXJmYWNlcy5BcHBJbmZvLCByb290UGF0aDogc3RyaW5nKSB7XG4gICAgICAgICAgcm91dGVyTG9nKGAke2FwcEluZm8ubmFtZX0gZGVhY3RpdmVgLCB7XG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgcm9vdFBhdGgsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhY3RpdmVBcHAgPSBudWxsO1xuICAgICAgICAgIGNvbnN0IHsgbmFtZSwgZGVhY3RpdmUgfSA9IGFwcEluZm87XG4gICAgICAgICAgaWYgKGRlYWN0aXZlKSByZXR1cm4gZGVhY3RpdmUoYXBwSW5mbywgcm9vdFBhdGgpO1xuXG4gICAgICAgICAgY29uc3QgdW5tb3VudCA9IHVubW91bnRzW25hbWVdO1xuICAgICAgICAgIHVubW91bnQgJiYgdW5tb3VudCgpO1xuICAgICAgICAgIGRlbGV0ZSBHYXJmaXNoLmFwcHNbbmFtZV07XG5cbiAgICAgICAgICAvLyBOZXN0ZWQgc2NlbmUgdG8gcmVtb3ZlIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIG9mIG5lc3RlZCBkYXRhXG4gICAgICAgICAgLy8gVG8gYXZvaWQgdGhlIG1haW4gYXBwbGljYXRpb24gcHJpb3IgdG8gYXBwbGljYXRpb25cbiAgICAgICAgICBjb25zdCBuZWVkVG9EZWxldGVBcHBzID0gcm91dGVyLnJvdXRlckNvbmZpZy5hcHBzLmZpbHRlcigoYXBwKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXBwSW5mby5yb290UGF0aCA9PT0gYXBwLmJhc2VuYW1lKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmVlZFRvRGVsZXRlQXBwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBuZWVkVG9EZWxldGVBcHBzLmZvckVhY2goKGFwcCkgPT4ge1xuICAgICAgICAgICAgICBkZWxldGUgR2FyZmlzaC5hcHBJbmZvc1thcHAubmFtZV07XG4gICAgICAgICAgICAgIGRlbGV0ZSBHYXJmaXNoLmNhY2hlQXBwc1thcHAubmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJvdXRlci5zZXRSb3V0ZXJDb25maWcoe1xuICAgICAgICAgICAgICBhcHBzOiByb3V0ZXIucm91dGVyQ29uZmlnLmFwcHMuZmlsdGVyKChhcHApID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIW5lZWRUb0RlbGV0ZUFwcHMuc29tZShcbiAgICAgICAgICAgICAgICAgIChuZWVkRGVsZXRlKSA9PiBhcHAubmFtZSA9PT0gbmVlZERlbGV0ZS5uYW1lLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXBwcyA9IE9iamVjdC52YWx1ZXMoR2FyZmlzaC5hcHBJbmZvcyk7XG5cbiAgICAgICAgY29uc3QgYXBwTGlzdCA9IGFwcHMuZmlsdGVyKChhcHApID0+IHtcbiAgICAgICAgICBpZiAoIWFwcC5iYXNlbmFtZSkgYXBwLmJhc2VuYW1lID0gYmFzZW5hbWU7XG4gICAgICAgICAgcmV0dXJuICEhYXBwLmFjdGl2ZVdoZW47XG4gICAgICAgIH0pIGFzIEFycmF5PFJlcXVpcmVkPGludGVyZmFjZXMuQXBwSW5mbz4+O1xuXG4gICAgICAgIGNvbnN0IGxpc3Rlbk9wdGlvbnMgPSB7XG4gICAgICAgICAgYmFzZW5hbWUsXG4gICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgIGRlYWN0aXZlLFxuICAgICAgICAgIGF1dG9SZWZyZXNoQXBwLFxuICAgICAgICAgIG5vdE1hdGNoOiBvbk5vdE1hdGNoUm91dGVyLFxuICAgICAgICAgIGFwcHM6IGFwcExpc3QsXG4gICAgICAgICAgbGlzdGVuaW5nOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICByb3V0ZXJMb2coJ2xpc3RlblJvdXRlckFuZFJlRGlyZWN0JywgbGlzdGVuT3B0aW9ucyk7XG4gICAgICAgIGxpc3RlblJvdXRlckFuZFJlRGlyZWN0KGxpc3Rlbk9wdGlvbnMpO1xuICAgICAgfSxcblxuICAgICAgcmVnaXN0ZXJBcHAoYXBwSW5mb3MpIHtcbiAgICAgICAgY29uc3QgYXBwTGlzdCA9IE9iamVjdC52YWx1ZXMoYXBwSW5mb3MpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJvdXRlci5yZWdpc3RlclJvdXRlcihhcHBMaXN0LmZpbHRlcigoYXBwKSA9PiAhIWFwcC5hY3RpdmVXaGVuKSk7XG4gICAgICAgIC8vIEFmdGVyIGNvbXBsZXRpb24gb2YgdGhlIHJlZ2lzdHJhdGlvbiBhcHBsaWNhdGlvbiwgdHJpZ2dlciBhcHBsaWNhdGlvbiBtb3VudFxuICAgICAgICAvLyBIYXMgYmVlbiBydW5uaW5nIGFmdGVyIGFkZGluZyByb3V0aW5nIHRvIHRyaWdnZXIgdGhlIHJlZGlyZWN0aW9uXG4gICAgICAgIGlmICghR2FyZmlzaC5ydW5uaW5nKSByZXR1cm47XG4gICAgICAgIHJvdXRlckxvZygncmVnaXN0ZXJBcHAgaW5pdFJlZGlyZWN0JywgYXBwSW5mb3MpO1xuICAgICAgICBpbml0UmVkaXJlY3QoKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5cbmV4cG9ydCB0eXBlIFJvdXRlckhvb2sgPSAoXG4gIHRvOiBDdXJyZW50Um91dGVySW5mbyxcbiAgZnJvbTogQ3VycmVudFJvdXRlckluZm8sXG4gIG5leHQsXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIFJvdXRlckNoYW5nZSA9IChwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVySW5mbyB7XG4gIGZ1bGxQYXRoOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgcXVlcnk6IE9iamVjdDtcbiAgc3RhdGU6IE9iamVjdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXJyZW50Um91dGVySW5mbyBleHRlbmRzIFJvdXRlckluZm8ge1xuICBtYXRjaGVkOiBBcnJheTxpbnRlcmZhY2VzLkFwcEluZm8+O1xufVxuXG4vLyBEb24ndCBjaGFuZ2UgdGhlIGxvZ28sIGluIG9yZGVyIHRvIGF2b2lkIGluY29uc2lzdGVudCB2ZXJzaW9uIGxlYWRzIHRvIGZhaWx1cmVcbmV4cG9ydCBjb25zdCBfX0dBUkZJU0hfUk9VVEVSX1VQREFURV9GTEFHX18gPSAnX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fJztcblxuZXhwb3J0IGNvbnN0IF9fR0FSRklTSF9ST1VURVJfRkxBR19fID0gJ19fR0FSRklTSF9ST1VURVJfRkxBR19fJztcblxuZXhwb3J0IGNvbnN0IF9fR0FSRklTSF9CRUZPUkVfUk9VVEVSX0VWRU5UX18gPSAnZ2FyZmlzaDpiZWZvcmUtcm91dGluZy1ldmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGJhc2VuYW1lPzogc3RyaW5nO1xuICBsaXN0ZW5pbmc/OiBib29sZWFuO1xuICBjdXJyZW50PzogQ3VycmVudFJvdXRlckluZm87XG4gIGF1dG9SZWZyZXNoQXBwPzogYm9vbGVhbjtcbiAgYXBwczogQXJyYXk8aW50ZXJmYWNlcy5BcHBJbmZvPjtcbiAgYmVmb3JlRWFjaD86IFJvdXRlckhvb2s7XG4gIGFmdGVyRWFjaD86IFJvdXRlckhvb2s7XG4gIHJvdXRlckNoYW5nZT86ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcbiAgYWN0aXZlOiAoXG4gICAgYXBwSW5mbzogaW50ZXJmYWNlcy5BcHBJbmZvLFxuICAgIHJvb3RQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgZGVhY3RpdmU6IChcbiAgICBhcHBJbmZvOiBpbnRlcmZhY2VzLkFwcEluZm8sXG4gICAgcm9vdFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBub3RNYXRjaD86IChwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBSb3V0ZXJDb25maWc6IE9wdGlvbnMgPSB7XG4gIGJhc2VuYW1lOiAnLycsXG4gIGN1cnJlbnQ6IHtcbiAgICBmdWxsUGF0aDogJy8nLFxuICAgIHBhdGg6ICcvJyxcbiAgICBtYXRjaGVkOiBbXSxcbiAgICBxdWVyeToge30sXG4gICAgc3RhdGU6IHt9LFxuICB9LFxuICBhcHBzOiBbXSxcbiAgYmVmb3JlRWFjaDogKHRvLCBmcm9tLCBuZXh0KSA9PiBuZXh0KCksXG4gIGFmdGVyRWFjaDogKHRvLCBmcm9tLCBuZXh0KSA9PiBuZXh0KCksXG4gIGFjdGl2ZTogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCksXG4gIGRlYWN0aXZlOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbiAgcm91dGVyQ2hhbmdlOiAoKSA9PiB7fSxcbiAgYXV0b1JlZnJlc2hBcHA6IHRydWUsXG4gIGxpc3RlbmluZzogdHJ1ZSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VCBleHRlbmRzIGtleW9mIE9wdGlvbnM+KGZpZWxkOiBULCB2YWx1ZTogT3B0aW9uc1tUXSkge1xuICBSb3V0ZXJDb25maWdbZmllbGRdID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQoZmllbGQ6IGtleW9mIE9wdGlvbnMpIHtcbiAgcmV0dXJuIFJvdXRlckNvbmZpZ1tmaWVsZF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRSb3V0ZXJDb25maWcob3B0aW9uczogUGFydGlhbDxPcHRpb25zPikge1xuICBPYmplY3QuYXNzaWduKFJvdXRlckNvbmZpZywgb3B0aW9ucyk7XG59XG4iLCAiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0UXVlcnkocXVlcnk6IHsgW3Byb3BzOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9KSB7XG4gIGNvbnN0IHFzID0gT2JqZWN0LmtleXMocXVlcnkpXG4gICAgLm1hcCgoa2V5KSA9PiBgJHtrZXl9PSR7cXVlcnlba2V5XX1gKVxuICAgIC5qb2luKCcmJyk7XG4gIHJldHVybiBxcyA/ICc/JyArIHFzIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5ID0gJycpIHtcbiAgY29uc3QgcmVzOiB7IFtwcm9wczogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9O1xuICBpZiAocXVlcnkpIHtcbiAgICBxdWVyeVxuICAgICAgLnNsaWNlKDEpXG4gICAgICAuc3BsaXQoJyYnKVxuICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBwYWlycyA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgcmVzW3BhaXJzWzBdXSA9IHBhaXJzO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBcdTg5RTNcdTY3OTBcdTUxRkFcdTVCNTBcdTVFOTRcdTc1MjhcdTc2ODRcdTY4MzlcdThERUZcdTc1MzEsXHU1M0Q2XHU1Rjk3YXBwMVxuICogXHU4OUUzXHU2NzkwXHU1MTg1XHU1QkI5XHVGRjFBXG4gKiAgICAvYmFzZW5hbWUvYXBwMS9hYm91dFx1MzAwMWJhc2VuYW1lL2FwcDFcdTMwMDFiYXNlbmFtZS9hcHAxL1x1MzAwMS9hcHAxL1x1MzAwMS9hcHAxL2Fib3V0XHUzMDAxYXBwMS9cbiAqICAgICMvYXBwMVx1MzAwMS8jL2FwcDEvXHUzMDAxLyMvYXBwMS9kZXRhaWwvXHUzMDAxLyMvYXBwMS9kZXRhaWxcbiAqIEBwYXJhbSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhdGgocGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKG5ldyBSZWdFeHAoJ14vKFteL10rKScpKSB8fCBbXTtcbiAgcmV0dXJuIGAvJHttYXRjaGVzWzFdIHx8ICcnfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kKGFycjogQXJyYXk8RnVuY3Rpb24+LCBmdW5jOiBGdW5jdGlvbikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChmdW5jKGFycltpXSkpIHtcbiAgICAgIHJldHVybiBhcnJbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoKGJhc2VuYW1lOiBzdHJpbmcgPSAnLycsIHBhdGhuYW1lPzogc3RyaW5nKSB7XG4gIGlmIChiYXNlbmFtZSA9PT0gJy8nIHx8IGJhc2VuYW1lID09PSAnJykge1xuICAgIHJldHVybiBwYXRobmFtZSB8fCBsb2NhdGlvbi5wYXRobmFtZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHBhdGhuYW1lIHx8IGxvY2F0aW9uLnBhdGhuYW1lKS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChgXi8/JHtiYXNlbmFtZX1gKSxcbiAgICAgICcnLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcFJvb3RQYXRoKGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbykge1xuICBjb25zdCBwYXRoID0gZ2V0UGF0aChhcHBJbmZvLmJhc2VuYW1lLCBsb2NhdGlvbi5wYXRobmFtZSk7XG4gIGxldCBhcHBSb290UGF0aCA9IGFwcEluZm8uYmFzZW5hbWUgPT09ICcvJyA/ICcnIDogKGFwcEluZm8uYmFzZW5hbWUgfHwgJycpO1xuICBpZiAodHlwZW9mIGFwcEluZm8uYWN0aXZlV2hlbiA9PT0gJ3N0cmluZycpIHtcbiAgICBhcHBSb290UGF0aCArPSBhcHBJbmZvLmFjdGl2ZVdoZW47XG4gIH0gZWxzZSB7XG4gICAgYXBwUm9vdFBhdGggKz0gcGF0aC5zcGxpdCgnJykucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgICAgIC8vIFx1NTMzOVx1OTE0RFxuICAgICAgaWYgKHR5cGVvZiBhcHBJbmZvLmFjdGl2ZVdoZW4gPT09ICdmdW5jdGlvbicgJiYgIWFwcEluZm8uYWN0aXZlV2hlbihwcmUpKVxuICAgICAgICByZXR1cm4gcHJlICsgbmV4dDtcbiAgICAgIHJldHVybiBwcmU7XG4gICAgfSwgJycpO1xuICB9XG4gIHJldHVybiBhcHBSb290UGF0aDtcbn1cbiIsICJpbXBvcnQgeyBSb3V0ZXJIb29rIH0gZnJvbSAnLi4vY29uZmlnJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFzeW5jRm9yRWFjaDxUPihcbiAgYXJyOiBUW10sXG4gIGNhbGxiYWNrOiAodjogVCwgazogbnVtYmVyLCBPOiBUW10pID0+IFByb21pc2U8YW55Pixcbikge1xuICBjb25zdCBsZW5ndGggPSBhcnIubGVuZ3RoO1xuICBsZXQgayA9IDA7XG4gIHdoaWxlIChrIDwgbGVuZ3RoKSB7XG4gICAgY29uc3Qga1ZhbHVlID0gYXJyW2tdO1xuICAgIGF3YWl0IGNhbGxiYWNrKGtWYWx1ZSwgaywgYXJyKTtcbiAgICBrKys7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTWlkZGxlV2FyZSh0bywgZnJvbSwgY2I6IFJvdXRlckhvb2spIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY2IodG8sIGZyb20sIHJlc29sdmUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KHR5cGUpIHtcbiAgbGV0IGU7XG4gIC8vIENvbXBhdGlibGUgd2l0aCBpZVxuICBpZiAoXG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgIT09IC0xIHx8XG4gICAgbmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZignVHJpZGVudC8nKSA+IDBcbiAgKSB7XG4gICAgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50cycpO1xuICAgIGUuaW5pdFVJRXZlbnQodHlwZS50b0xvd2VyQ2FzZSgpLCB0cnVlLCBmYWxzZSwgd2luZG93LCAwKTtcbiAgfSBlbHNlIHtcbiAgICBlID0gbmV3IEV2ZW50KHR5cGUudG9Mb3dlckNhc2UoKSk7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG4iLCAiLy8gY29weSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJtb2R1bGVzL2N1c3RvbS1ldmVudFxuXG5jb25zdCBOYXRpdmVDdXN0b21FdmVudCA9XG4gIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gKGdsb2JhbCBhcyBhbnkpPy5DdXN0b21FdmVudCA6IG51bGw7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwID0gbmV3IE5hdGl2ZUN1c3RvbUV2ZW50KCdjYXQnLCB7IGRldGFpbDogeyBmb286ICdiYXInIH0gfSk7XG4gICAgcmV0dXJuICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge31cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5sZXQgQ3VzdG9tRXZlbnQ6IGFueTtcblxuaWYgKE5hdGl2ZUN1c3RvbUV2ZW50ICYmIHVzZU5hdGl2ZSgpKSB7XG4gIEN1c3RvbUV2ZW50ID0gTmF0aXZlQ3VzdG9tRXZlbnQ7XG59IGVsc2UgaWYgKFxuICAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGRvY3VtZW50ICYmXG4gICdmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudFxuKSB7XG4gIC8vIElFID49IDlcbiAgQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IG51bGwgfTtcbiAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KFxuICAgICAgdHlwZSxcbiAgICAgIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgZmFsc2UsXG4gICAgICBwYXJhbXMuZGV0YWlsIHx8IG51bGwsXG4gICAgKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gSUUgPD0gOFxuICBDdXN0b21FdmVudCA9IGZ1bmN0aW9uICh0eXBlLCBwYXJhbXMpIHtcbiAgICBjb25zdCBlID0gKGRvY3VtZW50IGFzIGFueSkuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICBlLnR5cGUgPSB0eXBlO1xuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIGUuYnViYmxlcyA9IEJvb2xlYW4ocGFyYW1zLmJ1YmJsZXMpO1xuICAgICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgICBlLmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgICAgZS5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgICBlLmRldGFpbCA9IHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEN1c3RvbUV2ZW50O1xuIiwgImltcG9ydCB7IHZhbGlkVVJMIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgUm91dGVyQ29uZmlnLCBfX0dBUkZJU0hfUk9VVEVSX1VQREFURV9GTEFHX18gfSBmcm9tICcuLi9jb25maWcnO1xuXG5mdW5jdGlvbiBjcmVhdGVQb3BTdGF0ZUV2ZW50KHN0YXRlOiBhbnksIG9yaWdpbmFsTWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gIGxldCBldnQ7XG4gIHRyeSB7XG4gICAgZXZ0ID0gbmV3IFBvcFN0YXRlRXZlbnQoJ3BvcHN0YXRlJywgeyBzdGF0ZSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gSUUgMTEgY29tcGF0aWJpbGl0eVxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdQb3BTdGF0ZUV2ZW50Jyk7XG4gICAgKGV2dCBhcyBhbnkpLmluaXRQb3BTdGF0ZUV2ZW50KCdwb3BzdGF0ZScsIGZhbHNlLCBmYWxzZSwgc3RhdGUpO1xuICB9XG4gIChldnQgYXMgYW55KS5nYXJmaXNoID0gdHJ1ZTtcbiAgKGV2dCBhcyBhbnkpLmdhcmZpc2hUcmlnZ2VyID0gb3JpZ2luYWxNZXRob2ROYW1lO1xuICByZXR1cm4gZXZ0O1xufVxuXG5leHBvcnQgY29uc3QgY2FsbENhcHR1cmVkRXZlbnRMaXN0ZW5lcnMgPSAodHlwZToga2V5b2YgSGlzdG9yeSkgPT4ge1xuICBjb25zdCBldmVudEFyZ3VtZW50cyA9IGNyZWF0ZVBvcFN0YXRlRXZlbnQod2luZG93Lmhpc3Rvcnkuc3RhdGUsIHR5cGUpO1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudEFyZ3VtZW50cyk7XG59O1xuXG5jb25zdCBoYW5kbGVyUGFyYW1zID0gZnVuY3Rpb24gKFxuICBwYXRoOiBzdHJpbmcsXG4gIHF1ZXJ5OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LFxuICBiYXNlbmFtZT86IHN0cmluZyxcbik6IHN0cmluZyB7XG4gIGlmICghcGF0aCB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHJldHVybiAnJztcbiAgbGV0IHVybCA9IHBhdGg7XG4gIGlmICh1cmxbMF0gIT09ICcvJykgdXJsID0gJy8nICsgdXJsO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHF1ZXJ5KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBjb25zdCBxcyA9IE9iamVjdC5rZXlzKHF1ZXJ5KVxuICAgICAgLm1hcCgoa2V5KSA9PiBgJHtrZXl9PSR7cXVlcnlba2V5XX1gKVxuICAgICAgLmpvaW4oJyYnKTtcbiAgICB1cmwgKz0gcXMgPyAnPycgKyBxcyA6ICcnO1xuICB9XG4gIGlmIChiYXNlbmFtZSAhPT0gJy8nKSB1cmwgPSBiYXNlbmFtZSArIHVybDtcbiAgaWYgKHVybFswXSAhPT0gJy8nKSB1cmwgPSAnLycgKyB1cmw7XG4gIHJldHVybiB1cmw7XG59O1xuXG5leHBvcnQgY29uc3QgcHVzaCA9ICh7XG4gIHBhdGgsXG4gIHF1ZXJ5LFxuICBiYXNlbmFtZSxcbn06IHtcbiAgcGF0aDogc3RyaW5nO1xuICBxdWVyeT86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIGJhc2VuYW1lPzogc3RyaW5nO1xufSkgPT4ge1xuICBpZiAoIWJhc2VuYW1lKSBiYXNlbmFtZSA9IFJvdXRlckNvbmZpZy5iYXNlbmFtZSB8fCAnLyc7XG5cbiAgbGV0IHVybDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGlmICh2YWxpZFVSTChwYXRoKSkge1xuICAgIHVybCA9IC8oXmh0dHBzPzopfCheXFwvXFwvKS8udGVzdChwYXRoKSA/IHBhdGggOiBgLy8ke3BhdGh9YDtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSBoYW5kbGVyUGFyYW1zKHBhdGgsIHF1ZXJ5ISwgYmFzZW5hbWUpO1xuICB9XG4gIC8vIFx1NEUwRFx1NEZERFx1NzU1OVx1NEU0Qlx1NTI0RGhpc3Rvcnkuc3RhdGVcdTc2ODRcdTcyQjZcdTYwMDFcdTRGMUFcdTVCRkNcdTgxRjR2dWUzXHU0RjlEXHU4RDU2c3RhdGVcdTc2ODRcdTYwQzVcdTUxQjVcdTY1RTBcdTZDRDVcdTZCNjNcdTVFMzhcdTZFMzJcdTY3RDNcdTk4NzVcdTk3NjJcbiAgaGlzdG9yeS5wdXNoU3RhdGUoXG4gICAgeyBbX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fXTogdHJ1ZSwgLi4uaGlzdG9yeS5zdGF0ZSB9LFxuICAgICcnLFxuICAgIHVybCxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXBsYWNlID0gKHtcbiAgcGF0aCxcbiAgcXVlcnksXG4gIGJhc2VuYW1lLFxufToge1xuICBwYXRoOiBzdHJpbmc7XG4gIHF1ZXJ5PzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgYmFzZW5hbWU/OiBzdHJpbmc7XG59KSA9PiB7XG4gIGlmICghYmFzZW5hbWUpIGJhc2VuYW1lID0gUm91dGVyQ29uZmlnLmJhc2VuYW1lIHx8ICcvJztcblxuICBsZXQgdXJsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgaWYgKHZhbGlkVVJMKHBhdGgpKSB7XG4gICAgdXJsID0gL14oaHR0cHM/OikoXFwvXFwvKS8udGVzdChwYXRoKSA/IHBhdGggOiBgLy8ke3BhdGh9YDtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSBoYW5kbGVyUGFyYW1zKHBhdGgsIHF1ZXJ5ISwgYmFzZW5hbWUpO1xuICB9XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKFxuICAgIHsgW19fR0FSRklTSF9ST1VURVJfVVBEQVRFX0ZMQUdfX106IHRydWUsIC4uLmhpc3Rvcnkuc3RhdGUgfSxcbiAgICAnJyxcbiAgICB1cmwsXG4gICk7XG59O1xuIiwgImltcG9ydCB7IHBhcnNlUXVlcnksIGdldEFwcFJvb3RQYXRoLCBnZXRQYXRoIH0gZnJvbSAnLi91dGlscy91cmxVdCc7XG5pbXBvcnQgeyBjYWxsQ2FwdHVyZWRFdmVudExpc3RlbmVycyB9IGZyb20gJy4vdXRpbHMvbmF2RXZlbnQnO1xuaW1wb3J0IHsgYXN5bmNGb3JFYWNoLCB0b01pZGRsZVdhcmUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7XG4gIFJvdXRlckNvbmZpZyxcbiAgc2V0Um91dGVyQ29uZmlnLFxuICBSb3V0ZXJJbmZvLFxuICBfX0dBUkZJU0hfUk9VVEVSX1VQREFURV9GTEFHX18sXG4gIF9fR0FSRklTSF9ST1VURVJfRkxBR19fLFxuICBfX0dBUkZJU0hfQkVGT1JFX1JPVVRFUl9FVkVOVF9fLFxufSBmcm9tICcuL2NvbmZpZyc7XG5cbi8vIEluc3BlY3Rpb24gYXBwbGljYXRpb24gaXMgYWN0aXZhdGVkXG5jb25zdCBoYXNBY3RpdmUgPSAoYWN0aXZlV2hlbjogYW55LCBwYXRoOiBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBhY3RpdmVXaGVuID09PSAnc3RyaW5nJykge1xuICAgIGlmIChhY3RpdmVXaGVuWzBdICE9PSAnLycpIGFjdGl2ZVdoZW4gPSBgLyR7YWN0aXZlV2hlbn1gO1xuICAgIC8vIFNldCB0byB0aGUgcm9vdCBwYXRoIG11c3QgYmUgY29uZ3J1ZW50XG4gICAgaWYgKGFjdGl2ZVdoZW4gPT09ICcvJyAmJiBwYXRoID09PSBhY3RpdmVXaGVuKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGFjdGl2ZVdoZW5BcnIgPSBhY3RpdmVXaGVuLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgcGF0aEFyciA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICBsZXQgZmxhZzogYm9vbGVhbiA9IHRydWU7XG4gICAgYWN0aXZlV2hlbkFyci5mb3JFYWNoKChwYXRoSXRlbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAocGF0aEl0ZW0gJiYgcGF0aEl0ZW0gIT09IHBhdGhBcnJbaW5kZXhdKSB7XG4gICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmxhZztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYWN0aXZlV2hlbihwYXRoKTtcbiAgfVxufTtcblxuLy8gT3ZlcmxvYWRpbmcgdG8gc3BlY2lmeSB0aGUgcm91dGluZ1xuLy8gMS4gQXBwbGljYXRpb25zIGZvciBjdXJyZW50IG5lZWRzIHRvIGJlIGRlc3Ryb3llZFxuLy8gMi4gR2V0cyB0aGUgY3VycmVudCBuZWVkIHRvIGFjdGl2YXRlIHRoZSBhcHBsaWNhdGlvblxuLy8gMy4gVG8gYWNxdWlyZSBuZXcgbmVlZCB0byBhY3RpdmF0ZSB0aGUgYXBwbGljYXRpb25cbi8vIDQuIFRyaWdnZXIgZnVuY3Rpb24gYmVmb3JlRWFjaCwgdHJpZ2dlciBpbiBmcm9udCBvZiB0aGUgZGVzdHJveWVkIGFsbCBhcHBsaWNhdGlvbnNcbi8vIDUuIFRyaWdnZXIgdGhlIG5lZWQgdG8gZGVzdHJveSBkZWFjdGl2ZSBmdW5jdGlvbiBvZiBhcHBsaWNhdGlvblxuLy8gNi4gSWYgdGhlcmUgaXMgbm8gbmVlZCB0byBhY3RpdmF0ZSB0aGUgYXBwbGljYXRpb24sIGJ5IGRlZmF1bHQsIHRyaWdnZXJpbmcgcG9wc3RhdGUgYXBwbGljYXRpb24gY29tcG9uZW50IHZpZXcgY2hpbGQgdG8gdXBkYXRlXG5leHBvcnQgY29uc3QgbGlua1RvID0gYXN5bmMgKHtcbiAgdG9Sb3V0ZXJJbmZvLFxuICBmcm9tUm91dGVySW5mbyxcbiAgZXZlbnRUeXBlLFxufToge1xuICB0b1JvdXRlckluZm86IFJvdXRlckluZm87XG4gIGZyb21Sb3V0ZXJJbmZvOiBSb3V0ZXJJbmZvO1xuICBldmVudFR5cGU6IGtleW9mIEhpc3RvcnkgfCAncG9wc3RhdGUnO1xufSkgPT4ge1xuICBjb25zdCB7XG4gICAgY3VycmVudCxcbiAgICBhcHBzLFxuICAgIGRlYWN0aXZlLFxuICAgIGFjdGl2ZSxcbiAgICBub3RNYXRjaCxcbiAgICBiZWZvcmVFYWNoLFxuICAgIGFmdGVyRWFjaCxcbiAgICBhdXRvUmVmcmVzaEFwcCxcbiAgfSA9IFJvdXRlckNvbmZpZztcblxuICBjb25zdCBkZWFjdGl2ZUFwcHMgPSBjdXJyZW50IS5tYXRjaGVkLmZpbHRlcihcbiAgICAoYXBwSW5mbykgPT5cbiAgICAgICFoYXNBY3RpdmUoXG4gICAgICAgIGFwcEluZm8uYWN0aXZlV2hlbixcbiAgICAgICAgZ2V0UGF0aChhcHBJbmZvLmJhc2VuYW1lLCBsb2NhdGlvbi5wYXRobmFtZSksXG4gICAgICApLFxuICApO1xuXG4gIC8vIEFjdGl2YXRlIHRoZSBjb3JyZXNwb25kaW5nIGFwcGxpY2F0aW9uXG4gIGNvbnN0IGFjdGl2ZUFwcHMgPSBhcHBzLmZpbHRlcigoYXBwSW5mbykgPT4ge1xuICAgIHJldHVybiBoYXNBY3RpdmUoXG4gICAgICBhcHBJbmZvLmFjdGl2ZVdoZW4sXG4gICAgICBnZXRQYXRoKGFwcEluZm8uYmFzZW5hbWUsIGxvY2F0aW9uLnBhdGhuYW1lKSxcbiAgICApO1xuICB9KTtcblxuICBjb25zdCBuZWVkVG9BY3RpdmUgPSBhY3RpdmVBcHBzLmZpbHRlcigoeyBuYW1lIH0pID0+IHtcbiAgICByZXR1cm4gIWN1cnJlbnQhLm1hdGNoZWQuc29tZSgoeyBuYW1lOiBjTmFtZSB9KSA9PiBuYW1lID09PSBjTmFtZSk7XG4gIH0pO1xuXG4gIC8vIHJvdXRlciBpbmZvc1xuICBjb25zdCB0byA9IHtcbiAgICAuLi50b1JvdXRlckluZm8sXG4gICAgbWF0Y2hlZDogbmVlZFRvQWN0aXZlLFxuICB9O1xuXG4gIGNvbnN0IGZyb20gPSB7XG4gICAgLi4uZnJvbVJvdXRlckluZm8sXG4gICAgbWF0Y2hlZDogZGVhY3RpdmVBcHBzLFxuICB9O1xuXG4gIGF3YWl0IHRvTWlkZGxlV2FyZSh0bywgZnJvbSwgYmVmb3JlRWFjaCEpO1xuXG4gIC8vIFBhdXNlIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIG9mIGFjdGl2ZSBzdGF0ZVxuICBpZiAoY3VycmVudCEubWF0Y2hlZC5sZW5ndGggPiAwKSB7XG4gICAgYXdhaXQgYXN5bmNGb3JFYWNoKFxuICAgICAgZGVhY3RpdmVBcHBzLFxuICAgICAgYXN5bmMgKGFwcEluZm8pID0+XG4gICAgICAgIGF3YWl0IGRlYWN0aXZlKGFwcEluZm8sIGdldFBhdGgoYXBwSW5mby5iYXNlbmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpKSxcbiAgICApO1xuICB9XG5cbiAgc2V0Um91dGVyQ29uZmlnKHtcbiAgICBjdXJyZW50OiB7XG4gICAgICBwYXRoOiBnZXRQYXRoKFJvdXRlckNvbmZpZy5iYXNlbmFtZSEpLFxuICAgICAgZnVsbFBhdGg6IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgbWF0Y2hlZDogYWN0aXZlQXBwcyxcbiAgICAgIHN0YXRlOiBoaXN0b3J5LnN0YXRlLFxuICAgICAgcXVlcnk6IHBhcnNlUXVlcnkobG9jYXRpb24uc2VhcmNoKSxcbiAgICB9LFxuICB9KTtcblxuICAvLyBXaXRoaW4gdGhlIGFwcGxpY2F0aW9uIHJvdXRpbmcganVtcCwgYnkgY29sbGVjdGluZyB0aGUgcm91dGluZyBmdW5jdGlvbiBmb3IgcHJvY2Vzc2luZy5cbiAgLy8gRmlsdGVyaW5nIGdhci1yb3V0ZXIgcG9wc3RhdGUgaGlqYWNraW5nIG9mIHRoZSByb3V0ZXJcbiAgLy8gSW4gdGhlIHN3aXRjaCBiYWNrIGFuZCBmb3J0aCBpbiB0aGUgYXBwbGljYXRpb24gaXMgcHJvdmlkZWQgdGhyb3VnaCByb3V0aW5nIHB1c2ggbWV0aG9kIHdvdWxkIHRyaWdnZXIgYXBwbGljYXRpb24gdXBkYXRlc1xuICAvLyBhcHBsaWNhdGlvbiB3aWxsIHJlZnJlc2ggd2hlbiBhdXRvUmVmcmVzaCBjb25maWd1cmF0aW9uIHRvIHRydWVcbiAgY29uc3QgY3VyU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcbiAgaWYgKFxuICAgIGV2ZW50VHlwZSAhPT0gJ3BvcHN0YXRlJyAmJlxuICAgIChjdXJTdGF0ZVtfX0dBUkZJU0hfUk9VVEVSX1VQREFURV9GTEFHX19dIHx8IGF1dG9SZWZyZXNoQXBwKVxuICApIHtcbiAgICBjYWxsQ2FwdHVyZWRFdmVudExpc3RlbmVycyhldmVudFR5cGUpO1xuICB9XG5cbiAgYXdhaXQgYXN5bmNGb3JFYWNoKG5lZWRUb0FjdGl2ZSwgYXN5bmMgKGFwcEluZm8pID0+IHtcbiAgICAvLyBGdW5jdGlvbiB1c2luZyBtYXRjaGVzIGNoYXJhY3RlciBhbmQgcm91dGluZyB1c2luZyBzdHJpbmcgbWF0Y2hpbmcgY2hhcmFjdGVyc1xuICAgIGNvbnN0IGFwcFJvb3RQYXRoID0gZ2V0QXBwUm9vdFBhdGgoYXBwSW5mbyk7XG4gICAgYXdhaXQgYWN0aXZlKGFwcEluZm8sIGFwcFJvb3RQYXRoKTtcbiAgfSk7XG5cbiAgaWYgKGFjdGl2ZUFwcHMubGVuZ3RoID09PSAwICYmIG5vdE1hdGNoKSBub3RNYXRjaChsb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgYXdhaXQgdG9NaWRkbGVXYXJlKHRvLCBmcm9tLCBhZnRlckVhY2ghKTtcbn07XG4iLCAiaW1wb3J0IHsgZ2V0UGF0aCwgcGFyc2VRdWVyeSB9IGZyb20gJy4vdXRpbHMvdXJsVXQnO1xuaW1wb3J0IHsgY3JlYXRlRXZlbnQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7XG4gIFJvdXRlckNvbmZpZyxcbiAgX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fLFxuICBfX0dBUkZJU0hfUk9VVEVSX0ZMQUdfXyxcbiAgX19HQVJGSVNIX0JFRk9SRV9ST1VURVJfRVZFTlRfXyxcbn0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IEN1c3RvbUV2ZW50IGZyb20gJy4vdXRpbHMvY3VzdG9tRXZlbnQnO1xuaW1wb3J0IHsgbGlua1RvIH0gZnJvbSAnLi9saW5rVG8nO1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsQWdlbnQgPSAoKSA9PiB7XG4gIC8vIEJ5IGlkZW50aWZ5aW5nIHdoZXRoZXIgaGF2ZSBmaW5pc2hlZCBsaXN0ZW5pbmcsIGlmIGZpbmlzaGVkIGxpc3RlbmluZywgbGlzdGVuaW5nIHRvIHRoZSByb3V0aW5nIGNoYW5nZXMgZG8gbm90IG5lZWQgdG8gaGlqYWNrIHRoZSBvcmlnaW5hbCBldmVudFxuICAvLyBTdXBwb3J0IG5lc3RlZCBzY2VuZVxuICBjb25zdCBhZGRSb3V0ZXJMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihfX0dBUkZJU0hfQkVGT1JFX1JPVVRFUl9FVkVOVF9fLCBmdW5jdGlvbiAoZW52KSB7XG4gICAgICBSb3V0ZXJDb25maWcucm91dGVyQ2hhbmdlICYmIFJvdXRlckNvbmZpZy5yb3V0ZXJDaGFuZ2UobG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgbGlua1RvKChlbnYgYXMgYW55KS5kZXRhaWwpO1xuICAgIH0pO1xuICB9O1xuXG4gIGlmICghd2luZG93W19fR0FSRklTSF9ST1VURVJfRkxBR19fXSkge1xuICAgIC8vIExpc3RlbiBmb3IgcHVzaFN0YXRlIGFuZCByZXBsYWNlU3RhdGUsIGNhbGwgbGlua1RvLCBwcm9jZXNzaW5nLCBsaXN0ZW4gYmFja1xuICAgIC8vIFJld3JpdGUgdGhlIGhpc3RvcnkgQVBJIG1ldGhvZCwgdHJpZ2dlcmluZyBldmVudHMgaW4gdGhlIGNhbGxcblxuICAgIGNvbnN0IHJld3JpdGUgPSBmdW5jdGlvbiAodHlwZToga2V5b2YgSGlzdG9yeSkge1xuICAgICAgY29uc3QgaGFwaSA9IGhpc3RvcnlbdHlwZV07XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6IEhpc3RvcnkpIHtcbiAgICAgICAgY29uc3QgdXJsQmVmb3JlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIGNvbnN0IHN0YXRlQmVmb3JlID0gaGlzdG9yeT8uc3RhdGU7XG4gICAgICAgIGNvbnN0IHJlcyA9IGhhcGkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc3QgdXJsQWZ0ZXIgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgY29uc3Qgc3RhdGVBZnRlciA9IGhpc3Rvcnk/LnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IGUgPSBjcmVhdGVFdmVudCh0eXBlKTtcbiAgICAgICAgKGUgYXMgYW55KS5hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHVybEJlZm9yZSAhPT0gdXJsQWZ0ZXIgfHxcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShzdGF0ZUJlZm9yZSkgIT09IEpTT04uc3RyaW5naWZ5KHN0YXRlQWZ0ZXIpXG4gICAgICAgICkge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KF9fR0FSRklTSF9CRUZPUkVfUk9VVEVSX0VWRU5UX18sIHtcbiAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgdG9Sb3V0ZXJJbmZvOiB7XG4gICAgICAgICAgICAgICAgICBmdWxsUGF0aDogdXJsQWZ0ZXIsXG4gICAgICAgICAgICAgICAgICBxdWVyeTogcGFyc2VRdWVyeShsb2NhdGlvbi5zZWFyY2gpLFxuICAgICAgICAgICAgICAgICAgcGF0aDogZ2V0UGF0aChSb3V0ZXJDb25maWcuYmFzZW5hbWUhLCB1cmxBZnRlciksXG4gICAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGVBZnRlcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZyb21Sb3V0ZXJJbmZvOiB7XG4gICAgICAgICAgICAgICAgICBmdWxsUGF0aDogdXJsQmVmb3JlLFxuICAgICAgICAgICAgICAgICAgcXVlcnk6IHBhcnNlUXVlcnkobG9jYXRpb24uc2VhcmNoKSxcbiAgICAgICAgICAgICAgICAgIHBhdGg6IGdldFBhdGgoUm91dGVyQ29uZmlnLmJhc2VuYW1lISwgdXJsQmVmb3JlKSxcbiAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZUJlZm9yZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2luZG93LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSA9IHJld3JpdGUoJ3B1c2hTdGF0ZScpO1xuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlID0gcmV3cml0ZSgncmVwbGFjZVN0YXRlJyk7XG5cbiAgICAvLyBCZWZvcmUgdGhlIGNvbGxlY3Rpb24gYXBwbGljYXRpb24gc3ViIHJvdXRpbmcsIGZvcndhcmQgYmFja3dhcmQgcm91dGluZyB1cGRhdGVzIGJldHdlZW4gY2hpbGQgYXBwbGljYXRpb25cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdwb3BzdGF0ZScsXG4gICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gU3RvcCB0cmlnZ2VyIGNvbGxlY3Rpb24gZnVuY3Rpb24sIGZpcmUgYWdhaW4gbWF0Y2ggcmVuZGVyaW5nXG4gICAgICAgIGlmIChldmVudCAmJiB0eXBlb2YgZXZlbnQgPT09ICdvYmplY3QnICYmIChldmVudCBhcyBhbnkpLmdhcmZpc2gpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaGlzdG9yeS5zdGF0ZSAmJiB0eXBlb2YgaGlzdG9yeS5zdGF0ZSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgZGVsZXRlIGhpc3Rvcnkuc3RhdGVbX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fXTtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KF9fR0FSRklTSF9CRUZPUkVfUk9VVEVSX0VWRU5UX18sIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICB0b1JvdXRlckluZm86IHtcbiAgICAgICAgICAgICAgICBmdWxsUGF0aDogbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgcXVlcnk6IHBhcnNlUXVlcnkobG9jYXRpb24uc2VhcmNoKSxcbiAgICAgICAgICAgICAgICBwYXRoOiBnZXRQYXRoKFJvdXRlckNvbmZpZy5iYXNlbmFtZSEpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmcm9tUm91dGVySW5mbzoge1xuICAgICAgICAgICAgICAgIGZ1bGxQYXRoOiBSb3V0ZXJDb25maWcuY3VycmVudCEuZnVsbFBhdGgsXG4gICAgICAgICAgICAgICAgcGF0aDogZ2V0UGF0aChcbiAgICAgICAgICAgICAgICAgIFJvdXRlckNvbmZpZy5iYXNlbmFtZSEsXG4gICAgICAgICAgICAgICAgICBSb3V0ZXJDb25maWcuY3VycmVudCEucGF0aCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBSb3V0ZXJDb25maWcuY3VycmVudCEucXVlcnksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV2ZW50VHlwZTogJ3BvcHN0YXRlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgZmFsc2UsXG4gICAgKTtcblxuICAgIHdpbmRvd1tfX0dBUkZJU0hfUk9VVEVSX0ZMQUdfX10gPSB0cnVlO1xuICB9XG4gIGFkZFJvdXRlckxpc3RlbmVyKCk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdFJlZGlyZWN0ID0gKCkgPT4ge1xuICBsaW5rVG8oe1xuICAgIHRvUm91dGVySW5mbzoge1xuICAgICAgZnVsbFBhdGg6IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgcGF0aDogZ2V0UGF0aChSb3V0ZXJDb25maWcuYmFzZW5hbWUhKSxcbiAgICAgIHF1ZXJ5OiBwYXJzZVF1ZXJ5KGxvY2F0aW9uLnNlYXJjaCksXG4gICAgICBzdGF0ZTogaGlzdG9yeS5zdGF0ZSxcbiAgICB9LFxuICAgIGZyb21Sb3V0ZXJJbmZvOiB7XG4gICAgICBmdWxsUGF0aDogJy8nLFxuICAgICAgcGF0aDogJy8nLFxuICAgICAgcXVlcnk6IHt9LFxuICAgICAgc3RhdGU6IHt9LFxuICAgIH0sXG4gICAgZXZlbnRUeXBlOiAncHVzaFN0YXRlJyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgbGlzdGVuID0gKCkgPT4ge1xuICBub3JtYWxBZ2VudCgpO1xuICBpbml0UmVkaXJlY3QoKTtcbn07XG4iLCAiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAnLi9hZ2VudFJvdXRlcic7XG5pbXBvcnQge1xuICBzZXRSb3V0ZXJDb25maWcsXG4gIFJvdXRlckNvbmZpZyxcbiAgc2V0IGFzIFJvdXRlclNldCxcbiAgT3B0aW9ucyxcbiAgUm91dGVySG9vayxcbiAgUm91dGVyQ2hhbmdlLFxufSBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCB7IHB1c2gsIHJlcGxhY2UgfSBmcm9tICcuL3V0aWxzL25hdkV2ZW50JztcblxuZXhwb3J0IHsgcHVzaCwgcmVwbGFjZSB9IGZyb20gJy4vdXRpbHMvbmF2RXZlbnQnO1xuXG5leHBvcnQgY29uc3QgYmVmb3JlRWFjaCA9IChob29rOiBSb3V0ZXJIb29rKSA9PiB7XG4gIFJvdXRlclNldCgnYmVmb3JlRWFjaCcsIGhvb2spO1xufTtcblxuZXhwb3J0IGNvbnN0IGFmdGVyRWFjaCA9IChob29rOiBSb3V0ZXJIb29rKSA9PiB7XG4gIFJvdXRlclNldCgnYWZ0ZXJFYWNoJywgaG9vayk7XG59O1xuXG5leHBvcnQgY29uc3Qgcm91dGVyQ2hhbmdlID0gKGhvb2s6IFJvdXRlckNoYW5nZSkgPT4ge1xuICBSb3V0ZXJTZXQoJ3JvdXRlckNoYW5nZScsIGhvb2spO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyUm91dGVyID0gKEFwcHM6IEFycmF5PGludGVyZmFjZXMuQXBwSW5mbz4pID0+IHtcbiAgY29uc3QgdW5yZWdpc3RlckFwcHMgPSBBcHBzLmZpbHRlcihcbiAgICAoYXBwKSA9PiAhUm91dGVyQ29uZmlnLmFwcHMuc29tZSgoaXRlbSkgPT4gYXBwLm5hbWUgPT09IGl0ZW0ubmFtZSksXG4gICk7XG4gIFJvdXRlclNldCgnYXBwcycsIFJvdXRlckNvbmZpZy5hcHBzLmNvbmNhdCh1bnJlZ2lzdGVyQXBwcykpO1xufTtcblxuLyoqXG4gKiAxLlx1NkNFOFx1NTE4Q1x1NUI1MFx1NUU5NFx1NzUyOFxuICogMi5cdTVCRjlcdTVFOTRcdTVCNTBcdTVFOTRcdTc1MjhcdTZGQzBcdTZEM0JcdUZGMENcdTg5RTZcdTUzRDFcdTZGQzBcdTZEM0JcdTU2REVcdThDMDNcbiAqIEBwYXJhbSBPcHRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBsaXN0ZW5Sb3V0ZXJBbmRSZURpcmVjdCA9ICh7XG4gIGFwcHMsXG4gIGJhc2VuYW1lID0gJy8nLFxuICBhdXRvUmVmcmVzaEFwcCxcbiAgYWN0aXZlLFxuICBkZWFjdGl2ZSxcbiAgbm90TWF0Y2gsXG4gIGxpc3RlbmluZyA9IHRydWUsXG59OiBPcHRpb25zKSA9PiB7XG4gIC8vIFx1NkNFOFx1NTE4Q1x1NUI1MFx1NUU5NFx1NzUyOFx1MzAwMVx1NkNFOFx1NTE4Q1x1NkZDMFx1NkQzQlx1MzAwMVx1OTUwMFx1NkJDMVx1OTRBOVx1NUI1MFxuICByZWdpc3RlclJvdXRlcihhcHBzKTtcblxuICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTRGRTFcdTYwNkZcbiAgc2V0Um91dGVyQ29uZmlnKHtcbiAgICBiYXNlbmFtZSxcbiAgICBhdXRvUmVmcmVzaEFwcCxcbiAgICAvLyBzdXBwb3J0UHJveHk6ICEhd2luZG93LlByb3h5LFxuICAgIGFjdGl2ZSxcbiAgICBkZWFjdGl2ZSxcbiAgICBub3RNYXRjaCxcbiAgICBsaXN0ZW5pbmcsXG4gIH0pO1xuXG4gIC8vIFx1NUYwMFx1NTlDQlx1NzZEMVx1NTQyQ1x1OERFRlx1NzUzMVx1NTNEOFx1NTMxNlx1ODlFNlx1NTNEMVx1MzAwMVx1NUI1MFx1NUU5NFx1NzUyOFx1NjZGNFx1NjVCMFx1MzAwMlx1OTFDRFx1OEY3RFx1OUVEOFx1OEJBNFx1NTIxRFx1NTlDQlx1NUI1MFx1NUU5NFx1NzUyOFxuICBsaXN0ZW4oKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVySW50ZXJmYWNlIHtcbiAgcHVzaDogKHtcbiAgICBwYXRoLFxuICAgIHF1ZXJ5LFxuICAgIGJhc2VuYW1lLFxuICB9OiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGJhc2VuYW1lPzogc3RyaW5nO1xuICAgIHF1ZXJ5Pzoge1xuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG4gIH0pID0+IHZvaWQ7XG4gIHJlcGxhY2U6ICh7XG4gICAgcGF0aCxcbiAgICBxdWVyeSxcbiAgICBiYXNlbmFtZSxcbiAgfToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBiYXNlbmFtZT86IHN0cmluZztcbiAgICBxdWVyeT86IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICB9KSA9PiB2b2lkO1xuICBiZWZvcmVFYWNoOiAoaG9vazogUm91dGVySG9vaykgPT4gdm9pZDtcbiAgYWZ0ZXJFYWNoOiAoaG9vazogUm91dGVySG9vaykgPT4gdm9pZDtcbiAgcmVnaXN0ZXJSb3V0ZXI6IChcbiAgICBBcHBzOiBpbnRlcmZhY2VzLkFwcEluZm8gfCBBcnJheTxpbnRlcmZhY2VzLkFwcEluZm8+LFxuICApID0+IHZvaWQ7XG4gIHJvdXRlckNoYW5nZTogKGhvb2s6IFJvdXRlckNoYW5nZSkgPT4gdm9pZDtcbiAgc2V0Um91dGVyQ29uZmlnOiB0eXBlb2Ygc2V0Um91dGVyQ29uZmlnO1xuICBsaXN0ZW5Sb3V0ZXJBbmRSZURpcmVjdDogKHtcbiAgICBhcHBzLFxuICAgIGJhc2VuYW1lLFxuICAgIGF1dG9SZWZyZXNoQXBwLFxuICAgIGFjdGl2ZSxcbiAgICBkZWFjdGl2ZSxcbiAgICBub3RNYXRjaCxcbiAgfTogT3B0aW9ucykgPT4gdm9pZDtcbiAgcm91dGVyQ29uZmlnOiBPcHRpb25zO1xufVxuXG5jb25zdCBSb3V0ZXI6IFJvdXRlckludGVyZmFjZSA9IHtcbiAgcHVzaCxcbiAgcmVwbGFjZSxcbiAgYmVmb3JlRWFjaCxcbiAgYWZ0ZXJFYWNoLFxuICByZWdpc3RlclJvdXRlcixcbiAgcm91dGVyQ2hhbmdlLFxuICBsaXN0ZW5Sb3V0ZXJBbmRSZURpcmVjdCxcbiAgc2V0Um91dGVyQ29uZmlnLFxuICByb3V0ZXJDb25maWc6IFJvdXRlckNvbmZpZyxcbn07XG5cbmV4cG9ydCB7IGluaXRSZWRpcmVjdCB9IGZyb20gJy4vYWdlbnRSb3V0ZXInO1xuXG4vL2VzbGludC1kaXNhYmxlLW5leHQtbGluZVxuZXhwb3J0IGRlZmF1bHQgUm91dGVyO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQ3FCTyxJQUFNLGlDQUFpQztBQUV2QyxJQUFNLDBCQUEwQjtBQUVoQyxJQUFNLGtDQUFrQztBQXNCeEMsSUFBTSxl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
