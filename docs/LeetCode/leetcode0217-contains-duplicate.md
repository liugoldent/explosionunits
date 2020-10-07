---
{
  "title": "0217 - Contains Duplicate",
  "lang": "zH",
  "description": "leetcode Contains Duplicate",
  "meta": [
            {"name":"Contains Duplicate", "content":"Contains Duplicate"},
            {"name":"Contains Duplicate javascript", "content":"Contains Duplicate javascript"},
            {"name":"leetcode Contains Duplicate", "content":"leetcode Contains Duplicate"}
            ],
  "tags": ['leetcode']
}
---
# 217. Contains Duplicate
### 是否包含重複值

## 需知
#### 1. 資料結構:集合
#### 2. 陣列sort

## 敘述
給定一串數字陣列,看這串數字陣列是否有重複值

## 範例
```
Example1:
Input: [1,2,3,1]
Output: true

Example2:
Input: [1,2,3,4]
Output: false

Example3:
Input: [1,1,1,3,3,4,3,2,4,2]
Output: true
```
## 解答
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    // notice 先sort去找,會比直接用set效率更高
    nums.sort()
    for(let i=0, len = nums.length ; i < len; i++) {
        if(nums[i] == nums[i+1]) return true;
    }
    return false;
};
```
