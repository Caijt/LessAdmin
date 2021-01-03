<template>
  <common-dialog
    ref="dialog"
    width="800px"
    form-label-width="100px"
    form-text
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getDetailsById"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>合同项目实施明细信息</el-divider>
      <el-form-item label="客户名称">{{data.customerName}}</el-form-item>
      <el-form-item label="客户类型">{{data.customerType}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人">{{data.contact}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话">{{data.contactPhone}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="服务地址">{{data.address}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
         <el-form-item label="业务类型">{{data.businessType==0?"普通项目":"应急项目"}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="灭害种类">{{data.metacilTypeNames}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目名称">{{data.projectName}}</el-form-item>
      <el-form-item
        label="预计实施时间"
      >{{data.expectDateBegin | toDateString}} 至 {{data.expectDateEnd| toDateString}}</el-form-item>
      <el-form-item label="实施内容">{{data.implementContent}}</el-form-item>
      <el-form-item label="实施频率描述">{{data.frequencyDescription}}</el-form-item>
      <el-divider>任务分派明细</el-divider>
      <el-table :data="data.tasks" stripe>
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column label="任务描述" min-width="100" prop="description"></el-table-column>
        <el-table-column label="实施时间" width="165">
          <template slot-scope="{row}">
            开始：{{row.implementBeginTime | toShortDatetimeString}}
            <br />
            结束：{{row.implementEndTime | toShortDatetimeString}}
          </template>
        </el-table-column>
        <el-table-column label="分派班组" width="150">
          <template slot-scope="{row}">
            <div
              v-for="team in  row.taskTeams"
              :key="team.teamId"
            >{{team.teamName}}{{team.isLead?"（负责）":""}}</div>
          </template>
        </el-table-column>
        <el-table-column label="实施人数" width="80" align="center">
          <template slot-scope="{row}">
            <div v-for="team in  row.taskTeams" :key="team.teamId">{{team.amount}}</div>
          </template>
        </el-table-column>
        <el-table-column label="分派情况" width="100" align="center">
          <template slot-scope="{row}">
            <div v-for="team in  row.taskTeams" :key="team.id">
              <span v-if="team.isAssigned" class="c-link" @click="openAssignDialog(team.id)">查看</span>
              <span v-else>（未分派）</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实施情况" width="100" align="center">
          <template slot-scope="{row}">
            <span v-if="row.implementStatus==0">未实施</span>
            <span v-else
              class="c-link"
              @click="openImplementDialog(row)"
            >{{row.implementStatus==1? "实施中":"已完成"}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <team-employee-dialog in-dialog ref="teamEmployeeDialog" :show-toolbar="false" />
    <implement-dialog in-dialog ref="implementDialog" :page="false" :show-toolbar="false" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/xm/contractImplementItem";
import teamEmployeeDialog from "@/components/xm/taskTeamEmployee/listDialog";
import implementDialog from "@/components/xm/taskImplement/record/listDialog";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    teamEmployeeDialog,
    implementDialog
  },
  data() {
    return {
      data: {
        id: 0,
        customerName: "",
        customerType: "",
        tasks: null,
        contact:"",
        contactPhone:"",
        address:"",
        expectDateBegin: "",
        expectDateEnd: "",
        implementContent:"",
        frequencyDescription:"",
        businessType:0,
        metacilTypeNames:"",
        projectName:"",
        tasks: []
      },
      api,
      unit: "实施明细"
    };
  },
  methods: {
    onClosed() {},
    openAssignDialog(id) {
      this.$refs.teamEmployeeDialog.open().then(that => {
        that.getData({ taskTeamId: id });
      });
    },
    openImplementDialog(row) {
      this.$refs.implementDialog.open().then(that => {
        that.getData({ taskId: row.id });
      });
    }
  }
};
</script>