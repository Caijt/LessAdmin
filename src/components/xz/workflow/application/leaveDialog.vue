<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    show-save-button
    form-label-width="110px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.saveLeaveApplication"
    confirm-on-close-change
    get-guid-on-create
    @edit-opened="onEditOpened"
    confirm-on-save
    close-on-saved
    save-button-text="提交"
    confirm-save-text="您确定要提交该请假申请单吗？"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>请假申请单</el-divider>
      <el-form-item prop="suffix" label="申请标题">
        <el-input v-model="data.suffix" placeholder="标题后缀">
          <template slot="prepend">请假申请单_[员工名]_YYYYMM0001</template>
        </el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="请假开始时间" prop="beginTime">
            <el-date-picker
              v-model="data.beginTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="开始时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请假结束时间" prop="endTime">
            <el-date-picker
              v-model="data.endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="请假类型" prop="type">
        <el-select v-model="data.type">
          <el-option v-for="(item,index) in api.leaveTypes" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请假原因" prop="reason">
        <el-input type="textarea" v-model="data.reason"></el-input>
      </el-form-item>
      <el-form-item label="附件上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/workflow";
import uploadList from "@/components/common/attach/uploadList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    uploadList
  },
  data() {
    return {
      data: {
        id: 0,
        guid: null,
        suffix: "",
        beginTime: "",
        endTime: "",
        duration: 0,
        type: "",
        reason: ""
      },
      api,
      unit: "请假申请单",
      rules: {
        beginTime: [{ required: true, message: "请选择请假开始时间" }],
        endTime: [{ required: true, message: "请选择请假结束时间" }]
      }
    };
  },
  methods: {
    onEditOpened() {
      this.$refs.uploadList.getData();
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
        this.$message.warning("请删除已上传的附件");
        return;
      }
      done();
    }
  }
};
</script>