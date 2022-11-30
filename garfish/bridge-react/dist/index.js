var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  reactBridge: () => reactBridge
});

// src/reactBridge.ts
var React = __toESM(require("react"));
var ReactDOM = __toESM(require("react-dom"));
var import_utils = require("@garfish/utils");
var defaultOpts = {
  rootComponent: void 0,
  loadRootComponent: void 0,
  renderType: void 0,
  errorBoundary: void 0,
  el: void 0,
  canUpdate: true,
  suppressComponentDidCatchWarning: false,
  domElements: {},
  renderResults: {},
  updateResolves: {}
};
function reactBridge(userOptions) {
  if (typeof userOptions !== "object") {
    throw new Error("garfish-react-bridge requires a configuration object");
  }
  const opts = __spreadValues(__spreadValues({}, defaultOpts), userOptions);
  opts.React = opts.React || React;
  opts.ReactDOM = opts.ReactDOM || ReactDOM;
  if (!opts.rootComponent && !opts.loadRootComponent) {
    throw new Error("garfish-react-bridge must be passed opts.rootComponent or opts.loadRootComponent");
  }
  if (opts.rootComponent && opts.loadRootComponent) {
    (0, import_utils.warn)("garfish-react-bridge: `RootComponent` will be ignored for the reason you have passed both `rootComponent` and `loadRootComponent`.");
  }
  if (opts.errorBoundary && typeof opts.errorBoundary !== "function") {
    throw Error("The errorBoundary opt for garfish-react-bridge must either be omitted or be a function that returns React elements");
  }
  if (!checkReactVersion(opts.React)) {
    throw Error("Please make sure than the react version is higher than or equal to v16 and lower than v18.");
  }
  const providerLifeCycle = {
    render: (appInfo) => mount.call(this, opts, appInfo),
    destroy: (appInfo) => unmount.call(this, opts, appInfo)
  };
  const provider = async function(appInfo, props) {
    await bootstrap.call(this, opts, appInfo, props);
    return providerLifeCycle;
  };
  if (window.__GARFISH__ && typeof __GARFISH_EXPORTS__ === "object" && __GARFISH_EXPORTS__) {
    __GARFISH_EXPORTS__.provider = provider;
  }
  return provider;
}
function bootstrap(opts, appInfo, props) {
  if (opts.loadRootComponent) {
    try {
      return opts.loadRootComponent(__spreadProps(__spreadValues({}, appInfo), {
        props
      })).then((resolvedComponent) => {
        opts.rootComponent = resolvedComponent;
      });
    } catch (error) {
      console.error("error log by garfish: loadRootComponent error:", error);
      throw new Error(error);
    }
  } else {
    return Promise.resolve();
  }
}
function mount(opts, appInfo) {
  if (!opts.suppressComponentDidCatchWarning && checkReactVersion(opts.React) && !opts.errorBoundary) {
    if (opts.rootComponent && !opts.rootComponent.prototype) {
      (0, import_utils.warn)(`garfish-react-bridge: ${appInfo.appName}'s rootComponent does not implement an error boundary.  If using a functional component, consider providing an opts.errorBoundary to reactBridge(opts).`);
    } else if (opts.rootComponent && !opts.rootComponent.prototype.componentDidCatch) {
      (0, import_utils.warn)(`garfish-react-bridge: ${appInfo.appName}'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire garfish application.`);
    }
  }
  const elementToRender = getElementToRender(opts, appInfo);
  const domElement = chooseDomElementGetter(opts, appInfo);
  const renderResult = reactDomRender({
    elementToRender,
    domElement,
    opts
  });
  opts.domElements ? opts.domElements[appInfo.appName] = domElement : "";
}
function unmount(opts, appInfo) {
  if (opts.domElements) {
    opts.ReactDOM && opts.ReactDOM.unmountComponentAtNode(opts.domElements[appInfo.appName]);
    delete opts.domElements[appInfo.appName];
  }
}
function checkReactVersion(React2) {
  if (React2 && typeof React2.version === "string" && React2.version.indexOf(".") >= 0) {
    const majorVersionString = React2.version.split(".")[0];
    try {
      return Number(majorVersionString) >= 16 && Number(majorVersionString) < 18;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}
function reactDomRender({ opts, elementToRender, domElement }) {
  const renderType = typeof opts.renderType === "function" ? opts.renderType() : opts.renderType;
  if (renderType === "hydrate") {
    opts.ReactDOM.hydrate(elementToRender, domElement);
  } else {
    opts.ReactDOM.render(elementToRender, domElement);
  }
  return null;
}
function getElementToRender(opts, appInfo) {
  if (opts.React) {
    const rootComponentElement = opts.React.createElement(opts.rootComponent, appInfo);
    let elementToRender = rootComponentElement;
    if (opts.errorBoundary) {
      elementToRender = opts.React.createElement(createErrorBoundary(opts), appInfo, elementToRender);
    }
    return rootComponentElement;
  }
}
function createErrorBoundary(opts) {
  function GarfishSubAppReactErrorBoundary(props) {
    opts.React && opts.React.Component.apply(this, arguments);
    this.state = {
      caughtError: null,
      caughtErrorInfo: null
    };
    GarfishSubAppReactErrorBoundary.displayName = `ReactBridgeReactErrorBoundary(${props.name})`;
  }
  GarfishSubAppReactErrorBoundary.prototype = opts.React && Object.create(opts.React.Component.prototype);
  GarfishSubAppReactErrorBoundary.prototype.render = function() {
    if (this.state.caughtError) {
      const errorBoundary = opts.errorBoundary;
      return errorBoundary && errorBoundary(this.state.caughtError, this.props);
    } else {
      return this.props.children;
    }
  };
  GarfishSubAppReactErrorBoundary.prototype.componentDidCatch = function(err, info) {
    this.setState({
      caughtError: err,
      caughtErrorInfo: info
    });
  };
  return GarfishSubAppReactErrorBoundary;
}
function chooseDomElementGetter(opts, appInfo) {
  const { dom: container } = appInfo;
  let el;
  if (typeof opts.el === "string") {
    el = container.querySelector(opts.el);
  } else {
    el = container;
  }
  if (!(el instanceof HTMLElement)) {
    throw Error(`react bridge's dom-element-getter-helpers: el is an invalid dom element for application'${appInfo.appName}'. Expected HTMLElement, received ${typeof el}`);
  }
  return el;
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reactBridge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9yZWFjdEJyaWRnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHsgcmVhY3RCcmlkZ2UgfSBmcm9tICcuL3JlYWN0QnJpZGdlJztcbmV4cG9ydCB0eXBlIHsgUHJvcHNJbmZvIH0gZnJvbSAnLi90eXBlcyc7XG4iLCAiLy8gVGhlIGxvZ2ljIG9mIHJlYWN0QnJpZGdlIGlzIHJlZmVyZW5jZWQgZnJvbSBzaW5nbGUtc3BhIHR5cG9ncmFwaHlcbi8vIEJlY2F1c2UgdGhlIEdhcmZpc2ggbGlmZWN5Y2xlIGRvZXMgbm90IGFncmVlIHdpdGggdGhhdCBvZiBzaW5nbGUtc3BhICBwYXJ0IGxvZ2ljYWwgY291cGxpbmcgaW4gdGhlIGZyYW1ld29ya1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmdsZS1zcGEvc2luZ2xlLXNwYS1yZWFjdC9ibG9iL21haW4vc3JjL3NpbmdsZS1zcGEtcmVhY3QuanNcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB0eXBlIHsgVXNlck9wdGlvbnMsIFByb3BzSW5mbyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxudHlwZSB0eXBlUmVhY3QgPSB0eXBlb2YgUmVhY3QgfCB1bmRlZmluZWQ7XG50eXBlIE9wdGlvbnMgPSBVc2VyT3B0aW9uczx0eXBlb2YgUmVhY3QsIHR5cGVvZiBSZWFjdERPTSwgYW55LCBSZWFjdC5SZWFjdE5vZGU+O1xuXG5jb25zdCBkZWZhdWx0T3B0cyA9IHtcbiAgLy8gcmVxdWlyZWQgLSBvbmUgb3IgdGhlIG90aGVyIG9yIGJvdGhcbiAgcm9vdENvbXBvbmVudDogdW5kZWZpbmVkLFxuICBsb2FkUm9vdENvbXBvbmVudDogdW5kZWZpbmVkLFxuXG4gIC8vIG9wdGlvbmFsIG9wdHNcbiAgcmVuZGVyVHlwZTogdW5kZWZpbmVkLFxuICBlcnJvckJvdW5kYXJ5OiB1bmRlZmluZWQsXG4gIGVsOiB1bmRlZmluZWQsXG4gIGNhblVwZGF0ZTogdHJ1ZSwgLy8gYnkgZGVmYXVsdCwgYWxsb3cgcGFyY2VscyBjcmVhdGVkIHdpdGggZ2FyZmlzaC1yZWFjdC1icmlkZ2UgdG8gYmUgdXBkYXRlZFxuICBzdXBwcmVzc0NvbXBvbmVudERpZENhdGNoV2FybmluZzogZmFsc2UsXG4gIGRvbUVsZW1lbnRzOiB7fSxcbiAgcmVuZGVyUmVzdWx0czoge30sXG4gIHVwZGF0ZVJlc29sdmVzOiB7fSxcbn07XG5cbmRlY2xhcmUgY29uc3QgX19HQVJGSVNIX0VYUE9SVFNfXzoge1xuICBwcm92aWRlcjogT2JqZWN0O1xufTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBfX0dBUkZJU0hfXzogYm9vbGVhbjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhY3RCcmlkZ2UodGhpczogYW55LCB1c2VyT3B0aW9uczogT3B0aW9ucykge1xuICBpZiAodHlwZW9mIHVzZXJPcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2FyZmlzaC1yZWFjdC1icmlkZ2UgcmVxdWlyZXMgYSBjb25maWd1cmF0aW9uIG9iamVjdCcpO1xuICB9XG5cbiAgY29uc3Qgb3B0czogT3B0aW9ucyA9IHtcbiAgICAuLi5kZWZhdWx0T3B0cyxcbiAgICAuLi51c2VyT3B0aW9ucyxcbiAgfTtcblxuICBvcHRzLlJlYWN0ID0gb3B0cy5SZWFjdCB8fCBSZWFjdDtcbiAgb3B0cy5SZWFjdERPTSA9IG9wdHMuUmVhY3RET00gfHwgUmVhY3RET007XG5cbiAgaWYgKCFvcHRzLnJvb3RDb21wb25lbnQgJiYgIW9wdHMubG9hZFJvb3RDb21wb25lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZ2FyZmlzaC1yZWFjdC1icmlkZ2UgbXVzdCBiZSBwYXNzZWQgb3B0cy5yb290Q29tcG9uZW50IG9yIG9wdHMubG9hZFJvb3RDb21wb25lbnQnLFxuICAgICk7XG4gIH1cblxuICBpZiAob3B0cy5yb290Q29tcG9uZW50ICYmIG9wdHMubG9hZFJvb3RDb21wb25lbnQpIHtcbiAgICB3YXJuKFxuICAgICAgJ2dhcmZpc2gtcmVhY3QtYnJpZGdlOiBgUm9vdENvbXBvbmVudGAgd2lsbCBiZSBpZ25vcmVkIGZvciB0aGUgcmVhc29uIHlvdSBoYXZlIHBhc3NlZCBib3RoIGByb290Q29tcG9uZW50YCBhbmQgYGxvYWRSb290Q29tcG9uZW50YC4nLFxuICAgICk7XG4gIH1cblxuICBpZiAob3B0cy5lcnJvckJvdW5kYXJ5ICYmIHR5cGVvZiBvcHRzLmVycm9yQm91bmRhcnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBFcnJvcihcbiAgICAgICdUaGUgZXJyb3JCb3VuZGFyeSBvcHQgZm9yIGdhcmZpc2gtcmVhY3QtYnJpZGdlIG11c3QgZWl0aGVyIGJlIG9taXR0ZWQgb3IgYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgUmVhY3QgZWxlbWVudHMnLFxuICAgICk7XG4gIH1cbiAgaWYgKCFjaGVja1JlYWN0VmVyc2lvbihvcHRzLlJlYWN0KSkge1xuICAgIHRocm93IEVycm9yKFxuICAgICAgJ1BsZWFzZSBtYWtlIHN1cmUgdGhhbiB0aGUgcmVhY3QgdmVyc2lvbiBpcyBoaWdoZXIgdGhhbiBvciBlcXVhbCB0byB2MTYgYW5kIGxvd2VyIHRoYW4gdjE4LicsXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHByb3ZpZGVyTGlmZUN5Y2xlID0ge1xuICAgIHJlbmRlcjogKGFwcEluZm8pID0+IG1vdW50LmNhbGwodGhpcywgb3B0cywgYXBwSW5mbyksXG4gICAgZGVzdHJveTogKGFwcEluZm8pID0+IHVubW91bnQuY2FsbCh0aGlzLCBvcHRzLCBhcHBJbmZvKSxcbiAgICAvLyB1cGRhdGU6IChhcHBJbmZvKSA9PiBvcHRzLmNhblVwZGF0ZSAmJiB1cGRhdGUuY2FsbCh0aGlzLCBvcHRzLCBhcHBJbmZvKSxcbiAgfTtcblxuICBjb25zdCBwcm92aWRlciA9IGFzeW5jIGZ1bmN0aW9uICh0aGlzOiBhbnksIGFwcEluZm8sIHByb3BzKSB7XG4gICAgYXdhaXQgYm9vdHN0cmFwLmNhbGwodGhpcywgb3B0cywgYXBwSW5mbywgcHJvcHMpO1xuICAgIHJldHVybiBwcm92aWRlckxpZmVDeWNsZTtcbiAgfTtcblxuICBpZiAoXG4gICAgd2luZG93Ll9fR0FSRklTSF9fICYmXG4gICAgdHlwZW9mIF9fR0FSRklTSF9FWFBPUlRTX18gPT09ICdvYmplY3QnICYmXG4gICAgX19HQVJGSVNIX0VYUE9SVFNfX1xuICApIHtcbiAgICBfX0dBUkZJU0hfRVhQT1JUU19fLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gIH1cbiAgcmV0dXJuIHByb3ZpZGVyO1xufVxuXG5mdW5jdGlvbiBib290c3RyYXAob3B0czogT3B0aW9ucywgYXBwSW5mbzogUHJvcHNJbmZvLCBwcm9wcykge1xuICBpZiAob3B0cy5sb2FkUm9vdENvbXBvbmVudCkge1xuICAgIC8vIFRoZXkgcGFzc2VkIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWN0IGNvbXBvbmVudC4gV2FpdCBmb3IgaXQgdG8gcmVzb2x2ZSBiZWZvcmUgbW91bnRpbmdcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG9wdHNcbiAgICAgICAgLmxvYWRSb290Q29tcG9uZW50KHtcbiAgICAgICAgICAuLi5hcHBJbmZvLFxuICAgICAgICAgIHByb3BzLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzb2x2ZWRDb21wb25lbnQpID0+IHtcbiAgICAgICAgICBvcHRzLnJvb3RDb21wb25lbnQgPSByZXNvbHZlZENvbXBvbmVudDtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGxvZyBieSBnYXJmaXNoOiBsb2FkUm9vdENvbXBvbmVudCBlcnJvcjonLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBUaGlzIGlzIGEgY2xhc3Mgb3Igc3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudFxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3VudChvcHRzOiBPcHRpb25zLCBhcHBJbmZvOiBQcm9wc0luZm8pIHtcbiAgaWYgKFxuICAgICFvcHRzLnN1cHByZXNzQ29tcG9uZW50RGlkQ2F0Y2hXYXJuaW5nICYmXG4gICAgY2hlY2tSZWFjdFZlcnNpb24ob3B0cy5SZWFjdCkgJiZcbiAgICAhb3B0cy5lcnJvckJvdW5kYXJ5XG4gICkge1xuICAgIGlmIChvcHRzLnJvb3RDb21wb25lbnQgJiYgIW9wdHMucm9vdENvbXBvbmVudC5wcm90b3R5cGUpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGBnYXJmaXNoLXJlYWN0LWJyaWRnZTogJHthcHBJbmZvLmFwcE5hbWV9J3Mgcm9vdENvbXBvbmVudCBkb2VzIG5vdCBpbXBsZW1lbnQgYW4gZXJyb3IgYm91bmRhcnkuICBJZiB1c2luZyBhIGZ1bmN0aW9uYWwgY29tcG9uZW50LCBjb25zaWRlciBwcm92aWRpbmcgYW4gb3B0cy5lcnJvckJvdW5kYXJ5IHRvIHJlYWN0QnJpZGdlKG9wdHMpLmAsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBvcHRzLnJvb3RDb21wb25lbnQgJiZcbiAgICAgICFvcHRzLnJvb3RDb21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZENhdGNoXG4gICAgKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBgZ2FyZmlzaC1yZWFjdC1icmlkZ2U6ICR7YXBwSW5mby5hcHBOYW1lfSdzIHJvb3RDb21wb25lbnQgc2hvdWxkIGltcGxlbWVudCBjb21wb25lbnREaWRDYXRjaCB0byBhdm9pZCBhY2NpZGVudGFsbHkgdW5tb3VudGluZyB0aGUgZW50aXJlIGdhcmZpc2ggYXBwbGljYXRpb24uYCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZWxlbWVudFRvUmVuZGVyID0gZ2V0RWxlbWVudFRvUmVuZGVyKG9wdHMsIGFwcEluZm8pO1xuICBjb25zdCBkb21FbGVtZW50ID0gY2hvb3NlRG9tRWxlbWVudEdldHRlcihvcHRzLCBhcHBJbmZvKTtcbiAgY29uc3QgcmVuZGVyUmVzdWx0ID0gcmVhY3REb21SZW5kZXIoe1xuICAgIGVsZW1lbnRUb1JlbmRlcixcbiAgICBkb21FbGVtZW50LFxuICAgIG9wdHMsXG4gIH0pO1xuICBvcHRzLmRvbUVsZW1lbnRzID8gKG9wdHMuZG9tRWxlbWVudHNbYXBwSW5mby5hcHBOYW1lXSA9IGRvbUVsZW1lbnQpIDogJyc7XG4gIC8vIG9wdHMucmVuZGVyUmVzdWx0c1thcHBJbmZvLmFwcE5hbWVdID0gcmVuZGVyUmVzdWx0O1xufVxuXG5mdW5jdGlvbiB1bm1vdW50KG9wdHM6IE9wdGlvbnMsIGFwcEluZm86IFByb3BzSW5mbykge1xuICBpZiAob3B0cy5kb21FbGVtZW50cykge1xuICAgIG9wdHMuUmVhY3RET00gJiZcbiAgICAgIG9wdHMuUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShvcHRzLmRvbUVsZW1lbnRzW2FwcEluZm8uYXBwTmFtZV0pO1xuICAgIGRlbGV0ZSBvcHRzLmRvbUVsZW1lbnRzW2FwcEluZm8uYXBwTmFtZV07XG4gICAgLy8gZGVsZXRlIG9wdHMucmVuZGVyUmVzdWx0c1thcHBJbmZvLmFwcE5hbWVdO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIHVwZGF0ZShvcHRzLCBhcHBJbmZvOiBQcm9wc0luZm8pIHtcbi8vICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4vLyAgICAgaWYgKCFvcHRzLnVwZGF0ZVJlc29sdmVzW2FwcEluZm8uYXBwTmFtZV0pIHtcbi8vICAgICAgIG9wdHMudXBkYXRlUmVzb2x2ZXNbYXBwSW5mby5hcHBOYW1lXSA9IFtdO1xuLy8gICAgIH1cblxuLy8gICAgIG9wdHMudXBkYXRlUmVzb2x2ZXNbYXBwSW5mby5hcHBOYW1lXS5wdXNoKHJlc29sdmUpO1xuXG4vLyAgICAgY29uc3QgZWxlbWVudFRvUmVuZGVyID0gZ2V0RWxlbWVudFRvUmVuZGVyKG9wdHMsIGFwcEluZm8pO1xuLy8gICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBjaG9vc2VEb21FbGVtZW50R2V0dGVyKG9wdHMsIGFwcEluZm8pO1xuXG4vLyAgICAgLy8gVGhpcyBpcyB0aGUgb2xkIHdheSB0byB1cGRhdGUgYSByZWFjdCBhcHBsaWNhdGlvbiAtIGp1c3QgY2FsbCByZW5kZXIoKSBhZ2FpblxuLy8gICAgIG9wdHMuUmVhY3RET00ucmVuZGVyKGVsZW1lbnRUb1JlbmRlciwgZG9tRWxlbWVudCk7XG4vLyAgIH0pO1xuLy8gfVxuXG5mdW5jdGlvbiBjaGVja1JlYWN0VmVyc2lvbihSZWFjdDogdHlwZVJlYWN0KSB7XG4gIGlmIChcbiAgICBSZWFjdCAmJlxuICAgIHR5cGVvZiBSZWFjdC52ZXJzaW9uID09PSAnc3RyaW5nJyAmJlxuICAgIFJlYWN0LnZlcnNpb24uaW5kZXhPZignLicpID49IDBcbiAgKSB7XG4gICAgY29uc3QgbWFqb3JWZXJzaW9uU3RyaW5nID0gUmVhY3QudmVyc2lvbi5zcGxpdCgnLicpWzBdO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBOdW1iZXIobWFqb3JWZXJzaW9uU3RyaW5nKSA+PSAxNiAmJiBOdW1iZXIobWFqb3JWZXJzaW9uU3RyaW5nKSA8IDE4XG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhY3REb21SZW5kZXIoeyBvcHRzLCBlbGVtZW50VG9SZW5kZXIsIGRvbUVsZW1lbnQgfSkge1xuICBjb25zdCByZW5kZXJUeXBlID1cbiAgICB0eXBlb2Ygb3B0cy5yZW5kZXJUeXBlID09PSAnZnVuY3Rpb24nID8gb3B0cy5yZW5kZXJUeXBlKCkgOiBvcHRzLnJlbmRlclR5cGU7XG5cbiAgaWYgKHJlbmRlclR5cGUgPT09ICdoeWRyYXRlJykge1xuICAgIG9wdHMuUmVhY3RET00uaHlkcmF0ZShlbGVtZW50VG9SZW5kZXIsIGRvbUVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIGRlZmF1bHQgdG8gdGhpcyBpZiAncmVuZGVyVHlwZScgaXMgbnVsbCBvciBkb2Vzbid0IG1hdGNoIHRoZSBvdGhlciBvcHRpb25zXG4gICAgb3B0cy5SZWFjdERPTS5yZW5kZXIoZWxlbWVudFRvUmVuZGVyLCBkb21FbGVtZW50KTtcbiAgfVxuICAvLyBUaGUgcmVhY3REb21SZW5kZXIgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIHJlYWN0IHJvb3QsIGJ1dCBSZWFjdERPTS5oeWRyYXRlKCkgYW5kIFJlYWN0RE9NLnJlbmRlcigpXG4gIC8vIGRvIG5vdCByZXR1cm4gYSByZWFjdCByb290LiBTbyBpbnN0ZWFkLCB3ZSByZXR1cm4gbnVsbCB3aGljaCBpbmRpY2F0ZXMgdGhhdCB0aGVyZSBpcyBubyByZWFjdCByb290XG4gIC8vIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHVwZGF0ZXMgb3IgdW5tb3VudGluZ1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudFRvUmVuZGVyKG9wdHM6IE9wdGlvbnMsIGFwcEluZm86IFByb3BzSW5mbykge1xuICBpZiAob3B0cy5SZWFjdCkge1xuICAgIGNvbnN0IHJvb3RDb21wb25lbnRFbGVtZW50ID0gb3B0cy5SZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgb3B0cy5yb290Q29tcG9uZW50LFxuICAgICAgYXBwSW5mbyxcbiAgICApO1xuICAgIGxldCBlbGVtZW50VG9SZW5kZXIgPSByb290Q29tcG9uZW50RWxlbWVudDtcblxuICAgIGlmIChvcHRzLmVycm9yQm91bmRhcnkpIHtcbiAgICAgIGVsZW1lbnRUb1JlbmRlciA9IG9wdHMuUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgY3JlYXRlRXJyb3JCb3VuZGFyeShvcHRzKSBhcyBhbnksXG4gICAgICAgIGFwcEluZm8sXG4gICAgICAgIGVsZW1lbnRUb1JlbmRlcixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiByb290Q29tcG9uZW50RWxlbWVudDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVFcnJvckJvdW5kYXJ5KG9wdHM6IE9wdGlvbnMpIHtcbiAgLy8gQXZvaWRpbmcgYmFiZWwgb3V0cHV0IGZvciBjbGFzcyBzeW50YXggYW5kIHN1cGVyKClcbiAgLy8gdG8gYXZvaWQgYmxvYXRcbiAgZnVuY3Rpb24gR2FyZmlzaFN1YkFwcFJlYWN0RXJyb3JCb3VuZGFyeSh0aGlzOiBhbnksIHByb3BzKSB7XG4gICAgLy8gc3VwZXJcbiAgICBvcHRzLlJlYWN0ICYmIG9wdHMuUmVhY3QuQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2F1Z2h0RXJyb3I6IG51bGwsXG4gICAgICBjYXVnaHRFcnJvckluZm86IG51bGwsXG4gICAgfTtcblxuICAgIChcbiAgICAgIEdhcmZpc2hTdWJBcHBSZWFjdEVycm9yQm91bmRhcnkgYXMgYW55XG4gICAgKS5kaXNwbGF5TmFtZSA9IGBSZWFjdEJyaWRnZVJlYWN0RXJyb3JCb3VuZGFyeSgke3Byb3BzLm5hbWV9KWA7XG4gIH1cblxuICBHYXJmaXNoU3ViQXBwUmVhY3RFcnJvckJvdW5kYXJ5LnByb3RvdHlwZSA9XG4gICAgb3B0cy5SZWFjdCAmJiBPYmplY3QuY3JlYXRlKG9wdHMuUmVhY3QuQ29tcG9uZW50LnByb3RvdHlwZSk7XG5cbiAgR2FyZmlzaFN1YkFwcFJlYWN0RXJyb3JCb3VuZGFyeS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmNhdWdodEVycm9yKSB7XG4gICAgICBjb25zdCBlcnJvckJvdW5kYXJ5ID0gb3B0cy5lcnJvckJvdW5kYXJ5O1xuICAgICAgcmV0dXJuIGVycm9yQm91bmRhcnkgJiYgZXJyb3JCb3VuZGFyeSh0aGlzLnN0YXRlLmNhdWdodEVycm9yLCB0aGlzLnByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICB9O1xuXG4gIEdhcmZpc2hTdWJBcHBSZWFjdEVycm9yQm91bmRhcnkucHJvdG90eXBlLmNvbXBvbmVudERpZENhdGNoID0gZnVuY3Rpb24gKFxuICAgIGVycixcbiAgICBpbmZvLFxuICApIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhdWdodEVycm9yOiBlcnIsXG4gICAgICBjYXVnaHRFcnJvckluZm86IGluZm8sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEdhcmZpc2hTdWJBcHBSZWFjdEVycm9yQm91bmRhcnk7XG59XG5cbmZ1bmN0aW9uIGNob29zZURvbUVsZW1lbnRHZXR0ZXIob3B0czogT3B0aW9ucywgYXBwSW5mbzogUHJvcHNJbmZvKSB7XG4gIGNvbnN0IHsgZG9tOiBjb250YWluZXIgfSA9IGFwcEluZm87XG4gIGxldCBlbDtcbiAgaWYgKHR5cGVvZiBvcHRzLmVsID09PSAnc3RyaW5nJykge1xuICAgIGVsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3Iob3B0cy5lbCk7XG4gIH0gZWxzZSB7XG4gICAgZWwgPSBjb250YWluZXI7XG4gIH1cblxuICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgIHRocm93IEVycm9yKFxuICAgICAgYHJlYWN0IGJyaWRnZSdzIGRvbS1lbGVtZW50LWdldHRlci1oZWxwZXJzOiBlbCBpcyBhbiBpbnZhbGlkIGRvbSBlbGVtZW50IGZvciBhcHBsaWNhdGlvbicke1xuICAgICAgICBhcHBJbmZvLmFwcE5hbWVcbiAgICAgIH0nLiBFeHBlY3RlZCBIVE1MRWxlbWVudCwgcmVjZWl2ZWQgJHt0eXBlb2YgZWx9YCxcbiAgICAp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
