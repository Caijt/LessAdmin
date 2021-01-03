<template>
  <common-dialog
    ref="dialog"
    width="810px"
    right
    show-save-button
    form-label-width="110px"
    confirm-on-close-change
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :get-data-func="api.getEditById"
    @saved="reload"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
    @data-got="onDataGot"
  >
    <template slot="form">
      <el-divider>班次信息</el-divider>
      <el-form-item label="班次名称" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="上下班时间" required>
        <time-setting-list ref="timeSettingList" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/attendanceShift";
import employeeSelect from "@/components/hr/employee/select";
import timeSettingList from "./timeSetting/editList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    timeSettingList
  },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        attendanceShiftTimes: []
      },
      api,
      unit: "考勤班次",
      rules: {
        name: [{ required: true, message: "请填写班次名称" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let timeSettingData = this.$refs.timeSettingList.data;
      if (timeSettingData.length == 0) {
        this.$message.warning("请添加上班时间");
        return false;
      }
      if (
        timeSettingData.some(
          item =>
            !item.signInTime ||
            !item.signOutTime ||
            !item.signInBeginTime ||
            !item.signInEndTime ||
            !item.signOutBeginTime ||
            !item.signOutEndTime ||
            (item.hasRest && (!item.restBeginTime || !item.restEndTime))
        )
      ) {
        this.$message.warning("请完善上下班时间段的字段");
        return false;
      }
      this.data.attendanceShiftTimes = timeSettingData.map(item => {
        return {
          ...item,
          attendanceShiftId: this.data.id
        };
      });
      return true;
    },
    onDataGot(data) {
      this.$refs.timeSettingList.setData(data.attendanceShiftTimes);
    },
    onClosed() {
      this.$refs.timeSettingList.clear();
    },
    onTest() {
      console.log(this.timeValue);
    }
  }
};
</script>