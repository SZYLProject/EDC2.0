/*
 * @Author: your name
 * @Date: 2021-03-10 15:15:34
 * @LastEditTime: 2021-08-09 11:37:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\authorizeFunction\index.js
 */
import { hasUserType } from './authorizeFunction.js'
export default {
	inserted: function(el, binding) {
		const value = binding.arg || binding.value
		if (value) {
			if (!hasUserType(value.code, value.list || [])) {
				console.log(el)
				el.parentNode && el.parentNode.removeChild(el) // 删除元素
			}
		}
	},
	update: function(el, binding) {
		const value = binding.arg || binding.value
		console.log(value)
		if (value) {
			if (!hasUserType(value.code, value.list || [])) {
				el.parentNode && el.parentNode.removeChild(el) // 删除元素
			}
		}
	}
}
