<template>
  <div class="DisplayStyle">
    <div class="circle" id="Green"><a href="https://explosionunis.netlify.app/Vue/">Vue</a></div>
    <div class="circle" id="Blue"><a href="https://explosionunis.netlify.app/CSS/">CSS</a></div>
    <div class="circle" id="Black"><a href="https://explosionunis.netlify.app/LeetCode/">LeetCode</a></div>
    <div class="circle" id="Orange"><a href="https://explosionunis.netlify.app/LeetCode/">React</a></div>
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
  color: white;
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
  background-color: lightgreen;
}
#Black {
  background-color: black;
}

#Blue {
  background-color: cornflowerblue;
}

#Orange {
  background-color: #DAA588;
}
</style>
