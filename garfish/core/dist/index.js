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
  default: () => Garfish
});

// src/garfish.ts
var import_loader4 = require("@garfish/loader");
var import_eventemitter2 = require("eventemitter2");
var import_utils9 = require("@garfish/utils");
var import_hooks2 = require("@garfish/hooks");

// src/config.ts
var import_utils = require("@garfish/utils");
var filterAppConfigKeys = {
  beforeBootstrap: true,
  bootstrap: true,
  beforeRegisterApp: true,
  registerApp: true,
  beforeLoad: true,
  afterLoad: true,
  errorLoadApp: true,
  appID: true,
  apps: true,
  disableStatistics: true,
  disablePreloadApp: true,
  plugins: true,
  autoRefreshApp: true,
  onNotMatchRouter: true,
  loader: true
};
var deepMergeConfig = (globalConfig, localConfig) => {
  const props = __spreadValues(__spreadValues({}, globalConfig.props || {}), localConfig.props || {});
  const result = (0, import_utils.deepMerge)((0, import_utils.filterUndefinedVal)(globalConfig), (0, import_utils.filterUndefinedVal)(localConfig));
  result.props = props;
  return result;
};
var getAppConfig = (globalConfig, localConfig) => {
  const mergeResult = deepMergeConfig(globalConfig, localConfig);
  Object.keys(mergeResult).forEach((key) => {
    if (filterAppConfigKeys[key]) {
      delete mergeResult[key];
    }
  });
  return mergeResult;
};
var generateAppOptions = (appName, garfish, options) => {
  let appInfo = garfish.appInfos[appName] || { name: appName };
  appInfo = getAppConfig(garfish.options, __spreadProps(__spreadValues(__spreadValues({}, appInfo), options), {
    props: __spreadValues(__spreadValues({}, appInfo.props || {}), (options == null ? void 0 : options.props) || {})
  }));
  return appInfo;
};
var createDefaultOptions = () => {
  const config = {
    appID: "",
    apps: [],
    autoRefreshApp: true,
    disableStatistics: false,
    disablePreloadApp: false,
    basename: "/",
    props: {},
    domGetter: () => document.createElement("div"),
    sandbox: {
      snapshot: false,
      fixBaseUrl: false,
      disableWith: false,
      strictIsolation: false
    },
    beforeLoad: () => {
    },
    afterLoad: () => {
    },
    errorLoadApp: (e) => (0, import_utils.error)(e),
    onNotMatchRouter: () => {
    },
    beforeEval: () => {
    },
    afterEval: () => {
    },
    beforeMount: () => {
    },
    afterMount: () => {
    },
    beforeUnmount: () => {
    },
    afterUnmount: () => {
    },
    errorMountApp: (e) => (0, import_utils.error)(e),
    errorUnmountApp: (e) => (0, import_utils.error)(e),
    customLoader: void 0
  };
  return config;
};

// src/module/app.ts
var import_loader = require("@garfish/loader");
var import_utils4 = require("@garfish/utils");

// src/lifecycle.ts
var import_hooks = require("@garfish/hooks");
function globalLifecycle() {
  return new import_hooks.PluginSystem({
    beforeBootstrap: new import_hooks.SyncHook(),
    bootstrap: new import_hooks.SyncHook(),
    beforeRegisterApp: new import_hooks.SyncHook(),
    registerApp: new import_hooks.SyncHook(),
    beforeLoad: new import_hooks.AsyncHook(),
    afterLoad: new import_hooks.AsyncHook(),
    errorLoadApp: new import_hooks.SyncHook()
  });
}
function appLifecycle() {
  return new import_hooks.PluginSystem({
    beforeEval: new import_hooks.SyncHook(),
    afterEval: new import_hooks.SyncHook(),
    beforeMount: new import_hooks.SyncHook(),
    afterMount: new import_hooks.SyncHook(),
    errorMountApp: new import_hooks.SyncHook(),
    beforeUnmount: new import_hooks.SyncHook(),
    afterUnmount: new import_hooks.SyncHook(),
    errorUnmountApp: new import_hooks.SyncHook(),
    errorExecCode: new import_hooks.SyncHook()
  });
}

// src/module/esModule.ts
var import_es_module_lexer = require("es-module-lexer");
var import_utils2 = require("@garfish/utils");
var import_utils3 = require("@garfish/utils");
var __GARFISH_ESM_ENV__ = "__GARFISH_ESM_ENV__";
var getModuleImportProcessor = (code) => {
  let finalCode = "";
  let resetCode = code;
  let prevCodeIndex = 0;
  const rawImport = "import";
  const wrapImport = "_import_";
  return (importAnalysis, newModuleName = "") => {
    const { d: importType, n: moduleName, s, e, ss, se } = importAnalysis;
    const isDynamicImport = importType > -1;
    if (isDynamicImport) {
      const codeStart = ss - prevCodeIndex;
      const codeEnd = se - prevCodeIndex;
      const dynamicImportStatement = resetCode.slice(codeStart, codeEnd);
      finalCode += resetCode.slice(0, codeStart);
      finalCode += dynamicImportStatement.replace(rawImport, wrapImport);
      resetCode = resetCode.slice(codeEnd);
      prevCodeIndex = se;
    } else if (moduleName) {
      const codeStart = s - prevCodeIndex;
      const codeEnd = e - prevCodeIndex;
      finalCode += resetCode.slice(0, codeStart);
      finalCode += newModuleName;
      resetCode = resetCode.slice(codeEnd);
      prevCodeIndex = e;
    }
    return [finalCode, resetCode];
  };
};
var genShellExecutionCode = (id, sourceModuleName, shellUrl) => `;import*as m$$_${id} from'${sourceModuleName}';import{u$$_ as u$$_${id}}from'${shellUrl}';u$$_${id}(m$$_${id})`;
var ESModuleLoader = class {
  constructor(app) {
    this.moduleCache = {};
    this.lock = new import_utils2.Lock();
    this.app = app;
    this.globalVarKey = `${__GARFISH_ESM_ENV__}_${this.app.appId}`;
  }
  execModuleCode(blobUrl) {
    const result = (0, eval)(`import('${blobUrl}')`);
    this.lock.release();
    return result;
  }
  createBlobUrl(code) {
    return URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
  }
  setBlobUrl(saveId, blobUrl) {
    this.moduleCache[saveId].blobUrl = blobUrl;
  }
  async fetchModuleResource(lockId, envVarStr, noEntryEnvVarStr, saveUrl, requestUrl) {
    const { resourceManager } = await this.app.context.loader.load({
      scope: this.app.name,
      url: requestUrl
    });
    if (resourceManager) {
      let sourcemap = "";
      let { url, scriptCode } = resourceManager;
      if (!(0, import_utils3.haveSourcemap)(scriptCode)) {
        sourcemap = await (0, import_utils3.createSourcemap)(scriptCode, requestUrl);
      }
      scriptCode = await this.analysisModule(lockId, scriptCode, envVarStr, noEntryEnvVarStr, saveUrl, url);
      const blobUrl = this.createBlobUrl(`import.meta.url='${url}';${this.app.isNoEntryScript(url) ? noEntryEnvVarStr : envVarStr}${scriptCode}
${sourcemap}`);
      this.setBlobUrl(saveUrl, blobUrl);
    }
  }
  getUrl(referUrl, targetUrl) {
    return !(0, import_utils3.isAbsolute)(targetUrl) && referUrl ? (0, import_utils3.transformUrl)(referUrl, targetUrl) : targetUrl;
  }
  preloadStaticModuleAsync(analysis, realUrl) {
    const [imports] = analysis;
    for (let i = 0, length = imports.length; i < length; i++) {
      const importAnalysis = imports[i];
      const { d: importType, n: moduleName } = importAnalysis;
      const isDynamicImport = importType > -1;
      if (moduleName && !isDynamicImport) {
        this.app.context.loader.load({
          scope: this.app.name,
          url: this.getUrl(realUrl, moduleName)
        });
      }
    }
  }
  async analysisModule(lockId, code, envVarStr, noEntryEnvVarStr, baseUrl, realUrl) {
    await this.lock.wait(lockId);
    await import_es_module_lexer.init;
    const analysis = (0, import_es_module_lexer.parse)(code, realUrl || "");
    const thisModule = {
      analysis,
      source: code
    };
    if (baseUrl) {
      this.moduleCache[baseUrl] = thisModule;
    }
    let result = ["", code];
    let shellExecutionCode = "";
    const dynamicImport = `var _import_=(url)=>window.${this.globalVarKey}.import(url,'${baseUrl}','${realUrl}');`;
    const processImportModule = getModuleImportProcessor(code);
    const [imports] = analysis;
    this.preloadStaticModuleAsync(analysis, realUrl);
    for (let i = 0, length = imports.length; i < length; i++) {
      const importAnalysis = imports[i];
      const { d: importType, n: moduleName } = importAnalysis;
      const isDynamicImport = importType > -1;
      let saveUrl = moduleName || "";
      let newModuleName = "";
      if (moduleName && !isDynamicImport) {
        const requestUrl = this.getUrl(realUrl, moduleName);
        saveUrl = this.getUrl(baseUrl, moduleName);
        let currentModule = this.moduleCache[saveUrl];
        if (currentModule && !currentModule.blobUrl) {
          if (!currentModule.shellUrl) {
            const [currentModuleImports, currentModuleExports] = currentModule.analysis;
            const wildcardExports = currentModuleImports.filter((importItem) => {
              const statement = currentModule.source.substring(importItem.ss, importItem.se);
              return /^export\s*\*\s*from\s*/.test(statement);
            });
            const wildcardExportStatements = [];
            for (let j = 0, l = wildcardExports.length; j < l; j++) {
              const wildcardExport = wildcardExports[j];
              const wildcardExportUrl = wildcardExport.n || "";
              const wildcardExportSaveUrl = this.getUrl(baseUrl, wildcardExportUrl);
              await this.fetchModuleResource(lockId, envVarStr, noEntryEnvVarStr, wildcardExportSaveUrl, this.getUrl(realUrl, wildcardExportUrl));
              const wildcardModule = this.moduleCache[wildcardExportSaveUrl];
              if (wildcardModule == null ? void 0 : wildcardModule.blobUrl) {
                wildcardExportStatements.push(`export * from '${wildcardModule.blobUrl}'`);
              }
            }
            currentModule.shellUrl = this.createBlobUrl(`export function u$$_(m){${currentModuleExports.map((name) => name === "default" ? "d$$_=m.default" : `${name}=m.${name}`).join(",")}}${currentModuleExports.map((name) => name === "default" ? "let d$$_;export{d$$_ as default}" : `export let ${name}`).join(";")}${wildcardExportStatements.length ? `;${wildcardExportStatements.join(";")}` : ""}
//# sourceURL=${saveUrl}?cycle`);
          }
          newModuleName = currentModule.shellUrl;
        } else if (!currentModule) {
          await this.fetchModuleResource(lockId, envVarStr, noEntryEnvVarStr, saveUrl, requestUrl);
          currentModule = this.moduleCache[saveUrl];
          const { blobUrl, shellUrl, shellExecuted } = currentModule;
          newModuleName = blobUrl;
          if (shellUrl && !shellExecuted) {
            shellExecutionCode += genShellExecutionCode(i, newModuleName, shellUrl);
            currentModule.shellExecuted = true;
          }
        } else {
          newModuleName = currentModule.blobUrl;
        }
      }
      result = processImportModule(importAnalysis, newModuleName || moduleName);
    }
    thisModule.source = "";
    delete thisModule.analysis;
    return `${dynamicImport}${shellExecutionCode};${result.join("")}`;
  }
  destroy() {
    for (const key in this.moduleCache) {
      const { blobUrl, shellUrl } = this.moduleCache[key];
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
      if (shellUrl) {
        URL.revokeObjectURL(shellUrl);
      }
    }
    this.moduleCache = {};
    this.lock.clear();
    delete this.app.global[this.globalVarKey];
  }
  load(code, env, url, options) {
    return new Promise(async (resolve) => {
      if (url && this.moduleCache[url]) {
        return resolve();
      }
      const genShellCodeWrapper = (blobUrl2, shellUrl, sourceUrl) => {
        return `export * from '${blobUrl2}'${genShellExecutionCode(0, blobUrl2, shellUrl)}
//# sourceURL=${sourceUrl}?cycle`;
      };
      env = __spreadProps(__spreadValues({}, env), {
        resolve,
        import: async (moduleId, baseUrl, realUrl) => {
          let saveUrl = moduleId;
          let requestUrl = moduleId;
          if (!(0, import_utils3.isAbsolute)(moduleId)) {
            saveUrl = (0, import_utils3.transformUrl)(baseUrl, moduleId);
            requestUrl = (0, import_utils3.transformUrl)(realUrl, moduleId);
          }
          let targetModule = this.moduleCache[saveUrl];
          if (!(targetModule == null ? void 0 : targetModule.blobUrl)) {
            await this.fetchModuleResource(this.lock.genId(), envVarStr, noEntryEnvVarStr, saveUrl, requestUrl);
            targetModule = this.moduleCache[saveUrl];
          }
          if (targetModule && targetModule.shellUrl && !targetModule.shellExecuted && targetModule.blobUrl) {
            return this.execModuleCode(this.createBlobUrl(genShellCodeWrapper(targetModule.blobUrl, targetModule.shellUrl, saveUrl)));
          }
          return this.execModuleCode(targetModule.blobUrl);
        }
      });
      const genEnvVarStr = (targetEnv, noEntry) => {
        const newEnv = __spreadValues({}, targetEnv);
        if (noEntry) {
          delete newEnv.exports;
          delete newEnv.module;
        }
        return Object.keys(newEnv).reduce((prevCode, name) => {
          if (name === "resolve" || name === "import")
            return prevCode;
          return `${prevCode} var ${name} = window.${this.globalVarKey}.${name};`;
        }, "");
      };
      const envVarStr = genEnvVarStr(env);
      const noEntryEnvVarStr = genEnvVarStr(env, true);
      let sourcemap = "";
      if (!(0, import_utils3.haveSourcemap)(code) && url) {
        sourcemap = await (0, import_utils3.createSourcemap)(code, options && options.isInline ? `index.html(inline.${this.app.scriptCount}.js)` : url);
      }
      code = await this.analysisModule(this.lock.genId(), code, envVarStr, noEntryEnvVarStr, url, url);
      code = `import.meta.url='${url}';${(options == null ? void 0 : options.noEntry) ? noEntryEnvVarStr : envVarStr}${code}
;window.${this.globalVarKey}.resolve();
${sourcemap}`;
      this.app.global[this.globalVarKey] = env;
      let blobUrl = this.createBlobUrl(code);
      if (options && !options.isInline && url) {
        this.setBlobUrl(url, blobUrl);
      }
      const currentModule = this.moduleCache[url || ""];
      if ((currentModule == null ? void 0 : currentModule.shellUrl) && !currentModule.shellExecuted) {
        blobUrl = this.createBlobUrl(genShellCodeWrapper(blobUrl, currentModule.shellUrl, url || ""));
      }
      this.execModuleCode(blobUrl);
    });
  }
};

// src/module/app.ts
var appId = 0;
var __GARFISH_GLOBAL_ENV__ = "__GARFISH_GLOBAL_ENV__";
var __GARFISH_EXPORTS__ = "__GARFISH_EXPORTS__";
var App = class {
  constructor(context, appInfo, entryManager, resources, isHtmlMode, customLoader) {
    this.appId = appId++;
    this.scriptCount = 0;
    this.display = false;
    this.mounted = false;
    this.strictIsolation = false;
    this.esmQueue = new import_utils4.Queue();
    this.esModuleLoader = new ESModuleLoader(this);
    this.global = window;
    this.customExports = {};
    this.sourceList = [];
    this.sourceListMap = /* @__PURE__ */ new Map();
    this.childGarfishConfig = {};
    this.active = false;
    this.mounting = false;
    this.unmounting = false;
    this.context = context;
    this.appInfo = appInfo;
    this.name = appInfo.name;
    this.resources = resources;
    this.isHtmlMode = isHtmlMode;
    this.entryManager = entryManager;
    this.appInfo.appId = this.appId;
    this.globalEnvVariables = {
      currentApp: this,
      loader: context.loader,
      externals: context.externals,
      remoteModulesCode: resources.modules
    };
    this.cjsModules = {
      exports: {},
      module: null,
      require: (key) => {
        const pkg = this.global[key] || context.externals[key] || window[key];
        if (!pkg) {
          (0, import_utils4.warn)(`Package "${key}" is not found`);
        }
        return pkg;
      }
    };
    this.cjsModules.module = this.cjsModules;
    this.customLoader = customLoader;
    this.hooks = appLifecycle();
    this.hooks.usePlugin(__spreadProps(__spreadValues({}, appInfo), {
      name: `${appInfo.name}-lifecycle`
    }));
    const nodes = entryManager.getNodesByTagName(...import_utils4.sourceListTags);
    for (const key in nodes) {
      nodes[key].forEach((node) => {
        var _a, _b;
        const url = entryManager.findAttributeValue(node, "href") || entryManager.findAttributeValue(node, "src");
        if (url) {
          this.addSourceList({
            tagName: node.tagName,
            url: entryManager.url ? (0, import_utils4.transformUrl)(entryManager.url, url) : url
          });
        }
        if ((0, import_utils4.isGarfishConfigType)({ type: entryManager.findAttributeValue(node, "type") })) {
          this.childGarfishConfig = JSON.parse((_b = (_a = node.children) == null ? void 0 : _a[0]) == null ? void 0 : _b.content);
        }
      });
    }
    this.appInfo.entry && this.addSourceList({ tagName: "html", url: this.appInfo.entry });
  }
  get rootElement() {
    return (0, import_utils4.findTarget)(this.htmlNode, [`div[${import_utils4.__MockBody__}]`, "body"]);
  }
  get getSourceList() {
    return this.sourceList;
  }
  addSourceList(sourceInfo) {
    if (this.appInfo.disableSourceListCollect)
      return;
    if (Array.isArray(sourceInfo)) {
      let nSourceList = sourceInfo.filter((item) => {
        if (!this.sourceListMap.has(item.url) && item.url.startsWith("http")) {
          this.sourceListMap.set(item.url, item);
          return true;
        }
        return false;
      });
      this.sourceList = this.sourceList.concat(nSourceList);
    } else {
      if (!this.sourceListMap.get(sourceInfo.url) && sourceInfo.url.startsWith("http")) {
        this.sourceList.push(sourceInfo);
        this.sourceListMap.set(sourceInfo.url, sourceInfo);
      }
    }
  }
  getProvider() {
    return this.provider ? Promise.resolve(this.provider) : this.checkAndGetProvider();
  }
  isNoEntryScript(url = "") {
    var _a, _b;
    return (_b = (_a = this.childGarfishConfig.sandbox) == null ? void 0 : _a.noEntryScripts) == null ? void 0 : _b.some((item) => url.indexOf(item) > -1);
  }
  execScript(code, env, url, options) {
    env = __spreadValues(__spreadValues({}, this.getExecScriptEnv(options == null ? void 0 : options.noEntry)), env || {});
    this.scriptCount++;
    const args = [this.appInfo, code, env, url, options];
    this.hooks.lifecycle.beforeEval.emit(...args);
    try {
      this.runCode(code, env, url, options);
    } catch (err) {
      this.hooks.lifecycle.errorExecCode.emit(err, ...args);
      throw err;
    }
    this.hooks.lifecycle.afterEval.emit(...args);
  }
  runCode(code, env, url, options) {
    if (options && options.isModule) {
      this.esmQueue.add(async (next) => {
        await this.esModuleLoader.load(code, __spreadValues(__spreadValues({}, this.getExecScriptEnv()), env), url, options);
        next();
      });
    } else {
      const revertCurrentScript = (0, import_utils4.setDocCurrentScript)(this.global.document, code, true, url, options == null ? void 0 : options.async, options == null ? void 0 : options.originScript);
      code += url ? `
//# sourceURL=${url}
` : "";
      if (!(0, import_utils4.hasOwn)(env, "window")) {
        env = __spreadProps(__spreadValues({}, env), {
          window: this.global
        });
      }
      (0, import_utils4.evalWithEnv)(`;${code}`, env, this.global);
      Promise.resolve().then(revertCurrentScript);
    }
  }
  async show() {
    this.active = true;
    const { display, mounted, provider } = this;
    if (display)
      return false;
    if (!mounted) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.warn)('Need to call the "app.mount()" method first.');
      return false;
    }
    this.hooks.lifecycle.beforeMount.emit(this.appInfo, this, true);
    this.context.activeApps.push(this);
    await this.addContainer();
    this.callRender(provider, false);
    this.display = true;
    this.hooks.lifecycle.afterMount.emit(this.appInfo, this, true);
    return true;
  }
  hide() {
    this.active = false;
    this.mounting = false;
    const { display, mounted, provider } = this;
    if (!display)
      return false;
    if (!mounted) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.warn)('Need to call the "app.mount()" method first.');
      return false;
    }
    this.hooks.lifecycle.beforeUnmount.emit(this.appInfo, this, true);
    this.callDestroy(provider, false);
    this.display = false;
    (0, import_utils4.remove)(this.context.activeApps, this);
    this.hooks.lifecycle.afterUnmount.emit(this.appInfo, this, true);
    return true;
  }
  async mount() {
    if (!this.canMount())
      return false;
    this.hooks.lifecycle.beforeMount.emit(this.appInfo, this, false);
    this.active = true;
    this.mounting = true;
    try {
      this.context.activeApps.push(this);
      const { asyncScripts } = await this.compileAndRenderContainer();
      if (!this.stopMountAndClearEffect())
        return false;
      const provider = await this.getProvider();
      if (!this.stopMountAndClearEffect())
        return false;
      this.callRender(provider, true);
      this.display = true;
      this.mounted = true;
      this.hooks.lifecycle.afterMount.emit(this.appInfo, this, false);
      await asyncScripts;
      if (!this.stopMountAndClearEffect())
        return false;
    } catch (e) {
      this.entryManager.DOMApis.removeElement(this.appContainer);
      this.hooks.lifecycle.errorMountApp.emit(e, this.appInfo);
      return false;
    } finally {
      this.mounting = false;
    }
    return true;
  }
  unmount() {
    this.active = false;
    this.mounting = false;
    if (!this.mounted || !this.appContainer) {
      return false;
    }
    if (this.unmounting) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.warn)(`The ${this.name} app unmounting.`);
      return false;
    }
    this.unmounting = true;
    this.hooks.lifecycle.beforeUnmount.emit(this.appInfo, this, false);
    try {
      this.callDestroy(this.provider, true);
      this.display = false;
      this.mounted = false;
      this.provider = void 0;
      this.customExports = {};
      this.cjsModules.exports = {};
      this.esModuleLoader.destroy();
      (0, import_utils4.remove)(this.context.activeApps, this);
      this.hooks.lifecycle.afterUnmount.emit(this.appInfo, this, false);
    } catch (e) {
      (0, import_utils4.remove)(this.context.activeApps, this);
      this.entryManager.DOMApis.removeElement(this.appContainer);
      this.hooks.lifecycle.errorUnmountApp.emit(e, this.appInfo);
      return false;
    } finally {
      this.unmounting = false;
    }
    return true;
  }
  getExecScriptEnv(noEntry) {
    const envs = {
      [__GARFISH_EXPORTS__]: this.customExports,
      [__GARFISH_GLOBAL_ENV__]: this.globalEnvVariables
    };
    if (noEntry) {
      return __spreadProps(__spreadValues({}, envs), {
        require: this.cjsModules.require
      });
    }
    return __spreadValues(__spreadValues({}, envs), this.cjsModules);
  }
  async compileAndRenderContainer() {
    await this.renderTemplate();
    return {
      asyncScripts: new Promise((resolve) => {
        setTimeout(() => {
          if (this.stopMountAndClearEffect()) {
            for (const jsManager of this.resources.js) {
              if (jsManager.async) {
                try {
                  this.execScript(jsManager.scriptCode, {}, jsManager.url || this.appInfo.entry, {
                    async: false,
                    noEntry: true
                  });
                } catch (e) {
                  this.hooks.lifecycle.errorMountApp.emit(e, this.appInfo);
                }
              }
            }
          }
          resolve();
        });
      })
    };
  }
  canMount() {
    if (this.mounting) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.warn)(`The ${this.appInfo.name} app mounting.`);
      return false;
    }
    if (this.mounted) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.warn)(`The ${this.appInfo.name} app already mounted.`);
      return false;
    }
    if (this.unmounting) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.warn)(`The ${this.appInfo.name} app is unmounting can't Perform application rendering.`);
      return false;
    }
    return true;
  }
  stopMountAndClearEffect() {
    if (!this.active) {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        (0, import_utils4.warn)(`The app "${this.name}" rendering process has been blocked.`);
      }
      this.mounting = false;
      if (this.appContainer) {
        this.entryManager.DOMApis.removeElement(this.appContainer);
      }
      (0, import_utils4.coreLog)(`${this.appInfo.name} id:${this.appId} stopMountAndClearEffect`, this.appContainer);
      return false;
    }
    return true;
  }
  callRender(provider, isMount) {
    if (provider && provider.render) {
      provider.render({
        appName: this.appInfo.name,
        dom: this.rootElement,
        basename: this.appInfo.basename,
        appRenderInfo: { isMount },
        props: this.appInfo.props
      });
    }
  }
  callDestroy(provider, isUnmount) {
    const { rootElement, appContainer } = this;
    if (provider && provider.destroy) {
      provider.destroy({
        appName: this.appInfo.name,
        dom: rootElement,
        appRenderInfo: { isUnmount },
        props: this.appInfo.props
      });
    }
    this.entryManager.DOMApis.removeElement(appContainer);
  }
  async addContainer() {
    const wrapperNode = await (0, import_utils4.getRenderNode)(this.appInfo.domGetter);
    if (typeof wrapperNode.appendChild === "function") {
      wrapperNode.appendChild(this.appContainer);
    }
  }
  async renderTemplate() {
    const { appInfo, entryManager, resources } = this;
    const { url: baseUrl, DOMApis } = entryManager;
    const { htmlNode, appContainer } = (0, import_utils4.createAppContainer)(appInfo);
    this.htmlNode = htmlNode;
    this.appContainer = appContainer;
    await this.addContainer();
    const customRenderer = {
      meta: () => null,
      img: (node) => {
        baseUrl && entryManager.toResolveUrl(node, "src", baseUrl);
        return DOMApis.createElement(node);
      },
      video: (node) => {
        baseUrl && entryManager.toResolveUrl(node, "src", baseUrl);
        return DOMApis.createElement(node);
      },
      audio: (node) => {
        baseUrl && entryManager.toResolveUrl(node, "src", baseUrl);
        return DOMApis.createElement(node);
      },
      body: (node) => {
        if (!this.strictIsolation) {
          node = entryManager.cloneNode(node);
          node.tagName = "div";
          node.attributes.push({
            key: import_utils4.__MockBody__,
            value: null
          });
        }
        return DOMApis.createElement(node);
      },
      head: (node) => {
        if (!this.strictIsolation) {
          node = entryManager.cloneNode(node);
          node.tagName = "div";
          node.attributes.push({
            key: import_utils4.__MockHead__,
            value: null
          });
        }
        return DOMApis.createElement(node);
      },
      script: (node) => {
        const mimeType = entryManager.findAttributeValue(node, "type");
        const isModule = mimeType === "module";
        if (mimeType) {
          if (!isModule && !(0, import_utils4.isJsType)({ type: mimeType })) {
            return DOMApis.createElement(node);
          }
        }
        const jsManager = resources.js.find((manager) => {
          return !manager.async ? manager.isSameOrigin(node) : false;
        });
        if (jsManager) {
          const { url, scriptCode } = jsManager;
          const mockOriginScript = document.createElement("script");
          node.attributes.forEach((attribute) => {
            if (attribute.key) {
              mockOriginScript.setAttribute(attribute.key, attribute.value || "");
            }
          });
          const targetUrl = url || this.appInfo.entry;
          this.execScript(scriptCode, {}, targetUrl, {
            isModule,
            async: false,
            isInline: jsManager.isInlineScript(),
            noEntry: (0, import_utils4.toBoolean)(entryManager.findAttributeValue(node, "no-entry") || this.isNoEntryScript(targetUrl)),
            originScript: mockOriginScript
          });
        } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          const async = entryManager.findAttributeValue(node, "async");
          if (typeof async === "undefined" || async === "false") {
            const tipInfo = JSON.stringify(node, null, 2);
            (0, import_utils4.warn)(`Current js node cannot be found, the resource may not exist.

 ${tipInfo}`);
          }
        }
        return DOMApis.createScriptCommentNode(node);
      },
      style: (node) => {
        const text = node.children[0];
        if (text) {
          const styleManager = new import_loader.StyleManager(text.content, baseUrl);
          styleManager.setScope({
            appName: this.name,
            rootElId: this.appContainer.id
          });
          baseUrl && styleManager.correctPath(baseUrl);
          return entryManager.ignoreChildNodesCreation(styleManager.renderAsStyleElement());
        }
        return DOMApis.createElement(node);
      },
      link: (node) => {
        if (DOMApis.isCssLinkNode(node)) {
          const styleManager = this.resources.link.find((manager) => manager.isSameOrigin(node));
          if (styleManager) {
            styleManager.setScope({
              appName: this.name,
              rootElId: this.appContainer.id
            });
            return styleManager.renderAsStyleElement((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? `
/*${DOMApis.createLinkCommentNode(node)}*/
` : "");
          }
        }
        return DOMApis.isPrefetchJsLinkNode(node) ? DOMApis.createScriptCommentNode(node) : DOMApis.isIconLinkNode(node) ? null : DOMApis.createElement(node);
      }
    };
    entryManager.createElements(customRenderer, htmlNode);
  }
  async checkAndGetProvider() {
    const { appInfo, rootElement, cjsModules, customExports } = this;
    const { name, props, basename } = appInfo;
    let provider = void 0;
    await this.esmQueue.awaitCompletion();
    if (cjsModules.exports) {
      if ((0, import_utils4.isPromise)(cjsModules.exports))
        cjsModules.exports = await cjsModules.exports;
      if (cjsModules.exports.provider)
        provider = cjsModules.exports.provider;
    }
    if (customExports.provider) {
      provider = customExports.provider;
    }
    if (typeof provider === "function") {
      provider = await provider(__spreadValues({
        basename,
        dom: rootElement
      }, props || {}), props);
    } else if ((0, import_utils4.isPromise)(provider)) {
      provider = await provider;
    }
    if (!(0, import_utils4.isObject)(provider) && typeof provider !== "function") {
      (0, import_utils4.warn)(` Invalid module content: ${name}, you should return both render and destroy functions in provider function.`);
    }
    const hookRes = await (this.customLoader && this.customLoader(provider, appInfo, basename));
    if (hookRes) {
      const { mount, unmount } = hookRes || {};
      if (typeof mount === "function" && typeof unmount === "function") {
        provider.render = mount;
        provider.destroy = unmount;
      }
    }
    if (!appInfo.noCheckProvider) {
      (0, import_utils4.assert)(provider, `"provider" is "${provider}".`);
      (0, import_utils4.assert)("render" in provider, '"render" is required in provider.');
      (0, import_utils4.assert)("destroy" in provider, '"destroy" is required in provider.');
    }
    this.provider = provider;
    return provider;
  }
};

