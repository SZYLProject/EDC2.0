<template>
  <div class="variableForm">
    <el-form
      ref="ruleForm"
      :model="variableForm"
      :rules="variableFormRules"
      label-width="100px"
      class="main-form"
      style="width:86%;"
    >
      <el-form-item label="问题:" prop="itemName">
        <el-input
          v-model="variableForm.itemName"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="showDesignItem(variableForm).itemNameEn"
        label="变量名:"
        prop="itemNameEn"
      >
        <el-input
          v-model="variableForm.itemNameEn"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="variableForm.numConfig && showDesignItem(variableForm).numConfig.itemUnit"
        label="单位:"
        prop="numConfig.itemUnit"
      >
        <el-input
          v-model="variableForm.numConfig.itemUnit"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="showDesignItem(variableForm).groupTag"
        label="组标签:"
      >
        <!-- 组标签：增、删、改、查 -->
        <GroupLabel
          :variableForm="variableForm"
          :isVisitLook="isVisitLook"
          @selectGroupItem="selectGroupItem"
        />
      </el-form-item>
      <el-form-item
        v-if="showDesignItem(variableForm).itemNameEn&&isShowVisibleLable"
        label="是否显示:"
      >
        <template>
          <el-radio-group v-model="variableForm.isVisible">
            <el-radio v-for="item in dictionary.visibleFlag" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item v-if="!variableForm.isVisible" label="设置显示条件" class="mian-auto-formItem">
        <!-- 显示条件：查询联动（由上到下、由下到上） -->
        <VisubalForm ref="visubalForm" :conditionForm="conditionForm" :variableForm="variableForm" />
      </el-form-item>
      <el-form-item
        v-if="showDesignItem(variableForm).textLabel"
        label="级别"
        prop="headingLevel"
        :rules="[
          {
            required: variableForm.controlType == 'LB',
            message: '请选择标题级别',
            trigger: 'change,blur'
          }
        ]"
      >
        <template>
          <el-radio-group v-model="variableForm.headingLevel">
            <el-radio v-for="item in dictionary.titleType" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item
        v-if="showDesignItem(variableForm).ddInputGuide"
        label="填写指南:"
        prop="ddInputGuide"
        class="main-textarea"
      >
        <el-input
          v-model="variableForm.ddInputGuide"
          type="textarea"
          rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="!showDesignItem(variableForm).textLabel"
        label="SDV:"
      >
        <el-radio-group v-model="variableForm.sdv">
          <el-radio v-for="item in dictionary.sdvFlag" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import VisubalForm from './VisubalForm'
import GroupLabel from './GroupLabel'
import { GROUPLIST } from '@/store/stateTypes'
import { mapState } from 'vuex'
export default {
	inject: ['isVisitLook', 'researchCode'],
	components: {
		VisubalForm,
		GroupLabel
	},
	props: {
		variableForm: { // 当前项
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			dictionary, // 字典
			variableFormRules: {
				itemName: this.$filterRules({ name: '问题', type: 1, required: true, max: 255, min: 1, trigger: 'blur,change' }),
				itemNameEn: this.$filterRules({ name: '变量名', type: 1, required: true, max: 255, min: 1, trigger: 'blur,change', ruleType: 'numberEnglish' })
			},
			isShowVisibleLable: true// 是否展示是否显示标签
		}
	},
	computed: {
		showDesignItem() {
			return item => {
				return {
					itemName: '',
					textLabel: item.controlType === 'LB', // 级别
					itemNameEn: item.controlType !== 'LB',
					ddDesc: item.controlType !== 'LB',
					groupTag: item.controlType !== 'LB',
					isVisible: item.controlType !== 'LB',
					ddInputGuide: item.controlType !== 'LB',
					isVisibleSetting: item.isVisible === '0',
					tabPaneValue: item.controlType !== 'LB',
					allowDecimal: item.controlType === 'NTX',
					decimalDigit: item.controlType === 'NTX' && item.allowDecimal === 1,
					scopeValid: item.controlType === 'NTX',
					scopeRange: item.controlType === 'NTX' && item.scopeValid,
					selectorSet: item.controlType === 'RB' || item.controlType === 'SEL_SIG' || item.controlType === 'CB',
					dataSource: item.controlType !== 'LB' && item.controlType !== 'SUF',
					calculateRule: item.isCalculate === 1 || (item.calculateMain && item.calculateMain.desc),
					isRequired: '',
					defaultValue: '',
					isReadonly: '',
					isCalculate: '',
					numConfig: {
						itemUnit: item.controlType === 'NTX'
					}
				}
			}
		},
		...mapState('formDesigin', {
			groupList: GROUPLIST
		}),
		conditionForm() { // 条件表单
			return 	!this.variableForm.isVisible ? this.variableForm.conditionList[0] : {}
		}
	},
	watch: {
		'variableForm.isVisible': {
			handler(value) {
				if (!value) {
					this.$set(this.variableForm, 'conditionList', this.variableForm.conditionList.length ? [{ ...this.variableForm.conditionList[0], ...this.getLocalsCode() }] : [this.initConditionForm()])
				}
			},
			immediate: true
		},
		'variableForm.groupName': {
			handler(value) {
				if (value !== '默认组' && value) {
					this.$set(this.variableForm, 'isVisible', this.dictionary.visibleFlag[0].value)
					this.isShowVisibleLable = false
				} else {
					this.isShowVisibleLable = true
				}
			},
			immediate: true
		}
	},
	methods: {
		// 选择组标签
		selectGroupItem(item) {
			this.$emit('selectGroupItem', item)
		},
		// 获取版本，研究信息
		getLocalsCode() {
			const visitCode = this.$route.query.visitCode
			const formCodeRef = this.$route.params.id
			return { visitCode, formCodeRef }
		},
		// 表单校验
		formValidate(callback) {
			if (!this.variableForm.isVisible) {
				Promise.all([this.$refs.ruleForm.validate(), this.$refs.visubalForm.formValidate()]).then(() => {
					callback(true)
				}
				).catch(() => {
					callback(false, 'variable')
				})
			} else {
				this.$refs.ruleForm.validate(validate => {
					if (validate) {
						callback(true)
					} else {
						callback(false, 'variable')
					}
				})
			}
		},
		// 清除校验
		clearFormValidate() {
			this.$refs.ruleForm.clearValidate()
			if (!this.variableForm.isVisible) {
				this.$refs.visubalForm.clearFormValidate()
			}
		},
		// 初始化condtionForm
		initConditionForm() {
			return 	{
				pkId: '',
				visitCode: '', // 访视
				formCode: '', // 表单
				itemCode: '', // 作为条件的变量
				conditionValue: '', // 条件值
				operator: '', // 操作符
				formCodeRef: '', // 标志着用作条件的变量所在的表单
				itemCodeRef: '', // 标志着用作条件的变量
				type: '1', // 目前只有 1 。'1:单字段控制单字段 2：多字段控制单字段 3：单字段控制Section 4:多字段控制Section ',
				sectionList: [], // 选择访视
				formList: [], // 选择表单
				variableList: [], // 选择变量
				controlType: '',
				...this.getLocalsCode()
			}
		}
	}
}
</script>
