<template>
  <div class="DisplayStyle">
    <div class="circle" id="Green"><router-link to="/Vue">Vue</router-link></div>
    <div class="circle" id="Blue"><router-link to="/CSS">CSS</router-link></div>
    <div class="circle" id="Black"><router-link to="/LeetCode">LeetCode</router-link></div>
    <div class="circle" id="Orange"><router-link to="/React">React</router-link></div>
    <div class="circle" id="Red"><router-link to="/NodeAndNpm">NPM</router-link></div>
    <div class="circle" id="Yellow"><router-link to="/Web">Web</router-link></div>
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

#Red {
  background-color: #FF5151;
}

#Yellow {
  background-color: #E1E100;
}
</style>
