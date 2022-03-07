import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router