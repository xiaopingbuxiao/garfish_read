// src/runtime.ts
import {
  toBase64,
  deepMerge,
  isPromise,
  isPlainObject,
  evalWithEnv,
  transformUrl as transformUrl3,
  warn,
  assert
} from "@garfish/utils";
import { Loader } from "@garfish/loader";

// src/compiler/index.ts
import { ancestor } from "acorn-walk";
import { generate } from "escodegen";
import { Parser } from "acorn";
import { transformUrl as transformUrl2, haveSourcemap } from "@garfish/utils";

// src/compiler/types.ts
function shallowEqual(actual, expected) {
  const keys = Object.keys(expected);
  for (const key of keys) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }
  return true;
}
function isIdentifier(node) {
  if (!node)
    return false;
  return node.type === "Identifier";
}
function isVar(node) {
  return isVariableDeclaration(node, { kind: "var" });
}
function isLet(node) {
  return isVariableDeclaration(node) && node.kind !== "var";
}
function isProperty(node) {
  if (!node)
    return false;
  return node.type === "Property";
}
function isBlockScoped(node) {
  return isFunctionDeclaration(node) || isClassDeclaration(node) || isLet(node);
}
function isArrowFunctionExpression(node) {
  if (!node)
    return false;
  return node.type === "ArrowFunctionExpression";
}
function isForXStatement(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  return nodeType === "ForInStatement" || nodeType === "ForOfStatement";
}
function isBlockStatement(node) {
  if (!node)
    return false;
  return node.type === "BlockStatement";
}
function isFunctionExpression(node) {
  if (!node)
    return false;
  return node.type === "FunctionExpression";
}
function isObjectMethod(node) {
  if (!node)
    return false;
  if (!isProperty(node))
    return false;
  return isFunction(node.value);
}
function isFunction(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "ArrowFunctionExpression" || nodeType === "MethodDefinition" || nodeType === "ClassPrivateMethod") {
    return true;
  }
  if (isObjectMethod(node))
    return true;
  return false;
}
function isRestElement(node) {
  if (!node)
    return false;
  return node.type === "RestElement";
}
function isArrayPattern(node) {
  if (!node)
    return false;
  return node.type === "ArrayPattern";
}
function isObjectPattern(node) {
  if (!node)
    return false;
  return node.type === "ObjectPattern";
}
function isAssignmentPattern(node) {
  if (!node)
    return false;
  return node.type === "AssignmentPattern";
}
function isPattern(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AssignmentPattern" || nodeType === "ArrayPattern" || nodeType === "ObjectPattern") {
    return true;
  }
  return false;
}
function isCatchClause(node) {
  if (!node)
    return false;
  return node.type === "CatchClause";
}
function isProgram(node) {
  if (!node)
    return false;
  return node.type === "Program";
}
function isFunctionParent(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "ArrowFunctionExpression" || nodeType === "MethodDefinition" || nodeType === "ClassPrivateMethod" || nodeType === "StaticBlock" || isObjectMethod(node)) {
    return true;
  }
  return false;
}
function isBlockParent(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement" || nodeType === "CatchClause" || nodeType === "DoWhileStatement" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "Program" || nodeType === "SwitchStatement" || nodeType === "WhileStatement" || nodeType === "ArrowFunctionExpression" || nodeType === "ForOfStatement" || nodeType === "MethodDefinition" || isObjectMethod(node) || nodeType === "ClassPrivateMethod" || nodeType === "StaticBlock") {
    return true;
  }
  return false;
}
function isLabeledStatement(node) {
  if (!node)
    return false;
  return node.type === "LabeledStatement";
}
function isFunctionDeclaration(node) {
  if (!node)
    return false;
  return node.type === "FunctionDeclaration";
}
function isVariableDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "VariableDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return shallowEqual(node, opts);
    }
  }
  return false;
}
function isClassDeclaration(node) {
  if (!node)
    return false;
  return node.type === "ClassDeclaration";
}
function isExportAllDeclaration(node) {
  if (!node)
    return false;
  return node.type === "ExportAllDeclaration";
}
function isExportDeclaration(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration") {
    return true;
  }
  return false;
}
function isExportDefaultDeclaration(node) {
  if (!node)
    return false;
  return node.type === "ExportDefaultDeclaration";
}
function isExportSpecifier(node) {
  if (!node)
    return false;
  return node.type === "ExportSpecifier";
}
function isImportDeclaration(node) {
  if (!node)
    return false;
  return node.type === "ImportDeclaration";
}
function isImportDefaultSpecifier(node) {
  if (!node)
    return false;
  return node.type === "ImportDefaultSpecifier";
}
function isImportNamespaceSpecifier(node) {
  if (!node)
    return false;
  return node.type === "ImportNamespaceSpecifier";
}
function isDeclaration(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "VariableDeclaration" || nodeType === "ClassDeclaration" || nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration" || nodeType === "ImportDeclaration") {
    return true;
  }
  return false;
}
function isScope(node, parent) {
  if (isBlockStatement(node) && (isFunction(parent) || isCatchClause(parent))) {
    return false;
  }
  if (isPattern(node) && (isFunction(parent) || isCatchClause(parent))) {
    return true;
  }
  return isScopable(node);
}
function isScopable(node) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement" || nodeType === "CatchClause" || nodeType === "DoWhileStatement" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "Program" || nodeType === "SwitchStatement" || nodeType === "WhileStatement" || nodeType === "ArrowFunctionExpression" || nodeType === "ClassExpression" || nodeType === "ClassDeclaration" || nodeType === "ForOfStatement" || nodeType === "MethodDefinition" || isObjectMethod(node) || nodeType === "ClassPrivateMethod" || nodeType === "StaticBlock") {
    return true;
  }
  return false;
}
function isReferenced(node, parent, grandparent) {
  switch (parent.type) {
    case "MemberExpression":
    case "OptionalMemberExpression":
      if (parent.property === node) {
        return !!parent.computed;
      }
      return parent.object === node;
    case "VariableDeclarator":
      return parent.init === node;
    case "ArrowFunctionExpression":
      return parent.body === node;
    case "PrivateName":
      return false;
    case "MethodDefinition":
    case "ClassPrivateMethod":
    case "Property":
      if (parent.key === node) {
        return !!parent.computed;
      }
      if (isObjectMethod(node)) {
        return false;
      } else {
        return !grandparent || grandparent.type !== "ObjectPattern";
      }
    case "PropertyDefinition":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
    case "ClassPrivateProperty":
      return parent.key !== node;
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.superClass === node;
    case "AssignmentExpression":
      return parent.right === node;
    case "AssignmentPattern":
      return parent.right === node;
    case "LabeledStatement":
      return false;
    case "CatchClause":
      return false;
    case "RestElement":
      return false;
    case "BreakStatement":
    case "ContinueStatement":
      return false;
    case "FunctionDeclaration":
    case "FunctionExpression":
      return false;
    case "ExportAllDeclaration":
      return false;
    case "ExportSpecifier":
      if (grandparent == null ? void 0 : grandparent.source) {
        return false;
      }
      return parent.local === node;
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;
    case "ImportAttribute":
      return false;
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
    case "MetaProperty":
      return false;
  }
  return true;
}

// src/compiler/generated.ts
function identifier(name) {
  return { name, type: "Identifier" };
}
function literal(value) {
  return {
    value,
    type: "Literal"
  };
}
function variableDeclarator(id, init) {
  return {
    id,
    init,
    type: "VariableDeclarator"
  };
}
function variableDeclaration(kind, declarations) {
  return {
    kind,
    declarations,
    type: "VariableDeclaration"
  };
}
function callExpression(callee, _arguments, optional = false) {
  return {
    callee,
    optional,
    arguments: _arguments,
    type: "CallExpression"
  };
}
function objectProperty(key, value, kind = "init", method = false, computed = false, shorthand = false, decorators = null) {
  return {
    key,
    value,
    kind,
    method,
    computed,
    shorthand,
    decorators,
    type: "Property"
  };
}
function arrowFunctionExpression(params, body, async = false, expression = false) {
  return {
    params,
    body,
    async,
    expression,
    type: "ArrowFunctionExpression"
  };
}
function objectExpression(properties) {
  return {
    properties,
    type: "ObjectExpression"
  };
}
function memberExpression(object, property, computed = false, optional = false) {
  return {
    object,
    property,
    computed,
    optional,
    type: "MemberExpression"
  };
}

