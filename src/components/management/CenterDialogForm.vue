<!--
 * @Author: your name
 * @Date: 2021-03-03 18:25:42
 * @LastEditTime: 2021-08-06 13:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\center\CenterDialogForm.vue
-->
<template>
  <div>
    <dhc-form
      ref="cenetrForm"
      label-width="100px"
      :form-params="centerFormParams"
      :form-rule="centerFormRules"
      :form-data="centerForm"
    ></dhc-form>
    <span slot="footer" class="main-dialog-footer">
      <el-button class="main-dialog-cancelButton" @click="close">
        取 消
      </el-button>
      <el-button
        class="main-dialog-sureButton"
        type="primary"
        @click="saveCenter()"
      >
        确 定
      </el-button>
    </span>
  </div>
</template>
<script>
import { centerFlag } from '@/assets/js/dictionary'
export default {
	props: {
		centerForm: { // 表单
			type: Object,
			default: () => {
				return {}
			}
		},
		dialogStatus: { // 状态
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			centerFormRules: {
				name: this.$filterRules({ name: '中心名称', type: 1, required: true, max: 255, min: 1 }),
				centerNumber: this.$filterRules({ name: '中心编号', type: 1, required: true, max: 255, min: 1 }),
				mainResearcher: this.$filterRules({ name: '主研究者', type: 1, required: true, max: 255, min: 1 }),
				status: [{ required: true }],
				planNumber: this.$filterRules({ name: '计划入组量', type: 1, required: true }, [{ pattern: /^\+?[1-9]\d{0,8}(\.\d*)?$/,	message: '计划入组量在1~999999999之间' }])
			},
			centerFormParams: [
				{ type: 'text', label: '中心名称', prop: 'name' },
				{ type: 'text', label: '中心编号', prop: 'centerNumber' },
				{ type: 'text', label: '主研究者', prop: 'mainResearcher' },
				{ type: 'number', label: '计划入组量', prop: 'planNumber' },
				{ type: 'switch', label: '中心状态', prop: 'status', value: centerFlag.map(item => { return item.value }), text: centerFlag.map(item => { return item.label }) }
			]
		}
	},
	methods: {
		// 保存
		saveCenter() {
			this.$refs.cenetrForm.validate((validate) => {
				if (validate) {
					this.$emit('saveCenter', this.dialogStatus, this.centerForm)
				}
			})
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
