/*
 * @Author: your name
 * @Date: 2021-03-09 10:36:36
 * @LastEditTime: 2021-08-09 09:29:34
 * @LastEditors: Please set LastEditors
 * @Description: 主页接口
 * @FilePath: \edc_web2.0\src\request\api\home.js
 */
import { get } from '../http'
const home = {
	// 主页中心受试者进度
	centerHomepage: parmas => get(`/web/homepage/getCenterSubjectProportion/${parmas}`),
	// 主页中心月季度
	centerHomepageTime: parmas => get(`/web/homepage/getMonthlySubjectCountList/${parmas}`),
	// 主页研究受试者进度
	researchHomepage: parmas => get(`/web/homepage/getSubjectProportion/${parmas}`)
}
export default home
