const sys = {
	state: {
		menus: [],//
		permissionRouters: [],//权限路由表
		permissionMenus: [],//权限菜单列表
		config: null, //系统配置		
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
		}		
	},
	actions: {
		
	}
}
export default sys
