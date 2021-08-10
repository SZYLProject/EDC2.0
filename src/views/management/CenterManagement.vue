<template>
  <div class="main-navBar-content">
    <DhcTabs v-model="activeCenterManagementTab" :list="centerManagementParams" @tabClick="changeCenterManagementTab">
      <template slot="operate">
        <el-button
          class="main-primary-button"
          @click.stop="activeCenterManagementTab===1?setCenter(1):setUser(3)"
        >
          {{ activeCenterManagementTab===1?'添加中心':'添加用户' }}
        </el-button>
      </template>
      <CenterTable
        :tableData="centerManagementList"
        :centerList="centerList"
        :type="activeCenterManagementTab===1?'center':'user'"
        @setCenter="setCenter"
        @setUser="setUser"
      />
    </DhcTabs>
    <!-- 添加中心 -->
    <dhc-dialog
      v-model="isCenterDialog"
      :title="centerDialogTitles[centerUserDialogType]"
      width="40%"
      :isSureButton="false"
      :isCancelButton="false"
      :iconfontType="centerDialogIconfontType[centerUserDialogType]"
      :iconfont="centerDialogIcon[centerUserDialogType]"
    >
      <div
        :is="centerDialogComponentName"
        ref="centerDialog"
        :userForm="userForm"
        :centerForm="centerForm"
        :dialogStatus="centerUserDialogType"
        :dialogFlag="isCenterDialog"
        :centerList="centerList"
        @saveCenter="saveCenter"
        @saveUser="saveUser"
        @close="isCenterDialog=false"
      ></div>
    </dhc-dialog>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { mapState, mapMutations } from 'vuex'
