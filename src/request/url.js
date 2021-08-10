/*
 * @Author: your name
 * @Date: 2021-04-22 11:38:12
 * @LastEditTime: 2021-08-06 09:33:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\request\url.js
 */
let baseUrl = '' // 默认url
switch (process.env.NODE_ENV) {
    case 'development': // 开发环境
        baseUrl = 'http://172.16.115.229:8083' // 周亮
            //baseUrl = 'http://172.16.115.60:8083'// 卫良
            // baseUrl = 'http://152.136.194.153:8080' // 153
        break
    case 'production':
        //baseUrl = 'http://10.131.101.108:8080' // 生产环境
        break
    case 'test':
        baseUrl = '' // 测试环境
        break
}
export { baseUrl }