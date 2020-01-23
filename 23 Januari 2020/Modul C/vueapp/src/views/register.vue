<template>
	<form class="form" @submit.prevent="register">
		<div class="form-group">
			<h1 class="text-center">Register</h1>
		</div>
		<div class="form-group">
			<input type="text" v-model="user.username" placeholder="Username ... " class="form-control">
		</div>
		<div class="form-group">
			<input type="password" v-model="user.password" placeholder="password ... " class="form-control">
		</div>
		<div class="form-group">
			<input type="checkbox" v-model="user.role_id" > Apakah anda admin ??
		</div>
		<div class="form-group">
			<button class="btn btn-primary btn-block">Register</button>
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
			register(){
				if(this.user.role_id){
					this.user.role_id =1;
				}else{
					this.user.role_id =2;
				}
				// console.log(this.$router.push({name:'index'}))
				this.$axios.post('http://localhost:8000/register',this.user).then(res => {
					if(res.data.success){
						this.$parent.setSuccess(res.data.message)
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