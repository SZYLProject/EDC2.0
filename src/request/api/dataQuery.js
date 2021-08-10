/*
 * @Author: 郑书华
 * @Date: 2021-03-05 13:33:07
 * @LastEditTime: 2021-05-27 17:42:46
 * @LastEditors: Please set LastEditors
 * @Description: 质疑管理
 * @FilePath: \edc_web2.0\src\request\api\dataQuery.js
 */
import { post } from '../http'
const dataQuery = {
	// 获取质疑管理列表
	getAllDataQueryListBySite: parmas => post('/web/dataQuery/getAllDataQueryListBySite', parmas),
	// 回复质疑
	addDataQuery: parmas => post('/web/dataQuery/addDataQuery', parmas),
	// 添加质疑
	addDataQueryList: parmas => post('/web/dataQuery/addDataQueryList', parmas),
	// 获取质疑列表
	getAllDataQueryList: parmas => post('/web/dataQuery/getAllDataQueryList', parmas),
	// 关闭质疑
	stopDataQueryList: parmas => post('/web/dataQuery/stopDataQueryList', parmas)
}
export default dataQuery