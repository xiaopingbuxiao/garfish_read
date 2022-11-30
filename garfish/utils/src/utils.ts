export const noop = () => {};

export const objectToString = Object.prototype.toString;

export const supportWasm = typeof WebAssembly === 'object';

export const idleCallback =
  window.requestIdleCallback || window.requestAnimationFrame;

export function createKey() {
  return Math.random().toString(36).substr(2, 8);
}

export function isObject(val: any) {
  return val && typeof val === 'object';
}

export function isPlainObject(val: any): val is Object {
  return objectToString.call(val) === '[object Object]';
}

export function getType(val: any) {
  return objectToString.call(val).slice(8, -1).toLowerCase();
}

export function isPromise(obj: any): obj is Promise<any> {
  return isObject(obj) && typeof obj.then === 'function';
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: any, key: PropertyKey): boolean {
  return hasOwnProperty.call(obj, key);
}

export function def(obj: Object, key: string, value: any) {
  Object.defineProperty(obj, key, {
    get: () => value,
    set: (val: any) => {
      if (__DEV__) {
        if (val !== value) {
          error(`Try to modify a read-only property ${key}`);
        }
      }
    },
    configurable: __DEV__ ? true : false,
  });
}

// Array to Object `['a'] => { a: true }`
export function makeMap<T extends Array<PropertyKey>>(list: T) {
  const map: { [k in T[number]]: true } = Object.create(null);
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return (val: PropertyKey) => !!map[val];
}

// Array to Object `['a'] => { a: true }`
export function makeMapObject<T extends Array<string>>(list: T) {
  const map: { [k in T[number]]: true } = Object.create(null);
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return map as { [k in T[number]]: true };
}

export function inBrowser() {
  return typeof window !== 'undefined';
}

const warnPrefix = '[Garfish warning]';
const processError = (
  error: string | Error,
  fn: (val: string | Error, isString: boolean) => void,
) => {
  try {
    if (typeof error === 'string') {
      error = `${warnPrefix}: ${error}\n\n`;
      fn(error, true);
    } else if (error instanceof Error) {
      if (!error.message.startsWith(warnPrefix)) {
        error.message = `${warnPrefix}: ${error.message}`;
      }
      fn(error, false);
    }
  } catch (e) {
    fn(error, typeof error === 'string');
  }
};

export function warn(msg: string | Error) {
  processError(msg, (e, isString) => {
    const warnMsg = isString ? e : (e as Error).message;
    if (__TEST__) {
      callTestCallback(warn, warnMsg);
      return;
    }
    console.warn(warnMsg);
  });
}

export function error(error: string | Error) {
  processError(error, (e, isString) => {
    if (isString) {
      throw new Error(e as string);
    } else {
      throw e;
    }
  });
}

export function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

// When the string is set as the object property name,
// it will be attempted to be transformed into a constant version to avoid repeated caching by the browser
export function internFunc(internalizeString) {
  // Don't consider "Hash-collision，https://en.wikipedia.org/wiki/Collision_(computer_science)"
  // v8 貌似在 16383 长度时会发生 hash-collision 经过测试后发现正常
  const temporaryOb = {};
  temporaryOb[internalizeString] = true;
  return Object.keys(temporaryOb)[0];
}

export function evalWithEnv(
  code: string,
  params: Record<string, any>,
  context: any,
  useStrict = false,
) {
  const keys = Object.keys(params);
  const nativeWindow = (0, eval)('window;');
  // No random value can be used, otherwise it cannot be reused as a constant string
  const randomValKey = '__garfish__exec_temporary__';
  const values = keys.map((k) => `window.${randomValKey}.${k}`);
  const contextKey = '__garfish_exec_temporary_context__';

  try {
    nativeWindow[randomValKey] = params;
    nativeWindow[contextKey] = context;
    const evalInfo = [
      `;(function(${keys.join(',')}){${useStrict ? '"use strict";' : ''}`,
      `\n}).call(window.${contextKey},${values.join(',')});`,
    ];
    const internalizeString = internFunc(evalInfo[0] + code + evalInfo[1]);
    // (0, eval) This expression makes the eval under the global scope
    (0, eval)(internalizeString);
  } catch (e) {
    throw e;
  } finally {
    delete nativeWindow[randomValKey];
    delete nativeWindow[contextKey];
  }
}

export function safeWrapper(callback: (...args: Array<any>) => any) {
  try {
    callback();
  } catch (e) {
    __DEV__ && warn(e);
  }
}

export function nextTick(cb: () => void): void {
  Promise.resolve().then(cb);
}

