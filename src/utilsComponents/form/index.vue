<!--
 * @Author: your name
 * @Date: 2021-03-25 15:13:26
 * @LastEditTime: 2021-08-05 17:41:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\form\index.vue
-->
<template>
  <el-form
    ref="mainForm"
    :model="formData"
    class="main-form"
    :disabled="disabled"
    :size="size"
    :rules="formRule"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="(item, i) in formParams"
      :key="i"
      :label="item.label"
      :prop="item.prop"
      :class="item.type === 'textarea'?'main-textarea':''"
    >
      <el-input
        v-if="item.type === 'text'"
        v-model="formData[item.prop]"
        :clearable="item.clearable"
        :disabled="item.disabled"
        :maxlength="item.max"
        :placeholder="item.placeholder || `请输入${item.label}`"
      ></el-input>
      <el-input
        v-if="item.type === 'password'"
        v-model="formData[item.prop]"
        type="password"
        show-password
        auto-complete="new-password"
        :clearable="item.clearable"
        :disabled="item.disabled"
        :maxlength="item.max"
        :placeholder="item.placeholder || `请输入${item.label}`"
      ></el-input>
      <el-input
        v-else-if="item.type === 'textarea'"
        v-model="formData[item.prop]"
        type="textarea"
        show-word-limit
        :disabled="item.disabled"
        :maxlength="item.maxlength"
      ></el-input>
      <el-input
        v-else-if="item.type === 'number'"
        v-model="formData[item.prop]"
        type="number"
        :max="item.max"
        :min="item.min"
        :disabled="item.disabled"
        :placeholder="item.placeholder || `请输入${item.label}`"
      >
        {{ item.max }}
      </el-input>
      <el-select
        v-else-if="item.type === 'select'"
        v-model="formData[item.prop]"
        popper-class="dialog_select_popper"
        :disabled="item.disabled"
        :multiple="item.multiple"
        :clearable="item.clearable"
        :placeholder="item.placeholder || '请选择'"
      >
        <el-option
          v-for="selectItem in item.options"
          :key="selectItem[item.optionValue || 'value']"
          :label="selectItem[item.optionLabel || 'label']"
          :value="selectItem[item.optionValue || 'value']"
        >
        </el-option>
      </el-select>
      <el-switch
        v-else-if="item.type==='switch'"
        v-model="formData[item.prop]"
        :active-value="item.value[1]||1"
        :inactive-value="item.value[0]||0"
        :active-text="item.text[1]||'启用'"
        :inactive-text="item.text[0]||'未启用'"
      ></el-switch>
      <el-date-picker v-else-if="item.type==='date'" v-model="formData[item.prop]" :value-format="item.valueFormat||'yyyy-MM-dd'" type="date" :placeholder="item.placeholder || '请选择'"></el-date-picker>
      <el-radio-group
        v-else-if="item.type === 'radio'"
        v-model="formData[item.prop]"
        :disabled="item.disabled"
      >
        <el-radio v-for="selectItem in item.options" :key="selectItem[item.optionValue || 'value']" :label="selectItem[item.optionValue || 'value']">
          {{ selectItem[item.optionLabel || 'label'] }}
        </el-radio>
      </el-radio-group>
      <div v-else-if="item.type === 'dateRannge'" class="main-dateRannge">
        <el-date-picker
          v-model="formData[item.prop]"
          :picker-options="
            item.startPiickerOptions ||
              getStartPickerOptions(item.endProp, item.prop)
          "
          prefix-icon="iconfont iconrili"
          :type="item.dateType || 'date'"
          :placeholder="item.startPlaceholder || '选择开始日期'"
          :value-format="item.format || 'yyyy-MM-dd'"
        ></el-date-picker>
        <div class="main-form-split">
          {{ item.split || "至" }}
        </div>
        <el-date-picker
          v-model="formData[item.endProp]"
          :picker-options="
            item.pickerOptionsEnd ||
              getEndpickerOptions(item.prop, item.endProp)
          "
          prefix-icon="iconfont iconrili"
          :type="item.dateType || 'date'"
          :placeholder="item.endPlaceholder || '选择结束日期'"
          :value-format="item.format || 'yyyy-MM-dd'"
        ></el-date-picker>
      </div>
    </el-form-item>
    <!-- 如果没传form参数，可以直接写el-input -->
    <slot></slot>
  </el-form>
</template>
<script>
export default {
	props: {
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
	computed: {},
	watch: {},
	created() {},
	methods: {
		// 校验
		validate(callBack) {
			this.$refs['mainForm'].validate((validate) => {
				callBack && callBack(validate)
			})
		},
		// 获取开始时间限制
		getStartPickerOptions(endProp) {
			return {
				disabledDate: (time) => {
					if (this.formData[`${endProp}`]) {
						return (
							time.getTime() > Date.now() ||
              time.getTime() > new Date(this.formData[`${endProp}`]).getTime()
						)
					}
				}
			}
		},
		// 获取结束时间限制
		getEndpickerOptions(startProp) {
			return {
				disabledDate: (time) => {
					return (
						time.getTime() < new Date(this.formData[`${startProp}`]).getTime()
					)
				}
			}
		}
	}
}
</script>
<style lang="scss" scope>
.main-form{
  .el-select,.el-input,.el-textarea{
    width: 100%;
    vertical-align: middle;
  }
}
</style>
