import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/BaseData'
export default {
  getSourceChannelList(params) {
    return request({
      url: BASE_URL + '/getSourceChannelList',
      method: 'get',
      params
    })
  },
  saveSourceChannel(data) {
    return request({
      url: BASE_URL + '/saveSourceChannel',
      method: 'post',
      data
    })
  },
  deleteSourceChannelById(id) {
    return request({
      url: BASE_URL + '/deleteSourceChannelById',
      method: 'post',
      data: id
    })
  },
  getMetacilTypeList(params) {
    return request({
      url: BASE_URL + '/getMetacilTypeList',
      method: 'get',
      params
    })
  },
  saveMetacilType(data) {
    return request({
      url: BASE_URL + '/saveMetacilType',
      method: 'post',
      data
    })
  },
  deleteMetacilTypeById(id) {
    return request({
      url: BASE_URL + '/deleteMetacilTypeById',
      method: 'post',
      data: id
    })
  },
  getPostList(params) {
    return request({
      url: BASE_URL + '/getPostList',
      method: 'get',
      params
    })
  },
  savePost(data) {
    return request({
      url: BASE_URL + '/savePost',
      method: 'post',
      data
    })
  },
  deletePostById(id) {
    return request({
      url: BASE_URL + '/deletePostById',
      method: 'post',
      data: id
    })
  },
  getJobList(params) {
    return request({
      url: BASE_URL + '/getJobList',
      method: 'get',
      params
    })
  },
  saveJob(data) {
    return request({
      url: BASE_URL + '/saveJob',
      method: 'post',
      data
    })
  },
  deleteJobById(id) {
    return request({
      url: BASE_URL + '/deleteJobById',
      method: 'post',
      data: id
    })
  },
  getCustomerTypeList(params) {
    return request({
      url: BASE_URL + '/getCustomerTypeList',
      method: 'get',
      params
    })
  },
  saveCustomerType(data) {
    return request({
      url: BASE_URL + '/saveCustomerType',
      method: 'post',
      data
    })
  },
  deleteCustomerTypeById(id) {
    return request({
      url: BASE_URL + '/deleteCustomerTypeById',
      method: 'post',
      data: id
    })
  },
  getComplainTypeList(params) {
    return request({
      url: BASE_URL + '/getComplainTypeList',
      method: 'get',
      params
    })
  },
  saveComplainType(data) {
    return request({
      url: BASE_URL + '/saveComplainType',
      method: 'post',
      data
    })
  },
  deleteComplainTypeById(id) {
    return request({
      url: BASE_URL + '/deleteComplainTypeById',
      method: 'post',
      data: id
    })
  },
  getReceiptMethodList(params) {
    return request({
      url: BASE_URL + '/getReceiptMethodList',
      method: 'get',
      params
    })
  },
  saveReceiptMethod(data) {
    return request({
      url: BASE_URL + '/saveReceiptMethod',
      method: 'post',
      data
    })
  },
  deleteReceiptMethodById(id) {
    return request({
      url: BASE_URL + '/deleteReceiptMethodById',
      method: 'post',
      data: id
    })
  },
  getBusinessSourceList(params) {
    return request({
      url: BASE_URL + '/getBusinessSourceList',
      method: 'get',
      params
    })
  },
  saveBusinessSource(data) {
    return request({
      url: BASE_URL + '/saveBusinessSource',
      method: 'post',
      data
    })
  },
  deleteBusinessSourceById(id) {
    return request({
      url: BASE_URL + '/deleteBusinessSourceById',
      method: 'post',
      data: id
    })
  },
  getWageTypeList(params) {
    return request({
      url: BASE_URL + '/GetWageTypeList',
      method: 'get',
      params
    })
  },
  saveWageType(data) {
    return request({
      url: BASE_URL + '/SaveWageType',
      method: 'post',
      data
    })
  },
  deleteWageTypeById(id) {
    return request({
      url: BASE_URL + '/DeleteWageTypeById',
      method: 'post',
      data: id
    })
  },
  getMoneyTypeList(params) {
    return request({
      url: BASE_URL + '/GetMoneyTypeList',
      method: 'get',
      params
    })
  },
  saveMoneyType(data) {
    return request({
      url: BASE_URL + '/SaveMoneyType',
      method: 'post',
      data
    })
  },
  deleteMoneyTypeById(id) {
    return request({
      url: BASE_URL + '/DeleteMoneyTypeById',
      method: 'post',
      data: id
    })
  }
}