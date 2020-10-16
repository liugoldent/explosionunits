---
{
  "title": "Grid",
  "lang": "zH",
  "description": "此篇會介紹 CSS Grid 的語法以及常用方式",
  "meta": [{"name":"keywords", "content":"css Grid, css, css3, css grid"}],
  "tags": ['CSS']
}
---
# Grid

## 優點
#### 像畫布：隨意在上面佈局

## 參考網址
#### [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
#### [CSS GRID / CSS格線好好玩【完整版】 | CSS教學 | CSS格線](https://www.youtube.com/watch?v=fYcz3FUqv7M&t=3106s)
#### [Grid Garden](https://cssgridgarden.com/)

## 基本概念
![gird](https://kanboo.github.io/2018/06/27/CSS-Grid/grid_09.png)

## display
用法：在父層設定gird
```html
<div class="container">
    <div class="AA"></div>
    <div class="BB"></div>
</div>
```
```css
.container {
    display: grid
}
```

## grid-template-rows
#### 格線列
用法：在父層設定grid後，再設定*每列高度*
```css
.container {
    display: grid;
    grid-template-rows: 100px 100px auto 100px;
}
```

## grid-template-columns
#### 格線欄
用法：在父層設定grid後，再設定*每直欄寬度*
```css
.container {
    display: grid;
    grid-template-rows: 100px 100px auto 100px;
    grid-template-columns: 200px 100px 20% 100px;
    /* grid-template-columns: repeat(auto-fill, minmax(10em,1fr)); */
    /* 上面是另一種寫法，同時設定min & max */
    /* 也可以使用fr當作寬度 */
    /* 1fr 1fr 1fr 2fr 就是總共五格，最後面的2fr分到2/5，其他各分到1/5 */
}
```

## grid-area
#### 格線名稱（for子層）
用途：為了子層取名稱
```css
.子層A{
    grid-area: B1;
    /* 或是 grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>; */
    /* 設定完後，再去父層設定就好 */
}
.container {
    display: grid;
    grid-template-rows: 100px 100px auto 100px;
    grid-template-columns: 200px 100px 20% 100px;
    /* 上面就畫完格子了 */
    /* 然後下面再分配面 */
    grid-template-areas: 
        "B3 B3 B1 B1"
        "B3 B3 B1 B1"
        "B3 B3 B1 B1"
        "B2 B2 B2 B2";
        /* B2 的面就是下面一整塊（出來顯示只會有一個B2，不會顯示四個B2） */
        /* 記得一定要連續 */
        /* 如果要留空白：使用「.」來取代「B1」 */
}
```

## grid-gap
#### 格子與格子之間的間距（for父層）
```css
.container {
    display: grid;
    grid-template-rows: 100px 100px auto 100px;
    grid-template-columns: 200px 100px 20% 100px;
    grid-template-areas: 
        "B3 B3 B1 B1"
        "B3 B3 B1 B1"
        "B3 B3 B1 B1"
        "B2 B2 B2 B2";
    grid-gap: 10px;
}
```

## auto
#### 自動給個欄寬（for父層）
用途：當今天可能有十二欄十二列時，我們不可能再像上面一樣寫出12個x12個排版（因為原始碼太亂），這時就可以用auto
```css
.container {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
}
.子層 {
    grid-row: 1/2;
    grid-column: 1/2;
    /* 第幾條線開始，第幾條線結束 */
}
```

## justify-content
#### *整體*水平軸對齊，主要設定在父元素
#### 參數：start | end | center | stretch | space-around | space-between | space-evenly
```css
.container {
  display:grid;
  width: 1000px;
  height: 830px;
  outline: 2px solid #ff0000;
  grid-template-rows: 200px 200px 200px 200px;
  grid-template-columns: 200px 200px 200px 200px;
  grid-template-areas:
    "B3 . B2 B2"
    "B3 . B2 B2"
    "B3 . B2 B2"
    "B1 B1 B1 B1";
  grid-gap:10px;
  justify-content: center; 
  /* 主要設定上面這行，設定為中間(center) */
}
```

## justify-items 
#### 在父元素中定義內容所有子元素的水平對齊方式
#### 參數：start | end | center | stretch;
```css
.container {
    justify-items: start;
}
```

## justify-self 
#### 內部子元素的水平軸對齊方式
#### 參數：start | end | center | stretch;
```css
.AA {
    justify-self: start;
}
```

## align-content
#### *整體*垂直軸對齊，主要設定在父元素
#### 參數：start | end | center | stretch | space-around | space-between | space-evenly
```css
.container {
  display:grid;
  width: 1000px;
  height: 1000px;
  outline: 2px solid #f00;
  grid-template-rows: 200px 200px 200px 200px;
  grid-template-columns: 200px 200px 200px 200px;
  grid-template-areas:
    "B3 . B2 B2"
    "B3 . B2 B2"
    "B3 . B2 B2"
    "B1 B1 B1 B1";
  grid-gap:10px;
  justify-content: center;
  align-content:center;
  /* 上面這行就是設定給內容整體的定位方式 */
}
```

## align-items
#### 在父元素中定義內容所有子元素的垂直對齊方式
#### 參數：start | end | center | stretch;
```css
.container {
    align-items:center;
}
```

## align-self 
#### 內部子元素的垂直軸對齊方式
#### 參數：start | end | center | stretch;
```css
.AA {
    align-self: start;
}
```
