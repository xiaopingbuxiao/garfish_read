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
export {
  GarfishBrowserSnapshot,
  Sandbox as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhdGNoZXJzL2V2ZW50LnRzIiwgIi4uLy4uL3NyYy9wYXRjaGVycy9pbnRlcmNlcHRvci50cyIsICIuLi8uLi9zcmMvcGF0Y2hlcnMvc3R5bGUudHMiLCAiLi4vLi4vc3JjL3BhdGNoZXJzL2hpc3RvcnkudHMiLCAiLi4vLi4vc3JjL3BhdGNoZXJzL2ludGVydmFsLnRzIiwgIi4uLy4uL3NyYy9wYXRjaGVycy92YXJpYWJsZS50cyIsICIuLi8uLi9zcmMvcGF0Y2hlcnMvd2VicGFja2pzb25wLnRzIiwgIi4uLy4uL3NyYy9zYW5kYm94LnRzIiwgIi4uLy4uL3NyYy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibGV0IHJhd0FkZEV2ZW50TGlzdGVuZXI6IGFueTtcbmxldCByYXdSZW1vdmVFdmVudExpc3RlbmVyOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBQYXRjaEV2ZW50IHtcbiAgcHJpdmF0ZSBsaXN0ZW5lck1hcCA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0W10+KCk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgLy8gcmVzdG9yZSBwcmUgZXZlbnRcbiAgICB0aGlzLmxpc3RlbmVyTWFwLmZvckVhY2goKGxpc3RlbmVycywgdHlwZSkgPT5cbiAgICAgIFsuLi5saXN0ZW5lcnNdLmZvckVhY2goKGxpc3RlbmVyKSA9PlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciksXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpZiAoIXJhd0FkZEV2ZW50TGlzdGVuZXIgfHwgIXJhd1JlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHJhd0FkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICAgIHJhd1JlbW92ZUV2ZW50TGlzdGVuZXIgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA9IChcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LFxuICAgICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyxcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJNYXAuZ2V0KHR5cGUpIHx8IFtdO1xuICAgICAgdGhpcy5saXN0ZW5lck1hcC5zZXQodHlwZSwgWy4uLmxpc3RlbmVycywgbGlzdGVuZXJdKTtcbiAgICAgIHJldHVybiByYXdBZGRFdmVudExpc3RlbmVyLmNhbGwod2luZG93LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IChcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LFxuICAgICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyxcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlZFR5cGVMaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyTWFwLmdldCh0eXBlKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3RvcmVkVHlwZUxpc3RlbmVycyAmJlxuICAgICAgICBzdG9yZWRUeXBlTGlzdGVuZXJzLmxlbmd0aCAmJlxuICAgICAgICBzdG9yZWRUeXBlTGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHN0b3JlZFR5cGVMaXN0ZW5lcnMuc3BsaWNlKHN0b3JlZFR5cGVMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJhd1JlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCh3aW5kb3csIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5saXN0ZW5lck1hcC5mb3JFYWNoKChsaXN0ZW5lcnMsIHR5cGUpID0+XG4gICAgICBbLi4ubGlzdGVuZXJzXS5mb3JFYWNoKChsaXN0ZW5lcikgPT5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgLy8gZXZlbnRcdUZGMENcdTU3Mjh3aW5kb3dcdTUzOUZcdTU3OEJcdTk0RkVcdTRFMEFcdUZGMENcdTVDMDZ3aW5kb3dcdTRFMEFcdTg5ODZcdTc2RDZcdTc2ODRcdTRFRTNcdTc0MDZcdTRFOEJcdTRFRjZcdTUyMjBcdTk2NjRcdTUzNzNcdTUzRUZcbiAgICAvLyBkZWxldGUgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgLy8gZGVsZXRlIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID0gcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA9IHJhd0FkZEV2ZW50TGlzdGVuZXI7XG4gIH1cbn1cbiIsICJleHBvcnQgdHlwZSBTbmFwc2hvdERpZmYgPSB7XG4gIGNyZWF0ZWQ6IFNuYXBzaG90O1xuICByZW1vdmVkOiBTbmFwc2hvdDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0eWxlZENvbXBvbmVudHNMaWtlKGVsZW1lbnQ6IEhUTUxTdHlsZUVsZW1lbnQpIHtcbiAgLy8gQSBzdHlsZWQtY29tcG9uZW50cyBsaWtlZCBlbGVtZW50IGhhcyBubyB0ZXh0Q29udGVudCBidXQga2VlcCB0aGUgcnVsZXMgaW4gaXRzIHNoZWV0LmNzc1J1bGVzLlxuICByZXR1cm4gKFxuICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU3R5bGVFbGVtZW50ICYmXG4gICAgIWVsZW1lbnQudGV4dENvbnRlbnQgJiZcbiAgICBlbGVtZW50LnNoZWV0Py5jc3NSdWxlcy5sZW5ndGhcbiAgKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNuYXBzaG90IHtcbiAgY29uc3RydWN0b3IocHVibGljIGFyckRvbXM6IEFycmF5PEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuYXJyRG9tcyA9IGFyckRvbXM7XG4gIH1cblxuICBzdGF0aWMgdGFrZSh0YXJnZXQ6IEhUTUxFbGVtZW50KTogU25hcHNob3Q7XG4gIHN0YXRpYyB0YWtlPFQgZXh0ZW5kcyBFbGVtZW50ID0gRWxlbWVudD4oXG4gICAgbm9kZUxpc3Q6IEhUTUxDb2xsZWN0aW9uT2Y8VD4sXG4gICk6IFNuYXBzaG90O1xuICBzdGF0aWMgdGFrZShub2RlTGlzdD86IE5vZGVMaXN0KTogU25hcHNob3Q7XG4gIHN0YXRpYyB0YWtlKHRhcmdldDogSFRNTEVsZW1lbnQgfCBIVE1MQ29sbGVjdGlvbiB8IE5vZGVMaXN0ID0gZG9jdW1lbnQuaGVhZCkge1xuICAgIGxldCBsaXN0OiBBcnJheTxIVE1MRWxlbWVudD47XG4gICAgaWYgKCh0YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNoaWxkTm9kZXMpIHtcbiAgICAgIGxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgodGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jaGlsZE5vZGVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU25hcHNob3QobGlzdCk7XG4gIH1cblxuICBkaWZmKHM6IFNuYXBzaG90KTogU25hcHNob3REaWZmIHtcbiAgICBpZiAoIXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZWQ6IG5ldyBTbmFwc2hvdChbXSksXG4gICAgICAgIHJlbW92ZWQ6IG5ldyBTbmFwc2hvdChbXSksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjcmVhdGVkOiBuZXcgU25hcHNob3QoXG4gICAgICAgIHRoaXMuYXJyRG9tcy5maWx0ZXIoKGQpID0+IHMuYXJyRG9tcy5pbmRleE9mKGQpID09PSAtMSksXG4gICAgICApLFxuICAgICAgcmVtb3ZlZDogbmV3IFNuYXBzaG90KFxuICAgICAgICBzLmFyckRvbXMuZmlsdGVyKChkKSA9PiB0aGlzLmFyckRvbXMuaW5kZXhPZihkKSA9PT0gLTEpLFxuICAgICAgKSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvciB7XG4gIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldDogU2V0PEhUTUxTdHlsZUVsZW1lbnQ+O1xuICBzdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcDogV2Vha01hcDxIVE1MU3R5bGVFbGVtZW50LCBDU1NSdWxlTGlzdD47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkb206IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuaGVhZCkge1xuICAgIHRoaXMuZG9tID0gZG9tO1xuICAgIHRoaXMuZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0ID0gbmV3IFNldDxIVE1MU3R5bGVFbGVtZW50PigpO1xuICAgIHRoaXMuc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXAgPSBuZXcgV2Vha01hcDxcbiAgICAgIEhUTUxTdHlsZUVsZW1lbnQsXG4gICAgICBDU1NSdWxlTGlzdFxuICAgID4oKTtcbiAgfVxuXG4gIGFkZChmcm9tOiBTbmFwc2hvdCk6IHZvaWQ7XG4gIGFkZChjcmVhdGVkOiBTbmFwc2hvdCwgcmVtb3ZlZDogU25hcHNob3QpOiB2b2lkO1xuICBhZGQoY3JlYXRlZE9yU25hcHNob3Q6IFNuYXBzaG90LCByZW1vdmVkPzogU25hcHNob3QpIHtcbiAgICBsZXQgY3JlYXRlZDogU25hcHNob3Q7XG4gICAgaWYgKCFyZW1vdmVkKSB7XG4gICAgICBjb25zdCBkaWZmID0gU25hcHNob3QudGFrZSh0aGlzLmRvbSkuZGlmZihjcmVhdGVkT3JTbmFwc2hvdCk7XG4gICAgICBjcmVhdGVkID0gZGlmZi5jcmVhdGVkO1xuICAgICAgcmVtb3ZlZCA9IGRpZmYucmVtb3ZlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY3JlYXRlZCA9IGNyZWF0ZWRPclNuYXBzaG90O1xuICAgIH1cbiAgICBjcmVhdGVkLmFyckRvbXMucmVkdWNlKChwcmV2LCB2YWwpID0+IHtcbiAgICAgIHByZXYuYXBwZW5kQ2hpbGQodmFsKTtcbiAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBIVE1MU3R5bGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNzc1J1bGVzID0gdGhpcy5zdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcC5nZXQodmFsKTtcbiAgICAgICAgaWYgKGNzc1J1bGVzICYmIGNzc1J1bGVzLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3NzUnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNzc1J1bGUgPSBjc3NSdWxlc1tpXTtcbiAgICAgICAgICAgIC8vIHJlLWluc2VydCBydWxlcyBmb3Igc3R5bGVkLWNvbXBvbmVudHMgZWxlbWVudFxuICAgICAgICAgICAgdmFsLnNoZWV0Py5pbnNlcnRSdWxlKGNzc1J1bGUuY3NzVGV4dCwgdmFsLnNoZWV0Py5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgdGhpcy5kb20pO1xuICAgIHJlbW92ZWQuYXJyRG9tcy5yZWR1Y2UoKHByZXYsIHZhbCkgPT4ge1xuICAgICAgcHJldi5yZW1vdmVDaGlsZCh2YWwpO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgdGhpcy5kb20pO1xuICB9XG5cbiAgcmVtb3ZlKHRvOiBTbmFwc2hvdCk6IHZvaWQ7XG4gIHJlbW92ZShjcmVhdGVkOiBTbmFwc2hvdCwgcmVtb3ZlZDogU25hcHNob3QpOiB2b2lkO1xuICByZW1vdmUoY3JlYXRlZE9yU25hcHNob3Q6IFNuYXBzaG90LCByZW1vdmVkPzogU25hcHNob3QpIHtcbiAgICBsZXQgY3JlYXRlZDogU25hcHNob3Q7XG4gICAgaWYgKCFyZW1vdmVkKSB7XG4gICAgICBjb25zdCBkaWZmID0gU25hcHNob3QudGFrZSh0aGlzLmRvbSkuZGlmZihjcmVhdGVkT3JTbmFwc2hvdCk7XG4gICAgICBjcmVhdGVkID0gZGlmZi5jcmVhdGVkO1xuICAgICAgcmVtb3ZlZCA9IGRpZmYucmVtb3ZlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY3JlYXRlZCA9IGNyZWF0ZWRPclNuYXBzaG90O1xuICAgIH1cbiAgICBjcmVhdGVkLmFyckRvbXMucmVkdWNlKChwcmV2LCB2YWwpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdmFsIGluc3RhbmNlb2YgSFRNTFN0eWxlRWxlbWVudCAmJlxuICAgICAgICBpc1N0eWxlZENvbXBvbmVudHNMaWtlKHZhbCkgJiZcbiAgICAgICAgdmFsPy5zaGVldD8uY3NzUnVsZXNcbiAgICAgICkge1xuICAgICAgICB0aGlzLnN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwLnNldCh2YWwsIHZhbC5zaGVldC5jc3NSdWxlcyk7XG4gICAgICB9XG4gICAgICBwcmV2LnJlbW92ZUNoaWxkKHZhbCk7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aGlzLmRvbSk7XG4gICAgcmVtb3ZlZC5hcnJEb21zLnJlZHVjZSgocHJldiwgdmFsKSA9PiB7XG4gICAgICBwcmV2LmFwcGVuZENoaWxkKHZhbCk7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB0aGlzLmRvbSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJbnRlcmNlcHRvciwgU25hcHNob3QsIFNuYXBzaG90RGlmZiB9IGZyb20gJy4vaW50ZXJjZXB0b3InO1xuXG5pbnRlcmZhY2UgRWZmZWN0Q3Qge1xuICBzcmM6IHN0cmluZztcbiAgb3V0ZXJIVE1MOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEVmZmVjdE1hcCB7XG4gIHN0eWxlOiBBcnJheTxFZmZlY3RDdD47XG4gIHNjcmlwdDogQXJyYXk8RWZmZWN0Q3Q+O1xuICBvdGhlcjogQXJyYXk8RWZmZWN0Q3Q+O1xufVxuXG5leHBvcnQgY2xhc3MgUGF0Y2hTdHlsZSB7XG4gIHB1YmxpYyBoZWFkSW50ZXJjZXB0b3I6IEludGVyY2VwdG9yO1xuICBwcml2YXRlIGRvbVNuYXBzaG90QmVmb3JlITogU25hcHNob3Q7XG4gIHByaXZhdGUgZG9tU25hcHNob3RNdXRhdGVkITogU25hcHNob3REaWZmIHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhlYWRJbnRlcmNlcHRvciA9IG5ldyBJbnRlcmNlcHRvcihkb2N1bWVudC5oZWFkKTtcbiAgfVxuXG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICAvLyBcdThCQjBcdTVGNTVcdTVGNTNcdTUyNERkb21cdTgyODJcdTcwQjlcdTMwMDFcdTYwNjJcdTU5MERcdTRFNEJcdTUyNERkb21cdTgyODJcdTcwQjlcdTUyNkZcdTRGNUNcdTc1MjhcbiAgICB0aGlzLmRvbVNuYXBzaG90QmVmb3JlID0gU25hcHNob3QudGFrZSgpO1xuICAgIGlmICh0aGlzLmRvbVNuYXBzaG90TXV0YXRlZClcbiAgICAgIHRoaXMuaGVhZEludGVyY2VwdG9yLmFkZChcbiAgICAgICAgdGhpcy5kb21TbmFwc2hvdE11dGF0ZWQuY3JlYXRlZCxcbiAgICAgICAgdGhpcy5kb21TbmFwc2hvdE11dGF0ZWQucmVtb3ZlZCxcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpIHtcbiAgICAvLyBcdTYwNjJcdTU5MERcdTZDOTlcdTc2RDJcdThGRDBcdTg4NENcdTUyNERkb21cdTgyODJcdTcwQjlcdTczQUZcdTU4ODNcdUZGMENcdTVFNzZcdTVDMDZcdTVERUVcdTVGMDJcdTUwM0NcdThGREJcdTg4NENcdTdGMTNcdTVCNThcbiAgICBjb25zdCBkb21TbmFwc2hvdCA9IFNuYXBzaG90LnRha2UoKTtcbiAgICB0aGlzLmRvbVNuYXBzaG90TXV0YXRlZCA9IGRvbVNuYXBzaG90LmRpZmYodGhpcy5kb21TbmFwc2hvdEJlZm9yZSk7XG4gICAgaWYgKCF0aGlzLmRvbVNuYXBzaG90TXV0YXRlZCkgcmV0dXJuO1xuICAgIHRoaXMuaGVhZEludGVyY2VwdG9yLnJlbW92ZShcbiAgICAgIHRoaXMuZG9tU25hcHNob3RNdXRhdGVkLmNyZWF0ZWQsXG4gICAgICB0aGlzLmRvbVNuYXBzaG90TXV0YXRlZC5yZW1vdmVkLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdGVDdHgoYXJyRG9tczogQXJyYXk8SFRNTEVsZW1lbnQ+KSB7XG4gICAgY29uc3QgZWZmZWN0TWFwOiBFZmZlY3RNYXAgPSB7XG4gICAgICBzdHlsZTogW10sXG4gICAgICBzY3JpcHQ6IFtdLFxuICAgICAgb3RoZXI6IFtdLFxuICAgIH07XG5cbiAgICBhcnJEb21zLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgbGV0IHR5cGU6ICdvdGhlcicgfCAnc3R5bGUnIHwgJ3NjcmlwdCcgPSAnb3RoZXInO1xuICAgICAgaWYgKC9jc3MvLnRlc3QoKGRvbSBhcyBhbnkpLnR5cGUpKSB0eXBlID0gJ3N0eWxlJztcbiAgICAgIGlmICgvamF2YXNjcmlwdC8udGVzdCgoZG9tIGFzIGFueSkudHlwZSkpIHR5cGUgPSAnc2NyaXB0JztcbiAgICAgIGVmZmVjdE1hcFt0eXBlXS5wdXNoKHtcbiAgICAgICAgc3JjOiAoZG9tIGFzIGFueSkuc3JjLFxuICAgICAgICBvdXRlckhUTUw6IGRvbS5vdXRlckhUTUwsXG4gICAgICAgIGNvbnRlbnQ6IGRvbS5pbm5lclRleHQsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBlZmZlY3RNYXA7XG4gIH1cbn1cbiIsICJsZXQgcmF3UHVzaFN0YXRlOiBhbnk7XG5sZXQgcmF3UmVwbGFjZVN0YXRlOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBQYXRjaEhpc3Rvcnkge1xuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgaWYgKCFyYXdQdXNoU3RhdGUgfHwgIXJhd1JlcGxhY2VTdGF0ZSkge1xuICAgICAgcmF3UHVzaFN0YXRlID0gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlO1xuICAgICAgcmF3UmVwbGFjZVN0YXRlID0gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZWFjdGl2YXRlKCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9IHJhd1B1c2hTdGF0ZTtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSByYXdSZXBsYWNlU3RhdGU7XG4gIH1cbn1cbiIsICJjb25zdCByYXdJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbDtcbmNvbnN0IHJhd0NsZWFySW50ZXJ2YWwgPSB3aW5kb3cuY2xlYXJJbnRlcnZhbDtcblxuZXhwb3J0IGNsYXNzIFBhdGNoSW50ZXJ2YWwge1xuICBwcml2YXRlIGludGVydmFsczogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cuc2V0SW50ZXJ2YWwgPSAoXG4gICAgICBoYW5kbGVyOiBGdW5jdGlvbixcbiAgICAgIHRpbWVvdXQ/OiBudW1iZXIsXG4gICAgICAuLi5hcmdzOiBhbnlbXVxuICAgICkgPT4ge1xuICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHJhd0ludGVydmFsKGhhbmRsZXIsIHRpbWVvdXQsIC4uLmFyZ3MpO1xuICAgICAgdGhpcy5pbnRlcnZhbHMgPSBbLi4udGhpcy5pbnRlcnZhbHMsIGludGVydmFsSWRdO1xuICAgICAgcmV0dXJuIGludGVydmFsSWQ7XG4gICAgfTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCA9IChpbnRlcnZhbElkOiBudW1iZXIpID0+IHtcbiAgICAgIHRoaXMuaW50ZXJ2YWxzID0gdGhpcy5pbnRlcnZhbHMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGludGVydmFsSWQpO1xuICAgICAgcmV0dXJuIHJhd0NsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBkZWFjdGl2YXRlKF9jbGVhckVmZmVjdHM/OiBib29sZWFuKSB7XG4gICAgaWYgKF9jbGVhckVmZmVjdHMpIHtcbiAgICAgIHRoaXMuaW50ZXJ2YWxzLmZvckVhY2goKGlkKSA9PiB3aW5kb3cuY2xlYXJJbnRlcnZhbChpZCkpO1xuICAgIH1cbiAgICB3aW5kb3cuc2V0SW50ZXJ2YWwgPSByYXdJbnRlcnZhbDtcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCA9IHJhd0NsZWFySW50ZXJ2YWw7XG4gIH1cbn1cbiIsICJjb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5mdW5jdGlvbiBoYXNPd24ob2JqOiBhbnksIGtleTogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuXG5leHBvcnQgY2xhc3MgUGF0Y2hHbG9iYWxWYWwge1xuICBwdWJsaWMgc25hcHNob3RPcmlnaW5hbCA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBzbmFwc2hvdE11dGF0ZWQ6IGFueSA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSB3aGl0ZUxpc3Q6IEFycmF5PFByb3BlcnR5S2V5PiA9IFtcbiAgICAnbG9jYXRpb24nLFxuICAgICdhZGRFdmVudExpc3RlbmVyJyxcbiAgICAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsXG4gICAgJ3dlYnBhY2tKc29ucCcsXG4gIF07XG4gIC8vICwnYWRkRXZlbnRMaXN0ZW5lcicsJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCdjbGVhckludGVydmFsJywnc2V0SW50ZXJ2YWwnLCd3ZWJraXRTdG9yYWdlSW5mbydcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRhcmdldFRvUHJvdGVjdDogYW55ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gd2luZG93XG4gICAgICA6IGdsb2JhbFRoaXMsXG4gICAgcHVibGljIHByb3RlY3RWYXJpYWJsZTogQXJyYXk8UHJvcGVydHlLZXk+ID0gW10sXG4gICkge1xuICAgIHRoaXMudGFyZ2V0VG9Qcm90ZWN0ID0gdGFyZ2V0VG9Qcm90ZWN0O1xuICAgIHRoaXMucHJvdGVjdFZhcmlhYmxlID0gcHJvdGVjdFZhcmlhYmxlO1xuICAgIC8vIHRoaXMud2hpdGVMaXN0ID0gWy4uLnRoaXMud2hpdGVMaXN0LCAuLi5HYXJDb25maWcucHJvdGVjdFZhcmlhYmxlIV07XG4gICAgdGhpcy53aGl0ZUxpc3QgPSBbLi4udGhpcy53aGl0ZUxpc3QsIC4uLnByb3RlY3RWYXJpYWJsZV07XG4gIH1cblxuICBwcm90ZWN0ZWQgc2FmZUl0ZXJhdG9yKGZuOiBGdW5jdGlvbikge1xuICAgIC8vIFNraXAgdGhlIHZhcmlhYmxlcyBub3QgdHJhdmVyc2VcbiAgICAvLyBEbyBub3QgaW5jbHVkZSBhIHN5bWJvbFxuICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLnRhcmdldFRvUHJvdGVjdCkge1xuICAgICAgaWYgKHRoaXMud2hpdGVMaXN0LmluZGV4T2YoaSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy50YXJnZXRUb1Byb3RlY3QsIGkpO1xuICAgICAgaWYgKCFwcm9wIHx8ICFwcm9wLndyaXRhYmxlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGhhc093bih0aGlzLnRhcmdldFRvUHJvdGVjdCwgaSkpIHtcbiAgICAgICAgZm4oaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gMS5UcmlnZ2VyIGhvb2tzLCBsaWZlIGN5Y2xlIHdpbGxBY3RpdmF0ZSBlbmFibGVkIChnb2luZyB0bylcbiAgLy8gMi5XaWxsIGRpc2FibGUgdGhlIGN1cnJlbnQgZ3JvdXAgb2Ygb3RoZXIgYm94LCBhbmQgdHJpZ2dlcnMgdGhlIHN3aXRjaCBsaWZlIGN5Y2xlXG4gIC8vIDMuVGhlIGN1cnJlbnQgd2luZG93IG9iamVjdCBwcm9wZXJ0aWVzIGZvciBjYWNoaW5nXG4gIC8vIDQuUmVzdG9yZSB0aGUgc2FuZGJveCBzaWRlIGVmZmVjdHMgZHVyaW5nIG9wZXJhdGlvblxuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgLy8gUmVjb3JkZWQgYmVmb3JlIHRoZSBnbG9iYWwgZW52aXJvbm1lbnQsIHJlc3RvcmUgc2lkZSBlZmZlY3RzIG9mIGEgdmFyaWFibGVcbiAgICB0aGlzLnNhZmVJdGVyYXRvcigoaTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNuYXBzaG90T3JpZ2luYWwuc2V0KGksIHRoaXMudGFyZ2V0VG9Qcm90ZWN0W2ldKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc25hcHNob3RNdXRhdGVkLmZvckVhY2goKHZhbCwgbXV0YXRlS2V5KSA9PiB7XG4gICAgICB0aGlzLnRhcmdldFRvUHJvdGVjdFttdXRhdGVLZXldID0gdGhpcy5zbmFwc2hvdE11dGF0ZWQuZ2V0KG11dGF0ZUtleSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAxLlJlc3RvcmUgdGhlIHNhbmRib3ggZHVyaW5nIHN0YXJ0dXAgdmFyaWFibGVzIGNoYW5nZSwgcmVjb3JkIHRoZSBjaGFuZ2UgcmVjb3JkXG4gIC8vIDIuUmVzdG9yZSB0aGUgc2FuZGJveCBkdXJpbmcgc3RhcnR1cCB0byBkZWxldGUgdmFyaWFibGVzLCByZWNvcmQgdGhlIGNoYW5nZSByZWNvcmRcbiAgcHVibGljIGRlYWN0aXZhdGUoKSB7XG4gICAgY29uc3QgZGVsZXRlTWFwOiBhbnkgPSB7fTtcbiAgICBjb25zdCB1cGRhdGVNYXA6IGFueSA9IHt9O1xuICAgIGNvbnN0IGFkZE1hcDogYW55ID0ge307XG5cbiAgICAvLyBSZXN0b3JlIHRoZSBzYW5kYm94IGJlZm9yZSBydW5uaW5nIFdpbmRvd3MgcHJvcGVydGllcyBvZiBlbnZpcm9ubWVudCwgYW5kIGRpZmZlcmVuY2UgdmFsdWUgZm9yIGNhY2hpbmdcbiAgICB0aGlzLnNhZmVJdGVyYXRvcigobm9ybWFsS2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5zbmFwc2hvdE9yaWdpbmFsLmdldChub3JtYWxLZXkpICE9PVxuICAgICAgICAodGhpcy50YXJnZXRUb1Byb3RlY3Rbbm9ybWFsS2V5XSBhcyBhbnkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zbmFwc2hvdE11dGF0ZWQuc2V0KG5vcm1hbEtleSwgdGhpcy50YXJnZXRUb1Byb3RlY3Rbbm9ybWFsS2V5XSk7IC8vIGRlbGV0ZWQga2V5IHdpbGwgYmUgZGVmaW5lZCBhcyB1bmRlZmluZWQgb25cbiAgICAgICAgdGhpcy50YXJnZXRUb1Byb3RlY3Rbbm9ybWFsS2V5XSA9IHRoaXMuc25hcHNob3RPcmlnaW5hbC5nZXQobm9ybWFsS2V5KTsgLy8gfHwgdGhpcy50YXJnZXRUb1Byb3RlY3RbaV1cblxuICAgICAgICAvLyBDb2xsZWN0aW9uIG9mIGRlbGV0ZSwgbW9kaWZ5IHZhcmlhYmxlc1xuICAgICAgICBpZiAodGhpcy50YXJnZXRUb1Byb3RlY3Rbbm9ybWFsS2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWRkTWFwW25vcm1hbEtleV0gPSB0aGlzLnNuYXBzaG90TXV0YXRlZC5nZXQobm9ybWFsS2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVNYXBbbm9ybWFsS2V5XSA9IHRoaXMuc25hcHNob3RNdXRhdGVkLmdldChub3JtYWxLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNuYXBzaG90T3JpZ2luYWwuZGVsZXRlKG5vcm1hbEtleSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNuYXBzaG90T3JpZ2luYWwuZm9yRWFjaCgodmFsLCBkZWxldGVLZXkpID0+IHtcbiAgICAgIHRoaXMuc25hcHNob3RNdXRhdGVkLnNldChkZWxldGVLZXksIHRoaXMudGFyZ2V0VG9Qcm90ZWN0W2RlbGV0ZUtleV0pO1xuICAgICAgdGhpcy50YXJnZXRUb1Byb3RlY3RbZGVsZXRlS2V5XSA9IHRoaXMuc25hcHNob3RPcmlnaW5hbC5nZXQoZGVsZXRlS2V5KTtcbiAgICAgIGRlbGV0ZU1hcFtkZWxldGVLZXldID0gdGhpcy50YXJnZXRUb1Byb3RlY3RbZGVsZXRlS2V5XTtcbiAgICB9KTtcblxuICAgIC8vIEZvciBkZXZlbG9wZXJzLCBsZXQgdGhlbSBrbm93IGNsZWFyIHdoYXQgc2lkZSBlZmZlY3RzIG9mIGEgdmFyaWFibGVcbiAgICAvLyBjaGFubmVsLmVtaXQoJ3NhbmRib3gtdmFyaWFibGUnLCB7XG4gICAgLy8gICB1cGRhdGU6IHVwZGF0ZU1hcCxcbiAgICAvLyAgIHJlbW92ZWQ6IGRlbGV0ZU1hcCxcbiAgICAvLyAgIGFkZDogYWRkTWFwLFxuICAgIC8vIH0pO1xuICB9XG59XG4iLCAiZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICB3ZWJwYWNrSnNvbnA/OiBhbnlbXTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGF0Y2hXZWJwYWNrSnNvbnAge1xuICBwcmVXZWJwYWNrSnNvbnA/OiBhbnlbXTtcblxuICBjdXJyZW50V2VicGFja0pzb25wPzogYW55W107XG5cbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIHRoaXMucHJlV2VicGFja0pzb25wID0gd2luZG93LndlYnBhY2tKc29ucDtcbiAgICB3aW5kb3cud2VicGFja0pzb25wID0gdGhpcy5jdXJyZW50V2VicGFja0pzb25wO1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5jdXJyZW50V2VicGFja0pzb25wID0gd2luZG93LndlYnBhY2tKc29ucDtcbiAgICB3aW5kb3cud2VicGFja0pzb25wID0gdGhpcy5wcmVXZWJwYWNrSnNvbnA7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXRjaEV2ZW50IH0gZnJvbSAnLi9wYXRjaGVycy9ldmVudCc7XG5pbXBvcnQgeyBQYXRjaFN0eWxlIH0gZnJvbSAnLi9wYXRjaGVycy9zdHlsZSc7XG5pbXBvcnQgeyBQYXRjaEhpc3RvcnkgfSBmcm9tICcuL3BhdGNoZXJzL2hpc3RvcnknO1xuaW1wb3J0IHsgUGF0Y2hJbnRlcnZhbCB9IGZyb20gJy4vcGF0Y2hlcnMvaW50ZXJ2YWwnO1xuaW1wb3J0IHsgUGF0Y2hHbG9iYWxWYWwgfSBmcm9tICcuL3BhdGNoZXJzL3ZhcmlhYmxlJztcbmltcG9ydCB7IFBhdGNoV2VicGFja0pzb25wIH0gZnJvbSAnLi9wYXRjaGVycy93ZWJwYWNranNvbnAnO1xuXG5leHBvcnQgY2xhc3MgU2FuZGJveCB7XG4gIHB1YmxpYyB0eXBlID0gJ3NuYXBzaG90JztcbiAgcHVibGljIGlzUnVubmluZzogQm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHBhdGNoTGlzdDogQXJyYXk8XG4gICAgUGF0Y2hHbG9iYWxWYWwgfCBQYXRjaFN0eWxlIHwgUGF0Y2hJbnRlcnZhbCB8IFBhdGNoRXZlbnQgfCBQYXRjaFdlYnBhY2tKc29ucFxuICA+ID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgcHJvdGVjdFZhcmlhYmxlOiBBcnJheTxQcm9wZXJ0eUtleT4gPSBbXSxcbiAgICBwdWJsaWMgdGFyZ2V0VG9Qcm90ZWN0OiBXaW5kb3cgfCBPYmplY3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyB3aW5kb3dcbiAgICAgIDogZ2xvYmFsVGhpcyxcbiAgICBwcml2YXRlIGlzSW5Ccm93c2VyOiBCb29sZWFuID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IHRydWUsXG4gICkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pc0luQnJvd3NlciA9IGlzSW5Ccm93c2VyO1xuICAgIHRoaXMucGF0Y2hMaXN0LnB1c2gobmV3IFBhdGNoR2xvYmFsVmFsKHRhcmdldFRvUHJvdGVjdCwgcHJvdGVjdFZhcmlhYmxlKSk7XG5cbiAgICAvLyBcdTYyNjdcdTg4NENcdTk4N0FcdTVFOEZcdTY2MkZcdUZGMENcdTUxNjhcdTVDNDBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTUxNDhcdTZGQzBcdTZEM0JcdUZGMENcdTUxNjhcdTVDNDBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTU0MEVcdTk1MDBcdTZCQzFcbiAgICBpZiAodGhpcy5pc0luQnJvd3Nlcikge1xuICAgICAgdGhpcy5wYXRjaExpc3QgPSBbXG4gICAgICAgIC4uLnRoaXMucGF0Y2hMaXN0LFxuICAgICAgICBuZXcgUGF0Y2hTdHlsZSgpLFxuICAgICAgICBuZXcgUGF0Y2hFdmVudCgpLFxuICAgICAgICBuZXcgUGF0Y2hIaXN0b3J5KCksXG4gICAgICAgIG5ldyBQYXRjaEludGVydmFsKCksXG4gICAgICAgIG5ldyBQYXRjaFdlYnBhY2tKc29ucCgpLFxuICAgICAgXTtcbiAgICB9XG4gIH1cblxuICAvLyAgMS5cdTg5RTZcdTUzRDFcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcdTk0QTlcdTVCNTBcdUZGMEN3aWxsQWN0aXZhdGVcdUZGMDhcdTVDMDZcdTg5ODFcdTZGQzBcdTZEM0JcdUZGMDlcbiAgLy8gIDIuXHU1QzA2XHU1RjUzXHU1MjREXHU3RUM0XHU3Njg0XHU1MTc2XHU0RUQ2XHU2Qzk5XHU3NkQyZGlzYWJsZVx1RkYwQ1x1NUU3Nlx1ODlFNlx1NTNEMXN3aXRjaFx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlxuICAvLyAgMy5cdTVDMDZcdTVGNTNcdTUyNER3aW5kb3dcdTVCRjlcdThDNjFcdTVDNUVcdTYwMjdcdThGREJcdTg4NENcdTdGMTNcdTVCNThcbiAgLy8gIDQuXHU4M0I3XHU1M0Q2c3R5bGVcdTgyODJcdTcwQjlcdUZGMENcdThGREJcdTg4NENcdTdGMTNcdTVCNThcbiAgLy8gIDUuXHU2MDYyXHU1OTBEXHU2Qzk5XHU3NkQyXHU4RkQwXHU4ODRDXHU2NzFGXHU5NUY0XHU0RUE3XHU3NTFGXHU3Njg0XHU1MjZGXHU0RjVDXHU3NTI4XG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHJldHVybjtcbiAgICB0aGlzLnBhdGNoTGlzdC5mb3JFYWNoKChwYXRjaCkgPT4ge1xuICAgICAgcGF0Y2guYWN0aXZhdGUoKTtcbiAgICB9KTtcbiAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gIH1cblxuICAvLyAxLlx1NjA2Mlx1NTkwRFx1NkM5OVx1NzZEMlx1NTQyRlx1NTJBOFx1NjcxRlx1OTVGNFx1NTNEOFx1OTFDRlx1NTNEOFx1NjZGNFx1NzY4NFx1NTNEOFx1OTFDRlx1RkYwQ1x1OEJCMFx1NUY1NVx1NTNEOFx1NjZGNFx1OEJCMFx1NUY1NVxuICAvLyAyLlx1NjA2Mlx1NTkwRFx1NkM5OVx1NzZEMlx1NTQyRlx1NTJBOFx1NjcxRlx1OTVGNFx1NTIyMFx1OTY2NFx1NzY4NFx1NTNEOFx1OTFDRlx1RkYwQ1x1OEJCMFx1NUY1NVx1NTNEOFx1NjZGNFx1OEJCMFx1NUY1NVxuICBwdWJsaWMgZGVhY3RpdmF0ZShjbGVhckVmZmVjdHM6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKCF0aGlzLmlzUnVubmluZykgcmV0dXJuOyAvLyBcdTY3MDBcdTU0MEVcdTk1MDBcdTZCQzFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcdTVCODhcdTYyQTRcbiAgICBbLi4udGhpcy5wYXRjaExpc3RdLnJldmVyc2UoKS5mb3JFYWNoKChwYXRjaCkgPT4ge1xuICAgICAgcGF0Y2guZGVhY3RpdmF0ZShjbGVhckVmZmVjdHMpO1xuICAgIH0pO1xuICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi9zYW5kYm94JztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCAnLi9nbG9iYWxFeHRlbnNpb25zJztcblxuZXhwb3J0IHsgU2FuZGJveCBhcyBkZWZhdWx0IH0gZnJvbSAnLi9zYW5kYm94JztcblxuZXhwb3J0IGludGVyZmFjZSBTYW5kYm94Q29uZmlnIHtcbiAgc25hcHNob3Q/OiBib29sZWFuO1xuICBkaXNhYmxlV2l0aD86IGJvb2xlYW47XG4gIHN0cmljdElzb2xhdGlvbj86IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBCcm93c2VyQ29uZmlnIHtcbiAgb3Blbj86IGJvb2xlYW47XG4gIHByb3RlY3RWYXJpYWJsZT86IFByb3BlcnR5S2V5W107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoQnJvd3NlclNuYXBzaG90KG9wPzogQnJvd3NlckNvbmZpZykge1xuICByZXR1cm4gZnVuY3Rpb24gKEdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCk6IGludGVyZmFjZXMuUGx1Z2luIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgb3BlbkJyb3dzZXI6IGZhbHNlLFxuICAgICAgdmVyc2lvbjogJzEuMTIuMCcsXG4gICAgICBuYW1lOiAnYnJvd3Nlci1zbmFwc2hvdCcsXG5cbiAgICAgIGFmdGVyTG9hZChhcHBJbmZvLCBhcHBJbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBjb25maWc6IEJyb3dzZXJDb25maWcgPSBvcCB8fCB7IG9wZW46IHRydWUgfTtcbiAgICAgICAgY29uc3Qgc2FuZGJveENvbmZpZyA9IGFwcEluZm8uc2FuZGJveCB8fCBHYXJmaXNoPy5vcHRpb25zPy5zYW5kYm94O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2FuZGJveENvbmZpZyA9PT0gZmFsc2UgfHxcbiAgICAgICAgICBzYW5kYm94Q29uZmlnLm9wZW4gPT09IGZhbHNlIHx8XG4gICAgICAgICAgc2FuZGJveENvbmZpZz8uc25hcHNob3QgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbmZpZy5vcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbmRib3hDb25maWcpIHtcbiAgICAgICAgICBjb25maWcucHJvdGVjdFZhcmlhYmxlID0gW1xuICAgICAgICAgICAgLi4uKEdhcmZpc2g/Lm9wdGlvbnMucHJvdGVjdFZhcmlhYmxlIHx8IFtdKSxcbiAgICAgICAgICAgIC4uLihhcHBJbmZvLnByb3RlY3RWYXJpYWJsZSB8fCBbXSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLm9wZW5Ccm93c2VyID0gISFjb25maWcub3BlbjtcbiAgICAgICAgaWYgKCFjb25maWcub3BlbikgcmV0dXJuO1xuICAgICAgICBpZiAoYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgICAvLyBleGlzdGluZ1xuICAgICAgICAgIGlmIChhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3gpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBzYW5kYm94ID0gbmV3IFNhbmRib3goYXBwSW5mby5uYW1lLCBjb25maWcucHJvdGVjdFZhcmlhYmxlKTtcbiAgICAgICAgICBhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3ggPSBzYW5kYm94O1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVNb3VudChhcHBJbmZvLCBhcHBJbnN0YW5jZSkge1xuICAgICAgICAvLyBleGlzdGluZ1xuICAgICAgICBpZiAoIWFwcEluc3RhbmNlLnNuYXBzaG90U2FuZGJveCkgcmV0dXJuO1xuICAgICAgICBhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3guYWN0aXZhdGUoKTtcbiAgICAgIH0sXG5cbiAgICAgIGFmdGVyVW5tb3VudChhcHBJbmZvLCBhcHBJbnN0YW5jZSkge1xuICAgICAgICBpZiAoIWFwcEluc3RhbmNlLnNuYXBzaG90U2FuZGJveCkgcmV0dXJuO1xuICAgICAgICBhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3guZGVhY3RpdmF0ZSgpO1xuICAgICAgfSxcbiAgICB9O1xuICAg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
