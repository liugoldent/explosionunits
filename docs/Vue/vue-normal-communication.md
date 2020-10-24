---
{
  "title": "Vue communication",
  "lang": "zH",
  "description": "此篇主要介紹 vue 組件之中通訊的方式",
  "meta": [{"name":"keywords", "content":"vue.js,vue 組件傳遞資料,vue傳遞資料,vue組件通訊"}],
  "tags": ['Vue']
}
---

# communication

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
  <div>儿子:{{date}}</div>
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

