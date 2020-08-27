# Vue router

## 基礎安裝上手
```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './routes.js'

Vue.use(VueRouter);

export default new VueRouter {
  mode: 'hash',
  routes
}
```
注意到兩點：
1. 使用vue的第三方組件，需要通過Vue.use的方式來install組建
  * 而router組件install 時，會註冊兩個全局組件
    * router-link：跳轉頁面
    * router-view:在什麼地方顯示內容
  * 每個組件上都有這兩個屬性
    * $router: 包含所有方法
      * $router.push({path:'home'})
      * $router.replace({path:'home}) //更改網址，但沒有歷史紀錄 
    * $route: 包含所有屬性
      * path/query/params/fullPath/name/meta
2. export default new VueRouter({}) 裡面有各種屬性和路由的映射
  * mode: hash
  * mode: history
  * routes: 路由映射，什麼路由顯示什麼組件
## 利用程式改變url的做法

### push
```javascript
this.$router.push('/about') // about 是path名稱
this.$router.push({ path: '/about'}) 
```

### go
```javascript
// router.go(n) > n 為整數
this.$router.go(-1) // 倒回一頁
this.$router.go(1)  // 向未來一頁
```
### Router Hook（路由鉤子）
1. **全局**
    * router.beforeEach：一般用來做權限控制
    * router.resolve
    * afterEach
2. **路由內**
    * router.beforeEach：用少少
3. **組件內**
    * beforeRouterEnter：裡面沒有this
    * beforeRouterLeace：離開是否提醒，是否提交表單，是否關注
    * beforeRouterUpdate：用於路由參數更新，但是路由還沒更新時。
#### 每個路由都有三個參數
```javascript
this.$router.beforeEach((to, from , next)=>{

})
```
