/*
 * @Author: your name
 * @Date: 2021-03-30 15:16:18
 * @LastEditTime: 2021-06-21 18:33:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\filters\index.js
 */
// get dictionary的label
export function filterListLabel(value = '', dictionary = [], valueKey = 'value', labelKey = 'label') {
	const info =	dictionary.find(item => { return item[valueKey] === value })
	return info ? info[labelKey] : ''
}
// get dictionary的tem
export function filterListItem(value = '', dictionary = [], valueKey = 'value') {
	const info =	dictionary.find(item => { return item[valueKey] === value })
	return info || {}
}
// 获取特别类型date
export function filterSubstringDate(date) {
	return date ? date.substring(0, 10).replace(/-/g, '/') : ''
}