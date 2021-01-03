<template>
  <common-dialog
    :title="title"
    ref="dialog"
    width="600px"
    show-save-button
    confirm-on-close-change
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    get-guid-on-create
    :get-data-func="api.getEditById"
    :before-close="onBeforeClose"
    @create-opened="onCreateOpened"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="实施日期" prop="implementDate">
        <el-date-picker v-model="data.implementDate" value="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="实施情况" prop="content">
        <el-input v-model="data.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="实施结果" prop="isFinish">
        <el-radio-group v-model="data.isFinish">
          <el-radio :label="false">实施中</el-radio>
          <el-radio :label="true">已完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="现场图片">
        <attach-upload ref="attachUpload" multiple card :guid="data.guid"  limitType="image"/>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xm/taskImplement";
import attachUpload from "@/components/common/attach/uploadList";
export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    attachUpload
  },
  data() {
    let validator = (rule, value, callback) => {
      if (this.data.depIds.length == 0 && this.data.employeeIds.length == 0) {
        callback(new Error("考勤参与部门及参与人员不能同时为空"));
      } else {
        callback();
      }
    };
    return {
      dialogTitle: "",
      data: {
        id: 0,
        guid: "",
        implementDate:"",
        taskId: null,
        content: "",
        isFinish: false
      },
      api,
      unit: "实施进度记录",
      rules: {
        implementDate: [{ required: true, message: "请填写实施日期" }],
        content: [{ required: true, message: "请填写实施情况内容" }],
        isFinish: [{ required: true, message: "请选择实施状态" }]
      }
    };
  },
  methods: {
    onCreateOpened(){
      this.data.implementDate = this.$commonJs.getNowDateString();
    },
    onEditOpened(data) {
      this.$refs.attachUpload.getData();
    },
    onClosed() {
      this.$refs.attachUpload.clear();
    },
    onBeforeClose(done) {
      if (this.isEdit) {
        done();
        return;
      }
      if (this.$refs.attachUpload.count() > 0) {
        this.$message.warning("请删除已上传的照片");
        return;
      }
      done();
    }
  }
};
</script>