import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Api'

export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getCommonPageList(params) {
    return request({
      url: BASE_URL + '/GetCommonPageList',
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
  checkExistByName(name, id) {
    return request({
      url: BASE_URL + '/CheckExistByName',
      method: 'get',
      params: {
        name, id
      }
    })
  },
  checkExistByPath(path, id) {
    return request({
      url: BASE_URL + '/CheckExistByPath',
      method: 'get',
      params: {
        path, id
      }
    })
  }
}