<template>
  <common-Dialog
    ref="dialog"
    width="800px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    @edit-opened="onEditOpened"
    :form-rules="rules"
    form-label-width="110px"
    :before-save="onBeforeSave"
    :save-func="api.save"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="客户名称">{{data.businessCustomerName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户类型">{{data.businessCustomerTypeName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人">{{data.businessCustomerContact}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">{{data.businessCustomerPhone}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="服务地址">{{data.businessCustomerAddress}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称">{{data.businessProjectName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="灭害种类">{{data.businessMetacilTypeName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务类型">{{data.businessType == 0?"普通项目":"应急项目"}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="data.businessProspect">
        <el-col :span="12">
          <el-form-item label="制作人员">{{data.producerName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需完成制作时间">{{data.finishDate|toDateString}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="this.isReturn" label="退回原因">{{data.auditSituation}}</el-form-item>
      <el-form-item label="实际完成时间" prop="actualFinishDate">
        <el-date-picker
          v-model="data.actualFinishDate"
          placeholder="选择时间"
          value-format="yyyy-MM-dd"
          style="width: 180px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="方案上传">
        <upload-list
          ref="applicationUploadList"
          multiple
          card
          :guid="data.guid"
          type="Application"
        />
      </el-form-item>
    </template>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

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
        status: null,
        businessId: null,
        prospectId: null,
        surveyorName: "",
        actualProspectDate: null,
        producerId: null,
        producerName: "",
        finishDate: null,
        actualFinishDate: null,
        auditSituation: null,
        approval: null,
        businessCustomerName: "",
        businessCustomerPhone: "",
        businessCustomerAddress: "",
        businessCustomerContact: "",
        businessCustomerTypeName: "",
        businessProjectName: "",
        businessMetacilTypeName: "",
        businessType: null,
        businessProspect: true
      },
      isReturn: false,
      api: require("@/api/yx/programDeploy").default,
      unit: "方案制作管理",
      rules: {
        actualFinishDate: [{ required: true, message: "请选择时间" }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onEditOpened() {
      this.$refs.applicationUploadList.getData();
      console.log(this.data.status);
      this.isReturn = this.data.status == 4;
      this.data.status = 2;
      console.log(this.data.status);
    },
    onBeforeSave() {
      let attachCount = this.$refs.applicationUploadList.count();
      if (attachCount <= 0) {
        console.log("attachCount: " + attachCount);
        this.$message({
          message: "方案未上传",
          type: "warning"
        });
        return false;
      }
    }
  }
};
</script>