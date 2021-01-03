<template>
  <common-dialog
    ref="dialog"
    width="800px"
    right
    show-save-button
    save-button-text="提交"
    confirm-on-save
    close-on-saved
    confirm-save-text="你确定要提交此领用记录吗？（提交后无法修改）"
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @create-opened="onCreateOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="领用时间" prop="useTime">
        <el-date-picker
          type="datetime"
          v-model="data.useTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择领用时间"
        ></el-date-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="领用人" prop="useEmployeeId">
            <employee-select :params="{depId:data.useDepId}" in-dialog v-model="data.useEmployeeId" @select="onSelectEmployee"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领用部门" prop="useDepId">
            <dep-select v-model="data.useDepId"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="领用原因" prop="reason">
        <el-input type="textarea" v-model="data.reason" placeholder="填写领用原因"></el-input>
      </el-form-item>
    </template>
    <el-divider>领用明细</el-divider>
    <edit-item-list ref="editItemList" in-dialog></edit-item-list>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import editItemList from "./editItemList";
import api from "@/api/qx/useRecord";
import employeeSelect from "@/components/hr/employee/common/select";
import depSelect from "@/components/hr/department/treeSelect";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, editItemList, depSelect, employeeSelect },
  data() {
    return {
      data: {
        id: 0,
        useEmployeeId: null,
        useDepId: null,
        reason: "",
        useTime: "",
        useRecordItems: null
      },
      api,
      unit: "领用记录",
      rules: {
        useEmployeeId: [{ required: true, message: "请选择领用人" }],
        useDepId: [{ required: true, message: "请选择领用部门" }],
        useTime: [{ required: true, message: "请选择领用时间" }]
      }
    };
  },
  methods: {
    onCreateOpened(){
      this.data.useTime = this.$commonJs.getNowDatetimeString();
    },
    onBeforeSave() {
      let items = this.$refs.editItemList.getItems();
      if (items.length == 0) {
        this.$message.warning("请添加领用明细");
        return false;
      }
      if (items.some(item => item.apparatusId == null)) {
        this.$message.warning("请完善领用明细字段");
        return false;
      }
      this.data.useRecordItems = items;
      return true;
    },
    onClosed() {
      this.$refs.editItemList.reset();
    },
    onSelectEmployee(employee) {
      this.data.useDepId = employee.depId;
    }
  }
};
</script>