import { interfaces } from '@garfish/core';

declare const noop: () => void;
declare const objectToString: () => string;
declare const supportWasm: boolean;
declare const idleCallback: ((callback: IdleRequestCallback, options?: IdleRequestOptions | undefined) => number) & typeof requestIdleCallback;
declare function createKey(): string;
declare function isObject(val: any): any;
declare function isPlainObject(val: any): val is Object;
declare function getType(val: any): any;
declare function isPromise(obj: any): obj is Promise<any>;
declare function hasOwn(obj: any, key: PropertyKey): boolean;
declare function def(obj: Object, key: string, value: any): void;
declare function makeMap<T extends Array<PropertyKey>>(list: T): (val: PropertyKey) => boolean;
declare function makeMapObject<T extends Array<string>>(list: T): { [k in T[number]]: true; };
declare function inBrowser(): boolean;
declare function warn(msg: string | Error): void;
declare function error(error: string | Error): void;
declare function validURL(str: any): boolean;
declare function internFunc(internalizeString: any): string;
declare function evalWithEnv(code: string, params: Record<string, any>, context: any, useStrict?: boolean): void;
declare function safeWrapper(callback: (...args: Array<any>) => any): void;
declare function nextTick(cb: () => void): void;
declare function assert(condition: any, msg?: string | Error): asserts condition;
declare function toBoolean(val: any): boolean;
declare function remove<T>(list: Array<T> | Set<T>, el: T): boolean;
declare function callTestCallback(obj: any, ...args: any[]): void;
declare function unique<T>(list: Array<T>): T[];
declare function isPrimitive(val: any): boolean;
declare function filterUndefinedVal<T extends Object>(ob: T): T;
declare function deepMerge<K, T>(o: K, n: T, dp?: boolean, ignores?: Array<string>): K & T;
declare function isAbsolute(url: string): boolean;
declare function transformUrl(resolvePath: string, curPath: string): string;
declare function toWsProtocol(url: string): string;
declare function findTarget(el: Element | ShadowRoot | Document, selectors: Array<string>): Document | Element | ShadowRoot;
declare function setDocCurrentScript(target: any, code: string, define?: boolean, url?: string, async?: boolean, originScript?: HTMLScriptElement): () => void;
declare function _extends(d: any, b: any): void;
declare function mapObject(obj: Record<PropertyKey, any>, fn: (key: PropertyKey, val: any) => any): {};
declare function toBase64(input: string, mimeType?: string): Promise<string>;
declare const hookObjectProperty: <T extends {}, K extends keyof T, P extends any[]>(obj: T, key: K, hookFunc: (origin: T[K], ...params: P) => T[K]) => (...params: P) => (strict?: boolean | undefined) => void;
declare function getParameterByName(name: any, url?: string): string | null;
declare function getGarfishDebugInstanceName(): string | null;
declare function safari13Deal(): {
    triggerSet(): void;
    handleDescriptor(descriptor: PropertyDescriptor): void;
};
declare function haveSourcemap(code: string): boolean;
declare function createSourcemap(code: string, filename: string): Promise<string>;

declare class Queue {
    private fx;
    private init;
    private lock;
    private finishDefers;
    private next;
    add(fn: (next: () => void) => void): void;
    awaitCompletion(): Promise<unknown>;
}

interface StackFrame {
    url: string;
    func: string;
    args: string[];
    line: number | null;
    column: number | null;
}
interface StackTrace {
    name: string;
    message: string;
    mechanism?: string;
    stack: StackFrame[];
    failed?: boolean;
}
declare function computeStackTraceFromStackProp(ex: any): StackTrace | null;
declare const sourceListTags: string[];
declare const sourceNode: (val: PropertyKey) => boolean;
declare function computeErrorUrl(ex: any): any;
declare function filterAndWrapEventListener(type: string, listener: EventListenerOrEventListenerObject, sourceList: Array<string>): EventListener;

