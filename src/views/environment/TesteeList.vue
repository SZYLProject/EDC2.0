<!--
 * @Author: your name
 * @Date: 2021-03-03 18:25:42
 * @LastEditTime: 2021-08-06 17:51:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\views\environment\TesteeList.vue
-->
<template>
  <div v-loading="isLoading" class="testeeList main-pagination-content" element-loading-text="拼命加载中...">
    <div class="main-table-content main-table">
      <el-table :data="testeeListInfo.subjectInfoList">
        <template v-for="(tableItem, index) in testeeListInfo.tableHeaderVoList">
          <el-table-column
            :key="index"
            :label="tableItem.label"
            align="left"
            :min-width="tableItem.type>2?'210px':'140px'"
          >
            <template slot-scope="scope">
              <div v-if="scope.row[tableItem.prop]" class="testeeList-table-cell">
                <div v-if="tableItem.type == 4">
                  <el-dropdown
                    v-if="scope.row[tableItem.prop].length>1"
                    trigger="click"
                    size="small"
                    @command="addVisit"
                  >
                    <img
                      class="main-primaryTableIcon-button"
                      :src="getIconStyle(scope.row[tableItem.prop][0]).img"
                    />
                    <span class="main-buttonSpace">{{ scope.row[tableItem.prop][0].visitTypeName }}-{{
                      getIconStyle(scope.row[tableItem.prop][0]).label }}&emsp;x{{ scope.row[tableItem.prop].length }}</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(dropItem, dropIndex) in scope.row[tableItem.prop]"
                        :key="dropIndex"
                        :command="composeValue(dropItem, scope.row)"
                      >
                        {{
                          dropItem.plannedTime?(dropItem.name +"&emsp;(&emsp;计划时间:" + dropItem.plannedTime+")"):dropItem.name
                        }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div v-else>
                    <span v-if="!scope.row[tableItem.prop][0].plannedTime" class="cursor" @click="addVisit(scope.row[tableItem.prop][0], scope.row)">
                      <img
                        class="main-primaryTableIcon-button"
                        :src="getIconStyle(scope.row[tableItem.prop][0]).img"
                      />
                      <span class="main-buttonSpace">{{ scope.row[tableItem.prop][0].visitTypeName }}-{{
                        getIconStyle(scope.row[tableItem.prop][0]).label
                      }}</span>
                    </span>
                    <DhcTooltip v-else :content="'计划时间:' + scope.row[tableItem.prop][0].plannedTime">
                      <span class="cursor" @click="addVisit(scope.row[tableItem.prop][0], scope.row)">
                        <img
                          class="main-primaryTableIcon-button"
                          :src="getIconStyle(scope.row[tableItem.prop][0]).img"
                        />
                        <span class="main-buttonSpace">{{ scope.row[tableItem.prop][0].visitTypeName }}-{{
                          getIconStyle(scope.row[tableItem.prop][0]).label
                        }}</span>
                      </span>
                    </DhcTooltip>
                  </div>
                </div>
                <span v-else>
                  <span v-if="tableItem.prop==='gender'">  {{ scope.row[tableItem.prop] | filterListLabel(dictionary.genderType) }}</span>
                  <span v-else-if="tableItem.prop==='patientRelation'">  {{ scope.row[tableItem.prop] | filterListLabel(dictionary.patientRelationType) }}</span>
                  <span v-else>{{ scope.row[tableItem.prop] }}</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" fixed="right" align="left" width="150px" class-name="mian-table-fix-column">
          <template slot-scope="scope">
            <!-- v-authorizeRole="{'itemCode':'visit_not_plan_multiple_add',menuContainer:$authorContainer}" -->
            <el-dropdown
              :hide-on-click="isRepeatTesteeDropdown"
              trigger="click"
              size="small"
              @visible-change="getRepeatTestee"
              @command="addRepeatTestee"
            >
              <i
                class="iconfont iconfuzhi main-primaryIcon-button"
                title="添加可重复访视"
              ></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in repeatTesteeList"
                  :key="item.code"
                  :command="composeValue(item, scope.row)"
                >
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- v-authorizeRole="{'itemCode':'testee_del',menuContainer:$authorContainer}" -->
            <el-popconfirm
              title="您确定要删除该受试者吗？"
              @confirm="deleteTestee(scope.row)"
            >
              <i
                slot="reference"
                class="iconfont iconshanchu main-errorIcon-button main-buttonSpace"
                title="删除"
              ></i>
            </el-popconfirm>
            <!-- v-authorizeRole="{'itemCode':'crf_data_sdv',menuContainer:$authorContainer}" -->
            <!-- <i
              class="main-primaryIcon-button main-buttonSpace iconfont iconSDV"
              @click="setSdv(scope.row, 'SDV')"
            ></i> -->
            <!-- 扫描二维码 -->
            <!-- <i class="main-primaryIcon-button iconfont iconerweima main-buttonSpace" @click="watchQrCode(scope.row, scope.$index)"></i> -->
            <!-- 查看邀请码 -->
            <!-- <i class="main-primaryIcon-button main-buttonSpace  iconfont iconchakan" @click="watchLookCode(scope.row, scope.$index)"></i> -->
            <i
              class="main-primaryIcon-button main-buttonSpace el-icon-picture-outline"
              title="图片"
              @click="setTesteeImg(scope.row, scope.$index)"
            ></i>
            <!-- 拨号 -->
            <i
              class="main-primaryIcon-button main-buttonSpace iconfont iconbohaoxianxing"
              @click="watchLookCode(scope.row, scope.$index)"
            ></i>
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
    <VisitTimeDialog
      v-model="isVisitTimeDialog"
      :visitTimeForm="visitTimeForm"
      @saveVisitTime="saveVisitTime"
    ></VisitTimeDialog>
    <TesteeImgDialog v-model="isTesteeImgDialog" :testeeImgDialogInfo="testeeImgDialogInfo"></TesteeImgDialog>
    <!-- <dhc-dialog
      v-model="isQrcodeDialog"
      :title="qrDialogTitle[qrCodeDIalogType]"
      width="28%"
      :isSureButton="false"
      :isCancelButton="false"
      iconfontType="edit"
      :iconfont="qrDialogIconfont[qrCodeDIalogType]"
    >
      <dhc-qrcode
        v-if="qrCodeDIalogType === 1"
        :codeUrl="qrCodeUrl"
        style="margin: 0 auto"
      ></dhc-qrcode>
      <el-form v-else class="mian-form">
        <el-form-item label="邀请码" label-width="70px">
          <el-input
            v-model="qrCodeNumber"
            placeholder="请输入内容"
            disabled
            style="width: 70%; margin-right: 20px"
          ></el-input>
          <el-button
            v-clipboard:copy="qrCodeNumber"
            v-clipboard:success="clipboardSuccess"
            type="text"
            class="copyBtn"
          >
            复制
          </el-button>
        </el-form-item>
      </el-form>
    </dhc-dialog> -->
    <DhcFloatMenu v-if="isQrcodeDialog" ref="floatBtn">
      <div class="floatMenu-item" @click="takePhone">
        <i class="main-primaryIcon-button iconfont iconbohaoxianxing"></i><span class="main-buttonSpace">拨号</span>
      </div>
      <div class="floatMenu-item" @click="recordSound">
        <i class="iconfont iconluyin main-primaryIcon-button"></i><span class="main-buttonSpace">{{
          recordObject ? "录制中" : "录制"
        }}</span>
      </div>
      <div class="floatMenu-item" @click="isQrcodeDialog = false">
        <i class="main-errorIcon-button iconfont iconshibai"></i><span class="main-buttonSpace">关闭</span>
      </div>
    </DhcFloatMenu>
  </div>
</template>
<script>
import { timestampFormat } from '@/utils/date.js'
import HZRecorder from '@/utils/recorder'
import * as dictionary from '@/assets/js/dictionary'
import { CENTERCODE, CENTERLIST, RESEARCHCODE } from '@/store/stateTypes'
import { mapState } from 'vuex'
import locals from '@/local'
import VisitTimeDialog from '@/components/environment/VisitTimeDialog'
import TesteeImgDialog from '@/components/environment/TesteeImgDialog'
export default {
	components: { VisitTimeDialog, TesteeImgDialog },
	data() {
		return {
			isRepeatTesteeDropdown: false, // 是否重复受试者下拉
			isLoading: false, // 是否是loading
			recordObject: null, // 录音对象
			isRecordSound: true,
			visitTimeForm: {}, // 访视表单
			dictionary, // 字典
			paginationConfig: {
				// 分页
				pageSize: 10,
				pageNum: 1,
				total: 0
			},
			testeeImgDialogInfo: {}, // 图片弹窗信息
			testeeListInfo: {}, // 受试者列表
			isTesteeImgDialog: false, // 图片弹窗
			isVisitTimeDialog: false, // 访视弹窗
			repeatTesteeList: [], // 重复访视列表
			isQrcodeDialog: false, // 二维码弹窗
			qrCodeUrl: '', // 二维码地址
			qrCodeDIalogType: 1, // 二维码弹窗类型
			qrCodeNumber: '', // 二维码编号
			qrDialogTitle: {
				1: '请扫描二维码',
				2: '查看邀请码'
			},
			qrDialogIconfont: {
				// 弹窗图标
				1: 'iconerweima',
				2: 'iconchakan'
			}
		}
	},
	computed: {
		...mapState('research', {
			researchCode: RESEARCHCODE
		}),
		...mapState('environment', {
			centerCode: CENTERCODE,
			centerList: CENTERLIST
		}),
		centerName() {
			return this.$options.filters['filterListLabel'](
				this.centerCode,
				this.centerList,
				'code',
				'name'
			)
		}
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
		this.$bus.$on('saveTestee', this.getTesteeList)
		this.$bus.$on('testeeSearchChange', (testeeSearchForm) => {
			this.getTesteeList(testeeSearchForm)
		})
	},
	beforeDestroy() {
		this.$bus.$off('saveTestee')
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
			console.log(res)
			const resData = res.data || {}
			const { subjectInfoList, tableHeaderVoList } = (resData.result || {})
			this.testeeListInfo = { subjectInfoList: subjectInfoList || [], tableHeaderVoList: tableHeaderVoList || [{ label: '受试者编号',	prop: 'subjectDisplayedNumber', type: 1 }] }
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
		// 获取可重复访视表单
		async getRepeatTestee(show) {
			if (!show) return
			const res = await this.$api.visitForm.getUnplannedRepeatVisitList(this.researchCode)
			this.repeatTesteeList = res.data || []
		},
		// 设置icon
		getIconStyle(item) {
			const status = item.status || this.dictionary.visitStatusType[0].value
			return this.dictionary.visitStatusType.find(statusItem => { return statusItem.value === status })
		},
		// 打开访视弹窗
		addVisit(item, row) {
			const info = this.$utils.deepClone(item)
			if (info.status === this.dictionary.visitStatusType[1].value) { // 1,未开始 2,进行中 3，已完成，4，跳过
				this.goFormDetial(info, row)
			} else if (info.status === this.dictionary.visitStatusType[0].value) {
				if (info.type === this.dictionary.visitType[2].value) {
					this.$api.subject.updateSubjectProcessing(info.code).then(res => {
						if (res && res.code === 200) {
							this.goFormDetial(info, row)
						}
					})
				} else {
					this.visitTimeForm = info
					this.visitTimeForm.code = info.code
					this.visitTimeForm.visitName = info.name
					this.visitTimeForm.detailRow = { info, row }
					this.isVisitTimeDialog = true
				}
			}
		},
		// 保存访视弹窗
		saveVisitTime({ flag, visitTimeForm }) {
			if (flag) {
				this.isVisitTimeDialog = false
				const { info, row } = visitTimeForm.detailRow
				this.goFormDetial(info, row)
			}
		},
		// 复制访视
		addRepeatTestee(item) {
			const info = {
				subjectCode: item.subjectCode,
				structureVisitCode: item.structureVisitCode
			}
			// console.log(item)
			this.$api.visitForm.addRepeatVisit(info).then((res) => {
				if (res && res.code === 200) {
					this.$message.success('添加重复访视成功')
					this.getTesteeList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 返回下拉数据
		composeValue(item, row) {
			return {
				structureVisitCode: item.code,
				subjectCode: row.code,
				...row,
				...item,
				item: item,
				row: row
			}
		},
		// 删除
		deleteTestee(row) {
			this.$api.subject.delSubject(row.code).then((res) => {
				if (res && res.code === 200) {
					this.$message.success('删除受试者成功')
					this.getTesteeList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// SDV
		setSdv(item) {
			locals.setRouteMoreRecord('FormEntry', {
				path: this.$route.path,
				query: this.$route.query
			})
			this.$router.push({
				name: 'FormEntry',
				query: {
					...this.$route.query,
					subjectCode: item.pkId,
					centerCode: this.centerCode,
					title: this.$route.query.title,
					code: item.code,
					centerName: this.centerName
				}
			})
		},
		// 查看二维码
		watchQrCode() {
			this.isQrcodeDialog = true
			this.qrCodeDIalogType = 1
			this.qrCodeUrl = '123123121233'
		},
		// 设置受试者图片
		setTesteeImg(item, row) {
			this.isTesteeImgDialog = true
			this.testeeImgDialogInfo = this.$utils.deepClone(item)
		},
		// 查看邀请码
		watchLookCode() {
			this.isQrcodeDialog = true
			this.qrCodeDIalogType = 2
		},
		// 去form详情
		goFormDetial(item, row) {
			locals.setRouteMoreRecord('FormEntry', {
				path: this.$route.path,
				query: this.$route.query
			})
			this.$router.push({
				name: 'FormEntry',
				query: {
					...this.$route.query,
					subjectCode: item.subjectCode,
					centerCode: this.centerCode,
					title: this.$route.query.title,
					code: item.code,
					centerName: this.centerName
				}
			})
		},
		clipboardSuccess() {
			this.$message.success('复制成功')
		},
		// 打电话
		takePhone() {
			window.location.href = 'tel://' + '12312312'
		},
		// 录音
		recordSound() {
			if (this.recordObject) {
				// 停止录音
				this.recordObject.stop((blob) => {
					// 创建指向音频文件的URL
					const audioURL = (window.URL || webkitURL).createObjectURL(blob)
					this.$utils.downloadFile(audioURL, timestampFormat() + '.mp3');
					(window.URL || webkitURL).revokeObjectURL(audioURL)
					this.recordObject.close()
					this.recordObject = null
				},
				() => {
					this.recordObject = null
					this.recordObject.close()
				}
				)
			} else {
				const recorder = new HZRecorder()
				// console.log( recorder );
				recorder.open((rec) => {
					this.recordObject = rec
					this.recordObject.start()
				})
			}
		}
	}
}
</script>
