import request from '@/utils/request'
import baseUrl from './baseUrl'
const BASE_URL = baseUrl + '/Dimission'
const dimissionTypes = [
  { id: 0, name: "试用不合格" },
  { id: 1, name: "辞职" },
  { id: 2, name: "自离" },
  { id: 3, name: "辞退" },
  { id: 4, name: "开除" }
];
const hrFormalities = [
  { id: "BADGE", name: "胸卡" },
  { id: "CLOTHES", name: "工服" },
  { id: "ATTENDANCE", name: "考勤" },
  { id: "TOOL", name: "服务工具" }
];
const administrationFormalities = [
  { id: "NOSTAY", name: "无住宿" },
  { id: "CHECKOUT", name: "已退宿" }
]
export default {
  getPageList(params) {
    return request({
      url: BASE_URL + '/GetPageList',
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
      data: id
    })
  },
  getDimissionTypeList() {
    return Promise.resolve({
      data: dimissionTypes
    });
  },
  getTypeNameById(id) {
    for (let item of dimissionTypes) {
      if (item.id == id) {
        return item.name;
      }
    }
  },
  dimissionTypes,
  hrFormalities,
  administrationFormalities,
  getHrFormalitiesText(data) {
    return this.convertText(data, this.hrFormalities);
  },
  getAdministrationFormalitiesText(data) {
    return this.convertText(data, this.administrationFormalities);
  },
  convertText(data1, data2) {
    if (!data1) return "无";
    let a = data1.split(",");
    let b = [];
    for (let item of a) {
      for (let item2 of data2) {
        if (item == item2.id) {
          b.push(item2.name);
          break;
        }
      }
    }
    return b.join(",");
  }
}