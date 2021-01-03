<template>
  <common-Dialog
    ref="dialog"
    width="800px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
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
          <el-form-item label="需勘察">{{data.businessProspect?"是":"否"}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约勘察时间">{{data.businessProspectDate}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="勘察人员">{{data.surveyorName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需完成勘察时间">{{data.finishDate | toDateString}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="勘察情况">{{data.prospectSituation}}</el-form-item>
      <el-form-item label="勘察照片">
        <attach-list ref="photoAttachList" card :guid="data.guid" type="Photo" />
      </el-form-item>
      <el-row :gutter="10">
        <el-form-item label="实际勘察时间">{{data.actualFinishDate | toDateString}}</el-form-item>
      </el-row>
      <el-form-item label="审核结果">
        <el-tag v-if="data.status == 3" type="success">通过</el-tag>
        <el-tag v-else-if="data.status == 4" type="danger">退回</el-tag>
        <el-tag v-else>待审核</el-tag>
      </el-form-item>
      <el-form-item label="审核情况">{{data.auditSituation}}</el-form-item>
    </template>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";

import attachList from "@/components/common/attach/list";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    attachList
  },
  data() {
    return {
      data: {
        id: 0,
        guid: null,
        businessId: null,
        surveyorName: "",
        finishDate: null,
        status: null,
        prospectSituation: "",
        actualFinishDate: null,
        auditSituation: null,
        businessCustomerName: "",
        businessCustomerPhone: "",
        businessCustomerAddress: "",
        businessCustomerContact: "",
        businessCustomerTypeName: "",
        businessProjectName: "",
        businessMetacilTypeName: "",
        businessType: null,
        businessProspect: true,
        businessProspectDate: null
      },
      api: require("@/api/yx/prospectDeploy").default,
      unit: "勘察任务调配"
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onDetailsOpened() {
      this.$refs.photoAttachList.getData();
    }
  }
};
</script>