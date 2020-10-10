---
{
  "title": "Queue 佇列",
  "lang": "zH",
  "description": "在堆疊之後，我們將要看到佇列的這種資料結構行為",
  "meta": [{"name":"Queue", "content":"佇列"}],
  "tags": ['資料結構']
}
---
# Queue 佇列

## 定義
#### 1. FIFO（先進先出）的原則
#### 2. 新添加的元素放在尾部，要移除項目從頂部移除
#### eg: 排隊

## 佇列>方法 1.enqueue(element(s))
### 向佇列尾部添加一個或多個新項目
```javascript
class Queue {
    constructor(){
        this.items = []
    }
    enqueue(element){
        this.items.push(element)
    }
}
```

## 佇列>方法 2.dequeue()
### 移除佇列第一個項目，並返回第一個項目
```javascript
class Queue {
    constructor(){
        this.items = []
    }
    dequeue(){
        return this.items.shift()
    }
}
```

## 佇列>方法 3.front()
### 返回佇列中的第一個值（不影響佇列本身）
```javascript
class Queue {
    constructor(){
        this.items = []
    }
    front(){
        return this.items[0]
    }
}
```

## 佇列>方法 4.isEmpty()
### 判斷佇列中是否包含任何元素，若為空返回true，反之則反
```javascript
class Queue {
    constructor(){
        this.items = []
    }
    isEmpty(){
        return this.items.length === 0
    }
}
```


## 佇列>方法 5.size()
### 判斷佇列的長度為何
```javascript
class Queue {
    constructor(){
        this.items = []
    }
    size(){
        return this.items.length
    }
}
```

## 優先佇列
用於諸如：頭等艙、商務艙或是婦幼這種有優先級關係的陣列
### 實作一個優先佇列有兩種方法
#### 1. 設定優先級，在正確位置插入
#### 2. 用入列操作添加元素，然後再按照優先級移除他們
```javascript
class PriorityQueue{
    constructor(){
        this.items = []
    }
    enqueue(element, priority){
        let queueElement = new QueueElement(element, priority)
        // 如果為空直接push
        if(this.isEmpty()){
            this.items.push(queueElement)
        }else{
            let added = false
            for(let i = 0 ; i < this.items.length ; i++){
                // 當佇列的priority大於插入的數值優先權時，就做事（splice插入）
                if(queueElement.priority < this.items[i].priority){
                    this.items.splice(i, 0 , queueElement)
                    added = true
                    break
                }
            }
            // 如果都沒有就直接push
            if(!added){
                this.items.push(queueElement)
            }   
        }
    }
    // 其他方法與Queue相同
}
class QueueElement {
    constructor(element, priority){
        this.element = element
        this.priority = priority
    }
}
```

## 環狀佇列
### 燙手山芋的故事，當東西傳到array第0個人手上，index = 0 就被淘汰。
```javascript
function CircleQueue(nameList, num) {
    let queue = new Queue()
    for(let i = 0 , len = nameList.length ; i < len ; i++){
        // 把資料放入queue
        queue.enqueue(nameList[i])
    }
    let eliminated = ''
    while(queue.size() > 1){
        for(let i = 0 ; i < num ; i++){
            // 因為是數字7，而且是環狀的，所以淘汰一個後，就要再加回一個 
            queue.enqueue(queue.dequeue())
        }
        // 最後把頂部的資料拿出來（達到淘汰效果）
        eliminated = queue.dequeue()
        console.log(eliminated + '被淘汰')
    }
    return queue.dequeue()
}
let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
let winner = CircleQueue(names, 7)
console.log('winner', winner)
```
