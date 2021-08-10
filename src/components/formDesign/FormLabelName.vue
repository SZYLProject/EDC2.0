<!--
 * @Author: your name
 * @Date: 2021-05-20 11:11:27
 * @LastEditTime: 2021-06-04 16:24:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\components\formDesign\FormLabelName.vue
-->
<template>
  <div class="main-form-label">
    {{ label }}
    <el-popover v-if="content" placement="top-start" title="填写指南" width="200" trigger="hover" :content="content">
      <span slot="reference" class="main-tooltip-info cursor"> ? </span>
    </el-popover>
  </div>
</template>
<script>
export default {
	props: {
		label: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		}
	}
}
</script>
