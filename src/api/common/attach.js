import request from '@/utils/request'
import baseUrl from './baseUrl'

const BASE_URL = baseUrl + '/Attach'
export default {
  uploadFileUrl: BASE_URL + "/Upload",
  uploadUrl: BASE_URL + "/Upload",
  //加载附件
  getList(params) {
    return request({
      url: BASE_URL + '/GetList',
      params
    });
  },
  deleteById(id) {
    return request({
      url: BASE_URL + '/DeleteById',
      method: "post",
      data: id
    });
  },
  //加载附件
  load(id) {
    return request({
      url: BASE_URL + '/Download',
      params: { id },
      responseType: "blob"
    });
  },
  //直接打开附件
  open(id) {
    return request({
      url: BASE_URL + '/Download',
      params: { id },
      responseType: "blob"
    }).then(res => {
      window.open(URL.createObjectURL(res));
      return Promise.resolve();
    });
  },
  //下载，弹出下载窗口
  download(id, fileName) {
    return request({
      url: BASE_URL + '/Download',
      params: { id },
      responseType: "blob"
    }).then(res => {
      if (navigator.msSaveBlob) {
        // IE10+下载
        navigator.msSaveBlob(res, fileName);
      } else {
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.target = "_blank";
        elink.href = URL.createObjectURL(res);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      }
      return Promise.resolve();
    });
  },
}