---
title: javascript function programming
---

# React-standard

## 简介
面向对象语言的问题是，它们永远都要随身携带哪些隐式的环境。
### 案例
```
function splat(func) {
   return function() {
       return func.apply(null, _.toArray(arguments));
   }
}
```

## 一等函数和Applicative编程
### 一等函数
1. 函数看做"一等公民"时，它可以去任何值可以去的地方,很少有限制。
2. 当我们使用“函数”这个词的时候,指的独立存在的函数, 而“方法”指的是在对象上下文创建出来的函数。

### Applocative编程
Applocative编程定义为: 函数A作为参数提供给函数B
最典型的: map, reducer, forEach, filter。

## 变量作用域和闭包
1. 自由变量
如果一个函数包含内部函数，那么它们都可以看到其中声明的变量, 这些变量称为“自由”变量。

自由变量可以是函数内部声明的变量, 也可以是参数。
闭包可以捕捉自由变量,可以是任何类型,包括函数。捕捉函数(高阶函数)是构建抽象的强大技术

2. 闭包

### 高阶函数
1. 高阶函数遵循一个明确定义
- 函数是一等公民
- 以一个函数为参数
- 以一个函数为返回结果(惰性求值)

2. 关于传递函数的更多思考:重复,反复和条件迭代(iterateUntil)
- 下面使用函数抽象出处理方法
```
function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

const abc = repeatedly(3, function() {
    return Math.floor(Math.random() * 10) + 1;
});
```
- 再进一步,我们使得条件也抽象出来。
```
function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);
    while(check(result)) {
        ret.push(result);
        result = fun(result);
    }
    return ret;
}

var a = iterateUntil(function(n) {
    return n + n
}, function(n) {
    return n <= 1024
}, 1);
```
3. 返回其他函数的函数
- 闭包
    * 首先闭包会捕获一个值(或引用),并多次返回相同的值
    * 每一个新闭包都会捕获不一样的值
- 陷阱
```
var generator = {
    count: 1,
    uniqueString: function(prefix) {
        return [prefix, this.count].join('');
    }
}
```
这里如果用户这样来使用就会出现问题:
```
var uniqueString = generator.uniqueString;
uniqueString('ceshi');
```



### 由函数构建函数
1. 柯里化,科利华函数逐渐返回消耗参数的函数, 直到所有参数耗尽。
2. 部分应用是一个“部分”执行，等待接受剩余的参数立即执行的函数。

### curry柯里化
1. 基本curry函数
```
function curryHelper(fn) {
    var _args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var _newArgs  = Array.prototype.slice.call(arguments);
        var _totalArgs = _args.concat(_newArgs);
        return  fn.apply(this, _totalArgs);
    }
}

function showMsg(name, age, fruit) {
    console.log('my name is' + name + 'i am '+age+ 'i like' + fruit);
}

const curryShowMsg  = curryHelper(showMsg, 'yuank');
curryShowMsg(22, 'apple');
```
2. 我们希望扩展为: 任意次数的调用,传递的参数不是按照顺序来传递。

3. setTimeout封装场景
```
function timer(fn, delay) {
    setTimeout(fn ,delay)
}
const curriedTimout = _.curry(timer);
const delay1000 = curriedTimout(_, 1000)
delay1000(() => console.log(2323))
```

### partial
```
function timer(fn, delay) {
    setTimeout(fn ,delay)
}
const delay1000 = _.partial(timer, _, 1000);
delay1000(() => console.log(2324))
```


### 三个重要的函数
curry
partail
compose


## 递归

1. 理解递归对理解函数式编程非常重要:
- 递归的解决方案包括使用对一个普通问题子集的单一抽象的使用。
- 递归可以隐藏可变状态。
- 递归是一种实现惰性和无限大架构的方法。

2. myLength 接收一个数组,并返回数组的长度(TODO)
```
function myLength(ary) {
    if(ary.length === 0 ) {
        return 0
    } else {
        myLength
    }
}
myLength(_.range(10))
```