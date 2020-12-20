---
{
  "title": "Node.js Lesson1",
  "lang": "zH",
  "description": "Node.js 介紹",
  "meta": [{"name":"keywords", "content":"node.js"}],
  "tags": ['node.js']
}
---
# Node.js Lesson1
## HTTP Request 方法
* GET
    * 取得資料，不會動到內部資源
* HEAD
    * HEAD 跟 GET 方法類似，只差別在它不會回傳我們所請求的資源在body上，只回傳HTTP header
* POST
    * 向指定的資源提交資料
* PUT
    * 向指定資源位置提交更新內容
* DELETE
    * 向指定資源請求刪除內容
* CONNECT
    * HTTP/1.1協議中預留給能夠將連接改為管道方式的代理服務器
* OPTIONS
    * 可使server傳回該資源所支持的所有HTTP請求方法
* TRACE
    * 回顯服務器收到的請求，主要用於測試or診斷
    
    
## MVC架構
* Model：後端資料庫運行
* View：前端畫面與邏輯顯示
* Controller：處理控制流程和回應，以路由傳遞資料為主
### 優點
1. 利於團隊開發
2. 程式方便管理
3. 擴充性高
4. 結構直覺
5. 可讀性高
### 參考
[[Day-7] RESTful API與MVC名詞介紹](https://ithelp.ithome.com.tw/articles/10191925)

## webpack Node.js
### install
1. 安裝（記得要安裝@babel/core & @babel/preset-env）
```npm
npm i -D webpack webpack-node-externals

npm i -D babel-preset-env babel-plugin-transform-object-rest-spread babel-core babel-loader

npm i -D @babel/core @babel/preset-env
```
### webpack set
```javascript
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  // 進入點
  entry: {
    'index': './src/index.js',
  },
  // 輸出點
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {   //設定你的檔案選項
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
}
```

## nodemon
### 目的
解決一直修改程式需要一直重啟server的困難
* 自動重啟應用程式
* 持續偵測預設程式
* 可忽略特定文件or目錄
* 觀察指定的目錄資料夾
* 與服務器應用程式or一次運行公用程序和REPLs一起使用
* 可在node被存取使用
* open Sourcee

### 使用 
```npm
npm i nodemon

nodemon index.js
// 就會去監聽index.js了
```

## HTTP status Code
* 1xx 資訊回應
* 2xx 成功回應
* 3xx 重定向訊息
* 4xx 用戶端錯誤回應
* 5xx 伺服器錯誤回應

## Express 基本架構
[[Day-16] 使用Express建立路由](https://ithelp.ithome.com.tw/articles/10194017)
### 結構
```
src
┌── config
│   ├── config.js  // 全域變數
│   └── express.js  // express與其他middleware設定
├── server
│   ├── controllers  // 處理控制流程和回應
│   ├── helper  // 處理例外Error
│   ├── modules // 後端資料庫進行運作
│   └── routes  // 各路徑的設定點
│       └── index.route.js  // 主路由
│
└── index.js  // 程式進入點
```
### config.js
全域變數檔
```javascript
const config = {
  version: '1.0.0',
  env: 'development',
  port: '3000'
};

export default config;
```

###  express.js
* app.get()，產生並使用get請求方式
* app.use()，宣告一個路由，變數index為引入routers資料夾內的index.route檔案，該路徑詳細內容在該文件中編輯
```javascript
    import express from 'express';
    import config from './config';
    import index from '../server/routes/index.route'; // 路徑

    const app = express();

    /* GET home page. */
    app.get('/', (req, res) => {
      res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
    });

    // 引入index.route的api
    app.use('/api', index);

    export default app;
```

### index.router.js
* 因為是app.use後進來的，所以基本上在這邊的路由都會加上/api前贅字
```javascript
import express from 'express';
import config from './../../config/config';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

export default router;
```

### index.js 
進入點
```javascript
import config from './config/config';
import app from './config/express';

if (!module.parent) {
 // 監聽config.port號
 app.listen(config.port, () => {
   console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
 });
}

export default app;
```
