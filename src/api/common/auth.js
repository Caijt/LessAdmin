import request from '@/utils/request'
import baseUrl from './baseUrl'

const BASE_URL = baseUrl + '/Auth'
export default {
  login(data) {
    return request({
      url: BASE_URL + '/Login',
      method: 'post',
      data
    })
  },
  logout(){
    return request({
      url: BASE_URL + '/Logout'
    })
  },
  getAuthInfo() {
    return request({
      url: BASE_URL + '/GetAuthInfo',
      method: "get"
    })
  },
  refreshToken(data) {
    return request({
      url: BASE_URL + '/RefreshToken',
      method: "post",
      data
    })
  },
  changePassword(data){
    return request({
      url: BASE_URL + '/ChangePassword',
      method: "post",
      data
    })
  },
  getLoginLog(params = {}){
    return request({
      url: BASE_URL + '/GetLoginLog',
      params
    })
  }
}