<template>
  <el-footer :height="height" class="__common-layout-footer">
    <el-button type="text" @click="openDoc">框架文档</el-button>
    <el-divider direction="vertical"></el-divider>
    <span>Copyright © {{ new Date().getFullYear() }} {{$store.state.sys.company}}</span>
    <el-divider direction="vertical"></el-divider>
    <el-button type="text" @click="checkVersion">
      版本：v
      <span ref="version">{{config.version}}</span>
    </el-button>
  </el-footer>
</template>
<script>
import config from "@/config";
import commonApi from "@/api/common/common";
export default {
  props: {
    height: {
      type: String,
      default: "35px"
    }
  },
  data() {
    return {
      config
    };
  },
  created() {
    this.checkVersion();
  },
  methods: {
    openDoc() {
      window.open("http://caijt.com/lessAdmin");
    },
    checkVersion(e) {
      commonApi.getConfigValueByKey("VERSION").then(res => {
        let remoteVersion = res.data;
        let localVersion = config.version;
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
    }
  }
};
</script>
<style>
.__common-layout-footer.el-footer {
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>