/*
 * @Author: your name
 * @Date: 2021-04-22 09:58:47
 * @LastEditTime: 2021-04-22 10:47:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\postcss.config.js
 */
const autoprefixer = require('autoprefixer')
module.exports = {
	plugins: [
		autoprefixer({
			// ios 14 13
			// 全球浏览器的市场份额 大于1%的浏览器
			overrideBrowserslist: ['last 2 versions', '>1%']
		})
	]
}
