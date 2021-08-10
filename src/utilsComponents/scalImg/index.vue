<!--
 * @Author: your name
 * @Date: 2021-06-11 09:44:39
 * @LastEditTime: 2021-06-23 15:29:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\utilsComponents\scalImg\index.vue
-->
<!-- 伸缩图片 -->
<template>
  <div class="main-scalimg">
    <div
      v-show="imgFlag && imgUrl"
      ref="img_box"
      class="main-scalimg-box"
      @mousedown="mousedown"
      @mousewheel="fnWheel"
    >
      <img id="img" ref="img" :src="imgUrl" :alt="alt" />
    </div>
    <div v-show="!imgFlag || !imgUrl" class="main-scalimg-errorbox">
      <i class="main-scalimg-erroricon el-icon-picture-outline"></i>
    </div>
    <div v-if="imgFlag && imgUrl && operateFlag" class="main-scalimg-operate">
      <i class="el-icon-zoom-in" @click.stop="wacthImg"></i>
    </div>
    <DhcDialogImg v-model="isDialogImg" :imgUrl="imgUrl" :appendBody="true"></DhcDialogImg>
  </div>
</template>
<script>
export default {
	name: 'ScalImg',
	components: {},
	props: {
		scalFlag: { // 缩放状态
			type: Boolean,
			default: true
		},
		imgUrl: { // 图片地址
			type: String,
			default: ''
		},
		alt: {
			type: String,
			default: ''
		},
		listenFlag: { // 监听状态
			type: Boolean,
			default: true
		},
		operateFlag: { // 操作状态
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isDialogImg: false, // 图片弹窗
			imgFlag: true, // 图片显示状态
			scaleSize: 1, // 缩放尺寸
			moveX: 0, // x方向移动
			moveY: 0, // y方向移动
			moveLeft: 0, // 移动图片当前left
			moveTop: 0, // 移动图片当前top
			dragFlag: false // 是否移动状态
		}
	},
	computed: {
		getUrl() {
			return this.imgUrl
		}
	},
	watch: {
		imgUrl: {
			handler(value) {
				this.listenImg(value)
			},
			immediate: true
		}
	},
	mounted() {
		this.documentEvent()
		window.onresize = () => {
			this.initImg()
		}
	},
	destroyed() {
		window.onresize = null
	},
	methods: {
		// 查看图片
		wacthImg() {
			this.isDialogImg = true
			console.log(1231231323223)
		},
		// 监听图片
		listenImg(url) {
			if (this.listenFlag) {
				this.$utils.listenImg(url, (flag) => {
					this.imgFlag = flag
					if (this.imgFlag) {
						this.initImg()
					}
				})
			}
		},
		// 初始化img
		initImg() {
			this.$nextTick(() => {
				const imgBoxWidth = this.$refs.img_box.offsetWidth
				const imgBoxHeight = this.$refs.img_box.offsetHeight
				this.$refs.img.style.width = imgBoxWidth + 'px'
				this.$refs.img.style.height = imgBoxHeight + 'px'
				this.$refs.img.style.top = 0 + 'px'
				this.$refs.img.style.left = 0 + 'px'
			})
		},
		// documnet事件
		documentEvent() {
			document.onmousemove = (event) => {
				const e = event || window.event
				if (this.dragFlag && this.imgFlag) {
					const imgBoxWidth = this.$refs.img_box.offsetWidth
					const imgBoxHeight = this.$refs.img_box.offsetHeight
					const maxX = (this.scaleSize - 1) * imgBoxWidth
					const maxY = (this.scaleSize - 1) * imgBoxHeight
					const disX = e.clientX - this.moveX
					const disY = e.clientY - this.moveY
					let left = this.moveLeft + disX
					let top = this.moveTop + disY
					left = Math.abs(left) > Math.abs(maxX) ? (maxX * left) / Math.abs(left) : left
					left = left > 0 ? 0 : left
					top =
            Math.abs(top) > Math.abs(maxY) ? (maxY * top) / Math.abs(top) : top
					top = top > 0 ? 0 : top
					this.$refs.img.style.left = left + 'px'
					this.$refs.img.style.top = top + 'px'
					this.$emit('getScaleInfo',	this.scaleSize,	this.moveX, this.moveY, left, top)
					if (e.preventDefault) {
						e.preventDefault()
					}
					return false
				}
			}
			document.onmouseup = (event) => {
				this.dragFlag = false
				if (this.imgFlag) {
					this.moveLeft = parseInt(this.getCss(this.$refs.img, 'left'))
					this.moveTop = parseInt(this.getCss(this.$refs.img, 'top'))
				}
			}
		},
		// 获取css
		getCss(target, key) {
			if (!target) return null
			return target.currentStyle
				? target.currentStyle[key]
				: document.defaultView.getComputedStyle(target, false)[key]
		},
		// 移动
		mousedown(event) {
			if (this.imgFlag && this.scalFlag) {
				this.dragFlag = true
				this.moveX = event.clientX
				this.moveY = event.clientY
			}
		},
		// 滚动图片
		fnWheel(event) {
			if (this.imgFlag && this.scalFlag) {
				const flag = event.wheelDelta > 0
				if (!flag && this.scaleSize === 1) return
				if (flag && this.scaleSize >= 5) return
				const imgBoxWidth = this.$refs.img_box.offsetWidth
				const imgBoxHeight = this.$refs.img_box.offsetHeight
				// const imgWidth = this.$refs.img.offsetWidth
				// const imgHeight = this.$refs.img.offsetHeight
				let disX = event.pageX
				let disY = event.pageY
				const boxPosition = this.getOffset(this.$refs.img_box)
				disX = disX - boxPosition.left
				disY = disY - boxPosition.top
				const baseScale = event.wheelDelta / 1200
				let oldScale = this.scaleSize
				oldScale += baseScale
				oldScale = oldScale < 1 ? 1 : oldScale > 5 ? 5 : oldScale
				this.moveLeft =
          this.moveLeft -
          ((disX - this.moveLeft) * (oldScale - this.scaleSize)) /
            this.scaleSize
				this.moveTop =
          this.moveTop -
          ((disY - this.moveTop) * (oldScale - this.scaleSize)) /
            this.scaleSize
				this.scaleSize = oldScale
				let width = imgBoxWidth * this.scaleSize
				let height = imgBoxHeight * this.scaleSize
				width = imgBoxWidth > width ? imgBoxWidth : width
				height = imgBoxHeight > height ? imgBoxHeight : height
				const maxX = (this.scaleSize - 1) * imgBoxWidth
				const maxY = (this.scaleSize - 1) * imgBoxHeight
				// 以每个点的x、y位置，计算其相对于图片的位置，再计算其相对放大后的图片的位置
				if (width === imgBoxWidth) this.moveLeft = 0
				if (height === imgBoxHeight) this.moveTop = 0
				this.moveLeft = Math.abs(this.moveLeft) > Math.abs(maxX) ? (maxX * this.moveLeft) / Math.abs(this.moveLeft) : this.moveLeft
				this.moveLeft = this.moveLeft > 0 ? 0 : this.moveLeft
				this.moveTop = Math.abs(this.moveTop) > Math.abs(maxY) ? (maxY * this.moveTop) / Math.abs(this.moveTop)	: this.moveTop
				this.moveTop = this.moveTop > 0 ? 0 : this.moveTop
				this.$refs.img.style.width = width + 'px'
				this.$refs.img.style.height = height + 'px'
				this.$refs.img.style.top = this.moveTop + 'px'
				this.$refs.img.style.left = this.moveLeft + 'px'
				this.$emit('getScaleInfo',	this.scaleSize,	this.moveX, this.moveY,	this.moveLeft, this.moveTop)
			}
		},
		getOffset(target) {
			var left = 0
			var top = 0
			while (target != null && target !== document.body) {
				top += target.offsetTop
				left += target.offsetLeft
				target = target.offsetParent
			}
			return { left, top }
		}
		// 缩放
		// fnWheel(event) {
		//    if (this.imgFlag && this.scalFlag) {
		//       const flag = event.wheelDelta > 0
		//       if (!flag && this.scaleSize === 1) return
		//       if (flag && this.scaleSize >= 5) return
		//       this.scaleSize += event.wheelDelta / 1200
		//       this.scaleSize = this.scaleSize < 1 ? 1 : (this.scaleSize > 5 ? 5 : this.scaleSize)
		//       this.$refs.img.style.transform = 'scale(' + this.scaleSize + ')'
		//    }
		// }
	}
}
</script>
<style lang='scss' scoped>
</style>