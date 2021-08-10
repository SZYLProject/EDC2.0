/*
 * @Author: your name
 * @Date: 2021-03-10 15:34:03
 * @LastEditTime: 2021-03-31 09:22:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\preventReClick\index.js
 */
export default {
	inserted: function(el, binding) {
		el.addEventListener('click', () => {
			if (!el.disabled) {
				el.disabled = true
				setTimeout(() => {
					el.disabled = false
				}, binding.value || 3000)
			}
		})
	}
}