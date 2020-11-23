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
