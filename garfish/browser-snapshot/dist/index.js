var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  GarfishBrowserSnapshot: () => GarfishBrowserSnapshot,
  default: () => Sandbox
});

// src/patchers/event.ts
var rawAddEventListener;
var rawRemoveEventListener;
var PatchEvent = class {
  constructor() {
    this.listenerMap = /* @__PURE__ */ new Map();
  }
  activate() {
    this.listenerMap.forEach((listeners, type) => [...listeners].forEach((listener) => window.addEventListener(type, listener)));
    if (!rawAddEventListener || !rawRemoveEventListener) {
      rawAddEventListener = window.addEventListener;
      rawRemoveEventListener = window.removeEventListener;
    }
    window.addEventListener = (type, listener, options) => {
      const listeners = this.listenerMap.get(type) || [];
      this.listenerMap.set(type, [...listeners, listener]);
      return rawAddEventListener.call(window, type, listener, options);
    };
    window.removeEventListener = (type, listener, options) => {
      const storedTypeListeners = this.listenerMap.get(type);
      if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listener) !== -1) {
        storedTypeListeners.splice(storedTypeListeners.indexOf(listener), 1);
      }
      return rawRemoveEventListener.call(window, type, listener, options);
    };
  }
  deactivate() {
    this.listenerMap.forEach((listeners, type) => [...listeners].forEach((listener) => window.removeEventListener(type, listener)));
    window.removeEventListener = rawRemoveEventListener;
    window.addEventListener = rawAddEventListener;
  }
};

// src/patchers/interceptor.ts
function isStyledComponentsLike(element) {
  var _a;
  return element instanceof HTMLStyleElement && !element.textContent && ((_a = element.sheet) == null ? void 0 : _a.cssRules.length);
}
var Snapshot = class {
  constructor(arrDoms) {
    this.arrDoms = arrDoms;
    this.arrDoms = arrDoms;
  }
  static take(target = document.head) {
    let list;
    if (target.childNodes) {
      list = Array.prototype.slice.call(target.childNodes);
    } else {
      list = Array.prototype.slice.call(target);
    }
    return new Snapshot(list);
  }
  diff(s) {
    if (!s) {
      return {
        created: new Snapshot([]),
        removed: new Snapshot([])
      };
    }
    return {
      created: new Snapshot(this.arrDoms.filter((d) => s.arrDoms.indexOf(d) === -1)),
      removed: new Snapshot(s.arrDoms.filter((d) => this.arrDoms.indexOf(d) === -1))
    };
  }
};
var Interceptor = class {
  constructor(dom = document.head) {
    this.dom = dom;
    this.dom = dom;
    this.dynamicStyleSheetElementSet = /* @__PURE__ */ new Set();
    this.styledComponentCSSRulesMap = /* @__PURE__ */ new WeakMap();
  }
  add(createdOrSnapshot, removed) {
    let created;
    if (!removed) {
      const diff = Snapshot.take(this.dom).diff(createdOrSnapshot);
      created = diff.created;
      removed = diff.removed;
    } else {
      created = createdOrSnapshot;
    }
    created.arrDoms.reduce((prev, val) => {
      var _a, _b;
      prev.appendChild(val);
      if (val instanceof HTMLStyleElement) {
        const cssRules = this.styledComponentCSSRulesMap.get(val);
        if (cssRules && cssRules.length) {
          for (let i = 0; i < cssRules.length; i++) {
            const cssRule = cssRules[i];
            (_b = val.sheet) == null ? void 0 : _b.insertRule(cssRule.cssText, (_a = val.sheet) == null ? void 0 : _a.cssRules.length);
          }
        }
      }
      return prev;
    }, this.dom);
    removed.arrDoms.reduce((prev, val) => {
      prev.removeChild(val);
      return prev;
    }, this.dom);
  }
  remove(createdOrSnapshot, removed) {
    let created;
    if (!removed) {
      const diff = Snapshot.take(this.dom).diff(createdOrSnapshot);
      created = diff.created;
      removed = diff.removed;
    } else {
      created = createdOrSnapshot;
    }
    created.arrDoms.reduce((prev, val) => {
      var _a;
      if (val instanceof HTMLStyleElement && isStyledComponentsLike(val) && ((_a = val == null ? void 0 : val.sheet) == null ? void 0 : _a.cssRules)) {
        this.styledComponentCSSRulesMap.set(val, val.sheet.cssRules);
      }
      prev.removeChild(val);
      return prev;
    }, this.dom);
    removed.arrDoms.reduce((prev, val) => {
      prev.appendChild(val);
      return prev;
    }, this.dom);
  }
};

// src/patchers/style.ts
var PatchStyle = class {
  constructor() {
    this.headInterceptor = new Interceptor(document.head);
  }
  activate() {
    this.domSnapshotBefore = Snapshot.take();
    if (this.domSnapshotMutated)
      this.headInterceptor.add(this.domSnapshotMutated.created, this.domSnapshotMutated.removed);
  }
  deactivate() {
    const domSnapshot = Snapshot.take();
    this.domSnapshotMutated = domSnapshot.diff(this.domSnapshotBefore);
    if (!this.domSnapshotMutated)
      return;
    this.headInterceptor.remove(this.domSnapshotMutated.created, this.domSnapshotMutated.removed);
  }
  formateCtx(arrDoms) {
    const effectMap = {
      style: [],
      script: [],
      other: []
    };
    arrDoms.forEach((dom) => {
      let type = "other";
      if (/css/.test(dom.type))
        type = "style";
      if (/javascript/.test(dom.type))
        type = "script";
      effectMap[type].push({
        src: dom.src,
        outerHTML: dom.outerHTML,
        content: dom.innerText
      });
    });
    return effectMap;
  }
};

// src/patchers/history.ts
var rawPushState;
var rawReplaceState;
var PatchHistory = class {
  activate() {
    if (!rawPushState || !rawReplaceState) {
      rawPushState = window.history.pushState;
      rawReplaceState = window.history.replaceState;
    }
  }
  deactivate() {
    window.history.pushState = rawPushState;
    window.history.replaceState = rawReplaceState;
  }
};

// src/patchers/interval.ts
var rawInterval = window.setInterval;
var rawClearInterval = window.clearInterval;
var PatchInterval = class {
  constructor() {
    this.intervals = [];
  }
  activate() {
    window.setInterval = (handler, timeout, ...args) => {
      const intervalId = rawInterval(handler, timeout, ...args);
      this.intervals = [...this.intervals, intervalId];
      return intervalId;
    };
    window.clearInterval = (intervalId) => {
      this.intervals = this.intervals.filter((id) => id !== intervalId);
      return rawClearInterval(intervalId);
    };
  }
  deactivate(_clearEffects) {
    if (_clearEffects) {
      this.intervals.forEach((id) => window.clearInterval(id));
    }
    window.setInterval = rawInterval;
    window.clearInterval = rawClearInterval;
  }
};

