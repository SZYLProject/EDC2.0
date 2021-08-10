/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-08-06 16:15:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\request\index.js
 */
/**
 * api 接口的统一出口
*/
import center from './api/center'
import dataQuery from './api/dataQuery'
import formData from './api/formData'
import file from './api/file'
import home from './api/home'
import itemStructure from './api/itemStructure'
import itemOption from './api/itemOption'
import itemGroup from './api/itemGroup'
import research from './api/research'
import subject from './api/subject'
import systemLog from './api/systemLog'
import user from './api/user'
import visitForm from './api/visitForm'
export default {
	file,	research, itemGroup, itemOption, home, center, formData, dataQuery, subject, systemLog, user, visitForm, itemStructure
}
