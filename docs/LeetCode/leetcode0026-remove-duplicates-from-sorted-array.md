---
{
  "title": "0026 - Remove Duplicates from Sorted Array",
  "lang": "zH",
  "description": "leetcode Remove Duplicates from Sorted Array js answer",
  "meta": [
            {"name":"keywords", "content":"leetcode Remove Duplicates from Sorted Array js answer,Remove Duplicates from Sorted Array"},
          ],
  "tags": ['leetcode']
}
---
# 26. Remove Duplicates from Sorted Array
### 移除同樣的元素

## 需知
#### 1. 資料結構:陣列

## 敘述
回傳一個陣列中不重複的元素個數

## 範例
```
1.
Given nums = [1,1,2],
Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.
It doesn't matter what you leave beyond the returned length.

2.
Given nums = [0,0,1,1,1,2,2,3,3,4],
Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.
It doesn't matter what values are set beyond the returned length.
```
## 解答
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // 先做錯誤處理
    if(nums.length === 1 || nums.length === 0){
        return nums.length
    }
    let i = 0
    for(let j = 0 ,len = nums.length ; j < len ; j++){
        if(nums[j] !== nums[i]){
        // 如果第j個元素不等於第i個(記得i如果沒有++,就一直在原點),就i++
            i++
        // 然後讓第i個元素等於第j個(這樣i就會等於num[j]元素,再往下迭代時,再找到不同時,就可以繼續i++)
            nums[i] = nums[j]
        }
    }
    // 最後回傳i+1(總長度)
    return i+1
};
```
