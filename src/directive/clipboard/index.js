/*
 * @Author: your name
 * @Date: 2021-03-08 17:59:06
 * @LastEditTime: 2021-03-31 09:25:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\clipboard\index.js
 */
const Clipboard = require('clipboard')
export default {
	bind(el, binding) {
		if (binding.arg === 'success') {
			el._v_clipboard_success = binding.value
		} else if (binding.arg === 'error') {
			el._v_clipboard_error = binding.value
		} else {
			const clipboard = new Clipboard(el, {
				text() {
					return binding.value
				},
				action() {
					return binding.arg === 'cut' ? 'cut' : 'copy'
				}
			})
			clipboard.on('success', e => {
				const callback = el._v_clipboard_success
        callback && callback(e) // eslint-disable-line
			})
			clipboard.on('error', e => {
				const callback = el._v_clipboard_error
        callback && callback(e) // eslint-disable-line
			})
			el._v_clipboard = clipboard
		}
	},
	update(el, binding) {
		if (binding.arg === 'success') {
			el._v_clipboard_success = binding.value
		} else if (binding.arg === 'error') {
			el._v_clipboard_error = binding.value
		} else {
			el._v_clipboard.text = function() {
				return binding.value
			}
			el._v_clipboard.action = function() {
				return binding.arg === 'cut' ? 'cut' : 'copy'
			}
		}
	},
	unbind(el, binding) {
		if (binding.arg === 'success') {
			delete el._v_clipboard_success
		} else if (binding.arg === 'error') {
			delete el._v_clipboard_error
		} else {
			el._v_clipboard.destroy()
			delete el._v_clipboard
		}
	}
}
