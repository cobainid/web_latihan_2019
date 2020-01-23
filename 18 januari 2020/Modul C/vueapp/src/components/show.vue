<template>
  <div>
    <img :src="'http://localhost:8000/images/'+ev.image_url" class="img-fluid py-3 d-block">
    <p class="title">{{ ev.name }}</p>
    <p class="desc">{{ ev.description }}</p>
    <button class="btn btn-primary" @click="join()">Join</button>

    <table class="table mt-5">
    	<tr>
    		<th>List member of event</th>
    	</tr>
    	<tr v-for="mem in memEvent" :key="mem.id">
    		<td>{{ mem.username }}</td>
    	</tr>
    </table>
  </div>
</template>

<style type="text/css">
  .title {
    padding: 10px;
    /*text-align: center;*/
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
      ev: [],
      memEvent: [],
      no: 0,
    }
  },
  mounted(){
    this.$axios.get('http://localhost:8000/event/'+this.$route.params.id).then(
      res => {
        this.ev = res.data.data;
      });
    this.$axios.get('http://localhost:8000/event/member/'+this.$route.params.id).then(
    	res => {
    		this.memEvent = res.data.data;
    		console.log(this.memEvent)
    	})
  },
  methods: {
  	join(){
  		this.$axios.post('http://localhost:8000/event/join/'+this.$route.params.id,{
  			api_token: window.localStorage.getItem('api_token'),
  		}).then(
  		res => {
  			if(res.data.success){
          this.$parent.message = res.data.message;
          this.$parent.successMessage = true;
          this.$parent.failMessage = false;
  			}else{
          this.$parent.message = res.data.message;
          this.$parent.successMessage = false;
          this.$parent.failMessage = true;
  			}
  		})
  	}
  }
}
</script>