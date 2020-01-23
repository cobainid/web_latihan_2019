<template>
	<div>
		<button @click="showModal" class="btn btn-primary my-2">Tambah</button>
		<div id="modal" class="my-2 p-2" v-if="isModalShow">
			<form class="form" @submit.prevent="actionForm">
				<div class="form-group">
					<input class="form-control" type="text" v-model="defEvent.name" placeholder="Name ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="text" v-model="defEvent.address" placeholder="Address ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="date" v-model="defEvent.date" placeholder="date ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="file" ref="file" placeholder="File ...">
				</div>
				<div class="form-group">
					<input class="form-control" type="text" v-model="defEvent.description" placeholder="description ...">
				</div>
				<div class="form-group">
					<button class="btn btn-sucess btn-block"> Submit</button>
				</div>
			</form>
		</div>
		<div class="row">
			<div class="col-md-4 col-sm-6 mb4" v-for="ev in filteredList" :key="ev.id">
				<div class="box">
					<img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid">
					<div class="box__content">
						<router-link :to="{name:'Show',params:{id:ev.id}}" class="box__title">{{ ev.name }}</router-link>
						<p class="box__desc">{{ ev.description }}</p>
						<p>
							<span class="btn btn-primary btn-round mr-1" @click="update(ev.id)"> <i class="fa fa-pencil-alt"></i> </span>
							<span class="btn btn-danger btn-round" @click="deleteItem(ev.id)"> <i class="fa fa-trash"></i> </span>
						</p>
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
			defEvent: [],
			isAdd: true,
			isModalShow: false
		}
	},
	mounted(){
		if(window.localStorage.getItem('role_id') != null){
			if(window.localStorage.getItem('role_id') == 2){
				this.$router.push({name:'User'})
			}
		}else{
			this.$router.push({name:'Index'});
		}
		this.$axios.get('http://localhost:8000/event').then(
			res => {
				// console.log(res.data);
				this.events = res.data.data;
			})
	},
	methods:{
		actionForm(){
			// console.log( this.$refs.file.files[0]);
			this.defEvent.image_url = this.$refs.file.files[0];
			if(this.isAdd){
				let formData = new FormData();


				formData.append('name',this.defEvent.name);
				formData.append('address',this.defEvent.address);
				formData.append('date',this.defEvent.date);
				formData.append('image_url',this.defEvent.image_url);
				formData.append('description',this.defEvent.description);
				let headers = {
					headers: {
						'Content-type': 'multipart/form-data'
					}
				}
				this.$axios.post("http://localhost:8000/event",formData,headers).then(
					res => {
						if(res.data.success){
							this.$parent.message = res.data.message;
							this.$parent.failMessage = false;
							this.$parent.successMessage = true;

						}else{						
							this.$parent.message = res.data.message;
							this.$parent.failMessage = true;
							this.$parent.successMessage = false;
						}
						this.$axios.get('http://localhost:8000/event').then(
							res2 => {
								this.events = res2.data.data;
								this.isModalShow =false;
							})
					})
			}else{
				let formData = new FormData();


				formData.append('name',this.defEvent.name);
				formData.append('address',this.defEvent.address);
				formData.append('date',this.defEvent.date);
				formData.append('image_url',this.defEvent.image_url);
				formData.append('description',this.defEvent.description);
				formData.append('_method','PUT');
				let headers = {
					headers: {
						'Content-type': 'multipart/form-data'
					}
				}
				this.$axios.post("http://localhost:8000/event/"+this.defEvent.id,formData,headers).then(
					res => {
						if(res.data.success){
							this.$parent.message = res.data.message;
							this.$parent.failMessage = false;
							this.$parent.successMessage = true;

						}else{						
							this.$parent.message = res.data.message;
							this.$parent.failMessage = true;
							this.$parent.successMessage = false;
						}
						this.$axios.get('http://localhost:8000/event').then(
							res2 => {
								this.events = res2.data.data;
								this.isModalShow  =false;
							})
					})
			}
			// window.location.reload();
		},
		update(id){
			this.isModalShow = true;
			this.isAdd = false;
			this.$axios.get('http://localhost:8000/event/'+id).then(
				res => {
					this.defEvent = res.data.data;
				})
		},
		deleteItem(id){
			this.$axios.post('http://localhost:8000/event/'+id,{
				'_method':'DELETE'
			}).then(
				res => {
					if(res.data.success){
						this.$parent.message = res.data.message;
						this.$parent.failMessage = false;
						this.$parent.successMessage = true;

					}else{						
						this.$parent.message = res.data.message;
						this.$parent.failMessage = true;
						this.$parent.successMessage = false;
					}
					this.$axios.get('http://localhost:8000/event').then(
						res2 => {
							this.events = res2.data.data;
						})
				})
		},
		showModal(){
			if (this.isModalShow) {
				this.isAdd = true;
				this.isModalShow = false;
			}else{

			this.isAdd = true;
			this.isModalShow = true;
			}
		}
	},
	computed : {
		filteredList(){
			return this.events.filter(data => {
				return data.name.toLowerCase().includes(this.$parent.search);
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
	#modal {
		box-shadow: 0 0 4px #ddd;
		width: 80%;
		margin: auto;
		display: block;
		border-radius: 5px;
	}
</style>
