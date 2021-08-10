<template>
  <div class="systemLog  main-navBarPagination-content">
    <div class="main-searchForm">
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">操作类型:</span>
        <el-select
          v-model="searchForm.operateType"
          placeholder="请选择"
          class="main-searchForm-input"
        >
          <el-option
            v-for="item in dictionary.operateType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">操作用户:</span>
        <el-input v-model="searchForm.userName" class="main-searchForm-input"></el-input>
      </div>
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">操作环境:</span>
        <el-select
          v-model="searchForm.env"
          placeholder="请选择"
          class="main-searchForm-input"
        >
          <el-option
            v-for="item in dictionary.environmentType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">日志类型:</span>
        <el-select v-model="searchForm.logType" class="main-searchForm-input">
          <el-option
            v-for="item in dictionary.logType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="main-searchForm">
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">ip:</span>
        <el-input v-model="searchForm.ip" class="main-searchForm-input"></el-input>
      </div>
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">开始时间:</span>
        <el-date-picker
          v-model="searchForm.operateDateBegin"
          class="main-searchForm-input"
          type="datetime"
          prefix-icon="iconfont iconrili"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </div>
      <div class="main-searchForm-item">
        <span class="main-searchForm-label">结束时间:</span>
        <el-date-picker
          v-model="searchForm.operateDateEnd"
          class="main-searchForm-input"
          type="datetime"
          prefix-icon="iconfont iconrili"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </div>
      <div class="main-searchForm-item">
        <el-button class="main-primary-button" @click="getLogList">
          搜索
        </el-button>
        <el-button class="main-cancel-button" plain @click="resetSearch">
          重置
        </el-button>
      </div>
    </div>
    <div class="main-table systemLog-table main-table-content">
      <el-table
        ref="baseTable"
        :data="logList"
        border
      >
        <el-table-column
          v-for="(item, i) in logTableParams"
          :key="i"
          :show-overflow-tooltip="item.hideMore"
          :sort-orders="['ascending', 'descending']"
          :prop="item.prop"
          align="center"
          :fixed="item.fixed"
          :sortable="item.sort"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span v-if="item.filter">
              {{
                scope.row[item.prop] | filterListLabel(dictionary[item.filter])
              }}
            </span>
            <span v-else>
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          :width="80"
          align="center"
        >
          <template slot-scope="scope">
            <i class="main-primaryIcon-button  iconfont iconchakan1" title="查看" @click="watchLogDetial(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dhc-pagination
      :page-size="paginationConfig.pageSize"
      :current-page="paginationConfig.pageNum"
      :total="paginationConfig.total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    ></dhc-pagination>
  </div>
</template>
<script>
import locals from '@/local'
import * as dictionary from '@/assets/js/dictionary'
import { systemOperateLog, systemExceptionLog } from '@/assets/js/tableParams'
export default {
	data() {
		return {
			dictionary, // 字典
			logTableParams: systemOperateLog, // 日志表格参数
			logList: [],
			paginationConfig: {
				total: 0,
				pageSize: 10,
				pageNum: 1
			},
			searchForm: this.initResearchForm()
		}
	},
	computed: {
		tableHeight() {
			return 55 * (this.logList.length || 2)
		}
	},
	created() {
		this.getLogList()
	},
	methods: {
		// 重置
		resetSearch() {
			this.searchForm = this.initResearchForm()
			this.$set(this.paginationConfig, 'pageNum', 1)
			this.$set(this.paginationConfig, 'pageSize', 10)
			this.getLogList()
		},
		// 初始表单
		initResearchForm() {
			return {
				researchCode: this.$route.query.researchCode || locals.getResearchCode(),
				// versionCode: locals.getVersionCode(),
				researchVersionNum: '',
				operateType: '',
				userId: '',
				userName: '',
				env: Number(this.$route.query.env) || locals.getEnvironmentCode(),
				ip: '',
				operateDateBegin: '',
				operateDateEnd: '',
				logType: dictionary.logType[0].value
			}
		},
		// 查看详情
		watchLogDetial(row) {
			locals.setRouteMoreRecord('SystemLogDetail', {
				path: this.$route.path,
				query: this.$route.query
			})
			this.$router.push({
				name: 'SystemLogDetail',
				query: { logId: row.pkId, ...this.$route.query }
			})
		},
		// 分页数量
		handleSizeChange(pageSize) {
			this.$set(this.paginationConfig, 'pageNum', 1)
			this.$set(this.paginationConfig, 'pageSize', pageSize)
			this.getLogList()
		},
		// 页码
		handleCurrentChange(pageNum) {
			this.$set(this.paginationConfig, 'pageNum', pageNum)
			this.getLogList()
		},
		// 获取日志列表
		getLogList() {
			const params = {
				query: this.searchForm,
				...this.paginationConfig
			}
			this.$api.systemLog.page(params).then((res) => {
				if (res && res.code === 200) {
					this.logTableParams = this.searchForm.logType === 2 ? systemExceptionLog : systemOperateLog
					this.paginationConfig.total = 10 || res.data.total
					this.logList = [{ logType: 1 }, { logType: 1 }, { logType: 1 },	{ logType: 1 }, { logType: 1 },	{ logType: 1 },	{ logType: 1 },	{ logType: 1 }, { logType: 1 }] || res.data.data
					// this.versionSelector = res.data.versionSelector
				}
			})
		}
	}
}
</script>
