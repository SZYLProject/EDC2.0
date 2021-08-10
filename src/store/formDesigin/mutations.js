/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:25
 * @LastEditTime: 2021-05-13 09:56:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\formDesigin\mutations.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import * as STATETYPES from '../stateTypes'
const mutations = {
	[MUTATIONTYPES.SETCALCULATORFORM](state, data) {
		state[STATETYPES.CALCULATORFORM] = data
	},
	[MUTATIONTYPES.SETFORMOPTIONLIST](state, data) {
		state[STATETYPES.FORMOPTIONLIST] = data
	},
	[MUTATIONTYPES.SETGROUPLIST](state, data) {
		state[STATETYPES.GROUPLIST] = data
	},
	[MUTATIONTYPES.SETGROUPTAGFORM](state, data) {
		state[STATETYPES.GROUPTAGFORM] = data
	},
	[MUTATIONTYPES.SETOPTIONFORM](state, data) {
		state[STATETYPES.OPTIONFORM] = data
	}
}
export default mutations
