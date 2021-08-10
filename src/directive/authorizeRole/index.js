/*
 * @Author: your name
 * @Date: 2021-03-10 15:32:17
 * @LastEditTime: 2021-08-06 12:02:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\authorizeRole\index.js
 */
import { hasUserRole } from './authorizeRole.js'
export default {
	inserted: function(el, binding) {
		const val = binding.value
		if (val && val.menuContainer.environment !== '0') {
			if (hasUserRole(val.menuContainer.codeContainer, val.itemCode) === -1) {
				el.parentNode.removeChild(el) // 删除元素
			}
		}
	}
}
