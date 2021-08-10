<template>
  <el-form
    ref="ruleForm"
    :model="valueForm"
    label-width="100px"
    class="main-form"
    style="width: 86%"
  >
    <el-form-item
      v-show="showDesignItem(valueForm).selectorSet"
      label="选项集:"
      prop="optionName"
      class="groupLabel"
      :rules="
        showDesignItem(valueForm).selectorSet
          ? $filterRules({
            name: '选项集',
            type: 2,
            required: true,
            trigger: 'change',
          })
          : []
      "
    >
      <el-popover
        v-model="isShowOptionSelect"
        placement="bottom"
        popper-class="main-popover groupLabel-popover"
        width="300"
        @show="getOptionList"
      >
        <div class="groupLabel-list">
          <el-scrollbar class="main_scrollbar">
            <div
              v-for="(item, index) in formOptionList"
              :key="index"
              class="groupLabel-item"
            >
              <p class="groupLabel-item-name" @click.stop="selectOption(item)">
                <i class="iconfont iconbiaodan"></i>
                <span>{{ item.optionName }} ({{ item.optionItemName }})</span>
              </p>
              <p class="groupLabel-item-operate">
                <el-button
                  :disabled="isVisitLook"
                  type="primary"
                  class="iconfont iconbianji main-primaryIcon-button"
                  @click="editOption(item)"
                ></el-button>
                <el-popconfirm
                  confirmButtonText="确定"
                  cancelButtonText="取消"
                  icon="el-icon-info"
                  iconColor="red"
                  title="确定要删除此选项集吗？"
                  @confirm="delOption(item)"
                >
                  <el-button
                    slot="reference"
                    :disabled="isVisitLook"
                    class="
                      iconfont
                      iconshanchu
                      main-errorIcon-button main-buttonSpace
                    "
                  ></el-button>
                </el-popconfirm>
              </p>
            </div>
          </el-scrollbar>
        </div>
        <el-input
          slot="reference"
          v-model="valueForm.optionName"
          :readonly="true"
        >
        </el-input>
      </el-popover>
      <el-button
        :disabled="isVisitLook"
        class="
          setting-add-button
          main-primaryIcon-button
          el-icon-plus
          groupLabel-add
        "
        @click="addOption('新增组标签')"
      ></el-button>
    </el-form-item>
    <el-form-item v-if="showDesignItem(valueForm).selectorSet" label="方向:">
      <el-radio-group v-model="valueForm.optionDirection">
        <el-radio
          v-for="item in dictionary.directionType"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="
        valueForm.numConfig &&
          showDesignItem(valueForm) &&
          showDesignItem(valueForm).allowDecimal
      "
      label="允许小数:"
    >
      <el-radio-group v-model="valueForm.numConfig.allowDecimal">
        <el-radio
          v-for="item in dictionary.allowDecimalType"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="valueForm.numConfig && valueForm.numConfig.allowDecimal"
      label="小数位数:"
    >
      <el-input
        v-model="valueForm.numConfig.decimalDigit"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item
      v-if="valueForm.numConfig && showDesignItem(valueForm).scopeValid"
      label="范围核查:"
    >
      <el-radio-group v-model="valueForm.numConfig.scopeValid">
        <el-radio
          v-for="item in dictionary.scopeValidType"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="
        valueForm.numConfig &&
          valueForm.numConfig.scopeValid === dictionary.scopeValidType[0].value
      "
      label="核查范围:"
    >
      <div class="main-dateRannge">
        <el-input
          v-model="valueForm.numConfig.rangeDown"
          type="number"
          size="mini"
        ></el-input>
        <div class="main-form-split">
          -
        </div>
        <el-input
          v-model="valueForm.numConfig.rangeUp"
          type="number"
          size="mini"
        ></el-input>
      </div>
    </el-form-item>
    <el-form-item label="是否必填:">
      <el-radio-group
        v-model="valueForm.isRequired"
        :disabled="
          valueForm.controlType == 'LB' ||
            valueForm.visible == dictionary.visibleFlag[1].value
        "
      >
        <el-radio
          v-for="item in dictionary.requiredFlag"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否只读:">
      <el-radio-group
        v-model="valueForm.isReadonly"
        :disabled="
          valueForm.controlType == 'LB' ||
            valueForm.isCalculate == dictionary.calculateType[1].value
        "
      >
        <el-radio
          v-for="item in dictionary.readonlyFlag"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="showDesignItem(valueForm).dataSource" label="数据来源:">
      <el-select
        v-model="valueForm.isCalculate"
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="item in calculateType"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 默认值 -->
    <div v-if="valueForm.isCalculate === dictionary.calculateType[2].value">
      <DefaultFormLabel
        v-for="(item, index) in defaultList"
        :key="index"
        :formOption="defaultList[index]"
        :type="defaultList[index].controlType"
        :itemOptionList="defaultList[index].itemOptionList"
        :prop="'value'"
      ></DefaultFormLabel>
    </div>
    <!-- v-if="showDesignItem(valueForm).calculateRule"  v-if="valueForm.calculateMain" -->
    <!-- :rules="[ {required: valueForm.isCalculate===1, message: `计算规则不能为空`, trigger: 'change,blur'}]"  -->
    <el-form-item
      v-if="valueForm.isCalculate === dictionary.calculateType[1].value"
      label="计算规则:"
      prop="calculateInfo.calculateDisplay"
      class="main-textarea"
      :rules="
        $filterRules({
          name: '计算规则',
          type: 1,
          message: `计算规则不能为空`,
          required: true,
          trigger: 'change',
        })
      "
    >
      <CalculationRules
        :calculateInfo="valueForm.calculateInfo"
        :isVisitLook="isVisitLook"
        :valueForm="valueForm"
      ></CalculationRules>
    </el-form-item>
    <!-- <el-form-item label="逻辑核查" v-if="showDesignItem(valueForm).logicVerify">
          <el-radio-group v-model="valueForm.logicVerify">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <div v-if="valueForm.logicVerify">
            <p ><span class="label">核查规则</span><i @click="onOpenCalculator" class="iconfont icon-jisuan calculate-btn pointer"></i></p>
            <el-input v-model="valueForm.checkedExpression" type="textarea" :readonly="Boolean(true)" rows="3"></el-input>
          </div>
        </el-form-item> -->
  </el-form>
