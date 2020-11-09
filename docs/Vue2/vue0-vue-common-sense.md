---
{
  "title": "Vue 基本知識",
  "lang": "zH",
  "description": "此篇主要介紹 vue 常見的面試題目與基本觀念",
  "meta": [{"name":"keywords", "content":"vue 常見面試題目, vue"}],
  "tags": ['Vue'],
  "sidebarDepth": "3"
}
---

# Vue 的基本知識

## v-if vs v-show
### 手段
1. v-if：是真正的條件渲染，控制DOM的存在與否來控制元素的顯示與否
2. v-show：是設置DOM元素的display樣式，block為顯示，none為隱藏
### 編譯過程
1. v-if：切換一個局部編譯/卸載的過程，切換過程中合適地銷毀和重建內部的事件監聽和子組件
2. v-show：純粹的CSS切換
### 編譯條件
1. v-if：為惰性的，只有在條件為真實，才會開始局部編譯
2. v-show：任何條件下都被編譯，然後被緩存，而且保留著DOM
### 性能消耗
1. v-if：有更高的切換消耗
2. v-show：有更高的初始渲染消耗
### 總結
如果需要頻繁的切換，使用`v-show`較好，如果運行條件很少被改變，則`v-if`

## class vs style
### 使用模式
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

## 列表渲染
當處在同一節點時，v-for優先級較v-if更高。代表v-if將分別重複運行於每個v-for循環中。<br>
推薦：將v-if至於外層元素
