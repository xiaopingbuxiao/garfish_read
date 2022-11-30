// src/cssParser.ts
import { error as throwError } from "@garfish/utils";
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
      throwError(err);
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
import { __MockHtml__, __MockHead__, __MockBody__ } from "@garfish/utils";

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
      s = s === "html" || s === ":root" ? `[${__MockHtml__}]` : s === "body" ? `[${__MockBody__}]` : s === "head" ? `[${__MockHead__}]` : s;
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
import { md5 } from "super-fast-md5";
import {
  warn,
  findTarget,
  supportWasm,
  idleCallback,
  __MockBody__ as __MockBody__2
} from "@garfish/utils";
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
          idleCallback(() => {
            const hash = md5(styleCode);
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
        if (!supportWasm)
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
          const hash = md5(code);
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
        if (!supportWasm) {
          warn('"css-scope" plugin requires webAssembly support');
          return;
        }
        const { name, sandbox } = appInfo;
        if (!disable(name)) {
          if (sandbox && (sandbox === false || sandbox.open === false || sandbox.snapshot)) {
            warn(`Child app "${name}" does not open the vm sandbox, cannot use "css-scope" plugin`);
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
                data.customValue = findTarget(data.rootNode, [
                  "body",
                  `div[${__MockBody__2}]`
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
export {
  GarfishCssScope,
  parse,
  stringify2 as stringify
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2Nzc1BhcnNlci50cyIsICIuLi8uLi9zcmMvY3NzU3RyaW5naWZ5LnRzIiwgIi4uLy4uL3NyYy9hbmltYXRpb25QYXJzZXIudHMiLCAiLi4vLi4vc3JjL3BsdWdpbmlmeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogZXNsaW50LWRpc2FibGUgcXVvdGVzICovXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9ncmFtbWFyLmh0bWxcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9jc3MtcGFyc2UvcHVsbC80OSNpc3N1ZWNvbW1lbnQtMzAwODgwMjdcbmltcG9ydCB7IGVycm9yIGFzIHRocm93RXJyb3IgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQge1xuICBOb2RlLFxuICBSdWxlTm9kZSxcbiAgSG9zdE5vZGUsXG4gIFBhZ2VOb2RlLFxuICBEZWNsTm9kZSxcbiAgTWVkaWFOb2RlLFxuICBJbXBvcnROb2RlLFxuICBDaGFyc2V0Tm9kZSxcbiAgQ29tbWVudE5vZGUsXG4gIERvY3VtZW50Tm9kZSxcbiAgRm9udEZhY2VOb2RlLFxuICBLZXlmcmFtZU5vZGUsXG4gIE5hbWVzcGFjZU5vZGUsXG4gIEtleWZyYW1lc05vZGUsXG4gIFN0eWxlc2hlZXROb2RlLFxuICBDdXN0b21NZWRpYU5vZGUsXG59IGZyb20gJy4vZ2xvYmFsVHlwZXMnO1xuXG5jb25zdCBjb21tZW50cmUgPSAvXFwvXFwqW14qXSpcXCorKFteLypdW14qXSpcXCorKSpcXC8vZztcblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgbGluZTogbnVtYmVyO1xuICBjb2x1bW46IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDc3NQYXJzZXJPcHRpb25zIHtcbiAgc2lsZW50PzogYm9vbGVhbjtcbiAgc291cmNlPzogc3RyaW5nIHwgbnVsbDtcbn1cblxuLy8gMU0gdGV4dCB0YWtlcyBhYm91dCAxNTBtc1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKGNzczogc3RyaW5nLCBvcHRpb25zOiBDc3NQYXJzZXJPcHRpb25zID0ge30pIHtcbiAgbGV0IGxpbmUgPSAxO1xuICBsZXQgY29sdW1uID0gMTtcblxuICAvLyBVcGRhdGUgbGluZW5vIGFuZCBjb2x1bW4gYmFzZWQgb24gYHN0cmAuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKHN0cjogc3RyaW5nKSB7XG4gICAgY29uc3QgbGluZXMgPSBzdHIubWF0Y2goL1xcbi9nKTtcbiAgICBpZiAobGluZXMpIGxpbmUgKz0gbGluZXMubGVuZ3RoO1xuICAgIGNvbnN0IGkgPSBzdHIubGFzdEluZGV4T2YoJ1xcbicpO1xuICAgIGNvbHVtbiA9IGkgPiAtMSA/IHN0ci5sZW5ndGggLSBpIDogY29sdW1uICsgc3RyLmxlbmd0aDtcbiAgfVxuXG4gIC8vIFN0b3JlIHBvc2l0aW9uIGluZm9ybWF0aW9uIGZvciBhIG5vZGVcbiAgY2xhc3MgUG9zaXRpb24ge1xuICAgIHB1YmxpYyBzdGFydDogUG9pbnQ7XG4gICAgcHVibGljIGNvbnRlbnQgPSBjc3M7XG4gICAgcHVibGljIGVuZCA9IHsgbGluZSwgY29sdW1uIH07XG4gICAgcHVibGljIHNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IFBvaW50KSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgfVxuICB9XG5cbiAgLy8gTWFyayBwb3NpdGlvbiBhbmQgcGF0Y2ggYG5vZGUucG9zaXRpb25gLlxuICBmdW5jdGlvbiBwb3NpdGlvbigpIHtcbiAgICBjb25zdCBzdGFydDogUG9pbnQgPSB7IGxpbmUsIGNvbHVtbiB9O1xuICAgIHJldHVybiBmdW5jdGlvbiA8VCBleHRlbmRzIFBhcnRpYWw8Tm9kZT4+KG5vZGU6IFQpIHtcbiAgICAgIG5vZGUucG9zaXRpb24gPSBuZXcgUG9zaXRpb24oc3RhcnQpO1xuICAgICAgd2hpdGVzcGFjZSgpO1xuICAgICAgcmV0dXJuIG5vZGUgYXMgVDtcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZXJyb3JzTGlzdDogQXJyYXk8RXJyb3I+ID0gW107XG4gIGZ1bmN0aW9uIGVycm9yKG1zZzogc3RyaW5nKSB7XG4gICAgY29uc3Qgc291cmNlID0gb3B0aW9ucy5zb3VyY2UgPyBvcHRpb25zLnNvdXJjZSArICc6JyA6ICcnO1xuICAgIGNvbnN0IGVycjogYW55ID0gbmV3IEVycm9yKHNvdXJjZSArIGxpbmUgKyAnOicgKyBjb2x1bW4gKyAnOiAnICsgbXNnKTtcblxuICAgIGVyci5saW5lID0gbGluZTtcbiAgICBlcnIuY29sdW1uID0gY29sdW1uO1xuICAgIGVyci5yZWFzb24gPSBtc2c7XG4gICAgZXJyLnNvdXJjZSA9IGNzcztcbiAgICBlcnIuZmlsZW5hbWUgPSBvcHRpb25zLnNvdXJjZTtcblxuICAgIGlmIChvcHRpb25zLnNpbGVudCkge1xuICAgICAgZXJyb3JzTGlzdC5wdXNoKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICAvLyBQYXJzZSBzdHlsZXNoZWV0LlxuICBmdW5jdGlvbiBzdHlsZXNoZWV0KCkge1xuICAgIGNvbnN0IHJ1bGVzTGlzdCA9IHJ1bGVzKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdzdHlsZXNoZWV0JyxcbiAgICAgIHN0eWxlc2hlZXQ6IHtcbiAgICAgICAgcnVsZXM6IHJ1bGVzTGlzdCxcbiAgICAgICAgc291cmNlOiBvcHRpb25zLnNvdXJjZSxcbiAgICAgICAgcGFyc2luZ0Vycm9yczogZXJyb3JzTGlzdCxcbiAgICAgIH0sXG4gICAgfSBhcyB1bmtub3duIGFzIFN0eWxlc2hlZXROb2RlO1xuICB9XG5cbiAgLy8gT3BlbmluZyBicmFjZS5cbiAgZnVuY3Rpb24gb3BlbigpIHtcbiAgICByZXR1cm4gbWF0Y2goL157XFxzKi8pO1xuICB9XG5cbiAgLy8gQ2xvc2luZyBicmFjZS5cbiAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgcmV0dXJuIG1hdGNoKC9efS8pO1xuICB9XG5cbiAgLy8gUGFyc2Ugd2hpdGVzcGFjZS5cbiAgZnVuY3Rpb24gd2hpdGVzcGFjZSgpIHtcbiAgICBtYXRjaCgvXlxccyovKTtcbiAgfVxuXG4gIC8vIFBhcnNlIHJ1bGVzZXQuXG4gIGZ1bmN0aW9uIHJ1bGVzKCkge1xuICAgIGxldCBub2RlO1xuICAgIGNvbnN0IHJ1bGVzOiBBcnJheTxSdWxlTm9kZT4gPSBbXTtcbiAgICB3aGl0ZXNwYWNlKCk7XG4gICAgY29tbWVudHMocnVsZXMpO1xuICAgIHdoaWxlIChjc3MubGVuZ3RoICYmIGNzcy5jaGFyQXQoMCkgIT09ICd9JyAmJiAobm9kZSA9IGF0cnVsZSgpIHx8IHJ1bGUoKSkpIHtcbiAgICAgIGlmIChub2RlICE9PSBmYWxzZSkge1xuICAgICAgICBydWxlcy5wdXNoKG5vZGUpO1xuICAgICAgICBjb21tZW50cyhydWxlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydWxlcztcbiAgfVxuXG4gIC8vIE1hdGNoIGByZWAgYW5kIHJldHVybiBjYXB0dXJlcy5cbiAgZnVuY3Rpb24gbWF0Y2gocmU6IFJlZ0V4cCkge1xuICAgIGNvbnN0IG0gPSByZS5leGVjKGNzcyk7XG4gICAgaWYgKG0pIHtcbiAgICAgIGNvbnN0IHN0ciA9IG1bMF07XG4gICAgICB1cGRhdGVQb3NpdGlvbihzdHIpO1xuICAgICAgY3NzID0gY3NzLnNsaWNlKHN0ci5sZW5ndGgpO1xuICAgICAgcmV0dXJuIG07XG4gICAgfVxuICB9XG5cbiAgLy8gUGFyc2UgY29tbWVudHM7XG4gIGZ1bmN0aW9uIGNvbW1lbnRzPFQgZXh0ZW5kcyBBcnJheTxhbnk+PihydWxlcz86IFQpIHtcbiAgICBsZXQgYztcbiAgICBydWxlcyA9IHJ1bGVzIHx8IChbXSBhcyBhbnkpO1xuICAgIHdoaWxlICgoYyA9IGNvbW1lbnQoKSkpIHtcbiAgICAgIGlmIChjICE9PSBmYWxzZSkge1xuICAgICAgICBydWxlcyEucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ1bGVzIGFzIFQ7XG4gIH1cblxuICAvLyBQYXJzZSBjb21tZW50LlxuICBmdW5jdGlvbiBjb21tZW50KCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgaWYgKCcvJyAhPT0gY3NzLmNoYXJBdCgwKSB8fCAnKicgIT09IGNzcy5jaGFyQXQoMSkpIHJldHVybjtcblxuICAgIGxldCBpID0gMjtcbiAgICB3aGlsZSAoXG4gICAgICAnJyAhPT0gY3NzLmNoYXJBdChpKSAmJlxuICAgICAgKCcqJyAhPT0gY3NzLmNoYXJBdChpKSB8fCAnLycgIT09IGNzcy5jaGFyQXQoaSArIDEpKVxuICAgICkge1xuICAgICAgKytpO1xuICAgIH1cblxuICAgIGkgKz0gMjtcblxuICAgIGlmICgnJyA9PT0gY3NzLmNoYXJBdChpIC0gMSkpIHtcbiAgICAgIHJldHVybiBlcnJvcignRW5kIG9mIGNvbW1lbnQgbWlzc2luZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0ciA9IGNzcy5zbGljZSgyLCBpIC0gMik7XG4gICAgY29sdW1uICs9IDI7XG4gICAgdXBkYXRlUG9zaXRpb24oc3RyKTtcbiAgICBjc3MgPSBjc3Muc2xpY2UoaSk7XG4gICAgY29sdW1uICs9IDI7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdjb21tZW50JyxcbiAgICAgIGNvbW1lbnQ6IHN0cixcbiAgICB9KSBhcyBDb21tZW50Tm9kZTtcbiAgfVxuXG4gIC8vIFBhcnNlIHNlbGVjdG9yLlxuICBmdW5jdGlvbiBzZWxlY3RvcigpIHtcbiAgICBjb25zdCBtID0gbWF0Y2goL14oW157XSspLyk7XG4gICAgaWYgKG0pIHtcbiAgICAgIC8vIEBmaXggUmVtb3ZlIGFsbCBjb21tZW50cyBmcm9tIHNlbGVjdG9yc1xuICAgICAgLy8gaHR0cDovL29zdGVybWlsbGVyLm9yZy9maW5kY29tbWVudC5odG1sXG4gICAgICByZXR1cm4gdHJpbShtWzBdKVxuICAgICAgICAucmVwbGFjZSgvXFwvXFwqKFteKl18W1xcclxcbl18KFxcKisoW14qL118W1xcclxcbl0pKSkqXFwqXFwvKy9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1wiKD86XFxcXFwifFteXCJdKSpcInwnKD86XFxcXCd8W14nXSkqJy9nLCAobSkgPT4ge1xuICAgICAgICAgIHJldHVybiBtLnJlcGxhY2UoLywvZywgJ1xcdTIwMEMnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnNwbGl0KC9cXHMqKD8hW14oXSpcXCkpLFxccyovKVxuICAgICAgICAubWFwKChzKSA9PiBzLnJlcGxhY2UoL1xcdTIwMEMvZywgJywnKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUGFyc2UgZGVjbGFyYXRpb24uXG4gIGZ1bmN0aW9uIGRlY2xhcmF0aW9uKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgLy8gcHJvcFxuICAgIGxldCBwcm9wID0gbWF0Y2goL14oXFwqP1stI1xcL1xcKlxcXFxcXHddKyhcXFtbMC05YS16Xy1dK1xcXSk/KVxccyovKTtcbiAgICBpZiAoIXByb3ApIHJldHVybjtcbiAgICAocHJvcCBhcyBhbnkpID0gdHJpbShwcm9wWzBdKTtcbiAgICAvLyA6XG4gICAgaWYgKCFtYXRjaCgvXjpcXHMqLykpIHJldHVybiBlcnJvcihcInByb3BlcnR5IG1pc3NpbmcgJzonXCIpO1xuICAgIC8vIHZhbFxuICAgIGNvbnN0IHZhbCA9IG1hdGNoKC9eKCg/OicoPzpcXFxcJ3wuKSo/J3xcIig/OlxcXFxcInwuKSo/XCJ8XFwoW15cXCldKj9cXCl8W159O10pKykvKTtcblxuICAgIGNvbnN0IHJldCA9IHBvcyh7XG4gICAgICB0eXBlOiAnZGVjbGFyYXRpb24nLFxuICAgICAgcHJvcGVydHk6IChwcm9wIGFzIGFueSkucmVwbGFjZShjb21tZW50cmUsICcnKSxcbiAgICAgIHZhbHVlOiB2YWwgPyB0cmltKHZhbFswXSkucmVwbGFjZShjb21tZW50cmUsICcnKSA6ICcnLFxuICAgIH0pO1xuXG4gICAgLy8gO1xuICAgIG1hdGNoKC9eWztcXHNdKi8pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQYXJzZSBkZWNsYXJhdGlvbnMuXG4gIGZ1bmN0aW9uIGRlY2xhcmF0aW9ucygpIHtcbiAgICBjb25zdCBkZWNsczogQXJyYXk8RGVjbE5vZGU+ID0gW107XG4gICAgaWYgKCFvcGVuKCkpIHJldHVybiBlcnJvcihcIm1pc3NpbmcgJ3snXCIpO1xuICAgIGNvbW1lbnRzKGRlY2xzKTtcblxuICAgIC8vIGRlY2xhcmF0aW9uc1xuICAgIGxldCBkZWNsO1xuICAgIHdoaWxlICgoZGVjbCA9IGRlY2xhcmF0aW9uKCkpKSB7XG4gICAgICBpZiAoZGVjbCAhPT0gZmFsc2UpIHtcbiAgICAgICAgZGVjbHMucHVzaChkZWNsKTtcbiAgICAgICAgY29tbWVudHMoZGVjbHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNsb3NlKCkpIHJldHVybiBlcnJvcihcIm1pc3NpbmcgJ30nXCIpO1xuICAgIHJldHVybiBkZWNscztcbiAgfVxuXG4gIC8vIFBhcnNlIGtleWZyYW1lLlxuICBmdW5jdGlvbiBrZXlmcmFtZSgpIHtcbiAgICBsZXQgbTogYW55O1xuICAgIGNvbnN0IHZhbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuXG4gICAgd2hpbGUgKChtID0gbWF0Y2goL14oKFxcZCtcXC5cXGQrfFxcLlxcZCt8XFxkKyklP3xbYS16XSspXFxzKi8pKSkge1xuICAgICAgdmFscy5wdXNoKG1bMV0pO1xuICAgICAgbWF0Y2goL14sXFxzKi8pO1xuICAgIH1cblxuICAgIGlmICghdmFscy5sZW5ndGgpIHJldHVybjtcbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdrZXlmcmFtZScsXG4gICAgICB2YWx1ZXM6IHZhbHMsXG4gICAgICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucygpIHx8IFtdLFxuICAgIH0pIGFzIHVua25vd24gYXMgS2V5ZnJhbWVOb2RlO1xuICB9XG5cbiAgLy8gUGFyc2Uga2V5ZnJhbWVzLlxuICBmdW5jdGlvbiBhdGtleWZyYW1lcygpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIGxldCBtID0gbWF0Y2goL15AKFstXFx3XSspP2tleWZyYW1lc1xccyovKTtcbiAgICBpZiAoIW0pIHJldHVybjtcbiAgICBjb25zdCB2ZW5kb3IgPSBtWzFdO1xuXG4gICAgLy8gaWRlbnRpZmllclxuICAgIG0gPSBtYXRjaCgvXihbLVxcd10rKVxccyovKTtcbiAgICBpZiAoIW0pIHJldHVybiBlcnJvcignQGtleWZyYW1lcyBtaXNzaW5nIG5hbWUnKTtcbiAgICBjb25zdCBuYW1lID0gbVsxXTtcblxuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJAa2V5ZnJhbWVzIG1pc3NpbmcgJ3snXCIpO1xuICAgIGxldCBmcmFtZTtcbiAgICBsZXQgZnJhbWVzID0gY29tbWVudHMoKTtcbiAgICB3aGlsZSAoKGZyYW1lID0ga2V5ZnJhbWUoKSkpIHtcbiAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICAgIGZyYW1lcyA9IGZyYW1lcy5jb25jYXQoY29tbWVudHMoKSk7XG4gICAgfVxuICAgIGlmICghY2xvc2UoKSkgcmV0dXJuIGVycm9yKFwiQGtleWZyYW1lcyBtaXNzaW5nICd9J1wiKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ2tleWZyYW1lcycsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdmVuZG9yOiB2ZW5kb3IsXG4gICAgICBrZXlmcmFtZXM6IGZyYW1lcyxcbiAgICB9KSBhcyBLZXlmcmFtZXNOb2RlO1xuICB9XG5cbiAgLy8gUGFyc2Ugc3VwcG9ydHMuXG4gIGZ1bmN0aW9uIGF0c3VwcG9ydHMoKSB7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcbiAgICBjb25zdCBtID0gbWF0Y2goL15Ac3VwcG9ydHMgKihbXntdKykvKTtcblxuICAgIGlmICghbSkgcmV0dXJuO1xuICAgIGNvbnN0IHN1cHBvcnRzID0gdHJpbShtWzFdKTtcblxuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJAc3VwcG9ydHMgbWlzc2luZyAneydcIik7XG4gICAgY29uc3Qgc3R5bGUgPSBjb21tZW50cygpLmNvbmNhdChydWxlcygpKTtcbiAgICBpZiAoIWNsb3NlKCkpIHJldHVybiBlcnJvcihcIkBzdXBwb3J0cyBtaXNzaW5nICd9J1wiKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ3N1cHBvcnRzJyxcbiAgICAgIHN1cHBvcnRzOiBzdXBwb3J0cyxcbiAgICAgIHJ1bGVzOiBzdHlsZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFBhcnNlIGhvc3QuXG4gIGZ1bmN0aW9uIGF0aG9zdCgpIHtcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbigpO1xuICAgIGNvbnN0IG0gPSBtYXRjaCgvXkBob3N0XFxzKi8pO1xuICAgIGlmICghbSkgcmV0dXJuO1xuXG4gICAgaWYgKCFvcGVuKCkpIHJldHVybiBlcnJvcihcIkBob3N0IG1pc3NpbmcgJ3snXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gY29tbWVudHMoKS5jb25jYXQocnVsZXMoKSk7XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJAaG9zdCBtaXNzaW5nICd9J1wiKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ2hvc3QnLFxuICAgICAgcnVsZXM6IHN0eWxlLFxuICAgIH0pIGFzIEhvc3ROb2RlO1xuICB9XG5cbiAgLy8gUGFyc2UgbWVkaWEuXG4gIGZ1bmN0aW9uIGF0bWVkaWEoKSB7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcbiAgICBjb25zdCBtID0gbWF0Y2goL15AbWVkaWEgKihbXntdKykvKTtcblxuICAgIGlmICghbSkgcmV0dXJuO1xuICAgIGNvbnN0IG1lZGlhID0gdHJpbShtWzFdKTtcblxuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJAbWVkaWEgbWlzc2luZyAneydcIik7XG4gICAgY29uc3Qgc3R5bGUgPSBjb21tZW50cygpLmNvbmNhdChydWxlcygpKTtcbiAgICBpZiAoIWNsb3NlKCkpIHJldHVybiBlcnJvcihcIkBtZWRpYSBtaXNzaW5nICd9J1wiKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ21lZGlhJyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHJ1bGVzOiBzdHlsZSxcbiAgICB9KSBhcyBNZWRpYU5vZGU7XG4gIH1cblxuICAvLyBQYXJzZSBjdXN0b20tbWVkaWEuXG4gIGZ1bmN0aW9uIGF0Y3VzdG9tbWVkaWEoKSB7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcbiAgICBjb25zdCBtID0gbWF0Y2goL15AY3VzdG9tLW1lZGlhXFxzKygtLVteXFxzXSspXFxzKihbXns7XSspOy8pO1xuICAgIGlmICghbSkgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHBvcyh7XG4gICAgICB0eXBlOiAnY3VzdG9tLW1lZGlhJyxcbiAgICAgIG5hbWU6IHRyaW0obVsxXSksXG4gICAgICBtZWRpYTogdHJpbShtWzJdKSxcbiAgICB9KSBhcyBDdXN0b21NZWRpYU5vZGU7XG4gIH1cblxuICAvLyBQYXJzZSBwYWdlZCBtZWRpYS5cbiAgZnVuY3Rpb24gYXRwYWdlKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eQHBhZ2UgKi8pO1xuICAgIGlmICghbSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2VsID0gc2VsZWN0b3IoKSB8fCBbXTtcblxuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJAcGFnZSBtaXNzaW5nICd7J1wiKTtcbiAgICAvLyBkZWNsYXJhdGlvbnNcbiAgICBsZXQgZGVjbDtcbiAgICBsZXQgZGVjbHMgPSBjb21tZW50cygpO1xuXG4gICAgd2hpbGUgKChkZWNsID0gZGVjbGFyYXRpb24oKSkpIHtcbiAgICAgIGRlY2xzLnB1c2goZGVjbCk7XG4gICAgICBkZWNscyA9IGRlY2xzLmNvbmNhdChjb21tZW50cygpKTtcbiAgICB9XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJAcGFnZSBtaXNzaW5nICd9J1wiKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ3BhZ2UnLFxuICAgICAgc2VsZWN0b3JzOiBzZWwsXG4gICAgICBkZWNsYXJhdGlvbnM6IGRlY2xzLFxuICAgIH0pIGFzIFBhZ2VOb2RlO1xuICB9XG5cbiAgLy8gUGFyc2UgZG9jdW1lbnQuXG4gIGZ1bmN0aW9uIGF0ZG9jdW1lbnQoKSB7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24oKTtcbiAgICBjb25zdCBtID0gbWF0Y2goL15AKFstXFx3XSspP2RvY3VtZW50ICooW157XSspLyk7XG4gICAgaWYgKCFtKSByZXR1cm47XG5cbiAgICBjb25zdCB2ZW5kb3IgPSB0cmltKG1bMV0pO1xuICAgIGNvbnN0IGRvYyA9IHRyaW0obVsyXSk7XG5cbiAgICBpZiAoIW9wZW4oKSkgcmV0dXJuIGVycm9yKFwiQGRvY3VtZW50IG1pc3NpbmcgJ3snXCIpO1xuICAgIGNvbnN0IHN0eWxlID0gY29tbWVudHMoKS5jb25jYXQocnVsZXMoKSk7XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJAZG9jdW1lbnQgbWlzc2luZyAnfSdcIik7XG5cbiAgICByZXR1cm4gcG9zKHtcbiAgICAgIHR5cGU6ICdkb2N1bWVudCcsXG4gICAgICBkb2N1bWVudDogZG9jLFxuICAgICAgdmVuZG9yOiB2ZW5kb3IsXG4gICAgICBydWxlczogc3R5bGUsXG4gICAgfSkgYXMgRG9jdW1lbnROb2RlO1xuICB9XG5cbiAgLy8gUGFyc2UgZm9udC1mYWNlLlxuICBmdW5jdGlvbiBhdGZvbnRmYWNlKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9eQGZvbnQtZmFjZVxccyovKTtcbiAgICBpZiAoIW0pIHJldHVybjtcblxuICAgIGlmICghb3BlbigpKSByZXR1cm4gZXJyb3IoXCJAZm9udC1mYWNlIG1pc3NpbmcgJ3snXCIpO1xuICAgIC8vIGRlY2xhcmF0aW9uc1xuICAgIGxldCBkZWNsO1xuICAgIGxldCBkZWNscyA9IGNvbW1lbnRzKCk7XG4gICAgd2hpbGUgKChkZWNsID0gZGVjbGFyYXRpb24oKSkpIHtcbiAgICAgIGRlY2xzLnB1c2goZGVjbCk7XG4gICAgICBkZWNscyA9IGRlY2xzLmNvbmNhdChjb21tZW50cygpKTtcbiAgICB9XG4gICAgaWYgKCFjbG9zZSgpKSByZXR1cm4gZXJyb3IoXCJAZm9udC1mYWNlIG1pc3NpbmcgJ30nXCIpO1xuXG4gICAgcmV0dXJuIHBvcyh7XG4gICAgICB0eXBlOiAnZm9udC1mYWNlJyxcbiAgICAgIGRlY2xhcmF0aW9uczogZGVjbHMsXG4gICAgfSkgYXMgRm9udEZhY2VOb2RlO1xuICB9XG5cbiAgLy8gUGFyc2Ugbm9uLWJsb2NrIGF0LXJ1bGVzXG4gIGZ1bmN0aW9uIGNvbXBpbGVBdHJ1bGU8VD4obmFtZTogTm9kZVsndHlwZSddKSB7XG4gICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKCdeQCcgKyBuYW1lICsgJ1xcXFxzKihbXjtdKyk7Jyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgICBjb25zdCBtID0gbWF0Y2gocmUpO1xuICAgICAgaWYgKCFtKSByZXR1cm47XG4gICAgICBjb25zdCByZXQgPSB7IHR5cGU6IG5hbWUgfTtcbiAgICAgIHJldFtuYW1lXSA9IG1bMV0udHJpbSgpO1xuICAgICAgcmV0dXJuIHBvcyhyZXQpIGFzIHVua25vd24gYXMgVDtcbiAgICB9O1xuICB9XG5cbiAgLy8gUGFyc2UgaW1wb3J0XG4gIGNvbnN0IGF0aW1wb3J0ID0gY29tcGlsZUF0cnVsZTxJbXBvcnROb2RlPignaW1wb3J0Jyk7XG4gIC8vIFBhcnNlIGNoYXJzZXRcbiAgY29uc3QgYXRjaGFyc2V0ID0gY29tcGlsZUF0cnVsZTxDaGFyc2V0Tm9kZT4oJ2NoYXJzZXQnKTtcbiAgLy8gUGFyc2UgbmFtZXNwYWNlXG4gIGNvbnN0IGF0bmFtZXNwYWNlID0gY29tcGlsZUF0cnVsZTxOYW1lc3BhY2VOb2RlPignbmFtZXNwYWNlJyk7XG5cbiAgLy8gUGFyc2UgYXQgcnVsZS5cbiAgZnVuY3Rpb24gYXRydWxlKCkge1xuICAgIGlmIChjc3NbMF0gIT09ICdAJykgcmV0dXJuO1xuICAgIHJldHVybiAoXG4gICAgICBhdGtleWZyYW1lcygpIHx8XG4gICAgICBhdG1lZGlhKCkgfHxcbiAgICAgIGF0Y3VzdG9tbWVkaWEoKSB8fFxuICAgICAgYXRzdXBwb3J0cygpIHx8XG4gICAgICBhdGltcG9ydCgpIHx8XG4gICAgICBhdGNoYXJzZXQoKSB8fFxuICAgICAgYXRuYW1lc3BhY2UoKSB8fFxuICAgICAgYXRkb2N1bWVudCgpIHx8XG4gICAgICBhdHBhZ2UoKSB8fFxuICAgICAgYXRob3N0KCkgfHxcbiAgICAgIGF0Zm9udGZhY2UoKVxuICAgICk7XG4gIH1cblxuICAvLyBQYXJzZSBydWxlLlxuICBmdW5jdGlvbiBydWxlKCkge1xuICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKCk7XG4gICAgY29uc3Qgc2VsID0gc2VsZWN0b3IoKTtcbiAgICBpZiAoIXNlbCkgcmV0dXJuIGVycm9yKCdzZWxlY3RvciBtaXNzaW5nJyk7XG4gICAgY29tbWVudHMoKTtcblxuICAgIHJldHVybiBwb3Moe1xuICAgICAgdHlwZTogJ3J1bGUnLFxuICAgICAgc2VsZWN0b3JzOiBzZWwsXG4gICAgICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucygpIHx8IFtdLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGFkZFBhcmVudChzdHlsZXNoZWV0KCkgYXMgYW55KSBhcyBTdHlsZXNoZWV0Tm9kZTtcbn1cblxuZnVuY3Rpb24gdHJpbShzdHI6IHN0cmluZykge1xuICByZXR1cm4gc3RyID8gc3RyLnRyaW0oKSA6ICcnO1xufVxuXG4vLyBBZGRzIG5vbi1lbnVtZXJhYmxlIHBhcmVudCBub2RlIHJlZmVyZW5jZSB0byBlYWNoIG5vZGUuXG5mdW5jdGlvbiBhZGRQYXJlbnQob2JqOiBOb2RlLCBwYXJlbnQ/OiBOb2RlIHwgbnVsbCkge1xuICBjb25zdCBpc05vZGUgPSBvYmogJiYgdHlwZW9mIG9iai50eXBlID09PSAnc3RyaW5nJztcbiAgY29uc3QgY2hpbGRQYXJlbnQgPSBpc05vZGUgPyBvYmogOiBwYXJlbnQ7XG5cbiAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgodikgPT4gYWRkUGFyZW50KHYsIGNoaWxkUGFyZW50KSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBhZGRQYXJlbnQodmFsdWUsIGNoaWxkUGFyZW50KTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNOb2RlKSB7XG4gICAgb2JqLnBhcmVudCA9IHBhcmVudCB8fCBudWxsO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG4iLCAiaW1wb3J0IHsgX19Nb2NrSHRtbF9fLCBfX01vY2tIZWFkX18sIF9fTW9ja0JvZHlfXyB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7XG4gIE5vZGUsXG4gIERlY2xOb2RlLFxuICBQYWdlTm9kZSxcbiAgSG9zdE5vZGUsXG4gIFJ1bGVOb2RlLFxuICBNZWRpYU5vZGUsXG4gIEltcG9ydE5vZGUsXG4gIENoYXJzZXROb2RlLFxuICBDb21tZW50Tm9kZSxcbiAgU3VwcG9ydHNOb2RlLFxuICBEb2N1bWVudE5vZGUsXG4gIEZvbnRGYWNlTm9kZSxcbiAgS2V5ZnJhbWVOb2RlLFxuICBLZXlmcmFtZXNOb2RlLFxuICBOYW1lc3BhY2VOb2RlLFxuICBTdHlsZXNoZWV0Tm9kZSxcbiAgQ3VzdG9tTWVkaWFOb2RlLFxufSBmcm9tICcuL2dsb2JhbFR5cGVzJztcbmltcG9ydCB7IHByb2Nlc3NBbmltYXRpb24gfSBmcm9tICcuL2FuaW1hdGlvblBhcnNlcic7XG5cbmNvbnN0IGFuaW1hdGlvblJFID0gL14oLVxcdystKT9hbmltYXRpb24kLztcbmNvbnN0IGFuaW1hdGlvbk5hbWVSRSA9IC9eKC1cXHcrLSk/YW5pbWF0aW9uLW5hbWUkLztcblxuY2xhc3MgQ29tcGlsZXIge1xuICBwdWJsaWMgbGV2ZWwgPSAxO1xuICBwdWJsaWMgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5pZCA9IGlkIHx8ICcnO1xuICB9XG5cbiAgLy8gXHU1M0VGXHU0RUU1XHU5MUNEXHU1MTk5XHU4OTg2XHU3NkQ2IGVtaXRcbiAgZW1pdChzdHI6IHN0cmluZywgXz86IGFueSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICB2aXNpdChub2RlOiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXNbbm9kZS50eXBlXShub2RlIGFzIGFueSk7XG4gIH1cblxuICBtYXBWaXNpdChub2RlczogQXJyYXk8Tm9kZT4sIGRlbGltOiBzdHJpbmcpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGJ1ZiA9ICcnO1xuICAgIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcblxuICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGJ1ZiArPSB0aGlzLnZpc2l0KG5vZGVzW2ldKTtcbiAgICAgIGlmIChkZWxpbSAmJiBpIDwgbGVuIC0gMSkge1xuICAgICAgICBidWYgKz0gdGhpcy5lbWl0KGRlbGltKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIGFkZFNjb3BlKHNlbGVjdG9yczogQXJyYXk8c3RyaW5nPikge1xuICAgIGlmICghdGhpcy5pZCkgcmV0dXJuIHNlbGVjdG9ycztcblxuICAgIHJldHVybiBzZWxlY3RvcnMubWFwKChzKSA9PiB7XG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIHMgPVxuICAgICAgICBzID09PSAnaHRtbCcgfHwgcyA9PT0gJzpyb290J1xuICAgICAgICAgID8gYFske19fTW9ja0h0bWxfX31dYFxuICAgICAgICAgIDogcyA9PT0gJ2JvZHknXG4gICAgICAgICAgICA/IGBbJHtfX01vY2tCb2R5X199XWBcbiAgICAgICAgICAgIDogcyA9PT0gJ2hlYWQnXG4gICAgICAgICAgICAgID8gYFske19fTW9ja0hlYWRfX31dYFxuICAgICAgICAgICAgICA6IHM7XG4gICAgICByZXR1cm4gYCMke3RoaXMuaWR9ICR7c31gO1xuICAgIH0pO1xuICB9XG5cbiAgaW5kZW50KGxldmVsPzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMubGV2ZWwgKz0gbGV2ZWw7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBBcnJheSh0aGlzLmxldmVsKS5qb2luKCcgICcpO1xuICB9XG5cbiAgY29tcGlsZShub2RlOiBTdHlsZXNoZWV0Tm9kZSkge1xuICAgIHJldHVybiB0aGlzLnN0eWxlc2hlZXQobm9kZSk7XG4gIH1cblxuICBzdHlsZXNoZWV0KG5vZGU6IFN0eWxlc2hlZXROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwVmlzaXQobm9kZS5zdHlsZXNoZWV0LnJ1bGVzLCAnXFxuXFxuJyk7XG4gIH1cblxuICBjb21tZW50KG5vZGU6IENvbW1lbnROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgpfS8qJHtub2RlLmNvbW1lbnR9Ki9gLCBub2RlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGltcG9ydChub2RlOiBJbXBvcnROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdChgQGltcG9ydCAke25vZGUuaW1wb3J0fTtgLCBub2RlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGNoYXJzZXQobm9kZTogQ2hhcnNldE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0KGBAY2hhcnNldCAke25vZGUuY2hhcnNldH07YCwgbm9kZS5wb3NpdGlvbik7XG4gIH1cblxuICBuYW1lc3BhY2Uobm9kZTogTmFtZXNwYWNlTm9kZSkge1xuICAgIHJldHVybiB0aGlzLmVtaXQoYEBuYW1lc3BhY2UgJHtub2RlLm5hbWVzcGFjZX07YCwgbm9kZS5wb3NpdGlvbik7XG4gIH1cblxuICBtZWRpYShub2RlOiBNZWRpYU5vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KGBAbWVkaWEgJHtub2RlLm1lZGlhfWAsIG5vZGUucG9zaXRpb24pICtcbiAgICAgIHRoaXMuZW1pdChgIHtcXG4ke3RoaXMuaW5kZW50KDEpfWApICtcbiAgICAgIHRoaXMubWFwVmlzaXQobm9kZS5ydWxlcywgJ1xcblxcbicpICtcbiAgICAgIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgtMSl9XFxufWApXG4gICAgKTtcbiAgfVxuXG4gIGRvY3VtZW50KG5vZGU6IERvY3VtZW50Tm9kZSkge1xuICAgIGNvbnN0IGRvYyA9IGBAJHtub2RlLnZlbmRvciB8fCAnJ31kb2N1bWVudCAke25vZGUuZG9jdW1lbnR9YDtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KGRvYywgbm9kZS5wb3NpdGlvbikgK1xuICAgICAgdGhpcy5lbWl0KGAgIHtcXG4ke3RoaXMuaW5kZW50KDEpfWApICtcbiAgICAgIHRoaXMubWFwVmlzaXQobm9kZS5ydWxlcywgJ1xcblxcbicpICtcbiAgICAgIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgtMSl9XFxufWApXG4gICAgKTtcbiAgfVxuXG4gIHN1cHBvcnRzKG5vZGU6IFN1cHBvcnRzTm9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmVtaXQoYEBzdXBwb3J0cyAke25vZGUuc3VwcG9ydHN9YCwgbm9kZS5wb3NpdGlvbikgK1xuICAgICAgdGhpcy5lbWl0KGAge1xcbiR7dGhpcy5pbmRlbnQoMSl9YCkgK1xuICAgICAgdGhpcy5tYXBWaXNpdChub2RlLnJ1bGVzLCAnXFxuXFxuJykgK1xuICAgICAgdGhpcy5lbWl0KGAke3RoaXMuaW5kZW50KC0xKX1cXG59YClcbiAgICApO1xuICB9XG5cbiAga2V5ZnJhbWVzKG5vZGU6IEtleWZyYW1lc05vZGUpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5pZCA/IGAke3RoaXMuaWR9LSR7bm9kZS5uYW1lfWAgOiBub2RlLm5hbWU7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdChgQCR7bm9kZS52ZW5kb3IgfHwgJyd9a2V5ZnJhbWVzICR7bmFtZX1gLCBub2RlLnBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoYCB7XFxuJHt0aGlzLmluZGVudCgxKX1gKSArXG4gICAgICB0aGlzLm1hcFZpc2l0KG5vZGUua2V5ZnJhbWVzLCAnXFxuJykgK1xuICAgICAgdGhpcy5lbWl0KGAke3RoaXMuaW5kZW50KC0xKX19YClcbiAgICApO1xuICB9XG5cbiAga2V5ZnJhbWUobm9kZTogS2V5ZnJhbWVOb2RlKSB7XG4gICAgY29uc3QgZGVjbHMgPSBub2RlLmRlY2xhcmF0aW9ucztcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KHRoaXMuaW5kZW50KCkpICtcbiAgICAgIHRoaXMuZW1pdChub2RlLnZhbHVlcy5qb2luKCcsICcpLCBub2RlLnBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoYCB7XFxuJHt0aGlzLmluZGVudCgxKX1gKSArXG4gICAgICB0aGlzLm1hcFZpc2l0KGRlY2xzLCAnXFxuJykgK1xuICAgICAgdGhpcy5lbWl0KGAke3RoaXMuaW5kZW50KC0xKX1cXG4ke3RoaXMuaW5kZW50KCl9fVxcbmApXG4gICAgKTtcbiAgfVxuXG4gIHBhZ2Uobm9kZTogUGFnZU5vZGUpIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBzZWwgPSBub2RlLnNlbGVjdG9ycy5sZW5ndGhcbiAgICAgID8gdGhpcy5hZGRTY29wZShub2RlLnNlbGVjdG9ycykuam9pbignLCAnKSArICcgJ1xuICAgICAgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmVtaXQoYEBwYWdlICR7c2VsfWAsIG5vZGUucG9zaXRpb24pICtcbiAgICAgIHRoaXMuZW1pdCgne1xcbicpICtcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgxKSkgK1xuICAgICAgdGhpcy5tYXBWaXNpdChub2RlLmRlY2xhcmF0aW9ucywgJ1xcbicpICtcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgtMSkpICtcbiAgICAgIHRoaXMuZW1pdCgnXFxufScpXG4gICAgKTtcbiAgfVxuXG4gIGhvc3Qobm9kZTogSG9zdE5vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KCdAaG9zdCcsIG5vZGUucG9zaXRpb24pICtcbiAgICAgIHRoaXMuZW1pdChgIHtcXG4ke3RoaXMuaW5kZW50KDEpfWApICtcbiAgICAgIHRoaXMubWFwVmlzaXQobm9kZS5ydWxlcywgJ1xcblxcbicpICtcbiAgICAgIHRoaXMuZW1pdChgJHt0aGlzLmluZGVudCgtMSl9XFxufWApXG4gICAgKTtcbiAgfVxuXG4gIHJ1bGUobm9kZTogUnVsZU5vZGUpIHtcbiAgICBjb25zdCBpbmRlbnQgPSB0aGlzLmluZGVudCgpO1xuICAgIGNvbnN0IGRlY2xzID0gbm9kZS5kZWNsYXJhdGlvbnM7XG4gICAgaWYgKCFkZWNscy5sZW5ndGgpIHJldHVybiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmVtaXQoXG4gICAgICAgIHRoaXMuYWRkU2NvcGUobm9kZS5zZWxlY3RvcnMpXG4gICAgICAgICAgLm1hcCgocykgPT4gaW5kZW50ICsgcylcbiAgICAgICAgICAuam9pbignLFxcbicpLFxuICAgICAgICBub2RlLnBvc2l0aW9uLFxuICAgICAgKSArXG4gICAgICB0aGlzLmVtaXQoJyB7XFxuJykgK1xuICAgICAgdGhpcy5lbWl0KHRoaXMuaW5kZW50KDEpKSArXG4gICAgICB0aGlzLm1hcFZpc2l0KGRlY2xzLCAnXFxuJykgK1xuICAgICAgdGhpcy5lbWl0KHRoaXMuaW5kZW50KC0xKSkgK1xuICAgICAgdGhpcy5lbWl0KGBcXG4ke3RoaXMuaW5kZW50KCl9fWApXG4gICAgKTtcbiAgfVxuXG4gIGRlY2xhcmF0aW9uKG5vZGU6IERlY2xOb2RlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICAgIGxldCB7IHZhbHVlLCBwcm9wZXJ0eSwgcG9zaXRpb24gfSA9IG5vZGU7XG5cbiAgICBpZiAodGhpcy5pZCkge1xuICAgICAgaWYgKGFuaW1hdGlvblJFLnRlc3QocHJvcGVydHkpKSB7XG4gICAgICAgIHZhbHVlID0gcHJvY2Vzc0FuaW1hdGlvbih2YWx1ZSwgdGhpcy5pZCk7XG4gICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvbk5hbWVSRS50ZXN0KHByb3BlcnR5KSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlXG4gICAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgICAubWFwKCh2KSA9PiAodiA9PT0gJ25vbmUnID8gdiA6IGAke3YudHJpbSgpfS0ke3RoaXMuaWR9YCkpXG4gICAgICAgICAgLmpvaW4oJywnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgpKSArXG4gICAgICB0aGlzLmVtaXQoYCR7cHJvcGVydHl9OiAke3ZhbHVlfWAsIHBvc2l0aW9uKSArXG4gICAgICB0aGlzLmVtaXQoJzsnKVxuICAgICk7XG4gIH1cblxuICAnZm9udC1mYWNlJyhub2RlOiBGb250RmFjZU5vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbWl0KCdAZm9udC1mYWNlICcsIG5vZGUucG9zaXRpb24pICtcbiAgICAgIHRoaXMuZW1pdCgne1xcbicpICtcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgxKSkgK1xuICAgICAgdGhpcy5tYXBWaXNpdChub2RlLmRlY2xhcmF0aW9ucywgJ1xcbicpICtcbiAgICAgIHRoaXMuZW1pdCh0aGlzLmluZGVudCgtMSkpICtcbiAgICAgIHRoaXMuZW1pdCgnXFxufScpXG4gICAgKTtcbiAgfVxuXG4gICdjdXN0b20tbWVkaWEnKG5vZGU6IEN1c3RvbU1lZGlhTm9kZSkge1xuICAgIHJldHVybiB0aGlzLmVtaXQoXG4gICAgICBgQGN1c3RvbS1tZWRpYSAke25vZGUubmFtZX0gJHtub2RlLm1lZGlhfTtgLFxuICAgICAgbm9kZS5wb3NpdGlvbixcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkobm9kZTogU3R5bGVzaGVldE5vZGUsIGlkOiBzdHJpbmcpIHtcbiAgY29uc3QgY29tcGlsZXIgPSBuZXcgQ29tcGlsZXIoaWQpO1xuICByZXR1cm4gY29tcGlsZXIuY29tcGlsZShub2RlKTtcbn1cbiIsICIvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLWFuaW1hdGlvbnMtMS8jdHlwZWRlZi1zaW5nbGUtYW5pbWF0aW9uXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9DU1MvYW5pbWF0aW9uIyVFOCVBRiVBRCVFNiVCMyU5NVxuXG4vLyB0aW1lOiBzIHwgbXNcbmNvbnN0IHRpbWVSZWcgPSAvXlstXFxkXFwuXSsoc3xtcykkLztcbmZ1bmN0aW9uIGlzVGltZShwOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHRpbWVSZWcudGVzdChwKTtcbn1cblxuLy8gc2luZ2xlLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlIHwgPG51bWJlcj5cbmNvbnN0IG51bWJlclJlZyA9IC9eWy1cXGRcXC5dKyQvO1xuZnVuY3Rpb24gaXNJdGVyYXRpb25Db3VudChwOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHAgPT09ICdpbmZpbml0ZScgfHwgbnVtYmVyUmVnLnRlc3QocCk7XG59XG5cbi8vIHNpbmdsZS1hbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZyB8IHBhdXNlZFxuZnVuY3Rpb24gaXNQbGF5U3RhdGUocDogc3RyaW5nKSB7XG4gIHJldHVybiBwID09PSAncnVubmluZycgfHwgcCA9PT0gJ3BhdXNlZCc7XG59XG5cbi8vIHRpbWUtZnVuY3Rpb246IGVhc2UgfCBlYXNlLWluIHwgZWFzZS1vdXQgfCBlYXNlLWluLW91dCB8IGxpbmVhciB8ICBzdGVwLXN0YXJ0IHwgc3RlcC1lbmQgfCBjdWJpYy1iZXppZXIoKSB8IHN0ZXBzKClcbmZ1bmN0aW9uIGlzVGltZUZ1bmN0aW9uKHA6IHN0cmluZyB8IFByb3BzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHApKSByZXR1cm4gdHJ1ZTtcbiAgc3dpdGNoIChwKSB7XG4gICAgY2FzZSAnZWFzZSc6XG4gICAgY2FzZSAnZWFzZS1pbic6XG4gICAgY2FzZSAnZWFzZS1vdXQnOlxuICAgIGNhc2UgJ2Vhc2UtaW4tb3V0JzpcbiAgICBjYXNlICdsaW5lYXInOlxuICAgIGNhc2UgJ3N0ZXAtc3RhcnQnOlxuICAgIGNhc2UgJ3N0ZXAtZW5kJzpcbiAgICBjYXNlICdjdWJpYy1iZXppZXInOlxuICAgIGNhc2UgJ3N0ZXBzJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gc2luZ2xlLWFuaW1hdGlvbi1kaXJlY3Rpb246IG5vcm1hbCB8IHJldmVyc2UgfCBhbHRlcm5hdGUgfCBhbHRlcm5hdGUtcmV2ZXJzZVxuZnVuY3Rpb24gaXNEaXJlY3Rpb24ocDogc3RyaW5nKSB7XG4gIHN3aXRjaCAocCkge1xuICAgIGNhc2UgJ25vcm1hbCc6XG4gICAgY2FzZSAncmV2ZXJzZSc6XG4gICAgY2FzZSAnYWx0ZXJuYXRlJzpcbiAgICBjYXNlICdhbHRlcm5hdGUtcmV2ZXJzZSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIHNpbmdsZS1hbmltYXRpb24tZmlsbC1tb2RlOiBub25lIHwgZm9yd2FyZHMgfCBiYWNrd2FyZHMgfCBib3RoXG5mdW5jdGlvbiBpc0ZpbGxNb2RlKHA6IHN0cmluZykge1xuICBzd2l0Y2ggKHApIHtcbiAgICBjYXNlICdub25lJzpcbiAgICBjYXNlICdmb3J3YXJkcyc6XG4gICAgY2FzZSAnYmFja3dhcmRzJzpcbiAgICBjYXNlICdib3RoJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9XZWIvQ1NTL2N1c3RvbS1pZGVudCMlRTglQUYlQUQlRTYlQjMlOTVcbi8vIFdpdGggcGFyc2VyLCBvbmx5IG5lZWQgdG8gZmlsdGVyIGtleXdvcmRzIGFuZCBzcGVjaWFsIHN5bWJvbHMgaW4gdG9rZW5cbmNvbnN0IHN5bWJvbHMgPSAvWywnXCJcXChcXCkhO10vO1xuZnVuY3Rpb24gaXNMZWdhbE5hbWUocDogc3RyaW5nKSB7XG4gIGlmIChzeW1ib2xzLnRlc3QocCkpIHJldHVybiBmYWxzZTtcbiAgc3dpdGNoIChwKSB7XG4gICAgY2FzZSAndW5zZXQnOlxuICAgIGNhc2UgJ2luaXRpYWwnOlxuICAgIGNhc2UgJ2luaGVyaXQnOlxuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vLyBub25lIHwga2V5ZnJhbWVzLW5hbWU6IDxjdXN0b20taWRlbnQ+IHwgPHN0cmluZz5cbmZ1bmN0aW9uIGlzTmFtZShwOiBzdHJpbmcpIHtcbiAgaWYgKFxuICAgICEoXG4gICAgICBpc1RpbWUocCkgfHxcbiAgICAgIGlzUGxheVN0YXRlKHApIHx8XG4gICAgICBpc0l0ZXJhdGlvbkNvdW50KHApIHx8XG4gICAgICBpc0ZpbGxNb2RlKHApIHx8XG4gICAgICBpc0RpcmVjdGlvbihwKSB8fFxuICAgICAgaXNUaW1lRnVuY3Rpb24ocClcbiAgICApXG4gICkge1xuICAgIHJldHVybiBpc0xlZ2FsTmFtZShwKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHRva2VuaXplcihpbnB1dDogc3RyaW5nKSB7XG4gIGxldCBidWYgPSAnJztcbiAgY29uc3QgdG9rZW5zOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0IHB1c2ggPSAoKSA9PiB7XG4gICAgYnVmICYmIHRva2Vucy5wdXNoKGJ1Zik7XG4gICAgYnVmID0gJyc7XG4gIH07XG5cbiAgZm9yIChjb25zdCBjaGFyIG9mIGlucHV0KSB7XG4gICAgaWYgKGNoYXIgPT09ICcsJyB8fCBjaGFyID09PSAnKScgfHwgY2hhciA9PT0gJzsnKSB7XG4gICAgICBwdXNoKCk7XG4gICAgICBidWYgKz0gY2hhcjtcbiAgICAgIHB1c2goKTtcbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09ICcoJykge1xuICAgICAgcHVzaCgpO1xuICAgICAgaWYgKHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0gPT09ICcgJykge1xuICAgICAgICBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID8gKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgOiBmYWxzZSkgJiYgIWZhbHNlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBbR2FyZmlzaCBDc3Mgc2NvcGVdOiBJbnZhbGlkIHByb3BlcnR5IHZhbHVlOiBcIiR7aW5wdXR9XCJgLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnVmICs9IGNoYXI7XG4gICAgICBwdXNoKCk7XG4gICAgfSBlbHNlIGlmIChjaGFyID09PSAnICcpIHtcbiAgICAgIHB1c2goKTtcbiAgICAgIGlmICh0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdICE9PSAnICcpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goJyAnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnVmICs9IGNoYXI7XG4gICAgfVxuICB9XG4gIHB1c2goKTtcbiAgcmV0dXJuIHRva2Vucztcbn1cblxuZnVuY3Rpb24gcGFyc2UodG9rZW5zOiBBcnJheTxzdHJpbmc+KTogQXJyYXk8UHJvcHM+IHtcbiAgbGV0IG1vZGUgPSAxOyAvLyAxIHwgMiB8IDNcbiAgbGV0IHNjb3BlOiBBcnJheTxhbnk+ID0gW107XG4gIGxldCBzdGFzaCA9IGZhbHNlO1xuICBjb25zdCBwYXJlbnQgPSBbXTtcbiAgc2NvcGVbMF0gPSBwYXJlbnQ7XG5cbiAgY29uc3QgdXAgPSAoKSA9PiB7XG4gICAgc2NvcGVbMF0ucHVzaChzY29wZSk7XG4gICAgc2NvcGUgPSBzY29wZVswXTtcbiAgfTtcblxuICBjb25zdCBkb3duID0gKCkgPT4ge1xuICAgIGNvbnN0IG5zOiBBcnJheTxhbnk+ID0gW107XG4gICAgbnNbMF0gPSBzY29wZTtcbiAgICBzY29wZSA9IG5zO1xuICB9O1xuXG4gIGNvbnN0IHBhcmFsbGVsID0gKCkgPT4ge1xuICAgIHNjb3BlWzBdLnB1c2goc2NvcGUpO1xuICAgIHNjb3BlID0gW107XG4gICAgc2NvcGVbMF0gPSBwYXJlbnQ7XG4gIH07XG5cbiAgY29uc3QgdG9UaHJlZU1vZGUgPSAodDogc3RyaW5nKSA9PiB7XG4gICAgbW9kZSA9IDM7XG4gICAgZG93bigpO1xuICAgIHNjb3BlLnB1c2godCk7XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0ID0gdG9rZW5zW2ldO1xuICAgIGlmIChtb2RlID09PSAxKSB7XG4gICAgICBpZiAodCA9PT0gJywnKSB7XG4gICAgICAgIG1vZGUgPSAyO1xuICAgICAgICBzdGFzaCA9IGZhbHNlO1xuICAgICAgICBzY29wZS5wdXNoKHQpO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnKCcpIHtcbiAgICAgICAgdG9UaHJlZU1vZGUodCk7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICcgJykge1xuICAgICAgICBzdGFzaCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFzaCAmJiBwYXJhbGxlbCgpO1xuICAgICAgICBzdGFzaCA9IGZhbHNlO1xuICAgICAgICBzY29wZS5wdXNoKHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gMikge1xuICAgICAgaWYgKHQgPT09ICcoJykge1xuICAgICAgICB0b1RocmVlTW9kZSh0KTtcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJyAnKSB7XG4gICAgICAgIGlmICh0b2tlbnNbaSAtIDFdICE9PSAnLCcpIHtcbiAgICAgICAgICBtb2RlID0gMTtcbiAgICAgICAgICBzdGFzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjb3BlLnB1c2godCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAzKSB7XG4gICAgICBpZiAodCA9PT0gJyknKSB7XG4gICAgICAgIG1vZGUgPSAyO1xuICAgICAgICBzY29wZS5wdXNoKHQpO1xuICAgICAgICB1cCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NvcGUucHVzaCh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcGFyYWxsZWwoKTtcbiAgcmV0dXJuIHBhcmVudDtcbn1cblxudHlwZSBQcm9wcyA9IEFycmF5PHN0cmluZyB8IFByb3BzPjtcbmZ1bmN0aW9uIHN0cmluZ2lmeSh0cmVlOiBBcnJheTxQcm9wcz4sIHByZWZpeDogc3RyaW5nKSB7XG4gIGxldCBvdXRwdXQgPSAnJztcbiAgY29uc3Qgc3BsaWNlID0gKHApID0+IChpc05hbWUocCkgPyBgJHtwfS0ke3ByZWZpeH1gIDogcCk7XG5cbiAgY29uc3QgY2hpbGQgPSAocHM6IEFycmF5PHN0cmluZz4pID0+IHtcbiAgICBsZXQgYnVmID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xuICAgICAgYnVmICs9IHBzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xuICB9O1xuXG4gIHRyZWUuZm9yRWFjaCgocHMpID0+IHtcbiAgICBpZiAocHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIG91dHB1dCArPSAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkocHNbMV0pXG4gICAgICAgICAgPyBjaGlsZChwc1sxXSBhcyBBcnJheTxzdHJpbmc+KVxuICAgICAgICAgIDogc3BsaWNlKHBzWzFdKVxuICAgICAgKSArICcgJztcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuZXh0ID0gcHNbaSArIDFdO1xuICAgICAgICBjb25zdCBuZXh0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkobmV4dCk7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBsZXQgY3VyID0gQXJyYXkuaXNBcnJheShwc1tpXSlcbiAgICAgICAgICA/IGNoaWxkKHBzW2ldIGFzIEFycmF5PHN0cmluZz4pXG4gICAgICAgICAgOiBuZXh0SXNBcnJheVxuICAgICAgICAgICAgPyBwc1tpXVxuICAgICAgICAgICAgOiBzcGxpY2UocHNbaV0gYXMgc3RyaW5nKTtcblxuICAgICAgICBpZiAobmV4dCA9PT0gJywnIHx8IG5leHQgPT09ICc7Jykge1xuICAgICAgICAgIC8vIE5vIGFkZCBzcGFjZXNcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SXNBcnJheSkge1xuICAgICAgICAgIGNvbnN0IGZpbGxVcCA9IHBzW2kgKyAyXSA9PT0gJywnID8gJycgOiAnICc7XG4gICAgICAgICAgY3VyICs9IGAke2NoaWxkKG5leHQgYXMgQXJyYXk8c3RyaW5nPil9JHtmaWxsVXB9YDtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyICs9ICcgJztcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQgKz0gY3VyO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQudHJpbSgpO1xufVxuXG5jb25zdCBjb2RlQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuY29uc3QgdHJlZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PFByb3BzPj4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NBbmltYXRpb24oaW5wdXQ6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpIHtcbiAgaWYgKCFpbnB1dCB8fCAhcHJlZml4KSByZXR1cm4gaW5wdXQ7XG4gIGNvbnN0IGV0YWcgPSBgJHtwcmVmaXh9LSR7aW5wdXR9YDtcbiAgaWYgKGNvZGVDYWNoZS5oYXMoZXRhZykpIHtcbiAgICByZXR1cm4gY29kZUNhY2hlLmdldChldGFnKSE7XG4gIH1cblxuICBsZXQgdHJlZSA9IHRyZWVDYWNoZS5nZXQoaW5wdXQpO1xuICBpZiAoIXRyZWUpIHtcbiAgICBjb25zdCB0b2tlbnMgPSB0b2tlbml6ZXIoaW5wdXQpO1xuICAgIC8vIElmIHRoZSBzeW50YXggaXMgaW5jb3JyZWN0LCBqdXN0IHJldHVybiB0byB0aGUgb3JpZ2luYWwgdGV4dFxuICAgIGlmICh0b2tlbnMgPT09IGZhbHNlKSByZXR1cm4gaW5wdXQ7XG4gICAgdHJlZSA9IHBhcnNlKHRva2Vucyk7XG4gICAgdHJlZUNhY2hlLnNldChpbnB1dCwgdHJlZSk7XG4gIH1cblxuICBjb25zdCBuZXdDb2RlID0gc3RyaW5naWZ5KHRyZWUsIHByZWZpeCk7XG4gIGNvZGVDYWNoZS5zZXQoZXRhZywgbmV3Q29kZSk7XG4gIHJldHVybiBuZXdDb2RlO1xufVxuIiwgImltcG9ydCB7IG1kNSB9IGZyb20gJ3N1cGVyLWZhc3QtbWQ1JztcbmltcG9ydCB0eXBlIHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBMb2FkZXIsIFN0eWxlTWFuYWdlciB9IGZyb20gJ0BnYXJmaXNoL2xvYWRlcic7XG5pbXBvcnQge1xuICB3YXJuLFxuICBmaW5kVGFyZ2V0LFxuICBzdXBwb3J0V2FzbSxcbiAgaWRsZUNhbGxiYWNrLFxuICBfX01vY2tCb2R5X18sXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi9jc3NQYXJzZXInO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSAnLi9jc3NTdHJpbmdpZnknO1xuaW1wb3J0IHR5cGUgeyBTdHlsZXNoZWV0Tm9kZSB9IGZyb20gJy4vZ2xvYmFsVHlwZXMnO1xuXG5leHBvcnQgeyBwYXJzZSB9IGZyb20gJy4vY3NzUGFyc2VyJztcbmV4cG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gJy4vY3NzU3RyaW5naWZ5JztcblxuZXhwb3J0IGludGVyZmFjZSBDc3NTY29wZU9wdGlvbnMge1xuICBmaXhCb2R5R2V0dGVyPzogYm9vbGVhbjtcbiAgZXhjbHVkZXM/OiBBcnJheTxzdHJpbmc+IHwgKChuYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2FyZmlzaENzc1Njb3BlKG9wdGlvbnM6IENzc1Njb3BlT3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHBsdWdpbk5hbWUgPSAnY3NzLXNjb3BlJztcbiAgY29uc3QgcHJvdG9DYWNoZSA9IG5ldyBTZXQ8U3R5bGVNYW5hZ2VyPigpO1xuICBjb25zdCBhc3RDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBTdHlsZXNoZWV0Tm9kZT4oKTtcblxuICBjb25zdCBkaXNhYmxlID0gKGFwcE5hbWU/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB7IGV4Y2x1ZGVzIH0gPSBvcHRpb25zO1xuICAgIGlmICghYXBwTmFtZSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXhjbHVkZXMpKSByZXR1cm4gZXhjbHVkZXMuaW5jbHVkZXMoYXBwTmFtZSk7XG4gICAgaWYgKHR5cGVvZiBleGNsdWRlcyA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGV4Y2x1ZGVzKGFwcE5hbWUpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwcm9jZXNzUHJlbG9hZE1hbmFnZXIgPSAobG9hZGVyOiBMb2FkZXIpID0+IHtcbiAgICBsb2FkZXIuaG9va3MudXNlUGx1Z2luKHtcbiAgICAgIG5hbWU6IHBsdWdpbk5hbWUsXG5cbiAgICAgIGxvYWRlZCh7IHZhbHVlLCByZXN1bHQgfSkge1xuICAgICAgICBpZiAodmFsdWUuZmlsZVR5cGUgPT09ICdjc3MnICYmICFkaXNhYmxlKHZhbHVlLnNjb3BlKSkge1xuICAgICAgICAgIGNvbnN0IHsgc3R5bGVDb2RlIH0gPSB2YWx1ZS5yZXNvdXJjZU1hbmFnZXIgYXMgU3R5bGVNYW5hZ2VyO1xuICAgICAgICAgIGlkbGVDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoYXNoID0gbWQ1KHN0eWxlQ29kZSk7XG4gICAgICAgICAgICBpZiAoIWFzdENhY2hlLmhhcyhoYXNoKSkge1xuICAgICAgICAgICAgICBjb25zdCBhc3ROb2RlID0gcGFyc2Uoc3R5bGVDb2RlLCB7IHNvdXJjZTogdmFsdWUudXJsIH0pO1xuICAgICAgICAgICAgICBhc3RDYWNoZS5zZXQoaGFzaCwgYXN0Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdmFsdWUsIHJlc3VsdCB9O1xuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKEdhcmZpc2g6IGludGVyZmFjZXMuR2FyZmlzaCk6IGludGVyZmFjZXMuUGx1Z2luIHtcbiAgICBjb25zdCBjb21waWxlZENhY2hlID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogcGx1Z2luTmFtZSxcbiAgICAgIHZlcnNpb246ICcxLjEyLjAnLFxuXG4gICAgICBiZWZvcmVCb290c3RyYXAoKSB7XG4gICAgICAgIGlmICghc3VwcG9ydFdhc20pIHJldHVybjtcbiAgICAgICAgLy8gV2hlbiBwcmVsb2FkaW5nLCBwYXJzZSBvdXQgYXN0IGluIGFkdmFuY2VcbiAgICAgICAgcHJvY2Vzc1ByZWxvYWRNYW5hZ2VyKEdhcmZpc2gubG9hZGVyKTtcblxuICAgICAgICAvLyByZXdyaXRlIHRyYW5zZm9ybSBtZXRob2RcbiAgICAgICAgY29uc3QgcHJvdG8gPSBHYXJmaXNoLmxvYWRlci5TdHlsZU1hbmFnZXIucHJvdG90eXBlO1xuICAgICAgICBjb25zdCBvcmlnaW5UcmFuc2Zvcm0gPSBwcm90by50cmFuc2Zvcm1Db2RlO1xuICAgICAgICBpZiAocHJvdG9DYWNoZS5oYXMocHJvdG8pKSByZXR1cm47XG4gICAgICAgIHByb3RvQ2FjaGUuYWRkKHByb3RvKTtcblxuICAgICAgICBwcm90by50cmFuc2Zvcm1Db2RlID0gZnVuY3Rpb24gKGNvZGU6IHN0cmluZykge1xuICAgICAgICAgIGNvbnN0IHsgYXBwTmFtZSwgcm9vdEVsSWQgfSA9IHRoaXMuc2NvcGVEYXRhIHx8IHt9O1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFjb2RlIHx8XG4gICAgICAgICAgICAhcm9vdEVsSWQgfHxcbiAgICAgICAgICAgIGRpc2FibGUoYXBwTmFtZSkgfHxcbiAgICAgICAgICAgIGNvbXBpbGVkQ2FjaGUuaGFzKGNvZGUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luVHJhbnNmb3JtLmNhbGwodGhpcywgY29kZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaGFzaCA9IG1kNShjb2RlKTtcbiAgICAgICAgICBsZXQgYXN0Tm9kZSA9IGFzdENhY2hlLmdldChoYXNoKTtcbiAgICAgICAgICBpZiAoIWFzdE5vZGUpIHtcbiAgICAgICAgICAgIGFzdE5vZGUgPSBwYXJzZShjb2RlLCB7IHNvdXJjZTogdGhpcy51cmwgfSk7XG4gICAgICAgICAgICBhc3RDYWNoZS5zZXQoaGFzaCwgYXN0Tm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRoZSBgcm9vdEVsSWRgIGlzIHJhbmRvbSwgaXQgbWFrZXMgbm8gc2Vuc2UgdG8gY2FjaGUgdGhlIGNvbXBpbGVkIGNvZGVcbiAgICAgICAgICBjb25zdCBuZXdDb2RlID0gc3RyaW5naWZ5KGFzdE5vZGUsIHJvb3RFbElkKTtcbiAgICAgICAgICBjb21waWxlZENhY2hlLmFkZChuZXdDb2RlKTtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luVHJhbnNmb3JtLmNhbGwodGhpcywgbmV3Q29kZSk7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVMb2FkKGFwcEluZm8pIHtcbiAgICAgICAgaWYgKCFzdXBwb3J0V2FzbSkge1xuICAgICAgICAgIHdhcm4oJ1wiY3NzLXNjb3BlXCIgcGx1Z2luIHJlcXVpcmVzIHdlYkFzc2VtYmx5IHN1cHBvcnQnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBuYW1lLCBzYW5kYm94IH0gPSBhcHBJbmZvO1xuICAgICAgICBpZiAoIWRpc2FibGUobmFtZSkpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzYW5kYm94ICYmXG4gICAgICAgICAgICAoc2FuZGJveCA9PT0gZmFsc2UgfHwgc2FuZGJveC5vcGVuID09PSBmYWxzZSB8fCBzYW5kYm94LnNuYXBzaG90KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgYENoaWxkIGFwcCBcIiR7bmFtZX1cIiBkb2VzIG5vdCBvcGVuIHRoZSB2bSBzYW5kYm94LCBgICtcbiAgICAgICAgICAgICAgICAnY2Fubm90IHVzZSBcImNzcy1zY29wZVwiIHBsdWdpbicsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYWZ0ZXJMb2FkKGFwcEluZm8sIGFwcCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChvcHRpb25zLmZpeEJvZHlHZXR0ZXIgJiYgIWRpc2FibGUoYXBwSW5mby5uYW1lKSAmJiBhcHA/LnZtU2FuZGJveCkge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBhcHAudm1TYW5kYm94Lmhvb2tzLnVzZVBsdWdpbih7XG4gICAgICAgICAgICBuYW1lOiBwbHVnaW5OYW1lLFxuICAgICAgICAgICAgdmVyc2lvbjogJzEuMTIuMCcsXG4gICAgICAgICAgICBkb2N1bWVudEdldHRlcihkYXRhKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnByb3BOYW1lID09PSAnYm9keScgJiYgZGF0YS5yb290Tm9kZSkge1xuICAgICAgICAgICAgICAgIGRhdGEuY3VzdG9tVmFsdWUgPSBmaW5kVGFyZ2V0KGRhdGEucm9vdE5vZGUsIFtcbiAgICAgICAgICAgICAgICAgICdib2R5JyxcbiAgICAgICAgICAgICAgICAgIGBkaXZbJHtfX01vY2tCb2R5X199XWAsXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR0E7QUFvQkEsSUFBTSxZQUFZO0FBYVgsZUFBZSxLQUFhLFVBQTRCLElBQUk7QUFDakUsTUFBSSxPQUFPO0FBQ1gsTUFBSSxTQUFTO0FBR2IsMEJBQXdCLEtBQWE7QUFDbkMsVUFBTSxRQUFRLElBQUksTUFBTTtBQUN4QixRQUFJO0FBQU8sY0FBUSxNQUFNO0FBQ3pCLFVBQU0sSUFBSSxJQUFJLFlBQVk7QUFDMUIsYUFBUyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJO0FBQUE7QUFJbEQsaUJBQWU7QUFBQSxJQU1iLFlBQVksT0FBYztBQUpuQixxQkFBVTtBQUNWLGlCQUFNLEVBQUUsTUFBTTtBQUNkLG9CQUFTLFFBQVE7QUFHdEIsV0FBSyxRQUFRO0FBQUE7QUFB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
