import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/AttendanceIgnore'
export default {
  getEdit() {
    return request({
      url: BASE_URL + '/GetEdit',
      method: 'get'
    })
  },
  save(data) {
    return request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  }  
}