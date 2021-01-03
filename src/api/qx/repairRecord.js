import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/RepairRecord'
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
  getItemList(params) {
    return request({
      url: BASE_URL + '/GetUseRecordItemList',
      method: 'get',
      params
    })
  },
}