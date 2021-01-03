import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Role'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getCommonOptionList(params) {
    return request({
      url: BASE_URL + '/GetCommonOptionList',
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
  getEditById(id) {
    return request({
      url: BASE_URL + '/getEditById',
      params: { id }
    })
  },
  getRoleMenus(roleId) {
    return request({
      url: BASE_URL + '/GetRoleMenus',
      params: { roleId }
    })
  }
}