/*
 * @Author: 郑书华
 * @Date: 2021-03-08 14:29:56
 * @LastEditTime: 2021-03-10 17:43:33
 * @LastEditors: Please set LastEditors
 * @Description: system-log-controller
 * @FilePath: \edc_web2.0\src\request\api\systemLog.js
 */
import { post } from '../http'
const systemLog = {
	// 日志详情
	getLogDetail: parmas => post('/web/systemLog/getLogDetail', parmas),
	// 日志列表
	page: parmas => post('/web/systemLog/page', parmas)
}
export default systemLog
