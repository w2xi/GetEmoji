<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <router-view></router-view>
  
  <van-tabbar route>
    <van-tabbar-item replace to="/bqb" icon="home-o">表情包</van-tabbar-item>
    <van-tabbar-item replace to="/blog" icon="search">斗图</van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style>
html, body, #app {
  height: 100%;
}
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
