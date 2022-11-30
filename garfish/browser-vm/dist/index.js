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
  GarfishBrowserVm: () => GarfishBrowserVm,
  default: () => Sandbox
});

// src/pluginify.ts
var import_utils19 = require("@garfish/utils");

// src/sandbox.ts
var import_loader3 = require("@garfish/loader");
var import_utils17 = require("@garfish/utils");

// src/modules/history.ts
var import_utils4 = require("@garfish/utils");

// src/proxyInterceptor/shared.ts
var import_utils2 = require("@garfish/utils");

// src/utils.ts
var import_utils = require("@garfish/utils");

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
var isEsGlobalMethods = (0, import_utils.makeMap)(esGlobalMethods);
var isNativeCodeMethods = (0, import_utils.makeMap)(nativeCodeMethods);
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
      const hasGetter = (0, import_utils.hasOwn)(descriptor, "get");
      const hasSetter = (0, import_utils.hasOwn)(descriptor, "set");
      const canWritable = typeof isWritable === "function" && isWritable(p);
      if (hasGetter) {
        descriptor.get = () => (0, import_utils.hasOwn)(storageBox, p) ? storageBox[p] : target[p];
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
      (0, import_utils.nextTick)(() => {
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
          (0, import_utils2.warn)(`property "${String(p)}" is non-configurable and non-writable.`);
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
          (0, import_utils2.warn)(`property "${String(p)}" is non-configurable and non-writable.`);
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
var buildInProps = (0, import_utils2.makeMap)([
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
        return (0, import_utils2.isObject)(op) || typeof op === "function" ? instance instanceof fn : false;
      }
    });
  }
  return bound;
}

