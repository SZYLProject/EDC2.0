<template>
  <div v-if="visitList.length" class="visitList-box">
    <draggable class="visitList-draggable" :disabled="isVisitLook" :list="visitList" @change="draggVisitForm(visitList)">
      <div
        v-for="(form) in visitList"
        :key="form.code"
        ref="navList"
        class="visitList-content"
      >
        <div class="visitList-content-title clearfix">
          <div class="float-left main-icon-label word-hidden">
            <span>{{ form.name || "--" }}</span>
          </div>
          <div class="float-right">
            <i v-if="form.isRepeat===dictionary.repeatType[0].value" class="iconfont iconzhongfu main-primaryIcon-button" title="可重复" :class="{'main-disable':isVisitLook}"> </i>
            <i v-if="form.visitType===dictionary.visitType[0].value" class="iconfont iconjihua main-buttonSpace main-primaryIcon-button" :class="{'main-disable':isVisitLook}" @click="!isVisitLook&&setVisitForm(3,form)"></i>
            <i class="iconfont iconbianji main-buttonSpace main-primaryIcon-button" :class="{'main-disable':isVisitLook}" @click="!isVisitLook&&setVisitForm(2,form)"></i>
            <el-popconfirm
              title="您确定要删除该访视吗？"
              :disabled="isVisitLook"
              @confirm="delVisitForm(visitList,form.code,1)"
            >
              <i
                slot="reference"
                class="iconfont iconshanchu main-buttonSpace main-errorIcon-button"
                :class="{'main-disable':isVisitLook}"
              ></i>
            </el-popconfirm>
          </div>
        </div>
        <div class="visitList-content-info">
          <el-scrollbar class="main_scrollbar">
            <draggable class="visitList-group" :list="form.structureFormVoList" :disabled="isVisitLook" @change="draggVisitForm(form.structureFormVoList)">
              <div v-for="item in form.structureFormVoList" :key="item.code" class="visitList-groupItem">
                <div class="visitList-groupItem-label word-hidden" @click="goVisitDesigin(item)">
                  <i class="iconfont iconbiaodan"></i>
                  <span>&nbsp;{{ item.name || "--" }}</span>
                </div>
                <el-dropdown class="visitList-groupItem-dropdown " trigger="click" :hide-on-click="false" @visible-change="groupItemDropdownChange">
                  <i class="main-primaryIcon-button iconfont icongengduo-a"> </i>
                  <el-dropdown-menu slot="dropdown" :class="{'main-disable':isVisitLook}" class="main-dropdown-menu">
                    <el-dropdown-item :disabled="isVisitLook">
                      <el-dropdown trigger="click" size="small" placement="bottom">
                        <i class="iconfont iconyidong main-primaryIcon-button" title="移动到"> <span>&nbsp;移动到</span></i>
                        <el-dropdown-menu slot="dropdown" class="main-dropdown-menu visitList-dropdown">
                          <el-input v-model="searchCopyForm" class="main-search-input" size="mini" suffix-icon="el-icon-search"></el-input>
                          <el-dropdown-item v-for="formItem in getSearchVisitList(item,searchCopyForm)" :key="formItem.code">
                            <p class="ellipsis ptb8" @click="operateVisitForm(item,formItem,'moveForm')">
                              {{ formItem.name }}
                            </p>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="isVisitLook">
                      <el-dropdown trigger="click" size="small" placement="bottom">
                        <i class="iconfont iconfuzhi main-primaryIcon-button" title="复制到"><span>&nbsp;复制到</span></i>
                        <el-dropdown-menu slot="dropdown" class="main-dropdown-menu visitList-dropdown">
                          <el-input v-model="searchCopyForm" class="main-search-input" size="mini" suffix-icon="el-icon-search"></el-input>
                          <el-dropdown-item v-for="formItem in getSearchVisitList(item,searchCopyForm)" :key="formItem.code" class="ellipsis">
                            <p @click="operateVisitForm(item,formItem,'copyForm')">
                              {{ formItem.name }}
                            </p>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="isVisitLook">
                      <el-popconfirm title="您确定要删除该表单吗？" @confirm="!isVisitLook&&delVisitForm(form.structureFormVoList,item.code,2)">
                        <i slot="reference" class="iconfont iconshanchu main-errorIcon-button" title="删除"> <span>&nbsp;删除</span></i>
                      </el-popconfirm>
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="isVisitLook">
                      <i class="iconfont iconshezhi main-primaryIcon-button" title="编辑表单" @click="setVisitForm(5,item)">
                        <span>&nbsp;设置</span>
                      </i>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </draggable>
          </el-scrollbar>
        </div>
        <div class="visitList-content-operate">
          <DhcTooltip content="添加表单" placement="top">
            <el-button
              class="main-primaryCircle-button"
              type="primary"
              icon="el-icon-plus"
              circle
              :disabled="isVisitLook"
              @click="setVisitForm(4,form)"
            ></el-button>
          </DhcTooltip>
        </div>
      </div>
    </draggable>
    <div class="visitList-operate">
      <DhcTooltip content="添加访视">
        <el-button
          class="main-primaryCircle-button"
          type="primary"
          icon="el-icon-plus"
          circle
          :disabled="isVisitLook"
          @click="setVisitForm(1)"
        >
        </el-button>
      </DhcTooltip>
    </div>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import draggable from 'vuedraggable'
export default {
	components: {
		draggable
	},
	props: {
		visitList: {
			type: Array,
			default: () => {
				return []
			}
		},
		isVisitLook: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			dictionary, // 字典
			searchCopyForm: '' // 复制查询的表单
		}
	},
	computed: {
	},
	mounted() {
	},
	methods: {
		// 移动表单
		draggVisitForm(list) {
			this.$emit('draggVisitForm', list)
		},
		// 去设计页面
		goVisitDesigin(item) {
			this.$emit('goVisitDesigin', item)
		},
		// 设置访视
		setVisitForm(type, item) { // 1,新增 2.编辑访视 3.编辑计划访视,4.新增表单，5.编辑表单
			this.$emit('setVisitForm', type, item)
		},
		// 删除访视/表单
		delVisitForm(list, code, type) { // 1 删除访视 2 删除表单
			this.$emit('delVisitForm', list, code, type)
		},
		// 查询访视列表
		getSearchVisitList(item, searchCopyForm) {
			return (this.visitList.filter((infoItem) => {
				return item.parentCode !== infoItem.code && infoItem.name.indexOf(searchCopyForm) !== -1
			}))
		},
		// 下拉框状态改变
		groupItemDropdownChange() {
			this.searchCopyForm = ''
		},
		// 操作表单
		operateVisitForm(item, formItem, type) {
			this.$emit('moveCopeVisitForm', { code: item.code, parentCode: formItem.code }, type)
		}
	}
}
</script>
