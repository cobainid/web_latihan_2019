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
				events: []
			}
		},
		mounted() {
			

			if(window.localStorage.getItem('role_id') == 1){
				this.$router.push({name:'admin'})
			}else if( window.localStorage.getItem('role_id') == null){
				this.$router.push({name:'index'})
			}

			this.$parent.failMessage = false;
			this.$parent.successMessage = false;
			this.$parent.message = "";


			this.$axios.get('http://localhost:8000/event').then(res => {
				this.events = res.data.data;
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