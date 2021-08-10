<!--
 * @Author: your name
 * @Date: 2021-05-11 18:49:28
 * @LastEditTime: 2021-05-31 14:54:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\formDesign\DefaultFormLabel.vue
-->
<template>
  <el-form-item :prop="prop">
    <el-input
      v-if="type === 'TB' || type === 'LB'"
      v-model="formOption[prop]"
      :placeholder="placeholder||'请输入'"
    ></el-input>
    <!-- 下拉 -->
    <el-select
      v-if="
        type === 'CB' ||
          type === 'SEL_SIG' ||
          (type === 'RB' &&
            itemOptionList &&
            itemOptionList.length)
      "
      v-model="formOption[prop]"
      :multiple="type === 'CB'"
      :placeholder="placeholder||'请选择'"
      @focus="setOptionWidth"
    >
      <el-option
        v-for="listItem in itemOptionList"
        :key="listItem.pkId"
        :style="{width:selectOptionWidth}"
        :label="listItem.optionItemName"
        :value="listItem.optionItemValue"
      >
      </el-option>
    </el-select>
    <!-- 日期选择 -->
    <el-date-picker
      v-if="type === 'DP'"
      v-model="formOption[prop]"
      value-format="yyyy/MM/dd"
      type="date"
      placeholder="选择日期"
    ></el-date-picker>
    <!-- 时间选择 -->
    <el-time-picker
      v-if="type === 'TP'"
      v-model="formOption[prop]"
      value-format="HH:mm:ss"
      placeholder="选择时间"
    ></el-time-picker>
    <!-- 时间日期选择 -->
    <el-date-picker
      v-if="type === 'DTP'"
      v-model="formOption[prop]"
      format="yyyy-MM-dd HH:mm"
      value-format="yyyy-MM-dd HH:mm"
      type="datetime"
      placeholder="选择日期时间"
    ></el-date-picker>
    <!-- 日期范围选择 -->
    <el-date-picker
      v-if="type === 'DPRANGE'"
      v-model="formOption[prop]"
      value-format="yyyy/MM/dd"
      type="daterange"
      placeholder="选择日期"
    ></el-date-picker>
    <!-- 时间范围选择 -->
    <el-time-picker
      v-if="type === 'TPRANGE'"
      v-model="formOption[prop]"
      is-range
      value-format="HH:mm:ss"
      placeholder="选择时间"
    ></el-time-picker>
    <!-- 时间日期范围选择 -->
    <el-date-picker
      v-if="type === 'DTPRANGE'"
      v-model="formOption[prop]"
      type="datetimerange"
      format="yyyy-MM-dd HH:mm"
      value-format="yyyy-MM-dd HH:mm"
      placeholder="选择日期时间"
    ></el-date-picker>
    <!-- 数字 -->
    <el-input
      v-if="type === 'NTX'"
      v-model="formOption[prop]"
      type="number"
      :placeholder="placeholder||'请输入'"
    >
      <!-- <template v-if="item.unitOfMeasure" slot="append">
        {{ item.unitOfMeasure }}
      </template> -->
    </el-input>
    <!-- 多行文本 -->
    <el-input
      v-if="type === 'TA'"
      v-model="formOption[prop]"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 6}"
      :placeholder="placeholder||'请输入'"
    ></el-input>
    <!-- LABEL -->
    <el-input
      v-if="type === 'LABEL'"
      v-model="formOption[prop]"
      type="textarea"
      :placeholder="placeholder||'请输入'"
    ></el-input>
    <!-- 文件上传 -->
    <el-upload
      v-if="type === 'SUF'"
      action=""
      :show-file-list="false"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="mini" type="primary">
        文件选取
      </el-button>
    </el-upload>
    <!-- 地址选择 -->
    <el-cascader
      v-if="type === 'ADSEL'"
      v-model="formOption[prop]"
      size="mini"
      style="width: 100%"
      :options="options"
      popper-class="main-cascader-option"
    ></el-cascader>
  </el-form-item>
</template>
<script>
import { regionDataPlus } from 'element-china-area-data'
export default {
	props: {
		formOption: { // options
			type: Object,
			default: () => {
				return {}
			}
		},
		prop: { // 表单变量
			type: String,
			default: ''
		},
		type: { // 表单类型
			type: String,
			default: ''
		},
		itemOptionList: { // 选项集
			type: Array,
			default: () => {
				return []
			}
		},
		placeholder: { // placeholder
			type: String,
			default: ''
		}
	},
	data() {
		return {
			options: regionDataPlus,
			selectOptionWidth: ''
		}
	},
	computed: {
	},
	watch: {
		// formOption: {
		// 	handler(value) {
		// 		console.log(value)
		// 	},
		// 	immediate: true
		// }
	},
	methods: {
		setOptionWidth(event) {
			this.$nextTick(() => {
				this.selectOptionWidth = event.srcElement.offsetWidth + 'px'
			})
		}
	}
}
</script>
