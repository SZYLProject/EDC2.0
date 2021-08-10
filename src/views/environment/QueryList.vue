<template>
  <div v-loading="isLoading" class="queryList" element-loading-text="拼命加载中...">
    <dhc-table :tableData="queryList" :paramsData="queryTableParams">
      <template v-slot:dataStatus="{ row }">
        <i class="iconfont iconzhiyiguanli main-table-icon" :style="{color:getQueryColor(row.dataStatus)}"></i><span class="main-buttonSpace">{{ row.dataStatus|filterListLabel(queryFlag) }}</span>
      </template>
      <template v-slot:operate="{ row }">
        <i class="main-primaryIcon-button iconfont iconchakan" title="查看" @click="watchQuery(row)"></i>
        <i class="main-warningIcon-button main-buttonSpace iconfont iconxinjian" title="回复" @click="replyQuery(row)"></i>
      </template>
    </dhc-table>
    <dhc-dialog
      v-model="isQueryDialog"
      :title="queryDialogTitle"
      :isSureButton="false"
      :isCancelButton="false"
      iconfontType="edit"
      iconfont="iconzhiyiguanli"
      width="40%"
    >
      <div v-if="isQueryDialog" class="dialog-footer">
        <QueryForm
          ref="queryForm"
          :currentIndex="currentQueryIndex"
          :queryList="queryDialogList"
          @sendQuery="sendQuery"
          @updateQuery="updateQuery"
          @setIndex="setQueryIndex"
          @closeQuery="closeQuery"
        ></QueryForm>
      </div>
    </dhc-dialog>
  </div>
</template>
<script>
import { CENTERCODE, CENTERLIST } from '@/store/stateTypes'
import { queryFlag } from '@/assets/js/dictionary.js'
import QueryForm from '@/components/environment/QueryForm'
import { mapState } from 'vuex'
import locals from '@/local'
export default {
	name: 'TesteeQuery',
	components: {
		QueryForm
	},
	data() {
		return {
			isLoading: false, // 是否是loading
			queryFlag, // 质疑状态
			queryDialogTitle: '', // 质疑弹窗title
			queryList: [], // 质疑列表
			queryTableParams: [{ prop: 'outpatientNumber', label: '受试者编号' }, { prop: 'visitName', label: '访视名称' }, { prop: 'formName', label: '表单名称' },
				{ prop: 'itemName', label: '问题' }, { prop: 'value', label: '值' }, { prop: 'content', label: '质疑内容' }, { prop: 'dataStatus', label: '质疑状态', slot: true, align: 'left' }, { prop: 'operate', label: '编辑', slot: true }],
			isQueryDialog: false, // 质疑弹窗
			queryDialogList: [// 弹窗质疑列表
				{
					list: []
				}
			],
			currentQueryIndex: 0, // 当前质疑序号
			queryItem: {}// 质疑项
		}
	},
	computed: {
		...mapState('environment', {
			centerCode: CENTERCODE,
			centerList: CENTERLIST
		}),
		centerName() {
			return this.$options.filters['filterListLabel'](this.centerCode, this.centerList, 'centerCode', 'centerName')
		}
	},
	watch: {
		centerCode: {
			handler() {
				// this.queryList = [{ visitName: '新增质疑', dataStatus: 11, formDataId: '12312132', content: '12312', list: [{ creatName: '12321', creatRole: '管理员', creatTime: '2021-2-2 11:12:10', content: '1231212313231是2号1看看2就32 就就2' }] }, { visitName: '等待我回复', dataStatus: 12, content: '12312' }, { visitName: '等待他人回复', dataStatus: 13 }, { visitName: '已关闭质疑', dataStatus: 14 }]
				// this.getQueryList()
			},
			immediate: true
		}
	},
	methods: {
		// 获取版本，研究信息
		getLocalsCode() {
			const researchCode = this.$route.query.researchCode || locals.getResearchCode()
			return { researchCode }
		},
		// 获取质疑列表
		async getQueryList() {
			this.isLoading = true
			const res = await this.$api.dataQuery.getAllDataQueryListBySite({
				centerCode: this.centerCode,
				...this.getLocalsCode(),
				creatRole: 'EDC'
			})
			if (res && res.code === 200) {
				this.queryList = res.data || []
			}
			this.isLoading = false
		},
		// 查看
		watchQuery(item) {
			locals.setRouteMoreRecord('FormEntry', {
				path: this.$route.path,
				query: this.$route.query
			})
			this.$router.push({
				name: 'FormEntry',
				query: {
					centerName: this.centerName,
					centerCode: this.centerCode,
					parentCode: item.parentCode,
					patientId: item.patientId,
					...this.getLocalsCode(),
					subID: item.subjectId,
					flag: true
				}
			})
		},
		// 回复质疑
		replyQuery(item) {
			this.queryItem = item
			this.isQueryDialog = true
			this.queryDialogTitle = `质疑：${item.itemName}`
			this.queryDialogList = []
			this.$api.dataQuery.getAllDataQueryList({
				formDataId: item.formDataId,
				visitCode: item.visitCode,
				...this.getLocalsCode()
			}).then((res) => {
				if (res && res.code === 200) {
					this.queryDialogList = this.queryList || res.data || []
					for (let i = 0; i < this.queryDialogList.length; i++) {
						if (this.queryDialogList[i].code === item.code) {
							this.currentQueryIndex = i
							break
						}
					}
					if (this.queryDialogList.length) {
						this.$set(this.queryDialogList[this.currentQueryIndex], 'canSend', false)
					}
					this.$refs.queryForm.scrollBottom()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 关闭质疑
		closeQuery(info) {
			this.$api.dataQuery.stopDataQueryList({
				createRole: 'CRC',
				itemCode: this.queryItem.itemCode,
				dataQueryListId: info.pkId
			}).then((res) => {
				if (res && res.code === 200) {
					this.$message.success(res.msg)
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
				itemCode: this.queryItem.itemCode,
				dataQueryListId: info.item.pkId
			}).then((res) => {
				if (res && res.code === 200) {
					this.queryDialogList = res.data
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 更新质疑
		updateQuery(info) {
			this.$api.dataQuery.addDataQueryList({
				content: info.item.content,
				formDataId: this.queryItem.pkId,
				createRole: 'CRA',
				itemCode: this.queryItem.itemCode,
				...this.getLocalsCode()
			}).then((res) => {
				if (res && res.code === 200) {
					this.queryDialogList = res.data
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 设置index
		setQueryIndex(index) {
			this.$set(this, 'currentQueryIndex', index)
		},
		// 获取状态
		getQueryColor(stauts) {
			return this.$options.filters['filterListLabel'](stauts, queryFlag, 'value', 'color')
		}
	}
}
</script>
