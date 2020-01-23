<template>
	<div class="row">
		<div class="col-md-4 col-sm-6 mb-4" v-for="ev in filteredList" :key="ev.id">
			<div class="event__box">
				<img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid">
				<div class="event__content">
					<router-link :to="{name:'show',params:{id:ev.id}}" class="event__title"> {{ ev.name }} </router-link>
					<hr>
					<p class="flex justify-content-center">
						<span class="w-50 d-inline-block">
							<i class="fa fa-calendar"></i> {{ ev.date }}
						</span>
						<span class="w-50 d-inline-block text-right">
							<i class="fa fa-map-marker-o"></i> {{ ev.address }}
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				events : []
			}
		},
		mounted(){
			this.$parent.onThisIsNotAuth();
			this.$parent.dismiss()
			
			this.$axios.get('http://localhost:8000/event').then(res => {
				// if(res.data.success){
					this.events = res.data.data
				// }
			})
		},
		computed:{
			filteredList(){
				return this.events.filter(res => {
					return res.name.toLowerCase().includes(this.$parent.search.toLowerCase());
				})
			}
		}
	}
</script>
<style type="text/css">
	.event__title:hover {
		text-decoration: none;
	}
	.event__content{
		overflow: hidden;
	}
	.event__content img {
		height: 200px;
		width: 100%;
		border-bottom: 3px solid red
	}


	.event__title {
		color: #333;
		font-size: 18px;
		font-weight: bold;
		padding: 10px 0 0;
		display: block;
		font-family: 'Segoe UI';
	}
</style>