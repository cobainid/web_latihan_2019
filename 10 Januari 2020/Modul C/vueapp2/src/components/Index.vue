<template>
	<div class="row">
		<div class="col-md-4 col-sm-6 col-xs-12 mb-3" v-for="event in filteredList" :key="event.id">
			<div class="card">
				<img :src="'http://localhost:8000/images/'+event.image_url" class="img-fluid">
				<div class="card-body">
					 <router-link :to="{name: 'Show', params:{id: event.id}}"> <h4>{{ event.name }}</h4> </router-link>
					<p>{{ event.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				events: [],
			}
		},
		mounted() {
			if(window.localStorage.getItem('token') != null){
				if(window.localStorage.getItem('role') == 1){
					this.$router.push({name:'Admin'})
				}else if(window.localStorage.getItem('role') == 2){
					this.$router.push({name:'User'})
				}
			}
			this.$axios.get('http://localhost:8000/event')
			.then( res => {
				this.events = res.data.data;
			})
		},
		computed: {
			filteredList(){
				return this.events.filter( (data) => {
					if(data.name.toLowerCase().includes(
							this.$parent.search)
						){
						return data;
					}
				})
			}
		}
	}
</script>