interface Text {
    content: string;
    type: 'text' | 'comment';
}
interface Node {
    key?: string;
    type: 'element';
    tagName: string;
    children: Array<Node | Text>;
    attributes: Array<Record<string, string | null>>;
}
declare type Attributes = Array<Record<string, string | null>>;
declare class DOMApis {
    document: Document;
    constructor(cusDocument?: Document);
    isText(node: Node | Text): node is Text;
    isNode(node: Node | Text): boolean;
    isCommentNode(node: Node | Text): boolean;
    isCssLinkNode(node: Node): boolean;
    isIconLinkNode(node: Node): boolean;
    isPrefetchJsLinkNode(node: Node): boolean;
    isRemoteModule(node: Node): boolean;
    removeElement(el: Element | Comment): void;
    createElement(node: Node): HTMLElement | SVGElement;
    createTextNode(node: Text): globalThis.Text;
    createStyleNode(content: string): HTMLStyleElement;
    createLinkCommentNode(node: Node | string): string | Comment;
    createScriptCommentNode(node: Node | {
        code: string;
        src?: string;
    }): Comment;
    applyAttributes(el: Element, attributes: Attributes): void;
}

declare const __LOADER_FLAG__: unique symbol;
declare const __GARFISH_FLAG__: unique symbol;
declare const __MockHtml__ = "__garfishmockhtml__";
declare const __MockBody__ = "__garfishmockbody__";
declare const __MockHead__ = "__garfishmockhead__";
declare const __REMOVE_NODE__ = "__garfishremovenode__";

declare type mimeType = ReturnType<typeof parseContentType>;
declare function parseContentType(input: string): {
    type: string;
    subtype: string;
} | null;
declare function isCss(mt: mimeType): boolean;
declare function isHtml(mt: mimeType): boolean;
declare function isJs(mt: mimeType): boolean;
declare function isJsonp(mt: mimeType, src: string): boolean;
declare function isJsType({ src, type }: {
    src?: string;
    type?: string;
}): boolean;
declare function isCssType({ src, type }: {
    src?: string;
    type?: string;
}): boolean;
declare function isHtmlType({ src, type, }: {
    src?: string;
    type?: string;
}): boolean;
declare function isGarfishConfigType({ type, }: {
    type?: string;
}): boolean;

declare const appContainerId = "garfish_app_for";
declare function createAppContainer(appInfo: interfaces.AppInfo): {
    htmlNode: HTMLDivElement | HTMLHtmlElement;
    appContainer: HTMLDivElement;
};
declare function getRenderNode(domGetter?: interfaces.DomGetter): Promise<Element>;

declare function templateParse(code: string, tags: Array<string>): readonly [Node[], Record<string, Node[]>];

declare const coreLog: any;
declare const routerLog: any;

declare class Lock {
    private id;
    private lockQueue;
    genId(): number;
    getId(): number;
    wait(id: number): Promise<void>;
    release(): void;
    clear(): void;
}

export { DOMApis, Lock, Node, Queue, StackFrame, StackTrace, Text, __GARFISH_FLAG__, __LOADER_FLAG__, __MockBody__, __MockHead__, __MockHtml__, __REMOVE_NODE__, _extends, appContainerId, assert, callTestCallback, computeErrorUrl, computeStackTraceFromStackProp, coreLog, createAppContainer, createKey, createSourcemap, deepMerge, def, error, evalWithEnv, filterAndWrapEventListener, filterUndefinedVal, findTarget, getGarfishDebugInstanceName, getParameterByName, getRenderNode, getType, hasOwn, haveSourcemap, hookObjectProperty, idleCallback, inBrowser, internFunc, isAbsolute, isCss, isCssType, isGarfishConfigType, isHtml, isHtmlType, isJs, isJsType, isJsonp, isObject, isPlainObject, isPrimitive, isPromise, makeMap, makeMapObject, mapObject, mimeType, nextTick, noop, objectToString, parseContentType, remove, routerLog, safari13Deal, safeWrapper, setDocCurrentScript, sourceListTags, sourceNode, supportWasm, templateParse, toBase64, toBoolean, toWsProtocol, transformUrl, unique, validURL, warn };
