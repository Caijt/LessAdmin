<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    show-save-button
    form-label-width="110px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    confirm-on-close-change
    get-guid-on-create
    @open-edit="onOpenEdit"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>员工合同信息</el-divider>
      <el-form-item label="所属部门">
        <select-input v-model="data.depName" @click="openDepDialog" />
      </el-form-item>
      <el-form-item label="员工" prop="employeeId">
        <select-input
          :label="data.employeeName"
          v-model="data.employeeId"
          placeholder="选择员工"
          @click="openEmployeeDialog"
        />
      </el-form-item>
      <el-form-item label="合同开始日期" prop="beginDate">
        <el-date-picker v-model="data.beginDate" value-format="yyyy-MM-dd" placeholder="选择合同开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="合同结束日期" prop="endDate">
        <el-date-picker v-model="data.endDate" value-format="yyyy-MM-dd" placeholder="选择合同结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="合同时长" prop="duration">
        <el-input-number v-model="data.duration" :min="0"></el-input-number>
        <span style="margin-left:10px">个月</span>
      </el-form-item>
      <el-form-item label="合同上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
    <dep-dialog ref="depDialog" in-dialog select @select="setDep" />
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import depDialog from "@/components/hr/department/listDialog";
import employeeDialog from "@/components/hr/employee/listDialog";
import api from "@/api/hr/contract";
import uploadList from "@/components/common/attach/uploadList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    depDialog,
    employeeDialog,
    uploadList
  },
  data() {
    let validator = (rule, value, callback) => {
      if (!this.data.beginDate || !this.data.endDate) {
        callback();
      } else {
        let duration = this.$moment(this.data.endDate).diff(
          this.data.beginDate,
          "months"
        );
        this.data.duration = duration;
        if (duration >= 0) {
          callback();
        } else {
          callback(new Error("合同开始日期应在结束日期之前"));
        }
      }
    };
    return {
      data: {
        id: 0,
        guid: null,
        employeeId: null,
        depId: null,
        beginDate: "",
        endDate: "",
        duration: 0,

        employeeName: "",
        depName: ""
      },
      api,
      unit: "员工合同",
      rules: {
        employeeId: [{ required: true, message: "请选择要转正的员工" }],
        beginDate: [
          { required: true, message: "请选择合同开始日期" },
          {
            validator
          }
        ],
        endDate: [
          { required: true, message: "请选择合同结束日期" },
          {
            validator
          }
        ],
        duration: [{ required: true, message: "请填写合同时长" }]
      }
    };
  },
  methods: {
    onOpenEdit() {
      this.$refs.uploadList.getData();
    },
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setDep(dep) {
      this.data.depId = dep.id;
      this.data.depName = dep.name;
    },
    setEmployee(employee) {
      this.data.depId = employee.depId;
      this.data.depName = employee.depName;
      this.data.employeeId = employee.id;
      this.data.employeeName = employee.name;
    },
    onClosed() {
      this.$refs.uploadList.clear();
    },
    onBeforeClose(done) {
      if (this.isEdit) {
        done();
        return;
      }
      if (this.$refs.uploadList.count() > 0) {
        this.$message.warning("请删除已上传的合同附件");
        return;
      }
      done();
    }
  }
};
</script>