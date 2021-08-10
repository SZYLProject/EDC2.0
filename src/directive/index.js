/*
 * @Author: your name
 * @Date: 2021-03-08 17:55:29
 * @LastEditTime: 2021-08-06 12:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\directive\index.js
 */
import Vue from 'vue'
import dragDialog from './dragDialog/index'
import clipboard from './clipboard/index'
import authorizeFunction from './authorizeFunction/index'
import authorizeRole from './authorizeRole/index'
import preventReClick from './preventReClick/index'
const directives = {
	'dragDialog': dragDialog,
	'clipboard': clipboard,
	'authorizeFunction': authorizeFunction,
	'authorizeRole': authorizeRole,
	'preventReClick': preventReClick
}
export const installFn = function() {
	Object.keys(directives).map(item => {
		Vue.directive(item, directives[item])
	})
}
installFn()
