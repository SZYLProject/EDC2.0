/*
 * @Author: your name
 * @Date: 2021-03-10 15:32:11
 * @LastEditTime: 2021-03-31 09:25:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\authorizeRole\authorizeRole.js
 */
export function hasUserRole(codeContainer, itemCode) {
	// 默认是没有权限显示的
	let result = -1
	if (codeContainer) {
		result = codeContainer.findIndex(item => {
			return item === itemCode
		})
	}
	return result
}