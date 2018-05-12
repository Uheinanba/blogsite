---
title: React standard
---

# React-standard

## basic
1. 每个文件只写一个组件, 但是多个无状态的组件(函数组件)可以放在单文件中。
```
const Title = () => <div>header</div>;
class App extends Component {
    render() {
        return <Title />
    }
}
```


## 推荐以下顺序排序内部方法
```
1. static methods and properties
2. lifecycle methods, displayName, propTypes, contextTypes...
3. custome methods
4. render method
```

