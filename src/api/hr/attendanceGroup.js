import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/AttendanceGroup'
export default {
  weekNames: ["周一", "周二","周三", "周四", "周五", "周六", "周日"],
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getEditById(id) {
    return request({
      url: BASE_URL + '/GetEditById',
      method: 'get',
      params: { id }
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
  }
}