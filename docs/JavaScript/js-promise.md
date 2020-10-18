---
{
  "title": "JS promise",
  "lang": "zH",
  "description": "在這篇，我們來看看promise到底怎麼使用與其想要解決什麼問題",
  "meta": [{"name":"keywords", "content":"js promise,promise,callback,promise,async await"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS Promise
:::tip
1. promise 為一個非同步的解決方案
2. promise 是一個對象，它可以獲得非同步操作的信息
3. promise 有三種狀態，pending（等待）、fulfilled（成功）、rejected（失敗）
4. 狀態一但改變，就不會再變
:::

## 何謂 promise ? 用來做什麼事 ?
### 過往的Callback
```javascript
// 這邊fn2 只是一層的回調函數
function fn1(a, fn2){
    if(a>10 && typeof fn2 === 'function'){
        fn2()
    }
}

// 在這邊只有一層的callback function
fn1(11, function(){
    console.log('this is a callback')
})
```
今天假設有非常多層的callback function，就會造成回調地獄的產生，所以promise就應運而生登場了

### promise 解決的問題
* 回調地獄：解決常常第一個函數輸出，但卻是第二個函數輸入的這種現象
* promise 可以支援多得並發請求，獲取並發請求的數據
* promise 可以解決非同步的問題，但本身不能說promise是非同步的

## es6 promise用法大全
promise 是一個構造函數，其本身有 `all`、`reject`、`resolve`這幾種方法，原型上有then、catch等方法。

-----------------------
### new 一個 promise
```javascript
let p = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        console.log('do Ok')
        resolve('Success')
    },2000)
})
```
:::tip
promise 的構造函數接收一個參數：函數。這個函數需要傳入兩個參數
1. resolve：操作執行成功後的回調函數
2. reject：操作執行失敗後的回調函數
:::

### then 鏈式操作
**promise的精髓是狀態，用維護狀態or傳遞狀態的方式來使得回調函數能及時被調用，他比callback函數要簡單、靈活**
```javascript
p.then((data)=>{
    console.log(data)
    // 記得要return 一個資料，才可以繼續往下跑
    return data
})
.then((data)=>{
    console.log(data)
})
.then((data)=>{
    console.log(data)
})
```

### reject的用法
如果我們設定為reject，那then也可以捕捉到
```javascript
let p = new Promise((resolve, reject) => {
	setTimeout(function () {
		var num = Math.ceil(Math.random() * 10) 
		if (num <= 5) {
            // 成功往下跑
			resolve(num)
		} else {
            // 失敗往下跑
			reject('数字太大了')
		}
	}, 100)
})
p.then((data) => {
		console.log('resolved', data)
        // 這邊記得要return data ，才會往下一個then跑
		return data
	},
	(err) => {
		console.log('rejected', err)
	})
    .then((data) => {
        console.log('1')
        console.log(data)
})
```
:::tip
在這邊我們看到then傳了兩個參數：
1. 第一個：為對應resolve的callback
2. 第二個：為對應reject的callback
:::

### catch的用法
promise除了then這個方法，還有catch這個方法，他主要來做reject後的回調
* 效果與then的第二個參數一樣。不過它還可以在執行resolve錯誤時，捕捉到這個錯誤
1. 基本用法
```javascript
p.then((data) => {
    console.log('resolved',data);
}).catch((err) => {
    console.log('rejected',err);
});
```
2. resolve時拋錯
```javascript
p.then((data) => {
    console.log('resolved',data);
    console.log(somedata); //此处的somedata未定义
})
.catch((err) => {
    // 這裡拋錯後，就不往下執行了
    console.log('rejected',err);
});
```

### Promise.all的使用
主要就是：all接收一組陣列的參數，裡面的值最終都返回promise物件
```javascript
let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then((data) =>{
    // 三個都成功時，做這邊
},(err)=>{
    // 其中一個失敗就走這邊
})
```

### Promise.race的使用
```javascript
 // 請求某個圖片支援
 function requestImg() {
 	var p = new Promise((resolve, reject) => {
 		var img = new Image();
 		img.onload = function () {
 			resolve(img);
 		}
 		img.src = '圖片的路徑';
 	});
 	return p;
 }
 //延时函数，用于给请求计时
 function timeout() {
 	var p = new Promise((resolve, reject) => {
 		setTimeout(() => {
 			reject('圖片請求超時');
 		}, 5000);
 	});
 	return p;
 }
 Promise.race([requestImg(), timeout()]).then((data) => {
    // 假設正常放入url，就可以成功
 	console.log(data);
 }).catch((err) => {
    // 如果超時了，就會走這邊（因為都被catch抓到錯誤）
 	console.log(err);
 });

```

## Promise 必知必會
### 題目1.promise的同步非同步 
```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
```
```
// 結果
1
2
4
3
```
原因：promise構造函數是同步執行，`promise.then`是非同步執行

### 題目2.promise的狀態
* promise有三種狀態：pending、fulfilled 或 rejected，一但狀態改變則不能再變
```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
``` 
```
// 結果
// 因為promise1還在等，所以是等待狀態
promise1 Promise { <pending> }
// 因為promise1還在等，所以是等待狀態
promise2 Promise { <pending> }
(node:50928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: error!!!
(node:50928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

// 因為promise1回來了，然後resolve，所以是成功狀態
promise1 Promise { 'success' }
// then後，又throw new Error，所以是rejected
promise2 Promise {
  <rejected> Error: error!!!
    at promise.then (...)
    at <anonymous> }
```

### 題目3.promise的調用次數
```javascript
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```
```
// 結果
then: success1
```
原因：promise結果只能被調用一次，多次調用沒有結果，另外狀態一經決定，則不再改變

### 題目4.promise的return 值
```javascript
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })
```
```
// 結果
1
2
```
原因：resolve自動傳進then讓其console.log，但then後要return，才可以到下一個then
:::tip
promise每次調用.then or .catch 都會返回一個新的promise
:::

### 題目5.promise決議後的調用
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})
```
```
once
success 1001
success 1001
```
原因：promise的.then or .catch可以被調用多次，但決議或是構造函數只會被調用一次！
也就是內部一得到一個值後，過後.then or .catch都可以直接獲得值

### 題目6.then接到Error的結果？
```javascript
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```
```
// 結果
then: Error: error!!!
    at Promise.resolve.then (...)
    at ...
```
原因：因為.then or .catch中 return 一個error物件，不會拋錯，所以不會被.catch捕獲。要解決就是改成下面的方案
```javascript
return Promise.reject(new Error('error!!!'))
// or
throw new Error('error!!!')

// 注意
return new Error('error')
// 等價於
return Promise.resolve(new Error('error!!!'))
```

### 題目7.Promise.then後的 return promise
```javascript
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
```
```
// 結果
TypeError: Chaining cycle detected for promise #<Promise>
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
    at Function.Module.runMain (module.js:667:11)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:607:3
```
原因：`.then` or `.catch`返回值不能是promise本身，否則會造成死循環

### 題目8.Promise.resolve(1)
```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```
```
// 結果
1
```
原因： `.then` or `.catch` 期望接收到的是函數，傳入非函數會產生值穿透的狀況

### 題目9.resolve.then拋錯?
```javascript
Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2: ', e)
  })
```
```
// 結果
fail2: Error: error
    at success (...)
    at ...
```
原因：`.then`可以接收兩個參數，第一個是成功、第二個是失敗。`.catch`是`.then`第二個參數的簡便寫法。
而`.then`的第二個參數無法接收成功函數拋出的錯誤，會直接跑到`.catch`內。

### 題目10.nextTick & setImmediate
```javascript
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
```
```
// 結果
end
nextTick
then
setImmediate
```
原因：process.nextTick & promise.then 都屬於 microtask，而setImmediate屬於macrotask。
事件循環的每個階段（macrotask）開始都會先執行（microtask）


## 參考資料
[Promise 原理讲解 && 实现一个 Promise 对象](https://juejin.im/post/5aa7868b6fb9a028dd4de672)
[Promise 必知必会](https://juejin.im/post/6844903509934997511)
[JS 原力覺醒 Day15 - Macrotask 與 MicroTask](https://ithelp.ithome.com.tw/articles/10222737)
