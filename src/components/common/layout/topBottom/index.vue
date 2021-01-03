<template>
  <el-container class="__common-layout-topBottom">
    <el-header>
      <div class="__header">
        <div class="c-flex-item-1">
          <el-menu
            class="__common-layout-moduleMenu"
            mode="horizontal"
            router
            :default-active="menuPath"
            style="border:none"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF"
          >
            <el-menu-tree-item
              v-for="menu in $store.state.sys.menus.slice(0,maxModuleMenu)"
              :menu="menu"
              :key="menu.id"
            />
            <el-submenu
              index="/more"
              v-if="$store.state.sys.permissionRouters.length>maxModuleMenu"
              :show-timeout="0"
              :hide-timeout="0"
            >
              <template slot="title">更多</template>
              <el-menu-tree-item
                v-for="menu in $store.state.sys.permissionRouters.slice(maxModuleMenu)"
                :menu="menu"
                :key="menu.meta.id"
              />
            </el-submenu>
          </el-menu>
        </div>
        <layout-user-area />
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
.__common-layout-topBottom {
  height: 100%;
  .el-header {
    padding: 0px;
    z-index: 1;
    height: auto !important;
    position: relative;
    .__header {
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
  }
}
</style>