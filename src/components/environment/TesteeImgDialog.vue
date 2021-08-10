<!--
 * @Author: your name
 * @Date: 2021-06-17 14:41:40
 * @LastEditTime: 2021-06-23 15:06:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\visit\TesteeImgDialog.vue
-->
<template>
  <div class="testeeImgDialog-box">
    <dhc-dialog
      v-model="isDialog"
      width="90%"
      title="受试者图片"
      iconfontType="edit"
      :isCancelButton="false"
      :isSureButton="false"
      customClass="testeeImgDialog"
      @close="close"
    >
      <div class="testeeImgDialog-contianor">
        <div class="testeeImgDialog-content">
          <div class="testeeImgDialog-upload">
            <div class="testeeImgDialog-upload-content">
              <el-scrollbar class="main_scrollbar">
                <div class="testeeImgDialog-contentbox">
                  <el-form
                    ref="testeeImgForm"
                    :model="testeeImgForm"
                    :rules="testeeImgFormRules"
                    label-width="100px"
                    class="main-form"
                  >
                    <el-form-item label="受试者编号" prop="name">
                      <span class="main-form-text">{{ testeeImgForm.subjectDisplayedNumber }}</span>
                    </el-form-item>
                    <el-form-item label="上传图片" class="main-fileUpload">
                      <el-upload
                        class="upload-demo"
                        action="http://172.16.115.60:8083/web/file/uploadFile"
                        :on-preview="testeeUploadPreview"
                        :on-remove="testeeUploadRemove"
                        :on-change="testeeUploadChange"
                        :file-list="testeeUploadList"
                        :multiple="true"
                        :limit="5"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG,.bmp"
                        :on-exceed="testeeUploadExceed"
                      >
                        <el-input prefix-icon="el-icon-folder-opened" class="main-file-input" :disabled="true" suffix-icon="el-icon-arrow-down" placeholder="选择文件" @click="testeeUploadOpen"></el-input>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="上传时间" prop="actualTime">
                      <el-date-picker
                        v-model="testeeImgForm.actualTime"
                        prefix-icon="iconfont iconrili"
                        type="datetime"
                        :picker-options="pickerOptionsDate"
                        placeholder="选择开始日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="标签" prop="tagId" class="main-textarea">
                      <TagList v-model="testeeImgForm.tagId" :tagList="tagList" @saveTag="saveTag"></TagList>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" class="main-textarea">
                      <el-input
                        v-model="testeeImgForm.remark"
                        type="textarea"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-scrollbar>
            </div>
            <div class="testeeImgDialog-upload-operate main-dialog-footer">
              <el-button
                class="main-dialog-sureButton"
                type="primary"
                @click="saveTesteeImgForm"
              >
                保存
              </el-button>
            </div>
          </div>
          <div class="testeeImgDialog-tablelist">
            <div class="testeeImgDialog-tablelist-operate main-dialog-footer">
              <div class="float-left">
                <el-checkbox v-model="testeeImgTableCheck" :indeterminate="isTesteeImgTableIndeterminate" @change="testeeImgTableCheckChange">
                  全选
                </el-checkbox>
              </div>
              <el-button
                class="main-dialog-sureButton"
                type="primary"
                @click="editImg"
              >
                修改
              </el-button>
              <el-button
                v-if="!testeeImgTableCheck"
                class="main-dialog-sureButton main-buttonSpace"
                type="primary"
                @click="deleteImg"
              >
                删除
              </el-button>
              <el-popconfirm
                v-else
                title="您确定要删除图片吗？"
                @confirm="deleteImg"
              >
                <el-button
                  slot="reference"
                  class="main-dialog-sureButton main-buttonSpace"
                  type="primary"
                >
                  删除
                </el-button>
              </el-popconfirm>
            </div>
            <div class="testeeImgDialog-tablelist-content">
              <el-scrollbar class="main_scrollbar">
                <div class="testeeImgDialog-contentbox">
                  <div v-for="(item,i) in testeeImgList" :key="i" class="testeeImgDialog-tablelist-item" :class="{'last-item':(i+1)/3>Math.ceil(testeeImgList.length/3)-1,'active':item.select}" @click="item.select=!item.select">
                    <!-- <el-checkbox v-model="item.select" class="testeeImgDialog-tablelist-itemcheck"></el-checkbox> -->
                    <i v-show="item.select" class="iconfont iconjiaobiao testeeImgDialog-tablelist-itemcheck"></i>
                    <!-- <div class="testeeImgDialog-tablelist-img" @click.stop="openTesteeImg(item.url,item.name)">
                    <DhcScalImg
                      :img-url="item.url"
                      :alt="item.name"
                      :scalFlag="false"
                    ></DhcScalImg>
                  </div> -->
                    <div class="testeeImgDialog-tablelist-img">
                      <DhcScalImg
                        :img-url="item.url"
                        :alt="item.name"
                        :scalFlag="false"
                        :operateFlag="true"
                      ></DhcScalImg>
                    </div>
                    <div class="testeeImgDialog-tablelist-info">
                      <div class="testeeImgDialog-tablelist-infotext word-hidden">
                        {{ item.name }}
                      </div>
                      <div class="testeeImgDialog-tablelist-infotext word-hidden">
                        <i :style="{color:item.tag.color}" class="iconfont iconbiaoqian1"></i>&nbsp;{{ item.tag.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </dhc-dialog>
    <EditImgDialog v-model="isEditImgDialog" :tagList="tagList" :imgForm="testeeEditImgForm" @saveImg="saveImg"></EditImgDialog>
  </div>
</template>
<script>
import EditImgDialog from '@/components/environment/EditImgDialog'
import TagList from '@/components/environment/TagList'
import * as dictionary from '@/assets/js/dictionary'
export default {
	components: { TagList, EditImgDialog },
	props: {
		value: {
			type: Boolean,
			default: false
		},
		testeeImgDialogInfo: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			pickerOptionsDate: {
				disabledDate: (time) => {
					return time.getTime() > Date.now()
				}
			},
			isEditImgDialog: false, // 编辑图片弹窗
			tagList: [], // 标签列表
			testeeImgTableCheck: false, // 全选check的值
			isTesteeImgTableIndeterminate: false, // 全反选状态
			testeeImgList: [], // 表格数据
			testeeUploadFlag: false,
			testeeUploadList: [
				{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
				{ name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
				{ name: 'food3.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
			], // 上传图片列表
			testeeEditImgForm: {}, // 编辑图片表单
			testeeImgForm: {}, // 图片表单
			dictionary, // 字典
			testeeImgFormRules: {
				actualTime: this.$filterRules({ name: '上传时间', type: 2, required: true }),
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
	watch: {
		isDialog(value) {
			if (value) {
				this.testeeImgForm = this.testeeImgDialogInfo
				this.testeeImgList = [{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间2', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间3', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间4', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间5', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间6', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间7', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }},
					{ select: false, name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', tag: { id: 1, name: '时间8', color: '#' + Math.floor(Math.random() * 0xffffff).toString(16) }}]
				// this.testeeImgList
				// let length =
				this.tagList = []
				for (let i = 0; i < 10; i++) {
					this.tagList.push({ tagName: `时12312321间${i}`, tagColor: '#' + Math.floor(Math.random() * 0xffffff).toString(16), tagId: i + 1 })
				}
			}
		},
		testeeImgList: {
			handler(value) {
				const unSelectInfo = value.find(item => {
					return !item.select
				})
				const selectInfo = value.find(item => {
					return item.select
				})
				this.testeeImgTableCheck = !!selectInfo
				this.isTesteeImgTableIndeterminate = !!unSelectInfo && !!selectInfo
			},
			deep: true
		}
	},
	methods: {
		// 保存标签
		saveTag(form) {
			const tagList = this.$utils.deepClone(this.tagList)
			this.tagList = [...tagList, { ...form, tagId: tagList.length + 1 }]
		},
		// 保存受试者图片表单
		saveTesteeImgForm() {
			this.$refs.testeeImgForm.validate((valid) => {
				if (valid) {
					// const {	code,	 actualTime	} = { ...this.testeeImgForm }
					// this.$api.subject.updateSubjectActualTime({ code, actualTime	}).then((res) => {
					// 	if (res && res.code === 200) {
					// 		this.$message.success(res.msg)
					// 	} else {
					// 		if (res && res.msg) this.$message.error(res.msg)
					// 	}
					// 	this.$emit('saveVisitTime', { flag: res.code === 200, testeeImgForm: this.testeeImgForm })
					// })
				}
			})
		},
		// 保存img
		saveImg() {
			this.$message.success('编辑图片成功')
			this.isEditImgDialog = false
		},
		// 编辑img
		editImg() {
			if (!this.testeeImgTableCheck) {
				this.$message.error('请选择需要修改的图片')
				return
			}
			this.isEditImgDialog = true
		},
		// 删除img
		deleteImg() {
			if (!this.testeeImgTableCheck) {
				this.$message.error('请选择需要删除的图片')
				return
			}
			this.$message.success('删除图片成功')
		},
		// 图片详情
		openTesteeImg() {
			// console.log(12321321)
		},
		// 全选改变
		testeeImgTableCheckChange(value) {
			this.testeeImgList.forEach(item => {
				item.select = value
				return item
			})
			this.isTesteeImgTableIndeterminate = false
		},
		// 上传图片打卡
		testeeUploadOpen() {
			this.testeeUploadFlag = true
		},
		// 上传图片移除
		testeeUploadRemove(file) {
			console.log(file)
		},
		// 上传图片展示
		testeeUploadPreview(file) {
			console.log(file)
		},
		// 上传图片时改变
		testeeUploadChange(file, fileList) {
			const type = this.$utils.isImage(file.name)
			this.testeeUploadList = fileList
			const fileLength = this.testeeUploadList.length
			if (!type) {
				// 若不符合图片类型，则让当前上传的文件去除掉即可，即从上传对列删除本次上传
				this.testeeUploadList.splice(fileLength - 1, 1)
				if (this.testeeUploadFlag) this.$message.error('只允许上传图片')
				this.testeeUploadFlag = false
			}
			console.log(this.testeeUploadList)
		},
		// 上传超出限制
		testeeUploadExceed() {
			this.$message.error('最多上传五张图片')
		},
		close() {
			this.$emit('input', false)
			this.$emit('close')
		}
	}
}
</script>
