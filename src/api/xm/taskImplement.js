import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/TaskImplement'
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
  getImplementRecordList(params) {
    return request({
      url: BASE_URL + '/GetImplementRecordList',
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
  getTaskAttendanceRecordPageList(params) {
    return request({
      url: BASE_URL + '/GetTaskAttendanceRecordPageList',
      method: 'get',
      params
    })
  },
}