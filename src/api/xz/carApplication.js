import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/CarApplication'
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
  getById(id) {
    return request({
      url: BASE_URL + '/GetById',
      method: 'get',
      params:{
        id
      }
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