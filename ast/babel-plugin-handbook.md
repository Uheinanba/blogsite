---
title: Babel 插件手册
# refer https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
---

# Babel 插件手册

### babel 工作原理
       Parse         Transform          Generator
code --------> AST ------------>  AST -------------->  code
       babylon      babel-traverse     babel-generator

### 基础
Babel是javascript编译器,更确切的说是源码到源码的编译器，通常称为“转换编译器(transpiler)”意思是说你为Babel提供一些JavaScript代码，Babel更改这些代码，然后返回给你新的代码。
#### ASTs
使用[AST Explorer](http://astexplorer.net)可以对AST节点有更感性的认识。

比如:
```
function square(n) {
  return n * n;
}
```
AST 的每层结构相同:
```
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}
```

```
{
  type: "Identifier",
  name: ...
}
```

```
{
  type: "BinaryExpression",
  operator: ...,
  left: {...},
  right: {...}
}
```
这样的每层结构称为节点(Node),一个AST可以由单一节点或者成百上千节点构成。他们组合在一起可以描述用于静态分析的程序语法。
可以描述为
```
interface Node {
  type: string; // 'FunctionDeclaration', 'Identifier', 'BinaryExpression'
}
```

#### Visitor
Visitor是一个用于AST遍历跨语言的模式，简单的来讲它们就是一个对象，定义了用于在一个树状结构中获取具体节点的方法。

比如:我只是想访问if...else生成的节点，我们可以在visitor里指定获取它所对应的节点
```
const visitor = {
    IFStatement() {
        console.log('get if');
    }
}
```
其实上述遍历会让每个节点被访问两次，一次是向下遍历代表进入(enter),一次是向上退出(exit)。因此实际上每个节点都会有enter和exit方法，在实际操作的时候需要注意这种遍历方式可能会引起一些问题。 上面例子是忽略掉enter的简写
```
const visitor = {
    IfStatement: {
        enter() {},
        exit() {}
    }
}
```
#### Path
AST 通常会有很多节点，那么节点直接如何相互关联呢。我们可以使用Path简化这件事。
Path 是一个对象，它表示两个节点之间的连接。通过这个对象我们可以访问到节点，父节点以及进行一系列节点操作相关的方法(类似DOM操作)。
```
const MyVisitor = {
    Identifier(path) {
        console.log('visiting:' + path.node.name);
    }
}
```
### API
babel实际上是一组模块的集合.

#### babylon
1. 基本使用
```
import babylon from "babylon";
const code = `function square(n) {
    return n * n;
}`;
babylon.parse(code);
```
2. parse方法还能够传递选项
```
babylon.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
});
```
sourceType可以是'module'或者是'script'它表示babylon应该用哪种模式来解析。'module'将会在严格模式下解析并允许模块定义。"script"则不会。

#### babel-traverse

babel Traverse模块维护了整棵树的状态，并且负责替换，移除和添加节点。
我们可以和Babylon一起来遍历和更新节点:
```
var babel = require('babel-core');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const generator = require('babel-generator').default;

const code = `
function square(n) {
    return n * n;
}`;

const ast = babylon.parse(code, {
    sourceType: "module"
});

traverse(ast, {
    enter(path) {
        if(
            path.node.type === 'Identifier' &&
            path.node.name === 'n'
        ) {
            path.node.name = 'x';
        }
    }
})

console.log(generator(ast).code);
```

#### babel-types
Babel Types模块是一个用于ast节点的Lodash式的工具库,它包含构造，验证以及变换ast节点的方法。该工具库包含考虑周到的工具方法，对编写处理ast处理逻辑非常有用。
1. 示例
```
import traverse from "babel-traverse";
import t from "babel-types";

traverse(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
});
```
2. Definitions(定义)
Babel Types模块拥有每一个单一类型节点的定义, 包括节点包括哪些属性，什么合法值，如何构建节点遍历节点，以及节点的别名等信息。
单一节点类型的定义形式如下:
```
defineType("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: assertValueType("string")
    },
    left: {
      validate: assertNodeType("Expression")
    },
    right: {
      validate: assertNodeType("Expression")
    }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});
```

3. Builders(构建器)
上面的BinaryExpression 定义有一个builder字段。
```
builder: ['operator', 'left', 'right']
```
这是由于每一个节点类型都有构造器方法builder。按照类似下面方式使用
```
t.binaryExpression('*', t.identifier("a"), t.identifier("b"));
```
可以创建如下的AST:
```
{
  type: "BinaryExpression",
  operator: "*",
  left: {
    type: "Identifier",
    name: "a"
  },
  right: {
    type: "Identifier",
    name: "b"
  }
}
```
4. Validators(验证器)
BinaryExpression的定义还包含了节点的字段fields信息，以及如何验证这些字段
```
fields: {
  operator: {
    validate: assertValueType("string")
  },
  left: {
    validate: assertNodeType("Expression")
  },
  right: {
    validate: assertNodeType("Expression")
  }
}
```

- 可以创建两种验证方法，第一种是JSX
```
t.isBinaryExpression(maybeBinaryExpressionNode)
```
- 同时可以传入第二个参数来确保节点包含特定的属性和值。
```
t.isBinaryExpression(maybeBinaryExpressionNode, { operator: "*" });
```

#### babel-generator
Babel Generator 模块是Babel代码生成器,它读取AST并将转换成代码和源码映射。
```
import * as babylon from "babylon";
import generate from "babel-generator";

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

generate(ast, {}, code);
```

#### babel-template
babel-template 是另外一个虽然很小但是非常有用的模块。它能让你编写字符串形式并且带有占位符的代码来代替手动编码, 尤其是生成的大规模AST时候。

```
import template from "babel-template";
import generate from "babel-generator";
import * as t from "babel-types";

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});

console.log(generate(ast).code);
// var myModule = require("my-module");
```

### Babel插件
// http://web.jobbole.com/91277/
1. 
```
const code = `abs(-8);`;

const visitor = {
	CallExpression(path) {
		if (path.node.callee.name !== 'abs') return;

		path.replaceWith(t.CallExpression(
			t.MemberExpression(t.identifier('Math'), t.identifier('abs')),
			path.node.arguments
		));
	}
};

const result = babel.transform(code, {
	plugins: [{
		visitor: visitor
	}]
});

// Math.abs(-8)
console.log(result.code);
```
2. 
```
function MyVisitor({ types: t }) {
    return {
      visitor: {
        BinaryExpression(path) {
            if (path.node.operator !== "===") {
                return;
            }
            const left = path.get('left');
            const right = path.get('right');
            path.node.left = t.identifier("sebmck");
        }
      }
    };
}
const code = 'foo === bar';
const ast = babel.transform(code, {plugins: [MyVisitor]});
console.log(ast.code);
```

### 转换操作
#### 访问
1. 获取子节点的path
为了得到一个AST节点的属性值, 我们一般先访问到该节点，然后利用path.node.property方法即可。
```
BinaryExpression(path) {
    path.node.left,
    path.node.operator
}
```

2. 检查子节点的类型
- 最好的方式是
```
BinaryExpression(path) {
    if (t.isIdentifier(path.node.left)) {
        // ..
    }
}
```
- 同样可以对节点的属性们做浅层的检查
```
BinaryExpression(path) {
    if (t.isIdentifier(path.node.left, {name: 'n'})) {
        // ..
    }
}

```
等价于:
```
BinaryExpression(path) {
  if (
    path.node.left != null &&
    path.node.left.type === "Identifier" &&
    path.node.left.name === "n"
  ) {
    // ...
  }
}
```
3. 检查路径(Path)类型
一个路径具有相同的方法检查节点的类型:
```
BinaryExpression(path) {
    if (path.get('left').isIdentifier({name: 'n'})) {
        // ..
    }
}
```
相当于:
```
BinaryExpression(path) {
    if (t.isIdentifier(path.node.left, {name: 'n'})) {
        // ...
    }
}
```
3. 检查标识符(Identifier)是否被引用
```
Identifier(path) {
  if(path.isReferencedIdentifier()) { // 等价于 t.isReferenced(path.node, path.parent)
    // ...
  }
}
```
4. 找到特定的父路径
- 从一个路径向上遍历语法树，直到满足相应条件
```
path.findParent(path => path.isObjectExpression());
```
- 遍历当前节点
```
path.find(path => path.isObjectExpression())
```
- 查找最接近的父函数或程序
```
path.getFunctionParent()
```
- 向上遍历语法树，直到找到在列表中的父节点路径
```
path.getStatementParent()
```
5. 获取同级路径

