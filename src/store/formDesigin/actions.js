/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-07-01 14:27:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\formDesigin\actions.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import { Message } from 'element-ui'
import api from '@/request'
const actions = {
	getGroupSelectList({ commit }, paramas) {
		return new Promise((resolve, reject) => {
			api.itemGroup.selectList(paramas).then((res) => {
				if (res && res.code === 200) {
					commit(MUTATIONTYPES.SETGROUPLIST, res.data)
					resolve(res.data)
				} else {
					if (res && res.msg) Message.error(res.msg)
					commit(MUTATIONTYPES.SETGROUPLIST, [])
					reject()
				}
			})
		}).catch(() => {
		})
	}
}
export default actions
