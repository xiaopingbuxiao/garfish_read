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
  DOMApis: () => DOMApis,
  Lock: () => Lock,
  Queue: () => Queue,
  __GARFISH_FLAG__: () => __GARFISH_FLAG__,
  __LOADER_FLAG__: () => __LOADER_FLAG__,
  __MockBody__: () => __MockBody__,
  __MockHead__: () => __MockHead__,
  __MockHtml__: () => __MockHtml__,
  __REMOVE_NODE__: () => __REMOVE_NODE__,
  _extends: () => _extends,
  appContainerId: () => appContainerId,
  assert: () => assert,
  callTestCallback: () => callTestCallback,
  computeErrorUrl: () => computeErrorUrl,
  computeStackTraceFromStackProp: () => computeStackTraceFromStackProp,
  coreLog: () => coreLog,
  createAppContainer: () => createAppContainer,
  createKey: () => createKey,
  createSourcemap: () => createSourcemap,
  deepMerge: () => deepMerge,
  def: () => def,
  error: () => error,
  evalWithEnv: () => evalWithEnv,
  filterAndWrapEventListener: () => filterAndWrapEventListener,
  filterUndefinedVal: () => filterUndefinedVal,
  findTarget: () => findTarget,
  getGarfishDebugInstanceName: () => getGarfishDebugInstanceName,
  getParameterByName: () => getParameterByName,
  getRenderNode: () => getRenderNode,
  getType: () => getType,
  hasOwn: () => hasOwn,
  haveSourcemap: () => haveSourcemap,
  hookObjectProperty: () => hookObjectProperty,
  idleCallback: () => idleCallback,
  inBrowser: () => inBrowser,
  internFunc: () => internFunc,
  isAbsolute: () => isAbsolute,
  isCss: () => isCss,
  isCssType: () => isCssType,
  isGarfishConfigType: () => isGarfishConfigType,
  isHtml: () => isHtml,
  isHtmlType: () => isHtmlType,
  isJs: () => isJs,
  isJsType: () => isJsType,
  isJsonp: () => isJsonp,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  isPrimitive: () => isPrimitive,
  isPromise: () => isPromise,
  makeMap: () => makeMap,
  makeMapObject: () => makeMapObject,
  mapObject: () => mapObject,
  nextTick: () => nextTick,
  noop: () => noop,
  objectToString: () => objectToString,
  parseContentType: () => parseContentType,
  remove: () => remove,
  routerLog: () => routerLog,
  safari13Deal: () => safari13Deal,
  safeWrapper: () => safeWrapper,
  setDocCurrentScript: () => setDocCurrentScript,
  sourceListTags: () => sourceListTags,
  sourceNode: () => sourceNode,
  supportWasm: () => supportWasm,
  templateParse: () => templateParse,
  toBase64: () => toBase64,
  toBoolean: () => toBoolean,
  toWsProtocol: () => toWsProtocol,
  transformUrl: () => transformUrl,
  unique: () => unique,
  validURL: () => validURL,
  warn: () => warn
});

