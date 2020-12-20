---
{
  "title": "Node.js Lesson3",
  "lang": "zH",
  "description": "Node.js 介紹",
  "meta": [{"name":"keywords", "content":"node.js"}],
  "tags": ['node.js'],
  "sidebarDepth": "2"
}
---
# Node.js CRUD
## 設定路由
```javascript
import article from './article.route';

router.use('/article', article);
```
## 新增（Article）
> router.js > controller.js > module.js（由controller.js傳進給module）

#### article.router.js
```javascript
import express from 'express'
import articleCtrl from '../controller/article.controller'

const router = express.Router()

router.route('/').post(articleCtrl.articlePost)

export default router
```
#### article.controller.js
controller檔案接收module中Promise的回傳結果，經由then得到一個變數，可以查看回傳訊息，or接收例外catch
```javascript
import articleModule from '../modules/article.module';

/* Article  POST 新增 */
const articlePost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body; 
  articleModule.createArticle(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
export default {
  articlePost
};
```
#### article.module.js
module檔案是最終與資料庫做存取的地方，傳入值insertValue是使用者要新增的資料，為一個物件型態，這個變數
是由`article.controller.js` 傳來的
```javascript
import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});
const createArticle = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        // 這是一個語法，可以直接在裡面寫sql來對資料庫做存取
        connection.query('INSERT INTO Article SET ?', insertValues, (error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ article_id: ${result.insertId}`); // 寫入成功回傳寫入id
          }
          connection.release();
        });
      }
    });
  });
};
export default {
  createArticle
};
```

## 查詢
同樣的是在controllers || modules || router.js 內加入程式碼

#### article.router.js
注意這種router的寫法，url上直接加 get || post
```javascript
router.route('/')
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */
  .post(articleCtrl.articlePost); /** 新增 Article 值組 */
```

#### article.controller.js
```javascript
const articleGet = (req, res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
```

#### article.module.js
```javascript
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // Article撈取所有欄位的值組
          `SELECT
            *
          FROM
            Article`
          , (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};
```


## 修改
因為在修改上，你需要給一個條件去找出被修改的物件，所以需要傳參數給node
#### article.route.js
```javascript
router.route('/:article_id').put(articleCtrl.articlePut);
```
#### article.controller.js
同樣因為修改要有資料，也是要帶id給node端
```javascript
/* Article PUT 修改 */
const articlePut = (req, res) => {
  // 取得修改id
  const userId = req.params.article_id;
  // 取得修改參數
  const insertValues = req.body;
  articleModule.modifyArticle(insertValues, userId).then((result) => {
    res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
```
#### article.module.js
```javascript
/* Article PUT 修改 */
const modifyArticle = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        connection.query('UPDATE Article SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.message.match('Changed: 1')) { // 寫入成功
            resolve('資料修改成功');
          } else { 
            resolve('資料無異動');
          }
          connection.release();
        });
      }
    });
  });
};
```

## 刪除
因為在刪除上，你需要給一個條件去找出被修改的物件，所以需要傳參數給node
#### article.route.js
```javascript
router.route('/:article_id')
  .put(articleCtrl.articlePut) /** 修改 Article 值組 */
  .delete(articleCtrl.articleDelete); /** 刪除 Article 值組 */
```
#### article.controller.js
同樣因為刪除要有資料，也是要帶id給node端
```javascript
/* Article  DELETE 刪除 */
const articleDelete = (req, res) => {
  // 取得刪除id
  const userId = req.params.article_id;
  articleModule.deleteArticle(userId).then((result) => {
    res.send(result); // 回傳刪除成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
```
#### article.module.js
```javascript
/* Article  DELETE 刪除 */
const deleteArticle = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表刪除指定id一筆資料
        connection.query('DELETE FROM Article WHERE article_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 資料庫存取有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('刪除成功！');
          } else {
            resolve('刪除失敗！');
          }
          connection.release();
        });
      }
    });
  });
};
```

## joi 驗證
### 基本設定
1. 在src > config.js 資料夾底下新增`param-validation.js`檔案，為主要的api驗證格式
2. 安裝`express validation`
3. 兩者搭配就可以使進入module前先進入middleware再作主程式
```javascript
import Joi from 'joi';

export default {
  // POST /api/article
  createArticle: {
    body: {
      // 格式: Joi.型態.(最短長度).是否必填
      user_id: Joi.number().required(), // 數字＋必填
      article_title: Joi.string().required(), // 字串＋必填
      article_tag: Joi.string().required(), // 字串＋必填
      article_content: Joi.string().min(20).required() // 文章長度至少20字
    }
  },
  // POST /api/user
  createUser: {
    body: {
      user_name: Joi.string().required(), // 字串＋必填
      user_mail: Joi.string().email().trim().required(), // 限定email格式並移除多餘空白
      user_password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required() // 最小長度6最大30，只允許英文大小寫和數字
    }
  }
};
```
### router設定
將paramValidation 引入各自的route.js
```javascript
import express from 'express';
import validate from 'express-validation'; // 注意這個要安裝
import articleCtrl from '../controllers/article.controller';
import paramValidation from '../../config/param-validation'

const router = express.Router();

router.route('/')
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */
  .post(validate(paramValidation.createArticle), articleCtrl.articlePost); /** 新增 Article 值組 */

router.route('/:article_id')
    .put(articleCtrl.articlePut)
    .delete(articleCtrl.articleDelete); /** 刪除 Article 值組 */

export default router;
```
