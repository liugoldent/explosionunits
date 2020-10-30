---
{
  "title": "V-API",
  "lang": "zH",
  "description": "此篇主要介紹 vue 的全域API",
  "meta": [{"name":"keywords", "content":""}],
  "tags": ['Vue']
}
---
# V-API

## Vue.extend
#### 用法：Vue.extend({})
#### 參數：{Object}
使用基礎的Vue構造器，創建一個子類。
* data 在 extend中必須是一個函數
```html
<div id="mount-point"></div>
```
```javascript
// 創建構造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 創造一個實例，並掛載到元素上
new Profile().$mount('#mount-point')
```

## Vue.component
#### 用法：Vue.component(id, [definition])
#### 參數：{string} id && {function|Object} definition
#### 註冊或獲取全局組件。註冊還會自動使用給定的 `id`設置組件名稱
```javascript
// 註冊組件，傳入一個擴展過的構造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 註冊组件，傳入一個選項物件（自動調用vue.extend）
Vue.component('my-component', { /* ... */ })

// 獲取註冊的組件
var MyComponent = Vue.component('my-component')
```
:::warning
Vue.extend 和 Vue.component的差別
1. Vue.component要進行組件註冊才可以使用。Vue.extend是偏程式寫法
2. 組件的顯示是靠v-if or v-show，但Vue.extend是靠掛載與銷毀
3. Vue.component 使用起來更簡單。Vue.extend用來封裝一些全局組件
4. 若我們想在JS中方便的使用組件，可以使用Vue.extend + $mount
:::

## Vue.nextTick
#### 用法：Vue.nextTick([callback, context])
#### 參數：{Function}[callback] & {Object}[context]
#### 在修改數據後立即使用這個方法，獲取更新後的DOM
```javascript
// 修改數據
vm.msg = 'Hello'
// DOM 還没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 如果nextTick是Promise
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

## Vue.set
#### 用法：Vue.set( target, propertyName/index, value )
#### 參數：{Object | Array} target , {string | number} propertyName/index, {any} value
可參考
* [為什麼畫面沒有隨資料更新](https://pjchender.blogspot.com/2017/05/vue-vue-reactivity.html)

## Vue.delete
#### 用法：Vue.delete( target, propertyName/index )
#### 參數：{Object | Array} target , {string | number} propertyName/index
主要是用於將
```javascript
var a=[1,2,3,4]  
var b=[1,2,3,4]  
delete a[1]
    console.log(a)
    // 上面這個，只是把a[1]變為空而已    
this.$delete(b,1)
    console.log(b) 
    // 但這個是真的把陣列變成length = 3
```

## Vue.directive
#### 用法：Vue.directive( id, [definition] )
#### 參數：{string} id , {Function | Object} definition
講解：[vue 的自定義指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

## Vue.filter
#### 用法：Vue.filter( id, [definition] )
#### 參數：{string} id , {Function} [definition] 
講解：[過濾器](https://cn.vuejs.org/v2/guide/filters.html)

## Vue.use
#### 用法：{Vue.use( plugin )
#### 參數：{Object | Function} plugin
* 如果是一個物件，要提供install方法
* 如果是一個函數，他會被作為install方法
* 該方法需要在調用 new Vue() 前調用 
講解[插件](https://cn.vuejs.org/v2/guide/plugins.html)

## Vue.mixin
#### 用法：Vue.mixin( mixin ) 
#### 參數：{Object} mixin 
講解：[mixin](https://cn.vuejs.org/v2/guide/mixins.html)

## Vue.compile
#### 用法：Vue.compile( template )
#### 參數：{string} template
將一個模板編譯成render函數
```javascript
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```
講解[渲染函數 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)

## Vue.observable
#### 用法：Vue.observable( object )
#### 參數：{Object} object
* 讓一個物件可以響應。Vue內部會用他來處理data返回的物件
```javascript
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```
* 結合 provide來使用
```javascript
// A組件
provide() {
  this.theme = Vue.observable({
    color: "blue"
  });
 return {
    theme: this.theme
  }
 },
```
```javascript
// B組件
  inject: ['theme']
```

## Vue.version
提供字串形式的Vue安裝版本號，我們可以根據不同的版本號採用不同的策略
```javascript
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```


## 參考資料
[1.vue.extend 简单讲解](https://juejin.im/post/6844903448756895752)
