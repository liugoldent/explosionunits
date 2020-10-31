---
{
  "title": "V-system",
  "lang": "zH",
  "description": "此篇主要介紹 vue 的一些基本用法",
  "meta": [{"name":"keywords", "content":"v-text,v-html,v-if,v-else,v-else-if,v-show,v-for,v-on,v-bind,v-model,v-pre,v-cloak,v-once"}],
  "tags": ['Vue']
}
---
# V-system

## v-text
#### 渲染純文字內容
```vue
<p v-text="msg"></p>
<!--當msg 尚未加載完成時，並不會顯示其內容-->
<!--反之若 <p>{{ msg }}</p> 未加載完時，會顯示{{msg}}-->
```
今天假設有
```vue
<p v-text="msg">OldMsg</p>
<!--在渲染時，OldMsg會被msg覆蓋掉-->
```

## v-html
#### 插入整個html 結構
適用時機：當你要將html導入至你的文章時。
:::warning
在渲染時，因為是由 v-html 渲染的，所以如果你在 scoped樣式中寫css，這邊的v-html 吃不到
:::
```vue
<h1 v-html="showH1"></h1>
<!--與v-text使用雷同，但不建議使用，因為怕遭受到XSS攻擊-->
```

### compare: v-text / v-html / {{}}
```vue
<p v-text="msg"></p>  (1)
<p v-html="msg"></p>  (2)
<p>{{ msg }}</p>  (3)
```
1. 以上三者渲染相同，但是 (1) & (2)在尚未加載完成前，不會被渲染出來。
2. v-text & v-html 只能根據data 設置的內容渲染，但是 `{ msg }` 可以增加贅字。例如 `+++ { msg } +++`
3. 若 msg = `<h1>Hello World</h1>`。那v-text & {{}} 會渲染出字串。但 `v-html` 會渲染出 Hello World

---------------------------------------
---------------------------------------

## v-if
#### 用於條件性渲染一塊內容。這塊內容只會在條件為true時被渲染
```vue
<h1 v-if="true"> Hi </h1>
```

## v-else
#### 與v-if一起使用。這塊內容只會在條件為false時被渲染
```vue
<div v-if="true"> Hi </div>
<div v-else> HiHi </div>
```

## v-else-if
#### 基本上要有v-if，並且可以連續使用
```vue
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## v-show
#### 與v-if相同，當條件為ture時會被選染到DOM中。
:::warning
不同的是，v-show= ture || false，會保留在DOM中，只是切換其CSS property的 `display`
:::
```vue
<div v-show="true"> VSHOW DEMO</div>
<!--若 true 則使用者看得到，若為false使用者看不到，但底層程式依舊在運行，因為只是display的控制而已-->
```

---------------------------------------
---------------------------------------

## v-for
1. 根據一個陣列來渲染列表
```html
<!--item : 數值-->
<!--index : 索引-->
<li v-for="(item, index) in items" :key="item.message">
    {{ item.message }}
</li>
```
```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
2. 根據一個物件渲染
```vue
<!--value： value-->
<!--name : key-->
<!--index : 第幾個索引-->
<!--原理：使用Object.keys()遍歷-->
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```
```javascript
let object = {
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
}
```

## v-on
#### 主要控制事件發生
1. 縮寫 `@`
2. 預期接收 `function | Inline Statement | Object`
#### 事件修飾符
```vue
<!--.stop - 原理:調用event.stopPropagation()-->
<!--停止冒泡事件-->
<button @click.stop="DoThing"></button>

<!--.prevent - 原理:調用event.preventDefault()-->
<!--阻止默認行為-->
<button @click.prevent="DoThing"></button>

<!--.capture - 添加事件監聽器時使用capture模式-->
<!--設定capture事件一定會先觸發-->
<button @click.capture="DoThing"></button>

<!--.self - 只有觸發此DOM元素本身才會觸發self事件-->
<button @click.self="DoThing"></button>

<!--.native - 監聽根元素的原生事件-->
<!--使用於自定義component上-->
<button @click.native="DoThing"></button> 無效!!!!!!!!!!
<my-component @click.native="DoThing" /> 有效

<!--.left / .right / .middle--> 
<!--對滑鼠左鍵/右鍵/中鍵的觸發-->
<button @click.left="DoThing"></button>

<!--.passive 執行默認行為-->
<!--意義為告訴瀏覽器不用查詢是否有阻止默認行為,直接使用默認行為-->
<button @click.passive="DoThing"></button>
```
#### 按鍵修飾符
```vue
<!-- 可選：keyup | keydown | keypress-->
<!-- 可選：.enter | .tab | .delete | .esc | .spave | .up | .down | .left | .right-->
<!-- 下面是只有在enter時才會有動作產生-->
<input v-on:keyup.enter="submit">
```
#### 系統修飾符
```vue
<!-- 可選： .ctrl | .alt | .shift | .meta-->
<!-- Ctrl + Click 動作-->
<input v-on.click.ctrl="doSomething">

<!--.exact 精準修飾-->
<!-- 只有在 click + ctrl 才會被觸發 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>
```

