---
{
  "title": "React 主要概念-p2",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# React 主要概念-p2
## State 和生命週期
### 將Function Component 轉換為 Class Component
1. 建立一個相同名稱並且繼承React.Component的 ES6 Class
2. 加入一個render方法
3. 將 function 的內容搬到 render()方法內
4. 將 render內的 props替換成 this.props
5. 刪除剩下的空的 function 宣告
```jsx
function  Hello(props){
    return <h1>Hello , {props.word}</h1>
}
// to
class Hello extends React.component{
    render(){
        // 注意 render function 內也是要 return 的
        return(
            // 然後這邊改成 this.props
            <h1>Hello , {this.props.word}</h1>
        )
    }
}
```

### 加入 Local State 到 Class
```jsx
// 1. 將 render()方法內的 this.props.word 替換成 this.state.word
// 2. 在class內建立 this.state
// 3. 此時的word就不是props的，就是Component自己內部的state
class Hello extends React.component{
    constructor(props) {
        super(props);
        // 以下為第{2、3}步
        this.state = {
            word: 'String'
        }
    }
    render(){
        return(
            // // 以下為第{1}步
            <h1>Hello , {this.state.word}</h1>
        )
    }
}
```

### 加入生命週期方法到Class
:::warning
在具有許多component的應用程式中，當componenet被Destroy時，釋放所佔用的資源是非常重要的，所以就有生命週期的需求
:::
1. 每當組件(Component)被render到DOM時，在React中我們稱為「mount」
2. 當組建(Component)從DOM中被移除時，在React中我們稱為「unmount」
**同時我們就可以在class component的生命週期上執行一些code**
```jsx
class Hello extends React.component{
    constructor(props) {
        super(props);
        this.state = {
            word: 'String'
        }
    }
    componentDidMount(){
        // 第{1}步
    }
    componentWillUnMount(){
        // 第{2}步
    }
    render(){
        return(
            <h1>Hello , {this.state.word}</h1>
        )
    }
}
```

### 正確的使用State
**觀念**
1. 請不要直接修改State，這樣component不會重新渲染
```jsx
this.state.word = 'Bingo'  // (錯誤)

this.setState({word: 'Bingo'})
```
2. state的更新有可能是非同步的
這個問題的解法是利用 setState傳入參數為function()的方法
```jsx
this.setState((state, props)=>{
    counter: state.counter + props.increment
})
// 或是在使用async function時
this.setState(async (state,props)=>{
    return {
        counter: state.counter + props.increment
    }
})
```
3. state的更新將會被merge
當我們呼叫setState()時，React會合併我們所提供的物件到目前的state

### 向下資料流
:::tip
父組件 or 子組件不會知道某個組件是否是stateful or stateless的，而且他們也不在意它是透過function或是class被定義的
:::
這就是state通常被稱為local state 或被封裝的原因。因為除了它自己組件外的component都不能訪問他。
```jsx
// 向下傳遞
<FormatComponent date={this.state.date} />

function FormatComponent(props){
    // 在這邊 FormatComponent 並不知道上面是怎麼傳遞資料過來的
    return <h1>It's is {props.date}</h1>
}
```

## 事件處理
**1.React 的事件一律採用camelCase，而在html中則是小寫**
**2.事件的值在JSX中是一個function，而在HTML DOM中是一個string**
### 與html本質上的差異
1. 綁定值 or function
```html
// in html
<button onclick="activateLasers()">
    Activate Lasers
</button>

// in React
<button onClick={activateLasers}>
    Activate Lasers
</button>
```

2. 事件的prevent
在html中，我們可以使用return false來避免瀏覽器的預設行為。但是在react中，我們要明確定義prevent
```html
<a href="#" onclick="console.log('The link was clicked.');return false">Visit W3Schools.com!
</a>
<!--return false 會使得這個a元素，點下去不會有事情發生-->
```
下面是在react 中的避免瀏覽器行為寫法
```jsx
class ActionLink extends React.component{
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true}
    
        // 為了讓 `this` 能在 callback被使用，所以要用 bind 綁定
        this.handleClick = this.handleClick,bind(this)
    }
    handleClick(){
        this.setState((state)=>{
            isToggleOn : !this.isToggleOn
        })
    }
    render(){
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'On' : 'Off'}
            </button>
        )
    }
}

ReactDOM.render(
    <ActionLink />,
    document.getElementById('root')
)
```
又或是你覺得綁定this麻煩，你可以使用arrow function
（然而因為是props給下層component，有可能造成多餘的re-render）
因此官方建議在constructor內綁定。
```jsx
class LoggingButton extends React.Component{
    handleFunc(){
        console.log('Click Me')
    }
    render(){
        return(
            <button onClick={() => this.handleFunc()}>
                Click me
            </button>
        )   
    }
}
```

### 將參數傳給 Event Handler
同樣地，我們可以使用兩種方式傳遞參數給function
```jsx
<button onClick={(e) => this.deleteRow(id, e)}> Delete </button>
<button onClick={this.deleteRow.bind(this, id)}> Delete </button>
```

## 條件Render
1. 在function Component內你可以用return 不同東西，來顯示不同UI
```jsx
function Great(props){
    const isLoggedIn = props.isLoggedIn
    // 我們可以輕易地使用if else來判斷輸出的UI
    if(isLoggedIn){
        return <h1> Hello </h1>
    }else{
        return <h1> Hi </h1>
    }
}
```
2. 同樣地，function Component可以做的事，class也可以
```jsx
class Great extends React.Component{
    constructor(props) {
        super(props);
        // 同樣地綁定this
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLoggoutClick = this.handleLoggoutClick.bind(this)
        this.state = {
            isLogginStatus: false
        }
    }
    handleLoginClick(){
        this.setState({isLogginStatus: true})
    }
    handleLoggoutClick(){
        this.setState({isLogginStatus: false})
    }
    render(){
        // render函數內可以寫code
        const isLoggin = this.state.isLogginStatus
        let button
        if(isLoggin){
            button = <LogoutButton onClick={this.handleLoggoutClick} />;
        }else{
            button = <LogoutButton onClick={this.handleLoginClick} />;
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {/*注意下面這個button的寫法，是將html帶入render*/}
                {button}
            </div>
        )
    }
}
最後reactDOM渲染
ReactDOM.render(
    <Great />,
    document.getElementById('root')
)
```

### 在模板中加入邏輯運算子
#### inline-if
```jsx
class ReactComponent extends React.Component{
    render(){
        return(
            // 在這邊可以加入邏輯，來判斷這段是否要顯示
            // 記得當 true && expression 時，運算是會返回 expression
            // 記得當 false && expression 時，運算是會返回 false
            <h1> { la_BC.length > 0 && <h2> Hi </h2> } </h1>
        )       
    }
}
```
#### inline 三元運算子
```jsx
class ReactComponent extends React.Component{
    render(){
        return(
            <div>
              The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
            </div>
        )       
    }
}
```

### 防止Component Render
```jsx
class WarningBanner extends React.Component {
	constructor(props) {
		super(props);
	}
    // 只有當可以渲染時生命週期才會啟動
	componentDidMount() {
		console.log('componentDidMount')
	}
	render() {
        // 如果 return null 代表這個Component不會被渲染出來
		if (!this.props.warn) {
			return null
		}
		return (
			<div className="warning">
				Warning!
			</div>
		);
	}
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true }
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState(prevState => ({
			showWarning: !prevState.showWarning
		}));
	}

	render() {
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		);
	}
}

ReactDOM.render(
	<Page />,
	document.getElementById('root')
);

```
