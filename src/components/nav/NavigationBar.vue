<template>
  <div class="navigationBar">
    <div class="navigationBar-logo float-left">
      <span class="navigationBar-logo-img">
        <i></i>
      </span>
      <span class="navigationBar-logo-title">{{ title }}</span>
    </div>
    <div class="navigationBar-operate float-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <p class="navigationBar-operate-content">
          <!-- <img src="../../assets/svg/head-portrait.svg" alt="" /> -->
          <span class="navigationBar-operate-img iconfont iconguanliyuan"></span>
          <span class="navigationBar-operate-name">{{ userInfo.userName }}</span>
          <i class="el-icon-caret-bottom"></i>
        </p>
        <el-dropdown-menu slot="dropdown" class="main-dropdown-menu">
          <el-dropdown-item
            v-for="item in navDropdownList"
            :key="item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <dhc-dialogform
      v-model="navDialogInfo.isDialog"
      label-width="80px"
      :title="navDialogInfo.title"
      width="30%"
      :form-params="navDialogInfo.formParams"
      :form-data="navDialogInfo.formData"
      :disabled="navDialogInfo.disabled"
      :isSureButton="navDialogInfo.isSureButton"
      :isCancelButton="navDialogInfo.isCancelButton"
      :formRule="navDialogInfo.formRule"
      :iconfont="navDialogInfo.iconfont"
      iconfontType="edit"
      @sure="navDialogSure(navDialogInfo.dialogType)"
    ></dhc-dialogform>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { USERINFO } from '@/store/stateTypes'
import locals from '@/local'
export default {
	name: 'navigation-bar',
	components: {},
	props: {
		title: { // 标题
			type: String,
			default: ''
		}
	},
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value.length < 6 || value.length > 16) {
				callback(new Error('密码长度不符！'))
			} else if (!/^[A-Za-z0-9]+$/.test(value)) {
				callback(new Error('密码格式不正确，仅支持数字与字母！'))
			} else if (value !== this.navDialogInfo.formData.newPassword) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			navDropdownList: [
				// 下拉选项
				{
					label: '我的资料',
					value: 1
				},
				{
					label: '修改密码',
					value: 2
				},
				{
					label: '退出登录',
					value: 3
				}
			],
			navDialogInfo: {
				// 弹窗信息
				isDialog: false,
				title: '',
				formParams: [],
				disabled: '',
				formData: {},
				isSureButton: true,
				isCancelButton: true,
				formRule: {
					password: this.$filterRules({
						name: '旧密码',
						type: 1,
						required: true
					}),
					newPassword: this.$filterRules(
						{ name: '新密码', type: 1, required: true },
						[
							{
								pattern: /^[A-Za-z0-9]{6,16}$/,
								message: '请输入 6~16 位数字或字母'
							}
						]
					),
					confirmPassword: [
						{ required: true, validator: validatePass, trigger: 'blur' }
					]
				},
				dialogType: ''
			}
		}
	},
	computed: {
		...mapState('base', { userInfo: USERINFO })
	},
	methods: {
		// 下拉选择
		handleCommand(index) {
			if (index === 1) {
				const formParams = [
					{ type: 'text', label: '用户名', prop: 'userName' },
					{ type: 'text', label: '姓名', prop: 'chineseName' },
					{ type: 'text', label: '邮箱', prop: 'email' },
					{ type: 'text', label: '手机', prop: 'phoneNumber' }
				]
				this.setNavDialogInfo(
					'profileDialog',
					'个人资料',
					formParams,
					true,
					this.$utils.deepClone(this.userInfo),
					false,
					false,
					'iconyonghu1'
				)
			} else if (index === 2) {
				const formParams = [
					{ type: 'password', label: '旧密码', prop: 'password', max: 16 },
					{ type: 'password', label: '新密码', prop: 'newPassword', max: 16 },
					{
						type: 'password',
						label: '确认密码',
						prop: 'confirmPassword',
						max: 16
					}
				]
				const formData = {
					password: '',
					newPassword: '',
					confirmPassword: ''
				}
				this.setNavDialogInfo(
					'passwordDialog',
					'修改密码',
					formParams,
					false,
					formData,
					true,
					true,
					'iconsuozi'
				)
			} else if (index === 3) {
				// 退出登录，清除数据
				this.logoOut()
			}
		},
		// 设置nav弹窗信息
		setNavDialogInfo(dialogType,	title = '', formParams = [],	disabled = '', formData = {},	isSureButton = true, isCancelButton = true,	iconfont) {
			this.navDialogInfo = { ...this.navDialogInfo, dialogType, title, isDialog: true, formParams, disabled, formData, isSureButton, isCancelButton, iconfont }
		},
		// 弹窗确定
		navDialogSure(dialogType) {
			if (dialogType === 'passwordDialog') {
				this.changePassword()
			}
		},
		// 修改密码
		changePassword() {
			const info = {
				id: this.userInfo.id,
				newPassword: this.navDialogInfo.formData.newPassword,
				password: this.navDialogInfo.formData.password
			}
			this.$api.user.updatePassword(info).then(res => {
				if (res && res.code === 200) {
					this.$message.success('修改密码成功')
					this.$set(this.navDialogInfo, 'isDialog', false)
				} else {
					this.$message.error(res && res.msg ? res.msg : '修改密码失败')
				}
			})
		},
		// 登出
		logoOut() {
			locals.delUserToken()
			this.$router.replace('/login')
		}
	}
}
</script>