// src/utils.ts
var noop = () => {
};
var objectToString = Object.prototype.toString;
var supportWasm = typeof WebAssembly === "object";
var idleCallback = window.requestIdleCallback || window.requestAnimationFrame;
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function isObject(val) {
  return val && typeof val === "object";
}
function isPlainObject(val) {
  return objectToString.call(val) === "[object Object]";
}
function getType(val) {
  return objectToString.call(val).slice(8, -1).toLowerCase();
}
function isPromise(obj) {
  return isObject(obj) && typeof obj.then === "function";
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    get: () => value,
    set: (val) => {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        if (val !== value) {
          error(`Try to modify a read-only property ${key}`);
        }
      }
    },
    configurable: (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? true : false
  });
}
function makeMap(list) {
  const map = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return (val) => !!map[val];
}
function makeMapObject(list) {
  const map = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return map;
}
function inBrowser() {
  return typeof window !== "undefined";
}
var warnPrefix = "[Garfish warning]";
var processError = (error2, fn) => {
  try {
    if (typeof error2 === "string") {
      error2 = `${warnPrefix}: ${error2}

`;
      fn(error2, true);
    } else if (error2 instanceof Error) {
      if (!error2.message.startsWith(warnPrefix)) {
        error2.message = `${warnPrefix}: ${error2.message}`;
      }
      fn(error2, false);
    }
  } catch (e) {
    fn(error2, typeof error2 === "string");
  }
};
function warn(msg) {
  processError(msg, (e, isString) => {
    const warnMsg = isString ? e : e.message;
    if (false) {
      callTestCallback(warn, warnMsg);
      return;
    }
    console.warn(warnMsg);
  });
}
function error(error2) {
  processError(error2, (e, isString) => {
    if (isString) {
      throw new Error(e);
    } else {
      throw e;
    }
  });
}
function validURL(str) {
  const pattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
  return !!pattern.test(str);
}
function internFunc(internalizeString) {
  const temporaryOb = {};
  temporaryOb[internalizeString] = true;
  return Object.keys(temporaryOb)[0];
}
function evalWithEnv(code, params, context, useStrict = false) {
  const keys = Object.keys(params);
  const nativeWindow = (0, eval)("window;");
  const randomValKey = "__garfish__exec_temporary__";
  const values = keys.map((k) => `window.${randomValKey}.${k}`);
  const contextKey = "__garfish_exec_temporary_context__";
  try {
    nativeWindow[randomValKey] = params;
    nativeWindow[contextKey] = context;
    const evalInfo = [
      `;(function(${keys.join(",")}){${useStrict ? '"use strict";' : ""}`,
      `
}).call(window.${contextKey},${values.join(",")});`
    ];
    const internalizeString = internFunc(evalInfo[0] + code + evalInfo[1]);
    (0, eval)(internalizeString);
  } catch (e) {
    throw e;
  } finally {
    delete nativeWindow[randomValKey];
    delete nativeWindow[contextKey];
  }
}
function safeWrapper(callback) {
  try {
    callback();
  } catch (e) {
    (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
  }
}
function nextTick(cb) {
  Promise.resolve().then(cb);
}
function assert(condition, msg) {
  if (!condition) {
    error(msg || "unknow reason");
  }
}
function toBoolean(val) {
  if (val === "")
    return true;
  if (val === "false")
    return false;
  return Boolean(val);
}
function remove(list, el) {
  if (Array.isArray(list)) {
    const i = list.indexOf(el);
    if (i > -1) {
      list.splice(i, 1);
      return true;
    }
    return false;
  } else {
    if (list.has(el)) {
      list.delete(el);
      return true;
    }
    return false;
  }
}
function callTestCallback(obj, ...args) {
  if (false) {
    const oncalled = obj._oncalled;
    if (typeof oncalled === "function") {
      oncalled.apply(null, args);
    }
  }
}
function unique(list) {
  const res = [];
  for (let i = 0, len = list.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (list[i] === list[j]) {
        j = ++i;
      }
    }
    res.push(list[i]);
  }
  return false ? res.sort() : res;
}
function isPrimitive(val) {
  return val === null || typeof val === "string" || typeof val === "number" || typeof val === "bigint" || typeof val === "symbol" || typeof val === "boolean" || typeof val === "undefined";
}
function filterUndefinedVal(ob) {
  return Object.keys(ob).reduce((res, key) => {
    if (res[key] === void 0) {
      delete res[key];
    }
    return res;
  }, ob);
}
function deepMerge(o, n, dp, ignores) {
  const leftRecord = /* @__PURE__ */ new WeakMap();
  const rightRecord = /* @__PURE__ */ new WeakMap();
  const valueRecord = /* @__PURE__ */ new WeakMap();
  const ignoresMap = makeMap(ignores || []);
  const isArray = Array.isArray;
  const isAllRefs = (a, b) => {
    if (leftRecord.has(a) || rightRecord.has(a)) {
      return leftRecord.has(b) || rightRecord.has(b);
    }
  };
  const clone = (v) => {
    if (isPrimitive(v) || typeof v === "function") {
      return v;
    } else if (valueRecord.has(v)) {
      return valueRecord.get(v);
    } else if (leftRecord.has(v)) {
      return leftRecord.get(v);
    } else if (rightRecord.has(v)) {
      return rightRecord.get(v);
    } else if (isArray(v)) {
      if (dp)
        v = unique(v);
      const arr = [];
      valueRecord.set(v, arr);
      for (let i = 0, len = v.length; i < len; i++) {
        arr[i] = clone(v[i]);
      }
      return arr;
    } else if (typeof v === "object") {
      const obj = {};
      valueRecord.set(v, obj);
      const keys = Reflect.ownKeys(v);
      keys.forEach((key) => obj[key] = clone(v[key]));
      return obj;
    }
  };
  const setValue = (r, k, key) => {
    if (r.has(k)) {
      return r.get(k);
    } else {
      if (ignoresMap[key]) {
        return k;
      }
      const val = clone(k);
      if (!isPrimitive(val) && typeof val !== "function") {
        r.set(k, val);
      }
      return val;
    }
  };
  const mergeObject = (l, r) => {
    const res = {};
    const leftKeys = Reflect.ownKeys(l);
    const rightKeys = Reflect.ownKeys(r);
    leftRecord.set(l, res);
    rightRecord.set(r, res);
    leftKeys.forEach((key) => {
      const lv = l[key];
      const rv = r[key];
      if (hasOwn(r, key)) {
        if (isArray(lv) && isArray(rv)) {
          const item = clone([...lv, ...rv]);
          res[key] = dp ? unique(item) : item;
        } else if (isPlainObject(lv) && isPlainObject(rv)) {
          res[key] = isAllRefs(lv, rv) ? leftRecord.get(lv) : mergeObject(lv, rv);
        } else {
          res[key] = setValue(rightRecord, rv, key);
        }
      } else {
        res[key] = setValue(leftRecord, lv, key);
      }
    });
    rightKeys.forEach((key) => {
      if (hasOwn(res, key))
        return;
      res[key] = setValue(rightRecord, r[key], key);
    });
    return res;
  };
  return mergeObject(o, n);
}
function isAbsolute(url) {
  if (!/^[a-zA-Z]:\\/.test(url)) {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
      return true;
    }
  }
  return false;
}
function transformUrl(resolvePath, curPath) {
  const baseUrl = new URL(resolvePath, location.href);
  const realPath = new URL(curPath, baseUrl.href);
  return realPath.href;
}
function toWsProtocol(url) {
  const data = new URL(url);
  if (data.protocol.startsWith("http")) {
    data.protocol = data.protocol === "https:" ? "wss:" : "ws:";
    return data.toString();
  }
  return url;
}
function findTarget(el, selectors) {
  for (const s of selectors) {
    const target = el.querySelector(s);
    if (target)
      return target;
  }
  return el;
}
function setDocCurrentScript(target, code, define, url, async, originScript) {
  if (!target)
    return noop;
  const el = document.createElement("script");
  if (!url && code) {
    el.textContent = code;
  }
  originScript && originScript.getAttributeNames().forEach((attribute) => {
    el.setAttribute(attribute, originScript.getAttribute(attribute) || "");
  });
  if (async) {
    el.setAttribute("async", "true");
  }
  const set = (val) => {
    try {
      if (define) {
        Object.defineProperty(target, "currentScript", {
          value: val,
          writable: true,
          configurable: true
        });
      } else {
        target.currentScript = val;
      }
    } catch (e) {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        warn(e);
      }
    }
  };
  set(el);
  return () => safeWrapper(() => delete target.currentScript);
}
function _extends(d, b) {
  Object.setPrototypeOf(d, b);
  function fNOP() {
    this.constructor = d;
  }
  if (b === null) {
    d.prototype = Object.create(b);
  } else {
    if (b.prototype)
      fNOP.prototype = b.prototype;
    d.prototype = new fNOP();
  }
}
function mapObject(obj, fn) {
  const destObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      destObject[key] = fn(key, obj[key]);
    }
  }
  return destObject;
}
function toBase64(input, mimeType) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(new Blob([input], { type: mimeType }));
    reader.onload = () => resolve(reader.result);
  });
}
var hookObjectProperty = (obj, key, hookFunc) => {
  return (...params) => {
    if (!obj) {
      return noop;
    }
    const origin = obj[key];
    const hookedUnsafe = hookFunc(origin, ...params);
    let hooked = hookedUnsafe;
    if (typeof hooked === "function") {
      hooked = function(...args) {
        try {
          return hookedUnsafe.apply(this, args);
        } catch (e) {
          return typeof origin === "function" && origin.apply(this, args);
        }
      };
    }
    obj[key] = hooked;
    return (strict) => {
      if (!strict || hooked === obj[key]) {
        obj[key] = origin;
      }
    };
  };
};
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getGarfishDebugInstanceName() {
  const DEBUG_GARFISH_TAG = "__GARFISH_INSTANCE_DEBUG__";
  return localStorage.getItem(DEBUG_GARFISH_TAG) || getParameterByName(DEBUG_GARFISH_TAG);
}
function safari13Deal() {
  let fromSetFlag = false;
  return {
    triggerSet() {
      fromSetFlag = true;
    },
    handleDescriptor(descriptor) {
      if (fromSetFlag === true) {
        fromSetFlag = false;
        if ((descriptor == null ? void 0 : descriptor.writable) === false)
          descriptor.writable = true;
        if ((descriptor == null ? void 0 : descriptor.enumerable) === false)
          descriptor.enumerable = true;
        if ((descriptor == null ? void 0 : descriptor.configurable) === false)
          descriptor.configurable = true;
      }
    }
  };
}
var SOURCEMAP_REG = /[@#] sourceMappingURL=/g;
function haveSourcemap(code) {
  return SOURCEMAP_REG.test(code);
}
async function createSourcemap(code, filename) {
  const content = await toBase64(JSON.stringify({
    version: 3,
    sources: [filename],
    sourcesContent: [code],
    mappings: ";" + code.split("\n").map(() => "AACA").join(";")
  }));
  return `//@ sourceMappingURL=${content}`;
}

// src/queue.ts
var Queue = class {
  constructor() {
    this.fx = [];
    this.init = true;
    this.lock = false;
    this.finishDefers = /* @__PURE__ */ new Set();
  }
  next() {
    if (!this.lock) {
      this.lock = true;
      if (this.fx.length === 0) {
        this.init = true;
        this.finishDefers.forEach((d) => d.resolve());
        this.finishDefers.clear();
      } else {
        const fn = this.fx.shift();
        if (fn) {
          fn(() => {
            this.lock = false;
            this.next();
          });
        }
      }
    }
  }
  add(fn) {
    this.fx.push(fn);
    if (this.init) {
      this.lock = false;
      this.init = false;
      this.next();
    }
  }
  awaitCompletion() {
    if (this.init)
      return Promise.resolve();
    const defer = {};
    this.finishDefers.add(defer);
    return new Promise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });
  }
};

