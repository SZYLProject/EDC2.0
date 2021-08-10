<template>
  <div class="logicCalculator">
    <el-form
      v-model="calculatorForm"
      label-position="left"
      label-width="70px"
      size="small"
      class="main-form"
    >
      <el-row v-if="itemControlType == 'NTX'">
        <el-col :span="11">
          <el-form-item label="计算类型">
            <template>
              <el-radio-group
                v-model="calculatorForm.type"
                @change="calculateTypeChange"
              >
                <el-radio
                  v-for="(item, index) in dictionary.ruleCalculateType"
                  :key="index"
                  :value="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-col>
        <el-col v-if="calculatorForm.type == 2" :span="11" :offset="2">
          <el-form-item label="单位">
            <el-select
              v-model="calculatorForm.dateUnit"
              style="width: 100%"
              placeholder="请选择"
              size="mini"
              @change="dateUnitChange"
            >
              <el-option
                v-for="item in dictionary.calculateDateUnitType"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="选择访视">
            <el-select
              v-model="calculatorForm.visitCode"
              style="width: 100%"
              filterable
              collapse-tags
              placeholder="选择访视"
            >
              <el-option
                v-for="item in visitList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="选择表单">
            <el-select
              v-model="calculatorForm.formCode"
              style="width: 100%"
              filterable
              collapse-tags
              placeholder="选择表单"
            >
              <el-option
                v-for="item in visitFormList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 标签 -->
    <div class="logicCalculator-title">
      选择变量
    </div>
    <!-- <el-scrollbar style="height:80px"> -->
    <div class="logicCalculator-box">
      <!--有了 其他计算符,则不再进行时间运算-->
      <span
        v-for="(item, index) in variableList"
        :key="index"
        contenteditable="false"
        class="logicCalculator-box-item"
        @click="selectCalculatorItem(item, 'item')"
      >{{ item.itemName }}
      </span>
    </div>
    <!-- </el-scrollbar> -->
    <div class="logicCalculator-element">
      <div class="logicCalculator-element-item">
        <span
          v-for="(item, index) in numOptionList"
          :key="item+index"
          contenteditable="false"
          class="linkOperateList-ele"
          :class="{ 'main-disable': item== '.' && onlyBascOperate }"
          @click="selectCalculatorItem(item, 'num')"
        >{{ item }}
        </span>
        <span
          v-for="(item, index) in linkOperateList"
          :key="item+index"
          contenteditable="false"
          class="linkOperateList-ele"
          @click="selectCalculatorItem(item, 'oper')"
        >{{ item }}
        </span>
        <span
          v-for="(item, index) in numOperateList"
          v-show="calcuatorType == 'logic'"
          :key="item+index"
          contenteditable="false"
          class="linkOperateList-ele"
          :class="{ 'main-disable': calcuatorType != 'logic' }"
          @click="selectCalculatorItem(item, 'oper')"
        >{{ item }}
        </span>
        <span
          v-for="(item, index) in clearOperateList"
          :key="item+index"
          contenteditable="false"
          class="linkOperateList-ele"
          @click="delElement(item)"
        >{{ item }}
        </span>
      </div>
    </div>
    <div class="logicCalculator-title">
      {{ calculatorForm.itemName }}变量的值为
    </div>
    <div class="logicCalculator-rule-container" style="ime-mode: disabled" v-html="calculateHtml">
    </div>
    <span slot="footer" class="main-dialog-footer">
      <el-button class="main-dialog-cancelButton" @click="closeCalculatorDialog">
        取 消
      </el-button>
      <el-button
        class="main-dialog-sureButton"
        :disabled="calculateList.length == 0"
        type="primary"
        @click="saveCalculator"
      >
        确 定
      </el-button>
    </span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import { getSection, getSectionForm, getVariable } from '@/api/formEdit'
