<template>
  <div class="environment main-navBar-content">
    <div v-if="isShowSelectCenter" class="environment-search clearfix">
      <div class="float-left main-searchForm">
        <div class="main-searchForm-item">
          <span class="main-searchForm-label">研究中心:</span>
          <el-select
            v-model="centerCodeKey"
            placeholder="请选择"
            size="mini"
            class="main-searchForm-input"
          >
            <el-option
              v-for="item in centerList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="float-right main-searchForm">
        <div v-if="testeeSelectList.length&&isShowTesteeSelect" class="main-searchForm-item">
          <el-select
            v-model="testeeSearchForm.testeeType"
            placeholder="请选择"
            size="mini"
            class="main-searchForm-input"
          >
            <el-option
              v-for="(item,index) in testeeSelectList"
              :key="index"
              :label="item.label"
              :value="item.prop"
            ></el-option>
          </el-select>
        </div>
        <div v-if="testeeSelectList.length&&isShowTesteeSelect" class="main-searchForm-item">
          <el-select
            v-if="testeeSearchOption[testeeSearchForm.testeeType] && testeeSearchOption[testeeSearchForm.testeeType].type==='select'"
            v-model="testeeSearchForm.value"
            :placeholder="getTesteeSearchPlaceholder()"
            size="mini"
            clearable
            class="main-searchForm-input"
            @change="testeeSearchChange"
          >
            <el-option
              v-for="(item,index) in (testeeSearchOption[testeeSearchForm.testeeType]?testeeSearchOption[testeeSearchForm.testeeType].itemOptionList:[])"
              :key="index"
              :label="item.groupItemName"
              :value="item.groupItemCode"
            ></el-option>
          </el-select>
          <el-date-picker
            v-else-if="testeeSearchOption[testeeSearchForm.testeeType] && testeeSearchOption[testeeSearchForm.testeeType].type==='time'"
            v-model="testeeSearchForm.value"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
            @change="testeeSearchChange"
          ></el-date-picker>
          <el-input
            v-else
            v-model="testeeSearchForm.value"
            class="main-search-input"
            :placeholder="getTesteeSearchPlaceholder()"
          >
            <i
              slot="suffix"
              class="iconfont iconsousuo"
              @click="testeeSearchChange()"
            ></i>
          </el-input>
        </div>
        <el-button
          v-if="$route.name === 'TesteeList'"
          class="main-primary-button "
          size="mini"
          type="primary"
          @click="addTestee"
        >
          添加受试者
        </el-button>
      </div>
    </div>
    <div :class="isShowSelectCenter?'main-searchNav-content':'main-plain-content'">
      <router-view></router-view>
    </div>
    <dhc-dialog
      v-model="isEnviromentDialog"
      :title="environmentDialogInfo.title"
      :isSureButton="false"
      :isCancelButton="false"
      width="32%"
      :iconfontType="environmentDialogInfo.iconfontType"
      :iconfont="environmentDialogInfo.iconfont"
      @close="closeEnviromentDialog"
    >
      <div :is="environmentDialogInfo.component" @closeEnvironmentDialog="closeEnviromentDialog" @saveTestee="saveTestee"></div>
    </dhc-dialog>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import locals from '@/local'
