# Dynamic Programming 動態規劃

## Demo1 Fibonacci
### 使用遞迴（效率低）
```javascript
function recurFib(n){
    if( n < 2 ){
        return n
    }
    return recurFib(n-1) + recurFib(n-2)
}
```
### 使用動態規劃
```javascript
function dynFib(n) {
  var val = [];
  for (var i = 0; i <= n; i++) { // 0 - n：含 n+1 個
    val[i] = 0;
  }
  
  if (n == 1 || n == 2) {
    return 1;
  }
  val[1] = 1;
  val[2] = 2;
  for (var i = 3; i <= n; i++) {
    val[3] = val[i-1] + val[i-2];
  }
  return val[n-1];
}

```
