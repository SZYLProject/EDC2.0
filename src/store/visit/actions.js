/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:25
 * @LastEditTime: 2021-07-01 14:28:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\visit\actions.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import api from '@/request/index'
import { Message } from 'element-ui'
const actions = {
	/* 新增ACTIONS */
	// 获取访视列表
	getVisitFormTree({ commit }, params) {
		commit(MUTATIONTYPES.SETVISITLISTLOADING, true)
		commit(`base/${MUTATIONTYPES.SETISEMPTY}`, false, { root: true })
		return new Promise((resolve, reject) => {
			api.visitForm.getVisitFormTree(params).then((res) => {
				if (res && res.code === 200) {
					commit(MUTATIONTYPES.SETVISITLIST, res.data || [])
					commit(MUTATIONTYPES.SETVISITLISTLOADING, false)
					resolve(res.data)
				} else {
					if (res && res.msg) Message.error(res.msg)
					commit(MUTATIONTYPES.SETVISITLIST, [])
					commit(MUTATIONTYPES.SETVISITLISTLOADING, false)
					reject()
				}
				commit(`base/${MUTATIONTYPES.SETISEMPTY}`, !((res.data || []).length), { root: true })
			})
		}).catch(() => {
			commit(`base/${MUTATIONTYPES.SETISEMPTY}`, true, { root: true })
		})
	}
}
export default actions
