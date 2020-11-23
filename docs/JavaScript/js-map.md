---
{
  "title": "JS Map",
  "lang": "zH",
  "description": "在這篇，我們來看看JS Map怎麼樣應用",
  "meta": [{"name":"keywords", "content":"js map"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---

# JS Map
## Map與常規物件有何不同
### 1. 無限制的key
正常的物件key值必須是 string or symbol
```javascript
const symbol = Symbol();
const string2 = 'string2';

const regularObject = {
  string1: 'value1',
  [string2]: 'value2',
  [symbol]: 'value3'
};
```
#### 相比之下，`Map`允許我們使用函數or物件or其他類型作為key值
#### 語法 `set(key, value)`
```javascript
const func = () => null;
const object = {};
const array = [];
const bool = false;
const map = new Map();

map.set(func, 'value1');
map.set(object, 'value2');
map.set(array, 'value3');
map.set(bool, 'value4');
map.set(NaN, 'value5');
```

### 2. 直接遍歷
正常物件中，我們需要透過`Object.keys` or `Object.values` or `Object.entries`，或者 `for..in`去做循環
#### 但Map可以直接遍歷，使用`for..of` or `forEach`
```javascript
for(let [key, value] of map){
    console.log(key)
    console.log(value)
}

map.forEach((key,value)=>{
    console.log(key)
    console.log(value)
})
```

### 直接取得數量
```javascript
map.size // 直接取得map大小
```

## Map & Set
### 相同的方法
* has、get、set、delete
* size

### 不同處
* map 是 key/value 出現
```javascript
const set = new Set([1, 2, 3, 4]);
const map = new Map([['one', 1], ['two', 2], ['three', 3], ['four', 4]]);
```

## 類型轉換
### 將Map 轉回陣列
```javascript
const a = new Map([['one',1], ['two',2]])
const b = [...a]
console.log(b) // [['one',1], ['two',2]]
```

### 將Map 轉為物件
* `Object.fromEntries`：參數是map。得到Obj
```javascript
// 方法一
const obj2 = Object.fromEntries(map)

// 方法二
const mapToObj = map => {
  const obj = {};
  map.forEach((key, value) => { obj[key] = value });
  return obj;
};
```

### 將物件轉為 Map
* `Object.entries`：參數是物件。得到陣列
* `Object.entries` 返回一個二維陣列 `[[key, value], [key1, value1]]`
* if 再 `Array.flat()`後可以整個變成一維
```javascript
// 方法一
const map2 = new Map(Object.entries(obj));

// 方法二
const objToMap = obj => {
  const map = new Map();
  Object.keys(obj).forEach(key => { map.set(key, obj[key]) });
  return map;
};
```

## 性能
比較組
```javascript
let obj = {}, map = new Map(), n = 1000000
for(let i = 0 ; i < n ; i++){
    obj[i] = i
    map.set(i, i)
}
```
### 查詢
#### map 獲勝
```javascript
let result;
console.time('Object');
result = obj.hasOwnProperty('999999');
console.timeEnd('Object');
// Object: 0.250ms

console.time('Map');
result = map.has(999999);
console.timeEnd('Map');
// Map: 0.095ms (2.6 times faster)
```

### 新增
#### map 獲勝
```javascript
console.time('Object');
obj[n] = n;
console.timeEnd('Object');
// Object: 0.229ms

console.time('Map');
map.set(n, n);
console.timeEnd('Map');
// Map: 0.005ms (45.8 times faster!)
```

### 刪除
#### map 獲勝
```javascript
console.time('Object');
delete obj[n];
console.timeEnd('Object');
// Object: 0.376ms

console.time('Map');
map.delete(n);
console.timeEnd('Map');
// Map: 0.012ms (31 times faster!)
```

## Map在 for loop 下較慢
```javascript
console.time('Object');
for (let i = 0; i < n; i++) {
  obj[i] = i;
}
console.timeEnd('Object');
// Object: 32.143ms

let obj = {}, map = new Map(), n = 1000000;
console.time('Map');
for (let i = 0; i < n; i++) {
  map.set(i, i);
}
console.timeEnd('Map');
// Map: 163.828ms (5 times slower)
```

## 參考資料
[如何利用JavaScript的Map提升性能](https://juejin.cn/post/6844903911938080782)
