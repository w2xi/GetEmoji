import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import BqbIndex from '../components/BqbIndex.vue'
import BqbDetail from '../components/BqbDetail.vue'
import BlogIndex from '../components/BlogIndex.vue'
import BlogDetail from '../components/BlogDetail.vue'
import BlogEdit from '../components/BlogEdit.vue'
import MyPage from '../components/MyPage.vue'
import Login from '../components/Login.vue'
import { getToken } from '../utils/auth'

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
    component: BqbDetail,
    meta: {
      showTabbar: false,
    },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogIndex,
  },
  {
		path: '/blog-detail/:id',
		component: BlogDetail,
    meta: {
      showTabbar: false,
    },
	},
	{
		path: '/blog-edit',
		component: BlogEdit,
    meta: {
      showTabbar: false,
    },
	},
  {
    path: '/my',
    component: MyPage,
  },
  {
    path: '/login',
    component: Login,
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

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()

  if ( token ){
    if ( to.path === '/login' ){
      next('/')
    }else {
      next()
    }
  }else {
    if ( whiteList.includes(to.path) ){
      next()
    }else {
      next('/login')
    }
  }
})

export default router