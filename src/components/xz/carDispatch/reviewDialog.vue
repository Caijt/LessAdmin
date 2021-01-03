<template>
  <common-dialog
    ref="dialog"
    width="600px"
    title="用车申请审批"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    confirm-on-save
    right
    show-save-button
    close-on-saved
    confirm-on-close-change
    confirm-save-text="您确定要提交审批吗？"
    save-button-text="提交"
    :save-func="api.review"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-divider>用车申请单</el-divider>
      <div class="c-form-text">
        <el-form-item label="申请时间">{{data.createTime}}</el-form-item>
        <el-form-item label="申请人">{{data.createUserName}}</el-form-item>
        <el-form-item
          label="用车时间"
        >{{data.beginUseTime | toShortDatetimeString}} 至 {{data.endUseTime|toShortDatetimeString}}</el-form-item>

        <el-form-item label="发车地点">{{data.startLocation}}</el-form-item>
        <el-form-item label="目标地点">{{data.targetLocation}}</el-form-item>
        <el-form-item label="用车原因">{{data.reason}}</el-form-item>
        <el-form-item label="用车人员">
          <el-button
            type="text"
            icon="el-icon-user-solid"
            v-for="(item,index) in data.useEmployeeNames"
            :key="index"
          >{{item}}</el-button>
        </el-form-item>
        <el-form-item label="用车人数">{{data.passengerAmount}}</el-form-item>
      </div>
      <div class="c-h10"></div>
      <el-divider>审批</el-divider>
      <el-form-item label="审批结果" prop="isPass">
        <el-radio-group v-model="data.isPass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批意见" prop="approvalRemark">
        <el-input type="textarea" v-model="data.approvalRemark" />
      </el-form-item>
    </template>
    <car-dialog ref="carDialog" in-dialog select @select="setCar" />
    <application-dialog
      ref="applicationDialog"
      in-dialog
      selectable
      multiple
      @select-multiple="onSelectMultiple"
    />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/carDispatch";
import employeeSelect from "@/components/hr/employee/select";
import carDialog from "@/components/xz/car/listDialog";
import applicationDialog from "./listDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeSelect,
    carDialog,
    applicationDialog
  },
  data() {
    return {
      data: {
        id: 0,
        beginUseTime: "",
        endUseTime: "",
        startLocation: "",
        targetLocation: "",
        reason: "",
        createTime: "",
        createUserName: "",
        passengerAmount: 0,
        useEmployeeNames: [],
        carId: null,
        driverId: null,
        approvalRemark: "",
        isPass: true,
        applicationIds: []
      },
      selectedApplications: [],
      api,
      unit: "用车申请单",
      rules: {
        isPass: [{ required: true, message: "请选择审批结果" }],
        carId: [{ required: true, message: "请选择调度车辆" }],
        driverId: [{ required: true, message: "请选择司机" }],
        startTime: [{ required: true, message: "请选择发车时间" }],
        startLocation: [{ required: true, message: "请选择发车地点" }]
      },
      carOptions: []
    };
  },
  methods: {
    onEditOpened(data) {
      this.selectedApplications = data.applications;
    },
    setCar(data) {
      this.data.carId = data.id;
      this.carOptions = [data];
      let driver = {
        id: data.driverId,
        name: data.driverName
      };
      this.data.driverId = data.driverId;
      this.$refs.employeeSelect.setOptions([driver]);
    },
    openCarDialog() {
      this.$refs.carDialog.open().then(that => {
        that.getData();
      });
    },
    pass() {
      this.data.isPass = true;
      this.save();
    },
    noPass() {
      this.data.isPass = false;
      this.save();
    },
    openApplicationDialog() {
      let notIds = this.selectedApplications.map(item => item.id);
      this.$refs.applicationDialog.open().then(that => {
        that.getData({ notIds });
      });
    },
    onSelectMultiple(rows) {
      this.selectedApplications = this.selectedApplications.concat(rows);
    }
  }
};
</script>