<!--
 * @Author: your name
 * @Date: 2021-05-06 16:38:23
 * @LastEditTime: 2021-06-23 15:53:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\formDesign\FormOperate.vue
-->
<template>
  <div>
    <el-button type="primary" title="备注" class="main-primaryIcon-button iconfont iconbeizhu" :disabled="!!(formOption.remarkStatus===dictionary.remarkFlag[1].value && formOption.remark && formOption.pkId)||(status&&operateFlag===2)" @click="setRemark(formOption, 1)"></el-button>
    <el-button v-if="formOption.sdv" :disabled="status&&operateFlag===2" title="SDV" type="primary" class="main-primaryIcon-button main-buttonSpace iconfont iconSDV" :style="{color: !isSubmit ? '#c4c4c4' : formOption.sdvStatus ? '#41d46a' : '#fc7a58' }" @click="changeSDV(formOption)"></el-button>
    <el-button :disabled="status&&operateFlag===2" :style="{ color: getQueryColor(formOption.status) }" title="质疑" type="primary" class="main-primaryIcon-button main-buttonSpace iconfont iconzhiyiguanli" @click="watchQuery(formOption, index)"></el-button>
    <el-button :disabled="status&&operateFlag===2" type="primary" title="浏览痕迹" class="main-primaryIcon-button main-buttonSpace iconfont iconchakanhenji" @click="watchTrailList(formOption)"></el-button>
    <!-- 备注 -->
    <RemarkDialog
      v-model="isRemarkDialog"
      :remarkForm="remarkForm"
      :remarkOperateFlag="1"
      @saveRemark="updateRemark"
    >
    </RemarkDialog>
    <!-- 质疑 -->
    <dhc-dialog
      v-model="isQuestionDialog"
      :title="questionDialogTitle"
      :isSureButton="false"
      :isCancelButton="false"
      iconfontType="edit"
      :appendBody="true"
      :iconfont="questionDialogFlag === 1?'iconzhiyiguanli':'iconchakanhenji'"
    >
      <div v-if="isQuestionDialog" class="dialog-footer">
        <QueryForm
          v-if="questionDialogFlag === 1"
          ref="queryForm"
          :currentIndex="currentQueryIndex"
          :queryList="queryDialogList"
          @sendQuery="sendQuery"
          @updateQuery="updateQuery"
          @setIndex="setQueryIndex"
          @closeQuery="closeQuery"
        ></QueryForm>
        <TarilDialogTable
          v-if="questionDialogFlag === 2"
          :disabled="tarilDisabled"
          :trailList="trailList"
          :questionDialogShow="isQuestionDialog"
          :trailPageConfig="trailPageConfig"
          @listLoad="getTrailList"
        />
      </div>
    </dhc-dialog>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import TarilDialogTable from '@/components/formDesign/TarilTable'