export function assert(
  condition: any,
  msg?: string | Error,
): asserts condition {
  if (!condition) {
    error(msg || 'unknow reason');
  }
}

export function toBoolean(val: any) {
  if (val === '') return true;
  if (val === 'false') return false;
  return Boolean(val);
}

export function remove<T>(list: Array<T> | Set<T>, el: T) {
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

// 有些测试 jest.mock 不好测，可用这个工具方法
export function callTestCallback(obj: any, ...args: any[]) {
  if (__TEST__) {
    const oncalled = obj._oncalled;
    if (typeof oncalled === 'function') {
      oncalled.apply(null, args);
    }
  }
}

// 数组去重，不保证顺序
export function unique<T>(list: Array<T>) {
  const res: Array<T> = [];
  for (let i = 0, len = list.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (list[i] === list[j]) {
        j = ++i;
      }
    }
    res.push(list[i]);
  }
  return __TEST__ ? res.sort() : res;
}

export function isPrimitive(val: any) {
  return (
    val === null ||
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'bigint' ||
    typeof val === 'symbol' ||
    typeof val === 'boolean' ||
    typeof val === 'undefined'
  );
}

export function filterUndefinedVal<T extends Object>(ob: T) {
  return Object.keys(ob).reduce((res: T, key: any) => {
    if (res[key] === undefined) {
      delete res[key];
    }
    return res;
  }, ob);
}

// Deeply merge two objects, can handle circular references, the latter overwrite the previous
export function deepMerge<K, T>(
  o: K,
  n: T,
  dp?: boolean,
  ignores?: Array<string>,
) {
  const leftRecord = new WeakMap();
  const rightRecord = new WeakMap();
  const valueRecord = new WeakMap();
  const ignoresMap = makeMap(ignores || []);

  const isArray = Array.isArray;
  const isAllRefs = (a, b) => {
    if (leftRecord.has(a) || rightRecord.has(a)) {
      return leftRecord.has(b) || rightRecord.has(b);
    }
  };

  const clone = (v) => {
    // Deep clone
    if (isPrimitive(v) || typeof v === 'function') {
      return v;
    } else if (valueRecord.has(v)) {
      return valueRecord.get(v);
    } else if (leftRecord.has(v)) {
      return leftRecord.get(v);
    } else if (rightRecord.has(v)) {
      return rightRecord.get(v);
    } else if (isArray(v)) {
      if (dp) v = unique(v);
      const arr: Array<any> = [];
      valueRecord.set(v, arr);
      for (let i = 0, len = v.length; i < len; i++) {
        arr[i] = clone(v[i]);
      }
      return arr;
    } else if (typeof v === 'object') {
      const obj = {};
      valueRecord.set(v, obj);
      const keys = Reflect.ownKeys(v);
      keys.forEach((key) => (obj[key] = clone(v[key])));
      return obj;
    }
  };

  const setValue = (r, k, key) => {
    if (r.has(k)) {
      return r.get(k);
    } else {
      // Ignore the content does not need to copy
      if (ignoresMap[key]) {
        return k;
      }
      const val = clone(k);
      if (!isPrimitive(val) && typeof val !== 'function') {
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
          res[key] = isAllRefs(lv, rv)
            ? leftRecord.get(lv) // The same value on the left and right, whichever is OK
            : mergeObject(lv, rv);
        } else {
          res[key] = setValue(rightRecord, rv, key);
        }
      } else {
        res[key] = setValue(leftRecord, lv, key);
      }
    });

    rightKeys.forEach((key) => {
      if (hasOwn(res, key)) return;
      res[key] = setValue(rightRecord, r[key], key);
    });

    return res;
  };

  return mergeObject(o, n) as K & T;
}

// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
export function isAbsolute(url: string) {
  // `c:\\` 这种 case 返回 false，在浏览器中使用本地图片，应该用 file 协议
  if (!/^[a-zA-Z]:\\/.test(url)) {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
      return true;
    }
  }
  return false;
}

export function transformUrl(resolvePath: string, curPath: string) {
  const baseUrl = new URL(resolvePath, location.href);
  const realPath = new URL(curPath, baseUrl.href);
  return realPath.href;
}

export function toWsProtocol(url: string) {
  const data = new URL(url);
  if (data.protocol.startsWith('http')) {
    data.protocol = data.protocol === 'https:' ? 'wss:' : 'ws:';
    return data.toString();
  }
  return url;
}

export function findTarget(
  el: Element | ShadowRoot | Document,
  selectors: Array<string>,
) {
  for (const s of selectors) {
    const target = el.querySelector(s);
    if (target) return target;
  }
  return el;
}

