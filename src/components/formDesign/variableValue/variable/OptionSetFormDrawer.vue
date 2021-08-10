<template>
  <div class="optionSetFormDrawer">
    <el-form
      ref="optionForm"
      label-position="top"
      size="mini"
      class="main-form"
      :model="optionForm"
    >
      <el-form-item
        label="选项集名称"
        prop="optionName"
        :rules="[
          {
            required: true,
            message: '选项集名称',
            trigger: 'change',
          },
        ]"
      >
        <el-input v-model="optionForm.optionName"></el-input>
      </el-form-item>
      <template v-for="(item, index) in optionForm.optionList">
        <el-row :key="index" :gutter="10" style="width:100%">
          <el-col :span="8">
            <el-form-item
              label=""
              :prop="'optionList.' + index + '.optionItemName'"
              :rules="[
                {
                  required: true,
                  message: '选项',
                  trigger: 'blur',
                },
              ]"
            >
              <span v-if="index === 0" slot="label">选项</span>
              <el-input v-model="item.optionItemName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :prop="'optionList.' + index + '.optionItemValue'"
              :rules="getDispalyValueRule(item.optionItemValue,index,optionForm.optionList)"
            >
              <span v-if="index === 0" slot="label">选项编码</span>
              <el-input v-model.number="item.optionItemValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="150px">
              <span v-if="index === 0" slot="label">操作</span>
              <!-- <el-col :span="14">
                <el-upload
                  class="optionSetFormDrawer-upload "
                  :data="{ optionIndex: index }"
                  action=""
                  :show-file-list="false"
                  :http-request="uploadImg"
                >
                  <el-button
                    type="primary"
                    size="mini"
                  >
                    <span class="word-hidden" :title="item.pictureOriginal||item.selectImage?item.pictureOriginal||item.selectImage:''">{{ item.pictureOriginal||item.selectImage|| '上传图片' }}</span>
                  </el-button>
                </el-upload>
              </el-col> -->
              <el-col :span="10">
                <i class="main-primaryIcon-button  el-icon-plus" @click="initOptionItem"></i>
                <i
                  v-if="optionForm.optionList.length > 1"
                  class="iconfont iconshanchu main-errorIcon-button  main-buttonSpace"
                  title="删除"
                  @click="delOptionItem(index)"
                ></i>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          class="main-primary-button"
          @click="saveOptionItem(false)"
        >
          保存
        </el-button>
        <el-button
          type="primary"
          size="mini"
          class="main-primary-button   main-buttonSpace"
          @click="saveOptionItem(true)"
        >
          保存并应用
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { OPTIONFORM } from '@/store/stateTypes'
import { SETOPTIONFORM, SETFORMOPTIONLIST } from '@/store/mutationTypes'
export default {
	props: {
		researchCode: { // 研究code
			type: String,
			default: ''
		}
	},
	data() {
		return {
			optionFormFlag: false
		}
	},
	computed: {
		...mapState('formDesigin', {
			optionForm: OPTIONFORM
		})
	},
	watch: {
		optionForm: {
			handler(value) {
				this.optionFormFlag = true
			},
			deep: true
		}
	},
	methods: {
		...mapMutations('formDesigin', {
			setOptionForm: SETOPTIONFORM,
			setFormOptionList: SETFORMOPTIONLIST
		}),
		// 得到编码code的校验规则
		getDispalyValueRule(optionItemValue, index, optionList) {
			const rule = 	[
				{
					required: true,
					message: '选项编码必须是数字',
					trigger: 'blur',
					type: 'number'
				}
			]
			rule.push({
				validator: (rule, value, callback) => {
					if (value) {
						const info = optionList.find((optionItem, optionIndex) => {
							return optionItem.optionItemValue === optionItemValue && optionIndex !== index
						})
						if (info) {
							callback(
								new Error(`选项编码不能重复`)
							)
						}
					}
					callback()
				},
				trigger: ['change', 'blur']
			})
			return rule
		},
		// 保存option
		saveOptionItem(type) {
			this.$refs.optionForm.validate(validate => {
				if (validate) {
					const apiName = this.optionForm.optionCode ? 'updateOption' : 'save'
					this.$api.itemOption[apiName]({ ...this.optionForm, researchCode: this.researchCode }).then((res) => {
						if (res && res.code === 200) {
							const optionForm = this.$utils.deepClone(this.optionForm)
							optionForm.optionList.map(item => {
								item.optionItemValue = item.optionItemValue.toString()
							})
							if (type) {
								this.setFormOptionList([optionForm])
							}
							this.$emit('popoverCloseGroup', { optionOperate: type, optionName: this.optionForm.optionName, optionCode: res.data, optionForm, optionFormFlag: this.optionFormFlag })
						} else {
							if (res && res.msg) this.$message.error(res.msg)
						}
					})
				}
			})
		},
		/*
    ------------------上传功能有问题 ------------------
   */
		// 上传图片
		uploadImg(fileObj) {
			const optionIndex = fileObj.data.optionIndex
			this.$set(this.optionForm.optionList[optionIndex], 'selectImage', fileObj.file.name)
			const formData = new FormData()
			formData.append('file', fileObj.file)
			this.$api.file.uploadFile(formData).then((res) => {
				if (res && res.code === 200) {
					const info = this.$utils.deepClone(this.optionForm)
					info.optionList.map((item, index) => {
						if (index === optionIndex) {
							item.pictureUrl = res.data.path
							item.pictureOriginal = res.data.originalFilename
						}
					})
					this.setOptionForm(info)
				}
			})
		},
		// 初始化一个选项集
		initOptionItem() {
			this.optionForm.optionList.push({
				optionItemName: '',
				optionItemValue: '',
				selectImage: '上传图片',
				pictureUrl: '',
				pictureOriginal: ''
			})
		},
		// 删除集合里面的选项集
		delOptionItem(index) {
			if (this.optionForm.optionList.length > 1) {
				this.optionForm.optionList.splice(index, 1)
			}
		}
	}
}
</script>