import TesteeForm from '../../components/environment/TesteeForm'
import { DIALOGINFO, TESTEEDETAIL, TESTEEFORM, RESEARCHCODE } from '@/store/stateTypes'
import { SETDIALOGINFO, SETCENTERCODE, SETRERUITMENTCOUNT } from '@/store/mutationTypes'
import { CENTERCODE, CENTERLIST } from '@/store/stateTypes'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		TesteeForm
	},
	data() {
		return {
			centerCodeKey: '', // 中心value
			testeeSearchForm: {
				testeeType: 'subjectDisplayedNumber',
				value: ''
			},
			testeeSearchOption: {}
		}
	},
	computed: {
		...mapState('environment', {
			centerList: CENTERLIST,
			centerCode: CENTERCODE,
			testeeForm: TESTEEFORM,
			testeeDetail: TESTEEDETAIL
		}),
		...mapState('research', {
			researchCode: RESEARCHCODE
		}),
		...mapState('base', {
			environmentDialogInfo: DIALOGINFO
		}),
		isEnviromentDialog: {
			get() {
				return this.environmentDialogInfo.visible
			},
			set() {}
		},
		isShowTesteeSelect() {
			return this.$route.name === 'TesteeList' || this.$route.name === 'Recruitment'
		},
		testeeSelectList() {
			const testeeFormList = (this.testeeDetail.testeeFormList || []).map(item => {
				if (item.prop === 'gender') {
					return { ...item, type: 'select', itemOptionList: dictionary.genderType.map(subItem => {
						return {
							groupItemCode: subItem.value,
							groupItemName: subItem.label
						}
					}) }
				} else if (item.prop === 'registrationDate' || item.prop === 'birthday' || item.prop === 'admissionDate') {
					return { ...item, type: 'time' }
				} else if (item.prop === 'patientRelation') {
					return { ...item, type: 'select', itemOptionList: dictionary.patientRelationType.map(subItem => {
						return {
							groupItemCode: subItem.value,
							groupItemName: subItem.label
						}
					}) }
				} else {
					return { ...item, type: 'input' }
				}
			})
			const testeeGroupList = (this.testeeForm.testeeGroupList || []).map(item => {
				return {
					itemOptionList: item.subjectGroupItemVoList,
					prop: item.groupCode,
					label: item.groupName,
					type: 'select',
					valueType: 'group'
				}
			})
			return [{ prop: 'subjectDisplayedNumber', label: '受试者编号', type: 'input' }, ...testeeFormList, ...testeeGroupList]
		},
		isShowSelectCenter() {
			return 	this.$route.name === 'TesteeList' || this.$route.name === 'QueryList' || this.$route.name === 'Recruitment'
		}
	},
	watch: {
		$route: {
			handler() {
				if (this.researchCode && this.isShowSelectCenter) {
					this.getCenterSelectList(this.researchCode)
				}
				this.setReruitmentCount(Math.ceil(100 * Math.random()))
			},
			deep: true,
			immediate: true
		},
		researchCode: {
			handler(value) {
				console.log(value)
				if (value && this.isShowSelectCenter) {
					this.getCenterSelectList(this.researchCode)
				}
			},
			immediate: true
		},
		centerList: {
			handler(value) {
				console.log(value)
				this.centerCodeKey = value.length ? value[0].code || '' : ''
			},
			deep: true
		},
		centerCodeKey: {
			handler(value) {
				this.setCenterKey(value)
				if (this.isShowTesteeSelect && this.researchCode) {
					this.getSubjectAddedInfo({ researchCode: this.researchCode })
				}
			},
			immediate: true
		},
		testeeSelectList: {
			handler(value) {
				this.testeeSearchOption = {}
				value.forEach(item => {
					this.testeeSearchOption[item.prop] = item
				})
			},
			deep: true,
			immediate: true
		},
		'testeeSearchForm.testeeType'() {
			this.$set(this.testeeSearchForm, 'value', '')
			this.testeeSearchChange()
		}
	},
	created() {
	},
	methods: {
		...mapMutations('base', {
			setDialogInfo: SETDIALOGINFO
		}),
		...mapMutations('environment', {
			setCenterKey: SETCENTERCODE,
			setReruitmentCount: SETRERUITMENTCOUNT
		}),
		...mapActions('environment', {
			getCenterSelectList: 'getCenterSelectList',
			getSubjectAddedInfo: 'getSubjectAddedInfo'
		}),
		// 受试者查询改变
		testeeSearchChange() {
			const info = {}
			const testeeInfo = this.testeeSelectList.find(item => {
				return (item.prop === this.testeeSearchForm.testeeType) && item.valueType === 'group'
			})
			info[testeeInfo ? 'groupMessage' : this.testeeSearchForm.testeeType] = this.testeeSearchForm.value
			this.$bus.$emit('testeeSearchChange', this.testeeSearchForm.value ? info : null)
		},
		// 获取受试者查询提示
		getTesteeSearchPlaceholder() {
			const info = this.testeeSelectList.find(item => {
				return item.prop === this.testeeSearchForm.testeeType
			})
			return info.type === 'input' ? `请输入` : `请选择`
		},
		// 保存受试者
		saveTestee(info) {
			this.$api.subject.addSubject(info).then((res) => {
				if (res && res.code === 200) {
					this.$message.success('添加成功')
					this.closeEnviromentDialog()
					this.$bus.$emit('saveTestee')
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 关闭弹窗
		closeEnviromentDialog() {
			this.setDialogInfo({	title: '',	component: '', visible: false	})
		},
		// 添加受试者
		addTestee() {
			this.setDialogInfo({	title: '添加受试者',	component: 'TesteeForm', visible: true, loading: false	})
			this.getSubjectAddedInfo({ researchCode: this.researchCode, centerCode: this.centerCode })
		},
		// 获取用户在该研究测试或生产环境的权限code
		getMenuByResearch() {
			const info = {
				code: this.getLocalsCode().researchCode,
				environment: Number(this.$route.query.env) || locals.getEnvironmentCode()
				// userId: userInfo.userItCode || ''
			}
			this.$api.research.getMenuByResearch(info).then((res) => {
				if (res.code === 200) {
					//
				}
			})
		}
	}
}
</script>
