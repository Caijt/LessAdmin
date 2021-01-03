<template>
  <common-form
    ref="form"
    :data="data"
    :rules="rules"
    label-width="100px"
    label-position="top"
    :show-save-button="$permission.canWrite()"
    :get-data-func="api.getEdit"
    :save-func="api.save"
    @data-got="onDataGot"
  >
    <el-divider>考勤忽略规则</el-divider>
    <el-form-item label="无需考勤部门">
      <dep-select v-model="data.depIds" multiple />
    </el-form-item>
    <el-form-item label="无需考勤职务">
      <post-select v-model="data.postIds" multiple />
    </el-form-item>
    <el-form-item label="无需考勤员工">
      <employee-select in-dialog v-model="data.employeeIds" ref="employeeSelect" multiple />
    </el-form-item>
  </common-form>
</template>
<script>
import commonForm from "@/components/common/form";
import depSelect from "@/components/hr/department/treeSelect";
import employeeSelect from "@/components/hr/employee/select";
import postSelect from "@/components/sys/baseData/post/select";
import api from "@/api/hr/attendanceIgnore";
export default {
  components: { commonForm, depSelect, employeeSelect, postSelect },
  data() {
    return {
      data: {
        depIds: [],
        employeeIds: [],
        postIds: []
      },
      rules: {},
      api
    };
  },
  methods: {
    getData() {
      return this.$refs.form.getData();
    },
    onDataGot() {
      this.$refs.employeeSelect.getOptions();
    }
  }
};
</script>