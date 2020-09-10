# Pass State to Component

#### 注意事項
#### 1. 單向資料流（子Components只能接收，不能改變）

## Pass State as Props to Child Components
### 把父組件的資料傳進去給子組件
```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         {/*這邊傳資料進去給子組件*/}
         <Navbar name={this.state.name} />
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    // 子組件接收資料
    super(props);
  }
  render() {
    return (
    <div>
      {/*然後把資料印出來*/}
      <h1>Hello, my name is: {this.props.name} </h1>
    </div>
    );
  }
};

```

## Pass a Callback as Props
### 我們不只可以把資料傳進子Component，同樣地，也可以把function傳入子Component
```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    // 定義好父組件的資料
    this.state = {
      inputValue: ''
    }
    // 定義好父組件的function
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
        {/*把父組件的資料與function 傳給子組件*/}
        <GetInput handleChange={this.handleChange}
                  input={this.state.inputValue} />
        {/*這邊只有傳父組件資料給子組件*/}
        <RenderInput input={this.state.inputValue}/>
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          // 這邊第一件是綁定value(來自於props）
          value={this.props.input}
          // 綁定function 來自於父組件
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        {/*接收來自父組件的資料*/}
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```
渲染過程：
1. 在父組件渲染好畫面
2. 輸入input後，change時，this.setState動作，相同於傳資料給父組件
3. 父組件接收到資料，再渲染給子組件(RenderInput)

## Use this Lifecycle Method ComponentWillMount
React提供了一些特殊的函數來展現一個組件的生命週期，又可以稱為lifecycle or hooks，以下條列一些hooks
1. componentWillMount()(這個將要在React 17 後被拔除)
2. componentDidMount()
3. shouldComponentUpdate()
4. componentDidUpdate()
5. componentWillUnmount()
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('WillMount')
  }
  render() {
    return <div />
  }
};
```

## Use the Lifecycle Method componentDidMount
### 注意這個生命週期，在這個週期呼叫API，資料回來後，會自動去trigger update一次，並更新畫面
這個方法是發生於組件被綁上DOM後，所以API setState會trigger re-render畫面
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        <h1>Active Users: {this.state.activeUsers}</h1>
      </div>
    );
  }
}

```


## Add Event Listeners
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    // 在react中，綁定Reacr自訂事件如同以下寫法
    document.addEventListener('keydown',this.handleKeyPress)
  }
  componentWillUnmount() {
        // 而移除事件也如同下面寫法，移除keydown，並加上function
      document.removeEventListener('keydown',this.handleKeyPress)
  }
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};

```

## Optimize Re-Renders with shouldComponentUpdate
### 我們可以透過shouldComponentUpdate內的`nextProps`、`nextState`，來確認是否該重新渲染該數值
在這個生命週期，主要是決定要不要重新渲染這個Component。
:::tip
呼叫時間點為：改變`state`後，`render`之前
:::
```jsx
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
// shouldComponentUpdate 接收兩個參數，一個是nextProps，一個是nextState
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // 這邊接收nextProps後，使用「.value來取值」
    if(nextProps.value % 2 === 0){
      return true;
    }
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}

```
