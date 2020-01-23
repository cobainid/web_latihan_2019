<template>
  <div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="ev in filteredList" :key="ev.id">
        <div class="box">
          <img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid w-100">
          <div class="box-content">
            <router-link :to="{name:'Show',params:{id:ev.id}}" class="title">{{ ev.name }}</router-link>
            <p class="desc">{{ ev.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css">
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
      events: []
    }
  },
  mounted(){
    this.$axios.get('http://localhost:8000/event/join?api_token='+window.localStorage.getItem('api_token')).then(
      res => {
      	this.$parent.message = res.data.message;
      	this.$parent.successMessage = true;
        this.events = res.data.data;
      });
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