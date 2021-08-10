<!--
 * @Author: your name
 * @Date: 2021-03-03 18:25:42
 * @LastEditTime: 2021-08-06 14:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\views\environment\TesteeList.vue
-->
<template>
  <div v-loading="isLoading" class="testeeList main-pagination-content" element-loading-text="拼命加载中...">
    <div class="main-table-content main-table">
      <el-table :key="new Date().toString()" row-key="code" :data="testeeListInfo.subjectInfoList">
        <template v-for="(tableItem, index) in testeeListInfo.tableHeaderVoList">
          <el-table-column
            :key="index"
            :label="tableItem.label"
            align="left"
            min-width="130px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row[tableItem.prop]">
                <span v-if="tableItem.type !== 4">
                  <span v-if="tableItem.prop==='gender'">  {{ scope.row[tableItem.prop] | filterListLabel(dictionary.genderType) }}</span>
                  <span v-else-if="tableItem.prop==='patientRelation'">  {{ scope.row[tableItem.prop] | filterListLabel(dictionary.patientRelationType) }}</span>
                  <span v-else>{{ scope.row[tableItem.prop] }}</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              class="main-primary-button"
              @click="agreeSubject(scope.row, '1')"
            >
              同意
            </el-button>
            <el-button
              class="main-cancel-button  main-buttonSpace"
              @click="agreeSubject(scope.row, '2')"
            >
              拒绝
            </el-button> -->
            <el-switch
              v-model="scope.row.selectStatus"
              active-text="同意"
              inactive-text="拒绝"
              class="main-switch"
              @change="agreeSubject(scope.row)"
            >
            </el-switch>
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
import { CENTERCODE, RESEARCHCODE } from '@/store/stateTypes'
import { mapState } from 'vuex'
import * as dictionary from '@/assets/js/dictionary'
export default {
	data() {
		return {
			paginationConfig: {
				// 分页
				pageSize: 10,
				pageNum: 1,
				total: 0
			},
			dictionary, // 字典
			testeeListInfo: {} // 受试者列表
		}
	},
	computed: {
		...mapState('environment', {
			centerCode: CENTERCODE
		}),
		...mapState('research', {
			researchCode: RESEARCHCODE
		})
	},
	watch: {
		centerCode: {
			handler() {
				this.getTesteeList()
			},
			immediate: true
		}
	},
	mounted() {
		this.$bus.$on('testeeSearchChange', (testeeSearchForm) => {
			this.getTesteeList(testeeSearchForm)
		})
	},
	beforeDestroy() {
		this.$bus.$off('testeeSearchChange')
	},
	methods: {
		// 获取受试者列表
		async	getTesteeList(info) {
			const query = {
				researchCode: this.researchCode,
				centerCode: this.centerCode,
				...info
			}
			this.isLoading = true
			const res = await this.$api.subject.getCaseList({ ...this.paginationConfig, query })
			const resData = res.data || {}
			const { subjectInfoList, tableHeaderVoList } = (resData.result || {})
			const tableHeaderPropList = (tableHeaderVoList || []).filter(item => {
				item.selectStatus = true
				return item.type !== 4
			})
			this.testeeListInfo = { subjectInfoList: subjectInfoList || [], tableHeaderVoList: tableHeaderPropList || [{ label: '受试者编号',	prop: 'subjectDisplayedNumber', type: 1 }] }
			if (res && res.code === 200) {
				this.$set(this.paginationConfig, 'total', res.data.total)
			} else {
				if (res && res.msg) this.$message.error(res.msg)
			}
			this.isLoading = false
		},
		// 页码
		handleCurrentChange(pageNum) {
			this.$set(this.paginationConfig, 'pageNum', pageNum)
			this.getTesteeList()
		},
		// 分页数量
		handleSizeChange(pageSize) {
			this.$set(this.paginationConfig, 'pageSize', pageSize)
			this.$set(this.paginationConfig, 'pageNum', 1)
			this.getTesteeList()
		},
		// 同意
		agreeSubject(item) {
			console.log(item)
		}
	}
}
</script>
<style lang="scss" scoped>
.testee-list-wrap {
  flex: 1;
  @include flex(column, center, space-between);
  .testee-middle-wrap {
    flex: 1;
    width: 100%;
    overflow-y: auto;
  }
  .p-table-wrap {
    flex: 1;
    // overflow-y: auto;
    padding-bottom: 60px;
    .edit-wrap {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
    }
    .icon {
      font-size: 18px;
      color: #2c5c89;
    }
    .footer-page-wrap {
      background: #fff;
      z-index: 6;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      @include flex("", center, flex-end);
      @include padding(0, 40px, 0, 0);
      margin-left: 2px;
    }
  }
}
</style>
