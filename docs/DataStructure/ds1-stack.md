---
{
  "title": "Stack 堆疊",
  "lang": "zH",
  "description": "首先了解堆疊的定義與使用，最後我們用JS去實現堆疊",
  "meta": [{"name":"Stack", "content":"堆疊"}],
  "tags": ['資料結構']
}
---
# Stack 堆疊

## 定義
#### 1. LIFO（後進先出）的有序集合
#### 2. 新添加的元素都在堆疊的頂部，也就是新元素都在頂部，舊元素都在底部
#### eg: 餐廳堆放的盤子

## 堆疊>方法 1.push(element(s))
### 添加一個新元素到堆疊頂部
```javascript
class Stack {
    constructor(){
        this.items = []
    }
    push(element){
        this.items.push(element)
    }
}
```

## 堆疊>方法 2. pop()
### 移除堆疊頂部的元素，同時返回被移除的元素
```javascript
class Stack {
    constructor(){
        this.items = []
    }
    pop(){
        this.items.pop()
    }
}
```

## 堆疊>方法3. peek()
### 返回堆疊頂部的元素，不對堆疊做修改（不會移除任何堆疊頂部的元素，僅返回它）
```javascript
class Stack {
    constructor(){
        this.items = []
    }
    peek(){
        return this.items[this.items.length -1]
    }
}
```

## 堆疊>方法4. isEmpty()
### 如果堆疊為空則返回true, 如果不為空則返回false
```javascript
class Stack {
    constructor(){
        this.items = []
    }
    isEmpty(){
        return this.items.length === 0
    }
}
``` 


## 堆疊>方法5. clear()
### 移除堆疊內所有的元素
```javascript
class Stack {
    constructor(){
        this.items = []
    }
    clear(){
        this.items = []
    }
}
``` 



## 堆疊>方法6. size()
### 看這個堆疊的大小
```javascript
class Stack {
    constructor(){
        this.items = []
    }
    size(){
        return this.items.length
    }
}
``` 