</template>
<script>
// 缺少direction字段
import * as dictionary from '@/assets/js/dictionary'
import { FORMOPTIONLIST } from '@/store/stateTypes'
import {
	SETFORMOPTIONLIST,
	SETDIALOGINFO,
	SETOPTIONFORM
} from '@/store/mutationTypes'
import { mapMutations, mapState } from 'vuex'
import CalculationRules from './CalculationRules'
import DefaultFormLabel from '@/components/formDesign/DefaultFormLabel'
export default {
	inject: ['isVisitLook', 'researchCode'],
	components: {
		CalculationRules,
		DefaultFormLabel
	},
	props: {
		valueForm: {
			// 当前项
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			dictionary, // 字典
			isShowOptionSelect: false, // 展示选项集下
			defaultList: [] // 默认值表单
		}
	},
	computed: {
		showDesignItem() {
			return (item) => {
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
					checked:
            item.controlType !== 'LB' &&
            item.controlType !== 'SUF' &&
            item.controlType !== 'ADSEL',
					scopeRange: item.controlType === 'NTX' && item.scopeValid,
					logicVerify:
            item.controlType === 'NTX' ||
            item.controlType === 'DT' ||
            item.controlType === 'DAT',
					selectorSet:
            item.controlType === 'RB' ||
            item.controlType === 'SEL_SIG' ||
            item.controlType === 'CB',
					dataSource: item.controlType !== 'LB' && item.controlType !== 'SUF',
					calculateRule:
            item.isCalculate === 1 ||
            (item.calculateMain && item.calculateMain.desc),
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
			formOptionList: FORMOPTIONLIST
		}),
		calculateType() {
			// 计算类型
			return this.dictionary.calculateControlList.indexOf(
				this.valueForm.controlType
			) >= 0
				? this.dictionary.calculateType
				: this.dictionary.calculateType.filter((item) => {
					return item.flag
				})
		},
		defaultForm() {
			// 默认值表单
			return this.getDefaultForm()
		},
		conditionForm() {
			// 条件表单
			return !this.variableForm.isVisible
				? this.variableForm.conditionList[0]
				: {}
		}
	},
	watch: {
		'valueForm.optionName': {
			handler(value) {
				value && this.getOptionList(value)
			},
			immediate: true
		},
		isShowOptionSelect(value) {
			if (!value) {
				// 校验输入的和搜索出来的结果
				const info = this.formOptionList.find((item) => {
					return item.optionName === this.valueForm.optionName
				})
				info && this.$set(this.valueForm, 'optionCode', info.optionCode)
				!info && this.$set(this.valueForm, 'optionName', '')
			}
		},
		'valueForm.calculateInfo': {
			handler(value) {
				this.$set(this.valueForm, 'calculateList', [
					this.valueForm.calculateInfo
				])
			},
			immediate: true,
			deep: true
		},
		defaultForm: {
			handler(value) {
				this.defaultList = this.$utils.deepClone(value)
			},
			immediate: true
		},
		formOptionList: {
			handler(value) {
				const info = value.find((item) => {
					return item.optionName === this.valueForm.optionName
				})
				this.defaultList = this.getDefaultForm(info ? info.optionList : null)
			},
			deep: true,
			immediate: true
		},
		defaultList: {
			handler() {
				const list = this.defaultList.map((item) => { return item.value	})
				this.$set(this.valueForm, 'defaultValue', JSON.stringify(list))
			},
			deep: true
		},
		'valueForm.groupCount': {
			handler() {
				this.defaultList = this.getDefaultForm()
			},
			immediate: true
		}
	},
	methods: {
		...mapMutations('formDesigin', {
			setFormOptionList: SETFORMOPTIONLIST,
			setOptionForm: SETOPTIONFORM
		}),
		...mapMutations('base', {
			setOptionDrawerInfo: SETDIALOGINFO
		}),
		// 获取默认值表单
		getDefaultForm(optionList) {
			const list = []
			const info = this.$utils.isJSON(this.valueForm.defaultValue) ? JSON.parse(this.valueForm.defaultValue)	: ''
			if (this.$utils.isArrayFn(info)) {
				for (let index = 0; index < (this.valueForm.groupCount || 1); index++) {
					list.push({
						value: info[index],
						controlType: this.valueForm.controlType,
						itemOptionList: optionList || (this.valueForm.optionVo ? this.valueForm.optionVo.optionList : [])
					})
				}
			} else {
				for (let index = 0; index < (this.valueForm.groupCount || 1); index++) {
					list.push({
						value: this.valueForm.controlType === 'CB' ? [] : info || '',
						controlType: this.valueForm.controlType,
						itemOptionList: optionList || (this.valueForm.optionVo ? this.valueForm.optionVo.optionList : [])
					})
				}
			}
			return list
		},
		// 获取选项列表
		getOptionList(optionName) {
			this.$api.itemOption.selectOptionList({
				optionName,
				researchCode: this.researchCode
			}).then((res) => {
				if (res && res.code === 200) {
					this.setFormOptionList((res.data || []).filter((item) => item.optionName))
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 选择选项集
		selectOption(item) {
			this.$set(this.valueForm, 'defaultValue', this.valueForm.optionName === item.optionName ? this.valueForm.defaultValue : '')
			this.$set(this.valueForm, 'optionName', item.optionName)
			this.$set(this.valueForm, 'optionCode', item.optionCode)
			this.isShowOptionSelect = false
		},
		// 新增选项集
		addOption() {
			this.setOptionDrawerInfo({ title: '新增选项集', visible: true, type: 2 })
			this.setOptionForm({
				optionName: '',
				optionList: [
					{
						optionItemName: '',
						optionItemValue: '',
						selectImage: '上传图片',
						pictureUrl: '',
						pictureOriginal: ''
					}
				]
			})
		},
		// 编辑选项
		editOption(item) {
			this.setOptionDrawerInfo({ title: '编辑选项集', visible: true, type: 2 })
			this.setOptionForm({
				...item,
				optionList: item.optionList.map((subItem) => {
					return { ...subItem, optionItemValue: parseInt(subItem.optionItemValue) }
				})
			})
		},
		// 删除选项
		delOption(item) {
			this.$api.itemOption
				.deleteOption({ optionCode: item.optionCode })
				.then((res) => {
					if (res && res.code === 200) {
						this.$message.success(res.msg)
						this.setFormOptionList(
							this.formOptionList.filter(
								(subItem) => subItem.optionCode !== item.optionCode
							)
						)
					} else {
						if (res && res.msg) this.$message.error(res.msg)
					}
				})
		},
		// 表单校验
		formValidate(callback) {
			// return
			this.$refs.ruleForm.validate((validate) => {
				if (validate) {
					if (
						this.valueForm.isCalculate ===
            this.dictionary.calculateType[2].value
					) {
						const list = this.defaultList.map((item) => {
							return item.value
						})
						this.$set(this.valueForm, 'defaultValue', JSON.stringify(list))
					} else {
						this.$set(this.valueForm, 'defaultValue', '')
					}
					callback(true)
				} else {
					callback(false, 'value')
				}
			})
		},
		// 清除校验
		clearFormValidate() {
			this.$refs.ruleForm.clearValidate()
		}
	}
}
</script>
