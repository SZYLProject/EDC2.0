<template>
  <div v-loading="isLoading" class="visitList main-navBar-content" :class="{visitShow:isVisitLook}" element-loading-text="拼命加载中...">
    <VisitList
      v-if="!isEmpty&&!isLoading"
      :visitList="visitList"
      :isVisitLook="isVisitLook"
      @goVisitDesigin="goVisitDesigin"
      @setVisitForm="setVisitForm"
      @delVisitForm="delVisitForm"
      @moveCopeVisitForm="moveCopeVisitForm"
      @draggVisitForm="draggVisitForm"
    />
    <Empty v-else-if="isEmpty&&!isLoading" wraningStr="访视">
      <template name="operate">
        <el-button
          size="mini"
          class="main-primary-button"
          icon="iconfont iconxinjian"
          type="primary"
          plain
          :disabled="isVisitLook"
          @click="setVisitForm(1)"
        >
          添加访视
        </el-button>
      </template>
    </Empty>
    <!-- 添加访视弹框/表单 -->
    <dhc-dialog
      v-model="isVisitDialog"
      :title="visitDialogTitle[visitDialogType]"
      :width="visitDialogType==3?'42%':'30%'"
      :isSureButton="false"
      :isCancelButton="false"
      :iconfontType="visitDialogIconfontType[visitDialogType]"
      :iconfont="visitDialogIcon[visitDialogType]"
    >
      <PlanVisitForm
        v-if="visitDialogType==3"
        :planVisitForm="planVisitForm"
        @close="isVisitDialog=false"
        @savePlanVisitForm="savePlanVisitForm"
      />
      <VisitDialogForm
        v-else
        :visitForm="visitForm"
        :type="visitDialogType"
        @close="isVisitDialog=false"
        @saveVisitForm="saveVisitForm"
      ></VisitDialogForm>
    </dhc-dialog>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import Empty from '@/components/Empty'
