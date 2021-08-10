<!--
 * @Author: your name
 * @Date: 2021-03-25 15:20:10
 * @LastEditTime: 2021-04-20 13:48:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\table\index.vue
-->
<template>
  <div class="main-table">
    <el-table
      :data="tableData"
      :border="isBorder"
      :emptyText="emptyText"
      style="width: 100%"
      :show-header="isShowHeader"
    >
      <el-table-column
        v-if="isNumberColum"
        label="序号"
        :align="numberColumAlign"
        width="120"
        type="index"
        :index="indexMethod"
        fixed
      >
      </el-table-column>
      <el-table-column
        v-if="isExpandColum"
        :align="expandColumAlign"
        type="expand"
        fixed
      >
        <template slot-scope="scope">
          <slot name="expand" :row="scope.row" :index="scope.index"></slot>
        </template>
      </el-table-column>
      <template v-for="(item, i) in paramsData">
        <el-table-column
          :key="i"
          :align="item.align || 'left'"
          :min-width="item.minwidth"
          :prop="item.prop"
          :show-overflow-tooltip="!item.overflow"
          :width="item.width"
          :label="item.label"
          :fixed="item.fixed"
          :header-align="item.headAlign || 'left'"
        >
          <template slot-scope="scope">
            <!-- 自定义操作区域 -->
            <slot
              v-if="item.slot"
              :name="item.prop || 'button'"
              :row="scope.row"
              :index="scope.index"
            ></slot>
            <!-- 纯文本显示 -->
            <span v-else>{{ scope.row[item.prop] || "" }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
	name: 'Table',
	props: {
		// 表格数据
		tableData: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 参数数据
		paramsData: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 序号列表是否展示
		isNumberColum: {
			type: Boolean,
			default: false
		},
		// 状态
		numberColumAlign: {
			type: String,
			default: 'center'
		},
		isBorder: {
			type: Boolean,
			default: false
		},
		isShowHeader: {
			type: Boolean,
			default: true
		},
		// 展示列表是否展示
		isExpandColum: {
			type: Boolean,
			default: false
		},
		// 展示列表居中方式
		expandColumAlign: {
			type: String,
			default: 'left'
		},
		tableIndex: {
			type: Number,
			default: 0
		},
		emptyText: {
			type: String,
			default: '暂无数据'
		}
	},
	data() {
		return {}
	},
	computed: {},
	watch: {},
	methods: {
		editInfo(row, index) {
			this.$emit('edit', row, index)
		},
		deleteInfo(row, index) {
			this.$emit('delete', row, index)
		},
		indexMethod(index) {
			return this.tableIndex + index + 1
		},
		watchInfo(row, index) {
			this.$emit('watch', row, index)
		},
		drawInfo(row, index) {
			this.$emit('draw', row, index)
		},
		changePassword(row, index) {
			this.$emit('changePassword', row, index)
		}
	}
}
</script>