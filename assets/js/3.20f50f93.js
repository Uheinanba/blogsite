(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{57:function(e,n,t){e.exports=t.p+"assets/img/vuepress_nav.4ab340f0.gif"},77:function(e,n,t){"use strict";t.r(n);var s=[function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("div",{staticClass:"content"},[s("h3",{attrs:{id:"导航栏和侧栏"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导航栏和侧栏","aria-hidden":"true"}},[e._v("#")]),e._v(" 导航栏和侧栏")]),s("p",[s("img",{attrs:{src:t(57),alt:"An image"}})]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("module.exports = {\n    themeConfig:{\n        nav: [ // 导航栏\n            { text: '工具', link: '/tools/' },\n            {\n                text: 'github',\n                // 这里是下拉列表展现形式。\n                items: [\n                    {   \n                        text: 'focus-outside', \n                        link: 'https://github.com/TaoXuSheng/focus-outside' \n                    },\n                    {   \n                        text: 'stylus-converter', \n                        link: 'https://github.com/TaoXuSheng/stylus-converter' \n                    },\n                ]\n            }\n        ],\n        sidebar: [ // 侧栏\n            {\n              title: 'Counter',\n              collapsable: false,\n              children: [\n                '/counter/counter-app'\n              ]\n            },\n            {\n              title: 'API Guide',\n              collapsable: false,\n              children: [\n                  '/tools/guide',\n                  '/tools/api'\n              ]\n            }\n        ]\n    }\n}\n")])]),s("h3",{attrs:{id:"在vuepress中注册组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在vuepress中注册组件","aria-hidden":"true"}},[e._v("#")]),e._v(" 在VuePress中注册组件")]),s("ol",[s("li",[e._v("自定义组件\n在.vuepress/components中增加组件 my-header.vue")])]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("<template>\n  <div>\n      <h1>This Header is actually a Vue Template</h1>\n  </div>\n</template>\n<script>\n    \n<\/script>\n<style scoped>\n</style>\n")])]),s("p",[e._v("无需手动引用直接在md文件中使用组件即可"),s("code",[e._v("<my-header></my-header>")])]),s("ol",{attrs:{start:"2"}},[s("li",[e._v("引用组件库\n假设我需要做代码演示(引用了第三方库),这时候我们通常统一的注册。在.vuepress/enhanceApp.js来配置。\n下面我们引入element-ui组件库。")])]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// 全局注册 Element 组件库\nimport Vue from 'vue'\nimport Element from 'element-ui'\nimport 'element-ui/lib/theme-chalk/index.css'\n\nexport default ({\n  Vue,\n  options,\n  router\n}) => {\n  Vue.use(Element)\n}\n")])])])}],a=t(0),r=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},s,!1,null,null,null);n.default=r.exports}}]);