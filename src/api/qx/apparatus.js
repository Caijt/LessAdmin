import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Apparatus'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
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
  checkExistByNo(no,id){
    return request({
      url: BASE_URL + '/checkExistByNo',
      params:{
        no,id
      }
    })
  },
  getByNo(no){
    return request({
      url: BASE_URL + '/getByNo',
      params:{
        no
      }
    })
  }
}