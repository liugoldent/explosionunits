# Compose Component

## Create a Component with Composition
### 在這篇，我們要透過組合多個Component。
上一篇我們學到了怎麼創造出functional Component。在這裡我們進一步將它們組合成一個畫面
```jsx
return (
 <App> // 首先我們定義一個App
  <Navbar /> // 在這App裡面包含著Navbar
  <Dashboard /> // 在這App裡面包含著Dashboard
  <Footer /> //// 在這App裡面包含著Footer
 </App>
)
```
所以在下篇練習中，我們先定義一個ChildComponent（使用array function）
再來用class 定義一個 ParentComponent
```jsx
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* change code below this line */ }
          <ChildComponent />

        { /* change code above this line */ }
      </div>
    );
  }
};
```

## Use React to Render Nested Components
### 創造一個巢狀的Components
```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      <TypesOfFruit /> // 在這邊把TypesOfFruit 這個Component掛進來
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
          <Fruits /> // 在這邊把Fruits 這個Components掛進來
      </div>
    );
  }
};
```

## Compose React Components
### 使用class 的Component寫法，來寫出巢狀Component
```jsx
class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
          <NonCitrus /> //在這邊我們先把NonCitrus Component引進來
          <Citrus /> //在這邊我們先把Citrus Component引進來
      </div>
    );
  }
};

class TypesOfFood extends React.Component {
  constructor(props) {
     super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
          <Fruits /> // 然後把 Fruits這個Component引進來
          <Vegetables />
      </div>
    );
  }
};

```

## Render a Class Component to the DOM
### 在DOM 上render出一個class Component
相似於前面，如果我們要在DOM上 render出畫面，那要使用`ReactDOM.render(<Component />, targerNode)`
#### 第一個參數是，我們想要渲染的Component
#### 第二個參數是，DOM的節點
```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        <Fruits />  
        <Vegetables />
      </div>
    );
  }
};
// 注意這邊的Component渲染寫法
// 再來要找到節點的方法（跟前面的滿類似的）
ReactDOM.render(<TypesOfFood />,document.getElementById('challenge-node'))
```

## Write a React Component from Scratch
### 自己打造自己的React Components吧
前面介紹了這麼多Component寫法，在這邊我們自己打造一個Component吧
```jsx
class MyComponent extends React.Component{
  // 一樣有constructor來操作props
  constructor(props){
    super(props)
  }
  // 一樣使用render函數來畫出一個ui文字
  render(){
    return (<div>
      <h1>My First React Component!</h1>
    </div>)
  }
}
// 把組件放進去，再getId來渲染畫面
ReactDOM.render(<MyComponent />,document.getElementById('challenge-node'))
```

## Pass Props to a Stateless Functional Component
### 讓我們傳數值進入Functional Componenet吧
在React我們可以使用`props`，來將數值傳遞給子元件（其實Vue也是如此），在這邊我們介紹一下基礎範例
#### eg:App將Mark傳入Welcome組件
```jsx
<App>
    <Welcome user='Mark' /> //意思是說，我們把Mark傳進去給Welcome組件
</App>
// 這邊Welcome被傳入了一個props參數，然後渲染出props.user這個值
const Welcome = (props) => <h1>Hello, {props.user} </h1>
```
範例：
```jsx
const CurrentDate = (props) => {
  return (
    <div>
        // 這邊是子組件，透過props傳進了date這個物件
      <p>The current date is: {props.date}</p>
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        // 這邊在呼叫子組件時，`{Date()}`是父組件的值，而date是子組件認識的值，所以傳進去給它
        <CurrentDate date={Date()}/>
      </div>
    );
  }
};
```

## Pass An Arrau as Props
### 在這篇我們會講說，如何將一個陣列傳進子Component
```jsx
const List = (props) => {
  return <p>{ props.tasks.join(', ') }</p>
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
            // 傳入的方式一樣，要注意的是，其實也是用物件包陣列的方式，去傳值
        <List tasks={ ["walk dog", "workout"] }/>
        <h2>Tomorrow</h2>
        <List tasks={ ["walk dog", "workout", "Bye"] }/>
      </div>
    );
  }
};

```

## Use Default Props
### 在這邊要講講，在React中，怎麼放入預設值
```jsx
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};
// 在這邊可以設定`defaultProps` 的數值，記得同樣是用default值
ShoppingCart.defaultProps = {
  items:0
}
```

## Override Default Props
### 可以設定預設值，相同的也可以覆寫掉預設值
```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
  quantity: 0
    // 這邊將Items的default預設成0
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items quantity={10}/>
    // 然而這邊又將預設值改成10（覆寫掉）
  }
};

```

## Use PropTypes to Define the Props You Expect
### 在你prop時，你也可以對這個props的值作定義
eg：型態 or 是否為必須
```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

Items.propTypes = {
  quantity: PropTypes.number.isRequired
    // props的值：屬性為.數字.必要
}

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};

```

## Access Props Using this.props
### 之前都是在function外面寫props，這次我們使用class來接收props
```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    { /* 這邊是子Component，然後props會接收呼叫端給的值 */ }
    super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: 
            <strong>{ this.props.tempPassword }</strong></p>
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /*  這邊是子Compnent的呼叫，負責給子元件值*/} 
          <ReturnTempPassword tempPassword="asdfkgji"/>
        </div>
    );
  }
};

```

## Review Using Props with Stateless Functional Components
### 在這邊我們複習一下用functional Component 傳入props的寫法
```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper  />
      </div>
    );
  }
};
const Camper = (props) =>{
  return (
    <p>{ props.name }</p>
  )
}

Camper.defaultProps = {
  name: 'CamperBot'
}

Camper.propTypes = {
  name: PropTypes.string.isRequired
}
```

#### [props ref](https://zh-hant.reactjs.org/docs/typechecking-with-proptypes.html)
