<template>
  <div class="__common-layout-pageTabs">
    <el-scrollbar>
      <div class="__tabs">
        <div
          class="__tab-item"
          v-for="item in $store.state.sys.openedPageRouters"
          :class="{ '__is-active': item.meta.canMultipleOpen?item.fullPath==$route.fullPath:item.path==$route.path }"
          :key="item.fullPath"
          @click="onClick(item)"
        >
          {{item.meta.title}}
          <span
            class="el-icon-close"
            @click.stop="onClose(item)"
            :style="$store.state.sys.openedPageRouters.length<=1?'width:0;':''"
          ></span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  watch: {
    $route: {
      handler(v) {
        this.$store.dispatch("openPage", v);
      },
      immediate: true
    }
  },
  methods: {
    //点击页面标签卡时
    onClick(data) {
      if (this.$route.fullPath != data.fullPath) {
        this.$router.push(data.fullPath);
      }
    },
    //关闭页面标签时
    onClose(route) {
      if (route.fullPath == this.$route.fullPath) {
        let index = this.$store.state.sys.openedPageRouters.indexOf(route);
        this.$store.dispatch("closePage", route);
        //删除页面后，跳转到上一页面
        this.$router.push(
          this.$store.state.sys.openedPageRouters[index < 1 ? 0 : index - 1]
            .path
        );
      } else {
        let lastPath = this.$route.fullPath;
        //先跳转到要删除的页面，再删除页面路由，再跳转回来原来的页面
        this.$router.replace(route).then(() => {          
          this.$store.dispatch("closePage", route);
          this.$router.replace(lastPath);
        });
      }
    }
  }
};
</script>
<style lang="scss">
.__common-layout-pageTabs {
  $c-tab-border-color: #dcdfe6;
  position: relative;
  &::before {
    content: "";
    border-bottom: 1px solid $c-tab-border-color;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  }
  .__tabs {
    display: flex;
    .__tab-item {
      white-space: nowrap;
      padding: 8px 6px 8px 18px;
      font-size: 12px;
      border: 1px solid $c-tab-border-color;
      border-left: none;
      border-bottom: 0px;
      line-height: 14px;
      cursor: pointer;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:first-child {
        border-left: 1px solid $c-tab-border-color;
        border-top-left-radius: 2px;
        margin-left: 10px;
      }
      &:last-child {
        border-top-right-radius: 2px;
        margin-right: 10px;
      }
      &:not(.__is-active):hover {
        color: #409eff;
        .el-icon-close {
          width: 12px;
          margin-right: 0px;
        }
      }
      &.__is-active {
        padding-right: 12px;
        border-bottom: 1px solid #fff;
        color: #409eff;
        .el-icon-close {
          width: 12px;
          margin-right: 0px;
          margin-left: 2px;
        }
      }
      .el-icon-close {
        width: 0px;
        height: 12px;
        overflow: hidden;
        border-radius: 50%;
        font-size: 12px;
        margin-right: 12px;
        transform-origin: 100% 50%;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        vertical-align: text-top;
        &:hover {
          background-color: #c0c4cc;
          color: #fff;
        }
      }
    }
  }
}
</style>