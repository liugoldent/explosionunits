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
