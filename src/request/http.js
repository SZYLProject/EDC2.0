/*
 * @Author: your name
 * @Date: 2021-04-23 16:45:24
 * @LastEditTime: 2021-08-06 21:34:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\request\http.js
 */
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import locals from '@/local'
import { baseUrl } from './url'
// axios.defaults.baseURL = baseUrl
// axios.defaults.timeout = 20000
// 创建axios实例
const httpService = axios.create({
	baseURL: baseUrl,
	// 请求超时时间
	timeout: 20000 // 需自定义
})
httpService.interceptors.request.use(
	config => {
		config.headers.common['token'] = locals.getUserToken()
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
httpService.interceptors.response.use(
	response => {
		const res = response.data
		const networkFlag = locals.getNetworkFlag()
		if (res.code === 205) { // token 过期
			if (networkFlag) {
				locals.setNetworkFlag(false)
				Message.error('登录过期，请重新登录！')
				locals.delUserToken('token')
				router.replace({
					path: '/login',
					query: { redirect: router.currentRoute.fullPath }
				})
			}
			return Promise.reject('error')
		} else {
			return Promise.resolve(response.data)
		}
	},
	error => {
		const networkFlag = locals.getNetworkFlag()
		if (networkFlag) {
			locals.setNetworkFlag(false)
			if (error && error.response) {
				switch (error.response.status) {
				case 400:
					error.message = '错误请求'
					Message.error('http版本不支持该请求')
					break
				case 403:
					error.message = '拒绝访问'
					Message.error('拒绝访问')
					break
				case 404:
					error.message = '请求错误,未找到该资源'
					Message.error('请求错误,未找到该资源')
					break
				case 405:
					error.message = '请求方法未允许'
					Message.error('请求方法未允许')
					break
				case 408:
					error.message = '请求超时'
					Message.error('请求超时')
					break
				case 500:
					error.message = '服务器端出错'
					Message.error('服务器端出错')
					break
				case 501:
					error.message = '网络未实现'
					Message.error('网络未实现')
					break
				case 502:
					error.message = '网络错误'
					Message.error('网络错误')
					break
				case 503:
					error.message = '服务不可用'
					Message.error('服务不可用')
					break
				case 504:
					error.message = '网络超时'
					Message.error('网络超时')
					break
				case 505:
					error.message = 'http版本不支持该请求'
					Message.error('http版本不支持该请求')
					break
				default:
					error.message = `连接错误${error.response.status}`
				}
			} else {
				error.message = '连接到服务器失败'
				Message.error('连接到服务器失败')
			}
		}
		return Promise.reject(error)
	}
)
/**
 * get方法，对应get请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
*/
export function get(url, params) {
	return new Promise((resolve, reject) => {
		httpService({
			url: url,
			method: 'get',
			params: params
		}).then(response => {
			resolve(response)
		}).catch(error => {
			resolve(error)
		})
	})
}
/**
 * post方法，对应post请求
 * @param {String} url  请求的url地址
 * @param {Object} params 请求时携带的参数  json
*/
export function post(url, params = {}) {
	const researchCode = locals.getResearchCode()
	return new Promise((resolve, reject) => {
		httpService({
			url: url,
			method: 'post',
			data: { researchCode, ...params }
		}).then(response => {
			resolve(response)
		}).catch(error => {
			resolve(error)
		})
	})
}
