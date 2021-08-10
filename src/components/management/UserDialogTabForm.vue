<template>
  <div class="main-tabs noborder">
    <div v-if="dialogStatus === 3 || dialogStatus === 4" class="main-tabs-header">
      <div v-for="item in centerManagementIParams" :key="item.value" class="main-tabs-item" :class="{'active':item.value===userTab}" @click="userTabClick(item.value)">
        {{ item.label }}
      </div>
    </div>
    <div class="main-tabs-body">
      <el-form
        ref="userForm"
        size="mini"
        :model="userDialogForm"
        :rules="userRules"
        label-width="100px"
        class="main-form"
      >
        <el-form-item
          v-if="userTab === 3 || dialogStatus === 5"
          label="用户名"
          prop="userItcode"
        >
          <el-select
            v-model="userDialogForm.userItcode"
            :disabled="dialogStatus === 5"
            :state="dialogStatus === 5"
            :style="{ width: '100%' }"
            placeholder="请选择用户"
            @change="changeUser"
          >
            <el-option
              v-for="(item, index) in userList"
              :key="index"
              :label="item.userItcode"
              :value="item.userItcode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="用户名" prop="userItcode">
          <el-input
            v-model="userDialogForm.userItcode"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input
            v-model="userDialogForm.userName"
            :disabled="isUserFormDisable"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="userPhone">
          <el-input
            v-model="userDialogForm.userPhone"
            :disabled="isUserFormDisable"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userDialogForm.userEmail"
            :disabled="isUserFormDisable"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="企业/单位" prop="companyName">
          <el-input
            v-model="userDialogForm.companyName"
            :disabled="isUserFormDisable"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="userTab == 3 || dialogStatus === 5"
          label="用户归属"
          prop="type"
          class="main-textarea"
        >
          <el-radio-group v-model="userDialogForm.type" @change="roleIdChange">
            <el-radio v-for="item in dictionary.userAscription" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <el-select
            v-if="userDialogForm.type === dictionary.userAscription[1].value"
            v-model="centerUnitList"
            multiple
            placeholder="请选择所属中心"
          >
            <el-option
              v-for="item in centerList"
              :key="item.centerKey"
              :label="item.centerName"
              :value="item.centerKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="dialogStatus !== 4"
          label="角色类型"
          prop="roleId"
        >
          <el-select
            v-model="userDialogForm.roleId"
            :style="{ width: '100%' }"
            placeholder="请选择角色类型"
          >
            <el-option
              v-for="item in roleList"
              :key="item.pkId"
              :label="item.roleName"
              :value="item.pkId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="userTab === 3 || dialogStatus === 5"
          label="账户状态"
          prop="state"
        >
          <el-radio-group v-model="userDialogForm.state">
            <el-radio v-for="item in dictionary.accountFlag" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-else label="账户状态" prop="disabled">
          <el-radio-group v-model="userDialogForm.disabled">
            <el-radio v-for="item in dictionary.accountFlag" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item
        v-if="userTab == 4"
        label="通知用户"
        prop="noticeType"
      >
        <el-checkbox-group v-model="userDialogForm.noticeType"> -->
        <!-- <el-checkbox :label="1">短信</el-checkbox> -->
        <!-- <el-checkbox :label="2">
            邮件
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      </el-form>
    </div>
    <span slot="footer" class="main-dialog-footer">
      <el-button class="main-dialog-cancelButton" @click="close">
        取 消
      </el-button>
      <el-button
        class="main-dialog-sureButton"
        type="primary"
        @click="saveUser()"
      >
        确 定
      </el-button>
    </span>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import locals from '@/local'
