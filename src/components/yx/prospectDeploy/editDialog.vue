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
        <el-col :span="12">
          <el-form-item label="预约勘察时间">{{data.businessProspectDate}}</el-form-item>
        </el-col>
      </el-row>
      <template v-if="data.status == 0 || data.status == 1">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="勘察人员" prop="surveyorId">
              <employee-select
                ref="employeeSelect"
                :params="{matchJobName:'勘察人员'}"
                v-model="data.surveyorId"
                in-dialog
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需完成勘察时间" prop="finishDate">
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
            <el-form-item label="勘察人员">{{data.surveyorName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需完成勘察时间">{{data.finishDate | toDateString}}</el-form-item>
          </el-col>
        </el-row>
        <template v-if="data.status!=0&&data.status!=1">
          <el-form-item label="勘察情况">{{data.prospectSituation}}</el-form-item>
          <el-form-item label="勘察照片">
            <attach-list ref="photoAttachList" card :guid="data.guid" type="Photo" />
          </el-form-item>
          <el-row :gutter="10">
            <el-form-item label="实际勘察时间">{{data.actualFinishDate | toDateString}}</el-form-item>
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
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

import employeeSelect from "@/components/hr/employee/common/select";
import attachList from "@/components/common/attach/list";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    employeeSelect,
    attachList
  },
  data() {
    return {
      data: {
        id: 0,
        guid: null,
        businessId: null,
        surveyorId: null,
        surveyorName: "",
        finishDate: null,
        status: null,
        prospectSituation: "",
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
        businessProspectDate: null
      },
      api: require("@/api/yx/prospectDeploy").default,
      unit: "勘察任务调配",
      rules: {
        surveyorId: [{ required: true, message: "请选择勘察人员" }],
        finishDate: [{ required: true, message: "请选择时间" }]
      }
    };
  },
  computed: {
    title() {
      console.log();
      let title =
        this.data.status != 3 && this.data.status != 4
          ? "修改 勘察任务调配"
          : "详情 勘察任务调配";
      return title;
    }
  },
  mounted() {},
  methods: {
    onOpened() {
      if (this.data.status != 0 && this.data.status != 1) {
        this.$refs.photoAttachList.getData();
        this.data.approval = true;
      } else {
        this.$refs.employeeSelect.getOptions();
      }
    }
  }
};
</script>