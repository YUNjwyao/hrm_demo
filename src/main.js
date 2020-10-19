import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import VueParticles from 'vue-particles'  
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'
import $ from "jquery";

Vue.use(VueParticles) 
Vue.use(VueSession)
Vue.use(VueCookies)


import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = 'http://95659512372a.ngrok.io/csi_employee_home_webui/'
// 通过axios 请求拦截器添加token,保证拥有获取数据的权限
axios.interceptors.request.use (config => {
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$http = axios

// this.$session.set("key",value); //存session
// this.$session.get("key"); //获取session

// this.$cookies.set("key",value); //存cookies
// this.$cookies.get("key"); //获取cookies

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
