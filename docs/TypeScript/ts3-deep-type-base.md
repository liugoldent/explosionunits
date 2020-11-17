---
{
  "title": "TypeScript 型別系統概論-深入篇",
  "lang": "zH",
  "description": "在這篇，我們來看看TypeScript 型別系統概論-深入篇",
  "meta": [{"name":"keywords", "content":"ts, ts type, type, 型別系統"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# TypeScript 型別系統概論-深入篇

## 原始型別宣告
### 基礎
```typescript
let num: number = 123

const name: string = 'Max'

const interest: string[] = ['Do', 'See']
```

### 遲滯性指派
意義：在變數宣告時，不指派型別，而延後至程式後面的某處再指派的情形
```typescript
let num: number | undefined

console.log(num)

num = 123
```
if 只有設定為 `number`
```typescript
let num: number

// 會出現：Variable 'num' is used before being assigned
console.log(num)

num = 123
```

## JSON 物件宣告
### 基礎
```typescript
type UserInfo = {
    name: string,
    age: number,
    interest: string[]
}

const info : UserInfo = {
    name: 'Max',
    age: 18,
    interest: ['Do', 'See']
}
```

### 物件的完整性
#### 無法新增
```typescript
let info = {
    name: 'Max',
    age: 18,
    interest: ['Do', 'See'] 
}

// 下面會報錯：Property 'email' does not exist on type '{ name: string; age: number; interest: string[]; }'
info.email = 'liu@hotmail.com.tw'
```

#### 無法刪除
```typescript
let info = {
    name: 'Max',
    age: 18,
    interest: ['Do', 'See'] 
}

// 下面會報錯：The operand of a 'delete' operator must be optional.
delete info.name
```

#### 可以覆寫
```typescript
let info = {
    name: 'Max',
    age: 18,
    interest: ['Do', 'See'] 
}

// 覆寫是ok的（前提是型態相同）
info.name = 'Martin'
```

### 選用屬性
意義：由於JSON物件的規範本身嚴格，因此有另一個機制「選用屬性」來讓我們創造出結構鬆散的JSON物件
```typescript
type UserInfo = {
    name: string,
    age?: number, // 注意這邊多加一個問號，即可變成選用屬性。所以這個值變成可有可無都可以
    interest: string[]
}

// 下面沒有age是可行的，因為設定「?」為可選的
let info: UserInfo = {
    name: 'Max',
    interest: ['Do', 'Else']
}
```

### 唯獨屬性
使用：使用 `readonly` 變成唯讀
```typescript
type PersonInfo = {
    name: string,
    readonly age: number,
    interest: string[]
}

let info: PersonInfo = {
    name : 'Guan',
    age: 20, 
    interest: ['Do', 'Why']
}
// 報錯：Cannot assign to 'age' because it is a read-only property
info.age = 40 
```

### 唯獨屬性-All
意義：一個一個 `readonly` 麻煩，我們直接一次 `readonly`
```typescript
type PersonInfo = {
    name: string,
    readonly age: number,
    interest: string[]
}

let info: Readonly<PersonInfo> = {
    name: 'Max',
    age: 20,
    interest: ['Do', 'While']
}
// 因為統一性唯讀，所以報錯：Cannot assign to 'age' because it is a read-only property
info.age = 40
```


## 函式型別
### 函式的型別推論
```typescript
// 推論為 number
function unversalNumber(){
    return 42
}

// 推論 42 | '42'
// 因為TS 可以將推論結果限縮到直接的明文方式顯示
function numberOrString(){
    let probability = Math.random()
    
    if(probability > 0.5){
        return 42
    }else{
        return '42'
    }
}

// 沒有回傳東西：void > 回傳的結果不重要 or 無意義
function noReturn (){
    let a = 123
}
```

### 型別註記
```typescript
// 情況一：宣告變數時註記，並將函數當成物件值
let addition1: (a: number, b:number) => number = function (a,b) {
    return a+b
}

// 情況二：宣告變數時，將函數當成物件值
let addition = function(input: number, input2: number): number {
    return input + input2
}

// 情況三：函式宣告敘述式，所以必定在輸入輸出部分加型別
function add3(a: number, b:number): number {
    return a+b
}

// 情況四：將函式當成物件值
let add4 = function(a,b){
    return a+b
}as (a:number, b:number) => number
```

### 選用參數
意義：函數也可以使用選用參數，同樣是加上「?」
#### 重點1：不能斷斷續續的使用選用參數宣告（ex：第一個參數與第三個參數加上「?」）
#### 重點2：不能放在參數中間
```typescript
function increment(input:number, input2?:number){
    return input + (input2 ? input2 : 1)
}

// 報錯：A required parameter cannot follow an optional parameter
function increment2(input?: number, input2:number, input3?:number){
    // 略
}
// 報錯：A required parameter cannot follow an optional parameter
function increment3(input: number, input2?:number, input3:number){
    // 略
}
```


### 預設參數
意義：解決了選用參數的限制，另外也比較簡潔
```typescript
// 沒有選用參數的限制了
function increment(input: number = 1, input2: number, input3: number = 3){
    return input + input2 + input3
}
```
