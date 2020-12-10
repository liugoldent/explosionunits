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
# State and Effect Hook
## 使用hook目的
1. 讓Component在重用Stateful 的邏輯變得簡單
2. 使用Hook，我們可以從Component抽取stateful邏輯，如此一來就可以被測試和重用

## State Hook
Hook是讓你可以使用到React各項功能的特殊function。
* eg：`useState`可以讓你增加React state到function Component的Hook
### 宣告一個變數
```jsx
import Reacr, { useState } from 'react'
function Example(){
    const [count, setCount] = useState(0)
}
```
* 呼叫`useState`，並宣告一個state變數。上面的變數叫count。這是一個在function呼叫中「保留」變數的方法
* 我們傳入一個參數給`useState`當作初始值
* `useState`回傳一對值：目前的值跟一個可以更新state的function
### 讀取State
現在在function中，我們可以直接使用變數
```jsx
<p>You Click {count} times</p>
```
### 更新State
```jsx
<button onClick={()=> setCount(count+1)}>
Click Me
</button>
```

## Effect Hook
### 可清除的Effect
* 注意這個Effect Hook 在一開始render時就會被執行一次
```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 一開始就render一次，然後每次更新值時，又會再更新一次
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* useEffect，可以告訴React你的Component要在render後，做一些事情
* 每次render之後，都會觸發useEffect函數
* 但是這是無法被清除的

### 不可清除的Effect
我們使用return function來清除它
```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 在這邊寫到我們如何去清除訂閱的Effect
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
* 使用return function 去清除訂閱Effect
* React在卸載時清除Effect
### 通過忽略Effect來最佳化效能
```jsx
useEffect(()=>{
    document.title = `You Click ${Math.random()} times`
  }, [count]) 
```
* 上面的第二個參數`[count]`代表如果前一個值，跟後面一個值相同，那Effect就不會再做動作一次
