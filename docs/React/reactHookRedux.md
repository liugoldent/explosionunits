---
{
  "title": "React-Redux with react Hook",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# react-redux with hook
## 安裝
1. react-redux
2. redux

## 使用方式
### 新增一個reducer.js
建議於store資料夾底下新增這個js檔案
```javascript
// 動作
const ADD_TODOLIST = 'ADD_TODOLIST';

// 資料
const initState = {
  todoList: ['firstReduce'],
};

// 更新state主要函數
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      const tempTodo = state.todoList.map(list => list);
      tempTodo.push(action.payload.listName);
      return {
        todoList: tempTodo,
      };
    }
    default:
      return state;
  }
};

export  default  reducer
```
### 主頁面引入主要使用工具
```jsx
import reducer from "../../store/reducer";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

function App() {
  // 創造一個store
  const store = createStore(reducer)

  return (
    <div className="App">
      // 使用react-redux的Provider 去使用store
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}
```

### 透過useSelector 從 store中取出資料
```jsx
import { useSelector } from 'react-redux'
const Counter = props =>{
    const List = useSelector(state => state.initList)
    return(
        <div>
            <li>{ List }</li>
        </div>
    )
}
```
