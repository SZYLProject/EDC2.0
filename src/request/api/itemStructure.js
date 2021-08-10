/*
 * @Author: your name
 * @Date: 2021-03-10 16:33:58
 * @LastEditTime: 2021-05-27 17:42:25
 * @LastEditors: Please set LastEditors
 * @Description: 表单变量接口
 * @FilePath: \edc_web2.0\src\request\api\itemStructure.js
 */
import { post } from '../http'
const itemStructure = {
	// 删除变量前检查是否被使用
	checkForUse: parmas => post('/web/itemStructure/checkForUse', parmas),
	// 删除变量
	delete: parmas => post('/web/itemStructure/delete', parmas),
	// 获取当前表单变量
	getCurrentItem: parmas => post('/web/itemStructure/getCurrentItem', parmas),
	// 条件显示获取变量列表
	getVariableForCondition: parmas => post('/web/itemStructure/getVariableForCondition', parmas),
	// 获取表单变量列表
	list: parmas => post('/web/itemStructure/list', parmas),
	// 添加或修改表单变量
	save: parmas => post('/web/itemStructure/save', parmas),
	// 变量排序
	sort: parmas => post('/web/itemStructure/sort', parmas)
}
export default itemStructure