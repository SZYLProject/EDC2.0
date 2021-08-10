<!--
 * @Author: your name
 * @Date: 2021-05-14 13:05:24
 * @LastEditTime: 2021-05-14 13:05:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\value\CalculationRulesInfo---ste.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-04-23 16:45:23
 * @LastEditTime: 2021-05-14 12:57:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\value\CalculationRules.vue
-->
<template>
  <el-form ref="calculationRulesForm" :model="valueForm">
    <el-form-item v-for="(item, index) in valueForm.calculateList" :key="index" class="calculationrules" :prop="'calculateList.'+index+'.calculateDisplay'">
      <el-input
        v-model="item.calculateDisplay"
        type="textarea"
        :readonly="true"
        rows="3"
        :rules="$filterRules({ name: '计算规则', type: 1, message: `计算规则不能为空`, required: true, trigger: 'blur,change' })"
      ></el-input>
      <i
        class="iconfont iconjisuanqi main-primaryIcon-button  main-buttonSpace"
        @click="openCalculatorDialog(item,index)"
      ></i>
    </el-form-item>
  </el-form>
</template>
<script>
import { SETDIALOGINFO, SETCALCULATORFORM } from '@/store/mutationTypes'
import { mapMutations } from 'vuex'
export default {
	components: {
	},
	props: {
		valueForm: { // 当前项
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			varForm: {},
			defaultName: '',
			getSpirceList: [{ val: '' }],
			currentItemNameList: {
				itemOptionList: []
			},
			currentItem: {},
			calculateDisplay: ''
		}
	},
	computed: {
	},
	watch: {
		'valueForm.calculateList': {
			handler() {
				this.setCalculateDisplay()
			},
			deep: true,
			immediate: true
		},
		'valueForm.itemName': {
			handler() {
				this.setCalculateDisplay()
			},
			deep: true
			// immediate: true
		}
	},
	methods: {
		...mapMutations({
			seCalculationDialogalInfo: SETDIALOGINFO
		}),
		...mapMutations('formDesigin', {
			setCalculateIndex: SETCALCULATORFORM
		}),
		// 表单校验
		formValidate() {
			console.log(12331212313)
			return this.$refs.calculationRulesForm.validate()
		},
		// 显示公式
		setCalculateDisplay() {
			if (this.valueForm.calculateList) {
				this.valueForm.calculateList.forEach(item => {
					const calculateList = item.calculate ? JSON.parse(item.calculate) : []
					item.calculateDisplay = calculateList.length > 0	? `${this.valueForm.itemName || ''}=${this.setCalculate(calculateList)}`	: ''
				})
			}
		},
		// 打开弹窗
		openCalculatorDialog(item, index) {
			this.setCalculateIndex({ ...item, index, itemName: this.valueForm.itemName })
			this.seCalculationDialogalInfo({ title: '设置计算规则', visible: true, type: 3 })
		},
		// 设置公式
		setCalculate(calculateList) {
			let calculateDisplay = ''
			// 处理赋值操作
			for (let i = 0; i < calculateList.length; i++) {
				if (calculateList[i].code === 'num') {
					calculateDisplay += calculateList[i].element
				} else if (calculateList[i].code === 'item') {
					calculateDisplay += calculateList[i].element.itemName + ' '
				} else	if (calculateList[i].code === 'oper') {
					calculateDisplay += calculateList[i].element + ' '
				}
			}
			return calculateDisplay
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
