<template>
  <el-main class="__common-layout-main">
    <page-tabs class="c-mg-t-10p" v-if="$store.state.sys.config.PAGE_TABS" />
    <div class="c-pd-20p">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="m in breadcrumbItems" :key="m.id">{{m.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="c-h-15p"></div>
      <keep-alive v-if="$store.state.sys.config.PAGE_TABS">
        <router-view :key="$route.fullPath" />
      </keep-alive>
      <router-view v-else />
    </div>
  </el-main>
</template>
<script>
import pageTabs from "./pageTabs";
export default {
  components: { pageTabs },
  data() {
    return {
      viewNames: ["role"]
    };
  },
  computed: {
    breadcrumbItems() {
      let items = [];
      let buildItems = id => {
        let b = this.$store.state.sys.permissionMenus.find(
          item => item.id == id
        );
        if (b) {
          items.unshift(b);
          if (b.parentId) {
            buildItems(b.parentId);
          }
        }
      };
      buildItems(this.$route.meta.id);
      return items;
    }
  }
};
</script>
<style lang="scss">
$c-tab-border-color: #dcdfe6;
.__common-layout-main.el-main {
  padding: 0px;
  overflow: unset;
  .el-breadcrumb {
    font-size: 12px;
  }
}
</style>