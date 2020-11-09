---
{
  "title": "Vue3 組合式API",
  "lang": "zH",
  "description": "此篇主要介紹 vue3 的基礎知識",
  "meta": [{"name":"keywords", "content":"vue3 基本知識, vue3"}],
  "tags": ['Vue'],
  "sidebarDepth": "3"
}
---
# Vue3 組合式API

## setup
#### 用法：`setup(){ }`
#### 參數：`{ Data } props`, `{ SetupContext} context`
在Vue3最大的改變就是這裡，一切由 `setup(){}` 開始
* 一個組件選項：在創建組件之前執行，一但 `props` 被解析，並作為組合式API的進入點
```vue
<!--FirstLesson.vue-->
<template>
  <h1> {{  FirstLesson }}</h1>
</template>

<script>

export default {
  setup() {
    const FirstLesson = 'Hello World'

    // 另外注意Vue3在使用上，板上要用到的東西都要return 出去
    return {
      FirstLesson
    }
  }
}
</script>
```

## 生命週期函數
在Vue3的生命週期是直接使用 `import`的方式導入，並註冊
```javascript
// 首先是 生命週期要自己引入
import { onMounted } from 'vue'
export default {
  setup() {
    const FirstLesson = 'Hello World'

    // 再來是，我們同樣可以在生命週期函數內定義想要做什麼事情（當然這不用return 出去）
    onMounted(()=>{
      setTimeout(()=>{
        console.log('I am Mounted')
      },2000)
    })
    return {
      FirstLesson
    }
  }
}
```
### 選項式API vs 組合式API
#### 傳統生命週期 vs composition API
* ~~`beforeCreate`~~ > use `setup()`
* ~~`created`~~ > use `setup()`
* `beforeMount` > `onBeforeMount`
* `mounted` > `onMounted`
* `beforeUpdate` > `onBeforeUpdate`
* `updated` > `onUpdated`
* `beforeUnmount` > `onBeforeUnmount`
* `unmounted` > `onUnMounted`
* `errorCaptured` > `onErrorCaptured`
* `renderTracked` > `onRenderTracked`
* `renderTriggered` > `onRenderTriggered`

## Provide/Inject
`provide` & `inject` 啟用依賴注入。只有在當前的 `setup()`期間才能調用兩者
**記住：同樣需要import `provide` || `inject`**
### 使用方法
#### * provide > 第一個參數：要傳下去的變數名稱。第二個參數：值
#### * inject > 第一個參數：傳進來的變數名稱。

#### 父組件
```javascript
// 同樣地，如果要在程式中使用 provide，也需要import進來
import { provide } from 'vue'
export default {
  setup() {
    const FirstLesson = 'Hello World'
    // 然後在這邊 使用 provide 函數
    provide('foo', 1)
    return {
      FirstLesson,
      Child
    }
  }
}
```
#### 子組件
```javascript
// 先 import inject 進來
import { inject } from 'vue'
export default {
  setup(){
    // 然後這邊inject變數名稱
    const FromFather = inject('foo')
    return {
      // 因為要在板上用，所以需要一個變數 return 
      FromFather
    }
  }
}
```
## import 組件
```javascript
import Child from './child'
import { onMounted } from 'vue'
export default {
  setup() {
    const FirstLesson = 'Hello World'
    
    return {
      FirstLesson,
      
      // 在Vue3中，要import組件，你直接import進來，再return 出去就好
      Child
    }
  }
}
```
