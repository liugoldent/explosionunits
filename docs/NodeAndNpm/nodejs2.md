---
{
  "title": "Node.js Lesson2",
  "lang": "zH",
  "description": "Node.js 介紹",
  "meta": [{"name":"keywords", "content":"node.js"}],
  "tags": ['node.js'],
  "sidebarDepth": "2"
}
---
# 套件使用
## middleware
屬於中介軟體，在node.js中
**middleware為所謂的中介器**意思就是當我們要進入某一個router時，不會馬上進去，
而是先進入我們設定的middleware執行完再回傳我們裡面所設定的動作，最後才真正進去路由執行

### 解析器body-parser
body-parser是一個HTTP請求解析的中介軟體，使用這個插件可以解析JSON、Raw、text、XML、URL-encoded的請求
1. 安裝body-parser
```
npm i body-parser
```
2. 使用body-parser：在express中加入這個項目app.use
```javascript
import express from "express";
import config from "./config";
import index from "../server/routes/index.route";
import bodyParsor from "body-parser";
const app = express();

/* GET home page. */
app.use(bodyParsor.json())
app.use(bodyParsor.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send(
    `server started on  port http://127.0.0.1:${config.port} (${config.env})`
  );
});

app.use("/api", index);

export default app;

```

### CORS
當user agent請求一個不是目前文件來源：來自不同網域（domain）、通訊協定（protocol）、port的資源時，會建立一個跨來源的HTTP請求，
所以這時我們在fetch or ajax存取API時會發現錯誤，就是你沒在標頭設定跨網域存取權限，在這邊使用cors來快速建立讀取權限
1. 安裝
```
npm i cors
```
2. 使用：在express.js中加入程式碼
```javascript
import cors from 'cors'

app.use(cors())
```

### 連線存取紀錄 morgan
morgan是一個HTTP request logger也就是在存取API時，終端機會顯示是200 or 400的狀態碼
1. 安裝
```
npm i morgan
```
2. 使用
```javascript
import morgan from 'morgan'

app.use(morgan('dev'))
```

## joi & config dotenv
設定joi & config的環境
### dotenv
dotenv是將`.env`文件中的環境參數加到process.env檔案。
而由其他文件去引入`require('dotenv').config()`。
再來只要呼叫`PROCESS.ENV.[變數名稱]`就可以將環境變數撈出來了。
**注意.env不會被上傳到github上**
1. 安裝
```
npm i dotenv
```
2. 使用
在根目錄下直接加一個`.example.env`檔案
```
PORT=3000
NODE_ENV=development
VERSION=1.0.0
```

### joi
類似一個驗證器，可以自己規範好schema來限制資料格式，有點像是正規表達式。
例如port只允許輸入數字，若輸入字串就會被阻擋`PORT:Joi.numver()`，這樣好處是如果使用者不按規定輸入數值，就可以在middle擋住他
1. 安裝
```
npm i joi
```
2. 使用：修改config.js檔案
```javascript
 import Joi from 'joi';

 // require and configure dotenv, will load vars in .env in PROCESS.ENV
 require('dotenv').config();

 // 建立每個變數 joi 驗證規則
 const envVarSchema = Joi.object().keys({
    // 注意大概就是，Joi+型態?+預設值
    // 然後會直接對應到.env內的設定值
   NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
   PORT: Joi.number().default(8080), // 數字且預設值為 8080
   VERSION: Joi.string() // 字串
 }).unknown().required();

 // process.env 撈取 .env 內的變數做 joi 驗證
 const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

 if (error) {
   throw new Error(`Config validation error: ${error.message}`);
 }

 const config = {
   version: envVars.VERSION, // 版本
   env: envVars.NODE_ENV,  // 開發模式
   port: envVars.PORT  // 阜號
 };

 export default config;  // 匯出共用
```

## mySql
測試連線mySql
1. 安裝
```
npm i mysql
```

2. 修改index.route.js
```javascript
import express from 'express';
import mysql from 'mysql';

import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

/* mysql連線測試 */
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({ // 建立一個連線池
    connectionLimit: 10, // 限制池子連線人數
    host: config.mysqlHost, // 主機名稱
    user: config.mysqlUserName, // 用戶名稱 
    password: config.mysqlPass, // 資料庫密碼
    database: config.mysqlDatabase // 資料庫名稱
  });
  connectionPool.getConnection((err, connection) => { //建立一個連線若錯誤回傳err
    if (err) {
      res.send(err);
      console.log('連線失敗！');
    } else {
      res.send('連線成功！');
      console.log(connection);
    }
  });
});

export default router;
```

## bcrypt 加密
bcrypt 能夠將一個字串作雜湊加密，其中有個參數叫`saltRounds`，
可以打亂原始的字串符，使其生成的散列結果產生變化，其參數越高越安全，但相對的加密時間就越長
1. 安裝
```
npm i bcrypt
```
2. 使用方法
*. saltRounds：整數型態，數值越高越安全
*. myPassword：要加密的字串
*. testPassword：測試驗證密碼的變數
*. myHash：myPassword加密後的結果
```javascript
const bcrypt = require('bcrypt');
  
  const saltRounds = 10;
  const myPassword = 'password1';
  const testPassword = 'password2';
  const myHash ='$2a$10$fok18OT0R/cWoR0a.VsjjuuYZV.XrfdYd5CpDWrYkhi1F0i8ABp6e'; // myPassword加密後結果(驗證用)
```

3. 非同步寫法
```javascript
  // 加密
  bcrypt.hash(myPassword, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    console.log(hash);
  });

  // 驗證密碼
  bcrypt.compare(myPassword, myHash).then(function (res) {
    console.log(res); // true
  });
  bcrypt.compare(testPassword, myHash).then(function (res) {
    console.log(res); // false
  });
```
4. 同步寫法
```javascript
// 加密
  const hash = bcrypt.hashSync(myPassword, saltRounds);
  console.log(hash);

  // 驗證密碼
  console.log(bcrypt.compareSync(myPassword, myHash)); // true
  console.log(bcrypt.compareSync(testPassword, myHash)); // false
```

5. 解析加密字串
```
$2b$（Bcrypt） 
10（Round）
$x.Qnwx1XfrI4rggscZZTCu（Salt）
vUG8MYlVVOiu7vbPo90zTpeK5SgbtDm（Hash）
```
* Bcrypt
    * 該字串為UTF-8編碼，並且包含一個終止符
* Round
    * 每增加一次就加倍雜湊次數，預設10次
* Salt
    * 128bits 22個字元
* Hash
    * 138bits 31個字元

## 得到HTTP status
1. 方法一：使用status()
```javascript
app.ger('/', (req,res)=>{
    res.status(202).send('Welcome')
})
```
2. 方法二
使用`http-status`
* 安裝
```
npm i http-status
```
* 使用
```javascript
app.get('/',(req,res)=>{
    res.status(httpStatus.BAD_GATEWAY).send('進入502 Bad Gateway')
})
```
