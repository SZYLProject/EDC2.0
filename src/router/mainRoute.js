/*
 * @Author: your name
 * @Date: 2021-03-18 18:11:42
 * @LastEditTime: 2021-08-06 14:11:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edcWeb\src\router\function.js
 */
export default [
	{
		path: '/main',
		redirect: '/research'
	}, {
		// 研究列表
		path: '/research',
		name: 'Research',
		component: resolve => require(['../views/research/Research.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'Research',
			isBorder: false
		}
	},
	{
		// 回收站
		path: '/recovery',
		name: 'Recovery',
		component: resolve => require(['../views/research/Research.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarTitle: '返回',
			navBarType: 'Recovery',
			isNavBarBack: true,
			goName: 'Research',
			isBorder: false
		}
	},
	{
		// 设置
		path: '/setting',
		name: 'Setting',
		component: resolve => require(['../views/research/Setting.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'Setting',
			isNavBarBack: true,
			goName: 'Research',
			isBorder: false,
			isGetResearch: true
		}
	},
	// {
	// 	// 日志详情
	// 	name: 'SystemLogDetail',
	// 	path: '/systemLogDetail',
	// 	component: resolve => require(['../views/log/SystemLogDetail.vue'], resolve),
	// 	meta: {
	// 		isNavbar: true,
	// 		navBarType: 'SystemLogDetail',
	// 		navBarTitle: '操作日志详情',
	// 		isNavBarBack: true,
	// 		isKeepRoute: true,
	// 		isBorder: true
	// 	}
	// },
	// {
	// 	// 日志
	// 	path: '/systemLog',
	// 	name: 'SystemLog',
	// 	component: resolve => require(['../views/log/SystemLog.vue'], resolve),
	// 	meta: {
	// 		isNavbar: true,
	// 		navBarType: 'SystemLog',
	// 		navBarTitle: '日志列表',
	// 		isNavBarBack: true,
	// 		isKeepRoute: true,
	// 		isBorder: true
	// 	}
	// },
	{ // 中心管理
		path: '/centerManagement',
		name: 'CenterManagement',
		component: resolve => require(['../views/management/CenterManagement.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'CenterManagement',
			isNavBarBack: true,
			isKeepRoute: true,
			isBorder: false,
			isManagement: true,
			isGetResearch: true
		}
	},
	{ // 表单录入
		path: '/formEntry',
		name: 'FormEntry',
		component: resolve => require(['../views/form/FormEntry.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'FormEntry',
			isNavBarBack: true,
			isKeepRoute: true,
			isBorder: true,
			isGetResearch: true
		}
	},
	{ // 访视列表
		path: '/visitList',
		name: 'VisitList',
		component: resolve => require(['../views/visit/VisitList.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'VisitList',
			isVisit: true,
			isNavBarBack: true,
			goName: 'Research',
			isBorder: false,
			isGetResearch: true
		}
	},
	{ // 表单设计
		path: '/formDesigin/:id',
		name: 'FormDesigin',
		component: resolve => require(['../views/form/FormDesigin.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'FormDesigin',
			isNavBarBack: true,
			isVisitDesigin: true,
			isKeepRoute: true,
			isBorder: true,
			isGetResearch: true
		}
	},
	{ // 表单预览
		path: '/formPreview/:id',
		name: 'FormPreview',
		component: resolve => require(['../views/form/FormPreview.vue'], resolve),
		meta: {
			isNavbar: true,
			navBarType: 'FormPreview',
			isNavBarBack: true,
			isVisitDesigin: true,
			isKeepRoute: true,
			isBorder: true,
			isGetResearch: true
		}
	},
	{
		path: '/environment',
		name: 'Environment',
		meta: {
			isNavbar: true
		},
		component: resolve => require(['../views/environment/Environment.vue'], resolve),
		children: [{ // 招募页面
			path: 'recruitment',
			name: 'Recruitment',
			component: resolve => require(['../views/environment/Recruitment.vue'], resolve),
			meta: {
				isNavbar: true,
				navBarType: 'Recruitment',
				isNavBarBack: true,
				isEnvironment: true,
				goName: 'Research',
				isBorder: true,
				isGetResearch: true
			}
		},
		{ // 主页
			path: 'home',
			name: 'Home',
			component: resolve => require(['../views/environment/Home.vue'], resolve),
			meta: {
				isNavbar: true,
				navBarType: 'Home',
				isNavBarBack: true,
				isEnvironment: true,
				goName: 'Research',
				isBorder: true,
				isGetResearch: true
			}
		},
		{ // 受试者列表
			path: 'testeeList',
			name: 'TesteeList',
			component: resolve => require(['../views/environment/TesteeList.vue'], resolve),
			meta: {
				isNavbar: true,
				navBarType: 'TesteeList',
				isNavBarBack: true,
				isEnvironment: true,
				goName: 'Research',
				isBorder: true,
				isGetResearch: true
			}
		},
		{ // 质疑列表
			path: 'queryList',
			name: 'QueryList',
			component: resolve => require(['../views/environment/QueryList.vue'], resolve),
			meta: {
				isNavbar: true,
				navBarType: 'QueryList',
				isNavBarBack: true,
				isEnvironment: true,
				goName: 'Research',
				isBorder: true,
				isGetResearch: true
			}
		},
		{ // 任务列表
			path: 'taskList',
			name: 'TaskList',
			component: resolve => require(['../views/environment/TaskList.vue'], resolve),
			meta: {
				isNavbar: true,
				navBarType: 'TaskList',
				isNavBarBack: true,
				isEnvironment: true,
				goName: 'Research',
				isBorder: true,
				isGetResearch: true
			}
		}
		]
	}
]
