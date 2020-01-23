import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'

import Axios from 'axios'
import router from './router'

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


Vue.prototype.$axios = Axios

Vue.config.productionTip = false

Vue.use(bootstrap)









new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
