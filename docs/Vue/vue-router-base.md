---
{
  "title": "Vue router",
  "lang": "zH",
  "description": "此篇主要介紹 vue 的 router",
  "meta": [{"name":"keywords", "content":"Vue router使用, vue-router"}],
  "tags": ['Vue']
}
---
# Vue router (基礎篇)

## 安裝

[Vue Router 安裝](https://router.vuejs.org/zh/installation.html)

## 基本知識

1. 使用 vue 的第三方組件，需要通過 Vue.use 的方式來 install 組建

- 而 router 組件 install 時，會註冊兩個全局組件
  - router-link：跳轉頁面
  - router-view:在什麼地方顯示內容
- 每個組件上都有這兩個屬性
  - \$router: 包含所有方法
    - \$router.push({path:'home'})
    - \$router.replace({path:'home}) //更改網址，但沒有歷史紀錄
  - \$route: 包含所有屬性
    - path/query/params/fullPath/name/meta

2. export default new VueRouter({}) 裡面有各種屬性和路由的映射
   - mode: hash
   - mode: history
   - routes: 路由映射，什麼路由顯示什麼組件

## 解決問題

1. Vue router 解決了 Vue.js 在 SPA 不能進行鏈結跳轉，我們通過路徑的方式來管理不同的頁面

## 起步(基本的 vue-router 功能)

### 1. 動態路由

#### 基本設定
```javascript
// 在router中的index.js
import Vue from 'Vue'
import Router from 'docs/Vue/vue-router-base'
import Home from '@/pages/Home'

Vue.use(Router)

let routes = [
  {
    path: '/', // 鏈結路徑
    name: 'Home', // 路由名稱(在這邊命名，就可以使用push(name...))
    component: Home // 對應的組件
  },
  {
    path: '/user/:username', //動態路由設定,代表不管username怎麼變,都會到同一個component
    component: () => import('../pages/User1') // 對應的component
  }
]
```

#### 響應路由參數的變化

當我們使用動態路由時,從/user/foo to /user/bar 時,原來的組件也會復用。
因為兩個路由都渲染同個組件,比起銷毀再創建,效能更為高。但同時也代表著組件的生命週期不會再被調用

```javascript
// 監測$route物件
const User = {
  template: '',
  watch: {
    $route(to, from) {
      // 對應到route得到的所有東西
      // 看從哪個頁面: to
      // 到哪個頁面: from
    }
  }
}
// 守衛
const Users = {
  template: '',
  beforeRouteUpdate(to, from, next) {}
}
```

### 2. 嵌套路由(巢狀路由)

#### 架構
```
views
   ├── User.vue   
   ├── UserPosts.vue
   ├── UserProfile.vue
```

#### 要點 1: 基本上是使用 `router-view`來表達這種關係

#### 要點 2: 我們要在`router.js`中，使用`children`這個參數

Demo
```javascript
// router中的index.js
const router = new VueRouter({
  routes: [
    {
      path: '/User',
      name: 'User',
      redirect: '/User/profile',
      // 這個redirect的意思是說，當我們到/User時，它自動導向到/User/profile的奘
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/User.vue'),
      children: [
        {
          // 當 /user/profile 匹配成功，
          // UserProfile 這個component 會被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: () =>
            import(/* webpackChunkName: "about" */ '../views/UserProfile.vue')
        },
        {
          // 當 /user/posts 匹配成功，
          // UserPosts 這個component 會被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: () =>
            import(/* webpackChunkName: "about" */ '../views/UserPosts.vue')
        }
      ]
    }
  ]
})
```

:point_down: 在這邊router-view去控制/User/profile or /User/posts 的出現
``` vue
// views/User.vue
<template>
  <div class="user">
    <h2>User :{{ $route.params.id }}</h2>
    <button @click="toNext('posts')">toPosts</button>
    <button @click="toNext('profile')">toProfile</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default ({
  methods:{
    // 我們在父組件(User)去控制router-view該顯現出什麼
    toNext(str){
      this.$router.push({ path: `/User/${str}` })
    },
  }
})
</script>

```

### 3. 嵌套路由之命名視圖

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

```vue
<router-view class="view one"></router-view>
<router-view class="view two" name="b"></router-view> 
// 上面這邊name設定為b，會對應到Baz Component
<router-view class="view three" name="a"></router-view>
```

### 4. 重新導向
在上面就有示範過，`redirect`功用
```javascript
const router = new VueRouter({
    routes: [
        // 這邊redirect參數代表，當path指定到a時，會直接跳轉到/b
        {path: '/a', redirect: '/b'}
    ]
})
```

## 路由組件傳參數

```javascript
let routes = [
  {
    path: '/', // 鏈結路徑
    name: 'Home', // 路由名稱
    component: Home, // 對應的組件
    props: { GotoComponent: 'ck ' }
  },
  {
    path: '/', // 鏈結路徑
    name: 'Home', // 路由名稱
    component: Home, // 對應的組件
    props: { GotoComponent: 'ck ' }
  }
]
```

## 利用程式改變 url 的做法

### push (會在使用者的 history 上增加一個新紀錄)

| 聲名式              |     Code      |
| ------------------- | :-----------: |
| <router-link :to= > | router.push() |

```javascript
this.$router.push('/about') // about 是path名稱
this.$router.push({ path: '/about' })
router.push({ name: 'user', params: { userId: '123' } })
router.push({ path: 'user', query: { userId: '123' } })
```

::: warning
如果我們使用了 path,則 params 會被忽略
:::

### replace

```javascript
router.replace(location, onComplete?, onAbort?)
```

這邊跟`router.push`很像,但不同的是,`replace`不會向`history`添加新紀錄

### go

```javascript
// router.go(n) > n 為整數
this.$router.go(-1) // 倒回一頁
this.$router.go(1) // 向未來一頁
```

## Router Hook（路由鉤子）

1. **全局**
   - router.beforeEach：一般用來做權限控制
   - router.resolve
   - afterEach
2. **路由內**
   - router.beforeEach：用少少
3. **組件內**
   - beforeRouterEnter：裡面沒有 this
   - beforeRouterLeace：離開是否提醒，是否提交表單，是否關注
   - beforeRouterUpdate：用於路由參數更新，但是路由還沒更新時。

#### 每個路由都有三個參數

```javascript
this.$router.beforeEach((to, from, next) => {})
```
