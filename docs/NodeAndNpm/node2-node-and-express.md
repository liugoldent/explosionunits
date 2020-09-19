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
:::tip
要使用process之前，要加入`require('dotenv').config()`
才可以使用process
:::
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

## Chain Middleware to Create a Time Server
### 鏈結起middleware & 創造一個time server
```javascript
/** 8) Chaining middleware. A Time server */
    // 同樣地，我們也給一個/now，來創造一個請求
   app.get('/now', function(req,res,next){
    req.time = new Date().toString()
    next()
    // 在next後，繼續執行下面的function
   }, function(req,res){
    // 這個繼續執行的function所要做的事情為：
    res.send({"time": req.time})
   })
``` 
## Get Route Parameter Input from the Client
### 得到使用者輸入的router的參數
```javascript
// 使用狀況：有時候，我們會想要得到使用者所輸入的參數，來打API（例如Restful API的狀況）
/** 9)  Get input from client - Route parameters */
// 在這邊的testNum，我們的express會將其認為變數，這個變數會被存到req.params.xxx（同名）
// 假設route是： /123/echo
app.get('/:testNum/echo',function(req,res){
 res.json({'echo': req.params.testNum})
})
// 輸出則為 'echo' : 123
```

## Get Query Parameter Input from the Client
### 另一個得到使用者輸入的方法是使用Query
```javascript
/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
// 假設我們的router是這樣：http://localhost:3000/name?first=Guan&last=Ting
app.get('/name',function(req,res,next){
     console.log(req.query)
     res.json({ 'name' : `${req.query.first} ${req.query.last}`})
})
// 輸出則：name: "Guan Ting"
// ${req.query.first} 會對應到「?」後面的first=多少（同理last也是）
```

## Use body-parser to Parse POST Requests
### 此小章節主要介紹：body-parser
這個中間件，基本上作用是對POST請求的請求體去做解析
### body-parser作用
#### 1. 處理不同類型的請求體：`text`、`json`
#### 2. 處理不同編碼：`utf8`、`gbk`
#### 3. 處理不同的壓縮類型：`gzip`、`deflare`
#### 4. 處理邊界、異常處理
```javascript
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
require('dotenv').config()

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}))
```

## Get Data from POST Requests
### 試著接收post來的資料（注意post適用req.body取資料）
#### 介紹剩餘的http方法
#### 1. GET：讀取一個已經存在的資料（沒有修改）
#### 2. POST：新增一筆資料，有可能是使用者所輸入的或是使用者的request
#### 3. PUT or PATCH：修改資料
#### 4. DELETE：刪除資料

```javascript
/** 12) Get data form POST  */
app.post('/name',function(req,res,next){
 let name = `${req.body.first} ${req.body.last}`
 res.json({'name':name})
})
```

