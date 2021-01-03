<template>
  <common-dialog
    ref="dialog"
    width="600px"
    form-text
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>用车申请单信息</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="申请单号">{{data.no}}</el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="申请人">{{data.createUserName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">{{data.createTime}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="用车时间"
      >{{data.beginUseTime | toShortDatetimeString}} 至 {{data.endUseTime | toShortDatetimeString}}</el-form-item>
      <el-form-item label="发车地点">{{data.startLocation}}</el-form-item>
      <el-form-item label="目标地点">{{data.targetLocation}}</el-form-item>
      <el-form-item label="用车原因">{{data.reason}}</el-form-item>
      <el-form-item label="用车人员">
        <el-button
          type="text"
          icon="el-icon-user-solid"
          v-for="(item,index) in data.useEmployeeNames"
          :key="index"
        >{{item}}</el-button>
      </el-form-item>
      <el-form-item label="用车人数">{{data.passengerAmount}} 人</el-form-item>
      <el-divider>审批结果</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="审批结果" class="no-border">
            <el-tag v-if="data.status==0" type="info">未审批</el-tag>
            <el-tag v-if="data.status==1" type="danger">审批不通过</el-tag>
            <el-tag v-if="data.status==2" type="success">审批通过</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批时间" v-show="data.status!=0">{{data.approvalTime}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="审批意见" v-show="data.status!=0">{{data.approvalRemark}}</el-form-item>
      <div v-show="data.status==2">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="调配车辆">{{data.carLicensePlate}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机">{{data.driverName}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系电话">{{data.driverPhone}}</el-form-item>
      </div>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/xz/carApplication";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog
  },
  data() {
    return {
      data: {
        id: 0,
        status: 0,
        no: "",
        createTime: "",
        createUserName: "",
        beginUseTime: "",
        approvalTime:"",
        endUseTime: "",
        startLocation: "",
        targetLocation: "",
        reason: "",
        passengerAmount: 0,
        useEmployeeNames: [],
        driverName: "",
        driverPhone: "",
        carLicensePlate:"",
        approvalRemark: ""
      },
      api,
      unit: "用车申请单"
    };
  },
  methods: {
    onDetailsOpened() {},
    onClosed() {}
  }
};
</script>