import request from '@/utils/request'
import network from '@/utils/network'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Role'
export default {
  getPageList(params) {
    return network.request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getCommonOptionList(params) {
    return network.request({
      url: BASE_URL + '/GetCommonOptionList',
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
      url: BASE_URL + '/getEditById',
      params: { id }
    })
  },
  getRoleMenus(roleId) {
    return network.request({
      url: BASE_URL + '/GetRoleMenus',
      params: { roleId }
    })
  }
}