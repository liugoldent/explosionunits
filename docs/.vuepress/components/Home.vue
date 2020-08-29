<template>
  <div class="DisplayStyle">
    <div class="circle" id="Green"><a href="https://explosionunis.netlify.app/Vue/">Vue</a></div>
    <div class="circle" id="Black"><a href="">LeetCode</a></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');
.DisplayStyle {
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: center;
}
a {
}
.circle{
  --font-size:200px;
}
.circle{
  margin:10px;
  text-align: center;
  font-size:30px;
  line-height: var(--font-size);
  width:var(--font-size);
  height:var(--font-size);
  border-radius: 999em;
  font-family: 'Montserrat', sans-serif;
}
#Green {
  background-color: aquamarine;
}
#Black {
  color: white;
  background-color: black;
}
</style>