// src/module/resource.ts
var import_utils5 = require("@garfish/utils");
var import_loader2 = require("@garfish/loader");
function fetchStaticResources(appName, loader, entryManager) {
  const isAsync = (val) => typeof val !== "undefined" && val !== "false";
  const jsNodes = Promise.all(entryManager.findAllJsNodes().map((node) => {
    const src = entryManager.findAttributeValue(node, "src");
    const type = entryManager.findAttributeValue(node, "type");
    const crossOrigin = entryManager.findAttributeValue(node, "crossorigin");
    if (src) {
      const fetchUrl = entryManager.url ? (0, import_utils5.transformUrl)(entryManager.url, src) : src;
      const async = entryManager.findAttributeValue(node, "async");
      return loader.load({
        scope: appName,
        url: fetchUrl,
        crossOrigin,
        defaultContentType: type
      }).then(({ resourceManager: jsManager }) => {
        if (jsManager) {
          jsManager.setDep(node);
          type && jsManager.setMimeType(type);
          jsManager.setAsyncAttribute(isAsync(async));
          return jsManager;
        } else {
          (0, import_utils5.warn)(`[${appName}] Failed to load script: ${fetchUrl}`);
        }
      }).catch(() => null);
    } else if (node.children.length > 0) {
      const code = node.children[0].content;
      if (code) {
        const jsManager = new import_loader2.JavaScriptManager(code, "");
        jsManager.setDep(node);
        type && jsManager.setMimeType(type);
        return jsManager;
      }
    }
  }).filter(Boolean));
  const linkNodes = Promise.all(entryManager.findAllLinkNodes().map((node) => {
    if (!entryManager.DOMApis.isCssLinkNode(node))
      return;
    const href = entryManager.findAttributeValue(node, "href");
    if (href) {
      const fetchUrl = entryManager.url ? (0, import_utils5.transformUrl)(entryManager.url, href) : href;
      return loader.load({ scope: appName, url: fetchUrl }).then(({ resourceManager: styleManager }) => {
        if (styleManager) {
          styleManager.setDep(node);
          styleManager.correctPath();
          return styleManager;
        } else {
          (0, import_utils5.warn)(`${appName} Failed to load link: ${fetchUrl}`);
        }
      }).catch(() => null);
    }
  }).filter(Boolean));
  const metaNodes = Promise.all(entryManager.findAllMetaNodes().map((node) => {
    if (!entryManager.DOMApis.isRemoteModule(node))
      return;
    const async = entryManager.findAttributeValue(node, "async");
    const alias = entryManager.findAttributeValue(node, "alias");
    if (!isAsync(async)) {
      const src = entryManager.findAttributeValue(node, "src");
      if (src) {
        return loader.loadModule(src).then(({ resourceManager: moduleManager }) => {
          if (moduleManager && alias) {
            moduleManager && moduleManager.setAlias(alias);
          }
          return moduleManager;
        }).catch(() => null);
      }
    } else if (alias) {
      (0, import_utils5.warn)(`Asynchronous loading module, the alias "${alias}" is invalid.`);
    }
  }).filter(Boolean));
  return Promise.all([jsNodes, linkNodes, metaNodes]).then((ls) => ls.map((ns) => ns.filter(Boolean)));
}
async function processAppResources(loader, appInfo) {
  let isHtmlMode = false, fakeEntryManager;
  const resources = { js: [], link: [], modules: [] };
  (0, import_utils5.assert)(appInfo.entry, `[${appInfo.name}] Entry is not specified.`);
  const { resourceManager: entryManager } = await loader.load({
    scope: appInfo.name,
    url: (0, import_utils5.transformUrl)(location.href, appInfo.entry)
  });
  if (entryManager instanceof import_loader2.TemplateManager) {
    isHtmlMode = true;
    const [js, link, modules] = await fetchStaticResources(appInfo.name, loader, entryManager);
    resources.js = js;
    resources.link = link;
    resources.modules = modules;
  } else if (entryManager instanceof import_loader2.JavaScriptManager) {
    isHtmlMode = false;
    const mockTemplateCode = `<script src="${entryManager.url}"><\/script>`;
    fakeEntryManager = new import_loader2.TemplateManager(mockTemplateCode, entryManager.url);
    entryManager.setDep(fakeEntryManager.findAllJsNodes()[0]);
    resources.js = [entryManager];
  } else {
    (0, import_utils5.error)(`Entrance wrong type of resource of "${appInfo.name}".`);
  }
  return [fakeEntryManager || entryManager, resources, isHtmlMode];
}

// src/plugins/fixHMR.ts
function GarfishHMRPlugin() {
  let hasInit = false;
  let isHotUpdate = false;
  return function(Garfish2) {
    return {
      name: "fix-hmr",
      version: "1.12.0",
      bootstrap() {
        if (hasInit)
          return;
        hasInit = true;
        let webpackHotUpdateName = "webpackHotUpdate";
        let webpackHotUpdate = window[webpackHotUpdateName];
        for (const i in window) {
          if (i.includes("webpackHotUpdate")) {
            webpackHotUpdateName = i;
            webpackHotUpdate = window[i];
          }
        }
        if (typeof webpackHotUpdate === "function") {
          window[webpackHotUpdateName] = function() {
            isHotUpdate = true;
            return webpackHotUpdate.apply(this, arguments);
          };
          const observer = new MutationObserver(() => {
            if (!isHotUpdate)
              return;
            isHotUpdate = false;
            Garfish2.activeApps.forEach((app) => {
              if (app.mounted) {
                setTimeout(() => {
                  app.display && app.hide();
                  app.show();
                });
              }
            });
          });
          observer.observe(document.documentElement, {
            subtree: true,
            childList: true,
            attributes: true
          });
        }
      }
    };
  };
}

// src/plugins/lifecycle.ts
function GarfishOptionsLife(options, name) {
  return function() {
    return __spreadValues({
      name,
      version: "1.12.0"
    }, options);
  };
}

// src/plugins/preload.ts
var import_utils6 = require("@garfish/utils");
var import_loader3 = require("@garfish/loader");
var storageKey = "__garfishPreloadApp__";
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var requestQueue = new import_utils6.Queue();
var isSlowNetwork = () => navigator.connection ? navigator.connection.saveData || /(2|3)g/.test(navigator.connection.effectiveType) : false;
var requestIdleCallback = typeof import_utils6.idleCallback !== "function" ? window.setTimeout : import_utils6.idleCallback;
function safeLoad({
  loader,
  appName,
  url,
  isModule,
  immediately,
  callback
}) {
  const generateSuccess = (next = () => {
  }) => ({ resourceManager }) => {
    callback && callback(resourceManager);
    setTimeout(next, 500);
  };
  const generateThrowWarn = (next = () => {
  }) => (e) => {
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      (0, import_utils6.warn)(e);
      (0, import_utils6.warn)(`Preload failed. "${url}"`);
    }
    next();
  };
  const loadResource = (next = () => {
  }) => {
    const throwWarn = generateThrowWarn(next);
    const success = generateSuccess(next);
    try {
      if (isModule) {
        loader.loadModule(url).then(success, throwWarn);
      } else {
        loader.load({ scope: appName, url }).then(success, throwWarn);
      }
    } catch (e) {
      throwWarn(e);
      next();
    }
  };
  if (immediately) {
    loadResource();
  } else {
    requestQueue.add((next) => {
      requestIdleCallback(() => loadResource(next));
    });
  }
}
function loadAppResource(loader, info, immediately = false) {
  false;
  const fetchUrl = (0, import_utils6.transformUrl)(location.href, info.entry);
  safeLoad({
    loader,
    appName: info.name,
    url: fetchUrl,
    isModule: false,
    immediately,
    callback: (manager) => {
      const loadStaticResource = () => {
        if (manager instanceof import_loader3.TemplateManager) {
          const baseUrl = manager.url;
          const jsNodes = manager.findAllJsNodes();
          const linkNodes = manager.findAllLinkNodes();
          const metaNodes = manager.findAllMetaNodes();
          if (jsNodes) {
            jsNodes.forEach((node) => {
              const src = manager.findAttributeValue(node, "src");
              src && safeLoad({
                loader,
                appName: info.name,
                url: baseUrl ? (0, import_utils6.transformUrl)(baseUrl, src) : src,
                isModule: false,
                immediately
              });
            });
          }
          if (linkNodes) {
            linkNodes.forEach((node) => {
              if (manager.DOMApis.isCssLinkNode(node)) {
                const href = manager.findAttributeValue(node, "href");
                href && safeLoad({
                  loader,
                  appName: info.name,
                  url: baseUrl ? (0, import_utils6.transformUrl)(baseUrl, href) : href,
                  isModule: false,
                  immediately
                });
              }
            });
          }
          if (metaNodes) {
            metaNodes.forEach((node) => {
              if (manager.DOMApis.isRemoteModule(node)) {
                const src = manager.findAttributeValue(node, "src");
                if (src && (0, import_utils6.isAbsolute)(src)) {
                  safeLoad({
                    loader,
                    appName: info.name,
                    url: src,
                    isModule: true,
                    immediately
                  });
                } else {
                  (0, import_utils6.warn)(`The loading of the remote module must be an absolute path. "${src}"`);
                }
              }
            });
          }
        }
      };
      if (immediately) {
        loadStaticResource();
      } else {
        requestIdleCallback(loadStaticResource);
      }
    }
  });
}
function getRanking() {
  const str = localStorage.getItem(storageKey);
  if (str) {
    const data = JSON.parse(str);
    return data.sort((a, b) => b.count - a.count);
  }
  return [];
}
function setRanking(appName) {
  const str = localStorage.getItem(storageKey);
  const newCurrent = { appName, count: 1 };
  if (!str) {
    (0, import_utils6.safeWrapper)(() => localStorage.setItem(storageKey, JSON.stringify([newCurrent])));
  } else {
    const data = JSON.parse(str);
    const current = data.find((app) => app.appName === appName);
    current ? current.count++ : data.push(newCurrent);
    (0, import_utils6.safeWrapper)(() => localStorage.setItem(storageKey, JSON.stringify(data)));
  }
}
var loadedMap = /* @__PURE__ */ Object.create(null);
function GarfishPreloadPlugin() {
  return function(Garfish2) {
    Garfish2.preloadApp = (appName) => {
      loadAppResource(Garfish2.loader, Garfish2.appInfos[appName], true);
    };
    return {
      name: "preload",
      version: "1.12.0",
      beforeLoad(appInfo) {
        if (Garfish2.options.disablePreloadApp) {
          return;
        }
        setRanking(appInfo.name);
      },
      registerApp(appInfos) {
        if (Garfish2.options.disablePreloadApp) {
          return;
        }
        setTimeout(() => {
          if (isMobile || isSlowNetwork())
            return;
          const ranking = getRanking();
          for (const { appName } of ranking) {
            if (appInfos[appName] && !loadedMap[appName]) {
              loadedMap[appName] = true;
              loadAppResource(Garfish2.loader, appInfos[appName]);
            }
          }
          for (const key in appInfos) {
            if (!loadedMap[key]) {
              loadAppResource(Garfish2.loader, appInfos[key]);
            }
          }
        }, false ? 0 : 5e3);
      }
    };
  };
}

// src/plugins/performance/subAppObserver.ts
var import_utils7 = require("@garfish/utils");
var SubAppObserver = class {
  constructor(options) {
    this.observer = new MutationObserver(this._mutationObserverCallback.bind(this));
    this.subAppBeforeLoadTime = 0;
    this.subAppBeforeMountTime = 0;
    this.subAppStartPageShowTime = 0;
    this.subAppPageShowTime = 0;
    this.entry = "";
    this.observeTimer = 0;
    this.dataTimer = 0;
    this.domQuerySelector = options.subAppRootSelector;
    this.config = { attributes: true, childList: true, subtree: true };
    this.targetSubscriber = [];
    this.timeLag = options.domObserverMaxTime || 3e3;
    this.reportTimeLag = options.waitSubAppNotifyMaxTime || 1e4;
    this.isRecordFinish = false;
    this.cbEntryList = [];
    this.isStartShowFlag = true;
    this.isCallBackFinish = false;
    this.isSubAppNotifyFinish = false;
    this.finishAction = "";
    this.performanceData = {
      resourceLoadTime: 0,
      blankScreenTime: 0,
      firstScreenTime: 0,
      isFirstRender: true,
      entry: "",
      action: ""
    };
  }
  subscribePerformanceData(callback) {
    try {
      this.targetSubscriber.push(callback);
    } catch (e) {
      (0, import_utils7.warn)(e);
    }
  }
  subscribePerformanceDataOnce(callback) {
    try {
      const wrapCallback = (performanceData) => {
        callback(performanceData);
        this.unsubscribePerformanceData(wrapCallback);
      };
      this.targetSubscriber.push(wrapCallback);
    } catch (e) {
      (0, import_utils7.warn)(e);
    }
  }
  unsubscribePerformanceData(callback) {
    try {
      this.targetSubscriber = this.targetSubscriber.filter((sub) => sub === callback);
    } catch (e) {
      (0, import_utils7.warn)(e);
    }
  }
  subAppBeforeLoad(entry) {
    this.entry = entry;
    this.isRecordFinish = false;
    this.isSubAppNotifyFinish = false;
    this.subAppBeforeLoadTime = performance.now();
    this.isCallBackFinish = false;
    this._handleSubscribeCallback(false);
  }
  subAppBeforeMount() {
    this.subAppBeforeMountTime = performance.now();
    this._subAppStartObserver();
  }
  subAppUnmount() {
    if (!this.isRecordFinish) {
      this._subAppEndObserver("subAppUnmount");
    }
    this._handleSubscribeCallback(true);
  }
  afterRenderNotify() {
    if (!this.isRecordFinish) {
      this._subAppEndObserver("SubAppRenderNotify");
    } else if (!this.isSubAppNotifyFinish) {
      this.isSubAppNotifyFinish = true;
      this.isRecordFinish = true;
      this.finishAction = "SubAppRenderNotify";
      this._subAppPerformanceDataHandle();
    }
  }
  _mutationObserverCallback() {
    if (this.isStartShowFlag) {
      this.subAppStartPageShowTime = performance.now();
      this.isStartShowFlag = false;
    }
    clearTimeout(this.observeTimer);
    this.observeTimer = setTimeout(() => {
      clearTimeout(this.observeTimer);
      if (!this.isRecordFinish) {
        this._subAppEndObserver("MutationObserver");
      }
    }, this.timeLag);
  }
  _subAppEndObserver(finishAction) {
    this.isRecordFinish = true;
    this.finishAction = finishAction;
    this.subAppPageShowTime = performance.now();
    this.observer.disconnect();
    this._subAppPerformanceDataHandle();
    this.isStartShowFlag = true;
  }
  async _subAppStartObserver() {
    try {
      const targetNode = await (0, import_utils7.getRenderNode)(this.domQuerySelector);
      this.observer.observe(targetNode, this.config);
      this._subAppClickEventObserver(targetNode);
    } catch (e) {
      (0, import_utils7.warn)(e);
    }
  }
  _subAppPerformanceDataHandle() {
    const timeDifference = this.finishAction === "MutationObserver" ? this.timeLag : 0;
    this.performanceData = {
      resourceLoadTime: this.subAppBeforeMountTime - this.subAppBeforeLoadTime,
      blankScreenTime: this.subAppStartPageShowTime - this.subAppBeforeLoadTime,
      firstScreenTime: this.subAppPageShowTime - this.subAppBeforeLoadTime - timeDifference,
      isFirstRender: this.cbEntryList.indexOf(this.entry) === -1,
      entry: this.entry,
      action: this.finishAction
    };
  }
  _subAppClickEventObserver(targetNode) {
    const eventCallback = () => {
      clearTimeout(this.observeTimer);
      if (!this.isRecordFinish) {
        this._subAppEndObserver("UserEvent");
      }
    };
    targetNode.addEventListener("click", eventCallback);
    targetNode.addEventListener("keyup", eventCallback);
    targetNode.addEventListener("keydown", eventCallback);
    targetNode.addEventListener("keypress", eventCallback);
  }
  _handleCallback() {
    try {
      this.isCallBackFinish = true;
      this.targetSubscriber.forEach((callback) => {
        const {
          firstScreenTime,
          blankScreenTime,
          resourceLoadTime,
          action,
          entry
        } = this.performanceData;
        if (firstScreenTime > 0 && blankScreenTime > 0 && resourceLoadTime > 0 && action && entry) {
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            console.warn("SUCCESS: ", this.performanceData);
          }
          this.cbEntryList.push(this.entry);
          callback(this.performanceData);
        } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          console.warn("ERROR: ", this.performanceData);
        }
      });
    } catch (e) {
      (0, import_utils7.warn)(e);
    }
  }
  _handleSubscribeCallback(isImmediately) {
    try {
      clearTimeout(this.dataTimer);
      if (isImmediately && !this.isCallBackFinish) {
        this._handleCallback();
      } else {
        this.dataTimer = setTimeout(() => {
          this._handleCallback();
        }, this.reportTimeLag);
      }
    } catch (e) {
      (0, import_utils7.warn)(e);
    }
  }
};

// src/plugins/performance/index.ts
function GarfishPerformance() {
  return function() {
    const subAppMap = {};
    return {
      name: "performance",
      beforeLoad(appInfo) {
        if (!subAppMap[appInfo.name] && appInfo.domGetter) {
          subAppMap[appInfo.name] = new SubAppObserver({
            subAppRootSelector: appInfo.domGetter
          });
        }
        subAppMap[appInfo.name].subAppBeforeLoad(appInfo.entry);
      },
      afterLoad(appInfo, appInstance) {
        if (appInstance) {
          appInstance.appPerformance = subAppMap[appInfo.name];
        }
      },
      beforeMount(appInfo) {
        subAppMap[appInfo.name].subAppBeforeMount(appInfo.entry);
      },
      beforeUnmount(appInfo) {
        subAppMap[appInfo.name].subAppUnmount(appInfo.entry);
      }
    };
  };
}

// src/plugins/logger.ts
var import_utils8 = require("@garfish/utils");
function GarfishLogger() {
  return function() {
    return {
      name: "garfish-logger",
      version: "1.12.0",
      beforeLoad(appInfo, ...args) {
        (0, import_utils8.coreLog)(`${appInfo.name} beforeLoad`, [appInfo, ...args]);
      },
      afterLoad(appInfo, appInstance, ...args) {
        if (appInstance) {
          (0, import_utils8.coreLog)(`${appInfo.name} id: ${appInstance.appId} afterLoad`, [
            appInfo,
            ...args
          ]);
        }
      },
      beforeMount(appInfo, appInstance, ...args) {
        (0, import_utils8.coreLog)(`${appInfo.name} id: ${appInstance.appId} beforeMount`, [
          appInfo,
          ...args
        ]);
      },
      afterMount(appInfo, appInstance, ...args) {
        (0, import_utils8.coreLog)(`${appInfo.name} id: ${appInstance.appId} afterMount`, [
          appInfo,
          ...args
        ]);
      },
      beforeUnmount(appInfo, appInstance, ...args) {
        (0, import_utils8.coreLog)(`${appInfo.name} id: ${appInstance.appId} beforeUnmount`, [
          appInfo,
          ...args
        ]);
      },
      afterUnmount(appInfo, appInstance, ...args) {
        (0, import_utils8.coreLog)(`${appInfo.name} id: ${appInstance.appId} afterUnmount`, [
          appInfo,
          ...args
        ]);
      }
    };
  };
}

