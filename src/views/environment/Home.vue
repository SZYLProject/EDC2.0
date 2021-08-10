<template>
  <div class="home">
    <div class="home-topLeft">
      <div class="home-title">
        各中心受试者入组数量
      </div>
      <div id="barCenterChart" ref="barCenterChart" class="home-content home-contentChart"></div>
    </div>
    <div class="home-topRight">
      <div class="home-title">
        研究受试者入组进度
      </div>
      <div id="pieChart" ref="pieChart" class="home-content  home-contentChart"></div>
    </div>
    <div class="home-bottomLeft">
      <div class="home-title">
        月度受试者入组数量
      </div>
      <div id="barMonthChart" ref="barMonthChart" class="home-content  home-contentChart"></div>
    </div>
    <div class="home-bottomRight">
      <div class="home-title">
        各中心受试者入组进度
      </div>
      <dhc-table
        :tableData="testeeList"
        :paramsData="testeeTableParams"
        class="home-content"
      ></dhc-table>
    </div>
  </div>
</template>
<script>
import { initChart, getPieOption, getBarOption, getLineOption } from '@/echarts'
import { mapState } from 'vuex'
import { RESEARCHCODE } from '@/store/stateTypes'
export default {
	name: 'Home',
	components: {},
	data() {
		return {
			testeeList: [], // 受试者进组列表
			testeeTableParams: [
				{ prop: 'centerName', label: '中心名称' },
				{ prop: 'planNumber', label: '计划入组' },
				{ prop: 'actualNumber', label: '实际入组' },
				{ prop: 'proportion', label: '进度百分比' }
			]
		}
	},
	computed: {
		...mapState('research', {
			researchCode: RESEARCHCODE
		})
	},
	watch: {
		researchCode: {
			handler(value) {
				if (value) {
					this.initHome()
				}
			},
			immediate: true
		}
	},
	created() {
	},
	beforeDestroy() {},
	methods: {
		// 初始化
		initHome() {
			this.getResearchHomepage()
			this.getCenterHomepage()
			this.getCenterHomepageTime()
		},
		// 获取查询页面
		getResearchHomepage() {
			this.$api.home.researchHomepage(this.researchCode).then((res) => {
				if (res && res.code === 200) this.initPie(res.data)
			})
		},
		// 获取受试者入组进度
		getCenterHomepage() {
			this.$api.home.centerHomepage(this.researchCode).then((res) => {
				if (res && res.code === 200) {
					this.testeeList = res.data || []
					const xAxisData = []
					const seriesData = []
					this.testeeList.forEach((item) => {
						xAxisData.push(item.centerName)
						seriesData.push({ label: item.centerName, value: item.actualNumber })
						item.proportion = item.proportion || 0 + '%'
					})
					this.initBarCenter(xAxisData, seriesData)
				}
			})
		},
		// 获取柱状表月数据
		getCenterHomepageTime() {
			this.$api.home.centerHomepageTime(this.researchCode).then((res) => {
				if (res && res.code === 200) {
					const xAxisData = (res.data || []).map(item => { return item.actualMonth })
					const seriesData = (res.data || []).map(item => { return item.actualNumber })
					this.initLinemonth(xAxisData, seriesData)
				}
			})
		},
		// 初始化饼图
		initPie(data) {
			this.$nextTick(() => {
				const pieEcharts = initChart(document.getElementById('pieChart'))
				const series = {
					name: '访问来源',
					bottom: 30,
					size: 14,
					label: {
						formatter: '{a|实际入组/计划入组}\n\n ' + `{b|${data.proportion ? data.proportion : 0}%}`,
						show: true,
						position: 'center',
						rich: {
							a: {
								color: '#666666',
								lineHeight: 22,
								fontSize: 14,
								align: 'center'
							},
							b: {
								color: '#49A4FF',
								fontSize: 20,
								fontWeight: 'bold',
								lineHeight: 33
							}
						}
					},
					data: [
						{
							value: (data.planNumber || 0) - (data.actualNumbe || 0),
							name: '计划入组',
							itemStyle: {
								color: '#EAECED'
							},
							emphasis: {
								itemStyle: {
									color: '#EAECED'
								}
							}
						},
						{
							value: data.now || 0,
							name: '实际入组',
							itemStyle: {
								color: '#49A4FF'
							},
							emphasis: {
								itemStyle: {
									color: '#49A4FF'
								}
							}
						}
					]
				}
				pieEcharts.setOption(getPieOption({ series }))
				window.addEventListener('resize', () => {
					pieEcharts.resize()
				})
			})
		},
		// 初始化柱状图
		initBarCenter(xAxisData, seriesData) {
			this.$nextTick(() => {
				const barCenterWidth = this.$refs.barCenterChart.clientWidth
				const barCenterEcharts = initChart(
					document.getElementById('barCenterChart')
				)
				const xAxis = {
					interval: 30,
					size: 12,
					data: xAxisData
				}
				const yAxis = {
					minInterval: 1,
					size: 12
				}
				const series = {
					barWidth: barCenterWidth / 40,
					data: seriesData,
					itemStyle: {
						color: '#49A4FF'
					}
				}
				barCenterEcharts.setOption(
					getBarOption({ xAxis, yAxis, series })
				)
				window.addEventListener('resize', () => {
					barCenterEcharts.resize()
				})
			})
		},
		// 初始化月柱状图
		initLinemonth(xAxisData, seriesData) {
			this.$nextTick(() => {
				const barMonthEcharts = initChart(document.getElementById('barMonthChart'))
				const xAxis = {
					interval: 30,
					size: 12,
					data: xAxisData
				}
				const yAxis = {
					minInterval: 1,
					size: 12
				}
				const series = {
					data: seriesData,
					itemStyle: {
						color: '#F8BF32',
						width: 1
					}
				}
				barMonthEcharts.setOption(getLineOption({ xAxis, yAxis, series }))
				window.addEventListener('resize', () => {
					barMonthEcharts.resize()
				})
			})
		}
	}
}
</script>
