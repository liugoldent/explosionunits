---
{
  "title": "JS 深拷貝與淺拷貝",
  "lang": "zH",
  "description": "在這篇，我們來看看JS深拷貝與淺拷貝的幾種方法",
  "meta": [{"name":"keywords", "content":"js clone data,深拷貝,淺拷貝"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---

# JS 深拷貝與淺拷貝

## 原因
先上個圖
![stack or heap](https://user-gold-cdn.xitu.io/2019/4/25/16a545b78e43db5c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

對於數據，我們可以基本上分成
* 基本類型（會在記憶體上新增一個位置）
* 引用類型（引用記憶體的位置）

### 基本類型
#### 值傳遞
#### String、Number、Boolean、Null、Undefined、Symbol
在賦值時會被分配獨立的內存空間。
因為是在記憶體上新增一個位址來存，所以更改其值，原本的a不會被改到
```javascript
let a = 10
let b = a
b++
console.log(a,b) // 10, 11
```
### 引用類型
#### 址傳遞
#### Object、Array、Function
* 屬於引用地址類型
* 由於將c賦值給予d，所以d會指向其記憶體
* 所以d改變時，c也會被改變，因為兩者指向相同的地方
* 結果：造成資料在處理方面可能會出現一些小問題，所以我們需要「拷貝」
```javascript
let c = { a:1 }
let d = c
d.key = 3
console.log(c) 
// 下方為結果
// [object Object] {
//   a: 1,
//   key: 3
// }
```
#### 在操作物件時，實際上是操作物件的引用位址，而不是操作實際的那個物件

## 淺與深的差別
字面意義：
1. 淺拷貝：拷貝的級別淺
2. 深拷貝：拷貝的級別深
具體：
1. 淺拷貝：對於物件來說，只拷貝第一層的鍵值做拷貝
2. 深拷貝：完全拷貝一份物件。

## 淺拷貝案例
```javascript
// 陣列的淺拷貝
let arr1 = [1,2,3]

let arr2 = []

for(let i in arr1){
  arr2[i] = arr1[i]
}
arr2.push(4)

console.log(arr1) // [1,2,3]
console.log(arr2) // [1,2,3,4]

// 物件的淺拷貝
let obj1 = {
  a: '1',
  b: '2',
  c: '3'
}
let obj2 = {}
for (let i in obj1) {
  obj2[i] = obj1[i]
}
obj2.d = '4'
console.log(obj1) // {a: "1", b: "2", c: "3"}
console.log(obj2) // {a: "1", b: "2", c: "3", d: "4"}
```
## 深拷貝案例
```javascript
// 深拷貝函數封裝
    function deepCopy(obj) {
      // 根據obj的型別，來判斷說進來的是 obj or array
      let newObj = Array.isArray(obj)? [] : {};
      // 判斷傳入的obj是否存在，然後類型是否為物件
      if (obj && typeof obj === 'object') {
        for(key in obj) {
          // 如果obj的子元素是物件，則遞迴此函數
          if(obj[key] && typeof obj[key] ==='object') {
            newObj[key] = deepCopy(obj[key])
          } else {
            // 如果obj的子元素非物件，則直接賦值
            newObj[key] = obj[key]
          }
        }
      }
      return newObj // 返回新物件
    }
   
    let obj1 = {
      a: '1',
      b: '2',
      c: {
        name: 'Demi'
      }
    }
    let obj2 = deepCopy(obj1)
    obj2.c.name = 'dingFY'
    console.log(obj1) // {a: "1", b: "2", c: {name: 'Demi'}}
    console.log(obj2) // {a: "1", b: "2", c: {name: 'dingFY'}}
```

## 陣列的淺拷貝方法
### Array.concat()
```javascript
let arr = ['one', 'two', 'three'];
let newArr = arr.concat();
newArr.push('four')

console.log(arr)    // ["one", "two", "three"]
console.log(newArr) // ["one", "two", "three", "four"]
```
### Array.slice()
```javascript
let arr = ['one', 'two', 'three'];
let newArr = arr.slice();
newArr.push('four')

console.log(arr)    // ["one", "two", "three"]
console.log(newArr) // ["one", "two", "three", "four"]
```

## 陣列的深拷貝方法
### JSON.parse(JSON.stringify())
* 請注意函數不可以被拷貝
```javascript
let arr = {
  a: 'one', 
  b: 'two', 
  c: {
    name: 'Demi'
  }
};

let newArr = JSON.parse( JSON.stringify(arr) );
newArr.c.name = 'dingFY'
console.log(arr);    // {a: "one", b: "two", c: {name: 'Demi'}}
console.log(newArr); // {a: "one", b: "two", c: {name: 'dingFY'}}


// 測試函數是否可以被複製
let arr = {
  a: 'one', 
  b: ()=>{
    console.log('test')
  }
};

let newArr = JSON.parse( JSON.stringify(arr) );
console.log(arr);    // {a: "one", b: ()=>{console.log('test')}}
console.log(newArr); // {a: "one"} // 函數沒有被複製
```

## 物件的淺拷貝方法
### Object.assign
```javascript
let arr = {
  a: 'one', 
  b: 'two', 
  c: 'three'
};

let newArr = Object.assign({}, arr)
newArr.d = 'four'
console.log(arr);    // {a: "one", b: "two", c: "three"}
console.log(newArr); // {a: "one", b: "two", c: "three", d: "four"}
```

## 物件的深拷貝
### 使用嵌套的展开操作符
```javascript
const original = {name: 'Jane', work: {employer: 'Acme'}};
const copy = {name: original.name, work: {...original.work}};
original.work.employer = 'Mike'

console.log(original)

console.log(copy)
```

### JSON.parse(JSON.stringify())
```javascript
function jsonDeepCopy(original) {
  return JSON.parse(JSON.stringify(original));
}
const original = {name: 'Jane', work: {employer: 'Acme'}};
const copy = jsonDeepCopy(original);
```
但此方法有其缺點：若為不支持的屬性 or 值會直接忽略
```javascript
assert.deepEqual(
  jsonDeepCopy({
    [Symbol('a')]: 'abc', // Symbol 無法被解析
    b: function () {}, // function 無法
    c: undefined, // undefined 無法
  }),
  {} // empty object
);
```

## 淺拷貝的封裝
```javascript
let shallowCopy = function (obj) {
  // 只拷貝物件
  if (typeof obj !== 'object') return;
  // 根据obj的類型判斷要新建一個陣列or一個物件
  let newObj = obj instanceof Array ? [] : {};
  // 遍歷obj，並且判斷是obj的屬性才拷貝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
```

## 深拷貝的封裝
通用的深拷貝使用，並且可以給陣列or物件
```javascript
let deepCopy = function (obj) {
  // 只拷貝物件
  if (typeof obj !== 'object') return;
  // 根据obj的類型判斷要新建一個陣列or一個物件
  let newObj = obj instanceof Array ? [] : {};
  // 遍歷obj，並且判斷是obj的屬性才拷貝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 如果obj的子属性是物件，則遞迴，否则直接赋值
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

## class中的深拷貝
* key：在class中加入一個clone()方法
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // clone方法
  clone() {
    // return 一個new的這個class
    return new Point(this.x, this.y);
  }
}
class Color {
  constructor(name) {
    this.name = name;
  }
  clone() {
    return new Color(this.name);
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }
  // clone方法
  clone() {
    // return 一個new的這個class
    return new ColorPoint(
      this.x, this.y, this.color.clone()); // (A)
  }
}
```

## 參考資料
#### 1.[“深拷贝” 与 “浅拷贝” 的区别，JS实现深浅拷贝的几种方法](https://juejin.im/post/6844903830665035789)
#### 2.[下次面试再问JavaScript怎么实现深拷贝，我就不客气了！](https://juejin.im/post/6844903986118524941)
