<template>
  <div class="drageFormModel">
    <DhcTabs v-model="activeTab" :isBorder="false" :list="formModelParams">
      <div v-show="activeTab===1" class="drageFormModel-content">
        <div class="drageFormModel-tree-content">
          <div class="drageFormModel-tree">
            <div class="treeNav">
              <el-scrollbar class="main_scrollbar">
                <el-tree
                  ref="treeList"
                  :data="treeData"
                  node-key="code"
                  :props="defaultProps"
                  :default-expanded-keys="expandTreeKeys"
                  :default-checked-keys="expandTreeKeys"
                  class="treeNav-tree"
                  @node-click="handleNodeClick"
                >
                  <span
                    slot-scope="{node , data }"
                    class="treeNav-tree-item"
                    :class="{'active':getTreeItemActive(node,treeValue)}"
                  >
                    <div v-if="node.level===1" class="treeNav-levelOne">
                      <DhcTooltip v-if="data.name && data.name.length >8" :content="data.name" placement="top">
                        <span>{{ data.name.slice(0, 8) + "..." }}
                        </span>
                      </DhcTooltip>
                      <span v-else>
                        {{ data.name }}
                      </span>
                      <i class="el-icon-arrow-right treeNav-levelOne-icon"></i></div>
                    <div v-else class="treeNav-levelTwo" :class="{'active':data.code===treeValue }">
                      <DhcTooltip v-if="data.name && data.name.length >8" :content="data.name" placement="top">
                        <p :class="{'active':data.code===treeValue }">{{ data.name.slice(0, 8) + "..." }}
                        </p>
                      </DhcTooltip>
                      <p v-else :class="{'active':data.code===treeValue }">
                        {{ data.name }}
                      </p>
                    </div>
                  </span>
                </el-tree>
              </el-scrollbar>
            </div>
          </div>
          <div class="drageFormModel-list-content">
            <el-scrollbar class="main_scrollbar">
              <draggable v-model="dictionaryComponentList" :group="{ name: 'people', pull: 'clone', put: false }" :disabled="isVisitLook" :clone="cloneElement">
                <transition-group type="transition">
                  <div v-for="item in dictionaryComponentList" :key="item.formCode" class="drageFormModel-list-item">
                    <template>
                      <span>
                        <i class="iconfont" :class="item.icon"></i>
                        <DhcTooltip v-if="item.itemName && item.itemName.length >8" :content="item.itemName" placement="top">
                          <span class="main-button-space">{{ item.itemName.slice(0, 8) + "..." }}
                          </span>
                        </DhcTooltip>
                        <span v-else class="main-button-space">
                          {{ item.itemName }}
                        </span>
                        <span class="float-right"> <i class="iconfont icontuodong"></i></span>
                      </span>
                    </template>
                  </div>
                </transition-group>
              </draggable>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div v-show="activeTab===2" class="drageFormModel-content">
        <div class="drageFormModel-search">
          <el-input v-model="componentName" size="smmall" class="main-search-input" placeholder="请输入关键字查找组件" @input="componentNameChange">
            <!-- <i slot="suffix" class="iconfont iconsousuo" @click="$emit('searchResearch',researchName)"></i> -->
          </el-input>
        </div>
        <div class="drageFormModel-list">
          <el-scrollbar class="main_scrollbar">
            <draggable v-model="componentList" :group="{ name: 'people', pull: 'clone', put: false }" :disabled="isVisitLook" :clone="cloneElement">
              <transition-group type="transition">
                <div v-for="item in componentList" :key="item.id" class="drageFormModel-list-item">
                  <template>
                    <span>
                      <i class="iconfont" :class="item.icon"></i>
                      <span class="main-button-space">{{ item.itemName }}</span>
                    </span>
                    <span class="float-right"> <i class="iconfont icontuodong"></i></span>
                  </template>
                </div>
              </transition-group>
            </draggable>
          </el-scrollbar>
        </div>
      </div>
    </DhcTabs>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { componentList } from '@/assets/js/meta'
