---
{
  "title": "Vue Life Circle",
  "lang": "zH",
  "description": "此篇主要介紹 vue 的 Life Circle 生命週期",
  "meta": [{"name":"keywords", "content":"Vue生命週期, vue life circle. vue"}],
  "tags": ['Vue']
}
---
# 生命週期

## 生命週期介紹（依照順序）
### 1. beforeCreate（初始化介面前）
- 在實例instance完成後，在數據觀測(data observer)和event/watcher事件配置*之前*被調用
- data & el 均未初始化，皆為undefined
- **應用：可在此加一些Loading效果，於created移除**
    
### 2. created（初始化介面後）
- 於實例創建後，立即調用。
- 在這一步，實例已完成以下配置：數據配置(data observer)、屬性和方法的運算、watch/event 事件回調
    然而掛載階段還沒有開始，`$el`屬性目前不可見
- data初始化完成，但`$el`沒有初始化
- **應用：需要非同步請求數據可以在此執行，完成數據的初始化**
        
### 3. beforeMount（渲染DOM前）
- 在資料掛載前被調用：相關的render function首次被調用。
- 該hook在server side render期間不被調用
- data & $el 均已存在，但DOM為virtual DOM 仍尚未被加載。eg: `<p> { message } </p>`
- **應用：vue掛載的根點已經建立，可以圍繞這個根元素進行一些操作**
  
### 4. mounted（渲染DOM後）
- 因為 data 和 $el 均已存在，el 被新創建的 vm.$el（實例）所替換掉，DOM加載完成，並掛載。
- mounted 不會承諾所有子組件一起被掛載，如果我們希望整個視圖都渲染完畢，可以用vm$nextTick替換掉mounted。
- 此hook 在server side render期間不會被調用。
- **應用：可向後端發起請求，拿回數據，配合router做事**
::: tip
第一次頁面加載會觸發以上四個hook：beforeCreate、created、beforeMount、mounted
:::
### 5. beforeUpdate（更新數據前）
- 數據更新時調用，發生於virtual DOM重新渲染前。
- 我們可以在這個鉤子中進一步地更改狀態，這不會觸發重新渲染的過程，也是重新渲染之前最後修改數據的機會
- **應用：更新前訪問現有的DOM，如手動移出添加的事件監聽器**

### 6. updated（更新數據後）
- 數據已經重新渲染好了
- notice：避免在此更改狀態，因為有可能導致無限迴圈。
- **應用：當數據更新時，統一事務處理的時候使用**

### 7. beforeDestory（卸載組件前）
- 在實例銷毀前還可以調用，means在這邊還可以控制組建
- **應用：可做一些刪除提示*

### 8. Destroy（卸載組件）
- vue 實例銷毀後所調用。
- vue 實例所有東西解綁定，所有監聽器會被移除，所有子實例也會被銷毀
- 此階段在server side render 不會被調用
- **應用：無法對組建操作事情**

### 可發起非同步請求的生命週期
- created、beforeMount、mounted
- 非同步放在created的原因：可做SSR

### 不支援SSR（server side render）的函數
- beforeMount、mounted

## keep-alive
#### 定義：可以使被包含的組件保留狀態，避免重新渲染。也就是組件緩存
#### 應用狀況：當送出表單時，想要回上一步時，用得到這個hook
- props參數：
    - include：字串或正規表達式。只有匹配的組件會被緩存
    - exclude：字串會正規表達式。任何匹配的組件都不會被緩存。
- 生命週期有兩個狀態（當component 在keep-alive內被切換時）
    - activated：頁面第一次進入時，觸發順序為 `created -> mounted -> activated`
    - deactivated：頁面退出時會觸發 `deactivated`，當再次前進或後退時，會再次觸發 `activated`
```vue
<keep-alive :include="aliveInclude">
  <component></component>
</keep-alive>
```

## 父子生命週期
### 加載過程
``` javascript
// 父 beforeCreate > 父 created > 父 beforeMount 
    > 子 beforeCreate > 子 created > 子 beforeMount > 子 Mounted
    > 父 Mounted
``` 

### 更新過程
```javascript
// 父 beforeUpdate > 子 beforeUpdate > 子 Updated > 父 Updated
```

### 銷毀過程
```javascript
// 父 beforeDestroy > 子 beforeDestroy > 子 Destroyed > 父 Destroyed
```

## 禁止情況
// 於生命週期使用箭頭函數，將會導致this綁定到父級作用域
```javascript
mounted:() =>{

}
```

## 總結單一組件hook執行順序
1. beforeCreate
2. created
3. beforeMount
4. Mounted
5. beforeUpdated
6. updated
7. activated（only for keep-alive）
8. deactivated（only for keep-alive）
9. beforeDestroy
10. destroyed

## 注意
### 父組件傳遞接口數據給子組件時，一定要在子組件標籤上加上v-if=""來傳遞
原因：在父組件調用接口傳遞給子組件時，接口響應是非同步的。這樣會導致無論父組件在哪個hook請求
在子組件的哪個hook接收數據，都是取不到值的。有可能導致子組件mounted執行完時，父組件的請求才返回訊息。
會導致子組件的data都是undefined

### 解決辦法
#### 1.當父組件資料回來時，才去渲染子組件（v-if）控制 
```vue
<div class="test">
    <children v-if="data1" :data="data1" ></children>
</div>
```
#### 2. 子組件watch 監控值，當父組件獲取到值時，才開始渲染
```javascript
watch:{
    data:{
      deep:true,
      handler:function(newVal,oldVal) {
        this.$nextTick(() => {
          this.data = newVal
          this.data = newVal.url ? newVal.url : ''
        })
      }
    },
}
```
## 參考資料
1. [13 使用keep-alive 保留狀態資料](https://dotblogs.com.tw/wasichris/2018/08/31/001757)
2. [Vue 生命週期說明](https://juejin.im/post/6844904024861327373)
