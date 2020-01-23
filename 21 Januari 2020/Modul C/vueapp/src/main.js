import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'


Vue.prototype.$axios = Axios;
Vue.use(VueRouter);
Vue.config.productionTip = false


import index from './components/index.vue'
import admin from './components/admin.vue'
import user from './components/user.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import join from './components/join.vue'
import show from './components/show.vue'



const router = new VueRouter({
	mode: "history",
	routes: [
		{
			name: "index",
			path: '/',
			component: index
		},
		{
			name: "admin",
			path: '/admin',
			component: admin
		},
		{
			name: "user",
			path: '/user',
			component: user
		},
		{
			name: "login",
			path: '/login',
			meta: {
				hideNav: true
			},
			component: login
		},
		{
			name: "register",
			path: '/register',
			meta: {
				hideNav: true
			},
			component: register
		},
		{
			name: "join",
			path: '/join',
			component: join
		},
		{
			name: "show",
			path: '/show/:id',
			props:  true,
			component: show
		},
	]
})





new Vue({
	el: '#app',
	router,
  render: h => h(App),
})
