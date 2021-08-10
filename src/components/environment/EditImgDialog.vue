<!--
 * @Author: your name
 * @Date: 2021-06-21 10:45:23
 * @LastEditTime: 2021-06-21 14:05:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\environment\EditImgDialog.vue
-->
<template>
  <dhc-dialog
    v-model="isDialog"
    width="40%"
    title="编辑图片"
    iconfontType="edit"
    iconfont="iconxiugai"
    customClass="editImgDialogForm"
    @sure="saveImg"
    @close="close"
  >
    <el-form
      ref="imgForm"
      size="mini"
      :model="imgForm"
      :rules="imgFormRules"
      label-width="120px"
      class="main-form"
    >
      <el-scrollbar class="main_scrollbar">
        <div class="editImgDialogForm-form-content">
          <el-form-item label="标签" prop="tagId" class="main-textarea">
            <TagList v-model="imgForm.tagId" :tagList="tagList" :isMore="false"></TagList>
          </el-form-item>
          <el-form-item label="备注" prop="remark" class="main-textarea">
            <el-input
              v-model="imgForm.remark"
              type="textarea"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
      </el-scrollbar>
    </el-form>
  </dhc-dialog>
</template>
<script>
import TagList from '@/components/environment/TagList'
export default {
	components: { TagList },
	props: {
		imgForm: { // 表单
			type: Object,
			default: () => {
				return {}
			}
		},
		value: { // 弹窗
			type: Boolean,
			default: false
		},
		tagList: { // 标签列表
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			imgFormRules: {
				tagId: this.$filterRules({ name: '标签', type: 2, required: true })
			}
		}
	},
	computed: {
		isDialog: {
			get() {
				return this.value
			},
			set() {
			}
		}
	},
	methods: {
		saveImg() {
			this.$refs.imgForm.validate((valid) => {
				if (valid) {
					this.$emit('saveImg')
				}
			})
		},
		close() {
			this.$emit('input', false)
			this.$emit('close', false)
		}
	}
}
</script>
