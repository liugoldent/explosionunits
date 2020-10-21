---
{
  "title": "組件進入/離開/列表過渡",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的進入/離開/列表過渡",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue transition"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# 組件進入/離開/列表過渡
## 單元素/組件的過渡
### 例子
Vue提供了`transition`的封裝組件，在下列情形中，可以給任何元素和組件添加進入/離開的過渡
* v-if
* v-show
* 動態組件
* 組件根節點
```html
<transition name="fade">
    <p v-if="show">hello</p>
</transition>
```
```css
/*進來的總狀態與離開的group*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
/*然後你要去控制一開始進來的透明度與最後來開的透明度*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0; 
  /*0 完全透明, 1 完全不透明*/
}
```
![vue enter & vue leave](https://cn.vuejs.org/images/transition.png)

### 過渡的名稱
1. `v-enter`：進入過渡的初始狀態。在元素被插入之前生效。被插入之後下一禎移除
2. `v-enter-active`：在元素被插入之前生效。插入完成後移除。可用來定義過渡時間/延遲/曲線函數
3. `v-enter-to`：定義過渡結束狀態。在元素被插入之後下一禎生效（於此同時v-enter被移除）
4. `v-leave`：定義離開過渡的開始狀態。在被觸發當下立刻生效。下一禎移除
5. `v-leave-active`：定義過渡生效時的狀態。在整個離開過渡的階段中應用。可用來定義過渡時間/延遲/曲線函數
6. `v-leave-to`：在離開過渡觸發後的下一禎生效，在過渡完成之後刪除。
:::tip
如果我們沒有為<transition>加上name，那就要使用v-enter
如果我們使用<transition name="my-comp">，那就可以使用my-comp-enter
:::

### 自定義過渡名稱
* enter-class
* enter-active-class
* enter-to-class
* leave-class
* leave-active-class
* leave-to-class
```html
<transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
 >
```
記住：他們的優先級高於普通的class

### 顯性的持續時間
在很多情況下，我們可以自動得出過渡效果的完成時間。用法如下
```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### 與JS的鉤子
```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
```
而我們就可以在js中使用
```javascript
methods: {
  beforeEnter: function (el) {
    // ...
  },
  // leaveCancelled 只用於v-show中
  leaveCancelled: function (el) {
    // ...
  }
}
```
