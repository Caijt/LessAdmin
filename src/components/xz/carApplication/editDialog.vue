<template>
  <common-dialog
    ref="dialog"
    width="600px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    confirm-on-save
    close-on-saved
    confirm-on-close-change
    confirm-save-text="您确定要提交此用车申请单吗？"
    save-button-text="提交"
    :save-func="api.save"
    @create-opened="onCreateOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-divider>用车申请单</el-divider>
      <el-form-item label="用车时间" style="margin-bottom:0px" required>
        <el-col :span="11">
          <el-form-item prop="beginUseTime">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="data.beginUseTime"
              placeholder="开始时间" 
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col style="text-align:center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endUseTime">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="data.endUseTime"
              placeholder="结束时间" 
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="发车地点" prop="startLocation">
        <el-input v-model="data.startLocation" placeholder="填写发车地点" />
      </el-form-item>
      <el-form-item label="目标地点" prop="targetLocation">
        <el-input v-model="data.targetLocation" placeholder="填写目标地点"/>
      </el-form-item>
      <el-form-item label="用车人员" prop="useEmployeeIds">
        <employee-select in-dialog v-model="data.useEmployeeIds" multiple />
      </el-form-item>
      <el-form-item label="用车原因" prop="reason">
        <el-input type="textarea" v-model="data.reason" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/carApplication";
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
        beginUseTime: "",
        endUseTime: "",
        startLocation:"",
        targetLocation:"",
        useEmployeeIds: [],
        reason:""
      },
      api,
      unit: "用车申请单",
      rules: {
        beginUseTime: [{ required: true, message: "请填写开始用车时间" }],
        endUseTime: [{ required: true, message: "请填写结束用车时间" }],
        startLocation: [{ required: true, message: "请填写发车地点" }],
        targetLocation: [{ required: true, message: "请填写目标地点" }],
        useEmployeeIds: [{ required: true, message: "请选择用车人员" }]
      }
    };
  },
  methods: {
    onCreateOpened(){
      this.data.beginUseTime = this.$commonJs.getNowDatetimeString();
    }
  }
};
</script>