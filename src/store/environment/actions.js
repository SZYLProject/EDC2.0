/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-08-06 17:50:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\store\entry\actions.js
 */
import * as MUTATIONTYPES from '../mutationTypes'
import { Message } from 'element-ui'
import api from '@/request'
const actions = {
	// 获取中心列表
	getCenterSelectList({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.center.getCenterSelectList(params).then((res) => {
				if (res && res.code === 200) {
					commit(MUTATIONTYPES.SETCENTERLIST, res.data || [])
					resolve(res.data)
				} else {
					commit(MUTATIONTYPES.SETCENTERLIST, [])
					if (res && res.msg) Message.error(res.msg)
					reject()
				}
			}).catch(() => {
				reject()
			})
		}).catch(() => {
		})
	},
	// 获取患者添加的配置
	getSubjectAddedInfo({ commit }, params) {
		return new Promise((resolve, reject) => {
			commit(`base/${MUTATIONTYPES.SETISLOADING}`, true, { root: true })
			api.subject.getSubjectAddedInfo(params.researchCode).then((res) => {
				commit(`base/${MUTATIONTYPES.SETISLOADING}`, false, { root: true })
				if (res && res.code === 200) {
					const testeeGroupList = (res.data.subjectGroupVoList || []).map(item => {
						return { ...item, groupValue: '' }
					})
					const testeeFormList = res.data.subjectSettingVoList || []
					const formParams = {}
					testeeFormList.forEach(item => {
						formParams[item.prop] = ''
					})
					commit(MUTATIONTYPES.SETTESTEEFORM, { ...params, ...formParams, testeeGroupList, subjectNumber: '' })
					commit(MUTATIONTYPES.SETTESTEEDETAIL, { testeeFormList, numberGenerationMode: res.data.numberGenerationMode })
					resolve(res.data)
				} else {
					commit(MUTATIONTYPES.SETTESTEEDETAIL, { testeeFormList: [] })
					commit(MUTATIONTYPES.SETTESTEEFORM, { ...params, subjectNumber: '' })
					reject()
				}
			})
		}).catch(() => {
			commit(`base/${MUTATIONTYPES.SETISLOADING}`, false, { root: true })
		})
	}
}
export default actions
