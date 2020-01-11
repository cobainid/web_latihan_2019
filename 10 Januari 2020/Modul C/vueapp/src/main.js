import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import Axios from 'axios'

import Index from './components/Index.vue'
import Show from './components/Show.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Admin from './components/Admin.vue'
import User from './components/User.vue'
import vuetify from './plugins/vuetify';
// import Admin from './components/Admin.vue'


Vue.use(VueRouter)

Vue.prototype.$axios = Axios;

Vue.config.productionTip = false


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
			component: Show
		},
		{
			name: 'Login',
			path: '/login',
			component: Login
		},
		{
			name: 'Register',
			path: '/register',
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
	]
});








new Vue({
    render: h => h(App),
    el: '#app',
    vuetify,
    router
})