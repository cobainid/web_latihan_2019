<template>
  <div>
    <nav class="navbar" v-if="!this.$route.meta.hideNav">
      <div class="container">
        <router-link to="/">
          <img alt="Vue logo" src="@/assets/logo.png" class="img-fluid max-60">
        </router-link>
        <input v-if="!this.$route.meta.hideSearch" type="text" v-model="search" class="form-control-header" placeholder="Search ... ">
        <ul class="nav" v-if="!isLogin">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
        <ul class="nav" v-if="isLogin">
          <li class="nav-item">
            <router-link to="/join" class="nav-link" v-if="isUser">Joined Event</router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link" @click="logout">Log Out</span>
          </li>
        </ul>
      </div>
    </nav>
    <div class="p-4" v-if="!this.$route.meta.hideNav"></div>
    <div class="container" v-if="!this.$route.meta.hideNav">
      <div class="alert alert-success" v-if="isSuccess">
        {{ message }} <span class="close" @click="dismiss">x</span>
      </div>
      <div class="alert alert-danger" v-if="isFail">
        {{ message }} <span class="close" @click="dismiss">x</span>
      </div>
      <router-view></router-view>
    </div>
    <div v-if="this.$route.meta.hideNav">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      joinEvents: [],
      joinEventsCount: 0,
      search: "",
      isUser: false,
      message: "",
      isSuccess: false,
      isFail: false
    }
  },
  mounted(){
    if(window.localStorage.getItem('role') == 2) {
      this.isUser = true;
    }else{
      this.isUser = false;
    }
  },
  computed: {
    isLogin(){
      if(( window.localStorage.getItem('token') == null || window.localStorage.getItem('token') == '' )){
        return false;
      }else{
        return true;
      }
    }
  },
  methods: {
    logout(){
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('role');
      this.$router.push({path:'/login'});
    },
    dismiss(){
      this.message = "";
      this.isFail = false;
      this.isSuccess = false;
    }
  }
}
</script>

<style>
  .navbar {
    background-color: #a2a1fa;
    color: #fff;
  }
  .form-control-header:focus {
    box-shadow: 0 0 5px #f00;
    outline: none;
  }
  .form-control-header {
    background-color: #fff;
    border-radius: 5px;
    border: 0;
    padding: 5px 20px;
    color: #444;
  }
  .nav-item:hover {
    background-color: #b2b1fa;
  }
  .nav-item .nav-link {
    color: #fff;
  }
</style>
