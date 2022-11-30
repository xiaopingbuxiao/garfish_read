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

// src/pluginify.ts
import { warn as warn6 } from "@garfish/utils";

// src/sandbox.ts
import { Loader } from "@garfish/loader";
import {
  warn as warn5,
  hasOwn as hasOwn6,
  makeMap as makeMap7,
  isObject as isObject3,
  deepMerge,
  evalWithEnv,
  safeWrapper as safeWrapper3,
  isPlainObject,
  setDocCurrentScript
} from "@garfish/utils";

// src/modules/history.ts
import { hasOwn as hasOwn2, makeMap as makeMap3 } from "@garfish/utils";

// src/proxyInterceptor/shared.ts
import { warn, makeMap as makeMap2, isObject } from "@garfish/utils";

// src/utils.ts
import { hasOwn, makeMap, nextTick } from "@garfish/utils";

// src/symbolTypes.ts
var GARFISH_NAMESPACE_PREFIX = "__Garfish__";
var GARFISH_OPTIMIZE_NAME = "__garfish_optimize__";
var __proxyNode__ = Symbol.for("garfish.proxyNode");
var __domWrapper__ = Symbol.for("garfish.domWrapper");
var __windowBind__ = Symbol.for("garfish.windowBind");
var __sandboxMap__ = Symbol.for("garfish.sandboxMap");
var __documentBind__ = Symbol.for("garfish.documentBind");
var __garfishGlobal__ = Symbol.for("garfish.globalObject");
var __elementSandboxTag__ = Symbol.for("garfish.elementSandboxTag");

// src/utils.ts
var esGlobalMethods = "eval,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Array,ArrayBuffer,BigInt,BigInt64Array,BigUint64Array,Boolean,DataView,Date,Error,EvalError,FinalizationRegistry,Float32Array,Float64Array,Function,Int8Array,Int16Array,Int32Array,Map,Number,Object,Promise,Proxy,RangeError,ReferenceError,RegExp,Set,SharedArrayBuffer,String,Symbol,SyntaxError,TypeError,Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array,URIError,WeakMap,WeakRef,WeakSet,Atomics,JSON,Math,Reflect,".split(",");
var nativeCodeMethods = "hasOwnProperty,".split(",");
var isEsGlobalMethods = makeMap(esGlobalMethods);
var isNativeCodeMethods = makeMap(nativeCodeMethods);
var optimizeMethods = [...esGlobalMethods].filter((v) => v !== "eval");
var sandboxList = /* @__PURE__ */ new Map();
if (!window[__sandboxMap__]) {
  window[__sandboxMap__] = sandboxList;
} else {
  sandboxList = window[__sandboxMap__];
}
var sandboxMap = {
  sandboxMap: sandboxList,
  get(element) {
    if (!element)
      return;
    const sandboxId = element[__elementSandboxTag__];
    if (typeof sandboxId !== "number")
      return;
    return this.sandboxMap.get(sandboxId);
  },
  setElementTag(element, sandbox) {
    if (!element)
      return;
    element[__elementSandboxTag__] = sandbox.id;
  },
  set(sandbox) {
    if (this.sandboxMap.get(sandbox.id))
      return;
    this.sandboxMap.set(sandbox.id, sandbox);
  },
  del(sandbox) {
    this.sandboxMap.delete(sandbox.id);
  }
};
function handlerParams(args) {
  args = Array.isArray(args) ? args : Array.from(args);
  return args.map((v) => {
    return v && v[__proxyNode__] ? v[__proxyNode__] : v;
  });
}
function rootElm(sandbox) {
  const container = sandbox && sandbox.options.el;
  return container && container();
}
function createFakeObject(target, filter, isWritable) {
  const fakeObject = {};
  const propertyMap = {};
  const storageBox = /* @__PURE__ */ Object.create(null);
  const propertyNames = Object.getOwnPropertyNames(target);
  const def2 = (p) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, p);
    if (descriptor == null ? void 0 : descriptor.configurable) {
      const hasGetter = hasOwn(descriptor, "get");
      const hasSetter = hasOwn(descriptor, "set");
      const canWritable = typeof isWritable === "function" && isWritable(p);
      if (hasGetter) {
        descriptor.get = () => hasOwn(storageBox, p) ? storageBox[p] : target[p];
      }
      if (hasSetter) {
        descriptor.set = (val) => {
          storageBox[p] = val;
          return true;
        };
      }
      if (canWritable) {
        if (descriptor.writable === false) {
          descriptor.writable = true;
        } else if (hasGetter) {
          descriptor.set = (val) => {
            storageBox[p] = val;
            return true;
          };
        }
      }
      Object.defineProperty(fakeObject, p, Object.freeze(descriptor));
    }
  };
  propertyNames.forEach((p) => {
    propertyMap[p] = true;
    typeof filter === "function" ? !filter(p) && def2(p) : def2(p);
  });
  for (const prop in target) {
    !propertyMap[prop] && def2(prop);
  }
  return fakeObject;
}
var setting = true;
function microTaskHtmlProxyDocument(proxyDocument) {
  const html = document.children[0];
  if (html && html.parentNode !== proxyDocument) {
    Object.defineProperty(html, "parentNode", {
      value: proxyDocument,
      configurable: true
    });
    if (setting) {
      setting = false;
      nextTick(() => {
        setting = true;
        Object.defineProperty(html, "parentNode", {
          value: document,
          configurable: true
        });
      });
    }
  }
}
function isStyledComponentsLike(element) {
  var _a;
  return element instanceof HTMLStyleElement && !element.textContent && ((_a = element.sheet) == null ? void 0 : _a.cssRules.length);
}

// src/proxyInterceptor/shared.ts
function isDataDescriptor(desc) {
  if (desc === void 0)
    return false;
  return "value" in desc || "writable" in desc;
}
function isAccessorDescriptor(desc) {
  if (desc === void 0)
    return false;
  return "get" in desc || "set" in desc;
}
function verifyGetterDescriptor(target, p, newValue) {
  const desc = Object.getOwnPropertyDescriptor(target, p);
  if (desc !== void 0 && desc.configurable === false) {
    if (isDataDescriptor(desc) && desc.writable === false) {
      if (!Object.is(newValue, desc.value)) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`property "${String(p)}" is non-configurable and non-writable.`);
        }
        return 1;
      }
    } else if (isAccessorDescriptor(desc) && desc.get === void 0) {
      return 2;
    }
  }
  return 0;
}
function verifySetter(proxyTarget, target, p, val, receiver) {
  const verifyResult = verifySetterDescriptor(proxyTarget ? proxyTarget : receiver || target, p, val);
  let result;
  if (verifyResult > 0) {
    if (verifyResult === 1 || verifyResult === 2)
      result = false;
    if (verifyResult === 3)
      result = true;
  }
  return result;
}
function verifySetterDescriptor(target, p, newValue) {
  const desc = Object.getOwnPropertyDescriptor(target, p);
  if (desc !== void 0 && desc.configurable === false) {
    if (isDataDescriptor(desc) && desc.writable === false) {
      if (!Object.is(newValue, desc.value)) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`property "${String(p)}" is non-configurable and non-writable.`);
        }
        return 1;
      } else {
        return 3;
      }
    } else if (isAccessorDescriptor(desc) && desc.set === void 0) {
      return 2;
    }
  }
  return 0;
}
function safeToString(thing) {
  try {
    return thing.toString();
  } catch (e) {
    return "[toString failed]";
  }
}
function isConstructor(fn) {
  const fp = fn.prototype;
  const hasConstructor = fp && fp.constructor === fn && Object.getOwnPropertyNames(fp).length > 1;
  const functionStr = !hasConstructor && safeToString(fn);
  return hasConstructor || /^function\s+[A-Z]/.test(functionStr) || /^class\b/.test(functionStr);
}
var buildInProps = makeMap2([
  "length",
  "caller",
  "callee",
  "arguments",
  "prototype",
  Symbol.hasInstance
]);
function transferProps(o, n) {
  for (const key of Reflect.ownKeys(o)) {
    if (buildInProps(key))
      continue;
    const desc = Object.getOwnPropertyDescriptor(n, key);
    if (desc && desc.writable) {
      n[key] = o[key];
    }
  }
}
function bind(fn, context) {
  const fNOP = function() {
  };
  function bound() {
    const args = handlerParams(arguments);
    if (this instanceof bound) {
      const obj = new fn(...args);
      Object.setPrototypeOf(obj, bound.prototype);
      return obj;
    } else {
      return fn.apply(context, args);
    }
  }
  bound.$native = fn;
  transferProps(fn, bound);
  if (fn.prototype) {
    fNOP.prototype = fn.prototype;
  }
  bound.prototype = new fNOP();
  if (Symbol.hasInstance) {
    Object.defineProperty(bound, Symbol.hasInstance, {
      configurable: true,
      value(instance) {
        const op = fn.prototype;
        return isObject(op) || typeof op === "function" ? instance instanceof fn : false;
      }
    });
  }
  return bound;
}

// src/modules/history.ts
var passedKey = makeMap3(["scrollRestoration"]);
function historyModule() {
  const proto = Object.getPrototypeOf(window.history) || History.prototype;
  const fakeHistory = Object.create(proto);
  const proxyHistory = new Proxy(fakeHistory, {
    get(target, p) {
      const value = hasOwn2(target, p) ? target[p] : window.history[p];
      return typeof value === "function" ? value.bind(window.history) : value;
    },
    set(target, p, value, receiver) {
      const isPassKey = typeof p === "string" && passedKey(p);
      const verifySetterResult = verifySetter(isPassKey ? history : null, target, p, value, receiver);
      if (verifySetterResult !== void 0) {
        return verifySetterResult;
      } else {
        return isPassKey ? Reflect.set(history, p, value) : Reflect.set(target, p, value, receiver);
      }
    },
    getPrototypeOf() {
      return fakeHistory;
    }
  });
  const fakeHistoryCtor = function History2() {
    throw new TypeError("Illegal constructor");
  };
  fakeHistoryCtor.prototype = fakeHistory;
  fakeHistoryCtor.prototype.constructor = fakeHistoryCtor;
  return {
    override: {
      history: proxyHistory,
      History: fakeHistoryCtor
    }
  };
}

// src/modules/network.ts
import {
  hasOwn as hasOwn3,
  isPromise,
  isAbsolute,
  transformUrl,
  toWsProtocol
} from "@garfish/utils";
function networkModule(sandbox) {
  const baseUrl = sandbox.options.baseUrl;
  const wsSet = /* @__PURE__ */ new Set();
  const xhrSet = /* @__PURE__ */ new Set();
  const fetchSet = /* @__PURE__ */ new Set();
  const needFix = (url) => sandbox.options.fixBaseUrl && baseUrl && typeof url === "string" && !isAbsolute(url);
  class fakeXMLHttpRequest extends XMLHttpRequest {
    constructor() {
      super();
      xhrSet.add(this);
    }
    open() {
      if (arguments[2] === false) {
        xhrSet.delete(this);
      }
      if (needFix(arguments[1])) {
        arguments[1] = baseUrl ? transformUrl(baseUrl, arguments[1]) : arguments[1];
      }
      const url = arguments[1];
      if (sandbox.options.addSourceList) {
        sandbox.options.addSourceList({
          tagName: "xmlhttprequest",
          url
        });
      }
      return super.open.apply(this, arguments);
    }
    abort() {
      xhrSet.delete(this);
      return super.abort.apply(this, arguments);
    }
  }
  class fakeWebSocket extends WebSocket {
    constructor(url, protocols) {
      if (needFix(url) && baseUrl) {
        const baseWsUrl = toWsProtocol(baseUrl);
        url = transformUrl(baseWsUrl, arguments[1]);
      }
      super(url, protocols);
      wsSet.add(this);
    }
    close() {
      wsSet.delete(this);
      return super.close.apply(this, arguments);
    }
  }
  const fakeFetch = (input, options = {}) => {
    if (needFix(input) && baseUrl) {
      input = transformUrl(baseUrl, input);
    }
    if (sandbox.options.addSourceList) {
      sandbox.options.addSourceList({ tagName: "fetch", url: input });
    }
    let controller;
    if (!hasOwn3(options, "signal") && window.AbortController) {
      controller = new window.AbortController();
      fetchSet.add(controller);
      options.signal = controller.signal;
    }
    const result = window.fetch(input, options);
    return controller && isPromise(result) ? result.finally(() => fetchSet.delete(controller)) : result;
  };
  return {
    override: {
      WebSocket: fakeWebSocket,
      XMLHttpRequest: fakeXMLHttpRequest,
      fetch: fakeFetch
    },
    recover() {
      wsSet.forEach((ws) => {
        if (typeof ws.close === "function")
          ws.close();
      });
      xhrSet.forEach((xhr) => {
        if (typeof xhr.abort === "function")
          xhr.abort();
      });
      fetchSet.forEach((ctor) => {
        if (typeof ctor.abort === "function")
          ctor.abort();
      });
      wsSet.clear();
      xhrSet.clear();
      fetchSet.clear();
    }
  };
}

// src/proxyInterceptor/document.ts
import {
  hasOwn as hasOwn4,
  makeMap as makeMap4,
  isObject as isObject2,
  findTarget,
  safari13Deal,
  __MockBody__,
  __MockHead__
} from "@garfish/utils";
var passedKey2 = makeMap4(["title", "cookie", "onselectstart", "ondragstart"]);
var queryFunctions = makeMap4([
  "querySelector",
  "querySelectorAll",
  "getElementById",
  "getElementsByTagName",
  "getElementsByTagNameNS",
  "getElementsByClassName"
]);
function createGetter(sandbox) {
  return (target, p, receiver) => {
    if (p === "activeElement") {
      return Reflect.get(document, p);
    }
    const rootNode = rootElm(sandbox);
    const strictIsolation = sandbox.options.strictIsolation;
    const value = hasOwn4(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(document, p);
    const hooksRes = sandbox.hooks.lifecycle.documentGetter.emit({
      value,
      rootNode,
      propName: p,
      proxyDocument: target,
      customValue: null
    });
    if (hooksRes.customValue) {
      return hooksRes.customValue;
    }
    const setSandboxRef = (el) => {
      if (isObject2(el)) {
        sandboxMap.setElementTag(el, sandbox);
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          el.__SANDBOX__ = true;
        }
      }
      return el;
    };
    if (rootNode) {
      if (p === "createElement") {
        return function(tagName, options) {
          const el = value.call(document, tagName, options);
          return setSandboxRef(el);
        };
      } else if (p === "createTextNode") {
        return function(data) {
          const el = value.call(document, data);
          return setSandboxRef(el);
        };
      } else if (p === "head") {
        return findTarget(rootNode, ["head", `div[${__MockHead__}]`]) || value;
      }
      if (strictIsolation) {
        if (p === "body") {
          return findTarget(rootNode, ["body", `div[${__MockBody__}]`]);
        } else if (queryFunctions(p)) {
          return p === "getElementById" ? (id2) => rootNode.querySelector(`#${id2}`) : rootNode[p].bind(rootNode);
        }
      }
    }
    if (typeof value === "function") {
      let newValue = hasOwn4(value, __documentBind__) ? value[__documentBind__] : null;
      if (!newValue)
        newValue = bind(value, document);
      const verifyResult = verifyGetterDescriptor(target, p, newValue);
      if (verifyResult > 0) {
        if (verifyResult === 1)
          return value;
        if (verifyResult === 2)
          return void 0;
      }
      value[__documentBind__] = newValue;
      return newValue;
    }
    return value;
  };
}
var safariProxyDocumentDealHandler = safari13Deal();
function createSetter(sandbox) {
  return (target, p, value, receiver) => {
    const rootNode = rootElm(sandbox);
    const verifyResult = verifySetterDescriptor(typeof p === "string" && passedKey2(p) ? document : receiver || target, p, value);
    if (verifyResult > 0) {
      if (verifyResult === 1 || verifyResult === 2)
        return false;
      if (verifyResult === 3)
        return true;
    }
    if (p === "onselectstart" || p === "ondragstart") {
      if (rootNode) {
        return Reflect.set(rootNode, p, value);
      } else {
        return Reflect.set(document, p, value);
      }
    }
    if (typeof p === "string" && passedKey2(p)) {
      return Reflect.set(document, p, value);
    } else {
      safariProxyDocumentDealHandler.triggerSet();
      return Reflect.set(target, p, value, receiver);
    }
  };
}
function createDefineProperty() {
  return (target, p, descriptor) => {
    safariProxyDocumentDealHandler.handleDescriptor(descriptor);
    return passedKey2(p) ? Reflect.defineProperty(document, p, descriptor) : Reflect.defineProperty(target, p, descriptor);
  };
}
function createHas() {
  return (target, p) => {
    if (p === "activeElement")
      return Reflect.has(document, p);
    return hasOwn4(target, p) || Reflect.has(document, p);
  };
}

// src/modules/document.ts
var documentModule = (sandbox) => {
  let proxyDocument = Object.create(document);
  const getter = createGetter(sandbox);
  const fakeDocument = createFakeObject(document);
  const fakeDocumentProto = new Proxy(fakeDocument, {
    get: (...args) => {
      microTaskHtmlProxyDocument(proxyDocument);
      return getter(...args);
    },
    has: createHas()
  });
  proxyDocument = new Proxy(Object.create(fakeDocumentProto, {
    currentScript: {
      value: null,
      writable: true
    },
    [__proxyNode__]: {
      writable: false,
      configurable: false,
      value: document
    }
  }), {
    set: createSetter(sandbox),
    defineProperty: createDefineProperty(),
    getPrototypeOf() {
      return HTMLDocument.prototype || Document.prototype;
    }
  });
  return {
    override: {
      document: proxyDocument
    }
  };
};

// src/modules/uiEvent.ts
import { getType } from "@garfish/utils";
var MouseEventPatch = class extends MouseEvent {
  constructor(typeArg, mouseEventInit) {
    if (mouseEventInit && getType(mouseEventInit.view) === "window") {
      mouseEventInit.view = window;
    }
    super(typeArg, mouseEventInit);
  }
};
function UiEventOverride() {
  return {
    override: {
      MouseEvent: MouseEventPatch
    }
  };
}

// src/modules/storage.ts
var CusStorage = class {
  constructor(namespace, rawStorage) {
    this.rawStorage = rawStorage;
    this.namespace = namespace;
    this.prefix = `${GARFISH_NAMESPACE_PREFIX}${namespace}__`;
  }
  get length() {
    return this.getKeys().length;
  }
  getKeys() {
    return Object.keys(this.rawStorage).filter((key) => key.startsWith(this.prefix));
  }
  key(n) {
    const key = this.getKeys()[n];
    return key ? key.substring(this.prefix.length) : null;
  }
  getItem(keyName) {
    return this.rawStorage.getItem(`${this.prefix + keyName}`);
  }
  setItem(keyName, keyValue) {
    this.rawStorage.setItem(`${this.prefix + keyName}`, keyValue);
  }
  removeItem(keyName) {
    this.rawStorage.removeItem(`${this.prefix + keyName}`);
  }
  clear() {
    this.getKeys().forEach((key) => {
      this.rawStorage.removeItem(key);
    });
  }
};
function localStorageModule(sandbox) {
  const namespace = sandbox.options.namespace;
  return {
    override: {
      localStorage: new CusStorage(namespace, localStorage),
      sessionStorage: new CusStorage(namespace, sessionStorage)
    }
  };
}

// src/modules/eventListener.ts
function listenerModule(_sandbox) {
  const listeners = /* @__PURE__ */ new Map();
  const rawAddEventListener = window.addEventListener;
  const rawRemoveEventListener = window.removeEventListener;
  function addListener(type, listener, options) {
    const curListeners = listeners.get(type) || [];
    listeners.set(type, [...curListeners, listener]);
    rawAddEventListener.call(this, type, listener, options);
  }
  function removeListener(type, listener, options) {
    const curListeners = listeners.get(type) || [];
    const idx = curListeners.indexOf(listener);
    if (idx !== -1) {
      curListeners.splice(idx, 1);
    }
    listeners.set(type, [...curListeners]);
    rawRemoveEventListener.call(this, type, listener, options);
  }
  const recover = () => {
    listeners.forEach((listener, key) => {
      listener.forEach((fn) => {
        rawRemoveEventListener.call(window, key, fn);
      });
    });
    listeners.clear();
  };
  return {
    recover,
    override: {
      addEventListener: addListener.bind(window),
      removeEventListener: removeListener.bind(window)
    },
    created(global) {
      const fakeDocument = global == null ? void 0 : global.document;
      if (fakeDocument) {
        fakeDocument.addEventListener = addListener.bind(document);
        fakeDocument.removeEventListener = removeListener.bind(document);
      }
    }
  };
}

// src/modules/mutationObserver.ts
function observerModule(_sandbox) {
  const observerSet = /* @__PURE__ */ new Set();
  class ProxyMutationObserver extends MutationObserver {
    constructor(cb) {
      super(cb);
      observerSet.add(this);
    }
  }
  const recover = () => {
    observerSet.forEach((observer) => {
      if (typeof observer.disconnect === "function")
        observer.disconnect();
    });
    observerSet.clear();
  };
  return {
    recover,
    override: {
      MutationObserver: ProxyMutationObserver
    }
  };
}

// src/modules/timer.ts
var rawSetTimeout = window.setTimeout;
var rawClearTimeout = window.clearTimeout;
var rawSetInterval = window.setInterval;
var rawClearInterval = window.clearInterval;
var timeoutModule = () => {
  const timeout = /* @__PURE__ */ new Set();
  const setTimeout2 = (handler, ms, ...args) => {
    const timeoutId = rawSetTimeout(handler, ms, ...args);
    timeout.add(timeoutId);
    return timeoutId;
  };
  const clearTimeout = (timeoutId) => {
    timeout.delete(timeoutId);
    rawClearTimeout(timeoutId);
  };
  const recover = () => {
    timeout.forEach((timeoutId) => {
      rawClearTimeout(timeoutId);
    });
  };
  return {
    recover,
    override: {
      setTimeout: setTimeout2,
      clearTimeout
    }
  };
};
var intervalModule = () => {
  const timeout = /* @__PURE__ */ new Set();
  const setInterval = (callback, ms, ...args) => {
    const intervalId = rawSetInterval(callback, ms, ...args);
    timeout.add(intervalId);
    return intervalId;
  };
  const clearInterval = (intervalId) => {
    timeout.delete(intervalId);
    rawClearInterval(intervalId);
  };
  const recover = () => {
    timeout.forEach((intervalId) => {
      rawClearInterval(intervalId);
    });
  };
  return {
    recover,
    override: {
      setInterval,
      clearInterval,
      setImmediate: (fn) => setTimeout(fn, 0)
    }
  };
};

// src/dynamicNode/index.ts
import { makeMap as makeMap6, safeWrapper as safeWrapper2, warn as warn3 } from "@garfish/utils";
import { StyleManager as StyleManager2 } from "@garfish/loader";

// src/dynamicNode/processParams.ts
function injectHandlerParams() {
  if (window.MutationObserver) {
    const rawObserver = window.MutationObserver.prototype.observe;
    MutationObserver.prototype.observe = function() {
      return rawObserver.apply(this, handlerParams(arguments));
    };
  }
  const desc = Object.getOwnPropertyDescriptor(window.Document.prototype, "activeElement");
  const rawActiveEl = desc && desc.get;
  if (rawActiveEl) {
    Object.defineProperty(window.Document.prototype, "activeElement", {
      get(...args) {
        return rawActiveEl.apply(handlerParams([this])[0], handlerParams(args));
      }
    });
  }
}

// src/dynamicNode/processor.ts
import { StyleManager } from "@garfish/loader";
import {
  def,
  warn as warn2,
  DOMApis,
  makeMap as makeMap5,
  isJsType,
  isCssType,
  safeWrapper,
  findTarget as findTarget2,
  __MockBody__ as __MockBody__2,
  __MockHead__ as __MockHead__2,
  transformUrl as transformUrl2,
  sourceListTags,
  __REMOVE_NODE__
} from "@garfish/utils";
var isInsertMethod = makeMap5(["insertBefore", "insertAdjacentElement"]);
var rawElementMethods = /* @__PURE__ */ Object.create(null);
var DynamicNodeProcessor = class {
  constructor(el, sandbox, methodName) {
    this.nativeAppend = rawElementMethods["appendChild"];
    this.nativeRemove = rawElementMethods["removeChild"];
    this.el = el;
    this.sandbox = sandbox;
    this.methodName = methodName;
    this.rootElement = rootElm(sandbox) || document;
    this.DOMApis = new DOMApis(sandbox.global.document);
    this.tagName = el.tagName ? el.tagName.toLowerCase() : "";
  }
  is(tag) {
    return this.tagName === tag;
  }
  fixResourceNodeUrl(el) {
    const baseUrl = this.sandbox.options.baseUrl;
    if (baseUrl) {
      const src = el.getAttribute("src");
      const href = el.getAttribute("href");
      src && (el.src = transformUrl2(baseUrl, src));
      href && (el.href = transformUrl2(baseUrl, href));
      const url = el.src || el.href;
      if (url && this.sandbox.options.addSourceList) {
        this.sandbox.options.addSourceList({
          tagName: el.tagName,
          url
        });
      }
    }
  }
  dispatchEvent(type, errInfo) {
    Promise.resolve().then(() => {
      const isError = type === "error";
      let event;
      if (isError && errInfo) {
        event = new ErrorEvent(type, __spreadProps(__spreadValues({}, errInfo), {
          message: errInfo.error.message
        }));
      } else {
        event = new Event(type);
      }
      event.__byGarfish__ = true;
      Object.defineProperty(event, "target", { value: this.el });
      this.el.dispatchEvent(event);
      isError && window.dispatchEvent(event);
    });
  }
  addDynamicLinkNode(callback) {
    const { href, type } = this.el;
    if (!type || isCssType({ src: href, type })) {
      if (href) {
        const { baseUrl, namespace, styleScopeId } = this.sandbox.options;
        const fetchUrl = baseUrl ? transformUrl2(baseUrl, href) : href;
        this.sandbox.loader.load({
          scope: namespace,
          url: fetchUrl,
          defaultContentType: type
        }).then(({ resourceManager: styleManager }) => {
          if (styleManager) {
            styleManager.correctPath();
            if (styleScopeId) {
              styleManager.setScope({
                appName: namespace,
                rootElId: styleScopeId()
              });
            }
            callback(styleManager.renderAsStyleElement());
          } else {
            warn2(`Invalid resource type "${type}", "${href}" can't generate styleManager`);
          }
          this.dispatchEvent("load");
        }).catch((e) => {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn2(e);
          this.dispatchEvent("error", {
            error: e,
            filename: fetchUrl
          });
        });
      }
    } else {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        warn2(`Invalid resource type "${type}", "${href}"`);
      }
    }
    const linkCommentNode = this.DOMApis.createLinkCommentNode(href);
    this.el[__REMOVE_NODE__] = () => this.DOMApis.removeElement(linkCommentNode);
    return linkCommentNode;
  }
  addDynamicScriptNode() {
    const { src, type, crossOrigin } = this.el;
    const isModule2 = type === "module";
    const code = this.el.textContent || this.el.text || "";
    if (!type || isJsType({ src, type })) {
      const { baseUrl, namespace } = this.sandbox.options;
      if (src) {
        const fetchUrl = baseUrl ? transformUrl2(baseUrl, src) : src;
        this.sandbox.loader.load({
          scope: namespace,
          url: fetchUrl,
          crossOrigin,
          defaultContentType: type
        }).then((manager) => {
          if (manager.resourceManager) {
            const {
              resourceManager: { url, scriptCode }
            } = manager;
            this.sandbox.execScript(scriptCode, {}, url, {
              isModule: isModule2,
              noEntry: true,
              originScript: this.el
            });
          } else {
            warn2(`Invalid resource type "${type}", "${src}" can't generate scriptManager`);
          }
          this.dispatchEvent("load");
        }, (e) => {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn2(e);
          this.dispatchEvent("error", {
            error: e,
            filename: fetchUrl
          });
        });
      } else if (code) {
        this.sandbox.execScript(code, {}, baseUrl, { noEntry: true, originScript: this.el });
      }
      const scriptCommentNode = this.DOMApis.createScriptCommentNode({
        src,
        code
      });
      this.el[__REMOVE_NODE__] = () => this.DOMApis.removeElement(scriptCommentNode);
      return scriptCommentNode;
    }
    return this.el;
  }
  monitorChangesOfLinkNode() {
    if (this.el.modifyFlag)
      return;
    const mutator = new MutationObserver((mutations) => {
      var _a;
      if (this.el.modifyFlag)
        return;
      for (const { type, attributeName } of mutations) {
        if (type === "attributes") {
          if (attributeName === "rel" || attributeName === "stylesheet") {
            if (this.el.modifyFlag)
              return;
            if (this.el.rel === "stylesheet" && this.el.href) {
              this.el.disabled = this.el.modifyFlag = true;
              const commentNode = this.addDynamicLinkNode((styleNode) => {
                var _a2;
                (_a2 = commentNode.parentNode) == null ? void 0 : _a2.replaceChild(styleNode, commentNode);
              });
              (_a = this.el.parentNode) == null ? void 0 : _a.replaceChild(commentNode, this.el);
            }
          }
        }
      }
    });
    mutator.observe(this.el, { attributes: true });
  }
  monitorChangesOfStyle() {
    const { baseUrl, namespace, styleScopeId } = this.sandbox.options;
    const rootElId = styleScopeId == null ? void 0 : styleScopeId();
    const modifyStyleCode = (styleCode) => {
      if (styleCode) {
        const manager = new StyleManager(styleCode);
        manager.correctPath(baseUrl);
        if (rootElId) {
          manager.setScope({
            rootElId,
            appName: namespace
          });
        }
        styleCode = manager.transformCode(styleCode);
      }
      return styleCode;
    };
    const mutator = new MutationObserver((mutations) => {
      for (const { type, target, addedNodes } of mutations) {
        if (type === "childList") {
          const el = target;
          if (isStyledComponentsLike(el) && el.sheet) {
            const originAddRule = el.sheet.insertRule;
            el.sheet.insertRule = function() {
              arguments[0] = modifyStyleCode(arguments[0]);
              return originAddRule.apply(this, arguments);
            };
          } else {
            if (addedNodes[0]) {
              addedNodes[0].textContent = modifyStyleCode(addedNodes[0].textContent);
            }
          }
        }
      }
    });
    mutator.observe(this.el, { childList: true });
  }
  findParentNodeInApp(parentNode, defaultInsert) {
    if (parentNode === document.body) {
      return findTarget2(this.rootElement, [
        "body",
        `div[${__MockBody__2}]`
      ]);
    } else if (parentNode === document.head) {
      return findTarget2(this.rootElement, [
        "head",
        `div[${__MockHead__2}]`
      ]);
    }
    if (this.rootElement.contains(parentNode) || !document.contains(parentNode)) {
      return parentNode;
    }
    if (defaultInsert === "head") {
      return findTarget2(this.rootElement, [
        "head",
        `div[${__MockHead__2}]`
      ]);
    } else if (defaultInsert === "body") {
      return findTarget2(this.rootElement, [
        "body",
        `div[${__MockBody__2}]`
      ]);
    }
    return parentNode;
  }
  append(context, args, originProcess) {
    var _a;
    let convertedNode;
    let parentNode = context;
    const { baseUrl, namespace, styleScopeId } = this.sandbox.options;
    if (sourceListTags.includes(this.tagName)) {
      this.fixResourceNodeUrl(this.el);
    }
    if (this.is("script")) {
      parentNode = this.findParentNodeInApp(context, "body");
      convertedNode = this.addDynamicScriptNode();
    } else if (this.is("style")) {
      parentNode = this.findParentNodeInApp(context, "head");
      const manager = new StyleManager(this.el.textContent);
      manager.correctPath(baseUrl);
      if (styleScopeId) {
        manager.setScope({
          appName: namespace,
          rootElId: styleScopeId()
        });
      }
      this.el.textContent = manager.transformCode(manager.styleCode);
      convertedNode = this.el;
      this.sandbox.dynamicStyleSheetElementSet.add(this.el);
      this.monitorChangesOfStyle();
    } else if (this.is("link")) {
      parentNode = this.findParentNodeInApp(context, "head");
      if (this.el.rel === "stylesheet" && this.el.href) {
        convertedNode = this.addDynamicLinkNode((styleNode) => this.nativeAppend.call(parentNode, styleNode));
      } else {
        convertedNode = this.el;
        this.monitorChangesOfLinkNode();
      }
    }
    if (!this.rootElement.contains(parentNode) && document.contains(parentNode)) {
      if (parentNode !== this.rootElement) {
        this.sandbox.deferClearEffects.add(() => {
          this.DOMApis.removeElement(this.el);
          return this.el;
        });
      }
    }
    if (this.el && this.el.querySelectorAll) {
      let needFixDom = this.el.querySelectorAll("iframe,img,video,link,script,audio,style");
      if (needFixDom.length > 0) {
        needFixDom.forEach((dom) => {
          safeWrapper(() => this.fixResourceNodeUrl(dom));
        });
      }
    }
    if (this.is("iframe") && typeof this.el.onload === "function") {
      const { el, sandbox } = this;
      const originOnload = el.onload;
      el.onload = function() {
        safeWrapper(() => def(el.contentWindow, "parent", sandbox.global));
        return originOnload.apply(this, arguments);
      };
    }
    if (convertedNode) {
      if (isInsertMethod(this.methodName) && this.rootElement.contains(context) && ((_a = args[1]) == null ? void 0 : _a.parentNode) === context) {
        return originProcess();
      }
      this.sandbox.hooks.lifecycle.appendNode.emit(parentNode, this.el, convertedNode, this.tagName);
      return this.nativeAppend.call(parentNode, convertedNode);
    }
    return originProcess();
  }
  removeChild(context, originProcess) {
    if (typeof this.el[__REMOVE_NODE__] === "function") {
      this.el[__REMOVE_NODE__]();
      return this.el;
    }
    if (this.is("style") || this.is("link") || this.is("script")) {
      const parentNode = this.findParentNodeInApp(context, this.is("script") ? "body" : "head");
      if (this.el.parentNode === parentNode) {
        if (this.sandbox.dynamicStyleSheetElementSet.has(this.el)) {
          this.sandbox.dynamicStyleSheetElementSet.delete(this.el);
        }
        return this.nativeRemove.call(parentNode, this.el);
      }
    }
    return originProcess();
  }
};

// src/dynamicNode/index.ts
var mountElementMethods = [
  "append",
  "appendChild",
  "insertBefore",
  "insertAdjacentElement"
];
var removeChildElementMethods = ["removeChild"];
var ignoreElementTimingTags = makeMap6([
  "STYLE",
  "SCRIPTS",
  "LINK",
  "META",
  "TITLE"
]);
function injector(current, methodName) {
  return function() {
    var _a;
    const el = methodName === "insertAdjacentElement" ? arguments[1] : arguments[0];
    const sandbox = sandboxMap.get(el);
    const originProcess = () => current.apply(this, arguments);
    if (sandbox) {
      if (el && ((_a = this == null ? void 0 : this.tagName) == null ? void 0 : _a.toLowerCase()) === "style") {
        const manager = new StyleManager2(el.textContent);
        const { baseUrl, namespace, styleScopeId } = sandbox.options;
        manager.correctPath(baseUrl);
        manager.setScope({
          appName: namespace,
          rootElId: styleScopeId()
        });
        el.textContent = manager.transformCode(manager.styleCode);
        return originProcess();
      } else {
        const processor = new DynamicNodeProcessor(el, sandbox, methodName);
        return processor.append(this, arguments, originProcess);
      }
    }
    safeWrapper2(() => {
      if (ignoreElementTimingTags(el.tagName))
        return;
      if ((el == null ? void 0 : el.setAttribute) && typeof (el == null ? void 0 : el.setAttribute) === "function" && !(el == null ? void 0 : el.getAttribute("elementtiming"))) {
        el == null ? void 0 : el.setAttribute("elementtiming", sandbox ? `${sandbox.options.namespace}-element-timing` : "element-timing");
      }
    });
    if (sandbox) {
      const processor = new DynamicNodeProcessor(el, sandbox, methodName);
      return processor.append(this, arguments, originProcess);
    } else {
      return originProcess();
    }
  };
}
function injectorRemoveChild(current, methodName) {
  return function() {
    const el = arguments[0];
    const sandbox = el && sandboxMap.get(el);
    const originProcess = () => {
      return current.apply(this, arguments);
    };
    if (sandbox) {
      const processor = new DynamicNodeProcessor(el, sandbox, methodName);
      return processor.removeChild(this, originProcess);
    }
    return originProcess();
  };
}
function handleOwnerDocument() {
  Object.defineProperty(window.Element.prototype, "ownerDocument", {
    get() {
      const sandbox = this && sandboxMap.get(this);
      const realValue = Reflect.get(window.Node.prototype, "ownerDocument", this);
      return sandbox ? sandbox.global.document : realValue;
    },
    set() {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn3('"ownerDocument" is a read-only attribute.');
    }
  });
}
function makeElInjector(sandboxConfig) {
  if (makeElInjector.hasInject)
    return;
  makeElInjector.hasInject = true;
  if (typeof window.Element === "function") {
    if (sandboxConfig.fixBaseUrl)
      safeWrapper2(() => handleOwnerDocument());
    const rewrite = (methods, builder) => {
      for (const name of methods) {
        const fn = window.Element.prototype[name];
        if (typeof fn !== "function" || fn[__domWrapper__]) {
          continue;
        }
        rawElementMethods[name] = fn;
        const wrapper = builder(fn, name);
        wrapper[__domWrapper__] = true;
        window.Element.prototype[name] = wrapper;
      }
    };
    rewrite(mountElementMethods, injector);
    rewrite(removeChildElementMethods, injectorRemoveChild);
  }
  injectHandlerParams();
}
function recordStyledComponentCSSRules(dynamicStyleSheetElementSet, styledComponentCSSRulesMap) {
  dynamicStyleSheetElementSet.forEach((styleElement) => {
    if (isStyledComponentsLike(styleElement) && styleElement.sheet) {
      styledComponentCSSRulesMap.set(styleElement, styleElement.sheet.cssRules);
    }
  });
}
function rebuildCSSRules(dynamicStyleSheetElementSet, styledComponentCSSRulesMap) {
  dynamicStyleSheetElementSet.forEach((styleElement) => {
    var _a, _b;
    const cssRules = styledComponentCSSRulesMap.get(styleElement);
    if (cssRules && (isStyledComponentsLike(styleElement) || cssRules.length)) {
      for (let i = 0; i < cssRules.length; i++) {
        const cssRule = cssRules[i];
        (_b = styleElement.sheet) == null ? void 0 : _b.insertRule(cssRule.cssText, (_a = styleElement.sheet) == null ? void 0 : _a.cssRules.length);
      }
    }
  });
}

