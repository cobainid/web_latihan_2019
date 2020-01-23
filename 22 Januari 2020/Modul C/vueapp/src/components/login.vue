<template>
	<form class="form" @submit.prevent="login">
		<div class="form-group">
			<h1 class="text-center py-3">LOGIN</h1>
		</div>
		<div class="form-group">
			<input type="text" v-model="user.username" placeholder="Username .... " class="form-control">
		</div>
		<div class="form-group">
			<input type="password" v-model="user.password" placeholder="Password .... " class="form-control">
		</div>
		<div class="form-group">
			<button class="btn btn-success btn-block">LOGIN</button>
		</div>
	</form>
</template>
<script>
	export default{
		data(){
			return {
				user: {}
			}
		},mounted () {

			if(window.localStorage.getItem('role_id') == 1){
				this.$router.push({name:'admin'})
			}else if(window.localStorage.getItem('role_id') == 2){
				this.$router.push({name:'user'})
			}

			this.$parent.failMessage = false;
			this.$parent.successMessage = false;
			this.$parent.message = "";
		},
		methods:{
			login(){
				this.$axios.post("http://localhost:8000/login",this.user).then ( res => {
					if(res.data.success){
						window.localStorage.setItem('api_token',res.data.data.api_token)
						window.localStorage.setItem('role_id',res.data.data.role_id)
						window.localStorage.setItem('username',res.data.data.username)

						// console.log(res.data)
						this.$router.push({name:'index'})
						window.location.reload();

					}else {
					this.$parent.failMessage = true;
					this.$parent.successMessage = false;
					this.$parent.message = res.data.message;
					}
				})
			}
		}
	}
</script>
<style>
	
</style>	