---
{
  "title": "Base common sense",
  "lang": "zH",
  "description": "Base common sense",
  "meta": [{"name":"D3.js Base common sense", "content":"freecodeCamp Base common sense"}],
  "tags": ['D3.js']
}
---
# Base common sense

## 1. D3 attr vs style
### 1. attr 設置html屬性
#### 差別在於,這個可能html屬性有可能不支援height
```html
<div height="300px"></div>
```
### 2. style 設置css樣式
```html
<div style="height:300px;"></div>
```

## 2. 基本設置function
1. selectAll(xxx)
2. data(???)
3. enter()
4. append(xxx)
5. attr()
6. 綁定資料：text()
```javascript
svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
        
       .attr('x', (d, i) => d[0]+5)
       .attr('y', (d, i) => h - d[1])
       .text(data => `${data[0]}, ${data[1]}`)
```
