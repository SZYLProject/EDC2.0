<!--
 * @Author: your name
 * @Date: 2021-06-10 14:50:23
 * @LastEditTime: 2021-07-22 14:48:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\formDesign\EntryDialog.vue
-->
<template>
  <div class="entryDialog-box">
    <dhc-dialog
      v-model="isDialog"
      width="100%"
      :title="entryDialogForm.formName"
      :isCancelButton="false"
      :isSureButton="false"
      customClass="entryDialog"
      top=""
      iconfontType="edit"
      @close="close"
    >
      <div class="entryDialogForm-contianor">
        <div class="entryDialogForm-content">
          <div class="entryDialogForm-show">
            <div class="entryDialogForm-show-operate">
              <el-switch
                v-model="entryOperateFlag"
                active-text="图片模式"
                inactive-text="文本模式"
                class="main-switch"
              >
              </el-switch>
            </div>
            <div v-show="entryOperateFlag" class="entryDialogForm-show-content">
              <div class="entryDialogForm-show-imglist">
                <div class="entryDialogForm-show-imglistcontent">
                  <el-scrollbar class="main_scrollbar">
                    <div
                      v-for="(item, index) in imgInfoList || []"
                      :key="index"
                      :class="{ active: currentImgIndex === index }"
                      class="entryDialogForm-show-imglistitem"
                      @click="setCurrentImg(item, index)"
                    >
                      <DhcTooltip :content="item.name" placement="top">
                        <DhcScalImg
                          :img-url="item.img"
                          :alt="item.name"
                          :scalFlag="false"
                        ></DhcScalImg>
                      </DhcTooltip>
                    </div>
                  </el-scrollbar>
                </div>
                <div
                  v-if="imgInfoList.length > 0"
                  class="entryDialogForm-show-imglistpagination"
                >
                  第&nbsp;{{ currentImgIndex + 1 }}&nbsp;张/共&nbsp;{{
                    imgInfoList.length
                  }}&nbsp;张
                </div>
              </div>
              <div class="entryDialogForm-show-imgcontent">
                <DhcScalImg
                  :img-url="imgInfo.img"
                  :alt="imgInfo.name"
                ></DhcScalImg>
              </div>
            </div>
            <div v-show="!entryOperateFlag" class="entryDialogForm-show-content">
              <DhcEditor ref="dhceditor" @editorChange="editorChange"></DhcEditor>
            </div>
          </div>
          <div class="entryDialogForm-operate">
            <el-button
              class="main-primary-button"
              icon="el-icon-right"
              round
              type="primary"
              title="转换"
              @click="changeForm(entryOperateFlag)"
            >
            </el-button>
          </div>
          <div class="entryDialogForm-form">
            <div class="entryDialogForm-form-content">
              <el-scrollbar class="main_scrollbar">
                <el-form
                  ref="entryDialogForm"
                  class="main-form"
                  label-position="top"
                  :model="entryDialogForm"
                >
                  <div
                    v-for="(item, index) in entryDialogForm.formNodeList"
                    :key="item.pkId"
                    class="formEntry-content-item"
                  >
                    <DesignFormLabel
                      v-if="item.isRepeat == dictionary.repeatFlag[1].value"
                      :formOption="item.formData"
                      :type="2"
                      :isSubmit="formStatusInfo.submitStatus === dictionary.submitType[1].value"
                      :prop="'formNodeList.' + index + '.formData.value'"
                      :status="false"
                      :visible="item.isVisible"
                      :index="index"
                      :operateFlag="2"
                    />
                    <FormTable
                      v-if="item.isRepeat === dictionary.repeatFlag[0].value &&item.isVisible"
                      :formOption="item"
                      :type="2"
                      :formBaseInfo="formBaseInfo"
                      :isSubmit="formStatusInfo.submitStatus === dictionary.submitType[1].value"
                      :status="false"
                      :visible="item.formData.isVisible"
                      :index="index"
                      :operateFlag="2"
                    />
                  </div>
                </el-form>
              </el-scrollbar>
            </div>
            <div class="main-buttonBox">
              <el-button
                v-if="formStatusInfo.submitStatus!==dictionary.submitType[1].value"
                class="main-primary-button"
                type="primary"
                @click="saveFormData( entryDialogForm.formNodeList, dictionary.submitType[0].value)"
              >
                保存
              </el-button>
              <el-button
                class="main-primary-button main-buttonSpace"
                type="primary"
                @click="saveFormData(entryDialogForm.formNodeList,dictionary.submitType[1].value)"
              >
                提交
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </dhc-dialog>
  </div>
</template>
<script>
import FormTable from '@/components/formDesign/FormTable.vue'
import DesignFormLabel from '@/components/formDesign/DesignFormLabel'
import * as dictionary from '@/assets/js/dictionary'
export default {
	components: { DesignFormLabel, FormTable },
	props: {
		entryDialogForm: {
			// 弹窗表单
			type: Object,
			default: () => {
				return {}
			}
		},
		value: {
			// 弹窗状态
			type: Boolean,
			default: false
		},
		formBaseInfo: {
			type: Object,
			default: () => {
				return {}
			}
		},
		formStatusInfo: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			entryOperateFlag: true, // 录入操作状态
			dictionary, // 字典
			currentImgIndex: 0, // 当前图片index
			entryFormTxt: '' // 录入表单文本
		}
	},
	computed: {
		isDialog: {
			get() {
				return this.value
			},
			set() {}
		},
		imgInfo() {
			return this.imgInfoList[this.currentImgIndex] || {}
		},
		imgInfoList() {
			return this.entryDialogForm.imgInfoList || []
		}
	},
	methods: {
		close() {
			this.$emit('input', false)
			this.$emit('close')
		},
		// 富文本编辑变化
		editorChange(value) {
			this.entryFormTxt = value
		},
		// 转换
		changeForm(flag) {
			this.$confirm('转换数据！', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				const text = this.$refs.dhceditor.getTxt()
				console.log(text)
			})
		},
		// 设置当前图片
		setCurrentImg(item, index) {
			this.currentImgIndex = index
		},
		// 保存form表单
		saveFormData(formNodeList, subjectFormStatus) {
			// 保存 2 ，提交 3
			this.$refs.entryDialogForm.validate((valid) => {
				if (valid) {
					this.$emit('setFormData', formNodeList, subjectFormStatus)
				}
			})
		}
	}
}
</script>
