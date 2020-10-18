---
{
  "title": "JS 正規表達式",
  "lang": "zH",
  "description": "在這篇，會去介紹正規表達式的使用",
  "meta": [{"name":"keywords", "content":"js regular expression, 正規表達式, regular expression"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "3"
}
---
# JS 正規表達式-Regular Expression

## 基本理論：出現次數
* `*`：字串出現次數0次或更多
* `+`：字串出現次數1次或更多
* `?`：字串出現0次或是1次
* `{m}`：字串出現至少m次
* `{m,n}`：字串出現m到n次
* `{m,n}?`：字串出現m到n次，然後選最少次的

## 跳脫字元規則
* `\d` 等效於 `[0–9]`。反之`\D`等效於 `[^ 0-9]`
* `\w` 等效於 `[a-zA-Z0–9_]`。反之`\W`等效於 `[^a-zA-Z0–9_]`
* `\s` 等效於 `[\r\t\n\f]`（空白字元）。反之`\S`等效於 `[^\r\t\f\n]`

## 應用：驗證數字
驗證幾個號碼，{}為[]內號碼出現次數。若次數大於字串長度，則回傳null
```javascript
let a = '1023859687'

let c = a.match(/[0-9]{9}/)
console.log(c) // '102385968'

let d = a.match(/[0-9]{11}/)
console.log(d) // null
```

## 應用：驗證商品型號
```javascript
var a = 'CCC-DD-123'

let d = a.match(/[A-Z]{3}-[A-Z]{2}-[0-9]{3}/)
console.log(d) // 'CCC-DD-123'

let c = a.match(/[A-Z]{4}-[A-Z]{2}-[0-9]{3}/)
console.log(c) // null
```

## 應用：密碼 Password
* `[A-Z]+`：代表A-Z至少出現一次
* `[A-Z]*`：代表A-Z可有可無
* `[A-Z][0–9]`：代表前面為A-Z，後面為0–9。如果出現Aa9：則會報null
```javascript
let a = 'Yrt090304'
let b = a.match(/[A-Z]+[a-z]+[0-9]+/)
console.log(b) // 'Yrt090304'

let c = 'A9'
let d = c.match(/[A-Z][0-9]/)
console.log(d) // 'A9'
```

## 應用：亂碼
* `.*`：代表任意字串，任意個
* `[A-Z]+`：A-Z至少一個
* `[0–9]+`：至少一個
```javascript
let a = 'weerAdsfsd0123dfddf'
let b = a.match(/.*[A-Z]+.*[0-9]+.*/)
console.log(b) // "weerAdsfsd0123dfddf"
```

## 應用：各特殊字元與字串範例
### 1. `/^xxxx/`：代表由xxxx「開頭」
```javascript
let a = 'cyz'
let b = a.match(/^cy/) //正則表示：這個字串的開頭是否為cy?是的話回傳給我內容
console.log(b)  // 'cy'
```

### 2. `[^]`：代表否定
```javascript
let a = '123666'
let b = a.match(/[^0-9]/) //正則表示：如果這字串是不是只有數字，是（但因為否定了，故回傳null）
console.log(b) // null
```

### 3. `[\^]`：我們使用「\」來跳脫，並判斷是否有「^」特殊字元
```javascript
let a = 'ac^'
let b = a.match(/\^/)
console.log(b)  //^
```

### 4. `.`：代表「任意」字元的字串
```javascript
let a = 'ayz'
let b = a.match(/a./) //正則表示：這個字串的a後方是否有字串? 有的話給我。
console.log(b) // 'ay'
```

### 5. `$`：代表由xxx「結尾」
```javascript
let a = 'ayza'
let b = a.match(/a$/) //正則表示：這個字串結尾是否為a? 有的話給我。
console.log(b) // 'a'
```

### 6. 字串中間的比較
```javascript
let a = 'bat'
let b = a.match(/b[aeiou]t/) //正則表示：這個字串的中間是否為aeiou? 是的話給我。
console.log(b) //'bat'
```

### 7.空格的判斷
```javascript
let a = 'ac '
let b = a.match(/\s/) //正規表示：這個字串是否含空白？是的話，那給我這個空白
console.log(b) // " "
```
