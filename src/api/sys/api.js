import request from '@/utils/request'
import network from '@/utils/network'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Api'

export default {
  getPageList(params) {
    return network.request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getCommonPageList(params) {
    return network.request({
      url: BASE_URL + '/GetCommonPageList',
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
  checkExistByName(name, id) {
    return network.request({
      url: BASE_URL + '/CheckExistByName',
      method: 'get',
      params: {
        name, id
      }
    })
  },
  checkExistByPath(path, id) {
    return network.request({
      url: BASE_URL + '/CheckExistByPath',
      method: 'get',
      params: {
        path, id
      }
    })
  }
}