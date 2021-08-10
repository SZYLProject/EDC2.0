<template>
  <div v-loading="isLoading">
    <el-form
      ref="testeeForm"
      size="mini"
      :model="testeeForm"
      :rules="testeeRulesAdd"
      class="main-form"
      label-width="80px"
    >
      <el-form-item
        label="受试者编号"
        label-width="100px"
        :prop="testeeDetail.numberGenerationMode === dictionary.createFlagType[1].value ? '' : 'subjectNumber'"
      >
        <el-input
          v-model="testeeForm.subjectNumber"
          :disabled="testeeDetail.numberGenerationMode === dictionary.createFlagType[1].value"
          :placeholder="
            testeeDetail.numberGenerationMode === dictionary.createFlagType[1].value
              ? '您已选择系统生成，无需填写'
              : '请输入受试者编号'
          "
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="item in testeeDetail.testeeFormList"
        :key="item.prop"
        :label="item.label"
        label-width="100px"
        :prop="item.prop"
      >
        <el-radio-group
          v-if="item.prop === 'gender'"
          v-model="testeeForm[item.prop]"
        >
          <el-radio v-for="(genderItem,genderIndex) in dictionary.genderType" :key="genderIndex" :label="genderItem.value">
            {{ genderItem.label }}
          </el-radio>
        </el-radio-group>
        <el-date-picker
          v-else-if="
            item.prop === 'registrationDate' ||
              item.prop === 'birthday' ||
              item.prop === 'admissionDate'
          "
          v-model="testeeForm[item.prop]"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select
          v-else-if="item.prop === 'patientRelation'"
          v-model="testeeForm[item.prop]"
          placeholder="请选择"
        >
          <el-option
            v-for="(patientRelationItem,patientRelationIndex) in dictionary.patientRelationType" :key="patientRelationIndex" :label="patientRelationItem.label" :value="patientRelationItem.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-else
          v-model="testeeForm[item.prop]"
          :style="{width:item.prop==='nameAcronym'?'90%':'100%'}"
          :placeholder="'请输入' + item.label"
        ></el-input>
        <el-tooltip
          v-if="item.prop === 'nameAcronym'"
          class="item"
          effect="light"
          popper-class="testeeAddPopper"
          content="受试者姓名缩写，按照国家汉语拼音标准方案填写受试者的拼音缩写；两字姓名填写前两个字母；三字姓名填写三字首字母及第三字的第二个字母，四字姓名填写每个字的首字母。如张君ZHJU，王小鹏WXPE，欧阳小雅OYXY；如果不符合上述规则，相应字母位置可用“-”代替。"
          placement="bottom-end"
        >
          <span class="main-tooltip-info">?</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in testeeForm.testeeGroupList"
        :key="item.groupCode"
        :prop="'testeeGroupList.' + index + '.groupValue'"
        :rules="[
          {
            required: true,
            message: '请选择' + item.groupName,
            trigger: 'blur,change',
          },
        ]"
        :label="item.groupName"
        label-width="100px"
      >
        <el-select
          v-model="item.groupValue"
          :placeholder="'请选择' + item.groupName"
        >
          <el-option
            v-for="(groupItem,groupIndex) in item.subjectGroupItemVoList"
            :key="groupIndex"
            :label="groupItem.groupItemName"
            :value="groupItem.groupItemCode"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <p slot="footer" class="main-dialog-footer">
      <el-button class="main-dialog-cancelButton" @click="closeTesteeDialog">
        取 消
      </el-button>
      <el-button
        class="main-dialog-sureButton"
        type="primary"
        @click="saveTestee"
      >
        确 定
      </el-button>
    </p>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { mapState } from 'vuex'
import { TESTEEDETAIL, TESTEEFORM, ISLOADING } from '@/store/stateTypes'
export default {
	data() {
		return {
			dictionary,
			testeeRulesAdd: {
				nameAcronym: this.$filterRules({ name: '姓名缩写', type: 1, required: true }, [{ pattern: /^[A-Z]{4}$/,	message: '请输入 4 位大写字母' }]),
				subjectNumber: this.$filterRules({ name: '受试者编号', type: 1, required: true }, [{ pattern: /^[A-Za-z0-9]{1,200}$/,	message: '请输入 200 位以内数字或字母' }]),
				gender: this.$filterRules({ name: '性别', type: 2, required: true }),
				idNum: this.$filterRules({ name: '身份证号', type: 1, required: true, ruleType: 'idCard' }),
				phoneNumber: this.$filterRules({ name: '手机号', type: 1, required: true, ruleType: 'phone' }),
				name: this.$filterRules({ name: '姓名', type: 1, required: true, max: 25, min: 1 }),
				cardNum: this.$filterRules({ name: '就诊卡号', type: 1, required: true, ruleType: 'seekNumber' }),
				age: this.$filterRules({ name: '年龄', type: 1, required: true, ruleType: 'age' }),
				caseNum: this.$filterRules({ name: '病案号', type: 1, required: true, ruleType: 'patientNumber' }),
				registrationNumber: this.$filterRules({ name: '登记号', type: 1, required: true }),
				registrationDate: this.$filterRules({ name: '登记日期', type: 2, required: true }),
				admissionDate: this.$filterRules({ name: '入院日期', type: 2, required: true }),
				birthday: this.$filterRules({ name: '出生日期', type: 2, required: true }),
				patientRelation: this.$filterRules({ name: '与患者关系', type: 2, required: true }),
				contactNumber: this.$filterRules({ name: '联系人电话', type: 1, required: true, ruleType: 'phone' }),
				contactName: this.$filterRules({ name: '联系人姓名', type: 1, required: true })
			}
		}
	},
	computed: {
		...mapState('environment', {
			testeeForm: TESTEEFORM,
			testeeDetail: TESTEEDETAIL
		}),
		...mapState('base', {
			isLoading: ISLOADING
		})
	},
	watch: {
		testeeDetail: {
			handler(value) {
				if (value) {
					this.$nextTick(() => {
						this.$refs.testeeForm.clearValidate()
					})
				}
			},
			deep: true
		}
	},
	methods: {
		// 关闭弹窗
		closeTesteeDialog() {
			this.$emit('closeEnvironmentDialog')
		},
		// 保存受试者
		saveTestee() {
			const groupValueList = (this.testeeForm.testeeGroupList || []).map((item) => item.groupValue)
			const param = {
				...this.testeeForm,
				groupMessage: this.$utils.deepClone(groupValueList).join(',')
			}
			this.$refs.testeeForm.validate((validate) => {
				if (validate) this.$emit('saveTestee', param)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
