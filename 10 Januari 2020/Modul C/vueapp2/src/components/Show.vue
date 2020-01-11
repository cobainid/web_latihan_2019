<template>
	<div class="container">
		<div class="p-3"></div>
		<img :src="'http://localhost:8000/images/'+events.image_url" class="img-fluid">
		<h3 class="py-1">{{ events.name }}</h3>
		<p class="py-1 info">
			Created at : {{events.date}} <br>
			Address : {{events.address}} 
		</p>
		<p class="desc">
			{{ events.description }}
		</p>
		<p class="my-2">
			<span class="btn btn-primary my-2" @click="join" v-if="isUser">
				Join
			</span>
		</p>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				events: [],
				isUser: false
			}
		},
		mounted() {
			console.log('http://localhost:8000/event/'+this.$route.params.id);
			this.$axios.get('http://localhost:8000/event/'+this.$route.params.id)
			.then( res => {
				this.events = res.data.data;
			})
			this.isUser = this.$parent.isUser;
		},
		methods: {
			join(){
				let formData = new FormData();
				formData.append('api_token',window.localStorage.getItem('token'))

				this.$axios.post('http://localhost:8000/event/join/'+this.$route.params.id,formData).then(
					res => {
						if(res.data.success){
							this.$parent.isFail = false;
							this.$parent.isSuccess = true;
							this.$parent.message = res.data.message;
						}else{
							this.$parent.isSuccess = false;
							this.$parent.isFail = true;
							this.$parent.message = res.data.message;
						}
					});
			}
		}
	}
</script>