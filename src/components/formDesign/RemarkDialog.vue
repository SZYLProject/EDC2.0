<!--
 * @Author: your name
 * @Date: 2021-03-22 09:14:20
 * @LastEditTime: 2021-06-23 15:53:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\formDesign\formHeader.vue
-->
<template>
  <dhc-dialog
    v-model="isDialog"
    title="备注"
    width="30%"
    iconfontType="edit"
    iconfont="iconbeizhu"
    :appendBody="true"
    @sure="saveRemark"
    @close="close"
  >
    <el-form :model="remarkForm" class="note-form">
      <el-form-item>
        <el-input
          v-model="remarkForm.remark"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6 }"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>
  </dhc-dialog>
</template>
<script>
import { remarkFlag } from '@/assets/js/dictionary'
export default {
	components: {},
	props: {
		remarkForm: { // 备注表单
			type: Object,
			default: () => {
				return {}
			}
		},
		value: { // 弹窗状态
			type: Boolean,
			default: false
		},
		remarkOperateFlag: { // 备注操作状态
			type: Number,
			default: 1
		},
		index: { // 序号
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			remarkOperateTip: { // 备注提示
				0: '删除成功',
				1: '添加成功',
				2: '修改成功'
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
	watch: {},
	mounted() {},
	methods: {
		saveRemark() {
			if (this.remarkForm.remark) {
				this.$api.formData.updateRemark({
					formData: {
						...this.remarkForm,
						remarkStatus: 0
					}
				}).then((res) => {
					if (res && res.code === 200) {
						this.$message.success(this.remarkOperateTip[this.remarkOperateFlag])
						this.$emit('saveRemark', {
							remarkStatus: !this.remarkOperateFlag ? remarkFlag[0].value : remarkFlag[1].value,
							remark: !this.remarkOperateFlag ? '' : this.remarkForm.remark,
							index: this.index,
							itemCode: this.remarkForm.itemCode
						})
					} else {
						if (res && res.msg) this.$message.error(res.msg)
					}
				})
			} else {
				this.$message({
					type: 'warning',
					message: '备注不能为空'
				})
			}
		},
		close() {
			this.$emit('input', false)
			this.$emit('close')
		}
	}
}
</script>
