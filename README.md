<!--
 * @Author: your name
 * @Date: 2021-05-17 09:10:22
 * @LastEditTime: 2021-06-24 09:51:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\README.md
-->
# EDC2.0

> 临床医疗数据平台

## 1. 运行步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run server

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## 2. 文件结构


├── public                  
├── src                      // 配置
│   ├── assets
│   │   └── config.js
│   ├── components
│   │   └── config.js            
│   ├── cookie
│   │   └── config.js      
│   ├── directive
│   │   └── config.js            
│   ├── filters
│   │   └── config.js            
│   ├── local
│   │   └── config.js           
│   ├── register
│   │   └── config.js            // 模块
│   ├── request
│   │   └── config.js            // 模块
│   ├── router
│   │   └── config.js            // 模块
│   ├── rule
│   │   └── config.js            // 模块
│   ├── store
│   │   └── config.js            // 模块
│   ├── utils
│   │   └── config.js            // 模块
│   ├── utilsComponents
│   │   └── config.js            // 模块
│   ├── views
│   │   ├── environment                    
│   │   │   ├──Environment.vue             // 环境模块的组件
│   │   │   ├──Home.vue                    // 主页模块
│   │   │   ├──QueryList.vue               // 质疑列表模块
│   │   │   ├──Recruitment.vue             // 招募页面模块
│   │   │   ├──TaskList.vue                // 任务列表模块
│   │   │   └──TesteeList.vue              // 受试者列表模块
│   │   ├──  error
│   │   │   └──404.vue                     // 404模块
│   │   ├──  form
│   │   │   ├──FormDesigin.vue             // 表单设计模块
│   │   │   ├──FormEntry.vue               // 表单录入模块
│   │   │   └──FormPreview.vue             // 表单预览模块
│   │   ├──  log
│   │   │   ├──SystemLog.vue               // 日志列表模块
│   │   │   └──SystemLogDetail.vue         // 日志详情模块
│   │   ├──  login
│   │   │   └──Login.vue                   // 登录模块
│   │   ├──  management
│   │   │   └──CenterManagement.vue        // 中心管理模块
│   │   ├──  research
│   │   │   ├──Research.vue                // 研究列表（回收站）模块
│   │   │   └──Setting.vue                 // 设置模块
│   │   ├──  visit
│   │   │   └──VisitList.vue               // 访视列表模块
│   │   └── Main.vue                       //  主模块组件（除去404、login等）
│   ├── App.vue                            // 根组件
│   └── main.js                            // 入口js
├── README.md                              // help
└── vue.config.js                          // 配置