// src/patchers/variable.ts
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
var PatchGlobalVal = class {
  constructor(targetToProtect = typeof window !== "undefined" ? window : globalThis, protectVariable = []) {
    this.targetToProtect = targetToProtect;
    this.protectVariable = protectVariable;
    this.snapshotOriginal = /* @__PURE__ */ new Map();
    this.snapshotMutated = /* @__PURE__ */ new Map();
    this.whiteList = [
      "location",
      "addEventListener",
      "removeEventListener",
      "webpackJsonp"
    ];
    this.targetToProtect = targetToProtect;
    this.protectVariable = protectVariable;
    this.whiteList = [...this.whiteList, ...protectVariable];
  }
  safeIterator(fn) {
    for (const i in this.targetToProtect) {
      if (this.whiteList.indexOf(i) !== -1) {
        continue;
      }
      const prop = Object.getOwnPropertyDescriptor(this.targetToProtect, i);
      if (!prop || !prop.writable) {
        continue;
      }
      if (hasOwn(this.targetToProtect, i)) {
        fn(i);
      }
    }
  }
  activate() {
    this.safeIterator((i) => {
      this.snapshotOriginal.set(i, this.targetToProtect[i]);
    });
    this.snapshotMutated.forEach((val, mutateKey) => {
      this.targetToProtect[mutateKey] = this.snapshotMutated.get(mutateKey);
    });
  }
  deactivate() {
    const deleteMap = {};
    const updateMap = {};
    const addMap = {};
    this.safeIterator((normalKey) => {
      if (this.snapshotOriginal.get(normalKey) !== this.targetToProtect[normalKey]) {
        this.snapshotMutated.set(normalKey, this.targetToProtect[normalKey]);
        this.targetToProtect[normalKey] = this.snapshotOriginal.get(normalKey);
        if (this.targetToProtect[normalKey] === void 0) {
          addMap[normalKey] = this.snapshotMutated.get(normalKey);
        } else {
          updateMap[normalKey] = this.snapshotMutated.get(normalKey);
        }
      }
      this.snapshotOriginal.delete(normalKey);
    });
    this.snapshotOriginal.forEach((val, deleteKey) => {
      this.snapshotMutated.set(deleteKey, this.targetToProtect[deleteKey]);
      this.targetToProtect[deleteKey] = this.snapshotOriginal.get(deleteKey);
      deleteMap[deleteKey] = this.targetToProtect[deleteKey];
    });
  }
};

// src/patchers/webpackjsonp.ts
var PatchWebpackJsonp = class {
  activate() {
    this.preWebpackJsonp = window.webpackJsonp;
    window.webpackJsonp = this.currentWebpackJsonp;
  }
  deactivate() {
    this.currentWebpackJsonp = window.webpackJsonp;
    window.webpackJsonp = this.preWebpackJsonp;
  }
};

// src/sandbox.ts
var Sandbox = class {
  constructor(name, protectVariable = [], targetToProtect = typeof window !== "undefined" ? window : globalThis, isInBrowser = typeof window === "undefined" ? false : true) {
    this.name = name;
    this.protectVariable = protectVariable;
    this.targetToProtect = targetToProtect;
    this.isInBrowser = isInBrowser;
    this.type = "snapshot";
    this.isRunning = false;
    this.patchList = [];
    this.name = name;
    this.isInBrowser = isInBrowser;
    this.patchList.push(new PatchGlobalVal(targetToProtect, protectVariable));
    if (this.isInBrowser) {
      this.patchList = [
        ...this.patchList,
        new PatchStyle(),
        new PatchEvent(),
        new PatchHistory(),
        new PatchInterval(),
        new PatchWebpackJsonp()
      ];
    }
  }
  activate() {
    if (this.isRunning)
      return;
    this.patchList.forEach((patch) => {
      patch.activate();
    });
    this.isRunning = true;
  }
  deactivate(clearEffects = true) {
    if (!this.isRunning)
      return;
    [...this.patchList].reverse().forEach((patch) => {
      patch.deactivate(clearEffects);
    });
    this.isRunning = false;
  }
};

