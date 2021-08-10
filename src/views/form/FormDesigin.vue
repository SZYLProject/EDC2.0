<template>
  <div class="formDesigin main-navBar-content ">
    <!-- 左侧拖拽模版 -->
    <div class="formDesigin-left">
      <DrageFormModel
        v-loading="isDictionaryTreeLoading"
        element-loading-text="拼命加载中..."
        :isVisitLook="isVisitLook"
        :treeData="dictionaryFormData"
      />
    </div>
    <!-- 中间拖拽标签区域 -->
    <div v-loading="isLoading" element-loading-text="拼命加载中..." class="formDesigin-center">
      <DrageToArea
        :currentFormItem.sync="currentFormItem"
        :formList="formDataList"
        :currentFormIndex.sync="currentFormIndex"
        :isLoading="isLoading"
        :isVisitLook="isVisitLook"
        @delFormItem="delFormItem"
        @setFormItem="setFormItem"
        @initFormList="initFormList"
      />
    </div>
    <!-- 右侧设置变量、值区域 -->
    <div class="formDesigin-right">
      <VariableValue
        v-if="formDataList.length"
        v-loading="isVariableValueLoading"
        :currentFormItem="currentFormItem"
        :currentFormIndex="currentFormIndex"
        :isVisitLook="isVisitLook"
        :researchCode="researchCode"
        @saveFormItem="saveFormItem"
      />
    </div>
    <!-- 弹框：计算器 -->
    <dhc-dialog
      v-if="dialogDrawerInfo.type === 3"
      v-model="dialogDrawerInfo.visible"
      :title=" dialogDrawerInfo.title"
      width="40%"
      :isSureButton="false"
      :isCancelButton="false"
      iconfontType="edit"
      iconfont="iconjisuanqi"
      @close="closeCalculatorDialog"
    >
      <LogicCalculator
        ref="calculation"
        :itemControlTypeParam="currentFormItem.controlType"
        :researchCode="researchCode"
        @close="closeCalculatorDialog"
        @saveCalculator="saveCalculator"
      />
    </dhc-dialog>
    <!--抽屉-->
    <el-drawer
      v-if="dialogDrawerInfo.visible&&dialogDrawerInfo.type !== 3"
      :visible="dialogDrawerInfo.visible"
      :with-header="false"
      size="35%"
      class="main-drawer"
      @close="popoverCloseGroup"
    >
      <div class="main-drawer-header">
        <span class="main-drawer-title">{{ dialogDrawerInfo.title }}</span>
      </div>
      <div class="main-drawer-body">
        <el-scrollbar class="main_scrollbar">
          <!-- 新增组标签 -->
          <RepeatGroupFormDrawer
            v-if="dialogDrawerInfo.type === 1"
            :researchCode="researchCode"
            @popoverCloseGroup="popoverCloseGroup"
          ></RepeatGroupFormDrawer>
          <!-- 选项集- -->
          <OptionSetFormDrawer
            v-if="dialogDrawerInfo.type === 2"
            :researchCode="researchCode"
            @popoverCloseGroup="popoverCloseGroup"
          ></OptionSetFormDrawer>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { dictinaryTree } from './dictinaryTree'
