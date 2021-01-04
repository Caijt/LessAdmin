import request from '@/utils/request'
import network from '@/utils/network'
import baseUrl from './baseUrl'

const BASE_URL = baseUrl + '/Auth'
export default {
  login(data) {
    return network.request({
      url: BASE_URL + '/Login',
      method: 'post',
      data
    })
  },
  logout(){
    return network.request({
      url: BASE_URL + '/Logout'
    })
  },
  getAuthInfo() {
    return network.request({
      url: BASE_URL + '/GetAuthInfo',
      method: "get"
    })
  },
  refreshToken(data) {
    return network.request({
      url: BASE_URL + '/RefreshToken',
      method: "post",
      data
    })
  },
  changePassword(data){
    return network.request({
      url: BASE_URL + '/ChangePassword',
      method: "post",
      data
    })
  },
  getLoginLog(params = {}){
    return network.request({
      url: BASE_URL + '/GetLoginLog',
      params
    })
  }
}