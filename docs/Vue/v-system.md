---
{
  "title": "V-system",
  "lang": "zH",
  "description": "slot（插槽）",
  "meta": [{"name":"V-system", "content":"此篇主要紀錄關於「v-」修飾符的用法與意義"}],
  "tags": ['Vue']
}
---
# V-system

## v-text
#### 渲染純文字內容

## v-html
#### 插入整個html 結構
## v-show

## v-if
#### 用於條件性渲染一塊內容。這塊內容只會在條件為true時被渲染

## v-else
#### 與v-if一起使用。這塊內容只會在條件為false時被渲染

## v-else-if
#### 基本上要有v-if，並且可以連續使用

## v-show
#### 與v-if相同，當條件為ture時會被選染到DOM中。
:::warning
不同的是，v-show= ture || false，會保留在DOM中，只是切換其CSS property的 `display`
:::
## v-for
## v-on
## v-bind
## v-model
## v-pre
## v-cloak
## v-once
#### 將 data 內容渲染完成後，不追蹤其變化
