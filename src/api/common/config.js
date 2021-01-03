import request from '@/utils/request'
import baseUrl from './baseUrl'

export default {
	qywxAuthUrl: baseUrl + '/wx/a',
	login(data) {
		return request({
			url: baseUrl + '/Auth/Login',
			method: 'post',
			data
		})
	},
	getAuthInfo() {
		return request({
			url: baseUrl + '/Auth/GetIdentityInfo',
			method: "get"
		})
	}
}