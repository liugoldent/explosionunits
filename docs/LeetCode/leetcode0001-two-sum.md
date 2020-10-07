---
{
  "title": "0001 - Two Sum",
  "lang": "zH",
  "description": "leetcode two sum",
  "meta": [
            {"name":"two sum", "content":"two sum"},
            {"name":"two sum javascript", "content":"two sum javascript"},
            {"name":"leetcode two sum", "content":"leetcode two sum"}
            ],
  "tags": ['leetcode']
}
---
# 1. Two Sum

## 敘述
給定一個陣列與target數字，要在陣列中找出和為目標值的那兩個整數，並返回index

## 範例
```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

## 解答
主要使用hashMap 來解這題。
`hashMap存入{ array的value : arrau 的index}`
哈希表的時間複雜度為O(1)，array時間複雜度O(n)
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = {}
    for(let i = 0, len = nums.length ; i < len ; i++){
        let difference = target - nums[i]
        if(difference in map){
            return [map[difference],i] 
        }
        map[nums[i]] = i
    }
};
```
