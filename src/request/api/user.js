/*
 * @Author: your name
 * @Date: 2021-03-08 14:48:05
 * @LastEditTime: 2021-08-09 10:22:25
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理
 * @FilePath: \edc_web2.0\src\request\api\user.js
 */
import { post, get } from '../http'
const user = {
	// 新增用户
	addUser: parmas => post('/web/user/addUser', parmas),
	// 用户登录
	edcLogin: parmas => post('/web/user/edcLogin', parmas),
	// 修改用户
	editUser: parmas => post('/web/user/editUser', parmas),
	// 重置密码
	forgetPwd: parmas => post('/web/user/forgetPwd', parmas),
	// 获取登录验证码
	getLoginCode: parmas => get('/web/verification/getVerificationCode', parmas),
	// 获取研究下的用户列表
	getResearchUser: parmas => get(`/web/researchParticipation/getUserList/${parmas}`),
	// 获取用户角色
	getRoleByType: parmas => post('/web/user/getRoleByType', parmas),
	// 获取用户信息
	getUserInfoByName: parmas => post('/web/user/getUserInfoByName', parmas),
	// 添加用户
	pullUser: parmas => post('/web/user/pullUser', parmas),
	// 修改密码
	updatePassword: parmas => post('/web/user/modifyPassword', parmas)
}
export default user
