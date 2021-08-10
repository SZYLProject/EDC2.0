<!--
 * @Author: your name
 * @Date: 2021-04-22 17:02:03
 * @LastEditTime: 2021-07-22 14:38:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\environment\VisitTimeDialog.vue
-->
<template>
  <dhc-dialog
    v-model="isDialog"
    width="28%"
    title="添加访视"
    @sure="saveVisitTime"
    @close="close"
  >
    <el-form
      ref="visitTimeForm"
      size="mini"
      :model="visitTimeForm"
      :rules="visitTimeFormRules"
      label-width="120px"
      class="main-form"
    >
      <el-form-item label="当前访视" prop="name">
        <span class="main-form-text">{{ visitTimeForm.visitName }}</span>
      </el-form-item>
      <el-form-item
        v-if="visitTimeForm.visitType !== dictionary.visitType[1].value"
        label="计划访视时间:"
        prop="id"
      >
        <span class="main-form-text">{{
          visitTimeForm.plannedTime ? visitTimeForm.plannedTime : "无"
        }}</span>
      </el-form-item>
      <el-form-item label="实际访视时间" prop="actualTime">
        <el-date-picker
          v-model="visitTimeForm.actualTime"
          prefix-icon="iconfont iconrili"
          type="datetime"
          :picker-options="pickerOptionsDate"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="研究编号" prop="code">
          <span type="success">{{ visitTimeForm.name }}</span>
        </el-form-item> -->
    </el-form>
  </dhc-dialog>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
export default {
	props: {
		visitTimeForm: {
			type: Object,
			default: () => {
				return {}
			}
		},
		isVisitTimeDialog: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			pickerOptionsDate: {
				disabledDate: (time) => {
					return time.getTime() > Date.now()
				}
			},
			dictionary, // 字典
			visitTimeFormRules: {
				actualTime: this.$filterRules({ name: '实际访视时间', type: 2, required: true })
			}
		}
	},
	computed: {
		isDialog: {
			get() {
				console.log(this.isVisitTimeDialog)
				return this.isVisitTimeDialog
			},
			set() {
			}
		}
	},
	watch: {
		isVisitTimeDialog(value) {
			console.log(value)
		}
	},
	created() {
		console.log(123123132312)
	},
	methods: {
		saveVisitTime() {
			this.$refs.visitTimeForm.validate((valid) => {
				if (valid) {
					const {	code,	 actualTime	} = { ...this.visitTimeForm }
					this.$api.subject.updateSubjectActualTime({ code, actualTime	}).then((res) => {
						if (res && res.code === 200) {
							this.$message.success(res.msg)
						} else {
							if (res && res.msg) this.$message.error(res.msg)
						}
						this.$emit('saveVisitTime', res.code === 200)
					})
				}
			})
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
