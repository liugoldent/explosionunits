---
{
  "title": "0035 - Search Insert Position",
  "lang": "zH",
  "description": "leetcode Search Insert Position",
  "meta": [
            {"name":"Search Insert Position", "content":"Search Insert Position"},
            {"name":"Search Insert Position javascript", "content":"Search Insert Position javascript"},
            {"name":"leetcode Search Insert Position", "content":"leetcode Search Insert Position"}
            ],
  "tags": ['leetcode']
}
---
# 35. Search Insert Position
### 給定一個target，找出要插入的位置

## 需知
#### 1. 資料結構:陣列
#### 2. 資料結構:樹（較進階解法）

## 敘述
給定一個target，將其插入這正確位置，使其能夠成為正常排序陣列

## 範例
```
1.
Input: nums = [1], target = 0
Output: 0

2.
Input: nums = [1,3,5,6], target = 0
Output: 0
```
## 解答
1. 二元搜尋樹
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
      let left = 0, right = nums.length -1
          while(left <= right){
                // 先找出中間值，從中間劃一刀
                const middle = Math.floor((left+right)/2)
            
                // 如果剛好中間這個一刀=目標值，則直接回傳middle
                if(nums[middle] === target){
                  return middle
                // 如果目標值大於中間值，則重新定義左邊界
                }else if(nums[middle] < target){
                  left = middle + 1
                // 如果目標值小於中間值，則重新定義右邊界
                }else if(nums[middle] > target){
                  right = middle -1
                }
          }
      console.log(left, right)
      // 找不到時，就回傳左邊界or右邊界+1
      return left
};
```
2. 非常直覺的陣列解法
```javascript
var searchInsert = function(nums, target) {
    // 先push，再排序，最後找出indexOf
    nums.push(target)
    nums.sort((a,b) => a-b)
    return nums.indexOf(target)
};
```
