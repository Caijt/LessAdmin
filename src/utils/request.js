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
  console.log(error) // for debug
  Promise.reject(error)
})


/**
* respone拦截器
* 对请求返回的错误进统一处理
*/
service.interceptors.response.use(
  async response => {
    let res = response.data;
    if (response.request.responseType == "blob") {
      if (response.headers["content-type"].indexOf("application/json") == -1) {
        return res;
      }
      async function convertJson() {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = e => {
            resolve(JSON.parse(e.target.result));
          };
          reader.readAsText(res);
        })
      }
      res = await convertJson();
    }

    if (res.code == undefined) {
      return res
    }
	  /**
	  * 对接口请求成功返回的错误进统一处理
		*/
    // code大于1000的为全局错误码，
    if (res.code > 1000) {
      console.log(res)
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
            return service(response.config);
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
      return Promise.reject(res)
    }

    // code小于0的，为不可预料的错误码
    if (res.code < 0) {
      console.log(res)
      MessageBox({
        title: "访问异常",
        message: "<b>异常ID</b>：" + res.data + "<br/>访问出现异常，请及时向系统管理员汇报，并将此异常ID给管理员。",
        type: 'error',
        dangerouslyUseHTMLString: true
      })
      return Promise.reject(res)
    }
    // code为0视为正常，也有一些局部需要为1或者2，然后到页面具体处理的
    return res
  },
  error => {
  	/*
  	* 对接口请求失败进行统一处理
  	*/
    console.log('err:' + error)// for debug
    MessageBox({
      title: "服务器出错",
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
