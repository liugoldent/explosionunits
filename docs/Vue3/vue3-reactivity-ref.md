---
{
  "title": "Vue3 響應式API part2",
  "lang": "zH",
  "description": "此篇主要介紹 vue3 的基礎知識",
  "meta": [{"name":"keywords", "content":"vue3 基本知識, vue3"}],
  "tags": ['Vue'],
  "sidebarDepth": "3"
}
---

# 響應式API part2

## ref
#### 接受一個內部值，並返回一個響應式且可變的ref物件。ref物件具有指向內部值的屬性:`value`
```javascript
// 一樣，如果要用就要引入
import { ref } from 'vue'
export default {
  setup(){
    // 這邊使用 ref 來做出響應式資料
    const state = ref({
      foo: 1,
      nested: {
        bar: 2
      }
    })

    const toUpperCase = function(){
      try {
        // 注意這邊，在設定完 ref後，要用 .value 去拿值
        state.value.foo++
        state.value.nested.bar = state.value.nested.bar*2
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

## unref
如果參數為 `unref` 則返回內部值，否則返回參數本身，
```javascript
import { ref, unref } from 'vue'
export default {
  setup(){
    const state = ref({
      foo: 1,
      nested: {
        bar: 2
      }
    })
    const test = 124
    console.log(unref(state)) // 會得到 state 的完整 proxy 物件
    console.log(unref(test)) // 會得到 124

    return {
      state
    }
  }
}
```

## toRef
#### 用來為響應式物件的property性創建一個 ref。然後可以將ref傳遞出去，確保響應式的串接
```javascript
import {
  toRef,
  reactive
} from 'vue'
export default {
  setup(){
    const state = reactive({
      foo: 1,
      nested: {
        bar: 2
      }
    })
    // 有點像鏈式串接 state，把foo這個響應傳給下一個參數
    // 注意因為是 toRef 沒有s複數，所以一定要傳一個key值給他
    const stateref = toRef(state, 'foo')

    setTimeout(()=>{
      // 記得只要是 ref 就要接 value
      stateref.value++
    },2000)

    const toUpperCase = function(){
      try {
        // 這邊的 foo 跟 stateref 指到的 foo是相同的，所以兩個都會向上++
        // 因為不是 ref，所以不用接 value
        state.foo++
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

## toRefs
#### 上面是說一個key值的響應傳遞，這邊是說整個物件的響應傳遞
```javascript
import {
  toRefs,
  reactive
} from 'vue'
export default {
  setup(){
    const state = reactive({
      foo: 1,
      nested: {
        bar: 2
      }
    })
    // toRefs 針對整個物件
    const stateref = toRefs(state)

    setTimeout(()=>{
      // 注意這個巢狀的寫法有點特殊
      stateref.nested.value.bar++
    },1000)
    const toUpperCase = function(){
      try {
        // 一樣是指到同一個物件的bar
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

## isRef
#### 主要是在測試這個資料是不是ref
```javascript
export default {
  setup(){
    const state = reactive({
      foo: 1,
      nested: {
        bar: 2
      }
    })
    const stateref = toRefs(state)
    const state3 = ref({
      num: 123
    })
    console.log(isRef(state)) // false
    console.log(isRef(stateref)) // false
    console.log(isRef(state3)) // true（經測試只有直接定義 ref 才會是 true）
  }
}
```
## customRef
#### vue3可以讓你自行定義ref要怎麼運作
```javascript
import {
  customRef
} from 'vue'
export default {
  setup(){
    function delayRef(value, delay = 2000){
      let timeout
      return customRef((track, trigger)=>{
        return {
          get(){
            track()
            return value
          },
          set(newValue){
            clearTimeout(timeout)
            timeout = setTimeout(()=>{
              value = newValue
              trigger()
            },delay)
          }
        }
      })
    }
    // 在這邊定義了 delayRef，會讓更新觸發在2000ms後
    const state = delayRef('hello')
    const toUpperCase = function(){
      try {
        state.value = 'World'
      }catch(e){
        console.log(e)
      }
    }

    return {
      state,
      toUpperCase,
    }
  }
}
```

## shallowRef
#### 定義了shallowRef後，會讓值在畫面上不是響應式的（但js中，值是有變得）
```javascript
import {
  shallowRef
} from 'vue'
export default {
  setup(){
    const state = shallowRef({
      foo: 1,
      nested: {
        bar: 2
      }
    })

    const toUpperCase = function(){
      try {
        state.value.foo++
        console.log(state.value.foo) // 值的確會往上一直加
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

## triggerRef
#### 有了不響應式的shallowRef，那就有相對的triggerRef（主要是讓畫面一次更新）
```javascript
import {
  triggerRef,
  shallowRef
} from 'vue'
export default {
  setup(){
    const state = shallowRef({
      foo: 1,
      nested: {
        bar: 2
      }
    })

    const toUpperCase = function(){
      try {
        state.value.foo++ // 這邊因為shallow的關係，所以畫面不會響應式更新
        console.log(state.value.foo)
      }catch(e){
        console.log(e)
      }
    }

    // 所以在這邊要trigger資料使其驅動，更新畫面
    const timeTrigger = function(){
      triggerRef(state) 
    }
    return {
      state,
      toUpperCase,
      timeTrigger
    }
  }
}
```
