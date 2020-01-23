import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'



Vue.use(VueRouter)
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false


import Index from './components/index.vue';
import Admin from './components/admin.vue';
import User from './components/user.vue';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Join from './components/join.vue';
import Show from './components/show.vue';




const router = new VueRouter({
	mode:"history",
	routes:[
		{
			name: "Index",
			path: "/",
			component: Index
		},
		{
			name: "Admin",
			path: "/admin",
			component: Admin
		},
		{
			name: "User",
			path: "/user",
			component: User
		},
		{
			name: "Login",
			path: "/login",
			meta:{
				hideNav : true
			},
			component: Login
		},
		{
			name: "Register",
			path: "/register",
			meta:{
				hideNav : true
			},
			component: Register
		},
		{
			name: "Join",
			path: "/join",
			component: Join
		},
		{
			name: "Show",
			path: "/show/:id",
			props: true,
			component: Show
		},
	]
})



new Vue({
	el: "#app",
  render: h => h(App),
  router
})
