<!--
 * @Author: your name
 * @Date: 2021-06-11 17:00:02
 * @LastEditTime: 2021-06-15 11:15:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\utilsComponents\editor\index.vue
-->
<template>
  <div class="main-editor">
    <div id="toolbar-container" class="toolbar-container"></div>
  </div>
</template>
<script>
import Editor from 'wangeditor'
export default {
	name: 'Editor',
	props: {
	},
	data() {
		return {
			editor: null
		}
	},
	computed: {
	},
	watch: {
	},
	mounted() {
		this.editor = new Editor('#toolbar-container')
		this.editor.config.pasteIgnoreImg = true
		this.editor.config.menus = [
			'bold',
			'head',
			'italic',
			'fontSize',
			'fontName',
			'table',
			'splitLine',
			'indent',
			'lineHeight',
			'strikeThrough',
			'foreColor',
			'backColor',
			'underline',
			'undo',
			'redo'
		]
		this.editor.create()
	},
	methods: {
		getHtml() {
			return this.editor.txt.html()
		},
		getTxt() {
			return this.editor.txt.text()
		}
	}
}
</script>
