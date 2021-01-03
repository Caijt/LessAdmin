<template>
  <common-dialog
    ref="dialog"
    width="800px"
    form-text
    title="商机详情"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="客户名称">{{data.customerName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户类型">{{data.customerTypeName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人">{{data.customerContact}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">{{data.customerPhone}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="服务地址">{{data.customerAddress}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="项目名称">{{data.projectName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务员">{{data.salesmanName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="业务类型">{{data.businessType==0?"普通项目":"应急项目"}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="灭害种类">{{data.metacilTypeName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="勘察">{{data.prospect?'需要勘察':'无需勘察'}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约勘察时间">
            <el-col v-if="data.prospect">{{data.prospectDate | toDateString}}</el-col>
            <el-col v-else>无</el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="方案">{{data.program?"需要方案":"无需方案"}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预约完成时间">
            <el-col v-if="data.program">{{data.programDate | toDateString}}</el-col>
            <el-col v-else>无</el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="业务来源">{{data.businessSourceName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源渠道">
            <el-col v-if="data.channel==0">网络推广</el-col>
            <el-col v-else-if="data.channel==1">老客户介绍</el-col>
            <el-col v-else-if="data.channel==2">内部人员</el-col>
            <el-col v-else>自增</el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="具体来源">
            <el-col v-if="data.channel==2">{{data.insiderName}}</el-col>
            <el-col v-else>{{data.specificSource}}</el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" class="no-border">
            <el-tag v-if="data.status==1" type="success">达成</el-tag>
            <el-tag v-else-if="data.status==0" type="danger">失败</el-tag>
            <el-tag v-else>跟进</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <el-divider>跟进日志</el-divider>
    <div v-if="data.status==2" style="margin-bottom:5px">
      <el-button type="primary" @click="create('Implement')">添加</el-button>
    </div>
    <el-table :data="businessLogs">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="跟进日期" prop="followUpDate">
        <template slot-scope="{row}">{{row.followUpDate | toDateString}}</template>
      </el-table-column>
      <el-table-column label="跟进方式" prop="method">
        <template slot-scope="{row}">
          <el-col v-if="row.method==0">电话</el-col>
          <el-col v-else-if="row.method==1">上门</el-col>
        </template>
      </el-table-column>
      <el-table-column label="情况描述" prop="description" show-overflow-tooltip></el-table-column>
      <el-table-column label="跟进结果" prop="result">
        <template slot-scope="{row}">
          <el-col v-if="row.result==0">失败</el-col>
          <el-col v-else-if="row.result==1">达成</el-col>
          <el-col v-else>继续跟进</el-col>
        </template>
      </el-table-column>
      <el-table-column v-if="data.status==2" label="操作" width="60px">
        <template slot-scope="{row}">
          <el-button type="text" icon="el-icon-delete" @click="del(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-log-dialog in-dialog ref="editLogDialog" @close-saved="reload" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import editLogDialog from "@/components/yx/businessLog/editLogDialog";

import api from "@/api/yx/business";
import logApi from "@/api/yx/businessLog";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    editLogDialog
  },
  data() {
    return {
      data: {
        id: 0,
        customerId: null,
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        customerContact: "",
        customerTypeId: null,
        customerTypeName: "",
        projectName: "",
        metacilTypeId: null,
        metacilTypeName: "",
        businessType: null,
        businessSourceId: null,
        businessSourceName: "",
        prospect: null,
        prospectDate: null,
        program: null,
        programDate: null,
        channel: null,
        insiderId: null,
        insiderName: "",
        specificSource: "",
        salesmanId: null,
        salesmanName: "",
        createTime: null,
        status: null,
        sign: null
      },
      canChange: true,
      businessLogs: [],
      api
    };
  },
  methods: {
    create() {
      if (!this.canChange) {
        this.$msgbox({
          title: "提示",
          message: "您无法更改他人的商机日志",
          type: "danger"
        });
        return;
      }
      this.$refs.editLogDialog.openCreate({
        businessId: this.data.id
      });
    },
    del(row) {
      if (!this.canChange) {
        this.$msgbox({
          title: "提示",
          message: "您无法更改他人的商机日志",
          type: "danger"
        });
        return;
      }

      this.$msgbox({
        title: "提示",
        message: "您确定要删除这条记录吗？",
        showCancelButton: true,
        type: "warning"
      }).then(() => {
        logApi.deleteById(row.id).then(res => {
          this.reload();
        });
      });
    },
    onDetailsOpened() {
      logApi.getList({ businessId: this.data.id }).then(res => {
        this.businessLogs = res.data;
      });
      var employeeId = this.$store.state.user.employeeId;
      console.log(employeeId);
      this.canChange = employeeId === this.data.salesmanId;
    },
    reload() {
      this.getData(this.data.id);
      this.onDetailsOpened();
    }
  }
};
</script>