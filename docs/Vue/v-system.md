---
{
  "title": "V-system",
  "lang": "zH",
  "description": "slot（插槽）",
  "meta": [{"name":"V-system", "content":"此篇主要紀錄關於「v-」修飾符的用法與意義"}],
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
2. v-text & v-html 只能根據data 設置的內容渲染，但是 {{ msg }} 可以增加贅字。例如 +++ {{ msg }} +++
3. 若 msg = `<h1>Hello World</h1>`。那v-text & {{}} 會渲染出字串。但 v-html 會渲染出 Hello World

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
#### 按鍵修飾符
#### 系統修飾符
## v-bind

## v-model

## v-pre

## v-cloak

## v-once
#### 將 data 內容渲染完成後，不追蹤其變化


## 參考資料
[Vue - 插值表达式、v-text、v-html的基本使用](https://juejin.im/post/6844904067899244551#heading-3)
