<!--
 * @Author: your name
 * @Date: 2021-03-08 16:58:05
 * @LastEditTime: 2021-07-26 11:53:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\dialog\index.vue
-->
<template>
  <el-dialog
    v-if="isVisable"
    :title="title"
    :visible.sync="isVisable"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
    :top="top"
    :append-to-body="appendBody"
    :custom-class="`${customClass} main-dialog`"
    @open="open"
  >
    <div slot="title" class="main-dialog-title">
      <i class="iconfont" :class="[iconfontType,iconfont]"></i> <span>{{ title }}</span>
    </div>
    <slot></slot>
    <span v-show="isCancelButton&&isSureButton" class="main-dialog-footer">
      <el-button v-if="isCancelButton" class="main-dialog-cancelButton" @click="cancel">{{
        cancelButtonTitle
      }}</el-button>
      <el-button
        v-if="isSureButton"
        class="main-dialog-sureButton"
        type="primary"
        @click="sure"
      >{{ sureButtonTitle }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
	name: 'Dialog',
	props: {
		// 弹窗标题
		title: {
			type: String,
			default: '弹窗'
		},
		// 弹窗宽度
		width: {
			type: String,
			default: ''
		},
		top: {
			type: String,
			default: '15vh'
		},
		// 弹窗状态
		value: {
			type: Boolean,
			default: false
		},
		// 确定按钮标题
		sureButtonTitle: {
			type: String,
			default: '确定'
		},
		// 确认按纽显示状态
		isSureButton: {
			type: Boolean,
			default: true
		},
		// 取消按钮标题
		cancelButtonTitle: {
			type: String,
			default: '取消'
		},
		// 取消按纽显示状态
		isCancelButton: {
			type: Boolean,
			default: true
		},
		// 类名
		customClass: {
			type: String,
			default: ''
		},
		// 图标
		iconfont: {
			type: String,
			default: 'iconxinjian'
		},
		// 图标类型
		iconfontType: {
			type: String,
			default: 'add'
		},
		appendBody: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// isVisable: false
		}
	},
	computed: {
		isVisable: {
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
		sure() {
			this.$emit('sure', true)
		},
		open() {
			this.$emit('open', true)
		},
		cancel() {
			this.$emit('input', false)
			this.$emit('close', false)
		},
		close(done) {
			this.$emit('input', false)
			this.$emit('close', false)
			done()
		}
	}
}
</script>
<style lang="scss">
</style>
