<template>
	<form @submit.prevent="login" class="form">
		<h3 class="py-3 text-center">Login</h3>
	  <div class="form-group">
	  	<input type="text" v-model="username" class="form-control" placeholder="username ... ">
	  </div>
	  <div class="form-group">
	  	<input type="password" v-model="password" placeholder="****" class="form-control">
	  </div>
	  <div class="form-group">
	  	<button class="btn btn-primary btn-block">Login</button>
	  </div>
	</form>
</template>

<script>
export default {
	data(){
		return {
			username: "",
			password: ""
		}
	},
	mounted(){
		if(window.localStorage.getItem('role_id') != null){
			if(window.localStorage.getItem('role_id') == 1){
				this.$router.push({name:'Admin'})
			}else if(window.localStorage.getItem('role_id') == 2){
				this.$router.push({name:'User'})
			}
		}
		this.$parent.message = "";
		this.$parent.failMessage = false;
		this.$parent.successMessage = false;
	},
	methods: {
		login(){
			let data = {
				username: this.username,
				password: this.password
			}
			this.$axios.post("http://localhost:8000/login",data).then(
				res => {
					if(res.data.success){
						// console.log(res.data);
						window.localStorage.setItem('api_token',res.data.data.api_token);
						window.localStorage.setItem('username',res.data.data.username);
						window.localStorage.setItem('role_id',res.data.data.role_id);
						this.$router.push({name:'Admin'});
						window.location.reload();
					}else{
						this.$parent.message = res.data.message;
						this.$parent.failMessage = true;
						this.$parent.successMessage = false;
					}
				})
		}
	}
}
</script>
