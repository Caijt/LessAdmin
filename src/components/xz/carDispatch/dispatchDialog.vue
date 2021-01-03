<template>
  <common-dialog
    ref="dialog"
    width="600px"
    title="用车申请调度"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    confirm-on-save
    right
    show-save-button
    close-on-saved
    confirm-on-close-change
    confirm-save-text="您确定要对这些用车申请单进行车辆调度吗？"
    save-button-text="提交"
    :save-func="api.dispatch"
    :before-save="onBeforeSave"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-divider>用车申请单</el-divider>
      <el-row :gutter="10">
        <el-col :span="12" v-for="(a,index) in selectedApplications" :key="index">
          <el-popover placement="top-start" width="500" trigger="click">
            <div class="c-form-text">
              <el-form-item label="申请时间">{{a.createTime}}</el-form-item>
              <el-form-item label="申请人">{{a.createUserName}}</el-form-item>
              <el-form-item
                label="用车时间"
              >{{a.beginUseTime | toShortDatetimeString}} 至 {{a.endUseTime|toShortDatetimeString}}</el-form-item>

              <el-form-item label="发车地点">{{a.startLocation}}</el-form-item>
              <el-form-item label="目标地点">{{a.targetLocation}}</el-form-item>
              <el-form-item label="用车原因">{{a.reason}}</el-form-item>
              <el-form-item label="用车人员">
                <el-button
                  type="text"
                  icon="el-icon-user-solid"
                  v-for="(item,index) in a.useEmployeeNames"
                  :key="index"
                >{{item}}</el-button>
              </el-form-item>
              <el-form-item label="用车人数">{{a.passengerAmount}}</el-form-item>
            </div>
            <el-card
              slot="reference"
              shadow="hover"
              style="margin-bottom:10px;cursor:pointer;position: relative;"
            >
              <el-button
                size="large"
                icon="el-icon-close"
                @click.stop="remove(index)"
                type="text"
                circle
                class="abc"
              />
              <el-form class="c-form-text" label-width="65px">
                <el-form-item label="单号" class="no-border">{{a.no}}</el-form-item>
                <el-form-item label="申请人" class="no-border">{{a.createUserName}}</el-form-item>
              </el-form>
            </el-card>
          </el-popover>
        </el-col>
        <el-col :span="12">
          <div style="text-align:center;line-height:110px">
            <el-button size="large" icon="el-icon-plus" @click="openApplicationDialog" circle />
          </div>
        </el-col>
      </el-row>
      <div class="c-h10"></div>
      <el-divider>调配车辆</el-divider>
      <el-form-item label="调配车辆" prop="carId">
        <input-select
          v-model="data.carId"
          label-key="licensePlate"
          :options="carOptions"
          @click="openCarDialog"
        />
      </el-form-item>
      <el-form-item label="司机人员" prop="driverId">
        <employee-select
          ref="employeeSelect"
          :params="{matchJobName:'司机'}"
          in-dialog
          v-model="data.driverId"
        />
      </el-form-item>
      <el-form-item label="发车时间" prop="startTime">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          v-model="data.startTime"
          style="width:100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="发车地点" prop="startLocation">
        <el-input v-model="data.startLocation"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="data.remarks"></el-input>
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
import employeeSelect from "@/components/hr/employee/common/select";
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
        startLocation: "",
        startTime: "",
        carId: null,
        driverId: null,
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
      if(this.selectedApplications.length==1){
        let app = this.selectedApplications[0];
        console.log(app);
        this.data.startLocation = app.startLocation;
        this.data.startTime = app.beginUseTime;
      }
    },
    onBeforeSave() {
      let applicationIds = this.selectedApplications.map(item => item.id);
      if (applicationIds.length == 0) {
        this.$message.warning("请选择要调度的用车申请单");
        return false;
      }
      this.data.applicationIds = applicationIds;
      return true;
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
        that.getData({ notIds, isDispatch: false, status: 2 });
      });
    },
    onSelectMultiple(rows) {
      this.selectedApplications = this.selectedApplications.concat(rows);
    },
    remove(index) {
      this.selectedApplications.splice(index, 1);
    }
  }
};
</script>
<style>
.abc {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>