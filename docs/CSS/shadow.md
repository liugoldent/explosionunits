---
{
  "title": "CSS Shadow 陰影",
  "lang": "zH",
  "description": "CSS Shadow 陰影",
  "meta": [{"name":"CSS Shadow 陰影", "content":"css Shadow 陰影"}],
  "tags": ['CSS']
}
---
# Shadow 陰影

## text-shadow(文字陰影)
### 1. text-shadow:none
很正常的顯示（就一般那樣）
```html
<p> GoGo </p>
```

```css
p{
    text-shadow: none;
}
```

### 2. text-shadow: 2px 6px
```html
<p> HTC </p>
```
```css
p {
    text-shadow: 2px 6px;
    /* 第一個參數為水平偏移 */
    /* 第二個參數為垂直偏移 */
}
```

### 3. text-shadow: 2px 6px red
```html
<p> TSMC</p>
```

```css
p {
    text-shadow: 2px 6px red;
    /* 第一個與第二個如同上面解釋 */
    /* 最後一個為顏色，偏移的字體的顏色 */
}
```

### 4. text-shadow: 2px 4px 10px red
```html
<p> Apple </p>
```

```css
p {
    text-shadow: 2px 4px 10px red;
    /* 2px 與 4px 與第二點相同解釋 */
    /* 第三個參數為模糊參數 */
    /* 第四個參數為偏移字體顏色 */
}
```

## box-shadow（盒陰影）
### 1. box-shadow: none
如同一般顯示一樣，沒有任何效果

### 2. box-shadow: 2px 6px;
```html
<div> </div>
```
```css
div {
  background-color:black;
  width: 200px;
  height:200px;
  box-shadow: 50px 50px;
    /* 第一個參數為水平偏移 */
    /* 第二個參數為垂直偏移 */
}
```

### 3. box-shadow: 2px 6px 10px red;
```html
<div> </div>
```
```css
div {
  background-color:black;
  width: 200px;
  height:200px;
  box-shadow: 50px 50px 10px red;
    /* 2px 與 4px 與第一點相同解釋 */
    /* 第三個參數為模糊參數 */
    /* 第四個參數為偏移字體顏色 */
}
```

### 4. box-shadow: 2px 6px 10px 10px red;
```html
<div></div>
```

```css
div {
  background-color:black;
  width: 200px;
  height:200px;
  box-shadow: 50px 50px 10px 30px red;
    /* 第一與第二參數分別為水平偏移與垂直偏移 */
    /* 第三參數為blue */
    /* 第四參數為spread數值 */
    /* 第五參數為顏色 */
}
```

## 參考資料
[CSS reference-box-shadow](https://cssreference.io/property/box-shadow/)
[CSS reference-text-shadow](https://cssreference.io/property/text-shadow/)
