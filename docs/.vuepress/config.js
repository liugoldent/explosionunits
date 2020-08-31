module.exports = {
  title: 'Explosion Units',
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
        'life-circle'
      ],
      '/LeetCode/':[
        '',
        'two-sum',
        'add-two-numbers'
      ],
      '/CSS/':[
        '',
        'flex'
      ],
      '/React/':[
        '',
        'Lesson1'
      ]
    },
    themeConfig: {
      lastUpdated: 'Last Updated', // string | boolean
    }
  }
}
