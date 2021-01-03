<template>
  <common-dialog
    ref="dialog"
    width="650px"
    form-label-width="110px"
    close-on-saved
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :before-save="onBeforeSave"
    :save-func="()=>{}"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="节点选人类型" prop="isFixedType">
        <el-radio-group v-model="data.isFixedType">
          <el-radio :label="false">考核人领导</el-radio>
          <el-radio :label="true">指定领导</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级领导级别" prop="leaderLevel" v-if="!data.isFixedType">
        <el-input-number v-model="data.leaderLevel" :min="0"></el-input-number>
        <span class="c-tips">* 0 代表本部门领导，1 代表上一级部门的领导，以此类推</span>
      </el-form-item>
      <el-form-item label="考核节点领导" prop="employeeId" v-else>
        <select-input
          v-model="data.employeeId"
          :label="data.employeeName"
          @click="openEmployeeDialog"
        />
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button @click="close">关 闭</el-button>
    </template>
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import employeeDialog from "@/components/hr/employee/listDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, employeeDialog },
  data() {
    return {
      data: {
        id: 0,
        isFixedType: false,
        leaderLevel: null,
        employeeId: null
      },
      unit: "绩效考核节点",
      rules: {
        isFixedType: [{ required: true, message: "请选择考核节点类型" }],
        leaderLevel: [{ required: true, message: "请选择级别" }],
        employeeId: [{ required: true, message: "请选择节点指定成员" }]
      }
    };
  },
  methods: {
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce({
          isLeader: true
        });
      });
    },
    setEmployee(employee) {
      this.data.employeeId = employee.id;
      this.data.employeeName = employee.name;
    },
    onBeforeSave() {
      if (this.data.isFixedType) {
        this.data.leaderLevel = null;
      } else {
        this.data.employeeId = null;
        this.data.employeeName = null;
      }
      this.$emit("saved", { ...this.data });
      this.close();
      return false;
    }
  }
};
</script>