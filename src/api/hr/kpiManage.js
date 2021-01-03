import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/KpiWorkflowTodo'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
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
      data:id
    })
  },
  getScoreList(params) {
    return request({
      url: BASE_URL + '/GetScoreList',
      method: 'get',
      params
    })
  },
  getLogList(params) {
    return request({
      url: BASE_URL + '/getLogList',
      method: 'get',
      params
    })
  }
}