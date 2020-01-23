import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'


import index from '../views/index.vue'
import admin from '../views/admin.vue'
import user from '../views/user.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import join from '../views/join.vue'
import show from '../views/show.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }


    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        hideNav : true
      },
      component: login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        hideNav : true
      },
      component: register
    },
    {
      path: '/show/:id',
      props: true,
      name: 'show',
      component: show
    },
    {
      path: '/join',
      name: 'join',
      component: join
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
