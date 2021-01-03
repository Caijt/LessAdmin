<template>
  <el-container class="__common-layout-leftRight">
    <el-aside class="__aside-menu" :width="isCollapse?'64px':'200px'">
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
            v-for="menu in $store.state.sys.menus"
            :menu="menu"
            :key="menu.id"
            :show-icon="isCollapse"
          />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container class="__main">
      <el-header height="40px">
        <div @click="collapseMenu" class="__collapse">
          <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </div>
        <div class="c-flex-item-1 c-text-bold c-mg-l-5p">{{$store.state.sys.config.SYSTEM_TITLE}}</div>
        <layout-user-area />
      </el-header>
      <layout-main />
      <layout-footer />
    </el-container>
  </el-container>
</template>
<script>
import elMenuTreeItem from "../elMenuTreeItem";
import configApi from "@/api/common/config";
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
.__common-layout-leftRight {
  height: 100%;
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
  .__main {
    overflow: auto;
    background-color: #fff;
  }
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
  }
}
</style>