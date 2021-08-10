/*
 * @Author: your name
 * @Date: 2021-03-09 14:57:44
 * @LastEditTime: 2021-03-31 09:21:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\request\api\itemOption.js
 */
import {
	post, get
} from '../http'
const itemOption = {
	// 根据选项集code删除选项集
	deleteOption: parmas => get('/web/itemOption/deleteOption', parmas),
	// 新增选项集
	save: parmas => post('/web/itemOption/save', parmas),
	// 新增字典接口
	saveOrUpdateSystemDictionary: parmas => post('/web/systemDictionary/saveOrUpdateSystemDictionary', parmas),
	// 根据研究code查询选项集
	selectOptionList: parmas => get('/web/itemOption/selectOptionList', parmas),
	// 修改选项集
	updateOption: parmas => post('/web/itemOption/updateOption', parmas)
}
export default itemOption