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

### Callback Queue 
* 一種資料結構
* 先進先出的概念
* 在結構的前端進行刪除，在結構的後端進行插入
* 沒有元素時稱為空陣列

## Event Loop
在JS中，任務被分為兩種
* 一種是宏任務（MacroTask）
* 一種是微任務（MicroTask）

### MacroTask
* script 全部代碼
* setTimeout、setInterval、setImmediate
* I/O
* UI Rendeting

### MicroTask
* Process.nextTick（Node.js）
* Promise
* Object.observe（廢棄）
* MutationObserver

## 瀏覽器中的Event Loop
JS 有一個 `main thread`主線程 & `call-stack`調用執行線。所有的任務都會被放到調用執行線等待主線程執行

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

### JS 調用線
JS調用線為後進先出（Stack）的規則，當函數執行時，會被添加到線的頂部，當執行線執行完成後，就會從頂部移出，直到線內被清空

### 同步非同步任務
* 同步任務會在調用線中按照順序等待主線程依序執行
* 非同步任務會在非同步任務有結果後，將註冊的回調函數放入任務陣列中等待主線程空閒（調用線被清空時），讀取到線內等待主線程執行

### Event Loop 進程
1. 「執行線」執行完同步任務後，會去看執行線是否為空
2. 如果執行線為空，會去檢查微任務（Callback Queue）是否為空
    * 為空：執行宏任務
    * 不為空：執行微任務（Callback Queue）
3. 每次單個宏任務執行完畢後，檢查微任務（Callback Queue）隊列是否為空，不為空則依「先入先出」規則做
4. 設置微任務隊（Callback Queue）為 null，然後執行宏任務，如此循環

### 進入microTask檢查點時，用戶代理會執行以下步驟
* 設置 microTask 檢查點標誌為true
* 當事件循環 microtask 執行不為空時：選擇一個最先進入microtask陣列的 microtask。將事件循環
microtask設置為以選擇的 microtask，運行此microtask，將已經執行完的microtask為null，移除此microtask
* 清除 indexDB 事務
* 設置進入 microtask 檢查點的標誌為 false

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
