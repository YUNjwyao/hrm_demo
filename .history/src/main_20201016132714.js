import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = 'http://95659512372a.ngrok.io/csi_employee_home_webui/'
// 通过axios 请求拦截器添加token,保证拥有获取数据的权限
axios.interceptors.request.use (config => {
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
