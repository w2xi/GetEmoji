import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import BqbIndex from '../components/BqbIndex.vue'
import BqbDetail from '../components/BqbDetail.vue'
import BlogIndex from '../components/BlogIndex.vue'
import BlogDetail from '../components/BlogDetail.vue'
import BlogEdit from '../components/BlogEdit.vue'
import MyPage from '../components/MyPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/blog',
  },
  {
    path: '/bqb',
    name: 'Bqb',
    component: BqbIndex
  },
  {
    path: '/bqb-detail',
    name: 'BqbDetail',
    component: BqbDetail
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogIndex,
  },
  {
		path: '/blog-detail/:id',
		component: BlogDetail,
	},
	{
		path: '/blog-edit',
		component: BlogEdit,
	},
  {
    path: '/my',
    component: MyPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
  // Returning the savedPosition will result in a native-like behavior 
  // when navigating with back/forward buttons:
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router