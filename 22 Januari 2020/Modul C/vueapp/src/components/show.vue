<template>
	<div class="container">
		<img :src="'http://localhost:8000/images/'+ev.image_url" class="event__image__show img-fluid img-thumbnail">
		
		<h2 class="py-2">{{ ev.name }}</h2>
		<p>
			{{ ev.description }}
		</p>
		<div  v-if="isAuth">
			<hr>
			<span class="btn btn-primary" @click="join"> Join Event</span>
		</div>
		<hr>
		<table class="table table-hovered table-borderless">
			<thead>
				<th>Username</th>
				<th>Tanggal Bergabung</th>
			</thead>
			<tr v-for="mem in members" :key="mem.username">
				<td>{{ mem.username }}</td>
				<td>{{ mem.created_at }}</td>
			</tr>
		</table>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				ev: [],
				members: [],
				isAuth: false
			}
		},
		mounted() {

			if(window.localStorage.getItem('api_token') != null){
				this.isAuth = true
			}

			this.$parent.failMessage = false;
			this.$parent.successMessage = false;
			this.$parent.message = "";

			this.$axios.get('http://localhost:8000/event/'+this.$route.params.id).then(res => {
				this.ev = res.data.data;
			})

			this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then(res => {
				this.members = res.data.data;
			})
		},
		methods: {
			join(){
				this.$axios.post('http://localhost:8000/event/join/'+this.$route.params.id+"?api_token="+window.localStorage.getItem('api_token')).then(res => {
					if(res.data.data){
						this.$parent.failMessage = false
						this.$parent.successMessage = true
						this.$parent.message = res.data.message
						this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then(res2 => {
							this.members = res2.data.data
						})
					}else {
						this.$parent.failMessage = true
						this.$parent.successMessage = false
						this.$parent.message = res.data.message
					}
				})
			}
		}
	}
</script>
<style>
	.event__image__show {
		display: block;

	}
</style>	