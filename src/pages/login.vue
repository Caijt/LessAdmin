<template>
  <el-container direction="vertical" class="_login">
    <el-main class="_main">
      <div class="_login-box">
        <div class="c-mg-b-40p c-font-22p c-text-center">{{$store.state.sys.config.SYSTEM_TITLE}}</div>
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          size="large"
          @keyup.enter.native="login"
        >
          <el-form-item prop="loginName">
            <el-input v-model="formData.loginName" placeholder="登录名" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="loginPassword">
            <el-input
              show-password
              type="password"
              v-model="formData.loginPassword"
              placeholder="登录密码"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item class="_remember">
            <el-switch v-model="formData.isRemember" active-text="记住我"></el-switch>
          </el-form-item>
          <el-button
            size="large"
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click="login"
          >登录</el-button>
        </el-form>
      </div>
    </el-main>
    <layout-footer class="_footer" height="40px" />
  </el-container>
</template>
<script>
import authApi from "@/api/common/auth";
import layoutFooter from "@/components/common/layout/footer";
export default {
  components: { layoutFooter },
  data() {
    return {
      loading: false,
      formData: {
        loginName: "superadmin",
        loginPassword: "admin",
        isRemember: localStorage.getItem("isRemember") == "true" ? true : false,
      },
      formRules: {
        loginName: [{ required: true, message: "请输入登录名" }],
        loginPassword: [{ required: true, message: "请输入登录密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.form
        .validate()
        .then((res) => {
          if (!res) return false;
          this.loading = true;
          this.$store
            .dispatch("login", this.formData)
            .then((res) => {
              this.$router.push("/").catch((err) => {});
            })
            .catch((res) => {
              this.$message.error("用户密码错误");
              this.loading = false;
              console.log(res);
            });
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>
<style lang="scss">
._login {
  z-index: 1;
  height: 100%;
  background-color: #23364c;
  overflow: hidden;
  position: relative;
  background-image: url("/bg/bg.png");
  background-position: center top;
  background-size: cover;
  ._main {
    display: flex;
    justify-content: center;
    align-items: center;
    ._login-box {
      z-index: 1000;
      border-radius: 4px;
      width: 380px;
      margin-top: 40px;
      border: 1px solid #ebeef5;
      padding: 40px 25px 35px;
      background-color: #fff;
      box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.1);
      ._remember {
        .el-form-item__content {
          line-height: 1;
        }
      }
    }
  }

  ._footer {
    color: #fff;
    button {
      color: #fff;
    }
  }
}
</style>