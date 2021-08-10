/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-06-28 14:50:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\main.js
 */
// import 'babel-polyfill'
// import 'default-passive-events'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/Iconfont/iconfont.css'
// import '@/assets/Iconfont/iconfont.js'
import { loadings } from './utils/loading.js'
import { global } from './utils/global.js' // 全局方法
import { filterRules } from './rule'// 校验规则
import api from './request/index'// 接口api
import { buttonAuthorith } from '@/assets/js/authority'// 按钮权限指令字典
import './directive'// 全局指令
import './register'// 注册组件
import xss from 'xss'// 预防v-html的xss
import * as filters from './filters'// 过滤器
Vue.prototype.xss = xss
Vue.config.productionTip = false
Vue.prototype.$loadings = loadings
Vue.prototype.$utils = global
Vue.prototype.$buttonAuthorith = buttonAuthorith
Vue.prototype.$filterRules = filterRules
Vue.prototype.$api = api
Vue.prototype.$bus = new Vue()
Vue.prototype.$webTitle = '临床研究数据管理平台'
Vue.prototype.$authorContainer = {}
// 全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
