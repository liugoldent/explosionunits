---
{
  "title": "了解組件",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的基本概念",
  "meta": [{"name":"keywords", "content":"vue component, vue, component base"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---

# 了解組件

## 組件註冊
### 註冊組件的名字
命名規則
1. kebab-case：my-component-name（開頭全小寫+ dash）
2. PascalCase：MyComponentName首字母大寫命名
```vue
Vue.component('my-component-name', { /* ... */})

<!--使用時-->
<!--kebab-case-->
<my-component-name />
<!--PascalCase-->
<MyComponentName />
```

### 全域註冊 vs 局部註冊
```vue
<!--全域註冊-->
<!--講解：vue底下建立一個component-a的組件-->
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })
<!--下面這行，建立出一個實例-->
new Vue({el: '#app'})

<div id="app">
  <!--所以在app內，可以使用component-a的組件-->
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```
```vue
<!--局部註冊-->
var ComponentA = { /* ... */}
var ComponentB = { /* ... */}
var ComponentC = { /* ... */}

new Vue({
  el: '#app',
  components:{
    'component-a':ComponentA,
    'component-b':ComponentB,
  }
})
```

### 模塊系統下的局部註冊
假定我們現在在ComponentB.vue的文件中
```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    // 如果要在ComponentB中導入ComponentA or ComponentC，就要先import在ComponentB中的 export
    ComponentA,
    ComponentC
  },
  // ...
}
```

### 基礎組件的全局註冊
假定今天我們有許多基本要用的組件（可能每個頁面都需要他，有個更好的方法是放在webpack內，放置這些組件，就不用一直import）
[基礎組件的自動化全局註冊](https://cn.vuejs.org/v2/guide/components-registration.html)
```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```
```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基礎組件文件名的正則表達式
  /Base[A-Z]\w+\.(vue|js)$/
)
```

## Prop
### 命名規則
1. in Component camelCase
```js
Vue.component('blog-post',{
    // 在js中，是camelCase
    props:['helloWorld'],
    template:''
})
```
```html
<!--在html中是kebab-case-->
<blog-post hello-world="hello!"></blog-post>
```

### props 類型
#### 基本類型
```
props :{
    title : String,
    likes : Number,
    isPublished : Boolean,
    commentIds : Array,
    author : Object,
    callback : Function,
    contactsPromise : Promise
}
```
#### 如何傳入props
```html
<blog-post v-bind:author="GuanTing Liu"></blog-post>
<!--或是等效於-->
<blog-post :author="GuanTing Liu"></blog-post>
```

### 單向數據流
:::warning
父級的props更新會向下流到子組件，但是反過來則不行。這樣可以防止子組件意外變更父組件的狀態。
同時這也代表著，我們不應該在子組件中改變prop
:::
1. 狀況一：子組件希望將其作為一個本地的prop數據來使用，所以在這邊我們要在data內定義好一個數據，其數據來自於prop
```
props: ['iniitialCounter'],
data : function(){
    return {
        counter: this.iniitialCounter
    }
}
```
2. 這個props的值要經過轉換。在這種情況下，要使用props的值來定義一個計算屬性
```
props:['size],
computed:{
    normalizedSize(){
    return this.size.trim().toLowerCase()
    }
}
```

### prop驗證
#### 基本prop類型與驗證
```javascript
Vue.component('my-component',{
  props:{
    propA: Number,
    // 多種類型
    propB: [Number, String],
    // 自定義類型/是否為必填/預設值
    propC:{
      type: String,
      required: true,
      default: "Hello"
    },
    // 自定義一個預設值（利用 function）
    propD:{
      type: Object,
      default: function(){
        return {message: 'hello'}
      }
    },
    // 自定義一個驗證函數
    propE:{
      validator: function(value){
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
#### 類型檢查
1. type可以是下列原生構造函數的其中一個
* String
* Number
* Boolean
* Array
* Object
* Data
* Function
* Symbol
2. 另外也可以是自定義的構造函數
```js
function Person(firstName, SecondName){
    this.firstName = firstName
    this.SecondName = SecondName
}
```
```js
Vue.component('blog-post',{
    props:{
        // 注意這邊，props的也可以是自定義的構造函數
        author: Person
    }
})
```

### 非prop的Attribute
資料來源：[Vue.js Core 30天屠龍記(第25天): 屬性注意事項](https://ithelp.ithome.com.tw/articles/10208723)
父組件的屬性蓋掉子組件的值，有時會產生非預期的結果，為了避免這樣的問題，Vue.js提供了`inheritAttrs`。
1. *`inheritAttrs= false`可以將組件設為不要帶入父組件的屬性值*
2. *`inheritAttrs`常搭配`attrs`使用，`$attrs`是父組件的屬性集合*
```javascript
Vue.component('counter', {
  inheritAttrs: false,
  props: ["initialCount"],
  data: function() {
    return {
      count: this.initialCount
    }
  },
  template: `
    <div>
      <button @click="count++">+</button>
      <span v-bind="$attrs">{{count}}</span>
      <button @click="count--">-</button>
    </div>
  `
});
```
```html
<!--父組件-->
<counter initial-count="5" class="thick" data-test="HelloTest"></counter>
```
```html
<!--結果-->
<!--因為你把inheritAttrs設定為false，所以像data-test這種自定義的屬性不會被代入根元素-->
<div class="thick">
    <button>+</button>
    <!--    這邊會帶入data-test的原因是，因為子component的template上加上了$attrs-->
    <span data-test="HelloTest">5</span>
    <button>-</button>
</div>
```

#### inheritAttrs 的結論
* props 一定都會被傳進去我們不討論
1. 如果設定為false：只有class會被傳入子組件
2. 如果設定為true：全部都會渲染給子組件

## 自定義事件
### $emit('name')
今天在子組件中，你必須要emit事件上來才可以讓父組件的事件動作
```javascript
this.$emit('childEvent')
```
```html
<!--在父組件中-->
<!--注意這邊childEvent要跟上面的emit名稱一樣-->
<child-component v-on:childEvent="doSomething"></child-component>
```
### 自定義組件的v-model
在input事件上，你可以綁定value來當作v-model，但像單選框或複選框這類的，你必須自行綁定一個值，來當其v-model
```javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      // 在這邊你可以透過綁定checked來當做其v-model
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```

### 將原生事件綁到組件上
在大部分的情境下，你可以使用`v-on.native`來監聽原生事件。但今天假設有個特殊元件其根元素是`<label>`就不能這樣做了
* 為了解決這個問題，vue提供了 `$listeners property`，裡面包含了這個組件上的所有監聽器
```
// $listeners property
{
  focus: function (event) { /* ... */ },
  input: function (value) { /* ... */ },
}
```
所以就可以自定義其事件產生
```javascript
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    // 這邊定義v-on要吃的funciton
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        // 從父元素取得所有監聽器
        this.$listeners,
        // 然後自定義一個新的監聽器，並且覆寫他
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        // 注意這邊，input是吃inputListeners這個function
        v-on="inputListeners"
      >
    </label>
  `
})
```

### .sync 修飾符
主要是解決，因為雙向綁定帶來維護上的問題（主因是父子組件沒有明顯的變更來源）
```javascript
// 雖然這樣符合單向數據流，但是在維護上，會十分多餘
this.$emit('update:title', newTitle)
```
為了方便起見，vue設定了一個縮寫: `.sync` 修飾符
```html
<!--所以在這邊看到.sync 就知道，我們不需要emit，vue就直接幫我們打emit上來-->
<text-document v-bind:title.sync="doc.title"></text-document>
```
但要注意到，`.sync`不可使用表達式與物件
```html
<text-document v-bind:title.sync="doc.title + '!'"></text-document>

<text-document v-bind:title.sync="{ title : doc.title}"></text-document>
```
