<template>
  <common-dialog
    ref="dialog"
    width="500px"
    title="变更司机"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    confirm-on-save
    close-on-saved
    confirm-on-close-change
    confirm-save-text="您确定要变更出行司机吗？"
    save-button-text="变更"
    :save-func="api.changeCar"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="调配车辆" prop="carId">
        <input-select
          v-model="data.carId"
          label-key="licensePlate"
          :options="carOptions"
          @click="openCarDialog"
        />
      </el-form-item>
      <el-form-item label="司机人员" prop="driverId">
        <employee-select ref="employeeSelect" in-dialog v-model="data.driverId" />
      </el-form-item>
    </template>
    <car-dialog ref="carDialog" in-dialog select @select="setCar" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/carTrip";
import employeeSelect from "@/components/hr/employee/select";
import carDialog from "@/components/xz/car/listDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeSelect,
    carDialog
  },
  data() {
    return {
      data: {
        id: 0,
        carLicensePlate: "",
        carId: null,
        driverId: null,
        driverName: ""
      },
      api,
      unit: "用车申请单",
      rules: {
        carId: [{ required: true, message: "请选择调度车辆" }],
        driverId: [{ required: true, message: "请选择司机" }]
      },
      carOptions: []
    };
  },
  methods: {
    onEditOpened() {
      let data = {
        id: this.data.carId,
        licensePlate: this.data.carLicensePlate
      };
      this.carOptions = [data];
      data = {
        id: this.data.driverId,
        name: this.data.driverName
      };
      this.$refs.employeeSelect.setOptions([data]);
    },
    setCar(data) {
      this.data.carId = data.id;
      this.carOptions = [data];
    },
    openCarDialog() {
      this.$refs.carDialog.open().then(that => {
        that.getData({ status: 0 });
      });
    }
  }
};
</script>