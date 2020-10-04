---
{
  "title": "Contains Duplicate II",
  "lang": "zH",
  "description": "leetcode Contains Duplicate II",
  "meta": [
            {"name":"Contains Duplicate II", "content":"Contains Duplicate II"},
            {"name":"Contains Duplicate II javascript", "content":"Contains Duplicate II javascript"},
            {"name":"leetcode Contains Duplicate II", "content":"leetcode Contains Duplicate II"}
            ],
  "tags": ['leetcode']
}
---
# 219. Contains Duplicate II
### 是否包含重複值part2

## 需知
#### 1. 資料結構:集合

## 敘述
找出一個陣列(nums))中之重複值,並且重複值的index要小於等於integer k

## 範例
```
Example:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
因為index = 0 or 3,但是 3-0 > 2,所以false


Example:
Input: nums = [1,2,3,1], k = 3
Output: true
因為index = 0 or 3,並且 3-0 <= 3,所以true
```
## 解答
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    let set = new Set();
    for (let i=0, len = nums.length; i < len ; i++) {
        // 因為set一定會小於k長度,所以可以直接return true
        if (set.has(nums[i])) return true;
        // 如果裡面沒有,就set.add
        set.add(nums[i])
        // 假如這邊set已經大於k了,就把set內的值砍掉
        if (set.size > k) set.delete(nums[i-k])
    }
    return false;
};
```
