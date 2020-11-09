---
{
  "title": "JS hoisting",
  "lang": "zH",
  "description": "在這篇，我們來看看JS hoisting 的真正原因",
  "meta": [{"name":"keywords", "content":"js hoisting,js creation Phase,js execution Phase,js 執行期,js 創造期"}],
  "tags": ['JavaScript'],
  "sidebarDepth": "2"
}
---
# JS Hoisting

## JS 運行三步驟
### 1. 語法分析
JS 編譯器會全篇掃描，檢查是否有錯誤，但是不會執行
### 2. 預編譯
此篇的重點，主要分為
* 函數體的預編譯（AO）
* 全局環境的預編譯（GO）
### 3. 解釋執行
執行程式

## 基本範例
```javascript
test();
function test(){
	console.log('a');
}
test();
console.log(a);
var a=123;
```
印出
```
a、a、undefined
```
在以前我們知道這大概就是
* 函數聲明，整體提升
* 變量 聲明提升
雖然我們知道這算是Hoisting，但是其原理是什麼呢？接著就來看看原因吧

## 預編譯前期
1. imply global 暗示全局變量，即任何變量。如果變量未經聲明就賦值，此變量成為全局物件所有
2. 一切聲明的全局變量都是window屬性
```javascript
var a=123;
console.log(a);
function test(){
    // a 先聲明，所以並非是全局變量。但b為聲明，所以是全局變量
    var a=b=123;
}
test();
console.log(window.a); // undefined
console.log(window.b); // 123
```

## 編譯期（執行上下文）
### 1. 函數預編譯（函數執行期上下文）
1. 創建AO物件
2. 找參數(function參數)和變量聲明，將變量的形參名作為AO屬性名，值為undefined
3. 將實參值和形參運行統一（有var的）
4. 在函數裡找到函數聲明，值賦予函數體（只找函數給值）
#### demo1
```javascript
    function foo(a){
        console.log(a); // function a(){}
        var a=123;
        console.log(a); // 123
        function a(){}
        console.log(a); // 123
        var b=function(){}
        console.log(b); // function(){}
        function d(){}
    }
    foo(1);

    /***
     * 1.創建AO物件
     * AO{
     *
     * }
     * 2.找參數和變量聲明，將變量的形參名作為AO物件的属性名，值为undefined
     * AO{
     *     a:undefined
     *     b:undefined
     * }
     * 注：由於形参a和變量聲明a相同，取其中一個即可
     *
     * 3.將帶入的參數值，和參數進行統一
     * AO{
     *     a:undefined=>a:1,
     *     b:undefined
     * }
     *
     * 4.在函数體里面找函數聲明，值赋予函數體
     *
     * AO{
     *     a:1=>function a(){},
     *     b:undefined,
     *     d:function d(){}
     * }
     * 此时预编編譯结束，開始函数執行
     */
```

#### demo2
```javascript
    // 形參：a、b
    // 變量聲明:c
    function test(a,b) {
        console.log(a); // 1
        c=0;
        var c;
        a=3;
        b=2;
        console.log(b); // 2
        function b() {}
        function d() {}
        console.log(b); // 2（ 因為函數在執行期的最初，已經被拉上去執行了 ）
    }
    test(1);
    /***
     * 1.創建AO物件
     * AO{
     *
     * }
     * 2.找參數和變量聲明，將變量的形參名作為AO物件的属性名，值为undefined
     *  AO{
     *     a:undefined,
     *     b:undefined,
     *     c:undefined,
     *  }
     * 3.將帶入的參數值，和參數進行統一
     *  AO{
     *      a:undefined=>a:1,
     *      b:undefined,
     *      c:undefined
     *  }
     *  4.在函数體里面找函數聲明，值赋予函數體
     *  AO{
     *      a:1,
     *      b:undefined=>function b(){},
     *      c:undefined,
     *      d:function d(){}
     *  }
     *  预编译阶段结束，函数开始执行
     *
     */
```
:::tip
當你AO畫完時，最重要的一點是，function都會先執行過，所以所有 function a(){}、function b(){}
這類的函數，全都不影響後面賦值
:::

