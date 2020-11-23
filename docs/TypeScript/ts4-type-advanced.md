---
{
  "title": "TypeScript 型別系統概論-深入進階篇",
  "lang": "zH",
  "description": "在這篇，我們來看看TypeScript 型別系統概論-深入進階篇",
  "meta": [{"name":"keywords", "content":"ts, ts type, type, 型別系統"}],
  "tags": ['TypeScript'],
  "sidebarDepth": "2"
}
---
# TypeScript 型別系統概論-深入進階篇
## 元祖型別 Tuple Type
### 定義
#### 元祖擁有固定個數、固定型別順序的元素組合
```typescript
const table = [
    ['MaxWell', true, 19],
    ['Hard', false, 20],
    // 皆是 string/ boolean / number
]
```
### 差異
與陣列相比，陣列可以有任意個數、型別
```javascript
const table = [
    ['MaxWell', true, 19],
    ['Hard', {}, true],
]
```

### 型別推論
可惜的，TS無法推論出此種型別，只能推論出二維陣列
```typescript
// const table: (string | number | boolean)[][]
const table = [
    ['MaxWell', true, 19],
    ['Hard', false, 20],
]
```

### 註記機制
#### 陣列
```typescript
const table : (number | string)[] = [1, '2']
```
#### 元祖
#### 註記方式為在中括號內設定型別
數量與順序都很重要
```typescript
const table: [number , string] = [1 , '2']

// 下方型別對照報錯：Type 'string' is not assignable to type 'number'
const table2: [number , string] = ['1' , '2']

// 下方多一個數量報錯：Type '[number, string, string]' is not assignable to type '[number, string]'.
// Source has 3 element(s) but target allows only 2.
const table3: [number , string] = [1 , '2', '1']
```

## 列舉型別 Enum Type
### 定義
可以將性質類似的成員，用物件的（key）的方式匯聚起來形成的型別
### 宣告
```typescript
enum Colors { Red, Blue, Yellow}
```
### 型別推論
```typescript
enum Colors { Red, Blue, Yellow}

// 推論：let selectColor: Color
let selectColor = Colors.Red
```

### 型別註記
註記列舉型別的名字
```typescript
let selectColor: Colors = Colors.Red
```

### 自定義列舉成員
這邊要說，列舉其實是代表第index個，例如下面的console.log出來的結果（預設）
```typescript
enum Color { Red, Blue, Yellow}

let selectColor = Color.Red

console.log(selectColor) // 0
```
如果自定義enum
```typescript
// 記得是使用「=」符號
enum Color {
    Red = 123,
    Blue,
    Yellow
}

console.log(Color.Red) // 123
console.log(Color.Blue) // 124
```
#### 編譯器只會認列舉成員名稱，並不會認成員的值有沒有重複不合理的地方
再來因為列舉型別如果沒標示成員之對應值，會查看前一個列舉成員的值並進行遞增動作，所以這邊會報錯
```typescript
enum Color {
    Red = 'Red',
    Blue,
    Yellow
}
// 報錯：Enum member must have initializer
```
### 列舉禁止型態
#### 列舉只可以是數字or字串型態
```typescript
// 通通都報錯：報錯：Only numeric enums can have computed members
enum Colors {
    Red = true, // 不可為 Boolean
    Blue = null, // 不可為 null
    Yellow = { foo: 123} // 不可為物件
}
```

### 逆向映射性
#### 成員名稱與預設的值具備逆向映射性，意思是可以用值去反推成員的名稱
如果說你的enum列舉的value是數字，那你可以逆向回去確認值
```typescript
enum Colors {
    Red = 1,
    Blue = 2,
    Yellow = 3
}

console.log('Red' === Colors[1]) // Colors的[1]是 Red
```

### 常數列舉型別
基本上是說`let` & `const` 編譯出來過後的結果不同
```typescript
enum Colors { Red, Blue }
let selectedColor = Colors.Red

const enum ConstantColors {Red, Blue} 
const selectedConstantColors = ConstantColors.Red
```
編譯過後
```javascript
"use strict";
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 0] = "Red";
    Colors[Colors["Blue"] = 1] = "Blue";
})(Colors || (Colors = {}));
let selectedColor = Colors.Red;
const selectedConstantColors = 0 /* Red */; // const 會直接顯示其值
```

