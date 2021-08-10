/*
 * @Author: your name
 * @Date: 2021-03-10 16:16:53
 * @LastEditTime: 2021-07-22 14:16:57
 * @LastEditors: Please set LastEditors
 * @Description: 访视表单接口
 * @FilePath: \edc_web2.0\src\request\api\visitForm.js
 */
import { post, get } from '../http'
const visitForm = {
	// 新增重复访视
	addRepeatVisit: parmas => post('/web/subjectVisit/addUnplannedOrUniversalRepeatVisit', parmas),
	// 移动表单
	moveForm: parmas => post('/web/visitForm/moveForm', parmas),
	// 复制
	copyForm: parmas => post('/web/visitForm/copyForm', parmas),
	// 删除表单访视
	delete: parmas => post(`/web/visitForm/deleteStructureVisitFormInfo/${parmas}`),
	// 根据id获取访视或表单详情
	getCurrentForm: parmas => post('/web/visitForm/getCurrentForm', parmas),
	// 获取访视或表单列表
	getVisitFormListForCondition: parmas => post('/web/visitForm/getVisitFormListForCondition', parmas),
	// 获取访视表单树,获取表单访视列表
	getVisitFormTree: parmas => get(`/web/visitForm/getStructureVisitInfoList/${parmas}`),
	// 查询录入阶段的访视表单列表
	getSubjectVisitFormList: parmas => get(`/web/subjectVisit/getSubjectVisitFormList/${parmas}`),
	// 获取计划访视配置信息
	getVisitPlan: parmas => get('/web/plannedVisitConfig/getPlannedVisitConfigInfo', parmas),
	// 新增或修改访视表单
	save: parmas => post('/web/visitForm/saveOrUpdateStructureVisitForm', parmas),
	// 新增或修改计划访视
	saveVisitPlan: parmas => post('/web/plannedVisitConfig/saveOrUpdatePlannedVisitConfig', parmas),
	// 查询非计划和通用重复访视列表
	getUnplannedRepeatVisitList: parmas => get(`/web/subjectVisit/getUnplannedAndUniversalRepeatVisitList/${parmas}`),
	// 排序
	sort: parmas => post('/web/visitForm/sort', parmas)
}
export default visitForm
