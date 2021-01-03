import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/WageAccount'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
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
  getEditById(id) {
    return request({
      url: BASE_URL + '/GetEditById',
      params: { id }
    });
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/deleteById',
      method: 'post',
      data: id
    })
  }
}