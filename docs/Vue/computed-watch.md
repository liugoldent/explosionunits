# Computed & Watch

## 用法上的區別

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
