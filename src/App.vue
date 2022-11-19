<template>
  <div id="app">
    <router-view></router-view>
    <MainNavi />
  </div>
</template>

<script>
import MainNavi from "./components/MainNavi.vue";

export default {
  name: "App",
  components: {
    MainNavi,
  },
  // setup
};
</script>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

</style>
