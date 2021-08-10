<!--
* @description
* @fileName FormEntry.vue
* @author 孟建伟
* @date 2020/12/05 15:33:29
* @version V1.1.0
!-->
<template>
  <div v-loading="isLoading" class="formPreview  main-navBar-content" element-loading-text="拼命加载中...">
    <div class="main-button-content">
      <div ref="formPreviewContent" class="main-table-content">
        <div class="formPreview-content">
          <p class="formPreview-title">
            {{ $route.query.title }}
          </p>
          <el-form
            ref="formRule"
            label-position="top"
            class="main-form"
            :model="entryForm"
          >
            <div
              v-for="(item, index) in entryForm.formNodeList"
              :key="item.pkId"
            >
              <DesignFormLabel
                v-if="item.isRepeat == dictionary.repeatFlag[1].value"
                :formOption="item.formData"
                :type="2"
                :prop="'formNodeList.' + index + '.formData.value'"
                :visible="item.isVisible"
                :operateFlag="1"
              />
              <FormTable
                v-if="item.isRepeat === dictionary.repeatFlag[0].value && item.isVisible"
                :ref="`fromTable${index}`"
                :index="index"
                :formOption="item"
                :type="2"
                :operateFlag="1"
              />
            </div>
          </el-form>
        </div>
      </div>
      <div class="main-buttonBox">
        <el-button
          type="primary"
          icon="iconfont iconshangchuan"
          class="main-primary-button"
          @click="$utils.backtop($refs.formPreviewContent)"
        >
        </el-button>
        <el-button
          type="primary"
          :disabled="true"
          class="main-primary-button main-buttonSpace"
        >
          保存
        </el-button>
        <el-button
          type="primary"
          :disabled="true"
          class="main-primary-button main-buttonSpace"
        >
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as dictionary from '@/assets/js/dictionary'
import FormTable from '@/components/formDesign/FormTable.vue'
import DesignFormLabel from '@/components/formDesign/DesignFormLabel'
import { formCalculate } from '@/utils/formCalculate'
import { RESEARCHCODE } from '@/store/stateTypes'
import { mapState } from 'vuex'
export default {
	components: { DesignFormLabel, FormTable },
	props: {},
	data() {
		return {
			entryForm: { // 表单
				formNodeList: []
			}, // 表单node列表
			dictionary, // 字典
			isLoading: false, // 是否是loading
			isVisitLook: false // 是否访视查看状态
		}
	},
	computed: {
		...mapState('research', {
			researchCode: RESEARCHCODE
		})
	},
	watch: {
		'entryForm.formNodeList': {
			handler() {
				this.entryForm.formNodeList.forEach((item) => {
					if (item) formCalculate.setCondition(item.formData, this.entryForm.formNodeList)
					if (item && item.isCalculate === dictionary.calculateType[1].value) formCalculate.setCalculate(item.formData, this.entryForm.formNodeList)
				})
			},
			deep: true
		},
		$route: {
			handler() {
				this.isVisitLook = JSON.parse(this.$route.query.isVisitLook || 'false')
			},
			deep: true,
			immediate: true
		},
		researchCode: {
			handler(value) {
				if (value) {
					this.getInputPreview()
				}
			},
			immediate: true
		}
	},
	mounted() {
	},
	methods: {
		// 获取表单数据
		async getInputPreview() {
			this.isLoading = true
			const res = await	this.$api.formData.getInputPreview({
				formCode: this.$route.params.id,
				preview: true,
				researchCode: this.researchCode,
				visitCode: this.$route.query.visitCode
			})
			if (res && res.code === 200) {
				this.entryForm.formNodeList = (res.data.formItemData || []).map((item) => {
					if (item.isRepeat === this.dictionary.repeatFlag[1].value) {
						return {
							...item,
							formData: {
								...item.formData,
								...item.label[0],
								value: this.$utils.formatterDefaultValue({ ...item.formData, ...item.label[0] }),
								allow: item.allow,
								conditionExpression: item.conditionExpression,
								conditionType: item.conditionType,
								isVisible: item.isVisible,
								sdv: item.sdv
							}
						}
					} else {
						item.formData = item.formData || []
						return item
					}
				})
			} else {
				if (res && res.msg) this.$message.error(res.msg)
			}
			this.isLoading = false
		}
	}
}
</script>
