---
title: vue hoc
# refer https://github.com/vuejs/vue/issues/6201
# refer https://github.com/jackmellis/vue-hoc/tree/master/packages/vue-hoc/src
---

# vue 高阶组件

#### mixin的问题
mixins在于它太灵活, 太依赖于使用者。mixin里面很多"黑"逻辑。比如同名函数处理等。

#### vue hoc 实现方式
```js
const HOC = WrappedComponent => ({
  template: `<wrapped v-on="$listeners" v-bind="$attrs"><slot/></wrapped>`,
  components: {
    'wrapped': WrappedComponent,
  },
});

const BaseComponent = Vue.extend({
  props: ['foo'],
  template: `
  <div>
    base component
    <slot></slot>
  </div>
  `,
  methods: {
    emitHello () {
      this.$emit('hello');
    }
  }
})

// HOC(BaseComponent)
```

