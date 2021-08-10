/*
 * @Author: your name
 * @Date: 2021-03-09 11:17:47
 * @LastEditTime: 2021-04-13 14:39:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\echarts\echarts.js
 */
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/scatter')
// 引入提示框和title组件
require('echarts/lib/component/legend')
require('echarts/lib/component/graphic')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/visualMap')
export default echarts