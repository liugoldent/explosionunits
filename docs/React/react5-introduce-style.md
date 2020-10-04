---
{
  "title": "Introduce react inline style",
  "lang": "zH",
  "description": "Introduce react inline style",
  "meta": [{"name":"React Introduce react inline style", "content":"freecodeCamp Introduce react inline style"}],
  "tags": ['React']
}
---
# Introduce react inline style

## Introducing Inline Styles
### 在這邊要述說如何在react的render tag內加入`style`
```jsx
// 第一種寫法： style="color: yellow; font-size: 16px"
// 第一種寫法： style={{color: "yellow", fontSize: 16}}
// 注意到第二點的fontSize寫法，在物件中React不接受「-」的寫法
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

## Use Array.map() to Dynamically Render Elements
### 這邊使用Array.map()返回一連串的數值，來顯現在外面上
```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    // change code below this line
    this.state = {
      userInput: '',
      toDoList: []
    }
    // change code above this line
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    // 注意這個其實也可以讓變數=一個function的JSX
    const items = this.state.toDoList.map(function(data)    
    {
        // 然後記得小括號
      return <li>{data}</li>
    }) 
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}

```
## Give Sibling Elements a Unique Key Attribute
### 這次我們一樣渲染列表，但是在li上加上key值
```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
    // 這次map的function參數多傳了一個index
  const renderFrameworks = frontEndFrameworks.map(function(data,index){
    // 而我們的li元素，將會綁定key值，所以在render上，只要key值變動，react就會重新render
    return <li key={index}>{data}</li>
  })
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};

```

## Use Array.filter() to Dynamically Filter an Array
### 再來主要使用filter & map 做出一樣的list，但注意這次陣列內部是物件
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    };
  }
  render() {
    const usersOnline = this.state.users.filter(data => data.online)
    const renderOnline = usersOnline.map(function(data,index){
    // 這邊為物件，所以要用data.username
      return <li key={index}>{data.username}</li>
    })
    return (
      <div>
        <h1>Current Online Users:</h1>
        <ul>{renderOnline}</ul>
      </div>
    );
  }
}

```

## Render React on the Server with renderToString
### 在之前，我們都是render在Client端的畫面，現在我們試著render 在Server端
#### 事實上，React也提供了`renderToString()`這個方法來達到這個目的
而用Server render主要有兩個好處
#### 1. for 搜尋引擎來說：比較好被搜尋到。因為如果我們在server render好，搜尋引擎就會讀到我們render好的html
#### 2. 更快的初始頁面loading：因為render一個HTML，比render一個JS app快。並且在初始loading完後，React也會繼續執行js part
```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};
// 記得這個App因為也是Component所以要寫成 <App />
ReactDOMServer.renderToString(<App />)
```
