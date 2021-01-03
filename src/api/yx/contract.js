import request from "@/utils/request"
import baseUrl from "./baseUrl"
const BASE_URL = baseUrl + '/Contract'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  getImplementItemList(params) {
    return request({
      url: BASE_URL + '/GetImplementItemList',
      method: 'get',
      params
    })
  },
  getReceiptItemList(params) {
    return request({
      url: BASE_URL + '/GetReceiptItemList',
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
  },
  getImplementItemById(id) {
    return request({
      url: BASE_URL + '/GetImplementItemById',
      method: 'get',
      params: {
        id
      }
    })
  },
  getReceiptItemById(id) {
    return request({
      url: BASE_URL + '/GetReceiptItemById',
      method: 'get',
      params: {
        id
      }
    })
  },
  save(data) {
    return request({
      url: BASE_URL + '/Save',
      method: 'post',
      data
    })
  },
  saveImplementItem(data) {
    return request({
      url: BASE_URL + '/SaveImplementItem',
      method: 'post',
      data
    })
  },
  saveReceiptItem(data) {
    return request({
      url: BASE_URL + '/SaveReceiptItem',
      method: 'post',
      data
    })
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/DeleteById',
      method: 'post',
      data: id
    })
  },
  deleteImplementItemById(id) {
    return request({
      url: BASE_URL + '/DeleteImplementItemById',
      method: 'post',
      data: id
    })
  },
  deleteReceiptItemById(id) {
    return request({
      url: BASE_URL + '/DeleteReceiptItemById',
      method: 'post',
      data: id
    })
  }
}