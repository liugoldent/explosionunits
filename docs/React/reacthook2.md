---
{
  "title": "React hook-p2",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# Hook 規則與打造Hook
## Hook 規則
* 只在最上層呼叫hook
    * 不要在迴圈、條件式或是巢狀的 function 內呼叫 Hook<br>
**eg:錯誤範例**
```jsx
// 在條件式中使用hook
if (name !== '') {
    useEffect(function persistForm() {
        localStorage.setItem('formData', name);
    });
}
```
**更改**
```jsx
useEffect(function persistForm() {
    // 👍 我們不再違反第一個規則
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```
* 只在React function 中呼叫 Hook：別在一般的JS function Component呼叫Hook

## eslint-plugin-react-hooks
安裝這個套件，可以使你的專案強制執行這兩個規則

## 打造自己的hook
### 提取一個自定義的Hook
* 當我們想要共享邏輯在兩個JS function中時，我們提取他成為第三個function
* **一個自定義的Hook，是以「use」為開頭命名的JS function**，而且也可能呼叫其他hook
#### 自定義hook
```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  return isOnline;
}
```
### 使用自定義hook
```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
* 每次我們使用自定義的Hook時，其所有內部的state & effect 都是完全獨立的
* 每個呼叫Hook的都會得到獨立的state
