<template>
  <div id="app">
    <nav class="navbar" v-if="!this.$route.meta.hideNav">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" class="img-fluid logo">
        </router-link>
        <input type="text" v-model="search" class="form__search">
        <ul class="nav" v-if="!isAuth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
        <ul class="nav" v-if="isAuth">
          <li class="nav-item">
            <span class="nav-link">{{ username}} </span>
           </li>
          <li class="nav-item">
            <router-link to="/join" class="nav-link">Join </router-link>
           </li>
          <li class="nav-item">
            <span @click="logout" class="nav-link">Log Out </span>
           </li>
        </ul>
      </div>
    </nav>
    <div class="container py-3" v-if="!this.$route.meta.hideNav">
      <div class="py-2"></div>
      <div class="alert  alert-danger" v-if="failMessage">
        {{ message }} <span class="close" @click="dismiss">x</span>
      </div>
      <div class="alert  alert-success" v-if="successMessage">
        {{ message }} <span class="close" @click="dismiss">x</span>
      </div>
      <router-view/>
      
    </div>
    <div class="background d-table w-100 text-center" v-if="this.$route.meta.hideNav">
      <div class="d-table-cell align-middle">
        <div class="box__auth">
          <div class="alert  alert-danger" v-if="failMessage">
            {{ message }} <span class="close" @click="dismiss">x</span>
          </div>
          <div class="alert  alert-success" v-if="successMessage">
            {{ message }} Silahkan <router-link to="/login">Login</router-link> <span class="close" @click="dismiss">x</span>
          </div>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isAuth: false,
      message: "",
      username: "",
      search: "",
      successMessage: false,
      failMessage: false,
    }
  },
  mounted(){
    if(window.localStorage.getItem('username') != null){
      this.isAuth = true;
      this.username  = window.localStorage.getItem('username');
    }
  },
  methods: {
    dismiss(){
      this.message = "";
      this.failMessage = false;
      this.successMessage = false;
    },
    logout(){
      window.localStorage.removeItem('api_token')
      window.localStorage.removeItem('username') 
      window.localStorage.removeItem('role_id')
      this.$router.push({name:'login'});
    }
  }
}
</script>

<style>
  .form__search::placeholder {
    color: #aaa;
  }
  .form__search:focus {
    outline: none;
  }
  .form__search {
    background-color: #fff;
    color: #aaa;
    padding: 5px 10px;
    border: 0;
    border-radius: 3px;
  }
  .box__auth {
    width: 60%;
    padding: 30px 40px;
    margin: auto;;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .background {
    width: 100%;
    height: 100vh;
    background-color: #ADAFDE;
  }
  .background::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #FACADA;
    height: 50vh;
  }
  .navbar {
    background-color: #9856CA;
    color: #fff;
  }
  .navbar .logo{
    max-width: 45px;
  }
  .nav-link {
    padding: 5px 20px;
    color: #fff;
  }
  .nav-link:hover {
    color: #fff;
    background-color: #A886DA;
  }
</style>
