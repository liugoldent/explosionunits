---
{
  "title": "Inline vs Inline-block",
  "lang": "zH",
  "description": "此篇會介紹 CSS Inline vs Inline-block 的樣式",
  "meta": [{"name":"keywords", "content":"CSS Inline vs Inline-block, css, css3, css inline, css inline-block, css block"}],
  "tags": ['CSS']
}
---
# Inline vs Inline-block

## 先決條件
一個先決條件為所有html元素可分為兩種
1. Block 元素（區塊元素）
2. inline 元素（內聯元素）

## Block元素特性
* 可以設定寬高
* 自己占了一整列

## inline元素特性
* 排在一起
* 不可設定寬高

## 特殊的inline-block屬性
* 可以排在一起（就不是自己占一列的那種）
* 可設定寬高

## 常見的block元素有：
```
address - 主要用於地址
blockquote - 塊級引用
dir - 用於設置要顯示的文本的基本方向
div - 常用塊級
dl - 定義列表
fieldset - form控制組
form - 交互表單
h1 - 大標題
h2 - 副標題
h3 - 3級標題
h4 - 4級標題
h5 - 5級標題
h6 - 6級標題
hr - 水平分隔線
menu - 菜單列表
ol - 排序表單
ul - 非排序列表
p - 段落
pre - 格式化文本(使用code)
table - 表格
```

## 常見的inline元素
```
a - 超連結
br - 換行
cite - 引用
code - 常搭配pre使用
dfn - 定義字段
em - 強調
i - 斜體
img - 圖片
input - 輸入框
kbd - 定義鍵盤文本(會有鍵盤的樣式出現)
label - 表格標簽
q - 短引用
select - 項目選擇
small - 小字體文本
span - 常用內聯容器，定義文本內區塊
strong - 粗體強調
textarea - 多行文本輸入框
var - 定義變量
```

## 範例
1. h1的修改
```html
<h1 class="styleCSS">Hi</h1>
<h1 class="styleCSS">Hello</h1>
```
```css
/*注意到這邊，原本兩個h1是inline，現在改為inline-block就會排在一起了*/
.styleCSS {
  display:inline-block;
  color:red;
}
```
2. div的排列
```html
<div class="styleCSS">Hi</div>
<div class="styleCSS">Hello</div>
```
```css
.styleCSS {
    /*同樣地，設定了inline-block，會讓div兩個排列在一起*/
    display:inline-block;
    width:100px;
    height:100px;
    background-color:red;
    margin:10px;
    outline:2px solid black;
    line-height:100px;
    text-align:center;
}
```
