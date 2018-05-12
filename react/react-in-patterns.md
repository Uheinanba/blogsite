---
title: react in patterns
---

# react-in-patterns
## Composition 组合
> React最大的一个优势在于组合性,下面探讨下react组合的一些技巧

演示例子
```
const Navgation  = () => <nav>home Nav</nav>
const Header  = () => <Navgation/>
const App = ()  = () => <Header />
```
APP -> Header-> Navgation
问题:
- 假设我们需要Header,只是Navgation换成别组件。
- 强依赖,Header依赖于Navgation,对于测试不友好。
### chilren
```
const Navgation  = () => <nav>home Nav</nav>
const Header  = ({children}) => <div>{children}</div>
const App = () => <Header><Navgation/></Header>
```
这里Header不在强依赖Navgation组件,而是依赖于props.children。

### chilren component as props
```
const Navgation  = () => <nav>home Nav</nav>
const Header  = ({nav}) => <div>{nav}</div>
const App = () => <Header nav={<Navgation/>} />
```
将子组件作为props传递

### HOC
```
const Navgation  = () => <nav>home Nav</nav>

const enhanceComponent = (WarpedComponent) => {
  return class newComponent extends React.Component {
    render() {
      return <WarpedComponent {...this.props}/>
    }
  }
}
const Header  = ({nav}) => <div>{nav}</div>
const EnhanceHeader = enhanceComponent(Header);

const App = () <EnhanceHeader nav={<Navgation/>} />
```

当然HOC模式还有另外一个特点我们可以在HOC中附加业务逻辑,这样我们可以把一些公用的业务逻辑封装起来。


### Function as c children, render prop
思考下面两段代码:

- 封装数据获取逻辑:

```
class DataProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: null };
    setTimeout(() => this.setState({ data: 'Hey there!' }), 5000);
  }
  render() {
    if (this.state.data === null) return null;
    return (
      <section>{ this.props.render(this.state.data) }</section>
    );
  }
}

<DataProvider render={data=> <TableList dataList=data/>}>
```
- 封装权限处理:
```
<Authorize
    permissionsInclude={[ 'read:products' ]}
    render={ () => <ProductsList /> } />
```



### 依赖注入
// TODO https://krasimir.gitbooks.io/react-in-patterns/content/chapter-10/

1. 使用HOC
```
const inject = (Component) => {
  return class Injector extends React.Component {
    render() {
      return (
        <Component {...this.props} context={context}/>
      )
    }    
  }
}
```
redux 的connect其实也是这种思路
2. react context v16.3之前
3. react context v16.3之后版本
4. 使用模块系统(pub/sub)
// di.jsx
```
var dependencies = {};

export function register(key, dependency) {
  dependencies[key] = dependency;
}

export function fetch(key) {
  if (dependencies[key]) return dependencies[key];
  throw new Error(`"${ key } is not registered as dependency.`);
}

export function wire(Component, deps, mapper) {
  return class Injector extends React.Component {
    constructor(props) {
      super(props);
      this._resolvedDependencies = mapper(...deps.map(fetch));
    }
    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          {...this._resolvedDependencies}
        />
      );
    }
  };
}

import { wire } from './di.jsx';
var Title = function(props) {
  return <h1>{ props.title }</h1>;
};

export default wire(
  Title,
  ['my-awesome-title'],
  title => ({ title })
);
```


