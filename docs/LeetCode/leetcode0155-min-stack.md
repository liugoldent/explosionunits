---
{
  "title": "0155 - Min Stack",
  "lang": "zH",
  "description": "leetcode Min Stack js answer",
  "meta": [
            {"name":"keywords", "content":"leetcode Min Stack js answer,Min Stack"},
          ],
  "tags": ['leetcode']
}
---
# 155. Min Stack

## 需知
#### 1. 資料結構:陣列
#### 2. 資料結構:堆疊

## 敘述
設計出一個堆疊，讓這個堆疊可以支援getMin方法（並且`O(n) = O(1)`)

## 範例
```
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```
## 解答
1. 在push時，需要多加個判斷，來達到min_stack的機制
```javascript
/**
 * initialize your data structure here.
 */
var MinStack = function () {
	this._stack = []
	this._min = []
};

/**
* @param {number} x
* @return {void}
*/
MinStack.prototype.push = function (x) {
    // 在push時，一樣直接push stack
	this._stack.push(x)
    // 但多一個_min要做判斷（如果length === 0 || 新增的數字是比min的頂端最小，就要直接push）
	if (this._min.length === 0 || x <= this._min[this._min.length-1]) {
		this._min.push(x)
	} else {
        // 其他狀況，就_min再push一次最小值
		this._min.push(this._min[this._min.length - 1])
	}
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
    // pop 方法：純粹stack的pop
	this._min.pop()
	this._stack.pop()
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
    // top 方法：直接取頂部即可
	return this._stack[this._stack.length -1]
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
    // getMin 方法：直接取_min的top即可
	return this._min[this._min.length-1]
};
```

## 參考資料
[能夠在O(1)取得最小值的MinStack](https://alrightchiu.github.io/SecondRound/stack-neng-gou-zai-o1qu-de-zui-xiao-zhi-de-minstack.html)
