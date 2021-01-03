import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Workflow'
export default {
  leaveTypes: {
    CASUAL: "事假",
    SICK: "病假",    
    MARRIAGE: "婚假",
    ANNUAL: "年假",
    FUNERAL: "丧假"
  },
  //获取我的申请单列表
  getMyApplicationPageList(params) {
    return request({
      url: BASE_URL + '/GetMyApplicationPageList',
      method: 'get',
      params
    })
  },
  //获取我的审批单列表
  getMyApprovalPageList(params) {
    return request({
      url: BASE_URL + '/GetMyApprovalPageList',
      method: 'get',
      params
    })
  },
  saveApproval(data) {
    return request({
      url: BASE_URL + '/SaveApproval',
      method: 'post',
      data
    })
  },
  //保存/提交请假单
  saveLeaveApplication(data) {
    return request({
      url: BASE_URL + '/SaveLeaveApplication',
      method: 'post',
      data
    })
  },
  //保存/提交加班单
  saveOvertimeApplication(data) {
    return request({
      url: BASE_URL + '/SaveOvertimeApplication',
      method: 'post',
      data
    })
  },
  //保存/提交出差单
  saveTravelApplication(data) {
    return request({
      url: BASE_URL + '/SaveTravelApplication',
      method: 'post',
      data
    })
  },
  //保存/提交报销单
  saveReimbursementApplication(data) {
    return request({
      url: BASE_URL + '/SaveReimbursementApplication',
      method: 'post',
      data
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
  deleteApplicationById(id) {
    return request({
      url: BASE_URL + '/deleteApplicationById',
      method: 'post',
      data: id
    })
  },
  getNodeList(params) {
    return request({
      url: BASE_URL + '/getNodeList',
      method: 'get',
      params
    })
  },
  getById(id) {
    return request({
      url: BASE_URL + '/GetById',
      method: 'get',
      params: {
        id
      }
    })
  }
}