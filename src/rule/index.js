/*
 * @Author: your name
 * @Date: 2021-03-25 16:20:26
 * @LastEditTime: 2021-07-22 10:20:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\rule\rule.js
 */
const filterReg = {
	ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
	plusnum: /^\d+(\.\d+)?$/, // 正数
	num: /^[1-9][0-9]*$/, // 正整数
	datenum: /^((0?[1-9])|((1|2)[0-9])|30|31)$/, // 日期数
	port: /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, // 端口
	phone: /^1[34578][0-9]{9}$/, // 手机
	idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	mobile: /^([0-9]{2,3}-)?([0-9]{3,4}-)?([0-9]{7,8})$|^[1][0-9]{10}$/,
	phoneOrMobile: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, // 手机或者座机
	hour: /^([0-1]+[0-9]|([0-9])|((1)[0-9])|20|21|22|23)$/,
	minute: /^([0-1]+[0-9]|([0-9])|((1)[0-9])|((2)[0-9])|((3)[0-9])|((4)[0-9])|((5)[0-9]))$/,
	numberEnglish: /^[0-9a-zA-Z]{1,255}$/,
	age: /^\d{1,3}$/,
	patientNumber: /^[0-9a-zA-Z]{1,25}$/, // 病案号
	seekNumber: /^[0-9a-zA-Z]{1,25}$/, // 就诊卡号
	zero: /^[0]{1,9}$/
}
/**
name:名称（必填）（必填项验证）
flag:区分选择和输入（输入----true；选择----false）
type：类型（用于格式校验）
min：最小长度
max：最大长度
* * */
/*
demo：
密码校验（密码长度一般设置为16）： this.filterRules('密码', true, 16, 1),
设备名称（长度设置为50）: this.filterRules('设备名称', true, 50, 1),
*/
const filterRules = ({ name, type, required, message, max, min, ruleType, trigger, validator }, extraRule = []) => {
	const rules = []
	if (type === 1) {
		rules.push({
			required: required,
			message: message || '请输入' + name,
			trigger: trigger || 'blur'
		}, {
			required: required,
			message: message || '请输入' + name,
			trigger: trigger || 'change'
		}, {
			required: required,
			pattern: /\S/,
			message: name + '不能为空格',
			trigger: trigger || 'blur'
		}
		)
	} else if (type === 2) {
		rules.push({
			required: required,
			message: message || '请选择' + name,
			trigger: trigger || 'change'
		})
	}
	if (validator) {
		rules.push({
			required: required,
			trigger: trigger || 'blur',
			validator
		})
	}
	if (max) {
		rules.push({
			min: 1,
			max: max,
			message: name + '最多输入' + max + '个字符',
			trigger: 'blur'
		})
	}
	if (min && max) {
		rules.push({
			min: min,
			max: max,
			message: name + '长度在' + min + '至' + max + '之间',
			trigger: 'blur'
		})
	}
	if (ruleType) {
		switch (ruleType) {
		case 'zero':
			rules.push({
				pattern: /^[0]{1,9}$/,
				message: '只允许输入数字0'
			})
			break
		case 'seekNumber':
			rules.push({
				pattern: filterReg.seekNumber,
				message: '请输入正确的就诊卡号'
			})
			break
		case 'patientNumber':
			rules.push({
				pattern: filterReg.patientNumber,
				message: '请输入正确的病案号'
			})
			break
		case 'age':
			rules.push({
				pattern: filterReg.age,
				message: '请输入正确的年龄'
			})
			break
		case 'phoneOrMobile':
			rules.push({
				pattern: filterReg.phoneOrMobile,
				message: '请输入正确的手机号码或者座机号'
			})
			break
		case 'numberEnglish':
			rules.push({
				pattern: filterReg.numberEnglish,
				message: '请输入英文和数字'
			})
			break
		case 'thanZero':
			rules.push({
				pattern: /^[0-9]{1,255}$/,
				message: '请输入不小于零的数字'
			})
			break
		case '255numCode':
			rules.push({
				pattern: /^[A-Za-z0-9]{1,255}$/,
				message: '请输入 255 位以内数字或字母'
			})
			break
		case '12numCode':
			rules.push({
				pattern: /^[A-Za-z0-9]{1,12}$/,
				message: '请输入 12 位以内数字或字母'
			})
			break
		case '20numCode':
			rules.push({
				pattern: /^[A-Za-z0-9]{1,20}$/,
				message: '请输入 20 位以内数字或字母'
			})
			break
		case 'hour':
			rules.push({
				pattern: filterReg.hour,
				message: name + '必须在0-23之间'
			})
			break
		case 'minute':
			rules.push({
				pattern: filterReg.minute,
				message: name + '必须在0-59之间'
			})
			break
		case 'tab':
			rules.push({
				pattern: /\S/,
				message: name + '不能为空格',
				trigger: 'blur'
			})
			break
		case 'zeronum':
			rules.push({
				pattern: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/,
				message: name + '必须为整数',
				trigger: 'blur'
			})
			break
		case 'pwd':
			rules.push({
				pattern: /^[a-zA-Z0-9!@#$%^&*]/,
				message: '密码由字母、数字、特殊符号组成',
				trigger: 'blur'
			})
			break
		case 'email': // 邮箱
			rules.push({
				type: 'email',
				message: '请输入正确的邮箱地址'
			})
			break
		case 'mobile': // 电话
			rules.push({
				pattern: filterReg.mobile,
				message: '请输入正确的电话号码'
			})
			break
		case 'ip': // ip
			rules.push({
				pattern: filterReg.ip,
				message: '请输入正确的IP地址'
			})
			break
		case 'plusnum': // 正数
			rules.push({
				pattern: filterReg.plusnum,
				message: name + '必须为正数'
			})
			break
		case 'num': // 正整数
			rules.push({
				pattern: filterReg.num,
				message: name + '必须为正整数'
			})
			break
		case 'datenum': // 日期数
			rules.push({
				pattern: filterReg.datenum,
				message: name + '必须在1-31之间'
			})
			break
		case 'address': // 地址（开始或者结束）
			rules.push({
				pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
				message: name + '必须在1~65535之间'
			})
			break
		case 'twentyNum': // 20个数（开始或者结束）
			rules.push({
				pattern: /^\d{20}$/,
				message: name + '必须为20个数字'
			})
			break
		case '1-20': // 1-20
			rules.push({
				pattern: /^(?!0)\d{1,20}$/,
				message: name + '必须在1-20之间'
			})
			break
		case '1-120': // 1-120
			rules.push({
				pattern: /^[1-9]\d?$|^1[01]\d$|^120$/,
				message: name + '必须在1-120之间'
			})
			break
		case '1-200': // 1-200
			rules.push({
				pattern: /^[1-9]$|^[1-9]\d$|^1\d{2}$|^200$/,
				message: name + '必须在1-200之间'
			})
			break
		case '1-2000': // 1-2000
			rules.push({
				pattern: /^[1-9]$|^[1-9]\d$|^[1-9]\d{2}$|^1\d{3}$|^2000$/,
				message: name + '必须在1-2000之间'
			})
			break
		case 'week': // 星期
			rules.push({
				type: 'array',
				required: true,
				message: '请至少选择一个星期'
			})
			break
		case 'port': // 端口
			rules.push({
				pattern: filterReg.port,
				message: '端口必须在1~65535之间'
			})
			break
		case 'phone': // 手机
			rules.push({
				pattern: filterReg.phone,
				message: '请输入正确的手机号码'
			})
			break
		case 'idCard':
			rules.push({
				pattern: filterReg.idCard,
				message: '请输入正确的身份证号码'
			})
			break
		case 'special':
			rules.push({
				pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
				message: name + '不能包含空格或特殊字符'
			})
			break
		default:
			rules.push({})
			break
		}
	}
	return [...rules, ...extraRule]
}
export {
	filterRules,
	filterReg
}
