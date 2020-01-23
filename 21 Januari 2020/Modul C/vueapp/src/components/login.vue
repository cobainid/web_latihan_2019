<template>
  <form class="form" @submit.prevent="login">
  		<h2 class="py-3">Login</h2>
    	<div class="form-group">
    		<input type="text" v-model="user.username" class="form-control" placeholder="Username ...">
    	</div>
    	<div class="form-group">
    		<input type="password" v-model="user.password" class="form-control"  placeholder="Password ...">
    	</div>
    	<div class="form-group">
    		<button class="btn btn-primary btn-block">Submit</button>
    	</div>
  </form>
</template>

<script>
export default {
  data(){
    return {
    	user: {},
    }
  },
  methods: {
  	login(){
  		this.$axios.post('http://localhost:8000/login',this.user).then(
  			res => {
  				if(res.data.success){
  					window.localStorage.setItem('api_token',res.data.data.api_token);
  					window.localStorage.setItem('role_id',res.data.data.role_id);
  					window.localStorage.setItem('username',res.data.data.username);
  					this.$router.push({name: 'admin'});
  					window.location.reload();
  				}else {
  					this.$parent.failMessage = true;
  					this.$parent.successMessage = false;
  					this.$parent.message = res.data.message;
  				}
  			})
  	}
  },
  mounted(){
    if(window.localStorage.getItem('api_token') != null){
      if(window.localStorage.getItem('role_id') == 1){
        this.$router.push({name:'admin'})
      }else if(window.localStorage.getItem('role_id') == 2){
        this.$router.push({name:'user'})
      }
    }
  	this.$parent.failMessage = false;
  	this.$parent.successMessage = false;
  	this.$parent.message = "";

  }
}
</script>