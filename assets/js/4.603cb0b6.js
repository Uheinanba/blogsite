(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{76:function(t,s,e){"use strict";e.r(s);var i=e(0),n=Object(i.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[e("h3",{attrs:{id:"github-travis-ci搭建博客步骤"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#github-travis-ci搭建博客步骤","aria-hidden":"true"}},[t._v("#")]),t._v(" github travis CI搭建博客步骤")]),e("blockquote",[e("p",[t._v("使用gh-pages分支可以搭建静态页面的独立博客,正常我们在一个分支上进行开发,然后将构建后的文件发布到gh-pages分支,则可以直接访问到这个页面。")])]),e("ol",[e("li",[t._v("在travis(https://travis-ci.org/)关联github账号。")]),e("li",[t._v("travis会拉取你的github的所有项目,需要手动的把需要CI的项目开启。")]),e("li",[t._v("在项目https://github.com/settings/tokens下添加一个私人的access tokens。通过这个token你可以直接访问到你的github API。")]),e("li",[t._v("添加yml脚本")])]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("language: node_js\nnode_js: stable\nbranches:\n  only:\n  - master\nbefore_install:\n- npm install -g vuepress\ninstall:\n- npm install\nscript:\n- npm run docs:build\nafter_success:\n- cd .vuepress/dist\n- git init\n- git config --global user.name 'heimanba'\n- git config --global user.email '783962369@qq.com'\n- git add .\n- git commit -m \"generate static resources, triggerd by travis ci\"\n- git push -f \"https://${REPO_TOKEN}@${GH_REF}\" master:gh-pages\nenv:\n  global:\n  - GH_REF: github.com/Uheinanba/blogsite.git\n")])]),e("h3",{attrs:{id:"注意"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#注意","aria-hidden":"true"}},[t._v("#")]),t._v(" 注意")]),e("p",[t._v('重点看看 git push -f "https://${REPO_TOKEN}@${GH_REF}" master:gh-pages这段。\n通过env可以定义变量: GH_REF代表的是Git通过https的链接获取的地址。')]),e("p",[t._v("REPO_TOKEN: 代表着私密的访问token(在https://github.com/settings/tokens网站生成)。这个私密的token不能明文的写在travis.yml文件中,所以travis项目网站中设置Environment Variables(和定义env 性质是一致的)。优势在于这些密钥存在远程服务端,别人无法知道(很好的一个设计方式)")]),e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),e("p",[t._v("我们只需要把代码提交到maste分支,CI 会自动帮我们进编译,然后把编译之后的代码push到gh-pages分支")])])])}],!1,null,null,null);s.default=n.exports}}]);