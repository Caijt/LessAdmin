<template>
  <div class="c-flex c-flex-middle">
    <div>{{nowDate}}</div>
    <el-divider direction="vertical"></el-divider>
    <div>{{welcome}}</div>
    <el-dropdown size="medium " class="__user-menu" :show-timeout="0" trigger="click">
      <span>
        <i class="el-icon-user"></i>
        {{$store.state.user.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="loginLog">登录日志</el-dropdown-item>
        <el-dropdown-item @click.native="changePassword">密码修改</el-dropdown-item>
        <el-dropdown-item @click.native="logout">注销退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <change-password-dialog in-dialog ref="changePasswordDialog" />
    <login-log-dialog in-dialog ref="loginLogDialog" />
  </div>
</template>
<script>
import changePasswordDialog from "./changePasswordDialog";
import loginLogDialog from "./loginLogDialog";
export default {
  components: { changePasswordDialog ,loginLogDialog },
  computed: {
    nowDate() {
      return this.$moment().format("YYYY年M月D日 dddd");
    },
    welcome() {
      let hour = new Date().getHours();
      let welcome;
      if (hour < 6) {
        welcome = "凌晨";
      } else if (hour < 12) {
        welcome = "上午";
      } else if (hour < 14) {
        welcome = "中午";
      } else if (hour < 18) {
        welcome = "下午";
      } else if (hour < 24) {
        welcome = "晚上";
      }
      return welcome + "好，";
    },
  },
  methods: {
    loginLog() {
      this.$refs.loginLogDialog.open();
    },
    changePassword() {
      this.$refs.changePasswordDialog.open();
    },
    logout() {
      this.$confirm("您确定注销退出系统吗？", "提示", {
        type: "warning",
      }).then(() => {
        this.$loading({
          text: "注销中",
        });
        this.$store.dispatch("logout");
      });
    },
  },
};
</script>
<style lang="scss">
.__user-menu.el-dropdown {
  span {
    font-size: 12px;
    line-height: 40px;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>