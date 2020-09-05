module.exports = {
  title: 'Explosion Units',
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-145633929-2'
      }
    ]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig:{
    nav:[
      { text:'Vue', link:'/Vue/'},
      { text:'CSS', link:'/CSS/'},
      { text:'LeetCode', link:'/LeetCode/'},
      { text:'React', link:'/React/'},
    ],
    sidebar:{
      '/Vue/':[
        '',
        'vue-router-base',
        'life-circle',
        'computed-watch',
        // 'slot'
      ],
      '/LeetCode/':[
        '',
        'two-sum',
        'add-two-numbers',
        'longest-palindromic-substring'
      ],
      '/CSS/':[
        '',
        'flex',
        'grid'
      ],
      '/React/':[
        '',
        'introduceJSX',
        'composeComp',
        'props-for-react'
      ]
    },
    themeConfig: {
      lastUpdated: 'Last Updated', // string | boolean
      smoothScroll: true,
      logo:'~/docs/.vuepress/public/logo.png'
    },
  }
}