import DrageFormModel from '@/components/formDesign/DrageFormModel'
import DrageToArea from '@/components/formDesign/DrageToArea'
import VariableValue from '@/components/formDesign/variableValue/index'
import LogicCalculator from '@/components/formDesign/variableValue/value/LogicCalculator.vue'
import RepeatGroupFormDrawer from '@/components/formDesign/variableValue/variable/RepeatGroupFormDrawer.vue'
import OptionSetFormDrawer from '@/components/formDesign/variableValue/variable/OptionSetFormDrawer.vue'
import { mapMutations, mapState } from 'vuex'
import { SETISLEAVE, SETDIALOGINFO } from '@/store/mutationTypes'
import { DIALOGINFO, GROUPLIST, RESEARCHCODE, RESEARCHSTATUS } from '@/store/stateTypes'
export default {
	components: {
		DrageFormModel,
		DrageToArea,
		VariableValue,
		LogicCalculator,
		RepeatGroupFormDrawer,
		OptionSetFormDrawer
	},
	data() {
		return {
			dictionaryFormData: [], // 字典表单树
			formDataList: [], // 表单列表
			currentFormIndex: null, // 当前form序号
			currentFormItem: {}, // 当前form
			isLoading: false, // 是否是loading
			isDictionaryTreeLoading: false, // 是否是loading
			isVariableValueLoading: false, // VariableValue区域loading
			isVisitLook: false // 是否访视查看状态
		}
	},
	computed: {
		...mapState('research', {
			researchCode: RESEARCHCODE,
			researchStatus: RESEARCHSTATUS
		}),
		...mapState('formDesigin', {
			groupList: GROUPLIST
		}),
		...mapState('base', {
			dialogDrawerInfo: DIALOGINFO
		})
	},
	watch: {
		formDataList: {
			handler(value) {
				const flag = value.every((item) => {
					return item.itemCode
				})
				this.setLeave(flag)
			},
			deep: true
		},
		researchCode: {
			handler(value) {
				debugger
				if (value) {
					this.isVisitLook = this.researchStatus === dictionary.researchStatus[1].value
					this.getFormDataList(true)
					this.getDictionaryFormData()
				}
			},
			immediate: true
		}
	},
	created() {
	},
	methods: {
		...mapMutations('base', {
			setLeave: SETISLEAVE,
			setDialogDrawerInfo: SETDIALOGINFO
		}),
		// 获取字典树
		getDictionaryFormData() {
			this.isDictionaryTreeLoading = true
			setTimeout(() => {
				this.isDictionaryTreeLoading = false
				this.dictionaryFormData = dictinaryTree
			}, 100)
		},
		// 获取标签列表
		async getFormDataList(flag) {
			this.isLoading = !!flag
			const res = await this.$api.itemStructure.list({	formCode: this.$route.params.id })
			if (res && res.code === 200) {
				debugger
				this.formDataList = res.data || []
				debugger

				res.data.length && this.setFormItem(res.data[this.currentFormIndex || 0], this.currentFormIndex || 0)
			} else {
				if (res && res.msg) this.$message.error(res.msg)
			}
			this.isLoading = false
		},
		// 初始化数据
		initFormList(index) {
			if (index < 0) return
			this.currentFormIndex = index

			this.formDataList.map((item, itemIndex) => {
				item.seq = itemIndex
			})

			this.$api.itemStructure.sort({sortList: this.formDataList})

			if (!this.formDataList[index].itemCode) {
				console.log('1111')
				console.log(this.formDataList)

				this.currentFormItem = { ...this.formDataList[index], conditionList: [] }

				console.log('2222')
				console.log(this.currentFormItem)

				this.$set(this.formDataList[index], 'itemCode', '')
				this.$set(this.formDataList[index], 'id', '')
			}
			// 拖拽已保存的标签
			this.formDataList[index].itemCode && this.getFormValueItem(this.formDataList[index].id)
		},
		// 点击每个拖拽的标签
		setFormItem(item, index) {
			debugger
			this.currentFormIndex = index
			if (item.itemCode) {
				this.getFormValueItem(item.id)
			} else {
				this.currentFormItem = { ...item, seq: index }
			}
		},
		// 删除标签
		delFormItem(item) {
			if (!item.itemCode) return this.deleteLabel()
			// 是否是已保存的标签
			this.$api.itemStructure.checkForUse({ pkId: item.pkId }).then((res) => {
				if (res && res.code === 200) {
					this.deleteLabel()
					this.$message.success(res.msg)
				} else if (res && res.code === 400) {
					// 标签被使用
					this.$confirm(res.msg, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$api.itemStructure
							.delete({ pkId: item.pkId })
							.then((subRes) => {
								if (subRes.code === 200) {
									this.deleteLabel()
									this.$message.success(subRes.msg)
								} else {
									if (subRes && subRes.msg) this.$message.error(subRes.msg)
								}
							})
					})
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 本地删除
		deleteLabel() {
			this.formDataList.splice(this.currentFormIndex, 1)
			this.currentFormIndex =
        this.formDataList.length === this.currentFormIndex	? this.currentFormIndex - 1	: this.currentFormIndex
			this.initFormList(this.currentFormIndex)
		},
		// 点击每个拖拽的标签获取api数据
		async getFormValueItem(id) {
			this.isVariableValueLoading = true
			debugger
			const res = await	this.$api.itemStructure.getCurrentItem({ id })
			if (res && res.code === 200) {
			debugger

				if (res.data.itemCode !== this.formDataList[this.currentFormIndex].itemCode) return
				const numConfig = res.data.numConfig || {
					allowDecimal: 0,
					decimalDigit: 2,
					scopeValid: 0,
					rangeDown: 0,
					rangeUp: 1000
				}
				res.data.conditionList =	(res.data.conditionList || []).map(item => {
					item.conditionValue = this.$utils.isJSON(item.conditionValue) ? JSON.parse(item.conditionValue) : item.conditionValue
					return item
				})
				// const defaultValueInfo = this.$utils.isJSON(this.currentFormItem.defaultValue) ? JSON.parse(this.currentFormItem.defaultValue) : ''
				// this.$utils.isArrayFn(defaultValueInfo) ? this.$set(this.currentFormItem, 'groupCount', defaultValueInfo.length) : this.$set(this.currentFormItem, 'groupCount', 0)
				this.$bus.$on('deleteCurrentGroup', () => {
					this.$set(this.currentFormItem, 'groupName', '默认组')
					this.$set(this.currentFormItem, 'groupCode', 'root')
					this.$set(this.currentFormItem, 'groupCount', 0)
				})
				if (this.currentFormItem.groupCode === 'root') {
					this.$set(this.currentFormItem, 'groupName', '默认组')
					this.$set(this.currentFormItem, 'groupCount', 0)
				}
				const calculateList = res.data.calculateList.length ? res.data.calculateList	:	[{
					calculate: '',
					calculateDisplay: '',
					calculateSuffix: '',
					dateUnit: '',
					type: '',
					calculateDesce: ''
				}]

				this.currentFormItem = this.$utils.deepClone({ ...res.data, optionName: res.data.optionCode && res.data.optionVo	? res.data.optionVo.optionName	: '', numConfig, itemVisable: true, calculateInfo: calculateList[0]	})
			}
			this.isVariableValueLoading = false
		},
		// 确定保存变量form
		async saveFormItem() {
			let conditionList = this.$utils.deepClone(this.currentFormItem.conditionList)
			if (conditionList.length) {
				conditionList =	conditionList.map(item => {
					if (item.operator === '[]' || item.operator === '{}' || item.operator === '{/}') {
						item.conditionValue = this.$utils.isArrayFn(item.conditionValue) ? item.conditionValue.join(',') : item.conditionValue
					} else {
						item.conditionValue = this.$utils.isArrayFn(item.conditionValue) ? JSON.stringify(item.conditionValue) : item.conditionValue
					}
					return item
				})
			}
			const info = {
				...this.currentFormItem,
				// calculateList: this.currentFormItem.calculators,
				conditionList,
				formCode: this.$route.params.id,
				researchCode: this.researchCode,
				visitCode: this.$route.query.visitCode || this.currentFormItem.visitCode
			}

			const res = await this.$api.itemStructure.save(info)
			if (res && res.code === 200) {
				debugger
				this.$message.success('设置成功')
				// this.$set(this.formDataList[this.currentFormIndex],	'itemCode', res.data.itemCode)
				// this.$set(this.formDataList[this.currentFormIndex],	'pkId',	res.data.pkId)
				// this.$set(this.formDataList[this.currentFormIndex], 'optionVo',	res.data.optionVo)
				// this.$set(this.formDataList[this.currentFormIndex],	'itemName',	this.currentFormItem.itemName)
				//
				debugger

				this.getFormDataList(false)
				// this.getFormValueItem(res.data.pkId)
			} else {
				if (res && res.msg) this.$message.error(res.msg)
			}
		},
		// 关闭计算弹框
		closeCalculatorDialog() {
			this.setDialogDrawerInfo({ visible: false })
		},
		// 保存计算
		saveCalculator(item, index) {
			this.setDialogDrawerInfo({ visible: false })
			this.currentFormItem.calculateInfo = item
			this.currentFormItem = this.$utils.deepClone(this.currentFormItem)
		},
		// 关闭抽屉
		popoverCloseGroup(params) {
			if (params) {
				// 保存并应用
				if (params.optionOperate) {
					this.$set(this.currentFormItem, 'optionName', params.optionName)
					this.$set(this.currentFormItem, 'optionCode', params.optionCode)
					this.$set(this.currentFormItem, 'optionVo', params.optionForm)
					if (params.optionFormFlag) this.$set(this.currentFormItem, 'defaultValue', '')
				}
				if (params.groupOperate) {
					// 组保存并应用 true
					this.$set(this.currentFormItem, 'groupName', params.groupName)
					this.$set(this.currentFormItem, 'groupCode', params.groupCode)
					this.$set(this.currentFormItem, 'groupCount', params.groupCount)
				}
			}
			this.setDialogDrawerInfo({ visible: false })
		}
	}
}
</script>
