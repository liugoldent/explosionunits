---
{
  "title": "Graph 圖",
  "lang": "zH",
  "description": "在這章主要會講圖的基本理論以及DFS、BFS",
  "meta": [{"name":"keywords", "content":"圖,graph,DFS,BFS,DataStructure,JavaScript DataStructure"}],
  "tags": ['資料結構']
}
---
# Graph 圖
## 介紹
### 基本元素
* 點（Vertex）
* 邊（edge）
* 圖：點＋邊的集合
![點、邊、圖](https://i.imgur.com/Tair5d3.jpeg)
* 有向邊：邊是有方向的
* 無向邊
* 有向圖：圖裡面的邊都有向
* 無向圖：圖裡面的邊都沒有向
![有向邊、無向邊、有向圖、無向圖](https://i.imgur.com/xAEQfts.jpeg)
* 重邊：有兩條邊都的位置都是v1 to v2
* 自環：自己開始自己結束
![重邊、自環](https://i.imgur.com/jYhSLvH.jpeg)
* 度
![度](https://i.imgur.com/ZXTccZ8.jpeg)
* 路徑
![路徑](https://i.imgur.com/9DQ4SLg.jpeg)
* 環
![環](https://i.imgur.com/TqCKmzD.jpeg)
## 如何存圖
### 0. Linked-List
#### 將一個 vertex視為一個node，並用指標紀錄和該點相鄰的點
但實作不方便
### 0. 無向邊的想法
可以想成兩條相反的有向邊
### 比較
#### 相鄰矩陣
* 空間複雜度：O(V^2)
* 查詢兩個點之間是否有邊：O(1)
* 遍歷一個點v周圍的邊：O(V)
![無向的相鄰矩陣](https://i.imgur.com/DCJWkEe.jpeg)
![有向的相鄰矩陣](https://i.imgur.com/SOzcdPM.jpeg)
![有向加上權重](https://i.imgur.com/Sq4nFq4.jpeg)
#### 相鄰串列
* 空間複雜度：O(E)。（E：邊）
* 查詢兩個點之間是否有邊：O(degree(V))
* 遍歷一個點v周圍的邊：O(degree(V))
![無向圖](https://i.imgur.com/1xZb5ed.jpeg)
![有向圖](https://i.imgur.com/cUD5Ksg.jpeg)
![有向圖與權重](https://i.imgur.com/n1dUlW3.jpeg)


## DFS、BFS
* DFS、BFS注意事項
1. 要記錄一個點是否被拜訪過，以免重複拜訪
2. 走訪前記得判斷是否拜訪過
3. 走訪後記得將該點設定為已經拜訪過
## 連通塊數量
### 連通圖
![連通圖](https://i.imgur.com/TKUXDZ0.jpeg)
### 如何判斷多少個連通塊
![判斷聯通塊](https://i.imgur.com/oz4xpJy.jpeg)
## 二分圖判定
1. 隨便找一個點，塗上黑or白
2. 從這一點DFS、BFS，並將相鄰的點圖上相異的顏色
3. 如果塗色過程中發生矛盾，則不是二分圖、
#### 32:30 左右的影片

## 結語
* 很多看起來跟圖論沒關係的問題，可以轉成圖論來解
* 很多圖上的問題可以靠DFS or BFS 做出來

## 參考 
[圖論](https://www.youtube.com/watch?v=f_w4tD-qa2c)
