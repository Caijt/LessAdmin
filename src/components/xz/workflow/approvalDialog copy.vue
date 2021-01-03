<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    form-label-width="100px"
    confirm-on-close-change
    :title="'[ '+data.title+' ] 的审批'"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.saveApproval"
    :close-on-saved="data.isSubmit"
    :confirm-on-save="data.isSubmit"
    confirm-save-text="您确定提交此审批吗？"
    @close-saved="$emit('close-saved')"
  >
    
    <template slot="form">
      <el-divider>流程数据</el-divider>
      <el-divider>审批信息</el-divider>
      <el-form-item label="审批意见" prop="handleRemark">
        <el-input v-model="data.handleRemark" type="textarea"></el-input>
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="danger" @click="submit">提交</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/workflow";
import workflowDetails from "./details"

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
        title:"",
        handleRemark: "",
        isSubmit: false,

        workflowTypeId: null
      },
      api,
      unit: "审批",
      rules: {}
    };
  },
  methods: {
    save() {
      this.data.isSubmit = false;
      return this.$refs.dialog.save();
    },
    submit() {
      this.data.isSubmit = true;
      return this.$refs.dialog.save();
    }
  }
};
</script>