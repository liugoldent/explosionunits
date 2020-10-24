<template>
  <div class="DisplayStyle">
      <div class="imgcontent">
        <p>Units</p>
        <img src="/blogimg/home.jpg">
      </div>

      <div class="routerContent">
        <router-link to="/JavaScript">
          <div class="routerinner">
            <p>JavaScript</p>
            <img src="https://picsum.photos/300/300?random=9">
          </div>
        </router-link>

        <router-link to="/Vue">
        <div class="routerinner">
          <p>Vue</p>
          <img src="https://picsum.photos/300/300?random=1">
        </div>
        </router-link>

        <router-link to="/React">
        <div class="routerinner">
          <p>React</p>
          <img src="https://picsum.photos/300/300?random=2">
        </div>
        </router-link>


        <router-link to="/CSS">
          <div class="routerinner">
          <p>CSS</p>
          <img src="https://picsum.photos/300/300?random=3">
        </div>
        </router-link>


        <router-link to="/DataStructure">
          <div class="routerinner">
          <p>DS</p>
          <img src="https://picsum.photos/300/300?random=4">
        </div>
        </router-link>


        <router-link to="/LeetCode">
          <div class="routerinner">
            <p>LeetCode</p>
            <img src="https://picsum.photos/300/300?random=5">
          </div>
        </router-link>


        <router-link to="/NodeAndNpm">
          <div class="routerinner">
            <p>NPM</p>
            <img src="https://picsum.photos/300/300?random=6">
          </div>
        </router-link>

        <router-link to="/Web">
          <div class="routerinner">
            <p>Web</p>
            <img src="https://picsum.photos/300/300?random=7">
          </div>
        </router-link>

        <router-link to="/D3">
          <div class="routerinner">
            <p>D3</p>
            <img src="https://picsum.photos/300/300?random=8">
          </div>
        </router-link>

        <router-link to="/DesignPattern">
          <div class="routerinner">
            <p>Pattern</p>
            <img src="https://picsum.photos/300/300?random=9">
          </div>
        </router-link>
      </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
.DisplayStyle {
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: center;
}

.imgcontent {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pacifico', cursive;
}
.imgcontent > p {
  position: absolute;
  z-index:1;
  font-size:200px;
  color:white;
  text-shadow: 0.1em 0.1em 0.05em black;
}
.imgcontent > img {
  box-shadow:0 0 20px 10px ;
  transform:scale(.85);
}

.routerContent {
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.routerinner {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.routerinner > p {
  position: absolute;
  z-index:1;
  font-family: 'Permanent Marker', cursive;
  font-size:50px;
  color:white;
  text-shadow: 0.1em 0.1em 0.05em black;
  -webkit-text-stroke: 1px black;
}

.routerinner > img {
  filter: contrast(20%) ;
}

</style>
