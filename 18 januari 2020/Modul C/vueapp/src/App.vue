<template>
  <div id="app">
    <nav class="navbar" v-if="!this.$route.meta.hideNav">
      <div class="container">
        <img src="./assets/logo.png" class="img-fluid logo">
        <form class="search">
          <input type="text" v-model="search">
        </form>
        <ul class="nav" v-if="!isAuth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link"> Login </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"> Register </router-link>
          </li>
        </ul>
        <ul class="nav" v-if="isAuth">
          <li class="nav-item">
            <span class="nav-link"> {{username}} </span>
          </li>
          <li class="nav-item">
            <router-link to="/join" class="nav-link"> Join </router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link" @click.prevent="logout"> Logout </span>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container py-5" v-if="!this.$route.meta.hideNav">
      <div class="alert alert-danger" v-if="failMessage">
        {{ message }} <span class="close" @click="dismiss">x</span>
      </div>
      <div class="alert alert-success" v-if="successMessage">
        {{ message }} <span class="close" @click="dismiss">x</span>
      </div>
      <router-view></router-view>
    </div>
    <div v-if="this.$route.meta.hideNav">

      <div class="background">
        <!-- <div class="d-table h-100 m-auto align-center"> -->
          <div class="d-table-cell d-block align-middle zi-1">

            <div class="alert alert-danger" v-if="failMessage">
              {{ message }}. Silahkan <router-link to="/login">Login</router-link> <span class="close" @click="dismiss">x</span>
            </div>
            <div class="alert alert-success" v-if="successMessage">
              {{ message }} <span class="close" @click="dismiss">x</span>
            </div>
            <router-view></router-view>
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
      message: "",
      username: "",
      failMessage: false,
      successMessage: false
    }
  },
  mounted(){
    if(window.localStorage.getItem('api_token') != null && window.localStorage.getItem('username') != null && window.localStorage.getItem('role_id') != null){
      this.isAuth = true;
      this.username = window.localStorage.getItem('username');
    }else{
      this.isAuth = false;
    }
  },
  methods: {
    logout(){
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('api_token');
      window.localStorage.removeItem('role_id');
      this.$router.push({'name':'Login'});
    },
    dismiss(){
      this.successMessage = false;
      this.failMessage = false;
    }
  }
}
</script>

<style>
  .navbar {
    background-color: #98A3FA;
    color: #fff;
  }

  .navbar .logo {
    max-width: 50px;
  }
  form.search{
    background-color: #fff;
    border-radius: 5px;
    padding: 2px 10px;
  }
  .nav-link:hover {
    background-color : #A2BCFF;
    color: #fff;
    transition: 1s;
  }
  .nav-link{
    color: #fff;
    transition: 1s;
  }
  form.search input:focus {
    outline: none;
  }
  form.search input {
    border: 0;
    border-radius: 10px;
    color: #aaa;
  }

</style>
