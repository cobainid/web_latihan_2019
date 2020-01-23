<template>
  <div id="app">
    <nav class="navbar" v-if="!this.$route.meta.hideNav">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" class="img-fluid logo">
        </router-link>
        <input type="text" v-model="search" placeholder="search ... " class="search--form">
        <ul class="nav" v-if="!isAuth">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
        <ul class="nav" v-if="isAuth">
          <li class="nav-item">
            <span class="nav-link">{{ username }}</span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/join">Join</router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link danger" @click="logout">Logout</span>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container" v-if="!this.$route.meta.hideNav">
      <div class="py-3"></div>
      <div class="alert alert-danger"  v-if="failMessage">
        {{ message }} <span class="close"><i class="fa fa-times" @click ="dismiss">x</i></span>
      </div>
      <div class="alert alert-success"  v-if="successMessage">
        {{ message }} <span class="close"><i class="fa fa-times" @click ="dismiss">x</i></span>
      </div>
      <router-view></router-view>
    </div>

    <div class="background"  v-if="this.$route.meta.hideNav">
      <div class="d-table-cell align-middle text-center">
        <div class="box__auth">
          <div class="alert alert-danger"  v-if="failMessage">
            {{ message }} <span class="close"><i class="fa fa-times" @click ="dismiss">x</i></span>
          </div>
          <div class="alert alert-success"  v-if="successMessage">
            {{ message }}. Sialhkan <router-link to="/login">login</router-link> <span class="close"><i class="fa fa-times" @click ="dismiss">x</i></span>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
    export default{
      data(){
        return {
          message : '',
          failMessage: false,
          successMessage: false,
          username: '',
          isAuth: false,
          search: ''
        }
      },
      mounted(){
        if(window.localStorage.getItem('username') != null){
          this.username = window.localStorage.getItem('username')
          this.isAuth = true
        }
      },
      methods: {
        logout(){
          window.localStorage.removeItem('api_token')
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('role_id')
          this.$router.push({name:'login'})
        },
        dismiss() {
          this.failMessage = false;
          this.successMessage = false;
          this.message = "";
        },
        setFail(ms){
          this.message = ms;
          this.failMessage = true;
          this.successMessage = false;
        },
        setSuccess(ms){
          this.message = ms;
          this.failMessage = false;
          this.successMessage = true;
        },
        onThisIsNotAuth(){
          if(window.localStorage.getItem('role_id') == 1){
            this.$router.push({name:'admin'})
          }else if(window.localStorage.getItem('role_id') == 2){
            this.$router.push({name:'user'})
          }
        },
        onThisIsNotAdmin(){
          if(window.localStorage.getItem('role_id') == null){
            this.$router.push({name:'index'})
          }else if(window.localStorage.getItem('role_id') == 2){
            this.$router.push({name:'user'})
          }
        },
        onThisIsNotUser(){
          if(window.localStorage.getItem('role_id') == 1){
            this.$router.push({name:'admin'})
          }else if(window.localStorage.getItem('role_id') == null){
            this.$router.push({name:'index'})
          }
        },
        onThisIsAuth(){
          if(window.localStorage.getItem('role_id') == null){
            this.$router.push({name:'index'})
          }
        },
      }
    }
  </script>

<style>
  .background{
    display: table;
    width: 100%;
    height: 100vh;
    background-color: #Fd9a9a;
  }
  .background::after {
    background-color: #8a9cFa;
    height: 50vh;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    content: ''
  }
  .box__auth {
    background-color: #fff;
    padding: 40px 60px;
    width: 70%;
    margin: auto;
    position: relative;
    z-index: 2;
  }
  html {
    font-family: 'Prompt';
    font-size: 12px;
  }
    .navbar .logo {
      max-height: 45px;
    }
    .navbar {
      background-color: #adbcea;
    }
    .nav-link:hover {
      background-color: #babcFc;
      color: #fff;
    }
    .nav-link{
      color: #fff;
    }
    .search--form:focus {
      outline: none;
    }
    .search--form {
      background-color: #fff;
      border-radius: 4px;
      padding: 5px 10px;
      border: 0;
    }
</style>
