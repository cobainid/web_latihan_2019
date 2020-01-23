<template>
	<div class="row">
		<div class="col-md-4 col-sm-6 mb4" v-for="ev in filteredList" :key="ev.id">
			<div class="box">
				<img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid">
				<div class="box__content">
					<router-link :to="{name:'Show',params:{id:ev.id}}" class="box__title">{{ ev.name }}</router-link>
					<p class="box__desc">{{ ev.description }}</p>
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
	mounted(){
		if(window.localStorage.getItem('role_id') == null){
			this.$router.push({name:'Index'})
		}
		console.log(window.localStorage.getItem('api_token'));
		this.$axios.get('http://localhost:8000/event/join?api_token='+window.localStorage.getItem('api_token')).then(
			res => {
				console.log(res.data);
				this.events = res.data.data;
			})
	},
	computed : {
		filteredList(){
			return this.events.filter(data => {
				return data.name.toLowerCase().includes(this.$parent.search.toLowerCase());
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.box {

	}
	.box .box__content{

	}
	.box .box__content .box__title:hover {
		color: #AFAFFA
	}
	.box .box__content .box__title{
		font-size: 18px;
		font-family: 'Segoe UI';
		font-weight: bold;
		color: #444;
	}
	.box .box__content .box__desc{
		color: #bbb;
		padding: 10px 0;
	}
</style>
