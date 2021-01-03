<template>
  <common-dialog
    ref="dialog"
    width="800px"
    right
    show-save-button
    save-button-text="提交"
    form-label-width="100px"
    confirm-on-save
    close-on-saved
    confirm-save-text="你确定要提交此调配记录吗？（提交后无法修改）"
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
      <el-form-item label="调配时间" prop="allocateTime">
        <el-date-picker
          type="datetime"
          v-model="data.allocateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择调配时间"
        ></el-date-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="原领用人" prop="sourceEmployeeId">
            <select-input
              ref="sourceEmployeeSelectInput"
              v-model="data.sourceEmployeeId"
              placeholder="点击选择原领用人"
              @click="openEmployeeDialog(true)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原领用部门" prop="sourceDepId">
            <select-input
              ref="sourceDepSelectInput"
              v-model="data.sourceDepId"
              placeholder="点击选择归还部门"
              @click="openDepDialog(true)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="新领用人" prop="destEmployeeId">
            <select-input
              ref="destEmployeeSelectInput"
              v-model="data.destEmployeeId"
              placeholder="点击选择新领用人"
              @click="openEmployeeDialog(false)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新领用部门" prop="destDepId">
            <select-input
              ref="destDepSelectInput"
              v-model="data.destDepId"
              placeholder="点击选择新领用部门"
              @click="openDepDialog(false)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="调配原因" prop="reason">
        <el-input type="textarea" v-model="data.reason" placeholder="填写调配原因"></el-input>
      </el-form-item>
    </template>
    <el-divider>调配明细</el-divider>
    <edit-item-list :source-employee-id="data.sourceEmployeeId" ref="editItemList" in-dialog></edit-item-list>
    <dep-dialog ref="depDialog" in-dialog select @select="setDep"></dep-dialog>
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import editItemList from "./editItemList";
import api from "@/api/qx/allocateRecord";
import employeeDialog from "@/components/hr/employee/listDialog";
import depDialog from "@/components/hr/department/listDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, editItemList, depDialog, employeeDialog },
  data() {
    let validator = (rule, value, callback) => {
      if (value) {
        if (value == this.data.sourceEmployeeId) {
          callback(new Error("新领用人不能与原领用人一样"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        sourceEmployeeId: null,
        sourceDepId: null,
        destEmployeeId: null,
        destDepId: null,
        reason: "",
        allocateTime: "",
        allocateRecordItems: null
      },
      isSelectSource: true,
      api,
      unit: "调配记录",
      rules: {
        sourceEmployeeId: [{ required: true, message: "请选择原领用人" }],
        sourceDepId: [{ required: true, message: "请选择原领用部门或班组" }],
        destEmployeeId: [
          { required: true, message: "请选择新的领用人" },
          { validator, trigger: "blur" }
        ],
        destDepId: [{ required: true, message: "请选择新的领用部门或班组" }],
        allocateTime: [{ required: true, message: "请选择调配时间" }]
      }
    };
  },
  methods: {
    onCreateOpened() {
      this.data.allocateTime = this.$commonJs.getNowDatetimeString();
    },
    openEmployeeDialog(isSource = true) {
      this.isSelectSource = isSource;
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    openDepDialog(isSource = true) {
      this.isSelectSource = isSource;
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    onBeforeSave() {
      let items = this.$refs.editItemList.getItems();
      if (items.length == 0) {
        this.$message.warning("请添加调配明细");
        return false;
      }
      if (items.some(item => item.apparatusId == null)) {
        this.$message.warning("请完善调配明细字段");
        return false;
      }
      this.data.allocateRecordItems = items;
      return true;
    },
    onClosed() {
      this.$refs.editItemList.reset();
    },
    setDep(dep) {
      if (this.isSelectSource) {
        this.data.sourceDepId = dep.id;
        this.$refs.sourceDepSelectInput.setName(dep.name);
      } else {
        this.data.destDepId = dep.id;
        this.$refs.destDepSelectInput.setName(dep.name);
      }
      this.$refs.depDialog.close();
    },
    setEmployee(employee) {
      if (this.isSelectSource) {
        this.data.sourceEmployeeId = employee.id;
        this.$refs.sourceEmployeeSelectInput.setName(employee.name);
      } else {
        this.data.destEmployeeId = employee.id;
        this.$refs.destEmployeeSelectInput.setName(employee.name);
      }
      this.setDep({ id: employee.depId, name: employee.depName });
      this.$refs.employeeDialog.close();
    }
  }
};
</script>