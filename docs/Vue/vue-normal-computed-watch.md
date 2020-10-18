---
{
  "title": "Vue Computed & Watch",
  "lang": "zH",
  "description": "此篇主要介紹 vue 的 Computed 與 Watch 的使用與差別",
  "meta": [{"name":"keywords", "content":"Computed 與 Watch 的使用與差別, vue computed, vue watch, vuejs"}],
  "tags": ['Vue']
}
---
# Computed & Watch

## 基礎用法

#### 使用Computed的值時，往往是多個值求值結果，相當於我們保存了計算過程，計算過程中使用過的值發生變化時會觸發重新執行Computed的這個函數
```javascript
vm = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed:{
        // fullName 依賴著 this.firstName / this.lastName，這兩個依賴變了，fullName重新觸發
        fullName: function(){
            return this.firstName + this.lastName
        }   
    }
})
```
當然我們也可以把computed改成watch
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    // 在這邊監控的話，我們需要用兩個watch的function去監看，麻煩了不少
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
當然這也可以談到webpack的watch，假設我們在webpack.config.js中使用
```javascript
module.exports ={
    watch: true
}
```
這樣的效果就是*當前執行目錄（process.cwd()）*裡面文件發生變化時，webpack能檢測到他的變化
重新打包和hot reload。
#### 同理Vue.js也是這樣，這個值變化了，我們來做相對應的事
::: tip 
#### computed[key]這個值我們需要用到它，依賴的變化運算過程自動執行
#### watch[key]這個值我們不需要用到它，但它的變化我們想做到一些事情
:::

## computed - getter & setter

### 1. computed- getter
在Vue中，computed可以被視為像data一樣，可以讀取和設值，因此在computed中可以分成`getter`(讀取)& `setter`(設值)
而預設情況只有getter，有就是只能讀取，不能設定。另外記得computed要使用return 將值返回出來。
#### 一般情況getter的觸發點：模板相依資料用到，並且computed內資料改變時
```vue
<template>
  <!--這邊有相依，所以getter會觸發-->
  <p>{{ fullName }}</p>
</template>
```
```javascript
new Vue({
    ...,
    data: {
        firstName:'',
        lastName:'',
    },
    computed:{
        fullName(){
            return this.firstName+ this.lastName
        }   
    }      
})
```
那今天假設template上未使用資料，那computed計算屬性就不會去觸發（因為return 值尚未被用到）
```vue
<template>
  <p>firstName: {{ firstName }}, lastName : {{ lastName }}</p>
</template>
```

### 2. computed- setter
首先要使用setter一定要在computed裡面設定setter
```javascript
computed:{
    fullNmae:{
        get(){
            return this.firstName+ this.lastName
        },
        // 當computed要設定值時，會先去觸發setter，所以流程會變成
        // setter > getter > updated
        set(value){
            this.firstName = value.split(' ')[0]
            this.lastName = value.split(' ')[1]
        }   
    }
}
```

## watch - deep & immediate
### immediate
一般來說，watch在最初綁定時不會執行，要等到依賴改變時才會去監聽計算。那假設今天我們要讓它在
最初綁定時就執行，就要使用`immediate`
```javascript
watch :{
    firstName:{
        handler(nval,oval){
            this.fullName = nval + '' + this.lastName
        },
        // 代表了watch裡聲明firstName這個function後，立即去執行handler方法
        immediate:true
    }
}
```

### deep
再來說到deep，今天我們有個物件
```javascript
obj = {
    a:1
}
```
我們watch所監控這個值是無效的。
:::tip
由於Vue在初始化會對屬性執行getter/setter轉化過程，所以屬性必須在data物件上存在，才能讓Vue轉換他
所以當你是物件時，data只看到obj沒看到裡面的a，就無法變化，所以只好使用deep
:::
而當今天我們想要監控這個值的時候就可以（但是這個方法會*耗效能*），因為修改任何obj內的屬性，都會觸發watch
```javascript
watch:{
    obj:{
        handler(nval,oval){
            console.log('obj.a changed')
        },
        deep:true
    }
}
```
於是我們可以用字符串去優化他，這樣就是當vue遇到屬性a，才會給a設置監聽函數。
```javascript
watch:{
    'obj.a':{
        handler(nval,oval){
            console.log('obj.a changes')
        },
        immediate: true
    }
}
```

### watch 註銷
正常來說，如果是下面這種寫法，watch會隨著組件銷毀而註銷
```javascript
const app = new Vue({
  template: '<div id="root">{{text}}</div>',
  data: {
    text: 0
  },
  watch: {
    text(newVal, oldVal){
      console.log(`${newVal} : ${oldVal}`);
    }
  }
});
```
但如果你用$watch監聽，你要要手動去註銷他了
```javascript
const unWatch = app.$watch('text',(nval,oval) => {
    console.log(nval)
})
unwatch() // 手動註銷unwatch
```
