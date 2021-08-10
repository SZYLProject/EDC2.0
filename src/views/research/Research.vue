<template>
  <div v-loading="isLoading" element-loading-text="拼命加载中..." class="research main-navBarPagination-content">
    <div v-if="!isEmpty&&!isLoading" class="research-content main-table-content">
      <div v-for="(item,index) in researchList" :key="index" :class="{'research-last-content':researchList.length%2?index+1===researchList.length:index+1>researchList.length-2}">
        <div class="research-content-title">
          <div class="main-icon-label float-left">
            <i class="iconfont iconbiaoqian"></i>
            <span class="word-hidden research-researchName">{{ item.name }}</span>
          </div>
          <!-- <el-popconfirm
            v-if="!isRecovery"
            v-authorizeFunction:research_del
            title="您确定要归档该研究吗？"
            class="float-right research-remove"
            :disabled="item.ascriptionType===1"
            @confirm="remove(item, dictionary.researchOperateStatus[2].value)"
          >
            <img slot="reference" title="归档" :class="{ 'main-disable': item.ascriptionType === 1 }" src="~assets/img/button/bluetheme/remove.png" alt="">
          </el-popconfirm> -->
          <el-popconfirm
            v-if="!isRecovery"
            v-authorizeFunction="{code:$buttonAuthorith.copyResearch,list:item.englishNameList}"
            title="您确定要复制该研究吗？"
            class="float-right research-remove"
            @confirm="copyResearch(item)"
          >
            <img slot="reference" title="复制" src="~assets/img/button/bluetheme/copy.png" alt="">
          </el-popconfirm>
        </div>
        <div :ref="`researchContentWord${index}`" class="research-content-word" :style="{height:researchContentWordHeight[index]}">
          <span>研究编号：{{ item.researchNumber }}</span>
          <span>研究类型：{{ item.type |filterListLabel(dictionary.researchType) }}</span>
          <span>样本量：{{ item.planNumber || 0 }}</span>
          <span>研究周期： {{ item.startDate|filterSubstringDate() }} - {{ item.endDate|filterSubstringDate() }}</span>
        </div>
        <div class="research-content-operate">
          <div v-if="!isRecovery" class="research-environment float-left">
            <el-button
              type="text"
              icon="iconfont iconceshi"
              :disabled="item.status === dictionary.researchStatus[0].value"
              @click="goEnvironment(item, item.status)"
            >
              <!--  -->
              {{ researchFlag[item.status] }}
            </el-button>
          </div>
          <div v-if="!isRecovery" class="research-operate float-right">
            <el-button
              v-authorizeFunction="{code:$buttonAuthorith.setting,list:item.englishNameList}"
              title="研究配置"
              type="primary"
              icon="iconfont iconshezhi"
              round
              @click="goSetting(item)"
            >
            </el-button>
            <el-button
              v-authorizeFunction="{code:$buttonAuthorith.design,list:item.englishNameList}"
              class="main-buttonSpace"
              title="访视设置"
              type="primary"
              icon="iconfont iconsheji"
              round
              @click="goVisit(item)"
            >
            </el-button>
            <el-popconfirm
              v-authorizeFunction="{code:$buttonAuthorith.recycleResearch,list:item.englishNameList}"
              title="您确定要删除该研究吗？"
              :disabled="item.ascriptionType === 1"
              @confirm="deleteResearch(item, dictionary.researchOperateStatus[1].value)"
            >
              <el-button
                slot="reference"
                :disabled="item.ascriptionType === 1"
                title="删除"
                type="primary"
                class="main-buttonSpace"
                icon="iconfont iconshanchu"
                round
              >
              </el-button>
            </el-popconfirm>
          </div>
          <div v-else class="research-operate float-right">
            <el-popconfirm
              v-authorizeFunction="{code:$buttonAuthorith.resetResearch,list:item.englishNameList}"
              title="您确定要还原该研究吗？"
              class="research-remove float-right"
              :disabled="item.ascriptionType === 1"
              @confirm="resetResearch(item, dictionary.researchOperateStatus[0].value)"
            >
              <el-button
                slot="reference"
                title="还原"
                type="primary"
                :disabled="item.ascriptionType === 1"
                icon="iconfont iconshengcheng"
                round
              >
              </el-button>
            </el-popconfirm>
            <el-popconfirm
              v-authorizeFunction="{code:$buttonAuthorith.deleteResearch,list:item.englishNameList}"
              title="您确定要删除该研究吗？"
              class="research-remove float-right"
              :disabled="item.ascriptionType === 1"
              @confirm="deleteResearchFromRecycleBin(item, dictionary.researchOperateStatus[1].value)"
            >
              <el-button
                slot="reference"
                :disabled="item.ascriptionType === 1"
                title="删除"
                type="primary"
                icon="iconfont iconshanchu"
                round
              >
              </el-button>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
    <dhc-pagination
      v-show="!isEmpty"
      :page-size="paginationConfig.pageSize"
      :current-page="paginationConfig.pageNum"
      :total="paginationConfig.total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    ></dhc-pagination>
    <Empty v-show="isEmpty&&!isLoading">
      <el-button
        v-if="!isRecovery"
        v-authorizeFunction="{code:$buttonAuthorith.addResearch,list:userRauthority}"
        type="primary"
        class="main-primary-button"
        icon="iconfont iconxinjian"
        @click="setResearchDialog"
      >
        新建研究
      </el-button>
    </Empty>
    <!-- 新建研究弹框 -->
    <ResearchDialog
      v-model="isResearchDialog"
      title="新建研究"
      :researchForm="researchForm"
      @saveResearch="saveResearch"
    ></ResearchDialog>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { NAVBARTYPE, ISEMPTY, USERAUTHORITY } from '@/store/stateTypes'
