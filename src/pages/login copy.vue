<template>
  <el-row class="_login-app">
    <el-col :span="12" class="left">
      <div class="left-text">
        <div class="title">{{$store.state.sys.config.SYSTEM_TITLE}}</div>
      </div>
      <div class="left-bg"></div>
    </el-col>
    <el-col :span="12">
      <div style="display:flex;flex-direction:column;justify-content:center;height:100vh;">
        <div class="login-box">
          <div class="c-mg-b-20p c-font-14p">用户登录</div>
          <el-form
            ref="form"
            :model="formData"
            :rules="formRules"
            size="large"
            @keyup.enter.native="login"
          >
            <el-form-item prop="loginName">
              <el-input v-model="formData.loginName" placeholder="登录名" />
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input
                show-password
                type="password"
                v-model="formData.loginPassword"
                placeholder="登录密码"
              />
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
      </div>
    </el-col>
  </el-row>
</template>
<script>
import authApi from "@/api/common/auth";
export default {
  data() {
    return {
      loading: false,
      formData: {
        loginName: "",
        loginPassword: ""
      },
      formRules: {
        loginName: [{ required: true, message: "请输入登录名" }],
        loginPassword: [{ required: true, message: "请输入登录密码" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.form
        .validate()
        .then(res => {
          if (!res) return false;
          this.loading = true;
          this.$store
            .dispatch("login", this.formData)
            .then(res => {
              this.$router.push("/").catch(err=>{});
            })
            .catch(res => {
              this.$message.error("用户密码错误");
              this.loading = false;
              console.log(res);
            });
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss">
._login-app {
  background-color: #f2f6fc;
  .left {
    position: relative;
    height: 100vh;
  }
  .left-bg {
    transform: skewX(-28deg);
    margin-left: -1000px;
    height: 100vh;
    background: linear-gradient(150deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4);
    box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .left-text {
    position: absolute;
    left: 50px;
    height: 100vh;
    color: #fff;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      // height: 400px;
      font-size: 48px;
      text-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .login-box {
    z-index: 1000;
    border-radius: 4px;
    width: 350px;
    margin: 0px auto;
    border: 1px solid #ebeef5;
    padding: 50px 25px;
    background-color: #fff;
    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>