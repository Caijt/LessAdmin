<template>
  <common-dialog
    ref="dialog"
    width="500px"
    :title="title"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="借用员工" prop="borrowEmployeeId">
        <employee-select ref="employeeSelect" in-dialog v-model="data.borrowEmployeeId" @select="onSelectEmployee"/>
      </el-form-item>
      <el-form-item label="借用部门" prop="borrowDepId">
        {{data.borrowDepName || "-"}}
      </el-form-item>      
      <el-form-item label="借用日期" prop="borrowDate">
        <el-date-picker v-model="data.borrowDate" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="归还日期" prop="returnDate">
        <el-date-picker v-model="data.returnDate" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/qualificationBorrowRecord";
import employeeSelect from "@/components/hr/employee/common/select";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeSelect
  },
  data() {
    return {
      data: {
        id: 0,
        borrowDepId: null,
        borrowEmployeeId: null,
        qualificationId: null,
        borrowDate: "",
        returnDate: "",
        borrowDepName:""
      },
      api,
      unit: "借用记录",
      rules: {
        borrowDepId: [{ required: true, message: "请选择借用部门" }],
        borrowEmployeeId: [{ required: true, message: "请选择借用员工" }],
        borrowDate: [{ required: true, message: "请选择借用日期" }]
      },
      employeeOptions: []
    };
  },
  methods: {
    onSelectEmployee(data) {
     
      this.data.borrowDepName = data.depName;
      this.data.borrowDepId = data.depId;
     
    },
    onEditOpened(data) {
      this.$refs.employeeSelect.getOptions();
    }
  }
};
</script>