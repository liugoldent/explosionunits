---
{
  "title": "JS 常用方法",
  "lang": "zH",
  "description": "在這篇，我們來看看一些JS常用的方法",
  "meta": [{"name":"keywords", "content":"js methods, js join, js split, js array to string , js array to object"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2",
}
---

# JS 常用方法
## Array to Object（陣列轉物件）
### Object.assign()
```javascript
let oriArray = ['a','b','c']

let convertoObject = Object.assign({},oriArray)

console.log(convertoObject)

// [object Object] {
//   0: "a",
//   1: "b",
//   2: "c"
// }
```

### for loop
```javascript
let oriArray = ['a','b','c']

let convertObject = {}

for(let i = 0 , len = oriArray.length ; i < len ; i++){
  convertObject[i] = oriArray[i]
}

console.log(convertObject)

// [object Object] {
//   0: "a",
//   1: "b",
//   2: "c"
// }
```

### reduce
```javascript
let oriArray = ['a','b','c']

// 注意第三個參數是index
// curr 為現在的內容
let convertObject = oriArray.reduce((accu, curr, i)=>{
  accu[i] = curr
  return accu
},{})

console.log(convertObject)

// [object Object] {
//   0: "a",
//   1: "b",
//   2: "c"
// }
```

## Array to String（陣列轉字串）

### Array.toString()
```javascript
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```

### Array.join()
```javascript
let a = [1,2,3]
console.log(a.join()) // 預設為逗號 > "1,2,3"

console.log(a.join('')) // 設定為'' > "123"
```

## String to Array（字串轉陣列）

### split()
```javascript
let a = [1,2,3]
let b = a.join()
console.log(b) // "1,2,3"
console.log(b.split(',')) // 設定,為切割方式 > ["1", "2", "3"]
console.log(b.split()) // ["1,2,3"] 什麼都沒設定就會直接轉陣列
console.log(b.split('')) // ["1", ",", "2", ",", "3"] 如果給空就會一個字元就分裂一次
```

## 如何反轉字串

### split to Array and Reverse
```javascript
function reverseString(str) {
    // Step 1. 先將字串分裂出來成陣列（使用split('')）
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. 將陣列reverse()
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. 使用join 合併
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
 
reverseString("hello");
```

### for loop reverse
```javascript
function reverseString(str) {
    // Step 1. 首先創造一個空字串
    var newString = "";
 
    // Step 2. 遍尋字串（從尾巴回來）
    for (var i = str.length - 1; i >= 0; i--) { 
        newString += str[i]; // or newString = newString + str[i];
    }
    /* Here hello's length equals 5
        For each iteration: i = str.length - 1 and newString = newString + str[i]
        First iteration:    i = 5 - 1 = 4,         newString = "" + "o" = "o"
        Second iteration:   i = 4 - 1 = 3,         newString = "o" + "l" = "ol"
        Third iteration:    i = 3 - 1 = 2,         newString = "ol" + "l" = "oll"
        Fourth iteration:   i = 2 - 1 = 1,         newString = "oll" + "e" = "olle"
        Fifth iteration:    i = 1 - 1 = 0,         newString = "olle" + "h" = "olleh"
    End of the FOR Loop*/
 
    // Step 3. return 新字串
    return newString; // "olleh"
}
 
reverseString('hello');
```

### 遞迴
```javascript
function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str.charAt(0);
}
reverseString("hello");
```

## 參考資料
1. [Three Ways to Reverse a String in JavaScript](https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/)
