---
{
  "title": "Vue render",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件的render",
  "meta": [{"name":"keywords", "content":"vue component, vue, vue render"}],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---

# render

## 1. render 函數是什麼？
一般來說，在Vue中我們使用模板HTML來組建頁面，使用render function 我們可以使用js來構建DOM<br>
因為vue是 virtual DOM，所以拿到template模板時也要轉譯成VNode函數，而用render function建構DOM，vue就免去編譯的過程
* 當使用render function描述Virtual DOM時，vue提供一個函數，這個函數是建構Virtual DOM的工具。名做`createElement` or `h`

### Demo
```html
// 父组件
<template>
  <div>
    <child1 :level='level'>我是標題</child1>
  </div>
</template>
<script>
  const child1 = () => import("./child1.vue");
  export default {
    components: { child1 },
    data() {
      return {
        level: 1
      };
    },
  };
</script>
```
一般子組件設定成這樣，會有很多if & `<slot>`的語法，並不是很好
```html
// 子组件 child1.vue
<template>
  <div>
    <h1 v-if="level == 1">
      <slot></slot>
    </h1>
    <h2 v-if="level == 2">
      <slot></slot>
    </h2>
    <h3 v-if="level == 3">
      <slot></slot>
    </h3>
    <h4 v-if="level == 4">
      <slot></slot>
    </h4>
    <h5 v-if="level == 5">
      <slot></slot>
    </h5>
    <h6 v-if="level == 6">
      <slot></slot>
    </h6>
  </div>
</template>
<script>
  export default {
    props: {
      level: {
        require: true,
        type: Number,
      }
    }
  };
</script>
```
而將子組件使用render方式渲染出來，方法如下
```html
<script>
  export default {
    props: {
      level: {
        require: true,
        type: Number,
      }
    },
    render(createElement) {
      return createElement('h' + this.level, this.$slots.default);
    }
  };
</script>
```
:::tip
1. child1的'我是標題'，被存在組件實例this.$slots.default
2. 因為模板寫了太多slot，所以在這邊選用render function 是較好的。
:::

## 2. render 函數的參數
* render函數是渲染函數，他是個函數，render函數的返回值VNode（虛擬節點）
* createElement是render函數的參數，他本身也是個函數，並且有三個參數
#### createElement第一個參數是必填的：{String | Object | Function}
1. String：HTML標籤名
2. Object：含有數據的組件選填物件
3. Function：返回一個含有標籤名or組件選項的async function
```javascript
    render: function (createElement) {
        // String
        return createElement('h1');
        
        // Object：key(template)-value(String)
        return createElement({
        template: " <div>Hello World</div> "
        })
        
        // Function > return something
        let domFun = function () {
            return {
              template: " <div>Hello World</div> "
            
            }
        }
        return createElement(domFun())
    }
```
#### createElement第二個參數是選填的，主要設置模板中屬性對應的數據物件，常用的有：
#### class | style | attrs | domProps | on
1. class：控制類名
2. style：樣式
3. attr：用來寫正常的html屬性，id or src等
4. domProp：用來寫原生的dom屬性
5. on：寫原生方法
```javascript
return createElement('div', {
    // 與 `v-bind:class` 的 API 相同，
    // 接受一個字符串、物件或字符串和物件组成的陣列
    'class': {
        foo: true,
        bar: false
    },

    // 與 `v-bind:style` 的 API 相同，
    // 接受一个字串、物件，或物件组成的数组
    style: {
        color: 'red',
        fontSize: '14px'
    },

    // 普通的 HTML 特性
    attrs: {
        id: 'foo'
    },

    // 定義组件的 prop
    props: {
        myProp: 'bar'
    },

    // DOM 属性
    domProps: {
        innerHTML: 'baz'
    },

    // 事件監聽器在on屬性內
    // 但不再支持如 `v-on:keyup.enter` 這樣的修飾器
    // 需要在處理函數中手動檢查 keyCode。
    on: {
        click: this.clickHandler
    },
    
    // 僅用於組建，用於監聽原生事件，而不是組件內部使用
    // `vm.$emit` 觸發的事件。
    nativeOn: {
        click: this.nativeClickHandler
    },
    
    // 自定義指令。注意，你無法對 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已經自動為我們做同步。
    directives: [
        {
            name: 'my-custom-directive',
            value: '2',
            expression: '1 + 1',
            arg: 'foo',
            modifiers: {
                bar: true
            }
        }
    ],
    
    // 作用域插槽的格式為
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
        default: props => createElement('span', props.text)
    },
    
    // 如果组件是其它组件的子组件，須為插槽指定名稱
    slot: 'name-of-slot',
    
    // 其它特殊頂層属性
    key: 'myKey',
    ref: 'myRef',
    
    // 如果你在渲染函数中给多个元素都應用了相同的 ref 名，
    // 那麼 `$refs.myRef` 會變成一個數組
    refInFor: true
})
```

## 3. v-model在render函數中使用
在render函數中，沒有提供v-model的實現，所以我們必須自己實現相關邏輯
```html
// 同樣地，父組件寫法與正常組件寫法相同
// child1子组件
<script>
  export default {
    props: {
      name: {
        require: true,
      }
    },
    render(createElement) {
      let self = this
      return createElement('input', {
        domProps: {
          value: self.name
        },
        on: {
          // 重點是這邊要通過input方法實現雙向綁定，當子組件name改變，父組件也要更新
          input(event) {
            self.$emit('input', event.target.value)
          }
        }
      })
    }
  };
</script>
```

## 4. render 函數中的事件修飾符
對於`.passive`、`.capture`、`.once`這些事件修飾符，Vue提供了相應的前綴可以用於 `on`
|修飾符              |前綴  |
|---               |---   |
|`.passive`        |`&`   |
|`.capture`        |`!`   |
|`.once`           |`~`   |
|`.capture.once`   |`~!`   |
|`.once.capture`   |`~!`   |
```javascript
  on: {
    '!click': this.doThisInCapturingMode,
    '~keyup': this.doThisOnce,
    '~!mouseover': this.doThisOnceInCapturingMode
  }
```

## 5. JSX語法糖
其實這個語法糖就是趨於如同react.js的寫法
```jsx
  render(h) {
    return (
      <Child1 level={1}>
        <span>Hello</span> world!
      </Child1>
    )
  }
```

## 參考資料
1. [Vue - 渲染函数render](https://juejin.im/post/6844903919764635655)
