var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  Garfish: () => import_core2.default,
  default: () => GarfishInstance,
  defineCustomElements: () => defineCustomElements
});
var import_core2 = __toESM(require("@garfish/core"));

// src/instance.ts
var import_core = __toESM(require("@garfish/core"));
var import_router = require("@garfish/router");
var import_browser_vm = require("@garfish/browser-vm");
var import_browser_snapshot = require("@garfish/browser-snapshot");
var import_utils = require("@garfish/utils");
function createContext() {
  let fresh = false;
  if ((0, import_utils.inBrowser)() && window["__GARFISH__"] && window["Garfish"]) {
    return window["Garfish"];
  }
  const GarfishInstance2 = new import_core.default({
    plugins: [(0, import_router.GarfishRouter)(), (0, import_browser_vm.GarfishBrowserVm)(), (0, import_browser_snapshot.GarfishBrowserSnapshot)()]
  });
  const set = (namespace, val = GarfishInstance2) => {
    if ((0, import_utils.hasOwn)(window, namespace)) {
      if (!(window[namespace] && window[namespace].flag === import_utils.__GARFISH_FLAG__)) {
        const next = () => {
          fresh = true;
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            (0, import_utils.warn)(`"Window.${namespace}" will be overwritten by "garfish".`);
          }
        };
        const desc = Object.getOwnPropertyDescriptor(window, namespace);
        if (desc) {
          if (desc.configurable) {
            (0, import_utils.def)(window, namespace, val);
            next();
          } else if (desc.writable) {
            window[namespace] = val;
            next();
          }
        }
      }
    } else {
      fresh = true;
      (0, import_utils.def)(window, namespace, val);
    }
  };
  if ((0, import_utils.inBrowser)()) {
    set("Garfish");
    (0, import_utils.def)(window, "__GARFISH__", true);
  }
  if (fresh) {
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      if (window["Garfish"].version !== "1.12.0") {
        (0, import_utils.warn)('The "garfish version" used by the main and sub-applications is inconsistent.');
      }
    }
  }
  return GarfishInstance2;
}
var GarfishInstance = createContext();

