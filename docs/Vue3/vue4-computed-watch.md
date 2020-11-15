---
{
  "title": "Vue3 響應式API part3",
  "lang": "zH",
  "description": "此篇主要介紹 vue3 的基礎知識",
  "meta": [{"name":"keywords", "content":"vue3 基本知識, vue3"}],
  "tags": ['Vue'],
  "sidebarDepth": "3"
}
---

# Computed and Watch

## computed
如同vue2.0的計算屬性，在這邊一樣的使用方法，差別只在於有時候refs需要用value
```vue
<template>
  <h2> foo: {{ plusOne }} </h2>
  <input v-model="plusOne" />
  <button @click="AddCount">AddCount</button>
</template>

<script>
import {
  ref,
  computed
} from 'vue'
export default {
  setup(){
    const count = ref(1)
    const plusOne = computed({
      // 要渲染時，get函數會動作
      get: () => {
        console.log(count.value + 1)
        return count.value + 1
      },
      // 當v-model input 觸發時，set也被觸發
      set: val => {
        console.log(val - 1)
        count.value = val - 1
      }
    })
    const AddCount = function(){
      count.value++
    }

    return {
      plusOne,
      AddCount
    }
  }
}
</script>
```

## watchEffect
#### 設定一個function，在其依賴改變時，做function內的事情
```javascript
export default {
  setup(){
    const count = ref(1)

    watchEffect(()=>{
      if(count.value){
        console.log('count.value change')
      }
    })
    function AddCount(){
      count.value++
    }
    return {
      count,
      AddCount
    }
  }
}
```

## watch
#### watch需要監聽特定的data源，並在單獨的callback中作用。默認情況下他是惰性的，即回調是在偵聽源變化時調用
與 `watchEffect`相比 `watch`允許我們
* 惰性執行
* 更具體說明應觸發監聽器重新運行的狀態
* 訪問監聽狀態的先後值
### 監聽一個值
```javascript
export default {
  setup(){
    const count = ref(1)

    // watch 用法
    // 第一個參數：數據
    // 第二個參數：before and after 資料
    watch(
        count,
      (count, preCount)=>{
        console.log('count',count)
        console.log('preCount',preCount)
      }
    )
    function AddCount(){
      count.value++
    }
    return {
      count,
      AddCount
    }
  }
}
```

### 監聽多個值
```javascript
export default {
  setup(){
    const count = ref(1)
    const state = reactive({
      name: 'Guan'
    })
    watch(
      // 注意這邊
      // ref 寫法為直接設定變數
      // reactive 寫法為 function
      // 然後陣列：新的資料放前面
      // 舊資料放後面
      [count, () => state.name],
      ([count, name],[preCount, preName])=>{
        console.log('count',count)
        console.log('preCount',preCount)

        console.log('name', name)
        console.log('preName', preName)
      }
    )
    function AddCount(){
      if(state.name === 'Guan'){
        state.name = 'Ting'
      }else{
        state.name = 'Guan'
      }
      count.value++
    }
    return {
      count,
      state,
      AddCount
    }
  }
}
```
