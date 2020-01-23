<template>
  <form class="form" @submit.prevent="Register">
  		<h2 class="py-3">Register</h2>
    	<div class="form-group">
    		<input type="text" v-model="user.username" class="form-control" placeholder="Username ...">
    	</div>
    	<div class="form-group">
    		<input type="password" v-model="user.password" class="form-control"  placeholder="Password ...">
    	</div>
    	<div class="form-group">
    		<input type="checkbox" v-model="user.role_id" > Apakah anda admin ?
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
  	Register(){
  		if(this.user.role_id){
  			this.user.role_id = 1;
  		}else{
  			this.user.role_id = 2;
  		}
  		this.$axios.post('http://localhost:8000/register',this.user).then(
  			res => {
  				if(res.data.success){
  					this.$parent.failMessage = false;
  					this.$parent.successMessage = true;
  					this.$parent.message = res.data.message;
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