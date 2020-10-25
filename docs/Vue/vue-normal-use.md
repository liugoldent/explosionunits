---
{
  "title": "Vue Use",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的mixin",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue Use"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---

# Use

## 什麼是Vue.use(plugin)
#### Vue.use 是用來安裝插件的
`Vue.use(plugin)`
* 如果plugin是一個物件，則物件必須提供 `install`方法
* 如果plugin是一個函數，它會被作為`install`方法。此方法調用時，會將Vue作為參數傳入。
* Vue.use(plugin)調用後，插件的install方法會默認接收到一個參數，這個參數就是Vue
* 此方法需要在 `new Vue()`之前調用
* 當install 方法被同一個插件多次調用時，只會被安裝一次

## 簡單例子
當我們在用 Vue-cli3.0內的初始化項目時，會生成一個入口文件`main.js`<br>
在`main.js`中，我們安裝了Vue-router、VueX、ElementUI，並且想要在項目中使用，就要在main.js中調用Vue.use()
```javascript
Vue.use(ElementUi);
Vue.use(Vuex);
Vue.use(Router);
```
這樣就是完成了這三個插件的安裝，我們就可以在組件中調用 this.$router、this.$route、this.$store的這些方法

## 何時要Vue.use()
#### 問題點：為何在引入Vue-router要使用Vue.use()，但是用axios時不需要Vue.use()?
#### 關鍵點：回到plugin是物件or函數的問題
#### 原因：
:::tip
本質原因是：Vue-router、VueX、ElementUI三者都具有install方法，並且插件的運行依賴於install方法裡的一些操作，才能正常運行<br>
而axios沒有install方法也能正常運行
:::
#### 疑惑1：同樣是插件，為何有些插件有install可以用，有些沒有install可以用
#### 疑惑2：插件的install可以為我們做什麼？

## 源碼分析
### Vue.use 原理
```javascript
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 獲取已經安裝的插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 看看插件是否已经安装，如果安装了直接返回
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // toArray(arguments, 1)的功能為，獲取Vue.use(plugin,xx,xx)中的其他参数。
    // 比如 Vue.use(plugin,{size:'mini', theme:'black'})，就會回去到plugin意外的参数
    const args = toArray(arguments, 1)
    // 在参数中第一位插入Vue，從而保證第一个参数是Vue instance
    args.unshift(this)
    // 插件要麼是一个函数，要麼是一个物件(物件包含install方法)
    if (typeof plugin.install === 'function') {
      // 調用插件的install方法，並傳入Vue實例
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 在已经安装的插件數組中，放進去
    installedPlugins.push(plugin)
    return this
  }
}
```
:::tip
Vue.use方法主要做了以下的事：
1. 檢查插件是否有安裝，如果安裝了就不用再安裝
2. 如果沒有安裝，那麼調用插件的install方法，並傳入實例
:::

### Element UI 的install源碼
```javascript
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
	// components是ElementUI的组件陣列，裡面有Dialog、Input之類的组件
    // 往Vue上面掛載组件
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(Loading.directive);
    // 自定義一些參數
  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
    // 在Vue原型上註冊一些方法，这就是為什麼我们可以直接使用this.$alert、this.$loading的原因，值就是這麼来的。
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;

};
```
### router的源碼
```javascript
import View from './components/view'
import Link from './components/link'

// 生成一個私有的Vue
export let _Vue

export function install (Vue) {

  // 把Vue賦值給私有空間的_Vue
  _Vue = Vue

  // isDef：看一個參數是否被定義
  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    // i 是 vm 實例數據的父節點
    let i = vm.$options._parentVnode
    // 判斷一下當前組件的父節點是否存在，並且父節點的data被定義，然後查看data內的registerRouterInstance是否存在，存在就執行
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      // 防止出現registerRouterInstance 函數報錯，提前做好一系列的判斷
      i(vm, callVal)
    }
  }
  Vue.mixin({
    beforeCreate () {
      // 如果该组件是根组件
      if (isDef(this.$options.router)) {
        //  設置根組件叫_routerRoot
        this._routerRoot = this
        // 根组件的_router属性为，new Vue傳進去的router
        // $options是在mains.js中，new Vue裡的參數，在這裡我們傳入的參數
        this._router = this.$options.router
        this._router.init(this)
        // 通過defineReactive方法，來把this._router.history.current變成響應式的，此方法底層就是object.defineProperty
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 如果該組件不是根組件，那麼遞迴往上找，直到找到根组件的。
        // 因為Vue渲染组件是先渲染根组件，然后渲染根组件的子组件，然后再渲染孫子組件。
        // 结果就是每一個组件都有this._routerRoot属性，該属性指向了根组件。
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
  // 把自身$router代理为this._routerRoot（根组件的）的_router
  // 根组件的_router,就是new Vue传入的 router
  // 這樣就實現了，每一个Vue组件都有$router、$route属性
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
  // 同理，這樣就是把自身的$route，代理到根组件傳入的route
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
	// 註冊<router-view>组件
  Vue.component('RouterView', View)
	// 註冊<router-link>组件
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

:::tip
也就是底層的理由為：vueRouter需要在install方法裡，對Vue實例做一些自定義化的操作：
比如在vue.prototype中加入$router、$route、註冊`<router-link>`組件
:::

### axios不需安裝，開箱即用
因為axios是基於Promise封裝的庫，是完全獨立於Vue的，根本不需要掛載在Vue上也能實現發送請求<br>
並且因為VueRouter需要我們提供 $router、$routes之類的屬性，要依賴Vue才可以實現

## 自己編寫一個套件
```javascript
// api.js
import login from './login'; // login頁面所有的aixos請求封装在此
import home from './home'; // home頁面的所有請求封装在此
import detail from './detail'; // 详细頁面的請求封装在此

const apiList = {
  ...login,
  ...home,
  ...detail,
};

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;

  /* 
    定義属性到Vue原型中
    這樣每一个组件就可以通過this.$api.xxx(data) 去發送請求
  */
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiList;
      },
    },
  });
};
// 導出一個物件，裡面有install方法。install方法里就把$api代理到Vue中
export default {
  install,
};
```

## 參考資料
1. [Vue.use(plugin)详解](https://juejin.im/post/6844903946343940104)
