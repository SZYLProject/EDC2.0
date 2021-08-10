/*
 * @Author: your name
 * @Date: 2021-03-30 16:11:48
 * @LastEditTime: 2021-03-30 17:19:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\assets\js\tableParams.js
 */
// 操作日志表头
export const systemOperateLog = [
	{ prop: 'logType', label: '日志类型', filter: 'logType' },
	{ prop: 'researchVersionNum', label: '操作版本' },
	{ prop: 'model', label: '操作模块' },
	{ prop: 'operateType', label: '操作类型', filter: 'operateType' },
	{ prop: 'operateDesc', label: '操作内容', hideMore: true },
	{ prop: 'userName', label: '操作人' },
	{ prop: 'operateDate', label: '操作日期' },
	{ prop: 'ip', label: 'IP地址' }
]
// 异常日志表头
export const systemExceptionLog = [
	{ prop: 'logType', label: '日志类型', filter: 'logType' },
	{ prop: 'researchCode', label: '研究code' },
	{ prop: 'actionClass', label: '后端调用类', hideMore: true },
	{ prop: 'actionMethod', label: '后端调用方法' },
	{ prop: 'userName', label: '操作人' },
	{ prop: 'operateDate', label: '操作日期' },
	{ prop: 'ip', label: 'IP地址' }
]