import * as dictionary from '@/assets/js/dictionary'
export default {
	components: {
		draggable
	},
	props: {
		isVisitLook: {
			type: Boolean,
			default: true
		},
		treeData: { // data
			type: Array,
			required: true,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			treeValue: '',
			expandTreeKeys: [],
			defaultProps: { // 配置项
				children: 'children',
				label: 'name'
			},
			dictionaryComponentList: [], // 字典组件list
			activeTab: 1,
			formModelParams: [{ label: '基础变量', value: 1 }, { label: '自定义变量', value: 2 }],
			componentName: '', // 组件名称
			componentList // 组件列表
		}
	},
	watch: {
		treeData: {
			handler(value) {
				const info = (value || []).find((item, index) => { return index === 0 })
				if (info && info.children.length) {
					this.treeValue = info.children[0].code
					this.expandTreeKeys = [info.children[0].code]
					this.dictionaryComponentList = this.getDictionaryComponentList(info.children[0].formOptionList)
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		// 树点击
		handleNodeClick(item, node) {
			if (node.level === 2) {
				this.treeValue = item.code
				this.dictionaryComponentList = this.getDictionaryComponentList(item.formOptionList)
			}
		},
		// 得到树的组件list
		getDictionaryComponentList(formOptionList) {
			const list = (formOptionList || []).map((item, index) => {
				const info = componentList.find(componentItem => {
					return componentItem.controlType === item.controlType
				})
				if (info) {
					return { ...item, icon: info.icon, formCode: index }
				}
			})
			return list
		},
		// 获取高亮tree
		getTreeItemActive(node, value) {
			const info = (node.childNodes || []).find(item => {
				return item.data.code === value
			})
			return !!(info)
		},
		// tab切换
		changeTab(value) {
			this.activeTab = value
		},
		// 输入查询改变
		componentNameChange() {
			if (this.componentName) {
				this.componentList = this.componentList.filter(item => {
					return (item.itemName.toLowerCase().indexOf(this.componentName.toLowerCase()) > -1 || item.subName.toLowerCase().indexOf(this.componentName.toLowerCase()) > -1)
				})
			} else {
				this.componentList = componentList
			}
		},
		// 克隆dom元素数据
		cloneElement(item) {
			return {
				itemVisable: true,
				pkId: '',
				// name: clone.itemName,
				itemCode: '',
				itemName: item.itemName,
				isVisible: dictionary.visibleFlag[0].value,
				desc: '',
				checked: 0,
				logicVerify: 0,
				headingLevel: 18,
				showVisible: true,
				optionName: '',
				isCalculate: dictionary.calculateType[0].value, // 0输入,1 计算, 2:默认值
				isReadonly: dictionary.readonlyFlag[1].value, // 是否只读 1是,0否
				isCondition: 0,
				isRequired: dictionary.requiredFlag[1].value,
				groupCode: 'root',
				controlType: item.controlType,
				value: item.controlType === 'CB' ? [] : '',
				defaultValue: item.controlType === 'CB' ? [] : '',
				itemOptionList: [
					{
						itemName: '',
						itemValue: '',
						researchCode: '',
						sectionCode: ''
					}
				],
				optionVo: {
					optionList: [
					]
				},
				isShowSDV: true,
				sdv: dictionary.sdvFlag[1].value,
				numConfig: {
					allowDecimal: 0,
					decimalDigit: 2,
					scopeValid: 0,
					rangeDown: 0,
					rangeUp: 1000
				},
				groupName: '默认组',
				allowDecimal: 0,
				scopeValid: 0,
				optionDirection: dictionary.directionType[0].value,
				calculateMain: {
					calculate: {}
				},
				calculateInfo: {
					calculate: '',
					calculateDisplay: '',
					calculateSuffix: '',
					dateUnit: '',
					type: '',
					calculateDesce: ''
				},
				calculateList:	[{
					calculate: '',
					calculateDisplay: '',
					calculateSuffix: '',
					dateUnit: '',
					type: '',
					calculateDesce: ''
				}],
				conditionList: [
					{
						pkId: '',
						researchCode: '', // 研究
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
						controlType: ''
					}
				],
				...item
			}
		}
	}
}
</script>
