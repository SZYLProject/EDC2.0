/*
 * @Author: your name
 * @Date: 2021-03-10 15:18:20
 * @LastEditTime: 2021-08-09 10:38:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\authorizeFunction\authorizeFunction.js
 */
export function hasUserType(code, roleList) {
	// 默认是没有权限显示的
	let result = null
	if (roleList) {
		result = roleList.find(item => {
			return item === code
		})
	}
	return !!result
}
