var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
  cacheModules: () => cacheModules,
  default: () => Apis,
  esModule: () => esModule,
  hooks: () => hooks,
  loadModule: () => loadModule,
  loadModuleSync: () => loadModuleSync,
  loader: () => loader,
  preload: () => preload,
  setModuleConfig: () => setModuleConfig
});

// src/hooks.ts
var import_hooks = require("@garfish/hooks");
var hooks = new import_hooks.PluginSystem({
  preloaded: new import_hooks.SyncHook(),
  initModule: new import_hooks.SyncHook("initModule"),
  beforeLoadModule: new import_hooks.SyncWaterfallHook("beforeLoadModule"),
  asyncBeforeLoadModule: new import_hooks.AsyncWaterfallHook("asyncBeforeLoadModule"),
  afterLoadModule: new import_hooks.SyncWaterfallHook("afterLoadModule"),
  asyncAfterLoadModule: new import_hooks.AsyncWaterfallHook("asyncAfterLoadModule")
});

// src/common.ts
var import_loader = require("@garfish/loader");
var import_utils4 = require("@garfish/utils");

// src/apis/loadModule.ts
var import_utils3 = require("@garfish/utils");

// src/actuator.ts
var import_utils = require("@garfish/utils");
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
      (0, import_utils.evalWithEnv)(`;${moduleCode}
${sourceUrl}`, this.env, window);
    }
    return this.env;
  }
};

