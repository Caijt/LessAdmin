import request from '@/utils/request'
import network from '@/utils/network'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Menu'
export default {
  getList(params) {
    return network.request({
      url: BASE_URL + '/GetList',
      method: 'get',
      params
    })
  },
  getCommonList(params) {
    return network.request({
      url: BASE_URL + '/GetCommonList',
      method: 'get',
      params
    })
  },
  save(data) {
    return network.request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  },
  deleteById(id) {
    return network.request({
      url: BASE_URL + '/deleteById',
      method: 'post',
      data: id
    })
  },
  getEditById(id) {
    return network.request({
      url: BASE_URL + '/GetEditById',
      params: {
        id
      }
    })
  }
}