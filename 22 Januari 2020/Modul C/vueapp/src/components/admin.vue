<template>
	<div>
		<span class="btn btn-primary my-3" @click="tambah" >Tambah</span>
		<div id="modal" class="my-3" v-if="isModalShow">
			<form class="form" @submit.prevent="formAction">
				<div class="form-group">
					<input type="text" v-model="defEvent.name" placeholder="Name ...." class="form-control">
				</div>
				<div class="form-group">
					<input type="text" v-model="defEvent.address" placeholder="Address ...." class="form-control">
				</div>
				<div class="form-group">
					<input type="date" v-model="defEvent.date" class="form-control">
				</div>
				<div class="form-group">
					<input type="file" ref="file" class="form-control">
				</div>
				<div class="form-group">
					<textarea  v-model="defEvent.description" placeholder="Description ...." class="form-control"></textarea>
				</div>
				<div class="form-group">
					<button class="btn btn-success btn-block">Submit</button>
					<span @click="cancel" class="btn btn-danger btn-block">Cancel</span>
				</div>
			</form>
		</div>
		<div></div>
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
						<hr>
						<div class="p-2">
							<span class="btn btn-primary mr-1 mt-1" @click="update(ev.id)">
								<i class="fa fa-pencil-alt"></i>
							</span>
							<span class="btn btn-danger mr-1 mt-1" @click="deleteItem(ev.id)">
								<i class="fa fa-trash"></i>
							</span>
						</div>
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
				defEvent: {},
				isModalShow: false,
				isAdd: false
			}
		},
		methods: {
			update(id){
				this.isAdd = false;
				this.isModalShow = true;

				this.$axios.get('http://localhost:8000/event/'+id).then(res => {
					this.defEvent = res.data.data
				})

			},
			formAction(){
				this.defEvent.image_url = this.$refs.file.files[0];

				if(this.isAdd){
					let formData = new FormData();

					formData.append('name',this.defEvent.name)
					formData.append('address',this.defEvent.address)
					formData.append('date',this.defEvent.date)
					formData.append('image_url',this.defEvent.image_url)
					formData.append('description',this.defEvent.description)
					formData.append('_method','POST')


					this.$axios.post('http://localhost:8000/event',formData,{
						'Content-type':'multipart/form-data'
					}).then(res => {
						if(res.data.success){
							this.$parent.failMessage = false;
							this.$parent.successMessage = true;
							this.$parent.message = res.data.message;
							this.events = res.data.data
							this.isModalShow = false
						}else {
							this.$parent.failMessage = true;
							this.$parent.successMessage = false;
							this.$parent.message = res.data.message;
						}
					})
				}else {
					let formData = new FormData();

					formData.append('name',this.defEvent.name)
					formData.append('address',this.defEvent.address)
					formData.append('date',this.defEvent.date)
					formData.append('image_url',this.defEvent.image_url)
					formData.append('description',this.defEvent.description)
					formData.append('_method','PUT')


					this.$axios.post('http://localhost:8000/event/'+this.defEvent.id,formData,{
						'Content-type':'multipart/form-data'
					}).then(res => {
						if(res.data.success){
							this.$parent.failMessage = false;
							this.$parent.successMessage = true;
							this.$parent.message = res.data.message;
							this.events = res.data.data
							this.isModalShow = false
						}else {
							this.$parent.failMessage = true;
							this.$parent.successMessage = false;
							this.$parent.message = res.data.message;
						}
					})
				}
			},
			deleteItem(id){
				this.$axios.post('http://localhost:8000/event/'+id,{
					'_method': 'DELETE'
				}).then(res => {
					if(res.data.success){
						this.$parent.failMessage = false;
						this.$parent.successMessage = true;
						this.$parent.message = res.data.message;
					}else {
						this.$parent.failMessage = true;
						this.$parent.successMessage = false;
						this.$parent.message = res.data.message;
					}
				})
			},
			tambah(){
				// console.log("res");
				this.isAdd = true;
				// if(this.isModalShow){
					this.isModalShow = true;
					this.defEvent = {};
				// }else{
				// 	this.isModalShow = false;
				// }
			},
			cancel() {
				this.isModalShow = false;
			}
		},
		mounted() {
			if(window.localStorage.getItem('role_id') == 2){
				this.$router.push({name:'user'})
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
	#modal {
		width: 80%;
		border-radius: 5px;
		margin: auto;
		box-shadow: 0 0 5px #ddd;
		padding: 30px 40px;
	}
</style>	