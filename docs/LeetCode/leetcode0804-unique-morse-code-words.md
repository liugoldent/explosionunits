# 804. Unique Morse Code Words
### 求出獨特的摩斯密碼

## 需知
#### 1. 資料結構:集合
#### 2. 字串切割處理

## 敘述
給定一串字串陣列,求出轉換之摩斯密碼集合

## 範例
```
Example:
Input: words = ["gin", "zen", "gig", "msg"]
Output: 2
Explanation: 
The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."

There are 2 different transformations, "--...-." and "--...--.".
```
## 解答
因為此題已經是完全對應好的,a~z to morse code,所以可以直接設定鍵值對,讓他去match
```javascript
/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function(words) {
    let charMap = { 
                "a":".-",
                "b":"-...",
                "c":"-.-.",
                "d":"-..",
                "e":".",
                "f":"..-.",
                "g":"--.",
                "h":"....",
                "i":"..",
                "j":".---",
                "k":"-.-",
                "l":".-..",
                "m":"--",
                "n":"-.",
                "o":"---",
                "p":".--.",
                "q":"--.-",
                "r":".-.",
                "s":"...",
                "t":"-",
                "u":"..-",
                "v":"...-",
                "w":".--",
                "x":"-..-",
                "y":"-.--",
                "z":"--.."
                }
    let newArray = []
    for(let i = 0 , len = words.length ; i < len ; i++){
        let la_newString = words[i].split('')
        let finalOutputString = ''
        for(let j = 0 , lenj = la_newString.length ; j < lenj ; j ++){
            finalOutputString += charMap[la_newString[j]]
        }
        newArray.push(finalOutputString)
    }
    newArray = new Set(newArray)
  return  newArray.size
};
```
