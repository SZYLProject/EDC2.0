<template>
  <div class="navBar clearfix" :class="{ isBorder: isBorder }">
    <div class="navBar-box">
      <div v-show="navBarType === 'Research'" class="navBar-box-left float-left">
        <el-button
          v-show="!isEmpty"
          v-authorizeFunction="{code:$buttonAuthorith.addResearch,list:userRauthority}"
          type="primary"
          class="main-primary-button"
          icon="iconfont iconxinjian"
          @click="$emit('addResearch')"
        >
          新建研究
        </el-button>
      </div>
      <div
        v-if="navBarType === 'Research'"
        class="navBar-box-right float-right"
      >
        <el-button
          v-authorizeFunction="{code:$buttonAuthorith.recycleBin,list:userRauthority}"
          type="primary"
          class="main-plain-button main-img-button"
          @click="$emit('toRecovery')"
        >
          <img src="~assets/img/button/bluetheme/recovery.png" alt="" /> 回收站
        </el-button>
        <el-input
          v-model="navSearchForm.researchName"
          placeholder="请输入研究名称查询"
          class="main-search-input main-space"
        >
          <i
            slot="suffix"
            class="iconfont iconsousuo"
            @click="$emit('searchResearch', navSearchForm.researchName)"
          ></i>
        </el-input>
      </div>
      <div v-show="isGoBack" class="navBar-box-left float-left">
        <el-link :underline="false">
          <span class="main-icon-label" @click="$emit('goBack', navBarType)">
            <span
              class="main-icon-label-back el-icon-arrow-left"
            ></span>
            <i
              v-if=" $route.query.title|| researchNameTitle "
              class="iconfont iconbiaoqian"
            ></i>
            <span>{{ $route.meta.navBarTitle || $route.query.title|| researchNameTitle }}</span>
          </span>
        </el-link>
      </div>
      <div v-if="isVisit" class="navBar-box-right float-right">
        <!-- <el-button
          type="text"
          class="main-plainText-button"
          @click="$emit('publishVisitHistory')"
        >
          发布历史
        </el-button> -->
        <span v-if="navBarType === 'VisitList'" class="main-status-label">
          <i :style="{backgroundColor:$options.filters['filterListItem'](researchStatus, dictionary.researchStatus).color}"></i>
          {{
            researchStatus | filterListLabel(dictionary.researchStatus)
          }}</span>
        <el-popconfirm
          v-if="navBarType === 'VisitList' && visitList.length > 0 && researchStatus===dictionary.researchStatus[1].value"
          title="您确定要进入设计吗？"
          class="float-right research-remove"
          @confirm="$emit('changeReserchStatus',dictionary.researchStatus[0].value)"
        >
          <el-button
            slot="reference"
            class="main-primary-button main-buttonSpace"
            size="mini"
            type="primary"
          >
            进入设计
          </el-button>
        </el-popconfirm>
        <el-popconfirm
          v-if="navBarType === 'VisitList' && visitList.length > 0 && researchStatus===dictionary.researchStatus[0].value"
          title="您确定要发布吗？"
          class="float-right research-remove"
          @confirm="$emit('changeReserchStatus',dictionary.researchStatus[1].value)"
        >
          <el-button
            slot="reference"
            class="main-primary-button main-buttonSpace"
            size="mini"
            type="primary"
          >
            发布
          </el-button>
        </el-popconfirm>
        <!-- <el-popconfirm
          v-else-if="navBarType !== 'VisitList'"
          class="main-buttonSpace"
          title="该操作会覆盖当前表单设计草稿,是否继续执行？"
          @confirm="$emit('editVisitDesigin', navBarType)"
        >
          <el-button
            slot="reference"
            class="main-primary-button"
            size="mini"
            type="primary"
          >
            编辑
          </el-button>
        </el-popconfirm> -->
      </div>
      <div v-if="isVisitDesigin" class="navBar-box-right float-right">
        <el-radio-group
          v-model="visitDesiginRadio"
          class="main-radio-group"
          @change="selectVisitDesiginRadio"
        >
          <el-radio-button
            v-for="item in visitDesiginRadioGroup"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <!-- <div v-if="isEnvironment" class="navBar-box-left float-left">
        <div class="navBar-environment main-space">
          <span
            :class="
              environmentCode === dictionary.environmentType[0].value
                ? 'test'
                : 'proud'
            "
          >{{
            environmentCode | filterListLabel(dictionary.environmentType)
          }}</span>
        </div>
      </div> -->
      <div v-if="isEnvironment" class="navBar-box-right float-right">
        <el-tabs
          v-model="environmentActiveNav"
          @tab-click="selectEnvironmentTab"
        >
          <el-tab-pane v-if="reruitmentFlag" label="招募中心" name="Recruitment">
            <!-- <el-badge slot="label" :value="reruitmentCount">
              <div>
              </div>
            </el-badge> -->
            <!-- <div slot="label">
              招募中心<span class="center-tip" v-html="reruitmentCount"></span>
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="主页" name="Home"></el-tab-pane>
          <el-tab-pane label="受试者列表" name="TesteeList"></el-tab-pane>
          <el-tab-pane label="质疑管理" name="QueryList"></el-tab-pane>
          <el-tab-pane label="任务列表" name="TaskList"></el-tab-pane>
        </el-tabs>
        <el-popover
          placement="bottom"
          trigger="click"
          popper-class="navBar-morePopper"
        >
          <div
            v-for="(item, index) in environmentMoreNav"
            :key="index"
            class="navBar-morePopper-item"
          >
            <div class="navBar-morePoppe-title">
              <i class="iconfont" :class="item.iconfont"></i>
              <span class="main-buttonSpace">{{ item.title }}</span>
            </div>
            <ul class="navBar-morePoppe-info">
              <li
                v-for="(listItem, listIndex) in item.list"
                :key="listIndex"
                :class="{ active: listItem.value === $route.name }"
                @click="$emit('environmentNavMoreClick', listItem)"
              >
                {{ listItem.label }}
              </li>
            </ul>
          </div>
          <span slot="reference" class="navBar-more">更多
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </el-popover>
      </div>
      <div v-if="isManagement&&managementType === 1" class="navBar-box-right float-right">
        <el-input
          v-model="managementName"
          :placeholder="managementType === 1 ? '请输入中心名称' : '请输入用户名/姓名'"
          class="main-search-input"
        >
          <i
            slot="suffix"
            class="iconfont iconsousuo"
            @click="searchManagement"
          ></i>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { environmentMoreNav } from '@/assets/js/meta'
