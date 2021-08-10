/*
 * @Author: your name
 * @Date: 2021-03-04 11:40:44
 * @LastEditTime: 2021-08-06 12:04:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\cookie\getter.js
 */
import state from './state'
import localApi from './localapi'
const getter = {
	getCenterCode() {
		return localApi.getLocal(state.centerCode)
	},
	getCenterKey() {
		return localApi.getLocal(state.centerKey)
	},
	getEnvironmentCode() {
		return Number(localApi.getLocal(state.environmentCode)) || 1
	},
	getNetworkFlag() {
		const info = localApi.getLocal(state.networkFlag)
		return info ? JSON.parse(info) : false
	},
	getResearchCode() {
		return localApi.getLocal(state.researchCode) || ''
	},
	getResearchPaginationConfig() {
		const info = localApi.getSession(state.researchPaginationConfig)
		return info ? JSON.parse(info) : null
	},
	getRouteMoreRecord() {
		const info = localApi.getLocal(state.routeMoreRecord)
		return info ? JSON.parse(info) : null
	},
	getResearchAuthority() {
		const info = localApi.getLocal(state.researchAuthority)
		return info ? JSON.parse(info) : []
	},
	getUserInfo() {
		const info = localApi.getLocal(state.userInfo)
		return info ? JSON.parse(info) : null
	},
	getUserToken() {
		return localApi.getLocal(state.userToken) || ''
	},
	getUserAuthority() {
		const info = localApi.getLocal(state.userAuthority)
		return info ? JSON.parse(info) : []
	},
	getVisitVersionAlert() {
		return localApi.getLocal(state.visitVersionAlert) || ''
	}
}
export default getter
