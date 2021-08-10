<!--
 * @Author: your name
 * @Date: 2021-03-24 18:16:22
 * @LastEditTime: 2021-08-06 17:08:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\MainContainer.vue
-->
<template>
  <div class="main-container">
    <div class="main-content">
      <NavBar
        :environmentCode="environmentCode"
        :reruitmentFlag="reruitmentFlag"
        :researchName="researchName"
        @addResearch="addResearch"
        @toRecovery="toRecovery"
        @goBack="goBack"
        @publishVisitHistory="publishVisitHistory"
        @environmentNavMoreClick="environmentNavMoreClick"
        @searchResearch="searchResearch"
        @searchManagement="searchManagement"
        @setManagementName="setManagementName"
        @changeReserchStatus="changeReserchStatus"
      ></NavBar>
      <slot />
    </div>
  </div>
</template>
<script>
import locals from '@/local'
import NavBar from '@/components/nav/NavBar'
import { environmentType } from '@/assets/js/dictionary'
import { mapMutations } from 'vuex'
import { SETNAVBARTYPE, SETDIALOGINFO, SETMANAGEMENTPARAMS } from '@/store/mutationTypes'
export default {
	components: {
		NavBar
	},
	data() {
		return {
			environmentCode: '',
			researchName: ''
		}
	},
	computed: {
		reruitmentFlag() {
			return true
		}
	},
	watch: {
		$route: {
			immediate: true,
			deep: true,
			handler: function(value) {
				this.researchName = !locals.getResearchPaginationConfig()	? '' : locals.getResearchPaginationConfig().researchName
				this.environmentCode = locals.getEnvironmentCode() || environmentType[0].value
				this.setNavBarType(value.meta.navBarType)
				if (value.meta.isManagement) this.setManagementParams({ centerName: '', userName: '' })
			}
		}
	},
	methods: {
		...mapMutations('base', {
			setNavBarType: SETNAVBARTYPE,
			setDialogInfo: SETDIALOGINFO
		}),
		...mapMutations('management', {
			setManagementParams: SETMANAGEMENTPARAMS
		}),
		// 设置名称
		setManagementName(info) {
			this.setManagementParams(info)
		},
		// 查询
		searchManagement(type, name) {
			this.$bus.$emit('searchManagement', type, name)
		},
		// 搜索研究
		searchResearch(name) {
			this.$bus.$emit('searchResearch', name)
		},
		// 新增研究
		addResearch() {
			// this.setIsResearchDialog(true)
			this.$bus.$emit('addResearch')
		},
		// 回收点击
		toRecovery() {
			this.$router.push({ name: 'Recovery' })
		},
		// 进入设计
		changeReserchStatus(status) {
			this.$bus.$emit('changeReserchStatus', status)
		},
		// 返回
		goBack(type) {
			const { goName, isQuery, isKeepRoute } = this.$route.meta
			if (goName) {
				isQuery ?	this.$router.push({	name: goName,	query: this.$route.query }) : this.$router.push({ name: goName	})
			}
			if (isKeepRoute) {
				const routeInfo = locals.getRouteMoreRecord()
				if (routeInfo && routeInfo[type]) {
					this.$router.push({
						path: routeInfo[type].path,
						query: routeInfo[type].query || this.$route.query
					})
				} else {
					this.$router.push({ name: 'Research'	})
				}
			}
		},
		// 发布版本
		publishVersion() {
			this.setIsPublishVersionDialog(true)
		},
		// 发布历史
		publishVisitHistory() {
			this.$router.push({
				name: 'VisitHistory',
				query: this.$route.query
			})
		},
		// 环境导航更多选项点击
		environmentNavMoreClick(info) {
			if (!info.flag) {
				this.$message.error('正在开发中....')
				return
			}
			locals.setRouteMoreRecord(info.value, {
				path: this.$route.path,
				query: this.$route.query
			})
			this.$router.push({
				path: `/${info.value}`,
				query: { ...this.$route.query }
			})
		}
	}
}
</script>
