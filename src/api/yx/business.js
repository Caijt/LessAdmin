import request from "@/utils/request"
import baseUrl from "./baseUrl"
const BASE_URL = baseUrl + '/Business'

export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/getPageList',
      method: 'get',
      params
    })
  },
  getById(id) {
    return request({
      url: BASE_URL + '/getById',
      method: 'get',
      params: {
        id
      }
    })
  },
  save(data) {
    return request({
      url: BASE_URL + '/save',
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