---
{
  "title": "0. UML 圖",
  "lang": "zH",
  "description": "在這篇，主要先介紹UML的定義",
  "meta": [{"name":"keywords", "content":"Design Pattern,設計模式,UML,Unified Modeling Language "}],
  "tags": ['JavaScript'],
  "sidebarDepth": "3"
}
---
# 0. UML（統一塑模語言）
## 類別-Class
![Class](https://4.bp.blogspot.com/-9jjVhrK9GfE/WhqxSWHxpZI/AAAAAAAAArM/yvS4F3SM94Yy9B6sGttXMPGh_P0tQ6LsgCLcBGAs/s400/UML_Class_1.png) 
1. 第一個框：若為抽象類別(Abstract Class) 則類別名稱為斜體
2. 第二個框：為屬性
3. 第三個框：方法
4. `+`：代表public
5. `-`：代表private
6. `#`：代表protected
```typescript
class Character {
    constructor(
        public HealthPoint: number,
        public MagicPoint: number,
        public ATK: number,
        public MATK: number,
        public Speed: number
    ){
    
    }
    public  Run(): void{
    
    }
    public UseFood(food: string): void{
    
    }
}
```

## 介面-interface
![矩行表示](https://1.bp.blogspot.com/-DgsKBx281q0/Whq6FNzIe8I/AAAAAAAAAsM/yv-8XODYTcUjT941Bmjc-gwr0Mc20R-5QCLcBGAs/s400/interface1.png)
![棒棒糖表示](https://2.bp.blogspot.com/-6KQCp5AaLoE/Whq6FC2-uhI/AAAAAAAAAsI/1F3IBoKKuUgaQWoQ2lH7U-ZbvXqhLqNNgCEwYBhgL/s400/interface2.png)
1. 第一種表示：跟類別相同，但最上方多了`<<interface>>`
2. 第二種表示：上方加一個棒棒糖
```typescript
interface IBoxingSkill {
    hook(): void;
}
```

## 實作-implementation
![實作](https://1.bp.blogspot.com/--BI3jfjdUa4/Wn7ocTBMqDI/AAAAAAAAAtg/t54EeDowpTERgWF6Ly1AZi38YkluBgBpwCLcBGAs/s400/interface_implement.png)
若有類別要以矩形法表示實作關係，則用**虛線+空心箭頭**表示
```typescript
class Boxer implements IBoxingSkill{

}
```

## 繼承
![繼承](https://4.bp.blogspot.com/-ph8p1SaeaIc/Wn7ugD3JzSI/AAAAAAAAAuM/5A8UWO0hiy05yGIURj8keD7zkNU7ekiDACLcBGAs/s400/Inherit.png)
1. 繼承關係：以**實線+空心箭頭**表示

## 關聯
![關聯](https://2.bp.blogspot.com/-bZht1_WDi78/Wn-uqulmvKI/AAAAAAAAAuo/ToHPZ53ueW0kc7O32UvvFt_s0c7Lc30VQCLcBGAs/s400/association.png)
1. 若類別知道另一個類別時，為關聯關係：以**實線箭頭**表示


## 聚合
![聚合](https://3.bp.blogspot.com/-cj_5kxf_VIk/Wn-wY4I1pgI/AAAAAAAAAu0/g-0oIOiYbLwWyPDPvkAOlN2Vg9FNrCSNgCLcBGAs/s400/aggression.png)
* 是一種*弱*的擁有關係：A物件可以包含B物件，但B物件並不是A物件的一部分
* 使用：**空心菱形+實線箭頭**表示
* has-a 關係
* 機場可以擁有飛機（兩者為獨立的）
* 圖說：Boxers 擁有 Boxer，但兩者各為獨立

## 組合
![組合](https://4.bp.blogspot.com/-QzSXUccVBAM/Wn--2AlL-YI/AAAAAAAAAvc/fFy_Zsdd2eItcj2vCRK07g_S-YtteQzswCLcBGAs/s320/Composition.png)
* 是一種*強*的擁有關係：代表整個物件的生命週期是一樣的
* 線兩端的數字代表各有幾個實例
* 此圖代表：CloseCombat 是由 CloseCombatWeapon 組成的
* 使用：**實心菱形+實線箭頭**表示
* 例如 Car(車) 和 Tire(輪胎) 的關係

## 依賴 or 相依
![依賴](https://3.bp.blogspot.com/-P7KGQoSRiVk/WoAC-mD61WI/AAAAAAAAAwE/eIVhsgiQ-R0sXcVsxYMZ68PZBuZ2lN6XgCLcBGAs/s320/dependency.png)
1. 使用：**實線箭頭+虛線**表示

## 參考 
[Class Diagram 類別圖 (下)：Relationships 關係](https://spicyboyd.blogspot.com/2018/07/umlclass-diagram-relationships.html)
