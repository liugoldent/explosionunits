# Mongo & Mongoose

### [the guide of mongoose](https://mongoosejs.com/docs/guide.html)

## installation
1. 首先安裝 https://www.mongodb.com/cloud/atlas
2. Sing in 
3. 都使用預設後，按下**Create Cluster**
4. 看到左邊選項的**Database Access**，點下去
5. 按下 **Add New Database User**
6. 創建User 資訊
7. 點左邊側邊欄的**Clusters**
8. 點**Connect**
9. 點**Connect your application**
10. 複製 **Add your connection string into your application code** 網址

## Install and Set Up Mongoose
### 安裝mongoose，並且連上它
#### 1. 首先建立一個.env file
#### 2. 同樣也要`npm install dotnev`
#### 3. 在server.js的檔案中，加入`require('dotenv').config()`
#### 4. 這樣才可以在檔案中使用`process.env.xxx`
```
// .env file
MONGO_URI=mongodb+srv://mongotest:mongotest@cluster0.uctxt.mongodb.net/DB1?retryWrites=true&w=majority
```
```javascript
var express = require('express');
var app = express();
require('dotenv').config()
try{
  var mongoose = require('mongoose');
    // 下面這行連接了mongoDB
  mongoose.connect(process.env.MONGO_URI)
} catch (e) {
  console.log(e);
}
```

## Create a Model
### CRUD 之 Create

```javascript
var mongoose = require('mongoose')
// 首先都要做新的宣告
var Schema = mongoose.Schema
// 在下面這一行的意思是說，引入`dotenv`才可以取得process.env.xxx
require('dotenv').config()
// 再來這行就是連接的事件（code）
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// 建立model之前，首先要new一個綱要(schema)
var personSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  age: {
    type:Number
  },
  favoriteFoods: [String]
})
// 建立好schema後，就要model出來（第一個參數為名稱，第二個參數為綱要）
var Person = mongoose.model('Person',personSchema)
```

## Create and Save a Record of a Model
### 了解如何建立model後，就要開始建立docement（關係為model下有許多的documnet）
```javascript
// server.js
var createPerson = require('./myApp.js').createAndSavePerson;
router.get('/create-and-save-person', function(req, res, next) {
  var t = setTimeout(() => { next({message: 'timeout'}) }, timeout);
  createPerson(function(err, data) {
    clearTimeout(t);
    if(err) { return (next(err)); }
    if(!data) {
      console.log('Missing `done()` argument');
      return next({message: 'Missing callback argument'});
    }
     Person.findById(data._id, function(err, pers) {
       if(err) { return (next(err)); }
       res.json(pers);
        // 注意下面這行，如果我們把它註解掉，那DB內才會有我們的資料
        // pers.remove();
     });
  });
});
```
```javascript
// myApp.js
var createAndSavePerson = function(done) {
  let francesca = new Person({
    name: 'Francisa',
    age: 20
  })
// 成功後，要做的事情
  francesca.save((error,data)=>{
    if(error){
      console.log(error)
    }else{
      done(null, data)
    }
  })
};
```

## Create many People with `Model.create()
### 創造出多筆資料
```javascript
var createManyPeople = function(arrayOfPeople, done) {
    // 主要是使用create這個model的API（在test過程，其網站會給予陣列傳入）
  Person.create(arrayOfPeople, (error, data) =>{
    if(error){
      console.log(error)
    }else{
      done(null, data)
    }
  })
};
```

## Use model.find() to Search Your Database
### 現在我們使用model.find 來去找尋我們的資料
```javascript
var findPeopleByName = function(personName, done) {
  console.log(personName)
  Person.find({
    // 此題關鍵，name為傳入的參數
    name:personName
  },function(err, data){
    if(err){
      console.log(err)
    }else{
      done(null,data)
    }
  })
};
```

## Use model.findOne() to Return a Single Matching Document from Your Database
### 像是find功能，但是在這邊只會回一筆資料
```javascript
// server.js
// 下面這邊帶入0
findByFood(pers.favoriteFoods[0], function(err, data) {

})
```
```javascript
// 你可能會好奇，喜愛的食物應該是陣列，這樣直接傳可以找到嗎？
// 主要是因為在server.js當中(如上)，引用這個function時，只傳入Array第0個元素，所以可以這樣找
var findOneByFood = function(food, done) {
  Person.findOne({
    favoriteFoods: food
  }, function(err, data){
    if(err){
      console.log(err)
    }else{
      done(null, data)
    }
  })
};
```
