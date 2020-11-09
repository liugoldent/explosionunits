---
{
  "title": "Factory Method模式",
  "lang": "zH",
  "description": "在這篇，主要先介紹工廠方法模式",
  "meta": [{"name":"keywords", "content":"Design Pattern,Factory Method Pattern,"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "3"
}
---
# 工廠方法模式 Factory Method Pattern

## 意圖
是一種創建型的設計模式，其在父類中提供一個創建物件的方法，讓子類自己決定實例化哪一個工廠類<hr>
**工廠模式使創建過程延遲到子類進行**<hr>
hint:
1. 工廠父類負責定義創建產品的公共接口
2. 工廠子類負責生產具體的產品物件

## 組成
### 1. 物件介面（Product）
#### 抽象產品
工廠方法模式創建的物件的超類，也就是所有產品類的共同父親or共同擁有窗口。在實際應用中，此角色通常為抽象類
### 2. 物件實作（ConcreteProduct）
#### 具體產品
該角色實現抽象產品所聲明的接口，工廠方法模式所創建的每一個物件都是某個具體產品的實例
### 3. 工廠超類別（Creator or Factory）
#### 內含用以產生物件的抽象方法
工廠方法的核心，任何在模式中創建物件的工廠類都必須實現這個接口。此角色也常使用抽象類來代表
### 4. 工廠子類別（ConcreteCreatorA or ConcreteFactory）
#### 實作產生物件的方法
此角色實現了抽象工廠接口的具體類，具體工廠角色可能包含與許多複雜邏輯，並且受到使用者的調用與創建具體產品對象

## 效果
解決接口選擇的問題，

## UML
![工廠模式](https://i.imgur.com/VosSF3T.png)

## 適用場景
1. 在編寫Code的過程中，如果無法預知物件確切類別&依賴關係時，可用。
2. 希望用戶能擴展你的內部程式，可用
3. 希望復用現有物件來節省系統資源，而不是每次都創建物件

## 實現方法
1. 讓所有產品遵循單一接口，該接口必須聲明所有產品都有意義的方法
2. 在創建類中添加一個空的工廠方法。該方法返回類型必須遵循通用的產品接口
3. 在創建者代碼中找到對於產品構造函數的所有引用。將他們依次替換為工廠方法的調用，同時將創建產品的代碼移入工廠方法中
（可能需要在工廠方法中添加臨時參數來控制返回的產品類型）
4. 現在，為工廠方法中的每種產品編寫一個創建者子類，然後在子類中重寫工廠方法，並將基本方法中的相關創建代碼移動到工廠方法中
5. 如果應用中的產品類型太多，那麼每個產品創建子類並無太大必要，這時你也可以在子類中復用基礎類的控制參數

## 優缺點
### 優點
1. 避免創建者和具體產品的緊密耦合
2. 單一職責原則。可以將產品創建代碼放在程序的單一位置，使代碼更容易維護
3. 封閉原則。無需更改現有的客戶端代碼，就可以在程序中引入新的產品類型
### 缺點
1. 需要引入許多新的子類，代碼可能會更複雜。最好的情況是將該模式引入創建類的現有層次中

## Code
```typescript
/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Creator {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     */
    public abstract factoryMethod(): Product;

    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     */
    public someOperation(): string {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class ConcreteCreator1 extends Creator {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface Product {
    operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
```
## 結果
```
App: Launched with the ConcreteCreator1.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct1}

App: Launched with the ConcreteCreator2.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct2}
```


## 參考資料
* [工厂方法模式](https://refactoringguru.cn/design-patterns/factory-method)
* [工厂方法模式](https://juejin.im/post/6844904007266205710)