// src/sentry.ts
var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var UNKNOWN_FUNCTION = "?";
function extractMessage(ex) {
  const message = ex && ex.message;
  if (!message) {
    return "No error message";
  }
  if (message.error && typeof message.error.message === "string") {
    return message.error.message;
  }
  return message;
}
function computeStackTraceFromStackProp(ex) {
  if (!ex || !ex.stack) {
    return null;
  }
  const stack = [];
  const lines = ex.stack.split("\n");
  let isEval;
  let submatch;
  let parts;
  let element;
  for (let i = 0; i < lines.length; ++i) {
    if (parts = chrome.exec(lines[i])) {
      const isNative = parts[2] && parts[2].indexOf("native") === 0;
      isEval = parts[2] && parts[2].indexOf("eval") === 0;
      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        parts[2] = submatch[1];
      }
      let url = parts[2] && parts[2].indexOf("address at ") === 0 ? parts[2].substr("address at ".length) : parts[2];
      let func = parts[1] || UNKNOWN_FUNCTION;
      const isSafariExtension = func.indexOf("safari-extension") !== -1;
      const isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
      if (isSafariExtension || isSafariWebExtension) {
        func = func.indexOf("@") !== -1 ? func.split("@")[0] : UNKNOWN_FUNCTION;
        url = isSafariExtension ? `safari-extension:${url}` : `safari-web-extension:${url}`;
      }
      element = {
        url,
        func,
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = winjs.exec(lines[i])) {
      element = {
        url: parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = gecko.exec(lines[i])) {
      isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        parts[1] = parts[1] || "eval";
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = "";
      } else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
        stack[0].column = ex.columnNumber + 1;
      }
      element = {
        url: parts[3],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(",") : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      };
    } else {
      continue;
    }
    if (!element.func && element.line) {
      element.func = UNKNOWN_FUNCTION;
    }
    stack.push(element);
  }
  if (!stack.length) {
    return null;
  }
  return {
    message: extractMessage(ex),
    name: ex.name,
    stack
  };
}
var sourceListTags = [
  "link",
  "style",
  "script",
  "img",
  "video",
  "audio"
];
var sourceNode = makeMap(sourceListTags);
function computeErrorUrl(ex) {
  if (ex && ex.filename)
    return ex.filename;
  const res = computeStackTraceFromStackProp(ex);
  if (res) {
    const urls = res.stack.map((item) => {
      return item.url;
    });
    return urls[0] || null;
  } else if (ex && ex.target && ex.target.tagName) {
    const tagName = ex.target.tagName.toLowerCase();
    if (sourceNode(tagName)) {
      return ex.target.src || ex.target.href;
    }
  }
  return null;
}
function filterAndWrapEventListener(type, listener, sourceList) {
  const errorHandler = function(e) {
    if (typeof listener === "function") {
      if (sourceList) {
        console.log("**********", computeErrorUrl(e));
        const res = sourceList.find((item) => {
          return item.indexOf(computeErrorUrl(e)) !== -1;
        });
        if (res) {
          listener(e);
        }
      } else {
        listener(e);
      }
    }
  };
  const unhandledrejection = function(event) {
    event.promise.catch((e) => {
      if (e instanceof Error) {
        errorHandler(e);
      } else {
        if (typeof listener === "function")
          listener(event);
      }
    });
  };
  const filterError = function(event) {
    if (typeof listener === "function") {
      if (type === "unhandledrejection") {
        unhandledrejection(event);
      } else if (type === "error") {
        errorHandler(event);
      } else {
        listener(event);
      }
    }
  };
  return filterError;
}

