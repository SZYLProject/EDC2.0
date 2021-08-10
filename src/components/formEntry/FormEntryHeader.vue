<!--
 * @Author: your name
 * @Date: 2021-03-22 09:14:20
 * @LastEditTime: 2021-05-06 16:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\formDesign\formHeader.vue
-->
<template>
  <div class="formHeader">
    <div v-for="(item,index) in headerTable" :key="index" class="formHeader-item" :style="{width:100 /headerTable.length+'%'}">
      <div class="formHeader-item-iconfont">
        <i :class="item.iconFont" class="iconfont" :style="{color:item.color}"></i>
      </div>
      <div class="formHeader-item-word">
        <div class="formHeader-item-title">
          {{ item.label }}
        </div>
        <div class="formHeader-item-info word-break">
          {{ headerTableInfo[index] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	components: {},
	props: {
		headerTableInfo: { // 头部信息
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			//  ['项目名称', '中心名称', '受试者编号', '访视名称']
			headerTable: [{ iconFont: 'iconxiangmu', label: '项目名称', color: '#fc7a58' },
				{ iconFont: 'iconzhongxin', label: '中心名称', color: '#4ccca1' },
				{ iconFont: 'iconshoushizhe', label: '受试者编号', color: '#F8BF32' },
				{ iconFont: 'iconziyuan', label: '访视名称', color: '#49a4ff' }]
		}
	},
	watch: {},
	mounted() {},
	methods: {
	}
}
</script>
