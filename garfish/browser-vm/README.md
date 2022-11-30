# `@garfish/browser-vm`

[![NPM version](https://img.shields.io/npm/v/@garfish/browser-vm.svg?style=flat-square)](https://www.npmjs.com/package/@garfish/browser-vm)

## Usage

```js
import vmSandbox from '@garfish/browser-vm';

let nameMap = { a: 'chen' };

const sandbox = new vmSandbox({
  namespace: 'app',
  el: () => document.body,
  modules: [
    () => ({
      override: { nameMap },
      recover() {
        nameMap = { a: 'chen' };
      },
    }),
  ],
});

sandbox.execScript(`
  window.x = 1;
  console.log(window.nameMap); // { a: 'chen' }
  window.nameMap.a = 'tao';
`);

console.log(sandbox.global.x); // 1
console.log(sandbox.global.nameMap); // { a: 'tao' }

// Clear effect
sandbox.clearEffects();
console.log(nameMap); // { a: 'chen' }

// If clear all effects
sandbox.reset();
```

## Hooks

```js
const sandbox = new vmSandbox({
  namespace: 'app',
  el: () => document.body,
});

sandbox.hooks.usePlugin({
  stared(fakeWindow) {},
  closed() {},
  beforeClearEffect() {},
  afterClearEffect() {},
  beforeInvoke(url, env, options) {},
  afterInvoke(url, env, options) {},
  invokeError(err, url, env, options) {},
  appendNode(parentNode, oldNode, convertedNode, tagName) {},
});
```
