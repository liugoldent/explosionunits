# Add others SVG style

## Create a Scatterplot with SVG Circles
### 用SVG circles 創造一個ScatterPlot（散佈圖）
```html
<body>
  <script>
    const dataset = [
                  [ 34,    78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,    411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,   333 ],
                  [ 78,    320 ],
                  [ 21,    123 ]
                ];
    const w = 500;
    const h = 500;
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
        // 同樣地，先假設選到circle
    svg.selectAll("circle")
        // 放入資料，再enter
      .data(dataset)
      .enter()
        // 最後附加上circle這個節點
      .append('circle')

  </script>
</body>

```

## Add Attributes to the Circle Elements
### 剛剛練習了附加上circle的動作，現在我們要把他顯現出來
circle包含了三個必要因素
#### 1. 'cx'（像x一樣，決定位置）
#### 2. 'cy'（像y一樣，決定位置）
#### 3. 'r' （決定radius）
然後注意：這些設定都是在綁定資料後，才可以使用
```html
<body>
  <script>
    const dataset = [
                  [ 34,    78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,    411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,   333 ],
                  [ 78,    320 ],
                  [ 21,    123 ]
                ];
    const w = 500;
    const h = 500;
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
        // 記得要設定radius
       .attr('r',5)
        // 跟x一樣，有callback function，可以取得資料
       .attr('cx',(data) => data[0])
       .attr('cy',(data) => h-data[1])
  </script>
</body>
```

## Add Labels to Scatter Plot Circles
### 在散佈圖上，新增座標Label資料
```html
<body>
  <script>
    const dataset = [
                  [ 34,    78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,    411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,   333 ],
                  [ 78,    320 ],
                  [ 21,    123 ]
                ];


    const w = 500;
    const h = 500;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d, i) => d[0])
       .attr("cy", (d, i) => h - d[1])
       .attr("r", 5);

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
        // 同樣地，要設定attr & text（方法都與之前相同）
       .attr('x', (d, i) => d[0]+5)
       .attr('y', (d, i) => h - d[1])
       .text(data => `${data[0]}, ${data[1]}`)
  </script>
</body>

```

## Create a Linear Scale with D3
### 比例尺
#### 假設今天我們的資料bar高度，或是其中一個資料點高度超過SVG height，對於在繪製圖上會有問題
#### 所以解決這個問題的辦法就是將這些數據scale起來（類似*一個倍率）
```html
<body>
  <script>
        // 這邊先定義一種scale方式
    const scale = d3.scaleLinear()
        // 再來為定義一個scale比例尺
    const output = scale(50); 

    d3.select("body")
      .append("h2")
        // 注意到這邊：text(output)可以把值取出來
      .text(output);

  </script>
</body>

```
## Set a Domain and a Range on a Scale
### 在比例尺中設定範圍和domain
::: tip
你必須給D3 domain(原本範圍)，和Range(後來範圍)，才可以讓其自動算出，比例多少
:::
```html
<body>
  <script>
    const scale = d3.scaleLinear();
        // 設定原始數據
    scale.domain([250,500]);
        // 設定後來的數據，然後D3就會利用兩個數據來去做比例尺
    scale.range([10,150])

        // 而當你輸入50時，因為這已經低於原本domain數據，所以輸出text會小於0
    const output = scale(50);
    d3.select("body")
      .append("h2")
      .text(output);
  </script>
</body>

```

## Use the d3.max and d3.min Functions to Find Minimum and Maximum Values in a Dataset
### 當然我們也可以用程式去找出一個Array的最大最小值
use
#### 1. min() > 找到最小值
#### 2. max() > 找到最大值
```javascript
    const exampleData = [34, 234, 73, 90, 6, 52];
    d3.min(exampleData) // Returns 6
    d3.max(exampleData) // Returns 234
```

