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
  opts.Vue = opts.Vue || vue.default;
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
  if (!appOptions.render && !appOptions.template && opts.rootComponent) {
    appOptions.render = (h) => h(opts.rootComponent);
  }
  if (!appOptions.data) {
    appOptions.data = {};
  }
  appOptions.data = () => __spreadValues(__spreadValues({}, appOptions.data), props);
  delete appOptions.el;
  if (opts && opts.Vue) {
    instance.vueInstance = new opts.Vue(appOptions);
    instance.vueInstance.$mount();
    instance.domEl.appendChild(instance.vueInstance.$el);
    if (instance.vueInstance.bind) {
      instance.vueInstance = instance.vueInstance.bind(instance.vueInstance);
    }
    if (opts.handleInstance) {
      opts.handleInstance(instance.vueInstance, props);
      mountedInstances[props.appName] = instance;
      return instance.vueInstance;
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
  instance.vueInstance.$destroy();
  instance.vueInstance.$el.innerHTML = "";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy92dWVCcmlkZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7IHZ1ZUJyaWRnZSB9IGZyb20gJy4vdnVlQnJpZGdlJztcbiIsICIvLyBUaGUgbG9naWMgb2YgcmVhY3RCcmlkZ2UgaXMgcmVmZXJlbmNlZCBmcm9tIHNpbmdsZS1zcGEgdHlwb2dyYXBoeVxuLy8gQmVjYXVzZSB0aGUgR2FyZmlzaCBsaWZlY3ljbGUgZG9lcyBub3QgYWdyZWUgd2l0aCB0aGF0IG9mIHNpbmdsZS1zcGEgIHBhcnQgbG9naWNhbCBjb3VwbGluZyBpbiB0aGUgZnJhbWV3b3JrXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2luZ2xlLXNwYS9zaW5nbGUtc3BhLXZ1ZS9ibG9iL21haW4vc3JjL3NpbmdsZS1zcGEtdnVlLmpzXG5cbmltcG9ydCAqIGFzIHZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgVXNlck9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxudHlwZSBPcHRpb25zID0gVXNlck9wdGlvbnM8dnVlLlZ1ZUNvbnN0cnVjdG9yLCB2dWUuQ29tcG9uZW50PjtcblxuY29uc3QgZGVmYXVsdE9wdHMgPSB7XG4gIFZ1ZVJvdXRlcjogbnVsbCxcbiAgLy8gcmVxdWlyZWQgLSBvbmUgb3IgdGhlIG90aGVyXG4gIHJvb3RDb21wb25lbnQ6IG51bGwsXG4gIGxvYWRSb290Q29tcG9uZW50OiBudWxsLFxuICBhcHBPcHRpb25zOiBudWxsLFxuICBoYW5kbGVJbnN0YW5jZTogbnVsbCxcbiAgZWw6IG51bGwsXG4gIGNhblVwZGF0ZTogdHJ1ZSwgLy8gYnkgZGVmYXVsdCwgYWxsb3cgcGFyY2VscyBjcmVhdGVkIHdpdGggZ2FyZmlzaC1yZWFjdC1icmlkZ2UgdG8gYmUgdXBkYXRlZFxufTtcblxuZGVjbGFyZSBjb25zdCBfX0dBUkZJU0hfRVhQT1JUU19fOiB7XG4gIHByb3ZpZGVyOiBPYmplY3Q7XG59O1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIF9fR0FSRklTSF9fOiBib29sZWFuO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2dWVCcmlkZ2UodGhpczogYW55LCB1c2VyT3B0czogT3B0aW9ucykge1xuICBpZiAodHlwZW9mIHVzZXJPcHRzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2FyZmlzaC12dWUtYnJpZGdlOiByZXF1aXJlcyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0Jyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0ge1xuICAgIC4uLmRlZmF1bHRPcHRzLFxuICAgIC4uLnVzZXJPcHRzLFxuICB9O1xuXG4gIGlmIChcbiAgICBvcHRzLmFwcE9wdGlvbnMgJiZcbiAgICB0eXBlb2Ygb3B0cy5hcHBPcHRpb25zICE9PSAnZnVuY3Rpb24nICYmXG4gICAgb3B0cy5hcHBPcHRpb25zWydlbCddICE9PSB1bmRlZmluZWQgJiZcbiAgICB0eXBlb2Ygb3B0cy5hcHBPcHRpb25zWydlbCddICE9PSAnc3RyaW5nJyAmJlxuICAgICEoKG9wdHMuYXBwT3B0aW9ucyBhcyBhbnkpLmVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG4gICkge1xuICAgIHRocm93IEVycm9yKFxuICAgICAgYGdhcmZpc2gtdnVlLWJyaWRnZTogYXBwT3B0aW9ucy5lbCBtdXN0IGJlIGEgc3RyaW5nIENTUyBzZWxlY3RvciwgYW4gSFRNTEVsZW1lbnQsIG9yIG5vdCBwcm92aWRlZCBhdCBhbGwuIFdhcyBnaXZlbiAke3R5cGVvZiAoXG4gICAgICAgIG9wdHMuYXBwT3B0aW9ucyBhcyBhbnlcbiAgICAgICkuZWx9YCxcbiAgICApO1xuICB9XG4gIG9wdHMuVnVlID0gb3B0cy5WdWUgfHwgdnVlLmRlZmF1bHQ7XG5cbiAgLy8gSnVzdCBhIHNoYXJlZCBvYmplY3QgdG8gc3RvcmUgdGhlIG1vdW50ZWQgb2JqZWN0IHN0YXRlXG4gIC8vIGtleSAtIG5hbWUgb2Ygc2luZ2xlLXNwYSBhcHAsIHNpbmNlIGl0IGlzIHVuaXF1ZVxuICBjb25zdCBtb3VudGVkSW5zdGFuY2VzID0ge307XG4gIGNvbnN0IHByb3ZpZGVyTGlmZUN5Y2xlID0ge1xuICAgIHJlbmRlcjogKHByb3BzKSA9PiBtb3VudC5jYWxsKHRoaXMsIG9wdHMsIG1vdW50ZWRJbnN0YW5jZXMsIHByb3BzKSxcbiAgICBkZXN0cm95OiAocHJvcHMpID0+IHVubW91bnQuY2FsbCh0aGlzLCBvcHRzLCBtb3VudGVkSW5zdGFuY2VzLCBwcm9wcyksXG4gICAgdXBkYXRlOiAocHJvcHMpID0+XG4gICAgICBvcHRzLmNhblVwZGF0ZSAmJiB1cGRhdGUuY2FsbCh0aGlzLCBvcHRzLCBtb3VudGVkSW5zdGFuY2VzLCBwcm9wcyksXG4gIH07XG5cbiAgY29uc3QgcHJvdmlkZXIgPSBhc3luYyBmdW5jdGlvbiAodGhpczogYW55LCBhcHBJbmZvLCBwcm9wcykge1xuICAgIGF3YWl0IGJvb3RzdHJhcC5jYWxsKHRoaXMsIG9wdHMsIGFwcEluZm8sIHByb3BzKTtcbiAgICByZXR1cm4gcHJvdmlkZXJMaWZlQ3ljbGU7XG4gIH07XG5cbiAgLy8gaW4gc2FuZGJveCBlbnZcbiAgaWYgKFxuICAgIHdpbmRvdy5fX0dBUkZJU0hfXyAmJlxuICAgIHR5cGVvZiBfX0dBUkZJU0hfRVhQT1JUU19fID09PSAnb2JqZWN0JyAmJlxuICAgIF9fR0FSRklTSF9FWFBPUlRTX19cbiAgKSB7XG4gICAgX19HQVJGSVNIX0VYUE9SVFNfXy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICB9XG4gIHJldHVybiBwcm92aWRlcjtcbn1cblxuZnVuY3Rpb24gYm9vdHN0cmFwKG9wdHM6IE9wdGlvbnMsIGFwcEluZm8sIHByb3BzKSB7XG4gIGlmIChvcHRzLmxvYWRSb290Q29tcG9uZW50KSB7XG4gICAgcmV0dXJuIG9wdHNcbiAgICAgIC5sb2FkUm9vdENvbXBvbmVudCh7XG4gICAgICAgIC4uLmFwcEluZm8sXG4gICAgICAgIHByb3BzLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyb290KSA9PiAob3B0cy5yb290Q29tcG9uZW50ID0gcm9vdCkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQXBwT3B0aW9ucyhvcHRzLCBwcm9wcykge1xuICBpZiAodHlwZW9mIG9wdHMuYXBwT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHRzLmFwcE9wdGlvbnMocHJvcHMpO1xuICB9XG4gIHJldHVybiB7IC4uLm9wdHMuYXBwT3B0aW9ucyB9O1xufVxuXG5mdW5jdGlvbiBtb3VudChvcHRzOiBPcHRpb25zLCBtb3VudGVkSW5zdGFuY2VzLCBwcm9wcykge1xuICBjb25zdCBpbnN0YW5jZTogYW55ID0ge1xuICAgIGRvbUVsOiBudWxsLFxuICAgIHZ1ZUluc3RhbmNlOiBudWxsLFxuICAgIHJvb3Q6IG51bGwsXG4gIH07XG5cbiAgY29uc3QgYXBwT3B0aW9ucyA9IHJlc29sdmVBcHBPcHRpb25zKG9wdHMsIHByb3BzKTtcblxuICBpZiAoIShwcm9wcy5kb20gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICB0aHJvdyBFcnJvcihcbiAgICAgIGBnYXJmaXNoLXZ1ZS1icmlkZ2U6IEdhcmZpc2ggcnVudGltZSBwcm92aWRlcyBubyBkb20gYXR0cmlidXRlcyB0byBtb3VudFx1RkYwQyAke3Byb3BzLmRvbX1gLFxuICAgICk7XG4gIH1cblxuICBpZiAoYXBwT3B0aW9ucy5lbCkge1xuICAgIGFwcE9wdGlvbnMuZWwgPSBwcm9wcy5kb20ucXVlcnlTZWxlY3RvcihhcHBPcHRpb25zLmVsKTtcbiAgICBpZiAoIWFwcE9wdGlvbnMuZWwpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgSWYgYXBwT3B0aW9ucy5lbCBpcyBwcm92aWRlZCB0byBnYXJmaXNoLCB0aGUgZG9tIGVsZW1lbnQgbXVzdCBleGlzdCBpbiB0aGUgZG9tLiBXYXMgcHJvdmlkZWQgYXMgJHthcHBPcHRpb25zLmVsfS5JZiB1c2UganMgYXMgc3ViIGFwcGxpY2F0aW9uIGVudHJ5IHJlc291cmNlIHBsZWFzZSBkb24ndCBwcm92aWRlciBlbCBvcHRpb25zYCxcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFwcE9wdGlvbnMuZWwgPSBwcm9wcy5kb207XG4gIH1cblxuICBpbnN0YW5jZS5kb21FbCA9IGFwcE9wdGlvbnMuZWw7XG5cbiAgaWYgKCFhcHBPcHRpb25zLnJlbmRlciAmJiAhYXBwT3B0aW9ucy50ZW1wbGF0ZSAmJiBvcHRzLnJvb3RDb21wb25lbnQpIHtcbiAgICAvLyBpdCB3b3JrcyBmb3IgdnVlMiwgaW4gdnVlMyBgaGAgaW4gaW1wb3J0ZWQgZnJvbSBgdnVlJ2AgaW5zdGVhZCBvZiBwYXNzaW5nIGl0IHRocm91Z2ggdGhlIHJlbmRlciBmdW5jdGlvblxuICAgIGFwcE9wdGlvbnMucmVuZGVyID0gKGgpID0+IGgob3B0cy5yb290Q29tcG9uZW50KTtcbiAgfVxuXG4gIGlmICghYXBwT3B0aW9ucy5kYXRhKSB7XG4gICAgYXBwT3B0aW9ucy5kYXRhID0ge307XG4gIH1cblxuICBhcHBPcHRpb25zLmRhdGEgPSAoKSA9PiAoeyAuLi5hcHBPcHRpb25zLmRhdGEsIC4uLnByb3BzIH0pO1xuXG4gIC8vIHZ1ZTIgZWwgb3B0aW9ucyB3aWxsIGF1dG8gcmVwbGFjZSByZW5kZXIgZG9tXHVGRjBDZ2FyZmlzaCBjYWNoZSBtb2RlIGNhbid0IHJlcGxhY2UgcmVuZGVyIGRvbSBodHRwczovL2NuLnZ1ZWpzLm9yZy92Mi9hcGkvI2VsXG4gIGRlbGV0ZSBhcHBPcHRpb25zLmVsO1xuICBpZiAob3B0cyAmJiBvcHRzLlZ1ZSkge1xuICAgIGluc3RhbmNlLnZ1ZUluc3RhbmNlID0gbmV3IG9wdHMuVnVlKGFwcE9wdGlvbnMpO1xuICAgIGluc3RhbmNlLnZ1ZUluc3RhbmNlLiRtb3VudCgpO1xuICAgIGluc3RhbmNlLmRvbUVsLmFwcGVuZENoaWxkKGluc3RhbmNlLnZ1ZUluc3RhbmNlLiRlbCk7XG4gICAgaWYgKGluc3RhbmNlLnZ1ZUluc3RhbmNlLmJpbmQpIHtcbiAgICAgIGluc3RhbmNlLnZ1ZUluc3RhbmNlID0gaW5zdGFuY2UudnVlSW5zdGFuY2UuYmluZChpbnN0YW5jZS52dWVJbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmIChvcHRzLmhhbmRsZUluc3RhbmNlKSB7XG4gICAgICBvcHRzLmhhbmRsZUluc3RhbmNlKGluc3RhbmNlLnZ1ZUluc3RhbmNlLCBwcm9wcyk7XG4gICAgICBtb3VudGVkSW5zdGFuY2VzW3Byb3BzLmFwcE5hbWVdID0gaW5zdGFuY2U7XG4gICAgICByZXR1cm4gaW5zdGFuY2UudnVlSW5zdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgbW91bnRlZEluc3RhbmNlc1twcm9wcy5hcHBOYW1lXSA9IGluc3RhbmNlO1xuICByZXR1cm4gaW5zdGFuY2UudnVlSW5zdGFuY2U7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShvcHRzOiBPcHRpb25zLCBtb3VudGVkSW5zdGFuY2VzLCBwcm9wcykge1xuICBjb25zdCBpbnN0YW5jZSA9IG1vdW50ZWRJbnN0YW5jZXNbcHJvcHMuYXBwTmFtZV07XG5cbiAgY29uc3QgYXBwT3B0aW9ucyA9IHJlc29sdmVBcHBPcHRpb25zKG9wdHMsIHByb3BzKTtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICAuLi4oYXBwT3B0aW9ucy5kYXRhIHx8IHt9KSxcbiAgICAuLi5wcm9wcyxcbiAgfTtcbiAgY29uc3Qgcm9vdCA9IGluc3RhbmNlLnJvb3QgfHwgaW5zdGFuY2UudnVlSW5zdGFuY2U7XG4gIGZvciAoY29uc3QgcHJvcCBpbiBkYXRhKSB7XG4gICAgcm9vdFtwcm9wXSA9IGRhdGFbcHJvcF07XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5tb3VudChvcHRzOiBPcHRpb25zLCBtb3VudGVkSW5zdGFuY2VzLCBwcm9wcykge1xuICBjb25zdCBpbnN0YW5jZSA9IG1vdW50ZWRJbnN0YW5jZXNbcHJvcHMuYXBwTmFtZV07XG5cbiAgaW5zdGFuY2UudnVlSW5zdGFuY2UuJGRlc3Ryb3koKTtcbiAgaW5zdGFuY2UudnVlSW5zdGFuY2UuJGVsLmlubmVySFRNTCA9ICcnO1xuXG4gIGRlbGV0ZSBpbnN0YW5jZS52dWVJbnN0YW5jZTtcblxuICBpZiAoaW5zdGFuY2UuZG9tRWwpIHtcbiAgICBpbnN0YW5jZS5kb21FbC5pbm5lckhUTUwgPSAnJztcbiAgICBkZWxldGUgaW5zdGFuY2UuZG9tRWw7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDSUEsVUFBcUI7QUFLckIsSUFBTSxjQUFjO0FBQUEsRUFDbEIsV0FBVztBQUFBLEVBRVgsZUFBZTtBQUFBLEVBQ2YsbUJBQW1CO0FBQUEsRUFDbkIsWUFBWTtBQUFBLEVBQ1osZ0JBQWdCO0FBQUEsRUFDaEIsSUFBSTtBQUFBLEVBQ0osV0FBVztBQUFBO0FBYU4sbUJBQThCLFVBQW1CO0FBQ3RELE1BQUksT0FBTyxhQUFhLFVBQVU7QUFDaEMsVUFBTSxJQUFJLE1BQU07QUFBQTtBQUdsQixRQUFNLE9BQU8sa0NBQ1IsY0FDQTtBQUdMLE1BQ0UsS0FBSyxjQUNMLE9BQU8sS0FBSyxlQUFlLGNBQzNCLEtBQUssV0FBVyxVQUFVLFVBQzFCLE9BQU8sS0FBSyxXQUFXLFVBQVUsWUFDakMsQ0FBRyxNQUFLLFdBQW1CLGNBQWMsY0FDekM7QUFDQSxVQUFNLE1BQ0osc0hBQXNILE9BQ3BILEtBQUssV0FDTDtBQUFBO0FBR04sT0FBSyxNQUFNLEtBQUssT0FBVztBQUkzQixRQUFNLG1CQUFtQjtBQUN6QixRQUFNLG9CQUFvQjtBQUFBLElBQ3hCLFFBQVEsQ0FBQyxVQUFVLE1BQU0sS0FBSyxNQUFNLE1BQU0sa0JBQWtCO0FBQUEsSUFDNUQsU0FBUyxDQUFDLFVBQVUsUUFBUSxLQUFLLE1BQU0sTUFBTSxrQkFBa0I7QUFBQSxJQUMvRCxRQUFRLENBQUMsVUFDUCxLQUFLLGFBQWEsT0FBTyxL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
