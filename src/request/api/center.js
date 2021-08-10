/*
 * @Author: 郑书华
 * @Date: 2021-03-03 18:25:42
 * @LastEditTime: 2021-08-06 17:01:08
 * @LastEditors: Please set LastEditors
 * @Description: 中心接口
 * @FilePath: \edc_web2.0\src\request\api\center.js
 */
import { post, get } from '../http'
const center = {
	// 添加中心
	saveCenter: parmas => post('/web/center/saveCenter', parmas),
	// 获取中心列表
	getCenterList: parmas => get('/web/center/getCenterList', parmas),
	// 通过研究code获取中心列表
	getCenterSelectList: parmas => get(`/web/center/getCenterSelectList/${parmas}`),
	// 更新
	updateCenter: parmas => post('/web/center/updateCenter', parmas)
}
export default center
