import { interfaces } from '@garfish/core';

interface Position {
    content: string;
    source?: string | null;
    end: {
        line: number;
        column: number;
    };
    start: {
        line: number;
        column: number;
    };
}
interface BaseNode<T> {
    type: T;
    position: Position;
    parent: Node | null;
}
interface RuleNode extends BaseNode<'rule'> {
    selectors: Array<string>;
    declarations: Array<DeclNode>;
}
interface HostNode extends BaseNode<'host'> {
    rules: Array<Node>;
}
interface PageNode extends BaseNode<'page'> {
    selectors: Array<string>;
    declarations: Array<DeclNode>;
}
interface MediaNode extends BaseNode<'media'> {
    media: string;
    rules: Array<Node>;
}
interface ImportNode extends BaseNode<'import'> {
    import: string;
}
interface CommentNode extends BaseNode<'comment'> {
    comment: string;
}
interface CharsetNode extends BaseNode<'charset'> {
    charset: string;
}
interface SupportsNode extends BaseNode<'supports'> {
    supports: string;
    rules: Array<Node>;
}
interface FontFaceNode extends BaseNode<'font-face'> {
    declarations: Array<DeclNode>;
}
interface NamespaceNode extends BaseNode<'namespace'> {
    namespace: string;
}
interface DeclNode extends BaseNode<'declaration'> {
    value: string;
    property: string;
}
interface KeyframeNode extends BaseNode<'keyframe'> {
    values: Array<string>;
    declarations: Array<DeclNode>;
}
interface CustomMediaNode extends BaseNode<'custom-media'> {
    name: string;
    media: string;
}
interface DocumentNode extends BaseNode<'document'> {
    vendor?: string;
    document: string;
    rules: Array<Node>;
}
interface KeyframesNode extends BaseNode<'keyframes'> {
    name: string;
    vendor?: string;
    keyframes: Array<KeyframeNode>;
}
interface StylesheetNode extends BaseNode<'stylesheet'> {
    stylesheet: {
        source?: string;
        rules: Array<Node>;
        parsingErrors: Array<Error>;
    };
}
declare type Node = DeclNode | PageNode | HostNode | RuleNode | MediaNode | ImportNode | CharsetNode | CommentNode | SupportsNode | DocumentNode | FontFaceNode | KeyframeNode | KeyframesNode | NamespaceNode | StylesheetNode | CustomMediaNode;

interface CssParserOptions {
    silent?: boolean;
    source?: string | null;
}
declare function parse(css: string, options?: CssParserOptions): StylesheetNode;

declare function stringify(node: StylesheetNode, id: string): string;

interface CssScopeOptions {
    fixBodyGetter?: boolean;
    excludes?: Array<string> | ((name: string) => boolean);
}
declare function GarfishCssScope(options?: CssScopeOptions): (Garfish: interfaces.Garfish) => interfaces.Plugin;

export { CssScopeOptions, GarfishCssScope, parse, stringify };
