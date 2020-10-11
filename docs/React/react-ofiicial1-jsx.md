---
{
  "title": "React 主要概念",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React']
}
---
# React 主要概念.p1
## Hello World
```jsx
ReactDOM.render(
    // 在react的render函數中，可以寫html & JS，將其兩個合在一起
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
```

## JSX
### 為何要使用JSX
:::tip
與其將技術拆開，把標籤語法與邏輯拆開放於不同檔案中，React關注點分離的方法是將其拆為很多同時包含UI & Logic的Component。
讓彼此之間較少依賴
:::

### 在JSX中嵌入Expression
```jsx
// 在JSX中我們可以將變數與js融合再一起（只需要使用大括號{}）即可
const name = 'Guan'
const element = <h1>Hello, {name} </h1>

// 抑或是使用function
const element = <h1>Hello, {formatName(user)}</h1>

// 而最後使用React.render函數，將其渲染出來
React.render(
    element,
    document.getElementById('root')
)
```

### 在JSX中指定屬性（主要也是使用大括號）
```jsx
const outer = {
    link: 'www.google.com'
}
const element = <div src={outer.link}>Hello </div>
// or
// 在這邊我們要注意到react主要使用camelCase來命名
const element2 = <div tableIndex='0'></div>
```

### 多列的html元素
```jsx
// 前面展示主要都是單行，在以下，我們討論多行狀況
const element = (
    <div>
        <h1>Hello</h1>
    </div>
)
Reacr.render(
    element,
    document.getElementById('root')
)
```

### JSX防範注入攻擊
#### 意思是防範XSS攻擊
```jsx
const title = response.potentiallyMaliciousInput
const element = <h1>{title}</h1>
```
:::tip
react在render之前，會將存在jsx的變數，都轉為字串，保證我們永遠不受到XSS攻擊
:::
### JSX物件顯示法
首先為jsx未經編譯的樣子
```jsx
const Element = (
    <h1 className="great">
        Hello
    </h1> 
)
```
再來是經過babel編譯後的樣子
```javascript
const Element = React.createElement(
    'h1',
    {className: 'great'},
    'Hello'
)
```

## Rendering Element
:::tip
建立React的最小單位是Element
:::
```jsx
const element = <h1>Hello </h1>
```

### Render Element to DOM
基本上React是使用`ReactDOM.render()`來實施render的
```html
<div id="root"></div>
```
```jsx
const element = <h1>Hello</h1>
ReactDOM.render(element, document.getElementById('root'))
```

### React只更新必要的Element
也就是說當我們改變了x東西，React只會對x做處理更新

## Component & prop
:::tip
概念上來說，component像是JS的function，它接收任意的參數（稱為props）並且回傳描述畫面的React element。
並糗此props為唯讀，絕對不可改變它。
:::
### function Component || Class Component
1. function Component
```jsx
function Welcome(props){
    return <h1>Hello, {props}</h1>
}
```
2. Class Component
```jsx
class Welcome extends React.component{
    render(){
        return <h1>Hello, {this.props}</h1>
    }
}
```

### Render一個Component
```jsx
function Welcome(props){
    return <h1>Hello, {props.name}</h1>
}
// 當React看到使用者自定義的Component時，它將JSX屬性和children作為Object傳給該component
const element = <Welcome name="Sara" />
React.render(
    element,
    document.getElementById('root')
)
```
:::warning
在React中，我們將Component的名稱設定為大寫。而像正常DOM標籤，開頭定義為小寫。
:::

### 組合Component
```jsx
function Welcome(props){
    return <h1>Hello, {props.name}</h1>
}
function App(){
    return (
        <div>
            {/*下方為組合Component的方式*/}
            <Welcome name="First" />
            <Welcome name="Second" />
        </div>
    )
}
```
