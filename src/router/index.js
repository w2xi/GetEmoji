import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'
import Blog from '../components/Blog.vue'
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
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
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
})

export default router