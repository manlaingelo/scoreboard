<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 6rem 2rem 4.8rem 2rem;
  min-height: 80vh;
font-family: 'Roboto', sans-serif;
}
body {
  background: linear-gradient(
    130deg,
    rgba(39, 48, 57, 1) 0%,
    rgba(98, 114, 129, 1) 100%
  );
  font-family: 'Roboto', sans-serif;
}
/* button {
  width: 10vh;
  background: #d4d9e6;
  color: #000;
} */
button {
  margin: 10px 5px 5px 5px;
  border: none;
  outline: none;
  display: inline-block;
  background: #0d2669;
  border-radius: 5px;
  color: #d3d3d3;
}
button:hover {
  background-color: #2c3e50;
}
button:active {
  transform: translateY(4px);
}
hr {
  background: #2c3e50;
}
</style>
