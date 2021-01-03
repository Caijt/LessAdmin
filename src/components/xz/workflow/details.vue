<template>
  <common-dialog
    ref="dialog"
    width="700px"
    form-label-width="90px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :right="right"
    form-text
    confirm-on-close-change
    get-guid-on-create
    :get-data-func="api.getById"
    confirm-on-save
    close-on-saved
    @details-opened="onDetailsOpened"
    @closed="onClosed"
    @close="()=>$emit('close')"
  >
    <template slot="form">
      <el-divider>{{data.workflowType}}申请信息</el-divider>
      <el-form-item label="申请标题">{{data.title}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="申请时间">{{data.createTime}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人">{{data.startEmployeeName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态" class="no-border">
            <el-tag v-if="data.isEnd" type="info">已结束</el-tag>
            <el-tag v-else type="warning">审批中</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <component ref="workflowData" :is="workflowType"></component>
      <el-divider>审批信息</el-divider>
      <el-form-item
        :label="node.handleEmployeeName"
        v-for="node in data.workflowProcessNodes"
        :key="node.id"
      >
        <template v-if="node.handleTime!=null">
          <div style="font-size:12px;color:#909399">（于 {{node.handleTime}} 审批）</div>
          <div>{{node.handleRemark}}</div>
        </template>
        <div v-else style="font-size:12px;color:#909399">（等待审批）</div>
      </el-form-item>
    </template>
    <slot></slot>
    <slot slot="footer" name="footer"></slot>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/xz/workflow";
import leave from "./details/leave";
import overtime from "./details/overtime";
import travel from "./details/travel";
import reimbursement from "./details/reimbursement";

export default {
  mixins: [detailsDialogMixin],
  props: {
    right: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: undefined
    }
  },
  components: {
    commonDialog,
    leave,
    overtime,
    travel,
    reimbursement
  },
  data() {
    return {
      data: {
        id: 0,
        title: "",
        isEnd:false,
        createTime: "",
        startEmployeeName: "",
        workflowTypeId: null,
        workflowType: "",
        workflowProcessNodes: []
      },
      api,
      unit: "流程详情",
      workflowType: ""
    };
  },
  computed: {
    title() {
      if (!this.dialogTitle) {
        return "[ " + this.data.title + " ] 流程详情";
      } else {
        return this.dialogTitle;
      }
    }
  },
  methods: {
    onDetailsOpened(data) {
      switch (data.workflowTypeId) {
        case 1:
          this.workflowType = "leave";
          break;
        case 2:
          this.workflowType = "overtime";
          break;
        case 3:
          this.workflowType = "travel";
          break;
        case 4:
          this.workflowType = "reimbursement";
          break;
      }
      this.$nextTick(() => {
        this.$refs.workflowData.setData(data.workflowData);
      });
    },
    onClosed() {
      this.$refs.workflowData.reset();
    }
  }
};
</script>