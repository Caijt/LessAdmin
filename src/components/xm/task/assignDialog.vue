<!--分配任务对话框-->
<template>
  <common-dialog
    title="项目实施项分派任务"
    ref="dialog"
    width="800px"
    form-label-width="100px"
    confirm-on-close-change
    :before-save="onBeforeSave"
    form-text
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.assignTask"
    :confirm-on-save="data.isSubmit"
    confirm-save-text="你确定要提交吗？提交后将无法修改，并通知任务对应的班组进行实施人员分派。"
    :close-on-saved="data.isSubmit"
    :get-data-func="api.getAssignTaskById"
    @saved="onSaved"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
    @data-got="onDataGot"
  >
    <template slot="form">
      <el-divider>合同项目实施明细信息</el-divider>
      <el-form-item label="客户名称">{{data.customerName}}</el-form-item>
      <el-form-item label="客户类型">{{data.customerType}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人">{{data.contact}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话">{{data.contactPhone}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="服务地址">{{data.address}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="业务类型">{{data.businessType==0?"普通项目":"应急项目"}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="灭害种类">{{data.metacilTypeNames}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目名称">{{data.projectName}}</el-form-item>
      <el-form-item
        label="预计实施时间"
      >{{data.expectDateBegin | toDateString}} 至 {{data.expectDateEnd| toDateString}}</el-form-item>
      <el-form-item label="实施内容">{{data.implementContent}}</el-form-item>
      <el-form-item label="预计实施人数">{{data.expectPeopleNumber}} 人</el-form-item>
      <el-form-item label="实施频率描述">{{data.frequencyDescription}}</el-form-item>
      <el-divider>任务分派明细</el-divider>
      <task-list ref="taskList" in-dialog @change="onChange" :address="data.address"></task-list>
    </template>
    <template slot="footer">
      <el-button type="danger" @click="submit()">提交</el-button>
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import taskList from "./edit/editList";
import api from "@/api/xm/task";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    taskList
  },
  data() {
    return {
      data: {
        id: 0,
        customerName: "",
        customerType: "",
        tasks: null,
        contact:"",
        contactPhone:"",
        address:"",
        expectDateBegin: "",
        expectDateEnd: "",
        expectPeopleNumber: 0,
        implementContent:"",
        frequencyDescription:"",
        isSubmit: false,
        businessType:0,
        metacilTypeNames:"",
        projectName:""
      },
      api,
      rules: {
        overtimeStartMinute: [{ required: true, message: "请填写加班起算时间" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let taskList = this.$refs.taskList.data;
      if (taskList.length == 0) {
        this.$message.warning("请至少添加一个任务明细");
        return false;
      }
      this.data.tasks = taskList.map(item => {
        return {
          ...item,
          contractImplementItemId: this.data.id
        };
      });
      return true;
    },
    // onEditOpened(data) {
    //   this.getData(data.id);
    //   // this.$refs.specialDateList.setData(data.attendanceGroupSpecialDates);
    // },
    //刷新关联表
    onSaved() {
      this.reload();
    },
    onDataGot(data) {
      this.$refs.taskList.setData(data.tasks);
    },
    onClosed() {
      this.$refs.taskList.clear();
    },
    save() {
      this.data.isSubmit = false;
      return this.$refs.dialog.save();
    },
    submit() {
      this.data.isSubmit = true;
      return this.$refs.dialog.save();
    },
    onChange() {
      this.$refs.dialog.isChange = true;
    }
  }
};
</script>