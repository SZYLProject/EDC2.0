/*
 * @Author: your name
 * @Date: 2021-03-09 11:17:56
 * @LastEditTime: 2021-04-13 14:51:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\echarts\index.js
 */
import echarts from './echarts.js'
/**
 * @method          初始化图表
 * domId          id
 */
export const initChart = (dom) => {
	const myChart = echarts.init(dom)
	return myChart
}
/**
 * @method          获取饼图
 * config            参数
 */
export const getPieOption = (config) => {
	const title = config.title || {}
	const legend = config.legend || {}
	const series = config.series || {}
	const color = config.color || []
	const option = {
		title: {
			show: title.show || true,
			text: title.tetx || '',
			left: title.left | 0,
			top: title.top | 0,
			textStyle: {
				fontSize: title.size | 0,
				color: title.color || '#333333',
				fontWeight: title.fontWeight || 'bold'
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		legend: {
			orient: legend.orient || 'vertical',
			right: 10,
			formatter: legend.formatter,
			textStyle: {
				fontSize: legend.size || 0,
				color: legend.color || '#787878'
			},
			data: legend.data || []
		},
		color: color,
		series: [
			{
				name: series.name,
				type: 'pie',
				bottom: series.bottom || 20,
				radius: series.radius || ['70%', '100%'],
				avoidLabelOverlap: true,
				center: series.center || ['50%', '55%'],
				label: series.label || {},
				labelLine: {
					show: series.labelLine || false
				},
				data: series.data
			}
		]
	}
	return option
}
/**
 * @method          获取柱图
 * title            标题
 * legend            图例
 * series            数据
 */
export const getBarOption = (config) => {
	const title = config.title || {}
	const grid = config.grid || {}
	const xAxis = config.xAxis || {}
	const yAxis = config.yAxis || {}
	const series = config.series || {}
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'none'
			}
		},
		title: {
			show: title.show || true,
			text: title.tetx || '',
			left: title.left | 0,
			top: title.top | 0,
			textStyle: {
				fontSize: title.size | 0,
				color: title.color || '#333333',
				fontWeight: title.fontWeight || 'bold'
			}
		},
		grid: {
			left: grid.left || '2%',
			right: grid.right || '3%',
			bottom: grid.bottom || '3%',
			top: grid.top || '15%',
			containLabel: grid.containLabel || true
		},
		xAxis: {
			type: 'category',
			interval: xAxis.interval || 30,
			axisTick: {
				show: xAxis.axisTickShow || false
			},
			axisLine: {
				lineStyle: {
					color: xAxis.axisLineStyle || '#DCDCDC'
				}
			},
			axisLabel: {
				fontSize: xAxis.size,
				color: xAxis.color || '#999999',
				interval: 0,
				formatter: function(value) {
					// 处理x轴文字过长
					return value
				}
			},
			minorSplitLine: {
				show: false
			},
			data: xAxis.data
		},
		yAxis: {
			type: 'value',
			minInterval: yAxis.minInterval || 1,
			axisTick: {
				show: yAxis.axisTickShow || false
			},
			axisLine: {
				lineStyle: {
					color: yAxis.axisLineStyle || '#DCDCDC'
				},
				show: yAxis.axisLineShow || true
			},
			splitLine: {
				lineStyle: {
					color: yAxis.splitLineStyle || '#EEEEEE'
				},
				show: yAxis.splitLineShow || false
			},
			axisLabel: {
				fontSize: yAxis.size,
				color: yAxis.color || '#999999'
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: [
			{
				data: series.data,
				type: 'bar',
				barWidth: series.barWidth | 0,
				showBackground: true,
				itemStyle: series.itemStyle || {}
			}
		]
	}
	return option
}
/**
 * @method          获取线
 * title            标题
 * legend            图例
 * series            数据
 */
export const getLineOption = (config) => {
	const title = config.title || {}
	const grid = config.grid || {}
	const xAxis = config.xAxis || {}
	const yAxis = config.yAxis || {}
	const series = config.series || {}
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'none'
			}
		},
		title: {
			show: title.show || true,
			text: title.tetx || '',
			left: title.left | 0,
			top: title.top | 0,
			textStyle: {
				fontSize: title.size | 0,
				color: title.color || '#333333',
				fontWeight: title.fontWeight || 'bold'
			}
		},
		grid: {
			left: grid.left || '2%',
			right: grid.right || '3%',
			bottom: grid.bottom || '3%',
			top: grid.top || '15%',
			containLabel: grid.containLabel || true
		},
		xAxis: {
			type: 'category',
			interval: xAxis.interval || 30,
			axisTick: {
				show: xAxis.axisTickShow || false
			},
			axisLine: {
				lineStyle: {
					color: xAxis.axisLineStyle || '#DCDCDC'
				}
			},
			axisLabel: {
				fontSize: xAxis.size,
				color: xAxis.color || '#999999',
				interval: 0,
				formatter: function(value) {
					// 处理x轴文字过长
					return value
				}
			},
			minorSplitLine: {
				show: false
			},
			data: xAxis.data
		},
		yAxis: {
			type: 'value',
			minInterval: yAxis.minInterval || 1,
			axisTick: {
				show: yAxis.axisTickShow || false
			},
			axisLine: {
				lineStyle: {
					color: yAxis.axisLineStyle || '#DCDCDC'
				},
				show: yAxis.axisLineShow || true
			},
			splitLine: {
				lineStyle: {
					color: yAxis.splitLineStyle || '#EEEEEE'
				},
				show: yAxis.splitLineShow || false
			},
			axisLabel: {
				fontSize: yAxis.size,
				color: yAxis.color || '#999999'
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: [
			{
				data: series.data,
				type: 'line',
				barWidth: series.barWidth | 0,
				showBackground: true,
				itemStyle: series.itemStyle || {},
				symbolSize: series.symbolSize || 12
			}
		]
	}
	return option
}