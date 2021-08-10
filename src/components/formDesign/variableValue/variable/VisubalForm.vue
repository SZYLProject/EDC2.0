<template>
  <el-form ref="currentConditionForms" :rules="visibleConditionRules" :model="conditionForm" class="main-form" size="small">
    <!-- <el-form-item
      prop="visitCode"
    >
      <el-select
        v-model="conditionForm.visitCode"
        style="width: 100%"
        filterable
        collapse-tags
        placeholder="选择访视"
        @focus="getVisitFormCondition('Root', 'visitList','visitCode')"
        @change="clearOtherForm(['formCodeRef','itemCodeRef','operator','conditionValue'])"
      >
        <el-option
          v-for="item in formConditionInfo.visitList"
          :key="item.code"
          :label="item.name||'--'"
          :value="item.code"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label=""
      prop="formCodeRef"
    >
      <el-select
        v-model="conditionForm.formCodeRef"
        style="width: 100%"
        filterable
        collapse-tags
        placeholder="选择表单"
        @change="clearOtherForm(['itemCodeRef','operator','conditionValue'])"
        @focus="getVisitFormCondition(conditionForm.visitCode, 'formList','formCodeRef')"
      >
        <el-option
          v-for="item in formConditionInfo.formList"
          :key="item.code"
          :label="item.name||'--'"
          :value="item.code"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item
      label=""
      prop="itemCodeRef"
    >
      <el-select
        v-model="conditionForm.itemCodeRef"
        style="width: 100%"
        placeholder="选择变量"
        @change="clearOtherForm(['operator','conditionValue'])"
        @focus="getVariableForCondition(conditionForm.formCodeRef,variableForm.itemCode,'conditionList','itemCodeRef')"
      >
        <el-option
          v-for="item in formConditionInfo.conditionList"
          :key="item.itemCode"
          :label="item.itemName"
          :value="item.itemCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label=""
      prop="operator"
    >
      <el-select
        v-model="conditionForm.operator"
        style="width: 100%"
        collapse-tags
        placeholder="选择操作"
        @change="clearOtherForm(['conditionValue'])"
      >
        <el-option
          v-for="item in conditionTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="(conditionForm.operator == '[]' || conditionForm.operator == '{}' || conditionForm.operator == '{/}')&&conditionDefaultForm.controlType!=='DP'&&conditionDefaultForm.controlType!=='TP'&&conditionDefaultForm.controlType!=='DTP'"
      label=""
      prop="conditionValue"
      class="main-textarea"
    >
      <el-input
        v-model="conditionForm.conditionValue"
        type="textarea"
        rows="2"
        placeholder="多个值请使用英文逗号(,)分隔"
      ></el-input>
    </el-form-item>
    <DefaultFormLabel v-else-if="conditionForm.operator =='==' || conditionForm.operator =='!='||conditionDefaultForm.controlType==='DP'||conditionDefaultForm.controlType==='TP'||conditionDefaultForm.controlType==='DTP'" placeholder="条件值" :formOption="conditionForm" :type="getControlType(conditionDefaultForm.controlType,conditionForm.operator)" :itemOptionList="conditionDefaultForm.itemOptionList" :prop="'conditionValue'"></DefaultFormLabel>
    <el-form-item
      v-else
      label=""
      prop="conditionValue"
    >
      <el-input
        v-model="conditionForm.conditionValue"
        type="input"
        placeholder="条件值"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { conditionType } from '@/assets/js/dictionary'
