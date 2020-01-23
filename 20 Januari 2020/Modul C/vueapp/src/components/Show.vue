<template>
  <div class="container">
  		<img :src="'http://localhost:8000/images/'+event.image_url" class="img-fluid">
  		<h3 class="py-2">{{ event.name }}</h3>
  		<p style="font-size: 10px;color: #ccc;">
  			<i class="fa fa-map-marker"></i> {{ event.address }} <br>
  			<i class="fa fa-calendar"></i> {{ event.date }}
  		</p>
  		<p class="show__desc" v-if="isAuth">
  			{{ event.description }}
  		</p>
  		<button class="btn btn-primary my-4" @click.prevent="join" >Join</button>
  		<table v-if="!this.isZeroMem"  class="table table-bordered">
  			<tr>
  				<th>List Member</th>
  			</tr>
  			<tr v-for="mem in members" :key="mem.id">
  				<td>{{ mem }}</td>
  			</tr>
  		</table>
  		<table v-if="this.isZeroMem" class="table table-bordered">
  			<tr>
  				<th>List Member</th>
  			</tr>
  			<tr>
  				<td>{{ message }}</td>
  			</tr>
  		</table>
  </div>
</template>

<script>
export default {
	data(){
		return {
			event: {},
			members: [],
			isZeroMem: false,
			message: "",
			isAuth: false,
		}
	},
	mounted(){
		if(window.localStorage.getItem('api_token') != null){
			this.isAuth = true;
		}
		this.$axios.get('http://localhost:8000/event/'+this.$route.params.id).then(
			res => {
				// console.log(res.data);
				this.event = res.data.data;
			})
		this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then(
			res => {
				console.log(res.data);
				if(res.data.success){
					this.members = res.data.data;
				}else{
					this.isZeroMem = true;
					this.message = res.dat.message;
				}
			})
	},
	methods: {
		join(){
			console.log(window.localStorage.getItem('api_token'))
			this.$axios.post('http://localhost:8000/event/join/'+this.$route.params.id,{
				'api_token': window.localStorage.getItem('api_token')
			}).then(
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
					this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then(
						res => {
							console.log(res.data);
							if(res.data.success){
								this.members = res.data.data;
							}else{
								this.isZeroMem = true;
								this.message = res.dat.message;
							}
						})
				})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.show__desc {
		color: #aaa;
		font-size: 12px;
	}
</style>
