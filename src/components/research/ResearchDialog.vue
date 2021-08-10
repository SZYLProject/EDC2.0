<template>
  <dhc-dialogform
    v-model="isDialog"
    label-width="80px"
    :title="title"
    width="35%"
    :form-params="researchFormParams"
    :form-rule="researchRules"
    :form-data="researchForm"
    :iconfontType="iconfontType"
    :iconfont="iconfont"
    @close="close"
    @sure="saveResearch"
  ></dhc-dialogform>
</template>
<script>
import { researchType } from '@/assets/js/dictionary'
export default {
	props: {
		title: { // 标题
			type: String,
			default: ''
		},
		researchForm: { // 表单项
			type: Object,
			default: () => {
				return {}
			}
		},
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
		value: { // 弹窗状态
			type: Boolean,
			default: false
		}
	},
	data() {
		// 新增研究时，时间区间校验处理（prop只支持绑定一个String）
		const timeSection = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入开始时间'))
			} else if (!this.researchForm.endDate) {
				return callback(new Error('请输入结束时间'))
			} else if (this.researchForm.endDate <= value) {
				return callback(new Error('结束时间需大于开始时间'))
			} else {
				callback()
			}
		}
		return {
			researchFormParams: [
				{ type: 'text', label: '研究标题', prop: 'name' },
				{ type: 'text', label: '研究编号', prop: 'researchNumber' },
				{ type: 'textarea', label: '研究摘要', prop: 'target' },
				{
					type: 'select',
					label: '研究类型',
					prop: 'type',
					options: researchType
				},
				{
					type: 'number',
					label: '样本量',
					prop: 'planNumber',
					min: 1,
					max: 99999
				},
				{
					type: 'dateRannge',
					label: '研究周期',
					prop: 'startDate',
					endProp: 'endDate'
				}
			],
			researchRules: {
				// 校验规则
				name: this.$filterRules({ name: '研究标题', type: 1, required: true, max: 30, min: 1 }),
				researchNumber: this.$filterRules({ name: '研究编号', type: 1, required: true, max: 20, min: 1, ruleType: '20numCode' }),
				target: this.$filterRules({ name: '研究摘要', type: 1, required: true, max: 500, min: 1 }),
				type: this.$filterRules({ name: '研究类型', type: 2, required: true }),
				planNumber: this.$filterRules({ name: '样本量', type: 1, required: true }, [{ pattern: /^\+?[1-9]\d{0,4}(\.\d*)?$/,	message: '样本量在1~99999之间' }]),
				startDate: this.$filterRules({ name: '开始时间', type: 2, required: true, validator: timeSection })
			}
		}
	},
	computed: {
		isDialog: {
			get() {
				return this.value
			},
			set() {}
		}
	},
	methods: {
		saveResearch() {
			this.$emit('saveResearch', this.researchForm)
		},
		close() {
			this.$emit('input', false)
			this.$emit('close')
		}
	}
}
</script>
