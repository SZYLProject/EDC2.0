/*
 * @Author: your name
 * @Date: 2021-04-06 10:33:23
 * @LastEditTime: 2021-04-28 09:36:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\environment.JS
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
export default {
	namespaced: true,
	state: state,
	mutations: mutations,
	actions: actions
}