/*
 * @Author: your name
 * @Date: 2021-05-08 09:39:33
 * @LastEditTime: 2021-05-28 10:23:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\utils\formCompute.js
 */
import dayjs from 'dayjs'
import { calculateDateUnitType, allowDecimalType, calculateControlList } from '@/assets/js/dictionary'
import { global } from './global'
class FormCalculate {
	constructor() {
		this.selCalculateDDTypeArr = ['RB', 'CB', 'SEL_SIG']
	}
	// 将时分秒转为时间戳
	calculateSecond(time) {
		if (time !== null) {
			const hour = Number(time.split(':')[0])
			const min = Number(time.split(':')[1])
			const second = Number(time.split(':')[2])
			return Number(hour * 3600) + Number(min * 60) + Number(second)
		}
		return 0
	}
	// 设置条件
	setCondition(valueItem, list) {
		const itemCode = valueItem.itemCode
		const itemValue = global.isArrayFn(valueItem.value) ? JSON.stringify(valueItem.value) : valueItem.value
		list.forEach(item => {
			if (itemValue && item.conditionExpression && item.conditionType) {
				if (item.conditionType === '[]') {
					const exprossionArr = item.conditionExpression.split('<=')
					const exprossionCodeArr = exprossionArr[1].split('&&')
					exprossionArr[0]
					if (exprossionCodeArr[0] === itemCode) {
						const exprossionArrList = item.conditionExpression.split('&&')
						const exprossion = exprossionArrList.map((exprossionArrItem) => {
							if (valueItem.controlType === 'DP' || valueItem.controlType === 'TP' || valueItem.controlType === 'DTP') {
								exprossionArrItem = exprossionArrItem.replace(exprossionCodeArr[0], valueItem.controlType === 'TP' ? this.calculateSecond(itemValue) : new Date(itemValue).getTime())
								exprossionArrItem = exprossionArrItem.replace(exprossionArr[0], valueItem.controlType === 'TP' ? this.calculateSecond(exprossionArr[0]) : new Date(exprossionArr[0]).getTime())
								exprossionArrItem = exprossionArrItem.replace(exprossionArr[2], valueItem.controlType === 'TP' ? this.calculateSecond(exprossionArr[2]) : new Date(exprossionArr[2]).getTime())
								return exprossionArrItem
							} else {
								return exprossionArrItem.replace(exprossionCodeArr[0], itemValue)
							}
						})
						item.isVisible = !!global.eval(exprossion[0]) && !!global.eval(exprossion[1])
						if (item.isRepeat === 1) {
							item.isVisible = !!global.eval(exprossion[0]) && !!global.eval(exprossion[1])
						}
					}
				} else if (item.conditionType === '{}' || item.conditionType === '{/}') {
					let exprossion = item.conditionExpression
					const leftData = this.getBracketsText(exprossion)
					if (leftData === itemCode) {
						exprossion = exprossion.replace(leftData, `'${itemValue}'`)
						console.log(exprossion)
						item.isVisible = !!global.eval(exprossion)
					}
				} else {
					let exprossion = item.conditionExpression
					const exprossionArr = item.conditionExpression.split(item.conditionType)
					const exprossionCode = exprossionArr[0]
					if (exprossionCode === itemCode) {
						if (valueItem.controlType === 'DP' || valueItem.controlType === 'TP' || valueItem.controlType === 'DTP') {
							exprossion = exprossion.replace(exprossionArr[0], valueItem.controlType === 'TP' ? this.calculateSecond(itemValue) : new Date(itemValue).getTime())
							exprossion = exprossion.replace(exprossionArr[1], valueItem.controlType === 'TP' ? this.calculateSecond(exprossionArr[1].replace(/'/g, '')) : new Date(exprossionArr[1].replace(/'/g, '')).getTime())
						} else {
							exprossion = exprossion.replace(exprossionArr[0], `'${itemValue}'`)
						}
						item.isVisible = !!global.eval(exprossion)
					}
				}
			}
		})
	}
	// 得到有括号的字符串
	getBracketsText(text) {
		const regex = /\((.+?)\)/g
		const textList = text.match(regex)
		return textList[0].substring(1, textList[0].length - 1)
	}
	// 格式化日期
	formatDate(date, format) {
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		const dateInfo = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
		for (const k in dateInfo) {
			if (new RegExp(`(${k})`).test(format)) {
				const dateStr = dateInfo[k] + ''
				format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? dateStr : ('00' + dateStr).substr(dateStr.length))
			}
		}
		return format
	}
	// 处理数字小数
	sloveNumber(number, numConfig) {
		if (numConfig.allowDecimal === allowDecimalType[1].value) { // 是否允许小数
			number = Math.round(number)
		} else {
			if (global.isNum(number)) {
				number = number.toFixed(numConfig.decimalDigit)// 小数点位数
				if (number === 0) number = 0 // 0.00 0.000等直接显示0
			} else { number = '' }
		}
		return number
	}
	// 时间判断
	isTime(value) {
		return global.isTime(value)
	}
	//	日期判断
	isDate(value) {
		return global.isDate(dayjs(value).format('YYYY-MM-DD'))
	}
	//	日期时间判断
	isDatetime(value) {
		return global.isDatetime(dayjs(value).format('YYYY-MM-DD hh:mm:ss'))
	}
	// 获取日期计算
	calculateDate(firstDate, secondDate, controlType) {
		let dateValue = ''
		if (controlType === 'TP') {
			dateValue = (new Date('1000-10-10 ' + firstDate) - new Date('1000-10-10 ' + secondDate)) / 1000
		} else if (controlType === 'DP' || controlType === 'DTP') {
			dateValue = Math.floor((new Date(firstDate) - new Date(secondDate)) / 1000)
		}
		return dateValue
	}
	// 计算时间
	calculateTime(dateUnit, firstDate, secondDate, oper) {
		if (dateUnit === calculateDateUnitType[3].value) { secondDate = secondDate * 1000 * 60 * 60 }
		if (dateUnit === calculateDateUnitType[4].value) { secondDate = secondDate * 1000 * 60 }
		const dateValue = new Date(this.getTimeOperCalculate(new Date('1000-10-10 ' + firstDate).getTime(), secondDate, oper))
		const minutesValue = dateValue.getMinutes()
		const hourValue = dateValue.getHours() + ':' + (minutesValue > 10 ? minutesValue : '0' + minutesValue)
		return hourValue.indexOf('NaN') >= 0 ? '' : hourValue
	}
	// 得到时间表达式计算值
	getTimeOperCalculate(firstValue, secondValue, oper) {
		switch (oper) {
		case '+':
			return firstValue + secondValue
		case '-':
			return firstValue - secondValue
		case '*':
			return firstValue * secondValue
		case '/':
			return firstValue / secondValue
		}
	}
	// 计算日期
	calculateDateTime(dateUnit, firstDate, secondDate, oper, controlType) {
		if (dateUnit === calculateDateUnitType[0].value) { secondDate = secondDate * 1000 * 60 * 60 * 24 * 12 * 365 }
		if (dateUnit === calculateDateUnitType[1].value) { secondDate = secondDate * 1000 * 60 * 60 * 24 * 12 }
		if (dateUnit === calculateDateUnitType[2].value) { secondDate = secondDate * 1000 * 60 * 60 * 24 }
		if (dateUnit === calculateDateUnitType[3].value) { secondDate = secondDate * 1000 * 60 * 60 }
		if (dateUnit === calculateDateUnitType[4].value) { secondDate = secondDate * 1000 * 60 }
		const dateValue = new Date(this.getTimeOperCalculate(new Date(firstDate).getTime(), secondDate, oper))
		const formatDateValue = this.formatDate(dateValue, controlType === 'DTP' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy/MM/dd')
		return formatDateValue.indexOf('NaN') >= 0 ? '' : formatDateValue
	}
	// 获取表单类型
	getControlType(ddValue) {
		if (global.isNum(ddValue)) { return 'NTX' } else if (this.isTime(ddValue)) { return 'TP' } else if (this.isDate(ddValue)) { return 'DP' } else if (this.isDatetime(ddValue)) { return 'DTP' } else { return '' }
	}
	// 进行根号等表达式计算
	getMathExp(calculateInfo, suffixItem, suffixReg = /\b[a-z0-9]{16}\b/gi) {
		const match = suffixItem.match(suffixReg) || []
		let calculateSuffixItem = suffixItem
		for (const i in match) { calculateSuffixItem = calculateSuffixItem.replace(match[i], !calculateInfo.outerDdMap[match[i]] ? calculateInfo.currentDdMap[match[i]].value : calculateInfo.outerDdMap[match[i]].value) }
		return global.eval(calculateSuffixItem)
	}
	// 验证是否满足计算条件
	isCalculate(calculateInfo) {
		// 表示直接计算平方 开方等单运算符计算
		if (calculateInfo.canCalculate) { return true }
		if (!calculateInfo.outerDdMap || !calculateInfo.currentDdMap) { return false }
		for (const key in calculateInfo.outerDdMap) {
			if (calculateInfo.outerDdMap[key]) { return false }
		}
		for (const key in calculateInfo.currentDdMap) {
			if (!calculateInfo.currentDdMap[key]) { return false }
		}
		return true
	}
	// 设置计算
	setCalculate(valueItem, list) {
		if (!valueItem.calculateList && !valueItem.calculateList.length) return
		const calculateInfo = valueItem.calculateList[0]
		list.forEach(item => {
			if (this.selCalculateDDTypeArr.indexOf(item.controlType) >= 0) {
				if (calculateInfo.currentDdMap[item.itemCode] && calculateInfo.currentDdMap[item.itemCode].isRequired) {
					const optionValueList = (item.controlType === 'CB' ? item.value : item.value.split(',')) ||	[]
					let optionValue = ''
					item.itemOptionList.forEach(optionItem => {
						if (optionValueList.indexOf(optionItem.value) >= 0) {
							optionValue = global.isNum(optionValue)	? optionValue + parseInt(optionItem.value) : parseInt(optionItem.value)
						}
					})
					calculateInfo.currentDdMap[item.itemCode].value = optionValue
				}
			}
			if (calculateControlList.indexOf(item.controlType) >= 0) {
				if (calculateInfo.currentDdMap[item.itemCode] && calculateInfo.currentDdMap[item.itemCode].isRequired) {
					calculateInfo.currentDdMap[item.itemCode].value = item.value
				}
			}
		})
		// const outerDdMap = calculateInfo.outerDdMap
		// const calculateSuffix = calculateInfo.calculateSuffix  //（calculate）
		// const currentDdMap = calculateInfo.currentDdMap
		const resultType = calculateInfo.type
		const dateUnit = calculateInfo.dateUnit || 1
		// const canCalculate = calculateInfo.canCalculate
		if (this.isCalculate(calculateInfo)) {
			let result = this.sloveCalculate(calculateInfo)
			// 数值类型
			if (valueItem.controlType === 'NTX') {
				// if (this.resultType === 1) {
				// }
				// 时间间隔 默认返回 秒
				if (resultType === 2 && result) {
					try {
						if (dateUnit === 1) { result = Math.floor(result / (60 * 60 * 24 * 31 * 12)) }
						if (dateUnit === 2) { result = Math.floor(result / (60 * 60 * 24 * 31)) }// 月
						if (dateUnit === 3) { result = Math.floor(result / (60 * 60 * 24)) }// 日
						if (dateUnit === 4) { result = Math.floor(result / (60 * 60)) }// 时
						if (dateUnit === 5) { result = Math.floor(result / 60) }// 分
					} catch (e) {
						result = 0
					}
				}
				if (Object.keys(valueItem.numConfig).length > 0) { result = this.sloveNumber(result, valueItem.numConfig) }
			}
			return result
		}
		return ''
	}
	// 处理计算表达式
	sloveCalculate(calculateInfo) {
		const calculateSuffixList = []
		let calculateSuffixIndex = -1
		const dateUnit = calculateInfo.dateUnit || 1
		calculateInfo.calculateSuffix.forEach(suffixItem => {
			// √￣   ²   ³
			if (suffixItem.startsWith('Math')) { suffixItem = this.getMathExp(calculateInfo, suffixItem) }
			if (global.isSingleCode(suffixItem) && !global.isNum(suffixItem)) {
				if (calculateInfo.currentDdMap[suffixItem]) { suffixItem = calculateInfo.currentDdMap[suffixItem].value } else if (calculateInfo.outerDdMap[suffixItem]) { suffixItem = calculateInfo.outerDdMap[suffixItem].value }
			}
			if (global.isOper(suffixItem)) {
				const firstSuffix = calculateSuffixList[calculateSuffixIndex--]
				const secondSuffix = calculateSuffixList[calculateSuffixIndex--]
				if (global.isNum(firstSuffix) && global.isNum(secondSuffix)) {
					if (suffixItem === '/' && firstSuffix === 0) { calculateSuffixList[++calculateSuffixIndex] = 0 } else { calculateSuffixList[++calculateSuffixIndex] = global.eval(secondSuffix + suffixItem + firstSuffix) }
				} else if ((this.isTime(firstSuffix) && this.isTime(secondSuffix))) {
					calculateSuffixList[++calculateSuffixIndex] = this.calculateDate(secondSuffix, firstSuffix, 'TP')
				} else if ((this.isDate(firstSuffix) || this.isDatetime(firstSuffix)) && (this.isDate(secondSuffix) || this.isDatetime(secondSuffix))) {
					const secondSuffixTime = secondSuffix.split(' ').length > 1 ? new Date(secondSuffix).getTime() + 8 * 1000 * 60 * 60 : new Date(secondSuffix).getTime()
					const firstSuffixTime = firstSuffix.split(' ').length > 1 ? new Date(firstSuffix).getTime() + 8 * 1000 * 60 * 60 : new Date(firstSuffix).getTime()
					calculateSuffixList[++calculateSuffixIndex] = Math.abs((secondSuffixTime - firstSuffixTime) / 1000)
				} else {
					calculateSuffixList[++calculateSuffixIndex] = (this.isTime(firstSuffix) && global.isNum(secondSuffix)) || (this.isTime(secondSuffix) && global.isNum(firstSuffix))
						? (this.isTime(firstSuffix)
							? this.calculateTime(dateUnit, firstSuffix, secondSuffix, suffixItem)
							: this.calculateTime(dateUnit, secondSuffix, firstSuffix, suffixItem))
						: ((this.isDatetime(firstSuffix) || this.isDate(firstSuffix))
							? this.calculateDateTime(dateUnit, firstSuffix, secondSuffix, suffixItem, this.getControlType(firstSuffix))
							: this.calculateDateTime(dateUnit, secondSuffix, firstSuffix, suffixItem, this.getControlType(secondSuffix)))
				}
			} else {
				calculateSuffixList[++calculateSuffixIndex] = suffixItem
			}
		})
		return calculateSuffixList[calculateSuffixIndex]
	}
}
const formCalculate = new FormCalculate()
export {
	formCalculate
}