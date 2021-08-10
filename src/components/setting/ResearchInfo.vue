<!--
 * @Author: your name
 * @Date: 2021-05-17 11:14:01
 * @LastEditTime: 2021-08-06 20:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\setting\ResearchInfo.vue
-->
<template>
  <div class="main-card">
    <div class="main-card-title clearfix">
      <div class="main-icon-label float-left">
        <span>研究信息</span>
      </div>
      <div class="main-card-button float-right">
        <el-button
          class="iconfont iconxiugai main-primaryIcon-button"
          @click.stop="editResearch"
        ></el-button>
      </div>
    </div>
    <div class="main-card-content">
      <div class="main-card-info">
        <span class="main-card-info-title">研究标题：</span>
        <span class="main-card-info-content">{{
          researchInfo.name
        }}</span>
      </div>
      <div class="main-card-info">
        <span class="main-card-info-title">研究编号：</span>
        <span class="main-card-info-content">{{ researchInfo.researchNumber }}</span>
      </div>
      <div class="main-card-info">
        <span class="main-card-info-title">研究摘要：</span>
        <span class="main-card-info-content">{{
          researchInfo.target
        }}</span>
      </div>
      <div class="main-card-info">
        <span class="main-card-info-title">研究类型：</span>
        <span class="main-card-info-content">{{
          researchInfo.type | filterListLabel(dictionary.researchType)
        }}</span>
      </div>
      <div class="main-card-info">
        <span class="main-card-info-title">样本量：</span>
        <span class="main-card-info-content">{{
          researchInfo.planNumber
        }}</span>
        <span class="main-card-info-title">（达到样本量后允许继续添加受试者）</span>
      </div>
      <div class="main-card-info">
        <span class="main-card-info-title">研究周期：</span>
        <span class="main-card-info-content">{{ researchInfo.startDate|filterSubstringDate() }}-{{ researchInfo.endDate|filterSubstringDate() }}</span>
      </div>
    </div>
    <!-- 研究信息修改 -->
    <ResearchDialog
      v-model="isResearchDialog"
      title="研究信息修改"
      :researchForm="researchForm"
      iconfontType="edit"
      iconfont="iconxiugai"
      @saveResearch="saveResearch"
    ></ResearchDialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { RESEARCHRAUTHORITY } from '@/store/stateTypes'
import { SETRESEARCHNAME } from '@/store/mutationTypes'
import * as dictionary from '@/assets/js/dictionary'
import ResearchDialog from '@/components/research/ResearchDialog'
export default {
	components: {
		ResearchDialog
	},
	props: {
		value: { // 研究信息
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			dictionary, // 字典
			isResearchDialog: false, // reaserch弹窗
			researchForm: {} // 研究form
		}
	},
	computed: {
		...mapState('base', {
			researchRauthority: RESEARCHRAUTHORITY
		}),
		researchInfo: {
			get() {
				return this.value
			},
			set() {}
		}
	},
	methods: {
		...mapMutations('research', {
			setResearchName: SETRESEARCHNAME
		}),
		// 保存研究
		saveResearch() {
			const {
				id,
				endDate,
				planNumber,
				name,
				target,
				type,
				startDate
			} = this.researchForm
			this.$api.research.updateResearch({
				id,
				endDate,
				planNumber,
				name,
				target,
				type,
				startDate
			}).then((res) => {
				if (res && res.code === 200) {
					this.isResearchDialog = false
					this.$emit('input', this.$utils.deepClone(res.data || this.researchForm))
					this.$message.success('修改研究成功')
					this.setResearchName(res.data && res.data.name ? res.data.name : name)
				} else {
					if (res && res.msg) this.$message.error(res.msg)
				}
			})
		},
		// 编辑research
		editResearch() {
			this.researchForm = this.$utils.deepClone(this.researchInfo)
			this.isResearchDialog = true
		}
	}
}
</script>
