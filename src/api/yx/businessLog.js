import request from "@/utils/request"
import baseUrl from "./baseUrl"
const BASE_URL = baseUrl + '/BusinessLog'

export default {
  getList(params) {
    return request({
      url: BASE_URL + '/getList',
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