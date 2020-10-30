---
{
  "title": "JS reduce 使用",
  "lang": "zH",
  "description": "在這篇，我們可以會了解到JS reduce 的使用",
  "meta": [{"name":"keywords", "content":"JS reduce, js array reduce,reduce"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---

# JS reduce

## 原理
有別於大部分陣列返回的新陣列，`Array.reduce()`更加靈活。可以返回任意值<br>
這個值可以是數字、字串、物件、新陣列

## 用法
* `Array.reduce`接收兩個參數
1. 對陣列每個元素執行的function
2. 初始值
* 這個function接收兩個參數
1. `accumulator`當前聚合值（累積）
2. `current`陣列循環時的當前元素
```javascript
let newArray = [].reduce((accu, current)=>{
    return accu
}, starting)
```

## 例子
### 1. 陣列求和
假設我們想把一組數字加在一起，可以使用`Array.forEach()`
```javascript
let total = 0
[1,2,3].forEach(data =>{
    total += data
})
```
改成`reduce`
```javascript
let a = [1,2,3]

let b = a.reduce((accu, current)=>{
  return accu = accu + current
},0)

console.log(b)
```
1. 第一次迭代：將0帶入accu，然後current = 第一個元素。相加後讓accu等於結果
2. 第二次迭代：現在的accu，加上current的第二個元素。相加後讓accu等於結果

### 2. 組合多個陣列
今天假設一個需求是想要求得 `house`屬性為 `Hufflepuff` 的 巫師。
首先可以使用 filter + map 來求得
```javascript
var wizards = [
  {
    name: 'Harry Potter',
    house: 'Gryfindor'
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff'
  },
  {
    name: 'Tonks',
    house: 'Hufflepuff'
  },
  {
    name: 'Ronald Weasley',
    house: 'Gryfindor'
  },
  {
    name: 'Hermione Granger',
    house: 'Gryfindor'
  }
];

 var hufflepuff = wizards.filter(function (wizard) {
  return wizard.house === 'Hufflepuff';
}).map(function (wizard) {
  return wizard.name;
});

console.log(hufflepuff)
// ["Cedric Diggory", "Tonks"]
```
但如果今天使用 `reduce`，我們可以用一步就得到相同結果<br>
傳遞一個空陣列作為初始值，然後在每次迭代時判斷`wizzard.house`，若`true`則`push`進 `accu`中
```javascript
let hufflepuff2 = wizards.reduce((accu, current)=>{
  if(current.house === 'Hufflepuff'){
    accu.push(current.name)
  }
  return accu
},[])
console.log(hufflepuff2)
// ["Cedric Diggory", "Tonks"]
```

### 3. 從陣列產生HTML標籤
延續上一個話題，如果想要產生上面結果的無序列列表，該怎麼做？<br>
這次初始值設定為空字串，在用`<li>`包起來，最後最外層再加上`<ul>`
```javascript
let hufflepuff2 = wizards.reduce((htmlTag, current)=>{
  if(current.house === 'Hufflepuff'){
    htmlTag += `<li> ${current.name} </li>`
  }
  return htmlTag
},'')
```
### 4. 陣列分組
如果使用`lodash`我們可以這樣做：
```javascript
var words = ['one', 'two', 'three'];

// 返回 {'3': ['one', 'two'], '5': ['three']}
_.groupBy(words, 'length');
```
那麼如果使用reduce呢？
```javascript
var words = ['one', 'two', 'three'];


let groupByFunc = words.reduce((obj,current) => {
    // 分組條件
    let key = current.length
    
    // 如果物件中沒有這個屬性，則創建一個
    if(!obj.hasOwnProperty(key)){
        obj[currentLenght] = []
    }
    // 在這個屬性中push一個值
    obj[key].push(current)
    
    return obj
},{})

console.log(groupByFunc)

[object Object] {
  3: ["one", "two"],
  5: ["three"]
}
```

### 5. 合併數據到單個數組
如果想要把某個一個數據，加到某個陣列中，可以使用reduce
```javascript
var wizards = [
  {
    name: 'Harry Potter',
    house: 'Gryfindor'
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff'
  },
  {
    name: 'Tonks',
    house: 'Hufflepuff'
  },
  {
    name: 'Ronald Weasley',
    house: 'Gryfindor'
  },
  {
    name: 'Hermione Granger',
    house: 'Gryfindor'
  }
];
var points = {
  HarryPotter: 500,
  CedricDiggory: 750,
  RonaldWeasley: 100,
  HermioneGranger: 1270
};

let combineData = wizards.reduce(function(accu, curr){
    // 先取代掉空白格
    let key = curr.name.replace(' ','')
    
    // 如果分數中存在著對應的人名，則加一個points的key值
    if(points[key]){
      curr.points = points[key]
    }else{
      curr.points = 0
    }
  
    // 然後做完處理後，accu這個array push上去一個
    accu.push(curr)
    
    return accu
},[])

console.log(combineData)
```

6. 合併數據到單個物件
```javascript
var wizardsAsAnObject = wizards.reduce(function (obj, wizard) {

  // 一樣先移除巫師的名字，來找到對應的分數
  var key = wizard.name.replace(' ', '');

  // 如果wizard有points，則加上他，沒有則0
  if (points[key]) {
    wizard.points = points[key];
  } else {
    wizard.points = 0;
  }

  // 删除 name 属性
  delete wizard.name;

  // 把 wizard 數據放到新物件中
  obj[key] = wizard;

  // 返回該物件
  return obj;

}, {});
```

## 參考資料
[自从学会了 Array.reduce() ，再也离不开它](https://zhuanlan.zhihu.com/p/109550049)
