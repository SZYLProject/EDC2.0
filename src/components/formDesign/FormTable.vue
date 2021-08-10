<template>
  <div class="main-form-table formTable">
    <el-table
      :data="formOption.formData"
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, labelIndex) in formOption.label"
        :key="labelIndex"
        align="left"
        :show-overflow-tooltip="true"
        :prop="item.itemCode"
        :label="item.controlType === 'NTX' && item.itemUnit?`${item.itemName}(${item.itemUnit})`:item.itemName"
      >
        <template slot-scope="scope">
          <div>
            <span>
              {{
                $utils.formatterTableDefaultValue({...item,...scope.row[item.itemCode]},scope.$index) || ""
              }}
            </span>
            <el-popover placement="top" popper-class="main-popover">
              <FormOperate class="designFormLabel-operate" :operateFlag="operateFlag" :index="scope.$index" :isSubmit="isSubmit" :status="status" :formOption="getFormOperateOption(scope.row[item.itemCode],formOption.label)" @updateRemark="updateRemark" @changeSDV="changeSDV"></FormOperate>
              <el-button slot="reference" class="main-primaryIcon-button float-right" :disabled="status" icon="iconfont icongengduo-a" @click="isFormOperatePopover=!isFormOperatePopover">
              </el-button>
            </el-popover>
          </div>
          <div v-if="scope.row[item.itemCode]&&(scope.row[item.itemCode].remarkStatus === dictionary.remarkFlag[1].value )&& scope.row[item.itemCode].remark && scope.row[item.itemCode].pkId" class="formTable-note">
            <span>备注:{{ scope.row[item.itemCode].remark }}</span>
            <div class="float-right">
              <el-button class="main-primaryIcon-button  main-buttonSpace" :disabled="status" icon="iconfont iconbianji" @click="setRemark(2,scope.row[item.itemCode], scope.$index)">
              </el-button>
              <el-popconfirm
                title="确定删除此备注吗？"
                @confirm="setRemark(0,scope.row[item.itemCode],scope.$index)"
              >
                <i
                  slot="reference"
                  class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"
                  title="删除"
                ></i>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        :show-overflow-tooltip="true"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button class="main-primaryIcon-button" :disabled="status" icon="iconfont iconbianji" @click="setTableForm(2, scope.row, scope.$index)">
          </el-button>
          <el-button class="main-primaryIcon-button main-buttonSpace" :disabled="status" icon="iconfont iconchakan" @click="setTableForm(3, scope.row)">
          </el-button>
          <el-popconfirm
            title="您确定要删除该数据吗？"
            @confirm="delTableForm(scope.row, scope.$index)"
          >
            <i
              slot="reference"
              class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"
              title="删除"
            ></i>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="formOption.allow" class="formTable-operate">
      <el-button type="primary" class="main-primary-button" @click="setTableForm(1)">
        新增
      </el-button>
    </div>
    <!-- 修改 -->
    <dhc-dialog
      v-model="isFormDialog"
      :title="formDialogInfo[formDialogOperateFlag].title"
      width="40%"
      :isSureButton="formDialogOperateFlag !== 3"
      :isCancelButton="formDialogOperateFlag !== 3"
      :iconfontType="formDialogInfo[formDialogOperateFlag].iconfontType"
      :iconfont="formDialogInfo[formDialogOperateFlag].iconfont"
      @sure="saveTableForm()"
    >
      <el-form
        ref="labelForm"
        class="main-form"
        :model="tableForm"
        :validate-on-rule-change="false"
      >
        <DesignFormLabel
          v-for="(item, formIndex) in tableForm.formNodeList"
          :key="formIndex"
          :index="formIndex"
          :formOption="item"
          :type="1"
          :isSubmit="formBaseInfo.submit"
          :prop="'formNodeList.' + formIndex + '.value'"
          :disable="formDialogOperateFlag===3"
        />
      </el-form>
    </dhc-dialog>
    <!-- 备注 -->
    <RemarkDialog
      v-model="isRemarkDialog"
      :remarkForm="remarkForm"
      :remarkOperateFlag="remarkOperateFlag"
      @saveRemark="updateRemark"
    >
    </RemarkDialog>
  </div>
