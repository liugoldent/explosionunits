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