import { SETISEMPTY } from '@/store/mutationTypes'
import ResearchDialog from '@/components/research/ResearchDialog'
import { mapState, mapMutations } from 'vuex'
import Empty from '@/components/Empty'
import locals from '@/local'
export default {
	name: 'Research',
	components: {
		ResearchDialog,
		Empty
	},
	data() {
		return {
			researchFlag: { // 研究状态
				1: '设计中',
				2: '进入研究'
			},
			isResearchDialog: false, // 研究弹窗状态
			researchContentWordHeight: {}, // 盒子高度
			dictionary, // 字典
			isLoading: true, // loading
			researchList: [], // 查询列表
			paginationConfig: {
				// 分页参数
				pageNum: 1,
				total: 0,
				pageSize: 10
			},
			researchForm: {} // 研究弹窗表单
		}
	},
	computed: {
		...mapState('base', {
			navBarType: NAVBARTYPE,
			isEmpty: ISEMPTY,
			userRauthority: USERAUTHORITY
		}),
		isRecovery() {
			return this.navBarType === 'Recovery'
		},
		deleteStatus() {
			return this.isRecovery ? this.dictionary.researchOperateStatus[1].value : this.dictionary.researchOperateStatus[0].value
		}
	},
	watch: {
		$route: {
			handler() {
				this.initResearchList()
			},
			immediate: true
		},
		researchList: {
			handler() {
				this.setResearchContentWordHeight()
			},
			deep: true
		}
	},
	created() {
		this.$bus.$on('searchResearch', (researchName) => {
			this.getResearchList(researchName)
		})
		this.$bus.$on('addResearch', () => {
			this.setResearchDialog()
		})
		const that = this
		window.onresize = function() {
			that.setResearchContentWordHeight()
		}
	},
	methods: {
		...mapMutations('base', {
			setIsEmpty: SETISEMPTY
		}),
		// 设置研究弹窗
		setResearchDialog() {
			this.isResearchDialog = true
			this.researchForm = {
				planNumber: 1
			}
		},
		// 设置高度
		setResearchContentWordHeight() {
			this.researchContentWordHeight = {}
			this.$nextTick(() => {
				this.researchList.forEach((item, index) => {
					if (index % 2 !== 0) {
						const leftHeight = this.$refs[`researchContentWord${index - 1}`][0].offsetHeight
						const righteftHeight = this.$refs[`researchContentWord${index}`][0].offsetHeight
						const height = leftHeight > righteftHeight ? leftHeight : leftHeight === righteftHeight ? '' : righteftHeight
						this.$set(this.researchContentWordHeight, index, height + 'px')
						this.$set(this.researchContentWordHeight, index - 1, height + 'px')
					} else {
						if (index === this.researchList.length) {
							this.$set(this.researchContentWordHeight, index, '')
						}
					}
				})
			})
		},
		// 初始化查询列表
		initResearchList() {
			// this.paginationConfig = this.isRecovery || !locals.getResearchPaginationConfig()	? {	pageNum: 1,	total: 0, pageSize: 10, researchName: ''	} : locals.getResearchPaginationConfig()
			this.getResearchList(this.paginationConfig.researchName)
		},
		// 保存研究
		saveResearch(form) {
			this.$api.research.addResearch(form).then((res) => {
				if (res && res.code === 200) {
					this.$message.success('添加研究成功')
					this.isResearchDialog = false
					this.getResearchList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 获取列表
		async	getResearchList(name) {
			this.isLoading = true
			this.setIsEmpty(false)
			const res = await this.$api.research.getResearchList({	...this.paginationConfig,
				query: {
					deleteStatus: this.deleteStatus,
					name: ''
				}
			})
			if (res && res.code === 200) {
				this.researchList = res.data.result || []
				this.$set(this.paginationConfig, 'total', res.data.total)
				if (!this.isRecovery) {
					this.$set(this.paginationConfig, 'researchName', name)
					locals.setResearchPaginationConfig(this.paginationConfig)
				}
			} else {
				this.researchList = []
			}
			this.isLoading = false
			this.setIsEmpty(!this.researchList.length)
		},
		// 设置
		goSetting(item) {
			this.$router.push({
				name: 'Setting',
				query: { researchId: item.id }
			})
		},
		// 去环境
		goEnvironment(item, type) {
			this.$router.push({
				name: 'Home',
				query: {
					researchId: item.id
				}
			})
		},
		// 去访视
		goVisit(item) {
			this.$router.push({
				name: 'VisitList',
				query: { researchId: item.id }
			})
		},
		// 复制
		copyResearch(item) {
			this.$api.research.copyResearch(item.id).then(res => {
				if (res && res.code === 200) {
					this.$message.success('复制成功')
					this.getResearchList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 还原研究
		resetResearch(item) {
			this.$api.research.resetResearch(item.id).then(res => {
				if (res && res.code === 200) {
					this.$message.success('还原成功')
					this.getResearchList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 删除
		deleteResearch(item) {
			this.$api.research.deleteResearch(item.id).then(res => {
				if (res && res.code === 200) {
					this.$message.success('删除成功')
					this.getResearchList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 从回收站中删除研究
		deleteResearchFromRecycleBin(item) {
			this.$api.research.deleteResearchFromRecycleBin(item.id).then(res => {
				if (res && res.code === 200) {
					this.$message.success('删除成功')
					this.getResearchList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 页码
		handleCurrentChange(pageNum) {
			this.$set(this.paginationConfig, 'pageNum', pageNum)
			this.getResearchList()
		},
		// 分页数量
		handleSizeChange(pageSize) {
			this.$set(this.paginationConfig, 'pageNum', 1)
			this.$set(this.paginationConfig, 'pageSize', pageSize)
			this.getResearchList()
		}
	}
}
</script>
