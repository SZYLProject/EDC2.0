/*
 * @Author: your name
 * @Date: 2021-03-10 16:39:08
 * @LastEditTime: 2021-05-19 15:40:19
 * @LastEditors: Please set LastEditors
 * @Description: 表单录入接口
 * @FilePath: \edc_web2.0\src\request\api\formData.js
 */
import { post } from '../http'
const formData = {
	// 录入的表单展示接口
	getNodeData: parmas => post('/web/formData/getNodeData', parmas),
	// 预览的表单展示接口
	getInputPreview: parmas => post('/web/design/preview', parmas),
	// // 录入的表单展示接口
	// getEntryPreview: parmas=> post('/web/design/inputPreview', parmas),
	// 重复组病人数据删除
	removeFormData: parmas => post('/web/formData/removeFormData', parmas),
	// 病人数据录入
	saveOrUpdateFormData: parmas => post('/web/formData/saveOrUpdateFormData', parmas),
	// 备注添加修改删除
	updateRemark: parmas => post('/web/formData/updateRemark', parmas),
	// SDV按钮
	updateSDV: parmas => post('/web/formData/updateSDV', parmas),
	// 病人表单标记
	saveOrUpdateMarkStatus: parmas => post('/web/subjectFormMarkStatus/saveOrUpdateMarkStatus', parmas),
	// 组数据录入
	saveOrUpdateMutiGroupData: parmas => post('web/formData/saveOrUpdateMutiGroupData', parmas)
}
export default formData