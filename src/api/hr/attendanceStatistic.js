import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/AttendanceStatistic'
export default {
  getDayList(params) {
    return request({
      url: BASE_URL + '/GetDayList',
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
  }
}