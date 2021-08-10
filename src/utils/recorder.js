/*
 * @Author: your name
 * @Date: 2021-04-26 10:04:59
 * @LastEditTime: 2021-04-26 12:01:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\utils\recoder.js
 */
import Recorder from 'recorder-core'
// 需要使用到的音频格式编码引擎的js文件统统加载进来
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'
import { Message } from 'element-ui'
// 创建Recorder对象
const HZRecorder = function(config) {
	const recorder = Recorder({
		...config,
		type: 'mp3',
		sampleRate: 16000,
		bitRate: 16
	})
	// 打开
	this.open = function(callback) {
		recorder.open(function() {
			setTimeout(() => {
				callback(recorder)
			}, 10)
		}, function(msg, isUserNotAllow) {
			// 用户拒绝未授权或不支持
			Message.error(msg)
		})
	}
	this.start = function() {
		recorder.start()
	}
	this.close = function() {
		recorder.close()
	}
	this.stop = function(callback, errorCallback) {
		recorder.stop(
			function(bold, duration) {
				callback(bold, duration)
			},
			errorCallback)
	}
}
export default HZRecorder