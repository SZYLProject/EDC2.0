<!--
* @description
* @fileName TreeNav.vue
* @author 孟建伟
* @date 2020/12/05 15:51:59
* @version V1.1.0
!-->
<template>
  <div class="treeNav">
    <el-scrollbar class="main_scrollbar">
      <el-tree
        ref="treeList"
        :data="treeData"
        node-key="code"
        :props="defaultProps"
        :expand-on-click-node="true"
        :default-expanded-keys="expandKeys"
        :default-checked-keys="expandKeys"
        class="treeNav-tree"
        @node-expand="treeExpandChange"
        @node-click="handleNodeClick"
      >
        <span
          slot-scope="{node , data }"
          class="treeNav-tree-item"
          :class="{ 'main-disable': data.status > dictionary.visitStatusType[1].value ,'active':getTreeItemActive(node,treeValue)}"
        >
          <div v-if="node.level===1" class="treeNav-levelOne">
            <DhcTooltip v-if="data.name && data.name.length >12" :content="data.name" placement="top">
              <span>{{ data.name.slice(0, 12) + "..." }}
              </span>
            </DhcTooltip>
            <span v-else>
              {{ data.name }}
            </span>
            <i class="el-icon-arrow-right treeNav-levelOne-icon"></i></div>
          <div v-else class="treeNav-levelTwo" :class="{ 'treeNav-sdvStatus-info': data.sdvStatus===dictionary.sdvType[1].value,'active':data.code===treeValue }">
            <span class="treeNav-circle"></span>
            <DhcTooltip v-if="data.name && data.name.length >12" :content="data.name" placement="top">
              <p :class="{'active':data.code===treeValue }">
                <i
                  v-if="data.sdvStatus===dictionary.sdvType[1].value"
                  class="el-icon-question treeNav-tree-colorTip"
                ></i>{{ data.name.slice(0, 12) + "..." }}
              </p>
            </DhcTooltip>
            <p v-else :class="{'active':data.code===treeValue }">
              <i
                v-if="data.sdvStatus===dictionary.sdvType[1].value"
                class="el-icon-question treeNav-tree-colorTip"
              ></i>{{ data.name }}
            </p>
          </div>
        <!-- <span v-if="node."></span> -->
        </span>
      </el-tree>
    </el-scrollbar>
    <VisitTimeDialog v-model="isVisitTimeDialog" :visitTimeForm="visitTimeForm" @saveVisitTime="saveVisitTime"></VisitTimeDialog>
  </div>
</template>
<script>
import VisitTimeDialog from '@/components/environment/VisitTimeDialog'
import * as dictionary from '@/assets/js/dictionary'
export default {
	components: { VisitTimeDialog },
	props: {
		treeValue: { // 绑定值
			type: String,
			default: ''
		},
		treeData: { // data
			type: Array,
			required: true,
			default: () => {
				return []
			}
		},
		expandKeys: { // 展开值
			type: Array,
			required: true,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			defaultProps: { // 配置项
				children: 'subjectFormVoList',
				label: 'name'
			},
			visitTimeForm: {}, // 访视表单
			isVisitTimeDialog: false, // 访视弹窗
			dictionary// 字典
		}
	},
	computed: {},
	watch: {
	},
	created() {
	},
	mounted() {},
	methods: {
		// 获取高亮tree
		getTreeItemActive(node, value) {
			const info = (node.childNodes || []).find(item => {
				return item.data.code === value
			})
			return !!(info)
		},
		// 保存访视
		saveVisitTime(flag) {
			if (flag) {
				this.isVisitTimeDialog = false
				this.$emit('saveVisitTime', this.visitTimeForm)
			}
		},
		// 树展开变化
		treeExpandChange(item, node) {
			if (item.status !== dictionary.visitStatusType[1].value) {
				node.expanded = false
			} else {
				node.expanded = true
			}
		},
		// 左侧树点击
		async handleNodeClick(item, node) {
			// console.log(item.status)
			// if (item.status > dictionary.visitStatusType[1].value) return
			if (node.level === 1) {
				const info = this.$utils.deepClone(item)
				// console.log(this.dictionary.visitStatusType[0].value)
				if (info.status !== this.dictionary.visitStatusType[0].value) return
				if (info.type === this.dictionary.visitType[2].value) {
					this.$api.subject.updateSubjectProcessing(info.code).then(res => {
						if (res && res.code === 200) {
							this.$emit('saveVisitTime', info)
						}
					})
				} else {
					this.visitTimeForm = info
					this.visitTimeForm.code = info.code
					this.visitTimeForm.visitName = info.name
					this.isVisitTimeDialog = true
				}
			} else {
				this.$emit('treeClick', item, node)
			}
		}
	}
}
</script>
