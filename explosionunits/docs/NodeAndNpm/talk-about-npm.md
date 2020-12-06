# Managin Packages with NPM

## Introduction to the Managing Package with npm Challenges
#### *記得先去clone這個網址的專案[freecodecamp](https://github.com/freeCodeCamp/boilerplate-npm/)
::: tip
npm（Node Package Manager）是Node.js預設，用JS編寫的軟體套件管理系統
:::
當我們在啟動一個新專案時，首先我們都會先新增一個`package.json`的文件，
這文件管理了我們的專案的相依模組，同時我們也可以設定相依模組的版號，
並且npm所管理的檔案都放置於`node_modules`，安裝此modules主要指令是
`npm i`

## How to Use package.json
#### 這邊教大家如何去使用`package.json`，並且新增一個`author`的key
package.json是管理npm的核心，它存了這個專案的所有資料（滿像是HTML內的`<head>`）
其中兩個必填的為`name`、`version`，並且記得這個檔案都是key-value對
```json
{
	"author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"dependencies": {
		"express": "^4.14.0"
	}
//    以下略,
}
```

## Add a Description to Your package.json
#### 增加完了`author`，再增加個`description`描述
```json
{
    "author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"description": "freeCodeCamp test",
	"dependencies": {
		"express": "^4.14.0"
	}
}
```

## Add Keywords to Your package.json
#### 再來繼續增加keywords，記得他是一個陣列
```json
{
    "author": "GuanTing",
  	"name": "fcc-learn-npm-package-json",
  	"description": "freeCodeCamp test",
  	"keywords": ["practice","freecodecamp","npm"],
}
```

## Add a License to Your package.json
`License`並非必須，大部分的使用為MIT or BSD
```json
{
    "author": "GuanTing",
  	"name": "fcc-learn-npm-package-json",
  	"description": "freeCodeCamp test",
  	"keywords": ["practice","freecodecamp","npm"],
  	"license": "MIT",
}
```

## Add a Version to Your package.json
接下來`version`的部分，主要是在敘述，我們這個project的版本到哪了
```json
{
    "author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"description": "freeCodeCamp test",
	"keywords": ["practice","freecodecamp","npm"],
	"license": "MIT",
	"version": "1.2.0",
}
```
## Expand Your Project with External Packages from npm
