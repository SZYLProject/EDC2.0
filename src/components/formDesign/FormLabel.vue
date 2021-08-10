<template>
  <div>
    <!-- 单行文本 -->
    <el-form-item v-if="formOption.controlType==='TB'" :label="formOption.itemName">
      <el-input v-model="formOption.value" type="input">
        <template v-if="formOption.unitOfMeasure" slot="append">
          {{ formOption.unitOfMeasure }}
        </template>
      </el-input>
    </el-form-item>
    <!-- 单选 -->
    <el-form-item v-if="formOption.controlType==='RB' " :label="formOption.itemName">
      <template>
        <el-radio-group v-if="formOption.optionVo" v-model="formOption.value">
          <el-radio v-for="(item, index) in formOption.optionVo.optionList" :key="index" :label="item.optionItemValue">
            {{ item.optionItemName }}
          </el-radio>
        </el-radio-group>
      </template>
    </el-form-item>
    <!-- 多选 -->
    <el-form-item v-if="formOption.controlType==='CB' " :label="formOption.itemName">
      <template>
        <p v-if="formOption.optionVo">
          <el-checkbox v-for="(item,index) in formOption.optionVo.optionList" :key="index" :label="item.optionItemValue">
            {{ item.optionItemName }}
          </el-checkbox>
        </p>
        <el-checkbox-group v-else v-model="formOption.value">
          <el-checkbox v-for="(item,index) in formOption.itemOptionList" :key="index" :label="item.itemName">
            {{ item.itemName }}
          </el-checkbox>
        </el-checkbox-group>
      </template>
    </el-form-item>
    <!-- 下拉 -->
    <el-form-item v-if="formOption.controlType==='SEL_SIG' " :label="formOption.itemName">
      <template>
        <el-select v-model="formOption.value" filterable collapse-tags placeholder="请选择" @focus="setOptionWidth">
          <el-option v-for="item in formOption.optionVo.optionList" :key="item.itemName" :style="{width:selectOptionWidth}" :label="item.optionItemName" :value="item.optionItemValue"></el-option>
        </el-select>
      </template>
    </el-form-item>
    <!-- 日期选择 -->
    <el-form-item v-if="formOption.controlType==='DP' " :label="formOption.itemName">
      <template>
        <el-date-picker v-model="formOption.value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
      </template>
    </el-form-item>
    <!-- 时间选择 -->
    <el-form-item v-if="formOption.controlType==='TP' " :label="formOption.itemName">
      <template>
        <el-time-picker v-model="formOption.value" placeholder="选择时间"></el-time-picker>
      </template>
    </el-form-item>
    <!-- 时间日期选择 -->
    <el-form-item v-if="formOption.controlType==='DTP' " :label="formOption.itemName">
      <template>
        <el-date-picker v-model="formOption.value" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </template>
    </el-form-item>
    <!-- 数字 -->
    <el-form-item v-if="formOption.controlType==='NTX' " :label="formOption.itemName">
      <template>
        <el-input v-model="formOption.value" type="number">
          <template v-if="formOption.itemUnit" slot="append">
            {{ formOption.itemUnit }}
          </template>
        </el-input>
      </template>
    </el-form-item>
    <!-- 多行文本 -->
    <el-form-item v-if="formOption.controlType === 'TA'" :label="formOption.itemName">
      <template>
        <el-input v-model="formOption.value" type="textarea" rows="1"></el-input>
      </template>
    </el-form-item>
    <!-- 文件上传 -->
    <el-form-item v-if="formOption.controlType==='SUF' " :label="formOption.itemName">
      <el-upload v-model="formOption.value" action="" :show-file-list="false" :auto-upload="false">
        <el-button slot="trigger" size="mini" type="primary">
          文件选取
        </el-button>
      </el-upload>
    </el-form-item>
    <!-- 地址选择 -->
    <el-form-item v-if="formOption.controlType==='ADSEL' " :label="formOption.itemName">
      <el-cascader v-model="formOption.value" size="mini" style="width:100%" :options="cascaderOption" popper-class="main-cascader-option"></el-cascader>
    </el-form-item>
    <!-- 文本标题 -->
    <el-form-item v-if="formOption.controlType==='LB' " :label="formOption.itemName"></el-form-item>
  </div>
</template>
<script>
import {
	regionDataPlus
	// CodeToText,
	// TextToCode
} from 'element-china-area-data'
export default {
	props: {
		formOption: { // options
			type: Object,
			default: () => {
				return {}
			}
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectOptionWidth: '', // option的宽度
			cascaderOption: regionDataPlus// 地址
		}
	},
	computed: {
	},
	mounted() {
	},
	methods: {
		// 设置option宽度
		setOptionWidth(event) {
			this.$nextTick(() => {
				this.selectOptionWidth = event.srcElement.offsetWidth + 'px'
			})
		}
	}
}
</script>
