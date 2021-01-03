import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/CarDispatch'
export default {
  getApplicationPageList(params) {
    return request({
      url: BASE_URL + '/GetApplicationPageList',
      method: 'get',
      params
    })
  },
  review(data) {
    return request({
      url: BASE_URL + '/Review',
      method: 'post',
      data
    })
  },
  dispatch(data) {
    return request({
      url: BASE_URL + '/Dispatch',
      method: 'post',
      data
    })
  }
}