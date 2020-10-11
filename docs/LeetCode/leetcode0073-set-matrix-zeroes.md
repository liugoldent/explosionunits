---
{
  "title": "0073 - Set Matrix Zeroes",
  "lang": "zH",
  "description": "leetcode Set Matrix Zeroes",
  "meta": [
            {"name":"Set Matrix Zeroes", "content":"Set Matrix Zeroes"},
            {"name":"Set Matrix Zeroes javascript", "content":"Set Matrix Zeroes javascript"},
            {"name":"leetcode Set Matrix Zeroes", "content":"leetcode Set Matrix Zeroes"}
            ],
  "tags": ['leetcode']
}
---
# 73. Set Matrix Zeroes

## 需知
#### 1. 資料結構:陣列
#### 2. 資料結構:集合

## 敘述
給定一個二維陣列，讓陣列元素為0的col/row，為0

## 範例
```
1.
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

2.
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```
## 解答
1. for暴力解
```javascript
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
	try {
		let zeroIndex = [] // 為0所在的row/col
		let includeZeroIndex = [] // 哪列有包含著0
		for (let i = 0, len = matrix.length; i < len; i++) {
			if (matrix[i].includes(0)) {
				includeZeroIndex.push(i)
				for (let j = 0, len = matrix[i].length; j < len; j++) {
					if (matrix[i][j] === 0) {
						zeroIndex.push(j)
					}
				}
			}
		}
        // 如果每列都沒有0，則return 原陣列
		if (zeroIndex.length === 0) return
		for (let i = 0, len = matrix.length; i < len; i++) {
            // 如果那列不包含0，則讓特殊元素為0
			if (!includeZeroIndex.includes(i)) {
				for (let j = 0, len = zeroIndex.length; j < len; j++) {
					matrix[i][zeroIndex[j]] = 0
				}
			} else {
			    // 如果那列包含著0，則所有元素為0
				for (let j = 0, len = matrix[i].length; j < len; j++) {
					matrix[i][j] = 0
				}
			}
		}

		console.log(matrix)
	} catch (e) {
		console.error(e.message)
	}
};
```
2. 使用集合
```javascript
var setZeroes = function (matrix) {
	try {
		const rows = matrix.length
		const columns = matrix[0].length

		const zeroRow = new Set()
		const zeroCol = new Set()

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				if (matrix[i][j] === 0) {
                    // 如果當前元素為0，則讓集合add這個 col/row
					zeroRow.add(i)
					zeroCol.add(j)
				}
			}
		}
        // 途中做一個錯誤處理，讓效率更高
        if(zeroRow.size === 0) return 
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
                // 當集合內有值時，代表這個位置的元素要為0
				if (zeroRow.has(i) || zeroCol.has(j)) {
					matrix[i][j] = 0
				}
			}
		}
	} catch (e) {
		console.error(e.message)
	}
};
```
