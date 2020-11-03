---
{
  "title": "JS 常用方法",
  "lang": "zH",
  "description": "在這篇，我們來看看一些JS常用的方法",
  "meta": [{"name":"keywords", "content":"js methods, js join, js split, js array to string , js array to object"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2",
}
---

# JS 常用方法
## String to Array（字串轉陣列）
### Object.assign()
```javascript
let oriArray = ['a','b','c']

let convertoObject = Object.assign({},oriArray)

console.log(convertoObject)
```

### for loop
```javascript
let oriArray = ['a','b','c']

let convertObject = {}

for(let i = 0 , len = oriArray.length ; i < len ; i++){
  convertObject[i] = oriArray[i]
}

console.log(convertObject)
```

### reduce
```javascript
let oriArray = ['a','b','c']

// 注意第三個參數是index
// curr 為現在的內容
let convertObject = oriArray.reduce((accu, curr, i)=>{
  accu[i] = curr
  return accu
},{})

console.log(convertObject)
```

## Array to Object（陣列轉字串）


## Array to String（陣列轉字串）