```html
<body>
  <script>
    const positionData = [[1, 7, -4],[6, 3, 8],[2, 9, 3]]

    const dealArray = []
        // 這題其實跟演算法比較有關係，是叫你求出各個Array的最後一個的最大值
    for(let i = 0 ,len = positionData.length ; i < len ; i++){
      let length = (positionData.length)-1
      dealArray.push(positionData[i][length])
    }
    const maxValue = d3.max(dealArray)
    const output = maxValue; // Change this line


    d3.select("body")
      .append("h2")
      .text(output)
  </script>
</body>

```

## Use Dynamic Scales
### 這題我們分別對不同的軸（x、y）去做scale
注意在這題有使用到padding：這個意思是說他會去限縮你的起始點與終點（如果有用到的話）
eg：w=500, padding=30。`range([padding, w - padding])`;
#### 這樣range就會從padding:30開始
#### 然後結尾是470
```html
<body>
  <script>
    const dataset = [
                  [ 34,    78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,    411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,   333 ],
                  [ 78,    320 ],
                  [ 21,    123 ]
                ];

    const w = 500;
    const h = 500;
    // Padding between the SVG canvas boundary and the plot
    const padding = 30;
    // Create an x and y scale
    const xScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, (d) => d[0])])
                    .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                        // 當然起點是一樣的
                      .domain([0, d3.max(dataset, (d) => d[1])])
                        // 注意y軸和x軸的range相反
                      .range([h-padding,padding])

    const output = yScale(411); // Returns 30
    d3.select("body")
      .append("h2")
      .text(output)
  </script>
</body>

```

## Use a Pre-Defined Scale to Place Elements
### 使用預先定義好的scale
```html
<body>
  <script>
    const dataset = [
                  [ 34,     78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,   411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,    333 ],
                  [ 78,    320 ],
                  [ 21,   123 ]
                ];

    const w = 500;
    const h = 500;
    const padding = 60;
    // 在還沒設定svg圖案前，先定義好scale
    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[0])])
                     .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([h - padding, padding]);
    // 然後定義好svg（畫布）的大小要多大
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
    // 最後append上新的圖案
    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
        .attr('r', 5)
        // 要注意的是這邊，attr的第二個參數可以是一個callback function，然後裡面可以再呼叫一個function
        // 在設定cx or cy 時，可以接受第二個是function，只要最後結果是數值就好
        .attr('cx', (d) => xScale(d[0]))
        .attr('cy', (d) => yScale(d[1]))

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) =>  (d[0] + ", "+ d[1]))
       .attr('x',(d) => xScale(d[0]+10))
       .attr('y',(d) => yScale(d[1]))
  </script>
</body>

```

## Add Axes to a Visualization
### 增加x軸or y軸
在D3.js中你可以透過兩個API來新增軸
#### 1. d3.axisBottom(xScale)：增加x軸
#### 2. d3.axisLeft(yScale)：增加y軸
eg: `const xAxis = d3.axisBottom(xScale);`
也就是說，你要先定義xScale or yScale，再來增加x軸or y軸
```html
<body>
  <script>
    const dataset = [
                  [ 34,     78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,   411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,    333 ],
                  [ 78,    320 ],
                  [ 21,   123 ]
                ];

    const w = 500;
    const h = 500;
    const padding = 60;
    // 首先定義好x/y軸的scale
    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[0])])
                     .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([h - padding, padding]);
    // 再來定義svg畫布
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
    // 再來定義svg內要有什麼形狀
    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d) => xScale(d[0]))
       .attr("cy",(d) => yScale(d[1]))
       .attr("r", (d) => 5);
    // 然後這個形狀是否會有文字
    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) =>  (d[0] + "," + d[1]))
       .attr("x", (d) => xScale(d[0] + 10))
       .attr("y", (d) => yScale(d[1]))
    // 再來這個形狀是否有x軸y軸
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    // 有的話就加上append.attr.call
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis)

   svg.append("g")
        // 記得要十分注意這邊translate的寫法
      .attr("transform", "translate("+ padding +",0)")
      .call(yAxis)
     
  </script>
</body>

```
:::warning
記得最後要加上.call(xAis) or .call(yAxis)
:::



## 參考資料
[D3.js 定義比例](https://www.oxxostudio.tw/articles/201411/svg-d3-03-scale-linear.html)
