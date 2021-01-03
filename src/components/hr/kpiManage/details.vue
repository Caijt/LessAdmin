<template>
  <common-dialog
    ref="dialog"
    width="700px"
    form-label-width="100px"
    form-text
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>绩效考核信息</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="考核类型">{{data.kpiType==0?"月度":(data.kpiType==1?"季度":"年度")}}考核</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="考核年度"
          >{{data.kpiYear}}年{{data.kpiType==0?" / 第"+data.kpiMonth+"月份":(data.kpiType==1?" / 第"+data.kpiQuarter+"季度":"")}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="考核员工">{{data.employeeName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工部门">{{data.depName}}</el-form-item>
        </el-col>
      </el-row>
      <el-divider>考核日志</el-divider>
      <log-list ref="logList" />      
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/hr/kpiSetting";
import logList from "./logList";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    logList
  },
  data() {
    return {
      data: {
        id: 0,
        kpiType: 0,
        kpiYear: 0,
        kpiMonth: null,
        kpiQuarter: null,
        employeeName: "",
        depName: "",
        kpiWorkflowTodoScores: null,
        isSubmit: false,

        kpiWorkflowId: null
      },
      tabName: "education",
      api,
      unit: "员工绩效考核流程"
    };
  },
  methods: {
    onDetailsOpened() {
       this.$refs.logList.getData({ kpiWorkflowId: this.data.kpiWorkflowId });
    },
    onClosed() {
      this.$refs.logList.clear();
    }
  }
};
</script>