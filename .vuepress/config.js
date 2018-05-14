module.exports = {
    base: '/blogsite/',
    title: '黑曼巴个人博客',
    description: "用于平时记录学习和心得的小天地",
    themeConfig:{
      nav: [
        { 
          text: '前端框架', 
          items: [
            {   
              text: 'React', 
              link: '/react/' 
            },
            {
              text: 'Vue', 
              link: '/vue/'
            }
          ]
        },
        { 
          text: 'javascript', 
          items: [
            {
              text: '函数式编程',
              link: '/fp/'
            },
            {
              text: 'AST',
              link: '/ast/'
            }
          ],
        },
        { text: '工具', link: '/tools/' },
        // {
        //   text: 'github',
        //   // 这里是下拉列表展现形式。
        //   items: [
        //     {   
        //       text: 'focus-outside', 
        //       link: 'https://github.com/TaoXuSheng/focus-outside' 
        //     },
        //     {   
        //       text: 'stylus-converter', 
        //       link: 'https://github.com/TaoXuSheng/stylus-converter' 
        //     },
        //   ]
        // }
      ],
      // sidebar: [
      //     {
      //       title: 'Counter',
      //       collapsable: false,
      //       children: [
      //         '/counter/counter-app'
      //       ]
      //     },
      //     {
      //       title: 'API Guide',
      //       collapsable: false,
      //       children: [
      //           '/tools/guide',
      //           '/tools/api'
      //       ]
      //     }
      // ]
  }
}