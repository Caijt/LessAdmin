import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/ContractImplementItem'
export default {
  getTaskPageList(params) {
    return request({
      url: BASE_URL + '/GetTaskPageList',
      method: 'get',
      params
    })
  },
  getList(params) {
    return request({
      url: BASE_URL + '/GetList',
      method: 'get',
      params
    })
  },
  getTeamList(params) {
    return request({
      url: BASE_URL + '/GetTeamList',
      method: 'get',
      params
    })
  },
  getTeamEmployeeList(params) {
    return request({
      url: BASE_URL + '/GetTeamEmployeeList',
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
  getDetailsById(id) {
    return request({
      url: BASE_URL + '/GetDetailsById',
      params: { id }
    })
  }
}