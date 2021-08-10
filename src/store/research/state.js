/*
 * @Author: your name
 * @Date: 2021-04-14 16:27:21
 * @LastEditTime: 2021-06-22 18:13:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\management\state.js
 */
import * as STATETYPES from '../stateTypes'
const state = {
	[STATETYPES.RESEARCHSTATUS]: 0,
	[STATETYPES.RESEARCHNAME]: '',
	[STATETYPES.RESEARCHCODE]: '',
	[STATETYPES.RESEARCHINFO]: {}
}
export default state
