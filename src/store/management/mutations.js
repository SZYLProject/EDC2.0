/*
 * @Author: your name
 * @Date: 2021-04-14 16:27:21
 * @LastEditTime: 2021-04-14 16:32:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\management\mutations.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import * as STATETYPES from '../stateTypes'
const mutations = {
	[MUTATIONTYPES.SETMANAGEMENTPARAMS](state, data) {
		state[STATETYPES.MANAGEMENTPARAMS] = data
	},
	[MUTATIONTYPES.SETMANAGEMENTTYPE](state, data) {
		state[STATETYPES.MANAGEMENTTYPE] = data
	}
}
export default mutations
