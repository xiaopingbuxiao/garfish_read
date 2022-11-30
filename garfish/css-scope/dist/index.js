var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  GarfishCssScope: () => GarfishCssScope,
  parse: () => parse,
  stringify: () => stringify2
});

// src/cssParser.ts
var import_utils = require("@garfish/utils");
var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
function parse(css, options = {}) {
  let line = 1;
  let column = 1;
  function updatePosition(str) {
    const lines = str.match(/\n/g);
    if (lines)
      line += lines.length;
    const i = str.lastIndexOf("\n");
    column = i > -1 ? str.length - i : column + str.length;
  }
  class Position {
    constructor(start) {
      this.content = css;
      this.end = { line, column };
      this.source = options.source;
      this.start = start;
    }
  }
  function position() {
    const start = { line, column };
    return function(node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }
  const errorsList = [];
  function error(msg) {
    const source = options.source ? options.source + ":" : "";
    const err = new Error(source + line + ":" + column + ": " + msg);
    err.line = line;
    err.column = column;
    err.reason = msg;
    err.source = css;
    err.filename = options.source;
    if (options.silent) {
      errorsList.push(err);
    } else {
      (0, import_utils.error)(err);
    }
  }
  function stylesheet() {
    const rulesList = rules();
    return {
      type: "stylesheet",
      stylesheet: {
        rules: rulesList,
        source: options.source,
        parsingErrors: errorsList
      }
    };
  }
  function open() {
    return match(/^{\s*/);
  }
  function close() {
    return match(/^}/);
  }
  function whitespace() {
    match(/^\s*/);
  }
  function rules() {
    let node;
    const rules2 = [];
    whitespace();
    comments(rules2);
    while (css.length && css.charAt(0) !== "}" && (node = atrule() || rule())) {
      if (node !== false) {
        rules2.push(node);
        comments(rules2);
      }
    }
    return rules2;
  }
  function match(re) {
    const m = re.exec(css);
    if (m) {
      const str = m[0];
      updatePosition(str);
      css = css.slice(str.length);
      return m;
    }
  }
  function comments(rules2) {
    let c;
    rules2 = rules2 || [];
    while (c = comment()) {
      if (c !== false) {
        rules2.push(c);
      }
    }
    return rules2;
  }
  function comment() {
    const pos = position();
    if (css.charAt(0) !== "/" || css.charAt(1) !== "*")
      return;
    let i = 2;
    while (css.charAt(i) !== "" && (css.charAt(i) !== "*" || css.charAt(i + 1) !== "/")) {
      ++i;
    }
    i += 2;
    if (css.charAt(i - 1) === "") {
      return error("End of comment missing");
    }
    const str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;
    return pos({
      type: "comment",
      comment: str
    });
  }
  function selector() {
    const m = match(/^([^{]+)/);
    if (m) {
      return trim(m[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, (m2) => {
        return m2.replace(/,/g, "\u200C");
      }).split(/\s*(?![^(]*\)),\s*/).map((s) => s.replace(/\u200C/g, ","));
    }
  }
  function declaration() {
    const pos = position();
    let prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop)
      return;
    prop = trim(prop[0]);
    if (!match(/^:\s*/))
      return error("property missing ':'");
    const val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
    const ret = pos({
      type: "declaration",
      property: prop.replace(commentre, ""),
      value: val ? trim(val[0]).replace(commentre, "") : ""
    });
    match(/^[;\s]*/);
    return ret;
  }
  function declarations() {
    const decls = [];
    if (!open())
      return error("missing '{'");
    comments(decls);
    let decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    if (!close())
      return error("missing '}'");
    return decls;
  }
  function keyframe() {
    let m;
    const vals = [];
    const pos = position();
    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }
    if (!vals.length)
      return;
    return pos({
      type: "keyframe",
      values: vals,
      declarations: declarations() || []
    });
  }
  function atkeyframes() {
    const pos = position();
    let m = match(/^@([-\w]+)?keyframes\s*/);
    if (!m)
      return;
    const vendor = m[1];
    m = match(/^([-\w]+)\s*/);
    if (!m)
      return error("@keyframes missing name");
    const name = m[1];
    if (!open())
      return error("@keyframes missing '{'");
    let frame;
    let frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }
    if (!close())
      return error("@keyframes missing '}'");
    return pos({
      type: "keyframes",
      name,
      vendor,
      keyframes: frames
    });
  }
  function atsupports() {
    const pos = position();
    const m = match(/^@supports *([^{]+)/);
    if (!m)
      return;
    const supports = trim(m[1]);
    if (!open())
      return error("@supports missing '{'");
    const style = comments().concat(rules());
    if (!close())
      return error("@supports missing '}'");
    return pos({
      type: "supports",
      supports,
      rules: style
    });
  }
  function athost() {
    const pos = position();
    const m = match(/^@host\s*/);
    if (!m)
      return;
    if (!open())
      return error("@host missing '{'");
    const style = comments().concat(rules());
    if (!close())
      return error("@host missing '}'");
    return pos({
      type: "host",
      rules: style
    });
  }
  function atmedia() {
    const pos = position();
    const m = match(/^@media *([^{]+)/);
    if (!m)
      return;
    const media = trim(m[1]);
    if (!open())
      return error("@media missing '{'");
    const style = comments().concat(rules());
    if (!close())
      return error("@media missing '}'");
    return pos({
      type: "media",
      media,
      rules: style
    });
  }
  function atcustommedia() {
    const pos = position();
    const m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m)
      return;
    return pos({
      type: "custom-media",
      name: trim(m[1]),
      media: trim(m[2])
    });
  }
  function atpage() {
    const pos = position();
    const m = match(/^@page */);
    if (!m)
      return;
    const sel = selector() || [];
    if (!open())
      return error("@page missing '{'");
    let decl;
    let decls = comments();
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }
    if (!close())
      return error("@page missing '}'");
    return pos({
      type: "page",
      selectors: sel,
      declarations: decls
    });
  }
  function atdocument() {
    const pos = position();
    const m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m)
      return;
    const vendor = trim(m[1]);
    const doc = trim(m[2]);
    if (!open())
      return error("@document missing '{'");
    const style = comments().concat(rules());
    if (!close())
      return error("@document missing '}'");
    return pos({
      type: "document",
      document: doc,
      vendor,
      rules: style
    });
  }
  function atfontface() {
    const pos = position();
    const m = match(/^@font-face\s*/);
    if (!m)
      return;
    if (!open())
      return error("@font-face missing '{'");
    let decl;
    let decls = comments();
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }
    if (!close())
      return error("@font-face missing '}'");
    return pos({
      type: "font-face",
      declarations: decls
    });
  }
  function compileAtrule(name) {
    const re = new RegExp("^@" + name + "\\s*([^;]+);");
    return function() {
      const pos = position();
      const m = match(re);
      if (!m)
        return;
      const ret = { type: name };
      ret[name] = m[1].trim();
      return pos(ret);
    };
  }
  const atimport = compileAtrule("import");
  const atcharset = compileAtrule("charset");
  const atnamespace = compileAtrule("namespace");
  function atrule() {
    if (css[0] !== "@")
      return;
    return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface();
  }
  function rule() {
    const pos = position();
    const sel = selector();
    if (!sel)
      return error("selector missing");
    comments();
    return pos({
      type: "rule",
      selectors: sel,
      declarations: declarations() || []
    });
  }
  return addParent(stylesheet());
}
function trim(str) {
  return str ? str.trim() : "";
}
function addParent(obj, parent) {
  const isNode = obj && typeof obj.type === "string";
  const childParent = isNode ? obj : parent;
  for (const k in obj) {
    const value = obj[k];
    if (Array.isArray(value)) {
      value.forEach((v) => addParent(v, childParent));
    } else if (value && typeof value === "object") {
      addParent(value, childParent);
    }
  }
  if (isNode) {
    obj.parent = parent || null;
  }
  return obj;
}

// src/cssStringify.ts
var import_utils2 = require("@garfish/utils");

// src/animationParser.ts
var timeReg = /^[-\d\.]+(s|ms)$/;
function isTime(p) {
  return timeReg.test(p);
}
var numberReg = /^[-\d\.]+$/;
function isIterationCount(p) {
  return p === "infinite" || numberReg.test(p);
}
function isPlayState(p) {
  return p === "running" || p === "paused";
}
function isTimeFunction(p) {
  if (Array.isArray(p))
    return true;
  switch (p) {
    case "ease":
    case "ease-in":
    case "ease-out":
    case "ease-in-out":
    case "linear":
    case "step-start":
    case "step-end":
    case "cubic-bezier":
    case "steps":
      return true;
    default:
      return false;
  }
}
function isDirection(p) {
  switch (p) {
    case "normal":
    case "reverse":
    case "alternate":
    case "alternate-reverse":
      return true;
    default:
      return false;
  }
}
function isFillMode(p) {
  switch (p) {
    case "none":
    case "forwards":
    case "backwards":
    case "both":
      return true;
    default:
      return false;
  }
}
var symbols = /[,'"\(\)!;]/;
function isLegalName(p) {
  if (symbols.test(p))
    return false;
  switch (p) {
    case "unset":
    case "initial":
    case "inherit":
    case "none":
      return false;
    default:
      return true;
  }
}
function isName(p) {
  if (!(isTime(p) || isPlayState(p) || isIterationCount(p) || isFillMode(p) || isDirection(p) || isTimeFunction(p))) {
    return isLegalName(p);
  }
  return false;
}
function tokenizer(input) {
  let buf = "";
  const tokens = [];
  const push = () => {
    buf && tokens.push(buf);
    buf = "";
  };
  for (const char of input) {
    if (char === "," || char === ")" || char === ";") {
      push();
      buf += char;
      push();
    } else if (char === "(") {
      push();
      if (tokens[tokens.length - 1] === " ") {
        if ((typeof process !== "undefined" && process.env && process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false) && true) {
          console.error(`[Garfish Css scope]: Invalid property value: "${input}"`);
        }
        return false;
      }
      buf += char;
      push();
    } else if (char === " ") {
      push();
      if (tokens[tokens.length - 1] !== " ") {
        tokens.push(" ");
      }
    } else {
      buf += char;
    }
  }
  push();
  return tokens;
}
function parse2(tokens) {
  let mode = 1;
  let scope = [];
  let stash = false;
  const parent = [];
  scope[0] = parent;
  const up = () => {
    scope[0].push(scope);
    scope = scope[0];
  };
  const down = () => {
    const ns = [];
    ns[0] = scope;
    scope = ns;
  };
  const parallel = () => {
    scope[0].push(scope);
    scope = [];
    scope[0] = parent;
  };
  const toThreeMode = (t) => {
    mode = 3;
    down();
    scope.push(t);
  };
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (mode === 1) {
      if (t === ",") {
        mode = 2;
        stash = false;
        scope.push(t);
      } else if (t === "(") {
        toThreeMode(t);
      } else if (t === " ") {
        stash = true;
      } else {
        stash && parallel();
        stash = false;
        scope.push(t);
      }
    } else if (mode === 2) {
      if (t === "(") {
        toThreeMode(t);
      } else if (t === " ") {
        if (tokens[i - 1] !== ",") {
          mode = 1;
          stash = true;
        }
      } else {
        scope.push(t);
      }
    } else if (mode === 3) {
      if (t === ")") {
        mode = 2;
        scope.push(t);
        up();
      } else {
        scope.push(t);
      }
    }
  }
  parallel();
  return parent;
}
function stringify(tree, prefix) {
  let output = "";
  const splice = (p) => isName(p) ? `${p}-${prefix}` : p;
  const child = (ps) => {
    let buf = "";
    for (let i = 1; i < ps.length; i++) {
      buf += ps[i];
    }
    return buf;
  };
  tree.forEach((ps) => {
    if (ps.length === 2) {
      output += (Array.isArray(ps[1]) ? child(ps[1]) : splice(ps[1])) + " ";
    } else {
      for (let i = 1; i < ps.length; i++) {
        const next = ps[i + 1];
        const nextIsArray = Array.isArray(next);
        let cur = Array.isArray(ps[i]) ? child(ps[i]) : nextIsArray ? ps[i] : splice(ps[i]);
        if (next === "," || next === ";") {
        } else if (nextIsArray) {
          const fillUp = ps[i + 2] === "," ? "" : " ";
          cur += `${child(next)}${fillUp}`;
          i++;
        } else {
          cur += " ";
        }
        output += cur;
      }
    }
  });
  return output.trim();
}
var codeCache = /* @__PURE__ */ new Map();
var treeCache = /* @__PURE__ */ new Map();
function processAnimation(input, prefix) {
  if (!input || !prefix)
    return input;
  const etag = `${prefix}-${input}`;
  if (codeCache.has(etag)) {
    return codeCache.get(etag);
  }
  let tree = treeCache.get(input);
  if (!tree) {
    const tokens = tokenizer(input);
    if (tokens === false)
      return input;
    tree = parse2(tokens);
    treeCache.set(input, tree);
  }
  const newCode = stringify(tree, prefix);
  codeCache.set(etag, newCode);
  return newCode;
}

