<template>
  <div>
    <common-dialog
      ref="dialog"
      width="500px"
      title="请选择要申请的流程类型"
      :inDialog="inDialog"
      :data="data"
      center
      hide-header
    >
      <template slot="form">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card shadow="always" class="_card" @click.native="openLeaveDialog">
              <i class="el-icon-wallet"></i> 请假流程
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always" class="_card" @click.native="openOvertimeDialog">
              <i class="el-icon-time"></i> 加班流程
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always" class="_card" @click.native="openTravelDialog">
              <i class="el-icon-truck"></i> 出差流程
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always" class="_card" @click.native="openReimbursementDialog">
              <i class="el-icon-coin"></i> 报销流程
            </el-card>
          </el-col>
        </el-row>
      </template>
    </common-dialog>
    <leave-dialog ref="leaveDialog" @close-saved="$emit('close-saved')" />
    <overtime-dialog ref="overtimeDialog" @close-saved="$emit('close-saved')" />
    <travel-dialog ref="travelDialog" @close-saved="$emit('close-saved')" />
    <reimbursement-dialog ref="reimbursementDialog" @close-saved="$emit('close-saved')" />
  </div>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import dialogMixin from "@/mixins/dialog";
import api from "@/api/xz/workflow";
import leaveDialog from "./application/leaveDialog";
import overtimeDialog from "./application/overtimeDialog";
import travelDialog from "./application/travelDialog";
import reimbursementDialog from "./application/reimbursementDialog";

export default {
  mixins: [dialogMixin],
  components: {
    commonDialog,
    leaveDialog,
    overtimeDialog,
    travelDialog,
    reimbursementDialog
  },
  data() {
    return {
      data: {},
      api,
      unit: "请假申请单",
      rules: {}
    };
  },
  methods: {
    openLeaveDialog() {
      this.$refs.leaveDialog.openCreate();
      this.close();
    },
    openOvertimeDialog() {
      this.$refs.overtimeDialog.openCreate();
      this.close();
    },
    openTravelDialog() {
      this.$refs.travelDialog.openCreate();
      this.close();
    },
    openReimbursementDialog() {
      this.$refs.reimbursementDialog.openCreate();
      this.close();
    }
  }
};
</script>
<style scoped>
._card {
  text-align: center;
  cursor: pointer;
  margin: 5px 0;
  color: #409eff;
}
</style>