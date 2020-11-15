---
{
  "title": "Vue3 響應式API",
  "lang": "zH",
  "description": "此篇主要介紹 vue3 的基礎知識",
  "meta": [{"name":"keywords", "content":"vue3 基本知識, vue3"}],
  "tags": ['Vue'],
  "sidebarDepth": "3"
}
---

# 響應式API

## reactive
#### 作用：設定物件的響應式副本
#### 注意：經過加工後的物件與原物件是不相等的，並且加工的物件屬於deep clone
reactive主要作用是處理我們的物件，讓它經過Proxy的加工變為一個響應式物件，類似Vue2.0的dat屬性
```vue
<template>
  <!--  板上直接使用物件方法點出來就好-->
  <h1> {{ state.firstString }}</h1>
  <h2> {{ state.count }}</h2>
  <button @click="toUpperCaseFunc">toUpperCase</button>
</template>

<script>
// 在Vue3只要用到啥API就是要import
import { reactive } from 'vue'
export default {
  setup() {
    // 然後reactive內包含一個物件（很像vue2的data）
    const state = reactive({
      firstString: 'Hello World',
      count: 0
    })

    // 在這邊一樣定義一個function，來對state的值做事，記得要重新賦值
    const toUpperCaseFunc = function(){
      // 用 reactive 不用使用.value
      state.firstString = state.firstString.toUpperCase()
      state.count++
    }
    // 最後板上要用的東西都要return 
    return {
      state,
      toUpperCaseFunc
      }
  }
}
</script>

```

## readonly 
#### 作用：設定唯讀
獲取一個物件（響應式或是純物件）或 `ref`並返回原始代理（並且設定唯讀）：也就是訪問任何property也是唯讀
```javascript
export default {
  setup() {
    const state = reactive({
      firstString: 'Hello World',
      count: 0
    })
    // 設定 唯讀
    const copy = readonly(state)

    const toUpperCaseFunc = function(){
      state.firstString = state.firstString.toUpperCase()
      state.count++
      // 注意這邊，我們可以在畫面上看到可以更改copy.count，可是會報出vue warn 的訊息
      copy.count++
    }
    return {
      state,
      copy,
      toUpperCaseFunc
      }
  }
}
```

## isProxy
#### 作用： 檢查物件是 `reactive` or `readonly` 創建的代理
```javascript
export default {
  setup() {
    const state = reactive({
      firstString: 'Hello World',
      count: 0
    })
    const name = 'Guan'

    console.log('state',isProxy(state)) // true
    console.log('name',isProxy(name)) // false
    return {
      name,
      state
    }
  }
}
```


## isReactive
#### 作用： 判斷一個物件是否是 `reactive` 創建的響應式proxy
```javascript
import { reactive } from 'vue'
exports default {
    const state = reactive({
        name: 'Guan'    
    })
    console.log(isReactive(state))
}
```

## toRaw
#### 作用： 返回一個原始的資料
因為資料有可能是經由 `reactive` or `readonly` 代理的物件，所以利用這個指令返回原始物件。
這是一個轉接口，可用於臨時讀取而不會引起代理訪問/跟蹤開銷。也可以用於寫入而不會觸發更改。但不建議保留原始物件的長久使用
```javascript
import { reactive, toRaw } from 'vue'
export default {
  setup(){
   
    const oriObj = {}
    const state = reactive(oriObj)
    // 由於兩個物件指的位置是一樣的，所以是 true
    console.log(toRaw(state) === oriObj)

    const la_count = []
    const state2 = reactive({
      count: la_count
    })
    // 一樣，由於指的位置是一樣的，所以是 true
    console.log(toRaw(state2).count === la_count)


    const la_count2 = []
    const state3 = reactive({
      count: []
    })
    // 在這邊，因為兩個指的位置不同，所以console.log 為 false
    console.log(toRaw(state3).count === la_count2)


    return {
      state
    }
  }
}
```

## markRaw
#### 作用：標記一個物件，使其永遠不會轉換為代理。返回物件本身
```javascript
import { reactive, markRaw } from 'vue'
export default {
  setup(){

    // 在這裡標注 markRaw 後，就會讓資料不會變成響應式的
    const state = markRaw({
      name: 'Guan'
    })

    const notReactive = reactive(state)

    const toUpperCase = function(){
      notReactive.name = 'Hi'
    }
    return {
      state,
      notReactive,
      toUpperCase
    }
  }
}
```

## shallowReactive
#### 淺層的響應式資料（只有淺層可以響應）
```javascript
export default {
  setup(){
    // 在這邊我們將 reactive 設定為 shallow
    const state = shallowReactive({
      name: 'Guan',
      outerCount: 0,
      store:{
        count: 0
      }
    })
    // 注意下面這行，因為設定為shallow，所以他偵測到這個響應為false
    console.log(isReactive(state.store)) // false

    const toUpperCase = function(){
      try {
        // 因為設定為 shallow 的關係，資料只會響應一次！！
        state.name = 'Ting'
        state.store.count++
      }catch(e){
        console.log(e)
      }
    }
    return {
      state,
      toUpperCase
    }
  }
}
```

## shallowReadonly
#### 淺層的唯讀（但測起來是全部都唯讀）
```javascript
import { shallowReadonly } from 'vue'
export default {
  setup(){
    const state = shallowReadonly({
      foo: 1, // 如果改變這行資料，就會直接warn
      nested: {
        bar: 2 // 如果要改變這邊，就官網說法是可以的，但是實測起來無法修改
      }
    })
    const toUpperCase = function(){
      try {
        state.nested.bar++
      }catch(e){
        console.log(e)
      }
    }
    return {
      state,
      toUpperCase
    }
  }
}
```
