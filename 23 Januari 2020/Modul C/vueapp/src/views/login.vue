<template>
	<form class="form" @submit.prevent="login">
		<div class="form-group">
			<h1 class="text-center">Login</h1>
		</div>
		<div class="form-group">
			<input type="text" v-model="user.username" placeholder="Username ... " class="form-control">
		</div>
		<div class="form-group">
			<input type="password" v-model="user.password" placeholder="password ... " class="form-control">
		</div>
		<div class="form-group">
			<button class="btn btn-success btn-block">Login</button>
		</div>
	</form>
</template>
<script>
	export default{
		data(){
			return{
				user: {}
			}
		},
		mounted(){
			this.$parent.onThisIsNotAuth()
			this.$parent.dismiss();
		},
		methods: {
			login(){
				// console.log(this.$router.push({name:'index'}))
				this.$axios.post('http://localhost:8000/login',this.user).then(res => {
					if(res.data.success){
						window.localStorage.setItem('api_token',res.data.data.api_token)
						window.localStorage.setItem('username',res.data.data.username)
						window.localStorage.setItem('role_id',res.data.data.role_id)
						this.$router.push({name: 'index'});
						window.location.reload();
					}else{
						this.$parent.setFail(res.data.message);
					}
				})
			}
		}
	}
</script>
<style type="text/css">
	
</style>