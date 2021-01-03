import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/TaskTeam'
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
  getAssignTeamList(params) {
    return request({
      url: BASE_URL + '/GetAssignTeamList',
      method: 'get',
      params
    })
  },
  getTaskInAssignById(taskId) {
    return request({
      url: BASE_URL + '/GetTaskInAssignById',
      method: 'get',
      params: { taskId }
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
  getEditById(id) {
    return request({
      url: BASE_URL + '/getEditById',
      params: { id }
    })
  },
  getTaskQueryPageList(params) {
    return request({
      url: BASE_URL + '/GetTaskQueryPageList',
      method: 'get',
      params
    })
  },
}