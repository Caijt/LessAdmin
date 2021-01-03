<template>
  <workflow-details
    :dialog-title="'[ '+data.title+' ] 的审批'"
    ref="dialog"
    right
    :inDialog="inDialog"
    @close="onClose"
  >
    <template slot="form">
      <el-divider>流程数据</el-divider>
      <el-divider>审批信息</el-divider>
    </template>
    <template slot="footer">
      <el-form label-width="80px" :model="data" style="text-align:left">
        <el-form-item label="审批结果" prop="isAgree">
          <el-radio-group v-model="data.isAgree">
            <el-radio :label="true">同意</el-radio>
            <el-radio :label="false">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批意见" prop="handleRemark">
          <el-input v-model="data.handleRemark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="submit">提交</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
  </workflow-details>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/workflow";
import workflowDetails from "./details";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    workflowDetails
  },
  data() {
    return {
      data: {
        id: 0,
        title: "",
        isAgree:true,
        handleRemark: "",
        isSubmit: false
      },
      api,
      unit: "审批",
      saved: false
    };
  },
  methods: {
    openEdit(data) {
      this.data.id = data.id;
      this.data.title = data.title;
      this.data.handleRemark = data.handleRemark;
      this.$refs.dialog.openDetailsById(data.workflowProcessId);
    },
    onClose() {
      if (this.saved) {
        this.$emit("close-saved");
      }
    },
    save() {
      this.data.isSubmit = false;
      this.$refs.dialog.loading();
      api.saveApproval(this.data).then(res => {
        this.$refs.dialog.loading(false);
        this.$message.success("保存成功");
        this.saved = true;
      });
    },
    submit() {
      this.data.isSubmit = true;
      this.$msgbox({
        showCancelButton: true,
        title: "提示",
        message: "你确定要提交审批信息吗？",
        type: "warning"
      }).then(() => {
        this.$refs.dialog.loading();
        api.saveApproval(this.data).then(res => {
          this.$refs.dialog.loading(false);
          this.saved = true;
          this.$message.success("提交成功");
          this.close();
        });
      });
    }
  }
};
</script>