<template>
	<div class="row">
		<div class="col-md-4 col-sm-6 mb-3" v-for="ev in filteredList" :key="ev.id">
			<div class="event__box">
				<img :src="'http://localhost:8000/images/'+ev.image_url" class="event__image">
				<div class="event__content">
					<router-link :to="{name:'show',params:{id:ev.id}}" class="event__title">
						{{ev.name}}
					</router-link>
					<hr>
					<div class="event__desc flex">
						<p class="w-50 d-inline-block">
							{{ ev.address }}
						</p>
						<p class="w-50 d-inline-block text-right">
							{{ ev.date }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				events: [],
			}
		},
		mounted() {
			if(window.localStorage.getItem('role_id') == null){
				this.$router.push({name:'index'})
			}
			// else if( window.localStorage.getItem('role_id') == 2){
			// 	this.$router.push({name:'user'})
			// }


			this.$parent.failMessage = false;
			this.$parent.successMessage = false;
			this.$parent.message = "";

			this.$axios.get('http://localhost:8000/event/join?api_token='+window.localStorage.getItem('api_token')).then(res => {
				this.events = res.data.data;
				console.log(this.events.length);
				// if(this.events.length == 0){
					this.$parent.failMessage = false;
					this.$parent.successMessage = true;
					this.$parent.message = res.data.message
				// }
			})

		},
		computed: {
			filteredList () {
				return this.events.filter(data => {
					return data.name.toLowerCase().includes(this.$parent.search.toLowerCase());
				})
			}
		}
	}
</script>
<style>
</style>	