# Basic Node and Express

## Meet the node console
### 首先我們先在myApp.js中，設定一個console.log
```javascript
var express = require('express');
var app = express();

/** 1) Meet the node console. */
console.log('Hello World')

module.exports = app;

```
## Start a Working Express Server
### 在這邊,我們試著打出req,接收res
```javascript
var express = require('express');
var app = express();

/** 2) A first working Express Server */
// 這邊的app.xxx,是HTTP的Method
app.get("/", function(req, res) {
// 取得回應,則response回應給client端
    res.send('Hello Express');
 });
 // 監聽3001 port,console.log主要印在server端
app.listen(3001, function() {
    console.log('Listening on port 3000');
});

module.exports = app;
```

## Serve an HTML File
### 在這篇我們將會了解如何去發送一個request 並render一個index.html
#### __dirname 為node的global變數,它是用來計算node的路徑的方式
```javascript
var express = require('express');
var app = express();
/** 3) Serve an HTML file */
// 同樣地,我們監聽'/'這個port號
app.get('/',function(req,res){
    // response時,這次變成sendFile,index.html
    // __dirname 是你這台電腦的絕對路徑
    res.sendFile(__dirname+'/views/index.html')
})
module.exports = app;
```

## Serve Static Assets
### 從serve渲染出一些靜態資源(style/scripts/images)
1. 在這邊我們主要使用app.use來得到靜態資源
2. sendFile & static 的參數相同,都是接上絕對路徑
```javascript
/** 4) Serve static assets  */

app.use(express.static(__dirname +  '/public'))

```

## Serve JSON on a Specific Route
### 再來我們開始建造一個簡單的API
```javascript
/** 5) serve JSON on a specific route */
// 這邊一樣，在get後接上網址，然後res.json回應成功訊息(json)回去
// get方法主要是獲取資料
app.get('/json',function(req,res){
    res.json({"message": "Hello json"})
})
```

## Use the .env File
### 這個.env主要是存取機敏資料（例如帳號密碼）
#### 1. 為了方便了解，在這個部分`node.js`均採用全大寫機制
#### 2. 首先需要安裝`dotenv`這個套件
#### 3. 再來新增一個.env file（在你的目錄底下，跟myapp.js同一層）
```
// .env file
MESSAGE_STYLE=uppercase
```
```javascript
/** 6) Use the .env file to configure the app */
app.get('/json',function(req,res){
 if(process.env.MESSAGE_STYLE === 'uppercase'){
  res.json({"message": "HELLO JSON"})
 }else{
  res.json({"message": "Hello json"})
 }
})
```

## Implement a Root-Level Request Logger Middleware
### 在post之前，增加一個middleware（守衛的概念）
#### 1. 主要使用app.use
#### 2. 然後在callback中的function有三個參數
#### 3. 其中第三個為`next`，因為任一個請求，會先跑到這邊，然後我們必須讓執行緒往下跑，所以要加一個next
```javascript
// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next){
    // 這邊的req.method會顯現你的http method。path：會顯示請求的路徑。最後是請求的ip
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
})
```
