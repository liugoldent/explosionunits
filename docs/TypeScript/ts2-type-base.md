---
{
  "title": "TypeScript 型別系統概論",
  "lang": "zH",
  "description": "在這篇，我們來看看TypeScript 型別系統概論",
  "meta": [{"name":"keywords", "content":"ts, ts type, type, 型別系統"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---

# TypeScript 型別系統概論
## 型別推論與註記
### 核心觀念
* 有被標示註記的變數或函式等，就會以靜態的方式偵測有沒有型別衝突方面的錯誤
* 沒有被標示或註記的店數或函式，就會以運算結果來判斷其型別
#### notice
* 通常積極註記是為了限縮型別的各種可能性，使得程式碼可以減少要處理的例外狀況個數
* 如果某段或程式碼本身就已經很直覺可以判斷型別，那推論即可
### 適時註記、適時推論
```typescript
let something = 124
// 輸入型別
function addSomething(x: number){
    return x+something
}
// 定義變數的型別
const result: number = addSomething(456)
```

## 註記 vs 斷言
### 註記
#### 目的：告訴編譯器，任何被註記到的變數、函式參數等都要遵照註記後的變數型別
```typescript
// 基本註記
let rendomNumber: number = Math.random()

// 函式：1. 參數可以有類似的註記方式標明輸入的參數型別。2. 函式宣告結尾也可以註記該函數的輸出型別
// eg1. 
function isPositive(input: number): boolean{
    return input > 10
}
// eg2.
// notice：因為在宣告變數時已經用過一次冒號，所以後方的function型別輸出設定為箭頭函式
const isPositive2:(input: number) => boolean = function(input){
    return input > 10
} 

// eg3.
// 這種方式也可以設定一個function（比較直覺）
const isPositive3 = function(input: number): boolean{
    return input > 0
}
```

### 斷言
#### 語意：變數本身被指派給某個型別的值
#### 關鍵字：`as`、`<T>(...)`
#### 情境：沒辦法推論某表達式的確切運算結果之型別時，才會選擇使用斷言
#### 實境：取得第三方資源，其回傳未知結果的函式
#### 限制：只能用在表達式上
#### 注意：斷言無視於靜態分析的結果，果斷地告訴編譯器，被斷言後的表達式就是某型別
```typescript
// returnUnknown 為第三方，但我們已知其回傳內容為數字，所以斷言為數字
const aNumber = returnUnknown() as number;

// eg2.
const isPositive = (input => input>0) as (input: number) => boolean

// eg3.
const isPositive1 = <(input: number) => boolean>(input => input > 0)
```

## 敘述式與表達式
* 敘述式：程式運行 > if...else、for、while + 賦值
* 表達式：程式運算的流程
* 敘述式不會回傳值，表達式
#### 敘述式
```typescript
if(true) {
    ...
}
// 指派敘述式
const foo = 123
```
#### 表達式
```javascript
1 + 2*3
```

#### * 表達式不一定是單行運算流程形式展現，其中立即呼叫函式表達式（IIFE）就是一種案例
```typescript
const status = (function(myAge){
                    if(myAge < 18){
                        return 'YoungSter'
                    }
                    return 'Adult'
                })(16)
```

## 只能用在表達式的斷言
```typescript
// 運算表達式
(foo + bar * baz) as number
<number>(foo + bar * baz)

// 邏輯表達式
(isPositive(num) && isEven(num)) as boolean
<boolean>(isPositive(num) && isEven(num))

// 三元運算
(myAge < 18 ? 'Youger' : 'Old') as string
<string> (myAge < 18 ? 'Youger' : 'Old')

// 函式內部
someFunction(foo as number, bar as number) as boolean
<boolean>someFunction(<number>foo, <number>bar)
```

## TS 型別種類
### 基礎型別
* `number`
* `string`
* `boolean`
* `undefined`
* `null`
* `void`
* `symbol`

### 物件型別
#### 物件
```typescript
const info :{
    name: string,
    age: number,
    interest: string[] // 注意這邊用到陣列的型別
} = {
    name: 'Max',
    age: 19, 
    interest: ['age','hi']
}
```
### Date
```typescript
const foo: Date = new Date('2020-01-01')
```

### TS提供型別
* `Tuple`
* `Enum`

### 特殊型別
* `any`：建議不要使用
* `never`：
* `unknown`：較為安全的不確定性存在的代表型別，主要用來替代`any`型別

### 進階型別
#### 泛型：將參數自身參數化
意思：輸入什麼型別，輸出就是什麼型別
```typescript
// 記得 echo 後面要加 <T> 這個參數
function echo<T>(something: T): T{
    return something
}

const abc = echo(123)
console.log(abc)
```

#### 可控索引型別
意思： 鎖定物件的鍵值對型別
```typescript
const dictionary: {[key: string]: string} = {
  name: 'Maxwell',
  description: 'Will'
}
```

#### 索引型別
意思： 動態檢測某鍵值對物件有沒有正確使用到該物件的屬性
```typescript
const dictionary: {[key: string]: string} = {
  name: 'Maxwell',
  description: 'Will'
}
let info : keyof dictionary
```

#### 複合型別
意思： 透過 `&` or `|` 將型別集合起來
```typescript
let dictionary: number | string 
```

### 型別化名
意思：將型別or 型別的組合取一個新的名字概念
```typescript
// 將 UserInfo 變為一個型別
type UserInfo = {
    name: string,
    age: number,
    interest: string[]
}

const info: {
    name: string,
    age: number,
    interest: string[]
}= {
    name: 'Max',
    age: 18,
    interest: ['Do', 'See']
}

// 可以簡化為
const info1 : UserInfo = {
    name: 'Max',
    age: 18,
    interest: ['Do', 'See']
}
```
