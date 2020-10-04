---
{
  "title": "Tree 樹",
  "lang": "zH",
  "description": "介紹資料結構中，樹的使用",
  "meta": [{"name":"Tree", "content":"樹"}],
  "tags": ['資料結構']
}
---
# 樹

## 相關術語
1. 一個樹結構包含一系列存在父子關係的節點。每個節點都有**一個父節點**以及**0個或多個子節點**
![Tree](https://static.packt-cdn.com/products/9781785285493/graphics/B05348_08_02.jpg)
### 解釋：
1. 根節點（11）：在樹的頂部。他沒有父節點。
2. 節點分為內部節點or外部節點
    * 內部節點(internal node)：至少有一個子節點的節點（7/5/9/15/13/20）
    * 外部節點(leaf)：沒有子元素的集點稱外部節點or葉節點（3/6/8/10/12/14/18/25） 
3. 一個節點的祖先包括父節點與祖父節點（往上找）
4. 一個節點的後代包括子節點與孫子節點（往下找）
5. 子樹(subtree)：由其節點輿其後代構成（12/13/14）
6. 深度：節點深度取決於他的祖先節點數量，例如節點3有3個祖先節點（5/7/11），因此深度為3
7. 高度：取決於所有節點深度的最大值，根節點在第0層，子節點在第一層。因此上圖中的高度為3

## 二元搜尋樹or二元樹
#### Def. 二元樹：最多只能有兩個子節點：一個是左節點、一個是右節點
#### Def. 二元搜尋樹（BST）：只允許你在左側節點存放比父節點小的值，在右側節點放入比父節點大的值。

## 二元搜尋樹>骨架0
```javascript
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
}
```

## 二元搜尋樹>方法1. insert(key)
### 向樹插入一個新的鍵
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    insert(data){
        // 插入之前，當然要先new
        let newNode = new Node(data)
    
        if(this.root === null){
            // 如果此樹為空，則=root
            this.root = newNode
        }else{
            // 如果此樹非空，則實行insertNode方法
            this.insertNode(this.root,newNode)
        }
    }
    insertNode(node, newNode){
        // 第一個if判斷是，判斷是往左還是往右找
        if(newNode.key < node.key){
            // 如果左節點為空，則直接讓左節點等於newNode
            if(node.left === null){
                node.left = newNode
            }else{
                // 反之非空，則一直往下找尋節點
                insertNode(node.left,newNode)
            }
        }else{
            // 以下同理
            if(node.right === null){
                node.right = newNode
            }else{
                insertNode(node.right,newNode)
            }
        }   
    }
}
```

