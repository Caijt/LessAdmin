import Vue from 'vue'
import store from '../store'
export default {
	getRows(rows, unit = "记录") {
		if (rows.length == 0) {
			Vue.prototype.$message.warning("请选择" + unit);
			return false;
		}
		return rows;
	},
	getOneRow(rows, unit = "记录") {
		rows = this.getRows(rows, unit);
		if (rows == false) return false;
		if (rows.length > 1) {
			Message.warning("只能选择一个" + unit);
			return false;
		}
		return rows[0];
	},
	getToday() {
		return this.formatToDate(new Date());
	},
	convertTextarea(text) {
		text = text || '';
		if (text) {
			text = text.replace(/\r\n/g, "<br>")
			text = text.replace(/\n/g, "<br>")
			//替换所有的空格（中文空格、英文空格都会被替换）
			text = text.replace(/\s/g, "&nbsp;")
		}
		return text
	},
	textareaToHtml(text) {
		text = text || '';
		if (text) {
			text = text.replace(/\r\n/g, "<br>")
			text = text.replace(/\n/g, "<br>")
			//替换所有的空格（中文空格、英文空格都会被替换）
			text = text.replace(/\s/g, "&nbsp;")
		}
		return text
	},
	//
	round(value, point = 2) {
		value = Number(value)
		let a = Math.pow(10, point)
		return Math.round(value * a) / a || 0
	},
	getProgressPercentage(value) {
		value = Number(value) || 0
		if (value > 1) return 100
		return Math.round(value * 100 * 100) / 100 || 0
	},
	//
	getProgress(value) {
		value = Number(value) || 0
		if (value > 1) return 100
		return Math.round(value * 100 * 100) / 100 || 0
	},
	getNowDateString() {
		return this.toDateString(new Date());
	},
	getNowDatetimeString() {
		return this.toDatetimeString(new Date());
	},
	getNowShortDatetimeString() {
		return this.toShortDatetimeString(new Date());
	},
	//根据format格式化日期时间，返回字符串
	toDateStringByFormat(value, format) {
		if (!value) return ''
		let m = Vue.prototype.$moment(value);
		if (!m.isValid()) {
			return "";
		}
		return m.format(format);
	},
	//返回YYYY-MM-DD格式的字符串
	toDateString(value) {
		return this.toDateStringByFormat(value, 'YYYY-MM-DD');
	},
	//返回YYYY-MM-DD HH:mm:ss格式的字符串
	toDatetimeString(value) {
		return this.toDateStringByFormat(value, 'YYYY-MM-DD HH:mm:ss');
	},
	//返回YYYY-MM-DD HH:mm格式的字符串
	toShortDatetimeString(value) {
		return this.toDateStringByFormat(value, 'YYYY-MM-DD HH:mm');
	},
	//返回YYYY-MM-DD HH:mm格式的字符串
	toTimeString(value) {
		return this.toDateStringByFormat(value, 'HH:mm');
	},
	hasUserPath(path) {
		return store.state.user.menus.some((item, index) => {
			return item.fullPath == path
		})
	},
	obj: {
		copyByKey(object, keys) {
			let newObject = {}
			for (let key of keys) {
				newObject[key] = object[key]
			}
			return newObject
		},
		//根据传入的对象，返回一个没有空值的新对象
		removeNullKey(obj) {
			let newObj = {}
			for (let key of Object.keys(obj)) {
				if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
					newObj[key] = obj[key]
				}
			}
			return newObj
		}
	},
	validateRules: {
		et0: (rule, value, callback) => {
			if (value <= 0) {
				callback(new Error('必须大于0'))
			} else {
				callback()
			}
		},
		num(rule, value, callback) {
			let regex = /^\d*\.?\d*$/;
			if (regex.test(value)) {
				callback();
			} else {
				callback("请输入数字");
			}
		},
		int(rule, value, callback) {
			let regex = /^\d*$/;
			if (regex.test(value)) {
				callback();
			} else {
				callback("请输入整数");
			}
		},
		createCheckExist(func, instance, idPath, message) {
			let paths = idPath.split(".");
			return (rule, value, callback) => {
				if (value) {
					let id = instance;
					paths.forEach(item => {
						id = id[item];
					});
					func(value, id).then(res => {
						if (res.data) {
							callback(new Error(message));
						} else {
							callback();
						}
					});
				} else {
					callback();
				}
			}
		}
		// createCheckPropUnique(method,form,message){
		// 	console.log(form)
		// 	return (rule,value,callback,a,b,c,d)=>{
		// 		console.log(form)
		// 		if(value){
		// 			method(value,form.id).then(res=>{
		// 				if(res.data){
		// 					callback()
		// 				}else{
		// 					callback(new Error(message))
		// 				}
		// 			})
		// 		}else{
		// 			callback()
		// 		}
		// 	}
		// }
	},
	toTreeData(data, parentIdKey = "parentId", childrenKey = "children") {
		let rootList = []
		data.forEach((item, index) => {
			if (item[parentIdKey] == null) {
				rootList.push(item)
			}
		})
		function convertTree(treeData) {
			treeData.forEach(d => {
				data.forEach((item, index) => {
					if (item[parentIdKey] && item[parentIdKey] == d.id) {
						if (!d[childrenKey]) d[childrenKey] = []
						d.children.push(item)
					}
				})
				if (d[childrenKey]) convertTree(d[childrenKey])
			})
		}
		convertTree(rootList)
		return rootList
	},
	//传一个文件大小以字节为单位，返回一个对应单位的大小
	getFileSizeText(fileSize) {
		if (fileSize < 1024) {
			return size + " Byte";
		}
		if (fileSize < 1024 * 1024) {
			return this.round(fileSize / 1024, 2) + " Kb";
		}
		if (fileSize < 1024 * 1024 * 1024) {
			return this.round(fileSize / 1024 / 1024, 2) + " Mb";
		}
		return this.round(fileSize / 1024 / 1024 / 1024, 2) + " Gb";
	}
}