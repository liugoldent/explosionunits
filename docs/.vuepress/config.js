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
        'leetcode0217-contains-duplicate',
        'leetcode0509-feibonacci-number',
        'leetcode0804-unique-morse-code-words'
      ],
      '/CSS/':[
        '',
        'flex',
        'grid',
        'specificity',
        'box-model',
        'transition'
      ],
      '/React/':[
        '',
        'react1-introduceJSX',
        'react2-composeComp',
        'react3-stateful-component',
        'react4-pass-state-to-component',
        'react5-introduce-style'
      ],
      '/NodeAndNpm/':[
        '',
        'node1-talk-about-npm',
        'node2-node-and-express',
        'node3-introduction-mongoDB.md'
      ],
      '/Web/':[
        '',
        'request'
      ]
    },
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    sidebarDepth:1,
    logo:'/logo.png'
  }
}
