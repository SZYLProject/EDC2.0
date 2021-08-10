import { regionDataPlus } from 'element-china-area-data'
class Global {
	/**
	 * @desc 补零
	 * @param num 要的数
	 * @param n 保留几位
	 */
	addZero(num, n) {
		return (Array(n).join(0) + num).slice(-n)
	}
	/**
	 * @method        数组项某一字段存在相同值
	 * @param arr    数组
	 * @param index 需要检查字段
	 */
	arrayRepeat(arr, index) {
		if (!this.isArrayFn(arr)) return
		var hash = {}
		for (var i in arr) {
			if (hash[arr[i][index]]) {
				return true
			}
			hash[arr[i][index]] = true
		}
		return false
	}
	/**
	 * @method    纯数组排序
	 * @param array 数组
	 * @param type  1,max ,2,min
	 */
	arraySort(array, type) {
		type = type || 1
		if (this.isArrayFn(array)) {
			const arr = this.deepClone(array)
			arr.sort(function(x, y) {
				return type === 1 ? y - x : x - y
			})
			return arr
		} else {
			return []
		}
	}
	/**
 * @desc 回到顶部
 */
	backtop(dom, step = 5) {
		if (!dom) return
		const timer = setInterval(() => {
			const scrollTop = dom.scrollTop || dom.scrollTop
			const ispeed = Math.floor(-scrollTop / step)
			dom.scrollTop = scrollTop + ispeed
			scrollTop === 0 && clearInterval(timer)
		}, 30)
	}
	/**
	 * @desc 清除定时器
	 * @param time 定时器
	 * @param type  1 timeout  2 timeIntever
	 */
	clearTime(time, type) {
		type === 1 ? clearTimeout(time) : clearInterval(time)
		time = null
	}
	/**
	 * @desc 对象反序
	 * @param object 对象
	 */
	changeObjectKey(object) {
		const newObject = {}
		if (this.isObject(object)) {
			for (const key in object) {
				newObject[object[key]] = key
			}
		}
		return newObject
	}
	/**
	 * @method        深度拷贝
	 * @param obj    对象
	 */
	deepClone(obj) {
		var objClone = Array.isArray(obj) ? [] : {}
		if (obj && typeof obj === 'object' && obj != null) {
			for (var key in obj) { //  循环对象类型的obj
				if (this.judgeKey(obj, key)) {
					if (obj[key] && typeof obj[key] === 'object') {
						objClone[key] = this.deepClone(obj[key])
					} else { //  否则就是浅复制
						objClone[key] = obj[key]
					}
				}
			}
		}
		return objClone
	}
	/**
 * @desc 通过a标签下载
 */
	downloadFile(res, fileName) {
		if (!res) {
			return
		}
		if (window.navigator.msSaveBlob) { // IE以及IE内核的浏览器
			try {
				window.navigator.msSaveBlob(res, fileName)
				// window.navigator.msSaveOrOpenBlob(res, fileName);  //此方法类似上面的方法，区别可自行百度
			} catch (e) {
				console.log(e)
			}
		} else {
			const url = window.URL.createObjectURL(new Blob([res]))
			const link = document.createElement('a')
			link.style.display = 'none'
			link.href = url
			link.setAttribute('download', fileName)// 文件名
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link) // 下载完成移除元素
			window.URL.revokeObjectURL(url) // 释放掉blob对象
		}
	}
	/**
     * 文档下载（通过文档请求，直接下载文档）
     * url 请求路径
     * fileName 下载名称
     * size 文件大小
     */
	loadDown(url, fileName, size) {
		var _this = this
		var xhr = new XMLHttpRequest()
		xhr.open('GET', url, true) // 也可以使用POST方式，根据接口
		xhr.responseType = 'blob'
		xhr.onprogress = function(event) {
			// 用于监听下载进度，需要知道文件大小
			console.log(event.loaded)
			if (event.loaded === size) {
				_this.downloadLoading = false
			}
		}
		xhr.onload = function() {
			if (this.status === 200) {
				var content = this.response
				var aTag = document.createElement('a')
				var blob = new Blob([content])
				aTag.download = fileName
				aTag.href = URL.createObjectURL(blob)
				aTag.click()
				URL.revokeObjectURL(blob)
			}
		}
		xhr.send()
	}
	/**
	 * @desc 函数防抖
	 * @param func 目标函数
	 * @param wait 延迟执行毫秒数
	 * @param immediate true - 立即执行， false - 延迟执行
	 */
	debounce(func, wait, immediate) {
		let timer
		return function() {
			const context = this
			const args = arguments
			if (timer) clearTimeout(timer)
			if (immediate) {
				const callNow = !timer
				timer = setTimeout(() => {
					timer = null
				}, wait)
				if (callNow) func.apply(context, args)
			} else {
				timer = setTimeout(() => {
					func.apply
				}, wait)
			}
		}
	}
	/**
 * @desc 字符串操作符
 */
	eval(value) {
		var Fn = Function
		return new Fn('return ' + value)()
	}
	/**
		 * @desc 检测flash
		 */
	flashChecker() {
		let hasFlash = false // 是否安装了flash
		if (document.all) {
			const swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
			if (swf) {
				hasFlash = true
			}
		} else {
			if (navigator.plugins && navigator.plugins.length > 0) {
				const swf = navigator.plugins['Shockwave Flash']
				if (swf) {
					hasFlash = true
				}
			}
		}
		return hasFlash
	}
	/**
	 * @desc 格式化默认值
	 */
	formatterDefaultValue(item, flag) {
		const info = this.isJSON(item.value) ? JSON.parse(item.value) : item.value || ''
		if (this.isArrayFn(info)) {
			if (flag) {
				return item.controlType === 'CB' || item.controlType === 'ADSEL' ? info || [] : info || ''
			} else {
				return item.controlType === 'CB' || item.controlType === 'ADSEL' ? info[0] || [] : info[0] || ''
			}
		} else {
			return item.controlType === 'CB' || item.controlType === 'ADSEL' ? [] : info || ''
		}
	}
	/**
	 * @desc 格式化表格默认值
	 */
	formatterTableDefaultValue(item, index = 0) {
		const info = this.isJSON(item.value) ? JSON.parse(item.value) : item.value || ''
		let defaultValue = null
		if (this.isArrayFn(info)) {
			if (item.controlType === 'CB' || item.controlType === 'ADSEL') {
				defaultValue = (info || [])
			} else {
				defaultValue = info || ''
			}
		} else {
			defaultValue = item.controlType === 'CB' || item.controlType === 'ADSEL' ? [] : info || ''
		}
		if (item.controlType === 'CB' || item.controlType === 'SEL_SIG' || item.controlType === 'RB' || item.controlType === 'ADSEL') {
			const defaultList = []
			if (item.controlType === 'ADSEL') {
				this.sloveRegionData(defaultValue, 0, defaultList, regionDataPlus)
			} else if (item.controlType === 'SEL_SIG') {
				const info = item.itemOptionList.find(optionItem => {
					return optionItem.displayValue === defaultValue
				})
				return info.displayName || defaultValue
			} else {
				defaultValue.forEach(defaultItem => {
					const info = item.itemOptionList.find(optionItem => {
						return optionItem.optionItemValue === defaultItem
					})
					if (info) defaultList.push(info.optionItemName)
				})
			}
			return defaultList.join(',')
		}
		return defaultValue
	}
	sloveRegionData(defaultValue, index, defaultList, regionData) {
		for (let i = index; i < defaultValue.length; i++) {
			const info = this.setRegionData(regionData, defaultValue[i])
			if (info && info.label && index === 0) {
				defaultList.push(info.label)
				if (info && info.children && info.label) {
					this.sloveRegionData(defaultValue, index++, defaultList, info.children)
				}
			}
		}
	}
	setRegionData(optionList, defaultItem) {
		for (let i = 0; i < optionList.length; i++) {
			if (optionList[i].value === defaultItem) {
				return { label: optionList[i].label, children: optionList[i].children }
			}
		}
	}
	/**
	 * @method        获取图片尺寸
	 * @param url    图片地址
	 * @param callback 回调函数
	 */
	getImageSize(url, callback) {
		var img = new Image()
		img.src = url
		// 如果图片被缓存，则直接返回缓存数据
		if (img.complete) {
			callback(img.width, img.height, true)
		} else {
			img.onload = function() {
				callback(img.width, img.height, true)
			}
			img.onerror = function() {
				callback(img.width, img.height, false)
			}
		}
	}
	/**
	 * @method    判断浏览器
	 */
	getOs() {
		if (navigator.userAgent.indexOf('MSIE 8.0') > 0) {
			return 'MSIE8'
		} else if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
			return 'MSIE6'
		} else if (navigator.userAgent.indexOf('MSIE 7.0') > 0) {
			return 'MSIE7'
		} else if (isFirefox === navigator.userAgent.indexOf('Firefox') > 0) {
			return 'Firefox'
		}
		if (navigator.userAgent.indexOf('Chrome') > 0) {
			return 'Chrome'
		} else {
			return 'Other'
		}
	}
	/**
	 * @method    得到数组最值
	 * @param array 数组
	 * @param index  需要获取得数组
	 * @param type  1,max ,2,min
	 */
	getMaxIndexNum(array, index, type) {
		type = type || 1
		if (this.isArrayFn(array)) {
			const list = array.map(item => { return item[index] })
			const num = type === 1 ? this.getMaxNum(list) : this.getMinNum(list)
			return num
		} else {
			return 0
		}
	}
	/**
		 * @method    得到数组最大值
		 * @param array 数组
		 */
	getMaxNum(array) {
		if (this.isArrayFn(array)) {
			const max = Math.max.apply(null, array)
			return max
		} else {
			return 0
		}
	}
	/**
		 * @method    得到数组最小值
		 * @param array 数组
		 */
	getMinNum(array) {
		if (this.isArrayFn(array)) {
			const min = Math.min.apply(null, array)
			return min
		} else {
			return 0
		}
	}
	/**
		 * @method    填充指定值的数组
		 * @param length 长度
		 * @param num  指定数
		 */
	getArray(length, num) {
		const list = []
		for (let i = 0; i < length; i++) {
			list.push(num)
		}
		return list
	}
	/**
		 * @desc 获取指定index的数组
		 */
	getIndexList(list, index) {
		if (!this.isArrayFn(list)) return []
		const array = list.map(item => {
			return item[index]
		})
		return array
	}
	/**
			 * @desc 得到indexArray
			 */
	getIndexArray(list, key = 'seq') {
		if (this.isArrayFn(list)) {
			const infoList = this.deepClone(list)
			return infoList.map((item, index) => {
				item[key] = index
				return item
			})
		} else {
			return []
		}
	}
	/**
		 * @method          返回rgb
		 * @param r    数字
		 * @param g    数字
		 * @param b    数字
		 */
	getRGB(R, G, B) {
		return `RGB(${R},${G},${B})`
	}
	/**
		 * @method          获取视口尺寸
		 */
	getViewportOffset() {
		if (window.innerWidth) {
			return {
				w: window.innerWidth,
				h: window.innerHeight
			}
		} else {
			// ie8及其以下
			if (document.compatMode === 'BackCompat') {
				// 怪异模式
				return {
					w: document.body.clientWidth,
					h: document.body.clientHeight
				}
			} else {
				// 标准模式
				return {
					w: document.documentElement.clientWidth,
					h: document.documentElement.clientHeight
				}
			}
		}
	}
	/**
	 * @method    是否是操作符
	 * @param value 任意类型值
	 */
	isOper(value) {
		return ['+', '-', '*', '/'].indexOf(value) >= 0
	}
	/**
	 * @method    判断是否是JSON
	 * @param value 任意类型值
	 */
	isJSON(value) {
		if (this.isString(value)) {
			try {
				var obj = JSON.parse(value)
				if (typeof obj === 'object' && obj) {
					return true
				} else {
					return false
				}
			} catch (error) {
				return false
			}
		}
	}
	/**
	 * @method    判断是否是数组
	 * @param value 任意类型值
	 */
	isArrayFn(value) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(value)
		} else {
			return Object.prototype.toString.call(value) === '[object Array]'
		}
	}
	/**
		 * @method    判断是否是字符串
		 * @param value 任意类型值
		 */
	isString(value) {
		return (typeof value === 'string') && value.constructor === String
	}
	/**
		 * @method    判断是否是code
		 * @param value 任意类型值
		 */
	isSingleCode(value) {
		return /[a-z0-9]{16}$/.test(value)
	}
	/**
		 * @method    判断是否是undefined
		 * @param value 任意类型值
		 */
	isUndefind(value) {
		return typeof (value) === 'undefined'
	}
	/**
		 * @method    判断是否是数字
		 * @param value 任意类型值
		 */
	isNumebr(value) {
		return typeof value === 'number' && !isNaN(value)
	}
	/**
		 * @method    判断是否是对象
		 * @param value 任意类型值
		 */
	isObject(value) {
		return (typeof value === 'object') && value.constructor === Object
	}
	/**
		 * @method    判断是否为空
		 * @param value 任意类型值
		 */
	isEmpty(value) {
		if (value == null) return true
		if (value.length > 0) return false
		if (value.length === 0) return true
		if (!Object.keys(value).length) return true
		for (const key in value) {
			if (hasOwnProperty.call(value, key)) return false
		}
		return true
	}
	/**
		 * @method    判断是否为null
		 * @param value 任意类型值
		 */
	isNull(value) {
		return value === null || typeof (value) === 'undefined'
	}
	/**
		 * @method    判断是否为数字
		 * @param value 任意类型值
		 */
	isNum(value) {
		return /^(-)?\d+(\.\d+)?$/.test(value)
	}
	/**
		 * @method    判断是否为时间
		 * @param value 任意类型值
		 */
	isTime(value) {
		return new RegExp(/^(?:\d{2}):\d{2}$/).test(value)
	}
	/**
		 * @method    判断是否为日期
		 * @param value 任意类型值
		 */
	isDate(value) {
		return new RegExp(/\b(\d{4})\/(\d{2})\/(\d{2})\b/).test(value)
	}
	/**
		 * @method    判断是日期时间
		 * @param value 任意类型值
		 */
	isDatetime(value) {
		return new RegExp(
			/\b(\d{4})-(\d{2})-(\d{2})\b (?:\d{2}):\d{2}:\d{2}$/
		).test(value)
	}
	/**
		 * @method    判断是item
		 * @param value 任意类型值
		 */
	isSingleitemCode(value) {
		return /[a-z0-9]{16}$/.test(value)
	}
	/**
		 * @method    判断是图片
		 * @param fileName 任意类型值
		 */
	isImage(fileName) {
		if (typeof fileName !== 'string') return
		const name = fileName.toLowerCase()
		return name.endsWith('.png') || name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.bmp')
	}
	/**
	 * @desc 判断对象是否存在key
	 */
	judgeKey(obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key)
	}
	/**
	 * @method        监听远程图片
	 * @param url    图片地址
	 * @param callback 回调函数
	 */
	listenImg(url, callback) {
		var img = new Image()
		img.src = url
		img.onload = function() {
			callback(true)
		}
		img.onerror = function() {
			callback(false)
		}
	}
	/**
	 * @desc 页码切换获取指定数组
	 * @param pageSize 每页数量
	 * @param currentPage 当前页
	 * @param array   数组
	 */
	pageArray(pageSize, currentPage, array) {
		if (!this.isArrayFn(array)) return []
		const list = this.deepClone(array)
		const current = list.splice(
			(currentPage - 1) * pageSize,
			pageSize
		)
		return current
	}
	/**
		 * @method          得到范围之内随机数
		 * @param m    初始值
		 * @param n    结束值
		 */
	randomRange(m, n) {
		var num = Math.floor(Math.random() * (m - n) + n)
		return num
	}
	/**
		 * @desc 去除前后空格
		 * @param type 1,全部 2 左右 3左 4右
		 */
	replaceTrim(str, type) {
		if (this.isString(str)) {
			switch (type) {
			case 1:
				return str.replace(/\s+/g, '')
			case 2:
				return str.replace(/^\s+|\s+$/g, '')
			case 3:
				return str.replace(/^\s/, '')
			case 4:
				return str.replace(/(\s$)/g, '')
			default:
				return str.replace(/^\s+|\s+$/g, '')
			}
		} else {
			return str
		}
	}
	/**
		 * @desc 切割指定字符串
		 * @param str 指定字符串
		 * @param flag 分隔符
		 */
	splitStr(str, flag) {
		if (this.isString(str)) {
			const stringArray = str.split(flag)
			return stringArray
		} else {
			return ['', '']
		}
	}
	/**
	 * @method    去除字符串两端的空白字符（或者只有左边、右边、全部）
	 * @param str 字符串
	 * @param type 去除方向
	 */
	trimSting(str, type = 'both') {
		switch (type) {
		case 'both':
			return str.replace(/(^\s*)|(\s*$)/g, '')
		case 'left':
			return str.replace(/(^\s*)/g, '')
		case 'right':
			return str.replace(/(\s*$)/g, '')
		case 'all':
			return str.replace(/\s+/g, '')
		}
	}
	/**
		 * @desc 函数节流
		 * @param func 函数
		 * @param wait 延迟执行毫秒数
		 * @param type 1 表时间戳版，2 表定时器版
		 */
	throttle(func, wait, type) {
		let timeout
		let previous = 0
		return function() {
			const context = this
			const args = arguments
			if (type === 1) {
				const now = Date.now()
				if (now - previous > wait) {
					func.apply(context, args)
					previous = now
				}
			} else if (type === 2) {
				if (!timeout) {
					timeout = setTimeout(() => {
						timeout = null
						func.apply(context, args)
					}, wait)
				}
			}
		}
	}
}
const global = new Global()
export {
	global
}
