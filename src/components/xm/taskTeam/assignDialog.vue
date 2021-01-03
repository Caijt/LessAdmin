<template>
  <common-dialog
    title="任务分派人员"
    ref="dialog"
    width="800px"
    form-label-width="110px"
    confirm-on-close-change
    :before-save="onBeforeSave"
    form-text
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getTaskInAssignById"
    @details-opened="onDetailsOpened"
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
      <el-form-item label="实施时间">{{data.implementBeginTime}} 至 {{data.implementEndTime}}</el-form-item>
      <el-form-item label="实施内容">{{data.implementContent}}</el-form-item>
      <el-form-item label="实施情况" class="no-border">
        <span v-if="data.implementStatus==0">（未实施）</span>
        <span
          v-else
          class="c-link"
          @click="openRecordDialog"
        >{{data.implementStatus==1?"实施中":"已完成"}}</span>
      </el-form-item>
      <el-form-item label="任务描述">{{data.description}}</el-form-item>
      <el-divider>班组分派明细</el-divider>
      <el-alert type="warning" title="仅能对自己所在的班组进行分派或更改人员"></el-alert>
      <team-list ref="teamList" in-dialog @saved="onSaved"></team-list>
      <record-dialog :page="false" :show-toolbar="false" ref="recordDialog" in-dialog></record-dialog>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import teamList from "./edit/teamList";
import api from "@/api/xm/taskTeam";
import recordDialog from "@/components/xm/taskImplement/record/listDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    teamList,
    recordDialog
  },
  data() {
    return {
      data: {
        id: 0,
        customerName: "",
        customerType: "",
        contact: "",
        contactPhone: "",
        address: "",
        description: "",
        metacilTypeNames:"",
        businessType:0,
        projectName: "",
        implementContent: "",
        implementBeginTime: "",
        implementEndTime: "",
        implementStatus: 0,
        canSeeImplement: false
      },
      api
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
          implementItemId: this.data.id
        };
      });
      return true;
    },
    onDetailsOpened(data) {
      this.$refs.teamList.getData({ taskId: data.id });
    },
    onSaved() {
      this.$refs.dialog.isSaved = true;
    },
    onClosed() {
      this.$refs.teamList.clear();
    },
    openRecordDialog() {
      if (this.data.canSeeImplement) {
        this.$refs.recordDialog.open().then(that => {
          that.getData({ taskId: this.data.id });
        });
      } else {
        this.$message.warning(
          "您所在的班组不是本任务的负责班组，无法查看实施情况详情"
        );
      }
    }
  }
};
</script>