<!--
 * @Author: your name
 * @Date: 2021-04-13 09:37:05
 * @LastEditTime: 2021-05-20 17:47:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\tooltip\index.vue
-->
<template>
  <el-tooltip :content="content" effect="light" :placement="placement" :popper-class="`${popperClass} main-tooltip`">
    <slot></slot>
  </el-tooltip>
</template>
<script>
export default {
	name: 'tooltip',
	props: {
		// 内容
		content: {
			type: String,
			default: ''
		},
		// 位置
		placement: {
			type: String,
			default: 'bottom'
		},
		// 类名
		popperClass: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// visible: false
		}
	},
	computed: {
	},
	watch: {},
	created() {},
	methods: {
	}
}
</script>
<style lang="scss">
</style>