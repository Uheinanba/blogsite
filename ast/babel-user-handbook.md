---
title: Babel用户手册
# refer https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-introduction
---

# Babel用户手册

### babel-polyfill
原理是当运行环境中并没有实现的一些方法,babel-polyfill会给其做兼容。但是这样做也有个缺点,就是会污染全局变量,而且打包以后体积会增大很多，因为把整个依赖包也打进去了,所以并不推荐一些方法类库中去使用。

#### 用法
直接在应用的入口引用,以确保它能够最先加载
```
require('babel-polyfill')
```
### bable-runtime
为了不污染全局对象和内置的对象原型,但是又想体验新的语法。 可以配合使用 babel-runtime
```
npm install --save-dev babel-plugin-transform-runtime
npm install --save babel-runtime
```

#### 为什么需要使用两个插件(babel-runtime, babel-plugin-transform-runtime)
源文件:
```js
const key = 'babel'
const obj = {
    [key]: 'foo',
}
```

不加载babel-plugin-transform-runtime插件打包之后的效果:
```js
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var key = 'babel';
var obj = _defineProperty({}, key, 'foo');
```

加载babel-plugin-transform-runtime插件打包之后的效果:
```js
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = 'babel';
var obj = (0, _defineProperty3.default)({}, key, 'foo');
```

这里我们可以看出如果只有babel-runtime插件,代码中直接引入了helper函数。意味着不能共享,最终打包出来的文件会有很多重复的代码。所有babel开发了babel-plugin-transform-runtime。

#### 技术细节
runtime编译器插件做了三件事
- 当你使用generators/async函数时,自动引入babel-runtime/regenerator
- 自动引入babel-runtime/core-js并映射ES6静态方法和内置插件
- 移除内联Babel helper 并使用模块babel-runtime/helpers 代替。
这意味着,基本上,你可以使用诸如Promise,Set,Symbol等内置的函数，以及所有需要polyfill来完成且不带来全局污染的Babel功能，因此非常适合作为库使用。

::: tip 不足!!
babel-runtime 不能转码实例方法。比如:
```
'!!!'.repeat(3);
'hello'.includes('h');
```
这只能通过 babel-polyfill 来转码，因为 babel-polyfill 是直接在原型链上增加方法。
:::