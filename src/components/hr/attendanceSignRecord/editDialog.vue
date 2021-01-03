<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    show-save-button
    form-label-width="110px"
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @create-opened="onCreateOpened"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-divider>考勤打卡记录信息</el-divider>
      <el-form-item label="打卡人员" prop="employeeId">
        <employee-select ref="employeeSelect" v-model="data.employeeId" in-dialog />
      </el-form-item>
      <el-form-item label="打卡时间" required>
        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="data.signTime" />
      </el-form-item>
      <el-form-item label="打卡地点" required>
        <qq-map ref="map" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/attendanceSignRecord";
import employeeSelect from "@/components/hr/employee/select";
import qqMap from "@/components/common/maps/qq/map";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeSelect,
    qqMap
  },
  data() {
    return {
      data: {
        id: 0,
        signTime:"",
        employeeId: null,
        location: null
      },
      api,
      unit: "考勤打卡记录",
      rules: {
        name: [{ required: true, message: "请填写考核名称" }],
        employeeId: [{ required: true, message: "请选择打卡人员" }],
        location: [{ required: true, message: "请选择打卡地点" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let location = this.$refs.map.getLocation();
      this.data.lat = location.lat;
      this.data.lng = location.lng;
      this.data.address = this.$refs.map.getAddress();
      return true;
    },
    onCreateOpened() {
      this.data.signTime = this.$commonJs.getNowDatetimeString();
      this.$refs.map.goLocalCity();      
    },
    onEditOpened(data) {
      this.$refs.map.setLocation({ lat: data.lat, lng: data.lng });
      this.$refs.employeeSelect.getOptions();
    }
  }
};
</script>