// src/domApis.ts
var xChar = 120;
var colonChar = 58;
var ns = "http://www.w3.org/2000/svg";
var xlinkNS = "http://www.w3.org/1999/xlink";
var xmlNS = "http://www.w3.org/XML/1998/namespace";
var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
var isSVG = makeMap(SVG_TAGS.split(","));
function attributesString(attributes) {
  if (!attributes || attributes.length === 0)
    return "";
  return attributes.reduce((total, { key, value }) => {
    return total + (value ? `${key}="${value}" ` : key);
  }, "");
}
var DOMApis = class {
  constructor(cusDocument) {
    this.document = cusDocument || document;
  }
  isText(node) {
    return node && node.type === "text";
  }
  isNode(node) {
    return node && node.type === "element";
  }
  isCommentNode(node) {
    return node && node.type === "comment";
  }
  isCssLinkNode(node) {
    if (this.isNode(node) && node.tagName === "link") {
      return !!node.attributes.find(({ key, value }) => key === "rel" && value === "stylesheet");
    }
    return false;
  }
  isIconLinkNode(node) {
    if (this.isNode(node) && node.tagName === "link") {
      return !!node.attributes.find(({ key, value }) => key === "rel" && value === "icon");
    }
    return false;
  }
  isPrefetchJsLinkNode(node) {
    if (!this.isNode(node) || node.tagName !== "link")
      return false;
    let hasRelAttr, hasAsAttr;
    for (const { key, value } of node.attributes) {
      if (key === "rel") {
        hasRelAttr = true;
        if (value !== "preload" && value !== "prefetch") {
          return false;
        }
      } else if (key === "as") {
        hasAsAttr = true;
        if (value !== "script")
          return false;
      }
    }
    return Boolean(hasRelAttr && hasAsAttr);
  }
  isRemoteModule(node) {
    if (!this.isNode(node) || node.tagName !== "meta")
      return false;
    let hasNameAttr, hasSrcAttr;
    for (const { key, value } of node.attributes) {
      if (key === "name") {
        hasNameAttr = true;
        if (value !== "garfish-remote-module") {
          return false;
        }
      } else if (key === "src") {
        hasSrcAttr = true;
        if (typeof value === "undefined" || value === "") {
          return false;
        }
      }
    }
    return Boolean(hasNameAttr && hasSrcAttr);
  }
  removeElement(el) {
    const parentNode = el && el.parentNode;
    if (parentNode) {
      parentNode.removeChild(el);
    }
  }
  createElement(node) {
    const { tagName, attributes } = node;
    const el = isSVG(tagName) ? this.document.createElementNS(ns, tagName) : this.document.createElement(tagName);
    this.applyAttributes(el, attributes);
    return el;
  }
  createTextNode(node) {
    return this.document.createTextNode(node.content);
  }
  createStyleNode(content) {
    const el = this.document.createElement("style");
    content && (el.textContent = content);
    this.applyAttributes(el, [{ key: "type", value: "text/css" }]);
    return el;
  }
  createLinkCommentNode(node) {
    if (this.isNode(node)) {
      const ps = attributesString(node.attributes);
      return `<link ${ps.slice(0, -1)}></link>`;
    } else {
      node = node ? `src="${node}" ` : "";
      return this.document.createComment(`<link ${node}execute by garfish(dynamic)></link>`);
    }
  }
  createScriptCommentNode(node) {
    if (this.isNode(node)) {
      const { attributes, children } = node;
      const ps = attributesString(attributes);
      const code = (children == null ? void 0 : children[0]) ? children[0].content : "";
      return this.document.createComment(`<script ${ps} execute by garfish>${code}<\/script>`);
    } else {
      const { src, code } = node;
      const url = src ? `src="${src}" ` : "";
      return this.document.createComment(`<script ${url}execute by garfish(dynamic)>${code}<\/script>`);
    }
  }
  applyAttributes(el, attributes) {
    if (!attributes || attributes.length === 0)
      return;
    for (const { key, value } of attributes) {
      if (key) {
        if (value === null) {
          el.setAttribute(key, "");
        } else if (typeof value === "string") {
          if (key.charCodeAt(0) !== xChar) {
            el.setAttribute(key, value);
          } else if (key.charCodeAt(3) === colonChar) {
            el.setAttributeNS(xmlNS, key, value);
          } else if (key.charCodeAt(5) === colonChar) {
            el.setAttributeNS(xlinkNS, key, value);
          } else {
            el.setAttribute(key, value);
          }
        }
      }
    }
  }
};

