# slot（插槽）
#### slot的通俗理解就是*佔坑*，在子組件中預先佔好了位置，當使用該組件標籤時，該組件標籤裡面的內容，就可以自動入坑
#### 也就是父親有就拿父親，父親沒有就拿孩子

## 內容插槽
### 1. 沒有傳遞資料的狀況
#### hint：子組件渲染時，因為父親有給子組件資料，所以子的`slot`部分就被換成父親給的資料
定義兩個組件home.vue、test.vue，然後在home.vue組件中引用test.vue
```vue
<!--home.vue-->
<test>
  Hello World;
  Hello {{ enhavo }}
  <!--  enhavo可以讀取home.vue的資料-->
</test>
```
```vue
<!--test.vue-->
<a hrf="#">
  <slot></slot>
  當組件在渲染時，<slot></slot>就會被替換成Hello World
</a>
```

### 2. 傳遞資料的狀況
#### hint:父級模板裡的所有內容都是在父級作用域中編譯的。子模板裡的所有內容都是在子作用域中編譯的
##### // home.vue
```vue
<template>
  <div class="home">
    <Slot2>Hello {{string1}}!</Slot2>
  </div>
</template>

<script>
// @ is an alias to /src
import Slot2 from '@/views/Slot2.vue'

export default {
  name: 'Home',
  components: {
    Slot2
  },
  data(){
    return {
      string1:'String1'
    }
  }
}
</script>

```

## 默認內容插槽
#### hint：如果在父組件端所呼叫的子組件tag內沒放東西，那麼默認內容插槽就會被顯現出來了
##### // test.vue
```vue
<template>
  <div class="home">
    <a href="#">
	    <slot>預設插槽1</slot>
    </a>
    <h1>
      <slot>預設插槽2</slot>
    </h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>
```

## 具名插槽
有時候我們想要在一個組件內置入多個插槽，這時可以讓slot綁上name
##### // Slot1.vue（父）
```vue
<template>
  <div class="home">
    <Slot2>
      <template v-slot:header>
      </template>

      <template>
        中間的部分
      </template>

      <template v-slot:footer>
        尾巴的部分
      </template>
    </Slot2>
  </div>
</template>

<script>
// @ is an alias to /src
import Slot2 from '@/views/Slot2.vue'

export default {
  name: 'Home',
  components: {
    Slot2
  },
  data(){
    return {
    }
  }
}
</script>
```
#### 子組件在渲染的同時，會依序去找父組件中子組件tag內的名稱
#### eg：第一個是`<slot></slot>`就去找子組件tag中沒有v-slot:的內容
#### eg：第二個是`<slot name="header">`就去找子組件tag中v-slot:header的內容
##### // Slot2.vue（子）
```vue
<template>
  <div class="home">
    <slot></slot>
    
    <slot name="header">
      我是子的Header
    </slot>

    <slot name="footer">
      我是子的footer
    </slot>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>

```

## 作用域插槽
上面有說到，插槽與模板其他地方都可以訪問相同的作用域data，但是不能訪問子組件的作用域，那今天如果想要訪問怎麼辦？
#### hint：在子組件的`<slot v-bind:xxx="yyy"></slot>`
##### // 子組件
```vue
<template>
  <div class="home">
    <slot v-bind:toFatherData="dataInChild"></slot>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      dataInChild:'SendDataFromChild'
    }
  }
}
</script>

```
##### // 父組件（default建議還是寫著）
```vue
<template>
  <div class="home">
    <Slot2 v-slot:default="slotProps">
        {{slotProps.toFatherData}}
    </Slot2>
  </div>
</template>
```
因為今天假設有多個插槽，你default還是要這樣寫起來
```vue
<test>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    {{ otherSlotProps .....}}
  </template>
</test>

```

## 具名插槽的縮寫
#### hint：之前要寫好v-slot:header，現在只要 #header
```vue
<div>
   <template v-slot:header>
    <h1>Here might be a page title</h1>
   </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here some contact info</p>
  </template>
</div>  

```
```vue
<div>
   <template #header>
    <h1>Here might be a page title</h1>
   </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here some contact info</p>
  </template>
</div>

```

## 參考資料
#### [Vue插槽(slot)使用](https://juejin.im/post/6844903920037281805#heading-6)
