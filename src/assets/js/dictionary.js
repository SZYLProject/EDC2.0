/*
 * @Author: your name
 * @Date: 2021-03-05 15:02:46
 * @LastEditTime: 2021-08-06 14:34:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\assets\js\dictionary.js
 */
// 添加状态
export const isAddFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 账户状态
export const accountFlag = [
	{ label: '冻结', value: 0 },
	{ label: '激活', value: 1 }
]
// 小数类型
export const allowDecimalType = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 计算类型
export const calculateType = [
	{ label: '人工录入', value: 0, flag: true },
	{ label: '逻辑计算', value: 1, flag: false },
	{ label: '默认值', value: 2, flag: true }
]
// 计算日期类型
export const calculateDateUnitType = [
	{ label: '年', value: 1 },
	{ label: '月', value: 2 },
	{ label: '日', value: 3 },
	{ label: '小时', value: 4 },
	{ label: '分钟', value: 5 }
]
// 中心状态
export const centerFlag = [
	{ label: '未启用', value: 0, color: '#fc7a58' },
	{ label: '启用', value: 1, color: '#51CF66' }
]
// 条件类型
export const conditionType = [
	{ label: '等于', value: '==', flag: true },
	{ label: '不等于', value: '!=', flag: true },
	{ label: '小于', value: '<', flag: false },
	{ label: '小于等于', value: '<=', flag: false },
	{ label: '大于', value: '>', flag: false },
	{ label: '大于等于', value: '>=', flag: false },
	{ label: '介于', value: '[]', flag: false },
	{ label: '包含', value: '{}', flag: false },
	{ label: '不包含', value: '{/}', flag: false }
]
// 受试者编号创建
export const createFlagType = [
	{ label: '手动生成', value: 0 },
	{ label: '系统生成', value: 1 }
]
// 位置类型
export const directionType = [
	{ label: '横向', value: 0 },
	{ label: '纵向', value: 1 }
]
// 环境基础类型（发布需要用）
export const environmentInitialType = 0
// 环境类型
export const environmentType = [
	{ label: '测试环境', value: 1 },
	{ label: '生产环境', value: 2 }
]
// ePRO
export const eproFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 表单类别
export const formType = [
	{ label: '自定义', value: 0 }
	// {label: '不良事件', value: 1},
	// {label: '合并用药', value: 2},
	// {label: '问卷量表', value: 3},
	// {label: '医疗设备', value: 4},
	// {label: '实验室检查', value: 5},
	// {label: '其他', value: 6}
]
// 日志类型
export const logType = [
	{ label: '操作日志', value: 1 },
	{ label: '异常日志', value: 2 }
]
// 任务状态说明
export const taskFlag = [
	{ label: '正在导出，完成后可下载', iconfont: 'iconyunshangchuan', value: 0, color: '#49a4ff' },
	{ label: '导出成功', value: 1, iconfont: 'icondaochuchenggong', color: '#51CF66' },
	{ label: '导出失败', value: 2, iconfont: 'iconshibai', color: '#fc7a58' }
]
// 质疑状态说明
export const queryFlag = [
	{ label: '新增质疑', value: 11, color: '#49a4ff' },
	{ label: '等待我回复', value: 12, color: '#f8bf32' },
	{ label: '等待他人回复', value: 13, color: '#0747b0' },
	{ label: '已关闭质疑', value: 14, color: '#fc7a58' }
]
// 操作类型
export const operateType = [
	{ label: '增加', value: 1 },
	{ label: '删除', value: 2 },
	{ label: '查找', value: 3 },
	{ label: '修改', value: 4 }
]
// 方案创建
export const planCreateFlagType = [
	{ label: '顺序', value: 0 },
	{ label: '随机', value: 1 }
]
// 医患关系类型
export const patientRelationType = [
	{ label: '夫妻', value: 1 },
	{ label: '子女', value: 2 },
	{ label: '父母', value: 3 },
	{ label: '兄弟', value: 4 },
	{ label: '姐妹', value: 5 },
	{ label: '其他', value: 6 }
]
// 是否sdv类型
export const sdvFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// sdv类型
export const sdvType = [
	{ label: '未开始', value: 1, color: '#fc7a58' },
	{ label: '进行中', value: 2, color: '#e6a23c' },
	{ label: '已完成', value: 3, color: '#51CF66' }
]
// 范围核查
export const scopeValidType = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 性别类型
export const genderType = [
	{ label: '男', value: 1 },
	{ label: '女', value: 2 }
]
// 提交状态
export const submitType = [
	{ label: '保存', value: 2 },
	{ label: '提交', value: 3 }
]
// 标题类型
export const titleType = [
	{ label: '一级标题', value: 18 },
	{ label: '二级标题', value: 16 },
	{ label: '三级标题', value: 14 }
]
// 是否只读类型
export const readonlyFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 研究类型
export const researchType = [
	{ label: '干预型', value: 0 },
	{ label: '观察型', value: 1 }
]
// 研究操作状态类型
export const researchOperateStatus = [
	{ label: '正常', value: 0 },
	{ label: '删除', value: 1 },
	{ label: '归档', value: 2 }
]
// 研究状态类型
export const researchStatus = [
	{ label: '设计中', value: 1, color: '#f8bf32' },
	{ label: '已发布', value: 2, color: '#51CF66' }
]
// 重复类型
export const repeatType = [
	{ label: '可重复', value: 1 },
	{ label: '不可重复', value: 0 }
]
// 重复类型
export const repeatFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 是否需要类型
export const requiredFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 备注状态
export const remarkFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 计算类型
export const ruleCalculateType = [
	{ label: '数值', value: 1 },
	{ label: '时间间隔', value: 2 }
]
// 用户状态
export const userFlag = [
	{ label: '未启用', value: 0, color: '#fc7a58' },
	{ label: '启用', value: 1, color: '#51CF66' }
]
// 用户归属
export const userAscription = [
	{ label: '研究', value: 1 },
	{ label: '中心', value: 2 }
]
// 访视类型
export const visitType = [
	{ label: '计划', value: 1 },
	{ label: '非计划', value: 0 },
	{ label: '通用', value: 2 }
]
// 访视类型
export const visitStatusType = [
	{ label: '未开始', value: 1, img: require('@/assets/img/button/bluetheme/noStart.png') },
	{ label: '进行中', value: 2, img: require('@/assets/img/button/bluetheme/enter.png') },
	{ label: '已完成', value: 3, img: require('@/assets/img/button/bluetheme/complete.png') },
	{ label: '跳过', value: 4, img: require('@/assets/img/button/bluetheme/jump.png') }
]
// 是否显示类型
export const visibleFlag = [
	{ label: '是', value: 1 },
	{ label: '否', value: 0 }
]
// 计算表示
export const calculatorSymbol = {
	power2: '²',
	power3: '³',
	genhao: '√￣',
	deleteBtn: 'DEL',
	clearBtn: 'C'
	// addBtn:'+',
	// addBtn:'-',
	// addBtn:'*',
	// addBtn:'/',
	// addBtn:'(',
	// addBtn:')',
}
// 提示
export const trailTip = {
	1: '首次提交数据',
	2: '添加数据',
	3: '修改数据 ',
	4: '添加备注',
	5: '删除备注'
}
// 可以计算组件类型
export const calculateControlList = ['NTX', 'DP', 'TP', 'DTP']
