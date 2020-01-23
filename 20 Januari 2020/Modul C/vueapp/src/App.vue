<template>
  <div id="app">
    <nav class="navbar" v-if="!this.$route.meta.hideNav">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" class="img-fluid">
        </router-link>
        <input type="text" v-model="search" class="form-search">
        <ul class="nav" v-if="isAuth">
          <li class="nav-item">
            <span class="nav-link">{{ username }}</span>
          </li>
          <li class="nav-item">
            <router-link to="/join" class="nav-link">Join</router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link" @click.prevent="logout">Log Out</span>
          </li>
        </ul>
        <ul class="nav" v-if="!isAuth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container" v-if="!this.$route.meta.hideNav">
      <div class="py-3">
          <div class="alert alert-danger" v-if="failMessage">
           {{ message }} <span class="close" @click="dismiss">x</span>
          </div>
          <div class="alert alert-success" v-if="successMessage">
             {{ message }} <span class="close" @click="dismiss">x</span>
          </div>
      </div>
      <router-view/>
    </div>
    <div v-if="this.$route.meta.hideNav">
      <div class="background w-100">
        <!-- <div class="d-table h-100 w-100 m-auto align-middle text-center"> -->
          <div class="d-table-cell d-block align-middle">
            <div class="box__login">
              <div class="alert alert-danger" v-if="failMessage">
                {{ message }} <span class="close" @click="dismiss">x</span>
              </div>
              <div class="alert alert-success" v-if="successMessage">
                {{ message }} Silahkan <router-link to="/login">Login</router-link> <span class="close" @click="dismiss">x</span>
              </div>
              <router-view/>
            </div> 
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      search: "",
      isAuth: false,
      username: "",
      failMessage: false,
      successMessage: false,
      message: ""
    }
  },
  mounted(){
    if(window.localStorage.getItem('api_token') != null){
      this.username = window.localStorage.getItem('username');
      this.isAuth = true;
    }

  },
  methods: {
    logout(){
      window.localStorage.removeItem('role_id');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('api_token');
      this.$router.push({name:'Login'});
    },
    dismiss(){
      this.message ="";
      this.failMessage = false;
      this.successMessage = false;
    }
  }
}
</script>

<style>
  .box__login {
    background-color: #fff;
    position: relative;
    z-index: 1;
    width: 60%;
    padding: 30px 50px;
    margin: auto;
  }
  .background{
    background-color: #AFFAAC;
    position: relative;
    height: 100vh;
    display: table;
  }
  .background::after{
    position: absolute;;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vh;
    background-color: #FAACAB;
    content:"";
  }
  .form-search:focus{
    outline: none
  }
  .form-search {
    color: #aaa;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px #ddd;
    border: 0;
    padding: 5px;
  }
  .navbar {
    background-color: #ADCDFB; 
  }
  .navbar img {
    max-width: 40px;
  }
  .nav-link {
    color: #fff;
    padding: 5px 15px;
  }
  .nav-link:hover{
   background-color: #ADADFD;
   color: #fff; 
  }
</style>
