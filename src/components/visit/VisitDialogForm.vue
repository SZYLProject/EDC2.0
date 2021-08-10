<!--
 * @Author: your name
 * @Date: 2021-03-22 09:13:07
 * @LastEditTime: 2021-06-21 17:11:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\VisitDialogForm.vue
-->
<template>
  <div class="add-v-f-form-wrap">
    <dhc-form
      ref="visitForm"
      label-width="80px"
      :form-params="visitFormParams"
      :form-rule="visitRules"
      :form-data="visitForm"
    ></dhc-form>
    <p slot="footer" class="main-dialog-footer">
      <el-button class="main-dialog-cancelButton" @click="close">
        取 消
      </el-button>
      <el-button
        class="main-dialog-sureButton"
        type="primary"
        @click="saveVisitForm(type)"
      >
        确 定
      </el-button>
    </p>
  </div>
</template>
<script>
// { eproFlag, repeatType, visitType }
import * as dictionary from '@/assets/js/dictionary'
export default {
	props: {
		visitForm: { // 表单
			type: Object,
			default: () => {
				return {}
			}
		},
		type: { // 类型
			type: Number,
			default: 1
		}
	},
	data() {
		return {
		}
	},
	computed: {
		visitFormParams() {
			if (this.type === 1 || this.type === 2) {
				return [
					{ type: 'text', label: '访视阶段', prop: 'stage' },
					{ type: 'text', label: '访视名称', prop: 'name' },
					{ type: 'text', label: '访视编号', prop: 'visitFormNum', disabled: this.type === 2 },
					{ type: 'select', label: '访视类型',	prop: 'visitType', options: dictionary.visitType, disabled: this.type === 2 },
					{ type: 'select', label: '可否重复',	prop: 'isRepeat', options: dictionary.repeatType, disabled: this.type === 2 }
				]
			} else {
				return [
					{ type: 'select', label: '表单类别', prop: 'category', options: dictionary.formType },
					{ type: 'text', label: '表单名称', prop: 'name' },
					{ type: 'text', label: '表单编号', prop: 'visitFormNum', disabled: this.type === 5 },
					{ type: 'select', label: 'ePRO表单',	prop: 'isEpro', options: dictionary.eproFlag }
				]
			}
		},
		visitRules() {
			if (this.type === 1 || this.type === 2) {
				return {
					name: this.$filterRules({ name: '访视名称', type: 1, required: true, max: 255, min: 1 }),
					visitFormNum: this.$filterRules({ name: '访视编号', type: 1, required: true, max: 255, min: 1, ruleType: '255numCode' }),
					visitType: this.$filterRules({ name: '访视类型', type: 2, required: true }),
					isRepeat: this.$filterRules({ name: '可否重复', type: 2, required: true }),
					stage: this.$filterRules({ name: '访视阶段', type: 1, required: false, max: 255, min: 1 })
				}
			} else {
				return {
					name: this.$filterRules({ name: '表单名称', type: 1, required: true, max: 255, min: 1 }),
					visitFormNum: this.$filterRules({ name: '表单编号', type: 1, required: true, max: 255, min: 1, ruleType: '255numCode' }),
					selectionType: this.$filterRules({ name: '可否重复', type: 2, required: true })
				}
			}
		}
	},
	methods: {
		// 保存访视
		saveVisitForm(type) {
			this.$refs.visitForm.validate((valid) => {
				if (valid) {
					this.$emit('saveVisitForm', type)
				}
			})
		},
		close() {
			this.$emit('close', this.type)
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
