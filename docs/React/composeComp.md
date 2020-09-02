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