// src/index.ts
function GarfishBrowserSnapshot(op) {
  return function(Garfish) {
    const options = {
      openBrowser: false,
      version: "1.12.0",
      name: "browser-snapshot",
      afterLoad(appInfo, appInstance) {
        var _a;
        const config = op || { open: true };
        const sandboxConfig = appInfo.sandbox || ((_a = Garfish == null ? void 0 : Garfish.options) == null ? void 0 : _a.sandbox);
        if (sandboxConfig === false || sandboxConfig.open === false || (sandboxConfig == null ? void 0 : sandboxConfig.snapshot) === false) {
          config.open = false;
        }
        if (sandboxConfig) {
          config.protectVariable = [
            ...(Garfish == null ? void 0 : Garfish.options.protectVariable) || [],
            ...appInfo.protectVariable || []
          ];
        }
        options.openBrowser = !!config.open;
        if (!config.open)
          return;
        if (appInstance) {
          if (appInstance.snapshotSandbox)
            return;
          const sandbox = new Sandbox(appInfo.name, config.protectVariable);
          appInstance.snapshotSandbox = sandbox;
        }
      },
      beforeMount(appInfo, appInstance) {
        if (!appInstance.snapshotSandbox)
          return;
        appInstance.snapshotSandbox.activate();
      },
      afterUnmount(appInfo, appInstance) {
        if (!appInstance.snapshotSandbox)
          return;
        appInstance.snapshotSandbox.deactivate();
      }
    };
    return options;
  };
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GarfishBrowserSnapshot
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9wYXRjaGVycy9ldmVudC50cyIsICIuLi9zcmMvcGF0Y2hlcnMvaW50ZXJjZXB0b3IudHMiLCAiLi4vc3JjL3BhdGNoZXJzL3N0eWxlLnRzIiwgIi4uL3NyYy9wYXRjaGVycy9oaXN0b3J5LnRzIiwgIi4uL3NyYy9wYXRjaGVycy9pbnRlcnZhbC50cyIsICIuLi9zcmMvcGF0Y2hlcnMvdmFyaWFibGUudHMiLCAiLi4vc3JjL3BhdGNoZXJzL3dlYnBhY2tqc29ucC50cyIsICIuLi9zcmMvc2FuZGJveC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4vc2FuZGJveCc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgJy4vZ2xvYmFsRXh0ZW5zaW9ucyc7XG5cbmV4cG9ydCB7IFNhbmRib3ggYXMgZGVmYXVsdCB9IGZyb20gJy4vc2FuZGJveCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2FuZGJveENvbmZpZyB7XG4gIHNuYXBzaG90PzogYm9vbGVhbjtcbiAgZGlzYWJsZVdpdGg/OiBib29sZWFuO1xuICBzdHJpY3RJc29sYXRpb24/OiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgQnJvd3NlckNvbmZpZyB7XG4gIG9wZW4/OiBib29sZWFuO1xuICBwcm90ZWN0VmFyaWFibGU/OiBQcm9wZXJ0eUtleVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2FyZmlzaEJyb3dzZXJTbmFwc2hvdChvcD86IEJyb3dzZXJDb25maWcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG9wZW5Ccm93c2VyOiBmYWxzZSxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuICAgICAgbmFtZTogJ2Jyb3dzZXItc25hcHNob3QnLFxuXG4gICAgICBhZnRlckxvYWQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgY29uZmlnOiBCcm93c2VyQ29uZmlnID0gb3AgfHwgeyBvcGVuOiB0cnVlIH07XG4gICAgICAgIGNvbnN0IHNhbmRib3hDb25maWcgPSBhcHBJbmZvLnNhbmRib3ggfHwgR2FyZmlzaD8ub3B0aW9ucz8uc2FuZGJveDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNhbmRib3hDb25maWcgPT09IGZhbHNlIHx8XG4gICAgICAgICAgc2FuZGJveENvbmZpZy5vcGVuID09PSBmYWxzZSB8fFxuICAgICAgICAgIHNhbmRib3hDb25maWc/LnNuYXBzaG90ID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25maWcub3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW5kYm94Q29uZmlnKSB7XG4gICAgICAgICAgY29uZmlnLnByb3RlY3RWYXJpYWJsZSA9IFtcbiAgICAgICAgICAgIC4uLihHYXJmaXNoPy5vcHRpb25zLnByb3RlY3RWYXJpYWJsZSB8fCBbXSksXG4gICAgICAgICAgICAuLi4oYXBwSW5mby5wcm90ZWN0VmFyaWFibGUgfHwgW10pLFxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5vcGVuQnJvd3NlciA9ICEhY29uZmlnLm9wZW47XG4gICAgICAgIGlmICghY29uZmlnLm9wZW4pIHJldHVybjtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgLy8gZXhpc3RpbmdcbiAgICAgICAgICBpZiAoYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94KSByZXR1cm47XG4gICAgICAgICAgY29uc3Qgc2FuZGJveCA9IG5ldyBTYW5kYm94KGFwcEluZm8ubmFtZSwgY29uZmlnLnByb3RlY3RWYXJpYWJsZSk7XG4gICAgICAgICAgYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94ID0gc2FuZGJveDtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlTW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgLy8gZXhpc3RpbmdcbiAgICAgICAgaWYgKCFhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3gpIHJldHVybjtcbiAgICAgICAgYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94LmFjdGl2YXRlKCk7XG4gICAgICB9LFxuXG4gICAgICBhZnRlclVubW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKCFhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3gpIHJldHVybjtcbiAgICAgICAgYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94LmRlYWN0aXZhdGUoKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcbn1cbiIsICJsZXQgcmF3QWRkRXZlbnRMaXN0ZW5lcjogYW55O1xubGV0IHJhd1JlbW92ZUV2ZW50TGlzdGVuZXI6IGFueTtcblxuZXhwb3J0IGNsYXNzIFBhdGNoRXZlbnQge1xuICBwcml2YXRlIGxpc3RlbmVyTWFwID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RbXT4oKTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICAvLyByZXN0b3JlIHByZSBldmVudFxuICAgIHRoaXMubGlzdGVuZXJNYXAuZm9yRWFjaCgobGlzdGVuZXJzLCB0eXBlKSA9PlxuICAgICAgWy4uLmxpc3RlbmVyc10uZm9yRWFjaCgobGlzdGVuZXIpID0+XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGlmICghcmF3QWRkRXZlbnRMaXN0ZW5lciB8fCAhcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgcmF3QWRkRXZlbnRMaXN0ZW5lciA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuICAgICAgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID0gKFxuICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsXG4gICAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zLFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lck1hcC5nZXQodHlwZSkgfHwgW107XG4gICAgICB0aGlzLmxpc3RlbmVyTWFwLnNldCh0eXBlLCBbLi4ubGlzdGVuZXJzLCBsaXN0ZW5lcl0pO1xuICAgICAgcmV0dXJuIHJhd0FkZEV2ZW50TGlzdGVuZXIuY2FsbCh3aW5kb3csIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9O1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID0gKFxuICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsXG4gICAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zLFxuICAgICkgPT4ge1xuICAgICAgY29uc3Qgc3RvcmVkVHlwZUxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJNYXAuZ2V0KHR5cGUpO1xuICAgICAgaWYgKFxuICAgICAgICBzdG9yZWRUeXBlTGlzdGVuZXJzICYmXG4gICAgICAgIHN0b3JlZFR5cGVMaXN0ZW5lcnMubGVuZ3RoICYmXG4gICAgICAgIHN0b3JlZFR5cGVMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgc3RvcmVkVHlwZUxpc3RlbmVycy5zcGxpY2Uoc3RvcmVkVHlwZUxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSwgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHdpbmRvdywgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmxpc3RlbmVyTWFwLmZvckVhY2goKGxpc3RlbmVycywgdHlwZSkgPT5cbiAgICAgIFsuLi5saXN0ZW5lcnNdLmZvckVhY2goKGxpc3RlbmVyKSA9PlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciksXG4gICAgICApLFxuICAgICk7XG5cbiAgICAvLyBldmVudFx1RkYwQ1x1NTcyOHdpbmRvd1x1NTM5Rlx1NTc4Qlx1OTRGRVx1NEUwQVx1RkYwQ1x1NUMwNndpbmRvd1x1NEUwQVx1ODk4Nlx1NzZENlx1NzY4NFx1NEVFM1x1NzQwNlx1NEU4Qlx1NEVGNlx1NTIyMFx1OTY2NFx1NTM3M1x1NTNFRlxuICAgIC8vIGRlbGV0ZSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICAvLyBkZWxldGUgd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByYXdSZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID0gcmF3QWRkRXZlbnRMaXN0ZW5lcjtcbiAgfVxufVxuIiwgImV4cG9ydCB0eXBlIFNuYXBzaG90RGlmZiA9IHtcbiAgY3JlYXRlZDogU25hcHNob3Q7XG4gIHJlbW92ZWQ6IFNuYXBzaG90O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3R5bGVkQ29tcG9uZW50c0xpa2UoZWxlbWVudDogSFRNTFN0eWxlRWxlbWVudCkge1xuICAvLyBBIHN0eWxlZC1jb21wb25lbnRzIGxpa2VkIGVsZW1lbnQgaGFzIG5vIHRleHRDb250ZW50IGJ1dCBrZWVwIHRoZSBydWxlcyBpbiBpdHMgc2hlZXQuY3NzUnVsZXMuXG4gIHJldHVybiAoXG4gICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTdHlsZUVsZW1lbnQgJiZcbiAgICAhZWxlbWVudC50ZXh0Q29udGVudCAmJlxuICAgIGVsZW1lbnQuc2hlZXQ/LmNzc1J1bGVzLmxlbmd0aFxuICApO1xufVxuXG5leHBvcnQgY2xhc3MgU25hcHNob3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXJyRG9tczogQXJyYXk8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5hcnJEb21zID0gYXJyRG9tcztcbiAgfVxuXG4gIHN0YXRpYyB0YWtlKHRhcmdldDogSFRNTEVsZW1lbnQpOiBTbmFwc2hvdDtcbiAgc3RhdGljIHRha2U8VCBleHRlbmRzIEVsZW1lbnQgPSBFbGVtZW50PihcbiAgICBub2RlTGlzdDogSFRNTENvbGxlY3Rpb25PZjxUPixcbiAgKTogU25hcHNob3Q7XG4gIHN0YXRpYyB0YWtlKG5vZGVMaXN0PzogTm9kZUxpc3QpOiBTbmFwc2hvdDtcbiAgc3RhdGljIHRha2UodGFyZ2V0OiBIVE1MRWxlbWVudCB8IEhUTUxDb2xsZWN0aW9uIHwgTm9kZUxpc3QgPSBkb2N1bWVudC5oZWFkKSB7XG4gICAgbGV0IGxpc3Q6IEFycmF5PEhUTUxFbGVtZW50PjtcbiAgICBpZiAoKHRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2hpbGROb2Rlcykge1xuICAgICAgbGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCh0YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNoaWxkTm9kZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGFyZ2V0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTbmFwc2hvdChsaXN0KTtcbiAgfVxuXG4gIGRpZmYoczogU25hcHNob3QpOiBTbmFwc2hvdERpZmYge1xuICAgIGlmICghcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlZDogbmV3IFNuYXBzaG90KFtdKSxcbiAgICAgICAgcmVtb3ZlZDogbmV3IFNuYXBzaG90KFtdKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNyZWF0ZWQ6IG5ldyBTbmFwc2hvdChcbiAgICAgICAgdGhpcy5hcnJEb21zLmZpbHRlcigoZCkgPT4gcy5hcnJEb21zLmluZGV4T2YoZCkgPT09IC0xKSxcbiAgICAgICksXG4gICAgICByZW1vdmVkOiBuZXcgU25hcHNob3QoXG4gICAgICAgIHMuYXJyRG9tcy5maWx0ZXIoKGQpID0+IHRoaXMuYXJyRG9tcy5pbmRleE9mKGQpID09PSAtMSksXG4gICAgICApLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yIHtcbiAgZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0OiBTZXQ8SFRNTFN0eWxlRWxlbWVudD47XG4gIHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwOiBXZWFrTWFwPEhUTUxTdHlsZUVsZW1lbnQsIENTU1J1bGVMaXN0PjtcbiAgY29uc3RydWN0b3IocHVibGljIGRvbTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5oZWFkKSB7XG4gICAgdGhpcy5kb20gPSBkb207XG4gICAgdGhpcy5keW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQgPSBuZXcgU2V0PEhUTUxTdHlsZUVsZW1lbnQ+KCk7XG4gICAgdGhpcy5zdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcCA9IG5ldyBXZWFrTWFwPFxuICAgICAgSFRNTFN0eWxlRWxlbWVudCxcbiAgICAgIENTU1J1bGVMaXN0XG4gICAgPigpO1xuICB9XG5cbiAgYWRkKGZyb206IFNuYXBzaG90KTogdm9pZDtcbiAgYWRkKGNyZWF0ZWQ6IFNuYXBzaG90LCByZW1vdmVkOiBTbmFwc2hvdCk6IHZvaWQ7XG4gIGFkZChjcmVhdGVkT3JTbmFwc2hvdDogU25hcHNob3QsIHJlbW92ZWQ/OiBTbmFwc2hvdCkge1xuICAgIGxldCBjcmVhdGVkOiBTbmFwc2hvdDtcbiAgICBpZiAoIXJlbW92ZWQpIHtcbiAgICAgIGNvbnN0IGRpZmYgPSBTbmFwc2hvdC50YWtlKHRoaXMuZG9tKS5kaWZmKGNyZWF0ZWRPclNuYXBzaG90KTtcbiAgICAgIGNyZWF0ZWQgPSBkaWZmLmNyZWF0ZWQ7XG4gICAgICByZW1vdmVkID0gZGlmZi5yZW1vdmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVkID0gY3JlYXRlZE9yU25hcHNob3Q7XG4gICAgfVxuICAgIGNyZWF0ZWQuYXJyRG9tcy5yZWR1Y2UoKHByZXYsIHZhbCkgPT4ge1xuICAgICAgcHJldi5hcHBlbmRDaGlsZCh2YWwpO1xuICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEhUTUxTdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY3NzUnVsZXMgPSB0aGlzLnN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwLmdldCh2YWwpO1xuICAgICAgICBpZiAoY3NzUnVsZXMgJiYgY3NzUnVsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3NSdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3NzUnVsZSA9IGNzc1J1bGVzW2ldO1xuICAgICAgICAgICAgLy8gcmUtaW5zZXJ0IHJ1bGVzIGZvciBzdHlsZWQtY29tcG9uZW50cyBlbGVtZW50XG4gICAgICAgICAgICB2YWwuc2hlZXQ/Lmluc2VydFJ1bGUoY3NzUnVsZS5jc3NUZXh0LCB2YWwuc2hlZXQ/LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aGlzLmRvbSk7XG4gICAgcmVtb3ZlZC5hcnJEb21zLnJlZHVjZSgocHJldiwgdmFsKSA9PiB7XG4gICAgICBwcmV2LnJlbW92ZUNoaWxkKHZhbCk7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aGlzLmRvbSk7XG4gIH1cblxuICByZW1vdmUodG86IFNuYXBzaG90KTogdm9pZDtcbiAgcmVtb3ZlKGNyZWF0ZWQ6IFNuYXBzaG90LCByZW1vdmVkOiBTbmFwc2hvdCk6IHZvaWQ7XG4gIHJlbW92ZShjcmVhdGVkT3JTbmFwc2hvdDogU25hcHNob3QsIHJlbW92ZWQ/OiBTbmFwc2hvdCkge1xuICAgIGxldCBjcmVhdGVkOiBTbmFwc2hvdDtcbiAgICBpZiAoIXJlbW92ZWQpIHtcbiAgICAgIGNvbnN0IGRpZmYgPSBTbmFwc2hvdC50YWtlKHRoaXMuZG9tKS5kaWZmKGNyZWF0ZWRPclNuYXBzaG90KTtcbiAgICAgIGNyZWF0ZWQgPSBkaWZmLmNyZWF0ZWQ7XG4gICAgICByZW1vdmVkID0gZGlmZi5yZW1vdmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVkID0gY3JlYXRlZE9yU25hcHNob3Q7XG4gICAgfVxuICAgIGNyZWF0ZWQuYXJyRG9tcy5yZWR1Y2UoKHByZXYsIHZhbCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB2YWwgaW5zdGFuY2VvZiBIVE1MU3R5bGVFbGVtZW50ICYmXG4gICAgICAgIGlzU3R5bGVkQ29tcG9uZW50c0xpa2UodmFsKSAmJlxuICAgICAgICB2YWw/LnNoZWV0Py5jc3NSdWxlc1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXAuc2V0KHZhbCwgdmFsLnNoZWV0LmNzc1J1bGVzKTtcbiAgICAgIH1cbiAgICAgIHByZXYucmVtb3ZlQ2hpbGQodmFsKTtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRoaXMuZG9tKTtcbiAgICByZW1vdmVkLmFyckRvbXMucmVkdWNlKChwcmV2LCB2YWwpID0+IHtcbiAgICAgIHByZXYuYXBwZW5kQ2hpbGQodmFsKTtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRoaXMuZG9tKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEludGVyY2VwdG9yLCBTbmFwc2hvdCwgU25hcHNob3REaWZmIH0gZnJvbSAnLi9pbnRlcmNlcHRvcic7XG5cbmludGVyZmFjZSBFZmZlY3RDdCB7XG4gIHNyYzogc3RyaW5nO1xuICBvdXRlckhUTUw6IHN0cmluZztcbiAgY29udGVudDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRWZmZWN0TWFwIHtcbiAgc3R5bGU6IEFycmF5PEVmZmVjdEN0PjtcbiAgc2NyaXB0OiBBcnJheTxFZmZlY3RDdD47XG4gIG90aGVyOiBBcnJheTxFZmZlY3RDdD47XG59XG5cbmV4cG9ydCBjbGFzcyBQYXRjaFN0eWxlIHtcbiAgcHVibGljIGhlYWRJbnRlcmNlcHRvcjogSW50ZXJjZXB0b3I7XG4gIHByaXZhdGUgZG9tU25hcHNob3RCZWZvcmUhOiBTbmFwc2hvdDtcbiAgcHJpdmF0ZSBkb21TbmFwc2hvdE11dGF0ZWQhOiBTbmFwc2hvdERpZmYgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGVhZEludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yKGRvY3VtZW50LmhlYWQpO1xuICB9XG5cbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIC8vIFx1OEJCMFx1NUY1NVx1NUY1M1x1NTI0RGRvbVx1ODI4Mlx1NzBCOVx1MzAwMVx1NjA2Mlx1NTkwRFx1NEU0Qlx1NTI0RGRvbVx1ODI4Mlx1NzBCOVx1NTI2Rlx1NEY1Q1x1NzUyOFxuICAgIHRoaXMuZG9tU25hcHNob3RCZWZvcmUgPSBTbmFwc2hvdC50YWtlKCk7XG4gICAgaWYgKHRoaXMuZG9tU25hcHNob3RNdXRhdGVkKVxuICAgICAgdGhpcy5oZWFkSW50ZXJjZXB0b3IuYWRkKFxuICAgICAgICB0aGlzLmRvbVNuYXBzaG90TXV0YXRlZC5jcmVhdGVkLFxuICAgICAgICB0aGlzLmRvbVNuYXBzaG90TXV0YXRlZC5yZW1vdmVkLFxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWFjdGl2YXRlKCkge1xuICAgIC8vIFx1NjA2Mlx1NTkwRFx1NkM5OVx1NzZEMlx1OEZEMFx1ODg0Q1x1NTI0RGRvbVx1ODI4Mlx1NzBCOVx1NzNBRlx1NTg4M1x1RkYwQ1x1NUU3Nlx1NUMwNlx1NURFRVx1NUYwMlx1NTAzQ1x1OEZEQlx1ODg0Q1x1N0YxM1x1NUI1OFxuICAgIGNvbnN0IGRvbVNuYXBzaG90ID0gU25hcHNob3QudGFrZSgpO1xuICAgIHRoaXMuZG9tU25hcHNob3RNdXRhdGVkID0gZG9tU25hcHNob3QuZGlmZih0aGlzLmRvbVNuYXBzaG90QmVmb3JlKTtcbiAgICBpZiAoIXRoaXMuZG9tU25hcHNob3RNdXRhdGVkKSByZXR1cm47XG4gICAgdGhpcy5oZWFkSW50ZXJjZXB0b3IucmVtb3ZlKFxuICAgICAgdGhpcy5kb21TbmFwc2hvdE11dGF0ZWQuY3JlYXRlZCxcbiAgICAgIHRoaXMuZG9tU25hcHNob3RNdXRhdGVkLnJlbW92ZWQsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0ZUN0eChhcnJEb21zOiBBcnJheTxIVE1MRWxlbWVudD4pIHtcbiAgICBjb25zdCBlZmZlY3RNYXA6IEVmZmVjdE1hcCA9IHtcbiAgICAgIHN0eWxlOiBbXSxcbiAgICAgIHNjcmlwdDogW10sXG4gICAgICBvdGhlcjogW10sXG4gICAgfTtcblxuICAgIGFyckRvbXMuZm9yRWFjaCgoZG9tKSA9PiB7XG4gICAgICBsZXQgdHlwZTogJ290aGVyJyB8ICdzdHlsZScgfCAnc2NyaXB0JyA9ICdvdGhlcic7XG4gICAgICBpZiAoL2Nzcy8udGVzdCgoZG9tIGFzIGFueSkudHlwZSkpIHR5cGUgPSAnc3R5bGUnO1xuICAgICAgaWYgKC9qYXZhc2NyaXB0Ly50ZXN0KChkb20gYXMgYW55KS50eXBlKSkgdHlwZSA9ICdzY3JpcHQnO1xuICAgICAgZWZmZWN0TWFwW3R5cGVdLnB1c2goe1xuICAgICAgICBzcmM6IChkb20gYXMgYW55KS5zcmMsXG4gICAgICAgIG91dGVySFRNTDogZG9tLm91dGVySFRNTCxcbiAgICAgICAgY29udGVudDogZG9tLmlubmVyVGV4dCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVmZmVjdE1hcDtcbiAgfVxufVxuIiwgImxldCByYXdQdXNoU3RhdGU6IGFueTtcbmxldCByYXdSZXBsYWNlU3RhdGU6IGFueTtcblxuZXhwb3J0IGNsYXNzIFBhdGNoSGlzdG9yeSB7XG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICBpZiAoIXJhd1B1c2hTdGF0ZSB8fCAhcmF3UmVwbGFjZVN0YXRlKSB7XG4gICAgICByYXdQdXNoU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGU7XG4gICAgICByYXdSZXBsYWNlU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUoKSB7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gcmF3UHVzaFN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9IHJhd1JlcGxhY2VTdGF0ZTtcbiAgfVxufVxuIiwgImNvbnN0IHJhd0ludGVydmFsID0gd2luZG93LnNldEludGVydmFsO1xuY29uc3QgcmF3Q2xlYXJJbnRlcnZhbCA9IHdpbmRvdy5jbGVhckludGVydmFsO1xuXG5leHBvcnQgY2xhc3MgUGF0Y2hJbnRlcnZhbCB7XG4gIHByaXZhdGUgaW50ZXJ2YWxzOiBBcnJheTxudW1iZXI+ID0gW107XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5zZXRJbnRlcnZhbCA9IChcbiAgICAgIGhhbmRsZXI6IEZ1bmN0aW9uLFxuICAgICAgdGltZW91dD86IG51bWJlcixcbiAgICAgIC4uLmFyZ3M6IGFueVtdXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBpbnRlcnZhbElkID0gcmF3SW50ZXJ2YWwoaGFuZGxlciwgdGltZW91dCwgLi4uYXJncyk7XG4gICAgICB0aGlzLmludGVydmFscyA9IFsuLi50aGlzLmludGVydmFscywgaW50ZXJ2YWxJZF07XG4gICAgICByZXR1cm4gaW50ZXJ2YWxJZDtcbiAgICB9O1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5jbGVhckludGVydmFsID0gKGludGVydmFsSWQ6IG51bWJlcikgPT4ge1xuICAgICAgdGhpcy5pbnRlcnZhbHMgPSB0aGlzLmludGVydmFscy5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gaW50ZXJ2YWxJZCk7XG4gICAgICByZXR1cm4gcmF3Q2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUoX2NsZWFyRWZmZWN0cz86IGJvb2xlYW4pIHtcbiAgICBpZiAoX2NsZWFyRWZmZWN0cykge1xuICAgICAgdGhpcy5pbnRlcnZhbHMuZm9yRWFjaCgoaWQpID0+IHdpbmRvdy5jbGVhckludGVydmFsKGlkKSk7XG4gICAgfVxuICAgIHdpbmRvdy5zZXRJbnRlcnZhbCA9IHJhd0ludGVydmFsO1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsID0gcmF3Q2xlYXJJbnRlcnZhbDtcbiAgfVxufVxuIiwgImNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGhhc093bihvYmo6IGFueSwga2V5OiBQcm9wZXJ0eUtleSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXRjaEdsb2JhbFZhbCB7XG4gIHB1YmxpYyBzbmFwc2hvdE9yaWdpbmFsID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIHNuYXBzaG90TXV0YXRlZDogYW55ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIHdoaXRlTGlzdDogQXJyYXk8UHJvcGVydHlLZXk+ID0gW1xuICAgICdsb2NhdGlvbicsXG4gICAgJ2FkZEV2ZW50TGlzdGVuZXInLFxuICAgICdyZW1vdmVFdmVudExpc3RlbmVyJyxcbiAgICAnd2VicGFja0pzb25wJyxcbiAgXTtcbiAgLy8gLCdhZGRFdmVudExpc3RlbmVyJywncmVtb3ZlRXZlbnRMaXN0ZW5lcicsJ2NsZWFySW50ZXJ2YWwnLCdzZXRJbnRlcnZhbCcsJ3dlYmtpdFN0b3JhZ2VJbmZvJ1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdGFyZ2V0VG9Qcm90ZWN0OiBhbnkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyB3aW5kb3dcbiAgICAgIDogZ2xvYmFsVGhpcyxcbiAgICBwdWJsaWMgcHJvdGVjdFZhcmlhYmxlOiBBcnJheTxQcm9wZXJ0eUtleT4gPSBbXSxcbiAgKSB7XG4gICAgdGhpcy50YXJnZXRUb1Byb3RlY3QgPSB0YXJnZXRUb1Byb3RlY3Q7XG4gICAgdGhpcy5wcm90ZWN0VmFyaWFibGUgPSBwcm90ZWN0VmFyaWFibGU7XG4gICAgLy8gdGhpcy53aGl0ZUxpc3QgPSBbLi4udGhpcy53aGl0ZUxpc3QsIC4uLkdhckNvbmZpZy5wcm90ZWN0VmFyaWFibGUhXTtcbiAgICB0aGlzLndoaXRlTGlzdCA9IFsuLi50aGlzLndoaXRlTGlzdCwgLi4ucHJvdGVjdFZhcmlhYmxlXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzYWZlSXRlcmF0b3IoZm46IEZ1bmN0aW9uKSB7XG4gICAgLy8gU2tpcCB0aGUgdmFyaWFibGVzIG5vdCB0cmF2ZXJzZVxuICAgIC8vIERvIG5vdCBpbmNsdWRlIGEgc3ltYm9sXG4gICAgZm9yIChjb25zdCBpIGluIHRoaXMudGFyZ2V0VG9Qcm90ZWN0KSB7XG4gICAgICBpZiAodGhpcy53aGl0ZUxpc3QuaW5kZXhPZihpKSAhPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLnRhcmdldFRvUHJvdGVjdCwgaSk7XG4gICAgICBpZiAoIXByb3AgfHwgIXByb3Aud3JpdGFibGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoaGFzT3duKHRoaXMudGFyZ2V0VG9Qcm90ZWN0LCBpKSkge1xuICAgICAgICBmbihpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAxLlRyaWdnZXIgaG9va3MsIGxpZmUgY3ljbGUgd2lsbEFjdGl2YXRlIGVuYWJsZWQgKGdvaW5nIHRvKVxuICAvLyAyLldpbGwgZGlzYWJsZSB0aGUgY3VycmVudCBncm91cCBvZiBvdGhlciBib3gsIGFuZCB0cmlnZ2VycyB0aGUgc3dpdGNoIGxpZmUgY3ljbGVcbiAgLy8gMy5UaGUgY3VycmVudCB3aW5kb3cgb2JqZWN0IHByb3BlcnRpZXMgZm9yIGNhY2hpbmdcbiAgLy8gNC5SZXN0b3JlIHRoZSBzYW5kYm94IHNpZGUgZWZmZWN0cyBkdXJpbmcgb3BlcmF0aW9uXG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICAvLyBSZWNvcmRlZCBiZWZvcmUgdGhlIGdsb2JhbCBlbnZpcm9ubWVudCwgcmVzdG9yZSBzaWRlIGVmZmVjdHMgb2YgYSB2YXJpYWJsZVxuICAgIHRoaXMuc2FmZUl0ZXJhdG9yKChpOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuc25hcHNob3RPcmlnaW5hbC5zZXQoaSwgdGhpcy50YXJnZXRUb1Byb3RlY3RbaV0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbmFwc2hvdE11dGF0ZWQuZm9yRWFjaCgodmFsLCBtdXRhdGVLZXkpID0+IHtcbiAgICAgIHRoaXMudGFyZ2V0VG9Qcm90ZWN0W211dGF0ZUtleV0gPSB0aGlzLnNuYXBzaG90TXV0YXRlZC5nZXQobXV0YXRlS2V5KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDEuUmVzdG9yZSB0aGUgc2FuZGJveCBkdXJpbmcgc3RhcnR1cCB2YXJpYWJsZXMgY2hhbmdlLCByZWNvcmQgdGhlIGNoYW5nZSByZWNvcmRcbiAgLy8gMi5SZXN0b3JlIHRoZSBzYW5kYm94IGR1cmluZyBzdGFydHVwIHRvIGRlbGV0ZSB2YXJpYWJsZXMsIHJlY29yZCB0aGUgY2hhbmdlIHJlY29yZFxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpIHtcbiAgICBjb25zdCBkZWxldGVNYXA6IGFueSA9IHt9O1xuICAgIGNvbnN0IHVwZGF0ZU1hcDogYW55ID0ge307XG4gICAgY29uc3QgYWRkTWFwOiBhbnkgPSB7fTtcblxuICAgIC8vIFJlc3RvcmUgdGhlIHNhbmRib3ggYmVmb3JlIHJ1bm5pbmcgV2luZG93cyBwcm9wZXJ0aWVzIG9mIGVudmlyb25tZW50LCBhbmQgZGlmZmVyZW5jZSB2YWx1ZSBmb3IgY2FjaGluZ1xuICAgIHRoaXMuc2FmZUl0ZXJhdG9yKChub3JtYWxLZXk6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnNuYXBzaG90T3JpZ2luYWwuZ2V0KG5vcm1hbEtleSkgIT09XG4gICAgICAgICh0aGlzLnRhcmdldFRvUHJvdGVjdFtub3JtYWxLZXldIGFzIGFueSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNuYXBzaG90TXV0YXRlZC5zZXQobm9ybWFsS2V5LCB0aGlzLnRhcmdldFRvUHJvdGVjdFtub3JtYWxLZXldKTsgLy8gZGVsZXRlZCBrZXkgd2lsbCBiZSBkZWZpbmVkIGFzIHVuZGVmaW5lZCBvblxuICAgICAgICB0aGlzLnRhcmdldFRvUHJvdGVjdFtub3JtYWxLZXldID0gdGhpcy5zbmFwc2hvdE9yaWdpbmFsLmdldChub3JtYWxLZXkpOyAvLyB8fCB0aGlzLnRhcmdldFRvUHJvdGVjdFtpXVxuXG4gICAgICAgIC8vIENvbGxlY3Rpb24gb2YgZGVsZXRlLCBtb2RpZnkgdmFyaWFibGVzXG4gICAgICAgIGlmICh0aGlzLnRhcmdldFRvUHJvdGVjdFtub3JtYWxLZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhZGRNYXBbbm9ybWFsS2V5XSA9IHRoaXMuc25hcHNob3RNdXRhdGVkLmdldChub3JtYWxLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZU1hcFtub3JtYWxLZXldID0gdGhpcy5zbmFwc2hvdE11dGF0ZWQuZ2V0KG5vcm1hbEtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc25hcHNob3RPcmlnaW5hbC5kZWxldGUobm9ybWFsS2V5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc25hcHNob3RPcmlnaW5hbC5mb3JFYWNoKCh2YWwsIGRlbGV0ZUtleSkgPT4ge1xuICAgICAgdGhpcy5zbmFwc2hvdE11dGF0ZWQuc2V0KGRlbGV0ZUtleSwgdGhpcy50YXJnZXRUb1Byb3RlY3RbZGVsZXRlS2V5XSk7XG4gICAgICB0aGlzLnRhcmdldFRvUHJvdGVjdFtkZWxldGVLZXldID0gdGhpcy5zbmFwc2hvdE9yaWdpbmFsLmdldChkZWxldGVLZXkpO1xuICAgICAgZGVsZXRlTWFwW2RlbGV0ZUtleV0gPSB0aGlzLnRhcmdldFRvUHJvdGVjdFtkZWxldGVLZXldO1xuICAgIH0pO1xuXG4gICAgLy8gRm9yIGRldmVsb3BlcnMsIGxldCB0aGVtIGtub3cgY2xlYXIgd2hhdCBzaWRlIGVmZmVjdHMgb2YgYSB2YXJpYWJsZVxuICAgIC8vIGNoYW5uZWwuZW1pdCgnc2FuZGJveC12YXJpYWJsZScsIHtcbiAgICAvLyAgIHVwZGF0ZTogdXBkYXRlTWFwLFxuICAgIC8vICAgcmVtb3ZlZDogZGVsZXRlTWFwLFxuICAgIC8vICAgYWRkOiBhZGRNYXAsXG4gICAgLy8gfSk7XG4gIH1cbn1cbiIsICJkZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHdlYnBhY2tKc29ucD86IGFueVtdO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXRjaFdlYnBhY2tKc29ucCB7XG4gIHByZVdlYnBhY2tKc29ucD86IGFueVtdO1xuXG4gIGN1cnJlbnRXZWJwYWNrSnNvbnA/OiBhbnlbXTtcblxuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5wcmVXZWJwYWNrSnNvbnAgPSB3aW5kb3cud2VicGFja0pzb25wO1xuICAgIHdpbmRvdy53ZWJwYWNrSnNvbnAgPSB0aGlzLmN1cnJlbnRXZWJwYWNrSnNvbnA7XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmN1cnJlbnRXZWJwYWNrSnNvbnAgPSB3aW5kb3cud2VicGFja0pzb25wO1xuICAgIHdpbmRvdy53ZWJwYWNrSnNvbnAgPSB0aGlzLnByZVdlYnBhY2tKc29ucDtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhdGNoRXZlbnQgfSBmcm9tICcuL3BhdGNoZXJzL2V2ZW50JztcbmltcG9ydCB7IFBhdGNoU3R5bGUgfSBmcm9tICcuL3BhdGNoZXJzL3N0eWxlJztcbmltcG9ydCB7IFBhdGNoSGlzdG9yeSB9IGZyb20gJy4vcGF0Y2hlcnMvaGlzdG9yeSc7XG5pbXBvcnQgeyBQYXRjaEludGVydmFsIH0gZnJvbSAnLi9wYXRjaGVycy9pbnRlcnZhbCc7XG5pbXBvcnQgeyBQYXRjaEdsb2JhbFZhbCB9IGZyb20gJy4vcGF0Y2hlcnMvdmFyaWFibGUnO1xuaW1wb3J0IHsgUGF0Y2hXZWJwYWNrSnNvbnAgfSBmcm9tICcuL3BhdGNoZXJzL3dlYnBhY2tqc29ucCc7XG5cbmV4cG9ydCBjbGFzcyBTYW5kYm94IHtcbiAgcHVibGljIHR5cGUgPSAnc25hcHNob3QnO1xuICBwdWJsaWMgaXNSdW5uaW5nOiBCb29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcGF0Y2hMaXN0OiBBcnJheTxcbiAgICBQYXRjaEdsb2JhbFZhbCB8IFBhdGNoU3R5bGUgfCBQYXRjaEludGVydmFsIHwgUGF0Y2hFdmVudCB8IFBhdGNoV2VicGFja0pzb25wXG4gID4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBwcm90ZWN0VmFyaWFibGU6IEFycmF5PFByb3BlcnR5S2V5PiA9IFtdLFxuICAgIHB1YmxpYyB0YXJnZXRUb1Byb3RlY3Q6IFdpbmRvdyB8IE9iamVjdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IHdpbmRvd1xuICAgICAgOiBnbG9iYWxUaGlzLFxuICAgIHByaXZhdGUgaXNJbkJyb3dzZXI6IEJvb2xlYW4gPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogdHJ1ZSxcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlzSW5Ccm93c2VyID0gaXNJbkJyb3dzZXI7XG4gICAgdGhpcy5wYXRjaExpc3QucHVzaChuZXcgUGF0Y2hHbG9iYWxWYWwodGFyZ2V0VG9Qcm90ZWN0LCBwcm90ZWN0VmFyaWFibGUpKTtcblxuICAgIC8vIFx1NjI2N1x1ODg0Q1x1OTg3QVx1NUU4Rlx1NjYyRlx1RkYwQ1x1NTE2OFx1NUM0MFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NTE0OFx1NkZDMFx1NkQzQlx1RkYwQ1x1NTE2OFx1NUM0MFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NTQwRVx1OTUwMFx1NkJDMVxuICAgIGlmICh0aGlzLmlzSW5Ccm93c2VyKSB7XG4gICAgICB0aGlzLnBhdGNoTGlzdCA9IFtcbiAgICAgICAgLi4udGhpcy5wYXRjaExpc3QsXG4gICAgICAgIG5ldyBQYXRjaFN0eWxlKCksXG4gICAgICAgIG5ldyBQYXRjaEV2ZW50KCksXG4gICAgICAgIG5ldyBQYXRjaEhpc3RvcnkoKSxcbiAgICAgICAgbmV3IFBhdGNoSW50ZXJ2YWwoKSxcbiAgICAgICAgbmV3IFBhdGNoV2VicGFja0pzb25wKCksXG4gICAgICBdO1xuICAgIH1cbiAgfVxuXG4gIC8vICAxLlx1ODlFNlx1NTNEMVx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlx1OTRBOVx1NUI1MFx1RkYwQ3dpbGxBY3RpdmF0ZVx1RkYwOFx1NUMwNlx1ODk4MVx1NkZDMFx1NkQzQlx1RkYwOVxuICAvLyAgMi5cdTVDMDZcdTVGNTNcdTUyNERcdTdFQzRcdTc2ODRcdTUxNzZcdTRFRDZcdTZDOTlcdTc2RDJkaXNhYmxlXHVGRjBDXHU1RTc2XHU4OUU2XHU1M0Qxc3dpdGNoXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXG4gIC8vICAzLlx1NUMwNlx1NUY1M1x1NTI0RHdpbmRvd1x1NUJGOVx1OEM2MVx1NUM1RVx1NjAyN1x1OEZEQlx1ODg0Q1x1N0YxM1x1NUI1OFxuICAvLyAgNC5cdTgzQjdcdTUzRDZzdHlsZVx1ODI4Mlx1NzBCOVx1RkYwQ1x1OEZEQlx1ODg0Q1x1N0YxM1x1NUI1OFxuICAvLyAgNS5cdTYwNjJcdTU5MERcdTZDOTlcdTc2RDJcdThGRDBcdTg4NENcdTY3MUZcdTk1RjRcdTRFQTdcdTc1MUZcdTc2ODRcdTUyNkZcdTRGNUNcdTc1MjhcbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLmlzUnVubmluZykgcmV0dXJuO1xuICAgIHRoaXMucGF0Y2hMaXN0LmZvckVhY2goKHBhdGNoKSA9PiB7XG4gICAgICBwYXRjaC5hY3RpdmF0ZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIDEuXHU2MDYyXHU1OTBEXHU2Qzk5XHU3NkQyXHU1NDJGXHU1MkE4XHU2NzFGXHU5NUY0XHU1M0Q4XHU5MUNGXHU1M0Q4XHU2NkY0XHU3Njg0XHU1M0Q4XHU5MUNGXHVGRjBDXHU4QkIwXHU1RjU1XHU1M0Q4XHU2NkY0XHU4QkIwXHU1RjU1XG4gIC8vIDIuXHU2MDYyXHU1OTBEXHU2Qzk5XHU3NkQyXHU1NDJGXHU1MkE4XHU2NzFGXHU5NUY0XHU1MjIwXHU5NjY0XHU3Njg0XHU1M0Q4XHU5MUNGXHVGRjBDXHU4QkIwXHU1RjU1XHU1M0Q4XHU2NkY0XHU4QkIwXHU1RjU1XG4gIHB1YmxpYyBkZWFjdGl2YXRlKGNsZWFyRWZmZWN0czogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSByZXR1cm47IC8vIFx1NjcwMFx1NTQwRVx1OTUwMFx1NkJDMVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NUI4OFx1NjJBNFxuICAgIFsuLi50aGlzLnBhdGNoTGlzdF0ucmV2ZXJzZSgpLmZvckVhY2goKHBhdGNoKSA9PiB7XG4gICAgICBwYXRjaC5kZWFjdGl2YXRlKGNsZWFyRWZmZWN0cyk7XG4gICAgfSk7XG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgfVxufVxu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
