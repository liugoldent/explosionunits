---
{
  "title": "基本知識",
  "lang": "zH",
  "description": "vue 常見面試題目",
  "meta": [{"name":"Vue Common Sense", "content":"vue 常見面試題目"}],
  "tags": ['Vue']
}
---

# Vue 的基本知識

## 1.  v-if vs v-show
1. v-if 是真正的條件渲染，確保在切換過程中條件塊內的事件監聽器與子組件有被銷毀
2. v-if 為惰性的，只有在條件為真實，才會渲染組建
3. v-shoe 不管條件為何，一開始就會被渲染，只是使用css作切換
4. 因此若要頻繁的切換，使用v-show較好。如果運行時條件很少改變，則使用v-if。
