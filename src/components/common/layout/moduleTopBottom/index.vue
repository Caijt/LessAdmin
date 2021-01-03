<template>
  <el-container class="__common-layout-moduleTopBottom">
    <el-header>
      <div class="__header-top-menu">
        <div class="c-flex-item-1">
          <el-menu
            class="__common-layout-moduleMenu"
            mode="horizontal"
            :default-active="modulePath"
            style="border:none"
            @select="selectModule"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF"
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
              <template slot="title">更多</template>
              <el-menu-item
                v-for="m in $store.state.sys.menus.slice(maxModuleMenu)"
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
      </div>
      <div class="__header-sub-menu">
        <el-menu
          class="_header-sub-menu"
          :default-active="menuPath"
          router
          ref="menu"
          style="border:none"
          mode="horizontal"
        >
          <el-menu-tree-item
            mode="horizontal"
            v-for="menu in subMenu"
            :menu="menu"
            :key="menu.id"
          />
        </el-menu>
      </div>
    </el-header>
    <layout-main />
    <layout-footer />
    <!-- </el-container> -->
    <!-- </el-container> -->
  </el-container>
</template>
<script>
import elMenuTreeItem from "@/components/common/layout/elMenuTreeItem";
import layoutFooter from "../footer";
import layoutMain from "../main";
import layoutUserArea from "../userArea";
import layoutMixin from "../layoutMixin";
export default {
  components: { elMenuTreeItem, layoutMain, layoutFooter, layoutUserArea },
  mixins: [layoutMixin]
};
</script>
<style lang='scss'>
@import "../moduleMenu.scss";
.__common-layout-moduleTopBottom {
  height: 100%;
  .el-header {
    padding: 0px;
    z-index: 1;
    height: auto !important;
    position: relative;
    .__header-top-menu {
      font-size: 12px;
      display: flex;
      align-items: center;
      color: #fff;
      padding-right: 20px;
      background-color: #304156;
      .el-dropdown {
        span {
          color: #fff;
          font-size: 12px;
          line-height: 40px;
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
    .__header-sub-menu {
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
      .el-menu--horizontal {
        .el-menu-item {
          line-height: 35px !important;
          height: 35px !important;
        }
        .el-submenu__title {
          line-height: 35px !important;
          height: 35px !important;
        }
      }
    }
  }
}
</style>