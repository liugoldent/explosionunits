---
{
  "title": "Webpack 基礎",
  "lang": "zH",
  "description": "此篇主要介紹 Webpack 基礎",
  "meta": [{"name":"keywords", "content":"Webpack 基礎"}],
  "tags": ['Webpack'],
  "sidebarDepth": "3"
}
---
# Webpack 基礎

## entry & output
#### 作用：entry > 告訴webpack進入點
#### 作用：output > 告訴webpack輸出點
#### * 注意 output會有兩種key
#### 1. filename：輸出名稱
#### 2. path：輸出路徑
```javascript
const path = require('path')

module.exports = {
  // entry 進入點（寫死路徑）
  entry: './index.js',
  // 打包輸出後的檔案
  output: {
    // 輸出的檔案名稱
    filename: "index.bundle.js",

    // 代表說，你輸出的檔案會到哪個位置
    // 下面的意思是說，會輸出到/dist 檔案夾下面
    path: path.resolve(__dirname, './dist'),
  }
}
```

## context
#### 作用：經由context 設定「前綴字」來找到進入點檔案
```javascript
const path = require('path')

module.exports = {
  // context 在進入點前加入前綴的位置
  context: path.resolve(__dirname, 'src'),
  // entry 進入點（對於有 context的幫助，entry：代表路徑為 /src/index.js）
  entry: './index.js',
  // ....下略
}
```

## output
### `name`
#### 作用：可以動態產生output後的檔案名稱（依靠著entry給的key）
```javascript
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    // 首先注意多個檔案是物件形式
    // key：輸出的檔案名稱，將會被[name]取代
    // value：一樣是檔案路徑
    index2: './index.js',
    introduce2: './introduce.js'
  },
  output: {
    // 輸出的檔案名稱，因為有[name]，變成是從 entry的地方動態生成
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, './dist'),
  }
}
```

### publicPath
#### 作用：此配置可以幫助我們在所有資源指定一個基礎路徑，他被稱為公共路徑。等於是從<br>
#### * `locelhost:8000` to `localhost:8000/outputdist/`
```javascript
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index2: './index.js',
    introduce2: './introduce.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, './dist'),
    // 這邊幫助public後的路徑增加一個前綴
    publicPath: "/outputDist/"
  }
}
``` 

## module
#### 作用：基礎的webpack只知道 `js` or `json` 兩種文件，要支持其他文件類型就要另外加上 `loader`
eg：es6 的 `babel-loader` or css 的 `css-loader`
### loaders
```javascript
module.exports = {
  module:{
    rules:[
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader' // 使用 babel-loader（記得要先安裝），然後也要先設定.babelrc文件
        }],
        exclude: /node_modules/, // 排除所有符合條件的模塊：node_module
        include: [resolve('src'), resolve('test')] // 引入所有符合條件的 js檔案
      },
      {
        test: /.css$/,
        use:[
            'style-loader',
            'css-loader'
        ]   
      },
      {
        test: /.(jpg|png|gif|jpeg)$/,
        use: [{
          loader:'url-loader',
          options: {
            limit:160000, // 意思是說，如果圖片小於這個值，就會被轉成base64
            // [name]：文件檔名
            // [hash]：文件編譯對象的hash值（無論文件是否有異動，都會重新帶入新的hah值）
            // [ext]：文件副檔名
            // [path]：文件路徑
            // [chunkhash]：若chunk內容無變動，則hash就不會改變
            name: 'imgs/[name].[hash].[ext]' 
          }
        }]
      }
    ]
  }
}
```
## resolve
### alias
#### 允許我們在import文件時，直接用別名載入
```javascript
// webpack.config.js
module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```
```javascript
// 不必寫：import Utility from '../../utilities/utility';
import Utility from 'Utilities/utility';

// 全域下src變為@ ， 再把../取代為@
// 不必寫：import rootReducer from '../reducers';
import rootReducer from '@/reducers';
```

### extension
#### 可以讓我們在import模組時，不用寫副檔名
```javascript
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
    },
}
```
```javascript
// home.vue
import Home from './home'
```

## 參考資料
#### 1. [頁面緩存設定](https://ithelp.ithome.com.tw/articles/10200454)
#### 2. [Webpack 學習筆記（Webpack Note）](https://pjchender.github.io/2018/05/17/webpack-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98%EF%BC%88webpack-note%EF%BC%89/)
