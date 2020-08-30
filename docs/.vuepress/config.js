module.exports = {
  title: 'Explosion Units',
  markdown: {
    lineNumbers: true
  },
  themeConfig:{
    nav:[
      { text:'Vue', link:'/Vue/'},
      { text:'CSS', link:'/CSS/'},
      { text:'LeetCode', link:'/LeetCode/'}
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
      ]
    },
    themeConfig: {
      lastUpdated: 'Last Updated', // string | boolean
    }
  }
}
