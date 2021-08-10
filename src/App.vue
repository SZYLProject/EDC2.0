<!--
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-08-05 15:51:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import locals from '@/local'
export default {
	data() {
		return {}
	},
	created() {
		this.initLocals()
	},
	methods: {
		initLocals() {
			locals.setNetworkFlag(true)
		}
	}
}
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/animation.scss";
@import "@/assets/css/theme.scss";
@import "@/assets/css/media.scss";
#app {
  @include size()
}
</style>
