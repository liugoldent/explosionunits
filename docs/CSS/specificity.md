# specificity（CSS 優先權）

## 基本優先權概念
1. 相同選取器下，後者優於前者
2. 不同選取器下，依據以下規則
    A. Class 優於 Tag
    B. ID 優於 Class
    C. ID 優於 Tag
    D. inline style 優於ID
```html
<div id="main" class="menu"></div>
```
```css
#main {
    color:red;
    /* 最終會呈現此結果，因為權重最重 */
}
.menu {
    color:blue;
}
div {
    color:green;
}
```

## 進階優先權
### 1. !important
有著!important屬性的將得到最高優先權
```html
<div id="main" class="menu">Menu</div>
```
```css
#main {
    color:red;
}
.menu {
    color:blue;
}
div {
    color:green !important;
    /* 最終會呈現此結果，因為權重最重 */
}
```

### 2. 繼承來的屬性
```html
<div>
    <p>內文優</p>
</div>
```
```css
div {
    color:red;
}
p {
    color:blue;
    /* 顏色會呈現這個，因為上面的red算是繼承屬性，所有權重為最低 */
}
```

### 3.*選取器
```html
<div>
    <p>xxx</p>
</div>
```
```css
* {
    color:red;
}

div {
    color: gray;
    /* 優先權較大 */
}
```

### 4.屬性選取器的優先權
#### 大致上來說class選取器優先權=屬性選取器優先權
所以下方的code權重都一樣，最後就是後面蓋掉前面樣式的概念
```html
<p class="info">yyy</p>
```
```css
[class]{
    color:red;
}
[class='info']{
    color:blue;
}
.info{
    color:gray;
}
```

### 5.動畫關鍵影格影響優先權
#### 關鍵影格@keyframes
在動畫執行期間，關鍵影格具有絕對優先權，但一但脫離影格就會恢復到下一階的優先權。

## 優先權總整理
* 最高：Animation（動畫執行期間）
* !important
* inline style
* ID
* class
* Tag
* 『*』選取器
* 最低：繼承屬性
