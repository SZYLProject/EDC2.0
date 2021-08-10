<!--
 * @Author: your name
 * @Date: 2021-04-23 16:45:23
 * @LastEditTime: 2021-08-06 16:36:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\visit\VariableValue.vue
-->
<template>
  <div v-if="currentFormItem.itemVisable" class="variableValue main-button-content">
    <div class="main-plain-content">
      <DhcTabs v-model="activeTab" :isBorder="false" :list="variableValueParams">
        <el-scrollbar class="main_scrollbar">
          <VariableForm v-show="activeTab==='variable'" ref="variableForm" :variableForm.sync="currentFormItem" @selectGroupItem="selectGroupItem" />
          <ValueForm v-show="activeTab==='value'" ref="valueForm" :currentFormIndex="currentFormIndex" :valueForm.sync="currentFormItem" />
        </el-scrollbar>
      </DhcTabs>
    </div>
    <!-- 底部区域：确定 -->
    <div class="main-buttonBox">
      <el-button class="main-primary-button" type="primary" :disabled="isVisitLook" @click=" saveFormItem( !currentFormItem.itemCode ? 'save' : 'edit' )">
        {{ !currentFormItem.itemCode ? "保存" : "确定" }}
      </el-button>
    </div>
  </div>
</template>
<script>
import VariableForm from './variable/VariableForm'
import ValueForm from './value/ValueForm'
import { mapState } from 'vuex'
import { FORMOPTIONLIST, GROUPLIST } from '@/store/stateTypes'
export default {
	provide() {
		return {
			isVisitLook: this.isVisitLook,
			researchCode: this.researchCode
		}
	},
	components: {
		VariableForm,
		ValueForm
	},
	props: {
		currentFormIndex: { // 序号
			type: Number,
			default: 0
		},
		currentFormItem: { // 当前项
			type: Object,
			default: () => { return {} }
		},
		isVisitLook: { // 是否是查看状态
			type: Boolean,
			default: true
		},
		researchCode: { // 研究code
			type: String,
			default: ''
		}
	},
	data() {
		return {
			activeTab: 'variable' // 高亮tab
		}
	},
	computed: {
		...mapState('formDesigin', {
			formOptionList: FORMOPTIONLIST,
			groupList: GROUPLIST
		}),
		variableValueParams() { // 变量
			return	this.currentFormItem.controlType !== 'LB' ? [{ label: '变量', value: 'variable' }, { label: '值', value: 'value' }] : [{ label: '变量', value: 'variable' }]
		}
	},
	watch: {
		'currentFormItem.controlType': {
			handler(value) {
				if (value === 'LB') {
					this.activeTab = 'variable'
				}
			},
			immediate: true
		},
		currentFormIndex: {
			handler() {
				this.$refs.variableForm && this.$refs.variableForm.clearFormValidate()
				this.$refs.valueForm && this.$refs.valueForm.clearFormValidate()
			}
		}
	},
	methods: {
		// tab切换
		changeTab(value) {
			this.activeTab = value
		},
		// 选择组标签
		selectGroupItem({ groupName, groupCode, groupCount }) {
			this.$set(this.currentFormItem, 'groupName', groupName)
			this.$set(this.currentFormItem, 'groupCode', groupCode)
			this.$set(this.currentFormItem, 'groupCount', groupCount)
			this.$set(this.currentFormItem, 'defaultValue', '')
		},
		// 保存
		async	saveFormItem(item) {
			this.$refs.valueForm.formValidate((valueRes, valueType) => {
				this.$refs.variableForm.formValidate((variableRes, variableType) => {
					if (valueRes && variableRes) {
						this.$emit('saveFormItem', item)
					} else {
						if (this.activeTab === valueType && !valueRes) return
						if (this.activeTab === variableType && !variableRes) return
						if (!variableRes) {
							if (this.activeTab !== variableType) {
								this.activeTab = variableType
								return
							}
						}
						if (!valueRes) {
							if (this.activeTab !== valueType) {
								this.activeTab = valueType
								return
							}
						}
					}
				})
			})
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
