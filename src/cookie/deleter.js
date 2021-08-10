/*
 * @Author: your name
 * @Date: 2021-03-04 11:40:44
 * @LastEditTime: 2021-03-30 16:58:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\cookie\deleter.js
 */
import state from './state'
import cookieApi from './cookieapi'
const deleter = {
	delToken() {
		return cookieApi.deleteCookie(state.token)
	}
}
export default deleter