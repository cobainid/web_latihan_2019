<template>
	<div class="py-4">
		<img :src="
			'http://localhost:8000/images/'+event.image_url
		" class="img-fluid img-thumbnail m-auto">
		<div class="py-3">
			<h2>{{ event.name }}</h2>
			<div class="flex show__info">
				<p>{{ event.date }}</p>
				<p>{{ event.address }}</p>
			</div>
			<hr>
			<p class="show__desc pb-3">
				{{event.description}}
			</p>
			<hr>
			<button class="btn btn-primary my-3" @click="join" v-if="isAuth">Join</button>
			<table class="table table-hovered table-borderless table-stripped">
				<thead>
					<th>Username</th>
				</thead>
				<tbody>
					<tr v-for="mem in member" :key="mem">
						<td>{{ mem }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				event : {},
				member : [],
				isAuth: false
			}
		},
		mounted(){
			if(window.localStorage.getItem('api_token') != null){
				this.isAuth = true;
			}
			this.$axios.get('http://localhost:8000/event/'+this.$route.params.id).then( res => {
				this.event = res.data.data;
				this.member =  res.data.members;
				// console.log(res.data);
			})
		},
		methods: {
			join(){
				this.$axios.post('http://localhost:8000/event/join/'+this.$route.params.id+"?api_token="+window.localStorage.getItem('api_token')).then( res => {
					if(res.data.success){
						this.$parent.setSuccess(res.data.message)
						this.member = res.data.member
					}else{
						this.$parent.setFail(res.data.message)
					}
				})	
			}
		}
	}
</script>
<style type="text/css">
	.show__info {
		font-size: 10px;
		color: #aaa;
	}
	.show__info p {
		display: inline-block;
		padding: 10px 20px 0 0;
	}
	 hr {
		margin: 5px 0;
	}
</style>