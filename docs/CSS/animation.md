# Animation 動畫

## 定義屬性
1. animation：定義在哪個角色執行哪個動畫
```css
div {
    /*在div這個角色，執行guan這個動畫*/
    animation: guan .5s infinite alternate;  
}
```
2. keyframes：定義動畫內容
```css
@keyframes guan {
  0%{
    border-radius: 50%;
  }
  100%{
    border-radius: 0%;
  }
}
```

## 詳細用法
### 1. animation
#### 動畫名稱 播放時間 速度 延遲執行時間 次數 方向 填充模式 播放狀態
`animation: guan .5s linear 1s infinite reverse forwards running;`（縮寫）
#### part1. 動畫名稱(animation-name）（必填）
```css
/* 可以設定為 「guan」||「'guan'」*/
/* 名稱 guan & Guan 不同 */
@keyframes guan {
    /* 注意這邊要使用『%』*/
    /*後面出現的同樣百分比，會蓋住前面的*/
  0%{
    border-radius: 50%;
  }
  100%{
    border-radius: 0%;
  }
}
```
#### part2. 動畫持續時間(animation-duration）（必填）
1. 單位為 s（秒） || ms（毫秒）
2. 如果沒有設定，就不會播放動畫
```css
/*看到 .5s的部分*/
div {
    animation-duration: .5s;
}
```
#### part3. 延遲播放時間(animation-delay）（選填）
1. 單位為 s（秒） || ms（毫秒）
2. 預設值為0s，若無設定則不會延遲
3. 如果將秒數設定為負值，則等於快轉效果。如果設定成-2s，會直接從第二秒開始播放。
```css
div {
    animation-delay: 2s;
}
```
#### part4. 播放次數(animation-iteration-count）（選填）
1. 預設為 `1` 次
2. 可以設定 `infinite` 做無限次播放
```css
div {
    animation-iteration-count: infinite;
}
```
#### part5. 動畫加速度函式(animation-timing-function）（選填）
1. 主要幾個設定種類：`linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out`、`step-start`、`step-end`、`step`、`cubic-bezier(n,n,n,n)`
```css
div {
    animation-timing-function: linear;
}
```
#### part6. 動畫播放方向(animation-direction）（選填）
搭配著`iteration-count:infinite`會無限正反播放
1. 設定種類：`normal`、`reverse`、`alternate`、`alternate-reverse`
2. normal：正常播放（0% to 100%）
3. reverse：反轉播放（100% to 0%）
4. alternate：正反輪流播放（奇數次為0% to 100%。偶數次為100% to 0%）
5. alternate-reverse：正反輪流播放的反向（偶數次為0% to 100%。奇數次為100% to 0%）
```css
div {
    animation-direction: normal;
}
```
#### part7. 動畫播放前後模式(animation-fill-mode）（選填）
（建議用animation播放一次會比較好看懂這個屬性）
1. 設定種類：`none`、`forwards`、`backwards`、`both`
2. none：不論播放的次數，結束後返回原始狀態
3. forwards：動畫結束後，保持在最後一個影格狀態
4. backwards：與none相同
5. both：依據動畫的次數與播放方向，保持在第一個或最後一個影格
```css
div {
    animation-fill-mode: none;
}
```
#### part8. 動畫播放或暫停狀態(animation-play-state）（選填）
1. 種類：`running`、`paused`
2. running：表示運行動畫
3. paused：代表停止動畫（移入後就會停止，移出後又會繼續）
```css
div {
    animation-play-state: running;
}

div:hover {
    animation-play-state: paused;
}
```

