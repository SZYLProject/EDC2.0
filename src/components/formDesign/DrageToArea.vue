<!--
 * @Author: your name
 * @Date: 2021-03-22 09:14:20
 * @LastEditTime: 2021-08-06 16:38:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\DrageToArea.vue
-->
<template>
  <div class="drageToArea">
    <el-form class="main-drageForm" label-position="top" size="mini">
      <el-scrollbar class="main_scrollbar">
        <draggable animation="300" touchStartThreshold="10px" filter=".undraggable" :disabled="isVisitLook" class="drageToArea-list" :list="formList" group="people" @change="changeFormItem">
          <div v-for="(item, index) in formList" :key="index" title="拖拽控件以排序" class="drageToArea-item" :class="{ active: index == currentFormIndex}" @click="setFormItem(item, index)">
            <div class="drageToArea-item-form">
              <FormLabel :formOption="item" />
            </div>
            <div class="drageToArea-item-operate">
              <el-popconfirm title="确定删除该项吗？" :class="{'main-disable':canEditForm}" @confirm="delFormItem(item)">
                <el-button slot="reference" :disabled="isVisitLook" class="iconfont iconshanchu main-errorCircle-button"></el-button>
              </el-popconfirm>
            </div>
            <i v-show="item.itemCode" class="iconfont iconjiaobiao drageToArea-item-activeIcon"></i>
          </div>
        </draggable>
      </el-scrollbar>
    </el-form>
    <div v-if="!formList.length && !isLoading" class="drageToArea-empty-item">
      从左侧拖拽来添加表单项
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import FormLabel from '@/components/formDesign/FormLabel'
export default {
	components: {
		draggable,
		FormLabel
	},
	props: {
		formList: { // 表单列表
			type: Array,
			default: () => { return [] }
		},
		currentFormIndex: { // 序号
			type: Number,
			default: 0
		},
		currentFormItem: { // 当前项
			type: Object,
			default: () => { return {} }
		},
		isLoading: {
			type: Boolean,
			default: false
		},
		isVisitLook: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {}
	},
	computed: {
		canEditForm() {
			return false
		}
	},
	methods: {
		// 点击每个标签
		setFormItem(item, index) {
			if (index === this.currentFormIndex) return
			this.$emit('setFormItem', item, index)
		},
		// 组件新增/交换位置
		changeFormItem(item) {
			this.$emit('initFormList', 	item.added ? item.added.newIndex : item.moved.newIndex)
		},
		// 删除 标签
		delFormItem(item) {
			this.$emit('delFormItem', item)
		}
	}
}
</script>
