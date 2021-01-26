---
{
  "title": "React Class Component to Hook",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React']
}
---
# Class To Hook Component
這篇主要述說，要如何將class Component 轉變為React Hook形式的Component
## 簡單的Redux 組件
```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSwitch } from "./UiReducer";

class Toggle extends Component {
  render() {
    const { ui, toggleSwitch } = this.props;
    return (
      <div>
        <div>{JSON.stringify(ui)}</div>
        <input
          type="checkbox"
          value={ui.toggle}
          onChange={toggleSwitch}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  ui
});

export default connect(
  mapStateToProps,
  { toggleSwitch }
)(Toggle);

```
## 1. 將Class 轉變為函數組件
* 我們目前一樣是從store讀取狀態，透過mapStateToProps並將函數封裝在 `connect` HOC中
```jsx
import React from 'react'
import { connect } from 'react-redux'
import { toggleSwitch } from './UiReducer'

// 最主要的是這邊，從this.props轉變為參數傳入
const Toggle = ({ui, toggleSwitch}) =>{
    return (
        <div>
            <div>{JSON.stringify(ui)}</div>
            <input type="checkbox" value={ui.toggle} onChange={toggleSwitch}/>
        </div>
    )
}

// 就算是hook，一樣要使用mapStateToProps
const mapStateToProps = ({ui}) =>({
    ui
})
// 一樣使用connect，然後後面加上組件
export default connect(
    mapStateToProps,
    { toggleSwitch }
)(Toggle)
```

## 2. useSelector
讓我們從**取得狀態**開始。我們需要從`react-redux`包中導入`useSelector`。使用`useSelector` hook，可以讀取狀態
```jsx
import React from 'react'
import { connect, useSelector} from 'react-redux'
import { toggleSwitch } from './UiReducer'

const Toggle = ({ toggleSwitch })=>{
    // 看到這邊，我們的ui是從redux中取出的。然後記得第一個是狀態
    const ui = useSelector(state => state.ui)
    return (
        <div>
            <div>{JSON.stringify(ui)}</div>
            <input type="checkbox" value={ui.toggle} onChange={toggleSwitch} />
        </div>
    )
}
```

## 3. useDispatch
* useDispatch 讓我們對redux 進行操作。同樣地我們也要導入useDispatch
```jsx
import React from "react";
// 先引入
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE } from "./UiReducer";

const Toggle = () => {
  const ui = useSelector(state => state.ui);
  // 在這邊讓一個變數等於useDispatch
  const dispatch = useDispatch();
  return (
    <div>
      <div>{JSON.stringify(ui)}</div>
      <input
        type="checkbox"
        value={ui.toggle}
        // 在這邊直接dispatch({ type: 'xxxx' })
        onChange={() => dispatch({ type: TOGGLE })}
      />
    </div>
  );
};

export default Toggle;
```
## 傳遞payload給dispatcher
```jsx
dispatch({type: TOGGLE, payload: 'My payload'})
```
## 參考
* [[译]如何结合React Hooks来使用Redux](https://juejin.cn/post/6844903955739197447)