import { CALCULATORFORM } from '@/store/stateTypes'
import * as dictionary from '@/assets/js/dictionary'
export default {
	props: {
		itemControlTypeParam: { // 计算结果的控件类型 NTX DP TP DTP,
			type: String,
			default: ''
		},
		calcuatorType: { // 计算器类型 计算cal/核查logic
			type: String,
			default: ''
		},
		researchCode: { // 研究code
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isVisitFormFlag: false, // 调用一次的flag状态
			dictionary, // 字典
			visitList: [], // 访视列表
			visitFormList: [], // 表单列表
			dateControlType: ['TP', 'DP', 'DTP'], // 日期控制类型
			numControlType: ['NTX', 'CB', 'RB', 'SEL_SIG'],
			// dtOPer: ['+', '-'], // 日期时间计算允许使用的操作符
			leftBracketNum: 0, // 记录左括号的数量,用来实现括号匹配以及禁止括号嵌套
			isNumberPoint: false, // 数字中书否包含了小数点
			calculateSuffix: [], // 表达式录入计算使用,
			calculateList: [], // 暂存计算器中的每一个元素
			calculateDisplay: '', // 设计页面展示使用,单纯的文本内容
			variableCopyList: [], // 变量list
			calculatorForm: { // 计算表单
				visitCode: '',
				sectionCode: '',
				type: dictionary.ruleCalculateType[0].value,
				dateUnit: dictionary.calculateDateUnitType[0].value
			},
			variableList: [], // 变量list
			prevElement: { code: '', controlType: '', itemCode: '', element: null } //  上一个元素(当前输入元素),用于基本输入检验
		}
	},
	computed: {
		...mapState('formDesigin', {
			calculatorInfo: CALCULATORFORM
		}),
		itemControlType() {	return this.numControlType.indexOf(this.itemControlTypeParam) >= 0	? 'NTX' : this.itemControlTypeParam	},
		basicOperateList() {
			return ['+', '-', '*', '/']
		},
		numOperateList() {
			return ['<', '>', '<=', '>=', '='] // 逻辑运算的操作符;
		},
		linkOperateList() {
			return [
				'+',
				'-',
				'*',
				'/',
				'(',
				')',
				this.dictionary.calculatorSymbol.power2,
				this.dictionary.calculatorSymbol.power3,
				this.dictionary.calculatorSymbol.genhao
			]
		},
		numOptionList() {
			return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
		},
		clearOperateList() {
			return [
				this.dictionary.calculatorSymbol.clearBtn,
				this.dictionary.calculatorSymbol.deleteBtn
			]
		},
		// 只允许加减操作
		onlyBascOperate() {
			return this.itemControlType !== 'NTX'
		},
		setItemElementHtml() {
			return (itemName) => {
				return (
					'<span contenteditable="false" ' +
          'style="display: inline-block;height: 2em;' +
          'border: #DCDFE6 1px solid;border-radius: 1em;' +
          'padding:0 6px;' +
          'font-size: 12px;' +
          'line-height: 2em; user-select: none;text-align: center;cursor: pointer;' +
          'user-modify:read-only;margin: 0.1em;"' +
          '> ' +
         itemName +
          '</span>'
				)
			}
		},
		setNumElementHtml() {
			return (itemName) => {
				return (
					'<span contenteditable="false" ' +
          'style="display: inline-block;height: 2em;' +
          'line-height: 2em;' +
          'font-size: 12px;' +
          'padding:0 2px;' +
          'user-modify:read-only;"' +
          '> ' +
          itemName +
          '</span>'
				)
			}
		},
		calculateHtml() { // html
			const list = this.calculateList.map(item => {
				return this.getElementHtml(item.code, item.element)
			})
			return (list || []).join('')
		}
	},
	watch: {
		'calculatorForm.visitCode'(value) {
			this.getVisitFormCondition(value)
		},
		'calculatorForm.formCode'(value) {
			this.getVariableList(value)
		},
		calculatorInfo: {
			handler() {
				this.initCalculator()
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.getVisitList(this.getLocalsCode().visitCode)
	},
	mounted() {
	},
	methods: {
		// 初始化计算
		initCalculator() {
			this.variableList = []
			this.calculatorForm.dateUnit = this.calculatorInfo.dateUnit || dictionary.calculateDateUnitType[0].value
			this.calculatorForm.itemName = this.calculatorInfo.itemName
			if (this.$utils.isJSON(this.calculatorInfo.calculate)) {
				this.calculateList = JSON.parse(this.calculatorInfo.calculate)
				this.prevElement = this.calculateList[this.calculateList.length - 1]
			}
		},
		// 获取版本，研究信息
		getLocalsCode() {
			const researchCode = this.researchCode
			const visitCode = this.$route.query.visitCode
			return { researchCode, visitCode }
		},
		// 保存计算
		saveCalculator() {
			/* calculate字段有长度限制*/
			if (this.validateSaveCalculate()) {
				const calculatorInfo = {
					...this.calculatorForm,
					calculateSuffix: this.calculateSuffix.join('，'),
					calculate: JSON.stringify(this.calculateList),
					calculateDisplay: '= ' + this.calculateDisplay,
					itemControlType: this.itemControlType,
					type: this.calculatorForm.type,
					dateUnit: this.calculatorForm.dateUnit
				}
				this.$emit('saveCalculator', calculatorInfo)
			} else {
				return false
			}
		},
		// 校验保存的数据
		validateSaveCalculate() {
			if (this.leftBracketNum === 1) {
				return this.setErrorMessage('表达式有误,括号不匹配')
			}
			if (
				this.prevElement.code === 'oper' &&
        !(this.prevElement.element === ')' ||
          this.prevElement.element === this.dictionary.calculatorSymbol.power2 ||
          this.prevElement.element === this.dictionary.calculatorSymbol.power3
        )
			) {
				return this.setErrorMessage('表达式不完整')
			}
			if (this.calculateList.length === 1) {
				const e = this.calculateList[0]
				if (e.code === 'item') {
					if (
						this.itemControlType === 'NTX' &&
            this.numControlType.indexOf(e.controlType) < 0
					) {
						return this.setErrorMessage('数字类型标签赋值表达式类型错误')
					}
					if (this.itemControlType === 'TP' && e.controlType !== 'TP') {
						return this.setErrorMessage('时间类型标签赋值表达式类型错误')
					}
					if (
						(this.itemControlType === 'DP' || this.itemControlType === 'DTP') &&
            (e.controlType !== 'DP' || e.controlType !== 'DTP')
					) {
						return this.setErrorMessage('日期类型标签赋值表达式类型错误')
					}
				}
				if (e.code === 'oper') {
					return this.setErrorMessage('表达式不完整,不能只包含符号')
				}
			}
			const expArr = this.sloveSuffiix()
			const suffixList = this.setSuffixExp(expArr)
			if (suffixList.length === 1) {
				this.calculateSuffix = suffixList
				return true
			}
			const preResultType = this.expCheck(suffixList)
			// console.log('后缀表达式----', suffixList, '计算结果类型', preResultType);
			if (preResultType === false) {
				return false
			}
			if (preResultType !== this.itemControlType) {
				return this.setErrorMessage('表达式有误,计算结果类型与期望不匹配')
			}
			this.calculateSuffix = suffixList
			return true
		},
		// 处理后缀
		sloveSuffiix() {
			let suffiixList = []
			// 处理赋值操作
			let suffiixString = ''
			this.calculateList.forEach(item => {
				if (item.code === 'num') {
					suffiixString += item.element
					this.calculateDisplay += item.element
				} else {
					if (suffiixString !== '') {
						suffiixList.push(suffiixString)
					}
					suffiixString = ''
				}
				if (item.code === 'item') {
					suffiixList.push(item.itemCode)
					this.calculateDisplay += item.element.itemName + ' '
				}
				if (item.code === 'oper') {
					suffiixList.push(item.element)
					this.calculateDisplay += item.element + ' '
				}
			})
			// 如果循环中,数字是在最后面,则在循环中会丢失这一步的操作,导致少了最后的数字
			if (suffiixString !== '') {
				suffiixList.push(suffiixString)
			}
			suffiixString = ''
			// console.log('初步梳理数组', expArr);
			suffiixList = this.sloveBrackets(suffiixList)
			// console.log('处理括号', expArr);
			suffiixList = this.handleExtr(suffiixList)
			// console.log('数字计算处理开方', expArr);
			suffiixList = this.sloveExp(suffiixList)
			// console.log('数字计算处理苹果放---', expArr);
			for (let i = 0; i < suffiixList.length; i++) {
				if (suffiixList[i].startsWith('(')) {
					const subArr = this.getSubExpList(suffiixList[i])
					subArr.unshift('(')
					subArr.push(')')
					subArr.unshift(i, 1)
					Array.prototype.splice.apply(suffiixList, subArr)
				}
			}
			// console.log('处理了字计算---', expArr);
			return suffiixList
		},
		// 表达式审核
		expCheck(suffixList) {
			const itemList = this.calculateList.filter((item) => item.code === 'item')
			const stackList = []
			let stackIndex = -1
			let preResultType = ''
			for (let i = 0; i < suffixList.length; i++) {
				if (this.isOperateElement(suffixList[i])) {
					const stackListINewtem = stackList[stackIndex--]
					const stackListIOldtem = stackList[stackIndex--]
					const stackListOldType = this.getControlType(itemList, stackListIOldtem)
					const stackListNewType = this.getControlType(itemList, stackListINewtem)
					if (!stackListNewType || !stackListOldType) {
						return this.setErrorMessage('stackListOldType stackListNewType 的类型有空值')
					}
					preResultType = this.getTempResultType(stackListOldType, stackListNewType, suffixList[i])
					if (preResultType === false) {
						return false
					}
					if (preResultType === 'NTX') {
						stackList[++stackIndex] = '1'
					}
					if (preResultType === 'TP') {
						stackList[++stackIndex] = '00:00'
					}
					if (preResultType === 'DTP' || preResultType === 'DP') {
						stackList[++stackIndex] = '1111-11-11 00:00:00'
					}
					if (preResultType === '' || preResultType === false) {
						return this.setErrorMessage('表达式有误')
					}
				} else {
					stackList[++stackIndex] = suffixList[i]
				}
			}
			return preResultType
		},
		// 获取临时操作符类型比较结果
		getTempResultType(oldType, newType, operateElement) {
			// 运算顺序 stackListOldType oper stackListNewType
			if (this.numControlType.indexOf(oldType) >= 0) {
				if (this.numControlType.indexOf(newType) >= 0) {
					return 'NTX'
				}
				if (newType === 'TP' && operateElement === '+') {
					return 'TP'
				}
				if ((newType === 'DTP' || newType === 'DP') && operateElement === '+') {
					return 'DP'
				}
				return this.setErrorMessage('数字计算表达式有误,请认真检查！')
			} else if (oldType === 'TP') {
				if (newType === 'NTX' && (operateElement === '+' || operateElement === '-')) {
					return 'TP'
				}
				if (newType === 'TP' && operateElement === '-') {
					return 'NTX'
				}
				return this.setErrorMessage(
					'对时间的操作有误,仅允许时间减时间、时间加减数字操作！'
				)
			} else if (oldType === 'DP' || oldType === 'DTP') {
				if ((newType === 'DP' || newType === 'DTP') && operateElement === '-') {
					return 'NTX'
				}
				if (newType === 'NTX' && (operateElement === '-' || operateElement === '+')) {
					return oldType
				}
				return this.setErrorMessage(
					'对日期的操作有误,仅允许日期减日期、日期加减数字操作！'
				)
			} else {
				return this.setErrorMessage('表达式有误,请仔细检查！')
			}
		},
		// 获取变量对应的元素类型（input）
		getControlType(itemList, itemCode) {
			if (this.$utils.isSingleitemCode(itemCode)) {
				for (let i = 0; i < itemList.length; i++) {
					if (itemList[i].element.itemCode === itemCode) {
						return itemList[i].controlType
					}
				}
			} else if (this.$utils.isNum(itemCode)) {
				return 'NTX'
			} else if (this.$utils.isTime(itemCode)) {
				return 'TP'
			} else if (this.$utils.isDate(itemCode)) {
				return 'DP'
			} else if (this.$utils.isDatetime(itemCode)) {
				return 'DTP'
			} else if ('' + itemCode.startsWith('Math')) {
				return 'NTX'
			}
			return ''
		},
		// 设置表达式
		setSuffixExp(expArr) {
			let isBracket = false
			const suffixExpArr = []
			const stackList = []
			let stackIndex = -1
			for (let i = 0; i < expArr.length; i++) {
				if (expArr[i].startsWith('Math')) {
					suffixExpArr.push(expArr[i] + '')
				}
				if (this.$utils.isSingleitemCode(expArr[i])) {
					suffixExpArr.push(expArr[i])
				}
				if (this.$utils.isNum(expArr[i])) {
					suffixExpArr.push(expArr[i])
				}
				if (this.basicOperateList.indexOf(expArr[i]) >= 0) {
				// stack中的操作符优先级高,出栈
					const compereIndex = this.operatePriorityCompere(expArr[i], stackList[stackIndex])
					if (stackIndex > -1 && compereIndex === -1) {
						if (isBracket) {
							suffixExpArr.push(stackList[stackIndex--])
							stackList[++stackIndex] = expArr[i]
						} else {
							while (stackIndex > -1) {
								suffixExpArr.push(stackList[stackIndex--])
							}
							stackList[++stackIndex] = expArr[i]
						}
					} else if (stackIndex > -1 && compereIndex === 0) {
						suffixExpArr.push(stackList[stackIndex--])
						stackList[++stackIndex] = expArr[i]
					} else {
						stackList[++stackIndex] = expArr[i]
					}
				}
				if (expArr[i] === '(') {
					isBracket = true
					stackList[++stackIndex] = expArr[i]
				}
				if (expArr[i] === ')') {
					let bracketString = ''
					while (stackIndex > -1 && (bracketString = stackList[stackIndex--]) !== '(') {
						if (bracketString !== ')') {
							suffixExpArr.push(bracketString)
						}
					}
					isBracket = false
				}
				if (expArr[i].startsWith('(') && expArr[i] !== '(') {
					const subExpListOne = this.getSubExpList(expArr[i])
					const subExpListTwo = this.setSuffixExp(subExpListOne)
					subExpListTwo.unshift(1, 0)
					Array.prototype.splice.apply(suffixExpArr, subExpListTwo)
				}
			}
			while (stackIndex > -1) {
				suffixExpArr.push(stackList[stackIndex--])
			}
			return suffixExpArr
		},
		// 获取处理数组
		getSubExpList(expList) {
			expList = expList.slice(1, expList.length - 1)
			const subExpList = []
			let itemString = ''
			let isMathFun = false
			let bracketNumString = ''
			let mfunBracketNum = 0// 计数标识括号等
			for (let i = 0; i < expList.length; i++) {
				const code = expList.charCodeAt(i)
				if (expList[i] === 'M') {
					mfunBracketNum = 1
					isMathFun = true
					bracketNumString = expList.substr(i, 5)
					i += 5
					if (expList[i] === 'p') {
						bracketNumString += expList.substr(i, 4)
						i += 4
					}
					if (expList[i] === 's') {
						bracketNumString += 5
						bracketNumString += expList.substr(i, 5)
						i += 5
					}
				}
				if (isMathFun) {
					bracketNumString += expList[i]
					if (expList[i] === '(') {
						mfunBracketNum++
					}
					if (expList[i] === ')') {
						mfunBracketNum--
					}
					if (mfunBracketNum === 0) {
						isMathFun = false
						subExpList.push(bracketNumString)
						i++
					}
				}
				// itemCode 都是以字母开头的
				if (code >= 97 && code <= 122 && !isMathFun) {
					const itemCode = expList.substr(i, 16)
					if (this.$utils.isSingleitemCode(itemCode)) {
						if (itemString !== '') {
							subExpList.push(itemString)
						}
						itemString = ''
						i += 16
						subExpList.push(itemCode)
					}
				}
				if (this.basicOperateList.indexOf(expList[i]) >= 0 && !isMathFun) {
					if (itemString !== '') {
						subExpList.push(itemString)
					}
					itemString = ''
					subExpList.push(expList[i])
				}
				if (this.$utils.isNum(expList[i]) && !isMathFun) {
					itemString += expList[i]
				}
			}
			if (itemString !== '') {
				subExpList.push(itemString)
			}
			return subExpList
		},
		// 处理括号
		sloveBrackets(expArr) {
			const expList = []
			for (let i = 0; i < expArr.length; i++) {
				if (expArr[i] === '(') {
					const expExtraList = []
					for (let j = i + 1; j < expArr.length; j++) {
						const item = expArr[j]
						i++
						if (item === '(') {
							expExtraList.push('(')
						} else if (item === ')') {
							expList.push(expExtraList)
							break
						} else {
							expExtraList.push(item)
						}
					}
				} else {
					expList.push(expArr[i])
				}
			}
			return expList
		},
		// 处理平方 立方 ,返回数组中的平方操作
		sloveExp(expArr, isSub) {
			let expString = ''
			const expList = []
			if (isSub) expString += '('
			for (let i = 0; i < expArr.length; i++) {
				// 看后面是不是 平方 立方
				if (
					i + 1 < expArr.length &&
          (expArr[i + 1] === this.dictionary.calculatorSymbol.power2 ||
            expArr[i + 1] === this.dictionary.calculatorSymbol.power3)
				) {
					expString += 'Math.pow(' + expArr[i] + ", '" + expArr[i + 1] + "'== '" + this.dictionary.calculatorSymbol.power2 + "' ? 2 : 3)"
					expList.push('Math.pow(' + expArr[i] + ", '" + expArr[i + 1] + "'== '" + this.dictionary.calculatorSymbol.power2 + "' ? 2 : 3)")
					i++ // if里已经看了下一个元素,并且进行了操作,所以循环时要跳过
				} else {
					expString += expArr[i]
					expList.push(expArr[i])
				}
			}
			if (isSub) expString += ')'
			if (!isSub) return expList
			return expString
		},
		// 处理开方
		handleExtr(expArr) {
			const expList = []
			for (let i = 0; i < expArr.length; i++) {
				if (expArr[i] === this.dictionary.calculatorSymbol.genhao) {
					if (typeof expArr[i + 1] === 'object') {
						expList.push('Math.sqrt(' + this.sloveExp(expArr[i + 1], true) + ')')
					} else {
						expList.push('Math.sqrt(' + expArr[i + 1] + ')')
					}
					i++
				} else if (typeof expArr[i] === 'object') {
					expList.push(this.sloveExp(expArr[i], true))
				} else {
					expList.push(expArr[i])
				}
			}
			return expList
		},
		// 比较运算符优先级(+,-，)
		operatePriorityCompere(firstSymbol, secondSymbol) {
			if (!(this.basicOperateList.indexOf(firstSymbol) >= 0 && this.basicOperateList.indexOf(secondSymbol) >= 0)) return -2
			//   const r = 0
			const firstSymbolList = ['+', '-']
			const secondSymbolList = ['*', '/']
			if (
				(firstSymbolList.indexOf(firstSymbol) >= 0 && firstSymbolList.indexOf(secondSymbol) >= 0) ||
        (secondSymbolList.indexOf(firstSymbol) >= 0 && secondSymbolList.indexOf(secondSymbol) >= 0)
			) {
				return 0
			}
			if (secondSymbolList.indexOf(firstSymbol) >= 0 && firstSymbolList.indexOf(secondSymbol) >= 0) {
				return 1
			}
			if (secondSymbolList.indexOf(secondSymbol) >= 0 && firstSymbolList.indexOf(firstSymbol) >= 0) {
				return -1
			}
			return -2
		},
		// 是否是操作元素
		isOperateElement(element) {
			return this.basicOperateList.indexOf(element) >= 0
		},
		// 获取clonehtml
		getElementHtml(code, element) {
			if (code === 'item') {
				return this.setItemElementHtml(element.itemName)
			}
			if (code === 'oper' || code === 'num') {
				return this.setNumElementHtml(element)
			}
		},
		// 删除元素
		delElement(item) {
			this.calculateDisplay = ''
			// 清空
			if (this.dictionary.calculatorSymbol.clearBtn === item) {
				this.calculateSuffix = []
				this.calculateList.splice(0, this.calculateList.length)
				this.prevElement = {
					code: '',
					controlType: '',
					itemCode: '',
					element: null
				}
				this.isNumberPoint = false
				this.leftBracketNum = 0
			}
			// 删除上一个元素
			if (
				this.dictionary.calculatorSymbol.deleteBtn === item &&
        this.calculateList.length > 0
			) {
				const popCalculateItem = this.calculateList.pop()
				if (popCalculateItem.element === ')') {
					this.leftBracketNum++
				}
				if (popCalculateItem.element === '(') {
					this.leftBracketNum--
				}
				if (popCalculateItem.element === '.') {
					this.isNumberPoint = false
				}
				// 删除的时候,看第一个item的类型,tp,dp,dtp类型之间不能混合计算,
				this.prevElement = this.calculateList.length > 0	? this.calculateList[this.calculateList.length - 1]	: { code: '', controlType: '', element: null, itemCode: '' }
			}
		},
		// 设置错误提示
		setErrorMessage(info) {
			this.$message.error(info)
			return false
		},
		// 校验元素
		validateElement(item) {
			if (this.prevElement.element == null) {
				if (item.code === 'num') {
					// if (e.element == '0')
					//     return this.setErrorMessage('表达式不允许以数字0开头');
					if (item.element === '.') return this.setErrorMessage('表达式不允许以小数点开头')
				}
				// 以表单标签开头 ,暂时不用做限制
				// 以符号开头 ,仅允许 根号 减号(负号) 左括号 开头
				if (item.code === 'oper') {
					if (
						item.element !== '(' ||
            item.element !== '-' ||
           item.element !== this.dictionary.calculatorSymbol.genhao
					) {
						return this.setErrorMessage('表达式不允许以此符号开头')
					}
					if (item.element === '(') {
						this.leftBracketNum++
					}
				}
			}	else {		// 表示不是第一个元素了
				/*
         * 前一个是标签,则后面只能是计算符号 , 匹配的右括号
         * 数字类型的表单标签后面可以是 平方 立方
         * */
				if (this.prevElement.code === 'item') {
					if (item.code === 'oper') {
						// 验证右括号匹配
						if (item.element === ')') {
							if (this.leftBracketNum === 1) {
								this.leftBracketNum--
							} else {
								return this.setErrorMessage('表单标签后面的右括号不匹配')
							}
						}
						if (item.element === this.dictionary.calculatorSymbol.genhao) {
							return this.setErrorMessage('表单标签后面不允许直接使用根号')
						}
						if (item.element === '(') {
							return this.setErrorMessage('表单标签后面不允许直接使用左括号')
						}
						if (
							this.dateControlType.indexOf(this.prevElement.controlType) >= 0 &&
              (item.element === this.dictionary.calculatorSymbol.power2 ||
                item.element === this.dictionary.calculatorSymbol.power3 ||
               item.element === this.dictionary.calculatorSymbol.genhao)
						) {
							return this.setErrorMessage(
								'日期时间类型的表单标签后面不允许使用' + item.element + '符号'
							)
						}
						// if (!((e.element == this.dictionary.calculatorSymbol.power2
						//         || e.element == this.dictionary.calculatorSymbol.power3)
						//     && (this.numControlType.indexOf(e.controlType) >= 0)
						// )) {
						//     return this.setErrorMessage('仅数字类型的表单标签后面允许使用平方和立方');
						// }
					}
					// 不允许连续的标签
					if (item.code === 'item') {
						return this.setErrorMessage('表单标签之间缺少计算符号')
					}
					if (item.code === 'num') {
						return this.setErrorMessage('表单标签后面不能直接使用数字符号')
					}
				}
				// 前一个标签是数字,后面只能是数字 正确数量的小数点 计算符号 平方 立方 匹配的右括号
				if (this.prevElement.code === 'num') {
					if (item.code === 'item') {
						return this.setErrorMessage('数字后面不能直接使用表单标签')
					}
					console.log(item)
					if (item.code === 'num') {
						// 数字中使用了小数点
						if (item.element === '.') {
							if (this.isNumberPoint) {
								return this.setErrorMessage('数字中只允许一个小数点')
							}
							this.isNumberPoint = true
						}
					}
					if (item.code === 'oper') {
						if (this.prevElement.element === '.') {
							return this.setErrorMessage('小数点后面不允许使用计算符号')
						}
						if (item.element === this.dictionary.calculatorSymbol.genhao) {
							return this.setErrorMessage('数字后面不允许使用根号')
						}
						if (item.element === '(') {
							return this.setErrorMessage('数字后面不允许直接使用左括号')
						}
						if (item.element === ')') {
							if (this.leftBracketNum === 1) {
								this.leftBracketNum--
							} else {
								return this.setErrorMessage('数字后面的右括号不匹配')
							}
						}
					}
				}
				/*
                     加减乘除 后面可以是左括号 标签 数字
                     平方 立方后面可以是匹配的右括号 加减乘除 立方 平方
                     根号后面可以是数字类型的表单标签
                     */
				if (this.prevElement.code === 'oper') {
					// 符号后面是表单标签
					if (item.code === 'item') {
						if (
							this.prevElement.element === this.dictionary.calculatorSymbol.genhao &&
              this.numControlType.indexOf(item.controlType) < 0
						) {
							return this.setErrorMessage('根号后面的表单标签只允许数字类型')
						}
						if (
							this.prevElement.element === this.dictionary.calculatorSymbol.power2 ||
              this.prevElement.element === this.dictionary.calculatorSymbol.power3
						) {
							return this.setErrorMessage('平方立方后面不允许直接使用表单标签')
						}
						if (this.prevElement.element === ')') {
							return this.setErrorMessage('右括号后面不允许直接使用表单标签')
						}
					}
					// 符号后面是数字类型
					if (item.code === 'num') {
						if (item.element === '.') {
							return this.setErrorMessage('操作符号后面不允许直接使用小数点')
						}
						if (
							this.prevElement.element === this.dictionary.calculatorSymbol.power2 ||
              this.prevElement.element === this.dictionary.calculatorSymbol.power3
						) {
							return this.setErrorMessage('平方立方后面不允许直接使用数字')
						}
						if (this.prevElement.element === ')') {
							return this.setErrorMessage('右括号后面不允许直接使用数字')
						}
					}
					if (item.code === 'oper') {
						if (this.prevElement.element === '(') {
							if (item.element === ')') {
								return this.setErrorMessage('括号使用访视错误,表达式中不允许空括号')
							}
							if (item.element !== this.dictionary.calculatorSymbol.genhao) {
								return this.setErrorMessage('括号内子表达式中不允许以此计算符号开头')
							}
						}
						if (
							this.prevElement.element === ')' &&
              (item.element === this.dictionary.calculatorSymbol.genhao ||
                item.element === '(' ||
                item.element === ')')
						) {
							return this.setErrorMessage(
								'右括号后不允许直接使用 ' + item.element + ' 符号'
							)
						}
						if (
							(this.prevElement.element === this.dictionary.calculatorSymbol.power2 ||
                this.prevElement.element === this.dictionary.calculatorSymbol.power3) &&
              (item.element === '(' ||
                item.element === this.dictionary.calculatorSymbol.power2 ||
                item.element === this.dictionary.calculatorSymbol.power3 ||
                item.element === this.dictionary.calculatorSymbol.genhao)
						) {
							return this.setErrorMessage(
								'平方立方后面不允许直接使用左括号,平方立方符号,根号'
							)
						}
						if (this.prevElement.element === this.dictionary.calculatorSymbol.genhao) {
							if (
								this.basicOperateList.indexOf(item.element) >= 0 ||
                item.element === this.dictionary.calculatorSymbol.power2 ||
                item.element === this.dictionary.calculatorSymbol.power3 ||
                item.element === '(' ||
               item.element === ')'
							) {
								return this.setErrorMessage('根号里暂不支持括号计算')
							}
						}
						if (
							this.basicOperateList.indexOf(this.prevElement.element) >= 0 &&
              !(item.element === this.dictionary.calculatorSymbol.genhao || item.element === '(')
						) {
							return this.setErrorMessage('计算符号后面不允许直接使用符号')
						}
						if (item.element === '(') {
							if (this.leftBracketNum === 1) {
								return this.setErrorMessage('不支持嵌套括号的计算')
							} else {
								this.leftBracketNum++
							}
						}
						if (item.element === ')') {
							if (this.leftBracketNum === 1) {
								this.leftBracketNum--
							} else {
								return this.setErrorMessage('括号不匹配,请检查表达式')
							}
						}
					}
				}
			}
			if (item.code !== 'num') {
				// 不是数字的话,重置小数点状态
				this.isNumberPoint = false
			}
			// 除以 0 检查
			return true
		},
		// 选择计算标签
		selectCalculatorItem(item, code) {
			const element = {
				code,
				element: item,
				visitCode: this.calculatorForm.visitCode,
				researchCode: this.getLocalsCode().researchCode,
				itemCode: code === 'item' ? item.itemCode : '',
				controlType: code === 'item' ? item.controlType : ''
			}
			// 1 先按规则进行进行简单的选择验证
			if (!this.validateElement(element)) return false
			// 2 根据element类型进行对应的处理
			this.calculateList.push(element)
			this.prevElement = this.calculateList[this.calculateList.length - 1]
		},
		// 关闭
		closeCalculatorDialog() {
			this.$emit('close')
		},
		// 计算类型改变
		calculateTypeChange(value, isInit) {
			if (!isInit) {
				this.delElement(this.dictionary.calculatorSymbol.clearBtn)
			}
			if (this.itemControlType === 'NTX') {
				if (value === 1) {
					this.variableList = this.variableCopyList.filter(
						(item) => this.numControlType.indexOf(item.controlType) >= 0
					)
				}
				if (value === 2) {
					this.variableList = this.variableCopyList.filter(
						(item) => this.dateControlType.indexOf(item.controlType) >= 0
					)
				}
			} else {
				if (this.itemControlType === 'TP') {
					this.variableList =	this.variableCopyList.filter(
						(item) => item.controlType === 'TP' || item.controlType === 'NTX'
					)
				} else if (
					this.itemControlType === 'DTP' ||
          this.itemControlType === 'DP'
				) {
					this.variableList =	this.variableCopyList.filter((item) => item.controlType !== 'TP')
				}
			}
		},
		// 日期单位改变
		dateUnitChange() {
			this.delElement(this.dictionary.calculatorSymbol.clearBtn)
		},
		// 获取访视
		getVisitList(visitCode) {
			this.isVisitFormFlag = false
			this.$api.visitForm.getVisitFormTree({ ...this.getLocalsCode() }).then((res) => {
				if (res && res.code === 200) {
					this.visitList = res.data || []
					let info = null
					if (visitCode) {
						info =	this.visitList.find(item => { return visitCode === item.code })
						this.isVisitFormFlag = !!(info)
					}
					info = info || this.visitList[0] || {}
					this.$set(this.calculatorForm, 'visitCode', info && info.code ? info.code : '')
				}
			})
		},
		// 获取访视条件列表
		getVisitFormCondition(parentCode) {
			const params = {
				...this.getLocalsCode(),
				parentCode,
				type: 'form'
			}
			this.$api.visitForm.getVisitFormListForCondition(params).then((res) => {
				if (res && res.code === 200) {
					this.visitFormList = res.data || []
					// const info = this.visitFormList.find(item => { return this.calculatorForm.formCode === item.code })
					let info = null
					if (this.isVisitFormFlag) {
						console.log(this.visitFormList)
						console.log(this.$route.params.id)
						info = this.visitFormList.find(item => { return this.$route.params.id === item.code })
						this.isVisitFormFlag = false
					}
					console.log(info)
					info = info || 	this.visitFormList[0] || {}
					this.$set(this.calculatorForm, 'formCode', info && info.code ? info.code : '')
					this.getVariableList(this.calculatorForm.formCode)
				} else {
					this.$set(this.calculatorForm, 'formCode', '')
				}
			})
		},
		// 获取变量列表
		getVariableList(formCode) {
			if (formCode) {
				const params = {
					...this.getLocalsCode(),
					formCode
					// isCalculate: 1
				}
				this.$api.itemStructure.list(params).then((res) => {
					this.variableCopyList = res.data || []
					this.calculateTypeChange(this.calculatorForm.type, true)
				})
			} else {
				this.variableCopyList = []
				this.variableList = []
			}
		}
	}
}
</script>
