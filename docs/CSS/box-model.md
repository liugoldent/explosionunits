---
{
  "title": "Box-Model",
  "lang": "zH",
  "description": "Box-Model",
  "meta": [{"name":"CSS Box-Model", "content":"css Box-Model 的使用"}],
  "tags": ['CSS']
}
---
# Box-Model

## width
### 最基本的定義*內容* 寬度
```css
div {
    width:300px;
}
```
```javascript
if( 有border ){
    整體width = border + width
    // 此為可以看得到的寬度
} 
if( 有padding ){
    整體width = padding + width
    // 此為可以看得到的寬度
} 
if( 有margin ){
    整體width = margin + width
    // 最大整體width(看得到+看不到) = margin+border(如果有)+padding(如果有)+width
}
```
## padding
### 內文與邊框線的距離
```css
div {
    padding: 20px;
}
```

### border 
### 邊框線
```css
div {
    border: 10px solid black;
    /* 寬度 線的種類 顏色 */
}
```
## margin
### 物件與物件之間的距離
eg：div & div 之間的距離
```css
div {
    margin: 20px;
}
```

## margin & padding 數字設定
```css
div {
    /* 以下使用margin示範，padding意思相同*/

    /* 上下左右都10px */
    margin: 10px;

    /* 上下10px、左右20px */
    margin: 10px 20px;

    /* 上面10px 左右20px 下面30px */
    margin: 10px 20px 30px;
    
    /*  上面10px 右邊20px 下面30px 左邊40px */
    margin: 10px 20px 30px 40px;
}
```

## box-sizing
### 主要是操縱盒模型的計算方式，要設定寬度設定給誰
```css
父 {
    width: 300px;
}
子 {
    width: 300px;
    padding: 10px;
    border: 10px;
    box-sizing: border-box; // 設定這個就不會讓子寬度超過父了
    /* 設定border-box：width 為邊框到邊框的寬度 */
    /* 設定content-box：width：為內容的寬度 */
}
```

