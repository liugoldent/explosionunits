---
{
  "title": "Vue 組件通訊方式",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件之中通訊的方式",
  "meta": [{"name":"keywords", "content":"vue.js,vue 組件傳遞資料,vue傳遞資料,vue組件通訊"}],
  "tags": ['Vue']
}
---

# Vue 組件通訊方式
![Vue 組件通訊方式](https://miro.medium.com/max/1400/1*WemWCPx0uYnAj6ohcbQeig.jpeg)
## Props
```
components
   ├── Parent.vue   // 父親
   ├── Son1.vue     // 兒子
```
父組件：經由:date綁定值給子組件
```html
<template>
  <div>
    <div>爸爸:{{date}}</div>
    <Son1 :date="dateinPar"></Son1> // 在這邊傳遞資料給兒子
  </div>
</template>
<script>
import Son1 from "./son1";
export default {
  components: { Son1 },
  data() {
    return {
      dateinPar: 1,
    };
  },
};
</script>
```
子組件：兒子的props接收資料
```html
<template>
  <div>兒子:{{date}}</div>
</template>
<script>
export default {
  props: {
    date: {
      type: Number, // 第一個參數為型別
      default: "1", // 第二個參數為預設數值
    },
  },
};
</script>
```

## $emit
```
components
   ├── Parent.vue   // 父親
   ├── Son1.vue     // 兒子
```
#### 子組件：經由發送$emit事件
```html

<template>
  <div>
    <div>兒子:{{date}}</div>
    <button @click="changeNum">修改</button>
  </div>
</template>
<script>
export default {
  props: {
    date: {
      type: Number,
      default: "1",
    },
  },
  methods: {
    changeNum() {
      this.$emit("changeNum", 2); // 這邊emit上去事件名稱，與數值
    },
  },
};
</script>
```
####  父組件：用@click接收數值
```html
<template>
  <div>
    <div>爸爸:{{date}}</div>
    <Son1 :date="date" @changeNum="changeNum"></Son1> 
    // 經由emit事件上來,然後="changeNum" 是父組件的function
  </div>
</template>
<script>
import Son1 from "./son1";
export default {
  components: { Son1 },
  data() {
    return {
      date: 1,
    };
  },
  methods: {
    changeNum(params) { // 這邊接收資料
      this.date = params;
    },
  },
};
</script>
```


## .sync
#### 子組件：$emit事件
```html
<template>
  <div>
    <div>兒子:{{Sondate}}</div>
    <button @click="changeNum">修改</button>
  </div>
</template>
<script>
export default {
  props: {
    Sondate: {
      type: Number,
      default: "1",
    },
  },
  methods: {
    changeNum() {
      this.$emit("update:Sondate", 2); //這邊是使用update:date的方式
    },
  },
};
</script>
```
#### 父組件：透過Sondate.sync來更新資料（Sondate對應到 update：Sondate的觸發）
```html
<template>
  <div>
    <div>爸爸:{{date}}</div>
    <Son1 :Sondate.sync="date"></Son1>
  </div>
</template>
<script>
import Son1 from "./son1";
export default {
  components: { Son1 },
  data() {
    return {
      date: 1,
    };
  },
};
</script>
```
#### 也就是說，$emit update:xxxx 上來之後，會有兩種接收模式
```html
<Son1 :xxxx.sync="date"></Son1>
```
#### 或是
```html
<Son1 :xxxx="date" @update:xxxx="val=>date=val"></Son1>
```


## v-model
#### 子組件：只能$emit input事件，另外接收的一定要是value
```html
<template>
  <div>
    <div>子:{{value}}</div>
    <button @click="changeNum">修改</button>
  </div>
</template>
<script>
export default {
  props: {
    value: { // 這邊一定要是value
      type: Number,
      default: 1,
    },
  },
  methods: {
    changeNum() {
      this.$emit("input", 2); // 一定要emit input
    },
  },
};
</script>
```
#### 父組件：使用v-model接收參數
```html
<template>
  <div>
    <div>爸爸:{{value}}</div>
    <Son1 v-model="value"></Son1>
  </div>
</template>
<script>
import Son1 from "./son1";
export default {
  components: { Son1 },
  data() {
    return {
      value: 1,
    };
  },
};
</script>
```
#### 替代寫法
```html
<!--分兩段寫-->
<Son1 :value="value" @input="val=>value=val"></Son1>
```
#### 或是
```html
<!--只能是v-model-->
<Son1 v-model="value"></Son1>
```

## $parent & $children
```
components
   ├── Parent.vue   // 父親
   ├── Son1.vue     // 兒子1
   ├── Grandson1.vue  //孫子1
```
:::warning
注意，官方不推薦此種方式，推薦使用inject方式
:::
#### 父組件：建好@change事件
```html
<template>
  <div>
    <div>爸爸:{{ value }}</div>
    <Son1 @change="(val) => (value = val)" :value="value"></Son1>
    <button @click="seeSon">看this$children的資料</button>
  </div>
</template>
<script>
import Son1 from './Son1'
export default {
  components: { Son1 },
  data() {
    return {
      value: 1,
      Status: 'Parent'
    }
  },
  methods: {
    seeSon() {
      console.log(this.$children)
    }
  }
}
</script>
```
#### 子組件：資料渲染而已
```html
<template>
  <div>
    <div>兒子:{{ value }}</div>
    <Grandson1 :value="value"></Grandson1>
    <button @click="$parent.$emit('change', 4)">子組件</button>
  </div>
</template>
<script>
import Grandson1 from './Grandson1'
export default {
  components: {
    Grandson1
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      son: 'this.is son'
    }
  }
}
</script>
```
#### 孫子組件：$emit資料上去給爺組件
```html
<template>
  <div>
    <div>孫子{{value}}</div>
    <button @click="SendData">孫子修改</button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: "",
    },
  },
  methods:{
    SendData(){
      // 從這個conosole.log，就可以發現 this.$parent 會等於 父組件資料
      console.log(this.$parent)
      this.$parent.$emit('change',3)
    }
  }
};
</script>
```
:::tip
在這邊
* $parent：代表取得父組件的上一層
* $child：代表取得子組件的下一層
* $root：代表取得最上層
:::


## $attrs/$listeners
```
components
   ├── Parent.vue   // 父親
   ├── Son1.vue     // 兒子1
   ├── Grandson1.vue  //孫子1
```
#### $attrs 類似 props
#### 父組件：
```html
<template>
  <div>
    <div>爸爸:{{value}}</div>
    <Son1 @change="val=>value=val" :value="value"></Son1>
  </div>
</template>
<script>
import Son1 from "./Son1";
export default {
  components: { Son1 },
  data() {
    return {
      value: 1,
      Status: 'Father'
    };
  },
};
</script>
```
#### 子組件：透過 $attrs取得父組件的資料，並傳給子組件（要有綁定過的才行）
```html
<template>
  <div>
    <div>兒子:{{$attrs.value}}</div>
    <grandson1 v-bind="$attrs"></grandson1>
  </div>
</template>
<script>
import Grandson1 from "./Grandson1";
export default {
  components: {
    Grandson1,
  },
  mounted() {
    console.log('In Son',this.$attrs); // value:1
  },
};
</script>
```
#### 孫組件：也同樣經由 $attrs獲取同包資料
```html
<template>
  <div>
    <div>孫子{{$attrs.value}}</div>
  </div>
</template>
<script>
export default {
  //props: {
  //  value: Number,
  //},
  mounted() {
    console.log('In GrandSon',this.$attrs); // value:1
  },
};
</script>
```
#### 抑或是 $listeners（類似 $emit）
#### 父組件：
```html
<template>
  <div>
    <div>爸爸:{{value}}</div>
    <Son1 @click="change" :value="value"></Son1>
    // 接收由孫組件發送上來的 $listner 
</div>
</template>
<script>
import Son1 from "./son1";
export default {
  components: { Son1 },
  data() {
    return {
      value: 1,
    };
  },
methods: {
    change() {
      this.value = 2;
    },
  },
};
</script>
```
#### 子組件：
```html
<template>
  <div>
    <div>兒子:{{$attrs.value}}</div>
    <grandson1 v-bind="$attrs" v-on="$listeners"></grandson1>
   // 這邊用 v-on="$listners" 來接收孫組件的發送
  </div>
</template>
<script>
import grandson1 from "./grandson1";
export default {
  components: {
    grandson1,
  },
  mounted() {
    console.log(this.$attrs);
    console.log(this.$listeners);
  },
};
</script>
```
#### 孫組件：
```html
<template>
  <div>
    <div>孫子{{$attrs.value}}</div>
    <button @click="$listeners.click"></button> // 這邊發送click請求
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$attrs);
    console.log(this.$listeners);
  },
};
</script>
```

## $refs
```
components
   ├── Parent.vue   // 父親
   ├── Son1.vue     // 兒子1
```
#### ref：為獲取真實的DOM元素，如果放到組件上代表的當前組件的實例。父組件可以直接獲取子組件的方法或數據，另外請注意不要重名。
#### 父組件：
```html
<template>
  <div>
    <div>爸爸</div>
    <Son1 ref="son"></Son1>
  </div>
</template>
<script>
import Son1 from "./son1";
export default {
  components: { Son1 },
  mounted() {
    this.$refs.son.show(); // 父組件直接取用子組件的方法
  },
};
</script>
```
#### 子組件：
```html
<template>
  <div>
    <div>兒子</div>
  </div>
</template>
<script>
export default {
  methods: {
    show() {
      console.log(1);
    },
  },
};
</script>
```

## EventBus
```
main.js
components
   ├── Grandson1.vue   // 孫子
   ├── Son2.vue     // 兒子
```
#### 孫子：
```html
<template>
  <div>孫子1</div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$bus.$emit("test", "go");
    });
  },
};
</script>
```
#### 兒子：
```html
<template>
  <div>兒子2</div>
</template>
<script>
export default {
  mounted() {
    this.$bus.$on("test", (data) => {
      console.log(data);
    });
  },
};
</script>
```
:::tip
流程為：
先註冊一個eventbus事件
在一個組件中同樣地發送$emit事件
在另一個組件中，利用$on接收事件
:::

## VueX
#### 基本上是這是基於全域的共用變數管理
![VueX](https://miro.medium.com/max/1400/1*HxfDBqDH1j_pbmMgqWGpew.png)
#### 在這邊述說一下VueX的操作方式：
1. 在你驅動資料：dispatch資料給action
2. action 接收到資料後，commit給Mutation
3. 只有Mutation能改變State的資料
```javascript
// in your js (第一步)
this.$store.dispatch('changeColor', 'Red')
```
#### 再來是
```javascript
// in your VueX
// action part > 負責commit給mutation
changeColor(context,payload){
  commit('changeColor',payload)
}
// mutation part > mutation 負責改變state資料 
changeColor(state,payload){
  state.color = payload
}
```


## Observable
#### 我們在 VueX 的 State中使用Observable來響應式畫面
```javascript
// store.js
const state = Vue.observable({ counter : 1})
export const increment = () => state.counter++
export const decrement = () => state.counter--
export default state
```
```html
<!--in template-->
<template>
  <div>
    <p>The counter value is {{counter}}</p>
    <button @click="inc">+</button>
    <button @click="dec">-</button>
  </div>
</template>
<script>
  import store, { increment, decrement } from "./store";
  export default {
    computed: {
      counter() {
        return store.counter;
      }
    }, 
    methods: {
      inc() {
        increment();
      },
      dec() {
        decrement();
      }
    }
  };
</script>
```
