<!--
 * @Author: your name
 * @Date: 2021-03-25 18:43:05
 * @LastEditTime: 2021-07-26 11:33:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\dialogForm\index.vue
-->
<template>
  <dhc-dialog
    v-model="isVisable"
    :title="title"
    :width="width"
    :isSureButton="isSureButton"
    :isCancelButton="isCancelButton"
    :custom-class="customClass"
    :sureButtonTitle="sureButtonTitle"
    :cancelButtonTitle="cancelButtonTitle"
    :iconfontType="iconfontType"
    :iconfont="iconfont"
    :top="top"
    @sure="sure"
    @close="close"
  >
    <dhc-form
      ref="dhcFrom"
      :label-width="labelWidth"
      :form-params="formParams"
      :form-rule="formRule"
      :form-data="formData"
      :size="size"
      :disabled="disabled"
    ></dhc-form>
  </dhc-dialog>
</template>
<script>
export default {
	name: 'DialogForm',
	props: {
		// 图标
		iconfont: {
			type: String,
			default: 'iconxinjian'
		},
		// 图标类型
		iconfontType: {
			type: String,
			default: 'add'
		},
		// 弹窗标题
		title: {
			type: String,
			default: '弹窗'
		},
		top: {
			type: String,
			default: '15vh'
		},
		// 弹窗宽度
		width: {
			type: String,
			default: ''
		},
		// 弹窗状态
		value: {
			type: Boolean,
			default: false
		},
		// 确定按钮标题
		sureButtonTitle: {
			type: String,
			default: '确定'
		},
		// 确认按纽显示状态
		isSureButton: {
			type: Boolean,
			default: true
		},
		// 取消按钮标题
		cancelButtonTitle: {
			type: String,
			default: '取消'
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
		// 表单数据
		formData: {
			type: Object,
			default: function() {
				return {}
			}
		},
		labelWidth: {
			type: String,
			default: '100px'
		},
		// 表单校验规则
		formRule: {
			type: Object,
			default: function() {
				return {}
			}
		},
		// 表单参数
		formParams: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 表单尺寸
		size: {
			type: String,
			default: 'mini'
		},
		// 表单禁止
		disabled: {
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
			this.$refs.dhcFrom.validate((validate) => {
				if (validate) {
					this.$emit('sure', this.formData, true)
				}
			})
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
