<template>
  <div class="login">
    <!-- <el-input
      v-model="loginForm.a"
      placeholder="请输入密码"
      prefix-icon="iconfont iconsuozi"
    ></el-input>
    <br>
    <br>
    <br>
    <el-input
      v-model="loginForm.b"
      placeholder="请输入密码"
      prefix-icon="iconfont iconsuozi"
    ></el-input> -->
    <div class="login-box">
      <div class="login-box-left">
        <div class="login-box-logo"></div>
        <div class="login-box-subtitle" v-text="'Welcome'"></div>
        <div
          class="login-box-miantitle"
          v-text="'欢迎登录临床研究数据平台'"
        ></div>
      </div>
      <div class="login-box-right">
        <div class="login-form-title" v-text="'请登录'"></div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          class="login-form"
        >
          <el-form-item prop="itcode">
            <el-input
              v-model="loginForm.itcode"
              placeholder="请输入用户名"
              prefix-icon="iconfont iconyonghu1"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="!isForgetPassword" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              :type="isPassword?'password':'text'"
              prefix-icon="iconfont iconsuozi"
            ></el-input>
            <i :class="{'iconyincang' : isPassword, 'iconxianshi': !isPassword}" class="iconfont login-form-password-icon" @click="isPassword=!isPassword"></i>
          </el-form-item>
          <el-form-item v-if="isForgetPassword" prop="email">
            <el-input
              v-model="loginForm.email"
              placeholder="请填写注册邮箱"
              prefix-icon="iconfont iconyoujian"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="login-form-code">
            <el-input
              v-model="loginForm.code"
              :maxlength="verificationCode.length||4"
              placeholder="请输入验证码"
              prefix-icon="iconfont iconyanzhengma1"
            ></el-input>
            <el-button v-loading="isCodeLaoding" v-preventReClick="2000" type="text" class="login-form-button" @click="refreshCode()">
              <i
                v-show="!isErrorCode && isCodeLength"
                class="login-form-successcode"
              ></i>
              <span v-if="isCodeAbnormal" class="login-form-errorcode">验证码失败</span>
              <span
                v-for="(item, i) in verificationCodeList"
                v-else
                :key="i"
                :style="setCodeStyle(item)"
                class="login-form-codename"
              >{{ item.code }}</span>
            </el-button>
            <i
              v-if="isErrorCode && isCodeLength"
              class="login-form-errorcode"
            >*验证码错误</i>
          </el-form-item>
          <el-form-item
            class="login-form-forget"
            :class="{
              'login-form-errorforget':
                isErrorCode && isCodeLength,
            }"
          >
            <!-- <el-button
              v-if="!isForgetPassword"
              class="login-forget-button"
              type="text"
              @click="forgetPassword"
            >
              忘记密码?
            </el-button> -->
          </el-form-item>
          <el-form-item>
            <el-button
              v-preventReClick
              type="primary"
              class="login-enter-button"
              @click="submitLoginForm"
            >
              {{ isForgetPassword ? "重置密码" : "登录" }}
            </el-button>
          </el-form-item>
          <p v-if="isForgetPassword" class="login-back">
            <el-button type="text" @click="forgetPassword">
              返回登录
            </el-button>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { SETUSERINFO, SETUSERAUTHORITY } from '@/store/mutationTypes'
