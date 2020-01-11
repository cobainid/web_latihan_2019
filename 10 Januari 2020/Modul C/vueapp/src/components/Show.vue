<template>
	<div class="container">
		<div class="p-3"></div>
		<img :src="events.image_url" class="img-fluid">
		<h3 class="py-1">{{ events.name }}</h3>
		<p class="py-1 info">
			Created at : {{events.date}} <br>
			Address : {{events.address}} 
		</p>
		<p class="desc">
			{{ events.description }}
		</p>
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
			console.log('http://localhost:8000/event/'+this.$route.params.id);
			this.$axios.get('http://localhost:8000/event/'+this.$route.params.id)
			.then( res => {
				this.events = res.data.data;
				// console.log(this.events);
			})
			// console.log(filteredList)
		}
	}
</script>