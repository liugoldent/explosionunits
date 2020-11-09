---
{
  "title": "Strategy模式",
  "lang": "zH",
  "description": "在這篇，主要先介紹策略模式的使用與解決什麼問題",
  "meta": [{"name":"keywords", "content":"Design Pattern, strategy pattern,策略模式"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "3"
}
---
# 策略模式 Strategy Pattern

## 意圖
* 定義一系列的演算法，把他們一個個封裝起來，並且讓他們可以相互替換。策略模式讓演算法可以獨立於使用他的客戶而變化
* *根據上下文的選擇，來切換不同演算法*

## 原則
* 物件都具有職責
* 這些職責不同的具體實作是透過多型的使用而完成的
* 概念上相同的演算法具有多個不同的實作，需要進行管理
* 將演算法的選擇與演算法的實作相分離。允許根據上下文來選擇

## 效果
* 可以不使用switch語句或條件陳述式
* 必須以相同的方式呼叫所有種類的演算法（它們必須擁有相同的介面）

## UML
![策略模式](https://i.imgur.com/tlEEJTf.png)

## 適用場景
1. 想要在物件中使用各種不同的算法變體，並希望能在運行時切換code，可使用策略模式
2. 當有許多僅在執行某些行為時略有不同的類似操作時，可使用策略模式
3. 如果演算法在上下文的邏輯中不是特別重要，使用此模式可以把業務邏輯與算法細節隔離開來
4. 當類中使用了複雜的條件運算時以在同一算法的不同變體中切換時

## 實現方法
1. 從上下文的類中找出修改頻率較高的算法
2. 聲明該算法所有變體的通用策略街口
3. 將算法逐一抽取出來到各自的類中，他們都必須實現策略接口
4. 在上下文類中添加一個成員變量，用於保存策略物件的引用。然後提供設置器以修改該成員變量<br>
上下文僅可通過策略接口與策略物件進行相互交映，如果需要還可定義一個接口來讓策略訪問其數據
5. 客戶端必須將上下文類與相應策略進行關聯，使上下文策略以預期的方式完成其工作

## 優缺點
### 優點
1. 可以在運行時切換物件內的演算法
2. 可以將算法實現和使用算法的代碼隔離起來
3. 可以用組合來代替繼承
4. 封閉原則（不用更改上下文就可以引入新的政策）

### 缺點
1. 如果演算法很少發生改變，那麼不需要使用這種新的接口的策略模式
2. 客戶端需要知道並且選擇正確的策略
3. 有些時候其實不需要使用到class，現在的匿名函數即可達到此功能

## Code
```typescript
/**
 * 首先定義一個class：Context
 */
class Context {
    /**
     * 重點：你必須宣告一個私有變數:strategy（他是被介面Strategy實踐出來的）
     */
    private strategy: Strategy;

    /**
     * 通常我們會利用建構子來新增一個策略
     */
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * 而因為私有變數的關係，所以我們要用set函數來去改變這個策略
     */
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * 最後屬於演算法或商業邏輯的部分
     */
    public doSomeBusinessLogic(): void {
        // ...

        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));

        // ...
    }
}

/**
 * 在介面方面
 * 首先我們要定義好策略內容有一個演算法 
 */
interface Strategy {
    doAlgorithm(data: string[]): string[];
}

/**
 * ConcreteStrategyA 具體策略用策略介面實踐出
 */
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}
/**
 * ConcreteStrategyB 具體策略用策略介面實踐出
 */
class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

/**
 * 1. 首先new Context時，傳入的參數為-在new出一個具體策略
 * 2. 再來策略做完後，將商業邏輯提出來做
 */
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
```

## 結果
```
Client: Strategy is set to normal sorting.
Context: Sorting data using the strategy (not sure how it'll do it)
a,b,c,d,e

Client: Strategy is set to reverse sorting.
Context: Sorting data using the strategy (not sure how it'll do it)
e,d,c,b,a
```

## 參考資料
[TS 策略模式講解與代碼範例](https://refactoringguru.cn/design-patterns/strategy/typescript/example)
