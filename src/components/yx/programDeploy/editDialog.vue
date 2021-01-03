<template>
  <common-Dialog
    ref="dialog"
    width="800px"
    :show-save-button="this.data.status!=3&&this.data.status!=4"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    form-label-width="120px"
    :save-func="api.save"
    @edit-opened="onOpened"
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
        <el-col :span="12" v-if="data.businessProspect">
          <el-form-item label="预约勘察时间">{{data.businessProspectDate | toDateString}}</el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="data.businessProspect" :gutter="10">
        <el-col :span="12">
          <el-form-item label="勘察人员">
            <el-col v-if="data.surveyorName==null">人员待分派</el-col>
            <el-col v-else>{{data.surveyorName}}</el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="完成勘察时间">
            <el-col v-if="data.actualProspectDate==null">勘察等待执行</el-col>
            <template v-else>
              <el-col>{{data.actualProspectDate | toDateString}}</el-col>
              <el-link type="primary" @click="openProspectDialog">勘察结果</el-link>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="需方案">
            <el-col v-if="data.businessProgram == 0">无需方案</el-col>
            <el-col v-else>需要方案</el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预计完成时间">{{data.businessProgramDate | toDateString}}</el-form-item>
        </el-col>
      </el-row>
      <template v-if="data.status == 0 || data.status == 1">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="制作人员" prop="producerId">
              <employee-select
                ref="employeeSelect"
                :params="{matchJobName:'方案制作人员'}"
                v-model="data.producerId"
                in-dialog
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需完成方案时间" prop="finishDate">
              <el-date-picker
                v-model="data.finishDate"
                placeholder="选择时间"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="制作人员">{{data.producerName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需完成方案时间">{{data.finishDate | toDateString}}</el-form-item>
          </el-col>
        </el-row>
        <template v-if="data.status!=0&&data.status!=1">
          <el-form-item label="方案上传">
            <attach-list ref="applicationAttachList" card :guid="data.guid" type="Application" />
          </el-form-item>
          <el-row :gutter="10">
            <el-form-item label="方案完成时间">{{data.actualFinishDate | toDateString}}</el-form-item>
          </el-row>
          <template v-if="data.status == 2">
            <el-form-item label="审核结果" prop="approval">
              <el-radio-group v-model="data.approval">
                <el-radio :label="true">通过</el-radio>
                <el-radio :label="false">退回</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核情况" prop="auditSituation">
              <el-input v-model="data.auditSituation" placeholder="填写审核情况"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="审核结果">
              <el-tag v-if="data.status == 3" type="success">通过</el-tag>
              <el-tag v-else type="danger">退回</el-tag>
            </el-form-item>
            <el-form-item label="审核情况">{{data.auditSituation}}</el-form-item>
          </template>
        </template>
      </template>
    </template>
    <prospect-dialog ref="prospectDialog" in-dialog></prospect-dialog>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

import employeeSelect from "@/components/hr/employee/select";
import prospectDialog from "@/components/yx/prospectDeploy/detailDialog";
import attachList from "@/components/common/attach/list";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeSelect,
    prospectDialog,
    attachList
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
        businessProspect: true,
        businessProspectDate: null,
        businessProgram: true,
        businessProgramDate: null
      },
      api: require("@/api/yx/programDeploy").default,
      unit: "方案任务调配",
      rules: {
        producerId: [{ required: true, message: "请选择勘察人员" }],
        finishDate: [{ required: true, message: "请选择时间" }]
      }
    };
  },
  computed: {
    title() {
      console.log();
      let title =
        this.data.status != 3 && this.data.status != 4
          ? "修改 方案制作调配"
          : "详情 方案制作调配";
      return title;
    }
  },
  mounted() {},
  methods: {
    onOpened() {
      if (this.data.status != 0 && this.data.status != 1) {
        this.$refs.applicationAttachList.getData();
        this.data.approval = true;
      } else {
        this.$refs.employeeSelect.getOptions();
      }
    },
    openProspectDialog() {
      this.$refs.prospectDialog.openDetailsById(this.data.prospectId);
    }
  }
};
</script>