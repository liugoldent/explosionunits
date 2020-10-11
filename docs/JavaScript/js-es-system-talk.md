---
{
  "title": "ES6、ES7、ES8、ES9、ES10 新特性",
  "lang": "zH",
  "description": "在這篇，我們可以會了解到ES6、ES7、ES8、ES9、ES10 的新特性",
  "meta": [{"name":"ES6", "content":"ES6 新特性"},
            {"name":"ES7", "content":"ES7 新特性"},
            {"name":"ES8", "content":"ES8 新特性"},
            {"name":"ES9", "content":"ES9 新特性"},
            {"name":"ES10", "content":"ES10 新特性"},
            {"name":"ES6、ES7、ES8、ES9、ES10 新特性", "content":"ES6、ES7、ES8、ES9、ES10 新特性"},
            ],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# ES6、ES7、ES8、ES9、ES10 新特性

## ES6
### class
```javascript
// 在ES6中，我們終於有新的語法糖可以使用class了
class Animal{
  constructor(name,color){
    this.name = name
    this.color = color
  }
  toString(){
    console.log('name:'+this.name+',color:'+this.color)
  }
}
const animal = new Animal('dog','white')
console.log(animal.toString()) // "name:dog,color:white"

// 以下為繼承
class Cat extends Animal{
  constructor(action){
    // 記得這邊要先super，才可以拿到父的資料
    super('cat','white')
    this.action = action
  }
  toString(){
    console.log(super.toString())
  }
}
const CCat = new Cat('Catch')
console.log(CCat.toString()) // "name:cat,color:white"

console.log(CCat instanceof Cat) // true

console.log(CCat instanceof Animal) // true
```

### 模塊化
#### export
```javascript
// test.js
let name = 'Rainbow'
let age = '32'
export{name,age}
```
```javascript
// myModule.js
export function myModule(someArg){
  return someArg
}
```
#### import
```javascript
import {myModule} from 'myModule'
import {name,age} from 'test'
```

### 箭頭函數
:::tip
記得使用時，要特別小心this的綁定
:::
```javascript
function foo(){
    console.log('foo')
}
foo()
// 'foo'
let foo2 = ()=>{
    console.log('foo2')
}
                
foo2()
// 'foo2'
```

### ES6中Map和Object的差異
#### * Object(物件)：物件只接受字符串作為key值
#### * Map：在ES6提供了Map數據結構。他類似於物件，也是鍵值對的集合。但是鍵不限於字串。各種類型的值（包含物件），都可以成為鍵。
```javascript
const map = new Map([
  ['Hello','world'],
  [1,'1test']
])
console.log(map)
// { 'Hello' => 'world', 1 => '1test' }
```

### 使用函數參數默認值
```javascript
function test(height = 50, color = 'red'){
}
// 較新的寫法
function test(height,color){
    let height = height || 50
    let color = color || 'red'
}
// 過往寫法
```

### 模板字串
```javascript
// 使用 「``」包起來
let a = `your name is ${first} ${last}`
```

### 解構賦值
```javascript
let foo = ['one','two','three']
let [Hi, Ho, Ha] = foo
console.log(Hi) // 'one'
console.log(Ho) // 'two'
console.log(Ha) // 'three'
```
如果想要忽略掉某個值
```javascript
let foo = ['one','two','three']
let [Hi,, Ha] = foo
console.log(Hi) // 'one'
console.log(Ha) // 'three'
```
也可以一行聲明多變量
```javascript
let [a,b] = [1,2]
console.log(a) // 1
console.log(b) // 2
```
或是從物件中取得數值
```javascript
const student = {
  name:'Ming',
  age:24,
  city:'Taiwan'
}
const {name,age,city} = student
console.log(name) // 'Ming'
console.log(age)  // 24
console.log(city) // 'Taiwan'
```

### 延展操作符
#### 陣列的展延
```javascript
const student = ['Jine','Tom']
const persons = ['A',...student,'B','C']
console.log(persons)
// ["A", "Jine", "Tom", "B", "C"]
```
#### 陣列的拷貝
```javascript
let arr1 = [1,2,3]
let arr2 = [...arr1]
arr2.push(4)
console.log(arr1)
// [1,2,3]
console.log(arr2)
// [1,2,3,4]
```
#### 連接陣列（同樣物件也可以）
```javascript
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const arr3 = [...arr1,...arr2]
console.log(arr3)
// [1,2,3,4,5,6]
```
### 物件屬性縮寫
```javascript
// 過往
const name = 'Ming',age = '18',city = 'Taiwan'
const student = {
  name:name,
  age:age,
  city:city
}
//ES6後
const student = {
  name,
  age,
  city
}
```

### let & const
在ES6之前是沒有塊級作用域，而const & let 的出現補足了這塊
```javascript
{
  var a = 10
}
console.log(a) // 10
{
  let b = 20
}
console.log(b) // "ReferenceError: b is not defined"
```

## ES7
### 求冪運算符（**）
又稱指數操作符
```javascript
console.log(3**2)
// 9
```
### Array.prototype.includes()
```javascript
console.log([1,2,3].includes(1))
// true
console.log([1,2,3].indexOf(1))
// 0
```
然而有特殊狀況
```javascript
console.log([1,2,NaN].includes(NaN))
// true（這邊includes找得出Nan）
console.log([1,2,NaN].indexOf(NaN))
// -1（但indexOf找不到）
```

## ES8

### async await
在ES6為了要解決回調的問題，出現了Promise的then函數，但當邏輯很多時，，要鏈式多個then函數，會造成語意不清楚
```javascript
new Promise((resolve,reject) => { resolve(42)}
.then(() => { do one})
.then(() => { do two})
.catch(() => {console.log(err)})
)
```
在ES8中，把非同步做得更方便，而這其實就是Promise與Generator的組合，而變成語法糖。
```javascript
async function xxx(){
    await do One
    await do_Two
}
```

### object.entries()
有點類似把物件轉為陣列的概念（注意是二維陣列）
```javascript
const obj = {1:'a', 2:'B'}
const obj2 = {'Hello':'world','Java':'Script'}

console.log(Object.entries(obj))
[["1", "a"], ["2", "B"]]

console.log(Object.entries(obj2))
[["Hello", "world"], ["Java", "Script"]]
```

### Object.values()
#### 類似於entries，但是是返回值的一維陣列
```javascript
const obj = {1:'a', 2:'B'}
const obj2 = {'Hello':'world','Java':'Script'}

console.log(Object.values(obj))
// ['a','B']

console.log(Object.values(obj2))
// ["world", "Script"]
```

### padStart()、padEnd()
新的字串填充方法，可以從start位置或是end位置，開始填充到指定數字長度，被填充的內容為第二個參數。
```javascript
let astring = 'moment'
console.log(astring.padStart(10,'m'))
// 'mmmmmoment'

console.log('abc'.padStart(10, "foo"))
// "foofoofabc"

console.log('abc'.padEnd(10, "foo"))
// 'abcfoofoof'
```

### Object.gerOwnPropertyDescriptors()
得到這個物件內容值的一些屬性
```javascript
const obj2 = {
  name : 'Jane',
  get age(){
    return '10'
  }
}
console.log(Object.getOwnPropertyDescriptors(obj2))

// 以下為console.log結果
[object Object] {
  age: [object Object] {
    configurable: true,
    enumerable: true,
    get: function get() {
        return '10';
      },
    set: undefined
  },
  name: [object Object] {
    configurable: true,
    enumerable: true,
    value: "Jane",
    writable: true
  }
}
```

## ES9
### 非同步迭代
我們可以使用await + for of 循環一起使用，以串行的方式進行非同步操作
```javascript
async function process(array){
  for await (let i of array){
    doSomething(i)
  }
}
```

### Promise.finally
過去的promise，除了成功就是失敗，在ES9加了.finally做最後處理
```javascript
function doSomething(){
  doSomething1()
  .then(func1,func2)
  .then(func3,func4)
  .catch(err =>{
    console.log(err)
  })
  .finally(()=>{
    // finish here
  })
}
```

### Rest/Spread屬性
ES9為物件提供了跟陣列一樣的Rest & Spread屬性
```javascript
const NumObj = {
  a :1,
  b :2,
  c :3
}
const {a,...x} = NumObj
console.log(a)
// 1

console.log(x)
// {b:2,c:3}
```
或是用於函數傳遞參數的時候
```javascript
function restParam({a,...x}){
  console.log(a) // 1
  console.log(x) // {b:2,c:3}
}
restParam({
  a :1,
  b :2,
  c :3
})
```
或是可以拓展於其他物件
```javascript
const obj1 = {
  a :1,
  b :2,
  c :3
}
const obj2 = {...obj1,d:3}
console.log(obj2)
{
  a: 1,
  b: 2,
  c: 3,
  d: 3
}
```

## ES10
### flat()
1. flat最基本的可以使用在陣列降維（把二維變成一維）
2. 還可利用flat()來去除陣列的空項目
```javascript
let a = [
  [1,2,3],[],['string'],23,[444,22]
]

console.log(a.flat())
// [1, 2, 3, "string", 23, 444, 22]
```
如果內部又有陣列
```javascript
let a = [
  [1,2,3],[],['string'],[[1,2]],23,[444,22]
]

console.log(a.flat())
// [1, 2, 3, "string", [1, 2], 23, 444, 22]

console.log(a.flat().flat())
[1, 2, 3, "string", 1, 2, 23, 444, 22]
```

### flatMap()
有點類似map+flat的感覺
```javascript
let arr = [1,3,5]
let mapArr = arr.map(x => [x * x])
console.log(mapArr)
// [[1], [9], [25]]

let flatmapArr = arr.flatMap(x => [x * x])
console.log(flatmapArr)
// [1, 9, 25] > 做運算後，再攤平成一維
```

### string的 trimStart & trimEnd 方法
主要是用於去掉前面的空白 or 去掉後面的空白所使用的

### object.fromEntries()
對比於Object.entries的相反，這邊是把陣列改回為物件
```javascript
const NewArray = [['0','a'],['string','Hello']]

console.log(Object.fromEntries(NewArray))
{
  0: "a",
  string: "Hello"
}
```

### matchAll
```javascript
let regexp = /t(e)(st(\d?))/g;
let str = 'test1test2';
let array = [...str.matchAll(regexp)];

console.log(array[0]);
// expected output: Array ["test1", "e", "st1", "1"]
```

### try catch 綁定
```javascript
// 過去的做法是
try {} catch(e){}

// 現在的做法是
try {} catch {}
```

### 第七種數據類型 BigInt
主要用於 `2⁵³`的狀況

## 參考資料
[1.ES6、ES7、ES8、ES9、ES10新特性一览](https://blog.csdn.net/weixin_34199405/article/details/91433195)
[2.盘ES6、ES7、ES8、ES9、ES10](https://www.jianshu.com/p/3096461e5317)
