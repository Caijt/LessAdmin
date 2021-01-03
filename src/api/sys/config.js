import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Config'

export default {
  getList(params={}) {
    return request({
      url: BASE_URL + '/GetList',
      method: 'get',
      params
    });
  },
  save(data) {
    return request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  }
}