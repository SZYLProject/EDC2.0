<template>
  <div class="logic-form-wrap">
    <el-form ref="form" :model="varForm" label-width="0">
      <el-form-item>
        <el-input v-if="varForm.controlType === 'TB'||varForm.controlType === 'LB'" v-model="varForm.varValue"></el-input>
        <el-select v-if="varForm.controlType==='CB'||varForm.controlType==='SEL_SIG' || varForm.controlType==='RB' && varForm.optionList.length" v-model="varForm.varValue" :multiple="varForm.controlType==='CB'" placeholder="请选择" @change="onChangeSEL_SIG">
          <el-option v-for="listItem in varForm.optionList"
                     :key="listItem.pkId" :label="listItem.optionItemName"
                     :value="listItem.optionItemName"
          >
          </el-option>
        </el-select>
        <!-- 日期选择 -->
        <el-date-picker v-if="varForm.controlType==='DP'" v-model="varForm.varValue" value-format="yyyy/MM/dd" type="date" placeholder="选择日期"></el-date-picker>
        <!-- 时间选择 -->
        <el-time-picker v-if="varForm.controlType==='TP'" v-model="varForm.varValue" placeholder="选择时间"></el-time-picker>
        <!-- 时间日期选择 -->
        <el-date-picker v-if="varForm.controlType==='DTP'" v-model="varForm.varValue" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
        <!-- 数字 -->
        <el-input v-if="varForm.controlType==='NTX'" v-model="varForm.varValue" type="number">
          <template v-if="varForm.unitOfMeasure" slot="append">
            {{ varForm.unitOfMeasure }}
          </template>
        </el-input>
        <!-- 多行文本 -->
        <el-input v-if="varForm.controlType==='TA'" v-model="varForm.varValue" type="textarea" rows="1"></el-input>
        <!-- LABEL -->
        <el-input v-if="varForm.controlType==='LABEL'" v-model="varForm.varValue" type="textarea"></el-input>
        <!-- 文件上传 -->
        <el-upload v-if="varForm.controlType==='SUF'" action="" :show-file-list="false" :auto-upload="false">
          <el-button slot="trigger" size="mini" type="primary">
            文件选取
          </el-button>
        </el-upload>
        <!-- 地址选择 -->
        <el-cascader v-if="varForm.controlType==='ADSEL'" v-model="varForm.varValue" size="mini" style="width:100%" :options="options" @change="ADSELChange"></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
	regionDataPlus
} from 'element-china-area-data'
import { mapState } from 'vuex'
export default {
	props: ['varForm', 'currentItem', 'calculators'],
	data() {
		return {
			options: regionDataPlus,
			sureFormList1: [{
				controlType: 'RB',
				val: '',
				itemOptionList: [{
					optionItemName: '男'
				}, {
					optionItemName: '女'
				}
				]
			},
			{
				controlType: 'CB',
				val: [],
				itemOptionList: [{
					optionItemName: 20,
					value: 2
				}, {
					optionItemName: 30,
					value: 3
				}]
			},
			{
				controlType: 'SEL_SIG',
				val: '',
				itemOptionList: [{
					optionItemName: 20,
					value: 2
				}, {
					optionItemName: 30,
					value: 3
				}]
			},
			{
				controlType: 'DP',
				val: ''
			},
			{
				controlType: 'TP',
				val: ''
			},
			{
				controlType: 'DTP',
				val: ''
			},
			{
				controlType: 'TA',
				val: ''
			},
			{
				controlType: 'LABEL',
				val: ''
			},
			{
				controlType: 'SUF',
				val: ''
			},
			{
				controlType: 'ADSEL',
				val: ''
			},
			{
				controlType: 'LB',
				val: ''
			},
			{
				controlType: 'NTX',
				unitOfMeasure: ''
			}
			],
			form: {
				sureFormList: []
			}
		}
	},
	computed: {
		...mapState('visit', {
			defaultValue: 'defaultValue',
			defaultSourceForm: 'defaultSourceForm',
			getSpirceList: 'getSpirceList'
		})
	},
	methods: {
		onChangeSEL_SIG(v) {
			// console.log(v)
		},
		CBChange() {},
		ADSELChange() {}
	}
}
</script>
<style lang="scss" scoped>
.logic-form-wrap {
  height: 41px;
  box-sizing: border-box;
  display: flex;
}
</style>
