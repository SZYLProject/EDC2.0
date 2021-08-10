<template>
  <div class="taskList main-plainTable-content">
    <div class="main-card">
      <div class="main-card-title clearfix">
        <div class="main-icon-label float-left">
          <span>导出任务</span>
        </div>
      </div>
      <div class="main-card-content">
        <dhc-table :tableData="exportTaskList" :paramsData="exportTaskTableParams">
          <template v-slot:status="{ row }">
            <i class="iconfont  main-table-icon" :class="getTaskStyle(row.status).iconfont" :style="{color:getTaskStyle(row.status).color}"> </i>
            <span class="main-buttonSpace">{{ getTaskStyle(row.status).label }}</span>
          </template>
          <template v-slot:operate="{ row }">
            <i class="main-primaryIcon-button iconfont iconrefresh" title="更新" @click="refreshExcel(row )"></i>
            <i class="main-primaryIcon-button main-buttonSpace iconfont icondaochushuju" title="下载" @click="downloadExcel(row)"></i>
            <el-popconfirm
              title="您确定要删除该任务吗？"
              @onConfirm="removeExportExcelTask(row)"
            >
              <i
                slot="reference"
                class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"
                title="删除"
              ></i>
            </el-popconfirm>
            <!-- <i v-if="row.status == 2"
               v-authorizeRole="{
                 itemCode: 'crf_export_reload',
                 menuContainer: $authorContainer,
               }" class="main-primaryIcon-button iconfont iconSDV" @click="refreshExcel(row )"
            ></i>
            <i v-if="row.status == 1"
               v-authorizeRole="{
                 itemCode: 'crf_export_download',
                 menuContainer: $authorContainer,
               }" class="main-primaryIcon-button main-buttonSpace iconfont iconSDV" @click="downloadExcel(row)"
            ></i>
            <el-popconfirm
              v-if="row.status != 0"
              v-authorizeRole="{
                itemCode: 'crf_export_del',
                menuContainer: $authorContainer,
              }"
              title="您确定要删除该任务吗？"
              @onConfirm="removeExportExcelTask(row)"
            >
              <i
                slot="reference"
                class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"
                title="删除"
              ></i>
            </el-popconfirm> -->
          </template>
        </dhc-table>
      </div>
    </div>
    <div class="main-card">
      <div class="main-card-title clearfix">
        <div class="main-icon-label float-left">
          <span>导入任务</span>
        </div>
      </div>
      <div class="main-card-content">
      </div>
    </div>
  </div>
</template>
<script>
import { taskFlag } from '@/assets/js/dictionary.js'
export default {
	name: 'Manage',
	data() {
		return {
			researchCode: this.$route.query.researchCode,
			researchName: this.$route.query.researchName,
			dialogStatus: '',
			loading: false,
			searchVal: '',
			activeNames: [],
			excelTaskListLoading: false,
			// 用户
			searchUserVal: '',
			// exportTaskList: [{ status: 1, name: '1' }, { status: 0, name: '1' }, { status: 2, name: '1' }], // 导出任务列表
			exportTaskList: [], // 导出任务列表
			exportTaskTableParams: [{ prop: 'name', label: '文件名称' },
				{ prop: 'createTime', label: '导出时间' },
				{ prop: 'createBy', label: '操作用户' },
				{ prop: 'status', label: '状态', slot: true, headerAlign: 'center', align: 'left' },
				{ prop: 'operate', label: '操作', slot: true }],
			taskFlag: { // 任务状态
				0: {
					iconfont: 'iconyunshangchuan',
					text: '正在导出，完成后可下载'
				},
				1: {
					iconfont: 'icondaochuchenggong',
					text: '导出成功'
				},
				2: {
					iconfont: 'iconshibai',
					text: '导出失败'
				}
			}
		}
	},
	created() {
		// this.getExportTaskList()
		//          this.getUsersList();
	},
	methods: {
		tableHeaderCn() {
			return 'manage-table_header'
		},
		tableRowCn() {
			return 'manage-table_row'
		},
		getExportTaskList(val) {
			this.excelTaskListLoading = true
			if (val === 'add') {
				this.searchVal = ''
			}
			// getResearchExcel(this.researchCode)
			//   .then((res) => {
			//     console.log('----elcelTask----' + JSON.stringify(res))
			//     this.excelTaskListLoading = false
			//     this.exportTaskList = res.data
			//   }).catch(() => {
			//     this.excelTaskListLoading = false
			//   })
		},
		handleFilter() {
			this.getExportTaskList()
		},
		downloadExcel(item) {
			const href =
        this.$host + '/api/tSiteResearchExcel/downExcel?fileName=' + item.name
			const link = document.createElement('a')
			link.style.display = 'none'
			link.href = href
			link.setAttribute('download', item.name)
			document.body.appendChild(link)
			link.click()
			//          	    window.open(href);
		},
		refreshExcel(row) {
			// console.log('---删除----' + JSON.stringify(row))
			// refreshExportTask(this.researchCode, row.id)
			//   .then((res) => {
			//     this.$message({
			//       type: 'success',
			//       message: res.data
			//     })
			//     this.getExportTaskList()
			//   })
			//   .catch((error) => {
			//     console.log(error)
			//   })
		},
		removeExportExcelTask(row) {
			// console.log('---删除----' + JSON.stringify(row))
			// deleteExportTask(row.id)
			//   .then((res) => {
			//     this.$message({
			//       type: 'success',
			//       message: res.data
			//     })
			//     this.getExportTaskList()
			//   })
			//   .catch((error) => {
			//     console.log(error)
			//   })
		},
		getTypeList(row) {
			// 所属
			if (row.type === 0) {
				return '研究'
			} else if (row.type === 1) {
				const list = []
				row.list.forEach((item) => {
					list.push(item.centerName)
				})
				return list.join(',')
			}
		},
		// 获取style
		getTaskStyle(stauts) {
			return this.$options.filters['filterListItem'](stauts || taskFlag[0].value, taskFlag)
		}
	}
}
</script>
