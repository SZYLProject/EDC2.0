<template>
  <div class="main-navBar-content formEntry">
    <div class="main-plainTable-content formEntry-content">
      <div class="formEntry-left">
        <div class="formEntry-left-serach">
          <el-form class="main-form">
            <el-form-item label="受试者编号:" label-width="100px">
              <el-select
                v-model="subjectCode"
                filterable
                placeholder="请选择"
                style="width: 100%"
                @change="getTreeList"
              >
                <el-option
                  v-for="testeeItem in testeeList"
                  :key="testeeItem.code"
                  :label="testeeItem.subjectDisplayedNumber"
                  :value="testeeItem.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="formEntry-left-tree">
          <TreeNav
            :treeData="visitTreeData"
            :expandKeys="visitTreeExpandkeys"
            :treeValue="subjectFormCode"
            @treeClick="treeClick"
            @saveVisitTime="saveVisitTime"
          />
        </div>
      </div>
      <div class="formEntry-right">
        <div class="formEntry-formHeader">
          <FormEntryHeader
            :headerTableInfo="headerTableInfo"
          />
        </div>
        <div class="formEntry-form">
          <div class="formEntry-formTitle">
            <p class="formEntry-formTitle-title">
              {{ headerFormName }}
            </p>
            <el-button class="main-primaryIcon-button el-icon-full-screen" title="分屏录入" @click="setEntryDialog"></el-button>
            <!-- <div v-if="!$route.query.flag" class="main-searchForm">
              <span class="main-searchForm-label">标记该表单为：</span>
              <el-select
                v-model="formBaseInfo.status"
                filterable
                placeholder="请选择"
                size="small"
                label-position="top"
                @change="changeMarkStatus"
              >
                <el-option
                  v-for="option in formMarkDictionary"
                  :key="option.pkId"
                  :label="option.dictionaryValue"
                  :value="option.dictionaryCode"
                ></el-option>
              </el-select>
            </div> -->
          </div>
          <div ref="formEntryConetnt" v-loading="isLoading" class="formEntry-content" element-loading-text="拼命加载中...">
            <el-form
              ref="entryForm"
              class="main-form"
              label-position="top"
              :model="entryForm"
            >
              <div
                v-for="(item, index) in entryForm.formNodeList"
                :key="item.pkId"
                class="formEntry-content-item"
              >
                <DesignFormLabel
                  v-if="item.isRepeat == dictionary.repeatFlag[1].value"
                  :formOption="item.formData"
                  :type="2"
                  :isSubmit="formStatusInfo.submitStatus===dictionary.submitType[1].value"
                  :prop="'formNodeList.' + index + '.formData.value'"
                  :status="false"
                  :visible="item.isVisible"
                  :index="index"
                  :operateFlag="2"
                />
                <FormTable
                  v-if="item.isRepeat === dictionary.repeatFlag[0].value && item.isVisible"
                  :formOption="item"
                  :type="2"
                  :formBaseInfo="formBaseInfo"
                  :isSubmit="formStatusInfo.submitStatus===dictionary.submitType[1].value"
                  :status="false"
                  :visible="item.formData.isVisible"
                  :index="index"
                  :operateFlag="2"
                />
              </div>
            </el-form>
          </div>
          <div class="main-buttonBox">
            <el-button
              type="primary"
              icon="iconfont iconshangchuan"
              class="main-primary-button"
              @click="$utils.backtop($refs.formEntryConetnt)"
            >
            </el-button>
            <el-button
              v-if="formStatusInfo.submitStatus!==dictionary.submitType[1].value"
              type="primary"
              class="main-primary-button main-buttonSpace"
              @click="saveFormData(entryForm.formNodeList,dictionary.submitType[0].value,true)"
            >
              保存
            </el-button>
            <el-button
              type="primary"
              class="main-primary-button main-buttonSpace"
              @click="saveFormData(entryForm.formNodeList,dictionary.submitType[1].value,true)"
            >
              提交
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <EntryDialog v-model="isEntryDialog" :entryDialogForm="entryDialogForm" :formBaseInfo="formBaseInfo" :formStatusInfo="formStatusInfo" @setFormData="setFormData"></EntryDialog>
  </div>
