<template>
  <div class="groupLabel">
    <el-popover
      v-model="isShowGroupSelect"
      placement="bottom"
      trigger="click"
      width="300"
      popper-class="main-popover groupLabel-popover"
      @show="showGroupPopover"
    >
      <div v-if="isShowGroupSelect" class="groupLabel-list">
        <el-scrollbar class="main_scrollbar">
          <div
            v-for="(item, index) in groupList.filter(item=>item.groupName)"
            :key="index"
            :class="{
              'active': variableForm && variableForm.groupName&& variableForm.groupName == item.groupName,
            }"
            class="groupLabel-item"
          >
            <p class="groupLabel-item-name" @click.stop="selectGroupItem(item)">
              <i class="iconfont iconbiaodan"></i>
              <span>{{ item.groupName || '--' }}</span>
            </p>
            <p v-if="item.groupCode !== 'root'" class="groupLabel-item-operate">
              <el-button
                type="primary"
                :disabled="isVisitLook"
                class="iconfont iconbianji main-primaryIcon-button"
                @click="editGroup(item,index)"
              ></el-button>
              <el-popconfirm
                confirmButtonText="确定"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定要删除此组标签吗？"
                @confirm="delGroup(item,index)"
              >
                <el-button slot="reference" :disabled="isVisitLook" class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"></el-button>
              </el-popconfirm>
            </p>
          </div>
        </el-scrollbar>
      </div>
      <el-input
        slot="reference"
        v-model="variableForm.groupName"
        :readonly="true"
        placeholder="请选择组标签"
      >
      </el-input>
    </el-popover>
    <el-button
      class="setting-add-button main-primaryIcon-button el-icon-plus groupLabel-add"
      :disabled="isVisitLook"
      @click="addGroup()"
    ></el-button>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import { mapActions, mapMutations, mapState } from 'vuex'
import { SETDIALOGINFO, SETGROUPLIST, SETGROUPTAGFORM } from '@/store/mutationTypes'
import { GROUPLIST } from '@/store/stateTypes'
export default {
	inject: ['isVisitLook', 'researchCode'],
	props: {
		variableForm: { // 当前项
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			isShowGroupSelect: false// 是否展示组选项下拉
		}
	},
	computed: {
		...mapState('formDesigin', {
			groupList: GROUPLIST
		})
	},
	methods: {
		...mapMutations('base', {
			setGroupDrawerInfo: SETDIALOGINFO
		}),
		...mapMutations('formDesigin', {
			setGroupList: SETGROUPLIST,
			setGroupTagForm: SETGROUPTAGFORM
		}),
		...mapActions('formDesigin', {
			getGroupSelectList: 'getGroupSelectList'
		}),
		// 展示组标签list
		showGroupPopover() {
			this.getGroupSelectList({ researchCode: this.researchCode })
		},
		// 编辑组
		editGroup(item) {
			this.isShowGroupSelect = false
			this.setGroupDrawerInfo({ title: '编辑组标签', visible: true, type: 1 })
			const conditionList =	(item.conditionList || []).map(conditionItem => {
				conditionItem.conditionValue = this.$utils.isJSON(conditionItem.conditionValue) ? JSON.parse(conditionItem.conditionValue) : conditionItem.conditionValue
				return conditionItem
			})
			this.setGroupTagForm({ ...item, conditionList, isRepeat: item.isRepeat, variableForm: this.variableForm, formItemCode: this.variableForm.itemCode })
		},
		// 删除组
		delGroup(item) {
			this.$api.itemGroup.deleteGroup({ groupCode: item.groupCode }).then((res) => {
				if (res && res.code === 200) {
					this.$message.success(res.msg)
					this.setGroupList([...this.groupList.filter(subItem => subItem.groupCode !== item.groupCode)])
					// 删除自动选择默认组
					this.variableForm.groupName === item.groupName && this.$bus.$emit('deleteCurrentGroup')
					this.getGroupSelectList()
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 新增组
		addGroup() {
			this.isShowGroupSelect = false
			this.setGroupDrawerInfo({ title: '新增组标签', visible: true, type: 1 })
			this.setGroupTagForm({ groupName: '', isRepeat: false, groupCount: 0, isAdd: dictionary.isAddFlag[0].value, isVisible: dictionary.visibleFlag[0].value, variableForm: this.variableForm, formItemCode: this.variableForm.itemCode })
		},
		// 选择组选项
		selectGroupItem(item) {
			this.$emit('selectGroupItem', { groupName: item.groupName, groupCode: item.groupCode, groupCount: item.groupCount || 0 })
			this.isShowGroupSelect = false
		}
	}
}
</script>
