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
  AsyncHook: () => AsyncHook,
  AsyncWaterfallHook: () => AsyncWaterfallHook,
  PluginSystem: () => PluginSystem,
  SyncHook: () => SyncHook,
  SyncWaterfallHook: () => SyncWaterfallHook
});

// src/syncHook.ts
var import_utils = require("@garfish/utils");
var SyncHook = class {
  constructor(type) {
    this.type = "";
    this.listeners = /* @__PURE__ */ new Set();
    if (type)
      this.type = type;
  }
  on(fn) {
    if (typeof fn === "function") {
      this.listeners.add(fn);
    } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      (0, import_utils.warn)('Invalid parameter in "Hook".');
    }
  }
  once(fn) {
    const self = this;
    this.on(function wrapper(...args) {
      self.remove(wrapper);
      return fn.apply(null, args);
    });
  }
  emit(...data) {
    if (this.listeners.size > 0) {
      this.listeners.forEach((fn) => fn.apply(null, data));
    }
  }
  remove(fn) {
    return this.listeners.delete(fn);
  }
  removeAll() {
    this.listeners.clear();
  }
};

// src/asyncHook.ts
var AsyncHook = class extends SyncHook {
  emit(...data) {
    let result;
    const ls = Array.from(this.listeners);
    if (ls.length > 0) {
      let i = 0;
      const call = (prev) => {
        if (prev === false) {
          return false;
        } else if (i < ls.length) {
          return Promise.resolve(ls[i++].apply(null, data)).then(call);
        } else {
          return prev;
        }
      };
      result = call();
    }
    return Promise.resolve(result);
  }
};

// src/syncWaterfallHook.ts
var import_utils2 = require("@garfish/utils");
function checkReturnData(originData, returnData) {
  if (!(0, import_utils2.isObject)(returnData))
    return false;
  if (originData !== returnData) {
    for (const key in originData) {
      if (!(key in returnData)) {
        return false;
      }
    }
  }
  return true;
}
var SyncWaterfallHook = class extends SyncHook {
  constructor(type) {
    super();
    this.onerror = import_utils2.error;
    this.type = type;
  }
  emit(data) {
    if (!(0, import_utils2.isObject)(data)) {
      (0, import_utils2.error)(`"${this.type}" hook response data must be an object.`);
    }
    for (const fn of this.listeners) {
      try {
        const tempData = fn(data);
        if (checkReturnData(data, tempData)) {
          data = tempData;
        } else {
          this.onerror(`The "${this.type}" type has a plugin return value error.`);
          break;
        }
      } catch (e) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils2.warn)(e);
        this.onerror(e);
      }
    }
    return data;
  }
};

// src/asyncWaterfallHooks.ts
var import_utils3 = require("@garfish/utils");
var AsyncWaterfallHook = class extends SyncHook {
  constructor(type) {
    super();
    this.onerror = import_utils3.error;
    this.type = type;
  }
  emit(data) {
    if (!(0, import_utils3.isObject)(data)) {
      (0, import_utils3.error)(`"${this.type}" hook response data must be an object.`);
    }
    const ls = Array.from(this.listeners);
    if (ls.length > 0) {
      let i = 0;
      const processError = (e) => {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils3.warn)(e);
        this.onerror(e);
        return data;
      };
      const call = (prevData) => {
        if (prevData === false) {
          return false;
        } else if (checkReturnData(data, prevData)) {
          data = prevData;
          if (i < ls.length) {
            try {
              return Promise.resolve(ls[i++](data)).then(call, processError);
            } catch (e) {
              return processError(e);
            }
          }
        } else {
          this.onerror(`The "${this.type}" type has a plugin return value error.`);
        }
        return data;
      };
      return Promise.resolve(call(data));
    }
    return Promise.resolve(data);
  }
};

// src/pluginSystem.ts
var import_utils4 = require("@garfish/utils");
var PluginSystem = class {
  constructor(lifecycle) {
    this.registerPlugins = {};
    this.lifecycle = lifecycle;
    this.lifecycleKeys = Object.keys(lifecycle);
  }
  usePlugin(plugin) {
    (0, import_utils4.assert)((0, import_utils4.isPlainObject)(plugin), "Invalid plugin configuration.");
    const pluginName = plugin.name;
    (0, import_utils4.assert)(pluginName, "Plugin must provide a name.");
    if (!this.registerPlugins[pluginName]) {
      this.registerPlugins[pluginName] = plugin;
      for (const key in this.lifecycle) {
        const pluginLife = plugin[key];
        if (pluginLife) {
          this.lifecycle[key].on(pluginLife);
        }
      }
    } else {
      (0, import_utils4.warn)(`Repeat to register plugin hooks "${pluginName}".`);
    }
  }
  removePlugin(pluginName) {
    (0, import_utils4.assert)(pluginName, "Must provide a name.");
    const plugin = this.registerPlugins[pluginName];
    (0, import_utils4.assert)(plugin, `plugin "${pluginName}" is not registered.`);
    for (const key in plugin) {
      if (key === "name")
        continue;
      this.lifecycle[key].remove(plugin[key]);
    }
  }
  inherit({ lifecycle, registerPlugins }) {
    for (const hookName in lifecycle) {
      (0, import_utils4.assert)(!this.lifecycle[hookName], `"${hookName}" hook has conflict and cannot be inherited.`);
      this.lifecycle[hookName] = lifecycle[hookName];
    }
    for (const pluginName in registerPlugins) {
      (0, import_utils4.assert)(!this.registerPlugins[pluginName], `"${pluginName}" plugin has conflict and cannot be inherited.`);
      this.usePlugin(registerPlugins[pluginName]);
    }
    return this;
  }
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AsyncHook,
  AsyncWaterfallHook,
  PluginSystem,
  SyncHook,
  SyncWaterfallHook
});
//# sourceMappingURL=index.js.map
