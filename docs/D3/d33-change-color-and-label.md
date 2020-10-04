---
{
  "title": "Learn the Label and Change SVG color",
  "lang": "zH",
  "description": "Learn the Label and Change SVG color",
  "meta": [{"name":"D3.js Learn the Label and Change SVG color", "content":"freecodeCamp Learn the Label and Change SVG color"}],
  "tags": ['D3.js']
}
---
# Learn the Label and Change SVG color

## Change the Color of an SVG Element
### 目前為止，我們的SVG都是黑色的，但今天如果想要把SVG變顏色該怎麼辦呢？
### D3.js提供了`fill`這個key值來做設定
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
       .attr("y", (d, i) => h - 3 * d)
       .attr("width", 25)
       .attr("height", (d, i) => 3 * d)
        // 同樣地，我們使用attr，然後來填充這個bar的顏色（navy色）
       .attr('fill','navy')
  </script>
</body>

```

## Add Labels to D3 Elements
### 在D3中使用Label
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
       .attr("y", (d, i) => h - 3 * d)
       .attr("width", 25)
       .attr("height", (d, i) => 3 * d)
       .attr("fill", "navy");
        // 想要在svg上加上text，一樣先選擇all
        // 然後data.enter.append. 都一樣
    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append('text')
        // 這邊x代表說，每個x點為何
       .attr("x", (d, i) => i * 30 +3)
        // 這邊y代表說，label的數字在哪裡
       .attr("y", (d, i) => h-3 * d-3)
        // 最後使用之前的text方法
       .text((data) => data)
  </script>
<body>
```

## Style D3 Labels
### 再來我們為Labels加上一點style
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
       .attr("y", (d, i) => h - 3 * d)
       .attr("width", 25)
       .attr("height", (d, i) => d * 3)
       .attr("fill", "navy");

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (3 * d) - 3)
        // 與之前API相同，也是使用fill > red
       .attr('fill','red')
        // 與之前style API相同也是使用同樣寫法
       .style('font-size','25')
  </script>
</body>

```

## Add a Hover Effect to a D3 Element
### 在D3的Element上，新增一個hover的effect
:::tip
記得，這個加上class的功能，要用.attr
:::
```html
<style>
  .bar:hover {
    fill: brown;
  }
</style>
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
       .attr("y", (d, i) => h - 3 * d)
       .attr("width", 25)
       .attr("height", (d, i) => 3 * d)
       .attr("fill", "navy")
        // 在這邊我們加上一個屬性： {class：bar}
       .attr('class','bar')

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (3 * d) - 3);
  </script>
</body>

```

## Add a Tooltip to a D3 Element
### 在這邊，我們介紹D3的tooltip
```html
<style>
  .bar:hover {
    fill: brown;
  }
</style>
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
       .attr("y", (d, i) => h - 3 * d)
       .attr("width", 25)
       .attr("height", (d, i) => d * 3)
       .attr("fill", "navy")
       .attr("class", "bar")
        // 首先我們附加上一個title 的 Element
       .append('title')
        // 再來我們把資料放上去
       .text((data) => data)

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (d * 3 + 3))

  </script>
</body>

```
