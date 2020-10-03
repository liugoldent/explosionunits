# 27. Remove Element
### 移除一個給定的元素(注意不可使用另一個陣列來解題)

## 需知
#### 1. 資料結構:陣列

## 敘述
給定一個val,須將陣列中的這個val去掉,並回傳去掉val後的array

## 範例
```
1.
Given nums = [3,2,2,3], val = 3,
Your function should return length = 2, with the first two elements of nums being 2.
It doesn't matter what you leave beyond the returned length.

2.
Given nums = [0,1,2,2,3,0,4,2], val = 2,
Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.
Note that the order of those five elements can be arbitrary.
It doesn't matter what values are set beyond the returned length.
```
## 解答
```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(let i = 0, len = nums.length ; i < len ; i++){
        // 如果值相等
        if(nums[i] === val){
        // 就要刪除掉一個元素
            nums.splice(i,1)
            i--
        }
    }
    return nums.length
};
```
