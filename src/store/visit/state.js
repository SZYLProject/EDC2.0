/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:25
 * @LastEditTime: 2021-06-22 09:40:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\visit\state.js
 */
import * as STATETYPES from '../stateTypes'
const state = {
	/* 新增state */
	[STATETYPES.VISITLIST]: [],
	[STATETYPES.VISITLISTLOADING]: [],
	[STATETYPES.VISITVERSIONPAGINATION]: {}
}
export default state
