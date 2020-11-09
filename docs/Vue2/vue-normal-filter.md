---
{
  "title": "Vue filter",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的filter",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue filter"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# filter
* 適用情境：vue允許我們自定義過濾器，用於常見的一些字串格式
* 可用之處：雙花括號、v-bind表示式

## 基本例子
```html
<!-- 雙括號中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```
## 全域註冊
```javascript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```


## 局部註冊
```javascript
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
