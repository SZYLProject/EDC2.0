<template>
  <div v-if="visible" class="designFormLabel" :class="{'designFormEntryLabel':type===2&&operateFlag===2}">
    <div class="designFormLabel-content">
      <!-- 单行文本 -->
      <el-form-item
        v-if="formOption.controlType === 'TB'"
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <el-input
          v-model="formOption.value"
          type="input"
          :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
          style="width: 100%"
        >
          <template v-if="formOption.unitOfMeasure" slot="append">
            {{ formOption.unitOfMeasure }}
          </template>
        </el-input>
      </el-form-item>
      <!-- 单选 -->
      <el-form-item
        v-if="formOption.controlType === 'RB' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-radio-group v-model="formOption.value" style="width: 100%">
            <el-radio
              v-for="(item, itemIndex) in formOption.itemOptionList"
              :key="itemIndex"
              :class="{'main-direction-option':formOption.optionDirection}"
              :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
              :label="item.optionItemValue"
            >
              {{ item.optionItemName }}
            </el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        v-if="formOption.controlType === 'CB' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-checkbox-group v-model="formOption.value" style="width: 100%">
            <el-checkbox
              v-for="(item, itemIndex) in formOption.itemOptionList"
              :key="itemIndex"
              :class="{'main-direction-option':formOption.optionDirection}"
              :label="item.optionItemValue"
              :disabled="disable || formOption.isReadonly === dictionary.readonlyFlag[0].value"
            >
              {{ item.optionItemName }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-form-item>
      <!-- 下拉 -->
      <el-form-item
        v-if="formOption.controlType === 'SEL_SIG' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-select
            v-model="formOption.value"
            filterable
            collapse-tags
            placeholder="请选择"
            :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
            style="width: 100%"
            @focus="setOptionWidth"
          >
            <el-option
              v-for="item in formOption.itemOptionList"
              :key="item.optionItemValue"
              :style="{width:selectOptionWidth}"
              :label="item.optionItemName"
              :value="item.optionItemValue"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
      <!-- 日期选择 -->
      <el-form-item
        v-if="formOption.controlType === 'DP' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-date-picker
            v-model="formOption.value"
            value-format="yyyy/MM/dd"
            type="date"
            placeholder="选择日期"
            :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
            style="width: 100%"
          ></el-date-picker>
        </template>
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item
        v-if="formOption.controlType === 'TP' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-time-picker
            v-model="formOption.value"
            placeholder="选择时间"
            style="width: 100%"
            value-format="HH:mm:ss"
            :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
          ></el-time-picker>
        </template>
      </el-form-item>
      <!-- 时间日期选择 -->
      <el-form-item
        v-if="formOption.controlType === 'DTP' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-date-picker
            v-model="formOption.value"
            format="yyyy-MM-dd HH:mm"
            :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </template>
      </el-form-item>
      <!-- 数字 -->
      <el-form-item
        v-if="formOption.controlType === 'NTX' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-input
            v-model="formOption.value"
            type="number"
            style="width: 100%"
            :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
          >
            <template v-if="formOption.itemUnit" slot="append">
              {{ formOption.itemUnit }}
            </template>
          </el-input>
        </template>
      </el-form-item>
      <!-- 多行文本 -->
      <el-form-item
        v-if="formOption.controlType === 'TA' "
        :rules="getFormRule(formOption)"
        class="main-textarea"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <template>
          <el-input
            v-model="formOption.value"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            style="width: 100%"
            :disabled=" disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
          ></el-input>
        </template>
      </el-form-item>
      <!-- 文件上传 -->
      <el-form-item
        v-if="formOption.controlType === 'SUF' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <el-upload
          v-model="formOption.value"
          action=""
          :show-file-list="false"
          style="width: 100%"
          :auto-upload="false"
          :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
        >
          <el-button slot="trigger" size="mini" type="primary">
            文件选取
          </el-button>
        </el-upload>
      </el-form-item>
      <!-- 地址选择 -->
      <el-form-item
        v-if="formOption.controlType === 'ADSEL' "
        :rules="getFormRule(formOption)"
        :prop="prop"
      >
        <FormLabelName slot="label" :label="formOption.itemName" :content="getGuideContent(formOption,type)"></FormLabelName>
        <el-cascader
          v-model="formOption.value"
          size="mini"
          style="width: 100%"
          :options="regionDataOption"
          popper-class="main-cascader-option"
          :disabled="disable||formOption.isReadonly === dictionary.readonlyFlag[0].value"
        ></el-cascader>
      </el-form-item>
      <!-- 文本标题 -->
      <p v-if="formOption.controlType === 'LB' " class="main-form-title" :style="{fontSize:(formOption.headingLevel||dictionary.titleType[0].value)+'px'}">
        {{ formOption.itemName }}
      </p>
      <FormOperate v-if="formOption.controlType !== 'LB'&&type===2" class="designFormLabel-operate" :index="index" :isSubmit="isSubmit" :type="type" :operateFlag="operateFlag" :status="status" :formOption="formOption" @updateRemark="updateRemark" @changeSDV="changeSDV"></FormOperate>
    </div>
    <p
      v-if="formOption.remarkStatus===dictionary.remarkFlag[1].value&&formOption.remark&&formOption.pkId&&type===2"
      class="designFormLabel-note"
    >
      <span>备注:{{ formOption.remark }}</span>
      <el-button class="main-primaryIcon-button  main-buttonSpace" :disabled="status" icon="iconfont iconbianji" @click="setRemark(2,formOption)">
      </el-button>
      <el-popconfirm
        title="确定删除此备注吗？"
        @confirm="setRemark(0,formOption)"
      >
        <i
          slot="reference"
          class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"
          title="删除"
        ></i>
      </el-popconfirm>
      <!-- 备注 -->
      <RemarkDialog
        v-model="isRemarkDialog"
        :remarkForm="remarkForm"
        :remarkOperateFlag="remarkOperateFlag"
        @saveRemark="updateRemark"
      >
      </RemarkDialog>
    </p>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { regionDataPlus } from 'element-china-area-data'
import FormOperate from '@/components/formDesign/FormOperate.vue'
import FormLabelName from '@/components/formDesign/FormLabelName'
import RemarkDialog from '@/components/formDesign/RemarkDialog'
export default {
	components: { FormOperate, RemarkDialog, FormLabelName },
	props: {
		index: { // 序号
			type: Number,
			default: 0
		},
		formOption: { // 表单项
			type: Object,
			default: () => {
				return {}
			}
		},
		visible: {
			type: [Boolean, Number],
			default: true
		},
		type: { // 2,是包含设置的sdv等功能
			type: Number,
			default: 1
		},
		operateFlag: { // 操作状态
			type: Number,
			default: 1
		},
		prop: { // 表单变量
			type: String,
			default: ''
		},
		disable: { // 禁止
			type: [Boolean, Number],
			default: false
		},
		isSubmit: { // 是否提交
			type: [Boolean, Number],
			default: false
		},
		status: { // 提交状态
			type: [Boolean, Number],
			default: false
		}
	},
	data() {
		return {
			selectOptionWidth: '', // option的宽度
			dictionary, // 字典
			regionDataOption: regionDataPlus, // 区域字典信息
			isRemarkDialog: false, // 备注弹窗状态
			remarkForm: { // 备注表单
				remark: '',
				pkId: ''
			},
			remarkOperateFlag: 1, // 备注操作状态
			remarkOperateTip: { // 备注提示
				0: '删除成功',
				1: '添加成功',
				2: '修改成功'
			}
		}
	},
	computed: {
	},
	watch: {
		formOption: {
			handler(value) {
				// console.log(value)
			},
			immediate: true
		}
	},
	methods: {
		// 设置option宽度
		setOptionWidth(event) {
			this.$nextTick(() => {
				this.selectOptionWidth = event.srcElement.offsetWidth + 'px'
			})
		},
		getGuideContent(formOption, type) {
			return type === 1 ? '' : this.$utils.replaceTrim(formOption.ddInputGuide, 2)
		},
		// 格式化title
		formatterTitle(name) {
			return `请输入${name}`
		},
		// 改变sdv
		changeSDV(info) {
			this.$set(this.formOption, 'sdvStatus', info.sdvStatus)
		},
		// 更新备注
		updateRemark(info) {
			const { remarkStatus, remark } = { ...info }
			this.$set(this.formOption, 'remarkStatus', remarkStatus)
			this.$set(this.formOption, 'remark', remark)
			this.isRemarkDialog = false
		},
		// 备注
		setRemark(type, item) { // 1 添加,2编辑，0,删除
			if (this.status) return
			this.$set(this.remarkForm, 'pkId', item.pkId)
			this.remarkOperateFlag = type
			if (type === 2) {
				this.$set(this.remarkForm, 'remark', item.remark)
				this.isRemarkDialog = true
			} else if (type === 0) {
				this.$set(this.remarkForm, 'remark', '')
				this.$api.formData.updateRemark({
					formData: {
						...this.remarkForm,
						remarkStatus: dictionary.remarkFlag[0].value
					}
				}).then((res) => {
					if (res && res.code === 200) {
						this.$message.success(this.remarkOperateTip[this.remarkOperateFlag])
						this.updateRemark({ remarkStatus: dictionary.remarkFlag[0].value, remark: '' })
					} else {
						if (res && res.msg) this.$message.error(res.msg)
					}
				})
			}
		},
		// 获取表单校验
		getFormRule(item) {
			if (this.disable || item.isReadonly === dictionary.readonlyFlag[0].value) return []
			const rules = [
				{
					required: item.isRequired === dictionary.requiredFlag[0].value,
					message: `${item.itemName}不能为空`,
					trigger: 'change'
				}
			]
			if (item.controlType === 'NTX') {
				rules.push({
					validator: (rule, value, callback) => {
						if (value) {
							const np = /^(-)?\d+(\.\d+)?$/
							if (!np) callback(new Error('数字输入有误'))
							if (item.allowDecimal === dictionary.allowDecimalType[0].value && item.decimalDigit) {
								if (item.value.toString().indexOf('.') !== -1) {
									if (
										item.value.toString().split('.')[1].length >
                      item.decimalDigit
									) {
										callback(
											new Error(`仅允许输入${item.decimalDigit}位小数`)
										)
									}
								}
							} else {
								if (item.value.toString().indexOf('.') !== -1) {
									callback(
										new Error(`不允许输入小数`)
									)
								}
							}
							const rangeUp = Number(item.rangeUp) > Number(item.rangeDown) ? Number(item.rangeUp) : Number(item.rangeDown)
							const rangeDown = Number(item.rangeUp) > Number(item.rangeDown) ? Number(item.rangeDown) : Number(item.rangeUp)
							if (item.scopeValid === this.dictionary.scopeValidType[0].value && (Number(item.value) > rangeUp || Number(item.value) < rangeDown)) {
								callback(
									new Error(
										`数值范围输入有误! 数值范围:{${rangeDown}~${rangeUp}}`
									)
								)
							}
						}
						callback()
					},
					trigger: ['change', 'blur']
				})
			}
			return rules
		}
	}
}
</script>
