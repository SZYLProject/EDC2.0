/*
 * @Author: your name
 * @Date: 2021-03-04 14:46:14
 * @LastEditTime: 2021-03-30 16:29:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\local\local.js
 */
import deleter from './deleter'
import getter from './getter'
import setter from './setter'
import state from './state'
const locals = { ...deleter, ...getter, ...setter, ...state }
export default locals