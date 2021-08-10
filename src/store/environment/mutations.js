/*
 * @Author: your name
 * @Date: 2021-04-06 10:28:08
 * @LastEditTime: 2021-06-23 09:58:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\environment\mutations.js
 */
// import TYPES from '../type'
import * as MUTATIONTYPES from '../mutationTypes'
import * as STATETYPES from '../stateTypes'
const mutations = {
	[MUTATIONTYPES.SETCENTERCODE](state, data) {
		state[STATETYPES.CENTERCODE] = data
	},
	[MUTATIONTYPES.SETCENTERLIST](state, data) {
		state[STATETYPES.CENTERLIST] = data
	},
	[MUTATIONTYPES.SETTESTEEFORM](state, data) {
		state[STATETYPES.TESTEEFORM] = data
	},
	[MUTATIONTYPES.SETTESTEEDETAIL](state, data) {
		state[STATETYPES.TESTEEDETAIL] = data
	},
	[MUTATIONTYPES.SETRERUITMENTCOUNT](state, data) {
		state[STATETYPES.RERUITMENTCOUNT] = data
	}
}
export default mutations
