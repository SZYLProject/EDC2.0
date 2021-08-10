/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:25
 * @LastEditTime: 2021-08-06 15:32:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\visit\state.js
 */
import * as STATETYPES from '../stateTypes'
import locals from '@/local'
const state = {
	[STATETYPES.ISLEAVE]: true,
	[STATETYPES.ISEMPTY]: false,
	[STATETYPES.ISLOADING]: false,
	[STATETYPES.DIALOGINFO]: {
		visible: false,
		title: '',
		component: {},
		type: 1
	},
	[STATETYPES.NAVBARTYPE]: '', // navBar类型
	[STATETYPES.USERINFO]: locals.getUserInfo() || [], // 用户信息
	[STATETYPES.USERAUTHORITY]: locals.getUserAuthority() || [], // 用户权限
	[STATETYPES.RESEARCHRAUTHORITY]: []// 研究权限
}
export default state
