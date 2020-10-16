---
{
  "title": "0005 - Longest Palindromic substring",
  "lang": "zH",
  "description": "leetcode Longest Palindromic substring js answer",
  "meta": [{"name":"keywords", "content":"leetcode Longest Palindromic substring js answer, Longest Palindromic substring"}],
  "tags": ['leetcode']
}
---
# 5. Longest Palindromic substring

## 敘述
### 給定一個字串s，找到s中最長的回文子字串，另外可以假設s最大長度為1000
#### 運用技巧：字串、動態規劃
#### Palindromic意思為：左右對稱。依此題來說範例為：'abba','abcba'

## 預先知識
### 1. Array.fill
```javascript
// fill方法會將陣列中的索引的第一個到最後一個值的每個位置都填入一個靜態的值
const array1 = [1,2,3,4]

console.log(array1.fill(0, 2, 4)) // 從2開始填入[0]填到位置4
// [1, 2, 0, 0]

console.log(array1.fill(5,1)) // 從index = 1開始，填入[5]到結尾
// [1, 5, 5, 5]
```
### 2. DP（動態規劃）
#### [動態規劃 Dynamic programming](https://ithelp.ithome.com.tw/articles/10221370)
儲存 > 小問題 > 組合 > 大問題

## 解答
:::tip
1. 初始化長度為1的子串（非 DP 做處理）
2. 初始化長度為2的子串（非 DP 做處理）
3. 判斷長度為3——s.length的子串是否為迴文串（此處DP）
 （Note：2、3步都要更新ans.mi.mj）
:::
```javascript
function initArr(Len){//陣列初始化
  let arr=new Array(Len);
  for(let i=0;i<Len;i++){
      arr[i]=new Array(Len).fill(false,0,Len);
      arr[i][i]=true;//初始化長度為1的子串
  }
  return arr;
}
var longestPalindrome = function(s) {
  //init
  let Len=s.length;
  let arr=initArr(Len);
  let ans = 1, mi = 0, mj=0;
  // 針對字串長度為2（包含）以下的做處理
  for(let i = 0 ; i < Len-1 ; i++){
      if(s[i]==s[i+1]){
        arr[i][i+1] = true;
        ans = 2;
        mi = i;
        mj = i+1;
      }
  }
  //DP
  for(let len = 3 ; len <= Len ; len++){
      for(let i = 0 ; i < Len && (i+len-1) < Len ; i++){
            // 從頭慢慢掃
          let j = i + len - 1;
          if(arr[i+1][j-1] && (s[i]==s[j])){
              arr[i][j]=true;
              if(ans<len){
                  mi=i;
                  mj=j;
                  ans=j-i+1;
              }
           }
      }
  }
  return s.substring(mi,mj+1);
};
```

## 參考資料
[LeetCode—Longest Palindromic Substring —javascript實現](https://www.itread01.com/content/1544885770.html)
