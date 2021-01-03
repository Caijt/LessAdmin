<template>
  <common-dialog
    ref="dialog"
    width="500px"
    title="修改密码"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.changePassword"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-divider>修改用户密码</el-divider>
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="data.oldPassword" type="password" placeholder="填写用户原密码"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="newPassword">
        <el-input v-model="data.newPassword" type="password" placeholder="填写用户新密码"></el-input>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/common/auth";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog },
  data() {
    return {
      data: {
        oldPassword: "",
        newPassword: "",
      },
      api,
      rules: {
        oldPassword: [{ required: true, message: "请填写原密码" }],
        newPassword: [
          { required: true, message: "请填写新密码" },
          {
            validator: (rule, value, callback) => {
              if (value == this.data.oldPassword) {
                callback(new Error("新密码不能跟原密码一样"));
              } else {
                callback();
              }
            },
            trigger:"blur"
          },
        ],
      },
    };
  },
};
</script>