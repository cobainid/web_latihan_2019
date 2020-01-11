import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Axios from 'axios'


Vue.prototype.$axios = Axios
Vue.use(VueRouter)
Vue.config.productionTip = false


import Index from './components/Index.vue'
import Show from './components/Show.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Admin from './components/Admin.vue'
import User from './components/User.vue'
import Join from './components/Join.vue'




const router = new VueRouter({
	mode: 'history',
	routes:[
		{
			name: 'Index',
			path: '/',
			component: Index
		},
		{
			name: 'Show',
			path: '/show/:id',
			propd: true,
			meta: {
				hideSearch: true
			},
			component: Show
		},
		{
			name: 'Login',
			path: '/login',
			meta:{
				hideNav: true
			},
			component: Login
		},
		{
			name: 'Register',
			path: '/register',
			meta: {
				hideNav: true
			},
			component: Register
		},
		{
			name: 'Admin',
			path: '/admin',
			component: Admin
		},
		{
			name: 'User',
			path: '/user',
			component: User
		},
		{
			name: 'Join',
			path: '/join',
			component: Join
		},
	]
});






new Vue({
	el:'#app',
	router,
  render: h => h(App)
})
