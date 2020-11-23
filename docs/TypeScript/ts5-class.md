---
{
  "title": "TypeScript class",
  "lang": "zH",
  "description": "在這篇，我們來看看TypeScript class",
  "meta": [{"name":"keywords", "content":"ts, ts class, class, 類別"}],
  "tags": ['TypeScript'],
  "sidebarDepth": "2"
}
---
# TypeScript class

## TS的類別語法
### 基本Class
1. 宣告類別的同時，就是在宣告新的型別 
2. 任何成員變數必須經過宣告才能用
```typescript
class Cat {
    // 初始化成員前，必須先宣告
    name: string
    breed: string
    
    constructor(name:string, breed:string) {
        this.name = name
        this.breed = breed 
    }
}
```
簡寫語法
```typescript
class Cat {
    constructor(name:string, breed:string) {
        this.name = name
        this.breed = breed 
    }
}
```
* class內的東西名稱是成員變數
* 呼叫的東西叫物件屬性

### 存取修飾子
#### public
不管類別內部or使用者建立的物件都可以使用的模式
#### private
僅限當前類別內部使用的成員
#### protected
僅限當前類別與繼承此類別的其他類別可以使用的成員
#### get
在class 內的function前定義get，以此取得private資料
#### set
在class 內的function前定義set，以此設定private資料

1. Demo
```typescript
class C{
    <public | private | protected > V:T
    constructor(參數) {
     // 初始化流程
    }
    
}
```

2. 取得私有(private)變數的方法(get)
```typescript
interface CatInterface{
    name: string
    breed: string
    noise: string
}

class Cat implements CatInterface {
    public name: string
    // 這邊定義私有變數
    private breed: string
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
    getCatClassBreed(){
        return this.breed
    }
}

let TaiwanCat = new Cat('HowHow','Fish')
// 所以這邊我們要定義一個方法來取得此breed，因為無法直接存取資料
console.log(TaiwanCat.getCatClassBreed())
```

3. 設定私有(private)變數的方法
```typescript
interface CatInterface{
    name: string
    eat: string
    noise: string
}

class Cat implements CatInterface {
    public name: string
    private eat: string
    public noise: string = 'Meow'
    
    constructor(name: string, eat: string) {
        this.name = name    
        this.eat = eat
    }
    
    public makeNoise(){
        console.log(this.noise)
    }

    public feed(something: string){
        console.log(`${this.name} is eating ${something}`)
    }
    getCatClasseat(){
        return this.eat
    }
    // 下面這個function 設定貓這個類別可以吃什麼
    setCatClasseat(newFood: string){
        this.eat = newFood
    }
}

let TaiwanCat = new Cat('HowHow','Fish')
TaiwanCat.setCatClasseat('Egg')
console.log(TaiwanCat.getCatClasseat())
```

### 靜態成員
1. 上述所說的都是實體會間接接觸到、變異的東西
2. 接下來的靜態成員就是類別本身的成員（類別屬性、類別方法）
#### 為何我們要靜態成員？
```typescript
class CashMachine {
    public currentUser? : UserAccount
    private Users: UserAccount[]:[
        {username: 'Maxwell', password: 'A', saving: 10000},
        {username: 'Martin', password: 'B', saving: 15000},
    ]
}

const machine1 = new CashMachine()  // 建立一個Users物件
const machine2 = new CashMachine()  // 再度建立一個Users物件
// 這樣會造成今天如果我有存款進去10000元，但去下一台提款機，資料又重新被new了，等於沒存到
```
#### 解決方法：使用static
```typescript
class CashMachine {
    public currentUser? : UserAccount
    static Users: UserAccount[]:[
        {username: 'Maxwell', password: 'A', saving: 10000},
        {username: 'Martin', password: 'B', saving: 15000},
    ]
}
// 這樣就不會一直被重新建構了
```
#### static 呼叫方式的改變
```typescript
// 因為變成了類別自己的成員，所以要直接呼叫
class CashMachine {
    public currentUser? : UserAccount
    static Users: UserAccount[]:[
        {username: 'Maxwell', password: 'A', saving: 10000},
        {username: 'Martin', password: 'B', saving: 15000},
    ]
    
    login(){
        // 看到這邊是直接呼叫靜態成員（因為是class自身擁有的）
        const user = CashMachine.Users
    }
}
```

### 唯讀成員
```typescript
class Cat {
    constructor(
        public readonly name: string,
        public readonly breed: string,
    ) {
        // 略
    }
}
```

### 類別繼承
1. public & protected 的成員可以被繼承
2. super 可以在子類別初始化過程，取得父類的建構子
```typescript
// 定義好 父類別的建構子
class Vehicle {
    constructor(
        public type: string, 
        private wheels: number){
    }
    info(){
        // ...
    }
}

class Car extends Vehicle {
    // 在 car的建構子中，我們放入三個參數，其中後面兩個給父類別
    constructor(
        public color :string,
        type: string,
        wheels: number
    ) {
        // super 放入父類別
        super(type, wheels)
        this.color = color
    }
    // 這邊可利用多型，複寫掉父類別的成員
    info(){
        // ..
    }
}

let baseVehicle = new Vehicle('Car', 4)
// 注意這邊給三個參數
let car = new Car('Blue', 'Motor', 5)

console.log(car.type) // 這邊因為父類別是public，所以不會出錯
console.log(car.wheels) // 這邊因為是private，所以會報錯
```

### 抽象類別
1. 此類別專門設計來被繼承的
2. 繼承該類別時，強制開發者宣告特定規格的成員
```typescript
abstract class Sorter {
    constructor(public input: any) {}
    
    abstract compare(index1: number) : boolean

    abstract swap(index2: number): boolean
}

class NumberSorter extends Sorter{
    constructor(input: number[]) {
        super(input);
    }
    // 因為繼承自抽象類別，所以這邊一定要實踐
    public compare(index1:number):boolean{
        return false;
    }
    // 因為繼承自抽象類別，所以這邊一定要實踐
    public swap(index2:number):boolean{
        return false;
    }
}
```