export default {
	props: {
		userForm: { // 表单
			type: Object,
			default: () => {
				return {}
			}
		},
		dialogStatus: { // 状态
			type: Number,
			default: 1
		},
		dialogFlag: {
			type: Boolean,
			default: false
		},
		centerList: { // 中心列表
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			centerManagementIParams: [{ label: '添加用户', value: 3 }, { label: '创建用户', value: 4 }],
			dictionary, // 账号状态字典
			userDialogForm: { // 表单
				userId: '',
				mainName: '',
				type: dictionary.userAscription[0].value,
				state: dictionary.accountFlag[1].value,
				disabled: dictionary.accountFlag[1].value,
				userName: '',
				userPhone: '',
				userEmail: '',
				companyName: '',
				userType: '',
				userItcode: '',
				noticeType: [2]
			},
			environmentCode: locals.getEnvironmentCode() || 1,
			temporaryUserForm: {}, // 临时表单
			centerUnitList: [],
			userList: [], // 用户列表
			roleList: [], // 角色列表
			userTab: 3, // tab切换
			userId: [] // 用户id列表
		}
	},
	computed: {
		userRules: function() {
			const validateCenter = (rule, value, callback) => {
				if (value === 2) {
					if (this.centerUnitList.length === 0) {
						callback(new Error('请选择所属中心'))
					} else {
						callback()
					}
				} else {
					callback()
				}
			}
			if (this.userTab === 3) {
				const createUser = {
					userName: this.$filterRules({ name: '用户名', type: 2, required: true }),
					type: this.$filterRules({ name: '所属中心', type: 2, required: true }, [
						{ validator: validateCenter, trigger: 'change' }
					]),
					roleId: this.$filterRules({ name: '角色类型', type: 2, required: true })
				}
				return createUser
			} else {
				const newCreateUser = {
					noticeType: this.$filterRules({ name: '通知方式', type: 2, required: true }),
					userItcode: this.$filterRules({ name: '用户名', type: 1, required: true }),
					userPhone: this.$filterRules({ name: '手机号', type: 1, required: true, ruleType: 'phoneOrMobile' }),
					userEmail: this.$filterRules({ name: '邮箱地址', type: 1, required: true, ruleType: 'email' }),
					companyName: this.$filterRules({ name: '企业/单位', type: 1, required: true }),
					mainName: this.$filterRules({ name: '姓名', type: 1, required: true }),
					disabled: this.$filterRules({ name: '账户类型', type: 2, required: true })
				}
				return newCreateUser
			}
		},
		isUserFormDisable() {
			return 	this.userTab === 3 || this.dialogStatus === 5
		}
	},
	watch: {
		dialogFlag(value) {
			if (value) {
				this.userTab = 3
				this.$nextTick(() => {
					// console.log(1)
					this.userTabClick(this.userTab)
					this.resetFields()
				})
			}
		},
		userForm: {
			handler(value) {
				this.setUserForm(value)
				this.getRoleList()
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.getUserList()
		this.getRoleList()
	},
	methods: {
		// 用户选择
		changeUser(value) {
			if (this.userTab === 3 || this.dialogStatus === 5) {
				this.$api.user.getUserInfoByName({ itcode: value }).then((res) => {
					const userList = res.data || []
					const userInfo = userList.length ? userList[0] : {}
					this.userDialogForm.userEmail = userInfo.userEmail || ''
					this.userDialogForm.userPhone = userInfo.userPhone || ''
					this.userDialogForm.companyName = userInfo.companyName || ''
					if (this.userTab === 3) {
						this.userDialogForm.userName = userInfo.userName || ''
						this.userDialogForm.userId = userInfo.pkId || ''
						this.userDialogForm.userType = userInfo.roleName || ''
					}
					if (this.dialogStatus === 5) {
						this.centerUnitList = userInfo.centerCodes	? userInfo.centerCodes.split(',') : []
					}
					this.userDialogForm = this.$utils.deepClone(this.userDialogForm)
				})
			}
		},
		// 获取角色list
		getRoleList() {
			this.$api.user.getRoleByType({ type: this.userDialogForm.type }).then((res) => {
				this.roleList = res.data || []
			})
		},
		//	获取用户列表
		getUserList() {
			this.$api.user.getUserInfoByName({ itcode: '' }).then((res) => {
				this.userList = res.data || []
			})
		},
		close() {
			this.$emit('close')
		},
		// 角色选择
		roleIdChange() {
			this.getRoleList()
			this.$set(this.userDialogForm, 'roleId', '')
		},
		// 保存用户
		saveUser() {
			this.$refs.userForm.validate((validate) => {
				if (validate) {
					this.$set(this.userDialogForm, 'centerUnitList', this.centerUnitList)
					this.$emit('saveUser',	this.dialogStatus, this.userDialogForm)
				}
			})
		},
		// 设置表单
		setUserForm(item) {
			if (this.dialogStatus === 5) {
				if (item.type === 2) {
					this.centerUnitList = item.centerCodes ? item.centerCodes.split(',')	: []
				}
				this.userDialogForm = this.$utils.deepClone(item)
				this.changeUser(item.userItcode)
			}
		},
		// tab点击切换
		userTabClick(value) {
			this.userTab = value
			if (value === 4) {
				this.temporaryUserForm = this.$utils.deepClone(this.userDialogForm)
				const info = {
					environment: this.environmentCode,
					userName: '',
					userPhone: '',
					userEmail: '',
					companyName: '',
					userType: '',
					userItcode: '',
					disabled: dictionary.accountFlag[1].value,
					mainName: '',
					roleId: '',
					noticeType: [2]
				}
				this.userDialogForm = this.$utils.deepClone(info)
				this.$set(this.userDialogForm, 'disabled', dictionary.accountFlag[1].value)
			} else {
				this.userDialogForm = { ...this.temporaryUserForm }
			}
			this.$nextTick(() => {
				this.resetFields()
			})
		},
		// 清除表单
		resetFields() {
			this.$refs.userForm.resetFields()
		}
	}
}
</script>
