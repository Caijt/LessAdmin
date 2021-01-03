import request from '@/utils/request'
import baseUrl from './baseUrl'

const BASE_URL = baseUrl + '/Common'
export default {
  getGuid() {
    return request({
      url: BASE_URL + '/GetGuid'
    })
  },
  getConfigList(params = {}) {
    return request({
      url: BASE_URL + '/GetConfigList',
      method: 'get',
      params
    })
  },
  getConfigValueByKey(key) {
    return request({
      url: BASE_URL + '/GetConfigValueByKey',
      method: 'get',
      params: {
        key
      }
    })
  }
}