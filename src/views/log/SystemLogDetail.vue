<!--
 * @Author: your name
 * @Date: 2021-03-22 09:14:20
 * @LastEditTime: 2021-04-14 18:09:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\views\log\SystemLogDetail.vue
-->
<template>
  <div class="main-plainNavBar-content">
    <div class="main-plainCard-content systemLogDetial">
      <div
        v-for="item in logDetialParams"
        :key="item.prop"
        class="systemLogDetial-info"
      >
        <span>{{ item.label }}：</span>
        <span v-if="item.filter">
          {{ logDetial[item.prop] | filterListLabel(dictionary[item.filter]) }}
        </span>
        <span v-else>
          {{ logDetial[item.prop] }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
export default {
	components: {},
	data() {
		return {
			dictionary, // 字典
			logDetial: {}, // 日志
			logDetialParams: [
				{ prop: 'logType', label: '日志类型', filter: 'logType' },
				{ prop: 'model', label: '操作模块' },
				{ prop: 'operateType', label: '操作方式', filter: 'operateType' },
				{ prop: 'operateDesc', label: '操作描述' },
				{ prop: 'resquestParam', label: '请求参数' },
				{ prop: 'actionClass', label: '后端调用类' },
				{ prop: 'actionMethod', label: '后端调用方法' },
				{ prop: 'researchName', label: '研究标题' },
				{ prop: 'researchCode', label: '研究code' },
				{ prop: 'userName', label: '操作用户' },
				{ prop: 'env', label: '操作环境', filter: 'environmentType' },
				{ prop: 'researchVersionNum', label: '操作版本' },
				{ prop: 'researchVersionCode', label: '版本code' },
				{ prop: 'errMessage', label: '异常信息' },
				{ prop: 'ip', label: 'IP地址' },
				{ prop: 'uri', label: 'URI' },
				{ prop: 'operateDate', label: '操作日期' }
			]
		}
	},
	mounted() {
		this.getLogDetail({ pkId: this.$route.query.logId })
	},
	methods: {
		getLogDetail(param) {
			const pkId = this.$route.query.logId
			if (pkId) {
				this.$api.systemLog.getLogDetail({ pkId }).then((res) => {
					if (res && res.code === 200) {
						this.logDetial = res.data
					}
				})
			}
		}
	}
}
</script>
