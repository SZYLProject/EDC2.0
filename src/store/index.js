/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-06-22 10:06:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import base from './base/index'
import environment from './environment/index'
import formDesigin from './formDesigin/index'
import visit from './visit/index'
import research from './research/index'
import management from './management/index'
Vue.use(Vuex)
export default new Vuex.Store({
	modules: { base, research, formDesigin, visit, environment,	management }
})
