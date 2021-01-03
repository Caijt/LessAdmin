<template>
  <common-dialog
    title="任务实施明细"
    ref="dialog"
    width="800px"
    form-text
    :inDialog="inDialog"
    :data="data"
    :save-func="api.save"
    :confirm-on-save="data.isSubmit"
    :close-on-saved="data.isSubmit"
    :get-data-func="api.getEditById"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>实施任务信息</el-divider>
      <el-form-item label="客户名称">{{data.customerName}}</el-form-item>
      <el-form-item label="客户类型">{{data.customerType}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人">{{data.contact}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话">{{data.phone}}</el-form-item>
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
      <el-form-item label="实施时间">{{data.implementBeginTime}} 至 {{data.implementEndTime}}</el-form-item>
      <el-form-item label="实施内容">{{data.implementContent}}</el-form-item>
      <el-form-item label="任务描述">{{data.description}}</el-form-item>
      <el-divider>任务分派班组</el-divider>
      <team-list in-dialog ref="teamList" :page="false" :show-toolbar="false" />
      <el-divider>实施进度记录</el-divider>
      <record-list
        :page="false"
        :show-query="false"
        ref="recordList"
        in-dialog
        :border="false"
        @deleted="onSaved"
      >
        <template slot="toolbar-left">
          <el-button @click="add" type="primary">添加</el-button>
        </template>
        <el-button slot="toolbar-right" @click="openAttendanceDialog">人员考勤</el-button>
        <el-table-column slot="column" label="操作" width="80" align="center">
          <template slot-scope="{row}">
            <el-button type="text" @click="edit(row)" icon="el-icon-edit"></el-button>
            <el-button type="text" @click="del(row)" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </record-list>
    </template>
    <edit-dialog in-dialog ref="editDialog" @close-saved="onEdited" />
    <attendance-dialog in-dialog ref="attendanceDialog"/>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import recordList from "./record/list";
import api from "@/api/xm/task";
import editDialog from "./record/editDialog";
import teamList from "@/components/xm/taskTeam/list";
import attendanceDialog from "./attendance/listDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    recordList,
    editDialog,
    teamList,
    attendanceDialog
  },
  data() {
    return {
      data: {
        id: 0,
        customerName: "",
        customerType: "",
        implementBeginTime: "",
        implementEndTime: "",
        projectName: "",
        metacilTypeNames:"",
        contact: "",
        phone: "",
        address: "",
        implementAmount: 0,
        implementContent: 0,
        description:""
      },
      api
    };
  },
  methods: {
    onEditOpened(data) {
      this.$refs.recordList.getData({ taskId: data.id });
      this.$refs.teamList.getData({ taskId: data.id });
    },
    onEdited() {
      this.$refs.recordList.reload();
      this.$refs.dialog.isSaved = true;
    },
    onSaved() {
      this.$refs.dialog.isSaved = true;
    },
    onClosed() {
      this.$refs.recordList.clear();
      this.$refs.teamList.clear();
    },
    add() {
      this.$refs.editDialog.openCreate({ taskId: this.data.id });
    },
    edit(row) {
      this.$refs.editDialog.openEdit(row);
    },
    del(row) {
      this.$refs.recordList.delete(row);
    },
    openAttendanceDialog() {
      this.$refs.attendanceDialog.open({taskId:this.data.id});
    }
  }
};
</script>