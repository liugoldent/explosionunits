---
{
  "title": "VueX",
  "lang": "zH",
  "description": "VueX 使用",
  "meta": [
  {"name":"keywords", "content":"vuex,vue"},
  ],
  "tags": ['Vue'],
  "sidebarDepth": "2"
}
---
# VueX
## 介紹
成員列表：
* state：存放狀態
* mutation：state成員操作
* getters：加工state成員給外界
* actions：非同步操作
* modules：模塊化狀態管理

## 工作流程
![VueX](https://user-gold-cdn.xitu.io/2020/4/2/17139c52d526231d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 使用
### Base
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(VueX)
```
### state
####意義：設置全域訪問的state物件
```javascript
 const state={   //設置全域訪問的state物件
     showFooter: true,
     changableNum:0
     // state 初始值
   };
```

### getters
####意義：監聽state值的變化
```javascript
const getters = { 
    isShow(state) {  // 接受變化的 showFooter的值
       return state.showFooter
    },
    getChangedNum(){  //接受變化的 changebleNum的值
       return state.changableNum
    }
};
```
### mutations
####意義：改變state的唯一方法，這裡面的參數除了state之外還可以再傳額外的參數（值或物件）
```javascript
const mutations = {
    show(state) {   
        state.showFooter = true;
    },
    hide(state) {  
        state.showFooter = false;
    },
    newNum(state,sum){ 
       state.changableNum+=sum;
    }
};
```

### actions
#### 意義：自定義觸發mutations裡函數的方法，context & store實例具有相同的方法和屬性
```javascript
const actions = {
    hideFooter(context) {
        context.commit('hide');
    },
    showFooter(context) {
        context.commit('show');
    },
    getNewNum(context,num){ 
        context.commit('newNum',num)
     }
};
```

### export
```javascript
const store = new Vuex.Store({
   state,
   getters,
   mutations,
   actions
});
export default store;
```

## 掛載到Vue實例中
```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store, 
  render: h => h(App)
})
``` 

## 在組件中使用VueX
```vue
<template>
    <div id="app">
        <router-view/>
        <FooterBar v-if="isShow" />
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'; //先要引入
import FooterBar from '@/components/common/FooterBar'
import config from './config/index'
export default {
    name: 'App',
    components:{
    FooterBar:FooterBar
},
data(){
    return {
    }
},
computed:{
    ...mapState(['isShow']),  //這裡使用展開運算符，ES6的语法，意思是state里有多少属性值我可以在這裏放多少属性
     // 你也可以用下面的mapGetters來獲取isShow的值，貌似下面的更简洁
    ...mapGetters(['isShow']),
    ...mapMutations(['show', 'hide'])
},
watch:{
  $route(to,from){
    if(to.name=='book'||to.name=='my'){
       this.show()
    }else{
       this.hide()
    }
  }
}
}
</script>

```

## nameSpace
當你的專案龐大時，不可能光靠一個index.js就管理好所有資料<br>
所以VueX提供了namsSpace這種方案：他可以讓你在呼叫VueX增加個前綴字，讓資料區分開來<br>
至此所以index.js就變成了進入點
#### index.js
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import footerStatus from './modules/footerStatus' // 引入第一個VueX
import collection from './modules/collection' // 引入第二個VueX
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
         footerStatus,
         collection
    }
});
```

#### store/module/footerStatus.js
```javascript
const state={  
    showFooter: true
    // ... 略
};
const getters = {  
    // ... 略
};
const mutations = {
    // ... 略
};
const actions = {
    // ... 略
};
export default {
    namespaced: true, //注意這邊要設定true
    state,
    getters,
    mutations,
    actions
}
```

#### collection.js
```javascript
const state={
    // ... 略
};
const getters={
    // ... 略  
};
const mutations={
    // ... 略
};
const actions={
    // ... 略
};
export default {
     namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
     state,
     getters,
     mutations,
     actions
}
```
## 在組件中使用nameSpace VueX
```vue
<template>
  <div id="app">
    <router-view/>
    <FooterBar v-if="isShow" />
  </div>
</template>
 
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; //先要引入
import FooterBar from '@/components/common/FooterBar'
import config from './config/index'
export default {
  name: 'App',
  components:{
    FooterBar:FooterBar
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapState({
     isShow:state=>state.footerStatus.showFooter // 注意：這些與上面的區別就是state.footerStatus,
                                                 // 的showFooter是指footerStatus.js裡state的showFooter
    }),
    // mapGetters，則變成第一個參數為「nameSpace」。第二個參數為「getter function」
    ...mapGetters('footerStatus',{
         isShow:'isShow'                    
    })
  },
  watch:{
      $route(to,from){
        if(to.name=='book'||to.name=='my'){
           this.$store.dispatch('footerStatus/showFooter') // 這裡改為'footerStatus/showFooter',
                                                           // 意思是指footerStatus.js裡actions裡的showFooter方法
        }else{
           this.$store.dispatch('footerStatus/hideFooter') // 若是mutation 意思相同
        }
      }
  }
}
</script>

```
