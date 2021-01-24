---
{
  "title": "React Redux",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# React Redux

## Redux的好處
### 傳統的單向數據流（壞處）
* 向下props
```
--App：（props: none, state:{ count:42}）
 |--Title
 |--button
 |--Title
 |--Title
```
* 向上callback function
```
--App：handleClick得到數據
 |--Title
 |--button：props: onClick
 |--Title
 |--Title
```
:::warning
問題：多級or兄弟級傳遞數據是一種痛苦，這樣就會造成所謂的`prop-drilling`
:::
:::tip
所以我們就可以使用，Redux解決這個問題
:::
### 使用React-Redux做數據傳遞
我們可以使用`react-redux`的`connect`函數，將任何組件插入Redux的store，以及取出需要的數據

## Redux的替代品
### The React Context API
* 使用時機：當應用簡單時，想用簡單的方式傳遞數據，使用Context就可以了

## 學習Redux，從React開始
### 簡單的計數器
這邊複習一下React Hook的寫法
```jsx
function Home(){
  const [state, setState] = useState(0)
  const CSSclassName = 'buttonStyle'
  const word = 'Word'
  return (
    <div style={{margin:30}}>
      <h2 className={word}>Counter</h2>
      <button className={CSSclassName} onClick={() => setState(state+1)}>+</button>
      <span>{ state }</span>
      <button className={CSSclassName} onClick={()=> setState(state-1)}>-</button>
    </div>
  )
}
```
#### 運行機制
* count state 存儲在 Counter 組件
* 當用戶點擊 "+" 時，會調用按鈕的 onClick 處理器執行 increment 函數。increment 函數會更新 state 的 count 值。
* 因為 state 改變了，React 會重新渲染 Counter 組件（以及它的子元素），這樣就會顯示新計數值。

## redux vs react-redux
* redux 給我們一個store，讓我們可以在裡面保存state，取出state，以及當state發生改變時做出響應
* react-redux 把各種state & react 連接起來
* redux 是獨立的，他根本不認識react，所以他可以脫離react使用，與Vue or Angular or Express一起使用

## Redux
### 擁有全局唯一Store
* state：數據
* store：保存數據的地方
:::warning
1. reducer 的state不可為undefined
:::

## 創建Redux Store
### createStore
Redux可以使用一個方便的函數：`createStore`來創建store。
```jsx
import { createStore } from 'redux'
const store = createStore
```
### 再加上一個 reducer
因為Redux不會對我們的state做任何假設。他可能是一個object、number、string，或是任何需要的型態。
**所以我們需要創建一個返回`state`的函數，其稱為`reducer()`，並且我們要將它傳給`createStore`
```jsx
function reducer(state, action){
    return state
}
const store = createStore(reducer)
```

## Reducer 初始狀態（定義State）
### reducer職責
1. 接收當前`state` & `action`並返回新的state
2. 首次調用時，會返回初始state。有點像導引頁。必須從某處開始，慣用一個`initialState`變量然後使用ES6默認參數給`state`初始值
### 使用 reducer
```jsx
const initialState = {
    count: 0
}
function reducer(state = initialState, action){
    console.log('reducer', state, action)
    return state
}
```

## 使用 dispatch Actions（改變State）
### Actions
在Redux中，具有`type`屬性的普通物件被稱為action。
**重點是一定要有`type`**
**然後`type`名基本上是大寫**
```javascript
{
  type: "add an Item",
  item: "Apple"
}

{
  type: 7008
}

{
  type: "INCREMENT"
}
```
### Dispatch
這個dispatch內置於store內。調用時攜帶著action，Redux調用reducer時就會攜帶action。
```jsx
// 設定初始值
const initialState = {
  count: 0
}
// 設定reducer
function reducer(state = initialState ,action){
  console.log('reducer', state)
  return state
}
// 設定store（其內建.dispatch）
const store = createStore(reducer)
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });
```

### 操作state
```jsx
function reducer(state = initialState, action) {
  console.log('reducer', state, action);

  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
}
```
### SOP
1. 新增一個變數給reducer 的 state
2. 使用store來createStore
3. store設定dispatch
4. 回到reducer內就可以見到action
5. 我們可以在reducer內得到action type，來讓資料改變

## 保持純Reducer
### 規則
1. 一定要有action
2. 一定要是純函數（無side effect）
### 純函數
* 意思同：不要更改函數作用域以外的變量，不要調用其他會改變的函數（ex：`fetch`）
* 不要修改state參數，所以你要使用像下方的方式，你唯一可以做的就是return 函數
```jsx
switch(action.type) {
case 'INCREMENT':
  return {
    count: state.count + 1
  };
case 'DECREMENT':
  return {
    count: state.count - 1
  };
case 'RESET':
  return {
    count: 0
  };
default:
  return state;
}
```

## Redux 規則
1. State 唯讀，唯一修改他的方法是actions
2. 更新的唯一方式：dispatch > reducer > new State
3. Reducer 函數必須是純的：不能修改他的參數，也不能有副作用

## 如何在React中使用Redux
### 要素
* 使用react-redux的兩樣東西：`Provide`、`connect`函數
### 使用
在index.js中，引入`Provider`組件，然後用它把`App`的內容包裝起來。`store`會以prop方式傳遞
```jsx
import { Provider } from 'react-redux'

function App(){
    return (
        // 這樣`Counter`、`Counter`子元素都會拿到store
        <Provider store={store}>
            <Counter />
        </Provider>
    )
}
```
### 連接組件和Redux
要從Redux獲取`count`，需要在`Counter`組件的頂部引入`connect`函數
* connect 取出整個state，然後把它傳給我們提供的`mapStateToProps`函數
1. 首先
```jsx
import { connect } from 'react=redux'
```
2. 把Counter組件和Redux結合起來（使用connect）
```jsx
// 添加這個函數
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// 然後把
// export default Counter;

// 替换成:
export default connect(mapStateToProps)(Counter);
```

### React hook with Redux
```jsx
import React from 'react'
import { connect, useSelector, Provider, useDispatch } from 'react-redux'
import { createStore } from "redux";

// 定義初始狀態
const initialState = {
  count: 0
}
// 把初始態放入reducer
function reducer(state = initialState, action) {
    switch(action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1
        };
      case 'DECREMENT':
        return {
          count: state.count - 1
        };
      case 'RESET':
        return {
          count: 0
        };
      default:
        return state;
    }
  }
// 建立出一個新的store
const store = createStore(reducer)
// 然後定義新的dispatch type
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });


// 主要組件
function Home(){
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={()=> dispatch({ type: 'DECREMENT'})}>-</button>
        <span>{
          count
        }</span>
        <button onClick={()=> dispatch({ type: 'INCREMENT' })}>+</button>
      </div>
    </div>
  )
}

// connect函數必備之一
const mapStateToProps = function(state){
  return {
    count: state.count
  }
}

// connect函數寫法
connect(mapStateToProps)(Home)
```
### mapStateToProps工作機制
有點像是：`connect`把整個state傳給了我們的`mapStateToProps`函數，就像是在說告訴我你想從這堆東西裡面拿到什麼。
`mapStateToProps`返回的物件以props形式傳給了我們的組件。以上面為例就是把`state.count`的值用`count` prop傳遞：物件的屬性
變成了prop名稱，他們對應的值變成props的值。

### class Component with Redux
```jsx
class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  };
  
  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  };
  render() {
    return (
      <div className="counter">
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span className="count">{
            // 把 state:
            //// this.state.count
            // 替换成:
            this.props.count
          }</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}
// 添加这个函数:
function mapStateToProps(state) {
  return {
    count: state.count
  };
}
export default connect(mapStateToProps)(Counter);
```

## Action 常量
### 一個檔案 
建議把action常量放在一個檔案中。例如`action.js`
```jsx
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
```
### 再引入actions檔案
```jsx
import React from "react";
import { INCREMENT, DECREMENT } from './actions';

class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.props.dispatch({ type: INCREMENT });
  };

  decrement = () => {
    this.props.dispatch({ type: DECREMENT });
  };

  render() {
    ...
  }
}
```

### actions 生成器
主要就是使用function return 出actions常量
```jsx
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// 通常function是使用小寫作命名，但是action是用大寫
export function increment() {
  return { type: INCREMENT };
}

export const decrement = () => ({ type: DECREMENT });
```

### actions 生成器使用
```jsx
import React from "react";
import { increment, decrement } from './actions';

class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.props.dispatch(increment()); // << 在这使用
  };

  decrement = () => {
    this.props.dispatch(decrement());
  };

  render() {
    ...
  }
}
```

## mapDispatchToProps
當你厭煩了寫`this.props.dispatch`，你將會想要透過舒服的方式寫，那就使用`mapDispatchToProps`
```jsx
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

class Counter extends React.Component {
  increment = () => {
    this.props.increment();
  }

  decrement = () => {
    this.props.decrement();
  }

  render() {
    // ...
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// 在這邊我們用一個物件包起來
const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

## 透過thunk的非同步action
### 為何使用
因為actions主要處理同步事件
### 安裝
```npm
npm i --save redux-thunk
```
### 使用
1. 引入thunk
2. 通過redux的applyMiddleware
:::tip
必須確保thunk 包裝在applyMiddleware調用裡面，否則不會生效
:::
```jsx
import thunk from 'redux-thunk'
import { createStore, applyMiddlewate } from 'redux'

function reducer(state, action){

}

const store = createStore(
    reducer,
    applyMiddlewate(thunk)
)
```

## dispatch 給 action 來拿到數據吧
### 建議位置
1. componentDidMount
2. useEffect Hook
### 建議命名
通常會使用名稱：`BEGIN`、`SUCCESS`、`FAILURE`。只是慣例。
例如
1. 設置`loading`標誌為`true`以響應BEGIN操作
2. 在SUCCESS or FAILURE 之後設置 `false`
調用API之前 dispatch BEGIN action。成功後dispatch SUCCESS數據。失敗則dispatch訊息


## 參考
* [reducer](https://juejin.cn/post/6844903815594901512#heading-11)
