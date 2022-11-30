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
  vueBridge: () => vueBridge
});

// src/vueBridge.ts
var vue = __toESM(require("vue"));
var defaultOpts = {
  createApp: null,
  VueRouter: null,
  rootComponent: null,
  loadRootComponent: null,
  appOptions: null,
  handleInstance: null,
  el: null,
  canUpdate: true
};
function vueBridge(userOpts) {
  if (typeof userOpts !== "object") {
    throw new Error("garfish-vue-bridge: requires a configuration object");
  }
  const opts = __spreadValues(__spreadValues({}, defaultOpts), userOpts);
  if (opts.appOptions && typeof opts.appOptions !== "function" && opts.appOptions["el"] !== void 0 && typeof opts.appOptions["el"] !== "string" && !(opts.appOptions.el instanceof HTMLElement)) {
    throw Error(`garfish-vue-bridge: appOptions.el must be a string CSS selector, an HTMLElement, or not provided at all. Was given ${typeof opts.appOptions.el}`);
  }
  opts.createApp = opts.createApp || vue.createApp;
  const mountedInstances = {};
  const providerLifeCycle = {
    render: (props) => mount.call(this, opts, mountedInstances, props),
    destroy: (props) => unmount.call(this, opts, mountedInstances, props),
    update: (props) => opts.canUpdate && update.call(this, opts, mountedInstances, props)
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
    })).then((root) => opts.rootComponent = root);
  } else {
    return Promise.resolve();
  }
}
function resolveAppOptions(opts, props) {
  if (typeof opts.appOptions === "function") {
    return opts.appOptions(props);
  }
  return __spreadValues({}, opts.appOptions);
}
function mount(opts, mountedInstances, props) {
  const instance = {
    domEl: null,
    vueInstance: null,
    root: null
  };
  const appOptions = resolveAppOptions(opts, props);
  if (!(props.dom instanceof HTMLElement)) {
    throw Error(`garfish-vue-bridge: Garfish runtime provides no dom attributes to mount\uFF0C ${props.dom}`);
  }
  if (appOptions.el) {
    appOptions.el = props.dom.querySelector(appOptions.el);
    if (!appOptions.el) {
      throw Error(`If appOptions.el is provided to garfish, the dom element must exist in the dom. Was provided as ${appOptions.el}.If use js as sub application entry resource please don't provider el options`);
    }
  } else {
    appOptions.el = props.dom;
  }
  instance.domEl = appOptions.el;
  if (!appOptions.data) {
    appOptions.data = {};
  }
  appOptions.data = () => __spreadValues(__spreadValues({}, appOptions.data), props);
  if (opts.createApp) {
    instance.vueInstance = opts.appOptions ? opts.createApp(appOptions) : opts.createApp(opts.rootComponent);
    if (opts.handleInstance) {
      opts.handleInstance(instance.vueInstance, props);
      instance.root = instance.vueInstance.mount(appOptions.el);
      mountedInstances[props.appName] = instance;
      return instance.vueInstance;
    } else {
      instance.root = instance.vueInstance.mount(appOptions.el);
    }
  }
  mountedInstances[props.appName] = instance;
  return instance.vueInstance;
}
function update(opts, mountedInstances, props) {
  const instance = mountedInstances[props.appName];
  const appOptions = resolveAppOptions(opts, props);
  const data = __spreadValues(__spreadValues({}, appOptions.data || {}), props);
  const root = instance.root || instance.vueInstance;
  for (const prop in data) {
    root[prop] = data[prop];
  }
}
function unmount(opts, mountedInstances, props) {
  const instance = mountedInstances[props.appName];
  instance.vueInstance.unmount(instance.domEl);
  delete instance.vueInstance;
  if (instance.domEl) {
    instance.domEl.innerHTML = "";
    delete instance.domEl;
  }
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vueBridge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy92dWVCcmlkZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7IHZ1ZUJyaWRnZSB9IGZyb20gJy4vdnVlQnJpZGdlJztcbiIsICIvLyBUaGUgbG9naWMgb2YgcmVhY3RCcmlkZ2UgaXMgcmVmZXJlbmNlZCBmcm9tIHNpbmdsZS1zcGEgdHlwb2dyYXBoeVxuLy8gQmVjYXVzZSB0aGUgR2FyZmlzaCBsaWZlY3ljbGUgZG9lcyBub3QgYWdyZWUgd2l0aCB0aGF0IG9mIHNpbmdsZS1zcGEgIHBhcnQgbG9naWNhbCBjb3VwbGluZyBpbiB0aGUgZnJhbWV3b3JrXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZ2xlLXNwYS9zaW5nbGUtc3BhLXZ1ZS9ibG9iL21haW4vc3JjL3NpbmdsZS1zcGEtdnVlLmpzXG5cbmltcG9ydCAqIGFzIHZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgVXNlck9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxudHlwZSBPcHRpb25zID0gVXNlck9wdGlvbnM8XG4gIHZ1ZS5DcmVhdGVBcHBGdW5jdGlvbjxFbGVtZW50PixcbiAgdnVlLkNvbXBvbmVudCxcbiAgdnVlLkFwcFxuPjtcblxuY29uc3QgZGVmYXVsdE9wdHMgPSB7XG4gIGNyZWF0ZUFwcDogbnVsbCxcbiAgVnVlUm91dGVyOiBudWxsLFxuICAvLyByZXF1aXJlZCAtIG9uZSBvciB0aGUgb3RoZXJcbiAgcm9vdENvbXBvbmVudDogbnVsbCxcbiAgbG9hZFJvb3RDb21wb25lbnQ6IG51bGwsXG4gIGFwcE9wdGlvbnM6IG51bGwsXG4gIGhhbmRsZUluc3RhbmNlOiBudWxsLFxuICBlbDogbnVsbCxcbiAgY2FuVXBkYXRlOiB0cnVlLCAvLyBieSBkZWZhdWx0LCBhbGxvdyBwYXJjZWxzIGNyZWF0ZWQgd2l0aCBnYXJmaXNoLXJlYWN0LWJyaWRnZSB0byBiZSB1cGRhdGVkXG59O1xuXG5kZWNsYXJlIGNvbnN0IF9fR0FSRklTSF9FWFBPUlRTX186IHtcbiAgcHJvdmlkZXI6IE9iamVjdDtcbn07XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgX19HQVJGSVNIX186IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZ1ZUJyaWRnZSh0aGlzOiBhbnksIHVzZXJPcHRzOiBPcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgdXNlck9wdHMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnYXJmaXNoLXZ1ZS1icmlkZ2U6IHJlcXVpcmVzIGEgY29uZmlndXJhdGlvbiBvYmplY3QnKTtcbiAgfVxuXG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgLi4uZGVmYXVsdE9wdHMsXG4gICAgLi4udXNlck9wdHMsXG4gIH07XG5cbiAgaWYgKFxuICAgIG9wdHMuYXBwT3B0aW9ucyAmJlxuICAgIHR5cGVvZiBvcHRzLmFwcE9wdGlvbnMgIT09ICdmdW5jdGlvbicgJiZcbiAgICBvcHRzLmFwcE9wdGlvbnNbJ2VsJ10gIT09IHVuZGVmaW5lZCAmJlxuICAgIHR5cGVvZiBvcHRzLmFwcE9wdGlvbnNbJ2VsJ10gIT09ICdzdHJpbmcnICYmXG4gICAgISgob3B0cy5hcHBPcHRpb25zIGFzIGFueSkuZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgKSB7XG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICBgZ2FyZmlzaC12dWUtYnJpZGdlOiBhcHBPcHRpb25zLmVsIG11c3QgYmUgYSBzdHJpbmcgQ1NTIHNlbGVjdG9yLCBhbiBIVE1MRWxlbWVudCwgb3Igbm90IHByb3ZpZGVkIGF0IGFsbC4gV2FzIGdpdmVuICR7dHlwZW9mIChcbiAgICAgICAgb3B0cy5hcHBPcHRpb25zIGFzIGFueVxuICAgICAgKS5lbH1gLFxuICAgICk7XG4gIH1cblxuICBvcHRzLmNyZWF0ZUFwcCA9IG9wdHMuY3JlYXRlQXBwIHx8IHZ1ZS5jcmVhdGVBcHA7XG4gIC8vIEp1c3QgYSBzaGFyZWQgb2JqZWN0IHRvIHN0b3JlIHRoZSBtb3VudGVkIG9iamVjdCBzdGF0ZVxuICAvLyBrZXkgLSBuYW1lIG9mIHNpbmdsZS1zcGEgYXBwLCBzaW5jZSBpdCBpcyB1bmlxdWVcbiAgY29uc3QgbW91bnRlZEluc3RhbmNlcyA9IHt9O1xuICBjb25zdCBwcm92aWRlckxpZmVDeWNsZSA9IHtcbiAgICByZW5kZXI6IChwcm9wcykgPT4gbW91bnQuY2FsbCh0aGlzLCBvcHRzLCBtb3VudGVkSW5zdGFuY2VzLCBwcm9wcyksXG4gICAgZGVzdHJveTogKHByb3BzKSA9PiB1bm1vdW50LmNhbGwodGhpcywgb3B0cywgbW91bnRlZEluc3RhbmNlcywgcHJvcHMpLFxuICAgIHVwZGF0ZTogKHByb3BzKSA9PlxuICAgICAgb3B0cy5jYW5VcGRhdGUgJiYgdXBkYXRlLmNhbGwodGhpcywgb3B0cywgbW91bnRlZEluc3RhbmNlcywgcHJvcHMpLFxuICB9O1xuXG4gIGNvbnN0IHByb3ZpZGVyID0gYXN5bmMgZnVuY3Rpb24gKHRoaXM6IGFueSwgYXBwSW5mbywgcHJvcHMpIHtcbiAgICBhd2FpdCBib290c3RyYXAuY2FsbCh0aGlzLCBvcHRzLCBhcHBJbmZvLCBwcm9wcyk7XG4gICAgcmV0dXJuIHByb3ZpZGVyTGlmZUN5Y2xlO1xuICB9O1xuXG4gIC8vIGluIHNhbmRib3ggZW52XG4gIGlmIChcbiAgICB3aW5kb3cuX19HQVJGSVNIX18gJiZcbiAgICB0eXBlb2YgX19HQVJGSVNIX0VYUE9SVFNfXyA9PT0gJ29iamVjdCcgJiZcbiAgICBfX0dBUkZJU0hfRVhQT1JUU19fXG4gICkge1xuICAgIF9fR0FSRklTSF9FWFBPUlRTX18ucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgfVxuICByZXR1cm4gcHJvdmlkZXI7XG59XG5cbmZ1bmN0aW9uIGJvb3RzdHJhcChvcHRzOiBPcHRpb25zLCBhcHBJbmZvLCBwcm9wcykge1xuICBpZiAob3B0cy5sb2FkUm9vdENvbXBvbmVudCkge1xuICAgIHJldHVybiBvcHRzXG4gICAgICAubG9hZFJvb3RDb21wb25lbnQoe1xuICAgICAgICAuLi5hcHBJbmZvLFxuICAgICAgICBwcm9wcyxcbiAgICAgIH0pXG4gICAgICAudGhlbigocm9vdCkgPT4gKG9wdHMucm9vdENvbXBvbmVudCA9IHJvb3QpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUFwcE9wdGlvbnMob3B0cywgcHJvcHMpIHtcbiAgaWYgKHR5cGVvZiBvcHRzLmFwcE9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb3B0cy5hcHBPcHRpb25zKHByb3BzKTtcbiAgfVxuICByZXR1cm4geyAuLi5vcHRzLmFwcE9wdGlvbnMgfTtcbn1cblxuZnVuY3Rpb24gbW91bnQob3B0czogT3B0aW9ucywgbW91bnRlZEluc3RhbmNlcywgcHJvcHMpIHtcbiAgY29uc3QgaW5zdGFuY2U6IGFueSA9IHtcbiAgICBkb21FbDogbnVsbCxcbiAgICB2dWVJbnN0YW5jZTogbnVsbCxcbiAgICByb290OiBudWxsLFxuICB9O1xuXG4gIGNvbnN0IGFwcE9wdGlvbnMgPSByZXNvbHZlQXBwT3B0aW9ucyhvcHRzLCBwcm9wcyk7XG5cbiAgaWYgKCEocHJvcHMuZG9tIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICBgZ2FyZmlzaC12dWUtYnJpZGdlOiBHYXJmaXNoIHJ1bnRpbWUgcHJvdmlkZXMgbm8gZG9tIGF0dHJpYnV0ZXMgdG8gbW91bnRcdUZGMEMgJHtwcm9wcy5kb219YCxcbiAgICApO1xuICB9XG5cbiAgaWYgKGFwcE9wdGlvbnMuZWwpIHtcbiAgICBhcHBPcHRpb25zLmVsID0gcHJvcHMuZG9tLnF1ZXJ5U2VsZWN0b3IoYXBwT3B0aW9ucy5lbCk7XG4gICAgaWYgKCFhcHBPcHRpb25zLmVsKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYElmIGFwcE9wdGlvbnMuZWwgaXMgcHJvdmlkZWQgdG8gZ2FyZmlzaCwgdGhlIGRvbSBlbGVtZW50IG11c3QgZXhpc3QgaW4gdGhlIGRvbS4gV2FzIHByb3ZpZGVkIGFzICR7YXBwT3B0aW9ucy5lbH0uSWYgdXNlIGpzIGFzIHN1YiBhcHBsaWNhdGlvbiBlbnRyeSByZXNvdXJjZSBwbGVhc2UgZG9uJ3QgcHJvdmlkZXIgZWwgb3B0aW9uc2AsXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhcHBPcHRpb25zLmVsID0gcHJvcHMuZG9tO1xuICB9XG5cbiAgaW5zdGFuY2UuZG9tRWwgPSBhcHBPcHRpb25zLmVsO1xuXG4gIGlmICghYXBwT3B0aW9ucy5kYXRhKSB7XG4gICAgYXBwT3B0aW9ucy5kYXRhID0ge307XG4gIH1cblxuICBhcHBPcHRpb25zLmRhdGEgPSAoKSA9PiAoeyAuLi5hcHBPcHRpb25zLmRhdGEsIC4uLnByb3BzIH0pO1xuXG4gIGlmIChvcHRzLmNyZWF0ZUFwcCkge1xuICAgIGluc3RhbmNlLnZ1ZUluc3RhbmNlID0gb3B0cy5hcHBPcHRpb25zXG4gICAgICA/IG9wdHMuY3JlYXRlQXBwKGFwcE9wdGlvbnMpXG4gICAgICA6IG9wdHMuY3JlYXRlQXBwKG9wdHMucm9vdENvbXBvbmVudCBhcyBhbnkpO1xuICAgIGlmIChvcHRzLmhhbmRsZUluc3RhbmNlKSB7XG4gICAgICBvcHRzLmhhbmRsZUluc3RhbmNlKGluc3RhbmNlLnZ1ZUluc3RhbmNlLCBwcm9wcyk7XG4gICAgICBpbnN0YW5jZS5yb290ID0gaW5zdGFuY2UudnVlSW5zdGFuY2UubW91bnQoYXBwT3B0aW9ucy5lbCk7XG4gICAgICBtb3VudGVkSW5zdGFuY2VzW3Byb3BzLmFwcE5hbWVdID0gaW5zdGFuY2U7XG4gICAgICByZXR1cm4gaW5zdGFuY2UudnVlSW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlLnJvb3QgPSBpbnN0YW5jZS52dWVJbnN0YW5jZS5tb3VudChhcHBPcHRpb25zLmVsKTtcbiAgICB9XG4gIH1cblxuICBtb3VudGVkSW5zdGFuY2VzW3Byb3BzLmFwcE5hbWVdID0gaW5zdGFuY2U7XG4gIHJldHVybiBpbnN0YW5jZS52dWVJbnN0YW5jZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKG9wdHM6IE9wdGlvbnMsIG1vdW50ZWRJbnN0YW5jZXMsIHByb3BzKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gbW91bnRlZEluc3RhbmNlc1twcm9wcy5hcHBOYW1lXTtcblxuICBjb25zdCBhcHBPcHRpb25zID0gcmVzb2x2ZUFwcE9wdGlvbnMob3B0cywgcHJvcHMpO1xuICBjb25zdCBkYXRhID0ge1xuICAgIC4uLihhcHBPcHRpb25zLmRhdGEgfHwge30pLFxuICAgIC4uLnByb3BzLFxuICB9O1xuICBjb25zdCByb290ID0gaW5zdGFuY2Uucm9vdCB8fCBpbnN0YW5jZS52dWVJbnN0YW5jZTtcbiAgZm9yIChjb25zdCBwcm9wIGluIGRhdGEpIHtcbiAgICByb290W3Byb3BdID0gZGF0YVtwcm9wXTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bm1vdW50KG9wdHM6IE9wdGlvbnMsIG1vdW50ZWRJbnN0YW5jZXMsIHByb3BzKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gbW91bnRlZEluc3RhbmNlc1twcm9wcy5hcHBOYW1lXTtcbiAgaW5zdGFuY2UudnVlSW5zdGFuY2UudW5tb3VudChpbnN0YW5jZS5kb21FbCk7XG4gIGRlbGV0ZSBpbnN0YW5jZS52dWVJbnN0YW5jZTtcblxuICBpZiAoaW5zdGFuY2UuZG9tRWwpIHtcbiAgICBpbnN0YW5jZS5kb21FbC5pbm5lckhUTUwgPSAnJztcbiAgICBkZWxldGUgaW5zdGFuY2UuZG9tRWw7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDSUEsVUFBcUI7QUFTckIsSUFBTSxjQUFjO0FBQUEsRUFDbEIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBRVgsZUFBZTtBQUFBLEVB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