import locals from '@/local'
export default {
	name: 'login',
	data() {
		return {
			isPassword: true, // 是否是密码框
			loginForm: {
				// 登录表单
				itcode: '',
				password: '',
				email: '',
				code: '',
				codeKey: ''
			},
			verificationCode: [], // 验证号
			isForgetPassword: false, // 是否忘记密码
			isErrorCode: false, // 输入错误code
			isCodeLaoding: true, // codeloading
			codeKey: '', // code
			isCodeAbnormal: false// code异常
		}
	},
	computed: {
		verificationCodeList() { // 校验code stylelist
			const list = this.verificationCode.map((item) => {
				const info = {
					code: item,
					color: this.getRandomColor(),
					fontSize: `2${[Math.floor(Math.random() * 6 + 4)]}px`,
					transform: `rotate(${
						Math.floor(Math.random() * 65) - Math.floor(Math.random() * 20)
					}deg)`
				}
				return info
			})
			return list || []
		},
		isCodeLength() {
			return (this.loginForm.code.length === this.verificationCode.length) && this.verificationCode.length > 0
		}
	},
	watch: {
		'loginForm.code'(newValue) {
			newValue.length === this.verificationCode.length ? this.validateCode() :	this.isErrorCode = false
		},
		'loginForm.a'(newValue) {
			const value = this.changes(this.loginForm.a)
			this.$set(this.loginForm, 'b', value)
		}
	},
	created() {
		this.refreshCode()
		this.keyDownLogin()
	},
	methods: {
		...mapMutations('base', {
			setUserInfo: SETUSERINFO,
			setUserRauthority: SETUSERAUTHORITY
		}),
		changes(foo) {
			var arr = foo.split(/[\s]+/g)
			for (var i = 0; i < arr.length; i++) {
				if (i === 0) {
					arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].substring(1)
				} else {
					arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
				}
			}
			return arr.join('')
		},
		// 刷新code
		refreshCode(flag) {
			this.setCodeInfo([], false, true)
			this.$api.user.getLoginCode().then(res => {
				if (res && res.code === 200) {
					this.$set(this.loginForm, 'codeKey', res.data.codeKey)
					this.setCodeInfo(res.data.code.split(''), !!flag, false)
					if (!flag) {
						this.$set(this.loginForm, 'code', '')
						this.validateCode()
					}
				} else {
					this.setCodeInfo([], true, false)
				}
			})
			// console.log(res)
		},
		// 设置code信息
		setCodeInfo(code, isCodeAbnormal, isCodeLaoding) {
			this.verificationCode = code
			this.isCodeAbnormal = isCodeAbnormal
			this.isCodeLaoding = isCodeLaoding
		},
		// 忘记密码
		forgetPassword() {
			this.$refs.loginForm.clearValidate()
			this.isForgetPassword = !this.isForgetPassword
			this.refreshCode()
			this.$set(this.loginForm, 'email', '')
		},
		// 获取code样式
		setCodeStyle(info) {
			return `color:${info.color}; font-size:${info.fontSize};transform:${info.transform}`
		},
		// 颜色对象
		getRandomColor() {
			return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
				Math.random() * 255
			)}, ${Math.floor(Math.random() * 255)} ,0.8)`
		},
		// 校验code
		validateCode() {
			const isValidate = this.verificationCode.join().replace(/,/g, '').toLowerCase() === this.loginForm.code.toLowerCase()
			this.isErrorCode = !isValidate
		},
		// 登录或提交
		submitLoginForm() {
			this.validateCode()
			this.isForgetPassword ? this.setForgetPassword() : this.setLogin()
		},
		// 登录
		async setLogin() {
			const { itcode, password, code, codeKey } = this.loginForm
			if (itcode && password && code) {
				const res = await this.$api.user.edcLogin({ itcode, password, code, codeKey	})
				if (res && res.code === 200) {
					// console.log(res.data)
					const info = res.data || {}
					locals.setUserToken(info.token)
					this.setUserInfo(info.adminUserVo)
					this.setUserRauthority(info.englishNameList || [])
					this.$router.replace('/')
				} else if (res && res.code === 209) {
					this.refreshCode(true)
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			} else {
				this.$message.error('请输入正确的用户名,密码,验证码')
			}
		},
		// 忘记密码
		async setForgetPassword() {
			const { itcode, email, code, codeKey } = this.loginForm
			if (itcode && email && code) {
				const res = await this.$api.user.forgetPwd({ itcode, email, code, codeKey	})
				if (res && res.code === 200) {
					this.$message.success(res.msg || '重置成功')
					this.$set(this.loginForm, 'password', '')
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			} else {
				this.$message.error('请输入正确的用户名,邮箱,验证码')
			}
		},
		// 添加键盘事件登录
		keyDownLogin() {
			const that = this
			document.onkeydown = function() {
				const key = window.event.keyCode
				if (key === 13) that.submitLoginForm()
			}
		}
	}
}
</script>
