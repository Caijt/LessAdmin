import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Task'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getImplementItemPageList(params) {
    return request({
      url: BASE_URL + '/GetImplementItemPageList',
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
  assignTask(data) {
    return request({
      url: BASE_URL + '/AssignTask',
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
  getAssignTaskById(id) {
    return request({
      url: BASE_URL + '/GetAssignTaskById',
      params: { id }
    })
  }
}