---
{
  "title": "JS 展開運算子",
  "lang": "zH",
  "description": "在這篇，我們來看看JS展開運算子的應用",
  "meta": [{"name":"keywords", "content":"js spread operator, 展開運算子"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---

# JS 展開運算子

## Apply調用方式的剔除
#### 過往：我們要通過`Function.prototype.apply`來調用函數，參數放在一個陣列裡
```javascript
function doStuff (x, y, z) { }
var args = [0, 1, 2];

// 調用函數並傳參數
doStuff.apply(null, args);
```
#### 現在：使用展開運算符
```javascript
doStuff(...args)
```

## 合併陣列
#### 過往：使用`push`、`unshift`合併陣列
```javascript
arr1.push(...arr2) 
arr1.unshift(...arr2) 
```
#### 現在：使用展開運算符
```javascript
let arr1 = ['one','two','three']
let arr2 = [...arr1, 'four','five']

console.log(arr2)
//["one", "two", "three", "four", "five"]
```

## 拷貝陣列
#### 過往：使用`slice`
```javascript
let arr = [1,2,3]
let arr2 = [...arr]
arr2.push(4)
```

## 使用 `Math`物件裡的相關函數
應用於參數不確定的函數裡
```javascript
let nums = [1,2,3,4,5]
console.log(Math.max(...nums))
```

## 物件解構
```javascript
let { x, y , ...z } = { x:1, y:2, a:3, b:4}
console.log(x) // 1
console.log(y) // 2
console.log(z) 
// [object Object] {
// a: 3,
// b: 4
// }
```

## 參考資料
1. [ES6 展开运算符的常见用法](https://juejin.im/entry/6844903482223230984)
