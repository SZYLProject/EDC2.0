/*
 * @Author: your name
 * @Date: 2021-04-26 10:50:12
 * @LastEditTime: 2021-04-26 11:57:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\utils\date.js
 */
/**
 * 时间戳转标准格式 2016-09-05 13:46:52
 * @returns {{_year: string, _month: string, _day: string, getYear: date.getYear, getMonth: date.getMonth, getDay: date.getDay}}
 */
function timestampFormat(str = new Date(), flag) {
	const date = new Date(str)
	const yy = date.getFullYear()
	const mmmm = date.getMonth() + 1
	const dd = date.getDate()
	const h = date.getHours()
	const m = date.getMinutes()
	const s = date.getSeconds()
	if (flag) {
		return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd)
	} else {
		return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
	}
}
// 获取当前年季度2010-1
function getQuarter(flag) {
	flag = flag || '-'
	const year = new Date().getFullYear()
	const month = new Date().getMonth() + 1
	const qurate = Math.ceil(month / 4)
	const date = `${year}${flag}${qurate}`
	return date
}
// 获取获取各种时间
function getTime(str) {
	const date = str ? new Date(str) : new Date()
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const seconds = date.getSeconds()
	return { year, month, day, hour, minute, seconds }
}
/**
 * @description 格式化 时间
 * @param date 06/24/2016 12:14:25
 * @returns 2016-06-24 12:14:25
 */
function dateFormat(date) {
	const yy = date.getFullYear()
	const mmmm = date.getMonth() + 1
	const dd = date.getDate()
	const h = date.getHours()
	const m = date.getMinutes()
	const s = date.getSeconds()
	return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
}
export { timestampFormat, getQuarter, getTime, dateFormat }