### 2. 全局預編譯（全局執行期上下文）
1. 創建GO物件
2. 找參數(function參數)和變量聲明，將變量的形參名作為AO屬性名，值為undefined
3. 在函數裡找到函數聲明，值賦予函數體
**函數預編譯翻生在函數執行的前一刻，而全局預編譯發生在script標籤創建的時候，可以看做script是一個大function**
**如果在GO處，同時有兩個同名變數或function名稱，會報錯**
#### demo1
```javascript
    console.log(test);
    function test(test) {
        console.log(test);
        var test=234;
        console.log(test)
        function test() {}
    }
    test(1);
    var test=123;

    /***
     * 1.創建GO物件
     * GO{
     *
     * }
     * 2.找變量聲明，值为undefined
     * GO{
     *     test:undefined
     * }
     * 3.找函數聲明，值賦予函數體
     * GO{
     *     test:undefined=>function test(){....此處省略},
     * }
     * 全局預編譯結束，開始執行代碼
     *
     */

    /***
     * 1.創建AO對象
     * AO{
     *
     * }
     * 2.找形參和變量聲明，將形參的變量名作為AO對象的屬性名，值為undefined,
     *  AO{
     *     test:undefined,
     *  }
     *  3.將實參值和形參值統一
     *  AO{
     *      test:undefined=>test:1,
     *  }
     *  4.在函數體里面找函數聲明，值賦予函數體
     *  AO{
     *      test:1=>test:function test(){}
     *  }
     *  函數預編譯結束，開始執行代碼
     *
     *
     *
     */
```

#### demo2
```javascript
    global=100;
    function fn() {
        console.log(global); // undefined
        global=200;
        console.log(global); // 200
        var global=300;
    }
    fn();
    var global;

    /***
     * 1.創建GO對象
     * GO{
     *
     * }
     * 2.找變量聲明，值為undefined
     * GO{
     *     global:undefined
     * }
     * 3.找函數聲明，值賦予函數體
     * GO{
     *     global:undefined,
     *     fn:function fn(){...}
     * }
     *
     * 全局預編譯結束，執行代碼，進入函數預編譯
     */

    /***
     *1.創建AO對象
     * AO{
     *
     * }
     * 2.找形參和變量聲明，將形參的變量名作為AO的屬性名，值為undefined
     *  AO{
     *      global:undefined
     *  }
     * 3.將實參值和形參統一
     *  AO{
     *      global:undefined
     *  }
     * 4.在函數體里面找函數聲明，值賦予函數體
     * AO{
     *     global:undefined
     * }
     *函數預編譯結束，開始執行代碼
     *
     */

```

#### demo3
```javascript
    a=100;
    function demo(e) {
        function e() {}
        arguments[0]=2;
        console.log(e); // 參數第0個 = 2
        if(a){
            var b=123;
            function c() {}
        }
        var c;
        a=10;
        var a;
        console.log(b); // undefined
        f=123;
        console.log(c); // undefined（c 變數在建制期間，並不會被改成 function c(){}，因為if內不會提升）
        console.log(a); // 10
    }
    var a;
    demo(1);
    console.log(a); // 吃外面的 global 100
    console.log(f); // 裡面會影響外面的值，故f = 123
    /***
       * 1.創建GO對象
       * GO{
       *
       * }
       * 2.著變量聲明，值為undefined
       * GO{
       *     a:undefined
       * }
       * 3.找函數聲明，值賦予函數體
       * GO{
       *     a:undefined,
       *     demo:function demo(e){...}
       * }
       * 全局預編譯完成，執行代碼進入函數預編譯
       *
       */
      /***
       *1.創建AO對象
       * AO{
       *
       * }
       * 2.找形參和變量聲明，將形參的變量名作為AO對象的屬性名，值為undefined
       *  AO{
       *      e:undefined,
       *      a:undefined,
       *      b:undefined,
       *      c:undefined,
       *
       *  }
       *  3.將實參值和新參統一
       *  AO{
       *      e:1,
       *      a:undefined,
       *      b:undefined,
       *      c:undefined,
       *  }
       *  4.在函數體里面找函數聲明，值賦予函數體
       *  AO{
       *      e:function e(){},
       *      a:undefined,
       *      b:undefined,
       *      c:function c(){}
       *  }
       *  函數預編譯完成，執行代碼
       */
```

## 關於let and const
編譯期與var相同，不過我們可以想像把 `undefined` 變為 ReferenceError<br>
學名稱為TDZ
## 參考資料
#### 1.[JS进阶系列-JS执行期上下文(一)](https://juejin.im/post/6878914767973679117)
#### 2. 
