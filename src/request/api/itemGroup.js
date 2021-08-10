/*
 * @Author: your name
 * @Date: 2021-03-10 16:42:57
 * @LastEditTime: 2021-03-10 16:46:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\request\api\itemGroup.js
 */
import { post, get } from '../http'
const itemGroup = {
	// 添加组
	addGroup: parmas => post('/web/itemGroup/addGroup', parmas),
	// 根据组code删除组
	deleteGroup: parmas => get('/web/itemGroup/deleteGroup', parmas),
	// 查询组详情
	seedetail: parmas => post('/web/itemGroup/seedetail', parmas),
	// 根据研究code查询组列表
	selectList: parmas => get('/web/itemGroup/selectList', parmas),
	// 修改组
	updateGroup: parmas => post('/web/itemGroup/updateGroup', parmas)
}
export default itemGroup