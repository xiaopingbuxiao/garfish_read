// src/syncHook.ts
import { warn } from "@garfish/utils";
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
      warn('Invalid parameter in "Hook".');
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
import { warn as warn2, error, isObject } from "@garfish/utils";
function checkReturnData(originData, returnData) {
  if (!isObject(returnData))
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
    this.onerror = error;
    this.type = type;
  }
  emit(data) {
    if (!isObject(data)) {
      error(`"${this.type}" hook response data must be an object.`);
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
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn2(e);
        this.onerror(e);
      }
    }
    return data;
  }
};

// src/asyncWaterfallHooks.ts
import { warn as warn3, error as error2, isObject as isObject2 } from "@garfish/utils";
var AsyncWaterfallHook = class extends SyncHook {
  constructor(type) {
    super();
    this.onerror = error2;
    this.type = type;
  }
  emit(data) {
    if (!isObject2(data)) {
      error2(`"${this.type}" hook response data must be an object.`);
    }
    const ls = Array.from(this.listeners);
    if (ls.length > 0) {
      let i = 0;
      const processError = (e) => {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn3(e);
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
import { warn as warn4, assert, isPlainObject } from "@garfish/utils";
var PluginSystem = class {
  constructor(lifecycle) {
    this.registerPlugins = {};
    this.lifecycle = lifecycle;
    this.lifecycleKeys = Object.keys(lifecycle);
  }
  usePlugin(plugin) {
    assert(isPlainObject(plugin), "Invalid plugin configuration.");
    const pluginName = plugin.name;
    assert(pluginName, "Plugin must provide a name.");
    if (!this.registerPlugins[pluginName]) {
      this.registerPlugins[pluginName] = plugin;
      for (const key in this.lifecycle) {
        const pluginLife = plugin[key];
        if (pluginLife) {
          this.lifecycle[key].on(pluginLife);
        }
      }
    } else {
      warn4(`Repeat to register plugin hooks "${pluginName}".`);
    }
  }
  removePlugin(pluginName) {
    assert(pluginName, "Must provide a name.");
    const plugin = this.registerPlugins[pluginName];
    assert(plugin, `plugin "${pluginName}" is not registered.`);
    for (const key in plugin) {
      if (key === "name")
        continue;
      this.lifecycle[key].remove(plugin[key]);
    }
  }
  inherit({ lifecycle, registerPlugins }) {
    for (const hookName in lifecycle) {
      assert(!this.lifecycle[hookName], `"${hookName}" hook has conflict and cannot be inherited.`);
      this.lifecycle[hookName] = lifecycle[hookName];
    }
    for (const pluginName in registerPlugins) {
      assert(!this.registerPlugins[pluginName], `"${pluginName}" plugin has conflict and cannot be inherited.`);
      this.usePlugin(registerPlugins[pluginName]);
    }
    return this;
  }
};
export {
  AsyncHook,
  AsyncWaterfallHook,
  PluginSystem,
  SyncHook,
  SyncWaterfallHook
};
//# sourceMappingURL=index.js.map
