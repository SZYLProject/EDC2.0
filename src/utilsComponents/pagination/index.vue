<!--
 * @Author: your name
 * @Date: 2021-03-24 16:02:24
 * @LastEditTime: 2021-03-25 14:39:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\pagination\index.vue
-->
<template>
  <div class="main-pagination">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :page-sizes="pageSizes"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
	name: 'Pagination',
	props: {
		// 当前页
		currentPage: {
			type: Number,
			default: 0
		},
		// 每条
		pageSize: {
			type: Number,
			default: 10
		},
		pageSizes: {
			type: Array,
			default: () => {
				return [10, 20, 30, 40]
			}
		},
		// 总条数
		total: {
			type: Number,
			default: 0
		},
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper'
		}
	},
	watch: {},
	methods: {
		handleCurrentChange(page) {
			this.$emit('currentChange', page)
		},
		handleSizeChange(size) {
			this.$emit('sizeChange', size)
		}
	}
}
</script>