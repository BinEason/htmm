import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import searchResult from '@/views/Search/searchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/userEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
    // component: Login

  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    // component: Layout,

    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        meta: {
          scorllT: 0
        }
        // component: Home

      },
      {
        path: 'user',
        component: () => import('@/views/User')
        // component: User

      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
    // component: Search

  },
  {
    path: '/search_result:keywords',
    component: () => import('@/views/Search/searchResult')
    // component: searchResult

  },
  {
    path: '/detail',
    component: () => import('@/views/ArticleDetail')
    // component: ArticleDetail

  },
  {
    path: '/useredit',
    component: () => import('@/views/User/userEdit')
    // component: UserEdit

  },
  {
    path: '/chat',
    component: () => import('@/views/Chat')

  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (getToken()?.length > 0 && to.path === '/login') {
    next('/layout/home')
  } else {
    next()
  }
})

export default router
