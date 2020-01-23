<template>
  <div>
    <button class="btn btn-primary my-3" @click.prevent="tambahItem">Tambah</button>
    <div v-if="showModal">
      <form class="form" @submit.prevent="formAction">
        <div class="form-group">
          <input type="text" v-model="defEvent.name" placeholder="name .. " class="form-control">
        </div>
        <div class="form-group">
          <input type="text" v-model="defEvent.address" placeholder="address .. " class="form-control">
        </div>
        <div class="form-group">
          <input type="date" v-model="defEvent.date" placeholder="date .. " class="form-control">
        </div>
        <div class="form-group">
          <input type="file" ref="file" class="form-control">
        </div>
        <div class="form-group">
          <textarea v-model="defEvent.description" placeholder="description " class="form-control"></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="ev in filteredList" :key="ev.id">
        <div class="box">
          <img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid w-100">
          <div class="box-content">
            <router-link :to="{name:'Show',params:{id:ev.id}}" class="title">{{ ev.name }}</router-link>
            <p class="desc">{{ ev.description }}</p>
            <p class="text-left">
              <i class="fa fa-pencil-alt btn-action primary" @click="update(ev.id)"></i>
              <i class="fa fa-trash  btn-action danger" @click="deleteItem(ev.id)"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css">
  .btn-action {
    border-radius: 100%;
    color: #fff;
    font-size: 12px;
    padding: 10px 13px;
    margin-right: 1rem;
  } 
  .btn-action.primary:hover {
    background-color: #1f1ffa;
    transition: .5s;
  }
  .btn-action.danger:hover {
    background-color: #fa1f1f;
    transition: .5s;
  }
  .btn-action.primary {
    background-color: #afaffa;
    transition: .5s;
  }
  .btn-action.danger{
    background-color: #faafaf;
    transition: .5s;
  }
  .title {
    padding: 10px;
    font-size: 24px;
    font-family: 'Segoe UI';
    font-weight: bold;
  }
  .title:hover {
    text-decoration: none;
  }
  .box {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .box .box-content {
    padding: 10px 15px;
    text-align: center;
  }
  p.desc{
    font-size: 12px;
    color: #aaa;
    font-family: 'Prompt'
  }
</style>
<script>
export default {
  data(){
    return {
      events: [],
      defEvent: [],
      showModal: false,
      isAdd: true,
    }
  },
  mounted(){
    if(window.localStorage.getItem('api_token') != null && window.localStorage.getItem('username') != null && window.localStorage.getItem('role_id') != null){
      if(window.localStorage.getItem('role_id') == 2){
        this.$router.push({name:'User'});
      }
    }else{
      this.$router.push({name:'Index'});
    }
    this.$axios.get('http://localhost:8000/event').then(
      res => {
        this.events = res.data.data;
      });
  },
  methods: {
    tambahItem(){
      this.showModal = true;
      this.isAdd = true;
      this.defEvent = [];
    },
    formAction(){
      this.defEvent.image_url = this.$refs.file.files[0];
      if(this.isAdd){
        let formData = new FormData();

        formData.append('name',this.defEvent.name);
        formData.append('address',this.defEvent.address);
        formData.append('date',this.defEvent.date);
        formData.append('image_url',this.defEvent.image_url);
        formData.append('description',this.defEvent.description);
        formData.append('_method','POST');

        let headers = {
          headers: {
            'Content-type':'multipart/form-data'
          }
        }

        this.$axios.post('http://localhost:8000/event',formData,headers).then(
          res => {
            console.log(this.defEvent);
            this.showModal = false;

            if(res.data.success){
              this.$parent.message = res.data.message;
              this.$parent.failMessage = false;
              this.$parent.successMessage = true;


              this.$axios.get('http://localhost:8000/event').then(
                res2 => {
                  this.events = res2.data.data;
                });
            }else{
              this.$parent.message = res.data.message;
              this.$parent.successMessage = false;
              this.$parent.failMessage = true;
            }
          })

      }else {

        let formData = new FormData();

        formData.append('name',this.defEvent.name);
        formData.append('address',this.defEvent.address);
        formData.append('date',this.defEvent.date);
        formData.append('image_url',this.defEvent.image_url);
        formData.append('description',this.defEvent.description);
        formData.append('_method','PUT');

        let headers = {
          headers: {
            'Content-type':'multipart/form-data'
          }
        }

        this.$axios.post('http://localhost:8000/event/'+this.defEvent.id,formData,headers).then(
          res => {


            this.showModal = false;

            if(res.data.success){
              this.$parent.message = res.data.message;
              this.$parent.failMessage = false;
              this.$parent.successMessage = true;

              this.$axios.get('http://localhost:8000/event').then(
                res2 => {
                  this.events = res2.data.data;
                });
            }else{
              this.$parent.message = res.data.message;
              this.$parent.successMessage = false;
              this.$parent.failMessage = true;
            }
          })

      }
    },
    update(id){
      this.showModal = true;
      this.isAdd = false;
      this.$axios.get('http://localhost:8000/event/'+id).then(
        res => {
          this.defEvent = res.data.data;
        })
    },
    deleteItem(id){
      this.$axios.post('http://localhost:8000/event/'+id,{
        '_method': 'DELETE'
      }).then(
        res => {
          if(res.data.success){
            this.$parent.message = res.data.message;
            this.$parent.failMessage = false;
            this.$parent.successMessage = true;
          }else {
            this.$parent.message = res.data.message;
            this.$parent.failMessage = true;
            this.$parent.successMessage = false;
          }
          this.$axios.get('http://localhost:8000/event').then(
            res => {
              this.events = res.data.data;
            })
        })
    }
  },
  computed: {
    filteredList (){
      return this.events.filter(ev => {
        return ev.name.toLowerCase().includes(this.$parent.search.toLowerCase());
      })
    }
  }
}
</script>