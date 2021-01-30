import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import Qs from 'qs'
import store from '@/store'
import config from '@/config'

const service = axios.create({
	//baseURL: process.env.BASE_API, // api的base_url 如果前端跟后端不在同一个服务器上，可以使用
	// timeout: 15000 // 请求超时时间
})
//get请求时，进行参数转换
service.defaults.paramsSerializer = (params) => {
	return Qs.stringify(params)
}
//post请求，进行参数转换
// service.defaults.transformRequest = [(data) => { return Qs.stringify(data) }]
service.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
// 可以在请求头添加对应信息
service.interceptors.request.use(c => {
	let token = localStorage.getItem(config.token.accessKey)
	if (token) {
		c.headers['Authorization'] = "Bearer " + token // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	return c;
}, error => {
	// Do something with request error
	// console.log(error) // for debug
	Promise.reject(error)
})

/**
* respone拦截器
* 对请求返回的错误进统一处理
*/
service.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return error;
	}
)
//对结果对象进行处理
let resultHandler = async function (res, requestParams) {
	if (res.code > 1000) {
		switch (res.code) {
			case 1001:
			case 1003:
				MessageBox({
					title: "登录信息错误",
					message: res.message,
					type: 'error',
				}).then(res => {
					store.dispatch('clearAuth')
				})
				break;
			case 1002:
				let isSuccess = await store.dispatch("refreshToken");
				if (isSuccess) {
					return request(requestParams);
				} else {
					store.dispatch('clearAuth');
					// MessageBox({
					//   title: "登录信息错误",
					//   message: res.message,
					//   type: 'error',
					// }).then(res => {
					//   store.dispatch('clearAuth')
					// })
				}
				break;
			case 2001:
			case 2002:
				MessageBox({
					title: "授权错误",
					message: res.message,
					type: 'warning'
				})
				break;
			case 3001:
				MessageBox({
					title: "访问错误",
					message: res.message,
					type: 'error'
				})
				break;
			case 4001:
				MessageBox({
					title: "操作错误",
					message: res.message,
					type: 'error'
				})
				break;
			case 5001:
				MessageBox({
					title: "服务错误",
					message: res.message,
					type: 'error'
				})
				break;
		}
	}
	// code小于0的，为不可预料的错误码
	if (res.code < 0) {
		MessageBox({
			title: "访问异常",
			message: `<b>异常ID</b>：${res.data}<br/><b>异常消息</b>：${res.message}<br/>访问出现异常，请及时向系统管理员汇报，并将此异常ID给管理员。`,
			type: 'error',
			dangerouslyUseHTMLString: true
		})
	}
	return res;
}
//请求
function request(params) {
	return new Promise((resolve, reject) => {
		service(params).then(res => {
			if (params.responseType == "blob") {
				let reader = new FileReader();
				reader.onload = function () {
					try {
						var resJson = JSON.parse(this.result)
						resolve(resultHandler(resJson, params));
					} catch (err) {
						if (params.autoDownload) {
							var fileName = "";
							if (params.fileName) {
								fileName = params.fileName;
							} else {
								var disposition = res.headers("Content-Disposition");
								if (disposition && disposition.indexOf("filename") >= 0) {
									fileName = disposition.split(";")[1].split("filename=")[1];
									var fileNameUnicode = disposition.split("filename*=")[1];
									if (fileNameUnicode) {//当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
										fileName = decodeURIComponent(fileNameUnicode.split("''")[1]);
									}
								}
							}
							if (navigator.msSaveBlob) {
								// IE10+下载
								navigator.msSaveBlob(res, fileName);
							} else {
								const elink = document.createElement("a");
								elink.download = fileName;
								elink.style.display = "none";
								elink.target = "_blank";
								elink.href = URL.createObjectURL(res);
								document.body.appendChild(elink);
								elink.click();
								URL.revokeObjectURL(elink.href); // 释放URL 对象
								document.body.removeChild(elink);
							}
						}
						resolve(res);
					}
				};
				reader.readAsText(res);
				return;
			}
			resolve(resultHandler(res, params));
		}).catch(error => {
			alert(error.status + ":" + error.statusText);
			reject(error);
		});
	});
}
//下载
function download(params) {
	params.responseType = "blob";
	return service(params);
}
//上传
function upload(params) {
	return service(params);
}
export default {
	request,
	download,
	upload,
}
