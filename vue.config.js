const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const TerserPlugin = require('terser-webpack-plugin')// 代码打包之后取出console.log压缩代码
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // Webpack包文件分析器
const resolve = (dir) => path.join(__dirname, dir)
const outputDir = 'dist'
module.exports = {
	// 基本路径
	// baseUrl: baseUrl,
	publicPath: './', // vue-cli3.3新版本
	// 输出文件目录
	outputDir: outputDir,
	// eslint-loader 是否在保存的时候检查
	lintOnSave: true,
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
	// 以多页模式构建应用程序。
	// 是否使用包含运行时编译器的 Vue 构建版本
	runtimeCompiler: false,
	// 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
	parallel: require('os').cpus().length > 1,
	// 生产环境是否生成 sourceMap 文件，一般情况不建议打开
	// map文件是js文件压缩后，文件的变量名替换对应、变量所在位置等原信息数据文件,对js压缩过程的记录，如浏览器支持，可以通过map文件还原文件到未压缩之前
	productionSourceMap: false,
	// webpack配置
	// 对内部的 webpack 配置进行更细粒度的修改
	chainWebpack: config => {
		// 修复HMR
		config.resolve.symlinks(true)
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			// .set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('layout', resolve('src/layout'))
			.set('base', resolve('src/base'))
			.set('static', resolve('src/static'))
			// .set('@src', resolve('../src/assets'))
			.set('assets', resolve('./src/assets'))
		if (isProduction) { // 为生产环境修改配置
			// 删除预加载
			config.plugins.delete('preload')
			config.plugins.delete('prefetch')
			// 压缩代码
			config.optimization.minimize(true)
			// 分割代码
			config.optimization.splitChunks({
				chunks: 'all'
			})
		} else { // 为开发环境修改配置...
		}
	},
	// 调整 webpack 配置
	configureWebpack: config => {
		// 开发环境
		const pluginsDev = [
		]
		// 生产
		const pluginsPro = [
			new TerserPlugin({
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {
						drop_console: true,
						drop_debugger: false,
						pure_funcs: ['console.log'] // 移除console
					}
				}
			}),
			new BundleAnalyzerPlugin({ // js包分析
				// analyzerHost: '',
				analyzerPort: '8789'
			})
		]
		if (isProduction) {
			config.plugins = [...config.plugins, ...pluginsPro]
		} else {
			config.plugins = [...config.plugins, ...pluginsDev]
		}
	},
	transpileDependencies: [
	],
	css: {
		// 启用 CSS modules
		requireModuleExtension: true,
		// 是否使用css分离插件
		extract: true,
		// css预设器配置项
		loaderOptions: {
			sass: {
				prependData: '$baseUrl: "/";@import \'@/assets/css/common.scss\';'
			}
		}
	},
	devServer: {
		// host: "0.0.0.0",
		port: 52071, // 端口号
		https: false, // https:{type:Boolean}
		open: true, // 自动启动浏览器
		hotOnly: true, // 热更新
		compress: true
		// proxy: {
		//     '/api': {
		//         // target: 'http://192.168.0.56:9527',
		//         target: 'http://192.168.0.68:8765',
		//         changeOrigin: true
		//         // pathRewrite: {
		//         //   '^/apis/api': '/api'
		//         // }
		//     }
		// }
	}
}
