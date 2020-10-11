---
{
  "title": "Transition 過渡",
  "lang": "zH",
  "description": "CSS Transition 過渡",
  "meta": [{"name":"CSS Transition 過渡", "content":"CSS Transition 過渡"}],
  "tags": ['CSS']
}
---
# Transition 過渡

## 基本概念
1. transition：轉變
2. 用法時機：主要用於`hover`
3. [適用於transition的屬性](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)

## 用法
```html
<div class="transdiv"></div>
```
```css
.transdiv {
  width: 300px;
  height: 300px;
  line-height:300px;
  text-align:center;
  font-size:100px;
  background-color:#ccc;
  margin-left:0px;
/*   transition: 屬性(css內的屬性) 轉換時間 延遲執行時間 速度 */
  transition: all 5s 0s ease-in
   
}

.transdiv:hover {
  margin-left:1000px;
  color: white;
}
```

## transition 各屬性
`transition: all 5s 0s ease-in`
### 1. all
#### 代表的所有屬性都會吃到這個transition時間
```css
.transdiv:hover {
  margin-left:1000px;
  color: white;
}
/* 如果不想要全部屬性的transition都一樣，可以在父層拆開（改寫transition） */
.transdiv {
    transition: margin-left 5s 0s ease-in, color 1s 0s ease-in;
}
```
### 2. 5s
#### 表示這個transition的持續時間

### 3. 0s 
#### 代表這個transition的延遲時間（延遲多久才開始這樣）

### 4. ease-in
#### 代表這個轉變的速度是怎麼樣呈現
區分為
* ease：緩慢開始，中間變快，變慢慢結束
* ease-in：緩慢開始
* ease-out：緩慢結束
* ease-in-out：環慢的開始和結束
* linear：開始到結束速度一致
* cubic-bezier(n,n,n,n)：自由設定速度（但數值n=0~1）

## 參考資料
#### 1. [CSS transition 各種速率](https://wcc723.github.io/css/2013/08/24/css-transtion-speed/)
#### 2. [CSS動畫- transition](https://ithelp.ithome.com.tw/articles/10200365)
