<template>
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
          </div>
        </div>
      </div>
  </div>
</template>

<style type="text/css">
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
      event : []
    }
  },
  mounted(){
  	this.$parent.message = "";
  	this.$parent.failMessage = false;
  	this.$parent.successMessage = false;
    this.$axios.get('http://localhost:8000/event/join?api_token='+window.localStorage.getItem('api_token')).then(
      res => {
        this.event = res.data.data;
      })
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