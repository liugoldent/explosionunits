# 6. ZigZag Conversion


## 參考解題youtube
[ZigZag Conversion](https://www.youtube.com/watch?v=re-WQ14s-Kg)

## 敘述
給定一個字串，返回Z形排序

## 範例
```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
```

## 解答
### 規律
#### iteration 1 "P" row0 // if (rowx = 0) next +1
#### iteration 2 "A" row1 // 中間不用理他，因為都固定的+1 or -1
#### iteration 3 "Y" row2 // if (rowx = rowNumber-1)  next -1
#### iteration 4 "P" row1
#### iteration 5 "A" row0
#### iteration 5 "L" row1

### 邊界狀況
`numRows == 1` or `numberRow >= s.length` 就不用再比，直接回傳s
#### 原因1：長度為1直接返回
#### 原因2：要求長度大於字串長度，字串不會被改變

```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if(s.length <= numRows || numRows === 1 ){
        return s
    }
      let zigzagArray = []
      let step = 1
      let row = 0

      for(let i = 0 ,len = numRows ; i < len ; i++){
              zigzagArray.push('')
      }

      for(let i = 0 , len = s.length ; i < len ; i++){
          zigzagArray[row] += s[i]

          if(row == 0){
              step = 1
          }else if(row == numRows-1){
              step = -1
          }

          row += step
      }

      return zigzagArray.join('')
};
```
