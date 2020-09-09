# 輸入網址列到渲染畫面，中間經歷了什麼事

## 瀏覽器的操作
### 架構
瀏覽器是以多程序的架構（意即一個以上的process）來完成任務，並且process也可以將工作區分給其下的執行緒協助運作
### 瀏覽器內的process
* browser process：
    * 瀏覽器功能：網址列、書籤、請求
* render process：
    * 網頁顯示
    * 負責解析HTML字串，並產生DOM Tree
* plugin process：
    * 控制網頁用的plugin
* GPU process：
    * 3D圖形智繪
eg：使用者在browser process輸入完網址後，在render process渲染畫面
    
## 域名的運作
### 域名（Domain Name）
eg: http://www.google.com
1. http: http/https通訊協定類型
    * http：超本文傳輸協議，用於普通瀏覽
    * https：安全超本文傳輸協議，HTTP的安全版本（加了這個，會連GET/POST什麼內容都不知道）
    * SSH：加密安全登陸用
2. www: host
3. root: 每個域名都會有
4. TLD: com/org/gov/edu
5. SLD
6. 伺服器位址：google，如果是域名就需要給DNS作解析

### DNS 解析
域名主要是給人看的，而HTTP是依賴在TCP/IP上，所以電腦還是要知道IP才可以進行通訊，關於這點也可以做優化
1. DNS快取
2. DNS負載平衡

### 要求的當下發生什麼事？
1. 瀏覽器會去向DNS Server請求
2. DNS Server(查詢伺服器)向Name Server(管理網址伺服器)請求
3. Name Server 返回訊息給DNS Server
4. DNS Server回傳給瀏覽器
5. 瀏覽器導頁

## 網路請求
:::
TCP/IP 是網路上一種通訊協定，用於在不同的設備或環境間傳送訊息。另外HTTPS是使用SSL加密後再利用TCP發送，加強安全性
:::
### 三次握手、四次揮手
#### Client端（三次握手）
1. 你在嗎？
2. 我要準備傳資料囉！
3. GET/POST
    * GET：將瀏覽器的headers & data 同時送出，因此只會產生一個TCP封包，最後sercer回應200 & data
    * POST：瀏覽器先將headers送出，等到伺服器回應100 continue後，再傳送data，因此會產生2個TCP封包，最後依樣回應200 & data
#### Server端（四次揮手）
1. 接收資料完了，申請關閉
2. 申請通過，準備關
3. 跟Client說我要關了，本身進入關閉
4. 收到關閉通知，自己也關閉

### 伺服器請求並返回HTTP回應
* Request URL：請求位置
* Request Method：GET / POST / DELETE / PUT / HEAD
* Status Code：狀態碼
* Remote Address：請求遠端伺服器地址，會轉為IP

### 狀態碼
* 1xx：100（繼續）、101（切換通訊協定）
* 2xx：成功。eg：200
* 3xx：重新導向。eg：301（永久導向）、302（暫時導向）、304（未修改）
* 4xx：用戶端錯誤。eg：401（拒絕存取）、403（禁止使用）、404（找不到）
* 5xx：伺服器錯誤。eg：500

## 瀏覽器與網頁原理
### 瀏覽器的渲染機制
* HTML 解析完變成DOM Tree
* CSS 解析完會變CSSOM Tree
* 以上兩者結束會開始計算樣式該如何去套用在HTML上，並產生Render Tree
* 版面Layouts 決定出每個元素在頁面上的位置
* 最後經過Paint 將計算結果轉為實際的像素，繪製在畫面上

### 阻礙渲染
* 當HTML遇到`<script>`標籤，會阻礙HTML解析。並立刻執行JS的下載與解析與執行
* 樣式盡量放在`<head>`執行，或使用Media Query避免非必要的檔案下載
* 不要使用CSS `@import`（而要用`<link>`）引入
* `<script>`要放在`<body>`結束之前

## 參考網址
[[熱門面試題] 從輸入網址列到渲染畫面，過程經歷了什麼事？](https://w3c.hexschool.com/blog/8d691e4f)
[在瀏覽器輸入網址並送出後，到底發生了什麼事？](https://cythilya.github.io/2018/11/26/what-happens-when-you-type-an-url-in-the-browser-and-press-enter/#%E4%B8%80%E7%80%8F%E8%A6%BD%E5%99%A8%E7%9A%84%E5%85%A7%E9%83%A8%E9%81%8B%E4%BD%9C%E6%A9%9F%E5%88%B6)
