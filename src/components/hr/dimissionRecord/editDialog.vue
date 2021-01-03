<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    show-save-button
    form-label-width="210px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    confirm-on-close-change
    get-guid-on-create
    @open-edit="onOpenEdit"
    confirm-on-save
    close-on-saved
    save-button-text="提交离职"
    confirm-save-text="您确定要提交该员工离职记录吗？成功保存后将无法修改。"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>员工离职信息</el-divider>
      <el-form-item label="离职员工" prop="employeeId">
        <select-input
          :label="data.employeeName"
          v-model="data.employeeId"
          placeholder="选择离职的员工"
          @click="openEmployeeDialog"
        />
      </el-form-item>
      <el-form-item v-show="data.employeeId" label="所属部门" class="c-form-text-item">
        <span>{{data.depName}}</span>
      </el-form-item>
      <el-form-item label="离职日期" prop="dimissionDate">
        <el-date-picker v-model="data.dimissionDate" value-format="yyyy-MM-dd" placeholder="选择离职日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职类型" prop="type">
        <type-select v-model="data.type" />
      </el-form-item>
      <el-form-item label="离职原因" prop="reason">
        <el-input type="textarea" v-model="data.reason"></el-input>
      </el-form-item>
      <el-form-item label="本部门工作及文件资料交接情况" prop="handover">
        <el-checkbox v-model="data.handover">完成</el-checkbox>
      </el-form-item>
      <el-form-item label="人力资源部相关手续办理情况" prop="hrFormalities">
        <el-checkbox-group v-model="data.hrFormalities">
          <el-checkbox v-for="item in api.hrFormalities" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="行政部相关手续办理情况" prop="administrationFormalities">
        <el-checkbox-group v-model="data.administrationFormalities">
          <el-checkbox v-for="item in api.administrationFormalities" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="财务部结算手续办理情况" prop="financeFormalities">
        <el-checkbox v-model="data.financeFormalities">完成</el-checkbox>
      </el-form-item>
      <el-form-item label="评估表上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import employeeDialog from "@/components/hr/employee/listDialog";
import api from "@/api/hr/dimissionRecord";
import uploadList from "@/components/common/attach/uploadList";
import typeSelect from "./dimissionTypeSelect";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeDialog,
    typeSelect,
    uploadList
  },
  data() {
    let nowDate = this.$commonJs.getNowDateString();
    return {
      data: {
        id: 0,
        guid: null,
        employeeId: null,
        dimissionDate: nowDate,
        type: null,
        reason: "",

        handover: false,
        hrFormalities: [],
        administrationFormalities: [],
        financeFormalities: false,

        employeeName: "",
        depName: ""
      },
      api,
      unit: "员工离职记录",
      rules: {
        employeeId: [{ required: true, message: "请选择要转正的员工" }],
        dimissionDate: [{ required: true, message: "请选择员工离职日期" }],
        type: [{ required: true, message: "请选择员工离职类型" }]
      }
    };
  },
  methods: {
    onOpenEdit() {
      this.$refs.uploadList.getData();
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getData({ showDimission: false });
      });
    },
    setEmployee(employee) {
      this.data.depId = employee.depId;
      this.data.depName = employee.depName;
      this.data.employeeId = employee.id;
      this.data.employeeName = employee.name;
    },
    onClosed() {
      this.$refs.uploadList.clear();
    },
    onBeforeClose(done) {
      if (this.isEdit) {
        done();
        return;
      }
      if (this.$refs.uploadList.count() > 0) {
        this.$message.warning("请删除已上传的评估表附件");
        return;
      }
      done();
    }
  }
};
</script>