import QueryForm from '@/components/environment/QueryForm'
import RemarkDialog from '@/components/formDesign/RemarkDialog'
export default {
	components: {
		QueryForm,
		TarilDialogTable,
		RemarkDialog
	},
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
		type: { // 2,是包含设置的sdv等功能
			type: Number,
			default: 1
		},
		isSubmit: { // 是否提交
			type: [Boolean, Number],
			default: false
		},
		status: { // 提交状态
			type: [Boolean, Number],
			default: false
		}
	},
	data() {
		return {
			dictionary, // 字典
			isRemarkDialog: false, // 备注弹窗状态
			remarkForm: { // 备注表单
				remark: '',
				pkId: ''
			},
			isQuestionDialog: false, // 弹窗状态
			questionDialogTitle: '', // 弹窗title
			currentQueryIndex: 0, // 当前质疑序号
			queryDialogList: [], // 质疑列表
			questionForm: {}, // 质疑表单
			questionDialogFlag: 1, // 内容状态类型 (1是质疑2是痕迹)
			trailPageConfig: { // 痕迹列表分页项
				pageNum: 0,
				pageSize: 3,
				total: 0
			},
			trailList: []// 痕迹列表
		}
	},
	computed: {
		tarilDisabled() {
			return Math.ceil(this.trailPageConfig.total / this.trailPageConfig.pageSize) <= this.trailPageConfig.pageNum
		}
	},
	watch: {
		isQuestionDialog(value) {
			this.$emit('getDialogFlag', value)
		},
		isRemarkDialog(value) {
			this.$emit('getDialogFlag', value)
		}
	},
	mounted() {
	},
	methods: {
		// 获取状态
		getQueryColor(stauts) {
			return this.$options.filters['filterListLabel'](
				stauts,
				this.dictionary.queryFlag,
				'value',
				'color'
			)
		},
		// 查询质疑
		watchQuery(item) {
			if (this.status || !item.pkId || this.operateFlag === 1) { return }
			this.isQuestionDialog = true
			this.questionDialogFlag = 1
			this.questionDialogTitle = `质疑：${item.itemName}`
			this.queryDialogList = []
			this.questionForm = item
			this.$api.dataQuery.getAllDataQueryList({ formDataId: item.pkId || ''	}).then((res) => {
				if (res && res.code === 200) {
					this.queryDialogList = res.data || []
					this.queryDialogList.map((subItem, subIndex) => {
						if (subItem.code === item.code) {
							this.currentQueryIndex = subIndex
						}
					})
					if (this.queryDialogList.length) {
						this.$set(this.queryDialogList[this.currentQueryIndex], 'canSend', false)
					}
					this.$refs.queryForm.scrollBottom()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 发送质疑
		sendQuery(info) {
			this.$api.dataQuery.addDataQuery({
				content: info.item.content,
				createRole: 'CRC',
				itemCode: this.questionForm.itemCode,
				dataQueryListId: info.item.pkId
			}).then((res) => {
				if (res && res.code === 200) {
					this.queryDialogList = res.data || []
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 添加质疑
		updateQuery(info) {
			this.$api.dataQuery.addDataQueryList({
				content: info.item.content,
				formDataId: this.questionForm.pkId,
				createRole: 'CRA',
				itemCode: this.questionForm.itemCode,
				researchCode: this.questionForm.researchCode
			}).then((res) => {
				if (res && res.code === 200) {
					this.queryDialogList = res.data || []
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		closeQuery() {},
		// 设置质疑列表序号
		setQueryIndex(index) {
			this.currentQueryIndex = index
		},
		// 改变sdv
		changeSDV(item) {
			if (this.status || !item.pkId || this.operateFlag === 1) return
			const formData = { pkId: item.pkId, sdvStatus: item.sdvStatus ? 0 : 1 }
			this.$api.formData.updateSDV({ formData }).then((res) => {
				if (res && res.code === 200) {
					this.$emit('changeSDV', { ...formData, index: this.index })
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 查询浏览记录
		watchTrailList(item) {
			if (this.status || this.operateFlag === 1) return
			this.questionDialogFlag = 2
			this.isQuestionDialog = true
			this.questionDialogTitle = '痕迹记录'
			this.$set(this.trailPageConfig, 'pageNum', 0)
			this.getTrailList(item.pkId)
		},
		// 痕迹列表search
		getTrailList(formDataId) {
			if (!formDataId) return
			this.trailPageConfig.pageNum++
			this.$api.subject.subjectDataTrail({
				...this.trailPageConfig,
				...this.currentTrail,
				query: { formDataId }
			}).then((res) => {
				if (res && res.code === 200) {
					this.$set(this.trailPageConfig, 'total', res.data.total)
					this.trailList = this.trailPageConfig.pageNum === 1 ? res.data.data : this.trailList.concat(res.data.data)
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 备注
		setRemark(item, type) { // 1 添加,2编辑，0,删除
			if (this.status || this.operateFlag === 1) return
			this.$set(this.remarkForm, 'pkId', item.pkId)
			this.$set(this.remarkForm, 'remark', this.formOption.remark || '')
			this.isRemarkDialog = true
		},
		// 备注
		updateRemark(info) {
			this.isRemarkDialog = false
			this.$emit('updateRemark', { ...info, index: this.index, itemCode: this.formOption.itemCode })
		}
	}
}
</script>
