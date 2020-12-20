---
{
  "title": "React router",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React']
}
---
# React router
## 起手式
通通都要先import
* BrowserRouter 可以包住所有的東西，包含Router與Link
* Router 為包住主要Route的語法：包括相對路由和鏈結、自動路由排名、嵌套路由和佈局這些功能
* Route 主要負責渲染UI。有`path`屬性 & `element` 屬性
```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
} from "react-router-dom";
```

## BrowserRouter vs HashRouter

## Basic Router
* 
```jsx
// 主要Component
function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>在React中使用React Router v6 的指南</p>
    </div>
  );
}

function App() {
  return (
    // 最大的Router
    <Router>
      {/*要route的一定都要用Routes包住*/}
      <Routes>
        {/*最後Route主導要去哪裡*/}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
```

## Navbar 生成
### 使用Link
```jsx
// 一樣是在Router內
<Router>
  {/*主nav*/}
  <nav style={{ margin: 10 }}>
    {/*特殊語法Link*/}
    <Link to="/" style={{ padding: 5 }}>
      Home
    </Link>
    <Link to="/about" style={{ padding: 5 }}>
      About
    </Link>
  </nav>
  {/* 其余代码保持不变 */}
</Router>
```

## 巢狀路由
* 使用時機：title依舊保持在上方，但內容一直變換的狀況
* 使用`Outlet`函數
```jsx
const BlogPosts = {
  '1': {
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.'
  },
  '2': {
    title: 'Second Blog Post',
    description: 'Hello React Router v6'
  }
};
// 主要標題部分
function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      {/* 渲染任何匹配的子级 */}
      <Outlet />
    </div>
  );
}
// 嵌套內容
function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <h3>{title}</h3>
        </li>
      ))}
    </ul>
  );
}

// 主要Routes部分
<Routes>
  {/* 其余代码保持不变 */}
  <Route path="posts" element={<Posts />}>
    <Route path="/" element={<PostLists />} />
  </Route>
</Routes>
```

## 動態參數
* 使用 `useParams`
```jsx
function Post() {
  const BlogPosts = {
    "1": {
      title: "第一篇博客文章",
      description: "第一篇博客文章，是关于Vue3.0的"
    },
    "2": {
      title: "第二篇博客文章",
      description: "Hello React Router v6"
    }
  };
  // 將參數解構出來，往下一路解構，再渲染
  const { slug } = useParams();
  const post = BlogPosts[slug];
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
// 主要Route加內部兩種Router
<Route path="posts" element={<Posts />}>
  {/*注意這個預設的Router*/}
  <Route path="/" element={<PostLists />} />
  {/*然後下方這種綁定的寫法也要注意*/}
  <Route path=":slug" element={<Post />} />
</Route>

```

## 參考
* [React Router 使用指南](https://juejin.cn/post/6862305213148381198#heading-0)
