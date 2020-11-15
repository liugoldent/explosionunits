---
{
  "title": "Vue3 基本知識",
  "lang": "zH",
  "description": "此篇主要介紹 vue3 的基礎知識",
  "meta": [{"name":"keywords", "content":"vue3 基本知識, vue3"}],
  "tags": ['Vue'],
  "sidebarDepth": "3"
}
---

# Vue3 基本知識
## ref vs reactive
### 兩者比較
* 兩者都能創建響應式數據
* ref 單獨地為某個數據提供響應式能力
* reactive 給一整個物件提供響應式能力

### reactive 缺點
* 在 return 時，需要將整包reactive 物件返回，不能單獨拿出

## 改善 reactive缺點
* 使用 `toRefs` or `toRef` 來將 `reactive` 包裝，就可以單獨引出其內容

## watch vs watchEffect
### watch
* 需指定watch 監聽的值
* 可以獲取新舊值
### watchEffect
* 不需要設定監聽值，直接塞一個function進去，它會自動收集依賴
* 在組件初始化就會執行一次收集依賴，之後的依賴發生變化，這個function會在執行
