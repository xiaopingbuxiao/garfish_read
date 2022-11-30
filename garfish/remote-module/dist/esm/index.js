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

// src/hooks.ts
import {
  PluginSystem,
  SyncHook,
  SyncWaterfallHook,
  AsyncWaterfallHook
} from "@garfish/hooks";
var hooks = new PluginSystem({
  preloaded: new SyncHook(),
  initModule: new SyncHook("initModule"),
  beforeLoadModule: new SyncWaterfallHook("beforeLoadModule"),
  asyncBeforeLoadModule: new AsyncWaterfallHook("asyncBeforeLoadModule"),
  afterLoadModule: new SyncWaterfallHook("afterLoadModule"),
  asyncAfterLoadModule: new AsyncWaterfallHook("asyncAfterLoadModule")
});

// src/common.ts
import { Loader } from "@garfish/loader";
import {
  isObject as isObject2,
  isPlainObject as isPlainObject2,
  deepMerge,
  safeWrapper,
  __LOADER_FLAG__
} from "@garfish/utils";

// src/apis/loadModule.ts
import { assert as assert2, isPromise, isAbsolute as isAbsolute2 } from "@garfish/utils";

// src/actuator.ts
import { evalWithEnv } from "@garfish/utils";
var Actuator = class {
  constructor(manager, externals) {
    this.manager = manager;
    this.env = {
      exports: {},
      module: null,
      require: (key) => {
        var _a, _b;
        return (externals || {})[key] || moduleConfig.externals && moduleConfig.externals[key] || ((_b = (_a = currentApp) == null ? void 0 : _a.context) == null ? void 0 : _b.externals[key]);
      }
    };
    this.env.module = this.env;
    hooks.lifecycle.initModule.emit(this);
  }
  execScript() {
    const { url, moduleCode } = this.manager;
    if (currentApp) {
      currentApp.execScript(moduleCode, this.env, url, { noEntry: true });
    } else {
      const sourceUrl = `
${url ? `//# sourceURL=${url}
` : ""}`;
      evalWithEnv(`;${moduleCode}
${sourceUrl}`, this.env, window);
    }
    return this.env;
  }
};

// src/apis/setModuleConfig.ts
import {
  warn,
  hasOwn,
  assert,
  isObject,
  isAbsolute,
  isPlainObject
} from "@garfish/utils";
var MARKER = "@";
var setAlias = (obj) => {
  for (const key in obj) {
    const value = obj[key];
    assert(isAbsolute(value), `The loading of the remote module must be an absolute path. "${value}"`);
    moduleConfig.alias[key] = value;
  }
};
function setModuleConfig(obj) {
  assert(isPlainObject(obj), "Module configuration must be an object.");
  for (const key in obj) {
    if (hasOwn(moduleConfig, key)) {
      if (key === "env") {
        Object.assign(moduleConfig[key], obj[key]);
      } else if (key === "alias") {
        const val = obj[key];
        val && setAlias(val);
      } else {
        moduleConfig[key] = obj[key];
      }
    } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      warn(`Invalid configuration "${key}".`);
    }
  }
}
function processAlias(url) {
  if (url && url.startsWith(MARKER)) {
    const segments = url.slice(MARKER.length).split(".");
    const name = segments[0];
    const realUrl = moduleConfig.alias[name];
    assert(realUrl, `Alias "${name}" is not defined.`);
    return [realUrl, segments];
  }
  return [url, void 0];
}
function getValueInObject(obj, segments) {
  if (Array.isArray(segments)) {
    const l = segments.length;
    if (l > 1) {
      for (let i = 1; i < l; i++) {
        const p = segments[i];
        assert(isObject(obj), `Remote module "${segments.slice(0, i).join(".")}" is ${obj}, cannot get "${p}" attribute from it.`);
        obj = obj[p];
      }
    }
  }
  return obj;
}

// src/apis/loadModule.ts
async function loadModule(urlOrAlias, options) {
  const data = await hooks.lifecycle.asyncBeforeLoadModule.emit({
    options,
    url: urlOrAlias
  });
  if (data === false) {
    return null;
  }
  urlOrAlias = data.url;
  options = data.options;
  assert2(urlOrAlias, "Missing url for loading remote module.");
  assert2(typeof urlOrAlias === "string", "The type of URL needs to be a string.");
  const [url, segments] = processAlias(urlOrAlias);
  assert2(isAbsolute2(url) || url.startsWith("//"), `The loading of the remote module must be an absolute path. "${url}"`);
  const info = purifyOptions(url, options);
  const { cache, version, externals, error: error2, adapter } = info;
  const urlWithVersion = `${version || "latest"}@${url}`;
  const asyncLoadProcess = async () => {
    let result = null;
    let module = cacheModules[urlWithVersion];
    if (cache && module) {
      if (isPromise(module)) {
        module = await module;
      }
      result = getValueInObject(module, segments);
    } else {
      try {
        const data2 = await loader.loadModule(url);
        if (data2.resourceManager) {
          const actuator = new Actuator(data2.resourceManager, externals);
          cacheModules[urlWithVersion] = actuator.env.exports;
          let exports = actuator.execScript().exports;
          if (typeof adapter === "function") {
            exports = adapter(exports);
          }
          const hookResult = await hooks.lifecycle.asyncAfterLoadModule.emit({
            url,
            exports,
            code: data2.resourceManager.moduleCode
          });
          if (hookResult === false) {
            return null;
          }
          exports = hookResult.exports;
          cacheModules[urlWithVersion] = exports;
          if (isPromise(exports)) {
            exports = await exports;
          }
          result = getValueInObject(exports, segments);
        }
      } catch (e) {
        delete cacheModules[urlWithVersion];
        const alias = segments ? segments[0] : "";
        if (typeof error2 === "function") {
          result = error2(e, info, alias);
        } else {
          throw prettifyError(e, alias, url);
        }
      }
    }
    return result;
  };
  if (fetchLoading[urlWithVersion]) {
    return fetchLoading[urlWithVersion].then(() => {
      return Promise.resolve(cacheModules[urlWithVersion]).then((m) => getValueInObject(m, segments));
    });
  } else {
    fetchLoading[urlWithVersion] = asyncLoadProcess().then((data2) => {
      fetchLoading[urlWithVersion] = null;
      return data2;
    });
    return fetchLoading[urlWithVersion];
  }
}

