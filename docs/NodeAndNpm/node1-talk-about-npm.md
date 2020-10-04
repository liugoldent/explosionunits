---
{
  "title": "Managin Packages with NPM",
  "lang": "zH",
  "description": "Managin Packages with NPM",
  "meta": [{"name":"Managin Packages with NPM", "content":"npm的基本使用"}],
  "tags": ['NPM']
}
---
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
再來我們增加套件在我們的`package.json`中
```json
{
    "author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"description": "freeCodeCamp test",
	"keywords": ["practice","freecodecamp","npm"],
	"license": "MIT",
	"version": "1.2.0",
	"dependencies": {
		"moment": "2.14.0",
		"express": "^4.14.0"
	},
}
```

## Manage npm Dependencies By Understanding Semantic Versioning
管理我們的版本號！（Semantic Versioning 軟體版本號）
```"package": "MAJOR.MINOR.PATCH"```
[軟體版本號](https://zh.wikipedia.org/wiki/%E8%BB%9F%E4%BB%B6%E7%89%88%E6%9C%AC%E8%99%9F)
```json
{
    "author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"description": "freeCodeCamp test",
	"keywords": ["practice","freecodecamp","npm"],
	"license": "MIT",
	"version": "1.2.0",
	"dependencies": {
		"moment": "2.10.2",
		"express": "^4.14.0"
	},
	"package": "2.0.2",
}
```

## Use the Tilde-Character to Always Use the Latest Patch Version of a Dependency
如果你想要永遠保持你的相依在最新狀態，那麼就要使用「~」符號，來讓你的套件一直維持最新的狀態
```json
{
	"author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"description": "freeCodeCamp test",
	"keywords": ["practice","freecodecamp","npm"],
	"license": "MIT",
	"version": "1.2.0",
	"dependencies": {
		"moment": "~2.10.2",
		"express": "^4.14.0"
	},
}
```

## Use the Caret-Character to Use the Latest Minor Version of a Dependency
永遠讓你的相依套件，維持在Minor Version（注意下方範例是使用`^2.x.x`）（for小更新）
```json
{
    "author": "GuanTing",
  	"name": "fcc-learn-npm-package-json",
  	"description": "freeCodeCamp test",
  	"keywords": ["practice","freecodecamp","npm"],
  	"license": "MIT",
  	"version": "1.2.0",
  	"dependencies": {
  		"moment": "^2.x.x",
  		"express": "^4.14.0"
  	},
}
```

## Remove a Package from Your Dependencies
要移除套件也很簡單，直接delete掉就好
```json
{
    "author": "GuanTing",
	"name": "fcc-learn-npm-package-json",
	"description": "freeCodeCamp test",
	"keywords": ["practice","freecodecamp","npm"],
	"license": "MIT",
	"version": "1.2.0",
	"dependencies": {
		"express": "^4.14.0"
	},
}
```
