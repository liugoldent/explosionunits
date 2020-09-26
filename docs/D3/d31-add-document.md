# Add Document

## Add Document Elements with D3
### 第一篇主要介紹D3的使用方法(select/append/text)
#### 1. select 主要是選擇[一個]元素
#### 2. append 附加上一個元素
#### 3. text 為這個元素加上內容
```html
<body>
  <script>
    // 首先先select元素
    d3.select('body')
    // 再來附加上一個元素
      .append('h1')
    // 然後定義這個元素的內容為何
      .text('Learning D3')
  </script>
</body>
```

## Select a Group of Elements with D3
### 在D3中選擇群組
#### 主要是在D3中選擇出群組(非select選出一個元素)
```html
<body>
  <ul>
    <li>Example</li>
    <li>Example</li>
    <li>Example</li>
  </ul>
  <script>
    // 選擇全部的li元素後
    d3.selectAll('li')
    // 然後附加上新的text
      .text('list item')
  </script> 
</body>
```
## Work with Data in D3
### 現在我們增加了兩個API(enter & data)
#### 1. data(xxx) 允許我們在選到元素後,把xxx去附加在這元素上
#### 2. enter() 用於在綁資料時,選擇缺少的DOM元素,而要怎麼選擇,就是憑藉著後面的append來選擇
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select('body')
      .selectAll('h2')
      .data(dataset)
        // 在這邊,因為本來的body版上沒有,所以我們用enter()來新增元素
      .enter()
      .append('h2')
      .text('New Title')
  </script>
</body>
```

## Work with Dynamic Data in D3
### 這邊在詳細講述text的功用:text可以接受一個字串參數 or 一個function
#### 1. eg: text('a') 
#### 2. eg: text(data) => data
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("h2")
      .data(dataset)
      .enter()
      .append("h2")
        // 這邊的data概念是說,傳進去的參數是dataset的第幾項
      .text((data) => `${data.toString()} USD`);
  </script>
</body>
```
## Add Inline Styling to Elements
### 新增一個style,參數主要有兩個style('key','value')
#### 1. key: color
#### 2. value: blue
```css
p {
    /*key:value*/
    color: steelblue;
}
```
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    d3.select("body").selectAll("h2")
      .data(dataset)
      .enter()
      .append("h2")
      .text((d) => (d + " USD"))
    // 注意,這邊就如同css寫法: font-family:'verdana'
      .style('font-family','verdana')
  </script>
</body>
```
## Change Styles Based on Data
### 進一步地,styles也可以經由data做變化
轉變成styles('height',function(data){...})
#### 第一個參數為css的key
#### 第二個參數為callback function,傳入參數為迭代的值
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("h2")
      .data(dataset)
      .enter()
      .append("h2")
      .text((d) => (d + " USD"))
        // 第一個為key,第二個為callback function
      .style('color',(data) => {
        return data >= 20 ? 'green': 'red'
      })
  </script>
</body>

```

## Add Classes with D3
### 用D3新增一個Class,並且用attr把它附加在div上
#### notice:attr()同樣可以接受兩種參數
1. attr('class','bar')
2. attr('class',function(data){...})
```css
.bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
```
```html
<style>
  .bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
        // 這邊主要使用attr的第一種形式
      .attr('class','bar')
  </script>
</body>
```

## Update the Height of an Element Dynamically
### 運用資料來改變div的高度(主要使用styles(data ))
```javascript
<style>
  .bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      // 這邊主要是利用資料去改變其高度(預設px單位)
      .style('height', function(data){
        return `${data}`
      })
  </script>
</body>
```

## Change the Presentation of a Bar Chart
### 同樣地,利用資料去操作style高度
```html
<style>
  .bar {
    width: 25px;
    height: 100px;
    margin:2px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
    // 這邊一樣使用callback function,讓其資料*10倍
      .style("height", (d) => (d*10 + "px"))
  </script>
</body>
```
