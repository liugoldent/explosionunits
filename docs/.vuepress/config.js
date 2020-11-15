const fs = require("fs");
const path = require("path");

function getSideBar(folder, title) {
  const extension = [".md"];

  const files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
        extension.includes(path.extname(item))
    );
  return ["", ...files];
}
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
      '/JavaScript/':getSideBar('JavaScript','JavaScript'),
      '/Vue2/':getSideBar('Vue2','Vue2'),
      '/LeetCode/':getSideBar('LeetCode','LeetCode'),
      '/CSS/':getSideBar('CSS','CSS'),
      '/React/':getSideBar('React','React'),
      '/NodeAndNpm/':getSideBar('NodeAndNpm','NodeAndNpm'),
      '/Web/':getSideBar('Web','Web'),
      '/DataStructure/':getSideBar('DataStructure','DataStructure'),
      '/D3/':getSideBar('D3','D3'),
      '/DesignPattern/':getSideBar('DesignPattern','DesignPattern'),
      '/TypeScript/':getSideBar('TypeScript','TypeScript'),
      '/other/':getSideBar('other','other'),
      '/Vue3/':getSideBar('Vue3','Vue3'),
      '/webpack/':getSideBar('webpack','webpack'),
    },
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    sidebarDepth:1,
    logo:'/logo.png'
  }
}
