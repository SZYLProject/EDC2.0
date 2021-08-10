<!--
 * @Author: your name
 * @Date: 2021-06-23 15:08:40
 * @LastEditTime: 2021-06-23 16:36:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\utilsComponents\dialogImg\index.vue
-->
<template>
  <dhc-dialog
    v-model="isVisable"
    :title="title"
    :width="width"
    :isSureButton="false"
    :isCancelButton="false"
    :custom-class="`${customClass} main-dialogImg`"
    :iconfontType="iconfontType"
    :iconfont="iconfont"
    :top="top"
    :appendBody="appendBody"
    @close="close"
  >
    <div class="main-dialogImg-content">
      <dhc-scalImg
        :img-url="imgUrl"
        :alt="alt"
        :listenFlag="listenFlag"
        :operateFlag="operateFlag"
        :scalFlag="scalFlag"
      ></dhc-scalImg>
    </div>
    <span v-show="isCancelButton" class="main-dialog-footer" style="text-align: center">
      <el-button v-if="isCancelButton" class="main-dialog-sureButton" @click="close">{{
        cancelButtonTitle
      }}</el-button>
    </span>
  </dhc-dialog>
</template>
<script>
export default {
	name: 'dialogImg',
	props: {
		// 图标
		iconfont: {
			type: String,
			default: 'iconchakan'
		},
		// 图标类型
		iconfontType: {
			type: String,
			default: 'edit'
		},
		// 弹窗标题
		title: {
			type: String,
			default: '查看图片'
		},
		top: {
			type: String,
			default: '12vh'
		},
		// 弹窗宽度
		width: {
			type: String,
			default: ''
		},
		appendBody: {
			type: Boolean,
			default: false
		},
		// 弹窗状态
		value: {
			type: Boolean,
			default: false
		},
		// 确定按钮标题
		sureButtonTitle: {
			type: String,
			default: '关闭'
		},
		// 确认按纽显示状态
		isSureButton: {
			type: Boolean,
			default: true
		},
		// 取消按钮标题
		cancelButtonTitle: {
			type: String,
			default: '关闭'
		},
		// 取消按纽显示状态
		isCancelButton: {
			type: Boolean,
			default: true
		},
		// 类名
		customClass: {
			type: String,
			default: ''
		},
		scalFlag: { // 缩放状态
			type: Boolean,
			default: true
		},
		imgUrl: { // 图片地址
			type: String,
			default: ''
		},
		alt: {
			type: String,
			default: ''
		},
		listenFlag: { // 监听状态
			type: Boolean,
			default: true
		},
		operateFlag: { // 操作状态
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	computed: {
		isVisable: {
			get: function() {
				return this.value
			},
			set: function() {
				return
			}
		}
	},
	watch: {},
	created() {},
	methods: {
		// 确认
		sure() {
		},
		// 关闭
		close() {
			this.$emit('input', false)
			this.$emit('close', false)
		}
	}
}
</script>
<style lang="scss" scope>
</style>