// src/garfish.ts
var __LOADER_FLAG__ = Symbol.for("__LOADER_FLAG__");
var __GARFISH_FLAG__ = Symbol.for("__GARFISH_FLAG__");
var __MockHtml__ = "__garfishmockhtml__";
var __MockBody__ = "__garfishmockbody__";
var __MockHead__ = "__garfishmockhead__";
var __REMOVE_NODE__ = "__garfishremovenode__";

// src/mimeType.ts
function parseContentType(input) {
  input = input == null ? void 0 : input.trim();
  if (!input)
    return null;
  let idx = 0;
  let type = "";
  let subType = "";
  while (idx < input.length && input[idx] !== "/") {
    type += input[idx];
    idx++;
  }
  if (type.length === 0 || idx >= input.length) {
    return null;
  }
  idx++;
  while (idx < input.length && input[idx] !== ";") {
    subType += input[idx];
    idx++;
  }
  subType = subType.replace(/[ \t\n\r]+$/, "");
  if (subType.length === 0)
    return null;
  return {
    type: type.toLocaleLowerCase(),
    subtype: subType.toLocaleLowerCase()
  };
}
function isCss(mt) {
  return mt ? mt.type === "text" && mt.subtype === "css" : false;
}
function isHtml(mt) {
  return mt ? mt.type === "text" && mt.subtype === "html" : false;
}
function isJs(mt) {
  const { type, subtype } = mt || {};
  switch (type) {
    case "text": {
      switch (subtype) {
        case "ecmascript":
        case "javascript":
        case "javascript1.0":
        case "javascript1.1":
        case "javascript1.2":
        case "javascript1.3":
        case "javascript1.4":
        case "javascript1.5":
        case "jscript":
        case "livescript":
        case "x-ecmascript":
        case "x-javascript": {
          return true;
        }
        default: {
          return false;
        }
      }
    }
    case "application": {
      switch (subtype) {
        case "ecmascript":
        case "javascript":
        case "x-ecmascript":
        case "x-javascript": {
          return true;
        }
        default: {
          return false;
        }
      }
    }
    default: {
      return false;
    }
  }
}
function isJsonp(mt, src) {
  const callbackRegExp = /callback/;
  try {
    const search = new URL(src).search;
    const { type, subtype } = mt || {};
    if (type === "application" && subtype === "json" && callbackRegExp.test(search)) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}
function isJsType({ src = "", type }) {
  if (/\.js$/.test(src))
    return true;
  if (type) {
    if (type === "module")
      return true;
    const mimeTypeInfo = parseContentType(type);
    if (isJsonp(mimeTypeInfo, src))
      return true;
    if (isJs(mimeTypeInfo))
      return true;
  }
  return false;
}
function isCssType({ src = "", type }) {
  if (/\.css$/.test(src))
    return true;
  if (type) {
    const mimeTypeInfo = parseContentType(type);
    if (isCss(mimeTypeInfo))
      return true;
  }
  return false;
}
function isHtmlType({
  src = "",
  type
}) {
  if (/\.html$/.test(src))
    return true;
  if (type) {
    const mimeTypeInfo = parseContentType(type);
    if (isHtml(mimeTypeInfo))
      return true;
  }
  return false;
}
function isGarfishConfigType({
  type = ""
}) {
  return /garfish-config/i.test(type);
}

// src/dispatchEvents.ts
var reactEvents = [
  "onAbort",
  "onAnimationCancel",
  "onAnimationEnd",
  "onAnimationIteration",
  "onAuxClick",
  "onBlur",
  "onChange",
  "onClick",
  "onClose",
  "onContextMenu",
  "onDoubleClick",
  "onError",
  "onFocus",
  "onGotPointerCapture",
  "onInput",
  "onKeyDown",
  "onKeyPress",
  "onKeyUp",
  "onLoad",
  "onLoadEnd",
  "onLoadStart",
  "onLostPointerCapture",
  "onMouseDown",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onPointerCancel",
  "onPointerDown",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerMove",
  "onPointerOut",
  "onPointerOver",
  "onPointerUp",
  "onReset",
  "onResize",
  "onScroll",
  "onSelect",
  "onSelectionChange",
  "onSelectStart",
  "onSubmit",
  "onTouchCancel",
  "onTouchMove",
  "onTouchStart",
  "onTouchEnd",
  "onTransitionCancel",
  "onTransitionEnd",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onFocusOut"
];
var divergentNativeEvents = {
  onDoubleClick: "dblclick"
};
var mimickedReactEvents = {
  onInput: "onChange",
  onFocusOut: "onBlur",
  onSelectionChange: "onSelect"
};
function dispatchEvents(shadowRoot) {
  const removeEventListeners = [];
  reactEvents.forEach(function(reactEventName) {
    const nativeEventName = getNativeEventName(reactEventName);
    function retargetEvent(event) {
      const path = event.path || event.composedPath && event.composedPath() || composedPath(event.target);
      for (let i = 0; i < path.length; i++) {
        const el = path[i];
        let props = null;
        const reactComponent = findReactComponent(el);
        const eventHandlers = findReactEventHandlers(el);
        if (!eventHandlers) {
          props = findReactProps(reactComponent);
        } else {
          props = eventHandlers;
        }
        if (reactComponent && props) {
          dispatchEvent(event, reactEventName, props);
        }
        if (reactComponent && props && mimickedReactEvents[reactEventName]) {
          dispatchEvent(event, mimickedReactEvents[reactEventName], props);
        }
        if (event.cancelBubble) {
          break;
        }
        if (el === shadowRoot) {
          break;
        }
      }
    }
    shadowRoot.addEventListener(nativeEventName, retargetEvent, false);
    removeEventListeners.push(function() {
      shadowRoot.removeEventListener(nativeEventName, retargetEvent, false);
    });
  });
  return function() {
    removeEventListeners.forEach(function(removeEventListener) {
      removeEventListener();
    });
  };
}
function findReactEventHandlers(item) {
  return findReactProperty(item, "__reactEventHandlers");
}
function findReactComponent(item) {
  return findReactProperty(item, "_reactInternal");
}
function findReactProperty(item, propertyPrefix) {
  for (const key in item) {
    if (hasOwn(item, key) && key.indexOf(propertyPrefix) !== -1) {
      return item[key];
    }
  }
}
function findReactProps(component) {
  if (!component)
    return void 0;
  if (component.memoizedProps)
    return component.memoizedProps;
  if (component._currentElement && component._currentElement.props)
    return component._currentElement.props;
}
function dispatchEvent(event, eventType, componentProps) {
  event.persist = function() {
    event.isPersistent = () => true;
  };
  if (componentProps[eventType]) {
    componentProps[eventType](event);
  }
}
function getNativeEventName(reactEventName) {
  if (divergentNativeEvents[reactEventName]) {
    return divergentNativeEvents[reactEventName];
  }
  return reactEventName.replace(/^on/, "").toLowerCase();
}
function composedPath(el) {
  const path = [];
  while (el) {
    path.push(el);
    if (el.tagName === "HTML") {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}

// src/container.ts
var appContainerId = "garfish_app_for";
function createAppContainer(appInfo) {
  let htmlNode = document.createElement("div");
  const appContainer = document.createElement("div");
  if (appInfo.sandbox && appInfo.sandbox.strictIsolation) {
    htmlNode = document.createElement("html");
    const root = appContainer.attachShadow({ mode: "open" });
    root.appendChild(htmlNode);
    dispatchEvents(root);
  } else {
    htmlNode.setAttribute(__MockHtml__, "");
    appContainer.appendChild(htmlNode);
  }
  appContainer.id = `${appContainerId}_${appInfo.name}_${createKey()}`;
  return {
    htmlNode,
    appContainer
  };
}
function waitElementReady(selector, callback) {
  const elem = document.querySelector(selector);
  if (elem !== null) {
    callback(elem);
    return;
  }
  setTimeout(function() {
    waitElementReady(selector, callback);
  }, 50);
}
function delay(duration) {
  return new Promise(function(resolve) {
    setTimeout(resolve, duration);
  });
}
function waitElement(selector, timeout = 3e3) {
  const waitPromise = new Promise(function(resolve) {
    waitElementReady(selector, function(elem) {
      return resolve(elem);
    });
  });
  return Promise.race([delay(timeout), waitPromise]);
}
async function getRenderNode(domGetter) {
  assert(domGetter, `Invalid domGetter:
 ${domGetter}.`);
  let appWrapperNode;
  if (typeof domGetter === "string") {
    appWrapperNode = await waitElement(domGetter);
  } else if (typeof domGetter === "function") {
    appWrapperNode = await Promise.resolve(domGetter());
  }
  assert(appWrapperNode instanceof Element, `Invalid domGetter: ${domGetter}`);
  return appWrapperNode;
}

// src/templateParse.ts
function Attributes({ name, value }) {
  this.key = name;
  this.value = value;
}
var generateAttributes = (el) => {
  const list = [];
  const attrs = el.attributes;
  const len = attrs.length;
  if (len > 0) {
    if (len === 1) {
      list[0] = new Attributes(attrs[0]);
    } else if (len === 2) {
      list[0] = new Attributes(attrs[0]);
      list[1] = new Attributes(attrs[1]);
    } else {
      for (let i = 0; i < len; i++) {
        list[i] = new Attributes(attrs[i]);
      }
    }
  }
  return list;
};
var createElement = (el, filter) => {
  switch (el.nodeType) {
    case 3 /* TEXT */:
      return {
        type: "text",
        content: el.textContent
      };
    case 8 /* COMMENT */:
      return {
        type: "comment",
        content: el.textContent
      };
    case 1 /* ELEMENT */:
      return filter({
        type: "element",
        tagName: el.tagName.toLowerCase(),
        attributes: generateAttributes(el),
        children: Array.from(el.childNodes).map((node) => {
          return createElement(node, filter);
        })
      });
    default:
      error(`Invalid node type "${el.nodeType}"`);
  }
};
function templateParse(code, tags) {
  let astTree = [];
  const htmlNode = document.createElement("html");
  const collectionEls = {};
  const filter = (el) => {
    if (tags.includes(el.tagName)) {
      collectionEls[el.tagName].push(el);
    }
    return el;
  };
  htmlNode.innerHTML = code;
  for (const tag of tags) {
    collectionEls[tag] = [];
  }
  astTree = Array.from(htmlNode.childNodes).map((node) => {
    return createElement(node, filter);
  });
  return [astTree, collectionEls];
}

// src/logger.ts
var import_debug = __toESM(require("debug"));
var log = (0, import_debug.default)("garfish");
var coreLog = log.extend("core");
var routerLog = log.extend("router");

// src/lock.ts
var Lock = class {
  constructor() {
    this.id = 0;
    this.lockQueue = [];
  }
  genId() {
    return ++this.id;
  }
  getId() {
    return this.id;
  }
  async wait(id) {
    const { lockQueue } = this;
    const firstLock = lockQueue[0];
    const lastLock = firstLock ? lockQueue[lockQueue.length - 1] : void 0;
    if ((firstLock == null ? void 0 : firstLock.id) === id)
      return;
    let lockItem = lockQueue.find((item) => item.id === id);
    if (!lockItem) {
      let promiseResolve = () => {
      };
      const waiting = new Promise((resolve) => {
        promiseResolve = resolve;
      });
      lockItem = { id, waiting, resolve: promiseResolve };
      lockQueue.push(lockItem);
    }
    if (lastLock) {
      await lastLock.waiting;
    }
  }
  release() {
    const { lockQueue } = this;
    const firstLock = lockQueue[0];
    if (!firstLock)
      return;
    lockQueue.shift();
    firstLock.resolve();
  }
  clear() {
    this.lockQueue = [];
  }
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DOMApis,
  Lock,
  Queue,
  __GARFISH_FLAG__,
  __LOADER_FLAG__,
  __MockBody__,
  __MockHead__,
  __MockHtml__,
  __REMOVE_NODE__,
  _extends,
  appContainerId,
  assert,
  callTestCallback,
  computeErrorUrl,
  computeStackTraceFromStackProp,
  coreLog,
  createAppContainer,
  createKey,
  createSourcemap,
  deepMerge,
  def,
  error,
  evalWithEnv,
  filterAndWrapEventListener,
  filterUndefinedVal,
  findTarget,
  getGarfishDebugInstanceName,
  getParameterByName,
  getRenderNode,
  getType,
  hasOwn,
  haveSourcemap,
  hookObjectProperty,
  idleCallback,
  inBrowser,
  internFunc,
  isAbsolute,
  isCss,
  isCssType,
  isGarfishConfigType,
  isHtml,
  isHtmlType,
  isJs,
  isJsType,
  isJsonp,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  makeMap,
  makeMapObject,
  mapObject,
  nextTick,
  noop,
  objectToString,
  parseContentType,
  remove,
  routerLog,
  safari13Deal,
  safeWrapper,
  setDocCurrentScript,
  sourceListTags,
  sourceNode,
  supportWasm,
  templateParse,
  toBase64,
  toBoolean,
  toWsProtocol,
  transformUrl,
  unique,
  validURL,
  warn
});
//# sourceMappingURL=index.js.map
