---
{
  "title": "過渡 & 動畫 ch1",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的進入/離開/列表過渡",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue transition, vue animation"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# 過渡 & 動畫 ch1
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
如果我們沒有為`<transition>`加上name，那就要使用v-enter
如果我們使用`<transition name="my-comp">`，那就可以使用my-comp-enter
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
而我們就可以在過渡的過程中使用function
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

## 初始渲染過渡
主要是在transition 後加一個appear，這樣就只會在節點初始渲染時做出過渡
```html
<transition appear>
  <!-- ... -->
</transition>
```
同樣地，我們也可以自定義過渡期間的CSS名稱
```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" 
>
  <!-- ... -->
</transition>
```
再來也可以自訂appear 前後要做的function
```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
>
  <!-- ... -->
</transition>
```
## 多個元素的過渡
基本上一樣就是在外層包著 transition
```html
<transition>
    <buttno v-if="isEditing"></buttno>
    
    <button v-else></button>
</transition>
```
### 過渡模式
vue 提供了兩種過渡模式給使用者
* in-out：新元素先過渡，完成之後當前元素過渡離開
* out-in：當前元素進行過渡，完成之後新元素過渡進入
```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

## 多個組件的過渡
其實也是如同上方多個元素的過渡，加個『mode』
```html
<transition name="component-fade" mode="out-in">
  <component v-if="view"></component>

  <component2 v-else></component2>
</transition>
```

## 列表過渡
* 主要使用情境會有v-for
* 會以一個真實元素呈現：默認為`<span>`。也可通過tag更換為其他元素
* 過渡模式不可用，因為不再相互切會特有的元素
* 需要提供 `key` attribute
* CSS會應用在內部元素中，而不是這個容器本身
### 基本例子
```html
<!--首先使用 group-->
<!--第二使用v-bind-->
<transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
```
一樣，因為我們有name="list"，所以定義其進入態與結束態
```css
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
```
### 平滑的排序過渡
```html
<!--主要是使用 flip-list 這個tag，然後再加上-move-->
<transition-group name="flip-list" tag="ul">
    <li v-for="item in items" v-bind:key="item">
      {{ item }}
    </li>
  </transition-group>
```
```css
/*move 內部的原理主要是使用了 FLIP 簡單的動畫陣列*/
.flip-list-move {
  transition: transform 1s;
}
```
### 交錯過渡
最後一樣將attribute與JS function綁在一起，就可以實現列表交錯過渡
```html
<transition-group
    name="staggered-fade"
    tag="ul"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <li
      v-for="(item, index) in computedList"
      v-bind:key="item.msg"
      v-bind:data-index="index"
    >{{ item.msg }}</li>
  </transition-group>
```
## 可復用的過渡
```javascript
Vue.component('my-special-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
      }
    }
    // 在這邊主要使用functional component 來實作這種可復用的component
    return createElement('transition', data, context.children)
  }
})
```
