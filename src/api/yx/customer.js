import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Customer'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getById(id) {
    return request({
      url: BASE_URL + '/GetById',
      method: 'get',
      params: {
        id
      }
    })
  },
  // verifyCustomer(params) {
  //   return request({
  //     url: BASE_URL + '/verifyCustomer',
  //     method: 'get',
  //     params
  //   })
  // },
  save(data) {
    return request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/DeleteById',
      method: 'post',
      data: id
    })
  }
}