// src/modules/history.ts
var passedKey = (0, import_utils4.makeMap)(["scrollRestoration"]);
function historyModule() {
  const proto = Object.getPrototypeOf(window.history) || History.prototype;
  const fakeHistory = Object.create(proto);
  const proxyHistory = new Proxy(fakeHistory, {
    get(target, p) {
      const value = (0, import_utils4.hasOwn)(target, p) ? target[p] : window.history[p];
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
var import_utils5 = require("@garfish/utils");
function networkModule(sandbox) {
  const baseUrl = sandbox.options.baseUrl;
  const wsSet = /* @__PURE__ */ new Set();
  const xhrSet = /* @__PURE__ */ new Set();
  const fetchSet = /* @__PURE__ */ new Set();
  const needFix = (url) => sandbox.options.fixBaseUrl && baseUrl && typeof url === "string" && !(0, import_utils5.isAbsolute)(url);
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
        arguments[1] = baseUrl ? (0, import_utils5.transformUrl)(baseUrl, arguments[1]) : arguments[1];
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
        const baseWsUrl = (0, import_utils5.toWsProtocol)(baseUrl);
        url = (0, import_utils5.transformUrl)(baseWsUrl, arguments[1]);
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
      input = (0, import_utils5.transformUrl)(baseUrl, input);
    }
    if (sandbox.options.addSourceList) {
      sandbox.options.addSourceList({ tagName: "fetch", url: input });
    }
    let controller;
    if (!(0, import_utils5.hasOwn)(options, "signal") && window.AbortController) {
      controller = new window.AbortController();
      fetchSet.add(controller);
      options.signal = controller.signal;
    }
    const result = window.fetch(input, options);
    return controller && (0, import_utils5.isPromise)(result) ? result.finally(() => fetchSet.delete(controller)) : result;
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
var import_utils6 = require("@garfish/utils");
var passedKey2 = (0, import_utils6.makeMap)(["title", "cookie", "onselectstart", "ondragstart"]);
var queryFunctions = (0, import_utils6.makeMap)([
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
    const value = (0, import_utils6.hasOwn)(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(document, p);
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
      if ((0, import_utils6.isObject)(el)) {
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
        return (0, import_utils6.findTarget)(rootNode, ["head", `div[${import_utils6.__MockHead__}]`]) || value;
      }
      if (strictIsolation) {
        if (p === "body") {
          return (0, import_utils6.findTarget)(rootNode, ["body", `div[${import_utils6.__MockBody__}]`]);
        } else if (queryFunctions(p)) {
          return p === "getElementById" ? (id2) => rootNode.querySelector(`#${id2}`) : rootNode[p].bind(rootNode);
        }
      }
    }
    if (typeof value === "function") {
      let newValue = (0, import_utils6.hasOwn)(value, __documentBind__) ? value[__documentBind__] : null;
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
var safariProxyDocumentDealHandler = (0, import_utils6.safari13Deal)();
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
    return (0, import_utils6.hasOwn)(target, p) || Reflect.has(document, p);
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
var import_utils9 = require("@garfish/utils");
var MouseEventPatch = class extends MouseEvent {
  constructor(typeArg, mouseEventInit) {
    if (mouseEventInit && (0, import_utils9.getType)(mouseEventInit.view) === "window") {
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
var import_utils13 = require("@garfish/utils");
var import_loader2 = require("@garfish/loader");

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
var import_loader = require("@garfish/loader");
var import_utils11 = require("@garfish/utils");
var isInsertMethod = (0, import_utils11.makeMap)(["insertBefore", "insertAdjacentElement"]);
var rawElementMethods = /* @__PURE__ */ Object.create(null);
var DynamicNodeProcessor = class {
  constructor(el, sandbox, methodName) {
    this.nativeAppend = rawElementMethods["appendChild"];
    this.nativeRemove = rawElementMethods["removeChild"];
    this.el = el;
    this.sandbox = sandbox;
    this.methodName = methodName;
    this.rootElement = rootElm(sandbox) || document;
    this.DOMApis = new import_utils11.DOMApis(sandbox.global.document);
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
      src && (el.src = (0, import_utils11.transformUrl)(baseUrl, src));
      href && (el.href = (0, import_utils11.transformUrl)(baseUrl, href));
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
    if (!type || (0, import_utils11.isCssType)({ src: href, type })) {
      if (href) {
        const { baseUrl, namespace, styleScopeId } = this.sandbox.options;
        const fetchUrl = baseUrl ? (0, import_utils11.transformUrl)(baseUrl, href) : href;
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
            (0, import_utils11.warn)(`Invalid resource type "${type}", "${href}" can't generate styleManager`);
          }
          this.dispatchEvent("load");
        }).catch((e) => {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils11.warn)(e);
          this.dispatchEvent("error", {
            error: e,
            filename: fetchUrl
          });
        });
      }
    } else {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        (0, import_utils11.warn)(`Invalid resource type "${type}", "${href}"`);
      }
    }
    const linkCommentNode = this.DOMApis.createLinkCommentNode(href);
    this.el[import_utils11.__REMOVE_NODE__] = () => this.DOMApis.removeElement(linkCommentNode);
    return linkCommentNode;
  }
  addDynamicScriptNode() {
    const { src, type, crossOrigin } = this.el;
    const isModule2 = type === "module";
    const code = this.el.textContent || this.el.text || "";
    if (!type || (0, import_utils11.isJsType)({ src, type })) {
      const { baseUrl, namespace } = this.sandbox.options;
      if (src) {
        const fetchUrl = baseUrl ? (0, import_utils11.transformUrl)(baseUrl, src) : src;
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
            (0, import_utils11.warn)(`Invalid resource type "${type}", "${src}" can't generate scriptManager`);
          }
          this.dispatchEvent("load");
        }, (e) => {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils11.warn)(e);
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
      this.el[import_utils11.__REMOVE_NODE__] = () => this.DOMApis.removeElement(scriptCommentNode);
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
        const manager = new import_loader.StyleManager(styleCode);
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
      return (0, import_utils11.findTarget)(this.rootElement, [
        "body",
        `div[${import_utils11.__MockBody__}]`
      ]);
    } else if (parentNode === document.head) {
      return (0, import_utils11.findTarget)(this.rootElement, [
        "head",
        `div[${import_utils11.__MockHead__}]`
      ]);
    }
    if (this.rootElement.contains(parentNode) || !document.contains(parentNode)) {
      return parentNode;
    }
    if (defaultInsert === "head") {
      return (0, import_utils11.findTarget)(this.rootElement, [
        "head",
        `div[${import_utils11.__MockHead__}]`
      ]);
    } else if (defaultInsert === "body") {
      return (0, import_utils11.findTarget)(this.rootElement, [
        "body",
        `div[${import_utils11.__MockBody__}]`
      ]);
    }
    return parentNode;
  }
  append(context, args, originProcess) {
    var _a;
    let convertedNode;
    let parentNode = context;
    const { baseUrl, namespace, styleScopeId } = this.sandbox.options;
    if (import_utils11.sourceListTags.includes(this.tagName)) {
      this.fixResourceNodeUrl(this.el);
    }
    if (this.is("script")) {
      parentNode = this.findParentNodeInApp(context, "body");
      convertedNode = this.addDynamicScriptNode();
    } else if (this.is("style")) {
      parentNode = this.findParentNodeInApp(context, "head");
      const manager = new import_loader.StyleManager(this.el.textContent);
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
          (0, import_utils11.safeWrapper)(() => this.fixResourceNodeUrl(dom));
        });
      }
    }
    if (this.is("iframe") && typeof this.el.onload === "function") {
      const { el, sandbox } = this;
      const originOnload = el.onload;
      el.onload = function() {
        (0, import_utils11.safeWrapper)(() => (0, import_utils11.def)(el.contentWindow, "parent", sandbox.global));
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
    if (typeof this.el[import_utils11.__REMOVE_NODE__] === "function") {
      this.el[import_utils11.__REMOVE_NODE__]();
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
var ignoreElementTimingTags = (0, import_utils13.makeMap)([
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
        const manager = new import_loader2.StyleManager(el.textContent);
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
    (0, import_utils13.safeWrapper)(() => {
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
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils13.warn)('"ownerDocument" is a read-only attribute.');
    }
  });
}
function makeElInjector(sandboxConfig) {
  if (makeElInjector.hasInject)
    return;
  makeElInjector.hasInject = true;
  if (typeof window.Element === "function") {
    if (sandboxConfig.fixBaseUrl)
      (0, import_utils13.safeWrapper)(() => handleOwnerDocument());
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
var import_hooks = require("@garfish/hooks");
function sandboxLifecycle() {
  return new import_hooks.PluginSystem({
    closed: new import_hooks.SyncHook(),
    stared: new import_hooks.SyncHook(),
    appendNode: new import_hooks.SyncHook(),
    documentGetter: new import_hooks.SyncWaterfallHook("documentGetter"),
    beforeClearEffect: new import_hooks.SyncHook(),
    afterClearEffect: new import_hooks.SyncHook(),
    beforeInvoke: new import_hooks.SyncHook(),
    afterInvoke: new import_hooks.SyncHook(),
    invokeError: new import_hooks.SyncHook()
  });
}

// src/proxyInterceptor/global.ts
var import_utils15 = require("@garfish/utils");
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
      value = (0, import_utils15.hasOwn)(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(window, p);
    }
    if (typeof value === "function") {
      if (isEsGlobalMethods(p) || isNativeCodeMethods(p) || (0, import_utils15.hasOwn)(overrideList, p) || isConstructor(value) || sandbox.isExternalGlobalVariable.has(p)) {
        return value;
      }
    } else {
      return value;
    }
    const newValue = (0, import_utils15.hasOwn)(value, __windowBind__) ? value[__windowBind__] : bind(value, window);
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
var safariProxyWindowDealHandler = (0, import_utils15.safari13Deal)();
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
    if ((0, import_utils15.hasOwn)(target, p)) {
      delete target[p];
      if (sandbox.initComplete && sandbox.isExternalGlobalVariable.has(p)) {
        sandbox.isExternalGlobalVariable.delete(p);
      }
    } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
      if ((0, import_utils15.hasOwn)(window, p) && sandbox.isProtectVariable(p)) {
        (0, import_utils15.warn)(`The "${String(p)}" is global protect variable."`);
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
var isModule = (module2) => {
  return (0, import_utils17.isObject)(module2) ? module2[__garfishGlobal__] !== void 0 : false;
};
var addProxyWindowType = (module2, parentModule) => {
  if (!isModule(module2)) {
    module2[__garfishGlobal__] = parentModule;
  }
  return module2;
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
    this.options = (0, import_utils17.isPlainObject)(options) ? (0, import_utils17.deepMerge)(defaultOptions, options) : defaultOptions;
    const { loaderOptions, protectVariable, insulationVariable } = this.options;
    this.loader = new import_loader3.Loader(loaderOptions);
    this.isProtectVariable = (0, import_utils17.makeMap)((protectVariable == null ? void 0 : protectVariable()) || []);
    this.isInsulationVariable = (0, import_utils17.makeMap)((insulationVariable == null ? void 0 : insulationVariable()) || []);
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
    const fakeWindow = createFakeObject(window, this.isInsulationVariable, (0, import_utils17.makeMap)(moduleKeys));
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
    (0, import_utils17.safeWrapper)(() => {
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
    for (const module2 of allModules) {
      if (typeof module2 === "function") {
        const { recover, override, created, prepare } = module2(this) || {};
        if (recover)
          recoverList.push(recover);
        if (created)
          createdList.push(created);
        if (prepare)
          prepareList.push(prepare);
        if (override) {
          for (const key in override) {
            if ((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && overrideList[key]) {
              (0, import_utils17.warn)(`"${key}" global variables are overwritten.`);
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
      return p && !this.isProtectVariable(p) && !tempEnvKeys.includes(p) && (0, import_utils17.hasOwn)(this.global, p);
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
      (0, import_utils17.safeWrapper)(() => {
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
    const revertCurrentScript = (0, import_utils17.setDocCurrentScript)((_a = this.global) == null ? void 0 : _a.document, codeRef.code, false, url, async, options == null ? void 0 : options.originScript);
    try {
      const params = this.createExecParams(codeRef, env);
      codeRef.code += `
${url ? `//# sourceURL=${url}
` : ""}`;
      (0, import_utils17.evalWithEnv)(codeRef.code, params, this.global);
    } catch (e) {
      this.processExecError(e, url, env, options);
    } finally {
      Promise.resolve().then(revertCurrentScript);
    }
    this.hooks.lifecycle.afterInvoke.emit(codeRef, url, env, options);
  }
  static getNativeWindow() {
    let module2 = window;
    while (isModule(module2)) {
      module2 = module2[__garfishGlobal__];
    }
    return module2;
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
      (0, import_utils17.warn)('The current environment does not support "vm sandbox",Please use the "snapshot sandbox" instead.');
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
    (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && (0, import_utils19.warn)('"vm sandbox" modules should be an array');
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
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GarfishBrowserVm
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9wbHVnaW5pZnkudHMiLCAiLi4vc3JjL3NhbmRib3gudHMiLCAiLi4vc3JjL21vZHVsZXMvaGlzdG9yeS50cyIsICIuLi9zcmMvcHJveHlJbnRlcmNlcHRvci9zaGFyZWQudHMiLCAiLi4vc3JjL3V0aWxzLnRzIiwgIi4uL3NyYy9zeW1ib2xUeXBlcy50cyIsICIuLi9zcmMvbW9kdWxlcy9uZXR3b3JrLnRzIiwgIi4uL3NyYy9wcm94eUludGVyY2VwdG9yL2RvY3VtZW50LnRzIiwgIi4uL3NyYy9tb2R1bGVzL2RvY3VtZW50LnRzIiwgIi4uL3NyYy9tb2R1bGVzL3VpRXZlbnQudHMiLCAiLi4vc3JjL21vZHVsZXMvc3RvcmFnZS50cyIsICIuLi9zcmMvbW9kdWxlcy9ldmVudExpc3RlbmVyLnRzIiwgIi4uL3NyYy9tb2R1bGVzL211dGF0aW9uT2JzZXJ2ZXIudHMiLCAiLi4vc3JjL21vZHVsZXMvdGltZXIudHMiLCAiLi4vc3JjL2R5bmFtaWNOb2RlL2luZGV4LnRzIiwgIi4uL3NyYy9keW5hbWljTm9kZS9wcm9jZXNzUGFyYW1zLnRzIiwgIi4uL3NyYy9keW5hbWljTm9kZS9wcm9jZXNzb3IudHMiLCAiLi4vc3JjL2xpZmVjeWNsZS50cyIsICIuLi9zcmMvcHJveHlJbnRlcmNlcHRvci9nbG9iYWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7IEdhcmZpc2hCcm93c2VyVm0gfSBmcm9tICcuL3BsdWdpbmlmeSc7XG5leHBvcnQgeyBTYW5kYm94IGFzIGRlZmF1bHQgfSBmcm9tICcuL3NhbmRib3gnO1xuZXhwb3J0IHR5cGUge1xuICBNb2R1bGUsXG4gIEZha2VXaW5kb3csXG4gIE92ZXJyaWRlc0RhdGEsXG4gIFNhbmRib3hPcHRpb25zLFxuICBSZXBsYWNlR2xvYmFsVmFyaWFibGVzLFxufSBmcm9tICcuL3R5cGVzJztcbiIsICJpbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgeyB3YXJuLCBpc1BsYWluT2JqZWN0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi9zYW5kYm94JztcbmltcG9ydCB7IHJlY29yZFN0eWxlZENvbXBvbmVudENTU1J1bGVzLCByZWJ1aWxkQ1NTUnVsZXMgfSBmcm9tICcuL2R5bmFtaWNOb2RlJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BnYXJmaXNoL2NvcmUnIHtcbiAgZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIEdhcmZpc2gge1xuICAgIHNldEdsb2JhbFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IHZvaWQ7XG4gICAgZ2V0R2xvYmFsT2JqZWN0OiAoKSA9PiBXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpcztcbiAgICBjbGVhckVzY2FwZUVmZmVjdDogKGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSkgPT4gdm9pZDtcbiAgfVxuXG4gIGV4cG9ydCBuYW1lc3BhY2UgaW50ZXJmYWNlcyB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBTYW5kYm94Q29uZmlnIHtcbiAgICAgIG1vZHVsZXM/OiBBcnJheTxNb2R1bGU+IHwgUmVjb3JkPHN0cmluZywgTW9kdWxlPjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG4gICAgICBwcm90ZWN0VmFyaWFibGU/OiBQcm9wZXJ0eUtleVtdO1xuICAgICAgaW5zdWxhdGlvblZhcmlhYmxlPzogUHJvcGVydHlLZXlbXTtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEFwcEluZm8ge1xuICAgICAgcHJvdGVjdFZhcmlhYmxlPzogUHJvcGVydHlLZXlbXTtcbiAgICAgIGluc3VsYXRpb25WYXJpYWJsZT86IFByb3BlcnR5S2V5W107XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBBcHAge1xuICAgICAgdm1TYW5kYm94PzogU2FuZGJveDtcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3BlY2lhbEV4dGVybmFsVmFyaWFibGVzID0gW1xuICAnb25lcnJvcicsXG4gICd3ZWJwYWNranNvbnAnLFxuICAnX19SRUFDVF9FUlJPUl9PVkVSTEFZX0dMT0JBTF9IT09LX18nLFxuICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSA/ICd3ZWJwYWNrSG90VXBkYXRlJyA6ICcnLFxuXTtcblxuZnVuY3Rpb24gY29tcGF0aWJsZU9sZE1vZHVsZShcbiAgbW9kdWxlczogQXJyYXk8TW9kdWxlPiB8IFJlY29yZDxzdHJpbmcsIE1vZHVsZT4sXG4pOiBBcnJheTxNb2R1bGU+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG1vZHVsZXMpKSB7XG4gICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybignXCJ2bSBzYW5kYm94XCIgbW9kdWxlcyBzaG91bGQgYmUgYW4gYXJyYXknKTtcbiAgICBjb25zdCBsaXN0OiBBcnJheTxNb2R1bGU+ID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbW9kdWxlcykge1xuICAgICAgbGlzdC5wdXNoKG1vZHVsZXNba2V5XSk7XG4gICAgfVxuICAgIG1vZHVsZXMgPSBsaXN0O1xuICB9XG4gIHJldHVybiBtb2R1bGVzO1xufVxuXG5mdW5jdGlvbiByZXdyaXRlQXBwQW5kU2FuZGJveChcbiAgR2FyZmlzaDogaW50ZXJmYWNlcy5HYXJmaXNoLFxuICBhcHA6IGludGVyZmFjZXMuQXBwLFxuICBzYW5kYm94OiBTYW5kYm94LFxuKSB7XG4gIGNvbnN0IG9yaWdpbkV4ZWNTY3JpcHQgPSBzYW5kYm94LmV4ZWNTY3JpcHQ7XG4gIC8vIFJld3JpdGUgc2FuZGJveCBhdHRyaWJ1dGVzXG4gIHNhbmRib3gubG9hZGVyID0gR2FyZmlzaC5sb2FkZXI7XG4gIHNhbmRib3guZXhlY1NjcmlwdCA9IChjb2RlLCBlbnYsIHVybCwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGV2YWxIb29rc0FyZ3MgPSBbYXBwLmFwcEluZm8sIGNvZGUsIGVudiwgdXJsLCBvcHRpb25zXSBhcyBjb25zdDtcbiAgICBhcHAuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUV2YWwuZW1pdCguLi5ldmFsSG9va3NBcmdzKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gb3JpZ2luRXhlY1NjcmlwdC5jYWxsKFxuICAgICAgICBzYW5kYm94LFxuICAgICAgICBjb2RlLFxuICAgICAgICB7XG4gICAgICAgICAgLy8gRm9yIGFwcGxpY2F0aW9uIG9mIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICAgICAgICAgIC4uLmVudixcbiAgICAgICAgICAuLi5hcHAuZ2V0RXhlY1NjcmlwdEVudihvcHRpb25zPy5ub0VudHJ5KSxcbiAgICAgICAgfSxcbiAgICAgICAgdXJsLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgKTtcbiAgICAgIGFwcC5ob29rcy5saWZlY3ljbGUuYWZ0ZXJFdmFsLmVtaXQoLi4uZXZhbEhvb2tzQXJncyk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgYXBwLmhvb2tzLmxpZmVjeWNsZS5lcnJvckV4ZWNDb2RlLmVtaXQoZXJyLCAuLi5ldmFsSG9va3NBcmdzKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV3cml0ZSBhcHAgYXR0cmlidXRlc1xuICBhcHAudm1TYW5kYm94ID0gc2FuZGJveDtcbiAgYXBwLmdsb2JhbCA9IHNhbmRib3guZ2xvYmFsO1xuICBhcHAuc3RyaWN0SXNvbGF0aW9uID0gc2FuZGJveC5vcHRpb25zLnN0cmljdElzb2xhdGlvbiA/PyBmYWxzZTtcbiAgYXBwLnJ1bkNvZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG9yaWdpbkV4ZWNTY3JpcHQuYXBwbHkoc2FuZGJveCwgYXJndW1lbnRzKTtcbiAgfTtcbiAgaWYgKGFwcC5lbnRyeU1hbmFnZXIuRE9NQXBpcyAmJiBzYW5kYm94Lmdsb2JhbCkge1xuICAgIGFwcC5lbnRyeU1hbmFnZXIuRE9NQXBpcy5kb2N1bWVudCA9IHNhbmRib3guZ2xvYmFsLmRvY3VtZW50O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoR2FyZmlzaDogaW50ZXJmYWNlcy5HYXJmaXNoKSB7XG4gIGNvbnN0IGNhblN1cHBvcnQgPSBTYW5kYm94LmNhblN1cHBvcnQoKTtcblxuICBjb25zdCBvcHRpb25zOiBpbnRlcmZhY2VzLlBsdWdpbiA9IHtcbiAgICBuYW1lOiAnYnJvd3Nlci12bScsXG4gICAgdmVyc2lvbjogJzEuMTIuMCcsXG5cbiAgICBhZnRlckxvYWQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIWNhblN1cHBvcnQgfHxcbiAgICAgICAgIWFwcEluc3RhbmNlIHx8XG4gICAgICAgIGFwcEluc3RhbmNlPy52bVNhbmRib3ggfHxcbiAgICAgICAgYXBwSW5mby5zYW5kYm94ID09PSBmYWxzZSB8fCAvLyBFbnN1cmUgdGhhdCBvbGQgdmVyc2lvbnMgY29tcGF0aWJsZVxuICAgICAgICAoYXBwSW5mby5zYW5kYm94ICYmIGFwcEluZm8uc2FuZGJveC5vcGVuID09PSBmYWxzZSkgfHxcbiAgICAgICAgKGFwcEluZm8uc2FuZGJveCAmJiBhcHBJbmZvLnNhbmRib3guc25hcHNob3QpXG4gICAgICApIHtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlPy52bVNhbmRib3gpIHtcbiAgICAgICAgICBhcHBJbnN0YW5jZS5nbG9iYWwgPSBhcHBJbnN0YW5jZS52bVNhbmRib3guZ2xvYmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV3cml0ZUFwcEFuZFNhbmRib3goXG4gICAgICAgIEdhcmZpc2gsXG4gICAgICAgIGFwcEluc3RhbmNlLFxuICAgICAgICBuZXcgU2FuZGJveCh7XG4gICAgICAgICAgbmFtZXNwYWNlOiBhcHBJbmZvLm5hbWUsXG4gICAgICAgICAgYWRkU291cmNlTGlzdDogYXBwSW5zdGFuY2UuYWRkU291cmNlTGlzdC5iaW5kKGFwcEluc3RhbmNlKSxcbiAgICAgICAgICBiYXNlVXJsOiBhcHBJbnN0YW5jZS5lbnRyeU1hbmFnZXIudXJsLFxuICAgICAgICAgIG1vZHVsZXM6IGNvbXBhdGlibGVPbGRNb2R1bGUoYXBwSW5mby5zYW5kYm94Py5tb2R1bGVzIHx8IFtdKSxcbiAgICAgICAgICBmaXhCYXNlVXJsOiBCb29sZWFuKGFwcEluZm8uc2FuZGJveD8uZml4QmFzZVVybCksXG4gICAgICAgICAgZGlzYWJsZVdpdGg6IEJvb2xlYW4oYXBwSW5mby5zYW5kYm94Py5kaXNhYmxlV2l0aCksXG4gICAgICAgICAgc3RyaWN0SXNvbGF0aW9uOiBCb29sZWFuKGFwcEluZm8uc2FuZGJveD8uc3RyaWN0SXNvbGF0aW9uKSxcblxuICAgICAgICAgIGVsOiAoKSA9PiBhcHBJbnN0YW5jZS5odG1sTm9kZSxcbiAgICAgICAgICBzdHlsZVNjb3BlSWQ6ICgpID0+IGFwcEluc3RhbmNlLmFwcENvbnRhaW5lci5pZCxcbiAgICAgICAgICBwcm90ZWN0VmFyaWFibGU6ICgpID0+IGFwcEluZm8ucHJvdGVjdFZhcmlhYmxlIHx8IFtdLFxuICAgICAgICAgIGluc3VsYXRpb25WYXJpYWJsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgLi4uc3BlY2lhbEV4dGVybmFsVmFyaWFibGVzLFxuICAgICAgICAgICAgICAuLi4oYXBwSW5mby5pbnN1bGF0aW9uVmFyaWFibGUgfHwgW10pLFxuICAgICAgICAgICAgXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBiZWZvcmVVbm1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlKSB7XG4gICAgICBpZiAoYXBwSW5zdGFuY2Uudm1TYW5kYm94KSB7XG4gICAgICAgIHJlY29yZFN0eWxlZENvbXBvbmVudENTU1J1bGVzKFxuICAgICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5keW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQsXG4gICAgICAgICAgYXBwSW5zdGFuY2Uudm1TYW5kYm94LnN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJZiB0aGUgYXBwIGlzIHVuaW5zdGFsbGVkLCB0aGUgc2FuZGJveCBuZWVkcyB0byBjbGVhciBhbGwgZWZmZWN0cyBhbmQgdGhlbiByZXNldFxuICAgIGFmdGVyVW5tb3VudChhcHBJbmZvLCBhcHBJbnN0YW5jZSwgaXNDYWNoZU1vZGUpIHtcbiAgICAgIC8vIFRoZSBjYWNoaW5nIHBhdHRlcm4gdG8gcmV0YWluIHRoZSBzYW1lIGNvbnRleHRcbiAgICAgIGlmIChhcHBJbnN0YW5jZS52bVNhbmRib3ggJiYgIWlzQ2FjaGVNb2RlKSB7XG4gICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5yZXNldCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZnRlck1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlKSB7XG4gICAgICBpZiAoYXBwSW5zdGFuY2Uudm1TYW5kYm94KSB7XG4gICAgICAgIHJlYnVpbGRDU1NSdWxlcyhcbiAgICAgICAgICBhcHBJbnN0YW5jZS52bVNhbmRib3guZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LFxuICAgICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5zdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcCxcbiAgICAgICAgKTtcbiAgICAgICAgYXBwSW5zdGFuY2Uudm1TYW5kYm94LmV4ZWNTY3JpcHQoYFxuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm9ubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgd2luZG93Lm9ubG9hZC5jYWxsKHdpbmRvdyk7XG4gICAgICAgICAgfVxuICAgICAgICBgKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuLy8gRXhwb3J0IEdhcmZpc2ggcGx1Z2luXG5leHBvcnQgZnVuY3Rpb24gR2FyZmlzaEJyb3dzZXJWbSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgR2FyZmlzaC5nZXRHbG9iYWxPYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gU2FuZGJveC5nZXROYXRpdmVXaW5kb3coKTtcbiAgICB9O1xuXG4gICAgR2FyZmlzaC5zZXRHbG9iYWxWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gKHRoaXMuZ2V0R2xvYmFsT2JqZWN0KClba2V5XSA9IHZhbHVlKTtcbiAgICB9O1xuXG4gICAgR2FyZmlzaC5jbGVhckVzY2FwZUVmZmVjdCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBjb25zdCBnbG9iYWwgPSB0aGlzLmdldEdsb2JhbE9iamVjdCgpO1xuICAgICAgaWYgKGtleSBpbiBnbG9iYWwpIHtcbiAgICAgICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjcmVhdGVPcHRpb25zKEdhcmZpc2gpO1xuICB9O1xufVxuIiwgImltcG9ydCB7IExvYWRlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICB3YXJuLFxuICBoYXNPd24sXG4gIG1ha2VNYXAsXG4gIGlzT2JqZWN0LFxuICBkZWVwTWVyZ2UsXG4gIGV2YWxXaXRoRW52LFxuICBzYWZlV3JhcHBlcixcbiAgaXNQbGFpbk9iamVjdCxcbiAgc2V0RG9jQ3VycmVudFNjcmlwdCxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgeyBoaXN0b3J5TW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgbmV0d29ya01vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9uZXR3b3JrJztcbmltcG9ydCB7IGRvY3VtZW50TW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2RvY3VtZW50JztcbmltcG9ydCB7IFVpRXZlbnRPdmVycmlkZSB9IGZyb20gJy4vbW9kdWxlcy91aUV2ZW50JztcbmltcG9ydCB7IGxvY2FsU3RvcmFnZU1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9zdG9yYWdlJztcbmltcG9ydCB7IGxpc3RlbmVyTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2V2ZW50TGlzdGVuZXInO1xuaW1wb3J0IHsgb2JzZXJ2ZXJNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvbXV0YXRpb25PYnNlcnZlcic7XG5pbXBvcnQgeyB0aW1lb3V0TW9kdWxlLCBpbnRlcnZhbE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy90aW1lcic7XG5pbXBvcnQgeyBtYWtlRWxJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY05vZGUnO1xuaW1wb3J0IHsgc2FuZGJveExpZmVjeWNsZSB9IGZyb20gJy4vbGlmZWN5Y2xlJztcbmltcG9ydCB7IG9wdGltaXplTWV0aG9kcywgY3JlYXRlRmFrZU9iamVjdCwgc2FuZGJveE1hcCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgX19nYXJmaXNoR2xvYmFsX18sIEdBUkZJU0hfT1BUSU1JWkVfTkFNRSB9IGZyb20gJy4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHsgTW9kdWxlLCBTYW5kYm94T3B0aW9ucywgUmVwbGFjZUdsb2JhbFZhcmlhYmxlcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlSGFzLFxuICBjcmVhdGVHZXR0ZXIsXG4gIGNyZWF0ZVNldHRlcixcbiAgY3JlYXRlRGVmaW5lUHJvcGVydHksXG4gIGNyZWF0ZURlbGV0ZVByb3BlcnR5LFxufSBmcm9tICcuL3Byb3h5SW50ZXJjZXB0b3IvZ2xvYmFsJztcblxubGV0IGlkID0gMDtcbmNvbnN0IGRlZmF1bHRNb2R1bGVzOiBBcnJheTxNb2R1bGU+ID0gW1xuICBuZXR3b3JrTW9kdWxlLFxuICB0aW1lb3V0TW9kdWxlLFxuICBpbnRlcnZhbE1vZHVsZSxcbiAgaGlzdG9yeU1vZHVsZSxcbiAgZG9jdW1lbnRNb2R1bGUsXG4gIGxpc3RlbmVyTW9kdWxlLFxuICBvYnNlcnZlck1vZHVsZSxcbiAgVWlFdmVudE92ZXJyaWRlLFxuICBsb2NhbFN0b3JhZ2VNb2R1bGUsXG5dO1xuXG5jb25zdCBpc01vZHVsZSA9IChtb2R1bGU6IFdpbmRvdykgPT4ge1xuICByZXR1cm4gaXNPYmplY3QobW9kdWxlKVxuICAgID8gbW9kdWxlW19fZ2FyZmlzaEdsb2JhbF9fIGFzIGFueV0gIT09IHVuZGVmaW5lZFxuICAgIDogZmFsc2U7XG59O1xuXG5jb25zdCBhZGRQcm94eVdpbmRvd1R5cGUgPSAobW9kdWxlOiBXaW5kb3csIHBhcmVudE1vZHVsZTogV2luZG93KSA9PiB7XG4gIGlmICghaXNNb2R1bGUobW9kdWxlKSkge1xuICAgIG1vZHVsZVtfX2dhcmZpc2hHbG9iYWxfXyBhcyBhbnldID0gcGFyZW50TW9kdWxlO1xuICB9XG4gIHJldHVybiBtb2R1bGU7XG59O1xuXG5leHBvcnQgY2xhc3MgU2FuZGJveCB7XG4gIHB1YmxpYyBpZCA9IGlkKys7XG4gIHB1YmxpYyB0eXBlID0gJ3ZtJztcbiAgcHVibGljIGNsb3NlZCA9IHRydWU7XG4gIHB1YmxpYyBpbml0Q29tcGxldGUgPSBmYWxzZTtcbiAgcHVibGljIHZlcnNpb24gPSAnMS4xMi4wJztcbiAgcHVibGljIGdsb2JhbD86IFdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzO1xuICBwdWJsaWMgbG9hZGVyOiBMb2FkZXI7XG4gIHB1YmxpYyBvcHRpb25zOiBTYW5kYm94T3B0aW9ucztcbiAgcHVibGljIGhvb2tzID0gc2FuZGJveExpZmVjeWNsZSgpO1xuICBwdWJsaWMgcmVwbGFjZUdsb2JhbFZhcmlhYmxlczogUmVwbGFjZUdsb2JhbFZhcmlhYmxlcztcbiAgcHVibGljIGRlZmVyQ2xlYXJFZmZlY3RzOiBTZXQ8KCkgPT4gdm9pZD4gPSBuZXcgU2V0KCk7XG4gIHB1YmxpYyBpc0V4dGVybmFsR2xvYmFsVmFyaWFibGU6IFNldDxQcm9wZXJ0eUtleT4gPSBuZXcgU2V0KCk7XG4gIHB1YmxpYyBpc1Byb3RlY3RWYXJpYWJsZTogKHA6IFByb3BlcnR5S2V5KSA9PiBib29sZWFuO1xuICBwdWJsaWMgaXNJbnN1bGF0aW9uVmFyaWFibGU6IChQOiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbjtcbiAgcHVibGljIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldCA9IG5ldyBTZXQ8SFRNTFN0eWxlRWxlbWVudD4oKTtcbiAgcHVibGljIHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwID0gbmV3IFdlYWtNYXA8XG4gICAgSFRNTFN0eWxlRWxlbWVudCxcbiAgICBDU1NSdWxlTGlzdFxuICA+KCk7XG5cbiAgcHJpdmF0ZSBvcHRpbWl6ZUNvZGUgPSAnJzsgLy8gVG8gb3B0aW1pemUgdGhlIHdpdGggc3RhdGVtZW50XG4gIHByaXZhdGUgZW52VmFyaWFibGUgPSAnX19HQVJGSVNIX1NBTkRCT1hfRU5WX1ZBUl9fJztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTYW5kYm94T3B0aW9ucykge1xuICAgIC8vIERlZmF1bHQgc2FuZGJveCBjb25maWdcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogU2FuZGJveE9wdGlvbnMgPSB7XG4gICAgICBiYXNlVXJsOiAnJyxcbiAgICAgIG5hbWVzcGFjZTogJycsXG4gICAgICBtb2R1bGVzOiBbXSxcbiAgICAgIGZpeEJhc2VVcmw6IGZhbHNlLFxuICAgICAgZGlzYWJsZVdpdGg6IGZhbHNlLFxuICAgICAgc3RyaWN0SXNvbGF0aW9uOiBmYWxzZSxcbiAgICAgIGVsOiAoKSA9PiBudWxsLFxuICAgICAgc3R5bGVTY29wZUlkOiAoKSA9PiAnJyxcbiAgICAgIHByb3RlY3RWYXJpYWJsZTogKCkgPT4gW10sXG4gICAgICBpbnN1bGF0aW9uVmFyaWFibGU6ICgpID0+IFtdLFxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zID0gaXNQbGFpbk9iamVjdChvcHRpb25zKVxuICAgICAgPyBkZWVwTWVyZ2UoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpXG4gICAgICA6IGRlZmF1bHRPcHRpb25zO1xuXG4gICAgY29uc3QgeyBsb2FkZXJPcHRpb25zLCBwcm90ZWN0VmFyaWFibGUsIGluc3VsYXRpb25WYXJpYWJsZSB9ID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRlcihsb2FkZXJPcHRpb25zKTtcbiAgICB0aGlzLmlzUHJvdGVjdFZhcmlhYmxlID0gbWFrZU1hcChwcm90ZWN0VmFyaWFibGU/LigpIHx8IFtdKTtcbiAgICB0aGlzLmlzSW5zdWxhdGlvblZhcmlhYmxlID0gbWFrZU1hcChpbnN1bGF0aW9uVmFyaWFibGU/LigpIHx8IFtdKTtcblxuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcyA9IHtcbiAgICAgIGNyZWF0ZWRMaXN0OiBbXSxcbiAgICAgIHByZXBhcmVMaXN0OiBbXSxcbiAgICAgIHJlY292ZXJMaXN0OiBbXSxcbiAgICAgIG92ZXJyaWRlTGlzdDoge30sXG4gICAgfTtcbiAgICAvLyBJbmplY3QgR2xvYmFsIGNhcHR1cmVcbiAgICBtYWtlRWxJbmplY3Rvcih0aGlzLm9wdGlvbnMpO1xuICAgIC8vIFRoZSBkZWZhdWx0IHN0YXJ0dXAgc2FuZGJveFxuICAgIHRoaXMuc3RhcnQoKTtcbiAgICBzYW5kYm94TWFwLnNldCh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzID0gdGhpcy5nZXRNb2R1bGVEYXRhKCk7XG4gICAgY29uc3QgeyBjcmVhdGVkTGlzdCwgb3ZlcnJpZGVMaXN0IH0gPSB0aGlzLnJlcGxhY2VHbG9iYWxWYXJpYWJsZXM7XG4gICAgdGhpcy5nbG9iYWwgPSB0aGlzLmNyZWF0ZVByb3h5V2luZG93KE9iamVjdC5rZXlzKG92ZXJyaWRlTGlzdCkpO1xuXG4gICAgaWYgKG92ZXJyaWRlTGlzdCAmJiB0aGlzLmdsb2JhbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3ZlcnJpZGVMaXN0KSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsW2tleV0gPSBvdmVycmlkZUxpc3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNyZWF0ZWRMaXN0KSB7XG4gICAgICBjcmVhdGVkTGlzdC5mb3JFYWNoKChmbikgPT4gZm4gJiYgZm4odGhpcy5nbG9iYWwpKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZVdpdGgpIHtcbiAgICAgIHRoaXMub3B0aW1pemVDb2RlID0gdGhpcy5vcHRpbWl6ZUdsb2JhbE1ldGhvZCgpO1xuICAgIH1cbiAgICB0aGlzLmluaXRDb21wbGV0ZSA9IHRydWU7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuc3RhcmVkLmVtaXQodGhpcy5nbG9iYWwpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XG4gICAgdGhpcy5jbGVhckVmZmVjdHMoKTtcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgdGhpcy5nbG9iYWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcHRpbWl6ZUNvZGUgPSAnJztcbiAgICB0aGlzLmluaXRDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHRoaXMuZGVmZXJDbGVhckVmZmVjdHMuY2xlYXIoKTtcbiAgICB0aGlzLmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5jbGVhcigpO1xuICAgIHRoaXMuZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LmNsZWFyKCk7XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLmNyZWF0ZWRMaXN0ID0gW107XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLnByZXBhcmVMaXN0ID0gW107XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLnJlY292ZXJMaXN0ID0gW107XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLm92ZXJyaWRlTGlzdCA9IFtdO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgY3JlYXRlUHJveHlXaW5kb3cobW9kdWxlS2V5czogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgY29uc3QgZmFrZVdpbmRvdyA9IGNyZWF0ZUZha2VPYmplY3QoXG4gICAgICB3aW5kb3csXG4gICAgICB0aGlzLmlzSW5zdWxhdGlvblZhcmlhYmxlLFxuICAgICAgbWFrZU1hcChtb2R1bGVLZXlzKSxcbiAgICApO1xuXG4gICAgY29uc3QgYmFzZUhhbmRsZXJzID0ge1xuICAgICAgZ2V0OiBjcmVhdGVHZXR0ZXIodGhpcyksXG4gICAgICBzZXQ6IGNyZWF0ZVNldHRlcih0aGlzKSxcbiAgICAgIGRlZmluZVByb3BlcnR5OiBjcmVhdGVEZWZpbmVQcm9wZXJ0eSh0aGlzKSxcbiAgICAgIGRlbGV0ZVByb3BlcnR5OiBjcmVhdGVEZWxldGVQcm9wZXJ0eSh0aGlzKSxcbiAgICAgIGdldFByb3RvdHlwZU9mKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdyk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnRIYW5kbGVycyA9IHtcbiAgICAgIC4uLmJhc2VIYW5kbGVycyxcbiAgICAgIGhhczogY3JlYXRlSGFzKHRoaXMpLFxuICAgICAgZ2V0UHJvdG90eXBlT2YoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93KTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIEluIGZhY3QsIHRoZXkgYXJlIGFsbCBwcm94eSB3aW5kb3dzLCBidXQgdGhlIHByb2JsZW0gb2YgYHZhciBhID0geHhgIGNhbiBiZSBzb2x2ZWQgdGhyb3VnaCBoYXNcbiAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eShmYWtlV2luZG93LCBwYXJlbnRIYW5kbGVycyk7XG4gICAgY29uc3Qgc3ViUHJveHkgPSBuZXcgUHJveHkoZmFrZVdpbmRvdywgYmFzZUhhbmRsZXJzKTtcblxuICAgIHByb3h5LnNlbGYgPSBzdWJQcm94eTtcbiAgICBwcm94eS53aW5kb3cgPSBzdWJQcm94eTtcbiAgICBwcm94eS5nbG9iYWxUaGlzID0gc3ViUHJveHk7XG4gICAgcHJveHkuX19kZWJ1Z19zYW5kYm94X18gPSB0aGlzOyAvLyBUaGlzIGF0dHJpYnV0ZSBpcyB1c2VkIGZvciBkZWJ1Z2dlclxuICAgIHNhZmVXcmFwcGVyKCgpID0+IHtcbiAgICAgIC8vIENyb3NzLWRvbWFpbiBlcnJvcnMgbWF5IG9jY3VyIGR1cmluZyBhY2Nlc3NcbiAgICAgIHByb3h5LnRvcCA9IHdpbmRvdy50b3AgPT09IHdpbmRvdyA/IHN1YlByb3h5IDogd2luZG93LnRvcDtcbiAgICAgIHByb3h5LnBhcmVudCA9IHdpbmRvdy5wYXJlbnQgPT09IHdpbmRvdyA/IHN1YlByb3h5IDogd2luZG93LnBhcmVudDtcbiAgICB9KTtcblxuICAgIGFkZFByb3h5V2luZG93VHlwZShwcm94eSwgd2luZG93KTtcbiAgICByZXR1cm4gcHJveHk7XG4gIH1cblxuICBnZXRNb2R1bGVEYXRhKCkge1xuICAgIGNvbnN0IHJlY292ZXJMaXN0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IGNyZWF0ZWRMaXN0OiBBcnJheTwoY29udGV4dDogV2luZG93IHwgdW5kZWZpbmVkKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IHByZXBhcmVMaXN0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IG92ZXJyaWRlTGlzdCA9IHt9O1xuICAgIGNvbnN0IGFsbE1vZHVsZXMgPSBkZWZhdWx0TW9kdWxlcy5jb25jYXQodGhpcy5vcHRpb25zLm1vZHVsZXMgPz8gW10pO1xuXG4gICAgZm9yIChjb25zdCBtb2R1bGUgb2YgYWxsTW9kdWxlcykge1xuICAgICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgeyByZWNvdmVyLCBvdmVycmlkZSwgY3JlYXRlZCwgcHJlcGFyZSB9ID0gbW9kdWxlKHRoaXMpIHx8IHt9O1xuICAgICAgICBpZiAocmVjb3ZlcikgcmVjb3Zlckxpc3QucHVzaChyZWNvdmVyKTtcbiAgICAgICAgaWYgKGNyZWF0ZWQpIGNyZWF0ZWRMaXN0LnB1c2goY3JlYXRlZCk7XG4gICAgICAgIGlmIChwcmVwYXJlKSBwcmVwYXJlTGlzdC5wdXNoKHByZXBhcmUpO1xuICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAvLyBUaGUgbGF0dGVyIHdpbGwgb3ZlcndyaXRlIHRoZSBwcmV2aW91cyB2YXJpYWJsZVxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgb3ZlcnJpZGVMaXN0W2tleV0pIHtcbiAgICAgICAgICAgICAgd2FybihgXCIke2tleX1cIiBnbG9iYWwgdmFyaWFibGVzIGFyZSBvdmVyd3JpdHRlbi5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJyaWRlTGlzdFtrZXldID0gb3ZlcnJpZGVba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgcmVjb3Zlckxpc3QsIGNyZWF0ZWRMaXN0LCBvdmVycmlkZUxpc3QsIHByZXBhcmVMaXN0IH07XG4gIH1cblxuICBjbGVhckVmZmVjdHMoKSB7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlQ2xlYXJFZmZlY3QuZW1pdCgpO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcy5yZWNvdmVyTGlzdC5mb3JFYWNoKChmbikgPT4gZm4gJiYgZm4oKSk7XG4gICAgLy8gYGRlZmVyQ2xlYXJFZmZlY3RzYCBuZWVkcyB0byBiZSBwdXQgYXQgdGhlIGVuZFxuICAgIHRoaXMuZGVmZXJDbGVhckVmZmVjdHMuZm9yRWFjaCgoZm4pID0+IGZuICYmIGZuKCkpO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmFmdGVyQ2xlYXJFZmZlY3QuZW1pdCgpO1xuICB9XG5cbiAgb3B0aW1pemVHbG9iYWxNZXRob2QodGVtcEVudktleXM6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICAgIGxldCBjb2RlID0gJyc7XG4gICAgY29uc3QgbWV0aG9kcyA9IG9wdGltaXplTWV0aG9kcy5maWx0ZXIoKHApID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIC8vIElmIHRoZSBtZXRob2QgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQsIGRvIG5vdCBjYXJlXG4gICAgICAgIHAgJiZcbiAgICAgICAgIXRoaXMuaXNQcm90ZWN0VmFyaWFibGUocCkgJiZcbiAgICAgICAgIXRlbXBFbnZLZXlzLmluY2x1ZGVzKHApICYmXG4gICAgICAgIGhhc093bih0aGlzLmdsb2JhbCwgcClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpZiAobWV0aG9kcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb2RlID0gbWV0aG9kcy5yZWR1Y2UoKHByZXZDb2RlLCBuYW1lKSA9PiB7XG4gICAgICAgIC8vIENhbiBvbmx5IHVzZSBgbGV0YCwgaWYgeW91IHVzZSBgdmFyYCxcbiAgICAgICAgLy8gZGVjbGFyaW5nIHRoZSBjaGFyYWN0ZXJpc3RpY3MgaW4gYWR2YW5jZSB3aWxsIGNhdXNlIHlvdSB0byBmZXRjaCBmcm9tIHdpdGgsXG4gICAgICAgIC8vIHJlc3VsdGluZyBpbiBhIHJlY3Vyc2l2ZSBsb29wXG4gICAgICAgIHJldHVybiBgJHtwcmV2Q29kZX0gbGV0ICR7bmFtZX0gPSB3aW5kb3cuJHtuYW1lfTtgO1xuICAgICAgfSwgY29kZSk7XG5cbiAgICAgIGlmICh0aGlzLmdsb2JhbCkge1xuICAgICAgICB0aGlzLmdsb2JhbFtgJHtHQVJGSVNIX09QVElNSVpFX05BTUV9TWV0aG9kc2BdID0gbWV0aG9kcztcbiAgICAgICAgdGhpcy5nbG9iYWxbYCR7R0FSRklTSF9PUFRJTUlaRV9OQU1FfVVwZGF0ZVN0YWNrYF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIGNvZGUgKz0gYHdpbmRvdy4ke0dBUkZJU0hfT1BUSU1JWkVfTkFNRX1VcGRhdGVTdGFjay5wdXNoKGZ1bmN0aW9uKGssdil7ZXZhbChrK1wiPXZcIil9KTtgO1xuICAgIH1cblxuICAgIGlmICh0ZW1wRW52S2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb2RlID0gdGVtcEVudktleXMucmVkdWNlKChwcmV2Q29kZSwgbmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYCR7cHJldkNvZGV9IGxldCAke25hbWV9ID0gJHt0aGlzLmVudlZhcmlhYmxlfS4ke25hbWV9O2A7XG4gICAgICB9LCBjb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuICBjcmVhdGVFeGVjUGFyYW1zKGNvZGVSZWY6IHsgY29kZTogc3RyaW5nIH0sIGVudjogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIGNvbnN0IHsgZGlzYWJsZVdpdGggfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb25zdCB7IHByZXBhcmVMaXN0LCBvdmVycmlkZUxpc3QgfSA9IHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcztcblxuICAgIGlmIChwcmVwYXJlTGlzdCkge1xuICAgICAgcHJlcGFyZUxpc3QuZm9yRWFjaCgoZm4pID0+IGZuICYmIGZuKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHdpbmRvdzogdGhpcy5nbG9iYWwsXG4gICAgICAuLi5vdmVycmlkZUxpc3QsXG4gICAgfTtcblxuICAgIGlmIChkaXNhYmxlV2l0aCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIGVudik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVudktleXMgPSBPYmplY3Qua2V5cyhlbnYpO1xuICAgICAgY29uc3Qgb3B0aW1pemVDb2RlID1cbiAgICAgICAgZW52S2V5cy5sZW5ndGggPiAwXG4gICAgICAgICAgPyB0aGlzLm9wdGltaXplR2xvYmFsTWV0aG9kKGVudktleXMpXG4gICAgICAgICAgOiB0aGlzLm9wdGltaXplQ29kZTtcblxuICAgICAgY29kZVJlZi5jb2RlID0gYHdpdGgod2luZG93KSB7OyR7b3B0aW1pemVDb2RlICsgY29kZVJlZi5jb2RlfVxcbn1gO1xuICAgICAgcGFyYW1zW3RoaXMuZW52VmFyaWFibGVdID0gZW52O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwcm9jZXNzRXhlY0Vycm9yKFxuICAgIGU6IGFueSxcbiAgICB1cmw/OiBzdHJpbmcsXG4gICAgZW52PzogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgKSB7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuaW52b2tlRXJyb3IuZW1pdChlLCB1cmwsIGVudiwgb3B0aW9ucyk7XG4gICAgLy8gZGlzcGF0Y2ggYHdpbmRvdy5vbmVycm9yYFxuICAgIGlmICh0aGlzLmdsb2JhbCAmJiB0eXBlb2YgdGhpcy5nbG9iYWwub25lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgc291cmNlID0gdXJsIHx8IHRoaXMub3B0aW9ucy5iYXNlVXJsO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IFN0cmluZyhlKTtcbiAgICAgIHNhZmVXcmFwcGVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWw/Lm9uZXJyb3I/LmNhbGwodGhpcy5nbG9iYWwsIG1lc3NhZ2UsIHNvdXJjZSwgbnVsbCwgbnVsbCwgZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIGV4ZWNTY3JpcHQoXG4gICAgY29kZTogc3RyaW5nLFxuICAgIGVudiA9IHt9LFxuICAgIHVybCA9ICcnLFxuICAgIG9wdGlvbnM/OiBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zLFxuICApIHtcbiAgICBjb25zdCBjb2RlUmVmID0geyBjb2RlIH07XG4gICAgY29uc3QgeyBhc3luYyB9ID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUludm9rZS5lbWl0KGNvZGVSZWYsIHVybCwgZW52LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHJldmVydEN1cnJlbnRTY3JpcHQgPSBzZXREb2NDdXJyZW50U2NyaXB0KFxuICAgICAgdGhpcy5nbG9iYWw/LmRvY3VtZW50LFxuICAgICAgY29kZVJlZi5jb2RlLFxuICAgICAgZmFsc2UsXG4gICAgICB1cmwsXG4gICAgICBhc3luYyxcbiAgICAgIG9wdGlvbnM/Lm9yaWdpblNjcmlwdCxcbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY3JlYXRlRXhlY1BhcmFtcyhjb2RlUmVmLCBlbnYpO1xuICAgICAgY29kZVJlZi5jb2RlICs9IGBcXG4ke3VybCA/IGAvLyMgc291cmNlVVJMPSR7dXJsfVxcbmAgOiAnJ31gO1xuICAgICAgZXZhbFdpdGhFbnYoY29kZVJlZi5jb2RlLCBwYXJhbXMsIHRoaXMuZ2xvYmFsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnByb2Nlc3NFeGVjRXJyb3IoZSwgdXJsLCBlbnYsIG9wdGlvbnMpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKHJldmVydEN1cnJlbnRTY3JpcHQpO1xuICAgIH1cblxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmFmdGVySW52b2tlLmVtaXQoY29kZVJlZiwgdXJsLCBlbnYsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGdldE5hdGl2ZVdpbmRvdygpIHtcbiAgICBsZXQgbW9kdWxlID0gd2luZG93O1xuICAgIHdoaWxlIChpc01vZHVsZShtb2R1bGUpKSB7XG4gICAgICBtb2R1bGUgPSBtb2R1bGVbX19nYXJmaXNoR2xvYmFsX18gYXMgYW55XSBhcyBXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1vZHVsZTtcbiAgfVxuXG4gIHN0YXRpYyBjYW5TdXBwb3J0KCkge1xuICAgIGxldCBzdXBwb3J0ID0gdHJ1ZTtcbiAgICBpZiAoXG4gICAgICAhd2luZG93LlByb3h5IHx8XG4gICAgICAhQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzIHx8XG4gICAgICAhU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc1xuICAgICkge1xuICAgICAgc3VwcG9ydCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBsZXQgc3RhdGVtZW50XG4gICAgaWYgKHN1cHBvcnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBGdW5jdGlvbignbGV0IGEgPSA2NjY7Jyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHN1cHBvcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzdXBwb3J0KSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnVGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBcInZtIHNhbmRib3hcIiwnICtcbiAgICAgICAgICAnUGxlYXNlIHVzZSB0aGUgXCJzbmFwc2hvdCBzYW5kYm94XCIgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cHBvcnQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBoYXNPd24sIG1ha2VNYXAgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyB2ZXJpZnlTZXR0ZXIgfSBmcm9tICcuLi9wcm94eUludGVyY2VwdG9yL3NoYXJlZCc7XG5cbi8vIENhbid0IHNldCB0byBwcm94eSBoaXN0b3J5IHZhcmlhYmxlXG5jb25zdCBwYXNzZWRLZXkgPSBtYWtlTWFwKFsnc2Nyb2xsUmVzdG9yYXRpb24nXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBoaXN0b3J5TW9kdWxlKCkge1xuICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cuaGlzdG9yeSkgfHwgSGlzdG9yeS5wcm90b3R5cGU7XG4gIGNvbnN0IGZha2VIaXN0b3J5ID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG5cbiAgY29uc3QgcHJveHlIaXN0b3J5ID0gbmV3IFByb3h5KGZha2VIaXN0b3J5LCB7XG4gICAgZ2V0KHRhcmdldDogYW55LCBwOiBQcm9wZXJ0eUtleSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBoYXNPd24odGFyZ2V0LCBwKSA/IHRhcmdldFtwXSA6IHdpbmRvdy5oaXN0b3J5W3BdO1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmJpbmQod2luZG93Lmhpc3RvcnkpIDogdmFsdWU7XG4gICAgfSxcblxuICAgIHNldCh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXksIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpIHtcbiAgICAgIGNvbnN0IGlzUGFzc0tleSA9IHR5cGVvZiBwID09PSAnc3RyaW5nJyAmJiBwYXNzZWRLZXkocCk7XG4gICAgICBjb25zdCB2ZXJpZnlTZXR0ZXJSZXN1bHQgPSB2ZXJpZnlTZXR0ZXIoXG4gICAgICAgIGlzUGFzc0tleSA/IGhpc3RvcnkgOiBudWxsLFxuICAgICAgICB0YXJnZXQsXG4gICAgICAgIHAsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICByZWNlaXZlcixcbiAgICAgICk7XG4gICAgICBpZiAodmVyaWZ5U2V0dGVyUmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZlcmlmeVNldHRlclJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpc1Bhc3NLZXlcbiAgICAgICAgICA/IFJlZmxlY3Quc2V0KGhpc3RvcnksIHAsIHZhbHVlKVxuICAgICAgICAgIDogUmVmbGVjdC5zZXQodGFyZ2V0LCBwLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gXCJfX3Byb3RvX19cIiBpcyBub3QgYSBzdGFuZGFyZCBhdHRyaWJ1dGUsIGl0IGlzIHRlbXBvcmFyaWx5IG5vdCBjb21wYXRpYmxlXG4gICAgZ2V0UHJvdG90eXBlT2YoKSB7XG4gICAgICByZXR1cm4gZmFrZUhpc3Rvcnk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZmFrZUhpc3RvcnlDdG9yID0gZnVuY3Rpb24gSGlzdG9yeSgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIGNvbnN0cnVjdG9yJyk7XG4gIH07XG4gIC8vIEF2b2lkIHNpZGUgZWZmZWN0cyBvZiBwcm90b3R5cGUgY2hhaW4gYmVpbmcgY2hhbmdlZFxuICBmYWtlSGlzdG9yeUN0b3IucHJvdG90eXBlID0gZmFrZUhpc3Rvcnk7XG4gIGZha2VIaXN0b3J5Q3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBmYWtlSGlzdG9yeUN0b3I7XG5cbiAgcmV0dXJuIHtcbiAgICBvdmVycmlkZToge1xuICAgICAgaGlzdG9yeTogcHJveHlIaXN0b3J5LFxuICAgICAgSGlzdG9yeTogZmFrZUhpc3RvcnlDdG9yLFxuICAgIH0sXG4gIH07XG59XG4iLCAiaW1wb3J0IHsgd2FybiwgbWFrZU1hcCwgaXNPYmplY3QgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBoYW5kbGVyUGFyYW1zIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhRGVzY3JpcHRvcihkZXNjPzogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICd2YWx1ZScgaW4gZGVzYyB8fCAnd3JpdGFibGUnIGluIGRlc2M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjY2Vzc29yRGVzY3JpcHRvcihkZXNjPzogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICdnZXQnIGluIGRlc2MgfHwgJ3NldCcgaW4gZGVzYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeUdldHRlckRlc2NyaXB0b3IoXG4gIHRhcmdldDogYW55LFxuICBwOiBQcm9wZXJ0eUtleSxcbiAgbmV3VmFsdWU6IGFueSxcbikge1xuICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHApO1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb3h5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90cy1nZXQtcC1yZWNlaXZlclxuICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgIGlmIChpc0RhdGFEZXNjcmlwdG9yKGRlc2MpICYmIGRlc2Mud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5pc1xuICAgICAgaWYgKCFPYmplY3QuaXMobmV3VmFsdWUsIGRlc2MudmFsdWUpKSB7XG4gICAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgIHdhcm4oYHByb3BlcnR5IFwiJHtTdHJpbmcocCl9XCIgaXMgbm9uLWNvbmZpZ3VyYWJsZSBhbmQgbm9uLXdyaXRhYmxlLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNBY2Nlc3NvckRlc2NyaXB0b3IoZGVzYykgJiYgZGVzYy5nZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5U2V0dGVyKFxuICBwcm94eVRhcmdldDogYW55LFxuICB0YXJnZXQ6IGFueSxcbiAgcDogUHJvcGVydHlLZXksXG4gIHZhbDogYW55LFxuICByZWNlaXZlcjogYW55LFxuKSB7XG4gIGNvbnN0IHZlcmlmeVJlc3VsdCA9IHZlcmlmeVNldHRlckRlc2NyaXB0b3IoXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcHJveHlUYXJnZXQgPyBwcm94eVRhcmdldCA6IChyZWNlaXZlciB8fCB0YXJnZXQpLFxuICAgIHAsXG4gICAgdmFsLFxuICApO1xuXG4gIGxldCByZXN1bHQ7XG4gIGlmICh2ZXJpZnlSZXN1bHQgPiAwKSB7XG4gICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMSB8fCB2ZXJpZnlSZXN1bHQgPT09IDIpIHJlc3VsdCA9IGZhbHNlO1xuICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDMpIHJlc3VsdCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcihcbiAgdGFyZ2V0OiBhbnksXG4gIHA6IFByb3BlcnR5S2V5LFxuICBuZXdWYWx1ZTogYW55LFxuKSB7XG4gIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcCk7XG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJveHktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzLXNldC1wLXYtcmVjZWl2ZXJcbiAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCAmJiBkZXNjLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICBpZiAoaXNEYXRhRGVzY3JpcHRvcihkZXNjKSAmJiBkZXNjLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuaXNcbiAgICAgIGlmICghT2JqZWN0LmlzKG5ld1ZhbHVlLCBkZXNjLnZhbHVlKSkge1xuICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICB3YXJuKGBwcm9wZXJ0eSBcIiR7U3RyaW5nKHApfVwiIGlzIG5vbi1jb25maWd1cmFibGUgYW5kIG5vbi13cml0YWJsZS5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNBY2Nlc3NvckRlc2NyaXB0b3IoZGVzYykgJiYgZGVzYy5zZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBzYWZlVG9TdHJpbmcodGhpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdGhpbmcudG9TdHJpbmcoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAnW3RvU3RyaW5nIGZhaWxlZF0nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGZuOiAoKSA9PiB2b2lkIHwgRnVuY3Rpb25Db25zdHJ1Y3Rvcikge1xuICBjb25zdCBmcCA9IGZuLnByb3RvdHlwZTtcbiAgY29uc3QgaGFzQ29uc3RydWN0b3IgPVxuICAgIGZwICYmIGZwLmNvbnN0cnVjdG9yID09PSBmbiAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhmcCkubGVuZ3RoID4gMTtcbiAgY29uc3QgZnVuY3Rpb25TdHIgPSAhaGFzQ29uc3RydWN0b3IgJiYgc2FmZVRvU3RyaW5nKGZuKTtcblxuICByZXR1cm4gKFxuICAgIGhhc0NvbnN0cnVjdG9yIHx8XG4gICAgL15mdW5jdGlvblxccytbQS1aXS8udGVzdChmdW5jdGlvblN0cikgfHxcbiAgICAvXmNsYXNzXFxiLy50ZXN0KGZ1bmN0aW9uU3RyKVxuICApO1xufVxuXG5jb25zdCBidWlsZEluUHJvcHMgPSBtYWtlTWFwKFtcbiAgJ2xlbmd0aCcsXG4gICdjYWxsZXInLFxuICAnY2FsbGVlJyxcbiAgJ2FyZ3VtZW50cycsXG4gICdwcm90b3R5cGUnLFxuICBTeW1ib2wuaGFzSW5zdGFuY2UsXG5dKTtcblxuZnVuY3Rpb24gdHJhbnNmZXJQcm9wcyhvOiBGdW5jdGlvbiwgbjogRnVuY3Rpb24pIHtcbiAgZm9yIChjb25zdCBrZXkgb2YgUmVmbGVjdC5vd25LZXlzKG8pKSB7XG4gICAgaWYgKGJ1aWxkSW5Qcm9wcyhrZXkpKSBjb250aW51ZTtcbiAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuLCBrZXkpO1xuICAgIGlmIChkZXNjICYmIGRlc2Mud3JpdGFibGUpIHtcbiAgICAgIG5ba2V5XSA9IG9ba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuLy8gMS4gVGhpcyBwb2ludHMgdG8gdGhlIGNvbnRleHQgb2YgdGhlIGZuIHRhcmdldCBmdW5jdGlvblxuLy8gMi4gQXNzdXJlIHRoZSBnb2FsIGFmdGVyIHRoZSBiaW5kIGZ1bmN0aW9uIHByb3RvdHlwZSBtZXRob2QgYmUgcmVwbGFjZWQgYWZ0ZXIgdGhlIHByb3RvdHlwZSBtZXRob2Qgd291bGQgbm90IGJlIGFmZmVjdGVkXG4vLyAzLiBBc3N1cmUgdGhlIG9iamVjdGl2ZSBmdW5jdGlvbiBhZnRlciB0aGUgYmluZCBpbnN0YW5jZW9mIGluIGxpbmUgd2l0aCBleHBlY3RhdGlvbnNcbi8vIDQuIEVuc3VyZSB0aGF0IGJpbmQgYWZ0ZXIgdGhlIG9iamVjdGl2ZSBmdW5jdGlvbiBvZiBub3JtYWwgc3RhdGljIG1ldGhvZHMgYXZhaWxhYmxlXG4vLyA1LiBBZnRlciB0aGUgYmluZCBhZnRlciB0aGUgb2JqZWN0aXZlIGZ1bmN0aW9uIGlzIG5ldyB0byBpbnN0YW50aWF0ZSwgcG9pbnRpbmcgdG8gdGhlaXIgb3duXG5leHBvcnQgZnVuY3Rpb24gYmluZChmbiwgY29udGV4dDogYW55KSB7XG4gIGNvbnN0IGZOT1AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgZnVuY3Rpb24gYm91bmQodGhpczogYW55KSB7XG4gICAgY29uc3QgYXJncyA9IGhhbmRsZXJQYXJhbXMoYXJndW1lbnRzKTtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG4gICAgICBjb25zdCBvYmogPSBuZXcgZm4oLi4uYXJncyk7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yob2JqLCBib3VuZC5wcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlY29yZCBvcmlnaW4gZnVuY3Rpb25cbiAgYm91bmQuJG5hdGl2ZSA9IGZuO1xuICB0cmFuc2ZlclByb3BzKGZuLCBib3VuZCk7XG5cbiAgaWYgKGZuLnByb3RvdHlwZSkge1xuICAgIC8vIGBGdW5jdGlvbi5wcm90b3R5cGVgIGRvZXNuJ3QgaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eVxuICAgIGZOT1AucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICB9XG4gIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgLy8gZml4IFwiaW5zdGFuY2VvZlwiXG4gIGlmIChTeW1ib2wuaGFzSW5zdGFuY2UpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYm91bmQsIFN5bWJvbC5oYXNJbnN0YW5jZSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWUoaW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3Qgb3AgPSBmbi5wcm90b3R5cGU7XG4gICAgICAgIHJldHVybiBpc09iamVjdChvcCkgfHwgdHlwZW9mIG9wID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBpbnN0YW5jZSBpbnN0YW5jZW9mIGZuXG4gICAgICAgICAgOiBmYWxzZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kO1xufVxuIiwgImltcG9ydCB7IGhhc093biwgbWFrZU1hcCwgbmV4dFRpY2sgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi9zYW5kYm94JztcbmltcG9ydCB7IEZha2VXaW5kb3cgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gIF9fcHJveHlOb2RlX18sXG4gIF9fc2FuZGJveE1hcF9fLFxuICBfX2VsZW1lbnRTYW5kYm94VGFnX18sXG59IGZyb20gJy4vc3ltYm9sVHlwZXMnO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLXByb3BlcnRpZXMtb2YtdGhlLWdsb2JhbC1vYmplY3RcbmNvbnN0IGVzR2xvYmFsTWV0aG9kcyA9XG4gIC8vIEZ1bmN0aW9uIHByb3BlcnRpZXMgb2YgdGhlIGdsb2JhbCBvYmplY3QgLy8gRnVuY3Rpb24gcHJvcGVydGllcyBvZiB0aGUgZ2xvYmFsIG9iamVjdFxuICAoXG4gICAgJ2V2YWwsaXNGaW5pdGUsaXNOYU4scGFyc2VGbG9hdCxwYXJzZUludCwnICtcbiAgICAvLyBVUkwgaGFuZGxpbmcgZnVuY3Rpb25zXG4gICAgJ2RlY29kZVVSSSxkZWNvZGVVUklDb21wb25lbnQsZW5jb2RlVVJJLGVuY29kZVVSSUNvbXBvbmVudCwnICtcbiAgICAvLyBDb25zdHJ1Y3RvciBwcm9wZXJ0aWVzIG9mIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgJ0FycmF5LEFycmF5QnVmZmVyLEJpZ0ludCxCaWdJbnQ2NEFycmF5LEJpZ1VpbnQ2NEFycmF5LEJvb2xlYW4sRGF0YVZpZXcsRGF0ZSxFcnJvcixFdmFsRXJyb3IsJyArXG4gICAgJ0ZpbmFsaXphdGlvblJlZ2lzdHJ5LEZsb2F0MzJBcnJheSxGbG9hdDY0QXJyYXksRnVuY3Rpb24sSW50OEFycmF5LEludDE2QXJyYXksSW50MzJBcnJheSxNYXAsTnVtYmVyLCcgK1xuICAgICdPYmplY3QsUHJvbWlzZSxQcm94eSxSYW5nZUVycm9yLFJlZmVyZW5jZUVycm9yLFJlZ0V4cCxTZXQsU2hhcmVkQXJyYXlCdWZmZXIsU3RyaW5nLFN5bWJvbCxTeW50YXhFcnJvciwnICtcbiAgICAnVHlwZUVycm9yLFVpbnQ4QXJyYXksVWludDhDbGFtcGVkQXJyYXksVWludDE2QXJyYXksVWludDMyQXJyYXksVVJJRXJyb3IsV2Vha01hcCxXZWFrUmVmLFdlYWtTZXQsJyArXG4gICAgLy8gT3RoZXIgUHJvcGVydGllcyBvZiB0aGUgR2xvYmFsIE9iamVjdFxuICAgICdBdG9taWNzLEpTT04sTWF0aCxSZWZsZWN0LCdcbiAgKS5zcGxpdCgnLCcpO1xuXG5jb25zdCBuYXRpdmVDb2RlTWV0aG9kcyA9ICdoYXNPd25Qcm9wZXJ0eSwnLnNwbGl0KCcsJyk7XG5cbmV4cG9ydCBjb25zdCBpc0VzR2xvYmFsTWV0aG9kcyA9IG1ha2VNYXAoZXNHbG9iYWxNZXRob2RzKTtcbmV4cG9ydCBjb25zdCBpc05hdGl2ZUNvZGVNZXRob2RzID0gbWFrZU1hcChuYXRpdmVDb2RlTWV0aG9kcyk7XG5cbi8vIE5lZWQgdG8gb3B0aW1pemUsIGF2b2lkIGZyb20gdGhlIHdpdGhcbi8vIENhbid0IGZpbHRlciBkb2N1bWVudCwgZXZhbCBrZXl3b3Jkcywgc3VjaCBhcyBkb2N1bWVudCBpbiBoYW5kbGluZyBwYXJlbnROb2RlIHVzZWZ1bFxuZXhwb3J0IGNvbnN0IG9wdGltaXplTWV0aG9kcyA9IFsuLi5lc0dsb2JhbE1ldGhvZHNdLmZpbHRlcigodikgPT4gdiAhPT0gJ2V2YWwnKTtcblxuLy8gVGhlIHNhbmRib3ggbWF5IGJlIHVzZWQgYWxvbmUsIHRvIGVuc3VyZSB0aGF0IHRoZSBgc2FuZGJveE1hcGAgaXMgZ2xvYmFsbHkgdW5pcXVlLFxuLy8gYmVjYXVzZSB3ZSB3aWxsIG9ubHkgcmV3cml0ZSBgYXBwZW5kQ2hpbGRgIG9uY2VcbmxldCBzYW5kYm94TGlzdDogTWFwPG51bWJlciwgU2FuZGJveD4gPSBuZXcgTWFwKCk7XG5pZiAoISh3aW5kb3cgYXMgRmFrZVdpbmRvdylbX19zYW5kYm94TWFwX19dKSB7XG4gICh3aW5kb3cgYXMgRmFrZVdpbmRvdylbX19zYW5kYm94TWFwX19dID0gc2FuZGJveExpc3Q7XG59IGVsc2Uge1xuICBzYW5kYm94TGlzdCA9ICh3aW5kb3cgYXMgRmFrZVdpbmRvdylbX19zYW5kYm94TWFwX19dO1xufVxuXG5leHBvcnQgY29uc3Qgc2FuZGJveE1hcCA9IHtcbiAgc2FuZGJveE1hcDogc2FuZGJveExpc3QsXG5cbiAgZ2V0KGVsZW1lbnQ6IEVsZW1lbnQpOiBTYW5kYm94IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcbiAgICBjb25zdCBzYW5kYm94SWQgPSBlbGVtZW50W19fZWxlbWVudFNhbmRib3hUYWdfX107XG4gICAgaWYgKHR5cGVvZiBzYW5kYm94SWQgIT09ICdudW1iZXInKSByZXR1cm47XG4gICAgcmV0dXJuIHRoaXMuc2FuZGJveE1hcC5nZXQoc2FuZGJveElkKTtcbiAgfSxcblxuICBzZXRFbGVtZW50VGFnKGVsZW1lbnQ6IEVsZW1lbnQsIHNhbmRib3g6IFNhbmRib3gpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcbiAgICBlbGVtZW50W19fZWxlbWVudFNhbmRib3hUYWdfX10gPSBzYW5kYm94LmlkO1xuICB9LFxuXG4gIHNldChzYW5kYm94OiBTYW5kYm94KSB7XG4gICAgaWYgKHRoaXMuc2FuZGJveE1hcC5nZXQoc2FuZGJveC5pZCkpIHJldHVybjtcbiAgICB0aGlzLnNhbmRib3hNYXAuc2V0KHNhbmRib3guaWQsIHNhbmRib3gpO1xuICB9LFxuXG4gIGRlbChzYW5kYm94OiBTYW5kYm94KSB7XG4gICAgdGhpcy5zYW5kYm94TWFwLmRlbGV0ZShzYW5kYm94LmlkKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVyUGFyYW1zKGFyZ3M6IElBcmd1bWVudHMgfCBBcnJheTxhbnk+KSB7XG4gIGFyZ3MgPSBBcnJheS5pc0FycmF5KGFyZ3MpID8gYXJncyA6IEFycmF5LmZyb20oYXJncyk7XG4gIHJldHVybiBhcmdzLm1hcCgodikgPT4ge1xuICAgIHJldHVybiB2ICYmIHZbX19wcm94eU5vZGVfX10gPyB2W19fcHJveHlOb2RlX19dIDogdjtcbiAgfSk7XG59XG5cbi8vIENvbnRhaW5lciBub2RlLCBiZWNhdXNlIGl0IGNoYW5nZXMgYWxsIHRoZSB0aW1lLCB0YWtlIGl0IGFzIHlvdSB1c2UgaXRcbmV4cG9ydCBmdW5jdGlvbiByb290RWxtKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgY29uc3QgY29udGFpbmVyID0gc2FuZGJveCAmJiBzYW5kYm94Lm9wdGlvbnMuZWw7XG4gIHJldHVybiBjb250YWluZXIgJiYgY29udGFpbmVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luSWZyYW1lKCkge1xuICByZXR1cm4gd2luZG93Py5wYXJlbnQ/Ll9fR0FSRklTSF9fICE9PSB3aW5kb3c/Ll9fR0FSRklTSF9fO1xufVxuXG4vLyBDb3B5IFwid2luZG93XCIgYW5kIFwiZG9jdW1lbnRcIlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZha2VPYmplY3QoXG4gIHRhcmdldDogUmVjb3JkPFByb3BlcnR5S2V5LCBhbnk+LFxuICBmaWx0ZXI/OiAoa2V5OiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbixcbiAgaXNXcml0YWJsZT86IChrZXk6IFByb3BlcnR5S2V5KSA9PiBib29sZWFuLFxuKSB7XG4gIGNvbnN0IGZha2VPYmplY3QgPSB7fTtcbiAgY29uc3QgcHJvcGVydHlNYXAgPSB7fTtcbiAgY29uc3Qgc3RvcmFnZUJveCA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIFN0b3JlIGNoYW5nZWQgdmFsdWVcbiAgY29uc3QgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIGNvbnN0IGRlZiA9IChwOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHApO1xuXG4gICAgaWYgKGRlc2NyaXB0b3I/LmNvbmZpZ3VyYWJsZSkge1xuICAgICAgY29uc3QgaGFzR2V0dGVyID0gaGFzT3duKGRlc2NyaXB0b3IsICdnZXQnKTtcbiAgICAgIGNvbnN0IGhhc1NldHRlciA9IGhhc093bihkZXNjcmlwdG9yLCAnc2V0Jyk7XG4gICAgICBjb25zdCBjYW5Xcml0YWJsZSA9IHR5cGVvZiBpc1dyaXRhYmxlID09PSAnZnVuY3Rpb24nICYmIGlzV3JpdGFibGUocCk7XG5cbiAgICAgIGlmIChoYXNHZXR0ZXIpIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gKCkgPT4gaGFzT3duKHN0b3JhZ2VCb3gsIHApXG4gICAgICAgICAgPyBzdG9yYWdlQm94W3BdXG4gICAgICAgICAgOiB0YXJnZXRbcF07XG4gICAgICB9XG4gICAgICBpZiAoaGFzU2V0dGVyKSB7XG4gICAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKHZhbCkgPT4ge1xuICAgICAgICAgIHN0b3JhZ2VCb3hbcF0gPSB2YWw7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoY2FuV3JpdGFibGUpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzR2V0dGVyKSB7XG4gICAgICAgICAgZGVzY3JpcHRvci5zZXQgPSAodmFsKSA9PiB7XG4gICAgICAgICAgICBzdG9yYWdlQm94W3BdID0gdmFsO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZha2VPYmplY3QsIHAsIE9iamVjdC5mcmVlemUoZGVzY3JpcHRvcikpO1xuICAgIH1cbiAgfTtcbiAgcHJvcGVydHlOYW1lcy5mb3JFYWNoKChwKSA9PiB7XG4gICAgcHJvcGVydHlNYXBbcF0gPSB0cnVlO1xuICAgIHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicgPyAhZmlsdGVyKHApICYmIGRlZihwKSA6IGRlZihwKTtcbiAgfSk7XG4gIC8vIFwicHJvcFwiIG1heWJlIGluIHByb3RvdHlwZSBjaGFpblxuICBmb3IgKGNvbnN0IHByb3AgaW4gdGFyZ2V0KSB7XG4gICAgIXByb3BlcnR5TWFwW3Byb3BdICYmIGRlZihwcm9wKTtcbiAgfVxuICByZXR1cm4gZmFrZU9iamVjdCBhcyBhbnk7XG59XG5cbmxldCBzZXR0aW5nID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBtaWNyb1Rhc2tIdG1sUHJveHlEb2N1bWVudChwcm94eURvY3VtZW50KSB7XG4gIC8vIFRoZSBIVE1MIHBhcmVudCBub2RlIGludG8gYWdlbnQgZm9yIHRoZSBkb2N1bWVudFxuICAvLyBJbiBtaWNybyB0YXNrcyByZXBsYWNlIHByaW1hcnkgbm9kZVxuICBjb25zdCBodG1sID0gZG9jdW1lbnQuY2hpbGRyZW5bMF07XG4gIGlmIChodG1sICYmIGh0bWwucGFyZW50Tm9kZSAhPT0gcHJveHlEb2N1bWVudCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShodG1sLCAncGFyZW50Tm9kZScsIHtcbiAgICAgIHZhbHVlOiBwcm94eURvY3VtZW50LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgaWYgKHNldHRpbmcpIHtcbiAgICAgIHNldHRpbmcgPSBmYWxzZTtcbiAgICAgIC8vIERvIG5vdCB1c2UgbWljcm8gdGFza3MsIEVsZW1lbnQgd2lsbCBhcHBlYXIgaW4gdGhlIHRhc2sgcGxhY2VkIGluIG5leHRUaWNrIGFmdGVyIG5vZGVcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgc2V0dGluZyA9IHRydWU7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShodG1sLCAncGFyZW50Tm9kZScsIHtcbiAgICAgICAgICB2YWx1ZTogZG9jdW1lbnQsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHlsZWRDb21wb25lbnRzTGlrZShlbGVtZW50OiBIVE1MU3R5bGVFbGVtZW50KSB7XG4gIC8vIEEgc3R5bGVkLWNvbXBvbmVudHMgbGlrZWQgZWxlbWVudCBoYXMgbm8gdGV4dENvbnRlbnQgYnV0IGtlZXAgdGhlIHJ1bGVzIGluIGl0cyBzaGVldC5jc3NSdWxlcy5cbiAgcmV0dXJuIChcbiAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFN0eWxlRWxlbWVudCAmJlxuICAgICFlbGVtZW50LnRleHRDb250ZW50ICYmXG4gICAgZWxlbWVudC5zaGVldD8uY3NzUnVsZXMubGVuZ3RoXG4gICk7XG59XG4iLCAiZXhwb3J0IGNvbnN0IEdBUkZJU0hfTkFNRVNQQUNFX1BSRUZJWCA9ICdfX0dhcmZpc2hfXyc7XG5leHBvcnQgY29uc3QgR0FSRklTSF9PUFRJTUlaRV9OQU1FID0gJ19fZ2FyZmlzaF9vcHRpbWl6ZV9fJztcbmV4cG9ydCBjb25zdCBfX3Byb3h5Tm9kZV9fID0gU3ltYm9sLmZvcignZ2FyZmlzaC5wcm94eU5vZGUnKTtcbmV4cG9ydCBjb25zdCBfX2RvbVdyYXBwZXJfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2guZG9tV3JhcHBlcicpO1xuZXhwb3J0IGNvbnN0IF9fd2luZG93QmluZF9fID0gU3ltYm9sLmZvcignZ2FyZmlzaC53aW5kb3dCaW5kJyk7XG5leHBvcnQgY29uc3QgX19zYW5kYm94TWFwX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLnNhbmRib3hNYXAnKTtcbmV4cG9ydCBjb25zdCBfX2RvY3VtZW50QmluZF9fID0gU3ltYm9sLmZvcignZ2FyZmlzaC5kb2N1bWVudEJpbmQnKTtcbmV4cG9ydCBjb25zdCBfX2dhcmZpc2hHbG9iYWxfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2guZ2xvYmFsT2JqZWN0Jyk7XG5leHBvcnQgY29uc3QgX19lbGVtZW50U2FuZGJveFRhZ19fID0gU3ltYm9sLmZvcignZ2FyZmlzaC5lbGVtZW50U2FuZGJveFRhZycpO1xuIiwgImltcG9ydCB7XG4gIGhhc093bixcbiAgaXNQcm9taXNlLFxuICBpc0Fic29sdXRlLFxuICB0cmFuc2Zvcm1VcmwsXG4gIHRvV3NQcm90b2NvbCxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV0d29ya01vZHVsZShzYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IGJhc2VVcmwgPSBzYW5kYm94Lm9wdGlvbnMuYmFzZVVybDtcbiAgY29uc3Qgd3NTZXQgPSBuZXcgU2V0PGZha2VXZWJTb2NrZXQ+KCk7XG4gIGNvbnN0IHhoclNldCA9IG5ldyBTZXQ8ZmFrZVhNTEh0dHBSZXF1ZXN0PigpO1xuICBjb25zdCBmZXRjaFNldCA9IG5ldyBTZXQ8QWJvcnRDb250cm9sbGVyPigpO1xuICBjb25zdCBuZWVkRml4ID0gKHVybCkgPT5cbiAgICBzYW5kYm94Lm9wdGlvbnMuZml4QmFzZVVybCAmJlxuICAgIGJhc2VVcmwgJiZcbiAgICB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyAmJlxuICAgICFpc0Fic29sdXRlKHVybCk7XG5cbiAgY2xhc3MgZmFrZVhNTEh0dHBSZXF1ZXN0IGV4dGVuZHMgWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHhoclNldC5hZGQodGhpcyk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgIC8vIEFzeW5jIHJlcXVlc3RcbiAgICAgIGlmIChhcmd1bWVudHNbMl0gPT09IGZhbHNlKSB7XG4gICAgICAgIHhoclNldC5kZWxldGUodGhpcyk7XG4gICAgICB9XG4gICAgICBpZiAobmVlZEZpeChhcmd1bWVudHNbMV0pKSB7XG4gICAgICAgIGFyZ3VtZW50c1sxXSA9IGJhc2VVcmxcbiAgICAgICAgICA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBhcmd1bWVudHNbMV0pXG4gICAgICAgICAgOiBhcmd1bWVudHNbMV07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgaWYoc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3Qpe1xuICAgICAgICBzYW5kYm94Lm9wdGlvbnMuYWRkU291cmNlTGlzdCh7XG4gICAgICAgICAgdGFnTmFtZTogJ3htbGh0dHByZXF1ZXN0JyxcbiAgICAgICAgICB1cmwsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cGVyLm9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBhYm9ydCgpIHtcbiAgICAgIHhoclNldC5kZWxldGUodGhpcyk7XG4gICAgICByZXR1cm4gc3VwZXIuYWJvcnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBmYWtlV2ViU29ja2V0IGV4dGVuZHMgV2ViU29ja2V0IHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHByb3RvY29scz86IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICBpZiAobmVlZEZpeCh1cmwpICYmIGJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVdzVXJsID0gdG9Xc1Byb3RvY29sKGJhc2VVcmwpO1xuICAgICAgICB1cmwgPSB0cmFuc2Zvcm1VcmwoYmFzZVdzVXJsLCBhcmd1bWVudHNbMV0pO1xuICAgICAgfVxuICAgICAgc3VwZXIodXJsLCBwcm90b2NvbHMpO1xuICAgICAgd3NTZXQuYWRkKHRoaXMpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgd3NTZXQuZGVsZXRlKHRoaXMpO1xuICAgICAgcmV0dXJuIHN1cGVyLmNsb3NlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLy8gYGZldGNoYCBpcyBub3QgY29uc3RydWN0b3JcbiAgY29uc3QgZmFrZUZldGNoID0gKGlucHV0LCBvcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHt9KSA9PiB7XG4gICAgaWYgKG5lZWRGaXgoaW5wdXQpICYmIGJhc2VVcmwpIHtcbiAgICAgIGlucHV0ID0gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIGlucHV0KTtcbiAgICB9XG4gICAgaWYoc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3Qpe1xuICAgICAgc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3QoeyB0YWdOYW1lOiAnZmV0Y2gnLCB1cmw6IGlucHV0IH0pO1xuICAgIH1cbiAgICBsZXQgY29udHJvbGxlcjtcbiAgICBpZiAoIWhhc093bihvcHRpb25zLCAnc2lnbmFsJykgJiYgd2luZG93LkFib3J0Q29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlciA9IG5ldyB3aW5kb3cuQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBmZXRjaFNldC5hZGQoY29udHJvbGxlcik7XG4gICAgICBvcHRpb25zLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB3aW5kb3cuZmV0Y2goaW5wdXQsIG9wdGlvbnMpO1xuICAgIHJldHVybiBjb250cm9sbGVyICYmIGlzUHJvbWlzZShyZXN1bHQpXG4gICAgICA/IHJlc3VsdC5maW5hbGx5KCgpID0+IGZldGNoU2V0LmRlbGV0ZShjb250cm9sbGVyKSlcbiAgICAgIDogcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIFdlYlNvY2tldDogZmFrZVdlYlNvY2tldCBhcyBhbnksXG4gICAgICBYTUxIdHRwUmVxdWVzdDogZmFrZVhNTEh0dHBSZXF1ZXN0IGFzIGFueSxcbiAgICAgIGZldGNoOiBmYWtlRmV0Y2gsXG4gICAgfSxcblxuICAgIHJlY292ZXIoKSB7XG4gICAgICB3c1NldC5mb3JFYWNoKCh3cykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHdzLmNsb3NlID09PSAnZnVuY3Rpb24nKSB3cy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICB4aHJTZXQuZm9yRWFjaCgoeGhyKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgeGhyLmFib3J0ID09PSAnZnVuY3Rpb24nKSB4aHIuYWJvcnQoKTtcbiAgICAgIH0pO1xuICAgICAgZmV0Y2hTZXQuZm9yRWFjaCgoY3RvcikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGN0b3IuYWJvcnQgPT09ICdmdW5jdGlvbicpIGN0b3IuYWJvcnQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB3c1NldC5jbGVhcigpO1xuICAgICAgeGhyU2V0LmNsZWFyKCk7XG4gICAgICBmZXRjaFNldC5jbGVhcigpO1xuICAgIH0sXG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgaGFzT3duLFxuICBtYWtlTWFwLFxuICBpc09iamVjdCxcbiAgZmluZFRhcmdldCxcbiAgc2FmYXJpMTNEZWFsLFxuICBfX01vY2tCb2R5X18sXG4gIF9fTW9ja0hlYWRfXyxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgcm9vdEVsbSwgc2FuZGJveE1hcCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IF9fZG9jdW1lbnRCaW5kX18gfSBmcm9tICcuLi9zeW1ib2xUeXBlcyc7XG5pbXBvcnQgeyBiaW5kLCB2ZXJpZnlHZXR0ZXJEZXNjcmlwdG9yLCB2ZXJpZnlTZXR0ZXJEZXNjcmlwdG9yIH0gZnJvbSAnLi9zaGFyZWQnO1xuXG5jb25zdCBwYXNzZWRLZXkgPSBtYWtlTWFwKFsndGl0bGUnLCAnY29va2llJywgJ29uc2VsZWN0c3RhcnQnLCAnb25kcmFnc3RhcnQnXSk7XG5cbmNvbnN0IHF1ZXJ5RnVuY3Rpb25zID0gbWFrZU1hcChbXG4gICdxdWVyeVNlbGVjdG9yJyxcbiAgJ3F1ZXJ5U2VsZWN0b3JBbGwnLFxuICAnZ2V0RWxlbWVudEJ5SWQnLFxuICAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnLFxuICAnZ2V0RWxlbWVudHNCeVRhZ05hbWVOUycsXG4gICdnZXRFbGVtZW50c0J5Q2xhc3NOYW1lJyxcbl0pO1xuXG4vLyBkb2N1bWVudCBwcm94eSBnZXR0ZXJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHZXR0ZXIoc2FuZGJveDogU2FuZGJveCkge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwOiBQcm9wZXJ0eUtleSwgcmVjZWl2ZXI/OiBhbnkpID0+IHtcbiAgICBpZiAocCA9PT0gJ2FjdGl2ZUVsZW1lbnQnKSB7XG4gICAgICByZXR1cm4gUmVmbGVjdC5nZXQoZG9jdW1lbnQsIHApO1xuICAgIH1cblxuICAgIGNvbnN0IHJvb3ROb2RlID0gcm9vdEVsbShzYW5kYm94KTtcbiAgICBjb25zdCBzdHJpY3RJc29sYXRpb24gPSBzYW5kYm94Lm9wdGlvbnMuc3RyaWN0SXNvbGF0aW9uO1xuICAgIGNvbnN0IHZhbHVlID0gaGFzT3duKHRhcmdldCwgcClcbiAgICAgID8gUmVmbGVjdC5nZXQodGFyZ2V0LCBwLCByZWNlaXZlcilcbiAgICAgIDogUmVmbGVjdC5nZXQoZG9jdW1lbnQsIHApO1xuXG4gICAgLy8gUHJvdmlkZSBob29rcyBmb3IgdXNlcnMgdG8gcmV0dXJuIHNwZWNpZmljIHZhbHVlcyB0aGVtc2VsdmVzXG4gICAgY29uc3QgaG9va3NSZXMgPSBzYW5kYm94Lmhvb2tzLmxpZmVjeWNsZS5kb2N1bWVudEdldHRlci5lbWl0KHtcbiAgICAgIHZhbHVlLFxuICAgICAgcm9vdE5vZGUsXG4gICAgICBwcm9wTmFtZTogcCxcbiAgICAgIHByb3h5RG9jdW1lbnQ6IHRhcmdldCxcbiAgICAgIGN1c3RvbVZhbHVlOiBudWxsLFxuICAgIH0pO1xuXG4gICAgaWYgKGhvb2tzUmVzLmN1c3RvbVZhbHVlKSB7XG4gICAgICByZXR1cm4gaG9va3NSZXMuY3VzdG9tVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0U2FuZGJveFJlZiA9IChlbCkgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KGVsKSkge1xuICAgICAgICBzYW5kYm94TWFwLnNldEVsZW1lbnRUYWcoZWwsIHNhbmRib3gpO1xuICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICBlbC5fX1NBTkRCT1hfXyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICBpZiAocCA9PT0gJ2NyZWF0ZUVsZW1lbnQnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFnTmFtZSwgb3B0aW9ucykge1xuICAgICAgICAgIGNvbnN0IGVsID0gdmFsdWUuY2FsbChkb2N1bWVudCwgdGFnTmFtZSwgb3B0aW9ucyk7XG4gICAgICAgICAgcmV0dXJuIHNldFNhbmRib3hSZWYoZWwpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChwID09PSAnY3JlYXRlVGV4dE5vZGUnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGNvbnN0IGVsID0gdmFsdWUuY2FsbChkb2N1bWVudCwgZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHNldFNhbmRib3hSZWYoZWwpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChwID09PSAnaGVhZCcpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRUYXJnZXQocm9vdE5vZGUsIFsnaGVhZCcsIGBkaXZbJHtfX01vY2tIZWFkX199XWBdKSB8fCB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcm9vdE5vZGUgaXMgYSBTaGFkb3cgZG9tXG4gICAgICBpZiAoc3RyaWN0SXNvbGF0aW9uKSB7XG4gICAgICAgIGlmIChwID09PSAnYm9keScpIHtcbiAgICAgICAgICAvLyBXaGVuIHRoZSBub2RlIGlzIGluc2VydGVkLCBpZiBpdCBpcyBhIHBvcC11cCBzY2VuZSxcbiAgICAgICAgICAvLyBpdCBuZWVkcyB0byBiZSBwbGFjZWQgZ2xvYmFsbHksIHNvIGl0IGlzIG5vdCBwbGFjZWQgb3V0c2lkZSBieSBkZWZhdWx0LlxuICAgICAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHJvb3ROb2RlLCBbJ2JvZHknLCBgZGl2WyR7X19Nb2NrQm9keV9ffV1gXSk7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlGdW5jdGlvbnMocCkpIHtcbiAgICAgICAgICByZXR1cm4gcCA9PT0gJ2dldEVsZW1lbnRCeUlkJ1xuICAgICAgICAgICAgPyAoaWQpID0+IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApXG4gICAgICAgICAgICA6IHJvb3ROb2RlW3BdLmJpbmQocm9vdE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGV0IG5ld1ZhbHVlID0gaGFzT3duKHZhbHVlLCBfX2RvY3VtZW50QmluZF9fKVxuICAgICAgICA/IHZhbHVlW19fZG9jdW1lbnRCaW5kX19dXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGlmICghbmV3VmFsdWUpIG5ld1ZhbHVlID0gYmluZCh2YWx1ZSwgZG9jdW1lbnQpO1xuXG4gICAgICBjb25zdCB2ZXJpZnlSZXN1bHQgPSB2ZXJpZnlHZXR0ZXJEZXNjcmlwdG9yKHRhcmdldCwgcCwgbmV3VmFsdWUpO1xuICAgICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAyKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdmFsdWVbX19kb2N1bWVudEJpbmRfX10gPSBuZXdWYWx1ZTtcbiAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5jb25zdCBzYWZhcmlQcm94eURvY3VtZW50RGVhbEhhbmRsZXIgPSBzYWZhcmkxM0RlYWwoKTtcblxuLy8gZG9jdW1lbnQgcHJveHkgc2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGVyKHNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXksIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpID0+IHtcbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3RFbG0oc2FuZGJveCk7XG4gICAgY29uc3QgdmVyaWZ5UmVzdWx0ID0gdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcihcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgdHlwZW9mIHAgPT09ICdzdHJpbmcnICYmIHBhc3NlZEtleShwKVxuICAgICAgICA/IGRvY3VtZW50XG4gICAgICAgIDogKHJlY2VpdmVyIHx8IHRhcmdldCksXG4gICAgICBwLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgICBpZiAodmVyaWZ5UmVzdWx0ID4gMCkge1xuICAgICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMSB8fCB2ZXJpZnlSZXN1bHQgPT09IDIpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDMpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFwcGxpY2F0aW9uIGFyZWEgb2YgdGhlIGJhbiBvbiBzZWxlY3RlZCwgaWYgdXNlcnMgd2FudCB0byBiYW4gdGhlIGdsb2JhbCBuZWVkIHRvIHNldCBvbiB0aGUgbWFpbiBhcHBsaWNhdGlvblxuICAgIGlmIChwID09PSAnb25zZWxlY3RzdGFydCcgfHwgcCA9PT0gJ29uZHJhZ3N0YXJ0Jykge1xuICAgICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldChyb290Tm9kZSwgcCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KGRvY3VtZW50LCBwLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwID09PSAnc3RyaW5nJyAmJiBwYXNzZWRLZXkocCkpIHtcbiAgICAgIHJldHVybiBSZWZsZWN0LnNldChkb2N1bWVudCwgcCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzYWZhcmlQcm94eURvY3VtZW50RGVhbEhhbmRsZXIudHJpZ2dlclNldCgpO1xuICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIGRvY3VtZW50IHByb3h5IGRlZmluZVByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVmaW5lUHJvcGVydHkoKSB7XG4gIHJldHVybiAodGFyZ2V0OiBhbnksIHA6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpID0+IHtcbiAgICBzYWZhcmlQcm94eURvY3VtZW50RGVhbEhhbmRsZXIuaGFuZGxlRGVzY3JpcHRvcihkZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gcGFzc2VkS2V5KHApXG4gICAgICA/IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQsIHAsIGRlc2NyaXB0b3IpXG4gICAgICA6IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwLCBkZXNjcmlwdG9yKTtcbiAgfTtcbn1cblxuLy8gZG9jdW1lbnQgcHJveHkgaGFzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzKCkge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwOiBQcm9wZXJ0eUtleSkgPT4ge1xuICAgIGlmIChwID09PSAnYWN0aXZlRWxlbWVudCcpIHJldHVybiBSZWZsZWN0Lmhhcyhkb2N1bWVudCwgcCk7XG4gICAgcmV0dXJuIGhhc093bih0YXJnZXQsIHApIHx8IFJlZmxlY3QuaGFzKGRvY3VtZW50LCBwKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5pbXBvcnQgeyBfX3Byb3h5Tm9kZV9fIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRmFrZU9iamVjdCwgbWljcm9UYXNrSHRtbFByb3h5RG9jdW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge1xuICBjcmVhdGVIYXMsXG4gIGNyZWF0ZUdldHRlcixcbiAgY3JlYXRlU2V0dGVyLFxuICBjcmVhdGVEZWZpbmVQcm9wZXJ0eSxcbn0gZnJvbSAnLi4vcHJveHlJbnRlcmNlcHRvci9kb2N1bWVudCc7XG5cbmV4cG9ydCBjb25zdCBkb2N1bWVudE1vZHVsZSA9IChzYW5kYm94OiBTYW5kYm94KSA9PiB7XG4gIGxldCBwcm94eURvY3VtZW50ID0gT2JqZWN0LmNyZWF0ZShkb2N1bWVudCk7XG4gIGNvbnN0IGdldHRlciA9IGNyZWF0ZUdldHRlcihzYW5kYm94KTtcblxuICBjb25zdCBmYWtlRG9jdW1lbnQgPSBjcmVhdGVGYWtlT2JqZWN0KGRvY3VtZW50KTtcblxuICBjb25zdCBmYWtlRG9jdW1lbnRQcm90byA9IG5ldyBQcm94eShmYWtlRG9jdW1lbnQsIHtcbiAgICBnZXQ6ICguLi5hcmdzKSA9PiB7XG4gICAgICBtaWNyb1Rhc2tIdG1sUHJveHlEb2N1bWVudChwcm94eURvY3VtZW50KTtcbiAgICAgIHJldHVybiBnZXR0ZXIoLi4uYXJncyk7XG4gICAgfSxcbiAgICBoYXM6IGNyZWF0ZUhhcygpLFxuICB9KTtcbiAgXG5cbiAgcHJveHlEb2N1bWVudCA9IG5ldyBQcm94eShcbiAgICBPYmplY3QuY3JlYXRlKGZha2VEb2N1bWVudFByb3RvLCB7XG4gICAgICBjdXJyZW50U2NyaXB0OiB7XG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBbX19wcm94eU5vZGVfX106IHtcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogZG9jdW1lbnQsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHtcbiAgICAgIHNldDogY3JlYXRlU2V0dGVyKHNhbmRib3gpLFxuICAgICAgZGVmaW5lUHJvcGVydHk6IGNyZWF0ZURlZmluZVByb3BlcnR5KCksXG4gICAgICBnZXRQcm90b3R5cGVPZiAoKSB7XG4gICAgICAgIHJldHVybiBIVE1MRG9jdW1lbnQucHJvdG90eXBlIHx8IERvY3VtZW50LnByb3RvdHlwZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG92ZXJyaWRlOiB7XG4gICAgICBkb2N1bWVudDogcHJveHlEb2N1bWVudCxcbiAgICB9LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBnZXRUeXBlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG4vLyBUaGUgbG9naWMgb2YgVUlFdmVudCBpcyByZWZlcmVuY2VkIGZyb20gcWlhbmt1biB0eXBvZ3JhcGh5XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW1panMvcWlhbmt1bi9wdWxsLzU5My9maWxlc1xuLy8gVE9ETzogZml4IG5vcm1hbCBtb3VzZSBldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgPT09IGZhbHNlXG5leHBvcnQgY2xhc3MgTW91c2VFdmVudFBhdGNoIGV4dGVuZHMgTW91c2VFdmVudCB7XG4gIGNvbnN0cnVjdG9yKHR5cGVBcmc6IHN0cmluZywgbW91c2VFdmVudEluaXQ/OiBNb3VzZUV2ZW50SW5pdCkge1xuICAgIGlmIChtb3VzZUV2ZW50SW5pdCAmJiBnZXRUeXBlKG1vdXNlRXZlbnRJbml0LnZpZXcpID09PSAnd2luZG93Jykge1xuICAgICAgbW91c2VFdmVudEluaXQudmlldyA9IHdpbmRvdztcbiAgICB9XG4gICAgc3VwZXIodHlwZUFyZywgbW91c2VFdmVudEluaXQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVaUV2ZW50T3ZlcnJpZGUoKSB7XG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIE1vdXNlRXZlbnQ6IE1vdXNlRXZlbnRQYXRjaCBhcyBhbnksXG4gICAgfSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5pbXBvcnQgeyBHQVJGSVNIX05BTUVTUEFDRV9QUkVGSVggfSBmcm9tICcuLi9zeW1ib2xUeXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBDdXNTdG9yYWdlIHtcbiAgcHJlZml4OiBzdHJpbmc7XG4gIG5hbWVzcGFjZTogc3RyaW5nO1xuICByYXdTdG9yYWdlOiBTdG9yYWdlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWVzcGFjZTogc3RyaW5nLCByYXdTdG9yYWdlOiBTdG9yYWdlKSB7XG4gICAgdGhpcy5yYXdTdG9yYWdlID0gcmF3U3RvcmFnZTtcbiAgICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgICB0aGlzLnByZWZpeCA9IGAke0dBUkZJU0hfTkFNRVNQQUNFX1BSRUZJWH0ke25hbWVzcGFjZX1fX2A7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmdldEtleXMoKS5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIGdldEtleXMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmF3U3RvcmFnZSkuZmlsdGVyKChrZXkpID0+XG4gICAgICBrZXkuc3RhcnRzV2l0aCh0aGlzLnByZWZpeCksXG4gICAgKTtcbiAgfVxuXG4gIC8vIEdldCB0aGUgXCJuXCIga2V5IG9mIHRoZSBjdXJyZW50IG5hbWVzcGFjZSwgeW91IG5lZWQgdG8gcmVtb3ZlIHRoZSBwcmVmaXhcbiAga2V5KG46IG51bWJlcikge1xuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5cygpW25dO1xuICAgIHJldHVybiBrZXkgPyBrZXkuc3Vic3RyaW5nKHRoaXMucHJlZml4Lmxlbmd0aCkgOiBudWxsO1xuICB9XG5cbiAgZ2V0SXRlbShrZXlOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yYXdTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5wcmVmaXggKyBrZXlOYW1lfWApO1xuICB9XG5cbiAgc2V0SXRlbShrZXlOYW1lOiBzdHJpbmcsIGtleVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJhd1N0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLnByZWZpeCArIGtleU5hbWV9YCwga2V5VmFsdWUpO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShrZXlOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJhd1N0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLnByZWZpeCArIGtleU5hbWV9YCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmdldEtleXMoKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMucmF3U3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2FsU3RvcmFnZU1vZHVsZShzYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IG5hbWVzcGFjZSA9IHNhbmRib3gub3B0aW9ucy5uYW1lc3BhY2U7XG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIGxvY2FsU3RvcmFnZTogbmV3IEN1c1N0b3JhZ2UobmFtZXNwYWNlLCBsb2NhbFN0b3JhZ2UpLFxuICAgICAgc2Vzc2lvblN0b3JhZ2U6IG5ldyBDdXNTdG9yYWdlKG5hbWVzcGFjZSwgc2Vzc2lvblN0b3JhZ2UpLFxuICAgIH0sXG4gIH07XG59XG4iLCAiLy8gaW1wb3J0IHsgZmlsdGVyQW5kV3JhcEV2ZW50TGlzdGVuZXIgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5cbnR5cGUgT3B0cyA9IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucztcbnR5cGUgTGlzdGVuZXIgPSBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuZXJNb2R1bGUoX3NhbmRib3g6IFNhbmRib3gpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIExpc3RlbmVyW10+KCk7XG4gIGNvbnN0IHJhd0FkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgY29uc3QgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuXG4gIGZ1bmN0aW9uIGFkZExpc3RlbmVyKFxuICAgIHRoaXM6IGFueSxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgbGlzdGVuZXI6IExpc3RlbmVyLFxuICAgIG9wdGlvbnM/OiBPcHRzLFxuICApIHtcbiAgICBjb25zdCBjdXJMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgIGxpc3RlbmVycy5zZXQodHlwZSwgWy4uLmN1ckxpc3RlbmVycywgbGlzdGVuZXJdKTtcblxuICAgIC8vIFRoaXMgaGFzIGJlZW4gcmV2aXNlZFxuICAgIHJhd0FkZEV2ZW50TGlzdGVuZXIuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICB0eXBlLFxuICAgICAgLy8gZmlsdGVyQW5kV3JhcEV2ZW50TGlzdGVuZXIoXG4gICAgICAvLyAgIHR5cGUsXG4gICAgICAvLyAgIGxpc3RlbmVyLFxuICAgICAgLy8gICBfc2FuZGJveC5vcHRpb25zLnNvdXJjZUxpc3QubWFwKChpdGVtKSA9PiBpdGVtLnVybCksXG4gICAgICAvLyApLFxuICAgICAgbGlzdGVuZXIsXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihcbiAgICB0aGlzOiBhbnksXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyOiBMaXN0ZW5lcixcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEV2ZW50TGlzdGVuZXJPcHRpb25zLFxuICApIHtcbiAgICBjb25zdCBjdXJMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgIGNvbnN0IGlkeCA9IGN1ckxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgY3VyTGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgICBsaXN0ZW5lcnMuc2V0KHR5cGUsIFsuLi5jdXJMaXN0ZW5lcnNdKTtcbiAgICByYXdSZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgY29uc3QgcmVjb3ZlciA9ICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGtleSkgPT4ge1xuICAgICAgbGlzdGVuZXIuZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgICAgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHdpbmRvdywga2V5LCBmbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBsaXN0ZW5lcnMuY2xlYXIoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlY292ZXIsXG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGFkZExpc3RlbmVyLmJpbmQod2luZG93KSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IHJlbW92ZUxpc3RlbmVyLmJpbmQod2luZG93KSxcbiAgICB9LFxuICAgIGNyZWF0ZWQoZ2xvYmFsOiBTYW5kYm94WydnbG9iYWwnXSkge1xuICAgICAgY29uc3QgZmFrZURvY3VtZW50ID0gZ2xvYmFsPy5kb2N1bWVudDtcbiAgICAgIGlmIChmYWtlRG9jdW1lbnQpIHtcbiAgICAgICAgZmFrZURvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRMaXN0ZW5lci5iaW5kKGRvY3VtZW50KTtcbiAgICAgICAgZmFrZURvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVMaXN0ZW5lci5iaW5kKGRvY3VtZW50KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuLi9zYW5kYm94JztcblxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVyTW9kdWxlKF9zYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IG9ic2VydmVyU2V0ID0gbmV3IFNldDxNdXRhdGlvbk9ic2VydmVyPigpO1xuXG4gIGNsYXNzIFByb3h5TXV0YXRpb25PYnNlcnZlciBleHRlbmRzIE11dGF0aW9uT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNiOiBNdXRhdGlvbkNhbGxiYWNrKSB7XG4gICAgICBzdXBlcihjYik7XG4gICAgICBvYnNlcnZlclNldC5hZGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjb3ZlciA9ICgpID0+IHtcbiAgICBvYnNlcnZlclNldC5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlci5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJTZXQuY2xlYXIoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlY292ZXIsXG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIE11dGF0aW9uT2JzZXJ2ZXI6IFByb3h5TXV0YXRpb25PYnNlcnZlciBhcyBGdW5jdGlvbixcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IHJhd1NldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcbmNvbnN0IHJhd0NsZWFyVGltZW91dCA9IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5jb25zdCByYXdTZXRJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbDtcbmNvbnN0IHJhd0NsZWFySW50ZXJ2YWwgPSB3aW5kb3cuY2xlYXJJbnRlcnZhbDtcblxuZXhwb3J0IGNvbnN0IHRpbWVvdXRNb2R1bGUgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVvdXQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBjb25zdCBzZXRUaW1lb3V0ID0gKGhhbmRsZXI6IFRpbWVySGFuZGxlciwgbXM/OiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3QgdGltZW91dElkID0gcmF3U2V0VGltZW91dChoYW5kbGVyLCBtcywgLi4uYXJncyk7XG4gICAgdGltZW91dC5hZGQodGltZW91dElkKTtcbiAgICByZXR1cm4gdGltZW91dElkO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyVGltZW91dCA9ICh0aW1lb3V0SWQ6IG51bWJlcikgPT4ge1xuICAgIHRpbWVvdXQuZGVsZXRlKHRpbWVvdXRJZCk7XG4gICAgcmF3Q2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gIH07XG5cbiAgY29uc3QgcmVjb3ZlciA9ICgpID0+IHtcbiAgICB0aW1lb3V0LmZvckVhY2goKHRpbWVvdXRJZCkgPT4ge1xuICAgICAgcmF3Q2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWNvdmVyLFxuICAgIG92ZXJyaWRlOiB7XG4gICAgICBzZXRUaW1lb3V0LFxuICAgICAgY2xlYXJUaW1lb3V0LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgaW50ZXJ2YWxNb2R1bGUgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVvdXQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBjb25zdCBzZXRJbnRlcnZhbCA9IChcbiAgICBjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxuICAgIG1zOiBudW1iZXIsXG4gICAgLi4uYXJnczogYW55W11cbiAgKSA9PiB7XG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHJhd1NldEludGVydmFsKGNhbGxiYWNrLCBtcywgLi4uYXJncyk7XG4gICAgdGltZW91dC5hZGQoaW50ZXJ2YWxJZCk7XG4gICAgcmV0dXJuIGludGVydmFsSWQ7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJJbnRlcnZhbCA9IChpbnRlcnZhbElkOiBudW1iZXIpID0+IHtcbiAgICB0aW1lb3V0LmRlbGV0ZShpbnRlcnZhbElkKTtcbiAgICByYXdDbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICB9O1xuXG4gIGNvbnN0IHJlY292ZXIgPSAoKSA9PiB7XG4gICAgdGltZW91dC5mb3JFYWNoKChpbnRlcnZhbElkKSA9PiB7XG4gICAgICByYXdDbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVjb3ZlcixcbiAgICBvdmVycmlkZToge1xuICAgICAgc2V0SW50ZXJ2YWwsXG4gICAgICBjbGVhckludGVydmFsLFxuICAgICAgLy8gd2VicGFjayBsYXp5IHVzZSBQcm9taXNlXG4gICAgICAvLyBQcm9taXNlIGlzIHBvbHlmaWxsXG4gICAgICAvLyBwb2x5ZmlsbCBQcm9taXNlIGluY2x1ZGUgUHJvbWlzZS5fc2V0SW1tZWRpYXRlIHVzZSBzZXRJbW1lZGlhdGUgbWV0aG9kc1xuICAgICAgLy8gc2V0SW1tZWRpYXRlIHBvbHlmaWxsIHBvc3RNZXNzYWdlIGFzIG1hcmNvIHRhc2tzXG4gICAgICAvLyBwb3N0TWVzc2FnZSBjYWxsYmFjayBqdWRnZSBldmVudC5zb3VyY2UgPT09IHdpbmRvd1xuICAgICAgLy8gdXNlIHNldFRpbWVvdXQgYXMgc2V0SW1tZWRpYXRlIGF2b2lkIGp1ZGdlIGZhaWxcbiAgICAgIHNldEltbWVkaWF0ZTogKGZuKSA9PiBzZXRUaW1lb3V0KGZuLCAwKSxcbiAgICB9LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBtYWtlTWFwLCBzYWZlV3JhcHBlciwgd2FybiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFN0eWxlTWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQgeyBfX2RvbVdyYXBwZXJfXyB9IGZyb20gJy4uL3N5bWJvbFR5cGVzJztcbmltcG9ydCB7IGluamVjdEhhbmRsZXJQYXJhbXMgfSBmcm9tICcuL3Byb2Nlc3NQYXJhbXMnO1xuaW1wb3J0IHsgRHluYW1pY05vZGVQcm9jZXNzb3IsIHJhd0VsZW1lbnRNZXRob2RzIH0gZnJvbSAnLi9wcm9jZXNzb3InO1xuaW1wb3J0IHsgaXNJbklmcmFtZSwgc2FuZGJveE1hcCwgaXNTdHlsZWRDb21wb25lbnRzTGlrZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFNhbmRib3hPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBtb3VudEVsZW1lbnRNZXRob2RzID0gW1xuICAnYXBwZW5kJyxcbiAgJ2FwcGVuZENoaWxkJyxcbiAgJ2luc2VydEJlZm9yZScsXG4gICdpbnNlcnRBZGphY2VudEVsZW1lbnQnLFxuXTtcbmNvbnN0IHJlbW92ZUNoaWxkRWxlbWVudE1ldGhvZHMgPSBbJ3JlbW92ZUNoaWxkJ107XG5cbmNvbnN0IGlnbm9yZUVsZW1lbnRUaW1pbmdUYWdzID0gbWFrZU1hcChbXG4gICdTVFlMRScsXG4gICdTQ1JJUFRTJyxcbiAgJ0xJTksnLFxuICAnTUVUQScsXG4gICdUSVRMRScsXG5dKTtcblxuZnVuY3Rpb24gaW5qZWN0b3IoY3VycmVudDogRnVuY3Rpb24sIG1ldGhvZE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6IEVsZW1lbnQpIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBlbCA9IG1ldGhvZE5hbWUgPT09ICdpbnNlcnRBZGphY2VudEVsZW1lbnQnXG4gICAgICA/IGFyZ3VtZW50c1sxXVxuICAgICAgOiBhcmd1bWVudHNbMF07XG4gICAgY29uc3Qgc2FuZGJveCA9IHNhbmRib3hNYXAuZ2V0KGVsKTtcbiAgICBjb25zdCBvcmlnaW5Qcm9jZXNzID0gKCkgPT4gY3VycmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHNhbmRib3gpIHtcbiAgICAgIGlmIChlbCAmJiB0aGlzPy50YWdOYW1lPy50b0xvd2VyQ2FzZSgpID09PSAnc3R5bGUnKSB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgU3R5bGVNYW5hZ2VyKGVsLnRleHRDb250ZW50KTtcbiAgICAgICAgY29uc3QgeyBiYXNlVXJsLCBuYW1lc3BhY2UsIHN0eWxlU2NvcGVJZCB9ID0gc2FuZGJveC5vcHRpb25zO1xuICAgICAgICBtYW5hZ2VyLmNvcnJlY3RQYXRoKGJhc2VVcmwpO1xuICAgICAgICBtYW5hZ2VyLnNldFNjb3BlKHtcbiAgICAgICAgICBhcHBOYW1lOiBuYW1lc3BhY2UsXG4gICAgICAgICAgcm9vdEVsSWQ6IHN0eWxlU2NvcGVJZCEoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gbWFuYWdlci50cmFuc2Zvcm1Db2RlKG1hbmFnZXIuc3R5bGVDb2RlKTtcbiAgICAgICAgcmV0dXJuIG9yaWdpblByb2Nlc3MoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NvciA9IG5ldyBEeW5hbWljTm9kZVByb2Nlc3NvcihlbCwgc2FuZGJveCwgbWV0aG9kTmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9jZXNzb3IuYXBwZW5kKHRoaXMsIGFyZ3VtZW50cywgb3JpZ2luUHJvY2Vzcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3VzdG9tIHBlcmZvcm1hbmNlIEVsZW1lbnQgVGltaW5nIEFQSVxuICAgIC8vIGh0dHBzOi8vd2ViLmRldi9jdXN0b20tbWV0cmljcy8jZWxlbWVudC10aW1pbmctYXBpXG4gICAgc2FmZVdyYXBwZXIoKCkgPT4ge1xuICAgICAgaWYgKGlnbm9yZUVsZW1lbnRUaW1pbmdUYWdzKGVsLnRhZ05hbWUpKSByZXR1cm47XG4gICAgICBpZiAoXG4gICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUgJiZcbiAgICAgICAgdHlwZW9mIGVsPy5zZXRBdHRyaWJ1dGUgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgIWVsPy5nZXRBdHRyaWJ1dGUoJ2VsZW1lbnR0aW1pbmcnKVxuICAgICAgKSB7XG4gICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2VsZW1lbnR0aW1pbmcnLFxuICAgICAgICAgIHNhbmRib3hcbiAgICAgICAgICAgID8gYCR7KHNhbmRib3ggYXMgYW55KS5vcHRpb25zLm5hbWVzcGFjZX0tZWxlbWVudC10aW1pbmdgXG4gICAgICAgICAgICA6ICdlbGVtZW50LXRpbWluZycsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoc2FuZGJveCkge1xuICAgICAgY29uc3QgcHJvY2Vzc29yID0gbmV3IER5bmFtaWNOb2RlUHJvY2Vzc29yKGVsLCBzYW5kYm94LCBtZXRob2ROYW1lKTtcbiAgICAgIHJldHVybiBwcm9jZXNzb3IuYXBwZW5kKHRoaXMsIGFyZ3VtZW50cywgb3JpZ2luUHJvY2Vzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcmlnaW5Qcm9jZXNzKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbmplY3RvclJlbW92ZUNoaWxkKGN1cnJlbnQ6IEZ1bmN0aW9uLCBtZXRob2ROYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzOiBFbGVtZW50KSB7XG4gICAgY29uc3QgZWwgPSBhcmd1bWVudHNbMF07XG4gICAgY29uc3Qgc2FuZGJveCA9IGVsICYmIHNhbmRib3hNYXAuZ2V0KGVsKTtcbiAgICBjb25zdCBvcmlnaW5Qcm9jZXNzID0gKCkgPT4ge1xuICAgICAgLy8gU2FuZGJveCBtYXkgaGF2ZSBhcHBsaWVkIHN1YiBkb20gc2lkZSBlZmZlY3RzIHRvIGRlbGV0ZVxuICAgICAgLy8gYnkgcmVtb3ZlQ2hpbGQgZGVsZXRlZCBieSB0aGUgdGFnIGRldGVybWluZSB3aGV0aGVyIGhhdmUgYmVlbiByZW1vdmVkXG4gICAgICByZXR1cm4gY3VycmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBpZiAoc2FuZGJveCkge1xuICAgICAgY29uc3QgcHJvY2Vzc29yID0gbmV3IER5bmFtaWNOb2RlUHJvY2Vzc29yKGVsLCBzYW5kYm94LCBtZXRob2ROYW1lKTtcbiAgICAgIHJldHVybiBwcm9jZXNzb3IucmVtb3ZlQ2hpbGQodGhpcywgb3JpZ2luUHJvY2Vzcyk7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5Qcm9jZXNzKCk7XG4gIH07XG59XG5cbi8vIEhhbmRsZSBgb3duZXJEb2N1bWVudGAgdG8gcHJldmVudCBlbGVtZW50cyBjcmVhdGVkIGJ5IGBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnRgIGZyb20gZXNjYXBpbmdcbmZ1bmN0aW9uIGhhbmRsZU93bmVyRG9jdW1lbnQoKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUsICdvd25lckRvY3VtZW50Jywge1xuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IHNhbmRib3ggPSB0aGlzICYmIHNhbmRib3hNYXAuZ2V0KHRoaXMpO1xuICAgICAgY29uc3QgcmVhbFZhbHVlID0gUmVmbGVjdC5nZXQoXG4gICAgICAgIHdpbmRvdy5Ob2RlLnByb3RvdHlwZSxcbiAgICAgICAgJ293bmVyRG9jdW1lbnQnLFxuICAgICAgICB0aGlzLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBzYW5kYm94ID8gc2FuZGJveC5nbG9iYWwuZG9jdW1lbnQgOiByZWFsVmFsdWU7XG4gICAgfSxcbiAgICBzZXQoKSB7XG4gICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJiB3YXJuKCdcIm93bmVyRG9jdW1lbnRcIiBpcyBhIHJlYWQtb25seSBhdHRyaWJ1dGUuJyk7XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRWxJbmplY3RvcihzYW5kYm94Q29uZmlnOiBTYW5kYm94T3B0aW9ucykge1xuICBpZiAoKG1ha2VFbEluamVjdG9yIGFzIGFueSkuaGFzSW5qZWN0KSByZXR1cm47XG4gIChtYWtlRWxJbmplY3RvciBhcyBhbnkpLmhhc0luamVjdCA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cuRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIGlmcmFtZSBjYW4gcmVhZCBodG1sIGNvbnRhaW5lciB0aGlzIGNhbid0IHBvaW50IHRvIHByb3h5RG9jdW1lbnQgaGFzIElsbGVnYWwgaW52b2NhdGlvbiBlcnJvclxuICAgIGlmIChzYW5kYm94Q29uZmlnLmZpeEJhc2VVcmwpIHNhZmVXcmFwcGVyKCgpPT4gaGFuZGxlT3duZXJEb2N1bWVudCgpKTtcbiAgICBjb25zdCByZXdyaXRlID0gKFxuICAgICAgbWV0aG9kczogQXJyYXk8c3RyaW5nPixcbiAgICAgIGJ1aWxkZXI6IHR5cGVvZiBpbmplY3RvciB8IHR5cGVvZiBpbmplY3RvclJlbW92ZUNoaWxkLFxuICAgICkgPT4ge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG1ldGhvZHMpIHtcbiAgICAgICAgY29uc3QgZm4gPSB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicgfHwgZm5bX19kb21XcmFwcGVyX19dKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmF3RWxlbWVudE1ldGhvZHNbbmFtZV0gPSBmbjtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGJ1aWxkZXIoZm4sIG5hbWUpO1xuICAgICAgICB3cmFwcGVyW19fZG9tV3JhcHBlcl9fXSA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVtuYW1lXSA9IHdyYXBwZXI7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXdyaXRlKG1vdW50RWxlbWVudE1ldGhvZHMsIGluamVjdG9yKTtcbiAgICByZXdyaXRlKHJlbW92ZUNoaWxkRWxlbWVudE1ldGhvZHMsIGluamVjdG9yUmVtb3ZlQ2hpbGQpO1xuICB9XG5cbiAgaW5qZWN0SGFuZGxlclBhcmFtcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkU3R5bGVkQ29tcG9uZW50Q1NTUnVsZXMoXG4gIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldDogU2V0PEhUTUxTdHlsZUVsZW1lbnQ+LFxuICBzdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcDogV2Vha01hcDxIVE1MU3R5bGVFbGVtZW50LCBDU1NSdWxlTGlzdD4sXG4pIHtcbiAgZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LmZvckVhY2goKHN0eWxlRWxlbWVudCkgPT4ge1xuICAgIGlmIChpc1N0eWxlZENvbXBvbmVudHNMaWtlKHN0eWxlRWxlbWVudCkgJiYgc3R5bGVFbGVtZW50LnNoZWV0KSB7XG4gICAgICBzdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcC5zZXQoc3R5bGVFbGVtZW50LCBzdHlsZUVsZW1lbnQuc2hlZXQuY3NzUnVsZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWJ1aWxkQ1NTUnVsZXMoXG4gIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldDogU2V0PEhUTUxTdHlsZUVsZW1lbnQ+LFxuICBzdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcDogV2Vha01hcDxIVE1MU3R5bGVFbGVtZW50LCBDU1NSdWxlTGlzdD4sXG4pIHtcbiAgZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LmZvckVhY2goKHN0eWxlRWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IGNzc1J1bGVzID0gc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXAuZ2V0KHN0eWxlRWxlbWVudCk7XG4gICAgaWYgKGNzc1J1bGVzICYmIChpc1N0eWxlZENvbXBvbmVudHNMaWtlKHN0eWxlRWxlbWVudCkgfHwgY3NzUnVsZXMubGVuZ3RoKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3NSdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjc3NSdWxlID0gY3NzUnVsZXNbaV07XG4gICAgICAgIC8vIHJlLWluc2VydCBydWxlcyBmb3Igc3R5bGVkLWNvbXBvbmVudHMgZWxlbWVudFxuICAgICAgICBzdHlsZUVsZW1lbnQuc2hlZXQ/Lmluc2VydFJ1bGUoXG4gICAgICAgICAgY3NzUnVsZS5jc3NUZXh0LFxuICAgICAgICAgIHN0eWxlRWxlbWVudC5zaGVldD8uY3NzUnVsZXMubGVuZ3RoLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgaGFuZGxlclBhcmFtcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEhhbmRsZXJQYXJhbXMoKSB7XG4gIGlmICh3aW5kb3cuTXV0YXRpb25PYnNlcnZlcikge1xuICAgIGNvbnN0IHJhd09ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmU7XG4gICAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByYXdPYnNlcnZlci5hcHBseSh0aGlzLCBoYW5kbGVyUGFyYW1zKGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH1cblxuICAvLyBpbiBpZnJhbWUgbm90IG1vZGlmeSBhY3RpdmVFbGVtZW50XG4gIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgIHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUsXG4gICAgJ2FjdGl2ZUVsZW1lbnQnLFxuICApO1xuICBjb25zdCByYXdBY3RpdmVFbCA9IGRlc2MgJiYgZGVzYy5nZXQ7XG4gIGlmIChyYXdBY3RpdmVFbCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLCAnYWN0aXZlRWxlbWVudCcsIHtcbiAgICAgIGdldCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiByYXdBY3RpdmVFbC5hcHBseShoYW5kbGVyUGFyYW1zKFt0aGlzXSlbMF0sIGhhbmRsZXJQYXJhbXMoYXJncykpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFN0eWxlTWFuYWdlciwgSmF2YVNjcmlwdE1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHtcbiAgZGVmLFxuICB3YXJuLFxuICBET01BcGlzLFxuICBtYWtlTWFwLFxuICBpc0pzVHlwZSxcbiAgaXNDc3NUeXBlLFxuICBzYWZlV3JhcHBlcixcbiAgZmluZFRhcmdldCxcbiAgX19Nb2NrQm9keV9fLFxuICBfX01vY2tIZWFkX18sXG4gIHRyYW5zZm9ybVVybCxcbiAgc291cmNlTGlzdFRhZ3MsXG4gIF9fUkVNT1ZFX05PREVfXyxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgcm9vdEVsbSwgaXNTdHlsZWRDb21wb25lbnRzTGlrZSB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgaXNJbnNlcnRNZXRob2QgPSBtYWtlTWFwKFsnaW5zZXJ0QmVmb3JlJywgJ2luc2VydEFkamFjZW50RWxlbWVudCddKTtcblxuZXhwb3J0IGNvbnN0IHJhd0VsZW1lbnRNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZXhwb3J0IGNsYXNzIER5bmFtaWNOb2RlUHJvY2Vzc29yIHtcbiAgcHJpdmF0ZSBlbDogYW55OyAvLyBhbnkgRWxlbWVudFxuICBwcml2YXRlIHRhZ05hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBzYW5kYm94OiBTYW5kYm94O1xuICBwcml2YXRlIERPTUFwaXM6IERPTUFwaXM7XG4gIHByaXZhdGUgbWV0aG9kTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHJvb3RFbGVtZW50OiBFbGVtZW50IHwgU2hhZG93Um9vdCB8IERvY3VtZW50O1xuICBwcml2YXRlIG5hdGl2ZUFwcGVuZCA9IHJhd0VsZW1lbnRNZXRob2RzWydhcHBlbmRDaGlsZCddO1xuICBwcml2YXRlIG5hdGl2ZVJlbW92ZSA9IHJhd0VsZW1lbnRNZXRob2RzWydyZW1vdmVDaGlsZCddO1xuXG4gIGNvbnN0cnVjdG9yKGVsLCBzYW5kYm94LCBtZXRob2ROYW1lKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuc2FuZGJveCA9IHNhbmRib3g7XG4gICAgdGhpcy5tZXRob2ROYW1lID0gbWV0aG9kTmFtZTtcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdEVsbShzYW5kYm94KSB8fCBkb2N1bWVudDtcbiAgICB0aGlzLkRPTUFwaXMgPSBuZXcgRE9NQXBpcyhzYW5kYm94Lmdsb2JhbC5kb2N1bWVudCk7XG4gICAgdGhpcy50YWdOYW1lID0gZWwudGFnTmFtZSA/IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBpcyh0YWc6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnRhZ05hbWUgPT09IHRhZztcbiAgfVxuXG4gIHByaXZhdGUgZml4UmVzb3VyY2VOb2RlVXJsKGVsOiBhbnkpIHtcbiAgICBjb25zdCBiYXNlVXJsID0gdGhpcy5zYW5kYm94Lm9wdGlvbnMuYmFzZVVybDtcbiAgICBpZiAoYmFzZVVybCkge1xuICAgICAgY29uc3Qgc3JjID0gZWwuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgIGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIHNyYyAmJiAoZWwuc3JjID0gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIHNyYykpO1xuICAgICAgaHJlZiAmJiAoZWwuaHJlZiA9IHRyYW5zZm9ybVVybChiYXNlVXJsLCBocmVmKSk7XG4gICAgICBjb25zdCB1cmwgPSBlbC5zcmMgfHwgZWwuaHJlZjtcblxuICAgICAgaWYgKHVybCAmJiB0aGlzLnNhbmRib3gub3B0aW9ucy5hZGRTb3VyY2VMaXN0KSB7XG4gICAgICAgIHRoaXMuc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3Qoe1xuICAgICAgICAgIHRhZ05hbWU6IGVsLnRhZ05hbWUsXG4gICAgICAgICAgdXJsLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBQdXQgaXQgaW4gdGhlIG5leHQgbWFjcm8gdGFzayB0byBlbnN1cmUgdGhhdCB0aGUgY3VycmVudCBzeW5jaHJvbml6YXRpb24gc2NyaXB0IGlzIGV4ZWN1dGVkXG4gIHByaXZhdGUgZGlzcGF0Y2hFdmVudCh0eXBlOiBzdHJpbmcsIGVyckluZm8/OiBFcnJvckV2ZW50SW5pdCkge1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgaXNFcnJvciA9IHR5cGUgPT09ICdlcnJvcic7XG4gICAgICBsZXQgZXZlbnQ6IEV2ZW50ICYgeyBfX2J5R2FyZmlzaF9fPzogYm9vbGVhbiB9O1xuXG4gICAgICBpZiAoaXNFcnJvciAmJiBlcnJJbmZvKSB7XG4gICAgICAgIGV2ZW50ID0gbmV3IEVycm9yRXZlbnQodHlwZSwge1xuICAgICAgICAgIC4uLmVyckluZm8sXG4gICAgICAgICAgbWVzc2FnZTogZXJySW5mby5lcnJvci5tZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KHR5cGUpO1xuICAgICAgfVxuICAgICAgZXZlbnQuX19ieUdhcmZpc2hfXyA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICd0YXJnZXQnLCB7IHZhbHVlOiB0aGlzLmVsIH0pO1xuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIGlzRXJyb3IgJiYgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gTG9hZCBkeW5hbWljIGxpbmsgbm9kZVxuICBwcml2YXRlIGFkZER5bmFtaWNMaW5rTm9kZShjYWxsYmFjazogKHN0eWxlTm9kZTogSFRNTFN0eWxlRWxlbWVudCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IHsgaHJlZiwgdHlwZSB9ID0gdGhpcy5lbDtcblxuICAgIGlmICghdHlwZSB8fCBpc0Nzc1R5cGUoeyBzcmM6IGhyZWYsIHR5cGUgfSkpIHtcbiAgICAgIGlmIChocmVmKSB7XG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgbmFtZXNwYWNlLCBzdHlsZVNjb3BlSWQgfSA9IHRoaXMuc2FuZGJveC5vcHRpb25zO1xuICAgICAgICBjb25zdCBmZXRjaFVybCA9IGJhc2VVcmwgPyB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgaHJlZikgOiBocmVmO1xuXG4gICAgICAgIHRoaXMuc2FuZGJveC5sb2FkZXJcbiAgICAgICAgICAubG9hZDxTdHlsZU1hbmFnZXI+KHtcbiAgICAgICAgICAgIHNjb3BlOiBuYW1lc3BhY2UsXG4gICAgICAgICAgICB1cmw6IGZldGNoVXJsLFxuICAgICAgICAgICAgZGVmYXVsdENvbnRlbnRUeXBlOiB0eXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHsgcmVzb3VyY2VNYW5hZ2VyOiBzdHlsZU1hbmFnZXIgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0eWxlTWFuYWdlcikge1xuICAgICAgICAgICAgICBzdHlsZU1hbmFnZXIuY29ycmVjdFBhdGgoKTtcbiAgICAgICAgICAgICAgaWYgKHN0eWxlU2NvcGVJZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlTWFuYWdlci5zZXRTY29wZSh7XG4gICAgICAgICAgICAgICAgICBhcHBOYW1lOiBuYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgICByb290RWxJZDogc3R5bGVTY29wZUlkKCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FsbGJhY2soc3R5bGVNYW5hZ2VyLnJlbmRlckFzU3R5bGVFbGVtZW50KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCByZXNvdXJjZSB0eXBlIFwiJHt0eXBlfVwiLCBcIiR7aHJlZn1cIiBjYW4ndCBnZW5lcmF0ZSBzdHlsZU1hbmFnZXJgLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdsb2FkJyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oZSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2Vycm9yJywge1xuICAgICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICAgICAgZmlsZW5hbWU6IGZldGNoVXJsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICB3YXJuKGBJbnZhbGlkIHJlc291cmNlIHR5cGUgXCIke3R5cGV9XCIsIFwiJHtocmVmfVwiYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRvIGVuc3VyZSB0aGUgcHJvY2Vzc2luZyBub2RlIHRvIG5vcm1hbCBoYXMgYmVlbiByZW1vdmVkXG4gICAgY29uc3QgbGlua0NvbW1lbnROb2RlID0gdGhpcy5ET01BcGlzLmNyZWF0ZUxpbmtDb21tZW50Tm9kZShocmVmKSBhcyBDb21tZW50O1xuICAgIHRoaXMuZWxbX19SRU1PVkVfTk9ERV9fXSA9ICgpID0+XG4gICAgICB0aGlzLkRPTUFwaXMucmVtb3ZlRWxlbWVudChsaW5rQ29tbWVudE5vZGUpO1xuICAgIHJldHVybiBsaW5rQ29tbWVudE5vZGU7XG4gIH1cblxuICAvLyBMb2FkIGR5bmFtaWMganMgc2NyaXB0XG4gIHByaXZhdGUgYWRkRHluYW1pY1NjcmlwdE5vZGUoKSB7XG4gICAgY29uc3QgeyBzcmMsIHR5cGUsIGNyb3NzT3JpZ2luIH0gPSB0aGlzLmVsO1xuICAgIGNvbnN0IGlzTW9kdWxlID0gdHlwZSA9PT0gJ21vZHVsZSc7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuZWwudGV4dENvbnRlbnQgfHwgdGhpcy5lbC50ZXh0IHx8ICcnO1xuXG4gICAgaWYgKCF0eXBlIHx8IGlzSnNUeXBlKHsgc3JjLCB0eXBlIH0pKSB7XG4gICAgICAvLyBUaGUgXCJzcmNcIiBoaWdoZXIgcHJpb3JpdHlcbiAgICAgIGNvbnN0IHsgYmFzZVVybCwgbmFtZXNwYWNlIH0gPSB0aGlzLnNhbmRib3gub3B0aW9ucztcbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgY29uc3QgZmV0Y2hVcmwgPSBiYXNlVXJsID8gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIHNyYykgOiBzcmM7XG4gICAgICAgIHRoaXMuc2FuZGJveC5sb2FkZXJcbiAgICAgICAgICAubG9hZDxKYXZhU2NyaXB0TWFuYWdlcj4oe1xuICAgICAgICAgICAgc2NvcGU6IG5hbWVzcGFjZSxcbiAgICAgICAgICAgIHVybDogZmV0Y2hVcmwsXG4gICAgICAgICAgICBjcm9zc09yaWdpbixcbiAgICAgICAgICAgIGRlZmF1bHRDb250ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKG1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG1hbmFnZXIucmVzb3VyY2VNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgcmVzb3VyY2VNYW5hZ2VyOiB7IHVybCwgc2NyaXB0Q29kZSB9LFxuICAgICAgICAgICAgICAgIH0gPSBtYW5hZ2VyO1xuICAgICAgICAgICAgICAgIC8vIEl0IGlzIG5lY2Vzc2FyeSB0byBlbnN1cmUgdGhhdCB0aGUgY29kZSBleGVjdXRpb24gZXJyb3IgY2Fubm90IHRyaWdnZXIgdGhlIGBlbC5vbmVycm9yYCBldmVudFxuICAgICAgICAgICAgICAgIHRoaXMuc2FuZGJveC5leGVjU2NyaXB0KHNjcmlwdENvZGUsIHt9LCB1cmwsIHtcbiAgICAgICAgICAgICAgICAgIGlzTW9kdWxlLFxuICAgICAgICAgICAgICAgICAgbm9FbnRyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIG9yaWdpblNjcmlwdDogdGhpcy5lbCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAgICAgYEludmFsaWQgcmVzb3VyY2UgdHlwZSBcIiR7dHlwZX1cIiwgXCIke3NyY31cIiBjYW4ndCBnZW5lcmF0ZSBzY3JpcHRNYW5hZ2VyYCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnbG9hZCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oZSk7XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZXJyb3InLCB7XG4gICAgICAgICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZldGNoVXJsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSkge1xuICAgICAgICB0aGlzLnNhbmRib3guZXhlY1NjcmlwdChjb2RlLCB7fSwgYmFzZVVybCwgeyBub0VudHJ5OiB0cnVlLCBvcmlnaW5TY3JpcHQ6IHRoaXMuZWwsIH0pO1xuICAgICAgfVxuICAgICAgLy8gVG8gZW5zdXJlIHRoZSBwcm9jZXNzaW5nIG5vZGUgdG8gbm9ybWFsIGhhcyBiZWVuIHJlbW92ZWRcbiAgICAgIGNvbnN0IHNjcmlwdENvbW1lbnROb2RlID0gdGhpcy5ET01BcGlzLmNyZWF0ZVNjcmlwdENvbW1lbnROb2RlKHtcbiAgICAgICAgc3JjLFxuICAgICAgICBjb2RlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmVsW19fUkVNT1ZFX05PREVfX10gPSAoKSA9PlxuICAgICAgICB0aGlzLkRPTUFwaXMucmVtb3ZlRWxlbWVudChzY3JpcHRDb21tZW50Tm9kZSk7XG4gICAgICByZXR1cm4gc2NyaXB0Q29tbWVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsO1xuICB9XG5cbiAgLy8gV2hlbiBhcHBlbmQgYW4gZW1wdHkgbGluayBub2RlIGFuZCB0aGVuIGFkZCBocmVmIGF0dHJpYnV0ZVxuICBwcml2YXRlIG1vbml0b3JDaGFuZ2VzT2ZMaW5rTm9kZSgpIHtcbiAgICBpZiAodGhpcy5lbC5tb2RpZnlGbGFnKSByZXR1cm47XG5cbiAgICBjb25zdCBtdXRhdG9yID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgaWYgKHRoaXMuZWwubW9kaWZ5RmxhZykgcmV0dXJuO1xuICAgICAgZm9yIChjb25zdCB7IHR5cGUsIGF0dHJpYnV0ZU5hbWUgfSBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAncmVsJyB8fCBhdHRyaWJ1dGVOYW1lID09PSAnc3R5bGVzaGVldCcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsLm1vZGlmeUZsYWcpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsLnJlbCA9PT0gJ3N0eWxlc2hlZXQnICYmIHRoaXMuZWwuaHJlZikge1xuICAgICAgICAgICAgICB0aGlzLmVsLmRpc2FibGVkID0gdGhpcy5lbC5tb2RpZnlGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29uc3QgY29tbWVudE5vZGUgPSB0aGlzLmFkZER5bmFtaWNMaW5rTm9kZSgoc3R5bGVOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29tbWVudE5vZGUucGFyZW50Tm9kZT8ucmVwbGFjZUNoaWxkKHN0eWxlTm9kZSwgY29tbWVudE5vZGUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5lbC5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoY29tbWVudE5vZGUsIHRoaXMuZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NdXRhdGlvbk9ic2VydmVyL2Rpc2Nvbm5lY3RcbiAgICBtdXRhdG9yLm9ic2VydmUodGhpcy5lbCwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtb25pdG9yQ2hhbmdlc09mU3R5bGUoKSB7XG4gICAgY29uc3QgeyBiYXNlVXJsLCBuYW1lc3BhY2UsIHN0eWxlU2NvcGVJZCB9ID0gdGhpcy5zYW5kYm94Lm9wdGlvbnM7XG4gICAgY29uc3Qgcm9vdEVsSWQgPSBzdHlsZVNjb3BlSWQ/LigpO1xuXG4gICAgY29uc3QgbW9kaWZ5U3R5bGVDb2RlID0gKHN0eWxlQ29kZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKHN0eWxlQ29kZSkge1xuICAgICAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFN0eWxlTWFuYWdlcihzdHlsZUNvZGUpO1xuICAgICAgICBtYW5hZ2VyLmNvcnJlY3RQYXRoKGJhc2VVcmwpO1xuICAgICAgICBpZiAocm9vdEVsSWQpIHtcbiAgICAgICAgICBtYW5hZ2VyLnNldFNjb3BlKHtcbiAgICAgICAgICAgIHJvb3RFbElkLFxuICAgICAgICAgICAgYXBwTmFtZTogbmFtZXNwYWNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlQ29kZSA9IG1hbmFnZXIudHJhbnNmb3JtQ29kZShzdHlsZUNvZGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0eWxlQ29kZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbXV0YXRvciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGZvciAoY29uc3QgeyB0eXBlLCB0YXJnZXQsIGFkZGVkTm9kZXMgfSBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSB0YXJnZXQgYXMgSFRNTFN0eWxlRWxlbWVudDtcbiAgICAgICAgICBpZiAoaXNTdHlsZWRDb21wb25lbnRzTGlrZShlbCkgJiYgZWwuc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbkFkZFJ1bGUgPSBlbC5zaGVldC5pbnNlcnRSdWxlO1xuICAgICAgICAgICAgZWwuc2hlZXQuaW5zZXJ0UnVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbW9kaWZ5U3R5bGVDb2RlKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5BZGRSdWxlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWRkZWROb2Rlc1swXSkge1xuICAgICAgICAgICAgICBhZGRlZE5vZGVzWzBdLnRleHRDb250ZW50ID0gbW9kaWZ5U3R5bGVDb2RlKFxuICAgICAgICAgICAgICAgIGFkZGVkTm9kZXNbMF0udGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgbXV0YXRvci5vYnNlcnZlKHRoaXMuZWwsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kUGFyZW50Tm9kZUluQXBwKHBhcmVudE5vZGU6IEVsZW1lbnQsIGRlZmF1bHRJbnNlcnQ/OiBzdHJpbmcpIHtcbiAgICBpZiAocGFyZW50Tm9kZSA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgcmV0dXJuIGZpbmRUYXJnZXQodGhpcy5yb290RWxlbWVudCwgW1xuICAgICAgICAnYm9keScsXG4gICAgICAgIGBkaXZbJHtfX01vY2tCb2R5X199XWAsXG4gICAgICBdKSBhcyBFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAocGFyZW50Tm9kZSA9PT0gZG9jdW1lbnQuaGVhZCkge1xuICAgICAgcmV0dXJuIGZpbmRUYXJnZXQodGhpcy5yb290RWxlbWVudCwgW1xuICAgICAgICAnaGVhZCcsXG4gICAgICAgIGBkaXZbJHtfX01vY2tIZWFkX199XWAsXG4gICAgICBdKSBhcyBFbGVtZW50O1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgbG9jYXRpb24gb2YgdGhlIGRlc3RpbmF0aW9uIG5vZGUgaXMgbm90IGEgY29udGFpbmVyIHRvIHRoZSBjb250YWluZXIgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgLy8gSGFzIG5vdCBiZWVuIGFkZGVkIHRvIHRoZSBjb250YWluZXIsIG9yIGNhbm5vdCBiZSBzZWFyY2hlZCB0aHJvdWdoIGRvY3VtZW50IGluIHNoYWRvdyBkb21cbiAgICBpZiAoXG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmNvbnRhaW5zKHBhcmVudE5vZGUpIHx8XG4gICAgICAhZG9jdW1lbnQuY29udGFpbnMocGFyZW50Tm9kZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuICAgIH1cblxuICAgIGlmIChkZWZhdWx0SW5zZXJ0ID09PSAnaGVhZCcpIHtcbiAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHRoaXMucm9vdEVsZW1lbnQsIFtcbiAgICAgICAgJ2hlYWQnLFxuICAgICAgICBgZGl2WyR7X19Nb2NrSGVhZF9ffV1gLFxuICAgICAgXSkgYXMgRWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKGRlZmF1bHRJbnNlcnQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGZpbmRUYXJnZXQodGhpcy5yb290RWxlbWVudCwgW1xuICAgICAgICAnYm9keScsXG4gICAgICAgIGBkaXZbJHtfX01vY2tCb2R5X199XWAsXG4gICAgICBdKSBhcyBFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgfVxuXG4gIGFwcGVuZChjb250ZXh0OiBFbGVtZW50LCBhcmdzOiBJQXJndW1lbnRzLCBvcmlnaW5Qcm9jZXNzOiBGdW5jdGlvbikge1xuICAgIGxldCBjb252ZXJ0ZWROb2RlO1xuICAgIGxldCBwYXJlbnROb2RlID0gY29udGV4dDtcbiAgICBjb25zdCB7IGJhc2VVcmwsIG5hbWVzcGFjZSwgc3R5bGVTY29wZUlkIH0gPSB0aGlzLnNhbmRib3gub3B0aW9ucztcblxuICAgIC8vIERlYWwgd2l0aCBzb21lIHN0YXRpYyByZXNvdXJjZSBub2Rlc1xuICAgIGlmIChzb3VyY2VMaXN0VGFncy5pbmNsdWRlcyh0aGlzLnRhZ05hbWUpKSB7XG4gICAgICB0aGlzLmZpeFJlc291cmNlTm9kZVVybCh0aGlzLmVsKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZHluYW1pYyBzY3JpcHQgbm9kZSBieSBsb2FkZXJcbiAgICBpZiAodGhpcy5pcygnc2NyaXB0JykpIHtcbiAgICAgIHBhcmVudE5vZGUgPSB0aGlzLmZpbmRQYXJlbnROb2RlSW5BcHAoY29udGV4dCwgJ2JvZHknKTtcbiAgICAgIGNvbnZlcnRlZE5vZGUgPSB0aGlzLmFkZER5bmFtaWNTY3JpcHROb2RlKCk7XG4gICAgfVxuICAgIC8vIFRoZSBzdHlsZSBub2RlIG5lZWRzIHRvIGJlIHBsYWNlZCBpbiB0aGUgc2FuZGJveCByb290IGNvbnRhaW5lclxuICAgIGVsc2UgaWYgKHRoaXMuaXMoJ3N0eWxlJykpIHtcbiAgICAgIHBhcmVudE5vZGUgPSB0aGlzLmZpbmRQYXJlbnROb2RlSW5BcHAoY29udGV4dCwgJ2hlYWQnKTtcbiAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgU3R5bGVNYW5hZ2VyKHRoaXMuZWwudGV4dENvbnRlbnQpO1xuICAgICAgbWFuYWdlci5jb3JyZWN0UGF0aChiYXNlVXJsKTtcbiAgICAgIGlmIChzdHlsZVNjb3BlSWQpIHtcbiAgICAgICAgbWFuYWdlci5zZXRTY29wZSh7XG4gICAgICAgICAgYXBwTmFtZTogbmFtZXNwYWNlLFxuICAgICAgICAgIHJvb3RFbElkOiBzdHlsZVNjb3BlSWQoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVsLnRleHRDb250ZW50ID0gbWFuYWdlci50cmFuc2Zvcm1Db2RlKG1hbmFnZXIuc3R5bGVDb2RlKTtcbiAgICAgIGNvbnZlcnRlZE5vZGUgPSB0aGlzLmVsO1xuICAgICAgdGhpcy5zYW5kYm94LmR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldC5hZGQodGhpcy5lbCk7XG4gICAgICB0aGlzLm1vbml0b3JDaGFuZ2VzT2ZTdHlsZSgpO1xuICAgIH1cbiAgICAvLyBUaGUgbGluayBub2RlIG9mIHRoZSByZXF1ZXN0IGNzcyBuZWVkcyB0byBiZSBjaGFuZ2VkIHRvIHN0eWxlIG5vZGVcbiAgICBlbHNlIGlmICh0aGlzLmlzKCdsaW5rJykpIHtcbiAgICAgIHBhcmVudE5vZGUgPSB0aGlzLmZpbmRQYXJlbnROb2RlSW5BcHAoY29udGV4dCwgJ2hlYWQnKTtcbiAgICAgIGlmICh0aGlzLmVsLnJlbCA9PT0gJ3N0eWxlc2hlZXQnICYmIHRoaXMuZWwuaHJlZikge1xuICAgICAgICBjb252ZXJ0ZWROb2RlID0gdGhpcy5hZGREeW5hbWljTGlua05vZGUoKHN0eWxlTm9kZSkgPT5cbiAgICAgICAgICB0aGlzLm5hdGl2ZUFwcGVuZC5jYWxsKHBhcmVudE5vZGUsIHN0eWxlTm9kZSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb252ZXJ0ZWROb2RlID0gdGhpcy5lbDtcbiAgICAgICAgdGhpcy5tb25pdG9yQ2hhbmdlc09mTGlua05vZGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb2xsZWN0IG5vZGVzIHRoYXQgZXNjYXBlIHRoZSBjb250YWluZXIgbm9kZVxuICAgIGlmIChcbiAgICAgICF0aGlzLnJvb3RFbGVtZW50LmNvbnRhaW5zKHBhcmVudE5vZGUpICYmXG4gICAgICBkb2N1bWVudC5jb250YWlucyhwYXJlbnROb2RlKVxuICAgICkge1xuICAgICAgaWYgKHBhcmVudE5vZGUgIT09IHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zYW5kYm94LmRlZmVyQ2xlYXJFZmZlY3RzLmFkZCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5ET01BcGlzLnJlbW92ZUVsZW1lbnQodGhpcy5lbCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpeCBpbm5lckhUTUwgZG9tIGlmcmFtZVx1MzAwMWltZyBzcmNcbiAgICBpZiAodGhpcy5lbCAmJiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAgIGxldCBuZWVkRml4RG9tID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUsaW1nLHZpZGVvLGxpbmssc2NyaXB0LGF1ZGlvLHN0eWxlJyk7XG4gICAgICBpZiAobmVlZEZpeERvbS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5lZWRGaXhEb20uZm9yRWFjaCgoZG9tKT0+e1xuICAgICAgICAgIHNhZmVXcmFwcGVyKCgpPT4gdGhpcy5maXhSZXNvdXJjZU5vZGVVcmwoZG9tKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpeCB0aGUgYnVnIG9mIHJlYWN0IGhtclxuICAgIGlmICh0aGlzLmlzKCdpZnJhbWUnKSAmJiB0eXBlb2YgdGhpcy5lbC5vbmxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHsgZWwsIHNhbmRib3ggfSA9IHRoaXM7XG4gICAgICBjb25zdCBvcmlnaW5PbmxvYWQgPSBlbC5vbmxvYWQ7XG4gICAgICBlbC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNhZmVXcmFwcGVyKCgpID0+IGRlZihlbC5jb250ZW50V2luZG93LCAncGFyZW50Jywgc2FuZGJveC5nbG9iYWwpKTtcbiAgICAgICAgcmV0dXJuIG9yaWdpbk9ubG9hZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY29udmVydGVkTm9kZSkge1xuICAgICAgLy8gSWYgaXQgaXMgXCJpbnNlcnRCZWZvcmVcIiBvciBcImluc2VydEFkamFjZW50RWxlbWVudFwiIG1ldGhvZCwgbm8gbmVlZCB0byByZXdyaXRlIHdoZW4gYWRkZWQgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgaWYgKFxuICAgICAgICBpc0luc2VydE1ldGhvZCh0aGlzLm1ldGhvZE5hbWUpICYmXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY29udGFpbnMoY29udGV4dCkgJiZcbiAgICAgICAgYXJnc1sxXT8ucGFyZW50Tm9kZSA9PT0gY29udGV4dFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5Qcm9jZXNzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtaXQgc2FuZGJveCBgYXBwZW5kTm9kZWAgZXZlbnRcbiAgICAgIHRoaXMuc2FuZGJveC5ob29rcy5saWZlY3ljbGUuYXBwZW5kTm9kZS5lbWl0KFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICB0aGlzLmVsLFxuICAgICAgICBjb252ZXJ0ZWROb2RlLFxuICAgICAgICB0aGlzLnRhZ05hbWUsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRoaXMubmF0aXZlQXBwZW5kLmNhbGwocGFyZW50Tm9kZSwgY29udmVydGVkTm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5Qcm9jZXNzKCk7XG4gIH1cblxuICByZW1vdmVDaGlsZChjb250ZXh0OiBFbGVtZW50LCBvcmlnaW5Qcm9jZXNzOiBGdW5jdGlvbikge1xuICAgIC8vIHJlbW92ZSBjb21tZW50IG5vZGUgYW5kIHJldHVybiB0aGUgcmVhbCBub2RlXG4gICAgaWYgKHR5cGVvZiB0aGlzLmVsW19fUkVNT1ZFX05PREVfX10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZWxbX19SRU1PVkVfTk9ERV9fXSgpO1xuICAgICAgcmV0dXJuIHRoaXMuZWw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXMoJ3N0eWxlJykgfHwgdGhpcy5pcygnbGluaycpIHx8IHRoaXMuaXMoJ3NjcmlwdCcpKSB7XG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5maW5kUGFyZW50Tm9kZUluQXBwKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICB0aGlzLmlzKCdzY3JpcHQnKSA/ICdib2R5JyA6ICdoZWFkJyxcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUgPT09IHBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2FuZGJveC5keW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQuaGFzKHRoaXMuZWwpKSB7XG4gICAgICAgICAgdGhpcy5zYW5kYm94LmR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldC5kZWxldGUodGhpcy5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlUmVtb3ZlLmNhbGwocGFyZW50Tm9kZSwgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5Qcm9jZXNzKCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTeW5jSG9vaywgU3luY1dhdGVyZmFsbEhvb2ssIFBsdWdpblN5c3RlbSB9IGZyb20gJ0BnYXJmaXNoL2hvb2tzJztcbmltcG9ydCB0eXBlIHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBGYWtlV2luZG93IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRHZXR0ZXJEYXRhIHtcbiAgdmFsdWU6IGFueTtcbiAgcHJvcE5hbWU6IFByb3BlcnR5S2V5O1xuICBwcm94eURvY3VtZW50OiBEb2N1bWVudDtcbiAgcm9vdE5vZGU/OiBudWxsIHwgRWxlbWVudCB8IFNoYWRvd1Jvb3Q7XG4gIGN1c3RvbVZhbHVlPzogYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FuZGJveExpZmVjeWNsZSgpIHtcbiAgcmV0dXJuIG5ldyBQbHVnaW5TeXN0ZW0oe1xuICAgIGNsb3NlZDogbmV3IFN5bmNIb29rPFtdLCB2b2lkPigpLFxuICAgIHN0YXJlZDogbmV3IFN5bmNIb29rPFtGYWtlV2luZG93P10sIHZvaWQ+KCksXG4gICAgYXBwZW5kTm9kZTogbmV3IFN5bmNIb29rPFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBzdHJpbmddLCB2b2lkPigpLFxuICAgIGRvY3VtZW50R2V0dGVyOiBuZXcgU3luY1dhdGVyZmFsbEhvb2s8RG9jdW1lbnRHZXR0ZXJEYXRhPignZG9jdW1lbnRHZXR0ZXInKSxcbiAgICBiZWZvcmVDbGVhckVmZmVjdDogbmV3IFN5bmNIb29rPFtdLCB2b2lkPigpLFxuICAgIGFmdGVyQ2xlYXJFZmZlY3Q6IG5ldyBTeW5jSG9vazxbXSwgdm9pZD4oKSxcbiAgICBiZWZvcmVJbnZva2U6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtcbiAgICAgICAgeyBjb2RlOiBzdHJpbmcgfSxcbiAgICAgICAgc3RyaW5nPyxcbiAgICAgICAgUmVjb3JkPHN0cmluZywgYW55Pj8sXG4gICAgICAgIGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnM/LFxuICAgICAgXSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gICAgYWZ0ZXJJbnZva2U6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtcbiAgICAgICAgeyBjb2RlOiBzdHJpbmcgfSxcbiAgICAgICAgc3RyaW5nPyxcbiAgICAgICAgUmVjb3JkPHN0cmluZywgYW55Pj8sXG4gICAgICAgIGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnM/LFxuICAgICAgXSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gICAgaW52b2tlRXJyb3I6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtFcnJvciwgc3RyaW5nPywgUmVjb3JkPHN0cmluZywgYW55Pj8sIGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnM/XSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gIH0pO1xufVxuIiwgImltcG9ydCB7IHdhcm4sIGhhc093biwgc2FmYXJpMTNEZWFsIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgaXNFc0dsb2JhbE1ldGhvZHMsIGlzTmF0aXZlQ29kZU1ldGhvZHMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBfX3dpbmRvd0JpbmRfXywgR0FSRklTSF9PUFRJTUlaRV9OQU1FIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHtcbiAgYmluZCxcbiAgaXNDb25zdHJ1Y3RvcixcbiAgdmVyaWZ5R2V0dGVyRGVzY3JpcHRvcixcbiAgdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcixcbn0gZnJvbSAnLi9zaGFyZWQnO1xuXG4vLyB3aW5kb3cgcHJveHkgZ2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2V0dGVyKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFdpbmRvdywgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyOiBhbnkpID0+IHtcbiAgICBpZiAocCA9PT0gU3ltYm9sLnVuc2NvcGFibGVzKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCB2YWx1ZTtcbiAgICBjb25zdCB7IG92ZXJyaWRlTGlzdCB9ID0gc2FuZGJveC5yZXBsYWNlR2xvYmFsVmFyaWFibGVzO1xuXG4gICAgaWYgKHNhbmRib3guaXNQcm90ZWN0VmFyaWFibGUocCkpIHtcbiAgICAgIC8vIERvbid0IHBhc3MgdGhlIFwicmVjZWl2ZXJcIiwgb3RoZXJ3aXNlIGl0IHdpbGwgY2F1c2UgdGhlIHdyb25nIHBvaW50IG9mIHRoaXNcbiAgICAgIHJldHVybiBSZWZsZWN0LmdldCh3aW5kb3csIHApO1xuICAgIH0gZWxzZSBpZiAoc2FuZGJveC5pc0luc3VsYXRpb25WYXJpYWJsZShwKSkge1xuICAgICAgdmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBoYXNPd24odGFyZ2V0LCBwKVxuICAgICAgICA/IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpXG4gICAgICAgIDogUmVmbGVjdC5nZXQod2luZG93LCBwKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBUaGUgZm9sbG93aW5nIHNpdHVhdGlvbnMgZG8gbm90IHJlcXVpcmUgXCJiaW5kXCJcbiAgICAgIC8vICAxLiBUaGUgZ2xvYmFsIG1ldGhvZCBvbiB0aGUgbmF0aXZlIGVzIHN0YW5kYXJkXG4gICAgICAvLyAgMi4gTWV0aG9kcyBpbnRlcm5hbCB0byB0aGUgc2FuZGJveCBvciByZXdyaXR0ZW4gYnkgdGhlIHVzZXJcbiAgICAgIC8vICAzLiBDb25zdHJ1Y3RvclxuICAgICAgLy8gQWZ0ZXIgZmlsdGVyaW5nIG91dCBjdXN0b20gYW5kIG5hdGl2ZSBlcyBmdW5jdGlvbnMsIG9ubHkgYm9tIGFuZCBkb20gZnVuY3Rpb25zIGFyZSBsZWZ0XG4gICAgICAvLyBNYWtlIGp1ZGdtZW50cyBzdWNoIGFzIGNvbnN0cnVjdG9ycyBmb3IgdGhlc2UgZW52aXJvbm1lbnQtcmVsYXRlZCBmdW5jdGlvbnMgdG8gZnVydGhlciBuYXJyb3cgdGhlIHNjb3BlIG9mIGJpbmRcbiAgICAgIGlmIChcbiAgICAgICAgaXNFc0dsb2JhbE1ldGhvZHMocCkgfHxcbiAgICAgICAgaXNOYXRpdmVDb2RlTWV0aG9kcyhwKSB8fFxuICAgICAgICBoYXNPd24ob3ZlcnJpZGVMaXN0LCBwKSB8fFxuICAgICAgICBpc0NvbnN0cnVjdG9yKHZhbHVlKSB8fFxuICAgICAgICBzYW5kYm94LmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5oYXMocClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhhc093bih2YWx1ZSwgX193aW5kb3dCaW5kX18pXG4gICAgICA/IHZhbHVlW19fd2luZG93QmluZF9fXVxuICAgICAgOiBiaW5kKHZhbHVlLCB3aW5kb3cpO1xuICAgIGNvbnN0IHZlcmlmeVJlc3VsdCA9IHZlcmlmeUdldHRlckRlc2NyaXB0b3IodGFyZ2V0LCBwLCBuZXdWYWx1ZSk7XG4gICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEpIHJldHVybiB2YWx1ZTtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDIpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhbHVlW19fd2luZG93QmluZF9fXSA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfTtcbn1cblxuY29uc3Qgc2FmYXJpUHJveHlXaW5kb3dEZWFsSGFuZGxlciA9IHNhZmFyaTEzRGVhbCgpO1xuXG4vLyB3aW5kb3cgcHJveHkgc2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGVyKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFdpbmRvdywgcDogUHJvcGVydHlLZXksIHZhbHVlOiB1bmtub3duLCByZWNlaXZlcjogYW55KSA9PiB7XG4gICAgY29uc3QgdmVyaWZ5UmVzdWx0ID0gdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcihcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgc2FuZGJveC5pc1Byb3RlY3RWYXJpYWJsZShwKVxuICAgICAgICA/IHdpbmRvd1xuICAgICAgICA6IHJlY2VpdmVyXG4gICAgICAgICAgPyByZWNlaXZlclxuICAgICAgICAgIDogdGFyZ2V0LFxuICAgICAgcCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gICAgLy8gSWYgdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCB0aGUgc2V0dGluZyBzdWNjZXNzIHdpbGwgYmUgcmV0dXJuZWQgZGlyZWN0bHkuIENhbm5vdCBiZSBzZXQgYW5kIHJldHVybiB0byBmYWlsdXJlIGRpcmVjdGx5LlxuICAgIC8vIFwiUmVmbGVjdC5zZXRcIiBkb2VzIG5vdCBwZXJmb3JtIHRoaXMgcGFydCBvZiBwcm9jZXNzaW5nIGJ5IGRlZmF1bHQgaW4gc2FmYXJpXG4gICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEgfHwgdmVyaWZ5UmVzdWx0ID09PSAyKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAzKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2FuZGJveC5pc1Byb3RlY3RWYXJpYWJsZShwKSkge1xuICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHdpbmRvdywgcCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjdXJyZW50IGlzIHNldHRpbmdcbiAgICAgIHNhZmFyaVByb3h5V2luZG93RGVhbEhhbmRsZXIudHJpZ2dlclNldCgpO1xuICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIGlmIChzYW5kYm94LmluaXRDb21wbGV0ZSkge1xuICAgICAgICAgIHNhbmRib3guaXNFeHRlcm5hbEdsb2JhbFZhcmlhYmxlLmFkZChwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBuZWVkIG9wdGltaXphdGlvbiB2YXJpYWJsZXNcbiAgICAgICAgaWYgKHNhbmRib3guZ2xvYmFsKSB7XG4gICAgICAgICAgY29uc3QgbWV0aG9kcyA9IHNhbmRib3guZ2xvYmFsW2Ake0dBUkZJU0hfT1BUSU1JWkVfTkFNRX1NZXRob2RzYF07XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWV0aG9kcykpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmluY2x1ZGVzKHApKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVN0YWNrID1cbiAgICAgICAgICAgICAgICBzYW5kYm94Lmdsb2JhbFtgJHtHQVJGSVNIX09QVElNSVpFX05BTUV9VXBkYXRlU3RhY2tgXTtcbiAgICAgICAgICAgICAgdXBkYXRlU3RhY2suZm9yRWFjaCgoZm4pID0+IGZuKHAsIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VjY2VzcztcbiAgICB9XG4gIH07XG59XG5cbi8vIHdpbmRvdyBwcm94eSBkZWZpbmVQcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlZmluZVByb3BlcnR5KHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFdpbmRvdywgcDogUHJvcGVydHlLZXksIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikgPT4ge1xuICAgIHNhZmFyaVByb3h5V2luZG93RGVhbEhhbmRsZXIuaGFuZGxlRGVzY3JpcHRvcihkZXNjcmlwdG9yKTtcblxuICAgIGlmIChzYW5kYm94LmlzUHJvdGVjdFZhcmlhYmxlKHApKSB7XG4gICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIHAsIGRlc2NyaXB0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHAsIGRlc2NyaXB0b3IpO1xuICAgICAgaWYgKHNhbmRib3guaW5pdENvbXBsZXRlICYmIHN1Y2Nlc3MpIHtcbiAgICAgICAgc2FuZGJveC5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuYWRkKHApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfVxuICB9O1xufVxuXG4vLyB3aW5kb3cgcHJveHkgZGVsZXRlUHJvcGVydHlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWxldGVQcm9wZXJ0eShzYW5kYm94OiBTYW5kYm94KSB7XG4gIHJldHVybiAodGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5KSA9PiB7XG4gICAgaWYgKGhhc093bih0YXJnZXQsIHApKSB7XG4gICAgICBkZWxldGUgdGFyZ2V0W3AgYXMgYW55XTtcbiAgICAgIGlmIChzYW5kYm94LmluaXRDb21wbGV0ZSAmJiBzYW5kYm94LmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5oYXMocCkpIHtcbiAgICAgICAgc2FuZGJveC5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuZGVsZXRlKHApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgIGlmIChoYXNPd24od2luZG93LCBwKSAmJiBzYW5kYm94LmlzUHJvdGVjdFZhcmlhYmxlKHApKSB7XG4gICAgICAgIHdhcm4oYFRoZSBcIiR7U3RyaW5nKHApfVwiIGlzIGdsb2JhbCBwcm90ZWN0IHZhcmlhYmxlLlwiYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG4vLyB3aW5kb3cgcHJveHkgaGFzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuIChfdGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5KSA9PiB7XG4gICAgaWYgKHNhbmRib3guaXNQcm90ZWN0VmFyaWFibGUocCkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoKHNhbmRib3ggYXMgYW55KS5lbnZWYXJpYWJsZSA9PT0gcCkgcmV0dXJuIGZhbHNlO1xuICAg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
