<template>
  <common-dialog
    ref="dialog"
    width="500px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="车牌号码" prop="licensePlate">
        <el-input v-model="data.licensePlate" />
      </el-form-item>
      <el-form-item label="车辆类型" prop="type">
        <el-input v-model="data.type" />
      </el-form-item>
      <el-form-item label="乘坐人数" prop="ratedPassengers">
        <el-input-number v-model="data.ratedPassengers" :min="1" :max="99" />
      </el-form-item>
      <el-form-item label="公里数" prop="mileage" v-if="!isEdit">
        <el-input-number v-model="data.mileage" :min="0" />
      </el-form-item>
      <el-form-item label="购入日期" prop="buyDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="data.buyDate" />
      </el-form-item>
      <el-form-item label="常备司机" prop="driverId">
        <!-- <input-select
          v-model="data.driverId"
          :options="employeeOptions"
          @click="openEmployeeDialog"
        /> -->
        <employee-select :params="{matchJobName:'司机'}" ref="employeeSelect" in-dialog v-model="data.driverId"/>
        <span class="c-tips">* 选择岗位为司机的员工</span>
      </el-form-item>
    </template>
    <employee-dialog in-dialog ref="employeeDialog" select @select="setEmployee" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/car";
import employeeDialog from "@/components/hr/employee/listDialog";
import employeeSelect from "@/components/hr/employee/select";
export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeDialog,
    employeeSelect
  },
  data() {
    return {
      data: {
        id: 0,
        licensePlate: "",
        type: "",
        ratedPassengers: 5,
        mileage: 0,
        buyDate: "",
        driverId: null,
        driverName: ""
      },
      api,
      unit: "车辆档案",
      rules: {
        licensePlate: [{ required: true, message: "请填写车牌号码" }],
        type: [{ required: true, message: "请填写车辆类型" }],
        ratedPassengers: [{ required: true, message: "请填写乘坐人数" }],
        mileage: [{ required: true, message: "请填写车辆公里数" }],
        buyDate: [{ required: true, message: "请填写购入日期" }]
      },
      employeeOptions: []
    };
  },
  methods: {
    onEditOpened() {
      this.$refs.employeeSelect.getOptions();
    },
    setEmployee(data) {
      this.data.driverId = data.id;
      this.employeeOptions = [data];
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getData();
      });
    }
  }
};
</script>