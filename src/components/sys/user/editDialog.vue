<template>
  <common-dialog
    ref="dialog"
    width="500px"
    show-save-button
    unit="用户"
    edit-title
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-divider>用户信息</el-divider>
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="data.loginName" placeholder="填写用户登录名"></el-input>
      </el-form-item>
      <el-form-item label="修改密码" prop="change_pwd" v-if="data.id!=0">
        <el-switch v-model="data.changePassword" />
      </el-form-item>
      <el-form-item label="登录密码" prop="loginPassword" v-if="!data.id!=0||data.changePassword">
        <el-input v-model="data.loginPassword" type="password" placeholder="用户登录密码"></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="roleId">
        <role-select v-model="data.roleId" />
      </el-form-item>
      <el-form-item label="禁用" prop="isDisabled">
        <el-switch v-model="data.isDisabled"></el-switch>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import roleSelect from "@/components/sys/role/common/select";
import api from "@/api/sys/user";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, roleSelect },
  data() {
    return {
      data: {
        id: 0,
        loginName: "",
        loginPassword: "",
        changePassword: false,
        roleId: null,
        isDisabled: false,
      },
      api,
      rules: {
        name: [{ required: true, message: "请填写用户名称" }],
        loginName: [{ required: true, message: "请填写登录名" }],
        loginPassword: [{ required: true, message: "请填写登录密码" }],
        roleId: [{ required: true, message: "请选择所属角色" }],
      },
    };
  },
  computed: {},
  methods:{
    onBeforeSave(){
      return new Promise(r=>{
        setTimeout(() => {
          r(true);
        }, 5000);
      })
    }
  }
};
</script>