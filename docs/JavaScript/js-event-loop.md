---
{
  "title": "JS Event Loop",
  "lang": "zH",
  "description": "在這篇，我們來看看JS的事件循環",
  "meta": [{"name":"keywords", "content":"js event loop, js 事件循環"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS Event Loop

## 為何要弄懂 Event Loop
* 掌握底層原理，可以讓自己以不變應萬變
* 增加深度，了解JS運行機制

## Stack、Queue、Heap
### 堆 Heap
堆為一種數據結構，利用而二元樹所獲得的一種數據結構。一種為最小堆，另一種為最大堆

### 堆疊 Stack
#### Call Stack
* 一種資料結構
* 後進先出的概念
* 只能在最尾端插入後刪除的線性表

### Callback Queue or Event Queue 
* 一種資料結構
* 先進先出的概念
* 在結構的前端進行刪除，在結構的後端進行插入
* 沒有元素時稱為空陣列

## Event Loop
在JS中，任務被分為兩種
* 一種是宏任務（MacroTask）
* 一種是微任務（MicroTask）
**不管宏任務or微任務都是進入 Event Queue**

### MacroTask
* script 全部代碼
* setTimeout、setInterval、setImmediate
* I/O
* UI Rendeting
* MessageChannel
* postMessage

### MicroTask
* Process.nextTick（Node.js）
* Promise
* Object.observe（廢棄）
* MutationObserver

## Promise的思考
### 思考等效程式
#### 原程式
```javascript
async function f() {
  await p
  console.log('ok')
}
```
#### 類等效程式
```javascript

function f() {
  return RESOLVE(p).then(() => {
    console.log('ok')
  })
}
```

## JS 調用線怎麼走的
JS調用執行線為後進先出（Stack）的規則，當函數執行時，會被添加到線的頂部，當調用執行線執行完成後，就會從頂部移出，直到線內被清空

### Event Loop 進程
1. 「調用執行線」執行完同步任務後，會去看調用執行線是否為空
2. 如果調用執行線為空，會去檢查微任務是否為空
    * 為空：執行宏任務
    * 不為空：執行微任務
3. 每次單個宏任務執行完畢後，檢查微任務（Callback Queue）隊列是否為空，不為空則依「先入先出」規則做
4. 設置微任務隊（Callback Queue）為 null，然後執行宏任務，如此循環

### 進入微任務microTask檢查點時，用戶代理會執行以下步驟
* 設置 microTask 檢查點標誌為true
* 當事件循環 microtask 執行不為空時：選擇一個最先進入microtask陣列的 microtask。將事件循環
microtask設置為以選擇的 microtask，運行此microtask，將已經執行完的microtask為null，移除此microtask
* 清除 indexDB 事務
* 設置進入 microtask 檢查點的標誌為 false

## 分析原則
1. 遇到 `new Promise` 是直接執行其任務
2. `new Promise` 接的 `then` 是微任務
3. `await` 會等到 `async` 內的事情都做完才往下做同個`function`內的事情
4. `await function` 會去驅動這個 function，function 做完，再往同層的同步走下去
5. 下面這串算同步指令
```javascript
await new Promise((res){
    console.log('1')
})
```
6. `async` 回傳 `Promise` & `async` 中的`return` 會被當作 `resolve value`

## 分析Event Loop
1. 不同類型的任務會進入到對應的Event Queue
    * setTimeout or setInterval 會進入宏任務的Event Queue
    * Promise or process.nextTick會進入微任務的Event Queue
2. 遇到 `promise.then` 之類的微任務，會讓這個微任務被安排在當前的宏任務中
3. 當執行完一輪的同步+非同步腳本後，就往下一輪邁進

## 例子一
### code
```javascript
// 上面的
setTimeout(()=>{
  console.log('timer1')
  Promise.resolve().then(()=>{
    console.log('promise1')
  })
})

// 下面的
setTimeout(()=>{
  console.log('timer2')
  Promise.resolve().then(()=>{
    console.log('promise2')
  })
})
```
### 分析
1. 兩個 setTimeout 都進入 macroTask
2. stack 為空
3. 「上面的setTimeout」進入stack，開始執行
4. 執行到Promise.resolve，將Promise，丟入 microTask
5. 「上面的setTimeout」執行完，由於「上面的Promise.resolve」先入先出
6. 所以執行「上面的Promise.resolve」
7. 所以先`console.log('promise1')` 出來
![eventloop demo1](https://user-gold-cdn.xitu.io/2019/1/18/16860ae5ad02f993?imageslim)

## 例子二
### code
```javascript
console.log('hi')

setTimeout(function () {
  console.log('there')
}, 0)

console.log('JSConfEU')
```
### 分析
1. 第一個`console.log('h1')`沒問題
2. setTimeout 會被丟進 Callback Queue
3. `console.log('JSConfEU')` 先執行
4. 最後執行 setTimeout

## 參考資料
#### 1. [【筆記】到底 Event Loop 關我啥事？](https://medium.com/infinitegamer/why-event-loop-exist-e8ac9d287044)
#### 2. [一次弄懂Event Loop](https://juejin.im/post/6844903764202094606)
#### 3. [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