// src/apis/setModuleConfig.ts
var import_utils2 = require("@garfish/utils");
var MARKER = "@";
var setAlias = (obj) => {
  for (const key in obj) {
    const value = obj[key];
    (0, import_utils2.assert)((0, import_utils2.isAbsolute)(value), `The loading of the remote module must be an absolute path. "${value}"`);
    moduleConfig.alias[key] = value;
  }
};
function setModuleConfig(obj) {
  (0, import_utils2.assert)((0, import_utils2.isPlainObject)(obj), "Module configuration must be an object.");
  for (const key in obj) {
    if ((0, import_utils2.hasOwn)(moduleConfig, key)) {
      if (key === "env") {
        Object.assign(moduleConfig[key], obj[key]);
      } else if (key === "alias") {
        const val = obj[key];
        val && setAlias(val);
      } else {
        moduleConfig[key] = obj[key];
      }
    } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      (0, import_utils2.warn)(`Invalid configuration "${key}".`);
    }
  }
}
function processAlias(url) {
  if (url && url.startsWith(MARKER)) {
    const segments = url.slice(MARKER.length).split(".");
    const name = segments[0];
    const realUrl = moduleConfig.alias[name];
    (0, import_utils2.assert)(realUrl, `Alias "${name}" is not defined.`);
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
        (0, import_utils2.assert)((0, import_utils2.isObject)(obj), `Remote module "${segments.slice(0, i).join(".")}" is ${obj}, cannot get "${p}" attribute from it.`);
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
  (0, import_utils3.assert)(urlOrAlias, "Missing url for loading remote module.");
  (0, import_utils3.assert)(typeof urlOrAlias === "string", "The type of URL needs to be a string.");
  const [url, segments] = processAlias(urlOrAlias);
  (0, import_utils3.assert)((0, import_utils3.isAbsolute)(url) || url.startsWith("//"), `The loading of the remote module must be an absolute path. "${url}"`);
  const info = purifyOptions(url, options);
  const { cache, version, externals, error: error2, adapter } = info;
  const urlWithVersion = `${version || "latest"}@${url}`;
  const asyncLoadProcess = async () => {
    let result = null;
    let module2 = cacheModules[urlWithVersion];
    if (cache && module2) {
      if ((0, import_utils3.isPromise)(module2)) {
        module2 = await module2;
      }
      result = getValueInObject(module2, segments);
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
          if ((0, import_utils3.isPromise)(exports)) {
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
(0, import_utils4.safeWrapper)(() => {
  garfishGlobalEnv = __GARFISH_GLOBAL_ENV__;
  if ((0, import_utils4.isObject)(garfishGlobalEnv)) {
    const { externals, currentApp: app, remoteModulesCode } = garfishGlobalEnv;
    if (app) {
      currentApp = app;
    }
    if ((0, import_utils4.isObject)(externals)) {
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
  if ((0, import_utils4.isObject)(garfishGlobalEnv)) {
    const loader2 = garfishGlobalEnv.loader;
    if ((0, import_utils4.isObject)(loader2) && loader2.personalId === import_utils4.__LOADER_FLAG__) {
      return loader2;
    }
  }
  return new import_loader.Loader();
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
  if ((0, import_utils4.isPlainObject)(options)) {
    const curExternals = options.externals;
    delete options.externals;
    config = (0, import_utils4.deepMerge)(moduleConfig, __spreadProps(__spreadValues({}, options), { url: urlOrAlias }));
    options.externals = curExternals;
    config.externals = __spreadValues(__spreadValues({}, globalExternals), curExternals);
  } else {
    config = (0, import_utils4.deepMerge)(moduleConfig, { url: urlOrAlias });
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
var import_utils5 = require("@garfish/utils");
function preload(urls) {
  if (!Array.isArray(urls))
    urls = [urls];
  return Promise.all(urls.map((url) => {
    url = processAlias(url)[0];
    (0, import_utils5.assert)((0, import_utils5.isAbsolute)(url), `The loading of the remote module must be an absolute path. "${url}"`);
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
var import_utils6 = require("@garfish/utils");
function esModule(obj) {
  if ((0, import_utils6.isObject)(obj) && obj.__esModule === true) {
    return obj;
  } else if ((0, import_utils6.isPromise)(obj)) {
    return obj.then(esModule);
  } else {
    const esm = { default: obj };
    Object.defineProperty(esm, "__esModule", { value: true });
    return esm;
  }
}

// src/apis/loadModuleSync.ts
var import_utils7 = require("@garfish/utils");
var throwWarn = (alias, url) => {
  (0, import_utils7.error)(prettifyError(`The current module return a promise, You should use "loadModule('${url}')".`, alias, url));
};
function loadModuleSync(urlOrAlias, options) {
  const data = hooks.lifecycle.beforeLoadModule.emit({
    options,
    url: urlOrAlias
  });
  urlOrAlias = data.url;
  options = data.options;
  (0, import_utils7.assert)(urlOrAlias, "Missing url for loading remote module.");
  (0, import_utils7.assert)(typeof urlOrAlias === "string", "The type of URL needs to be a string.");
  const [url, segments] = processAlias(urlOrAlias);
  (0, import_utils7.assert)((0, import_utils7.isAbsolute)(url) || url.startsWith("//"), `The loading of the remote module must be an absolute path. "${url}"`);
  let result = null;
  const info = purifyOptions(url, options);
  const { cache, version, externals, error: error2, adapter } = info;
  const urlWithVersion = `${version || "latest"}@${url}`;
  const module2 = cacheModules[urlWithVersion];
  const alias = segments ? segments[0] : "";
  if (cache && module2) {
    (0, import_utils7.isPromise)(module2) && throwWarn(alias, url);
    result = getValueInObject(module2, segments);
  } else {
    const manager = getModuleManager(url);
    (0, import_utils7.assert)(manager, `Synchronously load module must load resources in advance. "${url}"`);
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
      (0, import_utils7.isPromise)(exports) && throwWarn(alias, url);
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
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cacheModules,
  esModule,
  hooks,
  loadModule,
  loadModuleSync,
  loader,
  preload,
  setModuleConfig
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9ob29rcy50cyIsICIuLi9zcmMvY29tbW9uLnRzIiwgIi4uL3NyYy9hcGlzL2xvYWRNb2R1bGUudHMiLCAiLi4vc3JjL2FjdHVhdG9yLnRzIiwgIi4uL3NyYy9hcGlzL3NldE1vZHVsZUNvbmZpZy50cyIsICIuLi9zcmMvYXBpcy9wcmVsb2FkLnRzIiwgIi4uL3NyYy9hcGlzL2VzTW9kdWxlLnRzIiwgIi4uL3NyYy9hcGlzL2xvYWRNb2R1bGVTeW5jLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBob29rcyB9IGZyb20gJy4vaG9va3MnO1xuaW1wb3J0IHsgbG9hZGVyLCBjYWNoZU1vZHVsZXMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBwcmVsb2FkIH0gZnJvbSAnLi9hcGlzL3ByZWxvYWQnO1xuaW1wb3J0IHsgZXNNb2R1bGUgfSBmcm9tICcuL2FwaXMvZXNNb2R1bGUnO1xuaW1wb3J0IHsgbG9hZE1vZHVsZSB9IGZyb20gJy4vYXBpcy9sb2FkTW9kdWxlJztcbmltcG9ydCB7IGxvYWRNb2R1bGVTeW5jIH0gZnJvbSAnLi9hcGlzL2xvYWRNb2R1bGVTeW5jJztcbmltcG9ydCB7IHNldE1vZHVsZUNvbmZpZyB9IGZyb20gJy4vYXBpcy9zZXRNb2R1bGVDb25maWcnO1xuXG4vLyBSZW1vdGUgbW9kdWxlIGxvYWRlciB1c2VzIHNpbmdsZXRvbiBtb2RlXG5jb25zdCBBcGlzID0ge1xuICBwcmVsb2FkLFxuICBlc01vZHVsZSxcbiAgbG9hZE1vZHVsZSxcbiAgbG9hZE1vZHVsZVN5bmMsXG4gIHNldE1vZHVsZUNvbmZpZyxcbiAgaG9va3MsXG4gIGxvYWRlcixcbiAgY2FjaGVNb2R1bGVzLFxufTtcblxuZXhwb3J0IHtcbiAgcHJlbG9hZCxcbiAgZXNNb2R1bGUsXG4gIGxvYWRNb2R1bGUsXG4gIGxvYWRNb2R1bGVTeW5jLFxuICBzZXRNb2R1bGVDb25maWcsXG4gIGhvb2tzLFxuICBsb2FkZXIsXG4gIGNhY2hlTW9kdWxlcyxcbiAgQXBpcyBhcyBkZWZhdWx0LFxufTtcbiIsICJpbXBvcnQgdHlwZSB7IE1vZHVsZU1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHtcbiAgUGx1Z2luU3lzdGVtLFxuICBTeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIEFzeW5jV2F0ZXJmYWxsSG9vayxcbn0gZnJvbSAnQGdhcmZpc2gvaG9va3MnO1xuaW1wb3J0IHR5cGUgeyBBY3R1YXRvciB9IGZyb20gJy4vYWN0dWF0b3InO1xuaW1wb3J0IHR5cGUgeyBNb2R1bGVDb25maWcsIE1vZHVsZUluZm8gfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmVmb3JlTG9hZEFyZ3Mge1xuICB1cmw6IHN0cmluZztcbiAgb3B0aW9ucz86IE1vZHVsZUNvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBhZnRlckxvYWRBcmdzIHtcbiAgdXJsOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgZXhwb3J0czogUmVjb3JkPHN0cmluZywgYW55Pjtcbn1cblxuZXhwb3J0IGNvbnN0IGhvb2tzID0gbmV3IFBsdWdpblN5c3RlbSh7XG4gIHByZWxvYWRlZDogbmV3IFN5bmNIb29rPFtNb2R1bGVNYW5hZ2VyXSwgYW55PigpLFxuICBpbml0TW9kdWxlOiBuZXcgU3luY0hvb2s8W0FjdHVhdG9yXSwgYW55PignaW5pdE1vZHVsZScpLFxuICBiZWZvcmVMb2FkTW9kdWxlOiBuZXcgU3luY1dhdGVyZmFsbEhvb2s8QmVmb3JlTG9hZEFyZ3M+KCdiZWZvcmVMb2FkTW9kdWxlJyksXG4gIGFzeW5jQmVmb3JlTG9hZE1vZHVsZTogbmV3IEFzeW5jV2F0ZXJmYWxsSG9vazxCZWZvcmVMb2FkQXJncz4oXG4gICAgJ2FzeW5jQmVmb3JlTG9hZE1vZHVsZScsXG4gICksXG4gIGFmdGVyTG9hZE1vZHVsZTogbmV3IFN5bmNXYXRlcmZhbGxIb29rPGFmdGVyTG9hZEFyZ3M+KCdhZnRlckxvYWRNb2R1bGUnKSxcbiAgYXN5bmNBZnRlckxvYWRNb2R1bGU6IG5ldyBBc3luY1dhdGVyZmFsbEhvb2s8YWZ0ZXJMb2FkQXJncz4oXG4gICAgJ2FzeW5jQWZ0ZXJMb2FkTW9kdWxlJyxcbiAgKSxcbn0pO1xuIiwgImltcG9ydCB7IExvYWRlciwgTW9kdWxlTWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgZGVlcE1lcmdlLFxuICBzYWZlV3JhcHBlcixcbiAgX19MT0FERVJfRkxBR19fLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBsb2FkTW9kdWxlIH0gZnJvbSAnLi9hcGlzL2xvYWRNb2R1bGUnO1xuXG50eXBlIFBhcnRpYWxQYXJ0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IHtcbiAgW1AgaW4gRXhjbHVkZTxrZXlvZiBULCBLPl0tPzogVFtQXTtcbn0gJiB7XG4gIFtQIGluIEtdPzogVFtQXTtcbn07XG5cbmV4cG9ydCB0eXBlIE1vZHVsZUNvbmZpZyA9IFBhcnRpYWxQYXJ0PFxuICBSZXF1aXJlZDxPbWl0PE1vZHVsZUluZm8sICd2ZXJzaW9uJz4gJiB7IGFsaWFzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IH0+LFxuICAnZXh0ZXJuYWxzJ1xuPjtcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVJbmZvIHtcbiAgY2FjaGU6IGJvb2xlYW47XG4gIHZlcnNpb246IHN0cmluZztcbiAgZXh0ZXJuYWxzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICBlcnJvcjogbnVsbCB8ICgoZXJyOiBFcnJvciwgaW5mbzogTW9kdWxlSW5mbywgYWxpYXM6IHN0cmluZykgPT4gYW55KTtcbiAgYWRhcHRlcjogbnVsbCB8ICgoY2pzTW9kdWxlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTtcbn1cblxuZXhwb3J0IGxldCBjdXJyZW50QXBwOiBhbnk7XG5leHBvcnQgbGV0IHJlc291cmNlc1N0b3JlOiBBcnJheTxNb2R1bGVNYW5hZ2VyPiA9IFtdO1xuZXhwb3J0IGNvbnN0IGNhY2hlTW9kdWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5leHBvcnQgY29uc3QgZmV0Y2hMb2FkaW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmV4cG9ydCBjb25zdCBtb2R1bGVDb25maWc6IE1vZHVsZUNvbmZpZyA9IHtcbiAgYWxpYXM6IHt9LFxuICBjYWNoZTogdHJ1ZSwgLy8gRGVmYXVsdCB1c2UgY2FjaGVcbiAgZXJyb3I6IG51bGwsXG4gIGFkYXB0ZXI6IG51bGwsXG4gIGV4dGVybmFsczoge1xuICAgIGxvYWRNb2R1bGUsIC8vIE9ubHkgYGxvYWRNb2R1bGVgIGlzIHByb3ZpZGVkIGZvciB1c2UgYnkgcmVtb3RlIG1vZHVsZXNcbiAgfSxcbn07XG5cbi8vIElmIGdhcmZpc2ggaGFzIHByZS1wcmVwYXJlZCBkYXRhXG5sZXQgZ2FyZmlzaEdsb2JhbEVudjtcblxuc2FmZVdyYXBwZXIoKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIGdhcmZpc2hHbG9iYWxFbnYgPSBfX0dBUkZJU0hfR0xPQkFMX0VOVl9fO1xuXG4gIC8vIEluaGVyaXQgdGhlIGNvbmZpZ3VyYXRpb24gZnJvbSBnYXJmaXNoXG4gIGlmIChpc09iamVjdChnYXJmaXNoR2xvYmFsRW52KSkge1xuICAgIGNvbnN0IHsgZXh0ZXJuYWxzLCBjdXJyZW50QXBwOiBhcHAsIHJlbW90ZU1vZHVsZXNDb2RlIH0gPSBnYXJmaXNoR2xvYmFsRW52O1xuICAgIGlmIChhcHApIHtcbiAgICAgIGN1cnJlbnRBcHAgPSBhcHA7XG4gICAgfVxuICAgIGlmIChpc09iamVjdChleHRlcm5hbHMpKSB7XG4gICAgICBPYmplY3QuYXNzaWduKG1vZHVsZUNvbmZpZy5leHRlcm5hbHMsIGV4dGVybmFscyk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlbW90ZU1vZHVsZXNDb2RlKSkge1xuICAgICAgcmVzb3VyY2VzU3RvcmUgPSByZXNvdXJjZXNTdG9yZS5jb25jYXQocmVtb3RlTW9kdWxlc0NvZGUpO1xuICAgICAgcmVtb3RlTW9kdWxlc0NvZGUuZm9yRWFjaCgobWFuYWdlcikgPT4ge1xuICAgICAgICBpZiAobWFuYWdlci5hbGlhcykge1xuICAgICAgICAgIG1vZHVsZUNvbmZpZy5hbGlhc1ttYW5hZ2VyLmFsaWFzXSA9IG1hbmFnZXIudXJsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbG9hZGVyOiBMb2FkZXIgPSAoKCkgPT4ge1xuICBpZiAoaXNPYmplY3QoZ2FyZmlzaEdsb2JhbEVudikpIHtcbiAgICBjb25zdCBsb2FkZXIgPSBnYXJmaXNoR2xvYmFsRW52LmxvYWRlcjtcbiAgICAvLyBHYXJmaXNoIGxvYWRlciB3aWxsIGhhdmUgYW4gaWRlbnRpZmllclxuICAgIGlmIChpc09iamVjdChsb2FkZXIpICYmIGxvYWRlci5wZXJzb25hbElkID09PSBfX0xPQURFUl9GTEFHX18pIHtcbiAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgTG9hZGVyKCk7XG59KSgpO1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlTWFuYWdlciA9ICh1cmw6IHN0cmluZykgPT4ge1xuICBpZiAodXJsKSB7XG4gICAgLy8gRG8gbm90IHVzZSByZWRpcmVjdGVkIHVybFxuICAgIHJldHVybiByZXNvdXJjZXNTdG9yZS5maW5kKChtYW5hZ2VyKSA9PiBtYW5hZ2VyLm9yaWdpblVybCA9PT0gdXJsKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHB1cmlmeU9wdGlvbnMgPSAodXJsT3JBbGlhczogc3RyaW5nLCBvcHRpb25zPzogTW9kdWxlQ29uZmlnKSA9PiB7XG4gIGxldCBjb25maWc7XG4gIGNvbnN0IGdsb2JhbEV4dGVybmFscyA9IG1vZHVsZUNvbmZpZy5leHRlcm5hbHM7XG4gIGRlbGV0ZSBtb2R1bGVDb25maWcuZXh0ZXJuYWxzO1xuXG4gIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgY29uc3QgY3VyRXh0ZXJuYWxzID0gb3B0aW9ucy5leHRlcm5hbHM7XG4gICAgZGVsZXRlIG9wdGlvbnMuZXh0ZXJuYWxzO1xuICAgIGNvbmZpZyA9IGRlZXBNZXJnZShtb2R1bGVDb25maWcsIHsgLi4ub3B0aW9ucywgdXJsOiB1cmxPckFsaWFzIH0pO1xuICAgIG9wdGlvbnMuZXh0ZXJuYWxzID0gY3VyRXh0ZXJuYWxzO1xuICAgIGNvbmZpZy5leHRlcm5hbHMgPSB7IC4uLmdsb2JhbEV4dGVybmFscywgLi4uY3VyRXh0ZXJuYWxzIH07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gZGVlcE1lcmdlKG1vZHVsZUNvbmZpZywgeyB1cmw6IHVybE9yQWxpYXMgfSk7XG4gICAgY29uZmlnLmV4dGVybmFscyA9IGdsb2JhbEV4dGVybmFscztcbiAgfVxuXG4gIG1vZHVsZUNvbmZpZy5leHRlcm5hbHMgPSBnbG9iYWxFeHRlcm5hbHM7XG5cbiAgcmV0dXJuIGNvbmZpZyBhcyBNb2R1bGVJbmZvICYge1xuICAgIHVybDogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXR0aWZ5RXJyb3IgPSAoXG4gIGVycm9yOiBFcnJvciB8IHN0cmluZyxcbiAgYWxpYXM6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG4pID0+IHtcbiAgY29uc3QgdGlwTWFya2VycyA9IFtjdXJyZW50QXBwICYmIGN1cnJlbnRBcHAubmFtZSwgYWxpYXMsIHVybF07XG4gIGxldCBwcmVmaXggPSB0aXBNYXJrZXJzLnJlZHVjZSgobXNnLCB2YWwsIGkpID0+IHtcbiAgICBpZiAoIXZhbCkgcmV0dXJuIG1zZztcbiAgICByZXR1cm4gaSA9PT0gdGlwTWFya2Vycy5sZW5ndGggLSAxXG4gICAgICA/IG1zZyArIGBcIiR7dmFsfVwiYFxuICAgICAgOiBtc2cgKyBgXCIke3ZhbH1cIiAtPiBgO1xuICB9LCAncmVtb3RlTW9kdWxlOiAnKTtcbiAgcHJlZml4ID0gYCAoJHtwcmVmaXh9KWA7XG5cbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ251bWJlcicpIHtcbiAgICBlcnJvciA9IFN0cmluZyhlcnJvcik7XG4gIH1cbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoIWVycm9yLmVuZHNXaXRoKHByZWZpeCkpIHtcbiAgICAgIHJldHVybiBgJHtlcnJvcn0ke3ByZWZpeH1gO1xuICAgIH1cbiAgfVxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGlmICghZXJyb3IubWVzc2FnZS5lbmRzV2l0aChwcmVmaXgpKSB7XG4gICAgICBlcnJvci5tZXNzYWdlID0gYCR7ZXJyb3IubWVzc2FnZX0ke3ByZWZpeH1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXJyb3I7XG59O1xuIiwgImltcG9ydCB7IGFzc2VydCwgaXNQcm9taXNlLCBpc0Fic29sdXRlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHtcbiAgbG9hZGVyLFxuICBNb2R1bGVJbmZvLFxuICBjYWNoZU1vZHVsZXMsXG4gIGZldGNoTG9hZGluZyxcbiAgcHVyaWZ5T3B0aW9ucyxcbiAgcHJldHRpZnlFcnJvcixcbiAgTW9kdWxlQ29uZmlnLFxufSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBBY3R1YXRvciB9IGZyb20gJy4uL2FjdHVhdG9yJztcbmltcG9ydCB7IHByb2Nlc3NBbGlhcywgZ2V0VmFsdWVJbk9iamVjdCB9IGZyb20gJy4vc2V0TW9kdWxlQ29uZmlnJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRNb2R1bGUoXG4gIHVybE9yQWxpYXM6IHN0cmluZyxcbiAgb3B0aW9ucz86IE1vZHVsZUNvbmZpZyxcbik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgYW55PiB8IG51bGw+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGhvb2tzLmxpZmVjeWNsZS5hc3luY0JlZm9yZUxvYWRNb2R1bGUuZW1pdCh7XG4gICAgb3B0aW9ucyxcbiAgICB1cmw6IHVybE9yQWxpYXMsXG4gIH0pO1xuICBpZiAoZGF0YSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHVybE9yQWxpYXMgPSBkYXRhLnVybDtcbiAgb3B0aW9ucyA9IGRhdGEub3B0aW9ucztcblxuICBhc3NlcnQodXJsT3JBbGlhcywgJ01pc3NpbmcgdXJsIGZvciBsb2FkaW5nIHJlbW90ZSBtb2R1bGUuJyk7XG4gIGFzc2VydChcbiAgICB0eXBlb2YgdXJsT3JBbGlhcyA9PT0gJ3N0cmluZycsXG4gICAgJ1RoZSB0eXBlIG9mIFVSTCBuZWVkcyB0byBiZSBhIHN0cmluZy4nLFxuICApO1xuICBjb25zdCBbdXJsLCBzZWdtZW50c10gPSBwcm9jZXNzQWxpYXModXJsT3JBbGlhcyk7XG4gIGFzc2VydChcbiAgICBpc0Fic29sdXRlKHVybCkgfHwgdXJsLnN0YXJ0c1dpdGgoJy8vJyksXG4gICAgYFRoZSBsb2FkaW5nIG9mIHRoZSByZW1vdGUgbW9kdWxlIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aC4gXCIke3VybH1cImAsXG4gICk7XG5cbiAgY29uc3QgaW5mbyA9IHB1cmlmeU9wdGlvbnModXJsLCBvcHRpb25zKTtcbiAgY29uc3QgeyBjYWNoZSwgdmVyc2lvbiwgZXh0ZXJuYWxzLCBlcnJvciwgYWRhcHRlciB9ID0gaW5mbztcbiAgY29uc3QgdXJsV2l0aFZlcnNpb24gPSBgJHt2ZXJzaW9uIHx8ICdsYXRlc3QnfUAke3VybH1gOyAvLyBgbGF0ZXN0QGh0dHBzOi8veHguanNgXG5cbiAgY29uc3QgYXN5bmNMb2FkUHJvY2VzcyA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IG1vZHVsZSA9IGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl07XG5cbiAgICBpZiAoY2FjaGUgJiYgbW9kdWxlKSB7XG4gICAgICBpZiAoaXNQcm9taXNlKG1vZHVsZSkpIHtcbiAgICAgICAgbW9kdWxlID0gYXdhaXQgbW9kdWxlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZ2V0VmFsdWVJbk9iamVjdChtb2R1bGUsIHNlZ21lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRlci5sb2FkTW9kdWxlKHVybCk7XG4gICAgICAgIGlmIChkYXRhLnJlc291cmNlTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IGFjdHVhdG9yID0gbmV3IEFjdHVhdG9yKGRhdGEucmVzb3VyY2VNYW5hZ2VyLCBleHRlcm5hbHMpO1xuICAgICAgICAgIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl0gPSBhY3R1YXRvci5lbnYuZXhwb3J0cztcbiAgICAgICAgICBsZXQgZXhwb3J0cyA9IGFjdHVhdG9yLmV4ZWNTY3JpcHQoKS5leHBvcnRzO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBhZGFwdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBleHBvcnRzID0gYWRhcHRlcihleHBvcnRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaG9va1Jlc3VsdCA9IGF3YWl0IGhvb2tzLmxpZmVjeWNsZS5hc3luY0FmdGVyTG9hZE1vZHVsZS5lbWl0KHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGV4cG9ydHMsXG4gICAgICAgICAgICBjb2RlOiBkYXRhLnJlc291cmNlTWFuYWdlci5tb2R1bGVDb2RlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChob29rUmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4cG9ydHMgPSBob29rUmVzdWx0LmV4cG9ydHM7XG5cbiAgICAgICAgICBjYWNoZU1vZHVsZXNbdXJsV2l0aFZlcnNpb25dID0gZXhwb3J0cztcbiAgICAgICAgICBpZiAoaXNQcm9taXNlKGV4cG9ydHMpKSB7XG4gICAgICAgICAgICBleHBvcnRzID0gYXdhaXQgZXhwb3J0cztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0ID0gZ2V0VmFsdWVJbk9iamVjdChleHBvcnRzLCBzZWdtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVsZXRlIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl07XG4gICAgICAgIGNvbnN0IGFsaWFzID0gc2VnbWVudHMgPyBzZWdtZW50c1swXSA6ICcnO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZXJyb3IoZSwgaW5mbywgYWxpYXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHByZXR0aWZ5RXJyb3IoZSwgYWxpYXMsIHVybCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBpZiAoZmV0Y2hMb2FkaW5nW3VybFdpdGhWZXJzaW9uXSkge1xuICAgIHJldHVybiBmZXRjaExvYWRpbmdbdXJsV2l0aFZlcnNpb25dLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gVGhlIG1vZHVsZXMgYXJlIHRoZSBzYW1lLCBidXQgdGhlIGFsaWFzZXMgbWF5IGJlIGRpZmZlcmVudFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjYWNoZU1vZHVsZXNbdXJsV2l0aFZlcnNpb25dKS50aGVuKChtKSA9PlxuICAgICAgICBnZXRWYWx1ZUluT2JqZWN0KG0sIHNlZ21lbnRzKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZmV0Y2hMb2FkaW5nW3VybFdpdGhWZXJzaW9uXSA9IGFzeW5jTG9hZFByb2Nlc3MoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBmZXRjaExvYWRpbmdbdXJsV2l0aFZlcnNpb25dID0gbnVsbDtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pO1xuICAgIHJldHVybiBmZXRjaExvYWRpbmdbdXJsV2l0aFZlcnNpb25dO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZXZhbFdpdGhFbnYgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBNb2R1bGVNYW5hZ2VyIH0gZnJvbSAnQGdhcmZpc2gvbG9hZGVyJztcbmltcG9ydCB7IGhvb2tzIH0gZnJvbSAnLi9ob29rcyc7XG5pbXBvcnQgeyBjdXJyZW50QXBwLCBtb2R1bGVDb25maWcgfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCBjbGFzcyBBY3R1YXRvciB7XG4gIHByaXZhdGUgbWFuYWdlcjogTW9kdWxlTWFuYWdlcjtcbiAgcHVibGljIGVudjogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihtYW5hZ2VyOiBNb2R1bGVNYW5hZ2VyLCBleHRlcm5hbHM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmVudiA9IHtcbiAgICAgIGV4cG9ydHM6IHt9LFxuICAgICAgbW9kdWxlOiBudWxsLFxuICAgICAgcmVxdWlyZTogKGtleSkgPT5cbiAgICAgICAgKGV4dGVybmFscyB8fCB7fSlba2V5XSB8fFxuICAgICAgICAobW9kdWxlQ29uZmlnLmV4dGVybmFscyAmJiBtb2R1bGVDb25maWcuZXh0ZXJuYWxzW2tleV0pIHx8XG4gICAgICAgIGN1cnJlbnRBcHA/LmNvbnRleHQ/LmV4dGVybmFsc1trZXldLFxuICAgIH07XG4gICAgdGhpcy5lbnYubW9kdWxlID0gdGhpcy5lbnY7XG4gICAgaG9va3MubGlmZWN5Y2xlLmluaXRNb2R1bGUuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIGV4ZWNTY3JpcHQoKSB7XG4gICAgY29uc3QgeyB1cmwsIG1vZHVsZUNvZGUgfSA9IHRoaXMubWFuYWdlcjtcbiAgICBpZiAoY3VycmVudEFwcCkge1xuICAgICAgLy8gQXZvaWQgY29uZmxpY3Qgd2l0aCBHYXJmaXNoIGNqc1xuICAgICAgY3VycmVudEFwcC5leGVjU2NyaXB0KG1vZHVsZUNvZGUsIHRoaXMuZW52LCB1cmwsIHsgbm9FbnRyeTogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc291cmNlVXJsID0gYFxcbiR7dXJsID8gYC8vIyBzb3VyY2VVUkw9JHt1cmx9XFxuYCA6ICcnfWA7XG4gICAgICBldmFsV2l0aEVudihgOyR7bW9kdWxlQ29kZX1cXG4ke3NvdXJjZVVybH1gLCB0aGlzLmVudiwgd2luZG93KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZW52O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgd2FybixcbiAgaGFzT3duLFxuICBhc3NlcnQsXG4gIGlzT2JqZWN0LFxuICBpc0Fic29sdXRlLFxuICBpc1BsYWluT2JqZWN0LFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBtb2R1bGVDb25maWcsIE1vZHVsZUNvbmZpZyB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8vIHNldE1vZHVsZUluZm8oeyBhbGlhczogeyB1dGlsczogJ2h0dHBzOi8veHguanMnIH0gfSk7XG4vLyBsb2FkTW9kdWxlKCdAdXRpbHMnKS50aGVuKCh1dGlscykgPT4ge30pO1xuY29uc3QgTUFSS0VSID0gJ0AnO1xuXG5jb25zdCBzZXRBbGlhcyA9IChvYmo6IE1vZHVsZUNvbmZpZ1snYWxpYXMnXSkgPT4ge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgIGFzc2VydChcbiAgICAgIGlzQWJzb2x1dGUodmFsdWUpLFxuICAgICAgYFRoZSBsb2FkaW5nIG9mIHRoZSByZW1vdGUgbW9kdWxlIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aC4gXCIke3ZhbHVlfVwiYCxcbiAgICApO1xuICAgIG1vZHVsZUNvbmZpZy5hbGlhc1trZXldID0gdmFsdWU7XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNb2R1bGVDb25maWcob2JqOiBQYXJ0aWFsPE1vZHVsZUNvbmZpZz4pIHtcbiAgYXNzZXJ0KGlzUGxhaW5PYmplY3Qob2JqKSwgJ01vZHVsZSBjb25maWd1cmF0aW9uIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duKG1vZHVsZUNvbmZpZywga2V5KSkge1xuICAgICAgaWYgKGtleSA9PT0gJ2VudicpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtb2R1bGVDb25maWdba2V5XSwgb2JqW2tleV0pO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdhbGlhcycpIHtcbiAgICAgICAgY29uc3QgdmFsID0gb2JqW2tleV07XG4gICAgICAgIHZhbCAmJiBzZXRBbGlhcyh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kdWxlQ29uZmlnW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICB3YXJuKGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gXCIke2tleX1cIi5gKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NBbGlhcyh1cmw6IHN0cmluZyk6IFtzdHJpbmcsIEFycmF5PHN0cmluZz4gfCB1bmRlZmluZWRdIHtcbiAgLy8gSWYgdXJsIGlzIGFuIGFsaWFzXG4gIGlmICh1cmwgJiYgdXJsLnN0YXJ0c1dpdGgoTUFSS0VSKSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gdXJsLnNsaWNlKE1BUktFUi5sZW5ndGgpLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgbmFtZSA9IHNlZ21lbnRzWzBdO1xuICAgIGNvbnN0IHJlYWxVcmwgPSBtb2R1bGVDb25maWcuYWxpYXNbbmFtZV07XG4gICAgYXNzZXJ0KHJlYWxVcmwsIGBBbGlhcyBcIiR7bmFtZX1cIiBpcyBub3QgZGVmaW5lZC5gKTtcbiAgICByZXR1cm4gW3JlYWxVcmwsIHNlZ21lbnRzXTtcbiAgfVxuICByZXR1cm4gW3VybCwgdW5kZWZpbmVkXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5PYmplY3QoXG4gIG9iajogUmVjb3JkPHN0cmluZywgYW55PixcbiAgc2VnbWVudHM/OiBBcnJheTxzdHJpbmc+LFxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNlZ21lbnRzKSkge1xuICAgIGNvbnN0IGwgPSBzZWdtZW50cy5sZW5ndGg7XG4gICAgaWYgKGwgPiAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBwID0gc2VnbWVudHNbaV07XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgaXNPYmplY3Qob2JqKSxcbiAgICAgICAgICBgUmVtb3RlIG1vZHVsZSBcIiR7c2VnbWVudHMuc2xpY2UoMCwgaSkuam9pbignLicpfVwiIGlzICR7b2JqfSwgY2Fubm90IGdldCBcIiR7cH1cIiBhdHRyaWJ1dGUgZnJvbSBpdC5gLFxuICAgICAgICApO1xuICAgICAgICBvYmogPSBvYmpbcF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmo7XG59XG4iLCAiaW1wb3J0IHsgYXNzZXJ0LCBpc0Fic29sdXRlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBwcm9jZXNzQWxpYXMgfSBmcm9tICcuL3NldE1vZHVsZUNvbmZpZyc7XG5pbXBvcnQgeyBsb2FkZXIsIHJlc291cmNlc1N0b3JlIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLy8gUHJlbG9hZCB0aGUgc3RhdGljIHJlc291cmNlcyBvZiB0aGUgbW9kdWxlLCBzbyB0aGF0IHRoZSBtb2R1bGUgY2FuIGJlIGxvYWRlZCBzeW5jaHJvbm91c2x5XG5leHBvcnQgZnVuY3Rpb24gcHJlbG9hZCh1cmxzOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh1cmxzKSkgdXJscyA9IFt1cmxzXTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgdXJscy5tYXAoKHVybCkgPT4ge1xuICAgICAgdXJsID0gcHJvY2Vzc0FsaWFzKHVybClbMF07XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGlzQWJzb2x1dGUodXJsKSxcbiAgICAgICAgYFRoZSBsb2FkaW5nIG9mIHRoZSByZW1vdGUgbW9kdWxlIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aC4gXCIke3VybH1cImAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGxvYWRlci5sb2FkTW9kdWxlKHVybCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5yZXNvdXJjZU1hbmFnZXIpIHtcbiAgICAgICAgICBkYXRhLnJlc291cmNlTWFuYWdlci5vcmlnaW5VcmwgPSB1cmw7XG4gICAgICAgICAgcmVzb3VyY2VzU3RvcmUucHVzaChkYXRhLnJlc291cmNlTWFuYWdlcik7XG4gICAgICAgICAgaG9va3MubGlmZWN5Y2xlLnByZWxvYWRlZC5lbWl0KGRhdGEucmVzb3VyY2VNYW5hZ2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pO1xuICAgIH0pLFxuICApO1xufVxuIiwgImltcG9ydCB7IGlzT2JqZWN0LCBpc1Byb21pc2UgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5cbnR5cGUgRVNNb2R1bGVSZXN1bHQ8VD4gPSB7XG4gIGRlZmF1bHQ6IFQ7XG4gIF9fZXNNb2R1bGU6IHRydWU7XG59O1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmV4cG9ydCBmdW5jdGlvbiBlc01vZHVsZTxUIGV4dGVuZHMgUHJvbWlzZTxhbnk+PihvYmo6IFQpOiBQcm9taXNlPEVTTW9kdWxlUmVzdWx0PFQgZXh0ZW5kcyBQcm9taXNlPGluZmVyIFA+ID8gUCA6IFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBlc01vZHVsZTxUIGV4dGVuZHMgRVNNb2R1bGVSZXN1bHQ8YW55Pj4ob2JqOiBUKTogVDtcbmV4cG9ydCBmdW5jdGlvbiBlc01vZHVsZTxUPihvYmo6IFQpOiBFU01vZHVsZVJlc3VsdDxUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVzTW9kdWxlKG9iajogYW55KSB7XG4gIGlmIChpc09iamVjdChvYmopICYmIG9iai5fX2VzTW9kdWxlID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIGlmIChpc1Byb21pc2Uob2JqKSkge1xuICAgIHJldHVybiBvYmoudGhlbihlc01vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXNtID0geyBkZWZhdWx0OiBvYmogfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXNtLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgcmV0dXJuIGVzbTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGVycm9yLCBhc3NlcnQsIGlzUHJvbWlzZSwgaXNBYnNvbHV0ZSB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7XG4gIE1vZHVsZUluZm8sXG4gIGNhY2hlTW9kdWxlcyxcbiAgcHVyaWZ5T3B0aW9ucyxcbiAgcHJldHRpZnlFcnJvcixcbiAgZ2V0TW9kdWxlTWFuYWdlcixcbiAgTW9kdWxlQ29uZmlnLFxufSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBBY3R1YXRvciB9IGZyb20gJy4uL2FjdHVhdG9yJztcbmltcG9ydCB7IHByb2Nlc3NBbGlhcywgZ2V0VmFsdWVJbk9iamVjdCB9IGZyb20gJy4vc2V0TW9kdWxlQ29uZmlnJztcblxuLy8gSWYgd2Ugd2FudCB0byBoYXZlIHBlcmZlY3Qgc3luY2hyb25pemF0aW9uIHN5bnRheCB0byBsb2FkIHJlbW90ZSBtb2R1bGVzLFxuLy8gdGhlIHNvdXJjZSBjb2RlIG9mIHRoZSBjaGlsZCBhcHBsaWNhdGlvbiBtdXN0IGJlIGFuYWx5emVkIHNvIHRoYXQgaXQgY2FuIGJlIGxvYWRlZCBvbiBkZW1hbmQuXG4vLyBJbiB0aGUgZnV0dXJlLCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgZ2FyZmlzaCBzdXBwb3J0cyBlc01vZHVsZSxcbi8vIFRvIGNvbnNpZGVyIGxvYWRpbmcgcmVtb3RlIG1vZHVsZXMgb24gZGVtYW5kIHdoZW4gdXNpbmcgc3luY2hyb25vdXMgc3ludGF4LlxuLy8gRS5nLlxuLy8gMS4gZXNNb2R1bGUgLSBTdGF0aWMgYW5hbHlzaXMsIHJlY3Vyc2l2ZWx5IGJ1aWxkIGRlcGVuZGVuY3kgdHJlZS5cbi8vIDIuIHdlYnBhY2sgLSBBbmFseXplIHRoZSBzb3VyY2UgY29kZSBhc3QgYW5kIGJ1aWxkIGludG8gZGlmZmVyZW50IHBhY2thZ2UgdmVyc2lvbnMuXG5cbmNvbnN0IHRocm93V2FybiA9IChhbGlhczogc3RyaW5nLCB1cmw6IHN0cmluZykgPT4ge1xuICBlcnJvcihcbiAgICBwcmV0dGlmeUVycm9yKFxuICAgICAgYFRoZSBjdXJyZW50IG1vZHVsZSByZXR1cm4gYSBwcm9taXNlLCBZb3Ugc2hvdWxkIHVzZSBcImxvYWRNb2R1bGUoJyR7dXJsfScpXCIuYCxcbiAgICAgIGFsaWFzLFxuICAgICAgdXJsLFxuICAgICksXG4gICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZE1vZHVsZVN5bmMoXG4gIHVybE9yQWxpYXM6IHN0cmluZyxcbiAgb3B0aW9ucz86IE1vZHVsZUNvbmZpZyxcbik6IFJlY29yZDxzdHJpbmcsIGFueT4gfCBudWxsIHtcbiAgY29uc3QgZGF0YSA9IGhvb2tzLmxpZmVjeWNsZS5iZWZvcmVMb2FkTW9kdWxlLmVtaXQoe1xuICAgIG9wdGlvbnMsXG4gICAgdXJsOiB1cmxPckFsaWFzLFxuICB9KTtcbiAgdXJsT3JBbGlhcyA9IGRhdGEudXJsO1xuICBvcHRpb25zID0gZGF0YS5vcHRpb25zO1xuXG4gIGFzc2VydCh1cmxPckFsaWFzLCAnTWlzc2luZyB1cmwgZm9yIGxvYWRpbmcgcmVtb3RlIG1vZHVsZS4nKTtcbiAgYXNzZXJ0KFxuICAgIHR5cGVvZiB1cmxPckFsaWFzID09PSAnc3RyaW5nJyxcbiAgICAnVGhlIHR5cGUgb2YgVVJMIG5lZWRzIHRvIGJlIGEgc3RyaW5nLicsXG4gICk7XG4gIGNvbnN0IFt1cmwsIHNlZ21lbnRzXSA9IHByb2Nlc3NBbGlhcyh1cmxPckFsaWFzKTtcbiAgYXNzZXJ0KFxuICAgIGlzQWJzb2x1dGUodXJsKSB8fCB1cmwuc3RhcnRzV2l0aCgnLy8nKSxcbiAgICBgVGhlIGxvYWRpbmcgb2YgdGhlIHJlbW90ZSBtb2R1bGUgbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoLiBcIiR7dXJsfVwiYCxcbiAgKTtcblxuICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0IGluZm8gPSBwdXJpZnlPcHRpb25zKHVybCwgb3B0aW9ucyk7XG4gIGNvbnN0IHsgY2FjaGUsIHZlcnNpb24sIGV4dGVybmFscywgZXJyb3IsIGFkYXB0ZXIgfSA9IGluZm87XG4gIGNvbnN0IHVybFdpdGhWZXJzaW9uID0gYCR7dmVyc2lvbiB8fCAnbGF0ZXN0J31AJHt1cmx9YDtcbiAgY29uc3QgbW9kdWxlID0gY2FjaGVNb2R1bGVzW3VybFdpdGhWZXJzaW9uXTtcbiAgY29uc3QgYWxpYXMgPSBzZWdtZW50cyA/IHNlZ21lbnRzWzBdIDogJyc7XG5cbiAgaWYgKGNhY2hlICYmIG1vZHVsZSkge1xuICAgIGlzUHJvbWlzZShtb2R1bGUpICYmIHRocm93V2FybihhbGlhcywgdXJsKTtcbiAgICByZXN1bHQgPSBnZXRWYWx1ZUluT2JqZWN0KG1vZHVsZSwgc2VnbWVudHMpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG1hbmFnZXIgPSBnZXRNb2R1bGVNYW5hZ2VyKHVybCk7XG4gICAgYXNzZXJ0KFxuICAgICAgbWFuYWdlcixcbiAgICAgIGBTeW5jaHJvbm91c2x5IGxvYWQgbW9kdWxlIG11c3QgbG9hZCByZXNvdXJjZXMgaW4gYWR2YW5jZS4gXCIke3VybH1cImAsXG4gICAgKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhY3R1YXRvciA9IG5ldyBBY3R1YXRvcihtYW5hZ2VyLCBleHRlcm5hbHMpO1xuICAgICAgY2FjaGVNb2R1bGVzW3VybFdpdGhWZXJzaW9uXSA9IGFjdHVhdG9yLmVudi5leHBvcnRzO1xuICAgICAgbGV0IGV4cG9ydHMgPSBhY3R1YXRvci5leGVjU2NyaXB0KCkuZXhwb3J0cztcblxuICAgICAgaWYgKHR5cGVvZiBhZGFwdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGV4cG9ydHMgPSBhZGFwdGVyKGV4cG9ydHMpO1xuICAgICAgfVxuICAgICAgZXhwb3J0cyA9IGhvb2tzLmxpZmVjeWNsZS5hZnRlckxvYWRNb2R1bGUuZW1pdCh7XG4gICAgICAgIHVybCxcbiAgICAgICAgZXhwb3J0cyxcbiAgICAgICAgY29kZTogbWFuYWdlci5tb2R1bGVDb2RlLFxuICAgICAgfSkuZXhwb3J0cztcblxuICAgICAgaXNQcm9taXNlKGV4cG9ydHMpICYmIHRocm93V2FybihhbGlhcywgdXJsKTtcbiAgICAgIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl0gPSBleHBvcnRzO1xuICAgICAgcmVzdWx0ID0gZ2V0VmFsdWVJbk9iamVjdChleHBvcnRzLCBzZWdtZW50cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVsZXRlIGNhY2hlTW9kdWxlc1t1cmxXaXRoVmVyc2lvbl07XG4gICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdCA9IGVycm9yKGUsIGluZm8sIGFsaWFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IHByZXR0aWZ5RXJyb3IoZSwgYWxpYXMsIHVybCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQ0EsbUJBS087QUFlQSxJQUFNLFFBQVEsSUFBSSwwQkFBYTtBQUFBLEVBQ3BDLFdBQVcsSUFBSTtBQUFBLEVBQ2YsWUFBWSxJQUFJLHNCQUEwQjtBQUFBLEVBQzFDLGtCQUFrQixJQUFJLCtCQUFrQztBQUFBLEVBQ3hELHVCQUF1QixJQUFJLGdDQUN6QjtBQUFBLEVBRUYsaUJBQWlCLElBQUksK0JBQWlDO0FBQUEsRUFDdEQsc0JBQXNCLElBQUksZ0NBQ3hCO0FBQUE7OztBQzlCSixvQkFBc0M7QUFDdEMsb0JBTU87OztBQ1BQLG9CQUE4Qzs7O0FDQTlDLG1CQUE0QjtBQUtyQixxQkFBZTtBQUFBLEVBSXBCLFlBQVksU0FBd0IsV0FBaUM7QUFDbkUsU0FBSyxVQUFVO0FBQ2YsU0FBSyxNQUFNO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixTQUFTLENBQUMsUUFBSztBQWRyQjtBQWVTLDZCQUFhLElBQUksUUFDakIsYUFBYSxhQUFhLGFBQWEsVUFBVSxRQUNsRCwrQ0FBWSxZQUFaLG1CQUFxQixVQUFVO0FBQUE7QUFBQTtBQUVuQyxTQUFLLElBQUksU0FBUyxLQUFLO0FBQ3ZCLFVBQU0sVUFBVSxXQUFXLEtBQUs7QUFBQTtBQUFBLEVBR2xDLGFBQWE7QUFDWCxVQUFNLEVBQUUsS0FBSyxlQUFlLEtBQUs7QUFDakMsUUFBSSxZQUFZO0FBRWQsaUJBQVcsV0FBVyxZQUFZLEtBQUssS0FBSyxLQUFLLEVBQUUsU0FBUztBQUFBLFdBQ3ZEO0FBQ0wsWUFBTSxZQUFZO0FBQUEsRUFBSyxNQUFNLGlCQUFpQjtBQUFBLElBQVU7QUFDeEQsb0NBQVksSUFB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
