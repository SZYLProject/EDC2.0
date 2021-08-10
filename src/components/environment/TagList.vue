<!--
 * @Author: your name
 * @Date: 2021-06-18 17:56:31
 * @LastEditTime: 2021-06-21 10:29:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\environment\TagForm.vue
-->
<template>
  <div class="tagList">
    <div class="tagList-content">
      <div v-for="(item,i) in tagList" :key="i" class="tagList-item" :class="{'active':activeTagValue===item.tagId}" @click="selectTagItem(item)">
        <i :style="{color:item.tagColor}" class="iconfont iconbiaoqian1"></i>&nbsp;{{ item.tagName }}
      </div>
    </div>
    <div v-if="isMore" class="tagList-more">
      <el-popover v-show="isShowAddContent" v-model="isTagVisible" placement="top" popper-class="main-popover">
        <div class="main-popover-title">
          <span>标签</span>
        </div>
        <div class="main-popover-body">
          <el-form
            ref="tagForm"
            :rules="tagFormRules"
            :model="tagForm"
            label-width="90px"
            class="main-form"
            size="mini"
          >
            <el-form-item label="标签名称" prop="tagName">
              <el-input v-model="tagForm.tagName" minlength="1" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="标签颜色" prop="tagColor">
              <el-color-picker v-model="tagForm.tagColor"></el-color-picker>
            </el-form-item>
          </el-form>
          <div class="main-popover-footer">
            <el-button
              size="mini"
              type="text"
              class="main-popover-cancelButton"
              @click="isTagVisible = false"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="mini"
              class="main-popover-sureButton"
              @click="addTag"
            >
              保存
            </el-button>
          </div>
        </div>
        <i
          slot="reference"
          class="main-primaryIcon-button el-icon-plus tag-add-button"
        >添加标签</i>
      </el-popover>
      <span class="main-primaryText-button float-right" @click="isShowAddContent=!isShowAddContent">{{ !isShowAddContent?'更多':'收起' }}</span>
    </div>
  </div>
</template>
<script>
export default {
	props: {
		tagList: { // 标签列表
			type: Array,
			default: () => {
				return []
			}
		},
		value: { // 值
			type: [Boolean, Number],
			default: false
		},
		isMore: { // 值
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isShowAddContent: false, // 显示添加的状态,
			isTagVisible: false, // 标签显示
			tagForm: {
				tagName: '',
				tagColor: '#409EFF'
			}, // 表单
			tagFormRules: {
				tagName: this.$filterRules({ name: '标签名称', type: 1, required: true }),
				tagColor: this.$filterRules({ name: '标签颜色', type: 2, required: true })
			}
		}
	},
	computed: {
		activeTagValue: {
			get: function() {
				return this.value
			},
			set: function() {
				return
			}
		}
	},
	watch: {
		isTagVisible(value) {
			if (value) {
				this.$refs.tagForm.resetFields()
			}
		}
	},
	methods: {
		// 选择tag
		selectTagItem(item) {
			this.$emit('input', item.tagId)
		},
		// 添加标签
		addTag() {
			this.$refs.tagForm.validate((valid) => {
				if (valid) {
					this.isTagVisible = false
					this.$message.success('添加标签成功')
					this.$emit('saveTag', this.tagForm)
				}
			})
		}
	}
}
</script>
