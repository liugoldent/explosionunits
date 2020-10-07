---
{
  "title": "Tree 樹",
  "lang": "zH",
  "description": "在這章主要會講樹的基本術語，以及二元樹和二元搜尋樹",
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
        if(newNode.data < node.data){
            // 如果左節點為空，則直接讓左節點等於newNode
            if(node.left === null){
                node.left = newNode
            }else{
                // 反之非空，則一直往下找尋節點
                this.insertNode(node.left,newNode)
            }
        }else{
            // 以下同理
            if(node.right === null){
                node.right = newNode
            }else{
                this.insertNode(node.right,newNode)
            }
        }   
    }
}
```

## 二元搜尋樹> 方法2. Search(data)
### 對一棵樹去做search，有則回傳true，無則false
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    search(val) { 
        // 如果這個樹是空的，就return null
        if(!this.root) return undefined
        let current = this.root,
            found = false
        // 如果輸入資料小於節點資料，就往左邊找。大則往右邊找
        while(current && !found){
            if(val < current.data){
                current = current.left
            }else if(val > current.data){
                current = current.right
            }else{
                found = true
            }
        }
        if(!found) return 'Nothing Found'
        return current
    } 
}
```

## 二元搜尋樹> 方法3. min()
### 對一棵樹去做search，找出最小值
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    min(){
        // 搜尋最小值的方法：允許我們從任何一個節點去尋找最小的鍵
        return this.minNode(this.root)
    }
    minNode(node){
        if(node){
            // 因為是找最小，所以一直往左邊，直接寫死left就好
            while(node && node.left !== null){
                node = node.left
            }
            return node.data
        }
        return null
    }
    findMinNode(node){
        if(node.left === null){
            return node
        }else{
            return this.findMinNode(node.left)
        }
    }
}
```

## 二元搜尋樹> 方法4. max()
### 對一棵樹去做search，找出最大值
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    max(){
        // 搜尋最大值的方法：允許我們從任何一個節點去尋找最大的鍵
        return this.maxNode(this.root)
    }
    maxNode(node){
        if(node){
            // 因為是找最大，所以一直往右邊，直接寫死right就好
            while(node && node.right !== null){
                node = node.right
            }
            return node.data
        }
        return null
    }
}
```

## 二元搜尋樹> 方法5. inOrderTraverse()
### 中序遍歷（以升冪順序訪問BST所有節點，也就是從小到大，排序操作）
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    inOrderTraverse(callback){
            this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback){
        if(node !== null){
        // 注意這邊，從root開始找，然後如果node.left == null，就會往下做，就不會再呼叫自己一次了
        this.inOrderTraverseNode(node.left, callback)
        callback(node.data)
        // 在這邊要往右找節點，同樣如果node遇到null 時，就會callback console.log印出來
        this.inOrderTraverseNode(node.right, callback)
        }
    }
}
let tree = new BinarySearchTree()
tree.insert(7)
tree.insert(3)
tree.insert(5)
tree.insert(6)
tree.insert(8)
tree.insert(9)
tree.insert(10)
tree.insert(11)
tree.insert(12)
tree.insert(13)
tree.insert(14)
tree.insert(15)
tree.insert(18)
tree.insert(20)
tree.insert(25)
tree.inOrderTraverse(printNode)
```

## 二元搜尋樹> 方法6. preOrderTraverse
### 先序遍歷（先找自己，然後左邊節點先遍歷完，再換右邊節點）
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root, callback)
    }
    preOrderTraverseNode(node,callback){
        if(node !== null){
            // 先訪問節點本身
            callback(node.data)
            // 再往左找，最後往右找
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }
}
```

## 二元搜尋樹> 方法7. postOrderTraverse
### 後序遍歷（左邊節點先遍歷完，再換右邊節點，最後是父節點）
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode(node,callback){
        if(node !== null){
            // 再往左找，最後往右找
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            // 最後節點本身
            callback(node.data)
        }
    }
}
```
## 二元搜尋樹> 方法8. remove
### 刪除節點
```javascript
class BinarySearchTree {
    constructor(){
        // root of a binary seach tree 
        this.root = null
    }
    remove(val){
        this.root = this.removeNode(this.root, val)
    }
    removeNode(node, val){
        // 如果原本樹就為空，則直接 return null
        if(node === null){
            return null
        }
        // 如果資料小於節點資料，就遞迴往下做
        if(val < node.data){
            node.left = this.removeNode(node.left, val)
            // 記得遞迴之後return 的 node 會回來做事
            return node
        }else if(val > node.data){
            node.right = this.removeNode(node.right, val)
            return node
        }else{
            // 當左右兩邊節點為空時，則做這邊
            if(node.left === null && node.right === null){
            node = null
            return node
        }
        // 如果左邊的節點為空，則直接讓他等於right的
        if(node.left === null){
            node = node.right
            return node
        }else if(node.right === null){
        // 反之相同
            node = node.left
            return node
        }
    
        // 最後是如果是下面有兩個以上的節點
        
        // 1. 首先先找到右子樹最小的節點
        let aux = this.findMinNode(node.right)
        // 2. 然後讓這個最小的節點的值，等於目前節點的值
        node.data = aux.data
        // 3. 但是這樣相等後，會有重複值，所以需要刪除最小的點
        node.right = this.removeNode(node.right, aux.data)
        // 最後return node
        return node
        }
    }
}
```

## 參考資料
1. [Implementation of Binary Search Tree in Javascript](https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/)
2. [Binary Search Trees Through JavaScript](https://www.digitalocean.com/community/tutorials/js-binary-search-trees)
