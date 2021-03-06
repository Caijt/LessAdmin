import request from '@/utils/request';
import network from '@/utils/network';
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Token'
export default {
  getPageList(params) {
    return network.request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  deleteById(accessToken) {
    return network.request({
      url: BASE_URL + '/deleteById',
      method: 'post',
      data: accessToken
    })
  },
  //禁用token
  disableToken(accessToken) {
    return network.request({
      url: BASE_URL + '/DisableToken',
      method: 'post',
      params: { accessToken }
    })
  },
  //重载已禁用的token到缓存中
  reloadDisabledToken() {
    return network.request({
      url: BASE_URL + '/reloadDisabledToken'
    })
  },
  //获取全部已禁用的token
  getDisabledTokens() {
    return network.request({
      url: BASE_URL + '/GetDisabledTokens'
    })
  }
}