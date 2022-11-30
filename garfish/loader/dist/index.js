var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
  CrossOriginCredentials: () => CrossOriginCredentials,
  JavaScriptManager: () => JavaScriptManager,
  Loader: () => Loader,
  ModuleManager: () => ModuleManager,
  StyleManager: () => StyleManager,
  TemplateManager: () => TemplateManager
});
var import_hooks = require("@garfish/hooks");
var import_utils4 = require("@garfish/utils");

// src/managers/style.ts
var import_utils = require("@garfish/utils");
var MATCH_CSS_URL = /url\(\s*(['"])?(.*?)\1\s*\)/g;
var MATCH_CHARSET_URL = /@charset\s+(['"])(.*?)\1\s*;?/g;
var MATCH_IMPORT_URL = /@import\s+(['"])(.*?)\1/g;
var StyleManager = class {
  constructor(styleCode, url) {
    this.depsStack = /* @__PURE__ */ new Set();
    this.scopeData = null;
    this.url = url || null;
    this.styleCode = styleCode;
  }
  correctPath(baseUrl) {
    const { url, styleCode } = this;
    if (!baseUrl)
      baseUrl = url;
    if (baseUrl && typeof styleCode === "string") {
      this.styleCode = styleCode.replace(MATCH_CHARSET_URL, "").replace(MATCH_IMPORT_URL, function(k0, k1, k2) {
        return k2 ? `@import url(${k1}${k2}${k1})` : k0;
      }).replace(MATCH_CSS_URL, (k0, k1, k2) => {
        if ((0, import_utils.isAbsolute)(k2))
          return k0;
        return `url("${baseUrl ? (0, import_utils.transformUrl)(baseUrl, k2) : k2}")`;
      });
    }
  }
  transformCode(code) {
    return code;
  }
  setDep(node) {
    this.depsStack.add(node);
  }
  setScope(data) {
    this.scopeData = data;
  }
  isSameOrigin(node) {
    return this.depsStack.has(node);
  }
  renderAsStyleElement(extraCode = "") {
    const node = document.createElement("style");
    const code = extraCode + (this.styleCode ? this.styleCode : "/**empty style**/");
    node.setAttribute("type", "text/css");
    node.textContent = this.transformCode(code);
    return node;
  }
  clone() {
    const cloned = new this.constructor();
    cloned.url = this.url;
    cloned.styleCode = this.styleCode;
    cloned.scopeData = this.scopeData;
    cloned.depsStack = new Set(this.depsStack);
    return cloned;
  }
};

// src/managers/module.ts
var ModuleManager = class {
  constructor(moduleCode, url) {
    this.alias = null;
    this.url = url || null;
    this.moduleCode = moduleCode;
  }
  setAlias(name) {
    if (name && typeof name === "string") {
      this.alias = name;
    }
  }
  clone() {
    const cloned = new this.constructor();
    cloned.url = this.url;
    cloned.alias = this.alias;
    cloned.moduleCode = this.moduleCode;
    return cloned;
  }
};

// src/managers/template.ts
var import_utils2 = require("@garfish/utils");
var TemplateManager = class {
  constructor(template, url) {
    this.DOMApis = new import_utils2.DOMApis();
    this.astTree = [];
    this.pretreatmentStore = {};
    this.url = url;
    if (template) {
      const [astTree, collectionEls] = (0, import_utils2.templateParse)(template, [
        "meta",
        "link",
        "style",
        "script"
      ]);
      this.astTree = astTree;
      this.pretreatmentStore = collectionEls;
    }
  }
  getNodesByTagName(...tags) {
    let counter = 0;
    const collection = {};
    for (const tag of tags) {
      if (this.pretreatmentStore[tag]) {
        counter++;
        collection[tag] = this.pretreatmentStore[tag];
      } else {
        collection[tag] = [];
      }
    }
    if (counter !== tags.length) {
      const traverse = (node) => {
        if (node.type !== "element")
          return;
        if (tags.indexOf(node.tagName) > -1 && !this.pretreatmentStore[node.tagName]) {
          collection[node.tagName].push(node);
        }
        for (const child of node.children)
          traverse(child);
      };
      for (const node of this.astTree)
        traverse(node);
    }
    return collection;
  }
  createElements(renderer, parent) {
    const elements = [];
    const traverse = (node, parentEl) => {
      let el;
      if (this.DOMApis.isCommentNode(node)) {
      } else if (this.DOMApis.isText(node)) {
        el = this.DOMApis.createTextNode(node);
        parentEl && parentEl.appendChild(el);
      } else if (this.DOMApis.isNode(node)) {
        const { tagName, children } = node;
        if (renderer[tagName]) {
          el = renderer[tagName](node);
        } else {
          el = this.DOMApis.createElement(node);
        }
        if (parentEl && el)
          parentEl.appendChild(el);
        if (el) {
          const { nodeType, _ignoreChildNodes } = el;
          if (!_ignoreChildNodes && nodeType !== 8 && nodeType !== 10) {
            for (const child of children) {
              traverse(child, el);
            }
          }
        }
      }
      return el;
    };
    for (const node of this.astTree) {
      if (this.DOMApis.isNode(node) && node.tagName !== "!doctype") {
        const el = traverse(node, parent);
        el && elements.push(el);
      }
    }
    return elements;
  }
  toResolveUrl(node, type, baseUrl) {
    var _a;
    const src = (_a = node.attributes) == null ? void 0 : _a.find(({ key }) => key === type);
    if (src && src.value && baseUrl) {
      src.value = (0, import_utils2.transformUrl)(baseUrl, src.value);
    }
  }
  ignoreChildNodesCreation(node) {
    if (node) {
      node._ignoreChildNodes = true;
    }
    return node;
  }
  findAllMetaNodes() {
    return this.getNodesByTagName("meta").meta;
  }
  findAllLinkNodes() {
    return this.getNodesByTagName("link").link;
  }
  findAllJsNodes() {
    return this.getNodesByTagName("script").script;
  }
  findAttributeValue(node, type) {
    var _a, _b;
    return ((_b = (_a = node.attributes) == null ? void 0 : _a.find(({ key }) => key === type)) == null ? void 0 : _b.value) || void 0;
  }
  cloneNode(node) {
    return (0, import_utils2.deepMerge)(node, {});
  }
  clone() {
    const cloned = new this.constructor();
    cloned.url = this.url;
    cloned.astTree = this.astTree;
    cloned.pretreatmentStore = this.pretreatmentStore;
    cloned.DOMApis = new import_utils2.DOMApis(this.DOMApis.document);
    return cloned;
  }
};

// src/managers/javascript.ts
var JavaScriptManager = class {
  constructor(scriptCode, url) {
    this.depsStack = /* @__PURE__ */ new Set();
    this.mimeType = "";
    this.async = false;
    this.url = url;
    this.scriptCode = scriptCode;
  }
  isModule() {
    return this.mimeType === "module";
  }
  isInlineScript() {
    return Boolean(!this.url);
  }
  setMimeType(mimeType) {
    this.mimeType = mimeType || "";
  }
  setAsyncAttribute(val) {
    this.async = Boolean(val);
  }
  setDep(node) {
    this.depsStack.add(node);
  }
  isSameOrigin(node) {
    return this.depsStack.has(node);
  }
  clone() {
    const cloned = new this.constructor();
    cloned.url = this.url;
    cloned.async = this.async;
    cloned.mimeType = this.mimeType;
    cloned.scriptCode = this.scriptCode;
    cloned.depsStack = new Set(this.depsStack);
    return cloned;
  }
};

// src/utils.ts
var import_utils3 = require("@garfish/utils");
function getRequest(customFetch) {
  return async function request(url, config) {
    let result = await customFetch.emit(url, config || {});
    if (!result || !(result instanceof Response)) {
      result = await fetch(url, config || {});
    }
    if (result.status >= 400) {
      (0, import_utils3.error)(`"${url}" load failed with status "${result.status}"`);
    }
    const code = await result.text();
    const type = result.headers.get("content-type") || "";
    const size = Number(result.headers.get("content-size"));
    const mimeType = (0, import_utils3.parseContentType)(type || "");
    return {
      code,
      result,
      mimeType,
      type,
      size: Number.isNaN(size) ? null : size
    };
  };
}
function copyResult(result) {
  if (result.resourceManager) {
    result.resourceManager = result.resourceManager.clone();
  }
  return result;
}
function mergeConfig(loader, url) {
  const extra = loader.requestConfig;
  const config = typeof extra === "function" ? extra(url) : extra;
  return __spreadValues({ mode: "cors" }, config);
}

// src/appCache.ts
var cachedDataSet = /* @__PURE__ */ new WeakSet();
var MAX_SIZE = 1024 * 1024 * 50;
var DEFAULT_POLL = Symbol("__defaultBufferPoll__");
var FILE_TYPES = [
  "js" /* js */,
  "css" /* css */,
  "module" /* module */,
  "template" /* template */,
  DEFAULT_POLL
];
var AppCacheContainer = class {
  constructor(maxSize = MAX_SIZE) {
    this.totalSize = 0;
    this.recorder = {};
    this.maxSize = maxSize;
    FILE_TYPES.forEach((key) => {
      this.recorder[key] = 0;
      this[key] = /* @__PURE__ */ new Map();
    });
  }
  bufferPool(type) {
    return this[type];
  }
  has(url) {
    return FILE_TYPES.some((key) => this[key].has(url));
  }
  get(url) {
    for (const key of FILE_TYPES) {
      if (this[key].has(url)) {
        return this[key].get(url);
      }
    }
  }
  set(url, data, type) {
    const curSize = cachedDataSet.has(data) ? 0 : data.size;
    const totalSize = this.totalSize + curSize;
    if (totalSize < this.maxSize) {
      let bar = type;
      let bufferPool = this.bufferPool(type);
      if (!bufferPool) {
        bar = DEFAULT_POLL;
        bufferPool = this.bufferPool(DEFAULT_POLL);
      }
      bufferPool.set(url, data);
      this.totalSize = totalSize;
      this.recorder[bar] += curSize;
      return true;
    }
    return false;
  }
  clear(type) {
    if (typeof type === "string") {
      const cacheBox = this.bufferPool(type);
      if (cacheBox && cacheBox instanceof Map) {
        const size = this.recorder[type];
        this.totalSize -= size;
        this.recorder[type] = 0;
        cacheBox.clear();
      }
    } else {
      FILE_TYPES.forEach((key) => {
        this[key].clear();
        this.recorder[key] = 0;
      });
      this.totalSize = 0;
    }
  }
};

// src/index.ts
var CrossOriginCredentials = /* @__PURE__ */ ((CrossOriginCredentials2) => {
  CrossOriginCredentials2["anonymous"] = "same-origin";
  CrossOriginCredentials2["use-credentials"] = "include";
  return CrossOriginCredentials2;
})(CrossOriginCredentials || {});
var Loader = class {
  constructor(options) {
    this.personalId = import_utils4.__LOADER_FLAG__;
    this.StyleManager = StyleManager;
    this.ModuleManager = ModuleManager;
    this.TemplateManager = TemplateManager;
    this.JavaScriptManager = JavaScriptManager;
    this.hooks = new import_hooks.PluginSystem({
      error: new import_hooks.SyncHook(),
      loaded: new import_hooks.SyncWaterfallHook("loaded"),
      clear: new import_hooks.SyncWaterfallHook("clear"),
      beforeLoad: new import_hooks.SyncWaterfallHook("beforeLoad"),
      fetch: new import_hooks.AsyncHook("fetch")
    });
    this.options = options || {};
    this.loadingList = /* @__PURE__ */ Object.create(null);
    this.cacheStore = /* @__PURE__ */ Object.create(null);
  }
  setOptions(options) {
    this.options = __spreadValues(__spreadValues({}, this.options), options);
  }
  clear(scope, fileType) {
    const appCacheContainer = this.cacheStore[scope];
    if (appCacheContainer) {
      appCacheContainer.clear(fileType);
      this.hooks.lifecycle.clear.emit({ scope, fileType });
    }
  }
  clearAll(fileType) {
    for (const scope in this.cacheStore) {
      this.clear(scope, fileType);
    }
  }
  usePlugin(options) {
    this.hooks.usePlugin(options);
  }
  setLifeCycle(lifeCycle) {
    this.hooks.usePlugin(__spreadValues({
      name: "loader-lifecycle"
    }, lifeCycle));
  }
  loadModule(url) {
    return this.load({
      scope: "modules",
      url,
      isRemoteModule: true
    });
  }
  async load({
    scope,
    url,
    isRemoteModule = false,
    crossOrigin = "anonymous",
    defaultContentType = ""
  }) {
    const { options, loadingList, cacheStore } = this;
    const res = loadingList[url];
    if (res) {
      return res;
    }
    let appCacheContainer = cacheStore[scope];
    if (!appCacheContainer) {
      appCacheContainer = cacheStore[scope] = new AppCacheContainer(options.maxSize);
    }
    if (appCacheContainer.has(url)) {
      return Promise.resolve(copyResult(appCacheContainer.get(url)));
    } else {
      for (const key in cacheStore) {
        const container = cacheStore[key];
        if (container !== appCacheContainer) {
          if (container.has(url)) {
            const result = container.get(url);
            cachedDataSet.add(result);
            appCacheContainer.set(url, result, result.fileType);
            return Promise.resolve(copyResult(result));
          }
        }
      }
    }
    const requestConfig = mergeConfig(this, url);
    requestConfig.credentials = CrossOriginCredentials[crossOrigin];
    const resOpts = this.hooks.lifecycle.beforeLoad.emit({
      url,
      scope,
      requestConfig
    });
    const request = getRequest(this.hooks.lifecycle.fetch);
    const loadRes = request(resOpts.url, resOpts.requestConfig).then(({ code, size, result, type }) => {
      let managerCtor, fileType = "";
      if (isRemoteModule) {
        fileType = "module" /* module */;
        managerCtor = ModuleManager;
      } else if ((0, import_utils4.isHtmlType)({ type, src: result.url }) || (0, import_utils4.isHtmlType)({
        type: defaultContentType
      })) {
        fileType = "template" /* template */;
        managerCtor = TemplateManager;
      } else if ((0, import_utils4.isJsType)({ type: defaultContentType }) || (0, import_utils4.isJsType)({ type, src: result.url })) {
        fileType = "js" /* js */;
        managerCtor = JavaScriptManager;
      } else if ((0, import_utils4.isCssType)({ src: result.url, type }) || (0, import_utils4.isCssType)({
        type: defaultContentType
      })) {
        fileType = "css" /* css */;
        managerCtor = StyleManager;
      }
      const resourceManager = managerCtor ? new managerCtor(code, result.url) : null;
      const data = this.hooks.lifecycle.loaded.emit({
        result,
        value: {
          url,
          scope,
          resourceManager,
          fileType: fileType || "",
          size: size || code.length,
          code: resourceManager ? "" : code
        }
      });
      fileType && appCacheContainer.set(url, data.value, fileType);
      return copyResult(data.value);
    }).catch((e) => {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils4.error)(e);
      this.hooks.lifecycle.error.emit(e, { scope });
      throw e;
    }).finally(() => {
      loadingList[url] = null;
    });
    loadingList[url] = loadRes;
    return loadRes;
  }
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrossOriginCredentials,
  JavaScriptManager,
  Loader,
  ModuleManager,
  StyleManager,
  TemplateManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9tYW5hZ2Vycy9zdHlsZS50cyIsICIuLi9zcmMvbWFuYWdlcnMvbW9kdWxlLnRzIiwgIi4uL3NyYy9tYW5hZ2Vycy90ZW1wbGF0ZS50cyIsICIuLi9zcmMvbWFuYWdlcnMvamF2YXNjcmlwdC50cyIsICIuLi9zcmMvdXRpbHMudHMiLCAiLi4vc3JjL2FwcENhY2hlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xuICBTeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIFBsdWdpblN5c3RlbSxcbiAgQXN5bmNIb29rLFxufSBmcm9tICdAZ2FyZmlzaC9ob29rcyc7XG5pbXBvcnQge1xuICBlcnJvcixcbiAgX19MT0FERVJfRkxBR19fLFxuICBpc0pzVHlwZSxcbiAgaXNDc3NUeXBlLFxuICBpc0h0bWxUeXBlLFxuICBwYXJzZUNvbnRlbnRUeXBlLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTdHlsZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL3N0eWxlJztcbmltcG9ydCB7IE1vZHVsZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL21vZHVsZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL3RlbXBsYXRlJztcbmltcG9ydCB7IEphdmFTY3JpcHRNYW5hZ2VyIH0gZnJvbSAnLi9tYW5hZ2Vycy9qYXZhc2NyaXB0JztcbmltcG9ydCB7IGdldFJlcXVlc3QsIGNvcHlSZXN1bHQsIG1lcmdlQ29uZmlnIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBGaWxlVHlwZXMsIGNhY2hlZERhdGFTZXQsIEFwcENhY2hlQ29udGFpbmVyIH0gZnJvbSAnLi9hcHBDYWNoZSc7XG5cbi8vIEV4cG9ydCB0eXBlcyBhbmQgbWFuYWdlciBjb25zdHJ1Y3RvclxuZXhwb3J0ICogZnJvbSAnLi9tYW5hZ2Vycy9zdHlsZSc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXJzL21vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXJzL3RlbXBsYXRlJztcbmV4cG9ydCAqIGZyb20gJy4vbWFuYWdlcnMvamF2YXNjcmlwdCc7XG5cbmV4cG9ydCB0eXBlIE1hbmFnZXIgPVxuICB8IFN0eWxlTWFuYWdlclxuICB8IE1vZHVsZU1hbmFnZXJcbiAgfCBUZW1wbGF0ZU1hbmFnZXJcbiAgfCBKYXZhU2NyaXB0TWFuYWdlcjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSB1bml0IGlzIGJ5dGVcbiAgICovXG4gIG1heFNpemU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVWYWx1ZTxUIGV4dGVuZHMgTWFuYWdlcj4ge1xuICB1cmw6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIGZpbGVUeXBlOiBGaWxlVHlwZXMgfCAnJztcbiAgcmVzb3VyY2VNYW5hZ2VyOiBUIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRIb29rQXJnczxUIGV4dGVuZHMgTWFuYWdlcj4ge1xuICByZXN1bHQ6IFJlc3BvbnNlO1xuICB2YWx1ZTogQ2FjaGVWYWx1ZTxUPjtcbn1cblxuZXhwb3J0IGVudW0gQ3Jvc3NPcmlnaW5DcmVkZW50aWFscyB7XG4gIGFub255bW91cyA9ICdzYW1lLW9yaWdpbicsXG4gICd1c2UtY3JlZGVudGlhbHMnID0gJ2luY2x1ZGUnLFxufVxuXG50eXBlIExpZmVDeWNsZSA9IExvYWRlclsnaG9va3MnXVsnbGlmZWN5Y2xlJ107XG5cbmV4cG9ydCB0eXBlIExvYWRlckxpZmVjeWNsZSA9IFBhcnRpYWw8e1xuICBbayBpbiBrZXlvZiBMaWZlQ3ljbGVdOiBQYXJhbWV0ZXJzPExpZmVDeWNsZVtrXVsnb24nXT5bMF07XG59PjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZXJQbHVnaW4gZXh0ZW5kcyBMb2FkZXJMaWZlY3ljbGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIge1xuICBwdWJsaWMgcGVyc29uYWxJZCA9IF9fTE9BREVSX0ZMQUdfXztcbiAgcHVibGljIFN0eWxlTWFuYWdlciA9IFN0eWxlTWFuYWdlcjtcbiAgcHVibGljIE1vZHVsZU1hbmFnZXIgPSBNb2R1bGVNYW5hZ2VyO1xuICBwdWJsaWMgVGVtcGxhdGVNYW5hZ2VyID0gVGVtcGxhdGVNYW5hZ2VyO1xuICBwdWJsaWMgSmF2YVNjcmlwdE1hbmFnZXIgPSBKYXZhU2NyaXB0TWFuYWdlcjtcbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIHB1YmxpYyByZXF1ZXN0Q29uZmlnOiBSZXF1ZXN0SW5pdCB8ICgodXJsOiBzdHJpbmcpID0+IFJlcXVlc3RJbml0KTtcblxuICBwdWJsaWMgaG9va3MgPSBuZXcgUGx1Z2luU3lzdGVtKHtcbiAgICBlcnJvcjogbmV3IFN5bmNIb29rPFtFcnJvciwgeyBzY29wZTogc3RyaW5nIH1dLCB2b2lkPigpLFxuICAgIGxvYWRlZDogbmV3IFN5bmNXYXRlcmZhbGxIb29rPExvYWRlZEhvb2tBcmdzPE1hbmFnZXI+PignbG9hZGVkJyksXG4gICAgY2xlYXI6IG5ldyBTeW5jV2F0ZXJmYWxsSG9vazx7XG4gICAgICBzY29wZTogc3RyaW5nO1xuICAgICAgZmlsZVR5cGU/OiBGaWxlVHlwZXM7XG4gICAgfT4oJ2NsZWFyJyksXG4gICAgYmVmb3JlTG9hZDogbmV3IFN5bmNXYXRlcmZhbGxIb29rPHtcbiAgICAgIHVybDogc3RyaW5nO1xuICAgICAgc2NvcGU6IHN0cmluZztcbiAgICAgIHJlcXVlc3RDb25maWc6IFJlc3BvbnNlSW5pdDtcbiAgICB9PignYmVmb3JlTG9hZCcpLFxuICAgIGZldGNoOiBuZXcgQXN5bmNIb29rPFtzdHJpbmcsIFJlcXVlc3RJbml0XSwgUmVzcG9uc2UgfCB2b2lkIHwgZmFsc2U+KFxuICAgICAgJ2ZldGNoJyxcbiAgICApLFxuICB9KTtcblxuICBwcml2YXRlIG9wdGlvbnM6IExvYWRlck9wdGlvbnM7XG4gIHByaXZhdGUgbG9hZGluZ0xpc3Q6IFJlY29yZDxzdHJpbmcsIG51bGwgfCBQcm9taXNlPENhY2hlVmFsdWU8YW55Pj4+O1xuICBwcml2YXRlIGNhY2hlU3RvcmU6IHsgW25hbWU6IHN0cmluZ106IEFwcENhY2hlQ29udGFpbmVyIH07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IExvYWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMubG9hZGluZ0xpc3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuY2FjaGVTdG9yZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBhcnRpYWw8TG9hZGVyT3B0aW9ucz4pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICB9XG5cbiAgY2xlYXIoc2NvcGU6IHN0cmluZywgZmlsZVR5cGU/OiBGaWxlVHlwZXMpIHtcbiAgICBjb25zdCBhcHBDYWNoZUNvbnRhaW5lciA9IHRoaXMuY2FjaGVTdG9yZVtzY29wZV07XG4gICAgaWYgKGFwcENhY2hlQ29udGFpbmVyKSB7XG4gICAgICBhcHBDYWNoZUNvbnRhaW5lci5jbGVhcihmaWxlVHlwZSk7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5jbGVhci5lbWl0KHsgc2NvcGUsIGZpbGVUeXBlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQWxsKGZpbGVUeXBlPzogRmlsZVR5cGVzKSB7XG4gICAgZm9yIChjb25zdCBzY29wZSBpbiB0aGlzLmNhY2hlU3RvcmUpIHtcbiAgICAgIHRoaXMuY2xlYXIoc2NvcGUsIGZpbGVUeXBlKTtcbiAgICB9XG4gIH1cblxuICB1c2VQbHVnaW4ob3B0aW9uczogTG9hZGVyUGx1Z2luKSB7XG4gICAgdGhpcy5ob29rcy51c2VQbHVnaW4ob3B0aW9ucyk7XG4gIH1cblxuICBzZXRMaWZlQ3ljbGUobGlmZUN5Y2xlOiBQYXJ0aWFsPExvYWRlckxpZmVjeWNsZT4pIHtcbiAgICB0aGlzLmhvb2tzLnVzZVBsdWdpbih7XG4gICAgICBuYW1lOiAnbG9hZGVyLWxpZmVjeWNsZScsXG4gICAgICAuLi5saWZlQ3ljbGUsXG4gICAgfSk7XG4gIH1cblxuICBsb2FkTW9kdWxlKHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZDxNb2R1bGVNYW5hZ2VyPih7XG4gICAgICBzY29wZTogJ21vZHVsZXMnLFxuICAgICAgdXJsLFxuICAgICAgaXNSZW1vdGVNb2R1bGU6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmFibGUgdG8ga25vdyB0aGUgZmluYWwgZGF0YSB0eXBlLCBzbyB0aHJvdWdoIFwiZ2VuZXJpY3NcIlxuICBhc3luYyBsb2FkPFQgZXh0ZW5kcyBNYW5hZ2VyPih7XG4gICAgc2NvcGUsXG4gICAgdXJsLFxuICAgIGlzUmVtb3RlTW9kdWxlID0gZmFsc2UsXG4gICAgY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJyxcbiAgICBkZWZhdWx0Q29udGVudFR5cGUgPSAnJyxcbiAgfToge1xuICAgIHNjb3BlOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaXNSZW1vdGVNb2R1bGU/OiBib29sZWFuO1xuICAgIGNyb3NzT3JpZ2luPzogTm9uTnVsbGFibGU8SFRNTFNjcmlwdEVsZW1lbnRbJ2Nyb3NzT3JpZ2luJ10+O1xuICAgIGRlZmF1bHRDb250ZW50VHlwZT86IHN0cmluZztcbiAgfSk6IFByb21pc2U8TG9hZGVkSG9va0FyZ3M8VD5bJ3ZhbHVlJ10+IHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGxvYWRpbmdMaXN0LCBjYWNoZVN0b3JlIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcmVzID0gbG9hZGluZ0xpc3RbdXJsXTtcbiAgICBpZiAocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGxldCBhcHBDYWNoZUNvbnRhaW5lciA9IGNhY2hlU3RvcmVbc2NvcGVdO1xuICAgIGlmICghYXBwQ2FjaGVDb250YWluZXIpIHtcbiAgICAgIGFwcENhY2hlQ29udGFpbmVyID0gY2FjaGVTdG9yZVtzY29wZV0gPSBuZXcgQXBwQ2FjaGVDb250YWluZXIoXG4gICAgICAgIG9wdGlvbnMubWF4U2l6ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGFwcENhY2hlQ29udGFpbmVyLmhhcyh1cmwpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvcHlSZXN1bHQoYXBwQ2FjaGVDb250YWluZXIuZ2V0KHVybCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgb3RoZXIgY29udGFpbmVycyBoYXZlIGNhY2hlXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWNoZVN0b3JlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNhY2hlU3RvcmVba2V5XTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPT0gYXBwQ2FjaGVDb250YWluZXIpIHtcbiAgICAgICAgICBpZiAoY29udGFpbmVyLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb250YWluZXIuZ2V0KHVybCk7XG4gICAgICAgICAgICBjYWNoZWREYXRhU2V0LmFkZChyZXN1bHQpO1xuICAgICAgICAgICAgYXBwQ2FjaGVDb250YWluZXIuc2V0KHVybCwgcmVzdWx0LCByZXN1bHQuZmlsZVR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb3B5UmVzdWx0KHJlc3VsdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RDb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLCB1cmwpO1xuICAgIC8vIFRlbGxzIGJyb3dzZXJzIHRvIGluY2x1ZGUgY3JlZGVudGlhbHMgaW4gYm90aCBzYW1lLSBhbmQgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzLCBhbmQgYWx3YXlzIHVzZSBhbnkgY3JlZGVudGlhbHMgc2VudCBiYWNrIGluIHJlc3BvbnNlcy5cbiAgICByZXF1ZXN0Q29uZmlnLmNyZWRlbnRpYWxzID0gQ3Jvc3NPcmlnaW5DcmVkZW50aWFsc1tjcm9zc09yaWdpbl07XG4gICAgY29uc3QgcmVzT3B0cyA9IHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUxvYWQuZW1pdCh7XG4gICAgICB1cmwsXG4gICAgICBzY29wZSxcbiAgICAgIHJlcXVlc3RDb25maWcsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZ2V0UmVxdWVzdCh0aGlzLmhvb2tzLmxpZmVjeWNsZS5mZXRjaCk7XG4gICAgY29uc3QgbG9hZFJlcyA9IHJlcXVlc3QocmVzT3B0cy51cmwsIHJlc09wdHMucmVxdWVzdENvbmZpZylcbiAgICAgIC50aGVuKCh7IGNvZGUsIHNpemUsIHJlc3VsdCwgdHlwZSB9KSA9PiB7XG4gICAgICAgIGxldCBtYW5hZ2VyQ3RvcixcbiAgICAgICAgICBmaWxlVHlwZTogRmlsZVR5cGVzIHwgJycgPSAnJztcblxuICAgICAgICBpZiAoaXNSZW1vdGVNb2R1bGUpIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy5tb2R1bGU7XG4gICAgICAgICAgbWFuYWdlckN0b3IgPSBNb2R1bGVNYW5hZ2VyO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGlzSHRtbFR5cGUoeyB0eXBlLCBzcmM6IHJlc3VsdC51cmwgfSkgfHxcbiAgICAgICAgICBpc0h0bWxUeXBlKHtcbiAgICAgICAgICAgIHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy50ZW1wbGF0ZTtcbiAgICAgICAgICBtYW5hZ2VyQ3RvciA9IFRlbXBsYXRlTWFuYWdlcjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBpc0pzVHlwZSh7IHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSB9KSB8fFxuICAgICAgICAgIGlzSnNUeXBlKHsgdHlwZSwgc3JjOiByZXN1bHQudXJsIH0pXG4gICAgICAgICkge1xuICAgICAgICAgIGZpbGVUeXBlID0gRmlsZVR5cGVzLmpzO1xuICAgICAgICAgIG1hbmFnZXJDdG9yID0gSmF2YVNjcmlwdE1hbmFnZXI7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgaXNDc3NUeXBlKHsgc3JjOiByZXN1bHQudXJsLCB0eXBlIH0pIHx8XG4gICAgICAgICAgaXNDc3NUeXBlKHtcbiAgICAgICAgICAgIHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy5jc3M7XG4gICAgICAgICAgbWFuYWdlckN0b3IgPSBTdHlsZU1hbmFnZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVc2UgcmVzdWx0LnVybCwgcmVzb3VyY2VzIG1heSBiZSByZWRpcmVjdGVkXG4gICAgICAgIGNvbnN0IHJlc291cmNlTWFuYWdlcjogTWFuYWdlciB8IG51bGwgPSBtYW5hZ2VyQ3RvclxuICAgICAgICAgID8gbmV3IG1hbmFnZXJDdG9yKGNvZGUsIHJlc3VsdC51cmwpXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIC8vIFRoZSByZXN1bHRzIHdpbGwgYmUgY2FjaGVkIHRoaXMgdGltZS5cbiAgICAgICAgLy8gU28sIHlvdSBjYW4gdHJhbnNmb3JtIHRoZSByZXF1ZXN0IHJlc3VsdC5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuaG9va3MubGlmZWN5Y2xlLmxvYWRlZC5lbWl0KHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHNjb3BlLFxuICAgICAgICAgICAgcmVzb3VyY2VNYW5hZ2VyLFxuICAgICAgICAgICAgZmlsZVR5cGU6IGZpbGVUeXBlIHx8ICcnLFxuICAgICAgICAgICAgLy8gRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHRha2UgYW4gYXBwcm94aW1hdGlvblxuICAgICAgICAgICAgc2l6ZTogc2l6ZSB8fCBjb2RlLmxlbmd0aCxcbiAgICAgICAgICAgIGNvZGU6IHJlc291cmNlTWFuYWdlciA/ICcnIDogY29kZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBmaWxlVHlwZSAmJiBhcHBDYWNoZUNvbnRhaW5lci5zZXQodXJsLCBkYXRhLnZhbHVlLCBmaWxlVHlwZSk7XG4gICAgICAgIHJldHVybiBjb3B5UmVzdWx0KGRhdGEudmFsdWUgYXMgYW55KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgZXJyb3IoZSk7XG4gICAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yLmVtaXQoZSwgeyBzY29wZSB9KTtcbiAgICAgICAgdGhyb3cgZTsgLy8gTGV0IHRoZSB1cHBlciBhcHBsaWNhdGlvbiBjYXRjaCB0aGUgZXJyb3JcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGxvYWRpbmdMaXN0W3VybF0gPSBudWxsO1xuICAgICAgfSk7XG5cbiAgICBsb2FkaW5nTGlzdFt1cmxdID0gbG9hZFJlcztcbiAgICByZXR1cm4gbG9hZFJlcztcbiAgfVxufVxuIiwgImltcG9ydCB7IE5vZGUsIGlzQWJzb2x1dGUsIHRyYW5zZm9ybVVybCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxuLy8gTWF0Y2ggdXJsIGluIGNzc1xuY29uc3QgTUFUQ0hfQ1NTX1VSTCA9IC91cmxcXChcXHMqKFsnXCJdKT8oLio/KVxcMVxccypcXCkvZztcbmNvbnN0IE1BVENIX0NIQVJTRVRfVVJMID0gL0BjaGFyc2V0XFxzKyhbJ1wiXSkoLio/KVxcMVxccyo7Py9nO1xuY29uc3QgTUFUQ0hfSU1QT1JUX1VSTCA9IC9AaW1wb3J0XFxzKyhbJ1wiXSkoLio/KVxcMS9nO1xuXG5pbnRlcmZhY2UgU2NvcGVEYXRhIHtcbiAgYXBwTmFtZTogc3RyaW5nO1xuICByb290RWxJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVNYW5hZ2VyIHtcbiAgcHVibGljIHN0eWxlQ29kZTogc3RyaW5nO1xuICBwdWJsaWMgdXJsOiBzdHJpbmcgfCBudWxsO1xuICBwdWJsaWMgc2NvcGVEYXRhOiBTY29wZURhdGEgfCBudWxsO1xuXG4gIHByaXZhdGUgZGVwc1N0YWNrID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0cnVjdG9yKHN0eWxlQ29kZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNjb3BlRGF0YSA9IG51bGw7XG4gICAgdGhpcy51cmwgPSB1cmwgfHwgbnVsbDtcbiAgICB0aGlzLnN0eWxlQ29kZSA9IHN0eWxlQ29kZTtcbiAgfVxuXG4gIGNvcnJlY3RQYXRoKGJhc2VVcmw/OiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IHVybCwgc3R5bGVDb2RlIH0gPSB0aGlzO1xuICAgIGlmICghYmFzZVVybCkgYmFzZVVybCA9IHVybCBhcyBhbnk7XG4gICAgaWYgKGJhc2VVcmwgJiYgdHlwZW9mIHN0eWxlQ29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoZSByZWxhdGl2ZSBwYXRoIGlzIGNvbnZlcnRlZCB0byBhbiBhYnNvbHV0ZSBwYXRoIGFjY29yZGluZyB0byB0aGUgcGF0aCBvZiB0aGUgY3NzIGZpbGVcbiAgICAgIHRoaXMuc3R5bGVDb2RlID0gc3R5bGVDb2RlXG4gICAgICAgIC5yZXBsYWNlKE1BVENIX0NIQVJTRVRfVVJMLCAnJylcbiAgICAgICAgLnJlcGxhY2UoTUFUQ0hfSU1QT1JUX1VSTCwgZnVuY3Rpb24gKGswLCBrMSwgazIpIHtcbiAgICAgICAgICByZXR1cm4gazIgPyBgQGltcG9ydCB1cmwoJHtrMX0ke2syfSR7azF9KWAgOiBrMDtcbiAgICAgICAgfSlcbiAgICAgICAgLnJlcGxhY2UoTUFUQ0hfQ1NTX1VSTCwgKGswLCBrMSwgazIpID0+IHtcbiAgICAgICAgICBpZiAoaXNBYnNvbHV0ZShrMikpIHJldHVybiBrMDtcbiAgICAgICAgICByZXR1cm4gYHVybChcIiR7YmFzZVVybCA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBrMikgOiBrMn1cIilgO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBQcm92aWRlZCB0byBwbHVnaW5zIHRvIG92ZXJyaWRlIHRoaXMgbWV0aG9kXG4gIHRyYW5zZm9ybUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuICBzZXREZXAobm9kZTogTm9kZSkge1xuICAgIHRoaXMuZGVwc1N0YWNrLmFkZChub2RlKTtcbiAgfVxuXG4gIHNldFNjb3BlKGRhdGE6IFNjb3BlRGF0YSkge1xuICAgIHRoaXMuc2NvcGVEYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlzU2FtZU9yaWdpbihub2RlOiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwc1N0YWNrLmhhcyhub2RlKTtcbiAgfVxuXG4gIHJlbmRlckFzU3R5bGVFbGVtZW50KGV4dHJhQ29kZSA9ICcnKSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgY29kZSA9IGV4dHJhQ29kZSArIChcbiAgICAgIHRoaXMuc3R5bGVDb2RlXG4gICAgICAgID8gdGhpcy5zdHlsZUNvZGVcbiAgICAgICAgOiAnLyoqZW1wdHkgc3R5bGUqKi8nXG4gICAgKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0aGlzLnRyYW5zZm9ybUNvZGUoY29kZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgY2xvbmVkID0gbmV3IHRoaXMuY29uc3RydWN0b3IoKTtcbiAgICBjbG9uZWQudXJsID0gdGhpcy51cmw7XG4gICAgY2xvbmVkLnN0eWxlQ29kZSA9IHRoaXMuc3R5bGVDb2RlO1xuICAgIGNsb25lZC5zY29wZURhdGEgPSB0aGlzLnNjb3BlRGF0YTtcbiAgICBjbG9uZWQuZGVwc1N0YWNrID0gbmV3IFNldCh0aGlzLmRlcHNTdGFjayk7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufVxuIiwgImV4cG9ydCBjbGFzcyBNb2R1bGVNYW5hZ2VyIHtcbiAgcHVibGljIG1vZHVsZUNvZGU6IHN0cmluZztcbiAgcHVibGljIHVybDogc3RyaW5nIHwgbnVsbDtcbiAgcHVibGljIG9yaWdpblVybD86IHN0cmluZztcbiAgcHVibGljIGFsaWFzOiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZUNvZGU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGlhcyA9IG51bGw7XG4gICAgdGhpcy51cmwgPSB1cmwgfHwgbnVsbDtcbiAgICB0aGlzLm1vZHVsZUNvZGUgPSBtb2R1bGVDb2RlO1xuICB9XG5cbiAgc2V0QWxpYXMobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmFsaWFzID0gbmFtZTtcbiAgICB9XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgY2xvbmVkID0gbmV3IHRoaXMuY29uc3RydWN0b3IoKTtcbiAgICBjbG9uZWQudXJsID0gdGhpcy51cmw7XG4gICAgY2xvbmVkLmFsaWFzID0gdGhpcy5hbGlhcztcbiAgICBjbG9uZWQubW9kdWxlQ29kZSA9IHRoaXMubW9kdWxlQ29kZTtcbiAgICByZXR1cm4gY2xvbmVkO1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgTm9kZSxcbiAgVGV4dCxcbiAgRE9NQXBpcyxcbiAgZGVlcE1lcmdlLFxuICB0cmFuc2Zvcm1VcmwsXG4gIHRlbXBsYXRlUGFyc2UsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxudHlwZSBSZW5kZXJlciA9IFJlY29yZDxzdHJpbmcsIChub2RlOiBOb2RlKSA9PiBudWxsIHwgRWxlbWVudCB8IENvbW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVNYW5hZ2VyIHtcbiAgcHVibGljIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwdWJsaWMgRE9NQXBpcyA9IG5ldyBET01BcGlzKCk7XG4gIHB1YmxpYyBhc3RUcmVlOiBBcnJheTxOb2RlPiA9IFtdO1xuICBwcml2YXRlIHByZXRyZWF0bWVudFN0b3JlOiBSZWNvcmQ8c3RyaW5nLCBOb2RlW10+ID0ge307XG5cbiAgY29uc3RydWN0b3IodGVtcGxhdGU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XG4gICAgLy8gVGhlIHVybCBpcyBvbmx5IGJhc2UgdXJsLCBpdCBtYXkgYWxzbyBiZSBhIGpzIHJlc291cmNlIGFkZHJlc3MuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICBjb25zdCBbYXN0VHJlZSwgY29sbGVjdGlvbkVsc10gPSB0ZW1wbGF0ZVBhcnNlKHRlbXBsYXRlLCBbXG4gICAgICAgICdtZXRhJyxcbiAgICAgICAgJ2xpbmsnLFxuICAgICAgICAnc3R5bGUnLFxuICAgICAgICAnc2NyaXB0JyxcbiAgICAgIF0pO1xuICAgICAgdGhpcy5hc3RUcmVlID0gYXN0VHJlZTtcbiAgICAgIHRoaXMucHJldHJlYXRtZW50U3RvcmUgPSBjb2xsZWN0aW9uRWxzO1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGVzQnlUYWdOYW1lPFQ+KC4uLnRhZ3M6IEFycmF5PGtleW9mIFQ+KSB7XG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGNvbnN0IGNvbGxlY3Rpb246IFJlY29yZDxrZXlvZiBULCBBcnJheTxOb2RlPj4gPSB7fSBhcyBhbnk7XG5cbiAgICBmb3IgKGNvbnN0IHRhZyBvZiB0YWdzIGFzIHN0cmluZ1tdKSB7XG4gICAgICBpZiAodGhpcy5wcmV0cmVhdG1lbnRTdG9yZVt0YWddKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgY29sbGVjdGlvblt0YWddID0gdGhpcy5wcmV0cmVhdG1lbnRTdG9yZVt0YWddO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sbGVjdGlvblt0YWddID0gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ZXIgIT09IHRhZ3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCB0cmF2ZXJzZSA9IChub2RlOiBOb2RlIHwgVGV4dCkgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnZWxlbWVudCcpIHJldHVybjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRhZ3MuaW5kZXhPZihub2RlLnRhZ05hbWUgYXMgYW55KSA+IC0xICYmXG4gICAgICAgICAgIXRoaXMucHJldHJlYXRtZW50U3RvcmVbbm9kZS50YWdOYW1lXVxuICAgICAgICApIHtcbiAgICAgICAgICBjb2xsZWN0aW9uW25vZGUudGFnTmFtZV0ucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHRyYXZlcnNlKGNoaWxkKTtcbiAgICAgIH07XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5hc3RUcmVlKSB0cmF2ZXJzZShub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICAvLyBSZW5kZXIgZG9tIHRyZWVcbiAgY3JlYXRlRWxlbWVudHMocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnQ6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBlbGVtZW50czogQXJyYXk8RWxlbWVudD4gPSBbXTtcbiAgICBjb25zdCB0cmF2ZXJzZSA9IChub2RlOiBOb2RlIHwgVGV4dCwgcGFyZW50RWw/OiBFbGVtZW50KSA9PiB7XG4gICAgICBsZXQgZWw6IGFueTtcbiAgICAgIGlmICh0aGlzLkRPTUFwaXMuaXNDb21tZW50Tm9kZShub2RlKSkge1xuICAgICAgICAvLyBGaWx0ZXIgY29tbWVudCBub2RlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuRE9NQXBpcy5pc1RleHQobm9kZSkpIHtcbiAgICAgICAgZWwgPSB0aGlzLkRPTUFwaXMuY3JlYXRlVGV4dE5vZGUobm9kZSk7XG4gICAgICAgIHBhcmVudEVsICYmIHBhcmVudEVsLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ET01BcGlzLmlzTm9kZShub2RlKSkge1xuICAgICAgICBjb25zdCB7IHRhZ05hbWUsIGNoaWxkcmVuIH0gPSBub2RlIGFzIE5vZGU7XG4gICAgICAgIGlmIChyZW5kZXJlclt0YWdOYW1lXSkge1xuICAgICAgICAgIGVsID0gcmVuZGVyZXJbdGFnTmFtZV0obm9kZSBhcyBOb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbCA9IHRoaXMuRE9NQXBpcy5jcmVhdGVFbGVtZW50KG5vZGUgYXMgTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudEVsICYmIGVsKSBwYXJlbnRFbC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgY29uc3QgeyBub2RlVHlwZSwgX2lnbm9yZUNoaWxkTm9kZXMgfSA9IGVsO1xuICAgICAgICAgIC8vIEZpbHRlciBcImNvbW1lbnRcIiBhbmQgXCJkb2N1bWVudFwiIG5vZGVcbiAgICAgICAgICBpZiAoIV9pZ25vcmVDaGlsZE5vZGVzICYmIG5vZGVUeXBlICE9PSA4ICYmIG5vZGVUeXBlICE9PSAxMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgICB0cmF2ZXJzZShjaGlsZCwgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5hc3RUcmVlKSB7XG4gICAgICBpZiAodGhpcy5ET01BcGlzLmlzTm9kZShub2RlKSAmJiBub2RlLnRhZ05hbWUgIT09ICchZG9jdHlwZScpIHtcbiAgICAgICAgY29uc3QgZWwgPSB0cmF2ZXJzZShub2RlLCBwYXJlbnQpO1xuICAgICAgICBlbCAmJiBlbGVtZW50cy5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgdG9SZXNvbHZlVXJsKG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgYmFzZVVybD86IHN0cmluZykge1xuICAgIGNvbnN0IHNyYyA9IG5vZGUuYXR0cmlidXRlcz8uZmluZCgoeyBrZXkgfSkgPT4ga2V5ID09PSB0eXBlKTtcbiAgICBpZiAoc3JjICYmIHNyYy52YWx1ZSAmJiBiYXNlVXJsKSB7XG4gICAgICBzcmMudmFsdWUgPSB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgc3JjLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZ25vcmVDaGlsZE5vZGVzQ3JlYXRpb24obm9kZTogRWxlbWVudCkge1xuICAgIGlmIChub2RlKSB7XG4gICAgICAobm9kZSBhcyBhbnkpLl9pZ25vcmVDaGlsZE5vZGVzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBmaW5kQWxsTWV0YU5vZGVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlUYWdOYW1lKCdtZXRhJykubWV0YTtcbiAgfVxuXG4gIGZpbmRBbGxMaW5rTm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeVRhZ05hbWUoJ2xpbmsnKS5saW5rO1xuICB9XG5cbiAgZmluZEFsbEpzTm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeVRhZ05hbWUoJ3NjcmlwdCcpLnNjcmlwdDtcbiAgfVxuXG4gIGZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbm9kZS5hdHRyaWJ1dGVzPy5maW5kKCh7IGtleSB9KSA9PiBrZXkgPT09IHR5cGUpPy52YWx1ZSB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICBjbG9uZU5vZGUobm9kZTogTm9kZSkge1xuICAgIHJldHVybiBkZWVwTWVyZ2Uobm9kZSwge30pO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNsb25lZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY2xvbmVkLnVybCA9IHRoaXMudXJsO1xuICAgIGNsb25lZC5hc3RUcmVlID0gdGhpcy5hc3RUcmVlO1xuICAgIGNsb25lZC5wcmV0cmVhdG1lbnRTdG9yZSA9IHRoaXMucHJldHJlYXRtZW50U3RvcmU7XG4gICAgY2xvbmVkLkRPTUFwaXMgPSBuZXcgRE9NQXBpcyh0aGlzLkRPTUFwaXMuZG9jdW1lbnQpO1xuICAgIHJldHVybiBjbG9uZWQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgSmF2YVNjcmlwdE1hbmFnZXIge1xuICBwdWJsaWMgYXN5bmM6IGJvb2xlYW47XG4gIHB1YmxpYyBtaW1lVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgc2NyaXB0Q29kZTogc3RyaW5nO1xuICBwdWJsaWMgdXJsPzogc3RyaW5nO1xuXG4gIC8vIE5lZWQgdG8gcmVtb3ZlIGR1cGxpY2F0aW9uLCBzbyB1c2UgXCJzZXRcIlxuICBwcml2YXRlIGRlcHNTdGFjayA9IG5ldyBTZXQoKTtcblxuICBjb25zdHJ1Y3RvcihzY3JpcHRDb2RlOiBzdHJpbmcsIHVybD86IHN0cmluZykge1xuICAgIHRoaXMubWltZVR5cGUgPSAnJztcbiAgICB0aGlzLmFzeW5jID0gZmFsc2U7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5zY3JpcHRDb2RlID0gc2NyaXB0Q29kZTtcbiAgfVxuXG4gIGlzTW9kdWxlKCkge1xuICAgIHJldHVybiB0aGlzLm1pbWVUeXBlID09PSAnbW9kdWxlJztcbiAgfVxuXG4gIGlzSW5saW5lU2NyaXB0KCkge1xuICAgIHJldHVybiBCb29sZWFuKCF0aGlzLnVybCk7XG4gIH1cblxuICBzZXRNaW1lVHlwZShtaW1lVHlwZTogc3RyaW5nKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG1pbWVUeXBlIHx8ICcnO1xuICB9XG5cbiAgc2V0QXN5bmNBdHRyaWJ1dGUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5hc3luYyA9IEJvb2xlYW4odmFsKTtcbiAgfVxuXG4gIHNldERlcChub2RlOiBOb2RlKSB7XG4gICAgdGhpcy5kZXBzU3RhY2suYWRkKG5vZGUpO1xuICB9XG5cbiAgaXNTYW1lT3JpZ2luKG5vZGU6IE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBzU3RhY2suaGFzKG5vZGUpO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNsb25lZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY2xvbmVkLnVybCA9IHRoaXMudXJsO1xuICAgIGNsb25lZC5hc3luYyA9IHRoaXMuYXN5bmM7XG4gICAgY2xvbmVkLm1pbWVUeXBlID0gdGhpcy5taW1lVHlwZTtcbiAgICBjbG9uZWQuc2NyaXB0Q29kZSA9IHRoaXMuc2NyaXB0Q29kZTtcbiAgICBjbG9uZWQuZGVwc1N0YWNrID0gbmV3IFNldCh0aGlzLmRlcHNTdGFjayk7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufVxuIiwgImltcG9ydCB7IGVycm9yLCBwYXJzZUNvbnRlbnRUeXBlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgTWFuYWdlciwgTG9hZGVyIH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0KGN1c3RvbUZldGNoOiBMb2FkZXJbJ2hvb2tzJ11bJ2xpZmVjeWNsZSddWydmZXRjaCddKSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiByZXF1ZXN0KHVybDogc3RyaW5nLCBjb25maWc6IFJlcXVlc3RJbml0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGN1c3RvbUZldGNoLmVtaXQodXJsLCBjb25maWcgfHwge30pO1xuICAgIGlmICghcmVzdWx0IHx8ICEocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBmZXRjaCh1cmwsIGNvbmZpZyB8fCB7fSk7XG4gICAgfVxuXG4gICAgLy8gUmVzcG9uc2UgY29kZXMgZ3JlYXRlciB0aGFuIFwiNDAwXCIgYXJlIHJlZ2FyZGVkIGFzIGVycm9yc1xuICAgIGlmIChyZXN1bHQuc3RhdHVzID49IDQwMCkge1xuICAgICAgZXJyb3IoYFwiJHt1cmx9XCIgbG9hZCBmYWlsZWQgd2l0aCBzdGF0dXMgXCIke3Jlc3VsdC5zdGF0dXN9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgY29kZSA9IGF3YWl0IHJlc3VsdC50ZXh0KCk7XG4gICAgY29uc3QgdHlwZSA9IHJlc3VsdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG4gICAgY29uc3Qgc2l6ZSA9IE51bWJlcihyZXN1bHQuaGVhZGVycy5nZXQoJ2NvbnRlbnQtc2l6ZScpKTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IHBhcnNlQ29udGVudFR5cGUodHlwZSB8fCAnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29kZSxcbiAgICAgIHJlc3VsdCxcbiAgICAgIG1pbWVUeXBlLFxuICAgICAgdHlwZSxcbiAgICAgIHNpemU6IE51bWJlci5pc05hTihzaXplKSA/IG51bGwgOiBzaXplLFxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5UmVzdWx0KHJlc3VsdCkge1xuICBpZiAocmVzdWx0LnJlc291cmNlTWFuYWdlcikge1xuICAgIHJlc3VsdC5yZXNvdXJjZU1hbmFnZXIgPSAocmVzdWx0LnJlc291cmNlTWFuYWdlciBhcyBNYW5hZ2VyKS5jbG9uZSgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIENvbXBhdGlibGUgd2l0aCBvbGQgYXBpXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25maWcobG9hZGVyOiBMb2FkZXIsIHVybDogc3RyaW5nKSB7XG4gIGNvbnN0IGV4dHJhID0gbG9hZGVyLnJlcXVlc3RDb25maWc7XG4gIGNvbnN0IGNvbmZpZyA9IHR5cGVvZiBleHRyYSA9PT0gJ2Z1bmN0aW9uJyA/IGV4dHJhKHVybCkgOiBleHRyYTtcbiAgcmV0dXJuIHsgbW9kZTogJ2NvcnMnLCAuLi5jb25maWcgfSBhcyBSZXF1ZXN0SW5pdDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1hbmFnZXIsIENhY2hlVmFsdWUgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IGNhY2hlZERhdGFTZXQgPSBuZXcgV2Vha1NldCgpO1xuXG5leHBvcnQgZW51bSBGaWxlVHlwZXMge1xuICBqcyA9ICdqcycsXG4gIGNzcyA9ICdjc3MnLFxuICBtb2R1bGUgPSAnbW9kdWxlJywgLy8gcmVtb3RlIG1vZHVsZVxuICB0ZW1wbGF0ZSA9ICd0ZW1wbGF0ZScsXG59XG5cbmNvbnN0IE1BWF9TSVpFID0gMTAyNCAqIDEwMjQgKiA1MDtcbmNvbnN0IERFRkFVTFRfUE9MTCA9IFN5bWJvbCgnX19kZWZhdWx0QnVmZmVyUG9sbF9fJyk7XG5jb25zdCBGSUxFX1RZUEVTID0gW1xuICBGaWxlVHlwZXMuanMsXG4gIEZpbGVUeXBlcy5jc3MsXG4gIEZpbGVUeXBlcy5tb2R1bGUsXG4gIEZpbGVUeXBlcy50ZW1wbGF0ZSxcbiAgREVGQVVMVF9QT0xMLFxuXTtcblxuZXhwb3J0IGNsYXNzIEFwcENhY2hlQ29udGFpbmVyIHtcbiAgcHJpdmF0ZSBtYXhTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgdG90YWxTaXplID0gMDtcbiAgcHJpdmF0ZSByZWNvcmRlciA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKG1heFNpemUgPSBNQVhfU0laRSkge1xuICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XG4gICAgRklMRV9UWVBFUy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMucmVjb3JkZXJba2V5XSA9IDA7XG4gICAgICB0aGlzW2tleV0gPSBuZXcgTWFwPHN0cmluZywgQ2FjaGVWYWx1ZTxNYW5hZ2VyPj4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVmZmVyUG9vbCh0eXBlOiBGaWxlVHlwZXMgfCB0eXBlb2YgREVGQVVMVF9QT0xMKSB7XG4gICAgcmV0dXJuIHRoaXNbdHlwZV0gYXMgTWFwPHN0cmluZywgQ2FjaGVWYWx1ZTxNYW5hZ2VyPj47XG4gIH1cblxuICBoYXModXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRklMRV9UWVBFUy5zb21lKChrZXkpID0+IHRoaXNba2V5XS5oYXModXJsKSk7XG4gIH1cblxuICBnZXQodXJsOiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBGSUxFX1RZUEVTKSB7XG4gICAgICBpZiAodGhpc1trZXldLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV0uZ2V0KHVybCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHVybDogc3RyaW5nLCBkYXRhOiBDYWNoZVZhbHVlPE1hbmFnZXI+LCB0eXBlOiBGaWxlVHlwZXMpIHtcbiAgICBjb25zdCBjdXJTaXplID0gY2FjaGVkRGF0YVNldC5oYXMoZGF0YSkgPyAwIDogZGF0YS5zaXplO1xuICAgIGNvbnN0IHRvdGFsU2l6ZSA9IHRoaXMudG90YWxTaXplICsgY3VyU2l6ZTtcblxuICAgIGlmICh0b3RhbFNpemUgPCB0aGlzLm1heFNpemUpIHtcbiAgICAgIGxldCBiYXIgPSB0eXBlO1xuICAgICAgbGV0IGJ1ZmZlclBvb2wgPSB0aGlzLmJ1ZmZlclBvb2wodHlwZSk7XG4gICAgICBpZiAoIWJ1ZmZlclBvb2wpIHtcbiAgICAgICAgYmFyID0gREVGQVVMVF9QT0xMIGFzIGFueTtcbiAgICAgICAgYnVmZmVyUG9vbCA9IHRoaXMuYnVmZmVyUG9vbChERUZBVUxUX1BPTEwpO1xuICAgICAgfVxuXG4gICAgICBidWZmZXJQb29sLnNldCh1cmwsIGRhdGEpO1xuICAgICAgdGhpcy50b3RhbFNpemUgPSB0b3RhbFNpemU7XG4gICAgICB0aGlzLnJlY29yZGVyW2Jhcl0gKz0gY3VyU2l6ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjbGVhcih0eXBlPzogRmlsZVR5cGVzKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgY2FjaGVCb3ggPSB0aGlzLmJ1ZmZlclBvb2wodHlwZSk7XG4gICAgICBpZiAoY2FjaGVCb3ggJiYgY2FjaGVCb3ggaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMucmVjb3JkZXJbdHlwZV07XG4gICAgICAgIHRoaXMudG90YWxTaXplIC09IHNpemU7XG4gICAgICAgIHRoaXMucmVjb3JkZXJbdHlwZV0gPSAwO1xuICAgICAgICBjYWNoZUJveC5jbGVhcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBGSUxFX1RZUEVTLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICB0aGlzW2tleV0uY2xlYXIoKTtcbiAgICAgICAgdGhpcy5yZWNvcmRlcltrZXldID0gMDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50b3RhbFNpemUgPSAwO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxt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
