<template>
  <div class="content">
    <h1>Hi</h1>
    <div class="girdContent">
      <div class="girdA">
        <img src="https://picsum.photos/300/300?random=1">
      </div>

      <div class="girdB">
        <img src="https://picsum.photos/300/300?random=1">
      </div>

      <div class="girdC">
        <img src="https://picsum.photos/300/300?random=1">
      </div>
    </div>

    <div class="flexcontent">
      <div class="">
        <img src="https://picsum.photos/300/300?random=1">
      </div>

      <div class="">
        <img src="https://picsum.photos/300/300?random=1">
      </div>

      <div class="">
        <img src="https://picsum.photos/300/300?random=1">
      </div>
    </div>
  </div>
</template>

<style scoped>
.girdContent {
  display: grid;
  width:900px;
  height:300px;
  grid-template-rows: 150px 150px ;
  grid-template-columns: 300px 300px 300px ;
}

.girdA {
  grid-area: A1;
}

.girdB {
  grid-area: B1;
}

.girdC {
  grid-area: C1;
}

.flexcontent {
  display: flex;
  flex-direction: column;
  margin-top :50px;
}

.flexcontent > div{
  margin: 10px;
}
</style>