// src/garfish.ts
var DEFAULT_PROPS = /* @__PURE__ */ new WeakMap();
var HOOKS_API = {
  SyncHook: import_hooks2.SyncHook,
  AsyncHook: import_hooks2.AsyncHook,
  SyncWaterfallHook: import_hooks2.SyncWaterfallHook,
  AsyncWaterfallHook: import_hooks2.AsyncWaterfallHook
};
var Garfish = class extends import_eventemitter2.EventEmitter2 {
  constructor(options) {
    super();
    this.running = false;
    this.version = "1.12.0";
    this.flag = import_utils9.__GARFISH_FLAG__;
    this.loader = new import_loader4.Loader();
    this.hooks = globalLifecycle();
    this.channel = new import_eventemitter2.EventEmitter2();
    this.options = createDefaultOptions();
    this.externals = {};
    this.activeApps = [];
    this.plugins = {};
    this.cacheApps = {};
    this.appInfos = {};
    this.loading = {};
    var _a;
    this.setOptions(options);
    DEFAULT_PROPS.set(this, {});
    (_a = this.options.plugins) == null ? void 0 : _a.forEach((plugin) => this.usePlugin(plugin));
    this.usePlugin(GarfishHMRPlugin());
    this.usePlugin(GarfishPerformance());
    this.usePlugin(GarfishPreloadPlugin());
    this.usePlugin(GarfishLogger());
  }
  get props() {
    return this.options && this.options.props || DEFAULT_PROPS.get(this);
  }
  setOptions(options) {
    (0, import_utils9.assert)(!this.running, "Garfish is running, can`t set options");
    if ((0, import_utils9.isPlainObject)(options)) {
      this.options = deepMergeConfig(this.options, options);
    }
    return this;
  }
  createPluginSystem(callback) {
    const hooks = callback(HOOKS_API);
    return new import_hooks2.PluginSystem(hooks);
  }
  usePlugin(plugin, ...args) {
    (0, import_utils9.assert)(!this.running, "Cannot register plugin after Garfish is started.");
    (0, import_utils9.assert)(typeof plugin === "function", "Plugin must be a function.");
    args.unshift(this);
    const pluginConfig = plugin.apply(null, args);
    (0, import_utils9.assert)(pluginConfig.name, "The plugin must have a name.");
    if (!this.plugins[pluginConfig.name]) {
      this.plugins[pluginConfig.name] = pluginConfig;
      this.hooks.usePlugin(pluginConfig);
    } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      (0, import_utils9.warn)("Please do not register the plugin repeatedly.");
    }
    return this;
  }
  run(options = {}) {
    var _a;
    if (this.running) {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        (0, import_utils9.warn)("Garfish is already running now, Cannot run Garfish repeatedly.");
      }
      return this;
    }
    this.setOptions(options);
    (_a = options.plugins) == null ? void 0 : _a.forEach((plugin) => this.usePlugin(plugin));
    this.usePlugin(GarfishOptionsLife(this.options, "global-lifecycle"));
    this.hooks.lifecycle.beforeBootstrap.emit(this.options);
    this.registerApp(this.options.apps || []);
    this.running = true;
    this.hooks.lifecycle.bootstrap.emit(this.options);
    return this;
  }
  registerApp(list) {
    const currentAdds = {};
    this.hooks.lifecycle.beforeRegisterApp.emit(list);
    if (!Array.isArray(list))
      list = [list];
    for (const appInfo of list) {
      (0, import_utils9.assert)(appInfo.name, "Miss app.name.");
      if (!this.appInfos[appInfo.name]) {
        (0, import_utils9.assert)(appInfo.entry, `${appInfo.name} application entry is not url: ${appInfo.entry}`);
        currentAdds[appInfo.name] = appInfo;
        this.appInfos[appInfo.name] = appInfo;
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        (0, import_utils9.warn)(`The "${appInfo.name}" app is already registered.`);
      }
    }
    this.hooks.lifecycle.registerApp.emit(currentAdds);
    return this;
  }
  setExternal(nameOrExtObj, value) {
    (0, import_utils9.assert)(nameOrExtObj, "Invalid parameter.");
    if (typeof nameOrExtObj === "object") {
      for (const key in nameOrExtObj) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          this.externals[key] && (0, import_utils9.warn)(`The "${key}" will be overwritten in external.`);
        }
        this.externals[key] = nameOrExtObj[key];
      }
    } else {
      this.externals[nameOrExtObj] = value;
    }
    return this;
  }
  loadApp(appName, options) {
    (0, import_utils9.assert)(appName, "Miss appName.");
    let appInfo = generateAppOptions(appName, this, options);
    const asyncLoadProcess = async () => {
      const stop = await this.hooks.lifecycle.beforeLoad.emit(appInfo);
      if (stop === false) {
        (0, import_utils9.warn)(`Load ${appName} application is terminated by beforeLoad.`);
        return null;
      }
      appInfo = generateAppOptions(appName, this, options);
      (0, import_utils9.assert)(appInfo.entry, `Can't load unexpected child app "${appName}", Please provide the entry parameters or registered in advance of the app.`);
      let appInstance = null;
      const cacheApp = this.cacheApps[appName];
      if (appInfo.cache && cacheApp) {
        appInstance = cacheApp;
      } else {
        try {
          const [manager, resources, isHtmlMode] = await processAppResources(this.loader, appInfo);
          appInstance = new App(this, appInfo, manager, resources, isHtmlMode, appInfo.customLoader);
          for (const key in this.plugins) {
            appInstance.hooks.usePlugin(this.plugins[key]);
          }
          if (appInfo.cache) {
            this.cacheApps[appName] = appInstance;
          }
        } catch (e) {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils9.warn)(e);
          this.hooks.lifecycle.errorLoadApp.emit(e, appInfo);
        }
      }
      await this.hooks.lifecycle.afterLoad.emit(appInfo, appInstance);
      return appInstance;
    };
    if (!this.loading[appName]) {
      this.loading[appName] = asyncLoadProcess().finally(() => {
        delete this.loading[appName];
      });
    }
    return this.loading[appName];
  }
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9nYXJmaXNoLnRzIiwgIi4uL3NyYy9jb25maWcudHMiLCAiLi4vc3JjL21vZHVsZS9hcHAudHMiLCAiLi4vc3JjL2xpZmVjeWNsZS50cyIsICIuLi9zcmMvbW9kdWxlL2VzTW9kdWxlLnRzIiwgIi4uL3NyYy9tb2R1bGUvcmVzb3VyY2UudHMiLCAiLi4vc3JjL3BsdWdpbnMvZml4SE1SLnRzIiwgIi4uL3NyYy9wbHVnaW5zL2xpZmVjeWNsZS50cyIsICIuLi9zcmMvcGx1Z2lucy9wcmVsb2FkLnRzIiwgIi4uL3NyYy9wbHVnaW5zL3BlcmZvcm1hbmNlL3N1YkFwcE9ic2VydmVyLnRzIiwgIi4uL3NyYy9wbHVnaW5zL3BlcmZvcm1hbmNlL2luZGV4LnRzIiwgIi4uL3NyYy9wbHVnaW5zL2xvZ2dlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHR5cGUgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuZXhwb3J0IHsgR2FyZmlzaCBhcyBkZWZhdWx0IH0gZnJvbSAnLi9nYXJmaXNoJztcbiIsICJpbXBvcnQgeyBMb2FkZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyMiB9IGZyb20gJ2V2ZW50ZW1pdHRlcjInO1xuaW1wb3J0IHsgd2FybiwgYXNzZXJ0LCBpc1BsYWluT2JqZWN0LCBfX0dBUkZJU0hfRkxBR19fIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHtcbiAgU3luY0hvb2ssXG4gIEFzeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIEFzeW5jV2F0ZXJmYWxsSG9vayxcbiAgUGx1Z2luU3lzdGVtLFxufSBmcm9tICdAZ2FyZmlzaC9ob29rcyc7XG5pbXBvcnQge1xuICBkZWVwTWVyZ2VDb25maWcsXG4gIGdlbmVyYXRlQXBwT3B0aW9ucyxcbiAgY3JlYXRlRGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vbW9kdWxlL2FwcCc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZ2xvYmFsTGlmZWN5Y2xlIH0gZnJvbSAnLi9saWZlY3ljbGUnO1xuaW1wb3J0IHsgcHJvY2Vzc0FwcFJlc291cmNlcyB9IGZyb20gJy4vbW9kdWxlL3Jlc291cmNlJztcbmltcG9ydCB7IEdhcmZpc2hITVJQbHVnaW4gfSBmcm9tICcuL3BsdWdpbnMvZml4SE1SJztcbmltcG9ydCB7IEdhcmZpc2hPcHRpb25zTGlmZSB9IGZyb20gJy4vcGx1Z2lucy9saWZlY3ljbGUnO1xuaW1wb3J0IHsgR2FyZmlzaFByZWxvYWRQbHVnaW4gfSBmcm9tICcuL3BsdWdpbnMvcHJlbG9hZCc7XG5pbXBvcnQgeyBHYXJmaXNoUGVyZm9ybWFuY2UgfSBmcm9tICcuL3BsdWdpbnMvcGVyZm9ybWFuY2UnO1xuaW1wb3J0IHsgR2FyZmlzaExvZ2dlciB9IGZyb20gJy4vcGx1Z2lucy9sb2dnZXInO1xuXG5jb25zdCBERUZBVUxUX1BST1BTID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IEhPT0tTX0FQSSA9IHtcbiAgU3luY0hvb2ssXG4gIEFzeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIEFzeW5jV2F0ZXJmYWxsSG9vayxcbn07XG5cbmV4cG9ydCBjbGFzcyBHYXJmaXNoIGV4dGVuZHMgRXZlbnRFbWl0dGVyMiB7XG4gIHB1YmxpYyBydW5uaW5nID0gZmFsc2U7XG4gIHB1YmxpYyB2ZXJzaW9uID0gJzEuMTIuMCc7XG4gIHB1YmxpYyBmbGFnID0gX19HQVJGSVNIX0ZMQUdfXzsgLy8gQSB1bmlxdWUgaWRlbnRpZmllclxuICBwdWJsaWMgbG9hZGVyID0gbmV3IExvYWRlcigpO1xuICBwdWJsaWMgaG9va3MgPSBnbG9iYWxMaWZlY3ljbGUoKTtcbiAgcHVibGljIGNoYW5uZWwgPSBuZXcgRXZlbnRFbWl0dGVyMigpO1xuICBwdWJsaWMgb3B0aW9ucyA9IGNyZWF0ZURlZmF1bHRPcHRpb25zKCk7XG4gIHB1YmxpYyBleHRlcm5hbHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcbiAgcHVibGljIGFjdGl2ZUFwcHM6IEFycmF5PGludGVyZmFjZXMuQXBwPiA9IFtdO1xuICBwdWJsaWMgcGx1Z2luczogaW50ZXJmYWNlcy5QbHVnaW5zID0ge30gYXMgYW55O1xuICBwdWJsaWMgY2FjaGVBcHBzOiBSZWNvcmQ8c3RyaW5nLCBpbnRlcmZhY2VzLkFwcD4gPSB7fTtcbiAgcHVibGljIGFwcEluZm9zOiBSZWNvcmQ8c3RyaW5nLCBpbnRlcmZhY2VzLkFwcEluZm8+ID0ge307XG5cbiAgcHJpdmF0ZSBsb2FkaW5nOiBSZWNvcmQ8c3RyaW5nLCBQcm9taXNlPGFueT4+ID0ge307XG5cbiAgZ2V0IHByb3BzKCk6IFJlY29yZDxzdHJpbmcsIGFueT4ge1xuICAgIHJldHVybiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5wcm9wcykgfHwgREVGQVVMVF9QUk9QUy5nZXQodGhpcyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBpbnRlcmZhY2VzLk9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICBERUZBVUxUX1BST1BTLnNldCh0aGlzLCB7fSk7XG4gICAgdGhpcy5vcHRpb25zLnBsdWdpbnM/LmZvckVhY2goKHBsdWdpbikgPT4gdGhpcy51c2VQbHVnaW4ocGx1Z2luKSk7XG4gICAgdGhpcy51c2VQbHVnaW4oR2FyZmlzaEhNUlBsdWdpbigpKTtcbiAgICB0aGlzLnVzZVBsdWdpbihHYXJmaXNoUGVyZm9ybWFuY2UoKSk7XG4gICAgdGhpcy51c2VQbHVnaW4oR2FyZmlzaFByZWxvYWRQbHVnaW4oKSk7XG4gICAgdGhpcy51c2VQbHVnaW4oR2FyZmlzaExvZ2dlcigpKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9uczogUGFydGlhbDxpbnRlcmZhY2VzLk9wdGlvbnM+KSB7XG4gICAgYXNzZXJ0KCF0aGlzLnJ1bm5pbmcsICdHYXJmaXNoIGlzIHJ1bm5pbmcsIGNhbmB0IHNldCBvcHRpb25zJyk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3Qob3B0aW9ucykpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGRlZXBNZXJnZUNvbmZpZyh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNyZWF0ZVBsdWdpblN5c3RlbTxUIGV4dGVuZHMgKGFwaTogdHlwZW9mIEhPT0tTX0FQSSkgPT4gYW55PihjYWxsYmFjazogVCkge1xuICAgIGNvbnN0IGhvb2tzID0gY2FsbGJhY2soSE9PS1NfQVBJKTtcbiAgICByZXR1cm4gbmV3IFBsdWdpblN5c3RlbTxSZXR1cm5UeXBlPFQ+Pihob29rcyk7XG4gIH1cblxuICB1c2VQbHVnaW4oXG4gICAgcGx1Z2luOiAoY29udGV4dDogR2FyZmlzaCkgPT4gaW50ZXJmYWNlcy5QbHVnaW4sXG4gICAgLi4uYXJnczogQXJyYXk8YW55PlxuICApIHtcbiAgICBhc3NlcnQoIXRoaXMucnVubmluZywgJ0Nhbm5vdCByZWdpc3RlciBwbHVnaW4gYWZ0ZXIgR2FyZmlzaCBpcyBzdGFydGVkLicpO1xuICAgIGFzc2VydCh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nLCAnUGx1Z2luIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgY29uc3QgcGx1Z2luQ29uZmlnID0gcGx1Z2luLmFwcGx5KG51bGwsIGFyZ3MpIGFzIGludGVyZmFjZXMuUGx1Z2luO1xuICAgIGFzc2VydChwbHVnaW5Db25maWcubmFtZSwgJ1RoZSBwbHVnaW4gbXVzdCBoYXZlIGEgbmFtZS4nKTtcblxuICAgIGlmICghdGhpcy5wbHVnaW5zW3BsdWdpbkNvbmZpZy5uYW1lXSkge1xuICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpbkNvbmZpZy5uYW1lXSA9IHBsdWdpbkNvbmZpZztcbiAgICAgIC8vIFJlZ2lzdGVyIGhvb2tzLCBDb21wYXRpYmxlIHdpdGggdGhlIG9sZCBhcGlcbiAgICAgIHRoaXMuaG9va3MudXNlUGx1Z2luKHBsdWdpbkNvbmZpZyk7XG4gICAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgd2FybignUGxlYXNlIGRvIG5vdCByZWdpc3RlciB0aGUgcGx1Z2luIHJlcGVhdGVkbHkuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcnVuKG9wdGlvbnM6IGludGVyZmFjZXMuT3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgIHdhcm4oJ0dhcmZpc2ggaXMgYWxyZWFkeSBydW5uaW5nIG5vdywgQ2Fubm90IHJ1biBHYXJmaXNoIHJlcGVhdGVkbHkuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgLy8gUmVnaXN0ZXIgcGx1Z2luc1xuICAgIG9wdGlvbnMucGx1Z2lucz8uZm9yRWFjaCgocGx1Z2luKSA9PiB0aGlzLnVzZVBsdWdpbihwbHVnaW4pKTtcbiAgICAvLyBQdXQgdGhlIGxpZmVjeWNsZSBwbHVnaW4gYXQgdGhlIGVuZCwgc28gdGhhdCB5b3UgY2FuIGdldCB0aGUgY2hhbmdlcyBvZiBvdGhlciBwbHVnaW5zXG4gICAgdGhpcy51c2VQbHVnaW4oR2FyZmlzaE9wdGlvbnNMaWZlKHRoaXMub3B0aW9ucywgJ2dsb2JhbC1saWZlY3ljbGUnKSk7XG5cbiAgICAvLyBFbWl0IGhvb2tzIGFuZCByZWdpc3RlciBhcHBzXG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlQm9vdHN0cmFwLmVtaXQodGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnJlZ2lzdGVyQXBwKHRoaXMub3B0aW9ucy5hcHBzIHx8IFtdKTtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJvb3RzdHJhcC5lbWl0KHRoaXMub3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZWdpc3RlckFwcChsaXN0OiBpbnRlcmZhY2VzLkFwcEluZm8gfCBBcnJheTxpbnRlcmZhY2VzLkFwcEluZm8+KSB7XG4gICAgY29uc3QgY3VycmVudEFkZHMgPSB7fTtcbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVSZWdpc3RlckFwcC5lbWl0KGxpc3QpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkgbGlzdCA9IFtsaXN0XTtcblxuICAgIGZvciAoY29uc3QgYXBwSW5mbyBvZiBsaXN0KSB7XG4gICAgICBhc3NlcnQoYXBwSW5mby5uYW1lLCAnTWlzcyBhcHAubmFtZS4nKTtcbiAgICAgIGlmICghdGhpcy5hcHBJbmZvc1thcHBJbmZvLm5hbWVdKSB7XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICBhcHBJbmZvLmVudHJ5LFxuICAgICAgICAgIGAke2FwcEluZm8ubmFtZX0gYXBwbGljYXRpb24gZW50cnkgaXMgbm90IHVybDogJHthcHBJbmZvLmVudHJ5fWAsXG4gICAgICAgICk7XG4gICAgICAgIGN1cnJlbnRBZGRzW2FwcEluZm8ubmFtZV0gPSBhcHBJbmZvO1xuICAgICAgICB0aGlzLmFwcEluZm9zW2FwcEluZm8ubmFtZV0gPSBhcHBJbmZvO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICB3YXJuKGBUaGUgXCIke2FwcEluZm8ubmFtZX1cIiBhcHAgaXMgYWxyZWFkeSByZWdpc3RlcmVkLmApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5yZWdpc3RlckFwcC5lbWl0KGN1cnJlbnRBZGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldEV4dGVybmFsKG5hbWVPckV4dE9iajogc3RyaW5nIHwgUmVjb3JkPHN0cmluZywgYW55PiwgdmFsdWU/OiBhbnkpIHtcbiAgICBhc3NlcnQobmFtZU9yRXh0T2JqLCAnSW52YWxpZCBwYXJhbWV0ZXIuJyk7XG4gICAgaWYgKHR5cGVvZiBuYW1lT3JFeHRPYmogPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBuYW1lT3JFeHRPYmopIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgdGhpcy5leHRlcm5hbHNba2V5XSAmJlxuICAgICAgICAgICAgd2FybihgVGhlIFwiJHtrZXl9XCIgd2lsbCBiZSBvdmVyd3JpdHRlbiBpbiBleHRlcm5hbC5gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4dGVybmFsc1trZXldID0gbmFtZU9yRXh0T2JqW2tleV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXh0ZXJuYWxzW25hbWVPckV4dE9ial0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsb2FkQXBwKFxuICAgIGFwcE5hbWU6IHN0cmluZyxcbiAgICBvcHRpb25zPzogUGFydGlhbDxPbWl0PGludGVyZmFjZXMuQXBwSW5mbywgJ25hbWUnPj4sXG4gICk6IFByb21pc2U8aW50ZXJmYWNlcy5BcHAgfCBudWxsPiB7XG4gICAgYXNzZXJ0KGFwcE5hbWUsICdNaXNzIGFwcE5hbWUuJyk7XG5cbiAgICBsZXQgYXBwSW5mbyA9IGdlbmVyYXRlQXBwT3B0aW9ucyhhcHBOYW1lLCB0aGlzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGFzeW5jTG9hZFByb2Nlc3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBSZXR1cm4gbm90IHVuZGVmaW5lZCB0eXBlIGRhdGEgZGlyZWN0bHkgdG8gZW5kIGxvYWRpbmdcbiAgICAgIGNvbnN0IHN0b3AgPSBhd2FpdCB0aGlzLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVMb2FkLmVtaXQoYXBwSW5mbyk7XG5cbiAgICAgIGlmIChzdG9wID09PSBmYWxzZSkge1xuICAgICAgICB3YXJuKGBMb2FkICR7YXBwTmFtZX0gYXBwbGljYXRpb24gaXMgdGVybWluYXRlZCBieSBiZWZvcmVMb2FkLmApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy9tZXJnZSBjb25maWdzIGFnYWluIGFmdGVyIGJlZm9yZUxvYWQgZm9yIHRoZSByZWFzb24gb2YgYXBwIG1heSBiZSByZS1yZWdpc3RlcmVkIGR1cmluZyBiZWZvcmVMb2FkIHJlc3VsdGluZyBpbiBhbiBpbmNvcnJlY3QgaW5mb3JtYXRpb25cbiAgICAgIGFwcEluZm8gPSBnZW5lcmF0ZUFwcE9wdGlvbnMoYXBwTmFtZSwgdGhpcywgb3B0aW9ucyk7XG5cbiAgICAgIGFzc2VydChcbiAgICAgICAgYXBwSW5mby5lbnRyeSxcbiAgICAgICAgYENhbid0IGxvYWQgdW5leHBlY3RlZCBjaGlsZCBhcHAgXCIke2FwcE5hbWV9XCIsIGAgK1xuICAgICAgICAgICdQbGVhc2UgcHJvdmlkZSB0aGUgZW50cnkgcGFyYW1ldGVycyBvciByZWdpc3RlcmVkIGluIGFkdmFuY2Ugb2YgdGhlIGFwcC4nLFxuICAgICAgKTtcblxuICAgICAgLy8gRXhpc3RpbmcgY2FjaGUgY2FjaGluZyBsb2dpY1xuICAgICAgbGV0IGFwcEluc3RhbmNlOiBpbnRlcmZhY2VzLkFwcCB8IG51bGwgPSBudWxsO1xuICAgICAgY29uc3QgY2FjaGVBcHAgPSB0aGlzLmNhY2hlQXBwc1thcHBOYW1lXTtcblxuICAgICAgaWYgKGFwcEluZm8uY2FjaGUgJiYgY2FjaGVBcHApIHtcbiAgICAgICAgYXBwSW5zdGFuY2UgPSBjYWNoZUFwcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgW21hbmFnZXIsIHJlc291cmNlcywgaXNIdG1sTW9kZV0gPSBhd2FpdCBwcm9jZXNzQXBwUmVzb3VyY2VzKFxuICAgICAgICAgICAgdGhpcy5sb2FkZXIsXG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBhcHBJbnN0YW5jZSA9IG5ldyBBcHAoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgYXBwSW5mbyxcbiAgICAgICAgICAgIG1hbmFnZXIsXG4gICAgICAgICAgICByZXNvdXJjZXMsXG4gICAgICAgICAgICBpc0h0bWxNb2RlLFxuICAgICAgICAgICAgYXBwSW5mby5jdXN0b21Mb2FkZXIsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIFRoZSByZWdpc3RyYXRpb24gaG9vayB3aWxsIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBkdXBsaWNhdGlvblxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgYXBwSW5zdGFuY2UuaG9va3MudXNlUGx1Z2luKHRoaXMucGx1Z2luc1trZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFwcEluZm8uY2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVBcHBzW2FwcE5hbWVdID0gYXBwSW5zdGFuY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihlKTtcbiAgICAgICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5lcnJvckxvYWRBcHAuZW1pdChlLCBhcHBJbmZvKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlckxvYWQuZW1pdChhcHBJbmZvLCBhcHBJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gYXBwSW5zdGFuY2U7XG4gICAgfTtcblxuICAgIGlmICghdGhpcy5sb2FkaW5nW2FwcE5hbWVdKSB7XG4gICAgICB0aGlzLmxvYWRpbmdbYXBwTmFtZV0gPSBhc3luY0xvYWRQcm9jZXNzKCkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmxvYWRpbmdbYXBwTmFtZV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9hZGluZ1thcHBOYW1lXTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIGVycm9yLFxuICBpc09iamVjdCxcbiAgZGVlcE1lcmdlLFxuICBmaWx0ZXJVbmRlZmluZWRWYWwsXG4gIGFzc2VydCxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgQXBwSW5mbyB9IGZyb20gJy4vbW9kdWxlL2FwcCc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG4vLyBmaWx0ZXIgdW5sZXNzIGdsb2JhbCBjb25maWdcbmNvbnN0IGZpbHRlckFwcENvbmZpZ0tleXM6IFJlY29yZDxcbiAgRXhjbHVkZTxrZXlvZiBpbnRlcmZhY2VzLk9wdGlvbnMsIGtleW9mIEFwcEluZm8+LFxuICB0cnVlXG4+ID0ge1xuICBiZWZvcmVCb290c3RyYXA6IHRydWUsXG4gIGJvb3RzdHJhcDogdHJ1ZSxcbiAgYmVmb3JlUmVnaXN0ZXJBcHA6IHRydWUsXG4gIHJlZ2lzdGVyQXBwOiB0cnVlLFxuICBiZWZvcmVMb2FkOiB0cnVlLFxuICBhZnRlckxvYWQ6IHRydWUsXG4gIGVycm9yTG9hZEFwcDogdHJ1ZSxcbiAgYXBwSUQ6IHRydWUsXG4gIGFwcHM6IHRydWUsXG4gIGRpc2FibGVTdGF0aXN0aWNzOiB0cnVlLFxuICBkaXNhYmxlUHJlbG9hZEFwcDogdHJ1ZSxcbiAgcGx1Z2luczogdHJ1ZSxcbiAgYXV0b1JlZnJlc2hBcHA6IHRydWUsXG4gIG9uTm90TWF0Y2hSb3V0ZXI6IHRydWUsXG4gIGxvYWRlcjogdHJ1ZSxcbn07XG5cbi8vIGBwcm9wc2AgbWF5IGJlIHJlc3BvbnNpdmUgZGF0YVxuZXhwb3J0IGNvbnN0IGRlZXBNZXJnZUNvbmZpZyA9IDxcbiAgVCBleHRlbmRzIHsgcHJvcHM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH0sXG4gIFUgZXh0ZW5kcyB7IHByb3BzPzogUmVjb3JkPHN0cmluZywgYW55PiB9LFxuPihcbiAgZ2xvYmFsQ29uZmlnOiBULFxuICBsb2NhbENvbmZpZzogVSxcbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICAuLi4oZ2xvYmFsQ29uZmlnLnByb3BzIHx8IHt9KSxcbiAgICAuLi4obG9jYWxDb25maWcucHJvcHMgfHwge30pLFxuICB9O1xuXG4gIGNvbnN0IHJlc3VsdCA9IGRlZXBNZXJnZShcbiAgICBmaWx0ZXJVbmRlZmluZWRWYWwoZ2xvYmFsQ29uZmlnKSxcbiAgICBmaWx0ZXJVbmRlZmluZWRWYWwobG9jYWxDb25maWcpLFxuICApO1xuICByZXN1bHQucHJvcHMgPSBwcm9wcztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRBcHBDb25maWcgPSAoXG4gIGdsb2JhbENvbmZpZzogaW50ZXJmYWNlcy5PcHRpb25zLFxuICBsb2NhbENvbmZpZzogQXBwSW5mbyxcbik6IEFwcEluZm8gPT4ge1xuICBjb25zdCBtZXJnZVJlc3VsdCA9IGRlZXBNZXJnZUNvbmZpZyhnbG9iYWxDb25maWcsIGxvY2FsQ29uZmlnKTtcblxuICBPYmplY3Qua2V5cyhtZXJnZVJlc3VsdCkuZm9yRWFjaCgoa2V5OiBrZXlvZiBpbnRlcmZhY2VzLkNvbmZpZykgPT4ge1xuICAgIGlmIChmaWx0ZXJBcHBDb25maWdLZXlzW2tleV0pIHtcbiAgICAgIGRlbGV0ZSBtZXJnZVJlc3VsdFtrZXldO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1lcmdlUmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQXBwT3B0aW9ucyA9IChcbiAgYXBwTmFtZTogc3RyaW5nLFxuICBnYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gsXG4gIG9wdGlvbnM/OiBQYXJ0aWFsPE9taXQ8QXBwSW5mbywgJ25hbWUnPj4sXG4pOiBBcHBJbmZvID0+IHtcbiAgbGV0IGFwcEluZm86IEFwcEluZm8gPSBnYXJmaXNoLmFwcEluZm9zW2FwcE5hbWVdIHx8IHsgbmFtZTogYXBwTmFtZSB9O1xuXG4gIC8vIE1lcmdlIHJlZ2lzdGVyIGFwcEluZm8gY29uZmlnIGFuZCBsb2FkQXBwIGNvbmZpZ1xuICBhcHBJbmZvID0gZ2V0QXBwQ29uZmlnKGdhcmZpc2gub3B0aW9ucywge1xuICAgIC4uLmFwcEluZm8sXG4gICAgLi4ub3B0aW9ucyxcbiAgICBwcm9wczoge1xuICAgICAgLi4uKGFwcEluZm8ucHJvcHMgfHwge30pLFxuICAgICAgLi4uKG9wdGlvbnM/LnByb3BzIHx8IHt9KSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gYXBwSW5mbztcbn07XG5cbi8vIEVhY2ggbWFpbiBhcHBsaWNhdGlvbiBuZWVkcyB0byBnZW5lcmF0ZSBhIG5ldyBjb25maWd1cmF0aW9uXG5leHBvcnQgY29uc3QgY3JlYXRlRGVmYXVsdE9wdGlvbnMgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbmZpZzogaW50ZXJmYWNlcy5PcHRpb25zID0ge1xuICAgIC8vIGdsb2JhbCBjb25maWdcbiAgICBhcHBJRDogJycsXG4gICAgYXBwczogW10sXG4gICAgYXV0b1JlZnJlc2hBcHA6IHRydWUsXG4gICAgZGlzYWJsZVN0YXRpc3RpY3M6IGZhbHNlLFxuICAgIGRpc2FibGVQcmVsb2FkQXBwOiBmYWxzZSxcbiAgICAvLyBhcHAgY29uZmlnXG4gICAgYmFzZW5hbWU6ICcvJyxcbiAgICBwcm9wczoge30sXG4gICAgLy8gVXNlIGFuIGVtcHR5IGRpdiBieSBkZWZhdWx0XG4gICAgZG9tR2V0dGVyOiAoKSA9PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBzYW5kYm94OiB7XG4gICAgICBzbmFwc2hvdDogZmFsc2UsXG4gICAgICBmaXhCYXNlVXJsOiBmYWxzZSxcbiAgICAgIGRpc2FibGVXaXRoOiBmYWxzZSxcbiAgICAgIHN0cmljdElzb2xhdGlvbjogZmFsc2UsXG4gICAgfSxcbiAgICAvLyBnbG9iYWwgaG9va3NcbiAgICBiZWZvcmVMb2FkOiAoKSA9PiB7fSxcbiAgICBhZnRlckxvYWQ6ICgpID0+IHt9LFxuICAgIGVycm9yTG9hZEFwcDogKGUpID0+IGVycm9yKGUpLFxuICAgIC8vIFJvdXRlclxuICAgIG9uTm90TWF0Y2hSb3V0ZXI6ICgpID0+IHt9LFxuICAgIC8vIGFwcCBob29rc1xuICAgIC8vIENvZGUgZXZhbCBob29rc1xuICAgIGJlZm9yZUV2YWw6ICgpID0+IHt9LFxuICAgIGFmdGVyRXZhbDogKCkgPT4ge30sXG4gICAgLy8gQXBwIG1vdW50IGhvb2tzXG4gICAgYmVmb3JlTW91bnQ6ICgpID0+IHt9LFxuICAgIGFmdGVyTW91bnQ6ICgpID0+IHt9LFxuICAgIGJlZm9yZVVubW91bnQ6ICgpID0+IHt9LFxuICAgIGFmdGVyVW5tb3VudDogKCkgPT4ge30sXG4gICAgLy8gRXJyb3IgaG9va3NcbiAgICBlcnJvck1vdW50QXBwOiAoZSkgPT4gZXJyb3IoZSksXG4gICAgZXJyb3JVbm1vdW50QXBwOiAoZSkgPT4gZXJyb3IoZSksXG4gICAgY3VzdG9tTG9hZGVyOiB1bmRlZmluZWQsIC8vIGRlcHJlY2F0ZWRcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsICJpbXBvcnQgeyBTdHlsZU1hbmFnZXIsIFRlbXBsYXRlTWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICBUZXh0LFxuICBOb2RlLFxuICB3YXJuLFxuICBhc3NlcnQsXG4gIGhhc093bixcbiAgcmVtb3ZlLFxuICBRdWV1ZSxcbiAgY29yZUxvZyxcbiAgaXNKc1R5cGUsXG4gIGlzT2JqZWN0LFxuICBpc1Byb21pc2UsXG4gIGlzR2FyZmlzaENvbmZpZ1R5cGUsXG4gIHRvQm9vbGVhbixcbiAgZmluZFRhcmdldCxcbiAgZXZhbFdpdGhFbnYsXG4gIHRyYW5zZm9ybVVybCxcbiAgX19Nb2NrQm9keV9fLFxuICBfX01vY2tIZWFkX18sXG4gIGdldFJlbmRlck5vZGUsXG4gIHNvdXJjZUxpc3RUYWdzLFxuICBjcmVhdGVBcHBDb250YWluZXIsXG4gIHNldERvY0N1cnJlbnRTY3JpcHQsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IEdhcmZpc2ggfSBmcm9tICcuLi9nYXJmaXNoJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgYXBwTGlmZWN5Y2xlIH0gZnJvbSAnLi4vbGlmZWN5Y2xlJztcbmltcG9ydCB7IEVTTW9kdWxlTG9hZGVyIH0gZnJvbSAnLi9lc01vZHVsZSc7XG5pbXBvcnQgeyBTdWJBcHBPYnNlcnZlciB9IGZyb20gJy4uL3BsdWdpbnMvcGVyZm9ybWFuY2Uvc3ViQXBwT2JzZXJ2ZXInO1xuXG5leHBvcnQgdHlwZSBDdXN0b21lckxvYWRlciA9IChcbiAgcHJvdmlkZXI6IGludGVyZmFjZXMuUHJvdmlkZXIsXG4gIGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgcGF0aD86IHN0cmluZyxcbikgPT4gUHJvbWlzZTxpbnRlcmZhY2VzLkxvYWRlclJlc3VsdCB8IHZvaWQ+IHwgaW50ZXJmYWNlcy5Mb2FkZXJSZXN1bHQgfCB2b2lkO1xuXG5leHBvcnQgdHlwZSBBcHBJbmZvID0gaW50ZXJmYWNlcy5BcHBJbmZvICYge1xuICBhcHBJZD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY1NjcmlwdE9wdGlvbnMge1xuICBub2RlPzogTm9kZTtcbiAgYXN5bmM/OiBib29sZWFuO1xuICBub0VudHJ5PzogYm9vbGVhbjtcbiAgaXNJbmxpbmU/OiBib29sZWFuO1xuICBpc01vZHVsZT86IGJvb2xlYW47XG59XG5cbmxldCBhcHBJZCA9IDA7XG5jb25zdCBfX0dBUkZJU0hfR0xPQkFMX0VOVl9fID0gJ19fR0FSRklTSF9HTE9CQUxfRU5WX18nO1xuZXhwb3J0IGNvbnN0IF9fR0FSRklTSF9FWFBPUlRTX18gPSAnX19HQVJGSVNIX0VYUE9SVFNfXyc7XG5cbi8vIEhhdmUgdGhlIGFiaWxpdHkgdG8gQXBwIGluc3RhbmNlXG4vLyAxLiBQcm92aWRlIHN0YXRpYyByZXNvdXJjZSwgdGhlIHN0cnVjdHVyZSBvZiB0aGUgSFRNTCwgQ1NTLCBqcy5cbi8vIDIuIENhbiBiZSBleHRyYWN0ZWQgaW4gdGhlIGpzIENKUyB0aHJvdWdoIHNjb3BlIF9fR0FSRklTSF9FWFBPUlRTX18gbmFtZXNwYWNlIG9yIGdldCBjaGlsZCBhcHBsaWNhdGlvbiBwcm92aWRlciBpcyBkZWR1Y2VkLlxuLy8gMy4gVGhyb3VnaCBleGVjQ29kZSBpbmNvbWluZyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgc3VjaCBhcyBDSlMgc3BlY2lmaWNhdGlvbiBvZiB0aGUgbW9kdWxlLCB0aGUgcmVxdWlyZSwgZXhwb3J0cyB0byByZWFsaXplIGV4dGVybmFsIHNoYXJpbmdcbi8vIDQuIFRyaWdnZXIgcmVuZGVyaW5nXHVGRjFBQXBwbGljYXRpb24gcmVsYXRlZCBub2RlcyBwbGFjZWQgaW4gdGhlIGRvY3VtZW50IGZsb3csIHdoaWNoIGluIHR1cm4gcGVyZm9ybSBhcHBsaWNhdGlvbiBzY3JpcHRzLCBmaW5hbCByZW5kZXIgZnVuY3Rpb24sXG4vLyAgICBwZXJmb3JtIHRoZSBzb24gYXBwbGljYXRpb24gcHJvdmlkZXMgY29tcGxldGUgYXBwbGljYXRpb24gaW5kZXBlbmRlbnQgcnVudGltZSBleGVjdXRpb24uXG4vLyA1LiBUcmlnZ2VyIHRoZSBkZXN0cnVjdGlvbjogUGVyZm9ybSB0aGUgZGVzdHJveSBmdW5jdGlvbiBvZiBjaGlsZCBhcHBsaWNhdGlvbiwgYW5kIGFwcGxpZXMgdGhlIGNoaWxkIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIHRoZSBkb2N1bWVudCBmbG93LlxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gIHB1YmxpYyBhcHBJZCA9IGFwcElkKys7XG4gIHB1YmxpYyBzY3JpcHRDb3VudCA9IDA7XG4gIHB1YmxpYyBkaXNwbGF5ID0gZmFsc2U7XG4gIHB1YmxpYyBtb3VudGVkID0gZmFsc2U7XG4gIHB1YmxpYyBzdHJpY3RJc29sYXRpb24gPSBmYWxzZTtcbiAgcHVibGljIGVzbVF1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gIHB1YmxpYyBlc01vZHVsZUxvYWRlciA9IG5ldyBFU01vZHVsZUxvYWRlcih0aGlzKTtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzSHRtbE1vZGU6IGJvb2xlYW47XG4gIHB1YmxpYyBnbG9iYWw6IGFueSA9IHdpbmRvdztcbiAgcHVibGljIGFwcENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBjanNNb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICBwdWJsaWMgaHRtbE5vZGU6IEhUTUxFbGVtZW50IHwgU2hhZG93Um9vdDtcbiAgcHVibGljIGN1c3RvbUV4cG9ydHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTsgLy8gSWYgeW91IGRvbid0IHdhbnQgdG8gdXNlIHRoZSBDSlMgZXhwb3J0LCBjYW4gdXNlIHRoaXNcbiAgcHVibGljIHNvdXJjZUxpc3Q6IEFycmF5PHsgdGFnTmFtZTogc3RyaW5nOyB1cmw6IHN0cmluZyB9PiA9IFtdO1xuICBwdWJsaWMgc291cmNlTGlzdE1hcDogTWFwPHN0cmluZywgeyB0YWdOYW1lOiBzdHJpbmc7IHVybDogc3RyaW5nIH0+ID0gbmV3IE1hcCgpO1xuICBwdWJsaWMgYXBwSW5mbzogQXBwSW5mbztcbiAgcHVibGljIGNvbnRleHQ6IEdhcmZpc2g7XG4gIHB1YmxpYyBob29rczogaW50ZXJmYWNlcy5BcHBIb29rcztcbiAgcHVibGljIHByb3ZpZGVyPzogaW50ZXJmYWNlcy5Qcm92aWRlcjtcbiAgcHVibGljIGVudHJ5TWFuYWdlcjogVGVtcGxhdGVNYW5hZ2VyO1xuICBwdWJsaWMgYXBwUGVyZm9ybWFuY2U6IFN1YkFwcE9ic2VydmVyO1xuICBwdWJsaWMgY3VzdG9tTG9hZGVyPzogQ3VzdG9tZXJMb2FkZXI7XG4gIHB1YmxpYyBjaGlsZEdhcmZpc2hDb25maWc6IGludGVyZmFjZXMuQ2hpbGRHYXJmaXNoQ29uZmlnID0ge307XG4gIHByaXZhdGUgYWN0aXZlID0gZmFsc2U7XG4gIHB1YmxpYyBtb3VudGluZyA9IGZhbHNlO1xuICBwcml2YXRlIHVubW91bnRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZXNvdXJjZXM6IGludGVyZmFjZXMuUmVzb3VyY2VNb2R1bGVzO1xuICAvLyBFbnZpcm9ubWVudCB2YXJpYWJsZXMgaW5qZWN0ZWQgYnkgZ2FyZmlzaCBmb3IgbGlua2FnZSB3aXRoIGNoaWxkIGFwcGxpY2F0aW9uc1xuICBwcml2YXRlIGdsb2JhbEVudlZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb250ZXh0OiBHYXJmaXNoLFxuICAgIGFwcEluZm86IEFwcEluZm8sXG4gICAgZW50cnlNYW5hZ2VyOiBUZW1wbGF0ZU1hbmFnZXIsXG4gICAgcmVzb3VyY2VzOiBpbnRlcmZhY2VzLlJlc291cmNlTW9kdWxlcyxcbiAgICBpc0h0bWxNb2RlOiBib29sZWFuLFxuICAgIGN1c3RvbUxvYWRlcj86IEN1c3RvbWVyTG9hZGVyLFxuICApIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuYXBwSW5mbyA9IGFwcEluZm87XG4gICAgdGhpcy5uYW1lID0gYXBwSW5mby5uYW1lO1xuICAgIHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuICAgIHRoaXMuaXNIdG1sTW9kZSA9IGlzSHRtbE1vZGU7XG4gICAgdGhpcy5lbnRyeU1hbmFnZXIgPSBlbnRyeU1hbmFnZXI7XG5cbiAgICAvLyBgYXBwSW5mb2AgaXMgY29tcGxldGVseSBpbmRlcGVuZGVudCBhbmQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBgYXBwSWRgXG4gICAgdGhpcy5hcHBJbmZvLmFwcElkID0gdGhpcy5hcHBJZDtcblxuICAgIC8vIEdhcmZpc2ggZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgdGhpcy5nbG9iYWxFbnZWYXJpYWJsZXMgPSB7XG4gICAgICBjdXJyZW50QXBwOiB0aGlzLFxuICAgICAgbG9hZGVyOiBjb250ZXh0LmxvYWRlcixcbiAgICAgIGV4dGVybmFsczogY29udGV4dC5leHRlcm5hbHMsXG4gICAgICByZW1vdGVNb2R1bGVzQ29kZTogcmVzb3VyY2VzLm1vZHVsZXMsXG4gICAgfTtcbiAgICB0aGlzLmNqc01vZHVsZXMgPSB7XG4gICAgICBleHBvcnRzOiB7fSxcbiAgICAgIG1vZHVsZTogbnVsbCxcbiAgICAgIHJlcXVpcmU6IChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBwa2cgPSB0aGlzLmdsb2JhbFtrZXldIHx8IGNvbnRleHQuZXh0ZXJuYWxzW2tleV0gfHwgd2luZG93W2tleV07XG4gICAgICAgIGlmICghcGtnKSB7XG4gICAgICAgICAgd2FybihgUGFja2FnZSBcIiR7a2V5fVwiIGlzIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwa2c7XG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy5janNNb2R1bGVzLm1vZHVsZSA9IHRoaXMuY2pzTW9kdWxlcztcbiAgICB0aGlzLmN1c3RvbUxvYWRlciA9IGN1c3RvbUxvYWRlcjtcblxuICAgIC8vIFJlZ2lzdGVyIGhvb2tzXG4gICAgdGhpcy5ob29rcyA9IGFwcExpZmVjeWNsZSgpO1xuICAgIHRoaXMuaG9va3MudXNlUGx1Z2luKHtcbiAgICAgIC4uLmFwcEluZm8sXG4gICAgICBuYW1lOiBgJHthcHBJbmZvLm5hbWV9LWxpZmVjeWNsZWAsXG4gICAgfSk7XG5cbiAgICAvLyBTYXZlIGFsbCB0aGUgcmVzb3VyY2VzIHRvIGFkZHJlc3NcbiAgICBjb25zdCBub2RlcyA9IGVudHJ5TWFuYWdlci5nZXROb2Rlc0J5VGFnTmFtZSguLi5zb3VyY2VMaXN0VGFncyk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZXMpIHtcbiAgICAgIG5vZGVzW2tleV0uZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCB1cmwgPVxuICAgICAgICAgIGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ2hyZWYnKSB8fFxuICAgICAgICAgIGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ3NyYycpO1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgdGhpcy5hZGRTb3VyY2VMaXN0KHtcbiAgICAgICAgICAgIHRhZ05hbWU6IG5vZGUudGFnTmFtZSxcbiAgICAgICAgICAgIHVybDogZW50cnlNYW5hZ2VyLnVybCA/IHRyYW5zZm9ybVVybChlbnRyeU1hbmFnZXIudXJsLCB1cmwpIDogdXJsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0dhcmZpc2hDb25maWdUeXBlKHsgdHlwZTogZW50cnlNYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAndHlwZScpIH0pKSB7XG4gICAgICAgICAgLy8gZ2FyZmlzaCBjb25maWcgc2NyaXB0IGZvdW5kZWRcbiAgICAgICAgICAvLyBwYXJzZSBpdFxuICAgICAgICAgIHRoaXMuY2hpbGRHYXJmaXNoQ29uZmlnID0gSlNPTi5wYXJzZSgobm9kZS5jaGlsZHJlbj8uWzBdIGFzIFRleHQpPy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuYXBwSW5mby5lbnRyeSAmJiB0aGlzLmFkZFNvdXJjZUxpc3QoeyB0YWdOYW1lOiAnaHRtbCcsIHVybDogdGhpcy5hcHBJbmZvLmVudHJ5IH0pXG4gIH1cblxuICBnZXQgcm9vdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGZpbmRUYXJnZXQodGhpcy5odG1sTm9kZSwgW2BkaXZbJHtfX01vY2tCb2R5X199XWAsICdib2R5J10pO1xuICB9XG5cbiAgZ2V0IGdldFNvdXJjZUxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZUxpc3Q7XG4gIH1cblxuICBhZGRTb3VyY2VMaXN0KHNvdXJjZUluZm86IEFycmF5PHsgdGFnTmFtZTogc3RyaW5nOyB1cmw6IHN0cmluZyB9PiB8IHsgdGFnTmFtZTogc3RyaW5nOyB1cmw6IHN0cmluZyB9KXtcbiAgICBpZiAodGhpcy5hcHBJbmZvLmRpc2FibGVTb3VyY2VMaXN0Q29sbGVjdCkgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZUluZm8pKXtcbiAgICAgIGxldCBuU291cmNlTGlzdCA9IHNvdXJjZUluZm8uZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlTGlzdE1hcC5oYXMoaXRlbS51cmwpICYmIGl0ZW0udXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgIHRoaXMuc291cmNlTGlzdE1hcC5zZXQoaXRlbS51cmwsIGl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zb3VyY2VMaXN0ID0gdGhpcy5zb3VyY2VMaXN0LmNvbmNhdChuU291cmNlTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5zb3VyY2VMaXN0TWFwLmdldChzb3VyY2VJbmZvLnVybCkgJiYgc291cmNlSW5mby51cmwuc3RhcnRzV2l0aCgnaHR0cCcpKXtcbiAgICAgICAgdGhpcy5zb3VyY2VMaXN0LnB1c2goc291cmNlSW5mbyk7XG4gICAgICAgIHRoaXMuc291cmNlTGlzdE1hcC5zZXQoc291cmNlSW5mby51cmwsIHNvdXJjZUluZm8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZ2V0UHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJcbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHRoaXMucHJvdmlkZXIpXG4gICAgICA6IHRoaXMuY2hlY2tBbmRHZXRQcm92aWRlcigpO1xuICB9XG5cbiAgaXNOb0VudHJ5U2NyaXB0KHVybCA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRHYXJmaXNoQ29uZmlnLnNhbmRib3g/Lm5vRW50cnlTY3JpcHRzPy5zb21lKGl0ZW0gPT4gdXJsLmluZGV4T2YoaXRlbSkgPiAtMSk7XG4gIH1cblxuICBleGVjU2NyaXB0KFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBlbnY6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgdXJsPzogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zLFxuICApIHtcbiAgICBlbnYgPSB7XG4gICAgICAuLi50aGlzLmdldEV4ZWNTY3JpcHRFbnYob3B0aW9ucz8ubm9FbnRyeSksXG4gICAgICAuLi4oZW52IHx8IHt9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5zY3JpcHRDb3VudCsrO1xuXG4gICAgY29uc3QgYXJncyA9IFt0aGlzLmFwcEluZm8sIGNvZGUsIGVudiwgdXJsLCBvcHRpb25zXSBhcyBjb25zdDtcbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVFdmFsLmVtaXQoLi4uYXJncyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucnVuQ29kZShjb2RlLCBlbnYsIHVybCwgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5lcnJvckV4ZWNDb2RlLmVtaXQoZXJyLCAuLi5hcmdzKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlckV2YWwuZW1pdCguLi5hcmdzKTtcbiAgfVxuXG4gIC8vIGB2bSBzYW5kYm94YCBjYW4gb3ZlcnJpZGUgdGhpcyBtZXRob2RcbiAgcnVuQ29kZShcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgZW52OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgIHVybD86IHN0cmluZyxcbiAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgKSB7XG4gICAgLy8gSWYgdGhlIG5vZGUgaXMgYW4gZXMgbW9kdWxlLCB1c2UgbmF0aXZlIGVzbU1vZHVsZVxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaXNNb2R1bGUpIHtcbiAgICAgIHRoaXMuZXNtUXVldWUuYWRkKGFzeW5jIChuZXh0KSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZXNNb2R1bGVMb2FkZXIubG9hZChjb2RlLCB7XG4gICAgICAgICAgLy8gcmVidWlsZCBmdWxsIGVudlxuICAgICAgICAgIC4uLnRoaXMuZ2V0RXhlY1NjcmlwdEVudigpLFxuICAgICAgICAgIC8vIHRoaXMgJ2VudicgbWF5IGxvc3QgY29tbW9uanMgZGF0YVxuICAgICAgICAgIC4uLmVudixcbiAgICAgICAgfSwgdXJsLCBvcHRpb25zKTtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJldmVydEN1cnJlbnRTY3JpcHQgPSBzZXREb2NDdXJyZW50U2NyaXB0KFxuICAgICAgICB0aGlzLmdsb2JhbC5kb2N1bWVudCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdXJsLFxuICAgICAgICBvcHRpb25zPy5hc3luYyxcbiAgICAgICAgb3B0aW9ucz8ub3JpZ2luU2NyaXB0LFxuICAgICAgKTtcbiAgICAgIGNvZGUgKz0gdXJsID8gYFxcbi8vIyBzb3VyY2VVUkw9JHt1cmx9XFxuYCA6ICcnO1xuICAgICAgaWYgKCFoYXNPd24oZW52LCAnd2luZG93JykpIHtcbiAgICAgICAgZW52ID0ge1xuICAgICAgICAgIC4uLmVudixcbiAgICAgICAgICB3aW5kb3c6IHRoaXMuZ2xvYmFsLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZXZhbFdpdGhFbnYoYDske2NvZGV9YCwgZW52LCB0aGlzLmdsb2JhbCk7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKHJldmVydEN1cnJlbnRTY3JpcHQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNob3coKSB7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIGNvbnN0IHsgZGlzcGxheSwgbW91bnRlZCwgcHJvdmlkZXIgfSA9IHRoaXM7XG4gICAgaWYgKGRpc3BsYXkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW1vdW50ZWQpIHtcbiAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oJ05lZWQgdG8gY2FsbCB0aGUgXCJhcHAubW91bnQoKVwiIG1ldGhvZCBmaXJzdC4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlTW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIHRydWUpO1xuICAgIHRoaXMuY29udGV4dC5hY3RpdmVBcHBzLnB1c2godGhpcyk7XG5cbiAgICBhd2FpdCB0aGlzLmFkZENvbnRhaW5lcigpO1xuICAgIHRoaXMuY2FsbFJlbmRlcihwcm92aWRlciwgZmFsc2UpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYWZ0ZXJNb3VudC5lbWl0KHRoaXMuYXBwSW5mbywgdGhpcywgdHJ1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5tb3VudGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHsgZGlzcGxheSwgbW91bnRlZCwgcHJvdmlkZXIgfSA9IHRoaXM7XG4gICAgaWYgKCFkaXNwbGF5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFtb3VudGVkKSB7XG4gICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJiB3YXJuKCdOZWVkIHRvIGNhbGwgdGhlIFwiYXBwLm1vdW50KClcIiBtZXRob2QgZmlyc3QuJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZVVubW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIHRydWUpO1xuXG4gICAgdGhpcy5jYWxsRGVzdHJveShwcm92aWRlciwgZmFsc2UpO1xuICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIHJlbW92ZSh0aGlzLmNvbnRleHQuYWN0aXZlQXBwcywgdGhpcyk7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYWZ0ZXJVbm1vdW50LmVtaXQodGhpcy5hcHBJbmZvLCB0aGlzLCB0cnVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIG1vdW50KCkge1xuICAgIGlmICghdGhpcy5jYW5Nb3VudCgpKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlTW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIGZhbHNlKTtcblxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLm1vdW50aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZXh0LmFjdGl2ZUFwcHMucHVzaCh0aGlzKTtcbiAgICAgIC8vIGFkZCBjb250YWluZXIgYW5kIGNvbXBpbGUganMgd2l0aCBjanNcbiAgICAgIGNvbnN0IHsgYXN5bmNTY3JpcHRzIH0gPSBhd2FpdCB0aGlzLmNvbXBpbGVBbmRSZW5kZXJDb250YWluZXIoKTtcbiAgICAgIGlmICghdGhpcy5zdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIEdvb2QgcHJvdmlkZXIgaXMgc2V0IGF0IGNvbXBpbGUgdGltZVxuICAgICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLmdldFByb3ZpZGVyKCk7XG4gICAgICAvLyBFeGlzdGluZyBhc3luY2hyb25vdXMgZnVuY3Rpb25zIG5lZWQgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHVubG9hZGVkXG4gICAgICBpZiAoIXRoaXMuc3RvcE1vdW50QW5kQ2xlYXJFZmZlY3QoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0aGlzLmNhbGxSZW5kZXIocHJvdmlkZXIsIHRydWUpO1xuICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlck1vdW50LmVtaXQodGhpcy5hcHBJbmZvLCB0aGlzLCBmYWxzZSk7XG5cbiAgICAgIGF3YWl0IGFzeW5jU2NyaXB0cztcbiAgICAgIGlmICghdGhpcy5zdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpKSByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5lbnRyeU1hbmFnZXIuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuYXBwQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yTW91bnRBcHAuZW1pdChlLCB0aGlzLmFwcEluZm8pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLm1vdW50aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdW5tb3VudCgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubW91bnRpbmcgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMubW91bnRlZCB8fCAhdGhpcy5hcHBDb250YWluZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMudW5tb3VudGluZykge1xuICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihgVGhlICR7dGhpcy5uYW1lfSBhcHAgdW5tb3VudGluZy5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gVGhpcyBwcmV2ZW50cyB0aGUgdW5tb3VudCBvZiB0aGUgY3VycmVudCBhcHAgZnJvbSBiZWluZyBjYWxsZWQgaW4gXCJwcm92aWRlci5kZXN0cm95XCJcbiAgICB0aGlzLnVubW91bnRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZVVubW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmNhbGxEZXN0cm95KHRoaXMucHJvdmlkZXIsIHRydWUpO1xuICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJvdmlkZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmN1c3RvbUV4cG9ydHMgPSB7fTtcbiAgICAgIHRoaXMuY2pzTW9kdWxlcy5leHBvcnRzID0ge307XG4gICAgICB0aGlzLmVzTW9kdWxlTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgIHJlbW92ZSh0aGlzLmNvbnRleHQuYWN0aXZlQXBwcywgdGhpcyk7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlclVubW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIGZhbHNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZW1vdmUodGhpcy5jb250ZXh0LmFjdGl2ZUFwcHMsIHRoaXMpO1xuICAgICAgdGhpcy5lbnRyeU1hbmFnZXIuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuYXBwQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yVW5tb3VudEFwcC5lbWl0KGUsIHRoaXMuYXBwSW5mbyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMudW5tb3VudGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEV4ZWNTY3JpcHRFbnYobm9FbnRyeT86IGJvb2xlYW4pIHtcbiAgICAvLyBUaGUgbGVnYWN5IG9mIGNvbW1vbkpTIGZ1bmN0aW9uIHN1cHBvcnRcbiAgICBjb25zdCBlbnZzID0ge1xuICAgICAgW19fR0FSRklTSF9FWFBPUlRTX19dOiB0aGlzLmN1c3RvbUV4cG9ydHMsXG4gICAgICBbX19HQVJGSVNIX0dMT0JBTF9FTlZfX106IHRoaXMuZ2xvYmFsRW52VmFyaWFibGVzLFxuICAgIH07XG5cbiAgICBpZiAobm9FbnRyeSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZW52cyxcbiAgICAgICAgcmVxdWlyZTogdGhpcy5janNNb2R1bGVzLnJlcXVpcmUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5lbnZzLFxuICAgICAgLi4udGhpcy5janNNb2R1bGVzLFxuICAgIH07XG4gIH1cblxuICAvLyBQZXJmb3JtcyBqcyByZXNvdXJjZXMgcHJvdmlkZWQgYnkgdGhlIG1vZHVsZSwgZmluYWxseSBnZXQgdGhlIGNvbnRlbnQgb2YgdGhlIGV4cG9ydFxuICBhc3luYyBjb21waWxlQW5kUmVuZGVyQ29udGFpbmVyKCkge1xuICAgIC8vIFJlbmRlciB0aGUgYXBwbGljYXRpb24gbm9kZVxuICAgIC8vIElmIHlvdSBkb24ndCB3YW50IHRvIHVzZSB0aGUgQ0pTIGV4cG9ydCwgYXQgdGhlIGVudHJhbmNlIGlzIG5vdCBjYW4gbm90IHBhc3MgdGhlIG1vZHVsZSwgdGhlIHJlcXVpcmVcbiAgICBhd2FpdCB0aGlzLnJlbmRlclRlbXBsYXRlKCk7XG5cbiAgICAvLyBFeGVjdXRlIGFzeW5jaHJvbm91cyBzY3JpcHRcbiAgICByZXR1cm4ge1xuICAgICAgYXN5bmNTY3JpcHRzOiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAvLyBBc3luY2hyb25vdXMgc2NyaXB0IGRvZXMgbm90IGJsb2NrIHRoZSByZW5kZXJpbmcgcHJvY2Vzc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5zdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzTWFuYWdlciBvZiB0aGlzLnJlc291cmNlcy5qcykge1xuICAgICAgICAgICAgICBpZiAoanNNYW5hZ2VyLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY1NjcmlwdChcbiAgICAgICAgICAgICAgICAgICAganNNYW5hZ2VyLnNjcmlwdENvZGUsXG4gICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICBqc01hbmFnZXIudXJsIHx8IHRoaXMuYXBwSW5mby5lbnRyeSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICBub0VudHJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5lcnJvck1vdW50QXBwLmVtaXQoZSwgdGhpcy5hcHBJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNhbk1vdW50KCkge1xuICAgIC8vIElmIHlvdSBhcmUgbm90IGluIG1vdW50IG1vdW50XG4gICAgaWYgKHRoaXMubW91bnRpbmcpIHtcbiAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oYFRoZSAke3RoaXMuYXBwSW5mby5uYW1lfSBhcHAgbW91bnRpbmcuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIElmIHRoZSBhcHBsaWNhdGlvbiBoYXMgYmVlbiByZW5kZXJlZCBjb21wbGV0ZSwgYXBwbHkgY29sb3VycyB0byBhIGRyYXdpbmcgYWdhaW4sIG5lZWQgdG8gZGVzdHJveSB0aGUgcmVuZGVyaW5nXG4gICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihgVGhlICR7dGhpcy5hcHBJbmZvLm5hbWV9IGFwcCBhbHJlYWR5IG1vdW50ZWQuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEFwcGxpY2F0aW9uIGluIGRlc3RydWN0aW9uIHN0YXRlLCB0aGUgbmVlZCB0byBkZXN0cm95IGNvbXBsZXRlZCB0byByZW5kZXJcbiAgICBpZiAodGhpcy51bm1vdW50aW5nKSB7XG4gICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJlxuICAgICAgICB3YXJuKFxuICAgICAgICAgIGBUaGUgJHt0aGlzLmFwcEluZm8ubmFtZX0gYXBwIGlzIHVubW91bnRpbmcgY2FuJ3QgUGVyZm9ybSBhcHBsaWNhdGlvbiByZW5kZXJpbmcuYCxcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJZiBhc3luY2hyb25vdXMgdGFzayBlbmNvdW50ZXJlZCBpbiB0aGUgcmVuZGVyaW5nIHByb2Nlc3MsIHN1Y2ggYXMgdHJpZ2dlcmluZyB0aGUgYmVmb3JlRXZhbCBiZWZvcmUgZXhlY3V0aW5nIGNvZGUsXG4gIC8vIGFmdGVyIHRoZSBhc3luY2hyb25vdXMgdGFzaywgeW91IG5lZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIGRlc3Ryb3llZCBvciBpbiB0aGUgZW5kIHN0YXRlLlxuICAvLyBJZiBpbiB0aGUgZW5kIHN0YXRlIHdpbGwgbmVlZCB0byBwZXJmb3JtIHRoZSBzaWRlIGVmZmVjdHMgb2YgcmVtb3ZpbmcgcmVuZGVyaW5nIHByb2Nlc3MsIGFkZGluZyBhIG1vdW50IHBvaW50IHRvIGEgZG9jdW1lbnQsXG4gIC8vIGZvciBleGFtcGxlLCBleGVjdXRlIGNvZGUgb2YgdGhlIGVudmlyb25tZW50YWwgZWZmZWN0cywgYW5kIHJlbmRlcmluZyB0aGUgc3RhdGUgaW4gdGhlIGVuZC5cbiAgcHJpdmF0ZSBzdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgd2FybihgVGhlIGFwcCBcIiR7dGhpcy5uYW1lfVwiIHJlbmRlcmluZyBwcm9jZXNzIGhhcyBiZWVuIGJsb2NrZWQuYCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1vdW50aW5nID0gZmFsc2U7XG4gICAgICAvLyBXaWxsIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgZG9jdW1lbnQgZmxvdyBvbiB0aGUgY29udGFpbmVyXG4gICAgICBpZiAodGhpcy5hcHBDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5lbnRyeU1hbmFnZXIuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuYXBwQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIGNvcmVMb2coXG4gICAgICAgIGAke3RoaXMuYXBwSW5mby5uYW1lfSBpZDoke3RoaXMuYXBwSWR9IHN0b3BNb3VudEFuZENsZWFyRWZmZWN0YCxcbiAgICAgICAgdGhpcy5hcHBDb250YWluZXIsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIENhbGxzIHRvIHJlbmRlciBkbyBjb21wYXRpYmxlIHdpdGggdHdvIGRpZmZlcmVudCBzYW5kYm94XG4gIHByaXZhdGUgY2FsbFJlbmRlcihwcm92aWRlcj86IGludGVyZmFjZXMuUHJvdmlkZXIsIGlzTW91bnQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHByb3ZpZGVyICYmIHByb3ZpZGVyLnJlbmRlcikge1xuICAgICAgcHJvdmlkZXIucmVuZGVyKHtcbiAgICAgICAgYXBwTmFtZTogdGhpcy5hcHBJbmZvLm5hbWUsXG4gICAgICAgIGRvbTogdGhpcy5yb290RWxlbWVudCxcbiAgICAgICAgYmFzZW5hbWU6IHRoaXMuYXBwSW5mby5iYXNlbmFtZSxcbiAgICAgICAgYXBwUmVuZGVySW5mbzogeyBpc01vdW50IH0sXG4gICAgICAgIHByb3BzOiB0aGlzLmFwcEluZm8ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBDYWxsIHRvIGRlc3Ryb3kgZG8gY29tcGF0aWJsZSB3aXRoIHR3byBkaWZmZXJlbnQgc2FuZGJveFxuICBwcml2YXRlIGNhbGxEZXN0cm95KHByb3ZpZGVyPzogaW50ZXJmYWNlcy5Qcm92aWRlciwgaXNVbm1vdW50PzogYm9vbGVhbikge1xuICAgIGNvbnN0IHsgcm9vdEVsZW1lbnQsIGFwcENvbnRhaW5lciB9ID0gdGhpcztcbiAgICBpZiAocHJvdmlkZXIgJiYgcHJvdmlkZXIuZGVzdHJveSkge1xuICAgICAgcHJvdmlkZXIuZGVzdHJveSh7XG4gICAgICAgIGFwcE5hbWU6IHRoaXMuYXBwSW5mby5uYW1lLFxuICAgICAgICBkb206IHJvb3RFbGVtZW50LFxuICAgICAgICBhcHBSZW5kZXJJbmZvOiB7IGlzVW5tb3VudCB9LFxuICAgICAgICBwcm9wczogdGhpcy5hcHBJbmZvLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW50cnlNYW5hZ2VyLkRPTUFwaXMucmVtb3ZlRWxlbWVudChhcHBDb250YWluZXIpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgY29udGFpbmVyIG5vZGUgYW5kIGFkZCBpbiB0aGUgZG9jdW1lbnQgZmxvd1xuICAvLyBkb21HZXR0ZXIgSGF2ZSBiZWVuIGRlYWxpbmcgd2l0aFxuICBwcml2YXRlIGFzeW5jIGFkZENvbnRhaW5lcigpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSBtb3VudCBwb2ludCwgc3VwcG9ydCBkb21HZXR0ZXIgYXMgcHJvbWlzZSwgaXMgYWR2YW50YWdlb3VzIGZvciB0aGUgY29tcGF0aWJpbGl0eVxuICAgIGNvbnN0IHdyYXBwZXJOb2RlID0gYXdhaXQgZ2V0UmVuZGVyTm9kZSh0aGlzLmFwcEluZm8uZG9tR2V0dGVyKTtcbiAgICBpZiAodHlwZW9mIHdyYXBwZXJOb2RlLmFwcGVuZENoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB3cmFwcGVyTm9kZS5hcHBlbmRDaGlsZCh0aGlzLmFwcENvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZW5kZXJUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCB7IGFwcEluZm8sIGVudHJ5TWFuYWdlciwgcmVzb3VyY2VzIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdXJsOiBiYXNlVXJsLCBET01BcGlzIH0gPSBlbnRyeU1hbmFnZXI7XG4gICAgY29uc3QgeyBodG1sTm9kZSwgYXBwQ29udGFpbmVyIH0gPSBjcmVhdGVBcHBDb250YWluZXIoYXBwSW5mbyk7XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbiByZWxhdGl2ZSBwYXRoXG4gICAgdGhpcy5odG1sTm9kZSA9IGh0bWxOb2RlO1xuICAgIHRoaXMuYXBwQ29udGFpbmVyID0gYXBwQ29udGFpbmVyO1xuXG4gICAgLy8gVG8gYXBwZW5kIHRvIHRoZSBkb2N1bWVudCBmbG93LCByZWN1cnNpdmUgYWdhaW4gY3JlYXRlIHRoZSBjb250ZW50cyBvZiB0aGUgSFRNTCBvciBleGVjdXRlIHRoZSBzY3JpcHRcbiAgICBhd2FpdCB0aGlzLmFkZENvbnRhaW5lcigpO1xuXG4gICAgY29uc3QgY3VzdG9tUmVuZGVyZXI6IFBhcmFtZXRlcnM8dHlwZW9mIGVudHJ5TWFuYWdlci5jcmVhdGVFbGVtZW50cz5bMF0gPSB7XG4gICAgICBtZXRhOiAoKSA9PiBudWxsLFxuXG4gICAgICBpbWc6IChub2RlKSA9PiB7XG4gICAgICAgIGJhc2VVcmwgJiYgZW50cnlNYW5hZ2VyLnRvUmVzb2x2ZVVybChub2RlLCAnc3JjJywgYmFzZVVybCk7XG4gICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICB9LFxuXG4gICAgICB2aWRlbzogKG5vZGUpID0+IHtcbiAgICAgICAgYmFzZVVybCAmJiBlbnRyeU1hbmFnZXIudG9SZXNvbHZlVXJsKG5vZGUsICdzcmMnLCBiYXNlVXJsKTtcbiAgICAgICAgcmV0dXJuIERPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlKTtcbiAgICAgIH0sXG5cbiAgICAgIGF1ZGlvOiAobm9kZSkgPT4ge1xuICAgICAgICBiYXNlVXJsICYmIGVudHJ5TWFuYWdlci50b1Jlc29sdmVVcmwobm9kZSwgJ3NyYycsIGJhc2VVcmwpO1xuICAgICAgICByZXR1cm4gRE9NQXBpcy5jcmVhdGVFbGVtZW50KG5vZGUpO1xuICAgICAgfSxcblxuICAgICAgLy8gVGhlIGJvZHkgYW5kIGhlYWQgdGhpcyBraW5kIG9mIHRyZWF0bWVudCBpcyB0byBjb21wYXRpYmxlIHdpdGggdGhlIG9sZCB2ZXJzaW9uXG4gICAgICBib2R5OiAobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc3RyaWN0SXNvbGF0aW9uKSB7XG4gICAgICAgICAgbm9kZSA9IGVudHJ5TWFuYWdlci5jbG9uZU5vZGUobm9kZSk7XG4gICAgICAgICAgbm9kZS50YWdOYW1lID0gJ2Rpdic7XG4gICAgICAgICAgbm9kZS5hdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAga2V5OiBfX01vY2tCb2R5X18sXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRE9NQXBpcy5jcmVhdGVFbGVtZW50KG5vZGUpO1xuICAgICAgfSxcblxuICAgICAgaGVhZDogKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmljdElzb2xhdGlvbikge1xuICAgICAgICAgIG5vZGUgPSBlbnRyeU1hbmFnZXIuY2xvbmVOb2RlKG5vZGUpO1xuICAgICAgICAgIG5vZGUudGFnTmFtZSA9ICdkaXYnO1xuICAgICAgICAgIG5vZGUuYXR0cmlidXRlcy5wdXNoKHtcbiAgICAgICAgICAgIGtleTogX19Nb2NrSGVhZF9fLFxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlKTtcbiAgICAgIH0sXG5cbiAgICAgIHNjcmlwdDogKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgbWltZVR5cGUgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICd0eXBlJyk7XG4gICAgICAgIGNvbnN0IGlzTW9kdWxlID0gbWltZVR5cGUgPT09ICdtb2R1bGUnO1xuXG4gICAgICAgIGlmIChtaW1lVHlwZSkge1xuICAgICAgICAgIC8vIE90aGVyIHNjcmlwdCB0ZW1wbGF0ZVxuICAgICAgICAgIGlmICghaXNNb2R1bGUgJiYgIWlzSnNUeXBlKHsgdHlwZTogbWltZVR5cGUgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpzTWFuYWdlciA9IHJlc291cmNlcy5qcy5maW5kKChtYW5hZ2VyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICFtYW5hZ2VyLmFzeW5jID8gbWFuYWdlci5pc1NhbWVPcmlnaW4obm9kZSkgOiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGpzTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IHsgdXJsLCBzY3JpcHRDb2RlIH0gPSBqc01hbmFnZXI7XG4gICAgICAgICAgY29uc3QgbW9ja09yaWdpblNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgIG5vZGUuYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpPT57XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlLmtleSkge1xuICAgICAgICAgICAgICBtb2NrT3JpZ2luU2NyaXB0LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUua2V5LCBhdHRyaWJ1dGUudmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0VXJsID0gdXJsIHx8IHRoaXMuYXBwSW5mby5lbnRyeTtcbiAgICAgICAgICB0aGlzLmV4ZWNTY3JpcHQoc2NyaXB0Q29kZSwge30sIHRhcmdldFVybCwge1xuICAgICAgICAgICAgaXNNb2R1bGUsXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgICAgICBpc0lubGluZToganNNYW5hZ2VyLmlzSW5saW5lU2NyaXB0KCksXG4gICAgICAgICAgICBub0VudHJ5OiB0b0Jvb2xlYW4oXG4gICAgICAgICAgICAgIGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ25vLWVudHJ5JylcbiAgICAgICAgICAgICAgICB8fCB0aGlzLmlzTm9FbnRyeVNjcmlwdCh0YXJnZXRVcmwpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9yaWdpblNjcmlwdDogbW9ja09yaWdpblNjcmlwdCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICAgIGNvbnN0IGFzeW5jID0gZW50cnlNYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAnYXN5bmMnKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGFzeW5jID09PSAndW5kZWZpbmVkJyB8fCBhc3luYyA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgY29uc3QgdGlwSW5mbyA9IEpTT04uc3RyaW5naWZ5KG5vZGUsIG51bGwsIDIpO1xuICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgYEN1cnJlbnQganMgbm9kZSBjYW5ub3QgYmUgZm91bmQsIHRoZSByZXNvdXJjZSBtYXkgbm90IGV4aXN0LlxcblxcbiAke3RpcEluZm99YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZVNjcmlwdENvbW1lbnROb2RlKG5vZGUpO1xuICAgICAgfSxcblxuICAgICAgc3R5bGU6IChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBub2RlLmNoaWxkcmVuWzBdIGFzIFRleHQ7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVNYW5hZ2VyID0gbmV3IFN0eWxlTWFuYWdlcih0ZXh0LmNvbnRlbnQsIGJhc2VVcmwpO1xuICAgICAgICAgIHN0eWxlTWFuYWdlci5zZXRTY29wZSh7XG4gICAgICAgICAgICBhcHBOYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICByb290RWxJZDogdGhpcy5hcHBDb250YWluZXIuaWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYmFzZVVybCAmJiBzdHlsZU1hbmFnZXIuY29ycmVjdFBhdGgoYmFzZVVybCk7XG4gICAgICAgICAgcmV0dXJuIGVudHJ5TWFuYWdlci5pZ25vcmVDaGlsZE5vZGVzQ3JlYXRpb24oXG4gICAgICAgICAgICBzdHlsZU1hbmFnZXIucmVuZGVyQXNTdHlsZUVsZW1lbnQoKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICB9LFxuXG4gICAgICBsaW5rOiAobm9kZSkgPT4ge1xuICAgICAgICBpZiAoRE9NQXBpcy5pc0Nzc0xpbmtOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVNYW5hZ2VyID0gdGhpcy5yZXNvdXJjZXMubGluay5maW5kKChtYW5hZ2VyKSA9PlxuICAgICAgICAgICAgbWFuYWdlci5pc1NhbWVPcmlnaW4obm9kZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc3R5bGVNYW5hZ2VyKSB7XG4gICAgICAgICAgICBzdHlsZU1hbmFnZXIuc2V0U2NvcGUoe1xuICAgICAgICAgICAgICBhcHBOYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgIHJvb3RFbElkOiB0aGlzLmFwcENvbnRhaW5lci5pZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN0eWxlTWFuYWdlci5yZW5kZXJBc1N0eWxlRWxlbWVudChcbiAgICAgICAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgPyBgXFxuLyoke0RPTUFwaXMuY3JlYXRlTGlua0NvbW1lbnROb2RlKG5vZGUpfSovXFxuYCA6ICcnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIHJldHVybiBET01BcGlzLmlzUHJlZmV0Y2hKc0xpbmtOb2RlKG5vZGUpXG4gICAgICAgICAgPyBET01BcGlzLmNyZWF0ZVNjcmlwdENvbW1lbnROb2RlKG5vZGUpXG4gICAgICAgICAgOiBET01BcGlzLmlzSWNvbkxpbmtOb2RlKG5vZGUpXG4gICAgICAgICAgICA/IG51bGwgLy8gRmlsdGVyIHRoZSBpY29uIG9mIHRoZSBjaGlsZCBhcHAsIGFuZCBjYW5ub3QgYWZmZWN0IHRoZSBtYWluIGFwcGxpY2F0aW9uXG4gICAgICAgICAgICA6IERPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFJlbmRlciBkb20gdHJlZSBhbmQgYXBwZW5kIHRvIGRvY3VtZW50LlxuICAgIGVudHJ5TWFuYWdlci5jcmVhdGVFbGVtZW50cyhjdXN0b21SZW5kZXJlciwgaHRtbE5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0FuZEdldFByb3ZpZGVyKCkge1xuICAgIGNvbnN0IHsgYXBwSW5mbywgcm9vdEVsZW1lbnQsIGNqc01vZHVsZXMsIGN1c3RvbUV4cG9ydHMgfSA9IHRoaXM7XG4gICAgY29uc3QgeyBuYW1lLCBwcm9wcywgYmFzZW5hbWUgfSA9IGFwcEluZm87XG4gICAgbGV0IHByb3ZpZGVyOlxuICAgICAgfCAoKC4uLmFyZ3M6IGFueVtdKSA9PiBpbnRlcmZhY2VzLlByb3ZpZGVyKVxuICAgICAgfCBpbnRlcmZhY2VzLlByb3ZpZGVyXG4gICAgICB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIGVzTW9kdWxlIGV4cG9ydFxuICAgIGF3YWl0IHRoaXMuZXNtUXVldWUuYXdhaXRDb21wbGV0aW9uKCk7XG5cbiAgICAvLyBDanMgZXhwb3J0c1xuICAgIGlmIChjanNNb2R1bGVzLmV4cG9ydHMpIHtcbiAgICAgIGlmIChpc1Byb21pc2UoY2pzTW9kdWxlcy5leHBvcnRzKSlcbiAgICAgICAgY2pzTW9kdWxlcy5leHBvcnRzID0gYXdhaXQgY2pzTW9kdWxlcy5leHBvcnRzO1xuICAgICAgLy8gSXMgbm90IHNldCBpbiB0aGUgY29uZmlndXJhdGlvbiBvZiB3ZWJwYWNrIGxpYnJhcnkgb3B0aW9uXG4gICAgICBpZiAoY2pzTW9kdWxlcy5leHBvcnRzLnByb3ZpZGVyKSBwcm92aWRlciA9IGNqc01vZHVsZXMuZXhwb3J0cy5wcm92aWRlcjtcbiAgICB9XG5cbiAgICAvLyBDdXN0b20gZXhwb3J0IHByaW9yIHRvIGV4cG9ydCBieSBkZWZhdWx0XG4gICAgaWYgKGN1c3RvbUV4cG9ydHMucHJvdmlkZXIpIHtcbiAgICAgIHByb3ZpZGVyID0gY3VzdG9tRXhwb3J0cy5wcm92aWRlcjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb3ZpZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm92aWRlciA9IGF3YWl0IHByb3ZpZGVyKFxuICAgICAgICB7XG4gICAgICAgICAgYmFzZW5hbWUsXG4gICAgICAgICAgZG9tOiByb290RWxlbWVudCxcbiAgICAgICAgICAuLi4ocHJvcHMgfHwge30pLFxuICAgICAgICB9LFxuICAgICAgICBwcm9wcyxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpc1Byb21pc2UocHJvdmlkZXIpKSB7XG4gICAgICBwcm92aWRlciA9IGF3YWl0IHByb3ZpZGVyO1xuICAgIH1cblxuICAgIC8vIFRoZSBwcm92aWRlciBtYXkgYmUgYSBmdW5jdGlvbiBvYmplY3RcbiAgICBpZiAoIWlzT2JqZWN0KHByb3ZpZGVyKSAmJiB0eXBlb2YgcHJvdmlkZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGAgSW52YWxpZCBtb2R1bGUgY29udGVudDogJHtuYW1lfSwgeW91IHNob3VsZCByZXR1cm4gYm90aCByZW5kZXIgYW5kIGRlc3Ryb3kgZnVuY3Rpb25zIGluIHByb3ZpZGVyIGZ1bmN0aW9uLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIElmIHlvdSBoYXZlIGN1c3RvbUxvYWRlciwgdGhlIGRvam8ucHJvdmlkZSBieSB1c2VyXG4gICAgY29uc3QgaG9va1JlcyA9IGF3YWl0ICh0aGlzLmN1c3RvbUxvYWRlciAmJlxuICAgICAgdGhpcy5jdXN0b21Mb2FkZXIocHJvdmlkZXIgYXMgaW50ZXJmYWNlcy5Qcm92aWRlciwgYXBwSW5mbywgYmFzZW5hbWUpKTtcblxuICAgIGlmIChob29rUmVzKSB7XG4gICAgICBjb25zdCB7IG1vdW50LCB1bm1vdW50IH0gPSBob29rUmVzIHx8ICh7fSBhcyBhbnkpO1xuICAgICAgaWYgKHR5cGVvZiBtb3VudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdW5tb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAocHJvdmlkZXIgYXMgaW50ZXJmYWNlcy5Qcm92aWRlcikucmVuZGVyID0gbW91bnQ7XG4gICAgICAgIChwcm92aWRlciBhcyBpbnRlcmZhY2VzLlByb3ZpZGVyKS5kZXN0cm95ID0gdW5tb3VudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWFwcEluZm8ubm9DaGVja1Byb3ZpZGVyKSB7XG4gICAgICBhc3NlcnQocHJvdmlkZXIsIGBcInByb3ZpZGVyXCIgaXMgXCIke3Byb3ZpZGVyfVwiLmApO1xuICAgICAgLy8gTm8gbmVlZCB0byB1c2UgXCJoYXNPd25cIiwgYmVjYXVzZSBcInJlbmRlclwiIG1heSBiZSBvbiB0aGUgcHJvdG90eXBlIGNoYWluXG4gICAgICBhc3NlcnQoJ3JlbmRlcicgaW4gcHJvdmlkZXIsICdcInJlbmRlclwiIGlzIHJlcXVpcmVkIGluIHByb3ZpZGVyLicpO1xuICAgICAgYXNzZXJ0KCdkZXN0cm95JyBpbiBwcm92aWRlciwgJ1wiZGVzdHJveVwiIGlzIHJlcXVpcmVkIGluIHByb3ZpZGVyLicpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlciBhcyBpbnRlcmZhY2VzLlByb3ZpZGVyO1xuICAgIHJldHVybiBwcm92aWRlciBhcyBpbnRlcmZhY2VzLlByb3ZpZGVyO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU3luY0hvb2ssIEFzeW5jSG9vaywgUGx1Z2luU3lzdGVtIH0gZnJvbSAnQGdhcmZpc2gvaG9va3MnO1xuaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuLy8gcHJldHRpZXItaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsTGlmZWN5Y2xlKCkge1xuICByZXR1cm4gbmV3IFBsdWdpblN5c3RlbSh7XG4gICAgYmVmb3JlQm9vdHN0cmFwOiBuZXcgU3luY0hvb2s8W2ludGVyZmFjZXMuT3B0aW9uc10sIHZvaWQ+KCksXG4gICAgYm9vdHN0cmFwOiBuZXcgU3luY0hvb2s8W2ludGVyZmFjZXMuT3B0aW9uc10sIHZvaWQ+KCksXG4gICAgYmVmb3JlUmVnaXN0ZXJBcHA6IG5ldyBTeW5jSG9vazxbaW50ZXJmYWNlcy5BcHBJbmZvIHwgQXJyYXk8aW50ZXJmYWNlcy5BcHBJbmZvPl0sIHZvaWQ+KCksXG4gICAgcmVnaXN0ZXJBcHA6IG5ldyBTeW5jSG9vazxbUmVjb3JkPHN0cmluZywgaW50ZXJmYWNlcy5BcHBJbmZvPl0sIHZvaWQ+KCksXG4gICAgYmVmb3JlTG9hZDogbmV3IEFzeW5jSG9vazxbaW50ZXJmYWNlcy5BcHBJbmZvXT4oKSxcbiAgICBhZnRlckxvYWQ6IG5ldyBBc3luY0hvb2s8W2ludGVyZmFjZXMuQXBwSW5mbywgaW50ZXJmYWNlcy5BcHAgfCBudWxsXT4oKSxcbiAgICBlcnJvckxvYWRBcHA6IG5ldyBTeW5jSG9vazxbRXJyb3IsIGludGVyZmFjZXMuQXBwSW5mb10sIHZvaWQ+KCksXG4gIH0pO1xufVxuXG4vLyBwcmV0dGllci1pZ25vcmVcbmV4cG9ydCBmdW5jdGlvbiBhcHBMaWZlY3ljbGUoKSB7XG4gIHJldHVybiBuZXcgUGx1Z2luU3lzdGVtKHtcbiAgICBiZWZvcmVFdmFsOiBuZXcgU3luY0hvb2s8W1xuICAgICAgICBpbnRlcmZhY2VzLkFwcEluZm8sXG4gICAgICAgIHN0cmluZyxcbiAgICAgICAgUmVjb3JkPHN0cmluZywgYW55Pj8sXG4gICAgICAgIHN0cmluZz8sXG4gICAgICAgIHsgYXN5bmM/OiBib29sZWFuOyBub0VudHJ5PzogYm9vbGVhbiB9PyxcbiAgICAgIF0sXG4gICAgICB2b2lkXG4gICAgPigpLFxuICAgIGFmdGVyRXZhbDogbmV3IFN5bmNIb29rPFxuICAgICAgW1xuICAgICAgICBpbnRlcmZhY2VzLkFwcEluZm8sXG4gICAgICAgIHN0cmluZyxcbiAgICAgICAgUmVjb3JkPHN0cmluZywgYW55Pj8sXG4gICAgICAgIHN0cmluZz8sXG4gICAgICAgIHsgYXN5bmM/OiBib29sZWFuOyBub0VudHJ5PzogYm9vbGVhbiB9PyxcbiAgICAgIF0sXG4gICAgICB2b2lkXG4gICAgPigpLFxuICAgIGJlZm9yZU1vdW50OiBuZXcgU3luY0hvb2s8W2ludGVyZmFjZXMuQXBwSW5mbywgaW50ZXJmYWNlcy5BcHAsIGJvb2xlYW5dLCB2b2lkPigpLFxuICAgIGFmdGVyTW91bnQ6IG5ldyBTeW5jSG9vazxbaW50ZXJmYWNlcy5BcHBJbmZvLCBpbnRlcmZhY2VzLkFwcCwgYm9vbGVhbl0sIHZvaWQ+KCksXG4gICAgZXJyb3JNb3VudEFwcDogbmV3IFN5bmNIb29rPFtFcnJvciwgaW50ZXJmYWNlcy5BcHBJbmZvXSwgdm9pZD4oKSxcbiAgICBiZWZvcmVVbm1vdW50OiBuZXcgU3luY0hvb2s8W2ludGVyZmFjZXMuQXBwSW5mbywgaW50ZXJmYWNlcy5BcHAsIGJvb2xlYW5dLCB2b2lkPigpLFxuICAgIGFmdGVyVW5tb3VudDogbmV3IFN5bmNIb29rPFtpbnRlcmZhY2VzLkFwcEluZm8sIGludGVyZmFjZXMuQXBwLCBib29sZWFuXSwgdm9pZD4oKSxcbiAgICBlcnJvclVubW91bnRBcHA6IG5ldyBTeW5jSG9vazxbRXJyb3IsIGludGVyZmFjZXMuQXBwSW5mb10sIHZvaWQ+KCksXG4gICAgZXJyb3JFeGVjQ29kZTogbmV3IFN5bmNIb29rPFxuICAgICAgW1xuICAgICAgICBFcnJvcixcbiAgICAgICAgaW50ZXJmYWNlcy5BcHBJbmZvLFxuICAgICAgICBzdHJpbmcsXG4gICAgICAgIFJlY29yZDxzdHJpbmcsIGFueT4/LFxuICAgICAgICBzdHJpbmc/LFxuICAgICAgICB7IGFzeW5jPzogYm9vbGVhbjsgbm9FbnRyeT86IGJvb2xlYW4gfT8sXG4gICAgICBdLFxuICAgICAgdm9pZFxuICAgID4oKSxcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgSW1wb3J0U3BlY2lmaWVyLCBpbml0LCBwYXJzZSB9IGZyb20gJ2VzLW1vZHVsZS1sZXhlcic7XG5pbXBvcnQgdHlwZSB7IEphdmFTY3JpcHRNYW5hZ2VyIH0gZnJvbSAnQGdhcmZpc2gvbG9hZGVyJztcbmltcG9ydCB7IExvY2sgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQge1xuICBpc0Fic29sdXRlLFxuICB0cmFuc2Zvcm1VcmwsXG4gIGhhdmVTb3VyY2VtYXAsXG4gIGNyZWF0ZVNvdXJjZW1hcCxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5pbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gJy4vYXBwJztcblxuY29uc3QgX19HQVJGSVNIX0VTTV9FTlZfXyA9ICdfX0dBUkZJU0hfRVNNX0VOVl9fJztcblxuZXhwb3J0IGNvbnN0IGdldE1vZHVsZUltcG9ydFByb2Nlc3NvciA9IChjb2RlOiBzdHJpbmcpID0+IHtcbiAgLy8gc3BsaXQgY29kZSBpbnRvIHR3byBzZWdtZW50c1xuICAvLyBhdm9pZCAncGF1c2UgYmVmb3JlIHBvdGVudGlhbCBvdXQgb2YgbWVtb3J5IGNyYXNoJyBpbiBjaHJvbWVcbiAgLy8gZm9yIHN1cGVyIGxhcmdlIHN0cmluZywgaXQgY2FuIGltcHJvdmUgcGVyZm9ybWFuY2UgYXMgd2VsbFxuICBsZXQgZmluYWxDb2RlID0gJyc7XG4gIGxldCByZXNldENvZGUgPSBjb2RlO1xuICBsZXQgcHJldkNvZGVJbmRleCA9IDA7XG4gIGNvbnN0IHJhd0ltcG9ydCA9ICdpbXBvcnQnO1xuICBjb25zdCB3cmFwSW1wb3J0ID0gJ19pbXBvcnRfJztcbiAgcmV0dXJuIChpbXBvcnRBbmFseXNpczogSW1wb3J0U3BlY2lmaWVyLCBuZXdNb2R1bGVOYW1lID0gJycpID0+IHtcbiAgICBjb25zdCB7IGQ6IGltcG9ydFR5cGUsIG46IG1vZHVsZU5hbWUsIHMsIGUsIHNzLCBzZSB9ID0gaW1wb3J0QW5hbHlzaXM7XG4gICAgY29uc3QgaXNEeW5hbWljSW1wb3J0ID0gaW1wb3J0VHlwZSA+IC0xO1xuICAgIGlmIChpc0R5bmFtaWNJbXBvcnQpIHtcbiAgICAgIC8vIGR5bmFtaWMgaW1wb3J0XG4gICAgICAvLyByZXBsYWNlICdpbXBvcnQnIGtleXdvcmRcbiAgICAgIGNvbnN0IGNvZGVTdGFydCA9IHNzIC0gcHJldkNvZGVJbmRleDtcbiAgICAgIGNvbnN0IGNvZGVFbmQgPSBzZSAtIHByZXZDb2RlSW5kZXg7XG4gICAgICBjb25zdCBkeW5hbWljSW1wb3J0U3RhdGVtZW50ID0gcmVzZXRDb2RlLnNsaWNlKGNvZGVTdGFydCwgY29kZUVuZCk7XG4gICAgICAvLyBhcHBlbmQgdGhlIGNvZGUgYmVmb3JlIGltcG9ydCBzdGF0ZW1lbnRcbiAgICAgIGZpbmFsQ29kZSArPSByZXNldENvZGUuc2xpY2UoMCwgY29kZVN0YXJ0KTtcbiAgICAgIC8vIGFwcGVuZCBpbXBvcnQgc3RhdGVtZW50XG4gICAgICBmaW5hbENvZGUgKz0gZHluYW1pY0ltcG9ydFN0YXRlbWVudC5yZXBsYWNlKHJhd0ltcG9ydCwgd3JhcEltcG9ydCk7XG4gICAgICByZXNldENvZGUgPSByZXNldENvZGUuc2xpY2UoY29kZUVuZCk7XG4gICAgICBwcmV2Q29kZUluZGV4ID0gc2U7XG4gICAgfSBlbHNlIGlmIChtb2R1bGVOYW1lKSB7XG4gICAgICAvLyBzdGF0aWMgaW1wb3J0XG4gICAgICAvLyByZXBsYWNlIG1vZHVsZSBuYW1lXG4gICAgICBjb25zdCBjb2RlU3RhcnQgPSBzIC0gcHJldkNvZGVJbmRleDtcbiAgICAgIGNvbnN0IGNvZGVFbmQgPSBlIC0gcHJldkNvZGVJbmRleDtcbiAgICAgIC8vIGFwcGVuZCB0aGUgY29kZSBiZWZvcmUgaW1wb3J0IG5hbWVcbiAgICAgIGZpbmFsQ29kZSArPSByZXNldENvZGUuc2xpY2UoMCwgY29kZVN0YXJ0KTtcbiAgICAgIC8vIGFwcGVuZCBuZXcgaW1wb3J0IG5hbWVcbiAgICAgIGZpbmFsQ29kZSArPSBuZXdNb2R1bGVOYW1lO1xuICAgICAgcmVzZXRDb2RlID0gcmVzZXRDb2RlLnNsaWNlKGNvZGVFbmQpO1xuICAgICAgcHJldkNvZGVJbmRleCA9IGU7XG4gICAgfVxuICAgIHJldHVybiBbZmluYWxDb2RlLCByZXNldENvZGVdO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdlblNoZWxsRXhlY3V0aW9uQ29kZSA9IChcbiAgaWQ6IHN0cmluZyB8IG51bWJlcixcbiAgc291cmNlTW9kdWxlTmFtZTogc3RyaW5nLFxuICBzaGVsbFVybDogc3RyaW5nLFxuKSA9PlxuICBgO2ltcG9ydCphcyBtJCRfJHtpZH0gZnJvbScke3NvdXJjZU1vZHVsZU5hbWV9JztpbXBvcnR7dSQkXyBhcyB1JCRfJHtpZH19ZnJvbScke3NoZWxsVXJsfSc7dSQkXyR7aWR9KG0kJF8ke2lkfSlgO1xuXG5pbnRlcmZhY2UgTW9kdWxlQ2FjaGVJdGVtIHtcbiAgYmxvYlVybD86IHN0cmluZztcbiAgc2hlbGxVcmw/OiBzdHJpbmc7XG4gIHNoZWxsRXhlY3V0ZWQ/OiBib29sZWFuO1xuICBhbmFseXNpcz86IFJldHVyblR5cGU8dHlwZW9mIHBhcnNlPjtcbiAgc291cmNlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFU01vZHVsZUxvYWRlciB7XG4gIHByaXZhdGUgYXBwOiBBcHA7XG4gIHByaXZhdGUgZ2xvYmFsVmFyS2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgbW9kdWxlQ2FjaGU6IFJlY29yZDxzdHJpbmcsIE1vZHVsZUNhY2hlSXRlbT4gPSB7fTtcbiAgcHJpdmF0ZSBsb2NrID0gbmV3IExvY2soKTtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCkge1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuZ2xvYmFsVmFyS2V5ID0gYCR7X19HQVJGSVNIX0VTTV9FTlZfX31fJHt0aGlzLmFwcC5hcHBJZH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjTW9kdWxlQ29kZShibG9iVXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXN1bHQgPSAoMCwgZXZhbCkoYGltcG9ydCgnJHtibG9iVXJsfScpYCk7XG4gICAgdGhpcy5sb2NrLnJlbGVhc2UoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCbG9iVXJsKGNvZGU6IHN0cmluZykge1xuICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtjb2RlXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KSk7XG4gIH1cblxuICBwcml2YXRlIHNldEJsb2JVcmwoc2F2ZUlkOiBzdHJpbmcsIGJsb2JVcmw6IHN0cmluZykge1xuICAgIHRoaXMubW9kdWxlQ2FjaGVbc2F2ZUlkXS5ibG9iVXJsID0gYmxvYlVybDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hNb2R1bGVSZXNvdXJjZShcbiAgICBsb2NrSWQ6IG51bWJlcixcbiAgICBlbnZWYXJTdHI6IHN0cmluZyxcbiAgICBub0VudHJ5RW52VmFyU3RyOiBzdHJpbmcsXG4gICAgc2F2ZVVybDogc3RyaW5nLFxuICAgIHJlcXVlc3RVcmw6IHN0cmluZyxcbiAgKSB7XG4gICAgY29uc3QgeyByZXNvdXJjZU1hbmFnZXIgfSA9XG4gICAgICBhd2FpdCB0aGlzLmFwcC5jb250ZXh0LmxvYWRlci5sb2FkPEphdmFTY3JpcHRNYW5hZ2VyPih7XG4gICAgICAgIHNjb3BlOiB0aGlzLmFwcC5uYW1lLFxuICAgICAgICB1cmw6IHJlcXVlc3RVcmwsXG4gICAgICB9KTtcbiAgICAvLyBNYXliZSBvdGhlciByZXNvdXJjZVxuICAgIGlmIChyZXNvdXJjZU1hbmFnZXIpIHtcbiAgICAgIGxldCBzb3VyY2VtYXAgPSAnJztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICAgIGxldCB7IHVybCwgc2NyaXB0Q29kZSB9ID0gcmVzb3VyY2VNYW5hZ2VyO1xuXG4gICAgICBpZiAoIWhhdmVTb3VyY2VtYXAoc2NyaXB0Q29kZSkpIHtcbiAgICAgICAgc291cmNlbWFwID0gYXdhaXQgY3JlYXRlU291cmNlbWFwKHNjcmlwdENvZGUsIHJlcXVlc3RVcmwpO1xuICAgICAgfVxuICAgICAgc2NyaXB0Q29kZSA9IGF3YWl0IHRoaXMuYW5hbHlzaXNNb2R1bGUoXG4gICAgICAgIGxvY2tJZCxcbiAgICAgICAgc2NyaXB0Q29kZSxcbiAgICAgICAgZW52VmFyU3RyLFxuICAgICAgICBub0VudHJ5RW52VmFyU3RyLFxuICAgICAgICBzYXZlVXJsLFxuICAgICAgICB1cmwsXG4gICAgICApO1xuICAgICAgY29uc3QgYmxvYlVybCA9IHRoaXMuY3JlYXRlQmxvYlVybChcbiAgICAgICAgYGltcG9ydC5tZXRhLnVybD0nJHt1cmx9Jzske3RoaXMuYXBwLmlzTm9FbnRyeVNjcmlwdCh1cmwpID8gbm9FbnRyeUVudlZhclN0ciA6IGVudlZhclN0cn0ke3NjcmlwdENvZGV9XFxuJHtzb3VyY2VtYXB9YCxcbiAgICAgICk7XG4gICAgICB0aGlzLnNldEJsb2JVcmwoc2F2ZVVybCwgYmxvYlVybCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRVcmwocmVmZXJVcmwsIHRhcmdldFVybCkge1xuICAgIHJldHVybiAhaXNBYnNvbHV0ZSh0YXJnZXRVcmwpICYmIHJlZmVyVXJsXG4gICAgICA/IHRyYW5zZm9ybVVybChyZWZlclVybCwgdGFyZ2V0VXJsKVxuICAgICAgOiB0YXJnZXRVcmw7XG4gIH1cblxuICBwcml2YXRlIHByZWxvYWRTdGF0aWNNb2R1bGVBc3luYyhcbiAgICBhbmFseXNpczogUmV0dXJuVHlwZTx0eXBlb2YgcGFyc2U+LFxuICAgIHJlYWxVcmw/OiBzdHJpbmcgfCBudWxsLFxuICApIHtcbiAgICBjb25zdCBbaW1wb3J0c10gPSBhbmFseXNpcztcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBpbXBvcnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbXBvcnRBbmFseXNpcyA9IGltcG9ydHNbaV07XG4gICAgICBjb25zdCB7IGQ6IGltcG9ydFR5cGUsIG46IG1vZHVsZU5hbWUgfSA9IGltcG9ydEFuYWx5c2lzO1xuICAgICAgY29uc3QgaXNEeW5hbWljSW1wb3J0ID0gaW1wb3J0VHlwZSA+IC0xO1xuICAgICAgaWYgKG1vZHVsZU5hbWUgJiYgIWlzRHluYW1pY0ltcG9ydCkge1xuICAgICAgICAvLyBhc3luYyBwcmVsb2FkIGFsbCBzdGF0aWMgaW1wb3J0IG1vZHVsZSBvZiBjdXJyZW50IGZpbGVcbiAgICAgICAgdGhpcy5hcHAuY29udGV4dC5sb2FkZXIubG9hZDxKYXZhU2NyaXB0TWFuYWdlcj4oe1xuICAgICAgICAgIHNjb3BlOiB0aGlzLmFwcC5uYW1lLFxuICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwocmVhbFVybCwgbW9kdWxlTmFtZSksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYW5hbHlzaXNNb2R1bGUoXG4gICAgbG9ja0lkOiBudW1iZXIsXG4gICAgY29kZTogc3RyaW5nLFxuICAgIGVudlZhclN0cjogc3RyaW5nLFxuICAgIG5vRW50cnlFbnZWYXJTdHI6IHN0cmluZyxcbiAgICBiYXNlVXJsPzogc3RyaW5nLFxuICAgIHJlYWxVcmw/OiBzdHJpbmcgfCBudWxsLFxuICApIHtcbiAgICAvLyB3YWl0IGZvciB0aGUgb3RoZXIgdGFza1xuICAgIGF3YWl0IHRoaXMubG9jay53YWl0KGxvY2tJZCk7XG5cbiAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBmb3IgdGhlIFdlYiBBc3NlbWJseSBib290XG4gICAgYXdhaXQgaW5pdDtcblxuICAgIGNvbnN0IGFuYWx5c2lzID0gcGFyc2UoY29kZSwgcmVhbFVybCB8fCAnJyk7XG4gICAgY29uc3QgdGhpc01vZHVsZTogTW9kdWxlQ2FjaGVJdGVtID0ge1xuICAgICAgYW5hbHlzaXMsXG4gICAgICBzb3VyY2U6IGNvZGUsXG4gICAgfTtcblxuICAgIGlmIChiYXNlVXJsKSB7XG4gICAgICB0aGlzLm1vZHVsZUNhY2hlW2Jhc2VVcmxdID0gdGhpc01vZHVsZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gWycnLCBjb2RlXTtcbiAgICBsZXQgc2hlbGxFeGVjdXRpb25Db2RlID0gJyc7XG4gICAgY29uc3QgZHluYW1pY0ltcG9ydCA9IGB2YXIgX2ltcG9ydF89KHVybCk9PndpbmRvdy4ke3RoaXMuZ2xvYmFsVmFyS2V5fS5pbXBvcnQodXJsLCcke2Jhc2VVcmx9JywnJHtyZWFsVXJsfScpO2A7XG4gICAgY29uc3QgcHJvY2Vzc0ltcG9ydE1vZHVsZSA9IGdldE1vZHVsZUltcG9ydFByb2Nlc3Nvcihjb2RlKTtcbiAgICBjb25zdCBbaW1wb3J0c10gPSBhbmFseXNpcztcblxuICAgIHRoaXMucHJlbG9hZFN0YXRpY01vZHVsZUFzeW5jKGFuYWx5c2lzLCByZWFsVXJsKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBpbXBvcnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbXBvcnRBbmFseXNpcyA9IGltcG9ydHNbaV07XG4gICAgICBjb25zdCB7IGQ6IGltcG9ydFR5cGUsIG46IG1vZHVsZU5hbWUgfSA9IGltcG9ydEFuYWx5c2lzO1xuICAgICAgY29uc3QgaXNEeW5hbWljSW1wb3J0ID0gaW1wb3J0VHlwZSA+IC0xO1xuICAgICAgbGV0IHNhdmVVcmwgPSBtb2R1bGVOYW1lIHx8ICcnO1xuICAgICAgbGV0IG5ld01vZHVsZU5hbWUgPSAnJztcbiAgICAgIGlmIChtb2R1bGVOYW1lICYmICFpc0R5bmFtaWNJbXBvcnQpIHtcbiAgICAgICAgLy8gc3RhdGljIGltcG9ydFxuICAgICAgICBjb25zdCByZXF1ZXN0VXJsID0gdGhpcy5nZXRVcmwocmVhbFVybCwgbW9kdWxlTmFtZSk7XG4gICAgICAgIHNhdmVVcmwgPSB0aGlzLmdldFVybChiYXNlVXJsLCBtb2R1bGVOYW1lKTtcblxuICAgICAgICBsZXQgY3VycmVudE1vZHVsZSA9IHRoaXMubW9kdWxlQ2FjaGVbc2F2ZVVybF07XG4gICAgICAgIGlmIChjdXJyZW50TW9kdWxlICYmICFjdXJyZW50TW9kdWxlLmJsb2JVcmwpIHtcbiAgICAgICAgICAvLyBjaXJjdWxhciBkZXBlbmRlbmN5XG4gICAgICAgICAgaWYgKCFjdXJyZW50TW9kdWxlLnNoZWxsVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBbY3VycmVudE1vZHVsZUltcG9ydHMsIGN1cnJlbnRNb2R1bGVFeHBvcnRzXSA9XG4gICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuYW5hbHlzaXMhO1xuICAgICAgICAgICAgLy8gY2FzZSAnZXhwb3J0ICogZnJvbSBcInh4eFwiJ1xuICAgICAgICAgICAgLy8gd2UgY2FuIGZpbmQgdGhpcyBpbiB0aGUgaW1wb3J0IHN0YXRlbWVudFxuICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRFeHBvcnRzID0gY3VycmVudE1vZHVsZUltcG9ydHMuZmlsdGVyKFxuICAgICAgICAgICAgICAoaW1wb3J0SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlbWVudCA9IGN1cnJlbnRNb2R1bGUuc291cmNlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgIGltcG9ydEl0ZW0uc3MsXG4gICAgICAgICAgICAgICAgICBpbXBvcnRJdGVtLnNlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC9eZXhwb3J0XFxzKlxcKlxccypmcm9tXFxzKi8udGVzdChzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHdpbGRjYXJkRXhwb3J0U3RhdGVtZW50czogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsID0gd2lsZGNhcmRFeHBvcnRzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgICAvLyBmaW5kIHdpbGRjYXJkIGV4cG9ydHNcbiAgICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRFeHBvcnQgPSB3aWxkY2FyZEV4cG9ydHNbal07XG4gICAgICAgICAgICAgIGNvbnN0IHdpbGRjYXJkRXhwb3J0VXJsID0gd2lsZGNhcmRFeHBvcnQubiB8fCAnJztcbiAgICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRFeHBvcnRTYXZlVXJsID0gdGhpcy5nZXRVcmwoXG4gICAgICAgICAgICAgICAgYmFzZVVybCxcbiAgICAgICAgICAgICAgICB3aWxkY2FyZEV4cG9ydFVybCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gZmV0Y2ggYW5kIGFuYWx5emUgd2lsZGNhcmQgZXhwb3J0IG1vZHVsZVxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTW9kdWxlUmVzb3VyY2UoXG4gICAgICAgICAgICAgICAgbG9ja0lkLFxuICAgICAgICAgICAgICAgIGVudlZhclN0cixcbiAgICAgICAgICAgICAgICBub0VudHJ5RW52VmFyU3RyLFxuICAgICAgICAgICAgICAgIHdpbGRjYXJkRXhwb3J0U2F2ZVVybCxcbiAgICAgICAgICAgICAgICB0aGlzLmdldFVybChyZWFsVXJsLCB3aWxkY2FyZEV4cG9ydFVybCksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNvbnN0IHdpbGRjYXJkTW9kdWxlID0gdGhpcy5tb2R1bGVDYWNoZVt3aWxkY2FyZEV4cG9ydFNhdmVVcmxdO1xuICAgICAgICAgICAgICBpZiAod2lsZGNhcmRNb2R1bGU/LmJsb2JVcmwpIHtcbiAgICAgICAgICAgICAgICB3aWxkY2FyZEV4cG9ydFN0YXRlbWVudHMucHVzaChcbiAgICAgICAgICAgICAgICAgIGBleHBvcnQgKiBmcm9tICcke3dpbGRjYXJkTW9kdWxlLmJsb2JVcmx9J2AsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgc2hlbGwgY29kZSBmb3IgZGVsYXkgYXNzaWdubWVudFxuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5zaGVsbFVybCA9IHRoaXMuY3JlYXRlQmxvYlVybChcbiAgICAgICAgICAgICAgYGV4cG9ydCBmdW5jdGlvbiB1JCRfKG0peyR7Y3VycmVudE1vZHVsZUV4cG9ydHNcbiAgICAgICAgICAgICAgICAubWFwKChuYW1lKSA9PlxuICAgICAgICAgICAgICAgICAgbmFtZSA9PT0gJ2RlZmF1bHQnID8gJ2QkJF89bS5kZWZhdWx0JyA6IGAke25hbWV9PW0uJHtuYW1lfWAsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5qb2luKCcsJyl9fSR7Y3VycmVudE1vZHVsZUV4cG9ydHNcbiAgICAgICAgICAgICAgICAubWFwKChuYW1lKSA9PlxuICAgICAgICAgICAgICAgICAgbmFtZSA9PT0gJ2RlZmF1bHQnXG4gICAgICAgICAgICAgICAgICAgID8gJ2xldCBkJCRfO2V4cG9ydHtkJCRfIGFzIGRlZmF1bHR9J1xuICAgICAgICAgICAgICAgICAgICA6IGBleHBvcnQgbGV0ICR7bmFtZX1gLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuam9pbignOycpfSR7XG4gICAgICAgICAgICAgICAgd2lsZGNhcmRFeHBvcnRTdGF0ZW1lbnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgPyBgOyR7d2lsZGNhcmRFeHBvcnRTdGF0ZW1lbnRzLmpvaW4oJzsnKX1gXG4gICAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICAgIH1cXG4vLyMgc291cmNlVVJMPSR7c2F2ZVVybH0/Y3ljbGVgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3TW9kdWxlTmFtZSA9IGN1cnJlbnRNb2R1bGUuc2hlbGxVcmw7XG4gICAgICAgIH0gZWxzZSBpZiAoIWN1cnJlbnRNb2R1bGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoTW9kdWxlUmVzb3VyY2UobG9ja0lkLCBlbnZWYXJTdHIsIG5vRW50cnlFbnZWYXJTdHIsIHNhdmVVcmwsIHJlcXVlc3RVcmwpO1xuICAgICAgICAgIGN1cnJlbnRNb2R1bGUgPSB0aGlzLm1vZHVsZUNhY2hlW3NhdmVVcmxdO1xuICAgICAgICAgIGNvbnN0IHsgYmxvYlVybCwgc2hlbGxVcmwsIHNoZWxsRXhlY3V0ZWQgfSA9IGN1cnJlbnRNb2R1bGU7XG4gICAgICAgICAgbmV3TW9kdWxlTmFtZSA9IGJsb2JVcmwhO1xuICAgICAgICAgIGlmIChzaGVsbFVybCAmJiAhc2hlbGxFeGVjdXRlZCkge1xuICAgICAgICAgICAgLy8gZmluZCBjaXJjdWxhciBzaGVsbCwganVzdCBleGVjdXRlIGl0XG4gICAgICAgICAgICBzaGVsbEV4ZWN1dGlvbkNvZGUgKz0gZ2VuU2hlbGxFeGVjdXRpb25Db2RlKFxuICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICBuZXdNb2R1bGVOYW1lLFxuICAgICAgICAgICAgICBzaGVsbFVybCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlLnNoZWxsRXhlY3V0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdNb2R1bGVOYW1lID0gY3VycmVudE1vZHVsZS5ibG9iVXJsITtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0ID0gcHJvY2Vzc0ltcG9ydE1vZHVsZShpbXBvcnRBbmFseXNpcywgbmV3TW9kdWxlTmFtZSB8fCBtb2R1bGVOYW1lKTtcbiAgICB9XG5cbiAgICAvLyBjbGVhclxuICAgIHRoaXNNb2R1bGUuc291cmNlID0gJyc7XG4gICAgZGVsZXRlIHRoaXNNb2R1bGUuYW5hbHlzaXM7XG5cbiAgICByZXR1cm4gYCR7ZHluYW1pY0ltcG9ydH0ke3NoZWxsRXhlY3V0aW9uQ29kZX07JHtyZXN1bHQuam9pbignJyl9YDtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tb2R1bGVDYWNoZSkge1xuICAgICAgY29uc3QgeyBibG9iVXJsLCBzaGVsbFVybCB9ID0gdGhpcy5tb2R1bGVDYWNoZVtrZXldO1xuICAgICAgaWYgKGJsb2JVcmwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJsKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaGVsbFVybCkge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNoZWxsVXJsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tb2R1bGVDYWNoZSA9IHt9O1xuICAgIHRoaXMubG9jay5jbGVhcigpO1xuICAgIGRlbGV0ZSB0aGlzLmFwcC5nbG9iYWxbdGhpcy5nbG9iYWxWYXJLZXldO1xuICB9XG5cbiAgbG9hZChcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgZW52OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgIHVybD86IHN0cmluZyxcbiAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAodXJsICYmIHRoaXMubW9kdWxlQ2FjaGVbdXJsXSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZW5TaGVsbENvZGVXcmFwcGVyID0gKFxuICAgICAgICBibG9iVXJsOiBzdHJpbmcsXG4gICAgICAgIHNoZWxsVXJsOiBzdHJpbmcsXG4gICAgICAgIHNvdXJjZVVybDogc3RyaW5nLFxuICAgICAgKSA9PiB7XG4gICAgICAgIHJldHVybiBgZXhwb3J0ICogZnJvbSAnJHtibG9iVXJsfScke2dlblNoZWxsRXhlY3V0aW9uQ29kZShcbiAgICAgICAgICAwLFxuICAgICAgICAgIGJsb2JVcmwsXG4gICAgICAgICAgc2hlbGxVcmwsXG4gICAgICAgICl9XFxuLy8jIHNvdXJjZVVSTD0ke3NvdXJjZVVybH0/Y3ljbGVgO1xuICAgICAgfTtcblxuICAgICAgZW52ID0ge1xuICAgICAgICAuLi5lbnYsXG4gICAgICAgIHJlc29sdmUsXG4gICAgICAgIGltcG9ydDogYXN5bmMgKG1vZHVsZUlkOiBzdHJpbmcsIGJhc2VVcmw6IHN0cmluZywgcmVhbFVybDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgbGV0IHNhdmVVcmwgPSBtb2R1bGVJZDtcbiAgICAgICAgICBsZXQgcmVxdWVzdFVybCA9IG1vZHVsZUlkO1xuXG4gICAgICAgICAgaWYgKCFpc0Fic29sdXRlKG1vZHVsZUlkKSkge1xuICAgICAgICAgICAgc2F2ZVVybCA9IHRyYW5zZm9ybVVybChiYXNlVXJsLCBtb2R1bGVJZCk7XG4gICAgICAgICAgICByZXF1ZXN0VXJsID0gdHJhbnNmb3JtVXJsKHJlYWxVcmwsIG1vZHVsZUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHRhcmdldE1vZHVsZSA9IHRoaXMubW9kdWxlQ2FjaGVbc2F2ZVVybF07XG4gICAgICAgICAgaWYgKCF0YXJnZXRNb2R1bGU/LmJsb2JVcmwpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hNb2R1bGVSZXNvdXJjZSh0aGlzLmxvY2suZ2VuSWQoKSwgZW52VmFyU3RyLCBub0VudHJ5RW52VmFyU3RyLCBzYXZlVXJsLCByZXF1ZXN0VXJsKTtcbiAgICAgICAgICAgIHRhcmdldE1vZHVsZSA9IHRoaXMubW9kdWxlQ2FjaGVbc2F2ZVVybF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRhcmdldE1vZHVsZSAmJlxuICAgICAgICAgICAgdGFyZ2V0TW9kdWxlLnNoZWxsVXJsICYmXG4gICAgICAgICAgICAhdGFyZ2V0TW9kdWxlLnNoZWxsRXhlY3V0ZWQgJiZcbiAgICAgICAgICAgIHRhcmdldE1vZHVsZS5ibG9iVXJsXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgdG9wIGxldmVsIGxvYWQgaXMgYSBzaGVsbCBjb2RlLCB3ZSBuZWVkIHRvIHJ1biBpdHMgdXBkYXRlIGZ1bmN0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjTW9kdWxlQ29kZShcbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCbG9iVXJsKFxuICAgICAgICAgICAgICAgIGdlblNoZWxsQ29kZVdyYXBwZXIoXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNb2R1bGUuYmxvYlVybCxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1vZHVsZS5zaGVsbFVybCxcbiAgICAgICAgICAgICAgICAgIHNhdmVVcmwsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWNNb2R1bGVDb2RlKHRhcmdldE1vZHVsZS5ibG9iVXJsISk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZ2VuRW52VmFyU3RyID0gKHRhcmdldEVudjogUmVjb3JkPHN0cmluZywgYW55Piwgbm9FbnRyeT86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgY29uc3QgbmV3RW52ID0geyAuLi50YXJnZXRFbnYgfTtcbiAgICAgICAgaWYgKG5vRW50cnkpIHtcbiAgICAgICAgICBkZWxldGUgbmV3RW52LmV4cG9ydHM7XG4gICAgICAgICAgZGVsZXRlIG5ld0Vudi5tb2R1bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld0VudikucmVkdWNlKChwcmV2Q29kZSwgbmFtZSkgPT4ge1xuICAgICAgICAgIGlmIChuYW1lID09PSAncmVzb2x2ZScgfHwgbmFtZSA9PT0gJ2ltcG9ydCcpIHJldHVybiBwcmV2Q29kZTtcbiAgICAgICAgICByZXR1cm4gYCR7cHJldkNvZGV9IHZhciAke25hbWV9ID0gd2luZG93LiR7dGhpcy5nbG9iYWxWYXJLZXl9LiR7bmFtZX07YDtcbiAgICAgICAgfSwgJycpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IGVudlZhclN0ciA9IGdlbkVudlZhclN0cihlbnYpO1xuICAgICAgY29uc3Qgbm9FbnRyeUVudlZhclN0ciA9IGdlbkVudlZhclN0cihlbnYsIHRydWUpO1xuXG4gICAgICBsZXQgc291cmNlbWFwID0gJyc7XG4gICAgICBpZiAoIWhhdmVTb3VyY2VtYXAoY29kZSkgJiYgdXJsKSB7XG4gICAgICAgIHNvdXJjZW1hcCA9IGF3YWl0IGNyZWF0ZVNvdXJjZW1hcChcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5pc0lubGluZVxuICAgICAgICAgICAgPyBgaW5kZXguaHRtbChpbmxpbmUuJHt0aGlzLmFwcC5zY3JpcHRDb3VudH0uanMpYFxuICAgICAgICAgICAgOiB1cmwsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvZGUgPSBhd2FpdCB0aGlzLmFuYWx5c2lzTW9kdWxlKHRoaXMubG9jay5nZW5JZCgpLCBjb2RlLCBlbnZWYXJTdHIsIG5vRW50cnlFbnZWYXJTdHIsIHVybCwgdXJsKTtcbiAgICAgIGNvZGUgPSBgaW1wb3J0Lm1ldGEudXJsPScke3VybH0nOyR7b3B0aW9ucz8ubm9FbnRyeSA/IG5vRW50cnlFbnZWYXJTdHIgOiBlbnZWYXJTdHJ9JHtjb2RlfVxcbjt3aW5kb3cuJHt0aGlzLmdsb2JhbFZhcktleX0ucmVzb2x2ZSgpO1xcbiR7c291cmNlbWFwfWA7XG5cbiAgICAgIHRoaXMuYXBwLmdsb2JhbFt0aGlzLmdsb2JhbFZhcktleV0gPSBlbnY7XG5cbiAgICAgIGxldCBibG9iVXJsID0gdGhpcy5jcmVhdGVCbG9iVXJsKGNvZGUpO1xuICAgICAgaWYgKG9wdGlvbnMgJiYgIW9wdGlvbnMuaXNJbmxpbmUgJiYgdXJsKSB7XG4gICAgICAgIHRoaXMuc2V0QmxvYlVybCh1cmwsIGJsb2JVcmwpO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudE1vZHVsZSA9IHRoaXMubW9kdWxlQ2FjaGVbdXJsIHx8ICcnXTtcbiAgICAgIGlmIChjdXJyZW50TW9kdWxlPy5zaGVsbFVybCAmJiAhY3VycmVudE1vZHVsZS5zaGVsbEV4ZWN1dGVkKSB7XG4gICAgICAgIC8vIGlmIHRoZSB0b3AgbGV2ZWwgbG9hZCBpcyBhIHNoZWxsIGNvZGUsIHdlIG5lZWQgdG8gcnVuIGl0cyB1cGRhdGUgZnVuY3Rpb25cbiAgICAgICAgYmxvYlVybCA9IHRoaXMuY3JlYXRlQmxvYlVybChcbiAgICAgICAgICBnZW5TaGVsbENvZGVXcmFwcGVyKGJsb2JVcmwsIGN1cnJlbnRNb2R1bGUuc2hlbGxVcmwsIHVybCB8fCAnJyksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLmV4ZWNNb2R1bGVDb2RlKGJsb2JVcmwpO1xuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgd2FybiwgZXJyb3IsIFRleHQsIHRyYW5zZm9ybVVybCwgYXNzZXJ0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHtcbiAgTG9hZGVyLFxuICBTdHlsZU1hbmFnZXIsXG4gIFRlbXBsYXRlTWFuYWdlcixcbiAgSmF2YVNjcmlwdE1hbmFnZXIsXG59IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQgeyBBcHBJbmZvIH0gZnJvbSAnLi9hcHAnO1xuXG4vLyBGZXRjaCBgc2NyaXB0YCwgYGxpbmtgIGFuZCBgbW9kdWxlIG1ldGFgIGVsZW1lbnRzXG5mdW5jdGlvbiBmZXRjaFN0YXRpY1Jlc291cmNlcyhcbiAgYXBwTmFtZTogc3RyaW5nLFxuICBsb2FkZXI6IExvYWRlcixcbiAgZW50cnlNYW5hZ2VyOiBUZW1wbGF0ZU1hbmFnZXIsXG4pIHtcbiAgY29uc3QgaXNBc3luYyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnICYmIHZhbCAhPT0gJ2ZhbHNlJztcblxuICAvLyBHZXQgYWxsIHNjcmlwdCBlbGVtZW50c1xuICBjb25zdCBqc05vZGVzID0gUHJvbWlzZS5hbGwoXG4gICAgZW50cnlNYW5hZ2VyXG4gICAgICAuZmluZEFsbEpzTm9kZXMoKVxuICAgICAgLm1hcCgobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBzcmMgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdzcmMnKTtcbiAgICAgICAgY29uc3QgdHlwZSA9IGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ3R5cGUnKTtcbiAgICAgICAgY29uc3QgY3Jvc3NPcmlnaW4gPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgJ2Nyb3Nzb3JpZ2luJyxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBUaGVyZSBzaG91bGQgYmUgbm8gZW1iZWRkZWQgc2NyaXB0IGluIHRoZSBzY3JpcHQgZWxlbWVudCB0YWcgd2l0aCB0aGUgc3JjIGF0dHJpYnV0ZSBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgIGNvbnN0IGZldGNoVXJsID0gZW50cnlNYW5hZ2VyLnVybFxuICAgICAgICAgICAgPyB0cmFuc2Zvcm1VcmwoZW50cnlNYW5hZ2VyLnVybCwgc3JjKVxuICAgICAgICAgICAgOiBzcmM7XG4gICAgICAgICAgY29uc3QgYXN5bmMgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdhc3luYycpO1xuXG4gICAgICAgICAgLy8gU2NyaXB0cyB3aXRoIFwiYXN5bmNcIiBhdHRyaWJ1dGUgd2lsbCBtYWtlIHRoZSByZW5kZXJpbmcgcHJvY2VzcyB2ZXJ5IGNvbXBsaWNhdGVkLFxuICAgICAgICAgIC8vIHdlIGhhdmUgYSBwcmVsb2FkIG1lY2hhbmlzbSwgc28gd2UgZG9uXHUyMDE5dCBuZWVkIHRvIGRlYWwgd2l0aCBpdC5cbiAgICAgICAgICByZXR1cm4gbG9hZGVyXG4gICAgICAgICAgICAubG9hZDxKYXZhU2NyaXB0TWFuYWdlcj4oe1xuICAgICAgICAgICAgICBzY29wZTogYXBwTmFtZSxcbiAgICAgICAgICAgICAgdXJsOiBmZXRjaFVybCxcbiAgICAgICAgICAgICAgY3Jvc3NPcmlnaW4sXG4gICAgICAgICAgICAgIGRlZmF1bHRDb250ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoeyByZXNvdXJjZU1hbmFnZXI6IGpzTWFuYWdlciB9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChqc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBqc01hbmFnZXIuc2V0RGVwKG5vZGUpO1xuICAgICAgICAgICAgICAgIHR5cGUgJiYganNNYW5hZ2VyLnNldE1pbWVUeXBlKHR5cGUpO1xuICAgICAgICAgICAgICAgIGpzTWFuYWdlci5zZXRBc3luY0F0dHJpYnV0ZShpc0FzeW5jKGFzeW5jKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzTWFuYWdlcjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YXJuKGBbJHthcHBOYW1lfV0gRmFpbGVkIHRvIGxvYWQgc2NyaXB0OiAke2ZldGNoVXJsfWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IG51bGwpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNvZGUgPSAobm9kZS5jaGlsZHJlblswXSBhcyBUZXh0KS5jb250ZW50O1xuICAgICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBqc01hbmFnZXIgPSBuZXcgSmF2YVNjcmlwdE1hbmFnZXIoY29kZSwgJycpO1xuICAgICAgICAgICAganNNYW5hZ2VyLnNldERlcChub2RlKTtcbiAgICAgICAgICAgIHR5cGUgJiYganNNYW5hZ2VyLnNldE1pbWVUeXBlKHR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIGpzTWFuYWdlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pLFxuICApO1xuXG4gIC8vIEdldCBhbGwgbGluayBlbGVtZW50c1xuICBjb25zdCBsaW5rTm9kZXMgPSBQcm9taXNlLmFsbChcbiAgICBlbnRyeU1hbmFnZXJcbiAgICAgIC5maW5kQWxsTGlua05vZGVzKClcbiAgICAgIC5tYXAoKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFlbnRyeU1hbmFnZXIuRE9NQXBpcy5pc0Nzc0xpbmtOb2RlKG5vZGUpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGhyZWYgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdocmVmJyk7XG4gICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgY29uc3QgZmV0Y2hVcmwgPSBlbnRyeU1hbmFnZXIudXJsXG4gICAgICAgICAgICA/IHRyYW5zZm9ybVVybChlbnRyeU1hbmFnZXIudXJsLCBocmVmKVxuICAgICAgICAgICAgOiBocmVmO1xuICAgICAgICAgIHJldHVybiBsb2FkZXJcbiAgICAgICAgICAgIC5sb2FkPFN0eWxlTWFuYWdlcj4oeyBzY29wZTogYXBwTmFtZSwgdXJsOiBmZXRjaFVybCB9KVxuICAgICAgICAgICAgLnRoZW4oKHsgcmVzb3VyY2VNYW5hZ2VyOiBzdHlsZU1hbmFnZXIgfSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3R5bGVNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVNYW5hZ2VyLnNldERlcChub2RlKTtcbiAgICAgICAgICAgICAgICBzdHlsZU1hbmFnZXIuY29ycmVjdFBhdGgoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVNYW5hZ2VyO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdhcm4oYCR7YXBwTmFtZX0gRmFpbGVkIHRvIGxvYWQgbGluazogJHtmZXRjaFVybH1gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbiksXG4gICk7XG5cbiAgLy8gR2V0IGFsbCByZW1vdGUgbW9kdWxlc1xuICBjb25zdCBtZXRhTm9kZXMgPSBQcm9taXNlLmFsbChcbiAgICBlbnRyeU1hbmFnZXJcbiAgICAgIC5maW5kQWxsTWV0YU5vZGVzKClcbiAgICAgIC5tYXAoKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFlbnRyeU1hbmFnZXIuRE9NQXBpcy5pc1JlbW90ZU1vZHVsZShub2RlKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhc3luYyA9IGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ2FzeW5jJyk7XG4gICAgICAgIGNvbnN0IGFsaWFzID0gZW50cnlNYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAnYWxpYXMnKTtcbiAgICAgICAgaWYgKCFpc0FzeW5jKGFzeW5jKSkge1xuICAgICAgICAgIGNvbnN0IHNyYyA9IGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ3NyYycpO1xuICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2FkZXJcbiAgICAgICAgICAgICAgLmxvYWRNb2R1bGUoc3JjKVxuICAgICAgICAgICAgICAudGhlbigoeyByZXNvdXJjZU1hbmFnZXI6IG1vZHVsZU1hbmFnZXIgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb2R1bGVNYW5hZ2VyICYmIGFsaWFzKSB7XG4gICAgICAgICAgICAgICAgICBtb2R1bGVNYW5hZ2VyICYmIG1vZHVsZU1hbmFnZXIuc2V0QWxpYXMoYWxpYXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlTWFuYWdlcjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhbGlhcykge1xuICAgICAgICAgIHdhcm4oYEFzeW5jaHJvbm91cyBsb2FkaW5nIG1vZHVsZSwgdGhlIGFsaWFzIFwiJHthbGlhc31cIiBpcyBpbnZhbGlkLmApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSxcbiAgKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoW2pzTm9kZXMsIGxpbmtOb2RlcywgbWV0YU5vZGVzXSkudGhlbigobHMpID0+XG4gICAgbHMubWFwKChuczogYW55KSA9PiBucy5maWx0ZXIoQm9vbGVhbikpLFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0FwcFJlc291cmNlcyhsb2FkZXI6IExvYWRlciwgYXBwSW5mbzogQXBwSW5mbykge1xuICBsZXQgaXNIdG1sTW9kZTogQm9vbGVhbiA9IGZhbHNlLFxuICAgIGZha2VFbnRyeU1hbmFnZXI7XG4gIGNvbnN0IHJlc291cmNlczogYW55ID0geyBqczogW10sIGxpbms6IFtdLCBtb2R1bGVzOiBbXSB9OyAvLyBEZWZhdWx0IHJlc291cmNlc1xuICBhc3NlcnQoYXBwSW5mby5lbnRyeSwgYFske2FwcEluZm8ubmFtZX1dIEVudHJ5IGlzIG5vdCBzcGVjaWZpZWQuYCk7XG4gIGNvbnN0IHsgcmVzb3VyY2VNYW5hZ2VyOiBlbnRyeU1hbmFnZXIgfSA9IGF3YWl0IGxvYWRlci5sb2FkKHtcbiAgICBzY29wZTogYXBwSW5mby5uYW1lLFxuICAgIHVybDogdHJhbnNmb3JtVXJsKGxvY2F0aW9uLmhyZWYsIGFwcEluZm8uZW50cnkpLFxuICB9KTtcblxuICAvLyBIdG1sIGVudHJ5XG4gIGlmIChlbnRyeU1hbmFnZXIgaW5zdGFuY2VvZiBUZW1wbGF0ZU1hbmFnZXIpIHtcbiAgICBpc0h0bWxNb2RlID0gdHJ1ZTtcbiAgICBjb25zdCBbanMsIGxpbmssIG1vZHVsZXNdID0gYXdhaXQgZmV0Y2hTdGF0aWNSZXNvdXJjZXMoXG4gICAgICBhcHBJbmZvLm5hbWUsXG4gICAgICBsb2FkZXIsXG4gICAgICBlbnRyeU1hbmFnZXIsXG4gICAgKTtcbiAgICByZXNvdXJjZXMuanMgPSBqcztcbiAgICByZXNvdXJjZXMubGluayA9IGxpbms7XG4gICAgcmVzb3VyY2VzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICB9IGVsc2UgaWYgKGVudHJ5TWFuYWdlciBpbnN0YW5jZW9mIEphdmFTY3JpcHRNYW5hZ2VyKSB7XG4gICAgLy8gSnMgZW50cnlcbiAgICBpc0h0bWxNb2RlID0gZmFsc2U7XG4gICAgY29uc3QgbW9ja1RlbXBsYXRlQ29kZSA9IGA8c2NyaXB0IHNyYz1cIiR7ZW50cnlNYW5hZ2VyLnVybH1cIj48L3NjcmlwdD5gO1xuICAgIGZha2VFbnRyeU1hbmFnZXIgPSBuZXcgVGVtcGxhdGVNYW5hZ2VyKG1vY2tUZW1wbGF0ZUNvZGUsIGVudHJ5TWFuYWdlci51cmwpO1xuICAgIGVudHJ5TWFuYWdlci5zZXREZXAoZmFrZUVudHJ5TWFuYWdlci5maW5kQWxsSnNOb2RlcygpWzBdKTtcbiAgICByZXNvdXJjZXMuanMgPSBbZW50cnlNYW5hZ2VyXTtcbiAgfSBlbHNlIHtcbiAgICBlcnJvcihgRW50cmFuY2Ugd3JvbmcgdHlwZSBvZiByZXNvdXJjZSBvZiBcIiR7YXBwSW5mby5uYW1lfVwiLmApO1xuICB9XG5cbiAgcmV0dXJuIFtmYWtlRW50cnlNYW5hZ2VyIHx8IGVudHJ5TWFuYWdlciwgcmVzb3VyY2VzLCBpc0h0bWxNb2RlXTtcbn1cbiIsICJpbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi4vaW50ZXJmYWNlJztcblxuLy8gV2hlbiB0aGUgbWFpbiBhcHBsaWNhdGlvbiBpcyB1cGRhdGVkLCB0aGUgY3VycmVudGx5IGFjdGl2ZSBjaGlsZCBhcHBsaWNhdGlvbnMgbmVlZCB0byByZXJlbmRlci5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoSE1SUGx1Z2luKCkge1xuICBsZXQgaGFzSW5pdCA9IGZhbHNlO1xuICBsZXQgaXNIb3RVcGRhdGUgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdmaXgtaG1yJyxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuXG4gICAgICBib290c3RyYXAoKSB7XG4gICAgICAgIGlmIChoYXNJbml0KSByZXR1cm47XG4gICAgICAgIGhhc0luaXQgPSB0cnVlO1xuXG4gICAgICAgIGxldCB3ZWJwYWNrSG90VXBkYXRlTmFtZSA9ICd3ZWJwYWNrSG90VXBkYXRlJztcbiAgICAgICAgbGV0IHdlYnBhY2tIb3RVcGRhdGUgPSAod2luZG93IGFzIGFueSlbd2VicGFja0hvdFVwZGF0ZU5hbWVdO1xuXG4gICAgICAgIC8vIFx1NjdFNVx1NjI3RSB3ZWJwYWNrSG90VXBkYXRlIFx1NTFGRFx1NjU3MFxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gd2luZG93KSB7XG4gICAgICAgICAgaWYgKGkuaW5jbHVkZXMoJ3dlYnBhY2tIb3RVcGRhdGUnKSkge1xuICAgICAgICAgICAgd2VicGFja0hvdFVwZGF0ZU5hbWUgPSBpO1xuICAgICAgICAgICAgd2VicGFja0hvdFVwZGF0ZSA9IHdpbmRvd1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHdlYnBhY2tIb3RVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAod2luZG93IGFzIGFueSlbd2VicGFja0hvdFVwZGF0ZU5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXNIb3RVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHdlYnBhY2tIb3RVcGRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzSG90VXBkYXRlKSByZXR1cm47XG4gICAgICAgICAgICBpc0hvdFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBHYXJmaXNoLmFjdGl2ZUFwcHMuZm9yRWFjaCgoYXBwKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhcHAubW91bnRlZCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwLmRpc3BsYXkgJiYgYXBwLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIGFwcC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoT3B0aW9uc0xpZmUob3B0aW9ucywgbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKTogaW50ZXJmYWNlcy5QbHVnaW4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgdmVyc2lvbjogJzEuMTIuMCcsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgd2FybixcbiAgUXVldWUsXG4gIGlzQWJzb2x1dGUsXG4gIHRyYW5zZm9ybVVybCxcbiAgaWRsZUNhbGxiYWNrLFxuICBjYWxsVGVzdENhbGxiYWNrLFxuICBzYWZlV3JhcHBlcixcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgTG9hZGVyLCBNYW5hZ2VyLCBUZW1wbGF0ZU1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBzdG9yYWdlS2V5ID0gJ19fZ2FyZmlzaFByZWxvYWRBcHBfXyc7XG5cbmNvbnN0IGlzTW9iaWxlID1cbiAgL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICk7XG5cbi8vIFVzaW5nIHF1ZXVlcywgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIHdpdGggdGhlIG5vcm1hbCByZXF1ZXN0XG5jb25zdCByZXF1ZXN0UXVldWUgPSBuZXcgUXVldWUoKTtcblxuY29uc3QgaXNTbG93TmV0d29yayA9ICgpID0+XG4gIChuYXZpZ2F0b3IgYXMgYW55KS5jb25uZWN0aW9uXG4gICAgPyAobmF2aWdhdG9yIGFzIGFueSkuY29ubmVjdGlvbi5zYXZlRGF0YSB8fFxuICAgICAgLygyfDMpZy8udGVzdCgobmF2aWdhdG9yIGFzIGFueSkuY29ubmVjdGlvbi5lZmZlY3RpdmVUeXBlKVxuICAgIDogZmFsc2U7XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID1cbiAgZmFsc2UgfHwgdHlwZW9mIGlkbGVDYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJ1xuICAgID8gd2luZG93LnNldFRpbWVvdXRcbiAgICA6IGlkbGVDYWxsYmFjaztcblxuLy8gVGVzdCBzaXplLCBjYXRjaCBtaXN0YWtlcywgYXZvaWQgcHJlbG9hZCBmaXJzdCBzY3JlZW4gd2hpdGUgZHVyaW5nIHBhcnNpbmcgZXJyb3JcbmZ1bmN0aW9uIHNhZmVMb2FkKHtcbiAgbG9hZGVyLFxuICBhcHBOYW1lLFxuICB1cmwsXG4gIGlzTW9kdWxlLFxuICBpbW1lZGlhdGVseSxcbiAgY2FsbGJhY2ssXG59OiB7XG4gIGxvYWRlcjogTG9hZGVyO1xuICBhcHBOYW1lOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBpc01vZHVsZTogYm9vbGVhbjtcbiAgaW1tZWRpYXRlbHk6IGJvb2xlYW47XG4gIGNhbGxiYWNrPzogKG06IE1hbmFnZXIpID0+IGFueTtcbn0pIHtcbiAgY29uc3QgZ2VuZXJhdGVTdWNjZXNzID1cbiAgICAobmV4dDogKCkgPT4gdm9pZCA9ICgpID0+IHt9KSA9PlxuICAgICh7IHJlc291cmNlTWFuYWdlciB9KSA9PiB7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNvdXJjZU1hbmFnZXIpO1xuICAgICAgc2V0VGltZW91dChuZXh0LCA1MDApO1xuICAgIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVUaHJvd1dhcm4gPVxuICAgIChuZXh0OiAoKSA9PiB2b2lkID0gKCkgPT4ge30pID0+XG4gICAgKGUpID0+IHtcbiAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICB3YXJuKGUpO1xuICAgICAgICB3YXJuKGBQcmVsb2FkIGZhaWxlZC4gXCIke3VybH1cImApO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH07XG5cbiAgY29uc3QgbG9hZFJlc291cmNlID0gKG5leHQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fSkgPT4ge1xuICAgIGNvbnN0IHRocm93V2FybiA9IGdlbmVyYXRlVGhyb3dXYXJuKG5leHQpO1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnZW5lcmF0ZVN1Y2Nlc3MobmV4dCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc01vZHVsZSkge1xuICAgICAgICBsb2FkZXIubG9hZE1vZHVsZSh1cmwpLnRoZW4oc3VjY2VzcywgdGhyb3dXYXJuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRlci5sb2FkKHsgc2NvcGU6IGFwcE5hbWUsIHVybCB9KS50aGVuKHN1Y2Nlc3MsIHRocm93V2Fybik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3dXYXJuKGUpO1xuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoaW1tZWRpYXRlbHkpIHtcbiAgICBsb2FkUmVzb3VyY2UoKTtcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0UXVldWUuYWRkKChuZXh0KSA9PiB7XG4gICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IGxvYWRSZXNvdXJjZShuZXh0KSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRBcHBSZXNvdXJjZShcbiAgbG9hZGVyOiBMb2FkZXIsXG4gIGluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgaW1tZWRpYXRlbHkgPSBmYWxzZSxcbikge1xuICBmYWxzZSAmJiBjYWxsVGVzdENhbGxiYWNrKGxvYWRBcHBSZXNvdXJjZSwgaW5mbyk7XG4gIGNvbnN0IGZldGNoVXJsID0gdHJhbnNmb3JtVXJsKGxvY2F0aW9uLmhyZWYsIGluZm8uZW50cnkpO1xuXG4gIHNhZmVMb2FkKHtcbiAgICBsb2FkZXIsXG4gICAgYXBwTmFtZTogaW5mby5uYW1lLFxuICAgIHVybDogZmV0Y2hVcmwsXG4gICAgaXNNb2R1bGU6IGZhbHNlLFxuICAgIGltbWVkaWF0ZWx5LFxuICAgIGNhbGxiYWNrOiAobWFuYWdlcikgPT4ge1xuICAgICAgY29uc3QgbG9hZFN0YXRpY1Jlc291cmNlID0gKCkgPT4ge1xuICAgICAgICBpZiAobWFuYWdlciBpbnN0YW5jZW9mIFRlbXBsYXRlTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBtYW5hZ2VyLnVybDtcbiAgICAgICAgICBjb25zdCBqc05vZGVzID0gbWFuYWdlci5maW5kQWxsSnNOb2RlcygpO1xuICAgICAgICAgIGNvbnN0IGxpbmtOb2RlcyA9IG1hbmFnZXIuZmluZEFsbExpbmtOb2RlcygpO1xuICAgICAgICAgIGNvbnN0IG1ldGFOb2RlcyA9IG1hbmFnZXIuZmluZEFsbE1ldGFOb2RlcygpO1xuXG4gICAgICAgICAgaWYgKGpzTm9kZXMpIHtcbiAgICAgICAgICAgIGpzTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzcmMgPSBtYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAnc3JjJyk7XG4gICAgICAgICAgICAgIHNyYyAmJlxuICAgICAgICAgICAgICAgIHNhZmVMb2FkKHtcbiAgICAgICAgICAgICAgICAgIGxvYWRlcixcbiAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgIHVybDogYmFzZVVybCA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBzcmMpIDogc3JjLFxuICAgICAgICAgICAgICAgICAgaXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaW1tZWRpYXRlbHksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxpbmtOb2Rlcykge1xuICAgICAgICAgICAgbGlua05vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG1hbmFnZXIuRE9NQXBpcy5pc0Nzc0xpbmtOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9IG1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdocmVmJyk7XG4gICAgICAgICAgICAgICAgaHJlZiAmJlxuICAgICAgICAgICAgICAgICAgc2FmZUxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXIsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlVXJsID8gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIGhyZWYpIDogaHJlZixcbiAgICAgICAgICAgICAgICAgICAgaXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1ldGFOb2Rlcykge1xuICAgICAgICAgICAgbWV0YU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG1hbmFnZXIuRE9NQXBpcy5pc1JlbW90ZU1vZHVsZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IG1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdzcmMnKTtcbiAgICAgICAgICAgICAgICBpZiAoc3JjICYmIGlzQWJzb2x1dGUoc3JjKSkge1xuICAgICAgICAgICAgICAgICAgc2FmZUxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXIsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgIGlzTW9kdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVGhlIGxvYWRpbmcgb2YgdGhlIHJlbW90ZSBtb2R1bGUgbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoLiBcIiR7c3JjfVwiYCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoaW1tZWRpYXRlbHkpIHtcbiAgICAgICAgbG9hZFN0YXRpY1Jlc291cmNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKGxvYWRTdGF0aWNSZXNvdXJjZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5raW5nKCkge1xuICBjb25zdCBzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgaWYgKHN0cikge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhbmtpbmcoYXBwTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICBjb25zdCBuZXdDdXJyZW50ID0geyBhcHBOYW1lLCBjb3VudDogMSB9O1xuXG4gIGlmICghc3RyKSB7XG4gICAgc2FmZVdyYXBwZXIoKCkgPT5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KFtuZXdDdXJyZW50XSkpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2Uoc3RyKTtcbiAgICBjb25zdCBjdXJyZW50ID0gZGF0YS5maW5kKChhcHApID0+IGFwcC5hcHBOYW1lID09PSBhcHBOYW1lKTtcbiAgICBjdXJyZW50ID8gY3VycmVudC5jb3VudCsrIDogZGF0YS5wdXNoKG5ld0N1cnJlbnQpO1xuICAgIHNhZmVXcmFwcGVyKCgpID0+IGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKSk7XG4gIH1cbn1cblxuY29uc3QgbG9hZGVkTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gR2xvYmFsIGNhY2hlLCBvbmx5IGxvYWQgYWdhaW4gaXMgZW5vdWdoXG5cbmRlY2xhcmUgbW9kdWxlICdAZ2FyZmlzaC9jb3JlJyB7XG4gIGV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBHYXJmaXNoIHtcbiAgICBwcmVsb2FkQXBwOiAoYXBwTmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoUHJlbG9hZFBsdWdpbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgR2FyZmlzaC5wcmVsb2FkQXBwID0gKGFwcE5hbWUpID0+IHtcbiAgICAgIGxvYWRBcHBSZXNvdXJjZShHYXJmaXNoLmxvYWRlciwgR2FyZmlzaC5hcHBJbmZvc1thcHBOYW1lXSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncHJlbG9hZCcsXG4gICAgICB2ZXJzaW9uOiAnMS4xMi4wJyxcblxuICAgICAgYmVmb3JlTG9hZChhcHBJbmZvKSB7XG4gICAgICAgIGlmIChHYXJmaXNoLm9wdGlvbnMuZGlzYWJsZVByZWxvYWRBcHApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0UmFua2luZyhhcHBJbmZvLm5hbWUpO1xuICAgICAgfSxcblxuICAgICAgcmVnaXN0ZXJBcHAoYXBwSW5mb3MpIHtcbiAgICAgICAgLy8gVGhyb3VnaCBkaXNhYmxlUHJlbG9hZEFwcCBwcmVsb2FkIGlzIHByb2hpYml0ZWRcbiAgICAgICAgaWYgKEdhcmZpc2gub3B0aW9ucy5kaXNhYmxlUHJlbG9hZEFwcCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSB8fCBpc1Nsb3dOZXR3b3JrKCkpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHJhbmtpbmcgPSBnZXRSYW5raW5nKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBhcHBOYW1lIH0gb2YgcmFua2luZykge1xuICAgICAgICAgICAgICBpZiAoYXBwSW5mb3NbYXBwTmFtZV0gJiYgIWxvYWRlZE1hcFthcHBOYW1lXSkge1xuICAgICAgICAgICAgICAgIGxvYWRlZE1hcFthcHBOYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbG9hZEFwcFJlc291cmNlKEdhcmZpc2gubG9hZGVyLCBhcHBJbmZvc1thcHBOYW1lXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYXBwSW5mb3MpIHtcbiAgICAgICAgICAgICAgaWYgKCFsb2FkZWRNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgIGxvYWRBcHBSZXNvdXJjZShHYXJmaXNoLmxvYWRlciwgYXBwSW5mb3Nba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlID8gMCA6IDUwMDAsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZ2V0UmVuZGVyTm9kZSwgd2FybiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UnO1xuXG4vLyBDaGlsZCBhcHAgcGVyZm9ybWFuY2UgbW9uaXRvcmluZyB0b29sc1xuaW50ZXJmYWNlIFBlcmZvcm1hbmNlRGF0YSB7XG4gIHJlc291cmNlTG9hZFRpbWU6IG51bWJlcjtcbiAgYmxhbmtTY3JlZW5UaW1lOiBudW1iZXI7XG4gIGZpcnN0U2NyZWVuVGltZTogbnVtYmVyO1xuICBpc0ZpcnN0UmVuZGVyOiBib29sZWFuO1xuICBlbnRyeTogc3RyaW5nO1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIENhbGxiYWNrRnVuY3Rpb24ge1xuICAocGVyZm9ybWFuY2VEYXRhOiBQZXJmb3JtYW5jZURhdGEpOiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgQ29uZmlnIHtcbiAgYXR0cmlidXRlczogYm9vbGVhbjtcbiAgY2hpbGRMaXN0OiBib29sZWFuO1xuICBzdWJ0cmVlOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSU9wdGlvbnMge1xuICBzdWJBcHBSb290U2VsZWN0b3I6IGludGVyZmFjZXMuRG9tR2V0dGVyO1xuICBkb21PYnNlcnZlck1heFRpbWU/OiBudW1iZXI7XG4gIHdhaXRTdWJBcHBOb3RpZnlNYXhUaW1lPzogbnVtYmVyO1xuICBvYnNlcnZlQ29uZmlnPzogQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgU3ViQXBwT2JzZXJ2ZXIge1xuICBwcml2YXRlIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICBwcml2YXRlIHRpbWVMYWc6IG51bWJlcjtcbiAgcHJpdmF0ZSByZXBvcnRUaW1lTGFnOiBudW1iZXI7XG4gIHByaXZhdGUgb2JzZXJ2ZVRpbWVyOiBudW1iZXI7XG4gIHByaXZhdGUgZGF0YVRpbWVyOiBudW1iZXI7XG4gIHByaXZhdGUgZW50cnk6IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJBcHBCZWZvcmVMb2FkVGltZTogbnVtYmVyO1xuICBwcml2YXRlIHN1YkFwcEJlZm9yZU1vdW50VGltZTogbnVtYmVyO1xuICBwcml2YXRlIHN1YkFwcFN0YXJ0UGFnZVNob3dUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgc3ViQXBwUGFnZVNob3dUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgZG9tUXVlcnlTZWxlY3RvcjogaW50ZXJmYWNlcy5Eb21HZXR0ZXI7XG4gIHByaXZhdGUgZmluaXNoQWN0aW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgY29uZmlnOiBDb25maWc7XG4gIHByaXZhdGUgaXNSZWNvcmRGaW5pc2g6IGJvb2xlYW47XG4gIHByaXZhdGUgaXNDYWxsQmFja0ZpbmlzaDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpc1N0YXJ0U2hvd0ZsYWc6IGJvb2xlYW47XG4gIHByaXZhdGUgaXNTdWJBcHBOb3RpZnlGaW5pc2g6IGJvb2xlYW47XG4gIHByaXZhdGUgdGFyZ2V0U3Vic2NyaWJlcjogQ2FsbGJhY2tGdW5jdGlvbltdO1xuICBwcml2YXRlIGNiRW50cnlMaXN0OiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBwZXJmb3JtYW5jZURhdGE6IFBlcmZvcm1hbmNlRGF0YTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICAgIHRoaXMuX211dGF0aW9uT2JzZXJ2ZXJDYWxsYmFjay5iaW5kKHRoaXMpLFxuICAgICk7XG4gICAgdGhpcy5zdWJBcHBCZWZvcmVMb2FkVGltZSA9IDA7XG4gICAgdGhpcy5zdWJBcHBCZWZvcmVNb3VudFRpbWUgPSAwO1xuICAgIHRoaXMuc3ViQXBwU3RhcnRQYWdlU2hvd1RpbWUgPSAwO1xuICAgIHRoaXMuc3ViQXBwUGFnZVNob3dUaW1lID0gMDtcbiAgICB0aGlzLmVudHJ5ID0gJyc7XG4gICAgdGhpcy5vYnNlcnZlVGltZXIgPSAwO1xuICAgIHRoaXMuZGF0YVRpbWVyID0gMDtcbiAgICB0aGlzLmRvbVF1ZXJ5U2VsZWN0b3IgPSBvcHRpb25zLnN1YkFwcFJvb3RTZWxlY3RvcjtcbiAgICB0aGlzLmNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgdGhpcy50YXJnZXRTdWJzY3JpYmVyID0gW107XG4gICAgdGhpcy50aW1lTGFnID0gb3B0aW9ucy5kb21PYnNlcnZlck1heFRpbWUgfHwgMzAwMDtcbiAgICB0aGlzLnJlcG9ydFRpbWVMYWcgPSBvcHRpb25zLndhaXRTdWJBcHBOb3RpZnlNYXhUaW1lIHx8IDEwMDAwO1xuICAgIHRoaXMuaXNSZWNvcmRGaW5pc2ggPSBmYWxzZTtcbiAgICB0aGlzLmNiRW50cnlMaXN0ID0gW107XG4gICAgdGhpcy5pc1N0YXJ0U2hvd0ZsYWcgPSB0cnVlO1xuICAgIHRoaXMuaXNDYWxsQmFja0ZpbmlzaCA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdWJBcHBOb3RpZnlGaW5pc2ggPSBmYWxzZTtcbiAgICB0aGlzLmZpbmlzaEFjdGlvbiA9ICcnO1xuICAgIHRoaXMucGVyZm9ybWFuY2VEYXRhID0ge1xuICAgICAgcmVzb3VyY2VMb2FkVGltZTogMCxcbiAgICAgIGJsYW5rU2NyZWVuVGltZTogMCxcbiAgICAgIGZpcnN0U2NyZWVuVGltZTogMCxcbiAgICAgIGlzRmlyc3RSZW5kZXI6IHRydWUsXG4gICAgICBlbnRyeTogJycsXG4gICAgICBhY3Rpb246ICcnLFxuICAgIH07XG4gIH1cblxuICBzdWJzY3JpYmVQZXJmb3JtYW5jZURhdGEoY2FsbGJhY2s6IENhbGxiYWNrRnVuY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50YXJnZXRTdWJzY3JpYmVyLnB1c2goY2FsbGJhY2spO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHdhcm4oZSk7XG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlUGVyZm9ybWFuY2VEYXRhT25jZShjYWxsYmFjazogQ2FsbGJhY2tGdW5jdGlvbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB3cmFwQ2FsbGJhY2sgPSAocGVyZm9ybWFuY2VEYXRhKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHBlcmZvcm1hbmNlRGF0YSk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVQZXJmb3JtYW5jZURhdGEod3JhcENhbGxiYWNrKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudGFyZ2V0U3Vic2NyaWJlci5wdXNoKHdyYXBDYWxsYmFjayk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2FybihlKTtcbiAgICB9XG4gIH1cblxuICB1bnN1YnNjcmliZVBlcmZvcm1hbmNlRGF0YShjYWxsYmFjazogQ2FsbGJhY2tGdW5jdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnRhcmdldFN1YnNjcmliZXIgPSB0aGlzLnRhcmdldFN1YnNjcmliZXIuZmlsdGVyKFxuICAgICAgICAoc3ViKSA9PiBzdWIgPT09IGNhbGxiYWNrLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuKGUpO1xuICAgIH1cbiAgfVxuXG4gIHN1YkFwcEJlZm9yZUxvYWQoZW50cnk6IHN0cmluZykge1xuICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICB0aGlzLmlzUmVjb3JkRmluaXNoID0gZmFsc2U7XG4gICAgdGhpcy5pc1N1YkFwcE5vdGlmeUZpbmlzaCA9IGZhbHNlO1xuICAgIHRoaXMuc3ViQXBwQmVmb3JlTG9hZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLmlzQ2FsbEJhY2tGaW5pc2ggPSBmYWxzZTtcbiAgICB0aGlzLl9oYW5kbGVTdWJzY3JpYmVDYWxsYmFjayhmYWxzZSk7XG4gIH1cblxuICBzdWJBcHBCZWZvcmVNb3VudCgpIHtcbiAgICB0aGlzLnN1YkFwcEJlZm9yZU1vdW50VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHRoaXMuX3N1YkFwcFN0YXJ0T2JzZXJ2ZXIoKTtcbiAgfVxuXG4gIHN1YkFwcFVubW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLmlzUmVjb3JkRmluaXNoKSB7XG4gICAgICB0aGlzLl9zdWJBcHBFbmRPYnNlcnZlcignc3ViQXBwVW5tb3VudCcpO1xuICAgIH1cbiAgICB0aGlzLl9oYW5kbGVTdWJzY3JpYmVDYWxsYmFjayh0cnVlKTtcbiAgfVxuXG4gIC8vIFRoZSBjaGlsZCBhcHAgYWN0aXZlbHkgbm90aWZpZXMgdGhlIGZpcnN0IHNjcmVlbiBsb2FkaW5nIGlzIGNvbXBsZXRlXG4gIGFmdGVyUmVuZGVyTm90aWZ5KCkge1xuICAgIGlmICghdGhpcy5pc1JlY29yZEZpbmlzaCkge1xuICAgICAgLy8gSWYgdGhlIG1vbml0b3JpbmcgcmVuZGVyaW5nIGhhcyBub3QgZW5kZWQsIGFjdGl2ZWx5IHN0b3AgdGhlIG9ic2VydmF0aW9uIGFuZCBwcm9jZXNzIHRoZSBkYXRhXG4gICAgICB0aGlzLl9zdWJBcHBFbmRPYnNlcnZlcignU3ViQXBwUmVuZGVyTm90aWZ5Jyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1N1YkFwcE5vdGlmeUZpbmlzaCkge1xuICAgICAgLy8gSWYgdGhlIG1vbml0b3JpbmcgcmVuZGVyaW5nIGhhcyBlbmRlZCwgYWN0aXZlbHkgdXBkYXRlIHRoZSBwcm9jZXNzZWQgZGF0YVxuICAgICAgdGhpcy5pc1N1YkFwcE5vdGlmeUZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLmlzUmVjb3JkRmluaXNoID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmluaXNoQWN0aW9uID0gJ1N1YkFwcFJlbmRlck5vdGlmeSc7XG4gICAgICB0aGlzLl9zdWJBcHBQZXJmb3JtYW5jZURhdGFIYW5kbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9tdXRhdGlvbk9ic2VydmVyQ2FsbGJhY2soKSB7XG4gICAgLy8gU3RhcnQgcmVuZGVyaW5nIGVsZW1lbnRzIGluIHRoZSBjaGlsZCBhcHAgY29udGFpbmVyIHRvIHJlY29yZCB0aGUgZG90XG4gICAgaWYgKHRoaXMuaXNTdGFydFNob3dGbGFnKSB7XG4gICAgICB0aGlzLnN1YkFwcFN0YXJ0UGFnZVNob3dUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICB0aGlzLmlzU3RhcnRTaG93RmxhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRoZSByZW5kZXJpbmcgZWxlbWVudHMgaW4gdGhlIGNoaWxkIGFwcCBjb250YWluZXIgbm8gbG9uZ2VyIGNoYW5nZSBmb3IgYSBjZXJ0YWluIHBlcmlvZCBvZiB0aW1lXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMub2JzZXJ2ZVRpbWVyKTtcbiAgICB0aGlzLm9ic2VydmVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMub2JzZXJ2ZVRpbWVyKTtcbiAgICAgIGlmICghdGhpcy5pc1JlY29yZEZpbmlzaCkge1xuICAgICAgICB0aGlzLl9zdWJBcHBFbmRPYnNlcnZlcignTXV0YXRpb25PYnNlcnZlcicpO1xuICAgICAgfVxuICAgIH0sIHRoaXMudGltZUxhZykgYXMgdW5rbm93biBhcyBudW1iZXI7XG4gIH1cblxuICBwcml2YXRlIF9zdWJBcHBFbmRPYnNlcnZlcihmaW5pc2hBY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMuaXNSZWNvcmRGaW5pc2ggPSB0cnVlO1xuICAgIHRoaXMuZmluaXNoQWN0aW9uID0gZmluaXNoQWN0aW9uO1xuICAgIHRoaXMuc3ViQXBwUGFnZVNob3dUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5fc3ViQXBwUGVyZm9ybWFuY2VEYXRhSGFuZGxlKCk7XG4gICAgdGhpcy5pc1N0YXJ0U2hvd0ZsYWcgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfc3ViQXBwU3RhcnRPYnNlcnZlcigpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGF3YWl0IGdldFJlbmRlck5vZGUodGhpcy5kb21RdWVyeVNlbGVjdG9yKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLl9zdWJBcHBDbGlja0V2ZW50T2JzZXJ2ZXIodGFyZ2V0Tm9kZSBhcyBIVE1MRWxlbWVudCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2FybihlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zdWJBcHBQZXJmb3JtYW5jZURhdGFIYW5kbGUoKSB7XG4gICAgY29uc3QgdGltZURpZmZlcmVuY2UgPVxuICAgICAgdGhpcy5maW5pc2hBY3Rpb24gPT09ICdNdXRhdGlvbk9ic2VydmVyJyA/IHRoaXMudGltZUxhZyA6IDA7XG4gICAgdGhpcy5wZXJmb3JtYW5jZURhdGEgPSB7XG4gICAgICByZXNvdXJjZUxvYWRUaW1lOiB0aGlzLnN1YkFwcEJlZm9yZU1vdW50VGltZSAtIHRoaXMuc3ViQXBwQmVmb3JlTG9hZFRpbWUsXG4gICAgICBibGFua1NjcmVlblRpbWU6IHRoaXMuc3ViQXBwU3RhcnRQYWdlU2hvd1RpbWUgLSB0aGlzLnN1YkFwcEJlZm9yZUxvYWRUaW1lLFxuICAgICAgZmlyc3RTY3JlZW5UaW1lOlxuICAgICAgICB0aGlzLnN1YkFwcFBhZ2VTaG93VGltZSAtIHRoaXMuc3ViQXBwQmVmb3JlTG9hZFRpbWUgLSB0aW1lRGlmZmVyZW5jZSxcbiAgICAgIGlzRmlyc3RSZW5kZXI6IHRoaXMuY2JFbnRyeUxpc3QuaW5kZXhPZih0aGlzLmVudHJ5KSA9PT0gLTEsXG4gICAgICBlbnRyeTogdGhpcy5lbnRyeSxcbiAgICAgIGFjdGlvbjogdGhpcy5maW5pc2hBY3Rpb24sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YkFwcENsaWNrRXZlbnRPYnNlcnZlcih0YXJnZXROb2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGV2ZW50Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5vYnNlcnZlVGltZXIpO1xuICAgICAgaWYgKCF0aGlzLmlzUmVjb3JkRmluaXNoKSB7XG4gICAgICAgIHRoaXMuX3N1YkFwcEVuZE9ic2VydmVyKCdVc2VyRXZlbnQnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRhcmdldE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudENhbGxiYWNrKTtcbiAgICB0YXJnZXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnRDYWxsYmFjayk7XG4gICAgdGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRDYWxsYmFjayk7XG4gICAgdGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGV2ZW50Q2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2FsbGJhY2soKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaXNDYWxsQmFja0ZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLnRhcmdldFN1YnNjcmliZXIuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGZpcnN0U2NyZWVuVGltZSxcbiAgICAgICAgICBibGFua1NjcmVlblRpbWUsXG4gICAgICAgICAgcmVzb3VyY2VMb2FkVGltZSxcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgZW50cnksXG4gICAgICAgIH0gPSB0aGlzLnBlcmZvcm1hbmNlRGF0YTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGZpcnN0U2NyZWVuVGltZSA+IDAgJiZcbiAgICAgICAgICBibGFua1NjcmVlblRpbWUgPiAwICYmXG4gICAgICAgICAgcmVzb3VyY2VMb2FkVGltZSA+IDAgJiZcbiAgICAgICAgICBhY3Rpb24gJiZcbiAgICAgICAgICBlbnRyeVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU1VDQ0VTUzogJywgdGhpcy5wZXJmb3JtYW5jZURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNiRW50cnlMaXN0LnB1c2godGhpcy5lbnRyeSk7XG4gICAgICAgICAgY2FsbGJhY2sodGhpcy5wZXJmb3JtYW5jZURhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFUlJPUjogJywgdGhpcy5wZXJmb3JtYW5jZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuKGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVN1YnNjcmliZUNhbGxiYWNrKGlzSW1tZWRpYXRlbHk6IGJvb2xlYW4pIHtcbiAgICB0cnkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGF0YVRpbWVyKTtcbiAgICAgIGlmIChpc0ltbWVkaWF0ZWx5ICYmICF0aGlzLmlzQ2FsbEJhY2tGaW5pc2gpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FsbGJhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF0YVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlQ2FsbGJhY2soKTtcbiAgICAgICAgfSwgdGhpcy5yZXBvcnRUaW1lTGFnKSBhcyB1bmtub3duIGFzIG51bWJlcjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuKGUpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IGdldFJlbmRlck5vZGUgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xuaW1wb3J0IHsgU3ViQXBwT2JzZXJ2ZXIgfSBmcm9tICcuL3N1YkFwcE9ic2VydmVyJztcblxuLy8gS2V5IG5vZGVzIGluIEdhcmZpc2ggY29ycmVzcG9uZGluZyB0byB0aGUgbGlmZSBjeWNsZSBvZiByZWdpc3RyYXRpb25cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoUGVyZm9ybWFuY2UoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKTogaW50ZXJmYWNlcy5QbHVnaW4ge1xuICAgIGNvbnN0IHN1YkFwcE1hcCA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncGVyZm9ybWFuY2UnLFxuXG4gICAgICBiZWZvcmVMb2FkKGFwcEluZm8pIHtcbiAgICAgICAgaWYgKCFzdWJBcHBNYXBbYXBwSW5mby5uYW1lXSAmJiBhcHBJbmZvLmRvbUdldHRlcikge1xuICAgICAgICAgIHN1YkFwcE1hcFthcHBJbmZvLm5hbWVdID0gbmV3IFN1YkFwcE9ic2VydmVyKHtcbiAgICAgICAgICAgIHN1YkFwcFJvb3RTZWxlY3RvcjogYXBwSW5mby5kb21HZXR0ZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3ViQXBwTWFwW2FwcEluZm8ubmFtZV0uc3ViQXBwQmVmb3JlTG9hZChhcHBJbmZvLmVudHJ5KTtcbiAgICAgIH0sXG5cbiAgICAgIGFmdGVyTG9hZChhcHBJbmZvLCBhcHBJbnN0YW5jZTogaW50ZXJmYWNlcy5BcHApIHtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgYXBwSW5zdGFuY2UuYXBwUGVyZm9ybWFuY2UgPSBzdWJBcHBNYXBbYXBwSW5mby5uYW1lXSBhcyBhbnk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZU1vdW50KGFwcEluZm8pIHtcbiAgICAgICAgc3ViQXBwTWFwW2FwcEluZm8ubmFtZV0uc3ViQXBwQmVmb3JlTW91bnQoYXBwSW5mby5lbnRyeSk7XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50KGFwcEluZm8pIHtcbiAgICAgICAgc3ViQXBwTWFwW2FwcEluZm8ubmFtZV0uc3ViQXBwVW5tb3VudChhcHBJbmZvLmVudHJ5KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjb3JlTG9nIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoTG9nZ2VyKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCk6IGludGVyZmFjZXMuUGx1Z2luIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ2dhcmZpc2gtbG9nZ2VyJyxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuICAgICAgYmVmb3JlTG9hZChhcHBJbmZvLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBiZWZvcmVMb2FkYCwgW2FwcEluZm8sIC4uLmFyZ3NdKTtcbiAgICAgIH0sXG4gICAgICBhZnRlckxvYWQoYXBwSW5mbywgYXBwSW5zdGFuY2UsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgY29yZUxvZyhgJHthcHBJbmZvLm5hbWV9IGlkOiAke2FwcEluc3RhbmNlLmFwcElkfSBhZnRlckxvYWRgLCBbXG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJlZm9yZU1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBpZDogJHthcHBJbnN0YW5jZS5hcHBJZH0gYmVmb3JlTW91bnRgLCBbXG4gICAgICAgICAgYXBwSW5mbyxcbiAgICAgICAgICAuLi5hcmdzLFxuICAgICAgICBdKTtcbiAgICAgIH0sXG4gICAgICBhZnRlck1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBpZDogJHthcHBJbnN0YW5jZS5hcHBJZH0gYWZ0ZXJNb3VudGAsIFtcbiAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICAgIGJlZm9yZVVubW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29yZUxvZyhgJHthcHBJbmZvLm5hbWV9IGlkOiAke2FwcEluc3RhbmNlLmFwcElkfSBiZWZvcmVVbm1vdW50YCwgW1xuICAgICAgICAgIGFwcEluZm8sXG4gICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgXSk7XG4gICAgICB9LFxuICAgICAgYWZ0ZXJVbm1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBpZDogJHthcHBJbnN0YW5jZS5hcHBJZH0gYWZ0ZXJVbm1vdW50YCwgW1xuICAgICAgICAgIGFwcEluZm8sXG4gICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgXSk7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxxQkFBdUI7QUFDdkIsMkJBQThCO0FBQzlCLG9CQUE4RDtBQUM5RCxvQkFNTzs7O0FDVFAsbUJBTU87QUFLUCxJQUFNLHNCQUdGO0FBQUEsRUFDRixpQkFBaUI7QUFBQSxFQUNqQixXQUFXO0FBQUEsRUFDWCxtQkFBbUI7QUFBQSxFQUNuQixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixtQkFBbUI7QUFBQSxFQUNuQixtQkFBbUI7QUFBQSxFQUNuQixTQUFTO0FBQUEsRUFDVCxnQkFBZ0I7QUFBQSxFQUNoQixrQkFBa0I7QUFBQSxFQUNsQixRQUFRO0FBQUE7QUFJSCxJQUFNLGtCQUFrQixDQUk3QixjQUNBLGdCQUNHO0FBQ0gsUUFBTSxRQUFRLGtDQUNSLGFBQWEsU0FBUyxLQUN0QixZQUFZLFNBQVM7QUFHM0IsUUFBTSxTQUFTLDRCQUNiLHFDQUFtQixlQUNuQixxQ0FBbUI7QUFFckIsU0FBTyxRQUFRO0FBQ2YsU0FBTztBQUFBO0FBR0YsSUFBTSxlQUFlLENBQzFCLGNBQ0EsZ0JBQ1k7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