export function setDocCurrentScript(
  target,
  code: string,
  define?: boolean,
  url?: string,
  async?: boolean,
  originScript?: HTMLScriptElement,
) {
  if (!target) return noop;
  const el = document.createElement('script');
  
  if (!url && code) {
    el.textContent = code;
  }

  originScript && originScript.getAttributeNames().forEach((attribute) => {
    el.setAttribute(attribute, originScript.getAttribute(attribute) || '');
  });

  if (async) {
    el.setAttribute('async', 'true');
  }
 
  const set = (val) => {
    try {
      if (define) {
        Object.defineProperty(target, 'currentScript', {
          value: val,
          writable: true,
          configurable: true,
        });
      } else {
        target.currentScript = val;
      }
    } catch (e) {
      if (__DEV__) {
        warn(e);
      }
    }
  };

  set(el);
  return () => safeWrapper(()=> delete target.currentScript);
}

export function _extends(d, b) {
  Object.setPrototypeOf(d, b);

  function fNOP(this: any) {
    this.constructor = d;
  }

  if (b === null) {
    d.prototype = Object.create(b);
  } else {
    if (b.prototype) fNOP.prototype = b.prototype;
    d.prototype = new fNOP();
  }
}

export function mapObject(
  obj: Record<PropertyKey, any>,
  fn: (key: PropertyKey, val: any) => any,
) {
  const destObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      destObject[key] = fn(key, obj[key]);
    }
  }
  return destObject;
}

export function toBase64(input: string, mimeType?: string) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(new Blob([input], { type: mimeType }));
    reader.onload = () => resolve(reader.result as string);
  });
}

export const hookObjectProperty = <
  T extends {},
  K extends keyof T,
  P extends any[],
>(
  obj: T,
  key: K,
  hookFunc: (origin: T[K], ...params: P) => T[K],
) => {
  return (...params: P) => {
    if (!obj) {
      return noop;
    }
    const origin = obj[key];
    const hookedUnsafe = hookFunc(origin, ...params);
    let hooked = hookedUnsafe;

    // To method packages a layer of a try after all the hooks to catch
    if (typeof hooked === 'function') {
      hooked = function (this: any, ...args: any) {
        try {
          return (hookedUnsafe as any).apply(this, args);
        } catch (e) {
          return typeof origin === 'function' && origin.apply(this, args);
        }
      } as any as T[K];
    }
    obj[key] = hooked;

    return (strict?: boolean) => {
      if (!strict || hooked === obj[key]) {
        obj[key] = origin;
      }
    };
  };
};

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getGarfishDebugInstanceName(): string | null {
  const DEBUG_GARFISH_TAG = '__GARFISH_INSTANCE_DEBUG__';
  return (
    localStorage.getItem(DEBUG_GARFISH_TAG) ||
    getParameterByName(DEBUG_GARFISH_TAG)
  );
}

// Reflect.set will be called in the set callback, and the DefineProperty callback will be triggered after Reflect.set is called.
// but the descriptor values ​​writable, enumerable, and configurable on safari 13.x version are set to false for the second time
// set and defineProperty callback is async Synchronize back
// Set the default when calling defineProperty through set ​​writable, enumerable, and configurable default to true
// safari 13.x default use strict mode，descriptor's ​​writable is false can't set again
// deal safari 13
export function safari13Deal() {
  let fromSetFlag = false;
  return {
    triggerSet() {
      fromSetFlag = true;
    },
    // reason: Reflect.set
    // Object.defineProperty is used to implement, so defineProperty is triggered when set is triggered
    // but the descriptor values ​​writable, enumerable, and configurable on safari 13.x version are set to false for the second time
    handleDescriptor(descriptor: PropertyDescriptor) {
      if (fromSetFlag === true) {
        fromSetFlag = false;
        if (descriptor?.writable === false) descriptor.writable = true;
        if (descriptor?.enumerable === false) descriptor.enumerable = true;
        if (descriptor?.configurable === false) descriptor.configurable = true;
      }
    },
  };
}

const SOURCEMAP_REG = /[@#] sourceMappingURL=/g;
export function haveSourcemap(code: string) {
  return SOURCEMAP_REG.test(code);
}

export async function createSourcemap(code: string, filename: string) {
  const content = await toBase64(
    JSON.stringify({
      version: 3,
      sources: [filename],
      sourcesContent: [code],
      mappings:
        ';' +
        code
          .split('\n')
          .map(() => 'AACA')
          .join(';'),
    }),
  );
  return `//@ sourceMappingURL=${content}`;
}
