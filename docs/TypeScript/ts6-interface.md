---
{
  "title": "TypeScript Interface",
  "lang": "zH",
  "description": "在這篇，我們來看看TypeScript Interface",
  "meta": [{"name":"keywords", "content":"ts, ts interface, interface, 介面"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# TypeScript Interface

## 介面基礎
### 定義
1. 將複雜的系統套上人性化的介面
2. 類似抽象化的概念，將複雜的流程簡化的過程
:::tip
將複雜系統簡化的過程叫抽象畫
將複雜系統簡化的結果叫做介面
:::

### 目標
1. 著重於描述物件的類別規格
2. 實作規格，不包含實作過程與內容

### 使用
```typescript
interface Cat {
    name:string
    breed:string
    noise:string

    // 普通成員方法的規格，使用函式型別格式
    makeNouse():void
    feed(something: string):void

    // 選用屬性
    owner?: PersonalInfo

    // 唯讀屬性
    readonly sex: 'Male' | 'Femal'

    // 可控索引型別
    [key:string]: string

    // 單純宣告函式
    (operand1: any, operand2: any): any
}
```

## 介面展延與融合
### 展延
```typescript
interface PersonalInfo {
    name: string
    age: number
    interest: string[]
}
interface UserAccount extends PersonalInfo {
    email: string
    password: string
    subscribed: boolean
}
// 因此最後 UserAccount 介面會相等於
interface UserAccount  {
    // PersonalInfo 來的介面
    name: string
    age: number
    interest: string[]

    email: string
    password: string
    subscribed: boolean
}
```
另外也可以同時 extends兩個介面
```typescript
interface UserAccount extends PersonalInfo, SocialLinks {
    // 規格內容
}
```
### 融合
只會發生在相同interface中
```typescript
interface PersonalInfo {
    name: string,
    age: number,
    interest: string[]
}

interface PersonalInfo {
    gender: 'Male' | 'Female'
    married: boolean
}
```
但假如命名有衝突就會報錯
```typescript
interface PersonalInfo {
    name: string,
    age: number,
    interest: string[]
}

interface PersonalInfo {
    gender: 'Male' | 'Female'
    married: boolean
    name: number, // 注意這行會報錯，因為上面已經定義了name為string
}
```

## 類別實踐介面
1. 類別必須宣告介面內規格為開放狀態的成員
### 實踐介面範例
```typescript
// 首先定義一個介面
interface CatInterface{
    name: string
    breed: string
    noise: string
    
    makeNoise(): void
    feed(something: string): void
}

// 再來用一個class 來實踐這個介面
class Cat implements CatInterface {
    public name: string
    public breed: string
    public noise: string = 'Meow'
    
    constructor(name: string, breed: string) {
        this.name = name    
        this.breed = breed
    }
    
    public makeNoise(){
        console.log(this.noise)
    }

    public feed(something: string){
        console.log(`${this.name} is eating ${something}`)
    }
}
```

### 公式
1. 實踐介面
```typescript
class C implements I1,I2{

}
```
2. 繼承後實踐介面
```typescript
class C extends D implements I1, I2{

}
```
:::tip
子類別只能繼承一個父類別
任何類別的宣告都可以實踐多個介面
:::
