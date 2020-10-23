---
{
  "title": "0283 - Move Zeroes",
  "lang": "zH",
  "description": "leetcode Move Zeroes js answer",
  "meta": [
            {"name":"keywords", "content":"leetcode Move Zeroes js answer,Move Zeroes"},
          ],
  "tags": ['leetcode']
}
---
# 283. Move Zeroes
### 移動為0的數字

## 敘述
給定一串陣列，要把為0的值放到最後（只能使用原陣列，不得新增陣列）

## 範例
```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```

## 解答
```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    if(nums.length === 0 || nums.length === 1) return 
    // 先設定一個起始idx
    let idx = 0
    for(let i = 0, len = nums.length ; i < len ; i++){
        // 跑迴圈一次，將不為0的值放進來
        if(nums[i] != 0){
            nums[idx] = nums[i]
            idx++
        }
    }
    // 最後跑while，補齊為0的值
    while(idx < nums.length ){
        nums[idx] = 0
        idx++
    }
};
```
