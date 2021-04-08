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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 80px; */
  margin: 6rem 2rem 4.8rem 2rem;
}
body {
  background: rgb(39, 48, 57);
  background: linear-gradient(
    130deg,
    rgba(39, 48, 57, 1) 0%,
    rgba(98, 114, 129, 1) 100%
  );
}
button {
  margin: 10px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  width: 10vh;
  background: #d4d9e6;
  border: none;
  outline: none;
  color: #000;
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
