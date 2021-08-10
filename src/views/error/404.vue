<!--
 * @Author: your name
 * @Date: 2021-04-20 11:22:28
 * @LastEditTime: 2021-04-20 11:48:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\views\error\505.vue
-->
<template>
  <div class="main-box error">
    <NavigationBar id="nav" :title="$webTitle" />
    <div class="main-container">
      <div class="main-errorBox error-404">
        <Empty>
          <template v-slot:label>
            找不到页面，请重试。
          </template>
          <template name="operate">
            <el-button
              type="primary"
              class="main-primary-button"
              @click="goBack()"
            >
              返回首页
            </el-button>
          </template>
        </Empty>
      </div>
    </div>
  </div>
</template>
<script>
import Empty from '@/components/Empty'
import NavigationBar from '@/components/nav/NavigationBar'
export default {
	components: {
		Empty,
		NavigationBar
	},
	data() {
		return {}
	},
	watch: {
		$route: {
			handler() {},
			deep: true,
			immediate: true
		}
	},
	mounted() {},
	methods: {
		goBack() {
			this.$router.push('/')
		}
	}
}
</script>
