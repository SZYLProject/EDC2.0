<template>
  <div class="setting main-navBar-content">
    <!-- 研究信息 -->
    <ResearchInfo v-model="researchFormInfo"></ResearchInfo>
    <TesteeInfo :testeeInfo="testeeInfo" :researchInfo="researchFormInfo" @getTesteeInfo="getSubjectConfig" @getSubjectGroup="getSubjectGroup"></TesteeInfo>
    <div class="main-card">
      <div class="main-card-title clearfix">
        <div class="main-icon-label float-left">
          <span>微信服务号</span>
        </div>
      </div>
      <div class="main-card-content">
        <el-form
          ref="recruitmentForm"
          class="recruitmentForm testeeInfo"
          :model="wechatForm"
          label-width="100px"
          size="mini"
        >
          <el-form-item label="是否启用？:">
            <el-switch
              v-model="wechatForm.createrecFlag"
              class="main-switch"
              :active-value="1"
              :inactive-value="0"
              @change="createrecFlagChange"
            >
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="main-card">
      <div class="main-card-title clearfix">
        <div class="main-icon-label float-left">
          <span>招募中心</span>
        </div>
        <div class="main-card-button float-right">
          <el-button
            class="main-primary-button"
            size="mini"
            type="primary"
            @click.stop="updateRecruitment"
          >
            保存设置
          </el-button>
        </div>
      </div>
      <div class="main-card-content">
        <el-form
          ref="recruitmentForm"
          class="recruitmentForm testeeInfo"
          :model="recruitmentForm"
          label-width="100px"
          size="mini"
        >
          <el-form-item label="是否启用？:">
            <el-switch
              v-model="recruitmentForm.createrecFlag"
              :active-value="1"
              :inactive-value="0"
              class="main-switch"
              @change="createrecFlagChange"
            >
            </el-switch>
            <div
              v-show="recruitmentForm.createrecFlag === 1"
              class="setting-recruitmentForm-qrc main-space"
            >
              <span>招募二维码：</span>
              <i
                class="setting-qrc-button main-primaryIcon-button iconfont iconerweima"
                @click="getQrCode"
              ></i>
            </div>
          </el-form-item>
          <el-form-item label="预筛信息:">
            <el-checkbox-group
              v-model="recruitmentForm.recmessage"
              style="display: inline-block"
            >
              <el-checkbox
                v-for="item in testeeInfo.lable"
                :key="item.code"
                :label="item.code"
              >
                {{ item.value }}
              </el-checkbox>
              <span
                class="main-space main-primaryText-button"
                @click="clearRecruitmentCheckBtn"
              >清空</span>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <dhc-dialog
      v-model="isQrcodeDialog"
      title="请扫描二维码"
      width="28%"
      :isSureButton="false"
      :isCancelButton="false"
    >
      <dhc-qrcode :codeUrl="qrCodeUrl" style="margin: 0 auto"></dhc-qrcode>
    </dhc-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { RESEARCHINFO } from '@/store/stateTypes'
import ResearchInfo from '@/components/setting/ResearchInfo'
import TesteeInfo from '@/components/setting/TesteeInfo'
import * as dictionary from '@/assets/js/dictionary'
export default {
	name: 'Setting',
	components: {
		ResearchInfo,
		TesteeInfo
	},
	data() {
		return {
			dictionary, // 字典
			wechatForm: { // 微信表单
				createrecFlag: dictionary.createFlagType[1].value
			},
			recruitmentForm: { // 招募表单
				recmessage: [],
				createrecFlag: dictionary.createFlagType[1].value
			},
			researchFormInfo: {}, // 研究表单信息
			isQrcodeDialog: false, // 二维码弹窗
			qrCodeUrl: '', // 二维码地址
			testeeInfo: {
				// 受试者表单
				numberGenerationMode: dictionary.createFlagType[0].value,
				subjectSettingMessage: [],
				prefix: '',
				systemGenerationMode: dictionary.planCreateFlagType[0].value,
				placeholder: '',
				subjectSettingVoList: [],
				code: ''
			}
		}
	},
	computed: {
		...mapState('research', {
			researchInfo: RESEARCHINFO
		})
	},
	watch: {
		researchInfo: {
			handler(value) {
				if (value) {
					this.researchFormInfo = this.$utils.deepClone(value)
					this.getSubjectGroup()
					this.getSubjectConfig()
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
	},
	methods: {
		// 关闭弹框
		closeResearchDialog() {
			this.isResearchDialog = false
		},
		// 是否招募展示
		createrecFlagChange(value) {
			console.log(value)
		},
		// 查看二维码
		getQrCode() {
			this.isQrcodeDialog = true
			this.qrCodeUrl = '123123121233'
		},
		// 更新招募中心
		updateRecruitment() {
			console.log(1)
		},
		// 清空
		clearRecruitmentCheckBtn() {
			this.$set(this.recruitmentForm, 'recmessage', [])
		},
		// 获取受试者分组
		getSubjectConfig() {
			if (!this.researchInfo.code) return
			this.$api.subject.getSubjectConfig(this.researchInfo.code).then((res) => {
				if (res && res.code === 200) {
					this.$set(
						this.testeeInfo,
						'subjectSettingMessage',
						res.data.subjectConfigVo
							? res.data.subjectConfigVo.subjectSettingMessage
								? res.data.subjectConfigVo.subjectSettingMessage
									.split(',')
									.map((item) => parseInt(item))
								: []
							: []
					)
					this.$set(
						this.testeeInfo,
						'numberGenerationMode',
						res.data.subjectConfigVo ? res.data.subjectConfigVo.numberGenerationMode : dictionary.createFlagType[0].value
					)
					this.$set(
						this.testeeInfo,
						'systemGenerationMode',
						res.data.subjectConfigVo ? res.data.subjectConfigVo.systemGenerationMode || 0 : 0
					)
					this.$set(
						this.testeeInfo,
						'code',
						res.data.subjectConfigVo ? res.data.subjectConfigVo.code || '100010' : '100010'
					)
					this.$set(
						this.testeeInfo,
						'prefix',
						res.data.subjectConfigVo ? res.data.subjectConfigVo.prefix || '' : ''
					)
					this.$set(
						this.testeeInfo,
						'placeholder',
						res.data.subjectConfigVo ? res.data.subjectConfigVo.placeholder || '' : ''
					)
					this.$set(this.testeeInfo, 'subjectSettingVoList', res.data.subjectSettingInfoVo && res.data.subjectSettingInfoVo.subjectSettingVoList ? res.data.subjectSettingInfoVo.subjectSettingVoList : [])
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 获取受试者组
		getSubjectGroup() {
			if (!this.researchInfo.code) return
			this.$api.subject.getSubjectGroupList(this.researchInfo.code).then((res) => {
				if (res && res.code === 200) {
					this.$set(this.testeeInfo, 'testeeGroup', res.data || [])
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		}
	}
}
</script>
