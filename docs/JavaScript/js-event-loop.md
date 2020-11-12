---
{
  "title": "JS 從Event Loop到Async Await",
  "lang": "zH",
  "description": "在這篇，我們來看看JS 從Event Loop到Async Await",
  "meta": [{"name":"keywords", "content":"js event loop, js 事件循環, async , await"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS 從Event Loop 到 Async Await

## JS 為何是單線程的
最初設計JS時，主要是用來驗證瀏覽器DOM元素的一個語言，如果js是多線程，那麼兩個線程同時對一個DOM元素會進行相互衝突的操作
這樣瀏覽器是無法執行的

## JS 為何需要非同步
如果JS沒有非同步，那麼程式由上而下執行，如果遇到上一行解析時間很長，那麼下面的代碼就會被阻塞。對用戶而言阻塞=卡死。就會有很糟的體驗

## JS 單線程是如何實現非同步的呢
JS 的非同步以及多線程都可以理解為一個假象。因為其實就是透過事件循環（Event Loop），去調配單一線程的執行順序。
所以理解Event Loop 就可以理解JS非同步的運行機制。

## 所以為何要弄懂 Event Loop
* 掌握底層原理，可以讓自己以不變應萬變
* 增加深度，了解JS運行機制
* 了解同步與非同步的跑法

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
### 別名
事件循環、Event Loop、運行機制 這三個術語是相同的東西

### 基本概念
1. 判斷JS的Code為同步還是非同步，同步進入主線程，非同步進入Event table
2. 非同步任務在Event table 註冊事件，滿足觸發條件後，推進入Event Queue
3. 同步任務一直執行，直到主線程空閒時，才會去Event Queue查看是否有可以執行的任務，如果有就讓Event Queue內的東西進入主線程中

### 任務種類
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

### 調用線怎麼走的
JS調用執行線為後進先出（Stack）的規則，當函數執行時，會被添加到線的頂部，當調用執行線執行完成後，就會從頂部移出，直到線內被清空

### Event Loop 進程
1. 「調用執行線」執行完同步任務後，會去看調用執行線是否為空
2. 如果調用執行線為空，會去檢查微任務是否為空
    * 為空：執行宏任務
    * 不為空：執行微任務
3. 每次單個宏任務執行完畢後，檢查微任務（Callback Queue）隊列是否為空，不為空則依「先入先出」規則做
4. 設置微任務隊（Callback Queue）為 null，然後執行宏任務，如此循環

### microTask 進程
* 設置 microTask 檢查點標誌為true
* 當事件循環 microtask 執行不為空時：選擇一個最先進入microtask陣列的 microtask。將事件循環
microtask設置為以選擇的 microtask，運行此microtask，將已經執行完的microtask為null，移除此microtask
* 清除 indexDB 事務
* 設置進入 microtask 檢查點的標誌為 false

### 分析Event Loop
1. 不同類型的任務會進入到對應的Event Queue
    * setTimeout or setInterval 會進入宏任務的Event Queue
    * Promise or process.nextTick會進入微任務的Event Queue
2. 遇到 `promise.then` 之類的微任務，會讓這個微任務被安排在當前的宏任務中
3. 當執行完一輪的同步+非同步腳本後，就往下一輪邁進


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

## async await 
### async/await 是什麼
我們創建了promise但不能同步等他執行完成。我們只能通過then傳一個callback function，這樣很容易再次陷入callback地獄。
所以實際上async/await 在底層轉換了Promise and then的回調函數。也就是Promise的語法糖
* async 是非同步的縮寫
* await 是等待非同步方法執行完成

### async/await 用來做啥
優化 promise的回調問題

### async/await 內部做了什麼
* async 返回一個Prromise物件，如果再函數中return 一個直接量，async 會把這個量通過Promise.resolve()封裝成Promise物件。
如果你返回Promise就以你返回的Promise為主
* await 是等待，等待運行的返回值。await 後面通常是一個Promise。但這不代表await 後面只能跟非同步操作

### await 等待機制
* 如果後面接了Promise，就會阻塞後面的代碼，等著Promise對象resolve，然後得到resolve值作為await 表達式的運算結果

### async/await 在什麼場景下使用
如果由多個Promise組成的then鏈時，就可以使用

### async/await 分析方向
1. async 定義的是一個Promise函數，和普通函數一樣只要不調用就不會進入事件陣列
2. async 內部如果沒有主動 return promise，那async 會把函數的返回值用Promise包裝
3. await 必須出現在async 函數內，await 不一定要跟一個非同步操作，也可以是一個普通表達式
4. 遇到 await 關鍵字，await 右邊的語句會立即被執行，然後await 下面的代碼進入等待狀態，等待結果
5. await 後面如果不是promise對象，await 會為阻塞後面的代碼，先執行async外面的同步代碼，同步執行完後，再回來async內部
，把這個非promise的東西，作為await 表達式的結果
6. await 後面如果是promise，await 也會暫停async 後面的code，先執行async 外面的代碼，等著Promise對象fulfilled，
然後把resolve的參數作為await表達式的運算結果

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
* 參考連結：[eventloop demo1](https://user-gold-cdn.xitu.io/2019/1/18/16860ae5ad02f993?imageslim)

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

## 例子三
### Code
```javascript
async function async1() {
  console.log('1')
  await new Promise((resolve) => {
    console.log('2')
    resolve()
  }).then(() => {
    console.log('3')
  })
  console.log('4')
}
async1()
```
### 分析
1. new Promise 的函數體是同步腳本所以先執行的是1、2。
2. 3和4都是微任務，這里因為有await，4要等Promise.then()之後才會執行。

## 例子四
### Code
```javascript
setTimeout(function () {
  console.log('6')
}, 0)
console.log('1')
async function async1() {
  console.log('2')
  await async2()
  console.log('5')
}
async function async2() {
  console.log('3')
}
async1()
console.log('4')
```
### 分析
1. 6是宏任務在下一輪事件循環執行
2. 先同步輸出1，然後調用了async1()，輸出2。
3. await async2() 會先運行async2()，5進入等待狀態。
4. 輸出3，這個時候先執行async函數外的同步代碼輸出4。
5. 最後await拿到等待的結果繼續往下執行輸出5。
6. 進入第二輪事件循環輸出6。
## 例子五
### Code
```javascript
console.log('1')
async function async1() {
  console.log('2')
  await 'await的结果'
  console.log('5')
}

async1()
console.log('3')

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('6')
})
```
### 分析
1. 首先輸出1，然後進入async1()函數，輸出2。
2. await後面雖然是一個直接量，但是還是會先執行async函數外的同步代碼。
3. 輸出3，進入Promise輸出4，then回調進入微任務隊列。
4. 現在同步代碼執行完了，回到async函數繼續執行輸出5。
5. 最後運行微任務輸出6。
## 例子六
### Code
```javascript
async function async1() {
  console.log('2')
  await async2()
  console.log('7')
}

async function async2() {
  console.log('3')
}

setTimeout(function () {
  console.log('8')
}, 0)

console.log('1')
async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('6')
})
console.log('5')
```
### 分析
1. 首先輸出同步代碼1，然後進入async1方法輸出2。
2. 因為遇到await所以先進入async2方法，後面的7被放入微任務隊列。
3. 在async2中輸出3，現在跳出async函數先執行外面的同步代碼。
4. 輸出4，5。then回調6進入微任務隊列。
5. 現在宏任務執行完了，微任務先入先執行輸出7、6。
6. 第二輪宏任務輸出8。

## 例子七
### Code
```javascript
setTimeout(function () {
  console.log('9')
}, 0)
console.log('1')
async function async1() {
  console.log('2')
  await async2()
  console.log('8')
}
async function async2() {
  return new Promise(function (resolve) {
    console.log('3')
    resolve()
  }).then(function () {
    console.log('6')
  })
}
async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('7')
})
console.log('5')
```
### 分析
1. 先輸出1，2，3。3後面的then進入微任務隊列。
2. 執行外面的同步代碼，輸出4，5。4後面的then進入微任務隊列。
3. 接下來執行微任務，因為3後面的then先進入，所以按序輸出6，7。
4. 下面回到async1函數，await關鍵字等到了結果繼續往下執行。
5. 輸出8，進行下一輪事件循環也就是宏任務二，輸出9。
## 例子八
### Code
```javascript
async function async1() {
  console.log('2')
  const data = await async2()
  console.log(data)
  console.log('8')
}

async function async2() {
  return new Promise(function (resolve) {
    console.log('3')
    resolve('await的结果')
  }).then(function (data) {
    console.log('6')
    return data
  })
}
console.log('1')

setTimeout(function () {
  console.log('9')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('7')
})
console.log('5')
```
### 分析
1. 函數async1和async2只是定義先不去管他，首先輸出1。
2. setTimeout作為宏任務進入宏任務隊列等待下一輪事件循環。
3. 進入async1()函數輸出2，await下面的代碼進入等待狀態。
4. 進入async2()輸出3，then回調進入微任務隊列。
5. 現在執行外面的同步代碼，輸出4，5，then回調進入微任務隊列。
6. 按序執行微任務，輸出6，7。現在回到async1函數。
7. 輸出data，也就是await關鍵字等到的內容，接著輸出8。
8. 進行下一輪時間循環輸出9。
## 例子九
### Code
```javascript
setTimeout(function () {
  console.log('8')
}, 0)

async function async1() {
  console.log('1')
  const data = await async2()
  console.log('6')
  return data
}

async function async2() {
  return new Promise(resolve => {
    console.log('2')
    resolve('async2的结果')
  }).then(data => {
    console.log('4')
    return data
  })
}

async1().then(data => {
  console.log('7')
  console.log(data)
})

new Promise(function (resolve) {
  console.log('3')
  resolve()
}).then(function () {
  console.log('5')
})
```
### 分析
1. setTimeout作為宏任務進入宏任務隊列等待下一輪事件循環。
2. 先執行async1函數，輸出1，6進入等待狀態，現在執行async2。
3. 輸出2，then回調進入微任務隊列。
4. 接下來執行外面的同步代碼輸出3，then回調進入微任務隊列。
5. 按序執行微任務，輸出4，5。下面回到async1函數。
6. **輸出了4之後執行了return data，await拿到了內容。**
7. 繼續執行輸出6，執行了後面的 return data 才觸发了async1()的then回調輸出7以及data。
8. 進行第二輪事件循環輸出8。
## 例子十
### Code
```javascript
async function test() {
  console.log('test start');
  await undefined;
  console.log('await 1');
  await new Promise(r => {
    console.log('promise in async');
    r();
  });
  console.log('await 2');
}

test();
new Promise((r) => {
  console.log('promise');
  r();
}).then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
});
```
### 分析


## 參考資料
#### 1. [【筆記】到底 Event Loop 關我啥事？](https://medium.com/infinitegamer/why-event-loop-exist-e8ac9d287044)
#### 2. [一次弄懂Event Loop](https://juejin.im/post/6844903764202094606)
#### 3. [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
