---
{
  "title": "Add Two Numbers",
  "lang": "zH",
  "description": "leetcode Add Two Numbers",
  "meta": [
            {"name":"Add Two Numbers", "content":"Add Two Numbers"},
            {"name":"Add Two Numbers javascript", "content":"Add Two Numbers javascript"},
            {"name":"leetcode Add Two Numbers", "content":"leetcode Add Two Numbers"}
            ],
  "tags": ['leetcode']
}
---
# 2. Add Two Numbers

## 敘述
::: warning
建議：需要了解鏈結串列是什麼，再來做此題。
:::
給定兩個Linked List，分別代表兩個可能不同長度的數字，我們要回傳一個相加的結果

## 範例
```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```

## 步驟
### 1. 首先初始設定
```javascript
let list = new ListNode(0)
let result 
let carry = 0
```
### 2. 設定什麼時候結束迴圈
當 `l1 == null || l2 == null || carry > 0` 時迴圈結束。其他則備註於程式碼中


## 解答
  ```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let list = new ListNode(0)
    // list.val = 0
    // list.next = null
    let result = list
    let carry = 0
    
    while(l1 || l2 || carry > 0){
        let sum = 0
        
        if(l1 !== null){
            sum += l1.val
            l1 = l1.next
        }
        
        if(l2 !== null){
            sum+= l2.val
            l2 = l2.next
        }
        
        sum += carry // 上面加完後，再加上進位
        list.next = new ListNode(sum % 10)  // list.next = 3 (假定sum = 23)
        carry = parseInt(sum / 10)
        
        list = list.next // 鏈結串鏈向後跑一格
    }
    return result.next // 因為第一個是0，所以從next開始return 
};
```
