---
title: travis
---

### github travis CI搭建博客步骤
> 使用gh-pages分支可以搭建静态页面的独立博客,正常我们在一个分支上进行开发,然后将构建后的文件发布到gh-pages分支,则可以直接访问到这个页面。
1. 在travis(https://travis-ci.org/)关联github账号。
2. travis会拉取你的github的所有项目,需要手动的把需要CI的项目开启。
3. 在项目https://github.com/settings/tokens下添加一个私人的access tokens。通过这个token你可以直接访问到你的github API。
4. 添加yml脚本
```
language: node_js
node_js: stable
branches:
  only:
  - master
before_install:
- npm install -g vuepress
install:
- npm install
script:
- npm run docs:build
after_success:
- cd .vuepress/dist
- git init
- git config --global user.name 'heimanba'
- git config --global user.email '783962369@qq.com'
- git add .
- git commit -m "generate static resources, triggerd by travis ci"
- git push -f "https://${REPO_TOKEN}@${GH_REF}" master:gh-pages
env:
  global:
  - GH_REF: github.com/Uheinanba/blogsite.git
```

### 注意
重点看看 git push -f "https://${REPO_TOKEN}@${GH_REF}" master:gh-pages这段。
通过env可以定义变量: GH_REF代表的是Git通过https的链接获取的地址。

REPO_TOKEN: 代表着私密的访问token(在https://github.com/settings/tokens网站生成)。这个私密的token不能明文的写在travis.yml文件中,所以travis项目网站中设置Environment Variables(和定义env 性质是一致的)。优势在于这些密钥存在远程服务端,别人无法知道(很好的一个设计方式)


::: tip
我们只需要把代码提交到maste分支,CI 会自动帮我们进编译,然后把编译之后的代码push到gh-pages分支
:::