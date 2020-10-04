---
{
  "title": "Set 集合",
  "lang": "zH",
  "description": "集合的操作與使用",
  "meta": [{"name":"set", "content":"集合"}],
  "tags": ['資料結構']
}
---
# Set 集合

## 定義
### 1. 集合是由一組無序且唯一的項目所組成的
#### eg:{1,2,3,1} 會與 {1,2,3} 相同（因為{1,2,3,1}的最後一個1是沒有意義的）
### 2. 在集合中,我們主要關心值的本身(value & value)

## 集合>方法 1.has(value)
```javascript
class Set {
    constructor(){
        this.items = {}
    }
    has(value){
        return this.items.hasOwnProperty(value)
    }
}
```

## 集合>方法 2.add(value)
```javascript
class Set {
    constructor(){
        this.items = {}
    }
    add(value){
        if(!this.has(value)){
            this.items[value] = value
            return true
        }
        return false
    }
}
```

## 集合>方法 3.remove(value)
```javascript
class Set {
    constructor(){
        this.items = {}
    }
    remove(value){
        if(!this.has(value)){
            delete this.items[value]
            return true
        }
        return false
    }
}
```

## 集合>方法 4. clear()
```javascript
class Set {
    constructor(){
        this.items = {}
    }
    clear(){
        this.items = {}
    }
}
```

## 集合>方法 5. size()
```javascript
class Set {
    constructor(){
        this.items = {}
    }
    size(){
        return Object.keys(this.items).length;
    }
}
```

## 集合>方法 6. values()
```javascript
class Set {
    constructor(){
        this.items = {}
    }
    size(){
        return Object.values(this.items);
    }
}
```

## 集合>方法 7. 聯集操作
### 給定兩個集合：返回一個包含兩個集合中所有元素的新集合
(這邊直接使用ES6 的set去操作)
```javascript
    const union = function(firstSet, SecondSet){
        return new Set([...firstSet, ...SecondSet])
    }
```

## 集合>方法 8. 交集操作
### 給定兩個集合：返回一個包含兩個集合中共有元素的新集合
(這邊直接使用ES6 的set去操作)
```javascript
    const intersection = function(firstSet, SecondSet){
        let intersectionSet = new Set()
        firstSet.forEach(data =>{
            if(SecondSet.has(data)){
                intersectionSet.add(data)
            }
        })
        return intersectionSet
    }
```

## 集合>方法 9. 對稱差
### 給定兩個集合，回傳兩個集合的元素，但不包含重複元素
```javascript
    const difference = function(firstSet, SecondSet){
        let differenceSet = union(firstSet, SecondSet)
        let intersectionSet = intersection(firstSet, SecondSet)
        differenceSet.forEach(data => {
            if(intersectionSet.has(data)){
                differenceSet.delete(data)
            }
        })
        return differenceSet
    }
```

## 集合>方法 10. 差集
### 給定兩個集合，回傳一個包含在第一個集合元素但不在第二個集合的集合
```javascript
    const Subtraction = function(firstSet, SecondSet){
        let subtractingSet = new Set([...firstSet])
        SecondSet.forEach(data =>{
            if(subtractingSet.has(data)){
                subtractingSet.delete(data)
            }   
        })
        return subtractingSet
    }
```



