<template>
  <common-dialog
    ref="dialog"
    width="500px"
    close-on-saved
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :before-save="onBeforeSave"
    :save-func="()=>{}"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="日期" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" v-model="data.date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="是否上班" prop="isWork">
        <el-switch v-model="data.isWork"></el-switch>
      </el-form-item>
      <el-form-item label="考勤班次" v-if="data.isWork" prop="attendanceShiftId">
        <input-select
          :options="shiftOptions"
          v-model="data.attendanceShiftId"
          @click="openShiftDialog"
        />
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button @click="close">关 闭</el-button>
    </template>
    <shift-dialog in-dialog ref="shiftDialog" select @select="onShiftSelect" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import shiftDialog from "@/components/hr/attendanceSetting/attendanceShift/listDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, shiftDialog },
  data() {
    return {
      data: {
        id: 0,
        date: "",
        isWork: true,
        attendanceShiftId: null,
        shiftDescription: ""
      },
      unit: "特殊日期",
      rules: {
        date: [{ required: true, message: "请选择日期" }],
        attendanceShiftId: [{ required: true, message: "请填写考勤班次" }]
      },
      shiftOptions: []
    };
  },
  methods: {
    onBeforeSave() {
      this.$emit("saved", { ...this.data });
      this.close();
      return false;
    },
    openShiftDialog() {
      this.$refs.shiftDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    onEditOpened(data) {
      this.shiftOptions = [
        {
          id: data.attendanceShiftId,
          name: data.shiftDescription
        }
      ];
    },
    onShiftSelect(data) {
      this.data.attendanceShiftId = data.id;
      this.data.shiftDescription = data.name + ":" + data.timeDescription;
      this.shiftOptions = [
        {
          id: data.id,
          name: data.name + ":" + data.timeDescription
        }
      ];
    }
  }
};
</script>