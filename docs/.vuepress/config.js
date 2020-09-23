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
  description:'vue, React, css, html, web, frontend, node.js, npm, 資料結構, 演算法',
  markdown: {
    lineNumbers: true
  },
  themeConfig:{
    nav:[
      { text:'Home', link:'/'},
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
        'leetcode0219-contains-duplicate2',
        'leetcode0509-feibonacci-number',
        'leetcode0804-unique-morse-code-words'
      ],
      '/CSS/':[
        '',
        'normal',
        'flex',
        'grid',
        'specificity',
        'box-model',
        'transition',
        'animation',
        'center',
        'shadow'
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
      ],
      '/DataStructure/':[
        '',
        'dynamic-programming',
        'linked-list'
      ]
    },
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    sidebarDepth:1,
    logo:'/logo.png'
  }
}
