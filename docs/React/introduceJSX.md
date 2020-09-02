# Introduce JSX

## Create a Simple JSX Element
### 創建一個簡單的JSX元素
JSX 允許我們用JS寫出HTML，在第一個範例，我們將html元素分配給一個常數JSX。
```jsx
const JSX = <h1>Hello JSX</h1>
```
## Create a Complex JSX
### 創建一個較為複雜的JSX
再來我們來創建一個較為複雜的JSX（當然也是在寫JS中寫出HTML的感覺）
在這個範例中，div包含著h1/p/ul/li這些元素
```jsx
const JSX = 
  (<div>
    <h1></h1>
    <p></p>
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
  </div>)
```

## Add Comments in JSX
我們也可以在JSX中增加comments
```jsx
const JSX = (
  <div>
    {/* 這樣加在這邊 */}
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>
  </div>
);

```

## Render HTML Elements to the DOM
再來，我們要把JSX render到 id為challenge-node的元素
```jsx
const JSX = (
  <div>
    <h1>Hello World</h1>
    <p>Lets render this to the DOM</p>
  </div>
);
// change code below this line
// 在這邊我們定義好了JSX長怎樣，於是我們要把JSX render到id為challenge-node的元素上。
ReactDOM.render(JSX,document.getElementById('challenge-node'))
```

## Define an HTML Class in JSX
在JSX中，因為javascript已經有class這個關鍵字，所以我們不能在JSX中使用class
只能用className宣告html的class
並且要注意到，JSX的宣告主要都使用camelCase（駝峰式命名）
```jsx
const JSX = (
  <div className="myDiv">
    <h1>Add a class to this div</h1>
  </div>
);

```

## Learn About Self-Closing JSX Tags
通常在HTML的結尾tag中分為兩種: `<h1></h1>` or `<br />`，然而在React中，任何的HTML tag都可以自行結尾
例如`<div />`，而差別在於說，我們無法在`<div />`這種tag中放入其他元素
```jsx
const JSX = (
  <div>
    {/* 在這邊的br or hr 就使用了這種方法*/}
    <h2>Welcome to React!</h2> <br /> 
    <p>Be sure to close all tags!</p>
    <hr />
  </div>
);
```

## Create a Stateless Functional Component
在React的世界裡，任何東西都是Component，而有兩種方式（第二種為下個範例）可以創造出一個React Component
1. 使用JS的function：用這種方式可以創造出一個stateless的functional Component，
stateless的component可以讓你接受資料與渲染這個組件
* 要創造出function的Component，你必須
    * 寫出一個JS的function，並讓他return 回JSX or null
    * 另外記住，這個function的名稱，開頭要大寫
eg:
```jsx
const DemoComponent = function(){
    return (
        <div className='customClass' />
    )
}
```
依照著這種方式，我們就可以任意組合div，讓他成為複雜的UI介面
```jsx
const MyComponent = function() {
  return (
    <div> Hello React </div>
  )
}

```

## Create a React Component
第二種創造出React 組件的方式是使用ES6的class
```jsx
class Kitten extends React.component {
    constructor(props) {
        super(props); //這邊super去呼叫父的constructor
    }
    render(){
        return (
            <h1>Hi</h1> //然後在這邊render出畫面
        )
    }
}
```
範例練習題
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    )
  }
};

```
