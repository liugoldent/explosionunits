// const fs = require('fs');
//
// function getSideBar(folder) {
//   // 只能用绝对路径
//   console.log('1')
//   return ['','/Users/guantingliu/Desktop/FrontEnd/explosionunits/docs/LeetCode/leetcode0001-two-sum']
//   path = '/Users/guantingliu/Desktop/FrontEnd/explosionunits/docs/pages' + folder + '/';
//   let file_list = fs.readdirSync(path);
//   for (let i = 0; i < file_list.length; i++) {
//     file_list[i] = file_list[i].slice(0, -3);
//   }
//   return file_list;
// }
module.exports = {
  title: 'Explosion Units',
  head:[
    ['link',{
      rel:'icon',
      href:'/logo.png'
    }]
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-145633929-2'
      }
    ]
  ],
  description:'vue, React, css, html, web, frontend, node.js, npm, 資料結構, 演算法, D3.js',
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
        'leetcode0026-remove-duplicates-from-sorted-array',
        'leetcode0027-remove-element',
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
        'shadow',
        'units'
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
        'request',
        'seo'
      ],
      '/DataStructure/':[
        '',
        'dynamic-programming',
        'linked-list',
        'set',
        'dictionary',
        'hashMap'
      ],
      '/D3/':[
        '',
        'd30-base-comment',
        'd31-add-document',
        'd32-talk-about-svg',
        'd33-change-color-and-label',
        'd34-create-another-fig'
      ],
    },
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    sidebarDepth:1,
    logo:'/logo.png'
  }
}
