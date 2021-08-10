/*
 * @Author: your name
 * @Date: 2021-03-04 11:40:44
 * @LastEditTime: 2021-03-04 13:26:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\cookie\cookieapi.js
 */
class Cookie {
	/**
   * @method          设置cookie
   * @param name    名称
   * @param value   值
   * @param expire  有效时间（单位s,默认一周）
   */
	setCookie(name, value, expire = 7 * 60 * 60 * 24) {
		const date = new Date()
		date.setSeconds(date.getSeconds() + expire)
		document.cookie = name + '=' + escape(value) + '; expires=' + date.toGMTString()
	}
	/**
   * @method          获取cookie
   * @param name    名称
   */
	getCookie(name) {
		if (document.cookie.length > 0) {
			let startTime = document.cookie.indexOf(name + '=')
			if (startTime !== -1) {
				startTime = startTime + name.length + 1
				let endTime = document.cookie.indexOf(';', startTime)
				if (endTime === -1) endTime = document.cookie.length
				return unescape(document.cookie.substring(startTime, endTime))
			}
		}
		return ''
	}
	/**
   * @method          删除cookie
   * @param name    名称
   */
	deleteCookie(name) {
		this.setCookie(name, '', -1)
	}
}
const cookie = new Cookie()
export default cookie
