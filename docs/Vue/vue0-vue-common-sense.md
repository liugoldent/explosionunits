---
{
  "title": "Vue 基本知識",
  "lang": "zH",
  "description": "此篇主要介紹 vue 常見的面試題目與基本觀念",
  "meta": [{"name":"keywords", "content":"vue 常見面試題目, vue"}],
  "tags": ['Vue']
}
---

# Vue 的基本知識

## 1.  v-if vs v-show
1. v-if 是真正的條件渲染，確保在切換過程中條件塊內的事件監聽器與子組件有被銷毀
2. v-if 為惰性的，只有在條件為真實，才會渲染組建
3. v-shoe 不管條件為何，一開始就會被渲染，只是使用css作切換
4. 因此若要頻繁的切換，使用v-show較好。如果運行時條件很少改變，則使用v-if。

## 2. class vs style
1. 物件模式：class變量對應boolean值
2. 陣列模式：陣列內填入多個class變量
3. 變量模式：直接在JS內以寫物件的方式寫入CSS
```vue
<template>
    <div>
        <!-- 物件模式 -->
        <p :class="{ black: isBlack, yellow: isYellow }">使用 class</p>
        <!-- 陣列模式 -->
        <p :class="[black, yellow]">使用 class （数组）</p>
        <p :style="styleData">使用 style</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isBlack: true,
            isYellow: true,

            black: 'black',
            yellow: 'yellow',

            styleData: {
                fontSize: '40px', // 转换为驼峰式
                color: 'red',
                backgroundColor: '#ccc' // 转换为驼峰式
            }
        }
    }
}
</script>

<style scoped>
    //變量模式
    .black {
        background-color: #999;
    }
    .yellow {
        color: yellow;
    }
</style>
```
