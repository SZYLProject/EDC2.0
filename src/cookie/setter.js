/*
 * @Author: your name
 * @Date: 2020-12-23 17:29:07
 * @LastEditTime: 2021-03-04 15:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts_demo\src\cookie\setter.ts
 */
import state from './state'
import cookieApi from './cookieapi'
const setter = {
	setToken(value, expire) {
		return cookieApi.setCookie(state.token, value, expire)
	}
}
export default setter
