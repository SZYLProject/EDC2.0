/*
 * @Author: your name
 * @Date: 2021-04-06 10:11:13
 * @LastEditTime: 2021-08-06 16:48:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\assets\js\meta.js
 */
// 更多
export const environmentMoreNav = [
	{
		title: '提交数据',
		iconfont: 'iconziyuan1',
		list: [{
			label: '受试者列表',
			value: '1',
			flag: false
		},
		{
			label: '计划访视',
			value: '2',
			flag: false
		},
		{
			label: '添加受试者',
			value: '',
			flag: false
		},
		{
			label: '查看访视',
			value: '4',
			flag: false
		},
		{
			label: '质疑管理',
			value: '5',
			flag: false
		},
		{
			label: '数据导入',
			value: '6',
			flag: false
		}
		]
	},
	{
		title: '管理数据',
		iconfont: 'iconshujuguanli',
		list: [{
			label: '稽查痕迹',
			value: '1',
			flag: false
		},
		{
			label: '中心管理',
			value: 'CenterManagement',
			flag: true
		},
		{
			label: '验证规则',
			value: '',
			flag: true
		},
		{
			label: 'CRF管理',
			value: '4',
			flag: true
		},
		{
			label: '查看研究',
			value: '5',
			flag: true
		},
		{
			label: '源数据验证',
			value: '6',
			flag: true
		}
		]
	},
	{
		title: '导出数据',
		iconfont: 'icondaochushuju',
		list: [{
			label: '创建数据集',
			value: '1',
			flag: true
		},
		{
			label: '导出数据集',
			value: '2',
			flag: true
		},
		{
			label: '导出CRF',
			value: '3',
			flag: true
		},
		{
			label: '导出报告',
			value: '4',
			flag: true
		}
		]
	},
	{
		title: '系统日志',
		iconfont: 'iconxitongrizhi1',
		list: [
			{
				label: '操作日志',
				value: 'SystemLog',
				flag: false
			}
		]
	}
]
export const componentList = [{
	itemName: '单行文本',
	subName: '单行文本',
	controlType: 'TB',
	id: 1,
	fixed: false,
	icon: 'iconwenbendanhangwenben'
},
{
	itemName: '多行文本',
	subName: '多行文本',
	controlType: 'TA',
	fixed: false,
	id: 2,
	icon: 'iconwenbenduohangwenben'
}, {
	itemName: '单选题',
	subName: '单选题',
	controlType: 'RB',
	fixed: false,
	id: 3,
	icon: 'icondanxuanti'
},
{
	itemName: '下拉单选',
	subName: '下拉单选',
	controlType: 'SEL_SIG',
	id: 4,
	fixed: false,
	icon: 'iconxialakuang'
}, {
	itemName: '数字题',
	subName: '数字题',
	controlType: 'NTX',
	fixed: false,
	id: 5,
	icon: 'iconshuzi'
}, {
	itemName: '多选题',
	subName: '多选题',
	controlType: 'CB',
	fixed: false,
	id: 6,
	icon: 'iconxuanze1'
}, {
	itemName: '时间选择器',
	subName: '时间选择器',
	controlType: 'TP',
	fixed: false,
	id: 7,
	icon: 'iconshijianxuanze1'
}, {
	itemName: '日期选择器',
	subName: '日期选择器',
	controlType: 'DP',
	fixed: false,
	id: 8,
	icon: 'iconshijianxuanze'
}, {
	itemName: '日期时间选择器',
	subName: '日期时间选择器',
	controlType: 'DTP',
	fixed: false,
	id: 9,
	icon: 'iconriqishijian'
}, {
	itemName: '地址选择器',
	subName: '地址选择器',
	controlType: 'ADSEL',
	fixed: false,
	id: 10,
	icon: 'icondizhi'
},
// {
//     itemName:'position',
//     subName:'定位',
//     controlType:'AD',
//     fixed: false,
//     id:11,
// },
{
	itemName: '文件上传',
	subName: '文件上传',
	controlType: 'SUF',
	fixed: false,
	id: 12,
	icon: 'iconwenjianshangchuan1'
},
{
	itemName: '文本标题',
	subName: '文本标题',
	controlType: 'LB',
	fixed: false,
	id: 13,
	icon: 'icondapingxitongicon-'
}
]
