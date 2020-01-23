<template>
	<form @submit.prevent="login" class="form">
		<h3 class="py-3 text-center">Register</h3>
	  <div class="form-group">
	  	<input type="text" v-model="username" class="form-control" placeholder="username ... ">
	  </div>
	  <div class="form-group">
	  	<input type="password" v-model="password" placeholder="****" class="form-control">
	  </div>
	  <div class="form-group">
	  	<input type="checkbox" v-model="role_id"> Apakah anda admin ?
	  </div>
	  <div class="form-group">
	  	<button class="btn btn-primary btn-block">Register</button>
	  </div>
	</form>
</template>

<script>
export default {
	data(){
		return {
			username: "",
			password: "",
			role_id: false
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
			if(this.role_id){
				this.role_id = 1;
			}else{
				this.role_id =2;
			}
			let data = {
				username: this.username,
				password: this.password,
				role_id: this.role_id
			}
			this.$axios.post("http://localhost:8000/register",data).then(
				res => {
					if(res.data.success){
						this.$parent.message = res.data.message;
						this.$parent.failMessage = false;
						this.$parent.successMessage = true;
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