## 可控索引型別
### 例子
```typescript
type StringDictionary = {
    [key: string]: string
    // key 值必須為字串。value 也必須是字串
}
const obj: StringDictionary = {}
obj['Hello'] = 'World'
```
另一個key值為`number`的type
```typescript
type NumberDictionary = {
    [key: number]: number 
}
const obj2: NumberDictionary = {}
obj2[123] = 'Hello'
```
### Readonly
```typescript
type ReadOnlyStringArray = {
    readonly [key: string] : string
}
const obj: ReadOnlyStringArray = {
    'Hello': 'World'
}
console.log(obj['Hello']) // 印出 'World'
// 但是如果
obj['Hello'] = 'Hi' // 會報錯，因為唯讀
```
### type 內相同型別
```typescript
type Invalid = {
    [key: string]: string,
    length: number // 這樣會報錯，因為上面已經定義是string了
}
```
修正方法
```typescript
type Invalid = {
    [key: string]: string| number,
    length: number // 因為加了一個number型別，所以不會報錯
}
```
### 只能為數字or字串
```typescript
type Valid = {
    [key:boolean]: string| boolean // 報錯 An index signature parameter type must be either 'string' or 'number'
}
```
## 索引型別
### 定義
單純的把JSON裡的索引名稱聯集起來變成一種型別、關鍵字keyof
```typescript
type PersonalInfo = {
    name: string,
    age: number,
    interest: string[]
}
type keyOfPersonal = keyof PersonalInfo
```
另外也可以單獨取出某個型別（注意沒有keyof）
```typescript
type PersonalInfo = {
    name: string;
    age: number;
    interest: string[];
}
type keyOfPersonal = PersonalInfo['name']
```
### 為何使用
假設我們引用到的型別是來自外面的套件、或是一些專案內建的型別，但我們卻不能輕易讓JSON物件新增屬性
這時就可以用到這種索引型別

### 如何使用
#### 複合型別
```typescript
type PersonalInfo = {
    name: string;
    age: number;
    interest: string[];
}
type ExtendPersonalInfo = {
    [key in keyof PersonalInfo]: PersonalInfo[key]
} & {
    email: string
}
```
#### 簡寫
```typescript
type ExtendPersonalInfo = PersonalInfo & {email : string}
```
#### 選用屬性
```typescript
type ExtendPersonalInfo = {
    [key in keyof PersonalInfo]?: PersonalInfo[key]
} & {
    email: string
}
```
#### 唯讀屬性
```typescript
type ExtendPersonalInfo = {
    readonly [key in keyof PersonalInfo]: PersonalInfo[key]
} & {
    email: string
}
```

## 聯集複合 Union Type
### 簡單範例
```typescript
type Primitives = number | string | boolean
```
### 兩種type聯集
```typescript
type Rectangle = {
    type: 'Rectangle';
    width: number;
    height: number;
}
type Triangle = {
    type: 'Triangle';
    base: number;
    height: number;
}

type Shaped = Rectangle | Triangle
```

## 交集複合 Intersection Type
* notice: `null` & `undefined` 進行聯集，在TS稱為 `Nullable Types`
```typescript
type Rectangle = {
    type: 'Rectangle';
    width: number;
    height: number;
}
type Triangle = {
    type: 'Triangle';
    base: number;
    height: number;
}

type Shaped = Rectangle & Triangle
```
## Never 型別
### 基層型別
* Never 型別是所有型別的子集合，而任何型別都不是Never型別的子集合
### 何時發生
1. 只要程式執行不到結尾的地方就會自動推論出Never型別
2. 型別本身不可能發生時也會自動推論出Never
### 狀況
1. 無窮迴圈
```typescript
function forever(): never {
    while(true){
        // do something
    }
}
```
2. 錯誤狀況
```typescript
function throwsError(): never {
    throw new Error('Will never do')
}
```
### 聯集注意
#### 任何型別與never 做聯集都沒差，因為never 包含於任何型別內，所以有聯集等於沒有聯集
#### 任何型別與never 做交集，最後剩下never
```typescript
type Rectangle = {
    type: 'Rectangle';
    width: number;
    height: number;
}

type Shaped = Rectangle | never
// 等效於 type Shaped = Rectangle

type Shaped2 = Rectangle & never
// 等效於 type Shaped2 = never
// 因為 never 是型別的最底層
```

### 圖說

## Unknown 型別
### 注意事項
1. 基於 Any 型別的安全版本
2. 凡是使用 `Unknown` 型別的，都要強制開發者使用 斷言
### 例子
```typescript
let anyFoo : any = 123;
let unkonwnFoo: unknown = 123;

anyFoo+1;

// 報錯：Object is of type 'unknown'
unknownFoo+1;
// 修正方法：使用斷言
(unkonwnFoo as number)+1
```
### 聯集
```typescript
type T = number | unknown
// 等效於
// type T = unknown
// （因為都被unknown吸收掉了）
```
### 交集
```typescript
type T = number & unknown
// 等效於
// type T = number
// （因為都被限縮了，所以最後等於較小的型別）
```
