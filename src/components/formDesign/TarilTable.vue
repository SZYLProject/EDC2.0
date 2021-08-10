<!--
 * @Author: your name
 * @Date: 2021-03-03 18:25:42
 * @LastEditTime: 2021-05-06 20:16:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\formEntry\TarilDialogTable.vue
-->
<template>
  <div class="tarilTable">
    <ul v-infinite-scroll="listLoad" infinite-scroll-disabled="disabled" class="main-tarilList">
      <li v-for="(item,index) in trailList" :key="index" class="main-tarilList-item">
        <div>
          <p class="main-tarilListItem-name">
            <i class="iconfont iconguanliyuan"></i><span class="main-buttonSpace">{{ item.createBy }}</span>
          </p>
          <p><span>{{ item.createDate }}</span></p>
        </div>
        <div>
          <span>{{ formatterRemark(item) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { CodeToText } from 'element-china-area-data'
import { trailTip } from '@/assets/js/dictionary'
export default {
	props: {
		trailList: { // 列表项
			type: Array,
			default: () => {
				return []
			}
		},
		disabled: { // 禁止状态
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},
	methods: {
		// 列表再次加载
		listLoad() {
			this.$emit('listLoad')
		},
		// 格式化备注
		formatterRemark(item) {
			if (item.controlType === 'ADSEL') {
				let address = ''
				item.dataNew.split(',').map((e) => {
					address += `${CodeToText[e]} `
				})
				return trailTip[item.type] + '：' + item.prefix + address
			} else {
				return trailTip[item.type] + '：' + item.dataOld || '' + item.dataNew || ''
			}
		}
	}
}
</script>
