/*
 * @Author: your name
 * @Date: 2021-03-08 14:45:44
 * @LastEditTime: 2021-03-08 14:46:45
 * @LastEditors: Please set LastEditors
 * @Description: 文件上传
 * @FilePath: \edc_web2.0\src\request\api\file.js
 */
import { post } from '../http'
const file = {
	// 文件上传
	uploadFile: parmas => post('/web/file/uploadFile', parmas)
}
export default file
