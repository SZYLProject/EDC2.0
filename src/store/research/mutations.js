/*
 * @Author: your name
 * @Date: 2021-04-14 16:27:21
 * @LastEditTime: 2021-06-24 10:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\management\mutations.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import * as STATETYPES from '../stateTypes'
const mutations = {
	[MUTATIONTYPES.SETRESEARCHSTATUS](state, data) {
		state[STATETYPES.RESEARCHSTATUS] = data
	},
	[MUTATIONTYPES.SETRESEARCHNAME](state, data) {
		state[STATETYPES.RESEARCHNAME] = data
	},
	[MUTATIONTYPES.SETRESEARCHINFO](state, { status, researchName, researchCode, info }) {
		state[STATETYPES.RESEARCHINFO] = info
		state[STATETYPES.RESEARCHSTATUS] = status
		state[STATETYPES.RESEARCHNAME] = researchName
		state[STATETYPES.RESEARCHCODE] = researchCode
	}
}
export default mutations
