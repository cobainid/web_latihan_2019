import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import VueRouter from 'vue-router'






Vue.prototype.$axios = Axios;
Vue.use(VueRouter);
Vue.config.productionTip = false



// import Index from './components/index.vue'
import Admin from './components/Admin.vue'
import User from './components/User.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Join from './components/Join.vue'
import Show from './components/Show.vue'
import Index from './components/Index.vue'



const router = new VueRouter({
	mode: "history",
	routes: [
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
			meta: {
				hideNav : true
			},
			component: Login
		},
		{
			name: "Register",
			path: "/register",
			meta: {
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
			path: "/:id",
			props: true,
			component: Show
		},
	]
})









new Vue({
	el: '#app',
  	render: h => h(App),
  	router
})
