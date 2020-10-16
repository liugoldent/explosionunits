---
{
  "title": "Dictionary 字典",
  "lang": "zH",
  "description": "介紹資料結構中，字典的使用",
  "meta": [{"name":"keywords", "content":"字典,dictionary,DataStructure,JavaScript DataStructure"}],
  "tags": ['資料結構']
}
---
# 字典

## 定義
### 1. 相對於集合,字典和雜湊主要focus在key-value關係
#### `{ 鍵(key): 值(value) }`

## 字典>骨架0
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
}
```

## 字典>方法 1.has(key)
### 如果某鍵存在於這個字典中，返回true，否則返回false
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  
  has(key){
    // return 這個key是否在這個items裡
    return key in this.items
    // return this.items.hasOwnProperty(key)
  }
}
```

## 字典>方法 2.set(key,value)
### 向字典中添加新元素
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  // 設定一個值
  set(key,value){
    this.items[key] = value
  }
}
```

## 字典>方法 3.remove(key)
### 藉由鍵值來從字典中移除鍵值對應的資料
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  remove(key){
        // 如果有值就刪除
      if(key in this.items){
        delete this.items[key]
        // 並回傳true
        return true
      }
      return false
    }
}
```

## 字典>方法 4.get(key)
### 藉由鍵值尋找特定的元素返回
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  get(key){
    // 記得要判斷是否有值
    // 呼叫has那個function
    return this.has(key) ? this.items[key] : undefined 
  }
} 
```

## 字典>方法 5.clear()
### 將所有元素刪除
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  clear(){
    this.items = {}
  }
} 
```

## 字典>方法 6.size()
### 看這個字典有多長
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  size(){
    // 使用Object.keys....就可以得出長度
    return Object.keys(this.items).length
  }
} 
```

## 字典>方法 7.keys()
### 看這個字典的key值
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  keys(){
    // 使用Object.keys....就可以得出鍵值的陣列
    return Object.keys(this.items)
  }
} 
```

## 字典>方法 8.values()
### 看這個字典的values值
```javascript
class Dictionary{
  constructor(){
    this.items = {}
  }
  values(){
    // 使用Object.values....就可以得出鍵值的陣列
    return Object.values(this.items)
  }
} 
```


## 字典> 完整程式碼
```javascript
class Dictionary {
    constructor() {
        this.items = {}
    }

    has(key) {
        return key in this.items
    }
    set(key, value) {
        this.items[key] = value
    }
    remove(key) {
        if (key in this.items) {
            delete this.items[key]
            return true
        }
        return false
    }
    get(key) {
        return this.has(key) ? this.items[key] : undefined
    }
    size() {
        return Object.keys(this.items).length
    }
    clear() {
        this.items = {}
    }
    keys() {
        return Object.keys(this.items)
    }
    values() {
        return Object.values(this.items)
    }
}
```
