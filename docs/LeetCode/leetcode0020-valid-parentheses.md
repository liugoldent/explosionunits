---
{
  "title": "0020 - Valid Parentheses",
  "lang": "zH",
  "description": "leetcode Valid Parentheses js answer",
  "meta": [
            {"name":"keywords", "content":"leetcode Valid Parentheses js answer,Valid Parentheses"},
          ],
  "tags": ['leetcode']
}
---
# 1. Valid Parentheses

## 資料結構：Stack（堆疊）

## 敘述
給定一個字串，要求出這個字串是否都有closed

## 範例
```
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "([)]"
Output: false
```

## 解答
```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length === 0 || s.length === 1) return false

  let stack = []

  let left = ['[','{','(']
  let right = [']','}',')']
  let match = {
    ')':'(',
    '}':'{',
    ']':'['
  }

  for(let i = 0, len = s.length ; i < len ; i++){
    // 如果是左括號放進stack
    if(left.includes(s[i])){
      stack.push(s[i])
    }

    if(right.includes(s[i])){
      let stackStr = stack.pop()
        // 如果遇到右括號時，首先pop出來，然後去比較pop出來的跟目前遇到的右括號是否有相同
      if(match[s[i]] !== stackStr){
        return false
      }
    }
  }
  // 如果都相同，那全部都會被pop出來，所以length === 0
  return stack.length === 0
    
};
```
