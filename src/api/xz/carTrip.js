import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/CarTrip'
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
      method: 'get',
      params
    })
  },
  returnCar(data) {
    return request({
      url: BASE_URL + '/ReturnCar',
      method: 'post',
      data
    })
  },
  changeCar(data) {
    return request({
      url: BASE_URL + '/ChangeCar',
      method: 'post',
      data
    })
  },
  departCar(id) {
    return request({
      url: BASE_URL + '/DepartCar',
      method: 'post',
      data:id
    })
  },
  cancelCar(id) {
    return request({
      url: BASE_URL + '/CancelCar',
      method: 'post',
      data:id
    })
  }
}