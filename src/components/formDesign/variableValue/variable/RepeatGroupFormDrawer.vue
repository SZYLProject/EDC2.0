<template>
  <div class="repeatGroupFormDrawer">
    <el-form
      ref="groupTagForm"
      :model="groupTagForm"
      label-width="100px"
      class="main-form"
      :rules="groupTagFormRules"
      size="mini"
    >
      <el-form-item label="组标签" prop="groupName">
        <el-input v-model="groupTagForm.groupName"></el-input>
      </el-form-item>
      <el-form-item label="可重复">
        <el-switch v-model="groupTagForm.isRepeat" :active-value="dictionary.repeatFlag[0].value" :inactive-value="dictionary.repeatFlag[1].value">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="groupTagForm.isRepeat" label="重复次数">
        <div class="replate-wrap">
          <div>
            <el-input
              v-model="groupTagForm.groupCount"
              :max="40"
              :min="1"
              maxlength="2"
              type="number"
              size="mini"
              placeholder="请输入重复次数，最大限制40"
              @input="changeGroupCount(groupTagForm.groupCount)"
              @blur="blurGroupCount(groupTagForm.groupCount)"
            ></el-input>
          </div>
          <span v-if="isShowWarning" class="main-error-form">重复次数，最大限制40</span>
        </div>
      </el-form-item>
      <el-form-item
        v-if="groupTagForm.isRepeat && groupTagForm.groupCount != 40"
        label="允许重复添加"
      >
        <el-radio-group v-model="groupTagForm.isAdd">
          <el-radio v-for="item in dictionary.isAddFlag" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="groupTagForm.isRepeat" label="是否显示">
        <el-radio-group v-model="groupTagForm.isVisible">
          <el-radio v-for="item in dictionary.visibleFlag" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="!groupTagForm.isVisible"
        label="设置显示条件"
        class="mian-auto-formItem"
      >
        <VisubalForm ref="visubalForm" :conditionForm="conditionForm" :variableForm="groupTagForm"></VisubalForm>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          class="main-primary-button"
          @click="saveGroupItem(false)"
        >
          保存
        </el-button>
        <el-button
          v-if="groupTagForm.formItemCode!==conditionForm.itemCodeRef"
          type="primary"
          size="mini"
          class="main-primary-button  main-buttonSpace"
          @click="saveGroupItem(true)"
        >
          保存并应用
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import VisubalForm from './VisubalForm'
import * as dictionary from '@/assets/js/dictionary'
import { mapState, mapActions } from 'vuex'
import { GROUPTAGFORM } from '@/store/stateTypes'
export default {
	components: {
		VisubalForm
	},
	props: {
		researchCode: { // 研究code
			type: String,
			default: ''
		}
	},
	data() {
		return {
			dictionary, // 字典
			isShowWarning: false, // 是否展示警告
			groupTagFormRules: { // 校验规则
				groupName: this.$filterRules({ name: '组标签', type: 1, required: true, max: 255, min: 1 })
			}
		}
	},
	computed: {
		...mapState('formDesigin', {
			groupTagForm: GROUPTAGFORM
		}),
		conditionForm() { // 条件表单
			return 	!this.groupTagForm.isVisible ? this.groupTagForm.conditionList[0] : {}
		}
	},
	watch: {
		'groupTagForm.isVisible': {
			immediate: true,
			handler: function(value) {
				if (!value) {
					console.log(value)
					// this.$set(this.groupTagForm, 'conditionForm', this.groupTagForm.conditionForm || this.initConditionForm())
					this.$set(this.groupTagForm, 'conditionList', this.groupTagForm.conditionList && this.groupTagForm.conditionList.length ? [{ ...this.groupTagForm.conditionList[0], ...this.getLocalsCode() }] : [this.initConditionForm()])
				}
			}
		}
	},
	methods: {
		...mapActions('formDesigin', {
			getGroupSelectList: 'getGroupSelectList'
		}),
		// 获取版本，研究信息
		getLocalsCode() {
			console.log(this.groupTagForm)
			const researchCode = this.researchCode
			const visitCode = this.$route.query.visitCode
			const formCodeRef = this.$route.params.id
			return { researchCode, visitCode, formCodeRef }
		},
		// 改变重复组数值
		changeGroupCount(value) {
			this.isShowWarning = parseInt(value) > 40
		},
		// 重复组数值校验状态
		blurGroupCount() {
			this.isShowWarning = false
		},
		// 保存组标签
		saveGroupItem(type) {
			Promise.all([!this.groupTagForm.isVisible ? Promise.all([this.$refs.groupTagForm.validate(), this.$refs.visubalForm.formValidate()]) : this.$refs.groupTagForm.validate()]).then(() => {
				this.setGroupItem(this.groupTagForm.groupCode ? 'updateGroup' : 'addGroup', type)
			})
		},
		// 设置组标签
		setGroupItem(apiName, type) {
			const { formCode, formCodeRef, itemCode, itemCodeRef, operator, visitCode, conditionValue } = { ...this.conditionForm }
			const params =	!this.groupTagForm.isVisible ? { ...this.groupTagForm, formCode, formCodeRef, itemCode, itemCodeRef, operator, visitCode, conditionValue: this.$utils.isArrayFn(conditionValue) ? JSON.stringify(conditionValue) : conditionValue } : { ...this.groupTagForm }
			params.conditionList = (params.conditionList || []).map(item => {
				item.conditionValue = this.$utils.isArrayFn(item.conditionValue) ? JSON.stringify(item.conditionValue) : item.conditionValue
				return item
			})
			this.$api.itemGroup[apiName]({ ...params, ...this.getLocalsCode(), formCode: this.$route.params.id }).then((res) => {
				if (res && res.code === 200) {
					this.$message.success(res.msg)
					// 刷新组标签列表
					this.getGroupSelectList()
					this.$emit('popoverCloseGroup', { groupOperate: type, groupName: params.groupName, groupCode: res.data, groupCount: this.groupTagForm.isRepeat ? parseInt(this.groupTagForm.groupCount) || 1 : 1 })
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 初始化condtionForm
		initConditionForm() {
			return 	{
				pkId: '',
				visitCode: '', // 访视
				formCode: '', // 表单
				itemCode: '', // 作为条件的变量
				conditionValue: '', // 条件值
				operator: '', // 操作符
				formCodeRef: '', // 标志着用作条件的变量所在的表单
				itemCodeRef: '', // 标志着用作条件的变量
				type: '1', // 目前只有 1 。'1:单字段控制单字段 2：多字段控制单字段 3：单字段控制Section 4:多字段控制Section ',
				sectionList: [], // 选择访视
				formList: [], // 选择表单
				variableList: [], // 选择变量
				controlType: '',
				...this.getLocalsCode()
			}
		}
	}
}
</script>
<style lang="scss">
.repeatGroupFormDrawer{
	@include size()
}
</style>
