<template>
  <div>
    <el-form
      ref="planVisitForm"
      size="mini"
      class="main-form planVisitForm"
      :model="planVisitForm"
      :rules="planVisitRules"
      label-width="120px"
    >
      <el-form-item label="当前访视:" prop="name">
        <span class="main-form-text">{{ planVisitForm.name }}</span>
      </el-form-item>
      <span v-if="planVisitForm.testeeGroup.length" class="main-form-label">受限制的分组:</span>
      <el-form-item
        v-for="(item, index) in planVisitForm.testeeGroup"
        :key="item.groupCode"
        :prop="`groupSubjectCodeList.${index}`"
        :label="item.groupName + ':'"
        :rules="[
          {
            required: true,
            message: '请选择' + item.groupName + '受试者组',
            trigger: 'change',
          },
        ]"
      >
        <el-select
          v-model="planVisitForm.groupSubjectCodeList[index]"
          :style="{ width: '100%' }"
          :placeholder="'请选择' + item.groupName + '受试者组'"
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
      <el-form-item label="关联访视:" prop="relevanceVisitCode">
        <el-select
          v-model="planVisitForm.relevanceVisitCode"
          :style="{ width: '100%' }"
          placeholder="请选择关联访视"
          @change="pickOption"
        >
          <el-option
            v-for="(groupItem,index) in planVisitForm.relevanceVisitVoList"
            :key="index"
            :label="groupItem.name"
            :value="groupItem.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="planVisitForm-unitForm" label="访视间隔:">
        <!--required-->
        <el-col :span="6">
          <el-form-item prop="visitInterval.0" :rules="$filterRules({ name: '访视间隔天数', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input
              v-model="planVisitForm.visitInterval[0]"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          天
        </el-col>
        <el-col :span="6">
          <el-form-item prop="visitInterval.1" :rules="$filterRules({ name: '访视间隔小时', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input
              v-model="planVisitForm.visitInterval[1]"
              type="number"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          小时
        </el-col>
        <el-col :span="6">
          <el-form-item prop="visitInterval.2" :rules="$filterRules({ name: '访视间隔分钟', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input
              v-model="planVisitForm.visitInterval[2]"
              type="number"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          分钟
        </el-col>
      </el-form-item>
      <el-form-item class="planVisitForm-unitForm" label="访视窗(之前):">
        <!--required-->
        <el-col :span="6">
          <el-form-item prop="front.0" :rules="$filterRules({ name: '访视窗(之前)隔天数', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input v-model="planVisitForm.front[0]" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          天
        </el-col>
        <el-col :span="6">
          <el-form-item prop="front.1" :rules="$filterRules({ name: '访视窗(之前)小时', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input v-model="planVisitForm.front[1]" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          小时
        </el-col>
        <el-col :span="6">
          <el-form-item prop="front.2" :rules="$filterRules({ name: '访视窗(之前)分钟', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input v-model="planVisitForm.front[2]" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          分钟
        </el-col>
      </el-form-item>
      <el-form-item class="planVisitForm-unitForm" label="访视窗(之后):">
        <el-col :span="6">
          <el-form-item prop="later.0" :rules="$filterRules({ name: '访视窗(之后)天数', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input v-model="planVisitForm.later[0]" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          天
        </el-col>
        <el-col :span="6">
          <el-form-item prop="later.1" :rules="$filterRules({ name: '访视窗(之后)小时', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input v-model="planVisitForm.later[1]" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          小时
        </el-col>
        <el-col :span="6">
          <el-form-item prop="later.2" :rules="$filterRules({ name: '访视窗(之后)分钟', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input v-model="planVisitForm.later[2]" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          分钟
        </el-col>
      </el-form-item>
      <el-form-item
        v-if="planVisitForm.isRepeat===dictionary.repeatType[0].value"
        class="planVisitForm-unitForm"
        label="重复频率(每隔):"
      >
        <el-col :span="6">
          <el-form-item prop="repeatRate.0" :rules="$filterRules({ name: '重复频率天数', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input
              v-model="planVisitForm.repeatRate[0]"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          天
        </el-col>
        <el-col :span="6">
          <el-form-item prop="repeatRate.1" :rules="$filterRules({ name: '重复频率小时', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input
              v-model="planVisitForm.repeatRate[1]"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          小时
        </el-col>
        <el-col :span="6">
          <el-form-item prop="repeatRate.2" :rules="$filterRules({ name: '重复频率分钟', type: 1, required: true, ruleType: 'thanZero' })">
            <el-input
              v-model="planVisitForm.repeatRate[2]"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="planVisitForm-unit" :span="2">
          分钟
        </el-col>
      </el-form-item>
      <el-form-item
        v-if="planVisitForm.isRepeat===dictionary.repeatType[0].value"
        label="重复次数:"
        prop="repeatCount"
      >
        <el-col :span="6">
          <el-input
            v-model="planVisitForm.repeatCount"
            type="number"
            placeholder=""
          ></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <p slot="footer" class="main-dialog-footer">
      <el-button class="main-dialog-cancelButton" @click="close">
        取 消
      </el-button>
      <el-button
        class="main-dialog-sureButton"
        type="primary"
        @click="savePlanVisitForm('planVisitForm')"
      >
        确 定
      </el-button>
    </p>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
export default {
	props: {
		planVisitForm: { // 表单
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			dictionary, // 字典
			planVisitRules: {
				relevanceVisitCode: this.$filterRules({ name: '关联访视', type: 2, required: true }),
				repeatCount: this.$filterRules({ name: '重复次数', type: 1, required: true, ruleType: 'num' })
			}
		}
	},
	methods: {
		savePlanVisitForm() {
			this.$refs['planVisitForm'].validate((valid) => {
				if (valid) {
					this.$emit('savePlanVisitForm', this.$utils.deepClone(this.planVisitForm))
				} else {
					return false
				}
			})
		},
		close() {
			this.$emit('close')
		},
		pickOption() {}
	}
}
</script>
<style lang="scss" scoped>
</style>