</template>
<script>
/* eslint-disable no-eval */
import EntryDialog from '@/components/formEntry/EntryDialog'
import * as dictionary from '@/assets/js/dictionary'
import TreeNav from '@/components/formEntry/TreeNav.vue'
import FormEntryHeader from '@/components/formEntry/FormEntryHeader.vue'
import FormTable from '@/components/formDesign/FormTable.vue'
import DesignFormLabel from '@/components/formDesign/DesignFormLabel'
import { formCalculate } from '@/utils/formCalculate'
import { mapState } from 'vuex'
import { RESEARCHCODE, RESEARCHNAME } from '@/store/stateTypes'
export default {
	components: { TreeNav, FormEntryHeader, DesignFormLabel, FormTable, EntryDialog },
	props: {},
	data() {
		return {
			isLoading: false, // 是否是loading
			dictionary, // 字典
			subjectFormCode: '', // 访视树id值
			treeIndex: 0,
			subjectCode: '', // 受试者编号
			visitTreeData: [], // 访视树树
			visitTreeExpandkeys: [], // 访视树默认展开值
			treeVisitName: '', // 树对应的访视名称
			formBaseInfo: {
			}, // 表单code数据
			formStatusInfo: {
				submit: dictionary.submitType[0].value, // 是否提交
				sdv: 0
			},
			entryForm: { // 表单
				formNodeList: []
			},
			isEntryDialog: false, // 录入弹窗状态
			entryDialogForm: {}, // 录入弹窗信息
			testeeList: [], // 受试者列表
			headerFormName: '', // 头部表单名称
			headerTableInfo: []// 表头信息
		}
	},
	computed: {
		...mapState('research', {
			researchCode: RESEARCHCODE,
			researchName: RESEARCHNAME
		}),
		visitTreeNextForm() {
			for (let i = 0; i < this.visitTreeData.length; i++) {
				const subjectFormVoList = this.visitTreeData[i].subjectFormVoList || []
				for (let j = 0; j < subjectFormVoList.length; j++) {
					if (subjectFormVoList[j].code === this.subjectFormCode) {
						return subjectFormVoList[j + 1] ? { ...subjectFormVoList[j + 1], visitName: this.visitTreeData[i].name } : null
					}
				}
			}
			return null
		}
	},
	watch: {
		'entryForm.formNodeList': {
			handler() {
				this.entryForm.formNodeList.forEach((item) => {
					if (item) formCalculate.setCondition(item.formData, this.entryForm.formNodeList)
					if (item && item.isCalculate === dictionary.calculateType[1].value) formCalculate.setCalculate(item.formData, this.entryForm.formNodeList)
				})
			},
			deep: true
		},
		researchCode: {
			handler(value) {
				if (value) {
					this.getTesteeList()
				}
			},
			immediate: true
		}
	},
	mounted() {
	},
	methods: {
		// 保存访视
		saveVisitTime(info) {
			this.getTreeList(info.code)
		},
		// 获取头部表格信息
		getHeaderTableInfo() {
			const info = this.testeeList.find((item) => {
				return item.code === this.subjectCode
			})
			this.headerTableInfo = [
				this.researchName,
				this.$route.query.centerName,
				info ? info.subjectDisplayedNumber : '',
				this.treeVisitName
			]
		},
		// 录入弹窗
		setEntryDialog() {
			this.isEntryDialog = true
			const imgInfoList = []
			for (let i = 0; i < 16; i++) {
				imgInfoList.push({ name: `病例图片${i + 1}`, imgCode: i + 1, img: require(`./img/${i + 1}.jpg`) })
			}
			this.entryDialogForm = { ...this.$utils.deepClone(this.entryForm), formName: this.headerFormName, imgInfoList: imgInfoList }
		},
		// 树点击
		treeClick(item, node) {
			if (this.subjectFormCode === item.code) return
			this.subjectFormCode = item.code
			this.headerFormName = item.name
			this.treeVisitName = node.parent.data.name
			this.getHeaderTableInfo()
			this.getEntryPreview({ visitCode: item.subjectVisitCode, subjectFormCode: this.subjectFormCode, structureFormCode: item.structureFormCode, structureVisitCode: item.structureFormCode, subjectCode: this.subjectCode })
		},
		// 获取受试者列表
		getTesteeList() {
			const info = {
				pageNum: 0,
				query: {
					researchCode: this.researchCode,
					centerCode: this.$route.query.centerCode
				}
			}
			this.$api.subject.getCaseList(info).then((res) => {
				if (res && res.code === 200) {
					const { subjectInfoList } = (res.data.result || {})
					this.testeeList = subjectInfoList || []
					this.subjectCode = this.$route.query.subjectCode ? this.$route.query.subjectCode : this.testeeList.length ? this.testeeList[0].code : ''
					this.getTreeList()
				} else {
					this.testeeList = []
				}
			})
		},
		// 获取树的列表
		getTreeList(code, formCode) {
			this.$api.visitForm.getSubjectVisitFormList(this.subjectCode).then((res) => {
				if (res && res.code === 200) {
					this.visitTreeData = res.data || []
					if (this.visitTreeData.length) {
						let visitCode = code || this.$route.query.code || this.visitTreeData[0].code
						let structureFormCode = ''
						let structureVisitCode = ''
						let submitStatus = dictionary.submitType[0].value
						const visitInfo = this.visitTreeData.find(item => { return item.code === visitCode })
						// console.log(visitInfo)
						if (visitInfo) {
							const index = (visitInfo.subjectFormVoList || []).findIndex(item => { return item.code === formCode })
							console.log(index)
							this.headerFormName = visitInfo.subjectFormVoList && visitInfo.subjectFormVoList[index > 0 ? index : 0] ? visitInfo.subjectFormVoList[index > 0 ? index : 0].name	: ''
							this.treeVisitName = visitInfo.name
							this.visitTreeExpandkeys.push(visitCode)
							this.subjectFormCode = visitInfo.subjectFormVoList && visitInfo.subjectFormVoList[index > 0 ? index : 0] ? visitInfo.subjectFormVoList[index > 0 ? index : 0].code : ''
							structureFormCode = visitInfo.subjectFormVoList && visitInfo.subjectFormVoList[index > 0 ? index : 0] ? visitInfo.subjectFormVoList[index > 0 ? index : 0].structureFormCode : ''
							structureVisitCode = visitInfo.structureVisitCode
							submitStatus = visitInfo.subjectFormVoList && visitInfo.subjectFormVoList[index > 0 ? index : 0] ? visitInfo.subjectFormVoList[index > 0 ? index : 0].status : dictionary.submitType[0].value
						} else {
							visitCode = this.visitTreeData[0] ? this.visitTreeData[0].code : ''
							this.headerFormName = this.visitTreeData[0] && this.visitTreeData[0].subjectFormVoList && this.visitTreeData[0].subjectFormVoList[0] ? this.visitTreeData[0].subjectFormVoList[0].name	: ''
							this.subjectFormCode = this.visitTreeData[0] && this.visitTreeData[0].subjectFormVoList && this.visitTreeData[0].subjectFormVoList[0] ? this.visitTreeData[0].subjectFormVoList[0].code : ''
							this.treeVisitName = this.visitTreeData[0] ? this.visitTreeData[0].name : ''
							structureFormCode = this.visitTreeData[0] && this.visitTreeData[0].subjectFormVoList && this.visitTreeData[0].subjectFormVoList[0] ? this.visitTreeData[0].subjectFormVoList[0].structureFormCode : ''
							structureVisitCode = this.visitTreeData[0] ? this.visitTreeData[0].structureVisitCode : ''
							submitStatus = this.visitTreeData[0] && this.visitTreeData[0].subjectFormVoList && this.visitTreeData[0].subjectFormVoList[0] ? this.visitTreeData[0].subjectFormVoList[0].status : dictionary.submitType[0].value
							this.visitTreeExpandkeys.push(visitCode)
						}
						this.$set(this.formStatusInfo, 'submitStatus', submitStatus)
						this.getHeaderTableInfo()
						this.getEntryPreview({	visitCode, subjectFormCode: this.subjectFormCode, structureFormCode, structureVisitCode, subjectCode: this.subjectCode })
					}
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 获取表单数据
		async	getEntryPreview({ visitCode, subjectFormCode, structureFormCode, structureVisitCode, subjectCode }) {
			this.entryForm.formNodeList = []
			this.isLoading = true
			const res = await	this.$api.formData.getNodeData({
				visitCode,
				subjectFormCode,
				structureFormCode,
				subjectCode,
				researchCode: this.researchCode
			})
			if (res && res.code === 200) {
				this.formBaseInfo = { ...this.formBaseInfo, visitCode, subjectCode, formCode: subjectFormCode, subjectVisitCode: visitCode, structureVisitCode, subjectFormCode, structureFormCode, researchCode: this.researchCode }
				this.entryForm.formNodeList = (res.data.formItemData || []).map((item) => {
					if (item.isRepeat === this.dictionary.repeatFlag[1].value) {
						return {
							...item,
							formData: {
								...item.formData,
								...item.label[0],
								value: this.$utils.formatterDefaultValue({ ...item.formData, ...item.label[0] }),
								allow: item.allow,
								criteria: item.criteria,
								criteriaType: item.criteriaType,
								isVisible: item.isVisible,
								sdv: item.sdv
							}
						}
					} else {
						item.formData = item.formData || []
						return item
					}
				})
			}
			this.isLoading = false
		},
		// 修改表单标记
		changeMarkStatus() {
			if (!this.formBaseInfo.pkId) return
			this.$api.formData.saveOrUpdateMarkStatus(this.formBaseInfo).then((res) => {
				if (res && res.code === 200) {
					this.$message.success(res.msg)
					this.getEntryPreview({
						formCode: this.formBaseInfo.formCode,
						visitCode: this.formBaseInfo.visitCode
					})
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 保存form表单
		saveFormData(formNodeList, subjectFormStatus, isJump) { // 保存 2 ，提交 3
			this.$refs.entryForm.validate((valid) => {
				if (valid) {
					this.setFormData(formNodeList, subjectFormStatus, isJump)
				}
			})
		},
		// 设置form表单
		setFormData(formNodeList, subjectFormStatus, isJump) {
			const fromData = this.$utils.deepClone(formNodeList)
			const { researchCode, subjectCode, visitCode, formCode, subjectFormCode } = this.formBaseInfo
			const sureFormList = fromData.map((item) => {
				let formData = item.formData
				if (item.isRepeat === this.dictionary.repeatFlag[1].value) {
					if (item.formData.controlType === 'ADSEL' || item.formData.controlType === 'CB') item.formData.value = item.formData.value	? JSON.stringify([item.formData.value]) : ''
					item.formData.remarkStatus = this.dictionary.remarkFlag[1].value
					const formDataInfo = {}
					formDataInfo[item.formData.itemCode] = item.formData
					formData = [formDataInfo]
				}
				return {
					...	item,
					formData,
					groupCode: item.groupCode,
					researchCode, subjectCode, visitCode, formCode,
					isVisible: item.isVisible ? this.dictionary.visibleFlag[0].value : this.dictionary.visibleFlag[1].value
				}
			})
			if (!sureFormList.length) return
			this.$api.formData.saveOrUpdateFormData({
				groupFormDataList: sureFormList,
				subjectFormCode,
				subjectFormStatus
			}).then((res) => {
				if (res && res.code === 200) {
					this.$message.success(subjectFormStatus === this.dictionary.submitType[1].value ? '提交成功' : '保存成功')
					if (subjectFormStatus === this.dictionary.submitType[1].value && this.visitTreeNextForm && isJump) {
						this.$confirm('跳转下一表单?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							distinguishCancelAndClose: false
						}).then(() => {
							this.treeClick(this.visitTreeNextForm, { parent: { data: this.visitTreeNextForm.visitName	}})
						})
					} else {
						this.getTreeList(visitCode, subjectFormCode)
						// this.getEntryPreview({ ...this.formBaseInfo })
						// this.isEntryDialog = false
					}
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		}
	}
}
</script>
