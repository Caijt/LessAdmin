import request from '@/utils/request'
import network from '@/utils/network'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Config'

export default {
  getList(params={}) {
    return network.request({
      url: BASE_URL + '/GetList',
      method: 'get',
      params
    });
  },
  save(data) {
    return network.request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  }
}