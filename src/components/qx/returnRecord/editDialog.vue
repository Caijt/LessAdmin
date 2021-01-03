<template>
  <common-dialog
    ref="dialog"
    width="800px"
    right
    show-save-button
    save-button-text="提交"
    confirm-on-save
    close-on-saved
    confirm-save-text="你确定要提交此归还记录吗？（提交后无法修改）"
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @open="onOpen"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="归还时间" prop="returnTime">
        <el-date-picker
          type="datetime"
          v-model="data.returnTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择归还时间"
        ></el-date-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="归还人" prop="returnEmployeeId">
            <select-input
              ref="employeeSelectInput"
              v-model="data.returnEmployeeId"
              placeholder="点击选择归还人"
              @click="openEmployeeDialog"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归还部门" prop="returnDepId">
            <select-input
              ref="depSelectInput"
              v-model="data.returnDepId"
              placeholder="点击选择归还部门"
              @click="openDepDialog"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="归还原因" prop="reason">
        <el-input type="textarea" v-model="data.reason" placeholder="填写归还原因"></el-input>
      </el-form-item>
    </template>
    <el-divider>归还明细</el-divider>
    <edit-item-list :return-employee-id="data.returnEmployeeId" ref="editItemList" in-dialog></edit-item-list>
    <dep-dialog ref="depDialog" in-dialog select @select="setDep"></dep-dialog>
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import editItemList from "./editItemList";
import api from "@/api/qx/returnRecord";
import employeeDialog from "@/components/hr/employee/listDialog";
import depDialog from "@/components/hr/department/listDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, editItemList, depDialog, employeeDialog },
  data() {
    return {
      data: {
        id: 0,
        returnEmployeeId: null,
        returnDepId: null,
        reason: "",
        returnTime: "",
        returnRecordItems: null
      },
      api,
      unit: "归还记录",
      rules: {
        returnEmployeeId: [{ required: true, message: "请选择归还人" }],
        returnDepId: [{ required: true, message: "请选择归还部门或班组" }],
        returnTime: [{ required: true, message: "请选择归还时间" }]
      }
    };
  },
  methods: {
    onOpen() {
      this.data.returnTime = this.$commonJs.getNowDatetimeString();
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    onBeforeSave() {
      let items = this.$refs.editItemList.getItems();
      if (items.length == 0) {
        this.$message.warning("请添加归还明细");
        return false;
      }
      if (items.some(item => item.apparatusId == null)) {
        this.$message.warning("请完善归还明细字段");
        return false;
      }
      this.data.returnRecordItems = items;
      return true;
    },
    onClosed() {
      this.$refs.editItemList.reset();
    },
    setDep(dep) {
      this.data.returnDepId = dep.id;
      this.$refs.depSelectInput.setName(dep.name);
    },
    setEmployee(employee) {
      this.data.returnEmployeeId = employee.id;
      this.$refs.employeeSelectInput.setName(employee.name);
      this.setDep({ id: employee.depId, name: employee.depName });
    }
  }
};
</script>