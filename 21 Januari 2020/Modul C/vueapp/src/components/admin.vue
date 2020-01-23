<template>
	<div class="py-3">
		<button class="btn btn-primary mb-4" @click="showModal">Tambah</button>
		<div id="modal" v-if="isModalShow">
			<form class="form" @submit.prevent="actionForm">
				<div class="form-group">
					<input type="text" v-model="defEvent.name" class="form-control" placeholder=" Name ...">
				</div>
				<div class="form-group">
					<input type="text" v-model="defEvent.address" class="form-control" placeholder="Address ....">
				</div>
				<div class="form-group">
					<input type="date" v-model="defEvent.date" class="form-control" placeholder="Date ...">
				</div>
				<div class="form-group">
					<input type="file" ref="file" class="form-control">
				</div>
				<div class="form-group">
					<textarea v-model="defEvent.description" class="form-control" placeholder="Description ... "></textarea>
				</div>
				<div class="form-group">
					<button class="btn btn-primary btn-block">Submit</button>
				</div>
			</form>
		</div>
		  <div class="row">
		      <div class="col-md-4 col-sm-6 mb-5" v-for="ev in filteredList" :key="ev.id">
		        <div class="box">
		          <div class="box__image">
		            <img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid">
		          </div>
		          <div class="box__content">
		            <router-link :to="{name:'show',params:{id:ev.id}}" class="box__title"> {{ ev.name }} </router-link>
		            <hr>
		            <div class="box__desc d-flex">
		              <div class="w-50">
		                {{ ev.date }}    
		              </div>
		              <div class="w-50 text-right">
		                {{ ev.address }}    
		              </div>
		            </div>  
		            <hr>
		            <div class="box__desc d-flex">
		            	<span class="btn btn-primary btn-round mr-2" @click="update(ev.id)"><i  class="fa fa-pencil-alt"></i></span>
		            	<span class="btn btn-danger btn-round mr-2" @click="deleteItem(ev.id)"><i  class="fa fa-trash"></i></span>
		            </div>  
		          </div>
		        </div>
		      </div>
		  </div>
	</div>
</template>

<style type="text/css" scoped>
	#modal{
		width: 80%;
		padding: 30px 40px;
		box-shadow: 0 0 10px #ccc;
		margin: 20px auto;
		border-radius: 10px;
	}
  .box:hover{
    /*background-color: #efefef;*/
  }
  .box_image {
    overflow: hidden;
    width: 100%;
    height: 200px;
  }
  .box_image img {
    transform:  scale(1.5);
  }
  .box__content .box__title:hover {
    text-decoration: none;
    color: #ADACFA;
  }
  .box__content .box__title {
    color: #444;
    font-family: 'Segoe UI';
    font-weight: bold;
    font-size: 24px;
  }

  .box__content .box__desc {
    font-size: 12xp;
    color: #aaa;
  } 
</style>

<script>
export default {
  data(){
    return {
      event : [],
      defEvent: {},
      isAdd: true,
      isModalShow:  false
    }
  },
  mounted(){
  	if(window.localStorage.getItem('api_token') != null){
  		if(window.localStorage.getItem('role_id') == 2){
  			this.$router.push({name:'user'})
  		}
  	}else{
  		this.$router.push({name:'index'})
  	}
  	
    this.$axios.get('http://localhost:8000/event').then(
      res => {
        this.event = res.data.data;
      })
  },
  methods: {
  	actionForm(){
  		this.defEvent.image_url = this.$refs.file.files[0];
  		if(this.isAdd){
  			let formdata = new FormData();
  			formdata.append('name',this.defEvent.name);
  			formdata.append('address',this.defEvent.address);
  			formdata.append('date',this.defEvent.date);
  			formdata.append('image_url',this.defEvent.image_url);
  			formdata.append('description',this.defEvent.description);

  			this.$axios.post('http://localhost:8000/event',formdata,{
  				"Content-type":"multipart/form-data"
  			}).then(res => {
  				if(res.data.success){
  					this.$parent.failMessage = false;
  					this.$parent.successMessage = true;
  					this.$parent.message = res.data.message;
  					this.event = res.data.data;
  					this.isModalShow = false;
  				}else{
  					this.$parent.failMessage = true;
  					this.$parent.successMessage = false;
  					this.$parent.message = res.data.message;
  				}
  			})


  		}else {
  			let formdata = new FormData();
  			formdata.append('name',this.defEvent.name);
  			formdata.append('address',this.defEvent.address);
  			formdata.append('date',this.defEvent.date);
  			formdata.append('image_url',this.defEvent.image_url);
  			formdata.append('description',this.defEvent.description);
  			formdata.append('_method','PUT');

  			this.$axios.post('http://localhost:8000/event/'+this.defEvent.id,formdata,{
  				"Content-type":"multipart/form-data"
  			}).then(res => {
  				if(res.data.success){
  					this.$parent.failMessage = false;
  					this.$parent.successMessage = true;
  					this.$parent.message = res.data.message;
  					this.event = res.data.data;
  					this.isModalShow = false;
  				}else{
  					this.$parent.failMessage = true;
  					this.$parent.successMessage = false;
  					this.$parent.message = res.data.message;
  				}
  			})

  		}


  	},
  	showModal(){
  		if(this.isModalShow){
  			this.isAdd = true;
  			this.isModalShow = false;
  		}else{
  			this.isAdd = true;
  			this.isModalShow = true;
  		}
  	},
  	update(id){
  		this.$axios.get('http://localhost:8000/event/'+id).then(res => {
  			this.defEvent = res.data.data;
  		})
  		this.isAdd = false;
  		this.isModalShow = true;
  	},
  	deleteItem(id){
  		this.$axios.post('http://localhost:8000/event/'+id,{
  			'_method': 'DELETE'
  		}).then(res => {
  			// this.event = res.data.data;
  				console.log(res.data)
  			if(res.data.success){
  				this.$parent.failMessage = false;
  				this.$parent.successMessage = true;
  				this.$parent.message = res.data.message;
  				this.event = res.data.data;
  			}else{
  				this.$parent.failMessage = true;
  				this.$parent.successMessage = false;
  				this.$parent.message = res.data.message;
  			}
  		})
  	}
  },
  computed: {
    filteredList(){
      return this.event.filter( data => {
        // console.log(this.$parent.message.toLowerCase())
        return data.name.toLowerCase().includes(this.$parent.search.toLowerCase());
      })
    }
  }
}
</script>