// src/customElement.ts
function generateCustomerElement(htmlTag, options) {
  class MicroApp extends HTMLElement {
    constructor() {
      super();
      this.appInfo = {
        name: "",
        entry: "",
        basename: ""
      };
      this.options = {
        delay: 200
      };
      this.state = this._observerAppState({
        isLoading: false,
        error: null,
        promise: null,
        loaded: null,
        pastDelay: false
      });
      this.options = options;
    }
    _observerAppState(state) {
      return new Proxy(state, {
        set: (target, p, value, receiver) => {
          const getPlaceHolderAndAppend = () => {
            if (this.placeholder && this.contains(this.placeholder)) {
              this.removeChild(this.placeholder);
            }
            const placeholder = this.options.loading && this.options.loading({
              isLoading: this.state.isLoading,
              error: this.state.error,
              pastDelay: this.state.pastDelay
            });
            placeholder && this.appendChild(placeholder);
            return placeholder;
          };
          const res = Reflect.set(target, p, value, receiver);
          if (p === "error" && value) {
            const placeholder = getPlaceHolderAndAppend();
            if (placeholder)
              this.placeholder = placeholder;
          } else if (p === "pastDelay" && value === true) {
            const placeholder = getPlaceHolderAndAppend();
            if (placeholder)
              this.placeholder = placeholder;
          } else if (p === "isLoading" && value === true) {
            const placeholder = getPlaceHolderAndAppend();
            if (placeholder)
              this.placeholder = placeholder;
          } else if (p === "isLoading" && value === false) {
            if (!this.state.error && this.contains(this.placeholder)) {
              this.removeChild(this.placeholder);
            }
          }
          return res;
        }
      });
    }
    _loadApp() {
      if (this.state.isLoading)
        return;
      this.state.isLoading = true;
      if (typeof this.options.delay === "number") {
        if (this.options.delay === 0) {
          this.state.pastDelay = true;
        } else {
          this._delay = setTimeout(() => {
            this.state.pastDelay = true;
          }, this.options.delay);
        }
      }
      this.state.promise = GarfishInstance.loadApp(this.appInfo.name, {
        entry: this.appInfo.entry,
        domGetter: () => this,
        basename: this.appInfo.basename,
        sandbox: {
          snapshot: false,
          strictIsolation: this.hasAttribute("shadow") || false
        }
      });
    }
    _clearTimeouts() {
      clearTimeout(this._delay);
    }
    async connectedCallback() {
      this.appInfo = {
        name: this.getAttribute("name") || "",
        entry: this.getAttribute("entry") || "",
        basename: this.getAttribute("basename") || "/"
      };
      try {
        this._loadApp();
        this.state.loaded = await this.state.promise;
        if (this.state.loaded.mounted) {
          this.state.loaded.show();
        } else {
          await this.state.loaded.mount();
        }
      } catch (error) {
        this.state.error = error;
      } finally {
        this.state.isLoading = false;
      }
    }
    disconnectedCallback() {
      this._clearTimeouts();
      if (this.state.loaded) {
        this.state.loaded.hide();
      }
    }
    async adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log("Custom square element attributes changed.", name, oldValue, newValue);
    }
  }
  if (!customElements.get(htmlTag)) {
    GarfishInstance.run(options.config || {});
    customElements.define(htmlTag, MicroApp);
  }
}
function createLoadableWebComponent(htmlTag, options) {
  if (typeof htmlTag !== "string") {
    throw new Error("garfish requires a `htmlTag` name");
  }
  if (!options.loading) {
    throw new Error("garfish requires a `loading` component");
  }
  const opts = Object.assign({
    loading: false,
    delay: 200,
    timeout: null
  }, options);
  return generateCustomerElement(htmlTag, opts);
}
function defineCustomElements(htmlTag, options) {
  return createLoadableWebComponent(htmlTag, options);
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Garfish,
  defineCustomElements
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9pbnN0YW5jZS50cyIsICIuLi9zcmMvY3VzdG9tRWxlbWVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHR5cGUgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEdhcmZpc2ggfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmV4cG9ydCB7IEdhcmZpc2hJbnN0YW5jZSBhcyBkZWZhdWx0IH0gZnJvbSAnLi9pbnN0YW5jZSc7XG5leHBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50cyB9IGZyb20gJy4vY3VzdG9tRWxlbWVudCc7XG4iLCAiaW1wb3J0IEdhcmZpc2ggZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgeyBHYXJmaXNoUm91dGVyIH0gZnJvbSAnQGdhcmZpc2gvcm91dGVyJztcbmltcG9ydCB7IEdhcmZpc2hCcm93c2VyVm0gfSBmcm9tICdAZ2FyZmlzaC9icm93c2VyLXZtJztcbmltcG9ydCB7IEdhcmZpc2hCcm93c2VyU25hcHNob3QgfSBmcm9tICdAZ2FyZmlzaC9icm93c2VyLXNuYXBzaG90JztcbmltcG9ydCB7IGRlZiwgd2FybiwgaGFzT3duLCBpbkJyb3dzZXIsIF9fR0FSRklTSF9GTEFHX18gfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgR2FyZmlzaDogR2FyZmlzaDtcbiAgICBfX0dBUkZJU0hfXzogYm9vbGVhbjtcbiAgfVxufVxuXG4vLyBJbml0aWFsaXplIHRoZSBHYXJmaXNoLCBjdXJyZW50bHkgZXhpc3RpbmcgZW52aXJvbm1lbnQgdG8gYWxsb3cgb25seSBvbmUgaW5zdGFuY2UgKGV4cG9ydCB0byBpcyBmb3IgdGVzdClcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoKTogR2FyZmlzaCB7XG4gIGxldCBmcmVzaCA9IGZhbHNlO1xuICAvLyBFeGlzdGluZyBnYXJmaXNoIGluc3RhbmNlLCBkaXJlY3QgcmV0dXJuXG4gIGlmIChpbkJyb3dzZXIoKSAmJiB3aW5kb3dbJ19fR0FSRklTSF9fJ10gJiYgd2luZG93WydHYXJmaXNoJ10pIHtcbiAgICByZXR1cm4gd2luZG93WydHYXJmaXNoJ107XG4gIH1cblxuICBjb25zdCBHYXJmaXNoSW5zdGFuY2UgPSBuZXcgR2FyZmlzaCh7XG4gICAgcGx1Z2luczogW0dhcmZpc2hSb3V0ZXIoKSwgR2FyZmlzaEJyb3dzZXJWbSgpLCBHYXJmaXNoQnJvd3NlclNuYXBzaG90KCldLFxuICB9KTtcblxuICB0eXBlIGdsb2JhbFZhbHVlID0gYm9vbGVhbiB8IEdhcmZpc2ggfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgY29uc3Qgc2V0ID0gKG5hbWVzcGFjZTogc3RyaW5nLCB2YWw6IGdsb2JhbFZhbHVlID0gR2FyZmlzaEluc3RhbmNlKSA9PiB7XG4gICAgaWYgKGhhc093bih3aW5kb3csIG5hbWVzcGFjZSkpIHtcbiAgICAgIGlmICghKHdpbmRvd1tuYW1lc3BhY2VdICYmIHdpbmRvd1tuYW1lc3BhY2VdLmZsYWcgPT09IF9fR0FSRklTSF9GTEFHX18pKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICAgICAgZnJlc2ggPSB0cnVlO1xuICAgICAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICAgICAgd2FybihgXCJXaW5kb3cuJHtuYW1lc3BhY2V9XCIgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSBcImdhcmZpc2hcIi5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdywgbmFtZXNwYWNlKTtcbiAgICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgICBpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgIGRlZih3aW5kb3csIG5hbWVzcGFjZSwgdmFsKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRlc2Mud3JpdGFibGUpIHtcbiAgICAgICAgICAgIHdpbmRvd1tuYW1lc3BhY2VdID0gdmFsO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmcmVzaCA9IHRydWU7XG4gICAgICBkZWYod2luZG93LCBuYW1lc3BhY2UsIHZhbCk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChpbkJyb3dzZXIoKSkge1xuICAgIC8vIEdsb2JhbCBmbGFnXG4gICAgc2V0KCdHYXJmaXNoJyk7XG4gICAgZGVmKHdpbmRvdywgJ19fR0FSRklTSF9fJywgdHJ1ZSk7XG4gIH1cblxuICBpZiAoZnJlc2gpIHtcbiAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgIGlmICgnMS4xMi4wJyAhPT0gd2luZG93WydHYXJmaXNoJ10udmVyc2lvbikge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdUaGUgXCJnYXJmaXNoIHZlcnNpb25cIiB1c2VkIGJ5IHRoZSBtYWluIGFuZCBzdWItYXBwbGljYXRpb25zIGlzIGluY29uc2lzdGVudC4nLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gR2FyZmlzaEluc3RhbmNlO1xufVxuXG5leHBvcnQgY29uc3QgR2FyZmlzaEluc3RhbmNlID0gY3JlYXRlQ29udGV4dCgpO1xuIiwgImltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB7IEdhcmZpc2hJbnN0YW5jZSB9IGZyb20gJy4vaW5zdGFuY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbU9wdGlvbnMge1xuICBsb2FkaW5nOiAobG9hZGluZ1BhcmFtczogeyBpc0xvYWRpbmc6IGJvb2xlYW47IGVycm9yOiBFcnJvciB9KSA9PiBFbGVtZW50O1xuICBkZWxheTogbnVtYmVyO1xuICBjb25maWc/OiBpbnRlcmZhY2VzLkNvbmZpZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ3VzdG9tZXJFbGVtZW50KFxuICBodG1sVGFnOiBzdHJpbmcsXG4gIG9wdGlvbnM6IEN1c3RvbU9wdGlvbnMsXG4pIHtcbiAgY2xhc3MgTWljcm9BcHAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgYXBwSW5mbyA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgZW50cnk6ICcnLFxuICAgICAgYmFzZW5hbWU6ICcnLFxuICAgIH07XG4gICAgb3B0aW9uczoge1xuICAgICAgbG9hZGluZz86IChsb2FkaW5nUGFyYW1zOiB7XG4gICAgICAgIGlzTG9hZGluZzogYm9vbGVhbjtcbiAgICAgICAgZXJyb3I6IEVycm9yO1xuICAgICAgICBwYXN0RGVsYXk6IGJvb2xlYW47XG4gICAgICB9KSA9PiBFbGVtZW50O1xuICAgICAgZGVsYXk6IG51bWJlcjtcbiAgICB9ID0ge1xuICAgICAgZGVsYXk6IDIwMCxcbiAgICB9O1xuICAgIHBsYWNlaG9sZGVyOiBFbGVtZW50O1xuICAgIHN0YXRlID0gdGhpcy5fb2JzZXJ2ZXJBcHBTdGF0ZSh7XG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgZXJyb3I6IG51bGwsXG4gICAgICBwcm9taXNlOiBudWxsLFxuICAgICAgbG9hZGVkOiBudWxsLFxuICAgICAgcGFzdERlbGF5OiBmYWxzZSxcbiAgICB9KTtcbiAgICBfZGVsYXk6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbiAgICBfb2JzZXJ2ZXJBcHBTdGF0ZShzdGF0ZSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm94eShzdGF0ZSwge1xuICAgICAgICBzZXQ6ICh0YXJnZXQ6IGFueSwgcDogc3RyaW5nIHwgc3ltYm9sLCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KSA9PiB7XG4gICAgICAgICAgLy8gTG9hZGluZyBzdGF0dXMgY29udGVudCBkaXNwbGF5IGluIHRoZSBsb2FkaW5nIHByb2Nlc3NcbiAgICAgICAgICAvLyBFcnJvciBkaXNwbGF5IGVycm9yXG4gICAgICAgICAgY29uc3QgZ2V0UGxhY2VIb2xkZXJBbmRBcHBlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV4aXN0aW5nIHBsYWNlaG9sZGVyIGNvbnRlbnRcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyICYmIHRoaXMuY29udGFpbnModGhpcy5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID1cbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxvYWRpbmcgJiZcbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxvYWRpbmcoe1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogdGhpcy5zdGF0ZS5pc0xvYWRpbmcsXG4gICAgICAgICAgICAgICAgZXJyb3I6IHRoaXMuc3RhdGUuZXJyb3IsXG4gICAgICAgICAgICAgICAgcGFzdERlbGF5OiB0aGlzLnN0YXRlLnBhc3REZWxheSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwbGFjZWhvbGRlciAmJiB0aGlzLmFwcGVuZENoaWxkKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgcmVzID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBwLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgICAgIC8vIExvYWRpbmcgYmVnYW4gdG8gb3BlbiB0aGUgbG9hZGluZyBwbGFjZWhvbGRlclxuICAgICAgICAgIC8vIExvYWRpbmcgZW5kIGNsb3NlZCBsb2FkaW5nIHBsYWNlaG9sZGVyXG4gICAgICAgICAgLy8gTG9hZGluZyBlbmQgcGxhY2Vob2xkZXIgY2xvc2VkIGlmIHRoZXJlIGlzIG5vIG1pc3Rha2VcbiAgICAgICAgICBpZiAocCA9PT0gJ2Vycm9yJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBnZXRQbGFjZUhvbGRlckFuZEFwcGVuZCgpO1xuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSAncGFzdERlbGF5JyAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBnZXRQbGFjZUhvbGRlckFuZEFwcGVuZCgpO1xuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSAnaXNMb2FkaW5nJyAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBnZXRQbGFjZUhvbGRlckFuZEFwcGVuZCgpO1xuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSAnaXNMb2FkaW5nJyAmJiB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5lcnJvciAmJiB0aGlzLmNvbnRhaW5zKHRoaXMucGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfbG9hZEFwcCgpIHtcbiAgICAgIC8vIElmIHlvdSBhcmUgbG9hZGluZyBzdG9wIGNvbnRpbnVlIHRvIGxvYWRcbiAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9hZGluZykgcmV0dXJuO1xuICAgICAgdGhpcy5zdGF0ZS5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAvLyBBdm9pZCBsb2FkaW5nIGZsYXNoIGJhY2tcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlbGF5ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5wYXN0RGVsYXkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RlbGF5ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnBhc3REZWxheSA9IHRydWU7XG4gICAgICAgICAgfSwgdGhpcy5vcHRpb25zLmRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlLnByb21pc2UgPSBHYXJmaXNoSW5zdGFuY2UubG9hZEFwcCh0aGlzLmFwcEluZm8ubmFtZSwge1xuICAgICAgICBlbnRyeTogdGhpcy5hcHBJbmZvLmVudHJ5LFxuICAgICAgICBkb21HZXR0ZXI6ICgpID0+IHRoaXMsXG4gICAgICAgIGJhc2VuYW1lOiB0aGlzLmFwcEluZm8uYmFzZW5hbWUsXG4gICAgICAgIHNhbmRib3g6IHtcbiAgICAgICAgICBzbmFwc2hvdDogZmFsc2UsXG4gICAgICAgICAgc3RyaWN0SXNvbGF0aW9uOiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2hhZG93JykgfHwgZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfY2xlYXJUaW1lb3V0cygpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kZWxheSk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLmFwcEluZm8gPSB7XG4gICAgICAgIG5hbWU6IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJycsXG4gICAgICAgIGVudHJ5OiB0aGlzLmdldEF0dHJpYnV0ZSgnZW50cnknKSB8fCAnJyxcbiAgICAgICAgYmFzZW5hbWU6IHRoaXMuZ2V0QXR0cmlidXRlKCdiYXNlbmFtZScpIHx8ICcvJyxcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9sb2FkQXBwKCk7XG4gICAgICAgIHRoaXMuc3RhdGUubG9hZGVkID0gYXdhaXQgdGhpcy5zdGF0ZS5wcm9taXNlO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5sb2FkZWQubW91bnRlZCkge1xuICAgICAgICAgIHRoaXMuc3RhdGUubG9hZGVkLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnN0YXRlLmxvYWRlZC5tb3VudCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aGlzLnN0YXRlLmVycm9yID0gZXJyb3I7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLnN0YXRlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lb3V0cygpO1xuICAgICAgaWYgKHRoaXMuc3RhdGUubG9hZGVkKSB7XG4gICAgICAgIHRoaXMuc3RhdGUubG9hZGVkLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBhZG9wdGVkQ2FsbGJhY2soKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIHNxdWFyZSBlbGVtZW50IG1vdmVkIHRvIG5ldyBwYWdlLicpO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnQ3VzdG9tIHNxdWFyZSBlbGVtZW50IGF0dHJpYnV0ZXMgY2hhbmdlZC4nLFxuICAgICAgICBuYW1lLFxuICAgICAgICBvbGRWYWx1ZSxcbiAgICAgICAgbmV3VmFsdWUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgbmV3IGVsZW1lbnRcbiAgaWYgKCFjdXN0b21FbGVtZW50cy5nZXQoaHRtbFRhZykpIHtcbiAgICBHYXJmaXNoSW5zdGFuY2UucnVuKG9wdGlvbnMuY29uZmlnIHx8IHt9KTtcbiAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoaHRtbFRhZywgTWljcm9BcHApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvYWRhYmxlV2ViQ29tcG9uZW50KGh0bWxUYWc6IHN0cmluZywgb3B0aW9uczogQ3VzdG9tT3B0aW9ucykge1xuICBpZiAodHlwZW9mIGh0bWxUYWcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnYXJmaXNoIHJlcXVpcmVzIGEgYGh0bWxUYWdgIG5hbWUnKTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5sb2FkaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnYXJmaXNoIHJlcXVpcmVzIGEgYGxvYWRpbmdgIGNvbXBvbmVudCcpO1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBkZWxheTogMjAwLFxuICAgICAgdGltZW91dDogbnVsbCxcbiAgICB9LFxuICAgIG9wdGlvbnMsXG4gICk7XG4gIHJldHVybiBnZW5lcmF0ZUN1c3RvbWVyRWxlbWVudChodG1sVGFnLCBvcHRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUN1c3RvbUVsZW1lbnRzKGh0bWxUYWc6IHN0cmluZywgb3B0aW9uczogQ3VzdG9tT3B0aW9ucykge1xuICByZXR1cm4gY3JlYXRlTG9hZGFibGVXZWJDb21wb25lbnQoaHRtbFRhZywgb3B0aW9ucyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBLG1CQUFtQzs7O0FDRG5DLGtCQUFvQjtBQUNwQixvQkFBOEI7QUFDOUIsd0JBQWlDO0FBQ2pDLDhCQUF1QztBQUN2QyxtQkFBK0Q7QUFVL0QseUJBQWtDO0FBQ2hDLE1BQUksUUFBUTtBQUVaLE1BQUksaUNBQWUsT0FBTyxrQkFBa0IsT0FBTyxZQUFZO0FBQzdELFdBQU8sT0FBTztBQUFBO0FBR2hCLFFBQU0sbUJBQWtCLElBQUksb0JBQVE7QUFBQSxJQUNsQyxTQUFTLENBQUMsb0NBQWlCLDJDQUFvQjtBQUFBO0FBSWpELFFBQU0sTUFBTSxDQUFDLFdBQW1CLE1BQW1CLHFCQUFvQjtBQUNyRSxRQUFJLHlCQUFPLFFBQVEsWUFBWTtBQUM3QixVQUFJLENBQUUsUUFBTyxjQUFjLE9BQU8sV0FBVyxTQUFTLGdDQUFtQjtBQUN2RSxjQUFNLE9BQU8sTUFBTTtBQUNqQixrQkFBUTtBQUNSLGNBQUssT0FBTyxZQUFZLGVBQWUsUUFBUSxPQUFPLFFBQVEsSUFBSSxXQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWdCLE9BQVE7QUFDN0gsbUNBQUssV0FBVztBQUFBO0FBQUE7QUFHcEIsY0FBTSxPQUFPLE9BQU8seUJBQXlCLFFBQVE7QUFDckQsWUFBSSxNQUFNO0FBQ1IsY0FBSSxLQUFLLGNBQWM7QUFDckIsa0NBQUksUUFBUSxX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
