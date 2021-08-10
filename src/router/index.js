/*
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-05-12 13:58:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const NProgress = require('nprogress') // Progress 进度条
import 'nprogress/nprogress.css'
NProgress.configure({ easing: 'ease', speed: 200 })
import locals from '@/local'
import baseRoute from './baseRoute'
import mainRoute from './mainRoute'
Vue.use(VueRouter)
const routes = [{
	path: '/main',
	component: () => import('../views/Main.vue'),
	children: mainRoute
}, ...baseRoute]
const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (to.path === '/login') {
		locals.delResearchPaginationConfig()
	}
	const token = locals.getUserToken()
	if (token) {
		next()
	} else {
		if (to.path !== '/login') {
			next({ path: '/login' })
		} else {
			next()
		}
	}
})
router.afterEach(() => {
	NProgress.done() // 结束Progress
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default router
