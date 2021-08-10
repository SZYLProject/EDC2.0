<!--
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-08-06 18:38:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\App.vue
-->
<template>
  <div class="main-box">
    <NavigationBar id="nav" :title="$webTitle" />
    <MainContainer v-if="$route.meta.isNavbar">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </MainContainer>
    <transition v-else name="fade" mode="out-in">
      <router-view class="main-navBarPagination-content" />
    </transition>
  </div>
</template>
<script>
import NavigationBar from '@/components/nav/NavigationBar'
import MainContainer from '@/components/MainContainer'
import locals from '@/local'
import { mapMutations } from 'vuex'
import { SETRESEARCHINFO, SETRESEARCHRAUTHORITY } from '@/store/mutationTypes'
export default {
	components: {
		NavigationBar,
		MainContainer
	},
	data() {
		return {
		}
	},
	watch: {
		$route: {
			handler(value) {
				this.initLocals()
				if (value.meta.isGetResearch) {
					this.getResearchInfo()
				} else {
					this.setResearchInfo({})
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		window.addEventListener('beforeunload', e => this.researchRouteLoad())
	},
	methods: {
		...mapMutations('base', {
			setResearchRauthority: SETRESEARCHRAUTHORITY
		}),
		...mapMutations('research', {
			setResearchInfo: SETRESEARCHINFO
		}),
		// 初始化locals
		initLocals() {
			locals.setUserToken(locals.getUserToken())
			locals.setUserInfo(locals.getUserInfo())
		},
		// 获取研究
		getResearchInfo() {
			const researchId = this.$route.query.researchId
			if (!researchId) return this.$router.push({ name: 'Research'	})
			this.$api.research.getResearchById(researchId).then(res => {
				if (res && res.code === 200) {
					const info = res.data || {}
					const { status, name, code, englishNameList } = info
					this.setResearchInfo({ info, status, researchName: name, researchCode: code })
					locals.setResearchCode(code)
					this.setResearchRauthority(englishNameList || [])
				} else {
					this.$router.push({ name: 'Research'	})
				}
			})
		},
		// 刷新
		researchRouteLoad() {
			if (this.$route.name === 'Research')	locals.delResearchPaginationConfig()
		}
	}
}
</script>
