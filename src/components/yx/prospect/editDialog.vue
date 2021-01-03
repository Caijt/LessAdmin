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
    form-label-width="120px"
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
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="勘察人员">{{data.surveyorName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需完成勘察时间">{{data.finishDate|toDateString}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="this.isReturn" label="退回原因">{{data.auditSituation}}</el-form-item>
      <el-form-item label="实际勘察时间" prop="actualFinishDate">
        <el-date-picker
          v-model="data.actualFinishDate"
          placeholder="选择时间"
          value-format="yyyy-MM-dd"
          style="width: 180px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="勘察照片">
        <upload-list ref="photoUploadList" multiple card :guid="data.guid" type="Photo" />
      </el-form-item>
      <el-form-item label="勘察情况" prop="prospectSituation">
        <el-input type="textarea" v-model="data.prospectSituation" placeholder="填写勘察情况"></el-input>
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
        businessId: null,
        surveyorId: null,
        surveyorName: "",
        status: null,
        approval: null,
        finishDate: null,
        actualFinishDate: null,
        prospectSituation: "",
        auditSituation: "",
        businessCustomerName: "",
        businessCustomerPhone: "",
        businessCustomerAddress: "",
        businessCustomerContact: "",
        businessCustomerTypeName: "",
        businessProjectName: "",
        businessMetacilTypeName: "",
        businessType: null
      },
      isReturn: false,
      api: require("@/api/yx/prospectDeploy").default,
      unit: "勘察任务管理",
      rules: {
        actualFinishDate: [{ required: true, message: "请选择时间" }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onEditOpened() {
      this.$refs.photoUploadList.getData();
      console.log(this.data.status);
      this.isReturn = this.data.status == 4;
      this.data.status = 2;
      console.log(this.data.status);
    }
  }
};
</script>