---
{
  "title": "JS Proxy",
  "lang": "zH",
  "description": "在這篇，我們來看看JS Proxy怎麼樣應用",
  "meta": [{"name":"keywords", "content":"js Proxy"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS Proxy
## 什麼是Proxy
### 官方定義
Proxy物件用於對基本操作的自定義行為（屬性查找、賦值、枚舉、函數調用）
### 例子
```javascript
let obj = {
    a: 1
}
let proxyObj = new Proxy(obj,{
    get: function(target, prop){
        return prop in target ? target[prop]: 0 
    },
    set: function(target, prop, value){
        target[prop] = value
    }
})

console.log(proxyObj.a) // 1
console.log(proxyObj.b) // 0

proxyObj.a = 666
console.log(proxyObj.a) // 666
console.log(obj.b) // undefined
```

## 語法與注意
### 基本語法
* `let proxy = new Proxy(target, handler)`
* target：可以是任何類型的值，甚至是一個代理
* handler：為自定義行為，是一個物件
```javascript
let obj = {}
let proxyObj = new Proxy(obj, {})
proxyObj.a = 1
proxyObj.fn = function(){
    console.log('it is a function')
}

console.log(proxyObj.a) // 1
console.log(proxyObj.fn) // function(){...}

console.log(obj)
// [object object]
// {
//   a: 1,
//   fn: function(){....}
// }
```
## 注意事項
* 假設 handler 為空物件，則表示 `proxy` 操作就是對 target 操作
* handler 不可為 null
* 在 handler 不為空的狀態下，都要去對代理的變數做操作，否則會返回 undefined（最一開始的例子）

## API
### `get(target, prop, receiver)`
#### 意義：用於攔截物件的讀取屬性操作
* `target`是指目標物件
* `property`是被獲取的屬性名
* `receiver`是Proxy的實例
```javascript
let proxyObj = new Proxy({}, {
    get: function(target, prop, receiver){
        console.log(prop)
        return 10
    }
})
console.log(proxyObj.a) // 10
```
```javascript
let proxyObj = new Proxy({}, {
    get: function(target, p, receiver){
        return receiver
    }
})
console.log(proxyObj.a === proxyObj) // true
```
#### 注意：如果要訪問的目標屬性是不可寫、不可配置的，則返回的值必須與該目標屬性的值相同，也就是不可修改，否則會報做
```javascript
let obj = {}
// configurable：如果為 false，則任何嘗試刪除目標屬性 or 修改特性（writable, configurable, enumerable）都會被禁止
// enumerable：是否可以透過 for-in 來迭代
// writable：是否唯讀
Object.defineProperties(obj, 'a', {
    configurable: false,
    enumerable: false,
    value: 10,
    writable: false
})

let proxy = new Proxy(obj, {
    get : function(targer, prop){
        return 20    
    }   
})
console.log(proxy.a) // uncaught TypeError
```

### `set(target, property, value, receiver)`
#### 意義：用於攔截屬性的操作，多了一個value
* `value`：為要設定的值
* 在嚴格模式下需要返回 `true` or `false`
```javascript
let proxy = new Proxy({}, {
    set: function (target, prop, value, receiver) { 
        if(prop === 'count'){
            if(typeof value === 'number'){
                console.log('success')
                target[prop] = value
            }else{
                throw new Error('false')
            }   
        }
    }
})

proxy.count = '10' // Error

proxy.count = 10 // success
```
* 一樣如果目標屬性是不可寫不可配置，則不能改變其值
```javascript
// 如果都false，則不可改變其值
Object.defineProperty(obj, "count", {
    configurable: false,
    enumerable: false,
    value: 10,
    writable: false
});
```

### `apply(targer, thisArg, argumentsList)`
#### 意義：用於攔截函數的調用
* `target`：目標函數
* `thisArg`：被調用時的上下文物件
* `argumentsList`：被調用時的參數陣列
```javascript
function sum(a,b){
    return a+b
}
let proxy = new Proxy(sum, {
    apply: function(target, thisArg, argumentsList){
        console.log(target) // sum
        console.log(thisArg) // undefined
        console.log(argumentsList) // [1,2]
        return target(argumentsList[0], argumentsList[1])
    }
})

console.log(sum(1,2))
```

### `construct(target, argArray, newTarget)`
#### 意義：用於攔截`new`操作符
為了使 new生效，用於初始代理的目標物件自身必須具有[[Construct]]內部方法
* target：目標物件
* argumentsList：構造函數參數列表
* newTarget：被new出來的東西
* notice：要返回一個物件，不然會報錯
```javascript
let p = new Proxy(function(){} , {
    construct: function(target, argArray, newTarget){
        console.log(newTarget === p) // true
        return { value: (argArray[0] + argArray[1]) * 10 }
    }
})
console.log(new p(1,2).value) // 30
```

### `has(target, prop)`
#### 意義：判斷物件是否有某個屬性，然後返回boolean
```javascript
let p = new Proxy({}, {
    has: function (target, p1) { 
        if(p1[0] === '_'){
            console.log('it is a private property')
            return false
        }
        return true
     }
})

console.log('a' in p) // true
console.log('_a' in p) // it is a private property
```
#### 若當目標屬性的某一屬性本身不可被配置，則該屬性不能夠被代理隱藏，否則會拋出`TypeError`
```javascript
let obj = {
    a: 1
}
Object.preventExtensions(obj)

let p = new Proxy(obj, {
    has: function (target, p1) { 
        return false
     }
})

console.log('a' in p) // TypeError
```

## 數據綁定
#### 主要流程
1. 取得節點
2. addEventListener 事件
3. 構造Proxy物件
```html
<div id="app">
    <h3 id="paragraph"></h3>
    <input type="text" id="input"/>
</div>
```
```javascript
// 得到h3的節點
const paragraph = document.getElementById('paragraph');
// 得到input的節點
const input = document.getElementById('input');
    
// 需要代理的数据对象
const data = {
	text: 'hello world'
}

const handler = {
	// 監控 data 中的 text 屬性變化
	set: function (target, prop, value) {
    	if ( prop === 'text' ) {
                //更新值
                target[prop] = value;
                //更新视图
                paragraph.innerHTML = value;
                input.value = value;
                return true;
    	} else {
    		return false;
    	}
	}
}

// 添加input監聽事件
input.addEventListener('input', function (e) {
    myText.text = e.target.value;   //更新 myText 的值
}, false)

// 構造 proxy 物件
const myText = new Proxy(data,handler);

// 初始化值
myText.text = data.text;    
```
