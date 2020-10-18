---
{
  "title": "JS 複雜判斷的更優雅寫法",
  "lang": "zH",
  "description": "在這篇，我們去改寫複雜if-else的判斷式",
  "meta": [{"name":"keywords", "content":"js if-else, refactor"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS 複雜判斷的更優雅寫法
常常有這種狀況：在商業邏輯的日益複雜下，if/else或switch太多，會造成看code越來越不懂，而如何更優雅地寫出判斷邏輯，為此篇重點

## example1
### worse-1. if...else if 的寫法
```javascript
function ClickFunc(atatus){
    if(status === 1){
        console.log('星期一')
    }else if(status === 2 ){
        console.log('星期二')
    }else if(status === 3){
        console.log('星期三')
    }else if(status === 4){
        console.log('星期四')
    }
}
```
### worse-2. switch 的寫法
```javascript
function ClickFunc(atatus){
    switch (status){
        case 1:
        console.log('星期一')
        break
        
        case 2:
        console.log('星期一')
        break

        case 3:
        console.log('星期一')
        break

        case 4:
        console.log('星期一')
        break
    }
}
```
### better-1. 使用Object做判斷
#### 適合情境：一元條件判斷
* 優點：將判斷條件作為物件的屬性名(key)，將處理邏輯作為物件的屬性值(value)，在點擊時，通過物件屬性查找的方式來進行邏輯判斷。
```javascript
const status = {
    '1': ['星期一'],
    '2': ['星期二'],
    '3': ['星期三'],
    '4': ['星期四'],
    'default': ['無星期']
}

function ClickFunc(status_cod){
    let la_status = status[status_cod] || status['default']
    console.log(la_status[0])      
}
```

### better-2. 使用 new Map
#### 適合情境：一元條件判斷
* 一個物件通常有自己的原型，所以一個物件總有一個prototype鍵
* 一個物件的key只能識字串or Symbols，但一個Map的鍵可以是任意值
* 我們可以透過size屬性，很容易得到一個Map的key-values個數，而物件的key-values個數只能手動確認
```javascript
const action = new Map([
    [1, ['星期一']],
    [2, ['星期二']],
    [3, ['星期三']],
    [4, ['星期四']],
    ['default', ['無星期']]
])

const ClickFunc = (status_cod)=> {
    let la_status = action.get(status_cod) || action.get('default')
    console.log(la_status[0])
}
```

## example2
現在除了status外，我們再增加個條件：country
```javascript
function ClickFunc(atatus, country){
    if(country === 'US'){
        if(status === 1){
            console.log('MON')
        }else if(status === 2 ){
            console.log('TUE')
        }else if(status === 3){
            console.log('WED')
        }else if(status === 4){
            console.log('THU')
        }
    }else if(country === 'TW'){
        if(status === 1){
            console.log('星期一')
        }else if(status === 2 ){
            console.log('星期二')
        }else if(status === 3){
            console.log('星期三')
        }else if(status === 4){
            console.log('星期四')
        }
    }
}
```
### better-1. 使用new Map 改寫
#### 将condition拼成字串存到Map里
#### 適合情境：多元條件判斷
* 核心邏輯：用兩個條件拼成字串，並通過以條件拼接字串為key，以處理函數作為map的value來進行查找，這種寫法在多元條件判斷好用。
```javascript
const actions = new Map([
    ['US_1', ()=>{/*do sth*/}],
    ['US_2', ()=>{/*do sth*/}],
    ['US_3', ()=>{/*do sth*/}],
    ['US_4', ()=>{/*do sth*/}],
    ['US_5', ()=>{/*do sth*/}],
    ['TW_1', ()=>{/*do sth*/}],
    ['TW_2', ()=>{/*do sth*/}],
    ['TW_3', ()=>{/*do sth*/}],
    ['TW_4', ()=>{/*do sth*/}],
    ['TW_5', ()=>{/*do sth*/}],
    ['default', ()=>{/*do sth*/}],
])

const ClickFunc = (atatus, country) =>{
    let lf_action = actions.get(`${country}_${status}`) || actions.get('default')
    lf_action.call(this)
}
```

### better-2. 另一種Map方案：將Object物件作為key
#### 將condition拼成Object存到Map里
#### 適合情境：多元條件判斷
* 這裡可以注意到，Map可以使用任何數據作為key
```javascript
const actions = new Map([
    [{identity:'guest', status:1}, ()=>{/* do sth*/}],
    [{identity:'guest', status:2}, ()=>{/* do sth*/}],
])

const ClickFunc = (identity, status) =>{
    let action = [...actions].filter(([key,value]) => (key.identity == identity && key.status == status))
    action.forEach(([key,value]) => value.call(this))
}
```

### better-3. 假設status1~status5的邏輯都一樣
#### 將condition拼成Object存到Map里
#### 適合情境：多元條件判斷
* hint：把邏輯抽出來變共用的
```javascript
const actions = ()=>{
    const functionA = ()=>{ /* do sth */ }
    const functionB = ()=>{ /* do sth */ }
    return new Map([
        [{identity:'guest', status:1}, functionA],
        [{identity:'guest', status:2}, functionA],
        [{identity:'guest', status:3}, functionA],
    ])
}

const ButtonClick = (identity, status) =>{
    // 下方filter的
    // 1. key 代表著new Map的第一個identity那個物件。
    // 2. value代表著 new Map 的functionA
    let action = [...actions()].filter(([key, value]) =>(key.identity === identity && key.status === status))
    action.forEach(([key, value]) => value.call(this))
}
```

### better-4. 將正則表達式變成key值
#### 將condition拼成正則存到Map里
#### 適合情境：多元條件判斷
```javascript
const actions = () =>{
    const functionA = ()=>{ /* do sth */ }
    const functionB = ()=>{ /* do sth */ }
    return new Map([
        [/^guest_[1-4]$/,functionA],
        [/^guest_5$/,functionB]
    ])
}

const ButtonClick = (identity, status) =>{
    // 要驗證正規表達式，要使用test
    let action = [...actions()].filter(([key, value]) =>(key.test(`${identity}_${status}`)))
    action.forEach(([key, value]) => value.call(this))
}
```

### better-5. 通用的正規表達式邏輯判斷
#### 將condition拼成正則存到Map里
#### 適合情境：多元條件判斷
```javascript
const actions = () =>{
    const functionA = ()=>{ /* do sth */ }
    const functionB = ()=>{ /* do sth */ }
    const functionC = ()=>{ /* do sth */ }

    return new Map([
        [/^guest_[1-4]$/, functionA],
        [/^guest_5$/, functionB],
        // 在下面這行，有關於guest的判斷，通通都會納入這邊
        [/^guest_.*$/, functionC]
    ])
}

const ButtonClick = (identity, status) =>{
    // 要驗證正規表達式，要使用test
    let action = [...actions()].filter(([key, value]) =>(key.test(`${identity}_${status}`)))
    action.forEach(([key, value]) => value.call(this))
}
```

## if-else 重構的寫法
#### 更優美的條件寫法
```javascript
// 在這邊的if條件判斷是表示什麼意義，我們是不知道
var myStery = function(){
    if(temp > 100 && color === 'white' && oil > 20 && water < 20){
        // doSomething
    }
}
```
```javascript
// 但是如果今天再包一個function 把 function 名稱變得好一點，別人就會比較好理解
var myStery = function(){
    // 這邊只要把「煮」的方案丟進去即可
    if(isCooked(temperature, color, oil, water)){
        // doSomething
    }
}

var isCooked = function (temperature, color, oil, water){
    return  (temp > 100 && color === 'white' && oil > 20 && water < 20)
}
```

## 參考資料
[JS 複雜判斷的優雅寫法](https://juejin.im/post/6844903705058213896)
[JS Design Pattern Day27-重構-上](https://ithelp.ithome.com.tw/articles/10209361)
