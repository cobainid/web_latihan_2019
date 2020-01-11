<template>
	<div class="container">
		<div class="p-3"></div>
		<div class="row">
			uwu
			<div class="col-md-4 col-sm-6 col-xs-12 mb-3" v-for="event in filteredList" :key="event.id">
				<div class="card" :click="showModal">
					<img src="/event.png" class="img-fluid">
					<div class="card-body">
						 <router-link :to="{name: 'Show', params:{id: event.id}}"> <h4>{{ event.name }}</h4> </router-link>
						<p>{{ event.description }}</p>
					</div>
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
			this.$axios.get('http://localhost:8000/event')
			.then( res => {
				this.events = res.data.data;
				// console.log(this.events);
			})
			// console.log(filteredList)
		},
		computed: {
			filteredList(){
				return this.events.filter( (data) => {
					if(data.name.includes(
							this.$parent.search)
						){
						return data;
					}
				})
			}
		}
	}
</script>