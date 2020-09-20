# 置中方法

## 參考資料
#### [CSS 垂直置中技巧](http://csscoke.com/2018/08/21/css-vertical-align/)

## 1. Line-Height
### 適用情境：單行文字垂直置中
```html
<div class="lineheighttest">HowHow Gogo</div>
```
```css
.lineheighttest {
  width: 400px;
  height:400px;
  background-color:red;
  font-size:50px;
    /* 下面這行會讓文字垂直置中 */
  line-height:400px;
    /* 下面這行會讓文字水平置中 */
  text-align:center
}
```

## line-height + inline-block
### 適用情境：多物件
```html
<div class="lineheighttest">
<!--首先我們要多用一個div包起來-->
  <div class="content">
    <a>line1test line1test line1test line1test line1test line1test</a>
    <a>line2 line2 line2 line2 line2 line2</a>
  </div
 </div>
```
```css
.lineheighttest {
  width: 500px;
  border: 1px solid #f00;
  margin: auto;
    /* 父層同樣要用line-height指定高度 */
  line-height: 200px;
  text-align: center;
}

.lineheighttest .content{
    /* 子層要用inline-block，才可以撐開高度 */
  display:inline-block;
    /* 子層line-height設定為1，即可達到置中 */
  line-height:1;
}

```
