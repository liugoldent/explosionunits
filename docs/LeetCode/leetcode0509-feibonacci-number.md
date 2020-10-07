---
{
  "title": "0509 - Fibonacci Number",
  "lang": "zH",
  "description": "leetcode Fibonacci Number",
  "meta": [
            {"name":"Fibonacci Number", "content":"Fibonacci Number"},
            {"name":"Fibonacci Number javascript", "content":"Fibonacci Number javascript"},
            {"name":"leetcode Fibonacci Number", "content":"leetcode Fibonacci Number"}
            ],
  "tags": ['leetcode']
}
---
# 509. Fibonacci Number
### 婓波那契數列

## 敘述
給定一個數字，求出這個數列之和

## 範例
```
Input: 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
```

```
Input: 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
```

```
Input: 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
```

以上算式，可以簡化為：
0,1,1,2,3,5,8,13,21,34,55,89,144....

## 解答
可以看到只要設定好第一項F(0) = 0 & F(1) = 1
後面就可以全用遞迴解掉
```javascript
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
  if(N === 1 || N === 0){
      return N
  }

  return fib(N-1)+ fib(N-2)

};
```
