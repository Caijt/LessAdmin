<template>
  <div class="__common-layout-elMenuTreeItem">
    <el-menu-item
      v-if="typeof(menu.children)=='undefined' || menu.children.length==0"
      :index="menu.fullPath"
      v-show="!menu.isHide"
    >
      <i
        :class="menu.icon||$store.state.sys.config.MENU_DEFAULT_ICON"
        v-show="showIcon || $store.state.sys.config.SHOW_MENU_ICON"
      ></i>
      <span slot="title">{{menu.name}}</span>
    </el-menu-item>
    <el-submenu v-else :index="menu.fullPath" v-show="!menu.isHide" :show-timeout="0">
      <template #title>
        <i
          :class="menu.icon||$store.state.sys.config.MENU_DEFAULT_ICON"
          v-show="showIcon || $store.state.sys.config.SHOW_MENU_ICON"
        ></i>
        <span slot="title">{{menu.name}}</span>
      </template>
      <el-menu-tree-item v-for="item in menu.children" :key="item.id" :menu="item" />
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: "elMenuTreeItem",
  props: {
    menu: {
      type: Object
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="scss">
.el-menu:not(.el-menu--horizontal):not(.el-menu--popup) {
  .__common-layout-elMenuTreeItem {
    .el-menu-item.is-active {
      background-color: #263445 !important;
      border-right: 4px solid #409eff;
      font-weight: 550;
    }
  }
}
.el-menu--collapse.el-menu {
  .__common-layout-elMenuTreeItem {
    .el-menu-item .el-submenu__icon-arrow,
    .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
    .el-menu-item span,
    .el-submenu > .el-submenu__title span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
    .el-submenu.is-active > .el-submenu__title {
      background-color: #263445 !important;
      border-right: 4px solid #409eff;
    }
  }
}

.el-menu--horizontal.el-menu {
  .__common-layout-elMenuTreeItem {
    float: left;
    .el-menu-item,
    .el-submenu .el-submenu__title {
      color: #909399;
      font-size: 12px;
      i.el-icon-menu {
        font-size: 14px;
      }
    }
    .el-menu-item.is-active {
      border-bottom: 2px solid #409eff;
      color: #303133;
    }
    .el-submenu.is-active .el-submenu__title {
      border-bottom: 2px solid #409eff;
      color: #303133;
    }
    .el-submenu .el-submenu__icon-arrow {
      position: static;
      vertical-align: middle;
      margin-left: 8px;
      margin-top: -3px;
    }
    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover {
      outline: none;
      color: #303133;
    }
    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover {
      background-color: #fff;
    }
    .el-submenu .el-submenu__title:hover {
      background-color: #fff;
    }
  }
}
</style>