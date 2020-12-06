<template>
  <div class="DisplayStyle">
    <div class="imgcontent">
      <p>Report</p>
      <img src="https://picsum.photos/500/500?random=10">
    </div>

    <div class="routerContent">
      <router-link to="/demon">
        <div class="routerinner">
          <p>Demon</p>
          <img src="https://picsum.photos/500/500?random=1">
        </div>
      </router-link>
    </div>

    <div class="routerContent">
      <router-link to="/guide">
        <div class="routerinner">
          <p>guide</p>
          <img src="https://picsum.photos/500/500?random=1">
        </div>
      </router-link>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  mounted(){
    this.list = [
      ['/JavaScript', 'JavaScript'],
      ['/Vue2', 'Vue2'],
      ['/React', 'React'],
      ['/CSS', 'CSS'],
      ['/DataStructure', 'DataStructure'],
      ['/LeetCode', 'LeetCode'],
      ['/NodeAndNpm', 'NodeAndNpm'],
      ['/Web', 'Web'],
      ['/D3', 'D3'],
      ['/DesignPattern', 'DesignPattern'],
      ['/TypeScript', 'TypeScript'],
      ['/Vue3', 'Vue3'],
    ]
  },
  methods:{
    /**
     * @description 動態產生網址
     */
    srcFunc(idx){
      try{
        return 'https://picsum.photos/300/300?random='+idx.toString()
      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>

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
