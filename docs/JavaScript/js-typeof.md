---
{
  "title": "JS 類型判斷的四種方法",
  "lang": "zH",
  "description": "在這篇，我們來看看JS類型判斷的幾種方法",
  "meta": [{"name":"keywords", "content":"js typeof,typeof,typeof,instanceof"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS 類型判斷的四種方法

## 基本數據類型
* 空值（null）
* 未定義（undefined）
* 布林值（boolean）
* 數字（number）
* 字串（string）
* 物件（object）
* 符號（symbol）
    - 表示獨一無二的值
* 大整數（Bigint）

## typeof
#### 操作符，返回這個表達式的數據類型。
* 返回全小寫的類型字串
* 返回：number、boolean、symbol、string、object、undefined、function、bigInt
* 原理：不同的物件的底層為二進制，在JS二進制前三位儲存其類型
```javascript
console.log(typeof undefined) // undefind
console.log(typeof null)      // object
console.log(typeof true)      // boolean
console.log(typeof 43)        // number
console.log(typeof '21')      // string
console.log(typeof {a:1})     // object
console.log(typeof [1])       // object
console.log(typeof Symbol())  // symbol
console.log(typeof 123n)      // bigint

function a() {}
console.log(typeof a)         // function

var date = new Date()
var error = new Error()
console.log(typeof date)      // object（這種被new出來的型態為ojbect）
console.log(typeof error)     // object（這種被ne出來的型態為ojbect）
```

## instanceof
* 判斷A是否為B的實例，如果A為B的實例則true。如果否則返回false
* 檢測的為原型
* 可以判斷複雜數據類型。但不適用於基本數據類型
```javascript
console.log(12 instanceof Number)  // false
console.log('22' instanceof String)  // false
console.log(true instanceof Boolean) // false
console.log(null instanceof Object) // false
console.log(undefined instanceof Object) // false

console.log([] instanceof Array)   // true
console.log({a: 1} instanceof Object) // true
console.log(json instanceof Object) // true

function a() {}
console.log(a instanceof Function)  // true
console.log(new Date() instanceof Date)  //true

console.log(reg instanceof RegExp) //true
console.log(error instanceof Error) // true
```

## Object.prototype.toString.call()
* 直接在call中放進想要監測的數值
* 返回`[object xxx]`。xxx 為其型態
* 型態為大寫+字串。例如：`[object Number]`
* 可用indexOf去判斷
```javascript
console.log(Object.prototype.toString.call(1))          // [object Number]
console.log(Object.prototype.toString.call(1n))         // [object BigInt]
console.log(Object.prototype.toString.call('123'))      // [object String]
console.log(Object.prototype.toString.call(true))       // [object Boolean]
console.log(Object.prototype.toString.call(undefined))  // [object Undefined]
console.log(Object.prototype.toString.call(null))       // [object Null]
console.log(Object.prototype.toString.call({}))         // [object Object]
console.log(Object.prototype.toString.call([]))         // [object Array]
console.log(Object.prototype.toString.call(function a() {}))  // [object Function]
console.log(Object.prototype.toString.call(Symbol()))         // [object Symbol]
console.log(Object.prototype.toString.call(Math))             // [object Math]
console.log(Object.prototype.toString.call(JSON))             // [object JSON]
console.log(Object.prototype.toString.call(new Date()))       // [object Date]
console.log(Object.prototype.toString.call(new RegExp()))     // [object RegExp]
console.log(Object.prototype.toString.call(new Error))        // [object Error]
console.log(Object.prototype.toString.call(window)            // [object Window]
console.log(Object.prototype.toString.call(document)          // [object HTMLDocument]

// 可用indexOf去判斷是哪種類型
let a = Object.prototype.toString.call(1)
console.log(a.indexOf('Number'))// 返回8，代表正確判斷其類型
```
#### 封裝函數來監測其類別
```javascript
let type = function(o) {
    let s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
    // . 代表任意字元
    // * 代表前一個字元可以是 0個 or 多個
    // ? 代表前一個字元可以是 0個 or 1個
    // \ 代表下一個是特殊字元
};
console.log(type(12)) // number
console.log(type('12')) // string
console.log(type({})) // object
console.log(type([])) // array
```

## constructor
constructor表示原型物件與構造函數之間的關係，如果修改了原型物件，一般來說會同時修改constructor屬性，防止引用時出錯
```javascript
console.log('22'.constructor === String)             // true
console.log(true.constructor === Boolean)            // true
console.log([].constructor === Array)                // true
console.log(document.constructor === HTMLDocument)   // true
console.log(window.constructor === Window)           // true
console.log(new Number(22).constructor === Number)   // true
console.log(new Function().constructor === Function) // true
console.log((new Date()).constructor === Date)       // true
console.log(new RegExp().constructor === RegExp)     // true
console.log(new Error().constructor === Error)       // true
```
::: warning
1. null & undefined 是無效的物件，因此不會有constructor存在
2. 函數的constructor是不穩定的，主要體現在自定義物件上，讓開發者重寫prototype後，原有的constructor引用會丟失
constructor會默認為Object
:::

## 資料來源
[JavaScript类型判断的四种方法](https://juejin.im/post/6844904149612511246)