</template>
<script>
import DesignFormLabel from '@/components/formDesign/DesignFormLabel'
import * as dictionary from '@/assets/js/dictionary'
import FormOperate from '@/components/formDesign/FormOperate.vue'
import RemarkDialog from '@/components/formDesign/RemarkDialog'
export default {
	components: { FormOperate, DesignFormLabel, RemarkDialog },
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
		operateFlag: { // 操作状态
			type: Number,
			default: 1
		},
		visible: {
			type: [Boolean, Number],
			default: true
		},
		type: { // 2,是包含设置的sdv等功能
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
		},
		formBaseInfo: { // 表单基础数据
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			dictionary, // 字典
			isFormOperatePopover: false, // 气泡状态
			isFormDialog: false, // 表单弹窗状态
			tableFormIndex: '', // table的序号
			formDialogOperateFlag: 1, // 弹窗状态
			formDialogInfo: { // 弹窗信息
				1: {
					title: '新增',
					iconfontType: 'add',
					iconfont: 'iconxinjian'
				},
				2: {
					title: '修改',
					iconfontType: 'edit',
					iconfont: 'iconbianji'
				},
				3: {
					title: '查看',
					iconfontType: 'edit',
					iconfont: 'iconchakan'
				}
			},
			tableForm: { // 弹窗表单
				formNodeList: []
			},
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
	mounted() {
		setInterval(() => {
			console.log(this.formOption.formData)
		}, 1000)
	},
	methods: {
		// 获取操作选项表单
		getFormOperateOption(info, labelList) {
			if (!info)	return null
			const labelInfo = labelList.find(item => { return item.itemCode === info.itemCode })
			const itemName = labelInfo ? labelInfo.itemName : ''
			return { ...info, itemName, sdv: this.formOption.sdv }
		},
		// 改变sdv
		changeSDV(info) {
			this.$set(this.formOption.formData[this.tableFormIndex], 'sdvStatus', info.sdvStatus)
		},
		// 更新备注
		updateRemark(info) {
			const { remarkStatus, remark, index, itemCode } = { ...info }
			this.tableFormIndex = index
			this.$set(this.formOption.formData[this.tableFormIndex][itemCode], 'remarkStatus', remarkStatus)
			this.$set(this.formOption.formData[this.tableFormIndex][itemCode], 'remark', remark)
			this.isRemarkDialog = false
		},
		// 备注
		setRemark(type, item, index) { // 1 添加,2编辑，0,删除
			if (this.status) return
			this.$set(this.remarkForm, 'pkId', item.pkId)
			this.$set(this.remarkForm, 'itemCode', item.itemCode)
			this.remarkOperateFlag = type
			this.tableFormIndex = index
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
						this.updateRemark({ remarkStatus: dictionary.remarkFlag[0].value, remark: '', index, itemCode: item.itemCode })
					} else {
						if (res && res.msg) this.$message.error(res.msg)
					}
				})
			}
		},
		// 设置表单
		setTableForm(type, row, index) { // 1，新增 2，编辑 3，删除
			this.isFormDialog = true
			this.formDialogOperateFlag = type
			this.tableFormIndex = index
			// console.log(row)
			if (this.formDialogOperateFlag !== 1) {
				this.tableForm.formNodeList = this.formOption.label.map((item) => {
					if (row && row[item.itemCode]) {
						return {
							...item,
							...row[item.itemCode],
							isVisible: true,
							value: this.$utils.formatterDefaultValue(row[item.itemCode], true)
						}
					} else {
						return {
							...item,
							value: '',
							isVisible: true
						}
					}
				})
			} else {
				const { researchCode, structureVisitCode, subjectVisitCode, subjectCode, structureFormCode, subjectFormCode } = this.formBaseInfo
				this.tableForm.formNodeList = this.formOption.label.map((item) => {
					return {
						...item,
						value: item.itemValue || '',
						valueName: '',
						groupCode: this.formOption.groupCode,
						researchCode,
						subjectCode,
						structureVisitCode,
						structureFormCode,
						subjectFormCode,
						subjectVisitCode,
						isVisible: true
					}
				})
			}
		},
		// 保存tableForm
		saveTableForm() {
			this.$refs.labelForm.validate((valid) => {
				if (valid) {
					if (this.operateFlag === 1) {
						this.isFormDialog = false
					} else {
						this.tableForm.formNodeList.map((item) => {
							if (item.itemOptionList.length) {
								item.itemOptionList.map((item) => {
									if (item.optionItemValue === item.value) {
										item.valueName = item.optionItemName
									}
								})
							}
						})
						this.$api.formData.saveOrUpdateMutiGroupData({ formDatas: this.tableForm.formNodeList }).then((res) => {
							if (res && res.code === 200) {
								this.$message.success(res.msg)
								this.isFormDialog = false
								const formTableItem = {}
								const resList = res.data || []
								resList.forEach((item, index) => {
									formTableItem[this.formOption.label[index].itemCode] = item
								})
								if (this.formDialogOperateFlag === 1) {
									this.formOption.formData.push(formTableItem)
								} else if (this.formDialogOperateFlag === 2) {
									this.formOption.formData.splice(this.tableFormIndex, 1, formTableItem)
								}
							} else {
								if (res && res.msg) this.$message.error(res.msg)
							}
						})
					}
				}
			})
		},
		// 删除tableForm
		delTableForm(row, index) {
			if (this.operateFlag === 1) return false
			const data = Object.values(row).map((item) => item.pkId)
			this.$api.formData.removeFormData(data).then((res) => {
				if (res && res.code === 200) {
					// this.$message.success('删除成功')
					this.$message.success(res.msg)
					this.formOption.formData.splice(index, 1)
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		}
	}
}
</script>
