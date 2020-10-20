---
{
  "title": "了解組件part2",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的基本概念",
  "meta": [{"name":"keywords", "content":"vue component, vue, component base"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# 了解組件part2

## 動態組件&非同步組件
### keep-alive
#### >解決保持組件的狀態，以避免重複渲染導致的性能問題
```html
<!--當我們在切換組件時（新標籤時）這個組件的內容會被重新渲染，但是假設我們今天先要暫存緩存著狀態，就可以使用keep-alive-->
<component v-bind:is="currentabComponent"></component>
```
改寫如下
```html
<!--這樣組件在切換過來過去時資料就會被緩存下來了-->
<keep-alive>
    <component v-bind:is="currentabComponent"></component>
</keep-alive>
```


## 非同步組件
:::tip
在大型應用中，我們可能需要將應用分割成一些小的代碼塊，並且只在需要時才從server加載一個模塊，為了簡化，vue允許我們用一個工廠函數，
來定義我們的組件，這個函數將會被非同步解析組件定義。只有在組件要渲染時，才會觸發該函數。
:::
```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 在callback中定義
    resolve({
    // 這邊的工廠接收到resolve回調，當然也可能有失敗的時候，我們也可以用失敗去做事。
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
另外我們也可以用動態導入的方式
```javascript
Vue.component(
  'async-webpack-example',
  // 這樣意思是動態導入一個Component
  () => import('./my-async-component')
)
```
又或是在局部註冊時，我們可以直接提供一個返回的Promise函數
```javascript
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

## 處理邊界情況
在大多數情況，我們盡量不要去觸發另一個組件的實例或手動操作DOM。不過有些時候我們需要這麼做

### 訪問根實例
#### `this.$root`（不推薦）
```javascript
// Vue 跟實例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```
所有子組件就都可以將這個實例作為一個全局store訪問or使用
```javascript
// 獲取根實例的數據
this.$root.foo

// 獲取根組件的數據
this.$root.foo = 2

// 訪問根組件的計算屬性
this.$root.bar

// 調用根組件的方法
this.$root.baz()
```
不過這對於小型或少量組件是很方便的，但對於大型組件或應用來說還是推薦用VueX。

### 訪問父級組件實例
#### `this.$parent`（不推薦）
```html
<!--像這種只有一層的算是還適合$parent寫法，因為有可能許多google-map的子組件都用得到其父組件的資料-->
<google-map>
  <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
</google-map>
```
但是像下面這種，擴充性，就會出現問題了
```html
<!--在這邊就有可能會用到this.$parent.$parent這種方法-->
<google-map>
  <google-map-region v-bind:shape="cityBoundaries">
    <google-map-markers v-bind:places="iceCreamShops"></google-map-markers>
  </google-map-region>
</google-map>
```

### 訪問子組件實例or子元素
儘管有prop or 事件，有時我們可能會想在js中訪問一個子組件。為了達到這個目的，我們可以使用 `ref`
```html
<my-component ref="useComponent"></my-component>
```
現在我們就可以在父級組件中使用：
```javascript
methods :{
    focus:function () {
        this.$refs.input.focus()
    }
}
```

### 依賴注入
在上面的this.$parent....委實不是個好方法。於是vue就也有個輪子叫做 `inject`、`provide`
1. provide：允許我們指定我們想要提供給後代組建的數據與方法
```javascript
// 父組件
provide: function(){
    return {
        getMap: this.getMap
    }
}
```
```javascript
// 子組件
inject: ['getMap']
```
相較於`$parent`，這個用法可以讓我們在任意後代組件中訪問getMap，而不需要暴露整個父組件。
:::tip
實際上，我們可以把依賴注入，看作一部分的大範圍有效的prop
:::

### 動態註冊鉤子方法
一般來說，假如我們使用第三方庫時，需要注意的就是在Vue銷毀時，我們也要一併把所建立的第三方庫銷毀
* 使用時機點：在單個組件內做很多建立和清理的工作。
```javascript
// 例如
mounted: function () {
  // Pikaday 是一個第三方的庫
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
beforeDestroy: function () {
    // 我們需要自己想好做在這邊，把這個庫銷毀掉
    this.picker.destroy()
}
```
但加入了動態hook後，我們不需如此
```javascript
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
    // 這個動態註冊，就是你可以再宣告的地方，就直接註冊好要清理掉的時機點  
  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```
其他還有如這些hook可以使用
```javascript
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]
```

### 事件監聽方法
1. $on(eventName, eventHandler) 偵聽一個事件
```javascript
// eventName { string | Array } 自定義事件名稱，可以使用陣列方式複數註冊。
// eventHandler { Funtion } 自定義事件觸發後，所執行的方法函數
// 通常都有個 $emit('myEvent') 來觸發事件
vm.$on('myEvent', function(data) {
    console.log(data);
});
```
2. $once(eventName, eventHandler) 一次性偵聽一個事件（只會觸發一次）
3. $off(eventName, eventHandler) 停止偵聽一個事件
```javascript
// 假設要註銷多個特定名稱的事件監聽器
this.$on('myEvent',()=>{
    this.$off(['eventA', 'eventB'])
})
```
### 組件之間的循環引用
```html
<!--tree-folder-->
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children"/>
</p>
```
```html
<!--tree-folder-content-->
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child"/>
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```
我們會發現，這兩個是不斷相依的組件，所以為了阻止這個悖論，我們可以等到beforeCreate時去註冊他
```javascript
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```
或是使用非同步的import
```javascript
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

### 模板定義的替代品
大部分時間，我們是都將Vue 模板鑲嵌在自己組件上，但有時為了彈性Vue也可以放在引用的子組件內
#### inline-template
```html
<template>
<!--父組件-->
    <my-component inline-template>
    <!--    這裡子組件直接定義模板-->
      <div>
        <p>These are compiled as the component's own template.</p>
        <p>Not parent's transclusion content.</p>
      </div>
    </my-component>
</template>
```
#### X-template
對於模板html內容比較多的模板，我們可以把模板定義在外面(script)，並且給予id資訊，在組件中的template設定目標id
```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```
風險：這些可以用於模板特別大的demo or較小型的應用，但是還是請盡量避免，因為會造成模板與組件之間難以分離