import VisitList from '@/components/visit/VisitList'
import VisitDialogForm from '@/components/visit/VisitDialogForm'
import PlanVisitForm from '@/components/visit/PlanVisitForm.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import { VISITLIST, VISITLISTLOADING, ISEMPTY, RESEARCHCODE, RESEARCHSTATUS } from '@/store/stateTypes'
import { SETRESEARCHSTATUS } from '@/store/mutationTypes'
import locals from '@/local'
export default {
	components: {
		Empty,
		VisitList,
		VisitDialogForm,
		PlanVisitForm
	},
	data() {
		return {
			isLoading: false, // 是否是loading
			visitDialogType: 1, // 访视弹窗类型
			visitDialogTitle: { // 弹窗标题
				1: '新建访视',
				2: '编辑访视',
				3: '计划访视',
				4: '添加表单',
				5: '编辑表单'
			}, //
			visitDialogIcon: { // 弹窗图标类型
				1: 'iconxinjian',
				2: 'iconxiugai',
				3: 'iconjihua',
				4: 'iconxinjian',
				5: 'iconxiugai'
			}, //
			visitDialogIconfontType: { // 弹窗图标类型
				1: 'add',
				2: 'edit',
				3: 'edit',
				4: 'add',
				5: 'edit'
			}, //
			isVisitDialog: false, // 访视弹窗
			visitForm: this.initVisitForm(), // 访视表单
			visitVersionAlert: locals.getVisitVersionAlert() || '', // 访视版本提示
			planVisitForm: this.initPlanVisitForm(), // 计划访视表单
			isVisitLook: false
		}
	},
	computed: {
		...mapState('base', {
			isEmpty: ISEMPTY
		}),
		...mapState('research', {
			researchCode: RESEARCHCODE,
			researchStatus: RESEARCHSTATUS
		}),
		...mapState('visit', {
			visitList: VISITLIST,
			visitListLoading: VISITLISTLOADING
		})
	},
	watch: {
		researchCode: {
			handler(value) {
				if (value) this.getVisitForm()
			},
			immediate: true
		},
		researchStatus: {
			handler(value) {
				this.isVisitLook = value === dictionary.researchStatus[1].value
			},
			immediate: true
		}
	},
	created() {
		this.$bus.$on('changeReserchStatus', (status) => {
			this.changeReserchStatus(status)
		})
	},
	beforeDestroy() {
		this.$bus.$off('changeReserchStatus')
	},
	methods: {
		...mapMutations('research', {
			setResearchStatus: SETRESEARCHSTATUS
		}),
		...mapActions('visit', {
			getVisitFormTree: 'getVisitFormTree'
		}),
		// 获取访视表单
		async	getVisitForm() {
			this.isLoading = true
			await this.getVisitFormTree(this.researchCode)
			this.isLoading = false
		},
		// 进入设计页面
		goVisitDesigin(item) {
			locals.setRouteMoreRecord('FormDesigin', {
				path: this.$route.path,
				query: this.$route.query
			})
			locals.setRouteMoreRecord('FormPreview', {
				path: this.$route.path,
				query: this.$route.query
			})
			this.$router.push({
				path: `/formDesigin/${item.code}`,
				query: { ...this.$route.query, title: item.name, visitCode: item.parentCode }
			})
		},
		// 进入设计
		changeReserchStatus(status) {
			if (status === dictionary.researchStatus[0].value) {
				this.$confirm('进入设计后，所有既往数据会丢失！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// const url = 'https://pic.liesio.com/2021/06/02/7dc9b9a4e8988.jpg'
					// this.$utils.downloadFile(url, '12312123.jpg')
					this.$api.research.updateResearchToDesign(this.$route.query.researchId).then(res => {
						if (res && res.code === 200) {
							this.$message.success('进入设计模式成功')
							this.setResearchStatus(dictionary.researchStatus[0].value)
						} else {
							this.$message.error(res && res.msg ? res.msg : '进入设计模式失败')
						}
					})
				})
			} else if (status === dictionary.researchStatus[1].value) {
				this.$api.research.updateResearchToFinished(this.$route.query.researchId).then(res => {
					if (res && res.code === 200) {
						this.$message.success('发布成功')
						this.setResearchStatus(dictionary.researchStatus[1].value)
					} else {
						this.$message.error(res && res.msg ? res.msg : '发布失败')
					}
				})
			}
		},
		// 拖拽访视表单
		draggVisitForm(list) {
			this.$api.visitForm.sort(this.$utils.getIndexArray(list)).then((res) => {
				if (res && res.code === 200) {
					this.getVisitFormTree(this.researchCode).then(() => {
						this.$message.success('设置成功')
					})
				} else {
					this.$message.error(res && res.msg ? res.msg : '设置失败')
				}
			})
		},
		// 表单的复制/移动
		moveCopeVisitForm(info, type) {
			this.$api.visitForm[type](info).then((res) => {
				if (res && res.code === 200) {
					this.getVisitFormTree(this.researchCode)
				}
			})
		},
		// 初始化访视表单
		initVisitForm() {
			return {
				stage: '访视阶段',
				sectionName: '访视表单',
				visitFormNum: '', // 访视编号
				visitType: dictionary.visitType[1].value,
				isRepeat: dictionary.repeatType[1].value,
				parentCode: 'Root',
				// pkId: '',
				code: '',
				researchCode: this.researchCode
			}
		},
		// 初始化表单
		initSheetForm(item) {
			return {
				name: '',
				category: dictionary.formType[0].value,
				isEpro: dictionary.eproFlag[1].value,
				visitFormNum: '',
				parentCode: '',
				researchCode: this.researchCode,
				...item
			}
		},
		// 初始计划访视表单
		initPlanVisitForm(item) {
			return {
				flag: false,
				researchCode: '',
				relevanceVisitCode: '',
				name: '',
				testeeGroup: [],
				roupSubjectCodeList: [],
				relevanceVisitVoList: [],
				front: [0, 0, 0],
				later: [0, 0, 0],
				visitInterval: [0, 0, 0],
				repeatRate: [0, 0, 0],
				// 重复次数
				repeatCount: 1,
				...item
			}
		},
		// 设置访视/表单
		setVisitForm(type, item) { // 1,新增 2.编辑访视 3.编辑计划访视,4.新增表单，5.编辑表单
			this.visitDialogType = type
			if (type !== 3) this.isVisitDialog = true
			if (type === 1) {
				this.visitForm = this.initVisitForm()
				this.visitForm.seq = this.visitList.length || 0
			} else if (type === 2 || type === 5) {
				this.visitForm = this.$utils.deepClone(item)
			} else if (type === 3) {
				this.getPlanVisitForm(item)
			} else if (type === 4) {
				this.visitForm = this.initSheetForm({ parentCode: item.code, seq: (item.structureFormVoList || []).length })
			}
		},
		// 保存访视表单
		saveVisitForm() {
			this.$api.visitForm.save(this.visitForm).then((res) => {
				if (res && res.code === 200) {
					const successInfo = {
						1: '新增访视成功',
						2: '修改访视成功',
						4: '新增表单成功',
						5: '修改表单成功'
					}
					this.getVisitFormTree(this.researchCode).then(() => {
						this.isVisitDialog = false
						this.$message.success(successInfo[this.visitDialogType])
					})
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 删除访视/表单
		delVisitForm(list, code, type) {
			this.$api.visitForm.delete(code).then((res) => {
				if (res && res.code === 200) {
					this.$message.success(type === 1 ? '删除访视成功' : '删除表单成功')
					const formList = list.filter(item => {
						return item.code !== code
					})
					this.$api.visitForm.sort(this.$utils.getIndexArray(formList)).then(() => {
						this.getVisitFormTree(this.researchCode)
					})
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 获取计划访视
		getPlanVisitForm(info) {
			const { researchCode, code, name, isRepeat } = info
			this.planVisitForm = this.initPlanVisitForm({ researchCode, name, visitCode: code, isRepeat })
			this.$api.visitForm.getVisitPlan({ researchCode, visitCode: code }).then((res) => {
				if (res && res.code === 200) {
					const config = res.data.plannedVisitConfigVo || {}
					// const relevanceVisitVoList = res.data.relevanceVisitVoList || []
					// 回显数据
					this.planVisitForm = { ...this.planVisitForm, ...config }
					this.planVisitForm.flag = this.planVisitForm.relevanceVisitCode
					this.planVisitForm.visitInterval = config.visitInterval ? config.visitInterval.split(',') : [0, 0, 0]
					this.planVisitForm.front = config.front ? config.front.split(',') : [0, 0, 0]
					this.planVisitForm.later = config.later ? config.later.split(',') : [0, 0, 0]
					this.planVisitForm.repeatRate = config.repeatRate ? config.repeatRate.split(',') : [0, 0, 0]
					this.planVisitForm.testeeGroup = res.data.subjectGroupVoList || []
					this.planVisitForm.groupSubjectCodeList = config.subjectGroup ? config.subjectGroup.split(',') : []
					this.planVisitForm.relevanceVisitVoList = res.data.relevanceVisitVoList || []
					this.planVisitForm = this.$utils.deepClone(this.planVisitForm)
					this.isVisitDialog = true
				} else {
					this.isVisitDialog = false
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 保存计划访视
		savePlanVisitForm(info) {
			this.visitDialogType = 3
			info.repeatRate = info.repeatRate.join(',')
			info.later = info.later.join(',')
			info.front = info.front.join(',')
			info.visitInterval = info.visitInterval.join(',')
			info.subjectGroup = info.groupSubjectCodeList.join(',')
			const relevanceInfo = (info.relevanceVisitVoList || []).find(item => { return info.relevanceVisitCode === item.code })
			info.relevanceVisitRepeatNumber = relevanceInfo ? relevanceInfo.visitRepeatNumber : 1
			this.$api.visitForm.saveVisitPlan({ ...info, researchCode: this.researchCode }).then((res) => {
				if (res && res.code === 200) {
					this.isVisitDialog = false
					this.$message.success('修改计划访视成功')
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		}
	}
}
</script>
