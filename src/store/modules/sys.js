const sys = {
	state: {
		menus: [],//
		permissionRouters: [],//权限路由表
		permissionMenus: [],//权限菜单列表
		config: null, //系统配置		
		openedPageRouters: [] //已打开原页面路由
	},
	getters: {

	},
	mutations: {
		SET_PERMISSION_ROUTERS(state, routers) {
			state.permissionRouters = routers;
		},
		SET_PERMISSION_MENUS(state, menus) {
			state.permissionMenus = menus;
		},
		SET_MENUS(state, menus) {
			state.menus = menus;
		},
		SET_CONFIG(state, config) {
			state.config = config;
		},
		//添加页面路由		
		ADD_PAGE_ROUTER(state, route) {
			state.openedPageRouters.push(route);
		},
		//删除页面路由
		DEL_PAGE_ROUTER(state, route) {
			let index = state.openedPageRouters.indexOf(route);
			if (index >= 0) {
				state.openedPageRouters.splice(index, 1);
			}
		},
		//替换页面路由
		REPLACE_PAGE_ROUTER(state, route) {
			for (let key in state.openedPageRouters) {
				if (state.openedPageRouters[key].path == route.path) {
					state.openedPageRouters.splice(key, 1, route)
					break;
				}
			}
		}
	},
	actions: {
		//打开页面
		openPage({ state, commit }, route) {
			let isExist = state.openedPageRouters.some(
				item => item.fullPath == route.fullPath
			);
			if (!isExist) {
				//判断页面是否支持不同参数多开页面功能，如果不支持且已存在path值一样的页面路由，那就替换它
				if (route.meta.canMultipleOpen || !state.openedPageRouters.some(
					item => item.path == route.path
				)) {
					commit("ADD_PAGE_ROUTER", route);
				} else {
					commit("REPLACE_PAGE_ROUTER", route);
				}
			}
		},
		//关闭页面
		closePage({ state, commit }, route) {
			commit("DEL_PAGE_ROUTER", route);
		}		
	}
}
export default sys
