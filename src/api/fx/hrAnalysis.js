import request from "@/utils/request"
import baseUrl from "./baseUrl"
const BASE_URL = baseUrl + '/HrAnalysis'

export default {
  getInductionAnalysisList(params) {
    return request({
      url: BASE_URL + '/getInductionAnalysisList',
      method: 'get',
      params
    })
  },
  getWorkingAnalysisList(params) {
    return request({
      url: BASE_URL + '/getWorkingAnalysisList',
      method: 'get',
      params
    })
  },
  getDimissionAnalysisList(params) {
    return request({
      url: BASE_URL + '/getDimissionAnalysisList',
      method: 'get',
      params
    })
  },
  getWageAnalysisList(params) {
    return request({
      url: BASE_URL + '/getWageAnalysisList',
      method: 'get',
      params
    })
  }
}