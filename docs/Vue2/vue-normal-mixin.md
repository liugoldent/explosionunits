---
{
  "title": "Vue 混入(Mixin)",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的mixin",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue mixin"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# Vue 混入(Mixin)
適用情境：當有想要可復用功能時，可以把功能切出來，讓組件去復用

## 基本例子
```javascript
// def一個混入物件（跟vue的js寫法相同）
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 在這邊使用mixins 把code引入
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

## mixin 合併
### 當命名衝突時，將以自身component為優先
#### 包含 data、component、methods、directive
```javascript
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

// 下方為所謂的自身Component
new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // 注意這邊的 message，顯示為 new Vue的資料
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

### mixin的生命週期
:::tip
首先mixin的 created會先被調用
然後
換new Vue的 created調用
:::

### 全域混入
注意這個方法，會影響每個創建的Vue實例，所以最好命名名稱要命好
```javascript
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

## 自定義合併方式
如果想要自定義邏輯合併，可以向`Vue.config.optionMergeStrategies`
```javascript
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```
