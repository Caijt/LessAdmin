import Vue from 'vue'
Vue.mixin({
  beforeRouteLeave(to, from, next) {
    //限制只有在我写的那个父类里才可能会用这个缓存删除功能
    if (!this.$parent || this.$parent.$el.className != "el-main __common-layout-main" || !this.$store.state.sys.config.PAGE_TABS) {
      next();
      return;
    }
    let isExist = this.$store.state.sys.openedPageRouters.some(item => item.fullPath == from.fullPath)
    if (!isExist) {
      let tag = this.$vnode.tag;
      let cache = this.$vnode.parent.componentInstance.cache;
      let keys = this.$vnode.parent.componentInstance.keys;
      let key;
      for (let k in cache) {
        if (cache[k].tag == tag) {
          key = k;
          break;
        }
      }
      if (key) {
        if (cache[key] != null) {
          delete cache[key];
          let index = keys.indexOf(key);
          if (index > -1) {
            keys.splice(index, 1);
          }
        }
      }
    }
    next();
  }
})