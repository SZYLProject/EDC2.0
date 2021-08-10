<!--
 * @Author: your name
 * @Date: 2021-05-17 11:49:52
 * @LastEditTime: 2021-08-06 20:32:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\setting\SubjectInfo.vue
-->
<template>
  <div class="main-card">
    <div class="main-card-title clearfix">
      <div class="main-icon-label float-left">
        <span>受试者信息</span>
      </div>
      <div class="main-card-button float-right">
        <el-button
          class="main-primary-button"
          type="primary"
          @click.stop="updateTesteeConfig"
        >
          保存设置
        </el-button>
      </div>
    </div>
    <div class="main-card-content">
      <el-form
        ref="testeeInfo"
        :model="testeeInfo"
        :rules="testeeInfoRules"
        label-width="100px"
      >
        <el-form-item label="受试者编号:">
          <el-radio-group v-model="testeeInfo.numberGenerationMode">
            <el-radio
              v-for="item in dictionary.createFlagType"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="testeeInfo.numberGenerationMode === dictionary.createFlagType[1].value" class="setting-inlineFormItem">
          <el-form-item label="生成方案:" prop="prefix">
            <el-input
              v-model="testeeInfo.prefix"
              minlength="1"
              maxlength="14"
              placeholder="请输入前缀，可输入${siteid}引用中心编号"
              @input="getGenerateCode"
            ></el-input>
          </el-form-item>
          <el-form-item class="main-space">
            <el-select
              v-model="testeeInfo.systemGenerationMode"
              placeholder="请选择"
              @change="getGenerateCode"
            >
              <el-option
                v-for="item in dictionary.planCreateFlagType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="placeholder" class="main-space">
            <el-input
              v-model="testeeInfo.placeholder"
              minlength="1"
              maxlength="9"
              placeholder="输入“0”占位"
              @input="getGenerateCode"
            ></el-input>
          </el-form-item>
          <span class="seeting-tip-info main-space">例：{{ testeeInfo.code }}</span>
        </div>
        <el-form-item label="其他信息:">
          <el-checkbox-group
            v-model="testeeInfo.subjectSettingMessage"
            style="display: inline-block"
          >
            <el-checkbox
              v-for="item in testeeInfo.subjectSettingVoList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-checkbox>
            <span class="main-space main-primaryText-button" @click="clearTesteeForm">清空</span>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="受试者分组:">
          <ul>
            <li
              v-for="(item, index) in testeeInfo.testeeGroup"
              :key="index"
              class="setting-list"
            >
              <span class="setting-testeeGroup-label">{{
                formatterGroup(item)
              }}</span>
              <el-popconfirm
                title="您确定要删除该受试者分组吗？"
                @confirm="deleteGroupItem(item, index)"
              >
                <i
                  slot="reference"
                  class="iconfont iconshanchu main-buttonSpace main-errorIcon-button"
                ></i>
              </el-popconfirm>
            </li>
            <li>
              <el-popover v-model="testeeGroupVisible" placement="top" popper-class="main-popover">
                <div class="main-popover-title">
                  <span>受试者分组</span>
                </div>
                <div class="main-popover-body">
                  <el-form
                    ref="testeeGroupFormForm"
                    :model="testeeGroupForm"
                    label-width="90px"
                    class="main-form"
                    size="mini"
                  >
                    <el-form-item label="分组标签" prop="groupName">
                      <el-input v-model="testeeGroupForm.groupName" minlength="1" maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item
                      v-for="(addItem, addIndex) in testeeGroupForm.subjectGroupItemVoList"
                      :key="addIndex"
                      :prop="'subjectGroupItemVoList.' + addIndex + '.groupItemName'"
                      :label="addIndex === 0 ? '组别' : ''"
                    >
                      <el-input
                        v-model="testeeGroupForm.subjectGroupItemVoList[addIndex].groupItemName"
                        style="width: 70%"
                        minlength="1" maxlength="25"
                      ></el-input>
                      <i
                        v-show="addIndex === 0"
                        class="main-primaryIcon-button el-icon-plus main-buttonSpace"
                        @click="addTesteeGroupItem"
                      ></i>
                      <i
                        v-show="testeeGroupForm.subjectGroupItemVoList.length> 1"
                        class="iconfont iconshanchu main-errorIcon-button main-buttonSpace"
                        @click="deleteTesteeGroupItem(addIndex,testeeGroupForm.subjectGroupItemVoList)"
                      ></i>
                    </el-form-item>
                  </el-form>
                  <div class="main-popover-footer">
                    <el-button
                      size="mini"
                      type="text"
                      class="main-popover-cancelButton"
                      @click="testeeGroupVisible = false"
                    >
                      取消
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      class="main-popover-sureButton"
                      @click="addTesteeGroup"
                    >
                      保存
                    </el-button>
                  </div>
                </div>
                <i
                  slot="reference"
                  class="setting-add-button main-primaryIcon-button el-icon-plus"
                >&nbsp;添加受试者分组</i>
              </el-popover>
            </li>
          </ul>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { RESEARCHRAUTHORITY } from '@/store/stateTypes'
