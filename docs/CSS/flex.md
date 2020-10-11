---
{
  "title": "Flex",
  "lang": "zH",
  "description": "CSS Flex",
  "meta": [{"name":"CSS Flex", "content":"css Flex"}],
  "tags": ['CSS']
}
---
# Flex 

## 優點
#### 彈性排版
#### 隨意控制方向
#### 對齊簡單
#### 自動算尺寸

## 參考網址
#### [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
#### [玩轉CSS Flex](https://www.youtube.com/watch?v=_nCBQ6AIzDU)
#### [深入解析CSS Flexbox](https://www.oxxostudio.tw/articles/201501/css-flexbox.html)
#### [Flex Froggy](https://flexboxfroggy.com/)


## 概念
![Flex](https://dotblogsfile.blob.core.windows.net/user/%E5%91%A8%E6%94%BF%E8%BC%9D/ca2fae2c-d1d1-443b-83a1-eb793a30581c/1525241598_89066.png)
1. 水平起點與終點（main start、main end）
2. 垂直的起點與終點（cross start、cross end）
3. 水平軸與垂直軸（main axis、cross axis）
4. 水平與垂直尺寸（main size、cross size）

## display
### ***for 外元素***
首先我們要先設定display為flex
```css
.xxx {
    // 正常設定
    display: flex;
}
or
.xxx {
    // 後方元素不會換行
    display: inline-flex;
}
```

## flex-direction
### ***for 外元素***
代表著flexbox內容元素的排列方向，共有四種
1. row：預設值，從左到右，由上而下
2. row-reverse：與row相反
3. column：從上到下，從左到右
4. column-reverse：與column相反

```css
.xxx {
    display: flex; // 當然要先設定flex
    flex-direction: row; // 才能設定flex-direction
}
```

## flex-wrap
### ***for 外元素***
因為flex一般預設不換行（不管子元素多少，就是不換，就算子元素超過父元素大小也不換）
所以要設定一個flex-wrap來換行
設定內容換行的方式，分為三種
1. nowrap：預設值，單行
2. wrap：多行
3. wrap-reverse：多行，但行內元素反轉
```css
.xxx {
    display: flex;
    flex-direction: row;
    flex-wrap：wrap;
}
```

## flex-flow
### ***for 外元素***
為flex-direction+ flex-wrap的合體
```css
#pond {
    display: flex;
    flex-flow: column wrap;
}

/* 相等於 */
#pond {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
```

## justify-content
### ***for 外元素***
### 資料流對齊（主軸）
我們決定了flex-direction是哪個方向後，就可以設定其**主軸**對齊方向
eg：flex-direction:row > 代表main start 排列方向為列。而start方向從左邊開始
1. flex-start：對齊最左邊的main start
2. flex-end：對齊最左邊的main end
3. center：置中
4. space-between：平均分配內容元素，左右元素會與main start & main end 對齊（貼近左右後，中間平均分配）
5. space-around：平均分配內容元素，間距也是平均分配（把空白處，平均分配：如果有三個，就把空間切成6等分，平均分）
```css
.xxx {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
```

## align-items
### ***for 外元素（細修各個items）***
與justify-content相反，主要設定**交錯軸**對齊方式，主要針對**單行子物件**
eg：flex-direction為row時，align軸就是column
1. flex-start：對齊最左邊的main start
2. flex-end：對齊最左邊的main end
3. center：置中
4. stretch：預設值，將內容元素全部撐開至flexbox的高度
5. baseline：以所有內容為元素的基線作為對齊標準
```css
.xxx {
    display: flex;
    flex-direction: row;
    align-items: center; // 設定交錯軸的對齊方式
}
```

## align-content
### ***for 外元素***
為align-items的**多行版本**，如果遇到**多行元素**就使用這個，共有六個屬性
1. flex-start：對齊最上面的cross-start
2. flex-end：對齊最下面的cross-end
3. center：垂直置中
4. space-between：將第一行與最後一行分別對齊最上方與最下方
5. space-around：每行平均分配間距
6. stretch：預設值，內容元素全部撐開
```css
.xxx {
    display: flex;
    flex-direction: row;
    align-content: center;
}
```

## align-self
### ***for 內元素***
主要是設計給內部元素使用，例如說我們已經在外面設定好align-items的對齊方向
但又想要將某個內元素對齊方向設定的不一樣，要使用這個
```html
<div class="xxx">
    <div class="yyy"></div>
</div>
```
```css
.xxx {
    display: flex;
    flex-direction: row;
    align-items:center;
}
.yyy {
    align-self: baseline; 
    /**
    * 父層xxx已經被設定為align-items:center
    * 此時若自己想要不同的對齊方式，使用align-items
    */
}
```

## order
### ***for 內元素***
在flex-wrap我們可以把元素反轉，這個則是可以直接指定元素位置
ps.預設原本都是0，然後不可以有小數點
如果兩個order一樣大，依照原始碼的順序去顯示
``` css
.xxx {
    order:1 
}
```

## flex
### ***for 內元素***
### for RWD 更方便
主要由三個屬性組合而成
1. flex-grow：數字，無單位，當子元素flex-basis **小**於自己在父元素所分配到的長度，則會依照數字做伸展
    * 剩下的空間切x份（看flex-grow：總共幾份），分配給子元素
    * 例如下面總共三份
```css
.item {
    item-grow:1
}
.item {
    item-grow:1
}
.item {
    item-grow:1
}
```
2. flex-shrink：數字，無單位，當子元素flex-basis **大**於自己在父元素所分配到的長度，則會依照數字做壓縮
* 收縮比：
    * 總比值：各個子項目寬度x收縮值，並加總所有子項目計算結果
    * 超出值：
    * 扣除值：
    * （子項目寬x收縮比/總比值）x 超出值 = 扣除值
```css
.item {
    flex-shrink: 0; //不壓縮
}

.item1 {
    flex-shrink: 1 ; //基本壓縮數值
}
```
3. flex-basis：子元素的基本大小（控制子元素的主軸長度）
```html
<div class="flexOuter">
    <div class="item1"></div>
</div>
```
```css
.item1 {
    flex:1 2 200px; // 可以一次設定三個
}
```

## 註記
1. align系列：for交錯軸
2. not align：for 主軸

