<template>
  <div id="app">
    <nav class="navbar" v-if="!this.$route.meta.hideNav">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/logo.png" class="img-fluid logo">
        </router-link>
        <input type="text" v-model="search" class="form__search" placeholder="Search ...">
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
            <span class="nav-link">{{ username }}</span>
          </li>
          <li class="nav-item">
            <router-link to="/join" class="nav-link">Join</router-link>
          </li>
          <li class="nav-item">
            <span @click="logout" class="nav-link danger">Logout</span>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container pt-5" v-if="!this.$route.meta.hideNav">
      <div class="alert alert-danger" v-if="failMessage">
        {{ message }} <span class="close" @click="dismiss"><i class="fa fa-times"></i></span>
      </div>
      <div class="alert alert-success" v-if="successMessage">
        {{ message }} <span class="close" @click="dismiss"><i class="fa fa-times"></i></span>
      </div>
      <router-view/>
    </div>
    <div class="background" v-if="this.$route.meta.hideNav">
        <div class="d-table-cell align-middle">
          <div class="box__auth">
            <div class="alert alert-danger" v-if="failMessage">
              {{ message }} <span class="close" @click="dismiss"><i class="fa fa-times"></i></span>
            </div>
            <div class="alert alert-success" v-if="successMessage">
              {{ message }} Silahkan <router-link to="/login">login</router-link> <span class="close" @click="dismiss"><i class="fa fa-times"></i></span>
            </div>
            <router-view></router-view>
          </div>
        </div>
    </div>
  </div>
</template>


<style>
  .box__auth {
    width: 60%;
    background-color: #fff;
    color: #333;
    position: relative;
    z-index: 1;
    border-radius: 4px;
    padding: 30px 40px;
    margin: auto;
  }
  .background {
    /*background-color: gradient(#adb2Fa,#adb2FF);*/
    background-color: #a1b3Fa;
    position: relative;
    color: #fff;
    height: 100vh;
    width: 100%;
    display: table;
    text-align: center;
  }
  /*.background::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50vh;

  }*/
  .navbar {
    background-color: #adadFc;
    color: #fff;
    padding: 10px;
  }
  .navbar .logo {
    max-width: 45px;
  }
  .nav-link {
    color: #fff;
    font-size: 16px;
  }
  .nav-link:hover {
    color: #fff;
    background-color: #DADAFD;
  }
  .nav-link.danger:hover{
    color: #fff;
    background-color: #FDDADA;
  }
  .form__search:focus {
    outline:  none;
  }
  .form__search::placeholder {
    color: #aaa;
  }
  .form__search {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 2px #aaa;
    border:0;
    color: #aaa;
    padding: 5px 10px;
  }
</style>

<script>

export default {
  data(){
    return {
      failMessage: false,
      successMessage: false,
      message: '',
      isAuth: false,
      search: '',
      username: ''
    }
  },
  mounted(){
    // console.log(window.localStorage.getItem('username'))
    if(window.localStorage.getItem('username') != null){
      this.isAuth = true;
      this.username = window.localStorage.getItem('username');
    }
  },
  methods: {
    logout(){
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('api_token');
      window.localStorage.removeItem('role_id');
      this.$router.push({name:'login'});
    },
    dismiss() {
      this.failMessage = false;
      this.successMessage = false;
      this.message = "";
    }
  }
}

</script>

