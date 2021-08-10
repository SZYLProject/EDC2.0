/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:25
 * @LastEditTime: 2021-06-22 09:44:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\visit\mutations.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import * as STATETYPES from '../stateTypes'
const mutations = {
	[MUTATIONTYPES.SETVISITLIST](state, data) {
		state[STATETYPES.VISITLIST] = data
	},
	[MUTATIONTYPES.SETVISITLISTLOADING](state, data) {
		state[STATETYPES.VISITLISTLOADING] = data
	},
	[MUTATIONTYPES.SETVISITVERSIONPAGINATION](state, data) {
		state[STATETYPES.VISITVERSIONPAGINATION] = data
	}
}
export default mutations
