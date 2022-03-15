<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router' 

const router = useRouter()
const route = useRoute()

const activeRoute = ref(route.path)

// 监听路由的变化
watch(() => route.path, (val) => {
  activeRoute.value = val
})

const onChange = (val) => {
  router.push(val)
}

const showTabbar = computed(() => {
  return route.meta.showTabbar !== false  
})

</script>

<template>
  <router-view />
  
  <van-tabbar 
    v-show="showTabbar"
    class="footer-nav" 
    v-model="activeRoute" 
    @change="onChange" 
    route
  >
    <van-tabbar-item name="/bqb" to="/bqb" icon="fire-o">表情包</van-tabbar-item>
    <van-tabbar-item name="/blog" to="/blog" icon="guide-o">斗图</van-tabbar-item>
    <van-tabbar-item name="/my" to="/my" icon="user-o">我的</van-tabbar-item>
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

.footer-nav {
  margin-top: 70px;
}
</style>