// src/common.ts
var currentApp;
var resourcesStore = [];
var cacheModules = /* @__PURE__ */ Object.create(null);
var fetchLoading = /* @__PURE__ */ Object.create(null);
var moduleConfig = {
  alias: {},
  cache: true,
  error: null,
  adapter: null,
  externals: {
    loadModule
  }
};
var garfishGlobalEnv;
safeWrapper(() => {
  garfishGlobalEnv = __GARFISH_GLOBAL_ENV__;
  if (isObject2(garfishGlobalEnv)) {
    const { externals, currentApp: app, remoteModulesCode } = garfishGlobalEnv;
    if (app) {
      currentApp = app;
    }
    if (isObject2(externals)) {
      Object.assign(moduleConfig.externals, externals);
    }
    if (Array.isArray(remoteModulesCode)) {
      resourcesStore = resourcesStore.concat(remoteModulesCode);
      remoteModulesCode.forEach((manager) => {
        if (manager.alias) {
          moduleConfig.alias[manager.alias] = manager.url;
        }
      });
    }
  }
});
var loader = (() => {
  if (isObject2(garfishGlobalEnv)) {
    const loader2 = garfishGlobalEnv.loader;
    if (isObject2(loader2) && loader2.personalId === __LOADER_FLAG__) {
      return loader2;
    }
  }
  return new Loader();
})();
var getModuleManager = (url) => {
  if (url) {
    return resourcesStore.find((manager) => manager.originUrl === url);
  }
};
var purifyOptions = (urlOrAlias, options) => {
  let config;
  const globalExternals = moduleConfig.externals;
  delete moduleConfig.externals;
  if (isPlainObject2(options)) {
    const curExternals = options.externals;
    delete options.externals;
    config = deepMerge(moduleConfig, __spreadProps(__spreadValues({}, options), { url: urlOrAlias }));
    options.externals = curExternals;
    config.externals = __spreadValues(__spreadValues({}, globalExternals), curExternals);
  } else {
    config = deepMerge(moduleConfig, { url: urlOrAlias });
    config.externals = globalExternals;
  }
  moduleConfig.externals = globalExternals;
  return config;
};
var prettifyError = (error2, alias, url) => {
  const tipMarkers = [currentApp && currentApp.name, alias, url];
  let prefix = tipMarkers.reduce((msg, val, i) => {
    if (!val)
      return msg;
    return i === tipMarkers.length - 1 ? msg + `"${val}"` : msg + `"${val}" -> `;
  }, "remoteModule: ");
  prefix = ` (${prefix})`;
  if (typeof error2 === "number") {
    error2 = String(error2);
  }
  if (typeof error2 === "string") {
    if (!error2.endsWith(prefix)) {
      return `${error2}${prefix}`;
    }
  }
  if (error2 instanceof Error) {
    if (!error2.message.endsWith(prefix)) {
      error2.message = `${error2.message}${prefix}`;
    }
  }
  return error2;
};

// src/apis/preload.ts
import { assert as assert3, isAbsolute as isAbsolute3 } from "@garfish/utils";
function preload(urls) {
  if (!Array.isArray(urls))
    urls = [urls];
  return Promise.all(urls.map((url) => {
    url = processAlias(url)[0];
    assert3(isAbsolute3(url), `The loading of the remote module must be an absolute path. "${url}"`);
    return loader.loadModule(url).then((data) => {
      if (data.resourceManager) {
        data.resourceManager.originUrl = url;
        resourcesStore.push(data.resourceManager);
        hooks.lifecycle.preloaded.emit(data.resourceManager);
      }
      return data;
    });
  }));
}

// src/apis/esModule.ts
import { isObject as isObject3, isPromise as isPromise2 } from "@garfish/utils";
function esModule(obj) {
  if (isObject3(obj) && obj.__esModule === true) {
    return obj;
  } else if (isPromise2(obj)) {
    return obj.then(esModule);
  } else {
    const esm = { default: obj };
    Object.defineProperty(esm, "__esModule", { value: true });
    return esm;
  }
}

// src/apis/loadModuleSync.ts
import { error, assert as assert4, isPromise as isPromise3, isAbsolute as isAbsolute4 } from "@garfish/utils";
var throwWarn = (alias, url) => {
  error(prettifyError(`The current module return a promise, You should use "loadModule('${url}')".`, alias, url));
};
function loadModuleSync(urlOrAlias, options) {
  const data = hooks.lifecycle.beforeLoadModule.emit({
    options,
    url: urlOrAlias
  });
  urlOrAlias = data.url;
  options = data.options;
  assert4(urlOrAlias, "Missing url for loading remote module.");
  assert4(typeof urlOrAlias === "string", "The type of URL needs to be a string.");
  const [url, segments] = processAlias(urlOrAlias);
  assert4(isAbsolute4(url) || url.startsWith("//"), `The loading of the remote module must be an absolute path. "${url}"`);
  let result = null;
  const info = purifyOptions(url, options);
  const { cache, version, externals, error: error2, adapter } = info;
  const urlWithVersion = `${version || "latest"}@${url}`;
  const module = cacheModules[urlWithVersion];
  const alias = segments ? segments[0] : "";
  if (cache && module) {
    isPromise3(module) && throwWarn(alias, url);
    result = getValueInObject(module, segments);
  } else {
    const manager = getModuleManager(url);
    assert4(manager, `Synchronously load module must load resources in advance. "${url}"`);
    try {
      const actuator = new Actuator(manager, externals);
      cacheModules[urlWithVersion] = actuator.env.exports;
      let exports = actuator.execScript().exports;
      if (typeof adapter === "function") {
        exports = adapter(exports);
      }
      exports = hooks.lifecycle.afterLoadModule.emit({
        url,
        exports,
        code: manager.moduleCode
      }).exports;
      isPromise3(exports) && throwWarn(alias, url);
      cacheModules[urlWithVersion] = exports;
      result = getValueInObject(exports, segments);
    } catch (e) {
      delete cacheModules[urlWithVersion];
      if (typeof error2 === "function") {
        result = error2(e, info, alias);
      } else {
        throw prettifyError(e, alias, url);
      }
    }
  }
  return result;
}

