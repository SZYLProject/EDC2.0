/*
 * @Author: your name
 * @Date: 2021-03-18 18:11:34
 * @LastEditTime: 2021-07-26 09:39:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edcWeb\src\router\base.js
 */
export default [
	{
		path: '/login',
		name: 'Login',
		component: resolve => require(['../views/login/Login'], resolve) // 登录界面
	},
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '*',
		redirect: '/404'
	},
	{
		path: '/404',
		name: '404',
		component: resolve => require(['../views/error/404.vue'], resolve) // 404界面
	}
]
