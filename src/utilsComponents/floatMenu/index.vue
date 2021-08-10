<template>
  <div ref="page" :class="{ 'floatMenu': true, zIndexTop: moveFlags }">
    <div
      ref="floatMenuBox"
      class="floatMenuBox"
      :style="{
        transition: !moveFlags ? 'all 300ms ease' : 'unset',
        transform: `translate3d(${transform.left}px,${transform.top}px,0)`,
      }"
      @mousedown.stop.prevent="moveStart"
      @mouseover.stop.prevent="showButton"
    >
      <slot></slot>
      <!-- <img class="icon" src="../assets/float-icon.png" /> -->
    </div>
  </div>
</template>
<script>
export default {
	name: 'floatMenu',
	props: {
		form: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			moveFlags: false,
			clickFlag: false,
			hoverFlag: false,
			// 初始的位置记录
			movePosition: { x: 0, y: 0 },
			nx: '',
			ny: '',
			dx: '',
			dy: '',
			xPum: '',
			yPum: '',
			popoverShow: false,
			// 浮窗的位置
			transform: {
				top: document.body.offsetHeight - 400,
				left: document.body.offsetWidth - 100
			},
			lastMoveIndex: 0, //  拖拽计数
			curMoveIndex: 0, //  历史计数
			menuPosition: {
				top: 0,
				left: 0
			}
		}
	},
	created() {
		document.addEventListener('mouseup', (e) => {
			if (
				e.clientY > window.innerHeight ||
        e.clientY < 60 ||
        e.clientX < 0 ||
        e.clientX > window.innerWidth
			) {
				this.moveEnd()
			}
		})
	},
	mounted() {
		window.addEventListener('resize', () => {
			this.$set(this.transform, 'top', document.body.offsetHeight - 300)
			this.$set(this.transform, 'left', document.body.offsetWidth - 100)
		})
		const floatMenuBox = this.$refs.floatMenuBox
		document.addEventListener('click', (event) => {
			if (!floatMenuBox) return
			var tDom = event.target
			if (floatMenuBox !== tDom && !floatMenuBox.contains(tDom)) {
				this.closeMenuAndFloating()
			}
		})
	},
	methods: {
		closeMenuAndFloating() {
			this.popoverShow = false
			this.hoverFlag = false
			this.moveFlags = false
			this.resetfloatMenuBoxLocation()
		},
		hideButton() {
			if (this.popoverShow) return
			this.hoverFlag = false
			// 移动过程中不复位 按钮；
			if (this.moveFlags) return
			this.resetfloatMenuBoxLocation()
		},
		showButton() {
			if (this.moveFlags) return (this.hoverFlag = false)
			this.hoverFlag = true
			const { left, top } = this.transform
			if (left > 0 && left < -100) return
			const bodyWidth = document.body.clientWidth
			this.generateTransform({ top: top, left: bodyWidth - 100 })
		},
		moveStart(e) {
			if (event.button === 2) return
			if (this.popoverShow) {
				this.moveFlags = false
				return
			}
			this.clickFlag = true
			const floatMenuBox = this.$refs.floatMenuBox // 获取目标元素
			this.movePosition.x = e.clientX
			this.movePosition.y = e.clientY
			// 计算鼠标相对元素的位置
			const { left, top } = this.transform
			this.dx = e.clientX - left
			this.dy = e.clientY - top
			this.moveFlags = true
			document.onmousemove = async(e) => {
				this.clickFlag = false
				this.moveFlags = true
				console.log('onmousemove')
				const bodyWidth = document.body.clientWidth
				const bodyHeight = document.body.clientHeight
				const moveMaxHeight = bodyHeight - 30
				const moveMaxWidth = bodyWidth - floatMenuBox.offsetWidth / 2 + this.dx
				this.nx = e.clientX
				this.ny = e.clientY
				this.xPum = (this.nx > moveMaxWidth ? moveMaxWidth : this.nx) - this.dx
				this.yPum =
          (this.ny > moveMaxHeight ? moveMaxHeight : this.ny) - this.dy
				await this.$nextTick()
				this.lastMoveIndex++
				this.generateTransform({
					left: this.xPum > -100 ? this.xPum : -100,
					top: this.yPum > 0 ? this.yPum : 0
				})
			}
			document.onmouseup = () => {
				document.onmousemove = null
				document.onmouseup = null
				this.moveEnd()
			}
		},
		generateTransform({ top, left }) {
			const floatMenuBox = this.$refs.floatMenuBox // 获取目标元素
			if (!floatMenuBox) return
			this.$set(this.transform, 'left', left)
			this.$set(this.transform, 'top', top)
		},
		resetfloatMenuBoxLocation() {
			const floatMenuBox = this.$refs.floatMenuBox // 获取目标元素
			if (!floatMenuBox) return
			const { top } = this.transform
			this.generateTransform({ top, right: -40 })
		},
		moveEnd() {
			this.moveFlags = false
			if (this.hoverFlag) return
			document.onmousemove = null
			this.resetfloatMenuBoxLocation()
		}
	}
}
</script>
