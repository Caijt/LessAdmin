import router from '@/router'
import store from '../store'
export default {
  //当不传path参数时，path为当前路由值
  //是否有读权限
  canRead(path = null) {
    return this.can("canRead", path);
  },
  //是否有写权限
  canWrite(path = null) {
    return this.can("canWrite", path);
  },
  //是否有审核权限
  canReview(path = null) {
    return this.can("canReview", path);
  },
  can(action, path = null) {
    if (!path) {
      path = router.history.current.path;
    }
    return store.state.sys.permissionMenus.some(item => {
      if (item.fullPath == path || item.permissionPath == path) {
        if (item.isPage) {
          return store.state.sys.permissionMenus.find(item2 => item2.id == item.parentId)[action] || false;
        }
        return item[action] || false;
      }
    })
  },
  //是否有某个菜单
  hasMenu(path) {
    return store.state.sys.permissionMenus.some(item => item.fullPath == path || item.permissionPath == path);
  }
}