/*
 * @Author: your name
 * @Date: 2021-03-04 14:48:20
 * @LastEditTime: 2021-03-30 11:18:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\local\localapi.js
 */
// local操作
class Local {
	setLocal(name, info) {
		this.removeLocal(name)
		localStorage.setItem(name, info)
	}
	getLocal(name) {
		if (localStorage.getItem(name)) {
			return localStorage.getItem(name)
		} else {
			return null
		}
	}
	removeLocal(name) {
		localStorage.removeItem(name)
	}
	setSession(name, info) {
		this.removeLocal(name)
		sessionStorage.setItem(name, info)
	}
	getSession(name) {
		if (sessionStorage.getItem(name)) {
			return sessionStorage.getItem(name)
		} else {
			return null
		}
	}
	removeSession(name) {
		sessionStorage.removeItem(name)
	}
}
const local = new Local()
export default local