import { mapState } from 'vuex'
import {
	NAVBARTYPE,
	VISITLIST,
	ISEMPTY,
	MANAGEMENTTYPE,
	MANAGEMENTPARAMS,
	ISLEAVE,
	RESEARCHSTATUS,
	RESEARCHNAME,
	RERUITMENTCOUNT,
	USERAUTHORITY
} from '@/store/stateTypes'
export default {
	props: {
		environmentCode: {
			// 环境编码
			type: Number,
			default: 0
		},
		reruitmentFlag: {
			// 招募状态
			type: Boolean,
			default: false
		},
		researchName: {
			// 研究名称
			type: String,
			default: ''
		}
	},
	data() {
		return {
			environmentMoreNav, // 更多导航数据
			dictionary, // 字典
			visitDesiginRadioGroup: [
				{ value: 'FormDesigin', label: '设计' },
				{ value: 'FormPreview', label: '预览' }
			],
			visitDesiginRadio: '',
			managementName: '',
			navSearchForm: {
				researchName: ''
			}
		}
	},
	computed: {
		...mapState('base', {
			navBarType: NAVBARTYPE,
			isEmpty: ISEMPTY,
			isLeave: ISLEAVE,
			userRauthority: USERAUTHORITY
		}),
		...mapState('visit', {
			visitList: VISITLIST
		}),
		...mapState('environment', {
			reruitmentCount: RERUITMENTCOUNT
		}),
		...mapState('research', {
			researchStatus: RESEARCHSTATUS,
			researchNameTitle: RESEARCHNAME
		}),
		...mapState('management', {
			managementType: MANAGEMENTTYPE,
			managementParams: MANAGEMENTPARAMS
		}),
		// 是否返回
		isGoBack() {
			return this.$route.meta.isNavBarBack
		},
		// 是否是访视
		isVisit() {
			return this.$route.meta.isVisit
		},
		isVisitDesigin() {
			return this.$route.meta.isVisitDesigin
		},
		// 是否中心管理
		isManagement() {
			return this.$route.meta.isManagement
		},
		// 是否有border
		isBorder() {
			return this.$route.meta.isBorder
		},
		// 是否是环境
		isEnvironment() {
			return this.$route.meta.isEnvironment
		},
		environmentActiveNav: {
			get() {
				return this.$route.name
			},
			set() {}
		},
		getBackTitle() {
			return this.$route.meta.navBarTitle || this.$route.query.title || '返回'
		}
	},
	watch: {
		navBarType: {
			handler() {
				this.visitDesiginRadio = this.navBarType
			},
			immediate: true
		},
		managementType: {
			handler() {
				this.getManagementName()
			},
			immediate: true
		},
		managementParams: {
			handler() {
				this.getManagementName()
			},
			immediate: true
		},
		researchName: {
			handler(value) {
				this.$set(this.navSearchForm, 'researchName', value)
			},
			immediate: true
		}
	},
	created() {},
	methods: {
		// 选择设计预览radio
		selectVisitDesiginRadio(name) {
			if (name === 'FormPreview') {
				if (this.isLeave) {
					this.$router.push({ name, query: this.$route.query })
				} else {
					this.$confirm('表单中尚有控件未保存，是否确认离开？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push({ name, query: this.$route.query })
					}).catch(() => {
						this.$message('取消离开')
					})
				}
			} else {
				this.$router.push({ name, query: this.$route.query })
			}
		},
		// 查询中心等
		searchManagement() {
			let { centerName, userName } = this.managementParams
			this.managementType === 1 ? (centerName = this.managementName) : (userName = this.managementName)
			this.$emit('setManagementName', { centerName, userName })
			this.$emit('searchManagement', this.managementType, this.managementName)
		},
		// 环境tab选择
		selectEnvironmentTab(info) {
			this.$route.name !== info.name &&
        this.$router.push({ name: info.name, query: { ...this.$route.query }})
		},
		getManagementName() {
			this.managementName = this.managementType === 1	? this.managementParams.centerName : this.managementParams.userName
		}
	}
}
</script>
