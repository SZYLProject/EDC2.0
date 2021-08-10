/*
 * @Author: your name
 * @Date: 2020-12-23 17:29:07
 * @LastEditTime: 2021-08-06 12:04:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts_demo\src\cookie\setter.ts
 */
import state from './state'
import localApi from './localapi'
const setter = {
	setCenterCode(value) {
		return localApi.setLocal(state.centerCode, value)
	},
	setCenterKey(value) {
		return localApi.setLocal(state.centerKey, value)
	},
	setEnvironmentCode(value) {
		return localApi.setLocal(state.environmentCode, value)
	},
	setNetworkFlag(value) {
		return localApi.setLocal(state.networkFlag, value)
	},
	setResearchCode(value) {
		return localApi.setLocal(state.researchCode, value)
	},
	setResearchPaginationConfig(value) {
		return localApi.setSession(state.researchPaginationConfig, JSON.stringify(value))
	},
	setRouteMoreRecord(name, value) {
		const info = JSON.parse(localApi.getLocal(state.routeMoreRecord) || '{}')
		info[name] = value
		return localApi.setLocal(state.routeMoreRecord, JSON.stringify(info))
	},
	setResearchAuthority(value) {
		return localApi.setLocal(state.researchAuthority, JSON.stringify(value))
	},
	setUserInfo(value) {
		return localApi.setLocal(state.userInfo, JSON.stringify(value))
	},
	setUserToken(value) {
		return localApi.setLocal(state.userToken, value)
	},
	setUserAuthority(value) {
		return localApi.setLocal(state.userAuthority, JSON.stringify(value))
	},
	setVisitVersionAlert(value) {
		return localApi.setLocal(state.visitVersionAlert, value)
	}
}
export default setter