// src/lifecycle.ts
import { SyncHook, SyncWaterfallHook, PluginSystem } from "@garfish/hooks";
function sandboxLifecycle() {
  return new PluginSystem({
    closed: new SyncHook(),
    stared: new SyncHook(),
    appendNode: new SyncHook(),
    documentGetter: new SyncWaterfallHook("documentGetter"),
    beforeClearEffect: new SyncHook(),
    afterClearEffect: new SyncHook(),
    beforeInvoke: new SyncHook(),
    afterInvoke: new SyncHook(),
    invokeError: new SyncHook()
  });
}

// src/proxyInterceptor/global.ts
import { warn as warn4, hasOwn as hasOwn5, safari13Deal as safari13Deal2 } from "@garfish/utils";
function createGetter2(sandbox) {
  return (target, p, receiver) => {
    if (p === Symbol.unscopables)
      return void 0;
    let value;
    const { overrideList } = sandbox.replaceGlobalVariables;
    if (sandbox.isProtectVariable(p)) {
      return Reflect.get(window, p);
    } else if (sandbox.isInsulationVariable(p)) {
      value = Reflect.get(target, p, receiver);
    } else {
      value = hasOwn5(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(window, p);
    }
    if (typeof value === "function") {
      if (isEsGlobalMethods(p) || isNativeCodeMethods(p) || hasOwn5(overrideList, p) || isConstructor(value) || sandbox.isExternalGlobalVariable.has(p)) {
        return value;
      }
    } else {
      return value;
    }
    const newValue = hasOwn5(value, __windowBind__) ? value[__windowBind__] : bind(value, window);
    const verifyResult = verifyGetterDescriptor(target, p, newValue);
    if (verifyResult > 0) {
      if (verifyResult === 1)
        return value;
      if (verifyResult === 2)
        return void 0;
    }
    value[__windowBind__] = newValue;
    return newValue;
  };
}
var safariProxyWindowDealHandler = safari13Deal2();
function createSetter2(sandbox) {
  return (target, p, value, receiver) => {
    const verifyResult = verifySetterDescriptor(sandbox.isProtectVariable(p) ? window : receiver ? receiver : target, p, value);
    if (verifyResult > 0) {
      if (verifyResult === 1 || verifyResult === 2)
        return false;
      if (verifyResult === 3)
        return true;
    }
    if (sandbox.isProtectVariable(p)) {
      return Reflect.set(window, p, value);
    } else {
      safariProxyWindowDealHandler.triggerSet();
      const success = Reflect.set(target, p, value, receiver);
      if (success) {
        if (sandbox.initComplete) {
          sandbox.isExternalGlobalVariable.add(p);
        }
        if (sandbox.global) {
          const methods = sandbox.global[`${GARFISH_OPTIMIZE_NAME}Methods`];
          if (Array.isArray(methods)) {
            if (methods.includes(p)) {
              const updateStack = sandbox.global[`${GARFISH_OPTIMIZE_NAME}UpdateStack`];
              updateStack.forEach((fn) => fn(p, value));
            }
          }
        }
      }
      return success;
    }
  };
}
function createDefineProperty2(sandbox) {
  return (target, p, descriptor) => {
    safariProxyWindowDealHandler.handleDescriptor(descriptor);
    if (sandbox.isProtectVariable(p)) {
      return Reflect.defineProperty(window, p, descriptor);
    } else {
      const success = Reflect.defineProperty(target, p, descriptor);
      if (sandbox.initComplete && success) {
        sandbox.isExternalGlobalVariable.add(p);
      }
      return success;
    }
  };
}
function createDeleteProperty(sandbox) {
  return (target, p) => {
    if (hasOwn5(target, p)) {
      delete target[p];
      if (sandbox.initComplete && sandbox.isExternalGlobalVariable.has(p)) {
        sandbox.isExternalGlobalVariable.delete(p);
      }
    } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      if (hasOwn5(window, p) && sandbox.isProtectVariable(p)) {
        warn4(`The "${String(p)}" is global protect variable."`);
      }
    }
    return true;
  };
}
function createHas2(sandbox) {
  return (_target, p) => {
    if (sandbox.isProtectVariable(p))
      return false;
    if (sandbox.envVariable === p)
      return false;
    return true;
  };
}

