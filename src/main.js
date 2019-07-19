// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import * as filters from './filters'
import './icons' // icon
import '@/styles/index.scss'
import './permission.js'
import 'normalize.css/normalize.css'
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
// 注册全局的filter
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