import * as dictionary from '@/assets/js/dictionary'
export default {
	components: {
	},
	props: {
		researchInfo: { // 研究信息
			type: Object,
			default: () => {
				return {}
			}
		},
		testeeInfo: { // 受试者信息
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			dictionary, // 字典
			testeeInfoRules: { // 表单校验
				prefix: this.$filterRules({ name: '前缀', type: 1, required: true }),
				placeholder: this.$filterRules({ ruleType: 'zero', name: '占位符', type: 1, required: true })
			},
			testeeGroup: [], // 受试者分组
			testeeGroupVisible: false, // 受试者分组弹窗框
			testeeGroupForm: {
				// 受试者组form
				groupName: '',
				subjectGroupItemVoList: [{ groupItemCode: '', groupItemName: '' }]
			}
		}
	},
	computed: {
		...mapState('base', {
			researchRauthority: RESEARCHRAUTHORITY
		})
	},
	watch: {
		testeeGroupVisible(value) {
			if (value) {
				this.testeeGroupForm = {
					groupName: '',
					subjectGroupItemVoList: [{ groupItemCode: '', groupItemName: '' }]
				}
			}
		},
		'testeeInfo.numberGenerationMode'(value) {
			if (value === this.dictionary.createFlagType[1].value) {
				if (!this.testeeInfo.prefix)	this.$set(this.testeeInfo, 'prefix', '${siteid}')
			}
		}
	},
	methods: {
		// 格式化分组
		formatterGroup(item) {
			const groupNames = (item.subjectGroupItemVoList || []).map((item) => item.groupItemName).join(',')
			return `${item.groupName} (${groupNames})`
		},
		// 编辑受试者
		updateTesteeConfig() {
			this.$refs.testeeInfo.validate((valid) => {
				if (valid) {
					const { systemGenerationMode, numberGenerationMode, placeholder, prefix } = this.testeeInfo
					const param = this.testeeInfo.numberGenerationMode ? { systemGenerationMode, numberGenerationMode, placeholder, prefix } : { numberGenerationMode }
					this.$api.subject.addSubjectConfig({
						...param,
						subjectSettingMessage: this.testeeInfo.subjectSettingMessage.join(','),
						researchCode: this.researchInfo.code
					}).then((res) => {
						if (res && res.code === 200) {
							this.$message.success('修改受试者信息成功')
						} else {
							if (res && res.msg) this.$message.error(res.msg)
						}
					})
				}
			})
		},
		// 添加受试者分组
		addTesteeGroup() {
			const groupItemNameList = (this.testeeGroupForm.subjectGroupItemVoList || []).map((item) => {
				return item.groupItemName
			})
			this.$api.subject.addSubjectGroup({ groupItemNameList: groupItemNameList || [], groupName: this.testeeGroupForm.groupName, researchCode: this.researchInfo.code }).then((res) => {
				if (res && res.code === 200) {
					this.$message.success('添加受试者分组成功')
					this.$emit('getSubjectGroup')
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
				this.testeeGroupVisible = false
			})
		},
		// 添加受试者组item项
		addTesteeGroupItem() {
			this.testeeGroupForm.subjectGroupItemVoList.push({ groupItemCode: '', groupItemName: '' })
		},
		// 删除受试者组item项
		deleteTesteeGroupItem(index, subjectGroupItemVoList) {
			if (index === 0 && subjectGroupItemVoList.length === 1) return
			this.testeeGroupForm.subjectGroupItemVoList.splice(index, 1)
		},
		// 删除受试者组item
		deleteGroupItem(item) {
			this.$api.subject.delSubjectGroup(item.groupCode).then((res) => {
				if (res && res.code === 200) {
					this.$message.success('删除受试者分组成功')
					this.$emit('getSubjectGroup')
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 清空
		clearTesteeForm() {
			this.testeeInfo.subjectSettingMessage = []
		},
		// 随机code
		getGenerateCode() {
			this.testeeInfo.code = this.testeeInfo.prefix + '' + this.getRandomCode(this.testeeInfo.placeholder.length,	this.testeeInfo.systemGenerationMode || 0) + (this.testeeInfo.placeholder.length ? '1' : '')
		},
		// 获取随机编码
		getRandomCode(length, type) {
			let rnd = ''
			for (let i = 0; i < length - 1; i++) {
				rnd += type === 0 ? 0 : Math.floor(Math.random() * 10)
			}
			return rnd
		}
	}
}
</script>
