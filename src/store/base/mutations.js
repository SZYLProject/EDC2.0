/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:25
 * @LastEditTime: 2021-08-06 15:22:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\visit\mutations.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import * as STATETYPES from '../stateTypes'
import locals from '@/local'
const mutations = {
	[MUTATIONTYPES.SETISEMPTY](state, data) {
		state[STATETYPES.ISEMPTY] = data
	},
	[MUTATIONTYPES.SETISLEAVE](state, data) {
		state[STATETYPES.ISLEAVE] = data
	},
	[MUTATIONTYPES.SETISLOADING](state, data) {
		state[STATETYPES.ISLOADING] = data
	},
	[MUTATIONTYPES.SETDIALOGINFO](state, { visible, component, title, iconfontType, iconfont, type, loading }) {
		state[STATETYPES.DIALOGINFO] = {
			title,
			component,
			visible,
			iconfontType,
			iconfont,
			type,
			loading
		}
	},
	[MUTATIONTYPES.SETNAVBARTYPE](state, data) {
		state[STATETYPES.NAVBARTYPE] = data
	},
	// [MUTATIONTYPES.SETPAGINATIONCONFIG](state, data) {
	//   state[STATETYPES.PAGINATIONCONFIG] = data
	// },
	[MUTATIONTYPES.SETUSERINFO](state, data) {
		locals.setUserInfo(data)
		state[STATETYPES.USERINFO] = data
	},
	[MUTATIONTYPES.SETUSERAUTHORITY](state, data) {
		locals.setUserAuthority(data)
		state[STATETYPES.USERAUTHORITY] = data
	},
	[MUTATIONTYPES.SETRESEARCHRAUTHORITY](state, data) {
		state[STATETYPES.RESEARCHRAUTHORITY] = data
	}
}
export default mutations
