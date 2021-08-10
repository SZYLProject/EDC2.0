<!--
 * @Author: your name
 * @Date: 2021-03-22 09:14:20
 * @LastEditTime: 2021-08-09 10:23:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\management\CenterTable.vue
-->
<template>
  <dhc-table
    :tableData="tableData"
    :paramsData="centerTableParams"
  >
    <template v-slot:status="{ row }">
      <span :style="{color:getFlagStyle(row.status,dictionary.centerFlag)}"> {{ row.status|filterListLabel(dictionary.centerFlag) }}</span>
    </template>
    <template v-slot:state="{ row }">
      <span :style="{color:getFlagStyle( row.state,dictionary.userFlag)}">{{ row.state |filterListLabel(dictionary.userFlag) }}</span>
    </template>
    <template v-slot:centerKey="{ row }">
      {{ getCenterType(row) }}
    </template>
    <template v-slot:operate="{ row }">
      <i class="main-primaryIcon-button  iconfont iconbianji" title="编辑" @click="editCenterUser(row,type)"></i>
    </template>
  </dhc-table>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
export default {
	props: {
		centerList: { // 中心列表
			type: Array,
			default: () => {
				return []
			}
		},
		tableData: { // 表格数据
			type: Array,
			default: () => {
				return []
			}
		},
		type: { // 类型
			type: String,
			default: ''
		}
	},
	data() {
		return {
			infoName: '',
			dictionary// 字典
		}
	},
	computed: {
		centerTableParams() {
			if (this.type === 'user') {
				return [{ prop: 'userName', label: '姓名' },
					{ prop: 'roleName', label: '角色' },
					{ prop: 'status', label: '用户状态', slot: true },
					{ prop: 'ascriptionInfo', label: '归属' }
				]
			} else {
				return [{ prop: 'centerNumber', label: '中心编号' },
					{ prop: 'name', label: '中心名称' },
					{ prop: 'mainResearcher', label: '主研究者' },
					{ prop: 'status', label: '中心状态', slot: true },
					{ prop: 'planNumber', label: '计划入组量' },
					{ prop: 'operate', label: '操作',	slot: true }]
			}
		}
	},
	methods: {
		// 查询
		searchCenterUser() {
			this.$emit('searchCenterUser', this.infoName, this.type)
		},
		// 编辑
		editCenterUser(item, type) { // 1,新建中心，2是编辑中心 3，添加用户 4，新建用户，5编辑用户
			type === 'user' ?	this.$emit('setUser', 5, item) :	this.$emit('setCenter', 2, item)
		},
		// 所属
		getCenterType(row) {
			if (row.type === dictionary.userAscription[0].value) {
				return '研究'
			} else if (row.type === dictionary.userAscription[1].value) {
				if (row.centerNumbers) {
					const list = row.centerNumbers.split(',')
					const nameList = []
					list.forEach((item) => {
						const centerKey = this.centerList.find((info) => {
							return item === info.centerKey
						})
						if (centerKey) {
							nameList.push(centerKey.name)
						}
					})
					return nameList.join(',')
				} else {
					return ''
				}
			}
		},
		// 获取style
		getFlagStyle(stauts, infoList) {
			return this.$options.filters['filterListLabel'](stauts, infoList, 'value', 'color')
		}
	}
}
</script>