// src/index.ts
var Apis = {
  preload,
  esModule,
  loadModule,
  loadModuleSync,
  setModuleConfig,
  hooks,
  loader,
  cacheModules
};
export {
  cacheModules,
  Apis as default,
  esModule,
  hooks,
  loadModule,
  loadModuleSync,
  loader,
  preload,
  setModuleConfig
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2hvb2tzLnRzIiwgIi4uLy4uL3NyYy9jb21tb24udHMiLCAiLi4vLi4vc3JjL2FwaXMvbG9hZE1vZHVsZS50cyIsICIuLi8uLi9zcmMvYWN0dWF0b3IudHMiLCAiLi4vLi4vc3JjL2FwaXMvc2V0TW9kdWxlQ29uZmlnLnRzIiwgIi4uLy4uL3NyYy9hcGlzL3ByZWxvYWQudHMiLCAiLi4vLi4vc3JjL2FwaXMvZXNNb2R1bGUudHMiLCAiLi4vLi4vc3JjL2FwaXMvbG9hZE1vZHVsZVN5bmMudHMiLCAiLi4vLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IE1vZHVsZU1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHtcbiAgUGx1Z2luU3lzdGVtLFxuICBTeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIEFzeW5jV2F0ZXJmYWxsSG9vayxcbn0gZnJvbSAnQGdhcmZpc2gvaG9va3MnO1xuaW1wb3J0IHR5cGUgeyBBY3R1YXRvciB9IGZyb20gJy4vYWN0dWF0b3InO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVDb25maWcsIE1vZHVsZUluZm8gfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmVmb3JlTG9hZEFyZ3Mge1xuICB1cmw6IHN0cmluZztcbiAgb3B0aW9ucz86IE1vZHVsZUNvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBhZnRlckxvYWRBcmdzIHtcbiAgdXJsOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgZXhwb3J0czogUmVjb3JkPHN0cmluZywgYW55Pjtcbn1cblxuZXhwb3J0IGNvbnN0IGhvb2tzID0gbmV3IFBsdWdpblN5c3RlbSh7XG4gIHByZWxvYWRlZDogbmV3IFN5bmNIb29rPFtNb2R1bGVNYW5hZ2VyXSwgYW55PigpLFxuICBpbml0TW9kdWxlOiBuZXcgU3luY0hvb2s8W0FjdHVhdG9yXSwgYW55PignaW5pdE1vZHVsZScpLFxuICBiZWZvcmVMb2FkTW9kdWxlOiBuZXcgU3luY1dhdGVyZmFsbEhvb2s8QmVmb3JlTG9hZEFyZ3M+KCdiZWZvcmVMb2FkTW9kdWxlJyksXG4gIGFzeW5jQmVmb3JlTG9hZE1vZHVsZTogbmV3IEFzeW5jV2F0ZXJmYWxsSG9vazxCZWZvcmVMb2FkQXJncz4oXG4gICAgJ2FzeW5jQmVmb3JlTG9hZE1vZHVsZScsXG4gICksXG4gIGFmdGVyTG9hZE1vZHVsZTogbmV3IFN5bmNXYXRlcmZhbGxIb29rPGFmdGVyTG9hZEFyZ3M+KCdhZnRlckxvYWRNb2R1bGUnKSxcbiAgYXN5bmNBZnRlckxvYWRNb2R1bGU6IG5ldyBBc3luY1dhdGVyZmFsbEhvb2s8YWZ0ZXJMb2FkQXJncz4oXG4gICAgJ2FzeW5jQWZ0ZXJMb2FkTW9kdWxlJyxcbiAgKSxcbn0pO1xuIiwgImltcG9ydCB7IExvYWRlciwgTW9kdWxlTWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgZGVlcE1lcmdlLFxuICBzYWZlV3JhcHBlcixcbiAgX19MT0FERVJfRkxBR19fLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBsb2FkTW9kdWxlIH0gZnJvbSAnLi9hcGlzL2xvYWRNb2R1bGUnO1xuXG50eXBlIFBhcnRpYWxQYXJ0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IHtcbiAgW1AgaW4gRXhjbHVkZTxrZXlvZiBULCBLPl0tPzogVFtQXTtcbn0gJiB7XG4gIFtQIGluIEtdPzogVFtQXTtcbn07XG5cbmV4cG9ydCB0eXBlIE1vZHVsZUNvbmZpZyA9IFBhcnRpYWxQYXJ0PFxuICBSZXF1aXJlZDxPbWl0PE1vZHVsZUluZm8sICd2ZXJzaW9uJz4gJiB7IGFsaWFzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IH0+LFxuICAnZXh0ZXJuYWxzJ1xuPjtcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVJbmZvIHtcbiAgY2FjaGU6IGJvb2xlYW47XG4gIHZlcnNpb246IHN0cmluZztcbiAgZXh0ZXJuYWxzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICBlcnJvcjogbnVsbCB8ICgoZXJyOiBFcnJvciwgaW5mbzogTW9kdWxlSW5mbywgYWxpYXM6IHN0cmluZykgPT4gYW55KTtcbiAgYWRhcHRlcjogbnVsbCB8ICgoY2pzTW9kdWxlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTtcbn1cblxuZXhwb3J0IGxldCBjdXJyZW50QXBwOiBhbnk7XG5leHBvcnQgbGV0IHJlc291cmNlc1N0b3JlOiBBcnJheTxNb2R1bGVNYW5hZ2VyPiA9IFtdO1xuZXhwb3J0IGNvbnN0IGNhY2hlTW9kdWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5leHBvcnQgY29uc3QgZmV0Y2hMb2FkaW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmV4cG9ydCBjb25zdCBtb2R1bGVDb25maWc6IE1vZHVsZUNvbmZpZyA9IHtcbiAgYWxpYXM6IHt9LFxuICBjYWNoZTogdHJ1ZSwgLy8gRGVmYXVsdCB1c2UgY2FjaGVcbiAgZXJyb3I6IG51bGwsXG4gIGFkYXB0ZXI6IG51bGwsXG4gIGV4dGVybmFsczoge1xuICAgIGxvYWRNb2R1bGUsIC8vIE9ubHkgYGxvYWRNb2R1bGVgIGlzIHByb3ZpZGVkIGZvciB1c2UgYnkgcmVtb3RlIG1vZHVsZXNcbiAgfSxcbn07XG5cbi8vIElmIGdhcmZpc2ggaGFzIHByZS1wcmVwYXJlZCBkYXRhXG5sZXQgZ2FyZmlzaEdsb2JhbEVudjtcblxuc2FmZVdyYXBwZXIoKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIGdhcmZpc2hHbG9iYWxFbnYgPSBfX0dBUkZJU0hfR0xPQkFMX0VOVl9fO1xuXG4gIC8vIEluaGVyaXQgdGhlIGNvbmZpZ3VyYXRpb24gZnJvbSBnYXJmaXNoXG4gIGlmIChpc09iamVjdChnYXJmaXNoR2xvYmFsRW52KSkge1xuICAgIGNvbnN0IHsgZXh0ZXJuYWxzLCBjdXJyZW50QXBwOiBhcHAsIHJlbW90ZU1vZHVsZXNDb2RlIH0gPSBnYXJmaXNoR2xvYmFsRW52O1xuICAgIGlmIChhcHApIHtcbiAgICAgIGN1cnJlbnRBcHAgPSBhcHA7XG4gICAgfVxuICAgIGlmIChpc09iamVjdChleHRlcm5hbHMpKSB7XG4gICAgICBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZy5leHRlcm5hbHMsIGV4dGVybmFscyk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlbW90ZU1vZHVsZXNDb2RlKSkge1xuICAgICAgcmVzb3VyY2VzU3RvcmUgPSByZXNvdXJjZXNTdG9yZS5jb25jYXQocmVtb3RlTW9kdWxlc0NvZGUpO1xuICAgICAgcmVtb3RlTW9kdWxlc0NvZGUuZm9yRWFjaCgobWFuYWdlcikgPT4ge1xuICAgICAgICBpZiAobWFuYWdlci5hbGlhcykge1xuICAgICAgICAgIG1vZHVsZUNvbmZpZy5hbGlhc1ttYW5hZ2VyLmFsaWFzXSA9IG1hbmFnZXIudXJsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbG9hZGVyOiBMb2FkZXIgPSAoKCkgPT4ge1xuICBpZiAoaXNPYmplY3QoZ2FyZmlzaEdsb2JhbEVudikpIHtcbiAgICBjb25zdCBsb2FkZXIgPSBnYXJmaXNoR2xvYmFsRW52LmxvYWRlcjtcbiAgICAvLyBHYXJmaXNoIGxvYWRlciB3aWxsIGhhdmUgYW4gaWRlbnRpZmllclxuICAgIGlmIChpc09iamVjdChsb2FkZXIpICYmIGxvYWRlci5wZXJzb25hbElkID09PSBfX0xPQURFUl9GTEFHX18pIHtcbiAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgTG9hZGVyKCk7XG59KSgpO1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlTWFuYWdlciA9ICh1cmw6IHN0cmluZykgPT4ge1xuICBpZiAodXJsKSB7XG4gICAgLy8gRG8gbm90IHVzZSByZWRpcmVjdGVkIHVybFxuICAgIHJldHVybiByZXNvdXJjZXNTdG9yZS5maW5kKChtYW5hZ2VyKSA9PiBtYW5hZ2VyLm9yaWdpblVybCA9PT0gdXJsKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHB1cmlmeU9wdGlvbnMgPSAodXJsT3JBbGlhczogc3RyaW5nLCBvcHRpb25zPzogTW9kdWxlQ29uZmlnKSA9PiB7XG4gIGxldCBjb25maWc7XG4gIGNvbnN0IGdsb2JhbEV4dGVybmFscyA9IG1vZHVsZUNvbmZpZy5leHRlcm5hbHM7XG4gIGRlbGV0ZSBtb2R1bGVDb25maWcuZXh0ZXJuYWxzO1xuXG4gIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgY29uc3QgY3VyRXh0ZXJuYWxzID0gb3B0aW9ucy5leHRlcm5hbHM7XG4gICAgZGVsZXRlIG9wdGlvbnMuZXh0ZXJuYWxzO1xuICAgIGNvbmZpZyA9IGRlZXBNZXJnZShtb2R1bGVDb25maWcsIHsgLi4ub3B0aW9ucywgdXJsOiB1cmxPckFsaWFzIH0pO1xuICAgIG9wdGlvbnMuZXh0ZXJuYWxzID0gY3VyRXh0ZXJuYWxzO1xuICAgIGNvbmZpZy5leHRlcm5hbHMgPSB7IC4uLmdsb2JhbEV4dGVybmFscywgLi4uY3VyRXh0ZXJuYWxzIH07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gZGVlcE1lcmdlKG1vZHVsZUNvbmZpZywgeyB1cmw6IHVybE9yQWxpYXMgfSk7XG4gICAgY29uZmlnLmV4dGVybmFscyA9IGdsb2JhbEV4dGVybmFscztcbiAgfVxuXG4gIG1vZHVsZUNvbmZpZy5leHRlcm5hbHMgPSBnbG9iYWxFeHRlcm5hbHM7XG5cbiAgcmV0dXJuIGNvbmZpZyBhcyBNb2R1bGVJbmZvICYge1xuICAgIHVybDogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXR0aWZ5RXJyb3IgPSAoXG4gIGVycm9yOiBFcnJvciB8IHN0cmluZyxcbiAgYWxpYXM6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG4pID0+IHtcbiAgY29uc3QgdGlwTWFya2VycyA9IFtjdXJyZW50QXBwICYmIGN1cnJlbnRBcHAubmFtZSwgYWxpYXMsIHVybF07XG4gIGxldCBwcmVmaXggPSB0aXBNYXJrZXJzLnJlZHVjZSgobXNnLCB2YWwsIGkpID0+IHtcbiAgICBpZiAoIXZhbCkgcmV0dXJuIG1zZztcbiAgICByZXR1cm4gaSA9PT0gdGlwTWFya2Vycy5sZW5ndGggLSAxXG4gICAgICA/IG1zZyArIGBcIiR7dmFsfVwiYFxuICAgICAgOiBtc2cgKyBgXCIke3ZhbH1cIiAtPiBgO1xuICB9LCAncmVtb3RlTW9kdWxlOiAnKTtcbiAgcHJlZml4ID0gYCAoJHtwcmVmaXh9KWA7XG5cbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ251bWJlcicpIHtcbiAgICBlcnJvciA9IFN0cmluZyhlcnJvcik7XG4gIH1cbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoIWVycm9yLmVuZHNXaXRoKHByZWZpeCkpIHtcbiAgICAgIHJldHVybiBgJHtlcnJvcn0ke3ByZWZpeH1gO1xuICAgIH1cbiAgfVxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGlmICghZXJyb3IubWVzc2FnZS5lbmRzV2l0aChwcmVmaXgpKSB7XG4gICAgICBlcnJvci5tZXNzYWdlID0gYCR7ZXJyb3IubWVzc2FnZX0ke3ByZWZpeH1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXJyb3I7XG59O1xuIiwgImltcG9ydCB7IGFzc2VydCwgaXNQcm9taXNlLCBpc0Fic29sdXRlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHtcbiAgbG9hZGVyLFxuICBNb2R1bGVJbmZvLFxuICBjYWNoZU1vZHVsZXMsXG4gIGZldGNoTG9hZGluZyxcbiAgcHVyaWZ5T3B0aW9ucyxcbiAgcHJldHRpZnlFcnJvcixcbiAgTW9kdWxlQ29uZmlnLFxufSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBBY3R1YXRvciB9IGZyb20gJy4uL2FjdHVhdG9yJztcbmltcG9ydCB7IHByb2Nlc3NBbGlhcywgZ2V0VmFsdWVJbk9iamVjdCB9IGZyb20gJy4vc2V0TW9kdWxlQ29uZmlnJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRNb2R1bGUoXG4gIHVybE9yQWxpYXM6IHN0cmluZyxcbiAgb3B0aW9ucz86IE1vZHVsZUNvbmZpZyxcbik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgYW55PiB8IG51bGw+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGhvb2tzLmxpZmVjeWNsZS5hc3luY0JlZm9yZUxvYWRNb2R1bGUuZW1pdCh7XG4gICAgb3B0aW9ucyxcbiAgICB1cmw6IHVybE9yQWxpYXMsXG4gIH0pO1xuICBpZiAoZGF0YSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHVybE9yQWxpYXMgPSBkYXRhLnVybDtcbiAgb3B0aW9ucyA9IGRhdGEub3B0aW9ucztcblxuICBhc3NlcnQodXJsT3JBbGlhcywgJ01pc3NpbmcgdXJsIGZvciBsb2FkaW5nIHJlbW90ZSBtb2R1bGUuJyk7XG4gIGFzc2VydChcbiAgICB0eXBlb2YgdXJsT3JBbGlhcyA9PT0gJ3N0cmluZycsXG4gICAgJ1RoZSB0eXBlIG9mIFVSTCBuZWVkcyB0byBiZSBhIHN0cmluZy4nLFxuICApO1xuICBjb25zdCBbdXJsLCBzZWdtZW50c10gPSBwcm9jZXNzQWxpYXModXJsT3JBbGlhcyk7XG4gIGFzc2VydChcbiAgICBpc0Fic29sdXRlKHVybCkgfHwgdXJsLnN0YXJ0c1dpdGgoJy8vJyksXG4gICAgYFRoZSBsb2FkaW5nIG9mIHRoZSByZW1vdGUgbW9kdWxlIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aC4gXCIke3VybH1cImAsXG4gICk7XG5cbiAgY29uc3QgaW5mbyA9IHB1cmlmeU9wdGlvbnModXJsLCBvcHRpb25zKTtcbiAgY29uc3QgeyBjYWNoZSwgdmVyc2lvbiwgZXh0ZXJuYWxzLCBlcnJvciwgYWRhcHRlciB9ID0gaW5mbztcbiAgY29uc3QgdXJsV2l0aFZlcnNpb24gPSBgJHt2ZXJzaW9uIHx8ICdsYXRlc3QnfUAke3VybH1gOyAvLyBgbGF0ZXN0QGh0dHBzOi8veHguanNgXG5cbiAgY29uc3QgYXN5bmNMb2FkUHJvY2VzcyA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IG1vZHVsZSA9IGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl07XG5cbiAgICBpZiAoY2FjaGUgJiYgbW9kdWxlKSB7XG4gICAgICBpZiAoaXNQcm9taXNlKG1vZHVsZSkpIHtcbiAgICAgICAgbW9kdWxlID0gYXdhaXQgbW9kdWxlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZ2V0VmFsdWVJbk9iamVjdChtb2R1bGUsIHNlZ21lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRlci5sb2FkTW9kdWxlKHVybCk7XG4gICAgICAgIGlmIChkYXRhLnJlc291cmNlTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IGFjdHVhdG9yID0gbmV3IEFjdHVhdG9yKGRhdGEucmVzb3VyY2VNYW5hZ2VyLCBleHRlcm5hbHMpO1xuICAgICAgICAgIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl0gPSBhY3R1YXRvci5lbnYuZXhwb3J0cztcbiAgICAgICAgICBsZXQgZXhwb3J0cyA9IGFjdHVhdG9yLmV4ZWNTY3JpcHQoKS5leHBvcnRzO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBhZGFwdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBleHBvcnRzID0gYWRhcHRlcihleHBvcnRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaG9va1Jlc3VsdCA9IGF3YWl0IGhvb2tzLmxpZmVjeWNsZS5hc3luY0FmdGVyTG9hZE1vZHVsZS5lbWl0KHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGV4cG9ydHMsXG4gICAgICAgICAgICBjb2RlOiBkYXRhLnJlc291cmNlTWFuYWdlci5tb2R1bGVDb2RlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChob29rUmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4cG9ydHMgPSBob29rUmVzdWx0LmV4cG9ydHM7XG5cbiAgICAgICAgICBjYWNoZU1vZHVsZXNbdXJsV2l0aFZlcnNpb25dID0gZXhwb3J0cztcbiAgICAgICAgICBpZiAoaXNQcm9taXNlKGV4cG9ydHMpKSB7XG4gICAgICAgICAgICBleHBvcnRzID0gYXdhaXQgZXhwb3J0cztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0ID0gZ2V0VmFsdWVJbk9iamVjdChleHBvcnRzLCBzZWdtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVsZXRlIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl07XG4gICAgICAgIGNvbnN0IGFsaWFzID0gc2VnbWVudHMgPyBzZWdtZW50c1swXSA6ICcnO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZXJyb3IoZSwgaW5mbywgYWxpYXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHByZXR0aWZ5RXJyb3IoZSwgYWxpYXMsIHVybCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBpZiAoZmV0Y2hMb2FkaW5nW3VybFdpdGhWZXJzaW9uXSkge1xuICAgIHJldHVybiBmZXRjaExvYWRpbmdbdXJsV2l0aFZlcnNpb25dLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gVGhlIG1vZHVsZXMgYXJlIHRoZSBzYW1lLCBidXQgdGhlIGFsaWFzZXMgbWF5IGJlIGRpZmZlcmVudFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjYWNoZU1vZHVsZXNbdXJsV2l0aFZlcnNpb25dKS50aGVuKChtKSA9PlxuICAgICAgICBnZXRWYWx1ZUluT2JqZWN0KG0sIHNlZ21lbnRzKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZmV0Y2hMb2FkaW5nW3VybFdpdGhWZXJzaW9uXSA9IGFzeW5jTG9hZFByb2Nlc3MoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBmZXRjaExvYWRpbmdbdXJsV2l0aFZlcnNpb25dID0gbnVsbDtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pO1xuICAgIHJldHVybiBmZXRjaExvYWRpbmdbdXJsV2l0aFZlcnNpb25dO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZXZhbFdpdGhFbnYgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBNb2R1bGVNYW5hZ2VyIH0gZnJvbSAnQGdhcmZpc2gvbG9hZGVyJztcbmltcG9ydCB7IGhvb2tzIH0gZnJvbSAnLi9ob29rcyc7XG5pbXBvcnQgeyBjdXJyZW50QXBwLCBtb2R1bGVDb25maWcgfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBjbGFzcyBBY3R1YXRvciB7XG4gIHByaXZhdGUgbWFuYWdlcjogTW9kdWxlTWFuYWdlcjtcbiAgcHVibGljIGVudjogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihtYW5hZ2VyOiBNb2R1bGVNYW5hZ2VyLCBleHRlcm5hbHM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmVudiA9IHtcbiAgICAgIGV4cG9ydHM6IHt9LFxuICAgICAgbW9kdWxlOiBudWxsLFxuICAgICAgcmVxdWlyZTogKGtleSkgPT5cbiAgICAgICAgKGV4dGVybmFscyB8fCB7fSlba2V5XSB8fFxuICAgICAgICAobW9kdWxlQ29uZmlnLmV4dGVybmFscyAmJiBtb2R1bGVDb25maWcuZXh0ZXJuYWxzW2tleV0pIHx8XG4gICAgICAgIGN1cnJlbnRBcHA/LmNvbnRleHQ/LmV4dGVybmFsc1trZXldLFxuICAgIH07XG4gICAgdGhpcy5lbnYubW9kdWxlID0gdGhpcy5lbnY7XG4gICAgaG9va3MubGlmZWN5Y2xlLmluaXRNb2R1bGUuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIGV4ZWNTY3JpcHQoKSB7XG4gICAgY29uc3QgeyB1cmwsIG1vZHVsZUNvZGUgfSA9IHRoaXMubWFuYWdlcjtcbiAgICBpZiAoY3VycmVudEFwcCkge1xuICAgICAgLy8gQXZvaWQgY29uZmxpY3Qgd2l0aCBHYXJmaXNoIGNqc1xuICAgICAgY3VycmVudEFwcC5leGVjU2NyaXB0KG1vZHVsZUNvZGUsIHRoaXMuZW52LCB1cmwsIHsgbm9FbnRyeTogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc291cmNlVXJsID0gYFxcbiR7dXJsID8gYC8vIyBzb3VyY2VVUkw9JHt1cmx9XFxuYCA6ICcnfWA7XG4gICAgICBldmFsV2l0aEVudihgOyR7bW9kdWxlQ29kZX1cXG4ke3NvdXJjZVVybH1gLCB0aGlzLmVudiwgd2luZG93KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZW52O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgd2FybixcbiAgaGFzT3duLFxuICBhc3NlcnQsXG4gIGlzT2JqZWN0LFxuICBpc0Fic29sdXRlLFxuICBpc1BsYWluT2JqZWN0LFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBtb2R1bGVDb25maWcsIE1vZHVsZUNvbmZpZyB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8vIHNldE1vZHVsZUluZm8oeyBhbGlhczogeyB1dGlsczogJ2h0dHBzOi8veHguanMnIH0gfSk7XG4vLyBsb2FkTW9kdWxlKCdAdXRpbHMnKS50aGVuKCh1dGlscykgPT4ge30pO1xuY29uc3QgTUFSS0VSID0gJ0AnO1xuXG5jb25zdCBzZXRBbGlhcyA9IChvYmo6IE1vZHVsZUNvbmZpZ1snYWxpYXMnXSkgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgIGFzc2VydChcbiAgICAgIGlzQWJzb2x1dGUodmFsdWUpLFxuICAgICAgYFRoZSBsb2FkaW5nIG9mIHRoZSByZW1vdGUgbW9kdWxlIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aC4gXCIke3ZhbHVlfVwiYCxcbiAgICApO1xuICAgIG1vZHVsZUNvbmZpZy5hbGlhc1trZXldID0gdmFsdWU7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNb2R1bGVDb25maWcob2JqOiBQYXJ0aWFsPE1vZHVsZUNvbmZpZz4pIHtcbiAgYXNzZXJ0KGlzUGxhaW5PYmplY3Qob2JqKSwgJ01vZHVsZSBjb25maWd1cmF0aW9uIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duKG1vZHVsZUNvbmZpZywga2V5KSkge1xuICAgICAgaWYgKGtleSA9PT0gJ2VudicpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWdba2V5XSwgb2JqW2tleV0pO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdhbGlhcycpIHtcbiAgICAgICAgY29uc3QgdmFsID0gb2JqW2tleV07XG4gICAgICAgIHZhbCAmJiBzZXRBbGlhcyh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kdWxlQ29uZmlnW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICB3YXJuKGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gXCIke2tleX1cIi5gKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NBbGlhcyh1cmw6IHN0cmluZyk6IFtzdHJpbmcsIEFycmF5PHN0cmluZz4gfCB1bmRlZmluZWRdIHtcbiAgLy8gSWYgdXJsIGlzIGFuIGFsaWFzXG4gIGlmICh1cmwgJiYgdXJsLnN0YXJ0c1dpdGgoTUFSS0VSKSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gdXJsLnNsaWNlKE1BUktFUi5sZW5ndGgpLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgbmFtZSA9IHNlZ21lbnRzWzBdO1xuICAgIGNvbnN0IHJlYWxVcmwgPSBtb2R1bGVDb25maWcuYWxpYXNbbmFtZV07XG4gICAgYXNzZXJ0KHJlYWxVcmwsIGBBbGlhcyBcIiR7bmFtZX1cIiBpcyBub3QgZGVmaW5lZC5gKTtcbiAgICByZXR1cm4gW3JlYWxVcmwsIHNlZ21lbnRzXTtcbiAgfVxuICByZXR1cm4gW3VybCwgdW5kZWZpbmVkXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5PYmplY3QoXG4gIG9iajogUmVjb3JkPHN0cmluZywgYW55PixcbiAgc2VnbWVudHM/OiBBcnJheTxzdHJpbmc+LFxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNlZ21lbnRzKSkge1xuICAgIGNvbnN0IGwgPSBzZWdtZW50cy5sZW5ndGg7XG4gICAgaWYgKGwgPiAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBwID0gc2VnbWVudHNbaV07XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgaXNPYmplY3Qob2JqKSxcbiAgICAgICAgICBgUmVtb3RlIG1vZHVsZSBcIiR7c2VnbWVudHMuc2xpY2UoMCwgaSkuam9pbignLicpfVwiIGlzICR7b2JqfSwgY2Fubm90IGdldCBcIiR7cH1cIiBhdHRyaWJ1dGUgZnJvbSBpdC5gLFxuICAgICAgICApO1xuICAgICAgICBvYmogPSBvYmpbcF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmo7XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0LCBpc0Fic29sdXRlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBwcm9jZXNzQWxpYXMgfSBmcm9tICcuL3NldE1vZHVsZUNvbmZpZyc7XG5pbXBvcnQgeyBsb2FkZXIsIHJlc291cmNlc1N0b3JlIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLy8gUHJlbG9hZCB0aGUgc3RhdGljIHJlc291cmNlcyBvZiB0aGUgbW9kdWxlLCBzbyB0aGF0IHRoZSBtb2R1bGUgY2FuIGJlIGxvYWRlZCBzeW5jaHJvbm91c2x5XG5leHBvcnQgZnVuY3Rpb24gcHJlbG9hZCh1cmxzOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh1cmxzKSkgdXJscyA9IFt1cmxzXTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgdXJscy5tYXAoKHVybCkgPT4ge1xuICAgICAgdXJsID0gcHJvY2Vzc0FsaWFzKHVybClbMF07XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGlzQWJzb2x1dGUodXJsKSxcbiAgICAgICAgYFRoZSBsb2FkaW5nIG9mIHRoZSByZW1vdGUgbW9kdWxlIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aC4gXCIke3VybH1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGxvYWRlci5sb2FkTW9kdWxlKHVybCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5yZXNvdXJjZU1hbmFnZXIpIHtcbiAgICAgICAgICBkYXRhLnJlc291cmNlTWFuYWdlci5vcmlnaW5VcmwgPSB1cmw7XG4gICAgICAgICAgcmVzb3VyY2VzU3RvcmUucHVzaChkYXRhLnJlc291cmNlTWFuYWdlcik7XG4gICAgICAgICAgaG9va3MubGlmZWN5Y2xlLnByZWxvYWRlZC5lbWl0KGRhdGEucmVzb3VyY2VNYW5hZ2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgIH0pLFxuICApO1xufVxuIiwgImltcG9ydCB7IGlzT2JqZWN0LCBpc1Byb21pc2UgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5cbnR5cGUgRVNNb2R1bGVSZXN1bHQ8VD4gPSB7XG4gIGRlZmF1bHQ6IFQ7XG4gIF9fZXNNb2R1bGU6IHRydWU7XG59O1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmV4cG9ydCBmdW5jdGlvbiBlc01vZHVsZTxUIGV4dGVuZHMgUHJvbWlzZTxhbnk+PihvYmo6IFQpOiBQcm9taXNlPEVTTW9kdWxlUmVzdWx0PFQgZXh0ZW5kcyBQcm9taXNlPGluZmVyIFA+ID8gUCA6IFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBlc01vZHVsZTxUIGV4dGVuZHMgRVNNb2R1bGVSZXN1bHQ8YW55Pj4ob2JqOiBUKTogVDtcbmV4cG9ydCBmdW5jdGlvbiBlc01vZHVsZTxUPihvYmo6IFQpOiBFU01vZHVsZVJlc3VsdDxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVzTW9kdWxlKG9iajogYW55KSB7XG4gIGlmIChpc09iamVjdChvYmopICYmIG9iai5fX2VzTW9kdWxlID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIGlmIChpc1Byb21pc2Uob2JqKSkge1xuICAgIHJldHVybiBvYmoudGhlbihlc01vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXNtID0geyBkZWZhdWx0OiBvYmogfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXNtLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgcmV0dXJuIGVzbTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGVycm9yLCBhc3NlcnQsIGlzUHJvbWlzZSwgaXNBYnNvbHV0ZSB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7XG4gIE1vZHVsZUluZm8sXG4gIGNhY2hlTW9kdWxlcyxcbiAgcHVyaWZ5T3B0aW9ucyxcbiAgcHJldHRpZnlFcnJvcixcbiAgZ2V0TW9kdWxlTWFuYWdlcixcbiAgTW9kdWxlQ29uZmlnLFxufSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBBY3R1YXRvciB9IGZyb20gJy4uL2FjdHVhdG9yJztcbmltcG9ydCB7IHByb2Nlc3NBbGlhcywgZ2V0VmFsdWVJbk9iamVjdCB9IGZyb20gJy4vc2V0TW9kdWxlQ29uZmlnJztcblxuLy8gSWYgd2Ugd2FudCB0byBoYXZlIHBlcmZlY3Qgc3luY2hyb25pemF0aW9uIHN5bnRheCB0byBsb2FkIHJlbW90ZSBtb2R1bGVzLFxuLy8gdGhlIHNvdXJjZSBjb2RlIG9mIHRoZSBjaGlsZCBhcHBsaWNhdGlvbiBtdXN0IGJlIGFuYWx5emVkIHNvIHRoYXQgaXQgY2FuIGJlIGxvYWRlZCBvbiBkZW1hbmQuXG4vLyBJbiB0aGUgZnV0dXJlLCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgZ2FyZmlzaCBzdXBwb3J0cyBlc01vZHVsZSxcbi8vIFRvIGNvbnNpZGVyIGxvYWRpbmcgcmVtb3RlIG1vZHVsZXMgb24gZGVtYW5kIHdoZW4gdXNpbmcgc3luY2hyb25vdXMgc3ludGF4LlxuLy8gRS5nLlxuLy8gMS4gZXNNb2R1bGUgLSBTdGF0aWMgYW5hbHlzaXMsIHJlY3Vyc2l2ZWx5IGJ1aWxkIGRlcGVuZGVuY3kgdHJlZS5cbi8vIDIuIHdlYnBhY2sgLSBBbmFseXplIHRoZSBzb3VyY2UgY29kZSBhc3QgYW5kIGJ1aWxkIGludG8gZGlmZmVyZW50IHBhY2thZ2UgdmVyc2lvbnMuXG5cbmNvbnN0IHRocm93V2FybiA9IChhbGlhczogc3RyaW5nLCB1cmw6IHN0cmluZykgPT4ge1xuICBlcnJvcihcbiAgICBwcmV0dGlmeUVycm9yKFxuICAgICAgYFRoZSBjdXJyZW50IG1vZHVsZSByZXR1cm4gYSBwcm9taXNlLCBZb3Ugc2hvdWxkIHVzZSBcImxvYWRNb2R1bGUoJyR7dXJsfScpXCIuYCxcbiAgICAgIGFsaWFzLFxuICAgICAgdXJsLFxuICAgICksXG4gICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZE1vZHVsZVN5bmMoXG4gIHVybE9yQWxpYXM6IHN0cmluZyxcbiAgb3B0aW9ucz86IE1vZHVsZUNvbmZpZyxcbik6IFJlY29yZDxzdHJpbmcsIGFueT4gfCBudWxsIHtcbiAgY29uc3QgZGF0YSA9IGhvb2tzLmxpZmVjeWNsZS5iZWZvcmVMb2FkTW9kdWxlLmVtaXQoe1xuICAgIG9wdGlvbnMsXG4gICAgdXJsOiB1cmxPckFsaWFzLFxuICB9KTtcbiAgdXJsT3JBbGlhcyA9IGRhdGEudXJsO1xuICBvcHRpb25zID0gZGF0YS5vcHRpb25zO1xuXG4gIGFzc2VydCh1cmxPckFsaWFzLCAnTWlzc2luZyB1cmwgZm9yIGxvYWRpbmcgcmVtb3RlIG1vZHVsZS4nKTtcbiAgYXNzZXJ0KFxuICAgIHR5cGVvZiB1cmxPckFsaWFzID09PSAnc3RyaW5nJyxcbiAgICAnVGhlIHR5cGUgb2YgVVJMIG5lZWRzIHRvIGJlIGEgc3RyaW5nLicsXG4gICk7XG4gIGNvbnN0IFt1cmwsIHNlZ21lbnRzXSA9IHByb2Nlc3NBbGlhcyh1cmxPckFsaWFzKTtcbiAgYXNzZXJ0KFxuICAgIGlzQWJzb2x1dGUodXJsKSB8fCB1cmwuc3RhcnRzV2l0aCgnLy8nKSxcbiAgICBgVGhlIGxvYWRpbmcgb2YgdGhlIHJlbW90ZSBtb2R1bGUgbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoLiBcIiR7dXJsfVwiYCxcbiAgKTtcblxuICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0IGluZm8gPSBwdXJpZnlPcHRpb25zKHVybCwgb3B0aW9ucyk7XG4gIGNvbnN0IHsgY2FjaGUsIHZlcnNpb24sIGV4dGVybmFscywgZXJyb3IsIGFkYXB0ZXIgfSA9IGluZm87XG4gIGNvbnN0IHVybFdpdGhWZXJzaW9uID0gYCR7dmVyc2lvbiB8fCAnbGF0ZXN0J31AJHt1cmx9YDtcbiAgY29uc3QgbW9kdWxlID0gY2FjaGVNb2R1bGVzW3VybFdpdGhWZXJzaW9uXTtcbiAgY29uc3QgYWxpYXMgPSBzZWdtZW50cyA/IHNlZ21lbnRzWzBdIDogJyc7XG5cbiAgaWYgKGNhY2hlICYmIG1vZHVsZSkge1xuICAgIGlzUHJvbWlzZShtb2R1bGUpICYmIHRocm93V2FybihhbGlhcywgdXJsKTtcbiAgICByZXN1bHQgPSBnZXRWYWx1ZUluT2JqZWN0KG1vZHVsZSwgc2VnbWVudHMpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG1hbmFnZXIgPSBnZXRNb2R1bGVNYW5hZ2VyKHVybCk7XG4gICAgYXNzZXJ0KFxuICAgICAgbWFuYWdlcixcbiAgICAgIGBTeW5jaHJvbm91c2x5IGxvYWQgbW9kdWxlIG11c3QgbG9hZCByZXNvdXJjZXMgaW4gYWR2YW5jZS4gXCIke3VybH1cImAsXG4gICAgKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhY3R1YXRvciA9IG5ldyBBY3R1YXRvcihtYW5hZ2VyLCBleHRlcm5hbHMpO1xuICAgICAgY2FjaGVNb2R1bGVzW3VybFdpdGhWZXJzaW9uXSA9IGFjdHVhdG9yLmVudi5leHBvcnRzO1xuICAgICAgbGV0IGV4cG9ydHMgPSBhY3R1YXRvci5leGVjU2NyaXB0KCkuZXhwb3J0cztcblxuICAgICAgaWYgKHR5cGVvZiBhZGFwdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGV4cG9ydHMgPSBhZGFwdGVyKGV4cG9ydHMpO1xuICAgICAgfVxuICAgICAgZXhwb3J0cyA9IGhvb2tzLmxpZmVjeWNsZS5hZnRlckxvYWRNb2R1bGUuZW1pdCh7XG4gICAgICAgIHVybCxcbiAgICAgICAgZXhwb3J0cyxcbiAgICAgICAgY29kZTogbWFuYWdlci5tb2R1bGVDb2RlLFxuICAgICAgfSkuZXhwb3J0cztcblxuICAgICAgaXNQcm9taXNlKGV4cG9ydHMpICYmIHRocm93V2FybihhbGlhcywgdXJsKTtcbiAgICAgIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl0gPSBleHBvcnRzO1xuICAgICAgcmVzdWx0ID0gZ2V0VmFsdWVJbk9iamVjdChleHBvcnRzLCBzZWdtZW50cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVsZXRlIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl07XG4gICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdCA9IGVycm9yKGUsIGluZm8sIGFsaWFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IHByZXR0aWZ5RXJyb3IoZSwgYWxpYXMsIHVybCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCAiaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7IGxvYWRlciwgY2FjaGVNb2R1bGVzIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgcHJlbG9hZCB9IGZyb20gJy4vYXBpcy9wcmVsb2FkJztcbmltcG9ydCB7IGVzTW9kdWxlIH0gZnJvbSAnLi9hcGlzL2VzTW9kdWxlJztcbmltcG9ydCB7IGxvYWRNb2R1bGUgfSBmcm9tICcuL2FwaXMvbG9hZE1vZHVsZSc7XG5pbXBvcnQgeyBsb2FkTW9kdWxlU3luYyB9IGZyb20gJy4vYXBpcy9sb2FkTW9kdWxlU3luYyc7XG5pbXBvcnQgeyBzZXRNb2R1bGVDb25maWcgfSBmcm9tICcuL2FwaXMvc2V0TW9kdWxlQ29uZmlnJztcblxuLy8gUmVtb3RlIG1vZHVsZSBsb2FkZXIgdXNlcyBzaW5nbGV0b24gbW9kZVxuY29uc3QgQXBpcyA9IHtcbiAgcHJlbG9hZCxcbiAgZXNNb2R1bGUsXG4gIGxvYWRNb2R1bGUsXG4gIGxvYWRNb2R1bGVTeW5jLFxuICBzZXRNb2R1bGVDb25maWcsXG4gIGhvb2tzLFxuICBsb2FkZXIsXG4gIGNhY2hlTW9kdWxlcyxcbn07XG5cbmV4cG9ydCB7XG4gIHByZWxvYWQsXG4gIGVzTW9kdWxlLFxuICBsb2FkTW9kdWxlLFxuICBsb2FkTW9kdWxlU3luYyxcbiAgc2V0TW9kdWxlQ29uZmlnLFxuICBob29rcyxcbiAgbG9hZGVyLFxuICBjYWNoZU1vZHVsZXMsXG4gIEFwaXMgYXMgZGVmYXVsdCxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQk8sSUFBTSxRQUFRLElBQUksYUFBYTtBQUFBLEVBQ3BDLFdBQVcsSUFBSTtBQUFBLEVBQ2YsWUFBWSxJQUFJLFNBQTBCO0FBQUEsRUFDMUMsa0JBQWtCLElBQUksa0JBQWtDO0FBQUEsRUFDeEQsdUJBQXVCLElBQUksbUJBQ3pCO0FBQUEsRUFFRixpQkFBaUIsSUFBSSxrQkFBaUM7QUFBQSxFQUN0RCxzQkFBc0IsSUFBSSxtQkFDeEI7QUFBQTs7O0FDOUJKO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0RBOzs7QUNBQTtBQUtPLHFCQUFlO0FBQUEsRUFJcEIsWUFBWSxTQUF3QixXQUFpQztBQUNuRSxTQUFLLFVBQVU7QUFDZixTQUFLLE1BQU07QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLFNBQVMsQ0FBQyxRQUFLO0FBZHJCO0FBZVMsNkJBQWEsSUFBSSxRQUNqQixhQUFhLGFBQWEsYUFBYSxVQUFVLFFBQ2xELCtDQUFZLFlBQVosbUJBQXFCLFVBQVU7QUFBQTtBQUFBO0FBRW5DLFNBQUssSUFBSSxTQUFTLEtBQUs7QUFDdkIsVUFBTSxVQUFVLFdBQVcsS0FBSztBQUFBO0FBQUEsRUFHbEMsYUFBYTtBQUNYLFVBQU0sRUFBRSxLQUFLLGVBQWUsS0FBSztBQUNqQyxRQUFJLFlBQVk7QUFFZCxpQkFBVyxXQUFXLFlBQVksS0FBSyxLQUFLLEtBQUssRUFBRSxTQUFTO0FBQUEsV0FDdkQ7QUFDTCxZQUFNLFlBQVk7QUFBQSxFQUFLLE1BQU0saUJBQWlCO0FBQUEsSUFBVTtBQUN4RCxrQkFBWSxJQUFJO0FBQUEsRUFBZSxhQUFhLEtBQUssS0FBSztBQUFBO0FBRXhE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
