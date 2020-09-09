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
        'slot'
      ],
      '/LeetCode/':[
        '',
        'leetcode0001-two-sum',
        'leetcode0002-add-two-numbers',
        'leetcode0005-longest-palindromic-substring',
        'leetcode0006-zigzag-conversion',
        'leetcode0509-feibonacci-number'
      ],
      '/CSS/':[
        '',
        'flex',
        'grid',
        'specificity',
        'box-model'
      ],
      '/React/':[
        '',
        'react1-introduceJSX',
        'react2-composeComp',
        'react3-stateful-component',
        'react4-pass-state-to-component'
      ],
      '/NodeAndNpm/':[
        '',
        'talk-about-npm'
      ],
      '/Web/':[
        '',
        'request'
      ]
    },
    themeConfig: {
      lastUpdated: 'Last Updated', // string | boolean
      smoothScroll: true,
      logo:'~/docs/.vuepress/public/logo.png'
    },
  }
}