// src/cssStringify.ts
var animationRE = /^(-\w+-)?animation$/;
var animationNameRE = /^(-\w+-)?animation-name$/;
var Compiler = class {
  constructor(id) {
    this.level = 1;
    this.id = id || "";
  }
  emit(str, _) {
    return str;
  }
  visit(node) {
    return this[node.type](node);
  }
  mapVisit(nodes, delim) {
    let i = 0;
    let buf = "";
    const len = nodes.length;
    for (; i < len; i++) {
      buf += this.visit(nodes[i]);
      if (delim && i < len - 1) {
        buf += this.emit(delim);
      }
    }
    return buf;
  }
  addScope(selectors) {
    if (!this.id)
      return selectors;
    return selectors.map((s) => {
      s = s === "html" || s === ":root" ? `[${import_utils2.__MockHtml__}]` : s === "body" ? `[${import_utils2.__MockBody__}]` : s === "head" ? `[${import_utils2.__MockHead__}]` : s;
      return `#${this.id} ${s}`;
    });
  }
  indent(level) {
    if (typeof level === "number") {
      this.level += level;
      return "";
    }
    return Array(this.level).join("  ");
  }
  compile(node) {
    return this.stylesheet(node);
  }
  stylesheet(node) {
    return this.mapVisit(node.stylesheet.rules, "\n\n");
  }
  comment(node) {
    return this.emit(`${this.indent()}/*${node.comment}*/`, node.position);
  }
  import(node) {
    return this.emit(`@import ${node.import};`, node.position);
  }
  charset(node) {
    return this.emit(`@charset ${node.charset};`, node.position);
  }
  namespace(node) {
    return this.emit(`@namespace ${node.namespace};`, node.position);
  }
  media(node) {
    return this.emit(`@media ${node.media}`, node.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(node.rules, "\n\n") + this.emit(`${this.indent(-1)}
}`);
  }
  document(node) {
    const doc = `@${node.vendor || ""}document ${node.document}`;
    return this.emit(doc, node.position) + this.emit(`  {
${this.indent(1)}`) + this.mapVisit(node.rules, "\n\n") + this.emit(`${this.indent(-1)}
}`);
  }
  supports(node) {
    return this.emit(`@supports ${node.supports}`, node.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(node.rules, "\n\n") + this.emit(`${this.indent(-1)}
}`);
  }
  keyframes(node) {
    const name = this.id ? `${this.id}-${node.name}` : node.name;
    return this.emit(`@${node.vendor || ""}keyframes ${name}`, node.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(node.keyframes, "\n") + this.emit(`${this.indent(-1)}}`);
  }
  keyframe(node) {
    const decls = node.declarations;
    return this.emit(this.indent()) + this.emit(node.values.join(", "), node.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(decls, "\n") + this.emit(`${this.indent(-1)}
${this.indent()}}
`);
  }
  page(node) {
    const sel = node.selectors.length ? this.addScope(node.selectors).join(", ") + " " : "";
    return this.emit(`@page ${sel}`, node.position) + this.emit("{\n") + this.emit(this.indent(1)) + this.mapVisit(node.declarations, "\n") + this.emit(this.indent(-1)) + this.emit("\n}");
  }
  host(node) {
    return this.emit("@host", node.position) + this.emit(` {
${this.indent(1)}`) + this.mapVisit(node.rules, "\n\n") + this.emit(`${this.indent(-1)}
}`);
  }
  rule(node) {
    const indent = this.indent();
    const decls = node.declarations;
    if (!decls.length)
      return "";
    return this.emit(this.addScope(node.selectors).map((s) => indent + s).join(",\n"), node.position) + this.emit(" {\n") + this.emit(this.indent(1)) + this.mapVisit(decls, "\n") + this.emit(this.indent(-1)) + this.emit(`
${this.indent()}}`);
  }
  declaration(node) {
    let { value, property, position } = node;
    if (this.id) {
      if (animationRE.test(property)) {
        value = processAnimation(value, this.id);
      } else if (animationNameRE.test(property)) {
        value = value.split(",").map((v) => v === "none" ? v : `${v.trim()}-${this.id}`).join(",");
      }
    }
    return this.emit(this.indent()) + this.emit(`${property}: ${value}`, position) + this.emit(";");
  }
  "font-face"(node) {
    return this.emit("@font-face ", node.position) + this.emit("{\n") + this.emit(this.indent(1)) + this.mapVisit(node.declarations, "\n") + this.emit(this.indent(-1)) + this.emit("\n}");
  }
  "custom-media"(node) {
    return this.emit(`@custom-media ${node.name} ${node.media};`, node.position);
  }
};
function stringify2(node, id) {
  const compiler = new Compiler(id);
  return compiler.compile(node);
}

// src/pluginify.ts
var import_super_fast_md5 = require("super-fast-md5");
var import_utils3 = require("@garfish/utils");
function GarfishCssScope(options = {}) {
  const pluginName = "css-scope";
  const protoCache = /* @__PURE__ */ new Set();
  const astCache = /* @__PURE__ */ new Map();
  const disable = (appName) => {
    const { excludes } = options;
    if (!appName)
      return true;
    if (Array.isArray(excludes))
      return excludes.includes(appName);
    if (typeof excludes === "function")
      return excludes(appName);
    return false;
  };
  const processPreloadManager = (loader) => {
    loader.hooks.usePlugin({
      name: pluginName,
      loaded({ value, result }) {
        if (value.fileType === "css" && !disable(value.scope)) {
          const { styleCode } = value.resourceManager;
          (0, import_utils3.idleCallback)(() => {
            const hash = (0, import_super_fast_md5.md5)(styleCode);
            if (!astCache.has(hash)) {
              const astNode = parse(styleCode, { source: value.url });
              astCache.set(hash, astNode);
            }
          });
        }
        return { value, result };
      }
    });
  };
  return function(Garfish) {
    const compiledCache = /* @__PURE__ */ new Set();
    return {
      name: pluginName,
      version: "1.12.0",
      beforeBootstrap() {
        if (!import_utils3.supportWasm)
          return;
        processPreloadManager(Garfish.loader);
        const proto = Garfish.loader.StyleManager.prototype;
        const originTransform = proto.transformCode;
        if (protoCache.has(proto))
          return;
        protoCache.add(proto);
        proto.transformCode = function(code) {
          const { appName, rootElId } = this.scopeData || {};
          if (!code || !rootElId || disable(appName) || compiledCache.has(code)) {
            return originTransform.call(this, code);
          }
          const hash = (0, import_super_fast_md5.md5)(code);
          let astNode = astCache.get(hash);
          if (!astNode) {
            astNode = parse(code, { source: this.url });
            astCache.set(hash, astNode);
          }
          const newCode = stringify2(astNode, rootElId);
          compiledCache.add(newCode);
          return originTransform.call(this, newCode);
        };
      },
      beforeLoad(appInfo) {
        if (!import_utils3.supportWasm) {
          (0, import_utils3.warn)('"css-scope" plugin requires webAssembly support');
          return;
        }
        const { name, sandbox } = appInfo;
        if (!disable(name)) {
          if (sandbox && (sandbox === false || sandbox.open === false || sandbox.snapshot)) {
            (0, import_utils3.warn)(`Child app "${name}" does not open the vm sandbox, cannot use "css-scope" plugin`);
          }
        }
      },
      afterLoad(appInfo, app) {
        if (options.fixBodyGetter && !disable(appInfo.name) && (app == null ? void 0 : app.vmSandbox)) {
          app.vmSandbox.hooks.usePlugin({
            name: pluginName,
            version: "1.12.0",
            documentGetter(data) {
              if (data.propName === "body" && data.rootNode) {
                data.customValue = (0, import_utils3.findTarget)(data.rootNode, [
                  "body",
                  `div[${import_utils3.__MockBody__}]`
                ]);
              }
              return data;
            }
          });
        }
      }
    };
  };
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GarfishCssScope,
  parse,
  stringify
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9jc3NQYXJzZXIudHMiLCAiLi4vc3JjL2Nzc1N0cmluZ2lmeS50cyIsICIuLi9zcmMvYW5pbWF0aW9uUGFyc2VyLnRzIiwgIi4uL3NyYy9wbHVnaW5pZnkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7IHBhcnNlIH0gZnJvbSAnLi9jc3NQYXJzZXInO1xuZXhwb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSAnLi9jc3NTdHJpbmdpZnknO1xuZXhwb3J0IHsgQ3NzU2NvcGVPcHRpb25zLCBHYXJmaXNoQ3NzU2NvcGUgfSBmcm9tICcuL3BsdWdpbmlmeSc7IiwgIi8qIGVzbGludC1kaXNhYmxlIHF1b3RlcyAqL1xuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvZ3JhbW1hci5odG1sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdmlzaW9ubWVkaWEvY3NzLXBhcnNlL3B1bGwvNDkjaXNzdWVjb21tZW50LTMwMDg4MDI3XG5pbXBvcnQgeyBlcnJvciBhcyB0aHJvd0Vycm9yIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuaW1wb3J0IHtcbiAgTm9kZSxcbiAgUnVsZU5vZGUsXG4gIEhvc3ROb2RlLFxuICBQYWdlTm9kZSxcbiAgRGVjbE5vZGUsXG4gIE1lZGlhTm9kZSxcbiAgSW1wb3J0Tm9kZSxcbiAgQ2hhcnNldE5vZGUsXG4gIENvbW1lbnROb2RlLFxuICBEb2N1bWVudE5vZGUsXG4gIEZvbnRGYWNlTm9kZSxcbiAgS2V5ZnJhbWVOb2RlLFxuICBOYW1lc3BhY2VOb2RlLFxuICBLZXlmcmFtZXNOb2RlLFxuICBTdHlsZXNoZWV0Tm9kZSxcbiAgQ3VzdG9tTWVkaWFOb2RlLFxufSBmcm9tICcuL2dsb2JhbFR5cGVzJztcblxuY29uc3QgY29tbWVudHJlID0gL1xcL1xcKlteKl0qXFwqKyhbXi8qXVteKl0qXFwqKykqXFwvL2c7XG5cbmludGVyZmFjZSBQb2ludCB7XG4gIGxpbmU6IG51bWJlcjtcbiAgY29sdW1uOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3NzUGFyc2VyT3B0aW9ucyB7XG4gIHNpbGVudD86IGJvb2xlYW47XG4gIHNvdXJjZT86IHN0cmluZyB8IG51bGw7XG59XG5cbi8vIDFNIHRleHQgdGFrZXMgYWJvdXQgMTUwbXNcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShjc3M6IHN0cmluZywgb3B0aW9uczogQ3NzUGFyc2VyT3B0aW9ucyA9IHt9KSB7XG4gIGxldCBsaW5lID0gMTtcbiAgbGV0IGNvbHVtbiA9IDE7XG5cbiAgLy8gVXBkYXRlIGxpbmVubyBhbmQgY29sdW1uIGJhc2VkIG9uIGBzdHJgLlxuICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbihzdHI6IHN0cmluZykge1xuICAgIGNvbnN0IGxpbmVzID0gc3RyLm1hdGNoKC9cXG4vZyk7XG4gICAgaWYgKGxpbmVzKSBsaW5lICs9IGxpbmVzLmxlbmd0aDtcbiAgICBjb25zdCBpID0gc3RyLmxhc3RJbmRleE9mKCdcXG4nKTtcbiAgICBjb2x1bW4gPSBpID4gLTEgPyBzdHIubGVuZ3RoIC0gaSA6IGNvbHVtbiArIHN0ci5sZW5ndGg7XG4gIH1cblxuICAvLyBTdG9yZSBwb3NpdGlvbiBpbmZvcm1hdGlvbiBmb3IgYSBub2RlXG4gIGNsYXNzIFBvc2l0aW9uIHtcbiAgICBwdWJsaWMgc3RhcnQ6IFBvaW50O1xuICAgIHB1YmxpYyBjb250ZW50ID0gY3NzO1xuICAgIHB1YmxpYyBlbmQgPSB7IGxpbmUsIGNvbHVtbiB9O1xuICAgIHB1YmxpYyBzb3VyY2UgPSBvcHRpb25zLnNvdXJjZTtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBQb2ludCkge1xuICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIC8vIE1hcmsgcG9zaXRpb24gYW5kIHBhdGNoIGBub2RlLnBvc2l0aW9uYC5cbiAgZnVuY3Rpb24gcG9zaXRpb24oKSB7XG4gICAgY29uc3Qgc3RhcnQ6IFBvaW50ID0geyBsaW5lLCBjb2x1bW4gfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gPFQgZXh0ZW5kcyBQYXJ0aWFsPE5vZGU+Pihub2RlOiBUKSB7XG4gICAgICBub2RlLnBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKHN0YXJ0KTtcbiAgICAgIHdoaXRlc3BhY2UoKTtcbiAgICAgIHJldHVybiBub2RlIGFzIFQ7XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGVycm9yc0xpc3Q6IEFycmF5PEVycm9yPiA9IFtdO1xuICBmdW5jdGlvbiBlcnJvcihtc2c6IHN0cmluZykge1xuICAgIGNvbnN0IHNvdXJjZSA9IG9wdGlvbnMuc291cmNlID8gb3B0aW9ucy5zb3VyY2UgKyAnOicgOiAnJztcbiAgICBjb25zdCBlcnI6IGFueSA9IG5ldyBFcnJvcihzb3VyY2UgKyBsaW5lICsgJzonICsgY29sdW1uICsgJzogJyArIG1zZyk7XG5cbiAgICBlcnIubGluZSA9IGxpbmU7XG4gICAgZXJyLmNvbHVtbiA9IGNvbHVtbjtcbiAgICBlcnIucmVhc29uID0gbXNnO1xuICAgIGVyci5zb3VyY2UgPSBjc3M7XG4gICAgZXJyLmZpbGVuYW1lID0gb3B0aW9ucy5zb3VyY2U7XG5cbiAgICBpZiAob3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgIGVycm9yc0xpc3QucHVzaChlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgLy8gUGFyc2Ugc3R5bGVzaGVldC5cbiAgZnVuY3Rpb24gc3R5bGVzaGVldCgpIHtcbiAgICBjb25zdCBydWxlc0xpc3QgPSBydWxlcygpO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3R5bGVzaGVldCcsXG4gICAgICBzdHlsZXNoZWV0OiB7XG4gICAgICAgIHJ1bGVzOiBydWxlc0xpc3QsXG4gICAgICAgIHNvdXJjZTogb3B0aW9ucy5zb3VyY2UsXG4gICAgICAgIHBhcnNpbmdFcnJvcnM6IGVycm9yc0xpc3QsXG4gICAgICB9LFxuICAgIH0gYXMgdW5rbm93biBhcyBTdHlsZXNoZWV0Tm9kZTtcbiAgfVxuXG4gIC8vIE9wZW5pbmcgYnJhY2UuXG4gIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgcmV0dXJuIG1hdGNoKC9ee1xccyovKTtcbiAgfVxuXG4gIC8vIENsb3NpbmcgYnJhY2UuXG4gIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIHJldHVybiBtYXRjaCgvXn0vKTtcbiAgfVxuXG4gIC8vIFBhcnNlIHdoaXRlc3BhY2UuXG4gIGZ1bmN0aW9uIHdoaXRlc3BhY2UoKSB7XG4gICAgbWF0Y2goL15cXHMqLyk7XG4gIH1cblxuICAvLyBQYXJzZSBydWxlc2V0LlxuICBmdW5jdGlvbiBydWxlcygpIHtcbiAgICBsZXQgbm9kZTtcbiAgICBjb25zdCBydWxlczogQXJyYXk8UnVsZU5vZGU+ID0gW107XG4gICAgd2hpdGVzcGFjZSgpO1xuICAgIGNvbW1lbnRzKHJ1bGVzKTtcbiAgICB3aGlsZSAoY3NzLmxlbmd0aCAmJiBjc3MuY2hhckF0KDApICE9PSAnfScgJiYgKG5vZGUgPSBhdHJ1bGUoKSB8fCBydWxlKCkpKSB7XG4gICAgICBpZiAobm9kZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgcnVsZXMucHVzaChub2RlKTtcbiAgICAgICAgY29tbWVudHMocnVsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnVsZXM7XG4gIH1cblxuICAvLyBNYXRjaCBgcmVgIGFuZCByZXR1cm4gY2FwdHVyZXMuXG4gIGZ1bmN0aW9uIG1hdGNoKHJlOiBSZWdFeHApIHtcbiAgICBjb25zdCBtID0gcmUuZXhlYyhjc3MpO1xuICAgIGlmIChtKSB7XG4gICAgICBjb25zdCBzdHIgPSBtWzBdO1xuICAgICAgdXBkYXRlUG9zaXRpb24oc3RyKTtcbiAgICAgIGNzcyA9IGNzcy5zbGljZShzdHIubGVuZ3RoKTtcbiAgICAgIHJldHVybiBtO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNlIGNvbW1lbnRzO1xuICBmdW5jdGlvbiBjb21tZW50czxUIGV4dGVuZHMgQXJyYXk8YW55Pj4ocnVsZXM/OiBUKSB7XG4gICAgbGV0IGM7XG4gICAgcnVsZXMgPSBydWxlcyB8fCAoW10gYXMgYW55KTtcbiAgICB3aGlsZSAoKGMgPSBjb21tZW50KCkpKSB7XG4gICAgICBpZiAoYyAhPT0gZmFsc2UpIHtcbiAgICAgICAgcnVsZXMhLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlcyBhcyBUO1xuICB9XG5cbiAgLy8gUGFyc2UgY29tbWVudC5cbiAgZnVuY3Rpb24gY29tbWVudCgpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIGlmICgnLycgIT09IGNzcy5jaGFyQXQoMCkgfHwgJyonICE9PSBjc3MuY2hhckF0KDEpKSByZXR1cm47XG5cbiAgICBsZXQgaSA9IDI7XG4gICAgd2hpbGUgKFxuICAgICAgJycgIT09IGNzcy5jaGFyQXQoaSkgJiZcbiAgICAgICgnKicgIT09IGNzcy5jaGFyQXQoaSkgfHwgJy8nICE9PSBjc3MuY2hhckF0KGkgKyAxKSlcbiAgICApIHtcbiAgICAgICsraTtcbiAgICB9XG5cbiAgICBpICs9IDI7XG5cbiAgICBpZiAoJycgPT09IGNzcy5jaGFyQXQoaSAtIDEpKSB7XG4gICAgICByZXR1cm4gZXJyb3IoJ0VuZCBvZiBjb21tZW50IG1pc3NpbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHIgPSBjc3Muc2xpY2UoMiwgaSAtIDIpO1xuICAgIGNvbHVtbiArPSAyO1xuICAgIHVwZGF0ZVBvc2l0aW9uKHN0cik7XG4gICAgY3NzID0gY3NzLnNsaWNlKGkpO1xuICAgIGNvbHVtbiArPSAyO1xuXG4gICAgcmV0dXJuIHBvcyh7XG4gICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICBjb21tZW50OiBzdHIsXG4gICAgfSkgYXMgQ29tbWVudE5vZGU7XG4gIH1cblxuICAvLyBQYXJzZSBzZWxlY3Rvci5cbiAgZnVuY3Rpb24gc2VsZWN0b3IoKSB7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eKFtee10rKS8pO1xuICAgIGlmIChtKSB7XG4gICAgICAvLyBAZml4IFJlbW92ZSBhbGwgY29tbWVudHMgZnJvbSBzZWxlY3RvcnNcbiAgICAgIC8vIGh0dHA6Ly9vc3Rlcm1pbGxlci5vcmcvZmluZGNvbW1lbnQuaHRtbFxuICAgICAgcmV0dXJuIHRyaW0obVswXSlcbiAgICAgICAgLnJlcGxhY2UoL1xcL1xcKihbXipdfFtcXHJcXG5dfChcXCorKFteKi9dfFtcXHJcXG5dKSkpKlxcKlxcLysvZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9cIig/OlxcXFxcInxbXlwiXSkqXCJ8Jyg/OlxcXFwnfFteJ10pKicvZywgKG0pID0+IHtcbiAgICAgICAgICByZXR1cm4gbS5yZXBsYWNlKC8sL2csICdcXHUyMDBDJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zcGxpdCgvXFxzKig/IVteKF0qXFwpKSxcXHMqLylcbiAgICAgICAgLm1hcCgocykgPT4gcy5yZXBsYWNlKC9cXHUyMDBDL2csICcsJykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNlIGRlY2xhcmF0aW9uLlxuICBmdW5jdGlvbiBkZWNsYXJhdGlvbigpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIC8vIHByb3BcbiAgICBsZXQgcHJvcCA9IG1hdGNoKC9eKFxcKj9bLSNcXC9cXCpcXFxcXFx3XSsoXFxbWzAtOWEtel8tXStcXF0pPylcXHMqLyk7XG4gICAgaWYgKCFwcm9wKSByZXR1cm47XG4gICAgKHByb3AgYXMgYW55KSA9IHRyaW0ocHJvcFswXSk7XG4gICAgLy8gOlxuICAgIGlmICghbWF0Y2goL146XFxzKi8pKSByZXR1cm4gZXJyb3IoXCJwcm9wZXJ0eSBtaXNzaW5nICc6J1wiKTtcbiAgICAvLyB2YWxcbiAgICBjb25zdCB2YWwgPSBtYXRjaCgvXigoPzonKD86XFxcXCd8LikqPyd8XCIoPzpcXFxcXCJ8LikqP1wifFxcKFteXFwpXSo/XFwpfFtefTtdKSspLyk7XG5cbiAgICBjb25zdCByZXQgPSBwb3Moe1xuICAgICAgdHlwZTogJ2RlY2xhcmF0aW9uJyxcbiAgICAgIHByb3BlcnR5OiAocHJvcCBhcyBhbnkpLnJlcGxhY2UoY29tbWVudHJlLCAnJyksXG4gICAgICB2YWx1ZTogdmFsID8gdHJpbSh2YWxbMF0pLnJlcGxhY2UoY29tbWVudHJlLCAnJykgOiAnJyxcbiAgICB9KTtcblxuICAgIC8vIDtcbiAgICBtYXRjaCgvXls7XFxzXSovKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUGFyc2UgZGVjbGFyYXRpb25zLlxuICBmdW5jdGlvbiBkZWNsYXJhdGlvbnMoKSB7XG4gICAgY29uc3QgZGVjbHM6IEFycmF5PERlY2xOb2RlPiA9IFtdO1xuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJtaXNzaW5nICd7J1wiKTtcbiAgICBjb21tZW50cyhkZWNscyk7XG5cbiAgICAvLyBkZWNsYXJhdGlvbnNcbiAgICBsZXQgZGVjbDtcbiAgICB3aGlsZSAoKGRlY2wgPSBkZWNsYXJhdGlvbigpKSkge1xuICAgICAgaWYgKGRlY2wgIT09IGZhbHNlKSB7XG4gICAgICAgIGRlY2xzLnB1c2goZGVjbCk7XG4gICAgICAgIGNvbW1lbnRzKGRlY2xzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJtaXNzaW5nICd9J1wiKTtcbiAgICByZXR1cm4gZGVjbHM7XG4gIH1cblxuICAvLyBQYXJzZSBrZXlmcmFtZS5cbiAgZnVuY3Rpb24ga2V5ZnJhbWUoKSB7XG4gICAgbGV0IG06IGFueTtcbiAgICBjb25zdCB2YWxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcblxuICAgIHdoaWxlICgobSA9IG1hdGNoKC9eKChcXGQrXFwuXFxkK3xcXC5cXGQrfFxcZCspJT98W2Etel0rKVxccyovKSkpIHtcbiAgICAgIHZhbHMucHVzaChtWzFdKTtcbiAgICAgIG1hdGNoKC9eLFxccyovKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHMubGVuZ3RoKSByZXR1cm47XG4gICAgcmV0dXJuIHBvcyh7XG4gICAgICB0eXBlOiAna2V5ZnJhbWUnLFxuICAgICAgdmFsdWVzOiB2YWxzLFxuICAgICAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMoKSB8fCBbXSxcbiAgICB9KSBhcyB1bmtub3duIGFzIEtleWZyYW1lTm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIGtleWZyYW1lcy5cbiAgZnVuY3Rpb24gYXRrZXlmcmFtZXMoKSB7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcbiAgICBsZXQgbSA9IG1hdGNoKC9eQChbLVxcd10rKT9rZXlmcmFtZXNcXHMqLyk7XG4gICAgaWYgKCFtKSByZXR1cm47XG4gICAgY29uc3QgdmVuZG9yID0gbVsxXTtcblxuICAgIC8vIGlkZW50aWZpZXJcbiAgICBtID0gbWF0Y2goL14oWy1cXHddKylcXHMqLyk7XG4gICAgaWYgKCFtKSByZXR1cm4gZXJyb3IoJ0BrZXlmcmFtZXMgbWlzc2luZyBuYW1lJyk7XG4gICAgY29uc3QgbmFtZSA9IG1bMV07XG5cbiAgICBpZiAoIW9wZW4oKSkgcmV0dXJuIGVycm9yKFwiQGtleWZyYW1lcyBtaXNzaW5nICd7J1wiKTtcbiAgICBsZXQgZnJhbWU7XG4gICAgbGV0IGZyYW1lcyA9IGNvbW1lbnRzKCk7XG4gICAgd2hpbGUgKChmcmFtZSA9IGtleWZyYW1lKCkpKSB7XG4gICAgICBmcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICBmcmFtZXMgPSBmcmFtZXMuY29uY2F0KGNvbW1lbnRzKCkpO1xuICAgIH1cbiAgICBpZiAoIWNsb3NlKCkpIHJldHVybiBlcnJvcihcIkBrZXlmcmFtZXMgbWlzc2luZyAnfSdcIik7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdrZXlmcmFtZXMnLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHZlbmRvcjogdmVuZG9yLFxuICAgICAga2V5ZnJhbWVzOiBmcmFtZXMsXG4gICAgfSkgYXMgS2V5ZnJhbWVzTm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIHN1cHBvcnRzLlxuICBmdW5jdGlvbiBhdHN1cHBvcnRzKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eQHN1cHBvcnRzICooW157XSspLyk7XG5cbiAgICBpZiAoIW0pIHJldHVybjtcbiAgICBjb25zdCBzdXBwb3J0cyA9IHRyaW0obVsxXSk7XG5cbiAgICBpZiAoIW9wZW4oKSkgcmV0dXJuIGVycm9yKFwiQHN1cHBvcnRzIG1pc3NpbmcgJ3snXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gY29tbWVudHMoKS5jb25jYXQocnVsZXMoKSk7XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJAc3VwcG9ydHMgbWlzc2luZyAnfSdcIik7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdzdXBwb3J0cycsXG4gICAgICBzdXBwb3J0czogc3VwcG9ydHMsXG4gICAgICBydWxlczogc3R5bGUsXG4gICAgfSk7XG4gIH1cblxuICAvLyBQYXJzZSBob3N0LlxuICBmdW5jdGlvbiBhdGhvc3QoKSB7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcbiAgICBjb25zdCBtID0gbWF0Y2goL15AaG9zdFxccyovKTtcbiAgICBpZiAoIW0pIHJldHVybjtcblxuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJAaG9zdCBtaXNzaW5nICd7J1wiKTtcbiAgICBjb25zdCBzdHlsZSA9IGNvbW1lbnRzKCkuY29uY2F0KHJ1bGVzKCkpO1xuICAgIGlmICghY2xvc2UoKSkgcmV0dXJuIGVycm9yKFwiQGhvc3QgbWlzc2luZyAnfSdcIik7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdob3N0JyxcbiAgICAgIHJ1bGVzOiBzdHlsZSxcbiAgICB9KSBhcyBIb3N0Tm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIG1lZGlhLlxuICBmdW5jdGlvbiBhdG1lZGlhKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eQG1lZGlhICooW157XSspLyk7XG5cbiAgICBpZiAoIW0pIHJldHVybjtcbiAgICBjb25zdCBtZWRpYSA9IHRyaW0obVsxXSk7XG5cbiAgICBpZiAoIW9wZW4oKSkgcmV0dXJuIGVycm9yKFwiQG1lZGlhIG1pc3NpbmcgJ3snXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gY29tbWVudHMoKS5jb25jYXQocnVsZXMoKSk7XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJAbWVkaWEgbWlzc2luZyAnfSdcIik7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdtZWRpYScsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBydWxlczogc3R5bGUsXG4gICAgfSkgYXMgTWVkaWFOb2RlO1xuICB9XG5cbiAgLy8gUGFyc2UgY3VzdG9tLW1lZGlhLlxuICBmdW5jdGlvbiBhdGN1c3RvbW1lZGlhKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eQGN1c3RvbS1tZWRpYVxccysoLS1bXlxcc10rKVxccyooW157O10rKTsvKTtcbiAgICBpZiAoIW0pIHJldHVybjtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ2N1c3RvbS1tZWRpYScsXG4gICAgICBuYW1lOiB0cmltKG1bMV0pLFxuICAgICAgbWVkaWE6IHRyaW0obVsyXSksXG4gICAgfSkgYXMgQ3VzdG9tTWVkaWFOb2RlO1xuICB9XG5cbiAgLy8gUGFyc2UgcGFnZWQgbWVkaWEuXG4gIGZ1bmN0aW9uIGF0cGFnZSgpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIGNvbnN0IG0gPSBtYXRjaCgvXkBwYWdlICovKTtcbiAgICBpZiAoIW0pIHJldHVybjtcblxuICAgIGNvbnN0IHNlbCA9IHNlbGVjdG9yKCkgfHwgW107XG5cbiAgICBpZiAoIW9wZW4oKSkgcmV0dXJuIGVycm9yKFwiQHBhZ2UgbWlzc2luZyAneydcIik7XG4gICAgLy8gZGVjbGFyYXRpb25zXG4gICAgbGV0IGRlY2w7XG4gICAgbGV0IGRlY2xzID0gY29tbWVudHMoKTtcblxuICAgIHdoaWxlICgoZGVjbCA9IGRlY2xhcmF0aW9uKCkpKSB7XG4gICAgICBkZWNscy5wdXNoKGRlY2wpO1xuICAgICAgZGVjbHMgPSBkZWNscy5jb25jYXQoY29tbWVudHMoKSk7XG4gICAgfVxuICAgIGlmICghY2xvc2UoKSkgcmV0dXJuIGVycm9yKFwiQHBhZ2UgbWlzc2luZyAnfSdcIik7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdwYWdlJyxcbiAgICAgIHNlbGVjdG9yczogc2VsLFxuICAgICAgZGVjbGFyYXRpb25zOiBkZWNscyxcbiAgICB9KSBhcyBQYWdlTm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIGRvY3VtZW50LlxuICBmdW5jdGlvbiBhdGRvY3VtZW50KCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eQChbLVxcd10rKT9kb2N1bWVudCAqKFtee10rKS8pO1xuICAgIGlmICghbSkgcmV0dXJuO1xuXG4gICAgY29uc3QgdmVuZG9yID0gdHJpbShtWzFdKTtcbiAgICBjb25zdCBkb2MgPSB0cmltKG1bMl0pO1xuXG4gICAgaWYgKCFvcGVuKCkpIHJldHVybiBlcnJvcihcIkBkb2N1bWVudCBtaXNzaW5nICd7J1wiKTtcbiAgICBjb25zdCBzdHlsZSA9IGNvbW1lbnRzKCkuY29uY2F0KHJ1bGVzKCkpO1xuICAgIGlmICghY2xvc2UoKSkgcmV0dXJuIGVycm9yKFwiQGRvY3VtZW50IG1pc3NpbmcgJ30nXCIpO1xuXG4gICAgcmV0dXJuIHBvcyh7XG4gICAgICB0eXBlOiAnZG9jdW1lbnQnLFxuICAgICAgZG9jdW1lbnQ6IGRvYyxcbiAgICAgIHZlbmRvcjogdmVuZG9yLFxuICAgICAgcnVsZXM6IHN0eWxlLFxuICAgIH0pIGFzIERvY3VtZW50Tm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIGZvbnQtZmFjZS5cbiAgZnVuY3Rpb24gYXRmb250ZmFjZSgpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIGNvbnN0IG0gPSBtYXRjaCgvXkBmb250LWZhY2VcXHMqLyk7XG4gICAgaWYgKCFtKSByZXR1cm47XG5cbiAgICBpZiAoIW9wZW4oKSkgcmV0dXJuIGVycm9yKFwiQGZvbnQtZmFjZSBtaXNzaW5nICd7J1wiKTtcbiAgICAvLyBkZWNsYXJhdGlvbnNcbiAgICBsZXQgZGVjbDtcbiAgICBsZXQgZGVjbHMgPSBjb21tZW50cygpO1xuICAgIHdoaWxlICgoZGVjbCA9IGRlY2xhcmF0aW9uKCkpKSB7XG4gICAgICBkZWNscy5wdXNoKGRlY2wpO1xuICAgICAgZGVjbHMgPSBkZWNscy5jb25jYXQoY29tbWVudHMoKSk7XG4gICAgfVxuICAgIGlmICghY2xvc2UoKSkgcmV0dXJuIGVycm9yKFwiQGZvbnQtZmFjZSBtaXNzaW5nICd9J1wiKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ2ZvbnQtZmFjZScsXG4gICAgICBkZWNsYXJhdGlvbnM6IGRlY2xzLFxuICAgIH0pIGFzIEZvbnRGYWNlTm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIG5vbi1ibG9jayBhdC1ydWxlc1xuICBmdW5jdGlvbiBjb21waWxlQXRydWxlPFQ+KG5hbWU6IE5vZGVbJ3R5cGUnXSkge1xuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cCgnXkAnICsgbmFtZSArICdcXFxccyooW147XSspOycpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgICAgY29uc3QgbSA9IG1hdGNoKHJlKTtcbiAgICAgIGlmICghbSkgcmV0dXJuO1xuICAgICAgY29uc3QgcmV0ID0geyB0eXBlOiBuYW1lIH07XG4gICAgICByZXRbbmFtZV0gPSBtWzFdLnRyaW0oKTtcbiAgICAgIHJldHVybiBwb3MocmV0KSBhcyB1bmtub3duIGFzIFQ7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFBhcnNlIGltcG9ydFxuICBjb25zdCBhdGltcG9ydCA9IGNvbXBpbGVBdHJ1bGU8SW1wb3J0Tm9kZT4oJ2ltcG9ydCcpO1xuICAvLyBQYXJzZSBjaGFyc2V0XG4gIGNvbnN0IGF0Y2hhcnNldCA9IGNvbXBpbGVBdHJ1bGU8Q2hhcnNldE5vZGU+KCdjaGFyc2V0Jyk7XG4gIC8vIFBhcnNlIG5hbWVzcGFjZVxuICBjb25zdCBhdG5hbWVzcGFjZSA9IGNvbXBpbGVBdHJ1bGU8TmFtZXNwYWNlTm9kZT4oJ25hbWVzcGFjZScpO1xuXG4gIC8vIFBhcnNlIGF0IHJ1bGUuXG4gIGZ1bmN0aW9uIGF0cnVsZSgpIHtcbiAgICBpZiAoY3NzWzBdICE9PSAnQCcpIHJldHVybjtcbiAgICByZXR1cm4gKFxuICAgICAgYXRrZXlmcmFtZXMoKSB8fFxuICAgICAgYXRtZWRpYSgpIHx8XG4gICAgICBhdGN1c3RvbW1lZGlhKCkgfHxcbiAgICAgIGF0c3VwcG9ydHMoKSB8fFxuICAgICAgYXRpbXBvcnQoKSB8fFxuICAgICAgYXRjaGFyc2V0KCkgfHxcbiAgICAgIGF0bmFtZXNwYWNlKCkgfHxcbiAgICAgIGF0ZG9jdW1lbnQoKSB8fFxuICAgICAgYXRwYWdlKCkgfHxcbiAgICAgIGF0aG9zdCgpIHx8XG4gICAgICBhdGZvbnRmYWNlKClcbiAgICApO1xuICB9XG5cbiAgLy8gUGFyc2UgcnVsZS5cbiAgZnVuY3Rpb24gcnVsZSgpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIGNvbnN0IHNlbCA9IHNlbGVjdG9yKCk7XG4gICAgaWYgKCFzZWwpIHJldHVybiBlcnJvcignc2VsZWN0b3IgbWlzc2luZycpO1xuICAgIGNvbW1lbnRzKCk7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdydWxlJyxcbiAgICAgIHNlbGVjdG9yczogc2VsLFxuICAgICAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMoKSB8fCBbXSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBhZGRQYXJlbnQoc3R5bGVzaGVldCgpIGFzIGFueSkgYXMgU3R5bGVzaGVldE5vZGU7XG59XG5cbmZ1bmN0aW9uIHRyaW0oc3RyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHN0ciA/IHN0ci50cmltKCkgOiAnJztcbn1cblxuLy8gQWRkcyBub24tZW51bWVyYWJsZSBwYXJlbnQgbm9kZSByZWZlcmVuY2UgdG8gZWFjaCBub2RlLlxuZnVuY3Rpb24gYWRkUGFyZW50KG9iajogTm9kZSwgcGFyZW50PzogTm9kZSB8IG51bGwpIHtcbiAgY29uc3QgaXNOb2RlID0gb2JqICYmIHR5cGVvZiBvYmoudHlwZSA9PT0gJ3N0cmluZyc7XG4gIGNvbnN0IGNoaWxkUGFyZW50ID0gaXNOb2RlID8gb2JqIDogcGFyZW50O1xuXG4gIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9ialtrXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKHYpID0+IGFkZFBhcmVudCh2LCBjaGlsZFBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgYWRkUGFyZW50KHZhbHVlLCBjaGlsZFBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzTm9kZSkge1xuICAgIG9iai5wYXJlbnQgPSBwYXJlbnQgfHwgbnVsbDtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuIiwgImltcG9ydCB7IF9fTW9ja0h0bWxfXywgX19Nb2NrSGVhZF9fLCBfX01vY2tCb2R5X18gfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQge1xuICBOb2RlLFxuICBEZWNsTm9kZSxcbiAgUGFnZU5vZGUsXG4gIEhvc3ROb2RlLFxuICBSdWxlTm9kZSxcbiAgTWVkaWFOb2RlLFxuICBJbXBvcnROb2RlLFxuICBDaGFyc2V0Tm9kZSxcbiAgQ29tbWVudE5vZGUsXG4gIFN1cHBvcnRzTm9kZSxcbiAgRG9jdW1lbnROb2RlLFxuICBGb250RmFjZU5vZGUsXG4gIEtleWZyYW1lTm9kZSxcbiAgS2V5ZnJhbWVzTm9kZSxcbiAgTmFtZXNwYWNlTm9kZSxcbiAgU3R5bGVzaGVldE5vZGUsXG4gIEN1c3RvbU1lZGlhTm9kZSxcbn0gZnJvbSAnLi9nbG9iYWxUeXBlcyc7XG5pbXBvcnQgeyBwcm9jZXNzQW5pbWF0aW9uIH0gZnJvbSAnLi9hbmltYXRpb25QYXJzZXInO1xuXG5jb25zdCBhbmltYXRpb25SRSA9IC9eKC1cXHcrLSk/YW5pbWF0aW9uJC87XG5jb25zdCBhbmltYXRpb25OYW1lUkUgPSAvXigtXFx3Ky0pP2FuaW1hdGlvbi1uYW1lJC87XG5cbmNsYXNzIENvbXBpbGVyIHtcbiAgcHVibGljIGxldmVsID0gMTtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuaWQgPSBpZCB8fCAnJztcbiAgfVxuXG4gIC8vIFx1NTNFRlx1NEVFNVx1OTFDRFx1NTE5OVx1ODk4Nlx1NzZENiBlbWl0XG4gIGVtaXQoc3RyOiBzdHJpbmcsIF8/OiBhbnkpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgdmlzaXQobm9kZTogTm9kZSkge1xuICAgIHJldHVybiB0aGlzW25vZGUudHlwZV0obm9kZSBhcyBhbnkpO1xuICB9XG5cbiAgbWFwVmlzaXQobm9kZXM6IEFycmF5PE5vZGU+LCBkZWxpbTogc3RyaW5nKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBidWYgPSAnJztcbiAgICBjb25zdCBsZW4gPSBub2Rlcy5sZW5ndGg7XG5cbiAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBidWYgKz0gdGhpcy52aXNpdChub2Rlc1tpXSk7XG4gICAgICBpZiAoZGVsaW0gJiYgaSA8IGxlbiAtIDEpIHtcbiAgICAgICAgYnVmICs9IHRoaXMuZW1pdChkZWxpbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICBhZGRTY29wZShzZWxlY3RvcnM6IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAoIXRoaXMuaWQpIHJldHVybiBzZWxlY3RvcnM7XG5cbiAgICByZXR1cm4gc2VsZWN0b3JzLm1hcCgocykgPT4ge1xuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICBzID1cbiAgICAgICAgcyA9PT0gJ2h0bWwnIHx8IHMgPT09ICc6cm9vdCdcbiAgICAgICAgICA/IGBbJHtfX01vY2tIdG1sX199XWBcbiAgICAgICAgICA6IHMgPT09ICdib2R5J1xuICAgICAgICAgICAgPyBgWyR7X19Nb2NrQm9keV9ffV1gXG4gICAgICAgICAgICA6IHMgPT09ICdoZWFkJ1xuICAgICAgICAgICAgICA/IGBbJHtfX01vY2tIZWFkX199XWBcbiAgICAgICAgICAgICAgOiBzO1xuICAgICAgcmV0dXJuIGAjJHt0aGlzLmlkfSAke3N9YDtcbiAgICB9KTtcbiAgfVxuXG4gIGluZGVudChsZXZlbD86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmxldmVsICs9IGxldmVsO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkodGhpcy5sZXZlbCkuam9pbignICAnKTtcbiAgfVxuXG4gIGNvbXBpbGUobm9kZTogU3R5bGVzaGVldE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdHlsZXNoZWV0KG5vZGUpO1xuICB9XG5cbiAgc3R5bGVzaGVldChub2RlOiBTdHlsZXNoZWV0Tm9kZSkge1xuICAgIHJldHVybiB0aGlzLm1hcFZpc2l0KG5vZGUuc3R5bGVzaGVldC5ydWxlcywgJ1xcblxcbicpO1xuICB9XG5cbiAgY29tbWVudChub2RlOiBDb21tZW50Tm9kZSkge1xuICAgIHJldHVybiB0aGlzLmVtaXQoYCR7dGhpcy5pbmRlbnQoKX0vKiR7bm9kZS5jb21tZW50fSovYCwgbm9kZS5wb3NpdGlvbik7XG4gIH1cblxuICBpbXBvcnQobm9kZTogSW1wb3J0Tm9kZSkge1xuICAgIHJldHVybiB0aGlzLmVtaXQoYEBpbXBvcnQgJHtub2RlLmltcG9ydH07YCwgbm9kZS5wb3NpdGlvbik7XG4gIH1cblxuICBjaGFyc2V0KG5vZGU6IENoYXJzZXROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdChgQGNoYXJzZXQgJHtub2RlLmNoYXJzZXR9O2AsIG5vZGUucG9zaXRpb24pO1xuICB9XG5cbiAgbmFtZXNwYWNlKG5vZGU6IE5hbWVzcGFjZU5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0KGBAbmFtZXNwYWNlICR7bm9kZS5uYW1lc3BhY2V9O2AsIG5vZGUucG9zaXRpb24pO1xuICB9XG5cbiAgbWVkaWEobm9kZTogTWVkaWFOb2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdChgQG1lZGlhICR7bm9kZS5tZWRpYX1gLCBub2RlLnBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoYCB7XFxuJHt0aGlzLmluZGVudCgxKX1gKSArXG4gICAgICB0aGlzLm1hcFZpc2l0KG5vZGUucnVsZXMsICdcXG5cXG4nKSArXG4gICAgICB0aGlzLmVtaXQoYCR7dGhpcy5pbmRlbnQoLTEpfVxcbn1gKVxuICAgICk7XG4gIH1cblxuICBkb2N1bWVudChub2RlOiBEb2N1bWVudE5vZGUpIHtcbiAgICBjb25zdCBkb2MgPSBgQCR7bm9kZS52ZW5kb3IgfHwgJyd9ZG9jdW1lbnQgJHtub2RlLmRvY3VtZW50fWA7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdChkb2MsIG5vZGUucG9zaXRpb24pICtcbiAgICAgIHRoaXMuZW1pdChgICB7XFxuJHt0aGlzLmluZGVudCgxKX1gKSArXG4gICAgICB0aGlzLm1hcFZpc2l0KG5vZGUucnVsZXMsICdcXG5cXG4nKSArXG4gICAgICB0aGlzLmVtaXQoYCR7dGhpcy5pbmRlbnQoLTEpfVxcbn1gKVxuICAgICk7XG4gIH1cblxuICBzdXBwb3J0cyhub2RlOiBTdXBwb3J0c05vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KGBAc3VwcG9ydHMgJHtub2RlLnN1cHBvcnRzfWAsIG5vZGUucG9zaXRpb24pICtcbiAgICAgIHRoaXMuZW1pdChgIHtcXG4ke3RoaXMuaW5kZW50KDEpfWApICtcbiAgICAgIHRoaXMubWFwVmlzaXQobm9kZS5ydWxlcywgJ1xcblxcbicpICtcbiAgICAgIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgtMSl9XFxufWApXG4gICAgKTtcbiAgfVxuXG4gIGtleWZyYW1lcyhub2RlOiBLZXlmcmFtZXNOb2RlKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuaWQgPyBgJHt0aGlzLmlkfS0ke25vZGUubmFtZX1gIDogbm9kZS5uYW1lO1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmVtaXQoYEAke25vZGUudmVuZG9yIHx8ICcnfWtleWZyYW1lcyAke25hbWV9YCwgbm9kZS5wb3NpdGlvbikgK1xuICAgICAgdGhpcy5lbWl0KGAge1xcbiR7dGhpcy5pbmRlbnQoMSl9YCkgK1xuICAgICAgdGhpcy5tYXBWaXNpdChub2RlLmtleWZyYW1lcywgJ1xcbicpICtcbiAgICAgIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgtMSl9fWApXG4gICAgKTtcbiAgfVxuXG4gIGtleWZyYW1lKG5vZGU6IEtleWZyYW1lTm9kZSkge1xuICAgIGNvbnN0IGRlY2xzID0gbm9kZS5kZWNsYXJhdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgpKSArXG4gICAgICB0aGlzLmVtaXQobm9kZS52YWx1ZXMuam9pbignLCAnKSwgbm9kZS5wb3NpdGlvbikgK1xuICAgICAgdGhpcy5lbWl0KGAge1xcbiR7dGhpcy5pbmRlbnQoMSl9YCkgK1xuICAgICAgdGhpcy5tYXBWaXNpdChkZWNscywgJ1xcbicpICtcbiAgICAgIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgtMSl9XFxuJHt0aGlzLmluZGVudCgpfX1cXG5gKVxuICAgICk7XG4gIH1cblxuICBwYWdlKG5vZGU6IFBhZ2VOb2RlKSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3Qgc2VsID0gbm9kZS5zZWxlY3RvcnMubGVuZ3RoXG4gICAgICA/IHRoaXMuYWRkU2NvcGUobm9kZS5zZWxlY3RvcnMpLmpvaW4oJywgJykgKyAnICdcbiAgICAgIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KGBAcGFnZSAke3NlbH1gLCBub2RlLnBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoJ3tcXG4nKSArXG4gICAgICB0aGlzLmVtaXQodGhpcy5pbmRlbnQoMSkpICtcbiAgICAgIHRoaXMubWFwVmlzaXQobm9kZS5kZWNsYXJhdGlvbnMsICdcXG4nKSArXG4gICAgICB0aGlzLmVtaXQodGhpcy5pbmRlbnQoLTEpKSArXG4gICAgICB0aGlzLmVtaXQoJ1xcbn0nKVxuICAgICk7XG4gIH1cblxuICBob3N0KG5vZGU6IEhvc3ROb2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdCgnQGhvc3QnLCBub2RlLnBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoYCB7XFxuJHt0aGlzLmluZGVudCgxKX1gKSArXG4gICAgICB0aGlzLm1hcFZpc2l0KG5vZGUucnVsZXMsICdcXG5cXG4nKSArXG4gICAgICB0aGlzLmVtaXQoYCR7dGhpcy5pbmRlbnQoLTEpfVxcbn1gKVxuICAgICk7XG4gIH1cblxuICBydWxlKG5vZGU6IFJ1bGVOb2RlKSB7XG4gICAgY29uc3QgaW5kZW50ID0gdGhpcy5pbmRlbnQoKTtcbiAgICBjb25zdCBkZWNscyA9IG5vZGUuZGVjbGFyYXRpb25zO1xuICAgIGlmICghZGVjbHMubGVuZ3RoKSByZXR1cm4gJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KFxuICAgICAgICB0aGlzLmFkZFNjb3BlKG5vZGUuc2VsZWN0b3JzKVxuICAgICAgICAgIC5tYXAoKHMpID0+IGluZGVudCArIHMpXG4gICAgICAgICAgLmpvaW4oJyxcXG4nKSxcbiAgICAgICAgbm9kZS5wb3NpdGlvbixcbiAgICAgICkgK1xuICAgICAgdGhpcy5lbWl0KCcge1xcbicpICtcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgxKSkgK1xuICAgICAgdGhpcy5tYXBWaXNpdChkZWNscywgJ1xcbicpICtcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgtMSkpICtcbiAgICAgIHRoaXMuZW1pdChgXFxuJHt0aGlzLmluZGVudCgpfX1gKVxuICAgICk7XG4gIH1cblxuICBkZWNsYXJhdGlvbihub2RlOiBEZWNsTm9kZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICBsZXQgeyB2YWx1ZSwgcHJvcGVydHksIHBvc2l0aW9uIH0gPSBub2RlO1xuXG4gICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgIGlmIChhbmltYXRpb25SRS50ZXN0KHByb3BlcnR5KSkge1xuICAgICAgICB2YWx1ZSA9IHByb2Nlc3NBbmltYXRpb24odmFsdWUsIHRoaXMuaWQpO1xuICAgICAgfSBlbHNlIGlmIChhbmltYXRpb25OYW1lUkUudGVzdChwcm9wZXJ0eSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgICAgLm1hcCgodikgPT4gKHYgPT09ICdub25lJyA/IHYgOiBgJHt2LnRyaW0oKX0tJHt0aGlzLmlkfWApKVxuICAgICAgICAgIC5qb2luKCcsJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmVtaXQodGhpcy5pbmRlbnQoKSkgK1xuICAgICAgdGhpcy5lbWl0KGAke3Byb3BlcnR5fTogJHt2YWx1ZX1gLCBwb3NpdGlvbikgK1xuICAgICAgdGhpcy5lbWl0KCc7JylcbiAgICApO1xuICB9XG5cbiAgJ2ZvbnQtZmFjZScobm9kZTogRm9udEZhY2VOb2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdCgnQGZvbnQtZmFjZSAnLCBub2RlLnBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoJ3tcXG4nKSArXG4gICAgICB0aGlzLmVtaXQodGhpcy5pbmRlbnQoMSkpICtcbiAgICAgIHRoaXMubWFwVmlzaXQobm9kZS5kZWNsYXJhdGlvbnMsICdcXG4nKSArXG4gICAgICB0aGlzLmVtaXQodGhpcy5pbmRlbnQoLTEpKSArXG4gICAgICB0aGlzLmVtaXQoJ1xcbn0nKVxuICAgICk7XG4gIH1cblxuICAnY3VzdG9tLW1lZGlhJyhub2RlOiBDdXN0b21NZWRpYU5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0KFxuICAgICAgYEBjdXN0b20tbWVkaWEgJHtub2RlLm5hbWV9ICR7bm9kZS5tZWRpYX07YCxcbiAgICAgIG5vZGUucG9zaXRpb24sXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KG5vZGU6IFN0eWxlc2hlZXROb2RlLCBpZDogc3RyaW5nKSB7XG4gIGNvbnN0IGNvbXBpbGVyID0gbmV3IENvbXBpbGVyKGlkKTtcbiAgcmV0dXJuIGNvbXBpbGVyLmNvbXBpbGUobm9kZSk7XG59XG4iLCAiLy8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy1hbmltYXRpb25zLTEvI3R5cGVkZWYtc2luZ2xlLWFuaW1hdGlvblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9XZWIvQ1NTL2FuaW1hdGlvbiMlRTglQUYlQUQlRTYlQjMlOTVcblxuLy8gdGltZTogcyB8IG1zXG5jb25zdCB0aW1lUmVnID0gL15bLVxcZFxcLl0rKHN8bXMpJC87XG5mdW5jdGlvbiBpc1RpbWUocDogc3RyaW5nKSB7XG4gIHJldHVybiB0aW1lUmVnLnRlc3QocCk7XG59XG5cbi8vIHNpbmdsZS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZSB8IDxudW1iZXI+XG5jb25zdCBudW1iZXJSZWcgPSAvXlstXFxkXFwuXSskLztcbmZ1bmN0aW9uIGlzSXRlcmF0aW9uQ291bnQocDogc3RyaW5nKSB7XG4gIHJldHVybiBwID09PSAnaW5maW5pdGUnIHx8IG51bWJlclJlZy50ZXN0KHApO1xufVxuXG4vLyBzaW5nbGUtYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmcgfCBwYXVzZWRcbmZ1bmN0aW9uIGlzUGxheVN0YXRlKHA6IHN0cmluZykge1xuICByZXR1cm4gcCA9PT0gJ3J1bm5pbmcnIHx8IHAgPT09ICdwYXVzZWQnO1xufVxuXG4vLyB0aW1lLWZ1bmN0aW9uOiBlYXNlIHwgZWFzZS1pbiB8IGVhc2Utb3V0IHwgZWFzZS1pbi1vdXQgfCBsaW5lYXIgfCAgc3RlcC1zdGFydCB8IHN0ZXAtZW5kIHwgY3ViaWMtYmV6aWVyKCkgfCBzdGVwcygpXG5mdW5jdGlvbiBpc1RpbWVGdW5jdGlvbihwOiBzdHJpbmcgfCBQcm9wcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShwKSkgcmV0dXJuIHRydWU7XG4gIHN3aXRjaCAocCkge1xuICAgIGNhc2UgJ2Vhc2UnOlxuICAgIGNhc2UgJ2Vhc2UtaW4nOlxuICAgIGNhc2UgJ2Vhc2Utb3V0JzpcbiAgICBjYXNlICdlYXNlLWluLW91dCc6XG4gICAgY2FzZSAnbGluZWFyJzpcbiAgICBjYXNlICdzdGVwLXN0YXJ0JzpcbiAgICBjYXNlICdzdGVwLWVuZCc6XG4gICAgY2FzZSAnY3ViaWMtYmV6aWVyJzpcbiAgICBjYXNlICdzdGVwcyc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIHNpbmdsZS1hbmltYXRpb24tZGlyZWN0aW9uOiBub3JtYWwgfCByZXZlcnNlIHwgYWx0ZXJuYXRlIHwgYWx0ZXJuYXRlLXJldmVyc2VcbmZ1bmN0aW9uIGlzRGlyZWN0aW9uKHA6IHN0cmluZykge1xuICBzd2l0Y2ggKHApIHtcbiAgICBjYXNlICdub3JtYWwnOlxuICAgIGNhc2UgJ3JldmVyc2UnOlxuICAgIGNhc2UgJ2FsdGVybmF0ZSc6XG4gICAgY2FzZSAnYWx0ZXJuYXRlLXJldmVyc2UnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBzaW5nbGUtYW5pbWF0aW9uLWZpbGwtbW9kZTogbm9uZSB8IGZvcndhcmRzIHwgYmFja3dhcmRzIHwgYm90aFxuZnVuY3Rpb24gaXNGaWxsTW9kZShwOiBzdHJpbmcpIHtcbiAgc3dpdGNoIChwKSB7XG4gICAgY2FzZSAnbm9uZSc6XG4gICAgY2FzZSAnZm9yd2FyZHMnOlxuICAgIGNhc2UgJ2JhY2t3YXJkcyc6XG4gICAgY2FzZSAnYm90aCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0NTUy9jdXN0b20taWRlbnQjJUU4JUFGJUFEJUU2JUIzJTk1XG4vLyBXaXRoIHBhcnNlciwgb25seSBuZWVkIHRvIGZpbHRlciBrZXl3b3JkcyBhbmQgc3BlY2lhbCBzeW1ib2xzIGluIHRva2VuXG5jb25zdCBzeW1ib2xzID0gL1ssJ1wiXFwoXFwpITtdLztcbmZ1bmN0aW9uIGlzTGVnYWxOYW1lKHA6IHN0cmluZykge1xuICBpZiAoc3ltYm9scy50ZXN0KHApKSByZXR1cm4gZmFsc2U7XG4gIHN3aXRjaCAocCkge1xuICAgIGNhc2UgJ3Vuc2V0JzpcbiAgICBjYXNlICdpbml0aWFsJzpcbiAgICBjYXNlICdpbmhlcml0JzpcbiAgICBjYXNlICdub25lJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLy8gbm9uZSB8IGtleWZyYW1lcy1uYW1lOiA8Y3VzdG9tLWlkZW50PiB8IDxzdHJpbmc+XG5mdW5jdGlvbiBpc05hbWUocDogc3RyaW5nKSB7XG4gIGlmIChcbiAgICAhKFxuICAgICAgaXNUaW1lKHApIHx8XG4gICAgICBpc1BsYXlTdGF0ZShwKSB8fFxuICAgICAgaXNJdGVyYXRpb25Db3VudChwKSB8fFxuICAgICAgaXNGaWxsTW9kZShwKSB8fFxuICAgICAgaXNEaXJlY3Rpb24ocCkgfHxcbiAgICAgIGlzVGltZUZ1bmN0aW9uKHApXG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gaXNMZWdhbE5hbWUocCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0b2tlbml6ZXIoaW5wdXQ6IHN0cmluZykge1xuICBsZXQgYnVmID0gJyc7XG4gIGNvbnN0IHRva2VuczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdCBwdXNoID0gKCkgPT4ge1xuICAgIGJ1ZiAmJiB0b2tlbnMucHVzaChidWYpO1xuICAgIGJ1ZiA9ICcnO1xuICB9O1xuXG4gIGZvciAoY29uc3QgY2hhciBvZiBpbnB1dCkge1xuICAgIGlmIChjaGFyID09PSAnLCcgfHwgY2hhciA9PT0gJyknIHx8IGNoYXIgPT09ICc7Jykge1xuICAgICAgcHVzaCgpO1xuICAgICAgYnVmICs9IGNoYXI7XG4gICAgICBwdXNoKCk7XG4gICAgfSBlbHNlIGlmIChjaGFyID09PSAnKCcpIHtcbiAgICAgIHB1c2goKTtcbiAgICAgIGlmICh0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdID09PSAnICcpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA/IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIDogZmFsc2UpICYmICFmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgW0dhcmZpc2ggQ3NzIHNjb3BlXTogSW52YWxpZCBwcm9wZXJ0eSB2YWx1ZTogXCIke2lucHV0fVwiYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJ1ZiArPSBjaGFyO1xuICAgICAgcHVzaCgpO1xuICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJyAnKSB7XG4gICAgICBwdXNoKCk7XG4gICAgICBpZiAodG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSAhPT0gJyAnKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKCcgJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZiArPSBjaGFyO1xuICAgIH1cbiAgfVxuICBwdXNoKCk7XG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHRva2VuczogQXJyYXk8c3RyaW5nPik6IEFycmF5PFByb3BzPiB7XG4gIGxldCBtb2RlID0gMTsgLy8gMSB8IDIgfCAzXG4gIGxldCBzY29wZTogQXJyYXk8YW55PiA9IFtdO1xuICBsZXQgc3Rhc2ggPSBmYWxzZTtcbiAgY29uc3QgcGFyZW50ID0gW107XG4gIHNjb3BlWzBdID0gcGFyZW50O1xuXG4gIGNvbnN0IHVwID0gKCkgPT4ge1xuICAgIHNjb3BlWzBdLnB1c2goc2NvcGUpO1xuICAgIHNjb3BlID0gc2NvcGVbMF07XG4gIH07XG5cbiAgY29uc3QgZG93biA9ICgpID0+IHtcbiAgICBjb25zdCBuczogQXJyYXk8YW55PiA9IFtdO1xuICAgIG5zWzBdID0gc2NvcGU7XG4gICAgc2NvcGUgPSBucztcbiAgfTtcblxuICBjb25zdCBwYXJhbGxlbCA9ICgpID0+IHtcbiAgICBzY29wZVswXS5wdXNoKHNjb3BlKTtcbiAgICBzY29wZSA9IFtdO1xuICAgIHNjb3BlWzBdID0gcGFyZW50O1xuICB9O1xuXG4gIGNvbnN0IHRvVGhyZWVNb2RlID0gKHQ6IHN0cmluZykgPT4ge1xuICAgIG1vZGUgPSAzO1xuICAgIGRvd24oKTtcbiAgICBzY29wZS5wdXNoKHQpO1xuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdCA9IHRva2Vuc1tpXTtcbiAgICBpZiAobW9kZSA9PT0gMSkge1xuICAgICAgaWYgKHQgPT09ICcsJykge1xuICAgICAgICBtb2RlID0gMjtcbiAgICAgICAgc3Rhc2ggPSBmYWxzZTtcbiAgICAgICAgc2NvcGUucHVzaCh0KTtcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJygnKSB7XG4gICAgICAgIHRvVGhyZWVNb2RlKHQpO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnICcpIHtcbiAgICAgICAgc3Rhc2ggPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Rhc2ggJiYgcGFyYWxsZWwoKTtcbiAgICAgICAgc3Rhc2ggPSBmYWxzZTtcbiAgICAgICAgc2NvcGUucHVzaCh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09IDIpIHtcbiAgICAgIGlmICh0ID09PSAnKCcpIHtcbiAgICAgICAgdG9UaHJlZU1vZGUodCk7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICcgJykge1xuICAgICAgICBpZiAodG9rZW5zW2kgLSAxXSAhPT0gJywnKSB7XG4gICAgICAgICAgbW9kZSA9IDE7XG4gICAgICAgICAgc3Rhc2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY29wZS5wdXNoKHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gMykge1xuICAgICAgaWYgKHQgPT09ICcpJykge1xuICAgICAgICBtb2RlID0gMjtcbiAgICAgICAgc2NvcGUucHVzaCh0KTtcbiAgICAgICAgdXAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjb3BlLnB1c2godCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHBhcmFsbGVsKCk7XG4gIHJldHVybiBwYXJlbnQ7XG59XG5cbnR5cGUgUHJvcHMgPSBBcnJheTxzdHJpbmcgfCBQcm9wcz47XG5mdW5jdGlvbiBzdHJpbmdpZnkodHJlZTogQXJyYXk8UHJvcHM+LCBwcmVmaXg6IHN0cmluZykge1xuICBsZXQgb3V0cHV0ID0gJyc7XG4gIGNvbnN0IHNwbGljZSA9IChwKSA9PiAoaXNOYW1lKHApID8gYCR7cH0tJHtwcmVmaXh9YCA6IHApO1xuXG4gIGNvbnN0IGNoaWxkID0gKHBzOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgbGV0IGJ1ZiA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZiArPSBwc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfTtcblxuICB0cmVlLmZvckVhY2goKHBzKSA9PiB7XG4gICAgaWYgKHBzLmxlbmd0aCA9PT0gMikge1xuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICBvdXRwdXQgKz0gKFxuICAgICAgICBBcnJheS5pc0FycmF5KHBzWzFdKVxuICAgICAgICAgID8gY2hpbGQocHNbMV0gYXMgQXJyYXk8c3RyaW5nPilcbiAgICAgICAgICA6IHNwbGljZShwc1sxXSlcbiAgICAgICkgKyAnICc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHBzW2kgKyAxXTtcbiAgICAgICAgY29uc3QgbmV4dElzQXJyYXkgPSBBcnJheS5pc0FycmF5KG5leHQpO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgbGV0IGN1ciA9IEFycmF5LmlzQXJyYXkocHNbaV0pXG4gICAgICAgICAgPyBjaGlsZChwc1tpXSBhcyBBcnJheTxzdHJpbmc+KVxuICAgICAgICAgIDogbmV4dElzQXJyYXlcbiAgICAgICAgICAgID8gcHNbaV1cbiAgICAgICAgICAgIDogc3BsaWNlKHBzW2ldIGFzIHN0cmluZyk7XG5cbiAgICAgICAgaWYgKG5leHQgPT09ICcsJyB8fCBuZXh0ID09PSAnOycpIHtcbiAgICAgICAgICAvLyBObyBhZGQgc3BhY2VzXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dElzQXJyYXkpIHtcbiAgICAgICAgICBjb25zdCBmaWxsVXAgPSBwc1tpICsgMl0gPT09ICcsJyA/ICcnIDogJyAnO1xuICAgICAgICAgIGN1ciArPSBgJHtjaGlsZChuZXh0IGFzIEFycmF5PHN0cmluZz4pfSR7ZmlsbFVwfWA7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1ciArPSAnICc7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0ICs9IGN1cjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0LnRyaW0oKTtcbn1cblxuY29uc3QgY29kZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbmNvbnN0IHRyZWVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxQcm9wcz4+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzQW5pbWF0aW9uKGlucHV0OiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKSB7XG4gIGlmICghaW5wdXQgfHwgIXByZWZpeCkgcmV0dXJuIGlucHV0O1xuICBjb25zdCBldGFnID0gYCR7cHJlZml4fS0ke2lucHV0fWA7XG4gIGlmIChjb2RlQ2FjaGUuaGFzKGV0YWcpKSB7XG4gICAgcmV0dXJuIGNvZGVDYWNoZS5nZXQoZXRhZykhO1xuICB9XG5cbiAgbGV0IHRyZWUgPSB0cmVlQ2FjaGUuZ2V0KGlucHV0KTtcbiAgaWYgKCF0cmVlKSB7XG4gICAgY29uc3QgdG9rZW5zID0gdG9rZW5pemVyKGlucHV0KTtcbiAgICAvLyBJZiB0aGUgc3ludGF4IGlzIGluY29ycmVjdCwganVzdCByZXR1cm4gdG8gdGhlIG9yaWdpbmFsIHRleHRcbiAgICBpZiAodG9rZW5zID09PSBmYWxzZSkgcmV0dXJuIGlucHV0O1xuICAgIHRyZWUgPSBwYXJzZSh0b2tlbnMpO1xuICAgIHRyZWVDYWNoZS5zZXQoaW5wdXQsIHRyZWUpO1xuICB9XG5cbiAgY29uc3QgbmV3Q29kZSA9IHN0cmluZ2lmeSh0cmVlLCBwcmVmaXgpO1xuICBjb2RlQ2FjaGUuc2V0KGV0YWcsIG5ld0NvZGUpO1xuICByZXR1cm4gbmV3Q29kZTtcbn1cbiIsICJpbXBvcnQgeyBtZDUgfSBmcm9tICdzdXBlci1mYXN0LW1kNSc7XG5pbXBvcnQgdHlwZSB7IGludGVyZmFjZXMgfSBmcm9tICdAZ2FyZmlzaC9jb3JlJztcbmltcG9ydCB0eXBlIHsgTG9hZGVyLCBTdHlsZU1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHtcbiAgd2FybixcbiAgZmluZFRhcmdldCxcbiAgc3VwcG9ydFdhc20sXG4gIGlkbGVDYWxsYmFjayxcbiAgX19Nb2NrQm9keV9fLFxufSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vY3NzUGFyc2VyJztcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gJy4vY3NzU3RyaW5naWZ5JztcbmltcG9ydCB0eXBlIHsgU3R5bGVzaGVldE5vZGUgfSBmcm9tICcuL2dsb2JhbFR5cGVzJztcblxuZXhwb3J0IHsgcGFyc2UgfSBmcm9tICcuL2Nzc1BhcnNlcic7XG5leHBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICcuL2Nzc1N0cmluZ2lmeSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3NzU2NvcGVPcHRpb25zIHtcbiAgZml4Qm9keUdldHRlcj86IGJvb2xlYW47XG4gIGV4Y2x1ZGVzPzogQXJyYXk8c3RyaW5nPiB8ICgobmFtZTogc3RyaW5nKSA9PiBib29sZWFuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdhcmZpc2hDc3NTY29wZShvcHRpb25zOiBDc3NTY29wZU9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBwbHVnaW5OYW1lID0gJ2Nzcy1zY29wZSc7XG4gIGNvbnN0IHByb3RvQ2FjaGUgPSBuZXcgU2V0PFN0eWxlTWFuYWdlcj4oKTtcbiAgY29uc3QgYXN0Q2FjaGUgPSBuZXcgTWFwPHN0cmluZywgU3R5bGVzaGVldE5vZGU+KCk7XG5cbiAgY29uc3QgZGlzYWJsZSA9IChhcHBOYW1lPzogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgeyBleGNsdWRlcyB9ID0gb3B0aW9ucztcbiAgICBpZiAoIWFwcE5hbWUpIHJldHVybiB0cnVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV4Y2x1ZGVzKSkgcmV0dXJuIGV4Y2x1ZGVzLmluY2x1ZGVzKGFwcE5hbWUpO1xuICAgIGlmICh0eXBlb2YgZXhjbHVkZXMgPT09ICdmdW5jdGlvbicpIHJldHVybiBleGNsdWRlcyhhcHBOYW1lKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcHJvY2Vzc1ByZWxvYWRNYW5hZ2VyID0gKGxvYWRlcjogTG9hZGVyKSA9PiB7XG4gICAgbG9hZGVyLmhvb2tzLnVzZVBsdWdpbih7XG4gICAgICBuYW1lOiBwbHVnaW5OYW1lLFxuXG4gICAgICBsb2FkZWQoeyB2YWx1ZSwgcmVzdWx0IH0pIHtcbiAgICAgICAgaWYgKHZhbHVlLmZpbGVUeXBlID09PSAnY3NzJyAmJiAhZGlzYWJsZSh2YWx1ZS5zY29wZSkpIHtcbiAgICAgICAgICBjb25zdCB7IHN0eWxlQ29kZSB9ID0gdmFsdWUucmVzb3VyY2VNYW5hZ2VyIGFzIFN0eWxlTWFuYWdlcjtcbiAgICAgICAgICBpZGxlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFzaCA9IG1kNShzdHlsZUNvZGUpO1xuICAgICAgICAgICAgaWYgKCFhc3RDYWNoZS5oYXMoaGFzaCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgYXN0Tm9kZSA9IHBhcnNlKHN0eWxlQ29kZSwgeyBzb3VyY2U6IHZhbHVlLnVybCB9KTtcbiAgICAgICAgICAgICAgYXN0Q2FjaGUuc2V0KGhhc2gsIGFzdE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHZhbHVlLCByZXN1bHQgfTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgY29uc3QgY29tcGlsZWRDYWNoZSA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHBsdWdpbk5hbWUsXG4gICAgICB2ZXJzaW9uOiAnMS4xMi4wJyxcblxuICAgICAgYmVmb3JlQm9vdHN0cmFwKCkge1xuICAgICAgICBpZiAoIXN1cHBvcnRXYXNtKSByZXR1cm47XG4gICAgICAgIC8vIFdoZW4gcHJlbG9hZGluZywgcGFyc2Ugb3V0IGFzdCBpbiBhZHZhbmNlXG4gICAgICAgIHByb2Nlc3NQcmVsb2FkTWFuYWdlcihHYXJmaXNoLmxvYWRlcik7XG5cbiAgICAgICAgLy8gcmV3cml0ZSB0cmFuc2Zvcm0gbWV0aG9kXG4gICAgICAgIGNvbnN0IHByb3RvID0gR2FyZmlzaC5sb2FkZXIuU3R5bGVNYW5hZ2VyLnByb3RvdHlwZTtcbiAgICAgICAgY29uc3Qgb3JpZ2luVHJhbnNmb3JtID0gcHJvdG8udHJhbnNmb3JtQ29kZTtcbiAgICAgICAgaWYgKHByb3RvQ2FjaGUuaGFzKHByb3RvKSkgcmV0dXJuO1xuICAgICAgICBwcm90b0NhY2hlLmFkZChwcm90byk7XG5cbiAgICAgICAgcHJvdG8udHJhbnNmb3JtQ29kZSA9IGZ1bmN0aW9uIChjb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgICBjb25zdCB7IGFwcE5hbWUsIHJvb3RFbElkIH0gPSB0aGlzLnNjb3BlRGF0YSB8fCB7fTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhY29kZSB8fFxuICAgICAgICAgICAgIXJvb3RFbElkIHx8XG4gICAgICAgICAgICBkaXNhYmxlKGFwcE5hbWUpIHx8XG4gICAgICAgICAgICBjb21waWxlZENhY2hlLmhhcyhjb2RlKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWdpblRyYW5zZm9ybS5jYWxsKHRoaXMsIGNvZGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGhhc2ggPSBtZDUoY29kZSk7XG4gICAgICAgICAgbGV0IGFzdE5vZGUgPSBhc3RDYWNoZS5nZXQoaGFzaCk7XG4gICAgICAgICAgaWYgKCFhc3ROb2RlKSB7XG4gICAgICAgICAgICBhc3ROb2RlID0gcGFyc2UoY29kZSwgeyBzb3VyY2U6IHRoaXMudXJsIH0pO1xuICAgICAgICAgICAgYXN0Q2FjaGUuc2V0KGhhc2gsIGFzdE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBUaGUgYHJvb3RFbElkYCBpcyByYW5kb20sIGl0IG1ha2VzIG5vIHNlbnNlIHRvIGNhY2hlIHRoZSBjb21waWxlZCBjb2RlXG4gICAgICAgICAgY29uc3QgbmV3Q29kZSA9IHN0cmluZ2lmeShhc3ROb2RlLCByb290RWxJZCk7XG4gICAgICAgICAgY29tcGlsZWRDYWNoZS5hZGQobmV3Q29kZSk7XG4gICAgICAgICAgcmV0dXJuIG9yaWdpblRyYW5zZm9ybS5jYWxsKHRoaXMsIG5ld0NvZGUpO1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgYmVmb3JlTG9hZChhcHBJbmZvKSB7XG4gICAgICAgIGlmICghc3VwcG9ydFdhc20pIHtcbiAgICAgICAgICB3YXJuKCdcImNzcy1zY29wZVwiIHBsdWdpbiByZXF1aXJlcyB3ZWJBc3NlbWJseSBzdXBwb3J0Jyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgc2FuZGJveCB9ID0gYXBwSW5mbztcbiAgICAgICAgaWYgKCFkaXNhYmxlKG5hbWUpKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc2FuZGJveCAmJlxuICAgICAgICAgICAgKHNhbmRib3ggPT09IGZhbHNlIHx8IHNhbmRib3gub3BlbiA9PT0gZmFsc2UgfHwgc2FuZGJveC5zbmFwc2hvdClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgIGBDaGlsZCBhcHAgXCIke25hbWV9XCIgZG9lcyBub3Qgb3BlbiB0aGUgdm0gc2FuZGJveCwgYCArXG4gICAgICAgICAgICAgICAgJ2Nhbm5vdCB1c2UgXCJjc3Mtc2NvcGVcIiBwbHVnaW4nLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGFmdGVyTG9hZChhcHBJbmZvLCBhcHApIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAob3B0aW9ucy5maXhCb2R5R2V0dGVyICYmICFkaXNhYmxlKGFwcEluZm8ubmFtZSkgJiYgYXBwPy52bVNhbmRib3gpIHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgYXBwLnZtU2FuZGJveC5ob29rcy51c2VQbHVnaW4oe1xuICAgICAgICAgICAgbmFtZTogcGx1Z2luTmFtZSxcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuICAgICAgICAgICAgZG9jdW1lbnRHZXR0ZXIoZGF0YSkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5wcm9wTmFtZSA9PT0gJ2JvZHknICYmIGRhdGEucm9vdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmN1c3RvbVZhbHVlID0gZmluZFRhcmdldChkYXRhLnJvb3ROb2RlLCBbXG4gICAgICAgICAgICAgICAgICAnYm9keScsXG4gICAgICAgICAgICAgICAgICBgZGl2WyR7X19Nb2NrQm9keV9ffV1gLFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNHQSxtQkFBb0M7QUFvQnBDLElBQU0sWUFBWTtBQWFYLGVBQWUsS0FBYSxVQUE0QixJQUFJO0FBQ2pFLE1BQUksT0FBTztBQUNYLE1BQUksU0FBUztBQUdiLDBCQUF3QixLQUFhO0FBQ25DLFVBQU0sUUFB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
