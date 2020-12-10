---
{
  "title": "React hook-p3",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# Hook API
## useState
### 基本用法
```jsx
const [state, setState] = useState(initialState)
```
* setState function：是一個非同步function，用來更新state。
* Lazy initial state
* if我們即將update的state與前一個state相同，那這次的update並不會re-render
### 函數式更新
```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      {/*以下為推薦寫法*/}
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
### 惰性state
原本的寫法是一個function+直接傳入數字，但這種寫法會讓每次在變化時，doSomething function都會再做一次
```jsx
const [state, useState] = useState(doSomething(0))
```
```jsx
const [state, setState] = useState(() => {
  // 重點是這個initialState function，會在初始render時使用，在後續render時會被忽略。
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```
### 參考
[關於 useState，你需要知道的事](https://medium.com/@xyz030206/%E9%97%9C%E6%96%BC-usestate-%E4%BD%A0%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E4%BA%8B-5c8c4cdda82c)

## useEffect(didUpdate)
預設情況下，useEffect會在每一個完整的render後執行，但我們也可以選擇在某些特定值改變的時候才執行
### 清除effect
```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription 將這個subscription清除掉
    subscription.unsubscribe();
  };
});
```
清除function會在Component從UI被移除前執行，防止memory leak。也就是會在下一次effect之前，上一個被清除掉
### 條件式觸發effect
```jsx
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  // 只有當props.source改變，才會重新建立subscription
  [props.source],
);
```
### 建議使用
* eslint-plugin-react-hooks規則
