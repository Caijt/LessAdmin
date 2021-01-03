import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Qualification'
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
      data: id
    })
  },
  getById(id) {
    return request({
      url: BASE_URL + '/getById',
      params: { id }
    })
  }
}