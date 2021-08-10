<!--
 * @Author: your name
 * @Date: 2021-04-23 16:45:23
 * @LastEditTime: 2021-05-14 11:56:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\value\CalculationRules.vue
-->
<template>
  <el-form model="valueForm">
    <div v-for="(item, index) in valueForm.calculateList" :key="index" class="calculationrules">
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
    </div>
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
		},
		calculateList: { // 计算list
			type: Array,
			default: () => { return [] }
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
		calculateList: {
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
		// 显示公式
		setCalculateDisplay() {
			if (this.calculateList) {
				this.calculateList.forEach(item => {
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