import { SETMANAGEMENTTYPE } from '@/store/mutationTypes'
import { MANAGEMENTPARAMS, RESEARCHCODE } from '@/store/stateTypes'
import CenterTable from '@/components/management/CenterTable'
import CenterDialogForm from '@/components/management/CenterDialogForm'
import UserDialogTabForm from '@/components/management/UserDialogTabForm'
export default {
	components: {
		CenterTable,
		CenterDialogForm,
		UserDialogTabForm
	},
	data() {
		return {
			activeCenterManagementTab: 1,
			// centerManagementParams: [{ label: '中心管理', value: 1 }],
			centerManagementParams: [{ label: '中心管理', value: 1 }, { label: '用户管理', value: 2 }],
			centerDialogComponentName: '', // 弹窗组件名称
			centerUserDialogType: '', // 弹窗类型
			isCenterDialog: false, // 弹窗状态
			centerDialogTitles: {
				1: '添加中心',
				2: '编辑中心',
				5: '编辑用户',
				3: '添加用户',
				4: '创建用户'
			},
			centerDialogIcon: { // 弹窗图标类型
				2: 'iconxiugai',
				1: 'iconxinjian',
				5: 'iconxiugai',
				3: 'iconxinjian',
				4: 'iconxinjian'
			}, //
			centerDialogIconfontType: { // 弹窗图标类型
				2: 'edit',
				1: 'add',
				5: 'edit',
				3: 'add',
				4: 'add'
			}, //
			centerUrl: { // 接口地址
				1: 'saveCenter',
				2: 'updateCenter',
				3: 'pullUser',
				4: 'addUser',
				5: 'editUser'
			},
			centerErrorInfo: { // 错误提示
				1: '添加中心失败',
				2: '编辑中心失败',
				3: '添加用户失败',
				4: '创建用户失败',
				5: '编辑用户失败'
			},
			centerSuccessInfo: { // 正确提示
				1: '添加中心成功',
				2: '编辑中心成功',
				3: '添加用户成功',
				4: '创建用户成功',
				5: '编辑用户成功'
			},
			// searchInfo: { // 查询条件
			// 	centerName: ''
			// },
			centerManagementList: [],
			centerList: [], // 中心列表
			userList: [], // 用户列表
			centerForm: {}, // 中心表单
			userForm: {}// 用户表单
		}
	},
	computed: {
		...mapState('management', {
			managementParams: MANAGEMENTPARAMS
		}),
		...mapState('research', {
			researchCode: RESEARCHCODE
		})
	},
	watch: {
		researchCode: {
			handler(value) {
				if (value) {
					this.changeCenterManagementTab(this.activeCenterManagementTab)
				}
			},
			immediate: true
		}
	},
	created() {
		this.$bus.$on('searchManagement', (type, name) => {
			this.changeCenterManagementTab(type)
		})
	},
	beforeDestroy() {
		this.$bus.$off('searchManagement')
	},
	methods: {
		...mapMutations('management', {
			setManagementType: SETMANAGEMENTTYPE
		}),
		// tab切换
		changeCenterManagementTab(value) {
			this.activeCenterManagementTab = value
			this.setManagementType(value)
			if (value === 1) {
				this.getCenterList()
			} else {
				this.getUserList()
			}
		},
		// 中心列表
		getCenterList() {
			const info = {
				researchCode: this.researchCode,
				name: this.managementParams.centerName
			}
			this.$api.center.getCenterList(info).then((res) => {
				if (res && res.code === 200) {
					this.centerManagementList = this.centerList = res.data || []
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 用户列表
		getUserList() {
			this.$api.user.getResearchUser(this.researchCode).then((res) => {
				if (res && res.code === 200) {
					this.centerManagementList = res.data || []
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 设置中心数据
		setCenter(type, item) { // 1,新建中心，2是编辑中心 3，添加用户 4，新建用户，5编辑用户
			this.centerDialogComponentName = 'CenterDialogForm'
			this.centerForm = type === 2 ? { ... item } : {
				centerNumber: '',
				name: '',
				mainResearcher: '',
				status: dictionary.centerFlag[1].value,
				planNumber: 1
			}
			this.isCenterDialog = true
			this.centerUserDialogType = type
		},
		// 设置用户
		setUser(type, item) {
			this.centerDialogComponentName = 'UserDialogTabForm'
			if (type === 5) {
				this.userForm = { ... item }
			}
			this.isCenterDialog = true
			this.centerUserDialogType = type
		},
		// 保存中心
		saveCenter(type, form) {
			this.$api.center[this.centerUrl[this.centerUserDialogType]]({
				...form,
				researchCode: this.researchCode
			}).then((res) => {
				if (res.code === 200) {
					this.isCenterDialog = false
					this.getCenterList()
					this.$message.success(this.centerSuccessInfo[type])
				} else {
					this.$message.error(res && res.msg ? res.msg : this.centerErrorInfo[type])
				}
			})
		},
		// 保存用户
		saveUser(type, form) { // 1,新建中心，2是编辑中心 3，添加用户 4，新建用户，5编辑用户
			let info = null
			if (type === 3) {
				info = {
					researchCode: this.researchCode,
					state: form.state,
					roleId: form.roleId,
					type: form.type,
					userId: form.userId,
					centerNumbers: (form.centerUnitList || []).join(',')
				}
			} else if (type === 4) {
				info = {
					researchCode: this.researchCode,
					companyName: form.companyName,
					disabled: '' + form.disabled,
					userItcode: form.userItcode,
					roleId: form.userType,
					userPhone: form.userPhone,
					userEmail: form.userEmail,
					noticeType: (form.noticeType || []).join(','),
					userName: form.mainName
				}
			} else {
				info = {
					researchCode: this.researchCode,
					state: form.state,
					roleId: form.roleId,
					type: form.type,
					userId: form.userId,
					pkId: form.pkId,
					centerNumbers: (form.centerUnitList || []).join(',')
				}
			}
			this.$api.user[this.centerUrl[this.centerUserDialogType]](info).then((res) => {
				if (res && res.code === 200) {
					this.isCenterDialog = false
					this.$message.success(res.msg)
					this.getUserList()
				} else {
					this.$message.error(res && res.msg ? res.msg : this.centerErrorInfo[type])
				}
			})
		}
	}
}
</script>
