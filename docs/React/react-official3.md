---
{
  "title": "React 主要概念-p3",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# React 主要概念-p3
## 列表與key
### 使用map來渲染出列表
```jsx
const numbers = [1, 2, 3, 4, 5];
// 下面這邊也是用jsx語法，但是記得是使用map語法，因為map才會return 資料出來
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
    // 然後這邊用ul包起來，跟一般render寫法一樣
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
### 使用function Component包裝
```jsx
function NumberList(props){
  // 這邊引入props參數，然後把其資料提出來
  const numbers = props.numbers
  // 這邊先定義好，要render的資料
  const listItems = numbers.map(data =>{
    return(
      // 記得在 render 函數上，要放上key值
      <li key={data.toString()}
        >{data*2}</li>
    )
  })
  
  return(
    // 最後 return 模板
    <ul>{listItems}</ul>
  )
}
// 設定props
const intoFuncNumbers = [1,2,3,4,5]
ReactDOM.render(
  // 引入functional Component，然後props進去東西
  <NumberList numbers={intoFuncNumbers} />,
  document.getElementById('root')
)
```

### 使用key值
#### 目的：Key值可以幫助React分辨哪些項目被改變、增加、刪除。在Array中應該都要有一個key值，才可以給予每個element一個固定的身份
* demo1：如果你的資料有ID，那可以用資料的ID去做key
```jsx
const todoItems = todos.map(data =>{
    return(
        <li key={data.id}>
            {data}
        </li>
    )
})
```
* demo2：如果沒有key只好使用index（不建議）
```jsx
const todoItems = todos.map((data, index) =>{
    return(
        <li key={index}>
            {data}
        </li>
    )
})
```

### 官方推薦的key值放置位置
:::tip
React 建議 key只有在array環境中才有意義
:::
```jsx
function ListItem(props){
  return(
    // 這邊不負責key
    <li>{props.value}</li>
  )
}

function NumberList(props){
  const numbers = props.numbers
  const listItemsComp = numbers.map(data =>{
    return (
      <ListItem key={data.toString()} value={data} />
      )
  })
  
  return (
    <ul>
      {listItemsComp}
    </ul>
  )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers} />, document.getElementById('root'))
```

### 在JSX中放入Map
記得，我們同時也可以在JSX中寫進map
```jsx
function ListItem(props){
  return(
    <li>{props.value}</li>
  )
}

function NumberList(props){
  const numbers = props.numbers
  return (
    <ul>
      { 
        numbers.map(data =>{
          return  <ListItem key={data.toString()}
                    value={data}/>
        })
      }
    </ul>
  )
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers} />, document.getElementById('root'))
```

## 表單
在React中，他們建議我們使用`Controlled Component`來處理使用者輸入的表單
### Controlled Component
在HTML中，表單的element像是`input`、`textarea`、`select`通常會維持他們自身的state，並根據使用者的輸入來更新狀態。
在React我們只能以`setState()`來更新資料<br>

#### 我們可以透過將React的state變成唯一真相來源。如此render表單的React Component同時也掌握後續使用者的輸入。
#### 像這樣React控制使用者的輸入值，被稱為「Controlled Component」

### demo1- input
```jsx
class NameForm extends React.Component {
  constructor(props) {
    // super(props)為固定用法，要把props的東西傳進來
    super(props);
    // 這是狀態的物件
    this.state = {value: ''};

    // 記住 Reacr 在寫function，需要綁定this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 這邊在控管事件，有點像Controller在控制是否可以更新
  handleChange(event) {
    let result
      if(typeof(event.target.value) === 'string'){
         result = event.target.value.toUpperCase()
      }
      this.setState({value: result});
  }

  // 這邊做提交事件，同樣也是像是Controller的概念
  handleSubmit(event) {
    setTimeout(()=>{
      alert('A name was submitted: ' + this.state.value);
    },2000)
    // 記得這邊要preventDefault事件
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          {/*這邊使用 this.state.value 去做綁定*/}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
ReactDOM.render(<NameForm />, document.getElementById('root'))
```

### textarea 
其實這部份大同小異，寫法相同
```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const style = {
      width: '300px'
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} style={style}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

ReactDOM.render(<EssayForm />, document.getElementById('root'))
```

### select
```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          // 注意這邊，select綁定value，然後在改變時，也是加個onChange上去
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
ReactDOM.render(<FlavorForm />, document.getElementById('root'))
```
#### 注意：如果 select 上有加上
1. `multiple={true}` > 代表多選
2. 此時 `value={['B', 'C']}` 型態就會成為陣列

### 多個輸入
```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // 像上面一樣，可以去做守衛
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // 這邊是個聰明的作法，直接使用[name] 然後把value丟進去
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          {/*綁定值的部分要與state相互應*/}
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          {/*綁定值的部分要與state相互應*/}
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation />,
  document.getElementById('root')
);
```

### 進階閱讀：
1. [Formik表單驗證](https://formik.org/)

