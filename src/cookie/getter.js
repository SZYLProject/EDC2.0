/*
 * @Author: your name
 * @Date: 2021-03-04 11:40:44
 * @LastEditTime: 2021-03-04 15:26:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\cookie\getter.js
 */
import state from './state'
import cookieApi from './cookieapi'
const getter = {
	getToken() {
		return cookieApi.getCookie(state.token)
	}
}
export default getter