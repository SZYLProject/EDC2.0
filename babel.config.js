/*
 * @Author: your name
 * @Date: 2021-04-22 09:58:47
 * @LastEditTime: 2021-04-23 15:12:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\babel.config.js
 */
module.exports = {
	'presets': ['@vue/app'],
	'plugins': [
		[
			'component',
			{
				'libraryName': 'element-ui',
				'styleLibraryName': 'theme-chalk'
			}
		],
		['@babel/plugin-transform-runtime']
	]
}