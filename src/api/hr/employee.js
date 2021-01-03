import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Employee'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getPageListInCommon(params) {
    return request({
      url: BASE_URL + '/GetPageListInCommon',
      method: 'get',
      params
    })
  },
  getOptionList(params) {
    return request({
      url: BASE_URL + '/GetOptionList',
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
  getById(id) {
    return request({
      url: BASE_URL + '/getById',
      params: { id }
    })
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/deleteById',
      method: 'post',
      data: id
    })
  }
}