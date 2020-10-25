---
{
  "title": "關於AJAX與那些前端的request方法",
  "lang": "zH",
  "description": "在這篇，我們可以會講解關於AJAX與那些前端的request方法",
  "meta": [{"name":"keywords", "content":"javascript ajax, ajax"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# 關於AJAX與那些前端的request方法
![AJAX](https://miro.medium.com/max/1400/1*n2NLoddl8yzr8usaOk8juA.jpeg)
::: tip
關於AJAX：Asynchronous JavaScript And XML。重點在於Asynchronous非同步的這個單字。
:::
#### 想當初在家自己看JS時，看到AJAX真的完全疑惑，不知道在幹嘛，也完全不知道它的用途，但其實你只要把他想成「我要跟後端要東西要資料的橋樑」這樣應該就比較好懂了。
#### 實例：我今天想要跟後端拿資料，要怎麼拿？就是利用AJAX這個「方法」來「請求」後端跟他拿資料。
而這個方法又分為好幾種
* XMLHttpRequest
* jQuery ajax
* fetch
* axios
## XMLHttpRequest
最基本最原生的JS請求方法
```javascript
// 要使用，要先new一個XHR的物件
var request = new XMLHttpRequest()
// 然後定義連線方式(get / post ...)
request.open('get',"http://www.example.org/example.txt")
// 發送請求
request.send()
// 如果成功就doSuccessFunc()
request.onload = doSuccessFunc
// 如果失敗就doFalseFunc()
request.onerror = reqError;
```
關於一些文章是指出，假設今天有多個請求，並且有先後關係，就會出現一個回調地獄的狀況，所以才衍生出jQuery的 Ajax封裝。
## jQuery
```javascript
$.ajax({
  methods:'get',
  
  url:'https://www.example.org/example.txt',
  
  dataType:'json', //xml, html, script, json, jsonp, text
  
  success: function(data){
    console.log(data)
  },
})
```
然而在現代前端框架的興起下，jQuery逐漸式微，式微原因有
* 本身是對MVC的編成，不符合現在前端MVVM的浪潮
* 基於原生的XHR開發，XHR本身的架構不清晰，現在已經有了fetch的替代方案。
* jQuery的整個項目太大，單純使用ajax卻要引入整個jQuery不合理
* 不符合關注點分離原則
* 配置與調用方式混亂，而且基於事件的異步模型不友好
## Fetch
fetch API提供了一個JS的接口，用來訪問和操縱HTTP管道的部分，例如請求和響應。他還提供了一個全局fetch()方法，該方法提供了一個簡單，合理的方式來跨網路異步獲取資源。而fetch和jQuery的主要有兩種方式不同。
* 當接收到一個代表錯誤的HTTP狀態碼時，從fetch()返回的Promise不會被標記為reject（即使響應狀態是404 or 500），fetch會將這兩種狀態標記為resolve（但是會將resolve返回的值設定為false），只有當網路故障or請求被阻止時，才會標記為reject
* 默認情況下，fetch不會從服務端發送或接收任何cookies，如果站點依賴於用戶的session，則會導致未經認證的請求（要發送cookies，必須設置credentials選項）
```javascript
fetch('http://example.com/movies.json')
  .then(function(res){ //一樣有then
    console.log(res)
  })
  .catch(function(error){
    console.log(error)
  })
```
or接受第二個參數
註：
* credentials：是否要帶上cookie。（是則include）
```javascript

// fetch 可以接受第二個可選參數，一個可以控制不同配置的init物件
postFunc('http://example.com/movies.json',{ans:52})
  .then(function(res){ //一樣有then
    console.log(res)
  })
  .catch(function(error){
    console.log(error)
  })
function postFunc(url,data){
  return fetch(url,{
    body:JSON.stringify(data),
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    header:{
      'user-agent':'Mozilla/4.0 MDN Exam',
      'content-type':'application/json'
    },
    method:'POST', // GET/POST/PUT/DELETE
    mode: 'cors', // no-cors, cors, * same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  })
  .then(res => res.json())
}
```
優點：
* 語法簡潔，更加語意化
* 基於標準Promise實現，支持async / await
* 更加底層，提供API豐富
* 脫離XHR，並且是ES規範的實現方式。
並且fetch在前端的應用上有一項強於XHR的能力：跨域處理
```javascript
fetch('/user.json',{
  method: 'post',
  mode: 'no-cors',
  data:{}
}).then(function(){})
```
這樣在之後會得到一個type為opaque的返回。而這個請求是真正抵達過後臺的，所以我們可以使用這種方法來進行訊息上報。
## Axios
Axios本質上是對XHR的封裝，只不過他是Promise的實現版本，可以用在瀏覽器和node.js中，符合最新的ES規範，首先看個Code
```javascript
// 為ID的user創建請求,Demo1
axios.get('/user?ID=12345') // 也可將get 改為 post
  .then(function(res){
      console.log(res)
  }).catch(function(err){
      console.log(err)
  })
// 為ID的user創建請求,Demo2  
axios.get('/user',{  // 也可將get 改為 post
    params:{
      ID:12345
    }
  }).then(function(res){
    console.log(res)
  }).catch(function(err){
    console.log(err)
  })
```
#### 併發請求
```javascript
function getUserAcoount(){
  return axios.get('/user/12345')
}
function getUsePromise(){
  return axios.get('/user/12345/permission')
}
// 如同 Promise使用All，然後也是傳入陣列
axios.all([getUserAcoount(),getUsePromise()])
  .then(axios.spread(function(acct,perms){
    console.log(acct)
}))
```
優點：
* 從瀏覽器創建XMLHttpRequests
* 從node.js 創建 http請求
* 支持 Promise API
* 攔截請求和響應
* 轉換請求數據和響應數據
* 取消請求
* 自動轉換JSON數據
* 客戶端支持防禦XSRF（原理是將你的每個請求都帶一個從Cookie拿到的key，並且根據同源政策，假冒的網站無法拿到你cookie的key，因此後台即可判斷）

## 參考文章
* [Ajax, jQuery, ajax, axios和fetch介紹、區別以及優缺點](https://www.twblogs.net/a/5d5f0b8ebd9eee5327fde290)
* [前端request的幾種方法](https://medium.com/dot-js/%E7%94%B1%E5%89%8D%E7%AB%AFrequest-%E7%9A%84%E5%B9%BE%E7%A8%AE%E6%96%B9%E6%B3%95-fbf8a0b4023a)
