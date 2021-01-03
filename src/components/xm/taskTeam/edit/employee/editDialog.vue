<template>
  <common-dialog
    :title="data.teamName + (data.isAssigned?'更改':'分派')+'人员（'+data.amount+'人）'"
    ref="dialog"
    width="500px"
    show-save-button
    confirm-on-close-change
    :before-save="onBeforeSave"
    form-text
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :get-data-func="api.getEditById"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <employee-list
        @change="onChange"
        ref="employeeList"
        :team-id="data.teamId"
        in-dialog
        :show-lead-column="data.isLead"
      ></employee-list>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import employeeList from "./employeeList";
import api from "@/api/xm/taskTeam";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeList
  },
  data() {
    let validator = (rule, value, callback) => {
      if (this.data.depIds.length == 0 && this.data.employeeIds.length == 0) {
        callback(new Error("考勤参与部门及参与人员不能同时为空"));
      } else {
        callback();
      }
    };
    return {
      dialogTitle: "",
      data: {
        id: 0,
        teamId: null,
        teamName: "",
        amount: 0,
        isAssigned: false,
        isLead: false
      },
      api,
      rules: {
        overtimeStartMinute: [{ required: true, message: "请填写加班起算时间" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let employeeData = this.$refs.employeeList.data;
      if (employeeData.length != this.data.amount) {
        this.$message.warning(
          `任务实施需要${this.data.amount}个人，请检查人员数量`
        );
        return false;
      }
      if (this.data.isLead) {
        if (employeeData.every(item => !item.isLead)) {
          this.$message.warning("该班组为任务负责组，需指定负责人");
          return false;
        }
      }
      this.data.taskTeamEmployees = employeeData.map(item => {
        return {
          ...item,
          taskTeamId: this.data.id
        };
      });
      return true;
    },
    onEditOpened(data) {
      if (data.isAssigned) {
        this.$refs.employeeList.getData({ taskTeamId: data.id });
      }
    },
    onClosed() {
      this.$refs.employeeList.clear();
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
      this.$refs.dialog.change = true;
    }
  }
};
</script>