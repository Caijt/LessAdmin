import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/WorkflowSetting'
export default {
  getWorkflowTypeList(){
    return request({
      url: BASE_URL + '/GetWorkflowTypeList',
      method: 'get'
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
  getEditById(id){
    return request({
      url: BASE_URL + '/GetEditById',
      method: 'get',
      params:{
        id
      }
    })
  },
  getById(id){
    return request({
      url: BASE_URL + '/getById',
      method: 'get',
      params:{
        id
      }
    })
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/deleteById',
      method: 'post',
      data:id
    })
  },
  getNodeList(params) {
    return request({
      url: BASE_URL + '/getNodeList',
      method: 'get',
      params
    })
  }
}