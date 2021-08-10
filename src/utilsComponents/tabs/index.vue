<!--
 * @Author: your name
 * @Date: 2021-06-21 14:33:08
 * @LastEditTime: 2021-06-21 14:57:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\utilsComponents\tabs\index.vue
-->
<template>
  <div class="main-tabs" :class="{noborder:!isBorder}">
    <div class="main-tabs-header">
      <div v-for="item in list" :key="item[valueProp]" class="main-tabs-item" :class="{'active':item[valueProp]===activeTab}" @click="changeTab(item[valueProp])">
        <span>{{ item[labelProp] }}</span>
      </div>
      <div class="main-tabs-header-operate">
        <slot name="operate"></slot>
      </div>
    </div>
    <div class="main-tabs-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
	name: 'Tabs',
	props: {
		list: { // 列表
			type: Array,
			default: () => {
				return {}
			}
		},
		value: {
			type: [String, Number],
			default: ''
		},
		valueProp: { // 值变量
			type: String,
			default: 'value'
		},
		labelProp: { // 标签变量
			type: String,
			default: 'label'
		},
		isBorder: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			// visible: false
		}
	},
	computed: {
		activeTab: {
			get: function() {
				return this.value
			},
			set: function() {
				return
			}
		}
	},
	watch: {},
	created() {},
	methods: {
		changeTab(value) {
			this.$emit('input', value)
			this.$emit('tabClick', value)
		}
	}
}
</script>