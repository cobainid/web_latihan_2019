<template>
  <div class="container">
    <div class="show__image">
    	<img :src="'http://localhost:8000/images/'+event.image_url" class="img-fluid img-thumbnail m-auto">
    	<h3 class="py-3">{{ event.name }}</h3>
    	<p class="show__info">
    		<i class="fa fa-calendar"></i> {{ event.date }} <br>
    		<i class="fa fa-map-marker"></i> {{ event.address }}
    	</p>
    	<p class="show__desc">
    		{{ event.description }}
    	</p>
    	<hr>
    	<button v-if="isAuth" class="btn btn-primary" @click="join">Join</button>
    	<hr>
    	<table class="table table-borderless table-hover">
    		<thead>
    			<tr>
    				<th>Username</th>
    				<th>Tanggal bergabung</th>
    			</tr>
    		</thead>
    		<tbody>
    			<tr v-for="mem in member" :key="mem.id">
    				<td>{{ mem.username }}</td>
    				<td>{{ mem.created_at }}</td>
    			</tr>
    		</tbody>
    	</table>
    </div>
  </div>
</template>

<style scoped>
	.show__image {

	}
	h3{
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}
	.show__info{
		color: #ddd;
		font-size: 10px;
	}
	.show__desc{
		color: #aaa;
		font-size: 12px;
	}
</style>

<script>
export default {
  data(){
    return {
    	event : {},
    	member: [],
    	isAuth: false
    }
  },
  mounted(){
  	if(window.localStorage.getItem('api_token') != null){
  		this.isAuth = true
  	}
  	
  	// console.log(window.localStorage.getItem('api_token'))
  	this.$parent.failMessage = false;
  	this.$parent.successMessage = false;
  	this.$parent.message = "";
  	this.$axios.get('http://localhost:8000/event/'+this.$route.params.id).then (res =>{
  		this.event = res.data.data
  	}) 
  	this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then (res =>{
  		this.member = res.data.data
  		// console.log(this.member)
  	}) 
  },
  methods: {
  	join(){
  		this.$axios.post('http://localhost:8000/event/join/'+this.$route.params.id,{
  			api_token: window.localStorage.getItem('api_token')
  		}).then(res => {
  			if(res.data.success){
			  	this.$parent.failMessage = false;
			  	this.$parent.successMessage = true;
			  	this.$parent.message = res.data.message;

			  }else{

			  	this.$parent.failMessage = true;
			  	this.$parent.successMessage = false;
			  	this.$parent.message = res.data.message;
			  }
		  	this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then (res2 =>{
		  		this.member = res2.data.data
		  	}) 
  		})
  	}
  }
}
</script>