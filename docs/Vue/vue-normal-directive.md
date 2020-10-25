---
{
  "title": "Vue Directive",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的Directive",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue Directive"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# Directive
適用情境：當我們想要自定義一些如 v-model or v-bind 這類指令時，可以使用directive

## 基本例子
### 全域註冊
```javascript
// 註冊一個全域的指令 v-focus
Vue.directive('focus', {
  // 當被綁定的元素插入到DOM中時
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

### 局部註冊
```javascript
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

## 鉤子函數
### 修飾符
* bind：只調用一次，指定第一次綁定到元素時調用。可以進行一次性的初始化配置
* inserted：被綁定元素插入父節點時調用（保證父節點存在，但不一定會被插入）
* update：所在組建的VNode更新時調用
* componentUpdated：指令所在組建的VNode 及其 子Vnode 全部更新後調用
* unbind：只調用一次，指令與元素解綁時調用

### function 參數
* el：綁定的元素，可以用來直接操作DOM
* binding：一個物件，包含以下屬性
    * name：指令名
    * value：指令綁定值
    * oldValue：指令綁定的前一個值，在`update`、`componentUpdated` hook中使用
    * expression：字符串形式的指令表達式
    * arg：傳給指令的參數
    * modifiers：修飾符物件
* vnode：虛擬節點
* oldVnode：上一個虛擬節點

### 動態指令參數
`v-mydirective:[argument]="value"`中 `argument`參數可以根據組件實例數據進行更新
```html
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin="position">Stick me 200px from the top of the page</p>
  <button @click="addpinValue()">Add</button>
  {{position}}
</div>
```

```javascript
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  },
  update: function(el, binding, vnode) {
    el.style.top = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample',
  data:{
    position:200
  },
  methods:{
    addpinValue(){
      console.log('1')
      this.position = this.position+100
    }
  }
})
```

## 物件字面量
```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>

```

```javascript
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```
