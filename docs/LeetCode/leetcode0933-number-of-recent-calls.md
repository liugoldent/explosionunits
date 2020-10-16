---
{
  "title": "0933 - Number of Recent Calls",
  "lang": "zH",
  "description": "leetcode Number of Recent Calls js answer",
  "meta": [
            {"name":"keywords", "content":"leetcode Number of Recent Calls js answer,Number of Recent Calls"},
          ],
  "tags": ['leetcode']
}
---
# 933. Number of Recent Calls

## 需知
#### 1. 資料結構:佇列

## 敘述
給定一個t，求出在[t-3000, t]範圍內的length

## 範例
```
Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
```
## 解答
因為此題已經是完全對應好的,a~z to morse code,所以可以直接設定鍵值對,讓他去match
```javascript

class RecentCounter {
    constructor(){
        // 首先 new 一個Queue
        this.pings = new Queue()
    }
    ping(t){
        // 在這個pings中加入t
        this.pings.enqueue(t)
        
        // 當pings的第一個值 < t-3000，則去掉這個第一個值
        while(this.pings.front() < t-3000){
            this.pings.dequeue()
        }
        // 最後 return 這個pings的大小＝
        return this.pings.size()
    }
}
```
