/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-08-06 16:18:01
 * @LastEditors: Please set LastEditors
 * @Description: 研究接口
 * @FilePath: \edc_web2.0\src\request\api\research.js
 */
import {
	post, get
} from '../http'
const research = {
	// 研究列表
	getResearchList: parmas => post('/web/research/getResearchList', parmas),
	// 添加研究
	addResearch: parmas => post('/web/research/saveResearch', parmas),
	// 更新或删除研究
	updateResearch: parmas => post('/web/research/updateResearch', parmas),
	// 获取用户在该研究测试或生产环境的权限code
	getMenuByResearch: parmas => post('/web/research/getMenuByResearch', parmas),
	// 更新研究为设计状态
	updateResearchToDesign: parmas => post(`/web/research/updateResearchToDesign/${parmas}`),
	// 更新研究为发布状态
	updateResearchToFinished: parmas => post(`/web/research/updateResearchToPublished/${parmas}`),
	// 单查研究
	getResearchById: parmas => get(`/web/research/getResearchById/${parmas}`),
	// 复制研究
	copyResearch: parmas => post(`/web/research/copyResearchInfo/${parmas}`),
	// 删除研究
	deleteResearch: parmas => post(`/web/research/deleteResearch/${parmas}`),
	// 还原研究
	resetResearch: parmas => post(`/web/research/resetResearch/${parmas}`),
	// 从回收站中删除研究
	deleteResearchFromRecycleBin: parmas => post(`/web/research/deleteResearchFromRecycleBin/${parmas}`)
}
export default research
