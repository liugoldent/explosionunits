---
{
  "title": "JS 模塊",
  "lang": "zH",
  "description": "在這篇，我們來看看promise到底怎麼使用與其想要解決什麼問題",
  "meta": [{"name":"keywords", "content":"js import and export,import and export, common JS, require, export"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---

# JS 模塊

## Import And Export(ES6)
在ES6中，import and export用法用兩種
1. 命名導出（Named exports）
2. 默認導出（Default exports）

### 命名導出
解釋：每一個需要導出的數據類型都要有一個name，統一引入一定要帶有{}，即便只有一個需要導出的數據類型。推薦！！
```javascript
//------ lib.js ------
const sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}

// 這邊是導出變數或是函數名稱
export {sqrt, square, diag}

//------ main.js ------
import { square, diag } from 'lib';				
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```
又或是直接export something
```javascript
//------ lib.js ------

// 這邊直接 export 出去
export const sqrt = Math.sqrt;
// 這邊直接 export 出去
export function square(x) {
    return x * x;
}
// 這邊直接 export 出去
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
// 然後直接import 進來
import { square, diag } from 'lib';				
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```
:::tip
無論怎麼導出都需要 `{}`
:::

#### 別名引入
當從不同模塊引入變量名稱時
```javascript
// 注意這樣就會造成混亂
import {speak} from './cow.js'
import {speak} from './goat.js'	
```
所以我們要使用 `as` 來區分這些名稱
```javascript
import {speak as cowSpeak} from './cow.js'
import {speak as goatSpeak} from './goat.js'
```
但是今天當我們要引入很多方法時，並且剛好又名稱都相同，code就會變得很繁瑣
```javascript
// import 一個js的一堆方法
import {
  speak as cowSpeak,
  eat as cowEat,
  drink as cowDrink
} from './cow.js'
// 然後名稱又相同，就會很煩瑣
import {
  speak as goatSpeak,
  eat as goatEat,
  drink as goatDrink
} from './goat.js'

cowSpeak() // moo
cowEat() // cow eats
goatSpeak() // baa
goatDrink() // goat drinks
```
所以就來到了*命名空間引入*的這種方法

#### 命名空間引入
```javascript
// 注意也是要有as xxx
import * as cow from './cow.js'
import * as goat from './goat.js'

cow.speak() // moo
goat.speak() // baa
```

### 默認導出
默認導出就不需要name了，不過一個js文件中只能有一個`export default`
```javascript
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
// 不需要指定名稱，即可直接指定
import myFunc from 'myFunc';
myFunc();
```
不過雖然只能有一個`export default`，但是我們可以`export`出去一個物件，裡面包含許多方法
```javascript
export default {
  speak () {
    return 'moo'
  },
  eat () {
    return 'cow eats'
  },
  drink () {
    return 'cow drinks'
  }
}
```
然後就如同命名空間的方式，引入
```javascript
import cow from './default-cow.js'
import goat from './default-goat.js'

cow.speak() // moo
goat.speak() // baa
```

## CommonJS 模塊(Node.js模塊)
* 運行時加載，不會污染全局作用域
* 拷貝到本頁面
* 全部引入
* 默認情況下 `.js`文件就是一個模塊（模塊內提供 `module` & `exports`變量），用於暴露模塊的API
* 使用`require`加載和使用模塊

```javascript
// 定義commonJS模塊: commonJSCounterModule.js.
const dependencyModule1 = require("./dependencyModule1");
const dependencyModule2 = require("./dependencyModule2");

let count = 0;
const increase = () => ++count;
const reset = () => {
    count = 0;
    console.log("Count is reset.");
};
// 第一種 exports方法
exports.increase = increase;
exports.reset = reset;
// 第二種 exports方法
module.exports = {
    increase,
    reset
};
```
使用模塊
```javascript
// 使用 CommonJS 模块（跟import 很像）
const { increase, reset } = require("./commonJSCounterModule");
increase();
reset();
// 或者或是把整塊引進來，然後使用他的方法：
const commonJSCounterModule = require("./commonJSCounterModule");
commonJSCounterModule.increase();
commonJSCounterModule.reset();
```

## ES 動態模塊(ECMAScript 2020)
2020的最近ES中加入內置的`import`函數，用於動態加載ES模塊。
`import`函數返回一個`Promise`，在他的`then` callback裡使用加載後的模塊
```javascript
// 用 Promise API 加载動態 ES 模塊
// 第一個使用解構
import("./esCounterModule.js").then(({ increase, reset }) => {
    increase();
    reset();
});

// 第二個使用載入一整塊的方式，再動用其方法
import("./esCounterModule.js").then(dynamicESCounterModule => {
    dynamicESCounterModule.increase();
    dynamicESCounterModule.reset();
});
```

當然由於返回的是 `Promise`，所以也支持 `await`語法
```javascript
// 通過 async/await 使用 ES 動態模塊
(async () => {
    // 具名導出的模塊
    const { increase, reset } = await import("./esCounterModule.js");
    increase();
    reset();
    // 默認導出的模塊
    const dynamicESCounterModule = await import("./esCounterModule.js");
    dynamicESCounterModule.increase();
    dynamicESCounterModule.reset();
})();
```
## 參考資料
1. [史上最全的 JavaScript 模块化方案和工具](https://zhuanlan.zhihu.com/p/159210232)
