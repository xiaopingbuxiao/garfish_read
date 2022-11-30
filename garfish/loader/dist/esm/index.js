var __defProp = Object.defineProperty;
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

// src/index.ts
import {
  SyncHook,
  SyncWaterfallHook,
  PluginSystem,
  AsyncHook
} from "@garfish/hooks";
import {
  error as error2,
  __LOADER_FLAG__,
  isJsType,
  isCssType,
  isHtmlType
} from "@garfish/utils";

// src/managers/style.ts
import { isAbsolute, transformUrl } from "@garfish/utils";
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
        if (isAbsolute(k2))
          return k0;
        return `url("${baseUrl ? transformUrl(baseUrl, k2) : k2}")`;
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
import {
  DOMApis,
  deepMerge,
  transformUrl as transformUrl2,
  templateParse
} from "@garfish/utils";
var TemplateManager = class {
  constructor(template, url) {
    this.DOMApis = new DOMApis();
    this.astTree = [];
    this.pretreatmentStore = {};
    this.url = url;
    if (template) {
      const [astTree, collectionEls] = templateParse(template, [
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
      src.value = transformUrl2(baseUrl, src.value);
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
    return deepMerge(node, {});
  }
  clone() {
    const cloned = new this.constructor();
    cloned.url = this.url;
    cloned.astTree = this.astTree;
    cloned.pretreatmentStore = this.pretreatmentStore;
    cloned.DOMApis = new DOMApis(this.DOMApis.document);
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
import { error, parseContentType } from "@garfish/utils";
function getRequest(customFetch) {
  return async function request(url, config) {
    let result = await customFetch.emit(url, config || {});
    if (!result || !(result instanceof Response)) {
      result = await fetch(url, config || {});
    }
    if (result.status >= 400) {
      error(`"${url}" load failed with status "${result.status}"`);
    }
    const code = await result.text();
    const type = result.headers.get("content-type") || "";
    const size = Number(result.headers.get("content-size"));
    const mimeType = parseContentType(type || "");
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
    this.personalId = __LOADER_FLAG__;
    this.StyleManager = StyleManager;
    this.ModuleManager = ModuleManager;
    this.TemplateManager = TemplateManager;
    this.JavaScriptManager = JavaScriptManager;
    this.hooks = new PluginSystem({
      error: new SyncHook(),
      loaded: new SyncWaterfallHook("loaded"),
      clear: new SyncWaterfallHook("clear"),
      beforeLoad: new SyncWaterfallHook("beforeLoad"),
      fetch: new AsyncHook("fetch")
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
      } else if (isHtmlType({ type, src: result.url }) || isHtmlType({
        type: defaultContentType
      })) {
        fileType = "template" /* template */;
        managerCtor = TemplateManager;
      } else if (isJsType({ type: defaultContentType }) || isJsType({ type, src: result.url })) {
        fileType = "js" /* js */;
        managerCtor = JavaScriptManager;
      } else if (isCssType({ src: result.url, type }) || isCssType({
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
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && error2(e);
      this.hooks.lifecycle.error.emit(e, { scope });
      throw e;
    }).finally(() => {
      loadingList[url] = null;
    });
    loadingList[url] = loadRes;
    return loadRes;
  }
};
export {
  CrossOriginCredentials,
  JavaScriptManager,
  Loader,
  ModuleManager,
  StyleManager,
  TemplateManager
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9tYW5hZ2Vycy9zdHlsZS50cyIsICIuLi8uLi9zcmMvbWFuYWdlcnMvbW9kdWxlLnRzIiwgIi4uLy4uL3NyYy9tYW5hZ2Vycy90ZW1wbGF0ZS50cyIsICIuLi8uLi9zcmMvbWFuYWdlcnMvamF2YXNjcmlwdC50cyIsICIuLi8uLi9zcmMvdXRpbHMudHMiLCAiLi4vLi4vc3JjL2FwcENhY2hlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xuICBTeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIFBsdWdpblN5c3RlbSxcbiAgQXN5bmNIb29rLFxufSBmcm9tICdAZ2FyZmlzaC9ob29rcyc7XG5pbXBvcnQge1xuICBlcnJvcixcbiAgX19MT0FERVJfRkxBR19fLFxuICBpc0pzVHlwZSxcbiAgaXNDc3NUeXBlLFxuICBpc0h0bWxUeXBlLFxuICBwYXJzZUNvbnRlbnRUeXBlLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTdHlsZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL3N0eWxlJztcbmltcG9ydCB7IE1vZHVsZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL21vZHVsZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL3RlbXBsYXRlJztcbmltcG9ydCB7IEphdmFTY3JpcHRNYW5hZ2VyIH0gZnJvbSAnLi9tYW5hZ2Vycy9qYXZhc2NyaXB0JztcbmltcG9ydCB7IGdldFJlcXVlc3QsIGNvcHlSZXN1bHQsIG1lcmdlQ29uZmlnIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBGaWxlVHlwZXMsIGNhY2hlZERhdGFTZXQsIEFwcENhY2hlQ29udGFpbmVyIH0gZnJvbSAnLi9hcHBDYWNoZSc7XG5cbi8vIEV4cG9ydCB0eXBlcyBhbmQgbWFuYWdlciBjb25zdHJ1Y3RvclxuZXhwb3J0ICogZnJvbSAnLi9tYW5hZ2Vycy9zdHlsZSc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXJzL21vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXJzL3RlbXBsYXRlJztcbmV4cG9ydCAqIGZyb20gJy4vbWFuYWdlcnMvamF2YXNjcmlwdCc7XG5cbmV4cG9ydCB0eXBlIE1hbmFnZXIgPVxuICB8IFN0eWxlTWFuYWdlclxuICB8IE1vZHVsZU1hbmFnZXJcbiAgfCBUZW1wbGF0ZU1hbmFnZXJcbiAgfCBKYXZhU2NyaXB0TWFuYWdlcjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSB1bml0IGlzIGJ5dGVcbiAgICovXG4gIG1heFNpemU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVWYWx1ZTxUIGV4dGVuZHMgTWFuYWdlcj4ge1xuICB1cmw6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIGZpbGVUeXBlOiBGaWxlVHlwZXMgfCAnJztcbiAgcmVzb3VyY2VNYW5hZ2VyOiBUIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRIb29rQXJnczxUIGV4dGVuZHMgTWFuYWdlcj4ge1xuICByZXN1bHQ6IFJlc3BvbnNlO1xuICB2YWx1ZTogQ2FjaGVWYWx1ZTxUPjtcbn1cblxuZXhwb3J0IGVudW0gQ3Jvc3NPcmlnaW5DcmVkZW50aWFscyB7XG4gIGFub255bW91cyA9ICdzYW1lLW9yaWdpbicsXG4gICd1c2UtY3JlZGVudGlhbHMnID0gJ2luY2x1ZGUnLFxufVxuXG50eXBlIExpZmVDeWNsZSA9IExvYWRlclsnaG9va3MnXVsnbGlmZWN5Y2xlJ107XG5cbmV4cG9ydCB0eXBlIExvYWRlckxpZmVjeWNsZSA9IFBhcnRpYWw8e1xuICBbayBpbiBrZXlvZiBMaWZlQ3ljbGVdOiBQYXJhbWV0ZXJzPExpZmVDeWNsZVtrXVsnb24nXT5bMF07XG59PjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZXJQbHVnaW4gZXh0ZW5kcyBMb2FkZXJMaWZlY3ljbGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIge1xuICBwdWJsaWMgcGVyc29uYWxJZCA9IF9fTE9BREVSX0ZMQUdfXztcbiAgcHVibGljIFN0eWxlTWFuYWdlciA9IFN0eWxlTWFuYWdlcjtcbiAgcHVibGljIE1vZHVsZU1hbmFnZXIgPSBNb2R1bGVNYW5hZ2VyO1xuICBwdWJsaWMgVGVtcGxhdGVNYW5hZ2VyID0gVGVtcGxhdGVNYW5hZ2VyO1xuICBwdWJsaWMgSmF2YVNjcmlwdE1hbmFnZXIgPSBKYXZhU2NyaXB0TWFuYWdlcjtcbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIHB1YmxpYyByZXF1ZXN0Q29uZmlnOiBSZXF1ZXN0SW5pdCB8ICgodXJsOiBzdHJpbmcpID0+IFJlcXVlc3RJbml0KTtcblxuICBwdWJsaWMgaG9va3MgPSBuZXcgUGx1Z2luU3lzdGVtKHtcbiAgICBlcnJvcjogbmV3IFN5bmNIb29rPFtFcnJvciwgeyBzY29wZTogc3RyaW5nIH1dLCB2b2lkPigpLFxuICAgIGxvYWRlZDogbmV3IFN5bmNXYXRlcmZhbGxIb29rPExvYWRlZEhvb2tBcmdzPE1hbmFnZXI+PignbG9hZGVkJyksXG4gICAgY2xlYXI6IG5ldyBTeW5jV2F0ZXJmYWxsSG9vazx7XG4gICAgICBzY29wZTogc3RyaW5nO1xuICAgICAgZmlsZVR5cGU/OiBGaWxlVHlwZXM7XG4gICAgfT4oJ2NsZWFyJyksXG4gICAgYmVmb3JlTG9hZDogbmV3IFN5bmNXYXRlcmZhbGxIb29rPHtcbiAgICAgIHVybDogc3RyaW5nO1xuICAgICAgc2NvcGU6IHN0cmluZztcbiAgICAgIHJlcXVlc3RDb25maWc6IFJlc3BvbnNlSW5pdDtcbiAgICB9PignYmVmb3JlTG9hZCcpLFxuICAgIGZldGNoOiBuZXcgQXN5bmNIb29rPFtzdHJpbmcsIFJlcXVlc3RJbml0XSwgUmVzcG9uc2UgfCB2b2lkIHwgZmFsc2U+KFxuICAgICAgJ2ZldGNoJyxcbiAgICApLFxuICB9KTtcblxuICBwcml2YXRlIG9wdGlvbnM6IExvYWRlck9wdGlvbnM7XG4gIHByaXZhdGUgbG9hZGluZ0xpc3Q6IFJlY29yZDxzdHJpbmcsIG51bGwgfCBQcm9taXNlPENhY2hlVmFsdWU8YW55Pj4+O1xuICBwcml2YXRlIGNhY2hlU3RvcmU6IHsgW25hbWU6IHN0cmluZ106IEFwcENhY2hlQ29udGFpbmVyIH07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IExvYWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMubG9hZGluZ0xpc3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuY2FjaGVTdG9yZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBhcnRpYWw8TG9hZGVyT3B0aW9ucz4pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICB9XG5cbiAgY2xlYXIoc2NvcGU6IHN0cmluZywgZmlsZVR5cGU/OiBGaWxlVHlwZXMpIHtcbiAgICBjb25zdCBhcHBDYWNoZUNvbnRhaW5lciA9IHRoaXMuY2FjaGVTdG9yZVtzY29wZV07XG4gICAgaWYgKGFwcENhY2hlQ29udGFpbmVyKSB7XG4gICAgICBhcHBDYWNoZUNvbnRhaW5lci5jbGVhcihmaWxlVHlwZSk7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5jbGVhci5lbWl0KHsgc2NvcGUsIGZpbGVUeXBlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQWxsKGZpbGVUeXBlPzogRmlsZVR5cGVzKSB7XG4gICAgZm9yIChjb25zdCBzY29wZSBpbiB0aGlzLmNhY2hlU3RvcmUpIHtcbiAgICAgIHRoaXMuY2xlYXIoc2NvcGUsIGZpbGVUeXBlKTtcbiAgICB9XG4gIH1cblxuICB1c2VQbHVnaW4ob3B0aW9uczogTG9hZGVyUGx1Z2luKSB7XG4gICAgdGhpcy5ob29rcy51c2VQbHVnaW4ob3B0aW9ucyk7XG4gIH1cblxuICBzZXRMaWZlQ3ljbGUobGlmZUN5Y2xlOiBQYXJ0aWFsPExvYWRlckxpZmVjeWNsZT4pIHtcbiAgICB0aGlzLmhvb2tzLnVzZVBsdWdpbih7XG4gICAgICBuYW1lOiAnbG9hZGVyLWxpZmVjeWNsZScsXG4gICAgICAuLi5saWZlQ3ljbGUsXG4gICAgfSk7XG4gIH1cblxuICBsb2FkTW9kdWxlKHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZDxNb2R1bGVNYW5hZ2VyPih7XG4gICAgICBzY29wZTogJ21vZHVsZXMnLFxuICAgICAgdXJsLFxuICAgICAgaXNSZW1vdGVNb2R1bGU6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmFibGUgdG8ga25vdyB0aGUgZmluYWwgZGF0YSB0eXBlLCBzbyB0aHJvdWdoIFwiZ2VuZXJpY3NcIlxuICBhc3luYyBsb2FkPFQgZXh0ZW5kcyBNYW5hZ2VyPih7XG4gICAgc2NvcGUsXG4gICAgdXJsLFxuICAgIGlzUmVtb3RlTW9kdWxlID0gZmFsc2UsXG4gICAgY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJyxcbiAgICBkZWZhdWx0Q29udGVudFR5cGUgPSAnJyxcbiAgfToge1xuICAgIHNjb3BlOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaXNSZW1vdGVNb2R1bGU/OiBib29sZWFuO1xuICAgIGNyb3NzT3JpZ2luPzogTm9uTnVsbGFibGU8SFRNTFNjcmlwdEVsZW1lbnRbJ2Nyb3NzT3JpZ2luJ10+O1xuICAgIGRlZmF1bHRDb250ZW50VHlwZT86IHN0cmluZztcbiAgfSk6IFByb21pc2U8TG9hZGVkSG9va0FyZ3M8VD5bJ3ZhbHVlJ10+IHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGxvYWRpbmdMaXN0LCBjYWNoZVN0b3JlIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcmVzID0gbG9hZGluZ0xpc3RbdXJsXTtcbiAgICBpZiAocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGxldCBhcHBDYWNoZUNvbnRhaW5lciA9IGNhY2hlU3RvcmVbc2NvcGVdO1xuICAgIGlmICghYXBwQ2FjaGVDb250YWluZXIpIHtcbiAgICAgIGFwcENhY2hlQ29udGFpbmVyID0gY2FjaGVTdG9yZVtzY29wZV0gPSBuZXcgQXBwQ2FjaGVDb250YWluZXIoXG4gICAgICAgIG9wdGlvbnMubWF4U2l6ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGFwcENhY2hlQ29udGFpbmVyLmhhcyh1cmwpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvcHlSZXN1bHQoYXBwQ2FjaGVDb250YWluZXIuZ2V0KHVybCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgb3RoZXIgY29udGFpbmVycyBoYXZlIGNhY2hlXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWNoZVN0b3JlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNhY2hlU3RvcmVba2V5XTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPT0gYXBwQ2FjaGVDb250YWluZXIpIHtcbiAgICAgICAgICBpZiAoY29udGFpbmVyLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb250YWluZXIuZ2V0KHVybCk7XG4gICAgICAgICAgICBjYWNoZWREYXRhU2V0LmFkZChyZXN1bHQpO1xuICAgICAgICAgICAgYXBwQ2FjaGVDb250YWluZXIuc2V0KHVybCwgcmVzdWx0LCByZXN1bHQuZmlsZVR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb3B5UmVzdWx0KHJlc3VsdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RDb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLCB1cmwpO1xuICAgIC8vIFRlbGxzIGJyb3dzZXJzIHRvIGluY2x1ZGUgY3JlZGVudGlhbHMgaW4gYm90aCBzYW1lLSBhbmQgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzLCBhbmQgYWx3YXlzIHVzZSBhbnkgY3JlZGVudGlhbHMgc2VudCBiYWNrIGluIHJlc3BvbnNlcy5cbiAgICByZXF1ZXN0Q29uZmlnLmNyZWRlbnRpYWxzID0gQ3Jvc3NPcmlnaW5DcmVkZW50aWFsc1tjcm9zc09yaWdpbl07XG4gICAgY29uc3QgcmVzT3B0cyA9IHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUxvYWQuZW1pdCh7XG4gICAgICB1cmwsXG4gICAgICBzY29wZSxcbiAgICAgIHJlcXVlc3RDb25maWcsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZ2V0UmVxdWVzdCh0aGlzLmhvb2tzLmxpZmVjeWNsZS5mZXRjaCk7XG4gICAgY29uc3QgbG9hZFJlcyA9IHJlcXVlc3QocmVzT3B0cy51cmwsIHJlc09wdHMucmVxdWVzdENvbmZpZylcbiAgICAgIC50aGVuKCh7IGNvZGUsIHNpemUsIHJlc3VsdCwgdHlwZSB9KSA9PiB7XG4gICAgICAgIGxldCBtYW5hZ2VyQ3RvcixcbiAgICAgICAgICBmaWxlVHlwZTogRmlsZVR5cGVzIHwgJycgPSAnJztcblxuICAgICAgICBpZiAoaXNSZW1vdGVNb2R1bGUpIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy5tb2R1bGU7XG4gICAgICAgICAgbWFuYWdlckN0b3IgPSBNb2R1bGVNYW5hZ2VyO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGlzSHRtbFR5cGUoeyB0eXBlLCBzcmM6IHJlc3VsdC51cmwgfSkgfHxcbiAgICAgICAgICBpc0h0bWxUeXBlKHtcbiAgICAgICAgICAgIHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy50ZW1wbGF0ZTtcbiAgICAgICAgICBtYW5hZ2VyQ3RvciA9IFRlbXBsYXRlTWFuYWdlcjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBpc0pzVHlwZSh7IHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSB9KSB8fFxuICAgICAgICAgIGlzSnNUeXBlKHsgdHlwZSwgc3JjOiByZXN1bHQudXJsIH0pXG4gICAgICAgICkge1xuICAgICAgICAgIGZpbGVUeXBlID0gRmlsZVR5cGVzLmpzO1xuICAgICAgICAgIG1hbmFnZXJDdG9yID0gSmF2YVNjcmlwdE1hbmFnZXI7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgaXNDc3NUeXBlKHsgc3JjOiByZXN1bHQudXJsLCB0eXBlIH0pIHx8XG4gICAgICAgICAgaXNDc3NUeXBlKHtcbiAgICAgICAgICAgIHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy5jc3M7XG4gICAgICAgICAgbWFuYWdlckN0b3IgPSBTdHlsZU1hbmFnZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVc2UgcmVzdWx0LnVybCwgcmVzb3VyY2VzIG1heSBiZSByZWRpcmVjdGVkXG4gICAgICAgIGNvbnN0IHJlc291cmNlTWFuYWdlcjogTWFuYWdlciB8IG51bGwgPSBtYW5hZ2VyQ3RvclxuICAgICAgICAgID8gbmV3IG1hbmFnZXJDdG9yKGNvZGUsIHJlc3VsdC51cmwpXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIC8vIFRoZSByZXN1bHRzIHdpbGwgYmUgY2FjaGVkIHRoaXMgdGltZS5cbiAgICAgICAgLy8gU28sIHlvdSBjYW4gdHJhbnNmb3JtIHRoZSByZXF1ZXN0IHJlc3VsdC5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuaG9va3MubGlmZWN5Y2xlLmxvYWRlZC5lbWl0KHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHNjb3BlLFxuICAgICAgICAgICAgcmVzb3VyY2VNYW5hZ2VyLFxuICAgICAgICAgICAgZmlsZVR5cGU6IGZpbGVUeXBlIHx8ICcnLFxuICAgICAgICAgICAgLy8gRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHRha2UgYW4gYXBwcm94aW1hdGlvblxuICAgICAgICAgICAgc2l6ZTogc2l6ZSB8fCBjb2RlLmxlbmd0aCxcbiAgICAgICAgICAgIGNvZGU6IHJlc291cmNlTWFuYWdlciA/ICcnIDogY29kZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBmaWxlVHlwZSAmJiBhcHBDYWNoZUNvbnRhaW5lci5zZXQodXJsLCBkYXRhLnZhbHVlLCBmaWxlVHlwZSk7XG4gICAgICAgIHJldHVybiBjb3B5UmVzdWx0KGRhdGEudmFsdWUgYXMgYW55KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgZXJyb3IoZSk7XG4gICAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yLmVtaXQoZSwgeyBzY29wZSB9KTtcbiAgICAgICAgdGhyb3cgZTsgLy8gTGV0IHRoZSB1cHBlciBhcHBsaWNhdGlvbiBjYXRjaCB0aGUgZXJyb3JcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGxvYWRpbmdMaXN0W3VybF0gPSBudWxsO1xuICAgICAgfSk7XG5cbiAgICBsb2FkaW5nTGlzdFt1cmxdID0gbG9hZFJlcztcbiAgICByZXR1cm4gbG9hZFJlcztcbiAgfVxufVxuIiwgImltcG9ydCB7IE5vZGUsIGlzQWJzb2x1dGUsIHRyYW5zZm9ybVVybCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxuLy8gTWF0Y2ggdXJsIGluIGNzc1xuY29uc3QgTUFUQ0hfQ1NTX1VSTCA9IC91cmxcXChcXHMqKFsnXCJdKT8oLio/KVxcMVxccypcXCkvZztcbmNvbnN0IE1BVENIX0NIQVJTRVRfVVJMID0gL0BjaGFyc2V0XFxzKyhbJ1wiXSkoLio/KVxcMVxccyo7Py9nO1xuY29uc3QgTUFUQ0hfSU1QT1JUX1VSTCA9IC9AaW1wb3J0XFxzKyhbJ1wiXSkoLio/KVxcMS9nO1xuXG5pbnRlcmZhY2UgU2NvcGVEYXRhIHtcbiAgYXBwTmFtZTogc3RyaW5nO1xuICByb290RWxJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVNYW5hZ2VyIHtcbiAgcHVibGljIHN0eWxlQ29kZTogc3RyaW5nO1xuICBwdWJsaWMgdXJsOiBzdHJpbmcgfCBudWxsO1xuICBwdWJsaWMgc2NvcGVEYXRhOiBTY29wZURhdGEgfCBudWxsO1xuXG4gIHByaXZhdGUgZGVwc1N0YWNrID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0cnVjdG9yKHN0eWxlQ29kZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNjb3BlRGF0YSA9IG51bGw7XG4gICAgdGhpcy51cmwgPSB1cmwgfHwgbnVsbDtcbiAgICB0aGlzLnN0eWxlQ29kZSA9IHN0eWxlQ29kZTtcbiAgfVxuXG4gIGNvcnJlY3RQYXRoKGJhc2VVcmw/OiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IHVybCwgc3R5bGVDb2RlIH0gPSB0aGlzO1xuICAgIGlmICghYmFzZVVybCkgYmFzZVVybCA9IHVybCBhcyBhbnk7XG4gICAgaWYgKGJhc2VVcmwgJiYgdHlwZW9mIHN0eWxlQ29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoZSByZWxhdGl2ZSBwYXRoIGlzIGNvbnZlcnRlZCB0byBhbiBhYnNvbHV0ZSBwYXRoIGFjY29yZGluZyB0byB0aGUgcGF0aCBvZiB0aGUgY3NzIGZpbGVcbiAgICAgIHRoaXMuc3R5bGVDb2RlID0gc3R5bGVDb2RlXG4gICAgICAgIC5yZXBsYWNlKE1BVENIX0NIQVJTRVRfVVJMLCAnJylcbiAgICAgICAgLnJlcGxhY2UoTUFUQ0hfSU1QT1JUX1VSTCwgZnVuY3Rpb24gKGswLCBrMSwgazIpIHtcbiAgICAgICAgICByZXR1cm4gazIgPyBgQGltcG9ydCB1cmwoJHtrMX0ke2syfSR7azF9KWAgOiBrMDtcbiAgICAgICAgfSlcbiAgICAgICAgLnJlcGxhY2UoTUFUQ0hfQ1NTX1VSTCwgKGswLCBrMSwgazIpID0+IHtcbiAgICAgICAgICBpZiAoaXNBYnNvbHV0ZShrMikpIHJldHVybiBrMDtcbiAgICAgICAgICByZXR1cm4gYHVybChcIiR7YmFzZVVybCA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBrMikgOiBrMn1cIilgO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBQcm92aWRlZCB0byBwbHVnaW5zIHRvIG92ZXJyaWRlIHRoaXMgbWV0aG9kXG4gIHRyYW5zZm9ybUNvZGUoY29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuICBzZXREZXAobm9kZTogTm9kZSkge1xuICAgIHRoaXMuZGVwc1N0YWNrLmFkZChub2RlKTtcbiAgfVxuXG4gIHNldFNjb3BlKGRhdGE6IFNjb3BlRGF0YSkge1xuICAgIHRoaXMuc2NvcGVEYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlzU2FtZU9yaWdpbihub2RlOiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwc1N0YWNrLmhhcyhub2RlKTtcbiAgfVxuXG4gIHJlbmRlckFzU3R5bGVFbGVtZW50KGV4dHJhQ29kZSA9ICcnKSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgY29kZSA9IGV4dHJhQ29kZSArIChcbiAgICAgIHRoaXMuc3R5bGVDb2RlXG4gICAgICAgID8gdGhpcy5zdHlsZUNvZGVcbiAgICAgICAgOiAnLyoqZW1wdHkgc3R5bGUqKi8nXG4gICAgKTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0aGlzLnRyYW5zZm9ybUNvZGUoY29kZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgY2xvbmVkID0gbmV3IHRoaXMuY29uc3RydWN0b3IoKTtcbiAgICBjbG9uZWQudXJsID0gdGhpcy51cmw7XG4gICAgY2xvbmVkLnN0eWxlQ29kZSA9IHRoaXMuc3R5bGVDb2RlO1xuICAgIGNsb25lZC5zY29wZURhdGEgPSB0aGlzLnNjb3BlRGF0YTtcbiAgICBjbG9uZWQuZGVwc1N0YWNrID0gbmV3IFNldCh0aGlzLmRlcHNTdGFjayk7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufVxuIiwgImV4cG9ydCBjbGFzcyBNb2R1bGVNYW5hZ2VyIHtcbiAgcHVibGljIG1vZHVsZUNvZGU6IHN0cmluZztcbiAgcHVibGljIHVybDogc3RyaW5nIHwgbnVsbDtcbiAgcHVibGljIG9yaWdpblVybD86IHN0cmluZztcbiAgcHVibGljIGFsaWFzOiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKG1vZHVsZUNvZGU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGlhcyA9IG51bGw7XG4gICAgdGhpcy51cmwgPSB1cmwgfHwgbnVsbDtcbiAgICB0aGlzLm1vZHVsZUNvZGUgPSBtb2R1bGVDb2RlO1xuICB9XG5cbiAgc2V0QWxpYXMobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmFsaWFzID0gbmFtZTtcbiAgICB9XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgY2xvbmVkID0gbmV3IHRoaXMuY29uc3RydWN0b3IoKTtcbiAgICBjbG9uZWQudXJsID0gdGhpcy51cmw7XG4gICAgY2xvbmVkLmFsaWFzID0gdGhpcy5hbGlhcztcbiAgICBjbG9uZWQubW9kdWxlQ29kZSA9IHRoaXMubW9kdWxlQ29kZTtcbiAgICByZXR1cm4gY2xvbmVkO1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgTm9kZSxcbiAgVGV4dCxcbiAgRE9NQXBpcyxcbiAgZGVlcE1lcmdlLFxuICB0cmFuc2Zvcm1VcmwsXG4gIHRlbXBsYXRlUGFyc2UsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxudHlwZSBSZW5kZXJlciA9IFJlY29yZDxzdHJpbmcsIChub2RlOiBOb2RlKSA9PiBudWxsIHwgRWxlbWVudCB8IENvbW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVNYW5hZ2VyIHtcbiAgcHVibGljIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwdWJsaWMgRE9NQXBpcyA9IG5ldyBET01BcGlzKCk7XG4gIHB1YmxpYyBhc3RUcmVlOiBBcnJheTxOb2RlPiA9IFtdO1xuICBwcml2YXRlIHByZXRyZWF0bWVudFN0b3JlOiBSZWNvcmQ8c3RyaW5nLCBOb2RlW10+ID0ge307XG5cbiAgY29uc3RydWN0b3IodGVtcGxhdGU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XG4gICAgLy8gVGhlIHVybCBpcyBvbmx5IGJhc2UgdXJsLCBpdCBtYXkgYWxzbyBiZSBhIGpzIHJlc291cmNlIGFkZHJlc3MuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICBjb25zdCBbYXN0VHJlZSwgY29sbGVjdGlvbkVsc10gPSB0ZW1wbGF0ZVBhcnNlKHRlbXBsYXRlLCBbXG4gICAgICAgICdtZXRhJyxcbiAgICAgICAgJ2xpbmsnLFxuICAgICAgICAnc3R5bGUnLFxuICAgICAgICAnc2NyaXB0JyxcbiAgICAgIF0pO1xuICAgICAgdGhpcy5hc3RUcmVlID0gYXN0VHJlZTtcbiAgICAgIHRoaXMucHJldHJlYXRtZW50U3RvcmUgPSBjb2xsZWN0aW9uRWxzO1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGVzQnlUYWdOYW1lPFQ+KC4uLnRhZ3M6IEFycmF5PGtleW9mIFQ+KSB7XG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGNvbnN0IGNvbGxlY3Rpb246IFJlY29yZDxrZXlvZiBULCBBcnJheTxOb2RlPj4gPSB7fSBhcyBhbnk7XG5cbiAgICBmb3IgKGNvbnN0IHRhZyBvZiB0YWdzIGFzIHN0cmluZ1tdKSB7XG4gICAgICBpZiAodGhpcy5wcmV0cmVhdG1lbnRTdG9yZVt0YWddKSB7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgY29sbGVjdGlvblt0YWddID0gdGhpcy5wcmV0cmVhdG1lbnRTdG9yZVt0YWddO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sbGVjdGlvblt0YWddID0gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ZXIgIT09IHRhZ3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCB0cmF2ZXJzZSA9IChub2RlOiBOb2RlIHwgVGV4dCkgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnZWxlbWVudCcpIHJldHVybjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRhZ3MuaW5kZXhPZihub2RlLnRhZ05hbWUgYXMgYW55KSA+IC0xICYmXG4gICAgICAgICAgIXRoaXMucHJldHJlYXRtZW50U3RvcmVbbm9kZS50YWdOYW1lXVxuICAgICAgICApIHtcbiAgICAgICAgICBjb2xsZWN0aW9uW25vZGUudGFnTmFtZV0ucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHRyYXZlcnNlKGNoaWxkKTtcbiAgICAgIH07XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5hc3RUcmVlKSB0cmF2ZXJzZShub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICAvLyBSZW5kZXIgZG9tIHRyZWVcbiAgY3JlYXRlRWxlbWVudHMocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnQ6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBlbGVtZW50czogQXJyYXk8RWxlbWVudD4gPSBbXTtcbiAgICBjb25zdCB0cmF2ZXJzZSA9IChub2RlOiBOb2RlIHwgVGV4dCwgcGFyZW50RWw/OiBFbGVtZW50KSA9PiB7XG4gICAgICBsZXQgZWw6IGFueTtcbiAgICAgIGlmICh0aGlzLkRPTUFwaXMuaXNDb21tZW50Tm9kZShub2RlKSkge1xuICAgICAgICAvLyBGaWx0ZXIgY29tbWVudCBub2RlXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuRE9NQXBpcy5pc1RleHQobm9kZSkpIHtcbiAgICAgICAgZWwgPSB0aGlzLkRPTUFwaXMuY3JlYXRlVGV4dE5vZGUobm9kZSk7XG4gICAgICAgIHBhcmVudEVsICYmIHBhcmVudEVsLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ET01BcGlzLmlzTm9kZShub2RlKSkge1xuICAgICAgICBjb25zdCB7IHRhZ05hbWUsIGNoaWxkcmVuIH0gPSBub2RlIGFzIE5vZGU7XG4gICAgICAgIGlmIChyZW5kZXJlclt0YWdOYW1lXSkge1xuICAgICAgICAgIGVsID0gcmVuZGVyZXJbdGFnTmFtZV0obm9kZSBhcyBOb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbCA9IHRoaXMuRE9NQXBpcy5jcmVhdGVFbGVtZW50KG5vZGUgYXMgTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudEVsICYmIGVsKSBwYXJlbnRFbC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgY29uc3QgeyBub2RlVHlwZSwgX2lnbm9yZUNoaWxkTm9kZXMgfSA9IGVsO1xuICAgICAgICAgIC8vIEZpbHRlciBcImNvbW1lbnRcIiBhbmQgXCJkb2N1bWVudFwiIG5vZGVcbiAgICAgICAgICBpZiAoIV9pZ25vcmVDaGlsZE5vZGVzICYmIG5vZGVUeXBlICE9PSA4ICYmIG5vZGVUeXBlICE9PSAxMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgICB0cmF2ZXJzZShjaGlsZCwgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5hc3RUcmVlKSB7XG4gICAgICBpZiAodGhpcy5ET01BcGlzLmlzTm9kZShub2RlKSAmJiBub2RlLnRhZ05hbWUgIT09ICchZG9jdHlwZScpIHtcbiAgICAgICAgY29uc3QgZWwgPSB0cmF2ZXJzZShub2RlLCBwYXJlbnQpO1xuICAgICAgICBlbCAmJiBlbGVtZW50cy5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgdG9SZXNvbHZlVXJsKG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgYmFzZVVybD86IHN0cmluZykge1xuICAgIGNvbnN0IHNyYyA9IG5vZGUuYXR0cmlidXRlcz8uZmluZCgoeyBrZXkgfSkgPT4ga2V5ID09PSB0eXBlKTtcbiAgICBpZiAoc3JjICYmIHNyYy52YWx1ZSAmJiBiYXNlVXJsKSB7XG4gICAgICBzcmMudmFsdWUgPSB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgc3JjLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZ25vcmVDaGlsZE5vZGVzQ3JlYXRpb24obm9kZTogRWxlbWVudCkge1xuICAgIGlmIChub2RlKSB7XG4gICAgICAobm9kZSBhcyBhbnkpLl9pZ25vcmVDaGlsZE5vZGVzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBmaW5kQWxsTWV0YU5vZGVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlUYWdOYW1lKCdtZXRhJykubWV0YTtcbiAgfVxuXG4gIGZpbmRBbGxMaW5rTm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeVRhZ05hbWUoJ2xpbmsnKS5saW5rO1xuICB9XG5cbiAgZmluZEFsbEpzTm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeVRhZ05hbWUoJ3NjcmlwdCcpLnNjcmlwdDtcbiAgfVxuXG4gIGZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbm9kZS5hdHRyaWJ1dGVzPy5maW5kKCh7IGtleSB9KSA9PiBrZXkgPT09IHR5cGUpPy52YWx1ZSB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICBjbG9uZU5vZGUobm9kZTogTm9kZSkge1xuICAgIHJldHVybiBkZWVwTWVyZ2Uobm9kZSwge30pO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNsb25lZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY2xvbmVkLnVybCA9IHRoaXMudXJsO1xuICAgIGNsb25lZC5hc3RUcmVlID0gdGhpcy5hc3RUcmVlO1xuICAgIGNsb25lZC5wcmV0cmVhdG1lbnRTdG9yZSA9IHRoaXMucHJldHJlYXRtZW50U3RvcmU7XG4gICAgY2xvbmVkLkRPTUFwaXMgPSBuZXcgRE9NQXBpcyh0aGlzLkRPTUFwaXMuZG9jdW1lbnQpO1xuICAgIHJldHVybiBjbG9uZWQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgSmF2YVNjcmlwdE1hbmFnZXIge1xuICBwdWJsaWMgYXN5bmM6IGJvb2xlYW47XG4gIHB1YmxpYyBtaW1lVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgc2NyaXB0Q29kZTogc3RyaW5nO1xuICBwdWJsaWMgdXJsPzogc3RyaW5nO1xuXG4gIC8vIE5lZWQgdG8gcmVtb3ZlIGR1cGxpY2F0aW9uLCBzbyB1c2UgXCJzZXRcIlxuICBwcml2YXRlIGRlcHNTdGFjayA9IG5ldyBTZXQoKTtcblxuICBjb25zdHJ1Y3RvcihzY3JpcHRDb2RlOiBzdHJpbmcsIHVybD86IHN0cmluZykge1xuICAgIHRoaXMubWltZVR5cGUgPSAnJztcbiAgICB0aGlzLmFzeW5jID0gZmFsc2U7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5zY3JpcHRDb2RlID0gc2NyaXB0Q29kZTtcbiAgfVxuXG4gIGlzTW9kdWxlKCkge1xuICAgIHJldHVybiB0aGlzLm1pbWVUeXBlID09PSAnbW9kdWxlJztcbiAgfVxuXG4gIGlzSW5saW5lU2NyaXB0KCkge1xuICAgIHJldHVybiBCb29sZWFuKCF0aGlzLnVybCk7XG4gIH1cblxuICBzZXRNaW1lVHlwZShtaW1lVHlwZTogc3RyaW5nKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG1pbWVUeXBlIHx8ICcnO1xuICB9XG5cbiAgc2V0QXN5bmNBdHRyaWJ1dGUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5hc3luYyA9IEJvb2xlYW4odmFsKTtcbiAgfVxuXG4gIHNldERlcChub2RlOiBOb2RlKSB7XG4gICAgdGhpcy5kZXBzU3RhY2suYWRkKG5vZGUpO1xuICB9XG5cbiAgaXNTYW1lT3JpZ2luKG5vZGU6IE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBzU3RhY2suaGFzKG5vZGUpO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNsb25lZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY2xvbmVkLnVybCA9IHRoaXMudXJsO1xuICAgIGNsb25lZC5hc3luYyA9IHRoaXMuYXN5bmM7XG4gICAgY2xvbmVkLm1pbWVUeXBlID0gdGhpcy5taW1lVHlwZTtcbiAgICBjbG9uZWQuc2NyaXB0Q29kZSA9IHRoaXMuc2NyaXB0Q29kZTtcbiAgICBjbG9uZWQuZGVwc1N0YWNrID0gbmV3IFNldCh0aGlzLmRlcHNTdGFjayk7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufVxuIiwgImltcG9ydCB7IGVycm9yLCBwYXJzZUNvbnRlbnRUeXBlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgTWFuYWdlciwgTG9hZGVyIH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0KGN1c3RvbUZldGNoOiBMb2FkZXJbJ2hvb2tzJ11bJ2xpZmVjeWNsZSddWydmZXRjaCddKSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiByZXF1ZXN0KHVybDogc3RyaW5nLCBjb25maWc6IFJlcXVlc3RJbml0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGN1c3RvbUZldGNoLmVtaXQodXJsLCBjb25maWcgfHwge30pO1xuICAgIGlmICghcmVzdWx0IHx8ICEocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBmZXRjaCh1cmwsIGNvbmZpZyB8fCB7fSk7XG4gICAgfVxuXG4gICAgLy8gUmVzcG9uc2UgY29kZXMgZ3JlYXRlciB0aGFuIFwiNDAwXCIgYXJlIHJlZ2FyZGVkIGFzIGVycm9yc1xuICAgIGlmIChyZXN1bHQuc3RhdHVzID49IDQwMCkge1xuICAgICAgZXJyb3IoYFwiJHt1cmx9XCIgbG9hZCBmYWlsZWQgd2l0aCBzdGF0dXMgXCIke3Jlc3VsdC5zdGF0dXN9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgY29kZSA9IGF3YWl0IHJlc3VsdC50ZXh0KCk7XG4gICAgY29uc3QgdHlwZSA9IHJlc3VsdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG4gICAgY29uc3Qgc2l6ZSA9IE51bWJlcihyZXN1bHQuaGVhZGVycy5nZXQoJ2NvbnRlbnQtc2l6ZScpKTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IHBhcnNlQ29udGVudFR5cGUodHlwZSB8fCAnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29kZSxcbiAgICAgIHJlc3VsdCxcbiAgICAgIG1pbWVUeXBlLFxuICAgICAgdHlwZSxcbiAgICAgIHNpemU6IE51bWJlci5pc05hTihzaXplKSA/IG51bGwgOiBzaXplLFxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5UmVzdWx0KHJlc3VsdCkge1xuICBpZiAocmVzdWx0LnJlc291cmNlTWFuYWdlcikge1xuICAgIHJlc3VsdC5yZXNvdXJjZU1hbmFnZXIgPSAocmVzdWx0LnJlc291cmNlTWFuYWdlciBhcyBNYW5hZ2VyKS5jbG9uZSgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIENvbXBhdGlibGUgd2l0aCBvbGQgYXBpXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25maWcobG9hZGVyOiBMb2FkZXIsIHVybDogc3RyaW5nKSB7XG4gIGNvbnN0IGV4dHJhID0gbG9hZGVyLnJlcXVlc3RDb25maWc7XG4gIGNvbnN0IGNvbmZpZyA9IHR5cGVvZiBleHRyYSA9PT0gJ2Z1bmN0aW9uJyA/IGV4dHJhKHVybCkgOiBleHRyYTtcbiAgcmV0dXJuIHsgbW9kZTogJ2NvcnMnLCAuLi5jb25maWcgfSBhcyBSZXF1ZXN0SW5pdDtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE1hbmFnZXIsIENhY2hlVmFsdWUgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IGNhY2hlZERhdGFTZXQgPSBuZXcgV2Vha1NldCgpO1xuXG5leHBvcnQgZW51bSBGaWxlVHlwZXMge1xuICBqcyA9ICdqcycsXG4gIGNzcyA9ICdjc3MnLFxuICBtb2R1bGUgPSAnbW9kdWxlJywgLy8gcmVtb3RlIG1vZHVsZVxuICB0ZW1wbGF0ZSA9ICd0ZW1wbGF0ZScsXG59XG5cbmNvbnN0IE1BWF9TSVpFID0gMTAyNCAqIDEwMjQgKiA1MDtcbmNvbnN0IERFRkFVTFRfUE9MTCA9IFN5bWJvbCgnX19kZWZhdWx0QnVmZmVyUG9sbF9fJyk7XG5jb25zdCBGSUxFX1RZUEVTID0gW1xuICBGaWxlVHlwZXMuanMsXG4gIEZpbGVUeXBlcy5jc3MsXG4gIEZpbGVUeXBlcy5tb2R1bGUsXG4gIEZpbGVUeXBlcy50ZW1wbGF0ZSxcbiAgREVGQVVMVF9QT0xMLFxuXTtcblxuZXhwb3J0IGNsYXNzIEFwcENhY2hlQ29udGFpbmVyIHtcbiAgcHJpdmF0ZSBtYXhTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgdG90YWxTaXplID0gMDtcbiAgcHJpdmF0ZSByZWNvcmRlciA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKG1heFNpemUgPSBNQVhfU0laRSkge1xuICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XG4gICAgRklMRV9UWVBFUy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMucmVjb3JkZXJba2V5XSA9IDA7XG4gICAgICB0aGlzW2tleV0gPSBuZXcgTWFwPHN0cmluZywgQ2FjaGVWYWx1ZTxNYW5hZ2VyPj4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnVmZmVyUG9vbCh0eXBlOiBGaWxlVHlwZXMgfCB0eXBlb2YgREVGQVVMVF9QT0xMKSB7XG4gICAgcmV0dXJuIHRoaXNbdHlwZV0gYXMgTWFwPHN0cmluZywgQ2FjaGVWYWx1ZTxNYW5hZ2VyPj47XG4gIH1cblxuICBoYXModXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRklMRV9UWVBFUy5zb21lKChrZXkpID0+IHRoaXNba2V5XS5oYXModXJsKSk7XG4gIH1cblxuICBnZXQodXJsOiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBGSUxFX1RZUEVTKSB7XG4gICAgICBpZiAodGhpc1trZXldLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV0uZ2V0KHVybCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0KHVybDogc3RyaW5nLCBkYXRhOiBDYWNoZVZhbHVlPE1hbmFnZXI+LCB0eXBlOiBGaWxlVHlwZXMpIHtcbiAgICBjb25zdCBjdXJTaXplID0gY2FjaGVkRGF0YVNldC5oYXMoZGF0YSkgPyAwIDogZGF0YS5zaXplO1xuICAgIGNvbnN0IHRvdGFsU2l6ZSA9IHRoaXMudG90YWxTaXplICsgY3VyU2l6ZTtcblxuICAgIGlmICh0b3RhbFNpemUgPCB0aGlzLm1heFNpemUpIHtcbiAgICAgIGxldCBiYXIgPSB0eXBlO1xuICAgICAgbGV0IGJ1ZmZlclBvb2wgPSB0aGlzLmJ1ZmZlclBvb2wodHlwZSk7XG4gICAgICBpZiAoIWJ1ZmZlclBvb2wpIHtcbiAgICAgICAgYmFyID0gREVGQVVMVF9QT0xMIGFzIGFueTtcbiAgICAgICAgYnVmZmVyUG9vbCA9IHRoaXMuYnVmZmVyUG9vbChERUZBVUxUX1BPTEwpO1xuICAgICAgfVxuXG4gICAgICBidWZmZXJQb29sLnNldCh1cmwsIGRhdGEpO1xuICAgICAgdGhpcy50b3RhbFNpemUgPSB0b3RhbFNpemU7XG4gICAgICB0aGlzLnJlY29yZGVyW2Jhcl0gKz0gY3VyU2l6ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjbGVhcih0eXBlPzogRmlsZVR5cGVzKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgY2FjaGVCb3ggPSB0aGlzLmJ1ZmZlclBvb2wodHlwZSk7XG4gICAgICBpZiAoY2FjaGVCb3ggJiYgY2FjaGVCb3ggaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMucmVjb3JkZXJbdHlwZV07XG4gICAgICAgIHRoaXMudG90YWxTaXplIC09IHNpemU7XG4gICAgICAgIHRoaXMucmVjb3JkZXJbdHlwZV0gPSAwO1xuICAgICAgICBjYWNoZUJveC5jbGVhcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBGSUxFX1RZUEVTLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICB0aGlzW2tleV0uY2xlYXIoKTtcbiAgICAgICAgdGhpcy5yZWNvcmRlcltrZXldID0gMDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50b3RhbFNpemUgPSAwO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFBQTtBQUFBO0FBQUE7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