// src/sandbox.ts
var id = 0;
var defaultModules = [
  networkModule,
  timeoutModule,
  intervalModule,
  historyModule,
  documentModule,
  listenerModule,
  observerModule,
  UiEventOverride,
  localStorageModule
];
var isModule = (module) => {
  return isObject3(module) ? module[__garfishGlobal__] !== void 0 : false;
};
var addProxyWindowType = (module, parentModule) => {
  if (!isModule(module)) {
    module[__garfishGlobal__] = parentModule;
  }
  return module;
};
var Sandbox = class {
  constructor(options) {
    this.id = id++;
    this.type = "vm";
    this.closed = true;
    this.initComplete = false;
    this.version = "1.12.0";
    this.hooks = sandboxLifecycle();
    this.deferClearEffects = /* @__PURE__ */ new Set();
    this.isExternalGlobalVariable = /* @__PURE__ */ new Set();
    this.dynamicStyleSheetElementSet = /* @__PURE__ */ new Set();
    this.styledComponentCSSRulesMap = /* @__PURE__ */ new WeakMap();
    this.optimizeCode = "";
    this.envVariable = "__GARFISH_SANDBOX_ENV_VAR__";
    const defaultOptions = {
      baseUrl: "",
      namespace: "",
      modules: [],
      fixBaseUrl: false,
      disableWith: false,
      strictIsolation: false,
      el: () => null,
      styleScopeId: () => "",
      protectVariable: () => [],
      insulationVariable: () => []
    };
    this.options = isPlainObject(options) ? deepMerge(defaultOptions, options) : defaultOptions;
    const { loaderOptions, protectVariable, insulationVariable } = this.options;
    this.loader = new Loader(loaderOptions);
    this.isProtectVariable = makeMap7((protectVariable == null ? void 0 : protectVariable()) || []);
    this.isInsulationVariable = makeMap7((insulationVariable == null ? void 0 : insulationVariable()) || []);
    this.replaceGlobalVariables = {
      createdList: [],
      prepareList: [],
      recoverList: [],
      overrideList: {}
    };
    makeElInjector(this.options);
    this.start();
    sandboxMap.set(this);
  }
  start() {
    this.closed = false;
    this.replaceGlobalVariables = this.getModuleData();
    const { createdList, overrideList } = this.replaceGlobalVariables;
    this.global = this.createProxyWindow(Object.keys(overrideList));
    if (overrideList && this.global) {
      for (const key in overrideList) {
        this.global[key] = overrideList[key];
      }
    }
    if (createdList) {
      createdList.forEach((fn) => fn && fn(this.global));
    }
    if (!this.options.disableWith) {
      this.optimizeCode = this.optimizeGlobalMethod();
    }
    this.initComplete = true;
    this.hooks.lifecycle.stared.emit(this.global);
  }
  close() {
    if (this.closed)
      return;
    this.clearEffects();
    this.closed = true;
    this.global = void 0;
    this.optimizeCode = "";
    this.initComplete = false;
    this.deferClearEffects.clear();
    this.isExternalGlobalVariable.clear();
    this.dynamicStyleSheetElementSet.clear();
    this.replaceGlobalVariables.createdList = [];
    this.replaceGlobalVariables.prepareList = [];
    this.replaceGlobalVariables.recoverList = [];
    this.replaceGlobalVariables.overrideList = [];
    this.hooks.lifecycle.closed.emit();
  }
  reset() {
    this.close();
    this.start();
  }
  createProxyWindow(moduleKeys = []) {
    const fakeWindow = createFakeObject(window, this.isInsulationVariable, makeMap7(moduleKeys));
    const baseHandlers = {
      get: createGetter2(this),
      set: createSetter2(this),
      defineProperty: createDefineProperty2(this),
      deleteProperty: createDeleteProperty(this),
      getPrototypeOf() {
        return Object.getPrototypeOf(window);
      }
    };
    const parentHandlers = __spreadProps(__spreadValues({}, baseHandlers), {
      has: createHas2(this),
      getPrototypeOf() {
        return Object.getPrototypeOf(window);
      }
    });
    const proxy = new Proxy(fakeWindow, parentHandlers);
    const subProxy = new Proxy(fakeWindow, baseHandlers);
    proxy.self = subProxy;
    proxy.window = subProxy;
    proxy.globalThis = subProxy;
    proxy.__debug_sandbox__ = this;
    safeWrapper3(() => {
      proxy.top = window.top === window ? subProxy : window.top;
      proxy.parent = window.parent === window ? subProxy : window.parent;
    });
    addProxyWindowType(proxy, window);
    return proxy;
  }
  getModuleData() {
    var _a;
    const recoverList = [];
    const createdList = [];
    const prepareList = [];
    const overrideList = {};
    const allModules = defaultModules.concat((_a = this.options.modules) != null ? _a : []);
    for (const module of allModules) {
      if (typeof module === "function") {
        const { recover, override, created, prepare } = module(this) || {};
        if (recover)
          recoverList.push(recover);
        if (created)
          createdList.push(created);
        if (prepare)
          prepareList.push(prepare);
        if (override) {
          for (const key in override) {
            if ((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && overrideList[key]) {
              warn5(`"${key}" global variables are overwritten.`);
            }
            overrideList[key] = override[key];
          }
        }
      }
    }
    return { recoverList, createdList, overrideList, prepareList };
  }
  clearEffects() {
    this.hooks.lifecycle.beforeClearEffect.emit();
    this.replaceGlobalVariables.recoverList.forEach((fn) => fn && fn());
    this.deferClearEffects.forEach((fn) => fn && fn());
    this.hooks.lifecycle.afterClearEffect.emit();
  }
  optimizeGlobalMethod(tempEnvKeys = []) {
    let code = "";
    const methods = optimizeMethods.filter((p) => {
      return p && !this.isProtectVariable(p) && !tempEnvKeys.includes(p) && hasOwn6(this.global, p);
    });
    if (methods.length > 0) {
      code = methods.reduce((prevCode, name) => {
        return `${prevCode} let ${name} = window.${name};`;
      }, code);
      if (this.global) {
        this.global[`${GARFISH_OPTIMIZE_NAME}Methods`] = methods;
        this.global[`${GARFISH_OPTIMIZE_NAME}UpdateStack`] = [];
      }
      code += `window.${GARFISH_OPTIMIZE_NAME}UpdateStack.push(function(k,v){eval(k+"=v")});`;
    }
    if (tempEnvKeys.length > 0) {
      code = tempEnvKeys.reduce((prevCode, name) => {
        return `${prevCode} let ${name} = ${this.envVariable}.${name};`;
      }, code);
    }
    return code;
  }
  createExecParams(codeRef, env) {
    const { disableWith } = this.options;
    const { prepareList, overrideList } = this.replaceGlobalVariables;
    if (prepareList) {
      prepareList.forEach((fn) => fn && fn());
    }
    const params = __spreadValues({
      window: this.global
    }, overrideList);
    if (disableWith) {
      Object.assign(params, env);
    } else {
      const envKeys = Object.keys(env);
      const optimizeCode = envKeys.length > 0 ? this.optimizeGlobalMethod(envKeys) : this.optimizeCode;
      codeRef.code = `with(window) {;${optimizeCode + codeRef.code}
}`;
      params[this.envVariable] = env;
    }
    return params;
  }
  processExecError(e, url, env, options) {
    this.hooks.lifecycle.invokeError.emit(e, url, env, options);
    if (this.global && typeof this.global.onerror === "function") {
      const source = url || this.options.baseUrl;
      const message = e instanceof Error ? e.message : String(e);
      safeWrapper3(() => {
        var _a, _b;
        (_b = (_a = this.global) == null ? void 0 : _a.onerror) == null ? void 0 : _b.call(this.global, message, source, null, null, e);
      });
    }
    throw e;
  }
  execScript(code, env = {}, url = "", options) {
    var _a;
    const codeRef = { code };
    const { async } = options || {};
    this.hooks.lifecycle.beforeInvoke.emit(codeRef, url, env, options);
    const revertCurrentScript = setDocCurrentScript((_a = this.global) == null ? void 0 : _a.document, codeRef.code, false, url, async, options == null ? void 0 : options.originScript);
    try {
      const params = this.createExecParams(codeRef, env);
      codeRef.code += `
${url ? `//# sourceURL=${url}
` : ""}`;
      evalWithEnv(codeRef.code, params, this.global);
    } catch (e) {
      this.processExecError(e, url, env, options);
    } finally {
      Promise.resolve().then(revertCurrentScript);
    }
    this.hooks.lifecycle.afterInvoke.emit(codeRef, url, env, options);
  }
  static getNativeWindow() {
    let module = window;
    while (isModule(module)) {
      module = module[__garfishGlobal__];
    }
    return module;
  }
  static canSupport() {
    let support = true;
    if (!window.Proxy || !Array.prototype.includes || !String.prototype.includes) {
      support = false;
    }
    if (support) {
      try {
        new Function("let a = 666;");
      } catch (e) {
        support = false;
      }
    }
    if (!support) {
      warn5('The current environment does not support "vm sandbox",Please use the "snapshot sandbox" instead.');
    }
    return support;
  }
};

// src/pluginify.ts
var specialExternalVariables = [
  "onerror",
  "webpackjsonp",
  "__REACT_ERROR_OVERLAY_GLOBAL_HOOK__",
  (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? "webpackHotUpdate" : ""
];
function compatibleOldModule(modules) {
  if (!Array.isArray(modules)) {
    (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn6('"vm sandbox" modules should be an array');
    const list = [];
    for (const key in modules) {
      list.push(modules[key]);
    }
    modules = list;
  }
  return modules;
}
function rewriteAppAndSandbox(Garfish, app, sandbox) {
  var _a;
  const originExecScript = sandbox.execScript;
  sandbox.loader = Garfish.loader;
  sandbox.execScript = (code, env, url, options) => {
    const evalHooksArgs = [app.appInfo, code, env, url, options];
    app.hooks.lifecycle.beforeEval.emit(...evalHooksArgs);
    try {
      const res = originExecScript.call(sandbox, code, __spreadValues(__spreadValues({}, env), app.getExecScriptEnv(options == null ? void 0 : options.noEntry)), url, options);
      app.hooks.lifecycle.afterEval.emit(...evalHooksArgs);
      return res;
    } catch (err) {
      app.hooks.lifecycle.errorExecCode.emit(err, ...evalHooksArgs);
      throw err;
    }
  };
  app.vmSandbox = sandbox;
  app.global = sandbox.global;
  app.strictIsolation = (_a = sandbox.options.strictIsolation) != null ? _a : false;
  app.runCode = function() {
    return originExecScript.apply(sandbox, arguments);
  };
  if (app.entryManager.DOMApis && sandbox.global) {
    app.entryManager.DOMApis.document = sandbox.global.document;
  }
}
function createOptions(Garfish) {
  const canSupport = Sandbox.canSupport();
  const options = {
    name: "browser-vm",
    version: "1.12.0",
    afterLoad(appInfo, appInstance) {
      var _a, _b, _c, _d;
      if (!canSupport || !appInstance || (appInstance == null ? void 0 : appInstance.vmSandbox) || appInfo.sandbox === false || appInfo.sandbox && appInfo.sandbox.open === false || appInfo.sandbox && appInfo.sandbox.snapshot) {
        if (appInstance == null ? void 0 : appInstance.vmSandbox) {
          appInstance.global = appInstance.vmSandbox.global;
        }
        return;
      }
      rewriteAppAndSandbox(Garfish, appInstance, new Sandbox({
        namespace: appInfo.name,
        addSourceList: appInstance.addSourceList.bind(appInstance),
        baseUrl: appInstance.entryManager.url,
        modules: compatibleOldModule(((_a = appInfo.sandbox) == null ? void 0 : _a.modules) || []),
        fixBaseUrl: Boolean((_b = appInfo.sandbox) == null ? void 0 : _b.fixBaseUrl),
        disableWith: Boolean((_c = appInfo.sandbox) == null ? void 0 : _c.disableWith),
        strictIsolation: Boolean((_d = appInfo.sandbox) == null ? void 0 : _d.strictIsolation),
        el: () => appInstance.htmlNode,
        styleScopeId: () => appInstance.appContainer.id,
        protectVariable: () => appInfo.protectVariable || [],
        insulationVariable: () => {
          return [
            ...specialExternalVariables,
            ...appInfo.insulationVariable || []
          ].filter(Boolean);
        }
      }));
    },
    beforeUnmount(appInfo, appInstance) {
      if (appInstance.vmSandbox) {
        recordStyledComponentCSSRules(appInstance.vmSandbox.dynamicStyleSheetElementSet, appInstance.vmSandbox.styledComponentCSSRulesMap);
      }
    },
    afterUnmount(appInfo, appInstance, isCacheMode) {
      if (appInstance.vmSandbox && !isCacheMode) {
        appInstance.vmSandbox.reset();
      }
    },
    afterMount(appInfo, appInstance) {
      if (appInstance.vmSandbox) {
        rebuildCSSRules(appInstance.vmSandbox.dynamicStyleSheetElementSet, appInstance.vmSandbox.styledComponentCSSRulesMap);
        appInstance.vmSandbox.execScript(`
          if (typeof window.onload === 'function') {
            window.onload.call(window);
          }
        `);
      }
    }
  };
  return options;
}
function GarfishBrowserVm() {
  return function(Garfish) {
    Garfish.getGlobalObject = function() {
      return Sandbox.getNativeWindow();
    };
    Garfish.setGlobalValue = function(key, value) {
      return this.getGlobalObject()[key] = value;
    };
    Garfish.clearEscapeEffect = function(key, value) {
      const global = this.getGlobalObject();
      if (key in global) {
        global[key] = value;
      }
    };
    return createOptions(Garfish);
  };
}
export {
  GarfishBrowserVm,
  Sandbox as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BsdWdpbmlmeS50cyIsICIuLi8uLi9zcmMvc2FuZGJveC50cyIsICIuLi8uLi9zcmMvbW9kdWxlcy9oaXN0b3J5LnRzIiwgIi4uLy4uL3NyYy9wcm94eUludGVyY2VwdG9yL3NoYXJlZC50cyIsICIuLi8uLi9zcmMvdXRpbHMudHMiLCAiLi4vLi4vc3JjL3N5bWJvbFR5cGVzLnRzIiwgIi4uLy4uL3NyYy9tb2R1bGVzL25ldHdvcmsudHMiLCAiLi4vLi4vc3JjL3Byb3h5SW50ZXJjZXB0b3IvZG9jdW1lbnQudHMiLCAiLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnQudHMiLCAiLi4vLi4vc3JjL21vZHVsZXMvdWlFdmVudC50cyIsICIuLi8uLi9zcmMvbW9kdWxlcy9zdG9yYWdlLnRzIiwgIi4uLy4uL3NyYy9tb2R1bGVzL2V2ZW50TGlzdGVuZXIudHMiLCAiLi4vLi4vc3JjL21vZHVsZXMvbXV0YXRpb25PYnNlcnZlci50cyIsICIuLi8uLi9zcmMvbW9kdWxlcy90aW1lci50cyIsICIuLi8uLi9zcmMvZHluYW1pY05vZGUvaW5kZXgudHMiLCAiLi4vLi4vc3JjL2R5bmFtaWNOb2RlL3Byb2Nlc3NQYXJhbXMudHMiLCAiLi4vLi4vc3JjL2R5bmFtaWNOb2RlL3Byb2Nlc3Nvci50cyIsICIuLi8uLi9zcmMvbGlmZWN5Y2xlLnRzIiwgIi4uLy4uL3NyYy9wcm94eUludGVyY2VwdG9yL2dsb2JhbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHsgd2FybiwgaXNQbGFpbk9iamVjdCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IE1vZHVsZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4vc2FuZGJveCc7XG5pbXBvcnQgeyByZWNvcmRTdHlsZWRDb21wb25lbnRDU1NSdWxlcywgcmVidWlsZENTU1J1bGVzIH0gZnJvbSAnLi9keW5hbWljTm9kZSc7XG5cbmRlY2xhcmUgbW9kdWxlICdAZ2FyZmlzaC9jb3JlJyB7XG4gIGV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBHYXJmaXNoIHtcbiAgICBzZXRHbG9iYWxWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU/OiBhbnkpOiB2b2lkO1xuICAgIGdldEdsb2JhbE9iamVjdDogKCkgPT4gV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXM7XG4gICAgY2xlYXJFc2NhcGVFZmZlY3Q6IChrZXk6IHN0cmluZywgdmFsdWU/OiBhbnkpID0+IHZvaWQ7XG4gIH1cblxuICBleHBvcnQgbmFtZXNwYWNlIGludGVyZmFjZXMge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2FuZGJveENvbmZpZyB7XG4gICAgICBtb2R1bGVzPzogQXJyYXk8TW9kdWxlPiB8IFJlY29yZDxzdHJpbmcsIE1vZHVsZT47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICAgICAgcHJvdGVjdFZhcmlhYmxlPzogUHJvcGVydHlLZXlbXTtcbiAgICAgIGluc3VsYXRpb25WYXJpYWJsZT86IFByb3BlcnR5S2V5W107XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBBcHBJbmZvIHtcbiAgICAgIHByb3RlY3RWYXJpYWJsZT86IFByb3BlcnR5S2V5W107XG4gICAgICBpbnN1bGF0aW9uVmFyaWFibGU/OiBQcm9wZXJ0eUtleVtdO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQXBwIHtcbiAgICAgIHZtU2FuZGJveD86IFNhbmRib3g7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHNwZWNpYWxFeHRlcm5hbFZhcmlhYmxlcyA9IFtcbiAgJ29uZXJyb3InLFxuICAnd2VicGFja2pzb25wJyxcbiAgJ19fUkVBQ1RfRVJST1JfT1ZFUkxBWV9HTE9CQUxfSE9PS19fJyxcbiAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgPyAnd2VicGFja0hvdFVwZGF0ZScgOiAnJyxcbl07XG5cbmZ1bmN0aW9uIGNvbXBhdGlibGVPbGRNb2R1bGUoXG4gIG1vZHVsZXM6IEFycmF5PE1vZHVsZT4gfCBSZWNvcmQ8c3RyaW5nLCBNb2R1bGU+LFxuKTogQXJyYXk8TW9kdWxlPiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShtb2R1bGVzKSkge1xuICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oJ1widm0gc2FuZGJveFwiIG1vZHVsZXMgc2hvdWxkIGJlIGFuIGFycmF5Jyk7XG4gICAgY29uc3QgbGlzdDogQXJyYXk8TW9kdWxlPiA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IGluIG1vZHVsZXMpIHtcbiAgICAgIGxpc3QucHVzaChtb2R1bGVzW2tleV0pO1xuICAgIH1cbiAgICBtb2R1bGVzID0gbGlzdDtcbiAgfVxuICByZXR1cm4gbW9kdWxlcztcbn1cblxuZnVuY3Rpb24gcmV3cml0ZUFwcEFuZFNhbmRib3goXG4gIEdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCxcbiAgYXBwOiBpbnRlcmZhY2VzLkFwcCxcbiAgc2FuZGJveDogU2FuZGJveCxcbikge1xuICBjb25zdCBvcmlnaW5FeGVjU2NyaXB0ID0gc2FuZGJveC5leGVjU2NyaXB0O1xuICAvLyBSZXdyaXRlIHNhbmRib3ggYXR0cmlidXRlc1xuICBzYW5kYm94LmxvYWRlciA9IEdhcmZpc2gubG9hZGVyO1xuICBzYW5kYm94LmV4ZWNTY3JpcHQgPSAoY29kZSwgZW52LCB1cmwsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBldmFsSG9va3NBcmdzID0gW2FwcC5hcHBJbmZvLCBjb2RlLCBlbnYsIHVybCwgb3B0aW9uc10gYXMgY29uc3Q7XG4gICAgYXBwLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVFdmFsLmVtaXQoLi4uZXZhbEhvb2tzQXJncyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IG9yaWdpbkV4ZWNTY3JpcHQuY2FsbChcbiAgICAgICAgc2FuZGJveCxcbiAgICAgICAgY29kZSxcbiAgICAgICAge1xuICAgICAgICAgIC8vIEZvciBhcHBsaWNhdGlvbiBvZiBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgICAgICAgICAuLi5lbnYsXG4gICAgICAgICAgLi4uYXBwLmdldEV4ZWNTY3JpcHRFbnYob3B0aW9ucz8ubm9FbnRyeSksXG4gICAgICAgIH0sXG4gICAgICAgIHVybCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgICBhcHAuaG9va3MubGlmZWN5Y2xlLmFmdGVyRXZhbC5lbWl0KC4uLmV2YWxIb29rc0FyZ3MpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGFwcC5ob29rcy5saWZlY3ljbGUuZXJyb3JFeGVjQ29kZS5lbWl0KGVyciwgLi4uZXZhbEhvb2tzQXJncyk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJld3JpdGUgYXBwIGF0dHJpYnV0ZXNcbiAgYXBwLnZtU2FuZGJveCA9IHNhbmRib3g7XG4gIGFwcC5nbG9iYWwgPSBzYW5kYm94Lmdsb2JhbDtcbiAgYXBwLnN0cmljdElzb2xhdGlvbiA9IHNhbmRib3gub3B0aW9ucy5zdHJpY3RJc29sYXRpb24gPz8gZmFsc2U7XG4gIGFwcC5ydW5Db2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBvcmlnaW5FeGVjU2NyaXB0LmFwcGx5KHNhbmRib3gsIGFyZ3VtZW50cyk7XG4gIH07XG4gIGlmIChhcHAuZW50cnlNYW5hZ2VyLkRPTUFwaXMgJiYgc2FuZGJveC5nbG9iYWwpIHtcbiAgICBhcHAuZW50cnlNYW5hZ2VyLkRPTUFwaXMuZG9jdW1lbnQgPSBzYW5kYm94Lmdsb2JhbC5kb2N1bWVudDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKEdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCkge1xuICBjb25zdCBjYW5TdXBwb3J0ID0gU2FuZGJveC5jYW5TdXBwb3J0KCk7XG5cbiAgY29uc3Qgb3B0aW9uczogaW50ZXJmYWNlcy5QbHVnaW4gPSB7XG4gICAgbmFtZTogJ2Jyb3dzZXItdm0nLFxuICAgIHZlcnNpb246ICcxLjEyLjAnLFxuXG4gICAgYWZ0ZXJMb2FkKGFwcEluZm8sIGFwcEluc3RhbmNlKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFjYW5TdXBwb3J0IHx8XG4gICAgICAgICFhcHBJbnN0YW5jZSB8fFxuICAgICAgICBhcHBJbnN0YW5jZT8udm1TYW5kYm94IHx8XG4gICAgICAgIGFwcEluZm8uc2FuZGJveCA9PT0gZmFsc2UgfHwgLy8gRW5zdXJlIHRoYXQgb2xkIHZlcnNpb25zIGNvbXBhdGlibGVcbiAgICAgICAgKGFwcEluZm8uc2FuZGJveCAmJiBhcHBJbmZvLnNhbmRib3gub3BlbiA9PT0gZmFsc2UpIHx8XG4gICAgICAgIChhcHBJbmZvLnNhbmRib3ggJiYgYXBwSW5mby5zYW5kYm94LnNuYXBzaG90KVxuICAgICAgKSB7XG4gICAgICAgIGlmIChhcHBJbnN0YW5jZT8udm1TYW5kYm94KSB7XG4gICAgICAgICAgYXBwSW5zdGFuY2UuZ2xvYmFsID0gYXBwSW5zdGFuY2Uudm1TYW5kYm94Lmdsb2JhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJld3JpdGVBcHBBbmRTYW5kYm94KFxuICAgICAgICBHYXJmaXNoLFxuICAgICAgICBhcHBJbnN0YW5jZSxcbiAgICAgICAgbmV3IFNhbmRib3goe1xuICAgICAgICAgIG5hbWVzcGFjZTogYXBwSW5mby5uYW1lLFxuICAgICAgICAgIGFkZFNvdXJjZUxpc3Q6IGFwcEluc3RhbmNlLmFkZFNvdXJjZUxpc3QuYmluZChhcHBJbnN0YW5jZSksXG4gICAgICAgICAgYmFzZVVybDogYXBwSW5zdGFuY2UuZW50cnlNYW5hZ2VyLnVybCxcbiAgICAgICAgICBtb2R1bGVzOiBjb21wYXRpYmxlT2xkTW9kdWxlKGFwcEluZm8uc2FuZGJveD8ubW9kdWxlcyB8fCBbXSksXG4gICAgICAgICAgZml4QmFzZVVybDogQm9vbGVhbihhcHBJbmZvLnNhbmRib3g/LmZpeEJhc2VVcmwpLFxuICAgICAgICAgIGRpc2FibGVXaXRoOiBCb29sZWFuKGFwcEluZm8uc2FuZGJveD8uZGlzYWJsZVdpdGgpLFxuICAgICAgICAgIHN0cmljdElzb2xhdGlvbjogQm9vbGVhbihhcHBJbmZvLnNhbmRib3g/LnN0cmljdElzb2xhdGlvbiksXG5cbiAgICAgICAgICBlbDogKCkgPT4gYXBwSW5zdGFuY2UuaHRtbE5vZGUsXG4gICAgICAgICAgc3R5bGVTY29wZUlkOiAoKSA9PiBhcHBJbnN0YW5jZS5hcHBDb250YWluZXIuaWQsXG4gICAgICAgICAgcHJvdGVjdFZhcmlhYmxlOiAoKSA9PiBhcHBJbmZvLnByb3RlY3RWYXJpYWJsZSB8fCBbXSxcbiAgICAgICAgICBpbnN1bGF0aW9uVmFyaWFibGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIC4uLnNwZWNpYWxFeHRlcm5hbFZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgLi4uKGFwcEluZm8uaW5zdWxhdGlvblZhcmlhYmxlIHx8IFtdKSxcbiAgICAgICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgYmVmb3JlVW5tb3VudChhcHBJbmZvLCBhcHBJbnN0YW5jZSkge1xuICAgICAgaWYgKGFwcEluc3RhbmNlLnZtU2FuZGJveCkge1xuICAgICAgICByZWNvcmRTdHlsZWRDb21wb25lbnRDU1NSdWxlcyhcbiAgICAgICAgICBhcHBJbnN0YW5jZS52bVNhbmRib3guZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LFxuICAgICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5zdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gSWYgdGhlIGFwcCBpcyB1bmluc3RhbGxlZCwgdGhlIHNhbmRib3ggbmVlZHMgdG8gY2xlYXIgYWxsIGVmZmVjdHMgYW5kIHRoZW4gcmVzZXRcbiAgICBhZnRlclVubW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UsIGlzQ2FjaGVNb2RlKSB7XG4gICAgICAvLyBUaGUgY2FjaGluZyBwYXR0ZXJuIHRvIHJldGFpbiB0aGUgc2FtZSBjb250ZXh0XG4gICAgICBpZiAoYXBwSW5zdGFuY2Uudm1TYW5kYm94ICYmICFpc0NhY2hlTW9kZSkge1xuICAgICAgICBhcHBJbnN0YW5jZS52bVNhbmRib3gucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWZ0ZXJNb3VudChhcHBJbmZvLCBhcHBJbnN0YW5jZSkge1xuICAgICAgaWYgKGFwcEluc3RhbmNlLnZtU2FuZGJveCkge1xuICAgICAgICByZWJ1aWxkQ1NTUnVsZXMoXG4gICAgICAgICAgYXBwSW5zdGFuY2Uudm1TYW5kYm94LmR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldCxcbiAgICAgICAgICBhcHBJbnN0YW5jZS52bVNhbmRib3guc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXAsXG4gICAgICAgICk7XG4gICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5leGVjU2NyaXB0KGBcbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5vbmxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vbmxvYWQuY2FsbCh3aW5kb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgYCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8vIEV4cG9ydCBHYXJmaXNoIHBsdWdpblxuZXhwb3J0IGZ1bmN0aW9uIEdhcmZpc2hCcm93c2VyVm0oKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoR2FyZmlzaDogaW50ZXJmYWNlcy5HYXJmaXNoKTogaW50ZXJmYWNlcy5QbHVnaW4ge1xuICAgIEdhcmZpc2guZ2V0R2xvYmFsT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFNhbmRib3guZ2V0TmF0aXZlV2luZG93KCk7XG4gICAgfTtcblxuICAgIEdhcmZpc2guc2V0R2xvYmFsVmFsdWUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuICh0aGlzLmdldEdsb2JhbE9iamVjdCgpW2tleV0gPSB2YWx1ZSk7XG4gICAgfTtcblxuICAgIEdhcmZpc2guY2xlYXJFc2NhcGVFZmZlY3QgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgY29uc3QgZ2xvYmFsID0gdGhpcy5nZXRHbG9iYWxPYmplY3QoKTtcbiAgICAgIGlmIChrZXkgaW4gZ2xvYmFsKSB7XG4gICAgICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY3JlYXRlT3B0aW9ucyhHYXJmaXNoKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBMb2FkZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHtcbiAgd2FybixcbiAgaGFzT3duLFxuICBtYWtlTWFwLFxuICBpc09iamVjdCxcbiAgZGVlcE1lcmdlLFxuICBldmFsV2l0aEVudixcbiAgc2FmZVdyYXBwZXIsXG4gIGlzUGxhaW5PYmplY3QsXG4gIHNldERvY0N1cnJlbnRTY3JpcHQsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHsgaGlzdG9yeU1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9oaXN0b3J5JztcbmltcG9ydCB7IG5ldHdvcmtNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvbmV0d29yayc7XG5pbXBvcnQgeyBkb2N1bWVudE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9kb2N1bWVudCc7XG5pbXBvcnQgeyBVaUV2ZW50T3ZlcnJpZGUgfSBmcm9tICcuL21vZHVsZXMvdWlFdmVudCc7XG5pbXBvcnQgeyBsb2NhbFN0b3JhZ2VNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBsaXN0ZW5lck1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9ldmVudExpc3RlbmVyJztcbmltcG9ydCB7IG9ic2VydmVyTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL211dGF0aW9uT2JzZXJ2ZXInO1xuaW1wb3J0IHsgdGltZW91dE1vZHVsZSwgaW50ZXJ2YWxNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvdGltZXInO1xuaW1wb3J0IHsgbWFrZUVsSW5qZWN0b3IgfSBmcm9tICcuL2R5bmFtaWNOb2RlJztcbmltcG9ydCB7IHNhbmRib3hMaWZlY3ljbGUgfSBmcm9tICcuL2xpZmVjeWNsZSc7XG5pbXBvcnQgeyBvcHRpbWl6ZU1ldGhvZHMsIGNyZWF0ZUZha2VPYmplY3QsIHNhbmRib3hNYXAgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IF9fZ2FyZmlzaEdsb2JhbF9fLCBHQVJGSVNIX09QVElNSVpFX05BTUUgfSBmcm9tICcuL3N5bWJvbFR5cGVzJztcbmltcG9ydCB7IE1vZHVsZSwgU2FuZGJveE9wdGlvbnMsIFJlcGxhY2VHbG9iYWxWYXJpYWJsZXMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gIGNyZWF0ZUhhcyxcbiAgY3JlYXRlR2V0dGVyLFxuICBjcmVhdGVTZXR0ZXIsXG4gIGNyZWF0ZURlZmluZVByb3BlcnR5LFxuICBjcmVhdGVEZWxldGVQcm9wZXJ0eSxcbn0gZnJvbSAnLi9wcm94eUludGVyY2VwdG9yL2dsb2JhbCc7XG5cbmxldCBpZCA9IDA7XG5jb25zdCBkZWZhdWx0TW9kdWxlczogQXJyYXk8TW9kdWxlPiA9IFtcbiAgbmV0d29ya01vZHVsZSxcbiAgdGltZW91dE1vZHVsZSxcbiAgaW50ZXJ2YWxNb2R1bGUsXG4gIGhpc3RvcnlNb2R1bGUsXG4gIGRvY3VtZW50TW9kdWxlLFxuICBsaXN0ZW5lck1vZHVsZSxcbiAgb2JzZXJ2ZXJNb2R1bGUsXG4gIFVpRXZlbnRPdmVycmlkZSxcbiAgbG9jYWxTdG9yYWdlTW9kdWxlLFxuXTtcblxuY29uc3QgaXNNb2R1bGUgPSAobW9kdWxlOiBXaW5kb3cpID0+IHtcbiAgcmV0dXJuIGlzT2JqZWN0KG1vZHVsZSlcbiAgICA/IG1vZHVsZVtfX2dhcmZpc2hHbG9iYWxfXyBhcyBhbnldICE9PSB1bmRlZmluZWRcbiAgICA6IGZhbHNlO1xufTtcblxuY29uc3QgYWRkUHJveHlXaW5kb3dUeXBlID0gKG1vZHVsZTogV2luZG93LCBwYXJlbnRNb2R1bGU6IFdpbmRvdykgPT4ge1xuICBpZiAoIWlzTW9kdWxlKG1vZHVsZSkpIHtcbiAgICBtb2R1bGVbX19nYXJmaXNoR2xvYmFsX18gYXMgYW55XSA9IHBhcmVudE1vZHVsZTtcbiAgfVxuICByZXR1cm4gbW9kdWxlO1xufTtcblxuZXhwb3J0IGNsYXNzIFNhbmRib3gge1xuICBwdWJsaWMgaWQgPSBpZCsrO1xuICBwdWJsaWMgdHlwZSA9ICd2bSc7XG4gIHB1YmxpYyBjbG9zZWQgPSB0cnVlO1xuICBwdWJsaWMgaW5pdENvbXBsZXRlID0gZmFsc2U7XG4gIHB1YmxpYyB2ZXJzaW9uID0gJzEuMTIuMCc7XG4gIHB1YmxpYyBnbG9iYWw/OiBXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpcztcbiAgcHVibGljIGxvYWRlcjogTG9hZGVyO1xuICBwdWJsaWMgb3B0aW9uczogU2FuZGJveE9wdGlvbnM7XG4gIHB1YmxpYyBob29rcyA9IHNhbmRib3hMaWZlY3ljbGUoKTtcbiAgcHVibGljIHJlcGxhY2VHbG9iYWxWYXJpYWJsZXM6IFJlcGxhY2VHbG9iYWxWYXJpYWJsZXM7XG4gIHB1YmxpYyBkZWZlckNsZWFyRWZmZWN0czogU2V0PCgpID0+IHZvaWQ+ID0gbmV3IFNldCgpO1xuICBwdWJsaWMgaXNFeHRlcm5hbEdsb2JhbFZhcmlhYmxlOiBTZXQ8UHJvcGVydHlLZXk+ID0gbmV3IFNldCgpO1xuICBwdWJsaWMgaXNQcm90ZWN0VmFyaWFibGU6IChwOiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbjtcbiAgcHVibGljIGlzSW5zdWxhdGlvblZhcmlhYmxlOiAoUDogUHJvcGVydHlLZXkpID0+IGJvb2xlYW47XG4gIHB1YmxpYyBkeW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQgPSBuZXcgU2V0PEhUTUxTdHlsZUVsZW1lbnQ+KCk7XG4gIHB1YmxpYyBzdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcCA9IG5ldyBXZWFrTWFwPFxuICAgIEhUTUxTdHlsZUVsZW1lbnQsXG4gICAgQ1NTUnVsZUxpc3RcbiAgPigpO1xuXG4gIHByaXZhdGUgb3B0aW1pemVDb2RlID0gJyc7IC8vIFRvIG9wdGltaXplIHRoZSB3aXRoIHN0YXRlbWVudFxuICBwcml2YXRlIGVudlZhcmlhYmxlID0gJ19fR0FSRklTSF9TQU5EQk9YX0VOVl9WQVJfXyc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2FuZGJveE9wdGlvbnMpIHtcbiAgICAvLyBEZWZhdWx0IHNhbmRib3ggY29uZmlnXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IFNhbmRib3hPcHRpb25zID0ge1xuICAgICAgYmFzZVVybDogJycsXG4gICAgICBuYW1lc3BhY2U6ICcnLFxuICAgICAgbW9kdWxlczogW10sXG4gICAgICBmaXhCYXNlVXJsOiBmYWxzZSxcbiAgICAgIGRpc2FibGVXaXRoOiBmYWxzZSxcbiAgICAgIHN0cmljdElzb2xhdGlvbjogZmFsc2UsXG4gICAgICBlbDogKCkgPT4gbnVsbCxcbiAgICAgIHN0eWxlU2NvcGVJZDogKCkgPT4gJycsXG4gICAgICBwcm90ZWN0VmFyaWFibGU6ICgpID0+IFtdLFxuICAgICAgaW5zdWxhdGlvblZhcmlhYmxlOiAoKSA9PiBbXSxcbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucylcbiAgICAgID8gZGVlcE1lcmdlKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxuICAgICAgOiBkZWZhdWx0T3B0aW9ucztcblxuICAgIGNvbnN0IHsgbG9hZGVyT3B0aW9ucywgcHJvdGVjdFZhcmlhYmxlLCBpbnN1bGF0aW9uVmFyaWFibGUgfSA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIobG9hZGVyT3B0aW9ucyk7XG4gICAgdGhpcy5pc1Byb3RlY3RWYXJpYWJsZSA9IG1ha2VNYXAocHJvdGVjdFZhcmlhYmxlPy4oKSB8fCBbXSk7XG4gICAgdGhpcy5pc0luc3VsYXRpb25WYXJpYWJsZSA9IG1ha2VNYXAoaW5zdWxhdGlvblZhcmlhYmxlPy4oKSB8fCBbXSk7XG5cbiAgICB0aGlzLnJlcGxhY2VHbG9iYWxWYXJpYWJsZXMgPSB7XG4gICAgICBjcmVhdGVkTGlzdDogW10sXG4gICAgICBwcmVwYXJlTGlzdDogW10sXG4gICAgICByZWNvdmVyTGlzdDogW10sXG4gICAgICBvdmVycmlkZUxpc3Q6IHt9LFxuICAgIH07XG4gICAgLy8gSW5qZWN0IEdsb2JhbCBjYXB0dXJlXG4gICAgbWFrZUVsSW5qZWN0b3IodGhpcy5vcHRpb25zKTtcbiAgICAvLyBUaGUgZGVmYXVsdCBzdGFydHVwIHNhbmRib3hcbiAgICB0aGlzLnN0YXJ0KCk7XG4gICAgc2FuZGJveE1hcC5zZXQodGhpcyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcyA9IHRoaXMuZ2V0TW9kdWxlRGF0YSgpO1xuICAgIGNvbnN0IHsgY3JlYXRlZExpc3QsIG92ZXJyaWRlTGlzdCB9ID0gdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzO1xuICAgIHRoaXMuZ2xvYmFsID0gdGhpcy5jcmVhdGVQcm94eVdpbmRvdyhPYmplY3Qua2V5cyhvdmVycmlkZUxpc3QpKTtcblxuICAgIGlmIChvdmVycmlkZUxpc3QgJiYgdGhpcy5nbG9iYWwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG92ZXJyaWRlTGlzdCkge1xuICAgICAgICB0aGlzLmdsb2JhbFtrZXldID0gb3ZlcnJpZGVMaXN0W2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjcmVhdGVkTGlzdCkge1xuICAgICAgY3JlYXRlZExpc3QuZm9yRWFjaCgoZm4pID0+IGZuICYmIGZuKHRoaXMuZ2xvYmFsKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVXaXRoKSB7XG4gICAgICB0aGlzLm9wdGltaXplQ29kZSA9IHRoaXMub3B0aW1pemVHbG9iYWxNZXRob2QoKTtcbiAgICB9XG4gICAgdGhpcy5pbml0Q29tcGxldGUgPSB0cnVlO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLnN0YXJlZC5lbWl0KHRoaXMuZ2xvYmFsKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xuICAgIHRoaXMuY2xlYXJFZmZlY3RzKCk7XG4gICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgIHRoaXMuZ2xvYmFsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub3B0aW1pemVDb2RlID0gJyc7XG4gICAgdGhpcy5pbml0Q29tcGxldGUgPSBmYWxzZTtcbiAgICB0aGlzLmRlZmVyQ2xlYXJFZmZlY3RzLmNsZWFyKCk7XG4gICAgdGhpcy5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuY2xlYXIoKTtcbiAgICB0aGlzLmR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldC5jbGVhcigpO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcy5jcmVhdGVkTGlzdCA9IFtdO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcy5wcmVwYXJlTGlzdCA9IFtdO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcy5yZWNvdmVyTGlzdCA9IFtdO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcy5vdmVycmlkZUxpc3QgPSBbXTtcbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5jbG9zZWQuZW1pdCgpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIGNyZWF0ZVByb3h5V2luZG93KG1vZHVsZUtleXM6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICAgIGNvbnN0IGZha2VXaW5kb3cgPSBjcmVhdGVGYWtlT2JqZWN0KFxuICAgICAgd2luZG93LFxuICAgICAgdGhpcy5pc0luc3VsYXRpb25WYXJpYWJsZSxcbiAgICAgIG1ha2VNYXAobW9kdWxlS2V5cyksXG4gICAgKTtcblxuICAgIGNvbnN0IGJhc2VIYW5kbGVycyA9IHtcbiAgICAgIGdldDogY3JlYXRlR2V0dGVyKHRoaXMpLFxuICAgICAgc2V0OiBjcmVhdGVTZXR0ZXIodGhpcyksXG4gICAgICBkZWZpbmVQcm9wZXJ0eTogY3JlYXRlRGVmaW5lUHJvcGVydHkodGhpcyksXG4gICAgICBkZWxldGVQcm9wZXJ0eTogY3JlYXRlRGVsZXRlUHJvcGVydHkodGhpcyksXG4gICAgICBnZXRQcm90b3R5cGVPZigpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cpO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50SGFuZGxlcnMgPSB7XG4gICAgICAuLi5iYXNlSGFuZGxlcnMsXG4gICAgICBoYXM6IGNyZWF0ZUhhcyh0aGlzKSxcbiAgICAgIGdldFByb3RvdHlwZU9mKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdyk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBJbiBmYWN0LCB0aGV5IGFyZSBhbGwgcHJveHkgd2luZG93cywgYnV0IHRoZSBwcm9ibGVtIG9mIGB2YXIgYSA9IHh4YCBjYW4gYmUgc29sdmVkIHRocm91Z2ggaGFzXG4gICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoZmFrZVdpbmRvdywgcGFyZW50SGFuZGxlcnMpO1xuICAgIGNvbnN0IHN1YlByb3h5ID0gbmV3IFByb3h5KGZha2VXaW5kb3csIGJhc2VIYW5kbGVycyk7XG5cbiAgICBwcm94eS5zZWxmID0gc3ViUHJveHk7XG4gICAgcHJveHkud2luZG93ID0gc3ViUHJveHk7XG4gICAgcHJveHkuZ2xvYmFsVGhpcyA9IHN1YlByb3h5O1xuICAgIHByb3h5Ll9fZGVidWdfc2FuZGJveF9fID0gdGhpczsgLy8gVGhpcyBhdHRyaWJ1dGUgaXMgdXNlZCBmb3IgZGVidWdnZXJcbiAgICBzYWZlV3JhcHBlcigoKSA9PiB7XG4gICAgICAvLyBDcm9zcy1kb21haW4gZXJyb3JzIG1heSBvY2N1ciBkdXJpbmcgYWNjZXNzXG4gICAgICBwcm94eS50b3AgPSB3aW5kb3cudG9wID09PSB3aW5kb3cgPyBzdWJQcm94eSA6IHdpbmRvdy50b3A7XG4gICAgICBwcm94eS5wYXJlbnQgPSB3aW5kb3cucGFyZW50ID09PSB3aW5kb3cgPyBzdWJQcm94eSA6IHdpbmRvdy5wYXJlbnQ7XG4gICAgfSk7XG5cbiAgICBhZGRQcm94eVdpbmRvd1R5cGUocHJveHksIHdpbmRvdyk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9XG5cbiAgZ2V0TW9kdWxlRGF0YSgpIHtcbiAgICBjb25zdCByZWNvdmVyTGlzdDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcbiAgICBjb25zdCBjcmVhdGVkTGlzdDogQXJyYXk8KGNvbnRleHQ6IFdpbmRvdyB8IHVuZGVmaW5lZCkgPT4gdm9pZD4gPSBbXTtcbiAgICBjb25zdCBwcmVwYXJlTGlzdDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcbiAgICBjb25zdCBvdmVycmlkZUxpc3QgPSB7fTtcbiAgICBjb25zdCBhbGxNb2R1bGVzID0gZGVmYXVsdE1vZHVsZXMuY29uY2F0KHRoaXMub3B0aW9ucy5tb2R1bGVzID8/IFtdKTtcblxuICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIGFsbE1vZHVsZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHsgcmVjb3Zlciwgb3ZlcnJpZGUsIGNyZWF0ZWQsIHByZXBhcmUgfSA9IG1vZHVsZSh0aGlzKSB8fCB7fTtcbiAgICAgICAgaWYgKHJlY292ZXIpIHJlY292ZXJMaXN0LnB1c2gocmVjb3Zlcik7XG4gICAgICAgIGlmIChjcmVhdGVkKSBjcmVhdGVkTGlzdC5wdXNoKGNyZWF0ZWQpO1xuICAgICAgICBpZiAocHJlcGFyZSkgcHJlcGFyZUxpc3QucHVzaChwcmVwYXJlKTtcbiAgICAgICAgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgICAgLy8gVGhlIGxhdHRlciB3aWxsIG92ZXJ3cml0ZSB0aGUgcHJldmlvdXMgdmFyaWFibGVcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvdmVycmlkZSkge1xuICAgICAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIG92ZXJyaWRlTGlzdFtrZXldKSB7XG4gICAgICAgICAgICAgIHdhcm4oYFwiJHtrZXl9XCIgZ2xvYmFsIHZhcmlhYmxlcyBhcmUgb3ZlcndyaXR0ZW4uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVycmlkZUxpc3Rba2V5XSA9IG92ZXJyaWRlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHJlY292ZXJMaXN0LCBjcmVhdGVkTGlzdCwgb3ZlcnJpZGVMaXN0LCBwcmVwYXJlTGlzdCB9O1xuICB9XG5cbiAgY2xlYXJFZmZlY3RzKCkge1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUNsZWFyRWZmZWN0LmVtaXQoKTtcbiAgICB0aGlzLnJlcGxhY2VHbG9iYWxWYXJpYWJsZXMucmVjb3Zlckxpc3QuZm9yRWFjaCgoZm4pID0+IGZuICYmIGZuKCkpO1xuICAgIC8vIGBkZWZlckNsZWFyRWZmZWN0c2AgbmVlZHMgdG8gYmUgcHV0IGF0IHRoZSBlbmRcbiAgICB0aGlzLmRlZmVyQ2xlYXJFZmZlY3RzLmZvckVhY2goKGZuKSA9PiBmbiAmJiBmbigpKTtcbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlckNsZWFyRWZmZWN0LmVtaXQoKTtcbiAgfVxuXG4gIG9wdGltaXplR2xvYmFsTWV0aG9kKHRlbXBFbnZLZXlzOiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICBsZXQgY29kZSA9ICcnO1xuICAgIGNvbnN0IG1ldGhvZHMgPSBvcHRpbWl6ZU1ldGhvZHMuZmlsdGVyKChwKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAvLyBJZiB0aGUgbWV0aG9kIGRvZXMgbm90IGV4aXN0IGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LCBkbyBub3QgY2FyZVxuICAgICAgICBwICYmXG4gICAgICAgICF0aGlzLmlzUHJvdGVjdFZhcmlhYmxlKHApICYmXG4gICAgICAgICF0ZW1wRW52S2V5cy5pbmNsdWRlcyhwKSAmJlxuICAgICAgICBoYXNPd24odGhpcy5nbG9iYWwsIHApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKG1ldGhvZHMubGVuZ3RoID4gMCkge1xuICAgICAgY29kZSA9IG1ldGhvZHMucmVkdWNlKChwcmV2Q29kZSwgbmFtZSkgPT4ge1xuICAgICAgICAvLyBDYW4gb25seSB1c2UgYGxldGAsIGlmIHlvdSB1c2UgYHZhcmAsXG4gICAgICAgIC8vIGRlY2xhcmluZyB0aGUgY2hhcmFjdGVyaXN0aWNzIGluIGFkdmFuY2Ugd2lsbCBjYXVzZSB5b3UgdG8gZmV0Y2ggZnJvbSB3aXRoLFxuICAgICAgICAvLyByZXN1bHRpbmcgaW4gYSByZWN1cnNpdmUgbG9vcFxuICAgICAgICByZXR1cm4gYCR7cHJldkNvZGV9IGxldCAke25hbWV9ID0gd2luZG93LiR7bmFtZX07YDtcbiAgICAgIH0sIGNvZGUpO1xuXG4gICAgICBpZiAodGhpcy5nbG9iYWwpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxbYCR7R0FSRklTSF9PUFRJTUlaRV9OQU1FfU1ldGhvZHNgXSA9IG1ldGhvZHM7XG4gICAgICAgIHRoaXMuZ2xvYmFsW2Ake0dBUkZJU0hfT1BUSU1JWkVfTkFNRX1VcGRhdGVTdGFja2BdID0gW107XG4gICAgICB9XG4gICAgICBjb2RlICs9IGB3aW5kb3cuJHtHQVJGSVNIX09QVElNSVpFX05BTUV9VXBkYXRlU3RhY2sucHVzaChmdW5jdGlvbihrLHYpe2V2YWwoaytcIj12XCIpfSk7YDtcbiAgICB9XG5cbiAgICBpZiAodGVtcEVudktleXMubGVuZ3RoID4gMCkge1xuICAgICAgY29kZSA9IHRlbXBFbnZLZXlzLnJlZHVjZSgocHJldkNvZGUsIG5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGAke3ByZXZDb2RlfSBsZXQgJHtuYW1lfSA9ICR7dGhpcy5lbnZWYXJpYWJsZX0uJHtuYW1lfTtgO1xuICAgICAgfSwgY29kZSk7XG4gICAgfVxuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgY3JlYXRlRXhlY1BhcmFtcyhjb2RlUmVmOiB7IGNvZGU6IHN0cmluZyB9LCBlbnY6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgICBjb25zdCB7IGRpc2FibGVXaXRoIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgY29uc3QgeyBwcmVwYXJlTGlzdCwgb3ZlcnJpZGVMaXN0IH0gPSB0aGlzLnJlcGxhY2VHbG9iYWxWYXJpYWJsZXM7XG5cbiAgICBpZiAocHJlcGFyZUxpc3QpIHtcbiAgICAgIHByZXBhcmVMaXN0LmZvckVhY2goKGZuKSA9PiBmbiAmJiBmbigpKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICB3aW5kb3c6IHRoaXMuZ2xvYmFsLFxuICAgICAgLi4ub3ZlcnJpZGVMaXN0LFxuICAgIH07XG5cbiAgICBpZiAoZGlzYWJsZVdpdGgpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCBlbnYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlbnZLZXlzID0gT2JqZWN0LmtleXMoZW52KTtcbiAgICAgIGNvbnN0IG9wdGltaXplQ29kZSA9XG4gICAgICAgIGVudktleXMubGVuZ3RoID4gMFxuICAgICAgICAgID8gdGhpcy5vcHRpbWl6ZUdsb2JhbE1ldGhvZChlbnZLZXlzKVxuICAgICAgICAgIDogdGhpcy5vcHRpbWl6ZUNvZGU7XG5cbiAgICAgIGNvZGVSZWYuY29kZSA9IGB3aXRoKHdpbmRvdykgezske29wdGltaXplQ29kZSArIGNvZGVSZWYuY29kZX1cXG59YDtcbiAgICAgIHBhcmFtc1t0aGlzLmVudlZhcmlhYmxlXSA9IGVudjtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgcHJvY2Vzc0V4ZWNFcnJvcihcbiAgICBlOiBhbnksXG4gICAgdXJsPzogc3RyaW5nLFxuICAgIGVudj86IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgb3B0aW9ucz86IGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnMsXG4gICkge1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmludm9rZUVycm9yLmVtaXQoZSwgdXJsLCBlbnYsIG9wdGlvbnMpO1xuICAgIC8vIGRpc3BhdGNoIGB3aW5kb3cub25lcnJvcmBcbiAgICBpZiAodGhpcy5nbG9iYWwgJiYgdHlwZW9mIHRoaXMuZ2xvYmFsLm9uZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHVybCB8fCB0aGlzLm9wdGlvbnMuYmFzZVVybDtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSk7XG4gICAgICBzYWZlV3JhcHBlcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsPy5vbmVycm9yPy5jYWxsKHRoaXMuZ2xvYmFsLCBtZXNzYWdlLCBzb3VyY2UsIG51bGwsIG51bGwsIGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cblxuICBleGVjU2NyaXB0KFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBlbnYgPSB7fSxcbiAgICB1cmwgPSAnJyxcbiAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgKSB7XG4gICAgY29uc3QgY29kZVJlZiA9IHsgY29kZSB9O1xuICAgIGNvbnN0IHsgYXN5bmMgfSA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVJbnZva2UuZW1pdChjb2RlUmVmLCB1cmwsIGVudiwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCByZXZlcnRDdXJyZW50U2NyaXB0ID0gc2V0RG9jQ3VycmVudFNjcmlwdChcbiAgICAgIHRoaXMuZ2xvYmFsPy5kb2N1bWVudCxcbiAgICAgIGNvZGVSZWYuY29kZSxcbiAgICAgIGZhbHNlLFxuICAgICAgdXJsLFxuICAgICAgYXN5bmMsXG4gICAgICBvcHRpb25zPy5vcmlnaW5TY3JpcHQsXG4gICAgKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmNyZWF0ZUV4ZWNQYXJhbXMoY29kZVJlZiwgZW52KTtcbiAgICAgIGNvZGVSZWYuY29kZSArPSBgXFxuJHt1cmwgPyBgLy8jIHNvdXJjZVVSTD0ke3VybH1cXG5gIDogJyd9YDtcbiAgICAgIGV2YWxXaXRoRW52KGNvZGVSZWYuY29kZSwgcGFyYW1zLCB0aGlzLmdsb2JhbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5wcm9jZXNzRXhlY0Vycm9yKGUsIHVybCwgZW52LCBvcHRpb25zKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihyZXZlcnRDdXJyZW50U2NyaXB0KTtcbiAgICB9XG5cbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlckludm9rZS5lbWl0KGNvZGVSZWYsIHVybCwgZW52LCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROYXRpdmVXaW5kb3coKSB7XG4gICAgbGV0IG1vZHVsZSA9IHdpbmRvdztcbiAgICB3aGlsZSAoaXNNb2R1bGUobW9kdWxlKSkge1xuICAgICAgbW9kdWxlID0gbW9kdWxlW19fZ2FyZmlzaEdsb2JhbF9fIGFzIGFueV0gYXMgV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICBzdGF0aWMgY2FuU3VwcG9ydCgpIHtcbiAgICBsZXQgc3VwcG9ydCA9IHRydWU7XG4gICAgaWYgKFxuICAgICAgIXdpbmRvdy5Qcm94eSB8fFxuICAgICAgIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyB8fFxuICAgICAgIVN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXNcbiAgICApIHtcbiAgICAgIHN1cHBvcnQgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gbGV0IHN0YXRlbWVudFxuICAgIGlmIChzdXBwb3J0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgRnVuY3Rpb24oJ2xldCBhID0gNjY2OycpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBzdXBwb3J0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc3VwcG9ydCkge1xuICAgICAgd2FybihcbiAgICAgICAgJ1RoZSBjdXJyZW50IGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgXCJ2bSBzYW5kYm94XCIsJyArXG4gICAgICAgICAgJ1BsZWFzZSB1c2UgdGhlIFwic25hcHNob3Qgc2FuZGJveFwiIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBzdXBwb3J0O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgaGFzT3duLCBtYWtlTWFwIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgdmVyaWZ5U2V0dGVyIH0gZnJvbSAnLi4vcHJveHlJbnRlcmNlcHRvci9zaGFyZWQnO1xuXG4vLyBDYW4ndCBzZXQgdG8gcHJveHkgaGlzdG9yeSB2YXJpYWJsZVxuY29uc3QgcGFzc2VkS2V5ID0gbWFrZU1hcChbJ3Njcm9sbFJlc3RvcmF0aW9uJ10pO1xuXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9yeU1vZHVsZSgpIHtcbiAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lmhpc3RvcnkpIHx8IEhpc3RvcnkucHJvdG90eXBlO1xuICBjb25zdCBmYWtlSGlzdG9yeSA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIGNvbnN0IHByb3h5SGlzdG9yeSA9IG5ldyBQcm94eShmYWtlSGlzdG9yeSwge1xuICAgIGdldCh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaGFzT3duKHRhcmdldCwgcCkgPyB0YXJnZXRbcF0gOiB3aW5kb3cuaGlzdG9yeVtwXTtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS5iaW5kKHdpbmRvdy5oaXN0b3J5KSA6IHZhbHVlO1xuICAgIH0sXG5cbiAgICBzZXQodGFyZ2V0OiBhbnksIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KSB7XG4gICAgICBjb25zdCBpc1Bhc3NLZXkgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZycgJiYgcGFzc2VkS2V5KHApO1xuICAgICAgY29uc3QgdmVyaWZ5U2V0dGVyUmVzdWx0ID0gdmVyaWZ5U2V0dGVyKFxuICAgICAgICBpc1Bhc3NLZXkgPyBoaXN0b3J5IDogbnVsbCxcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICBwLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgcmVjZWl2ZXIsXG4gICAgICApO1xuICAgICAgaWYgKHZlcmlmeVNldHRlclJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB2ZXJpZnlTZXR0ZXJSZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNQYXNzS2V5XG4gICAgICAgICAgPyBSZWZsZWN0LnNldChoaXN0b3J5LCBwLCB2YWx1ZSlcbiAgICAgICAgICA6IFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIFwiX19wcm90b19fXCIgaXMgbm90IGEgc3RhbmRhcmQgYXR0cmlidXRlLCBpdCBpcyB0ZW1wb3JhcmlseSBub3QgY29tcGF0aWJsZVxuICAgIGdldFByb3RvdHlwZU9mKCkge1xuICAgICAgcmV0dXJuIGZha2VIaXN0b3J5O1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGZha2VIaXN0b3J5Q3RvciA9IGZ1bmN0aW9uIEhpc3RvcnkoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICB9O1xuICAvLyBBdm9pZCBzaWRlIGVmZmVjdHMgb2YgcHJvdG90eXBlIGNoYWluIGJlaW5nIGNoYW5nZWRcbiAgZmFrZUhpc3RvcnlDdG9yLnByb3RvdHlwZSA9IGZha2VIaXN0b3J5O1xuICBmYWtlSGlzdG9yeUN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZmFrZUhpc3RvcnlDdG9yO1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIGhpc3Rvcnk6IHByb3h5SGlzdG9yeSxcbiAgICAgIEhpc3Rvcnk6IGZha2VIaXN0b3J5Q3RvcixcbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCB7IHdhcm4sIG1ha2VNYXAsIGlzT2JqZWN0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgaGFuZGxlclBhcmFtcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YURlc2NyaXB0b3IoZGVzYz86IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAndmFsdWUnIGluIGRlc2MgfHwgJ3dyaXRhYmxlJyBpbiBkZXNjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBY2Nlc3NvckRlc2NyaXB0b3IoZGVzYz86IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAnZ2V0JyBpbiBkZXNjIHx8ICdzZXQnIGluIGRlc2M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlHZXR0ZXJEZXNjcmlwdG9yKFxuICB0YXJnZXQ6IGFueSxcbiAgcDogUHJvcGVydHlLZXksXG4gIG5ld1ZhbHVlOiBhbnksXG4pIHtcbiAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwKTtcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm94eS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHMtZ2V0LXAtcmVjZWl2ZXJcbiAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCAmJiBkZXNjLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICBpZiAoaXNEYXRhRGVzY3JpcHRvcihkZXNjKSAmJiBkZXNjLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuaXNcbiAgICAgIGlmICghT2JqZWN0LmlzKG5ld1ZhbHVlLCBkZXNjLnZhbHVlKSkge1xuICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICB3YXJuKGBwcm9wZXJ0eSBcIiR7U3RyaW5nKHApfVwiIGlzIG5vbi1jb25maWd1cmFibGUgYW5kIG5vbi13cml0YWJsZS5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQWNjZXNzb3JEZXNjcmlwdG9yKGRlc2MpICYmIGRlc2MuZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVNldHRlcihcbiAgcHJveHlUYXJnZXQ6IGFueSxcbiAgdGFyZ2V0OiBhbnksXG4gIHA6IFByb3BlcnR5S2V5LFxuICB2YWw6IGFueSxcbiAgcmVjZWl2ZXI6IGFueSxcbikge1xuICBjb25zdCB2ZXJpZnlSZXN1bHQgPSB2ZXJpZnlTZXR0ZXJEZXNjcmlwdG9yKFxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHByb3h5VGFyZ2V0ID8gcHJveHlUYXJnZXQgOiAocmVjZWl2ZXIgfHwgdGFyZ2V0KSxcbiAgICBwLFxuICAgIHZhbCxcbiAgKTtcblxuICBsZXQgcmVzdWx0O1xuICBpZiAodmVyaWZ5UmVzdWx0ID4gMCkge1xuICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEgfHwgdmVyaWZ5UmVzdWx0ID09PSAyKSByZXN1bHQgPSBmYWxzZTtcbiAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAzKSByZXN1bHQgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVNldHRlckRlc2NyaXB0b3IoXG4gIHRhcmdldDogYW55LFxuICBwOiBQcm9wZXJ0eUtleSxcbiAgbmV3VmFsdWU6IGFueSxcbikge1xuICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHApO1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb3h5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90cy1zZXQtcC12LXJlY2VpdmVyXG4gIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgaWYgKGlzRGF0YURlc2NyaXB0b3IoZGVzYykgJiYgZGVzYy53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmlzXG4gICAgICBpZiAoIU9iamVjdC5pcyhuZXdWYWx1ZSwgZGVzYy52YWx1ZSkpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgd2FybihgcHJvcGVydHkgXCIke1N0cmluZyhwKX1cIiBpcyBub24tY29uZmlndXJhYmxlIGFuZCBub24td3JpdGFibGUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQWNjZXNzb3JEZXNjcmlwdG9yKGRlc2MpICYmIGRlc2Muc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gc2FmZVRvU3RyaW5nKHRoaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHRoaW5nLnRvU3RyaW5nKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gJ1t0b1N0cmluZyBmYWlsZWRdJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb25zdHJ1Y3RvcihmbjogKCkgPT4gdm9pZCB8IEZ1bmN0aW9uQ29uc3RydWN0b3IpIHtcbiAgY29uc3QgZnAgPSBmbi5wcm90b3R5cGU7XG4gIGNvbnN0IGhhc0NvbnN0cnVjdG9yID1cbiAgICBmcCAmJiBmcC5jb25zdHJ1Y3RvciA9PT0gZm4gJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZnApLmxlbmd0aCA+IDE7XG4gIGNvbnN0IGZ1bmN0aW9uU3RyID0gIWhhc0NvbnN0cnVjdG9yICYmIHNhZmVUb1N0cmluZyhmbik7XG5cbiAgcmV0dXJuIChcbiAgICBoYXNDb25zdHJ1Y3RvciB8fFxuICAgIC9eZnVuY3Rpb25cXHMrW0EtWl0vLnRlc3QoZnVuY3Rpb25TdHIpIHx8XG4gICAgL15jbGFzc1xcYi8udGVzdChmdW5jdGlvblN0cilcbiAgKTtcbn1cblxuY29uc3QgYnVpbGRJblByb3BzID0gbWFrZU1hcChbXG4gICdsZW5ndGgnLFxuICAnY2FsbGVyJyxcbiAgJ2NhbGxlZScsXG4gICdhcmd1bWVudHMnLFxuICAncHJvdG90eXBlJyxcbiAgU3ltYm9sLmhhc0luc3RhbmNlLFxuXSk7XG5cbmZ1bmN0aW9uIHRyYW5zZmVyUHJvcHMobzogRnVuY3Rpb24sIG46IEZ1bmN0aW9uKSB7XG4gIGZvciAoY29uc3Qga2V5IG9mIFJlZmxlY3Qub3duS2V5cyhvKSkge1xuICAgIGlmIChidWlsZEluUHJvcHMoa2V5KSkgY29udGludWU7XG4gICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iobiwga2V5KTtcbiAgICBpZiAoZGVzYyAmJiBkZXNjLndyaXRhYmxlKSB7XG4gICAgICBuW2tleV0gPSBvW2tleV07XG4gICAgfVxuICB9XG59XG5cbi8vIDEuIFRoaXMgcG9pbnRzIHRvIHRoZSBjb250ZXh0IG9mIHRoZSBmbiB0YXJnZXQgZnVuY3Rpb25cbi8vIDIuIEFzc3VyZSB0aGUgZ29hbCBhZnRlciB0aGUgYmluZCBmdW5jdGlvbiBwcm90b3R5cGUgbWV0aG9kIGJlIHJlcGxhY2VkIGFmdGVyIHRoZSBwcm90b3R5cGUgbWV0aG9kIHdvdWxkIG5vdCBiZSBhZmZlY3RlZFxuLy8gMy4gQXNzdXJlIHRoZSBvYmplY3RpdmUgZnVuY3Rpb24gYWZ0ZXIgdGhlIGJpbmQgaW5zdGFuY2VvZiBpbiBsaW5lIHdpdGggZXhwZWN0YXRpb25zXG4vLyA0LiBFbnN1cmUgdGhhdCBiaW5kIGFmdGVyIHRoZSBvYmplY3RpdmUgZnVuY3Rpb24gb2Ygbm9ybWFsIHN0YXRpYyBtZXRob2RzIGF2YWlsYWJsZVxuLy8gNS4gQWZ0ZXIgdGhlIGJpbmQgYWZ0ZXIgdGhlIG9iamVjdGl2ZSBmdW5jdGlvbiBpcyBuZXcgdG8gaW5zdGFudGlhdGUsIHBvaW50aW5nIHRvIHRoZWlyIG93blxuZXhwb3J0IGZ1bmN0aW9uIGJpbmQoZm4sIGNvbnRleHQ6IGFueSkge1xuICBjb25zdCBmTk9QID0gZnVuY3Rpb24gKCkge307XG4gIGZ1bmN0aW9uIGJvdW5kKHRoaXM6IGFueSkge1xuICAgIGNvbnN0IGFyZ3MgPSBoYW5kbGVyUGFyYW1zKGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgY29uc3Qgb2JqID0gbmV3IGZuKC4uLmFyZ3MpO1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG9iaiwgYm91bmQucHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZWNvcmQgb3JpZ2luIGZ1bmN0aW9uXG4gIGJvdW5kLiRuYXRpdmUgPSBmbjtcbiAgdHJhbnNmZXJQcm9wcyhmbiwgYm91bmQpO1xuXG4gIGlmIChmbi5wcm90b3R5cGUpIHtcbiAgICAvLyBgRnVuY3Rpb24ucHJvdG90eXBlYCBkb2Vzbid0IGhhdmUgYSBwcm90b3R5cGUgcHJvcGVydHlcbiAgICBmTk9QLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgfVxuICBib3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gIC8vIGZpeCBcImluc3RhbmNlb2ZcIlxuICBpZiAoU3ltYm9sLmhhc0luc3RhbmNlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJvdW5kLCBTeW1ib2wuaGFzSW5zdGFuY2UsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlKGluc3RhbmNlKSB7XG4gICAgICAgIGNvbnN0IG9wID0gZm4ucHJvdG90eXBlO1xuICAgICAgICByZXR1cm4gaXNPYmplY3Qob3ApIHx8IHR5cGVvZiBvcCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gaW5zdGFuY2UgaW5zdGFuY2VvZiBmblxuICAgICAgICAgIDogZmFsc2U7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBib3VuZDtcbn1cbiIsICJpbXBvcnQgeyBoYXNPd24sIG1ha2VNYXAsIG5leHRUaWNrIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4vc2FuZGJveCc7XG5pbXBvcnQgeyBGYWtlV2luZG93IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1xuICBfX3Byb3h5Tm9kZV9fLFxuICBfX3NhbmRib3hNYXBfXyxcbiAgX19lbGVtZW50U2FuZGJveFRhZ19fLFxufSBmcm9tICcuL3N5bWJvbFR5cGVzJztcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1mdW5jdGlvbi1wcm9wZXJ0aWVzLW9mLXRoZS1nbG9iYWwtb2JqZWN0XG5jb25zdCBlc0dsb2JhbE1ldGhvZHMgPVxuICAvLyBGdW5jdGlvbiBwcm9wZXJ0aWVzIG9mIHRoZSBnbG9iYWwgb2JqZWN0IC8vIEZ1bmN0aW9uIHByb3BlcnRpZXMgb2YgdGhlIGdsb2JhbCBvYmplY3RcbiAgKFxuICAgICdldmFsLGlzRmluaXRlLGlzTmFOLHBhcnNlRmxvYXQscGFyc2VJbnQsJyArXG4gICAgLy8gVVJMIGhhbmRsaW5nIGZ1bmN0aW9uc1xuICAgICdkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSxlbmNvZGVVUklDb21wb25lbnQsJyArXG4gICAgLy8gQ29uc3RydWN0b3IgcHJvcGVydGllcyBvZiB0aGUgZ2xvYmFsIG9iamVjdFxuICAgICdBcnJheSxBcnJheUJ1ZmZlcixCaWdJbnQsQmlnSW50NjRBcnJheSxCaWdVaW50NjRBcnJheSxCb29sZWFuLERhdGFWaWV3LERhdGUsRXJyb3IsRXZhbEVycm9yLCcgK1xuICAgICdGaW5hbGl6YXRpb25SZWdpc3RyeSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5LEZ1bmN0aW9uLEludDhBcnJheSxJbnQxNkFycmF5LEludDMyQXJyYXksTWFwLE51bWJlciwnICtcbiAgICAnT2JqZWN0LFByb21pc2UsUHJveHksUmFuZ2VFcnJvcixSZWZlcmVuY2VFcnJvcixSZWdFeHAsU2V0LFNoYXJlZEFycmF5QnVmZmVyLFN0cmluZyxTeW1ib2wsU3ludGF4RXJyb3IsJyArXG4gICAgJ1R5cGVFcnJvcixVaW50OEFycmF5LFVpbnQ4Q2xhbXBlZEFycmF5LFVpbnQxNkFycmF5LFVpbnQzMkFycmF5LFVSSUVycm9yLFdlYWtNYXAsV2Vha1JlZixXZWFrU2V0LCcgK1xuICAgIC8vIE90aGVyIFByb3BlcnRpZXMgb2YgdGhlIEdsb2JhbCBPYmplY3RcbiAgICAnQXRvbWljcyxKU09OLE1hdGgsUmVmbGVjdCwnXG4gICkuc3BsaXQoJywnKTtcblxuY29uc3QgbmF0aXZlQ29kZU1ldGhvZHMgPSAnaGFzT3duUHJvcGVydHksJy5zcGxpdCgnLCcpO1xuXG5leHBvcnQgY29uc3QgaXNFc0dsb2JhbE1ldGhvZHMgPSBtYWtlTWFwKGVzR2xvYmFsTWV0aG9kcyk7XG5leHBvcnQgY29uc3QgaXNOYXRpdmVDb2RlTWV0aG9kcyA9IG1ha2VNYXAobmF0aXZlQ29kZU1ldGhvZHMpO1xuXG4vLyBOZWVkIHRvIG9wdGltaXplLCBhdm9pZCBmcm9tIHRoZSB3aXRoXG4vLyBDYW4ndCBmaWx0ZXIgZG9jdW1lbnQsIGV2YWwga2V5d29yZHMsIHN1Y2ggYXMgZG9jdW1lbnQgaW4gaGFuZGxpbmcgcGFyZW50Tm9kZSB1c2VmdWxcbmV4cG9ydCBjb25zdCBvcHRpbWl6ZU1ldGhvZHMgPSBbLi4uZXNHbG9iYWxNZXRob2RzXS5maWx0ZXIoKHYpID0+IHYgIT09ICdldmFsJyk7XG5cbi8vIFRoZSBzYW5kYm94IG1heSBiZSB1c2VkIGFsb25lLCB0byBlbnN1cmUgdGhhdCB0aGUgYHNhbmRib3hNYXBgIGlzIGdsb2JhbGx5IHVuaXF1ZSxcbi8vIGJlY2F1c2Ugd2Ugd2lsbCBvbmx5IHJld3JpdGUgYGFwcGVuZENoaWxkYCBvbmNlXG5sZXQgc2FuZGJveExpc3Q6IE1hcDxudW1iZXIsIFNhbmRib3g+ID0gbmV3IE1hcCgpO1xuaWYgKCEod2luZG93IGFzIEZha2VXaW5kb3cpW19fc2FuZGJveE1hcF9fXSkge1xuICAod2luZG93IGFzIEZha2VXaW5kb3cpW19fc2FuZGJveE1hcF9fXSA9IHNhbmRib3hMaXN0O1xufSBlbHNlIHtcbiAgc2FuZGJveExpc3QgPSAod2luZG93IGFzIEZha2VXaW5kb3cpW19fc2FuZGJveE1hcF9fXTtcbn1cblxuZXhwb3J0IGNvbnN0IHNhbmRib3hNYXAgPSB7XG4gIHNhbmRib3hNYXA6IHNhbmRib3hMaXN0LFxuXG4gIGdldChlbGVtZW50OiBFbGVtZW50KTogU2FuZGJveCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG4gICAgY29uc3Qgc2FuZGJveElkID0gZWxlbWVudFtfX2VsZW1lbnRTYW5kYm94VGFnX19dO1xuICAgIGlmICh0eXBlb2Ygc2FuZGJveElkICE9PSAnbnVtYmVyJykgcmV0dXJuO1xuICAgIHJldHVybiB0aGlzLnNhbmRib3hNYXAuZ2V0KHNhbmRib3hJZCk7XG4gIH0sXG5cbiAgc2V0RWxlbWVudFRhZyhlbGVtZW50OiBFbGVtZW50LCBzYW5kYm94OiBTYW5kYm94KSB7XG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG4gICAgZWxlbWVudFtfX2VsZW1lbnRTYW5kYm94VGFnX19dID0gc2FuZGJveC5pZDtcbiAgfSxcblxuICBzZXQoc2FuZGJveDogU2FuZGJveCkge1xuICAgIGlmICh0aGlzLnNhbmRib3hNYXAuZ2V0KHNhbmRib3guaWQpKSByZXR1cm47XG4gICAgdGhpcy5zYW5kYm94TWFwLnNldChzYW5kYm94LmlkLCBzYW5kYm94KTtcbiAgfSxcblxuICBkZWwoc2FuZGJveDogU2FuZGJveCkge1xuICAgIHRoaXMuc2FuZGJveE1hcC5kZWxldGUoc2FuZGJveC5pZCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlclBhcmFtcyhhcmdzOiBJQXJndW1lbnRzIHwgQXJyYXk8YW55Pikge1xuICBhcmdzID0gQXJyYXkuaXNBcnJheShhcmdzKSA/IGFyZ3MgOiBBcnJheS5mcm9tKGFyZ3MpO1xuICByZXR1cm4gYXJncy5tYXAoKHYpID0+IHtcbiAgICByZXR1cm4gdiAmJiB2W19fcHJveHlOb2RlX19dID8gdltfX3Byb3h5Tm9kZV9fXSA6IHY7XG4gIH0pO1xufVxuXG4vLyBDb250YWluZXIgbm9kZSwgYmVjYXVzZSBpdCBjaGFuZ2VzIGFsbCB0aGUgdGltZSwgdGFrZSBpdCBhcyB5b3UgdXNlIGl0XG5leHBvcnQgZnVuY3Rpb24gcm9vdEVsbShzYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IHNhbmRib3ggJiYgc2FuZGJveC5vcHRpb25zLmVsO1xuICByZXR1cm4gY29udGFpbmVyICYmIGNvbnRhaW5lcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbklmcmFtZSgpIHtcbiAgcmV0dXJuIHdpbmRvdz8ucGFyZW50Py5fX0dBUkZJU0hfXyAhPT0gd2luZG93Py5fX0dBUkZJU0hfXztcbn1cblxuLy8gQ29weSBcIndpbmRvd1wiIGFuZCBcImRvY3VtZW50XCJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGYWtlT2JqZWN0KFxuICB0YXJnZXQ6IFJlY29yZDxQcm9wZXJ0eUtleSwgYW55PixcbiAgZmlsdGVyPzogKGtleTogUHJvcGVydHlLZXkpID0+IGJvb2xlYW4sXG4gIGlzV3JpdGFibGU/OiAoa2V5OiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbixcbikge1xuICBjb25zdCBmYWtlT2JqZWN0ID0ge307XG4gIGNvbnN0IHByb3BlcnR5TWFwID0ge307XG4gIGNvbnN0IHN0b3JhZ2VCb3ggPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBTdG9yZSBjaGFuZ2VkIHZhbHVlXG4gIGNvbnN0IHByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICBjb25zdCBkZWYgPSAocDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwKTtcblxuICAgIGlmIChkZXNjcmlwdG9yPy5jb25maWd1cmFibGUpIHtcbiAgICAgIGNvbnN0IGhhc0dldHRlciA9IGhhc093bihkZXNjcmlwdG9yLCAnZ2V0Jyk7XG4gICAgICBjb25zdCBoYXNTZXR0ZXIgPSBoYXNPd24oZGVzY3JpcHRvciwgJ3NldCcpO1xuICAgICAgY29uc3QgY2FuV3JpdGFibGUgPSB0eXBlb2YgaXNXcml0YWJsZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc1dyaXRhYmxlKHApO1xuXG4gICAgICBpZiAoaGFzR2V0dGVyKSB7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBkZXNjcmlwdG9yLmdldCA9ICgpID0+IGhhc093bihzdG9yYWdlQm94LCBwKVxuICAgICAgICAgID8gc3RvcmFnZUJveFtwXVxuICAgICAgICAgIDogdGFyZ2V0W3BdO1xuICAgICAgfVxuICAgICAgaWYgKGhhc1NldHRlcikge1xuICAgICAgICBkZXNjcmlwdG9yLnNldCA9ICh2YWwpID0+IHtcbiAgICAgICAgICBzdG9yYWdlQm94W3BdID0gdmFsO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKGNhbldyaXRhYmxlKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc0dldHRlcikge1xuICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKHZhbCkgPT4ge1xuICAgICAgICAgICAgc3RvcmFnZUJveFtwXSA9IHZhbDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmYWtlT2JqZWN0LCBwLCBPYmplY3QuZnJlZXplKGRlc2NyaXB0b3IpKTtcbiAgICB9XG4gIH07XG4gIHByb3BlcnR5TmFtZXMuZm9yRWFjaCgocCkgPT4ge1xuICAgIHByb3BlcnR5TWFwW3BdID0gdHJ1ZTtcbiAgICB0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nID8gIWZpbHRlcihwKSAmJiBkZWYocCkgOiBkZWYocCk7XG4gIH0pO1xuICAvLyBcInByb3BcIiBtYXliZSBpbiBwcm90b3R5cGUgY2hhaW5cbiAgZm9yIChjb25zdCBwcm9wIGluIHRhcmdldCkge1xuICAgICFwcm9wZXJ0eU1hcFtwcm9wXSAmJiBkZWYocHJvcCk7XG4gIH1cbiAgcmV0dXJuIGZha2VPYmplY3QgYXMgYW55O1xufVxuXG5sZXQgc2V0dGluZyA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gbWljcm9UYXNrSHRtbFByb3h5RG9jdW1lbnQocHJveHlEb2N1bWVudCkge1xuICAvLyBUaGUgSFRNTCBwYXJlbnQgbm9kZSBpbnRvIGFnZW50IGZvciB0aGUgZG9jdW1lbnRcbiAgLy8gSW4gbWljcm8gdGFza3MgcmVwbGFjZSBwcmltYXJ5IG5vZGVcbiAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmNoaWxkcmVuWzBdO1xuICBpZiAoaHRtbCAmJiBodG1sLnBhcmVudE5vZGUgIT09IHByb3h5RG9jdW1lbnQpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaHRtbCwgJ3BhcmVudE5vZGUnLCB7XG4gICAgICB2YWx1ZTogcHJveHlEb2N1bWVudCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICBzZXR0aW5nID0gZmFsc2U7XG4gICAgICAvLyBEbyBub3QgdXNlIG1pY3JvIHRhc2tzLCBFbGVtZW50IHdpbGwgYXBwZWFyIGluIHRoZSB0YXNrIHBsYWNlZCBpbiBuZXh0VGljayBhZnRlciBub2RlXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHNldHRpbmcgPSB0cnVlO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaHRtbCwgJ3BhcmVudE5vZGUnLCB7XG4gICAgICAgICAgdmFsdWU6IGRvY3VtZW50LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3R5bGVkQ29tcG9uZW50c0xpa2UoZWxlbWVudDogSFRNTFN0eWxlRWxlbWVudCkge1xuICAvLyBBIHN0eWxlZC1jb21wb25lbnRzIGxpa2VkIGVsZW1lbnQgaGFzIG5vIHRleHRDb250ZW50IGJ1dCBrZWVwIHRoZSBydWxlcyBpbiBpdHMgc2hlZXQuY3NzUnVsZXMuXG4gIHJldHVybiAoXG4gICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTdHlsZUVsZW1lbnQgJiZcbiAgICAhZWxlbWVudC50ZXh0Q29udGVudCAmJlxuICAgIGVsZW1lbnQuc2hlZXQ/LmNzc1J1bGVzLmxlbmd0aFxuICApO1xufVxuIiwgImV4cG9ydCBjb25zdCBHQVJGSVNIX05BTUVTUEFDRV9QUkVGSVggPSAnX19HYXJmaXNoX18nO1xuZXhwb3J0IGNvbnN0IEdBUkZJU0hfT1BUSU1JWkVfTkFNRSA9ICdfX2dhcmZpc2hfb3B0aW1pemVfXyc7XG5leHBvcnQgY29uc3QgX19wcm94eU5vZGVfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2gucHJveHlOb2RlJyk7XG5leHBvcnQgY29uc3QgX19kb21XcmFwcGVyX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLmRvbVdyYXBwZXInKTtcbmV4cG9ydCBjb25zdCBfX3dpbmRvd0JpbmRfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2gud2luZG93QmluZCcpO1xuZXhwb3J0IGNvbnN0IF9fc2FuZGJveE1hcF9fID0gU3ltYm9sLmZvcignZ2FyZmlzaC5zYW5kYm94TWFwJyk7XG5leHBvcnQgY29uc3QgX19kb2N1bWVudEJpbmRfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2guZG9jdW1lbnRCaW5kJyk7XG5leHBvcnQgY29uc3QgX19nYXJmaXNoR2xvYmFsX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLmdsb2JhbE9iamVjdCcpO1xuZXhwb3J0IGNvbnN0IF9fZWxlbWVudFNhbmRib3hUYWdfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2guZWxlbWVudFNhbmRib3hUYWcnKTtcbiIsICJpbXBvcnQge1xuICBoYXNPd24sXG4gIGlzUHJvbWlzZSxcbiAgaXNBYnNvbHV0ZSxcbiAgdHJhbnNmb3JtVXJsLFxuICB0b1dzUHJvdG9jb2wsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuLi9zYW5kYm94JztcblxuZXhwb3J0IGZ1bmN0aW9uIG5ldHdvcmtNb2R1bGUoc2FuZGJveDogU2FuZGJveCkge1xuICBjb25zdCBiYXNlVXJsID0gc2FuZGJveC5vcHRpb25zLmJhc2VVcmw7XG4gIGNvbnN0IHdzU2V0ID0gbmV3IFNldDxmYWtlV2ViU29ja2V0PigpO1xuICBjb25zdCB4aHJTZXQgPSBuZXcgU2V0PGZha2VYTUxIdHRwUmVxdWVzdD4oKTtcbiAgY29uc3QgZmV0Y2hTZXQgPSBuZXcgU2V0PEFib3J0Q29udHJvbGxlcj4oKTtcbiAgY29uc3QgbmVlZEZpeCA9ICh1cmwpID0+XG4gICAgc2FuZGJveC5vcHRpb25zLmZpeEJhc2VVcmwgJiZcbiAgICBiYXNlVXJsICYmXG4gICAgdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgJiZcbiAgICAhaXNBYnNvbHV0ZSh1cmwpO1xuXG4gIGNsYXNzIGZha2VYTUxIdHRwUmVxdWVzdCBleHRlbmRzIFhNTEh0dHBSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB4aHJTZXQuYWRkKHRoaXMpO1xuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAvLyBBc3luYyByZXF1ZXN0XG4gICAgICBpZiAoYXJndW1lbnRzWzJdID09PSBmYWxzZSkge1xuICAgICAgICB4aHJTZXQuZGVsZXRlKHRoaXMpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRGaXgoYXJndW1lbnRzWzFdKSkge1xuICAgICAgICBhcmd1bWVudHNbMV0gPSBiYXNlVXJsXG4gICAgICAgICAgPyB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgYXJndW1lbnRzWzFdKVxuICAgICAgICAgIDogYXJndW1lbnRzWzFdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cmwgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgIGlmKHNhbmRib3gub3B0aW9ucy5hZGRTb3VyY2VMaXN0KXtcbiAgICAgICAgc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3Qoe1xuICAgICAgICAgIHRhZ05hbWU6ICd4bWxodHRwcmVxdWVzdCcsXG4gICAgICAgICAgdXJsLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXBlci5vcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgYWJvcnQoKSB7XG4gICAgICB4aHJTZXQuZGVsZXRlKHRoaXMpO1xuICAgICAgcmV0dXJuIHN1cGVyLmFib3J0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgZmFrZVdlYlNvY2tldCBleHRlbmRzIFdlYlNvY2tldCB7XG4gICAgY29uc3RydWN0b3IodXJsLCBwcm90b2NvbHM/OiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgaWYgKG5lZWRGaXgodXJsKSAmJiBiYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VXc1VybCA9IHRvV3NQcm90b2NvbChiYXNlVXJsKTtcbiAgICAgICAgdXJsID0gdHJhbnNmb3JtVXJsKGJhc2VXc1VybCwgYXJndW1lbnRzWzFdKTtcbiAgICAgIH1cbiAgICAgIHN1cGVyKHVybCwgcHJvdG9jb2xzKTtcbiAgICAgIHdzU2V0LmFkZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgIHdzU2V0LmRlbGV0ZSh0aGlzKTtcbiAgICAgIHJldHVybiBzdXBlci5jbG9zZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGBmZXRjaGAgaXMgbm90IGNvbnN0cnVjdG9yXG4gIGNvbnN0IGZha2VGZXRjaCA9IChpbnB1dCwgb3B0aW9uczogUmVxdWVzdEluaXQgPSB7fSkgPT4ge1xuICAgIGlmIChuZWVkRml4KGlucHV0KSAmJiBiYXNlVXJsKSB7XG4gICAgICBpbnB1dCA9IHRyYW5zZm9ybVVybChiYXNlVXJsLCBpbnB1dCk7XG4gICAgfVxuICAgIGlmKHNhbmRib3gub3B0aW9ucy5hZGRTb3VyY2VMaXN0KXtcbiAgICAgIHNhbmRib3gub3B0aW9ucy5hZGRTb3VyY2VMaXN0KHsgdGFnTmFtZTogJ2ZldGNoJywgdXJsOiBpbnB1dCB9KTtcbiAgICB9XG4gICAgbGV0IGNvbnRyb2xsZXI7XG4gICAgaWYgKCFoYXNPd24ob3B0aW9ucywgJ3NpZ25hbCcpICYmIHdpbmRvdy5BYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgd2luZG93LkFib3J0Q29udHJvbGxlcigpO1xuICAgICAgZmV0Y2hTZXQuYWRkKGNvbnRyb2xsZXIpO1xuICAgICAgb3B0aW9ucy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gd2luZG93LmZldGNoKGlucHV0LCBvcHRpb25zKTtcbiAgICByZXR1cm4gY29udHJvbGxlciAmJiBpc1Byb21pc2UocmVzdWx0KVxuICAgICAgPyByZXN1bHQuZmluYWxseSgoKSA9PiBmZXRjaFNldC5kZWxldGUoY29udHJvbGxlcikpXG4gICAgICA6IHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG92ZXJyaWRlOiB7XG4gICAgICBXZWJTb2NrZXQ6IGZha2VXZWJTb2NrZXQgYXMgYW55LFxuICAgICAgWE1MSHR0cFJlcXVlc3Q6IGZha2VYTUxIdHRwUmVxdWVzdCBhcyBhbnksXG4gICAgICBmZXRjaDogZmFrZUZldGNoLFxuICAgIH0sXG5cbiAgICByZWNvdmVyKCkge1xuICAgICAgd3NTZXQuZm9yRWFjaCgod3MpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB3cy5jbG9zZSA9PT0gJ2Z1bmN0aW9uJykgd3MuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgICAgeGhyU2V0LmZvckVhY2goKHhocikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHhoci5hYm9ydCA9PT0gJ2Z1bmN0aW9uJykgeGhyLmFib3J0KCk7XG4gICAgICB9KTtcbiAgICAgIGZldGNoU2V0LmZvckVhY2goKGN0b3IpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjdG9yLmFib3J0ID09PSAnZnVuY3Rpb24nKSBjdG9yLmFib3J0KCk7XG4gICAgICB9KTtcblxuICAgICAgd3NTZXQuY2xlYXIoKTtcbiAgICAgIHhoclNldC5jbGVhcigpO1xuICAgICAgZmV0Y2hTZXQuY2xlYXIoKTtcbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGhhc093bixcbiAgbWFrZU1hcCxcbiAgaXNPYmplY3QsXG4gIGZpbmRUYXJnZXQsXG4gIHNhZmFyaTEzRGVhbCxcbiAgX19Nb2NrQm9keV9fLFxuICBfX01vY2tIZWFkX18sXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuLi9zYW5kYm94JztcbmltcG9ydCB7IHJvb3RFbG0sIHNhbmRib3hNYXAgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBfX2RvY3VtZW50QmluZF9fIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHsgYmluZCwgdmVyaWZ5R2V0dGVyRGVzY3JpcHRvciwgdmVyaWZ5U2V0dGVyRGVzY3JpcHRvciB9IGZyb20gJy4vc2hhcmVkJztcblxuY29uc3QgcGFzc2VkS2V5ID0gbWFrZU1hcChbJ3RpdGxlJywgJ2Nvb2tpZScsICdvbnNlbGVjdHN0YXJ0JywgJ29uZHJhZ3N0YXJ0J10pO1xuXG5jb25zdCBxdWVyeUZ1bmN0aW9ucyA9IG1ha2VNYXAoW1xuICAncXVlcnlTZWxlY3RvcicsXG4gICdxdWVyeVNlbGVjdG9yQWxsJyxcbiAgJ2dldEVsZW1lbnRCeUlkJyxcbiAgJ2dldEVsZW1lbnRzQnlUYWdOYW1lJyxcbiAgJ2dldEVsZW1lbnRzQnlUYWdOYW1lTlMnLFxuICAnZ2V0RWxlbWVudHNCeUNsYXNzTmFtZScsXG5dKTtcblxuLy8gZG9jdW1lbnQgcHJveHkgZ2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2V0dGVyKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyPzogYW55KSA9PiB7XG4gICAgaWYgKHAgPT09ICdhY3RpdmVFbGVtZW50Jykge1xuICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGRvY3VtZW50LCBwKTtcbiAgICB9XG5cbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3RFbG0oc2FuZGJveCk7XG4gICAgY29uc3Qgc3RyaWN0SXNvbGF0aW9uID0gc2FuZGJveC5vcHRpb25zLnN0cmljdElzb2xhdGlvbjtcbiAgICBjb25zdCB2YWx1ZSA9IGhhc093bih0YXJnZXQsIHApXG4gICAgICA/IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpXG4gICAgICA6IFJlZmxlY3QuZ2V0KGRvY3VtZW50LCBwKTtcblxuICAgIC8vIFByb3ZpZGUgaG9va3MgZm9yIHVzZXJzIHRvIHJldHVybiBzcGVjaWZpYyB2YWx1ZXMgdGhlbXNlbHZlc1xuICAgIGNvbnN0IGhvb2tzUmVzID0gc2FuZGJveC5ob29rcy5saWZlY3ljbGUuZG9jdW1lbnRHZXR0ZXIuZW1pdCh7XG4gICAgICB2YWx1ZSxcbiAgICAgIHJvb3ROb2RlLFxuICAgICAgcHJvcE5hbWU6IHAsXG4gICAgICBwcm94eURvY3VtZW50OiB0YXJnZXQsXG4gICAgICBjdXN0b21WYWx1ZTogbnVsbCxcbiAgICB9KTtcblxuICAgIGlmIChob29rc1Jlcy5jdXN0b21WYWx1ZSkge1xuICAgICAgcmV0dXJuIGhvb2tzUmVzLmN1c3RvbVZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IHNldFNhbmRib3hSZWYgPSAoZWwpID0+IHtcbiAgICAgIGlmIChpc09iamVjdChlbCkpIHtcbiAgICAgICAgc2FuZGJveE1hcC5zZXRFbGVtZW50VGFnKGVsLCBzYW5kYm94KTtcbiAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgZWwuX19TQU5EQk9YX18gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuICAgIGlmIChyb290Tm9kZSkge1xuICAgICAgaWYgKHAgPT09ICdjcmVhdGVFbGVtZW50Jykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IHZhbHVlLmNhbGwoZG9jdW1lbnQsIHRhZ05hbWUsIG9wdGlvbnMpO1xuICAgICAgICAgIHJldHVybiBzZXRTYW5kYm94UmVmKGVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAocCA9PT0gJ2NyZWF0ZVRleHROb2RlJykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IHZhbHVlLmNhbGwoZG9jdW1lbnQsIGRhdGEpO1xuICAgICAgICAgIHJldHVybiBzZXRTYW5kYm94UmVmKGVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAocCA9PT0gJ2hlYWQnKSB7XG4gICAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHJvb3ROb2RlLCBbJ2hlYWQnLCBgZGl2WyR7X19Nb2NrSGVhZF9ffV1gXSkgfHwgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHJvb3ROb2RlIGlzIGEgU2hhZG93IGRvbVxuICAgICAgaWYgKHN0cmljdElzb2xhdGlvbikge1xuICAgICAgICBpZiAocCA9PT0gJ2JvZHknKSB7XG4gICAgICAgICAgLy8gV2hlbiB0aGUgbm9kZSBpcyBpbnNlcnRlZCwgaWYgaXQgaXMgYSBwb3AtdXAgc2NlbmUsXG4gICAgICAgICAgLy8gaXQgbmVlZHMgdG8gYmUgcGxhY2VkIGdsb2JhbGx5LCBzbyBpdCBpcyBub3QgcGxhY2VkIG91dHNpZGUgYnkgZGVmYXVsdC5cbiAgICAgICAgICByZXR1cm4gZmluZFRhcmdldChyb290Tm9kZSwgWydib2R5JywgYGRpdlske19fTW9ja0JvZHlfX31dYF0pO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5RnVuY3Rpb25zKHApKSB7XG4gICAgICAgICAgcmV0dXJuIHAgPT09ICdnZXRFbGVtZW50QnlJZCdcbiAgICAgICAgICAgID8gKGlkKSA9PiByb290Tm9kZS5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKVxuICAgICAgICAgICAgOiByb290Tm9kZVtwXS5iaW5kKHJvb3ROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IGhhc093bih2YWx1ZSwgX19kb2N1bWVudEJpbmRfXylcbiAgICAgICAgPyB2YWx1ZVtfX2RvY3VtZW50QmluZF9fXVxuICAgICAgICA6IG51bGw7XG4gICAgICBpZiAoIW5ld1ZhbHVlKSBuZXdWYWx1ZSA9IGJpbmQodmFsdWUsIGRvY3VtZW50KTtcblxuICAgICAgY29uc3QgdmVyaWZ5UmVzdWx0ID0gdmVyaWZ5R2V0dGVyRGVzY3JpcHRvcih0YXJnZXQsIHAsIG5ld1ZhbHVlKTtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPiAwKSB7XG4gICAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMikgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHZhbHVlW19fZG9jdW1lbnRCaW5kX19dID0gbmV3VmFsdWU7XG4gICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuY29uc3Qgc2FmYXJpUHJveHlEb2N1bWVudERlYWxIYW5kbGVyID0gc2FmYXJpMTNEZWFsKCk7XG5cbi8vIGRvY3VtZW50IHByb3h5IHNldHRlclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNldHRlcihzYW5kYm94KSB7XG4gIHJldHVybiAodGFyZ2V0OiBhbnksIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KSA9PiB7XG4gICAgY29uc3Qgcm9vdE5vZGUgPSByb290RWxtKHNhbmRib3gpO1xuICAgIGNvbnN0IHZlcmlmeVJlc3VsdCA9IHZlcmlmeVNldHRlckRlc2NyaXB0b3IoXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIHR5cGVvZiBwID09PSAnc3RyaW5nJyAmJiBwYXNzZWRLZXkocClcbiAgICAgICAgPyBkb2N1bWVudFxuICAgICAgICA6IChyZWNlaXZlciB8fCB0YXJnZXQpLFxuICAgICAgcCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEgfHwgdmVyaWZ5UmVzdWx0ID09PSAyKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAzKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBcHBsaWNhdGlvbiBhcmVhIG9mIHRoZSBiYW4gb24gc2VsZWN0ZWQsIGlmIHVzZXJzIHdhbnQgdG8gYmFuIHRoZSBnbG9iYWwgbmVlZCB0byBzZXQgb24gdGhlIG1haW4gYXBwbGljYXRpb25cbiAgICBpZiAocCA9PT0gJ29uc2VsZWN0c3RhcnQnIHx8IHAgPT09ICdvbmRyYWdzdGFydCcpIHtcbiAgICAgIGlmIChyb290Tm9kZSkge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQocm9vdE5vZGUsIHAsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldChkb2N1bWVudCwgcCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcCA9PT0gJ3N0cmluZycgJiYgcGFzc2VkS2V5KHApKSB7XG4gICAgICByZXR1cm4gUmVmbGVjdC5zZXQoZG9jdW1lbnQsIHAsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2FmYXJpUHJveHlEb2N1bWVudERlYWxIYW5kbGVyLnRyaWdnZXJTZXQoKTtcbiAgICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIHAsIHZhbHVlLCByZWNlaXZlcik7XG4gICAgfVxuICB9O1xufVxuXG4vLyBkb2N1bWVudCBwcm94eSBkZWZpbmVQcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlZmluZVByb3BlcnR5KCkge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwOiBQcm9wZXJ0eUtleSwgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSA9PiB7XG4gICAgc2FmYXJpUHJveHlEb2N1bWVudERlYWxIYW5kbGVyLmhhbmRsZURlc2NyaXB0b3IoZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIHBhc3NlZEtleShwKVxuICAgICAgPyBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGRvY3VtZW50LCBwLCBkZXNjcmlwdG9yKVxuICAgICAgOiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcCwgZGVzY3JpcHRvcik7XG4gIH07XG59XG5cbi8vIGRvY3VtZW50IHByb3h5IGhhc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhhcygpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXkpID0+IHtcbiAgICBpZiAocCA9PT0gJ2FjdGl2ZUVsZW1lbnQnKSByZXR1cm4gUmVmbGVjdC5oYXMoZG9jdW1lbnQsIHApO1xuICAgIHJldHVybiBoYXNPd24odGFyZ2V0LCBwKSB8fCBSZWZsZWN0Lmhhcyhkb2N1bWVudCwgcCk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgX19wcm94eU5vZGVfXyB9IGZyb20gJy4uL3N5bWJvbFR5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUZha2VPYmplY3QsIG1pY3JvVGFza0h0bWxQcm94eURvY3VtZW50IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlSGFzLFxuICBjcmVhdGVHZXR0ZXIsXG4gIGNyZWF0ZVNldHRlcixcbiAgY3JlYXRlRGVmaW5lUHJvcGVydHksXG59IGZyb20gJy4uL3Byb3h5SW50ZXJjZXB0b3IvZG9jdW1lbnQnO1xuXG5leHBvcnQgY29uc3QgZG9jdW1lbnRNb2R1bGUgPSAoc2FuZGJveDogU2FuZGJveCkgPT4ge1xuICBsZXQgcHJveHlEb2N1bWVudCA9IE9iamVjdC5jcmVhdGUoZG9jdW1lbnQpO1xuICBjb25zdCBnZXR0ZXIgPSBjcmVhdGVHZXR0ZXIoc2FuZGJveCk7XG5cbiAgY29uc3QgZmFrZURvY3VtZW50ID0gY3JlYXRlRmFrZU9iamVjdChkb2N1bWVudCk7XG5cbiAgY29uc3QgZmFrZURvY3VtZW50UHJvdG8gPSBuZXcgUHJveHkoZmFrZURvY3VtZW50LCB7XG4gICAgZ2V0OiAoLi4uYXJncykgPT4ge1xuICAgICAgbWljcm9UYXNrSHRtbFByb3h5RG9jdW1lbnQocHJveHlEb2N1bWVudCk7XG4gICAgICByZXR1cm4gZ2V0dGVyKC4uLmFyZ3MpO1xuICAgIH0sXG4gICAgaGFzOiBjcmVhdGVIYXMoKSxcbiAgfSk7XG4gIFxuXG4gIHByb3h5RG9jdW1lbnQgPSBuZXcgUHJveHkoXG4gICAgT2JqZWN0LmNyZWF0ZShmYWtlRG9jdW1lbnRQcm90bywge1xuICAgICAgY3VycmVudFNjcmlwdDoge1xuICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB9LFxuICAgICAgW19fcHJveHlOb2RlX19dOiB7XG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IGRvY3VtZW50LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB7XG4gICAgICBzZXQ6IGNyZWF0ZVNldHRlcihzYW5kYm94KSxcbiAgICAgIGRlZmluZVByb3BlcnR5OiBjcmVhdGVEZWZpbmVQcm9wZXJ0eSgpLFxuICAgICAgZ2V0UHJvdG90eXBlT2YgKCkge1xuICAgICAgICByZXR1cm4gSFRNTERvY3VtZW50LnByb3RvdHlwZSB8fCBEb2N1bWVudC5wcm90b3R5cGU7XG4gICAgICB9LFxuICAgIH0sXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBvdmVycmlkZToge1xuICAgICAgZG9jdW1lbnQ6IHByb3h5RG9jdW1lbnQsXG4gICAgfSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgZ2V0VHlwZSB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxuLy8gVGhlIGxvZ2ljIG9mIFVJRXZlbnQgaXMgcmVmZXJlbmNlZCBmcm9tIHFpYW5rdW4gdHlwb2dyYXBoeVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3VtaWpzL3FpYW5rdW4vcHVsbC81OTMvZmlsZXNcbi8vIFRPRE86IGZpeCBub3JtYWwgbW91c2UgZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ID09PSBmYWxzZVxuZXhwb3J0IGNsYXNzIE1vdXNlRXZlbnRQYXRjaCBleHRlbmRzIE1vdXNlRXZlbnQge1xuICBjb25zdHJ1Y3Rvcih0eXBlQXJnOiBzdHJpbmcsIG1vdXNlRXZlbnRJbml0PzogTW91c2VFdmVudEluaXQpIHtcbiAgICBpZiAobW91c2VFdmVudEluaXQgJiYgZ2V0VHlwZShtb3VzZUV2ZW50SW5pdC52aWV3KSA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIG1vdXNlRXZlbnRJbml0LnZpZXcgPSB3aW5kb3c7XG4gICAgfVxuICAgIHN1cGVyKHR5cGVBcmcsIG1vdXNlRXZlbnRJbml0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVWlFdmVudE92ZXJyaWRlKCkge1xuICByZXR1cm4ge1xuICAgIG92ZXJyaWRlOiB7XG4gICAgICBNb3VzZUV2ZW50OiBNb3VzZUV2ZW50UGF0Y2ggYXMgYW55LFxuICAgIH0sXG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgR0FSRklTSF9OQU1FU1BBQ0VfUFJFRklYIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgQ3VzU3RvcmFnZSB7XG4gIHByZWZpeDogc3RyaW5nO1xuICBuYW1lc3BhY2U6IHN0cmluZztcbiAgcmF3U3RvcmFnZTogU3RvcmFnZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lc3BhY2U6IHN0cmluZywgcmF3U3RvcmFnZTogU3RvcmFnZSkge1xuICAgIHRoaXMucmF3U3RvcmFnZSA9IHJhd1N0b3JhZ2U7XG4gICAgdGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgdGhpcy5wcmVmaXggPSBgJHtHQVJGSVNIX05BTUVTUEFDRV9QUkVGSVh9JHtuYW1lc3BhY2V9X19gO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRLZXlzKCkubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRLZXlzKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnJhd1N0b3JhZ2UpLmZpbHRlcigoa2V5KSA9PlxuICAgICAga2V5LnN0YXJ0c1dpdGgodGhpcy5wcmVmaXgpLFxuICAgICk7XG4gIH1cblxuICAvLyBHZXQgdGhlIFwiblwiIGtleSBvZiB0aGUgY3VycmVudCBuYW1lc3BhY2UsIHlvdSBuZWVkIHRvIHJlbW92ZSB0aGUgcHJlZml4XG4gIGtleShuOiBudW1iZXIpIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleXMoKVtuXTtcbiAgICByZXR1cm4ga2V5ID8ga2V5LnN1YnN0cmluZyh0aGlzLnByZWZpeC5sZW5ndGgpIDogbnVsbDtcbiAgfVxuXG4gIGdldEl0ZW0oa2V5TmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmF3U3RvcmFnZS5nZXRJdGVtKGAke3RoaXMucHJlZml4ICsga2V5TmFtZX1gKTtcbiAgfVxuXG4gIHNldEl0ZW0oa2V5TmFtZTogc3RyaW5nLCBrZXlWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yYXdTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5wcmVmaXggKyBrZXlOYW1lfWAsIGtleVZhbHVlKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oa2V5TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yYXdTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5wcmVmaXggKyBrZXlOYW1lfWApO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5nZXRLZXlzKCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLnJhd1N0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhbFN0b3JhZ2VNb2R1bGUoc2FuZGJveDogU2FuZGJveCkge1xuICBjb25zdCBuYW1lc3BhY2UgPSBzYW5kYm94Lm9wdGlvbnMubmFtZXNwYWNlO1xuICByZXR1cm4ge1xuICAgIG92ZXJyaWRlOiB7XG4gICAgICBsb2NhbFN0b3JhZ2U6IG5ldyBDdXNTdG9yYWdlKG5hbWVzcGFjZSwgbG9jYWxTdG9yYWdlKSxcbiAgICAgIHNlc3Npb25TdG9yYWdlOiBuZXcgQ3VzU3RvcmFnZShuYW1lc3BhY2UsIHNlc3Npb25TdG9yYWdlKSxcbiAgICB9LFxuICB9O1xufVxuIiwgIi8vIGltcG9ydCB7IGZpbHRlckFuZFdyYXBFdmVudExpc3RlbmVyIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuXG50eXBlIE9wdHMgPSBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnM7XG50eXBlIExpc3RlbmVyID0gRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlbmVyTW9kdWxlKF9zYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBMaXN0ZW5lcltdPigpO1xuICBjb25zdCByYXdBZGRFdmVudExpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG4gIGNvbnN0IHJhd1JlbW92ZUV2ZW50TGlzdGVuZXIgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcihcbiAgICB0aGlzOiBhbnksXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyOiBMaXN0ZW5lcixcbiAgICBvcHRpb25zPzogT3B0cyxcbiAgKSB7XG4gICAgY29uc3QgY3VyTGlzdGVuZXJzID0gbGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICBsaXN0ZW5lcnMuc2V0KHR5cGUsIFsuLi5jdXJMaXN0ZW5lcnMsIGxpc3RlbmVyXSk7XG5cbiAgICAvLyBUaGlzIGhhcyBiZWVuIHJldmlzZWRcbiAgICByYXdBZGRFdmVudExpc3RlbmVyLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgdHlwZSxcbiAgICAgIC8vIGZpbHRlckFuZFdyYXBFdmVudExpc3RlbmVyKFxuICAgICAgLy8gICB0eXBlLFxuICAgICAgLy8gICBsaXN0ZW5lcixcbiAgICAgIC8vICAgX3NhbmRib3gub3B0aW9ucy5zb3VyY2VMaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS51cmwpLFxuICAgICAgLy8gKSxcbiAgICAgIGxpc3RlbmVyLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoXG4gICAgdGhpczogYW55LFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBsaXN0ZW5lcjogTGlzdGVuZXIsXG4gICAgb3B0aW9ucz86IGJvb2xlYW4gfCBFdmVudExpc3RlbmVyT3B0aW9ucyxcbiAgKSB7XG4gICAgY29uc3QgY3VyTGlzdGVuZXJzID0gbGlzdGVuZXJzLmdldCh0eXBlKSB8fCBbXTtcbiAgICBjb25zdCBpZHggPSBjdXJMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgIGN1ckxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gICAgbGlzdGVuZXJzLnNldCh0eXBlLCBbLi4uY3VyTGlzdGVuZXJzXSk7XG4gICAgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgfVxuXG4gIGNvbnN0IHJlY292ZXIgPSAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyLCBrZXkpID0+IHtcbiAgICAgIGxpc3RlbmVyLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgIHJhd1JlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCh3aW5kb3csIGtleSwgZm4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgbGlzdGVuZXJzLmNsZWFyKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWNvdmVyLFxuICAgIG92ZXJyaWRlOiB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyOiBhZGRMaXN0ZW5lci5iaW5kKHdpbmRvdyksXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiByZW1vdmVMaXN0ZW5lci5iaW5kKHdpbmRvdyksXG4gICAgfSxcbiAgICBjcmVhdGVkKGdsb2JhbDogU2FuZGJveFsnZ2xvYmFsJ10pIHtcbiAgICAgIGNvbnN0IGZha2VEb2N1bWVudCA9IGdsb2JhbD8uZG9jdW1lbnQ7XG4gICAgICBpZiAoZmFrZURvY3VtZW50KSB7XG4gICAgICAgIGZha2VEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyID0gYWRkTGlzdGVuZXIuYmluZChkb2N1bWVudCk7XG4gICAgICAgIGZha2VEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlTGlzdGVuZXIuYmluZChkb2N1bWVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlck1vZHVsZShfc2FuZGJveDogU2FuZGJveCkge1xuICBjb25zdCBvYnNlcnZlclNldCA9IG5ldyBTZXQ8TXV0YXRpb25PYnNlcnZlcj4oKTtcblxuICBjbGFzcyBQcm94eU11dGF0aW9uT2JzZXJ2ZXIgZXh0ZW5kcyBNdXRhdGlvbk9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYjogTXV0YXRpb25DYWxsYmFjaykge1xuICAgICAgc3VwZXIoY2IpO1xuICAgICAgb2JzZXJ2ZXJTZXQuYWRkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY292ZXIgPSAoKSA9PiB7XG4gICAgb2JzZXJ2ZXJTZXQuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICAgIG9ic2VydmVyU2V0LmNsZWFyKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWNvdmVyLFxuICAgIG92ZXJyaWRlOiB7XG4gICAgICBNdXRhdGlvbk9ic2VydmVyOiBQcm94eU11dGF0aW9uT2JzZXJ2ZXIgYXMgRnVuY3Rpb24sXG4gICAgfSxcbiAgfTtcbn1cbiIsICJjb25zdCByYXdTZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG5jb25zdCByYXdDbGVhclRpbWVvdXQgPSB3aW5kb3cuY2xlYXJUaW1lb3V0O1xuY29uc3QgcmF3U2V0SW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWw7XG5jb25zdCByYXdDbGVhckludGVydmFsID0gd2luZG93LmNsZWFySW50ZXJ2YWw7XG5cbmV4cG9ydCBjb25zdCB0aW1lb3V0TW9kdWxlID0gKCkgPT4ge1xuICBjb25zdCB0aW1lb3V0ID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgY29uc3Qgc2V0VGltZW91dCA9IChoYW5kbGVyOiBUaW1lckhhbmRsZXIsIG1zPzogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHJhd1NldFRpbWVvdXQoaGFuZGxlciwgbXMsIC4uLmFyZ3MpO1xuICAgIHRpbWVvdXQuYWRkKHRpbWVvdXRJZCk7XG4gICAgcmV0dXJuIHRpbWVvdXRJZDtcbiAgfTtcblxuICBjb25zdCBjbGVhclRpbWVvdXQgPSAodGltZW91dElkOiBudW1iZXIpID0+IHtcbiAgICB0aW1lb3V0LmRlbGV0ZSh0aW1lb3V0SWQpO1xuICAgIHJhd0NsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICB9O1xuXG4gIGNvbnN0IHJlY292ZXIgPSAoKSA9PiB7XG4gICAgdGltZW91dC5mb3JFYWNoKCh0aW1lb3V0SWQpID0+IHtcbiAgICAgIHJhd0NsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVjb3ZlcixcbiAgICBvdmVycmlkZToge1xuICAgICAgc2V0VGltZW91dCxcbiAgICAgIGNsZWFyVGltZW91dCxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGludGVydmFsTW9kdWxlID0gKCkgPT4ge1xuICBjb25zdCB0aW1lb3V0ID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgY29uc3Qgc2V0SW50ZXJ2YWwgPSAoXG4gICAgY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCxcbiAgICBtczogbnVtYmVyLFxuICAgIC4uLmFyZ3M6IGFueVtdXG4gICkgPT4ge1xuICAgIGNvbnN0IGludGVydmFsSWQgPSByYXdTZXRJbnRlcnZhbChjYWxsYmFjaywgbXMsIC4uLmFyZ3MpO1xuICAgIHRpbWVvdXQuYWRkKGludGVydmFsSWQpO1xuICAgIHJldHVybiBpbnRlcnZhbElkO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFySW50ZXJ2YWwgPSAoaW50ZXJ2YWxJZDogbnVtYmVyKSA9PiB7XG4gICAgdGltZW91dC5kZWxldGUoaW50ZXJ2YWxJZCk7XG4gICAgcmF3Q2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgfTtcblxuICBjb25zdCByZWNvdmVyID0gKCkgPT4ge1xuICAgIHRpbWVvdXQuZm9yRWFjaCgoaW50ZXJ2YWxJZCkgPT4ge1xuICAgICAgcmF3Q2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlY292ZXIsXG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIHNldEludGVydmFsLFxuICAgICAgY2xlYXJJbnRlcnZhbCxcbiAgICAgIC8vIHdlYnBhY2sgbGF6eSB1c2UgUHJvbWlzZVxuICAgICAgLy8gUHJvbWlzZSBpcyBwb2x5ZmlsbFxuICAgICAgLy8gcG9seWZpbGwgUHJvbWlzZSBpbmNsdWRlIFByb21pc2UuX3NldEltbWVkaWF0ZSB1c2Ugc2V0SW1tZWRpYXRlIG1ldGhvZHNcbiAgICAgIC8vIHNldEltbWVkaWF0ZSBwb2x5ZmlsbCBwb3N0TWVzc2FnZSBhcyBtYXJjbyB0YXNrc1xuICAgICAgLy8gcG9zdE1lc3NhZ2UgY2FsbGJhY2sganVkZ2UgZXZlbnQuc291cmNlID09PSB3aW5kb3dcbiAgICAgIC8vIHVzZSBzZXRUaW1lb3V0IGFzIHNldEltbWVkaWF0ZSBhdm9pZCBqdWRnZSBmYWlsXG4gICAgICBzZXRJbW1lZGlhdGU6IChmbikgPT4gc2V0VGltZW91dChmbiwgMCksXG4gICAgfSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgbWFrZU1hcCwgc2FmZVdyYXBwZXIsIHdhcm4gfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTdHlsZU1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHsgX19kb21XcmFwcGVyX18gfSBmcm9tICcuLi9zeW1ib2xUeXBlcyc7XG5pbXBvcnQgeyBpbmplY3RIYW5kbGVyUGFyYW1zIH0gZnJvbSAnLi9wcm9jZXNzUGFyYW1zJztcbmltcG9ydCB7IER5bmFtaWNOb2RlUHJvY2Vzc29yLCByYXdFbGVtZW50TWV0aG9kcyB9IGZyb20gJy4vcHJvY2Vzc29yJztcbmltcG9ydCB7IGlzSW5JZnJhbWUsIHNhbmRib3hNYXAsIGlzU3R5bGVkQ29tcG9uZW50c0xpa2UgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBTYW5kYm94T3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgbW91bnRFbGVtZW50TWV0aG9kcyA9IFtcbiAgJ2FwcGVuZCcsXG4gICdhcHBlbmRDaGlsZCcsXG4gICdpbnNlcnRCZWZvcmUnLFxuICAnaW5zZXJ0QWRqYWNlbnRFbGVtZW50Jyxcbl07XG5jb25zdCByZW1vdmVDaGlsZEVsZW1lbnRNZXRob2RzID0gWydyZW1vdmVDaGlsZCddO1xuXG5jb25zdCBpZ25vcmVFbGVtZW50VGltaW5nVGFncyA9IG1ha2VNYXAoW1xuICAnU1RZTEUnLFxuICAnU0NSSVBUUycsXG4gICdMSU5LJyxcbiAgJ01FVEEnLFxuICAnVElUTEUnLFxuXSk7XG5cbmZ1bmN0aW9uIGluamVjdG9yKGN1cnJlbnQ6IEZ1bmN0aW9uLCBtZXRob2ROYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzOiBFbGVtZW50KSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgZWwgPSBtZXRob2ROYW1lID09PSAnaW5zZXJ0QWRqYWNlbnRFbGVtZW50J1xuICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgIDogYXJndW1lbnRzWzBdO1xuICAgIGNvbnN0IHNhbmRib3ggPSBzYW5kYm94TWFwLmdldChlbCk7XG4gICAgY29uc3Qgb3JpZ2luUHJvY2VzcyA9ICgpID0+IGN1cnJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmIChzYW5kYm94KSB7XG4gICAgICBpZiAoZWwgJiYgdGhpcz8udGFnTmFtZT8udG9Mb3dlckNhc2UoKSA9PT0gJ3N0eWxlJykge1xuICAgICAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFN0eWxlTWFuYWdlcihlbC50ZXh0Q29udGVudCk7XG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgbmFtZXNwYWNlLCBzdHlsZVNjb3BlSWQgfSA9IHNhbmRib3gub3B0aW9ucztcbiAgICAgICAgbWFuYWdlci5jb3JyZWN0UGF0aChiYXNlVXJsKTtcbiAgICAgICAgbWFuYWdlci5zZXRTY29wZSh7XG4gICAgICAgICAgYXBwTmFtZTogbmFtZXNwYWNlLFxuICAgICAgICAgIHJvb3RFbElkOiBzdHlsZVNjb3BlSWQhKCksXG4gICAgICAgIH0pO1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IG1hbmFnZXIudHJhbnNmb3JtQ29kZShtYW5hZ2VyLnN0eWxlQ29kZSk7XG4gICAgICAgIHJldHVybiBvcmlnaW5Qcm9jZXNzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcm9jZXNzb3IgPSBuZXcgRHluYW1pY05vZGVQcm9jZXNzb3IoZWwsIHNhbmRib3gsIG1ldGhvZE5hbWUpO1xuICAgICAgICByZXR1cm4gcHJvY2Vzc29yLmFwcGVuZCh0aGlzLCBhcmd1bWVudHMsIG9yaWdpblByb2Nlc3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGN1c3RvbSBwZXJmb3JtYW5jZSBFbGVtZW50IFRpbWluZyBBUElcbiAgICAvLyBodHRwczovL3dlYi5kZXYvY3VzdG9tLW1ldHJpY3MvI2VsZW1lbnQtdGltaW5nLWFwaVxuICAgIHNhZmVXcmFwcGVyKCgpID0+IHtcbiAgICAgIGlmIChpZ25vcmVFbGVtZW50VGltaW5nVGFncyhlbC50YWdOYW1lKSkgcmV0dXJuO1xuICAgICAgaWYgKFxuICAgICAgICBlbD8uc2V0QXR0cmlidXRlICYmXG4gICAgICAgIHR5cGVvZiBlbD8uc2V0QXR0cmlidXRlID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICFlbD8uZ2V0QXR0cmlidXRlKCdlbGVtZW50dGltaW5nJylcbiAgICAgICkge1xuICAgICAgICBlbD8uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICdlbGVtZW50dGltaW5nJyxcbiAgICAgICAgICBzYW5kYm94XG4gICAgICAgICAgICA/IGAkeyhzYW5kYm94IGFzIGFueSkub3B0aW9ucy5uYW1lc3BhY2V9LWVsZW1lbnQtdGltaW5nYFxuICAgICAgICAgICAgOiAnZWxlbWVudC10aW1pbmcnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHNhbmRib3gpIHtcbiAgICAgIGNvbnN0IHByb2Nlc3NvciA9IG5ldyBEeW5hbWljTm9kZVByb2Nlc3NvcihlbCwgc2FuZGJveCwgbWV0aG9kTmFtZSk7XG4gICAgICByZXR1cm4gcHJvY2Vzc29yLmFwcGVuZCh0aGlzLCBhcmd1bWVudHMsIG9yaWdpblByb2Nlc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZ2luUHJvY2VzcygpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5qZWN0b3JSZW1vdmVDaGlsZChjdXJyZW50OiBGdW5jdGlvbiwgbWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogRWxlbWVudCkge1xuICAgIGNvbnN0IGVsID0gYXJndW1lbnRzWzBdO1xuICAgIGNvbnN0IHNhbmRib3ggPSBlbCAmJiBzYW5kYm94TWFwLmdldChlbCk7XG4gICAgY29uc3Qgb3JpZ2luUHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIC8vIFNhbmRib3ggbWF5IGhhdmUgYXBwbGllZCBzdWIgZG9tIHNpZGUgZWZmZWN0cyB0byBkZWxldGVcbiAgICAgIC8vIGJ5IHJlbW92ZUNoaWxkIGRlbGV0ZWQgYnkgdGhlIHRhZyBkZXRlcm1pbmUgd2hldGhlciBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgICAgcmV0dXJuIGN1cnJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgaWYgKHNhbmRib3gpIHtcbiAgICAgIGNvbnN0IHByb2Nlc3NvciA9IG5ldyBEeW5hbWljTm9kZVByb2Nlc3NvcihlbCwgc2FuZGJveCwgbWV0aG9kTmFtZSk7XG4gICAgICByZXR1cm4gcHJvY2Vzc29yLnJlbW92ZUNoaWxkKHRoaXMsIG9yaWdpblByb2Nlc3MpO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luUHJvY2VzcygpO1xuICB9O1xufVxuXG4vLyBIYW5kbGUgYG93bmVyRG9jdW1lbnRgIHRvIHByZXZlbnQgZWxlbWVudHMgY3JlYXRlZCBieSBgb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50YCBmcm9tIGVzY2FwaW5nXG5mdW5jdGlvbiBoYW5kbGVPd25lckRvY3VtZW50KCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkVsZW1lbnQucHJvdG90eXBlLCAnb3duZXJEb2N1bWVudCcsIHtcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBzYW5kYm94ID0gdGhpcyAmJiBzYW5kYm94TWFwLmdldCh0aGlzKTtcbiAgICAgIGNvbnN0IHJlYWxWYWx1ZSA9IFJlZmxlY3QuZ2V0KFxuICAgICAgICB3aW5kb3cuTm9kZS5wcm90b3R5cGUsXG4gICAgICAgICdvd25lckRvY3VtZW50JyxcbiAgICAgICAgdGhpcyxcbiAgICAgICk7XG4gICAgICByZXR1cm4gc2FuZGJveCA/IHNhbmRib3guZ2xvYmFsLmRvY3VtZW50IDogcmVhbFZhbHVlO1xuICAgIH0sXG4gICAgc2V0KCkge1xuICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybignXCJvd25lckRvY3VtZW50XCIgaXMgYSByZWFkLW9ubHkgYXR0cmlidXRlLicpO1xuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsSW5qZWN0b3Ioc2FuZGJveENvbmZpZzogU2FuZGJveE9wdGlvbnMpIHtcbiAgaWYgKChtYWtlRWxJbmplY3RvciBhcyBhbnkpLmhhc0luamVjdCkgcmV0dXJuO1xuICAobWFrZUVsSW5qZWN0b3IgYXMgYW55KS5oYXNJbmplY3QgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2Ygd2luZG93LkVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBpZnJhbWUgY2FuIHJlYWQgaHRtbCBjb250YWluZXIgdGhpcyBjYW4ndCBwb2ludCB0byBwcm94eURvY3VtZW50IGhhcyBJbGxlZ2FsIGludm9jYXRpb24gZXJyb3JcbiAgICBpZiAoc2FuZGJveENvbmZpZy5maXhCYXNlVXJsKSBzYWZlV3JhcHBlcigoKT0+IGhhbmRsZU93bmVyRG9jdW1lbnQoKSk7XG4gICAgY29uc3QgcmV3cml0ZSA9IChcbiAgICAgIG1ldGhvZHM6IEFycmF5PHN0cmluZz4sXG4gICAgICBidWlsZGVyOiB0eXBlb2YgaW5qZWN0b3IgfCB0eXBlb2YgaW5qZWN0b3JSZW1vdmVDaGlsZCxcbiAgICApID0+IHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBtZXRob2RzKSB7XG4gICAgICAgIGNvbnN0IGZuID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlW25hbWVdO1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nIHx8IGZuW19fZG9tV3JhcHBlcl9fXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJhd0VsZW1lbnRNZXRob2RzW25hbWVdID0gZm47XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBidWlsZGVyKGZuLCBuYW1lKTtcbiAgICAgICAgd3JhcHBlcltfX2RvbVdyYXBwZXJfX10gPSB0cnVlO1xuICAgICAgICB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbbmFtZV0gPSB3cmFwcGVyO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV3cml0ZShtb3VudEVsZW1lbnRNZXRob2RzLCBpbmplY3Rvcik7XG4gICAgcmV3cml0ZShyZW1vdmVDaGlsZEVsZW1lbnRNZXRob2RzLCBpbmplY3RvclJlbW92ZUNoaWxkKTtcbiAgfVxuXG4gIGluamVjdEhhbmRsZXJQYXJhbXMoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZFN0eWxlZENvbXBvbmVudENTU1J1bGVzKFxuICBkeW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQ6IFNldDxIVE1MU3R5bGVFbGVtZW50PixcbiAgc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXA6IFdlYWtNYXA8SFRNTFN0eWxlRWxlbWVudCwgQ1NTUnVsZUxpc3Q+LFxuKSB7XG4gIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldC5mb3JFYWNoKChzdHlsZUVsZW1lbnQpID0+IHtcbiAgICBpZiAoaXNTdHlsZWRDb21wb25lbnRzTGlrZShzdHlsZUVsZW1lbnQpICYmIHN0eWxlRWxlbWVudC5zaGVldCkge1xuICAgICAgc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXAuc2V0KHN0eWxlRWxlbWVudCwgc3R5bGVFbGVtZW50LnNoZWV0LmNzc1J1bGVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVidWlsZENTU1J1bGVzKFxuICBkeW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQ6IFNldDxIVE1MU3R5bGVFbGVtZW50PixcbiAgc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXA6IFdlYWtNYXA8SFRNTFN0eWxlRWxlbWVudCwgQ1NTUnVsZUxpc3Q+LFxuKSB7XG4gIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldC5mb3JFYWNoKChzdHlsZUVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBjc3NSdWxlcyA9IHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwLmdldChzdHlsZUVsZW1lbnQpO1xuICAgIGlmIChjc3NSdWxlcyAmJiAoaXNTdHlsZWRDb21wb25lbnRzTGlrZShzdHlsZUVsZW1lbnQpIHx8IGNzc1J1bGVzLmxlbmd0aCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3NzUnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3NzUnVsZSA9IGNzc1J1bGVzW2ldO1xuICAgICAgICAvLyByZS1pbnNlcnQgcnVsZXMgZm9yIHN0eWxlZC1jb21wb25lbnRzIGVsZW1lbnRcbiAgICAgICAgc3R5bGVFbGVtZW50LnNoZWV0Py5pbnNlcnRSdWxlKFxuICAgICAgICAgIGNzc1J1bGUuY3NzVGV4dCxcbiAgICAgICAgICBzdHlsZUVsZW1lbnQuc2hlZXQ/LmNzc1J1bGVzLmxlbmd0aCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwgImltcG9ydCB7IGhhbmRsZXJQYXJhbXMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RIYW5kbGVyUGFyYW1zKCkge1xuICBpZiAod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICBjb25zdCByYXdPYnNlcnZlciA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlO1xuICAgIE11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmF3T2JzZXJ2ZXIuYXBwbHkodGhpcywgaGFuZGxlclBhcmFtcyhhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaW4gaWZyYW1lIG5vdCBtb2RpZnkgYWN0aXZlRWxlbWVudFxuICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICB3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLFxuICAgICdhY3RpdmVFbGVtZW50JyxcbiAgKTtcbiAgY29uc3QgcmF3QWN0aXZlRWwgPSBkZXNjICYmIGRlc2MuZ2V0O1xuICBpZiAocmF3QWN0aXZlRWwpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkRvY3VtZW50LnByb3RvdHlwZSwgJ2FjdGl2ZUVsZW1lbnQnLCB7XG4gICAgICBnZXQoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gcmF3QWN0aXZlRWwuYXBwbHkoaGFuZGxlclBhcmFtcyhbdGhpc10pWzBdLCBoYW5kbGVyUGFyYW1zKGFyZ3MpKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTdHlsZU1hbmFnZXIsIEphdmFTY3JpcHRNYW5hZ2VyIH0gZnJvbSAnQGdhcmZpc2gvbG9hZGVyJztcbmltcG9ydCB7XG4gIGRlZixcbiAgd2FybixcbiAgRE9NQXBpcyxcbiAgbWFrZU1hcCxcbiAgaXNKc1R5cGUsXG4gIGlzQ3NzVHlwZSxcbiAgc2FmZVdyYXBwZXIsXG4gIGZpbmRUYXJnZXQsXG4gIF9fTW9ja0JvZHlfXyxcbiAgX19Nb2NrSGVhZF9fLFxuICB0cmFuc2Zvcm1VcmwsXG4gIHNvdXJjZUxpc3RUYWdzLFxuICBfX1JFTU9WRV9OT0RFX18sXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuLi9zYW5kYm94JztcbmltcG9ydCB7IHJvb3RFbG0sIGlzU3R5bGVkQ29tcG9uZW50c0xpa2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGlzSW5zZXJ0TWV0aG9kID0gbWFrZU1hcChbJ2luc2VydEJlZm9yZScsICdpbnNlcnRBZGphY2VudEVsZW1lbnQnXSk7XG5cbmV4cG9ydCBjb25zdCByYXdFbGVtZW50TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljTm9kZVByb2Nlc3NvciB7XG4gIHByaXZhdGUgZWw6IGFueTsgLy8gYW55IEVsZW1lbnRcbiAgcHJpdmF0ZSB0YWdOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgc2FuZGJveDogU2FuZGJveDtcbiAgcHJpdmF0ZSBET01BcGlzOiBET01BcGlzO1xuICBwcml2YXRlIG1ldGhvZE5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSByb290RWxlbWVudDogRWxlbWVudCB8IFNoYWRvd1Jvb3QgfCBEb2N1bWVudDtcbiAgcHJpdmF0ZSBuYXRpdmVBcHBlbmQgPSByYXdFbGVtZW50TWV0aG9kc1snYXBwZW5kQ2hpbGQnXTtcbiAgcHJpdmF0ZSBuYXRpdmVSZW1vdmUgPSByYXdFbGVtZW50TWV0aG9kc1sncmVtb3ZlQ2hpbGQnXTtcblxuICBjb25zdHJ1Y3RvcihlbCwgc2FuZGJveCwgbWV0aG9kTmFtZSkge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnNhbmRib3ggPSBzYW5kYm94O1xuICAgIHRoaXMubWV0aG9kTmFtZSA9IG1ldGhvZE5hbWU7XG4gICAgdGhpcy5yb290RWxlbWVudCA9IHJvb3RFbG0oc2FuZGJveCkgfHwgZG9jdW1lbnQ7XG4gICAgdGhpcy5ET01BcGlzID0gbmV3IERPTUFwaXMoc2FuZGJveC5nbG9iYWwuZG9jdW1lbnQpO1xuICAgIHRoaXMudGFnTmFtZSA9IGVsLnRhZ05hbWUgPyBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgaXModGFnOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy50YWdOYW1lID09PSB0YWc7XG4gIH1cblxuICBwcml2YXRlIGZpeFJlc291cmNlTm9kZVVybChlbDogYW55KSB7XG4gICAgY29uc3QgYmFzZVVybCA9IHRoaXMuc2FuZGJveC5vcHRpb25zLmJhc2VVcmw7XG4gICAgaWYgKGJhc2VVcmwpIHtcbiAgICAgIGNvbnN0IHNyYyA9IGVsLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICBjb25zdCBocmVmID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICBzcmMgJiYgKGVsLnNyYyA9IHRyYW5zZm9ybVVybChiYXNlVXJsLCBzcmMpKTtcbiAgICAgIGhyZWYgJiYgKGVsLmhyZWYgPSB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgaHJlZikpO1xuICAgICAgY29uc3QgdXJsID0gZWwuc3JjIHx8IGVsLmhyZWY7XG5cbiAgICAgIGlmICh1cmwgJiYgdGhpcy5zYW5kYm94Lm9wdGlvbnMuYWRkU291cmNlTGlzdCkge1xuICAgICAgICB0aGlzLnNhbmRib3gub3B0aW9ucy5hZGRTb3VyY2VMaXN0KHtcbiAgICAgICAgICB0YWdOYW1lOiBlbC50YWdOYW1lLFxuICAgICAgICAgIHVybCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0IGl0IGluIHRoZSBuZXh0IG1hY3JvIHRhc2sgdG8gZW5zdXJlIHRoYXQgdGhlIGN1cnJlbnQgc3luY2hyb25pemF0aW9uIHNjcmlwdCBpcyBleGVjdXRlZFxuICBwcml2YXRlIGRpc3BhdGNoRXZlbnQodHlwZTogc3RyaW5nLCBlcnJJbmZvPzogRXJyb3JFdmVudEluaXQpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGlzRXJyb3IgPSB0eXBlID09PSAnZXJyb3InO1xuICAgICAgbGV0IGV2ZW50OiBFdmVudCAmIHsgX19ieUdhcmZpc2hfXz86IGJvb2xlYW4gfTtcblxuICAgICAgaWYgKGlzRXJyb3IgJiYgZXJySW5mbykge1xuICAgICAgICBldmVudCA9IG5ldyBFcnJvckV2ZW50KHR5cGUsIHtcbiAgICAgICAgICAuLi5lcnJJbmZvLFxuICAgICAgICAgIG1lc3NhZ2U6IGVyckluZm8uZXJyb3IubWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudCA9IG5ldyBFdmVudCh0eXBlKTtcbiAgICAgIH1cbiAgICAgIGV2ZW50Ll9fYnlHYXJmaXNoX18gPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAndGFyZ2V0JywgeyB2YWx1ZTogdGhpcy5lbCB9KTtcbiAgICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICBpc0Vycm9yICYmIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIExvYWQgZHluYW1pYyBsaW5rIG5vZGVcbiAgcHJpdmF0ZSBhZGREeW5hbWljTGlua05vZGUoY2FsbGJhY2s6IChzdHlsZU5vZGU6IEhUTUxTdHlsZUVsZW1lbnQpID0+IHZvaWQpIHtcbiAgICBjb25zdCB7IGhyZWYsIHR5cGUgfSA9IHRoaXMuZWw7XG5cbiAgICBpZiAoIXR5cGUgfHwgaXNDc3NUeXBlKHsgc3JjOiBocmVmLCB0eXBlIH0pKSB7XG4gICAgICBpZiAoaHJlZikge1xuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIG5hbWVzcGFjZSwgc3R5bGVTY29wZUlkIH0gPSB0aGlzLnNhbmRib3gub3B0aW9ucztcbiAgICAgICAgY29uc3QgZmV0Y2hVcmwgPSBiYXNlVXJsID8gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIGhyZWYpIDogaHJlZjtcblxuICAgICAgICB0aGlzLnNhbmRib3gubG9hZGVyXG4gICAgICAgICAgLmxvYWQ8U3R5bGVNYW5hZ2VyPih7XG4gICAgICAgICAgICBzY29wZTogbmFtZXNwYWNlLFxuICAgICAgICAgICAgdXJsOiBmZXRjaFVybCxcbiAgICAgICAgICAgIGRlZmF1bHRDb250ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCh7IHJlc291cmNlTWFuYWdlcjogc3R5bGVNYW5hZ2VyIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdHlsZU1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgc3R5bGVNYW5hZ2VyLmNvcnJlY3RQYXRoKCk7XG4gICAgICAgICAgICAgIGlmIChzdHlsZVNjb3BlSWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZU1hbmFnZXIuc2V0U2NvcGUoe1xuICAgICAgICAgICAgICAgICAgYXBwTmFtZTogbmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgICAgcm9vdEVsSWQ6IHN0eWxlU2NvcGVJZCgpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHN0eWxlTWFuYWdlci5yZW5kZXJBc1N0eWxlRWxlbWVudCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICAgYEludmFsaWQgcmVzb3VyY2UgdHlwZSBcIiR7dHlwZX1cIiwgXCIke2hyZWZ9XCIgY2FuJ3QgZ2VuZXJhdGUgc3R5bGVNYW5hZ2VyYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnbG9hZCcpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJiB3YXJuKGUpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgICAgIGZpbGVuYW1lOiBmZXRjaFVybCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgd2FybihgSW52YWxpZCByZXNvdXJjZSB0eXBlIFwiJHt0eXBlfVwiLCBcIiR7aHJlZn1cImApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUbyBlbnN1cmUgdGhlIHByb2Nlc3Npbmcgbm9kZSB0byBub3JtYWwgaGFzIGJlZW4gcmVtb3ZlZFxuICAgIGNvbnN0IGxpbmtDb21tZW50Tm9kZSA9IHRoaXMuRE9NQXBpcy5jcmVhdGVMaW5rQ29tbWVudE5vZGUoaHJlZikgYXMgQ29tbWVudDtcbiAgICB0aGlzLmVsW19fUkVNT1ZFX05PREVfX10gPSAoKSA9PlxuICAgICAgdGhpcy5ET01BcGlzLnJlbW92ZUVsZW1lbnQobGlua0NvbW1lbnROb2RlKTtcbiAgICByZXR1cm4gbGlua0NvbW1lbnROb2RlO1xuICB9XG5cbiAgLy8gTG9hZCBkeW5hbWljIGpzIHNjcmlwdFxuICBwcml2YXRlIGFkZER5bmFtaWNTY3JpcHROb2RlKCkge1xuICAgIGNvbnN0IHsgc3JjLCB0eXBlLCBjcm9zc09yaWdpbiB9ID0gdGhpcy5lbDtcbiAgICBjb25zdCBpc01vZHVsZSA9IHR5cGUgPT09ICdtb2R1bGUnO1xuICAgIGNvbnN0IGNvZGUgPSB0aGlzLmVsLnRleHRDb250ZW50IHx8IHRoaXMuZWwudGV4dCB8fCAnJztcblxuICAgIGlmICghdHlwZSB8fCBpc0pzVHlwZSh7IHNyYywgdHlwZSB9KSkge1xuICAgICAgLy8gVGhlIFwic3JjXCIgaGlnaGVyIHByaW9yaXR5XG4gICAgICBjb25zdCB7IGJhc2VVcmwsIG5hbWVzcGFjZSB9ID0gdGhpcy5zYW5kYm94Lm9wdGlvbnM7XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIGNvbnN0IGZldGNoVXJsID0gYmFzZVVybCA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBzcmMpIDogc3JjO1xuICAgICAgICB0aGlzLnNhbmRib3gubG9hZGVyXG4gICAgICAgICAgLmxvYWQ8SmF2YVNjcmlwdE1hbmFnZXI+KHtcbiAgICAgICAgICAgIHNjb3BlOiBuYW1lc3BhY2UsXG4gICAgICAgICAgICB1cmw6IGZldGNoVXJsLFxuICAgICAgICAgICAgY3Jvc3NPcmlnaW4sXG4gICAgICAgICAgICBkZWZhdWx0Q29udGVudFR5cGU6IHR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgIChtYW5hZ2VyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChtYW5hZ2VyLnJlc291cmNlTWFuYWdlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHJlc291cmNlTWFuYWdlcjogeyB1cmwsIHNjcmlwdENvZGUgfSxcbiAgICAgICAgICAgICAgICB9ID0gbWFuYWdlcjtcbiAgICAgICAgICAgICAgICAvLyBJdCBpcyBuZWNlc3NhcnkgdG8gZW5zdXJlIHRoYXQgdGhlIGNvZGUgZXhlY3V0aW9uIGVycm9yIGNhbm5vdCB0cmlnZ2VyIHRoZSBgZWwub25lcnJvcmAgZXZlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnNhbmRib3guZXhlY1NjcmlwdChzY3JpcHRDb2RlLCB7fSwgdXJsLCB7XG4gICAgICAgICAgICAgICAgICBpc01vZHVsZSxcbiAgICAgICAgICAgICAgICAgIG5vRW50cnk6IHRydWUsXG4gICAgICAgICAgICAgICAgICBvcmlnaW5TY3JpcHQ6IHRoaXMuZWwsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICAgIGBJbnZhbGlkIHJlc291cmNlIHR5cGUgXCIke3R5cGV9XCIsIFwiJHtzcmN9XCIgY2FuJ3QgZ2VuZXJhdGUgc2NyaXB0TWFuYWdlcmAsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2xvYWQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJiB3YXJuKGUpO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2Vycm9yJywge1xuICAgICAgICAgICAgICAgIGVycm9yOiBlLFxuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmZXRjaFVybCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUpIHtcbiAgICAgICAgdGhpcy5zYW5kYm94LmV4ZWNTY3JpcHQoY29kZSwge30sIGJhc2VVcmwsIHsgbm9FbnRyeTogdHJ1ZSwgb3JpZ2luU2NyaXB0OiB0aGlzLmVsLCB9KTtcbiAgICAgIH1cbiAgICAgIC8vIFRvIGVuc3VyZSB0aGUgcHJvY2Vzc2luZyBub2RlIHRvIG5vcm1hbCBoYXMgYmVlbiByZW1vdmVkXG4gICAgICBjb25zdCBzY3JpcHRDb21tZW50Tm9kZSA9IHRoaXMuRE9NQXBpcy5jcmVhdGVTY3JpcHRDb21tZW50Tm9kZSh7XG4gICAgICAgIHNyYyxcbiAgICAgICAgY29kZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbFtfX1JFTU9WRV9OT0RFX19dID0gKCkgPT5cbiAgICAgICAgdGhpcy5ET01BcGlzLnJlbW92ZUVsZW1lbnQoc2NyaXB0Q29tbWVudE5vZGUpO1xuICAgICAgcmV0dXJuIHNjcmlwdENvbW1lbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbDtcbiAgfVxuXG4gIC8vIFdoZW4gYXBwZW5kIGFuIGVtcHR5IGxpbmsgbm9kZSBhbmQgdGhlbiBhZGQgaHJlZiBhdHRyaWJ1dGVcbiAgcHJpdmF0ZSBtb25pdG9yQ2hhbmdlc09mTGlua05vZGUoKSB7XG4gICAgaWYgKHRoaXMuZWwubW9kaWZ5RmxhZykgcmV0dXJuO1xuXG4gICAgY29uc3QgbXV0YXRvciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGlmICh0aGlzLmVsLm1vZGlmeUZsYWcpIHJldHVybjtcbiAgICAgIGZvciAoY29uc3QgeyB0eXBlLCBhdHRyaWJ1dGVOYW1lIH0gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnYXR0cmlidXRlcycpIHtcbiAgICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3JlbCcgfHwgYXR0cmlidXRlTmFtZSA9PT0gJ3N0eWxlc2hlZXQnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbC5tb2RpZnlGbGFnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodGhpcy5lbC5yZWwgPT09ICdzdHlsZXNoZWV0JyAmJiB0aGlzLmVsLmhyZWYpIHtcbiAgICAgICAgICAgICAgdGhpcy5lbC5kaXNhYmxlZCA9IHRoaXMuZWwubW9kaWZ5RmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnROb2RlID0gdGhpcy5hZGREeW5hbWljTGlua05vZGUoKHN0eWxlTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbW1lbnROb2RlLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChzdHlsZU5vZGUsIGNvbW1lbnROb2RlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuZWwucGFyZW50Tm9kZT8ucmVwbGFjZUNoaWxkKGNvbW1lbnROb2RlLCB0aGlzLmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTXV0YXRpb25PYnNlcnZlci9kaXNjb25uZWN0XG4gICAgbXV0YXRvci5vYnNlcnZlKHRoaXMuZWwsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbW9uaXRvckNoYW5nZXNPZlN0eWxlKCkge1xuICAgIGNvbnN0IHsgYmFzZVVybCwgbmFtZXNwYWNlLCBzdHlsZVNjb3BlSWQgfSA9IHRoaXMuc2FuZGJveC5vcHRpb25zO1xuICAgIGNvbnN0IHJvb3RFbElkID0gc3R5bGVTY29wZUlkPy4oKTtcblxuICAgIGNvbnN0IG1vZGlmeVN0eWxlQ29kZSA9IChzdHlsZUNvZGU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICAgIGlmIChzdHlsZUNvZGUpIHtcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBTdHlsZU1hbmFnZXIoc3R5bGVDb2RlKTtcbiAgICAgICAgbWFuYWdlci5jb3JyZWN0UGF0aChiYXNlVXJsKTtcbiAgICAgICAgaWYgKHJvb3RFbElkKSB7XG4gICAgICAgICAgbWFuYWdlci5zZXRTY29wZSh7XG4gICAgICAgICAgICByb290RWxJZCxcbiAgICAgICAgICAgIGFwcE5hbWU6IG5hbWVzcGFjZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUNvZGUgPSBtYW5hZ2VyLnRyYW5zZm9ybUNvZGUoc3R5bGVDb2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZUNvZGU7XG4gICAgfTtcblxuICAgIGNvbnN0IG11dGF0b3IgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHsgdHlwZSwgdGFyZ2V0LCBhZGRlZE5vZGVzIH0gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgIGNvbnN0IGVsID0gdGFyZ2V0IGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgICAgICAgaWYgKGlzU3R5bGVkQ29tcG9uZW50c0xpa2UoZWwpICYmIGVsLnNoZWV0KSB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5BZGRSdWxlID0gZWwuc2hlZXQuaW5zZXJ0UnVsZTtcbiAgICAgICAgICAgIGVsLnNoZWV0Lmluc2VydFJ1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG1vZGlmeVN0eWxlQ29kZShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luQWRkUnVsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFkZGVkTm9kZXNbMF0pIHtcbiAgICAgICAgICAgICAgYWRkZWROb2Rlc1swXS50ZXh0Q29udGVudCA9IG1vZGlmeVN0eWxlQ29kZShcbiAgICAgICAgICAgICAgICBhZGRlZE5vZGVzWzBdLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIG11dGF0b3Iub2JzZXJ2ZSh0aGlzLmVsLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFBhcmVudE5vZGVJbkFwcChwYXJlbnROb2RlOiBFbGVtZW50LCBkZWZhdWx0SW5zZXJ0Pzogc3RyaW5nKSB7XG4gICAgaWYgKHBhcmVudE5vZGUgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHRoaXMucm9vdEVsZW1lbnQsIFtcbiAgICAgICAgJ2JvZHknLFxuICAgICAgICBgZGl2WyR7X19Nb2NrQm9keV9ffV1gLFxuICAgICAgXSkgYXMgRWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKHBhcmVudE5vZGUgPT09IGRvY3VtZW50LmhlYWQpIHtcbiAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHRoaXMucm9vdEVsZW1lbnQsIFtcbiAgICAgICAgJ2hlYWQnLFxuICAgICAgICBgZGl2WyR7X19Nb2NrSGVhZF9ffV1gLFxuICAgICAgXSkgYXMgRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGxvY2F0aW9uIG9mIHRoZSBkZXN0aW5hdGlvbiBub2RlIGlzIG5vdCBhIGNvbnRhaW5lciB0byB0aGUgY29udGFpbmVyIG9mIHRoZSBhcHBsaWNhdGlvblxuICAgIC8vIEhhcyBub3QgYmVlbiBhZGRlZCB0byB0aGUgY29udGFpbmVyLCBvciBjYW5ub3QgYmUgc2VhcmNoZWQgdGhyb3VnaCBkb2N1bWVudCBpbiBzaGFkb3cgZG9tXG4gICAgaWYgKFxuICAgICAgdGhpcy5yb290RWxlbWVudC5jb250YWlucyhwYXJlbnROb2RlKSB8fFxuICAgICAgIWRvY3VtZW50LmNvbnRhaW5zKHBhcmVudE5vZGUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICBpZiAoZGVmYXVsdEluc2VydCA9PT0gJ2hlYWQnKSB7XG4gICAgICByZXR1cm4gZmluZFRhcmdldCh0aGlzLnJvb3RFbGVtZW50LCBbXG4gICAgICAgICdoZWFkJyxcbiAgICAgICAgYGRpdlske19fTW9ja0hlYWRfX31dYCxcbiAgICAgIF0pIGFzIEVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmIChkZWZhdWx0SW5zZXJ0ID09PSAnYm9keScpIHtcbiAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHRoaXMucm9vdEVsZW1lbnQsIFtcbiAgICAgICAgJ2JvZHknLFxuICAgICAgICBgZGl2WyR7X19Nb2NrQm9keV9ffV1gLFxuICAgICAgXSkgYXMgRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gIH1cblxuICBhcHBlbmQoY29udGV4dDogRWxlbWVudCwgYXJnczogSUFyZ3VtZW50cywgb3JpZ2luUHJvY2VzczogRnVuY3Rpb24pIHtcbiAgICBsZXQgY29udmVydGVkTm9kZTtcbiAgICBsZXQgcGFyZW50Tm9kZSA9IGNvbnRleHQ7XG4gICAgY29uc3QgeyBiYXNlVXJsLCBuYW1lc3BhY2UsIHN0eWxlU2NvcGVJZCB9ID0gdGhpcy5zYW5kYm94Lm9wdGlvbnM7XG5cbiAgICAvLyBEZWFsIHdpdGggc29tZSBzdGF0aWMgcmVzb3VyY2Ugbm9kZXNcbiAgICBpZiAoc291cmNlTGlzdFRhZ3MuaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgICAgdGhpcy5maXhSZXNvdXJjZU5vZGVVcmwodGhpcy5lbCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGR5bmFtaWMgc2NyaXB0IG5vZGUgYnkgbG9hZGVyXG4gICAgaWYgKHRoaXMuaXMoJ3NjcmlwdCcpKSB7XG4gICAgICBwYXJlbnROb2RlID0gdGhpcy5maW5kUGFyZW50Tm9kZUluQXBwKGNvbnRleHQsICdib2R5Jyk7XG4gICAgICBjb252ZXJ0ZWROb2RlID0gdGhpcy5hZGREeW5hbWljU2NyaXB0Tm9kZSgpO1xuICAgIH1cbiAgICAvLyBUaGUgc3R5bGUgbm9kZSBuZWVkcyB0byBiZSBwbGFjZWQgaW4gdGhlIHNhbmRib3ggcm9vdCBjb250YWluZXJcbiAgICBlbHNlIGlmICh0aGlzLmlzKCdzdHlsZScpKSB7XG4gICAgICBwYXJlbnROb2RlID0gdGhpcy5maW5kUGFyZW50Tm9kZUluQXBwKGNvbnRleHQsICdoZWFkJyk7XG4gICAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFN0eWxlTWFuYWdlcih0aGlzLmVsLnRleHRDb250ZW50KTtcbiAgICAgIG1hbmFnZXIuY29ycmVjdFBhdGgoYmFzZVVybCk7XG4gICAgICBpZiAoc3R5bGVTY29wZUlkKSB7XG4gICAgICAgIG1hbmFnZXIuc2V0U2NvcGUoe1xuICAgICAgICAgIGFwcE5hbWU6IG5hbWVzcGFjZSxcbiAgICAgICAgICByb290RWxJZDogc3R5bGVTY29wZUlkKCksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5lbC50ZXh0Q29udGVudCA9IG1hbmFnZXIudHJhbnNmb3JtQ29kZShtYW5hZ2VyLnN0eWxlQ29kZSk7XG4gICAgICBjb252ZXJ0ZWROb2RlID0gdGhpcy5lbDtcbiAgICAgIHRoaXMuc2FuZGJveC5keW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQuYWRkKHRoaXMuZWwpO1xuICAgICAgdGhpcy5tb25pdG9yQ2hhbmdlc09mU3R5bGUoKTtcbiAgICB9XG4gICAgLy8gVGhlIGxpbmsgbm9kZSBvZiB0aGUgcmVxdWVzdCBjc3MgbmVlZHMgdG8gYmUgY2hhbmdlZCB0byBzdHlsZSBub2RlXG4gICAgZWxzZSBpZiAodGhpcy5pcygnbGluaycpKSB7XG4gICAgICBwYXJlbnROb2RlID0gdGhpcy5maW5kUGFyZW50Tm9kZUluQXBwKGNvbnRleHQsICdoZWFkJyk7XG4gICAgICBpZiAodGhpcy5lbC5yZWwgPT09ICdzdHlsZXNoZWV0JyAmJiB0aGlzLmVsLmhyZWYpIHtcbiAgICAgICAgY29udmVydGVkTm9kZSA9IHRoaXMuYWRkRHluYW1pY0xpbmtOb2RlKChzdHlsZU5vZGUpID0+XG4gICAgICAgICAgdGhpcy5uYXRpdmVBcHBlbmQuY2FsbChwYXJlbnROb2RlLCBzdHlsZU5vZGUpLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udmVydGVkTm9kZSA9IHRoaXMuZWw7XG4gICAgICAgIHRoaXMubW9uaXRvckNoYW5nZXNPZkxpbmtOb2RlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29sbGVjdCBub2RlcyB0aGF0IGVzY2FwZSB0aGUgY29udGFpbmVyIG5vZGVcbiAgICBpZiAoXG4gICAgICAhdGhpcy5yb290RWxlbWVudC5jb250YWlucyhwYXJlbnROb2RlKSAmJlxuICAgICAgZG9jdW1lbnQuY29udGFpbnMocGFyZW50Tm9kZSlcbiAgICApIHtcbiAgICAgIGlmIChwYXJlbnROb2RlICE9PSB0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuc2FuZGJveC5kZWZlckNsZWFyRWZmZWN0cy5hZGQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuZWwpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaXggaW5uZXJIVE1MIGRvbSBpZnJhbWVcdTMwMDFpbWcgc3JjXG4gICAgaWYgKHRoaXMuZWwgJiYgdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgICBsZXQgbmVlZEZpeERvbSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lLGltZyx2aWRlbyxsaW5rLHNjcmlwdCxhdWRpbyxzdHlsZScpO1xuICAgICAgaWYgKG5lZWRGaXhEb20ubGVuZ3RoID4gMCkge1xuICAgICAgICBuZWVkRml4RG9tLmZvckVhY2goKGRvbSk9PntcbiAgICAgICAgICBzYWZlV3JhcHBlcigoKT0+IHRoaXMuZml4UmVzb3VyY2VOb2RlVXJsKGRvbSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXggdGhlIGJ1ZyBvZiByZWFjdCBobXJcbiAgICBpZiAodGhpcy5pcygnaWZyYW1lJykgJiYgdHlwZW9mIHRoaXMuZWwub25sb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB7IGVsLCBzYW5kYm94IH0gPSB0aGlzO1xuICAgICAgY29uc3Qgb3JpZ2luT25sb2FkID0gZWwub25sb2FkO1xuICAgICAgZWwub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzYWZlV3JhcHBlcigoKSA9PiBkZWYoZWwuY29udGVudFdpbmRvdywgJ3BhcmVudCcsIHNhbmRib3guZ2xvYmFsKSk7XG4gICAgICAgIHJldHVybiBvcmlnaW5PbmxvYWQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNvbnZlcnRlZE5vZGUpIHtcbiAgICAgIC8vIElmIGl0IGlzIFwiaW5zZXJ0QmVmb3JlXCIgb3IgXCJpbnNlcnRBZGphY2VudEVsZW1lbnRcIiBtZXRob2QsIG5vIG5lZWQgdG8gcmV3cml0ZSB3aGVuIGFkZGVkIHRvIHRoZSBjb250YWluZXJcbiAgICAgIGlmIChcbiAgICAgICAgaXNJbnNlcnRNZXRob2QodGhpcy5tZXRob2ROYW1lKSAmJlxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNvbnRhaW5zKGNvbnRleHQpICYmXG4gICAgICAgIGFyZ3NbMV0/LnBhcmVudE5vZGUgPT09IGNvbnRleHRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gb3JpZ2luUHJvY2VzcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IHNhbmRib3ggYGFwcGVuZE5vZGVgIGV2ZW50XG4gICAgICB0aGlzLnNhbmRib3guaG9va3MubGlmZWN5Y2xlLmFwcGVuZE5vZGUuZW1pdChcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgdGhpcy5lbCxcbiAgICAgICAgY29udmVydGVkTm9kZSxcbiAgICAgICAgdGhpcy50YWdOYW1lLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB0aGlzLm5hdGl2ZUFwcGVuZC5jYWxsKHBhcmVudE5vZGUsIGNvbnZlcnRlZE5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luUHJvY2VzcygpO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQoY29udGV4dDogRWxlbWVudCwgb3JpZ2luUHJvY2VzczogRnVuY3Rpb24pIHtcbiAgICAvLyByZW1vdmUgY29tbWVudCBub2RlIGFuZCByZXR1cm4gdGhlIHJlYWwgbm9kZVxuICAgIGlmICh0eXBlb2YgdGhpcy5lbFtfX1JFTU9WRV9OT0RFX19dID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmVsW19fUkVNT1ZFX05PREVfX10oKTtcbiAgICAgIHJldHVybiB0aGlzLmVsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzKCdzdHlsZScpIHx8IHRoaXMuaXMoJ2xpbmsnKSB8fCB0aGlzLmlzKCdzY3JpcHQnKSkge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuZmluZFBhcmVudE5vZGVJbkFwcChcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgdGhpcy5pcygnc2NyaXB0JykgPyAnYm9keScgOiAnaGVhZCcsXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5lbC5wYXJlbnROb2RlID09PSBwYXJlbnROb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLnNhbmRib3guZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0Lmhhcyh0aGlzLmVsKSkge1xuICAgICAgICAgIHRoaXMuc2FuZGJveC5keW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQuZGVsZXRlKHRoaXMuZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVJlbW92ZS5jYWxsKHBhcmVudE5vZGUsIHRoaXMuZWwpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luUHJvY2VzcygpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU3luY0hvb2ssIFN5bmNXYXRlcmZhbGxIb29rLCBQbHVnaW5TeXN0ZW0gfSBmcm9tICdAZ2FyZmlzaC9ob29rcyc7XG5pbXBvcnQgdHlwZSB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB0eXBlIHsgRmFrZVdpbmRvdyB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50R2V0dGVyRGF0YSB7XG4gIHZhbHVlOiBhbnk7XG4gIHByb3BOYW1lOiBQcm9wZXJ0eUtleTtcbiAgcHJveHlEb2N1bWVudDogRG9jdW1lbnQ7XG4gIHJvb3ROb2RlPzogbnVsbCB8IEVsZW1lbnQgfCBTaGFkb3dSb290O1xuICBjdXN0b21WYWx1ZT86IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbmRib3hMaWZlY3ljbGUoKSB7XG4gIHJldHVybiBuZXcgUGx1Z2luU3lzdGVtKHtcbiAgICBjbG9zZWQ6IG5ldyBTeW5jSG9vazxbXSwgdm9pZD4oKSxcbiAgICBzdGFyZWQ6IG5ldyBTeW5jSG9vazxbRmFrZVdpbmRvdz9dLCB2b2lkPigpLFxuICAgIGFwcGVuZE5vZGU6IG5ldyBTeW5jSG9vazxbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgc3RyaW5nXSwgdm9pZD4oKSxcbiAgICBkb2N1bWVudEdldHRlcjogbmV3IFN5bmNXYXRlcmZhbGxIb29rPERvY3VtZW50R2V0dGVyRGF0YT4oJ2RvY3VtZW50R2V0dGVyJyksXG4gICAgYmVmb3JlQ2xlYXJFZmZlY3Q6IG5ldyBTeW5jSG9vazxbXSwgdm9pZD4oKSxcbiAgICBhZnRlckNsZWFyRWZmZWN0OiBuZXcgU3luY0hvb2s8W10sIHZvaWQ+KCksXG4gICAgYmVmb3JlSW52b2tlOiBuZXcgU3luY0hvb2s8XG4gICAgICBbXG4gICAgICAgIHsgY29kZTogc3RyaW5nIH0sXG4gICAgICAgIHN0cmluZz8sXG4gICAgICAgIFJlY29yZDxzdHJpbmcsIGFueT4/LFxuICAgICAgICBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zPyxcbiAgICAgIF0sXG4gICAgICB2b2lkXG4gICAgPigpLFxuICAgIGFmdGVySW52b2tlOiBuZXcgU3luY0hvb2s8XG4gICAgICBbXG4gICAgICAgIHsgY29kZTogc3RyaW5nIH0sXG4gICAgICAgIHN0cmluZz8sXG4gICAgICAgIFJlY29yZDxzdHJpbmcsIGFueT4/LFxuICAgICAgICBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zPyxcbiAgICAgIF0sXG4gICAgICB2b2lkXG4gICAgPigpLFxuICAgIGludm9rZUVycm9yOiBuZXcgU3luY0hvb2s8XG4gICAgICBbRXJyb3IsIHN0cmluZz8sIFJlY29yZDxzdHJpbmcsIGFueT4/LCBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zP10sXG4gICAgICB2b2lkXG4gICAgPigpLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyB3YXJuLCBoYXNPd24sIHNhZmFyaTEzRGVhbCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuLi9zYW5kYm94JztcbmltcG9ydCB7IGlzRXNHbG9iYWxNZXRob2RzLCBpc05hdGl2ZUNvZGVNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgX193aW5kb3dCaW5kX18sIEdBUkZJU0hfT1BUSU1JWkVfTkFNRSB9IGZyb20gJy4uL3N5bWJvbFR5cGVzJztcbmltcG9ydCB7XG4gIGJpbmQsXG4gIGlzQ29uc3RydWN0b3IsXG4gIHZlcmlmeUdldHRlckRlc2NyaXB0b3IsXG4gIHZlcmlmeVNldHRlckRlc2NyaXB0b3IsXG59IGZyb20gJy4vc2hhcmVkJztcblxuLy8gd2luZG93IHByb3h5IGdldHRlclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdldHRlcihzYW5kYm94OiBTYW5kYm94KSB7XG4gIHJldHVybiAodGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5LCByZWNlaXZlcjogYW55KSA9PiB7XG4gICAgaWYgKHAgPT09IFN5bWJvbC51bnNjb3BhYmxlcykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgdmFsdWU7XG4gICAgY29uc3QgeyBvdmVycmlkZUxpc3QgfSA9IHNhbmRib3gucmVwbGFjZUdsb2JhbFZhcmlhYmxlcztcblxuICAgIGlmIChzYW5kYm94LmlzUHJvdGVjdFZhcmlhYmxlKHApKSB7XG4gICAgICAvLyBEb24ndCBwYXNzIHRoZSBcInJlY2VpdmVyXCIsIG90aGVyd2lzZSBpdCB3aWxsIGNhdXNlIHRoZSB3cm9uZyBwb2ludCBvZiB0aGlzXG4gICAgICByZXR1cm4gUmVmbGVjdC5nZXQod2luZG93LCBwKTtcbiAgICB9IGVsc2UgaWYgKHNhbmRib3guaXNJbnN1bGF0aW9uVmFyaWFibGUocCkpIHtcbiAgICAgIHZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBwLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gaGFzT3duKHRhcmdldCwgcClcbiAgICAgICAgPyBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKVxuICAgICAgICA6IFJlZmxlY3QuZ2V0KHdpbmRvdywgcCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gVGhlIGZvbGxvd2luZyBzaXR1YXRpb25zIGRvIG5vdCByZXF1aXJlIFwiYmluZFwiXG4gICAgICAvLyAgMS4gVGhlIGdsb2JhbCBtZXRob2Qgb24gdGhlIG5hdGl2ZSBlcyBzdGFuZGFyZFxuICAgICAgLy8gIDIuIE1ldGhvZHMgaW50ZXJuYWwgdG8gdGhlIHNhbmRib3ggb3IgcmV3cml0dGVuIGJ5IHRoZSB1c2VyXG4gICAgICAvLyAgMy4gQ29uc3RydWN0b3JcbiAgICAgIC8vIEFmdGVyIGZpbHRlcmluZyBvdXQgY3VzdG9tIGFuZCBuYXRpdmUgZXMgZnVuY3Rpb25zLCBvbmx5IGJvbSBhbmQgZG9tIGZ1bmN0aW9ucyBhcmUgbGVmdFxuICAgICAgLy8gTWFrZSBqdWRnbWVudHMgc3VjaCBhcyBjb25zdHJ1Y3RvcnMgZm9yIHRoZXNlIGVudmlyb25tZW50LXJlbGF0ZWQgZnVuY3Rpb25zIHRvIGZ1cnRoZXIgbmFycm93IHRoZSBzY29wZSBvZiBiaW5kXG4gICAgICBpZiAoXG4gICAgICAgIGlzRXNHbG9iYWxNZXRob2RzKHApIHx8XG4gICAgICAgIGlzTmF0aXZlQ29kZU1ldGhvZHMocCkgfHxcbiAgICAgICAgaGFzT3duKG92ZXJyaWRlTGlzdCwgcCkgfHxcbiAgICAgICAgaXNDb25zdHJ1Y3Rvcih2YWx1ZSkgfHxcbiAgICAgICAgc2FuZGJveC5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuaGFzKHApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoYXNPd24odmFsdWUsIF9fd2luZG93QmluZF9fKVxuICAgICAgPyB2YWx1ZVtfX3dpbmRvd0JpbmRfX11cbiAgICAgIDogYmluZCh2YWx1ZSwgd2luZG93KTtcbiAgICBjb25zdCB2ZXJpZnlSZXN1bHQgPSB2ZXJpZnlHZXR0ZXJEZXNjcmlwdG9yKHRhcmdldCwgcCwgbmV3VmFsdWUpO1xuICAgIGlmICh2ZXJpZnlSZXN1bHQgPiAwKSB7XG4gICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAxKSByZXR1cm4gdmFsdWU7XG4gICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAyKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YWx1ZVtfX3dpbmRvd0JpbmRfX10gPSBuZXdWYWx1ZTtcbiAgICByZXR1cm4gbmV3VmFsdWU7XG4gIH07XG59XG5cbmNvbnN0IHNhZmFyaVByb3h5V2luZG93RGVhbEhhbmRsZXIgPSBzYWZhcmkxM0RlYWwoKTtcblxuLy8gd2luZG93IHByb3h5IHNldHRlclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNldHRlcihzYW5kYm94OiBTYW5kYm94KSB7XG4gIHJldHVybiAodGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogdW5rbm93biwgcmVjZWl2ZXI6IGFueSkgPT4ge1xuICAgIGNvbnN0IHZlcmlmeVJlc3VsdCA9IHZlcmlmeVNldHRlckRlc2NyaXB0b3IoXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIHNhbmRib3guaXNQcm90ZWN0VmFyaWFibGUocClcbiAgICAgICAgPyB3aW5kb3dcbiAgICAgICAgOiByZWNlaXZlclxuICAgICAgICAgID8gcmVjZWl2ZXJcbiAgICAgICAgICA6IHRhcmdldCxcbiAgICAgIHAsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICAgIC8vIElmIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZSwgdGhlIHNldHRpbmcgc3VjY2VzcyB3aWxsIGJlIHJldHVybmVkIGRpcmVjdGx5LiBDYW5ub3QgYmUgc2V0IGFuZCByZXR1cm4gdG8gZmFpbHVyZSBkaXJlY3RseS5cbiAgICAvLyBcIlJlZmxlY3Quc2V0XCIgZG9lcyBub3QgcGVyZm9ybSB0aGlzIHBhcnQgb2YgcHJvY2Vzc2luZyBieSBkZWZhdWx0IGluIHNhZmFyaVxuICAgIGlmICh2ZXJpZnlSZXN1bHQgPiAwKSB7XG4gICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAxIHx8IHZlcmlmeVJlc3VsdCA9PT0gMikgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMykgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNhbmRib3guaXNQcm90ZWN0VmFyaWFibGUocCkpIHtcbiAgICAgIHJldHVybiBSZWZsZWN0LnNldCh3aW5kb3csIHAsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY3VycmVudCBpcyBzZXR0aW5nXG4gICAgICBzYWZhcmlQcm94eVdpbmRvd0RlYWxIYW5kbGVyLnRyaWdnZXJTZXQoKTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBSZWZsZWN0LnNldCh0YXJnZXQsIHAsIHZhbHVlLCByZWNlaXZlcik7XG4gICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBpZiAoc2FuZGJveC5pbml0Q29tcGxldGUpIHtcbiAgICAgICAgICBzYW5kYm94LmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5hZGQocCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgbmVlZCBvcHRpbWl6YXRpb24gdmFyaWFibGVzXG4gICAgICAgIGlmIChzYW5kYm94Lmdsb2JhbCkge1xuICAgICAgICAgIGNvbnN0IG1ldGhvZHMgPSBzYW5kYm94Lmdsb2JhbFtgJHtHQVJGSVNIX09QVElNSVpFX05BTUV9TWV0aG9kc2BdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1ldGhvZHMpKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kcy5pbmNsdWRlcyhwKSkge1xuICAgICAgICAgICAgICBjb25zdCB1cGRhdGVTdGFjayA9XG4gICAgICAgICAgICAgICAgc2FuZGJveC5nbG9iYWxbYCR7R0FSRklTSF9PUFRJTUlaRV9OQU1FfVVwZGF0ZVN0YWNrYF07XG4gICAgICAgICAgICAgIHVwZGF0ZVN0YWNrLmZvckVhY2goKGZuKSA9PiBmbihwLCB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfVxuICB9O1xufVxuXG4vLyB3aW5kb3cgcHJveHkgZGVmaW5lUHJvcGVydHlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWZpbmVQcm9wZXJ0eShzYW5kYm94OiBTYW5kYm94KSB7XG4gIHJldHVybiAodGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpID0+IHtcbiAgICBzYWZhcmlQcm94eVdpbmRvd0RlYWxIYW5kbGVyLmhhbmRsZURlc2NyaXB0b3IoZGVzY3JpcHRvcik7XG5cbiAgICBpZiAoc2FuZGJveC5pc1Byb3RlY3RWYXJpYWJsZShwKSkge1xuICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBwLCBkZXNjcmlwdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwLCBkZXNjcmlwdG9yKTtcbiAgICAgIGlmIChzYW5kYm94LmluaXRDb21wbGV0ZSAmJiBzdWNjZXNzKSB7XG4gICAgICAgIHNhbmRib3guaXNFeHRlcm5hbEdsb2JhbFZhcmlhYmxlLmFkZChwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gd2luZG93IHByb3h5IGRlbGV0ZVByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVsZXRlUHJvcGVydHkoc2FuZGJveDogU2FuZGJveCkge1xuICByZXR1cm4gKHRhcmdldDogV2luZG93LCBwOiBQcm9wZXJ0eUtleSkgPT4ge1xuICAgIGlmIChoYXNPd24odGFyZ2V0LCBwKSkge1xuICAgICAgZGVsZXRlIHRhcmdldFtwIGFzIGFueV07XG4gICAgICBpZiAoc2FuZGJveC5pbml0Q29tcGxldGUgJiYgc2FuZGJveC5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuaGFzKHApKSB7XG4gICAgICAgIHNhbmRib3guaXNFeHRlcm5hbEdsb2JhbFZhcmlhYmxlLmRlbGV0ZShwKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICBpZiAoaGFzT3duKHdpbmRvdywgcCkgJiYgc2FuZGJveC5pc1Byb3RlY3RWYXJpYWJsZShwKSkge1xuICAgICAgICB3YXJuKGBUaGUgXCIke1N0cmluZyhwKX1cIiBpcyBnbG9iYWwgcHJvdGVjdCB2YXJpYWJsZS5cImApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cblxuLy8gd2luZG93IHByb3h5IGhhc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhhcyhzYW5kYm94OiBTYW5kYm94KSB7XG4gIHJldHVybiAoX3RhcmdldDogV2luZG93LCBwOiBQcm9wZXJ0eUtleSkgPT4ge1xuICAgIGlmIChzYW5kYm94LmlzUHJvdGVjdFZhcmlhYmxlKHApKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKChzYW5kYm94IGFzIGFueSkuZW52VmFyaWFibGUgPT09IHApIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7QUNEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0RBOzs7QUNBQTs7O0FDQUE7OztBQ0FPLElBQU0sMkJBQTJCO0FBQ2pDLElBQU0sd0JBQXdCO0FBQzlCLElBQU0sZ0JBQWdCLE9BQU8sSUFBSTtBQUNqQyxJQUFNLGlCQUFpQixPQUFPLElBQUk7QUFDbEMsSUFBTSxpQkFBaUIsT0FBTyxJQUFJO0FBQ2xDLElBQU0saUJBQWlCLE9BQU8sSUFBSTtBQUNsQyxJQUFNLG1CQUFtQixPQUFPLElBQUk7QUFDcEMsSUFBTSxvQkFBb0IsT0FBTyxJQUFJO0FBQ3JDLElBQU0sd0JBQXdCLE9BQU8sSUFBSTs7O0FERWhELElBQU0sa0JBR0Ysb2dCQVVBLE1BQU07QUFFVixJQUFNLG9CQUFvQixrQkFBa0IsTUFBTTtBQUUzQyxJQUFNLG9CQUFvQixRQUFRO0FBQ2xDLElBQU0sc0JBQXNCLFFBQVE7QUFJcEMsSUFBTSxrQkFBa0IsQ0FBQyxHQUFHLGlCQUFpQixPQUFPLENBQUMsTUFBTSxNQUFNO0FBSXhFLElBQUksY0FBb0Msb0JBQUk7QUFDNUMsSUFBSSxDQUFFLE9BQXNCLGlCQUFpQjtBQUMzQyxFQUFDLE9BQXNCLGtCQUFrQjtBQUFBLE9BQ3BDO0FBQ0wsZ0JBQWUsT0FBc0I7QUFBQTtBQUdoQyxJQUFNLGFBQWE7QUFBQSxFQUN4QixZQUFZO0FBQUEsRUFFWixJQUFJLFNBQXVDO0FBQ3pDLFFBQUksQ0FBQztBQUFTO0FBQ2QsVUFBTSxZQUFZLFFBQVE7QUFDMUIsUUFBSSxPQUFPLGNBQWM7QUFBVTtBQUNuQyxXQUFPLEtBQUssV0FBVyxJQUFJO0FBQUE7QUFBQSxFQUc3QixjQUFjLFNBQWtCLFNBQWtCO0FBQ2hELFFBQUksQ0FBQztBQUFTO0FBQ2QsWUFBUSx5QkFBeUIsUUFBUTtBQUFBO0FBQUEsRUFHM0MsSUFBSSxTQUFrQjtBQUNwQixRQUFJLEtBQUssV0FBVyxJQUFJLFFBQVE7QUFBSztBQUNyQyxTQUFLLFdBQVcsSUFBSSxRQUFRLElBQUk7QUFBQTtBQUFBLEVBR2xDLElBQUksU0FBa0I7QUFDcEIsU0FBSyxXQUFXLE9BQU8sUUFBUTtBQUFBO0FBQUE7QUFJNUIsdUJBQXVCLE1BQStCO0FBQzNELFNBQU8sTUFBTSxRQUFRLFFBQVEsT0FBTyxNQUFNLEtBQUs7QUFDL0MsU0FBTyxLQUFLLElBQUksQ0FBQyxNQUFNO0FBQ3JCLFdBQU8sS0FBSyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQjtBQUFBO0FBQUE7QUFLL0MsaUJBQWlCLFNBQWtCO0FBQ3hDLFFBQU0sWUFBWSxXQUFXLFFBQVEsUUFBUTtBQUM3QyxTQUFPLGFBQWE7QUFBQTtBQVFmLDBCQUNMLFFBQ0EsUUFDQSxZQUNBO0FBQ0EsUUFBTSxhQUFhO0FBQ25CLFFBQU0sY0FBYztBQUNwQixRQUFNLGFBQWEsdUJBQU8sT0FBTztBQUNqQyxRQUFNLGdCQUFnQixPQUFPLG9CQUFvQjtBQUNqRCxRQUFNLE9BQU0sQ0FBQyxNQUFjO0FBQ3pCLFVBQU0sYUFBYSxPQUFPLHlCQUF5QixRQUFRO0FBRTNELFFBQUkseUNBQVksY0FBYztBQUM1QixZQUFNLFlBQVksT0FBTyxZQUFZO0FBQ3JDLFlBQU0sWUFBWSxPQUFPLFlBQVk7QUFDckMsWUFBTSxjQUFjLE9BQU8sZUFBZSxjQUFjLFdBQVc7QUFFbkUsVUFBSSxXQUFXO0FBRWIsbUJBQVcsTUFBTSxNQUFNLE9BQU8sWUFBWSxLQUN0QyxXQUFXLEtBQ1gsT0FBTztBQUFBO0FBRWIsVUFBSSxXQUFXO0FBQ2IsbUJBQVcsTUFBTSxDQUFDLFFBQVE7QUFDeEIscUJBQVcsS0FBSztBQUNoQixpQkFBTztBQUFBO0FBQUE7QUFHWCxVQUFJLGFBQWE7QUFDZixZQUFJLFdBQVcsYUFBYSxPQUFPO0FBQ2pDLHFCQUFXLFdBQVc7QUFBQSxtQkFDYixXQUFXO0FBQ3BCLHFCQUFXLE1BQU0sQ0FBQyxRQUFRO0FBQ3hCLHVCQUFXLEtBQUs7QUFDaEIsbUJBQU87QUFBQTtBQUFBO0FBQUE7QUFJYixhQUFPLGVBQWUsWUFBWSxHQUFHLE9BQU8sT0FBTztBQUFBO0FBQUE7QUFHdkQsZ0JBQWMsUUFBUSxDQUFDLE1BQU07QUFDM0IsZ0JBQVksS0FBSztBQUNqQixXQUFPLFdBQVcsYUFBYSxDQUFDLE9BQU8sTUFBTSxLQUFJLEtBQUssS0FBSTtBQUFBO0FBRzVELGFBQVcsUUFBUSxRQUFRO0FBQ3pCLEtBQUMsWUFBWSxTQUFTLEtBQUk7QUFBQTtBQUU1QixTQUFPO0FBQUE7QUFHVCxJQUFJLFVBQVU7QUFDUCxvQ0FBb0MsZUFBZTtBQUd4RCxRQUFNLE9BQU8sU0FBUyxTQUFTO0FBQy9CLE1BQUksUUFBUSxLQUFLLGVBQWUsZUFBZTtBQUM3QyxXQUFPLGVBQWUsTUFBTSxjQUFjO0FBQUEsTUFDeEMsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBO0FBR2hCLFFBQUksU0FBUztBQUNYLGdCQUFVO0FBRVYsZUFBUyxNQUFNO0FBQ2Isa0JBQVU7QUFDVixlQUFPLGVBQWUsTUFBTSxjQUFjO0FBQUEsVUFDeEMsT0FBTztBQUFBLFVBQ1AsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPakIsZ0NBQWdDLFNBQTJCO0FBcEtsRTtBQXNLRSxTQUNFLG1CQUFtQixvQkFDbkIsQ0FBQyxRQUFRLGVBQ1QsZUFBUSxVQUFSLG1CQUFlLFNBQVM7QUFBQTs7O0FEdEtyQiwwQkFBMEIsTUFBMkI7QUFDMUQsTUFBSSxTQUFTO0FBQVcsV0FBTztBQUMvQixTQUFPLFdBQVcsUUFBUSxjQUFjO0FBQUE7QUFHbkMsOEJBQThCLE1BQTJCO0FBQzlELE1BQUksU0FBUztBQUFXLFdBQU87QUFDL0IsU0FBTyxTQUFTLFFBQVEsU0FBUztBQUFBO0FBRzVCLGdDQUNMLFFBQ0EsR0FDQSxVQUNBO0FBQ0EsUUFBTSxPQUFPLE9BQU8seUJBQXlCLFFBQVE7QUFFckQsTUFBSSxTQUFTLFVBQWEsS0FBSyxpQkFBaUIsT0FBTztBQUNyRCxRQUFJLGlCQUFpQixTQUFTLEtBQUssYUFBYSxPQUFPO0FBRXJELFVBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxLQUFLLFFBQVE7QUFDcEMsWUFBSyxPQUFPLFlBQVksZUFBZSxRQUFRLE9BQU8sUUFBUSxJQUFJLFdBQVksUUFBUSxJQUFJLGFBQWEsZUFBZ0IsT0FBUTtBQUU3SCxlQUFLLGFBQWEsT0FBTztBQUFBO0FBRTNCLGVBQU87QUFBQTtBQUFBLGVBRUEscUJBQXFCLFNBQVMsS0FBSyxRQUFRLFFBQVc7QUFDL0QsYUFBTztBQUFBO0FBQUE7QUFHWCxTQUFPO0FBQUE7QUFHRixzQkFDTCxhQUNBLFFBQ0EsR0FDQSxLQUNBLFVBQ0E7QUFDQSxRQUFNLGVBQWUsdUJBRW5CLGNBQWMsY0FBZSxZQUFZLFFBQ3pDLEdBQ0E7QUFHRixNQUFJO0FBQ0osTUFBSSxlQUFlLEdBQUc7QUFDcEIsUUFBSSxpQkFBaUIsS0FBSyxpQkFBaUI7QUFBRyxlQUFTO0FBQ3ZELFFBQUksaUJBQWlCO0FBQUcsZUFBUztBQUFBO0FBR25DLFNBQU87QUFBQTtBQUdGLGdDQUNMLFFBQ0EsR0FDQSxVQUNBO0FBQ0EsUUFBTSxPQUFPLE9BQU8seUJBQXlCLFFBQVE7QUFFckQsTUFBSSxTQUFTLFVBQWEsS0FBSyxpQkFBaUIsT0FBTztBQUNyRCxRQUFJLGlCQUFpQixTQUFTLEtBQUssYUFBYSxPQUFPO0FBRXJELFVBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxLQUFLLFFBQVE7QUFDcEMsWUFBSyxPQUFPLFlBQVksZUFBZSxRQUFRLE9BQU8sUUFBUSxJQUFJLFdBQVksUUFBUSxJQUFJLGFBQWEsZUFBZ0IsT0FBUTtBQUU3SCxlQUFLLGFBQWEsT0FBTztBQUFBO0FBRTNCLGVBQU87QUFBQSxhQUNGO0FBQ0wsZUFBTztBQUFBO0FBQUEsZUFFQSxxQkFBcUIsU0FBUyxLQUFLLFFBQVEsUUFBVztBQUMvRCxhQUFPO0FBQUE7QUFBQTtBQUdYLFNBQU87QUFBQTtBQUdULHNCQUFzQixPQUFPO0FBQzNCLE1BQUk7QUFDRixXQUFPLE1BQU07QUFBQSxXQUNOLEdBQVA7QUFDQSxXQUFPO0FBQUE7QUFBQTtBQUlKLHVCQUF1QixJQUFzQztBQUNsRSxRQUFNLEtBQUssR0FBRztBQUNkLFFBQU0saUJBQ0osTUFBTSxHQUFHLGdCQUFnQixNQUFNLE9BQU8sb0JBQW9CLElBQUksU0FBUztBQUN6RSxRQUFNLGNBQWMsQ0FBQyxrQkFBa0IsYUFBYTtBQUVwRCxTQUNFLGtCQUNBLG9CQUFvQixLQUFLLGdCQUN6QixXQUFXLEtBQUs7QUFBQTtBQUlwQixJQUFNLGVBQWUsU0FBUTtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBR1QsdUJBQXVCLEdBQWEsR0FBYTtBQUMvQyxhQUFXLE9BQU8sUUFBUSxRQUFRLElBQUk7QUFDcEMsUUFBSSxhQUFhO0FBQU07QUFDdkIsVUFBTSxPQUFPLE9BQU8seUJBQXlCLEdBQUc7QUFDaEQsUUFBSSxRQUFRLEtBQUssVUFBVTtBQUN6QixRQUFFLE9BQU8sRUFBRTtBQUFBO0FBQUE7QUFBQTtBQVVWLGNBQWMsSUFBSSxTQUFjO0FBQ3JDLFFBQU0sT0FBTyxXQUFZO0FBQUE7QUFDekIsbUJBQTBCO0FBQ3hCLFVBQU0sT0FBTyxjQUFjO0FBQzNCLFFBQUksZ0JBQWdCLE9BQU87QUFDekIsWUFBTSxNQUFNLElBQUksR0FBRyxHQUFHO0FBQ3RCLGFBQU8sZUFBZSxLQUFLLE1BQU07QUFDakMsYUFBTztBQUFBLFdBQ0Y7QUFDTCxhQUFPLEdBQUcsTUFBTSxTQUFTO0FBQUE7QUFBQTtBQUs3QixRQUFNLFVBQVU7QUFDaEIsZ0JBQWMsSUFBSTtBQUVsQixNQUFJLEdBQUcsV0FBVztBQUVoQixTQUFLLFlBQVksR0FBRztBQUFBO0FBRXRCLFFBQU0sWUFBWSxJQUFJO0FBR3RCLE1BQUksT0FBTyxhQUFhO0FBQ3RCLFdBQU8sZUFBZSxPQUFPLE9BQU8sYUFBYTtBQUFBLE1BQy9DLGNBQWM7QUFBQSxNQUNkLE1BQU0sVUFBVTtBQUNkLGNBQU0sS0FBSyxHQUFHO0FBQ2QsZUFBTyxTQUFTLE9BQU8sT0FBTyxPQUFPLGFBQ2pDLG9CQUFvQixLQUNwQjtBQUFBO0FBQUE7QUFBQTtBQUlWLFNBQU87QUFBQTs7O0FEbEtULElBQU0sWUFBWSxTQUFRLENBQUM7QUFFcEIseUJBQXlCO0FBQzlCLFFBQU0sUUFBUSxPQUFPLGVBQWUsT0FBTyxZQUFZLFFBQVE7QUFDL0QsUUFBTSxjQUFjLE9BQU8sT0FBTztBQUVsQyxRQUFNLGVBQWUsSUFBSSxNQUFNLGFBQWE7QUFBQSxJQUMxQyxJQUFJLFFBQWEsR0FBZ0I7QUFDL0IsWUFBTSxRQUFRLFFBQU8sUUFBUSxLQUFLLE9BQU8sS0FBSyxPQUFPLFFBQVE7QUFDN0QsYUFBTyxPQUFPLFVBQVUsYUFBYSxNQUFNLEtBQUssT0FBTyxXQUFXO0FBQUE7QUFBQSxJQUdwRSxJQUFJLFFBQWEsR0FBZ0IsT0FBWSxVQUFlO0FBQzFELFlBQU0sWUFBWSxPQUFPLE1BQU0sWUFBWSxVQUFVO0FBQ3JELFlBQU0scUJBQXFCLGFBQ3pCLFlBQVksVUFBVSxNQUN0QixRQUNBLEdBQ0EsT0FDQTtBQUVGLFVBQUksdUJBQXVCLFFBQVc7QUFDcEMsZUFBTztBQUFBLGFBQ0Y7QUFDTCxlQUFPLFlBQ0gsUUFBUSxJQUFJLFNBQVMsR0FBRyxTQUN4QixRQUFRLElBQUksUUFBUSxHQUFHLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFJdEMsaUJBQWlCO0FBQ2YsYUFBTztBQUFBO0FBQUE7QUFJWCxRQUFNLGtCQUFrQixvQkFBbUI7QUFDekMsVUFBTSxJQUFJLFVBQVU7QUFBQTtBQUd0QixrQkFBZ0IsWUFBWTtBQUM1QixrQkFBZ0IsVUFBVSxjQUFjO0FBRXhDLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQTtBQUFBO0FBQUE7OztBSWpEZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNPLHVCQUF1QixTQUFrQjtBQUM5QyxRQUFNLFVBQVUsUUFBUSxRQUFRO0FBQ2hDLFFBQU0sUUFBUSxvQkFBSTtBQUNsQixRQUFNLFNBQVMsb0JBQUk7QUFDbkIsUUFBTSxXQUFXLG9CQUFJO0FBQ3JCLFFBQU0sVUFBVSxDQUFDLFFBQ2YsUUFBUSxRQUFRLGNBQ2hCLFdBQ0EsT0FBTyxRQUFRLFlBQ2YsQ0FBQyxXQUFXO0FBRWQsbUNBQWlDLGVBQWU7QUFBQSxJQUM5QyxjQUFjO0FBQ1o7QUFDQSxhQUFPLElBQUk7QUFBQTtBQUFBLElBR2IsT0FBTztBQUVMLFVBQUksVUFBVSxPQUFPLE9BQU87QUFDMUIsZUFBTyxPQUFPO0FBQUE7QUFFaEIsVUFBSSxRQUFRLFVBQVUsS0FBSztBQUN6QixrQkFBVSxLQUFLLFVBQ1gsYUFBYSxTQUFTLFVBQVUsTUFDaEMsVUFBVTtBQUFBO0FBR2hCLFlBQU0sTUFBTSxVQUFVO0FBRXRCLFVBQUcsUUFBUSxRQUFRLGVBQWM7QUFDL0IsZ0JBQVEsUUFBUSxjQUFjO0FBQUEsVUFDNUIsU0FBUztBQUFBLFVBQ1Q7QUFBQTtBQUFBO0FBR0osYUFBTyxNQUFNLEtBQUssTUFBTSxNQUFNO0FBQUE7QUFBQSxJQUdoQyxRQUFRO0FBQ04sYUFBTyxPQUFPO0FBQ2QsYUFBTyxNQUFNLE1BQU0sTUFBTSxNQUFNO0FBQUE7QUFBQTtBQUluQyw4QkFBNEIsVUFBVTtBQUFBLElBQ3BDLFlBQVksS0FBSyxXQUErQjtBQUM5QyxVQUFJLFFBQVEsUUFBUSxTQUFTO0FBQzNCLGNBQU0sWUFBWSxhQUFhO0FBQy9CLGNBQU0sYUFBYSxXQUFXLFVBQVU7QUFBQTtBQUUxQyxZQUFNLEtBQUs7QUFDWCxZQUFNLElBQUk7QUFBQTtBQUFBLElBR1osUUFBUTtBQUNOLFlBQU0sT0FBTztBQUNiLGFBQU8sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUFBO0FBQUE7QUFLbkMsUUFBTSxZQUFZLENBQUMsT0FBTyxVQUF1QixPQUFPO0FBQ3RELFFBQUksUUFBUSxVQUFVLFNBQVM7QUFDN0IsY0FBUSxhQUFhLFNBQVM7QUFBQTtBQUVoQyxRQUFHLFFBQVEsUUFBUSxlQUFjO0FBQy9CLGNBQVEsUUFBUSxjQUFjLEVBQUUsU0FBUyxTQUFTLEtBQUs7QUFBQTtBQUV6RCxRQUFJO0FBQ0osUUFBSSxDQUFDLFFBQU8sU0FBUyxhQUFhLE9BQU8saUJBQWlCO0FBQ3hELG1CQUFhLElBQUksT0FBTztBQUN4QixlQUFTLElBQUk7QUFDYixjQUFRLFNBQVMsV0FBVztBQUFBO0FBRTlCLFVBQU0sU0FBUyxPQUFPLE1BQU0sT0FBTztBQUNuQyxXQUFPLGNBQWMsVUFBVSxVQUMzQixPQUFPLFFBQVEsTUFBTSxTQUFTLE9BQU8sZUFDckM7QUFBQTtBQUdOLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLE1BQ2hCLE9BQU87QUFBQTtBQUFBLElBR1QsVUFBVTtBQUNSLFlBQU0sUUFBUSxDQUFDLE9BQU87QUFDcEIsWUFBSSxPQUFPLEdBQUcsVUFBVTtBQUFZLGFBQUc7QUFBQTtBQUV6QyxhQUFPLFFBQVEsQ0FBQyxRQUFRO0FBQ3RCLFlBQUksT0FBTyxJQUFJLFVBQVU7QUFBWSxjQUFJO0FBQUE7QUFFM0MsZUFBUyxRQUFRLENBQUMsU0FBUztBQUN6QixZQUFJLE9BQU8sS0FBSyxVQUFVO0FBQVksZUFBSztBQUFBO0FBRzdDLFlBQU07QUFDTixhQUFPO0FBQ1AsZUFBUztBQUFBO0FBQUE7QUFBQTs7O0FDOUdmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWNBLElBQU0sYUFBWSxTQUFRLENBQUMsU0FBUyxVQUFVLGlCQUFpQjtBQUUvRCxJQUFNLGlCQUFpQixTQUFRO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBO0FBSUssc0JBQXNCLFNBQWtCO0FBQzdDLFNBQU8sQ0FBQyxRQUFhLEdBQWdCLGFBQW1CO0FBQ3RELFFBQUksTUFBTSxpQkFBaUI7QUFDekIsYUFBTyxRQUFRLElBQUksVUFBVTtBQUFBO0FBRy9CLFVBQU0sV0FBVyxRQUFRO0FBQ3pCLFVBQU0sa0JBQWtCLFFBQVEsUUFBUTtBQUN4QyxVQUFNLFFBQVEsUUFBTyxRQUFRLEtBQ3pCLFFBQVEsSUFBSSxRQUFRLEdBQUcsWUFDdkIsUUFBUSxJQUFJLFVBQVU7QUFHMUIsVUFBTSxXQUFXLFFBQVEsTUFBTSxVQUFVLGVBQWUsS0FBSztBQUFBLE1BQzNEO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBO0FBR2YsUUFBSSxTQUFTLGFBQWE7QUFDeEIsYUFBTyxTQUFTO0FBQUE7QUFHbEIsVUFBTSxnQkFBZ0IsQ0FBQyxPQUFPO0FBQzVCLFVBQUksVUFBUyxLQUFLO0FBQ2hCLG1CQUFXLGNBQWMsSUFBSTtBQUM3QixZQUFLLE9BQU8sWUFBWSxlQUFlLFFBQVEsT0FBTyxRQUFRLElBQUksV0FBWSxRQUFRLElBQUksYUFBYSxlQUFnQixPQUFRO0FBQzdILGFBQUcsY0FBYztBQUFBO0FBQUE7QUFHckIsYUFBTztBQUFBO0FBR1QsUUFBSSxVQUFVO0FBQ1osVUFBSSxNQUFNLGlCQUFpQjtBQUN6QixlQUFPLFNBQVUsU0FBUyxTQUFTO0FBQ2pDLGdCQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsU0FBUztBQUN6QyxpQkFBTyxjQUFjO0FBQUE7QUFBQSxpQkFFZCxNQUFNLGtCQUFrQjtBQUNqQyxlQUFPLFNBQVUsTUFBTTtBQUNyQixnQkFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVO0FBQ2hDLGlCQUFPLGNBQWM7QUFBQTtBQUFBLGlCQUVkLE1BQU0sUUFBUTtBQUN2QixlQUFPLFdBQVcsVUFBVSxDQUFDLFFBQVEsT0FBTyxxQkFBcUI7QUFBQTtBQUluRSxVQUFJLGlCQUFpQjtBQUNuQixZQUFJLE1BQU0sUUFBUTtBQUdoQixpQkFBTyxXQUFXLFVBQVUsQ0FBQyxRQUFRLE9BQU87QUFBQSxtQkFDbkMsZUFBZSxJQUFJO0FBQzVCLGlCQUFPLE1BQU0sbUJBQ1QsQ0FBQyxRQUFPLFNBQVMsY0FBYyxJQUFJLFNBQ25DLFNBQVMsR0FBRyxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBSzNCLFFBQUksT0FBTyxVQUFVLFlBQVk7QUFDL0IsVUFBSSxXQUFXLFFBQU8sT0FBTyxvQkFDekIsTUFBTSxvQkFDTjtBQUNKLFVBQUksQ0FBQztBQUFVLG1CQUFXLEtBQUssT0FBTztBQUV0QyxZQUFNLGVBQWUsdUJBQXVCLFFBQVEsR0FBRztBQUN2RCxVQUFJLGVBQWUsR0FBRztBQUNwQixZQUFJLGlCQUFpQjtBQUFHLGlCQUFPO0FBQy9CLFlBQUksaUJBQWlCO0FBQUcsaUJBQU87QUFBQTtBQUVqQyxZQUFNLG9CQUFvQjtBQUMxQixhQUFPO0FBQUE7QUFFVCxXQUFPO0FBQUE7QUFBQTtBQUlYLElBQU0saUNBQWlDO0FBR2hDLHNCQUFzQixTQUFTO0FBQ3BDLFNBQU8sQ0FBQyxRQUFhLEdBQWdCLE9BQVksYUFBa0I7QUFDakUsVUFBTSxXQUFXLFFBQVE7QUFDekIsVUFBTSxlQUFlLHVCQUVuQixPQUFPLE1BQU0sWUFBWSxXQUFVLEtBQy9CLFdBQ0MsWUFBWSxRQUNqQixHQUNBO0FBRUYsUUFBSSxlQUFlLEdBQUc7QUFDcEIsVUFBSSxpQkFBaUIsS0FBSyxpQkFBaUI7QUFBRyxlQUFPO0FBQ3JELFVBQUksaUJBQWlCO0FBQUcsZUFBTztBQUFBO0FBSWpDLFFBQUksTUFBTSxtQkFBbUIsTUFBTSxlQUFlO0FBQ2hELFVBQUksVUFBVTtBQUNaLGVBQU8sUUFBUSxJQUFJLFVBQVUsR0FBRztBQUFBLGFBQzNCO0FBQ0wsZUFBTyxRQUFRLElBQUksVUFBVSxHQUFHO0FBQUE7QUFBQTtBQUlwQyxRQUFJLE9BQU8sTUFBTSxZQUFZLFdBQVUsSUFBSTtBQUN6QyxhQUFPLFFBQVEsSUFBSSxVQUFVLEdBQUc7QUFBQSxXQUMzQjtBQUNMLHFDQUErQjtBQUMvQixhQUFPLFFBQVEsSUFBSSxRQUFRLEdBQUcsT0FBTztBQUFBO0FBQUE7QUFBQTtBQU1wQyxnQ0FBZ0M7QUFDckMsU0FBTyxDQUFDLFFBQWEsR0FBZ0IsZUFBbUM7QUFDdEUsbUNBQStCLGlCQUFpQjtBQUNoRCxXQUFPLFdBQVUsS0FDYixRQUFRLGVBQWUsVUFBVSxHQUFHLGNBQ3BDLFFBQVEsZUFBZSxRQUFRLEdBQUc7QUFBQTtBQUFBO0FBS25DLHFCQUFxQjtBQUMxQixTQUFPLENBQUMsUUFBYSxNQUFtQjtBQUN0QyxRQUFJLE1BQU07QUFBaUIsYUFBTyxRQUFRLElBQUksVUFBVTtBQUN4RCxXQUFPLFFBQU8sUUFBUSxNQUFNLFFBQVEsSUFBSSxVQUFVO0FBQUE7QUFBQTs7O0FDckovQyxJQUFNLGlCQUFpQixDQUFDLFlBQXFCO0FBQ2xELE1BQUksZ0JBQWdCLE9BQU8sT0FBTztBQUNsQyxRQUFNLFNBQVMsYUFBYTtBQUU1QixRQUFNLGVBQWUsaUJBQWlCO0FBRXRDLFFBQU0sb0JBQW9CLElBQUksTUFBTSxjQUFjO0FBQUEsSUFDaEQsS0FBSyxJQUFJLFNBQVM7QUFDaEIsaUNBQTJCO0FBQzNCLGFBQU8sT0FBTyxHQUFHO0FBQUE7QUFBQSxJQUVuQixLQUFLO0FBQUE7QUFJUCxrQkFBZ0IsSUFBSSxNQUNsQixPQUFPLE9BQU8sbUJBQW1CO0FBQUEsSUFDL0IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBO0FBQUEsS0FFWCxnQkFBZ0I7QUFBQSxNQUNmLFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxNQUNkLE9BQU87QUFBQTtBQUFBLE1BR1g7QUFBQSxJQUNFLEtBQUssYUFBYTtBQUFBLElBQ2xCLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFrQjtBQUNoQixhQUFPLGFBQWEsYUFBYSxTQUFTO0FBQUE7QUFBQTtBQUtoRCxTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUE7QUFBQTtBQUFBOzs7QUNoRGhCO0FBS08sb0NBQThCLFdBQVc7QUFBQSxFQUM5QyxZQUFZLFNBQWlCLGdCQUFpQztBQUM1RCxRQUFJLGtCQUFrQixRQUFRLGVBQWUsVUFBVSxVQUFVO0FBQy9ELHFCQUFlLE9BQU87QUFBQTtBQUV4QixVQUFNLFNBQVM7QUFBQTtBQUFBO0FBSVosMkJBQTJCO0FBQ2hDLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNSLFlBQVk7QUFBQTtBQUFBO0FBQUE7OztBQ2RYLHVCQUFpQjtBQUFBLEVBS3RCLFlBQVksV0FBbUIsWUFBcUI7QUFDbEQsU0FBSyxhQUFhO0FBQ2xCLFNBQUssWUFBWTtBQUNqQixTQUFLLFNBQVMsR0FBRywyQkFBMkI7QUFBQTtBQUFBLE1BRzFDLFNBQVM7QUFDWCxXQUFPLEtBQUssVUFBVTtBQUFBO0FBQUEsRUFHaEIsVUFBVTtBQUNoQixXQUFPLE9BQU8sS0FBSyxLQUFLLFlBQVksT0FBTyxDQUFDLFFBQzFDLElBQUksV0FBVyxLQUFLO0FBQUE7QUFBQSxFQUt4QixJQUFJLEdBQVc7QUFDYixVQUFNLE1BQU0sS0FBSyxVQUFVO0FBQzNCLFdBQU8sTUFBTSxJQUFJLFVBQVUsS0FBSyxPQUFPLFVBQVU7QUFBQTtBQUFBLEVBR25ELFFBQVEsU0FBaUI7QUFDdkIsV0FBTyxLQUFLLFdBQVcsUUFBUSxHQUFHLEtBQUssU0FBUztBQUFBO0FBQUEsRUFHbEQsUUFBUSxTQUFpQixVQUFrQjtBQUN6QyxTQUFLLFdBQVcsUUFBUSxHQUFHLEtBQUssU0FBUyxXQUFXO0FBQUE7QUFBQSxFQUd0RCxXQUFXLFNBQWlCO0FBQzFCLFNBQUssV0FBVyxXQUFXLEdBQUcsS0FBSyxTQUFTO0FBQUE7QUFBQSxFQUc5QyxRQUFRO0FBQ04sU0FBSyxVQUFVLFFBQVEsQ0FBQyxRQUFRO0FBQzlCLFdBQUssV0FBVyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBSzFCLDRCQUE0QixTQUFrQjtBQUNuRCxRQUFNLFlBQVksUUFBUSxRQUFRO0FBQ2xDLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNSLGNBQWMsSUFBSSxXQUFXLFdBQVc7QUFBQSxNQUN4QyxnQkFBZ0IsSUFBSSxXQUFXLFdBQVc7QUFBQTtBQUFBO0FBQUE7OztBQ2hEekMsd0JBQXdCLFVBQW1CO0FBQ2hELFFBQU0sWUFBWSxvQkFBSTtBQUN0QixRQUFNLHNCQUFzQixPQUFPO0FBQ25DLFFBQU0seUJBQXlCLE9BQU87QUFFdEMsdUJBRUUsTUFDQSxVQUNBLFNBQ0E7QUFDQSxVQUFNLGVBQWUsVUFBVSxJQUFJLFNBQVM7QUFDNUMsY0FBVSxJQUFJLE1BQU0sQ0FBQyxHQUFHLGNBQWM7QUFHdEMsd0JBQW9CLEtBQ2xCLE1BQ0EsTUFNQSxVQUNBO0FBQUE7QUFJSiwwQkFFRSxNQUNBLFVBQ0EsU0FDQTtBQUNBLFVBQU0sZUFBZSxVQUFVLElBQUksU0FBUztBQUM1QyxVQUFNLE1BQU0sYUFBYSxRQUFRO0FBQ2pDLFFBQUksUUFBUSxJQUFJO0FBQ2QsbUJBQWEsT0FBTyxLQUFLO0FBQUE7QUFFM0IsY0FBVSxJQUFJLE1BQU0sQ0FBQyxHQUFHO0FBQ3hCLDJCQUF1QixLQUFLLE1BQU0sTUFBTSxVQUFVO0FBQUE7QUFHcEQsUUFBTSxVQUFVLE1BQU07QUFDcEIsY0FBVSxRQUFRLENBQUMsVUFBVSxRQUFRO0FBQ25DLGVBQVMsUUFBUSxDQUFDLE9BQU87QUFDdkIsK0JBQXVCLEtBQUssUUFBUSxLQUFLO0FBQUE7QUFBQTtBQUc3QyxjQUFVO0FBQUE7QUFHWixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1Isa0JBQWtCLFlBQVksS0FBSztBQUFBLE1BQ25DLHFCQUFxQixlQUFlLEtBQUs7QUFBQTtBQUFBLElBRTNDLFFBQVEsUUFBMkI7QUFDakMsWUFBTSxlQUFlLGlDQUFRO0FBQzdCLFVBQUksY0FBYztBQUNoQixxQkFBYSxtQkFBbUIsWUFBWSxLQUFLO0FBQ2pELHFCQUFhLHNCQUFzQixlQUFlLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDbEV4RCx3QkFBd0IsVUFBbUI7QUFDaEQsUUFBTSxjQUFjLG9CQUFJO0FBRXhCLHNDQUFvQyxpQkFBaUI7QUFBQSxJQUNuRCxZQUFZLElBQXNCO0FBQ2hDLFlBQU07QUFDTixrQkFBWSxJQUFJO0FBQUE7QUFBQTtBQUlwQixRQUFNLFVBQVUsTUFBTTtBQUNwQixnQkFBWSxRQUFRLENBQUMsYUFBYTtBQUNoQyxVQUFJLE9BQU8sU0FBUyxlQUFlO0FBQVksaUJBQVM7QUFBQTtBQUUxRCxnQkFBWTtBQUFBO0FBR2QsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLGtCQUFrQjtBQUFBO0FBQUE7QUFBQTs7O0FDdEJ4QixJQUFNLGdCQUFnQixPQUFPO0FBQzdCLElBQU0sa0JBQWtCLE9BQU87QUFDL0IsSUFBTSxpQkFBaUIsT0FBTztBQUM5QixJQUFNLG1CQUFtQixPQUFPO0FBRXpCLElBQU0sZ0JBQWdCLE1BQU07QUFDakMsUUFBTSxVQUFVLG9CQUFJO0FBRXBCLFFBQU0sY0FBYSxDQUFDLFNBQXVCLE9BQWdCLFNBQWdCO0FBQ3pFLFVBQU0sWUFBWSxjQUFjLFNBQVMsSUFBSSxHQUFHO0FBQ2hELFlBQVEsSUFBSTtBQUNaLFdBQU87QUFBQTtBQUdULFFBQU0sZUFBZSxDQUFDLGNBQXNCO0FBQzFDLFlBQVEsT0FBTztBQUNmLG9CQUFnQjtBQUFBO0FBR2xCLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFlBQVEsUUFBUSxDQUFDLGNBQWM7QUFDN0Isc0JBQWdCO0FBQUE7QUFBQTtBQUlwQixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0MsSUFBTSxpQkFBaUIsTUFBTTtBQUNsQyxRQUFNLFVBQVUsb0JBQUk7QUFFcEIsUUFBTSxjQUFjLENBQ2xCLFVBQ0EsT0FDRyxTQUNBO0FBQ0gsVUFBTSxhQUFhLGVBQWUsVUFBVSxJQUFJLEdBQUc7QUFDbkQsWUFBUSxJQUFJO0FBQ1osV0FBTztBQUFBO0FBR1QsUUFBTSxnQkFBZ0IsQ0FBQyxlQUF1QjtBQUM1QyxZQUFRLE9BQU87QUFDZixxQkFBaUI7QUFBQTtBQUduQixRQUFNLFVBQVUsTUFBTTtBQUNwQixZQUFRLFFBQVEsQ0FBQyxlQUFlO0FBQzlCLHVCQUFpQjtBQUFBO0FBQUE7QUFJckIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BT0EsY0FBYyxDQUFDLE9BQU8sV0FBVyxJQUFJO0FBQUE7QUFBQTtBQUFBOzs7QUNyRTNDO0FBQ0E7OztBQ0NPLCtCQUErQjtBQUNwQyxNQUFJLE9BQU8sa0JBQWtCO0FBQzNCLFVBQU0sY0FBYyxPQUFPLGlCQUFpQixVQUFVO0FBQ3RELHFCQUFpQixVQUFVLFVBQVUsV0FBWTtBQUMvQyxhQUFPLFlBQVksTUFBTSxNQUFNLGNBQWM7QUFBQTtBQUFBO0FBS2pELFFBQU0sT0FBTyxPQUFPLHlCQUNsQixPQUFPLFNBQVMsV0FDaEI7QUFFRixRQUFNLGNBQWMsUUFBUSxLQUFLO0FBQ2pDLE1BQUksYUFBYTtBQUNmLFdBQU8sZUFBZSxPQUFPLFNBQVMsV0FBVyxpQkFBaUI7QUFBQSxNQUNoRSxPQUFPLE1BQU07QUFDWCxlQUFPLFlBQVksTUFBTSxjQUFjLENBQUMsT0FBTyxJQUFJLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDbkJ6RTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCQSxJQUFNLGlCQUFpQixTQUFRLENBQUMsZ0JBQWdCO0FBRXpDLElBQU0sb0JBQW9CLHVCQUFPLE9BQU87QUFFeEMsaUNBQTJCO0FBQUEsRUFVaEMsWUFBWSxJQUFJLFNBQVMsWUFBWTtBQUg3Qix3QkFBZSxrQkFBa0I7QUFDakMsd0JBQWUsa0JBQWtCO0FBR3ZDLFNBQUssS0FBSztBQUNWLFNBQUssVUFBVTtBQUNmLFNBQUssYUFBYTtBQUNsQixTQUFLLGNBQWMsUUFBUSxZQUFZO0FBQ3ZDLFNBQUssVUFBVSxJQUFJLFFBQVEsUUFBUSxPQUFPO0FBQzFDLFNBQUssVUFBVSxHQUFHLFVBQVUsR0FBRyxRQUFRLGdCQUFnQjtBQUFBO0FBQUEsRUFHakQsR0FBRyxLQUFhO0FBQ3RCLFdBQU8sS0FBSyxZQUFZO0FBQUE7QUFBQSxFQUdsQixtQkFBbUIsSUFBUztBQUNsQyxVQUFNLFVBQVUsS0FBSyxRQUFRLFFBQVE7QUFDckMsUUFBSSxTQUFTO0FBQ1gsWUFBTSxNQUFNLEdBQUcsYUFBYTtBQUM1QixZQUFNLE9BQU8sR0FBRyxhQUFhO0FBQzdCLGFBQVEsSUFBRyxNQUFNLGNBQWEsU0FBUztBQUN2QyxjQUFTLElBQUcsT0FBTyxjQUFhLFNBQVM7QUFDekMsWUFBTSxNQUFNLEdBQUcsT0FBTyxHQUFHO0FBRXpCLFVBQUksT0FBTyxLQUFLLFFBQVEsUUFBUSxlQUFlO0FBQzdDLGFBQUssUUFBUSxRQUFRLGNBQWM7QUFBQSxVQUNqQyxTQUFTLEdBQUc7QUFBQSxVQUNaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLGNBQWMsTUFBYyxTQUEwQjtBQUM1RCxZQUFRLFVBQVUsS0FBSyxNQUFNO0FBQzNCLFlBQU0sVUFBVSxTQUFTO0FBQ3pCLFVBQUk7QUFFSixVQUFJLFdBQVcsU0FBUztBQUN0QixnQkFBUSxJQUFJLFdBQVcsTUFBTSxpQ0FDeEIsVUFEd0I7QUFBQSxVQUUzQixTQUFTLFFBQVEsTUFBTTtBQUFBO0FBQUEsYUFFcEI7QUFDTCxnQkFBUSxJQUFJLE1BQU07QUFBQTtBQUVwQixZQUFNLGdCQUFnQjtBQUN0QixhQUFPLGVBQWUsT0FBTyxVQUFVLEVBQUUsT0FBTyxLQUFLO0FBQ3JELFdBQUssR0FBRyxjQUFjO0FBQ3RCLGlCQUFXLE9BQU8sY0FBYztBQUFBO0FBQUE7QUFBQSxFQUs1QixtQkFBbUIsVUFBaUQ7QUFDMUUsVUFBTSxFQUFFLE1BQU0sU0FBUyxLQUFLO0FBRTVCLFFBQUksQ0FBQyxRQUFRLFVBQVUsRUFBRSxLQUFLLE1BQU0sU0FBUztBQUMzQyxVQUFJLE1BQU07QUFDUixjQUFNLEVBQUUsU0FBUyxXQUFXLGlCQUFpQixLQUFLLFFBQVE7QUFDMUQsY0FBTSxXQUFXLFVBQVUsY0FBYSxTQUFTLFFBQVE7QUFFekQsYUFBSyxRQUFRLE9BQ1YsS0FBbUI7QUFBQSxVQUNsQixPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxvQkFBb0I7QUFBQSxXQUVyQixLQUFLLENBQUMsRUFBRSxpQkFBaUIsbUJBQW1CO0FBQzNDLGNBQUksY0FBYztBQUNoQix5QkFBYTtBQUNiLGdCQUFJLGNBQWM7QUFDaEIsMkJBQWEsU0FBUztBQUFBLGdCQUNwQixTQUFTO0FBQUEsZ0JBQ1QsVUFBVTtBQUFBO0FBQUE7QUFHZCxxQkFBUyxhQUFhO0FBQUEsaUJBQ2pCO0FBQ0wsa0JBQ0UsMEJBQTBCLFdBQVc7QUFBQTtBQUd6QyxlQUFLLGNBQWM7QUFBQSxXQUVwQixNQUFNLENBQUMsTUFBTTtBQUNaLFVBQUMsUUFBTyxZQUFZLGVBQWUsUUFBUSxPQUFPLFFBQVEsSUFBSSxXQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWdCLFVBQVUsTUFBSztBQUNsSSxlQUFLLGNBQWMsU0FBUztBQUFBLFlBQzFCLE9BQU87QUFBQSxZQUNQLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUliO0FBQ0wsVUFBSyxPQUFPLFlBQVksZUFBZSxRQUFRLE9BQU8sUUFBUSxJQUFJLFdBQVksUUFBUSxJQUFJLGFBQWEsZUFBZ0IsT0FBUTtBQUM3SCxjQUFLLDBCQUEwQixXQUFXO0FBQUE7QUFBQTtBQUk5QyxVQUFNLGtCQUFrQixLQUFLLFFBQVEsc0JBQXNCO0FBQzNELFNBQUssR0FBRyxtQkFBbUIsTUFDekIsS0FBSyxRQUFRLGNBQWM7QUFDN0IsV0FBTztBQUFBO0FBQUEsRUFJRCx1QkFBdUI7QUFDN0IsVUFBTSxFQUFFLEtBQUssTUFBTSxnQkFBZ0IsS0FBSztBQUN4QyxVQUFNLFlBQVcsU0FBUztBQUMxQixVQUFNLE9BQU8sS0FBSyxHQUFHLGVBQWUsS0FBSyxHQUFHLFFBQVE7QUFFcEQsUUFBSSxDQUFDLFFBQVEsU0FBUyxFQUFFLEtBQUssU0FBUztBQUVwQyxZQUFNLEVBQUUsU0FBUyxjQUFjLEtBQUssUUFBUTtBQUM1QyxVQUFJLEtBQUs7QUFDUCxjQUFNLFdBQVcsVUFBVSxjQUFhLFNBQVMsT0FBTztBQUN4RCxhQUFLLFFBQVEsT0FDVixLQUF3QjtBQUFBLFVBQ3ZCLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMO0FBQUEsVUFDQSxvQkFBb0I7QUFBQSxXQUVyQixLQUNDLENBQUMsWUFBWTtBQUNYLGNBQUksUUFBUSxpQkFBaUI7QUFDM0Isa0JBQU07QUFBQSxjQUNKLGlCQUFpQixFQUFFLEtBQUs7QUFBQSxnQkFDdEI7QUFFSixpQkFBSyxRQUFRLFdBQVcsWUFBWSxJQUFJLEtBQUs7QUFBQSxjQUMzQztBQUFBLGNBQ0EsU0FBUztBQUFBLGNBQ1QsY0FBYyxLQUFLO0FBQUE7QUFBQSxpQkFFaEI7QUFDTCxrQkFDRSwwQkFBMEIsV0FBVztBQUFBO0FBR3pDLGVBQUssY0FBYztBQUFBLFdBRXJCLENBQUMsTUFBTTtBQUNMLFVBQUMsUUFBTyxZQUFZLGVBQWUsUUFBUSxPQUFPLFFBQVEsSUFBSSxXQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWdCLFVBQVUsTUFBSztBQUNsSSxlQUFLLGNBQWMsU0FBUztBQUFBLFlBQzFCLE9BQU87QUFBQSxZQUNQLFVBQVU7QUFBQTtBQUFBO0FBQUEsaUJBSVQsTUFBTTtBQUNmLGFBQUssUUFBUSxXQUFXLE1BQU0sSUFBSSxTQUFTLEVBQUUsU0FBUyxNQUFNLGNBQWMsS0FBSztBQUFBO0FBR2pGLFlBQU0sb0JBQW9CLEtBQUssUUFBUSx3QkFBd0I7QUFBQSxRQUM3RDtBQUFBLFFBQ0E7QUFBQTtBQUVGLFdBQUssR0FBRyxtQkFBbUIsTUFDekIsS0FBSyxRQUFRLGNBQWM7QUFDN0IsYUFBTztBQUFBO0FBRVQsV0FBTyxLQUFLO0FBQUE7QUFBQSxFQUlOLDJCQUEyQjtBQUNqQyxRQUFJLEtBQUssR0FBRztBQUFZO0FBRXhCLFVBQU0sVUFBVSxJQUFJLGlCQUFpQixDQUFDLGNBQWM7QUF6TXhEO0FBME1NLFVBQUksS0FBSyxHQUFHO0FBQVk7QUFDeEIsaUJBQVcsRUFBRSxNQUFNLG1CQUFtQixXQUFXO0FBQy9DLFlBQUksU0FBUyxjQUFjO0FBQ3pCLGNBQUksa0JBQWtCLFNBQVMsa0JBQWtCLGNBQWM7QUFDN0QsZ0JBQUksS0FBSyxHQUFHO0FBQVk7QUFDeEIsZ0JBQUksS0FBSyxHQUFHLFFBQVEsZ0JBQWdCLEtBQUssR0FBRyxNQUFNO0FBQ2hELG1CQUFLLEdBQUcsV0FBVyxLQUFLLEdBQUcsYUFBYTtBQUN4QyxvQkFBTSxjQUFjLEtBQUssbUJBQW1CLENBQUMsY0FBYztBQWpOekU7QUFrTmdCLG1DQUFZLGVBQVosb0JBQXdCLGFBQWEsV0FBVztBQUFBO0FBRWxELHlCQUFLLEdBQUcsZUFBUixtQkFBb0IsYUFBYSxhQUFhLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzdELFlBQVEsUUFBUSxLQUFLLElBQUksRUFBRSxZQUFZO0FBQUE7QUFBQSxFQUdqQyx3QkFBd0I7QUFDOUIsVUFBTSxFQUFFLFNBQVMsV0FBVyxpQkFBaUIsS0FBSyxRQUFRO0FBQzFELFVBQU0sV0FBVztBQUVqQixVQUFNLGtCQUFrQixDQUFDLGNBQTZCO0FBQ3BELFVBQUksV0FBVztBQUNiLGNBQU0sVUFBVSxJQUFJLGFBQWE7QUFDakMsZ0JBQVEsWUFBWTtBQUNwQixZQUFJLFVBQVU7QUFDWixrQkFBUSxTQUFTO0FBQUEsWUFDZjtBQUFBLFlBQ0EsU0FBUztBQUFBO0FBQUE7QUFHYixvQkFBWSxRQUFRLGNBQWM7QUFBQTtBQUVwQyxhQUFPO0FBQUE7QUFHVCxVQUFNLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjO0FBQ2xELGlCQUFXLEVBQUUsTUFBTSxRQUFRLGdCQUFnQixXQUFXO0FBQ3BELFlBQUksU0FBUyxhQUFhO0FBQ3hCLGdCQUFNLEtBQUs7QUFDWCxjQUFJLHVCQUF1QixPQUFPLEdBQUcsT0FBTztBQUMxQyxrQkFBTSxnQkFBZ0IsR0FBRyxNQUFNO0FBQy9CLGVBQUcsTUFBTSxhQUFhLFdBQVk7QUFDaEMsd0JBQVUsS0FBSyxnQkFBZ0IsVUFBVTtBQUN6QyxxQkFBTyxjQUFjLE1BQU0sTUFBTTtBQUFBO0FBQUEsaUJBRTlCO0FBQ0wsZ0JBQUksV0FBVyxJQUFJO0FBQ2pCLHlCQUFXLEdBQUcsY0FBYyxnQkFDMUIsV0FBVyxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU8xQixZQUFRLFFBQVEsS0FBSyxJQUFJLEVBQUUsV0FBVztBQUFBO0FBQUEsRUFHaEMsb0JBQW9CLFlBQXFCLGVBQXdCO0FBQ3ZFLFFBQUksZUFBZSxTQUFTLE1BQU07QUFDaEMsYUFBTyxZQUFXLEtBQUssYUFBYTtBQUFBLFFBQ2xDO0FBQUEsUUFDQSxPQUFPO0FBQUE7QUFBQSxlQUVBLGVBQWUsU0FBUyxNQUFNO0FBQ3ZDLGFBQU8sWUFBVyxLQUFLLGFBQWE7QUFBQSxRQUNsQztBQUFBLFFBQ0EsT0FBTztBQUFBO0FBQUE7QUFNWCxRQUNFLEtBQUssWUFBWSxTQUFTLGVBQzFCLENBQUMsU0FBUyxTQUFTLGFBQ25CO0FBQ0EsYUFBTztBQUFBO0FBR1QsUUFBSSxrQkFBa0IsUUFBUTtBQUM1QixhQUFPLFlBQVcsS0FBSyxhQUFhO0FBQUEsUUFDbEM7QUFBQSxRQUNBLE9BQU87QUFBQTtBQUFBLGVBRUEsa0JBQWtCLFFBQVE7QUFDbkMsYUFBTyxZQUFXLEtBQUssYUFBYTtBQUFBLFFBQ2xDO0FBQUEsUUFDQSxPQUFPO0FBQUE7QUFBQTtBQUdYLFdBQU87QUFBQTtBQUFBLEVBR1QsT0FBTyxTQUFrQixNQUFrQixlQUF5QjtBQTVTdEU7QUE2U0ksUUFBSTtBQUNKLFFBQUksYUFBYTtBQUNqQixVQUFNLEVBQUUsU0FBUyxXQUFXLGlCQUFpQixLQUFLLFFBQVE7QUFHMUQsUUFBSSxlQUFlLFNBQVMsS0FBSyxVQUFVO0FBQ3pDLFdBQUssbUJBQW1CLEtBQUs7QUFBQTtBQUkvQixRQUFJLEtBQUssR0FBRyxXQUFXO0FBQ3JCLG1CQUFhLEtBQUssb0JBQW9CLFNBQVM7QUFDL0Msc0JBQWdCLEtBQUs7QUFBQSxlQUdkLEtBQUssR0FBRyxVQUFVO0FBQ3pCLG1CQUFhLEtBQUssb0JBQW9CLFNBQVM7QUFDL0MsWUFBTSxVQUFVLElBQUksYUFBYSxLQUFLLEdBQUc7QUFDekMsY0FBUSxZQUFZO0FBQ3BCLFVBQUksY0FBYztBQUNoQixnQkFBUSxTQUFTO0FBQUEsVUFDZixTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUE7QUFBQTtBQUdkLFdBQUssR0FBRyxjQUFjLFFBQVEsY0FBYyxRQUFRO0FBQ3BELHNCQUFnQixLQUFLO0FBQ3JCLFdBQUssUUFBUSw0QkFBNEIsSUFBSSxLQUFLO0FBQ2xELFdBQUs7QUFBQSxlQUdFLEtBQUssR0FBRyxTQUFTO0FBQ3hCLG1CQUFhLEtBQUssb0JBQW9CLFNBQVM7QUFDL0MsVUFBSSxLQUFLLEdBQUcsUUFBUSxnQkFBZ0IsS0FBSyxHQUFHLE1BQU07QUFDaEQsd0JBQWdCLEtBQUssbUJBQW1CLENBQUMsY0FDdkMsS0FBSyxhQUFhLEtBQUssWUFBWTtBQUFBLGFBRWhDO0FBQ0wsd0JBQWdCLEtBQUs7QUFDckIsYUFBSztBQUFBO0FBQUE7QUFLVCxRQUNFLENBQUMsS0FBSyxZQUFZLFNBQVMsZUFDM0IsU0FBUyxTQUFTLGFBQ2xCO0FBQ0EsVUFBSSxlQUFlLEtBQUssYUFBYTtBQUNuQyxhQUFLLFFBQVEsa0JBQWtCLElBQUksTUFBTTtBQUN2QyxlQUFLLFFBQVEsY0FBYyxLQUFLO0FBQ2hDLGlCQUFPLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFNbEIsUUFBSSxLQUFLLE1BQU0sS0FBSyxHQUFHLGtCQUFrQjtBQUN2QyxVQUFJLGFBQWEsS0FBSyxHQUFHLGlCQUFpQjtBQUMxQyxVQUFJLFdBQVcsU0FBUyxHQUFHO0FBQ3pCLG1CQUFXLFFBQVEsQ0FBQyxRQUFNO0FBQ3hCLHNCQUFZLE1BQUssS0FBSyxtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFNL0MsUUFBSSxLQUFLLEdBQUcsYUFBYSxPQUFPLEtBQUssR0FBRyxXQUFXLFlBQVk7QUFDN0QsWUFBTSxFQUFFLElBQUksWUFBWTtBQUN4QixZQUFNLGVBQWUsR0FBRztBQUN4QixTQUFHLFNBQVMsV0FBWTtBQUN0QixvQkFBWSxNQUFNLElBQUksR0FBRyxlQUFlLFVBQVUsUUFBUTtBQUMxRCxlQUFPLGFBQWEsTUFBTSxNQUFNO0FBQUE7QUFBQTtBQUlwQyxRQUFJLGVBQWU7QUFFakIsVUFDRSxlQUFlLEtBQUssZUFDcEIsS0FBSyxZQUFZLFNBQVMsWUFDMUIsWUFBSyxPQUFMLG1CQUFTLGdCQUFlLFNBQ3hCO0FBQ0EsZUFBTztBQUFBO0FBSVQsV0FBSyxRQUFRLE1BQU0sVUFBVSxXQUFXLEtBQ3RDLFlBQ0EsS0FBSyxJQUNMLGVBQ0EsS0FBSztBQUVQLGFBQU8sS0FBSyxhQUFhLEtBQUssWUFBWTtBQUFBO0FBRTVDLFdBQU87QUFBQTtBQUFBLEVBR1QsWUFBWSxTQUFrQixlQUF5QjtBQUVyRCxRQUFJLE9BQU8sS0FBSyxHQUFHLHFCQUFxQixZQUFZO0FBQ2xELFdBQUssR0FBRztBQUNSLGFBQU8sS0FBSztBQUFBO0FBR2QsUUFBSSxLQUFLLEdBQUcsWUFBWSxLQUFLLEdBQUcsV0FBVyxLQUFLLEdBQUcsV0FBVztBQUM1RCxZQUFNLGFBQWEsS0FBSyxvQkFDdEIsU0FDQSxLQUFLLEdBQUcsWUFBWSxTQUFTO0FBRy9CLFVBQUksS0FBSyxHQUFHLGVBQWUsWUFBWTtBQUNyQyxZQUFJLEtBQUssUUFBUSw0QkFBNEIsSUFBSSxLQUFLLEtBQUs7QUFDekQsZUFBSyxRQUFRLDRCQUE0QixPQUFPLEtBQUs7QUFBQTtBQUV2RCxlQUFPLEtBQUssYUFBYSxLQUFLLFlBQVksS0FBSztBQUFBO0FBQUE7QUFHbkQsV0FBTztBQUFBO0FBQUE7OztBRjNaWCxJQUFNLHNCQUFzQjtBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFFRixJQUFNLDRCQUE0QixDQUFDO0FBRW5DLElBQU0sMEJBQTBCLFNBQVE7QUFBQSxFQUN0QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUdGLGtCQUFrQixTQUFtQixZQUFvQjtBQUN2RCxTQUFPLFdBQXlCO0FBekJsQztBQTJCSSxVQUFNLEtBQUssZUFBZSwwQkFDdEIsVUFBVSxLQUNWLFVBQVU7QUFDZCxVQUFNLFVBQVUsV0FBVyxJQUFJO0FBQy9CLFVBQU0sZ0JBQWdCLE1BQU0sUUFBUSxNQUFNLE1BQU07QUFFaEQsUUFBSSxTQUFTO0FBQ1gsVUFBSSxNQUFNLG9DQUFNLFlBQU4sbUJBQWUsbUJBQWtCLFNBQVM7QUFDbEQsY0FBTSxVQUFVLElBQUksY0FBYSxHQUFHO0FBQ3BDLGNBQU0sRUFBRSxTQUFTLFdBQVcsaUJBQWlCLFFBQVE7QUFDckQsZ0JBQVEsWUFBWTtBQUNwQixnQkFBUSxTQUFTO0FBQUEsVUFDZixTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUE7QUFFWixXQUFHLGNBQWMsUUFBUSxjQUFjLFFBQVE7QUFDL0MsZUFBTztBQUFBLGFBQ0Y7QUFDTCxjQUFNLFlBQVksSUFBSSxxQkFBcUIsSUFBSSxTQUFTO0FBQ3hELGVBQU8sVUFBVSxPQUFPLE1BQU0sV0FBVztBQUFBO0FBQUE7QUFNN0MsaUJBQVksTUFBTTtBQUNoQixVQUFJLHdCQUF3QixHQUFHO0FBQVU7QUFDekMsVUFDRSwwQkFBSSxpQkFDSixPQUFPLDBCQUFJLGtCQUFpQixjQUM1QixDQUFDLDBCQUFJLGFBQWEsbUJBQ2xCO0FBQ0EsaUNBQUksYUFDRixpQkFDQSxVQUNJLEdBQUksUUFBZ0IsUUFBUSw2QkFDNUI7QUFBQTtBQUFBO0FBS1YsUUFBSSxTQUFTO0FBQ1gsWUFBTSxZQUFZLElBQUkscUJBQXFCLElBQUksU0FBUztBQUN4RCxhQUFPLFVBQVUsT0FBTyxNQUFNLFdBQVc7QUFBQSxXQUNwQztBQUNMLGFBQU87QUFBQTtBQUFBO0FBQUE7QUFLYiw2QkFBNkIsU0FBbUIsWUFBb0I7QUFDbEUsU0FBTyxXQUF5QjtBQUM5QixVQUFNLEtBQUssVUFBVTtBQUNyQixVQUFNLFVBQVUsTUFBTSxXQUFXLElBQUk7QUFDckMsVUFBTSxnQkFBZ0IsTUFBTTtBQUcxQixhQUFPLFFBQVEsTUFBTSxNQUFNO0FBQUE7QUFHN0IsUUFBSSxTQUFTO0FBQ1gsWUFBTSxZQUFZLElBQUkscUJBQXFCLElBQUksU0FBUztBQUN4RCxhQUFPLFVBQVUsWUFBWSxNQUFNO0FBQUE7QUFFckMsV0FBTztBQUFBO0FBQUE7QUFLWCwrQkFBK0I7QUFDN0IsU0FBTyxlQUFlLE9BQU8sUUFBUSxXQUFXLGlCQUFpQjtBQUFBLElBQy9ELE1BQU07QUFDSixZQUFNLFVBQVUsUUFBUSxXQUFXLElBQUk7QUFDdkMsWUFBTSxZQUFZLFFBQVEsSUFDeEIsT0FBTyxLQUFLLFdBQ1osaUJBQ0E7QUFFRixhQUFPLFVBQVUsUUFBUSxPQUFPLFdBQVc7QUFBQTtBQUFBLElBRTdDLE1BQU07QUFDSixNQUFDLFFBQU8sWUFBWSxlQUFlLFFBQVEsT0FBTyxRQUFRLElBQUksV0FBWSxRQUFRLElBQUksYUFBYSxlQUFnQixVQUFVLE1BQUs7QUFBQTtBQUFBO0FBQUE7QUFLakksd0JBQXdCLGVBQStCO0FBQzVELE1BQUssZUFBdUI7QUFBVztBQUN2QyxFQUFDLGVBQXVCLFlBQVk7QUFFcEMsTUFBSSxPQUFPLE9BQU8sWUFBWSxZQUFZO0FBRXhDLFFBQUksY0FBYztBQUFZLG1CQUFZLE1BQUs7QUFDL0MsVUFBTSxVQUFVLENBQ2QsU0FDQSxZQUNHO0FBQ0gsaUJBQVcsUUFBUSxTQUFTO0FBQzFCLGNBQU0sS0FBSyxPQUFPLFFBQVEsVUFBVTtBQUNwQyxZQUFJLE9BQU8sT0FBTyxjQUFjLEdBQUcsaUJBQWlCO0FBQ2xEO0FBQUE7QUFFRiwwQkFBa0IsUUFBUTtBQUMxQixjQUFNLFVBQVUsUUFBUSxJQUFJO0FBQzVCLGdCQUFRLGtCQUFrQjtBQUMxQixlQUFPLFFBQVEsVUFBVSxRQUFRO0FBQUE7QUFBQTtBQUdyQyxZQUFRLHFCQUFxQjtBQUM3QixZQUFRLDJCQUEyQjtBQUFBO0FBR3JDO0FBQUE7QUFHSyx1Q0FDTCw2QkFDQSw0QkFDQTtBQUNBLDhCQUE0QixRQUFRLENBQUMsaUJBQWlCO0FBQ3BELFFBQUksdUJBQXVCLGlCQUFpQixhQUFhLE9BQU87QUFDOUQsaUNBQTJCLElBQUksY0FBYyxhQUFhLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFLL0QseUJBQ0wsNkJBQ0EsNEJBQ0E7QUFDQSw4QkFBNEIsUUFBUSxDQUFDLGlCQUFpQjtBQTdKeEQ7QUE4SkksVUFBTSxXQUFXLDJCQUEyQixJQUFJO0FBQ2hELFFBQUksWUFBYSx3QkFBdUIsaUJBQWlCLFNBQVMsU0FBUztBQUN6RSxlQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLO0FBQ3hDLGNBQU0sVUFBVSxTQUFTO0FBRXpCLDJCQUFhLFVBQWIsbUJBQW9CLFdBQ2xCLFFBQVEsU0FDUixtQkFBYSxVQUFiLG1CQUFvQixTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBR3JLdkM7QUFZTyw0QkFBNEI7QUFDakMsU0FBTyxJQUFJLGFBQWE7QUFBQSxJQUN0QixRQUFRLElBQUk7QUFBQSxJQUNaLFFBQVEsSUFBSTtBQUFBLElBQ1osWUFBWSxJQUFJO0FBQUEsSUFDaEIsZ0JBQWdCLElBQUksa0JBQXNDO0FBQUEsSUFDMUQsbUJBQW1CLElBQUk7QUFBQSxJQUN2QixrQkFBa0IsSUFBSTtBQUFBLElBQ3RCLGNBQWMsSUFBSTtBQUFBLElBU2xCLGFBQWEsSUFBSTtBQUFBLElBU2pCLGFBQWEsSUFBSTtBQUFBO0FBQUE7OztBQ3RDckI7QUFZTyx1QkFBc0IsU0FBa0I7QUFDN0MsU0FBTyxDQUFDLFFBQWdCLEdBQWdCLGFBQWtCO0FBQ3hELFFBQUksTUFBTSxPQUFPO0FBQWEsYUFBTztBQUNyQyxRQUFJO0FBQ0osVUFBTSxFQUFFLGlCQUFpQixRQUFRO0FBRWpDLFFBQUksUUFBUSxrQkFBa0IsSUFBSTtBQUVoQyxhQUFPLFFBQVEsSUFBSSxRQUFRO0FBQUEsZUFDbEIsUUFBUSxxQkFBcUIsSUFBSTtBQUMxQyxjQUFRLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFBQSxXQUMxQjtBQUNMLGNBQVEsUUFBTyxRQUFRLEtBQ25CLFFBQVEsSUFBSSxRQUFRLEdBQUcsWUFDdkIsUUFBUSxJQUFJLFFBQVE7QUFBQTtBQUcxQixRQUFJLE9BQU8sVUFBVSxZQUFZO0FBTy9CLFVBQ0Usa0JBQWtCLE1BQ2xCLG9CQUFvQixNQUNwQixRQUFPLGNBQWMsTUFDckIsY0FBYyxVQUNkLFFBQVEseUJBQXlCLElBQUksSUFDckM7QUFDQSxlQUFPO0FBQUE7QUFBQSxXQUVKO0FBQ0wsYUFBTztBQUFBO0FBR1QsVUFBTSxXQUFXLFFBQU8sT0FBTyxrQkFDM0IsTUFBTSxrQkFDTixLQUFLLE9BQU87QUFDaEIsVUFBTSxlQUFlLHVCQUF1QixRQUFRLEdBQUc7QUFDdkQsUUFBSSxlQUFlLEdBQUc7QUFDcEIsVUFBSSxpQkFBaUI7QUFBRyxlQUFPO0FBQy9CLFVBQUksaUJBQWlCO0FBQUcsZUFBTztBQUFBO0FBRWpDLFVBQU0sa0JBQWtCO0FBQ3hCLFdBQU87QUFBQTtBQUFBO0FBSVgsSUFBTSwrQkFBK0I7QUFHOUIsdUJBQXNCLFNBQWtCO0FBQzdDLFNBQU8sQ0FBQyxRQUFnQixHQUFnQixPQUFnQixhQUFrQjtBQUN4RSxVQUFNLGVBQWUsdUJBRW5CLFFBQVEsa0JBQWtCLEtBQ3RCLFNBQ0EsV0FDRSxXQUNBLFFBQ04sR0FDQTtBQUlGLFFBQUksZUFBZSxHQUFHO0FBQ3BCLFVBQUksaUJBQWlCLEtBQUssaUJBQWlCO0FBQUcsZUFBTztBQUNyRCxVQUFJLGlCQUFpQjtBQUFHLGVBQU87QUFBQTtBQUdqQyxRQUFJLFFBQVEsa0JBQWtCLElBQUk7QUFDaEMsYUFBTyxRQUFRLElBQUksUUFBUSxHQUFHO0FBQUEsV0FDekI7QUFFTCxtQ0FBNkI7QUFDN0IsWUFBTSxVQUFVLFFBQVEsSUFBSSxRQUFRLEdBQUcsT0FBTztBQUM5QyxVQUFJLFNBQVM7QUFDWCxZQUFJLFFBQVEsY0FBYztBQUN4QixrQkFBUSx5QkFBeUIsSUFBSTtBQUFBO0FBSXZDLFlBQUksUUFBUSxRQUFRO0FBQ2xCLGdCQUFNLFVBQVUsUUFBUSxPQUFPLEdBQUc7QUFDbEMsY0FBSSxNQUFNLFFBQVEsVUFBVTtBQUMxQixnQkFBSSxRQUFRLFNBQVMsSUFBSTtBQUN2QixvQkFBTSxjQUNKLFFBQVEsT0FBTyxHQUFHO0FBQ3BCLDBCQUFZLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSzFDLGFBQU87QUFBQTtBQUFBO0FBQUE7QUFNTiwrQkFBOEIsU0FBa0I7QUFDckQsU0FBTyxDQUFDLFFBQWdCLEdBQWdCLGVBQW1DO0FBQ3pFLGlDQUE2QixpQkFBaUI7QUFFOUMsUUFBSSxRQUFRLGtCQUFrQixJQUFJO0FBQ2hDLGFBQU8sUUFBUSxlQUFlLFFBQVEsR0FBRztBQUFBLFdBQ3BDO0FBQ0wsWUFBTSxVQUFVLFFBQVEsZUFBZSxRQUFRLEdBQUc7QUFDbEQsVUFBSSxRQUFRLGdCQUFnQixTQUFTO0FBQ25DLGdCQUFRLHlCQUF5QixJQUFJO0FBQUE7QUFFdkMsYUFBTztBQUFBO0FBQUE7QUFBQTtBQU1OLDhCQUE4QixTQUFrQjtBQUNyRCxTQUFPLENBQUMsUUFBZ0IsTUFBbUI7QUFDekMsUUFBSSxRQUFPLFFBQVEsSUFBSTtBQUNyQixhQUFPLE9BQU87QUFDZCxVQUFJLFFBQVEsZ0JBQWdCLFFBQVEseUJBQXlCLElBQUksSUFBSTtBQUNuRSxnQkFBUSx5QkFBeUIsT0FBTztBQUFBO0FBQUEsZUFFaEMsT0FBTyxZQUFZLGVBQWUsUUFBUSxPQUFPLFFBQVEsSUFBSSxXQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWdCLE9BQVE7QUFDcEksVUFBSSxRQUFPLFFBQVEsTUFBTSxRQUFRLGtCQUFrQixJQUFJO0FBQ3JELGNBQUssUUFBUSxPQUFPO0FBQUE7QUFBQTtBQUd4QixXQUFPO0FBQUE7QUFBQTtBQUtKLG9CQUFtQixTQUFrQjtBQUMxQyxTQUFPLENBQUMsU0FBaUIsTUFBbUI7QUFDMUMsUUFBSSxRQUFRLGtCQUFrQjtBQUFJLGFBQU87QUFDekMsUUFBSyxRQUFnQixnQkFBZ0I7QUFBRyxhQUFPO0FBQy9DLFdBQU87QUFBQTtBQUFBOzs7QWpCckhYLElBQUksS0FBSztBQUNULElBQU0saUJBQWdDO0FBQUEsRUFDcEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBO0FBR0YsSUFBTSxXQUFXLENBQUMsV0FBbUI7QUFDbkMsU0FBTyxVQUFTLFVBQ1osT0FBTyx1QkFBOEIsU0FDckM7QUFBQTtBQUdOLElBQU0scUJBQXFCLENBQUMsUUFBZ0IsaUJBQXlCO0FBQ25FLE1BQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIsV0FBTyxxQkFBNEI7QUFBQTtBQUVyQyxTQUFPO0FBQUE7QUFHRixvQkFBYztBQUFBLEVBd0JuQixZQUFZLFNBQXlCO0FBdkI5QixjQUFLO0FBQ0wsZ0JBQU87QUFDUCxrQkFBUztBQUNULHdCQUFlO0FBQ2YsbUJBQVU7QUFJVixpQkFBUTtBQUVSLDZCQUFxQyxvQkFBSTtBQUN6QyxvQ0FBNkMsb0JBQUk7QUFHakQsdUNBQThCLG9CQUFJO0FBQ2xDLHNDQUE2QixvQkFBSTtBQUtoQyx3QkFBZTtBQUNmLHVCQUFjO0FBSXBCLFVBQU0saUJBQWlDO0FBQUEsTUFDckMsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsSUFBSSxNQUFNO0FBQUEsTUFDVixjQUFjLE1BQU07QUFBQSxNQUNwQixpQkFBaUIsTUFBTTtBQUFBLE1BQ3ZCLG9CQUFvQixNQUFNO0FBQUE7QUFFNUIsU0FBSyxVQUFVLGNBQWMsV0FDekIsVUFBVSxnQkFBZ0IsV0FDMUI7QUFFSixVQUFNLEVBQUUsZUFBZSxpQkFBaUIsdUJBQXVCLEtBQUs7QUFDcEUsU0FBSyxTQUFTLElBQUksT0FBTztBQUN6QixTQUFLLG9CQUFvQixTQUFRLDBEQUF1QjtBQUN4RCxTQUFLLHVCQUF1QixTQUFRLGdFQUEwQjtBQUU5RCxTQUFLLHlCQUF5QjtBQUFBLE1BQzVCLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUdoQixtQkFBZSxLQUFLO0FBRXBCLFNBQUs7QUFDTCxlQUFXLElBQUk7QUFBQTtBQUFBLEVBR2pCLFFBQVE7QUFDTixTQUFLLFNBQVM7QUFDZCxTQUFLLHlCQUF5QixLQUFLO0FBQ25DLFVBQU0sRUFBRSxhQUFhLGlCQUFpQixLQUFLO0FBQzNDLFNBQUssU0FBUyxLQUFLLGtCQUFrQixPQUFPLEtBQUs7QUFFakQsUUFBSSxnQkFBZ0IsS0FBSyxRQUFRO0FBQy9CLGlCQUFXLE9BQU8sY0FBYztBQUM5QixhQUFLLE9BQU8sT0FBTyxhQUFhO0FBQUE7QUFBQTtBQUdwQyxRQUFJLGFBQWE7QUFDZixrQkFBWSxRQUFRLENBQUMsT0FBTyxNQUFNLEdBQUcsS0FBSztBQUFBO0FBRTVDLFFBQUksQ0FBQyxLQUFLLFFBQVEsYUFBYTtBQUM3QixXQUFLLGVBQWUsS0FBSztBQUFBO0FBRTNCLFNBQUssZUFBZTtBQUNwQixTQUFLLE1BQU0sVUFBVSxPQUFPLEtBQUssS0FBSztBQUFBO0FBQUEsRUFHeEMsUUFBUTtBQUNOLFFBQUksS0FBSztBQUFRO0FBQ2pCLFNBQUs7QUFDTCxTQUFLLFNBQVM7QUFDZCxTQUFLLFNBQVM7QUFDZCxTQUFLLGVBQWU7QUFDcEIsU0FBSyxlQUFlO0FBQ3BCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUsseUJBQXlCO0FBQzlCLFNBQUssNEJBQTRCO0FBQ2pDLFNBQUssdUJBQXVCLGNBQWM7QUFDMUMsU0FBSyx1QkFBdUIsY0FBYztBQUMxQyxTQUFLLHVCQUF1QixjQUFjO0FBQzFDLFNBQUssdUJBQXVCLGVBQWU7QUFDM0MsU0FBSyxNQUFNLFVBQVUsT0FBTztBQUFBO0FBQUEsRUFHOUIsUUFBUTtBQUNOLFNBQUs7QUFDTCxTQUFLO0FBQUE7QUFBQSxFQUdQLGtCQUFrQixhQUE0QixJQUFJO0FBQ2hELFVBQU0sYUFBYSxpQkFDakIsUUFDQSxLQUFLLHNCQUNMLFNBQVE7QUFHVixVQUFNLGVBQWU7QUFBQSxNQUNuQixLQUFLLGNBQWE7QUFBQSxNQUNsQixLQUFLLGNBQWE7QUFBQSxNQUNsQixnQkFBZ0Isc0JBQXFCO0FBQUEsTUFDckMsZ0JBQWdCLHFCQUFxQjtBQUFBLE1BQ3JDLGlCQUFpQjtBQUNmLGVBQU8sT0FBTyxlQUFlO0FBQUE7QUFBQTtBQUlqQyxVQUFNLGlCQUFpQixpQ0FDbEIsZUFEa0I7QUFBQSxNQUVyQixLQUFLLFdBQVU7QUFBQSxNQUNmLGlCQUFpQjtBQUNmLGVBQU8sT0FBTyxlQUFlO0FBQUE7QUFBQTtBQUtqQyxVQUFNLFFBQVEsSUFBSSxNQUFNLFlBQVk7QUFDcEMsVUFBTSxXQUFXLElBQUksTUFBTSxZQUFZO0FBRXZDLFVBQU0sT0FBTztBQUNiLFVBQU0sU0FBUztBQUNmLFVBQU0sYUFBYTtBQUNuQixVQUFNLG9CQUFvQjtBQUMxQixpQkFBWSxNQUFNO0FBRWhCLFlBQU0sTUFBTSxPQUFPLFFBQVEsU0FBUyxXQUFXLE9BQU87QUFDdEQsWUFBTSxTQUFTLE9BQU8sV0FBVyxTQUFTLFdBQVcsT0FBTztBQUFBO0FBRzlELHVCQUFtQixPQUFPO0FBQzFCLFdBQU87QUFBQTtBQUFBLEVBR1QsZ0JBQWdCO0FBOU1sQjtBQStNSSxVQUFNLGNBQWlDO0FBQ3ZDLFVBQU0sY0FBNEQ7QUFDbEUsVUFBTSxjQUFpQztBQUN2QyxVQUFNLGVBQWU7QUFDckIsVUFBTSxhQUFhLGVBQWUsT0FBTyxXQUFLLFFBQVEsWUFBYixZQUF3QjtBQUVqRSxlQUFXLFVBQVUsWUFBWTtBQUMvQixVQUFJLE9BQU8sV0FBVyxZQUFZO0FBQ2hDLGNBQU0sRUFBRSxTQUFTLFVBQVUsU0FBUyxZQUFZLE9BQU8sU0FBUztBQUNoRSxZQUFJO0FBQVMsc0JBQVksS0FBSztBQUM5QixZQUFJO0FBQVMsc0JBQVksS0FBSztBQUM5QixZQUFJO0FBQVMsc0JBQVksS0FBSztBQUM5QixZQUFJLFVBQVU7QUFFWixxQkFBVyxPQUFPLFVBQVU7QUFDMUIsZ0JBQUssUUFBTyxZQUFZLGVBQWUsUUFBUSxPQUFPLFFBQVEsSUFBSSxXQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWdCLFVBQVUsYUFBYSxNQUFNO0FBQ2xKLG9CQUFLLElBQUk7QUFBQTtBQUVYLHlCQUFhLE9BQU8sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS3JDLFdBQU8sRUFBRSxhQUFhLGFBQWEsY0FBYztBQUFBO0FBQUEsRUFHbkQsZUFBZTtBQUNiLFNBQUssTUFBTSxVQUFVLGtCQUFrQjtBQUN2QyxTQUFLLHVCQUF1QixZQUFZLFFBQVEsQ0FBQyxPQUFPLE1BQU07QUFFOUQsU0FBSyxrQkFBa0IsUUFBUSxDQUFDLE9BQU8sTUFBTTtBQUM3QyxTQUFLLE1BQU0sVUFBVSxpQkFBaUI7QUFBQTtBQUFBLEVBR3hDLHFCQUFxQixjQUE2QixJQUFJO0FBQ3BELFFBQUksT0FBTztBQUNYLFVBQU0sVUFBVSxnQkFBZ0IsT0FBTyxDQUFDLE1BQU07QUFDNUMsYUFFRSxLQUNBLENBQUMsS0FBSyxrQkFBa0IsTUFDeEIsQ0FBQyxZQUFZLFNBQVMsTUFDdEIsUUFBTyxLQUFLLFFBQVE7QUFBQTtBQUl4QixRQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLGFBQU8sUUFBUSxPQUFPLENBQUMsVUFBVSxTQUFTO0FBSXhDLGVBQU8sR0FBRyxnQkFBZ0IsaUJBQWlCO0FBQUEsU0FDMUM7QUFFSCxVQUFJLEtBQUssUUFBUTtBQUNmLGFBQUssT0FBTyxHQUFHLGtDQUFrQztBQUNqRCxhQUFLLE9BQU8sR0FBRyxzQ0FBc0M7QUFBQTtBQUV2RCxjQUFRLFVBQVU7QUFBQTtBQUdwQixRQUFJLFlBQVksU0FBUyxHQUFHO0FBQzFCLGFBQU8sWUFBWSxPQUFPLENBQUMsVUFBVSxTQUFTO0FBQzVDLGVBQU8sR0FBRyxnQkFBZ0IsVUFBVSxLQUFLLGVBQWU7QUFBQSxTQUN2RDtBQUFBO0FBRUwsV0FBTztBQUFBO0FBQUEsRUFHVCxpQkFBaUIsU0FBMkIsS0FBMEI7QUFDcEUsVUFBTSxFQUFFLGdCQUFnQixLQUFLO0FBQzdCLFVBQU0sRUFBRSxhQUFhLGlCQUFpQixLQUFLO0FBRTNDLFFBQUksYUFBYTtBQUNmLGtCQUFZLFFBQVEsQ0FBQyxPQUFPLE1BQU07QUFBQTtBQUdwQyxVQUFNLFNBQVM7QUFBQSxNQUNiLFFBQVEsS0FBSztBQUFBLE9BQ1Y7QUFHTCxRQUFJLGFBQWE7QUFDZixhQUFPLE9BQU8sUUFBUTtBQUFBLFdBQ2pCO0FBQ0wsWUFBTSxVQUFVLE9BQU8sS0FBSztBQUM1QixZQUFNLGVBQ0osUUFBUSxTQUFTLElBQ2IsS0FBSyxxQkFBcUIsV0FDMUIsS0FBSztBQUVYLGNBQVEsT0FBTyxrQkFBa0IsZUFBZSxRQUFRO0FBQUE7QUFDeEQsYUFBTyxLQUFLLGVBQWU7QUFBQTtBQUc3QixXQUFPO0FBQUE7QUFBQSxFQUdULGlCQUNFLEdBQ0EsS0FDQSxLQUNBLFNBQ0E7QUFDQSxTQUFLLE1BQU0sVUFBVSxZQUFZLEtBQUssR0FBRyxLQUFLLEtBQUs7QUFFbkQsUUFBSSxLQUFLLFVBQVUsT0FBTyxLQUFLLE9BQU8sWUFBWSxZQUFZO0FBQzVELFlBQU0sU0FBUyxPQUFPLEtBQUssUUFBUTtBQUNuQyxZQUFNLFVBQVUsYUFBYSxRQUFRLEVBQUUsVUFBVSxPQUFPO0FBQ3hELG1CQUFZLE1BQU07QUE1VHhCO0FBNlRRLHlCQUFLLFdBQUwsbUJBQWEsWUFBYixtQkFBc0IsS0FBSyxLQUFLLFFBQVEsU0FBUyxRQUFRLE1BQU0sTUFBTTtBQUFBO0FBQUE7QUFHekUsVUFBTTtBQUFBO0FBQUEsRUFHUixXQUNFLE1BQ0EsTUFBTSxJQUNOLE1BQU0sSUFDTixTQUNBO0FBeFVKO0FBeVVJLFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFVBQU0sRUFBRSxVQUFVLFdBQVc7QUFFN0IsU0FBSyxNQUFNLFVBQVUsYUFBYSxLQUFLLFNBQVMsS0FBSyxLQUFLO0FBRTFELFVBQU0sc0JBQXNCLG9CQUMxQixXQUFLLFdBQUwsbUJBQWEsVUFDYixRQUFRLE1BQ1IsT0FDQSxLQUNBLE9BQ0EsbUNBQVM7QUFHWCxRQUFJO0FBQ0YsWUFBTSxTQUFTLEtBQUssaUJBQWlCLFNBQVM7QUFDOUMsY0FBUSxRQUFRO0FBQUEsRUFBSyxNQUFNLGlCQUFpQjtBQUFBLElBQVU7QUFDdEQsa0JBQVksUUFBUSxNQUFNLFFBQVEsS0FBSztBQUFBLGFBQ2hDLEdBQVA7QUFDQSxXQUFLLGlCQUFpQixHQUFHLEtBQUssS0FBSztBQUFBLGNBQ25DO0FBQ0EsY0FBUSxVQUFVLEtBQUs7QUFBQTtBQUd6QixTQUFLLE1BQU0sVUFBVSxZQUFZLEtBQUssU0FBUyxLQUFLLEtBQUs7QUFBQTtBQUFBLFNBR3BELGtCQUFrQjtBQUN2QixRQUFJLFNBQVM7QUFDYixXQUFPLFNBQVMsU0FBUztBQUN2QixlQUFTLE9BQU87QUFBQTtBQUVsQixXQUFPO0FBQUE7QUFBQSxTQUdGLGFBQWE7QUFDbEIsUUFBSSxVQUFVO0FBQ2QsUUFDRSxDQUFDLE9BQU8sU0FDUixDQUFDLE1BQU0sVUFBVSxZQUNqQixDQUFDLE9BQU8sVUFBVSxVQUNsQjtBQUNBLGdCQUFVO0FBQUE7QUFHWixRQUFJLFNBQVM7QUFDWCxVQUFJO0FBQ0YsWUFBSSxTQUFTO0FBQUEsZUFDTixHQUFQO0FBQ0Esa0JBQVU7QUFBQTtBQUFBO0FBR2QsUUFBSSxDQUFDLFNBQVM7QUFDWixZQUNFO0FBQUE7QUFJSixXQUFPO0FBQUE7QUFBQTs7O0FEaldYLElBQU0sMkJBQTJCO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0MsUUFBTyxZQUFZLGVBQWUsUUFBUSxPQUFPLFFBQVEsSUFBSSxXQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWdCLFNBQVMscUJBQXFCO0FBQUE7QUFHbkosNkJBQ0UsU0FDZTtBQUNmLE1BQUksQ0FBQyxNQUFNLFFBQVEsVUFBVTtBQUMzQixJQUFDLFFBQU8sWUFBWSxlQUFlLFFBQVEsT0FBTyxRQUFRLElBQUksV0FBWSxRQUFRLElBQUksYUFBYSxlQUFnQixVQUFVLE1BQUs7QUFDbEksVUFBTSxPQUFzQjtBQUM1QixlQUFXLE9BQU8sU0FBUztBQUN6QixXQUFLLEtBQUssUUFBUTtBQUFBO0FBRXBCLGNBQVU7QUFBQTtBQUVaLFNBQU87QUFBQTtBQUdULDhCQUNFLFNBQ0EsS0FDQSxTQUNBO0FBM0RGO0FBNERFLFFBQU0sbUJBQW1CLFFBQVE7QUFFakMsVUFBUSxTQUFTLFFBQVE7QUFDekIsVUFBUSxhQUFhLENBQUMsTUFBTSxLQUFLLEtBQUssWUFBWTtBQUNoRCxVQUFNLGdCQUFnQixDQUFDLElBQUksU0FBUyxNQUFNLEtBQUssS0FBSztBQUNwRCxRQUFJLE1BQU0sVUFBVSxXQUFXLEtBQUssR0FBRztBQUN2QyxRQUFJO0FBQ0YsWUFBTSxNQUFNLGlCQUFpQixLQUMzQixTQUNBLE1BQ0Esa0NBRUssTUFDQSxJQUFJLGlCQUFpQixtQ0FBUyxXQUVuQyxLQUNBO0FBRUYsVUFBSSxNQUFNLFVBQVUsVUFBVSxLQUFLLEdBQUc7QUFDdEMsYUFBTztBQUFBLGFBQ0EsS0FBUDtBQUNBLFVBQUksTUFBTSxVQUFVLGNBQWMsS0FBSyxLQUFLLEdBQUc7QUFDL0MsWUFBTTtBQUFBO0FBQUE7QUFLVixNQUFJLFlBQVk7QUFDaEIsTUFBSSxTQUFTLFFBQVE7QUFDckIsTUFBSSxrQkFBa0IsY0FBUSxRQUFRLG9CQUFoQixZQUFtQztBQUN6RCxNQUFJLFVBQVUsV0FBWTtBQUN4QixXQUFPLGlCQUFpQixNQUFNLFNBQVM7QUFBQTtBQUV6QyxNQUFJLElBQUksYUFBYSxXQUFXLFFBQVEsUUFBUTtBQUM5QyxRQUFJLGFBQWEsUUFBUSxXQUFXLFFBQVEsT0FBTztBQUFBO0FBQUE7QUFJdkQsdUJBQXVCLFNBQTZCO0FBQ2xELFFBQU0sYUFBYSxRQUFRO0FBRTNCLFFBQU0sVUFBNkI7QUFBQSxJQUNqQyxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFFVCxVQUFVLFNBQVMsYUFBYTtBQXpHcEM7QUEwR00sVUFDRSxDQUFDLGNBQ0QsQ0FBQyxlQUNELDRDQUFhLGNBQ2IsUUFBUSxZQUFZLFNBQ25CLFFBQVEsV0FBVyxRQUFRLFFBQVEsU0FBUyxTQUM1QyxRQUFRLFdBQVcsUUFBUSxRQUFRLFVBQ3BDO0FBQ0EsWUFBSSwyQ0FBYSxXQUFXO0FBQzFCLHNCQUFZLFNBQVMsWUFBWSxVQUFVO0FBQUE7QUFFN0M7QUFBQTtBQUdGLDJCQUNFLFNBQ0EsYUFDQSxJQUFJLFFBQVE7QUFBQSxRQUNWLFdBQVcsUUFBUTtBQUFBLFFBQ25CLGVBQWUsWUFBWSxjQUFjLEtBQUs7QUFBQSxRQUM5QyxTQUFTLFlBQVksYUFBYTtBQUFBLFFBQ2xDLFNBQVMsb0JBQW9CLGVBQVEsWUFBUixtQkFBaUIsWUFBVztBQUFBLFFBQ3pELFlBQVksUUFBUSxjQUFRLFlBQVIsbUJBQWlCO0FBQUEsUUFDckMsYUFBYSxRQUFRLGNBQVEsWUFBUixtQkFBaUI7QUFBQSxRQUN0QyxpQkFBaUIsUUFBUSxjQUFRLFlBQVIsbUJBQWlCO0FBQUEsUUFFMUMsSUFBSSxNQUFNLFlBQVk7QUFBQSxRQUN0QixjQUFjLE1BQU0sWUFBWSxhQUFhO0FBQUEsUUFDN0MsaUJBQWlCLE1BQU0sUUFBUSxtQkFBbUI7QUFBQSxRQUNsRCxvQkFBb0IsTUFBTTtBQUN4QixpQkFBTztBQUFBLFlBQ0wsR0FBRztBQUFBLFlBQ0gsR0FBSSxRQUFRLHNCQUFzQjtBQUFBLFlBQ2xDLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1qQixjQUFjLFNBQVMsYUFBYTtBQUNsQyxVQUFJLFlBQVksV0FBVztBQUN6QixzQ0FDRSxZQUFZLFVBQVUsNkJBQ3RCLFlBQVksVUFBVTtBQUFBO0FBQUE7QUFBQSxJQU01QixhQUFhLFNBQVMsYUFBYSxhQUFhO0FBRTlDLFVBQUksWUFBWSxhQUFhLENBQUMsYUFBYTtBQUN6QyxvQkFBWSxVQUFVO0FBQUE7QUFBQTtBQUFBLElBSTFCLFdBQVcsU0FBUyxhQUFhO0FBQy9CLFVBQUksWUFBWSxXQUFXO0FBQ3pCLHdCQUNFLFlBQVksVUFBVSw2QkFDdEIsWUFBWSxVQUFVO0FBRXhCLG9CQUFZLFVBQVUsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXZDLFNBQU87QUFBQTtBQUlGLDRCQUE0QjtBQUNqQyxTQUFPLFNBQVUsU0FBZ0Q7QUFDL0QsWUFBUSxrQkFBa0IsV0FBWTtBQUNwQyxhQUFPLFFBQVE7QUFBQTtBQUdqQixZQUFRLGlCQUFpQixTQUFVLEtBQUssT0FBTztBQUM3QyxhQUFRLEtBQUssa0JBQWtCLE9BQU87QUFBQTtBQUd4QyxZQUFRLG9CQUFvQixTQUFVLEtBQUssT0FBTztBQUNoRCxZQUFNLFNBQVMsS0FBSztBQUNwQixVQUFJLE9BQU8sUUFBUTtBQUNqQixlQUFPLE9BQU87QUFBQTtBQUFBO0FBR2xCLFdBQU8sY0FBYztBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
