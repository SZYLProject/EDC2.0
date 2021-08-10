/*
 * @Author: 郑书华
 * @Date: 2021-03-08 14:38:38
 * @LastEditTime: 2021-08-09 10:19:23
 * @LastEditors: Please set LastEditors
 * @Description: 患者接口
 * @FilePath: \edc_web2.0\src\request\api\subject.js
 */
import { post, get } from '../http'
const subject = {
	// 添加患者
	addSubject: parmas => post('/web/subject/saveSubject', parmas),
	// 删除患者
	delSubject: parmas => post(`/web/subject/deleteSubject/${parmas}`),
	// 患者列表
	getCaseList: parmas => post('/web/subject/getSubjectInfoList', parmas),
	// 获取患者配置
	getSubjectConfig: parmas => get(`/web/subjectConfig/getSubjectConfigInfo/${parmas}`),
	// 获取患者添加配置
	getSubjectAddedInfo: parmas => get(`/web/subject/getSubjectAddedInfo/${parmas}`),
	// 获取受试者组列表
	getSubjectGroupList: parmas => get(`/web/subjectGroup/getSubjectGroupList/${parmas}`),
	// 添加患者组
	addSubjectGroup: parmas => post('/web/subjectGroup/saveSubjectGroup', parmas),
	// 删除患者组
	delSubjectGroup: parmas => post(`/web/subjectGroup/deleteSubjectGroup/${parmas}`),
	// 添加或更新患者配置
	addSubjectConfig: parmas => post('/web/subjectConfig/updateSubjectConfig', parmas),
	// 添加实际访视时间
	updateSubjectActualTime: parmas => post('/web/subjectVisit/updateActualTime', parmas),
	// 更新通用访视状态为进行中
	updateSubjectProcessing: parmas => post(`/web/subjectVisit/updateUniversalVisitStatusToProcessing/${parmas}`),
	// // 获取添加访视实际时间框
	// getPlanVisitPage: parmas => post('/web/subject/getPlanVisitPage', parmas),
	// value痕迹记录列表
	subjectDataTrail: parmas => post('/web/subjectDataTrail/listPage', parmas)
}
export default subject
