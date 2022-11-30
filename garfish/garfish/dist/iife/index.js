(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
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
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // ../../node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
  var require_ms = __commonJS({
    "../../node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
  var require_common = __commonJS({
    "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug2.debug = createDebug2;
        createDebug2.default = createDebug2;
        createDebug2.coerce = coerce;
        createDebug2.disable = disable;
        createDebug2.enable = enable;
        createDebug2.enabled = enabled;
        createDebug2.humanize = require_ms();
        createDebug2.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug2[key] = env[key];
        });
        createDebug2.names = [];
        createDebug2.skips = [];
        createDebug2.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug2.colors[Math.abs(hash) % createDebug2.colors.length];
        }
        createDebug2.selectColor = selectColor;
        function createDebug2(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self = debug;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug2.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug2.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug2.formatArgs.call(self, args);
            const logFn = self.log || createDebug2.log;
            logFn.apply(self, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug2.useColors();
          debug.color = createDebug2.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug2.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug2.namespaces) {
                namespacesCache = createDebug2.namespaces;
                enabledCache = createDebug2.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug2.init === "function") {
            createDebug2.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug2(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug2.save(namespaces);
          createDebug2.namespaces = namespaces;
          createDebug2.names = [];
          createDebug2.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug2.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            } else {
              createDebug2.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug2.names.map(toNamespace),
            ...createDebug2.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug2.enable("");
          return namespaces;
        }
        function enabled(name) {
          if (name[name.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug2.skips.length; i < len; i++) {
            if (createDebug2.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = createDebug2.names.length; i < len; i++) {
            if (createDebug2.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug2.enable(createDebug2.load());
        return createDebug2;
      }
      module.exports = setup;
    }
  });

  // ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error2) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error2) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error2) {
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error2) {
          return "[UnexpectedJSONParseError]: " + error2.message;
        }
      };
    }
  });

  // ../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
  var require_has_flag = __commonJS({
    "../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports, module) {
      "use strict";
      module.exports = (flag, argv) => {
        argv = argv || process.argv;
        const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
        const pos = argv.indexOf(prefix + flag);
        const terminatorPos = argv.indexOf("--");
        return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
      };
    }
  });

  // ../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js
  var require_supports_color = __commonJS({
    "../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports, module) {
      "use strict";
      var os = __require("os");
      var hasFlag = require_has_flag();
      var env = process.env;
      var forceColor;
      if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
        forceColor = false;
      } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
        forceColor = true;
      }
      if ("FORCE_COLOR" in env) {
        forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
      }
      function translateLevel(level) {
        if (level === 0) {
          return false;
        }
        return {
          level,
          hasBasic: true,
          has256: level >= 2,
          has16m: level >= 3
        };
      }
      function supportsColor(stream) {
        if (forceColor === false) {
          return 0;
        }
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
          return 3;
        }
        if (hasFlag("color=256")) {
          return 2;
        }
        if (stream && !stream.isTTY && forceColor !== true) {
          return 0;
        }
        const min = forceColor ? 1 : 0;
        if (process.platform === "win32") {
          const osRelease = os.release().split(".");
          if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
          }
          return 1;
        }
        if ("CI" in env) {
          if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
            return 1;
          }
          return min;
        }
        if ("TEAMCITY_VERSION" in env) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
        }
        if (env.COLORTERM === "truecolor") {
          return 3;
        }
        if ("TERM_PROGRAM" in env) {
          const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (env.TERM_PROGRAM) {
            case "iTerm.app":
              return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        if (/-256(color)?$/i.test(env.TERM)) {
          return 2;
        }
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
          return 1;
        }
        if ("COLORTERM" in env) {
          return 1;
        }
        if (env.TERM === "dumb") {
          return min;
        }
        return min;
      }
      function getSupportLevel(stream) {
        const level = supportsColor(stream);
        return translateLevel(level);
      }
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel(process.stdout),
        stderr: getSupportLevel(process.stderr)
      };
    }
  });

  // ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js
  var require_node = __commonJS({
    "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js"(exports, module) {
      var tty = __require("tty");
      var util = __require("util");
      exports.init = init2;
      exports.log = log2;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.destroy = util.deprecate(() => {
      }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      exports.colors = [6, 2, 3, 4, 5, 1];
      try {
        const supportsColor = require_supports_color();
        if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
          exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
          ];
        }
      } catch (error2) {
      }
      exports.inspectOpts = Object.keys(process.env).filter((key) => {
        return /^debug_/i.test(key);
      }).reduce((obj, key) => {
        const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
          return k.toUpperCase();
        });
        let val = process.env[key];
        if (/^(yes|on|true|enabled)$/i.test(val)) {
          val = true;
        } else if (/^(no|off|false|disabled)$/i.test(val)) {
          val = false;
        } else if (val === "null") {
          val = null;
        } else {
          val = Number(val);
        }
        obj[prop] = val;
        return obj;
      }, {});
      function useColors() {
        return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }
      function formatArgs(args) {
        const { namespace: name, useColors: useColors2 } = this;
        if (useColors2) {
          const c = this.color;
          const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
          const prefix = `  ${colorCode};1m${name} \x1B[0m`;
          args[0] = prefix + args[0].split("\n").join("\n" + prefix);
          args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
        } else {
          args[0] = getDate() + name + " " + args[0];
        }
      }
      function getDate() {
        if (exports.inspectOpts.hideDate) {
          return "";
        }
        return new Date().toISOString() + " ";
      }
      function log2(...args) {
        return process.stderr.write(util.format(...args) + "\n");
      }
      function save(namespaces) {
        if (namespaces) {
          process.env.DEBUG = namespaces;
        } else {
          delete process.env.DEBUG;
        }
      }
      function load() {
        return process.env.DEBUG;
      }
      function init2(debug) {
        debug.inspectOpts = {};
        const keys = Object.keys(exports.inspectOpts);
        for (let i = 0; i < keys.length; i++) {
          debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.o = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
      };
      formatters.O = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts);
      };
    }
  });

  // ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js
  var require_src = __commonJS({
    "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js"(exports, module) {
      if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
        module.exports = require_browser();
      } else {
        module.exports = require_node();
      }
    }
  });

  // ../../node_modules/.pnpm/eventemitter2@6.4.7/node_modules/eventemitter2/lib/eventemitter2.js
  var require_eventemitter2 = __commonJS({
    "../../node_modules/.pnpm/eventemitter2@6.4.7/node_modules/eventemitter2/lib/eventemitter2.js"(exports, module) {
      !function(undefined2) {
        var hasOwnProperty3 = Object.hasOwnProperty;
        var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        var defaultMaxListeners = 10;
        var nextTickSupported = typeof process == "object" && typeof process.nextTick == "function";
        var symbolsSupported = typeof Symbol === "function";
        var reflectSupported = typeof Reflect === "object";
        var setImmediateSupported = typeof setImmediate === "function";
        var _setImmediate = setImmediateSupported ? setImmediate : setTimeout;
        var ownKeys = symbolsSupported ? reflectSupported && typeof Reflect.ownKeys === "function" ? Reflect.ownKeys : function(obj) {
          var arr = Object.getOwnPropertyNames(obj);
          arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
          return arr;
        } : Object.keys;
        function init2() {
          this._events = {};
          if (this._conf) {
            configure.call(this, this._conf);
          }
        }
        function configure(conf) {
          if (conf) {
            this._conf = conf;
            conf.delimiter && (this.delimiter = conf.delimiter);
            if (conf.maxListeners !== undefined2) {
              this._maxListeners = conf.maxListeners;
            }
            conf.wildcard && (this.wildcard = conf.wildcard);
            conf.newListener && (this._newListener = conf.newListener);
            conf.removeListener && (this._removeListener = conf.removeListener);
            conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
            conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);
            if (this.wildcard) {
              this.listenerTree = {};
            }
          }
        }
        function logPossibleMemoryLeak(count, eventName) {
          var errorMsg = "(node) warning: possible EventEmitter memory leak detected. " + count + " listeners added. Use emitter.setMaxListeners() to increase limit.";
          if (this.verboseMemoryLeak) {
            errorMsg += " Event name: " + eventName + ".";
          }
          if (typeof process !== "undefined" && process.emitWarning) {
            var e = new Error(errorMsg);
            e.name = "MaxListenersExceededWarning";
            e.emitter = this;
            e.count = count;
            process.emitWarning(e);
          } else {
            console.error(errorMsg);
            if (console.trace) {
              console.trace();
            }
          }
        }
        var toArray = function(a, b, c) {
          var n = arguments.length;
          switch (n) {
            case 0:
              return [];
            case 1:
              return [a];
            case 2:
              return [a, b];
            case 3:
              return [a, b, c];
            default:
              var arr = new Array(n);
              while (n--) {
                arr[n] = arguments[n];
              }
              return arr;
          }
        };
        function toObject(keys, values) {
          var obj = {};
          var key;
          var len = keys.length;
          var valuesCount = values ? values.length : 0;
          for (var i = 0; i < len; i++) {
            key = keys[i];
            obj[key] = i < valuesCount ? values[i] : undefined2;
          }
          return obj;
        }
        function TargetObserver(emitter, target, options) {
          this._emitter = emitter;
          this._target = target;
          this._listeners = {};
          this._listenersCount = 0;
          var on, off;
          if (options.on || options.off) {
            on = options.on;
            off = options.off;
          }
          if (target.addEventListener) {
            on = target.addEventListener;
            off = target.removeEventListener;
          } else if (target.addListener) {
            on = target.addListener;
            off = target.removeListener;
          } else if (target.on) {
            on = target.on;
            off = target.off;
          }
          if (!on && !off) {
            throw Error("target does not implement any known event API");
          }
          if (typeof on !== "function") {
            throw TypeError("on method must be a function");
          }
          if (typeof off !== "function") {
            throw TypeError("off method must be a function");
          }
          this._on = on;
          this._off = off;
          var _observers = emitter._observers;
          if (_observers) {
            _observers.push(this);
          } else {
            emitter._observers = [this];
          }
        }
        Object.assign(TargetObserver.prototype, {
          subscribe: function(event, localEvent, reducer) {
            var observer = this;
            var target = this._target;
            var emitter = this._emitter;
            var listeners = this._listeners;
            var handler = function() {
              var args = toArray.apply(null, arguments);
              var eventObj = {
                data: args,
                name: localEvent,
                original: event
              };
              if (reducer) {
                var result = reducer.call(target, eventObj);
                if (result !== false) {
                  emitter.emit.apply(emitter, [eventObj.name].concat(args));
                }
                return;
              }
              emitter.emit.apply(emitter, [localEvent].concat(args));
            };
            if (listeners[event]) {
              throw Error("Event '" + event + "' is already listening");
            }
            this._listenersCount++;
            if (emitter._newListener && emitter._removeListener && !observer._onNewListener) {
              this._onNewListener = function(_event) {
                if (_event === localEvent && listeners[event] === null) {
                  listeners[event] = handler;
                  observer._on.call(target, event, handler);
                }
              };
              emitter.on("newListener", this._onNewListener);
              this._onRemoveListener = function(_event) {
                if (_event === localEvent && !emitter.hasListeners(_event) && listeners[event]) {
                  listeners[event] = null;
                  observer._off.call(target, event, handler);
                }
              };
              listeners[event] = null;
              emitter.on("removeListener", this._onRemoveListener);
            } else {
              listeners[event] = handler;
              observer._on.call(target, event, handler);
            }
          },
          unsubscribe: function(event) {
            var observer = this;
            var listeners = this._listeners;
            var emitter = this._emitter;
            var handler;
            var events;
            var off = this._off;
            var target = this._target;
            var i;
            if (event && typeof event !== "string") {
              throw TypeError("event must be a string");
            }
            function clearRefs() {
              if (observer._onNewListener) {
                emitter.off("newListener", observer._onNewListener);
                emitter.off("removeListener", observer._onRemoveListener);
                observer._onNewListener = null;
                observer._onRemoveListener = null;
              }
              var index = findTargetIndex.call(emitter, observer);
              emitter._observers.splice(index, 1);
            }
            if (event) {
              handler = listeners[event];
              if (!handler)
                return;
              off.call(target, event, handler);
              delete listeners[event];
              if (!--this._listenersCount) {
                clearRefs();
              }
            } else {
              events = ownKeys(listeners);
              i = events.length;
              while (i-- > 0) {
                event = events[i];
                off.call(target, event, listeners[event]);
              }
              this._listeners = {};
              this._listenersCount = 0;
              clearRefs();
            }
          }
        });
        function resolveOptions(options, schema, reducers, allowUnknown) {
          var computedOptions = Object.assign({}, schema);
          if (!options)
            return computedOptions;
          if (typeof options !== "object") {
            throw TypeError("options must be an object");
          }
          var keys = Object.keys(options);
          var length = keys.length;
          var option, value;
          var reducer;
          function reject(reason) {
            throw Error('Invalid "' + option + '" option value' + (reason ? ". Reason: " + reason : ""));
          }
          for (var i = 0; i < length; i++) {
            option = keys[i];
            if (!allowUnknown && !hasOwnProperty3.call(schema, option)) {
              throw Error('Unknown "' + option + '" option');
            }
            value = options[option];
            if (value !== undefined2) {
              reducer = reducers[option];
              computedOptions[option] = reducer ? reducer(value, reject) : value;
            }
          }
          return computedOptions;
        }
        function constructorReducer(value, reject) {
          if (typeof value !== "function" || !value.hasOwnProperty("prototype")) {
            reject("value must be a constructor");
          }
          return value;
        }
        function makeTypeReducer(types) {
          var message = "value must be type of " + types.join("|");
          var len = types.length;
          var firstType = types[0];
          var secondType = types[1];
          if (len === 1) {
            return function(v, reject) {
              if (typeof v === firstType) {
                return v;
              }
              reject(message);
            };
          }
          if (len === 2) {
            return function(v, reject) {
              var kind = typeof v;
              if (kind === firstType || kind === secondType)
                return v;
              reject(message);
            };
          }
          return function(v, reject) {
            var kind = typeof v;
            var i = len;
            while (i-- > 0) {
              if (kind === types[i])
                return v;
            }
            reject(message);
          };
        }
        var functionReducer = makeTypeReducer(["function"]);
        var objectFunctionReducer = makeTypeReducer(["object", "function"]);
        function makeCancelablePromise(Promise2, executor, options) {
          var isCancelable;
          var callbacks;
          var timer = 0;
          var subscriptionClosed;
          var promise = new Promise2(function(resolve, reject, onCancel) {
            options = resolveOptions(options, {
              timeout: 0,
              overload: false
            }, {
              timeout: function(value, reject2) {
                value *= 1;
                if (typeof value !== "number" || value < 0 || !Number.isFinite(value)) {
                  reject2("timeout must be a positive number");
                }
                return value;
              }
            });
            isCancelable = !options.overload && typeof Promise2.prototype.cancel === "function" && typeof onCancel === "function";
            function cleanup() {
              if (callbacks) {
                callbacks = null;
              }
              if (timer) {
                clearTimeout(timer);
                timer = 0;
              }
            }
            var _resolve = function(value) {
              cleanup();
              resolve(value);
            };
            var _reject = function(err) {
              cleanup();
              reject(err);
            };
            if (isCancelable) {
              executor(_resolve, _reject, onCancel);
            } else {
              callbacks = [function(reason) {
                _reject(reason || Error("canceled"));
              }];
              executor(_resolve, _reject, function(cb) {
                if (subscriptionClosed) {
                  throw Error("Unable to subscribe on cancel event asynchronously");
                }
                if (typeof cb !== "function") {
                  throw TypeError("onCancel callback must be a function");
                }
                callbacks.push(cb);
              });
              subscriptionClosed = true;
            }
            if (options.timeout > 0) {
              timer = setTimeout(function() {
                var reason = Error("timeout");
                reason.code = "ETIMEDOUT";
                timer = 0;
                promise.cancel(reason);
                reject(reason);
              }, options.timeout);
            }
          });
          if (!isCancelable) {
            promise.cancel = function(reason) {
              if (!callbacks) {
                return;
              }
              var length = callbacks.length;
              for (var i = 1; i < length; i++) {
                callbacks[i](reason);
              }
              callbacks[0](reason);
              callbacks = null;
            };
          }
          return promise;
        }
        function findTargetIndex(observer) {
          var observers = this._observers;
          if (!observers) {
            return -1;
          }
          var len = observers.length;
          for (var i = 0; i < len; i++) {
            if (observers[i]._target === observer)
              return i;
          }
          return -1;
        }
        function searchListenerTree(handlers, type, tree, i, typeLength) {
          if (!tree) {
            return null;
          }
          if (i === 0) {
            var kind = typeof type;
            if (kind === "string") {
              var ns2, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
              if ((n = type.indexOf(delimiter)) !== -1) {
                ns2 = new Array(5);
                do {
                  ns2[l++] = type.slice(j, n);
                  j = n + dl;
                } while ((n = type.indexOf(delimiter, j)) !== -1);
                ns2[l++] = type.slice(j);
                type = ns2;
                typeLength = l;
              } else {
                type = [type];
                typeLength = 1;
              }
            } else if (kind === "object") {
              typeLength = type.length;
            } else {
              type = [type];
              typeLength = 1;
            }
          }
          var listeners = null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i], nextType = type[i + 1], branches, _listeners;
          if (i === typeLength) {
            if (tree._listeners) {
              if (typeof tree._listeners === "function") {
                handlers && handlers.push(tree._listeners);
                listeners = [tree];
              } else {
                handlers && handlers.push.apply(handlers, tree._listeners);
                listeners = [tree];
              }
            }
          } else {
            if (currentType === "*") {
              branches = ownKeys(tree);
              n = branches.length;
              while (n-- > 0) {
                branch = branches[n];
                if (branch !== "_listeners") {
                  _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
                  if (_listeners) {
                    if (listeners) {
                      listeners.push.apply(listeners, _listeners);
                    } else {
                      listeners = _listeners;
                    }
                  }
                }
              }
              return listeners;
            } else if (currentType === "**") {
              endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === "*";
              if (endReached && tree._listeners) {
                listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
              }
              branches = ownKeys(tree);
              n = branches.length;
              while (n-- > 0) {
                branch = branches[n];
                if (branch !== "_listeners") {
                  if (branch === "*" || branch === "**") {
                    if (tree[branch]._listeners && !endReached) {
                      _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
                      if (_listeners) {
                        if (listeners) {
                          listeners.push.apply(listeners, _listeners);
                        } else {
                          listeners = _listeners;
                        }
                      }
                    }
                    _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
                  } else if (branch === nextType) {
                    _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
                  } else {
                    _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
                  }
                  if (_listeners) {
                    if (listeners) {
                      listeners.push.apply(listeners, _listeners);
                    } else {
                      listeners = _listeners;
                    }
                  }
                }
              }
              return listeners;
            } else if (tree[currentType]) {
              listeners = searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
            }
          }
          xTree = tree["*"];
          if (xTree) {
            searchListenerTree(handlers, type, xTree, i + 1, typeLength);
          }
          xxTree = tree["**"];
          if (xxTree) {
            if (i < typeLength) {
              if (xxTree._listeners) {
                searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
              }
              branches = ownKeys(xxTree);
              n = branches.length;
              while (n-- > 0) {
                branch = branches[n];
                if (branch !== "_listeners") {
                  if (branch === nextType) {
                    searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
                  } else if (branch === currentType) {
                    searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
                  } else {
                    isolatedBranch = {};
                    isolatedBranch[branch] = xxTree[branch];
                    searchListenerTree(handlers, type, { "**": isolatedBranch }, i + 1, typeLength);
                  }
                }
              }
            } else if (xxTree._listeners) {
              searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
            } else if (xxTree["*"] && xxTree["*"]._listeners) {
              searchListenerTree(handlers, type, xxTree["*"], typeLength, typeLength);
            }
          }
          return listeners;
        }
        function growListenerTree(type, listener, prepend) {
          var len = 0, j = 0, i, delimiter = this.delimiter, dl = delimiter.length, ns2;
          if (typeof type === "string") {
            if ((i = type.indexOf(delimiter)) !== -1) {
              ns2 = new Array(5);
              do {
                ns2[len++] = type.slice(j, i);
                j = i + dl;
              } while ((i = type.indexOf(delimiter, j)) !== -1);
              ns2[len++] = type.slice(j);
            } else {
              ns2 = [type];
              len = 1;
            }
          } else {
            ns2 = type;
            len = type.length;
          }
          if (len > 1) {
            for (i = 0; i + 1 < len; i++) {
              if (ns2[i] === "**" && ns2[i + 1] === "**") {
                return;
              }
            }
          }
          var tree = this.listenerTree, name;
          for (i = 0; i < len; i++) {
            name = ns2[i];
            tree = tree[name] || (tree[name] = {});
            if (i === len - 1) {
              if (!tree._listeners) {
                tree._listeners = listener;
              } else {
                if (typeof tree._listeners === "function") {
                  tree._listeners = [tree._listeners];
                }
                if (prepend) {
                  tree._listeners.unshift(listener);
                } else {
                  tree._listeners.push(listener);
                }
                if (!tree._listeners.warned && this._maxListeners > 0 && tree._listeners.length > this._maxListeners) {
                  tree._listeners.warned = true;
                  logPossibleMemoryLeak.call(this, tree._listeners.length, name);
                }
              }
              return true;
            }
          }
          return true;
        }
        function collectTreeEvents(tree, events, root, asArray) {
          var branches = ownKeys(tree);
          var i = branches.length;
          var branch, branchName, path;
          var hasListeners = tree["_listeners"];
          var isArrayPath;
          while (i-- > 0) {
            branchName = branches[i];
            branch = tree[branchName];
            if (branchName === "_listeners") {
              path = root;
            } else {
              path = root ? root.concat(branchName) : [branchName];
            }
            isArrayPath = asArray || typeof branchName === "symbol";
            hasListeners && events.push(isArrayPath ? path : path.join(this.delimiter));
            if (typeof branch === "object") {
              collectTreeEvents.call(this, branch, events, path, isArrayPath);
            }
          }
          return events;
        }
        function recursivelyGarbageCollect(root) {
          var keys = ownKeys(root);
          var i = keys.length;
          var obj, key, flag;
          while (i-- > 0) {
            key = keys[i];
            obj = root[key];
            if (obj) {
              flag = true;
              if (key !== "_listeners" && !recursivelyGarbageCollect(obj)) {
                delete root[key];
              }
            }
          }
          return flag;
        }
        function Listener(emitter, event, listener) {
          this.emitter = emitter;
          this.event = event;
          this.listener = listener;
        }
        Listener.prototype.off = function() {
          this.emitter.off(this.event, this.listener);
          return this;
        };
        function setupListener(event, listener, options) {
          if (options === true) {
            promisify = true;
          } else if (options === false) {
            async = true;
          } else {
            if (!options || typeof options !== "object") {
              throw TypeError("options should be an object or true");
            }
            var async = options.async;
            var promisify = options.promisify;
            var nextTick2 = options.nextTick;
            var objectify = options.objectify;
          }
          if (async || nextTick2 || promisify) {
            var _listener = listener;
            var _origin = listener._origin || listener;
            if (nextTick2 && !nextTickSupported) {
              throw Error("process.nextTick is not supported");
            }
            if (promisify === undefined2) {
              promisify = listener.constructor.name === "AsyncFunction";
            }
            listener = function() {
              var args = arguments;
              var context = this;
              var event2 = this.event;
              return promisify ? nextTick2 ? Promise.resolve() : new Promise(function(resolve) {
                _setImmediate(resolve);
              }).then(function() {
                context.event = event2;
                return _listener.apply(context, args);
              }) : (nextTick2 ? process.nextTick : _setImmediate)(function() {
                context.event = event2;
                _listener.apply(context, args);
              });
            };
            listener._async = true;
            listener._origin = _origin;
          }
          return [listener, objectify ? new Listener(this, event, listener) : this];
        }
        function EventEmitter(conf) {
          this._events = {};
          this._newListener = false;
          this._removeListener = false;
          this.verboseMemoryLeak = false;
          configure.call(this, conf);
        }
        EventEmitter.EventEmitter2 = EventEmitter;
        EventEmitter.prototype.listenTo = function(target, events, options) {
          if (typeof target !== "object") {
            throw TypeError("target musts be an object");
          }
          var emitter = this;
          options = resolveOptions(options, {
            on: undefined2,
            off: undefined2,
            reducers: undefined2
          }, {
            on: functionReducer,
            off: functionReducer,
            reducers: objectFunctionReducer
          });
          function listen2(events2) {
            if (typeof events2 !== "object") {
              throw TypeError("events must be an object");
            }
            var reducers = options.reducers;
            var index = findTargetIndex.call(emitter, target);
            var observer;
            if (index === -1) {
              observer = new TargetObserver(emitter, target, options);
            } else {
              observer = emitter._observers[index];
            }
            var keys = ownKeys(events2);
            var len = keys.length;
            var event;
            var isSingleReducer = typeof reducers === "function";
            for (var i = 0; i < len; i++) {
              event = keys[i];
              observer.subscribe(event, events2[event] || event, isSingleReducer ? reducers : reducers && reducers[event]);
            }
          }
          isArray(events) ? listen2(toObject(events)) : typeof events === "string" ? listen2(toObject(events.split(/\s+/))) : listen2(events);
          return this;
        };
        EventEmitter.prototype.stopListeningTo = function(target, event) {
          var observers = this._observers;
          if (!observers) {
            return false;
          }
          var i = observers.length;
          var observer;
          var matched = false;
          if (target && typeof target !== "object") {
            throw TypeError("target should be an object");
          }
          while (i-- > 0) {
            observer = observers[i];
            if (!target || observer._target === target) {
              observer.unsubscribe(event);
              matched = true;
            }
          }
          return matched;
        };
        EventEmitter.prototype.delimiter = ".";
        EventEmitter.prototype.setMaxListeners = function(n) {
          if (n !== undefined2) {
            this._maxListeners = n;
            if (!this._conf)
              this._conf = {};
            this._conf.maxListeners = n;
          }
        };
        EventEmitter.prototype.getMaxListeners = function() {
          return this._maxListeners;
        };
        EventEmitter.prototype.event = "";
        EventEmitter.prototype.once = function(event, fn, options) {
          return this._once(event, fn, false, options);
        };
        EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
          return this._once(event, fn, true, options);
        };
        EventEmitter.prototype._once = function(event, fn, prepend, options) {
          return this._many(event, 1, fn, prepend, options);
        };
        EventEmitter.prototype.many = function(event, ttl, fn, options) {
          return this._many(event, ttl, fn, false, options);
        };
        EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
          return this._many(event, ttl, fn, true, options);
        };
        EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
          var self = this;
          if (typeof fn !== "function") {
            throw new Error("many only accepts instances of Function");
          }
          function listener() {
            if (--ttl === 0) {
              self.off(event, listener);
            }
            return fn.apply(this, arguments);
          }
          listener._origin = fn;
          return this._on(event, listener, prepend, options);
        };
        EventEmitter.prototype.emit = function() {
          if (!this._events && !this._all) {
            return false;
          }
          this._events || init2.call(this);
          var type = arguments[0], ns2, wildcard = this.wildcard;
          var args, l, i, j, containsSymbol;
          if (type === "newListener" && !this._newListener) {
            if (!this._events.newListener) {
              return false;
            }
          }
          if (wildcard) {
            ns2 = type;
            if (type !== "newListener" && type !== "removeListener") {
              if (typeof type === "object") {
                l = type.length;
                if (symbolsSupported) {
                  for (i = 0; i < l; i++) {
                    if (typeof type[i] === "symbol") {
                      containsSymbol = true;
                      break;
                    }
                  }
                }
                if (!containsSymbol) {
                  type = type.join(this.delimiter);
                }
              }
            }
          }
          var al = arguments.length;
          var handler;
          if (this._all && this._all.length) {
            handler = this._all.slice();
            for (i = 0, l = handler.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  handler[i].call(this, type);
                  break;
                case 2:
                  handler[i].call(this, type, arguments[1]);
                  break;
                case 3:
                  handler[i].call(this, type, arguments[1], arguments[2]);
                  break;
                default:
                  handler[i].apply(this, arguments);
              }
            }
          }
          if (wildcard) {
            handler = [];
            searchListenerTree.call(this, handler, ns2, this.listenerTree, 0, l);
          } else {
            handler = this._events[type];
            if (typeof handler === "function") {
              this.event = type;
              switch (al) {
                case 1:
                  handler.call(this);
                  break;
                case 2:
                  handler.call(this, arguments[1]);
                  break;
                case 3:
                  handler.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  args = new Array(al - 1);
                  for (j = 1; j < al; j++)
                    args[j - 1] = arguments[j];
                  handler.apply(this, args);
              }
              return true;
            } else if (handler) {
              handler = handler.slice();
            }
          }
          if (handler && handler.length) {
            if (al > 3) {
              args = new Array(al - 1);
              for (j = 1; j < al; j++)
                args[j - 1] = arguments[j];
            }
            for (i = 0, l = handler.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  handler[i].call(this);
                  break;
                case 2:
                  handler[i].call(this, arguments[1]);
                  break;
                case 3:
                  handler[i].call(this, arguments[1], arguments[2]);
                  break;
                default:
                  handler[i].apply(this, args);
              }
            }
            return true;
          } else if (!this.ignoreErrors && !this._all && type === "error") {
            if (arguments[1] instanceof Error) {
              throw arguments[1];
            } else {
              throw new Error("Uncaught, unspecified 'error' event.");
            }
          }
          return !!this._all;
        };
        EventEmitter.prototype.emitAsync = function() {
          if (!this._events && !this._all) {
            return false;
          }
          this._events || init2.call(this);
          var type = arguments[0], wildcard = this.wildcard, ns2, containsSymbol;
          var args, l, i, j;
          if (type === "newListener" && !this._newListener) {
            if (!this._events.newListener) {
              return Promise.resolve([false]);
            }
          }
          if (wildcard) {
            ns2 = type;
            if (type !== "newListener" && type !== "removeListener") {
              if (typeof type === "object") {
                l = type.length;
                if (symbolsSupported) {
                  for (i = 0; i < l; i++) {
                    if (typeof type[i] === "symbol") {
                      containsSymbol = true;
                      break;
                    }
                  }
                }
                if (!containsSymbol) {
                  type = type.join(this.delimiter);
                }
              }
            }
          }
          var promises = [];
          var al = arguments.length;
          var handler;
          if (this._all) {
            for (i = 0, l = this._all.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  promises.push(this._all[i].call(this, type));
                  break;
                case 2:
                  promises.push(this._all[i].call(this, type, arguments[1]));
                  break;
                case 3:
                  promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
                  break;
                default:
                  promises.push(this._all[i].apply(this, arguments));
              }
            }
          }
          if (wildcard) {
            handler = [];
            searchListenerTree.call(this, handler, ns2, this.listenerTree, 0);
          } else {
            handler = this._events[type];
          }
          if (typeof handler === "function") {
            this.event = type;
            switch (al) {
              case 1:
                promises.push(handler.call(this));
                break;
              case 2:
                promises.push(handler.call(this, arguments[1]));
                break;
              case 3:
                promises.push(handler.call(this, arguments[1], arguments[2]));
                break;
              default:
                args = new Array(al - 1);
                for (j = 1; j < al; j++)
                  args[j - 1] = arguments[j];
                promises.push(handler.apply(this, args));
            }
          } else if (handler && handler.length) {
            handler = handler.slice();
            if (al > 3) {
              args = new Array(al - 1);
              for (j = 1; j < al; j++)
                args[j - 1] = arguments[j];
            }
            for (i = 0, l = handler.length; i < l; i++) {
              this.event = type;
              switch (al) {
                case 1:
                  promises.push(handler[i].call(this));
                  break;
                case 2:
                  promises.push(handler[i].call(this, arguments[1]));
                  break;
                case 3:
                  promises.push(handler[i].call(this, arguments[1], arguments[2]));
                  break;
                default:
                  promises.push(handler[i].apply(this, args));
              }
            }
          } else if (!this.ignoreErrors && !this._all && type === "error") {
            if (arguments[1] instanceof Error) {
              return Promise.reject(arguments[1]);
            } else {
              return Promise.reject("Uncaught, unspecified 'error' event.");
            }
          }
          return Promise.all(promises);
        };
        EventEmitter.prototype.on = function(type, listener, options) {
          return this._on(type, listener, false, options);
        };
        EventEmitter.prototype.prependListener = function(type, listener, options) {
          return this._on(type, listener, true, options);
        };
        EventEmitter.prototype.onAny = function(fn) {
          return this._onAny(fn, false);
        };
        EventEmitter.prototype.prependAny = function(fn) {
          return this._onAny(fn, true);
        };
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;
        EventEmitter.prototype._onAny = function(fn, prepend) {
          if (typeof fn !== "function") {
            throw new Error("onAny only accepts instances of Function");
          }
          if (!this._all) {
            this._all = [];
          }
          if (prepend) {
            this._all.unshift(fn);
          } else {
            this._all.push(fn);
          }
          return this;
        };
        EventEmitter.prototype._on = function(type, listener, prepend, options) {
          if (typeof type === "function") {
            this._onAny(type, listener);
            return this;
          }
          if (typeof listener !== "function") {
            throw new Error("on only accepts instances of Function");
          }
          this._events || init2.call(this);
          var returnValue = this, temp;
          if (options !== undefined2) {
            temp = setupListener.call(this, type, listener, options);
            listener = temp[0];
            returnValue = temp[1];
          }
          if (this._newListener) {
            this.emit("newListener", type, listener);
          }
          if (this.wildcard) {
            growListenerTree.call(this, type, listener, prepend);
            return returnValue;
          }
          if (!this._events[type]) {
            this._events[type] = listener;
          } else {
            if (typeof this._events[type] === "function") {
              this._events[type] = [this._events[type]];
            }
            if (prepend) {
              this._events[type].unshift(listener);
            } else {
              this._events[type].push(listener);
            }
            if (!this._events[type].warned && this._maxListeners > 0 && this._events[type].length > this._maxListeners) {
              this._events[type].warned = true;
              logPossibleMemoryLeak.call(this, this._events[type].length, type);
            }
          }
          return returnValue;
        };
        EventEmitter.prototype.off = function(type, listener) {
          if (typeof listener !== "function") {
            throw new Error("removeListener only takes instances of Function");
          }
          var handlers, leafs = [];
          if (this.wildcard) {
            var ns2 = typeof type === "string" ? type.split(this.delimiter) : type.slice();
            leafs = searchListenerTree.call(this, null, ns2, this.listenerTree, 0);
            if (!leafs)
              return this;
          } else {
            if (!this._events[type])
              return this;
            handlers = this._events[type];
            leafs.push({ _listeners: handlers });
          }
          for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
            var leaf = leafs[iLeaf];
            handlers = leaf._listeners;
            if (isArray(handlers)) {
              var position = -1;
              for (var i = 0, length = handlers.length; i < length; i++) {
                if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
                  position = i;
                  break;
                }
              }
              if (position < 0) {
                continue;
              }
              if (this.wildcard) {
                leaf._listeners.splice(position, 1);
              } else {
                this._events[type].splice(position, 1);
              }
              if (handlers.length === 0) {
                if (this.wildcard) {
                  delete leaf._listeners;
                } else {
                  delete this._events[type];
                }
              }
              if (this._removeListener)
                this.emit("removeListener", type, listener);
              return this;
            } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
              if (this.wildcard) {
                delete leaf._listeners;
              } else {
                delete this._events[type];
              }
              if (this._removeListener)
                this.emit("removeListener", type, listener);
            }
          }
          this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
          return this;
        };
        EventEmitter.prototype.offAny = function(fn) {
          var i = 0, l = 0, fns;
          if (fn && this._all && this._all.length > 0) {
            fns = this._all;
            for (i = 0, l = fns.length; i < l; i++) {
              if (fn === fns[i]) {
                fns.splice(i, 1);
                if (this._removeListener)
                  this.emit("removeListenerAny", fn);
                return this;
              }
            }
          } else {
            fns = this._all;
            if (this._removeListener) {
              for (i = 0, l = fns.length; i < l; i++)
                this.emit("removeListenerAny", fns[i]);
            }
            this._all = [];
          }
          return this;
        };
        EventEmitter.prototype.removeListener = EventEmitter.prototype.off;
        EventEmitter.prototype.removeAllListeners = function(type) {
          if (type === undefined2) {
            !this._events || init2.call(this);
            return this;
          }
          if (this.wildcard) {
            var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
            if (!leafs)
              return this;
            for (i = 0; i < leafs.length; i++) {
              leaf = leafs[i];
              leaf._listeners = null;
            }
            this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
          } else if (this._events) {
            this._events[type] = null;
          }
          return this;
        };
        EventEmitter.prototype.listeners = function(type) {
          var _events = this._events;
          var keys, listeners, allListeners;
          var i;
          var listenerTree;
          if (type === undefined2) {
            if (this.wildcard) {
              throw Error("event name required for wildcard emitter");
            }
            if (!_events) {
              return [];
            }
            keys = ownKeys(_events);
            i = keys.length;
            allListeners = [];
            while (i-- > 0) {
              listeners = _events[keys[i]];
              if (typeof listeners === "function") {
                allListeners.push(listeners);
              } else {
                allListeners.push.apply(allListeners, listeners);
              }
            }
            return allListeners;
          } else {
            if (this.wildcard) {
              listenerTree = this.listenerTree;
              if (!listenerTree)
                return [];
              var handlers = [];
              var ns2 = typeof type === "string" ? type.split(this.delimiter) : type.slice();
              searchListenerTree.call(this, handlers, ns2, listenerTree, 0);
              return handlers;
            }
            if (!_events) {
              return [];
            }
            listeners = _events[type];
            if (!listeners) {
              return [];
            }
            return typeof listeners === "function" ? [listeners] : listeners;
          }
        };
        EventEmitter.prototype.eventNames = function(nsAsArray) {
          var _events = this._events;
          return this.wildcard ? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : _events ? ownKeys(_events) : [];
        };
        EventEmitter.prototype.listenerCount = function(type) {
          return this.listeners(type).length;
        };
        EventEmitter.prototype.hasListeners = function(type) {
          if (this.wildcard) {
            var handlers = [];
            var ns2 = typeof type === "string" ? type.split(this.delimiter) : type.slice();
            searchListenerTree.call(this, handlers, ns2, this.listenerTree, 0);
            return handlers.length > 0;
          }
          var _events = this._events;
          var _all = this._all;
          return !!(_all && _all.length || _events && (type === undefined2 ? ownKeys(_events).length : _events[type]));
        };
        EventEmitter.prototype.listenersAny = function() {
          if (this._all) {
            return this._all;
          } else {
            return [];
          }
        };
        EventEmitter.prototype.waitFor = function(event, options) {
          var self = this;
          var type = typeof options;
          if (type === "number") {
            options = { timeout: options };
          } else if (type === "function") {
            options = { filter: options };
          }
          options = resolveOptions(options, {
            timeout: 0,
            filter: undefined2,
            handleError: false,
            Promise,
            overload: false
          }, {
            filter: functionReducer,
            Promise: constructorReducer
          });
          return makeCancelablePromise(options.Promise, function(resolve, reject, onCancel) {
            function listener() {
              var filter = options.filter;
              if (filter && !filter.apply(self, arguments)) {
                return;
              }
              self.off(event, listener);
              if (options.handleError) {
                var err = arguments[0];
                err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
              } else {
                resolve(toArray.apply(null, arguments));
              }
            }
            onCancel(function() {
              self.off(event, listener);
            });
            self._on(event, listener, false);
          }, {
            timeout: options.timeout,
            overload: options.overload
          });
        };
        function once(emitter, name, options) {
          options = resolveOptions(options, {
            Promise,
            timeout: 0,
            overload: false
          }, {
            Promise: constructorReducer
          });
          var _Promise = options.Promise;
          return makeCancelablePromise(_Promise, function(resolve, reject, onCancel) {
            var handler;
            if (typeof emitter.addEventListener === "function") {
              handler = function() {
                resolve(toArray.apply(null, arguments));
              };
              onCancel(function() {
                emitter.removeEventListener(name, handler);
              });
              emitter.addEventListener(name, handler, { once: true });
              return;
            }
            var eventListener = function() {
              errorListener && emitter.removeListener("error", errorListener);
              resolve(toArray.apply(null, arguments));
            };
            var errorListener;
            if (name !== "error") {
              errorListener = function(err) {
                emitter.removeListener(name, eventListener);
                reject(err);
              };
              emitter.once("error", errorListener);
            }
            onCancel(function() {
              errorListener && emitter.removeListener("error", errorListener);
              emitter.removeListener(name, eventListener);
            });
            emitter.once(name, eventListener);
          }, {
            timeout: options.timeout,
            overload: options.overload
          });
        }
        var prototype = EventEmitter.prototype;
        Object.defineProperties(EventEmitter, {
          defaultMaxListeners: {
            get: function() {
              return prototype._maxListeners;
            },
            set: function(n) {
              if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
                throw TypeError("n must be a non-negative number");
              }
              prototype._maxListeners = n;
            },
            enumerable: true
          },
          once: {
            value: once,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperties(prototype, {
          _maxListeners: {
            value: defaultMaxListeners,
            writable: true,
            configurable: true
          },
          _observers: { value: null, writable: true, configurable: true }
        });
        if (typeof define === "function" && define.amd) {
          define(function() {
            return EventEmitter;
          });
        } else if (typeof exports === "object") {
          module.exports = EventEmitter;
        } else {
          var _global = new Function("", "return this")();
          _global.EventEmitter2 = EventEmitter;
        }
      }();
    }
  });

  // ../utils/src/utils.ts
  var noop = () => {
  };
  var objectToString = Object.prototype.toString;
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
  function setDocCurrentScript(target, code, define2, url, async, originScript) {
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
    const set2 = (val) => {
      try {
        if (define2) {
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
    set2(el);
    return () => safeWrapper(() => delete target.currentScript);
  }
  function toBase64(input, mimeType) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([input], { type: mimeType }));
      reader.onload = () => resolve(reader.result);
    });
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

  // ../utils/src/queue.ts
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

  // ../utils/src/sentry.ts
  var sourceListTags = [
    "link",
    "style",
    "script",
    "img",
    "video",
    "audio"
  ];
  var sourceNode = makeMap(sourceListTags);

  // ../utils/src/domApis.ts
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

  // ../utils/src/garfish.ts
  var __LOADER_FLAG__ = Symbol.for("__LOADER_FLAG__");
  var __GARFISH_FLAG__ = Symbol.for("__GARFISH_FLAG__");
  var __MockHtml__ = "__garfishmockhtml__";
  var __MockBody__ = "__garfishmockbody__";
  var __MockHead__ = "__garfishmockhead__";
  var __REMOVE_NODE__ = "__garfishremovenode__";

  // ../utils/src/mimeType.ts
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

  // ../utils/src/dispatchEvents.ts
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

  // ../utils/src/container.ts
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

  // ../utils/src/templateParse.ts
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

  // ../utils/src/logger.ts
  var import_debug = __toESM(require_src());
  var log = (0, import_debug.default)("garfish");
  var coreLog = log.extend("core");
  var routerLog = log.extend("router");

  // ../utils/src/lock.ts
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
    async wait(id2) {
      const { lockQueue } = this;
      const firstLock = lockQueue[0];
      const lastLock = firstLock ? lockQueue[lockQueue.length - 1] : void 0;
      if ((firstLock == null ? void 0 : firstLock.id) === id2)
        return;
      let lockItem = lockQueue.find((item) => item.id === id2);
      if (!lockItem) {
        let promiseResolve = () => {
        };
        const waiting = new Promise((resolve) => {
          promiseResolve = resolve;
        });
        lockItem = { id: id2, waiting, resolve: promiseResolve };
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

  // ../hooks/src/syncHook.ts
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

  // ../hooks/src/asyncHook.ts
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

  // ../hooks/src/syncWaterfallHook.ts
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
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
          this.onerror(e);
        }
      }
      return data;
    }
  };

  // ../hooks/src/asyncWaterfallHooks.ts
  var AsyncWaterfallHook = class extends SyncHook {
    constructor(type) {
      super();
      this.onerror = error;
      this.type = type;
    }
    emit(data) {
      if (!isObject(data)) {
        error(`"${this.type}" hook response data must be an object.`);
      }
      const ls = Array.from(this.listeners);
      if (ls.length > 0) {
        let i = 0;
        const processError2 = (e) => {
          (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
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
                return Promise.resolve(ls[i++](data)).then(call, processError2);
              } catch (e) {
                return processError2(e);
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

  // ../hooks/src/pluginSystem.ts
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
        warn(`Repeat to register plugin hooks "${pluginName}".`);
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

  // ../loader/src/managers/style.ts
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

  // ../loader/src/managers/module.ts
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

  // ../loader/src/managers/template.ts
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
        src.value = transformUrl(baseUrl, src.value);
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

  // ../loader/src/managers/javascript.ts
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

  // ../loader/src/utils.ts
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

  // ../loader/src/appCache.ts
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

  // ../loader/src/index.ts
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
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && error(e);
        this.hooks.lifecycle.error.emit(e, { scope });
        throw e;
      }).finally(() => {
        loadingList[url] = null;
      });
      loadingList[url] = loadRes;
      return loadRes;
    }
  };

  // ../core/src/garfish.ts
  var import_eventemitter2 = __toESM(require_eventemitter2());

  // ../core/src/config.ts
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
    const result = deepMerge(filterUndefinedVal(globalConfig), filterUndefinedVal(localConfig));
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
      errorLoadApp: (e) => error(e),
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
      errorMountApp: (e) => error(e),
      errorUnmountApp: (e) => error(e),
      customLoader: void 0
    };
    return config;
  };

  // ../core/src/lifecycle.ts
  function globalLifecycle() {
    return new PluginSystem({
      beforeBootstrap: new SyncHook(),
      bootstrap: new SyncHook(),
      beforeRegisterApp: new SyncHook(),
      registerApp: new SyncHook(),
      beforeLoad: new AsyncHook(),
      afterLoad: new AsyncHook(),
      errorLoadApp: new SyncHook()
    });
  }
  function appLifecycle() {
    return new PluginSystem({
      beforeEval: new SyncHook(),
      afterEval: new SyncHook(),
      beforeMount: new SyncHook(),
      afterMount: new SyncHook(),
      errorMountApp: new SyncHook(),
      beforeUnmount: new SyncHook(),
      afterUnmount: new SyncHook(),
      errorUnmountApp: new SyncHook(),
      errorExecCode: new SyncHook()
    });
  }

  // ../../node_modules/.pnpm/es-module-lexer@0.10.5/node_modules/es-module-lexer/dist/lexer.js
  var A = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  function parse(E2, g = "@") {
    if (!C)
      return init.then(() => parse(E2));
    const I = E2.length + 1, o = (C.__heap_base.value || C.__heap_base) + 4 * I - C.memory.buffer.byteLength;
    o > 0 && C.memory.grow(Math.ceil(o / 65536));
    const k = C.sa(I - 1);
    if ((A ? B : Q)(E2, new Uint16Array(C.memory.buffer, k, I)), !C.parse())
      throw Object.assign(new Error(`Parse error ${g}:${E2.slice(0, C.e()).split("\n").length}:${C.e() - E2.lastIndexOf("\n", C.e() - 1)}`), { idx: C.e() });
    const J = [], i = [];
    for (; C.ri(); ) {
      const A2 = C.is(), Q2 = C.ie(), B2 = C.ai(), g2 = C.id(), I2 = C.ss(), o2 = C.se();
      let k2;
      C.ip() && (k2 = w(E2.slice(g2 === -1 ? A2 - 1 : A2, g2 === -1 ? Q2 + 1 : Q2))), J.push({ n: k2, s: A2, e: Q2, ss: I2, se: o2, d: g2, a: B2 });
    }
    for (; C.re(); ) {
      const A2 = E2.slice(C.es(), C.ee()), Q2 = A2[0];
      i.push(Q2 === '"' || Q2 === "'" ? w(A2) : A2);
    }
    function w(A2) {
      try {
        return (0, eval)(A2);
      } catch (A3) {
      }
    }
    return [J, i, !!C.f()];
  }
  function Q(A2, Q2) {
    const B2 = A2.length;
    let C2 = 0;
    for (; C2 < B2; ) {
      const B3 = A2.charCodeAt(C2);
      Q2[C2++] = (255 & B3) << 8 | B3 >>> 8;
    }
  }
  function B(A2, Q2) {
    const B2 = A2.length;
    let C2 = 0;
    for (; C2 < B2; )
      Q2[C2] = A2.charCodeAt(C2++);
  }
  var C;
  var init = WebAssembly.compile((E = "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ajYCiApBARAhIQMLQQAoAogKIQICQCADQf0ARg0AIAIgAUYNBSACIQEgAkEAKAKMCk0NAQwFCwtBACACQQJqNgKICgwBC0EAIANBAmo2AogKQQEQIRpBACgCiAoiAiACECYaC0EBECEhAgtBACgCiAohAwJAIAJB5gBHDQAgA0ECakGeCEEGECgNAEEAIANBCGo2AogKIABBARAhECIPC0EAIANBfmo2AogKDAMLEB0PCwJAIAMpAAJC7ICEg7COwDlSDQAgAy8BChAeRQ0AQQAgA0EKajYCiApBARAhIQJBACgCiAohAyACECQaIANBACgCiAoQAkEAQQAoAogKQX5qNgKICg8LQQAgA0EEaiIDNgKICgtBACADQQRqIgI2AogKQQBBADoA5AkDQEEAIAJBAmo2AogKQQEQISEDQQAoAogKIQICQCADECRBIHJB+wBHDQBBAEEAKAKICkF+ajYCiAoPC0EAKAKICiIDIAJGDQEgAiADEAICQEEBECEiAkEsRg0AAkAgAkE9Rw0AQQBBACgCiApBfmo2AogKDwtBAEEAKAKICkF+ajYCiAoPC0EAKAKICiECDAALCw8LQQAgA0EKajYCiApBARAhGkEAKAKICiEDC0EAIANBEGo2AogKAkBBARAhIgJBKkcNAEEAQQAoAogKQQJqNgKICkEBECEhAgtBACgCiAohAyACECQaIANBACgCiAoQAkEAQQAoAogKQX5qNgKICg8LIAMgA0EOahACC6sGAQR/QQBBACgCiAoiAEEMaiIBNgKICgJAAkACQAJAAkACQAJAAkACQAJAQQEQISICQVlqDggCCAECAQEBBwALIAJBIkYNASACQfsARg0CC0EAKAKICiABRg0HC0EALwHqCQ0BQQAoAogKIQJBACgCjAohAwNAIAIgA08NBAJAAkAgAi8BACIBQSdGDQAgAUEiRw0BCyAAIAEQIg8LQQAgAkECaiICNgKICgwACwtBACgCiAohAkEALwHqCQ0BAkADQAJAAkACQCACQQAoAowKTw0AQQEQISICQSJGDQEgAkEnRg0BIAJB/QBHDQJBAEEAKAKICkECajYCiAoLQQEQIRpBACgCiAoiAikAAELmgMiD8I3ANlINBkEAIAJBCGo2AogKQQEQISICQSJGDQMgAkEnRg0DDAYLIAIQFwtBAEEAKAKICkECaiICNgKICgwACwsgACACECIMBQtBAEEAKAKICkF+ajYCiAoPC0EAIAJBfmo2AogKDwsQHQ8LQQBBACgCiApBAmo2AogKQQEQIUHtAEcNAUEAKAKICiICQQJqQZYIQQYQKA0BQQAoAvAJLwEAQS5GDQEgACAAIAJBCGpBACgCqAkQAQ8LQQAoAvwJQQAvAeoJIgJBAnRqQQAoAogKNgIAQQAgAkEBajsB6glBACgC8AkvAQBBLkYNAEEAQQAoAogKIgFBAmo2AogKQQEQISECIABBACgCiApBACABEAFBAEEALwHoCSIBQQFqOwHoCUEAKAKACiABQQJ0akEAKALECTYCAAJAIAJBIkYNACACQSdGDQBBAEEAKAKICkF+ajYCiAoPCyACEBdBAEEAKAKICkECaiICNgKICgJAAkACQEEBECFBV2oOBAECAgACC0EAQQAoAogKQQJqNgKICkEBECEaQQAoAsQJIgEgAjYCBCABQQE6ABggAUEAKAKICiICNgIQQQAgAkF+ajYCiAoPC0EAKALECSIBIAI2AgQgAUEBOgAYQQBBAC8B6glBf2o7AeoJIAFBACgCiApBAmo2AgxBAEEALwHoCUF/ajsB6AkPC0EAQQAoAogKQX5qNgKICg8LC0cBA39BACgCiApBAmohAEEAKAKMCiEBAkADQCAAIgJBfmogAU8NASACQQJqIQAgAi8BAEF2ag4EAQAAAQALC0EAIAI2AogKC5gBAQN/QQBBACgCiAoiAUECajYCiAogAUEGaiEBQQAoAowKIQIDQAJAAkACQCABQXxqIAJPDQAgAUF+ai8BACEDAkACQCAADQAgA0EqRg0BIANBdmoOBAIEBAIECyADQSpHDQMLIAEvAQBBL0cNAkEAIAFBfmo2AogKDAELIAFBfmohAQtBACABNgKICg8LIAFBAmohAQwACwu/AQEEf0EAKAKICiEAQQAoAowKIQECQAJAA0AgACICQQJqIQAgAiABTw0BAkACQCAALwEAIgNBpH9qDgUBAgICBAALIANBJEcNASACLwEEQfsARw0BQQBBAC8B5gkiAEEBajsB5glBACgC+AkgAEEBdGpBAC8B7Ak7AQBBACACQQRqNgKICkEAQQAvAeoJQQFqIgA7AewJQQAgADsB6gkPCyACQQRqIQAMAAsLQQAgADYCiAoQHQ8LQQAgADYCiAoLiAEBBH9BACgCiAohAUEAKAKMCiECAkACQANAIAEiA0ECaiEBIAMgAk8NASABLwEAIgQgAEYNAgJAIARB3ABGDQAgBEF2ag4EAgEBAgELIANBBGohASADLwEEQQ1HDQAgA0EGaiABIAMvAQZBCkYbIQEMAAsLQQAgATYCiAoQHQ8LQQAgATYCiAoLbAEBfwJAAkAgAEFfaiIBQQVLDQBBASABdEExcQ0BCyAAQUZqQf//A3FBBkkNACAAQSlHIABBWGpB//8DcUEHSXENAAJAIABBpX9qDgQBAAABAAsgAEH9AEcgAEGFf2pB//8DcUEESXEPC0EBCy4BAX9BASEBAkAgAEH2CEEFEB8NACAAQYAJQQMQHw0AIABBhglBAhAfIQELIAELgwEBAn9BASEBAkACQAJAAkACQAJAIAAvAQAiAkFFag4EBQQEAQALAkAgAkGbf2oOBAMEBAIACyACQSlGDQQgAkH5AEcNAyAAQX5qQZIJQQYQHw8LIABBfmovAQBBPUYPCyAAQX5qQYoJQQQQHw8LIABBfmpBnglBAxAfDwtBACEBCyABC5MDAQJ/QQAhAQJAAkACQAJAAkACQAJAAkACQCAALwEAQZx/ag4UAAECCAgICAgICAMECAgFCAYICAcICwJAAkAgAEF+ai8BAEGXf2oOBAAJCQEJCyAAQXxqQa4IQQIQHw8LIABBfGpBsghBAxAfDwsCQAJAIABBfmovAQBBjX9qDgIAAQgLAkAgAEF8ai8BACICQeEARg0AIAJB7ABHDQggAEF6akHlABAgDwsgAEF6akHjABAgDwsgAEF8akG4CEEEEB8PCyAAQX5qLwEAQe8ARw0FIABBfGovAQBB5QBHDQUCQCAAQXpqLwEAIgJB8ABGDQAgAkHjAEcNBiAAQXhqQcAIQQYQHw8LIABBeGpBzAhBAhAfDwtBASEBIABBfmoiAEHpABAgDQQgAEHQCEEFEB8PCyAAQX5qQeQAECAPCyAAQX5qQdoIQQcQHw8LIABBfmpB6AhBBBAfDwsCQCAAQX5qLwEAIgJB7wBGDQAgAkHlAEcNASAAQXxqQe4AECAPCyAAQXxqQfAIQQMQHyEBCyABC3ABAn8CQAJAA0BBAEEAKAKICiIAQQJqIgE2AogKIABBACgCjApPDQECQAJAAkAgAS8BACIBQaV/ag4CAQIACwJAIAFBdmoOBAQDAwQACyABQS9HDQIMBAsQJxoMAQtBACAAQQRqNgKICgwACwsQHQsLNQEBf0EAQQE6ANAJQQAoAogKIQBBAEEAKAKMCkECajYCiApBACAAQQAoArAJa0EBdTYC4AkLNAEBf0EBIQECQCAAQXdqQf//A3FBBUkNACAAQYABckGgAUYNACAAQS5HIAAQJXEhAQsgAQtJAQN/QQAhAwJAIAAgAkEBdCICayIEQQJqIgBBACgCsAkiBUkNACAAIAEgAhAoDQACQCAAIAVHDQBBAQ8LIAQvAQAQHiEDCyADCz0BAn9BACECAkBBACgCsAkiAyAASw0AIAAvAQAgAUcNAAJAIAMgAEcNAEEBDwsgAEF+ai8BABAeIQILIAILnAEBA39BACgCiAohAQJAA0ACQAJAIAEvAQAiAkEvRw0AAkAgAS8BAiIBQSpGDQAgAUEvRw0EEBQMAgsgABAVDAELAkACQCAARQ0AIAJBd2oiAUEXSw0BQQEgAXRBn4CABHFFDQEMAgsgAhAjRQ0DDAELIAJBoAFHDQILQQBBACgCiAoiA0ECaiIBNgKICiADQQAoAowKSQ0ACwsgAgvCAwEBfwJAIAFBIkYNACABQSdGDQAQHQ8LQQAoAogKIQIgARAXIAAgAkECakEAKAKICkEAKAKkCRABQQBBACgCiApBAmo2AogKQQAQISEAQQAoAogKIQECQAJAIABB4QBHDQAgAUECakGkCEEKEChFDQELQQAgAUF+ajYCiAoPC0EAIAFBDGo2AogKAkBBARAhQfsARg0AQQAgATYCiAoPC0EAKAKICiICIQADQEEAIABBAmo2AogKAkACQAJAQQEQISIAQSJGDQAgAEEnRw0BQScQF0EAQQAoAogKQQJqNgKICkEBECEhAAwCC0EiEBdBAEEAKAKICkECajYCiApBARAhIQAMAQsgABAkIQALAkAgAEE6Rg0AQQAgATYCiAoPC0EAQQAoAogKQQJqNgKICgJAQQEQISIAQSJGDQAgAEEnRg0AQQAgATYCiAoPCyAAEBdBAEEAKAKICkECajYCiAoCQAJAQQEQISIAQSxGDQAgAEH9AEYNAUEAIAE2AogKDwtBAEEAKAKICkECajYCiApBARAhQf0ARg0AQQAoAogKIQAMAQsLQQAoAsQJIgEgAjYCECABQQAoAogKQQJqNgIMCzABAX8CQAJAIABBd2oiAUEXSw0AQQEgAXRBjYCABHENAQsgAEGgAUYNAEEADwtBAQttAQJ/AkACQANAAkAgAEH//wNxIgFBd2oiAkEXSw0AQQEgAnRBn4CABHENAgsgAUGgAUYNASAAIQIgARAlDQJBACECQQBBACgCiAoiAEECajYCiAogAC8BAiIADQAMAgsLIAAhAgsgAkH//wNxC2gBAn9BASEBAkACQCAAQV9qIgJBBUsNAEEBIAJ0QTFxDQELIABB+P8DcUEoRg0AIABBRmpB//8DcUEGSQ0AAkAgAEGlf2oiAkEDSw0AIAJBAUcNAQsgAEGFf2pB//8DcUEESSEBCyABC4sBAQJ/AkBBACgCiAoiAi8BACIDQeEARw0AQQAgAkEEajYCiApBARAhIQJBACgCiAohAAJAAkAgAkEiRg0AIAJBJ0YNACACECQaQQAoAogKIQEMAQsgAhAXQQBBACgCiApBAmoiATYCiAoLQQEQISEDQQAoAogKIQILAkAgAiAARg0AIAAgARACCyADC3IBBH9BACgCiAohAEEAKAKMCiEBAkACQANAIABBAmohAiAAIAFPDQECQAJAIAIvAQAiA0Gkf2oOAgEEAAsgAiEAIANBdmoOBAIBAQIBCyAAQQRqIQAMAAsLQQAgAjYCiAoQHUEADwtBACACNgKICkHdAAtJAQN/QQAhAwJAIAJFDQACQANAIAAtAAAiBCABLQAAIgVHDQEgAUEBaiEBIABBAWohACACQX9qIgINAAwCCwsgBCAFayEDCyADCwvCAQIAQYAIC6QBAAB4AHAAbwByAHQAbQBwAG8AcgB0AGUAdABhAGYAcgBvAG0AcwBzAGUAcgB0AHYAbwB5AGkAZQBkAGUAbABlAGkAbgBzAHQAYQBuAHQAeQByAGUAdAB1AHIAZABlAGIAdQBnAGcAZQBhAHcAYQBpAHQAaAByAHcAaABpAGwAZQBmAG8AcgBpAGYAYwBhAHQAYwBmAGkAbgBhAGwAbABlAGwAcwAAQaQJCxABAAAAAgAAAAAEAAAQOQAA", typeof Buffer != "undefined" ? Buffer.from(E, "base64") : Uint8Array.from(atob(E), (A2) => A2.charCodeAt(0)))).then(WebAssembly.instantiate).then(({ exports: A2 }) => {
    C = A2;
  });
  var E;

  // ../core/src/module/esModule.ts
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
  var genShellExecutionCode = (id2, sourceModuleName, shellUrl) => `;import*as m$$_${id2} from'${sourceModuleName}';import{u$$_ as u$$_${id2}}from'${shellUrl}';u$$_${id2}(m$$_${id2})`;
  var ESModuleLoader = class {
    constructor(app) {
      this.moduleCache = {};
      this.lock = new Lock();
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
        if (!haveSourcemap(scriptCode)) {
          sourcemap = await createSourcemap(scriptCode, requestUrl);
        }
        scriptCode = await this.analysisModule(lockId, scriptCode, envVarStr, noEntryEnvVarStr, saveUrl, url);
        const blobUrl = this.createBlobUrl(`import.meta.url='${url}';${this.app.isNoEntryScript(url) ? noEntryEnvVarStr : envVarStr}${scriptCode}
${sourcemap}`);
        this.setBlobUrl(saveUrl, blobUrl);
      }
    }
    getUrl(referUrl, targetUrl) {
      return !isAbsolute(targetUrl) && referUrl ? transformUrl(referUrl, targetUrl) : targetUrl;
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
      await init;
      const analysis = parse(code, realUrl || "");
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
            if (!isAbsolute(moduleId)) {
              saveUrl = transformUrl(baseUrl, moduleId);
              requestUrl = transformUrl(realUrl, moduleId);
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
        if (!haveSourcemap(code) && url) {
          sourcemap = await createSourcemap(code, options && options.isInline ? `index.html(inline.${this.app.scriptCount}.js)` : url);
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

  // ../core/src/module/app.ts
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
      this.esmQueue = new Queue();
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
            warn(`Package "${key}" is not found`);
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
      const nodes = entryManager.getNodesByTagName(...sourceListTags);
      for (const key in nodes) {
        nodes[key].forEach((node) => {
          var _a, _b;
          const url = entryManager.findAttributeValue(node, "href") || entryManager.findAttributeValue(node, "src");
          if (url) {
            this.addSourceList({
              tagName: node.tagName,
              url: entryManager.url ? transformUrl(entryManager.url, url) : url
            });
          }
          if (isGarfishConfigType({ type: entryManager.findAttributeValue(node, "type") })) {
            this.childGarfishConfig = JSON.parse((_b = (_a = node.children) == null ? void 0 : _a[0]) == null ? void 0 : _b.content);
          }
        });
      }
      this.appInfo.entry && this.addSourceList({ tagName: "html", url: this.appInfo.entry });
    }
    get rootElement() {
      return findTarget(this.htmlNode, [`div[${__MockBody__}]`, "body"]);
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
        const revertCurrentScript = setDocCurrentScript(this.global.document, code, true, url, options == null ? void 0 : options.async, options == null ? void 0 : options.originScript);
        code += url ? `
//# sourceURL=${url}
` : "";
        if (!hasOwn(env, "window")) {
          env = __spreadProps(__spreadValues({}, env), {
            window: this.global
          });
        }
        evalWithEnv(`;${code}`, env, this.global);
        Promise.resolve().then(revertCurrentScript);
      }
    }
    async show() {
      this.active = true;
      const { display, mounted, provider } = this;
      if (display)
        return false;
      if (!mounted) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('Need to call the "app.mount()" method first.');
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
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('Need to call the "app.mount()" method first.');
        return false;
      }
      this.hooks.lifecycle.beforeUnmount.emit(this.appInfo, this, true);
      this.callDestroy(provider, false);
      this.display = false;
      remove(this.context.activeApps, this);
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
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.name} app unmounting.`);
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
        remove(this.context.activeApps, this);
        this.hooks.lifecycle.afterUnmount.emit(this.appInfo, this, false);
      } catch (e) {
        remove(this.context.activeApps, this);
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
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.appInfo.name} app mounting.`);
        return false;
      }
      if (this.mounted) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.appInfo.name} app already mounted.`);
        return false;
      }
      if (this.unmounting) {
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(`The ${this.appInfo.name} app is unmounting can't Perform application rendering.`);
        return false;
      }
      return true;
    }
    stopMountAndClearEffect() {
      if (!this.active) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`The app "${this.name}" rendering process has been blocked.`);
        }
        this.mounting = false;
        if (this.appContainer) {
          this.entryManager.DOMApis.removeElement(this.appContainer);
        }
        coreLog(`${this.appInfo.name} id:${this.appId} stopMountAndClearEffect`, this.appContainer);
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
      const wrapperNode = await getRenderNode(this.appInfo.domGetter);
      if (typeof wrapperNode.appendChild === "function") {
        wrapperNode.appendChild(this.appContainer);
      }
    }
    async renderTemplate() {
      const { appInfo, entryManager, resources } = this;
      const { url: baseUrl, DOMApis: DOMApis2 } = entryManager;
      const { htmlNode, appContainer } = createAppContainer(appInfo);
      this.htmlNode = htmlNode;
      this.appContainer = appContainer;
      await this.addContainer();
      const customRenderer = {
        meta: () => null,
        img: (node) => {
          baseUrl && entryManager.toResolveUrl(node, "src", baseUrl);
          return DOMApis2.createElement(node);
        },
        video: (node) => {
          baseUrl && entryManager.toResolveUrl(node, "src", baseUrl);
          return DOMApis2.createElement(node);
        },
        audio: (node) => {
          baseUrl && entryManager.toResolveUrl(node, "src", baseUrl);
          return DOMApis2.createElement(node);
        },
        body: (node) => {
          if (!this.strictIsolation) {
            node = entryManager.cloneNode(node);
            node.tagName = "div";
            node.attributes.push({
              key: __MockBody__,
              value: null
            });
          }
          return DOMApis2.createElement(node);
        },
        head: (node) => {
          if (!this.strictIsolation) {
            node = entryManager.cloneNode(node);
            node.tagName = "div";
            node.attributes.push({
              key: __MockHead__,
              value: null
            });
          }
          return DOMApis2.createElement(node);
        },
        script: (node) => {
          const mimeType = entryManager.findAttributeValue(node, "type");
          const isModule2 = mimeType === "module";
          if (mimeType) {
            if (!isModule2 && !isJsType({ type: mimeType })) {
              return DOMApis2.createElement(node);
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
              isModule: isModule2,
              async: false,
              isInline: jsManager.isInlineScript(),
              noEntry: toBoolean(entryManager.findAttributeValue(node, "no-entry") || this.isNoEntryScript(targetUrl)),
              originScript: mockOriginScript
            });
          } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            const async = entryManager.findAttributeValue(node, "async");
            if (typeof async === "undefined" || async === "false") {
              const tipInfo = JSON.stringify(node, null, 2);
              warn(`Current js node cannot be found, the resource may not exist.

 ${tipInfo}`);
            }
          }
          return DOMApis2.createScriptCommentNode(node);
        },
        style: (node) => {
          const text = node.children[0];
          if (text) {
            const styleManager = new StyleManager(text.content, baseUrl);
            styleManager.setScope({
              appName: this.name,
              rootElId: this.appContainer.id
            });
            baseUrl && styleManager.correctPath(baseUrl);
            return entryManager.ignoreChildNodesCreation(styleManager.renderAsStyleElement());
          }
          return DOMApis2.createElement(node);
        },
        link: (node) => {
          if (DOMApis2.isCssLinkNode(node)) {
            const styleManager = this.resources.link.find((manager) => manager.isSameOrigin(node));
            if (styleManager) {
              styleManager.setScope({
                appName: this.name,
                rootElId: this.appContainer.id
              });
              return styleManager.renderAsStyleElement((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? `
/*${DOMApis2.createLinkCommentNode(node)}*/
` : "");
            }
          }
          return DOMApis2.isPrefetchJsLinkNode(node) ? DOMApis2.createScriptCommentNode(node) : DOMApis2.isIconLinkNode(node) ? null : DOMApis2.createElement(node);
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
        if (isPromise(cjsModules.exports))
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
      } else if (isPromise(provider)) {
        provider = await provider;
      }
      if (!isObject(provider) && typeof provider !== "function") {
        warn(` Invalid module content: ${name}, you should return both render and destroy functions in provider function.`);
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
        assert(provider, `"provider" is "${provider}".`);
        assert("render" in provider, '"render" is required in provider.');
        assert("destroy" in provider, '"destroy" is required in provider.');
      }
      this.provider = provider;
      return provider;
    }
  };

  // ../core/src/module/resource.ts
  function fetchStaticResources(appName, loader, entryManager) {
    const isAsync = (val) => typeof val !== "undefined" && val !== "false";
    const jsNodes = Promise.all(entryManager.findAllJsNodes().map((node) => {
      const src = entryManager.findAttributeValue(node, "src");
      const type = entryManager.findAttributeValue(node, "type");
      const crossOrigin = entryManager.findAttributeValue(node, "crossorigin");
      if (src) {
        const fetchUrl = entryManager.url ? transformUrl(entryManager.url, src) : src;
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
            warn(`[${appName}] Failed to load script: ${fetchUrl}`);
          }
        }).catch(() => null);
      } else if (node.children.length > 0) {
        const code = node.children[0].content;
        if (code) {
          const jsManager = new JavaScriptManager(code, "");
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
        const fetchUrl = entryManager.url ? transformUrl(entryManager.url, href) : href;
        return loader.load({ scope: appName, url: fetchUrl }).then(({ resourceManager: styleManager }) => {
          if (styleManager) {
            styleManager.setDep(node);
            styleManager.correctPath();
            return styleManager;
          } else {
            warn(`${appName} Failed to load link: ${fetchUrl}`);
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
        warn(`Asynchronous loading module, the alias "${alias}" is invalid.`);
      }
    }).filter(Boolean));
    return Promise.all([jsNodes, linkNodes, metaNodes]).then((ls) => ls.map((ns2) => ns2.filter(Boolean)));
  }
  async function processAppResources(loader, appInfo) {
    let isHtmlMode = false, fakeEntryManager;
    const resources = { js: [], link: [], modules: [] };
    assert(appInfo.entry, `[${appInfo.name}] Entry is not specified.`);
    const { resourceManager: entryManager } = await loader.load({
      scope: appInfo.name,
      url: transformUrl(location.href, appInfo.entry)
    });
    if (entryManager instanceof TemplateManager) {
      isHtmlMode = true;
      const [js, link, modules] = await fetchStaticResources(appInfo.name, loader, entryManager);
      resources.js = js;
      resources.link = link;
      resources.modules = modules;
    } else if (entryManager instanceof JavaScriptManager) {
      isHtmlMode = false;
      const mockTemplateCode = `<script src="${entryManager.url}"><\/script>`;
      fakeEntryManager = new TemplateManager(mockTemplateCode, entryManager.url);
      entryManager.setDep(fakeEntryManager.findAllJsNodes()[0]);
      resources.js = [entryManager];
    } else {
      error(`Entrance wrong type of resource of "${appInfo.name}".`);
    }
    return [fakeEntryManager || entryManager, resources, isHtmlMode];
  }

  // ../core/src/plugins/fixHMR.ts
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

  // ../core/src/plugins/lifecycle.ts
  function GarfishOptionsLife(options, name) {
    return function() {
      return __spreadValues({
        name,
        version: "1.12.0"
      }, options);
    };
  }

  // ../core/src/plugins/preload.ts
  var storageKey = "__garfishPreloadApp__";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var requestQueue = new Queue();
  var isSlowNetwork = () => navigator.connection ? navigator.connection.saveData || /(2|3)g/.test(navigator.connection.effectiveType) : false;
  var requestIdleCallback = typeof idleCallback !== "function" ? window.setTimeout : idleCallback;
  function safeLoad({
    loader,
    appName,
    url,
    isModule: isModule2,
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
        warn(e);
        warn(`Preload failed. "${url}"`);
      }
      next();
    };
    const loadResource = (next = () => {
    }) => {
      const throwWarn = generateThrowWarn(next);
      const success = generateSuccess(next);
      try {
        if (isModule2) {
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
    const fetchUrl = transformUrl(location.href, info.entry);
    safeLoad({
      loader,
      appName: info.name,
      url: fetchUrl,
      isModule: false,
      immediately,
      callback: (manager) => {
        const loadStaticResource = () => {
          if (manager instanceof TemplateManager) {
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
                  url: baseUrl ? transformUrl(baseUrl, src) : src,
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
                    url: baseUrl ? transformUrl(baseUrl, href) : href,
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
                  if (src && isAbsolute(src)) {
                    safeLoad({
                      loader,
                      appName: info.name,
                      url: src,
                      isModule: true,
                      immediately
                    });
                  } else {
                    warn(`The loading of the remote module must be an absolute path. "${src}"`);
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
      safeWrapper(() => localStorage.setItem(storageKey, JSON.stringify([newCurrent])));
    } else {
      const data = JSON.parse(str);
      const current = data.find((app) => app.appName === appName);
      current ? current.count++ : data.push(newCurrent);
      safeWrapper(() => localStorage.setItem(storageKey, JSON.stringify(data)));
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

  // ../core/src/plugins/performance/subAppObserver.ts
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
        warn(e);
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
        warn(e);
      }
    }
    unsubscribePerformanceData(callback) {
      try {
        this.targetSubscriber = this.targetSubscriber.filter((sub) => sub === callback);
      } catch (e) {
        warn(e);
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
        const targetNode = await getRenderNode(this.domQuerySelector);
        this.observer.observe(targetNode, this.config);
        this._subAppClickEventObserver(targetNode);
      } catch (e) {
        warn(e);
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
        warn(e);
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
        warn(e);
      }
    }
  };

  // ../core/src/plugins/performance/index.ts
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

  // ../core/src/plugins/logger.ts
  function GarfishLogger() {
    return function() {
      return {
        name: "garfish-logger",
        version: "1.12.0",
        beforeLoad(appInfo, ...args) {
          coreLog(`${appInfo.name} beforeLoad`, [appInfo, ...args]);
        },
        afterLoad(appInfo, appInstance, ...args) {
          if (appInstance) {
            coreLog(`${appInfo.name} id: ${appInstance.appId} afterLoad`, [
              appInfo,
              ...args
            ]);
          }
        },
        beforeMount(appInfo, appInstance, ...args) {
          coreLog(`${appInfo.name} id: ${appInstance.appId} beforeMount`, [
            appInfo,
            ...args
          ]);
        },
        afterMount(appInfo, appInstance, ...args) {
          coreLog(`${appInfo.name} id: ${appInstance.appId} afterMount`, [
            appInfo,
            ...args
          ]);
        },
        beforeUnmount(appInfo, appInstance, ...args) {
          coreLog(`${appInfo.name} id: ${appInstance.appId} beforeUnmount`, [
            appInfo,
            ...args
          ]);
        },
        afterUnmount(appInfo, appInstance, ...args) {
          coreLog(`${appInfo.name} id: ${appInstance.appId} afterUnmount`, [
            appInfo,
            ...args
          ]);
        }
      };
    };
  }

  // ../core/src/garfish.ts
  var DEFAULT_PROPS = /* @__PURE__ */ new WeakMap();
  var HOOKS_API = {
    SyncHook,
    AsyncHook,
    SyncWaterfallHook,
    AsyncWaterfallHook
  };
  var Garfish = class extends import_eventemitter2.EventEmitter2 {
    constructor(options) {
      super();
      this.running = false;
      this.version = "1.12.0";
      this.flag = __GARFISH_FLAG__;
      this.loader = new Loader();
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
      assert(!this.running, "Garfish is running, can`t set options");
      if (isPlainObject(options)) {
        this.options = deepMergeConfig(this.options, options);
      }
      return this;
    }
    createPluginSystem(callback) {
      const hooks = callback(HOOKS_API);
      return new PluginSystem(hooks);
    }
    usePlugin(plugin, ...args) {
      assert(!this.running, "Cannot register plugin after Garfish is started.");
      assert(typeof plugin === "function", "Plugin must be a function.");
      args.unshift(this);
      const pluginConfig = plugin.apply(null, args);
      assert(pluginConfig.name, "The plugin must have a name.");
      if (!this.plugins[pluginConfig.name]) {
        this.plugins[pluginConfig.name] = pluginConfig;
        this.hooks.usePlugin(pluginConfig);
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        warn("Please do not register the plugin repeatedly.");
      }
      return this;
    }
    run(options = {}) {
      var _a;
      if (this.running) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn("Garfish is already running now, Cannot run Garfish repeatedly.");
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
        assert(appInfo.name, "Miss app.name.");
        if (!this.appInfos[appInfo.name]) {
          assert(appInfo.entry, `${appInfo.name} application entry is not url: ${appInfo.entry}`);
          currentAdds[appInfo.name] = appInfo;
          this.appInfos[appInfo.name] = appInfo;
        } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`The "${appInfo.name}" app is already registered.`);
        }
      }
      this.hooks.lifecycle.registerApp.emit(currentAdds);
      return this;
    }
    setExternal(nameOrExtObj, value) {
      assert(nameOrExtObj, "Invalid parameter.");
      if (typeof nameOrExtObj === "object") {
        for (const key in nameOrExtObj) {
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
            this.externals[key] && warn(`The "${key}" will be overwritten in external.`);
          }
          this.externals[key] = nameOrExtObj[key];
        }
      } else {
        this.externals[nameOrExtObj] = value;
      }
      return this;
    }
    loadApp(appName, options) {
      assert(appName, "Miss appName.");
      let appInfo = generateAppOptions(appName, this, options);
      const asyncLoadProcess = async () => {
        const stop = await this.hooks.lifecycle.beforeLoad.emit(appInfo);
        if (stop === false) {
          warn(`Load ${appName} application is terminated by beforeLoad.`);
          return null;
        }
        appInfo = generateAppOptions(appName, this, options);
        assert(appInfo.entry, `Can't load unexpected child app "${appName}", Please provide the entry parameters or registered in advance of the app.`);
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
            (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
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

  // ../router/src/config.ts
  var __GARFISH_ROUTER_UPDATE_FLAG__ = "__GARFISH_ROUTER_UPDATE_FLAG__";
  var __GARFISH_ROUTER_FLAG__ = "__GARFISH_ROUTER_FLAG__";
  var __GARFISH_BEFORE_ROUTER_EVENT__ = "garfish:before-routing-event";
  var RouterConfig = {
    basename: "/",
    current: {
      fullPath: "/",
      path: "/",
      matched: [],
      query: {},
      state: {}
    },
    apps: [],
    beforeEach: (to, from, next) => next(),
    afterEach: (to, from, next) => next(),
    active: () => Promise.resolve(),
    deactive: () => Promise.resolve(),
    routerChange: () => {
    },
    autoRefreshApp: true,
    listening: true
  };
  function set(field, value) {
    RouterConfig[field] = value;
  }
  function setRouterConfig(options) {
    Object.assign(RouterConfig, options);
  }

  // ../router/src/utils/urlUt.ts
  function parseQuery(query = "") {
    const res = {};
    if (query) {
      query.slice(1).split("&").map((item) => {
        const pairs = item.split("=");
        res[pairs[0]] = pairs;
      });
    }
    return res;
  }
  function getPath(basename = "/", pathname) {
    if (basename === "/" || basename === "") {
      return pathname || location.pathname;
    } else {
      return (pathname || location.pathname).replace(new RegExp(`^/?${basename}`), "");
    }
  }
  function getAppRootPath(appInfo) {
    const path = getPath(appInfo.basename, location.pathname);
    let appRootPath = appInfo.basename === "/" ? "" : appInfo.basename || "";
    if (typeof appInfo.activeWhen === "string") {
      appRootPath += appInfo.activeWhen;
    } else {
      appRootPath += path.split("").reduce((pre, next) => {
        if (typeof appInfo.activeWhen === "function" && !appInfo.activeWhen(pre))
          return pre + next;
        return pre;
      }, "");
    }
    return appRootPath;
  }

  // ../router/src/utils/index.ts
  async function asyncForEach(arr, callback) {
    const length = arr.length;
    let k = 0;
    while (k < length) {
      const kValue = arr[k];
      await callback(kValue, k, arr);
      k++;
    }
  }
  function toMiddleWare(to, from, cb) {
    return new Promise((resolve, reject) => {
      try {
        cb(to, from, resolve);
      } catch (err) {
        reject(err);
      }
    });
  }
  function createEvent(type) {
    let e;
    if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {
      e = document.createEvent("UIEvents");
      e.initUIEvent(type.toLowerCase(), true, false, window, 0);
    } else {
      e = new Event(type.toLowerCase());
    }
    return e;
  }

  // ../router/src/utils/customEvent.ts
  var NativeCustomEvent = typeof global !== "undefined" ? global == null ? void 0 : global.CustomEvent : null;
  function useNative() {
    try {
      const p = new NativeCustomEvent("cat", { detail: { foo: "bar" } });
      return p.type === "cat" && p.detail.foo === "bar";
    } catch (e) {
    }
    return false;
  }
  var CustomEvent;
  if (NativeCustomEvent && useNative()) {
    CustomEvent = NativeCustomEvent;
  } else if (typeof document !== "undefined" && typeof document.createEvent === "function") {
    CustomEvent = function(type, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      const evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(type, params.bubbles || false, params.cancelable || false, params.detail || null);
      return evt;
    };
  } else {
    CustomEvent = function(type, params) {
      const e = document.createEventObject();
      e.type = type;
      if (params) {
        e.bubbles = Boolean(params.bubbles);
        e.cancelable = Boolean(params.cancelable);
        e.detail = params.detail;
      } else {
        e.bubbles = false;
        e.cancelable = false;
        e.detail = void 0;
      }
      return e;
    };
  }
  var customEvent_default = CustomEvent;

  // ../router/src/utils/navEvent.ts
  function createPopStateEvent(state, originalMethodName) {
    let evt;
    try {
      evt = new PopStateEvent("popstate", { state });
    } catch (err) {
      evt = document.createEvent("PopStateEvent");
      evt.initPopStateEvent("popstate", false, false, state);
    }
    evt.garfish = true;
    evt.garfishTrigger = originalMethodName;
    return evt;
  }
  var callCapturedEventListeners = (type) => {
    const eventArguments = createPopStateEvent(window.history.state, type);
    window.dispatchEvent(eventArguments);
  };
  var handlerParams = function(path, query, basename) {
    if (!path || typeof path !== "string")
      return "";
    let url = path;
    if (url[0] !== "/")
      url = "/" + url;
    if (Object.prototype.toString.call(query) === "[object Object]") {
      const qs = Object.keys(query).map((key) => `${key}=${query[key]}`).join("&");
      url += qs ? "?" + qs : "";
    }
    if (basename !== "/")
      url = basename + url;
    if (url[0] !== "/")
      url = "/" + url;
    return url;
  };
  var push = ({
    path,
    query,
    basename
  }) => {
    if (!basename)
      basename = RouterConfig.basename || "/";
    let url = null;
    if (validURL(path)) {
      url = /(^https?:)|(^\/\/)/.test(path) ? path : `//${path}`;
    } else {
      url = handlerParams(path, query, basename);
    }
    history.pushState(__spreadValues({ [__GARFISH_ROUTER_UPDATE_FLAG__]: true }, history.state), "", url);
  };
  var replace = ({
    path,
    query,
    basename
  }) => {
    if (!basename)
      basename = RouterConfig.basename || "/";
    let url = null;
    if (validURL(path)) {
      url = /^(https?:)(\/\/)/.test(path) ? path : `//${path}`;
    } else {
      url = handlerParams(path, query, basename);
    }
    history.replaceState(__spreadValues({ [__GARFISH_ROUTER_UPDATE_FLAG__]: true }, history.state), "", url);
  };

  // ../router/src/linkTo.ts
  var hasActive = (activeWhen, path) => {
    if (typeof activeWhen === "string") {
      if (activeWhen[0] !== "/")
        activeWhen = `/${activeWhen}`;
      if (activeWhen === "/" && path === activeWhen)
        return true;
      const activeWhenArr = activeWhen.split("/");
      const pathArr = path.split("/");
      let flag = true;
      activeWhenArr.forEach((pathItem, index) => {
        if (pathItem && pathItem !== pathArr[index]) {
          flag = false;
        }
      });
      return flag;
    } else {
      return activeWhen(path);
    }
  };
  var linkTo = async ({
    toRouterInfo,
    fromRouterInfo,
    eventType
  }) => {
    const {
      current,
      apps,
      deactive,
      active,
      notMatch,
      beforeEach: beforeEach2,
      afterEach: afterEach2,
      autoRefreshApp
    } = RouterConfig;
    const deactiveApps = current.matched.filter((appInfo) => !hasActive(appInfo.activeWhen, getPath(appInfo.basename, location.pathname)));
    const activeApps = apps.filter((appInfo) => {
      return hasActive(appInfo.activeWhen, getPath(appInfo.basename, location.pathname));
    });
    const needToActive = activeApps.filter(({ name }) => {
      return !current.matched.some(({ name: cName }) => name === cName);
    });
    const to = __spreadProps(__spreadValues({}, toRouterInfo), {
      matched: needToActive
    });
    const from = __spreadProps(__spreadValues({}, fromRouterInfo), {
      matched: deactiveApps
    });
    await toMiddleWare(to, from, beforeEach2);
    if (current.matched.length > 0) {
      await asyncForEach(deactiveApps, async (appInfo) => await deactive(appInfo, getPath(appInfo.basename, location.pathname)));
    }
    setRouterConfig({
      current: {
        path: getPath(RouterConfig.basename),
        fullPath: location.pathname,
        matched: activeApps,
        state: history.state,
        query: parseQuery(location.search)
      }
    });
    const curState = window.history.state || {};
    if (eventType !== "popstate" && (curState[__GARFISH_ROUTER_UPDATE_FLAG__] || autoRefreshApp)) {
      callCapturedEventListeners(eventType);
    }
    await asyncForEach(needToActive, async (appInfo) => {
      const appRootPath = getAppRootPath(appInfo);
      await active(appInfo, appRootPath);
    });
    if (activeApps.length === 0 && notMatch)
      notMatch(location.pathname);
    await toMiddleWare(to, from, afterEach2);
  };

  // ../router/src/agentRouter.ts
  var normalAgent = () => {
    const addRouterListener = function() {
      window.addEventListener(__GARFISH_BEFORE_ROUTER_EVENT__, function(env) {
        RouterConfig.routerChange && RouterConfig.routerChange(location.pathname);
        linkTo(env.detail);
      });
    };
    if (!window[__GARFISH_ROUTER_FLAG__]) {
      const rewrite = function(type) {
        const hapi = history[type];
        return function() {
          const urlBefore = window.location.pathname + window.location.hash;
          const stateBefore = history == null ? void 0 : history.state;
          const res = hapi.apply(this, arguments);
          const urlAfter = window.location.pathname + window.location.hash;
          const stateAfter = history == null ? void 0 : history.state;
          const e = createEvent(type);
          e.arguments = arguments;
          if (urlBefore !== urlAfter || JSON.stringify(stateBefore) !== JSON.stringify(stateAfter)) {
            window.dispatchEvent(new customEvent_default(__GARFISH_BEFORE_ROUTER_EVENT__, {
              detail: {
                toRouterInfo: {
                  fullPath: urlAfter,
                  query: parseQuery(location.search),
                  path: getPath(RouterConfig.basename, urlAfter),
                  state: stateAfter
                },
                fromRouterInfo: {
                  fullPath: urlBefore,
                  query: parseQuery(location.search),
                  path: getPath(RouterConfig.basename, urlBefore),
                  state: stateBefore
                },
                eventType: type
              }
            }));
          }
          return res;
        };
      };
      history.pushState = rewrite("pushState");
      history.replaceState = rewrite("replaceState");
      window.addEventListener("popstate", function(event) {
        if (event && typeof event === "object" && event.garfish)
          return;
        if (history.state && typeof history.state === "object")
          delete history.state[__GARFISH_ROUTER_UPDATE_FLAG__];
        window.dispatchEvent(new customEvent_default(__GARFISH_BEFORE_ROUTER_EVENT__, {
          detail: {
            toRouterInfo: {
              fullPath: location.pathname,
              query: parseQuery(location.search),
              path: getPath(RouterConfig.basename)
            },
            fromRouterInfo: {
              fullPath: RouterConfig.current.fullPath,
              path: getPath(RouterConfig.basename, RouterConfig.current.path),
              query: RouterConfig.current.query
            },
            eventType: "popstate"
          }
        }));
      }, false);
      window[__GARFISH_ROUTER_FLAG__] = true;
    }
    addRouterListener();
  };
  var initRedirect = () => {
    linkTo({
      toRouterInfo: {
        fullPath: location.pathname,
        path: getPath(RouterConfig.basename),
        query: parseQuery(location.search),
        state: history.state
      },
      fromRouterInfo: {
        fullPath: "/",
        path: "/",
        query: {},
        state: {}
      },
      eventType: "pushState"
    });
  };
  var listen = () => {
    normalAgent();
    initRedirect();
  };

  // ../router/src/context.ts
  var beforeEach = (hook) => {
    set("beforeEach", hook);
  };
  var afterEach = (hook) => {
    set("afterEach", hook);
  };
  var routerChange = (hook) => {
    set("routerChange", hook);
  };
  var registerRouter = (Apps) => {
    const unregisterApps = Apps.filter((app) => !RouterConfig.apps.some((item) => app.name === item.name));
    set("apps", RouterConfig.apps.concat(unregisterApps));
  };
  var listenRouterAndReDirect = ({
    apps,
    basename = "/",
    autoRefreshApp,
    active,
    deactive,
    notMatch,
    listening = true
  }) => {
    registerRouter(apps);
    setRouterConfig({
      basename,
      autoRefreshApp,
      active,
      deactive,
      notMatch,
      listening
    });
    listen();
  };
  var Router = {
    push,
    replace,
    beforeEach,
    afterEach,
    registerRouter,
    routerChange,
    listenRouterAndReDirect,
    setRouterConfig,
    routerConfig: RouterConfig
  };
  var context_default = Router;

  // ../router/src/index.ts
  function GarfishRouter(_args) {
    return function(Garfish2) {
      Garfish2.apps = {};
      Garfish2.router = context_default;
      return {
        name: "router",
        version: "1.12.0",
        bootstrap(options) {
          let activeApp = null;
          const unmounts = {};
          const { basename } = options;
          const { autoRefreshApp = true, onNotMatchRouter = () => null } = Garfish2.options;
          async function active(appInfo, rootPath = "/") {
            routerLog(`${appInfo.name} active`, {
              appInfo,
              rootPath,
              listening: RouterConfig.listening
            });
            if (!RouterConfig.listening)
              return;
            const { name, active: active2, cache = true } = appInfo;
            if (active2)
              return active2(appInfo, rootPath);
            appInfo.rootPath = rootPath;
            const currentApp = activeApp = createKey();
            const app = await Garfish2.loadApp(appInfo.name, {
              cache,
              basename: rootPath,
              entry: appInfo.entry,
              domGetter: appInfo.domGetter
            });
            if (app) {
              app.appInfo.basename = rootPath;
              const call = async (app2, isRender) => {
                if (!app2)
                  return;
                const isDes = cache && app2.mounted;
                if (isRender) {
                  return await app2[isDes ? "show" : "mount"]();
                } else {
                  return app2[isDes ? "hide" : "unmount"]();
                }
              };
              Garfish2.apps[name] = app;
              unmounts[name] = () => {
                if (app.mounting) {
                  delete Garfish2.cacheApps[name];
                }
                call(app, false);
              };
              if (currentApp === activeApp) {
                await call(app, true);
              }
            }
          }
          async function deactive(appInfo, rootPath) {
            routerLog(`${appInfo.name} deactive`, {
              appInfo,
              rootPath
            });
            activeApp = null;
            const { name, deactive: deactive2 } = appInfo;
            if (deactive2)
              return deactive2(appInfo, rootPath);
            const unmount = unmounts[name];
            unmount && unmount();
            delete Garfish2.apps[name];
            const needToDeleteApps = context_default.routerConfig.apps.filter((app) => {
              if (appInfo.rootPath === app.basename)
                return true;
            });
            if (needToDeleteApps.length > 0) {
              needToDeleteApps.forEach((app) => {
                delete Garfish2.appInfos[app.name];
                delete Garfish2.cacheApps[app.name];
              });
              context_default.setRouterConfig({
                apps: context_default.routerConfig.apps.filter((app) => {
                  return !needToDeleteApps.some((needDelete) => app.name === needDelete.name);
                })
              });
            }
          }
          const apps = Object.values(Garfish2.appInfos);
          const appList = apps.filter((app) => {
            if (!app.basename)
              app.basename = basename;
            return !!app.activeWhen;
          });
          const listenOptions = {
            basename,
            active,
            deactive,
            autoRefreshApp,
            notMatch: onNotMatchRouter,
            apps: appList,
            listening: true
          };
          routerLog("listenRouterAndReDirect", listenOptions);
          listenRouterAndReDirect(listenOptions);
        },
        registerApp(appInfos) {
          const appList = Object.values(appInfos);
          context_default.registerRouter(appList.filter((app) => !!app.activeWhen));
          if (!Garfish2.running)
            return;
          routerLog("registerApp initRedirect", appInfos);
          initRedirect();
        }
      };
    };
  }

  // ../browser-vm/src/symbolTypes.ts
  var GARFISH_NAMESPACE_PREFIX = "__Garfish__";
  var GARFISH_OPTIMIZE_NAME = "__garfish_optimize__";
  var __proxyNode__ = Symbol.for("garfish.proxyNode");
  var __domWrapper__ = Symbol.for("garfish.domWrapper");
  var __windowBind__ = Symbol.for("garfish.windowBind");
  var __sandboxMap__ = Symbol.for("garfish.sandboxMap");
  var __documentBind__ = Symbol.for("garfish.documentBind");
  var __garfishGlobal__ = Symbol.for("garfish.globalObject");
  var __elementSandboxTag__ = Symbol.for("garfish.elementSandboxTag");

  // ../browser-vm/src/utils.ts
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
  function handlerParams2(args) {
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

  // ../browser-vm/src/proxyInterceptor/shared.ts
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
  var buildInProps = makeMap([
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
      const args = handlerParams2(arguments);
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

  // ../browser-vm/src/modules/history.ts
  var passedKey = makeMap(["scrollRestoration"]);
  function historyModule() {
    const proto = Object.getPrototypeOf(window.history) || History.prototype;
    const fakeHistory = Object.create(proto);
    const proxyHistory = new Proxy(fakeHistory, {
      get(target, p) {
        const value = hasOwn(target, p) ? target[p] : window.history[p];
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

  // ../browser-vm/src/modules/network.ts
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
      if (!hasOwn(options, "signal") && window.AbortController) {
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

  // ../browser-vm/src/proxyInterceptor/document.ts
  var passedKey2 = makeMap(["title", "cookie", "onselectstart", "ondragstart"]);
  var queryFunctions = makeMap([
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
      const value = hasOwn(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(document, p);
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
        if (isObject(el)) {
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
        let newValue = hasOwn(value, __documentBind__) ? value[__documentBind__] : null;
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
      return hasOwn(target, p) || Reflect.has(document, p);
    };
  }

  // ../browser-vm/src/modules/document.ts
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

  // ../browser-vm/src/modules/uiEvent.ts
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

  // ../browser-vm/src/modules/storage.ts
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

  // ../browser-vm/src/modules/eventListener.ts
  function listenerModule(_sandbox) {
    const listeners = /* @__PURE__ */ new Map();
    const rawAddEventListener2 = window.addEventListener;
    const rawRemoveEventListener2 = window.removeEventListener;
    function addListener(type, listener, options) {
      const curListeners = listeners.get(type) || [];
      listeners.set(type, [...curListeners, listener]);
      rawAddEventListener2.call(this, type, listener, options);
    }
    function removeListener(type, listener, options) {
      const curListeners = listeners.get(type) || [];
      const idx = curListeners.indexOf(listener);
      if (idx !== -1) {
        curListeners.splice(idx, 1);
      }
      listeners.set(type, [...curListeners]);
      rawRemoveEventListener2.call(this, type, listener, options);
    }
    const recover = () => {
      listeners.forEach((listener, key) => {
        listener.forEach((fn) => {
          rawRemoveEventListener2.call(window, key, fn);
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
      created(global2) {
        const fakeDocument = global2 == null ? void 0 : global2.document;
        if (fakeDocument) {
          fakeDocument.addEventListener = addListener.bind(document);
          fakeDocument.removeEventListener = removeListener.bind(document);
        }
      }
    };
  }

  // ../browser-vm/src/modules/mutationObserver.ts
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

  // ../browser-vm/src/modules/timer.ts
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
    const clearTimeout2 = (timeoutId) => {
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
        clearTimeout: clearTimeout2
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

  // ../browser-vm/src/dynamicNode/processParams.ts
  function injectHandlerParams() {
    if (window.MutationObserver) {
      const rawObserver = window.MutationObserver.prototype.observe;
      MutationObserver.prototype.observe = function() {
        return rawObserver.apply(this, handlerParams2(arguments));
      };
    }
    const desc = Object.getOwnPropertyDescriptor(window.Document.prototype, "activeElement");
    const rawActiveEl = desc && desc.get;
    if (rawActiveEl) {
      Object.defineProperty(window.Document.prototype, "activeElement", {
        get(...args) {
          return rawActiveEl.apply(handlerParams2([this])[0], handlerParams2(args));
        }
      });
    }
  }

  // ../browser-vm/src/dynamicNode/processor.ts
  var isInsertMethod = makeMap(["insertBefore", "insertAdjacentElement"]);
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
        src && (el.src = transformUrl(baseUrl, src));
        href && (el.href = transformUrl(baseUrl, href));
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
          const fetchUrl = baseUrl ? transformUrl(baseUrl, href) : href;
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
              warn(`Invalid resource type "${type}", "${href}" can't generate styleManager`);
            }
            this.dispatchEvent("load");
          }).catch((e) => {
            (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
            this.dispatchEvent("error", {
              error: e,
              filename: fetchUrl
            });
          });
        }
      } else {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
          warn(`Invalid resource type "${type}", "${href}"`);
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
          const fetchUrl = baseUrl ? transformUrl(baseUrl, src) : src;
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
              warn(`Invalid resource type "${type}", "${src}" can't generate scriptManager`);
            }
            this.dispatchEvent("load");
          }, (e) => {
            (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn(e);
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
        return findTarget(this.rootElement, [
          "body",
          `div[${__MockBody__}]`
        ]);
      } else if (parentNode === document.head) {
        return findTarget(this.rootElement, [
          "head",
          `div[${__MockHead__}]`
        ]);
      }
      if (this.rootElement.contains(parentNode) || !document.contains(parentNode)) {
        return parentNode;
      }
      if (defaultInsert === "head") {
        return findTarget(this.rootElement, [
          "head",
          `div[${__MockHead__}]`
        ]);
      } else if (defaultInsert === "body") {
        return findTarget(this.rootElement, [
          "body",
          `div[${__MockBody__}]`
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

  // ../browser-vm/src/dynamicNode/index.ts
  var mountElementMethods = [
    "append",
    "appendChild",
    "insertBefore",
    "insertAdjacentElement"
  ];
  var removeChildElementMethods = ["removeChild"];
  var ignoreElementTimingTags = makeMap([
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
          const manager = new StyleManager(el.textContent);
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
      safeWrapper(() => {
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
        (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('"ownerDocument" is a read-only attribute.');
      }
    });
  }
  function makeElInjector(sandboxConfig) {
    if (makeElInjector.hasInject)
      return;
    makeElInjector.hasInject = true;
    if (typeof window.Element === "function") {
      if (sandboxConfig.fixBaseUrl)
        safeWrapper(() => handleOwnerDocument());
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

  // ../browser-vm/src/lifecycle.ts
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

  // ../browser-vm/src/proxyInterceptor/global.ts
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
        value = hasOwn(target, p) ? Reflect.get(target, p, receiver) : Reflect.get(window, p);
      }
      if (typeof value === "function") {
        if (isEsGlobalMethods(p) || isNativeCodeMethods(p) || hasOwn(overrideList, p) || isConstructor(value) || sandbox.isExternalGlobalVariable.has(p)) {
          return value;
        }
      } else {
        return value;
      }
      const newValue = hasOwn(value, __windowBind__) ? value[__windowBind__] : bind(value, window);
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
  var safariProxyWindowDealHandler = safari13Deal();
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
      if (hasOwn(target, p)) {
        delete target[p];
        if (sandbox.initComplete && sandbox.isExternalGlobalVariable.has(p)) {
          sandbox.isExternalGlobalVariable.delete(p);
        }
      } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        if (hasOwn(window, p) && sandbox.isProtectVariable(p)) {
          warn(`The "${String(p)}" is global protect variable."`);
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

  // ../browser-vm/src/sandbox.ts
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
    return isObject(module) ? module[__garfishGlobal__] !== void 0 : false;
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
      this.isProtectVariable = makeMap((protectVariable == null ? void 0 : protectVariable()) || []);
      this.isInsulationVariable = makeMap((insulationVariable == null ? void 0 : insulationVariable()) || []);
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
      const fakeWindow = createFakeObject(window, this.isInsulationVariable, makeMap(moduleKeys));
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
      safeWrapper(() => {
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
                warn(`"${key}" global variables are overwritten.`);
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
        return p && !this.isProtectVariable(p) && !tempEnvKeys.includes(p) && hasOwn(this.global, p);
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
        safeWrapper(() => {
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
        warn('The current environment does not support "vm sandbox",Please use the "snapshot sandbox" instead.');
      }
      return support;
    }
  };

  // ../browser-vm/src/pluginify.ts
  var specialExternalVariables = [
    "onerror",
    "webpackjsonp",
    "__REACT_ERROR_OVERLAY_GLOBAL_HOOK__",
    (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) ? "webpackHotUpdate" : ""
  ];
  function compatibleOldModule(modules) {
    if (!Array.isArray(modules)) {
      (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && warn('"vm sandbox" modules should be an array');
      const list = [];
      for (const key in modules) {
        list.push(modules[key]);
      }
      modules = list;
    }
    return modules;
  }
  function rewriteAppAndSandbox(Garfish2, app, sandbox) {
    var _a;
    const originExecScript = sandbox.execScript;
    sandbox.loader = Garfish2.loader;
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
  function createOptions(Garfish2) {
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
        rewriteAppAndSandbox(Garfish2, appInstance, new Sandbox({
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
    return function(Garfish2) {
      Garfish2.getGlobalObject = function() {
        return Sandbox.getNativeWindow();
      };
      Garfish2.setGlobalValue = function(key, value) {
        return this.getGlobalObject()[key] = value;
      };
      Garfish2.clearEscapeEffect = function(key, value) {
        const global2 = this.getGlobalObject();
        if (key in global2) {
          global2[key] = value;
        }
      };
      return createOptions(Garfish2);
    };
  }

  // ../browser-snapshot/src/patchers/event.ts
  var rawAddEventListener;
  var rawRemoveEventListener;
  var PatchEvent = class {
    constructor() {
      this.listenerMap = /* @__PURE__ */ new Map();
    }
    activate() {
      this.listenerMap.forEach((listeners, type) => [...listeners].forEach((listener) => window.addEventListener(type, listener)));
      if (!rawAddEventListener || !rawRemoveEventListener) {
        rawAddEventListener = window.addEventListener;
        rawRemoveEventListener = window.removeEventListener;
      }
      window.addEventListener = (type, listener, options) => {
        const listeners = this.listenerMap.get(type) || [];
        this.listenerMap.set(type, [...listeners, listener]);
        return rawAddEventListener.call(window, type, listener, options);
      };
      window.removeEventListener = (type, listener, options) => {
        const storedTypeListeners = this.listenerMap.get(type);
        if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listener) !== -1) {
          storedTypeListeners.splice(storedTypeListeners.indexOf(listener), 1);
        }
        return rawRemoveEventListener.call(window, type, listener, options);
      };
    }
    deactivate() {
      this.listenerMap.forEach((listeners, type) => [...listeners].forEach((listener) => window.removeEventListener(type, listener)));
      window.removeEventListener = rawRemoveEventListener;
      window.addEventListener = rawAddEventListener;
    }
  };

  // ../browser-snapshot/src/patchers/interceptor.ts
  function isStyledComponentsLike2(element) {
    var _a;
    return element instanceof HTMLStyleElement && !element.textContent && ((_a = element.sheet) == null ? void 0 : _a.cssRules.length);
  }
  var Snapshot = class {
    constructor(arrDoms) {
      this.arrDoms = arrDoms;
      this.arrDoms = arrDoms;
    }
    static take(target = document.head) {
      let list;
      if (target.childNodes) {
        list = Array.prototype.slice.call(target.childNodes);
      } else {
        list = Array.prototype.slice.call(target);
      }
      return new Snapshot(list);
    }
    diff(s) {
      if (!s) {
        return {
          created: new Snapshot([]),
          removed: new Snapshot([])
        };
      }
      return {
        created: new Snapshot(this.arrDoms.filter((d) => s.arrDoms.indexOf(d) === -1)),
        removed: new Snapshot(s.arrDoms.filter((d) => this.arrDoms.indexOf(d) === -1))
      };
    }
  };
  var Interceptor = class {
    constructor(dom = document.head) {
      this.dom = dom;
      this.dom = dom;
      this.dynamicStyleSheetElementSet = /* @__PURE__ */ new Set();
      this.styledComponentCSSRulesMap = /* @__PURE__ */ new WeakMap();
    }
    add(createdOrSnapshot, removed) {
      let created;
      if (!removed) {
        const diff = Snapshot.take(this.dom).diff(createdOrSnapshot);
        created = diff.created;
        removed = diff.removed;
      } else {
        created = createdOrSnapshot;
      }
      created.arrDoms.reduce((prev, val) => {
        var _a, _b;
        prev.appendChild(val);
        if (val instanceof HTMLStyleElement) {
          const cssRules = this.styledComponentCSSRulesMap.get(val);
          if (cssRules && cssRules.length) {
            for (let i = 0; i < cssRules.length; i++) {
              const cssRule = cssRules[i];
              (_b = val.sheet) == null ? void 0 : _b.insertRule(cssRule.cssText, (_a = val.sheet) == null ? void 0 : _a.cssRules.length);
            }
          }
        }
        return prev;
      }, this.dom);
      removed.arrDoms.reduce((prev, val) => {
        prev.removeChild(val);
        return prev;
      }, this.dom);
    }
    remove(createdOrSnapshot, removed) {
      let created;
      if (!removed) {
        const diff = Snapshot.take(this.dom).diff(createdOrSnapshot);
        created = diff.created;
        removed = diff.removed;
      } else {
        created = createdOrSnapshot;
      }
      created.arrDoms.reduce((prev, val) => {
        var _a;
        if (val instanceof HTMLStyleElement && isStyledComponentsLike2(val) && ((_a = val == null ? void 0 : val.sheet) == null ? void 0 : _a.cssRules)) {
          this.styledComponentCSSRulesMap.set(val, val.sheet.cssRules);
        }
        prev.removeChild(val);
        return prev;
      }, this.dom);
      removed.arrDoms.reduce((prev, val) => {
        prev.appendChild(val);
        return prev;
      }, this.dom);
    }
  };

  // ../browser-snapshot/src/patchers/style.ts
  var PatchStyle = class {
    constructor() {
      this.headInterceptor = new Interceptor(document.head);
    }
    activate() {
      this.domSnapshotBefore = Snapshot.take();
      if (this.domSnapshotMutated)
        this.headInterceptor.add(this.domSnapshotMutated.created, this.domSnapshotMutated.removed);
    }
    deactivate() {
      const domSnapshot = Snapshot.take();
      this.domSnapshotMutated = domSnapshot.diff(this.domSnapshotBefore);
      if (!this.domSnapshotMutated)
        return;
      this.headInterceptor.remove(this.domSnapshotMutated.created, this.domSnapshotMutated.removed);
    }
    formateCtx(arrDoms) {
      const effectMap = {
        style: [],
        script: [],
        other: []
      };
      arrDoms.forEach((dom) => {
        let type = "other";
        if (/css/.test(dom.type))
          type = "style";
        if (/javascript/.test(dom.type))
          type = "script";
        effectMap[type].push({
          src: dom.src,
          outerHTML: dom.outerHTML,
          content: dom.innerText
        });
      });
      return effectMap;
    }
  };

  // ../browser-snapshot/src/patchers/history.ts
  var rawPushState;
  var rawReplaceState;
  var PatchHistory = class {
    activate() {
      if (!rawPushState || !rawReplaceState) {
        rawPushState = window.history.pushState;
        rawReplaceState = window.history.replaceState;
      }
    }
    deactivate() {
      window.history.pushState = rawPushState;
      window.history.replaceState = rawReplaceState;
    }
  };

  // ../browser-snapshot/src/patchers/interval.ts
  var rawInterval = window.setInterval;
  var rawClearInterval2 = window.clearInterval;
  var PatchInterval = class {
    constructor() {
      this.intervals = [];
    }
    activate() {
      window.setInterval = (handler, timeout, ...args) => {
        const intervalId = rawInterval(handler, timeout, ...args);
        this.intervals = [...this.intervals, intervalId];
        return intervalId;
      };
      window.clearInterval = (intervalId) => {
        this.intervals = this.intervals.filter((id2) => id2 !== intervalId);
        return rawClearInterval2(intervalId);
      };
    }
    deactivate(_clearEffects) {
      if (_clearEffects) {
        this.intervals.forEach((id2) => window.clearInterval(id2));
      }
      window.setInterval = rawInterval;
      window.clearInterval = rawClearInterval2;
    }
  };

  // ../browser-snapshot/src/patchers/variable.ts
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  function hasOwn2(obj, key) {
    return hasOwnProperty2.call(obj, key);
  }
  var PatchGlobalVal = class {
    constructor(targetToProtect = typeof window !== "undefined" ? window : globalThis, protectVariable = []) {
      this.targetToProtect = targetToProtect;
      this.protectVariable = protectVariable;
      this.snapshotOriginal = /* @__PURE__ */ new Map();
      this.snapshotMutated = /* @__PURE__ */ new Map();
      this.whiteList = [
        "location",
        "addEventListener",
        "removeEventListener",
        "webpackJsonp"
      ];
      this.targetToProtect = targetToProtect;
      this.protectVariable = protectVariable;
      this.whiteList = [...this.whiteList, ...protectVariable];
    }
    safeIterator(fn) {
      for (const i in this.targetToProtect) {
        if (this.whiteList.indexOf(i) !== -1) {
          continue;
        }
        const prop = Object.getOwnPropertyDescriptor(this.targetToProtect, i);
        if (!prop || !prop.writable) {
          continue;
        }
        if (hasOwn2(this.targetToProtect, i)) {
          fn(i);
        }
      }
    }
    activate() {
      this.safeIterator((i) => {
        this.snapshotOriginal.set(i, this.targetToProtect[i]);
      });
      this.snapshotMutated.forEach((val, mutateKey) => {
        this.targetToProtect[mutateKey] = this.snapshotMutated.get(mutateKey);
      });
    }
    deactivate() {
      const deleteMap = {};
      const updateMap = {};
      const addMap = {};
      this.safeIterator((normalKey) => {
        if (this.snapshotOriginal.get(normalKey) !== this.targetToProtect[normalKey]) {
          this.snapshotMutated.set(normalKey, this.targetToProtect[normalKey]);
          this.targetToProtect[normalKey] = this.snapshotOriginal.get(normalKey);
          if (this.targetToProtect[normalKey] === void 0) {
            addMap[normalKey] = this.snapshotMutated.get(normalKey);
          } else {
            updateMap[normalKey] = this.snapshotMutated.get(normalKey);
          }
        }
        this.snapshotOriginal.delete(normalKey);
      });
      this.snapshotOriginal.forEach((val, deleteKey) => {
        this.snapshotMutated.set(deleteKey, this.targetToProtect[deleteKey]);
        this.targetToProtect[deleteKey] = this.snapshotOriginal.get(deleteKey);
        deleteMap[deleteKey] = this.targetToProtect[deleteKey];
      });
    }
  };

  // ../browser-snapshot/src/patchers/webpackjsonp.ts
  var PatchWebpackJsonp = class {
    activate() {
      this.preWebpackJsonp = window.webpackJsonp;
      window.webpackJsonp = this.currentWebpackJsonp;
    }
    deactivate() {
      this.currentWebpackJsonp = window.webpackJsonp;
      window.webpackJsonp = this.preWebpackJsonp;
    }
  };

  // ../browser-snapshot/src/sandbox.ts
  var Sandbox2 = class {
    constructor(name, protectVariable = [], targetToProtect = typeof window !== "undefined" ? window : globalThis, isInBrowser = typeof window === "undefined" ? false : true) {
      this.name = name;
      this.protectVariable = protectVariable;
      this.targetToProtect = targetToProtect;
      this.isInBrowser = isInBrowser;
      this.type = "snapshot";
      this.isRunning = false;
      this.patchList = [];
      this.name = name;
      this.isInBrowser = isInBrowser;
      this.patchList.push(new PatchGlobalVal(targetToProtect, protectVariable));
      if (this.isInBrowser) {
        this.patchList = [
          ...this.patchList,
          new PatchStyle(),
          new PatchEvent(),
          new PatchHistory(),
          new PatchInterval(),
          new PatchWebpackJsonp()
        ];
      }
    }
    activate() {
      if (this.isRunning)
        return;
      this.patchList.forEach((patch) => {
        patch.activate();
      });
      this.isRunning = true;
    }
    deactivate(clearEffects = true) {
      if (!this.isRunning)
        return;
      [...this.patchList].reverse().forEach((patch) => {
        patch.deactivate(clearEffects);
      });
      this.isRunning = false;
    }
  };

  // ../browser-snapshot/src/index.ts
  function GarfishBrowserSnapshot(op) {
    return function(Garfish2) {
      const options = {
        openBrowser: false,
        version: "1.12.0",
        name: "browser-snapshot",
        afterLoad(appInfo, appInstance) {
          var _a;
          const config = op || { open: true };
          const sandboxConfig = appInfo.sandbox || ((_a = Garfish2 == null ? void 0 : Garfish2.options) == null ? void 0 : _a.sandbox);
          if (sandboxConfig === false || sandboxConfig.open === false || (sandboxConfig == null ? void 0 : sandboxConfig.snapshot) === false) {
            config.open = false;
          }
          if (sandboxConfig) {
            config.protectVariable = [
              ...(Garfish2 == null ? void 0 : Garfish2.options.protectVariable) || [],
              ...appInfo.protectVariable || []
            ];
          }
          options.openBrowser = !!config.open;
          if (!config.open)
            return;
          if (appInstance) {
            if (appInstance.snapshotSandbox)
              return;
            const sandbox = new Sandbox2(appInfo.name, config.protectVariable);
            appInstance.snapshotSandbox = sandbox;
          }
        },
        beforeMount(appInfo, appInstance) {
          if (!appInstance.snapshotSandbox)
            return;
          appInstance.snapshotSandbox.activate();
        },
        afterUnmount(appInfo, appInstance) {
          if (!appInstance.snapshotSandbox)
            return;
          appInstance.snapshotSandbox.deactivate();
        }
      };
      return options;
    };
  }

  // src/instance.ts
  function createContext() {
    let fresh = false;
    if (inBrowser() && window["__GARFISH__"] && window["Garfish"]) {
      return window["Garfish"];
    }
    const GarfishInstance2 = new Garfish({
      plugins: [GarfishRouter(), GarfishBrowserVm(), GarfishBrowserSnapshot()]
    });
    const set2 = (namespace, val = GarfishInstance2) => {
      if (hasOwn(window, namespace)) {
        if (!(window[namespace] && window[namespace].flag === __GARFISH_FLAG__)) {
          const next = () => {
            fresh = true;
            if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
              warn(`"Window.${namespace}" will be overwritten by "garfish".`);
            }
          };
          const desc = Object.getOwnPropertyDescriptor(window, namespace);
          if (desc) {
            if (desc.configurable) {
              def(window, namespace, val);
              next();
            } else if (desc.writable) {
              window[namespace] = val;
              next();
            }
          }
        }
      } else {
        fresh = true;
        def(window, namespace, val);
      }
    };
    if (inBrowser()) {
      set2("Garfish");
      def(window, "__GARFISH__", true);
    }
    if (fresh) {
      if (typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) {
        if (window["Garfish"].version !== "1.12.0") {
          warn('The "garfish version" used by the main and sub-applications is inconsistent.');
        }
      }
    }
    return GarfishInstance2;
  }
  var GarfishInstance = createContext();

  // src/customElement.ts
  function generateCustomerElement(htmlTag, options) {
    class MicroApp extends HTMLElement {
      constructor() {
        super();
        this.appInfo = {
          name: "",
          entry: "",
          basename: ""
        };
        this.options = {
          delay: 200
        };
        this.state = this._observerAppState({
          isLoading: false,
          error: null,
          promise: null,
          loaded: null,
          pastDelay: false
        });
        this.options = options;
      }
      _observerAppState(state) {
        return new Proxy(state, {
          set: (target, p, value, receiver) => {
            const getPlaceHolderAndAppend = () => {
              if (this.placeholder && this.contains(this.placeholder)) {
                this.removeChild(this.placeholder);
              }
              const placeholder = this.options.loading && this.options.loading({
                isLoading: this.state.isLoading,
                error: this.state.error,
                pastDelay: this.state.pastDelay
              });
              placeholder && this.appendChild(placeholder);
              return placeholder;
            };
            const res = Reflect.set(target, p, value, receiver);
            if (p === "error" && value) {
              const placeholder = getPlaceHolderAndAppend();
              if (placeholder)
                this.placeholder = placeholder;
            } else if (p === "pastDelay" && value === true) {
              const placeholder = getPlaceHolderAndAppend();
              if (placeholder)
                this.placeholder = placeholder;
            } else if (p === "isLoading" && value === true) {
              const placeholder = getPlaceHolderAndAppend();
              if (placeholder)
                this.placeholder = placeholder;
            } else if (p === "isLoading" && value === false) {
              if (!this.state.error && this.contains(this.placeholder)) {
                this.removeChild(this.placeholder);
              }
            }
            return res;
          }
        });
      }
      _loadApp() {
        if (this.state.isLoading)
          return;
        this.state.isLoading = true;
        if (typeof this.options.delay === "number") {
          if (this.options.delay === 0) {
            this.state.pastDelay = true;
          } else {
            this._delay = setTimeout(() => {
              this.state.pastDelay = true;
            }, this.options.delay);
          }
        }
        this.state.promise = GarfishInstance.loadApp(this.appInfo.name, {
          entry: this.appInfo.entry,
          domGetter: () => this,
          basename: this.appInfo.basename,
          sandbox: {
            snapshot: false,
            strictIsolation: this.hasAttribute("shadow") || false
          }
        });
      }
      _clearTimeouts() {
        clearTimeout(this._delay);
      }
      async connectedCallback() {
        this.appInfo = {
          name: this.getAttribute("name") || "",
          entry: this.getAttribute("entry") || "",
          basename: this.getAttribute("basename") || "/"
        };
        try {
          this._loadApp();
          this.state.loaded = await this.state.promise;
          if (this.state.loaded.mounted) {
            this.state.loaded.show();
          } else {
            await this.state.loaded.mount();
          }
        } catch (error2) {
          this.state.error = error2;
        } finally {
          this.state.isLoading = false;
        }
      }
      disconnectedCallback() {
        this._clearTimeouts();
        if (this.state.loaded) {
          this.state.loaded.hide();
        }
      }
      async adoptedCallback() {
      }
      attributeChangedCallback(name, oldValue, newValue) {
        console.log("Custom square element attributes changed.", name, oldValue, newValue);
      }
    }
    if (!customElements.get(htmlTag)) {
      GarfishInstance.run(options.config || {});
      customElements.define(htmlTag, MicroApp);
    }
  }
  function createLoadableWebComponent(htmlTag, options) {
    if (typeof htmlTag !== "string") {
      throw new Error("garfish requires a `htmlTag` name");
    }
    if (!options.loading) {
      throw new Error("garfish requires a `loading` component");
    }
    const opts = Object.assign({
      loading: false,
      delay: 200,
      timeout: null
    }, options);
    return generateCustomerElement(htmlTag, opts);
  }
  function defineCustomElements(htmlTag, options) {
    return createLoadableWebComponent(htmlTag, options);
  }
})();
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21zQDIuMS4yL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGVidWdANC4zLjQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9jb21tb24uanMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RlYnVnQDQuMy40L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vaGFzLWZsYWdAMy4wLjAvbm9kZV9tb2R1bGVzL2hhcy1mbGFnL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdXBwb3J0cy1jb2xvckA1LjUuMC9ub2RlX21vZHVsZXMvc3VwcG9ydHMtY29sb3IvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RlYnVnQDQuMy40L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvbm9kZS5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGVidWdANC4zLjQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZXZlbnRlbWl0dGVyMkA2LjQuNy9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMi9saWIvZXZlbnRlbWl0dGVyMi5qcyIsICIuLi8uLi8uLi91dGlscy9zcmMvdXRpbHMudHMiLCAiLi4vLi4vLi4vdXRpbHMvc3JjL3F1ZXVlLnRzIiwgIi4uLy4uLy4uL3V0aWxzL3NyYy9zZW50cnkudHMiLCAiLi4vLi4vLi4vdXRpbHMvc3JjL2RvbUFwaXMudHMiLCAiLi4vLi4vLi4vdXRpbHMvc3JjL2dhcmZpc2gudHMiLCAiLi4vLi4vLi4vdXRpbHMvc3JjL21pbWVUeXBlLnRzIiwgIi4uLy4uLy4uL3V0aWxzL3NyYy9kaXNwYXRjaEV2ZW50cy50cyIsICIuLi8uLi8uLi91dGlscy9zcmMvY29udGFpbmVyLnRzIiwgIi4uLy4uLy4uL3V0aWxzL3NyYy90ZW1wbGF0ZVBhcnNlLnRzIiwgIi4uLy4uLy4uL3V0aWxzL3NyYy9sb2dnZXIudHMiLCAiLi4vLi4vLi4vdXRpbHMvc3JjL2xvY2sudHMiLCAiLi4vLi4vLi4vaG9va3Mvc3JjL3N5bmNIb29rLnRzIiwgIi4uLy4uLy4uL2hvb2tzL3NyYy9hc3luY0hvb2sudHMiLCAiLi4vLi4vLi4vaG9va3Mvc3JjL3N5bmNXYXRlcmZhbGxIb29rLnRzIiwgIi4uLy4uLy4uL2hvb2tzL3NyYy9hc3luY1dhdGVyZmFsbEhvb2tzLnRzIiwgIi4uLy4uLy4uL2hvb2tzL3NyYy9wbHVnaW5TeXN0ZW0udHMiLCAiLi4vLi4vLi4vbG9hZGVyL3NyYy9tYW5hZ2Vycy9zdHlsZS50cyIsICIuLi8uLi8uLi9sb2FkZXIvc3JjL21hbmFnZXJzL21vZHVsZS50cyIsICIuLi8uLi8uLi9sb2FkZXIvc3JjL21hbmFnZXJzL3RlbXBsYXRlLnRzIiwgIi4uLy4uLy4uL2xvYWRlci9zcmMvbWFuYWdlcnMvamF2YXNjcmlwdC50cyIsICIuLi8uLi8uLi9sb2FkZXIvc3JjL3V0aWxzLnRzIiwgIi4uLy4uLy4uL2xvYWRlci9zcmMvYXBwQ2FjaGUudHMiLCAiLi4vLi4vLi4vbG9hZGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9nYXJmaXNoLnRzIiwgIi4uLy4uLy4uL2NvcmUvc3JjL2NvbmZpZy50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9saWZlY3ljbGUudHMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2VzLW1vZHVsZS1sZXhlckAwLjEwLjUvbm9kZV9tb2R1bGVzL2VzLW1vZHVsZS1sZXhlci9kaXN0L2xleGVyLmpzIiwgIi4uLy4uLy4uL2NvcmUvc3JjL21vZHVsZS9lc01vZHVsZS50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9tb2R1bGUvYXBwLnRzIiwgIi4uLy4uLy4uL2NvcmUvc3JjL21vZHVsZS9yZXNvdXJjZS50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9wbHVnaW5zL2ZpeEhNUi50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9wbHVnaW5zL2xpZmVjeWNsZS50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9wbHVnaW5zL3ByZWxvYWQudHMiLCAiLi4vLi4vLi4vY29yZS9zcmMvcGx1Z2lucy9wZXJmb3JtYW5jZS9zdWJBcHBPYnNlcnZlci50cyIsICIuLi8uLi8uLi9jb3JlL3NyYy9wbHVnaW5zL3BlcmZvcm1hbmNlL2luZGV4LnRzIiwgIi4uLy4uLy4uL2NvcmUvc3JjL3BsdWdpbnMvbG9nZ2VyLnRzIiwgIi4uLy4uLy4uL3JvdXRlci9zcmMvY29uZmlnLnRzIiwgIi4uLy4uLy4uL3JvdXRlci9zcmMvdXRpbHMvdXJsVXQudHMiLCAiLi4vLi4vLi4vcm91dGVyL3NyYy91dGlscy9pbmRleC50cyIsICIuLi8uLi8uLi9yb3V0ZXIvc3JjL3V0aWxzL2N1c3RvbUV2ZW50LnRzIiwgIi4uLy4uLy4uL3JvdXRlci9zcmMvdXRpbHMvbmF2RXZlbnQudHMiLCAiLi4vLi4vLi4vcm91dGVyL3NyYy9saW5rVG8udHMiLCAiLi4vLi4vLi4vcm91dGVyL3NyYy9hZ2VudFJvdXRlci50cyIsICIuLi8uLi8uLi9yb3V0ZXIvc3JjL2NvbnRleHQudHMiLCAiLi4vLi4vLi4vcm91dGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9zeW1ib2xUeXBlcy50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy91dGlscy50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9wcm94eUludGVyY2VwdG9yL3NoYXJlZC50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9tb2R1bGVzL2hpc3RvcnkudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci12bS9zcmMvbW9kdWxlcy9uZXR3b3JrLnRzIiwgIi4uLy4uLy4uL2Jyb3dzZXItdm0vc3JjL3Byb3h5SW50ZXJjZXB0b3IvZG9jdW1lbnQudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci12bS9zcmMvbW9kdWxlcy9kb2N1bWVudC50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9tb2R1bGVzL3VpRXZlbnQudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci12bS9zcmMvbW9kdWxlcy9zdG9yYWdlLnRzIiwgIi4uLy4uLy4uL2Jyb3dzZXItdm0vc3JjL21vZHVsZXMvZXZlbnRMaXN0ZW5lci50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9tb2R1bGVzL211dGF0aW9uT2JzZXJ2ZXIudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci12bS9zcmMvbW9kdWxlcy90aW1lci50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9keW5hbWljTm9kZS9wcm9jZXNzUGFyYW1zLnRzIiwgIi4uLy4uLy4uL2Jyb3dzZXItdm0vc3JjL2R5bmFtaWNOb2RlL3Byb2Nlc3Nvci50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9keW5hbWljTm9kZS9pbmRleC50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9saWZlY3ljbGUudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci12bS9zcmMvcHJveHlJbnRlcmNlcHRvci9nbG9iYWwudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci12bS9zcmMvc2FuZGJveC50cyIsICIuLi8uLi8uLi9icm93c2VyLXZtL3NyYy9wbHVnaW5pZnkudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci1zbmFwc2hvdC9zcmMvcGF0Y2hlcnMvZXZlbnQudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci1zbmFwc2hvdC9zcmMvcGF0Y2hlcnMvaW50ZXJjZXB0b3IudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci1zbmFwc2hvdC9zcmMvcGF0Y2hlcnMvc3R5bGUudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci1zbmFwc2hvdC9zcmMvcGF0Y2hlcnMvaGlzdG9yeS50cyIsICIuLi8uLi8uLi9icm93c2VyLXNuYXBzaG90L3NyYy9wYXRjaGVycy9pbnRlcnZhbC50cyIsICIuLi8uLi8uLi9icm93c2VyLXNuYXBzaG90L3NyYy9wYXRjaGVycy92YXJpYWJsZS50cyIsICIuLi8uLi8uLi9icm93c2VyLXNuYXBzaG90L3NyYy9wYXRjaGVycy93ZWJwYWNranNvbnAudHMiLCAiLi4vLi4vLi4vYnJvd3Nlci1zbmFwc2hvdC9zcmMvc2FuZGJveC50cyIsICIuLi8uLi8uLi9icm93c2VyLXNuYXBzaG90L3NyYy9pbmRleC50cyIsICIuLi8uLi9zcmMvaW5zdGFuY2UudHMiLCAiLi4vLi4vc3JjL2N1c3RvbUVsZW1lbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwgIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblx0Y3JlYXRlRGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cblx0T2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y3JlYXRlRGVidWdba2V5XSA9IGVudltrZXldO1xuXHR9KTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZGVidWcgaW5zdGFuY2UgdG8gYmUgY29sb3JlZFxuXHQqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IEFuIEFOU0kgY29sb3IgY29kZSBmb3IgdGhlIGdpdmVuIG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcblx0XHRsZXQgaGFzaCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzcGFjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVEZWJ1Zy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBjcmVhdGVEZWJ1Zy5jb2xvcnMubGVuZ3RoXTtcblx0fVxuXHRjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvciA9IHNlbGVjdENvbG9yO1xuXG5cdC8qKlxuXHQqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXHRcdGxldCBwcmV2VGltZTtcblx0XHRsZXQgZW5hYmxlT3ZlcnJpZGUgPSBudWxsO1xuXHRcdGxldCBuYW1lc3BhY2VzQ2FjaGU7XG5cdFx0bGV0IGVuYWJsZWRDYWNoZTtcblxuXHRcdGZ1bmN0aW9uIGRlYnVnKC4uLmFyZ3MpIHtcblx0XHRcdC8vIERpc2FibGVkP1xuXHRcdFx0aWYgKCFkZWJ1Zy5lbmFibGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc2VsZiA9IGRlYnVnO1xuXG5cdFx0XHQvLyBTZXQgYGRpZmZgIHRpbWVzdGFtcFxuXHRcdFx0Y29uc3QgY3VyciA9IE51bWJlcihuZXcgRGF0ZSgpKTtcblx0XHRcdGNvbnN0IG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcblx0XHRcdHNlbGYuZGlmZiA9IG1zO1xuXHRcdFx0c2VsZi5wcmV2ID0gcHJldlRpbWU7XG5cdFx0XHRzZWxmLmN1cnIgPSBjdXJyO1xuXHRcdFx0cHJldlRpbWUgPSBjdXJyO1xuXG5cdFx0XHRhcmdzWzBdID0gY3JlYXRlRGVidWcuY29lcmNlKGFyZ3NbMF0pO1xuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdC8vIEFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG5cdFx0XHRcdGFyZ3MudW5zaGlmdCgnJU8nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgKG1hdGNoLCBmb3JtYXQpID0+IHtcblx0XHRcdFx0Ly8gSWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuXHRcdFx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdFx0XHRyZXR1cm4gJyUnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdGNvbnN0IGZvcm1hdHRlciA9IGNyZWF0ZURlYnVnLmZvcm1hdHRlcnNbZm9ybWF0XTtcblx0XHRcdFx0aWYgKHR5cGVvZiBmb3JtYXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBhcmdzW2luZGV4XTtcblx0XHRcdFx0XHRtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cblx0XHRcdFx0XHQvLyBOb3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG5cdFx0XHRcdFx0YXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdGluZGV4LS07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG5cdFx0XHRjcmVhdGVEZWJ1Zy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cblx0XHRcdGNvbnN0IGxvZ0ZuID0gc2VsZi5sb2cgfHwgY3JlYXRlRGVidWcubG9nO1xuXHRcdFx0bG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cdFx0fVxuXG5cdFx0ZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXHRcdGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuXHRcdGRlYnVnLmNvbG9yID0gY3JlYXRlRGVidWcuc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7XG5cdFx0ZGVidWcuZGVzdHJveSA9IGNyZWF0ZURlYnVnLmRlc3Ryb3k7IC8vIFhYWCBUZW1wb3JhcnkuIFdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRlYnVnLCAnZW5hYmxlZCcsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiAoKSA9PiB7XG5cdFx0XHRcdGlmIChlbmFibGVPdmVycmlkZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBlbmFibGVPdmVycmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmFtZXNwYWNlc0NhY2hlICE9PSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzKSB7XG5cdFx0XHRcdFx0bmFtZXNwYWNlc0NhY2hlID0gY3JlYXRlRGVidWcubmFtZXNwYWNlcztcblx0XHRcdFx0XHRlbmFibGVkQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKG5hbWVzcGFjZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZW5hYmxlZENhY2hlO1xuXHRcdFx0fSxcblx0XHRcdHNldDogdiA9PiB7XG5cdFx0XHRcdGVuYWJsZU92ZXJyaWRlID0gdjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG5cdFx0aWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVidWc7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblx0XHRjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzID0gbmFtZXNwYWNlcztcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGxldCBpO1xuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcblx0XHRjb25zdCBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmICghc3BsaXRbaV0pIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3Ncblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG5cdFx0XHRpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnNsaWNlKDEpICsgJyQnKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuXHQqXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZGlzYWJsZSgpIHtcblx0XHRjb25zdCBuYW1lc3BhY2VzID0gW1xuXHRcdFx0Li4uY3JlYXRlRGVidWcubmFtZXMubWFwKHRvTmFtZXNwYWNlKSxcblx0XHRcdC4uLmNyZWF0ZURlYnVnLnNraXBzLm1hcCh0b05hbWVzcGFjZSkubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGxldCBpO1xuXHRcdGxldCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcubmFtZXNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0KiBDb252ZXJ0IHJlZ2V4cCB0byBuYW1lc3BhY2Vcblx0KlxuXHQqIEBwYXJhbSB7UmVnRXhwfSByZWd4ZXBcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiB0b05hbWVzcGFjZShyZWdleHApIHtcblx0XHRyZXR1cm4gcmVnZXhwLnRvU3RyaW5nKClcblx0XHRcdC5zdWJzdHJpbmcoMiwgcmVnZXhwLnRvU3RyaW5nKCkubGVuZ3RoIC0gMilcblx0XHRcdC5yZXBsYWNlKC9cXC5cXCpcXD8kLywgJyonKTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCAiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuXHRcdC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRhcmdzWzBdID0gKHRoaXMudXNlQ29sb3JzID8gJyVjJyA6ICcnKSArXG5cdFx0dGhpcy5uYW1lc3BhY2UgK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArXG5cdFx0YXJnc1swXSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICtcblx0XHQnKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG5cdGlmICghdGhpcy51c2VDb2xvcnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcblx0YXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0Jyk7XG5cblx0Ly8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcblx0Ly8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuXHQvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGxhc3RDID0gMDtcblx0YXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIG1hdGNoID0+IHtcblx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aW5kZXgrKztcblx0XHRpZiAobWF0Y2ggPT09ICclYycpIHtcblx0XHRcdC8vIFdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuXHRcdFx0Ly8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcblx0XHRcdGxhc3RDID0gaW5kZXg7XG5cdFx0fVxuXHR9KTtcblxuXHRhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5kZWJ1ZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqIElmIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYXZhaWxhYmxlLCBmYWxscyBiYWNrXG4gKiB0byBgY29uc29sZS5sb2dgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMubG9nID0gY29uc29sZS5kZWJ1ZyB8fCBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pO1xuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdHRyeSB7XG5cdFx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5zZXRJdGVtKCdkZWJ1ZycsIG5hbWVzcGFjZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxvYWQoKSB7XG5cdGxldCByO1xuXHR0cnkge1xuXHRcdHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChmbGFnLCBhcmd2KSA9PiB7XG5cdGFyZ3YgPSBhcmd2IHx8IHByb2Nlc3MuYXJndjtcblx0Y29uc3QgcHJlZml4ID0gZmxhZy5zdGFydHNXaXRoKCctJykgPyAnJyA6IChmbGFnLmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLScpO1xuXHRjb25zdCBwb3MgPSBhcmd2LmluZGV4T2YocHJlZml4ICsgZmxhZyk7XG5cdGNvbnN0IHRlcm1pbmF0b3JQb3MgPSBhcmd2LmluZGV4T2YoJy0tJyk7XG5cdHJldHVybiBwb3MgIT09IC0xICYmICh0ZXJtaW5hdG9yUG9zID09PSAtMSA/IHRydWUgOiBwb3MgPCB0ZXJtaW5hdG9yUG9zKTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgaGFzRmxhZyA9IHJlcXVpcmUoJ2hhcy1mbGFnJyk7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5sZXQgZm9yY2VDb2xvcjtcbmlmIChoYXNGbGFnKCduby1jb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ25vLWNvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWZhbHNlJykpIHtcblx0Zm9yY2VDb2xvciA9IGZhbHNlO1xufSBlbHNlIGlmIChoYXNGbGFnKCdjb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPXRydWUnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj1hbHdheXMnKSkge1xuXHRmb3JjZUNvbG9yID0gdHJ1ZTtcbn1cbmlmICgnRk9SQ0VfQ09MT1InIGluIGVudikge1xuXHRmb3JjZUNvbG9yID0gZW52LkZPUkNFX0NPTE9SLmxlbmd0aCA9PT0gMCB8fCBwYXJzZUludChlbnYuRk9SQ0VfQ09MT1IsIDEwKSAhPT0gMDtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpIHtcblx0aWYgKGxldmVsID09PSAwKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsZXZlbCxcblx0XHRoYXNCYXNpYzogdHJ1ZSxcblx0XHRoYXMyNTY6IGxldmVsID49IDIsXG5cdFx0aGFzMTZtOiBsZXZlbCA+PSAzXG5cdH07XG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ29sb3Ioc3RyZWFtKSB7XG5cdGlmIChmb3JjZUNvbG9yID09PSBmYWxzZSkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0aWYgKGhhc0ZsYWcoJ2NvbG9yPTE2bScpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9ZnVsbCcpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9dHJ1ZWNvbG9yJykpIHtcblx0XHRyZXR1cm4gMztcblx0fVxuXG5cdGlmIChoYXNGbGFnKCdjb2xvcj0yNTYnKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKHN0cmVhbSAmJiAhc3RyZWFtLmlzVFRZICYmIGZvcmNlQ29sb3IgIT09IHRydWUpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGNvbnN0IG1pbiA9IGZvcmNlQ29sb3IgPyAxIDogMDtcblxuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdC8vIE5vZGUuanMgNy41LjAgaXMgdGhlIGZpcnN0IHZlcnNpb24gb2YgTm9kZS5qcyB0byBpbmNsdWRlIGEgcGF0Y2ggdG9cblx0XHQvLyBsaWJ1diB0aGF0IGVuYWJsZXMgMjU2IGNvbG9yIG91dHB1dCBvbiBXaW5kb3dzLiBBbnl0aGluZyBlYXJsaWVyIGFuZCBpdFxuXHRcdC8vIHdvbid0IHdvcmsuIEhvd2V2ZXIsIGhlcmUgd2UgdGFyZ2V0IE5vZGUuanMgOCBhdCBtaW5pbXVtIGFzIGl0IGlzIGFuIExUU1xuXHRcdC8vIHJlbGVhc2UsIGFuZCBOb2RlLmpzIDcgaXMgbm90LiBXaW5kb3dzIDEwIGJ1aWxkIDEwNTg2IGlzIHRoZSBmaXJzdCBXaW5kb3dzXG5cdFx0Ly8gcmVsZWFzZSB0aGF0IHN1cHBvcnRzIDI1NiBjb2xvcnMuIFdpbmRvd3MgMTAgYnVpbGQgMTQ5MzEgaXMgdGhlIGZpcnN0IHJlbGVhc2Vcblx0XHQvLyB0aGF0IHN1cHBvcnRzIDE2bS9UcnVlQ29sb3IuXG5cdFx0Y29uc3Qgb3NSZWxlYXNlID0gb3MucmVsZWFzZSgpLnNwbGl0KCcuJyk7XG5cdFx0aWYgKFxuXHRcdFx0TnVtYmVyKHByb2Nlc3MudmVyc2lvbnMubm9kZS5zcGxpdCgnLicpWzBdKSA+PSA4ICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzBdKSA+PSAxMCAmJlxuXHRcdFx0TnVtYmVyKG9zUmVsZWFzZVsyXSkgPj0gMTA1ODZcblx0XHQpIHtcblx0XHRcdHJldHVybiBOdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxNDkzMSA/IDMgOiAyO1xuXHRcdH1cblxuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0aWYgKCdDSScgaW4gZW52KSB7XG5cdFx0aWYgKFsnVFJBVklTJywgJ0NJUkNMRUNJJywgJ0FQUFZFWU9SJywgJ0dJVExBQl9DSSddLnNvbWUoc2lnbiA9PiBzaWduIGluIGVudikgfHwgZW52LkNJX05BTUUgPT09ICdjb2Rlc2hpcCcpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRpZiAoJ1RFQU1DSVRZX1ZFUlNJT04nIGluIGVudikge1xuXHRcdHJldHVybiAvXig5XFwuKDAqWzEtOV1cXGQqKVxcLnxcXGR7Mix9XFwuKS8udGVzdChlbnYuVEVBTUNJVFlfVkVSU0lPTikgPyAxIDogMDtcblx0fVxuXG5cdGlmIChlbnYuQ09MT1JURVJNID09PSAndHJ1ZWNvbG9yJykge1xuXHRcdHJldHVybiAzO1xuXHR9XG5cblx0aWYgKCdURVJNX1BST0dSQU0nIGluIGVudikge1xuXHRcdGNvbnN0IHZlcnNpb24gPSBwYXJzZUludCgoZW52LlRFUk1fUFJPR1JBTV9WRVJTSU9OIHx8ICcnKS5zcGxpdCgnLicpWzBdLCAxMCk7XG5cblx0XHRzd2l0Y2ggKGVudi5URVJNX1BST0dSQU0pIHtcblx0XHRcdGNhc2UgJ2lUZXJtLmFwcCc6XG5cdFx0XHRcdHJldHVybiB2ZXJzaW9uID49IDMgPyAzIDogMjtcblx0XHRcdGNhc2UgJ0FwcGxlX1Rlcm1pbmFsJzpcblx0XHRcdFx0cmV0dXJuIDI7XG5cdFx0XHQvLyBObyBkZWZhdWx0XG5cdFx0fVxuXHR9XG5cblx0aWYgKC8tMjU2KGNvbG9yKT8kL2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMjtcblx0fVxuXG5cdGlmICgvXnNjcmVlbnxeeHRlcm18XnZ0MTAwfF52dDIyMHxecnh2dHxjb2xvcnxhbnNpfGN5Z3dpbnxsaW51eC9pLnRlc3QoZW52LlRFUk0pKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NPTE9SVEVSTScgaW4gZW52KSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoZW52LlRFUk0gPT09ICdkdW1iJykge1xuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRyZXR1cm4gbWluO1xufVxuXG5mdW5jdGlvbiBnZXRTdXBwb3J0TGV2ZWwoc3RyZWFtKSB7XG5cdGNvbnN0IGxldmVsID0gc3VwcG9ydHNDb2xvcihzdHJlYW0pO1xuXHRyZXR1cm4gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c3VwcG9ydHNDb2xvcjogZ2V0U3VwcG9ydExldmVsLFxuXHRzdGRvdXQ6IGdldFN1cHBvcnRMZXZlbChwcm9jZXNzLnN0ZG91dCksXG5cdHN0ZGVycjogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3RkZXJyKVxufTtcbiIsICIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdHR5ID0gcmVxdWlyZSgndHR5Jyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIE5vZGUuanMgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5kZXN0cm95ID0gdXRpbC5kZXByZWNhdGUoXG5cdCgpID0+IHt9LFxuXHQnSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLidcbik7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gWzYsIDIsIDMsIDQsIDUsIDFdO1xuXG50cnkge1xuXHQvLyBPcHRpb25hbCBkZXBlbmRlbmN5IChhcyBpbiwgZG9lc24ndCBuZWVkIHRvIGJlIGluc3RhbGxlZCwgTk9UIGxpa2Ugb3B0aW9uYWxEZXBlbmRlbmNpZXMgaW4gcGFja2FnZS5qc29uKVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5cdGNvbnN0IHN1cHBvcnRzQ29sb3IgPSByZXF1aXJlKCdzdXBwb3J0cy1jb2xvcicpO1xuXG5cdGlmIChzdXBwb3J0c0NvbG9yICYmIChzdXBwb3J0c0NvbG9yLnN0ZGVyciB8fCBzdXBwb3J0c0NvbG9yKS5sZXZlbCA+PSAyKSB7XG5cdFx0ZXhwb3J0cy5jb2xvcnMgPSBbXG5cdFx0XHQyMCxcblx0XHRcdDIxLFxuXHRcdFx0MjYsXG5cdFx0XHQyNyxcblx0XHRcdDMyLFxuXHRcdFx0MzMsXG5cdFx0XHQzOCxcblx0XHRcdDM5LFxuXHRcdFx0NDAsXG5cdFx0XHQ0MSxcblx0XHRcdDQyLFxuXHRcdFx0NDMsXG5cdFx0XHQ0NCxcblx0XHRcdDQ1LFxuXHRcdFx0NTYsXG5cdFx0XHQ1Nyxcblx0XHRcdDYyLFxuXHRcdFx0NjMsXG5cdFx0XHQ2OCxcblx0XHRcdDY5LFxuXHRcdFx0NzQsXG5cdFx0XHQ3NSxcblx0XHRcdDc2LFxuXHRcdFx0NzcsXG5cdFx0XHQ3OCxcblx0XHRcdDc5LFxuXHRcdFx0ODAsXG5cdFx0XHQ4MSxcblx0XHRcdDkyLFxuXHRcdFx0OTMsXG5cdFx0XHQ5OCxcblx0XHRcdDk5LFxuXHRcdFx0MTEyLFxuXHRcdFx0MTEzLFxuXHRcdFx0MTI4LFxuXHRcdFx0MTI5LFxuXHRcdFx0MTM0LFxuXHRcdFx0MTM1LFxuXHRcdFx0MTQ4LFxuXHRcdFx0MTQ5LFxuXHRcdFx0MTYwLFxuXHRcdFx0MTYxLFxuXHRcdFx0MTYyLFxuXHRcdFx0MTYzLFxuXHRcdFx0MTY0LFxuXHRcdFx0MTY1LFxuXHRcdFx0MTY2LFxuXHRcdFx0MTY3LFxuXHRcdFx0MTY4LFxuXHRcdFx0MTY5LFxuXHRcdFx0MTcwLFxuXHRcdFx0MTcxLFxuXHRcdFx0MTcyLFxuXHRcdFx0MTczLFxuXHRcdFx0MTc4LFxuXHRcdFx0MTc5LFxuXHRcdFx0MTg0LFxuXHRcdFx0MTg1LFxuXHRcdFx0MTk2LFxuXHRcdFx0MTk3LFxuXHRcdFx0MTk4LFxuXHRcdFx0MTk5LFxuXHRcdFx0MjAwLFxuXHRcdFx0MjAxLFxuXHRcdFx0MjAyLFxuXHRcdFx0MjAzLFxuXHRcdFx0MjA0LFxuXHRcdFx0MjA1LFxuXHRcdFx0MjA2LFxuXHRcdFx0MjA3LFxuXHRcdFx0MjA4LFxuXHRcdFx0MjA5LFxuXHRcdFx0MjE0LFxuXHRcdFx0MjE1LFxuXHRcdFx0MjIwLFxuXHRcdFx0MjIxXG5cdFx0XTtcblx0fVxufSBjYXRjaCAoZXJyb3IpIHtcblx0Ly8gU3dhbGxvdyAtIHdlIG9ubHkgY2FyZSBpZiBgc3VwcG9ydHMtY29sb3JgIGlzIGF2YWlsYWJsZTsgaXQgZG9lc24ndCBoYXZlIHRvIGJlLlxufVxuXG4vKipcbiAqIEJ1aWxkIHVwIHRoZSBkZWZhdWx0IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGZyb20gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqXG4gKiAgICQgREVCVUdfQ09MT1JTPW5vIERFQlVHX0RFUFRIPTEwIERFQlVHX1NIT1dfSElEREVOPWVuYWJsZWQgbm9kZSBzY3JpcHQuanNcbiAqL1xuXG5leHBvcnRzLmluc3BlY3RPcHRzID0gT2JqZWN0LmtleXMocHJvY2Vzcy5lbnYpLmZpbHRlcihrZXkgPT4ge1xuXHRyZXR1cm4gL15kZWJ1Z18vaS50ZXN0KGtleSk7XG59KS5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG5cdC8vIENhbWVsLWNhc2Vcblx0Y29uc3QgcHJvcCA9IGtleVxuXHRcdC5zdWJzdHJpbmcoNilcblx0XHQudG9Mb3dlckNhc2UoKVxuXHRcdC5yZXBsYWNlKC9fKFthLXpdKS9nLCAoXywgaykgPT4ge1xuXHRcdFx0cmV0dXJuIGsudG9VcHBlckNhc2UoKTtcblx0XHR9KTtcblxuXHQvLyBDb2VyY2Ugc3RyaW5nIHZhbHVlIGludG8gSlMgdmFsdWVcblx0bGV0IHZhbCA9IHByb2Nlc3MuZW52W2tleV07XG5cdGlmICgvXih5ZXN8b258dHJ1ZXxlbmFibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSB0cnVlO1xuXHR9IGVsc2UgaWYgKC9eKG5vfG9mZnxmYWxzZXxkaXNhYmxlZCkkL2kudGVzdCh2YWwpKSB7XG5cdFx0dmFsID0gZmFsc2U7XG5cdH0gZWxzZSBpZiAodmFsID09PSAnbnVsbCcpIHtcblx0XHR2YWwgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdHZhbCA9IE51bWJlcih2YWwpO1xuXHR9XG5cblx0b2JqW3Byb3BdID0gdmFsO1xuXHRyZXR1cm4gb2JqO1xufSwge30pO1xuXG4vKipcbiAqIElzIHN0ZG91dCBhIFRUWT8gQ29sb3JlZCBvdXRwdXQgaXMgZW5hYmxlZCB3aGVuIGB0cnVlYC5cbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG5cdHJldHVybiAnY29sb3JzJyBpbiBleHBvcnRzLmluc3BlY3RPcHRzID9cblx0XHRCb29sZWFuKGV4cG9ydHMuaW5zcGVjdE9wdHMuY29sb3JzKSA6XG5cdFx0dHR5LmlzYXR0eShwcm9jZXNzLnN0ZGVyci5mZCk7XG59XG5cbi8qKlxuICogQWRkcyBBTlNJIGNvbG9yIGVzY2FwZSBjb2RlcyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG5cdGNvbnN0IHtuYW1lc3BhY2U6IG5hbWUsIHVzZUNvbG9yc30gPSB0aGlzO1xuXG5cdGlmICh1c2VDb2xvcnMpIHtcblx0XHRjb25zdCBjID0gdGhpcy5jb2xvcjtcblx0XHRjb25zdCBjb2xvckNvZGUgPSAnXFx1MDAxQlszJyArIChjIDwgOCA/IGMgOiAnODs1OycgKyBjKTtcblx0XHRjb25zdCBwcmVmaXggPSBgICAke2NvbG9yQ29kZX07MW0ke25hbWV9IFxcdTAwMUJbMG1gO1xuXG5cdFx0YXJnc1swXSA9IHByZWZpeCArIGFyZ3NbMF0uc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbicgKyBwcmVmaXgpO1xuXHRcdGFyZ3MucHVzaChjb2xvckNvZGUgKyAnbSsnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKSArICdcXHUwMDFCWzBtJyk7XG5cdH0gZWxzZSB7XG5cdFx0YXJnc1swXSA9IGdldERhdGUoKSArIG5hbWUgKyAnICcgKyBhcmdzWzBdO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldERhdGUoKSB7XG5cdGlmIChleHBvcnRzLmluc3BlY3RPcHRzLmhpZGVEYXRlKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cdHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyAnICc7XG59XG5cbi8qKlxuICogSW52b2tlcyBgdXRpbC5mb3JtYXQoKWAgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cyBhbmQgd3JpdGVzIHRvIHN0ZGVyci5cbiAqL1xuXG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuXHRyZXR1cm4gcHJvY2Vzcy5zdGRlcnIud3JpdGUodXRpbC5mb3JtYXQoLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcblx0XHQuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJU8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmZvcm1hdHRlcnMuTyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuIiwgIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIC8gbndqcyBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgcHJvY2Vzcy5icm93c2VyID09PSB0cnVlIHx8IHByb2Nlc3MuX19ud2pzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwgIi8qIVxuICogRXZlbnRFbWl0dGVyMlxuICogaHR0cHM6Ly9naXRodWIuY29tL2hpajFueC9FdmVudEVtaXR0ZXIyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIGhpajFueFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG47IWZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuICB2YXIgaGFzT3duUHJvcGVydHk9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5ID8gQXJyYXkuaXNBcnJheSA6IGZ1bmN0aW9uIF9pc0FycmF5KG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9O1xuICB2YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuICB2YXIgbmV4dFRpY2tTdXBwb3J0ZWQ9IHR5cGVvZiBwcm9jZXNzPT0nb2JqZWN0JyAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljaz09J2Z1bmN0aW9uJztcbiAgdmFyIHN5bWJvbHNTdXBwb3J0ZWQ9IHR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nO1xuICB2YXIgcmVmbGVjdFN1cHBvcnRlZD0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnO1xuICB2YXIgc2V0SW1tZWRpYXRlU3VwcG9ydGVkPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nO1xuICB2YXIgX3NldEltbWVkaWF0ZT0gc2V0SW1tZWRpYXRlU3VwcG9ydGVkID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dDtcbiAgdmFyIG93bktleXM9IHN5bWJvbHNTdXBwb3J0ZWQ/IChyZWZsZWN0U3VwcG9ydGVkICYmIHR5cGVvZiBSZWZsZWN0Lm93bktleXM9PT0nZnVuY3Rpb24nPyBSZWZsZWN0Lm93bktleXMgOiBmdW5jdGlvbihvYmope1xuICAgIHZhciBhcnI9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG4gICAgYXJyLnB1c2guYXBwbHkoYXJyLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xuICAgIHJldHVybiBhcnI7XG4gIH0pIDogT2JqZWN0LmtleXM7XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBpZiAodGhpcy5fY29uZikge1xuICAgICAgY29uZmlndXJlLmNhbGwodGhpcywgdGhpcy5fY29uZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlndXJlKGNvbmYpIHtcbiAgICBpZiAoY29uZikge1xuICAgICAgdGhpcy5fY29uZiA9IGNvbmY7XG5cbiAgICAgIGNvbmYuZGVsaW1pdGVyICYmICh0aGlzLmRlbGltaXRlciA9IGNvbmYuZGVsaW1pdGVyKTtcblxuICAgICAgaWYoY29uZi5tYXhMaXN0ZW5lcnMhPT11bmRlZmluZWQpe1xuICAgICAgICAgIHRoaXMuX21heExpc3RlbmVycz0gY29uZi5tYXhMaXN0ZW5lcnM7XG4gICAgICB9XG5cbiAgICAgIGNvbmYud2lsZGNhcmQgJiYgKHRoaXMud2lsZGNhcmQgPSBjb25mLndpbGRjYXJkKTtcbiAgICAgIGNvbmYubmV3TGlzdGVuZXIgJiYgKHRoaXMuX25ld0xpc3RlbmVyID0gY29uZi5uZXdMaXN0ZW5lcik7XG4gICAgICBjb25mLnJlbW92ZUxpc3RlbmVyICYmICh0aGlzLl9yZW1vdmVMaXN0ZW5lciA9IGNvbmYucmVtb3ZlTGlzdGVuZXIpO1xuICAgICAgY29uZi52ZXJib3NlTWVtb3J5TGVhayAmJiAodGhpcy52ZXJib3NlTWVtb3J5TGVhayA9IGNvbmYudmVyYm9zZU1lbW9yeUxlYWspO1xuICAgICAgY29uZi5pZ25vcmVFcnJvcnMgJiYgKHRoaXMuaWdub3JlRXJyb3JzID0gY29uZi5pZ25vcmVFcnJvcnMpO1xuXG4gICAgICBpZiAodGhpcy53aWxkY2FyZCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHJlZSA9IHt9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1Bvc3NpYmxlTWVtb3J5TGVhayhjb3VudCwgZXZlbnROYW1lKSB7XG4gICAgdmFyIGVycm9yTXNnID0gJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAnbGVhayBkZXRlY3RlZC4gJyArIGNvdW50ICsgJyBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJztcblxuICAgIGlmKHRoaXMudmVyYm9zZU1lbW9yeUxlYWspe1xuICAgICAgZXJyb3JNc2cgKz0gJyBFdmVudCBuYW1lOiAnICsgZXZlbnROYW1lICsgJy4nO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVtaXRXYXJuaW5nKXtcbiAgICAgIHZhciBlID0gbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgICAgIGUubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgZS5lbWl0dGVyID0gdGhpcztcbiAgICAgIGUuY291bnQgPSBjb3VudDtcbiAgICAgIHByb2Nlc3MuZW1pdFdhcm5pbmcoZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNc2cpO1xuXG4gICAgICBpZiAoY29uc29sZS50cmFjZSl7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHN3aXRjaCAobikge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gW107XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbYV07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbYSwgYl07XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbYSwgYiwgY107XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgYXJyID0gbmV3IEFycmF5KG4pO1xuICAgICAgICB3aGlsZSAobi0tKSB7XG4gICAgICAgICAgYXJyW25dID0gYXJndW1lbnRzW25dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHRvT2JqZWN0KGtleXMsIHZhbHVlcykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIga2V5O1xuICAgIHZhciBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzQ291bnQgPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgb2JqW2tleV0gPSBpIDwgdmFsdWVzQ291bnQgPyB2YWx1ZXNbaV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBUYXJnZXRPYnNlcnZlcihlbWl0dGVyLCB0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9lbWl0dGVyID0gZW1pdHRlcjtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fbGlzdGVuZXJzQ291bnQgPSAwO1xuXG4gICAgdmFyIG9uLCBvZmY7XG5cbiAgICBpZiAob3B0aW9ucy5vbiB8fCBvcHRpb25zLm9mZikge1xuICAgICAgb24gPSBvcHRpb25zLm9uO1xuICAgICAgb2ZmID0gb3B0aW9ucy5vZmY7XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBvbiA9IHRhcmdldC5hZGRFdmVudExpc3RlbmVyO1xuICAgICAgb2ZmID0gdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQuYWRkTGlzdGVuZXIpIHtcbiAgICAgIG9uID0gdGFyZ2V0LmFkZExpc3RlbmVyO1xuICAgICAgb2ZmID0gdGFyZ2V0LnJlbW92ZUxpc3RlbmVyO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0Lm9uKSB7XG4gICAgICBvbiA9IHRhcmdldC5vbjtcbiAgICAgIG9mZiA9IHRhcmdldC5vZmY7XG4gICAgfVxuXG4gICAgaWYgKCFvbiAmJiAhb2ZmKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGFyZ2V0IGRvZXMgbm90IGltcGxlbWVudCBhbnkga25vd24gZXZlbnQgQVBJJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdvbiBtZXRob2QgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvZmYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignb2ZmIG1ldGhvZCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vbiA9IG9uO1xuICAgIHRoaXMuX29mZiA9IG9mZjtcblxuICAgIHZhciBfb2JzZXJ2ZXJzPSBlbWl0dGVyLl9vYnNlcnZlcnM7XG4gICAgaWYoX29ic2VydmVycyl7XG4gICAgICBfb2JzZXJ2ZXJzLnB1c2godGhpcyk7XG4gICAgfWVsc2V7XG4gICAgICBlbWl0dGVyLl9vYnNlcnZlcnM9IFt0aGlzXTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKFRhcmdldE9ic2VydmVyLnByb3RvdHlwZSwge1xuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQsIGxvY2FsRXZlbnQsIHJlZHVjZXIpe1xuICAgICAgdmFyIG9ic2VydmVyPSB0aGlzO1xuICAgICAgdmFyIHRhcmdldD0gdGhpcy5fdGFyZ2V0O1xuICAgICAgdmFyIGVtaXR0ZXI9IHRoaXMuX2VtaXR0ZXI7XG4gICAgICB2YXIgbGlzdGVuZXJzPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICB2YXIgaGFuZGxlcj0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGFyZ3M9IHRvQXJyYXkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIGV2ZW50T2JqPSB7XG4gICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgICBuYW1lOiBsb2NhbEV2ZW50LFxuICAgICAgICAgIG9yaWdpbmFsOiBldmVudFxuICAgICAgICB9O1xuICAgICAgICBpZihyZWR1Y2VyKXtcbiAgICAgICAgICB2YXIgcmVzdWx0PSByZWR1Y2VyLmNhbGwodGFyZ2V0LCBldmVudE9iaik7XG4gICAgICAgICAgaWYocmVzdWx0IT09ZmFsc2Upe1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0LmFwcGx5KGVtaXR0ZXIsIFtldmVudE9iai5uYW1lXS5jb25jYXQoYXJncykpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbWl0dGVyLmVtaXQuYXBwbHkoZW1pdHRlciwgW2xvY2FsRXZlbnRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9O1xuXG5cbiAgICAgIGlmKGxpc3RlbmVyc1tldmVudF0pe1xuICAgICAgICB0aHJvdyBFcnJvcignRXZlbnQgXFwnJyArIGV2ZW50ICsgJ1xcJyBpcyBhbHJlYWR5IGxpc3RlbmluZycpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9saXN0ZW5lcnNDb3VudCsrO1xuXG4gICAgICBpZihlbWl0dGVyLl9uZXdMaXN0ZW5lciAmJiBlbWl0dGVyLl9yZW1vdmVMaXN0ZW5lciAmJiAhb2JzZXJ2ZXIuX29uTmV3TGlzdGVuZXIpe1xuXG4gICAgICAgIHRoaXMuX29uTmV3TGlzdGVuZXIgPSBmdW5jdGlvbiAoX2V2ZW50KSB7XG4gICAgICAgICAgaWYgKF9ldmVudCA9PT0gbG9jYWxFdmVudCAmJiBsaXN0ZW5lcnNbZXZlbnRdID09PSBudWxsKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnNbZXZlbnRdID0gaGFuZGxlcjtcbiAgICAgICAgICAgIG9ic2VydmVyLl9vbi5jYWxsKHRhcmdldCwgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBlbWl0dGVyLm9uKCduZXdMaXN0ZW5lcicsIHRoaXMuX29uTmV3TGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMuX29uUmVtb3ZlTGlzdGVuZXI9IGZ1bmN0aW9uKF9ldmVudCl7XG4gICAgICAgICAgaWYoX2V2ZW50ID09PSBsb2NhbEV2ZW50ICYmICFlbWl0dGVyLmhhc0xpc3RlbmVycyhfZXZlbnQpICYmIGxpc3RlbmVyc1tldmVudF0pe1xuICAgICAgICAgICAgbGlzdGVuZXJzW2V2ZW50XT0gbnVsbDtcbiAgICAgICAgICAgIG9ic2VydmVyLl9vZmYuY2FsbCh0YXJnZXQsIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGlzdGVuZXJzW2V2ZW50XT0gbnVsbDtcblxuICAgICAgICBlbWl0dGVyLm9uKCdyZW1vdmVMaXN0ZW5lcicsIHRoaXMuX29uUmVtb3ZlTGlzdGVuZXIpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGxpc3RlbmVyc1tldmVudF09IGhhbmRsZXI7XG4gICAgICAgIG9ic2VydmVyLl9vbi5jYWxsKHRhcmdldCwgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgdmFyIG9ic2VydmVyPSB0aGlzO1xuICAgICAgdmFyIGxpc3RlbmVycz0gdGhpcy5fbGlzdGVuZXJzO1xuICAgICAgdmFyIGVtaXR0ZXI9IHRoaXMuX2VtaXR0ZXI7XG4gICAgICB2YXIgaGFuZGxlcjtcbiAgICAgIHZhciBldmVudHM7XG4gICAgICB2YXIgb2ZmPSB0aGlzLl9vZmY7XG4gICAgICB2YXIgdGFyZ2V0PSB0aGlzLl90YXJnZXQ7XG4gICAgICB2YXIgaTtcblxuICAgICAgaWYoZXZlbnQgJiYgdHlwZW9mIGV2ZW50IT09J3N0cmluZycpe1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2V2ZW50IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xlYXJSZWZzKCl7XG4gICAgICAgIGlmKG9ic2VydmVyLl9vbk5ld0xpc3RlbmVyKXtcbiAgICAgICAgICBlbWl0dGVyLm9mZignbmV3TGlzdGVuZXInLCBvYnNlcnZlci5fb25OZXdMaXN0ZW5lcik7XG4gICAgICAgICAgZW1pdHRlci5vZmYoJ3JlbW92ZUxpc3RlbmVyJywgb2JzZXJ2ZXIuX29uUmVtb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgIG9ic2VydmVyLl9vbk5ld0xpc3RlbmVyPSBudWxsO1xuICAgICAgICAgIG9ic2VydmVyLl9vblJlbW92ZUxpc3RlbmVyPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleD0gZmluZFRhcmdldEluZGV4LmNhbGwoZW1pdHRlciwgb2JzZXJ2ZXIpO1xuICAgICAgICBlbWl0dGVyLl9vYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBoYW5kbGVyPSBsaXN0ZW5lcnNbZXZlbnRdO1xuICAgICAgICBpZighaGFuZGxlcikgcmV0dXJuO1xuICAgICAgICBvZmYuY2FsbCh0YXJnZXQsIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgZGVsZXRlIGxpc3RlbmVyc1tldmVudF07XG4gICAgICAgIGlmKCEtLXRoaXMuX2xpc3RlbmVyc0NvdW50KXtcbiAgICAgICAgICBjbGVhclJlZnMoKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGV2ZW50cz0gb3duS2V5cyhsaXN0ZW5lcnMpO1xuICAgICAgICBpPSBldmVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZShpLS0+MCl7XG4gICAgICAgICAgZXZlbnQ9IGV2ZW50c1tpXTtcbiAgICAgICAgICBvZmYuY2FsbCh0YXJnZXQsIGV2ZW50LCBsaXN0ZW5lcnNbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9saXN0ZW5lcnM9IHt9O1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnNDb3VudD0gMDtcbiAgICAgICAgY2xlYXJSZWZzKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiByZXNvbHZlT3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIHJlZHVjZXJzLCBhbGxvd1Vua25vd24pIHtcbiAgICB2YXIgY29tcHV0ZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgc2NoZW1hKTtcblxuICAgIGlmICghb3B0aW9ucykgcmV0dXJuIGNvbXB1dGVkT3B0aW9ucztcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcpXG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIG9wdGlvbiwgdmFsdWU7XG4gICAgdmFyIHJlZHVjZXI7XG5cbiAgICBmdW5jdGlvbiByZWplY3QocmVhc29uKSB7XG4gICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBcIicgKyBvcHRpb24gKyAnXCIgb3B0aW9uIHZhbHVlJyArIChyZWFzb24gPyAnLiBSZWFzb246ICcgKyByZWFzb24gOiAnJykpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgb3B0aW9uID0ga2V5c1tpXTtcbiAgICAgIGlmICghYWxsb3dVbmtub3duICYmICFoYXNPd25Qcm9wZXJ0eS5jYWxsKHNjaGVtYSwgb3B0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVW5rbm93biBcIicgKyBvcHRpb24gKyAnXCIgb3B0aW9uJyk7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlZHVjZXIgPSByZWR1Y2Vyc1tvcHRpb25dO1xuICAgICAgICBjb21wdXRlZE9wdGlvbnNbb3B0aW9uXSA9IHJlZHVjZXIgPyByZWR1Y2VyKHZhbHVlLCByZWplY3QpIDogdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wdXRlZE9wdGlvbnM7XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJ1Y3RvclJlZHVjZXIodmFsdWUsIHJlamVjdCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgfHwgIXZhbHVlLmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKSkge1xuICAgICAgcmVqZWN0KCd2YWx1ZSBtdXN0IGJlIGEgY29uc3RydWN0b3InKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVR5cGVSZWR1Y2VyKHR5cGVzKSB7XG4gICAgdmFyIG1lc3NhZ2U9ICd2YWx1ZSBtdXN0IGJlIHR5cGUgb2YgJyArIHR5cGVzLmpvaW4oJ3wnKTtcbiAgICB2YXIgbGVuPSB0eXBlcy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0VHlwZT0gdHlwZXNbMF07XG4gICAgdmFyIHNlY29uZFR5cGU9IHR5cGVzWzFdO1xuXG4gICAgaWYgKGxlbiA9PT0gMSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2LCByZWplY3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBmaXJzdFR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxlbiA9PT0gMikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2LCByZWplY3QpIHtcbiAgICAgICAgdmFyIGtpbmQ9IHR5cGVvZiB2O1xuICAgICAgICBpZiAoa2luZCA9PT0gZmlyc3RUeXBlIHx8IGtpbmQgPT09IHNlY29uZFR5cGUpIHJldHVybiB2O1xuICAgICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2LCByZWplY3QpIHtcbiAgICAgIHZhciBraW5kID0gdHlwZW9mIHY7XG4gICAgICB2YXIgaSA9IGxlbjtcbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIGlmIChraW5kID09PSB0eXBlc1tpXSkgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgICByZWplY3QobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGZ1bmN0aW9uUmVkdWNlcj0gbWFrZVR5cGVSZWR1Y2VyKFsnZnVuY3Rpb24nXSk7XG5cbiAgdmFyIG9iamVjdEZ1bmN0aW9uUmVkdWNlcj0gbWFrZVR5cGVSZWR1Y2VyKFsnb2JqZWN0JywgJ2Z1bmN0aW9uJ10pO1xuXG4gIGZ1bmN0aW9uIG1ha2VDYW5jZWxhYmxlUHJvbWlzZShQcm9taXNlLCBleGVjdXRvciwgb3B0aW9ucykge1xuICAgIHZhciBpc0NhbmNlbGFibGU7XG4gICAgdmFyIGNhbGxiYWNrcztcbiAgICB2YXIgdGltZXI9IDA7XG4gICAgdmFyIHN1YnNjcmlwdGlvbkNsb3NlZDtcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgIG9wdGlvbnM9IHJlc29sdmVPcHRpb25zKG9wdGlvbnMsIHtcbiAgICAgICAgdGltZW91dDogMCxcbiAgICAgICAgb3ZlcmxvYWQ6IGZhbHNlXG4gICAgICB9LCB7XG4gICAgICAgIHRpbWVvdXQ6IGZ1bmN0aW9uKHZhbHVlLCByZWplY3Qpe1xuICAgICAgICAgIHZhbHVlKj0gMTtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA8IDAgfHwgIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJlamVjdCgndGltZW91dCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlzQ2FuY2VsYWJsZSA9ICFvcHRpb25zLm92ZXJsb2FkICYmIHR5cGVvZiBQcm9taXNlLnByb3RvdHlwZS5jYW5jZWwgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9uQ2FuY2VsID09PSAnZnVuY3Rpb24nO1xuXG4gICAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgY2FsbGJhY2tzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgIHRpbWVyID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgX3Jlc29sdmU9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBfcmVqZWN0PSBmdW5jdGlvbihlcnIpe1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGlzQ2FuY2VsYWJsZSkge1xuICAgICAgICBleGVjdXRvcihfcmVzb2x2ZSwgX3JlamVjdCwgb25DYW5jZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tzID0gW2Z1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgICAgX3JlamVjdChyZWFzb24gfHwgRXJyb3IoJ2NhbmNlbGVkJykpO1xuICAgICAgICB9XTtcbiAgICAgICAgZXhlY3V0b3IoX3Jlc29sdmUsIF9yZWplY3QsIGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGlmIChzdWJzY3JpcHRpb25DbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdVbmFibGUgdG8gc3Vic2NyaWJlIG9uIGNhbmNlbCBldmVudCBhc3luY2hyb25vdXNseScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignb25DYW5jZWwgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1YnNjcmlwdGlvbkNsb3NlZD0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudGltZW91dCA+IDApIHtcbiAgICAgICAgdGltZXI9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgcmVhc29uPSBFcnJvcigndGltZW91dCcpO1xuICAgICAgICAgIHJlYXNvbi5jb2RlID0gJ0VUSU1FRE9VVCdcbiAgICAgICAgICB0aW1lcj0gMDtcbiAgICAgICAgICBwcm9taXNlLmNhbmNlbChyZWFzb24pO1xuICAgICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgICB9LCBvcHRpb25zLnRpbWVvdXQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFpc0NhbmNlbGFibGUpIHtcbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICBpZiAoIWNhbGxiYWNrcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuZ3RoID0gY2FsbGJhY2tzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNhbGxiYWNrc1tpXShyZWFzb24pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGludGVybmFsIGNhbGxiYWNrIHRvIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgICAgICBjYWxsYmFja3NbMF0ocmVhc29uKTtcbiAgICAgICAgY2FsbGJhY2tzID0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kVGFyZ2V0SW5kZXgob2JzZXJ2ZXIpIHtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5fb2JzZXJ2ZXJzO1xuICAgIGlmKCFvYnNlcnZlcnMpe1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICB2YXIgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAob2JzZXJ2ZXJzW2ldLl90YXJnZXQgPT09IG9ic2VydmVyKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLy8gQXR0ZW50aW9uLCBmdW5jdGlvbiByZXR1cm4gdHlwZSBub3cgaXMgYXJyYXksIGFsd2F5cyAhXG4gIC8vIEl0IGhhcyB6ZXJvIGVsZW1lbnRzIGlmIG5vIGFueSBtYXRjaGVzIGZvdW5kIGFuZCBvbmUgb3IgbW9yZVxuICAvLyBlbGVtZW50cyAobGVhZnMpIGlmIHRoZXJlIGFyZSBtYXRjaGVzXG4gIC8vXG4gIGZ1bmN0aW9uIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZSwgaSwgdHlwZUxlbmd0aCkge1xuICAgIGlmICghdHJlZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIHZhciBraW5kID0gdHlwZW9mIHR5cGU7XG4gICAgICBpZiAoa2luZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIG5zLCBuLCBsID0gMCwgaiA9IDAsIGRlbGltaXRlciA9IHRoaXMuZGVsaW1pdGVyLCBkbCA9IGRlbGltaXRlci5sZW5ndGg7XG4gICAgICAgIGlmICgobiA9IHR5cGUuaW5kZXhPZihkZWxpbWl0ZXIpKSAhPT0gLTEpIHtcbiAgICAgICAgICBucyA9IG5ldyBBcnJheSg1KTtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBuc1tsKytdID0gdHlwZS5zbGljZShqLCBuKTtcbiAgICAgICAgICAgIGogPSBuICsgZGw7XG4gICAgICAgICAgfSB3aGlsZSAoKG4gPSB0eXBlLmluZGV4T2YoZGVsaW1pdGVyLCBqKSkgIT09IC0xKTtcblxuICAgICAgICAgIG5zW2wrK10gPSB0eXBlLnNsaWNlKGopO1xuICAgICAgICAgIHR5cGUgPSBucztcbiAgICAgICAgICB0eXBlTGVuZ3RoID0gbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0eXBlID0gW3R5cGVdO1xuICAgICAgICAgIHR5cGVMZW5ndGggPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtpbmQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHR5cGVMZW5ndGggPSB0eXBlLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBbdHlwZV07XG4gICAgICAgIHR5cGVMZW5ndGggPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnM9IG51bGwsIGJyYW5jaCwgeFRyZWUsIHh4VHJlZSwgaXNvbGF0ZWRCcmFuY2gsIGVuZFJlYWNoZWQsIGN1cnJlbnRUeXBlID0gdHlwZVtpXSxcbiAgICAgICAgbmV4dFR5cGUgPSB0eXBlW2kgKyAxXSwgYnJhbmNoZXMsIF9saXN0ZW5lcnM7XG5cbiAgICBpZiAoaSA9PT0gdHlwZUxlbmd0aCkge1xuICAgICAgLy9cbiAgICAgIC8vIElmIGF0IHRoZSBlbmQgb2YgdGhlIGV2ZW50KHMpIGxpc3QgYW5kIHRoZSB0cmVlIGhhcyBsaXN0ZW5lcnNcbiAgICAgIC8vIGludm9rZSB0aG9zZSBsaXN0ZW5lcnMuXG4gICAgICAvL1xuXG4gICAgICBpZih0cmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0cmVlLl9saXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKHRyZWUuX2xpc3RlbmVycyk7XG4gICAgICAgICAgbGlzdGVuZXJzID0gW3RyZWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2guYXBwbHkoaGFuZGxlcnMsIHRyZWUuX2xpc3RlbmVycyk7XG4gICAgICAgICAgbGlzdGVuZXJzID0gW3RyZWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKGN1cnJlbnRUeXBlID09PSAnKicpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgdGhlIGV2ZW50IGVtaXR0ZWQgaXMgJyonIGF0IHRoaXMgcGFydFxuICAgICAgICAvLyBvciB0aGVyZSBpcyBhIGNvbmNyZXRlIG1hdGNoIGF0IHRoaXMgcGF0Y2hcbiAgICAgICAgLy9cbiAgICAgICAgYnJhbmNoZXMgPSBvd25LZXlzKHRyZWUpO1xuICAgICAgICBuID0gYnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobi0tID4gMCkge1xuICAgICAgICAgIGJyYW5jaCA9IGJyYW5jaGVzW25dO1xuICAgICAgICAgIGlmIChicmFuY2ggIT09ICdfbGlzdGVuZXJzJykge1xuICAgICAgICAgICAgX2xpc3RlbmVycyA9IHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpICsgMSwgdHlwZUxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoX2xpc3RlbmVycykge1xuICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2guYXBwbHkobGlzdGVuZXJzLCBfbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBfbGlzdGVuZXJzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09PSAnKionKSB7XG4gICAgICAgIGVuZFJlYWNoZWQgPSAoaSArIDEgPT09IHR5cGVMZW5ndGggfHwgKGkgKyAyID09PSB0eXBlTGVuZ3RoICYmIG5leHRUeXBlID09PSAnKicpKTtcbiAgICAgICAgaWYgKGVuZFJlYWNoZWQgJiYgdHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgLy8gVGhlIG5leHQgZWxlbWVudCBoYXMgYSBfbGlzdGVuZXJzLCBhZGQgaXQgdG8gdGhlIGhhbmRsZXJzLlxuICAgICAgICAgIGxpc3RlbmVycyA9IHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZSwgdHlwZUxlbmd0aCwgdHlwZUxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmFuY2hlcyA9IG93bktleXModHJlZSk7XG4gICAgICAgIG4gPSBicmFuY2hlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChuLS0gPiAwKSB7XG4gICAgICAgICAgYnJhbmNoID0gYnJhbmNoZXNbbl07XG4gICAgICAgICAgaWYgKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnKSB7XG4gICAgICAgICAgICBpZiAoYnJhbmNoID09PSAnKicgfHwgYnJhbmNoID09PSAnKionKSB7XG4gICAgICAgICAgICAgIGlmICh0cmVlW2JyYW5jaF0uX2xpc3RlbmVycyAmJiAhZW5kUmVhY2hlZCkge1xuICAgICAgICAgICAgICAgIF9saXN0ZW5lcnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgdHlwZUxlbmd0aCwgdHlwZUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKF9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2guYXBwbHkobGlzdGVuZXJzLCBfbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IF9saXN0ZW5lcnM7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF9saXN0ZW5lcnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSwgdHlwZUxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJyYW5jaCA9PT0gbmV4dFR5cGUpIHtcbiAgICAgICAgICAgICAgX2xpc3RlbmVycyA9IHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpICsgMiwgdHlwZUxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBObyBtYXRjaCBvbiB0aGlzIG9uZSwgc2hpZnQgaW50byB0aGUgdHJlZSBidXQgbm90IGluIHRoZSB0eXBlIGFycmF5LlxuICAgICAgICAgICAgICBfbGlzdGVuZXJzID0gc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGksIHR5cGVMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoLmFwcGx5KGxpc3RlbmVycywgX2xpc3RlbmVycyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gX2xpc3RlbmVycztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXJzO1xuICAgICAgfSBlbHNlIGlmICh0cmVlW2N1cnJlbnRUeXBlXSkge1xuICAgICAgICBsaXN0ZW5lcnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbY3VycmVudFR5cGVdLCBpICsgMSwgdHlwZUxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgICB4VHJlZSA9IHRyZWVbJyonXTtcbiAgICBpZiAoeFRyZWUpIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgdHJlZSB3aWxsIGFsbG93IGFueSBtYXRjaCBmb3IgdGhpcyBwYXJ0LFxuICAgICAgLy8gdGhlbiByZWN1cnNpdmVseSBleHBsb3JlIGFsbCBicmFuY2hlcyBvZiB0aGUgdHJlZVxuICAgICAgLy9cbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeFRyZWUsIGkgKyAxLCB0eXBlTGVuZ3RoKTtcbiAgICB9XG5cbiAgICB4eFRyZWUgPSB0cmVlWycqKiddO1xuICAgIGlmICh4eFRyZWUpIHtcbiAgICAgIGlmIChpIDwgdHlwZUxlbmd0aCkge1xuICAgICAgICBpZiAoeHhUcmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgbGlzdGVuZXIgb24gYSAnKionLCBpdCB3aWxsIGNhdGNoIGFsbCwgc28gYWRkIGl0cyBoYW5kbGVyLlxuICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlLCB0eXBlTGVuZ3RoLCB0eXBlTGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIGFycmF5cyBvZiBtYXRjaGluZyBuZXh0IGJyYW5jaGVzIGFuZCBvdGhlcnMuXG4gICAgICAgIGJyYW5jaGVzPSBvd25LZXlzKHh4VHJlZSk7XG4gICAgICAgIG49IGJyYW5jaGVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUobi0tPjApe1xuICAgICAgICAgIGJyYW5jaD0gYnJhbmNoZXNbbl07XG4gICAgICAgICAgaWYgKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnKSB7XG4gICAgICAgICAgICBpZiAoYnJhbmNoID09PSBuZXh0VHlwZSkge1xuICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoZSBuZXh0IGVsZW1lbnQgd2lsbCBtYXRjaCwgc28ganVtcCB0d2ljZS5cbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWVbYnJhbmNoXSwgaSArIDIsIHR5cGVMZW5ndGgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChicmFuY2ggPT09IGN1cnJlbnRUeXBlKSB7XG4gICAgICAgICAgICAgIC8vIEN1cnJlbnQgbm9kZSBtYXRjaGVzLCBtb3ZlIGludG8gdGhlIHRyZWUuXG4gICAgICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlW2JyYW5jaF0sIGkgKyAxLCB0eXBlTGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlzb2xhdGVkQnJhbmNoID0ge307XG4gICAgICAgICAgICAgIGlzb2xhdGVkQnJhbmNoW2JyYW5jaF0gPSB4eFRyZWVbYnJhbmNoXTtcbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB7JyoqJzogaXNvbGF0ZWRCcmFuY2h9LCBpICsgMSwgdHlwZUxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHh4VHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgcmVhY2hlZCB0aGUgZW5kIGFuZCBzdGlsbCBvbiBhICcqKidcbiAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWUsIHR5cGVMZW5ndGgsIHR5cGVMZW5ndGgpO1xuICAgICAgfSBlbHNlIGlmICh4eFRyZWVbJyonXSAmJiB4eFRyZWVbJyonXS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlWycqJ10sIHR5cGVMZW5ndGgsIHR5cGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gIH1cblxuICBmdW5jdGlvbiBncm93TGlzdGVuZXJUcmVlKHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gICAgdmFyIGxlbiA9IDAsIGogPSAwLCBpLCBkZWxpbWl0ZXIgPSB0aGlzLmRlbGltaXRlciwgZGw9IGRlbGltaXRlci5sZW5ndGgsIG5zO1xuXG4gICAgaWYodHlwZW9mIHR5cGU9PT0nc3RyaW5nJykge1xuICAgICAgaWYgKChpID0gdHlwZS5pbmRleE9mKGRlbGltaXRlcikpICE9PSAtMSkge1xuICAgICAgICBucyA9IG5ldyBBcnJheSg1KTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG5zW2xlbisrXSA9IHR5cGUuc2xpY2UoaiwgaSk7XG4gICAgICAgICAgaiA9IGkgKyBkbDtcbiAgICAgICAgfSB3aGlsZSAoKGkgPSB0eXBlLmluZGV4T2YoZGVsaW1pdGVyLCBqKSkgIT09IC0xKTtcblxuICAgICAgICBuc1tsZW4rK10gPSB0eXBlLnNsaWNlKGopO1xuICAgICAgfWVsc2V7XG4gICAgICAgIG5zPSBbdHlwZV07XG4gICAgICAgIGxlbj0gMTtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIG5zPSB0eXBlO1xuICAgICAgbGVuPSB0eXBlLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIExvb2tzIGZvciB0d28gY29uc2VjdXRpdmUgJyoqJywgaWYgc28sIGRvbid0IGFkZCB0aGUgZXZlbnQgYXQgYWxsLlxuICAgIC8vXG4gICAgaWYgKGxlbiA+IDEpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgKyAxIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKG5zW2ldID09PSAnKionICYmIG5zW2kgKyAxXSA9PT0gJyoqJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuXG5cbiAgICB2YXIgdHJlZSA9IHRoaXMubGlzdGVuZXJUcmVlLCBuYW1lO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBuYW1lID0gbnNbaV07XG5cbiAgICAgIHRyZWUgPSB0cmVlW25hbWVdIHx8ICh0cmVlW25hbWVdID0ge30pO1xuXG4gICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xuICAgICAgICBpZiAoIXRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycyA9IGxpc3RlbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0eXBlb2YgdHJlZS5fbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMgPSBbdHJlZS5fbGlzdGVuZXJzXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICAgICAgdHJlZS5fbGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhdHJlZS5fbGlzdGVuZXJzLndhcm5lZCAmJlxuICAgICAgICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPiAwICYmXG4gICAgICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy53YXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgbG9nUG9zc2libGVNZW1vcnlMZWFrLmNhbGwodGhpcywgdHJlZS5fbGlzdGVuZXJzLmxlbmd0aCwgbmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sbGVjdFRyZWVFdmVudHModHJlZSwgZXZlbnRzLCByb290LCBhc0FycmF5KXtcbiAgICAgdmFyIGJyYW5jaGVzPSBvd25LZXlzKHRyZWUpO1xuICAgICB2YXIgaT0gYnJhbmNoZXMubGVuZ3RoO1xuICAgICB2YXIgYnJhbmNoLCBicmFuY2hOYW1lLCBwYXRoO1xuICAgICB2YXIgaGFzTGlzdGVuZXJzPSB0cmVlWydfbGlzdGVuZXJzJ107XG4gICAgIHZhciBpc0FycmF5UGF0aDtcblxuICAgICB3aGlsZShpLS0+MCl7XG4gICAgICAgICBicmFuY2hOYW1lPSBicmFuY2hlc1tpXTtcblxuICAgICAgICAgYnJhbmNoPSB0cmVlW2JyYW5jaE5hbWVdO1xuXG4gICAgICAgICBpZihicmFuY2hOYW1lPT09J19saXN0ZW5lcnMnKXtcbiAgICAgICAgICAgICBwYXRoPSByb290O1xuICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgIHBhdGggPSByb290ID8gcm9vdC5jb25jYXQoYnJhbmNoTmFtZSkgOiBbYnJhbmNoTmFtZV07XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlzQXJyYXlQYXRoPSBhc0FycmF5IHx8IHR5cGVvZiBicmFuY2hOYW1lPT09J3N5bWJvbCc7XG5cbiAgICAgICAgIGhhc0xpc3RlbmVycyAmJiBldmVudHMucHVzaChpc0FycmF5UGF0aD8gcGF0aCA6IHBhdGguam9pbih0aGlzLmRlbGltaXRlcikpO1xuXG4gICAgICAgICBpZih0eXBlb2YgYnJhbmNoPT09J29iamVjdCcpe1xuICAgICAgICAgICAgIGNvbGxlY3RUcmVlRXZlbnRzLmNhbGwodGhpcywgYnJhbmNoLCBldmVudHMsIHBhdGgsIGlzQXJyYXlQYXRoKTtcbiAgICAgICAgIH1cbiAgICAgfVxuXG4gICAgIHJldHVybiBldmVudHM7XG4gIH1cblxuICBmdW5jdGlvbiByZWN1cnNpdmVseUdhcmJhZ2VDb2xsZWN0KHJvb3QpIHtcbiAgICB2YXIga2V5cyA9IG93bktleXMocm9vdCk7XG4gICAgdmFyIGk9IGtleXMubGVuZ3RoO1xuICAgIHZhciBvYmosIGtleSwgZmxhZztcbiAgICB3aGlsZShpLS0+MCl7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgb2JqID0gcm9vdFtrZXldO1xuXG4gICAgICBpZihvYmope1xuICAgICAgICAgIGZsYWc9IHRydWU7XG4gICAgICAgICAgaWYoa2V5ICE9PSAnX2xpc3RlbmVycycgJiYgIXJlY3Vyc2l2ZWx5R2FyYmFnZUNvbGxlY3Qob2JqKSl7XG4gICAgICAgICAgICAgZGVsZXRlIHJvb3Rba2V5XTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsYWc7XG4gIH1cblxuICBmdW5jdGlvbiBMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgbGlzdGVuZXIpe1xuICAgIHRoaXMuZW1pdHRlcj0gZW1pdHRlcjtcbiAgICB0aGlzLmV2ZW50PSBldmVudDtcbiAgICB0aGlzLmxpc3RlbmVyPSBsaXN0ZW5lcjtcbiAgfVxuXG4gIExpc3RlbmVyLnByb3RvdHlwZS5vZmY9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5lbWl0dGVyLm9mZih0aGlzLmV2ZW50LCB0aGlzLmxpc3RlbmVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBmdW5jdGlvbiBzZXR1cExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgb3B0aW9ucyl7XG4gICAgICBpZiAob3B0aW9ucyA9PT0gdHJ1ZSkge1xuICAgICAgICBwcm9taXNpZnkgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zID09PSBmYWxzZSkge1xuICAgICAgICBhc3luYyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdvcHRpb25zIHNob3VsZCBiZSBhbiBvYmplY3Qgb3IgdHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhc3luYyA9IG9wdGlvbnMuYXN5bmM7XG4gICAgICAgIHZhciBwcm9taXNpZnkgPSBvcHRpb25zLnByb21pc2lmeTtcbiAgICAgICAgdmFyIG5leHRUaWNrID0gb3B0aW9ucy5uZXh0VGljaztcbiAgICAgICAgdmFyIG9iamVjdGlmeSA9IG9wdGlvbnMub2JqZWN0aWZ5O1xuICAgICAgfVxuXG4gICAgICBpZiAoYXN5bmMgfHwgbmV4dFRpY2sgfHwgcHJvbWlzaWZ5KSB7XG4gICAgICAgIHZhciBfbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIF9vcmlnaW4gPSBsaXN0ZW5lci5fb3JpZ2luIHx8IGxpc3RlbmVyO1xuXG4gICAgICAgIGlmIChuZXh0VGljayAmJiAhbmV4dFRpY2tTdXBwb3J0ZWQpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcigncHJvY2Vzcy5uZXh0VGljayBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzaWZ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwcm9taXNpZnkgPSBsaXN0ZW5lci5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXN5bmNGdW5jdGlvbic7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudDtcblxuICAgICAgICAgIHJldHVybiBwcm9taXNpZnkgPyAobmV4dFRpY2sgPyBQcm9taXNlLnJlc29sdmUoKSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBfc2V0SW1tZWRpYXRlKHJlc29sdmUpO1xuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGV4dC5ldmVudCA9IGV2ZW50O1xuICAgICAgICAgICAgcmV0dXJuIF9saXN0ZW5lci5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICAgIH0pKSA6IChuZXh0VGljayA/IHByb2Nlc3MubmV4dFRpY2sgOiBfc2V0SW1tZWRpYXRlKShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb250ZXh0LmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICBfbGlzdGVuZXIuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBsaXN0ZW5lci5fYXN5bmMgPSB0cnVlO1xuICAgICAgICBsaXN0ZW5lci5fb3JpZ2luID0gX29yaWdpbjtcbiAgICAgIH1cblxuICAgIHJldHVybiBbbGlzdGVuZXIsIG9iamVjdGlmeT8gbmV3IExpc3RlbmVyKHRoaXMsIGV2ZW50LCBsaXN0ZW5lcik6IHRoaXNdO1xuICB9XG5cbiAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKGNvbmYpIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB0aGlzLl9uZXdMaXN0ZW5lciA9IGZhbHNlO1xuICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVyID0gZmFsc2U7XG4gICAgdGhpcy52ZXJib3NlTWVtb3J5TGVhayA9IGZhbHNlO1xuICAgIGNvbmZpZ3VyZS5jYWxsKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjIgPSBFdmVudEVtaXR0ZXI7IC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IGZvciBleHBvcnRpbmcgRXZlbnRFbWl0dGVyIHByb3BlcnR5XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5Ubz0gZnVuY3Rpb24odGFyZ2V0LCBldmVudHMsIG9wdGlvbnMpe1xuICAgIGlmKHR5cGVvZiB0YXJnZXQhPT0nb2JqZWN0Jyl7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0cyBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG5cbiAgICB2YXIgZW1pdHRlcj0gdGhpcztcblxuICAgIG9wdGlvbnMgPSByZXNvbHZlT3B0aW9ucyhvcHRpb25zLCB7XG4gICAgICBvbjogdW5kZWZpbmVkLFxuICAgICAgb2ZmOiB1bmRlZmluZWQsXG4gICAgICByZWR1Y2VyczogdW5kZWZpbmVkXG4gICAgfSwge1xuICAgICAgb246IGZ1bmN0aW9uUmVkdWNlcixcbiAgICAgIG9mZjogZnVuY3Rpb25SZWR1Y2VyLFxuICAgICAgcmVkdWNlcnM6IG9iamVjdEZ1bmN0aW9uUmVkdWNlclxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGV2ZW50cyl7XG4gICAgICBpZih0eXBlb2YgZXZlbnRzIT09J29iamVjdCcpe1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2V2ZW50cyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVkdWNlcnM9IG9wdGlvbnMucmVkdWNlcnM7XG4gICAgICB2YXIgaW5kZXg9IGZpbmRUYXJnZXRJbmRleC5jYWxsKGVtaXR0ZXIsIHRhcmdldCk7XG4gICAgICB2YXIgb2JzZXJ2ZXI7XG5cbiAgICAgIGlmKGluZGV4PT09LTEpe1xuICAgICAgICBvYnNlcnZlcj0gbmV3IFRhcmdldE9ic2VydmVyKGVtaXR0ZXIsIHRhcmdldCwgb3B0aW9ucyk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgb2JzZXJ2ZXI9IGVtaXR0ZXIuX29ic2VydmVyc1tpbmRleF07XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXlzPSBvd25LZXlzKGV2ZW50cyk7XG4gICAgICB2YXIgbGVuPSBrZXlzLmxlbmd0aDtcbiAgICAgIHZhciBldmVudDtcbiAgICAgIHZhciBpc1NpbmdsZVJlZHVjZXI9IHR5cGVvZiByZWR1Y2Vycz09PSdmdW5jdGlvbic7XG5cbiAgICAgIGZvcih2YXIgaT0wOyBpPGxlbjsgaSsrKXtcbiAgICAgICAgZXZlbnQ9IGtleXNbaV07XG4gICAgICAgIG9ic2VydmVyLnN1YnNjcmliZShcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50XSB8fCBldmVudCxcbiAgICAgICAgICAgIGlzU2luZ2xlUmVkdWNlciA/IHJlZHVjZXJzIDogcmVkdWNlcnMgJiYgcmVkdWNlcnNbZXZlbnRdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaXNBcnJheShldmVudHMpP1xuICAgICAgICBsaXN0ZW4odG9PYmplY3QoZXZlbnRzKSkgOlxuICAgICAgICAodHlwZW9mIGV2ZW50cz09PSdzdHJpbmcnPyBsaXN0ZW4odG9PYmplY3QoZXZlbnRzLnNwbGl0KC9cXHMrLykpKTogbGlzdGVuKGV2ZW50cykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zdG9wTGlzdGVuaW5nVG8gPSBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCkge1xuICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnM7XG5cbiAgICBpZighb2JzZXJ2ZXJzKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgdmFyIG9ic2VydmVyO1xuICAgIHZhciBtYXRjaGVkPSBmYWxzZTtcblxuICAgIGlmKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0IT09J29iamVjdCcpe1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCd0YXJnZXQgc2hvdWxkIGJlIGFuIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcbiAgICAgIGlmICghdGFyZ2V0IHx8IG9ic2VydmVyLl90YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICBvYnNlcnZlci51bnN1YnNjcmliZShldmVudCk7XG4gICAgICAgIG1hdGNoZWQ9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhblxuICAvLyAxMCBsaXN0ZW5lcnMgYXJlIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2hcbiAgLy8gaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG4gIC8vXG4gIC8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuICAvLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmRlbGltaXRlciA9ICcuJztcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgICBpZiAobiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICAgICAgaWYgKCF0aGlzLl9jb25mKSB0aGlzLl9jb25mID0ge307XG4gICAgICB0aGlzLl9jb25mLm1heExpc3RlbmVycyA9IG47XG4gICAgfVxuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21heExpc3RlbmVycztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50ID0gJyc7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uY2UoZXZlbnQsIGZuLCBmYWxzZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uY2UoZXZlbnQsIGZuLCB0cnVlLCBvcHRpb25zKTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuLCBwcmVwZW5kLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnkoZXZlbnQsIDEsIGZuLCBwcmVwZW5kLCBvcHRpb25zKTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm1hbnkgPSBmdW5jdGlvbihldmVudCwgdHRsLCBmbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9tYW55KGV2ZW50LCB0dGwsIGZuLCBmYWxzZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTWFueSA9IGZ1bmN0aW9uKGV2ZW50LCB0dGwsIGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnkoZXZlbnQsIHR0bCwgZm4sIHRydWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21hbnkgPSBmdW5jdGlvbihldmVudCwgdHRsLCBmbiwgcHJlcGVuZCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFueSBvbmx5IGFjY2VwdHMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoLS10dGwgPT09IDApIHtcbiAgICAgICAgc2VsZi5vZmYoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGxpc3RlbmVyLl9vcmlnaW4gPSBmbjtcblxuICAgIHJldHVybiB0aGlzLl9vbihldmVudCwgbGlzdGVuZXIsIHByZXBlbmQsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5fZXZlbnRzICYmICF0aGlzLl9hbGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHR5cGUgPSBhcmd1bWVudHNbMF0sIG5zLCB3aWxkY2FyZD0gdGhpcy53aWxkY2FyZDtcbiAgICB2YXIgYXJncyxsLGksaiwgY29udGFpbnNTeW1ib2w7XG5cbiAgICBpZiAodHlwZSA9PT0gJ25ld0xpc3RlbmVyJyAmJiAhdGhpcy5fbmV3TGlzdGVuZXIpIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2lsZGNhcmQpIHtcbiAgICAgIG5zPSB0eXBlO1xuICAgICAgaWYodHlwZSE9PSduZXdMaXN0ZW5lcicgJiYgdHlwZSE9PSdyZW1vdmVMaXN0ZW5lcicpe1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgbCA9IHR5cGUubGVuZ3RoO1xuICAgICAgICAgIGlmIChzeW1ib2xzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVtpXSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICAgICAgICBjb250YWluc1N5bWJvbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFjb250YWluc1N5bWJvbCkge1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUuam9pbih0aGlzLmRlbGltaXRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaGFuZGxlcjtcblxuICAgIGlmICh0aGlzLl9hbGwgJiYgdGhpcy5fYWxsLmxlbmd0aCkge1xuICAgICAgaGFuZGxlciA9IHRoaXMuX2FsbC5zbGljZSgpO1xuXG4gICAgICBmb3IgKGkgPSAwLCBsID0gaGFuZGxlci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICAgIHN3aXRjaCAoYWwpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGhhbmRsZXJbaV0uY2FsbCh0aGlzLCB0eXBlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGhhbmRsZXJbaV0uY2FsbCh0aGlzLCB0eXBlLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgaGFuZGxlcltpXS5jYWxsKHRoaXMsIHR5cGUsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBoYW5kbGVyW2ldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2lsZGNhcmQpIHtcbiAgICAgIGhhbmRsZXIgPSBbXTtcbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIGhhbmRsZXIsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCwgbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICAgIHN3aXRjaCAoYWwpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFsIC0gMSk7XG4gICAgICAgICAgZm9yIChqID0gMTsgaiA8IGFsOyBqKyspIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgLy8gbmVlZCB0byBtYWtlIGNvcHkgb2YgaGFuZGxlcnMgYmVjYXVzZSBsaXN0IGNhbiBjaGFuZ2UgaW4gdGhlIG1pZGRsZVxuICAgICAgICAvLyBvZiBlbWl0IGNhbGxcbiAgICAgICAgaGFuZGxlciA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFuZGxlciAmJiBoYW5kbGVyLmxlbmd0aCkge1xuICAgICAgaWYgKGFsID4gMykge1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFsIC0gMSk7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBhbDsgaisrKSBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDAsIGwgPSBoYW5kbGVyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgICAgc3dpdGNoIChhbCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaGFuZGxlcltpXS5jYWxsKHRoaXMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgaGFuZGxlcltpXS5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBoYW5kbGVyW2ldLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGhhbmRsZXJbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaWdub3JlRXJyb3JzICYmICF0aGlzLl9hbGwgJiYgdHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgaWYgKGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGFyZ3VtZW50c1sxXTsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gISF0aGlzLl9hbGw7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0QXN5bmMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cyAmJiAhdGhpcy5fYWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIHZhciB0eXBlID0gYXJndW1lbnRzWzBdLCB3aWxkY2FyZD0gdGhpcy53aWxkY2FyZCwgbnMsIGNvbnRhaW5zU3ltYm9sO1xuICAgIHZhciBhcmdzLGwsaSxqO1xuXG4gICAgaWYgKHR5cGUgPT09ICduZXdMaXN0ZW5lcicgJiYgIXRoaXMuX25ld0xpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoW2ZhbHNlXSk7IH1cbiAgICB9XG5cbiAgICBpZiAod2lsZGNhcmQpIHtcbiAgICAgIG5zPSB0eXBlO1xuICAgICAgaWYodHlwZSE9PSduZXdMaXN0ZW5lcicgJiYgdHlwZSE9PSdyZW1vdmVMaXN0ZW5lcicpe1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgbCA9IHR5cGUubGVuZ3RoO1xuICAgICAgICAgIGlmIChzeW1ib2xzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVtpXSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICAgICAgICBjb250YWluc1N5bWJvbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFjb250YWluc1N5bWJvbCkge1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUuam9pbih0aGlzLmRlbGltaXRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb21pc2VzPSBbXTtcblxuICAgIHZhciBhbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGhhbmRsZXI7XG5cbiAgICBpZiAodGhpcy5fYWxsKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5fYWxsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgICAgc3dpdGNoIChhbCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9hbGxbaV0uY2FsbCh0aGlzLCB0eXBlKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2FsbFtpXS5jYWxsKHRoaXMsIHR5cGUsIGFyZ3VtZW50c1sxXSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9hbGxbaV0uY2FsbCh0aGlzLCB0eXBlLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdpbGRjYXJkKSB7XG4gICAgICBoYW5kbGVyID0gW107XG4gICAgICBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBoYW5kbGVyLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICBzd2l0Y2ggKGFsKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHByb21pc2VzLnB1c2goaGFuZGxlci5jYWxsKHRoaXMpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHByb21pc2VzLnB1c2goaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcHJvbWlzZXMucHVzaChoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFsIC0gMSk7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBhbDsgaisrKSBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgJiYgaGFuZGxlci5sZW5ndGgpIHtcbiAgICAgIGhhbmRsZXIgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgICBpZiAoYWwgPiAzKSB7XG4gICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYWwgLSAxKTtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8IGFsOyBqKyspIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMCwgbCA9IGhhbmRsZXIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgICBzd2l0Y2ggKGFsKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKGhhbmRsZXJbaV0uY2FsbCh0aGlzKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKGhhbmRsZXJbaV0uY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHByb21pc2VzLnB1c2goaGFuZGxlcltpXS5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChoYW5kbGVyW2ldLmFwcGx5KHRoaXMsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaWdub3JlRXJyb3JzICYmICF0aGlzLl9hbGwgJiYgdHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgaWYgKGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChhcmd1bWVudHNbMV0pOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiVW5jYXVnaHQsIHVuc3BlY2lmaWVkICdlcnJvcicgZXZlbnQuXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uKHR5cGUsIGxpc3RlbmVyLCBmYWxzZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vbih0eXBlLCBsaXN0ZW5lciwgdHJ1ZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbkFueSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uQW55KGZuLCBmYWxzZSk7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kQW55ID0gZnVuY3Rpb24oZm4pIHtcbiAgICByZXR1cm4gdGhpcy5fb25BbnkoZm4sIHRydWUpO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX29uQW55ID0gZnVuY3Rpb24oZm4sIHByZXBlbmQpe1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25Bbnkgb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fYWxsKSB7XG4gICAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZ1bmN0aW9uIHRvIHRoZSBldmVudCBsaXN0ZW5lciBjb2xsZWN0aW9uLlxuICAgIGlmKHByZXBlbmQpe1xuICAgICAgdGhpcy5fYWxsLnVuc2hpZnQoZm4pO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5fYWxsLnB1c2goZm4pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX29uID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHByZXBlbmQsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX29uQW55KHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb24gb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHJldHVyblZhbHVlPSB0aGlzLCB0ZW1wO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGVtcCA9IHNldHVwTGlzdGVuZXIuY2FsbCh0aGlzLCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICBsaXN0ZW5lciA9IHRlbXBbMF07XG4gICAgICByZXR1cm5WYWx1ZSA9IHRlbXBbMV07XG4gICAgfVxuXG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PSBcIm5ld0xpc3RlbmVyc1wiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyc1wiLlxuICAgIGlmICh0aGlzLl9uZXdMaXN0ZW5lcikge1xuICAgICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy53aWxkY2FyZCkge1xuICAgICAgZ3Jvd0xpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKTtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkge1xuICAgICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ldmVudHNbdHlwZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gQ2hhbmdlIHRvIGFycmF5LlxuICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYWRkXG4gICAgICBpZihwcmVwZW5kKXtcbiAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgJiZcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID4gMCAmJlxuICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICAgIGxvZ1Bvc3NpYmxlTWVtb3J5TGVhay5jYWxsKHRoaXMsIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgsIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVycyxsZWFmcz1bXTtcblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgbGVhZnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBudWxsLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgICAgaWYoIWxlYWZzKSByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9lcyBub3QgdXNlIGxpc3RlbmVycygpLCBzbyBubyBzaWRlIGVmZmVjdCBvZiBjcmVhdGluZyBfZXZlbnRzW3R5cGVdXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgcmV0dXJuIHRoaXM7XG4gICAgICBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgIGxlYWZzLnB1c2goe19saXN0ZW5lcnM6aGFuZGxlcnN9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpTGVhZj0wOyBpTGVhZjxsZWFmcy5sZW5ndGg7IGlMZWFmKyspIHtcbiAgICAgIHZhciBsZWFmID0gbGVhZnNbaUxlYWZdO1xuICAgICAgaGFuZGxlcnMgPSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoaXNBcnJheShoYW5kbGVycykpIHtcblxuICAgICAgICB2YXIgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFuZGxlcnNbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgICAoaGFuZGxlcnNbaV0ubGlzdGVuZXIgJiYgaGFuZGxlcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB8fFxuICAgICAgICAgICAgKGhhbmRsZXJzW2ldLl9vcmlnaW4gJiYgaGFuZGxlcnNbaV0uX29yaWdpbiA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgICAgbGVhZi5fbGlzdGVuZXJzLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgICAgZGVsZXRlIGxlYWYuX2xpc3RlbmVycztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIiwgdHlwZSwgbGlzdGVuZXIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaGFuZGxlcnMgPT09IGxpc3RlbmVyIHx8XG4gICAgICAgIChoYW5kbGVycy5saXN0ZW5lciAmJiBoYW5kbGVycy5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHx8XG4gICAgICAgIChoYW5kbGVycy5fb3JpZ2luICYmIGhhbmRsZXJzLl9vcmlnaW4gPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgICAgZGVsZXRlIGxlYWYuX2xpc3RlbmVycztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICB0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLCB0eXBlLCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lclRyZWUgJiYgcmVjdXJzaXZlbHlHYXJiYWdlQ29sbGVjdCh0aGlzLmxpc3RlbmVyVHJlZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZkFueSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIGkgPSAwLCBsID0gMCwgZm5zO1xuICAgIGlmIChmbiAmJiB0aGlzLl9hbGwgJiYgdGhpcy5fYWxsLmxlbmd0aCA+IDApIHtcbiAgICAgIGZucyA9IHRoaXMuX2FsbDtcbiAgICAgIGZvcihpID0gMCwgbCA9IGZucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYoZm4gPT09IGZuc1tpXSkge1xuICAgICAgICAgIGZucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgaWYgKHRoaXMuX3JlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJBbnlcIiwgZm4pO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZucyA9IHRoaXMuX2FsbDtcbiAgICAgIGlmICh0aGlzLl9yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICBmb3IoaSA9IDAsIGwgPSBmbnMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgIHRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyQW55XCIsIGZuc1tpXSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAhdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLndpbGRjYXJkKSB7XG4gICAgICB2YXIgbGVhZnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBudWxsLCB0eXBlLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCksIGxlYWYsIGk7XG4gICAgICBpZiAoIWxlYWZzKSByZXR1cm4gdGhpcztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZWFmcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZWFmID0gbGVhZnNbaV07XG4gICAgICAgIGxlYWYuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3RlbmVyVHJlZSAmJiByZWN1cnNpdmVseUdhcmJhZ2VDb2xsZWN0KHRoaXMubGlzdGVuZXJUcmVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciBfZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgIHZhciBrZXlzLCBsaXN0ZW5lcnMsIGFsbExpc3RlbmVycztcbiAgICB2YXIgaTtcbiAgICB2YXIgbGlzdGVuZXJUcmVlO1xuXG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2V2ZW50IG5hbWUgcmVxdWlyZWQgZm9yIHdpbGRjYXJkIGVtaXR0ZXInKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFfZXZlbnRzKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAga2V5cyA9IG93bktleXMoX2V2ZW50cyk7XG4gICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICBhbGxMaXN0ZW5lcnMgPSBbXTtcbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIGxpc3RlbmVycyA9IF9ldmVudHNba2V5c1tpXV07XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYWxsTGlzdGVuZXJzLnB1c2gobGlzdGVuZXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxMaXN0ZW5lcnMucHVzaC5hcHBseShhbGxMaXN0ZW5lcnMsIGxpc3RlbmVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgIGxpc3RlbmVyVHJlZT0gdGhpcy5saXN0ZW5lclRyZWU7XG4gICAgICAgIGlmKCFsaXN0ZW5lclRyZWUpIHJldHVybiBbXTtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gW107XG4gICAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBoYW5kbGVycywgbnMsIGxpc3RlbmVyVHJlZSwgMCk7XG4gICAgICAgIHJldHVybiBoYW5kbGVycztcbiAgICAgIH1cblxuICAgICAgaWYgKCFfZXZlbnRzKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gX2V2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicgPyBbbGlzdGVuZXJzXSA6IGxpc3RlbmVycztcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24obnNBc0FycmF5KXtcbiAgICB2YXIgX2V2ZW50cz0gdGhpcy5fZXZlbnRzO1xuICAgIHJldHVybiB0aGlzLndpbGRjYXJkPyBjb2xsZWN0VHJlZUV2ZW50cy5jYWxsKHRoaXMsIHRoaXMubGlzdGVuZXJUcmVlLCBbXSwgbnVsbCwgbnNBc0FycmF5KSA6IChfZXZlbnRzPyBvd25LZXlzKF9ldmVudHMpIDogW10pO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnModHlwZSkubGVuZ3RoO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBpZiAodGhpcy53aWxkY2FyZCkge1xuICAgICAgdmFyIGhhbmRsZXJzID0gW107XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIGhhbmRsZXJzLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgICAgcmV0dXJuIGhhbmRsZXJzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgdmFyIF9ldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgdmFyIF9hbGwgPSB0aGlzLl9hbGw7XG5cbiAgICByZXR1cm4gISEoX2FsbCAmJiBfYWxsLmxlbmd0aCB8fCBfZXZlbnRzICYmICh0eXBlID09PSB1bmRlZmluZWQgPyBvd25LZXlzKF9ldmVudHMpLmxlbmd0aCA6IF9ldmVudHNbdHlwZV0pKTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyc0FueSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYodGhpcy5fYWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbiAoZXZlbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb3B0aW9ucztcbiAgICBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMgPSB7dGltZW91dDogb3B0aW9uc307XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zID0ge2ZpbHRlcjogb3B0aW9uc307XG4gICAgfVxuXG4gICAgb3B0aW9ucz0gcmVzb2x2ZU9wdGlvbnMob3B0aW9ucywge1xuICAgICAgdGltZW91dDogMCxcbiAgICAgIGZpbHRlcjogdW5kZWZpbmVkLFxuICAgICAgaGFuZGxlRXJyb3I6IGZhbHNlLFxuICAgICAgUHJvbWlzZTogUHJvbWlzZSxcbiAgICAgIG92ZXJsb2FkOiBmYWxzZVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogZnVuY3Rpb25SZWR1Y2VyLFxuICAgICAgUHJvbWlzZTogY29uc3RydWN0b3JSZWR1Y2VyXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFrZUNhbmNlbGFibGVQcm9taXNlKG9wdGlvbnMuUHJvbWlzZSwgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCwgb25DYW5jZWwpIHtcbiAgICAgIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgICB2YXIgZmlsdGVyPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgaWYgKGZpbHRlciAmJiAhZmlsdGVyLmFwcGx5KHNlbGYsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5vZmYoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFuZGxlRXJyb3IpIHtcbiAgICAgICAgICB2YXIgZXJyID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgIGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZSh0b0FycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cykuc2xpY2UoMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUodG9BcnJheS5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbkNhbmNlbChmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLm9mZihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIHNlbGYuX29uKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIH0sIHtcbiAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCxcbiAgICAgIG92ZXJsb2FkOiBvcHRpb25zLm92ZXJsb2FkXG4gICAgfSlcbiAgfTtcblxuICBmdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zPSByZXNvbHZlT3B0aW9ucyhvcHRpb25zLCB7XG4gICAgICBQcm9taXNlOiBQcm9taXNlLFxuICAgICAgdGltZW91dDogMCxcbiAgICAgIG92ZXJsb2FkOiBmYWxzZVxuICAgIH0sIHtcbiAgICAgIFByb21pc2U6IGNvbnN0cnVjdG9yUmVkdWNlclxuICAgIH0pO1xuXG4gICAgdmFyIF9Qcm9taXNlPSBvcHRpb25zLlByb21pc2U7XG5cbiAgICByZXR1cm4gbWFrZUNhbmNlbGFibGVQcm9taXNlKF9Qcm9taXNlLCBmdW5jdGlvbihyZXNvbHZlLCByZWplY3QsIG9uQ2FuY2VsKXtcbiAgICAgIHZhciBoYW5kbGVyO1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGFuZGxlcj0gIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXNvbHZlKHRvQXJyYXkuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgb25DYW5jZWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAge29uY2U6IHRydWV9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICBlcnJvckxpc3RlbmVyICYmIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICAgIHJlc29sdmUodG9BcnJheS5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBlcnJvckxpc3RlbmVyO1xuXG4gICAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgICBlcnJvckxpc3RlbmVyID0gZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBldmVudExpc3RlbmVyKTtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbWl0dGVyLm9uY2UoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIG9uQ2FuY2VsKGZ1bmN0aW9uKCl7XG4gICAgICAgIGVycm9yTGlzdGVuZXIgJiYgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBldmVudExpc3RlbmVyKTtcbiAgICAgIH0pO1xuXG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgZXZlbnRMaXN0ZW5lcik7XG4gICAgfSwge1xuICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0LFxuICAgICAgb3ZlcmxvYWQ6IG9wdGlvbnMub3ZlcmxvYWRcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBwcm90b3R5cGU9IEV2ZW50RW1pdHRlci5wcm90b3R5cGU7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoRXZlbnRFbWl0dGVyLCB7XG4gICAgZGVmYXVsdE1heExpc3RlbmVyczoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm90b3R5cGUuX21heExpc3RlbmVycztcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVyLmlzTmFOKG4pKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJylcbiAgICAgICAgfVxuICAgICAgICBwcm90b3R5cGUuX21heExpc3RlbmVycyA9IG47XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgb25jZToge1xuICAgICAgdmFsdWU6IG9uY2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvdG90eXBlLCB7XG4gICAgICBfbWF4TGlzdGVuZXJzOiB7XG4gICAgICAgICAgdmFsdWU6IGRlZmF1bHRNYXhMaXN0ZW5lcnMsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9LFxuICAgICAgX29ic2VydmVyczoge3ZhbHVlOiBudWxsLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfVxuICB9KTtcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gZ2xvYmFsIGZvciBhbnkga2luZCBvZiBlbnZpcm9ubWVudC5cbiAgICB2YXIgX2dsb2JhbD0gbmV3IEZ1bmN0aW9uKCcnLCdyZXR1cm4gdGhpcycpKCk7XG4gICAgX2dsb2JhbC5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuICB9XG59KCk7XG4iLCAiZXhwb3J0IGNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuZXhwb3J0IGNvbnN0IG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRXYXNtID0gdHlwZW9mIFdlYkFzc2VtYmx5ID09PSAnb2JqZWN0JztcblxuZXhwb3J0IGNvbnN0IGlkbGVDYWxsYmFjayA9XG4gIHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWw6IGFueSkge1xuICByZXR1cm4gdmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWw6IGFueSk6IHZhbCBpcyBPYmplY3Qge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUodmFsOiBhbnkpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IGFueSk6IG9iaiBpcyBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmV4cG9ydCBmdW5jdGlvbiBoYXNPd24ob2JqOiBhbnksIGtleTogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmKG9iajogT2JqZWN0LCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldDogKHZhbDogYW55KSA9PiB7XG4gICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgaWYgKHZhbCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICBlcnJvcihgVHJ5IHRvIG1vZGlmeSBhIHJlYWQtb25seSBwcm9wZXJ0eSAke2tleX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSA/IHRydWUgOiBmYWxzZSxcbiAgfSk7XG59XG5cbi8vIEFycmF5IHRvIE9iamVjdCBgWydhJ10gPT4geyBhOiB0cnVlIH1gXG5leHBvcnQgZnVuY3Rpb24gbWFrZU1hcDxUIGV4dGVuZHMgQXJyYXk8UHJvcGVydHlLZXk+PihsaXN0OiBUKSB7XG4gIGNvbnN0IG1hcDogeyBbayBpbiBUW251bWJlcl1dOiB0cnVlIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBtYXBbbGlzdFtpXV0gPSB0cnVlO1xuICB9XG4gIHJldHVybiAodmFsOiBQcm9wZXJ0eUtleSkgPT4gISFtYXBbdmFsXTtcbn1cblxuLy8gQXJyYXkgdG8gT2JqZWN0IGBbJ2EnXSA9PiB7IGE6IHRydWUgfWBcbmV4cG9ydCBmdW5jdGlvbiBtYWtlTWFwT2JqZWN0PFQgZXh0ZW5kcyBBcnJheTxzdHJpbmc+PihsaXN0OiBUKSB7XG4gIGNvbnN0IG1hcDogeyBbayBpbiBUW251bWJlcl1dOiB0cnVlIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBtYXBbbGlzdFtpXV0gPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIG1hcCBhcyB7IFtrIGluIFRbbnVtYmVyXV06IHRydWUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluQnJvd3NlcigpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuXG5jb25zdCB3YXJuUHJlZml4ID0gJ1tHYXJmaXNoIHdhcm5pbmddJztcbmNvbnN0IHByb2Nlc3NFcnJvciA9IChcbiAgZXJyb3I6IHN0cmluZyB8IEVycm9yLFxuICBmbjogKHZhbDogc3RyaW5nIHwgRXJyb3IsIGlzU3RyaW5nOiBib29sZWFuKSA9PiB2b2lkLFxuKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVycm9yID0gYCR7d2FyblByZWZpeH06ICR7ZXJyb3J9XFxuXFxuYDtcbiAgICAgIGZuKGVycm9yLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGlmICghZXJyb3IubWVzc2FnZS5zdGFydHNXaXRoKHdhcm5QcmVmaXgpKSB7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSBgJHt3YXJuUHJlZml4fTogJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICB9XG4gICAgICBmbihlcnJvciwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGZuKGVycm9yLCB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdhcm4obXNnOiBzdHJpbmcgfCBFcnJvcikge1xuICBwcm9jZXNzRXJyb3IobXNnLCAoZSwgaXNTdHJpbmcpID0+IHtcbiAgICBjb25zdCB3YXJuTXNnID0gaXNTdHJpbmcgPyBlIDogKGUgYXMgRXJyb3IpLm1lc3NhZ2U7XG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICBjYWxsVGVzdENhbGxiYWNrKHdhcm4sIHdhcm5Nc2cpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4od2Fybk1zZyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3IoZXJyb3I6IHN0cmluZyB8IEVycm9yKSB7XG4gIHByb2Nlc3NFcnJvcihlcnJvciwgKGUsIGlzU3RyaW5nKSA9PiB7XG4gICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZSBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZFVSTChzdHIpIHtcbiAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgJ14oaHR0cHM/OlxcXFwvXFxcXC8pPycgKyAvLyBwcm90b2NvbFxuICAgICAgJygoKFthLXpcXFxcZF0oW2EtelxcXFxkLV0qW2EtelxcXFxkXSkqKVxcXFwuKStbYS16XXsyLH18JyArIC8vIGRvbWFpbiBuYW1lXG4gICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycgKyAvLyBxdWVyeSBzdHJpbmdcbiAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJyxcbiAgICAnaScsXG4gICk7IC8vIGZyYWdtZW50IGxvY2F0b3JcbiAgcmV0dXJuICEhcGF0dGVybi50ZXN0KHN0cik7XG59XG5cbi8vIFdoZW4gdGhlIHN0cmluZyBpcyBzZXQgYXMgdGhlIG9iamVjdCBwcm9wZXJ0eSBuYW1lLFxuLy8gaXQgd2lsbCBiZSBhdHRlbXB0ZWQgdG8gYmUgdHJhbnNmb3JtZWQgaW50byBhIGNvbnN0YW50IHZlcnNpb24gdG8gYXZvaWQgcmVwZWF0ZWQgY2FjaGluZyBieSB0aGUgYnJvd3NlclxuZXhwb3J0IGZ1bmN0aW9uIGludGVybkZ1bmMoaW50ZXJuYWxpemVTdHJpbmcpIHtcbiAgLy8gRG9uJ3QgY29uc2lkZXIgXCJIYXNoLWNvbGxpc2lvblx1RkYwQ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbGxpc2lvbl8oY29tcHV0ZXJfc2NpZW5jZSlcIlxuICAvLyB2OCBcdThDOENcdTRGM0NcdTU3MjggMTYzODMgXHU5NTdGXHU1RUE2XHU2NUY2XHU0RjFBXHU1M0QxXHU3NTFGIGhhc2gtY29sbGlzaW9uIFx1N0VDRlx1OEZDN1x1NkQ0Qlx1OEJENVx1NTQwRVx1NTNEMVx1NzNCMFx1NkI2M1x1NUUzOFxuICBjb25zdCB0ZW1wb3JhcnlPYiA9IHt9O1xuICB0ZW1wb3JhcnlPYltpbnRlcm5hbGl6ZVN0cmluZ10gPSB0cnVlO1xuICByZXR1cm4gT2JqZWN0LmtleXModGVtcG9yYXJ5T2IpWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbFdpdGhFbnYoXG4gIGNvZGU6IHN0cmluZyxcbiAgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBjb250ZXh0OiBhbnksXG4gIHVzZVN0cmljdCA9IGZhbHNlLFxuKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuICBjb25zdCBuYXRpdmVXaW5kb3cgPSAoMCwgZXZhbCkoJ3dpbmRvdzsnKTtcbiAgLy8gTm8gcmFuZG9tIHZhbHVlIGNhbiBiZSB1c2VkLCBvdGhlcndpc2UgaXQgY2Fubm90IGJlIHJldXNlZCBhcyBhIGNvbnN0YW50IHN0cmluZ1xuICBjb25zdCByYW5kb21WYWxLZXkgPSAnX19nYXJmaXNoX19leGVjX3RlbXBvcmFyeV9fJztcbiAgY29uc3QgdmFsdWVzID0ga2V5cy5tYXAoKGspID0+IGB3aW5kb3cuJHtyYW5kb21WYWxLZXl9LiR7a31gKTtcbiAgY29uc3QgY29udGV4dEtleSA9ICdfX2dhcmZpc2hfZXhlY190ZW1wb3JhcnlfY29udGV4dF9fJztcblxuICB0cnkge1xuICAgIG5hdGl2ZVdpbmRvd1tyYW5kb21WYWxLZXldID0gcGFyYW1zO1xuICAgIG5hdGl2ZVdpbmRvd1tjb250ZXh0S2V5XSA9IGNvbnRleHQ7XG4gICAgY29uc3QgZXZhbEluZm8gPSBbXG4gICAgICBgOyhmdW5jdGlvbigke2tleXMuam9pbignLCcpfSl7JHt1c2VTdHJpY3QgPyAnXCJ1c2Ugc3RyaWN0XCI7JyA6ICcnfWAsXG4gICAgICBgXFxufSkuY2FsbCh3aW5kb3cuJHtjb250ZXh0S2V5fSwke3ZhbHVlcy5qb2luKCcsJyl9KTtgLFxuICAgIF07XG4gICAgY29uc3QgaW50ZXJuYWxpemVTdHJpbmcgPSBpbnRlcm5GdW5jKGV2YWxJbmZvWzBdICsgY29kZSArIGV2YWxJbmZvWzFdKTtcbiAgICAvLyAoMCwgZXZhbCkgVGhpcyBleHByZXNzaW9uIG1ha2VzIHRoZSBldmFsIHVuZGVyIHRoZSBnbG9iYWwgc2NvcGVcbiAgICAoMCwgZXZhbCkoaW50ZXJuYWxpemVTdHJpbmcpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBkZWxldGUgbmF0aXZlV2luZG93W3JhbmRvbVZhbEtleV07XG4gICAgZGVsZXRlIG5hdGl2ZVdpbmRvd1tjb250ZXh0S2V5XTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FmZVdyYXBwZXIoY2FsbGJhY2s6ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiBhbnkpIHtcbiAgdHJ5IHtcbiAgICBjYWxsYmFjaygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soY2I6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQoXG4gIGNvbmRpdGlvbjogYW55LFxuICBtc2c/OiBzdHJpbmcgfCBFcnJvcixcbik6IGFzc2VydHMgY29uZGl0aW9uIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICBlcnJvcihtc2cgfHwgJ3Vua25vdyByZWFzb24nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Cb29sZWFuKHZhbDogYW55KSB7XG4gIGlmICh2YWwgPT09ICcnKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHZhbCA9PT0gJ2ZhbHNlJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gQm9vbGVhbih2YWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlPFQ+KGxpc3Q6IEFycmF5PFQ+IHwgU2V0PFQ+LCBlbDogVCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgIGNvbnN0IGkgPSBsaXN0LmluZGV4T2YoZWwpO1xuICAgIGlmIChpID4gLTEpIHtcbiAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAobGlzdC5oYXMoZWwpKSB7XG4gICAgICBsaXN0LmRlbGV0ZShlbCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIFx1NjcwOVx1NEU5Qlx1NkQ0Qlx1OEJENSBqZXN0Lm1vY2sgXHU0RTBEXHU1OTdEXHU2RDRCXHVGRjBDXHU1M0VGXHU3NTI4XHU4RkQ5XHU0RTJBXHU1REU1XHU1MTc3XHU2NUI5XHU2Q0Q1XG5leHBvcnQgZnVuY3Rpb24gY2FsbFRlc3RDYWxsYmFjayhvYmo6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgaWYgKGZhbHNlKSB7XG4gICAgY29uc3Qgb25jYWxsZWQgPSBvYmouX29uY2FsbGVkO1xuICAgIGlmICh0eXBlb2Ygb25jYWxsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9uY2FsbGVkLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBcdTY1NzBcdTdFQzRcdTUzQkJcdTkxQ0RcdUZGMENcdTRFMERcdTRGRERcdThCQzFcdTk4N0FcdTVFOEZcbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWU8VD4obGlzdDogQXJyYXk8VD4pIHtcbiAgY29uc3QgcmVzOiBBcnJheTxUPiA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdFtqXSkge1xuICAgICAgICBqID0gKytpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMucHVzaChsaXN0W2ldKTtcbiAgfVxuICByZXR1cm4gZmFsc2UgPyByZXMuc29ydCgpIDogcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsOiBhbnkpIHtcbiAgcmV0dXJuIChcbiAgICB2YWwgPT09IG51bGwgfHxcbiAgICB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyB8fFxuICAgIHR5cGVvZiB2YWwgPT09ICdudW1iZXInIHx8XG4gICAgdHlwZW9mIHZhbCA9PT0gJ2JpZ2ludCcgfHxcbiAgICB0eXBlb2YgdmFsID09PSAnc3ltYm9sJyB8fFxuICAgIHR5cGVvZiB2YWwgPT09ICdib29sZWFuJyB8fFxuICAgIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJVbmRlZmluZWRWYWw8VCBleHRlbmRzIE9iamVjdD4ob2I6IFQpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iKS5yZWR1Y2UoKHJlczogVCwga2V5OiBhbnkpID0+IHtcbiAgICBpZiAocmVzW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVsZXRlIHJlc1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9LCBvYik7XG59XG5cbi8vIERlZXBseSBtZXJnZSB0d28gb2JqZWN0cywgY2FuIGhhbmRsZSBjaXJjdWxhciByZWZlcmVuY2VzLCB0aGUgbGF0dGVyIG92ZXJ3cml0ZSB0aGUgcHJldmlvdXNcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2U8SywgVD4oXG4gIG86IEssXG4gIG46IFQsXG4gIGRwPzogYm9vbGVhbixcbiAgaWdub3Jlcz86IEFycmF5PHN0cmluZz4sXG4pIHtcbiAgY29uc3QgbGVmdFJlY29yZCA9IG5ldyBXZWFrTWFwKCk7XG4gIGNvbnN0IHJpZ2h0UmVjb3JkID0gbmV3IFdlYWtNYXAoKTtcbiAgY29uc3QgdmFsdWVSZWNvcmQgPSBuZXcgV2Vha01hcCgpO1xuICBjb25zdCBpZ25vcmVzTWFwID0gbWFrZU1hcChpZ25vcmVzIHx8IFtdKTtcblxuICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbiAgY29uc3QgaXNBbGxSZWZzID0gKGEsIGIpID0+IHtcbiAgICBpZiAobGVmdFJlY29yZC5oYXMoYSkgfHwgcmlnaHRSZWNvcmQuaGFzKGEpKSB7XG4gICAgICByZXR1cm4gbGVmdFJlY29yZC5oYXMoYikgfHwgcmlnaHRSZWNvcmQuaGFzKGIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjbG9uZSA9ICh2KSA9PiB7XG4gICAgLy8gRGVlcCBjbG9uZVxuICAgIGlmIChpc1ByaW1pdGl2ZSh2KSB8fCB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSBlbHNlIGlmICh2YWx1ZVJlY29yZC5oYXModikpIHtcbiAgICAgIHJldHVybiB2YWx1ZVJlY29yZC5nZXQodik7XG4gICAgfSBlbHNlIGlmIChsZWZ0UmVjb3JkLmhhcyh2KSkge1xuICAgICAgcmV0dXJuIGxlZnRSZWNvcmQuZ2V0KHYpO1xuICAgIH0gZWxzZSBpZiAocmlnaHRSZWNvcmQuaGFzKHYpKSB7XG4gICAgICByZXR1cm4gcmlnaHRSZWNvcmQuZ2V0KHYpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2KSkge1xuICAgICAgaWYgKGRwKSB2ID0gdW5pcXVlKHYpO1xuICAgICAgY29uc3QgYXJyOiBBcnJheTxhbnk+ID0gW107XG4gICAgICB2YWx1ZVJlY29yZC5zZXQodiwgYXJyKTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGFycltpXSA9IGNsb25lKHZbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICB2YWx1ZVJlY29yZC5zZXQodiwgb2JqKTtcbiAgICAgIGNvbnN0IGtleXMgPSBSZWZsZWN0Lm93bktleXModik7XG4gICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4gKG9ialtrZXldID0gY2xvbmUodltrZXldKSkpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0VmFsdWUgPSAociwgaywga2V5KSA9PiB7XG4gICAgaWYgKHIuaGFzKGspKSB7XG4gICAgICByZXR1cm4gci5nZXQoayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElnbm9yZSB0aGUgY29udGVudCBkb2VzIG5vdCBuZWVkIHRvIGNvcHlcbiAgICAgIGlmIChpZ25vcmVzTWFwW2tleV0pIHtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSBjbG9uZShrKTtcbiAgICAgIGlmICghaXNQcmltaXRpdmUodmFsKSAmJiB0eXBlb2YgdmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHIuc2V0KGssIHZhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBtZXJnZU9iamVjdCA9IChsLCByKSA9PiB7XG4gICAgY29uc3QgcmVzID0ge307XG4gICAgY29uc3QgbGVmdEtleXMgPSBSZWZsZWN0Lm93bktleXMobCk7XG4gICAgY29uc3QgcmlnaHRLZXlzID0gUmVmbGVjdC5vd25LZXlzKHIpO1xuXG4gICAgbGVmdFJlY29yZC5zZXQobCwgcmVzKTtcbiAgICByaWdodFJlY29yZC5zZXQociwgcmVzKTtcblxuICAgIGxlZnRLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgbHYgPSBsW2tleV07XG4gICAgICBjb25zdCBydiA9IHJba2V5XTtcblxuICAgICAgaWYgKGhhc093bihyLCBrZXkpKSB7XG4gICAgICAgIGlmIChpc0FycmF5KGx2KSAmJiBpc0FycmF5KHJ2KSkge1xuICAgICAgICAgIGNvbnN0IGl0ZW0gPSBjbG9uZShbLi4ubHYsIC4uLnJ2XSk7XG4gICAgICAgICAgcmVzW2tleV0gPSBkcCA/IHVuaXF1ZShpdGVtKSA6IGl0ZW07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChsdikgJiYgaXNQbGFpbk9iamVjdChydikpIHtcbiAgICAgICAgICByZXNba2V5XSA9IGlzQWxsUmVmcyhsdiwgcnYpXG4gICAgICAgICAgICA/IGxlZnRSZWNvcmQuZ2V0KGx2KSAvLyBUaGUgc2FtZSB2YWx1ZSBvbiB0aGUgbGVmdCBhbmQgcmlnaHQsIHdoaWNoZXZlciBpcyBPS1xuICAgICAgICAgICAgOiBtZXJnZU9iamVjdChsdiwgcnYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1trZXldID0gc2V0VmFsdWUocmlnaHRSZWNvcmQsIHJ2LCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNba2V5XSA9IHNldFZhbHVlKGxlZnRSZWNvcmQsIGx2LCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmlnaHRLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGhhc093bihyZXMsIGtleSkpIHJldHVybjtcbiAgICAgIHJlc1trZXldID0gc2V0VmFsdWUocmlnaHRSZWNvcmQsIHJba2V5XSwga2V5KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgcmV0dXJuIG1lcmdlT2JqZWN0KG8sIG4pIGFzIEsgJiBUO1xufVxuXG4vLyBTY2hlbWU6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4xXG4vLyBBYnNvbHV0ZSBVUkw6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNC4zXG5leHBvcnQgZnVuY3Rpb24gaXNBYnNvbHV0ZSh1cmw6IHN0cmluZykge1xuICAvLyBgYzpcXFxcYCBcdThGRDlcdTc5Q0QgY2FzZSBcdThGRDRcdTU2REUgZmFsc2VcdUZGMENcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTU2RkVcdTcyNDdcdUZGMENcdTVFOTRcdThCRTVcdTc1MjggZmlsZSBcdTUzNEZcdThCQUVcbiAgaWYgKCEvXlthLXpBLVpdOlxcXFwvLnRlc3QodXJsKSkge1xuICAgIGlmICgvXlthLXpBLVpdW2EtekEtWlxcZCtcXC0uXSo6Ly50ZXN0KHVybCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1VcmwocmVzb2x2ZVBhdGg6IHN0cmluZywgY3VyUGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IGJhc2VVcmwgPSBuZXcgVVJMKHJlc29sdmVQYXRoLCBsb2NhdGlvbi5ocmVmKTtcbiAgY29uc3QgcmVhbFBhdGggPSBuZXcgVVJMKGN1clBhdGgsIGJhc2VVcmwuaHJlZik7XG4gIHJldHVybiByZWFsUGF0aC5ocmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Xc1Byb3RvY29sKHVybDogc3RyaW5nKSB7XG4gIGNvbnN0IGRhdGEgPSBuZXcgVVJMKHVybCk7XG4gIGlmIChkYXRhLnByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgIGRhdGEucHJvdG9jb2wgPSBkYXRhLnByb3RvY29sID09PSAnaHR0cHM6JyA/ICd3c3M6JyA6ICd3czonO1xuICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRUYXJnZXQoXG4gIGVsOiBFbGVtZW50IHwgU2hhZG93Um9vdCB8IERvY3VtZW50LFxuICBzZWxlY3RvcnM6IEFycmF5PHN0cmluZz4sXG4pIHtcbiAgZm9yIChjb25zdCBzIG9mIHNlbGVjdG9ycykge1xuICAgIGNvbnN0IHRhcmdldCA9IGVsLnF1ZXJ5U2VsZWN0b3Iocyk7XG4gICAgaWYgKHRhcmdldCkgcmV0dXJuIHRhcmdldDtcbiAgfVxuICByZXR1cm4gZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREb2NDdXJyZW50U2NyaXB0KFxuICB0YXJnZXQsXG4gIGNvZGU6IHN0cmluZyxcbiAgZGVmaW5lPzogYm9vbGVhbixcbiAgdXJsPzogc3RyaW5nLFxuICBhc3luYz86IGJvb2xlYW4sXG4gIG9yaWdpblNjcmlwdD86IEhUTUxTY3JpcHRFbGVtZW50LFxuKSB7XG4gIGlmICghdGFyZ2V0KSByZXR1cm4gbm9vcDtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgXG4gIGlmICghdXJsICYmIGNvZGUpIHtcbiAgICBlbC50ZXh0Q29udGVudCA9IGNvZGU7XG4gIH1cblxuICBvcmlnaW5TY3JpcHQgJiYgb3JpZ2luU2NyaXB0LmdldEF0dHJpYnV0ZU5hbWVzKCkuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG4gICAgZWwuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgb3JpZ2luU2NyaXB0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpIHx8ICcnKTtcbiAgfSk7XG5cbiAgaWYgKGFzeW5jKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdhc3luYycsICd0cnVlJyk7XG4gIH1cbiBcbiAgY29uc3Qgc2V0ID0gKHZhbCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVmaW5lKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsICdjdXJyZW50U2NyaXB0Jywge1xuICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5jdXJyZW50U2NyaXB0ID0gdmFsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICB3YXJuKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBzZXQoZWwpO1xuICByZXR1cm4gKCkgPT4gc2FmZVdyYXBwZXIoKCk9PiBkZWxldGUgdGFyZ2V0LmN1cnJlbnRTY3JpcHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2V4dGVuZHMoZCwgYikge1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZCwgYik7XG5cbiAgZnVuY3Rpb24gZk5PUCh0aGlzOiBhbnkpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yID0gZDtcbiAgfVxuXG4gIGlmIChiID09PSBudWxsKSB7XG4gICAgZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGIpO1xuICB9IGVsc2Uge1xuICAgIGlmIChiLnByb3RvdHlwZSkgZk5PUC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9iamVjdChcbiAgb2JqOiBSZWNvcmQ8UHJvcGVydHlLZXksIGFueT4sXG4gIGZuOiAoa2V5OiBQcm9wZXJ0eUtleSwgdmFsOiBhbnkpID0+IGFueSxcbikge1xuICBjb25zdCBkZXN0T2JqZWN0ID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgZGVzdE9iamVjdFtrZXldID0gZm4oa2V5LCBvYmpba2V5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0T2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9CYXNlNjQoaW5wdXQ6IHN0cmluZywgbWltZVR5cGU/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKG5ldyBCbG9iKFtpbnB1dF0sIHsgdHlwZTogbWltZVR5cGUgfSkpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBob29rT2JqZWN0UHJvcGVydHkgPSA8XG4gIFQgZXh0ZW5kcyB7fSxcbiAgSyBleHRlbmRzIGtleW9mIFQsXG4gIFAgZXh0ZW5kcyBhbnlbXSxcbj4oXG4gIG9iajogVCxcbiAga2V5OiBLLFxuICBob29rRnVuYzogKG9yaWdpbjogVFtLXSwgLi4ucGFyYW1zOiBQKSA9PiBUW0tdLFxuKSA9PiB7XG4gIHJldHVybiAoLi4ucGFyYW1zOiBQKSA9PiB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW4gPSBvYmpba2V5XTtcbiAgICBjb25zdCBob29rZWRVbnNhZmUgPSBob29rRnVuYyhvcmlnaW4sIC4uLnBhcmFtcyk7XG4gICAgbGV0IGhvb2tlZCA9IGhvb2tlZFVuc2FmZTtcblxuICAgIC8vIFRvIG1ldGhvZCBwYWNrYWdlcyBhIGxheWVyIG9mIGEgdHJ5IGFmdGVyIGFsbCB0aGUgaG9va3MgdG8gY2F0Y2hcbiAgICBpZiAodHlwZW9mIGhvb2tlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaG9va2VkID0gZnVuY3Rpb24gKHRoaXM6IGFueSwgLi4uYXJnczogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIChob29rZWRVbnNhZmUgYXMgYW55KS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiB0eXBlb2Ygb3JpZ2luID09PSAnZnVuY3Rpb24nICYmIG9yaWdpbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSBhcyBhbnkgYXMgVFtLXTtcbiAgICB9XG4gICAgb2JqW2tleV0gPSBob29rZWQ7XG5cbiAgICByZXR1cm4gKHN0cmljdD86IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICghc3RyaWN0IHx8IGhvb2tlZCA9PT0gb2JqW2tleV0pIHtcbiAgICAgICAgb2JqW2tleV0gPSBvcmlnaW47XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYpIHtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1s/Jl0nICsgbmFtZSArICcoPShbXiYjXSopfCZ8I3wkKScpLFxuICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG4gIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XG4gIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xuICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2FyZmlzaERlYnVnSW5zdGFuY2VOYW1lKCk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBERUJVR19HQVJGSVNIX1RBRyA9ICdfX0dBUkZJU0hfSU5TVEFOQ0VfREVCVUdfXyc7XG4gIHJldHVybiAoXG4gICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oREVCVUdfR0FSRklTSF9UQUcpIHx8XG4gICAgZ2V0UGFyYW1ldGVyQnlOYW1lKERFQlVHX0dBUkZJU0hfVEFHKVxuICApO1xufVxuXG4vLyBSZWZsZWN0LnNldCB3aWxsIGJlIGNhbGxlZCBpbiB0aGUgc2V0IGNhbGxiYWNrLCBhbmQgdGhlIERlZmluZVByb3BlcnR5IGNhbGxiYWNrIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIFJlZmxlY3Quc2V0IGlzIGNhbGxlZC5cbi8vIGJ1dCB0aGUgZGVzY3JpcHRvciB2YWx1ZXMgXHUyMDBCXHUyMDBCd3JpdGFibGUsIGVudW1lcmFibGUsIGFuZCBjb25maWd1cmFibGUgb24gc2FmYXJpIDEzLnggdmVyc2lvbiBhcmUgc2V0IHRvIGZhbHNlIGZvciB0aGUgc2Vjb25kIHRpbWVcbi8vIHNldCBhbmQgZGVmaW5lUHJvcGVydHkgY2FsbGJhY2sgaXMgYXN5bmMgU3luY2hyb25pemUgYmFja1xuLy8gU2V0IHRoZSBkZWZhdWx0IHdoZW4gY2FsbGluZyBkZWZpbmVQcm9wZXJ0eSB0aHJvdWdoIHNldCBcdTIwMEJcdTIwMEJ3cml0YWJsZSwgZW51bWVyYWJsZSwgYW5kIGNvbmZpZ3VyYWJsZSBkZWZhdWx0IHRvIHRydWVcbi8vIHNhZmFyaSAxMy54IGRlZmF1bHQgdXNlIHN0cmljdCBtb2RlXHVGRjBDZGVzY3JpcHRvcidzIFx1MjAwQlx1MjAwQndyaXRhYmxlIGlzIGZhbHNlIGNhbid0IHNldCBhZ2FpblxuLy8gZGVhbCBzYWZhcmkgMTNcbmV4cG9ydCBmdW5jdGlvbiBzYWZhcmkxM0RlYWwoKSB7XG4gIGxldCBmcm9tU2V0RmxhZyA9IGZhbHNlO1xuICByZXR1cm4ge1xuICAgIHRyaWdnZXJTZXQoKSB7XG4gICAgICBmcm9tU2V0RmxhZyA9IHRydWU7XG4gICAgfSxcbiAgICAvLyByZWFzb246IFJlZmxlY3Quc2V0XG4gICAgLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIHVzZWQgdG8gaW1wbGVtZW50LCBzbyBkZWZpbmVQcm9wZXJ0eSBpcyB0cmlnZ2VyZWQgd2hlbiBzZXQgaXMgdHJpZ2dlcmVkXG4gICAgLy8gYnV0IHRoZSBkZXNjcmlwdG9yIHZhbHVlcyBcdTIwMEJcdTIwMEJ3cml0YWJsZSwgZW51bWVyYWJsZSwgYW5kIGNvbmZpZ3VyYWJsZSBvbiBzYWZhcmkgMTMueCB2ZXJzaW9uIGFyZSBzZXQgdG8gZmFsc2UgZm9yIHRoZSBzZWNvbmQgdGltZVxuICAgIGhhbmRsZURlc2NyaXB0b3IoZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgICBpZiAoZnJvbVNldEZsYWcgPT09IHRydWUpIHtcbiAgICAgICAgZnJvbVNldEZsYWcgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3I/LndyaXRhYmxlID09PSBmYWxzZSkgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yPy5lbnVtZXJhYmxlID09PSBmYWxzZSkgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3I/LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5jb25zdCBTT1VSQ0VNQVBfUkVHID0gL1tAI10gc291cmNlTWFwcGluZ1VSTD0vZztcbmV4cG9ydCBmdW5jdGlvbiBoYXZlU291cmNlbWFwKGNvZGU6IHN0cmluZykge1xuICByZXR1cm4gU09VUkNFTUFQX1JFRy50ZXN0KGNvZGUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlU291cmNlbWFwKGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZykge1xuICBjb25zdCBjb250ZW50ID0gYXdhaXQgdG9CYXNlNjQoXG4gICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgdmVyc2lvbjogMyxcbiAgICAgIHNvdXJjZXM6IFtmaWxlbmFtZV0sXG4gICAgICBzb3VyY2VzQ29udGVudDogW2NvZGVdLFxuICAgICAgbWFwcGluZ3M6XG4gICAgICAgICc7JyArXG4gICAgICAgIGNvZGVcbiAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgLm1hcCgoKSA9PiAnQUFDQScpXG4gICAgICAgICAgLmpvaW4oJzsnKSxcbiAgICB9KSxcbiAgKTtcbiAgcmV0dXJuIGAvL0Agc291cmNlTWFwcGluZ1VSTD0ke2NvbnRlbnR9YDtcbn1cbiIsICJpbnRlcmZhY2UgRGVmZXIge1xuICByZXNvbHZlOiAodmFsdWU/OiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXVlIHtcbiAgcHJpdmF0ZSBmeDogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgaW5pdCA9IHRydWU7XG4gIHByaXZhdGUgbG9jayA9IGZhbHNlO1xuICBwcml2YXRlIGZpbmlzaERlZmVycyA9IG5ldyBTZXQ8RGVmZXI+KCk7XG5cbiAgcHJpdmF0ZSBuZXh0KCkge1xuICAgIGlmICghdGhpcy5sb2NrKSB7XG4gICAgICB0aGlzLmxvY2sgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuZngubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XG4gICAgICAgIHRoaXMuZmluaXNoRGVmZXJzLmZvckVhY2goKGQpID0+IGQucmVzb2x2ZSgpKTtcbiAgICAgICAgdGhpcy5maW5pc2hEZWZlcnMuY2xlYXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZuID0gdGhpcy5meC5zaGlmdCgpO1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICBmbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkKGZuOiAobmV4dDogKCkgPT4gdm9pZCkgPT4gdm9pZCkge1xuICAgIHRoaXMuZngucHVzaChmbik7XG4gICAgaWYgKHRoaXMuaW5pdCkge1xuICAgICAgdGhpcy5sb2NrID0gZmFsc2U7XG4gICAgICB0aGlzLmluaXQgPSBmYWxzZTtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGF3YWl0Q29tcGxldGlvbigpIHtcbiAgICBpZiAodGhpcy5pbml0KSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgY29uc3QgZGVmZXIgPSB7fSBhcyBEZWZlcjtcbiAgICB0aGlzLmZpbmlzaERlZmVycy5hZGQoZGVmZXIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkZWZlci5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIGRlZmVyLnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgfVxufVxuIiwgIi8vIGNvcHkgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2V0c2VudHJ5L3NlbnRyeS1qYXZhc2NyaXB0L2Jsb2IvNi40LjAvcGFja2FnZXMvYnJvd3Nlci9zcmMvdHJhY2VraXQudHNcbmltcG9ydCB7IG1ha2VNYXAgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGFja0ZyYW1lIHtcbiAgdXJsOiBzdHJpbmc7XG4gIGZ1bmM6IHN0cmluZztcbiAgYXJnczogc3RyaW5nW107XG4gIGxpbmU6IG51bWJlciB8IG51bGw7XG4gIGNvbHVtbjogbnVtYmVyIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFja1RyYWNlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIG1lY2hhbmlzbT86IHN0cmluZztcbiAgc3RhY2s6IFN0YWNrRnJhbWVbXTtcbiAgZmFpbGVkPzogYm9vbGVhbjtcbn1cbmNvbnN0IGNocm9tZSA9XG4gIC9eXFxzKmF0ICg/OiguKj8pID9cXCgpPygoPzpmaWxlfGh0dHBzP3xibG9ifGNocm9tZS1leHRlbnNpb258YWRkcmVzc3xuYXRpdmV8ZXZhbHx3ZWJwYWNrfDxhbm9ueW1vdXM+fFstYS16XSs6fC4qYnVuZGxlfFxcLykuKj8pKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFwpP1xccyokL2k7XG4vLyBnZWNrbyByZWdleDogYCg/OmJ1bmRsZXxcXGQrXFwuanMpYDogYGJ1bmRsZWAgaXMgZm9yIHJlYWN0IG5hdGl2ZSwgYFxcZCtcXC5qc2AgYWxzbyBidXQgc3BlY2lmaWNhbGx5IGZvciByYW0gYnVuZGxlcyBiZWNhdXNlIGl0XG4vLyBnZW5lcmF0ZXMgZmlsZW5hbWVzIHdpdGhvdXQgYSBwcmVmaXggbGlrZSBgZmlsZTovL2AgdGhlIGZpbGVuYW1lcyBpbiB0aGUgc3RhY2t0cmFjZSBhcmUganVzdCA0Mi5qc1xuLy8gV2UgbmVlZCB0aGlzIHNwZWNpZmljIGNhc2UgZm9yIG5vdyBiZWNhdXNlIHdlIHdhbnQgbm8gb3RoZXIgcmVnZXggdG8gbWF0Y2guXG5jb25zdCBnZWNrbyA9XG4gIC9eXFxzKiguKj8pKD86XFwoKC4qPylcXCkpPyg/Ol58QCk/KCg/OmZpbGV8aHR0cHM/fGJsb2J8Y2hyb21lfHdlYnBhY2t8cmVzb3VyY2V8bW96LWV4dGVuc2lvbnxjYXBhY2l0b3IpLio/OlxcLy4qP3xcXFtuYXRpdmUgY29kZVxcXXxbXkBdKig/OmJ1bmRsZXxcXGQrXFwuanMpfFxcL1tcXHdcXC0uIC89XSspKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFxzKiQvaTtcbmNvbnN0IHdpbmpzID1cbiAgL15cXHMqYXQgKD86KCg/OlxcW29iamVjdCBvYmplY3RcXF0pPy4rKSApP1xcKD8oKD86ZmlsZXxtcy1hcHB4fGh0dHBzP3x3ZWJwYWNrfGJsb2IpOi4qPyk6KFxcZCspKD86OihcXGQrKSk/XFwpP1xccyokL2k7XG5jb25zdCBnZWNrb0V2YWwgPSAvKFxcUyspIGxpbmUgKFxcZCspKD86ID4gZXZhbCBsaW5lIFxcZCspKiA+IGV2YWwvaTtcbmNvbnN0IGNocm9tZUV2YWwgPSAvXFwoKFxcUyopKD86OihcXGQrKSkoPzo6KFxcZCspKVxcKS87XG4vLyBCYXNlZCBvbiBvdXIgb3duIG1hcHBpbmcgcGF0dGVybiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9nZXRzZW50cnkvc2VudHJ5L2Jsb2IvOWYwODMwNWUwOTg2NmM4YmQ2ZDBjMjRmNWIwYWFiZGQ3ZGQ2YzU5Yy9zcmMvc2VudHJ5L2xhbmcvamF2YXNjcmlwdC9lcnJvcm1hcHBpbmcucHkjTDgzLUwxMDhcbmNvbnN0IHJlYWN0TWluaWZpZWRSZWdleHAgPSAvTWluaWZpZWQgUmVhY3QgZXJyb3IgI1xcZCs7L2k7XG5cbmNvbnN0IFVOS05PV05fRlVOQ1RJT04gPSAnPyc7XG5mdW5jdGlvbiBleHRyYWN0TWVzc2FnZShleDogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgbWVzc2FnZSA9IGV4ICYmIGV4Lm1lc3NhZ2U7XG4gIGlmICghbWVzc2FnZSkge1xuICAgIHJldHVybiAnTm8gZXJyb3IgbWVzc2FnZSc7XG4gIH1cbiAgaWYgKG1lc3NhZ2UuZXJyb3IgJiYgdHlwZW9mIG1lc3NhZ2UuZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5tZXNzYWdlO1xuICB9XG4gIHJldHVybiBtZXNzYWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4OiBhbnkpOiBTdGFja1RyYWNlIHwgbnVsbCB7XG4gIGlmICghZXggfHwgIWV4LnN0YWNrKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBzdGFjazogQXJyYXk8YW55PiA9IFtdO1xuICBjb25zdCBsaW5lcyA9IGV4LnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgbGV0IGlzRXZhbDtcbiAgbGV0IHN1Ym1hdGNoO1xuICBsZXQgcGFydHM7XG4gIGxldCBlbGVtZW50O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHBhcnRzID0gY2hyb21lLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgY29uc3QgaXNOYXRpdmUgPSBwYXJ0c1syXSAmJiBwYXJ0c1syXS5pbmRleE9mKCduYXRpdmUnKSA9PT0gMDsgLy8gc3RhcnQgb2YgbGluZVxuICAgICAgaXNFdmFsID0gcGFydHNbMl0gJiYgcGFydHNbMl0uaW5kZXhPZignZXZhbCcpID09PSAwOyAvLyBzdGFydCBvZiBsaW5lXG4gICAgICBpZiAoaXNFdmFsICYmIChzdWJtYXRjaCA9IGNocm9tZUV2YWwuZXhlYyhwYXJ0c1syXSkpKSB7XG4gICAgICAgIC8vIHRocm93IG91dCBldmFsIGxpbmUvY29sdW1uIGFuZCB1c2UgdG9wLW1vc3QgbGluZS9jb2x1bW4gbnVtYmVyXG4gICAgICAgIHBhcnRzWzJdID0gc3VibWF0Y2hbMV07IC8vIHVybFxuICAgICAgfVxuXG4gICAgICAvLyBBcnBhZDogV29ya2luZyB3aXRoIHRoZSByZWdleHAgYWJvdmUgaXMgc3VwZXIgcGFpbmZ1bC4gaXQgaXMgcXVpdGUgYSBoYWNrLCBidXQganVzdCBzdHJpcHBpbmcgdGhlIGBhZGRyZXNzIGF0IGBcbiAgICAgIC8vIHByZWZpeCBoZXJlIHNlZW1zIGxpa2UgdGhlIHF1aWNrZXN0IHNvbHV0aW9uIGZvciBub3cuXG4gICAgICBsZXQgdXJsID1cbiAgICAgICAgcGFydHNbMl0gJiYgcGFydHNbMl0uaW5kZXhPZignYWRkcmVzcyBhdCAnKSA9PT0gMFxuICAgICAgICAgID8gcGFydHNbMl0uc3Vic3RyKCdhZGRyZXNzIGF0ICcubGVuZ3RoKVxuICAgICAgICAgIDogcGFydHNbMl07XG5cbiAgICAgIC8vIEthbWlsOiBPbmUgbW9yZSBoYWNrIHdvbid0IGh1cnQgdXMgcmlnaHQ/IFVuZGVyc3RhbmRpbmcgYW5kIGFkZGluZyBtb3JlIHJ1bGVzIG9uIHRvcCBvZiB0aGVzZSByZWdleHBzIHJpZ2h0IG5vd1xuICAgICAgLy8gd291bGQgYmUgd2F5IHRvbyB0aW1lIGNvbnN1bWluZy4gKFRPRE86IFJld3JpdGUgd2hvbGUgUmVnRXhwIHRvIGJlIG1vcmUgcmVhZGFibGUpXG4gICAgICBsZXQgZnVuYyA9IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT047XG4gICAgICBjb25zdCBpc1NhZmFyaUV4dGVuc2lvbiA9IGZ1bmMuaW5kZXhPZignc2FmYXJpLWV4dGVuc2lvbicpICE9PSAtMTtcbiAgICAgIGNvbnN0IGlzU2FmYXJpV2ViRXh0ZW5zaW9uID0gZnVuYy5pbmRleE9mKCdzYWZhcmktd2ViLWV4dGVuc2lvbicpICE9PSAtMTtcbiAgICAgIGlmIChpc1NhZmFyaUV4dGVuc2lvbiB8fCBpc1NhZmFyaVdlYkV4dGVuc2lvbikge1xuICAgICAgICBmdW5jID0gZnVuYy5pbmRleE9mKCdAJykgIT09IC0xID8gZnVuYy5zcGxpdCgnQCcpWzBdIDogVU5LTk9XTl9GVU5DVElPTjtcbiAgICAgICAgdXJsID0gaXNTYWZhcmlFeHRlbnNpb25cbiAgICAgICAgICA/IGBzYWZhcmktZXh0ZW5zaW9uOiR7dXJsfWBcbiAgICAgICAgICA6IGBzYWZhcmktd2ViLWV4dGVuc2lvbjoke3VybH1gO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0ge1xuICAgICAgICB1cmwsXG4gICAgICAgIGZ1bmMsXG4gICAgICAgIGFyZ3M6IGlzTmF0aXZlID8gW3BhcnRzWzJdXSA6IFtdLFxuICAgICAgICBsaW5lOiBwYXJ0c1szXSA/ICtwYXJ0c1szXSA6IG51bGwsXG4gICAgICAgIGNvbHVtbjogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKChwYXJ0cyA9IHdpbmpzLmV4ZWMobGluZXNbaV0pKSkge1xuICAgICAgZWxlbWVudCA9IHtcbiAgICAgICAgdXJsOiBwYXJ0c1syXSxcbiAgICAgICAgZnVuYzogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICAgICAgYXJnczogW10sXG4gICAgICAgIGxpbmU6ICtwYXJ0c1szXSxcbiAgICAgICAgY29sdW1uOiBwYXJ0c1s0XSA/ICtwYXJ0c1s0XSA6IG51bGwsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoKHBhcnRzID0gZ2Vja28uZXhlYyhsaW5lc1tpXSkpKSB7XG4gICAgICBpc0V2YWwgPSBwYXJ0c1szXSAmJiBwYXJ0c1szXS5pbmRleE9mKCcgPiBldmFsJykgPiAtMTtcbiAgICAgIGlmIChpc0V2YWwgJiYgKHN1Ym1hdGNoID0gZ2Vja29FdmFsLmV4ZWMocGFydHNbM10pKSkge1xuICAgICAgICAvLyB0aHJvdyBvdXQgZXZhbCBsaW5lL2NvbHVtbiBhbmQgdXNlIHRvcC1tb3N0IGxpbmUgbnVtYmVyXG4gICAgICAgIHBhcnRzWzFdID0gcGFydHNbMV0gfHwgJ2V2YWwnO1xuICAgICAgICBwYXJ0c1szXSA9IHN1Ym1hdGNoWzFdO1xuICAgICAgICBwYXJ0c1s0XSA9IHN1Ym1hdGNoWzJdO1xuICAgICAgICBwYXJ0c1s1XSA9ICcnOyAvLyBubyBjb2x1bW4gd2hlbiBldmFsXG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDAgJiYgIXBhcnRzWzVdICYmIGV4LmNvbHVtbk51bWJlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIC8vIEZpcmVGb3ggdXNlcyB0aGlzIGF3ZXNvbWUgY29sdW1uTnVtYmVyIHByb3BlcnR5IGZvciBpdHMgdG9wIGZyYW1lXG4gICAgICAgIC8vIEFsc28gbm90ZSwgRmlyZWZveCdzIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZCBhbmQgZXZlcnl0aGluZyBlbHNlIGV4cGVjdHMgMS1iYXNlZCxcbiAgICAgICAgLy8gc28gYWRkaW5nIDFcbiAgICAgICAgLy8gTk9URTogdGhpcyBoYWNrIGRvZXNuJ3Qgd29yayBpZiB0b3AtbW9zdCBmcmFtZSBpcyBldmFsXG4gICAgICAgIHN0YWNrWzBdLmNvbHVtbiA9IChleC5jb2x1bW5OdW1iZXIgYXMgbnVtYmVyKSArIDE7XG4gICAgICB9XG4gICAgICBlbGVtZW50ID0ge1xuICAgICAgICB1cmw6IHBhcnRzWzNdLFxuICAgICAgICBmdW5jOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgICAgICBhcmdzOiBwYXJ0c1syXSA/IHBhcnRzWzJdLnNwbGl0KCcsJykgOiBbXSxcbiAgICAgICAgbGluZTogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsLFxuICAgICAgICBjb2x1bW46IHBhcnRzWzVdID8gK3BhcnRzWzVdIDogbnVsbCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuICAgICAgZWxlbWVudC5mdW5jID0gVU5LTk9XTl9GVU5DVElPTjtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKCFzdGFjay5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogZXh0cmFjdE1lc3NhZ2UoZXgpLFxuICAgIG5hbWU6IGV4Lm5hbWUsXG4gICAgc3RhY2ssXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBzb3VyY2VMaXN0VGFncyA9IFtcbiAgJ2xpbmsnLFxuICAnc3R5bGUnLFxuICAnc2NyaXB0JyxcbiAgJ2ltZycsXG4gICd2aWRlbycsXG4gICdhdWRpbycsXG5dO1xuZXhwb3J0IGNvbnN0IHNvdXJjZU5vZGUgPSBtYWtlTWFwKHNvdXJjZUxpc3RUYWdzKTtcblxuLy8gQ2FsY3VsYXRlIHRoZSBlcnJvciBvYmplY3QgZmlsZSB3aXRoaW4gdGhlIGFkZHJlc3NcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlRXJyb3JVcmwoZXg6IGFueSkge1xuICBpZiAoZXggJiYgZXguZmlsZW5hbWUpIHJldHVybiBleC5maWxlbmFtZTtcbiAgY29uc3QgcmVzID0gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4KTtcbiAgaWYgKHJlcykge1xuICAgIGNvbnN0IHVybHMgPSByZXMuc3RhY2subWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS51cmw7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVybHNbMF0gfHwgbnVsbDtcbiAgfSBlbHNlIGlmIChleCAmJiBleC50YXJnZXQgJiYgZXgudGFyZ2V0LnRhZ05hbWUpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gZXgudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc291cmNlTm9kZSh0YWdOYW1lKSkge1xuICAgICAgcmV0dXJuIGV4LnRhcmdldC5zcmMgfHwgZXgudGFyZ2V0LmhyZWY7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIEZpbHRlciBpcyBub3QgYSBnb2FsIHJlc291cmNlcyBmcm9tIHRoZSBtaXN0YWtlXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQW5kV3JhcEV2ZW50TGlzdGVuZXIoXG4gIHR5cGU6IHN0cmluZyxcbiAgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsXG4gIHNvdXJjZUxpc3Q6IEFycmF5PHN0cmluZz4sXG4pIHtcbiAgY29uc3QgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBDb25mb3JtIHRvIHRoZSBmaWxlIGxpc3QgdHlwZSB0cmlnZ2VyIGNvbGxlY3Rpb24gb2YgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gVGhyb3VnaCBlcnJvciBzdGFjayBzb3VyY2UgZmlsZSwgYW5kIHRoZSBzb3VyY2Ugb2YgdGhlIHN0YXRpYyByZXNvdXJjZXMgZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgZXJyb3IgYmVsb25ncyB0byB0aGUgY3VycmVudCBhcHBsaWNhdGlvblxuICAgICAgLy8gaWYgYmVsb25nIHRvIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIGVudmlyb25tZW50IG1vbml0b3JpbmcgZXJyb3JcbiAgICAgIGlmIChzb3VyY2VMaXN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqJywgY29tcHV0ZUVycm9yVXJsKGUpKTtcbiAgICAgICAgY29uc3QgcmVzID0gc291cmNlTGlzdC5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uaW5kZXhPZihjb21wdXRlRXJyb3JVcmwoZSkpICE9PSAtMTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGxpc3RlbmVyKGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0ZW5lcihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdW5oYW5kbGVkcmVqZWN0aW9uID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJvbWlzZS5jYXRjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBlcnJvckhhbmRsZXIoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSBsaXN0ZW5lcihldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZmlsdGVyRXJyb3I6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBEdWUgdG8gdGhlIGN1cnJlbnQgR2FyZmlzaCByZW5kZXJpbmcgcHJvY2VzcyBpcyBhc3luY2hyb25vdXMgYmVoYXZpb3IgbGVhZGluZyB0byBvcmlnaW5hbGx5ICdlcnJvcicgdHJpZ2dlciBldmVudHMgd2VyZSAndW5oYW5kbGVkcmVqZWN0aW9uJyB0byBjYXRjaFxuICAgIC8vIEZpbHRlcmluZyBlcnJvciBkb2VzIG5vdCBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgYXBwbGljYXRpb24gcmVzb3VyY2VzLCBoYXMgcmVhY2hlZCB0aGUgYXJlYSB0YXJnZXQgYXBwbGljYXRpb24gZXhjZXB0aW9uXG4gICAgLy8gTmVlZCBhIHNhbmRib3ggY2FuIGVmZmVjdGl2ZWx5IGNhcHR1cmUgYW5kIGNyZWF0ZSByZXNvdXJjZXMgaW5jcmVhc2UgYWxsIGNoaWxkIGFwcGxpY2F0aW9uIGNvbnRlbnRcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ3VuaGFuZGxlZHJlamVjdGlvbicpIHtcbiAgICAgICAgdW5oYW5kbGVkcmVqZWN0aW9uKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICBlcnJvckhhbmRsZXIoZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdGVuZXIoZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGZpbHRlckVycm9yO1xufVxuIiwgImltcG9ydCB7IG1ha2VNYXAgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0IHtcbiAgY29udGVudDogc3RyaW5nO1xuICB0eXBlOiAndGV4dCcgfCAnY29tbWVudCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XG4gIGtleT86IHN0cmluZztcbiAgdHlwZTogJ2VsZW1lbnQnO1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBBcnJheTxOb2RlIHwgVGV4dD47XG4gIGF0dHJpYnV0ZXM6IEFycmF5PFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IG51bGw+Pjtcbn1cblxudHlwZSBBdHRyaWJ1dGVzID0gQXJyYXk8UmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVsbD4+O1xuXG5jb25zdCB4Q2hhciA9IDEyMDsgLy8gXCJ4XCIgY2hhclxuY29uc3QgY29sb25DaGFyID0gNTg7IC8vIFwiOlwiIGNoYXJcbmNvbnN0IG5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbmNvbnN0IHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7IC8vIHhtbG5zOnhsaW5rXG5jb25zdCB4bWxOUyA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnOyAvLyB4bWxuc1xuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvRWxlbWVudFxuY29uc3QgU1ZHX1RBR1MgPVxuICAnc3ZnLGFuaW1hdGUsYW5pbWF0ZU1vdGlvbixhbmltYXRlVHJhbnNmb3JtLGNpcmNsZSxjbGlwUGF0aCxjb2xvci1wcm9maWxlLCcgK1xuICAnZGVmcyxkZXNjLGRpc2NhcmQsZWxsaXBzZSxmZUJsZW5kLGZlQ29sb3JNYXRyaXgsZmVDb21wb25lbnRUcmFuc2ZlciwnICtcbiAgJ2ZlQ29tcG9zaXRlLGZlQ29udm9sdmVNYXRyaXgsZmVEaWZmdXNlTGlnaHRpbmcsZmVEaXNwbGFjZW1lbnRNYXAsJyArXG4gICdmZURpc3RhbmNlTGlnaHQsZmVEcm9wU2hhZG93LGZlRmxvb2QsZmVGdW5jQSxmZUZ1bmNCLGZlRnVuY0csZmVGdW5jUiwnICtcbiAgJ2ZlR2F1c3NpYW5CbHVyLGZlSW1hZ2UsZmVNZXJnZSxmZU1lcmdlTm9kZSxmZU1vcnBob2xvZ3ksZmVPZmZzZXQsJyArXG4gICdmZVBvaW50TGlnaHQsZmVTcGVjdWxhckxpZ2h0aW5nLGZlU3BvdExpZ2h0LGZlVGlsZSxmZVR1cmJ1bGVuY2UsZmlsdGVyLCcgK1xuICAnZm9yZWlnbk9iamVjdCxnLGhhdGNoLGhhdGNocGF0aCxpbWFnZSxsaW5lLGxpbmVhckdyYWRpZW50LG1hcmtlcixtYXNrLCcgK1xuICAnbWVzaCxtZXNoZ3JhZGllbnQsbWVzaHBhdGNoLG1lc2hyb3csbWV0YWRhdGEsbXBhdGgscGF0aCxwYXR0ZXJuLCcgK1xuICAncG9seWdvbixwb2x5bGluZSxyYWRpYWxHcmFkaWVudCxyZWN0LHNldCxzb2xpZGNvbG9yLHN0b3Asc3dpdGNoLHN5bWJvbCwnICtcbiAgJ3RleHQsdGV4dFBhdGgsdGl0bGUsdHNwYW4sdW5rbm93bix1c2Usdmlldyc7XG5cbmNvbnN0IGlzU1ZHID0gbWFrZU1hcChTVkdfVEFHUy5zcGxpdCgnLCcpKTtcblxuZnVuY3Rpb24gYXR0cmlidXRlc1N0cmluZyhhdHRyaWJ1dGVzOiBOb2RlWydhdHRyaWJ1dGVzJ10pIHtcbiAgaWYgKCFhdHRyaWJ1dGVzIHx8IGF0dHJpYnV0ZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gIHJldHVybiBhdHRyaWJ1dGVzLnJlZHVjZSgodG90YWwsIHsga2V5LCB2YWx1ZSB9KSA9PiB7XG4gICAgcmV0dXJuIHRvdGFsICsgKHZhbHVlID8gYCR7a2V5fT1cIiR7dmFsdWV9XCIgYCA6IGtleSk7XG4gIH0sICcnKTtcbn1cblxuZXhwb3J0IGNsYXNzIERPTUFwaXMge1xuICBwdWJsaWMgZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGN1c0RvY3VtZW50PzogRG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gY3VzRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIH1cblxuICBpc1RleHQobm9kZTogTm9kZSB8IFRleHQpOiBub2RlIGlzIFRleHQge1xuICAgIHJldHVybiBub2RlICYmIG5vZGUudHlwZSA9PT0gJ3RleHQnO1xuICB9XG5cbiAgaXNOb2RlKG5vZGU6IE5vZGUgfCBUZXh0KSB7XG4gICAgcmV0dXJuIG5vZGUgJiYgbm9kZS50eXBlID09PSAnZWxlbWVudCc7XG4gIH1cblxuICBpc0NvbW1lbnROb2RlKG5vZGU6IE5vZGUgfCBUZXh0KSB7XG4gICAgcmV0dXJuIG5vZGUgJiYgbm9kZS50eXBlID09PSAnY29tbWVudCc7XG4gIH1cblxuICBpc0Nzc0xpbmtOb2RlKG5vZGU6IE5vZGUpIHtcbiAgICBpZiAodGhpcy5pc05vZGUobm9kZSkgJiYgbm9kZS50YWdOYW1lID09PSAnbGluaycpIHtcbiAgICAgIHJldHVybiAhIW5vZGUuYXR0cmlidXRlcy5maW5kKFxuICAgICAgICAoeyBrZXksIHZhbHVlIH0pID0+IGtleSA9PT0gJ3JlbCcgJiYgdmFsdWUgPT09ICdzdHlsZXNoZWV0JyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzSWNvbkxpbmtOb2RlKG5vZGU6IE5vZGUpIHtcbiAgICBpZiAodGhpcy5pc05vZGUobm9kZSkgJiYgbm9kZS50YWdOYW1lID09PSAnbGluaycpIHtcbiAgICAgIHJldHVybiAhIW5vZGUuYXR0cmlidXRlcy5maW5kKFxuICAgICAgICAoeyBrZXksIHZhbHVlIH0pID0+IGtleSA9PT0gJ3JlbCcgJiYgdmFsdWUgPT09ICdpY29uJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzUHJlZmV0Y2hKc0xpbmtOb2RlKG5vZGU6IE5vZGUpIHtcbiAgICBpZiAoIXRoaXMuaXNOb2RlKG5vZGUpIHx8IG5vZGUudGFnTmFtZSAhPT0gJ2xpbmsnKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IGhhc1JlbEF0dHIsIGhhc0FzQXR0cjtcbiAgICBmb3IgKGNvbnN0IHsga2V5LCB2YWx1ZSB9IG9mIG5vZGUuYXR0cmlidXRlcykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbCcpIHtcbiAgICAgICAgaGFzUmVsQXR0ciA9IHRydWU7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ3ByZWxvYWQnICYmIHZhbHVlICE9PSAncHJlZmV0Y2gnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2FzJykge1xuICAgICAgICBoYXNBc0F0dHIgPSB0cnVlO1xuICAgICAgICBpZiAodmFsdWUgIT09ICdzY3JpcHQnKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKGhhc1JlbEF0dHIgJiYgaGFzQXNBdHRyKTtcbiAgfVxuXG4gIGlzUmVtb3RlTW9kdWxlKG5vZGU6IE5vZGUpIHtcbiAgICBpZiAoIXRoaXMuaXNOb2RlKG5vZGUpIHx8IG5vZGUudGFnTmFtZSAhPT0gJ21ldGEnKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IGhhc05hbWVBdHRyLCBoYXNTcmNBdHRyO1xuICAgIGZvciAoY29uc3QgeyBrZXksIHZhbHVlIH0gb2Ygbm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoa2V5ID09PSAnbmFtZScpIHtcbiAgICAgICAgaGFzTmFtZUF0dHIgPSB0cnVlO1xuICAgICAgICBpZiAodmFsdWUgIT09ICdnYXJmaXNoLXJlbW90ZS1tb2R1bGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3NyYycpIHtcbiAgICAgICAgaGFzU3JjQXR0ciA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihoYXNOYW1lQXR0ciAmJiBoYXNTcmNBdHRyKTtcbiAgfVxuXG4gIHJlbW92ZUVsZW1lbnQoZWw6IEVsZW1lbnQgfCBDb21tZW50KSB7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IGVsICYmIGVsLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobm9kZTogTm9kZSkge1xuICAgIGNvbnN0IHsgdGFnTmFtZSwgYXR0cmlidXRlcyB9ID0gbm9kZTtcbiAgICBjb25zdCBlbCA9IGlzU1ZHKHRhZ05hbWUpXG4gICAgICA/IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWdOYW1lKVxuICAgICAgOiB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICB0aGlzLmFwcGx5QXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgY3JlYXRlVGV4dE5vZGUobm9kZTogVGV4dCkge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUuY29udGVudCk7XG4gIH1cblxuICBjcmVhdGVTdHlsZU5vZGUoY29udGVudDogc3RyaW5nKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY29udGVudCAmJiAoZWwudGV4dENvbnRlbnQgPSBjb250ZW50KTtcbiAgICB0aGlzLmFwcGx5QXR0cmlidXRlcyhlbCwgW3sga2V5OiAndHlwZScsIHZhbHVlOiAndGV4dC9jc3MnIH1dKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBjcmVhdGVMaW5rQ29tbWVudE5vZGUobm9kZTogTm9kZSB8IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzTm9kZShub2RlIGFzIE5vZGUpKSB7XG4gICAgICBjb25zdCBwcyA9IGF0dHJpYnV0ZXNTdHJpbmcoKG5vZGUgYXMgTm9kZSkuYXR0cmlidXRlcyk7XG4gICAgICByZXR1cm4gYDxsaW5rICR7cHMuc2xpY2UoMCwgLTEpfT48L2xpbms+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IG5vZGUgPyBgc3JjPVwiJHtub2RlfVwiIGAgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXG4gICAgICAgIGA8bGluayAke25vZGV9ZXhlY3V0ZSBieSBnYXJmaXNoKGR5bmFtaWMpPjwvbGluaz5gLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVTY3JpcHRDb21tZW50Tm9kZShub2RlOiBOb2RlIHwgeyBjb2RlOiBzdHJpbmc7IHNyYz86IHN0cmluZyB9KSB7XG4gICAgaWYgKHRoaXMuaXNOb2RlKG5vZGUgYXMgTm9kZSkpIHtcbiAgICAgIGNvbnN0IHsgYXR0cmlidXRlcywgY2hpbGRyZW4gfSA9IG5vZGUgYXMgTm9kZTtcbiAgICAgIGNvbnN0IHBzID0gYXR0cmlidXRlc1N0cmluZyhhdHRyaWJ1dGVzKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBjaGlsZHJlbj8uWzBdID8gKGNoaWxkcmVuWzBdIGFzIFRleHQpLmNvbnRlbnQgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXG4gICAgICAgIGA8c2NyaXB0ICR7cHN9IGV4ZWN1dGUgYnkgZ2FyZmlzaD4ke2NvZGV9PC9zY3JpcHQ+YCxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgc3JjLCBjb2RlIH0gPSBub2RlIGFzIGFueTtcbiAgICAgIGNvbnN0IHVybCA9IHNyYyA/IGBzcmM9XCIke3NyY31cIiBgIDogJyc7XG4gICAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5jcmVhdGVDb21tZW50KFxuICAgICAgICBgPHNjcmlwdCAke3VybH1leGVjdXRlIGJ5IGdhcmZpc2goZHluYW1pYyk+JHtjb2RlfTwvc2NyaXB0PmAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5QXR0cmlidXRlcyhlbDogRWxlbWVudCwgYXR0cmlidXRlczogQXR0cmlidXRlcykge1xuICAgIGlmICghYXR0cmlidXRlcyB8fCBhdHRyaWJ1dGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgeyBrZXksIHZhbHVlIH0gb2YgYXR0cmlidXRlcykge1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSAhPT0geENoYXIpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDMpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKHhtbE5TLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDUpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCAiZXhwb3J0IGNvbnN0IF9fTE9BREVSX0ZMQUdfXyA9IFN5bWJvbC5mb3IoJ19fTE9BREVSX0ZMQUdfXycpO1xuZXhwb3J0IGNvbnN0IF9fR0FSRklTSF9GTEFHX18gPSBTeW1ib2wuZm9yKCdfX0dBUkZJU0hfRkxBR19fJyk7XG5leHBvcnQgY29uc3QgX19Nb2NrSHRtbF9fID0gJ19fZ2FyZmlzaG1vY2todG1sX18nO1xuZXhwb3J0IGNvbnN0IF9fTW9ja0JvZHlfXyA9ICdfX2dhcmZpc2htb2NrYm9keV9fJztcbmV4cG9ydCBjb25zdCBfX01vY2tIZWFkX18gPSAnX19nYXJmaXNobW9ja2hlYWRfXyc7XG5leHBvcnQgY29uc3QgX19SRU1PVkVfTk9ERV9fID0gJ19fZ2FyZmlzaHJlbW92ZW5vZGVfXyc7XG4iLCAiZXhwb3J0IHR5cGUgbWltZVR5cGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZUNvbnRlbnRUeXBlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29udGVudFR5cGUoaW5wdXQ6IHN0cmluZykge1xuICBpbnB1dCA9IGlucHV0Py50cmltKCk7XG4gIGlmICghaW5wdXQpIHJldHVybiBudWxsO1xuXG4gIGxldCBpZHggPSAwO1xuICBsZXQgdHlwZSA9ICcnO1xuICBsZXQgc3ViVHlwZSA9ICcnO1xuICB3aGlsZSAoaWR4IDwgaW5wdXQubGVuZ3RoICYmIGlucHV0W2lkeF0gIT09ICcvJykge1xuICAgIHR5cGUgKz0gaW5wdXRbaWR4XTtcbiAgICBpZHgrKztcbiAgfVxuICBpZiAodHlwZS5sZW5ndGggPT09IDAgfHwgaWR4ID49IGlucHV0Lmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGp1bXAgb3ZlciAnLydcbiAgaWR4Kys7XG4gIHdoaWxlIChpZHggPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRbaWR4XSAhPT0gJzsnKSB7XG4gICAgc3ViVHlwZSArPSBpbnB1dFtpZHhdO1xuICAgIGlkeCsrO1xuICB9XG4gIHN1YlR5cGUgPSBzdWJUeXBlLnJlcGxhY2UoL1sgXFx0XFxuXFxyXSskLywgJycpO1xuICBpZiAoc3ViVHlwZS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgIHN1YnR5cGU6IHN1YlR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ3NzKG10OiBtaW1lVHlwZSkge1xuICByZXR1cm4gbXQgPyBtdC50eXBlID09PSAndGV4dCcgJiYgbXQuc3VidHlwZSA9PT0gJ2NzcycgOiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSHRtbChtdDogbWltZVR5cGUpIHtcbiAgcmV0dXJuIG10ID8gbXQudHlwZSA9PT0gJ3RleHQnICYmIG10LnN1YnR5cGUgPT09ICdodG1sJyA6IGZhbHNlO1xufVxuXG4vLyBodHRwczovL21pbWVzbmlmZi5zcGVjLndoYXR3Zy5vcmcvI2phdmFzY3JpcHQtbWltZS10eXBlXG5leHBvcnQgZnVuY3Rpb24gaXNKcyhtdDogbWltZVR5cGUpIHtcbiAgY29uc3QgeyB0eXBlLCBzdWJ0eXBlIH0gPSBtdCB8fCB7fTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICBjYXNlICdlY21hc2NyaXB0JzpcbiAgICAgICAgY2FzZSAnamF2YXNjcmlwdCc6XG4gICAgICAgIGNhc2UgJ2phdmFzY3JpcHQxLjAnOlxuICAgICAgICBjYXNlICdqYXZhc2NyaXB0MS4xJzpcbiAgICAgICAgY2FzZSAnamF2YXNjcmlwdDEuMic6XG4gICAgICAgIGNhc2UgJ2phdmFzY3JpcHQxLjMnOlxuICAgICAgICBjYXNlICdqYXZhc2NyaXB0MS40JzpcbiAgICAgICAgY2FzZSAnamF2YXNjcmlwdDEuNSc6XG4gICAgICAgIGNhc2UgJ2pzY3JpcHQnOlxuICAgICAgICBjYXNlICdsaXZlc2NyaXB0JzpcbiAgICAgICAgY2FzZSAneC1lY21hc2NyaXB0JzpcbiAgICAgICAgY2FzZSAneC1qYXZhc2NyaXB0Jzoge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnYXBwbGljYXRpb24nOiB7XG4gICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZWNtYXNjcmlwdCc6XG4gICAgICAgIGNhc2UgJ2phdmFzY3JpcHQnOlxuICAgICAgICBjYXNlICd4LWVjbWFzY3JpcHQnOlxuICAgICAgICBjYXNlICd4LWphdmFzY3JpcHQnOiB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0pzb25wKG10OiBtaW1lVHlwZSwgc3JjOiBzdHJpbmcpIHtcbiAgY29uc3QgY2FsbGJhY2tSZWdFeHAgPSAvY2FsbGJhY2svO1xuICB0cnkge1xuICAgIGNvbnN0IHNlYXJjaCA9IG5ldyBVUkwoc3JjKS5zZWFyY2g7XG4gICAgY29uc3QgeyB0eXBlLCBzdWJ0eXBlIH0gPSBtdCB8fCB7fTtcbiAgICBpZiAoXG4gICAgICB0eXBlID09PSAnYXBwbGljYXRpb24nICYmXG4gICAgICBzdWJ0eXBlID09PSAnanNvbicgJiZcbiAgICAgIGNhbGxiYWNrUmVnRXhwLnRlc3Qoc2VhcmNoKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSnNUeXBlKHsgc3JjID0gJycsIHR5cGUgfTogeyBzcmM/OiBzdHJpbmc7IHR5cGU/OiBzdHJpbmcgfSkge1xuICBpZiAoL1xcLmpzJC8udGVzdChzcmMpKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAnbW9kdWxlJykgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgbWltZVR5cGVJbmZvID0gcGFyc2VDb250ZW50VHlwZSh0eXBlKTtcbiAgICBpZiAoaXNKc29ucChtaW1lVHlwZUluZm8sIHNyYykpIHJldHVybiB0cnVlO1xuICAgIGlmIChpc0pzKG1pbWVUeXBlSW5mbykpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDc3NUeXBlKHsgc3JjID0gJycsIHR5cGUgfTogeyBzcmM/OiBzdHJpbmc7IHR5cGU/OiBzdHJpbmcgfSkge1xuICBpZiAoL1xcLmNzcyQvLnRlc3Qoc3JjKSkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHR5cGUpIHtcbiAgICBjb25zdCBtaW1lVHlwZUluZm8gPSBwYXJzZUNvbnRlbnRUeXBlKHR5cGUpO1xuICAgIGlmIChpc0NzcyhtaW1lVHlwZUluZm8pKSByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSHRtbFR5cGUoe1xuICBzcmMgPSAnJyxcbiAgdHlwZSxcbn06IHtcbiAgc3JjPzogc3RyaW5nO1xuICB0eXBlPzogc3RyaW5nO1xufSkge1xuICBpZiAoL1xcLmh0bWwkLy50ZXN0KHNyYykpIHJldHVybiB0cnVlO1xuXG4gIGlmICh0eXBlKSB7XG4gICAgY29uc3QgbWltZVR5cGVJbmZvID0gcGFyc2VDb250ZW50VHlwZSh0eXBlKTtcbiAgICBpZiAoaXNIdG1sKG1pbWVUeXBlSW5mbykpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHYXJmaXNoQ29uZmlnVHlwZSh7XG4gIHR5cGUgPSAnJyxcbn06IHtcbiAgdHlwZT86IHN0cmluZztcbn0pIHtcbiAgcmV0dXJuIC9nYXJmaXNoLWNvbmZpZy9pLnRlc3QodHlwZSk7XG59XG4iLCAiaW1wb3J0IHsgaGFzT3duIH0gZnJvbSAnLi91dGlscyc7XG5cbi8vIHJlZmVyZW5jZSBodHRwczovL3poLWhhbnMucmVhY3Rqcy5vcmcvZG9jcy9ldmVudHMuaHRtbFxuY29uc3QgcmVhY3RFdmVudHMgPSBbXG4gICdvbkFib3J0JyxcbiAgJ29uQW5pbWF0aW9uQ2FuY2VsJyxcbiAgJ29uQW5pbWF0aW9uRW5kJyxcbiAgJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgJ29uQXV4Q2xpY2snLFxuICAnb25CbHVyJyxcbiAgJ29uQ2hhbmdlJyxcbiAgJ29uQ2xpY2snLFxuICAnb25DbG9zZScsXG4gICdvbkNvbnRleHRNZW51JyxcbiAgJ29uRG91YmxlQ2xpY2snLFxuICAnb25FcnJvcicsXG4gICdvbkZvY3VzJyxcbiAgJ29uR290UG9pbnRlckNhcHR1cmUnLFxuICAnb25JbnB1dCcsXG4gICdvbktleURvd24nLFxuICAnb25LZXlQcmVzcycsXG4gICdvbktleVVwJyxcbiAgJ29uTG9hZCcsXG4gICdvbkxvYWRFbmQnLFxuICAnb25Mb2FkU3RhcnQnLFxuICAnb25Mb3N0UG9pbnRlckNhcHR1cmUnLFxuICAnb25Nb3VzZURvd24nLFxuICAnb25Nb3VzZU1vdmUnLFxuICAnb25Nb3VzZU91dCcsXG4gICdvbk1vdXNlT3ZlcicsXG4gICdvbk1vdXNlVXAnLFxuICAnb25Qb2ludGVyQ2FuY2VsJyxcbiAgJ29uUG9pbnRlckRvd24nLFxuICAnb25Qb2ludGVyRW50ZXInLFxuICAnb25Qb2ludGVyTGVhdmUnLFxuICAnb25Qb2ludGVyTW92ZScsXG4gICdvblBvaW50ZXJPdXQnLFxuICAnb25Qb2ludGVyT3ZlcicsXG4gICdvblBvaW50ZXJVcCcsXG4gICdvblJlc2V0JyxcbiAgJ29uUmVzaXplJyxcbiAgJ29uU2Nyb2xsJyxcbiAgJ29uU2VsZWN0JyxcbiAgJ29uU2VsZWN0aW9uQ2hhbmdlJyxcbiAgJ29uU2VsZWN0U3RhcnQnLFxuICAnb25TdWJtaXQnLFxuICAnb25Ub3VjaENhbmNlbCcsXG4gICdvblRvdWNoTW92ZScsXG4gICdvblRvdWNoU3RhcnQnLFxuICAnb25Ub3VjaEVuZCcsXG4gICdvblRyYW5zaXRpb25DYW5jZWwnLFxuICAnb25UcmFuc2l0aW9uRW5kJyxcbiAgJ29uRHJhZycsXG4gICdvbkRyYWdFbmQnLFxuICAnb25EcmFnRW50ZXInLFxuICAnb25EcmFnRXhpdCcsXG4gICdvbkRyYWdMZWF2ZScsXG4gICdvbkRyYWdPdmVyJyxcbiAgJ29uRHJhZ1N0YXJ0JyxcbiAgJ29uRHJvcCcsXG4gICdvbkZvY3VzT3V0Jyxcbl07XG5cbmNvbnN0IGRpdmVyZ2VudE5hdGl2ZUV2ZW50cyA9IHtcbiAgb25Eb3VibGVDbGljazogJ2RibGNsaWNrJyxcbn07XG5cbmNvbnN0IG1pbWlja2VkUmVhY3RFdmVudHMgPSB7XG4gIG9uSW5wdXQ6ICdvbkNoYW5nZScsXG4gIG9uRm9jdXNPdXQ6ICdvbkJsdXInLFxuICBvblNlbGVjdGlvbkNoYW5nZTogJ29uU2VsZWN0Jyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50cyhzaGFkb3dSb290KSB7XG4gIGNvbnN0IHJlbW92ZUV2ZW50TGlzdGVuZXJzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gIHJlYWN0RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKHJlYWN0RXZlbnROYW1lKSB7XG4gICAgY29uc3QgbmF0aXZlRXZlbnROYW1lID0gZ2V0TmF0aXZlRXZlbnROYW1lKHJlYWN0RXZlbnROYW1lKTtcblxuICAgIGZ1bmN0aW9uIHJldGFyZ2V0RXZlbnQoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHBhdGggPVxuICAgICAgICBldmVudC5wYXRoIHx8XG4gICAgICAgIChldmVudC5jb21wb3NlZFBhdGggJiYgZXZlbnQuY29tcG9zZWRQYXRoKCkpIHx8XG4gICAgICAgIGNvbXBvc2VkUGF0aChldmVudC50YXJnZXQpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWwgPSBwYXRoW2ldO1xuICAgICAgICBsZXQgcHJvcHMgPSBudWxsO1xuICAgICAgICBjb25zdCByZWFjdENvbXBvbmVudCA9IGZpbmRSZWFjdENvbXBvbmVudChlbCk7XG4gICAgICAgIGNvbnN0IGV2ZW50SGFuZGxlcnMgPSBmaW5kUmVhY3RFdmVudEhhbmRsZXJzKGVsKTtcblxuICAgICAgICBpZiAoIWV2ZW50SGFuZGxlcnMpIHtcbiAgICAgICAgICBwcm9wcyA9IGZpbmRSZWFjdFByb3BzKHJlYWN0Q29tcG9uZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wcyA9IGV2ZW50SGFuZGxlcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVhY3RDb21wb25lbnQgJiYgcHJvcHMpIHtcbiAgICAgICAgICBkaXNwYXRjaEV2ZW50KGV2ZW50LCByZWFjdEV2ZW50TmFtZSwgcHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlYWN0Q29tcG9uZW50ICYmIHByb3BzICYmIG1pbWlja2VkUmVhY3RFdmVudHNbcmVhY3RFdmVudE5hbWVdKSB7XG4gICAgICAgICAgZGlzcGF0Y2hFdmVudChldmVudCwgbWltaWNrZWRSZWFjdEV2ZW50c1tyZWFjdEV2ZW50TmFtZV0sIHByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5jYW5jZWxCdWJibGUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbCA9PT0gc2hhZG93Um9vdCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hhZG93Um9vdC5hZGRFdmVudExpc3RlbmVyKG5hdGl2ZUV2ZW50TmFtZSwgcmV0YXJnZXRFdmVudCwgZmFsc2UpO1xuXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICBzaGFkb3dSb290LnJlbW92ZUV2ZW50TGlzdGVuZXIobmF0aXZlRXZlbnROYW1lLCByZXRhcmdldEV2ZW50LCBmYWxzZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kUmVhY3RFdmVudEhhbmRsZXJzKGl0ZW0pIHtcbiAgcmV0dXJuIGZpbmRSZWFjdFByb3BlcnR5KGl0ZW0sICdfX3JlYWN0RXZlbnRIYW5kbGVycycpO1xufVxuXG5mdW5jdGlvbiBmaW5kUmVhY3RDb21wb25lbnQoaXRlbSkge1xuICByZXR1cm4gZmluZFJlYWN0UHJvcGVydHkoaXRlbSwgJ19yZWFjdEludGVybmFsJyk7XG59XG5cbmZ1bmN0aW9uIGZpbmRSZWFjdFByb3BlcnR5KGl0ZW0sIHByb3BlcnR5UHJlZml4KSB7XG4gIGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcbiAgICBpZiAoaGFzT3duKGl0ZW0sIGtleSkgJiYga2V5LmluZGV4T2YocHJvcGVydHlQcmVmaXgpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGl0ZW1ba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZFJlYWN0UHJvcHMoY29tcG9uZW50KSB7XG4gIGlmICghY29tcG9uZW50KSByZXR1cm4gdW5kZWZpbmVkO1xuICBpZiAoY29tcG9uZW50Lm1lbW9pemVkUHJvcHMpIHJldHVybiBjb21wb25lbnQubWVtb2l6ZWRQcm9wczsgLy8gUmVhY3QgMTYgRmliZXJcbiAgaWYgKGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQgJiYgY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5wcm9wcylcbiAgICByZXR1cm4gY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5wcm9wczsgLy8gUmVhY3QgPD0xNVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50LCBldmVudFR5cGUsIGNvbXBvbmVudFByb3BzKSB7XG4gIGV2ZW50LnBlcnNpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgZXZlbnQuaXNQZXJzaXN0ZW50ID0gKCkgPT4gdHJ1ZTtcbiAgfTtcblxuICBpZiAoY29tcG9uZW50UHJvcHNbZXZlbnRUeXBlXSkge1xuICAgIGNvbXBvbmVudFByb3BzW2V2ZW50VHlwZV0oZXZlbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldE5hdGl2ZUV2ZW50TmFtZShyZWFjdEV2ZW50TmFtZSkge1xuICBpZiAoZGl2ZXJnZW50TmF0aXZlRXZlbnRzW3JlYWN0RXZlbnROYW1lXSkge1xuICAgIHJldHVybiBkaXZlcmdlbnROYXRpdmVFdmVudHNbcmVhY3RFdmVudE5hbWVdO1xuICB9XG4gIHJldHVybiByZWFjdEV2ZW50TmFtZS5yZXBsYWNlKC9eb24vLCAnJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZWRQYXRoKGVsKSB7XG4gIGNvbnN0IHBhdGg6IEFycmF5PGFueT4gPSBbXTtcbiAgd2hpbGUgKGVsKSB7XG4gICAgcGF0aC5wdXNoKGVsKTtcbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICBwYXRoLnB1c2goZG9jdW1lbnQpO1xuICAgICAgcGF0aC5wdXNoKHdpbmRvdyk7XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgeyBkaXNwYXRjaEV2ZW50cyB9IGZyb20gJy4vZGlzcGF0Y2hFdmVudHMnO1xuaW1wb3J0IHsgX19Nb2NrSHRtbF9fIH0gZnJvbSAnLi9nYXJmaXNoJztcbmltcG9ydCB7IGFzc2VydCwgY3JlYXRlS2V5IH0gZnJvbSAnLi91dGlscyc7XG5cbi8vIEd1YXJhbnRlZSBpbiBzdHJpY3QgaXNvbGF0aW9uIG1vZGUsIHRoZSBzaGFkb3cgaW4gdGhlIGRvbSBwb3B1cCB3aW5kb3csIGZsb2F0aW5nIGxheWVyIGRlcGVuZHMgb24gdGhlIGJvZHkgc3R5bGUgb2Ygd29ya1xuZnVuY3Rpb24gYXN5bmNOb2RlQXR0cmlidXRlKGZyb206IEVsZW1lbnQsIHRvOiBFbGVtZW50KSB7XG4gIGNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcjtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgbXV0YXRpb25zLmZvckVhY2goKHsgdHlwZSwgdGFyZ2V0LCBhdHRyaWJ1dGVOYW1lIH0pID0+IHtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFnID0gdGFyZ2V0Lm5vZGVOYW1lPy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdHlwZSA9PT0gJ2F0dHJpYnV0ZXMnICYmXG4gICAgICAgICAgYXR0cmlidXRlTmFtZSA9PT0gJ3N0eWxlJyAmJlxuICAgICAgICAgICh0YXJnZXQgPT09IGZyb20gfHwgdGFnID09PSAnYm9keScpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlID0gKHRhcmdldCBhcyBhbnkpPy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICB0by5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShmcm9tLCB7IGF0dHJpYnV0ZXM6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBhcHBDb250YWluZXJJZCA9ICdnYXJmaXNoX2FwcF9mb3InO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwQ29udGFpbmVyKGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbykge1xuICAvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgbm9kZSwgd2hpY2ggaXMgZGVzdHJveWVkIGJ5IHRoZSBtb2R1bGUgaXRzZWxmXG4gIGxldCBodG1sTm9kZTogSFRNTERpdkVsZW1lbnQgfCBIVE1MSHRtbEVsZW1lbnQgPVxuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBhcHBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBpZiAoYXBwSW5mby5zYW5kYm94ICYmIGFwcEluZm8uc2FuZGJveC5zdHJpY3RJc29sYXRpb24pIHtcbiAgICBodG1sTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICBjb25zdCByb290ID0gYXBwQ29udGFpbmVyLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICByb290LmFwcGVuZENoaWxkKGh0bWxOb2RlKTtcbiAgICAvLyBhc3luY05vZGVBdHRyaWJ1dGUoaHRtbE5vZGUsIGRvY3VtZW50LmJvZHkpO1xuICAgIGRpc3BhdGNoRXZlbnRzKHJvb3QpO1xuICB9IGVsc2Uge1xuICAgIGh0bWxOb2RlLnNldEF0dHJpYnV0ZShfX01vY2tIdG1sX18sICcnKTtcbiAgICBhcHBDb250YWluZXIuYXBwZW5kQ2hpbGQoaHRtbE5vZGUpO1xuICB9XG5cbiAgYXBwQ29udGFpbmVyLmlkID0gYCR7YXBwQ29udGFpbmVySWR9XyR7YXBwSW5mby5uYW1lfV8ke2NyZWF0ZUtleSgpfWA7XG5cbiAgcmV0dXJuIHtcbiAgICBodG1sTm9kZSxcbiAgICBhcHBDb250YWluZXIsXG4gIH07XG59XG5cbi8qKlxuICogIFdhaXQgZm9yIHRoZSBzcGVjaWZpZWQgZG9tIHJlYWR5IHRvb2wgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIHdhaXRFbGVtZW50UmVhZHkoc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICBpZiAoZWxlbSAhPT0gbnVsbCkge1xuICAgIGNhbGxiYWNrKGVsZW0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHdhaXRFbGVtZW50UmVhZHkoc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgfSwgNTApO1xufVxuXG5mdW5jdGlvbiBkZWxheShkdXJhdGlvbikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGR1cmF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdhaXRFbGVtZW50KHNlbGVjdG9yLCB0aW1lb3V0ID0gMzAwMCkge1xuICBjb25zdCB3YWl0UHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgd2FpdEVsZW1lbnRSZWFkeShzZWxlY3RvciwgZnVuY3Rpb24gKGVsZW06IEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKGVsZW0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIFByb21pc2UucmFjZShbZGVsYXkodGltZW91dCksIHdhaXRQcm9taXNlXSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZW5kZXJOb2RlKGRvbUdldHRlcj86IGludGVyZmFjZXMuRG9tR2V0dGVyKSB7XG4gIGFzc2VydChkb21HZXR0ZXIsIGBJbnZhbGlkIGRvbUdldHRlcjpcXG4gJHtkb21HZXR0ZXJ9LmApO1xuICBsZXQgYXBwV3JhcHBlck5vZGU7XG5cbiAgaWYgKHR5cGVvZiBkb21HZXR0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgYXBwV3JhcHBlck5vZGUgPSAoYXdhaXQgd2FpdEVsZW1lbnQoZG9tR2V0dGVyKSkgYXNcbiAgICAgIHwgRWxlbWVudFxuICAgICAgfCBudWxsXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZG9tR2V0dGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgYXBwV3JhcHBlck5vZGUgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoZG9tR2V0dGVyKCkpO1xuICB9XG4gIGFzc2VydChhcHBXcmFwcGVyTm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQsIGBJbnZhbGlkIGRvbUdldHRlcjogJHtkb21HZXR0ZXJ9YCk7XG4gIHJldHVybiBhcHBXcmFwcGVyTm9kZSBhcyBFbGVtZW50O1xufVxuIiwgImltcG9ydCB7IGVycm9yIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBOb2RlIGFzIFZOb2RlIH0gZnJvbSAnLi9kb21BcGlzJztcblxuZW51bSBFbGVtZW50VHlwZSB7XG4gIFRFWFQgPSAzLFxuICBDT01NRU5UID0gOCxcbiAgRUxFTUVOVCA9IDEsXG59XG5cbmZ1bmN0aW9uIEF0dHJpYnV0ZXModGhpczogYW55LCB7IG5hbWUsIHZhbHVlIH0pIHtcbiAgdGhpcy5rZXkgPSBuYW1lO1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cbmNvbnN0IGdlbmVyYXRlQXR0cmlidXRlcyA9IChlbDogRWxlbWVudCkgPT4ge1xuICBjb25zdCBsaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIGNvbnN0IGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgY29uc3QgbGVuID0gYXR0cnMubGVuZ3RoO1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgLy8gT3B0aW1pemUgZm9yIHRoZSBtb3N0IGNvbW1vbiBjYXNlc1xuICAgIGlmIChsZW4gPT09IDEpIHtcbiAgICAgIGxpc3RbMF0gPSBuZXcgQXR0cmlidXRlcyhhdHRyc1swXSk7XG4gICAgfSBlbHNlIGlmIChsZW4gPT09IDIpIHtcbiAgICAgIGxpc3RbMF0gPSBuZXcgQXR0cmlidXRlcyhhdHRyc1swXSk7XG4gICAgICBsaXN0WzFdID0gbmV3IEF0dHJpYnV0ZXMoYXR0cnNbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxpc3RbaV0gPSBuZXcgQXR0cmlidXRlcyhhdHRyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBsaXN0O1xufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IChlbDogRWxlbWVudCwgZmlsdGVyOiAoZWw6IFZOb2RlKSA9PiBWTm9kZSkgPT4ge1xuICBzd2l0Y2ggKGVsLm5vZGVUeXBlKSB7XG4gICAgY2FzZSBFbGVtZW50VHlwZS5URVhUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBjb250ZW50OiBlbC50ZXh0Q29udGVudCxcbiAgICAgIH07XG4gICAgY2FzZSBFbGVtZW50VHlwZS5DT01NRU5UOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvbW1lbnQnLFxuICAgICAgICBjb250ZW50OiBlbC50ZXh0Q29udGVudCxcbiAgICAgIH07XG4gICAgY2FzZSBFbGVtZW50VHlwZS5FTEVNRU5UOlxuICAgICAgcmV0dXJuIGZpbHRlcih7XG4gICAgICAgIHR5cGU6ICdlbGVtZW50JyxcbiAgICAgICAgdGFnTmFtZTogZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBhdHRyaWJ1dGVzOiBnZW5lcmF0ZUF0dHJpYnV0ZXMoZWwpLFxuICAgICAgICBjaGlsZHJlbjogQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKS5tYXAoKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChub2RlIGFzIEVsZW1lbnQsIGZpbHRlcik7XG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGVycm9yKGBJbnZhbGlkIG5vZGUgdHlwZSBcIiR7ZWwubm9kZVR5cGV9XCJgKTtcbiAgfVxufTtcblxuLy8gMU0gdGV4dCB0YWtlcyBhYm91dCB0aW1lIDYwbXNcbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZVBhcnNlKGNvZGU6IHN0cmluZywgdGFnczogQXJyYXk8c3RyaW5nPikge1xuICBsZXQgYXN0VHJlZTogQXJyYXk8Vk5vZGU+ID0gW107XG4gIGNvbnN0IGh0bWxOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICBjb25zdCBjb2xsZWN0aW9uRWxzOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxWTm9kZT4+ID0ge307XG4gIGNvbnN0IGZpbHRlciA9IChlbCkgPT4ge1xuICAgIGlmICh0YWdzLmluY2x1ZGVzKGVsLnRhZ05hbWUpKSB7XG4gICAgICBjb2xsZWN0aW9uRWxzW2VsLnRhZ05hbWVdLnB1c2goZWwpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgaHRtbE5vZGUuaW5uZXJIVE1MID0gY29kZTtcbiAgZm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuICAgIGNvbGxlY3Rpb25FbHNbdGFnXSA9IFtdO1xuICB9XG4gIGFzdFRyZWUgPSBBcnJheS5mcm9tKGh0bWxOb2RlLmNoaWxkTm9kZXMpLm1hcCgobm9kZSkgPT4ge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KG5vZGUgYXMgRWxlbWVudCwgZmlsdGVyKTtcbiAgfSk7XG4gIHJldHVybiBbYXN0VHJlZSwgY29sbGVjdGlvbkVsc10gYXMgY29uc3Q7XG59XG4iLCAiaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcblxuY29uc3QgbG9nID0gY3JlYXRlRGVidWcoJ2dhcmZpc2gnKTtcblxuZXhwb3J0IGNvbnN0IGNvcmVMb2cgPSBsb2cuZXh0ZW5kKCdjb3JlJyk7XG5leHBvcnQgY29uc3Qgcm91dGVyTG9nID0gbG9nLmV4dGVuZCgncm91dGVyJyk7XG4iLCAiaW50ZXJmYWNlIExvY2tJdGVtIHtcbiAgaWQ6IG51bWJlcjtcbiAgd2FpdGluZzogUHJvbWlzZTx2b2lkPjtcbiAgcmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgTG9jayB7XG4gIHByaXZhdGUgaWQgPSAwO1xuICBwcml2YXRlIGxvY2tRdWV1ZTogTG9ja0l0ZW1bXSA9IFtdO1xuXG4gIGdlbklkKCkge1xuICAgIHJldHVybiArK3RoaXMuaWQ7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIGFzeW5jIHdhaXQoaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHsgbG9ja1F1ZXVlIH0gPSB0aGlzO1xuICAgIGNvbnN0IGZpcnN0TG9jayA9IGxvY2tRdWV1ZVswXTtcbiAgICBjb25zdCBsYXN0TG9jayA9IGZpcnN0TG9jayA/IGxvY2tRdWV1ZVtsb2NrUXVldWUubGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBUaGlzIGxvY2sgaXMgcHJvY2Vzc2luZywganVzdCByZXR1cm4gaW1tZWRpYXRlbHlcbiAgICBpZiAoZmlyc3RMb2NrPy5pZCA9PT0gaWQpIHJldHVybjtcblxuICAgIC8vIFRoaXMgbG9jayBzaG91bGQgd2FpdCBmb3IgdGhlIG90aGVyIGxvY2tcbiAgICBsZXQgbG9ja0l0ZW0gPSBsb2NrUXVldWUuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcblxuICAgIGlmICghbG9ja0l0ZW0pIHtcbiAgICAgIGxldCBwcm9taXNlUmVzb2x2ZTogTG9ja0l0ZW1bJ3Jlc29sdmUnXSA9ICgpID0+IHt9O1xuICAgICAgY29uc3Qgd2FpdGluZyA9IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KTtcbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBsb2NrXG4gICAgICBsb2NrSXRlbSA9IHsgaWQsIHdhaXRpbmcsIHJlc29sdmU6IHByb21pc2VSZXNvbHZlIH07XG4gICAgICBsb2NrUXVldWUucHVzaChsb2NrSXRlbSk7XG4gICAgfVxuICAgIGlmIChsYXN0TG9jaykge1xuICAgICAgLy8gc3RhcnQgd2FpdGluZ1xuICAgICAgYXdhaXQgbGFzdExvY2sud2FpdGluZztcbiAgICB9XG4gICAgLy8gZG9uJ3QgbmVlZCB0byB3YWl0XG4gIH1cblxuICByZWxlYXNlKCkge1xuICAgIGNvbnN0IHsgbG9ja1F1ZXVlIH0gPSB0aGlzO1xuICAgIGNvbnN0IGZpcnN0TG9jayA9IGxvY2tRdWV1ZVswXTtcbiAgICBpZiAoIWZpcnN0TG9jaykgcmV0dXJuO1xuICAgIC8vIHJlbW92ZSB0aGlzIGxvY2tcbiAgICBsb2NrUXVldWUuc2hpZnQoKTtcbiAgICAvLyByZXNvbHZlIHRoZSBwcm9taXNlIG9mIGN1cnJlbnQgbG9ja1xuICAgIGZpcnN0TG9jay5yZXNvbHZlKCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmxvY2tRdWV1ZSA9IFtdO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgd2FybiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgQ2FsbGJhY2s8VCwgSz4gPSAoLi4uYXJnczogQXJnc1R5cGU8VD4pID0+IEs7XG5leHBvcnQgdHlwZSBBcmdzVHlwZTxUPiA9IFQgZXh0ZW5kcyBBcnJheTxhbnk+ID8gVCA6IEFycmF5PGFueT47XG5cbmV4cG9ydCBjbGFzcyBTeW5jSG9vazxULCBLPiB7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGxpc3RlbmVycyA9IG5ldyBTZXQ8Q2FsbGJhY2s8VCwgSz4+KCk7XG5cbiAgY29uc3RydWN0b3IodHlwZT86IHN0cmluZykge1xuICAgIGlmICh0eXBlKSB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgb24oZm46IENhbGxiYWNrPFQsIEs+KSB7XG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5saXN0ZW5lcnMuYWRkKGZuKTtcbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICB3YXJuKCdJbnZhbGlkIHBhcmFtZXRlciBpbiBcIkhvb2tcIi4nKTtcbiAgICB9XG4gIH1cblxuICBvbmNlKGZuOiBDYWxsYmFjazxULCBLPikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHRoaXMub24oZnVuY3Rpb24gd3JhcHBlciguLi5hcmdzOiBBcnJheTxhbnk+KSB7XG4gICAgICBzZWxmLnJlbW92ZSh3cmFwcGVyKTtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVtaXQoLi4uZGF0YTogQXJnc1R5cGU8VD4pIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiBmbi5hcHBseShudWxsLCBkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKGZuOiBDYWxsYmFjazxULCBLPikge1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5kZWxldGUoZm4pO1xuICB9XG5cbiAgcmVtb3ZlQWxsKCkge1xuICAgIHRoaXMubGlzdGVuZXJzLmNsZWFyKCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcmdzVHlwZSwgU3luY0hvb2sgfSBmcm9tICcuL3N5bmNIb29rJztcblxudHlwZSBDYWxsYmFja1JldHVyblR5cGUgPSB2b2lkIHwgZmFsc2UgfCBQcm9taXNlPHZvaWQgfCBmYWxzZT47XG5cbmV4cG9ydCBjbGFzcyBBc3luY0hvb2s8XG4gIFQsXG4gIEV4dGVybmFsRW1pdFJldHVyblR5cGUgPSBDYWxsYmFja1JldHVyblR5cGUsXG4+IGV4dGVuZHMgU3luY0hvb2s8VCwgQ2FsbGJhY2tSZXR1cm5UeXBlIHwgUHJvbWlzZTxFeHRlcm5hbEVtaXRSZXR1cm5UeXBlPj4ge1xuICBlbWl0KC4uLmRhdGE6IEFyZ3NUeXBlPFQ+KTogUHJvbWlzZTx2b2lkIHwgZmFsc2UgfCBFeHRlcm5hbEVtaXRSZXR1cm5UeXBlPiB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBjb25zdCBscyA9IEFycmF5LmZyb20odGhpcy5saXN0ZW5lcnMpO1xuICAgIGlmIChscy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICBjb25zdCBjYWxsID0gKHByZXY/OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHByZXYgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBBYm9ydCBwcm9jZXNzXG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IGxzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobHNbaSsrXS5hcHBseShudWxsLCBkYXRhKSkudGhlbihjYWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdCA9IGNhbGwoKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgd2FybiwgZXJyb3IsIGlzT2JqZWN0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU3luY0hvb2sgfSBmcm9tICcuL3N5bmNIb29rJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV0dXJuRGF0YShvcmlnaW5EYXRhLCByZXR1cm5EYXRhKSB7XG4gIGlmICghaXNPYmplY3QocmV0dXJuRGF0YSkpIHJldHVybiBmYWxzZTtcbiAgaWYgKG9yaWdpbkRhdGEgIT09IHJldHVybkRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvcmlnaW5EYXRhKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcmV0dXJuRGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFN5bmNXYXRlcmZhbGxIb29rPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PiBleHRlbmRzIFN5bmNIb29rPFxuICBbVF0sXG4gIFRcbj4ge1xuICBwdWJsaWMgb25lcnJvcjogKGVyck1zZzogc3RyaW5nIHwgRXJyb3IpID0+IHZvaWQgPSBlcnJvcjtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBlbWl0KGRhdGE6IFQpIHtcbiAgICBpZiAoIWlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBlcnJvcihgXCIke3RoaXMudHlwZX1cIiBob29rIHJlc3BvbnNlIGRhdGEgbXVzdCBiZSBhbiBvYmplY3QuYCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZm4oZGF0YSk7XG4gICAgICAgIGlmIChjaGVja1JldHVybkRhdGEoZGF0YSwgdGVtcERhdGEpKSB7XG4gICAgICAgICAgZGF0YSA9IHRlbXBEYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25lcnJvcihcbiAgICAgICAgICAgIGBUaGUgXCIke3RoaXMudHlwZX1cIiB0eXBlIGhhcyBhIHBsdWdpbiByZXR1cm4gdmFsdWUgZXJyb3IuYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oZSk7XG4gICAgICAgIHRoaXMub25lcnJvcihlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyB3YXJuLCBlcnJvciwgaXNPYmplY3QgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTeW5jSG9vayB9IGZyb20gJy4vc3luY0hvb2snO1xuaW1wb3J0IHsgY2hlY2tSZXR1cm5EYXRhIH0gZnJvbSAnLi9zeW5jV2F0ZXJmYWxsSG9vayc7XG5cbnR5cGUgQ2FsbGJhY2tSZXR1cm5UeXBlPFQ+ID0gVCB8IGZhbHNlIHwgUHJvbWlzZTxUIHwgZmFsc2U+O1xuXG5leHBvcnQgY2xhc3MgQXN5bmNXYXRlcmZhbGxIb29rPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PiBleHRlbmRzIFN5bmNIb29rPFxuICBbVF0sXG4gIENhbGxiYWNrUmV0dXJuVHlwZTxUPlxuPiB7XG4gIHB1YmxpYyBvbmVycm9yOiAoZXJyTXNnOiBzdHJpbmcgfCBFcnJvcikgPT4gdm9pZCA9IGVycm9yO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGVtaXQoZGF0YTogVCk6IFByb21pc2U8VCB8IGZhbHNlPiB7XG4gICAgaWYgKCFpc09iamVjdChkYXRhKSkge1xuICAgICAgZXJyb3IoYFwiJHt0aGlzLnR5cGV9XCIgaG9vayByZXNwb25zZSBkYXRhIG11c3QgYmUgYW4gb2JqZWN0LmApO1xuICAgIH1cbiAgICBjb25zdCBscyA9IEFycmF5LmZyb20odGhpcy5saXN0ZW5lcnMpO1xuXG4gICAgaWYgKGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGNvbnN0IHByb2Nlc3NFcnJvciA9IChlKSA9PiB7XG4gICAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oZSk7XG4gICAgICAgIHRoaXMub25lcnJvcihlKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYWxsID0gKHByZXZEYXRhOiBUIHwgZmFsc2UpID0+IHtcbiAgICAgICAgaWYgKHByZXZEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja1JldHVybkRhdGEoZGF0YSwgcHJldkRhdGEpKSB7XG4gICAgICAgICAgZGF0YSA9IHByZXZEYXRhIGFzIFQ7XG4gICAgICAgICAgaWYgKGkgPCBscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobHNbaSsrXShkYXRhKSkudGhlbihjYWxsLCBwcm9jZXNzRXJyb3IpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0Vycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoXG4gICAgICAgICAgICBgVGhlIFwiJHt0aGlzLnR5cGV9XCIgdHlwZSBoYXMgYSBwbHVnaW4gcmV0dXJuIHZhbHVlIGVycm9yLmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNhbGwoZGF0YSkpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgd2FybiwgYXNzZXJ0LCBpc1BsYWluT2JqZWN0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBQbHVnaW48VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICBbayBpbiBrZXlvZiBUXT86IFBhcmFtZXRlcnM8VFtrXVsnb24nXT5bMF07XG59ICYge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luU3lzdGVtPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PiB7XG4gIGxpZmVjeWNsZTogVDtcbiAgbGlmZWN5Y2xlS2V5czogQXJyYXk8a2V5b2YgVD47XG4gIHJlZ2lzdGVyUGx1Z2luczogUmVjb3JkPHN0cmluZywgUGx1Z2luPFQ+PiA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGxpZmVjeWNsZTogVCkge1xuICAgIHRoaXMubGlmZWN5Y2xlID0gbGlmZWN5Y2xlO1xuICAgIHRoaXMubGlmZWN5Y2xlS2V5cyA9IE9iamVjdC5rZXlzKGxpZmVjeWNsZSk7XG4gIH1cblxuICB1c2VQbHVnaW4ocGx1Z2luOiBQbHVnaW48VD4pIHtcbiAgICBhc3NlcnQoaXNQbGFpbk9iamVjdChwbHVnaW4pLCAnSW52YWxpZCBwbHVnaW4gY29uZmlndXJhdGlvbi4nKTtcbiAgICAvLyBQbHVnaW4gbmFtZSBpcyByZXF1aXJlZCBhbmQgdW5pcXVlXG4gICAgY29uc3QgcGx1Z2luTmFtZSA9IHBsdWdpbi5uYW1lO1xuICAgIGFzc2VydChwbHVnaW5OYW1lLCAnUGx1Z2luIG11c3QgcHJvdmlkZSBhIG5hbWUuJyk7XG5cbiAgICBpZiAoIXRoaXMucmVnaXN0ZXJQbHVnaW5zW3BsdWdpbk5hbWVdKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyUGx1Z2luc1twbHVnaW5OYW1lXSA9IHBsdWdpbjtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5saWZlY3ljbGUpIHtcbiAgICAgICAgY29uc3QgcGx1Z2luTGlmZSA9IHBsdWdpbltrZXkgYXMgc3RyaW5nXTtcbiAgICAgICAgaWYgKHBsdWdpbkxpZmUpIHtcbiAgICAgICAgICAvLyBEaWZmZXJlbnRpYXRlIGRpZmZlcmVudCB0eXBlcyBvZiBob29rcyBhbmQgYWRvcHQgZGlmZmVyZW50IHJlZ2lzdHJhdGlvbiBzdHJhdGVnaWVzXG4gICAgICAgICAgdGhpcy5saWZlY3ljbGVba2V5XS5vbihwbHVnaW5MaWZlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKGBSZXBlYXQgdG8gcmVnaXN0ZXIgcGx1Z2luIGhvb2tzIFwiJHtwbHVnaW5OYW1lfVwiLmApO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVBsdWdpbihwbHVnaW5OYW1lOiBzdHJpbmcpIHtcbiAgICBhc3NlcnQocGx1Z2luTmFtZSwgJ011c3QgcHJvdmlkZSBhIG5hbWUuJyk7XG4gICAgY29uc3QgcGx1Z2luID0gdGhpcy5yZWdpc3RlclBsdWdpbnNbcGx1Z2luTmFtZV07XG4gICAgYXNzZXJ0KHBsdWdpbiwgYHBsdWdpbiBcIiR7cGx1Z2luTmFtZX1cIiBpcyBub3QgcmVnaXN0ZXJlZC5gKTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIHBsdWdpbikge1xuICAgICAgaWYgKGtleSA9PT0gJ25hbWUnKSBjb250aW51ZTtcbiAgICAgIHRoaXMubGlmZWN5Y2xlW2tleV0ucmVtb3ZlKHBsdWdpbltrZXkgYXMgc3RyaW5nXSk7XG4gICAgfVxuICB9XG5cbiAgaW5oZXJpdDxUIGV4dGVuZHMgUGx1Z2luU3lzdGVtPGFueT4+KHsgbGlmZWN5Y2xlLCByZWdpc3RlclBsdWdpbnMgfTogVCkge1xuICAgIGZvciAoY29uc3QgaG9va05hbWUgaW4gbGlmZWN5Y2xlKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgICF0aGlzLmxpZmVjeWNsZVtob29rTmFtZV0sXG4gICAgICAgIGBcIiR7aG9va05hbWUgYXMgc3RyaW5nfVwiIGhvb2sgaGFzIGNvbmZsaWN0IGFuZCBjYW5ub3QgYmUgaW5oZXJpdGVkLmAsXG4gICAgICApO1xuICAgICAgKHRoaXMubGlmZWN5Y2xlIGFzIGFueSlbaG9va05hbWVdID0gbGlmZWN5Y2xlW2hvb2tOYW1lXTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHBsdWdpbk5hbWUgaW4gcmVnaXN0ZXJQbHVnaW5zKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgICF0aGlzLnJlZ2lzdGVyUGx1Z2luc1twbHVnaW5OYW1lXSxcbiAgICAgICAgYFwiJHtwbHVnaW5OYW1lfVwiIHBsdWdpbiBoYXMgY29uZmxpY3QgYW5kIGNhbm5vdCBiZSBpbmhlcml0ZWQuYCxcbiAgICAgICk7XG4gICAgICB0aGlzLnVzZVBsdWdpbihyZWdpc3RlclBsdWdpbnNbcGx1Z2luTmFtZV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcyBhcyB0eXBlb2YgdGhpcyAmIFQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBOb2RlLCBpc0Fic29sdXRlLCB0cmFuc2Zvcm1VcmwgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5cbi8vIE1hdGNoIHVybCBpbiBjc3NcbmNvbnN0IE1BVENIX0NTU19VUkwgPSAvdXJsXFwoXFxzKihbJ1wiXSk/KC4qPylcXDFcXHMqXFwpL2c7XG5jb25zdCBNQVRDSF9DSEFSU0VUX1VSTCA9IC9AY2hhcnNldFxccysoWydcIl0pKC4qPylcXDFcXHMqOz8vZztcbmNvbnN0IE1BVENIX0lNUE9SVF9VUkwgPSAvQGltcG9ydFxccysoWydcIl0pKC4qPylcXDEvZztcblxuaW50ZXJmYWNlIFNjb3BlRGF0YSB7XG4gIGFwcE5hbWU6IHN0cmluZztcbiAgcm9vdEVsSWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFN0eWxlTWFuYWdlciB7XG4gIHB1YmxpYyBzdHlsZUNvZGU6IHN0cmluZztcbiAgcHVibGljIHVybDogc3RyaW5nIHwgbnVsbDtcbiAgcHVibGljIHNjb3BlRGF0YTogU2NvcGVEYXRhIHwgbnVsbDtcblxuICBwcml2YXRlIGRlcHNTdGFjayA9IG5ldyBTZXQoKTtcblxuICBjb25zdHJ1Y3RvcihzdHlsZUNvZGU6IHN0cmluZywgdXJsPzogc3RyaW5nKSB7XG4gICAgdGhpcy5zY29wZURhdGEgPSBudWxsO1xuICAgIHRoaXMudXJsID0gdXJsIHx8IG51bGw7XG4gICAgdGhpcy5zdHlsZUNvZGUgPSBzdHlsZUNvZGU7XG4gIH1cblxuICBjb3JyZWN0UGF0aChiYXNlVXJsPzogc3RyaW5nKSB7XG4gICAgY29uc3QgeyB1cmwsIHN0eWxlQ29kZSB9ID0gdGhpcztcbiAgICBpZiAoIWJhc2VVcmwpIGJhc2VVcmwgPSB1cmwgYXMgYW55O1xuICAgIGlmIChiYXNlVXJsICYmIHR5cGVvZiBzdHlsZUNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBUaGUgcmVsYXRpdmUgcGF0aCBpcyBjb252ZXJ0ZWQgdG8gYW4gYWJzb2x1dGUgcGF0aCBhY2NvcmRpbmcgdG8gdGhlIHBhdGggb2YgdGhlIGNzcyBmaWxlXG4gICAgICB0aGlzLnN0eWxlQ29kZSA9IHN0eWxlQ29kZVxuICAgICAgICAucmVwbGFjZShNQVRDSF9DSEFSU0VUX1VSTCwgJycpXG4gICAgICAgIC5yZXBsYWNlKE1BVENIX0lNUE9SVF9VUkwsIGZ1bmN0aW9uIChrMCwgazEsIGsyKSB7XG4gICAgICAgICAgcmV0dXJuIGsyID8gYEBpbXBvcnQgdXJsKCR7azF9JHtrMn0ke2sxfSlgIDogazA7XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXBsYWNlKE1BVENIX0NTU19VUkwsIChrMCwgazEsIGsyKSA9PiB7XG4gICAgICAgICAgaWYgKGlzQWJzb2x1dGUoazIpKSByZXR1cm4gazA7XG4gICAgICAgICAgcmV0dXJuIGB1cmwoXCIke2Jhc2VVcmwgPyB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgazIpIDogazJ9XCIpYDtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHJvdmlkZWQgdG8gcGx1Z2lucyB0byBvdmVycmlkZSB0aGlzIG1ldGhvZFxuICB0cmFuc2Zvcm1Db2RlKGNvZGU6IHN0cmluZykge1xuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgc2V0RGVwKG5vZGU6IE5vZGUpIHtcbiAgICB0aGlzLmRlcHNTdGFjay5hZGQobm9kZSk7XG4gIH1cblxuICBzZXRTY29wZShkYXRhOiBTY29wZURhdGEpIHtcbiAgICB0aGlzLnNjb3BlRGF0YSA9IGRhdGE7XG4gIH1cblxuICBpc1NhbWVPcmlnaW4obm9kZTogTm9kZSkge1xuICAgIHJldHVybiB0aGlzLmRlcHNTdGFjay5oYXMobm9kZSk7XG4gIH1cblxuICByZW5kZXJBc1N0eWxlRWxlbWVudChleHRyYUNvZGUgPSAnJykge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGNvZGUgPSBleHRyYUNvZGUgKyAoXG4gICAgICB0aGlzLnN0eWxlQ29kZVxuICAgICAgICA/IHRoaXMuc3R5bGVDb2RlXG4gICAgICAgIDogJy8qKmVtcHR5IHN0eWxlKiovJ1xuICAgICk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGhpcy50cmFuc2Zvcm1Db2RlKGNvZGUpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNsb25lZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY2xvbmVkLnVybCA9IHRoaXMudXJsO1xuICAgIGNsb25lZC5zdHlsZUNvZGUgPSB0aGlzLnN0eWxlQ29kZTtcbiAgICBjbG9uZWQuc2NvcGVEYXRhID0gdGhpcy5zY29wZURhdGE7XG4gICAgY2xvbmVkLmRlcHNTdGFjayA9IG5ldyBTZXQodGhpcy5kZXBzU3RhY2spO1xuICAgIHJldHVybiBjbG9uZWQ7XG4gIH1cbn1cbiIsICJleHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciB7XG4gIHB1YmxpYyBtb2R1bGVDb2RlOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmw6IHN0cmluZyB8IG51bGw7XG4gIHB1YmxpYyBvcmlnaW5Vcmw/OiBzdHJpbmc7XG4gIHB1YmxpYyBhbGlhczogc3RyaW5nIHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVDb2RlOiBzdHJpbmcsIHVybD86IHN0cmluZykge1xuICAgIHRoaXMuYWxpYXMgPSBudWxsO1xuICAgIHRoaXMudXJsID0gdXJsIHx8IG51bGw7XG4gICAgdGhpcy5tb2R1bGVDb2RlID0gbW9kdWxlQ29kZTtcbiAgfVxuXG4gIHNldEFsaWFzKG5hbWU6IHN0cmluZykge1xuICAgIGlmIChuYW1lICYmIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5hbGlhcyA9IG5hbWU7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNsb25lZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY2xvbmVkLnVybCA9IHRoaXMudXJsO1xuICAgIGNsb25lZC5hbGlhcyA9IHRoaXMuYWxpYXM7XG4gICAgY2xvbmVkLm1vZHVsZUNvZGUgPSB0aGlzLm1vZHVsZUNvZGU7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIE5vZGUsXG4gIFRleHQsXG4gIERPTUFwaXMsXG4gIGRlZXBNZXJnZSxcbiAgdHJhbnNmb3JtVXJsLFxuICB0ZW1wbGF0ZVBhcnNlLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5cbnR5cGUgUmVuZGVyZXIgPSBSZWNvcmQ8c3RyaW5nLCAobm9kZTogTm9kZSkgPT4gbnVsbCB8IEVsZW1lbnQgfCBDb21tZW50PjtcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlTWFuYWdlciB7XG4gIHB1YmxpYyB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHVibGljIERPTUFwaXMgPSBuZXcgRE9NQXBpcygpO1xuICBwdWJsaWMgYXN0VHJlZTogQXJyYXk8Tm9kZT4gPSBbXTtcbiAgcHJpdmF0ZSBwcmV0cmVhdG1lbnRTdG9yZTogUmVjb3JkPHN0cmluZywgTm9kZVtdPiA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBzdHJpbmcsIHVybD86IHN0cmluZykge1xuICAgIC8vIFRoZSB1cmwgaXMgb25seSBiYXNlIHVybCwgaXQgbWF5IGFsc28gYmUgYSBqcyByZXNvdXJjZSBhZGRyZXNzLlxuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgY29uc3QgW2FzdFRyZWUsIGNvbGxlY3Rpb25FbHNdID0gdGVtcGxhdGVQYXJzZSh0ZW1wbGF0ZSwgW1xuICAgICAgICAnbWV0YScsXG4gICAgICAgICdsaW5rJyxcbiAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgJ3NjcmlwdCcsXG4gICAgICBdKTtcbiAgICAgIHRoaXMuYXN0VHJlZSA9IGFzdFRyZWU7XG4gICAgICB0aGlzLnByZXRyZWF0bWVudFN0b3JlID0gY29sbGVjdGlvbkVscztcbiAgICB9XG4gIH1cblxuICBnZXROb2Rlc0J5VGFnTmFtZTxUPiguLi50YWdzOiBBcnJheTxrZXlvZiBUPikge1xuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBjb25zdCBjb2xsZWN0aW9uOiBSZWNvcmQ8a2V5b2YgVCwgQXJyYXk8Tm9kZT4+ID0ge30gYXMgYW55O1xuXG4gICAgZm9yIChjb25zdCB0YWcgb2YgdGFncyBhcyBzdHJpbmdbXSkge1xuICAgICAgaWYgKHRoaXMucHJldHJlYXRtZW50U3RvcmVbdGFnXSkge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIGNvbGxlY3Rpb25bdGFnXSA9IHRoaXMucHJldHJlYXRtZW50U3RvcmVbdGFnXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbGxlY3Rpb25bdGFnXSA9IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb3VudGVyICE9PSB0YWdzLmxlbmd0aCkge1xuICAgICAgY29uc3QgdHJhdmVyc2UgPSAobm9kZTogTm9kZSB8IFRleHQpID0+IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ2VsZW1lbnQnKSByZXR1cm47XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0YWdzLmluZGV4T2Yobm9kZS50YWdOYW1lIGFzIGFueSkgPiAtMSAmJlxuICAgICAgICAgICF0aGlzLnByZXRyZWF0bWVudFN0b3JlW25vZGUudGFnTmFtZV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgY29sbGVjdGlvbltub2RlLnRhZ05hbWVdLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB0cmF2ZXJzZShjaGlsZCk7XG4gICAgICB9O1xuICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuYXN0VHJlZSkgdHJhdmVyc2Uobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgLy8gUmVuZGVyIGRvbSB0cmVlXG4gIGNyZWF0ZUVsZW1lbnRzKHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50OiBFbGVtZW50KSB7XG4gICAgY29uc3QgZWxlbWVudHM6IEFycmF5PEVsZW1lbnQ+ID0gW107XG4gICAgY29uc3QgdHJhdmVyc2UgPSAobm9kZTogTm9kZSB8IFRleHQsIHBhcmVudEVsPzogRWxlbWVudCkgPT4ge1xuICAgICAgbGV0IGVsOiBhbnk7XG4gICAgICBpZiAodGhpcy5ET01BcGlzLmlzQ29tbWVudE5vZGUobm9kZSkpIHtcbiAgICAgICAgLy8gRmlsdGVyIGNvbW1lbnQgbm9kZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLkRPTUFwaXMuaXNUZXh0KG5vZGUpKSB7XG4gICAgICAgIGVsID0gdGhpcy5ET01BcGlzLmNyZWF0ZVRleHROb2RlKG5vZGUpO1xuICAgICAgICBwYXJlbnRFbCAmJiBwYXJlbnRFbC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuRE9NQXBpcy5pc05vZGUobm9kZSkpIHtcbiAgICAgICAgY29uc3QgeyB0YWdOYW1lLCBjaGlsZHJlbiB9ID0gbm9kZSBhcyBOb2RlO1xuICAgICAgICBpZiAocmVuZGVyZXJbdGFnTmFtZV0pIHtcbiAgICAgICAgICBlbCA9IHJlbmRlcmVyW3RhZ05hbWVdKG5vZGUgYXMgTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwgPSB0aGlzLkRPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlIGFzIE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnRFbCAmJiBlbCkgcGFyZW50RWwuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgIGNvbnN0IHsgbm9kZVR5cGUsIF9pZ25vcmVDaGlsZE5vZGVzIH0gPSBlbDtcbiAgICAgICAgICAvLyBGaWx0ZXIgXCJjb21tZW50XCIgYW5kIFwiZG9jdW1lbnRcIiBub2RlXG4gICAgICAgICAgaWYgKCFfaWdub3JlQ2hpbGROb2RlcyAmJiBub2RlVHlwZSAhPT0gOCAmJiBub2RlVHlwZSAhPT0gMTApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgdHJhdmVyc2UoY2hpbGQsIGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuYXN0VHJlZSkge1xuICAgICAgaWYgKHRoaXMuRE9NQXBpcy5pc05vZGUobm9kZSkgJiYgbm9kZS50YWdOYW1lICE9PSAnIWRvY3R5cGUnKSB7XG4gICAgICAgIGNvbnN0IGVsID0gdHJhdmVyc2Uobm9kZSwgcGFyZW50KTtcbiAgICAgICAgZWwgJiYgZWxlbWVudHMucHVzaChlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIHRvUmVzb2x2ZVVybChub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcsIGJhc2VVcmw/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzcmMgPSBub2RlLmF0dHJpYnV0ZXM/LmZpbmQoKHsga2V5IH0pID0+IGtleSA9PT0gdHlwZSk7XG4gICAgaWYgKHNyYyAmJiBzcmMudmFsdWUgJiYgYmFzZVVybCkge1xuICAgICAgc3JjLnZhbHVlID0gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIHNyYy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgaWdub3JlQ2hpbGROb2Rlc0NyZWF0aW9uKG5vZGU6IEVsZW1lbnQpIHtcbiAgICBpZiAobm9kZSkge1xuICAgICAgKG5vZGUgYXMgYW55KS5faWdub3JlQ2hpbGROb2RlcyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZmluZEFsbE1ldGFOb2RlcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0J5VGFnTmFtZSgnbWV0YScpLm1ldGE7XG4gIH1cblxuICBmaW5kQWxsTGlua05vZGVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlUYWdOYW1lKCdsaW5rJykubGluaztcbiAgfVxuXG4gIGZpbmRBbGxKc05vZGVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlUYWdOYW1lKCdzY3JpcHQnKS5zY3JpcHQ7XG4gIH1cblxuICBmaW5kQXR0cmlidXRlVmFsdWUobm9kZTogTm9kZSwgdHlwZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5vZGUuYXR0cmlidXRlcz8uZmluZCgoeyBrZXkgfSkgPT4ga2V5ID09PSB0eXBlKT8udmFsdWUgfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgY2xvbmVOb2RlKG5vZGU6IE5vZGUpIHtcbiAgICByZXR1cm4gZGVlcE1lcmdlKG5vZGUsIHt9KTtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBjbG9uZWQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpO1xuICAgIGNsb25lZC51cmwgPSB0aGlzLnVybDtcbiAgICBjbG9uZWQuYXN0VHJlZSA9IHRoaXMuYXN0VHJlZTtcbiAgICBjbG9uZWQucHJldHJlYXRtZW50U3RvcmUgPSB0aGlzLnByZXRyZWF0bWVudFN0b3JlO1xuICAgIGNsb25lZC5ET01BcGlzID0gbmV3IERPTUFwaXModGhpcy5ET01BcGlzLmRvY3VtZW50KTtcbiAgICByZXR1cm4gY2xvbmVkO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgTm9kZSB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIEphdmFTY3JpcHRNYW5hZ2VyIHtcbiAgcHVibGljIGFzeW5jOiBib29sZWFuO1xuICBwdWJsaWMgbWltZVR5cGU6IHN0cmluZztcbiAgcHVibGljIHNjcmlwdENvZGU6IHN0cmluZztcbiAgcHVibGljIHVybD86IHN0cmluZztcblxuICAvLyBOZWVkIHRvIHJlbW92ZSBkdXBsaWNhdGlvbiwgc28gdXNlIFwic2V0XCJcbiAgcHJpdmF0ZSBkZXBzU3RhY2sgPSBuZXcgU2V0KCk7XG5cbiAgY29uc3RydWN0b3Ioc2NyaXB0Q29kZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpIHtcbiAgICB0aGlzLm1pbWVUeXBlID0gJyc7XG4gICAgdGhpcy5hc3luYyA9IGZhbHNlO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMuc2NyaXB0Q29kZSA9IHNjcmlwdENvZGU7XG4gIH1cblxuICBpc01vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5taW1lVHlwZSA9PT0gJ21vZHVsZSc7XG4gIH1cblxuICBpc0lubGluZVNjcmlwdCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbighdGhpcy51cmwpO1xuICB9XG5cbiAgc2V0TWltZVR5cGUobWltZVR5cGU6IHN0cmluZykge1xuICAgIHRoaXMubWltZVR5cGUgPSBtaW1lVHlwZSB8fCAnJztcbiAgfVxuXG4gIHNldEFzeW5jQXR0cmlidXRlKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuYXN5bmMgPSBCb29sZWFuKHZhbCk7XG4gIH1cblxuICBzZXREZXAobm9kZTogTm9kZSkge1xuICAgIHRoaXMuZGVwc1N0YWNrLmFkZChub2RlKTtcbiAgfVxuXG4gIGlzU2FtZU9yaWdpbihub2RlOiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVwc1N0YWNrLmhhcyhub2RlKTtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBjbG9uZWQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpO1xuICAgIGNsb25lZC51cmwgPSB0aGlzLnVybDtcbiAgICBjbG9uZWQuYXN5bmMgPSB0aGlzLmFzeW5jO1xuICAgIGNsb25lZC5taW1lVHlwZSA9IHRoaXMubWltZVR5cGU7XG4gICAgY2xvbmVkLnNjcmlwdENvZGUgPSB0aGlzLnNjcmlwdENvZGU7XG4gICAgY2xvbmVkLmRlcHNTdGFjayA9IG5ldyBTZXQodGhpcy5kZXBzU3RhY2spO1xuICAgIHJldHVybiBjbG9uZWQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBlcnJvciwgcGFyc2VDb250ZW50VHlwZSB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IE1hbmFnZXIsIExvYWRlciB9IGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVxdWVzdChjdXN0b21GZXRjaDogTG9hZGVyWydob29rcyddWydsaWZlY3ljbGUnXVsnZmV0Y2gnXSkge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gcmVxdWVzdCh1cmw6IHN0cmluZywgY29uZmlnOiBSZXF1ZXN0SW5pdCkge1xuICAgIGxldCByZXN1bHQgPSBhd2FpdCBjdXN0b21GZXRjaC5lbWl0KHVybCwgY29uZmlnIHx8IHt9KTtcbiAgICBpZiAoIXJlc3VsdCB8fCAhKHJlc3VsdCBpbnN0YW5jZW9mIFJlc3BvbnNlKSkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgZmV0Y2godXJsLCBjb25maWcgfHwge30pO1xuICAgIH1cblxuICAgIC8vIFJlc3BvbnNlIGNvZGVzIGdyZWF0ZXIgdGhhbiBcIjQwMFwiIGFyZSByZWdhcmRlZCBhcyBlcnJvcnNcbiAgICBpZiAocmVzdWx0LnN0YXR1cyA+PSA0MDApIHtcbiAgICAgIGVycm9yKGBcIiR7dXJsfVwiIGxvYWQgZmFpbGVkIHdpdGggc3RhdHVzIFwiJHtyZXN1bHQuc3RhdHVzfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGNvZGUgPSBhd2FpdCByZXN1bHQudGV4dCgpO1xuICAgIGNvbnN0IHR5cGUgPSByZXN1bHQuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpIHx8ICcnO1xuICAgIGNvbnN0IHNpemUgPSBOdW1iZXIocmVzdWx0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXNpemUnKSk7XG4gICAgY29uc3QgbWltZVR5cGUgPSBwYXJzZUNvbnRlbnRUeXBlKHR5cGUgfHwgJycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvZGUsXG4gICAgICByZXN1bHQsXG4gICAgICBtaW1lVHlwZSxcbiAgICAgIHR5cGUsXG4gICAgICBzaXplOiBOdW1iZXIuaXNOYU4oc2l6ZSkgPyBudWxsIDogc2l6ZSxcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVJlc3VsdChyZXN1bHQpIHtcbiAgaWYgKHJlc3VsdC5yZXNvdXJjZU1hbmFnZXIpIHtcbiAgICByZXN1bHQucmVzb3VyY2VNYW5hZ2VyID0gKHJlc3VsdC5yZXNvdXJjZU1hbmFnZXIgYXMgTWFuYWdlcikuY2xvbmUoKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBDb21wYXRpYmxlIHdpdGggb2xkIGFwaVxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGxvYWRlcjogTG9hZGVyLCB1cmw6IHN0cmluZykge1xuICBjb25zdCBleHRyYSA9IGxvYWRlci5yZXF1ZXN0Q29uZmlnO1xuICBjb25zdCBjb25maWcgPSB0eXBlb2YgZXh0cmEgPT09ICdmdW5jdGlvbicgPyBleHRyYSh1cmwpIDogZXh0cmE7XG4gIHJldHVybiB7IG1vZGU6ICdjb3JzJywgLi4uY29uZmlnIH0gYXMgUmVxdWVzdEluaXQ7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBNYW5hZ2VyLCBDYWNoZVZhbHVlIH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBjYWNoZWREYXRhU2V0ID0gbmV3IFdlYWtTZXQoKTtcblxuZXhwb3J0IGVudW0gRmlsZVR5cGVzIHtcbiAganMgPSAnanMnLFxuICBjc3MgPSAnY3NzJyxcbiAgbW9kdWxlID0gJ21vZHVsZScsIC8vIHJlbW90ZSBtb2R1bGVcbiAgdGVtcGxhdGUgPSAndGVtcGxhdGUnLFxufVxuXG5jb25zdCBNQVhfU0laRSA9IDEwMjQgKiAxMDI0ICogNTA7XG5jb25zdCBERUZBVUxUX1BPTEwgPSBTeW1ib2woJ19fZGVmYXVsdEJ1ZmZlclBvbGxfXycpO1xuY29uc3QgRklMRV9UWVBFUyA9IFtcbiAgRmlsZVR5cGVzLmpzLFxuICBGaWxlVHlwZXMuY3NzLFxuICBGaWxlVHlwZXMubW9kdWxlLFxuICBGaWxlVHlwZXMudGVtcGxhdGUsXG4gIERFRkFVTFRfUE9MTCxcbl07XG5cbmV4cG9ydCBjbGFzcyBBcHBDYWNoZUNvbnRhaW5lciB7XG4gIHByaXZhdGUgbWF4U2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIHRvdGFsU2l6ZSA9IDA7XG4gIHByaXZhdGUgcmVjb3JkZXIgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihtYXhTaXplID0gTUFYX1NJWkUpIHtcbiAgICB0aGlzLm1heFNpemUgPSBtYXhTaXplO1xuICAgIEZJTEVfVFlQRVMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLnJlY29yZGVyW2tleV0gPSAwO1xuICAgICAgdGhpc1trZXldID0gbmV3IE1hcDxzdHJpbmcsIENhY2hlVmFsdWU8TWFuYWdlcj4+KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGJ1ZmZlclBvb2wodHlwZTogRmlsZVR5cGVzIHwgdHlwZW9mIERFRkFVTFRfUE9MTCkge1xuICAgIHJldHVybiB0aGlzW3R5cGVdIGFzIE1hcDxzdHJpbmcsIENhY2hlVmFsdWU8TWFuYWdlcj4+O1xuICB9XG5cbiAgaGFzKHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIEZJTEVfVFlQRVMuc29tZSgoa2V5KSA9PiB0aGlzW2tleV0uaGFzKHVybCkpO1xuICB9XG5cbiAgZ2V0KHVybDogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgRklMRV9UWVBFUykge1xuICAgICAgaWYgKHRoaXNba2V5XS5oYXModXJsKSkge1xuICAgICAgICByZXR1cm4gdGhpc1trZXldLmdldCh1cmwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldCh1cmw6IHN0cmluZywgZGF0YTogQ2FjaGVWYWx1ZTxNYW5hZ2VyPiwgdHlwZTogRmlsZVR5cGVzKSB7XG4gICAgY29uc3QgY3VyU2l6ZSA9IGNhY2hlZERhdGFTZXQuaGFzKGRhdGEpID8gMCA6IGRhdGEuc2l6ZTtcbiAgICBjb25zdCB0b3RhbFNpemUgPSB0aGlzLnRvdGFsU2l6ZSArIGN1clNpemU7XG5cbiAgICBpZiAodG90YWxTaXplIDwgdGhpcy5tYXhTaXplKSB7XG4gICAgICBsZXQgYmFyID0gdHlwZTtcbiAgICAgIGxldCBidWZmZXJQb29sID0gdGhpcy5idWZmZXJQb29sKHR5cGUpO1xuICAgICAgaWYgKCFidWZmZXJQb29sKSB7XG4gICAgICAgIGJhciA9IERFRkFVTFRfUE9MTCBhcyBhbnk7XG4gICAgICAgIGJ1ZmZlclBvb2wgPSB0aGlzLmJ1ZmZlclBvb2woREVGQVVMVF9QT0xMKTtcbiAgICAgIH1cblxuICAgICAgYnVmZmVyUG9vbC5zZXQodXJsLCBkYXRhKTtcbiAgICAgIHRoaXMudG90YWxTaXplID0gdG90YWxTaXplO1xuICAgICAgdGhpcy5yZWNvcmRlcltiYXJdICs9IGN1clNpemU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2xlYXIodHlwZT86IEZpbGVUeXBlcykge1xuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGNhY2hlQm94ID0gdGhpcy5idWZmZXJQb29sKHR5cGUpO1xuICAgICAgaWYgKGNhY2hlQm94ICYmIGNhY2hlQm94IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnJlY29yZGVyW3R5cGVdO1xuICAgICAgICB0aGlzLnRvdGFsU2l6ZSAtPSBzaXplO1xuICAgICAgICB0aGlzLnJlY29yZGVyW3R5cGVdID0gMDtcbiAgICAgICAgY2FjaGVCb3guY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRklMRV9UWVBFUy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgdGhpc1trZXldLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucmVjb3JkZXJba2V5XSA9IDA7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudG90YWxTaXplID0gMDtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBTeW5jSG9vayxcbiAgU3luY1dhdGVyZmFsbEhvb2ssXG4gIFBsdWdpblN5c3RlbSxcbiAgQXN5bmNIb29rLFxufSBmcm9tICdAZ2FyZmlzaC9ob29rcyc7XG5pbXBvcnQge1xuICBlcnJvcixcbiAgX19MT0FERVJfRkxBR19fLFxuICBpc0pzVHlwZSxcbiAgaXNDc3NUeXBlLFxuICBpc0h0bWxUeXBlLFxuICBwYXJzZUNvbnRlbnRUeXBlLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTdHlsZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL3N0eWxlJztcbmltcG9ydCB7IE1vZHVsZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL21vZHVsZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZU1hbmFnZXIgfSBmcm9tICcuL21hbmFnZXJzL3RlbXBsYXRlJztcbmltcG9ydCB7IEphdmFTY3JpcHRNYW5hZ2VyIH0gZnJvbSAnLi9tYW5hZ2Vycy9qYXZhc2NyaXB0JztcbmltcG9ydCB7IGdldFJlcXVlc3QsIGNvcHlSZXN1bHQsIG1lcmdlQ29uZmlnIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBGaWxlVHlwZXMsIGNhY2hlZERhdGFTZXQsIEFwcENhY2hlQ29udGFpbmVyIH0gZnJvbSAnLi9hcHBDYWNoZSc7XG5cbi8vIEV4cG9ydCB0eXBlcyBhbmQgbWFuYWdlciBjb25zdHJ1Y3RvclxuZXhwb3J0ICogZnJvbSAnLi9tYW5hZ2Vycy9zdHlsZSc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXJzL21vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL21hbmFnZXJzL3RlbXBsYXRlJztcbmV4cG9ydCAqIGZyb20gJy4vbWFuYWdlcnMvamF2YXNjcmlwdCc7XG5cbmV4cG9ydCB0eXBlIE1hbmFnZXIgPVxuICB8IFN0eWxlTWFuYWdlclxuICB8IE1vZHVsZU1hbmFnZXJcbiAgfCBUZW1wbGF0ZU1hbmFnZXJcbiAgfCBKYXZhU2NyaXB0TWFuYWdlcjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSB1bml0IGlzIGJ5dGVcbiAgICovXG4gIG1heFNpemU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVWYWx1ZTxUIGV4dGVuZHMgTWFuYWdlcj4ge1xuICB1cmw6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIGZpbGVUeXBlOiBGaWxlVHlwZXMgfCAnJztcbiAgcmVzb3VyY2VNYW5hZ2VyOiBUIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRIb29rQXJnczxUIGV4dGVuZHMgTWFuYWdlcj4ge1xuICByZXN1bHQ6IFJlc3BvbnNlO1xuICB2YWx1ZTogQ2FjaGVWYWx1ZTxUPjtcbn1cblxuZXhwb3J0IGVudW0gQ3Jvc3NPcmlnaW5DcmVkZW50aWFscyB7XG4gIGFub255bW91cyA9ICdzYW1lLW9yaWdpbicsXG4gICd1c2UtY3JlZGVudGlhbHMnID0gJ2luY2x1ZGUnLFxufVxuXG50eXBlIExpZmVDeWNsZSA9IExvYWRlclsnaG9va3MnXVsnbGlmZWN5Y2xlJ107XG5cbmV4cG9ydCB0eXBlIExvYWRlckxpZmVjeWNsZSA9IFBhcnRpYWw8e1xuICBbayBpbiBrZXlvZiBMaWZlQ3ljbGVdOiBQYXJhbWV0ZXJzPExpZmVDeWNsZVtrXVsnb24nXT5bMF07XG59PjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZXJQbHVnaW4gZXh0ZW5kcyBMb2FkZXJMaWZlY3ljbGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIge1xuICBwdWJsaWMgcGVyc29uYWxJZCA9IF9fTE9BREVSX0ZMQUdfXztcbiAgcHVibGljIFN0eWxlTWFuYWdlciA9IFN0eWxlTWFuYWdlcjtcbiAgcHVibGljIE1vZHVsZU1hbmFnZXIgPSBNb2R1bGVNYW5hZ2VyO1xuICBwdWJsaWMgVGVtcGxhdGVNYW5hZ2VyID0gVGVtcGxhdGVNYW5hZ2VyO1xuICBwdWJsaWMgSmF2YVNjcmlwdE1hbmFnZXIgPSBKYXZhU2NyaXB0TWFuYWdlcjtcbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIHB1YmxpYyByZXF1ZXN0Q29uZmlnOiBSZXF1ZXN0SW5pdCB8ICgodXJsOiBzdHJpbmcpID0+IFJlcXVlc3RJbml0KTtcblxuICBwdWJsaWMgaG9va3MgPSBuZXcgUGx1Z2luU3lzdGVtKHtcbiAgICBlcnJvcjogbmV3IFN5bmNIb29rPFtFcnJvciwgeyBzY29wZTogc3RyaW5nIH1dLCB2b2lkPigpLFxuICAgIGxvYWRlZDogbmV3IFN5bmNXYXRlcmZhbGxIb29rPExvYWRlZEhvb2tBcmdzPE1hbmFnZXI+PignbG9hZGVkJyksXG4gICAgY2xlYXI6IG5ldyBTeW5jV2F0ZXJmYWxsSG9vazx7XG4gICAgICBzY29wZTogc3RyaW5nO1xuICAgICAgZmlsZVR5cGU/OiBGaWxlVHlwZXM7XG4gICAgfT4oJ2NsZWFyJyksXG4gICAgYmVmb3JlTG9hZDogbmV3IFN5bmNXYXRlcmZhbGxIb29rPHtcbiAgICAgIHVybDogc3RyaW5nO1xuICAgICAgc2NvcGU6IHN0cmluZztcbiAgICAgIHJlcXVlc3RDb25maWc6IFJlc3BvbnNlSW5pdDtcbiAgICB9PignYmVmb3JlTG9hZCcpLFxuICAgIGZldGNoOiBuZXcgQXN5bmNIb29rPFtzdHJpbmcsIFJlcXVlc3RJbml0XSwgUmVzcG9uc2UgfCB2b2lkIHwgZmFsc2U+KFxuICAgICAgJ2ZldGNoJyxcbiAgICApLFxuICB9KTtcblxuICBwcml2YXRlIG9wdGlvbnM6IExvYWRlck9wdGlvbnM7XG4gIHByaXZhdGUgbG9hZGluZ0xpc3Q6IFJlY29yZDxzdHJpbmcsIG51bGwgfCBQcm9taXNlPENhY2hlVmFsdWU8YW55Pj4+O1xuICBwcml2YXRlIGNhY2hlU3RvcmU6IHsgW25hbWU6IHN0cmluZ106IEFwcENhY2hlQ29udGFpbmVyIH07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IExvYWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMubG9hZGluZ0xpc3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuY2FjaGVTdG9yZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBhcnRpYWw8TG9hZGVyT3B0aW9ucz4pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICB9XG5cbiAgY2xlYXIoc2NvcGU6IHN0cmluZywgZmlsZVR5cGU/OiBGaWxlVHlwZXMpIHtcbiAgICBjb25zdCBhcHBDYWNoZUNvbnRhaW5lciA9IHRoaXMuY2FjaGVTdG9yZVtzY29wZV07XG4gICAgaWYgKGFwcENhY2hlQ29udGFpbmVyKSB7XG4gICAgICBhcHBDYWNoZUNvbnRhaW5lci5jbGVhcihmaWxlVHlwZSk7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5jbGVhci5lbWl0KHsgc2NvcGUsIGZpbGVUeXBlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQWxsKGZpbGVUeXBlPzogRmlsZVR5cGVzKSB7XG4gICAgZm9yIChjb25zdCBzY29wZSBpbiB0aGlzLmNhY2hlU3RvcmUpIHtcbiAgICAgIHRoaXMuY2xlYXIoc2NvcGUsIGZpbGVUeXBlKTtcbiAgICB9XG4gIH1cblxuICB1c2VQbHVnaW4ob3B0aW9uczogTG9hZGVyUGx1Z2luKSB7XG4gICAgdGhpcy5ob29rcy51c2VQbHVnaW4ob3B0aW9ucyk7XG4gIH1cblxuICBzZXRMaWZlQ3ljbGUobGlmZUN5Y2xlOiBQYXJ0aWFsPExvYWRlckxpZmVjeWNsZT4pIHtcbiAgICB0aGlzLmhvb2tzLnVzZVBsdWdpbih7XG4gICAgICBuYW1lOiAnbG9hZGVyLWxpZmVjeWNsZScsXG4gICAgICAuLi5saWZlQ3ljbGUsXG4gICAgfSk7XG4gIH1cblxuICBsb2FkTW9kdWxlKHVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZDxNb2R1bGVNYW5hZ2VyPih7XG4gICAgICBzY29wZTogJ21vZHVsZXMnLFxuICAgICAgdXJsLFxuICAgICAgaXNSZW1vdGVNb2R1bGU6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmFibGUgdG8ga25vdyB0aGUgZmluYWwgZGF0YSB0eXBlLCBzbyB0aHJvdWdoIFwiZ2VuZXJpY3NcIlxuICBhc3luYyBsb2FkPFQgZXh0ZW5kcyBNYW5hZ2VyPih7XG4gICAgc2NvcGUsXG4gICAgdXJsLFxuICAgIGlzUmVtb3RlTW9kdWxlID0gZmFsc2UsXG4gICAgY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJyxcbiAgICBkZWZhdWx0Q29udGVudFR5cGUgPSAnJyxcbiAgfToge1xuICAgIHNjb3BlOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaXNSZW1vdGVNb2R1bGU/OiBib29sZWFuO1xuICAgIGNyb3NzT3JpZ2luPzogTm9uTnVsbGFibGU8SFRNTFNjcmlwdEVsZW1lbnRbJ2Nyb3NzT3JpZ2luJ10+O1xuICAgIGRlZmF1bHRDb250ZW50VHlwZT86IHN0cmluZztcbiAgfSk6IFByb21pc2U8TG9hZGVkSG9va0FyZ3M8VD5bJ3ZhbHVlJ10+IHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGxvYWRpbmdMaXN0LCBjYWNoZVN0b3JlIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcmVzID0gbG9hZGluZ0xpc3RbdXJsXTtcbiAgICBpZiAocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGxldCBhcHBDYWNoZUNvbnRhaW5lciA9IGNhY2hlU3RvcmVbc2NvcGVdO1xuICAgIGlmICghYXBwQ2FjaGVDb250YWluZXIpIHtcbiAgICAgIGFwcENhY2hlQ29udGFpbmVyID0gY2FjaGVTdG9yZVtzY29wZV0gPSBuZXcgQXBwQ2FjaGVDb250YWluZXIoXG4gICAgICAgIG9wdGlvbnMubWF4U2l6ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGFwcENhY2hlQ29udGFpbmVyLmhhcyh1cmwpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvcHlSZXN1bHQoYXBwQ2FjaGVDb250YWluZXIuZ2V0KHVybCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgb3RoZXIgY29udGFpbmVycyBoYXZlIGNhY2hlXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWNoZVN0b3JlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNhY2hlU3RvcmVba2V5XTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPT0gYXBwQ2FjaGVDb250YWluZXIpIHtcbiAgICAgICAgICBpZiAoY29udGFpbmVyLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb250YWluZXIuZ2V0KHVybCk7XG4gICAgICAgICAgICBjYWNoZWREYXRhU2V0LmFkZChyZXN1bHQpO1xuICAgICAgICAgICAgYXBwQ2FjaGVDb250YWluZXIuc2V0KHVybCwgcmVzdWx0LCByZXN1bHQuZmlsZVR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb3B5UmVzdWx0KHJlc3VsdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RDb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLCB1cmwpO1xuICAgIC8vIFRlbGxzIGJyb3dzZXJzIHRvIGluY2x1ZGUgY3JlZGVudGlhbHMgaW4gYm90aCBzYW1lLSBhbmQgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzLCBhbmQgYWx3YXlzIHVzZSBhbnkgY3JlZGVudGlhbHMgc2VudCBiYWNrIGluIHJlc3BvbnNlcy5cbiAgICByZXF1ZXN0Q29uZmlnLmNyZWRlbnRpYWxzID0gQ3Jvc3NPcmlnaW5DcmVkZW50aWFsc1tjcm9zc09yaWdpbl07XG4gICAgY29uc3QgcmVzT3B0cyA9IHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUxvYWQuZW1pdCh7XG4gICAgICB1cmwsXG4gICAgICBzY29wZSxcbiAgICAgIHJlcXVlc3RDb25maWcsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZ2V0UmVxdWVzdCh0aGlzLmhvb2tzLmxpZmVjeWNsZS5mZXRjaCk7XG4gICAgY29uc3QgbG9hZFJlcyA9IHJlcXVlc3QocmVzT3B0cy51cmwsIHJlc09wdHMucmVxdWVzdENvbmZpZylcbiAgICAgIC50aGVuKCh7IGNvZGUsIHNpemUsIHJlc3VsdCwgdHlwZSB9KSA9PiB7XG4gICAgICAgIGxldCBtYW5hZ2VyQ3RvcixcbiAgICAgICAgICBmaWxlVHlwZTogRmlsZVR5cGVzIHwgJycgPSAnJztcblxuICAgICAgICBpZiAoaXNSZW1vdGVNb2R1bGUpIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy5tb2R1bGU7XG4gICAgICAgICAgbWFuYWdlckN0b3IgPSBNb2R1bGVNYW5hZ2VyO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGlzSHRtbFR5cGUoeyB0eXBlLCBzcmM6IHJlc3VsdC51cmwgfSkgfHxcbiAgICAgICAgICBpc0h0bWxUeXBlKHtcbiAgICAgICAgICAgIHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy50ZW1wbGF0ZTtcbiAgICAgICAgICBtYW5hZ2VyQ3RvciA9IFRlbXBsYXRlTWFuYWdlcjtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBpc0pzVHlwZSh7IHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSB9KSB8fFxuICAgICAgICAgIGlzSnNUeXBlKHsgdHlwZSwgc3JjOiByZXN1bHQudXJsIH0pXG4gICAgICAgICkge1xuICAgICAgICAgIGZpbGVUeXBlID0gRmlsZVR5cGVzLmpzO1xuICAgICAgICAgIG1hbmFnZXJDdG9yID0gSmF2YVNjcmlwdE1hbmFnZXI7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgaXNDc3NUeXBlKHsgc3JjOiByZXN1bHQudXJsLCB0eXBlIH0pIHx8XG4gICAgICAgICAgaXNDc3NUeXBlKHtcbiAgICAgICAgICAgIHR5cGU6IGRlZmF1bHRDb250ZW50VHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaWxlVHlwZSA9IEZpbGVUeXBlcy5jc3M7XG4gICAgICAgICAgbWFuYWdlckN0b3IgPSBTdHlsZU1hbmFnZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVc2UgcmVzdWx0LnVybCwgcmVzb3VyY2VzIG1heSBiZSByZWRpcmVjdGVkXG4gICAgICAgIGNvbnN0IHJlc291cmNlTWFuYWdlcjogTWFuYWdlciB8IG51bGwgPSBtYW5hZ2VyQ3RvclxuICAgICAgICAgID8gbmV3IG1hbmFnZXJDdG9yKGNvZGUsIHJlc3VsdC51cmwpXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIC8vIFRoZSByZXN1bHRzIHdpbGwgYmUgY2FjaGVkIHRoaXMgdGltZS5cbiAgICAgICAgLy8gU28sIHlvdSBjYW4gdHJhbnNmb3JtIHRoZSByZXF1ZXN0IHJlc3VsdC5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuaG9va3MubGlmZWN5Y2xlLmxvYWRlZC5lbWl0KHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHNjb3BlLFxuICAgICAgICAgICAgcmVzb3VyY2VNYW5hZ2VyLFxuICAgICAgICAgICAgZmlsZVR5cGU6IGZpbGVUeXBlIHx8ICcnLFxuICAgICAgICAgICAgLy8gRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHRha2UgYW4gYXBwcm94aW1hdGlvblxuICAgICAgICAgICAgc2l6ZTogc2l6ZSB8fCBjb2RlLmxlbmd0aCxcbiAgICAgICAgICAgIGNvZGU6IHJlc291cmNlTWFuYWdlciA/ICcnIDogY29kZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBmaWxlVHlwZSAmJiBhcHBDYWNoZUNvbnRhaW5lci5zZXQodXJsLCBkYXRhLnZhbHVlLCBmaWxlVHlwZSk7XG4gICAgICAgIHJldHVybiBjb3B5UmVzdWx0KGRhdGEudmFsdWUgYXMgYW55KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgZXJyb3IoZSk7XG4gICAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yLmVtaXQoZSwgeyBzY29wZSB9KTtcbiAgICAgICAgdGhyb3cgZTsgLy8gTGV0IHRoZSB1cHBlciBhcHBsaWNhdGlvbiBjYXRjaCB0aGUgZXJyb3JcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGxvYWRpbmdMaXN0W3VybF0gPSBudWxsO1xuICAgICAgfSk7XG5cbiAgICBsb2FkaW5nTGlzdFt1cmxdID0gbG9hZFJlcztcbiAgICByZXR1cm4gbG9hZFJlcztcbiAgfVxufVxuIiwgImltcG9ydCB7IExvYWRlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIyIH0gZnJvbSAnZXZlbnRlbWl0dGVyMic7XG5pbXBvcnQgeyB3YXJuLCBhc3NlcnQsIGlzUGxhaW5PYmplY3QsIF9fR0FSRklTSF9GTEFHX18gfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQge1xuICBTeW5jSG9vayxcbiAgQXN5bmNIb29rLFxuICBTeW5jV2F0ZXJmYWxsSG9vayxcbiAgQXN5bmNXYXRlcmZhbGxIb29rLFxuICBQbHVnaW5TeXN0ZW0sXG59IGZyb20gJ0BnYXJmaXNoL2hvb2tzJztcbmltcG9ydCB7XG4gIGRlZXBNZXJnZUNvbmZpZyxcbiAgZ2VuZXJhdGVBcHBPcHRpb25zLFxuICBjcmVhdGVEZWZhdWx0T3B0aW9ucyxcbn0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9tb2R1bGUvYXBwJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBnbG9iYWxMaWZlY3ljbGUgfSBmcm9tICcuL2xpZmVjeWNsZSc7XG5pbXBvcnQgeyBwcm9jZXNzQXBwUmVzb3VyY2VzIH0gZnJvbSAnLi9tb2R1bGUvcmVzb3VyY2UnO1xuaW1wb3J0IHsgR2FyZmlzaEhNUlBsdWdpbiB9IGZyb20gJy4vcGx1Z2lucy9maXhITVInO1xuaW1wb3J0IHsgR2FyZmlzaE9wdGlvbnNMaWZlIH0gZnJvbSAnLi9wbHVnaW5zL2xpZmVjeWNsZSc7XG5pbXBvcnQgeyBHYXJmaXNoUHJlbG9hZFBsdWdpbiB9IGZyb20gJy4vcGx1Z2lucy9wcmVsb2FkJztcbmltcG9ydCB7IEdhcmZpc2hQZXJmb3JtYW5jZSB9IGZyb20gJy4vcGx1Z2lucy9wZXJmb3JtYW5jZSc7XG5pbXBvcnQgeyBHYXJmaXNoTG9nZ2VyIH0gZnJvbSAnLi9wbHVnaW5zL2xvZ2dlcic7XG5cbmNvbnN0IERFRkFVTFRfUFJPUFMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgSE9PS1NfQVBJID0ge1xuICBTeW5jSG9vayxcbiAgQXN5bmNIb29rLFxuICBTeW5jV2F0ZXJmYWxsSG9vayxcbiAgQXN5bmNXYXRlcmZhbGxIb29rLFxufTtcblxuZXhwb3J0IGNsYXNzIEdhcmZpc2ggZXh0ZW5kcyBFdmVudEVtaXR0ZXIyIHtcbiAgcHVibGljIHJ1bm5pbmcgPSBmYWxzZTtcbiAgcHVibGljIHZlcnNpb24gPSAnMS4xMi4wJztcbiAgcHVibGljIGZsYWcgPSBfX0dBUkZJU0hfRkxBR19fOyAvLyBBIHVuaXF1ZSBpZGVudGlmaWVyXG4gIHB1YmxpYyBsb2FkZXIgPSBuZXcgTG9hZGVyKCk7XG4gIHB1YmxpYyBob29rcyA9IGdsb2JhbExpZmVjeWNsZSgpO1xuICBwdWJsaWMgY2hhbm5lbCA9IG5ldyBFdmVudEVtaXR0ZXIyKCk7XG4gIHB1YmxpYyBvcHRpb25zID0gY3JlYXRlRGVmYXVsdE9wdGlvbnMoKTtcbiAgcHVibGljIGV4dGVybmFsczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xuICBwdWJsaWMgYWN0aXZlQXBwczogQXJyYXk8aW50ZXJmYWNlcy5BcHA+ID0gW107XG4gIHB1YmxpYyBwbHVnaW5zOiBpbnRlcmZhY2VzLlBsdWdpbnMgPSB7fSBhcyBhbnk7XG4gIHB1YmxpYyBjYWNoZUFwcHM6IFJlY29yZDxzdHJpbmcsIGludGVyZmFjZXMuQXBwPiA9IHt9O1xuICBwdWJsaWMgYXBwSW5mb3M6IFJlY29yZDxzdHJpbmcsIGludGVyZmFjZXMuQXBwSW5mbz4gPSB7fTtcblxuICBwcml2YXRlIGxvYWRpbmc6IFJlY29yZDxzdHJpbmcsIFByb21pc2U8YW55Pj4gPSB7fTtcblxuICBnZXQgcHJvcHMoKTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnByb3BzKSB8fCBERUZBVUxUX1BST1BTLmdldCh0aGlzKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IGludGVyZmFjZXMuT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIERFRkFVTFRfUFJPUFMuc2V0KHRoaXMsIHt9KTtcbiAgICB0aGlzLm9wdGlvbnMucGx1Z2lucz8uZm9yRWFjaCgocGx1Z2luKSA9PiB0aGlzLnVzZVBsdWdpbihwbHVnaW4pKTtcbiAgICB0aGlzLnVzZVBsdWdpbihHYXJmaXNoSE1SUGx1Z2luKCkpO1xuICAgIHRoaXMudXNlUGx1Z2luKEdhcmZpc2hQZXJmb3JtYW5jZSgpKTtcbiAgICB0aGlzLnVzZVBsdWdpbihHYXJmaXNoUHJlbG9hZFBsdWdpbigpKTtcbiAgICB0aGlzLnVzZVBsdWdpbihHYXJmaXNoTG9nZ2VyKCkpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBQYXJ0aWFsPGludGVyZmFjZXMuT3B0aW9ucz4pIHtcbiAgICBhc3NlcnQoIXRoaXMucnVubmluZywgJ0dhcmZpc2ggaXMgcnVubmluZywgY2FuYHQgc2V0IG9wdGlvbnMnKTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zKSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gZGVlcE1lcmdlQ29uZmlnKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY3JlYXRlUGx1Z2luU3lzdGVtPFQgZXh0ZW5kcyAoYXBpOiB0eXBlb2YgSE9PS1NfQVBJKSA9PiBhbnk+KGNhbGxiYWNrOiBUKSB7XG4gICAgY29uc3QgaG9va3MgPSBjYWxsYmFjayhIT09LU19BUEkpO1xuICAgIHJldHVybiBuZXcgUGx1Z2luU3lzdGVtPFJldHVyblR5cGU8VD4+KGhvb2tzKTtcbiAgfVxuXG4gIHVzZVBsdWdpbihcbiAgICBwbHVnaW46IChjb250ZXh0OiBHYXJmaXNoKSA9PiBpbnRlcmZhY2VzLlBsdWdpbixcbiAgICAuLi5hcmdzOiBBcnJheTxhbnk+XG4gICkge1xuICAgIGFzc2VydCghdGhpcy5ydW5uaW5nLCAnQ2Fubm90IHJlZ2lzdGVyIHBsdWdpbiBhZnRlciBHYXJmaXNoIGlzIHN0YXJ0ZWQuJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicsICdQbHVnaW4gbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIGFyZ3MudW5zaGlmdCh0aGlzKTtcbiAgICBjb25zdCBwbHVnaW5Db25maWcgPSBwbHVnaW4uYXBwbHkobnVsbCwgYXJncykgYXMgaW50ZXJmYWNlcy5QbHVnaW47XG4gICAgYXNzZXJ0KHBsdWdpbkNvbmZpZy5uYW1lLCAnVGhlIHBsdWdpbiBtdXN0IGhhdmUgYSBuYW1lLicpO1xuXG4gICAgaWYgKCF0aGlzLnBsdWdpbnNbcGx1Z2luQ29uZmlnLm5hbWVdKSB7XG4gICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luQ29uZmlnLm5hbWVdID0gcGx1Z2luQ29uZmlnO1xuICAgICAgLy8gUmVnaXN0ZXIgaG9va3MsIENvbXBhdGlibGUgd2l0aCB0aGUgb2xkIGFwaVxuICAgICAgdGhpcy5ob29rcy51c2VQbHVnaW4ocGx1Z2luQ29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICB3YXJuKCdQbGVhc2UgZG8gbm90IHJlZ2lzdGVyIHRoZSBwbHVnaW4gcmVwZWF0ZWRseS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBydW4ob3B0aW9uczogaW50ZXJmYWNlcy5PcHRpb25zID0ge30pIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgd2FybignR2FyZmlzaCBpcyBhbHJlYWR5IHJ1bm5pbmcgbm93LCBDYW5ub3QgcnVuIEdhcmZpc2ggcmVwZWF0ZWRseS4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAvLyBSZWdpc3RlciBwbHVnaW5zXG4gICAgb3B0aW9ucy5wbHVnaW5zPy5mb3JFYWNoKChwbHVnaW4pID0+IHRoaXMudXNlUGx1Z2luKHBsdWdpbikpO1xuICAgIC8vIFB1dCB0aGUgbGlmZWN5Y2xlIHBsdWdpbiBhdCB0aGUgZW5kLCBzbyB0aGF0IHlvdSBjYW4gZ2V0IHRoZSBjaGFuZ2VzIG9mIG90aGVyIHBsdWdpbnNcbiAgICB0aGlzLnVzZVBsdWdpbihHYXJmaXNoT3B0aW9uc0xpZmUodGhpcy5vcHRpb25zLCAnZ2xvYmFsLWxpZmVjeWNsZScpKTtcblxuICAgIC8vIEVtaXQgaG9va3MgYW5kIHJlZ2lzdGVyIGFwcHNcbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVCb290c3RyYXAuZW1pdCh0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMucmVnaXN0ZXJBcHAodGhpcy5vcHRpb25zLmFwcHMgfHwgW10pO1xuICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYm9vdHN0cmFwLmVtaXQodGhpcy5vcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlZ2lzdGVyQXBwKGxpc3Q6IGludGVyZmFjZXMuQXBwSW5mbyB8IEFycmF5PGludGVyZmFjZXMuQXBwSW5mbz4pIHtcbiAgICBjb25zdCBjdXJyZW50QWRkcyA9IHt9O1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZVJlZ2lzdGVyQXBwLmVtaXQobGlzdCk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSBsaXN0ID0gW2xpc3RdO1xuXG4gICAgZm9yIChjb25zdCBhcHBJbmZvIG9mIGxpc3QpIHtcbiAgICAgIGFzc2VydChhcHBJbmZvLm5hbWUsICdNaXNzIGFwcC5uYW1lLicpO1xuICAgICAgaWYgKCF0aGlzLmFwcEluZm9zW2FwcEluZm8ubmFtZV0pIHtcbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIGFwcEluZm8uZW50cnksXG4gICAgICAgICAgYCR7YXBwSW5mby5uYW1lfSBhcHBsaWNhdGlvbiBlbnRyeSBpcyBub3QgdXJsOiAke2FwcEluZm8uZW50cnl9YCxcbiAgICAgICAgKTtcbiAgICAgICAgY3VycmVudEFkZHNbYXBwSW5mby5uYW1lXSA9IGFwcEluZm87XG4gICAgICAgIHRoaXMuYXBwSW5mb3NbYXBwSW5mby5uYW1lXSA9IGFwcEluZm87XG4gICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgIHdhcm4oYFRoZSBcIiR7YXBwSW5mby5uYW1lfVwiIGFwcCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLnJlZ2lzdGVyQXBwLmVtaXQoY3VycmVudEFkZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0RXh0ZXJuYWwobmFtZU9yRXh0T2JqOiBzdHJpbmcgfCBSZWNvcmQ8c3RyaW5nLCBhbnk+LCB2YWx1ZT86IGFueSkge1xuICAgIGFzc2VydChuYW1lT3JFeHRPYmosICdJbnZhbGlkIHBhcmFtZXRlci4nKTtcbiAgICBpZiAodHlwZW9mIG5hbWVPckV4dE9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5hbWVPckV4dE9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICB0aGlzLmV4dGVybmFsc1trZXldICYmXG4gICAgICAgICAgICB3YXJuKGBUaGUgXCIke2tleX1cIiB3aWxsIGJlIG92ZXJ3cml0dGVuIGluIGV4dGVybmFsLmApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxzW2tleV0gPSBuYW1lT3JFeHRPYmpba2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHRlcm5hbHNbbmFtZU9yRXh0T2JqXSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxvYWRBcHAoXG4gICAgYXBwTmFtZTogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBQYXJ0aWFsPE9taXQ8aW50ZXJmYWNlcy5BcHBJbmZvLCAnbmFtZSc+PixcbiAgKTogUHJvbWlzZTxpbnRlcmZhY2VzLkFwcCB8IG51bGw+IHtcbiAgICBhc3NlcnQoYXBwTmFtZSwgJ01pc3MgYXBwTmFtZS4nKTtcblxuICAgIGxldCBhcHBJbmZvID0gZ2VuZXJhdGVBcHBPcHRpb25zKGFwcE5hbWUsIHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgYXN5bmNMb2FkUHJvY2VzcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIC8vIFJldHVybiBub3QgdW5kZWZpbmVkIHR5cGUgZGF0YSBkaXJlY3RseSB0byBlbmQgbG9hZGluZ1xuICAgICAgY29uc3Qgc3RvcCA9IGF3YWl0IHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUxvYWQuZW1pdChhcHBJbmZvKTtcblxuICAgICAgaWYgKHN0b3AgPT09IGZhbHNlKSB7XG4gICAgICAgIHdhcm4oYExvYWQgJHthcHBOYW1lfSBhcHBsaWNhdGlvbiBpcyB0ZXJtaW5hdGVkIGJ5IGJlZm9yZUxvYWQuYCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvL21lcmdlIGNvbmZpZ3MgYWdhaW4gYWZ0ZXIgYmVmb3JlTG9hZCBmb3IgdGhlIHJlYXNvbiBvZiBhcHAgbWF5IGJlIHJlLXJlZ2lzdGVyZWQgZHVyaW5nIGJlZm9yZUxvYWQgcmVzdWx0aW5nIGluIGFuIGluY29ycmVjdCBpbmZvcm1hdGlvblxuICAgICAgYXBwSW5mbyA9IGdlbmVyYXRlQXBwT3B0aW9ucyhhcHBOYW1lLCB0aGlzLCBvcHRpb25zKTtcblxuICAgICAgYXNzZXJ0KFxuICAgICAgICBhcHBJbmZvLmVudHJ5LFxuICAgICAgICBgQ2FuJ3QgbG9hZCB1bmV4cGVjdGVkIGNoaWxkIGFwcCBcIiR7YXBwTmFtZX1cIiwgYCArXG4gICAgICAgICAgJ1BsZWFzZSBwcm92aWRlIHRoZSBlbnRyeSBwYXJhbWV0ZXJzIG9yIHJlZ2lzdGVyZWQgaW4gYWR2YW5jZSBvZiB0aGUgYXBwLicsXG4gICAgICApO1xuXG4gICAgICAvLyBFeGlzdGluZyBjYWNoZSBjYWNoaW5nIGxvZ2ljXG4gICAgICBsZXQgYXBwSW5zdGFuY2U6IGludGVyZmFjZXMuQXBwIHwgbnVsbCA9IG51bGw7XG4gICAgICBjb25zdCBjYWNoZUFwcCA9IHRoaXMuY2FjaGVBcHBzW2FwcE5hbWVdO1xuXG4gICAgICBpZiAoYXBwSW5mby5jYWNoZSAmJiBjYWNoZUFwcCkge1xuICAgICAgICBhcHBJbnN0YW5jZSA9IGNhY2hlQXBwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBbbWFuYWdlciwgcmVzb3VyY2VzLCBpc0h0bWxNb2RlXSA9IGF3YWl0IHByb2Nlc3NBcHBSZXNvdXJjZXMoXG4gICAgICAgICAgICB0aGlzLmxvYWRlcixcbiAgICAgICAgICAgIGFwcEluZm8sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGFwcEluc3RhbmNlID0gbmV3IEFwcChcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgbWFuYWdlcixcbiAgICAgICAgICAgIHJlc291cmNlcyxcbiAgICAgICAgICAgIGlzSHRtbE1vZGUsXG4gICAgICAgICAgICBhcHBJbmZvLmN1c3RvbUxvYWRlcixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gVGhlIHJlZ2lzdHJhdGlvbiBob29rIHdpbGwgYXV0b21hdGljYWxseSByZW1vdmUgdGhlIGR1cGxpY2F0aW9uXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBhcHBJbnN0YW5jZS5ob29rcy51c2VQbHVnaW4odGhpcy5wbHVnaW5zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXBwSW5mby5jYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5jYWNoZUFwcHNbYXBwTmFtZV0gPSBhcHBJbnN0YW5jZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJiB3YXJuKGUpO1xuICAgICAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yTG9hZEFwcC5lbWl0KGUsIGFwcEluZm8pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuaG9va3MubGlmZWN5Y2xlLmFmdGVyTG9hZC5lbWl0KGFwcEluZm8sIGFwcEluc3RhbmNlKTtcbiAgICAgIHJldHVybiBhcHBJbnN0YW5jZTtcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmdbYXBwTmFtZV0pIHtcbiAgICAgIHRoaXMubG9hZGluZ1thcHBOYW1lXSA9IGFzeW5jTG9hZFByb2Nlc3MoKS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMubG9hZGluZ1thcHBOYW1lXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nW2FwcE5hbWVdO1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZXJyb3IsXG4gIGlzT2JqZWN0LFxuICBkZWVwTWVyZ2UsXG4gIGZpbHRlclVuZGVmaW5lZFZhbCxcbiAgYXNzZXJ0LFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBBcHBJbmZvIH0gZnJvbSAnLi9tb2R1bGUvYXBwJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbi8vIGZpbHRlciB1bmxlc3MgZ2xvYmFsIGNvbmZpZ1xuY29uc3QgZmlsdGVyQXBwQ29uZmlnS2V5czogUmVjb3JkPFxuICBFeGNsdWRlPGtleW9mIGludGVyZmFjZXMuT3B0aW9ucywga2V5b2YgQXBwSW5mbz4sXG4gIHRydWVcbj4gPSB7XG4gIGJlZm9yZUJvb3RzdHJhcDogdHJ1ZSxcbiAgYm9vdHN0cmFwOiB0cnVlLFxuICBiZWZvcmVSZWdpc3RlckFwcDogdHJ1ZSxcbiAgcmVnaXN0ZXJBcHA6IHRydWUsXG4gIGJlZm9yZUxvYWQ6IHRydWUsXG4gIGFmdGVyTG9hZDogdHJ1ZSxcbiAgZXJyb3JMb2FkQXBwOiB0cnVlLFxuICBhcHBJRDogdHJ1ZSxcbiAgYXBwczogdHJ1ZSxcbiAgZGlzYWJsZVN0YXRpc3RpY3M6IHRydWUsXG4gIGRpc2FibGVQcmVsb2FkQXBwOiB0cnVlLFxuICBwbHVnaW5zOiB0cnVlLFxuICBhdXRvUmVmcmVzaEFwcDogdHJ1ZSxcbiAgb25Ob3RNYXRjaFJvdXRlcjogdHJ1ZSxcbiAgbG9hZGVyOiB0cnVlLFxufTtcblxuLy8gYHByb3BzYCBtYXkgYmUgcmVzcG9uc2l2ZSBkYXRhXG5leHBvcnQgY29uc3QgZGVlcE1lcmdlQ29uZmlnID0gPFxuICBUIGV4dGVuZHMgeyBwcm9wcz86IFJlY29yZDxzdHJpbmcsIGFueT4gfSxcbiAgVSBleHRlbmRzIHsgcHJvcHM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH0sXG4+KFxuICBnbG9iYWxDb25maWc6IFQsXG4gIGxvY2FsQ29uZmlnOiBVLFxuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIC4uLihnbG9iYWxDb25maWcucHJvcHMgfHwge30pLFxuICAgIC4uLihsb2NhbENvbmZpZy5wcm9wcyB8fCB7fSksXG4gIH07XG5cbiAgY29uc3QgcmVzdWx0ID0gZGVlcE1lcmdlKFxuICAgIGZpbHRlclVuZGVmaW5lZFZhbChnbG9iYWxDb25maWcpLFxuICAgIGZpbHRlclVuZGVmaW5lZFZhbChsb2NhbENvbmZpZyksXG4gICk7XG4gIHJlc3VsdC5wcm9wcyA9IHByb3BzO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEFwcENvbmZpZyA9IChcbiAgZ2xvYmFsQ29uZmlnOiBpbnRlcmZhY2VzLk9wdGlvbnMsXG4gIGxvY2FsQ29uZmlnOiBBcHBJbmZvLFxuKTogQXBwSW5mbyA9PiB7XG4gIGNvbnN0IG1lcmdlUmVzdWx0ID0gZGVlcE1lcmdlQ29uZmlnKGdsb2JhbENvbmZpZywgbG9jYWxDb25maWcpO1xuXG4gIE9iamVjdC5rZXlzKG1lcmdlUmVzdWx0KS5mb3JFYWNoKChrZXk6IGtleW9mIGludGVyZmFjZXMuQ29uZmlnKSA9PiB7XG4gICAgaWYgKGZpbHRlckFwcENvbmZpZ0tleXNba2V5XSkge1xuICAgICAgZGVsZXRlIG1lcmdlUmVzdWx0W2tleV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbWVyZ2VSZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVBcHBPcHRpb25zID0gKFxuICBhcHBOYW1lOiBzdHJpbmcsXG4gIGdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCxcbiAgb3B0aW9ucz86IFBhcnRpYWw8T21pdDxBcHBJbmZvLCAnbmFtZSc+Pixcbik6IEFwcEluZm8gPT4ge1xuICBsZXQgYXBwSW5mbzogQXBwSW5mbyA9IGdhcmZpc2guYXBwSW5mb3NbYXBwTmFtZV0gfHwgeyBuYW1lOiBhcHBOYW1lIH07XG5cbiAgLy8gTWVyZ2UgcmVnaXN0ZXIgYXBwSW5mbyBjb25maWcgYW5kIGxvYWRBcHAgY29uZmlnXG4gIGFwcEluZm8gPSBnZXRBcHBDb25maWcoZ2FyZmlzaC5vcHRpb25zLCB7XG4gICAgLi4uYXBwSW5mbyxcbiAgICAuLi5vcHRpb25zLFxuICAgIHByb3BzOiB7XG4gICAgICAuLi4oYXBwSW5mby5wcm9wcyB8fCB7fSksXG4gICAgICAuLi4ob3B0aW9ucz8ucHJvcHMgfHwge30pLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiBhcHBJbmZvO1xufTtcblxuLy8gRWFjaCBtYWluIGFwcGxpY2F0aW9uIG5lZWRzIHRvIGdlbmVyYXRlIGEgbmV3IGNvbmZpZ3VyYXRpb25cbmV4cG9ydCBjb25zdCBjcmVhdGVEZWZhdWx0T3B0aW9ucyA9ICgpID0+IHtcbiAgY29uc3QgY29uZmlnOiBpbnRlcmZhY2VzLk9wdGlvbnMgPSB7XG4gICAgLy8gZ2xvYmFsIGNvbmZpZ1xuICAgIGFwcElEOiAnJyxcbiAgICBhcHBzOiBbXSxcbiAgICBhdXRvUmVmcmVzaEFwcDogdHJ1ZSxcbiAgICBkaXNhYmxlU3RhdGlzdGljczogZmFsc2UsXG4gICAgZGlzYWJsZVByZWxvYWRBcHA6IGZhbHNlLFxuICAgIC8vIGFwcCBjb25maWdcbiAgICBiYXNlbmFtZTogJy8nLFxuICAgIHByb3BzOiB7fSxcbiAgICAvLyBVc2UgYW4gZW1wdHkgZGl2IGJ5IGRlZmF1bHRcbiAgICBkb21HZXR0ZXI6ICgpID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIHNhbmRib3g6IHtcbiAgICAgIHNuYXBzaG90OiBmYWxzZSxcbiAgICAgIGZpeEJhc2VVcmw6IGZhbHNlLFxuICAgICAgZGlzYWJsZVdpdGg6IGZhbHNlLFxuICAgICAgc3RyaWN0SXNvbGF0aW9uOiBmYWxzZSxcbiAgICB9LFxuICAgIC8vIGdsb2JhbCBob29rc1xuICAgIGJlZm9yZUxvYWQ6ICgpID0+IHt9LFxuICAgIGFmdGVyTG9hZDogKCkgPT4ge30sXG4gICAgZXJyb3JMb2FkQXBwOiAoZSkgPT4gZXJyb3IoZSksXG4gICAgLy8gUm91dGVyXG4gICAgb25Ob3RNYXRjaFJvdXRlcjogKCkgPT4ge30sXG4gICAgLy8gYXBwIGhvb2tzXG4gICAgLy8gQ29kZSBldmFsIGhvb2tzXG4gICAgYmVmb3JlRXZhbDogKCkgPT4ge30sXG4gICAgYWZ0ZXJFdmFsOiAoKSA9PiB7fSxcbiAgICAvLyBBcHAgbW91bnQgaG9va3NcbiAgICBiZWZvcmVNb3VudDogKCkgPT4ge30sXG4gICAgYWZ0ZXJNb3VudDogKCkgPT4ge30sXG4gICAgYmVmb3JlVW5tb3VudDogKCkgPT4ge30sXG4gICAgYWZ0ZXJVbm1vdW50OiAoKSA9PiB7fSxcbiAgICAvLyBFcnJvciBob29rc1xuICAgIGVycm9yTW91bnRBcHA6IChlKSA9PiBlcnJvcihlKSxcbiAgICBlcnJvclVubW91bnRBcHA6IChlKSA9PiBlcnJvcihlKSxcbiAgICBjdXN0b21Mb2FkZXI6IHVuZGVmaW5lZCwgLy8gZGVwcmVjYXRlZFxuICB9O1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwgImltcG9ydCB7IFN5bmNIb29rLCBBc3luY0hvb2ssIFBsdWdpblN5c3RlbSB9IGZyb20gJ0BnYXJmaXNoL2hvb2tzJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbi8vIHByZXR0aWVyLWlnbm9yZVxuZXhwb3J0IGZ1bmN0aW9uIGdsb2JhbExpZmVjeWNsZSgpIHtcbiAgcmV0dXJuIG5ldyBQbHVnaW5TeXN0ZW0oe1xuICAgIGJlZm9yZUJvb3RzdHJhcDogbmV3IFN5bmNIb29rPFtpbnRlcmZhY2VzLk9wdGlvbnNdLCB2b2lkPigpLFxuICAgIGJvb3RzdHJhcDogbmV3IFN5bmNIb29rPFtpbnRlcmZhY2VzLk9wdGlvbnNdLCB2b2lkPigpLFxuICAgIGJlZm9yZVJlZ2lzdGVyQXBwOiBuZXcgU3luY0hvb2s8W2ludGVyZmFjZXMuQXBwSW5mbyB8IEFycmF5PGludGVyZmFjZXMuQXBwSW5mbz5dLCB2b2lkPigpLFxuICAgIHJlZ2lzdGVyQXBwOiBuZXcgU3luY0hvb2s8W1JlY29yZDxzdHJpbmcsIGludGVyZmFjZXMuQXBwSW5mbz5dLCB2b2lkPigpLFxuICAgIGJlZm9yZUxvYWQ6IG5ldyBBc3luY0hvb2s8W2ludGVyZmFjZXMuQXBwSW5mb10+KCksXG4gICAgYWZ0ZXJMb2FkOiBuZXcgQXN5bmNIb29rPFtpbnRlcmZhY2VzLkFwcEluZm8sIGludGVyZmFjZXMuQXBwIHwgbnVsbF0+KCksXG4gICAgZXJyb3JMb2FkQXBwOiBuZXcgU3luY0hvb2s8W0Vycm9yLCBpbnRlcmZhY2VzLkFwcEluZm9dLCB2b2lkPigpLFxuICB9KTtcbn1cblxuLy8gcHJldHRpZXItaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gYXBwTGlmZWN5Y2xlKCkge1xuICByZXR1cm4gbmV3IFBsdWdpblN5c3RlbSh7XG4gICAgYmVmb3JlRXZhbDogbmV3IFN5bmNIb29rPFtcbiAgICAgICAgaW50ZXJmYWNlcy5BcHBJbmZvLFxuICAgICAgICBzdHJpbmcsXG4gICAgICAgIFJlY29yZDxzdHJpbmcsIGFueT4/LFxuICAgICAgICBzdHJpbmc/LFxuICAgICAgICB7IGFzeW5jPzogYm9vbGVhbjsgbm9FbnRyeT86IGJvb2xlYW4gfT8sXG4gICAgICBdLFxuICAgICAgdm9pZFxuICAgID4oKSxcbiAgICBhZnRlckV2YWw6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtcbiAgICAgICAgaW50ZXJmYWNlcy5BcHBJbmZvLFxuICAgICAgICBzdHJpbmcsXG4gICAgICAgIFJlY29yZDxzdHJpbmcsIGFueT4/LFxuICAgICAgICBzdHJpbmc/LFxuICAgICAgICB7IGFzeW5jPzogYm9vbGVhbjsgbm9FbnRyeT86IGJvb2xlYW4gfT8sXG4gICAgICBdLFxuICAgICAgdm9pZFxuICAgID4oKSxcbiAgICBiZWZvcmVNb3VudDogbmV3IFN5bmNIb29rPFtpbnRlcmZhY2VzLkFwcEluZm8sIGludGVyZmFjZXMuQXBwLCBib29sZWFuXSwgdm9pZD4oKSxcbiAgICBhZnRlck1vdW50OiBuZXcgU3luY0hvb2s8W2ludGVyZmFjZXMuQXBwSW5mbywgaW50ZXJmYWNlcy5BcHAsIGJvb2xlYW5dLCB2b2lkPigpLFxuICAgIGVycm9yTW91bnRBcHA6IG5ldyBTeW5jSG9vazxbRXJyb3IsIGludGVyZmFjZXMuQXBwSW5mb10sIHZvaWQ+KCksXG4gICAgYmVmb3JlVW5tb3VudDogbmV3IFN5bmNIb29rPFtpbnRlcmZhY2VzLkFwcEluZm8sIGludGVyZmFjZXMuQXBwLCBib29sZWFuXSwgdm9pZD4oKSxcbiAgICBhZnRlclVubW91bnQ6IG5ldyBTeW5jSG9vazxbaW50ZXJmYWNlcy5BcHBJbmZvLCBpbnRlcmZhY2VzLkFwcCwgYm9vbGVhbl0sIHZvaWQ+KCksXG4gICAgZXJyb3JVbm1vdW50QXBwOiBuZXcgU3luY0hvb2s8W0Vycm9yLCBpbnRlcmZhY2VzLkFwcEluZm9dLCB2b2lkPigpLFxuICAgIGVycm9yRXhlY0NvZGU6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtcbiAgICAgICAgRXJyb3IsXG4gICAgICAgIGludGVyZmFjZXMuQXBwSW5mbyxcbiAgICAgICAgc3RyaW5nLFxuICAgICAgICBSZWNvcmQ8c3RyaW5nLCBhbnk+PyxcbiAgICAgICAgc3RyaW5nPyxcbiAgICAgICAgeyBhc3luYz86IGJvb2xlYW47IG5vRW50cnk/OiBib29sZWFuIH0/LFxuICAgICAgXSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gIH0pO1xufVxuIiwgIi8qIGVzLW1vZHVsZS1sZXhlciAwLjEwLjUgKi9cbmNvbnN0IEE9MT09PW5ldyBVaW50OEFycmF5KG5ldyBVaW50MTZBcnJheShbMV0pLmJ1ZmZlcilbMF07ZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKEUsZz1cIkBcIil7aWYoIUMpcmV0dXJuIGluaXQudGhlbigoKCk9PnBhcnNlKEUpKSk7Y29uc3QgST1FLmxlbmd0aCsxLG89KEMuX19oZWFwX2Jhc2UudmFsdWV8fEMuX19oZWFwX2Jhc2UpKzQqSS1DLm1lbW9yeS5idWZmZXIuYnl0ZUxlbmd0aDtvPjAmJkMubWVtb3J5Lmdyb3coTWF0aC5jZWlsKG8vNjU1MzYpKTtjb25zdCBrPUMuc2EoSS0xKTtpZigoQT9COlEpKEUsbmV3IFVpbnQxNkFycmF5KEMubWVtb3J5LmJ1ZmZlcixrLEkpKSwhQy5wYXJzZSgpKXRocm93IE9iamVjdC5hc3NpZ24obmV3IEVycm9yKGBQYXJzZSBlcnJvciAke2d9OiR7RS5zbGljZSgwLEMuZSgpKS5zcGxpdChcIlxcblwiKS5sZW5ndGh9OiR7Qy5lKCktRS5sYXN0SW5kZXhPZihcIlxcblwiLEMuZSgpLTEpfWApLHtpZHg6Qy5lKCl9KTtjb25zdCBKPVtdLGk9W107Zm9yKDtDLnJpKCk7KXtjb25zdCBBPUMuaXMoKSxRPUMuaWUoKSxCPUMuYWkoKSxnPUMuaWQoKSxJPUMuc3MoKSxvPUMuc2UoKTtsZXQgaztDLmlwKCkmJihrPXcoRS5zbGljZSgtMT09PWc/QS0xOkEsLTE9PT1nP1ErMTpRKSkpLEoucHVzaCh7bjprLHM6QSxlOlEsc3M6SSxzZTpvLGQ6ZyxhOkJ9KX1mb3IoO0MucmUoKTspe2NvbnN0IEE9RS5zbGljZShDLmVzKCksQy5lZSgpKSxRPUFbMF07aS5wdXNoKCdcIic9PT1RfHxcIidcIj09PVE/dyhBKTpBKX1mdW5jdGlvbiB3KEEpe3RyeXtyZXR1cm4oMCxldmFsKShBKX1jYXRjaChBKXt9fXJldHVybltKLGksISFDLmYoKV19ZnVuY3Rpb24gUShBLFEpe2NvbnN0IEI9QS5sZW5ndGg7bGV0IEM9MDtmb3IoO0M8Qjspe2NvbnN0IEI9QS5jaGFyQ29kZUF0KEMpO1FbQysrXT0oMjU1JkIpPDw4fEI+Pj44fX1mdW5jdGlvbiBCKEEsUSl7Y29uc3QgQj1BLmxlbmd0aDtsZXQgQz0wO2Zvcig7QzxCOylRW0NdPUEuY2hhckNvZGVBdChDKyspfWxldCBDO2V4cG9ydCBjb25zdCBpbml0PVdlYkFzc2VtYmx5LmNvbXBpbGUoKEU9XCJBR0Z6YlFFQUFBQUJLZ2hnQVg4QmYyQUVmMzkvZndCZ0FuOS9BR0FBQVg5Z0FBQmdBWDhBWUFOL2YzOEJmMkFDZjM4QmZ3TXFLUUFCQWdNREF3TURBd01EQXdNREF3TUFBQVFFQkFVRUJRQUFBQUFFQkFBR0J3QUNBQUFBQndNR0JBVUJjQUVCQVFVREFRQUJCZzhDZndGQmtQSUFDMzhBUVpEeUFBc0haQkVHYldWdGIzSjVBZ0FDYzJFQUFBRmxBQU1DYVhNQUJBSnBaUUFGQW5OekFBWUNjMlVBQndKaGFRQUlBbWxrQUFrQ2FYQUFDZ0psY3dBTEFtVmxBQXdDY21rQURRSnlaUUFPQVdZQUR3VndZWEp6WlFBUUMxOWZhR1ZoY0Y5aVlYTmxBd0VLaGpRcGFBRUJmMEVBSUFBMkF0UUpRUUFvQXJBSklnRWdBRUVCZEdvaUFFRUFPd0VBUVFBZ0FFRUNhaUlBTmdMWUNVRUFJQUEyQXR3SlFRQkJBRFlDdEFsQkFFRUFOZ0xFQ1VFQVFRQTJBcndKUVFCQkFEWUN1QWxCQUVFQU5nTE1DVUVBUVFBMkFzQUpJQUVMbndFQkEzOUJBQ2dDeEFraEJFRUFRUUFvQXR3SklnVTJBc1FKUVFBZ0JEWUN5QWxCQUNBRlFTQnFOZ0xjQ1NBRVFSeHFRYlFKSUFRYklBVTJBZ0JCQUNnQ3FBa2hCRUVBS0FLa0NTRUdJQVVnQVRZQ0FDQUZJQUEyQWdnZ0JTQUNJQUpCQW1wQkFDQUdJQU5HR3lBRUlBTkdHellDRENBRklBTTJBaFFnQlVFQU5nSVFJQVVnQWpZQ0JDQUZRUUEyQWh3Z0JVRUFLQUtrQ1NBRFJqb0FHQXRJQVFGL1FRQW9Bc3dKSWdKQkNHcEJ1QWtnQWh0QkFDZ0MzQWtpQWpZQ0FFRUFJQUkyQXN3SlFRQWdBa0VNYWpZQzNBa2dBa0VBTmdJSUlBSWdBVFlDQkNBQ0lBQTJBZ0FMQ0FCQkFDZ0M0QWtMRlFCQkFDZ0N2QWtvQWdCQkFDZ0NzQWxyUVFGMUN4NEJBWDlCQUNnQ3ZBa29BZ1FpQUVFQUtBS3dDV3RCQVhWQmZ5QUFHd3NWQUVFQUtBSzhDU2dDQ0VFQUtBS3dDV3RCQVhVTEhnRUJmMEVBS0FLOENTZ0NEQ0lBUVFBb0FyQUphMEVCZFVGL0lBQWJDeDRCQVg5QkFDZ0N2QWtvQWhBaUFFRUFLQUt3Q1d0QkFYVkJmeUFBR3dzN0FRRi9Ba0JCQUNnQ3ZBa29BaFFpQUVFQUtBS2tDVWNOQUVGL0R3c0NRQ0FBUVFBb0FxZ0pSdzBBUVg0UEN5QUFRUUFvQXJBSmEwRUJkUXNMQUVFQUtBSzhDUzBBR0FzVkFFRUFLQUxBQ1NnQ0FFRUFLQUt3Q1d0QkFYVUxGUUJCQUNnQ3dBa29BZ1JCQUNnQ3NBbHJRUUYxQ3lVQkFYOUJBRUVBS0FLOENTSUFRUnhxUWJRSklBQWJLQUlBSWdBMkFyd0pJQUJCQUVjTEpRRUJmMEVBUVFBb0FzQUpJZ0JCQ0dwQnVBa2dBQnNvQWdBaUFEWUN3QWtnQUVFQVJ3c0lBRUVBTFFEa0NRdm5Dd0VHZnlNQVFZRGFBR3NpQVNRQVFRQkJBVG9BNUFsQkFFSC8vd003QWV3SlFRQkJBQ2dDckFrMkF2QUpRUUJCQUNnQ3NBbEJmbW9pQWpZQ2lBcEJBQ0FDUVFBb0F0UUpRUUYwYWlJRE5nS01Da0VBUVFBN0FlWUpRUUJCQURzQjZBbEJBRUVBT3dIcUNVRUFRUUE2QVBRSlFRQkJBRFlDNEFsQkFFRUFPZ0RRQ1VFQUlBRkJnTklBYWpZQytBbEJBQ0FCUVlBU2FqWUMvQWxCQUNBQk5nS0FDa0VBUVFBNkFJUUtBa0FDUUFKQUFrQURRRUVBSUFKQkFtb2lCRFlDaUFvZ0FpQURUdzBCQWtBZ0JDOEJBQ0lEUVhkcVFRVkpEUUFDUUFKQUFrQUNRQUpBSUFOQm0zOXFEZ1VCQ0FnSUFnQUxJQU5CSUVZTkJDQURRUzlHRFFNZ0EwRTdSZzBDREFjTFFRQXZBZW9KRFFFZ0JCQVJSUTBCSUFKQkJHcEJnZ2hCQ2hBb0RRRVFFa0VBTFFEa0NRMEJRUUJCQUNnQ2lBb2lBallDOEFrTUJ3c2dCQkFSUlEwQUlBSkJCR3BCakFoQkNoQW9EUUFRRXd0QkFFRUFLQUtJQ2pZQzhBa01BUXNDUUNBQ0x3RUVJZ1JCS2tZTkFDQUVRUzlIRFFRUUZBd0JDMEVCRUJVTFFRQW9Bb3dLSVFOQkFDZ0NpQW9oQWd3QUN3dEJBQ0VESUFRaEFrRUFMUURRQ1EwQ0RBRUxRUUFnQWpZQ2lBcEJBRUVBT2dEa0NRc0RRRUVBSUFKQkFtb2lCRFlDaUFvQ1FBSkFBa0FDUUFKQUFrQWdBa0VBS0FLTUNrOE5BQ0FFTHdFQUlnTkJkMnBCQlVrTkJRSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFJQU5CWUdvT0NnOE9DQTRPRGc0SEFRSUFDd0pBQWtBQ1FBSkFJQU5Cb0g5cURnb0lFUkVERVFFUkVSRUNBQXNnQTBHRmYyb09Bd1VRQmdzTFFRQXZBZW9KRFE4Z0JCQVJSUTBQSUFKQkJHcEJnZ2hCQ2hBb0RROFFFZ3dQQ3lBRUVCRkZEUTRnQWtFRWFrR01DRUVLRUNnTkRoQVREQTRMSUFRUUVVVU5EU0FDS1FBRVF1eUFoSU93anNBNVVnME5JQUl2QVF3aUJFRjNhaUlDUVJkTERRdEJBU0FDZEVHZmdJQUVjVVVOQ3d3TUMwRUFRUUF2QWVvSklnSkJBV283QWVvSlFRQW9BdndKSUFKQkFuUnFRUUFvQXZBSk5nSUFEQXdMUVFBdkFlb0pJZ05GRFFoQkFDQURRWDlxSWdVN0Flb0pRUUF2QWVnSklnTkZEUXNnQTBFQ2RFRUFLQUtBQ21wQmZHb29BZ0FpQmlnQ0ZFRUFLQUw4Q1NBRlFmLy9BM0ZCQW5ScUtBSUFSdzBMQWtBZ0JpZ0NCQTBBSUFZZ0JEWUNCQXRCQUNBRFFYOXFPd0hvQ1NBR0lBSkJCR28yQWd3TUN3c0NRRUVBS0FMd0NTSUVMd0VBUVNsSERRQkJBQ2dDeEFraUFrVU5BQ0FDS0FJRUlBUkhEUUJCQUVFQUtBTElDU0lDTmdMRUNRSkFJQUpGRFFBZ0FrRUFOZ0ljREFFTFFRQkJBRFlDdEFrTElBRkJnQkJxUVFBdkFlb0pJZ0pxUVFBdEFJUUtPZ0FBUVFBZ0FrRUJhanNCNmdsQkFDZ0MvQWtnQWtFQ2RHb2dCRFlDQUVFQVFRQTZBSVFLREFvTFFRQXZBZW9KSWdKRkRRWkJBQ0FDUVg5cUlnTTdBZW9KSUFKQkFDOEI3QWtpQkVjTkFVRUFRUUF2QWVZSlFYOXFJZ0k3QWVZSlFRQkJBQ2dDK0FrZ0FrSC8vd054UVFGMGFpOEJBRHNCN0FrTEVCWU1DQXNnQkVILy93TkdEUWNnQTBILy93TnhJQVJKRFFRTUJ3dEJKeEFYREFZTFFTSVFGd3dGQ3lBRFFTOUhEUVFDUUFKQUlBSXZBUVFpQWtFcVJnMEFJQUpCTDBjTkFSQVVEQWNMUVFFUUZRd0dDd0pBQWtBQ1FBSkFRUUFvQXZBSklnUXZBUUFpQWhBWVJRMEFBa0FDUUFKQUlBSkJWV29PQkFFRkFnQUZDeUFFUVg1cUx3RUFRVkJxUWYvL0EzRkJDa2tOQXd3RUN5QUVRWDVxTHdFQVFTdEdEUUlNQXdzZ0JFRithaThCQUVFdFJnMEJEQUlMQWtBZ0FrSDlBRVlOQUNBQ1FTbEhEUUZCQUNnQy9BbEJBQzhCNmdsQkFuUnFLQUlBRUJsRkRRRU1BZ3RCQUNnQy9BbEJBQzhCNmdraUEwRUNkR29vQWdBUUdnMEJJQUZCZ0JCcUlBTnFMUUFBRFFFTElBUVFHdzBBSUFKRkRRQkJBU0VFSUFKQkwwWkJBQzBBOUFsQkFFZHhSUTBCQ3hBY1FRQWhCQXRCQUNBRU9nRDBDUXdFQzBFQUx3SHNDVUgvL3dOR1FRQXZBZW9KUlhGQkFDMEEwQWxGY1VFQUx3SG9DVVZ4SVFNTUJnc1FIVUVBSVFNTUJRc2dCRUdnQVVjTkFRdEJBRUVCT2dDRUNndEJBRUVBS0FLSUNqWUM4QWtMUVFBb0FvZ0tJUUlNQUFzTElBRkJnTm9BYWlRQUlBTUxIUUFDUUVFQUtBS3dDU0FBUncwQVFRRVBDeUFBUVg1cUx3RUFFQjRMcGdZQkJIOUJBRUVBS0FLSUNpSUFRUXhxSWdFMkFvZ0tRUUVRSVNFQ0FrQUNRQUpBQWtBQ1FFRUFLQUtJQ2lJRElBRkhEUUFnQWhBbFJRMEJDd0pBQWtBQ1FBSkFBa0FnQWtHZmYyb09EQVlCQXdnQkJ3RUJBUUVCQkFBTEFrQUNRQ0FDUVNwR0RRQWdBa0gyQUVZTkJTQUNRZnNBUncwQ1FRQWdBMEVDYWpZQ2lBcEJBUkFoSVFOQkFDZ0NpQW9oQVFOQUFrQUNRQ0FEUWYvL0EzRWlBa0VpUmcwQUlBSkJKMFlOQUNBQ0VDUWFRUUFvQW9nS0lRSU1BUXNnQWhBWFFRQkJBQ2dDaUFwQkFtb2lBallDaUFvTFFRRVFJUm9DUUNBQklBSVFKaUlEUVN4SERRQkJBRUVBS0FLSUNrRUNhallDaUFwQkFSQWhJUU1MUVFBb0FvZ0tJUUlDUUNBRFFmMEFSZzBBSUFJZ0FVWU5CU0FDSVFFZ0FrRUFLQUtNQ2swTkFRd0ZDd3RCQUNBQ1FRSnFOZ0tJQ2d3QkMwRUFJQU5CQW1vMkFvZ0tRUUVRSVJwQkFDZ0NpQW9pQWlBQ0VDWWFDMEVCRUNFaEFndEJBQ2dDaUFvaEF3SkFJQUpCNWdCSERRQWdBMEVDYWtHZUNFRUdFQ2dOQUVFQUlBTkJDR28yQW9nS0lBQkJBUkFoRUNJUEMwRUFJQU5CZm1vMkFvZ0tEQU1MRUIwUEN3SkFJQU1wQUFKQzdJQ0VnN0NPd0RsU0RRQWdBeThCQ2hBZVJRMEFRUUFnQTBFS2FqWUNpQXBCQVJBaElRSkJBQ2dDaUFvaEF5QUNFQ1FhSUFOQkFDZ0NpQW9RQWtFQVFRQW9Bb2dLUVg1cU5nS0lDZzhMUVFBZ0EwRUVhaUlETmdLSUNndEJBQ0FEUVFScUlnSTJBb2dLUVFCQkFEb0E1QWtEUUVFQUlBSkJBbW8yQW9nS1FRRVFJU0VEUVFBb0FvZ0tJUUlDUUNBREVDUkJJSEpCK3dCSERRQkJBRUVBS0FLSUNrRithallDaUFvUEMwRUFLQUtJQ2lJRElBSkdEUUVnQWlBREVBSUNRRUVCRUNFaUFrRXNSZzBBQWtBZ0FrRTlSdzBBUVFCQkFDZ0NpQXBCZm1vMkFvZ0tEd3RCQUVFQUtBS0lDa0YrYWpZQ2lBb1BDMEVBS0FLSUNpRUNEQUFMQ3c4TFFRQWdBMEVLYWpZQ2lBcEJBUkFoR2tFQUtBS0lDaUVEQzBFQUlBTkJFR28yQW9nS0FrQkJBUkFoSWdKQktrY05BRUVBUVFBb0FvZ0tRUUpxTmdLSUNrRUJFQ0VoQWd0QkFDZ0NpQW9oQXlBQ0VDUWFJQU5CQUNnQ2lBb1FBa0VBUVFBb0FvZ0tRWDVxTmdLSUNnOExJQU1nQTBFT2FoQUNDNnNHQVFSL1FRQkJBQ2dDaUFvaUFFRU1haUlCTmdLSUNnSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFRUUVRSVNJQ1FWbHFEZ2dDQ0FFQ0FRRUJCd0FMSUFKQklrWU5BU0FDUWZzQVJnMENDMEVBS0FLSUNpQUJSZzBIQzBFQUx3SHFDUTBCUVFBb0FvZ0tJUUpCQUNnQ2pBb2hBd05BSUFJZ0EwOE5CQUpBQWtBZ0FpOEJBQ0lCUVNkR0RRQWdBVUVpUncwQkN5QUFJQUVRSWc4TFFRQWdBa0VDYWlJQ05nS0lDZ3dBQ3d0QkFDZ0NpQW9oQWtFQUx3SHFDUTBCQWtBRFFBSkFBa0FDUUNBQ1FRQW9Bb3dLVHcwQVFRRVFJU0lDUVNKR0RRRWdBa0VuUmcwQklBSkIvUUJIRFFKQkFFRUFLQUtJQ2tFQ2FqWUNpQW9MUVFFUUlScEJBQ2dDaUFvaUFpa0FBRUxtZ01pRDhJM0FObElOQmtFQUlBSkJDR28yQW9nS1FRRVFJU0lDUVNKR0RRTWdBa0VuUmcwRERBWUxJQUlRRnd0QkFFRUFLQUtJQ2tFQ2FpSUNOZ0tJQ2d3QUN3c2dBQ0FDRUNJTUJRdEJBRUVBS0FLSUNrRithallDaUFvUEMwRUFJQUpCZm1vMkFvZ0tEd3NRSFE4TFFRQkJBQ2dDaUFwQkFtbzJBb2dLUVFFUUlVSHRBRWNOQVVFQUtBS0lDaUlDUVFKcVFaWUlRUVlRS0EwQlFRQW9BdkFKTHdFQVFTNUdEUUVnQUNBQUlBSkJDR3BCQUNnQ3FBa1FBUThMUVFBb0F2d0pRUUF2QWVvSklnSkJBblJxUVFBb0FvZ0tOZ0lBUVFBZ0FrRUJhanNCNmdsQkFDZ0M4QWt2QVFCQkxrWU5BRUVBUVFBb0FvZ0tJZ0ZCQW1vMkFvZ0tRUUVRSVNFQ0lBQkJBQ2dDaUFwQkFDQUJFQUZCQUVFQUx3SG9DU0lCUVFGcU93SG9DVUVBS0FLQUNpQUJRUUowYWtFQUtBTEVDVFlDQUFKQUlBSkJJa1lOQUNBQ1FTZEdEUUJCQUVFQUtBS0lDa0YrYWpZQ2lBb1BDeUFDRUJkQkFFRUFLQUtJQ2tFQ2FpSUNOZ0tJQ2dKQUFrQUNRRUVCRUNGQlYyb09CQUVDQWdBQ0MwRUFRUUFvQW9nS1FRSnFOZ0tJQ2tFQkVDRWFRUUFvQXNRSklnRWdBallDQkNBQlFRRTZBQmdnQVVFQUtBS0lDaUlDTmdJUVFRQWdBa0YrYWpZQ2lBb1BDMEVBS0FMRUNTSUJJQUkyQWdRZ0FVRUJPZ0FZUVFCQkFDOEI2Z2xCZjJvN0Flb0pJQUZCQUNnQ2lBcEJBbW8yQWd4QkFFRUFMd0hvQ1VGL2Fqc0I2QWtQQzBFQVFRQW9Bb2dLUVg1cU5nS0lDZzhMQzBjQkEzOUJBQ2dDaUFwQkFtb2hBRUVBS0FLTUNpRUJBa0FEUUNBQUlnSkJmbW9nQVU4TkFTQUNRUUpxSVFBZ0FpOEJBRUYyYWc0RUFRQUFBUUFMQzBFQUlBSTJBb2dLQzVnQkFRTi9RUUJCQUNnQ2lBb2lBVUVDYWpZQ2lBb2dBVUVHYWlFQlFRQW9Bb3dLSVFJRFFBSkFBa0FDUUNBQlFYeHFJQUpQRFFBZ0FVRithaThCQUNFREFrQUNRQ0FBRFFBZ0EwRXFSZzBCSUFOQmRtb09CQUlFQkFJRUN5QURRU3BIRFFNTElBRXZBUUJCTDBjTkFrRUFJQUZCZm1vMkFvZ0tEQUVMSUFGQmZtb2hBUXRCQUNBQk5nS0lDZzhMSUFGQkFtb2hBUXdBQ3d1L0FRRUVmMEVBS0FLSUNpRUFRUUFvQW93S0lRRUNRQUpBQTBBZ0FDSUNRUUpxSVFBZ0FpQUJUdzBCQWtBQ1FDQUFMd0VBSWdOQnBIOXFEZ1VCQWdJQ0JBQUxJQU5CSkVjTkFTQUNMd0VFUWZzQVJ3MEJRUUJCQUM4QjVna2lBRUVCYWpzQjVnbEJBQ2dDK0FrZ0FFRUJkR3BCQUM4QjdBazdBUUJCQUNBQ1FRUnFOZ0tJQ2tFQVFRQXZBZW9KUVFGcUlnQTdBZXdKUVFBZ0FEc0I2Z2tQQ3lBQ1FRUnFJUUFNQUFzTFFRQWdBRFlDaUFvUUhROExRUUFnQURZQ2lBb0xpQUVCQkg5QkFDZ0NpQW9oQVVFQUtBS01DaUVDQWtBQ1FBTkFJQUVpQTBFQ2FpRUJJQU1nQWs4TkFTQUJMd0VBSWdRZ0FFWU5BZ0pBSUFSQjNBQkdEUUFnQkVGMmFnNEVBZ0VCQWdFTElBTkJCR29oQVNBREx3RUVRUTFIRFFBZ0EwRUdhaUFCSUFNdkFRWkJDa1liSVFFTUFBc0xRUUFnQVRZQ2lBb1FIUThMUVFBZ0FUWUNpQW9MYkFFQmZ3SkFBa0FnQUVGZmFpSUJRUVZMRFFCQkFTQUJkRUV4Y1EwQkN5QUFRVVpxUWYvL0EzRkJCa2tOQUNBQVFTbEhJQUJCV0dwQi8vOERjVUVIU1hFTkFBSkFJQUJCcFg5cURnUUJBQUFCQUFzZ0FFSDlBRWNnQUVHRmYycEIvLzhEY1VFRVNYRVBDMEVCQ3k0QkFYOUJBU0VCQWtBZ0FFSDJDRUVGRUI4TkFDQUFRWUFKUVFNUUh3MEFJQUJCaGdsQkFoQWZJUUVMSUFFTGd3RUJBbjlCQVNFQkFrQUNRQUpBQWtBQ1FBSkFJQUF2QVFBaUFrRkZhZzRFQlFRRUFRQUxBa0FnQWtHYmYyb09CQU1FQkFJQUN5QUNRU2xHRFFRZ0FrSDVBRWNOQXlBQVFYNXFRWklKUVFZUUh3OExJQUJCZm1vdkFRQkJQVVlQQ3lBQVFYNXFRWW9KUVFRUUh3OExJQUJCZm1wQm5nbEJBeEFmRHd0QkFDRUJDeUFCQzVNREFRSi9RUUFoQVFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FDUUNBQUx3RUFRWngvYWc0VUFBRUNDQWdJQ0FnSUNBTUVDQWdGQ0FZSUNBY0lDd0pBQWtBZ0FFRithaThCQUVHWGYyb09CQUFKQ1FFSkN5QUFRWHhxUWE0SVFRSVFIdzhMSUFCQmZHcEJzZ2hCQXhBZkR3c0NRQUpBSUFCQmZtb3ZBUUJCalg5cURnSUFBUWdMQWtBZ0FFRjhhaThCQUNJQ1FlRUFSZzBBSUFKQjdBQkhEUWdnQUVGNmFrSGxBQkFnRHdzZ0FFRjZha0hqQUJBZ0R3c2dBRUY4YWtHNENFRUVFQjhQQ3lBQVFYNXFMd0VBUWU4QVJ3MEZJQUJCZkdvdkFRQkI1UUJIRFFVQ1FDQUFRWHBxTHdFQUlnSkI4QUJHRFFBZ0FrSGpBRWNOQmlBQVFYaHFRY0FJUVFZUUh3OExJQUJCZUdwQnpBaEJBaEFmRHd0QkFTRUJJQUJCZm1vaUFFSHBBQkFnRFFRZ0FFSFFDRUVGRUI4UEN5QUFRWDVxUWVRQUVDQVBDeUFBUVg1cVFkb0lRUWNRSHc4TElBQkJmbXBCNkFoQkJCQWZEd3NDUUNBQVFYNXFMd0VBSWdKQjd3QkdEUUFnQWtIbEFFY05BU0FBUVh4cVFlNEFFQ0FQQ3lBQVFYeHFRZkFJUVFNUUh5RUJDeUFCQzNBQkFuOENRQUpBQTBCQkFFRUFLQUtJQ2lJQVFRSnFJZ0UyQW9nS0lBQkJBQ2dDakFwUERRRUNRQUpBQWtBZ0FTOEJBQ0lCUWFWL2FnNENBUUlBQ3dKQUlBRkJkbW9PQkFRREF3UUFDeUFCUVM5SERRSU1CQXNRSnhvTUFRdEJBQ0FBUVFScU5nS0lDZ3dBQ3dzUUhRc0xOUUVCZjBFQVFRRTZBTkFKUVFBb0FvZ0tJUUJCQUVFQUtBS01Da0VDYWpZQ2lBcEJBQ0FBUVFBb0FyQUphMEVCZFRZQzRBa0xOQUVCZjBFQklRRUNRQ0FBUVhkcVFmLy9BM0ZCQlVrTkFDQUFRWUFCY2tHZ0FVWU5BQ0FBUVM1SElBQVFKWEVoQVFzZ0FRdEpBUU4vUVFBaEF3SkFJQUFnQWtFQmRDSUNheUlFUVFKcUlnQkJBQ2dDc0FraUJVa05BQ0FBSUFFZ0FoQW9EUUFDUUNBQUlBVkhEUUJCQVE4TElBUXZBUUFRSGlFREN5QURDejBCQW45QkFDRUNBa0JCQUNnQ3NBa2lBeUFBU3cwQUlBQXZBUUFnQVVjTkFBSkFJQU1nQUVjTkFFRUJEd3NnQUVGK2FpOEJBQkFlSVFJTElBSUxuQUVCQTM5QkFDZ0NpQW9oQVFKQUEwQUNRQUpBSUFFdkFRQWlBa0V2UncwQUFrQWdBUzhCQWlJQlFTcEdEUUFnQVVFdlJ3MEVFQlFNQWdzZ0FCQVZEQUVMQWtBQ1FDQUFSUTBBSUFKQmQyb2lBVUVYU3cwQlFRRWdBWFJCbjRDQUJIRkZEUUVNQWdzZ0FoQWpSUTBEREFFTElBSkJvQUZIRFFJTFFRQkJBQ2dDaUFvaUEwRUNhaUlCTmdLSUNpQURRUUFvQW93S1NRMEFDd3NnQWd2Q0F3RUJmd0pBSUFGQklrWU5BQ0FCUVNkR0RRQVFIUThMUVFBb0FvZ0tJUUlnQVJBWElBQWdBa0VDYWtFQUtBS0lDa0VBS0FLa0NSQUJRUUJCQUNnQ2lBcEJBbW8yQW9nS1FRQVFJU0VBUVFBb0FvZ0tJUUVDUUFKQUlBQkI0UUJIRFFBZ0FVRUNha0drQ0VFS0VDaEZEUUVMUVFBZ0FVRithallDaUFvUEMwRUFJQUZCREdvMkFvZ0tBa0JCQVJBaFFmc0FSZzBBUVFBZ0FUWUNpQW9QQzBFQUtBS0lDaUlDSVFBRFFFRUFJQUJCQW1vMkFvZ0tBa0FDUUFKQVFRRVFJU0lBUVNKR0RRQWdBRUVuUncwQlFTY1FGMEVBUVFBb0FvZ0tRUUpxTmdLSUNrRUJFQ0VoQUF3Q0MwRWlFQmRCQUVFQUtBS0lDa0VDYWpZQ2lBcEJBUkFoSVFBTUFRc2dBQkFrSVFBTEFrQWdBRUU2UmcwQVFRQWdBVFlDaUFvUEMwRUFRUUFvQW9nS1FRSnFOZ0tJQ2dKQVFRRVFJU0lBUVNKR0RRQWdBRUVuUmcwQVFRQWdBVFlDaUFvUEN5QUFFQmRCQUVFQUtBS0lDa0VDYWpZQ2lBb0NRQUpBUVFFUUlTSUFRU3hHRFFBZ0FFSDlBRVlOQVVFQUlBRTJBb2dLRHd0QkFFRUFLQUtJQ2tFQ2FqWUNpQXBCQVJBaFFmMEFSZzBBUVFBb0FvZ0tJUUFNQVFzTFFRQW9Bc1FKSWdFZ0FqWUNFQ0FCUVFBb0FvZ0tRUUpxTmdJTUN6QUJBWDhDUUFKQUlBQkJkMm9pQVVFWFN3MEFRUUVnQVhSQmpZQ0FCSEVOQVFzZ0FFR2dBVVlOQUVFQUR3dEJBUXR0QVFKL0FrQUNRQU5BQWtBZ0FFSC8vd054SWdGQmQyb2lBa0VYU3cwQVFRRWdBblJCbjRDQUJIRU5BZ3NnQVVHZ0FVWU5BU0FBSVFJZ0FSQWxEUUpCQUNFQ1FRQkJBQ2dDaUFvaUFFRUNhallDaUFvZ0FDOEJBaUlBRFFBTUFnc0xJQUFoQWdzZ0FrSC8vd054QzJnQkFuOUJBU0VCQWtBQ1FDQUFRVjlxSWdKQkJVc05BRUVCSUFKMFFURnhEUUVMSUFCQitQOERjVUVvUmcwQUlBQkJSbXBCLy84RGNVRUdTUTBBQWtBZ0FFR2xmMm9pQWtFRFN3MEFJQUpCQVVjTkFRc2dBRUdGZjJwQi8vOERjVUVFU1NFQkN5QUJDNHNCQVFKL0FrQkJBQ2dDaUFvaUFpOEJBQ0lEUWVFQVJ3MEFRUUFnQWtFRWFqWUNpQXBCQVJBaElRSkJBQ2dDaUFvaEFBSkFBa0FnQWtFaVJnMEFJQUpCSjBZTkFDQUNFQ1FhUVFBb0FvZ0tJUUVNQVFzZ0FoQVhRUUJCQUNnQ2lBcEJBbW9pQVRZQ2lBb0xRUUVRSVNFRFFRQW9Bb2dLSVFJTEFrQWdBaUFBUmcwQUlBQWdBUkFDQ3lBREMzSUJCSDlCQUNnQ2lBb2hBRUVBS0FLTUNpRUJBa0FDUUFOQUlBQkJBbW9oQWlBQUlBRlBEUUVDUUFKQUlBSXZBUUFpQTBHa2Yyb09BZ0VFQUFzZ0FpRUFJQU5CZG1vT0JBSUJBUUlCQ3lBQVFRUnFJUUFNQUFzTFFRQWdBallDaUFvUUhVRUFEd3RCQUNBQ05nS0lDa0hkQUF0SkFRTi9RUUFoQXdKQUlBSkZEUUFDUUFOQUlBQXRBQUFpQkNBQkxRQUFJZ1ZIRFFFZ0FVRUJhaUVCSUFCQkFXb2hBQ0FDUVg5cUlnSU5BQXdDQ3dzZ0JDQUZheUVEQ3lBREN3dkNBUUlBUVlBSUM2UUJBQUI0QUhBQWJ3QnlBSFFBYlFCd0FHOEFjZ0IwQUdVQWRBQmhBR1lBY2dCdkFHMEFjd0J6QUdVQWNnQjBBSFlBYndCNUFHa0FaUUJrQUdVQWJBQmxBR2tBYmdCekFIUUFZUUJ1QUhRQWVRQnlBR1VBZEFCMUFISUFaQUJsQUdJQWRRQm5BR2NBWlFCaEFIY0FZUUJwQUhRQWFBQnlBSGNBYUFCcEFHd0FaUUJtQUc4QWNnQnBBR1lBWXdCaEFIUUFZd0JtQUdrQWJnQmhBR3dBYkFCbEFHd0Fjd0FBUWFRSkN4QUJBQUFBQWdBQUFBQUVBQUFRT1FBQVwiLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBCdWZmZXI/QnVmZmVyLmZyb20oRSxcImJhc2U2NFwiKTpVaW50OEFycmF5LmZyb20oYXRvYihFKSwoQT0+QS5jaGFyQ29kZUF0KDApKSkpKS50aGVuKFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKS50aGVuKCgoe2V4cG9ydHM6QX0pPT57Qz1BfSkpO3ZhciBFOyIsICJpbXBvcnQgeyBJbXBvcnRTcGVjaWZpZXIsIGluaXQsIHBhcnNlIH0gZnJvbSAnZXMtbW9kdWxlLWxleGVyJztcbmltcG9ydCB0eXBlIHsgSmF2YVNjcmlwdE1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHsgTG9jayB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7XG4gIGlzQWJzb2x1dGUsXG4gIHRyYW5zZm9ybVVybCxcbiAgaGF2ZVNvdXJjZW1hcCxcbiAgY3JlYXRlU291cmNlbWFwLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi4vaW50ZXJmYWNlJztcbmltcG9ydCB0eXBlIHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xuXG5jb25zdCBfX0dBUkZJU0hfRVNNX0VOVl9fID0gJ19fR0FSRklTSF9FU01fRU5WX18nO1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlSW1wb3J0UHJvY2Vzc29yID0gKGNvZGU6IHN0cmluZykgPT4ge1xuICAvLyBzcGxpdCBjb2RlIGludG8gdHdvIHNlZ21lbnRzXG4gIC8vIGF2b2lkICdwYXVzZSBiZWZvcmUgcG90ZW50aWFsIG91dCBvZiBtZW1vcnkgY3Jhc2gnIGluIGNocm9tZVxuICAvLyBmb3Igc3VwZXIgbGFyZ2Ugc3RyaW5nLCBpdCBjYW4gaW1wcm92ZSBwZXJmb3JtYW5jZSBhcyB3ZWxsXG4gIGxldCBmaW5hbENvZGUgPSAnJztcbiAgbGV0IHJlc2V0Q29kZSA9IGNvZGU7XG4gIGxldCBwcmV2Q29kZUluZGV4ID0gMDtcbiAgY29uc3QgcmF3SW1wb3J0ID0gJ2ltcG9ydCc7XG4gIGNvbnN0IHdyYXBJbXBvcnQgPSAnX2ltcG9ydF8nO1xuICByZXR1cm4gKGltcG9ydEFuYWx5c2lzOiBJbXBvcnRTcGVjaWZpZXIsIG5ld01vZHVsZU5hbWUgPSAnJykgPT4ge1xuICAgIGNvbnN0IHsgZDogaW1wb3J0VHlwZSwgbjogbW9kdWxlTmFtZSwgcywgZSwgc3MsIHNlIH0gPSBpbXBvcnRBbmFseXNpcztcbiAgICBjb25zdCBpc0R5bmFtaWNJbXBvcnQgPSBpbXBvcnRUeXBlID4gLTE7XG4gICAgaWYgKGlzRHluYW1pY0ltcG9ydCkge1xuICAgICAgLy8gZHluYW1pYyBpbXBvcnRcbiAgICAgIC8vIHJlcGxhY2UgJ2ltcG9ydCcga2V5d29yZFxuICAgICAgY29uc3QgY29kZVN0YXJ0ID0gc3MgLSBwcmV2Q29kZUluZGV4O1xuICAgICAgY29uc3QgY29kZUVuZCA9IHNlIC0gcHJldkNvZGVJbmRleDtcbiAgICAgIGNvbnN0IGR5bmFtaWNJbXBvcnRTdGF0ZW1lbnQgPSByZXNldENvZGUuc2xpY2UoY29kZVN0YXJ0LCBjb2RlRW5kKTtcbiAgICAgIC8vIGFwcGVuZCB0aGUgY29kZSBiZWZvcmUgaW1wb3J0IHN0YXRlbWVudFxuICAgICAgZmluYWxDb2RlICs9IHJlc2V0Q29kZS5zbGljZSgwLCBjb2RlU3RhcnQpO1xuICAgICAgLy8gYXBwZW5kIGltcG9ydCBzdGF0ZW1lbnRcbiAgICAgIGZpbmFsQ29kZSArPSBkeW5hbWljSW1wb3J0U3RhdGVtZW50LnJlcGxhY2UocmF3SW1wb3J0LCB3cmFwSW1wb3J0KTtcbiAgICAgIHJlc2V0Q29kZSA9IHJlc2V0Q29kZS5zbGljZShjb2RlRW5kKTtcbiAgICAgIHByZXZDb2RlSW5kZXggPSBzZTtcbiAgICB9IGVsc2UgaWYgKG1vZHVsZU5hbWUpIHtcbiAgICAgIC8vIHN0YXRpYyBpbXBvcnRcbiAgICAgIC8vIHJlcGxhY2UgbW9kdWxlIG5hbWVcbiAgICAgIGNvbnN0IGNvZGVTdGFydCA9IHMgLSBwcmV2Q29kZUluZGV4O1xuICAgICAgY29uc3QgY29kZUVuZCA9IGUgLSBwcmV2Q29kZUluZGV4O1xuICAgICAgLy8gYXBwZW5kIHRoZSBjb2RlIGJlZm9yZSBpbXBvcnQgbmFtZVxuICAgICAgZmluYWxDb2RlICs9IHJlc2V0Q29kZS5zbGljZSgwLCBjb2RlU3RhcnQpO1xuICAgICAgLy8gYXBwZW5kIG5ldyBpbXBvcnQgbmFtZVxuICAgICAgZmluYWxDb2RlICs9IG5ld01vZHVsZU5hbWU7XG4gICAgICByZXNldENvZGUgPSByZXNldENvZGUuc2xpY2UoY29kZUVuZCk7XG4gICAgICBwcmV2Q29kZUluZGV4ID0gZTtcbiAgICB9XG4gICAgcmV0dXJuIFtmaW5hbENvZGUsIHJlc2V0Q29kZV07XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuU2hlbGxFeGVjdXRpb25Db2RlID0gKFxuICBpZDogc3RyaW5nIHwgbnVtYmVyLFxuICBzb3VyY2VNb2R1bGVOYW1lOiBzdHJpbmcsXG4gIHNoZWxsVXJsOiBzdHJpbmcsXG4pID0+XG4gIGA7aW1wb3J0KmFzIG0kJF8ke2lkfSBmcm9tJyR7c291cmNlTW9kdWxlTmFtZX0nO2ltcG9ydHt1JCRfIGFzIHUkJF8ke2lkfX1mcm9tJyR7c2hlbGxVcmx9Jzt1JCRfJHtpZH0obSQkXyR7aWR9KWA7XG5cbmludGVyZmFjZSBNb2R1bGVDYWNoZUl0ZW0ge1xuICBibG9iVXJsPzogc3RyaW5nO1xuICBzaGVsbFVybD86IHN0cmluZztcbiAgc2hlbGxFeGVjdXRlZD86IGJvb2xlYW47XG4gIGFuYWx5c2lzPzogUmV0dXJuVHlwZTx0eXBlb2YgcGFyc2U+O1xuICBzb3VyY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEVTTW9kdWxlTG9hZGVyIHtcbiAgcHJpdmF0ZSBhcHA6IEFwcDtcbiAgcHJpdmF0ZSBnbG9iYWxWYXJLZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBtb2R1bGVDYWNoZTogUmVjb3JkPHN0cmluZywgTW9kdWxlQ2FjaGVJdGVtPiA9IHt9O1xuICBwcml2YXRlIGxvY2sgPSBuZXcgTG9jaygpO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5nbG9iYWxWYXJLZXkgPSBgJHtfX0dBUkZJU0hfRVNNX0VOVl9ffV8ke3RoaXMuYXBwLmFwcElkfWA7XG4gIH1cblxuICBwcml2YXRlIGV4ZWNNb2R1bGVDb2RlKGJsb2JVcmw6IHN0cmluZykge1xuICAgIGNvbnN0IHJlc3VsdCA9ICgwLCBldmFsKShgaW1wb3J0KCcke2Jsb2JVcmx9JylgKTtcbiAgICB0aGlzLmxvY2sucmVsZWFzZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJsb2JVcmwoY29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2NvZGVdLCB7IHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QmxvYlVybChzYXZlSWQ6IHN0cmluZywgYmxvYlVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2R1bGVDYWNoZVtzYXZlSWRdLmJsb2JVcmwgPSBibG9iVXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaE1vZHVsZVJlc291cmNlKFxuICAgIGxvY2tJZDogbnVtYmVyLFxuICAgIGVudlZhclN0cjogc3RyaW5nLFxuICAgIG5vRW50cnlFbnZWYXJTdHI6IHN0cmluZyxcbiAgICBzYXZlVXJsOiBzdHJpbmcsXG4gICAgcmVxdWVzdFVybDogc3RyaW5nLFxuICApIHtcbiAgICBjb25zdCB7IHJlc291cmNlTWFuYWdlciB9ID1cbiAgICAgIGF3YWl0IHRoaXMuYXBwLmNvbnRleHQubG9hZGVyLmxvYWQ8SmF2YVNjcmlwdE1hbmFnZXI+KHtcbiAgICAgICAgc2NvcGU6IHRoaXMuYXBwLm5hbWUsXG4gICAgICAgIHVybDogcmVxdWVzdFVybCxcbiAgICAgIH0pO1xuICAgIC8vIE1heWJlIG90aGVyIHJlc291cmNlXG4gICAgaWYgKHJlc291cmNlTWFuYWdlcikge1xuICAgICAgbGV0IHNvdXJjZW1hcCA9ICcnO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICAgICAgbGV0IHsgdXJsLCBzY3JpcHRDb2RlIH0gPSByZXNvdXJjZU1hbmFnZXI7XG5cbiAgICAgIGlmICghaGF2ZVNvdXJjZW1hcChzY3JpcHRDb2RlKSkge1xuICAgICAgICBzb3VyY2VtYXAgPSBhd2FpdCBjcmVhdGVTb3VyY2VtYXAoc2NyaXB0Q29kZSwgcmVxdWVzdFVybCk7XG4gICAgICB9XG4gICAgICBzY3JpcHRDb2RlID0gYXdhaXQgdGhpcy5hbmFseXNpc01vZHVsZShcbiAgICAgICAgbG9ja0lkLFxuICAgICAgICBzY3JpcHRDb2RlLFxuICAgICAgICBlbnZWYXJTdHIsXG4gICAgICAgIG5vRW50cnlFbnZWYXJTdHIsXG4gICAgICAgIHNhdmVVcmwsXG4gICAgICAgIHVybCxcbiAgICAgICk7XG4gICAgICBjb25zdCBibG9iVXJsID0gdGhpcy5jcmVhdGVCbG9iVXJsKFxuICAgICAgICBgaW1wb3J0Lm1ldGEudXJsPScke3VybH0nOyR7dGhpcy5hcHAuaXNOb0VudHJ5U2NyaXB0KHVybCkgPyBub0VudHJ5RW52VmFyU3RyIDogZW52VmFyU3RyfSR7c2NyaXB0Q29kZX1cXG4ke3NvdXJjZW1hcH1gLFxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0QmxvYlVybChzYXZlVXJsLCBibG9iVXJsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFVybChyZWZlclVybCwgdGFyZ2V0VXJsKSB7XG4gICAgcmV0dXJuICFpc0Fic29sdXRlKHRhcmdldFVybCkgJiYgcmVmZXJVcmxcbiAgICAgID8gdHJhbnNmb3JtVXJsKHJlZmVyVXJsLCB0YXJnZXRVcmwpXG4gICAgICA6IHRhcmdldFVybDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlbG9hZFN0YXRpY01vZHVsZUFzeW5jKFxuICAgIGFuYWx5c2lzOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZT4sXG4gICAgcmVhbFVybD86IHN0cmluZyB8IG51bGwsXG4gICkge1xuICAgIGNvbnN0IFtpbXBvcnRzXSA9IGFuYWx5c2lzO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGltcG9ydHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGltcG9ydEFuYWx5c2lzID0gaW1wb3J0c1tpXTtcbiAgICAgIGNvbnN0IHsgZDogaW1wb3J0VHlwZSwgbjogbW9kdWxlTmFtZSB9ID0gaW1wb3J0QW5hbHlzaXM7XG4gICAgICBjb25zdCBpc0R5bmFtaWNJbXBvcnQgPSBpbXBvcnRUeXBlID4gLTE7XG4gICAgICBpZiAobW9kdWxlTmFtZSAmJiAhaXNEeW5hbWljSW1wb3J0KSB7XG4gICAgICAgIC8vIGFzeW5jIHByZWxvYWQgYWxsIHN0YXRpYyBpbXBvcnQgbW9kdWxlIG9mIGN1cnJlbnQgZmlsZVxuICAgICAgICB0aGlzLmFwcC5jb250ZXh0LmxvYWRlci5sb2FkPEphdmFTY3JpcHRNYW5hZ2VyPih7XG4gICAgICAgICAgc2NvcGU6IHRoaXMuYXBwLm5hbWUsXG4gICAgICAgICAgdXJsOiB0aGlzLmdldFVybChyZWFsVXJsLCBtb2R1bGVOYW1lKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhbmFseXNpc01vZHVsZShcbiAgICBsb2NrSWQ6IG51bWJlcixcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgZW52VmFyU3RyOiBzdHJpbmcsXG4gICAgbm9FbnRyeUVudlZhclN0cjogc3RyaW5nLFxuICAgIGJhc2VVcmw/OiBzdHJpbmcsXG4gICAgcmVhbFVybD86IHN0cmluZyB8IG51bGwsXG4gICkge1xuICAgIC8vIHdhaXQgZm9yIHRoZSBvdGhlciB0YXNrXG4gICAgYXdhaXQgdGhpcy5sb2NrLndhaXQobG9ja0lkKTtcblxuICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciB0aGUgV2ViIEFzc2VtYmx5IGJvb3RcbiAgICBhd2FpdCBpbml0O1xuXG4gICAgY29uc3QgYW5hbHlzaXMgPSBwYXJzZShjb2RlLCByZWFsVXJsIHx8ICcnKTtcbiAgICBjb25zdCB0aGlzTW9kdWxlOiBNb2R1bGVDYWNoZUl0ZW0gPSB7XG4gICAgICBhbmFseXNpcyxcbiAgICAgIHNvdXJjZTogY29kZSxcbiAgICB9O1xuXG4gICAgaWYgKGJhc2VVcmwpIHtcbiAgICAgIHRoaXMubW9kdWxlQ2FjaGVbYmFzZVVybF0gPSB0aGlzTW9kdWxlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSBbJycsIGNvZGVdO1xuICAgIGxldCBzaGVsbEV4ZWN1dGlvbkNvZGUgPSAnJztcbiAgICBjb25zdCBkeW5hbWljSW1wb3J0ID0gYHZhciBfaW1wb3J0Xz0odXJsKT0+d2luZG93LiR7dGhpcy5nbG9iYWxWYXJLZXl9LmltcG9ydCh1cmwsJyR7YmFzZVVybH0nLCcke3JlYWxVcmx9Jyk7YDtcbiAgICBjb25zdCBwcm9jZXNzSW1wb3J0TW9kdWxlID0gZ2V0TW9kdWxlSW1wb3J0UHJvY2Vzc29yKGNvZGUpO1xuICAgIGNvbnN0IFtpbXBvcnRzXSA9IGFuYWx5c2lzO1xuXG4gICAgdGhpcy5wcmVsb2FkU3RhdGljTW9kdWxlQXN5bmMoYW5hbHlzaXMsIHJlYWxVcmwpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGltcG9ydHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGltcG9ydEFuYWx5c2lzID0gaW1wb3J0c1tpXTtcbiAgICAgIGNvbnN0IHsgZDogaW1wb3J0VHlwZSwgbjogbW9kdWxlTmFtZSB9ID0gaW1wb3J0QW5hbHlzaXM7XG4gICAgICBjb25zdCBpc0R5bmFtaWNJbXBvcnQgPSBpbXBvcnRUeXBlID4gLTE7XG4gICAgICBsZXQgc2F2ZVVybCA9IG1vZHVsZU5hbWUgfHwgJyc7XG4gICAgICBsZXQgbmV3TW9kdWxlTmFtZSA9ICcnO1xuICAgICAgaWYgKG1vZHVsZU5hbWUgJiYgIWlzRHluYW1pY0ltcG9ydCkge1xuICAgICAgICAvLyBzdGF0aWMgaW1wb3J0XG4gICAgICAgIGNvbnN0IHJlcXVlc3RVcmwgPSB0aGlzLmdldFVybChyZWFsVXJsLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgc2F2ZVVybCA9IHRoaXMuZ2V0VXJsKGJhc2VVcmwsIG1vZHVsZU5hbWUpO1xuXG4gICAgICAgIGxldCBjdXJyZW50TW9kdWxlID0gdGhpcy5tb2R1bGVDYWNoZVtzYXZlVXJsXTtcbiAgICAgICAgaWYgKGN1cnJlbnRNb2R1bGUgJiYgIWN1cnJlbnRNb2R1bGUuYmxvYlVybCkge1xuICAgICAgICAgIC8vIGNpcmN1bGFyIGRlcGVuZGVuY3lcbiAgICAgICAgICBpZiAoIWN1cnJlbnRNb2R1bGUuc2hlbGxVcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IFtjdXJyZW50TW9kdWxlSW1wb3J0cywgY3VycmVudE1vZHVsZUV4cG9ydHNdID1cbiAgICAgICAgICAgICAgY3VycmVudE1vZHVsZS5hbmFseXNpcyE7XG4gICAgICAgICAgICAvLyBjYXNlICdleHBvcnQgKiBmcm9tIFwieHh4XCInXG4gICAgICAgICAgICAvLyB3ZSBjYW4gZmluZCB0aGlzIGluIHRoZSBpbXBvcnQgc3RhdGVtZW50XG4gICAgICAgICAgICBjb25zdCB3aWxkY2FyZEV4cG9ydHMgPSBjdXJyZW50TW9kdWxlSW1wb3J0cy5maWx0ZXIoXG4gICAgICAgICAgICAgIChpbXBvcnRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGVtZW50ID0gY3VycmVudE1vZHVsZS5zb3VyY2Uuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgaW1wb3J0SXRlbS5zcyxcbiAgICAgICAgICAgICAgICAgIGltcG9ydEl0ZW0uc2UsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gL15leHBvcnRcXHMqXFwqXFxzKmZyb21cXHMqLy50ZXN0KHN0YXRlbWVudCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRFeHBvcnRTdGF0ZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGwgPSB3aWxkY2FyZEV4cG9ydHMubGVuZ3RoOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgIC8vIGZpbmQgd2lsZGNhcmQgZXhwb3J0c1xuICAgICAgICAgICAgICBjb25zdCB3aWxkY2FyZEV4cG9ydCA9IHdpbGRjYXJkRXhwb3J0c1tqXTtcbiAgICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRFeHBvcnRVcmwgPSB3aWxkY2FyZEV4cG9ydC5uIHx8ICcnO1xuICAgICAgICAgICAgICBjb25zdCB3aWxkY2FyZEV4cG9ydFNhdmVVcmwgPSB0aGlzLmdldFVybChcbiAgICAgICAgICAgICAgICBiYXNlVXJsLFxuICAgICAgICAgICAgICAgIHdpbGRjYXJkRXhwb3J0VXJsLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAvLyBmZXRjaCBhbmQgYW5hbHl6ZSB3aWxkY2FyZCBleHBvcnQgbW9kdWxlXG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hNb2R1bGVSZXNvdXJjZShcbiAgICAgICAgICAgICAgICBsb2NrSWQsXG4gICAgICAgICAgICAgICAgZW52VmFyU3RyLFxuICAgICAgICAgICAgICAgIG5vRW50cnlFbnZWYXJTdHIsXG4gICAgICAgICAgICAgICAgd2lsZGNhcmRFeHBvcnRTYXZlVXJsLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXJsKHJlYWxVcmwsIHdpbGRjYXJkRXhwb3J0VXJsKSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRNb2R1bGUgPSB0aGlzLm1vZHVsZUNhY2hlW3dpbGRjYXJkRXhwb3J0U2F2ZVVybF07XG4gICAgICAgICAgICAgIGlmICh3aWxkY2FyZE1vZHVsZT8uYmxvYlVybCkge1xuICAgICAgICAgICAgICAgIHdpbGRjYXJkRXhwb3J0U3RhdGVtZW50cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgYGV4cG9ydCAqIGZyb20gJyR7d2lsZGNhcmRNb2R1bGUuYmxvYlVybH0nYCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBzaGVsbCBjb2RlIGZvciBkZWxheSBhc3NpZ25tZW50XG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlLnNoZWxsVXJsID0gdGhpcy5jcmVhdGVCbG9iVXJsKFxuICAgICAgICAgICAgICBgZXhwb3J0IGZ1bmN0aW9uIHUkJF8obSl7JHtjdXJyZW50TW9kdWxlRXhwb3J0c1xuICAgICAgICAgICAgICAgIC5tYXAoKG5hbWUpID0+XG4gICAgICAgICAgICAgICAgICBuYW1lID09PSAnZGVmYXVsdCcgPyAnZCQkXz1tLmRlZmF1bHQnIDogYCR7bmFtZX09bS4ke25hbWV9YCxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmpvaW4oJywnKX19JHtjdXJyZW50TW9kdWxlRXhwb3J0c1xuICAgICAgICAgICAgICAgIC5tYXAoKG5hbWUpID0+XG4gICAgICAgICAgICAgICAgICBuYW1lID09PSAnZGVmYXVsdCdcbiAgICAgICAgICAgICAgICAgICAgPyAnbGV0IGQkJF87ZXhwb3J0e2QkJF8gYXMgZGVmYXVsdH0nXG4gICAgICAgICAgICAgICAgICAgIDogYGV4cG9ydCBsZXQgJHtuYW1lfWAsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5qb2luKCc7Jyl9JHtcbiAgICAgICAgICAgICAgICB3aWxkY2FyZEV4cG9ydFN0YXRlbWVudHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICA/IGA7JHt3aWxkY2FyZEV4cG9ydFN0YXRlbWVudHMuam9pbignOycpfWBcbiAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgfVxcbi8vIyBzb3VyY2VVUkw9JHtzYXZlVXJsfT9jeWNsZWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdNb2R1bGVOYW1lID0gY3VycmVudE1vZHVsZS5zaGVsbFVybDtcbiAgICAgICAgfSBlbHNlIGlmICghY3VycmVudE1vZHVsZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hNb2R1bGVSZXNvdXJjZShsb2NrSWQsIGVudlZhclN0ciwgbm9FbnRyeUVudlZhclN0ciwgc2F2ZVVybCwgcmVxdWVzdFVybCk7XG4gICAgICAgICAgY3VycmVudE1vZHVsZSA9IHRoaXMubW9kdWxlQ2FjaGVbc2F2ZVVybF07XG4gICAgICAgICAgY29uc3QgeyBibG9iVXJsLCBzaGVsbFVybCwgc2hlbGxFeGVjdXRlZCB9ID0gY3VycmVudE1vZHVsZTtcbiAgICAgICAgICBuZXdNb2R1bGVOYW1lID0gYmxvYlVybCE7XG4gICAgICAgICAgaWYgKHNoZWxsVXJsICYmICFzaGVsbEV4ZWN1dGVkKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGNpcmN1bGFyIHNoZWxsLCBqdXN0IGV4ZWN1dGUgaXRcbiAgICAgICAgICAgIHNoZWxsRXhlY3V0aW9uQ29kZSArPSBnZW5TaGVsbEV4ZWN1dGlvbkNvZGUoXG4gICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgIG5ld01vZHVsZU5hbWUsXG4gICAgICAgICAgICAgIHNoZWxsVXJsLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuc2hlbGxFeGVjdXRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld01vZHVsZU5hbWUgPSBjdXJyZW50TW9kdWxlLmJsb2JVcmwhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBwcm9jZXNzSW1wb3J0TW9kdWxlKGltcG9ydEFuYWx5c2lzLCBuZXdNb2R1bGVOYW1lIHx8IG1vZHVsZU5hbWUpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyXG4gICAgdGhpc01vZHVsZS5zb3VyY2UgPSAnJztcbiAgICBkZWxldGUgdGhpc01vZHVsZS5hbmFseXNpcztcblxuICAgIHJldHVybiBgJHtkeW5hbWljSW1wb3J0fSR7c2hlbGxFeGVjdXRpb25Db2RlfTske3Jlc3VsdC5qb2luKCcnKX1gO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1vZHVsZUNhY2hlKSB7XG4gICAgICBjb25zdCB7IGJsb2JVcmwsIHNoZWxsVXJsIH0gPSB0aGlzLm1vZHVsZUNhY2hlW2tleV07XG4gICAgICBpZiAoYmxvYlVybCkge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVcmwpO1xuICAgICAgfVxuICAgICAgaWYgKHNoZWxsVXJsKSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2hlbGxVcmwpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm1vZHVsZUNhY2hlID0ge307XG4gICAgdGhpcy5sb2NrLmNsZWFyKCk7XG4gICAgZGVsZXRlIHRoaXMuYXBwLmdsb2JhbFt0aGlzLmdsb2JhbFZhcktleV07XG4gIH1cblxuICBsb2FkKFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBlbnY6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgdXJsPzogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zLFxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICh1cmwgJiYgdGhpcy5tb2R1bGVDYWNoZVt1cmxdKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdlblNoZWxsQ29kZVdyYXBwZXIgPSAoXG4gICAgICAgIGJsb2JVcmw6IHN0cmluZyxcbiAgICAgICAgc2hlbGxVcmw6IHN0cmluZyxcbiAgICAgICAgc291cmNlVXJsOiBzdHJpbmcsXG4gICAgICApID0+IHtcbiAgICAgICAgcmV0dXJuIGBleHBvcnQgKiBmcm9tICcke2Jsb2JVcmx9JyR7Z2VuU2hlbGxFeGVjdXRpb25Db2RlKFxuICAgICAgICAgIDAsXG4gICAgICAgICAgYmxvYlVybCxcbiAgICAgICAgICBzaGVsbFVybCxcbiAgICAgICAgKX1cXG4vLyMgc291cmNlVVJMPSR7c291cmNlVXJsfT9jeWNsZWA7XG4gICAgICB9O1xuXG4gICAgICBlbnYgPSB7XG4gICAgICAgIC4uLmVudixcbiAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgaW1wb3J0OiBhc3luYyAobW9kdWxlSWQ6IHN0cmluZywgYmFzZVVybDogc3RyaW5nLCByZWFsVXJsOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBsZXQgc2F2ZVVybCA9IG1vZHVsZUlkO1xuICAgICAgICAgIGxldCByZXF1ZXN0VXJsID0gbW9kdWxlSWQ7XG5cbiAgICAgICAgICBpZiAoIWlzQWJzb2x1dGUobW9kdWxlSWQpKSB7XG4gICAgICAgICAgICBzYXZlVXJsID0gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIG1vZHVsZUlkKTtcbiAgICAgICAgICAgIHJlcXVlc3RVcmwgPSB0cmFuc2Zvcm1VcmwocmVhbFVybCwgbW9kdWxlSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgdGFyZ2V0TW9kdWxlID0gdGhpcy5tb2R1bGVDYWNoZVtzYXZlVXJsXTtcbiAgICAgICAgICBpZiAoIXRhcmdldE1vZHVsZT8uYmxvYlVybCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaE1vZHVsZVJlc291cmNlKHRoaXMubG9jay5nZW5JZCgpLCBlbnZWYXJTdHIsIG5vRW50cnlFbnZWYXJTdHIsIHNhdmVVcmwsIHJlcXVlc3RVcmwpO1xuICAgICAgICAgICAgdGFyZ2V0TW9kdWxlID0gdGhpcy5tb2R1bGVDYWNoZVtzYXZlVXJsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGFyZ2V0TW9kdWxlICYmXG4gICAgICAgICAgICB0YXJnZXRNb2R1bGUuc2hlbGxVcmwgJiZcbiAgICAgICAgICAgICF0YXJnZXRNb2R1bGUuc2hlbGxFeGVjdXRlZCAmJlxuICAgICAgICAgICAgdGFyZ2V0TW9kdWxlLmJsb2JVcmxcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSB0b3AgbGV2ZWwgbG9hZCBpcyBhIHNoZWxsIGNvZGUsIHdlIG5lZWQgdG8gcnVuIGl0cyB1cGRhdGUgZnVuY3Rpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4ZWNNb2R1bGVDb2RlKFxuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJsb2JVcmwoXG4gICAgICAgICAgICAgICAgZ2VuU2hlbGxDb2RlV3JhcHBlcihcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1vZHVsZS5ibG9iVXJsLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9kdWxlLnNoZWxsVXJsLFxuICAgICAgICAgICAgICAgICAgc2F2ZVVybCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXhlY01vZHVsZUNvZGUodGFyZ2V0TW9kdWxlLmJsb2JVcmwhKTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBnZW5FbnZWYXJTdHIgPSAodGFyZ2V0RW52OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBub0VudHJ5PzogYm9vbGVhbikgPT4ge1xuICAgICAgICBjb25zdCBuZXdFbnYgPSB7IC4uLnRhcmdldEVudiB9O1xuICAgICAgICBpZiAobm9FbnRyeSkge1xuICAgICAgICAgIGRlbGV0ZSBuZXdFbnYuZXhwb3J0cztcbiAgICAgICAgICBkZWxldGUgbmV3RW52Lm1vZHVsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3RW52KS5yZWR1Y2UoKHByZXZDb2RlLCBuYW1lKSA9PiB7XG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdyZXNvbHZlJyB8fCBuYW1lID09PSAnaW1wb3J0JykgcmV0dXJuIHByZXZDb2RlO1xuICAgICAgICAgIHJldHVybiBgJHtwcmV2Q29kZX0gdmFyICR7bmFtZX0gPSB3aW5kb3cuJHt0aGlzLmdsb2JhbFZhcktleX0uJHtuYW1lfTtgO1xuICAgICAgICB9LCAnJyk7XG4gICAgICB9O1xuICAgICAgY29uc3QgZW52VmFyU3RyID0gZ2VuRW52VmFyU3RyKGVudik7XG4gICAgICBjb25zdCBub0VudHJ5RW52VmFyU3RyID0gZ2VuRW52VmFyU3RyKGVudiwgdHJ1ZSk7XG5cbiAgICAgIGxldCBzb3VyY2VtYXAgPSAnJztcbiAgICAgIGlmICghaGF2ZVNvdXJjZW1hcChjb2RlKSAmJiB1cmwpIHtcbiAgICAgICAgc291cmNlbWFwID0gYXdhaXQgY3JlYXRlU291cmNlbWFwKFxuICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmlzSW5saW5lXG4gICAgICAgICAgICA/IGBpbmRleC5odG1sKGlubGluZS4ke3RoaXMuYXBwLnNjcmlwdENvdW50fS5qcylgXG4gICAgICAgICAgICA6IHVybCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29kZSA9IGF3YWl0IHRoaXMuYW5hbHlzaXNNb2R1bGUodGhpcy5sb2NrLmdlbklkKCksIGNvZGUsIGVudlZhclN0ciwgbm9FbnRyeUVudlZhclN0ciwgdXJsLCB1cmwpO1xuICAgICAgY29kZSA9IGBpbXBvcnQubWV0YS51cmw9JyR7dXJsfSc7JHtvcHRpb25zPy5ub0VudHJ5ID8gbm9FbnRyeUVudlZhclN0ciA6IGVudlZhclN0cn0ke2NvZGV9XFxuO3dpbmRvdy4ke3RoaXMuZ2xvYmFsVmFyS2V5fS5yZXNvbHZlKCk7XFxuJHtzb3VyY2VtYXB9YDtcblxuICAgICAgdGhpcy5hcHAuZ2xvYmFsW3RoaXMuZ2xvYmFsVmFyS2V5XSA9IGVudjtcblxuICAgICAgbGV0IGJsb2JVcmwgPSB0aGlzLmNyZWF0ZUJsb2JVcmwoY29kZSk7XG4gICAgICBpZiAob3B0aW9ucyAmJiAhb3B0aW9ucy5pc0lubGluZSAmJiB1cmwpIHtcbiAgICAgICAgdGhpcy5zZXRCbG9iVXJsKHVybCwgYmxvYlVybCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50TW9kdWxlID0gdGhpcy5tb2R1bGVDYWNoZVt1cmwgfHwgJyddO1xuICAgICAgaWYgKGN1cnJlbnRNb2R1bGU/LnNoZWxsVXJsICYmICFjdXJyZW50TW9kdWxlLnNoZWxsRXhlY3V0ZWQpIHtcbiAgICAgICAgLy8gaWYgdGhlIHRvcCBsZXZlbCBsb2FkIGlzIGEgc2hlbGwgY29kZSwgd2UgbmVlZCB0byBydW4gaXRzIHVwZGF0ZSBmdW5jdGlvblxuICAgICAgICBibG9iVXJsID0gdGhpcy5jcmVhdGVCbG9iVXJsKFxuICAgICAgICAgIGdlblNoZWxsQ29kZVdyYXBwZXIoYmxvYlVybCwgY3VycmVudE1vZHVsZS5zaGVsbFVybCwgdXJsIHx8ICcnKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXhlY01vZHVsZUNvZGUoYmxvYlVybCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTdHlsZU1hbmFnZXIsIFRlbXBsYXRlTWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICBUZXh0LFxuICBOb2RlLFxuICB3YXJuLFxuICBhc3NlcnQsXG4gIGhhc093bixcbiAgcmVtb3ZlLFxuICBRdWV1ZSxcbiAgY29yZUxvZyxcbiAgaXNKc1R5cGUsXG4gIGlzT2JqZWN0LFxuICBpc1Byb21pc2UsXG4gIGlzR2FyZmlzaENvbmZpZ1R5cGUsXG4gIHRvQm9vbGVhbixcbiAgZmluZFRhcmdldCxcbiAgZXZhbFdpdGhFbnYsXG4gIHRyYW5zZm9ybVVybCxcbiAgX19Nb2NrQm9keV9fLFxuICBfX01vY2tIZWFkX18sXG4gIGdldFJlbmRlck5vZGUsXG4gIHNvdXJjZUxpc3RUYWdzLFxuICBjcmVhdGVBcHBDb250YWluZXIsXG4gIHNldERvY0N1cnJlbnRTY3JpcHQsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IEdhcmZpc2ggfSBmcm9tICcuLi9nYXJmaXNoJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgYXBwTGlmZWN5Y2xlIH0gZnJvbSAnLi4vbGlmZWN5Y2xlJztcbmltcG9ydCB7IEVTTW9kdWxlTG9hZGVyIH0gZnJvbSAnLi9lc01vZHVsZSc7XG5pbXBvcnQgeyBTdWJBcHBPYnNlcnZlciB9IGZyb20gJy4uL3BsdWdpbnMvcGVyZm9ybWFuY2Uvc3ViQXBwT2JzZXJ2ZXInO1xuXG5leHBvcnQgdHlwZSBDdXN0b21lckxvYWRlciA9IChcbiAgcHJvdmlkZXI6IGludGVyZmFjZXMuUHJvdmlkZXIsXG4gIGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgcGF0aD86IHN0cmluZyxcbikgPT4gUHJvbWlzZTxpbnRlcmZhY2VzLkxvYWRlclJlc3VsdCB8IHZvaWQ+IHwgaW50ZXJmYWNlcy5Mb2FkZXJSZXN1bHQgfCB2b2lkO1xuXG5leHBvcnQgdHlwZSBBcHBJbmZvID0gaW50ZXJmYWNlcy5BcHBJbmZvICYge1xuICBhcHBJZD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY1NjcmlwdE9wdGlvbnMge1xuICBub2RlPzogTm9kZTtcbiAgYXN5bmM/OiBib29sZWFuO1xuICBub0VudHJ5PzogYm9vbGVhbjtcbiAgaXNJbmxpbmU/OiBib29sZWFuO1xuICBpc01vZHVsZT86IGJvb2xlYW47XG59XG5cbmxldCBhcHBJZCA9IDA7XG5jb25zdCBfX0dBUkZJU0hfR0xPQkFMX0VOVl9fID0gJ19fR0FSRklTSF9HTE9CQUxfRU5WX18nO1xuZXhwb3J0IGNvbnN0IF9fR0FSRklTSF9FWFBPUlRTX18gPSAnX19HQVJGSVNIX0VYUE9SVFNfXyc7XG5cbi8vIEhhdmUgdGhlIGFiaWxpdHkgdG8gQXBwIGluc3RhbmNlXG4vLyAxLiBQcm92aWRlIHN0YXRpYyByZXNvdXJjZSwgdGhlIHN0cnVjdHVyZSBvZiB0aGUgSFRNTCwgQ1NTLCBqcy5cbi8vIDIuIENhbiBiZSBleHRyYWN0ZWQgaW4gdGhlIGpzIENKUyB0aHJvdWdoIHNjb3BlIF9fR0FSRklTSF9FWFBPUlRTX18gbmFtZXNwYWNlIG9yIGdldCBjaGlsZCBhcHBsaWNhdGlvbiBwcm92aWRlciBpcyBkZWR1Y2VkLlxuLy8gMy4gVGhyb3VnaCBleGVjQ29kZSBpbmNvbWluZyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgc3VjaCBhcyBDSlMgc3BlY2lmaWNhdGlvbiBvZiB0aGUgbW9kdWxlLCB0aGUgcmVxdWlyZSwgZXhwb3J0cyB0byByZWFsaXplIGV4dGVybmFsIHNoYXJpbmdcbi8vIDQuIFRyaWdnZXIgcmVuZGVyaW5nXHVGRjFBQXBwbGljYXRpb24gcmVsYXRlZCBub2RlcyBwbGFjZWQgaW4gdGhlIGRvY3VtZW50IGZsb3csIHdoaWNoIGluIHR1cm4gcGVyZm9ybSBhcHBsaWNhdGlvbiBzY3JpcHRzLCBmaW5hbCByZW5kZXIgZnVuY3Rpb24sXG4vLyAgICBwZXJmb3JtIHRoZSBzb24gYXBwbGljYXRpb24gcHJvdmlkZXMgY29tcGxldGUgYXBwbGljYXRpb24gaW5kZXBlbmRlbnQgcnVudGltZSBleGVjdXRpb24uXG4vLyA1LiBUcmlnZ2VyIHRoZSBkZXN0cnVjdGlvbjogUGVyZm9ybSB0aGUgZGVzdHJveSBmdW5jdGlvbiBvZiBjaGlsZCBhcHBsaWNhdGlvbiwgYW5kIGFwcGxpZXMgdGhlIGNoaWxkIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIHRoZSBkb2N1bWVudCBmbG93LlxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gIHB1YmxpYyBhcHBJZCA9IGFwcElkKys7XG4gIHB1YmxpYyBzY3JpcHRDb3VudCA9IDA7XG4gIHB1YmxpYyBkaXNwbGF5ID0gZmFsc2U7XG4gIHB1YmxpYyBtb3VudGVkID0gZmFsc2U7XG4gIHB1YmxpYyBzdHJpY3RJc29sYXRpb24gPSBmYWxzZTtcbiAgcHVibGljIGVzbVF1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gIHB1YmxpYyBlc01vZHVsZUxvYWRlciA9IG5ldyBFU01vZHVsZUxvYWRlcih0aGlzKTtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGlzSHRtbE1vZGU6IGJvb2xlYW47XG4gIHB1YmxpYyBnbG9iYWw6IGFueSA9IHdpbmRvdztcbiAgcHVibGljIGFwcENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBjanNNb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICBwdWJsaWMgaHRtbE5vZGU6IEhUTUxFbGVtZW50IHwgU2hhZG93Um9vdDtcbiAgcHVibGljIGN1c3RvbUV4cG9ydHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTsgLy8gSWYgeW91IGRvbid0IHdhbnQgdG8gdXNlIHRoZSBDSlMgZXhwb3J0LCBjYW4gdXNlIHRoaXNcbiAgcHVibGljIHNvdXJjZUxpc3Q6IEFycmF5PHsgdGFnTmFtZTogc3RyaW5nOyB1cmw6IHN0cmluZyB9PiA9IFtdO1xuICBwdWJsaWMgc291cmNlTGlzdE1hcDogTWFwPHN0cmluZywgeyB0YWdOYW1lOiBzdHJpbmc7IHVybDogc3RyaW5nIH0+ID0gbmV3IE1hcCgpO1xuICBwdWJsaWMgYXBwSW5mbzogQXBwSW5mbztcbiAgcHVibGljIGNvbnRleHQ6IEdhcmZpc2g7XG4gIHB1YmxpYyBob29rczogaW50ZXJmYWNlcy5BcHBIb29rcztcbiAgcHVibGljIHByb3ZpZGVyPzogaW50ZXJmYWNlcy5Qcm92aWRlcjtcbiAgcHVibGljIGVudHJ5TWFuYWdlcjogVGVtcGxhdGVNYW5hZ2VyO1xuICBwdWJsaWMgYXBwUGVyZm9ybWFuY2U6IFN1YkFwcE9ic2VydmVyO1xuICBwdWJsaWMgY3VzdG9tTG9hZGVyPzogQ3VzdG9tZXJMb2FkZXI7XG4gIHB1YmxpYyBjaGlsZEdhcmZpc2hDb25maWc6IGludGVyZmFjZXMuQ2hpbGRHYXJmaXNoQ29uZmlnID0ge307XG4gIHByaXZhdGUgYWN0aXZlID0gZmFsc2U7XG4gIHB1YmxpYyBtb3VudGluZyA9IGZhbHNlO1xuICBwcml2YXRlIHVubW91bnRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZXNvdXJjZXM6IGludGVyZmFjZXMuUmVzb3VyY2VNb2R1bGVzO1xuICAvLyBFbnZpcm9ubWVudCB2YXJpYWJsZXMgaW5qZWN0ZWQgYnkgZ2FyZmlzaCBmb3IgbGlua2FnZSB3aXRoIGNoaWxkIGFwcGxpY2F0aW9uc1xuICBwcml2YXRlIGdsb2JhbEVudlZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb250ZXh0OiBHYXJmaXNoLFxuICAgIGFwcEluZm86IEFwcEluZm8sXG4gICAgZW50cnlNYW5hZ2VyOiBUZW1wbGF0ZU1hbmFnZXIsXG4gICAgcmVzb3VyY2VzOiBpbnRlcmZhY2VzLlJlc291cmNlTW9kdWxlcyxcbiAgICBpc0h0bWxNb2RlOiBib29sZWFuLFxuICAgIGN1c3RvbUxvYWRlcj86IEN1c3RvbWVyTG9hZGVyLFxuICApIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuYXBwSW5mbyA9IGFwcEluZm87XG4gICAgdGhpcy5uYW1lID0gYXBwSW5mby5uYW1lO1xuICAgIHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuICAgIHRoaXMuaXNIdG1sTW9kZSA9IGlzSHRtbE1vZGU7XG4gICAgdGhpcy5lbnRyeU1hbmFnZXIgPSBlbnRyeU1hbmFnZXI7XG5cbiAgICAvLyBgYXBwSW5mb2AgaXMgY29tcGxldGVseSBpbmRlcGVuZGVudCBhbmQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBgYXBwSWRgXG4gICAgdGhpcy5hcHBJbmZvLmFwcElkID0gdGhpcy5hcHBJZDtcblxuICAgIC8vIEdhcmZpc2ggZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgdGhpcy5nbG9iYWxFbnZWYXJpYWJsZXMgPSB7XG4gICAgICBjdXJyZW50QXBwOiB0aGlzLFxuICAgICAgbG9hZGVyOiBjb250ZXh0LmxvYWRlcixcbiAgICAgIGV4dGVybmFsczogY29udGV4dC5leHRlcm5hbHMsXG4gICAgICByZW1vdGVNb2R1bGVzQ29kZTogcmVzb3VyY2VzLm1vZHVsZXMsXG4gICAgfTtcbiAgICB0aGlzLmNqc01vZHVsZXMgPSB7XG4gICAgICBleHBvcnRzOiB7fSxcbiAgICAgIG1vZHVsZTogbnVsbCxcbiAgICAgIHJlcXVpcmU6IChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBwa2cgPSB0aGlzLmdsb2JhbFtrZXldIHx8IGNvbnRleHQuZXh0ZXJuYWxzW2tleV0gfHwgd2luZG93W2tleV07XG4gICAgICAgIGlmICghcGtnKSB7XG4gICAgICAgICAgd2FybihgUGFja2FnZSBcIiR7a2V5fVwiIGlzIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwa2c7XG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy5janNNb2R1bGVzLm1vZHVsZSA9IHRoaXMuY2pzTW9kdWxlcztcbiAgICB0aGlzLmN1c3RvbUxvYWRlciA9IGN1c3RvbUxvYWRlcjtcblxuICAgIC8vIFJlZ2lzdGVyIGhvb2tzXG4gICAgdGhpcy5ob29rcyA9IGFwcExpZmVjeWNsZSgpO1xuICAgIHRoaXMuaG9va3MudXNlUGx1Z2luKHtcbiAgICAgIC4uLmFwcEluZm8sXG4gICAgICBuYW1lOiBgJHthcHBJbmZvLm5hbWV9LWxpZmVjeWNsZWAsXG4gICAgfSk7XG5cbiAgICAvLyBTYXZlIGFsbCB0aGUgcmVzb3VyY2VzIHRvIGFkZHJlc3NcbiAgICBjb25zdCBub2RlcyA9IGVudHJ5TWFuYWdlci5nZXROb2Rlc0J5VGFnTmFtZSguLi5zb3VyY2VMaXN0VGFncyk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZXMpIHtcbiAgICAgIG5vZGVzW2tleV0uZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCB1cmwgPVxuICAgICAgICAgIGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ2hyZWYnKSB8fFxuICAgICAgICAgIGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ3NyYycpO1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgdGhpcy5hZGRTb3VyY2VMaXN0KHtcbiAgICAgICAgICAgIHRhZ05hbWU6IG5vZGUudGFnTmFtZSxcbiAgICAgICAgICAgIHVybDogZW50cnlNYW5hZ2VyLnVybCA/IHRyYW5zZm9ybVVybChlbnRyeU1hbmFnZXIudXJsLCB1cmwpIDogdXJsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0dhcmZpc2hDb25maWdUeXBlKHsgdHlwZTogZW50cnlNYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAndHlwZScpIH0pKSB7XG4gICAgICAgICAgLy8gZ2FyZmlzaCBjb25maWcgc2NyaXB0IGZvdW5kZWRcbiAgICAgICAgICAvLyBwYXJzZSBpdFxuICAgICAgICAgIHRoaXMuY2hpbGRHYXJmaXNoQ29uZmlnID0gSlNPTi5wYXJzZSgobm9kZS5jaGlsZHJlbj8uWzBdIGFzIFRleHQpPy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuYXBwSW5mby5lbnRyeSAmJiB0aGlzLmFkZFNvdXJjZUxpc3QoeyB0YWdOYW1lOiAnaHRtbCcsIHVybDogdGhpcy5hcHBJbmZvLmVudHJ5IH0pXG4gIH1cblxuICBnZXQgcm9vdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGZpbmRUYXJnZXQodGhpcy5odG1sTm9kZSwgW2BkaXZbJHtfX01vY2tCb2R5X199XWAsICdib2R5J10pO1xuICB9XG5cbiAgZ2V0IGdldFNvdXJjZUxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZUxpc3Q7XG4gIH1cblxuICBhZGRTb3VyY2VMaXN0KHNvdXJjZUluZm86IEFycmF5PHsgdGFnTmFtZTogc3RyaW5nOyB1cmw6IHN0cmluZyB9PiB8IHsgdGFnTmFtZTogc3RyaW5nOyB1cmw6IHN0cmluZyB9KXtcbiAgICBpZiAodGhpcy5hcHBJbmZvLmRpc2FibGVTb3VyY2VMaXN0Q29sbGVjdCkgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZUluZm8pKXtcbiAgICAgIGxldCBuU291cmNlTGlzdCA9IHNvdXJjZUluZm8uZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlTGlzdE1hcC5oYXMoaXRlbS51cmwpICYmIGl0ZW0udXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgIHRoaXMuc291cmNlTGlzdE1hcC5zZXQoaXRlbS51cmwsIGl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zb3VyY2VMaXN0ID0gdGhpcy5zb3VyY2VMaXN0LmNvbmNhdChuU291cmNlTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5zb3VyY2VMaXN0TWFwLmdldChzb3VyY2VJbmZvLnVybCkgJiYgc291cmNlSW5mby51cmwuc3RhcnRzV2l0aCgnaHR0cCcpKXtcbiAgICAgICAgdGhpcy5zb3VyY2VMaXN0LnB1c2goc291cmNlSW5mbyk7XG4gICAgICAgIHRoaXMuc291cmNlTGlzdE1hcC5zZXQoc291cmNlSW5mby51cmwsIHNvdXJjZUluZm8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZ2V0UHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJcbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHRoaXMucHJvdmlkZXIpXG4gICAgICA6IHRoaXMuY2hlY2tBbmRHZXRQcm92aWRlcigpO1xuICB9XG5cbiAgaXNOb0VudHJ5U2NyaXB0KHVybCA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRHYXJmaXNoQ29uZmlnLnNhbmRib3g/Lm5vRW50cnlTY3JpcHRzPy5zb21lKGl0ZW0gPT4gdXJsLmluZGV4T2YoaXRlbSkgPiAtMSk7XG4gIH1cblxuICBleGVjU2NyaXB0KFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBlbnY6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgdXJsPzogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zLFxuICApIHtcbiAgICBlbnYgPSB7XG4gICAgICAuLi50aGlzLmdldEV4ZWNTY3JpcHRFbnYob3B0aW9ucz8ubm9FbnRyeSksXG4gICAgICAuLi4oZW52IHx8IHt9KSxcbiAgICB9O1xuXG4gICAgdGhpcy5zY3JpcHRDb3VudCsrO1xuXG4gICAgY29uc3QgYXJncyA9IFt0aGlzLmFwcEluZm8sIGNvZGUsIGVudiwgdXJsLCBvcHRpb25zXSBhcyBjb25zdDtcbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5iZWZvcmVFdmFsLmVtaXQoLi4uYXJncyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucnVuQ29kZShjb2RlLCBlbnYsIHVybCwgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5lcnJvckV4ZWNDb2RlLmVtaXQoZXJyLCAuLi5hcmdzKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlckV2YWwuZW1pdCguLi5hcmdzKTtcbiAgfVxuXG4gIC8vIGB2bSBzYW5kYm94YCBjYW4gb3ZlcnJpZGUgdGhpcyBtZXRob2RcbiAgcnVuQ29kZShcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgZW52OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgIHVybD86IHN0cmluZyxcbiAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgKSB7XG4gICAgLy8gSWYgdGhlIG5vZGUgaXMgYW4gZXMgbW9kdWxlLCB1c2UgbmF0aXZlIGVzbU1vZHVsZVxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaXNNb2R1bGUpIHtcbiAgICAgIHRoaXMuZXNtUXVldWUuYWRkKGFzeW5jIChuZXh0KSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZXNNb2R1bGVMb2FkZXIubG9hZChjb2RlLCB7XG4gICAgICAgICAgLy8gcmVidWlsZCBmdWxsIGVudlxuICAgICAgICAgIC4uLnRoaXMuZ2V0RXhlY1NjcmlwdEVudigpLFxuICAgICAgICAgIC8vIHRoaXMgJ2VudicgbWF5IGxvc3QgY29tbW9uanMgZGF0YVxuICAgICAgICAgIC4uLmVudixcbiAgICAgICAgfSwgdXJsLCBvcHRpb25zKTtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJldmVydEN1cnJlbnRTY3JpcHQgPSBzZXREb2NDdXJyZW50U2NyaXB0KFxuICAgICAgICB0aGlzLmdsb2JhbC5kb2N1bWVudCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdXJsLFxuICAgICAgICBvcHRpb25zPy5hc3luYyxcbiAgICAgICAgb3B0aW9ucz8ub3JpZ2luU2NyaXB0LFxuICAgICAgKTtcbiAgICAgIGNvZGUgKz0gdXJsID8gYFxcbi8vIyBzb3VyY2VVUkw9JHt1cmx9XFxuYCA6ICcnO1xuICAgICAgaWYgKCFoYXNPd24oZW52LCAnd2luZG93JykpIHtcbiAgICAgICAgZW52ID0ge1xuICAgICAgICAgIC4uLmVudixcbiAgICAgICAgICB3aW5kb3c6IHRoaXMuZ2xvYmFsLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZXZhbFdpdGhFbnYoYDske2NvZGV9YCwgZW52LCB0aGlzLmdsb2JhbCk7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKHJldmVydEN1cnJlbnRTY3JpcHQpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNob3coKSB7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIGNvbnN0IHsgZGlzcGxheSwgbW91bnRlZCwgcHJvdmlkZXIgfSA9IHRoaXM7XG4gICAgaWYgKGRpc3BsYXkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW1vdW50ZWQpIHtcbiAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oJ05lZWQgdG8gY2FsbCB0aGUgXCJhcHAubW91bnQoKVwiIG1ldGhvZCBmaXJzdC4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlTW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIHRydWUpO1xuICAgIHRoaXMuY29udGV4dC5hY3RpdmVBcHBzLnB1c2godGhpcyk7XG5cbiAgICBhd2FpdCB0aGlzLmFkZENvbnRhaW5lcigpO1xuICAgIHRoaXMuY2FsbFJlbmRlcihwcm92aWRlciwgZmFsc2UpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYWZ0ZXJNb3VudC5lbWl0KHRoaXMuYXBwSW5mbywgdGhpcywgdHJ1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5tb3VudGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHsgZGlzcGxheSwgbW91bnRlZCwgcHJvdmlkZXIgfSA9IHRoaXM7XG4gICAgaWYgKCFkaXNwbGF5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFtb3VudGVkKSB7XG4gICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJiB3YXJuKCdOZWVkIHRvIGNhbGwgdGhlIFwiYXBwLm1vdW50KClcIiBtZXRob2QgZmlyc3QuJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZVVubW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIHRydWUpO1xuXG4gICAgdGhpcy5jYWxsRGVzdHJveShwcm92aWRlciwgZmFsc2UpO1xuICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIHJlbW92ZSh0aGlzLmNvbnRleHQuYWN0aXZlQXBwcywgdGhpcyk7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYWZ0ZXJVbm1vdW50LmVtaXQodGhpcy5hcHBJbmZvLCB0aGlzLCB0cnVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIG1vdW50KCkge1xuICAgIGlmICghdGhpcy5jYW5Nb3VudCgpKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlTW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIGZhbHNlKTtcblxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLm1vdW50aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZXh0LmFjdGl2ZUFwcHMucHVzaCh0aGlzKTtcbiAgICAgIC8vIGFkZCBjb250YWluZXIgYW5kIGNvbXBpbGUganMgd2l0aCBjanNcbiAgICAgIGNvbnN0IHsgYXN5bmNTY3JpcHRzIH0gPSBhd2FpdCB0aGlzLmNvbXBpbGVBbmRSZW5kZXJDb250YWluZXIoKTtcbiAgICAgIGlmICghdGhpcy5zdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIEdvb2QgcHJvdmlkZXIgaXMgc2V0IGF0IGNvbXBpbGUgdGltZVxuICAgICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLmdldFByb3ZpZGVyKCk7XG4gICAgICAvLyBFeGlzdGluZyBhc3luY2hyb25vdXMgZnVuY3Rpb25zIG5lZWQgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHVubG9hZGVkXG4gICAgICBpZiAoIXRoaXMuc3RvcE1vdW50QW5kQ2xlYXJFZmZlY3QoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0aGlzLmNhbGxSZW5kZXIocHJvdmlkZXIsIHRydWUpO1xuICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlck1vdW50LmVtaXQodGhpcy5hcHBJbmZvLCB0aGlzLCBmYWxzZSk7XG5cbiAgICAgIGF3YWl0IGFzeW5jU2NyaXB0cztcbiAgICAgIGlmICghdGhpcy5zdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpKSByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5lbnRyeU1hbmFnZXIuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuYXBwQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yTW91bnRBcHAuZW1pdChlLCB0aGlzLmFwcEluZm8pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLm1vdW50aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdW5tb3VudCgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubW91bnRpbmcgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMubW91bnRlZCB8fCAhdGhpcy5hcHBDb250YWluZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMudW5tb3VudGluZykge1xuICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihgVGhlICR7dGhpcy5uYW1lfSBhcHAgdW5tb3VudGluZy5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gVGhpcyBwcmV2ZW50cyB0aGUgdW5tb3VudCBvZiB0aGUgY3VycmVudCBhcHAgZnJvbSBiZWluZyBjYWxsZWQgaW4gXCJwcm92aWRlci5kZXN0cm95XCJcbiAgICB0aGlzLnVubW91bnRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZVVubW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmNhbGxEZXN0cm95KHRoaXMucHJvdmlkZXIsIHRydWUpO1xuICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJvdmlkZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmN1c3RvbUV4cG9ydHMgPSB7fTtcbiAgICAgIHRoaXMuY2pzTW9kdWxlcy5leHBvcnRzID0ge307XG4gICAgICB0aGlzLmVzTW9kdWxlTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgIHJlbW92ZSh0aGlzLmNvbnRleHQuYWN0aXZlQXBwcywgdGhpcyk7XG4gICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5hZnRlclVubW91bnQuZW1pdCh0aGlzLmFwcEluZm8sIHRoaXMsIGZhbHNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZW1vdmUodGhpcy5jb250ZXh0LmFjdGl2ZUFwcHMsIHRoaXMpO1xuICAgICAgdGhpcy5lbnRyeU1hbmFnZXIuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuYXBwQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmVycm9yVW5tb3VudEFwcC5lbWl0KGUsIHRoaXMuYXBwSW5mbyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMudW5tb3VudGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEV4ZWNTY3JpcHRFbnYobm9FbnRyeT86IGJvb2xlYW4pIHtcbiAgICAvLyBUaGUgbGVnYWN5IG9mIGNvbW1vbkpTIGZ1bmN0aW9uIHN1cHBvcnRcbiAgICBjb25zdCBlbnZzID0ge1xuICAgICAgW19fR0FSRklTSF9FWFBPUlRTX19dOiB0aGlzLmN1c3RvbUV4cG9ydHMsXG4gICAgICBbX19HQVJGSVNIX0dMT0JBTF9FTlZfX106IHRoaXMuZ2xvYmFsRW52VmFyaWFibGVzLFxuICAgIH07XG5cbiAgICBpZiAobm9FbnRyeSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZW52cyxcbiAgICAgICAgcmVxdWlyZTogdGhpcy5janNNb2R1bGVzLnJlcXVpcmUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5lbnZzLFxuICAgICAgLi4udGhpcy5janNNb2R1bGVzLFxuICAgIH07XG4gIH1cblxuICAvLyBQZXJmb3JtcyBqcyByZXNvdXJjZXMgcHJvdmlkZWQgYnkgdGhlIG1vZHVsZSwgZmluYWxseSBnZXQgdGhlIGNvbnRlbnQgb2YgdGhlIGV4cG9ydFxuICBhc3luYyBjb21waWxlQW5kUmVuZGVyQ29udGFpbmVyKCkge1xuICAgIC8vIFJlbmRlciB0aGUgYXBwbGljYXRpb24gbm9kZVxuICAgIC8vIElmIHlvdSBkb24ndCB3YW50IHRvIHVzZSB0aGUgQ0pTIGV4cG9ydCwgYXQgdGhlIGVudHJhbmNlIGlzIG5vdCBjYW4gbm90IHBhc3MgdGhlIG1vZHVsZSwgdGhlIHJlcXVpcmVcbiAgICBhd2FpdCB0aGlzLnJlbmRlclRlbXBsYXRlKCk7XG5cbiAgICAvLyBFeGVjdXRlIGFzeW5jaHJvbm91cyBzY3JpcHRcbiAgICByZXR1cm4ge1xuICAgICAgYXN5bmNTY3JpcHRzOiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAvLyBBc3luY2hyb25vdXMgc2NyaXB0IGRvZXMgbm90IGJsb2NrIHRoZSByZW5kZXJpbmcgcHJvY2Vzc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5zdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzTWFuYWdlciBvZiB0aGlzLnJlc291cmNlcy5qcykge1xuICAgICAgICAgICAgICBpZiAoanNNYW5hZ2VyLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY1NjcmlwdChcbiAgICAgICAgICAgICAgICAgICAganNNYW5hZ2VyLnNjcmlwdENvZGUsXG4gICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICBqc01hbmFnZXIudXJsIHx8IHRoaXMuYXBwSW5mby5lbnRyeSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICBub0VudHJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmhvb2tzLmxpZmVjeWNsZS5lcnJvck1vdW50QXBwLmVtaXQoZSwgdGhpcy5hcHBJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNhbk1vdW50KCkge1xuICAgIC8vIElmIHlvdSBhcmUgbm90IGluIG1vdW50IG1vdW50XG4gICAgaWYgKHRoaXMubW91bnRpbmcpIHtcbiAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oYFRoZSAke3RoaXMuYXBwSW5mby5uYW1lfSBhcHAgbW91bnRpbmcuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIElmIHRoZSBhcHBsaWNhdGlvbiBoYXMgYmVlbiByZW5kZXJlZCBjb21wbGV0ZSwgYXBwbHkgY29sb3VycyB0byBhIGRyYXdpbmcgYWdhaW4sIG5lZWQgdG8gZGVzdHJveSB0aGUgcmVuZGVyaW5nXG4gICAgaWYgKHRoaXMubW91bnRlZCkge1xuICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihgVGhlICR7dGhpcy5hcHBJbmZvLm5hbWV9IGFwcCBhbHJlYWR5IG1vdW50ZWQuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEFwcGxpY2F0aW9uIGluIGRlc3RydWN0aW9uIHN0YXRlLCB0aGUgbmVlZCB0byBkZXN0cm95IGNvbXBsZXRlZCB0byByZW5kZXJcbiAgICBpZiAodGhpcy51bm1vdW50aW5nKSB7XG4gICAgICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSAmJlxuICAgICAgICB3YXJuKFxuICAgICAgICAgIGBUaGUgJHt0aGlzLmFwcEluZm8ubmFtZX0gYXBwIGlzIHVubW91bnRpbmcgY2FuJ3QgUGVyZm9ybSBhcHBsaWNhdGlvbiByZW5kZXJpbmcuYCxcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJZiBhc3luY2hyb25vdXMgdGFzayBlbmNvdW50ZXJlZCBpbiB0aGUgcmVuZGVyaW5nIHByb2Nlc3MsIHN1Y2ggYXMgdHJpZ2dlcmluZyB0aGUgYmVmb3JlRXZhbCBiZWZvcmUgZXhlY3V0aW5nIGNvZGUsXG4gIC8vIGFmdGVyIHRoZSBhc3luY2hyb25vdXMgdGFzaywgeW91IG5lZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIGRlc3Ryb3llZCBvciBpbiB0aGUgZW5kIHN0YXRlLlxuICAvLyBJZiBpbiB0aGUgZW5kIHN0YXRlIHdpbGwgbmVlZCB0byBwZXJmb3JtIHRoZSBzaWRlIGVmZmVjdHMgb2YgcmVtb3ZpbmcgcmVuZGVyaW5nIHByb2Nlc3MsIGFkZGluZyBhIG1vdW50IHBvaW50IHRvIGEgZG9jdW1lbnQsXG4gIC8vIGZvciBleGFtcGxlLCBleGVjdXRlIGNvZGUgb2YgdGhlIGVudmlyb25tZW50YWwgZWZmZWN0cywgYW5kIHJlbmRlcmluZyB0aGUgc3RhdGUgaW4gdGhlIGVuZC5cbiAgcHJpdmF0ZSBzdG9wTW91bnRBbmRDbGVhckVmZmVjdCgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgd2FybihgVGhlIGFwcCBcIiR7dGhpcy5uYW1lfVwiIHJlbmRlcmluZyBwcm9jZXNzIGhhcyBiZWVuIGJsb2NrZWQuYCk7XG4gICAgICB9XG4gICAgICB0aGlzLm1vdW50aW5nID0gZmFsc2U7XG4gICAgICAvLyBXaWxsIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgZG9jdW1lbnQgZmxvdyBvbiB0aGUgY29udGFpbmVyXG4gICAgICBpZiAodGhpcy5hcHBDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5lbnRyeU1hbmFnZXIuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHRoaXMuYXBwQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIGNvcmVMb2coXG4gICAgICAgIGAke3RoaXMuYXBwSW5mby5uYW1lfSBpZDoke3RoaXMuYXBwSWR9IHN0b3BNb3VudEFuZENsZWFyRWZmZWN0YCxcbiAgICAgICAgdGhpcy5hcHBDb250YWluZXIsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIENhbGxzIHRvIHJlbmRlciBkbyBjb21wYXRpYmxlIHdpdGggdHdvIGRpZmZlcmVudCBzYW5kYm94XG4gIHByaXZhdGUgY2FsbFJlbmRlcihwcm92aWRlcj86IGludGVyZmFjZXMuUHJvdmlkZXIsIGlzTW91bnQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHByb3ZpZGVyICYmIHByb3ZpZGVyLnJlbmRlcikge1xuICAgICAgcHJvdmlkZXIucmVuZGVyKHtcbiAgICAgICAgYXBwTmFtZTogdGhpcy5hcHBJbmZvLm5hbWUsXG4gICAgICAgIGRvbTogdGhpcy5yb290RWxlbWVudCxcbiAgICAgICAgYmFzZW5hbWU6IHRoaXMuYXBwSW5mby5iYXNlbmFtZSxcbiAgICAgICAgYXBwUmVuZGVySW5mbzogeyBpc01vdW50IH0sXG4gICAgICAgIHByb3BzOiB0aGlzLmFwcEluZm8ucHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBDYWxsIHRvIGRlc3Ryb3kgZG8gY29tcGF0aWJsZSB3aXRoIHR3byBkaWZmZXJlbnQgc2FuZGJveFxuICBwcml2YXRlIGNhbGxEZXN0cm95KHByb3ZpZGVyPzogaW50ZXJmYWNlcy5Qcm92aWRlciwgaXNVbm1vdW50PzogYm9vbGVhbikge1xuICAgIGNvbnN0IHsgcm9vdEVsZW1lbnQsIGFwcENvbnRhaW5lciB9ID0gdGhpcztcbiAgICBpZiAocHJvdmlkZXIgJiYgcHJvdmlkZXIuZGVzdHJveSkge1xuICAgICAgcHJvdmlkZXIuZGVzdHJveSh7XG4gICAgICAgIGFwcE5hbWU6IHRoaXMuYXBwSW5mby5uYW1lLFxuICAgICAgICBkb206IHJvb3RFbGVtZW50LFxuICAgICAgICBhcHBSZW5kZXJJbmZvOiB7IGlzVW5tb3VudCB9LFxuICAgICAgICBwcm9wczogdGhpcy5hcHBJbmZvLnByb3BzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW50cnlNYW5hZ2VyLkRPTUFwaXMucmVtb3ZlRWxlbWVudChhcHBDb250YWluZXIpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgY29udGFpbmVyIG5vZGUgYW5kIGFkZCBpbiB0aGUgZG9jdW1lbnQgZmxvd1xuICAvLyBkb21HZXR0ZXIgSGF2ZSBiZWVuIGRlYWxpbmcgd2l0aFxuICBwcml2YXRlIGFzeW5jIGFkZENvbnRhaW5lcigpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSBtb3VudCBwb2ludCwgc3VwcG9ydCBkb21HZXR0ZXIgYXMgcHJvbWlzZSwgaXMgYWR2YW50YWdlb3VzIGZvciB0aGUgY29tcGF0aWJpbGl0eVxuICAgIGNvbnN0IHdyYXBwZXJOb2RlID0gYXdhaXQgZ2V0UmVuZGVyTm9kZSh0aGlzLmFwcEluZm8uZG9tR2V0dGVyKTtcbiAgICBpZiAodHlwZW9mIHdyYXBwZXJOb2RlLmFwcGVuZENoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB3cmFwcGVyTm9kZS5hcHBlbmRDaGlsZCh0aGlzLmFwcENvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZW5kZXJUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCB7IGFwcEluZm8sIGVudHJ5TWFuYWdlciwgcmVzb3VyY2VzIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdXJsOiBiYXNlVXJsLCBET01BcGlzIH0gPSBlbnRyeU1hbmFnZXI7XG4gICAgY29uc3QgeyBodG1sTm9kZSwgYXBwQ29udGFpbmVyIH0gPSBjcmVhdGVBcHBDb250YWluZXIoYXBwSW5mbyk7XG5cbiAgICAvLyBUcmFuc2Zvcm1hdGlvbiByZWxhdGl2ZSBwYXRoXG4gICAgdGhpcy5odG1sTm9kZSA9IGh0bWxOb2RlO1xuICAgIHRoaXMuYXBwQ29udGFpbmVyID0gYXBwQ29udGFpbmVyO1xuXG4gICAgLy8gVG8gYXBwZW5kIHRvIHRoZSBkb2N1bWVudCBmbG93LCByZWN1cnNpdmUgYWdhaW4gY3JlYXRlIHRoZSBjb250ZW50cyBvZiB0aGUgSFRNTCBvciBleGVjdXRlIHRoZSBzY3JpcHRcbiAgICBhd2FpdCB0aGlzLmFkZENvbnRhaW5lcigpO1xuXG4gICAgY29uc3QgY3VzdG9tUmVuZGVyZXI6IFBhcmFtZXRlcnM8dHlwZW9mIGVudHJ5TWFuYWdlci5jcmVhdGVFbGVtZW50cz5bMF0gPSB7XG4gICAgICBtZXRhOiAoKSA9PiBudWxsLFxuXG4gICAgICBpbWc6IChub2RlKSA9PiB7XG4gICAgICAgIGJhc2VVcmwgJiYgZW50cnlNYW5hZ2VyLnRvUmVzb2x2ZVVybChub2RlLCAnc3JjJywgYmFzZVVybCk7XG4gICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICB9LFxuXG4gICAgICB2aWRlbzogKG5vZGUpID0+IHtcbiAgICAgICAgYmFzZVVybCAmJiBlbnRyeU1hbmFnZXIudG9SZXNvbHZlVXJsKG5vZGUsICdzcmMnLCBiYXNlVXJsKTtcbiAgICAgICAgcmV0dXJuIERPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlKTtcbiAgICAgIH0sXG5cbiAgICAgIGF1ZGlvOiAobm9kZSkgPT4ge1xuICAgICAgICBiYXNlVXJsICYmIGVudHJ5TWFuYWdlci50b1Jlc29sdmVVcmwobm9kZSwgJ3NyYycsIGJhc2VVcmwpO1xuICAgICAgICByZXR1cm4gRE9NQXBpcy5jcmVhdGVFbGVtZW50KG5vZGUpO1xuICAgICAgfSxcblxuICAgICAgLy8gVGhlIGJvZHkgYW5kIGhlYWQgdGhpcyBraW5kIG9mIHRyZWF0bWVudCBpcyB0byBjb21wYXRpYmxlIHdpdGggdGhlIG9sZCB2ZXJzaW9uXG4gICAgICBib2R5OiAobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc3RyaWN0SXNvbGF0aW9uKSB7XG4gICAgICAgICAgbm9kZSA9IGVudHJ5TWFuYWdlci5jbG9uZU5vZGUobm9kZSk7XG4gICAgICAgICAgbm9kZS50YWdOYW1lID0gJ2Rpdic7XG4gICAgICAgICAgbm9kZS5hdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAga2V5OiBfX01vY2tCb2R5X18sXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRE9NQXBpcy5jcmVhdGVFbGVtZW50KG5vZGUpO1xuICAgICAgfSxcblxuICAgICAgaGVhZDogKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmljdElzb2xhdGlvbikge1xuICAgICAgICAgIG5vZGUgPSBlbnRyeU1hbmFnZXIuY2xvbmVOb2RlKG5vZGUpO1xuICAgICAgICAgIG5vZGUudGFnTmFtZSA9ICdkaXYnO1xuICAgICAgICAgIG5vZGUuYXR0cmlidXRlcy5wdXNoKHtcbiAgICAgICAgICAgIGtleTogX19Nb2NrSGVhZF9fLFxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlKTtcbiAgICAgIH0sXG5cbiAgICAgIHNjcmlwdDogKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgbWltZVR5cGUgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICd0eXBlJyk7XG4gICAgICAgIGNvbnN0IGlzTW9kdWxlID0gbWltZVR5cGUgPT09ICdtb2R1bGUnO1xuXG4gICAgICAgIGlmIChtaW1lVHlwZSkge1xuICAgICAgICAgIC8vIE90aGVyIHNjcmlwdCB0ZW1wbGF0ZVxuICAgICAgICAgIGlmICghaXNNb2R1bGUgJiYgIWlzSnNUeXBlKHsgdHlwZTogbWltZVR5cGUgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpzTWFuYWdlciA9IHJlc291cmNlcy5qcy5maW5kKChtYW5hZ2VyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICFtYW5hZ2VyLmFzeW5jID8gbWFuYWdlci5pc1NhbWVPcmlnaW4obm9kZSkgOiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGpzTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IHsgdXJsLCBzY3JpcHRDb2RlIH0gPSBqc01hbmFnZXI7XG4gICAgICAgICAgY29uc3QgbW9ja09yaWdpblNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgIG5vZGUuYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpPT57XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlLmtleSkge1xuICAgICAgICAgICAgICBtb2NrT3JpZ2luU2NyaXB0LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUua2V5LCBhdHRyaWJ1dGUudmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0VXJsID0gdXJsIHx8IHRoaXMuYXBwSW5mby5lbnRyeTtcbiAgICAgICAgICB0aGlzLmV4ZWNTY3JpcHQoc2NyaXB0Q29kZSwge30sIHRhcmdldFVybCwge1xuICAgICAgICAgICAgaXNNb2R1bGUsXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgICAgICBpc0lubGluZToganNNYW5hZ2VyLmlzSW5saW5lU2NyaXB0KCksXG4gICAgICAgICAgICBub0VudHJ5OiB0b0Jvb2xlYW4oXG4gICAgICAgICAgICAgIGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ25vLWVudHJ5JylcbiAgICAgICAgICAgICAgICB8fCB0aGlzLmlzTm9FbnRyeVNjcmlwdCh0YXJnZXRVcmwpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9yaWdpblNjcmlwdDogbW9ja09yaWdpblNjcmlwdCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICAgIGNvbnN0IGFzeW5jID0gZW50cnlNYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAnYXN5bmMnKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGFzeW5jID09PSAndW5kZWZpbmVkJyB8fCBhc3luYyA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgY29uc3QgdGlwSW5mbyA9IEpTT04uc3RyaW5naWZ5KG5vZGUsIG51bGwsIDIpO1xuICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgYEN1cnJlbnQganMgbm9kZSBjYW5ub3QgYmUgZm91bmQsIHRoZSByZXNvdXJjZSBtYXkgbm90IGV4aXN0LlxcblxcbiAke3RpcEluZm99YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZVNjcmlwdENvbW1lbnROb2RlKG5vZGUpO1xuICAgICAgfSxcblxuICAgICAgc3R5bGU6IChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBub2RlLmNoaWxkcmVuWzBdIGFzIFRleHQ7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVNYW5hZ2VyID0gbmV3IFN0eWxlTWFuYWdlcih0ZXh0LmNvbnRlbnQsIGJhc2VVcmwpO1xuICAgICAgICAgIHN0eWxlTWFuYWdlci5zZXRTY29wZSh7XG4gICAgICAgICAgICBhcHBOYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICByb290RWxJZDogdGhpcy5hcHBDb250YWluZXIuaWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYmFzZVVybCAmJiBzdHlsZU1hbmFnZXIuY29ycmVjdFBhdGgoYmFzZVVybCk7XG4gICAgICAgICAgcmV0dXJuIGVudHJ5TWFuYWdlci5pZ25vcmVDaGlsZE5vZGVzQ3JlYXRpb24oXG4gICAgICAgICAgICBzdHlsZU1hbmFnZXIucmVuZGVyQXNTdHlsZUVsZW1lbnQoKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBET01BcGlzLmNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICB9LFxuXG4gICAgICBsaW5rOiAobm9kZSkgPT4ge1xuICAgICAgICBpZiAoRE9NQXBpcy5pc0Nzc0xpbmtOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVNYW5hZ2VyID0gdGhpcy5yZXNvdXJjZXMubGluay5maW5kKChtYW5hZ2VyKSA9PlxuICAgICAgICAgICAgbWFuYWdlci5pc1NhbWVPcmlnaW4obm9kZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc3R5bGVNYW5hZ2VyKSB7XG4gICAgICAgICAgICBzdHlsZU1hbmFnZXIuc2V0U2NvcGUoe1xuICAgICAgICAgICAgICBhcHBOYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgIHJvb3RFbElkOiB0aGlzLmFwcENvbnRhaW5lci5pZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN0eWxlTWFuYWdlci5yZW5kZXJBc1N0eWxlRWxlbWVudChcbiAgICAgICAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgPyBgXFxuLyoke0RPTUFwaXMuY3JlYXRlTGlua0NvbW1lbnROb2RlKG5vZGUpfSovXFxuYCA6ICcnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIHJldHVybiBET01BcGlzLmlzUHJlZmV0Y2hKc0xpbmtOb2RlKG5vZGUpXG4gICAgICAgICAgPyBET01BcGlzLmNyZWF0ZVNjcmlwdENvbW1lbnROb2RlKG5vZGUpXG4gICAgICAgICAgOiBET01BcGlzLmlzSWNvbkxpbmtOb2RlKG5vZGUpXG4gICAgICAgICAgICA/IG51bGwgLy8gRmlsdGVyIHRoZSBpY29uIG9mIHRoZSBjaGlsZCBhcHAsIGFuZCBjYW5ub3QgYWZmZWN0IHRoZSBtYWluIGFwcGxpY2F0aW9uXG4gICAgICAgICAgICA6IERPTUFwaXMuY3JlYXRlRWxlbWVudChub2RlKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIFJlbmRlciBkb20gdHJlZSBhbmQgYXBwZW5kIHRvIGRvY3VtZW50LlxuICAgIGVudHJ5TWFuYWdlci5jcmVhdGVFbGVtZW50cyhjdXN0b21SZW5kZXJlciwgaHRtbE5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0FuZEdldFByb3ZpZGVyKCkge1xuICAgIGNvbnN0IHsgYXBwSW5mbywgcm9vdEVsZW1lbnQsIGNqc01vZHVsZXMsIGN1c3RvbUV4cG9ydHMgfSA9IHRoaXM7XG4gICAgY29uc3QgeyBuYW1lLCBwcm9wcywgYmFzZW5hbWUgfSA9IGFwcEluZm87XG4gICAgbGV0IHByb3ZpZGVyOlxuICAgICAgfCAoKC4uLmFyZ3M6IGFueVtdKSA9PiBpbnRlcmZhY2VzLlByb3ZpZGVyKVxuICAgICAgfCBpbnRlcmZhY2VzLlByb3ZpZGVyXG4gICAgICB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIGVzTW9kdWxlIGV4cG9ydFxuICAgIGF3YWl0IHRoaXMuZXNtUXVldWUuYXdhaXRDb21wbGV0aW9uKCk7XG5cbiAgICAvLyBDanMgZXhwb3J0c1xuICAgIGlmIChjanNNb2R1bGVzLmV4cG9ydHMpIHtcbiAgICAgIGlmIChpc1Byb21pc2UoY2pzTW9kdWxlcy5leHBvcnRzKSlcbiAgICAgICAgY2pzTW9kdWxlcy5leHBvcnRzID0gYXdhaXQgY2pzTW9kdWxlcy5leHBvcnRzO1xuICAgICAgLy8gSXMgbm90IHNldCBpbiB0aGUgY29uZmlndXJhdGlvbiBvZiB3ZWJwYWNrIGxpYnJhcnkgb3B0aW9uXG4gICAgICBpZiAoY2pzTW9kdWxlcy5leHBvcnRzLnByb3ZpZGVyKSBwcm92aWRlciA9IGNqc01vZHVsZXMuZXhwb3J0cy5wcm92aWRlcjtcbiAgICB9XG5cbiAgICAvLyBDdXN0b20gZXhwb3J0IHByaW9yIHRvIGV4cG9ydCBieSBkZWZhdWx0XG4gICAgaWYgKGN1c3RvbUV4cG9ydHMucHJvdmlkZXIpIHtcbiAgICAgIHByb3ZpZGVyID0gY3VzdG9tRXhwb3J0cy5wcm92aWRlcjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb3ZpZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm92aWRlciA9IGF3YWl0IHByb3ZpZGVyKFxuICAgICAgICB7XG4gICAgICAgICAgYmFzZW5hbWUsXG4gICAgICAgICAgZG9tOiByb290RWxlbWVudCxcbiAgICAgICAgICAuLi4ocHJvcHMgfHwge30pLFxuICAgICAgICB9LFxuICAgICAgICBwcm9wcyxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpc1Byb21pc2UocHJvdmlkZXIpKSB7XG4gICAgICBwcm92aWRlciA9IGF3YWl0IHByb3ZpZGVyO1xuICAgIH1cblxuICAgIC8vIFRoZSBwcm92aWRlciBtYXkgYmUgYSBmdW5jdGlvbiBvYmplY3RcbiAgICBpZiAoIWlzT2JqZWN0KHByb3ZpZGVyKSAmJiB0eXBlb2YgcHJvdmlkZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGAgSW52YWxpZCBtb2R1bGUgY29udGVudDogJHtuYW1lfSwgeW91IHNob3VsZCByZXR1cm4gYm90aCByZW5kZXIgYW5kIGRlc3Ryb3kgZnVuY3Rpb25zIGluIHByb3ZpZGVyIGZ1bmN0aW9uLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIElmIHlvdSBoYXZlIGN1c3RvbUxvYWRlciwgdGhlIGRvam8ucHJvdmlkZSBieSB1c2VyXG4gICAgY29uc3QgaG9va1JlcyA9IGF3YWl0ICh0aGlzLmN1c3RvbUxvYWRlciAmJlxuICAgICAgdGhpcy5jdXN0b21Mb2FkZXIocHJvdmlkZXIgYXMgaW50ZXJmYWNlcy5Qcm92aWRlciwgYXBwSW5mbywgYmFzZW5hbWUpKTtcblxuICAgIGlmIChob29rUmVzKSB7XG4gICAgICBjb25zdCB7IG1vdW50LCB1bm1vdW50IH0gPSBob29rUmVzIHx8ICh7fSBhcyBhbnkpO1xuICAgICAgaWYgKHR5cGVvZiBtb3VudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdW5tb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAocHJvdmlkZXIgYXMgaW50ZXJmYWNlcy5Qcm92aWRlcikucmVuZGVyID0gbW91bnQ7XG4gICAgICAgIChwcm92aWRlciBhcyBpbnRlcmZhY2VzLlByb3ZpZGVyKS5kZXN0cm95ID0gdW5tb3VudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWFwcEluZm8ubm9DaGVja1Byb3ZpZGVyKSB7XG4gICAgICBhc3NlcnQocHJvdmlkZXIsIGBcInByb3ZpZGVyXCIgaXMgXCIke3Byb3ZpZGVyfVwiLmApO1xuICAgICAgLy8gTm8gbmVlZCB0byB1c2UgXCJoYXNPd25cIiwgYmVjYXVzZSBcInJlbmRlclwiIG1heSBiZSBvbiB0aGUgcHJvdG90eXBlIGNoYWluXG4gICAgICBhc3NlcnQoJ3JlbmRlcicgaW4gcHJvdmlkZXIsICdcInJlbmRlclwiIGlzIHJlcXVpcmVkIGluIHByb3ZpZGVyLicpO1xuICAgICAgYXNzZXJ0KCdkZXN0cm95JyBpbiBwcm92aWRlciwgJ1wiZGVzdHJveVwiIGlzIHJlcXVpcmVkIGluIHByb3ZpZGVyLicpO1xuICAgIH1cblxuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlciBhcyBpbnRlcmZhY2VzLlByb3ZpZGVyO1xuICAgIHJldHVybiBwcm92aWRlciBhcyBpbnRlcmZhY2VzLlByb3ZpZGVyO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgd2FybiwgZXJyb3IsIFRleHQsIHRyYW5zZm9ybVVybCwgYXNzZXJ0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHtcbiAgTG9hZGVyLFxuICBTdHlsZU1hbmFnZXIsXG4gIFRlbXBsYXRlTWFuYWdlcixcbiAgSmF2YVNjcmlwdE1hbmFnZXIsXG59IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQgeyBBcHBJbmZvIH0gZnJvbSAnLi9hcHAnO1xuXG4vLyBGZXRjaCBgc2NyaXB0YCwgYGxpbmtgIGFuZCBgbW9kdWxlIG1ldGFgIGVsZW1lbnRzXG5mdW5jdGlvbiBmZXRjaFN0YXRpY1Jlc291cmNlcyhcbiAgYXBwTmFtZTogc3RyaW5nLFxuICBsb2FkZXI6IExvYWRlcixcbiAgZW50cnlNYW5hZ2VyOiBUZW1wbGF0ZU1hbmFnZXIsXG4pIHtcbiAgY29uc3QgaXNBc3luYyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnICYmIHZhbCAhPT0gJ2ZhbHNlJztcblxuICAvLyBHZXQgYWxsIHNjcmlwdCBlbGVtZW50c1xuICBjb25zdCBqc05vZGVzID0gUHJvbWlzZS5hbGwoXG4gICAgZW50cnlNYW5hZ2VyXG4gICAgICAuZmluZEFsbEpzTm9kZXMoKVxuICAgICAgLm1hcCgobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBzcmMgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdzcmMnKTtcbiAgICAgICAgY29uc3QgdHlwZSA9IGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ3R5cGUnKTtcbiAgICAgICAgY29uc3QgY3Jvc3NPcmlnaW4gPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgJ2Nyb3Nzb3JpZ2luJyxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBUaGVyZSBzaG91bGQgYmUgbm8gZW1iZWRkZWQgc2NyaXB0IGluIHRoZSBzY3JpcHQgZWxlbWVudCB0YWcgd2l0aCB0aGUgc3JjIGF0dHJpYnV0ZSBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgIGNvbnN0IGZldGNoVXJsID0gZW50cnlNYW5hZ2VyLnVybFxuICAgICAgICAgICAgPyB0cmFuc2Zvcm1VcmwoZW50cnlNYW5hZ2VyLnVybCwgc3JjKVxuICAgICAgICAgICAgOiBzcmM7XG4gICAgICAgICAgY29uc3QgYXN5bmMgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdhc3luYycpO1xuXG4gICAgICAgICAgLy8gU2NyaXB0cyB3aXRoIFwiYXN5bmNcIiBhdHRyaWJ1dGUgd2lsbCBtYWtlIHRoZSByZW5kZXJpbmcgcHJvY2VzcyB2ZXJ5IGNvbXBsaWNhdGVkLFxuICAgICAgICAgIC8vIHdlIGhhdmUgYSBwcmVsb2FkIG1lY2hhbmlzbSwgc28gd2UgZG9uXHUyMDE5dCBuZWVkIHRvIGRlYWwgd2l0aCBpdC5cbiAgICAgICAgICByZXR1cm4gbG9hZGVyXG4gICAgICAgICAgICAubG9hZDxKYXZhU2NyaXB0TWFuYWdlcj4oe1xuICAgICAgICAgICAgICBzY29wZTogYXBwTmFtZSxcbiAgICAgICAgICAgICAgdXJsOiBmZXRjaFVybCxcbiAgICAgICAgICAgICAgY3Jvc3NPcmlnaW4sXG4gICAgICAgICAgICAgIGRlZmF1bHRDb250ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoeyByZXNvdXJjZU1hbmFnZXI6IGpzTWFuYWdlciB9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChqc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBqc01hbmFnZXIuc2V0RGVwKG5vZGUpO1xuICAgICAgICAgICAgICAgIHR5cGUgJiYganNNYW5hZ2VyLnNldE1pbWVUeXBlKHR5cGUpO1xuICAgICAgICAgICAgICAgIGpzTWFuYWdlci5zZXRBc3luY0F0dHJpYnV0ZShpc0FzeW5jKGFzeW5jKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzTWFuYWdlcjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YXJuKGBbJHthcHBOYW1lfV0gRmFpbGVkIHRvIGxvYWQgc2NyaXB0OiAke2ZldGNoVXJsfWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IG51bGwpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNvZGUgPSAobm9kZS5jaGlsZHJlblswXSBhcyBUZXh0KS5jb250ZW50O1xuICAgICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBqc01hbmFnZXIgPSBuZXcgSmF2YVNjcmlwdE1hbmFnZXIoY29kZSwgJycpO1xuICAgICAgICAgICAganNNYW5hZ2VyLnNldERlcChub2RlKTtcbiAgICAgICAgICAgIHR5cGUgJiYganNNYW5hZ2VyLnNldE1pbWVUeXBlKHR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIGpzTWFuYWdlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pLFxuICApO1xuXG4gIC8vIEdldCBhbGwgbGluayBlbGVtZW50c1xuICBjb25zdCBsaW5rTm9kZXMgPSBQcm9taXNlLmFsbChcbiAgICBlbnRyeU1hbmFnZXJcbiAgICAgIC5maW5kQWxsTGlua05vZGVzKClcbiAgICAgIC5tYXAoKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFlbnRyeU1hbmFnZXIuRE9NQXBpcy5pc0Nzc0xpbmtOb2RlKG5vZGUpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGhyZWYgPSBlbnRyeU1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdocmVmJyk7XG4gICAgICAgIGlmIChocmVmKSB7XG4gICAgICAgICAgY29uc3QgZmV0Y2hVcmwgPSBlbnRyeU1hbmFnZXIudXJsXG4gICAgICAgICAgICA/IHRyYW5zZm9ybVVybChlbnRyeU1hbmFnZXIudXJsLCBocmVmKVxuICAgICAgICAgICAgOiBocmVmO1xuICAgICAgICAgIHJldHVybiBsb2FkZXJcbiAgICAgICAgICAgIC5sb2FkPFN0eWxlTWFuYWdlcj4oeyBzY29wZTogYXBwTmFtZSwgdXJsOiBmZXRjaFVybCB9KVxuICAgICAgICAgICAgLnRoZW4oKHsgcmVzb3VyY2VNYW5hZ2VyOiBzdHlsZU1hbmFnZXIgfSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3R5bGVNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVNYW5hZ2VyLnNldERlcChub2RlKTtcbiAgICAgICAgICAgICAgICBzdHlsZU1hbmFnZXIuY29ycmVjdFBhdGgoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVNYW5hZ2VyO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdhcm4oYCR7YXBwTmFtZX0gRmFpbGVkIHRvIGxvYWQgbGluazogJHtmZXRjaFVybH1gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbiksXG4gICk7XG5cbiAgLy8gR2V0IGFsbCByZW1vdGUgbW9kdWxlc1xuICBjb25zdCBtZXRhTm9kZXMgPSBQcm9taXNlLmFsbChcbiAgICBlbnRyeU1hbmFnZXJcbiAgICAgIC5maW5kQWxsTWV0YU5vZGVzKClcbiAgICAgIC5tYXAoKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCFlbnRyeU1hbmFnZXIuRE9NQXBpcy5pc1JlbW90ZU1vZHVsZShub2RlKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhc3luYyA9IGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ2FzeW5jJyk7XG4gICAgICAgIGNvbnN0IGFsaWFzID0gZW50cnlNYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAnYWxpYXMnKTtcbiAgICAgICAgaWYgKCFpc0FzeW5jKGFzeW5jKSkge1xuICAgICAgICAgIGNvbnN0IHNyYyA9IGVudHJ5TWFuYWdlci5maW5kQXR0cmlidXRlVmFsdWUobm9kZSwgJ3NyYycpO1xuICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2FkZXJcbiAgICAgICAgICAgICAgLmxvYWRNb2R1bGUoc3JjKVxuICAgICAgICAgICAgICAudGhlbigoeyByZXNvdXJjZU1hbmFnZXI6IG1vZHVsZU1hbmFnZXIgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb2R1bGVNYW5hZ2VyICYmIGFsaWFzKSB7XG4gICAgICAgICAgICAgICAgICBtb2R1bGVNYW5hZ2VyICYmIG1vZHVsZU1hbmFnZXIuc2V0QWxpYXMoYWxpYXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlTWFuYWdlcjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhbGlhcykge1xuICAgICAgICAgIHdhcm4oYEFzeW5jaHJvbm91cyBsb2FkaW5nIG1vZHVsZSwgdGhlIGFsaWFzIFwiJHthbGlhc31cIiBpcyBpbnZhbGlkLmApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKSxcbiAgKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoW2pzTm9kZXMsIGxpbmtOb2RlcywgbWV0YU5vZGVzXSkudGhlbigobHMpID0+XG4gICAgbHMubWFwKChuczogYW55KSA9PiBucy5maWx0ZXIoQm9vbGVhbikpLFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0FwcFJlc291cmNlcyhsb2FkZXI6IExvYWRlciwgYXBwSW5mbzogQXBwSW5mbykge1xuICBsZXQgaXNIdG1sTW9kZTogQm9vbGVhbiA9IGZhbHNlLFxuICAgIGZha2VFbnRyeU1hbmFnZXI7XG4gIGNvbnN0IHJlc291cmNlczogYW55ID0geyBqczogW10sIGxpbms6IFtdLCBtb2R1bGVzOiBbXSB9OyAvLyBEZWZhdWx0IHJlc291cmNlc1xuICBhc3NlcnQoYXBwSW5mby5lbnRyeSwgYFske2FwcEluZm8ubmFtZX1dIEVudHJ5IGlzIG5vdCBzcGVjaWZpZWQuYCk7XG4gIGNvbnN0IHsgcmVzb3VyY2VNYW5hZ2VyOiBlbnRyeU1hbmFnZXIgfSA9IGF3YWl0IGxvYWRlci5sb2FkKHtcbiAgICBzY29wZTogYXBwSW5mby5uYW1lLFxuICAgIHVybDogdHJhbnNmb3JtVXJsKGxvY2F0aW9uLmhyZWYsIGFwcEluZm8uZW50cnkpLFxuICB9KTtcblxuICAvLyBIdG1sIGVudHJ5XG4gIGlmIChlbnRyeU1hbmFnZXIgaW5zdGFuY2VvZiBUZW1wbGF0ZU1hbmFnZXIpIHtcbiAgICBpc0h0bWxNb2RlID0gdHJ1ZTtcbiAgICBjb25zdCBbanMsIGxpbmssIG1vZHVsZXNdID0gYXdhaXQgZmV0Y2hTdGF0aWNSZXNvdXJjZXMoXG4gICAgICBhcHBJbmZvLm5hbWUsXG4gICAgICBsb2FkZXIsXG4gICAgICBlbnRyeU1hbmFnZXIsXG4gICAgKTtcbiAgICByZXNvdXJjZXMuanMgPSBqcztcbiAgICByZXNvdXJjZXMubGluayA9IGxpbms7XG4gICAgcmVzb3VyY2VzLm1vZHVsZXMgPSBtb2R1bGVzO1xuICB9IGVsc2UgaWYgKGVudHJ5TWFuYWdlciBpbnN0YW5jZW9mIEphdmFTY3JpcHRNYW5hZ2VyKSB7XG4gICAgLy8gSnMgZW50cnlcbiAgICBpc0h0bWxNb2RlID0gZmFsc2U7XG4gICAgY29uc3QgbW9ja1RlbXBsYXRlQ29kZSA9IGA8c2NyaXB0IHNyYz1cIiR7ZW50cnlNYW5hZ2VyLnVybH1cIj48L3NjcmlwdD5gO1xuICAgIGZha2VFbnRyeU1hbmFnZXIgPSBuZXcgVGVtcGxhdGVNYW5hZ2VyKG1vY2tUZW1wbGF0ZUNvZGUsIGVudHJ5TWFuYWdlci51cmwpO1xuICAgIGVudHJ5TWFuYWdlci5zZXREZXAoZmFrZUVudHJ5TWFuYWdlci5maW5kQWxsSnNOb2RlcygpWzBdKTtcbiAgICByZXNvdXJjZXMuanMgPSBbZW50cnlNYW5hZ2VyXTtcbiAgfSBlbHNlIHtcbiAgICBlcnJvcihgRW50cmFuY2Ugd3JvbmcgdHlwZSBvZiByZXNvdXJjZSBvZiBcIiR7YXBwSW5mby5uYW1lfVwiLmApO1xuICB9XG5cbiAgcmV0dXJuIFtmYWtlRW50cnlNYW5hZ2VyIHx8IGVudHJ5TWFuYWdlciwgcmVzb3VyY2VzLCBpc0h0bWxNb2RlXTtcbn1cbiIsICJpbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi4vaW50ZXJmYWNlJztcblxuLy8gV2hlbiB0aGUgbWFpbiBhcHBsaWNhdGlvbiBpcyB1cGRhdGVkLCB0aGUgY3VycmVudGx5IGFjdGl2ZSBjaGlsZCBhcHBsaWNhdGlvbnMgbmVlZCB0byByZXJlbmRlci5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoSE1SUGx1Z2luKCkge1xuICBsZXQgaGFzSW5pdCA9IGZhbHNlO1xuICBsZXQgaXNIb3RVcGRhdGUgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdmaXgtaG1yJyxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuXG4gICAgICBib290c3RyYXAoKSB7XG4gICAgICAgIGlmIChoYXNJbml0KSByZXR1cm47XG4gICAgICAgIGhhc0luaXQgPSB0cnVlO1xuXG4gICAgICAgIGxldCB3ZWJwYWNrSG90VXBkYXRlTmFtZSA9ICd3ZWJwYWNrSG90VXBkYXRlJztcbiAgICAgICAgbGV0IHdlYnBhY2tIb3RVcGRhdGUgPSAod2luZG93IGFzIGFueSlbd2VicGFja0hvdFVwZGF0ZU5hbWVdO1xuXG4gICAgICAgIC8vIFx1NjdFNVx1NjI3RSB3ZWJwYWNrSG90VXBkYXRlIFx1NTFGRFx1NjU3MFxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gd2luZG93KSB7XG4gICAgICAgICAgaWYgKGkuaW5jbHVkZXMoJ3dlYnBhY2tIb3RVcGRhdGUnKSkge1xuICAgICAgICAgICAgd2VicGFja0hvdFVwZGF0ZU5hbWUgPSBpO1xuICAgICAgICAgICAgd2VicGFja0hvdFVwZGF0ZSA9IHdpbmRvd1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHdlYnBhY2tIb3RVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAod2luZG93IGFzIGFueSlbd2VicGFja0hvdFVwZGF0ZU5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXNIb3RVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHdlYnBhY2tIb3RVcGRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzSG90VXBkYXRlKSByZXR1cm47XG4gICAgICAgICAgICBpc0hvdFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBHYXJmaXNoLmFjdGl2ZUFwcHMuZm9yRWFjaCgoYXBwKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhcHAubW91bnRlZCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwLmRpc3BsYXkgJiYgYXBwLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgIGFwcC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoT3B0aW9uc0xpZmUob3B0aW9ucywgbmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKTogaW50ZXJmYWNlcy5QbHVnaW4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgdmVyc2lvbjogJzEuMTIuMCcsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgd2FybixcbiAgUXVldWUsXG4gIGlzQWJzb2x1dGUsXG4gIHRyYW5zZm9ybVVybCxcbiAgaWRsZUNhbGxiYWNrLFxuICBjYWxsVGVzdENhbGxiYWNrLFxuICBzYWZlV3JhcHBlcixcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgTG9hZGVyLCBNYW5hZ2VyLCBUZW1wbGF0ZU1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBzdG9yYWdlS2V5ID0gJ19fZ2FyZmlzaFByZWxvYWRBcHBfXyc7XG5cbmNvbnN0IGlzTW9iaWxlID1cbiAgL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICk7XG5cbi8vIFVzaW5nIHF1ZXVlcywgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIHdpdGggdGhlIG5vcm1hbCByZXF1ZXN0XG5jb25zdCByZXF1ZXN0UXVldWUgPSBuZXcgUXVldWUoKTtcblxuY29uc3QgaXNTbG93TmV0d29yayA9ICgpID0+XG4gIChuYXZpZ2F0b3IgYXMgYW55KS5jb25uZWN0aW9uXG4gICAgPyAobmF2aWdhdG9yIGFzIGFueSkuY29ubmVjdGlvbi5zYXZlRGF0YSB8fFxuICAgICAgLygyfDMpZy8udGVzdCgobmF2aWdhdG9yIGFzIGFueSkuY29ubmVjdGlvbi5lZmZlY3RpdmVUeXBlKVxuICAgIDogZmFsc2U7XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID1cbiAgZmFsc2UgfHwgdHlwZW9mIGlkbGVDYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJ1xuICAgID8gd2luZG93LnNldFRpbWVvdXRcbiAgICA6IGlkbGVDYWxsYmFjaztcblxuLy8gVGVzdCBzaXplLCBjYXRjaCBtaXN0YWtlcywgYXZvaWQgcHJlbG9hZCBmaXJzdCBzY3JlZW4gd2hpdGUgZHVyaW5nIHBhcnNpbmcgZXJyb3JcbmZ1bmN0aW9uIHNhZmVMb2FkKHtcbiAgbG9hZGVyLFxuICBhcHBOYW1lLFxuICB1cmwsXG4gIGlzTW9kdWxlLFxuICBpbW1lZGlhdGVseSxcbiAgY2FsbGJhY2ssXG59OiB7XG4gIGxvYWRlcjogTG9hZGVyO1xuICBhcHBOYW1lOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBpc01vZHVsZTogYm9vbGVhbjtcbiAgaW1tZWRpYXRlbHk6IGJvb2xlYW47XG4gIGNhbGxiYWNrPzogKG06IE1hbmFnZXIpID0+IGFueTtcbn0pIHtcbiAgY29uc3QgZ2VuZXJhdGVTdWNjZXNzID1cbiAgICAobmV4dDogKCkgPT4gdm9pZCA9ICgpID0+IHt9KSA9PlxuICAgICh7IHJlc291cmNlTWFuYWdlciB9KSA9PiB7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNvdXJjZU1hbmFnZXIpO1xuICAgICAgc2V0VGltZW91dChuZXh0LCA1MDApO1xuICAgIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVUaHJvd1dhcm4gPVxuICAgIChuZXh0OiAoKSA9PiB2b2lkID0gKCkgPT4ge30pID0+XG4gICAgKGUpID0+IHtcbiAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICB3YXJuKGUpO1xuICAgICAgICB3YXJuKGBQcmVsb2FkIGZhaWxlZC4gXCIke3VybH1cImApO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH07XG5cbiAgY29uc3QgbG9hZFJlc291cmNlID0gKG5leHQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fSkgPT4ge1xuICAgIGNvbnN0IHRocm93V2FybiA9IGdlbmVyYXRlVGhyb3dXYXJuKG5leHQpO1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnZW5lcmF0ZVN1Y2Nlc3MobmV4dCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc01vZHVsZSkge1xuICAgICAgICBsb2FkZXIubG9hZE1vZHVsZSh1cmwpLnRoZW4oc3VjY2VzcywgdGhyb3dXYXJuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRlci5sb2FkKHsgc2NvcGU6IGFwcE5hbWUsIHVybCB9KS50aGVuKHN1Y2Nlc3MsIHRocm93V2Fybik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3dXYXJuKGUpO1xuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoaW1tZWRpYXRlbHkpIHtcbiAgICBsb2FkUmVzb3VyY2UoKTtcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0UXVldWUuYWRkKChuZXh0KSA9PiB7XG4gICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IGxvYWRSZXNvdXJjZShuZXh0KSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRBcHBSZXNvdXJjZShcbiAgbG9hZGVyOiBMb2FkZXIsXG4gIGluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgaW1tZWRpYXRlbHkgPSBmYWxzZSxcbikge1xuICBmYWxzZSAmJiBjYWxsVGVzdENhbGxiYWNrKGxvYWRBcHBSZXNvdXJjZSwgaW5mbyk7XG4gIGNvbnN0IGZldGNoVXJsID0gdHJhbnNmb3JtVXJsKGxvY2F0aW9uLmhyZWYsIGluZm8uZW50cnkpO1xuXG4gIHNhZmVMb2FkKHtcbiAgICBsb2FkZXIsXG4gICAgYXBwTmFtZTogaW5mby5uYW1lLFxuICAgIHVybDogZmV0Y2hVcmwsXG4gICAgaXNNb2R1bGU6IGZhbHNlLFxuICAgIGltbWVkaWF0ZWx5LFxuICAgIGNhbGxiYWNrOiAobWFuYWdlcikgPT4ge1xuICAgICAgY29uc3QgbG9hZFN0YXRpY1Jlc291cmNlID0gKCkgPT4ge1xuICAgICAgICBpZiAobWFuYWdlciBpbnN0YW5jZW9mIFRlbXBsYXRlTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBtYW5hZ2VyLnVybDtcbiAgICAgICAgICBjb25zdCBqc05vZGVzID0gbWFuYWdlci5maW5kQWxsSnNOb2RlcygpO1xuICAgICAgICAgIGNvbnN0IGxpbmtOb2RlcyA9IG1hbmFnZXIuZmluZEFsbExpbmtOb2RlcygpO1xuICAgICAgICAgIGNvbnN0IG1ldGFOb2RlcyA9IG1hbmFnZXIuZmluZEFsbE1ldGFOb2RlcygpO1xuXG4gICAgICAgICAgaWYgKGpzTm9kZXMpIHtcbiAgICAgICAgICAgIGpzTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzcmMgPSBtYW5hZ2VyLmZpbmRBdHRyaWJ1dGVWYWx1ZShub2RlLCAnc3JjJyk7XG4gICAgICAgICAgICAgIHNyYyAmJlxuICAgICAgICAgICAgICAgIHNhZmVMb2FkKHtcbiAgICAgICAgICAgICAgICAgIGxvYWRlcixcbiAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgIHVybDogYmFzZVVybCA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBzcmMpIDogc3JjLFxuICAgICAgICAgICAgICAgICAgaXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaW1tZWRpYXRlbHksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxpbmtOb2Rlcykge1xuICAgICAgICAgICAgbGlua05vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG1hbmFnZXIuRE9NQXBpcy5pc0Nzc0xpbmtOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9IG1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdocmVmJyk7XG4gICAgICAgICAgICAgICAgaHJlZiAmJlxuICAgICAgICAgICAgICAgICAgc2FmZUxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXIsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlVXJsID8gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIGhyZWYpIDogaHJlZixcbiAgICAgICAgICAgICAgICAgICAgaXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1ldGFOb2Rlcykge1xuICAgICAgICAgICAgbWV0YU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG1hbmFnZXIuRE9NQXBpcy5pc1JlbW90ZU1vZHVsZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IG1hbmFnZXIuZmluZEF0dHJpYnV0ZVZhbHVlKG5vZGUsICdzcmMnKTtcbiAgICAgICAgICAgICAgICBpZiAoc3JjICYmIGlzQWJzb2x1dGUoc3JjKSkge1xuICAgICAgICAgICAgICAgICAgc2FmZUxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXIsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgIGlzTW9kdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVGhlIGxvYWRpbmcgb2YgdGhlIHJlbW90ZSBtb2R1bGUgbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoLiBcIiR7c3JjfVwiYCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoaW1tZWRpYXRlbHkpIHtcbiAgICAgICAgbG9hZFN0YXRpY1Jlc291cmNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKGxvYWRTdGF0aWNSZXNvdXJjZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5raW5nKCkge1xuICBjb25zdCBzdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgaWYgKHN0cikge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4gYi5jb3VudCAtIGEuY291bnQpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJhbmtpbmcoYXBwTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHN0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICBjb25zdCBuZXdDdXJyZW50ID0geyBhcHBOYW1lLCBjb3VudDogMSB9O1xuXG4gIGlmICghc3RyKSB7XG4gICAgc2FmZVdyYXBwZXIoKCkgPT5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KFtuZXdDdXJyZW50XSkpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2Uoc3RyKTtcbiAgICBjb25zdCBjdXJyZW50ID0gZGF0YS5maW5kKChhcHApID0+IGFwcC5hcHBOYW1lID09PSBhcHBOYW1lKTtcbiAgICBjdXJyZW50ID8gY3VycmVudC5jb3VudCsrIDogZGF0YS5wdXNoKG5ld0N1cnJlbnQpO1xuICAgIHNhZmVXcmFwcGVyKCgpID0+IGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKSk7XG4gIH1cbn1cblxuY29uc3QgbG9hZGVkTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gR2xvYmFsIGNhY2hlLCBvbmx5IGxvYWQgYWdhaW4gaXMgZW5vdWdoXG5cbmRlY2xhcmUgbW9kdWxlICdAZ2FyZmlzaC9jb3JlJyB7XG4gIGV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBHYXJmaXNoIHtcbiAgICBwcmVsb2FkQXBwOiAoYXBwTmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoUHJlbG9hZFBsdWdpbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgR2FyZmlzaC5wcmVsb2FkQXBwID0gKGFwcE5hbWUpID0+IHtcbiAgICAgIGxvYWRBcHBSZXNvdXJjZShHYXJmaXNoLmxvYWRlciwgR2FyZmlzaC5hcHBJbmZvc1thcHBOYW1lXSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncHJlbG9hZCcsXG4gICAgICB2ZXJzaW9uOiAnMS4xMi4wJyxcblxuICAgICAgYmVmb3JlTG9hZChhcHBJbmZvKSB7XG4gICAgICAgIGlmIChHYXJmaXNoLm9wdGlvbnMuZGlzYWJsZVByZWxvYWRBcHApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0UmFua2luZyhhcHBJbmZvLm5hbWUpO1xuICAgICAgfSxcblxuICAgICAgcmVnaXN0ZXJBcHAoYXBwSW5mb3MpIHtcbiAgICAgICAgLy8gVGhyb3VnaCBkaXNhYmxlUHJlbG9hZEFwcCBwcmVsb2FkIGlzIHByb2hpYml0ZWRcbiAgICAgICAgaWYgKEdhcmZpc2gub3B0aW9ucy5kaXNhYmxlUHJlbG9hZEFwcCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc01vYmlsZSB8fCBpc1Nsb3dOZXR3b3JrKCkpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHJhbmtpbmcgPSBnZXRSYW5raW5nKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBhcHBOYW1lIH0gb2YgcmFua2luZykge1xuICAgICAgICAgICAgICBpZiAoYXBwSW5mb3NbYXBwTmFtZV0gJiYgIWxvYWRlZE1hcFthcHBOYW1lXSkge1xuICAgICAgICAgICAgICAgIGxvYWRlZE1hcFthcHBOYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbG9hZEFwcFJlc291cmNlKEdhcmZpc2gubG9hZGVyLCBhcHBJbmZvc1thcHBOYW1lXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYXBwSW5mb3MpIHtcbiAgICAgICAgICAgICAgaWYgKCFsb2FkZWRNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgIGxvYWRBcHBSZXNvdXJjZShHYXJmaXNoLmxvYWRlciwgYXBwSW5mb3Nba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlID8gMCA6IDUwMDAsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZ2V0UmVuZGVyTm9kZSwgd2FybiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UnO1xuXG4vLyBDaGlsZCBhcHAgcGVyZm9ybWFuY2UgbW9uaXRvcmluZyB0b29sc1xuaW50ZXJmYWNlIFBlcmZvcm1hbmNlRGF0YSB7XG4gIHJlc291cmNlTG9hZFRpbWU6IG51bWJlcjtcbiAgYmxhbmtTY3JlZW5UaW1lOiBudW1iZXI7XG4gIGZpcnN0U2NyZWVuVGltZTogbnVtYmVyO1xuICBpc0ZpcnN0UmVuZGVyOiBib29sZWFuO1xuICBlbnRyeTogc3RyaW5nO1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIENhbGxiYWNrRnVuY3Rpb24ge1xuICAocGVyZm9ybWFuY2VEYXRhOiBQZXJmb3JtYW5jZURhdGEpOiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgQ29uZmlnIHtcbiAgYXR0cmlidXRlczogYm9vbGVhbjtcbiAgY2hpbGRMaXN0OiBib29sZWFuO1xuICBzdWJ0cmVlOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSU9wdGlvbnMge1xuICBzdWJBcHBSb290U2VsZWN0b3I6IGludGVyZmFjZXMuRG9tR2V0dGVyO1xuICBkb21PYnNlcnZlck1heFRpbWU/OiBudW1iZXI7XG4gIHdhaXRTdWJBcHBOb3RpZnlNYXhUaW1lPzogbnVtYmVyO1xuICBvYnNlcnZlQ29uZmlnPzogQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgU3ViQXBwT2JzZXJ2ZXIge1xuICBwcml2YXRlIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICBwcml2YXRlIHRpbWVMYWc6IG51bWJlcjtcbiAgcHJpdmF0ZSByZXBvcnRUaW1lTGFnOiBudW1iZXI7XG4gIHByaXZhdGUgb2JzZXJ2ZVRpbWVyOiBudW1iZXI7XG4gIHByaXZhdGUgZGF0YVRpbWVyOiBudW1iZXI7XG4gIHByaXZhdGUgZW50cnk6IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJBcHBCZWZvcmVMb2FkVGltZTogbnVtYmVyO1xuICBwcml2YXRlIHN1YkFwcEJlZm9yZU1vdW50VGltZTogbnVtYmVyO1xuICBwcml2YXRlIHN1YkFwcFN0YXJ0UGFnZVNob3dUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgc3ViQXBwUGFnZVNob3dUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgZG9tUXVlcnlTZWxlY3RvcjogaW50ZXJmYWNlcy5Eb21HZXR0ZXI7XG4gIHByaXZhdGUgZmluaXNoQWN0aW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgY29uZmlnOiBDb25maWc7XG4gIHByaXZhdGUgaXNSZWNvcmRGaW5pc2g6IGJvb2xlYW47XG4gIHByaXZhdGUgaXNDYWxsQmFja0ZpbmlzaDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpc1N0YXJ0U2hvd0ZsYWc6IGJvb2xlYW47XG4gIHByaXZhdGUgaXNTdWJBcHBOb3RpZnlGaW5pc2g6IGJvb2xlYW47XG4gIHByaXZhdGUgdGFyZ2V0U3Vic2NyaWJlcjogQ2FsbGJhY2tGdW5jdGlvbltdO1xuICBwcml2YXRlIGNiRW50cnlMaXN0OiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBwZXJmb3JtYW5jZURhdGE6IFBlcmZvcm1hbmNlRGF0YTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICAgIHRoaXMuX211dGF0aW9uT2JzZXJ2ZXJDYWxsYmFjay5iaW5kKHRoaXMpLFxuICAgICk7XG4gICAgdGhpcy5zdWJBcHBCZWZvcmVMb2FkVGltZSA9IDA7XG4gICAgdGhpcy5zdWJBcHBCZWZvcmVNb3VudFRpbWUgPSAwO1xuICAgIHRoaXMuc3ViQXBwU3RhcnRQYWdlU2hvd1RpbWUgPSAwO1xuICAgIHRoaXMuc3ViQXBwUGFnZVNob3dUaW1lID0gMDtcbiAgICB0aGlzLmVudHJ5ID0gJyc7XG4gICAgdGhpcy5vYnNlcnZlVGltZXIgPSAwO1xuICAgIHRoaXMuZGF0YVRpbWVyID0gMDtcbiAgICB0aGlzLmRvbVF1ZXJ5U2VsZWN0b3IgPSBvcHRpb25zLnN1YkFwcFJvb3RTZWxlY3RvcjtcbiAgICB0aGlzLmNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgdGhpcy50YXJnZXRTdWJzY3JpYmVyID0gW107XG4gICAgdGhpcy50aW1lTGFnID0gb3B0aW9ucy5kb21PYnNlcnZlck1heFRpbWUgfHwgMzAwMDtcbiAgICB0aGlzLnJlcG9ydFRpbWVMYWcgPSBvcHRpb25zLndhaXRTdWJBcHBOb3RpZnlNYXhUaW1lIHx8IDEwMDAwO1xuICAgIHRoaXMuaXNSZWNvcmRGaW5pc2ggPSBmYWxzZTtcbiAgICB0aGlzLmNiRW50cnlMaXN0ID0gW107XG4gICAgdGhpcy5pc1N0YXJ0U2hvd0ZsYWcgPSB0cnVlO1xuICAgIHRoaXMuaXNDYWxsQmFja0ZpbmlzaCA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdWJBcHBOb3RpZnlGaW5pc2ggPSBmYWxzZTtcbiAgICB0aGlzLmZpbmlzaEFjdGlvbiA9ICcnO1xuICAgIHRoaXMucGVyZm9ybWFuY2VEYXRhID0ge1xuICAgICAgcmVzb3VyY2VMb2FkVGltZTogMCxcbiAgICAgIGJsYW5rU2NyZWVuVGltZTogMCxcbiAgICAgIGZpcnN0U2NyZWVuVGltZTogMCxcbiAgICAgIGlzRmlyc3RSZW5kZXI6IHRydWUsXG4gICAgICBlbnRyeTogJycsXG4gICAgICBhY3Rpb246ICcnLFxuICAgIH07XG4gIH1cblxuICBzdWJzY3JpYmVQZXJmb3JtYW5jZURhdGEoY2FsbGJhY2s6IENhbGxiYWNrRnVuY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy50YXJnZXRTdWJzY3JpYmVyLnB1c2goY2FsbGJhY2spO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHdhcm4oZSk7XG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlUGVyZm9ybWFuY2VEYXRhT25jZShjYWxsYmFjazogQ2FsbGJhY2tGdW5jdGlvbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB3cmFwQ2FsbGJhY2sgPSAocGVyZm9ybWFuY2VEYXRhKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHBlcmZvcm1hbmNlRGF0YSk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVQZXJmb3JtYW5jZURhdGEod3JhcENhbGxiYWNrKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudGFyZ2V0U3Vic2NyaWJlci5wdXNoKHdyYXBDYWxsYmFjayk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2FybihlKTtcbiAgICB9XG4gIH1cblxuICB1bnN1YnNjcmliZVBlcmZvcm1hbmNlRGF0YShjYWxsYmFjazogQ2FsbGJhY2tGdW5jdGlvbikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnRhcmdldFN1YnNjcmliZXIgPSB0aGlzLnRhcmdldFN1YnNjcmliZXIuZmlsdGVyKFxuICAgICAgICAoc3ViKSA9PiBzdWIgPT09IGNhbGxiYWNrLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuKGUpO1xuICAgIH1cbiAgfVxuXG4gIHN1YkFwcEJlZm9yZUxvYWQoZW50cnk6IHN0cmluZykge1xuICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICB0aGlzLmlzUmVjb3JkRmluaXNoID0gZmFsc2U7XG4gICAgdGhpcy5pc1N1YkFwcE5vdGlmeUZpbmlzaCA9IGZhbHNlO1xuICAgIHRoaXMuc3ViQXBwQmVmb3JlTG9hZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLmlzQ2FsbEJhY2tGaW5pc2ggPSBmYWxzZTtcbiAgICB0aGlzLl9oYW5kbGVTdWJzY3JpYmVDYWxsYmFjayhmYWxzZSk7XG4gIH1cblxuICBzdWJBcHBCZWZvcmVNb3VudCgpIHtcbiAgICB0aGlzLnN1YkFwcEJlZm9yZU1vdW50VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHRoaXMuX3N1YkFwcFN0YXJ0T2JzZXJ2ZXIoKTtcbiAgfVxuXG4gIHN1YkFwcFVubW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLmlzUmVjb3JkRmluaXNoKSB7XG4gICAgICB0aGlzLl9zdWJBcHBFbmRPYnNlcnZlcignc3ViQXBwVW5tb3VudCcpO1xuICAgIH1cbiAgICB0aGlzLl9oYW5kbGVTdWJzY3JpYmVDYWxsYmFjayh0cnVlKTtcbiAgfVxuXG4gIC8vIFRoZSBjaGlsZCBhcHAgYWN0aXZlbHkgbm90aWZpZXMgdGhlIGZpcnN0IHNjcmVlbiBsb2FkaW5nIGlzIGNvbXBsZXRlXG4gIGFmdGVyUmVuZGVyTm90aWZ5KCkge1xuICAgIGlmICghdGhpcy5pc1JlY29yZEZpbmlzaCkge1xuICAgICAgLy8gSWYgdGhlIG1vbml0b3JpbmcgcmVuZGVyaW5nIGhhcyBub3QgZW5kZWQsIGFjdGl2ZWx5IHN0b3AgdGhlIG9ic2VydmF0aW9uIGFuZCBwcm9jZXNzIHRoZSBkYXRhXG4gICAgICB0aGlzLl9zdWJBcHBFbmRPYnNlcnZlcignU3ViQXBwUmVuZGVyTm90aWZ5Jyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1N1YkFwcE5vdGlmeUZpbmlzaCkge1xuICAgICAgLy8gSWYgdGhlIG1vbml0b3JpbmcgcmVuZGVyaW5nIGhhcyBlbmRlZCwgYWN0aXZlbHkgdXBkYXRlIHRoZSBwcm9jZXNzZWQgZGF0YVxuICAgICAgdGhpcy5pc1N1YkFwcE5vdGlmeUZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLmlzUmVjb3JkRmluaXNoID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmluaXNoQWN0aW9uID0gJ1N1YkFwcFJlbmRlck5vdGlmeSc7XG4gICAgICB0aGlzLl9zdWJBcHBQZXJmb3JtYW5jZURhdGFIYW5kbGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9tdXRhdGlvbk9ic2VydmVyQ2FsbGJhY2soKSB7XG4gICAgLy8gU3RhcnQgcmVuZGVyaW5nIGVsZW1lbnRzIGluIHRoZSBjaGlsZCBhcHAgY29udGFpbmVyIHRvIHJlY29yZCB0aGUgZG90XG4gICAgaWYgKHRoaXMuaXNTdGFydFNob3dGbGFnKSB7XG4gICAgICB0aGlzLnN1YkFwcFN0YXJ0UGFnZVNob3dUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICB0aGlzLmlzU3RhcnRTaG93RmxhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRoZSByZW5kZXJpbmcgZWxlbWVudHMgaW4gdGhlIGNoaWxkIGFwcCBjb250YWluZXIgbm8gbG9uZ2VyIGNoYW5nZSBmb3IgYSBjZXJ0YWluIHBlcmlvZCBvZiB0aW1lXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMub2JzZXJ2ZVRpbWVyKTtcbiAgICB0aGlzLm9ic2VydmVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMub2JzZXJ2ZVRpbWVyKTtcbiAgICAgIGlmICghdGhpcy5pc1JlY29yZEZpbmlzaCkge1xuICAgICAgICB0aGlzLl9zdWJBcHBFbmRPYnNlcnZlcignTXV0YXRpb25PYnNlcnZlcicpO1xuICAgICAgfVxuICAgIH0sIHRoaXMudGltZUxhZykgYXMgdW5rbm93biBhcyBudW1iZXI7XG4gIH1cblxuICBwcml2YXRlIF9zdWJBcHBFbmRPYnNlcnZlcihmaW5pc2hBY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMuaXNSZWNvcmRGaW5pc2ggPSB0cnVlO1xuICAgIHRoaXMuZmluaXNoQWN0aW9uID0gZmluaXNoQWN0aW9uO1xuICAgIHRoaXMuc3ViQXBwUGFnZVNob3dUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5fc3ViQXBwUGVyZm9ybWFuY2VEYXRhSGFuZGxlKCk7XG4gICAgdGhpcy5pc1N0YXJ0U2hvd0ZsYWcgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfc3ViQXBwU3RhcnRPYnNlcnZlcigpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGF3YWl0IGdldFJlbmRlck5vZGUodGhpcy5kb21RdWVyeVNlbGVjdG9yKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLl9zdWJBcHBDbGlja0V2ZW50T2JzZXJ2ZXIodGFyZ2V0Tm9kZSBhcyBIVE1MRWxlbWVudCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2FybihlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zdWJBcHBQZXJmb3JtYW5jZURhdGFIYW5kbGUoKSB7XG4gICAgY29uc3QgdGltZURpZmZlcmVuY2UgPVxuICAgICAgdGhpcy5maW5pc2hBY3Rpb24gPT09ICdNdXRhdGlvbk9ic2VydmVyJyA/IHRoaXMudGltZUxhZyA6IDA7XG4gICAgdGhpcy5wZXJmb3JtYW5jZURhdGEgPSB7XG4gICAgICByZXNvdXJjZUxvYWRUaW1lOiB0aGlzLnN1YkFwcEJlZm9yZU1vdW50VGltZSAtIHRoaXMuc3ViQXBwQmVmb3JlTG9hZFRpbWUsXG4gICAgICBibGFua1NjcmVlblRpbWU6IHRoaXMuc3ViQXBwU3RhcnRQYWdlU2hvd1RpbWUgLSB0aGlzLnN1YkFwcEJlZm9yZUxvYWRUaW1lLFxuICAgICAgZmlyc3RTY3JlZW5UaW1lOlxuICAgICAgICB0aGlzLnN1YkFwcFBhZ2VTaG93VGltZSAtIHRoaXMuc3ViQXBwQmVmb3JlTG9hZFRpbWUgLSB0aW1lRGlmZmVyZW5jZSxcbiAgICAgIGlzRmlyc3RSZW5kZXI6IHRoaXMuY2JFbnRyeUxpc3QuaW5kZXhPZih0aGlzLmVudHJ5KSA9PT0gLTEsXG4gICAgICBlbnRyeTogdGhpcy5lbnRyeSxcbiAgICAgIGFjdGlvbjogdGhpcy5maW5pc2hBY3Rpb24sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YkFwcENsaWNrRXZlbnRPYnNlcnZlcih0YXJnZXROb2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGV2ZW50Q2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5vYnNlcnZlVGltZXIpO1xuICAgICAgaWYgKCF0aGlzLmlzUmVjb3JkRmluaXNoKSB7XG4gICAgICAgIHRoaXMuX3N1YkFwcEVuZE9ic2VydmVyKCdVc2VyRXZlbnQnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRhcmdldE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudENhbGxiYWNrKTtcbiAgICB0YXJnZXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnRDYWxsYmFjayk7XG4gICAgdGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRDYWxsYmFjayk7XG4gICAgdGFyZ2V0Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGV2ZW50Q2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2FsbGJhY2soKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaXNDYWxsQmFja0ZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLnRhcmdldFN1YnNjcmliZXIuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGZpcnN0U2NyZWVuVGltZSxcbiAgICAgICAgICBibGFua1NjcmVlblRpbWUsXG4gICAgICAgICAgcmVzb3VyY2VMb2FkVGltZSxcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgZW50cnksXG4gICAgICAgIH0gPSB0aGlzLnBlcmZvcm1hbmNlRGF0YTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGZpcnN0U2NyZWVuVGltZSA+IDAgJiZcbiAgICAgICAgICBibGFua1NjcmVlblRpbWUgPiAwICYmXG4gICAgICAgICAgcmVzb3VyY2VMb2FkVGltZSA+IDAgJiZcbiAgICAgICAgICBhY3Rpb24gJiZcbiAgICAgICAgICBlbnRyeVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU1VDQ0VTUzogJywgdGhpcy5wZXJmb3JtYW5jZURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNiRW50cnlMaXN0LnB1c2godGhpcy5lbnRyeSk7XG4gICAgICAgICAgY2FsbGJhY2sodGhpcy5wZXJmb3JtYW5jZURhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFUlJPUjogJywgdGhpcy5wZXJmb3JtYW5jZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuKGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVN1YnNjcmliZUNhbGxiYWNrKGlzSW1tZWRpYXRlbHk6IGJvb2xlYW4pIHtcbiAgICB0cnkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGF0YVRpbWVyKTtcbiAgICAgIGlmIChpc0ltbWVkaWF0ZWx5ICYmICF0aGlzLmlzQ2FsbEJhY2tGaW5pc2gpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FsbGJhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF0YVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlQ2FsbGJhY2soKTtcbiAgICAgICAgfSwgdGhpcy5yZXBvcnRUaW1lTGFnKSBhcyB1bmtub3duIGFzIG51bWJlcjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuKGUpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IGdldFJlbmRlck5vZGUgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xuaW1wb3J0IHsgU3ViQXBwT2JzZXJ2ZXIgfSBmcm9tICcuL3N1YkFwcE9ic2VydmVyJztcblxuLy8gS2V5IG5vZGVzIGluIEdhcmZpc2ggY29ycmVzcG9uZGluZyB0byB0aGUgbGlmZSBjeWNsZSBvZiByZWdpc3RyYXRpb25cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoUGVyZm9ybWFuY2UoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKTogaW50ZXJmYWNlcy5QbHVnaW4ge1xuICAgIGNvbnN0IHN1YkFwcE1hcCA9IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncGVyZm9ybWFuY2UnLFxuXG4gICAgICBiZWZvcmVMb2FkKGFwcEluZm8pIHtcbiAgICAgICAgaWYgKCFzdWJBcHBNYXBbYXBwSW5mby5uYW1lXSAmJiBhcHBJbmZvLmRvbUdldHRlcikge1xuICAgICAgICAgIHN1YkFwcE1hcFthcHBJbmZvLm5hbWVdID0gbmV3IFN1YkFwcE9ic2VydmVyKHtcbiAgICAgICAgICAgIHN1YkFwcFJvb3RTZWxlY3RvcjogYXBwSW5mby5kb21HZXR0ZXIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3ViQXBwTWFwW2FwcEluZm8ubmFtZV0uc3ViQXBwQmVmb3JlTG9hZChhcHBJbmZvLmVudHJ5KTtcbiAgICAgIH0sXG5cbiAgICAgIGFmdGVyTG9hZChhcHBJbmZvLCBhcHBJbnN0YW5jZTogaW50ZXJmYWNlcy5BcHApIHtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgYXBwSW5zdGFuY2UuYXBwUGVyZm9ybWFuY2UgPSBzdWJBcHBNYXBbYXBwSW5mby5uYW1lXSBhcyBhbnk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZU1vdW50KGFwcEluZm8pIHtcbiAgICAgICAgc3ViQXBwTWFwW2FwcEluZm8ubmFtZV0uc3ViQXBwQmVmb3JlTW91bnQoYXBwSW5mby5lbnRyeSk7XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50KGFwcEluZm8pIHtcbiAgICAgICAgc3ViQXBwTWFwW2FwcEluZm8ubmFtZV0uc3ViQXBwVW5tb3VudChhcHBJbmZvLmVudHJ5KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjb3JlTG9nIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoTG9nZ2VyKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCk6IGludGVyZmFjZXMuUGx1Z2luIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ2dhcmZpc2gtbG9nZ2VyJyxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuICAgICAgYmVmb3JlTG9hZChhcHBJbmZvLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBiZWZvcmVMb2FkYCwgW2FwcEluZm8sIC4uLmFyZ3NdKTtcbiAgICAgIH0sXG4gICAgICBhZnRlckxvYWQoYXBwSW5mbywgYXBwSW5zdGFuY2UsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgY29yZUxvZyhgJHthcHBJbmZvLm5hbWV9IGlkOiAke2FwcEluc3RhbmNlLmFwcElkfSBhZnRlckxvYWRgLCBbXG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJlZm9yZU1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBpZDogJHthcHBJbnN0YW5jZS5hcHBJZH0gYmVmb3JlTW91bnRgLCBbXG4gICAgICAgICAgYXBwSW5mbyxcbiAgICAgICAgICAuLi5hcmdzLFxuICAgICAgICBdKTtcbiAgICAgIH0sXG4gICAgICBhZnRlck1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBpZDogJHthcHBJbnN0YW5jZS5hcHBJZH0gYWZ0ZXJNb3VudGAsIFtcbiAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICAgIGJlZm9yZVVubW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29yZUxvZyhgJHthcHBJbmZvLm5hbWV9IGlkOiAke2FwcEluc3RhbmNlLmFwcElkfSBiZWZvcmVVbm1vdW50YCwgW1xuICAgICAgICAgIGFwcEluZm8sXG4gICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgXSk7XG4gICAgICB9LFxuICAgICAgYWZ0ZXJVbm1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvcmVMb2coYCR7YXBwSW5mby5uYW1lfSBpZDogJHthcHBJbnN0YW5jZS5hcHBJZH0gYWZ0ZXJVbm1vdW50YCwgW1xuICAgICAgICAgIGFwcEluZm8sXG4gICAgICAgICAgLi4uYXJncyxcbiAgICAgICAgXSk7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBSb3V0ZXJIb29rID0gKFxuICB0bzogQ3VycmVudFJvdXRlckluZm8sXG4gIGZyb206IEN1cnJlbnRSb3V0ZXJJbmZvLFxuICBuZXh0LFxuKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBSb3V0ZXJDaGFuZ2UgPSAocGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckluZm8ge1xuICBmdWxsUGF0aDogc3RyaW5nO1xuICBwYXRoOiBzdHJpbmc7XG4gIHF1ZXJ5OiBPYmplY3Q7XG4gIHN0YXRlOiBPYmplY3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VycmVudFJvdXRlckluZm8gZXh0ZW5kcyBSb3V0ZXJJbmZvIHtcbiAgbWF0Y2hlZDogQXJyYXk8aW50ZXJmYWNlcy5BcHBJbmZvPjtcbn1cblxuLy8gRG9uJ3QgY2hhbmdlIHRoZSBsb2dvLCBpbiBvcmRlciB0byBhdm9pZCBpbmNvbnNpc3RlbnQgdmVyc2lvbiBsZWFkcyB0byBmYWlsdXJlXG5leHBvcnQgY29uc3QgX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fID0gJ19fR0FSRklTSF9ST1VURVJfVVBEQVRFX0ZMQUdfXyc7XG5cbmV4cG9ydCBjb25zdCBfX0dBUkZJU0hfUk9VVEVSX0ZMQUdfXyA9ICdfX0dBUkZJU0hfUk9VVEVSX0ZMQUdfXyc7XG5cbmV4cG9ydCBjb25zdCBfX0dBUkZJU0hfQkVGT1JFX1JPVVRFUl9FVkVOVF9fID0gJ2dhcmZpc2g6YmVmb3JlLXJvdXRpbmctZXZlbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBiYXNlbmFtZT86IHN0cmluZztcbiAgbGlzdGVuaW5nPzogYm9vbGVhbjtcbiAgY3VycmVudD86IEN1cnJlbnRSb3V0ZXJJbmZvO1xuICBhdXRvUmVmcmVzaEFwcD86IGJvb2xlYW47XG4gIGFwcHM6IEFycmF5PGludGVyZmFjZXMuQXBwSW5mbz47XG4gIGJlZm9yZUVhY2g/OiBSb3V0ZXJIb29rO1xuICBhZnRlckVhY2g/OiBSb3V0ZXJIb29rO1xuICByb3V0ZXJDaGFuZ2U/OiAodXJsOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGFjdGl2ZTogKFxuICAgIGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgICByb290UGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICApID0+IFByb21pc2U8dm9pZD47XG4gIGRlYWN0aXZlOiAoXG4gICAgYXBwSW5mbzogaW50ZXJmYWNlcy5BcHBJbmZvLFxuICAgIHJvb3RQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgbm90TWF0Y2g/OiAocGF0aDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgUm91dGVyQ29uZmlnOiBPcHRpb25zID0ge1xuICBiYXNlbmFtZTogJy8nLFxuICBjdXJyZW50OiB7XG4gICAgZnVsbFBhdGg6ICcvJyxcbiAgICBwYXRoOiAnLycsXG4gICAgbWF0Y2hlZDogW10sXG4gICAgcXVlcnk6IHt9LFxuICAgIHN0YXRlOiB7fSxcbiAgfSxcbiAgYXBwczogW10sXG4gIGJlZm9yZUVhY2g6ICh0bywgZnJvbSwgbmV4dCkgPT4gbmV4dCgpLFxuICBhZnRlckVhY2g6ICh0bywgZnJvbSwgbmV4dCkgPT4gbmV4dCgpLFxuICBhY3RpdmU6ICgpID0+IFByb21pc2UucmVzb2x2ZSgpLFxuICBkZWFjdGl2ZTogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCksXG4gIHJvdXRlckNoYW5nZTogKCkgPT4ge30sXG4gIGF1dG9SZWZyZXNoQXBwOiB0cnVlLFxuICBsaXN0ZW5pbmc6IHRydWUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0PFQgZXh0ZW5kcyBrZXlvZiBPcHRpb25zPihmaWVsZDogVCwgdmFsdWU6IE9wdGlvbnNbVF0pIHtcbiAgUm91dGVyQ29uZmlnW2ZpZWxkXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGZpZWxkOiBrZXlvZiBPcHRpb25zKSB7XG4gIHJldHVybiBSb3V0ZXJDb25maWdbZmllbGRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Um91dGVyQ29uZmlnKG9wdGlvbnM6IFBhcnRpYWw8T3B0aW9ucz4pIHtcbiAgT2JqZWN0LmFzc2lnbihSb3V0ZXJDb25maWcsIG9wdGlvbnMpO1xufVxuIiwgImltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFF1ZXJ5KHF1ZXJ5OiB7IFtwcm9wczogc3RyaW5nXTogc3RyaW5nIH0gPSB7fSkge1xuICBjb25zdCBxcyA9IE9iamVjdC5rZXlzKHF1ZXJ5KVxuICAgIC5tYXAoKGtleSkgPT4gYCR7a2V5fT0ke3F1ZXJ5W2tleV19YClcbiAgICAuam9pbignJicpO1xuICByZXR1cm4gcXMgPyAnPycgKyBxcyA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VRdWVyeShxdWVyeSA9ICcnKSB7XG4gIGNvbnN0IHJlczogeyBbcHJvcHM6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgcXVlcnlcbiAgICAgIC5zbGljZSgxKVxuICAgICAgLnNwbGl0KCcmJylcbiAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcGFpcnMgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHJlc1twYWlyc1swXV0gPSBwYWlycztcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogXHU4OUUzXHU2NzkwXHU1MUZBXHU1QjUwXHU1RTk0XHU3NTI4XHU3Njg0XHU2ODM5XHU4REVGXHU3NTMxLFx1NTNENlx1NUY5N2FwcDFcbiAqIFx1ODlFM1x1Njc5MFx1NTE4NVx1NUJCOVx1RkYxQVxuICogICAgL2Jhc2VuYW1lL2FwcDEvYWJvdXRcdTMwMDFiYXNlbmFtZS9hcHAxXHUzMDAxYmFzZW5hbWUvYXBwMS9cdTMwMDEvYXBwMS9cdTMwMDEvYXBwMS9hYm91dFx1MzAwMWFwcDEvXG4gKiAgICAjL2FwcDFcdTMwMDEvIy9hcHAxL1x1MzAwMS8jL2FwcDEvZGV0YWlsL1x1MzAwMS8jL2FwcDEvZGV0YWlsXG4gKiBAcGFyYW0gcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGg6IHN0cmluZykge1xuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaChuZXcgUmVnRXhwKCdeLyhbXi9dKyknKSkgfHwgW107XG4gIHJldHVybiBgLyR7bWF0Y2hlc1sxXSB8fCAnJ31gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZChhcnI6IEFycmF5PEZ1bmN0aW9uPiwgZnVuYzogRnVuY3Rpb24pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnVuYyhhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gYXJyW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF0aChiYXNlbmFtZTogc3RyaW5nID0gJy8nLCBwYXRobmFtZT86IHN0cmluZykge1xuICBpZiAoYmFzZW5hbWUgPT09ICcvJyB8fCBiYXNlbmFtZSA9PT0gJycpIHtcbiAgICByZXR1cm4gcGF0aG5hbWUgfHwgbG9jYXRpb24ucGF0aG5hbWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChwYXRobmFtZSB8fCBsb2NhdGlvbi5wYXRobmFtZSkucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoYF4vPyR7YmFzZW5hbWV9YCksXG4gICAgICAnJyxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBSb290UGF0aChhcHBJbmZvOiBpbnRlcmZhY2VzLkFwcEluZm8pIHtcbiAgY29uc3QgcGF0aCA9IGdldFBhdGgoYXBwSW5mby5iYXNlbmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpO1xuICBsZXQgYXBwUm9vdFBhdGggPSBhcHBJbmZvLmJhc2VuYW1lID09PSAnLycgPyAnJyA6IChhcHBJbmZvLmJhc2VuYW1lIHx8ICcnKTtcbiAgaWYgKHR5cGVvZiBhcHBJbmZvLmFjdGl2ZVdoZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgYXBwUm9vdFBhdGggKz0gYXBwSW5mby5hY3RpdmVXaGVuO1xuICB9IGVsc2Uge1xuICAgIGFwcFJvb3RQYXRoICs9IHBhdGguc3BsaXQoJycpLnJlZHVjZSgocHJlLCBuZXh0KSA9PiB7XG4gICAgICAvLyBcdTUzMzlcdTkxNERcbiAgICAgIGlmICh0eXBlb2YgYXBwSW5mby5hY3RpdmVXaGVuID09PSAnZnVuY3Rpb24nICYmICFhcHBJbmZvLmFjdGl2ZVdoZW4ocHJlKSlcbiAgICAgICAgcmV0dXJuIHByZSArIG5leHQ7XG4gICAgICByZXR1cm4gcHJlO1xuICAgIH0sICcnKTtcbiAgfVxuICByZXR1cm4gYXBwUm9vdFBhdGg7XG59XG4iLCAiaW1wb3J0IHsgUm91dGVySG9vayB9IGZyb20gJy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhc3luY0ZvckVhY2g8VD4oXG4gIGFycjogVFtdLFxuICBjYWxsYmFjazogKHY6IFQsIGs6IG51bWJlciwgTzogVFtdKSA9PiBQcm9taXNlPGFueT4sXG4pIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgbGV0IGsgPSAwO1xuICB3aGlsZSAoayA8IGxlbmd0aCkge1xuICAgIGNvbnN0IGtWYWx1ZSA9IGFycltrXTtcbiAgICBhd2FpdCBjYWxsYmFjayhrVmFsdWUsIGssIGFycik7XG4gICAgaysrO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b01pZGRsZVdhcmUodG8sIGZyb20sIGNiOiBSb3V0ZXJIb29rKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNiKHRvLCBmcm9tLCByZXNvbHZlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFdmVudCh0eXBlKSB7XG4gIGxldCBlO1xuICAvLyBDb21wYXRpYmxlIHdpdGggaWVcbiAgaWYgKFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpICE9PSAtMSB8fFxuICAgIG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ1RyaWRlbnQvJykgPiAwXG4gICkge1xuICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnVUlFdmVudHMnKTtcbiAgICBlLmluaXRVSUV2ZW50KHR5cGUudG9Mb3dlckNhc2UoKSwgdHJ1ZSwgZmFsc2UsIHdpbmRvdywgMCk7XG4gIH0gZWxzZSB7XG4gICAgZSA9IG5ldyBFdmVudCh0eXBlLnRvTG93ZXJDYXNlKCkpO1xuICB9XG4gIHJldHVybiBlO1xufVxuIiwgIi8vIGNvcHkgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vd2VibW9kdWxlcy9jdXN0b20tZXZlbnRcblxuY29uc3QgTmF0aXZlQ3VzdG9tRXZlbnQgPVxuICB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IChnbG9iYWwgYXMgYW55KT8uQ3VzdG9tRXZlbnQgOiBudWxsO1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcCA9IG5ldyBOYXRpdmVDdXN0b21FdmVudCgnY2F0JywgeyBkZXRhaWw6IHsgZm9vOiAnYmFyJyB9IH0pO1xuICAgIHJldHVybiAnY2F0JyA9PT0gcC50eXBlICYmICdiYXInID09PSBwLmRldGFpbC5mb287XG4gIH0gY2F0Y2ggKGUpIHt9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubGV0IEN1c3RvbUV2ZW50OiBhbnk7XG5cbmlmIChOYXRpdmVDdXN0b21FdmVudCAmJiB1c2VOYXRpdmUoKSkge1xuICBDdXN0b21FdmVudCA9IE5hdGl2ZUN1c3RvbUV2ZW50O1xufSBlbHNlIGlmIChcbiAgJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBkb2N1bWVudCAmJlxuICAnZnVuY3Rpb24nID09PSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnRcbikge1xuICAvLyBJRSA+PSA5XG4gIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiBudWxsIH07XG4gICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChcbiAgICAgIHR5cGUsXG4gICAgICBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IGZhbHNlLFxuICAgICAgcGFyYW1zLmRldGFpbCB8fCBudWxsLFxuICAgICk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIElFIDw9IDhcbiAgQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgcGFyYW1zKSB7XG4gICAgY29uc3QgZSA9IChkb2N1bWVudCBhcyBhbnkpLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgZS50eXBlID0gdHlwZTtcbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICBlLmJ1YmJsZXMgPSBCb29sZWFuKHBhcmFtcy5idWJibGVzKTtcbiAgICAgIGUuY2FuY2VsYWJsZSA9IEJvb2xlYW4ocGFyYW1zLmNhbmNlbGFibGUpO1xuICAgICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgICAgZS5kZXRhaWwgPSB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiBlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21FdmVudDtcbiIsICJpbXBvcnQgeyB2YWxpZFVSTCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFJvdXRlckNvbmZpZywgX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fIH0gZnJvbSAnLi4vY29uZmlnJztcblxuZnVuY3Rpb24gY3JlYXRlUG9wU3RhdGVFdmVudChzdGF0ZTogYW55LCBvcmlnaW5hbE1ldGhvZE5hbWU6IHN0cmluZykge1xuICBsZXQgZXZ0O1xuICB0cnkge1xuICAgIGV2dCA9IG5ldyBQb3BTdGF0ZUV2ZW50KCdwb3BzdGF0ZScsIHsgc3RhdGUgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIElFIDExIGNvbXBhdGliaWxpdHlcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnUG9wU3RhdGVFdmVudCcpO1xuICAgIChldnQgYXMgYW55KS5pbml0UG9wU3RhdGVFdmVudCgncG9wc3RhdGUnLCBmYWxzZSwgZmFsc2UsIHN0YXRlKTtcbiAgfVxuICAoZXZ0IGFzIGFueSkuZ2FyZmlzaCA9IHRydWU7XG4gIChldnQgYXMgYW55KS5nYXJmaXNoVHJpZ2dlciA9IG9yaWdpbmFsTWV0aG9kTmFtZTtcbiAgcmV0dXJuIGV2dDtcbn1cblxuZXhwb3J0IGNvbnN0IGNhbGxDYXB0dXJlZEV2ZW50TGlzdGVuZXJzID0gKHR5cGU6IGtleW9mIEhpc3RvcnkpID0+IHtcbiAgY29uc3QgZXZlbnRBcmd1bWVudHMgPSBjcmVhdGVQb3BTdGF0ZUV2ZW50KHdpbmRvdy5oaXN0b3J5LnN0YXRlLCB0eXBlKTtcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnRBcmd1bWVudHMpO1xufTtcblxuY29uc3QgaGFuZGxlclBhcmFtcyA9IGZ1bmN0aW9uIChcbiAgcGF0aDogc3RyaW5nLFxuICBxdWVyeTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgYmFzZW5hbWU/OiBzdHJpbmcsXG4pOiBzdHJpbmcge1xuICBpZiAoIXBhdGggfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSByZXR1cm4gJyc7XG4gIGxldCB1cmwgPSBwYXRoO1xuICBpZiAodXJsWzBdICE9PSAnLycpIHVybCA9ICcvJyArIHVybDtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChxdWVyeSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgY29uc3QgcXMgPSBPYmplY3Qua2V5cyhxdWVyeSlcbiAgICAgIC5tYXAoKGtleSkgPT4gYCR7a2V5fT0ke3F1ZXJ5W2tleV19YClcbiAgICAgIC5qb2luKCcmJyk7XG4gICAgdXJsICs9IHFzID8gJz8nICsgcXMgOiAnJztcbiAgfVxuICBpZiAoYmFzZW5hbWUgIT09ICcvJykgdXJsID0gYmFzZW5hbWUgKyB1cmw7XG4gIGlmICh1cmxbMF0gIT09ICcvJykgdXJsID0gJy8nICsgdXJsO1xuICByZXR1cm4gdXJsO1xufTtcblxuZXhwb3J0IGNvbnN0IHB1c2ggPSAoe1xuICBwYXRoLFxuICBxdWVyeSxcbiAgYmFzZW5hbWUsXG59OiB7XG4gIHBhdGg6IHN0cmluZztcbiAgcXVlcnk/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuICBiYXNlbmFtZT86IHN0cmluZztcbn0pID0+IHtcbiAgaWYgKCFiYXNlbmFtZSkgYmFzZW5hbWUgPSBSb3V0ZXJDb25maWcuYmFzZW5hbWUgfHwgJy8nO1xuXG4gIGxldCB1cmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAodmFsaWRVUkwocGF0aCkpIHtcbiAgICB1cmwgPSAvKF5odHRwcz86KXwoXlxcL1xcLykvLnRlc3QocGF0aCkgPyBwYXRoIDogYC8vJHtwYXRofWA7XG4gIH0gZWxzZSB7XG4gICAgdXJsID0gaGFuZGxlclBhcmFtcyhwYXRoLCBxdWVyeSEsIGJhc2VuYW1lKTtcbiAgfVxuICAvLyBcdTRFMERcdTRGRERcdTc1NTlcdTRFNEJcdTUyNERoaXN0b3J5LnN0YXRlXHU3Njg0XHU3MkI2XHU2MDAxXHU0RjFBXHU1QkZDXHU4MUY0dnVlM1x1NEY5RFx1OEQ1NnN0YXRlXHU3Njg0XHU2MEM1XHU1MUI1XHU2NUUwXHU2Q0Q1XHU2QjYzXHU1RTM4XHU2RTMyXHU2N0QzXHU5ODc1XHU5NzYyXG4gIGhpc3RvcnkucHVzaFN0YXRlKFxuICAgIHsgW19fR0FSRklTSF9ST1VURVJfVVBEQVRFX0ZMQUdfX106IHRydWUsIC4uLmhpc3Rvcnkuc3RhdGUgfSxcbiAgICAnJyxcbiAgICB1cmwsXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVwbGFjZSA9ICh7XG4gIHBhdGgsXG4gIHF1ZXJ5LFxuICBiYXNlbmFtZSxcbn06IHtcbiAgcGF0aDogc3RyaW5nO1xuICBxdWVyeT86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIGJhc2VuYW1lPzogc3RyaW5nO1xufSkgPT4ge1xuICBpZiAoIWJhc2VuYW1lKSBiYXNlbmFtZSA9IFJvdXRlckNvbmZpZy5iYXNlbmFtZSB8fCAnLyc7XG5cbiAgbGV0IHVybDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGlmICh2YWxpZFVSTChwYXRoKSkge1xuICAgIHVybCA9IC9eKGh0dHBzPzopKFxcL1xcLykvLnRlc3QocGF0aCkgPyBwYXRoIDogYC8vJHtwYXRofWA7XG4gIH0gZWxzZSB7XG4gICAgdXJsID0gaGFuZGxlclBhcmFtcyhwYXRoLCBxdWVyeSEsIGJhc2VuYW1lKTtcbiAgfVxuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShcbiAgICB7IFtfX0dBUkZJU0hfUk9VVEVSX1VQREFURV9GTEFHX19dOiB0cnVlLCAuLi5oaXN0b3J5LnN0YXRlIH0sXG4gICAgJycsXG4gICAgdXJsLFxuICApO1xufTtcbiIsICJpbXBvcnQgeyBwYXJzZVF1ZXJ5LCBnZXRBcHBSb290UGF0aCwgZ2V0UGF0aCB9IGZyb20gJy4vdXRpbHMvdXJsVXQnO1xuaW1wb3J0IHsgY2FsbENhcHR1cmVkRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL3V0aWxzL25hdkV2ZW50JztcbmltcG9ydCB7IGFzeW5jRm9yRWFjaCwgdG9NaWRkbGVXYXJlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBSb3V0ZXJDb25maWcsXG4gIHNldFJvdXRlckNvbmZpZyxcbiAgUm91dGVySW5mbyxcbiAgX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fLFxuICBfX0dBUkZJU0hfUk9VVEVSX0ZMQUdfXyxcbiAgX19HQVJGSVNIX0JFRk9SRV9ST1VURVJfRVZFTlRfXyxcbn0gZnJvbSAnLi9jb25maWcnO1xuXG4vLyBJbnNwZWN0aW9uIGFwcGxpY2F0aW9uIGlzIGFjdGl2YXRlZFxuY29uc3QgaGFzQWN0aXZlID0gKGFjdGl2ZVdoZW46IGFueSwgcGF0aDogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgYWN0aXZlV2hlbiA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoYWN0aXZlV2hlblswXSAhPT0gJy8nKSBhY3RpdmVXaGVuID0gYC8ke2FjdGl2ZVdoZW59YDtcbiAgICAvLyBTZXQgdG8gdGhlIHJvb3QgcGF0aCBtdXN0IGJlIGNvbmdydWVudFxuICAgIGlmIChhY3RpdmVXaGVuID09PSAnLycgJiYgcGF0aCA9PT0gYWN0aXZlV2hlbikgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBhY3RpdmVXaGVuQXJyID0gYWN0aXZlV2hlbi5zcGxpdCgnLycpO1xuICAgIGNvbnN0IHBhdGhBcnIgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgbGV0IGZsYWc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGFjdGl2ZVdoZW5BcnIuZm9yRWFjaCgocGF0aEl0ZW06IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHBhdGhJdGVtICYmIHBhdGhJdGVtICE9PSBwYXRoQXJyW2luZGV4XSkge1xuICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFjdGl2ZVdoZW4ocGF0aCk7XG4gIH1cbn07XG5cbi8vIE92ZXJsb2FkaW5nIHRvIHNwZWNpZnkgdGhlIHJvdXRpbmdcbi8vIDEuIEFwcGxpY2F0aW9ucyBmb3IgY3VycmVudCBuZWVkcyB0byBiZSBkZXN0cm95ZWRcbi8vIDIuIEdldHMgdGhlIGN1cnJlbnQgbmVlZCB0byBhY3RpdmF0ZSB0aGUgYXBwbGljYXRpb25cbi8vIDMuIFRvIGFjcXVpcmUgbmV3IG5lZWQgdG8gYWN0aXZhdGUgdGhlIGFwcGxpY2F0aW9uXG4vLyA0LiBUcmlnZ2VyIGZ1bmN0aW9uIGJlZm9yZUVhY2gsIHRyaWdnZXIgaW4gZnJvbnQgb2YgdGhlIGRlc3Ryb3llZCBhbGwgYXBwbGljYXRpb25zXG4vLyA1LiBUcmlnZ2VyIHRoZSBuZWVkIHRvIGRlc3Ryb3kgZGVhY3RpdmUgZnVuY3Rpb24gb2YgYXBwbGljYXRpb25cbi8vIDYuIElmIHRoZXJlIGlzIG5vIG5lZWQgdG8gYWN0aXZhdGUgdGhlIGFwcGxpY2F0aW9uLCBieSBkZWZhdWx0LCB0cmlnZ2VyaW5nIHBvcHN0YXRlIGFwcGxpY2F0aW9uIGNvbXBvbmVudCB2aWV3IGNoaWxkIHRvIHVwZGF0ZVxuZXhwb3J0IGNvbnN0IGxpbmtUbyA9IGFzeW5jICh7XG4gIHRvUm91dGVySW5mbyxcbiAgZnJvbVJvdXRlckluZm8sXG4gIGV2ZW50VHlwZSxcbn06IHtcbiAgdG9Sb3V0ZXJJbmZvOiBSb3V0ZXJJbmZvO1xuICBmcm9tUm91dGVySW5mbzogUm91dGVySW5mbztcbiAgZXZlbnRUeXBlOiBrZXlvZiBIaXN0b3J5IHwgJ3BvcHN0YXRlJztcbn0pID0+IHtcbiAgY29uc3Qge1xuICAgIGN1cnJlbnQsXG4gICAgYXBwcyxcbiAgICBkZWFjdGl2ZSxcbiAgICBhY3RpdmUsXG4gICAgbm90TWF0Y2gsXG4gICAgYmVmb3JlRWFjaCxcbiAgICBhZnRlckVhY2gsXG4gICAgYXV0b1JlZnJlc2hBcHAsXG4gIH0gPSBSb3V0ZXJDb25maWc7XG5cbiAgY29uc3QgZGVhY3RpdmVBcHBzID0gY3VycmVudCEubWF0Y2hlZC5maWx0ZXIoXG4gICAgKGFwcEluZm8pID0+XG4gICAgICAhaGFzQWN0aXZlKFxuICAgICAgICBhcHBJbmZvLmFjdGl2ZVdoZW4sXG4gICAgICAgIGdldFBhdGgoYXBwSW5mby5iYXNlbmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpLFxuICAgICAgKSxcbiAgKTtcblxuICAvLyBBY3RpdmF0ZSB0aGUgY29ycmVzcG9uZGluZyBhcHBsaWNhdGlvblxuICBjb25zdCBhY3RpdmVBcHBzID0gYXBwcy5maWx0ZXIoKGFwcEluZm8pID0+IHtcbiAgICByZXR1cm4gaGFzQWN0aXZlKFxuICAgICAgYXBwSW5mby5hY3RpdmVXaGVuLFxuICAgICAgZ2V0UGF0aChhcHBJbmZvLmJhc2VuYW1lLCBsb2NhdGlvbi5wYXRobmFtZSksXG4gICAgKTtcbiAgfSk7XG5cbiAgY29uc3QgbmVlZFRvQWN0aXZlID0gYWN0aXZlQXBwcy5maWx0ZXIoKHsgbmFtZSB9KSA9PiB7XG4gICAgcmV0dXJuICFjdXJyZW50IS5tYXRjaGVkLnNvbWUoKHsgbmFtZTogY05hbWUgfSkgPT4gbmFtZSA9PT0gY05hbWUpO1xuICB9KTtcblxuICAvLyByb3V0ZXIgaW5mb3NcbiAgY29uc3QgdG8gPSB7XG4gICAgLi4udG9Sb3V0ZXJJbmZvLFxuICAgIG1hdGNoZWQ6IG5lZWRUb0FjdGl2ZSxcbiAgfTtcblxuICBjb25zdCBmcm9tID0ge1xuICAgIC4uLmZyb21Sb3V0ZXJJbmZvLFxuICAgIG1hdGNoZWQ6IGRlYWN0aXZlQXBwcyxcbiAgfTtcblxuICBhd2FpdCB0b01pZGRsZVdhcmUodG8sIGZyb20sIGJlZm9yZUVhY2ghKTtcblxuICAvLyBQYXVzZSB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBvZiBhY3RpdmUgc3RhdGVcbiAgaWYgKGN1cnJlbnQhLm1hdGNoZWQubGVuZ3RoID4gMCkge1xuICAgIGF3YWl0IGFzeW5jRm9yRWFjaChcbiAgICAgIGRlYWN0aXZlQXBwcyxcbiAgICAgIGFzeW5jIChhcHBJbmZvKSA9PlxuICAgICAgICBhd2FpdCBkZWFjdGl2ZShhcHBJbmZvLCBnZXRQYXRoKGFwcEluZm8uYmFzZW5hbWUsIGxvY2F0aW9uLnBhdGhuYW1lKSksXG4gICAgKTtcbiAgfVxuXG4gIHNldFJvdXRlckNvbmZpZyh7XG4gICAgY3VycmVudDoge1xuICAgICAgcGF0aDogZ2V0UGF0aChSb3V0ZXJDb25maWcuYmFzZW5hbWUhKSxcbiAgICAgIGZ1bGxQYXRoOiBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgIG1hdGNoZWQ6IGFjdGl2ZUFwcHMsXG4gICAgICBzdGF0ZTogaGlzdG9yeS5zdGF0ZSxcbiAgICAgIHF1ZXJ5OiBwYXJzZVF1ZXJ5KGxvY2F0aW9uLnNlYXJjaCksXG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gV2l0aGluIHRoZSBhcHBsaWNhdGlvbiByb3V0aW5nIGp1bXAsIGJ5IGNvbGxlY3RpbmcgdGhlIHJvdXRpbmcgZnVuY3Rpb24gZm9yIHByb2Nlc3NpbmcuXG4gIC8vIEZpbHRlcmluZyBnYXItcm91dGVyIHBvcHN0YXRlIGhpamFja2luZyBvZiB0aGUgcm91dGVyXG4gIC8vIEluIHRoZSBzd2l0Y2ggYmFjayBhbmQgZm9ydGggaW4gdGhlIGFwcGxpY2F0aW9uIGlzIHByb3ZpZGVkIHRocm91Z2ggcm91dGluZyBwdXNoIG1ldGhvZCB3b3VsZCB0cmlnZ2VyIGFwcGxpY2F0aW9uIHVwZGF0ZXNcbiAgLy8gYXBwbGljYXRpb24gd2lsbCByZWZyZXNoIHdoZW4gYXV0b1JlZnJlc2ggY29uZmlndXJhdGlvbiB0byB0cnVlXG4gIGNvbnN0IGN1clN0YXRlID0gd2luZG93Lmhpc3Rvcnkuc3RhdGUgfHwge307XG4gIGlmIChcbiAgICBldmVudFR5cGUgIT09ICdwb3BzdGF0ZScgJiZcbiAgICAoY3VyU3RhdGVbX19HQVJGSVNIX1JPVVRFUl9VUERBVEVfRkxBR19fXSB8fCBhdXRvUmVmcmVzaEFwcClcbiAgKSB7XG4gICAgY2FsbENhcHR1cmVkRXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlKTtcbiAgfVxuXG4gIGF3YWl0IGFzeW5jRm9yRWFjaChuZWVkVG9BY3RpdmUsIGFzeW5jIChhcHBJbmZvKSA9PiB7XG4gICAgLy8gRnVuY3Rpb24gdXNpbmcgbWF0Y2hlcyBjaGFyYWN0ZXIgYW5kIHJvdXRpbmcgdXNpbmcgc3RyaW5nIG1hdGNoaW5nIGNoYXJhY3RlcnNcbiAgICBjb25zdCBhcHBSb290UGF0aCA9IGdldEFwcFJvb3RQYXRoKGFwcEluZm8pO1xuICAgIGF3YWl0IGFjdGl2ZShhcHBJbmZvLCBhcHBSb290UGF0aCk7XG4gIH0pO1xuXG4gIGlmIChhY3RpdmVBcHBzLmxlbmd0aCA9PT0gMCAmJiBub3RNYXRjaCkgbm90TWF0Y2gobG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gIGF3YWl0IHRvTWlkZGxlV2FyZSh0bywgZnJvbSwgYWZ0ZXJFYWNoISk7XG59O1xuIiwgImltcG9ydCB7IGdldFBhdGgsIHBhcnNlUXVlcnkgfSBmcm9tICcuL3V0aWxzL3VybFV0JztcbmltcG9ydCB7IGNyZWF0ZUV2ZW50IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBSb3V0ZXJDb25maWcsXG4gIF9fR0FSRklTSF9ST1VURVJfVVBEQVRFX0ZMQUdfXyxcbiAgX19HQVJGSVNIX1JPVVRFUl9GTEFHX18sXG4gIF9fR0FSRklTSF9CRUZPUkVfUk9VVEVSX0VWRU5UX18sXG59IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBDdXN0b21FdmVudCBmcm9tICcuL3V0aWxzL2N1c3RvbUV2ZW50JztcbmltcG9ydCB7IGxpbmtUbyB9IGZyb20gJy4vbGlua1RvJztcblxuZXhwb3J0IGNvbnN0IG5vcm1hbEFnZW50ID0gKCkgPT4ge1xuICAvLyBCeSBpZGVudGlmeWluZyB3aGV0aGVyIGhhdmUgZmluaXNoZWQgbGlzdGVuaW5nLCBpZiBmaW5pc2hlZCBsaXN0ZW5pbmcsIGxpc3RlbmluZyB0byB0aGUgcm91dGluZyBjaGFuZ2VzIGRvIG5vdCBuZWVkIHRvIGhpamFjayB0aGUgb3JpZ2luYWwgZXZlbnRcbiAgLy8gU3VwcG9ydCBuZXN0ZWQgc2NlbmVcbiAgY29uc3QgYWRkUm91dGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoX19HQVJGSVNIX0JFRk9SRV9ST1VURVJfRVZFTlRfXywgZnVuY3Rpb24gKGVudikge1xuICAgICAgUm91dGVyQ29uZmlnLnJvdXRlckNoYW5nZSAmJiBSb3V0ZXJDb25maWcucm91dGVyQ2hhbmdlKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgIGxpbmtUbygoZW52IGFzIGFueSkuZGV0YWlsKTtcbiAgICB9KTtcbiAgfTtcblxuICBpZiAoIXdpbmRvd1tfX0dBUkZJU0hfUk9VVEVSX0ZMQUdfX10pIHtcbiAgICAvLyBMaXN0ZW4gZm9yIHB1c2hTdGF0ZSBhbmQgcmVwbGFjZVN0YXRlLCBjYWxsIGxpbmtUbywgcHJvY2Vzc2luZywgbGlzdGVuIGJhY2tcbiAgICAvLyBSZXdyaXRlIHRoZSBoaXN0b3J5IEFQSSBtZXRob2QsIHRyaWdnZXJpbmcgZXZlbnRzIGluIHRoZSBjYWxsXG5cbiAgICBjb25zdCByZXdyaXRlID0gZnVuY3Rpb24gKHR5cGU6IGtleW9mIEhpc3RvcnkpIHtcbiAgICAgIGNvbnN0IGhhcGkgPSBoaXN0b3J5W3R5cGVdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzOiBIaXN0b3J5KSB7XG4gICAgICAgIGNvbnN0IHVybEJlZm9yZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICBjb25zdCBzdGF0ZUJlZm9yZSA9IGhpc3Rvcnk/LnN0YXRlO1xuICAgICAgICBjb25zdCByZXMgPSBoYXBpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnN0IHVybEFmdGVyID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIGNvbnN0IHN0YXRlQWZ0ZXIgPSBoaXN0b3J5Py5zdGF0ZTtcblxuICAgICAgICBjb25zdCBlID0gY3JlYXRlRXZlbnQodHlwZSk7XG4gICAgICAgIChlIGFzIGFueSkuYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICB1cmxCZWZvcmUgIT09IHVybEFmdGVyIHx8XG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoc3RhdGVCZWZvcmUpICE9PSBKU09OLnN0cmluZ2lmeShzdGF0ZUFmdGVyKVxuICAgICAgICApIHtcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChfX0dBUkZJU0hfQkVGT1JFX1JPVVRFUl9FVkVOVF9fLCB7XG4gICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIHRvUm91dGVySW5mbzoge1xuICAgICAgICAgICAgICAgICAgZnVsbFBhdGg6IHVybEFmdGVyLFxuICAgICAgICAgICAgICAgICAgcXVlcnk6IHBhcnNlUXVlcnkobG9jYXRpb24uc2VhcmNoKSxcbiAgICAgICAgICAgICAgICAgIHBhdGg6IGdldFBhdGgoUm91dGVyQ29uZmlnLmJhc2VuYW1lISwgdXJsQWZ0ZXIpLFxuICAgICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlQWZ0ZXIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmcm9tUm91dGVySW5mbzoge1xuICAgICAgICAgICAgICAgICAgZnVsbFBhdGg6IHVybEJlZm9yZSxcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBwYXJzZVF1ZXJ5KGxvY2F0aW9uLnNlYXJjaCksXG4gICAgICAgICAgICAgICAgICBwYXRoOiBnZXRQYXRoKFJvdXRlckNvbmZpZy5iYXNlbmFtZSEsIHVybEJlZm9yZSksXG4gICAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGVCZWZvcmUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBldmVudFR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgaGlzdG9yeS5wdXNoU3RhdGUgPSByZXdyaXRlKCdwdXNoU3RhdGUnKTtcbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSA9IHJld3JpdGUoJ3JlcGxhY2VTdGF0ZScpO1xuXG4gICAgLy8gQmVmb3JlIHRoZSBjb2xsZWN0aW9uIGFwcGxpY2F0aW9uIHN1YiByb3V0aW5nLCBmb3J3YXJkIGJhY2t3YXJkIHJvdXRpbmcgdXBkYXRlcyBiZXR3ZWVuIGNoaWxkIGFwcGxpY2F0aW9uXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncG9wc3RhdGUnLFxuICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIFN0b3AgdHJpZ2dlciBjb2xsZWN0aW9uIGZ1bmN0aW9uLCBmaXJlIGFnYWluIG1hdGNoIHJlbmRlcmluZ1xuICAgICAgICBpZiAoZXZlbnQgJiYgdHlwZW9mIGV2ZW50ID09PSAnb2JqZWN0JyAmJiAoZXZlbnQgYXMgYW55KS5nYXJmaXNoKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGhpc3Rvcnkuc3RhdGUgJiYgdHlwZW9mIGhpc3Rvcnkuc3RhdGUgPT09ICdvYmplY3QnKVxuICAgICAgICAgIGRlbGV0ZSBoaXN0b3J5LnN0YXRlW19fR0FSRklTSF9ST1VURVJfVVBEQVRFX0ZMQUdfX107XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudChfX0dBUkZJU0hfQkVGT1JFX1JPVVRFUl9FVkVOVF9fLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgdG9Sb3V0ZXJJbmZvOiB7XG4gICAgICAgICAgICAgICAgZnVsbFBhdGg6IGxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBwYXJzZVF1ZXJ5KGxvY2F0aW9uLnNlYXJjaCksXG4gICAgICAgICAgICAgICAgcGF0aDogZ2V0UGF0aChSb3V0ZXJDb25maWcuYmFzZW5hbWUhKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZnJvbVJvdXRlckluZm86IHtcbiAgICAgICAgICAgICAgICBmdWxsUGF0aDogUm91dGVyQ29uZmlnLmN1cnJlbnQhLmZ1bGxQYXRoLFxuICAgICAgICAgICAgICAgIHBhdGg6IGdldFBhdGgoXG4gICAgICAgICAgICAgICAgICBSb3V0ZXJDb25maWcuYmFzZW5hbWUhLFxuICAgICAgICAgICAgICAgICAgUm91dGVyQ29uZmlnLmN1cnJlbnQhLnBhdGgsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBxdWVyeTogUm91dGVyQ29uZmlnLmN1cnJlbnQhLnF1ZXJ5LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBldmVudFR5cGU6ICdwb3BzdGF0ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGZhbHNlLFxuICAgICk7XG5cbiAgICB3aW5kb3dbX19HQVJGSVNIX1JPVVRFUl9GTEFHX19dID0gdHJ1ZTtcbiAgfVxuICBhZGRSb3V0ZXJMaXN0ZW5lcigpO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRSZWRpcmVjdCA9ICgpID0+IHtcbiAgbGlua1RvKHtcbiAgICB0b1JvdXRlckluZm86IHtcbiAgICAgIGZ1bGxQYXRoOiBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgIHBhdGg6IGdldFBhdGgoUm91dGVyQ29uZmlnLmJhc2VuYW1lISksXG4gICAgICBxdWVyeTogcGFyc2VRdWVyeShsb2NhdGlvbi5zZWFyY2gpLFxuICAgICAgc3RhdGU6IGhpc3Rvcnkuc3RhdGUsXG4gICAgfSxcbiAgICBmcm9tUm91dGVySW5mbzoge1xuICAgICAgZnVsbFBhdGg6ICcvJyxcbiAgICAgIHBhdGg6ICcvJyxcbiAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgIHN0YXRlOiB7fSxcbiAgICB9LFxuICAgIGV2ZW50VHlwZTogJ3B1c2hTdGF0ZScsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGxpc3RlbiA9ICgpID0+IHtcbiAgbm9ybWFsQWdlbnQoKTtcbiAgaW5pdFJlZGlyZWN0KCk7XG59O1xuIiwgImltcG9ydCB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB7IGxpc3RlbiB9IGZyb20gJy4vYWdlbnRSb3V0ZXInO1xuaW1wb3J0IHtcbiAgc2V0Um91dGVyQ29uZmlnLFxuICBSb3V0ZXJDb25maWcsXG4gIHNldCBhcyBSb3V0ZXJTZXQsXG4gIE9wdGlvbnMsXG4gIFJvdXRlckhvb2ssXG4gIFJvdXRlckNoYW5nZSxcbn0gZnJvbSAnLi9jb25maWcnO1xuXG5pbXBvcnQgeyBwdXNoLCByZXBsYWNlIH0gZnJvbSAnLi91dGlscy9uYXZFdmVudCc7XG5cbmV4cG9ydCB7IHB1c2gsIHJlcGxhY2UgfSBmcm9tICcuL3V0aWxzL25hdkV2ZW50JztcblxuZXhwb3J0IGNvbnN0IGJlZm9yZUVhY2ggPSAoaG9vazogUm91dGVySG9vaykgPT4ge1xuICBSb3V0ZXJTZXQoJ2JlZm9yZUVhY2gnLCBob29rKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZnRlckVhY2ggPSAoaG9vazogUm91dGVySG9vaykgPT4ge1xuICBSb3V0ZXJTZXQoJ2FmdGVyRWFjaCcsIGhvb2spO1xufTtcblxuZXhwb3J0IGNvbnN0IHJvdXRlckNoYW5nZSA9IChob29rOiBSb3V0ZXJDaGFuZ2UpID0+IHtcbiAgUm91dGVyU2V0KCdyb3V0ZXJDaGFuZ2UnLCBob29rKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlclJvdXRlciA9IChBcHBzOiBBcnJheTxpbnRlcmZhY2VzLkFwcEluZm8+KSA9PiB7XG4gIGNvbnN0IHVucmVnaXN0ZXJBcHBzID0gQXBwcy5maWx0ZXIoXG4gICAgKGFwcCkgPT4gIVJvdXRlckNvbmZpZy5hcHBzLnNvbWUoKGl0ZW0pID0+IGFwcC5uYW1lID09PSBpdGVtLm5hbWUpLFxuICApO1xuICBSb3V0ZXJTZXQoJ2FwcHMnLCBSb3V0ZXJDb25maWcuYXBwcy5jb25jYXQodW5yZWdpc3RlckFwcHMpKTtcbn07XG5cbi8qKlxuICogMS5cdTZDRThcdTUxOENcdTVCNTBcdTVFOTRcdTc1MjhcbiAqIDIuXHU1QkY5XHU1RTk0XHU1QjUwXHU1RTk0XHU3NTI4XHU2RkMwXHU2RDNCXHVGRjBDXHU4OUU2XHU1M0QxXHU2RkMwXHU2RDNCXHU1NkRFXHU4QzAzXG4gKiBAcGFyYW0gT3B0aW9uc1xuICovXG5leHBvcnQgY29uc3QgbGlzdGVuUm91dGVyQW5kUmVEaXJlY3QgPSAoe1xuICBhcHBzLFxuICBiYXNlbmFtZSA9ICcvJyxcbiAgYXV0b1JlZnJlc2hBcHAsXG4gIGFjdGl2ZSxcbiAgZGVhY3RpdmUsXG4gIG5vdE1hdGNoLFxuICBsaXN0ZW5pbmcgPSB0cnVlLFxufTogT3B0aW9ucykgPT4ge1xuICAvLyBcdTZDRThcdTUxOENcdTVCNTBcdTVFOTRcdTc1MjhcdTMwMDFcdTZDRThcdTUxOENcdTZGQzBcdTZEM0JcdTMwMDFcdTk1MDBcdTZCQzFcdTk0QTlcdTVCNTBcbiAgcmVnaXN0ZXJSb3V0ZXIoYXBwcyk7XG5cbiAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU0RkUxXHU2MDZGXG4gIHNldFJvdXRlckNvbmZpZyh7XG4gICAgYmFzZW5hbWUsXG4gICAgYXV0b1JlZnJlc2hBcHAsXG4gICAgLy8gc3VwcG9ydFByb3h5OiAhIXdpbmRvdy5Qcm94eSxcbiAgICBhY3RpdmUsXG4gICAgZGVhY3RpdmUsXG4gICAgbm90TWF0Y2gsXG4gICAgbGlzdGVuaW5nLFxuICB9KTtcblxuICAvLyBcdTVGMDBcdTU5Q0JcdTc2RDFcdTU0MkNcdThERUZcdTc1MzFcdTUzRDhcdTUzMTZcdTg5RTZcdTUzRDFcdTMwMDFcdTVCNTBcdTVFOTRcdTc1MjhcdTY2RjRcdTY1QjBcdTMwMDJcdTkxQ0RcdThGN0RcdTlFRDhcdThCQTRcdTUyMURcdTU5Q0JcdTVCNTBcdTVFOTRcdTc1MjhcbiAgbGlzdGVuKCk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckludGVyZmFjZSB7XG4gIHB1c2g6ICh7XG4gICAgcGF0aCxcbiAgICBxdWVyeSxcbiAgICBiYXNlbmFtZSxcbiAgfToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBiYXNlbmFtZT86IHN0cmluZztcbiAgICBxdWVyeT86IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICB9KSA9PiB2b2lkO1xuICByZXBsYWNlOiAoe1xuICAgIHBhdGgsXG4gICAgcXVlcnksXG4gICAgYmFzZW5hbWUsXG4gIH06IHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgYmFzZW5hbWU/OiBzdHJpbmc7XG4gICAgcXVlcnk/OiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgfSkgPT4gdm9pZDtcbiAgYmVmb3JlRWFjaDogKGhvb2s6IFJvdXRlckhvb2spID0+IHZvaWQ7XG4gIGFmdGVyRWFjaDogKGhvb2s6IFJvdXRlckhvb2spID0+IHZvaWQ7XG4gIHJlZ2lzdGVyUm91dGVyOiAoXG4gICAgQXBwczogaW50ZXJmYWNlcy5BcHBJbmZvIHwgQXJyYXk8aW50ZXJmYWNlcy5BcHBJbmZvPixcbiAgKSA9PiB2b2lkO1xuICByb3V0ZXJDaGFuZ2U6IChob29rOiBSb3V0ZXJDaGFuZ2UpID0+IHZvaWQ7XG4gIHNldFJvdXRlckNvbmZpZzogdHlwZW9mIHNldFJvdXRlckNvbmZpZztcbiAgbGlzdGVuUm91dGVyQW5kUmVEaXJlY3Q6ICh7XG4gICAgYXBwcyxcbiAgICBiYXNlbmFtZSxcbiAgICBhdXRvUmVmcmVzaEFwcCxcbiAgICBhY3RpdmUsXG4gICAgZGVhY3RpdmUsXG4gICAgbm90TWF0Y2gsXG4gIH06IE9wdGlvbnMpID0+IHZvaWQ7XG4gIHJvdXRlckNvbmZpZzogT3B0aW9ucztcbn1cblxuY29uc3QgUm91dGVyOiBSb3V0ZXJJbnRlcmZhY2UgPSB7XG4gIHB1c2gsXG4gIHJlcGxhY2UsXG4gIGJlZm9yZUVhY2gsXG4gIGFmdGVyRWFjaCxcbiAgcmVnaXN0ZXJSb3V0ZXIsXG4gIHJvdXRlckNoYW5nZSxcbiAgbGlzdGVuUm91dGVyQW5kUmVEaXJlY3QsXG4gIHNldFJvdXRlckNvbmZpZyxcbiAgcm91dGVyQ29uZmlnOiBSb3V0ZXJDb25maWcsXG59O1xuXG5leHBvcnQgeyBpbml0UmVkaXJlY3QgfSBmcm9tICcuL2FnZW50Um91dGVyJztcblxuLy9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbiIsICJpbXBvcnQgdHlwZSB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB7IGNyZWF0ZUtleSwgcm91dGVyTG9nIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgUm91dGVyQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHJvdXRlciwge1xuICBpbml0UmVkaXJlY3QsXG4gIFJvdXRlckludGVyZmFjZSxcbiAgbGlzdGVuUm91dGVyQW5kUmVEaXJlY3QsXG59IGZyb20gJy4vY29udGV4dCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAZ2FyZmlzaC9jb3JlJyB7XG4gIGV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBHYXJmaXNoIHtcbiAgICByb3V0ZXI6IFJvdXRlckludGVyZmFjZTtcbiAgICBhcHBzOiBSZWNvcmQ8c3RyaW5nLCBpbnRlcmZhY2VzLkFwcD47XG4gIH1cblxuICBleHBvcnQgbmFtZXNwYWNlIGludGVyZmFjZXMge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcbiAgICAgIGF1dG9SZWZyZXNoQXBwPzogYm9vbGVhbjtcbiAgICAgIG9uTm90TWF0Y2hSb3V0ZXI/OiAocGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEFwcEluZm8ge1xuICAgICAgYWN0aXZlV2hlbj86IHN0cmluZyB8ICgocGF0aDogc3RyaW5nKSA9PiBib29sZWFuKTsgLy8gXHU2MjRCXHU1MkE4XHU1MkEwXHU4RjdEXHVGRjBDXHU1M0VGXHU0RTBEXHU1ODZCXHU1MTk5XHU4REVGXHU3NTMxXG4gICAgICBhY3RpdmU/OiAoYXBwSW5mbzogQXBwSW5mbywgcm9vdFBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgICAgIGRlYWN0aXZlPzogKGFwcEluZm86IEFwcEluZm8sIHJvb3RQYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgICByb290UGF0aD86IHN0cmluZztcbiAgICAgIGJhc2VuYW1lPzogc3RyaW5nO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdHlwZSB7IFJvdXRlckludGVyZmFjZSB9IGZyb20gJy4vY29udGV4dCc7XG5cbmludGVyZmFjZSBPcHRpb25zIHtcbiAgYXV0b1JlZnJlc2hBcHA/OiBib29sZWFuO1xuICBvbk5vdE1hdGNoUm91dGVyPzogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHYXJmaXNoUm91dGVyKF9hcmdzPzogT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKEdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCk6IGludGVyZmFjZXMuUGx1Z2luIHtcbiAgICBHYXJmaXNoLmFwcHMgPSB7fTtcbiAgICBHYXJmaXNoLnJvdXRlciA9IHJvdXRlcjtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncm91dGVyJyxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuXG4gICAgICBib290c3RyYXAob3B0aW9uczogaW50ZXJmYWNlcy5PcHRpb25zKSB7XG4gICAgICAgIGxldCBhY3RpdmVBcHA6IG51bGwgfCBzdHJpbmcgPSBudWxsO1xuICAgICAgICBjb25zdCB1bm1vdW50czogUmVjb3JkPHN0cmluZywgRnVuY3Rpb24+ID0ge307XG4gICAgICAgIGNvbnN0IHsgYmFzZW5hbWUgfSA9IG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHsgYXV0b1JlZnJlc2hBcHAgPSB0cnVlLCBvbk5vdE1hdGNoUm91dGVyID0gKCkgPT4gbnVsbCB9ID1cbiAgICAgICAgICBHYXJmaXNoLm9wdGlvbnM7XG5cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gYWN0aXZlKFxuICAgICAgICAgIGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgICAgICAgICByb290UGF0aDogc3RyaW5nID0gJy8nLFxuICAgICAgICApIHtcbiAgICAgICAgICByb3V0ZXJMb2coYCR7YXBwSW5mby5uYW1lfSBhY3RpdmVgLCB7XG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgcm9vdFBhdGgsXG4gICAgICAgICAgICBsaXN0ZW5pbmc6IFJvdXRlckNvbmZpZy5saXN0ZW5pbmcsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBJbiB0aGUgbGlzdGVuaW5nIHN0YXRlLCB0cmlnZ2VyIHRoZSByZW5kZXJpbmcgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgICAgICAgaWYgKCFSb3V0ZXJDb25maWcubGlzdGVuaW5nKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCB7IG5hbWUsIGFjdGl2ZSwgY2FjaGUgPSB0cnVlIH0gPSBhcHBJbmZvO1xuICAgICAgICAgIGlmIChhY3RpdmUpIHJldHVybiBhY3RpdmUoYXBwSW5mbywgcm9vdFBhdGgpO1xuICAgICAgICAgIGFwcEluZm8ucm9vdFBhdGggPSByb290UGF0aDtcblxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRBcHAgPSAoYWN0aXZlQXBwID0gY3JlYXRlS2V5KCkpO1xuICAgICAgICAgIGNvbnN0IGFwcCA9IGF3YWl0IEdhcmZpc2gubG9hZEFwcChhcHBJbmZvLm5hbWUsIHtcbiAgICAgICAgICAgIGNhY2hlLFxuICAgICAgICAgICAgYmFzZW5hbWU6IHJvb3RQYXRoLFxuICAgICAgICAgICAgZW50cnk6IGFwcEluZm8uZW50cnksXG4gICAgICAgICAgICBkb21HZXR0ZXI6IGFwcEluZm8uZG9tR2V0dGVyLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGFwcCkge1xuICAgICAgICAgICAgYXBwLmFwcEluZm8uYmFzZW5hbWUgPSByb290UGF0aDtcblxuICAgICAgICAgICAgY29uc3QgY2FsbCA9IGFzeW5jIChhcHA6IGludGVyZmFjZXMuQXBwLCBpc1JlbmRlcjogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWFwcCkgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCBpc0RlcyA9IGNhY2hlICYmIGFwcC5tb3VudGVkO1xuICAgICAgICAgICAgICBpZiAoaXNSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYXBwW2lzRGVzID8gJ3Nob3cnIDogJ21vdW50J10oKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwW2lzRGVzID8gJ2hpZGUnIDogJ3VubW91bnQnXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBHYXJmaXNoLmFwcHNbbmFtZV0gPSBhcHA7XG4gICAgICAgICAgICB1bm1vdW50c1tuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgYXBwbGljYXRpb24gZHVyaW5nIHJlbmRlcmluZyBhbmQgZGlzY2FyZCB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2VcbiAgICAgICAgICAgICAgaWYgKGFwcC5tb3VudGluZykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBHYXJmaXNoLmNhY2hlQXBwc1tuYW1lXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYWxsKGFwcCwgZmFsc2UpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBcHAgPT09IGFjdGl2ZUFwcCkge1xuICAgICAgICAgICAgICBhd2FpdCBjYWxsKGFwcCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZGVhY3RpdmUoYXBwSW5mbzogaW50ZXJmYWNlcy5BcHBJbmZvLCByb290UGF0aDogc3RyaW5nKSB7XG4gICAgICAgICAgcm91dGVyTG9nKGAke2FwcEluZm8ubmFtZX0gZGVhY3RpdmVgLCB7XG4gICAgICAgICAgICBhcHBJbmZvLFxuICAgICAgICAgICAgcm9vdFBhdGgsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhY3RpdmVBcHAgPSBudWxsO1xuICAgICAgICAgIGNvbnN0IHsgbmFtZSwgZGVhY3RpdmUgfSA9IGFwcEluZm87XG4gICAgICAgICAgaWYgKGRlYWN0aXZlKSByZXR1cm4gZGVhY3RpdmUoYXBwSW5mbywgcm9vdFBhdGgpO1xuXG4gICAgICAgICAgY29uc3QgdW5tb3VudCA9IHVubW91bnRzW25hbWVdO1xuICAgICAgICAgIHVubW91bnQgJiYgdW5tb3VudCgpO1xuICAgICAgICAgIGRlbGV0ZSBHYXJmaXNoLmFwcHNbbmFtZV07XG5cbiAgICAgICAgICAvLyBOZXN0ZWQgc2NlbmUgdG8gcmVtb3ZlIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIG9mIG5lc3RlZCBkYXRhXG4gICAgICAgICAgLy8gVG8gYXZvaWQgdGhlIG1haW4gYXBwbGljYXRpb24gcHJpb3IgdG8gYXBwbGljYXRpb25cbiAgICAgICAgICBjb25zdCBuZWVkVG9EZWxldGVBcHBzID0gcm91dGVyLnJvdXRlckNvbmZpZy5hcHBzLmZpbHRlcigoYXBwKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXBwSW5mby5yb290UGF0aCA9PT0gYXBwLmJhc2VuYW1lKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobmVlZFRvRGVsZXRlQXBwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBuZWVkVG9EZWxldGVBcHBzLmZvckVhY2goKGFwcCkgPT4ge1xuICAgICAgICAgICAgICBkZWxldGUgR2FyZmlzaC5hcHBJbmZvc1thcHAubmFtZV07XG4gICAgICAgICAgICAgIGRlbGV0ZSBHYXJmaXNoLmNhY2hlQXBwc1thcHAubmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJvdXRlci5zZXRSb3V0ZXJDb25maWcoe1xuICAgICAgICAgICAgICBhcHBzOiByb3V0ZXIucm91dGVyQ29uZmlnLmFwcHMuZmlsdGVyKChhcHApID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIW5lZWRUb0RlbGV0ZUFwcHMuc29tZShcbiAgICAgICAgICAgICAgICAgIChuZWVkRGVsZXRlKSA9PiBhcHAubmFtZSA9PT0gbmVlZERlbGV0ZS5uYW1lLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXBwcyA9IE9iamVjdC52YWx1ZXMoR2FyZmlzaC5hcHBJbmZvcyk7XG5cbiAgICAgICAgY29uc3QgYXBwTGlzdCA9IGFwcHMuZmlsdGVyKChhcHApID0+IHtcbiAgICAgICAgICBpZiAoIWFwcC5iYXNlbmFtZSkgYXBwLmJhc2VuYW1lID0gYmFzZW5hbWU7XG4gICAgICAgICAgcmV0dXJuICEhYXBwLmFjdGl2ZVdoZW47XG4gICAgICAgIH0pIGFzIEFycmF5PFJlcXVpcmVkPGludGVyZmFjZXMuQXBwSW5mbz4+O1xuXG4gICAgICAgIGNvbnN0IGxpc3Rlbk9wdGlvbnMgPSB7XG4gICAgICAgICAgYmFzZW5hbWUsXG4gICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgIGRlYWN0aXZlLFxuICAgICAgICAgIGF1dG9SZWZyZXNoQXBwLFxuICAgICAgICAgIG5vdE1hdGNoOiBvbk5vdE1hdGNoUm91dGVyLFxuICAgICAgICAgIGFwcHM6IGFwcExpc3QsXG4gICAgICAgICAgbGlzdGVuaW5nOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICByb3V0ZXJMb2coJ2xpc3RlblJvdXRlckFuZFJlRGlyZWN0JywgbGlzdGVuT3B0aW9ucyk7XG4gICAgICAgIGxpc3RlblJvdXRlckFuZFJlRGlyZWN0KGxpc3Rlbk9wdGlvbnMpO1xuICAgICAgfSxcblxuICAgICAgcmVnaXN0ZXJBcHAoYXBwSW5mb3MpIHtcbiAgICAgICAgY29uc3QgYXBwTGlzdCA9IE9iamVjdC52YWx1ZXMoYXBwSW5mb3MpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJvdXRlci5yZWdpc3RlclJvdXRlcihhcHBMaXN0LmZpbHRlcigoYXBwKSA9PiAhIWFwcC5hY3RpdmVXaGVuKSk7XG4gICAgICAgIC8vIEFmdGVyIGNvbXBsZXRpb24gb2YgdGhlIHJlZ2lzdHJhdGlvbiBhcHBsaWNhdGlvbiwgdHJpZ2dlciBhcHBsaWNhdGlvbiBtb3VudFxuICAgICAgICAvLyBIYXMgYmVlbiBydW5uaW5nIGFmdGVyIGFkZGluZyByb3V0aW5nIHRvIHRyaWdnZXIgdGhlIHJlZGlyZWN0aW9uXG4gICAgICAgIGlmICghR2FyZmlzaC5ydW5uaW5nKSByZXR1cm47XG4gICAgICAgIHJvdXRlckxvZygncmVnaXN0ZXJBcHAgaW5pdFJlZGlyZWN0JywgYXBwSW5mb3MpO1xuICAgICAgICBpbml0UmVkaXJlY3QoKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cbiIsICJleHBvcnQgY29uc3QgR0FSRklTSF9OQU1FU1BBQ0VfUFJFRklYID0gJ19fR2FyZmlzaF9fJztcbmV4cG9ydCBjb25zdCBHQVJGSVNIX09QVElNSVpFX05BTUUgPSAnX19nYXJmaXNoX29wdGltaXplX18nO1xuZXhwb3J0IGNvbnN0IF9fcHJveHlOb2RlX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLnByb3h5Tm9kZScpO1xuZXhwb3J0IGNvbnN0IF9fZG9tV3JhcHBlcl9fID0gU3ltYm9sLmZvcignZ2FyZmlzaC5kb21XcmFwcGVyJyk7XG5leHBvcnQgY29uc3QgX193aW5kb3dCaW5kX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLndpbmRvd0JpbmQnKTtcbmV4cG9ydCBjb25zdCBfX3NhbmRib3hNYXBfXyA9IFN5bWJvbC5mb3IoJ2dhcmZpc2guc2FuZGJveE1hcCcpO1xuZXhwb3J0IGNvbnN0IF9fZG9jdW1lbnRCaW5kX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLmRvY3VtZW50QmluZCcpO1xuZXhwb3J0IGNvbnN0IF9fZ2FyZmlzaEdsb2JhbF9fID0gU3ltYm9sLmZvcignZ2FyZmlzaC5nbG9iYWxPYmplY3QnKTtcbmV4cG9ydCBjb25zdCBfX2VsZW1lbnRTYW5kYm94VGFnX18gPSBTeW1ib2wuZm9yKCdnYXJmaXNoLmVsZW1lbnRTYW5kYm94VGFnJyk7XG4iLCAiaW1wb3J0IHsgaGFzT3duLCBtYWtlTWFwLCBuZXh0VGljayB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuL3NhbmRib3gnO1xuaW1wb3J0IHsgRmFrZVdpbmRvdyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgX19wcm94eU5vZGVfXyxcbiAgX19zYW5kYm94TWFwX18sXG4gIF9fZWxlbWVudFNhbmRib3hUYWdfXyxcbn0gZnJvbSAnLi9zeW1ib2xUeXBlcyc7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24tcHJvcGVydGllcy1vZi10aGUtZ2xvYmFsLW9iamVjdFxuY29uc3QgZXNHbG9iYWxNZXRob2RzID1cbiAgLy8gRnVuY3Rpb24gcHJvcGVydGllcyBvZiB0aGUgZ2xvYmFsIG9iamVjdCAvLyBGdW5jdGlvbiBwcm9wZXJ0aWVzIG9mIHRoZSBnbG9iYWwgb2JqZWN0XG4gIChcbiAgICAnZXZhbCxpc0Zpbml0ZSxpc05hTixwYXJzZUZsb2F0LHBhcnNlSW50LCcgK1xuICAgIC8vIFVSTCBoYW5kbGluZyBmdW5jdGlvbnNcbiAgICAnZGVjb2RlVVJJLGRlY29kZVVSSUNvbXBvbmVudCxlbmNvZGVVUkksZW5jb2RlVVJJQ29tcG9uZW50LCcgK1xuICAgIC8vIENvbnN0cnVjdG9yIHByb3BlcnRpZXMgb2YgdGhlIGdsb2JhbCBvYmplY3RcbiAgICAnQXJyYXksQXJyYXlCdWZmZXIsQmlnSW50LEJpZ0ludDY0QXJyYXksQmlnVWludDY0QXJyYXksQm9vbGVhbixEYXRhVmlldyxEYXRlLEVycm9yLEV2YWxFcnJvciwnICtcbiAgICAnRmluYWxpemF0aW9uUmVnaXN0cnksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheSxGdW5jdGlvbixJbnQ4QXJyYXksSW50MTZBcnJheSxJbnQzMkFycmF5LE1hcCxOdW1iZXIsJyArXG4gICAgJ09iamVjdCxQcm9taXNlLFByb3h5LFJhbmdlRXJyb3IsUmVmZXJlbmNlRXJyb3IsUmVnRXhwLFNldCxTaGFyZWRBcnJheUJ1ZmZlcixTdHJpbmcsU3ltYm9sLFN5bnRheEVycm9yLCcgK1xuICAgICdUeXBlRXJyb3IsVWludDhBcnJheSxVaW50OENsYW1wZWRBcnJheSxVaW50MTZBcnJheSxVaW50MzJBcnJheSxVUklFcnJvcixXZWFrTWFwLFdlYWtSZWYsV2Vha1NldCwnICtcbiAgICAvLyBPdGhlciBQcm9wZXJ0aWVzIG9mIHRoZSBHbG9iYWwgT2JqZWN0XG4gICAgJ0F0b21pY3MsSlNPTixNYXRoLFJlZmxlY3QsJ1xuICApLnNwbGl0KCcsJyk7XG5cbmNvbnN0IG5hdGl2ZUNvZGVNZXRob2RzID0gJ2hhc093blByb3BlcnR5LCcuc3BsaXQoJywnKTtcblxuZXhwb3J0IGNvbnN0IGlzRXNHbG9iYWxNZXRob2RzID0gbWFrZU1hcChlc0dsb2JhbE1ldGhvZHMpO1xuZXhwb3J0IGNvbnN0IGlzTmF0aXZlQ29kZU1ldGhvZHMgPSBtYWtlTWFwKG5hdGl2ZUNvZGVNZXRob2RzKTtcblxuLy8gTmVlZCB0byBvcHRpbWl6ZSwgYXZvaWQgZnJvbSB0aGUgd2l0aFxuLy8gQ2FuJ3QgZmlsdGVyIGRvY3VtZW50LCBldmFsIGtleXdvcmRzLCBzdWNoIGFzIGRvY3VtZW50IGluIGhhbmRsaW5nIHBhcmVudE5vZGUgdXNlZnVsXG5leHBvcnQgY29uc3Qgb3B0aW1pemVNZXRob2RzID0gWy4uLmVzR2xvYmFsTWV0aG9kc10uZmlsdGVyKCh2KSA9PiB2ICE9PSAnZXZhbCcpO1xuXG4vLyBUaGUgc2FuZGJveCBtYXkgYmUgdXNlZCBhbG9uZSwgdG8gZW5zdXJlIHRoYXQgdGhlIGBzYW5kYm94TWFwYCBpcyBnbG9iYWxseSB1bmlxdWUsXG4vLyBiZWNhdXNlIHdlIHdpbGwgb25seSByZXdyaXRlIGBhcHBlbmRDaGlsZGAgb25jZVxubGV0IHNhbmRib3hMaXN0OiBNYXA8bnVtYmVyLCBTYW5kYm94PiA9IG5ldyBNYXAoKTtcbmlmICghKHdpbmRvdyBhcyBGYWtlV2luZG93KVtfX3NhbmRib3hNYXBfX10pIHtcbiAgKHdpbmRvdyBhcyBGYWtlV2luZG93KVtfX3NhbmRib3hNYXBfX10gPSBzYW5kYm94TGlzdDtcbn0gZWxzZSB7XG4gIHNhbmRib3hMaXN0ID0gKHdpbmRvdyBhcyBGYWtlV2luZG93KVtfX3NhbmRib3hNYXBfX107XG59XG5cbmV4cG9ydCBjb25zdCBzYW5kYm94TWFwID0ge1xuICBzYW5kYm94TWFwOiBzYW5kYm94TGlzdCxcblxuICBnZXQoZWxlbWVudDogRWxlbWVudCk6IFNhbmRib3ggfCB1bmRlZmluZWQge1xuICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHNhbmRib3hJZCA9IGVsZW1lbnRbX19lbGVtZW50U2FuZGJveFRhZ19fXTtcbiAgICBpZiAodHlwZW9mIHNhbmRib3hJZCAhPT0gJ251bWJlcicpIHJldHVybjtcbiAgICByZXR1cm4gdGhpcy5zYW5kYm94TWFwLmdldChzYW5kYm94SWQpO1xuICB9LFxuXG4gIHNldEVsZW1lbnRUYWcoZWxlbWVudDogRWxlbWVudCwgc2FuZGJveDogU2FuZGJveCkge1xuICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xuICAgIGVsZW1lbnRbX19lbGVtZW50U2FuZGJveFRhZ19fXSA9IHNhbmRib3guaWQ7XG4gIH0sXG5cbiAgc2V0KHNhbmRib3g6IFNhbmRib3gpIHtcbiAgICBpZiAodGhpcy5zYW5kYm94TWFwLmdldChzYW5kYm94LmlkKSkgcmV0dXJuO1xuICAgIHRoaXMuc2FuZGJveE1hcC5zZXQoc2FuZGJveC5pZCwgc2FuZGJveCk7XG4gIH0sXG5cbiAgZGVsKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgICB0aGlzLnNhbmRib3hNYXAuZGVsZXRlKHNhbmRib3guaWQpO1xuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZXJQYXJhbXMoYXJnczogSUFyZ3VtZW50cyB8IEFycmF5PGFueT4pIHtcbiAgYXJncyA9IEFycmF5LmlzQXJyYXkoYXJncykgPyBhcmdzIDogQXJyYXkuZnJvbShhcmdzKTtcbiAgcmV0dXJuIGFyZ3MubWFwKCh2KSA9PiB7XG4gICAgcmV0dXJuIHYgJiYgdltfX3Byb3h5Tm9kZV9fXSA/IHZbX19wcm94eU5vZGVfX10gOiB2O1xuICB9KTtcbn1cblxuLy8gQ29udGFpbmVyIG5vZGUsIGJlY2F1c2UgaXQgY2hhbmdlcyBhbGwgdGhlIHRpbWUsIHRha2UgaXQgYXMgeW91IHVzZSBpdFxuZXhwb3J0IGZ1bmN0aW9uIHJvb3RFbG0oc2FuZGJveDogU2FuZGJveCkge1xuICBjb25zdCBjb250YWluZXIgPSBzYW5kYm94ICYmIHNhbmRib3gub3B0aW9ucy5lbDtcbiAgcmV0dXJuIGNvbnRhaW5lciAmJiBjb250YWluZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5JZnJhbWUoKSB7XG4gIHJldHVybiB3aW5kb3c/LnBhcmVudD8uX19HQVJGSVNIX18gIT09IHdpbmRvdz8uX19HQVJGSVNIX187XG59XG5cbi8vIENvcHkgXCJ3aW5kb3dcIiBhbmQgXCJkb2N1bWVudFwiXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFrZU9iamVjdChcbiAgdGFyZ2V0OiBSZWNvcmQ8UHJvcGVydHlLZXksIGFueT4sXG4gIGZpbHRlcj86IChrZXk6IFByb3BlcnR5S2V5KSA9PiBib29sZWFuLFxuICBpc1dyaXRhYmxlPzogKGtleTogUHJvcGVydHlLZXkpID0+IGJvb2xlYW4sXG4pIHtcbiAgY29uc3QgZmFrZU9iamVjdCA9IHt9O1xuICBjb25zdCBwcm9wZXJ0eU1hcCA9IHt9O1xuICBjb25zdCBzdG9yYWdlQm94ID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gU3RvcmUgY2hhbmdlZCB2YWx1ZVxuICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgY29uc3QgZGVmID0gKHA6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcCk7XG5cbiAgICBpZiAoZGVzY3JpcHRvcj8uY29uZmlndXJhYmxlKSB7XG4gICAgICBjb25zdCBoYXNHZXR0ZXIgPSBoYXNPd24oZGVzY3JpcHRvciwgJ2dldCcpO1xuICAgICAgY29uc3QgaGFzU2V0dGVyID0gaGFzT3duKGRlc2NyaXB0b3IsICdzZXQnKTtcbiAgICAgIGNvbnN0IGNhbldyaXRhYmxlID0gdHlwZW9mIGlzV3JpdGFibGUgPT09ICdmdW5jdGlvbicgJiYgaXNXcml0YWJsZShwKTtcblxuICAgICAgaWYgKGhhc0dldHRlcikge1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgZGVzY3JpcHRvci5nZXQgPSAoKSA9PiBoYXNPd24oc3RvcmFnZUJveCwgcClcbiAgICAgICAgICA/IHN0b3JhZ2VCb3hbcF1cbiAgICAgICAgICA6IHRhcmdldFtwXTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNTZXR0ZXIpIHtcbiAgICAgICAgZGVzY3JpcHRvci5zZXQgPSAodmFsKSA9PiB7XG4gICAgICAgICAgc3RvcmFnZUJveFtwXSA9IHZhbDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChjYW5Xcml0YWJsZSkge1xuICAgICAgICBpZiAoZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNHZXR0ZXIpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yLnNldCA9ICh2YWwpID0+IHtcbiAgICAgICAgICAgIHN0b3JhZ2VCb3hbcF0gPSB2YWw7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmFrZU9iamVjdCwgcCwgT2JqZWN0LmZyZWV6ZShkZXNjcmlwdG9yKSk7XG4gICAgfVxuICB9O1xuICBwcm9wZXJ0eU5hbWVzLmZvckVhY2goKHApID0+IHtcbiAgICBwcm9wZXJ0eU1hcFtwXSA9IHRydWU7XG4gICAgdHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJyA/ICFmaWx0ZXIocCkgJiYgZGVmKHApIDogZGVmKHApO1xuICB9KTtcbiAgLy8gXCJwcm9wXCIgbWF5YmUgaW4gcHJvdG90eXBlIGNoYWluXG4gIGZvciAoY29uc3QgcHJvcCBpbiB0YXJnZXQpIHtcbiAgICAhcHJvcGVydHlNYXBbcHJvcF0gJiYgZGVmKHByb3ApO1xuICB9XG4gIHJldHVybiBmYWtlT2JqZWN0IGFzIGFueTtcbn1cblxubGV0IHNldHRpbmcgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIG1pY3JvVGFza0h0bWxQcm94eURvY3VtZW50KHByb3h5RG9jdW1lbnQpIHtcbiAgLy8gVGhlIEhUTUwgcGFyZW50IG5vZGUgaW50byBhZ2VudCBmb3IgdGhlIGRvY3VtZW50XG4gIC8vIEluIG1pY3JvIHRhc2tzIHJlcGxhY2UgcHJpbWFyeSBub2RlXG4gIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5jaGlsZHJlblswXTtcbiAgaWYgKGh0bWwgJiYgaHRtbC5wYXJlbnROb2RlICE9PSBwcm94eURvY3VtZW50KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGh0bWwsICdwYXJlbnROb2RlJywge1xuICAgICAgdmFsdWU6IHByb3h5RG9jdW1lbnQsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgfSk7XG5cbiAgICBpZiAoc2V0dGluZykge1xuICAgICAgc2V0dGluZyA9IGZhbHNlO1xuICAgICAgLy8gRG8gbm90IHVzZSBtaWNybyB0YXNrcywgRWxlbWVudCB3aWxsIGFwcGVhciBpbiB0aGUgdGFzayBwbGFjZWQgaW4gbmV4dFRpY2sgYWZ0ZXIgbm9kZVxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBzZXR0aW5nID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGh0bWwsICdwYXJlbnROb2RlJywge1xuICAgICAgICAgIHZhbHVlOiBkb2N1bWVudCxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0eWxlZENvbXBvbmVudHNMaWtlKGVsZW1lbnQ6IEhUTUxTdHlsZUVsZW1lbnQpIHtcbiAgLy8gQSBzdHlsZWQtY29tcG9uZW50cyBsaWtlZCBlbGVtZW50IGhhcyBubyB0ZXh0Q29udGVudCBidXQga2VlcCB0aGUgcnVsZXMgaW4gaXRzIHNoZWV0LmNzc1J1bGVzLlxuICByZXR1cm4gKFxuICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU3R5bGVFbGVtZW50ICYmXG4gICAgIWVsZW1lbnQudGV4dENvbnRlbnQgJiZcbiAgICBlbGVtZW50LnNoZWV0Py5jc3NSdWxlcy5sZW5ndGhcbiAgKTtcbn1cbiIsICJpbXBvcnQgeyB3YXJuLCBtYWtlTWFwLCBpc09iamVjdCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IGhhbmRsZXJQYXJhbXMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGFEZXNjcmlwdG9yKGRlc2M/OiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gJ3ZhbHVlJyBpbiBkZXNjIHx8ICd3cml0YWJsZScgaW4gZGVzYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWNjZXNzb3JEZXNjcmlwdG9yKGRlc2M/OiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gJ2dldCcgaW4gZGVzYyB8fCAnc2V0JyBpbiBkZXNjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5R2V0dGVyRGVzY3JpcHRvcihcbiAgdGFyZ2V0OiBhbnksXG4gIHA6IFByb3BlcnR5S2V5LFxuICBuZXdWYWx1ZTogYW55LFxuKSB7XG4gIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcCk7XG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJveHktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzLWdldC1wLXJlY2VpdmVyXG4gIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgaWYgKGlzRGF0YURlc2NyaXB0b3IoZGVzYykgJiYgZGVzYy53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmlzXG4gICAgICBpZiAoIU9iamVjdC5pcyhuZXdWYWx1ZSwgZGVzYy52YWx1ZSkpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgd2FybihgcHJvcGVydHkgXCIke1N0cmluZyhwKX1cIiBpcyBub24tY29uZmlndXJhYmxlIGFuZCBub24td3JpdGFibGUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0FjY2Vzc29yRGVzY3JpcHRvcihkZXNjKSAmJiBkZXNjLmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlTZXR0ZXIoXG4gIHByb3h5VGFyZ2V0OiBhbnksXG4gIHRhcmdldDogYW55LFxuICBwOiBQcm9wZXJ0eUtleSxcbiAgdmFsOiBhbnksXG4gIHJlY2VpdmVyOiBhbnksXG4pIHtcbiAgY29uc3QgdmVyaWZ5UmVzdWx0ID0gdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcihcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBwcm94eVRhcmdldCA/IHByb3h5VGFyZ2V0IDogKHJlY2VpdmVyIHx8IHRhcmdldCksXG4gICAgcCxcbiAgICB2YWwsXG4gICk7XG5cbiAgbGV0IHJlc3VsdDtcbiAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAxIHx8IHZlcmlmeVJlc3VsdCA9PT0gMikgcmVzdWx0ID0gZmFsc2U7XG4gICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMykgcmVzdWx0ID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlTZXR0ZXJEZXNjcmlwdG9yKFxuICB0YXJnZXQ6IGFueSxcbiAgcDogUHJvcGVydHlLZXksXG4gIG5ld1ZhbHVlOiBhbnksXG4pIHtcbiAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwKTtcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm94eS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHMtc2V0LXAtdi1yZWNlaXZlclxuICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgIGlmIChpc0RhdGFEZXNjcmlwdG9yKGRlc2MpICYmIGRlc2Mud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5pc1xuICAgICAgaWYgKCFPYmplY3QuaXMobmV3VmFsdWUsIGRlc2MudmFsdWUpKSB7XG4gICAgICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgIHdhcm4oYHByb3BlcnR5IFwiJHtTdHJpbmcocCl9XCIgaXMgbm9uLWNvbmZpZ3VyYWJsZSBhbmQgbm9uLXdyaXRhYmxlLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0FjY2Vzc29yRGVzY3JpcHRvcihkZXNjKSAmJiBkZXNjLnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIHNhZmVUb1N0cmluZyh0aGluZykge1xuICB0cnkge1xuICAgIHJldHVybiB0aGluZy50b1N0cmluZygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuICdbdG9TdHJpbmcgZmFpbGVkXSc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoZm46ICgpID0+IHZvaWQgfCBGdW5jdGlvbkNvbnN0cnVjdG9yKSB7XG4gIGNvbnN0IGZwID0gZm4ucHJvdG90eXBlO1xuICBjb25zdCBoYXNDb25zdHJ1Y3RvciA9XG4gICAgZnAgJiYgZnAuY29uc3RydWN0b3IgPT09IGZuICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGZwKS5sZW5ndGggPiAxO1xuICBjb25zdCBmdW5jdGlvblN0ciA9ICFoYXNDb25zdHJ1Y3RvciAmJiBzYWZlVG9TdHJpbmcoZm4pO1xuXG4gIHJldHVybiAoXG4gICAgaGFzQ29uc3RydWN0b3IgfHxcbiAgICAvXmZ1bmN0aW9uXFxzK1tBLVpdLy50ZXN0KGZ1bmN0aW9uU3RyKSB8fFxuICAgIC9eY2xhc3NcXGIvLnRlc3QoZnVuY3Rpb25TdHIpXG4gICk7XG59XG5cbmNvbnN0IGJ1aWxkSW5Qcm9wcyA9IG1ha2VNYXAoW1xuICAnbGVuZ3RoJyxcbiAgJ2NhbGxlcicsXG4gICdjYWxsZWUnLFxuICAnYXJndW1lbnRzJyxcbiAgJ3Byb3RvdHlwZScsXG4gIFN5bWJvbC5oYXNJbnN0YW5jZSxcbl0pO1xuXG5mdW5jdGlvbiB0cmFuc2ZlclByb3BzKG86IEZ1bmN0aW9uLCBuOiBGdW5jdGlvbikge1xuICBmb3IgKGNvbnN0IGtleSBvZiBSZWZsZWN0Lm93bktleXMobykpIHtcbiAgICBpZiAoYnVpbGRJblByb3BzKGtleSkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG4sIGtleSk7XG4gICAgaWYgKGRlc2MgJiYgZGVzYy53cml0YWJsZSkge1xuICAgICAgbltrZXldID0gb1trZXldO1xuICAgIH1cbiAgfVxufVxuXG4vLyAxLiBUaGlzIHBvaW50cyB0byB0aGUgY29udGV4dCBvZiB0aGUgZm4gdGFyZ2V0IGZ1bmN0aW9uXG4vLyAyLiBBc3N1cmUgdGhlIGdvYWwgYWZ0ZXIgdGhlIGJpbmQgZnVuY3Rpb24gcHJvdG90eXBlIG1ldGhvZCBiZSByZXBsYWNlZCBhZnRlciB0aGUgcHJvdG90eXBlIG1ldGhvZCB3b3VsZCBub3QgYmUgYWZmZWN0ZWRcbi8vIDMuIEFzc3VyZSB0aGUgb2JqZWN0aXZlIGZ1bmN0aW9uIGFmdGVyIHRoZSBiaW5kIGluc3RhbmNlb2YgaW4gbGluZSB3aXRoIGV4cGVjdGF0aW9uc1xuLy8gNC4gRW5zdXJlIHRoYXQgYmluZCBhZnRlciB0aGUgb2JqZWN0aXZlIGZ1bmN0aW9uIG9mIG5vcm1hbCBzdGF0aWMgbWV0aG9kcyBhdmFpbGFibGVcbi8vIDUuIEFmdGVyIHRoZSBiaW5kIGFmdGVyIHRoZSBvYmplY3RpdmUgZnVuY3Rpb24gaXMgbmV3IHRvIGluc3RhbnRpYXRlLCBwb2ludGluZyB0byB0aGVpciBvd25cbmV4cG9ydCBmdW5jdGlvbiBiaW5kKGZuLCBjb250ZXh0OiBhbnkpIHtcbiAgY29uc3QgZk5PUCA9IGZ1bmN0aW9uICgpIHt9O1xuICBmdW5jdGlvbiBib3VuZCh0aGlzOiBhbnkpIHtcbiAgICBjb25zdCBhcmdzID0gaGFuZGxlclBhcmFtcyhhcmd1bWVudHMpO1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgIGNvbnN0IG9iaiA9IG5ldyBmbiguLi5hcmdzKTtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihvYmosIGJvdW5kLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVjb3JkIG9yaWdpbiBmdW5jdGlvblxuICBib3VuZC4kbmF0aXZlID0gZm47XG4gIHRyYW5zZmVyUHJvcHMoZm4sIGJvdW5kKTtcblxuICBpZiAoZm4ucHJvdG90eXBlKSB7XG4gICAgLy8gYEZ1bmN0aW9uLnByb3RvdHlwZWAgZG9lc24ndCBoYXZlIGEgcHJvdG90eXBlIHByb3BlcnR5XG4gICAgZk5PUC5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIH1cbiAgYm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAvLyBmaXggXCJpbnN0YW5jZW9mXCJcbiAgaWYgKFN5bWJvbC5oYXNJbnN0YW5jZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShib3VuZCwgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB2YWx1ZShpbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBvcCA9IGZuLnByb3RvdHlwZTtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KG9wKSB8fCB0eXBlb2Ygb3AgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IGluc3RhbmNlIGluc3RhbmNlb2YgZm5cbiAgICAgICAgICA6IGZhbHNlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gYm91bmQ7XG59XG4iLCAiaW1wb3J0IHsgaGFzT3duLCBtYWtlTWFwIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgdmVyaWZ5U2V0dGVyIH0gZnJvbSAnLi4vcHJveHlJbnRlcmNlcHRvci9zaGFyZWQnO1xuXG4vLyBDYW4ndCBzZXQgdG8gcHJveHkgaGlzdG9yeSB2YXJpYWJsZVxuY29uc3QgcGFzc2VkS2V5ID0gbWFrZU1hcChbJ3Njcm9sbFJlc3RvcmF0aW9uJ10pO1xuXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9yeU1vZHVsZSgpIHtcbiAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lmhpc3RvcnkpIHx8IEhpc3RvcnkucHJvdG90eXBlO1xuICBjb25zdCBmYWtlSGlzdG9yeSA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuXG4gIGNvbnN0IHByb3h5SGlzdG9yeSA9IG5ldyBQcm94eShmYWtlSGlzdG9yeSwge1xuICAgIGdldCh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaGFzT3duKHRhcmdldCwgcCkgPyB0YXJnZXRbcF0gOiB3aW5kb3cuaGlzdG9yeVtwXTtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS5iaW5kKHdpbmRvdy5oaXN0b3J5KSA6IHZhbHVlO1xuICAgIH0sXG5cbiAgICBzZXQodGFyZ2V0OiBhbnksIHA6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55LCByZWNlaXZlcjogYW55KSB7XG4gICAgICBjb25zdCBpc1Bhc3NLZXkgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZycgJiYgcGFzc2VkS2V5KHApO1xuICAgICAgY29uc3QgdmVyaWZ5U2V0dGVyUmVzdWx0ID0gdmVyaWZ5U2V0dGVyKFxuICAgICAgICBpc1Bhc3NLZXkgPyBoaXN0b3J5IDogbnVsbCxcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICBwLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgcmVjZWl2ZXIsXG4gICAgICApO1xuICAgICAgaWYgKHZlcmlmeVNldHRlclJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB2ZXJpZnlTZXR0ZXJSZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNQYXNzS2V5XG4gICAgICAgICAgPyBSZWZsZWN0LnNldChoaXN0b3J5LCBwLCB2YWx1ZSlcbiAgICAgICAgICA6IFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIFwiX19wcm90b19fXCIgaXMgbm90IGEgc3RhbmRhcmQgYXR0cmlidXRlLCBpdCBpcyB0ZW1wb3JhcmlseSBub3QgY29tcGF0aWJsZVxuICAgIGdldFByb3RvdHlwZU9mKCkge1xuICAgICAgcmV0dXJuIGZha2VIaXN0b3J5O1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGZha2VIaXN0b3J5Q3RvciA9IGZ1bmN0aW9uIEhpc3RvcnkoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICB9O1xuICAvLyBBdm9pZCBzaWRlIGVmZmVjdHMgb2YgcHJvdG90eXBlIGNoYWluIGJlaW5nIGNoYW5nZWRcbiAgZmFrZUhpc3RvcnlDdG9yLnByb3RvdHlwZSA9IGZha2VIaXN0b3J5O1xuICBmYWtlSGlzdG9yeUN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZmFrZUhpc3RvcnlDdG9yO1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIGhpc3Rvcnk6IHByb3h5SGlzdG9yeSxcbiAgICAgIEhpc3Rvcnk6IGZha2VIaXN0b3J5Q3RvcixcbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGhhc093bixcbiAgaXNQcm9taXNlLFxuICBpc0Fic29sdXRlLFxuICB0cmFuc2Zvcm1VcmwsXG4gIHRvV3NQcm90b2NvbCxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV0d29ya01vZHVsZShzYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IGJhc2VVcmwgPSBzYW5kYm94Lm9wdGlvbnMuYmFzZVVybDtcbiAgY29uc3Qgd3NTZXQgPSBuZXcgU2V0PGZha2VXZWJTb2NrZXQ+KCk7XG4gIGNvbnN0IHhoclNldCA9IG5ldyBTZXQ8ZmFrZVhNTEh0dHBSZXF1ZXN0PigpO1xuICBjb25zdCBmZXRjaFNldCA9IG5ldyBTZXQ8QWJvcnRDb250cm9sbGVyPigpO1xuICBjb25zdCBuZWVkRml4ID0gKHVybCkgPT5cbiAgICBzYW5kYm94Lm9wdGlvbnMuZml4QmFzZVVybCAmJlxuICAgIGJhc2VVcmwgJiZcbiAgICB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyAmJlxuICAgICFpc0Fic29sdXRlKHVybCk7XG5cbiAgY2xhc3MgZmFrZVhNTEh0dHBSZXF1ZXN0IGV4dGVuZHMgWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHhoclNldC5hZGQodGhpcyk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgIC8vIEFzeW5jIHJlcXVlc3RcbiAgICAgIGlmIChhcmd1bWVudHNbMl0gPT09IGZhbHNlKSB7XG4gICAgICAgIHhoclNldC5kZWxldGUodGhpcyk7XG4gICAgICB9XG4gICAgICBpZiAobmVlZEZpeChhcmd1bWVudHNbMV0pKSB7XG4gICAgICAgIGFyZ3VtZW50c1sxXSA9IGJhc2VVcmxcbiAgICAgICAgICA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBhcmd1bWVudHNbMV0pXG4gICAgICAgICAgOiBhcmd1bWVudHNbMV07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgaWYoc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3Qpe1xuICAgICAgICBzYW5kYm94Lm9wdGlvbnMuYWRkU291cmNlTGlzdCh7XG4gICAgICAgICAgdGFnTmFtZTogJ3htbGh0dHByZXF1ZXN0JyxcbiAgICAgICAgICB1cmwsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cGVyLm9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBhYm9ydCgpIHtcbiAgICAgIHhoclNldC5kZWxldGUodGhpcyk7XG4gICAgICByZXR1cm4gc3VwZXIuYWJvcnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBmYWtlV2ViU29ja2V0IGV4dGVuZHMgV2ViU29ja2V0IHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHByb3RvY29scz86IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICBpZiAobmVlZEZpeCh1cmwpICYmIGJhc2VVcmwpIHtcbiAgICAgICAgY29uc3QgYmFzZVdzVXJsID0gdG9Xc1Byb3RvY29sKGJhc2VVcmwpO1xuICAgICAgICB1cmwgPSB0cmFuc2Zvcm1VcmwoYmFzZVdzVXJsLCBhcmd1bWVudHNbMV0pO1xuICAgICAgfVxuICAgICAgc3VwZXIodXJsLCBwcm90b2NvbHMpO1xuICAgICAgd3NTZXQuYWRkKHRoaXMpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgd3NTZXQuZGVsZXRlKHRoaXMpO1xuICAgICAgcmV0dXJuIHN1cGVyLmNsb3NlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLy8gYGZldGNoYCBpcyBub3QgY29uc3RydWN0b3JcbiAgY29uc3QgZmFrZUZldGNoID0gKGlucHV0LCBvcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHt9KSA9PiB7XG4gICAgaWYgKG5lZWRGaXgoaW5wdXQpICYmIGJhc2VVcmwpIHtcbiAgICAgIGlucHV0ID0gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIGlucHV0KTtcbiAgICB9XG4gICAgaWYoc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3Qpe1xuICAgICAgc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3QoeyB0YWdOYW1lOiAnZmV0Y2gnLCB1cmw6IGlucHV0IH0pO1xuICAgIH1cbiAgICBsZXQgY29udHJvbGxlcjtcbiAgICBpZiAoIWhhc093bihvcHRpb25zLCAnc2lnbmFsJykgJiYgd2luZG93LkFib3J0Q29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlciA9IG5ldyB3aW5kb3cuQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBmZXRjaFNldC5hZGQoY29udHJvbGxlcik7XG4gICAgICBvcHRpb25zLnNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB3aW5kb3cuZmV0Y2goaW5wdXQsIG9wdGlvbnMpO1xuICAgIHJldHVybiBjb250cm9sbGVyICYmIGlzUHJvbWlzZShyZXN1bHQpXG4gICAgICA/IHJlc3VsdC5maW5hbGx5KCgpID0+IGZldGNoU2V0LmRlbGV0ZShjb250cm9sbGVyKSlcbiAgICAgIDogcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIFdlYlNvY2tldDogZmFrZVdlYlNvY2tldCBhcyBhbnksXG4gICAgICBYTUxIdHRwUmVxdWVzdDogZmFrZVhNTEh0dHBSZXF1ZXN0IGFzIGFueSxcbiAgICAgIGZldGNoOiBmYWtlRmV0Y2gsXG4gICAgfSxcblxuICAgIHJlY292ZXIoKSB7XG4gICAgICB3c1NldC5mb3JFYWNoKCh3cykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHdzLmNsb3NlID09PSAnZnVuY3Rpb24nKSB3cy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICB4aHJTZXQuZm9yRWFjaCgoeGhyKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgeGhyLmFib3J0ID09PSAnZnVuY3Rpb24nKSB4aHIuYWJvcnQoKTtcbiAgICAgIH0pO1xuICAgICAgZmV0Y2hTZXQuZm9yRWFjaCgoY3RvcikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGN0b3IuYWJvcnQgPT09ICdmdW5jdGlvbicpIGN0b3IuYWJvcnQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB3c1NldC5jbGVhcigpO1xuICAgICAgeGhyU2V0LmNsZWFyKCk7XG4gICAgICBmZXRjaFNldC5jbGVhcigpO1xuICAgIH0sXG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgaGFzT3duLFxuICBtYWtlTWFwLFxuICBpc09iamVjdCxcbiAgZmluZFRhcmdldCxcbiAgc2FmYXJpMTNEZWFsLFxuICBfX01vY2tCb2R5X18sXG4gIF9fTW9ja0hlYWRfXyxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgcm9vdEVsbSwgc2FuZGJveE1hcCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IF9fZG9jdW1lbnRCaW5kX18gfSBmcm9tICcuLi9zeW1ib2xUeXBlcyc7XG5pbXBvcnQgeyBiaW5kLCB2ZXJpZnlHZXR0ZXJEZXNjcmlwdG9yLCB2ZXJpZnlTZXR0ZXJEZXNjcmlwdG9yIH0gZnJvbSAnLi9zaGFyZWQnO1xuXG5jb25zdCBwYXNzZWRLZXkgPSBtYWtlTWFwKFsndGl0bGUnLCAnY29va2llJywgJ29uc2VsZWN0c3RhcnQnLCAnb25kcmFnc3RhcnQnXSk7XG5cbmNvbnN0IHF1ZXJ5RnVuY3Rpb25zID0gbWFrZU1hcChbXG4gICdxdWVyeVNlbGVjdG9yJyxcbiAgJ3F1ZXJ5U2VsZWN0b3JBbGwnLFxuICAnZ2V0RWxlbWVudEJ5SWQnLFxuICAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnLFxuICAnZ2V0RWxlbWVudHNCeVRhZ05hbWVOUycsXG4gICdnZXRFbGVtZW50c0J5Q2xhc3NOYW1lJyxcbl0pO1xuXG4vLyBkb2N1bWVudCBwcm94eSBnZXR0ZXJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHZXR0ZXIoc2FuZGJveDogU2FuZGJveCkge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwOiBQcm9wZXJ0eUtleSwgcmVjZWl2ZXI/OiBhbnkpID0+IHtcbiAgICBpZiAocCA9PT0gJ2FjdGl2ZUVsZW1lbnQnKSB7XG4gICAgICByZXR1cm4gUmVmbGVjdC5nZXQoZG9jdW1lbnQsIHApO1xuICAgIH1cblxuICAgIGNvbnN0IHJvb3ROb2RlID0gcm9vdEVsbShzYW5kYm94KTtcbiAgICBjb25zdCBzdHJpY3RJc29sYXRpb24gPSBzYW5kYm94Lm9wdGlvbnMuc3RyaWN0SXNvbGF0aW9uO1xuICAgIGNvbnN0IHZhbHVlID0gaGFzT3duKHRhcmdldCwgcClcbiAgICAgID8gUmVmbGVjdC5nZXQodGFyZ2V0LCBwLCByZWNlaXZlcilcbiAgICAgIDogUmVmbGVjdC5nZXQoZG9jdW1lbnQsIHApO1xuXG4gICAgLy8gUHJvdmlkZSBob29rcyBmb3IgdXNlcnMgdG8gcmV0dXJuIHNwZWNpZmljIHZhbHVlcyB0aGVtc2VsdmVzXG4gICAgY29uc3QgaG9va3NSZXMgPSBzYW5kYm94Lmhvb2tzLmxpZmVjeWNsZS5kb2N1bWVudEdldHRlci5lbWl0KHtcbiAgICAgIHZhbHVlLFxuICAgICAgcm9vdE5vZGUsXG4gICAgICBwcm9wTmFtZTogcCxcbiAgICAgIHByb3h5RG9jdW1lbnQ6IHRhcmdldCxcbiAgICAgIGN1c3RvbVZhbHVlOiBudWxsLFxuICAgIH0pO1xuXG4gICAgaWYgKGhvb2tzUmVzLmN1c3RvbVZhbHVlKSB7XG4gICAgICByZXR1cm4gaG9va3NSZXMuY3VzdG9tVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0U2FuZGJveFJlZiA9IChlbCkgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KGVsKSkge1xuICAgICAgICBzYW5kYm94TWFwLnNldEVsZW1lbnRUYWcoZWwsIHNhbmRib3gpO1xuICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgICAgICBlbC5fX1NBTkRCT1hfXyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICBpZiAocCA9PT0gJ2NyZWF0ZUVsZW1lbnQnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFnTmFtZSwgb3B0aW9ucykge1xuICAgICAgICAgIGNvbnN0IGVsID0gdmFsdWUuY2FsbChkb2N1bWVudCwgdGFnTmFtZSwgb3B0aW9ucyk7XG4gICAgICAgICAgcmV0dXJuIHNldFNhbmRib3hSZWYoZWwpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChwID09PSAnY3JlYXRlVGV4dE5vZGUnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGNvbnN0IGVsID0gdmFsdWUuY2FsbChkb2N1bWVudCwgZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHNldFNhbmRib3hSZWYoZWwpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChwID09PSAnaGVhZCcpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRUYXJnZXQocm9vdE5vZGUsIFsnaGVhZCcsIGBkaXZbJHtfX01vY2tIZWFkX199XWBdKSB8fCB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcm9vdE5vZGUgaXMgYSBTaGFkb3cgZG9tXG4gICAgICBpZiAoc3RyaWN0SXNvbGF0aW9uKSB7XG4gICAgICAgIGlmIChwID09PSAnYm9keScpIHtcbiAgICAgICAgICAvLyBXaGVuIHRoZSBub2RlIGlzIGluc2VydGVkLCBpZiBpdCBpcyBhIHBvcC11cCBzY2VuZSxcbiAgICAgICAgICAvLyBpdCBuZWVkcyB0byBiZSBwbGFjZWQgZ2xvYmFsbHksIHNvIGl0IGlzIG5vdCBwbGFjZWQgb3V0c2lkZSBieSBkZWZhdWx0LlxuICAgICAgICAgIHJldHVybiBmaW5kVGFyZ2V0KHJvb3ROb2RlLCBbJ2JvZHknLCBgZGl2WyR7X19Nb2NrQm9keV9ffV1gXSk7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlGdW5jdGlvbnMocCkpIHtcbiAgICAgICAgICByZXR1cm4gcCA9PT0gJ2dldEVsZW1lbnRCeUlkJ1xuICAgICAgICAgICAgPyAoaWQpID0+IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApXG4gICAgICAgICAgICA6IHJvb3ROb2RlW3BdLmJpbmQocm9vdE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGV0IG5ld1ZhbHVlID0gaGFzT3duKHZhbHVlLCBfX2RvY3VtZW50QmluZF9fKVxuICAgICAgICA/IHZhbHVlW19fZG9jdW1lbnRCaW5kX19dXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGlmICghbmV3VmFsdWUpIG5ld1ZhbHVlID0gYmluZCh2YWx1ZSwgZG9jdW1lbnQpO1xuXG4gICAgICBjb25zdCB2ZXJpZnlSZXN1bHQgPSB2ZXJpZnlHZXR0ZXJEZXNjcmlwdG9yKHRhcmdldCwgcCwgbmV3VmFsdWUpO1xuICAgICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAyKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdmFsdWVbX19kb2N1bWVudEJpbmRfX10gPSBuZXdWYWx1ZTtcbiAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5jb25zdCBzYWZhcmlQcm94eURvY3VtZW50RGVhbEhhbmRsZXIgPSBzYWZhcmkxM0RlYWwoKTtcblxuLy8gZG9jdW1lbnQgcHJveHkgc2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGVyKHNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcDogUHJvcGVydHlLZXksIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpID0+IHtcbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3RFbG0oc2FuZGJveCk7XG4gICAgY29uc3QgdmVyaWZ5UmVzdWx0ID0gdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcihcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgdHlwZW9mIHAgPT09ICdzdHJpbmcnICYmIHBhc3NlZEtleShwKVxuICAgICAgICA/IGRvY3VtZW50XG4gICAgICAgIDogKHJlY2VpdmVyIHx8IHRhcmdldCksXG4gICAgICBwLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgICBpZiAodmVyaWZ5UmVzdWx0ID4gMCkge1xuICAgICAgaWYgKHZlcmlmeVJlc3VsdCA9PT0gMSB8fCB2ZXJpZnlSZXN1bHQgPT09IDIpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDMpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFwcGxpY2F0aW9uIGFyZWEgb2YgdGhlIGJhbiBvbiBzZWxlY3RlZCwgaWYgdXNlcnMgd2FudCB0byBiYW4gdGhlIGdsb2JhbCBuZWVkIHRvIHNldCBvbiB0aGUgbWFpbiBhcHBsaWNhdGlvblxuICAgIGlmIChwID09PSAnb25zZWxlY3RzdGFydCcgfHwgcCA9PT0gJ29uZHJhZ3N0YXJ0Jykge1xuICAgICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldChyb290Tm9kZSwgcCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KGRvY3VtZW50LCBwLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwID09PSAnc3RyaW5nJyAmJiBwYXNzZWRLZXkocCkpIHtcbiAgICAgIHJldHVybiBSZWZsZWN0LnNldChkb2N1bWVudCwgcCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzYWZhcmlQcm94eURvY3VtZW50RGVhbEhhbmRsZXIudHJpZ2dlclNldCgpO1xuICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIGRvY3VtZW50IHByb3h5IGRlZmluZVByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVmaW5lUHJvcGVydHkoKSB7XG4gIHJldHVybiAodGFyZ2V0OiBhbnksIHA6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpID0+IHtcbiAgICBzYWZhcmlQcm94eURvY3VtZW50RGVhbEhhbmRsZXIuaGFuZGxlRGVzY3JpcHRvcihkZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gcGFzc2VkS2V5KHApXG4gICAgICA/IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQsIHAsIGRlc2NyaXB0b3IpXG4gICAgICA6IFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwLCBkZXNjcmlwdG9yKTtcbiAgfTtcbn1cblxuLy8gZG9jdW1lbnQgcHJveHkgaGFzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzKCkge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwOiBQcm9wZXJ0eUtleSkgPT4ge1xuICAgIGlmIChwID09PSAnYWN0aXZlRWxlbWVudCcpIHJldHVybiBSZWZsZWN0Lmhhcyhkb2N1bWVudCwgcCk7XG4gICAgcmV0dXJuIGhhc093bih0YXJnZXQsIHApIHx8IFJlZmxlY3QuaGFzKGRvY3VtZW50LCBwKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5pbXBvcnQgeyBfX3Byb3h5Tm9kZV9fIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRmFrZU9iamVjdCwgbWljcm9UYXNrSHRtbFByb3h5RG9jdW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge1xuICBjcmVhdGVIYXMsXG4gIGNyZWF0ZUdldHRlcixcbiAgY3JlYXRlU2V0dGVyLFxuICBjcmVhdGVEZWZpbmVQcm9wZXJ0eSxcbn0gZnJvbSAnLi4vcHJveHlJbnRlcmNlcHRvci9kb2N1bWVudCc7XG5cbmV4cG9ydCBjb25zdCBkb2N1bWVudE1vZHVsZSA9IChzYW5kYm94OiBTYW5kYm94KSA9PiB7XG4gIGxldCBwcm94eURvY3VtZW50ID0gT2JqZWN0LmNyZWF0ZShkb2N1bWVudCk7XG4gIGNvbnN0IGdldHRlciA9IGNyZWF0ZUdldHRlcihzYW5kYm94KTtcblxuICBjb25zdCBmYWtlRG9jdW1lbnQgPSBjcmVhdGVGYWtlT2JqZWN0KGRvY3VtZW50KTtcblxuICBjb25zdCBmYWtlRG9jdW1lbnRQcm90byA9IG5ldyBQcm94eShmYWtlRG9jdW1lbnQsIHtcbiAgICBnZXQ6ICguLi5hcmdzKSA9PiB7XG4gICAgICBtaWNyb1Rhc2tIdG1sUHJveHlEb2N1bWVudChwcm94eURvY3VtZW50KTtcbiAgICAgIHJldHVybiBnZXR0ZXIoLi4uYXJncyk7XG4gICAgfSxcbiAgICBoYXM6IGNyZWF0ZUhhcygpLFxuICB9KTtcbiAgXG5cbiAgcHJveHlEb2N1bWVudCA9IG5ldyBQcm94eShcbiAgICBPYmplY3QuY3JlYXRlKGZha2VEb2N1bWVudFByb3RvLCB7XG4gICAgICBjdXJyZW50U2NyaXB0OiB7XG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBbX19wcm94eU5vZGVfX106IHtcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogZG9jdW1lbnQsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHtcbiAgICAgIHNldDogY3JlYXRlU2V0dGVyKHNhbmRib3gpLFxuICAgICAgZGVmaW5lUHJvcGVydHk6IGNyZWF0ZURlZmluZVByb3BlcnR5KCksXG4gICAgICBnZXRQcm90b3R5cGVPZiAoKSB7XG4gICAgICAgIHJldHVybiBIVE1MRG9jdW1lbnQucHJvdG90eXBlIHx8IERvY3VtZW50LnByb3RvdHlwZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG92ZXJyaWRlOiB7XG4gICAgICBkb2N1bWVudDogcHJveHlEb2N1bWVudCxcbiAgICB9LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBnZXRUeXBlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG4vLyBUaGUgbG9naWMgb2YgVUlFdmVudCBpcyByZWZlcmVuY2VkIGZyb20gcWlhbmt1biB0eXBvZ3JhcGh5XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW1panMvcWlhbmt1bi9wdWxsLzU5My9maWxlc1xuLy8gVE9ETzogZml4IG5vcm1hbCBtb3VzZSBldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgPT09IGZhbHNlXG5leHBvcnQgY2xhc3MgTW91c2VFdmVudFBhdGNoIGV4dGVuZHMgTW91c2VFdmVudCB7XG4gIGNvbnN0cnVjdG9yKHR5cGVBcmc6IHN0cmluZywgbW91c2VFdmVudEluaXQ/OiBNb3VzZUV2ZW50SW5pdCkge1xuICAgIGlmIChtb3VzZUV2ZW50SW5pdCAmJiBnZXRUeXBlKG1vdXNlRXZlbnRJbml0LnZpZXcpID09PSAnd2luZG93Jykge1xuICAgICAgbW91c2VFdmVudEluaXQudmlldyA9IHdpbmRvdztcbiAgICB9XG4gICAgc3VwZXIodHlwZUFyZywgbW91c2VFdmVudEluaXQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVaUV2ZW50T3ZlcnJpZGUoKSB7XG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIE1vdXNlRXZlbnQ6IE1vdXNlRXZlbnRQYXRjaCBhcyBhbnksXG4gICAgfSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5pbXBvcnQgeyBHQVJGSVNIX05BTUVTUEFDRV9QUkVGSVggfSBmcm9tICcuLi9zeW1ib2xUeXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBDdXNTdG9yYWdlIHtcbiAgcHJlZml4OiBzdHJpbmc7XG4gIG5hbWVzcGFjZTogc3RyaW5nO1xuICByYXdTdG9yYWdlOiBTdG9yYWdlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWVzcGFjZTogc3RyaW5nLCByYXdTdG9yYWdlOiBTdG9yYWdlKSB7XG4gICAgdGhpcy5yYXdTdG9yYWdlID0gcmF3U3RvcmFnZTtcbiAgICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgICB0aGlzLnByZWZpeCA9IGAke0dBUkZJU0hfTkFNRVNQQUNFX1BSRUZJWH0ke25hbWVzcGFjZX1fX2A7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmdldEtleXMoKS5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIGdldEtleXMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmF3U3RvcmFnZSkuZmlsdGVyKChrZXkpID0+XG4gICAgICBrZXkuc3RhcnRzV2l0aCh0aGlzLnByZWZpeCksXG4gICAgKTtcbiAgfVxuXG4gIC8vIEdldCB0aGUgXCJuXCIga2V5IG9mIHRoZSBjdXJyZW50IG5hbWVzcGFjZSwgeW91IG5lZWQgdG8gcmVtb3ZlIHRoZSBwcmVmaXhcbiAga2V5KG46IG51bWJlcikge1xuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0S2V5cygpW25dO1xuICAgIHJldHVybiBrZXkgPyBrZXkuc3Vic3RyaW5nKHRoaXMucHJlZml4Lmxlbmd0aCkgOiBudWxsO1xuICB9XG5cbiAgZ2V0SXRlbShrZXlOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yYXdTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5wcmVmaXggKyBrZXlOYW1lfWApO1xuICB9XG5cbiAgc2V0SXRlbShrZXlOYW1lOiBzdHJpbmcsIGtleVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJhd1N0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLnByZWZpeCArIGtleU5hbWV9YCwga2V5VmFsdWUpO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShrZXlOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJhd1N0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLnByZWZpeCArIGtleU5hbWV9YCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmdldEtleXMoKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMucmF3U3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2FsU3RvcmFnZU1vZHVsZShzYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IG5hbWVzcGFjZSA9IHNhbmRib3gub3B0aW9ucy5uYW1lc3BhY2U7XG4gIHJldHVybiB7XG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIGxvY2FsU3RvcmFnZTogbmV3IEN1c1N0b3JhZ2UobmFtZXNwYWNlLCBsb2NhbFN0b3JhZ2UpLFxuICAgICAgc2Vzc2lvblN0b3JhZ2U6IG5ldyBDdXNTdG9yYWdlKG5hbWVzcGFjZSwgc2Vzc2lvblN0b3JhZ2UpLFxuICAgIH0sXG4gIH07XG59XG4iLCAiLy8gaW1wb3J0IHsgZmlsdGVyQW5kV3JhcEV2ZW50TGlzdGVuZXIgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5cbnR5cGUgT3B0cyA9IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucztcbnR5cGUgTGlzdGVuZXIgPSBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuZXJNb2R1bGUoX3NhbmRib3g6IFNhbmRib3gpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIExpc3RlbmVyW10+KCk7XG4gIGNvbnN0IHJhd0FkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgY29uc3QgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuXG4gIGZ1bmN0aW9uIGFkZExpc3RlbmVyKFxuICAgIHRoaXM6IGFueSxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgbGlzdGVuZXI6IExpc3RlbmVyLFxuICAgIG9wdGlvbnM/OiBPcHRzLFxuICApIHtcbiAgICBjb25zdCBjdXJMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgIGxpc3RlbmVycy5zZXQodHlwZSwgWy4uLmN1ckxpc3RlbmVycywgbGlzdGVuZXJdKTtcblxuICAgIC8vIFRoaXMgaGFzIGJlZW4gcmV2aXNlZFxuICAgIHJhd0FkZEV2ZW50TGlzdGVuZXIuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICB0eXBlLFxuICAgICAgLy8gZmlsdGVyQW5kV3JhcEV2ZW50TGlzdGVuZXIoXG4gICAgICAvLyAgIHR5cGUsXG4gICAgICAvLyAgIGxpc3RlbmVyLFxuICAgICAgLy8gICBfc2FuZGJveC5vcHRpb25zLnNvdXJjZUxpc3QubWFwKChpdGVtKSA9PiBpdGVtLnVybCksXG4gICAgICAvLyApLFxuICAgICAgbGlzdGVuZXIsXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihcbiAgICB0aGlzOiBhbnksXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyOiBMaXN0ZW5lcixcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEV2ZW50TGlzdGVuZXJPcHRpb25zLFxuICApIHtcbiAgICBjb25zdCBjdXJMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0KHR5cGUpIHx8IFtdO1xuICAgIGNvbnN0IGlkeCA9IGN1ckxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgY3VyTGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgICBsaXN0ZW5lcnMuc2V0KHR5cGUsIFsuLi5jdXJMaXN0ZW5lcnNdKTtcbiAgICByYXdSZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgY29uc3QgcmVjb3ZlciA9ICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGtleSkgPT4ge1xuICAgICAgbGlzdGVuZXIuZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgICAgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHdpbmRvdywga2V5LCBmbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBsaXN0ZW5lcnMuY2xlYXIoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlY292ZXIsXG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGFkZExpc3RlbmVyLmJpbmQod2luZG93KSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IHJlbW92ZUxpc3RlbmVyLmJpbmQod2luZG93KSxcbiAgICB9LFxuICAgIGNyZWF0ZWQoZ2xvYmFsOiBTYW5kYm94WydnbG9iYWwnXSkge1xuICAgICAgY29uc3QgZmFrZURvY3VtZW50ID0gZ2xvYmFsPy5kb2N1bWVudDtcbiAgICAgIGlmIChmYWtlRG9jdW1lbnQpIHtcbiAgICAgICAgZmFrZURvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRMaXN0ZW5lci5iaW5kKGRvY3VtZW50KTtcbiAgICAgICAgZmFrZURvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVMaXN0ZW5lci5iaW5kKGRvY3VtZW50KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCB7IFNhbmRib3ggfSBmcm9tICcuLi9zYW5kYm94JztcblxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVyTW9kdWxlKF9zYW5kYm94OiBTYW5kYm94KSB7XG4gIGNvbnN0IG9ic2VydmVyU2V0ID0gbmV3IFNldDxNdXRhdGlvbk9ic2VydmVyPigpO1xuXG4gIGNsYXNzIFByb3h5TXV0YXRpb25PYnNlcnZlciBleHRlbmRzIE11dGF0aW9uT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNiOiBNdXRhdGlvbkNhbGxiYWNrKSB7XG4gICAgICBzdXBlcihjYik7XG4gICAgICBvYnNlcnZlclNldC5hZGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjb3ZlciA9ICgpID0+IHtcbiAgICBvYnNlcnZlclNldC5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlci5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJTZXQuY2xlYXIoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlY292ZXIsXG4gICAgb3ZlcnJpZGU6IHtcbiAgICAgIE11dGF0aW9uT2JzZXJ2ZXI6IFByb3h5TXV0YXRpb25PYnNlcnZlciBhcyBGdW5jdGlvbixcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IHJhd1NldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcbmNvbnN0IHJhd0NsZWFyVGltZW91dCA9IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5jb25zdCByYXdTZXRJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbDtcbmNvbnN0IHJhd0NsZWFySW50ZXJ2YWwgPSB3aW5kb3cuY2xlYXJJbnRlcnZhbDtcblxuZXhwb3J0IGNvbnN0IHRpbWVvdXRNb2R1bGUgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVvdXQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBjb25zdCBzZXRUaW1lb3V0ID0gKGhhbmRsZXI6IFRpbWVySGFuZGxlciwgbXM/OiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3QgdGltZW91dElkID0gcmF3U2V0VGltZW91dChoYW5kbGVyLCBtcywgLi4uYXJncyk7XG4gICAgdGltZW91dC5hZGQodGltZW91dElkKTtcbiAgICByZXR1cm4gdGltZW91dElkO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyVGltZW91dCA9ICh0aW1lb3V0SWQ6IG51bWJlcikgPT4ge1xuICAgIHRpbWVvdXQuZGVsZXRlKHRpbWVvdXRJZCk7XG4gICAgcmF3Q2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gIH07XG5cbiAgY29uc3QgcmVjb3ZlciA9ICgpID0+IHtcbiAgICB0aW1lb3V0LmZvckVhY2goKHRpbWVvdXRJZCkgPT4ge1xuICAgICAgcmF3Q2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWNvdmVyLFxuICAgIG92ZXJyaWRlOiB7XG4gICAgICBzZXRUaW1lb3V0LFxuICAgICAgY2xlYXJUaW1lb3V0LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgaW50ZXJ2YWxNb2R1bGUgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVvdXQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBjb25zdCBzZXRJbnRlcnZhbCA9IChcbiAgICBjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxuICAgIG1zOiBudW1iZXIsXG4gICAgLi4uYXJnczogYW55W11cbiAgKSA9PiB7XG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHJhd1NldEludGVydmFsKGNhbGxiYWNrLCBtcywgLi4uYXJncyk7XG4gICAgdGltZW91dC5hZGQoaW50ZXJ2YWxJZCk7XG4gICAgcmV0dXJuIGludGVydmFsSWQ7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJJbnRlcnZhbCA9IChpbnRlcnZhbElkOiBudW1iZXIpID0+IHtcbiAgICB0aW1lb3V0LmRlbGV0ZShpbnRlcnZhbElkKTtcbiAgICByYXdDbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICB9O1xuXG4gIGNvbnN0IHJlY292ZXIgPSAoKSA9PiB7XG4gICAgdGltZW91dC5mb3JFYWNoKChpbnRlcnZhbElkKSA9PiB7XG4gICAgICByYXdDbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVjb3ZlcixcbiAgICBvdmVycmlkZToge1xuICAgICAgc2V0SW50ZXJ2YWwsXG4gICAgICBjbGVhckludGVydmFsLFxuICAgICAgLy8gd2VicGFjayBsYXp5IHVzZSBQcm9taXNlXG4gICAgICAvLyBQcm9taXNlIGlzIHBvbHlmaWxsXG4gICAgICAvLyBwb2x5ZmlsbCBQcm9taXNlIGluY2x1ZGUgUHJvbWlzZS5fc2V0SW1tZWRpYXRlIHVzZSBzZXRJbW1lZGlhdGUgbWV0aG9kc1xuICAgICAgLy8gc2V0SW1tZWRpYXRlIHBvbHlmaWxsIHBvc3RNZXNzYWdlIGFzIG1hcmNvIHRhc2tzXG4gICAgICAvLyBwb3N0TWVzc2FnZSBjYWxsYmFjayBqdWRnZSBldmVudC5zb3VyY2UgPT09IHdpbmRvd1xuICAgICAgLy8gdXNlIHNldFRpbWVvdXQgYXMgc2V0SW1tZWRpYXRlIGF2b2lkIGp1ZGdlIGZhaWxcbiAgICAgIHNldEltbWVkaWF0ZTogKGZuKSA9PiBzZXRUaW1lb3V0KGZuLCAwKSxcbiAgICB9LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBoYW5kbGVyUGFyYW1zIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SGFuZGxlclBhcmFtcygpIHtcbiAgaWYgKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgY29uc3QgcmF3T2JzZXJ2ZXIgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZTtcbiAgICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJhd09ic2VydmVyLmFwcGx5KHRoaXMsIGhhbmRsZXJQYXJhbXMoYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGluIGlmcmFtZSBub3QgbW9kaWZ5IGFjdGl2ZUVsZW1lbnRcbiAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgd2luZG93LkRvY3VtZW50LnByb3RvdHlwZSxcbiAgICAnYWN0aXZlRWxlbWVudCcsXG4gICk7XG4gIGNvbnN0IHJhd0FjdGl2ZUVsID0gZGVzYyAmJiBkZXNjLmdldDtcbiAgaWYgKHJhd0FjdGl2ZUVsKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUsICdhY3RpdmVFbGVtZW50Jywge1xuICAgICAgZ2V0KC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHJhd0FjdGl2ZUVsLmFwcGx5KGhhbmRsZXJQYXJhbXMoW3RoaXNdKVswXSwgaGFuZGxlclBhcmFtcyhhcmdzKSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU3R5bGVNYW5hZ2VyLCBKYXZhU2NyaXB0TWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICBkZWYsXG4gIHdhcm4sXG4gIERPTUFwaXMsXG4gIG1ha2VNYXAsXG4gIGlzSnNUeXBlLFxuICBpc0Nzc1R5cGUsXG4gIHNhZmVXcmFwcGVyLFxuICBmaW5kVGFyZ2V0LFxuICBfX01vY2tCb2R5X18sXG4gIF9fTW9ja0hlYWRfXyxcbiAgdHJhbnNmb3JtVXJsLFxuICBzb3VyY2VMaXN0VGFncyxcbiAgX19SRU1PVkVfTk9ERV9fLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi4vc2FuZGJveCc7XG5pbXBvcnQgeyByb290RWxtLCBpc1N0eWxlZENvbXBvbmVudHNMaWtlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBpc0luc2VydE1ldGhvZCA9IG1ha2VNYXAoWydpbnNlcnRCZWZvcmUnLCAnaW5zZXJ0QWRqYWNlbnRFbGVtZW50J10pO1xuXG5leHBvcnQgY29uc3QgcmF3RWxlbWVudE1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY05vZGVQcm9jZXNzb3Ige1xuICBwcml2YXRlIGVsOiBhbnk7IC8vIGFueSBFbGVtZW50XG4gIHByaXZhdGUgdGFnTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHNhbmRib3g6IFNhbmRib3g7XG4gIHByaXZhdGUgRE9NQXBpczogRE9NQXBpcztcbiAgcHJpdmF0ZSBtZXRob2ROYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcm9vdEVsZW1lbnQ6IEVsZW1lbnQgfCBTaGFkb3dSb290IHwgRG9jdW1lbnQ7XG4gIHByaXZhdGUgbmF0aXZlQXBwZW5kID0gcmF3RWxlbWVudE1ldGhvZHNbJ2FwcGVuZENoaWxkJ107XG4gIHByaXZhdGUgbmF0aXZlUmVtb3ZlID0gcmF3RWxlbWVudE1ldGhvZHNbJ3JlbW92ZUNoaWxkJ107XG5cbiAgY29uc3RydWN0b3IoZWwsIHNhbmRib3gsIG1ldGhvZE5hbWUpIHtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5zYW5kYm94ID0gc2FuZGJveDtcbiAgICB0aGlzLm1ldGhvZE5hbWUgPSBtZXRob2ROYW1lO1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSByb290RWxtKHNhbmRib3gpIHx8IGRvY3VtZW50O1xuICAgIHRoaXMuRE9NQXBpcyA9IG5ldyBET01BcGlzKHNhbmRib3guZ2xvYmFsLmRvY3VtZW50KTtcbiAgICB0aGlzLnRhZ05hbWUgPSBlbC50YWdOYW1lID8gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGlzKHRhZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudGFnTmFtZSA9PT0gdGFnO1xuICB9XG5cbiAgcHJpdmF0ZSBmaXhSZXNvdXJjZU5vZGVVcmwoZWw6IGFueSkge1xuICAgIGNvbnN0IGJhc2VVcmwgPSB0aGlzLnNhbmRib3gub3B0aW9ucy5iYXNlVXJsO1xuICAgIGlmIChiYXNlVXJsKSB7XG4gICAgICBjb25zdCBzcmMgPSBlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgY29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgc3JjICYmIChlbC5zcmMgPSB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgc3JjKSk7XG4gICAgICBocmVmICYmIChlbC5ocmVmID0gdHJhbnNmb3JtVXJsKGJhc2VVcmwsIGhyZWYpKTtcbiAgICAgIGNvbnN0IHVybCA9IGVsLnNyYyB8fCBlbC5ocmVmO1xuXG4gICAgICBpZiAodXJsICYmIHRoaXMuc2FuZGJveC5vcHRpb25zLmFkZFNvdXJjZUxpc3QpIHtcbiAgICAgICAgdGhpcy5zYW5kYm94Lm9wdGlvbnMuYWRkU291cmNlTGlzdCh7XG4gICAgICAgICAgdGFnTmFtZTogZWwudGFnTmFtZSxcbiAgICAgICAgICB1cmwsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFB1dCBpdCBpbiB0aGUgbmV4dCBtYWNybyB0YXNrIHRvIGVuc3VyZSB0aGF0IHRoZSBjdXJyZW50IHN5bmNocm9uaXphdGlvbiBzY3JpcHQgaXMgZXhlY3V0ZWRcbiAgcHJpdmF0ZSBkaXNwYXRjaEV2ZW50KHR5cGU6IHN0cmluZywgZXJySW5mbz86IEVycm9yRXZlbnRJbml0KSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBpc0Vycm9yID0gdHlwZSA9PT0gJ2Vycm9yJztcbiAgICAgIGxldCBldmVudDogRXZlbnQgJiB7IF9fYnlHYXJmaXNoX18/OiBib29sZWFuIH07XG5cbiAgICAgIGlmIChpc0Vycm9yICYmIGVyckluZm8pIHtcbiAgICAgICAgZXZlbnQgPSBuZXcgRXJyb3JFdmVudCh0eXBlLCB7XG4gICAgICAgICAgLi4uZXJySW5mbyxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJJbmZvLmVycm9yLm1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQgPSBuZXcgRXZlbnQodHlwZSk7XG4gICAgICB9XG4gICAgICBldmVudC5fX2J5R2FyZmlzaF9fID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3RhcmdldCcsIHsgdmFsdWU6IHRoaXMuZWwgfSk7XG4gICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgaXNFcnJvciAmJiB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBMb2FkIGR5bmFtaWMgbGluayBub2RlXG4gIHByaXZhdGUgYWRkRHluYW1pY0xpbmtOb2RlKGNhbGxiYWNrOiAoc3R5bGVOb2RlOiBIVE1MU3R5bGVFbGVtZW50KSA9PiB2b2lkKSB7XG4gICAgY29uc3QgeyBocmVmLCB0eXBlIH0gPSB0aGlzLmVsO1xuXG4gICAgaWYgKCF0eXBlIHx8IGlzQ3NzVHlwZSh7IHNyYzogaHJlZiwgdHlwZSB9KSkge1xuICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgY29uc3QgeyBiYXNlVXJsLCBuYW1lc3BhY2UsIHN0eWxlU2NvcGVJZCB9ID0gdGhpcy5zYW5kYm94Lm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IGZldGNoVXJsID0gYmFzZVVybCA/IHRyYW5zZm9ybVVybChiYXNlVXJsLCBocmVmKSA6IGhyZWY7XG5cbiAgICAgICAgdGhpcy5zYW5kYm94LmxvYWRlclxuICAgICAgICAgIC5sb2FkPFN0eWxlTWFuYWdlcj4oe1xuICAgICAgICAgICAgc2NvcGU6IG5hbWVzcGFjZSxcbiAgICAgICAgICAgIHVybDogZmV0Y2hVcmwsXG4gICAgICAgICAgICBkZWZhdWx0Q29udGVudFR5cGU6IHR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoeyByZXNvdXJjZU1hbmFnZXI6IHN0eWxlTWFuYWdlciB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3R5bGVNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgIHN0eWxlTWFuYWdlci5jb3JyZWN0UGF0aCgpO1xuICAgICAgICAgICAgICBpZiAoc3R5bGVTY29wZUlkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVNYW5hZ2VyLnNldFNjb3BlKHtcbiAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgIHJvb3RFbElkOiBzdHlsZVNjb3BlSWQoKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYWxsYmFjayhzdHlsZU1hbmFnZXIucmVuZGVyQXNTdHlsZUVsZW1lbnQoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIHJlc291cmNlIHR5cGUgXCIke3R5cGV9XCIsIFwiJHtocmVmfVwiIGNhbid0IGdlbmVyYXRlIHN0eWxlTWFuYWdlcmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2xvYWQnKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihlKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnZXJyb3InLCB7XG4gICAgICAgICAgICAgIGVycm9yOiBlLFxuICAgICAgICAgICAgICBmaWxlbmFtZTogZmV0Y2hVcmwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgIHdhcm4oYEludmFsaWQgcmVzb3VyY2UgdHlwZSBcIiR7dHlwZX1cIiwgXCIke2hyZWZ9XCJgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVG8gZW5zdXJlIHRoZSBwcm9jZXNzaW5nIG5vZGUgdG8gbm9ybWFsIGhhcyBiZWVuIHJlbW92ZWRcbiAgICBjb25zdCBsaW5rQ29tbWVudE5vZGUgPSB0aGlzLkRPTUFwaXMuY3JlYXRlTGlua0NvbW1lbnROb2RlKGhyZWYpIGFzIENvbW1lbnQ7XG4gICAgdGhpcy5lbFtfX1JFTU9WRV9OT0RFX19dID0gKCkgPT5cbiAgICAgIHRoaXMuRE9NQXBpcy5yZW1vdmVFbGVtZW50KGxpbmtDb21tZW50Tm9kZSk7XG4gICAgcmV0dXJuIGxpbmtDb21tZW50Tm9kZTtcbiAgfVxuXG4gIC8vIExvYWQgZHluYW1pYyBqcyBzY3JpcHRcbiAgcHJpdmF0ZSBhZGREeW5hbWljU2NyaXB0Tm9kZSgpIHtcbiAgICBjb25zdCB7IHNyYywgdHlwZSwgY3Jvc3NPcmlnaW4gfSA9IHRoaXMuZWw7XG4gICAgY29uc3QgaXNNb2R1bGUgPSB0eXBlID09PSAnbW9kdWxlJztcbiAgICBjb25zdCBjb2RlID0gdGhpcy5lbC50ZXh0Q29udGVudCB8fCB0aGlzLmVsLnRleHQgfHwgJyc7XG5cbiAgICBpZiAoIXR5cGUgfHwgaXNKc1R5cGUoeyBzcmMsIHR5cGUgfSkpIHtcbiAgICAgIC8vIFRoZSBcInNyY1wiIGhpZ2hlciBwcmlvcml0eVxuICAgICAgY29uc3QgeyBiYXNlVXJsLCBuYW1lc3BhY2UgfSA9IHRoaXMuc2FuZGJveC5vcHRpb25zO1xuICAgICAgaWYgKHNyYykge1xuICAgICAgICBjb25zdCBmZXRjaFVybCA9IGJhc2VVcmwgPyB0cmFuc2Zvcm1VcmwoYmFzZVVybCwgc3JjKSA6IHNyYztcbiAgICAgICAgdGhpcy5zYW5kYm94LmxvYWRlclxuICAgICAgICAgIC5sb2FkPEphdmFTY3JpcHRNYW5hZ2VyPih7XG4gICAgICAgICAgICBzY29wZTogbmFtZXNwYWNlLFxuICAgICAgICAgICAgdXJsOiBmZXRjaFVybCxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luLFxuICAgICAgICAgICAgZGVmYXVsdENvbnRlbnRUeXBlOiB0eXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAobWFuYWdlcikgPT4ge1xuICAgICAgICAgICAgICBpZiAobWFuYWdlci5yZXNvdXJjZU1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICByZXNvdXJjZU1hbmFnZXI6IHsgdXJsLCBzY3JpcHRDb2RlIH0sXG4gICAgICAgICAgICAgICAgfSA9IG1hbmFnZXI7XG4gICAgICAgICAgICAgICAgLy8gSXQgaXMgbmVjZXNzYXJ5IHRvIGVuc3VyZSB0aGF0IHRoZSBjb2RlIGV4ZWN1dGlvbiBlcnJvciBjYW5ub3QgdHJpZ2dlciB0aGUgYGVsLm9uZXJyb3JgIGV2ZW50XG4gICAgICAgICAgICAgICAgdGhpcy5zYW5kYm94LmV4ZWNTY3JpcHQoc2NyaXB0Q29kZSwge30sIHVybCwge1xuICAgICAgICAgICAgICAgICAgaXNNb2R1bGUsXG4gICAgICAgICAgICAgICAgICBub0VudHJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgb3JpZ2luU2NyaXB0OiB0aGlzLmVsLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICAgICBgSW52YWxpZCByZXNvdXJjZSB0eXBlIFwiJHt0eXBlfVwiLCBcIiR7c3JjfVwiIGNhbid0IGdlbmVyYXRlIHNjcmlwdE1hbmFnZXJgLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdsb2FkJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybihlKTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmV0Y2hVcmwsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChjb2RlKSB7XG4gICAgICAgIHRoaXMuc2FuZGJveC5leGVjU2NyaXB0KGNvZGUsIHt9LCBiYXNlVXJsLCB7IG5vRW50cnk6IHRydWUsIG9yaWdpblNjcmlwdDogdGhpcy5lbCwgfSk7XG4gICAgICB9XG4gICAgICAvLyBUbyBlbnN1cmUgdGhlIHByb2Nlc3Npbmcgbm9kZSB0byBub3JtYWwgaGFzIGJlZW4gcmVtb3ZlZFxuICAgICAgY29uc3Qgc2NyaXB0Q29tbWVudE5vZGUgPSB0aGlzLkRPTUFwaXMuY3JlYXRlU2NyaXB0Q29tbWVudE5vZGUoe1xuICAgICAgICBzcmMsXG4gICAgICAgIGNvZGUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZWxbX19SRU1PVkVfTk9ERV9fXSA9ICgpID0+XG4gICAgICAgIHRoaXMuRE9NQXBpcy5yZW1vdmVFbGVtZW50KHNjcmlwdENvbW1lbnROb2RlKTtcbiAgICAgIHJldHVybiBzY3JpcHRDb21tZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWw7XG4gIH1cblxuICAvLyBXaGVuIGFwcGVuZCBhbiBlbXB0eSBsaW5rIG5vZGUgYW5kIHRoZW4gYWRkIGhyZWYgYXR0cmlidXRlXG4gIHByaXZhdGUgbW9uaXRvckNoYW5nZXNPZkxpbmtOb2RlKCkge1xuICAgIGlmICh0aGlzLmVsLm1vZGlmeUZsYWcpIHJldHVybjtcblxuICAgIGNvbnN0IG11dGF0b3IgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICBpZiAodGhpcy5lbC5tb2RpZnlGbGFnKSByZXR1cm47XG4gICAgICBmb3IgKGNvbnN0IHsgdHlwZSwgYXR0cmlidXRlTmFtZSB9IG9mIG11dGF0aW9ucykge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICdyZWwnIHx8IGF0dHJpYnV0ZU5hbWUgPT09ICdzdHlsZXNoZWV0Jykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWwubW9kaWZ5RmxhZykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHRoaXMuZWwucmVsID09PSAnc3R5bGVzaGVldCcgJiYgdGhpcy5lbC5ocmVmKSB7XG4gICAgICAgICAgICAgIHRoaXMuZWwuZGlzYWJsZWQgPSB0aGlzLmVsLm1vZGlmeUZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICBjb25zdCBjb21tZW50Tm9kZSA9IHRoaXMuYWRkRHluYW1pY0xpbmtOb2RlKChzdHlsZU5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb21tZW50Tm9kZS5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoc3R5bGVOb2RlLCBjb21tZW50Tm9kZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChjb21tZW50Tm9kZSwgdGhpcy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL011dGF0aW9uT2JzZXJ2ZXIvZGlzY29ubmVjdFxuICAgIG11dGF0b3Iub2JzZXJ2ZSh0aGlzLmVsLCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gIH1cblxuICBwcml2YXRlIG1vbml0b3JDaGFuZ2VzT2ZTdHlsZSgpIHtcbiAgICBjb25zdCB7IGJhc2VVcmwsIG5hbWVzcGFjZSwgc3R5bGVTY29wZUlkIH0gPSB0aGlzLnNhbmRib3gub3B0aW9ucztcbiAgICBjb25zdCByb290RWxJZCA9IHN0eWxlU2NvcGVJZD8uKCk7XG5cbiAgICBjb25zdCBtb2RpZnlTdHlsZUNvZGUgPSAoc3R5bGVDb2RlOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICBpZiAoc3R5bGVDb2RlKSB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgU3R5bGVNYW5hZ2VyKHN0eWxlQ29kZSk7XG4gICAgICAgIG1hbmFnZXIuY29ycmVjdFBhdGgoYmFzZVVybCk7XG4gICAgICAgIGlmIChyb290RWxJZCkge1xuICAgICAgICAgIG1hbmFnZXIuc2V0U2NvcGUoe1xuICAgICAgICAgICAgcm9vdEVsSWQsXG4gICAgICAgICAgICBhcHBOYW1lOiBuYW1lc3BhY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVDb2RlID0gbWFuYWdlci50cmFuc2Zvcm1Db2RlKHN0eWxlQ29kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVDb2RlO1xuICAgIH07XG5cbiAgICBjb25zdCBtdXRhdG9yID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgZm9yIChjb25zdCB7IHR5cGUsIHRhcmdldCwgYWRkZWROb2RlcyB9IG9mIG11dGF0aW9ucykge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IHRhcmdldCBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgICAgICAgIGlmIChpc1N0eWxlZENvbXBvbmVudHNMaWtlKGVsKSAmJiBlbC5zaGVldCkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luQWRkUnVsZSA9IGVsLnNoZWV0Lmluc2VydFJ1bGU7XG4gICAgICAgICAgICBlbC5zaGVldC5pbnNlcnRSdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBtb2RpZnlTdHlsZUNvZGUoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbkFkZFJ1bGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGRlZE5vZGVzWzBdKSB7XG4gICAgICAgICAgICAgIGFkZGVkTm9kZXNbMF0udGV4dENvbnRlbnQgPSBtb2RpZnlTdHlsZUNvZGUoXG4gICAgICAgICAgICAgICAgYWRkZWROb2Rlc1swXS50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBtdXRhdG9yLm9ic2VydmUodGhpcy5lbCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRQYXJlbnROb2RlSW5BcHAocGFyZW50Tm9kZTogRWxlbWVudCwgZGVmYXVsdEluc2VydD86IHN0cmluZykge1xuICAgIGlmIChwYXJlbnROb2RlID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICByZXR1cm4gZmluZFRhcmdldCh0aGlzLnJvb3RFbGVtZW50LCBbXG4gICAgICAgICdib2R5JyxcbiAgICAgICAgYGRpdlske19fTW9ja0JvZHlfX31dYCxcbiAgICAgIF0pIGFzIEVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmIChwYXJlbnROb2RlID09PSBkb2N1bWVudC5oZWFkKSB7XG4gICAgICByZXR1cm4gZmluZFRhcmdldCh0aGlzLnJvb3RFbGVtZW50LCBbXG4gICAgICAgICdoZWFkJyxcbiAgICAgICAgYGRpdlske19fTW9ja0hlYWRfX31dYCxcbiAgICAgIF0pIGFzIEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGVzdGluYXRpb24gbm9kZSBpcyBub3QgYSBjb250YWluZXIgdG8gdGhlIGNvbnRhaW5lciBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAvLyBIYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGNvbnRhaW5lciwgb3IgY2Fubm90IGJlIHNlYXJjaGVkIHRocm91Z2ggZG9jdW1lbnQgaW4gc2hhZG93IGRvbVxuICAgIGlmIChcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuY29udGFpbnMocGFyZW50Tm9kZSkgfHxcbiAgICAgICFkb2N1bWVudC5jb250YWlucyhwYXJlbnROb2RlKVxuICAgICkge1xuICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgaWYgKGRlZmF1bHRJbnNlcnQgPT09ICdoZWFkJykge1xuICAgICAgcmV0dXJuIGZpbmRUYXJnZXQodGhpcy5yb290RWxlbWVudCwgW1xuICAgICAgICAnaGVhZCcsXG4gICAgICAgIGBkaXZbJHtfX01vY2tIZWFkX199XWAsXG4gICAgICBdKSBhcyBFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAoZGVmYXVsdEluc2VydCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZmluZFRhcmdldCh0aGlzLnJvb3RFbGVtZW50LCBbXG4gICAgICAgICdib2R5JyxcbiAgICAgICAgYGRpdlske19fTW9ja0JvZHlfX31dYCxcbiAgICAgIF0pIGFzIEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnROb2RlO1xuICB9XG5cbiAgYXBwZW5kKGNvbnRleHQ6IEVsZW1lbnQsIGFyZ3M6IElBcmd1bWVudHMsIG9yaWdpblByb2Nlc3M6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IGNvbnZlcnRlZE5vZGU7XG4gICAgbGV0IHBhcmVudE5vZGUgPSBjb250ZXh0O1xuICAgIGNvbnN0IHsgYmFzZVVybCwgbmFtZXNwYWNlLCBzdHlsZVNjb3BlSWQgfSA9IHRoaXMuc2FuZGJveC5vcHRpb25zO1xuXG4gICAgLy8gRGVhbCB3aXRoIHNvbWUgc3RhdGljIHJlc291cmNlIG5vZGVzXG4gICAgaWYgKHNvdXJjZUxpc3RUYWdzLmluY2x1ZGVzKHRoaXMudGFnTmFtZSkpIHtcbiAgICAgIHRoaXMuZml4UmVzb3VyY2VOb2RlVXJsKHRoaXMuZWwpO1xuICAgIH1cblxuICAgIC8vIEFkZCBkeW5hbWljIHNjcmlwdCBub2RlIGJ5IGxvYWRlclxuICAgIGlmICh0aGlzLmlzKCdzY3JpcHQnKSkge1xuICAgICAgcGFyZW50Tm9kZSA9IHRoaXMuZmluZFBhcmVudE5vZGVJbkFwcChjb250ZXh0LCAnYm9keScpO1xuICAgICAgY29udmVydGVkTm9kZSA9IHRoaXMuYWRkRHluYW1pY1NjcmlwdE5vZGUoKTtcbiAgICB9XG4gICAgLy8gVGhlIHN0eWxlIG5vZGUgbmVlZHMgdG8gYmUgcGxhY2VkIGluIHRoZSBzYW5kYm94IHJvb3QgY29udGFpbmVyXG4gICAgZWxzZSBpZiAodGhpcy5pcygnc3R5bGUnKSkge1xuICAgICAgcGFyZW50Tm9kZSA9IHRoaXMuZmluZFBhcmVudE5vZGVJbkFwcChjb250ZXh0LCAnaGVhZCcpO1xuICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBTdHlsZU1hbmFnZXIodGhpcy5lbC50ZXh0Q29udGVudCk7XG4gICAgICBtYW5hZ2VyLmNvcnJlY3RQYXRoKGJhc2VVcmwpO1xuICAgICAgaWYgKHN0eWxlU2NvcGVJZCkge1xuICAgICAgICBtYW5hZ2VyLnNldFNjb3BlKHtcbiAgICAgICAgICBhcHBOYW1lOiBuYW1lc3BhY2UsXG4gICAgICAgICAgcm9vdEVsSWQ6IHN0eWxlU2NvcGVJZCgpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZWwudGV4dENvbnRlbnQgPSBtYW5hZ2VyLnRyYW5zZm9ybUNvZGUobWFuYWdlci5zdHlsZUNvZGUpO1xuICAgICAgY29udmVydGVkTm9kZSA9IHRoaXMuZWw7XG4gICAgICB0aGlzLnNhbmRib3guZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LmFkZCh0aGlzLmVsKTtcbiAgICAgIHRoaXMubW9uaXRvckNoYW5nZXNPZlN0eWxlKCk7XG4gICAgfVxuICAgIC8vIFRoZSBsaW5rIG5vZGUgb2YgdGhlIHJlcXVlc3QgY3NzIG5lZWRzIHRvIGJlIGNoYW5nZWQgdG8gc3R5bGUgbm9kZVxuICAgIGVsc2UgaWYgKHRoaXMuaXMoJ2xpbmsnKSkge1xuICAgICAgcGFyZW50Tm9kZSA9IHRoaXMuZmluZFBhcmVudE5vZGVJbkFwcChjb250ZXh0LCAnaGVhZCcpO1xuICAgICAgaWYgKHRoaXMuZWwucmVsID09PSAnc3R5bGVzaGVldCcgJiYgdGhpcy5lbC5ocmVmKSB7XG4gICAgICAgIGNvbnZlcnRlZE5vZGUgPSB0aGlzLmFkZER5bmFtaWNMaW5rTm9kZSgoc3R5bGVOb2RlKSA9PlxuICAgICAgICAgIHRoaXMubmF0aXZlQXBwZW5kLmNhbGwocGFyZW50Tm9kZSwgc3R5bGVOb2RlKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnZlcnRlZE5vZGUgPSB0aGlzLmVsO1xuICAgICAgICB0aGlzLm1vbml0b3JDaGFuZ2VzT2ZMaW5rTm9kZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbGxlY3Qgbm9kZXMgdGhhdCBlc2NhcGUgdGhlIGNvbnRhaW5lciBub2RlXG4gICAgaWYgKFxuICAgICAgIXRoaXMucm9vdEVsZW1lbnQuY29udGFpbnMocGFyZW50Tm9kZSkgJiZcbiAgICAgIGRvY3VtZW50LmNvbnRhaW5zKHBhcmVudE5vZGUpXG4gICAgKSB7XG4gICAgICBpZiAocGFyZW50Tm9kZSAhPT0gdGhpcy5yb290RWxlbWVudCkge1xuICAgICAgICB0aGlzLnNhbmRib3guZGVmZXJDbGVhckVmZmVjdHMuYWRkKCgpID0+IHtcbiAgICAgICAgICB0aGlzLkRPTUFwaXMucmVtb3ZlRWxlbWVudCh0aGlzLmVsKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZml4IGlubmVySFRNTCBkb20gaWZyYW1lXHUzMDAxaW1nIHNyY1xuICAgIGlmICh0aGlzLmVsICYmIHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgbGV0IG5lZWRGaXhEb20gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZSxpbWcsdmlkZW8sbGluayxzY3JpcHQsYXVkaW8sc3R5bGUnKTtcbiAgICAgIGlmIChuZWVkRml4RG9tLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmVlZEZpeERvbS5mb3JFYWNoKChkb20pPT57XG4gICAgICAgICAgc2FmZVdyYXBwZXIoKCk9PiB0aGlzLmZpeFJlc291cmNlTm9kZVVybChkb20pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRml4IHRoZSBidWcgb2YgcmVhY3QgaG1yXG4gICAgaWYgKHRoaXMuaXMoJ2lmcmFtZScpICYmIHR5cGVvZiB0aGlzLmVsLm9ubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgeyBlbCwgc2FuZGJveCB9ID0gdGhpcztcbiAgICAgIGNvbnN0IG9yaWdpbk9ubG9hZCA9IGVsLm9ubG9hZDtcbiAgICAgIGVsLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2FmZVdyYXBwZXIoKCkgPT4gZGVmKGVsLmNvbnRlbnRXaW5kb3csICdwYXJlbnQnLCBzYW5kYm94Lmdsb2JhbCkpO1xuICAgICAgICByZXR1cm4gb3JpZ2luT25sb2FkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjb252ZXJ0ZWROb2RlKSB7XG4gICAgICAvLyBJZiBpdCBpcyBcImluc2VydEJlZm9yZVwiIG9yIFwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50XCIgbWV0aG9kLCBubyBuZWVkIHRvIHJld3JpdGUgd2hlbiBhZGRlZCB0byB0aGUgY29udGFpbmVyXG4gICAgICBpZiAoXG4gICAgICAgIGlzSW5zZXJ0TWV0aG9kKHRoaXMubWV0aG9kTmFtZSkgJiZcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jb250YWlucyhjb250ZXh0KSAmJlxuICAgICAgICBhcmdzWzFdPy5wYXJlbnROb2RlID09PSBjb250ZXh0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpblByb2Nlc3MoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW1pdCBzYW5kYm94IGBhcHBlbmROb2RlYCBldmVudFxuICAgICAgdGhpcy5zYW5kYm94Lmhvb2tzLmxpZmVjeWNsZS5hcHBlbmROb2RlLmVtaXQoXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIHRoaXMuZWwsXG4gICAgICAgIGNvbnZlcnRlZE5vZGUsXG4gICAgICAgIHRoaXMudGFnTmFtZSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdGhpcy5uYXRpdmVBcHBlbmQuY2FsbChwYXJlbnROb2RlLCBjb252ZXJ0ZWROb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpblByb2Nlc3MoKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKGNvbnRleHQ6IEVsZW1lbnQsIG9yaWdpblByb2Nlc3M6IEZ1bmN0aW9uKSB7XG4gICAgLy8gcmVtb3ZlIGNvbW1lbnQgbm9kZSBhbmQgcmV0dXJuIHRoZSByZWFsIG5vZGVcbiAgICBpZiAodHlwZW9mIHRoaXMuZWxbX19SRU1PVkVfTk9ERV9fXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5lbFtfX1JFTU9WRV9OT0RFX19dKCk7XG4gICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pcygnc3R5bGUnKSB8fCB0aGlzLmlzKCdsaW5rJykgfHwgdGhpcy5pcygnc2NyaXB0JykpIHtcbiAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLmZpbmRQYXJlbnROb2RlSW5BcHAoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHRoaXMuaXMoJ3NjcmlwdCcpID8gJ2JvZHknIDogJ2hlYWQnLFxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuZWwucGFyZW50Tm9kZSA9PT0gcGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAodGhpcy5zYW5kYm94LmR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldC5oYXModGhpcy5lbCkpIHtcbiAgICAgICAgICB0aGlzLnNhbmRib3guZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LmRlbGV0ZSh0aGlzLmVsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVSZW1vdmUuY2FsbChwYXJlbnROb2RlLCB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpblByb2Nlc3MoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG1ha2VNYXAsIHNhZmVXcmFwcGVyLCB3YXJuIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU3R5bGVNYW5hZ2VyIH0gZnJvbSAnQGdhcmZpc2gvbG9hZGVyJztcbmltcG9ydCB7IF9fZG9tV3JhcHBlcl9fIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHsgaW5qZWN0SGFuZGxlclBhcmFtcyB9IGZyb20gJy4vcHJvY2Vzc1BhcmFtcyc7XG5pbXBvcnQgeyBEeW5hbWljTm9kZVByb2Nlc3NvciwgcmF3RWxlbWVudE1ldGhvZHMgfSBmcm9tICcuL3Byb2Nlc3Nvcic7XG5pbXBvcnQgeyBpc0luSWZyYW1lLCBzYW5kYm94TWFwLCBpc1N0eWxlZENvbXBvbmVudHNMaWtlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveE9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IG1vdW50RWxlbWVudE1ldGhvZHMgPSBbXG4gICdhcHBlbmQnLFxuICAnYXBwZW5kQ2hpbGQnLFxuICAnaW5zZXJ0QmVmb3JlJyxcbiAgJ2luc2VydEFkamFjZW50RWxlbWVudCcsXG5dO1xuY29uc3QgcmVtb3ZlQ2hpbGRFbGVtZW50TWV0aG9kcyA9IFsncmVtb3ZlQ2hpbGQnXTtcblxuY29uc3QgaWdub3JlRWxlbWVudFRpbWluZ1RhZ3MgPSBtYWtlTWFwKFtcbiAgJ1NUWUxFJyxcbiAgJ1NDUklQVFMnLFxuICAnTElOSycsXG4gICdNRVRBJyxcbiAgJ1RJVExFJyxcbl0pO1xuXG5mdW5jdGlvbiBpbmplY3RvcihjdXJyZW50OiBGdW5jdGlvbiwgbWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogRWxlbWVudCkge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGVsID0gbWV0aG9kTmFtZSA9PT0gJ2luc2VydEFkamFjZW50RWxlbWVudCdcbiAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICA6IGFyZ3VtZW50c1swXTtcbiAgICBjb25zdCBzYW5kYm94ID0gc2FuZGJveE1hcC5nZXQoZWwpO1xuICAgIGNvbnN0IG9yaWdpblByb2Nlc3MgPSAoKSA9PiBjdXJyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpZiAoc2FuZGJveCkge1xuICAgICAgaWYgKGVsICYmIHRoaXM/LnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBTdHlsZU1hbmFnZXIoZWwudGV4dENvbnRlbnQpO1xuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIG5hbWVzcGFjZSwgc3R5bGVTY29wZUlkIH0gPSBzYW5kYm94Lm9wdGlvbnM7XG4gICAgICAgIG1hbmFnZXIuY29ycmVjdFBhdGgoYmFzZVVybCk7XG4gICAgICAgIG1hbmFnZXIuc2V0U2NvcGUoe1xuICAgICAgICAgIGFwcE5hbWU6IG5hbWVzcGFjZSxcbiAgICAgICAgICByb290RWxJZDogc3R5bGVTY29wZUlkISgpLFxuICAgICAgICB9KTtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSBtYW5hZ2VyLnRyYW5zZm9ybUNvZGUobWFuYWdlci5zdHlsZUNvZGUpO1xuICAgICAgICByZXR1cm4gb3JpZ2luUHJvY2VzcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc29yID0gbmV3IER5bmFtaWNOb2RlUHJvY2Vzc29yKGVsLCBzYW5kYm94LCBtZXRob2ROYW1lKTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3Nvci5hcHBlbmQodGhpcywgYXJndW1lbnRzLCBvcmlnaW5Qcm9jZXNzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjdXN0b20gcGVyZm9ybWFuY2UgRWxlbWVudCBUaW1pbmcgQVBJXG4gICAgLy8gaHR0cHM6Ly93ZWIuZGV2L2N1c3RvbS1tZXRyaWNzLyNlbGVtZW50LXRpbWluZy1hcGlcbiAgICBzYWZlV3JhcHBlcigoKSA9PiB7XG4gICAgICBpZiAoaWdub3JlRWxlbWVudFRpbWluZ1RhZ3MoZWwudGFnTmFtZSkpIHJldHVybjtcbiAgICAgIGlmIChcbiAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSAmJlxuICAgICAgICB0eXBlb2YgZWw/LnNldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAhZWw/LmdldEF0dHJpYnV0ZSgnZWxlbWVudHRpbWluZycpXG4gICAgICApIHtcbiAgICAgICAgZWw/LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAnZWxlbWVudHRpbWluZycsXG4gICAgICAgICAgc2FuZGJveFxuICAgICAgICAgICAgPyBgJHsoc2FuZGJveCBhcyBhbnkpLm9wdGlvbnMubmFtZXNwYWNlfS1lbGVtZW50LXRpbWluZ2BcbiAgICAgICAgICAgIDogJ2VsZW1lbnQtdGltaW5nJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzYW5kYm94KSB7XG4gICAgICBjb25zdCBwcm9jZXNzb3IgPSBuZXcgRHluYW1pY05vZGVQcm9jZXNzb3IoZWwsIHNhbmRib3gsIG1ldGhvZE5hbWUpO1xuICAgICAgcmV0dXJuIHByb2Nlc3Nvci5hcHBlbmQodGhpcywgYXJndW1lbnRzLCBvcmlnaW5Qcm9jZXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWdpblByb2Nlc3MoKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGluamVjdG9yUmVtb3ZlQ2hpbGQoY3VycmVudDogRnVuY3Rpb24sIG1ldGhvZE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6IEVsZW1lbnQpIHtcbiAgICBjb25zdCBlbCA9IGFyZ3VtZW50c1swXTtcbiAgICBjb25zdCBzYW5kYm94ID0gZWwgJiYgc2FuZGJveE1hcC5nZXQoZWwpO1xuICAgIGNvbnN0IG9yaWdpblByb2Nlc3MgPSAoKSA9PiB7XG4gICAgICAvLyBTYW5kYm94IG1heSBoYXZlIGFwcGxpZWQgc3ViIGRvbSBzaWRlIGVmZmVjdHMgdG8gZGVsZXRlXG4gICAgICAvLyBieSByZW1vdmVDaGlsZCBkZWxldGVkIGJ5IHRoZSB0YWcgZGV0ZXJtaW5lIHdoZXRoZXIgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICAgIHJldHVybiBjdXJyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGlmIChzYW5kYm94KSB7XG4gICAgICBjb25zdCBwcm9jZXNzb3IgPSBuZXcgRHluYW1pY05vZGVQcm9jZXNzb3IoZWwsIHNhbmRib3gsIG1ldGhvZE5hbWUpO1xuICAgICAgcmV0dXJuIHByb2Nlc3Nvci5yZW1vdmVDaGlsZCh0aGlzLCBvcmlnaW5Qcm9jZXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpblByb2Nlc3MoKTtcbiAgfTtcbn1cblxuLy8gSGFuZGxlIGBvd25lckRvY3VtZW50YCB0byBwcmV2ZW50IGVsZW1lbnRzIGNyZWF0ZWQgYnkgYG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudGAgZnJvbSBlc2NhcGluZ1xuZnVuY3Rpb24gaGFuZGxlT3duZXJEb2N1bWVudCgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSwgJ293bmVyRG9jdW1lbnQnLCB7XG4gICAgZ2V0KCkge1xuICAgICAgY29uc3Qgc2FuZGJveCA9IHRoaXMgJiYgc2FuZGJveE1hcC5nZXQodGhpcyk7XG4gICAgICBjb25zdCByZWFsVmFsdWUgPSBSZWZsZWN0LmdldChcbiAgICAgICAgd2luZG93Lk5vZGUucHJvdG90eXBlLFxuICAgICAgICAnb3duZXJEb2N1bWVudCcsXG4gICAgICAgIHRoaXMsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHNhbmRib3ggPyBzYW5kYm94Lmdsb2JhbC5kb2N1bWVudCA6IHJlYWxWYWx1ZTtcbiAgICB9LFxuICAgIHNldCgpIHtcbiAgICAgICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmIHdhcm4oJ1wib3duZXJEb2N1bWVudFwiIGlzIGEgcmVhZC1vbmx5IGF0dHJpYnV0ZS4nKTtcbiAgICB9LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFbEluamVjdG9yKHNhbmRib3hDb25maWc6IFNhbmRib3hPcHRpb25zKSB7XG4gIGlmICgobWFrZUVsSW5qZWN0b3IgYXMgYW55KS5oYXNJbmplY3QpIHJldHVybjtcbiAgKG1ha2VFbEluamVjdG9yIGFzIGFueSkuaGFzSW5qZWN0ID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIHdpbmRvdy5FbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gaWZyYW1lIGNhbiByZWFkIGh0bWwgY29udGFpbmVyIHRoaXMgY2FuJ3QgcG9pbnQgdG8gcHJveHlEb2N1bWVudCBoYXMgSWxsZWdhbCBpbnZvY2F0aW9uIGVycm9yXG4gICAgaWYgKHNhbmRib3hDb25maWcuZml4QmFzZVVybCkgc2FmZVdyYXBwZXIoKCk9PiBoYW5kbGVPd25lckRvY3VtZW50KCkpO1xuICAgIGNvbnN0IHJld3JpdGUgPSAoXG4gICAgICBtZXRob2RzOiBBcnJheTxzdHJpbmc+LFxuICAgICAgYnVpbGRlcjogdHlwZW9mIGluamVjdG9yIHwgdHlwZW9mIGluamVjdG9yUmVtb3ZlQ2hpbGQsXG4gICAgKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbWV0aG9kcykge1xuICAgICAgICBjb25zdCBmbiA9IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJyB8fCBmbltfX2RvbVdyYXBwZXJfX10pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByYXdFbGVtZW50TWV0aG9kc1tuYW1lXSA9IGZuO1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gYnVpbGRlcihmbiwgbmFtZSk7XG4gICAgICAgIHdyYXBwZXJbX19kb21XcmFwcGVyX19dID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LkVsZW1lbnQucHJvdG90eXBlW25hbWVdID0gd3JhcHBlcjtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJld3JpdGUobW91bnRFbGVtZW50TWV0aG9kcywgaW5qZWN0b3IpO1xuICAgIHJld3JpdGUocmVtb3ZlQ2hpbGRFbGVtZW50TWV0aG9kcywgaW5qZWN0b3JSZW1vdmVDaGlsZCk7XG4gIH1cblxuICBpbmplY3RIYW5kbGVyUGFyYW1zKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvcmRTdHlsZWRDb21wb25lbnRDU1NSdWxlcyhcbiAgZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0OiBTZXQ8SFRNTFN0eWxlRWxlbWVudD4sXG4gIHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwOiBXZWFrTWFwPEhUTUxTdHlsZUVsZW1lbnQsIENTU1J1bGVMaXN0Pixcbikge1xuICBkeW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQuZm9yRWFjaCgoc3R5bGVFbGVtZW50KSA9PiB7XG4gICAgaWYgKGlzU3R5bGVkQ29tcG9uZW50c0xpa2Uoc3R5bGVFbGVtZW50KSAmJiBzdHlsZUVsZW1lbnQuc2hlZXQpIHtcbiAgICAgIHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwLnNldChzdHlsZUVsZW1lbnQsIHN0eWxlRWxlbWVudC5zaGVldC5jc3NSdWxlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYnVpbGRDU1NSdWxlcyhcbiAgZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0OiBTZXQ8SFRNTFN0eWxlRWxlbWVudD4sXG4gIHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwOiBXZWFrTWFwPEhUTUxTdHlsZUVsZW1lbnQsIENTU1J1bGVMaXN0Pixcbikge1xuICBkeW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQuZm9yRWFjaCgoc3R5bGVFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgY3NzUnVsZXMgPSBzdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcC5nZXQoc3R5bGVFbGVtZW50KTtcbiAgICBpZiAoY3NzUnVsZXMgJiYgKGlzU3R5bGVkQ29tcG9uZW50c0xpa2Uoc3R5bGVFbGVtZW50KSB8fCBjc3NSdWxlcy5sZW5ndGgpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNzc1J1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNzc1J1bGUgPSBjc3NSdWxlc1tpXTtcbiAgICAgICAgLy8gcmUtaW5zZXJ0IHJ1bGVzIGZvciBzdHlsZWQtY29tcG9uZW50cyBlbGVtZW50XG4gICAgICAgIHN0eWxlRWxlbWVudC5zaGVldD8uaW5zZXJ0UnVsZShcbiAgICAgICAgICBjc3NSdWxlLmNzc1RleHQsXG4gICAgICAgICAgc3R5bGVFbGVtZW50LnNoZWV0Py5jc3NSdWxlcy5sZW5ndGgsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBTeW5jSG9vaywgU3luY1dhdGVyZmFsbEhvb2ssIFBsdWdpblN5c3RlbSB9IGZyb20gJ0BnYXJmaXNoL2hvb2tzJztcbmltcG9ydCB0eXBlIHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBGYWtlV2luZG93IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRHZXR0ZXJEYXRhIHtcbiAgdmFsdWU6IGFueTtcbiAgcHJvcE5hbWU6IFByb3BlcnR5S2V5O1xuICBwcm94eURvY3VtZW50OiBEb2N1bWVudDtcbiAgcm9vdE5vZGU/OiBudWxsIHwgRWxlbWVudCB8IFNoYWRvd1Jvb3Q7XG4gIGN1c3RvbVZhbHVlPzogYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FuZGJveExpZmVjeWNsZSgpIHtcbiAgcmV0dXJuIG5ldyBQbHVnaW5TeXN0ZW0oe1xuICAgIGNsb3NlZDogbmV3IFN5bmNIb29rPFtdLCB2b2lkPigpLFxuICAgIHN0YXJlZDogbmV3IFN5bmNIb29rPFtGYWtlV2luZG93P10sIHZvaWQ+KCksXG4gICAgYXBwZW5kTm9kZTogbmV3IFN5bmNIb29rPFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBzdHJpbmddLCB2b2lkPigpLFxuICAgIGRvY3VtZW50R2V0dGVyOiBuZXcgU3luY1dhdGVyZmFsbEhvb2s8RG9jdW1lbnRHZXR0ZXJEYXRhPignZG9jdW1lbnRHZXR0ZXInKSxcbiAgICBiZWZvcmVDbGVhckVmZmVjdDogbmV3IFN5bmNIb29rPFtdLCB2b2lkPigpLFxuICAgIGFmdGVyQ2xlYXJFZmZlY3Q6IG5ldyBTeW5jSG9vazxbXSwgdm9pZD4oKSxcbiAgICBiZWZvcmVJbnZva2U6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtcbiAgICAgICAgeyBjb2RlOiBzdHJpbmcgfSxcbiAgICAgICAgc3RyaW5nPyxcbiAgICAgICAgUmVjb3JkPHN0cmluZywgYW55Pj8sXG4gICAgICAgIGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnM/LFxuICAgICAgXSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gICAgYWZ0ZXJJbnZva2U6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtcbiAgICAgICAgeyBjb2RlOiBzdHJpbmcgfSxcbiAgICAgICAgc3RyaW5nPyxcbiAgICAgICAgUmVjb3JkPHN0cmluZywgYW55Pj8sXG4gICAgICAgIGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnM/LFxuICAgICAgXSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gICAgaW52b2tlRXJyb3I6IG5ldyBTeW5jSG9vazxcbiAgICAgIFtFcnJvciwgc3RyaW5nPywgUmVjb3JkPHN0cmluZywgYW55Pj8sIGludGVyZmFjZXMuRXhlY1NjcmlwdE9wdGlvbnM/XSxcbiAgICAgIHZvaWRcbiAgICA+KCksXG4gIH0pO1xufVxuIiwgImltcG9ydCB7IHdhcm4sIGhhc093biwgc2FmYXJpMTNEZWFsIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4uL3NhbmRib3gnO1xuaW1wb3J0IHsgaXNFc0dsb2JhbE1ldGhvZHMsIGlzTmF0aXZlQ29kZU1ldGhvZHMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBfX3dpbmRvd0JpbmRfXywgR0FSRklTSF9PUFRJTUlaRV9OQU1FIH0gZnJvbSAnLi4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHtcbiAgYmluZCxcbiAgaXNDb25zdHJ1Y3RvcixcbiAgdmVyaWZ5R2V0dGVyRGVzY3JpcHRvcixcbiAgdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcixcbn0gZnJvbSAnLi9zaGFyZWQnO1xuXG4vLyB3aW5kb3cgcHJveHkgZ2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR2V0dGVyKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFdpbmRvdywgcDogUHJvcGVydHlLZXksIHJlY2VpdmVyOiBhbnkpID0+IHtcbiAgICBpZiAocCA9PT0gU3ltYm9sLnVuc2NvcGFibGVzKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCB2YWx1ZTtcbiAgICBjb25zdCB7IG92ZXJyaWRlTGlzdCB9ID0gc2FuZGJveC5yZXBsYWNlR2xvYmFsVmFyaWFibGVzO1xuXG4gICAgaWYgKHNhbmRib3guaXNQcm90ZWN0VmFyaWFibGUocCkpIHtcbiAgICAgIC8vIERvbid0IHBhc3MgdGhlIFwicmVjZWl2ZXJcIiwgb3RoZXJ3aXNlIGl0IHdpbGwgY2F1c2UgdGhlIHdyb25nIHBvaW50IG9mIHRoaXNcbiAgICAgIHJldHVybiBSZWZsZWN0LmdldCh3aW5kb3csIHApO1xuICAgIH0gZWxzZSBpZiAoc2FuZGJveC5pc0luc3VsYXRpb25WYXJpYWJsZShwKSkge1xuICAgICAgdmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHAsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBoYXNPd24odGFyZ2V0LCBwKVxuICAgICAgICA/IFJlZmxlY3QuZ2V0KHRhcmdldCwgcCwgcmVjZWl2ZXIpXG4gICAgICAgIDogUmVmbGVjdC5nZXQod2luZG93LCBwKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBUaGUgZm9sbG93aW5nIHNpdHVhdGlvbnMgZG8gbm90IHJlcXVpcmUgXCJiaW5kXCJcbiAgICAgIC8vICAxLiBUaGUgZ2xvYmFsIG1ldGhvZCBvbiB0aGUgbmF0aXZlIGVzIHN0YW5kYXJkXG4gICAgICAvLyAgMi4gTWV0aG9kcyBpbnRlcm5hbCB0byB0aGUgc2FuZGJveCBvciByZXdyaXR0ZW4gYnkgdGhlIHVzZXJcbiAgICAgIC8vICAzLiBDb25zdHJ1Y3RvclxuICAgICAgLy8gQWZ0ZXIgZmlsdGVyaW5nIG91dCBjdXN0b20gYW5kIG5hdGl2ZSBlcyBmdW5jdGlvbnMsIG9ubHkgYm9tIGFuZCBkb20gZnVuY3Rpb25zIGFyZSBsZWZ0XG4gICAgICAvLyBNYWtlIGp1ZGdtZW50cyBzdWNoIGFzIGNvbnN0cnVjdG9ycyBmb3IgdGhlc2UgZW52aXJvbm1lbnQtcmVsYXRlZCBmdW5jdGlvbnMgdG8gZnVydGhlciBuYXJyb3cgdGhlIHNjb3BlIG9mIGJpbmRcbiAgICAgIGlmIChcbiAgICAgICAgaXNFc0dsb2JhbE1ldGhvZHMocCkgfHxcbiAgICAgICAgaXNOYXRpdmVDb2RlTWV0aG9kcyhwKSB8fFxuICAgICAgICBoYXNPd24ob3ZlcnJpZGVMaXN0LCBwKSB8fFxuICAgICAgICBpc0NvbnN0cnVjdG9yKHZhbHVlKSB8fFxuICAgICAgICBzYW5kYm94LmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5oYXMocClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhhc093bih2YWx1ZSwgX193aW5kb3dCaW5kX18pXG4gICAgICA/IHZhbHVlW19fd2luZG93QmluZF9fXVxuICAgICAgOiBiaW5kKHZhbHVlLCB3aW5kb3cpO1xuICAgIGNvbnN0IHZlcmlmeVJlc3VsdCA9IHZlcmlmeUdldHRlckRlc2NyaXB0b3IodGFyZ2V0LCBwLCBuZXdWYWx1ZSk7XG4gICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEpIHJldHVybiB2YWx1ZTtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDIpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhbHVlW19fd2luZG93QmluZF9fXSA9IG5ld1ZhbHVlO1xuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfTtcbn1cblxuY29uc3Qgc2FmYXJpUHJveHlXaW5kb3dEZWFsSGFuZGxlciA9IHNhZmFyaTEzRGVhbCgpO1xuXG4vLyB3aW5kb3cgcHJveHkgc2V0dGVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2V0dGVyKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFdpbmRvdywgcDogUHJvcGVydHlLZXksIHZhbHVlOiB1bmtub3duLCByZWNlaXZlcjogYW55KSA9PiB7XG4gICAgY29uc3QgdmVyaWZ5UmVzdWx0ID0gdmVyaWZ5U2V0dGVyRGVzY3JpcHRvcihcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgc2FuZGJveC5pc1Byb3RlY3RWYXJpYWJsZShwKVxuICAgICAgICA/IHdpbmRvd1xuICAgICAgICA6IHJlY2VpdmVyXG4gICAgICAgICAgPyByZWNlaXZlclxuICAgICAgICAgIDogdGFyZ2V0LFxuICAgICAgcCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gICAgLy8gSWYgdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCB0aGUgc2V0dGluZyBzdWNjZXNzIHdpbGwgYmUgcmV0dXJuZWQgZGlyZWN0bHkuIENhbm5vdCBiZSBzZXQgYW5kIHJldHVybiB0byBmYWlsdXJlIGRpcmVjdGx5LlxuICAgIC8vIFwiUmVmbGVjdC5zZXRcIiBkb2VzIG5vdCBwZXJmb3JtIHRoaXMgcGFydCBvZiBwcm9jZXNzaW5nIGJ5IGRlZmF1bHQgaW4gc2FmYXJpXG4gICAgaWYgKHZlcmlmeVJlc3VsdCA+IDApIHtcbiAgICAgIGlmICh2ZXJpZnlSZXN1bHQgPT09IDEgfHwgdmVyaWZ5UmVzdWx0ID09PSAyKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodmVyaWZ5UmVzdWx0ID09PSAzKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2FuZGJveC5pc1Byb3RlY3RWYXJpYWJsZShwKSkge1xuICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHdpbmRvdywgcCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjdXJyZW50IGlzIHNldHRpbmdcbiAgICAgIHNhZmFyaVByb3h5V2luZG93RGVhbEhhbmRsZXIudHJpZ2dlclNldCgpO1xuICAgICAgY29uc3Qgc3VjY2VzcyA9IFJlZmxlY3Quc2V0KHRhcmdldCwgcCwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIGlmIChzYW5kYm94LmluaXRDb21wbGV0ZSkge1xuICAgICAgICAgIHNhbmRib3guaXNFeHRlcm5hbEdsb2JhbFZhcmlhYmxlLmFkZChwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBuZWVkIG9wdGltaXphdGlvbiB2YXJpYWJsZXNcbiAgICAgICAgaWYgKHNhbmRib3guZ2xvYmFsKSB7XG4gICAgICAgICAgY29uc3QgbWV0aG9kcyA9IHNhbmRib3guZ2xvYmFsW2Ake0dBUkZJU0hfT1BUSU1JWkVfTkFNRX1NZXRob2RzYF07XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWV0aG9kcykpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzLmluY2x1ZGVzKHApKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVN0YWNrID1cbiAgICAgICAgICAgICAgICBzYW5kYm94Lmdsb2JhbFtgJHtHQVJGSVNIX09QVElNSVpFX05BTUV9VXBkYXRlU3RhY2tgXTtcbiAgICAgICAgICAgICAgdXBkYXRlU3RhY2suZm9yRWFjaCgoZm4pID0+IGZuKHAsIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VjY2VzcztcbiAgICB9XG4gIH07XG59XG5cbi8vIHdpbmRvdyBwcm94eSBkZWZpbmVQcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlZmluZVByb3BlcnR5KHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuICh0YXJnZXQ6IFdpbmRvdywgcDogUHJvcGVydHlLZXksIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikgPT4ge1xuICAgIHNhZmFyaVByb3h5V2luZG93RGVhbEhhbmRsZXIuaGFuZGxlRGVzY3JpcHRvcihkZXNjcmlwdG9yKTtcblxuICAgIGlmIChzYW5kYm94LmlzUHJvdGVjdFZhcmlhYmxlKHApKSB7XG4gICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIHAsIGRlc2NyaXB0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHAsIGRlc2NyaXB0b3IpO1xuICAgICAgaWYgKHNhbmRib3guaW5pdENvbXBsZXRlICYmIHN1Y2Nlc3MpIHtcbiAgICAgICAgc2FuZGJveC5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuYWRkKHApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfVxuICB9O1xufVxuXG4vLyB3aW5kb3cgcHJveHkgZGVsZXRlUHJvcGVydHlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWxldGVQcm9wZXJ0eShzYW5kYm94OiBTYW5kYm94KSB7XG4gIHJldHVybiAodGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5KSA9PiB7XG4gICAgaWYgKGhhc093bih0YXJnZXQsIHApKSB7XG4gICAgICBkZWxldGUgdGFyZ2V0W3AgYXMgYW55XTtcbiAgICAgIGlmIChzYW5kYm94LmluaXRDb21wbGV0ZSAmJiBzYW5kYm94LmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5oYXMocCkpIHtcbiAgICAgICAgc2FuZGJveC5pc0V4dGVybmFsR2xvYmFsVmFyaWFibGUuZGVsZXRlKHApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkpIHtcbiAgICAgIGlmIChoYXNPd24od2luZG93LCBwKSAmJiBzYW5kYm94LmlzUHJvdGVjdFZhcmlhYmxlKHApKSB7XG4gICAgICAgIHdhcm4oYFRoZSBcIiR7U3RyaW5nKHApfVwiIGlzIGdsb2JhbCBwcm90ZWN0IHZhcmlhYmxlLlwiYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG4vLyB3aW5kb3cgcHJveHkgaGFzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzKHNhbmRib3g6IFNhbmRib3gpIHtcbiAgcmV0dXJuIChfdGFyZ2V0OiBXaW5kb3csIHA6IFByb3BlcnR5S2V5KSA9PiB7XG4gICAgaWYgKHNhbmRib3guaXNQcm90ZWN0VmFyaWFibGUocCkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoKHNhbmRib3ggYXMgYW55KS5lbnZWYXJpYWJsZSA9PT0gcCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuIiwgImltcG9ydCB7IExvYWRlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICB3YXJuLFxuICBoYXNPd24sXG4gIG1ha2VNYXAsXG4gIGlzT2JqZWN0LFxuICBkZWVwTWVyZ2UsXG4gIGV2YWxXaXRoRW52LFxuICBzYWZlV3JhcHBlcixcbiAgaXNQbGFpbk9iamVjdCxcbiAgc2V0RG9jQ3VycmVudFNjcmlwdCxcbn0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHR5cGUgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgeyBoaXN0b3J5TW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgbmV0d29ya01vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9uZXR3b3JrJztcbmltcG9ydCB7IGRvY3VtZW50TW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2RvY3VtZW50JztcbmltcG9ydCB7IFVpRXZlbnRPdmVycmlkZSB9IGZyb20gJy4vbW9kdWxlcy91aUV2ZW50JztcbmltcG9ydCB7IGxvY2FsU3RvcmFnZU1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9zdG9yYWdlJztcbmltcG9ydCB7IGxpc3RlbmVyTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2V2ZW50TGlzdGVuZXInO1xuaW1wb3J0IHsgb2JzZXJ2ZXJNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvbXV0YXRpb25PYnNlcnZlcic7XG5pbXBvcnQgeyB0aW1lb3V0TW9kdWxlLCBpbnRlcnZhbE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy90aW1lcic7XG5pbXBvcnQgeyBtYWtlRWxJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY05vZGUnO1xuaW1wb3J0IHsgc2FuZGJveExpZmVjeWNsZSB9IGZyb20gJy4vbGlmZWN5Y2xlJztcbmltcG9ydCB7IG9wdGltaXplTWV0aG9kcywgY3JlYXRlRmFrZU9iamVjdCwgc2FuZGJveE1hcCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgX19nYXJmaXNoR2xvYmFsX18sIEdBUkZJU0hfT1BUSU1JWkVfTkFNRSB9IGZyb20gJy4vc3ltYm9sVHlwZXMnO1xuaW1wb3J0IHsgTW9kdWxlLCBTYW5kYm94T3B0aW9ucywgUmVwbGFjZUdsb2JhbFZhcmlhYmxlcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlSGFzLFxuICBjcmVhdGVHZXR0ZXIsXG4gIGNyZWF0ZVNldHRlcixcbiAgY3JlYXRlRGVmaW5lUHJvcGVydHksXG4gIGNyZWF0ZURlbGV0ZVByb3BlcnR5LFxufSBmcm9tICcuL3Byb3h5SW50ZXJjZXB0b3IvZ2xvYmFsJztcblxubGV0IGlkID0gMDtcbmNvbnN0IGRlZmF1bHRNb2R1bGVzOiBBcnJheTxNb2R1bGU+ID0gW1xuICBuZXR3b3JrTW9kdWxlLFxuICB0aW1lb3V0TW9kdWxlLFxuICBpbnRlcnZhbE1vZHVsZSxcbiAgaGlzdG9yeU1vZHVsZSxcbiAgZG9jdW1lbnRNb2R1bGUsXG4gIGxpc3RlbmVyTW9kdWxlLFxuICBvYnNlcnZlck1vZHVsZSxcbiAgVWlFdmVudE92ZXJyaWRlLFxuICBsb2NhbFN0b3JhZ2VNb2R1bGUsXG5dO1xuXG5jb25zdCBpc01vZHVsZSA9IChtb2R1bGU6IFdpbmRvdykgPT4ge1xuICByZXR1cm4gaXNPYmplY3QobW9kdWxlKVxuICAgID8gbW9kdWxlW19fZ2FyZmlzaEdsb2JhbF9fIGFzIGFueV0gIT09IHVuZGVmaW5lZFxuICAgIDogZmFsc2U7XG59O1xuXG5jb25zdCBhZGRQcm94eVdpbmRvd1R5cGUgPSAobW9kdWxlOiBXaW5kb3csIHBhcmVudE1vZHVsZTogV2luZG93KSA9PiB7XG4gIGlmICghaXNNb2R1bGUobW9kdWxlKSkge1xuICAgIG1vZHVsZVtfX2dhcmZpc2hHbG9iYWxfXyBhcyBhbnldID0gcGFyZW50TW9kdWxlO1xuICB9XG4gIHJldHVybiBtb2R1bGU7XG59O1xuXG5leHBvcnQgY2xhc3MgU2FuZGJveCB7XG4gIHB1YmxpYyBpZCA9IGlkKys7XG4gIHB1YmxpYyB0eXBlID0gJ3ZtJztcbiAgcHVibGljIGNsb3NlZCA9IHRydWU7XG4gIHB1YmxpYyBpbml0Q29tcGxldGUgPSBmYWxzZTtcbiAgcHVibGljIHZlcnNpb24gPSAnMS4xMi4wJztcbiAgcHVibGljIGdsb2JhbD86IFdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzO1xuICBwdWJsaWMgbG9hZGVyOiBMb2FkZXI7XG4gIHB1YmxpYyBvcHRpb25zOiBTYW5kYm94T3B0aW9ucztcbiAgcHVibGljIGhvb2tzID0gc2FuZGJveExpZmVjeWNsZSgpO1xuICBwdWJsaWMgcmVwbGFjZUdsb2JhbFZhcmlhYmxlczogUmVwbGFjZUdsb2JhbFZhcmlhYmxlcztcbiAgcHVibGljIGRlZmVyQ2xlYXJFZmZlY3RzOiBTZXQ8KCkgPT4gdm9pZD4gPSBuZXcgU2V0KCk7XG4gIHB1YmxpYyBpc0V4dGVybmFsR2xvYmFsVmFyaWFibGU6IFNldDxQcm9wZXJ0eUtleT4gPSBuZXcgU2V0KCk7XG4gIHB1YmxpYyBpc1Byb3RlY3RWYXJpYWJsZTogKHA6IFByb3BlcnR5S2V5KSA9PiBib29sZWFuO1xuICBwdWJsaWMgaXNJbnN1bGF0aW9uVmFyaWFibGU6IChQOiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbjtcbiAgcHVibGljIGR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldCA9IG5ldyBTZXQ8SFRNTFN0eWxlRWxlbWVudD4oKTtcbiAgcHVibGljIHN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwID0gbmV3IFdlYWtNYXA8XG4gICAgSFRNTFN0eWxlRWxlbWVudCxcbiAgICBDU1NSdWxlTGlzdFxuICA+KCk7XG5cbiAgcHJpdmF0ZSBvcHRpbWl6ZUNvZGUgPSAnJzsgLy8gVG8gb3B0aW1pemUgdGhlIHdpdGggc3RhdGVtZW50XG4gIHByaXZhdGUgZW52VmFyaWFibGUgPSAnX19HQVJGSVNIX1NBTkRCT1hfRU5WX1ZBUl9fJztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTYW5kYm94T3B0aW9ucykge1xuICAgIC8vIERlZmF1bHQgc2FuZGJveCBjb25maWdcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogU2FuZGJveE9wdGlvbnMgPSB7XG4gICAgICBiYXNlVXJsOiAnJyxcbiAgICAgIG5hbWVzcGFjZTogJycsXG4gICAgICBtb2R1bGVzOiBbXSxcbiAgICAgIGZpeEJhc2VVcmw6IGZhbHNlLFxuICAgICAgZGlzYWJsZVdpdGg6IGZhbHNlLFxuICAgICAgc3RyaWN0SXNvbGF0aW9uOiBmYWxzZSxcbiAgICAgIGVsOiAoKSA9PiBudWxsLFxuICAgICAgc3R5bGVTY29wZUlkOiAoKSA9PiAnJyxcbiAgICAgIHByb3RlY3RWYXJpYWJsZTogKCkgPT4gW10sXG4gICAgICBpbnN1bGF0aW9uVmFyaWFibGU6ICgpID0+IFtdLFxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zID0gaXNQbGFpbk9iamVjdChvcHRpb25zKVxuICAgICAgPyBkZWVwTWVyZ2UoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpXG4gICAgICA6IGRlZmF1bHRPcHRpb25zO1xuXG4gICAgY29uc3QgeyBsb2FkZXJPcHRpb25zLCBwcm90ZWN0VmFyaWFibGUsIGluc3VsYXRpb25WYXJpYWJsZSB9ID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRlcihsb2FkZXJPcHRpb25zKTtcbiAgICB0aGlzLmlzUHJvdGVjdFZhcmlhYmxlID0gbWFrZU1hcChwcm90ZWN0VmFyaWFibGU/LigpIHx8IFtdKTtcbiAgICB0aGlzLmlzSW5zdWxhdGlvblZhcmlhYmxlID0gbWFrZU1hcChpbnN1bGF0aW9uVmFyaWFibGU/LigpIHx8IFtdKTtcblxuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcyA9IHtcbiAgICAgIGNyZWF0ZWRMaXN0OiBbXSxcbiAgICAgIHByZXBhcmVMaXN0OiBbXSxcbiAgICAgIHJlY292ZXJMaXN0OiBbXSxcbiAgICAgIG92ZXJyaWRlTGlzdDoge30sXG4gICAgfTtcbiAgICAvLyBJbmplY3QgR2xvYmFsIGNhcHR1cmVcbiAgICBtYWtlRWxJbmplY3Rvcih0aGlzLm9wdGlvbnMpO1xuICAgIC8vIFRoZSBkZWZhdWx0IHN0YXJ0dXAgc2FuZGJveFxuICAgIHRoaXMuc3RhcnQoKTtcbiAgICBzYW5kYm94TWFwLnNldCh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzID0gdGhpcy5nZXRNb2R1bGVEYXRhKCk7XG4gICAgY29uc3QgeyBjcmVhdGVkTGlzdCwgb3ZlcnJpZGVMaXN0IH0gPSB0aGlzLnJlcGxhY2VHbG9iYWxWYXJpYWJsZXM7XG4gICAgdGhpcy5nbG9iYWwgPSB0aGlzLmNyZWF0ZVByb3h5V2luZG93KE9iamVjdC5rZXlzKG92ZXJyaWRlTGlzdCkpO1xuXG4gICAgaWYgKG92ZXJyaWRlTGlzdCAmJiB0aGlzLmdsb2JhbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3ZlcnJpZGVMaXN0KSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsW2tleV0gPSBvdmVycmlkZUxpc3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNyZWF0ZWRMaXN0KSB7XG4gICAgICBjcmVhdGVkTGlzdC5mb3JFYWNoKChmbikgPT4gZm4gJiYgZm4odGhpcy5nbG9iYWwpKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZVdpdGgpIHtcbiAgICAgIHRoaXMub3B0aW1pemVDb2RlID0gdGhpcy5vcHRpbWl6ZUdsb2JhbE1ldGhvZCgpO1xuICAgIH1cbiAgICB0aGlzLmluaXRDb21wbGV0ZSA9IHRydWU7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuc3RhcmVkLmVtaXQodGhpcy5nbG9iYWwpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XG4gICAgdGhpcy5jbGVhckVmZmVjdHMoKTtcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgdGhpcy5nbG9iYWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcHRpbWl6ZUNvZGUgPSAnJztcbiAgICB0aGlzLmluaXRDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHRoaXMuZGVmZXJDbGVhckVmZmVjdHMuY2xlYXIoKTtcbiAgICB0aGlzLmlzRXh0ZXJuYWxHbG9iYWxWYXJpYWJsZS5jbGVhcigpO1xuICAgIHRoaXMuZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LmNsZWFyKCk7XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLmNyZWF0ZWRMaXN0ID0gW107XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLnByZXBhcmVMaXN0ID0gW107XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLnJlY292ZXJMaXN0ID0gW107XG4gICAgdGhpcy5yZXBsYWNlR2xvYmFsVmFyaWFibGVzLm92ZXJyaWRlTGlzdCA9IFtdO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgY3JlYXRlUHJveHlXaW5kb3cobW9kdWxlS2V5czogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgY29uc3QgZmFrZVdpbmRvdyA9IGNyZWF0ZUZha2VPYmplY3QoXG4gICAgICB3aW5kb3csXG4gICAgICB0aGlzLmlzSW5zdWxhdGlvblZhcmlhYmxlLFxuICAgICAgbWFrZU1hcChtb2R1bGVLZXlzKSxcbiAgICApO1xuXG4gICAgY29uc3QgYmFzZUhhbmRsZXJzID0ge1xuICAgICAgZ2V0OiBjcmVhdGVHZXR0ZXIodGhpcyksXG4gICAgICBzZXQ6IGNyZWF0ZVNldHRlcih0aGlzKSxcbiAgICAgIGRlZmluZVByb3BlcnR5OiBjcmVhdGVEZWZpbmVQcm9wZXJ0eSh0aGlzKSxcbiAgICAgIGRlbGV0ZVByb3BlcnR5OiBjcmVhdGVEZWxldGVQcm9wZXJ0eSh0aGlzKSxcbiAgICAgIGdldFByb3RvdHlwZU9mKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdyk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnRIYW5kbGVycyA9IHtcbiAgICAgIC4uLmJhc2VIYW5kbGVycyxcbiAgICAgIGhhczogY3JlYXRlSGFzKHRoaXMpLFxuICAgICAgZ2V0UHJvdG90eXBlT2YoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93KTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIEluIGZhY3QsIHRoZXkgYXJlIGFsbCBwcm94eSB3aW5kb3dzLCBidXQgdGhlIHByb2JsZW0gb2YgYHZhciBhID0geHhgIGNhbiBiZSBzb2x2ZWQgdGhyb3VnaCBoYXNcbiAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eShmYWtlV2luZG93LCBwYXJlbnRIYW5kbGVycyk7XG4gICAgY29uc3Qgc3ViUHJveHkgPSBuZXcgUHJveHkoZmFrZVdpbmRvdywgYmFzZUhhbmRsZXJzKTtcblxuICAgIHByb3h5LnNlbGYgPSBzdWJQcm94eTtcbiAgICBwcm94eS53aW5kb3cgPSBzdWJQcm94eTtcbiAgICBwcm94eS5nbG9iYWxUaGlzID0gc3ViUHJveHk7XG4gICAgcHJveHkuX19kZWJ1Z19zYW5kYm94X18gPSB0aGlzOyAvLyBUaGlzIGF0dHJpYnV0ZSBpcyB1c2VkIGZvciBkZWJ1Z2dlclxuICAgIHNhZmVXcmFwcGVyKCgpID0+IHtcbiAgICAgIC8vIENyb3NzLWRvbWFpbiBlcnJvcnMgbWF5IG9jY3VyIGR1cmluZyBhY2Nlc3NcbiAgICAgIHByb3h5LnRvcCA9IHdpbmRvdy50b3AgPT09IHdpbmRvdyA/IHN1YlByb3h5IDogd2luZG93LnRvcDtcbiAgICAgIHByb3h5LnBhcmVudCA9IHdpbmRvdy5wYXJlbnQgPT09IHdpbmRvdyA/IHN1YlByb3h5IDogd2luZG93LnBhcmVudDtcbiAgICB9KTtcblxuICAgIGFkZFByb3h5V2luZG93VHlwZShwcm94eSwgd2luZG93KTtcbiAgICByZXR1cm4gcHJveHk7XG4gIH1cblxuICBnZXRNb2R1bGVEYXRhKCkge1xuICAgIGNvbnN0IHJlY292ZXJMaXN0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IGNyZWF0ZWRMaXN0OiBBcnJheTwoY29udGV4dDogV2luZG93IHwgdW5kZWZpbmVkKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IHByZXBhcmVMaXN0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IG92ZXJyaWRlTGlzdCA9IHt9O1xuICAgIGNvbnN0IGFsbE1vZHVsZXMgPSBkZWZhdWx0TW9kdWxlcy5jb25jYXQodGhpcy5vcHRpb25zLm1vZHVsZXMgPz8gW10pO1xuXG4gICAgZm9yIChjb25zdCBtb2R1bGUgb2YgYWxsTW9kdWxlcykge1xuICAgICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgeyByZWNvdmVyLCBvdmVycmlkZSwgY3JlYXRlZCwgcHJlcGFyZSB9ID0gbW9kdWxlKHRoaXMpIHx8IHt9O1xuICAgICAgICBpZiAocmVjb3ZlcikgcmVjb3Zlckxpc3QucHVzaChyZWNvdmVyKTtcbiAgICAgICAgaWYgKGNyZWF0ZWQpIGNyZWF0ZWRMaXN0LnB1c2goY3JlYXRlZCk7XG4gICAgICAgIGlmIChwcmVwYXJlKSBwcmVwYXJlTGlzdC5wdXNoKHByZXBhcmUpO1xuICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAvLyBUaGUgbGF0dGVyIHdpbGwgb3ZlcndyaXRlIHRoZSBwcmV2aW91cyB2YXJpYWJsZVxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgb3ZlcnJpZGVMaXN0W2tleV0pIHtcbiAgICAgICAgICAgICAgd2FybihgXCIke2tleX1cIiBnbG9iYWwgdmFyaWFibGVzIGFyZSBvdmVyd3JpdHRlbi5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJyaWRlTGlzdFtrZXldID0gb3ZlcnJpZGVba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgcmVjb3Zlckxpc3QsIGNyZWF0ZWRMaXN0LCBvdmVycmlkZUxpc3QsIHByZXBhcmVMaXN0IH07XG4gIH1cblxuICBjbGVhckVmZmVjdHMoKSB7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuYmVmb3JlQ2xlYXJFZmZlY3QuZW1pdCgpO1xuICAgIHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcy5yZWNvdmVyTGlzdC5mb3JFYWNoKChmbikgPT4gZm4gJiYgZm4oKSk7XG4gICAgLy8gYGRlZmVyQ2xlYXJFZmZlY3RzYCBuZWVkcyB0byBiZSBwdXQgYXQgdGhlIGVuZFxuICAgIHRoaXMuZGVmZXJDbGVhckVmZmVjdHMuZm9yRWFjaCgoZm4pID0+IGZuICYmIGZuKCkpO1xuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmFmdGVyQ2xlYXJFZmZlY3QuZW1pdCgpO1xuICB9XG5cbiAgb3B0aW1pemVHbG9iYWxNZXRob2QodGVtcEVudktleXM6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICAgIGxldCBjb2RlID0gJyc7XG4gICAgY29uc3QgbWV0aG9kcyA9IG9wdGltaXplTWV0aG9kcy5maWx0ZXIoKHApID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIC8vIElmIHRoZSBtZXRob2QgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQsIGRvIG5vdCBjYXJlXG4gICAgICAgIHAgJiZcbiAgICAgICAgIXRoaXMuaXNQcm90ZWN0VmFyaWFibGUocCkgJiZcbiAgICAgICAgIXRlbXBFbnZLZXlzLmluY2x1ZGVzKHApICYmXG4gICAgICAgIGhhc093bih0aGlzLmdsb2JhbCwgcClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpZiAobWV0aG9kcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb2RlID0gbWV0aG9kcy5yZWR1Y2UoKHByZXZDb2RlLCBuYW1lKSA9PiB7XG4gICAgICAgIC8vIENhbiBvbmx5IHVzZSBgbGV0YCwgaWYgeW91IHVzZSBgdmFyYCxcbiAgICAgICAgLy8gZGVjbGFyaW5nIHRoZSBjaGFyYWN0ZXJpc3RpY3MgaW4gYWR2YW5jZSB3aWxsIGNhdXNlIHlvdSB0byBmZXRjaCBmcm9tIHdpdGgsXG4gICAgICAgIC8vIHJlc3VsdGluZyBpbiBhIHJlY3Vyc2l2ZSBsb29wXG4gICAgICAgIHJldHVybiBgJHtwcmV2Q29kZX0gbGV0ICR7bmFtZX0gPSB3aW5kb3cuJHtuYW1lfTtgO1xuICAgICAgfSwgY29kZSk7XG5cbiAgICAgIGlmICh0aGlzLmdsb2JhbCkge1xuICAgICAgICB0aGlzLmdsb2JhbFtgJHtHQVJGSVNIX09QVElNSVpFX05BTUV9TWV0aG9kc2BdID0gbWV0aG9kcztcbiAgICAgICAgdGhpcy5nbG9iYWxbYCR7R0FSRklTSF9PUFRJTUlaRV9OQU1FfVVwZGF0ZVN0YWNrYF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIGNvZGUgKz0gYHdpbmRvdy4ke0dBUkZJU0hfT1BUSU1JWkVfTkFNRX1VcGRhdGVTdGFjay5wdXNoKGZ1bmN0aW9uKGssdil7ZXZhbChrK1wiPXZcIil9KTtgO1xuICAgIH1cblxuICAgIGlmICh0ZW1wRW52S2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb2RlID0gdGVtcEVudktleXMucmVkdWNlKChwcmV2Q29kZSwgbmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYCR7cHJldkNvZGV9IGxldCAke25hbWV9ID0gJHt0aGlzLmVudlZhcmlhYmxlfS4ke25hbWV9O2A7XG4gICAgICB9LCBjb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuICBjcmVhdGVFeGVjUGFyYW1zKGNvZGVSZWY6IHsgY29kZTogc3RyaW5nIH0sIGVudjogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIGNvbnN0IHsgZGlzYWJsZVdpdGggfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb25zdCB7IHByZXBhcmVMaXN0LCBvdmVycmlkZUxpc3QgfSA9IHRoaXMucmVwbGFjZUdsb2JhbFZhcmlhYmxlcztcblxuICAgIGlmIChwcmVwYXJlTGlzdCkge1xuICAgICAgcHJlcGFyZUxpc3QuZm9yRWFjaCgoZm4pID0+IGZuICYmIGZuKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHdpbmRvdzogdGhpcy5nbG9iYWwsXG4gICAgICAuLi5vdmVycmlkZUxpc3QsXG4gICAgfTtcblxuICAgIGlmIChkaXNhYmxlV2l0aCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIGVudik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVudktleXMgPSBPYmplY3Qua2V5cyhlbnYpO1xuICAgICAgY29uc3Qgb3B0aW1pemVDb2RlID1cbiAgICAgICAgZW52S2V5cy5sZW5ndGggPiAwXG4gICAgICAgICAgPyB0aGlzLm9wdGltaXplR2xvYmFsTWV0aG9kKGVudktleXMpXG4gICAgICAgICAgOiB0aGlzLm9wdGltaXplQ29kZTtcblxuICAgICAgY29kZVJlZi5jb2RlID0gYHdpdGgod2luZG93KSB7OyR7b3B0aW1pemVDb2RlICsgY29kZVJlZi5jb2RlfVxcbn1gO1xuICAgICAgcGFyYW1zW3RoaXMuZW52VmFyaWFibGVdID0gZW52O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwcm9jZXNzRXhlY0Vycm9yKFxuICAgIGU6IGFueSxcbiAgICB1cmw/OiBzdHJpbmcsXG4gICAgZW52PzogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgKSB7XG4gICAgdGhpcy5ob29rcy5saWZlY3ljbGUuaW52b2tlRXJyb3IuZW1pdChlLCB1cmwsIGVudiwgb3B0aW9ucyk7XG4gICAgLy8gZGlzcGF0Y2ggYHdpbmRvdy5vbmVycm9yYFxuICAgIGlmICh0aGlzLmdsb2JhbCAmJiB0eXBlb2YgdGhpcy5nbG9iYWwub25lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgc291cmNlID0gdXJsIHx8IHRoaXMub3B0aW9ucy5iYXNlVXJsO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IFN0cmluZyhlKTtcbiAgICAgIHNhZmVXcmFwcGVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWw/Lm9uZXJyb3I/LmNhbGwodGhpcy5nbG9iYWwsIG1lc3NhZ2UsIHNvdXJjZSwgbnVsbCwgbnVsbCwgZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIGV4ZWNTY3JpcHQoXG4gICAgY29kZTogc3RyaW5nLFxuICAgIGVudiA9IHt9LFxuICAgIHVybCA9ICcnLFxuICAgIG9wdGlvbnM/OiBpbnRlcmZhY2VzLkV4ZWNTY3JpcHRPcHRpb25zLFxuICApIHtcbiAgICBjb25zdCBjb2RlUmVmID0geyBjb2RlIH07XG4gICAgY29uc3QgeyBhc3luYyB9ID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUludm9rZS5lbWl0KGNvZGVSZWYsIHVybCwgZW52LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHJldmVydEN1cnJlbnRTY3JpcHQgPSBzZXREb2NDdXJyZW50U2NyaXB0KFxuICAgICAgdGhpcy5nbG9iYWw/LmRvY3VtZW50LFxuICAgICAgY29kZVJlZi5jb2RlLFxuICAgICAgZmFsc2UsXG4gICAgICB1cmwsXG4gICAgICBhc3luYyxcbiAgICAgIG9wdGlvbnM/Lm9yaWdpblNjcmlwdCxcbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY3JlYXRlRXhlY1BhcmFtcyhjb2RlUmVmLCBlbnYpO1xuICAgICAgY29kZVJlZi5jb2RlICs9IGBcXG4ke3VybCA/IGAvLyMgc291cmNlVVJMPSR7dXJsfVxcbmAgOiAnJ31gO1xuICAgICAgZXZhbFdpdGhFbnYoY29kZVJlZi5jb2RlLCBwYXJhbXMsIHRoaXMuZ2xvYmFsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnByb2Nlc3NFeGVjRXJyb3IoZSwgdXJsLCBlbnYsIG9wdGlvbnMpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKHJldmVydEN1cnJlbnRTY3JpcHQpO1xuICAgIH1cblxuICAgIHRoaXMuaG9va3MubGlmZWN5Y2xlLmFmdGVySW52b2tlLmVtaXQoY29kZVJlZiwgdXJsLCBlbnYsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGdldE5hdGl2ZVdpbmRvdygpIHtcbiAgICBsZXQgbW9kdWxlID0gd2luZG93O1xuICAgIHdoaWxlIChpc01vZHVsZShtb2R1bGUpKSB7XG4gICAgICBtb2R1bGUgPSBtb2R1bGVbX19nYXJmaXNoR2xvYmFsX18gYXMgYW55XSBhcyBXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1vZHVsZTtcbiAgfVxuXG4gIHN0YXRpYyBjYW5TdXBwb3J0KCkge1xuICAgIGxldCBzdXBwb3J0ID0gdHJ1ZTtcbiAgICBpZiAoXG4gICAgICAhd2luZG93LlByb3h5IHx8XG4gICAgICAhQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzIHx8XG4gICAgICAhU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc1xuICAgICkge1xuICAgICAgc3VwcG9ydCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBsZXQgc3RhdGVtZW50XG4gICAgaWYgKHN1cHBvcnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBGdW5jdGlvbignbGV0IGEgPSA2NjY7Jyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHN1cHBvcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzdXBwb3J0KSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnVGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBcInZtIHNhbmRib3hcIiwnICtcbiAgICAgICAgICAnUGxlYXNlIHVzZSB0aGUgXCJzbmFwc2hvdCBzYW5kYm94XCIgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cHBvcnQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgeyB3YXJuLCBpc1BsYWluT2JqZWN0IH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBTYW5kYm94IH0gZnJvbSAnLi9zYW5kYm94JztcbmltcG9ydCB7IHJlY29yZFN0eWxlZENvbXBvbmVudENTU1J1bGVzLCByZWJ1aWxkQ1NTUnVsZXMgfSBmcm9tICcuL2R5bmFtaWNOb2RlJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BnYXJmaXNoL2NvcmUnIHtcbiAgZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIEdhcmZpc2gge1xuICAgIHNldEdsb2JhbFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IHZvaWQ7XG4gICAgZ2V0R2xvYmFsT2JqZWN0OiAoKSA9PiBXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpcztcbiAgICBjbGVhckVzY2FwZUVmZmVjdDogKGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSkgPT4gdm9pZDtcbiAgfVxuXG4gIGV4cG9ydCBuYW1lc3BhY2UgaW50ZXJmYWNlcyB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBTYW5kYm94Q29uZmlnIHtcbiAgICAgIG1vZHVsZXM/OiBBcnJheTxNb2R1bGU+IHwgUmVjb3JkPHN0cmluZywgTW9kdWxlPjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG4gICAgICBwcm90ZWN0VmFyaWFibGU/OiBQcm9wZXJ0eUtleVtdO1xuICAgICAgaW5zdWxhdGlvblZhcmlhYmxlPzogUHJvcGVydHlLZXlbXTtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEFwcEluZm8ge1xuICAgICAgcHJvdGVjdFZhcmlhYmxlPzogUHJvcGVydHlLZXlbXTtcbiAgICAgIGluc3VsYXRpb25WYXJpYWJsZT86IFByb3BlcnR5S2V5W107XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBBcHAge1xuICAgICAgdm1TYW5kYm94PzogU2FuZGJveDtcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3BlY2lhbEV4dGVybmFsVmFyaWFibGVzID0gW1xuICAnb25lcnJvcicsXG4gICd3ZWJwYWNranNvbnAnLFxuICAnX19SRUFDVF9FUlJPUl9PVkVSTEFZX0dMT0JBTF9IT09LX18nLFxuICAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSA/ICd3ZWJwYWNrSG90VXBkYXRlJyA6ICcnLFxuXTtcblxuZnVuY3Rpb24gY29tcGF0aWJsZU9sZE1vZHVsZShcbiAgbW9kdWxlczogQXJyYXk8TW9kdWxlPiB8IFJlY29yZDxzdHJpbmcsIE1vZHVsZT4sXG4pOiBBcnJheTxNb2R1bGU+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG1vZHVsZXMpKSB7XG4gICAgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgd2FybignXCJ2bSBzYW5kYm94XCIgbW9kdWxlcyBzaG91bGQgYmUgYW4gYXJyYXknKTtcbiAgICBjb25zdCBsaXN0OiBBcnJheTxNb2R1bGU+ID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbW9kdWxlcykge1xuICAgICAgbGlzdC5wdXNoKG1vZHVsZXNba2V5XSk7XG4gICAgfVxuICAgIG1vZHVsZXMgPSBsaXN0O1xuICB9XG4gIHJldHVybiBtb2R1bGVzO1xufVxuXG5mdW5jdGlvbiByZXdyaXRlQXBwQW5kU2FuZGJveChcbiAgR2FyZmlzaDogaW50ZXJmYWNlcy5HYXJmaXNoLFxuICBhcHA6IGludGVyZmFjZXMuQXBwLFxuICBzYW5kYm94OiBTYW5kYm94LFxuKSB7XG4gIGNvbnN0IG9yaWdpbkV4ZWNTY3JpcHQgPSBzYW5kYm94LmV4ZWNTY3JpcHQ7XG4gIC8vIFJld3JpdGUgc2FuZGJveCBhdHRyaWJ1dGVzXG4gIHNhbmRib3gubG9hZGVyID0gR2FyZmlzaC5sb2FkZXI7XG4gIHNhbmRib3guZXhlY1NjcmlwdCA9IChjb2RlLCBlbnYsIHVybCwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGV2YWxIb29rc0FyZ3MgPSBbYXBwLmFwcEluZm8sIGNvZGUsIGVudiwgdXJsLCBvcHRpb25zXSBhcyBjb25zdDtcbiAgICBhcHAuaG9va3MubGlmZWN5Y2xlLmJlZm9yZUV2YWwuZW1pdCguLi5ldmFsSG9va3NBcmdzKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gb3JpZ2luRXhlY1NjcmlwdC5jYWxsKFxuICAgICAgICBzYW5kYm94LFxuICAgICAgICBjb2RlLFxuICAgICAgICB7XG4gICAgICAgICAgLy8gRm9yIGFwcGxpY2F0aW9uIG9mIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICAgICAgICAgIC4uLmVudixcbiAgICAgICAgICAuLi5hcHAuZ2V0RXhlY1NjcmlwdEVudihvcHRpb25zPy5ub0VudHJ5KSxcbiAgICAgICAgfSxcbiAgICAgICAgdXJsLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgKTtcbiAgICAgIGFwcC5ob29rcy5saWZlY3ljbGUuYWZ0ZXJFdmFsLmVtaXQoLi4uZXZhbEhvb2tzQXJncyk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgYXBwLmhvb2tzLmxpZmVjeWNsZS5lcnJvckV4ZWNDb2RlLmVtaXQoZXJyLCAuLi5ldmFsSG9va3NBcmdzKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV3cml0ZSBhcHAgYXR0cmlidXRlc1xuICBhcHAudm1TYW5kYm94ID0gc2FuZGJveDtcbiAgYXBwLmdsb2JhbCA9IHNhbmRib3guZ2xvYmFsO1xuICBhcHAuc3RyaWN0SXNvbGF0aW9uID0gc2FuZGJveC5vcHRpb25zLnN0cmljdElzb2xhdGlvbiA/PyBmYWxzZTtcbiAgYXBwLnJ1bkNvZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG9yaWdpbkV4ZWNTY3JpcHQuYXBwbHkoc2FuZGJveCwgYXJndW1lbnRzKTtcbiAgfTtcbiAgaWYgKGFwcC5lbnRyeU1hbmFnZXIuRE9NQXBpcyAmJiBzYW5kYm94Lmdsb2JhbCkge1xuICAgIGFwcC5lbnRyeU1hbmFnZXIuRE9NQXBpcy5kb2N1bWVudCA9IHNhbmRib3guZ2xvYmFsLmRvY3VtZW50O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoR2FyZmlzaDogaW50ZXJmYWNlcy5HYXJmaXNoKSB7XG4gIGNvbnN0IGNhblN1cHBvcnQgPSBTYW5kYm94LmNhblN1cHBvcnQoKTtcblxuICBjb25zdCBvcHRpb25zOiBpbnRlcmZhY2VzLlBsdWdpbiA9IHtcbiAgICBuYW1lOiAnYnJvd3Nlci12bScsXG4gICAgdmVyc2lvbjogJzEuMTIuMCcsXG5cbiAgICBhZnRlckxvYWQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIWNhblN1cHBvcnQgfHxcbiAgICAgICAgIWFwcEluc3RhbmNlIHx8XG4gICAgICAgIGFwcEluc3RhbmNlPy52bVNhbmRib3ggfHxcbiAgICAgICAgYXBwSW5mby5zYW5kYm94ID09PSBmYWxzZSB8fCAvLyBFbnN1cmUgdGhhdCBvbGQgdmVyc2lvbnMgY29tcGF0aWJsZVxuICAgICAgICAoYXBwSW5mby5zYW5kYm94ICYmIGFwcEluZm8uc2FuZGJveC5vcGVuID09PSBmYWxzZSkgfHxcbiAgICAgICAgKGFwcEluZm8uc2FuZGJveCAmJiBhcHBJbmZvLnNhbmRib3guc25hcHNob3QpXG4gICAgICApIHtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlPy52bVNhbmRib3gpIHtcbiAgICAgICAgICBhcHBJbnN0YW5jZS5nbG9iYWwgPSBhcHBJbnN0YW5jZS52bVNhbmRib3guZ2xvYmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV3cml0ZUFwcEFuZFNhbmRib3goXG4gICAgICAgIEdhcmZpc2gsXG4gICAgICAgIGFwcEluc3RhbmNlLFxuICAgICAgICBuZXcgU2FuZGJveCh7XG4gICAgICAgICAgbmFtZXNwYWNlOiBhcHBJbmZvLm5hbWUsXG4gICAgICAgICAgYWRkU291cmNlTGlzdDogYXBwSW5zdGFuY2UuYWRkU291cmNlTGlzdC5iaW5kKGFwcEluc3RhbmNlKSxcbiAgICAgICAgICBiYXNlVXJsOiBhcHBJbnN0YW5jZS5lbnRyeU1hbmFnZXIudXJsLFxuICAgICAgICAgIG1vZHVsZXM6IGNvbXBhdGlibGVPbGRNb2R1bGUoYXBwSW5mby5zYW5kYm94Py5tb2R1bGVzIHx8IFtdKSxcbiAgICAgICAgICBmaXhCYXNlVXJsOiBCb29sZWFuKGFwcEluZm8uc2FuZGJveD8uZml4QmFzZVVybCksXG4gICAgICAgICAgZGlzYWJsZVdpdGg6IEJvb2xlYW4oYXBwSW5mby5zYW5kYm94Py5kaXNhYmxlV2l0aCksXG4gICAgICAgICAgc3RyaWN0SXNvbGF0aW9uOiBCb29sZWFuKGFwcEluZm8uc2FuZGJveD8uc3RyaWN0SXNvbGF0aW9uKSxcblxuICAgICAgICAgIGVsOiAoKSA9PiBhcHBJbnN0YW5jZS5odG1sTm9kZSxcbiAgICAgICAgICBzdHlsZVNjb3BlSWQ6ICgpID0+IGFwcEluc3RhbmNlLmFwcENvbnRhaW5lci5pZCxcbiAgICAgICAgICBwcm90ZWN0VmFyaWFibGU6ICgpID0+IGFwcEluZm8ucHJvdGVjdFZhcmlhYmxlIHx8IFtdLFxuICAgICAgICAgIGluc3VsYXRpb25WYXJpYWJsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgLi4uc3BlY2lhbEV4dGVybmFsVmFyaWFibGVzLFxuICAgICAgICAgICAgICAuLi4oYXBwSW5mby5pbnN1bGF0aW9uVmFyaWFibGUgfHwgW10pLFxuICAgICAgICAgICAgXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBiZWZvcmVVbm1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlKSB7XG4gICAgICBpZiAoYXBwSW5zdGFuY2Uudm1TYW5kYm94KSB7XG4gICAgICAgIHJlY29yZFN0eWxlZENvbXBvbmVudENTU1J1bGVzKFxuICAgICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5keW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQsXG4gICAgICAgICAgYXBwSW5zdGFuY2Uudm1TYW5kYm94LnN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJZiB0aGUgYXBwIGlzIHVuaW5zdGFsbGVkLCB0aGUgc2FuZGJveCBuZWVkcyB0byBjbGVhciBhbGwgZWZmZWN0cyBhbmQgdGhlbiByZXNldFxuICAgIGFmdGVyVW5tb3VudChhcHBJbmZvLCBhcHBJbnN0YW5jZSwgaXNDYWNoZU1vZGUpIHtcbiAgICAgIC8vIFRoZSBjYWNoaW5nIHBhdHRlcm4gdG8gcmV0YWluIHRoZSBzYW1lIGNvbnRleHRcbiAgICAgIGlmIChhcHBJbnN0YW5jZS52bVNhbmRib3ggJiYgIWlzQ2FjaGVNb2RlKSB7XG4gICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5yZXNldCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZnRlck1vdW50KGFwcEluZm8sIGFwcEluc3RhbmNlKSB7XG4gICAgICBpZiAoYXBwSW5zdGFuY2Uudm1TYW5kYm94KSB7XG4gICAgICAgIHJlYnVpbGRDU1NSdWxlcyhcbiAgICAgICAgICBhcHBJbnN0YW5jZS52bVNhbmRib3guZHluYW1pY1N0eWxlU2hlZXRFbGVtZW50U2V0LFxuICAgICAgICAgIGFwcEluc3RhbmNlLnZtU2FuZGJveC5zdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcCxcbiAgICAgICAgKTtcbiAgICAgICAgYXBwSW5zdGFuY2Uudm1TYW5kYm94LmV4ZWNTY3JpcHQoYFxuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm9ubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgd2luZG93Lm9ubG9hZC5jYWxsKHdpbmRvdyk7XG4gICAgICAgICAgfVxuICAgICAgICBgKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuLy8gRXhwb3J0IEdhcmZpc2ggcGx1Z2luXG5leHBvcnQgZnVuY3Rpb24gR2FyZmlzaEJyb3dzZXJWbSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgR2FyZmlzaC5nZXRHbG9iYWxPYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gU2FuZGJveC5nZXROYXRpdmVXaW5kb3coKTtcbiAgICB9O1xuXG4gICAgR2FyZmlzaC5zZXRHbG9iYWxWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gKHRoaXMuZ2V0R2xvYmFsT2JqZWN0KClba2V5XSA9IHZhbHVlKTtcbiAgICB9O1xuXG4gICAgR2FyZmlzaC5jbGVhckVzY2FwZUVmZmVjdCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBjb25zdCBnbG9iYWwgPSB0aGlzLmdldEdsb2JhbE9iamVjdCgpO1xuICAgICAgaWYgKGtleSBpbiBnbG9iYWwpIHtcbiAgICAgICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjcmVhdGVPcHRpb25zKEdhcmZpc2gpO1xuICB9O1xufVxuIiwgImxldCByYXdBZGRFdmVudExpc3RlbmVyOiBhbnk7XG5sZXQgcmF3UmVtb3ZlRXZlbnRMaXN0ZW5lcjogYW55O1xuXG5leHBvcnQgY2xhc3MgUGF0Y2hFdmVudCB7XG4gIHByaXZhdGUgbGlzdGVuZXJNYXAgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFtdPigpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIC8vIHJlc3RvcmUgcHJlIGV2ZW50XG4gICAgdGhpcy5saXN0ZW5lck1hcC5mb3JFYWNoKChsaXN0ZW5lcnMsIHR5cGUpID0+XG4gICAgICBbLi4ubGlzdGVuZXJzXS5mb3JFYWNoKChsaXN0ZW5lcikgPT5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaWYgKCFyYXdBZGRFdmVudExpc3RlbmVyIHx8ICFyYXdSZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICByYXdBZGRFdmVudExpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgICByYXdSZW1vdmVFdmVudExpc3RlbmVyID0gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPSAoXG4gICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCxcbiAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMsXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyTWFwLmdldCh0eXBlKSB8fCBbXTtcbiAgICAgIHRoaXMubGlzdGVuZXJNYXAuc2V0KHR5cGUsIFsuLi5saXN0ZW5lcnMsIGxpc3RlbmVyXSk7XG4gICAgICByZXR1cm4gcmF3QWRkRXZlbnRMaXN0ZW5lci5jYWxsKHdpbmRvdywgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPSAoXG4gICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCxcbiAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMsXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBzdG9yZWRUeXBlTGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lck1hcC5nZXQodHlwZSk7XG4gICAgICBpZiAoXG4gICAgICAgIHN0b3JlZFR5cGVMaXN0ZW5lcnMgJiZcbiAgICAgICAgc3RvcmVkVHlwZUxpc3RlbmVycy5sZW5ndGggJiZcbiAgICAgICAgc3RvcmVkVHlwZUxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICBzdG9yZWRUeXBlTGlzdGVuZXJzLnNwbGljZShzdG9yZWRUeXBlTGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpLCAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByYXdSZW1vdmVFdmVudExpc3RlbmVyLmNhbGwod2luZG93LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMubGlzdGVuZXJNYXAuZm9yRWFjaCgobGlzdGVuZXJzLCB0eXBlKSA9PlxuICAgICAgWy4uLmxpc3RlbmVyc10uZm9yRWFjaCgobGlzdGVuZXIpID0+XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIC8vIGV2ZW50XHVGRjBDXHU1NzI4d2luZG93XHU1MzlGXHU1NzhCXHU5NEZFXHU0RTBBXHVGRjBDXHU1QzA2d2luZG93XHU0RTBBXHU4OTg2XHU3NkQ2XHU3Njg0XHU0RUUzXHU3NDA2XHU0RThCXHU0RUY2XHU1MjIwXHU5NjY0XHU1MzczXHU1M0VGXG4gICAgLy8gZGVsZXRlIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIC8vIGRlbGV0ZSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJhd1JlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPSByYXdBZGRFdmVudExpc3RlbmVyO1xuICB9XG59XG4iLCAiZXhwb3J0IHR5cGUgU25hcHNob3REaWZmID0ge1xuICBjcmVhdGVkOiBTbmFwc2hvdDtcbiAgcmVtb3ZlZDogU25hcHNob3Q7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHlsZWRDb21wb25lbnRzTGlrZShlbGVtZW50OiBIVE1MU3R5bGVFbGVtZW50KSB7XG4gIC8vIEEgc3R5bGVkLWNvbXBvbmVudHMgbGlrZWQgZWxlbWVudCBoYXMgbm8gdGV4dENvbnRlbnQgYnV0IGtlZXAgdGhlIHJ1bGVzIGluIGl0cyBzaGVldC5jc3NSdWxlcy5cbiAgcmV0dXJuIChcbiAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFN0eWxlRWxlbWVudCAmJlxuICAgICFlbGVtZW50LnRleHRDb250ZW50ICYmXG4gICAgZWxlbWVudC5zaGVldD8uY3NzUnVsZXMubGVuZ3RoXG4gICk7XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFwc2hvdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhcnJEb21zOiBBcnJheTxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLmFyckRvbXMgPSBhcnJEb21zO1xuICB9XG5cbiAgc3RhdGljIHRha2UodGFyZ2V0OiBIVE1MRWxlbWVudCk6IFNuYXBzaG90O1xuICBzdGF0aWMgdGFrZTxUIGV4dGVuZHMgRWxlbWVudCA9IEVsZW1lbnQ+KFxuICAgIG5vZGVMaXN0OiBIVE1MQ29sbGVjdGlvbk9mPFQ+LFxuICApOiBTbmFwc2hvdDtcbiAgc3RhdGljIHRha2Uobm9kZUxpc3Q/OiBOb2RlTGlzdCk6IFNuYXBzaG90O1xuICBzdGF0aWMgdGFrZSh0YXJnZXQ6IEhUTUxFbGVtZW50IHwgSFRNTENvbGxlY3Rpb24gfCBOb2RlTGlzdCA9IGRvY3VtZW50LmhlYWQpIHtcbiAgICBsZXQgbGlzdDogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuICAgIGlmICgodGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jaGlsZE5vZGVzKSB7XG4gICAgICBsaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoKHRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2hpbGROb2Rlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFNuYXBzaG90KGxpc3QpO1xuICB9XG5cbiAgZGlmZihzOiBTbmFwc2hvdCk6IFNuYXBzaG90RGlmZiB7XG4gICAgaWYgKCFzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVkOiBuZXcgU25hcHNob3QoW10pLFxuICAgICAgICByZW1vdmVkOiBuZXcgU25hcHNob3QoW10pLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY3JlYXRlZDogbmV3IFNuYXBzaG90KFxuICAgICAgICB0aGlzLmFyckRvbXMuZmlsdGVyKChkKSA9PiBzLmFyckRvbXMuaW5kZXhPZihkKSA9PT0gLTEpLFxuICAgICAgKSxcbiAgICAgIHJlbW92ZWQ6IG5ldyBTbmFwc2hvdChcbiAgICAgICAgcy5hcnJEb21zLmZpbHRlcigoZCkgPT4gdGhpcy5hcnJEb21zLmluZGV4T2YoZCkgPT09IC0xKSxcbiAgICAgICksXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0b3Ige1xuICBkeW5hbWljU3R5bGVTaGVldEVsZW1lbnRTZXQ6IFNldDxIVE1MU3R5bGVFbGVtZW50PjtcbiAgc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXA6IFdlYWtNYXA8SFRNTFN0eWxlRWxlbWVudCwgQ1NTUnVsZUxpc3Q+O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZG9tOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmhlYWQpIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLmR5bmFtaWNTdHlsZVNoZWV0RWxlbWVudFNldCA9IG5ldyBTZXQ8SFRNTFN0eWxlRWxlbWVudD4oKTtcbiAgICB0aGlzLnN0eWxlZENvbXBvbmVudENTU1J1bGVzTWFwID0gbmV3IFdlYWtNYXA8XG4gICAgICBIVE1MU3R5bGVFbGVtZW50LFxuICAgICAgQ1NTUnVsZUxpc3RcbiAgICA+KCk7XG4gIH1cblxuICBhZGQoZnJvbTogU25hcHNob3QpOiB2b2lkO1xuICBhZGQoY3JlYXRlZDogU25hcHNob3QsIHJlbW92ZWQ6IFNuYXBzaG90KTogdm9pZDtcbiAgYWRkKGNyZWF0ZWRPclNuYXBzaG90OiBTbmFwc2hvdCwgcmVtb3ZlZD86IFNuYXBzaG90KSB7XG4gICAgbGV0IGNyZWF0ZWQ6IFNuYXBzaG90O1xuICAgIGlmICghcmVtb3ZlZCkge1xuICAgICAgY29uc3QgZGlmZiA9IFNuYXBzaG90LnRha2UodGhpcy5kb20pLmRpZmYoY3JlYXRlZE9yU25hcHNob3QpO1xuICAgICAgY3JlYXRlZCA9IGRpZmYuY3JlYXRlZDtcbiAgICAgIHJlbW92ZWQgPSBkaWZmLnJlbW92ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZWQgPSBjcmVhdGVkT3JTbmFwc2hvdDtcbiAgICB9XG4gICAgY3JlYXRlZC5hcnJEb21zLnJlZHVjZSgocHJldiwgdmFsKSA9PiB7XG4gICAgICBwcmV2LmFwcGVuZENoaWxkKHZhbCk7XG4gICAgICBpZiAodmFsIGluc3RhbmNlb2YgSFRNTFN0eWxlRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjc3NSdWxlcyA9IHRoaXMuc3R5bGVkQ29tcG9uZW50Q1NTUnVsZXNNYXAuZ2V0KHZhbCk7XG4gICAgICAgIGlmIChjc3NSdWxlcyAmJiBjc3NSdWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNzc1J1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NSdWxlID0gY3NzUnVsZXNbaV07XG4gICAgICAgICAgICAvLyByZS1pbnNlcnQgcnVsZXMgZm9yIHN0eWxlZC1jb21wb25lbnRzIGVsZW1lbnRcbiAgICAgICAgICAgIHZhbC5zaGVldD8uaW5zZXJ0UnVsZShjc3NSdWxlLmNzc1RleHQsIHZhbC5zaGVldD8uY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRoaXMuZG9tKTtcbiAgICByZW1vdmVkLmFyckRvbXMucmVkdWNlKChwcmV2LCB2YWwpID0+IHtcbiAgICAgIHByZXYucmVtb3ZlQ2hpbGQodmFsKTtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRoaXMuZG9tKTtcbiAgfVxuXG4gIHJlbW92ZSh0bzogU25hcHNob3QpOiB2b2lkO1xuICByZW1vdmUoY3JlYXRlZDogU25hcHNob3QsIHJlbW92ZWQ6IFNuYXBzaG90KTogdm9pZDtcbiAgcmVtb3ZlKGNyZWF0ZWRPclNuYXBzaG90OiBTbmFwc2hvdCwgcmVtb3ZlZD86IFNuYXBzaG90KSB7XG4gICAgbGV0IGNyZWF0ZWQ6IFNuYXBzaG90O1xuICAgIGlmICghcmVtb3ZlZCkge1xuICAgICAgY29uc3QgZGlmZiA9IFNuYXBzaG90LnRha2UodGhpcy5kb20pLmRpZmYoY3JlYXRlZE9yU25hcHNob3QpO1xuICAgICAgY3JlYXRlZCA9IGRpZmYuY3JlYXRlZDtcbiAgICAgIHJlbW92ZWQgPSBkaWZmLnJlbW92ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZWQgPSBjcmVhdGVkT3JTbmFwc2hvdDtcbiAgICB9XG4gICAgY3JlYXRlZC5hcnJEb21zLnJlZHVjZSgocHJldiwgdmFsKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHZhbCBpbnN0YW5jZW9mIEhUTUxTdHlsZUVsZW1lbnQgJiZcbiAgICAgICAgaXNTdHlsZWRDb21wb25lbnRzTGlrZSh2YWwpICYmXG4gICAgICAgIHZhbD8uc2hlZXQ/LmNzc1J1bGVzXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zdHlsZWRDb21wb25lbnRDU1NSdWxlc01hcC5zZXQodmFsLCB2YWwuc2hlZXQuY3NzUnVsZXMpO1xuICAgICAgfVxuICAgICAgcHJldi5yZW1vdmVDaGlsZCh2YWwpO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgdGhpcy5kb20pO1xuICAgIHJlbW92ZWQuYXJyRG9tcy5yZWR1Y2UoKHByZXYsIHZhbCkgPT4ge1xuICAgICAgcHJldi5hcHBlbmRDaGlsZCh2YWwpO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgdGhpcy5kb20pO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgSW50ZXJjZXB0b3IsIFNuYXBzaG90LCBTbmFwc2hvdERpZmYgfSBmcm9tICcuL2ludGVyY2VwdG9yJztcblxuaW50ZXJmYWNlIEVmZmVjdEN0IHtcbiAgc3JjOiBzdHJpbmc7XG4gIG91dGVySFRNTDogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBFZmZlY3RNYXAge1xuICBzdHlsZTogQXJyYXk8RWZmZWN0Q3Q+O1xuICBzY3JpcHQ6IEFycmF5PEVmZmVjdEN0PjtcbiAgb3RoZXI6IEFycmF5PEVmZmVjdEN0Pjtcbn1cblxuZXhwb3J0IGNsYXNzIFBhdGNoU3R5bGUge1xuICBwdWJsaWMgaGVhZEludGVyY2VwdG9yOiBJbnRlcmNlcHRvcjtcbiAgcHJpdmF0ZSBkb21TbmFwc2hvdEJlZm9yZSE6IFNuYXBzaG90O1xuICBwcml2YXRlIGRvbVNuYXBzaG90TXV0YXRlZCE6IFNuYXBzaG90RGlmZiB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkSW50ZXJjZXB0b3IgPSBuZXcgSW50ZXJjZXB0b3IoZG9jdW1lbnQuaGVhZCk7XG4gIH1cblxuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgLy8gXHU4QkIwXHU1RjU1XHU1RjUzXHU1MjREZG9tXHU4MjgyXHU3MEI5XHUzMDAxXHU2MDYyXHU1OTBEXHU0RTRCXHU1MjREZG9tXHU4MjgyXHU3MEI5XHU1MjZGXHU0RjVDXHU3NTI4XG4gICAgdGhpcy5kb21TbmFwc2hvdEJlZm9yZSA9IFNuYXBzaG90LnRha2UoKTtcbiAgICBpZiAodGhpcy5kb21TbmFwc2hvdE11dGF0ZWQpXG4gICAgICB0aGlzLmhlYWRJbnRlcmNlcHRvci5hZGQoXG4gICAgICAgIHRoaXMuZG9tU25hcHNob3RNdXRhdGVkLmNyZWF0ZWQsXG4gICAgICAgIHRoaXMuZG9tU25hcHNob3RNdXRhdGVkLnJlbW92ZWQsXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUoKSB7XG4gICAgLy8gXHU2MDYyXHU1OTBEXHU2Qzk5XHU3NkQyXHU4RkQwXHU4ODRDXHU1MjREZG9tXHU4MjgyXHU3MEI5XHU3M0FGXHU1ODgzXHVGRjBDXHU1RTc2XHU1QzA2XHU1REVFXHU1RjAyXHU1MDNDXHU4RkRCXHU4ODRDXHU3RjEzXHU1QjU4XG4gICAgY29uc3QgZG9tU25hcHNob3QgPSBTbmFwc2hvdC50YWtlKCk7XG4gICAgdGhpcy5kb21TbmFwc2hvdE11dGF0ZWQgPSBkb21TbmFwc2hvdC5kaWZmKHRoaXMuZG9tU25hcHNob3RCZWZvcmUpO1xuICAgIGlmICghdGhpcy5kb21TbmFwc2hvdE11dGF0ZWQpIHJldHVybjtcbiAgICB0aGlzLmhlYWRJbnRlcmNlcHRvci5yZW1vdmUoXG4gICAgICB0aGlzLmRvbVNuYXBzaG90TXV0YXRlZC5jcmVhdGVkLFxuICAgICAgdGhpcy5kb21TbmFwc2hvdE11dGF0ZWQucmVtb3ZlZCxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRlQ3R4KGFyckRvbXM6IEFycmF5PEhUTUxFbGVtZW50Pikge1xuICAgIGNvbnN0IGVmZmVjdE1hcDogRWZmZWN0TWFwID0ge1xuICAgICAgc3R5bGU6IFtdLFxuICAgICAgc2NyaXB0OiBbXSxcbiAgICAgIG90aGVyOiBbXSxcbiAgICB9O1xuXG4gICAgYXJyRG9tcy5mb3JFYWNoKChkb20pID0+IHtcbiAgICAgIGxldCB0eXBlOiAnb3RoZXInIHwgJ3N0eWxlJyB8ICdzY3JpcHQnID0gJ290aGVyJztcbiAgICAgIGlmICgvY3NzLy50ZXN0KChkb20gYXMgYW55KS50eXBlKSkgdHlwZSA9ICdzdHlsZSc7XG4gICAgICBpZiAoL2phdmFzY3JpcHQvLnRlc3QoKGRvbSBhcyBhbnkpLnR5cGUpKSB0eXBlID0gJ3NjcmlwdCc7XG4gICAgICBlZmZlY3RNYXBbdHlwZV0ucHVzaCh7XG4gICAgICAgIHNyYzogKGRvbSBhcyBhbnkpLnNyYyxcbiAgICAgICAgb3V0ZXJIVE1MOiBkb20ub3V0ZXJIVE1MLFxuICAgICAgICBjb250ZW50OiBkb20uaW5uZXJUZXh0LFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZWZmZWN0TWFwO1xuICB9XG59XG4iLCAibGV0IHJhd1B1c2hTdGF0ZTogYW55O1xubGV0IHJhd1JlcGxhY2VTdGF0ZTogYW55O1xuXG5leHBvcnQgY2xhc3MgUGF0Y2hIaXN0b3J5IHtcbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIGlmICghcmF3UHVzaFN0YXRlIHx8ICFyYXdSZXBsYWNlU3RhdGUpIHtcbiAgICAgIHJhd1B1c2hTdGF0ZSA9IHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZTtcbiAgICAgIHJhd1JlcGxhY2VTdGF0ZSA9IHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPSByYXdQdXNoU3RhdGU7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID0gcmF3UmVwbGFjZVN0YXRlO1xuICB9XG59XG4iLCAiY29uc3QgcmF3SW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWw7XG5jb25zdCByYXdDbGVhckludGVydmFsID0gd2luZG93LmNsZWFySW50ZXJ2YWw7XG5cbmV4cG9ydCBjbGFzcyBQYXRjaEludGVydmFsIHtcbiAgcHJpdmF0ZSBpbnRlcnZhbHM6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgd2luZG93LnNldEludGVydmFsID0gKFxuICAgICAgaGFuZGxlcjogRnVuY3Rpb24sXG4gICAgICB0aW1lb3V0PzogbnVtYmVyLFxuICAgICAgLi4uYXJnczogYW55W11cbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGludGVydmFsSWQgPSByYXdJbnRlcnZhbChoYW5kbGVyLCB0aW1lb3V0LCAuLi5hcmdzKTtcbiAgICAgIHRoaXMuaW50ZXJ2YWxzID0gWy4uLnRoaXMuaW50ZXJ2YWxzLCBpbnRlcnZhbElkXTtcbiAgICAgIHJldHVybiBpbnRlcnZhbElkO1xuICAgIH07XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwgPSAoaW50ZXJ2YWxJZDogbnVtYmVyKSA9PiB7XG4gICAgICB0aGlzLmludGVydmFscyA9IHRoaXMuaW50ZXJ2YWxzLmZpbHRlcigoaWQpID0+IGlkICE9PSBpbnRlcnZhbElkKTtcbiAgICAgIHJldHVybiByYXdDbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZShfY2xlYXJFZmZlY3RzPzogYm9vbGVhbikge1xuICAgIGlmIChfY2xlYXJFZmZlY3RzKSB7XG4gICAgICB0aGlzLmludGVydmFscy5mb3JFYWNoKChpZCkgPT4gd2luZG93LmNsZWFySW50ZXJ2YWwoaWQpKTtcbiAgICB9XG4gICAgd2luZG93LnNldEludGVydmFsID0gcmF3SW50ZXJ2YWw7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwgPSByYXdDbGVhckludGVydmFsO1xuICB9XG59XG4iLCAiY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaGFzT3duKG9iajogYW55LCBrZXk6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxuZXhwb3J0IGNsYXNzIFBhdGNoR2xvYmFsVmFsIHtcbiAgcHVibGljIHNuYXBzaG90T3JpZ2luYWwgPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgc25hcHNob3RNdXRhdGVkOiBhbnkgPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgd2hpdGVMaXN0OiBBcnJheTxQcm9wZXJ0eUtleT4gPSBbXG4gICAgJ2xvY2F0aW9uJyxcbiAgICAnYWRkRXZlbnRMaXN0ZW5lcicsXG4gICAgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLFxuICAgICd3ZWJwYWNrSnNvbnAnLFxuICBdO1xuICAvLyAsJ2FkZEV2ZW50TGlzdGVuZXInLCdyZW1vdmVFdmVudExpc3RlbmVyJywnY2xlYXJJbnRlcnZhbCcsJ3NldEludGVydmFsJywnd2Via2l0U3RvcmFnZUluZm8nXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0YXJnZXRUb1Byb3RlY3Q6IGFueSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IHdpbmRvd1xuICAgICAgOiBnbG9iYWxUaGlzLFxuICAgIHB1YmxpYyBwcm90ZWN0VmFyaWFibGU6IEFycmF5PFByb3BlcnR5S2V5PiA9IFtdLFxuICApIHtcbiAgICB0aGlzLnRhcmdldFRvUHJvdGVjdCA9IHRhcmdldFRvUHJvdGVjdDtcbiAgICB0aGlzLnByb3RlY3RWYXJpYWJsZSA9IHByb3RlY3RWYXJpYWJsZTtcbiAgICAvLyB0aGlzLndoaXRlTGlzdCA9IFsuLi50aGlzLndoaXRlTGlzdCwgLi4uR2FyQ29uZmlnLnByb3RlY3RWYXJpYWJsZSFdO1xuICAgIHRoaXMud2hpdGVMaXN0ID0gWy4uLnRoaXMud2hpdGVMaXN0LCAuLi5wcm90ZWN0VmFyaWFibGVdO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNhZmVJdGVyYXRvcihmbjogRnVuY3Rpb24pIHtcbiAgICAvLyBTa2lwIHRoZSB2YXJpYWJsZXMgbm90IHRyYXZlcnNlXG4gICAgLy8gRG8gbm90IGluY2x1ZGUgYSBzeW1ib2xcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy50YXJnZXRUb1Byb3RlY3QpIHtcbiAgICAgIGlmICh0aGlzLndoaXRlTGlzdC5pbmRleE9mKGkpICE9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb3AgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMudGFyZ2V0VG9Qcm90ZWN0LCBpKTtcbiAgICAgIGlmICghcHJvcCB8fCAhcHJvcC53cml0YWJsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChoYXNPd24odGhpcy50YXJnZXRUb1Byb3RlY3QsIGkpKSB7XG4gICAgICAgIGZuKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIDEuVHJpZ2dlciBob29rcywgbGlmZSBjeWNsZSB3aWxsQWN0aXZhdGUgZW5hYmxlZCAoZ29pbmcgdG8pXG4gIC8vIDIuV2lsbCBkaXNhYmxlIHRoZSBjdXJyZW50IGdyb3VwIG9mIG90aGVyIGJveCwgYW5kIHRyaWdnZXJzIHRoZSBzd2l0Y2ggbGlmZSBjeWNsZVxuICAvLyAzLlRoZSBjdXJyZW50IHdpbmRvdyBvYmplY3QgcHJvcGVydGllcyBmb3IgY2FjaGluZ1xuICAvLyA0LlJlc3RvcmUgdGhlIHNhbmRib3ggc2lkZSBlZmZlY3RzIGR1cmluZyBvcGVyYXRpb25cbiAgcHVibGljIGFjdGl2YXRlKCkge1xuICAgIC8vIFJlY29yZGVkIGJlZm9yZSB0aGUgZ2xvYmFsIGVudmlyb25tZW50LCByZXN0b3JlIHNpZGUgZWZmZWN0cyBvZiBhIHZhcmlhYmxlXG4gICAgdGhpcy5zYWZlSXRlcmF0b3IoKGk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5zbmFwc2hvdE9yaWdpbmFsLnNldChpLCB0aGlzLnRhcmdldFRvUHJvdGVjdFtpXSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNuYXBzaG90TXV0YXRlZC5mb3JFYWNoKCh2YWwsIG11dGF0ZUtleSkgPT4ge1xuICAgICAgdGhpcy50YXJnZXRUb1Byb3RlY3RbbXV0YXRlS2V5XSA9IHRoaXMuc25hcHNob3RNdXRhdGVkLmdldChtdXRhdGVLZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gMS5SZXN0b3JlIHRoZSBzYW5kYm94IGR1cmluZyBzdGFydHVwIHZhcmlhYmxlcyBjaGFuZ2UsIHJlY29yZCB0aGUgY2hhbmdlIHJlY29yZFxuICAvLyAyLlJlc3RvcmUgdGhlIHNhbmRib3ggZHVyaW5nIHN0YXJ0dXAgdG8gZGVsZXRlIHZhcmlhYmxlcywgcmVjb3JkIHRoZSBjaGFuZ2UgcmVjb3JkXG4gIHB1YmxpYyBkZWFjdGl2YXRlKCkge1xuICAgIGNvbnN0IGRlbGV0ZU1hcDogYW55ID0ge307XG4gICAgY29uc3QgdXBkYXRlTWFwOiBhbnkgPSB7fTtcbiAgICBjb25zdCBhZGRNYXA6IGFueSA9IHt9O1xuXG4gICAgLy8gUmVzdG9yZSB0aGUgc2FuZGJveCBiZWZvcmUgcnVubmluZyBXaW5kb3dzIHByb3BlcnRpZXMgb2YgZW52aXJvbm1lbnQsIGFuZCBkaWZmZXJlbmNlIHZhbHVlIGZvciBjYWNoaW5nXG4gICAgdGhpcy5zYWZlSXRlcmF0b3IoKG5vcm1hbEtleTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc25hcHNob3RPcmlnaW5hbC5nZXQobm9ybWFsS2V5KSAhPT1cbiAgICAgICAgKHRoaXMudGFyZ2V0VG9Qcm90ZWN0W25vcm1hbEtleV0gYXMgYW55KVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc25hcHNob3RNdXRhdGVkLnNldChub3JtYWxLZXksIHRoaXMudGFyZ2V0VG9Qcm90ZWN0W25vcm1hbEtleV0pOyAvLyBkZWxldGVkIGtleSB3aWxsIGJlIGRlZmluZWQgYXMgdW5kZWZpbmVkIG9uXG4gICAgICAgIHRoaXMudGFyZ2V0VG9Qcm90ZWN0W25vcm1hbEtleV0gPSB0aGlzLnNuYXBzaG90T3JpZ2luYWwuZ2V0KG5vcm1hbEtleSk7IC8vIHx8IHRoaXMudGFyZ2V0VG9Qcm90ZWN0W2ldXG5cbiAgICAgICAgLy8gQ29sbGVjdGlvbiBvZiBkZWxldGUsIG1vZGlmeSB2YXJpYWJsZXNcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0VG9Qcm90ZWN0W25vcm1hbEtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFkZE1hcFtub3JtYWxLZXldID0gdGhpcy5zbmFwc2hvdE11dGF0ZWQuZ2V0KG5vcm1hbEtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlTWFwW25vcm1hbEtleV0gPSB0aGlzLnNuYXBzaG90TXV0YXRlZC5nZXQobm9ybWFsS2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zbmFwc2hvdE9yaWdpbmFsLmRlbGV0ZShub3JtYWxLZXkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbmFwc2hvdE9yaWdpbmFsLmZvckVhY2goKHZhbCwgZGVsZXRlS2V5KSA9PiB7XG4gICAgICB0aGlzLnNuYXBzaG90TXV0YXRlZC5zZXQoZGVsZXRlS2V5LCB0aGlzLnRhcmdldFRvUHJvdGVjdFtkZWxldGVLZXldKTtcbiAgICAgIHRoaXMudGFyZ2V0VG9Qcm90ZWN0W2RlbGV0ZUtleV0gPSB0aGlzLnNuYXBzaG90T3JpZ2luYWwuZ2V0KGRlbGV0ZUtleSk7XG4gICAgICBkZWxldGVNYXBbZGVsZXRlS2V5XSA9IHRoaXMudGFyZ2V0VG9Qcm90ZWN0W2RlbGV0ZUtleV07XG4gICAgfSk7XG5cbiAgICAvLyBGb3IgZGV2ZWxvcGVycywgbGV0IHRoZW0ga25vdyBjbGVhciB3aGF0IHNpZGUgZWZmZWN0cyBvZiBhIHZhcmlhYmxlXG4gICAgLy8gY2hhbm5lbC5lbWl0KCdzYW5kYm94LXZhcmlhYmxlJywge1xuICAgIC8vICAgdXBkYXRlOiB1cGRhdGVNYXAsXG4gICAgLy8gICByZW1vdmVkOiBkZWxldGVNYXAsXG4gICAgLy8gICBhZGQ6IGFkZE1hcCxcbiAgICAvLyB9KTtcbiAgfVxufVxuIiwgImRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgd2VicGFja0pzb25wPzogYW55W107XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhdGNoV2VicGFja0pzb25wIHtcbiAgcHJlV2VicGFja0pzb25wPzogYW55W107XG5cbiAgY3VycmVudFdlYnBhY2tKc29ucD86IGFueVtdO1xuXG4gIHB1YmxpYyBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnByZVdlYnBhY2tKc29ucCA9IHdpbmRvdy53ZWJwYWNrSnNvbnA7XG4gICAgd2luZG93LndlYnBhY2tKc29ucCA9IHRoaXMuY3VycmVudFdlYnBhY2tKc29ucDtcbiAgfVxuXG4gIHB1YmxpYyBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuY3VycmVudFdlYnBhY2tKc29ucCA9IHdpbmRvdy53ZWJwYWNrSnNvbnA7XG4gICAgd2luZG93LndlYnBhY2tKc29ucCA9IHRoaXMucHJlV2VicGFja0pzb25wO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGF0Y2hFdmVudCB9IGZyb20gJy4vcGF0Y2hlcnMvZXZlbnQnO1xuaW1wb3J0IHsgUGF0Y2hTdHlsZSB9IGZyb20gJy4vcGF0Y2hlcnMvc3R5bGUnO1xuaW1wb3J0IHsgUGF0Y2hIaXN0b3J5IH0gZnJvbSAnLi9wYXRjaGVycy9oaXN0b3J5JztcbmltcG9ydCB7IFBhdGNoSW50ZXJ2YWwgfSBmcm9tICcuL3BhdGNoZXJzL2ludGVydmFsJztcbmltcG9ydCB7IFBhdGNoR2xvYmFsVmFsIH0gZnJvbSAnLi9wYXRjaGVycy92YXJpYWJsZSc7XG5pbXBvcnQgeyBQYXRjaFdlYnBhY2tKc29ucCB9IGZyb20gJy4vcGF0Y2hlcnMvd2VicGFja2pzb25wJztcblxuZXhwb3J0IGNsYXNzIFNhbmRib3gge1xuICBwdWJsaWMgdHlwZSA9ICdzbmFwc2hvdCc7XG4gIHB1YmxpYyBpc1J1bm5pbmc6IEJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwYXRjaExpc3Q6IEFycmF5PFxuICAgIFBhdGNoR2xvYmFsVmFsIHwgUGF0Y2hTdHlsZSB8IFBhdGNoSW50ZXJ2YWwgfCBQYXRjaEV2ZW50IHwgUGF0Y2hXZWJwYWNrSnNvbnBcbiAgPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIHByb3RlY3RWYXJpYWJsZTogQXJyYXk8UHJvcGVydHlLZXk+ID0gW10sXG4gICAgcHVibGljIHRhcmdldFRvUHJvdGVjdDogV2luZG93IHwgT2JqZWN0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gd2luZG93XG4gICAgICA6IGdsb2JhbFRoaXMsXG4gICAgcHJpdmF0ZSBpc0luQnJvd3NlcjogQm9vbGVhbiA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZmFsc2UgOiB0cnVlLFxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaXNJbkJyb3dzZXIgPSBpc0luQnJvd3NlcjtcbiAgICB0aGlzLnBhdGNoTGlzdC5wdXNoKG5ldyBQYXRjaEdsb2JhbFZhbCh0YXJnZXRUb1Byb3RlY3QsIHByb3RlY3RWYXJpYWJsZSkpO1xuXG4gICAgLy8gXHU2MjY3XHU4ODRDXHU5ODdBXHU1RThGXHU2NjJGXHVGRjBDXHU1MTY4XHU1QzQwXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU1MTQ4XHU2RkMwXHU2RDNCXHVGRjBDXHU1MTY4XHU1QzQwXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU1NDBFXHU5NTAwXHU2QkMxXG4gICAgaWYgKHRoaXMuaXNJbkJyb3dzZXIpIHtcbiAgICAgIHRoaXMucGF0Y2hMaXN0ID0gW1xuICAgICAgICAuLi50aGlzLnBhdGNoTGlzdCxcbiAgICAgICAgbmV3IFBhdGNoU3R5bGUoKSxcbiAgICAgICAgbmV3IFBhdGNoRXZlbnQoKSxcbiAgICAgICAgbmV3IFBhdGNoSGlzdG9yeSgpLFxuICAgICAgICBuZXcgUGF0Y2hJbnRlcnZhbCgpLFxuICAgICAgICBuZXcgUGF0Y2hXZWJwYWNrSnNvbnAoKSxcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgLy8gIDEuXHU4OUU2XHU1M0QxXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXHU5NEE5XHU1QjUwXHVGRjBDd2lsbEFjdGl2YXRlXHVGRjA4XHU1QzA2XHU4OTgxXHU2RkMwXHU2RDNCXHVGRjA5XG4gIC8vICAyLlx1NUMwNlx1NUY1M1x1NTI0RFx1N0VDNFx1NzY4NFx1NTE3Nlx1NEVENlx1NkM5OVx1NzZEMmRpc2FibGVcdUZGMENcdTVFNzZcdTg5RTZcdTUzRDFzd2l0Y2hcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcbiAgLy8gIDMuXHU1QzA2XHU1RjUzXHU1MjREd2luZG93XHU1QkY5XHU4QzYxXHU1QzVFXHU2MDI3XHU4RkRCXHU4ODRDXHU3RjEzXHU1QjU4XG4gIC8vICA0Llx1ODNCN1x1NTNENnN0eWxlXHU4MjgyXHU3MEI5XHVGRjBDXHU4RkRCXHU4ODRDXHU3RjEzXHU1QjU4XG4gIC8vICA1Llx1NjA2Mlx1NTkwRFx1NkM5OVx1NzZEMlx1OEZEMFx1ODg0Q1x1NjcxRlx1OTVGNFx1NEVBN1x1NzUxRlx1NzY4NFx1NTI2Rlx1NEY1Q1x1NzUyOFxuICBwdWJsaWMgYWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nKSByZXR1cm47XG4gICAgdGhpcy5wYXRjaExpc3QuZm9yRWFjaCgocGF0Y2gpID0+IHtcbiAgICAgIHBhdGNoLmFjdGl2YXRlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICB9XG5cbiAgLy8gMS5cdTYwNjJcdTU5MERcdTZDOTlcdTc2RDJcdTU0MkZcdTUyQThcdTY3MUZcdTk1RjRcdTUzRDhcdTkxQ0ZcdTUzRDhcdTY2RjRcdTc2ODRcdTUzRDhcdTkxQ0ZcdUZGMENcdThCQjBcdTVGNTVcdTUzRDhcdTY2RjRcdThCQjBcdTVGNTVcbiAgLy8gMi5cdTYwNjJcdTU5MERcdTZDOTlcdTc2RDJcdTU0MkZcdTUyQThcdTY3MUZcdTk1RjRcdTUyMjBcdTk2NjRcdTc2ODRcdTUzRDhcdTkxQ0ZcdUZGMENcdThCQjBcdTVGNTVcdTUzRDhcdTY2RjRcdThCQjBcdTVGNTVcbiAgcHVibGljIGRlYWN0aXZhdGUoY2xlYXJFZmZlY3RzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHJldHVybjsgLy8gXHU2NzAwXHU1NDBFXHU5NTAwXHU2QkMxXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU1Qjg4XHU2MkE0XG4gICAgWy4uLnRoaXMucGF0Y2hMaXN0XS5yZXZlcnNlKCkuZm9yRWFjaCgocGF0Y2gpID0+IHtcbiAgICAgIHBhdGNoLmRlYWN0aXZhdGUoY2xlYXJFZmZlY3RzKTtcbiAgICB9KTtcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU2FuZGJveCB9IGZyb20gJy4vc2FuZGJveCc7XG5pbXBvcnQgeyBpbnRlcmZhY2VzIH0gZnJvbSAnQGdhcmZpc2gvY29yZSc7XG5pbXBvcnQgJy4vZ2xvYmFsRXh0ZW5zaW9ucyc7XG5cbmV4cG9ydCB7IFNhbmRib3ggYXMgZGVmYXVsdCB9IGZyb20gJy4vc2FuZGJveCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2FuZGJveENvbmZpZyB7XG4gIHNuYXBzaG90PzogYm9vbGVhbjtcbiAgZGlzYWJsZVdpdGg/OiBib29sZWFuO1xuICBzdHJpY3RJc29sYXRpb24/OiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgQnJvd3NlckNvbmZpZyB7XG4gIG9wZW4/OiBib29sZWFuO1xuICBwcm90ZWN0VmFyaWFibGU/OiBQcm9wZXJ0eUtleVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2FyZmlzaEJyb3dzZXJTbmFwc2hvdChvcD86IEJyb3dzZXJDb25maWcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG9wZW5Ccm93c2VyOiBmYWxzZSxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuICAgICAgbmFtZTogJ2Jyb3dzZXItc25hcHNob3QnLFxuXG4gICAgICBhZnRlckxvYWQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgY29uZmlnOiBCcm93c2VyQ29uZmlnID0gb3AgfHwgeyBvcGVuOiB0cnVlIH07XG4gICAgICAgIGNvbnN0IHNhbmRib3hDb25maWcgPSBhcHBJbmZvLnNhbmRib3ggfHwgR2FyZmlzaD8ub3B0aW9ucz8uc2FuZGJveDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNhbmRib3hDb25maWcgPT09IGZhbHNlIHx8XG4gICAgICAgICAgc2FuZGJveENvbmZpZy5vcGVuID09PSBmYWxzZSB8fFxuICAgICAgICAgIHNhbmRib3hDb25maWc/LnNuYXBzaG90ID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25maWcub3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW5kYm94Q29uZmlnKSB7XG4gICAgICAgICAgY29uZmlnLnByb3RlY3RWYXJpYWJsZSA9IFtcbiAgICAgICAgICAgIC4uLihHYXJmaXNoPy5vcHRpb25zLnByb3RlY3RWYXJpYWJsZSB8fCBbXSksXG4gICAgICAgICAgICAuLi4oYXBwSW5mby5wcm90ZWN0VmFyaWFibGUgfHwgW10pLFxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5vcGVuQnJvd3NlciA9ICEhY29uZmlnLm9wZW47XG4gICAgICAgIGlmICghY29uZmlnLm9wZW4pIHJldHVybjtcbiAgICAgICAgaWYgKGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgLy8gZXhpc3RpbmdcbiAgICAgICAgICBpZiAoYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94KSByZXR1cm47XG4gICAgICAgICAgY29uc3Qgc2FuZGJveCA9IG5ldyBTYW5kYm94KGFwcEluZm8ubmFtZSwgY29uZmlnLnByb3RlY3RWYXJpYWJsZSk7XG4gICAgICAgICAgYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94ID0gc2FuZGJveDtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlTW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgLy8gZXhpc3RpbmdcbiAgICAgICAgaWYgKCFhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3gpIHJldHVybjtcbiAgICAgICAgYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94LmFjdGl2YXRlKCk7XG4gICAgICB9LFxuXG4gICAgICBhZnRlclVubW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKCFhcHBJbnN0YW5jZS5zbmFwc2hvdFNhbmRib3gpIHJldHVybjtcbiAgICAgICAgYXBwSW5zdGFuY2Uuc25hcHNob3RTYW5kYm94LmRlYWN0aXZhdGUoKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcbn1cbiIsICJpbXBvcnQgR2FyZmlzaCBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB7IEdhcmZpc2hSb3V0ZXIgfSBmcm9tICdAZ2FyZmlzaC9yb3V0ZXInO1xuaW1wb3J0IHsgR2FyZmlzaEJyb3dzZXJWbSB9IGZyb20gJ0BnYXJmaXNoL2Jyb3dzZXItdm0nO1xuaW1wb3J0IHsgR2FyZmlzaEJyb3dzZXJTbmFwc2hvdCB9IGZyb20gJ0BnYXJmaXNoL2Jyb3dzZXItc25hcHNob3QnO1xuaW1wb3J0IHsgZGVmLCB3YXJuLCBoYXNPd24sIGluQnJvd3NlciwgX19HQVJGSVNIX0ZMQUdfXyB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBHYXJmaXNoOiBHYXJmaXNoO1xuICAgIF9fR0FSRklTSF9fOiBib29sZWFuO1xuICB9XG59XG5cbi8vIEluaXRpYWxpemUgdGhlIEdhcmZpc2gsIGN1cnJlbnRseSBleGlzdGluZyBlbnZpcm9ubWVudCB0byBhbGxvdyBvbmx5IG9uZSBpbnN0YW5jZSAoZXhwb3J0IHRvIGlzIGZvciB0ZXN0KVxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dCgpOiBHYXJmaXNoIHtcbiAgbGV0IGZyZXNoID0gZmFsc2U7XG4gIC8vIEV4aXN0aW5nIGdhcmZpc2ggaW5zdGFuY2UsIGRpcmVjdCByZXR1cm5cbiAgaWYgKGluQnJvd3NlcigpICYmIHdpbmRvd1snX19HQVJGSVNIX18nXSAmJiB3aW5kb3dbJ0dhcmZpc2gnXSkge1xuICAgIHJldHVybiB3aW5kb3dbJ0dhcmZpc2gnXTtcbiAgfVxuXG4gIGNvbnN0IEdhcmZpc2hJbnN0YW5jZSA9IG5ldyBHYXJmaXNoKHtcbiAgICBwbHVnaW5zOiBbR2FyZmlzaFJvdXRlcigpLCBHYXJmaXNoQnJvd3NlclZtKCksIEdhcmZpc2hCcm93c2VyU25hcHNob3QoKV0sXG4gIH0pO1xuXG4gIHR5cGUgZ2xvYmFsVmFsdWUgPSBib29sZWFuIHwgR2FyZmlzaCB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICBjb25zdCBzZXQgPSAobmFtZXNwYWNlOiBzdHJpbmcsIHZhbDogZ2xvYmFsVmFsdWUgPSBHYXJmaXNoSW5zdGFuY2UpID0+IHtcbiAgICBpZiAoaGFzT3duKHdpbmRvdywgbmFtZXNwYWNlKSkge1xuICAgICAgaWYgKCEod2luZG93W25hbWVzcGFjZV0gJiYgd2luZG93W25hbWVzcGFjZV0uZmxhZyA9PT0gX19HQVJGSVNIX0ZMQUdfXykpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICBmcmVzaCA9IHRydWU7XG4gICAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpKSB7XG4gICAgICAgICAgICB3YXJuKGBcIldpbmRvdy4ke25hbWVzcGFjZX1cIiB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IFwiZ2FyZmlzaFwiLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LCBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoZGVzYykge1xuICAgICAgICAgIGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgZGVmKHdpbmRvdywgbmFtZXNwYWNlLCB2YWwpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGVzYy53cml0YWJsZSkge1xuICAgICAgICAgICAgd2luZG93W25hbWVzcGFjZV0gPSB2YWw7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyZXNoID0gdHJ1ZTtcbiAgICAgIGRlZih3aW5kb3csIG5hbWVzcGFjZSwgdmFsKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGluQnJvd3NlcigpKSB7XG4gICAgLy8gR2xvYmFsIGZsYWdcbiAgICBzZXQoJ0dhcmZpc2gnKTtcbiAgICBkZWYod2luZG93LCAnX19HQVJGSVNIX18nLCB0cnVlKTtcbiAgfVxuXG4gIGlmIChmcmVzaCkge1xuICAgIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA6IGZhbHNlKSkge1xuICAgICAgaWYgKCcxLjEyLjAnICE9PSB3aW5kb3dbJ0dhcmZpc2gnXS52ZXJzaW9uKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1RoZSBcImdhcmZpc2ggdmVyc2lvblwiIHVzZWQgYnkgdGhlIG1haW4gYW5kIHN1Yi1hcHBsaWNhdGlvbnMgaXMgaW5jb25zaXN0ZW50LicsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBHYXJmaXNoSW5zdGFuY2U7XG59XG5cbmV4cG9ydCBjb25zdCBHYXJmaXNoSW5zdGFuY2UgPSBjcmVhdGVDb250ZXh0KCk7XG4iLCAiaW1wb3J0IHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHsgR2FyZmlzaEluc3RhbmNlIH0gZnJvbSAnLi9pbnN0YW5jZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tT3B0aW9ucyB7XG4gIGxvYWRpbmc6IChsb2FkaW5nUGFyYW1zOiB7IGlzTG9hZGluZzogYm9vbGVhbjsgZXJyb3I6IEVycm9yIH0pID0+IEVsZW1lbnQ7XG4gIGRlbGF5OiBudW1iZXI7XG4gIGNvbmZpZz86IGludGVyZmFjZXMuQ29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDdXN0b21lckVsZW1lbnQoXG4gIGh0bWxUYWc6IHN0cmluZyxcbiAgb3B0aW9uczogQ3VzdG9tT3B0aW9ucyxcbikge1xuICBjbGFzcyBNaWNyb0FwcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBhcHBJbmZvID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgICBlbnRyeTogJycsXG4gICAgICBiYXNlbmFtZTogJycsXG4gICAgfTtcbiAgICBvcHRpb25zOiB7XG4gICAgICBsb2FkaW5nPzogKGxvYWRpbmdQYXJhbXM6IHtcbiAgICAgICAgaXNMb2FkaW5nOiBib29sZWFuO1xuICAgICAgICBlcnJvcjogRXJyb3I7XG4gICAgICAgIHBhc3REZWxheTogYm9vbGVhbjtcbiAgICAgIH0pID0+IEVsZW1lbnQ7XG4gICAgICBkZWxheTogbnVtYmVyO1xuICAgIH0gPSB7XG4gICAgICBkZWxheTogMjAwLFxuICAgIH07XG4gICAgcGxhY2Vob2xkZXI6IEVsZW1lbnQ7XG4gICAgc3RhdGUgPSB0aGlzLl9vYnNlcnZlckFwcFN0YXRlKHtcbiAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICBlcnJvcjogbnVsbCxcbiAgICAgIHByb21pc2U6IG51bGwsXG4gICAgICBsb2FkZWQ6IG51bGwsXG4gICAgICBwYXN0RGVsYXk6IGZhbHNlLFxuICAgIH0pO1xuICAgIF9kZWxheTogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxuICAgIF9vYnNlcnZlckFwcFN0YXRlKHN0YXRlKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3h5KHN0YXRlLCB7XG4gICAgICAgIHNldDogKHRhcmdldDogYW55LCBwOiBzdHJpbmcgfCBzeW1ib2wsIHZhbHVlOiBhbnksIHJlY2VpdmVyOiBhbnkpID0+IHtcbiAgICAgICAgICAvLyBMb2FkaW5nIHN0YXR1cyBjb250ZW50IGRpc3BsYXkgaW4gdGhlIGxvYWRpbmcgcHJvY2Vzc1xuICAgICAgICAgIC8vIEVycm9yIGRpc3BsYXkgZXJyb3JcbiAgICAgICAgICBjb25zdCBnZXRQbGFjZUhvbGRlckFuZEFwcGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXhpc3RpbmcgcGxhY2Vob2xkZXIgY29udGVudFxuICAgICAgICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXIgJiYgdGhpcy5jb250YWlucyh0aGlzLnBsYWNlaG9sZGVyKSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPVxuICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubG9hZGluZyAmJlxuICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubG9hZGluZyh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0aGlzLnN0YXRlLmlzTG9hZGluZyxcbiAgICAgICAgICAgICAgICBlcnJvcjogdGhpcy5zdGF0ZS5lcnJvcixcbiAgICAgICAgICAgICAgICBwYXN0RGVsYXk6IHRoaXMuc3RhdGUucGFzdERlbGF5LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyICYmIHRoaXMuYXBwZW5kQ2hpbGQocGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXMgPSBSZWZsZWN0LnNldCh0YXJnZXQsIHAsIHZhbHVlLCByZWNlaXZlcik7XG4gICAgICAgICAgLy8gTG9hZGluZyBiZWdhbiB0byBvcGVuIHRoZSBsb2FkaW5nIHBsYWNlaG9sZGVyXG4gICAgICAgICAgLy8gTG9hZGluZyBlbmQgY2xvc2VkIGxvYWRpbmcgcGxhY2Vob2xkZXJcbiAgICAgICAgICAvLyBMb2FkaW5nIGVuZCBwbGFjZWhvbGRlciBjbG9zZWQgaWYgdGhlcmUgaXMgbm8gbWlzdGFrZVxuICAgICAgICAgIGlmIChwID09PSAnZXJyb3InICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGdldFBsYWNlSG9sZGVyQW5kQXBwZW5kKCk7XG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09ICdwYXN0RGVsYXknICYmIHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGdldFBsYWNlSG9sZGVyQW5kQXBwZW5kKCk7XG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09ICdpc0xvYWRpbmcnICYmIHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGdldFBsYWNlSG9sZGVyQW5kQXBwZW5kKCk7XG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09ICdpc0xvYWRpbmcnICYmIHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVycm9yICYmIHRoaXMuY29udGFpbnModGhpcy5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9sb2FkQXBwKCkge1xuICAgICAgLy8gSWYgeW91IGFyZSBsb2FkaW5nIHN0b3AgY29udGludWUgdG8gbG9hZFxuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNMb2FkaW5nKSByZXR1cm47XG4gICAgICB0aGlzLnN0YXRlLmlzTG9hZGluZyA9IHRydWU7XG5cbiAgICAgIC8vIEF2b2lkIGxvYWRpbmcgZmxhc2ggYmFja1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVsYXkgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnBhc3REZWxheSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGVsYXkgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUucGFzdERlbGF5ID0gdHJ1ZTtcbiAgICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUucHJvbWlzZSA9IEdhcmZpc2hJbnN0YW5jZS5sb2FkQXBwKHRoaXMuYXBwSW5mby5uYW1lLCB7XG4gICAgICAgIGVudHJ5OiB0aGlzLmFwcEluZm8uZW50cnksXG4gICAgICAgIGRvbUdldHRlcjogKCkgPT4gdGhpcyxcbiAgICAgICAgYmFzZW5hbWU6IHRoaXMuYXBwSW5mby5iYXNlbmFtZSxcbiAgICAgICAgc2FuZGJveDoge1xuICAgICAgICAgIHNuYXBzaG90OiBmYWxzZSxcbiAgICAgICAgICBzdHJpY3RJc29sYXRpb246IHRoaXMuaGFzQXR0cmlidXRlKCdzaGFkb3cnKSB8fCBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9jbGVhclRpbWVvdXRzKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RlbGF5KTtcbiAgICB9XG5cbiAgICBhc3luYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMuYXBwSW5mbyA9IHtcbiAgICAgICAgbmFtZTogdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnJyxcbiAgICAgICAgZW50cnk6IHRoaXMuZ2V0QXR0cmlidXRlKCdlbnRyeScpIHx8ICcnLFxuICAgICAgICBiYXNlbmFtZTogdGhpcy5nZXRBdHRyaWJ1dGUoJ2Jhc2VuYW1lJykgfHwgJy8nLFxuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2xvYWRBcHAoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5sb2FkZWQgPSBhd2FpdCB0aGlzLnN0YXRlLnByb21pc2U7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxvYWRlZC5tb3VudGVkKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkZWQuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3RhdGUubG9hZGVkLm1vdW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZXJyb3IgPSBlcnJvcjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuc3RhdGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLl9jbGVhclRpbWVvdXRzKCk7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5sb2FkZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5sb2FkZWQuaGlkZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGFkb3B0ZWRDYWxsYmFjaygpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gc3F1YXJlIGVsZW1lbnQgbW92ZWQgdG8gbmV3IHBhZ2UuJyk7XG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICdDdXN0b20gc3F1YXJlIGVsZW1lbnQgYXR0cmlidXRlcyBjaGFuZ2VkLicsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG9sZFZhbHVlLFxuICAgICAgICBuZXdWYWx1ZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBuZXcgZWxlbWVudFxuICBpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChodG1sVGFnKSkge1xuICAgIEdhcmZpc2hJbnN0YW5jZS5ydW4ob3B0aW9ucy5jb25maWcgfHwge30pO1xuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShodG1sVGFnLCBNaWNyb0FwcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9hZGFibGVXZWJDb21wb25lbnQoaHRtbFRhZzogc3RyaW5nLCBvcHRpb25zOiBDdXN0b21PcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgaHRtbFRhZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dhcmZpc2ggcmVxdWlyZXMgYSBgaHRtbFRhZ2AgbmFtZScpO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLmxvYWRpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dhcmZpc2ggcmVxdWlyZXMgYSBgbG9hZGluZ2AgY29tcG9uZW50Jyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGRlbGF5OiAyMDAsXG4gICAgICB0aW1lb3V0OiBudWxsLFxuICAgIH0sXG4gICAgb3B0aW9ucyxcbiAgKTtcbiAgcmV0dXJuIGdlbmVyYXRlQ3VzdG9tZXJFbGVtZW50KGh0bWxUYWcsIG9wdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lQ3VzdG9tRWxlbWVudHMoaHRtbFRhZzogc3RyaW5nLCBvcHRpb25zOiBDdXN0b21PcHRpb25zKSB7XG4gIHJldHVybiBjcmVhdGVMb2FkYWJsZVdlYkNvbXBvbmVudChodG1sVGFnLCBvcHRpb25zKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFJQSxVQUFJLElBQUk7QUFDUixVQUFJLElBQUksSUFBSTtBQUNaLFVBQUksSUFBSSxJQUFJO0FBQ1osVUFBSSxJQUFJLElBQUk7QUFDWixVQUFJLElBQUksSUFBSTtBQUNaLFVBQUksSUFBSSxJQUFJO0FBZ0JaLGFBQU8sVUFBVSxTQUFTLEtBQUssU0FBUztBQUN0QyxrQkFBVSxXQUFXO0FBQ3JCLFlBQUksT0FBTyxPQUFPO0FBQ2xCLFlBQUksU0FBUyxZQUFZLElBQUksU0FBUyxHQUFHO0FBQ3ZDLGlCQUFP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QUMsUUFBUTtBQUNaLHFCQUFTO0FBQ1Qsb0JBQVEsS0FBSztBQUFBO0FBQUE7QUFBQTtBQVNoQixjQUFRLFNBQVM7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBWUQsMkJBQXFCO0FBSXBCLFlBQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxXQUFZLFFBQU8sUUFBUSxTQUFTLGNBQWMs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
