---
{
  "title": "過渡 & 動畫 ch2",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的進入/離開/列表過渡",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue transition, vue animation"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# 過渡 & 動畫 ch2
這篇主要述說一些數據元素本身的動畫
* 數字和運算
* 顏色和顯示
* SVG節點的位置
* 元素大小和其他property

## 狀態動畫與監聽器
這個部分有導入gsap這個套件來做demo
```html
<div id="animated-number-demo">
    當我們輸入數字後，會導去讓gsap這個api去做動畫
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>
```
```javascript
new Vue({
  el: '#animated-number-demo',
  data: {
    number: 0,
    tweenedNumber: 0
  },
  computed: {
    // 動作後computed進行動作
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    // 當number產生變化，computed就會動作
    number: function(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    }
  }
})
```
參考資料
[Vue.js 教程](https://cn.vuejs.org/v2/guide/transitioning-state.html)
