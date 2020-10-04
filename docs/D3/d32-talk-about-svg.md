---
{
  "title": "Talk About SVG",
  "lang": "zH",
  "description": "Talk About SVG",
  "meta": [{"name":"D3.js Talk About SVG", "content":"freecodeCamp Talk About SVG"}],
  "tags": ['D3.js']
}
---
# Talk About SVG

:::tip
SVG:Scalable Vector Graphics
### 可縮放向量圖形
:::
## Learn About SVG in D3
### 要在HTML中使用svg,主要可以使用svg tag
```html
<style>
  svg {
    background-color: pink;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                    // 在這邊可以append一個svg tag
                  .append('svg')
                    // 下面兩行同樣是使用style去增加width or height
                  .style('width',w)
                  .style('height',h)
  </script>
</body>
```

## Display Shapes with SVG
### 在SVG中展現出形狀
在SVG中,你可以指定x & y 座標(假設今天是(0,0) > 代表的就為左上角座標)
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    const w = 500;
    const h = 100;
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                    // 這邊使用append rect後,當然後面要再加上attr增加一些屬性
                  .append('rect')
                    // 這邊增加attr屬性
                  .attr('width',25)
                  .attr('height',100)
                  .attr('x',0)
                  .attr('y',0)
  </script>
</body>
```

## Create a Bar for Each Data Point in the Set
### 用資料來創建一個Bar
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    // 在這邊是利用分開的寫法,寫出新的rect(運用到之前的enter()技巧)
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append('rect')
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", 25)
       .attr("height", 100);
  </script>
</body>

```

## Dynamically Set the Coordinates for Each Bar
### 動態的設定，每一個資料bar的高度
因為之前我們雖然做出了bar，但x點都是相同的，在這題，我們要把他們變得不同起點
```js
// example
selection.attr("property", (d, i) => {
  /* 
  * d is the data point value(第i個value)
  * i is the index of the data point in the array(i 為 陣列的index)
  */
})
```
:::tip
在這個方法中，我們不必去寫出`for` or `forEach`，因為他已經自動迭代了
:::
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => {
            // 像這邊，我們直接使用(d,i)，D3就會為我們去做迭代了
         return i*30
       })
       .attr("y", 0)
       .attr("width", 25)
       .attr("height", 100);
  </script>
</body>

```

## Dynamically Change the Height of Each Bar
### 跟上題很像，這題主要更改Bar的Height
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 30)
       .attr("y", 0)
       .attr("width", 25)
       .attr("height", (d, i) => {
        // 在這邊將height設定為資料的高度
         return d*3
       });
  </script>
</body>

```

## Invert SVG Elements
### 如果你有照前面一步一步練習過來，就會發現y軸相反（主要稱為電腦螢幕座標），所以在這題，我們要將其倒過來（歐式座標）
做法很簡單
#### 1. 先假設你的高為: h=100
#### 2. 將你這個bar的高度(bar.height)設定為 h-bar.height
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => {
         return h-d*3
       })
       .attr("width", 25)
       .attr("height", (d, i) => 3 * d);
  </script>
</body>

```
:::tip
h-d*3的概念，其實跟y軸往下畫bar是一樣的概念，假設今天h = 100，d = 10。那就是這個bar從y = 10開始，然後畫出其bar高度。
:::
