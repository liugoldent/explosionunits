---
{
  "title": "React hook-p1",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# React hook p1
## 使用 function 的 Component
```jsx
import React, { useState } from 'react';

function Example() {
  // 宣告一個新的 state 變數，我們稱作為「count」。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/*這邊要注意的是，setCount是一個function，你會傳入一個數字去做計算*/}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
### 使用hook目的
1. 讓Component在重用Stateful 的邏輯變得簡單
2. 使用Hook，我們可以從Component抽取stateful邏輯，如此一來就可以被測試和重用

## Hook 概觀
1. `useState` 回傳一組陣列：目前的state數值和一個可以讓我們更新state的function
2. 這個state的function，我們可以透過event handler或其他地方呼叫這個function來更新其狀態

### 多個state變數
```jsx
function ExampleWithManyStatus(){
    const [age, setAge] = useState(42)
    const [fruit, setFruit] = useState('banana')
    const [todos, setTodos] = useState([{ text : 'Learn Hooks'}])
}
```
