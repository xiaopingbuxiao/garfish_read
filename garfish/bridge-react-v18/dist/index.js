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
var import_client = require("react-dom/client");
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
function reactBridge(userOpts) {
  if (typeof userOpts !== "object") {
    throw new Error("garfish-react-bridge requires a configuration object");
  }
  const opts = __spreadValues(__spreadValues({}, defaultOpts), userOpts);
  opts.React = opts.React || React;
  opts.createRoot = opts.createRoot || import_client.createRoot;
  opts.hydrateRoot = opts.hydrateRoot || import_client.hydrateRoot;
  if (!opts.rootComponent && !opts.loadRootComponent) {
    throw new Error("garfish-react-bridge must be passed opts.rootComponent or opts.loadRootComponent");
  }
  if (opts.errorBoundary && typeof opts.errorBoundary !== "function") {
    throw Error("The errorBoundary opt for garfish-react-bridge must either be omitted or be a function that returns React elements");
  }
  if (!atLeastReact18(opts.React)) {
    throw Error("Please make sure than the react version is higher than or equal to v18.");
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
    return opts.loadRootComponent(__spreadProps(__spreadValues({}, appInfo), {
      props
    })).then((resolvedComponent) => {
      opts.rootComponent = resolvedComponent;
    });
  } else {
    return Promise.resolve();
  }
}
function mount(opts, appInfo) {
  if (!opts.suppressComponentDidCatchWarning && atLeastReact18(opts.React) && !opts.errorBoundary) {
    if (!opts.rootComponent.prototype) {
      (0, import_utils.warn)(`garfish-react-bridge: ${appInfo.appName}'s rootComponent does not implement an error boundary.  If using a functional component, consider providing an opts.errorBoundary to reactBridge(opts).`);
    } else if (!opts.rootComponent.prototype.componentDidCatch) {
      (0, import_utils.warn)(`garfish-react-bridge: ${appInfo.appName}'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire garfish application.`);
    }
  }
  const elementToRender = getElementToRender(opts, appInfo);
  const domElement = chooseDomElementGetter(opts, appInfo);
  const renderResult = callCreateRoot({
    elementToRender,
    domElement,
    opts
  });
  if (opts.domElements) {
    opts.domElements[appInfo.appName] = domElement;
  }
  if (opts.renderResults) {
    opts.renderResults[appInfo.appName] = renderResult;
  }
}
function unmount(opts, appInfo) {
  if (opts.renderResults) {
    const root = opts.renderResults[appInfo.appName];
    root.unmount();
    opts.domElements && delete opts.domElements[appInfo.appName];
    delete opts.renderResults[appInfo.appName];
  }
}
function atLeastReact18(React2) {
  if (React2 && typeof React2.version === "string" && React2.version.indexOf(".") >= 0) {
    const majorVersionString = React2.version.split(".")[0];
    try {
      return Number(majorVersionString) >= 18;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}
function callCreateRoot({ opts, elementToRender, domElement }) {
  const renderType = typeof opts.renderType === "function" ? opts.renderType() : opts.renderType;
  let root;
  if (renderType === "hydrate") {
    root = opts.hydrateRoot(elementToRender, domElement);
    root.render(elementToRender);
  } else {
    root = opts.createRoot(domElement);
    root.render(elementToRender);
  }
  return root;
}
function getElementToRender(opts, appInfo) {
  var _a, _b;
  const rootComponentElement = (_a = opts.React) == null ? void 0 : _a.createElement(opts.rootComponent, appInfo);
  let elementToRender = rootComponentElement;
  if (opts.errorBoundary) {
    elementToRender = (_b = opts.React) == null ? void 0 : _b.createElement(createErrorBoundary(opts), appInfo, elementToRender);
  }
  return elementToRender;
}
function createErrorBoundary(opts) {
  function GarfishSubAppReactErrorBoundary(appInfo) {
    var _a;
    (_a = opts.React) == null ? void 0 : _a.Component.apply(this, arguments);
    this.state = {
      caughtError: null,
      caughtErrorInfo: null
    };
    GarfishSubAppReactErrorBoundary.displayName = `ReactBridgeReactErrorBoundary(${appInfo.appName})`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9yZWFjdEJyaWRnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHsgcmVhY3RCcmlkZ2UgfSBmcm9tICcuL3JlYWN0QnJpZGdlJztcbmV4cG9ydCB0eXBlIHsgUHJvcHNJbmZvIH0gZnJvbSAnLi90eXBlcyc7XG4iLCAiLy8gVGhlIGxvZ2ljIG9mIHJlYWN0QnJpZGdlIGlzIHJlZmVyZW5jZWQgZnJvbSBzaW5nbGUtc3BhIHR5cG9ncmFwaHlcbi8vIEJlY2F1c2UgdGhlIEdhcmZpc2ggbGlmZWN5Y2xlIGRvZXMgbm90IGFncmVlIHdpdGggdGhhdCBvZiBzaW5nbGUtc3BhICBwYXJ0IGxvZ2ljYWwgY291cGxpbmcgaW4gdGhlIGZyYW1ld29ya1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmdsZS1zcGEvc2luZ2xlLXNwYS1yZWFjdC9ibG9iL21haW4vc3JjL3NpbmdsZS1zcGEtcmVhY3QuanNcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCwgaHlkcmF0ZVJvb3QsIFJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50JztcbmltcG9ydCB0eXBlIHsgVXNlck9wdGlvbnMsIFByb3BzSW5mbyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxudHlwZSB0eXBlUmVhY3QgPSB0eXBlb2YgUmVhY3Q7XG5cbnR5cGUgT3B0aW9ucyA9IFVzZXJPcHRpb25zPFxuICB0eXBlb2YgUmVhY3QsXG4gIHR5cGVvZiBjcmVhdGVSb290LFxuICB0eXBlb2YgaHlkcmF0ZVJvb3QsXG4gIFJvb3QsXG4gIGFueSxcbiAgUmVhY3QuUmVhY3ROb2RlXG4+O1xuXG5jb25zdCBkZWZhdWx0T3B0cyA9IHtcbiAgLy8gcmVxdWlyZWQgLSBvbmUgb3IgdGhlIG90aGVyIG9yIGJvdGhcbiAgcm9vdENvbXBvbmVudDogdW5kZWZpbmVkLFxuICBsb2FkUm9vdENvbXBvbmVudDogdW5kZWZpbmVkLFxuXG4gIC8vIG9wdGlvbmFsIG9wdHNcbiAgcmVuZGVyVHlwZTogdW5kZWZpbmVkLFxuICBlcnJvckJvdW5kYXJ5OiB1bmRlZmluZWQsXG4gIGVsOiB1bmRlZmluZWQsXG4gIGNhblVwZGF0ZTogdHJ1ZSwgLy8gYnkgZGVmYXVsdCwgYWxsb3cgcGFyY2VscyBjcmVhdGVkIHdpdGggZ2FyZmlzaC1yZWFjdC1icmlkZ2UgdG8gYmUgdXBkYXRlZFxuICBzdXBwcmVzc0NvbXBvbmVudERpZENhdGNoV2FybmluZzogZmFsc2UsXG4gIGRvbUVsZW1lbnRzOiB7fSxcbiAgcmVuZGVyUmVzdWx0czoge30sXG4gIHVwZGF0ZVJlc29sdmVzOiB7fSxcbn07XG5cbmRlY2xhcmUgY29uc3QgX19HQVJGSVNIX0VYUE9SVFNfXzoge1xuICBwcm92aWRlcjogT2JqZWN0O1xufTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBfX0dBUkZJU0hfXzogYm9vbGVhbjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhY3RCcmlkZ2UodGhpczogYW55LCB1c2VyT3B0czogT3B0aW9ucykge1xuICBpZiAodHlwZW9mIHVzZXJPcHRzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2FyZmlzaC1yZWFjdC1icmlkZ2UgcmVxdWlyZXMgYSBjb25maWd1cmF0aW9uIG9iamVjdCcpO1xuICB9XG5cbiAgY29uc3Qgb3B0czogT3B0aW9ucyA9IHtcbiAgICAuLi5kZWZhdWx0T3B0cyxcbiAgICAuLi51c2VyT3B0cyxcbiAgfTtcblxuICBvcHRzLlJlYWN0ID0gb3B0cy5SZWFjdCB8fCBSZWFjdDtcbiAgb3B0cy5jcmVhdGVSb290ID0gb3B0cy5jcmVhdGVSb290IHx8IGNyZWF0ZVJvb3Q7XG4gIG9wdHMuaHlkcmF0ZVJvb3QgPSBvcHRzLmh5ZHJhdGVSb290IHx8IGh5ZHJhdGVSb290O1xuXG4gIGlmICghb3B0cy5yb290Q29tcG9uZW50ICYmICFvcHRzLmxvYWRSb290Q29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2dhcmZpc2gtcmVhY3QtYnJpZGdlIG11c3QgYmUgcGFzc2VkIG9wdHMucm9vdENvbXBvbmVudCBvciBvcHRzLmxvYWRSb290Q29tcG9uZW50JyxcbiAgICApO1xuICB9XG5cbiAgaWYgKG9wdHMuZXJyb3JCb3VuZGFyeSAmJiB0eXBlb2Ygb3B0cy5lcnJvckJvdW5kYXJ5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICAnVGhlIGVycm9yQm91bmRhcnkgb3B0IGZvciBnYXJmaXNoLXJlYWN0LWJyaWRnZSBtdXN0IGVpdGhlciBiZSBvbWl0dGVkIG9yIGJlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIFJlYWN0IGVsZW1lbnRzJyxcbiAgICApO1xuICB9XG4gIGlmICghYXRMZWFzdFJlYWN0MTgob3B0cy5SZWFjdCkpIHtcbiAgICB0aHJvdyBFcnJvcihcbiAgICAgICdQbGVhc2UgbWFrZSBzdXJlIHRoYW4gdGhlIHJlYWN0IHZlcnNpb24gaXMgaGlnaGVyIHRoYW4gb3IgZXF1YWwgdG8gdjE4LicsXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHByb3ZpZGVyTGlmZUN5Y2xlID0ge1xuICAgIHJlbmRlcjogKGFwcEluZm86IFByb3BzSW5mbykgPT4gbW91bnQuY2FsbCh0aGlzLCBvcHRzLCBhcHBJbmZvKSxcbiAgICBkZXN0cm95OiAoYXBwSW5mbzogUHJvcHNJbmZvKSA9PiB1bm1vdW50LmNhbGwodGhpcywgb3B0cywgYXBwSW5mbyksXG4gICAgLy8gdXBkYXRlOiAoYXBwSW5mbzogUHJvcHNJbmZvKSA9PlxuICAgIC8vICAgb3B0cy5jYW5VcGRhdGUgJiYgdXBkYXRlLmNhbGwodGhpcywgb3B0cywgYXBwSW5mbyksXG4gIH07XG5cbiAgY29uc3QgcHJvdmlkZXIgPSBhc3luYyBmdW5jdGlvbiAodGhpczogYW55LCBhcHBJbmZvLCBwcm9wcykge1xuICAgIGF3YWl0IGJvb3RzdHJhcC5jYWxsKHRoaXMsIG9wdHMsIGFwcEluZm8sIHByb3BzKTtcbiAgICByZXR1cm4gcHJvdmlkZXJMaWZlQ3ljbGU7XG4gIH07XG5cbiAgaWYgKFxuICAgIHdpbmRvdy5fX0dBUkZJU0hfXyAmJlxuICAgIHR5cGVvZiBfX0dBUkZJU0hfRVhQT1JUU19fID09PSAnb2JqZWN0JyAmJlxuICAgIF9fR0FSRklTSF9FWFBPUlRTX19cbiAgKSB7XG4gICAgX19HQVJGSVNIX0VYUE9SVFNfXy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICB9XG4gIHJldHVybiBwcm92aWRlcjtcbn1cblxuZnVuY3Rpb24gYm9vdHN0cmFwKG9wdHM6IE9wdGlvbnMsIGFwcEluZm8sIHByb3BzKSB7XG4gIGlmIChvcHRzLmxvYWRSb290Q29tcG9uZW50KSB7XG4gICAgLy8gVGhleSBwYXNzZWQgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVhY3QgY29tcG9uZW50LiBXYWl0IGZvciBpdCB0byByZXNvbHZlIGJlZm9yZSBtb3VudGluZ1xuICAgIHJldHVybiBvcHRzXG4gICAgICAubG9hZFJvb3RDb21wb25lbnQoe1xuICAgICAgICAuLi5hcHBJbmZvLFxuICAgICAgICBwcm9wcyxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzb2x2ZWRDb21wb25lbnQpID0+IHtcbiAgICAgICAgb3B0cy5yb290Q29tcG9uZW50ID0gcmVzb2x2ZWRDb21wb25lbnQ7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGlzIGlzIGEgY2xhc3Mgb3Igc3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudFxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3VudChvcHRzOiBPcHRpb25zLCBhcHBJbmZvOiBQcm9wc0luZm8pIHtcbiAgaWYgKFxuICAgICFvcHRzLnN1cHByZXNzQ29tcG9uZW50RGlkQ2F0Y2hXYXJuaW5nICYmXG4gICAgYXRMZWFzdFJlYWN0MTgob3B0cy5SZWFjdCkgJiZcbiAgICAhb3B0cy5lcnJvckJvdW5kYXJ5XG4gICkge1xuICAgIGlmICghb3B0cy5yb290Q29tcG9uZW50LnByb3RvdHlwZSkge1xuICAgICAgd2FybihcbiAgICAgICAgYGdhcmZpc2gtcmVhY3QtYnJpZGdlOiAke2FwcEluZm8uYXBwTmFtZX0ncyByb290Q29tcG9uZW50IGRvZXMgbm90IGltcGxlbWVudCBhbiBlcnJvciBib3VuZGFyeS4gIElmIHVzaW5nIGEgZnVuY3Rpb25hbCBjb21wb25lbnQsIGNvbnNpZGVyIHByb3ZpZGluZyBhbiBvcHRzLmVycm9yQm91bmRhcnkgdG8gcmVhY3RCcmlkZ2Uob3B0cykuYCxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghb3B0cy5yb290Q29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnREaWRDYXRjaCkge1xuICAgICAgd2FybihcbiAgICAgICAgYGdhcmZpc2gtcmVhY3QtYnJpZGdlOiAke2FwcEluZm8uYXBwTmFtZX0ncyByb290Q29tcG9uZW50IHNob3VsZCBpbXBsZW1lbnQgY29tcG9uZW50RGlkQ2F0Y2ggdG8gYXZvaWQgYWNjaWRlbnRhbGx5IHVubW91bnRpbmcgdGhlIGVudGlyZSBnYXJmaXNoIGFwcGxpY2F0aW9uLmAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVsZW1lbnRUb1JlbmRlciA9IGdldEVsZW1lbnRUb1JlbmRlcihvcHRzLCBhcHBJbmZvKTtcbiAgY29uc3QgZG9tRWxlbWVudCA9IGNob29zZURvbUVsZW1lbnRHZXR0ZXIob3B0cywgYXBwSW5mbyk7XG4gIGNvbnN0IHJlbmRlclJlc3VsdCA9IGNhbGxDcmVhdGVSb290KHtcbiAgICBlbGVtZW50VG9SZW5kZXIsXG4gICAgZG9tRWxlbWVudCxcbiAgICBvcHRzLFxuICB9KTtcblxuICBpZiAob3B0cy5kb21FbGVtZW50cykge1xuICAgIG9wdHMuZG9tRWxlbWVudHNbYXBwSW5mby5hcHBOYW1lXSA9IGRvbUVsZW1lbnQ7XG4gIH1cbiAgaWYgKG9wdHMucmVuZGVyUmVzdWx0cykge1xuICAgIG9wdHMucmVuZGVyUmVzdWx0c1thcHBJbmZvLmFwcE5hbWVdID0gcmVuZGVyUmVzdWx0O1xuICB9XG59XG5cbmZ1bmN0aW9uIHVubW91bnQob3B0czogT3B0aW9ucywgYXBwSW5mbzogUHJvcHNJbmZvKSB7XG4gIGlmIChvcHRzLnJlbmRlclJlc3VsdHMpIHtcbiAgICBjb25zdCByb290ID0gb3B0cy5yZW5kZXJSZXN1bHRzW2FwcEluZm8uYXBwTmFtZV07XG4gICAgcm9vdC51bm1vdW50KCk7XG4gICAgb3B0cy5kb21FbGVtZW50cyAmJiBkZWxldGUgb3B0cy5kb21FbGVtZW50c1thcHBJbmZvLmFwcE5hbWVdO1xuICAgIGRlbGV0ZSBvcHRzLnJlbmRlclJlc3VsdHNbYXBwSW5mby5hcHBOYW1lXTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiB1cGRhdGUob3B0czogT3B0aW9ucywgYXBwSW5mbzogUHJvcHNJbmZvKSB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuLy8gICAgIGlmICghb3B0cy51cGRhdGVSZXNvbHZlc1thcHBJbmZvLmFwcE5hbWVdKSB7XG4vLyAgICAgICBvcHRzLnVwZGF0ZVJlc29sdmVzW2FwcEluZm8uYXBwTmFtZV0gPSBbXTtcbi8vICAgICB9XG5cbi8vICAgICBvcHRzLnVwZGF0ZVJlc29sdmVzW2FwcEluZm8uYXBwTmFtZV0ucHVzaChyZXNvbHZlKTtcbi8vICAgICBjb25zdCBlbGVtZW50VG9SZW5kZXIgPSBnZXRFbGVtZW50VG9SZW5kZXIob3B0cywgYXBwSW5mbyk7XG4vLyAgICAgY29uc3QgcmVuZGVyUm9vdCA9IG9wdHMucmVuZGVyUmVzdWx0c1thcHBJbmZvLmFwcE5hbWVdO1xuLy8gICAgIHJlbmRlclJvb3QucmVuZGVyKGVsZW1lbnRUb1JlbmRlcik7XG4vLyAgIH0pO1xuLy8gfVxuXG5mdW5jdGlvbiBhdExlYXN0UmVhY3QxOChSZWFjdD86IHR5cGVSZWFjdCkge1xuICBpZiAoXG4gICAgUmVhY3QgJiZcbiAgICB0eXBlb2YgUmVhY3QudmVyc2lvbiA9PT0gJ3N0cmluZycgJiZcbiAgICBSZWFjdC52ZXJzaW9uLmluZGV4T2YoJy4nKSA+PSAwXG4gICkge1xuICAgIGNvbnN0IG1ham9yVmVyc2lvblN0cmluZyA9IFJlYWN0LnZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIE51bWJlcihtYWpvclZlcnNpb25TdHJpbmcpID49IDE4O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbENyZWF0ZVJvb3QoeyBvcHRzLCBlbGVtZW50VG9SZW5kZXIsIGRvbUVsZW1lbnQgfSkge1xuICBjb25zdCByZW5kZXJUeXBlID1cbiAgICB0eXBlb2Ygb3B0cy5yZW5kZXJUeXBlID09PSAnZnVuY3Rpb24nID8gb3B0cy5yZW5kZXJUeXBlKCkgOiBvcHRzLnJlbmRlclR5cGU7XG5cbiAgbGV0IHJvb3Q7XG4gIGlmIChyZW5kZXJUeXBlID09PSAnaHlkcmF0ZScpIHtcbiAgICByb290ID0gb3B0cy5oeWRyYXRlUm9vdChlbGVtZW50VG9SZW5kZXIsIGRvbUVsZW1lbnQpO1xuICAgIHJvb3QucmVuZGVyKGVsZW1lbnRUb1JlbmRlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gZGVmYXVsdCB0byB0aGlzIGlmICdyZW5kZXJUeXBlJyBpcyBudWxsIG9yIGRvZXNuJ3QgbWF0Y2ggdGhlIG90aGVyIG9wdGlvbnNcbiAgICByb290ID0gb3B0cy5jcmVhdGVSb290KGRvbUVsZW1lbnQpO1xuICAgIHJvb3QucmVuZGVyKGVsZW1lbnRUb1JlbmRlcik7XG4gIH1cblxuICByZXR1cm4gcm9vdDtcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudFRvUmVuZGVyKG9wdHM6IE9wdGlvbnMsIGFwcEluZm86IFByb3BzSW5mbykge1xuICBjb25zdCByb290Q29tcG9uZW50RWxlbWVudCA9IG9wdHMuUmVhY3Q/LmNyZWF0ZUVsZW1lbnQoXG4gICAgb3B0cy5yb290Q29tcG9uZW50IGFzIGFueSxcbiAgICBhcHBJbmZvLFxuICApO1xuXG4gIGxldCBlbGVtZW50VG9SZW5kZXIgPSByb290Q29tcG9uZW50RWxlbWVudDtcblxuICBpZiAob3B0cy5lcnJvckJvdW5kYXJ5KSB7XG4gICAgZWxlbWVudFRvUmVuZGVyID0gb3B0cy5SZWFjdD8uY3JlYXRlRWxlbWVudChcbiAgICAgIGNyZWF0ZUVycm9yQm91bmRhcnkob3B0cykgYXMgYW55LFxuICAgICAgYXBwSW5mbyxcbiAgICAgIGVsZW1lbnRUb1JlbmRlcixcbiAgICApO1xuICB9XG4gIHJldHVybiBlbGVtZW50VG9SZW5kZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVycm9yQm91bmRhcnkob3B0czogT3B0aW9ucykge1xuICAvLyBBdm9pZGluZyBiYWJlbCBvdXRwdXQgZm9yIGNsYXNzIHN5bnRheCBhbmQgc3VwZXIoKVxuICAvLyB0byBhdm9pZCBibG9hdFxuICBmdW5jdGlvbiBHYXJmaXNoU3ViQXBwUmVhY3RFcnJvckJvdW5kYXJ5KHRoaXM6IGFueSwgYXBwSW5mbzogUHJvcHNJbmZvKSB7XG4gICAgLy8gc3VwZXJcbiAgICBvcHRzLlJlYWN0Py5Db21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYXVnaHRFcnJvcjogbnVsbCxcbiAgICAgIGNhdWdodEVycm9ySW5mbzogbnVsbCxcbiAgICB9O1xuXG4gICAgKFxuICAgICAgR2FyZmlzaFN1YkFwcFJlYWN0RXJyb3JCb3VuZGFyeSBhcyBhbnlcbiAgICApLmRpc3BsYXlOYW1lID0gYFJlYWN0QnJpZGdlUmVhY3RFcnJvckJvdW5kYXJ5KCR7YXBwSW5mby5hcHBOYW1lfSlgO1xuICB9XG5cbiAgR2FyZmlzaFN1YkFwcFJlYWN0RXJyb3JCb3VuZGFyeS5wcm90b3R5cGUgPVxuICAgIG9wdHMuUmVhY3QgJiYgT2JqZWN0LmNyZWF0ZShvcHRzLlJlYWN0LkNvbXBvbmVudC5wcm90b3R5cGUpO1xuXG4gIEdhcmZpc2hTdWJBcHBSZWFjdEVycm9yQm91bmRhcnkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jYXVnaHRFcnJvcikge1xuICAgICAgY29uc3QgZXJyb3JCb3VuZGFyeSA9IG9wdHMuZXJyb3JCb3VuZGFyeTtcblxuICAgICAgcmV0dXJuIGVycm9yQm91bmRhcnkgJiYgZXJyb3JCb3VuZGFyeSh0aGlzLnN0YXRlLmNhdWdodEVycm9yLCB0aGlzLnByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICB9O1xuXG4gIEdhcmZpc2hTdWJBcHBSZWFjdEVycm9yQm91bmRhcnkucHJvdG90eXBlLmNvbXBvbmVudERpZENhdGNoID0gZnVuY3Rpb24gKFxuICAgIGVycixcbiAgICBpbmZvLFxuICApIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNhdWdodEVycm9yOiBlcnIsXG4gICAgICBjYXVnaHRFcnJvckluZm86IGluZm8sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEdhcmZpc2hTdWJBcHBSZWFjdEVycm9yQm91bmRhcnk7XG59XG5cbmZ1bmN0aW9uIGNob29zZURvbUVsZW1lbnRHZXR0ZXIob3B0czogT3B0aW9ucywgYXBwSW5mbzogUHJvcHNJbmZvKSB7XG4gIGNvbnN0IHsgZG9tOiBjb250YWluZXIgfSA9IGFwcEluZm87XG4gIGxldCBlbDtcbiAgaWYgKHR5cGVvZiBvcHRzLmVsID09PSAnc3RyaW5nJykge1xuICAgIGVsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3Iob3B0cy5lbCk7XG4gIH0gZWxzZSB7XG4gICAgZWwgPSBjb250YWluZXI7XG4gIH1cblxuICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgIHRocm93IEVycm9yKFxuICAgICAgYHJlYWN0IGJyaWRnZSdzIGRvbS1lbGVtZW50LWdldHRlci1oZWxwZXJzOiBlbCBpcyBhbiBpbnZhbGlkIGRvbSBlbGVtZW50IGZvciBhcHBsaWNhdGlvbicke1xuICAgICAgICBhcHBJbmZvLmFwcE5hbWVcbiAgICAgIH0nLiBFeHBlY3RlZCBIVE1MRWxlbWVudCwgcmVjZWl2ZWQgJHt0eXBlb2YgZWx9YCxcbiAgICApO1xuICB9XG4gIHJldHVybiBlbDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDSUEsWUFBdUI7QUFDdkIsb0JBQThDO0FBRTlDLG1CQUFxQjtBQWFyQixJQUFNLGNBQWM7QUFBQSxFQUVsQixlQUFlO0FBQUEsRUFDZixtQkFBbUI7QUFBQSxFQUduQixZQUFZO0FBQUEsRUFDWixlQUFlO0FBQUEsRUFDZixJQUFJO0FBQUEsRUFDSixXQUFXO0FBQUEsRUFDWCxrQ0FBa0M7QUFBQSxFQUNsQyxhQUFhO0FBQUEsRUFDYixlQUFlO0FBQUEsRUFDZixnQkFBZ0I7QUFBQTtBQWFYLHFCQUFnQyxVQUFtQjtBQUN4RCxNQUFJLE9BQU8sYUFBYSxVQUFVO0FBQ2hDLFVBQU0sSUFBSSxNQUFNO0FBQUE7QUFHbEIsUUFBTSxPQUFnQixrQ0FDakIsY0FDQTtBQUdMLE9BQUssUUFBUSxLQUFLLFNBQVM7QUFDM0IsT0FBSyxhQUFhLEtBQUssY0FBYztBQUNyQyxPQUFLLGNBQWMsS0FBSyxlQUFlO0FBRXZDLE1BQUksQ0FBQyxLQUFLLGlCQUFpQixDQUFDLEtBQUssbUJBQW1CO0FBQ2xELFVBQU0sSUFBSSxNQUNSO0FBQUE7QUFJSixNQUFJLEtBQUssaUJBQWlCLE9BQU8sS0FBSyxrQkFBa0IsWUFBWTtBQUNsRSxVQUFNLE1BQ0o7QUFBQTtBQUdKLE1BQUksQ0FBQyxlQUFlLEtBQUssUUFBUTtBQUMvQixV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
