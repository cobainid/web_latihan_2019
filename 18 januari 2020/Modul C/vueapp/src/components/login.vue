<template>
    <form class="auth text-center m-auto" @submit.prevent="login">
      <h1>Login</h1>
      <div class="form-group">
        <input type="text" v-model="user.username" class="form-control" placeholder=" username ..">
      </div>
      <div class="form-group">
        <input type="password" v-model="user.password" class="form-control"  placeholder=" password ..">
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
			user : []
		} 
	},
	mounted(){

    if(window.localStorage.getItem('api_token') != null && window.localStorage.getItem('username') != null && window.localStorage.getItem('role_id') != null){
      if(window.localStorage.getItem('role_id') == 1){
        this.$router.push({name:'Admin'});
      }else if(window.localStorage.getItem('role_id') == 2){
        this.$router.push({name:'User'});
      }
    }
	},
	methods: {
		login(){
			// console.log(this.user);
			this.$axios.post("http://localhost:8000/login",{
				username: this.user.username,
				password: this.user.password,
			}).then(
				res => {
					if(res.data.success){
						window.localStorage.setItem('api_token',res.data.data.api_token);
						window.localStorage.setItem('username',res.data.data.username);
						window.localStorage.setItem('role_id',res.data.data.role_id);

						if(res.data.data.role_id == 1){
							this.$router.push({name:"Admin"})
						}
						if(res.data.data.role_id == 2){
							this.$router.push({name:"User"})
						}
						window.location.reload();
					}else {
						this.$parent.message = res.data.message;
						this.$parent.failMessage = true;
						this.$parent.successMessage = false;
					}
				})
		}
	}
}
</script>
<style>
	.background {
		background-color: #A3A3FA;
		min-height: 100vh;
		display: table;
		width: 100%;
	}
	.zi-1 {
		position: relative;
		z-index: 1;
	}

	form.auth {
		width: 50%;
		background-color: #fff;
		padding: 30px 40px;
	}

	.background::after {
		content: "";
		width: 100%;
		height: 50vh;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #A3FaA3;
	}
</style>