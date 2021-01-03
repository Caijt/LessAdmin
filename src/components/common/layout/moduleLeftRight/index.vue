<template>
  <el-container class="__common-layout-moduleLeftRight">
    <el-header height="40px">
      <div @click="collapseMenu" class="__collapse">
        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
      </div>
      <div class="c-flex-item-1 c-mg-l-15p">
        <el-menu
          mode="horizontal"
          style="border:none"
          background-color="#fafafb"
          :default-active="modulePath"
          @select="selectModule"
        >
          <el-menu-item
            v-for="m in $store.state.sys.menus.slice(0,maxModuleMenu)"
            :index="m.fullPath"
            :key="m.id"
          >
            <i
              :class="m.icon||$store.state.sys.config.MENU_DEFAULT_ICON"
              v-show="$store.state.sys.config.SHOW_MENU_ICON"
            ></i>
            <span slot="title">{{m.name}}</span>
          </el-menu-item>
          <el-submenu
            index="/more"
            v-if="$store.state.sys.menus.length>maxModuleMenu"
            :show-timeout="0"
            :hide-timeout="0"
          >
            <span slot="title">更多</span>
            <el-menu-item
              v-for="m in $store.state.sys.permissionRouters.slice(maxModuleMenu)"
              :index="m.fullPath"
              :key="m.id"
            >
              <i
                :class="m.icon||$store.state.sys.config.MENU_DEFAULT_ICON"
                v-show="$store.state.sys.config.SHOW_MENU_ICON"
              ></i>
              <span slot="title">{{m.name}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <layout-user-area />
    </el-header>
    <el-container style="overflow:hidden">
      <el-aside class="__aside-menu" v-show="subMenu.length>0" :width="isCollapse?'64px':'200px'">
        <el-scrollbar class="__scroll">
          <div
            class="__menu-title"
            v-show="!isCollapse&&$store.state.sys.config.MENU_BAR_TITLE"
          >{{$store.state.sys.config.MENU_BAR_TITLE}}</div>
          <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="menuPath"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff"
            router
            ref="menu"
            style="border:none"
          >
            <el-menu-tree-item
              v-for="menu in subMenu"
              :menu="menu"
              :key="menu.id"
              :show-icon="isCollapse"
            />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container style="overflow:auto" direction="vertical">
        <layout-main />
        <layout-footer />
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import elMenuTreeItem from "../elMenuTreeItem";
import layoutFooter from "../footer";
import layoutMain from "../main";
import layoutUserArea from "../userArea";
import layoutMixin from "../layoutMixin";
export default {
  components: { elMenuTreeItem, layoutFooter, layoutMain, layoutUserArea },
  mixins: [layoutMixin]
};
</script>
<style lang='scss'>
.__common-layout-moduleLeftRight {
  height: 100%;

  .el-header {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    z-index: 1;
    background-color: #fafafb;
    position: relative;
    display: flex;
    padding: 0px 20px;
    color: #606266;
    align-items: center;
    font-size: 12px;
    .__collapse {
      cursor: pointer;
      font-size: 20px;
    }
    .el-menu--horizontal {
      .el-menu-item,
      .el-submenu__title {
        font-size: 12px !important;
        line-height: 38px !important;
        height: 40px !important;
        i.el-icon-menu {
          font-size: 14px;
        }
      }
      .el-submenu.is-active .el-submenu__title,
      .el-menu-item.is-active {
        border-bottom: 4px solid #409eff;
      }
    }
  }
  .__aside-menu {
    background-color: #304156;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
    z-index: 1;
    .__menu-title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      padding: 20px 0px 10px;
    }
    .__scroll {
      height: 100%;
      .el-scrollbar__wrap {
        overflow-x: auto;
      }
    }
  }
}
</style>