import DefaultFormLabel from '@/components/formDesign/DefaultFormLabel'
export default {
	inject: ['isVisitLook', 'researchCode'],
	components: { DefaultFormLabel },
	props: {
		conditionForm: {
			type: Object,
			default: () => { return {} }
		},
		variableForm: {
			type: Object,
			default: () => { return {} }
		}
	},
	// inject: ['visibleConditionRules'],
	data() {
		return {
			conditionTypeList: conditionType, // 条件类型
			visibleConditionRules: { // 校验规则
				// visitCode: this.$filterRules({ name: '访视', type: 2, required: true, trigger: 'blur,change' }),
				// formCodeRef: this.$filterRules({ name: '表单', type: 2, required: true, trigger: 'blur,change' }),
				itemCodeRef: this.$filterRules({ name: '变量', type: 2, required: true, trigger: 'blur,change' }),
				operator: this.$filterRules({ name: '操作符', type: 2, required: true, trigger: 'blur,change' }),
				conditionValue: this.$filterRules({ name: '条件值', type: 2, required: true, trigger: 'blur,change' })
			},
			formConditionInfo: { // 条件表单访视
				formList: [],
				visitList: [],
				conditionList: []
			},
			conditionDefaultForm: {// 额外的表单
			},
			isShowValueLabel: true
		}
	},
	computed: {
	},
	watch: {
		conditionForm: {
			handler() {
				const info =	this.formConditionInfo.conditionList.find(item => {
					return this.conditionForm.itemCodeRef === item.itemCode
				})
				this.$set(this.conditionDefaultForm, 'controlType', info ? info.controlType : '')
				this.$set(this.conditionDefaultForm, 'itemOptionList', info ? info.optionList : [])
				this.conditionDefaultForm = this.$utils.deepClone(this.conditionDefaultForm)
				if (info && (info.controlType === 'CB' ||
         info.controlType === 'SEL_SIG' ||
         info.controlType === 'RB')) {
					this.conditionTypeList = conditionType.filter(item => { return item.flag })
				} else {
					this.conditionTypeList = conditionType
				}
			},
			deep: true,
			immediate: true
		},
		conditionDefaultForm: {
			handler(value) {
				if (value.controlType === 'DP' || value.controlType === 'TP' || value.controlType === 'DTP') {
					this.$set(this.conditionForm, 'conditionValue', this.$utils.isString(this.conditionForm.conditionValue) && this.conditionForm.conditionValue.indexOf(',') !== -1 ? this.conditionForm.conditionValue.split(',') : this.conditionForm.conditionValue)
				}
			},
			deep: true
		},
		variableForm: {
			handler(value) {
				console.log(value)
				if (!value.isVisible) {
					// this.getVisitFormCondition('Root', 'visitList', 'visitCode')
					// this.getVisitFormCondition(this.conditionForm.visitCode, 'formList', 'formCodeRef')
					this.getVariableForCondition(this.conditionForm.formCodeRef, this.variableForm.itemCode, 'conditionList', 'itemCodeRef')
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
	},
	methods: {
		getControlType(controlType, operator) {
			if (controlType === 'DP' && (operator === '[]' || operator === '{}' || operator === '{/}')) {
				return 'DPRANGE'
			} else if (controlType === 'TP' && (operator === '[]' || operator === '{}' || operator === '{/}')) {
				return 'TPRANGE'
			} else if (controlType === 'DTP' && (operator === '[]' || operator === '{}' || operator === '{/}')) {
				return 'DTPRANGE'
			} else if (controlType === 'TA') {
				return 'TB'
			} else {
				return controlType
			}
		},
		// 表单校验
		formValidate() {
			return this.$refs.currentConditionForms.validate()
		},
		// 获取访视表单条件
		getVisitFormCondition(parentCode, key, prop) {
			if (!parentCode) return
			this.$api.visitForm.getVisitFormListForCondition({ researchCode: this.researchCode, parentCode, groupCode: 'root' }).then((res) => {
				if (res && res.code === 200) {
					this.$set(this.formConditionInfo, key, res.data || [])
					const info =	this.formConditionInfo[key].find(item => { return this.conditionForm[prop] === item.code })
					if (!info) this.$set(this.conditionForm, prop, '')
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 获取条件列表
		async	getVariableForCondition(formCode, itemCode, key, prop) {
			if (!formCode) return
			console.log(formCode, itemCode)
			const res = await	this.$api.itemStructure.getVariableForCondition({ formCode, itemCode })
			if (res && res.code === 200) {
				this.$set(this.formConditionInfo, key, res.data || [])
				const info =	this.formConditionInfo[key].find(item => { return this.conditionForm[prop] === item.itemCode })
				if (!info) {
					this.$set(this.conditionForm, prop, '')
				} else {
					this.$set(this.conditionDefaultForm, 'controlType', info.controlType)
					this.$set(this.conditionDefaultForm, 'itemOptionList', info.optionList)
				}
			} else {
				if (res && res.msg) this.$message.error(res.msg)
			}
		},
		// 清除校验
		clearFormValidate() {
			this.$refs.currentConditionForms.clearValidate()
		},
		// 清空
		clearOtherForm(itemList) {
			itemList.map((item) => {
				this.conditionForm[item] = null
			})
			this.clearFormValidate()
		}
	}
}
</script>
