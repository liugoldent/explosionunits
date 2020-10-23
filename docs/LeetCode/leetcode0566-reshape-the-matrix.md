---
{
  "title": "0566 - Reshape the Matrix",
  "lang": "zH",
  "description": "leetcode Reshape the Matrix js answer",
  "meta": [
            {"name":"keywords", "content":"leetcode Reshape the Matrix js answer,Reshape the Matrix"},
          ],
  "tags": ['leetcode']
}
---
# 566. Reshape the Matrix
### 矩陣降維

## 敘述
給定多維矩陣，要將其改變成指定維度

## 範例
```
Input: 
nums = 
[[1,2],
 [3,4]]
r = 2, c = 4
Output: 
[[1,2],
 [3,4]]
Explanation:
There is no way to reshape a 2 * 2 matrix to a 2 * 4 matrix. So output the original matrix.
```

```
Input: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
Output: 
[[1,2,3,4]]
Explanation:
The row-traversing of nums is [1,2,3,4]. The new reshaped matrix is a 1 * 4 matrix, fill it row by row by using the previous list.
```

## 解答
```javascript
/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
    // 如果維度不相當，就可以直接return 原值了
    if(nums.length *nums[0].length  !== r*c){
        return nums
    }
    // 創建一個r維陣列
    let reshapeArray = Array(r)
    let index = 0
    for(let i = 0 , len = r ; i < len ; i++){
        // 然後因為JS沒有二維陣列，所以在第一層for loop 就要先填滿c欄長度
        reshapeArray[i] = Array(c).fill(0)
        for(let j = 0 , lenj = c ; j < lenj ; j++){
            // 最後填值進入多維矩陣
            // [Math.floor(index/(nums[0].length))]：控制在第幾列
            // [index % nums[0].length]：控制在第幾欄
            reshapeArray[i][j] = nums[Math.floor(index/(nums[0].length))][index % nums[0].length]
            index++
        }
    }
    return reshapeArray
    
};
```
