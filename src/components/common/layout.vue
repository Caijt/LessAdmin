<template>
  <el-container class="__layout-container">
    <el-aside class="__aside-left" width="200px">
      <el-scrollbar class="__scroll">
        <div style="color:#fff;text-align:center;font-size:24px;padding:20px 0px 10px;">Less后台</div>
        <el-menu
          
          class="__nav"
          :default-active="$route.path"
          :default-openeds="openedMenus"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409eff"
          router
          ref="menu"
          style="border:none"
          @select="select"
        >
          <el-menu-tree-item
            v-for="menu in $store.state.sys.permissionRouters"
            :menu="menu"
            :key="menu.meta.id"
             
          />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container style="overflow: auto; background-color: #FFF;">
      <el-header height="40px">
        <div class="header-title">Less Admin</div>
        <el-dropdown size="medium " class="user-area" :show-timeout="0">
          <span>
            {{$store.state.user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="loginLog">登录日志</el-dropdown-item>
            <el-dropdown-item @click.native="changePassword">密码修改</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <el-breadcrumb class="_min-breadcrumb" separator="/" style="margin-bottom: 20px">
          <el-breadcrumb-item
            v-for="m in breadcrumbItems"
            :key="m.meta.id"
            :to="m.path"
            @click.native="itemClick"
          >{{m.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
      <el-footer>
        <el-button type="text" @click="checkVersion">
          Copyright © {{ new Date().getFullYear() }} {{$store.state.sys.company}} | 版本：v
          <span
            ref="version"
          >20190803001</span>
        </el-button>
        <!-- <el-button type='text' @click='contactDialog=true'>系统帮助</el-button> -->
      </el-footer>
    </el-container>
    <!-- </el-container> -->
  </el-container>
</template>
<script>
// import ElMenuTree from "@/components/common/elMenuTree";
import ElMenuTreeItem from "@/components/common/elMenuTreeItem";
import configApi from "@/api/common/config";
export default {
  components: { ElMenuTreeItem },
  data() {
    return {
      operationDialog: false,
      contactDialog: false,
      headerHeight: "120px",
      openedMenus: [],
      currentMenus: [],
      menuPath: "",
      maxShowHeaderMenu: 0,
      path: ""
    };
  },
  created() {
    let e =
      this.$route.matched.length == 0
        ? this.$route.path
        : this.$route.matched[0].path;
    this.path = e ? e : "/";
    let meta = document.getElementsByTagName("meta");
    meta[1].content = "";
    this.maxShowHeaderMenu = Math.floor(document.body.clientWidth / 100);
    // this.checkVersion();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  methods: {
    loginLog() {},
    changePassword() {},
    logout() {
      this.$confirm("您确定注销退出系统吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.$store.dispatch("logout");
      });
    },
    select(index, indexPath) {
      //console.log(this.$refs.menu.defaultActive)
    },
    resize() {
      this.headerHeight = this.$refs.elHeader.clientHeight + "px";
    },
    itemClick() {
      // console.log('df')
      // console.log(this.$route.path)
      // this.menuPath = this.$route.path
      // setTimeout((v)=>{
      // 	console.log(this.$route.path)
      // 	this.menuPath = '/yyzx'
      // 	console.log(v)
      // },1000)
    },
    down(d) {
      window.open("static/" + d);
    },
    checkVersion(e) {
      configApi.getValue("version").then(res => {
        let remoteVersion = res.data;
        let localVersion = this.$refs.version.innerText;
        if (remoteVersion !== localVersion) {
          this.$confirm(
            "<b>检测本地系统版本与服务器系统版本不一致，是否进行刷新更新版本？</b><br/>本地版本：v" +
              localVersion +
              "<br/>服务器版本：v" +
              remoteVersion,
            "更新提示",
            {
              type: "warning",
              dangerouslyUseHTMLString: true,
              confirmButtonText: "刷新"
            }
          ).then(() => {
            window.location.reload();
          });
        } else {
          if (e) {
            this.$message.success("本地系统版本与服务器版本已一致，无需更新");
          }
        }
      });
    },
    moduleSelect(index, indexPath) {
      if (index) {
        this.path = index;
      }
    }
  },
  computed: {
    modulePath() {
      let e =
        this.$route.matched.length == 0
          ? this.$route.path
          : this.$route.matched[0].path;
      return e ? e : "/";
    },
    breadcrumbItems() {
      return this.$route.matched.filter(item => !item.meta.isHide);
    },
    subMenu() {
      let subMenu = this.$store.state.sys.permissionRouters.find(item => {
        return item.path == this.path;
      });
      return subMenu.children;
    }
  }
};
</script>
<style lang='scss'>
.__layout-container {
  height: 100%;
  .__aside-left {
    background-color: #304156;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
    z-index: 1;
    .__nav .el-menu-item.is-active {
      background-color: #263445 !important;
      border-right: 4px solid #409eff;
      font-weight: 550;
    }
  }
  .__scroll {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
    }
  }
  .el-header {
    padding: 0px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    z-index: 1;
    background-color: #fafafb;
    position: relative;
    .header-title {
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      padding: 0px 20px;
      color: #606266;
    }
    .user-area.el-dropdown {
      position: absolute;
      z-index: 1;
      top: 12px;
      right: 15px;
      span {
        font-size: 12px;
        cursor: pointer;
      }
    }
    ._header-module-menu.el-menu--horizontal {
      .el-menu-item,
      .el-submenu__title {
        border-bottom: 0px !important;
        font-size: 12px !important;
        line-height: 40px !important;
        height: 40px !important;
      }
      .el-menu-item.is-active::before,
      .el-submenu.is-active > .el-submenu__title::before {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 50%;
        margin-left: -6px;
        border-top: 6px solid rgba(0, 0, 0, 0);
        border-right: 6px solid rgba(0, 0, 0, 0);
        border-bottom: 6px solid #fff;
        border-left: 6px solid rgba(0, 0, 0, 0);
      }
    }
    ._header-sub-menu.el-menu--horizontal {
      .el-menu-item {
        // border-bottom: 0px !important;
        font-size: 12px !important;
        line-height: 35px !important;
        height: 35px !important;
      }
      .el-submenu__title {
        font-size: 12px;
        line-height: 35px !important;
        height: 35px !important;
      }
    }
  }
  .el-main {
    padding: 20px;
    overflow: unset;
    ._min-breadcrumb.el-breadcrumb {
      font-size: 12px;
    }
  }
  .el-footer {
    height: 35px !important;
    text-align: center;
    border-top: 1px solid #ebeef5;
  }
}
</style>