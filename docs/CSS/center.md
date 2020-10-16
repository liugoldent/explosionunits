---
{
  "title": "置中方法",
  "lang": "zH",
  "description": "此篇會介紹 CSS 置中方法",
  "meta": [{"name":"keywords", "content":"css 置中方法, css, css3, css center"}],
  "tags": ['CSS']
}
---
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

## 2. line-height + inline-block
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

## 3.  ::before + inline block
### 情境：多物件的CSS 垂直置中
```html
<div class="box">
  <div class="content">
    <a href="">HowHow has no frends</a>
    <a>這是a1 的test</a>
  </div>
</div>
```
```css
.box {
  width: 300px;
  height:300px;
  position:absolute;
  margin:auto;
  background-color:gray;
  text-align:center;
}

.box::before {
  content:'';
  display: inline-block;
  vertical-align:middle;
  height:100%;
}

.box .content {
  display: inline-block;
    vertical-align:middle;
}
```

## 4. Absolute + margin 負值
```html
<div class="box">
  <div class="inner">
    </div>
</div>
```
```css
.box {
  width: 300px;
  height:300px;
  position:absolute;
  background-color:gray;
}

.inner {
  width:100px;
  height:100px;
  background-color:red;
    /* 重點是下面這幾個，絕對定位+top:50% & left:50% */
  position:absolute;
  top:50%;
  left:50%;
    /* 再加上margin-top || margin-left 負值 */
  margin-top:-50px;
  margin-left:-50px;
}

```