## v-bind
1. 縮寫 `:`
2. 預期：any | object
3. 官網示範
```vue
<!--屬性(attribute)綁定-->
<img v-bind:src="imgSrc"> || <img :src="imgSrc">
<!--or-->
<img v-bind:[key]="imSrc"> || <img :[key]="imSrc">

<!--內聯字符串接-->
<img :src="'./path/to/images/' + fileName">

<!--class 綁定-->
<div :class="{red: isRed}"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, {classB: isB, classC: isC}]"></div>

<!--prop綁定-->
<child-component :prop="fatherMsg"></child-component>

<!--通過$props將父組件的props一起傳給子組件-->
<child-component v-bind="$props"></child-component>
```
4. v-bind.camel
```vue
<!--注意這邊的camel，原本的v-bind不能用camel，現在可以了-->
<child-component :view-box.camel="viewStatus"></child-component>
```
5. v-bind.sync
[props.sync 溝通方式](https://ithelp.ithome.com.tw/articles/10225314)
```vue
<!--談談.sync 語法糖-->
<father-component>
  <!--  在這邊，加上sync，會讓子組件在改變message時，就同步更新父組件的同一筆資料-->
  <child-component :parent-message.sync="message"></child-component>
</father-component>

// vs

<father-component>
  <!--  然而在這邊，因為沒有sync，就要變成 > 在子組件更新完資料後，再@emit事件上來，才能夠更新父組件資料-->
  <child-component :parent-message="message"></child-component>
</father-component>
``` 
6. v-bind.prop：將綁定的屬性設定為DOM property，而非attribute
[Vue.js: 屬性綁定 v-bind、Class 與 Style 綁定](https://cythilya.github.io/2017/04/21/vue-v-bind-class-and-style/)
[HTML attribute与DOM property之间的区别？](https://segmentfault.com/a/1190000008781121)
* attribute：元素物件屬性
* property：元素標籤屬性
```vue
<!--var element = document.getElementsByTagName('a')-->

<!--假設今天是這樣的html-->
<a href="" :data="hint"></a>
<!--那麼這樣可以使用element.getAttribute取值。但無法利用element.data取值。-->

<!--假設今天設定成property，在看html時，是看不到此值的-->
<a href="" :data.prop="hint"></a>
<!--可以使用element.data取值-->
```

## v-model
#### 雙向綁定的基本元素
1. 原理：data透過defineProperty為元件內屬性重新定義getter and setter。當data更改時，通知setter，觸發watcher變化，再渲染
首先你要有
* data：儲存資料或元件狀態
* 在template上使用v-model
```vue
<input type="text" v-model="message">
```
```javascript
let vm = new Vue({
    data: {
        message: 'Hello'
    }
})
```
2. .lazy 修飾符
默認情況下，v-model在每次input事件都會將輸入框的數值進行同步，但加上lazy會在change後才會同步
```vue
<input v-model.lazy="msg">
```
3. .number 修飾
自動將用戶輸入的數值轉為數字
```vue
<input v-model.number="age" type="number">
```
4. .trim
若要自動過濾用戶輸入的首尾空白字串，可以給v-model一個trim修飾
```vue
<input v-model.trim="msg">
```

## v-pre
#### 定義v-pre時,代表這個地方不會被編譯
```vue
<div v-pre>
    {{ a }} + {{ b }}
<!--編譯出來的顯示就是 {{ a }} + {{ b }}-->
</div>
```
## v-cloak
#### 在標籤中加入一個v-cloak 自定義屬性,在HTML編譯完之後,這個屬性就會被刪除
```vue
<div v-cloak>
    {{a}} + {{b}}
</div>
```
```css
[v-cloak]{
    display: none;
}
```

## v-once
#### 將 data 內容渲染完成後，不追蹤其變化
也就是只渲染元素或組件一次,隨後的重新渲染,元素/組件及其他所有的子節點將被視為靜態內容並跳過.這可以用於優化更新性能
```vue
<!--單元素-->
<span v-once>This will never change</span>
<!--多元素-->
<div v-once>
    <h1>Hi</h1>
    <h2>{{ msg }}</h2>
</div>
```


## 參考資料
[Vue - 插值表达式、v-text、v-html的基本使用](https://juejin.im/post/6844904067899244551#heading-3)
