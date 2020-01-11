<template>
	<div>
		<button class="btn btn-success my-2" @click="showModalAdd">Tambah</button>

		<div id="modal" v-if="showModalOption">
			<!-- <keep-alive> -->
				<form @submit.prevent="actionForm" enctype="multipart/form-data">
					<div class="form-group">
						<input type="text" v-model="defEvents.name" class="form-control" placeholder="Name ..">
					</div>
					<div class="form-group">
						<input type="text" v-model="defEvents.address" class="form-control" placeholder="Address ..">
					</div>
					<div class="form-group">
						<input type="date" v-model="defEvents.date" class="form-control" placeholder="Date ..">
					</div>
					<div class="form-group">
						<input type="file" class="form-control" @change="onImageChange" ref="file" placeholder="File ..">
					</div>
					<div class="form-group">
						<textarea v-model="defEvents.description" class="form-control"  placeholder="Description .."></textarea>
					</div>
					<div class="form-group">
						<button class="btn btn-success">Submit</button>
					</div>
				</form>
			<!-- </keep-alive> -->
		</div>

		<div class="row">
			<div class="col-md-4 col-sm-6 col-xs-12 mb-3" v-for="event in filteredList" :key="event.id">
				<div class="card">
					<img :src="'http://localhost:8000/images/'+event.image_url" class="img-fluid">
					<div class="card-body">
						 <router-link :to="{name: 'Show', params:{id: event.id}}"> <h4>{{ event.name }}</h4> </router-link>
						<p>{{ event.description }}</p>
						<p>
							<span @click="update(event.id)" class="btn bg-primary btn-round text-white mr-2 mt-2">update</span>
							<span @click="deleteItem(event.id)" class="btn bg-danger btn-round text-white mt-2">delete</span>
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
				defEvents: [],
				showModalOption: false,
				isAdd: true
			}
		},
		mounted() {
	    if(( window.localStorage.getItem('token') == null || window.localStorage.getItem('token') == '' )){
	      this.$router.push({path:'/'});
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
		},
		methods: {
			onImageChange(){
				this.defEvents.image_url = this.$refs.file.files[0];
			},
			showModalAdd(){
				if(this.showModalOption == false){
					this.isAdd = true;
					this.showModalOption = true;
				}else {
					this.showModalOption = false;
				}
			},
			actionForm(){
				let formData = new FormData();
				formData.append('name',this.defEvents.name)
				formData.append('address',this.defEvents.address)
				formData.append('date',this.defEvents.date)
				formData.append('image_url',this.defEvents.image_url)
				formData.append('description',this.defEvents.description)

				let headers = {
					'Content-type': 'multipart/form-data'
				}
				if(this.isAdd){
					this.$axios.post("http://localhost:8000/event",formData,headers).then(
						res => {
							if(res.data.success){
								this.$parent.isFail = false;
								this.$parent.isSuccess = res.data.success;
								this.$parent.message = res.data.message;
							}else{
								this.$parent.isSuccess = false;
								this.$parent.isFail = res.data.success;
								this.$parent.message = res.data.message;
							}
							
							this.showModalOption = false;
							this.$axios.get('http://localhost:8000/event')
							.then( res => {
								this.events = res.data.data;
							})
						})
				}else{
					formData.append('_method','PUT');

					this.$axios.post("http://localhost:8000/event/update/"+this.defEvents.id,formData,headers).then(
						res => {
							if(res.data.success){
								this.$parent.isFail = false;
								this.$parent.isSuccess = res.data.success;
								this.$parent.message = res.data.message;
							}else{
								this.$parent.isSuccess = false;
								this.$parent.isFail = res.data.success;
								this.$parent.message = res.data.message;
							}

							this.showModalOption = false;
							this.$axios.get('http://localhost:8000/event')
							.then( res => {
								this.events = res.data.data;
							})
						})

				}

			},
			update(id){
				this.events.forEach( (data) => {
					if(data.id == id){
						this.defEvents = data;
					}
				})
				this.showModalOption = true;
				this.isAdd = false;
			},
			deleteItem(id){
				this.events.forEach( (data) => {
					if(data.id == id){
						this.defEvents = data;
					}
				});

				let formData = new FormData();
				formData.append('_method','delete');
				 
				this.$axios.post("http://localhost:8000/event/delete/"+this.defEvents.id,formData).then(
					res => {
						if(res.data.success){
							this.$parent.isFail = false;
							this.$parent.isSuccess = res.data.success;
							this.$parent.message = res.data.message;
						}else{
							this.$parent.isSuccess = false;
							this.$parent.isFail = res.data.success;
							this.$parent.message = res.data.message;
						}

						this.showModalOption = false;
						this.$axios.get('http://localhost:8000/event')
						.then( res => {
							this.events = res.data.data;
						})
					})


			}
		}
	}
</script>