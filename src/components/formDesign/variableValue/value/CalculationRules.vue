<!--
 * @Author: your name
 * @Date: 2021-04-23 16:45:23
 * @LastEditTime: 2021-06-22 10:01:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\value\CalculationRules.vue
-->
<template>
  <div class="calculationrules">
    <el-input
      v-model="calculateInfo.calculateDisplay"
      type="textarea"
      :readonly="true"
      rows="3"
    ></el-input>
    <el-button
      :disabled="isVisitLook"
      class="iconfont iconjisuanqi main-primaryIcon-button  main-buttonSpace"
      @click="openCalculatorDialog(calculateInfo)"
    ></el-button>
  </div>
</template>
<script>
import { SETDIALOGINFO, SETCALCULATORFORM } from '@/store/mutationTypes'
import { mapMutations } from 'vuex'
export default {
	inject: ['isVisitLook'],
	components: {
	},
	props: {
		valueForm: { // 当前项
			type: Object,
			default: () => { return {} }
		},
		calculateInfo: {
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
		}
	},
	computed: {
	},
	watch: {
		calculateInfo: {
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
		...mapMutations('base', {
			seCalculationDialogalInfo: SETDIALOGINFO
		}),
		...mapMutations('formDesigin', {
			setCalculateForm: SETCALCULATORFORM
		}),
		// 显示公式
		setCalculateDisplay() {
			const calculateList = this.$utils.isJSON(this.calculateInfo.calculate) ? JSON.parse(this.calculateInfo.calculate) : []
			this.$set(this.calculateInfo, 'calculateDisplay', calculateList.length ? `${this.valueForm.itemName || ''}=${this.setCalculate(calculateList)}` : '')
		},
		// 打开弹窗
		openCalculatorDialog(item, index) {
			// console.log(item)
			// return
			this.setCalculateForm({ ...item, itemName: this.valueForm.itemName })
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
