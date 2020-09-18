# Introduce react inline style

## Introducing Inline Styles
在這邊要述說如何在react的render tag內加入`style`，基本上是使用
1. `<div style="color: yellow; font-size: 16px">Mellow Yellow</div>`
2. `<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>`
注意到第二點的fontSize寫法，在物件中React不接受「-」的寫法
```jsx
class Colorful extends React.Component {
  render() {
    return (
      <div
      style={{color:'red', fontSize:'72px'}}
      >Big Red</div>
    );
  }
};

```
## Add Inline Styles in React
在React的style中例如`height`/`width`/`fontSize`單位皆預設為`px`，但如果你有特別的單位，就必須另外設定。
* eg：`fontSize:"24em"`
```jsx
const styles = {
  color: 'purple',
  // 注意這邊使用 number 型態即可
  fontSize:40,
  border:'2px solid purple'
}
class Colorful extends React.Component {
  render() {
    return (
      // 在這邊綁定styles
      <div style={styles}>Style Me!</div>
    );
  }
};

```

## Use Advanced JavaScript in React Render Method
### 在render函數內，寫上JS function
```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class MagicEightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: ''
    };
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ask() {
    if (this.state.userInput) {
      this.setState({
        randomIndex: Math.floor(Math.random() * 20),
        userInput: ''
      });
    }
  }
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }
  render() {
    // 注意這邊已經是render函數內，但是我們也可以使用JS來寫出一些東西
    const possibleAnswers = [
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes, definitely',
      'You may rely on it',
      'As I see it, yes',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      "Don't count on it",
      'My reply is no',
      'My sources say no',
      'Most likely',
      'Outlook not so good',
      'Very doubtful'
    ];
    // 注意這邊已經是render函數內，但是我們也可以使用JS來寫出一些東西
    const answer = possibleAnswers[this.state.randomIndex];
    return (
      <div>
        <input
          type='text'
          value={this.state.userInput}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <br />
        <button onClick={this.ask}>Ask the Magic Eight Ball!</button>
        <br />
        <h3>Answer:</h3>
        <p>
          {answer}
        </p>
      </div>
    );
  }
}

```

## Render with an If-Else Condition
### 在render函數內加上if-else
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // 在這邊加上this.state.display的判斷
    // true則顯示，false隱藏
    if(this.state.display){
      return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1 >Displayed!</h1>
       </div>
    );
    }else{

    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
       </div>
    );
    }
  }
};

```
## Use && for a More Concise Conditional
### 把HTML & 邏輯寫在一起吧！
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
        {/*上篇主要是使用if/else，而在這邊，我們直接操作{}運算*/}
         {this.state.display && <h1>Displayed!</h1>}
       </div>
    );
  }
};

```

## Use a Ternary Expression for Conditional Rendering
### 在JSX中使用三元表達式
```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: '',
      input:'',
    }
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;

    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/*記得要在render函數內寫邏輯時，就是用{}包起來*/}
        { this.state.userAge === ''
            ? buttonOne
            : this.state.userAge >= 18 ?
             buttonTwo
            : buttonThree
        }
      </div>
    );
  }
}

```
## Render Conditionally from Props
### 玩個小遊戲吧
```jsx
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // 記得子組件是this.props.xxx
    return <h1>{this.props.fiftyFifty}</h1>;
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      // 這邊要+1是this.state.counter+1
      counter: this.state.counter + 1
    });
  }
  render() {
    // 同樣地，在這邊寫下邏輯，可以直接丟到HTML中
    const expression = Math.random() > 0.5 ? 'You Win!': 'You Lose!';
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        <Results fiftyFifty={expression} />
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}

```

## Change Inline CSS Conditionally Based on Component State
### 在這邊我們藉由改變資料，來改變inline的CSS
```jsx
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    // 同樣地，這邊一樣可以寫邏輯判斷，畫面要長怎樣
    if(this.state.input.length > 15){
      inputStyle.border = '3px solid red'
    }
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};

```