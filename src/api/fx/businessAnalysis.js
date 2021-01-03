import request from "@/utils/request"
import baseUrl from "./baseUrl"
const BASE_URL = baseUrl + '/BusinessAnalysis'

export default {
  getCustomerAnalysisList(params) {
    return request({
      url: BASE_URL + '/getCustomerAnalysisList',
      method: 'get',
      params
    })
  },
  getContractAnalysisList(params) {
    return request({
      url: BASE_URL + '/getContractAnalysisList',
      method: 'get',
      params
    })
  },
  getBusinessAnalysisList(params) {
    return request({
      url: BASE_URL + '/getBusinessAnalysisList',
      method: 'get',
      params
    })
  }
}