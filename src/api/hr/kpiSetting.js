import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/KpiSetting'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  save(data) {
    return request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/deleteById',
      method: 'post',
      data:id
    })
  },
  getNodeList(params) {
    return request({
      url: BASE_URL + '/getNodeList',
      method: 'get',
      params
    })
  },
  getItemList(params) {
    return request({
      url: BASE_URL + '/getItemList',
      method: 'get',
      params
    })
  },
}