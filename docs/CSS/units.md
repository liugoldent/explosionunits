---
{
  "title": "Units 單位",
  "lang": "zH",
  "description": "此篇會介紹 CSS Units 的常見單位與其區別",
  "meta": [{"name":"keywords", "content":"CSS Units 單位, css, css3, css units"}],
  "tags": ['CSS']
}
---
# Units 單位

## px
### 最基本的單位（絕對單位：代表螢幕中的點）
```html
<p> GoGo </p>
```
```css
p {
    font-size:10px;
}
```

## em 
### 相對大小單位
#### eg: .a 的 2em 大小 = 「父」元素（.container）大小 * 2
#### eg: .b 的 2em 大小 = 「父」元素（.a）大小 * 2
```html
<div class="container">
  <div class="a">A 
    <div class="b">B 
    <div class="d">D </div>
    </div>
  </div>
</div>
```
```css
.container {
  font-size:30px;
}
.a {
  font-size:2em;
}
.b {
  font-size:2em;
}
.d {
  font-size:2em;
}
```
## rem
#### eg: .a 的 2em 大小 = 「根」元素（.container）大小 * 2
#### eg: .b 的 2em 大小 = 「根」元素（.container）大小 * 2
```html
<div class="container">
  <div class="a">A 
    <div class="b">B 
    <div class="d">D </div>
    </div>
  </div>
</div>
```
```css
.container {
  font-size:30px;
}
.a {
  font-size:2rem;
}
.b {
  font-size:2rem;
}
.d {
  font-size:2rem;
}
```

## %
### 相對單位
#### eg: .a 的 200% 大小 = 「父」元素（.container）大小 * 2
#### eg: .b 的 200% 大小 = 「父」元素（.a）大小 * 2
```html
<div class="container">
  <div class="a">A 
    <div class="b">B 
    <div class="d">D </div>
    </div>
  </div>
</div>
```
```css
.container {
  font-size:30px;
}
.a {
  font-size:200%;
}
.b {
  font-size:200%;
}
.d {
  font-size:200%;
}
```

## 參考資料
[一次搞懂CSS 字體單位](https://www.oxxostudio.tw/articles/201809/css-font-size.html)
