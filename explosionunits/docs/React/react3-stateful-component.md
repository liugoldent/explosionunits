# Stateful Component

## Create a Stateful Component
### 讓我們在class的constructor中建立一個state
```jsx
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    // 這可以render進入下方的h1
    this.state = {
      name: 'AV Emperor'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

## Render State in the User Interface
### 在react中，這個State可以追蹤你重要的資料，來達成響應式更新。
當state更新，render函數自動被重新觸發，達到畫面更新的目的
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

## Render State in the User Interface Another Way
### 在這邊提供另一個方法來讓Component接收一個state
依照這種狀況，我們就可以將state資料做加工，渲染到畫面上。
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    {/* 在下面這行的意思是說，我們把state.name賦值給name */}
    const name  = this.state.name
    return (
      <div>
        {/* 然後在這邊我們把name傳進來 */}
        <h1>{name}</h1>
      </div>
    );
  }
};

```

## Set State with this.setState
在我們初始化state過後，我們也可以透過React 提供的 setState來改變state的資料
:::tip
並且React建議你，不要直接改變state的值，這主要是因為單向資料流，另外就是說透過setState你可以使用非同步來更新資料
:::
```jsx
this.setState({
    username: 'Lewis' // setState接收一個key:value對
})
```
另外注意到，只要render有綁的資料，都要在constructor內宣告
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  {/* 按下handleClick */}
  handleClick() {
    {/* 利用setState函數來改變state的值 */}
    this.setState({
      name:'React Rocks!'
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

## Bind 'this' to a Class Method
在class內綁定this給react（其實上篇就有用到這個技巧，只是有分一篇出來特別講這件事）
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello"
    };
    {/* 特別注意這邊要綁this，才不會讓this undefined */}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
};

```
## Use State to Toggle an Element
### 在設定setState的時候，我們也可以將其內部傳入一個function
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }
  toggleVisibility(){
    {/* 傳入arrow function ，藉此來改變state資料 */}
    this.setState(state =>({
      visibility : !state.visibility
    }))
  }
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}

```

## Write a Simple Counter
這次我們運用React來做一個簡單的計數器，記得我們同樣是使用setState來改變資料
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);

  }
  decrement(){
    this.setState(state => ({
      count: state.count-1
    }))
  }
  increment(){
    this.setState(state => ({
      count: state.count+1
    }))
  }
  reset(){
    this.setState({
      count:0
    })
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};

```

## Create a Controlled Input
### 這邊讓使用者操作與資料做同步綁定
```jsx
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    {/* 同樣地，也是要定義function在這邊 */}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
    this.setState({
      {/* 這個function 傳入一個參數，為event，接收其參數，讓input等於value */}
      input: event.target.value
    })
  }
  render() {
    return (
      <div>
        {/* 在這邊input綁定兩個，一為value、二為onChange的Function */}
        <input  value={this.state.input} 
          onChange={this.handleChange}/>
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};

```

## Create a Controlled Form
### 近一步的，這次換成輸入表格的方式
```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    // 防止瀏覽器的預設function
    event.preventDefault()
    this.setState({
      submit: this.state.input
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.input}
                  onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
        </form>
        <h1>{this.state.submit}</h1>
      </div>
    );
  }
}
```
