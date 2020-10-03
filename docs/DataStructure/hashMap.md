---
{
  "title": "HashMap 雜湊表",
  "lang": "zH",
  "description": "介紹資料結構中，雜湊表的使用",
  "meta": [{"name":"hashmap", "content":"雜湊表"},{"name":"hashTable", "content":"雜湊表"}],
  "tags": ['資料結構']
}
---
# 雜湊表

## 定義
HashMap or HashTable 是 Dictionary類別中的一種雜湊表表示方式
1. 優點：快速在資料結構中找到一個值

## 雜湊表> 骨架0
```javascript
class HashTable{
    constructor(){
        this.table = []
    }
}
```

## 雜湊表> 雜湊函數
```javascript
class HashTable{
    constructor(){
        this.table = []
    }
    HashCode(key){
        // 因為要得到一個雜湊值，需要先經過一個雜湊函數
        // 此值先為0
        let hash = 0
        for(let i = 0 , len = key.length ; i < len ; i++){
            // 跑foo loop 把每一個key值的字元轉換為ASCII
            hash += key.charCodeAt(i)
        }
        // 加總後return hash%一個常數（此常數可為任意值）
        return hash%37
    }
}
```

## 雜湊表>方法 1.put(key,value)
### 向雜湊表新增一個項目（也能更新雜湊表）
```javascript
class HashTable{
    constructor(){
        this.table = []
    }
    HashCode(key){
        let hash = 0
        for(let i = 0 , len = key.length ; i < len ; i++){
            hash += key.charCodeAt(i)
        }
        return hash%37
    }
    put(key, value){
        //  注意會先將key值傳給HashCode function
        let position = this.HashCode(key)
        this.table[position] = value
    }
}
```
```javascript
let c = new HashTable()
c.put('Hot','Dog')
console.log(c)
// 出現 眾多undefined是正常的，因為雜湊的其他地方是undefined
// [object Object] {
//   table: [undefined, undefined, undefined, "Dog"]
// }
```

## 雜湊表>方法 2. remove(key)
### 對雜湊表移除一個值
```javascript
class HashTable{
    constructor(){
        this.table = []
    }
    HashCode(key){
        let hash = 0
        for(let i = 0 , len = key.length ; i < len ; i++){
            hash += key.charCodeAt(i)
        }
        return hash%37
    }
    remove(key){
        //  當然移除時，也是要先轉化為雜湊編號
        this.table[this.HashCode(key)] = undefined
    }
}
```

## 雜湊表>方法 3.get(key)
### 得到雜湊表上的值
```javascript
class HashTable{
    constructor(){
        this.table = []
    }
    HashCode(key){
        let hash = 0
        for(let i = 0 , len = key.length ; i < len ; i++){
            hash += key.charCodeAt(i)
        }
        return hash%37
    }
    get(key){
        //  當然get時，也是要先轉化為雜湊編號
        return this.table[this.HashCode(key)]
    }
}
```

## 雜湊表> 更高階的雜湊函數
### 有時你會發現一個key值，會對應到多個value，這時解法可以用一些更好的雜湊函數去解
```
eg:
19 - Gandalf
29 - John
16 - Tyrion
16 - Aaron
13 - Donnie
```

### djb2
```javascript
class HashTable{
    constructor(){
        this.table = []
    }
    HashCode(key){
        // 初始化一個hash變數，並賦值為一個質數
        let hash = 5381
        for(let i = 0 , len = key.length ; i < len ; i++){
            // 跑foo loop 把每一個key值的字元轉換為ASCII，並且加上hash code
            hash += hash*33 + key.charCodeAt(i)
        }
        // 最後我們利用相加的和與另一個質數去做餘數處理得到結果
        return hash%1013
    }
}
```

## 參考資料
[Javascript 雜湊表](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/141231/#outline__4_7)
