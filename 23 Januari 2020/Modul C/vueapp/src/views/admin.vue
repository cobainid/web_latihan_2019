<template>
	<div>
		<button class="btn btn-primary my-3" @click="tambah">Tambah</button>
		<div id="modal" v-if="isShowModal" class="my-3 mb-5">
			<form class="form" @submit.prevent="formAction">
				<div class="form-group">
					<input type="text" v-model="defEvent.name" placeholder="name ... " class="form-control">
				</div>
				<div class="form-group">
					<input type="text" v-model="defEvent.address" placeholder="address ... " class="form-control">
				</div>
				<div class="form-group">
					<input type="date" v-model="defEvent.date" placeholder="date ... " class="form-control">
				</div>
				<div class="form-group">
					<input type="file" ref="file" class="form-control">
				</div>
				<div class="form-group">
					<textarea v-model="defEvent.description" style="min-height: 200px;" class="form-control"></textarea>
				</div>
				<div class="form-group">
					<button class="btn btn-success btn-block mr-1 mb-1">Submit</button>
					<span class="btn btn-danger btn-block mr-1 mb-1" @click="cancel">Cancel</span>
				</div>
			</form>
		</div>
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
						<hr>
						<p>
							<span class="btn btn-primary mt-1 mr-1" @click="update(ev.id)" >Edit</span>
							<span class="btn btn-danger mt-1 mr-1" @click="deleteItem(ev.id)" >Delete</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				events : [],
				defEvent: {},
				isAdd: true,
				isShowModal: false
			}
		},
		mounted(){
			this.$parent.onThisIsNotAdmin();
			this.$parent.dismiss()
			
			this.$axios.get('http://localhost:8000/event').then(res => {
				// if(res.data.success){
					this.events = res.data.data
				// }
			})
		},
		methods: {
			cancel(){
				this.isShowModal =false;
			},
			tambah(){
				this.isAdd = true;
				this.isShowModal = true;
			},
			update(id){
				this.$axios.get('http://localhost:8000/event/'+id).then(res => {
					this.defEvent = res.data.data
				})
				this.isAdd = false;
				this.isShowModal = true;
			},
			formAction(){
				this.defEvent.image_url = this.$refs.file.files[0];
				if(this.isAdd){
					let formData = new FormData;
					formData.append('name',this.defEvent.name)
					formData.append('address',this.defEvent.address)
					formData.append('date',this.defEvent.date)
					formData.append('image_url',this.defEvent.image_url)
					formData.append('description',this.defEvent.description)

					this.$axios.post('http://localhost:8000/event',formData,{
						'Content-type':'multipart/form-data'
					}).then(res => {
						if(res.data.success){
							this.events = res.data.data
							this.$parent.setSuccess(res.data.message);
						}else{
							this.$parent.setFail(res.data.message);
						}
					})
				}else {

					let formData = new FormData;
					formData.append('name',this.defEvent.name)
					formData.append('address',this.defEvent.address)
					formData.append('date',this.defEvent.date)
					formData.append('image_img',this.defEvent.image_img)
					formData.append('description',this.defEvent.description)
					formData.append('_method','PUT')

					this.$axios.post('http://localhost:8000/event/'+this.defEvent.id,formData,{
						'Content-type':'multipart/form-data'
					}).then(res => {
							// console.log(res.data.data)
						if(res.data.success){
							this.events = res.data.data
							this.$parent.setSuccess(res.data.message);
						}else{
							this.$parent.setFail(res.data.message);
						}
					})
				}
			},
			deleteItem(id){
				this.$axios.post('http://localhost:8000/event/'+id,{
					'_method':'Delete'
				}).then(res => {
					if(res.data.success){
						this.$parent.setSuccess(res.data.message);
						this.events = res.data.data
					}else{
						this.$parent.setFail(res.data.message);
					}
				})
			}
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
	#modal{
		width: 80%;
		padding: 20px 40px;
		display: block;
		margin: auto;
		box-shadow: 0 0 10px #ccc;
		border-radius: 5px;
	}
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