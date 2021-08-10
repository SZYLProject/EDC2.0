/*
 * @Author: your name
 * @Date: 2021-03-04 11:40:44
 * @LastEditTime: 2021-08-06 12:04:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\cookie\deleter.js
 */
import state from './state'
import localApi from './localapi'
const deleter = {
	delCenterCode() {
		return localApi.removeLocal(state.centerCode)
	},
	delCenterKey() {
		return localApi.removeLocal(state.centerKey)
	},
	delEnvironmentCode() {
		return localApi.removeLocal(state.environmentCode)
	},
	delNetworkFlag() {
		return localApi.removeLocal(state.networkFlag)
	},
	delResearchCode() {
		return localApi.removeLocal(state.researchCode)
	},
	delResearchPaginationConfig() {
		return localApi.removeSession(state.researchPaginationConfig)
	},
	delRouteMoreRecord() {
		return localApi.removeLocal(state.routeMoreRecord)
	},
	delUserInfo() {
		return localApi.removeLocal(state.userInfo)
	},
	delUserToken() {
		return localApi.removeLocal(state.userToken)
	},
	delUserAuthority() {
		return localApi.removeLocal(state.userAuthority)
	},
	delResearchAuthority() {
		return localApi.removeLocal(state.researchAuthority)
	},
	delVisitVersionAlert(value) {
		return localApi.removeLocal(state.visitVersionAlert, value)
	}
}
export default deleter
