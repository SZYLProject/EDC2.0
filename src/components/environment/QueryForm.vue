<!--
 * @Author: your name
 * @Date: 2021-04-07 10:40:01
 * @LastEditTime: 2021-05-11 16:39:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\environment\QueryDialog.vue
-->
<template>
  <div class="queryForm">
    <div class="queryForm-left">
      <div class="queryForm-title">
        <span>质疑列表</span><i class="main-primaryIcon-button main-buttonSpace iconfont iconxinjian float-right" @click="addQuery"></i>
      </div>
      <div class="queryForm-list">
        <div v-for="(item,index) in queryList" :key="item.id" class="queryForm-list-item" :class="{'active':index == currentIndex}" @click="selectQuery(item,index)">
          <i class="iconfont iconzhiyiguanli" :style="{color:getQueryColor(item.dataStatus)}"></i>
          <dhc-tooltip :content=" item.content">
            <span> {{ item.content }} </span>
          </dhc-tooltip>
        </div>
      </div>
    </div>
    <div class="queryForm-right">
      <div class="queryForm-form">
        <el-input v-model="message" type="textarea" :rows="4" :placeholder="queryMessagePlaceholder">
        </el-input>
      </div>
      <div class="queryForm-operate clearfix">
        <el-button type="primary" class="main-primary-button float-right main-buttonSpace" @click="sendQuery">
          {{ updateButtonTitle }}
        </el-button>
        <el-button v-if="isCloseButton&& queryList.length" v-authorizeRole="{'itemCode':'question_close',menuContainer:$authorContainer}" class="main-primary-button float-right " @click="closeQuery">
          关闭
        </el-button>
      </div>
      <div v-if="isQueryFlag" class="queryForm-infoList main-tarilList">
        <div v-for="item in queryList[currentIndex].list" :key="item.id" ref="scrollItem" class="main-tarilList-item">
          <div>
            <p class="main-tarilListItem-name">
              <i class="iconfont iconguanliyuan"></i><span class="main-buttonSpace">{{ item.creatName }}</span><span v-if="item.creatRole" class="main-buttonSpace">({{ item.creatRole }})</span>
            </p>
            <p><span>{{ item.creatTime }}</span></p>
          </div>
          <div>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryFlag } from '@/assets/js/dictionary.js'
export default {
	props: {
		queryList: { // 质疑列表
			type: Array,
			default: () => {
				return []
			}
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			isCloseButton: true, // 关闭状态
			message: '', // 质疑信息
			isAddQuery: true, // 是否添加新的状态
			queryFlag// 质疑字典
		}
	},
	computed: {
		isQueryFlag() {
			return this.queryList.length && this.isAddQuery
		},
		updateButtonTitle: function() { // 保存按钮标题
			return this.isQueryFlag ? '更新' : '提交'
		},
		queryMessagePlaceholder: function() { // 质疑表单Placeholder
			return this.isQueryFlag ? '回复质疑：' : '新增质疑：'
		}
	},
	watch: {
		'queryList.length': function(value, oldValue) {
			if (oldValue !== value) {
				this.$emit('setIndex', this.currentIndex)
			}
		}
	},
	methods: {
		scrollBottom() {
			this.isAddQuery = true
			this.message = ''
			this.$nextTick(() => {
				let timer = null
				if (!this.$refs.scrollWrap) {
					return
				}
				const maxH = this.$refs.scrollWrap.scrollHeight
				const clientH = this.$refs.scrollWrap.clientHeight
				let dy = 0
				let stap = 0
				if (maxH <= clientH) {
					dy = 0
				} else {
					dy = this.$refs.scrollItem[this.$refs.scrollItem.length - 2].clientHeight
				}
				timer = setInterval(() => {
					if (stap >= dy) {
						stap = dy
						clearInterval(timer)
					} else {
						stap += 14
					}
					this.$refs.scrollWrap.scrollTop += 14
				}, dy / 14)
				this.$once('hook:beforeDestroy', () => {
					clearInterval(timer)
				})
			})
		},
		// 选择质疑
		selectQuery(item, inex) {
			this.isCloseButton = true
			this.isAddQuery = true
			this.message = ''
			this.$emit('setIndex', inex)
		},
		// 添加质疑
		addQuery() {
			this.isCloseButton = false
			this.message = ''
			this.isAddQuery = false
		},
		// 清除质疑状态
		clearQueryMessage() {
			this.isAddQuery = true
			this.isCloseButton = true
			this.message = ''
			this.$emit('setIndex', 0)
		},
		// 关闭质疑
		closeQuery() {
			this.$emit('closeQuery', {
				...this.queryList[this.currentIndex]
			})
		},
		// 提交质疑
		sendQuery() {
			if (this.message.trim()) {
				if (this.isQueryFlag) {
					this.isCloseButton = true
					this.$emit('sendQuery', {
						item: {
							...this.queryList[this.currentIndex],
							content: this.message
						},
						callBack: this.scrollBottom,
						index: this.currentIndex
					})
				} else {
					this.$emit('updateQuery', {
						item: {
							content: this.message
						},
						callBack: this.clearQueryMessage,
						index: this.currentIndex
					})
				}
			} else {
				this.$message.error('请输入您要发送的内容')
			}
		},
		// 获取状态
		getQueryColor(stauts) {
			return this.$options.filters['filterListLabel'](stauts, queryFlag, 'value', 'color')
		}
	}
}
</script>
