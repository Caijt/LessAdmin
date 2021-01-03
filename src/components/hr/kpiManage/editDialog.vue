<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    form-text
    form-label-width="100px"
    confirm-on-close-change
    :before-save="onBeforeSave"
    :title="'员工 [ '+data.employeeName+' ] 绩效考核'"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :confirm-on-save="data.isSubmit"
    confirm-save-text="您确定提交此考核结果吗？提交后不能修改，并提交到下一个处理节点进行考核。"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>考核明细</el-divider>
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
      <el-divider>题目列表</el-divider>
      <score-list ref="scoreList" />
      <el-divider>考核日志</el-divider>
      <log-list ref="logList" />
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
import api from "@/api/hr/kpiManage";
import scoreList from "./scoreList";
import logList from "./logList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    scoreList,
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

        kpiWorkflowId:null
      },
      api,
      unit: "绩效考核",
      rules: {
        name: [{ required: true, message: "请填写考核名称" }],
        type: [{ required: true, message: "请选择考核类型" }],
        year: [{ required: true, message: "请选择考核年份" }],
        month: [{ required: true, message: "请选择考核月份" }],
        quarter: [{ required: true, message: "请选择考核季度" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let itemData = this.$refs.scoreList.data;
      this.data.kpiWorkflowTodoScores = itemData.map(item => {
        return {
          kpiSettingItemId: item.kpiSettingItemId,
          kpiWorkflowTodoId: item.kpiWorkflowTodoId,
          score: item.score
        };
      });
      return true;
    },
    onEditOpened() {
      this.$refs.scoreList.getData({ kpiWorkflowTodoId: this.data.id });
      this.$refs.logList.getData({ kpiWorkflowId: this.data.kpiWorkflowId });
    },
    onClosed() {
      this.$refs.scoreList.clear();
      this.$refs.logList.clear();
    },
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