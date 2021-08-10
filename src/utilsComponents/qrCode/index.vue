<!--
 * @Author: your name
 * @Date: 2021-03-08 16:42:54
 * @LastEditTime: 2021-04-21 18:12:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utilsComponents\qrCode\index.vue
-->
<template>
  <div :id="id" :style="style"></div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
	name: 'QrCode',
	props: {
		width: {
			// 宽度
			type: Number,
			default: 200
		},
		height: {
			// 高度
			type: Number,
			default: 200
		},
		// domId
		id: {
			type: String,
			default: 'qrcode'
		},
		// 颜色
		colorDark: {
			type: String,
			default: '#000'
		},
		// 颜色
		colorLight: {
			type: String,
			default: '#fff'
		},
		// 二维码数据
		codeUrl: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			qrCode: null
		}
	},
	computed: {
		style() {
			return { width: `${this.width}px`, height: `${this.height}px` }
		}
	},
	watch: {
		codeUrl: {
			handler() {
				this.$nextTick(() => {
					this.setQrCode()
				})
			},
			immediate: true
		}
	},
	beforeDestroy() {},
	mounted() {
	},
	methods: {
		setQrCode() {
			const qr = document.getElementById(this.id)
			document.getElementById(this.id).innerHTML = ''
			this.qrCode = new QRCode(qr, {
				width: this.width,
				height: this.height,
				text: this.codeUrl,
				colorDark: this.colorDark,
				colorLight: this.colorLight
			})
		}
	}
}
</script>
<style lang='scss'>
</style>