// src/compiler/mergeMap.ts
import {
  SourceMapConsumer,
  SourceMapGenerator
} from "source-map";
import { transformUrl } from "@garfish/utils";
var PREFIX_REG = /^[#@]\s?sourceMappingURL\s?=\s?/;
function merge(oldMap, newMap) {
  const oldMapConsumer = new SourceMapConsumer(oldMap);
  const newMapConsumer = new SourceMapConsumer(newMap);
  const mergedMapGenerator = new SourceMapGenerator();
  newMapConsumer.eachMapping((m) => {
    if (!m.originalLine)
      return;
    const origPosInOldMap = oldMapConsumer.originalPositionFor({
      line: m.originalLine,
      column: m.originalColumn
    });
    if (origPosInOldMap.source) {
      mergedMapGenerator.addMapping({
        original: {
          line: origPosInOldMap.line,
          column: origPosInOldMap.column
        },
        generated: {
          line: m.generatedLine,
          column: m.generatedColumn
        },
        name: origPosInOldMap.name,
        source: origPosInOldMap.source
      });
    }
  });
  [oldMapConsumer, newMapConsumer].forEach((consumer) => {
    consumer.sources.forEach((sourceFile) => {
      const sourceContent = consumer.sourceContentFor(sourceFile);
      if (sourceContent) {
        mergedMapGenerator.setSourceContent(sourceFile, sourceContent);
      }
    });
  });
  return mergedMapGenerator.toString();
}
async function mergeSourcemap(compiler, output) {
  if (!compiler.sourcemapComment) {
    output.map = output.map.toString();
    return;
  }
  const newMap = output.map.toJSON();
  if (!newMap.mappings) {
    output.map = output.map.toString();
    return;
  }
  try {
    let oldMap;
    const flag = "base64,";
    const mapInfo = compiler.sourcemapComment.trim().replace(PREFIX_REG, "");
    const index = mapInfo.indexOf(flag);
    if (index > -1) {
      oldMap = JSON.parse(atob(mapInfo.slice(index + flag.length)));
    } else {
      const {
        filename,
        runtime: {
          loader,
          options: { scope }
        }
      } = compiler.options;
      const requestUrl = transformUrl(filename, mapInfo);
      const { code } = await loader.load({ scope, url: requestUrl });
      oldMap = JSON.parse(code);
    }
    output.map = oldMap && oldMap.mappings ? merge(oldMap, newMap) : output.map.toString();
  } catch (e) {
    output.map = output.map.toString();
    console.warn(e);
  }
}

// src/compiler/state.ts
import { base } from "acorn-walk";

// src/compiler/scope.ts
var Scope = class {
  constructor(node, parent) {
    this.labels = /* @__PURE__ */ new Map();
    this.globals = /* @__PURE__ */ Object.create(null);
    this.bindings = /* @__PURE__ */ Object.create(null);
    this.node = node;
    this.parent = parent;
  }
  checkBlockScopedCollisions(local, kind, name) {
    if (kind === "param")
      return;
    if (local.kind === "local")
      return;
    if (kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module" || local.kind === "param" && kind === "const") {
      throw new Error(`Duplicate declaration "${name}"`);
    }
  }
  registerLabel(node) {
    this.labels.set(node.label.name, node);
  }
  addGlobal(node) {
    this.globals[node.name] = node;
  }
  reference(name, node) {
    const binding = this.getBinding(name);
    if (binding) {
      binding.references.add(node);
    }
  }
  registerConstantViolation(name, node) {
    const binding = this.getBinding(name);
    if (binding) {
      binding.constantViolations.add(node);
    }
  }
  getBinding(name) {
    let scope = this;
    let previousNode;
    do {
      const binding = scope.bindings[name];
      if (binding) {
        if (isPattern(previousNode) && binding.kind !== "param" && binding.kind !== "local") {
        } else {
          return binding;
        }
      } else if (!binding && name === "arguments" && isFunction(scope.node) && isArrowFunctionExpression(scope.node)) {
        break;
      }
      previousNode = scope.node;
    } while (scope.parent && (scope = scope.parent));
  }
  registerBinding(kind, name, node) {
    if (!kind)
      throw new ReferenceError("no `kind`");
    const binding = this.bindings[name];
    if (binding) {
      if (binding.node === node)
        return;
      this.checkBlockScopedCollisions(binding, kind, name);
      this.registerConstantViolation(name, node);
    } else {
      this.bindings[name] = {
        kind,
        node,
        references: /* @__PURE__ */ new Set(),
        constantViolations: /* @__PURE__ */ new Set()
      };
    }
  }
  registerDeclaration(node) {
    if (isLabeledStatement(node)) {
      this.registerLabel(node);
    } else if (isFunctionDeclaration(node)) {
      node.id && this.registerBinding("hoisted", node.id.name, node);
    } else if (isVariableDeclaration(node)) {
      const { declarations } = node;
      for (const decl of declarations) {
        const ids = getBindingIdentifiers(decl.id);
        for (const { name } of ids) {
          this.registerBinding(node.kind, name, decl);
        }
      }
    } else if (isClassDeclaration(node)) {
      node.id && this.registerBinding("let", node.id.name, node);
    } else if (isImportDeclaration(node)) {
      const specifiers = node.specifiers;
      for (const specifier of specifiers) {
        this.registerBinding("module", specifier.local.name, specifier);
      }
    } else if (isExportDeclaration(node)) {
      const { declaration } = node;
      if (isClassDeclaration(declaration) || isFunctionDeclaration(declaration) || isVariableDeclaration(declaration)) {
        this.registerDeclaration(declaration);
      }
    } else {
      this.registerBinding("unknown", node.exported.name, node);
    }
  }
};

// src/compiler/collectorVisitor.ts
var collectorVisitor = {
  ForStatement(node, state) {
    const { init } = node;
    if (init && isVar(init)) {
      const scope = state.scopes.get(node);
      const parentScope = scope && (state.getFunctionParent(scope) || state.getProgramParent(scope));
      for (const decl of init.declarations) {
        const ids = state.getBindingIdentifiers(decl.id);
        for (const { name } of ids) {
          parentScope && parentScope.registerBinding("var", name, decl);
        }
      }
    }
  },
  Declaration(node, state) {
    if (isBlockScoped(node))
      return;
    if (isImportDeclaration(node))
      return;
    if (isExportDeclaration(node))
      return;
    const scope = state.scopes.get(node);
    const parent = scope && (state.getFunctionParent(scope) || state.getProgramParent(scope));
    parent && parent.registerDeclaration(node);
  },
  BlockScoped(node, state) {
    let scope = state.scopes.get(node);
    if (scope && scope.node === node)
      scope = scope.parent;
    const parent = scope && state.getBlockParent(scope);
    parent && parent.registerDeclaration(node);
  },
  ImportDeclaration(node, state) {
    const scope = state.scopes.get(node);
    const parent = scope && state.getBlockParent(scope);
    parent && parent.registerDeclaration(node);
  },
  Identifier(node, state, ancestors) {
    if (state.isReferenced(ancestors)) {
      const scope = state.scopes.get(node);
      scope && state.defer.references.add(() => {
        const ids = state.getBindingIdentifiers(node);
        return { scope, ids, type: "identifier" };
      });
    }
  },
  ForXStatement(node, state) {
    const scope = state.scopes.get(node);
    const { left } = node;
    if (isPattern(left) || isIdentifier(left)) {
      const ids = state.getBindingIdentifiers(left);
      for (const { name } of ids) {
        scope && scope.registerConstantViolation(name, node);
      }
    } else if (isVar(left)) {
      const parentScope = scope && (state.getFunctionParent(scope) || state.getProgramParent(scope));
      for (const decl of left.declarations) {
        const ids = state.getBindingIdentifiers(decl.id);
        for (const { name } of ids) {
          parentScope && parentScope.registerBinding("var", name, decl);
        }
      }
    }
  },
  ExportNamedDeclaration(node, state) {
    const { specifiers } = node;
    if (specifiers && specifiers.length > 0) {
      for (const { local } of specifiers) {
        const scope = state.scopes.get(node);
        scope && state.defer.references.add(() => {
          const ids = state.getBindingIdentifiers(local);
          return { scope, ids, type: "identifier" };
        });
      }
    }
  },
  ExportDeclaration(node, state) {
    if (isExportAllDeclaration(node))
      return;
    const { declaration } = node;
    const scope = state.scopes.get(node);
    if (declaration && (isClassDeclaration(declaration) || isFunctionDeclaration(declaration))) {
      const { id } = declaration;
      if (!id)
        return;
      const ids = state.getBindingIdentifiers(id);
      scope && state.defer.references.add(() => {
        return { ids, scope, type: "export" };
      });
    } else if (declaration && isVariableDeclaration(declaration)) {
      for (const decl of declaration.declarations) {
        scope && state.defer.references.add(() => {
          const ids = state.getBindingIdentifiers(decl.id);
          return { ids, scope, type: "export" };
        });
      }
    }
  },
  LabeledStatement(node, state) {
    const scope = state.scopes.get(node);
    if (scope) {
      const parent = state.getBlockParent(scope);
      parent.registerDeclaration(node);
    }
  },
  AssignmentExpression(node, state) {
    const scope = state.scopes.get(node);
    scope && state.defer.assignments.add(() => {
      return { scope, ids: state.getBindingIdentifiers(node.left) };
    });
  },
  UpdateExpression(node, state) {
    const scope = state.scopes.get(node);
    scope && state.defer.constantViolations.add(() => {
      return { scope, node: node.argument };
    });
  },
  UnaryExpression(node, state) {
    if (node.operator === "delete") {
      const scope = state.scopes.get(node);
      scope && state.defer.constantViolations.add(() => {
        return { scope, node: node.argument };
      });
    }
  },
  CatchClause(node, state) {
    const scope = state.scopes.get(node);
    const ids = node.param && state.getBindingIdentifiers(node.param);
    if (ids) {
      for (const { name } of ids) {
        scope && scope.registerBinding("let", name, node);
      }
    }
  },
  Function(node, state) {
    const { params } = node;
    const scope = state.scopes.get(node);
    for (const param of params) {
      const ids = state.getBindingIdentifiers(param);
      for (const { name } of ids) {
        scope && scope.registerBinding("param", name, param);
      }
    }
    if (isFunctionExpression(node) && node.id) {
      scope && scope.registerBinding("local", node.id.name, node);
    }
  },
  ClassExpression(node, state) {
    const { id } = node;
    const scope = state.scopes.get(node);
    if (id) {
      scope && scope.registerBinding("local", id.name, node);
    }
  }
};

// src/compiler/state.ts
var virtualTypes = {
  Declaration: isDeclaration,
  BlockScoped: isBlockScoped,
  ForXStatement: isForXStatement,
  ExportDeclaration: isExportDeclaration
};
var virtualTypesKeys = Object.keys(virtualTypes);
function getParentScope(scope, condition) {
  do {
    if (condition(scope.node)) {
      return scope;
    }
  } while (scope.parent && (scope = scope.parent));
  return null;
}
function execDeferQueue(state) {
  const programParent = state.programParent;
  state.defer.assignments.forEach((fn) => {
    const { ids, scope } = fn();
    for (const node of ids) {
      if (!scope.getBinding(node.name)) {
        programParent == null ? void 0 : programParent.addGlobal(node);
      }
      scope.registerConstantViolation(node.name, node);
    }
  });
  state.defer.references.forEach((fn) => {
    const { ids, type, scope } = fn();
    for (const node of ids) {
      const binding = scope.getBinding(node.name);
      if (binding) {
        binding.references.add(node);
      } else if (type === "identifier") {
        programParent == null ? void 0 : programParent.addGlobal(node);
      }
    }
  });
  state.defer.constantViolations.forEach((fn) => {
    const { node, scope } = fn();
    const ids = getBindingIdentifiers(node);
    for (const id of ids) {
      scope.registerConstantViolation(id.name, node);
    }
  });
}
function walk(node, visitors, state) {
  const ancestors = [];
  const call = (node2, st, override) => {
    const type = override || node2.type;
    const found = visitors[type];
    const isNew = node2 !== ancestors[ancestors.length - 1];
    const isCurrentNode = type === node2.type;
    const virtualFnKeys = virtualTypesKeys.filter((k) => virtualTypes[k](node2));
    if (isNew)
      ancestors.push(node2);
    if (isCurrentNode) {
      state.ancestors.set(node2, [...ancestors]);
      const parentNode = ancestors[ancestors.length - 2];
      let scope = state.scopes.get(parentNode);
      if (isProgram(node2) || isScope(node2, parentNode)) {
        scope = new Scope(node2, scope);
      }
      scope && state.scopes.set(node2, scope);
    }
    base[type](node2, st, call);
    if (found)
      found(node2, st || ancestors, ancestors);
    if (isCurrentNode && virtualFnKeys.length > 0) {
      for (const key of virtualFnKeys) {
        const fn = visitors[key];
        if (fn)
          fn(node2, st || ancestors, ancestors);
      }
    }
    if (isNew)
      ancestors.pop();
  };
  call(node, state);
}
function getBindingIdentifiers(node) {
  const f = (node2) => {
    if (isIdentifier(node2)) {
      return [node2];
    } else if (isArrayPattern(node2)) {
      return node2.elements.map((el) => f(el)).flat();
    } else if (isObjectPattern(node2)) {
      return node2.properties.map((p) => f(p.value)).flat();
    } else if (isAssignmentPattern(node2)) {
      return f(node2.left);
    } else if (isRestElement(node2)) {
      return f(node2.argument);
    } else {
      return [];
    }
  };
  return f(node);
}
function createState(ast) {
  const state = {
    scopes: /* @__PURE__ */ new WeakMap(),
    ancestors: /* @__PURE__ */ new WeakMap(),
    defer: {
      references: /* @__PURE__ */ new Set(),
      assignments: /* @__PURE__ */ new Set(),
      constantViolations: /* @__PURE__ */ new Set()
    },
    get programParent() {
      const scope = state.scopes.get(ast);
      return scope && this.getProgramParent(scope);
    },
    getBindingIdentifiers,
    getScopeByAncestors(ancestors) {
      let l = ancestors.length;
      while (~--l) {
        const scope = this.scopes.get(ancestors[l]);
        if (scope)
          return scope;
      }
    },
    getFunctionParent(scope) {
      return getParentScope(scope, isFunctionParent);
    },
    getProgramParent(scope) {
      const scopeRes = getParentScope(scope, isProgram);
      if (scopeRes)
        return scopeRes;
      throw new Error("Couldn't find a Program");
    },
    getBlockParent(scope) {
      const scopeRes = getParentScope(scope, isBlockParent);
      if (scopeRes)
        return scopeRes;
      throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
    },
    isReferenced(ancestors) {
      const l = ancestors.length;
      return isReferenced(ancestors[l - 1], ancestors[l - 2], ancestors[l - 3]);
    },
    remove(ancestors) {
      this.replaceWith(null, ancestors);
    },
    replaceWith(replacement, ancestors) {
      const l = ancestors.length;
      const node = ancestors[l - 1];
      if (node === replacement)
        return;
      const parent = ancestors[l - 2];
      const set = (obj, key) => {
        const isProp = isProperty(obj);
        if (replacement === null) {
          Array.isArray(obj) ? obj.splice(key, 1) : delete obj[key];
          if (isProp && obj.shorthand) {
            delete obj[key === "key" ? "value" : "key"];
          }
        } else {
          obj[key] = replacement;
          this.ancestors.set(replacement, ancestors);
          const scopeRes = this.scopes.get(node);
          scopeRes && this.scopes.set(replacement, scopeRes);
          if (isProp) {
            if (isIdentifier(obj.key) && isIdentifier(obj.value)) {
              if (obj.key.name !== obj.value.name) {
                obj.shorthand = false;
              }
            } else {
              obj.shorthand = false;
            }
          }
        }
      };
      for (const key in parent) {
        const child = parent[key];
        if (Array.isArray(child)) {
          const idx = child.indexOf(node);
          if (idx > -1)
            set(child, idx);
        } else {
          if (child === node) {
            set(parent, key);
          }
        }
      }
    }
  };
  walk(ast, collectorVisitor, state);
  execDeferQueue(state);
  return state;
}

// src/compiler/index.ts
var _Compiler = class {
  constructor(options) {
    this.moduleCount = 0;
    this.consumed = false;
    this.importInfos = [];
    this.exportInfos = [];
    this.deferQueue = {
      removes: /* @__PURE__ */ new Set(),
      replaces: /* @__PURE__ */ new Set(),
      importChecks: /* @__PURE__ */ new Set(),
      identifierRefs: /* @__PURE__ */ new Set(),
      exportNamespaces: /* @__PURE__ */ new Set()
    };
    this.options = options;
    this.ast = this.parse();
    this.state = createState(this.ast);
  }
  parse() {
    const parser = new Parser({
      locations: true,
      sourceType: "module",
      ecmaVersion: "latest",
      sourceFile: this.options.filename,
      onComment: (isBlock, text) => this.onParseComment(isBlock, text)
    }, this.options.code);
    try {
      return parser.parse();
    } catch (e) {
      e.message += `(${this.options.filename})`;
      throw e;
    }
  }
  onParseComment(isBlock, text) {
    if (haveSourcemap(text)) {
      this.sourcemapComment = text;
    }
  }
  checkImportNames(imports, moduleId) {
    const exports = this.getChildModuleExports(moduleId);
    if (exports) {
      imports.forEach((item) => {
        if (item.isNamespace)
          return;
        const checkName = item.isDefault ? "default" : item.name;
        if (!exports.includes(checkName)) {
          throw SyntaxError(`(${this.options.filename}): The module '${moduleId}' does not provide an export named '${checkName}'`);
        }
      });
    }
  }
  getChildModuleExports(moduleId) {
    const storeId = transformUrl2(this.options.storeId, moduleId);
    const output = this.options.runtime.resources[storeId];
    return output ? output.exports : null;
  }
  getImportInformation(node) {
    const imports = node.specifiers.map((n) => {
      const isDefault = isImportDefaultSpecifier(n);
      const isNamespace = isImportNamespaceSpecifier(n);
      const isSpecial = isDefault || isNamespace;
      const alias = isSpecial ? null : n.local.name;
      const name = isSpecial ? n.local.name : n.imported.name;
      return {
        name,
        isDefault,
        isNamespace,
        alias: alias === name ? null : alias
      };
    });
    return {
      imports,
      isExport: false,
      moduleId: node.source.value
    };
  }
  getImportInformationBySource(node) {
    var _a;
    const imports = (node.specifiers || []).map((n) => {
      const alias = n.exported.name;
      const name = n.local.name;
      return {
        name,
        alias: alias === name ? null : alias
      };
    });
    return {
      imports,
      isExport: true,
      moduleId: (_a = node.source) == null ? void 0 : _a.value
    };
  }
  generateImportTransformNode(moduleName, moduleId) {
    const varName = identifier(moduleName);
    const varExpr = callExpression(identifier(_Compiler.keys.__GARFISH_IMPORT__), [literal(moduleId)]);
    const varNode = variableDeclarator(varName, varExpr);
    return variableDeclaration("const", [varNode]);
  }
  generateIdentifierTransformNode(nameOrInfo) {
    let info;
    if (typeof nameOrInfo === "string") {
      for (const { data } of this.importInfos) {
        if (!data.isExport) {
          const result = this.findIndexInData(nameOrInfo, data);
          if (result) {
            info = result;
            break;
          }
        }
      }
    } else {
      info = nameOrInfo;
    }
    if (info && info.data) {
      const { i, data } = info;
      const item = data.imports[i];
      if (item.isNamespace) {
        return callExpression(identifier(_Compiler.keys.__GARFISH_NAMESPACE__), [
          identifier(data.moduleName)
        ]);
      } else {
        const propName = item.isDefault ? "default" : item.name;
        return memberExpression(identifier(data.moduleName), identifier(propName));
      }
    }
  }
  generateVirtualModuleSystem() {
    const exportNodes = this.exportInfos.map(({ name, refNode }) => {
      return objectProperty(identifier(name), arrowFunctionExpression([], refNode));
    });
    const exportCallExpression = callExpression(identifier(_Compiler.keys.__GARFISH_EXPORT__), [objectExpression(exportNodes)]);
    this.ast.body.unshift(exportCallExpression, ...new Set(this.importInfos.map((val) => val.transformNode)));
  }
  findIndexInData(refName, data) {
    for (let i = 0; i < data.imports.length; i++) {
      const { name, alias } = data.imports[i];
      if (refName === alias || refName === name) {
        return { i, data };
      }
    }
  }
  findImportInfo(moduleId) {
    for (const { data, transformNode } of this.importInfos) {
      if (data.moduleId === moduleId) {
        return [data.moduleName, transformNode];
      }
    }
    return [];
  }
  isReferencedModuleVariable(scope, node) {
    const u = () => Object.keys(scope.bindings).some((key) => {
      const { kind, references, constantViolations } = scope.bindings[key];
      if (kind === "module") {
        return references.has(node) || constantViolations.has(node);
      }
    });
    while (scope) {
      if (u())
        return true;
      if (scope.parent) {
        scope = scope.parent;
      } else {
        break;
      }
    }
    return false;
  }
  processExportSpecifiers(node, state, ancestors) {
    if (node.source) {
      const moduleId = node.source.value;
      const data = this.getImportInformationBySource(node);
      let [moduleName, transformNode] = this.findImportInfo(moduleId);
      if (!moduleName) {
        moduleName = `__m${this.moduleCount++}__`;
        transformNode = this.generateImportTransformNode(moduleName, moduleId);
      }
      data.moduleName = moduleName;
      transformNode && this.importInfos.push({ data, transformNode });
      this.deferQueue.importChecks.add(() => this.checkImportNames(data.imports, moduleId));
      node.specifiers.forEach((n) => {
        const useInfo = this.findIndexInData(n.local.name, data);
        const refNode = this.generateIdentifierTransformNode(useInfo);
        refNode && this.exportInfos.push({ refNode, name: n.exported.name });
      });
    } else {
      const scope = state.getScopeByAncestors(ancestors);
      node.specifiers.forEach((n) => {
        const refNode = scope && this.isReferencedModuleVariable(scope, n.local) ? this.generateIdentifierTransformNode(n.local.name) : identifier(n.local.name);
        refNode && this.exportInfos.push({ refNode, name: n.exported.name });
      });
    }
    this.deferQueue.removes.add(() => state.remove(ancestors));
  }
  processExportNamedDeclaration(node, state, ancestors) {
    const isDefault = isExportDefaultDeclaration(node);
    if (node.declaration) {
      const nodes = isVariableDeclaration(node.declaration) ? node.declaration.declarations : [node.declaration];
      nodes.forEach((node2) => {
        if (isDefault) {
          const name = "default";
          const refNode = identifier(_Compiler.keys.__GARFISH_DEFAULT__);
          this.exportInfos.push({ name, refNode });
        } else {
          const names = state.getBindingIdentifiers(node2.id);
          names.forEach(({ name }) => {
            this.exportInfos.push({ name, refNode: identifier(name) });
          });
        }
      });
      if (isDefault) {
        this.deferQueue.replaces.add(() => {
          const varName = identifier(_Compiler.keys.__GARFISH_DEFAULT__);
          const varNode = variableDeclarator(varName, node.declaration);
          state.replaceWith(variableDeclaration("const", [varNode]), ancestors);
        });
      } else if (node.declaration && isIdentifier(node.declaration)) {
        this.deferQueue.removes.add(() => state.remove(ancestors));
      } else {
        node.declaration && this.deferQueue.replaces.add(() => {
          node.declaration && state.replaceWith(node.declaration, ancestors);
        });
      }
    }
  }
  processExportAllDeclaration(node, state, ancestors) {
    var _a;
    const namespace = (_a = node.exported) == null ? void 0 : _a.name;
    const moduleId = node.source.value;
    const data = this.getImportInformationBySource(node);
    let [moduleName, transformNode] = this.findImportInfo(moduleId);
    if (!moduleName) {
      moduleName = `__m${this.moduleCount++}__`;
      transformNode = this.generateImportTransformNode(moduleName, moduleId);
    }
    data.moduleName = moduleName;
    transformNode && this.importInfos.push({ data, transformNode });
    this.deferQueue.removes.add(() => state.remove(ancestors));
    this.deferQueue.exportNamespaces.add({
      moduleId,
      namespace,
      fn: (names) => {
        names.forEach((name) => {
          let refNode;
          if (moduleName) {
            if (name === namespace) {
              refNode = callExpression(identifier(_Compiler.keys.__GARFISH_NAMESPACE__), [identifier(moduleName)]);
            } else {
              refNode = memberExpression(identifier(moduleName), identifier(name));
            }
          }
          this.exportInfos.push({ refNode, name });
        });
      }
    });
  }
  exportDeclarationVisitor(node, state, ancestors) {
    if (node.declaration) {
      this.processExportNamedDeclaration(node, state, [...ancestors]);
    } else if (node.specifiers) {
      this.processExportSpecifiers(node, state, [...ancestors]);
    } else if (isExportAllDeclaration(node)) {
      this.processExportAllDeclaration(node, state, [...ancestors]);
    }
  }
  identifierVisitor(node, state, ancestors) {
    const parent = ancestors[ancestors.length - 2];
    if (isExportSpecifier(parent))
      return;
    const scope = state.getScopeByAncestors(ancestors);
    if (scope && this.isReferencedModuleVariable(scope, node)) {
      ancestors = [...ancestors];
      this.deferQueue.identifierRefs.add(() => {
        const replacement = this.generateIdentifierTransformNode(node.name);
        if (replacement) {
          state.replaceWith(replacement, ancestors);
        }
      });
    }
  }
  importDeclarationVisitor(node, state, ancestors) {
    ancestors = [...ancestors];
    const moduleId = node.source.value;
    const data = this.getImportInformation(node);
    let [moduleName, transformNode] = this.findImportInfo(moduleId);
    if (!moduleName) {
      moduleName = `__m${this.moduleCount++}__`;
      transformNode = this.generateImportTransformNode(moduleName, moduleId);
    }
    data.moduleName = moduleName;
    transformNode && this.importInfos.push({ data, transformNode });
    this.deferQueue.removes.add(() => state.remove(ancestors));
    this.deferQueue.importChecks.add(() => this.checkImportNames(data.imports, moduleId));
  }
  importExpressionVisitor(node, state, ancestors) {
    const replacement = callExpression(identifier(_Compiler.keys.__GARFISH_DYNAMIC_IMPORT__), [node.source]);
    state.replaceWith(replacement, ancestors);
  }
  importMetaVisitor(node, state, ancestors) {
    if (node.meta.name === "import") {
      const replacement = memberExpression(identifier(_Compiler.keys.__GARFISH_IMPORT_META__), node.property);
      state.replaceWith(replacement, ancestors);
    }
  }
  async generateCode() {
    const nameCounts = {};
    const getExports = ({ namespace, moduleId }) => {
      return namespace ? [namespace] : this.getChildModuleExports(moduleId) || [];
    };
    this.deferQueue.exportNamespaces.forEach((val) => {
      getExports(val).forEach((name) => {
        if (!nameCounts[name]) {
          nameCounts[name] = 1;
        } else {
          nameCounts[name]++;
        }
      });
    });
    this.deferQueue.exportNamespaces.forEach((val) => {
      const exports = getExports(val).filter((name) => {
        if (name === "default")
          return false;
        if (nameCounts[name] > 1)
          return false;
        return this.exportInfos.every((val2) => val2.name !== name);
      });
      val.fn(exports);
    });
    this.deferQueue.importChecks.forEach((fn) => fn());
    this.deferQueue.identifierRefs.forEach((fn) => fn());
    this.deferQueue.replaces.forEach((fn) => fn());
    this.deferQueue.removes.forEach((fn) => fn());
    this.generateVirtualModuleSystem();
    const output = generate(this.ast, {
      sourceMapWithCode: true,
      sourceMap: this.options.filename,
      sourceContent: this.options.code
    });
    await mergeSourcemap(this, output);
    return output;
  }
  transform() {
    if (this.consumed) {
      throw new Error("Already consumed");
    }
    this.consumed = true;
    const that = this;
    const c = (fn) => {
      return function() {
        fn.apply(that, arguments);
      };
    };
    ancestor(this.ast, {
      Identifier: c(this.identifierVisitor),
      VariablePattern: c(this.identifierVisitor),
      MetaProperty: c(this.importMetaVisitor),
      ImportExpression: c(this.importExpressionVisitor),
      ImportDeclaration: c(this.importDeclarationVisitor),
      ExportAllDeclaration: c(this.exportDeclarationVisitor),
      ExportNamedDeclaration: c(this.exportDeclarationVisitor),
      ExportDefaultDeclaration: c(this.exportDeclarationVisitor)
    }, void 0, this.state);
    return {
      generateCode: () => this.generateCode(),
      exports: this.exportInfos.map((v) => v.name),
      imports: this.importInfos.map((v) => v.data)
    };
  }
};
var Compiler = _Compiler;
Compiler.keys = {
  __GARFISH_IMPORT__: "__GARFISH_IMPORT__",
  __GARFISH_EXPORT__: "__GARFISH_EXPORT__",
  __GARFISH_DEFAULT__: "__GARFISH_DEFAULT__",
  __GARFISH_WRAPPER__: "__GARFISH_WRAPPER__",
  __GARFISH_NAMESPACE__: "__GARFISH_NAMESPACE__",
  __GARFISH_IMPORT_META__: "__GARFISH_IMPORT_META__",
  __GARFISH_DYNAMIC_IMPORT__: "__GARFISH_DYNAMIC_IMPORT__"
};

// src/module.ts
function Module() {
}
function createModule(memoryModule) {
  const module = new Module();
  Object.setPrototypeOf(module, null);
  Object.defineProperty(module, Symbol.toStringTag, {
    value: "Module",
    writable: false,
    enumerable: false,
    configurable: false
  });
  Object.keys(memoryModule).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(memoryModule, key);
    if (!descriptor) {
      throw TypeError(`can't get ${key} descriptor`);
    }
    const getter = descriptor.get;
    Object.defineProperty(module, key, {
      enumerable: true,
      configurable: false,
      get: getter,
      set: () => {
        throw TypeError(`Cannot assign to read only property '${key}' of object '[object Module]`);
      }
    });
  });
  Object.seal(module);
  return module;
}
function createImportMeta(url) {
  const metaObject = /* @__PURE__ */ Object.create(null);
  const set = (key, value) => {
    Object.defineProperty(metaObject, key, {
      value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  };
  set("url", url);
  set("__garfishPolyfill__", true);
  return { meta: metaObject };
}

// src/runtime.ts
var Runtime = class {
  constructor(options) {
    this.modules = /* @__PURE__ */ new WeakMap();
    this.memoryModules = {};
    this.resources = {};
    const defaultOptions = {
      scope: "default",
      loaderOptions: {}
    };
    this.options = isPlainObject(options) ? deepMerge(defaultOptions, options) : defaultOptions;
    this.loader = new Loader(this.options.loaderOptions);
  }
  execCode(output, memoryModule) {
    const provider = this.generateProvider(output, memoryModule);
    if (this.options.execCode) {
      this.options.execCode(output, provider);
    } else {
      const sourcemap = `
//@ sourceMappingURL=${output.map}`;
      const code = `${output.code}
//${output.storeId}${sourcemap}`;
      evalWithEnv(code, provider, void 0, true);
    }
  }
  importModule(storeId, requestUrl) {
    let memoryModule = this.memoryModules[storeId];
    if (!memoryModule) {
      const get = () => {
        const output = this.resources[storeId];
        if (!output) {
          throw new Error(`Module '${storeId}' not found`);
        }
        memoryModule = this.memoryModules[storeId] = {};
        this.execCode(output, memoryModule);
        return memoryModule;
      };
      if (requestUrl) {
        const res = this.compileAndFetchCode(storeId, requestUrl);
        if (isPromise(res))
          return res.then(() => get());
      }
      return get();
    }
    return memoryModule;
  }
  getModule(memoryModule) {
    if (!this.modules.has(memoryModule)) {
      this.modules.set(memoryModule, createModule(memoryModule));
    }
    return this.modules.get(memoryModule);
  }
  generateProvider(output, memoryModule) {
    return {
      [Compiler.keys.__GARFISH_IMPORT_META__]: createImportMeta(output.realUrl),
      [Compiler.keys.__GARFISH_NAMESPACE__]: (memoryModule2) => {
        return this.getModule(memoryModule2);
      },
      [Compiler.keys.__GARFISH_IMPORT__]: (moduleId) => {
        const storeId = transformUrl3(output.storeId, moduleId);
        return this.import(storeId);
      },
      [Compiler.keys.__GARFISH_DYNAMIC_IMPORT__]: (moduleId) => {
        const storeId = transformUrl3(output.storeId, moduleId);
        const requestUrl = transformUrl3(output.realUrl, moduleId);
        return this.importByUrl(storeId, requestUrl);
      },
      [Compiler.keys.__GARFISH_EXPORT__]: (exportObject) => {
        Object.keys(exportObject).forEach((key) => {
          Object.defineProperty(memoryModule, key, {
            enumerable: true,
            get: exportObject[key],
            set: () => {
              throw new TypeError("Assignment to constant variable.");
            }
          });
        });
      }
    };
  }
  async analysisModule(code, storeId, baseRealUrl) {
    const compiler = new Compiler({
      code,
      storeId,
      runtime: this,
      filename: storeId
    });
    const { imports, exports, generateCode } = compiler.transform();
    await Promise.all(imports.map(({ moduleId }) => {
      const curStoreId = transformUrl3(storeId, moduleId);
      const requestUrl = transformUrl3(baseRealUrl, moduleId);
      return this.resources[curStoreId] ? null : this.compileAndFetchCode(curStoreId, requestUrl);
    }));
    const output = await generateCode();
    output.map = await toBase64(output.map);
    output.storeId = storeId;
    output.realUrl = baseRealUrl;
    output.exports = exports;
    return output;
  }
  compileAndFetchCode(storeId, url) {
    if (this.resources[storeId])
      return;
    if (!url)
      url = storeId;
    const p = this.loader.load({ scope: this.options.scope, url }).then(async ({ resourceManager }) => {
      if (resourceManager) {
        const { url: url2, scriptCode } = resourceManager;
        if (scriptCode) {
          assert(url2, "url is required");
          const output = await this.analysisModule(scriptCode, storeId, url2);
          this.resources[storeId] = output;
        } else {
          delete this.resources[storeId];
        }
      } else {
        warn(`Module '${storeId}' not found`);
      }
    });
    this.resources[storeId] = p;
    return p;
  }
  import(storeId) {
    return this.importModule(storeId);
  }
  importByUrl(storeId, requestUrl) {
    const result = this.importModule(storeId, requestUrl || storeId);
    return Promise.resolve(result).then((memoryModule) => {
      return this.getModule(memoryModule);
    });
  }
  async importByCode(code, storeId, metaUrl) {
    if (!metaUrl)
      metaUrl = storeId;
    const memoryModule = {};
    const output = await this.analysisModule(code, storeId, metaUrl);
    this.execCode(output, memoryModule);
    return this.getModule(memoryModule);
  }
};

// src/pluginify.ts
import { evalWithEnv as evalWithEnv2 } from "@garfish/utils";
function GarfishEsModule(options = {}) {
  return function(Garfish) {
    const appModules = {};
    const { excludes } = options;
    const disable = (appId, appName, appInfo) => {
      var _a;
      if (appModules[appId])
        return true;
      if (Array.isArray(excludes))
        return excludes.includes(appName);
      if (typeof excludes === "function")
        return excludes(appName);
      if (appInfo.sandbox === false || ((_a = appInfo == null ? void 0 : appInfo.sandbox) == null ? void 0 : _a.open) === false) {
        return true;
      }
      return false;
    };
    return {
      name: "es-module",
      afterLoad(appInfo, appInstance) {
        if (!appInstance)
          return;
        const { appId, name } = appInstance;
        if (!disable(appId, name, appInfo)) {
          const sandbox = appInstance.vmSandbox;
          const runtime = new Runtime({ scope: name });
          appModules[appId] = runtime;
          runtime.loader = Garfish.loader;
          appInstance.runCode = function(code, env, url, options2) {
            const appEnv = appInstance.getExecScriptEnv(options2 == null ? void 0 : options2.noEntry);
            Object.assign(env, appEnv);
            if (options2 == null ? void 0 : options2.isModule) {
              const codeRef = { code };
              runtime.options.execCode = function(output, provider) {
                const sourcemap = `
//@ sourceMappingURL=${output.map}`;
                Object.assign(env, provider);
                codeRef.code = `(() => {'use strict';${output.code}})()`;
                sandbox == null ? void 0 : sandbox.hooks.lifecycle.beforeInvoke.emit(codeRef, url, env, options2);
                try {
                  const params = sandbox == null ? void 0 : sandbox.createExecParams(codeRef, env);
                  const code2 = `${codeRef.code}
//${output.storeId}${sourcemap}`;
                  evalWithEnv2(code2, params || {}, void 0, false);
                } catch (e) {
                  sandbox == null ? void 0 : sandbox.processExecError(e, url, env, options2);
                }
                sandbox == null ? void 0 : sandbox.hooks.lifecycle.afterInvoke.emit(codeRef, url, env, options2);
              };
              if (url) {
                appInstance.esmQueue.add(async (next) => {
                  options2.isInline ? await runtime.importByCode(codeRef.code, url) : await runtime.importByUrl(url, url);
                  next();
                });
              }
            } else {
              sandbox == null ? void 0 : sandbox.execScript(code, env, url, options2);
            }
          };
        }
      },
      afterUnmount(appInfo, appInstance, isCacheMode) {
        if (!isCacheMode) {
          appModules[appInstance.appId] = null;
        }
      }
    };
  };
}
export {
  GarfishEsModule,
  Runtime as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3J1bnRpbWUudHMiLCAiLi4vLi4vc3JjL2NvbXBpbGVyL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9jb21waWxlci90eXBlcy50cyIsICIuLi8uLi9zcmMvY29tcGlsZXIvZ2VuZXJhdGVkLnRzIiwgIi4uLy4uL3NyYy9jb21waWxlci9tZXJnZU1hcC50cyIsICIuLi8uLi9zcmMvY29tcGlsZXIvc3RhdGUudHMiLCAiLi4vLi4vc3JjL2NvbXBpbGVyL3Njb3BlLnRzIiwgIi4uLy4uL3NyYy9jb21waWxlci9jb2xsZWN0b3JWaXNpdG9yLnRzIiwgIi4uLy4uL3NyYy9tb2R1bGUudHMiLCAiLi4vLi4vc3JjL3BsdWdpbmlmeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcbiAgdG9CYXNlNjQsXG4gIGRlZXBNZXJnZSxcbiAgaXNQcm9taXNlLFxuICBpc1BsYWluT2JqZWN0LFxuICBldmFsV2l0aEVudixcbiAgdHJhbnNmb3JtVXJsLFxuICB3YXJuLFxuICBhc3NlcnQsXG59IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB7IExvYWRlciwgTG9hZGVyT3B0aW9ucywgSmF2YVNjcmlwdE1hbmFnZXIgfSBmcm9tICdAZ2FyZmlzaC9sb2FkZXInO1xuaW1wb3J0IHsgT3V0cHV0LCBDb21waWxlciB9IGZyb20gJy4vY29tcGlsZXInO1xuaW1wb3J0IHsgTW9kdWxlLCBNZW1vcnlNb2R1bGUsIGNyZWF0ZU1vZHVsZSwgY3JlYXRlSW1wb3J0TWV0YSB9IGZyb20gJy4vbW9kdWxlJztcblxuZXhwb3J0IHR5cGUgTW9kdWxlUmVzb3VyY2UgPSBPdXRwdXQgJiB7XG4gIHN0b3JlSWQ6IHN0cmluZztcbiAgcmVhbFVybDogc3RyaW5nO1xuICBleHBvcnRzOiBBcnJheTxzdHJpbmc+O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBSdW50aW1lT3B0aW9ucyB7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIGxvYWRlck9wdGlvbnM/OiBMb2FkZXJPcHRpb25zO1xuICBleGVjQ29kZT86IChcbiAgICBvdXRwdXQ6IE1vZHVsZVJlc291cmNlLFxuICAgIHByb3ZpZGVyOiBSZXR1cm5UeXBlPFJ1bnRpbWVbJ2dlbmVyYXRlUHJvdmlkZXInXT4sXG4gICkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFJ1bnRpbWUge1xuICBwcml2YXRlIG1vZHVsZXMgPSBuZXcgV2Vha01hcDxNZW1vcnlNb2R1bGUsIE1vZHVsZT4oKTtcbiAgcHJpdmF0ZSBtZW1vcnlNb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCBNZW1vcnlNb2R1bGU+ID0ge307XG4gIHB1YmxpYyBsb2FkZXI6IExvYWRlcjtcbiAgcHVibGljIG9wdGlvbnM6IFJ1bnRpbWVPcHRpb25zO1xuICBwdWJsaWMgcmVzb3VyY2VzOiBSZWNvcmQ8c3RyaW5nLCBNb2R1bGVSZXNvdXJjZSB8IFByb21pc2U8dm9pZD4+ID0ge307XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IFJ1bnRpbWVPcHRpb25zKSB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBzY29wZTogJ2RlZmF1bHQnLFxuICAgICAgbG9hZGVyT3B0aW9uczoge30sXG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMpXG4gICAgICA/IGRlZXBNZXJnZShkZWZhdWx0T3B0aW9ucywgb3B0aW9ucylcbiAgICAgIDogZGVmYXVsdE9wdGlvbnM7XG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMub3B0aW9ucy5sb2FkZXJPcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY0NvZGUob3V0cHV0OiBNb2R1bGVSZXNvdXJjZSwgbWVtb3J5TW9kdWxlOiBNZW1vcnlNb2R1bGUpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuZ2VuZXJhdGVQcm92aWRlcihvdXRwdXQsIG1lbW9yeU1vZHVsZSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmV4ZWNDb2RlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZXhlY0NvZGUob3V0cHV0LCBwcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNvdXJjZW1hcCA9IGBcXG4vL0Agc291cmNlTWFwcGluZ1VSTD0ke291dHB1dC5tYXB9YDtcbiAgICAgIGNvbnN0IGNvZGUgPSBgJHtvdXRwdXQuY29kZX1cXG4vLyR7b3V0cHV0LnN0b3JlSWR9JHtzb3VyY2VtYXB9YDtcbiAgICAgIGV2YWxXaXRoRW52KGNvZGUsIHByb3ZpZGVyLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW1wb3J0TW9kdWxlKFxuICAgIHN0b3JlSWQ6IHN0cmluZyxcbiAgICByZXF1ZXN0VXJsPzogc3RyaW5nLFxuICApOiBNZW1vcnlNb2R1bGUgfCBQcm9taXNlPE1lbW9yeU1vZHVsZT4ge1xuICAgIGxldCBtZW1vcnlNb2R1bGUgPSB0aGlzLm1lbW9yeU1vZHVsZXNbc3RvcmVJZF07XG4gICAgaWYgKCFtZW1vcnlNb2R1bGUpIHtcbiAgICAgIGNvbnN0IGdldCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5yZXNvdXJjZXNbc3RvcmVJZF0gYXMgTW9kdWxlUmVzb3VyY2U7XG4gICAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgJyR7c3RvcmVJZH0nIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgICAgIG1lbW9yeU1vZHVsZSA9IHRoaXMubWVtb3J5TW9kdWxlc1tzdG9yZUlkXSA9IHt9O1xuICAgICAgICB0aGlzLmV4ZWNDb2RlKG91dHB1dCwgbWVtb3J5TW9kdWxlKTtcbiAgICAgICAgcmV0dXJuIG1lbW9yeU1vZHVsZTtcbiAgICAgIH07XG4gICAgICBpZiAocmVxdWVzdFVybCkge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbXBpbGVBbmRGZXRjaENvZGUoc3RvcmVJZCwgcmVxdWVzdFVybCk7XG4gICAgICAgIGlmIChpc1Byb21pc2UocmVzKSkgcmV0dXJuIHJlcy50aGVuKCgpID0+IGdldCgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW9yeU1vZHVsZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TW9kdWxlKG1lbW9yeU1vZHVsZTogTWVtb3J5TW9kdWxlKSB7XG4gICAgaWYgKCF0aGlzLm1vZHVsZXMuaGFzKG1lbW9yeU1vZHVsZSkpIHtcbiAgICAgIHRoaXMubW9kdWxlcy5zZXQobWVtb3J5TW9kdWxlLCBjcmVhdGVNb2R1bGUobWVtb3J5TW9kdWxlKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZ2V0KG1lbW9yeU1vZHVsZSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUHJvdmlkZXIob3V0cHV0OiBNb2R1bGVSZXNvdXJjZSwgbWVtb3J5TW9kdWxlOiBNZW1vcnlNb2R1bGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW0NvbXBpbGVyLmtleXMuX19HQVJGSVNIX0lNUE9SVF9NRVRBX19dOiBjcmVhdGVJbXBvcnRNZXRhKG91dHB1dC5yZWFsVXJsKSxcblxuICAgICAgW0NvbXBpbGVyLmtleXMuX19HQVJGSVNIX05BTUVTUEFDRV9fXTogKG1lbW9yeU1vZHVsZTogTWVtb3J5TW9kdWxlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1vZHVsZShtZW1vcnlNb2R1bGUpO1xuICAgICAgfSxcblxuICAgICAgW0NvbXBpbGVyLmtleXMuX19HQVJGSVNIX0lNUE9SVF9fXTogKG1vZHVsZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3Qgc3RvcmVJZCA9IHRyYW5zZm9ybVVybChvdXRwdXQuc3RvcmVJZCwgbW9kdWxlSWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbXBvcnQoc3RvcmVJZCk7XG4gICAgICB9LFxuXG4gICAgICBbQ29tcGlsZXIua2V5cy5fX0dBUkZJU0hfRFlOQU1JQ19JTVBPUlRfX106IChtb2R1bGVJZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0b3JlSWQgPSB0cmFuc2Zvcm1Vcmwob3V0cHV0LnN0b3JlSWQsIG1vZHVsZUlkKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdFVybCA9IHRyYW5zZm9ybVVybChvdXRwdXQucmVhbFVybCwgbW9kdWxlSWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbXBvcnRCeVVybChzdG9yZUlkLCByZXF1ZXN0VXJsKTtcbiAgICAgIH0sXG5cbiAgICAgIFtDb21waWxlci5rZXlzLl9fR0FSRklTSF9FWFBPUlRfX106IChcbiAgICAgICAgZXhwb3J0T2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCAoKSA9PiBhbnk+LFxuICAgICAgKSA9PiB7XG4gICAgICAgIE9iamVjdC5rZXlzKGV4cG9ydE9iamVjdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lbW9yeU1vZHVsZSwga2V5LCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBleHBvcnRPYmplY3Rba2V5XSxcbiAgICAgICAgICAgIHNldDogKCkgPT4ge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBc3NpZ25tZW50IHRvIGNvbnN0YW50IHZhcmlhYmxlLicpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFuYWx5c2lzTW9kdWxlKFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBzdG9yZUlkOiBzdHJpbmcsXG4gICAgYmFzZVJlYWxVcmw6IHN0cmluZyxcbiAgKSB7XG4gICAgY29uc3QgY29tcGlsZXIgPSBuZXcgQ29tcGlsZXIoe1xuICAgICAgY29kZSxcbiAgICAgIHN0b3JlSWQsXG4gICAgICBydW50aW1lOiB0aGlzLFxuICAgICAgZmlsZW5hbWU6IHN0b3JlSWQsXG4gICAgfSk7XG4gICAgY29uc3QgeyBpbXBvcnRzLCBleHBvcnRzLCBnZW5lcmF0ZUNvZGUgfSA9IGNvbXBpbGVyLnRyYW5zZm9ybSgpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpbXBvcnRzLm1hcCgoeyBtb2R1bGVJZCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGN1clN0b3JlSWQgPSB0cmFuc2Zvcm1Vcmwoc3RvcmVJZCwgbW9kdWxlSWQpO1xuICAgICAgICBjb25zdCByZXF1ZXN0VXJsID0gdHJhbnNmb3JtVXJsKGJhc2VSZWFsVXJsLCBtb2R1bGVJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlc1tjdXJTdG9yZUlkXVxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDogdGhpcy5jb21waWxlQW5kRmV0Y2hDb2RlKGN1clN0b3JlSWQsIHJlcXVlc3RVcmwpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGdlbmVyYXRlQ29kZSgpO1xuICAgIG91dHB1dC5tYXAgPSBhd2FpdCB0b0Jhc2U2NChvdXRwdXQubWFwKTtcbiAgICAob3V0cHV0IGFzIE1vZHVsZVJlc291cmNlKS5zdG9yZUlkID0gc3RvcmVJZDtcbiAgICAob3V0cHV0IGFzIE1vZHVsZVJlc291cmNlKS5yZWFsVXJsID0gYmFzZVJlYWxVcmw7XG4gICAgKG91dHB1dCBhcyBNb2R1bGVSZXNvdXJjZSkuZXhwb3J0cyA9IGV4cG9ydHM7XG4gICAgcmV0dXJuIG91dHB1dCBhcyBNb2R1bGVSZXNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGlsZUFuZEZldGNoQ29kZShcbiAgICBzdG9yZUlkOiBzdHJpbmcsXG4gICAgdXJsPzogc3RyaW5nLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMucmVzb3VyY2VzW3N0b3JlSWRdKSByZXR1cm47XG4gICAgaWYgKCF1cmwpIHVybCA9IHN0b3JlSWQ7XG5cbiAgICBjb25zdCBwID0gdGhpcy5sb2FkZXJcbiAgICAgIC5sb2FkPEphdmFTY3JpcHRNYW5hZ2VyPih7IHNjb3BlOiB0aGlzLm9wdGlvbnMuc2NvcGUsIHVybCB9KVxuICAgICAgLnRoZW4oYXN5bmMgKHsgcmVzb3VyY2VNYW5hZ2VyIH0pID0+IHtcbiAgICAgICAgaWYgKHJlc291cmNlTWFuYWdlcikge1xuICAgICAgICAgIGNvbnN0IHsgdXJsLCBzY3JpcHRDb2RlIH0gPSByZXNvdXJjZU1hbmFnZXI7XG5cbiAgICAgICAgICBpZiAoc2NyaXB0Q29kZSkge1xuICAgICAgICAgICAgYXNzZXJ0KHVybCwgJ3VybCBpcyByZXF1aXJlZCcpO1xuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5hbmFseXNpc01vZHVsZShzY3JpcHRDb2RlLCBzdG9yZUlkLCB1cmwpO1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNbc3RvcmVJZF0gPSBvdXRwdXQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlc291cmNlc1tzdG9yZUlkXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FybihgTW9kdWxlICcke3N0b3JlSWR9JyBub3QgZm91bmRgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5yZXNvdXJjZXNbc3RvcmVJZF0gPSBwO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgaW1wb3J0KHN0b3JlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmltcG9ydE1vZHVsZShzdG9yZUlkKSBhcyBNZW1vcnlNb2R1bGU7XG4gIH1cblxuICBpbXBvcnRCeVVybChzdG9yZUlkOiBzdHJpbmcsIHJlcXVlc3RVcmw/OiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmltcG9ydE1vZHVsZShzdG9yZUlkLCByZXF1ZXN0VXJsIHx8IHN0b3JlSWQpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKChtZW1vcnlNb2R1bGUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmdldE1vZHVsZShtZW1vcnlNb2R1bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaW1wb3J0QnlDb2RlKGNvZGU6IHN0cmluZywgc3RvcmVJZDogc3RyaW5nLCBtZXRhVXJsPzogc3RyaW5nKSB7XG4gICAgaWYgKCFtZXRhVXJsKSBtZXRhVXJsID0gc3RvcmVJZDtcbiAgICBjb25zdCBtZW1vcnlNb2R1bGUgPSB7fTtcbiAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCB0aGlzLmFuYWx5c2lzTW9kdWxlKGNvZGUsIHN0b3JlSWQsIG1ldGFVcmwpO1xuICAgIHRoaXMuZXhlY0NvZGUob3V0cHV0IGFzIE1vZHVsZVJlc291cmNlLCBtZW1vcnlNb2R1bGUpO1xuICAgIHJldHVybiB0aGlzLmdldE1vZHVsZShtZW1vcnlNb2R1bGUpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgYW5jZXN0b3IgfSBmcm9tICdhY29ybi13YWxrJztcbmltcG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnZXNjb2RlZ2VuJztcbmltcG9ydCB7IFBhcnNlciwgTm9kZSBhcyBBY29ybk5vZGUgfSBmcm9tICdhY29ybic7XG5pbXBvcnQgeyB0cmFuc2Zvcm1VcmwsIGhhdmVTb3VyY2VtYXAgfSBmcm9tICdAZ2FyZmlzaC91dGlscyc7XG5pbXBvcnQgdHlwZSB7XG4gIE5vZGUsXG4gIFByb2dyYW0sXG4gIElkZW50aWZpZXIsXG4gIEV4cHJlc3Npb24sXG4gIE1ldGFQcm9wZXJ0eSxcbiAgQ2FsbEV4cHJlc3Npb24sXG4gIE1lbWJlckV4cHJlc3Npb24sXG4gIFZhcmlhYmxlRGVjbGFyYXRpb24sXG4gIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbixcbiAgSW1wb3J0U3BlY2lmaWVyLFxuICBJbXBvcnRFeHByZXNzaW9uLFxuICBJbXBvcnREZWNsYXJhdGlvbixcbiAgRXhwb3J0QWxsRGVjbGFyYXRpb24sXG4gIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24sXG59IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQge1xuICBpc0lkZW50aWZpZXIsXG4gIGlzVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgaXNFeHBvcnRTcGVjaWZpZXIsXG4gIGlzRXhwb3J0QWxsRGVjbGFyYXRpb24sXG4gIGlzRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uLFxuICBpc0ltcG9ydERlZmF1bHRTcGVjaWZpZXIsXG4gIGlzSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7XG4gIGxpdGVyYWwsXG4gIGlkZW50aWZpZXIsXG4gIGNhbGxFeHByZXNzaW9uLFxuICBvYmplY3RQcm9wZXJ0eSxcbiAgb2JqZWN0RXhwcmVzc2lvbixcbiAgbWVtYmVyRXhwcmVzc2lvbixcbiAgYXJyb3dGdW5jdGlvbkV4cHJlc3Npb24sXG4gIHZhcmlhYmxlRGVjbGFyYXRvcixcbiAgdmFyaWFibGVEZWNsYXJhdGlvbixcbn0gZnJvbSAnLi9nZW5lcmF0ZWQnO1xuaW1wb3J0IHR5cGUgeyBTY29wZSB9IGZyb20gJy4vc2NvcGUnO1xuaW1wb3J0IHsgbWVyZ2VTb3VyY2VtYXAgfSBmcm9tICcuL21lcmdlTWFwJztcbmltcG9ydCB7IFN0YXRlLCBjcmVhdGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgUnVudGltZSwgTW9kdWxlUmVzb3VyY2UgfSBmcm9tICcuLi9ydW50aW1lJztcblxudHlwZSBJbXBvcnRJbmZvRGF0YSA9IChcbiAgfCBSZXR1cm5UeXBlPENvbXBpbGVyWydnZXRJbXBvcnRJbmZvcm1hdGlvbiddPlxuICB8IFJldHVyblR5cGU8Q29tcGlsZXJbJ2dldEltcG9ydEluZm9ybWF0aW9uQnlTb3VyY2UnXT5cbikgJiB7XG4gIG1vZHVsZU5hbWU6IHN0cmluZztcbn07XG5cbnR5cGUgSW1wb3J0VHJhbnNmb3JtTm9kZSA9IFJldHVyblR5cGU8Q29tcGlsZXJbJ2dlbmVyYXRlSW1wb3J0VHJhbnNmb3JtTm9kZSddPjtcblxuaW50ZXJmYWNlIENvbXBpbGVyT3B0aW9ucyB7XG4gIGNvZGU6IHN0cmluZztcbiAgc3RvcmVJZDogc3RyaW5nO1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICBydW50aW1lOiBSdW50aW1lO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dCB7XG4gIG1hcDogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlciB7XG4gIHN0YXRpYyBrZXlzID0ge1xuICAgIF9fR0FSRklTSF9JTVBPUlRfXzogJ19fR0FSRklTSF9JTVBPUlRfXycsXG4gICAgX19HQVJGSVNIX0VYUE9SVF9fOiAnX19HQVJGSVNIX0VYUE9SVF9fJyxcbiAgICBfX0dBUkZJU0hfREVGQVVMVF9fOiAnX19HQVJGSVNIX0RFRkFVTFRfXycsXG4gICAgX19HQVJGSVNIX1dSQVBQRVJfXzogJ19fR0FSRklTSF9XUkFQUEVSX18nLFxuICAgIF9fR0FSRklTSF9OQU1FU1BBQ0VfXzogJ19fR0FSRklTSF9OQU1FU1BBQ0VfXycsXG4gICAgX19HQVJGSVNIX0lNUE9SVF9NRVRBX186ICdfX0dBUkZJU0hfSU1QT1JUX01FVEFfXycsXG4gICAgX19HQVJGSVNIX0RZTkFNSUNfSU1QT1JUX186ICdfX0dBUkZJU0hfRFlOQU1JQ19JTVBPUlRfXycsXG4gIH07XG5cbiAgcHJpdmF0ZSBhc3Q6IFByb2dyYW07XG4gIHByaXZhdGUgc3RhdGU6IFJldHVyblR5cGU8dHlwZW9mIGNyZWF0ZVN0YXRlPjtcblxuICBwcml2YXRlIG1vZHVsZUNvdW50ID0gMDtcbiAgcHJpdmF0ZSBjb25zdW1lZCA9IGZhbHNlO1xuICBwcml2YXRlIGltcG9ydEluZm9zOiBBcnJheTx7XG4gICAgZGF0YTogSW1wb3J0SW5mb0RhdGE7XG4gICAgdHJhbnNmb3JtTm9kZTogSW1wb3J0VHJhbnNmb3JtTm9kZTtcbiAgfT4gPSBbXTtcbiAgcHJpdmF0ZSBleHBvcnRJbmZvczogQXJyYXk8e1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZWZOb2RlOiBJZGVudGlmaWVyIHwgQ2FsbEV4cHJlc3Npb24gfCBNZW1iZXJFeHByZXNzaW9uO1xuICB9PiA9IFtdO1xuICBwcml2YXRlIGRlZmVyUXVldWUgPSB7XG4gICAgcmVtb3ZlczogbmV3IFNldDwoKSA9PiB2b2lkPigpLFxuICAgIHJlcGxhY2VzOiBuZXcgU2V0PCgpID0+IHZvaWQ+KCksXG4gICAgaW1wb3J0Q2hlY2tzOiBuZXcgU2V0PCgpID0+IHZvaWQ+KCksXG4gICAgaWRlbnRpZmllclJlZnM6IG5ldyBTZXQ8KCkgPT4gdm9pZD4oKSxcbiAgICBleHBvcnROYW1lc3BhY2VzOiBuZXcgU2V0PHtcbiAgICAgIG1vZHVsZUlkOiBzdHJpbmc7XG4gICAgICBuYW1lc3BhY2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIGZuOiAobmFtZXM6IEFycmF5PHN0cmluZz4pID0+IHZvaWQ7XG4gICAgfT4oKSxcbiAgfTtcblxuICBwdWJsaWMgb3B0aW9uczogQ29tcGlsZXJPcHRpb25zO1xuICBwdWJsaWMgc291cmNlbWFwQ29tbWVudDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5hc3QgPSB0aGlzLnBhcnNlKCk7XG4gICAgdGhpcy5zdGF0ZSA9IGNyZWF0ZVN0YXRlKHRoaXMuYXN0KTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2UoKSB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcihcbiAgICAgIHtcbiAgICAgICAgbG9jYXRpb25zOiB0cnVlLFxuICAgICAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcbiAgICAgICAgZWNtYVZlcnNpb246ICdsYXRlc3QnLFxuICAgICAgICBzb3VyY2VGaWxlOiB0aGlzLm9wdGlvbnMuZmlsZW5hbWUsXG4gICAgICAgIG9uQ29tbWVudDogKGlzQmxvY2ssIHRleHQpID0+IHRoaXMub25QYXJzZUNvbW1lbnQoaXNCbG9jaywgdGV4dCksXG4gICAgICB9LFxuICAgICAgdGhpcy5vcHRpb25zLmNvZGUsXG4gICAgKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHBhcnNlci5wYXJzZSgpIGFzIHVua25vd24gYXMgUHJvZ3JhbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLm1lc3NhZ2UgKz0gYCgke3RoaXMub3B0aW9ucy5maWxlbmFtZX0pYDtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblBhcnNlQ29tbWVudChpc0Jsb2NrOiBib29sZWFuLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBpZiAoaGF2ZVNvdXJjZW1hcCh0ZXh0KSkge1xuICAgICAgdGhpcy5zb3VyY2VtYXBDb21tZW50ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrSW1wb3J0TmFtZXMoXG4gICAgaW1wb3J0czogSW1wb3J0SW5mb0RhdGFbJ2ltcG9ydHMnXSxcbiAgICBtb2R1bGVJZDogc3RyaW5nLFxuICApIHtcbiAgICBjb25zdCBleHBvcnRzID0gdGhpcy5nZXRDaGlsZE1vZHVsZUV4cG9ydHMobW9kdWxlSWQpO1xuICAgIGlmIChleHBvcnRzKSB7XG4gICAgICBpbXBvcnRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uaXNOYW1lc3BhY2UpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2hlY2tOYW1lID0gaXRlbS5pc0RlZmF1bHQgPyAnZGVmYXVsdCcgOiBpdGVtLm5hbWU7XG4gICAgICAgIGlmICghZXhwb3J0cy5pbmNsdWRlcyhjaGVja05hbWUpKSB7XG4gICAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoXG4gICAgICAgICAgICBgKCR7dGhpcy5vcHRpb25zLmZpbGVuYW1lfSk6IFRoZSBtb2R1bGUgJyR7bW9kdWxlSWR9JyBkb2VzIG5vdCBwcm92aWRlIGFuIGV4cG9ydCBuYW1lZCAnJHtjaGVja05hbWV9J2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDaGlsZE1vZHVsZUV4cG9ydHMobW9kdWxlSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHN0b3JlSWQgPSB0cmFuc2Zvcm1VcmwodGhpcy5vcHRpb25zLnN0b3JlSWQsIG1vZHVsZUlkKTtcbiAgICBjb25zdCBvdXRwdXQgPSB0aGlzLm9wdGlvbnMucnVudGltZS5yZXNvdXJjZXNbc3RvcmVJZF0gYXMgTW9kdWxlUmVzb3VyY2U7XG4gICAgcmV0dXJuIG91dHB1dCA/IG91dHB1dC5leHBvcnRzIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1wb3J0SW5mb3JtYXRpb24obm9kZTogSW1wb3J0RGVjbGFyYXRpb24pIHtcbiAgICBjb25zdCBpbXBvcnRzID0gbm9kZS5zcGVjaWZpZXJzLm1hcCgobikgPT4ge1xuICAgICAgY29uc3QgaXNEZWZhdWx0ID0gaXNJbXBvcnREZWZhdWx0U3BlY2lmaWVyKG4pO1xuICAgICAgY29uc3QgaXNOYW1lc3BhY2UgPSBpc0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcihuKTtcbiAgICAgIGNvbnN0IGlzU3BlY2lhbCA9IGlzRGVmYXVsdCB8fCBpc05hbWVzcGFjZTtcbiAgICAgIGNvbnN0IGFsaWFzID0gaXNTcGVjaWFsID8gbnVsbCA6IG4ubG9jYWwubmFtZTtcbiAgICAgIGNvbnN0IG5hbWUgPSBpc1NwZWNpYWxcbiAgICAgICAgPyBuLmxvY2FsLm5hbWVcbiAgICAgICAgOiAobiBhcyBJbXBvcnRTcGVjaWZpZXIpLmltcG9ydGVkLm5hbWU7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc0RlZmF1bHQsXG4gICAgICAgIGlzTmFtZXNwYWNlLFxuICAgICAgICBhbGlhczogYWxpYXMgPT09IG5hbWUgPyBudWxsIDogYWxpYXMsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGltcG9ydHMsXG4gICAgICBpc0V4cG9ydDogZmFsc2UsXG4gICAgICBtb2R1bGVJZDogbm9kZS5zb3VyY2UudmFsdWUgYXMgc3RyaW5nLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldEltcG9ydEluZm9ybWF0aW9uQnlTb3VyY2UoXG4gICAgbm9kZTogRXhwb3J0TmFtZWREZWNsYXJhdGlvbiB8IEV4cG9ydEFsbERlY2xhcmF0aW9uLFxuICApIHtcbiAgICBjb25zdCBpbXBvcnRzID0gKChub2RlIGFzIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24pLnNwZWNpZmllcnMgfHwgW10pLm1hcChcbiAgICAgIChuKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsaWFzID0gbi5leHBvcnRlZC5uYW1lO1xuICAgICAgICBjb25zdCBuYW1lID0gbi5sb2NhbC5uYW1lO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWxpYXM6IGFsaWFzID09PSBuYW1lID8gbnVsbCA6IGFsaWFzLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGltcG9ydHMsXG4gICAgICBpc0V4cG9ydDogdHJ1ZSxcbiAgICAgIG1vZHVsZUlkOiBub2RlLnNvdXJjZT8udmFsdWUgYXMgc3RyaW5nLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlSW1wb3J0VHJhbnNmb3JtTm9kZShtb2R1bGVOYW1lOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2YXJOYW1lID0gaWRlbnRpZmllcihtb2R1bGVOYW1lKTtcbiAgICBjb25zdCB2YXJFeHByID0gY2FsbEV4cHJlc3Npb24oXG4gICAgICBpZGVudGlmaWVyKENvbXBpbGVyLmtleXMuX19HQVJGSVNIX0lNUE9SVF9fKSxcbiAgICAgIFtsaXRlcmFsKG1vZHVsZUlkKV0sXG4gICAgKTtcbiAgICBjb25zdCB2YXJOb2RlID0gdmFyaWFibGVEZWNsYXJhdG9yKHZhck5hbWUsIHZhckV4cHIpO1xuICAgIHJldHVybiB2YXJpYWJsZURlY2xhcmF0aW9uKCdjb25zdCcsIFt2YXJOb2RlXSk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlSWRlbnRpZmllclRyYW5zZm9ybU5vZGUoXG4gICAgbmFtZU9ySW5mbzogc3RyaW5nIHwgUmV0dXJuVHlwZTxDb21waWxlclsnZmluZEluZGV4SW5EYXRhJ10+LFxuICApIHtcbiAgICBsZXQgaW5mbztcbiAgICBpZiAodHlwZW9mIG5hbWVPckluZm8gPT09ICdzdHJpbmcnKSB7XG4gICAgICBmb3IgKGNvbnN0IHsgZGF0YSB9IG9mIHRoaXMuaW1wb3J0SW5mb3MpIHtcbiAgICAgICAgaWYgKCFkYXRhLmlzRXhwb3J0KSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5maW5kSW5kZXhJbkRhdGEobmFtZU9ySW5mbywgZGF0YSk7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgaW5mbyA9IHJlc3VsdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvID0gbmFtZU9ySW5mbztcbiAgICB9XG5cbiAgICBpZiAoaW5mbyAmJiBpbmZvLmRhdGEpIHtcbiAgICAgIGNvbnN0IHsgaSwgZGF0YSB9ID0gaW5mbztcbiAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhLmltcG9ydHNbaV07XG4gICAgICBpZiAoaXRlbS5pc05hbWVzcGFjZSkge1xuICAgICAgICByZXR1cm4gY2FsbEV4cHJlc3Npb24oaWRlbnRpZmllcihDb21waWxlci5rZXlzLl9fR0FSRklTSF9OQU1FU1BBQ0VfXyksIFtcbiAgICAgICAgICBpZGVudGlmaWVyKGRhdGEubW9kdWxlTmFtZSksXG4gICAgICAgIF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBpdGVtLmlzRGVmYXVsdCA/ICdkZWZhdWx0JyA6IGl0ZW0ubmFtZTtcbiAgICAgICAgcmV0dXJuIG1lbWJlckV4cHJlc3Npb24oXG4gICAgICAgICAgaWRlbnRpZmllcihkYXRhLm1vZHVsZU5hbWUpLFxuICAgICAgICAgIGlkZW50aWZpZXIocHJvcE5hbWUpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVWaXJ0dWFsTW9kdWxlU3lzdGVtKCkge1xuICAgIGNvbnN0IGV4cG9ydE5vZGVzID0gdGhpcy5leHBvcnRJbmZvcy5tYXAoKHsgbmFtZSwgcmVmTm9kZSB9KSA9PiB7XG4gICAgICByZXR1cm4gb2JqZWN0UHJvcGVydHkoXG4gICAgICAgIGlkZW50aWZpZXIobmFtZSksXG4gICAgICAgIGFycm93RnVuY3Rpb25FeHByZXNzaW9uKFtdLCByZWZOb2RlKSxcbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgZXhwb3J0Q2FsbEV4cHJlc3Npb24gPSBjYWxsRXhwcmVzc2lvbihcbiAgICAgIGlkZW50aWZpZXIoQ29tcGlsZXIua2V5cy5fX0dBUkZJU0hfRVhQT1JUX18pLFxuICAgICAgW29iamVjdEV4cHJlc3Npb24oZXhwb3J0Tm9kZXMpXSxcbiAgICApO1xuICAgIHRoaXMuYXN0LmJvZHkudW5zaGlmdChcbiAgICAgIGV4cG9ydENhbGxFeHByZXNzaW9uIGFzIGFueSxcbiAgICAgIC4uLm5ldyBTZXQodGhpcy5pbXBvcnRJbmZvcy5tYXAoKHZhbCkgPT4gdmFsLnRyYW5zZm9ybU5vZGUpKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kSW5kZXhJbkRhdGEocmVmTmFtZTogc3RyaW5nLCBkYXRhOiBJbXBvcnRJbmZvRGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5pbXBvcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGFsaWFzIH0gPSBkYXRhLmltcG9ydHNbaV07XG4gICAgICBpZiAocmVmTmFtZSA9PT0gYWxpYXMgfHwgcmVmTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4geyBpLCBkYXRhIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kSW1wb3J0SW5mbyhtb2R1bGVJZDogc3RyaW5nKTogW3N0cmluZz8sIFZhcmlhYmxlRGVjbGFyYXRpb24/XSB7XG4gICAgZm9yIChjb25zdCB7IGRhdGEsIHRyYW5zZm9ybU5vZGUgfSBvZiB0aGlzLmltcG9ydEluZm9zKSB7XG4gICAgICBpZiAoZGF0YS5tb2R1bGVJZCA9PT0gbW9kdWxlSWQpIHtcbiAgICAgICAgcmV0dXJuIFtkYXRhLm1vZHVsZU5hbWUsIHRyYW5zZm9ybU5vZGVdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGlzUmVmZXJlbmNlZE1vZHVsZVZhcmlhYmxlKHNjb3BlOiBTY29wZSwgbm9kZTogSWRlbnRpZmllcikge1xuICAgIGNvbnN0IHUgPSAoKSA9PlxuICAgICAgT2JqZWN0LmtleXMoc2NvcGUuYmluZGluZ3MpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICBjb25zdCB7IGtpbmQsIHJlZmVyZW5jZXMsIGNvbnN0YW50VmlvbGF0aW9ucyB9ID0gc2NvcGUuYmluZGluZ3Nba2V5XTtcbiAgICAgICAgaWYgKGtpbmQgPT09ICdtb2R1bGUnKSB7XG4gICAgICAgICAgcmV0dXJuIHJlZmVyZW5jZXMuaGFzKG5vZGUpIHx8IGNvbnN0YW50VmlvbGF0aW9ucy5oYXMobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHdoaWxlIChzY29wZSkge1xuICAgICAgaWYgKHUoKSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoc2NvcGUucGFyZW50KSB7XG4gICAgICAgIHNjb3BlID0gc2NvcGUucGFyZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIDEuIGV4cG9ydCB7IGEgYXMgZGVmYXVsdCB9O1xuICAvLyAyLiBleHBvcnQgeyBkZWZhdWx0IGFzIHggfSBmcm9tICdtb2R1bGUnO1xuICBwcml2YXRlIHByb2Nlc3NFeHBvcnRTcGVjaWZpZXJzKFxuICAgIG5vZGU6IEV4cG9ydE5hbWVkRGVjbGFyYXRpb24sXG4gICAgc3RhdGU6IFN0YXRlLFxuICAgIGFuY2VzdG9yczogQXJyYXk8Tm9kZT4sXG4gICkge1xuICAgIGlmIChub2RlLnNvdXJjZSkge1xuICAgICAgY29uc3QgbW9kdWxlSWQgPSBub2RlLnNvdXJjZS52YWx1ZSBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXRJbXBvcnRJbmZvcm1hdGlvbkJ5U291cmNlKG5vZGUpO1xuICAgICAgbGV0IFttb2R1bGVOYW1lLCB0cmFuc2Zvcm1Ob2RlXSA9IHRoaXMuZmluZEltcG9ydEluZm8obW9kdWxlSWQpO1xuXG4gICAgICBpZiAoIW1vZHVsZU5hbWUpIHtcbiAgICAgICAgbW9kdWxlTmFtZSA9IGBfX20ke3RoaXMubW9kdWxlQ291bnQrK31fX2A7XG4gICAgICAgIHRyYW5zZm9ybU5vZGUgPSB0aGlzLmdlbmVyYXRlSW1wb3J0VHJhbnNmb3JtTm9kZShtb2R1bGVOYW1lLCBtb2R1bGVJZCk7XG4gICAgICB9XG5cbiAgICAgIChkYXRhIGFzIEltcG9ydEluZm9EYXRhKS5tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcbiAgICAgIHRyYW5zZm9ybU5vZGUgJiZcbiAgICAgICAgdGhpcy5pbXBvcnRJbmZvcy5wdXNoKHsgZGF0YTogZGF0YSBhcyBJbXBvcnRJbmZvRGF0YSwgdHJhbnNmb3JtTm9kZSB9KTtcbiAgICAgIHRoaXMuZGVmZXJRdWV1ZS5pbXBvcnRDaGVja3MuYWRkKCgpID0+XG4gICAgICAgIHRoaXMuY2hlY2tJbXBvcnROYW1lcyhkYXRhLmltcG9ydHMsIG1vZHVsZUlkKSxcbiAgICAgICk7XG5cbiAgICAgIG5vZGUuc3BlY2lmaWVycy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZUluZm8gPSB0aGlzLmZpbmRJbmRleEluRGF0YShcbiAgICAgICAgICBuLmxvY2FsLm5hbWUsXG4gICAgICAgICAgZGF0YSBhcyBJbXBvcnRJbmZvRGF0YSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVmTm9kZSA9IHRoaXMuZ2VuZXJhdGVJZGVudGlmaWVyVHJhbnNmb3JtTm9kZSh1c2VJbmZvKTtcbiAgICAgICAgcmVmTm9kZSAmJiB0aGlzLmV4cG9ydEluZm9zLnB1c2goeyByZWZOb2RlLCBuYW1lOiBuLmV4cG9ydGVkLm5hbWUgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5nZXRTY29wZUJ5QW5jZXN0b3JzKGFuY2VzdG9ycyk7XG4gICAgICBub2RlLnNwZWNpZmllcnMuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICBjb25zdCByZWZOb2RlID1cbiAgICAgICAgICBzY29wZSAmJiB0aGlzLmlzUmVmZXJlbmNlZE1vZHVsZVZhcmlhYmxlKHNjb3BlLCBuLmxvY2FsKVxuICAgICAgICAgICAgPyB0aGlzLmdlbmVyYXRlSWRlbnRpZmllclRyYW5zZm9ybU5vZGUobi5sb2NhbC5uYW1lKVxuICAgICAgICAgICAgOiBpZGVudGlmaWVyKG4ubG9jYWwubmFtZSk7XG4gICAgICAgIHJlZk5vZGUgJiYgdGhpcy5leHBvcnRJbmZvcy5wdXNoKHsgcmVmTm9kZSwgbmFtZTogbi5leHBvcnRlZC5uYW1lIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZGVmZXJRdWV1ZS5yZW1vdmVzLmFkZCgoKSA9PiBzdGF0ZS5yZW1vdmUoYW5jZXN0b3JzKSk7XG4gIH1cblxuICAvLyAxLiBleHBvcnQgZGVmYXVsdCAxO1xuICAvLyAyLiBleHBvcnQgY29uc3QgYSA9IDE7XG4gIHByaXZhdGUgcHJvY2Vzc0V4cG9ydE5hbWVkRGVjbGFyYXRpb24oXG4gICAgbm9kZTogRXhwb3J0TmFtZWREZWNsYXJhdGlvbiB8IEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbixcbiAgICBzdGF0ZTogU3RhdGUsXG4gICAgYW5jZXN0b3JzOiBBcnJheTxOb2RlPixcbiAgKSB7XG4gICAgY29uc3QgaXNEZWZhdWx0ID0gaXNFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24obm9kZSk7XG4gICAgaWYgKG5vZGUuZGVjbGFyYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vZGVzID0gaXNWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGUuZGVjbGFyYXRpb24pXG4gICAgICAgID8gbm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnNcbiAgICAgICAgOiBbbm9kZS5kZWNsYXJhdGlvbl07XG5cbiAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKGlzRGVmYXVsdCkge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgY29uc3QgcmVmTm9kZSA9IGlkZW50aWZpZXIoQ29tcGlsZXIua2V5cy5fX0dBUkZJU0hfREVGQVVMVF9fKTtcbiAgICAgICAgICB0aGlzLmV4cG9ydEluZm9zLnB1c2goeyBuYW1lLCByZWZOb2RlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG5hbWVzID0gc3RhdGUuZ2V0QmluZGluZ0lkZW50aWZpZXJzKG5vZGUuaWQpO1xuICAgICAgICAgIG5hbWVzLmZvckVhY2goKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cG9ydEluZm9zLnB1c2goeyBuYW1lLCByZWZOb2RlOiBpZGVudGlmaWVyKG5hbWUpIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlzRGVmYXVsdCkge1xuICAgICAgICB0aGlzLmRlZmVyUXVldWUucmVwbGFjZXMuYWRkKCgpID0+IHtcbiAgICAgICAgICAvLyBcdTZCNjRcdTY1RjYgZGVjbGFyYXRpb24gXHU1M0VGXHU4MEZEXHU1REYyXHU3RUNGXHU4OEFCXHU2NkZGXHU2MzYyXHU4RkM3XHU0RTg2XG4gICAgICAgICAgY29uc3QgdmFyTmFtZSA9IGlkZW50aWZpZXIoQ29tcGlsZXIua2V5cy5fX0dBUkZJU0hfREVGQVVMVF9fKTtcbiAgICAgICAgICBjb25zdCB2YXJOb2RlID0gdmFyaWFibGVEZWNsYXJhdG9yKFxuICAgICAgICAgICAgdmFyTmFtZSxcbiAgICAgICAgICAgIG5vZGUuZGVjbGFyYXRpb24gYXMgRXhwcmVzc2lvbixcbiAgICAgICAgICApO1xuICAgICAgICAgIHN0YXRlLnJlcGxhY2VXaXRoKHZhcmlhYmxlRGVjbGFyYXRpb24oJ2NvbnN0JywgW3Zhck5vZGVdKSwgYW5jZXN0b3JzKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuZGVjbGFyYXRpb24gJiYgaXNJZGVudGlmaWVyKG5vZGUuZGVjbGFyYXRpb24pKSB7XG4gICAgICAgIHRoaXMuZGVmZXJRdWV1ZS5yZW1vdmVzLmFkZCgoKSA9PiBzdGF0ZS5yZW1vdmUoYW5jZXN0b3JzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLmRlY2xhcmF0aW9uICYmXG4gICAgICAgICAgdGhpcy5kZWZlclF1ZXVlLnJlcGxhY2VzLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uICYmIHN0YXRlLnJlcGxhY2VXaXRoKG5vZGUuZGVjbGFyYXRpb24sIGFuY2VzdG9ycyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gMS4gZXhwb3J0ICogZnJvbSAnbW9kdWxlJztcbiAgLy8gMi4gZXhwb3J0ICogYXMgeCBmcm9tICdtb2R1bGUnO1xuICBwcml2YXRlIHByb2Nlc3NFeHBvcnRBbGxEZWNsYXJhdGlvbihcbiAgICBub2RlOiBFeHBvcnRBbGxEZWNsYXJhdGlvbixcbiAgICBzdGF0ZTogU3RhdGUsXG4gICAgYW5jZXN0b3JzOiBBcnJheTxOb2RlPixcbiAgKSB7XG4gICAgY29uc3QgbmFtZXNwYWNlID0gbm9kZS5leHBvcnRlZD8ubmFtZTtcbiAgICBjb25zdCBtb2R1bGVJZCA9IG5vZGUuc291cmNlLnZhbHVlIGFzIHN0cmluZztcbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZXRJbXBvcnRJbmZvcm1hdGlvbkJ5U291cmNlKG5vZGUpO1xuICAgIGxldCBbbW9kdWxlTmFtZSwgdHJhbnNmb3JtTm9kZV0gPSB0aGlzLmZpbmRJbXBvcnRJbmZvKG1vZHVsZUlkKTtcblxuICAgIGlmICghbW9kdWxlTmFtZSkge1xuICAgICAgbW9kdWxlTmFtZSA9IGBfX20ke3RoaXMubW9kdWxlQ291bnQrK31fX2A7XG4gICAgICB0cmFuc2Zvcm1Ob2RlID0gdGhpcy5nZW5lcmF0ZUltcG9ydFRyYW5zZm9ybU5vZGUobW9kdWxlTmFtZSwgbW9kdWxlSWQpO1xuICAgIH1cblxuICAgIChkYXRhIGFzIEltcG9ydEluZm9EYXRhKS5tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcbiAgICB0cmFuc2Zvcm1Ob2RlICYmXG4gICAgICB0aGlzLmltcG9ydEluZm9zLnB1c2goeyBkYXRhOiBkYXRhIGFzIEltcG9ydEluZm9EYXRhLCB0cmFuc2Zvcm1Ob2RlIH0pO1xuXG4gICAgdGhpcy5kZWZlclF1ZXVlLnJlbW92ZXMuYWRkKCgpID0+IHN0YXRlLnJlbW92ZShhbmNlc3RvcnMpKTtcbiAgICB0aGlzLmRlZmVyUXVldWUuZXhwb3J0TmFtZXNwYWNlcy5hZGQoe1xuICAgICAgbW9kdWxlSWQsXG4gICAgICBuYW1lc3BhY2UsXG4gICAgICBmbjogKG5hbWVzKSA9PiB7XG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICBsZXQgcmVmTm9kZTtcbiAgICAgICAgICBpZiAobW9kdWxlTmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICByZWZOb2RlID0gY2FsbEV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcihDb21waWxlci5rZXlzLl9fR0FSRklTSF9OQU1FU1BBQ0VfXyksXG4gICAgICAgICAgICAgICAgW2lkZW50aWZpZXIobW9kdWxlTmFtZSldLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVmTm9kZSA9IG1lbWJlckV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcihtb2R1bGVOYW1lKSxcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyKG5hbWUpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmV4cG9ydEluZm9zLnB1c2goeyByZWZOb2RlLCBuYW1lIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBcdTU5MDRcdTc0MDZcdTYyNDBcdTY3MDlcdTc2ODQgZXhwb3J0XG4gIHByaXZhdGUgZXhwb3J0RGVjbGFyYXRpb25WaXNpdG9yKFxuICAgIG5vZGU6IGFueSxcbiAgICBzdGF0ZTogU3RhdGUsXG4gICAgYW5jZXN0b3JzOiBBcnJheTxOb2RlPixcbiAgKSB7XG4gICAgaWYgKG5vZGUuZGVjbGFyYXRpb24pIHtcbiAgICAgIHRoaXMucHJvY2Vzc0V4cG9ydE5hbWVkRGVjbGFyYXRpb24obm9kZSwgc3RhdGUsIFsuLi5hbmNlc3RvcnNdKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuc3BlY2lmaWVycykge1xuICAgICAgdGhpcy5wcm9jZXNzRXhwb3J0U3BlY2lmaWVycyhub2RlLCBzdGF0ZSwgWy4uLmFuY2VzdG9yc10pO1xuICAgIH0gZWxzZSBpZiAoaXNFeHBvcnRBbGxEZWNsYXJhdGlvbihub2RlKSkge1xuICAgICAgdGhpcy5wcm9jZXNzRXhwb3J0QWxsRGVjbGFyYXRpb24obm9kZSwgc3RhdGUsIFsuLi5hbmNlc3RvcnNdKTtcbiAgICB9XG4gIH1cblxuICAvLyBcdTU5MDRcdTc0MDZcdTYyNDBcdTY3MDlcdTc1MjhcdTUyMzAgZXNtIFx1NzY4NFx1NUYxNVx1NzUyOFxuICBwcml2YXRlIGlkZW50aWZpZXJWaXNpdG9yKFxuICAgIG5vZGU6IElkZW50aWZpZXIsXG4gICAgc3RhdGU6IFN0YXRlLFxuICAgIGFuY2VzdG9yczogQXJyYXk8Tm9kZT4sXG4gICkge1xuICAgIGNvbnN0IHBhcmVudCA9IGFuY2VzdG9yc1thbmNlc3RvcnMubGVuZ3RoIC0gMl07XG4gICAgaWYgKGlzRXhwb3J0U3BlY2lmaWVyKHBhcmVudCkpIHJldHVybjtcbiAgICBjb25zdCBzY29wZSA9IHN0YXRlLmdldFNjb3BlQnlBbmNlc3RvcnMoYW5jZXN0b3JzKTtcblxuICAgIGlmIChzY29wZSAmJiB0aGlzLmlzUmVmZXJlbmNlZE1vZHVsZVZhcmlhYmxlKHNjb3BlLCBub2RlKSkge1xuICAgICAgYW5jZXN0b3JzID0gWy4uLmFuY2VzdG9yc107XG4gICAgICB0aGlzLmRlZmVyUXVldWUuaWRlbnRpZmllclJlZnMuYWRkKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVwbGFjZW1lbnQgPSB0aGlzLmdlbmVyYXRlSWRlbnRpZmllclRyYW5zZm9ybU5vZGUobm9kZS5uYW1lKTtcbiAgICAgICAgaWYgKHJlcGxhY2VtZW50KSB7XG4gICAgICAgICAgc3RhdGUucmVwbGFjZVdpdGgocmVwbGFjZW1lbnQsIGFuY2VzdG9ycyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXRpYyBpbXBvcnQgZXhwcmVzc2lvblxuICBwcml2YXRlIGltcG9ydERlY2xhcmF0aW9uVmlzaXRvcihcbiAgICBub2RlOiBJbXBvcnREZWNsYXJhdGlvbixcbiAgICBzdGF0ZTogU3RhdGUsXG4gICAgYW5jZXN0b3JzOiBBcnJheTxOb2RlPixcbiAgKSB7XG4gICAgYW5jZXN0b3JzID0gWy4uLmFuY2VzdG9yc107XG4gICAgY29uc3QgbW9kdWxlSWQgPSBub2RlLnNvdXJjZS52YWx1ZSBhcyBzdHJpbmc7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0SW1wb3J0SW5mb3JtYXRpb24obm9kZSk7XG4gICAgbGV0IFttb2R1bGVOYW1lLCB0cmFuc2Zvcm1Ob2RlXSA9IHRoaXMuZmluZEltcG9ydEluZm8obW9kdWxlSWQpO1xuXG4gICAgaWYgKCFtb2R1bGVOYW1lKSB7XG4gICAgICBtb2R1bGVOYW1lID0gYF9fbSR7dGhpcy5tb2R1bGVDb3VudCsrfV9fYDtcbiAgICAgIHRyYW5zZm9ybU5vZGUgPSB0aGlzLmdlbmVyYXRlSW1wb3J0VHJhbnNmb3JtTm9kZShtb2R1bGVOYW1lLCBtb2R1bGVJZCk7XG4gICAgfVxuXG4gICAgKGRhdGEgYXMgSW1wb3J0SW5mb0RhdGEpLm1vZHVsZU5hbWUgPSBtb2R1bGVOYW1lO1xuICAgIHRyYW5zZm9ybU5vZGUgJiZcbiAgICAgIHRoaXMuaW1wb3J0SW5mb3MucHVzaCh7IGRhdGE6IGRhdGEgYXMgSW1wb3J0SW5mb0RhdGEsIHRyYW5zZm9ybU5vZGUgfSk7XG5cbiAgICB0aGlzLmRlZmVyUXVldWUucmVtb3Zlcy5hZGQoKCkgPT4gc3RhdGUucmVtb3ZlKGFuY2VzdG9ycykpO1xuICAgIHRoaXMuZGVmZXJRdWV1ZS5pbXBvcnRDaGVja3MuYWRkKCgpID0+XG4gICAgICB0aGlzLmNoZWNrSW1wb3J0TmFtZXMoZGF0YS5pbXBvcnRzLCBtb2R1bGVJZCksXG4gICAgKTtcbiAgfVxuXG4gIC8vIER5bmFtaWMgaW1wb3J0IGV4cHJlc3Npb25cbiAgcHJpdmF0ZSBpbXBvcnRFeHByZXNzaW9uVmlzaXRvcihcbiAgICBub2RlOiBJbXBvcnRFeHByZXNzaW9uLFxuICAgIHN0YXRlOiBTdGF0ZSxcbiAgICBhbmNlc3RvcnM6IEFycmF5PE5vZGU+LFxuICApIHtcbiAgICBjb25zdCByZXBsYWNlbWVudCA9IGNhbGxFeHByZXNzaW9uKFxuICAgICAgaWRlbnRpZmllcihDb21waWxlci5rZXlzLl9fR0FSRklTSF9EWU5BTUlDX0lNUE9SVF9fKSxcbiAgICAgIFtub2RlLnNvdXJjZV0sXG4gICAgKTtcbiAgICBzdGF0ZS5yZXBsYWNlV2l0aChyZXBsYWNlbWVudCwgYW5jZXN0b3JzKTtcbiAgfVxuXG4gIC8vIGBpbXBvcnQubWV0YWBcbiAgcHJpdmF0ZSBpbXBvcnRNZXRhVmlzaXRvcihcbiAgICBub2RlOiBNZXRhUHJvcGVydHksXG4gICAgc3RhdGU6IFN0YXRlLFxuICAgIGFuY2VzdG9yczogQXJyYXk8Tm9kZT4sXG4gICkge1xuICAgIGlmIChub2RlLm1ldGEubmFtZSA9PT0gJ2ltcG9ydCcpIHtcbiAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gbWVtYmVyRXhwcmVzc2lvbihcbiAgICAgICAgaWRlbnRpZmllcihDb21waWxlci5rZXlzLl9fR0FSRklTSF9JTVBPUlRfTUVUQV9fKSxcbiAgICAgICAgbm9kZS5wcm9wZXJ0eSxcbiAgICAgICk7XG4gICAgICBzdGF0ZS5yZXBsYWNlV2l0aChyZXBsYWNlbWVudCwgYW5jZXN0b3JzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdlbmVyYXRlQ29kZSgpIHtcbiAgICBjb25zdCBuYW1lQ291bnRzID0ge307XG4gICAgY29uc3QgZ2V0RXhwb3J0cyA9ICh7IG5hbWVzcGFjZSwgbW9kdWxlSWQgfSkgPT4ge1xuICAgICAgcmV0dXJuIG5hbWVzcGFjZVxuICAgICAgICA/IFtuYW1lc3BhY2UgYXMgc3RyaW5nXVxuICAgICAgICA6IHRoaXMuZ2V0Q2hpbGRNb2R1bGVFeHBvcnRzKG1vZHVsZUlkKSB8fCBbXTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWZlclF1ZXVlLmV4cG9ydE5hbWVzcGFjZXMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBnZXRFeHBvcnRzKHZhbCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAoIW5hbWVDb3VudHNbbmFtZV0pIHtcbiAgICAgICAgICBuYW1lQ291bnRzW25hbWVdID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuYW1lQ291bnRzW25hbWVdKys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kZWZlclF1ZXVlLmV4cG9ydE5hbWVzcGFjZXMuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAvLyBgZXhwb3J0IG5hbWVzcGFjZWAgXHU1M0Q4XHU5MUNGXHU3Njg0XHU1M0JCXHU5MUNEXG4gICAgICBjb25zdCBleHBvcnRzID0gZ2V0RXhwb3J0cyh2YWwpLmZpbHRlcigobmFtZSkgPT4ge1xuICAgICAgICBpZiAobmFtZSA9PT0gJ2RlZmF1bHQnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChuYW1lQ291bnRzW25hbWVdID4gMSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5leHBvcnRJbmZvcy5ldmVyeSgodmFsKSA9PiB2YWwubmFtZSAhPT0gbmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHZhbC5mbihleHBvcnRzKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGVmZXJRdWV1ZS5pbXBvcnRDaGVja3MuZm9yRWFjaCgoZm4pID0+IGZuKCkpO1xuICAgIHRoaXMuZGVmZXJRdWV1ZS5pZGVudGlmaWVyUmVmcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7XG4gICAgdGhpcy5kZWZlclF1ZXVlLnJlcGxhY2VzLmZvckVhY2goKGZuKSA9PiBmbigpKTtcbiAgICB0aGlzLmRlZmVyUXVldWUucmVtb3Zlcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7XG4gICAgdGhpcy5nZW5lcmF0ZVZpcnR1YWxNb2R1bGVTeXN0ZW0oKTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGdlbmVyYXRlKHRoaXMuYXN0LCB7XG4gICAgICBzb3VyY2VNYXBXaXRoQ29kZTogdHJ1ZSxcbiAgICAgIHNvdXJjZU1hcDogdGhpcy5vcHRpb25zLmZpbGVuYW1lLFxuICAgICAgc291cmNlQ29udGVudDogdGhpcy5vcHRpb25zLmNvZGUsXG4gICAgfSkgYXMgdW5rbm93biBhcyBPdXRwdXQ7XG5cbiAgICBhd2FpdCBtZXJnZVNvdXJjZW1hcCh0aGlzLCBvdXRwdXQpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICB0cmFuc2Zvcm0oKSB7XG4gICAgaWYgKHRoaXMuY29uc3VtZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSBjb25zdW1lZCcpO1xuICAgIH1cbiAgICB0aGlzLmNvbnN1bWVkID0gdHJ1ZTtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBjID0gKGZuKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgYW5jZXN0b3IoXG4gICAgICB0aGlzLmFzdCBhcyB1bmtub3duIGFzIEFjb3JuTm9kZSxcbiAgICAgIHtcbiAgICAgICAgSWRlbnRpZmllcjogYyh0aGlzLmlkZW50aWZpZXJWaXNpdG9yKSxcbiAgICAgICAgVmFyaWFibGVQYXR0ZXJuOiBjKHRoaXMuaWRlbnRpZmllclZpc2l0b3IpLFxuICAgICAgICBNZXRhUHJvcGVydHk6IGModGhpcy5pbXBvcnRNZXRhVmlzaXRvciksXG4gICAgICAgIEltcG9ydEV4cHJlc3Npb246IGModGhpcy5pbXBvcnRFeHByZXNzaW9uVmlzaXRvciksXG4gICAgICAgIEltcG9ydERlY2xhcmF0aW9uOiBjKHRoaXMuaW1wb3J0RGVjbGFyYXRpb25WaXNpdG9yKSxcbiAgICAgICAgRXhwb3J0QWxsRGVjbGFyYXRpb246IGModGhpcy5leHBvcnREZWNsYXJhdGlvblZpc2l0b3IpLFxuICAgICAgICBFeHBvcnROYW1lZERlY2xhcmF0aW9uOiBjKHRoaXMuZXhwb3J0RGVjbGFyYXRpb25WaXNpdG9yKSxcbiAgICAgICAgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uOiBjKHRoaXMuZXhwb3J0RGVjbGFyYXRpb25WaXNpdG9yKSxcbiAgICAgIH0sXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLnN0YXRlLFxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGVDb2RlOiAoKSA9PiB0aGlzLmdlbmVyYXRlQ29kZSgpLFxuICAgICAgZXhwb3J0czogdGhpcy5leHBvcnRJbmZvcy5tYXAoKHYpID0+IHYubmFtZSksXG4gICAgICBpbXBvcnRzOiB0aGlzLmltcG9ydEluZm9zLm1hcCgodikgPT4gdi5kYXRhKSxcbiAgICB9O1xuICB9XG59XG4iLCAiLy8gSW5zcGlyZWQgYnkgYEBiYWJlbC90eXBlc2Bcbi8vIGh0dHBzOi8vYmFiZWxqcy5pby9kb2NzL2VuL2JhYmVsLXBhcnNlclxuLy8gRmlsdGVyIG91dCB0cywganN4IHJlbGF0ZWQgY29kZSBqdWRnbWVudHMsXG4vLyBhbmQgbW9kaWZ5IHRoZSBqdWRnbWVudHMgdG8gZXN0cmVlIHNwZWNpZmljYXRpb25zXG5pbXBvcnQgdHlwZSB7XG4gIE5vZGUsXG4gIFByb3BlcnR5LFxuICBJZGVudGlmaWVyLFxuICBSZXN0RWxlbWVudCxcbiAgRm9ySW5TdGF0ZW1lbnQsXG4gIEZvck9mU3RhdGVtZW50LFxuICBCbG9ja1N0YXRlbWVudCxcbiAgTGFiZWxlZFN0YXRlbWVudCxcbiAgQXJyYXlQYXR0ZXJuLFxuICBPYmplY3RQYXR0ZXJuLFxuICBBc3NpZ25tZW50UGF0dGVybixcbiAgQ2xhc3NEZWNsYXJhdGlvbixcbiAgQ2F0Y2hDbGF1c2UsXG4gIFZhcmlhYmxlRGVjbGFyYXRpb24sXG4gIEZ1bmN0aW9uRGVjbGFyYXRpb24sXG4gIEZ1bmN0aW9uRXhwcmVzc2lvbixcbiAgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24sXG4gIEV4cG9ydFNwZWNpZmllcixcbiAgRXhwb3J0QWxsRGVjbGFyYXRpb24sXG4gIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24sXG4gIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbixcbiAgSW1wb3J0RGVjbGFyYXRpb24sXG4gIEltcG9ydERlZmF1bHRTcGVjaWZpZXIsXG4gIEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcixcbn0gZnJvbSAnZXN0cmVlJztcblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsPFQgZXh0ZW5kcyBvYmplY3Q+KFxuICBhY3R1YWw6IG9iamVjdCxcbiAgZXhwZWN0ZWQ6IFQsXG4pOiBhY3R1YWwgaXMgVCB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBlY3RlZCk7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAoYWN0dWFsW2tleV0gIT09IGV4cGVjdGVkW2tleV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lkZW50aWZpZXIobm9kZT86IG9iamVjdCk6IG5vZGUgaXMgSWRlbnRpZmllciB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKG5vZGUgYXMgTm9kZSkudHlwZSA9PT0gJ0lkZW50aWZpZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYXIobm9kZT86IG9iamVjdCk6IG5vZGUgaXMgVmFyaWFibGVEZWNsYXJhdGlvbiB7XG4gIHJldHVybiBpc1ZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSwgeyBraW5kOiAndmFyJyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGV0KG5vZGU/OiBvYmplY3QpIHtcbiAgcmV0dXJuIGlzVmFyaWFibGVEZWNsYXJhdGlvbihub2RlKSAmJiBub2RlLmtpbmQgIT09ICd2YXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9wZXJ0eShub2RlPzogb2JqZWN0KTogbm9kZSBpcyBQcm9wZXJ0eSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKG5vZGUgYXMgTm9kZSkudHlwZSA9PT0gJ1Byb3BlcnR5Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxvY2tTY29wZWQobm9kZT86IG9iamVjdCkge1xuICByZXR1cm4gaXNGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGUpIHx8IGlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKSB8fCBpc0xldChub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24oXG4gIG5vZGU/OiBvYmplY3QsXG4pOiBub2RlIGlzIEFycm93RnVuY3Rpb25FeHByZXNzaW9uIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAobm9kZSBhcyBOb2RlKS50eXBlID09PSAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JYU3RhdGVtZW50KFxuICBub2RlPzogb2JqZWN0LFxuKTogbm9kZSBpcyBGb3JJblN0YXRlbWVudCB8IEZvck9mU3RhdGVtZW50IHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IG5vZGVUeXBlID0gKG5vZGUgYXMgTm9kZSkudHlwZTtcbiAgcmV0dXJuICdGb3JJblN0YXRlbWVudCcgPT09IG5vZGVUeXBlIHx8ICdGb3JPZlN0YXRlbWVudCcgPT09IG5vZGVUeXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCbG9ja1N0YXRlbWVudChub2RlPzogb2JqZWN0KTogbm9kZSBpcyBCbG9ja1N0YXRlbWVudCB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKG5vZGUgYXMgTm9kZSkudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb25FeHByZXNzaW9uKFxuICBub2RlPzogb2JqZWN0LFxuKTogbm9kZSBpcyBGdW5jdGlvbkV4cHJlc3Npb24ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdGdW5jdGlvbkV4cHJlc3Npb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3RNZXRob2Qobm9kZT86IG9iamVjdCkge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFpc1Byb3BlcnR5KG5vZGUpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBpc0Z1bmN0aW9uKG5vZGUudmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihub2RlPzogb2JqZWN0KSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBub2RlVHlwZSA9IChub2RlIGFzIE5vZGUpLnR5cGU7XG4gIGlmIChcbiAgICAnRnVuY3Rpb25EZWNsYXJhdGlvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgJ0Z1bmN0aW9uRXhwcmVzc2lvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnTWV0aG9kRGVmaW5pdGlvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgICdDbGFzc1ByaXZhdGVNZXRob2QnID09PSBub2RlVHlwZSAvLyBhY29ybiBcdTY1MkZcdTYzMDFcdTc5QzFcdTY3MDlcdTVDNUVcdTYwMjdcdTU0MEVcdUZGMENcdTY2RkZcdTYzNjJcdTRFM0EgZXN0cmVlIFx1NzY4NFx1N0M3Qlx1NTc4QlxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNPYmplY3RNZXRob2Qobm9kZSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Jlc3RFbGVtZW50KG5vZGU/OiBvYmplY3QpOiBub2RlIGlzIFJlc3RFbGVtZW50IHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAnUmVzdEVsZW1lbnQnID09PSAobm9kZSBhcyBOb2RlKS50eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheVBhdHRlcm4obm9kZT86IG9iamVjdCk6IG5vZGUgaXMgQXJyYXlQYXR0ZXJuIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAnQXJyYXlQYXR0ZXJuJyA9PT0gKG5vZGUgYXMgTm9kZSkudHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0UGF0dGVybihub2RlPzogb2JqZWN0KTogbm9kZSBpcyBPYmplY3RQYXR0ZXJuIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAnT2JqZWN0UGF0dGVybicgPT09IChub2RlIGFzIE5vZGUpLnR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Fzc2lnbm1lbnRQYXR0ZXJuKG5vZGU/OiBvYmplY3QpOiBub2RlIGlzIEFzc2lnbm1lbnRQYXR0ZXJuIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAnQXNzaWdubWVudFBhdHRlcm4nID09PSAobm9kZSBhcyBOb2RlKS50eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXR0ZXJuKFxuICBub2RlPzogb2JqZWN0LFxuKTogbm9kZSBpcyBBcnJheVBhdHRlcm4gfCBPYmplY3RQYXR0ZXJuIHwgQXNzaWdubWVudFBhdHRlcm4ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgbm9kZVR5cGUgPSAobm9kZSBhcyBOb2RlKS50eXBlO1xuICBpZiAoXG4gICAgJ0Fzc2lnbm1lbnRQYXR0ZXJuJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnQXJyYXlQYXR0ZXJuJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnT2JqZWN0UGF0dGVybicgPT09IG5vZGVUeXBlXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2F0Y2hDbGF1c2Uobm9kZT86IG9iamVjdCk6IG5vZGUgaXMgQ2F0Y2hDbGF1c2Uge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdDYXRjaENsYXVzZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2dyYW0obm9kZT86IG9iamVjdCkge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdQcm9ncmFtJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb25QYXJlbnQobm9kZT86IG9iamVjdCkge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgbm9kZVR5cGUgPSAobm9kZSBhcyBOb2RlKS50eXBlO1xuICBpZiAoXG4gICAgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nID09PSBub2RlVHlwZSB8fFxuICAgICdGdW5jdGlvbkV4cHJlc3Npb24nID09PSBub2RlVHlwZSB8fFxuICAgICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgJ01ldGhvZERlZmluaXRpb24nID09PSBub2RlVHlwZSB8fFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAnQ2xhc3NQcml2YXRlTWV0aG9kJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgJ1N0YXRpY0Jsb2NrJyA9PT0gbm9kZVR5cGUgfHxcbiAgICBpc09iamVjdE1ldGhvZChub2RlKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jsb2NrUGFyZW50KG5vZGU/OiBvYmplY3QpIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IG5vZGVUeXBlID0gKG5vZGUgYXMgTm9kZSkudHlwZTtcbiAgaWYgKFxuICAgICdCbG9ja1N0YXRlbWVudCcgPT09IG5vZGVUeXBlIHx8XG4gICAgJ0NhdGNoQ2xhdXNlJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRG9XaGlsZVN0YXRlbWVudCcgPT09IG5vZGVUeXBlIHx8XG4gICAgJ0ZvckluU3RhdGVtZW50JyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRm9yU3RhdGVtZW50JyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRnVuY3Rpb25EZWNsYXJhdGlvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgJ0Z1bmN0aW9uRXhwcmVzc2lvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgJ1Byb2dyYW0nID09PSBub2RlVHlwZSB8fFxuICAgICdTd2l0Y2hTdGF0ZW1lbnQnID09PSBub2RlVHlwZSB8fFxuICAgICdXaGlsZVN0YXRlbWVudCcgPT09IG5vZGVUeXBlIHx8XG4gICAgJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRm9yT2ZTdGF0ZW1lbnQnID09PSBub2RlVHlwZSB8fFxuICAgICdNZXRob2REZWZpbml0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICBpc09iamVjdE1ldGhvZChub2RlKSB8fFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAnQ2xhc3NQcml2YXRlTWV0aG9kJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgJ1N0YXRpY0Jsb2NrJyA9PT0gbm9kZVR5cGVcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMYWJlbGVkU3RhdGVtZW50KG5vZGU/OiBvYmplY3QpOiBub2RlIGlzIExhYmVsZWRTdGF0ZW1lbnQge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdMYWJlbGVkU3RhdGVtZW50Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb25EZWNsYXJhdGlvbihcbiAgbm9kZT86IG9iamVjdCxcbik6IG5vZGUgaXMgRnVuY3Rpb25EZWNsYXJhdGlvbiB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKG5vZGUgYXMgTm9kZSkudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZURlY2xhcmF0aW9uKFxuICBub2RlPzogb2JqZWN0LFxuICBvcHRzPzogb2JqZWN0LFxuKTogbm9kZSBpcyBWYXJpYWJsZURlY2xhcmF0aW9uIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IG5vZGVUeXBlID0gKG5vZGUgYXMgTm9kZSkudHlwZTtcbiAgaWYgKG5vZGVUeXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNoYWxsb3dFcXVhbChub2RlLCBvcHRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDbGFzc0RlY2xhcmF0aW9uKG5vZGU/OiBvYmplY3QpOiBub2RlIGlzIENsYXNzRGVjbGFyYXRpb24ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdDbGFzc0RlY2xhcmF0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhwb3J0QWxsRGVjbGFyYXRpb24oXG4gIG5vZGU/OiBvYmplY3QsXG4pOiBub2RlIGlzIEV4cG9ydEFsbERlY2xhcmF0aW9uIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAobm9kZSBhcyBOb2RlKS50eXBlID09PSAnRXhwb3J0QWxsRGVjbGFyYXRpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFeHBvcnREZWNsYXJhdGlvbihcbiAgbm9kZT86IG9iamVjdCxcbik6IG5vZGUgaXNcbiAgfCBFeHBvcnRBbGxEZWNsYXJhdGlvblxuICB8IEV4cG9ydERlZmF1bHREZWNsYXJhdGlvblxuICB8IEV4cG9ydE5hbWVkRGVjbGFyYXRpb24ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgbm9kZVR5cGUgPSAobm9kZSBhcyBOb2RlKS50eXBlO1xuICBpZiAoXG4gICAgJ0V4cG9ydEFsbERlY2xhcmF0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbicgPT09IG5vZGVUeXBlXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uKFxuICBub2RlPzogb2JqZWN0LFxuKTogbm9kZSBpcyBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFeHBvcnRTcGVjaWZpZXIobm9kZT86IG9iamVjdCk6IG5vZGUgaXMgRXhwb3J0U3BlY2lmaWVyIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAobm9kZSBhcyBOb2RlKS50eXBlID09PSAnRXhwb3J0U3BlY2lmaWVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW1wb3J0RGVjbGFyYXRpb24obm9kZT86IG9iamVjdCk6IG5vZGUgaXMgSW1wb3J0RGVjbGFyYXRpb24ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdJbXBvcnREZWNsYXJhdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ltcG9ydERlZmF1bHRTcGVjaWZpZXIoXG4gIG5vZGU/OiBvYmplY3QsXG4pOiBub2RlIGlzIEltcG9ydERlZmF1bHRTcGVjaWZpZXIge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyKFxuICBub2RlPzogb2JqZWN0LFxuKTogbm9kZSBpcyBJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXIge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIChub2RlIGFzIE5vZGUpLnR5cGUgPT09ICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWNsYXJhdGlvbihub2RlPzogb2JqZWN0KSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBub2RlVHlwZSA9IChub2RlIGFzIE5vZGUpLnR5cGU7XG4gIGlmIChcbiAgICAnRnVuY3Rpb25EZWNsYXJhdGlvbicgPT09IG5vZGVUeXBlIHx8XG4gICAgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nID09PSBub2RlVHlwZSB8fFxuICAgICdDbGFzc0RlY2xhcmF0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRXhwb3J0QWxsRGVjbGFyYXRpb24nID09PSBub2RlVHlwZSB8fFxuICAgICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nID09PSBub2RlVHlwZSB8fFxuICAgICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnSW1wb3J0RGVjbGFyYXRpb24nID09PSBub2RlVHlwZVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Njb3BlKG5vZGU6IE5vZGUsIHBhcmVudDogTm9kZSkge1xuICBpZiAoaXNCbG9ja1N0YXRlbWVudChub2RlKSAmJiAoaXNGdW5jdGlvbihwYXJlbnQpIHx8IGlzQ2F0Y2hDbGF1c2UocGFyZW50KSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGlzUGF0dGVybihub2RlKSAmJiAoaXNGdW5jdGlvbihwYXJlbnQpIHx8IGlzQ2F0Y2hDbGF1c2UocGFyZW50KSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gaXNTY29wYWJsZShub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2NvcGFibGUobm9kZT86IG9iamVjdCkge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgbm9kZVR5cGUgPSAobm9kZSBhcyBOb2RlKS50eXBlO1xuICBpZiAoXG4gICAgJ0Jsb2NrU3RhdGVtZW50JyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnQ2F0Y2hDbGF1c2UnID09PSBub2RlVHlwZSB8fFxuICAgICdEb1doaWxlU3RhdGVtZW50JyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRm9ySW5TdGF0ZW1lbnQnID09PSBub2RlVHlwZSB8fFxuICAgICdGb3JTdGF0ZW1lbnQnID09PSBub2RlVHlwZSB8fFxuICAgICdGdW5jdGlvbkRlY2xhcmF0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRnVuY3Rpb25FeHByZXNzaW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnUHJvZ3JhbScgPT09IG5vZGVUeXBlIHx8XG4gICAgJ1N3aXRjaFN0YXRlbWVudCcgPT09IG5vZGVUeXBlIHx8XG4gICAgJ1doaWxlU3RhdGVtZW50JyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nID09PSBub2RlVHlwZSB8fFxuICAgICdDbGFzc0V4cHJlc3Npb24nID09PSBub2RlVHlwZSB8fFxuICAgICdDbGFzc0RlY2xhcmF0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAnRm9yT2ZTdGF0ZW1lbnQnID09PSBub2RlVHlwZSB8fFxuICAgICdNZXRob2REZWZpbml0aW9uJyA9PT0gbm9kZVR5cGUgfHxcbiAgICBpc09iamVjdE1ldGhvZChub2RlKSB8fFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAnQ2xhc3NQcml2YXRlTWV0aG9kJyA9PT0gbm9kZVR5cGUgfHxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgJ1N0YXRpY0Jsb2NrJyA9PT0gbm9kZVR5cGVcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSZWZlcmVuY2VkKG5vZGU6IE5vZGUsIHBhcmVudDogTm9kZSwgZ3JhbmRwYXJlbnQ6IE5vZGUpIHtcbiAgc3dpdGNoIChwYXJlbnQudHlwZSkge1xuICAgIC8vIHllczogUEFSRU5UW05PREVdXG4gICAgLy8geWVzOiBOT0RFLmNoaWxkXG4gICAgLy8gbm86IHBhcmVudC5OT0RFXG4gICAgY2FzZSAnTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhc2UgJ09wdGlvbmFsTWVtYmVyRXhwcmVzc2lvbic6IC8vIGFjb3JuIFx1OEZEOFx1NkNBMVx1NjcwOVx1NUI5RVx1NzNCMFx1NTNFRlx1OTAwOVx1OTRGRVxuICAgICAgaWYgKHBhcmVudC5wcm9wZXJ0eSA9PT0gbm9kZSkge1xuICAgICAgICByZXR1cm4gISFwYXJlbnQuY29tcHV0ZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyZW50Lm9iamVjdCA9PT0gbm9kZTtcblxuICAgIC8vIG5vOiBsZXQgTk9ERSA9IGluaXQ7XG4gICAgLy8geWVzOiBsZXQgaWQgPSBOT0RFO1xuICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRvcic6XG4gICAgICByZXR1cm4gcGFyZW50LmluaXQgPT09IG5vZGU7XG5cbiAgICAvLyB5ZXM6ICgpID0+IE5PREVcbiAgICAvLyBubzogKE5PREUpID0+IHt9XG4gICAgY2FzZSAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHBhcmVudC5ib2R5ID09PSBub2RlO1xuXG4gICAgLy8gbm86IGNsYXNzIHsgI05PREU7IH1cbiAgICAvLyBubzogY2xhc3MgeyBnZXQgI05PREUoKSB7fSB9XG4gICAgLy8gbm86IGNsYXNzIHsgI05PREUoKSB7fSB9XG4gICAgLy8gbm86IGNsYXNzIHsgZm4oKSB7IHJldHVybiB0aGlzLiNOT0RFOyB9IH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY2FzZSAnUHJpdmF0ZU5hbWUnOiAvLyBhY29ybiBcdThGRDhcdTZDQTFcdTY3MDlcdTVCOUVcdTczQjBcdTc5QzFcdTY3MDlcdTVDNUVcdTYwMjdcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIG1ldGhvZDpcbiAgICAvLyAgbm86IGNsYXNzIHsgTk9ERSgpIHt9IH1cbiAgICAvLyAgeWVzOiBjbGFzcyB7IFtOT0RFXSgpIHt9IH1cbiAgICAvLyAgbm86IGNsYXNzIHsgZm9vKE5PREUpIHt9IH1cbiAgICAvLyBwcm9wZXJ0eVxuICAgIC8vICB5ZXM6IHsgW05PREVdOiBcIlwiIH1cbiAgICAvLyAgbm86IHsgTk9ERTogXCJcIiB9XG4gICAgLy8gIGRlcGVuZHM6IHsgTk9ERSB9XG4gICAgLy8gIGRlcGVuZHM6IHsga2V5OiBOT0RFIH1cbiAgICBjYXNlICdNZXRob2REZWZpbml0aW9uJzogLy8gYmFiZWwgXHU2NkZGXHU2MzYyXHU0RTNBXHU0RTg2IENsYXNzTWV0aG9kXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhc2UgJ0NsYXNzUHJpdmF0ZU1ldGhvZCc6IC8vIGFjb3JuIFx1OEZEOFx1NkNBMVx1NjcwOVx1NUI5RVx1NzNCMFx1NzlDMVx1NjcwOVx1NjVCOVx1NkNENVxuICAgIGNhc2UgJ1Byb3BlcnR5JzpcbiAgICAgIGlmIChwYXJlbnQua2V5ID09PSBub2RlKSB7XG4gICAgICAgIHJldHVybiAhIXBhcmVudC5jb21wdXRlZDtcbiAgICAgIH1cbiAgICAgIGlmIChpc09iamVjdE1ldGhvZChub2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwYXJlbnQudmFsdWUgPT09IG5vZGVcbiAgICAgICAgcmV0dXJuICFncmFuZHBhcmVudCB8fCBncmFuZHBhcmVudC50eXBlICE9PSAnT2JqZWN0UGF0dGVybic7XG4gICAgICB9XG5cbiAgICAvLyBubzogY2xhc3MgeyBOT0RFID0gdmFsdWU7IH1cbiAgICAvLyB5ZXM6IGNsYXNzIHsgW05PREVdID0gdmFsdWU7IH1cbiAgICAvLyB5ZXM6IGNsYXNzIHsga2V5ID0gTk9ERTsgfVxuICAgIC8vIGNhc2UgJ0NsYXNzUHJvcGVydHknOlxuICAgIGNhc2UgJ1Byb3BlcnR5RGVmaW5pdGlvbic6IC8vIGFjb3JuIFx1OEZEOFx1NkNBMVx1NjcwOVx1NUI5RVx1NzNCMFx1N0M3Qlx1NzY4NFx1NUM1RVx1NjAyN1x1NUI5QVx1NEU0OVxuICAgICAgaWYgKHBhcmVudC5rZXkgPT09IG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICEhcGFyZW50LmNvbXB1dGVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhc2UgJ0NsYXNzUHJpdmF0ZVByb3BlcnR5JzogLy8gYWNvcm4gXHU4RkQ4XHU2Q0ExXHU2NzA5XHU1QjlFXHU3M0IwXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXR1cm4gcGFyZW50LmtleSAhPT0gbm9kZTtcblxuICAgIC8vIG5vOiBjbGFzcyBOT0RFIHt9XG4gICAgLy8geWVzOiBjbGFzcyBGb28gZXh0ZW5kcyBOT0RFIHt9XG4gICAgY2FzZSAnQ2xhc3NEZWNsYXJhdGlvbic6XG4gICAgY2FzZSAnQ2xhc3NFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwYXJlbnQuc3VwZXJDbGFzcyA9PT0gbm9kZTtcblxuICAgIC8vIHllczogbGVmdCA9IE5PREU7XG4gICAgLy8gbm86IE5PREUgPSByaWdodDtcbiAgICBjYXNlICdBc3NpZ25tZW50RXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcGFyZW50LnJpZ2h0ID09PSBub2RlO1xuXG4gICAgLy8gbm86IFtOT0RFID0gZm9vXSA9IFtdO1xuICAgIC8vIHllczogW2ZvbyA9IE5PREVdID0gW107XG4gICAgY2FzZSAnQXNzaWdubWVudFBhdHRlcm4nOlxuICAgICAgcmV0dXJuIHBhcmVudC5yaWdodCA9PT0gbm9kZTtcblxuICAgIC8vIG5vOiBOT0RFOiBmb3IgKDs7KSB7fVxuICAgIGNhc2UgJ0xhYmVsZWRTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gbm86IHRyeSB7fSBjYXRjaCAoTk9ERSkge31cbiAgICBjYXNlICdDYXRjaENsYXVzZSc6XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBubzogZnVuY3Rpb24gZm9vKC4uLk5PREUpIHt9XG4gICAgY2FzZSAnUmVzdEVsZW1lbnQnOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY2FzZSAnQnJlYWtTdGF0ZW1lbnQnOlxuICAgIGNhc2UgJ0NvbnRpbnVlU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIG5vOiBmdW5jdGlvbiBOT0RFKCkge31cbiAgICAvLyBubzogZnVuY3Rpb24gZm9vKE5PREUpIHt9XG4gICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgY2FzZSAnRnVuY3Rpb25FeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIG5vOiBleHBvcnQgTk9ERSBmcm9tIFwiZm9vXCI7XG4gICAgLy8gbm86IGV4cG9ydCAqIGFzIE5PREUgZnJvbSBcImZvb1wiO1xuICAgIGNhc2UgJ0V4cG9ydEFsbERlY2xhcmF0aW9uJzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIG5vOiBleHBvcnQgeyBmb28gYXMgTk9ERSB9O1xuICAgIC8vIHllczogZXhwb3J0IHsgTk9ERSBhcyBmb28gfTtcbiAgICAvLyBubzogZXhwb3J0IHsgTk9ERSBhcyBmb28gfSBmcm9tIFwiZm9vXCI7XG4gICAgY2FzZSAnRXhwb3J0U3BlY2lmaWVyJzpcbiAgICAgIGlmICgoZ3JhbmRwYXJlbnQgYXMgRXhwb3J0TmFtZWREZWNsYXJhdGlvbik/LnNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyZW50LmxvY2FsID09PSBub2RlO1xuXG4gICAgLy8gbm86IGltcG9ydCBOT0RFIGZyb20gXCJmb29cIjtcbiAgICAvLyBubzogaW1wb3J0ICogYXMgTk9ERSBmcm9tIFwiZm9vXCI7XG4gICAgLy8gbm86IGltcG9ydCB7IE5PREUgYXMgZm9vIH0gZnJvbSBcImZvb1wiO1xuICAgIC8vIG5vOiBpbXBvcnQgeyBmb28gYXMgTk9ERSB9IGZyb20gXCJmb29cIjtcbiAgICAvLyBubzogaW1wb3J0IE5PREUgZnJvbSBcImJhclwiO1xuICAgIGNhc2UgJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInOlxuICAgIGNhc2UgJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcic6XG4gICAgY2FzZSAnSW1wb3J0U3BlY2lmaWVyJzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIG5vOiBpbXBvcnQgXCJmb29cIiBhc3NlcnQgeyBOT0RFOiBcImpzb25cIiB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNhc2UgJ0ltcG9ydEF0dHJpYnV0ZSc6IC8vIGFjb3JuIFx1OEZEOFx1NkNBMVx1NjcwOVx1NUI5RVx1NzNCMFxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gbm86IFtOT0RFXSA9IFtdO1xuICAgIC8vIG5vOiAoeyBOT0RFIH0pID0gW107XG4gICAgY2FzZSAnT2JqZWN0UGF0dGVybic6XG4gICAgY2FzZSAnQXJyYXlQYXR0ZXJuJzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIG5vOiBuZXcuTk9ERVxuICAgIC8vIG5vOiBOT0RFLnRhcmdldFxuICAgIGNhc2UgJ01ldGFQcm9wZXJ0eSc6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuICBMaXRlcmFsLFxuICBQcm9wZXJ0eSxcbiAgSWRlbnRpZmllcixcbiAgQ2FsbEV4cHJlc3Npb24sXG4gIE9iamVjdEV4cHJlc3Npb24sXG4gIE1lbWJlckV4cHJlc3Npb24sXG4gIEFzc2lnbm1lbnRFeHByZXNzaW9uLFxuICBBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbixcbiAgQmxvY2tTdGF0ZW1lbnQsXG4gIEV4cHJlc3Npb25TdGF0ZW1lbnQsXG4gIFZhcmlhYmxlRGVjbGFyYXRvcixcbiAgVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgRnVuY3Rpb25EZWNsYXJhdGlvbixcbn0gZnJvbSAnZXN0cmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZpZXIobmFtZTogc3RyaW5nKTogSWRlbnRpZmllciB7XG4gIHJldHVybiB7IG5hbWUsIHR5cGU6ICdJZGVudGlmaWVyJyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGl0ZXJhbCh2YWx1ZTogTGl0ZXJhbFsndmFsdWUnXSk6IExpdGVyYWwge1xuICByZXR1cm4ge1xuICAgIHZhbHVlLFxuICAgIHR5cGU6ICdMaXRlcmFsJyxcbiAgfSBhcyBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YXJpYWJsZURlY2xhcmF0b3IoXG4gIGlkOiBWYXJpYWJsZURlY2xhcmF0b3JbJ2lkJ10sXG4gIGluaXQ6IFZhcmlhYmxlRGVjbGFyYXRvclsnaW5pdCddLFxuKTogVmFyaWFibGVEZWNsYXJhdG9yIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBpbml0LFxuICAgIHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0b3InLFxuICB9O1xufVxuXG4vLyBraW5kOiAndmFyJyB8ICdsZXQnIHwgJ2NvbnN0J1xuZXhwb3J0IGZ1bmN0aW9uIHZhcmlhYmxlRGVjbGFyYXRpb24oXG4gIGtpbmQ6IFZhcmlhYmxlRGVjbGFyYXRpb25bJ2tpbmQnXSxcbiAgZGVjbGFyYXRpb25zOiBWYXJpYWJsZURlY2xhcmF0aW9uWydkZWNsYXJhdGlvbnMnXSxcbik6IFZhcmlhYmxlRGVjbGFyYXRpb24ge1xuICByZXR1cm4ge1xuICAgIGtpbmQsXG4gICAgZGVjbGFyYXRpb25zLFxuICAgIHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0aW9uJyxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxFeHByZXNzaW9uKFxuICBjYWxsZWU6IENhbGxFeHByZXNzaW9uWydjYWxsZWUnXSxcbiAgX2FyZ3VtZW50czogQ2FsbEV4cHJlc3Npb25bJ2FyZ3VtZW50cyddLFxuICBvcHRpb25hbCA9IGZhbHNlLFxuKTogQ2FsbEV4cHJlc3Npb24ge1xuICByZXR1cm4ge1xuICAgIGNhbGxlZSxcbiAgICBvcHRpb25hbCxcbiAgICBhcmd1bWVudHM6IF9hcmd1bWVudHMsXG4gICAgdHlwZTogJ0NhbGxFeHByZXNzaW9uJyxcbiAgfTtcbn1cblxuLy8ga2luZDogaW5pdCB8IGdldCB8IHNldFxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFByb3BlcnR5KFxuICBrZXk6IFByb3BlcnR5WydrZXknXSxcbiAgdmFsdWU6IFByb3BlcnR5Wyd2YWx1ZSddLFxuICBraW5kOiBQcm9wZXJ0eVsna2luZCddID0gJ2luaXQnLFxuICBtZXRob2QgPSBmYWxzZSxcbiAgY29tcHV0ZWQgPSBmYWxzZSxcbiAgc2hvcnRoYW5kID0gZmFsc2UsXG4gIGRlY29yYXRvcnMgPSBudWxsLFxuKTogUHJvcGVydHkge1xuICByZXR1cm4ge1xuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgICBraW5kLFxuICAgIG1ldGhvZCxcbiAgICBjb21wdXRlZCxcbiAgICBzaG9ydGhhbmQsXG4gICAgZGVjb3JhdG9ycyxcbiAgICB0eXBlOiAnUHJvcGVydHknLFxuICB9IGFzIGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycm93RnVuY3Rpb25FeHByZXNzaW9uKFxuICBwYXJhbXM6IEFycm93RnVuY3Rpb25FeHByZXNzaW9uWydwYXJhbXMnXSxcbiAgYm9keTogQXJyb3dGdW5jdGlvbkV4cHJlc3Npb25bJ2JvZHknXSxcbiAgYXN5bmMgPSBmYWxzZSxcbiAgZXhwcmVzc2lvbiA9IGZhbHNlLFxuKTogQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24ge1xuICByZXR1cm4ge1xuICAgIHBhcmFtcyxcbiAgICBib2R5LFxuICAgIGFzeW5jLFxuICAgIGV4cHJlc3Npb24sXG4gICAgdHlwZTogJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJyxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdEV4cHJlc3Npb24oXG4gIHByb3BlcnRpZXM6IE9iamVjdEV4cHJlc3Npb25bJ3Byb3BlcnRpZXMnXSxcbik6IE9iamVjdEV4cHJlc3Npb24ge1xuICByZXR1cm4ge1xuICAgIHByb3BlcnRpZXMsXG4gICAgdHlwZTogJ09iamVjdEV4cHJlc3Npb24nLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVtYmVyRXhwcmVzc2lvbihcbiAgb2JqZWN0OiBNZW1iZXJFeHByZXNzaW9uWydvYmplY3QnXSxcbiAgcHJvcGVydHk6IE1lbWJlckV4cHJlc3Npb25bJ3Byb3BlcnR5J10sXG4gIGNvbXB1dGVkID0gZmFsc2UsXG4gIG9wdGlvbmFsID0gZmFsc2UsXG4pOiBNZW1iZXJFeHByZXNzaW9uIHtcbiAgcmV0dXJuIHtcbiAgICBvYmplY3QsXG4gICAgcHJvcGVydHksXG4gICAgY29tcHV0ZWQsXG4gICAgb3B0aW9uYWwsXG4gICAgdHlwZTogJ01lbWJlckV4cHJlc3Npb24nLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwcmVzc2lvblN0YXRlbWVudChcbiAgZXhwcmVzc2lvbjogRXhwcmVzc2lvblN0YXRlbWVudFsnZXhwcmVzc2lvbiddLFxuICBkaXJlY3RpdmU6IHN0cmluZyxcbik6IEV4cHJlc3Npb25TdGF0ZW1lbnQge1xuICBjb25zdCBub2RlOiBhbnkgPSB7XG4gICAgZXhwcmVzc2lvbixcbiAgICB0eXBlOiAnRXhwcmVzc2lvblN0YXRlbWVudCcsXG4gIH07XG4gIGlmIChkaXJlY3RpdmUpIG5vZGUuZGlyZWN0aXZlID0gZGlyZWN0aXZlO1xuICByZXR1cm4gbm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrU3RhdGVtZW50KGJvZHk6IEJsb2NrU3RhdGVtZW50Wydib2R5J10pOiBCbG9ja1N0YXRlbWVudCB7XG4gIHJldHVybiB7XG4gICAgYm9keSxcbiAgICB0eXBlOiAnQmxvY2tTdGF0ZW1lbnQnLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnVuY3Rpb25EZWNsYXJhdGlvbihcbiAgaWQ6IEZ1bmN0aW9uRGVjbGFyYXRpb25bJ2lkJ10sXG4gIHBhcmFtczogRnVuY3Rpb25EZWNsYXJhdGlvblsncGFyYW1zJ10sXG4gIGJvZHk6IEZ1bmN0aW9uRGVjbGFyYXRpb25bJ2JvZHknXSxcbiAgZ2VuZXJhdG9yID0gZmFsc2UsXG4gIGFzeW5jID0gZmFsc2UsXG4pOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBwYXJhbXMsXG4gICAgYm9keSxcbiAgICBhc3luYyxcbiAgICBnZW5lcmF0b3IsXG4gICAgdHlwZTogJ0Z1bmN0aW9uRGVjbGFyYXRpb24nLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWdubWVudEV4cHJlc3Npb24oXG4gIG9wZXJhdG9yOiBBc3NpZ25tZW50RXhwcmVzc2lvblsnb3BlcmF0b3InXSxcbiAgbGVmdDogQXNzaWdubWVudEV4cHJlc3Npb25bJ2xlZnQnXSxcbiAgcmlnaHQ6IEFzc2lnbm1lbnRFeHByZXNzaW9uWydyaWdodCddLFxuKTogQXNzaWdubWVudEV4cHJlc3Npb24ge1xuICByZXR1cm4ge1xuICAgIG9wZXJhdG9yLFxuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gICAgdHlwZTogJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJyxcbiAgfTtcbn1cbiIsICIvLyBUaGUgdmVyc2lvbiBvZiBgc291cmNlLW1hcGAgc2hvdWxkIGFsd2F5cyBiZSBgMC42LjFgIHdpdGggZXNjb2RlZ2VuIG5ld3NwYXBlcixcbi8vIG90aGVyd2lzZSBpdCB3aWxsIHBhY2thZ2UgdHdvIHNvdXJjZSBjb2RlLlxuaW1wb3J0IHtcbiAgUmF3U291cmNlTWFwLFxuICBTb3VyY2VNYXBDb25zdW1lcixcbiAgU291cmNlTWFwR2VuZXJhdG9yLFxufSBmcm9tICdzb3VyY2UtbWFwJztcbmltcG9ydCB7IHRyYW5zZm9ybVVybCB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgT3V0cHV0LCBDb21waWxlciB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb25zdCBQUkVGSVhfUkVHID0gL15bI0BdXFxzP3NvdXJjZU1hcHBpbmdVUkxcXHM/PVxccz8vO1xuXG5mdW5jdGlvbiBtZXJnZShvbGRNYXA6IFJhd1NvdXJjZU1hcCwgbmV3TWFwOiBSYXdTb3VyY2VNYXApIHtcbiAgY29uc3Qgb2xkTWFwQ29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIob2xkTWFwKTtcbiAgY29uc3QgbmV3TWFwQ29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIobmV3TWFwKTtcbiAgY29uc3QgbWVyZ2VkTWFwR2VuZXJhdG9yID0gbmV3IFNvdXJjZU1hcEdlbmVyYXRvcigpO1xuXG4gIG5ld01hcENvbnN1bWVyLmVhY2hNYXBwaW5nKChtKSA9PiB7XG4gICAgaWYgKCFtLm9yaWdpbmFsTGluZSkgcmV0dXJuO1xuICAgIGNvbnN0IG9yaWdQb3NJbk9sZE1hcCA9IG9sZE1hcENvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xuICAgICAgbGluZTogbS5vcmlnaW5hbExpbmUsXG4gICAgICBjb2x1bW46IG0ub3JpZ2luYWxDb2x1bW4sXG4gICAgfSk7XG5cbiAgICBpZiAob3JpZ1Bvc0luT2xkTWFwLnNvdXJjZSkge1xuICAgICAgbWVyZ2VkTWFwR2VuZXJhdG9yLmFkZE1hcHBpbmcoe1xuICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgIGxpbmU6IG9yaWdQb3NJbk9sZE1hcC5saW5lLFxuICAgICAgICAgIGNvbHVtbjogb3JpZ1Bvc0luT2xkTWFwLmNvbHVtbixcbiAgICAgICAgfSxcbiAgICAgICAgZ2VuZXJhdGVkOiB7XG4gICAgICAgICAgbGluZTogbS5nZW5lcmF0ZWRMaW5lLFxuICAgICAgICAgIGNvbHVtbjogbS5nZW5lcmF0ZWRDb2x1bW4sXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IG9yaWdQb3NJbk9sZE1hcC5uYW1lLFxuICAgICAgICBzb3VyY2U6IG9yaWdQb3NJbk9sZE1hcC5zb3VyY2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIFtvbGRNYXBDb25zdW1lciwgbmV3TWFwQ29uc3VtZXJdLmZvckVhY2goKGNvbnN1bWVyKSA9PiB7XG4gICAgKGNvbnN1bWVyIGFzIGFueSkuc291cmNlcy5mb3JFYWNoKChzb3VyY2VGaWxlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZUNvbnRlbnQgPSBjb25zdW1lci5zb3VyY2VDb250ZW50Rm9yKHNvdXJjZUZpbGUpO1xuICAgICAgaWYgKHNvdXJjZUNvbnRlbnQpIHtcbiAgICAgICAgbWVyZ2VkTWFwR2VuZXJhdG9yLnNldFNvdXJjZUNvbnRlbnQoc291cmNlRmlsZSwgc291cmNlQ29udGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBtZXJnZWRNYXBHZW5lcmF0b3IudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1lcmdlU291cmNlbWFwKGNvbXBpbGVyOiBDb21waWxlciwgb3V0cHV0OiBPdXRwdXQpIHtcbiAgaWYgKCFjb21waWxlci5zb3VyY2VtYXBDb21tZW50KSB7XG4gICAgb3V0cHV0Lm1hcCA9IG91dHB1dC5tYXAudG9TdHJpbmcoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgbmV3TWFwID0gKG91dHB1dC5tYXAgYXMgYW55KS50b0pTT04oKTtcbiAgaWYgKCFuZXdNYXAubWFwcGluZ3MpIHtcbiAgICBvdXRwdXQubWFwID0gb3V0cHV0Lm1hcC50b1N0cmluZygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbGV0IG9sZE1hcDtcbiAgICBjb25zdCBmbGFnID0gJ2Jhc2U2NCwnO1xuICAgIGNvbnN0IG1hcEluZm8gPSBjb21waWxlci5zb3VyY2VtYXBDb21tZW50LnRyaW0oKS5yZXBsYWNlKFBSRUZJWF9SRUcsICcnKTtcbiAgICBjb25zdCBpbmRleCA9IG1hcEluZm8uaW5kZXhPZihmbGFnKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBvbGRNYXAgPSBKU09OLnBhcnNlKGF0b2IobWFwSW5mby5zbGljZShpbmRleCArIGZsYWcubGVuZ3RoKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbGVuYW1lLFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgbG9hZGVyLFxuICAgICAgICAgIG9wdGlvbnM6IHsgc2NvcGUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0gPSBjb21waWxlci5vcHRpb25zO1xuICAgICAgY29uc3QgcmVxdWVzdFVybCA9IHRyYW5zZm9ybVVybChmaWxlbmFtZSwgbWFwSW5mbyk7XG4gICAgICBjb25zdCB7IGNvZGUgfSA9IGF3YWl0IGxvYWRlci5sb2FkKHsgc2NvcGUsIHVybDogcmVxdWVzdFVybCB9KTtcbiAgICAgIG9sZE1hcCA9IEpTT04ucGFyc2UoY29kZSk7XG4gICAgfVxuXG4gICAgb3V0cHV0Lm1hcCA9XG4gICAgICBvbGRNYXAgJiYgb2xkTWFwLm1hcHBpbmdzID8gbWVyZ2Uob2xkTWFwLCBuZXdNYXApIDogb3V0cHV0Lm1hcC50b1N0cmluZygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgb3V0cHV0Lm1hcCA9IG91dHB1dC5tYXAudG9TdHJpbmcoKTtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn1cbiIsICIvLyBJbnNwaXJlZCBieSBgQGJhYmVsL3RyYXZlcnNlYFxuaW1wb3J0IHR5cGUgeyBOb2RlLCBJZGVudGlmaWVyLCBFeHByZXNzaW9uIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IGJhc2UgfSBmcm9tICdhY29ybi13YWxrJztcbmltcG9ydCB7IFNjb3BlIH0gZnJvbSAnLi9zY29wZSc7XG5pbXBvcnQgeyBjb2xsZWN0b3JWaXNpdG9yIH0gZnJvbSAnLi9jb2xsZWN0b3JWaXNpdG9yJztcbmltcG9ydCB7XG4gIGlzU2NvcGUsXG4gIGlzUHJvZ3JhbSxcbiAgaXNQcm9wZXJ0eSxcbiAgaXNJZGVudGlmaWVyLFxuICBpc1JlZmVyZW5jZWQsXG4gIGlzQmxvY2tTY29wZWQsXG4gIGlzRGVjbGFyYXRpb24sXG4gIGlzQmxvY2tQYXJlbnQsXG4gIGlzUmVzdEVsZW1lbnQsXG4gIGlzQXJyYXlQYXR0ZXJuLFxuICBpc09iamVjdFBhdHRlcm4sXG4gIGlzQXNzaWdubWVudFBhdHRlcm4sXG4gIGlzRm9yWFN0YXRlbWVudCxcbiAgaXNGdW5jdGlvblBhcmVudCxcbiAgaXNFeHBvcnREZWNsYXJhdGlvbixcbn0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFN0YXRlID0gUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlU3RhdGU+O1xuXG50eXBlIEFzc2lnbm1lbnRzID0gU2V0PFxuICAoKSA9PiB7XG4gICAgc2NvcGU6IFNjb3BlO1xuICAgIGlkczogQXJyYXk8SWRlbnRpZmllcj47XG4gIH1cbj47XG5cbnR5cGUgQ29uc3RhbnRWaW9sYXRpb25zID0gU2V0PFxuICAoKSA9PiB7XG4gICAgc2NvcGU6IFNjb3BlO1xuICAgIG5vZGU6IEV4cHJlc3Npb247XG4gIH1cbj47XG5cbnR5cGUgUmVmZXJlbmNlcyA9IFNldDxcbiAgKCkgPT4ge1xuICAgIHNjb3BlOiBTY29wZTtcbiAgICBpZHM6IEFycmF5PElkZW50aWZpZXI+O1xuICAgIHR5cGU6ICdpZGVudGlmaWVyJyB8ICdleHBvcnQnO1xuICB9XG4+O1xuXG5jb25zdCB2aXJ0dWFsVHlwZXMgPSB7XG4gIERlY2xhcmF0aW9uOiBpc0RlY2xhcmF0aW9uLFxuICBCbG9ja1Njb3BlZDogaXNCbG9ja1Njb3BlZCxcbiAgRm9yWFN0YXRlbWVudDogaXNGb3JYU3RhdGVtZW50LFxuICBFeHBvcnREZWNsYXJhdGlvbjogaXNFeHBvcnREZWNsYXJhdGlvbixcbn07XG5cbmNvbnN0IHZpcnR1YWxUeXBlc0tleXMgPSBPYmplY3Qua2V5cyh2aXJ0dWFsVHlwZXMpO1xuXG5mdW5jdGlvbiBnZXRQYXJlbnRTY29wZShcbiAgc2NvcGU6IFNjb3BlLFxuICBjb25kaXRpb246IChub2RlOiBOb2RlKSA9PiBib29sZWFuLFxuKTogU2NvcGUgfCBudWxsIHtcbiAgZG8ge1xuICAgIGlmIChjb25kaXRpb24oc2NvcGUubm9kZSkpIHtcbiAgICAgIHJldHVybiBzY29wZTtcbiAgICB9XG4gIH0gd2hpbGUgKHNjb3BlLnBhcmVudCAmJiAoc2NvcGUgPSBzY29wZS5wYXJlbnQpKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGV4ZWNEZWZlclF1ZXVlKHN0YXRlOiBTdGF0ZSkge1xuICBjb25zdCBwcm9ncmFtUGFyZW50ID0gc3RhdGUucHJvZ3JhbVBhcmVudDtcbiAgc3RhdGUuZGVmZXIuYXNzaWdubWVudHMuZm9yRWFjaCgoZm4pID0+IHtcbiAgICBjb25zdCB7IGlkcywgc2NvcGUgfSA9IGZuKCk7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIGlkcykge1xuICAgICAgaWYgKCFzY29wZS5nZXRCaW5kaW5nKG5vZGUubmFtZSkpIHtcbiAgICAgICAgcHJvZ3JhbVBhcmVudD8uYWRkR2xvYmFsKG5vZGUpO1xuICAgICAgfVxuICAgICAgc2NvcGUucmVnaXN0ZXJDb25zdGFudFZpb2xhdGlvbihub2RlLm5hbWUsIG5vZGUpO1xuICAgIH1cbiAgfSk7XG4gIHN0YXRlLmRlZmVyLnJlZmVyZW5jZXMuZm9yRWFjaCgoZm4pID0+IHtcbiAgICBjb25zdCB7IGlkcywgdHlwZSwgc2NvcGUgfSA9IGZuKCk7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIGlkcykge1xuICAgICAgY29uc3QgYmluZGluZyA9IHNjb3BlLmdldEJpbmRpbmcobm9kZS5uYW1lKTtcbiAgICAgIGlmIChiaW5kaW5nKSB7XG4gICAgICAgIGJpbmRpbmcucmVmZXJlbmNlcy5hZGQobm9kZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdpZGVudGlmaWVyJykge1xuICAgICAgICBwcm9ncmFtUGFyZW50Py5hZGRHbG9iYWwobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgc3RhdGUuZGVmZXIuY29uc3RhbnRWaW9sYXRpb25zLmZvckVhY2goKGZuKSA9PiB7XG4gICAgY29uc3QgeyBub2RlLCBzY29wZSB9ID0gZm4oKTtcbiAgICBjb25zdCBpZHMgPSBnZXRCaW5kaW5nSWRlbnRpZmllcnMobm9kZSk7XG4gICAgZm9yIChjb25zdCBpZCBvZiBpZHMpIHtcbiAgICAgIHNjb3BlLnJlZ2lzdGVyQ29uc3RhbnRWaW9sYXRpb24oaWQubmFtZSwgbm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gd2FsayhcbiAgbm9kZTogTm9kZSxcbiAgdmlzaXRvcnM6IFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgKG5vZGU6IE5vZGUsIHN0YXRlOiBTdGF0ZSwgYW5jZXN0b3JzOiBBcnJheTxOb2RlPikgPT4gdm9pZFxuICA+LFxuICBzdGF0ZTogU3RhdGUsXG4pIHtcbiAgY29uc3QgYW5jZXN0b3JzOiBBcnJheTxOb2RlPiA9IFtdO1xuICBjb25zdCBjYWxsID0gKG5vZGU6IE5vZGUsIHN0OiBTdGF0ZSwgb3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB0eXBlID0gb3ZlcnJpZGUgfHwgbm9kZS50eXBlO1xuICAgIGNvbnN0IGZvdW5kID0gdmlzaXRvcnNbdHlwZV07XG4gICAgY29uc3QgaXNOZXcgPSBub2RlICE9PSBhbmNlc3RvcnNbYW5jZXN0b3JzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGlzQ3VycmVudE5vZGUgPSB0eXBlID09PSBub2RlLnR5cGU7XG4gICAgY29uc3QgdmlydHVhbEZuS2V5cyA9IHZpcnR1YWxUeXBlc0tleXMuZmlsdGVyKChrKSA9PiB2aXJ0dWFsVHlwZXNba10obm9kZSkpO1xuICAgIGlmIChpc05ldykgYW5jZXN0b3JzLnB1c2gobm9kZSk7XG4gICAgaWYgKGlzQ3VycmVudE5vZGUpIHtcbiAgICAgIHN0YXRlLmFuY2VzdG9ycy5zZXQobm9kZSwgWy4uLmFuY2VzdG9yc10pO1xuICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGFuY2VzdG9yc1thbmNlc3RvcnMubGVuZ3RoIC0gMl07XG4gICAgICBsZXQgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KHBhcmVudE5vZGUpO1xuICAgICAgaWYgKGlzUHJvZ3JhbShub2RlKSB8fCBpc1Njb3BlKG5vZGUsIHBhcmVudE5vZGUpKSB7XG4gICAgICAgIHNjb3BlID0gbmV3IFNjb3BlKG5vZGUsIHNjb3BlKTtcbiAgICAgIH1cbiAgICAgIHNjb3BlICYmIHN0YXRlLnNjb3Blcy5zZXQobm9kZSwgc2NvcGUpO1xuICAgIH1cblxuICAgIC8vIFx1OTAxMlx1NUY1Mlx1OEMwM1x1NzUyOFxuICAgIGJhc2VbdHlwZV0obm9kZSBhcyBhbnksIHN0LCBjYWxsIGFzIGFueSk7XG5cbiAgICBpZiAoZm91bmQpIGZvdW5kKG5vZGUsIHN0IHx8IChhbmNlc3RvcnMgYXMgYW55KSwgYW5jZXN0b3JzKTtcbiAgICBpZiAoaXNDdXJyZW50Tm9kZSAmJiB2aXJ0dWFsRm5LZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIHZpcnR1YWxGbktleXMpIHtcbiAgICAgICAgY29uc3QgZm4gPSB2aXNpdG9yc1trZXldO1xuICAgICAgICBpZiAoZm4pIGZuKG5vZGUsIHN0IHx8IChhbmNlc3RvcnMgYXMgYW55KSwgYW5jZXN0b3JzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzTmV3KSBhbmNlc3RvcnMucG9wKCk7XG4gIH07XG4gIGNhbGwobm9kZSwgc3RhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmluZGluZ0lkZW50aWZpZXJzKG5vZGU6IE5vZGUpOiBBcnJheTxJZGVudGlmaWVyPiB7XG4gIGNvbnN0IGYgPSAobm9kZSkgPT4ge1xuICAgIGlmIChpc0lkZW50aWZpZXIobm9kZSkpIHtcbiAgICAgIHJldHVybiBbbm9kZV07XG4gICAgfSBlbHNlIGlmIChpc0FycmF5UGF0dGVybihub2RlKSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudHMubWFwKChlbCkgPT4gZihlbCkpLmZsYXQoKTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0UGF0dGVybihub2RlKSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIG5vZGUucHJvcGVydGllcy5tYXAoKHApID0+IGYocC52YWx1ZSkpLmZsYXQoKTtcbiAgICB9IGVsc2UgaWYgKGlzQXNzaWdubWVudFBhdHRlcm4obm9kZSkpIHtcbiAgICAgIHJldHVybiBmKG5vZGUubGVmdCk7XG4gICAgfSBlbHNlIGlmIChpc1Jlc3RFbGVtZW50KG5vZGUpKSB7XG4gICAgICByZXR1cm4gZihub2RlLmFyZ3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGYobm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZShhc3Q6IE5vZGUpIHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgc2NvcGVzOiBuZXcgV2Vha01hcDxOb2RlLCBTY29wZT4oKSxcbiAgICBhbmNlc3RvcnM6IG5ldyBXZWFrTWFwPE5vZGUsIEFycmF5PE5vZGU+PigpLFxuICAgIGRlZmVyOiB7XG4gICAgICByZWZlcmVuY2VzOiBuZXcgU2V0KCkgYXMgUmVmZXJlbmNlcyxcbiAgICAgIGFzc2lnbm1lbnRzOiBuZXcgU2V0KCkgYXMgQXNzaWdubWVudHMsXG4gICAgICBjb25zdGFudFZpb2xhdGlvbnM6IG5ldyBTZXQoKSBhcyBDb25zdGFudFZpb2xhdGlvbnMsXG4gICAgfSxcblxuICAgIGdldCBwcm9ncmFtUGFyZW50KCkge1xuICAgICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KGFzdCk7XG4gICAgICByZXR1cm4gc2NvcGUgJiYgdGhpcy5nZXRQcm9ncmFtUGFyZW50KHNjb3BlKTtcbiAgICB9LFxuXG4gICAgZ2V0QmluZGluZ0lkZW50aWZpZXJzLFxuXG4gICAgZ2V0U2NvcGVCeUFuY2VzdG9ycyhhbmNlc3RvcnM6IEFycmF5PE5vZGU+KSB7XG4gICAgICBsZXQgbCA9IGFuY2VzdG9ycy5sZW5ndGg7XG4gICAgICB3aGlsZSAofi0tbCkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuc2NvcGVzLmdldChhbmNlc3RvcnNbbF0pO1xuICAgICAgICBpZiAoc2NvcGUpIHJldHVybiBzY29wZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RnVuY3Rpb25QYXJlbnQoc2NvcGU6IFNjb3BlKSB7XG4gICAgICByZXR1cm4gZ2V0UGFyZW50U2NvcGUoc2NvcGUsIGlzRnVuY3Rpb25QYXJlbnQpO1xuICAgIH0sXG5cbiAgICBnZXRQcm9ncmFtUGFyZW50KHNjb3BlOiBTY29wZSkge1xuICAgICAgY29uc3Qgc2NvcGVSZXMgPSBnZXRQYXJlbnRTY29wZShzY29wZSwgaXNQcm9ncmFtKTtcbiAgICAgIGlmIChzY29wZVJlcykgcmV0dXJuIHNjb3BlUmVzO1xuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkblxcJ3QgZmluZCBhIFByb2dyYW0nKTtcbiAgICB9LFxuXG4gICAgZ2V0QmxvY2tQYXJlbnQoc2NvcGU6IFNjb3BlKSB7XG4gICAgICBjb25zdCBzY29wZVJlcyA9IGdldFBhcmVudFNjb3BlKHNjb3BlLCBpc0Jsb2NrUGFyZW50KTtcbiAgICAgIGlmIChzY29wZVJlcykgcmV0dXJuIHNjb3BlUmVzO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgJ1dlIGNvdWxkblxcJ3QgZmluZCBhIEJsb2NrU3RhdGVtZW50LCBGb3IsIFN3aXRjaCwgRnVuY3Rpb24sIExvb3Agb3IgUHJvZ3JhbS4uLicsXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBpc1JlZmVyZW5jZWQoYW5jZXN0b3JzOiBBcnJheTxOb2RlPikge1xuICAgICAgY29uc3QgbCA9IGFuY2VzdG9ycy5sZW5ndGg7XG4gICAgICByZXR1cm4gaXNSZWZlcmVuY2VkKGFuY2VzdG9yc1tsIC0gMV0sIGFuY2VzdG9yc1tsIC0gMl0sIGFuY2VzdG9yc1tsIC0gM10pO1xuICAgIH0sXG5cbiAgICByZW1vdmUoYW5jZXN0b3JzOiBBcnJheTxOb2RlPikge1xuICAgICAgdGhpcy5yZXBsYWNlV2l0aChudWxsLCBhbmNlc3RvcnMpO1xuICAgIH0sXG5cbiAgICByZXBsYWNlV2l0aChyZXBsYWNlbWVudDogTm9kZSB8IG51bGwsIGFuY2VzdG9yczogQXJyYXk8Tm9kZT4pIHtcbiAgICAgIGNvbnN0IGwgPSBhbmNlc3RvcnMubGVuZ3RoO1xuICAgICAgY29uc3Qgbm9kZSA9IGFuY2VzdG9yc1tsIC0gMV07XG4gICAgICBpZiAobm9kZSA9PT0gcmVwbGFjZW1lbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGFuY2VzdG9yc1tsIC0gMl07XG5cbiAgICAgIGNvbnN0IHNldCA9IChvYmosIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBpc1Byb3AgPSBpc1Byb3BlcnR5KG9iaik7XG4gICAgICAgIGlmIChyZXBsYWNlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgIC8vIFx1NTIyMFx1OTY2NFx1NTQwRVx1NEYxQVx1NUY3MVx1NTRDRFx1OTA0RFx1NTM4Nlx1NzY4NFx1OTg3QVx1NUU4Rlx1RkYwQ1x1NjI0MFx1NEVFNSByZW1vdmUgXHU4OTgxXHU1RUY2XHU2NUY2XHU2MjY3XHU4ODRDXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShvYmopID8gb2JqLnNwbGljZShrZXksIDEpIDogZGVsZXRlIG9ialtrZXldO1xuICAgICAgICAgIGlmIChpc1Byb3AgJiYgb2JqLnNob3J0aGFuZCkge1xuICAgICAgICAgICAgZGVsZXRlIG9ialtrZXkgPT09ICdrZXknID8gJ3ZhbHVlJyA6ICdrZXknXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqW2tleV0gPSByZXBsYWNlbWVudDtcbiAgICAgICAgICB0aGlzLmFuY2VzdG9ycy5zZXQocmVwbGFjZW1lbnQsIGFuY2VzdG9ycyk7XG4gICAgICAgICAgY29uc3Qgc2NvcGVSZXMgPSB0aGlzLnNjb3Blcy5nZXQobm9kZSk7XG4gICAgICAgICAgc2NvcGVSZXMgJiYgdGhpcy5zY29wZXMuc2V0KHJlcGxhY2VtZW50LCBzY29wZVJlcyk7XG4gICAgICAgICAgaWYgKGlzUHJvcCkge1xuICAgICAgICAgICAgaWYgKGlzSWRlbnRpZmllcihvYmoua2V5KSAmJiBpc0lkZW50aWZpZXIob2JqLnZhbHVlKSkge1xuICAgICAgICAgICAgICBpZiAob2JqLmtleS5uYW1lICE9PSBvYmoudmFsdWUubmFtZSkge1xuICAgICAgICAgICAgICAgIG9iai5zaG9ydGhhbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb2JqLnNob3J0aGFuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gcGFyZW50W2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICAgIGNvbnN0IGlkeCA9IGNoaWxkLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSBzZXQoY2hpbGQsIGlkeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNoaWxkID09PSBub2RlKSB7XG4gICAgICAgICAgICBzZXQocGFyZW50LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgd2Fsayhhc3QsIGNvbGxlY3RvclZpc2l0b3IsIHN0YXRlKTtcbiAgZXhlY0RlZmVyUXVldWUoc3RhdGUpO1xuICByZXR1cm4gc3RhdGU7XG59XG4iLCAiLy8gSW5zcGlyZWQgYnkgYEBiYWJlbC90cmF2ZXJzZWBcbmltcG9ydCB0eXBlIHtcbiAgTm9kZSxcbiAgSWRlbnRpZmllcixcbiAgTGFiZWxlZFN0YXRlbWVudCxcbiAgRXhwb3J0U3BlY2lmaWVyLFxuICBFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24sXG59IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQge1xuICBpc1BhdHRlcm4sXG4gIGlzRnVuY3Rpb24sXG4gIGlzTGFiZWxlZFN0YXRlbWVudCxcbiAgaXNDbGFzc0RlY2xhcmF0aW9uLFxuICBpc0ltcG9ydERlY2xhcmF0aW9uLFxuICBpc0V4cG9ydERlY2xhcmF0aW9uLFxuICBpc1ZhcmlhYmxlRGVjbGFyYXRpb24sXG4gIGlzRnVuY3Rpb25EZWNsYXJhdGlvbixcbiAgaXNBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbixcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRCaW5kaW5nSWRlbnRpZmllcnMgfSBmcm9tICcuL3N0YXRlJztcblxudHlwZSBCaW5kaW5nS2luZCA9XG4gIHwgJ3ZhcicgLyogdmFyIGRlY2xhcmF0b3IgKi9cbiAgfCAnbGV0JyAvKiBsZXQgZGVjbGFyYXRvciwgY2xhc3MgZGVjbGFyYXRpb24gaWQsIGNhdGNoIGNsYXVzZSBwYXJhbWV0ZXJzICovXG4gIHwgJ2NvbnN0JyAvKiBjb25zdCBkZWNsYXJhdG9yICovXG4gIHwgJ21vZHVsZScgLyogaW1wb3J0IHNwZWNpZmllcnMgKi9cbiAgfCAnaG9pc3RlZCcgLyogZnVuY3Rpb24gZGVjbGFyYXRpb24gaWQgKi9cbiAgfCAncGFyYW0nIC8qIGZ1bmN0aW9uIGRlY2xhcmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgfCAnbG9jYWwnIC8qIGZ1bmN0aW9uIGV4cHJlc3Npb24gaWQsIGNsYXNzIGV4cHJlc3Npb24gaWQgKi9cbiAgfCAndW5rbm93bic7IC8qIGV4cG9ydCBzcGVjaWZpZXJzICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgQmluZGluZyB7XG4gIGtpbmQ6IEJpbmRpbmdLaW5kO1xuICBub2RlOiBJZGVudGlmaWVyO1xuICByZWZlcmVuY2VzOiBTZXQ8SWRlbnRpZmllcj47XG4gIGNvbnN0YW50VmlvbGF0aW9uczogU2V0PE5vZGU+O1xufVxuXG5leHBvcnQgY2xhc3MgU2NvcGUge1xuICBwdWJsaWMgbm9kZTogTm9kZTtcbiAgcHVibGljIHBhcmVudD86IFNjb3BlO1xuICBwdWJsaWMgbGFiZWxzID0gbmV3IE1hcCgpO1xuICBwdWJsaWMgZ2xvYmFscyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHB1YmxpYyBiaW5kaW5ncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIFx1NTM5Rlx1NTc4Qlx1NTNFQVx1ODBGRFx1NjYyRiBudWxsXG5cbiAgY29uc3RydWN0b3Iobm9kZTogTm9kZSwgcGFyZW50PzogU2NvcGUpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0Jsb2NrU2NvcGVkQ29sbGlzaW9ucyhcbiAgICBsb2NhbDogQmluZGluZyxcbiAgICBraW5kOiBCaW5kaW5nS2luZCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICkge1xuICAgIGlmIChraW5kID09PSAncGFyYW0nKSByZXR1cm47XG4gICAgLy8gXHU1MUZEXHU2NTcwXHU4MUVBXHU1REYxXHU3Njg0XHU1OEYwXHU2NjBFXHU4OUM0XHU4MzAzXHU0RTJEXHU2NjJGXHU0RTAwXHU0RTJBXHU3MkVDXHU3QUNCXHU3Njg0XHU0RjVDXHU3NTI4XHU1N0RGXHVGRjBDXHU1M0VGXHU0RUU1XHU4OEFCXHU4OTg2XHU3NkQ2XG4gICAgaWYgKGxvY2FsLmtpbmQgPT09ICdsb2NhbCcpIHJldHVybjtcbiAgICBpZiAoXG4gICAgICBraW5kID09PSAnbGV0JyB8fFxuICAgICAgbG9jYWwua2luZCA9PT0gJ2xldCcgfHxcbiAgICAgIGxvY2FsLmtpbmQgPT09ICdjb25zdCcgfHxcbiAgICAgIGxvY2FsLmtpbmQgPT09ICdtb2R1bGUnIHx8XG4gICAgICAvLyBkb24ndCBhbGxvdyBhIGxvY2FsIG9mIHBhcmFtIHdpdGggYSBraW5kIG9mIGxldFxuICAgICAgKGxvY2FsLmtpbmQgPT09ICdwYXJhbScgJiYga2luZCA9PT0gJ2NvbnN0JylcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIGRlY2xhcmF0aW9uIFwiJHtuYW1lfVwiYCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJMYWJlbChub2RlOiBMYWJlbGVkU3RhdGVtZW50KSB7XG4gICAgdGhpcy5sYWJlbHMuc2V0KG5vZGUubGFiZWwubmFtZSwgbm9kZSk7XG4gIH1cblxuICBhZGRHbG9iYWwobm9kZTogSWRlbnRpZmllcikge1xuICAgIHRoaXMuZ2xvYmFsc1tub2RlLm5hbWVdID0gbm9kZTtcbiAgfVxuXG4gIHJlZmVyZW5jZShuYW1lOiBzdHJpbmcsIG5vZGU6IElkZW50aWZpZXIpIHtcbiAgICBjb25zdCBiaW5kaW5nID0gdGhpcy5nZXRCaW5kaW5nKG5hbWUpO1xuICAgIGlmIChiaW5kaW5nKSB7XG4gICAgICBiaW5kaW5nLnJlZmVyZW5jZXMuYWRkKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyQ29uc3RhbnRWaW9sYXRpb24obmFtZTogc3RyaW5nLCBub2RlOiBOb2RlKSB7XG4gICAgY29uc3QgYmluZGluZyA9IHRoaXMuZ2V0QmluZGluZyhuYW1lKTtcbiAgICBpZiAoYmluZGluZykge1xuICAgICAgYmluZGluZy5jb25zdGFudFZpb2xhdGlvbnMuYWRkKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGdldEJpbmRpbmcobmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IHNjb3BlOiBTY29wZSA9IHRoaXM7XG4gICAgbGV0IHByZXZpb3VzTm9kZTtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGJpbmRpbmcgPSBzY29wZS5iaW5kaW5nc1tuYW1lXTtcbiAgICAgIGlmIChiaW5kaW5nKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1BhdHRlcm4ocHJldmlvdXNOb2RlKSAmJlxuICAgICAgICAgIGJpbmRpbmcua2luZCAhPT0gJ3BhcmFtJyAmJlxuICAgICAgICAgIGJpbmRpbmcua2luZCAhPT0gJ2xvY2FsJ1xuICAgICAgICApIHtcbiAgICAgICAgICAvLyBcdThGRDlcdTkxQ0NcdTRFMERcdTUwNUFcdTRFRkJcdTRGNTVcdTRFOEJcdTYwQzVcbiAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTY2MkYgcGF0dGVybiBcdTRFMkRcdTRGNUNcdTc1MjhcdTU3REZcdTRFMkRcdTVGMTVcdTc1MjhcdTRFODZcdTgxRUFcdThFQUJcdTZDQTFcdTVCOUFcdTRFNDlcdTc2ODRcdTUzRDhcdTkxQ0ZcdUZGMENcdTRFMERcdTgwRkRcdTU3MjhcdTUxRkRcdTY1NzBcdTRGNTNcdTUxODVcdTVCRkJcdTYyN0VcbiAgICAgICAgICAvLyBcdTRFRDZcdTY2MkZcdTcyRUNcdTdBQ0JcdTc2ODRcdTRGNUNcdTc1MjhcdTU3REZcdUZGMENcdTVFNzZcdTRFMERcdTY2MkZcdTcyMzZcdTVCNTBcdTUxNzNcdTdDRkJcdUZGMENcdThGRDlcdTkxQ0NcdTUzRUFcdTY2MkZcdTRFM0FcdTRFODZcdTYwMjdcdTgwRkRcdTU0MDhcdTVFNzZcdTU3MjhcdTRFODZcdTRFMDBcdThENzdcdUZGMENcdTYyNDBcdTRFRTVcdTk3MDBcdTg5ODFcdTdFRTdcdTdFRURcdTVGODBcdTU5MTZcdTYyN0VcdTMwMDJcbiAgICAgICAgICAvLyBcdTRGNDZcdTY2MkZcdTY3MDlcdTRFMjRcdTc5Q0RcdTYwQzVcdTUxQjVcdTcyNzlcdTZCOEFcbiAgICAgICAgICAvLyAgMS4gcGFyYW0gXHU2NjJGXHU1M0MyXHU2NTcwXHVGRjBDXHU1M0VGXHU0RUU1XHU4OEFCXHU1MUZEXHU2NTcwXHU0RjUzXHU1MTg1XHU4QkJGXHU5NUVFXG4gICAgICAgICAgLy8gIDIuIGxvY2FsIFx1NjYyRlx1NTFGRFx1NjU3MFx1ODFFQVx1OEVBQlx1NzY4NFx1NThGMFx1NjYwRVx1RkYwQ1x1OEZEOVx1NEUyQVx1NEUwMFx1NUM0Mlx1NzY4NFx1NEY1Q1x1NzUyOFx1NTdERlx1NEU1Rlx1NjYyRlx1NTNFRlx1NEVFNVx1ODhBQlx1NTFGRFx1NjU3MFx1NEY1M1x1NTE4NVx1OEJCRlx1OTVFRVx1NzY4NFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBiaW5kaW5nO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhYmluZGluZyAmJlxuICAgICAgICBuYW1lID09PSAnYXJndW1lbnRzJyAmJiAvLyBhcmd1bWVudHMgXHU2NjJGXHU0RTBEXHU1M0VGXHU4OUMxXHU3Njg0XHU1MUZEXHU2NTcwXHU1MTg1XHU5MEU4XHU1M0MyXHU2NTcwXHU1OEYwXHU2NjBFXG4gICAgICAgIGlzRnVuY3Rpb24oc2NvcGUubm9kZSkgJiZcbiAgICAgICAgaXNBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbihzY29wZS5ub2RlKVxuICAgICAgKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcHJldmlvdXNOb2RlID0gc2NvcGUubm9kZTtcbiAgICB9IHdoaWxlIChzY29wZS5wYXJlbnQgJiYgKHNjb3BlID0gc2NvcGUucGFyZW50KSk7XG4gIH1cblxuICByZWdpc3RlckJpbmRpbmcoa2luZDogQmluZGluZ0tpbmQsIG5hbWU6IHN0cmluZywgbm9kZTogTm9kZSkge1xuICAgIGlmICgha2luZCkgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdubyBga2luZGAnKTtcbiAgICBjb25zdCBiaW5kaW5nID0gdGhpcy5iaW5kaW5nc1tuYW1lXTtcblxuICAgIGlmIChiaW5kaW5nKSB7XG4gICAgICAvLyBcdTkwNERcdTUzODZcdTc2ODRcdTY1RjZcdTUwMTlcdTRGMUFcdTY3MDlcdTkxQ0RcdTU5MERcdTU4NUVcdTUxNjVcbiAgICAgIGlmIChiaW5kaW5nLm5vZGUgPT09IG5vZGUpIHJldHVybjtcbiAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NEY1Q1x1NzUyOFx1NTdERlx1NzY4NFx1NzhCMFx1NjQ5RVxuICAgICAgdGhpcy5jaGVja0Jsb2NrU2NvcGVkQ29sbGlzaW9ucyhiaW5kaW5nLCBraW5kLCBuYW1lKTtcbiAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1OTg3QVx1NTIyOVx1OTAxQVx1OEZDN1x1RkYwQ1x1NTIxOVx1NEVFM1x1ODg2OFx1ODhBQlx1NjZGNFx1NjUzOVx1NEU4Nlx1RkYwQ1x1OTFDRFx1NTkwRFx1NzY4NFx1NThGMFx1NjYwRVx1NEU1Rlx1NjYyRlx1NjZGNFx1NjUzOVxuICAgICAgdGhpcy5yZWdpc3RlckNvbnN0YW50VmlvbGF0aW9uKG5hbWUsIG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcdTYyMTFcdTRFRUNcdTc2ODRcdTY4NDhcdTRGOEJcdTY2MkYgZXNNb2R1bGUsIFx1OTFDQ1x1OTc2Mlx1NEUwRFx1NTNFRlx1ODBGRFx1NjcwOSB3aXRoIFx1ODg2OFx1OEZCRVx1NUYwRlxuICAgICAgdGhpcy5iaW5kaW5nc1tuYW1lXSA9IHtcbiAgICAgICAga2luZCxcbiAgICAgICAgbm9kZSxcbiAgICAgICAgcmVmZXJlbmNlczogbmV3IFNldCgpLFxuICAgICAgICBjb25zdGFudFZpb2xhdGlvbnM6IG5ldyBTZXQoKSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gQGJhYmVsL3R5cGVzL3NyYy9yZXRyaWV2ZXJzL2dldEJpbmRpbmdJZGVudGlmaWVycy50c1xuICByZWdpc3RlckRlY2xhcmF0aW9uKG5vZGU6IE5vZGUpIHtcbiAgICBpZiAoaXNMYWJlbGVkU3RhdGVtZW50KG5vZGUpKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyTGFiZWwobm9kZSk7XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uRGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgIG5vZGUuaWQgJiYgdGhpcy5yZWdpc3RlckJpbmRpbmcoJ2hvaXN0ZWQnLCBub2RlLmlkLm5hbWUsIG5vZGUpO1xuICAgIH0gZWxzZSBpZiAoaXNWYXJpYWJsZURlY2xhcmF0aW9uKG5vZGUpKSB7XG4gICAgICBjb25zdCB7IGRlY2xhcmF0aW9ucyB9ID0gbm9kZTtcbiAgICAgIGZvciAoY29uc3QgZGVjbCBvZiBkZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgLy8gbm9kZS5raW5kIFx1NjcwOSBgdmFyYCwgYGxldGAsIGBjb25zdGBcbiAgICAgICAgY29uc3QgaWRzID0gZ2V0QmluZGluZ0lkZW50aWZpZXJzKGRlY2wuaWQpO1xuICAgICAgICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIGlkcykge1xuICAgICAgICAgIHRoaXMucmVnaXN0ZXJCaW5kaW5nKG5vZGUua2luZCwgbmFtZSwgZGVjbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKSkge1xuICAgICAgbm9kZS5pZCAmJiB0aGlzLnJlZ2lzdGVyQmluZGluZygnbGV0Jywgbm9kZS5pZC5uYW1lLCBub2RlKTtcbiAgICB9IGVsc2UgaWYgKGlzSW1wb3J0RGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgIGNvbnN0IHNwZWNpZmllcnMgPSBub2RlLnNwZWNpZmllcnM7XG4gICAgICBmb3IgKGNvbnN0IHNwZWNpZmllciBvZiBzcGVjaWZpZXJzKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJCaW5kaW5nKCdtb2R1bGUnLCBzcGVjaWZpZXIubG9jYWwubmFtZSwgc3BlY2lmaWVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRXhwb3J0RGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgIGNvbnN0IHsgZGVjbGFyYXRpb24gfSA9IG5vZGUgYXMgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uO1xuICAgICAgaWYgKFxuICAgICAgICBpc0NsYXNzRGVjbGFyYXRpb24oZGVjbGFyYXRpb24pIHx8XG4gICAgICAgIGlzRnVuY3Rpb25EZWNsYXJhdGlvbihkZWNsYXJhdGlvbikgfHxcbiAgICAgICAgaXNWYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZWNsYXJhdGlvbihkZWNsYXJhdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJCaW5kaW5nKFxuICAgICAgICAndW5rbm93bicsXG4gICAgICAgIChub2RlIGFzIEV4cG9ydFNwZWNpZmllcikuZXhwb3J0ZWQubmFtZSxcbiAgICAgICAgbm9kZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCAiLy8gSW5zcGlyZWQgYnkgYEBiYWJlbC90cmF2ZXJzZWBcbmltcG9ydCB0eXBlIHtcbiAgTm9kZSxcbiAgRnVuY3Rpb24sXG4gIElkZW50aWZpZXIsXG4gIENhdGNoQ2xhdXNlLFxuICBGb3JTdGF0ZW1lbnQsXG4gIEZvckluU3RhdGVtZW50LFxuICBGb3JPZlN0YXRlbWVudCxcbiAgTGFiZWxlZFN0YXRlbWVudCxcbiAgVW5hcnlFeHByZXNzaW9uLFxuICBDbGFzc0V4cHJlc3Npb24sXG4gIFVwZGF0ZUV4cHJlc3Npb24sXG4gIEFzc2lnbm1lbnRFeHByZXNzaW9uLFxuICBJbXBvcnREZWNsYXJhdGlvbixcbiAgRXhwb3J0QWxsRGVjbGFyYXRpb24sXG4gIEV4cG9ydE5hbWVkRGVjbGFyYXRpb24sXG4gIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbixcbn0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7XG4gIGlzVmFyLFxuICBpc1BhdHRlcm4sXG4gIGlzSWRlbnRpZmllcixcbiAgaXNCbG9ja1Njb3BlZCxcbiAgaXNDbGFzc0RlY2xhcmF0aW9uLFxuICBpc0ltcG9ydERlY2xhcmF0aW9uLFxuICBpc0V4cG9ydERlY2xhcmF0aW9uLFxuICBpc0Z1bmN0aW9uRGVjbGFyYXRpb24sXG4gIGlzRXhwb3J0QWxsRGVjbGFyYXRpb24sXG4gIGlzRnVuY3Rpb25FeHByZXNzaW9uLFxuICBpc1ZhcmlhYmxlRGVjbGFyYXRpb24sXG59IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgY29sbGVjdG9yVmlzaXRvciA9IHtcbiAgRm9yU3RhdGVtZW50KG5vZGU6IEZvclN0YXRlbWVudCwgc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgeyBpbml0IH0gPSBub2RlO1xuICAgIGlmIChpbml0ICYmIGlzVmFyKGluaXQpKSB7XG4gICAgICBjb25zdCBzY29wZSA9IHN0YXRlLnNjb3Blcy5nZXQobm9kZSk7XG4gICAgICBjb25zdCBwYXJlbnRTY29wZSA9XG4gICAgICAgIHNjb3BlICYmXG4gICAgICAgIChzdGF0ZS5nZXRGdW5jdGlvblBhcmVudChzY29wZSkgfHwgc3RhdGUuZ2V0UHJvZ3JhbVBhcmVudChzY29wZSkpO1xuICAgICAgZm9yIChjb25zdCBkZWNsIG9mIGluaXQuZGVjbGFyYXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGlkcyA9IHN0YXRlLmdldEJpbmRpbmdJZGVudGlmaWVycyhkZWNsLmlkKTtcbiAgICAgICAgZm9yIChjb25zdCB7IG5hbWUgfSBvZiBpZHMpIHtcbiAgICAgICAgICBwYXJlbnRTY29wZSAmJiBwYXJlbnRTY29wZS5yZWdpc3RlckJpbmRpbmcoJ3ZhcicsIG5hbWUsIGRlY2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIERlY2xhcmF0aW9uKG5vZGU6IE5vZGUsIHN0YXRlOiBTdGF0ZSkge1xuICAgIGlmIChpc0Jsb2NrU2NvcGVkKG5vZGUpKSByZXR1cm47XG4gICAgaWYgKGlzSW1wb3J0RGVjbGFyYXRpb24obm9kZSkpIHJldHVybjtcbiAgICBpZiAoaXNFeHBvcnREZWNsYXJhdGlvbihub2RlKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNjb3BlID0gc3RhdGUuc2NvcGVzLmdldChub2RlKTtcbiAgICBjb25zdCBwYXJlbnQgPVxuICAgICAgc2NvcGUgJiZcbiAgICAgIChzdGF0ZS5nZXRGdW5jdGlvblBhcmVudChzY29wZSkgfHwgc3RhdGUuZ2V0UHJvZ3JhbVBhcmVudChzY29wZSkpO1xuICAgIHBhcmVudCAmJiBwYXJlbnQucmVnaXN0ZXJEZWNsYXJhdGlvbihub2RlKTtcbiAgfSxcblxuICBCbG9ja1Njb3BlZChub2RlOiBOb2RlLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBsZXQgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KG5vZGUpO1xuICAgIGlmIChzY29wZSAmJiBzY29wZS5ub2RlID09PSBub2RlKSBzY29wZSA9IHNjb3BlLnBhcmVudDtcbiAgICBjb25zdCBwYXJlbnQgPSBzY29wZSAmJiBzdGF0ZS5nZXRCbG9ja1BhcmVudChzY29wZSk7XG4gICAgcGFyZW50ICYmIHBhcmVudC5yZWdpc3RlckRlY2xhcmF0aW9uKG5vZGUpO1xuICB9LFxuXG4gIEltcG9ydERlY2xhcmF0aW9uKG5vZGU6IEltcG9ydERlY2xhcmF0aW9uLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCBzY29wZSA9IHN0YXRlLnNjb3Blcy5nZXQobm9kZSk7XG4gICAgY29uc3QgcGFyZW50ID0gc2NvcGUgJiYgc3RhdGUuZ2V0QmxvY2tQYXJlbnQoc2NvcGUpO1xuICAgIHBhcmVudCAmJiBwYXJlbnQucmVnaXN0ZXJEZWNsYXJhdGlvbihub2RlKTtcbiAgfSxcblxuICBJZGVudGlmaWVyKG5vZGU6IElkZW50aWZpZXIsIHN0YXRlOiBTdGF0ZSwgYW5jZXN0b3JzOiBBcnJheTxOb2RlPikge1xuICAgIGlmIChzdGF0ZS5pc1JlZmVyZW5jZWQoYW5jZXN0b3JzKSkge1xuICAgICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KG5vZGUpO1xuICAgICAgc2NvcGUgJiZcbiAgICAgICAgc3RhdGUuZGVmZXIucmVmZXJlbmNlcy5hZGQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlkcyA9IHN0YXRlLmdldEJpbmRpbmdJZGVudGlmaWVycyhub2RlKTtcbiAgICAgICAgICByZXR1cm4geyBzY29wZSwgaWRzLCB0eXBlOiAnaWRlbnRpZmllcicgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIEZvclhTdGF0ZW1lbnQobm9kZTogRm9ySW5TdGF0ZW1lbnQgfCBGb3JPZlN0YXRlbWVudCwgc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KG5vZGUpO1xuICAgIGNvbnN0IHsgbGVmdCB9ID0gbm9kZTtcbiAgICBpZiAoaXNQYXR0ZXJuKGxlZnQpIHx8IGlzSWRlbnRpZmllcihsZWZ0KSkge1xuICAgICAgY29uc3QgaWRzID0gc3RhdGUuZ2V0QmluZGluZ0lkZW50aWZpZXJzKGxlZnQpO1xuICAgICAgZm9yIChjb25zdCB7IG5hbWUgfSBvZiBpZHMpIHtcbiAgICAgICAgc2NvcGUgJiYgc2NvcGUucmVnaXN0ZXJDb25zdGFudFZpb2xhdGlvbihuYW1lLCBub2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVmFyKGxlZnQpKSB7XG4gICAgICBjb25zdCBwYXJlbnRTY29wZSA9XG4gICAgICAgIHNjb3BlICYmXG4gICAgICAgIChzdGF0ZS5nZXRGdW5jdGlvblBhcmVudChzY29wZSkgfHwgc3RhdGUuZ2V0UHJvZ3JhbVBhcmVudChzY29wZSkpO1xuICAgICAgZm9yIChjb25zdCBkZWNsIG9mIGxlZnQuZGVjbGFyYXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGlkcyA9IHN0YXRlLmdldEJpbmRpbmdJZGVudGlmaWVycyhkZWNsLmlkKTtcbiAgICAgICAgZm9yIChjb25zdCB7IG5hbWUgfSBvZiBpZHMpIHtcbiAgICAgICAgICBwYXJlbnRTY29wZSAmJiBwYXJlbnRTY29wZS5yZWdpc3RlckJpbmRpbmcoJ3ZhcicsIG5hbWUsIGRlY2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIGBhY29ybmAgSWRlbnRpZmllciBcdTZDQTFcdTY3MDlcdTdCOTdcdTRFMEEgRXhwb3J0TmFtZWREZWNsYXJhdGlvbiBcdTRFMkRcdTc2ODRcdTUwM0NcbiAgRXhwb3J0TmFtZWREZWNsYXJhdGlvbihub2RlOiBFeHBvcnROYW1lZERlY2xhcmF0aW9uLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCB7IHNwZWNpZmllcnMgfSA9IG5vZGU7XG4gICAgaWYgKHNwZWNpZmllcnMgJiYgc3BlY2lmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IHsgbG9jYWwgfSBvZiBzcGVjaWZpZXJzKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gc3RhdGUuc2NvcGVzLmdldChub2RlKTtcbiAgICAgICAgc2NvcGUgJiZcbiAgICAgICAgICBzdGF0ZS5kZWZlci5yZWZlcmVuY2VzLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZHMgPSBzdGF0ZS5nZXRCaW5kaW5nSWRlbnRpZmllcnMobG9jYWwpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc2NvcGUsIGlkcywgdHlwZTogJ2lkZW50aWZpZXInIH07XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEV4cG9ydERlY2xhcmF0aW9uKFxuICAgIG5vZGU6XG4gICAgICB8IEV4cG9ydEFsbERlY2xhcmF0aW9uXG4gICAgICB8IEV4cG9ydERlZmF1bHREZWNsYXJhdGlvblxuICAgICAgfCBFeHBvcnROYW1lZERlY2xhcmF0aW9uLFxuICAgIHN0YXRlOiBTdGF0ZSxcbiAgKSB7XG4gICAgLy8gRXhwb3J0QWxsRGVjbGFyYXRpb24gZG9lcyBub3QgaGF2ZSBgZGVjbGFyYXRpb25gXG4gICAgaWYgKGlzRXhwb3J0QWxsRGVjbGFyYXRpb24obm9kZSkpIHJldHVybjtcbiAgICBjb25zdCB7IGRlY2xhcmF0aW9uIH0gPSBub2RlIGFzIEV4cG9ydE5hbWVkRGVjbGFyYXRpb247XG4gICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KG5vZGUpO1xuICAgIGlmIChcbiAgICAgIGRlY2xhcmF0aW9uICYmXG4gICAgICAoaXNDbGFzc0RlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKSB8fCBpc0Z1bmN0aW9uRGVjbGFyYXRpb24oZGVjbGFyYXRpb24pKVxuICAgICkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gZGVjbGFyYXRpb247XG4gICAgICBpZiAoIWlkKSByZXR1cm47XG4gICAgICBjb25zdCBpZHMgPSBzdGF0ZS5nZXRCaW5kaW5nSWRlbnRpZmllcnMoaWQpO1xuICAgICAgc2NvcGUgJiZcbiAgICAgICAgc3RhdGUuZGVmZXIucmVmZXJlbmNlcy5hZGQoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7IGlkcywgc2NvcGUsIHR5cGU6ICdleHBvcnQnIH07XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGVjbGFyYXRpb24gJiYgaXNWYXJpYWJsZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKSkge1xuICAgICAgZm9yIChjb25zdCBkZWNsIG9mIGRlY2xhcmF0aW9uLmRlY2xhcmF0aW9ucykge1xuICAgICAgICBzY29wZSAmJlxuICAgICAgICAgIHN0YXRlLmRlZmVyLnJlZmVyZW5jZXMuYWRkKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkcyA9IHN0YXRlLmdldEJpbmRpbmdJZGVudGlmaWVycyhkZWNsLmlkKTtcbiAgICAgICAgICAgIHJldHVybiB7IGlkcywgc2NvcGUsIHR5cGU6ICdleHBvcnQnIH07XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIExhYmVsZWRTdGF0ZW1lbnQobm9kZTogTGFiZWxlZFN0YXRlbWVudCwgc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KG5vZGUpO1xuICAgIGlmIChzY29wZSkge1xuICAgICAgY29uc3QgcGFyZW50ID0gc3RhdGUuZ2V0QmxvY2tQYXJlbnQoc2NvcGUpO1xuICAgICAgcGFyZW50LnJlZ2lzdGVyRGVjbGFyYXRpb24obm9kZSk7XG4gICAgfVxuICB9LFxuXG4gIEFzc2lnbm1lbnRFeHByZXNzaW9uKG5vZGU6IEFzc2lnbm1lbnRFeHByZXNzaW9uLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCBzY29wZSA9IHN0YXRlLnNjb3Blcy5nZXQobm9kZSk7XG4gICAgc2NvcGUgJiZcbiAgICAgIHN0YXRlLmRlZmVyLmFzc2lnbm1lbnRzLmFkZCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHNjb3BlLCBpZHM6IHN0YXRlLmdldEJpbmRpbmdJZGVudGlmaWVycyhub2RlLmxlZnQpIH07XG4gICAgICB9KTtcbiAgfSxcblxuICBVcGRhdGVFeHByZXNzaW9uKG5vZGU6IFVwZGF0ZUV4cHJlc3Npb24sIHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IHNjb3BlID0gc3RhdGUuc2NvcGVzLmdldChub2RlKTtcbiAgICBzY29wZSAmJlxuICAgICAgc3RhdGUuZGVmZXIuY29uc3RhbnRWaW9sYXRpb25zLmFkZCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHNjb3BlLCBub2RlOiBub2RlLmFyZ3VtZW50IH07XG4gICAgICB9KTtcbiAgfSxcblxuICBVbmFyeUV4cHJlc3Npb24obm9kZTogVW5hcnlFeHByZXNzaW9uLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBpZiAobm9kZS5vcGVyYXRvciA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgIGNvbnN0IHNjb3BlID0gc3RhdGUuc2NvcGVzLmdldChub2RlKTtcbiAgICAgIHNjb3BlICYmXG4gICAgICAgIHN0YXRlLmRlZmVyLmNvbnN0YW50VmlvbGF0aW9ucy5hZGQoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7IHNjb3BlLCBub2RlOiBub2RlLmFyZ3VtZW50IH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBDYXRjaENsYXVzZShub2RlOiBDYXRjaENsYXVzZSwgc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBzdGF0ZS5zY29wZXMuZ2V0KG5vZGUpO1xuICAgIGNvbnN0IGlkcyA9IG5vZGUucGFyYW0gJiYgc3RhdGUuZ2V0QmluZGluZ0lkZW50aWZpZXJzKG5vZGUucGFyYW0pO1xuICAgIGlmIChpZHMpIHtcbiAgICAgIGZvciAoY29uc3QgeyBuYW1lIH0gb2YgaWRzKSB7XG4gICAgICAgIHNjb3BlICYmIHNjb3BlLnJlZ2lzdGVyQmluZGluZygnbGV0JywgbmFtZSwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEZ1bmN0aW9uKG5vZGU6IEZ1bmN0aW9uLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gbm9kZTtcbiAgICBjb25zdCBzY29wZSA9IHN0YXRlLnNjb3Blcy5nZXQobm9kZSk7XG4gICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcbiAgICAgIGNvbnN0IGlkcyA9IHN0YXRlLmdldEJpbmRpbmdJZGVudGlmaWVycyhwYXJhbSk7XG4gICAgICBmb3IgKGNvbnN0IHsgbmFtZSB9IG9mIGlkcykge1xuICAgICAgICBzY29wZSAmJiBzY29wZS5yZWdpc3RlckJpbmRpbmcoJ3BhcmFtJywgbmFtZSwgcGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZWdpc3RlciBmdW5jdGlvbiBleHByZXNzaW9uIGlkIGFmdGVyIHBhcmFtcy4gV2hlbiB0aGUgaWRcbiAgICAvLyBjb2xsaWRlcyB3aXRoIGEgZnVuY3Rpb24gcGFyYW0sIHRoZSBpZCBlZmZlY3RpdmVseSBjYW4ndCBiZVxuICAgIC8vIHJlZmVyZW5jZWQ6IGhlcmUgd2UgcmVnaXN0ZXJlZCBpdCBhcyBhIGNvbnN0YW50VmlvbGF0aW9uXG4gICAgaWYgKGlzRnVuY3Rpb25FeHByZXNzaW9uKG5vZGUpICYmIG5vZGUuaWQpIHtcbiAgICAgIHNjb3BlICYmIHNjb3BlLnJlZ2lzdGVyQmluZGluZygnbG9jYWwnLCBub2RlLmlkLm5hbWUsIG5vZGUpO1xuICAgIH1cbiAgfSxcblxuICBDbGFzc0V4cHJlc3Npb24obm9kZTogQ2xhc3NFeHByZXNzaW9uLCBzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCB7IGlkIH0gPSBub2RlO1xuICAgIGNvbnN0IHNjb3BlID0gc3RhdGUuc2NvcGVzLmdldChub2RlKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHNjb3BlICYmIHNjb3BlLnJlZ2lzdGVyQmluZGluZygnbG9jYWwnLCBpZC5uYW1lLCBub2RlKTtcbiAgICB9XG4gIH0sXG59O1xuIiwgImV4cG9ydCB0eXBlIE1lbW9yeU1vZHVsZSA9IFJlY29yZDxzdHJpbmcsIGFueT47XG5cbmV4cG9ydCB0eXBlIE1ldGFPYmplY3QgPSB7IHVybDogc3RyaW5nOyBfX2dhcmZpc2hQb2x5ZmlsbF9fOiBib29sZWFuIH07XG5cbmV4cG9ydCB0eXBlIE1vZHVsZSA9IHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xuICBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01vZHVsZSc7XG59O1xuXG5mdW5jdGlvbiBNb2R1bGUoKSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW9kdWxlKG1lbW9yeU1vZHVsZTogTWVtb3J5TW9kdWxlKSB7XG4gIGNvbnN0IG1vZHVsZTogTW9kdWxlID0gbmV3IE1vZHVsZSgpO1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobW9kdWxlLCBudWxsKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgdmFsdWU6ICdNb2R1bGUnLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICB9KTtcblxuICBPYmplY3Qua2V5cyhtZW1vcnlNb2R1bGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG1lbW9yeU1vZHVsZSwga2V5KTtcbiAgICBpZiAoIWRlc2NyaXB0b3IpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihgY2FuJ3QgZ2V0ICR7a2V5fSBkZXNjcmlwdG9yYCk7XG4gICAgfVxuICAgIGNvbnN0IGdldHRlciA9IGRlc2NyaXB0b3IuZ2V0O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGdldHRlcixcbiAgICAgIHNldDogKCkgPT4ge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgICAgYENhbm5vdCBhc3NpZ24gdG8gcmVhZCBvbmx5IHByb3BlcnR5ICcke2tleX0nIG9mIG9iamVjdCAnW29iamVjdCBNb2R1bGVdYCxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIE9iamVjdC5zZWFsKG1vZHVsZSk7XG4gIHJldHVybiBtb2R1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbXBvcnRNZXRhKHVybDogc3RyaW5nKSB7XG4gIGNvbnN0IG1ldGFPYmplY3Q6IE1ldGFPYmplY3QgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCBzZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZXRhT2JqZWN0LCBrZXksIHtcbiAgICAgIHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIHNldCgndXJsJywgdXJsKTtcbiAgc2V0KCdfX2dhcmZpc2hQb2x5ZmlsbF9fJywgdHJ1ZSk7XG4gIHJldHVybiB7IG1ldGE6IG1ldGFPYmplY3QgfTtcbn1cbiIsICJpbXBvcnQgeyBldmFsV2l0aEVudiB9IGZyb20gJ0BnYXJmaXNoL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgaW50ZXJmYWNlcyB9IGZyb20gJ0BnYXJmaXNoL2NvcmUnO1xuaW1wb3J0IHsgUnVudGltZSB9IGZyb20gJy4vcnVudGltZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGV4Y2x1ZGVzPzogQXJyYXk8c3RyaW5nPiB8ICgobmFtZTogc3RyaW5nKSA9PiBib29sZWFuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdhcmZpc2hFc01vZHVsZShvcHRpb25zOiBPcHRpb25zID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChHYXJmaXNoOiBpbnRlcmZhY2VzLkdhcmZpc2gpOiBpbnRlcmZhY2VzLlBsdWdpbiB7XG4gICAgY29uc3QgYXBwTW9kdWxlcyA9IHt9O1xuICAgIGNvbnN0IHsgZXhjbHVkZXMgfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCBkaXNhYmxlID0gKFxuICAgICAgYXBwSWQ6IG51bWJlcixcbiAgICAgIGFwcE5hbWU6IHN0cmluZyxcbiAgICAgIGFwcEluZm86IGludGVyZmFjZXMuQXBwSW5mbyxcbiAgICApID0+IHtcbiAgICAgIGlmIChhcHBNb2R1bGVzW2FwcElkXSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShleGNsdWRlcykpIHJldHVybiBleGNsdWRlcy5pbmNsdWRlcyhhcHBOYW1lKTtcbiAgICAgIGlmICh0eXBlb2YgZXhjbHVkZXMgPT09ICdmdW5jdGlvbicpIHJldHVybiBleGNsdWRlcyhhcHBOYW1lKTtcbiAgICAgIGlmIChhcHBJbmZvLnNhbmRib3ggPT09IGZhbHNlIHx8IGFwcEluZm8/LnNhbmRib3g/Lm9wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ2VzLW1vZHVsZScsXG5cbiAgICAgIGFmdGVyTG9hZChhcHBJbmZvLCBhcHBJbnN0YW5jZSkge1xuICAgICAgICBpZiAoIWFwcEluc3RhbmNlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHsgYXBwSWQsIG5hbWUgfSA9IGFwcEluc3RhbmNlO1xuICAgICAgICBpZiAoIWRpc2FibGUoYXBwSWQsIG5hbWUsIGFwcEluZm8pKSB7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGNvbnN0IHNhbmRib3ggPSBhcHBJbnN0YW5jZS52bVNhbmRib3g7XG4gICAgICAgICAgY29uc3QgcnVudGltZSA9IG5ldyBSdW50aW1lKHsgc2NvcGU6IG5hbWUgfSk7XG5cbiAgICAgICAgICBhcHBNb2R1bGVzW2FwcElkXSA9IHJ1bnRpbWU7XG4gICAgICAgICAgcnVudGltZS5sb2FkZXIgPSBHYXJmaXNoLmxvYWRlcjtcblxuICAgICAgICAgIGFwcEluc3RhbmNlLnJ1bkNvZGUgPSBmdW5jdGlvbiAoXG4gICAgICAgICAgICBjb2RlOiBzdHJpbmcsXG4gICAgICAgICAgICBlbnY6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICB1cmw/OiBzdHJpbmcsXG4gICAgICAgICAgICBvcHRpb25zPzogaW50ZXJmYWNlcy5FeGVjU2NyaXB0T3B0aW9ucyxcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGFwcEVudiA9IGFwcEluc3RhbmNlLmdldEV4ZWNTY3JpcHRFbnYob3B0aW9ucz8ubm9FbnRyeSk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVudiwgYXBwRW52KTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnM/LmlzTW9kdWxlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvZGVSZWYgPSB7IGNvZGUgfTtcblxuICAgICAgICAgICAgICBydW50aW1lLm9wdGlvbnMuZXhlY0NvZGUgPSBmdW5jdGlvbiAob3V0cHV0LCBwcm92aWRlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZW1hcCA9IGBcXG4vL0Agc291cmNlTWFwcGluZ1VSTD0ke291dHB1dC5tYXB9YDtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVudiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIGNvZGVSZWYuY29kZSA9IGAoKCkgPT4geyd1c2Ugc3RyaWN0Jzske291dHB1dC5jb2RlfX0pKClgO1xuXG4gICAgICAgICAgICAgICAgc2FuZGJveD8uaG9va3MubGlmZWN5Y2xlLmJlZm9yZUludm9rZS5lbWl0KFxuICAgICAgICAgICAgICAgICAgY29kZVJlZixcbiAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgIGVudixcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBzYW5kYm94Py5jcmVhdGVFeGVjUGFyYW1zKGNvZGVSZWYsIGVudik7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb2RlID0gYCR7Y29kZVJlZi5jb2RlfVxcbi8vJHtvdXRwdXQuc3RvcmVJZH0ke3NvdXJjZW1hcH1gO1xuICAgICAgICAgICAgICAgICAgZXZhbFdpdGhFbnYoY29kZSwgcGFyYW1zIHx8IHt9LCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICBzYW5kYm94Py5wcm9jZXNzRXhlY0Vycm9yKGUsIHVybCwgZW52LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzYW5kYm94Py5ob29rcy5saWZlY3ljbGUuYWZ0ZXJJbnZva2UuZW1pdChcbiAgICAgICAgICAgICAgICAgIGNvZGVSZWYsXG4gICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICBlbnYsXG4gICAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIGFwcEluc3RhbmNlLmVzbVF1ZXVlLmFkZChhc3luYyAobmV4dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pc0lubGluZVxuICAgICAgICAgICAgICAgICAgICA/IGF3YWl0IHJ1bnRpbWUuaW1wb3J0QnlDb2RlKGNvZGVSZWYuY29kZSwgdXJsKVxuICAgICAgICAgICAgICAgICAgICA6IGF3YWl0IHJ1bnRpbWUuaW1wb3J0QnlVcmwodXJsLCB1cmwpO1xuICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzYW5kYm94Py5leGVjU2NyaXB0KGNvZGUsIGVudiwgdXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBhZnRlclVubW91bnQoYXBwSW5mbywgYXBwSW5zdGFuY2UsIGlzQ2FjaGVNb2RlKSB7XG4gICAgICAgIGlmICghaXNDYWNoZU1vZGUpIHtcbiAgICAgICAgICBhcHBNb2R1bGVzW2FwcEluc3RhbmNlLmFwcElkXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBOzs7QUNWQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNEJBLHNCQUNFLFFBQ0EsVUFDYTtBQUNiLFFBQU0sT0FBTyxPQUFPLEtBQUs7QUFDekIsYUFBVyxPQUFPLE1BQU07QUFDdEIsUUFBSSxPQUFPLFNBQVMsU0FBUyxNQUFNO0FBQ2pDLGFBQU87QUFBQTtBQUFBO0FBR1gsU0FBTztBQUFBO0FBR0Ysc0JBQXNCLE1BQW1DO0FBQzlELE1BQUksQ0FBQztBQUFNLFdBQU87QUFDbEIsU0FBUSxLQUFjLFNBQVM7QUFBQTtBQUcxQixlQUFlLE1BQTRDO0FBQ2hFLFNBQU8sc0JBQXNCLE1BQU0sRUFBRSxNQUFNO0FBQUE7QUFHdEMsZUFBZSxNQUFlO0FBQ25DLFNBQU8sc0JBQXNCLFNBQVMsS0FBSyxTQUFTO0FBQUE7QUFHL0Msb0JBQW9CLE1BQWlDO0FBQzFELE1BQUksQ0FBQztBQUFNLFdBQU87QUFDbEIsU0FBUSxLQUFjLFNBQVM7QUFBQTtBQUcxQix1QkFBdUIsTUFBZTtBQUMzQyxTQUFPLHNCQUFzQixTQUFTLG1CQUFtQixTQUFTLE1BQU07QUFBQTtBQUduRSxtQ0FDTCxNQUNpQztBQUNqQyxNQUFJLENBQUM7QUFBTSxXQUFPO0FBQ2xCLFNBQVEsS0FBYyxTQUFTO0FBQUE7QUFHMUIseUJBQ0wsTUFDeUM7QUFDekMsTUFBSSxDQUFDO0FBQU0sV0FBTztBQUNsQixRQUFNLFdBQVks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
