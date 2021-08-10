/*
 * @Author: your name
 * @Date: 2021-05-12 14:16:42
 * @LastEditTime: 2021-05-12 14:35:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utils\loading.js
 */
import { Loading } from 'element-ui'
class Loadings {
	constructor() {
		this.loadingCount = 0
		this.loading
	}
	startLoading() {
		this.loading = Loading.service({
			lock: true,
			text: '加载中……',
			fullscreen: false
		})
	}
	endLoading() {
		this.loading.close()
	}
	showLoading() {
		if (this.loadingCount === 0) {
			this.startLoading()
		}
		this.loadingCount += 1
	}
	hideLoading() {
		if (this.loadingCount <= 0) {
			return
		}
		this.loadingCount -= 1
		if (this.loadingCount === 0) {
			this.endLoading()
		}
	}
}
const loadings = new Loadings()
export {
	loadings
}
