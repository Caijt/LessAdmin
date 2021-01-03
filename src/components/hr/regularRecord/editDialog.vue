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
    :save-func="api.save"
    confirm-on-close-change
    get-guid-on-create
    @open-edit="onOpenEdit"
    confirm-on-save
    close-on-saved
    save-button-text="提交转正"
    confirm-save-text="您确定要提交该员工转正记录吗？成功保存后将无法修改。"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>员工转正信息</el-divider>
      <el-form-item label="所属部门" prop="depId">
        <select-input :label="data.depName" v-model="data.depId" @click="openDepDialog" />
      </el-form-item>
      <el-form-item label="转正员工" prop="employeeId">
        <select-input
          :label="data.employeeName"
          v-model="data.employeeId"
          placeholder="选择转正的员工"
          @click="openEmployeeDialog"
        />
      </el-form-item>
      <el-row :gutter="10" v-show="data.employeeId">
        <el-col :span="12">
          <el-form-item label="试用职务" class="c-form-text-item">
            <span>{{data.trialPostName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试用岗位" class="c-form-text-item">
            <span>{{data.trialJobName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="转正职务" prop="regularPostId">
            <post-select v-model="data.regularPostId" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转正岗位" prop="regularJobId">
            <job-select v-model="data.regularJobId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="转正日期" prop="regularDate">
        <el-date-picker v-model="data.regularDate" value-format="yyyy-MM-dd" placeholder="选择转正日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="通过安全考试" prop="passSafetyTest">
        <el-radio-group v-model="data.passSafetyTest">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="综合评估得分" prop="combinedScore">
        <el-input-number v-model="data.combinedScore" :min="0"></el-input-number>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="办理社保" prop="hasSocialSecurity">
            <el-radio-group v-model="data.hasSocialSecurity">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理日期" prop="socialSecurityDate" v-if="data.hasSocialSecurity">
            <el-date-picker
              v-model="data.socialSecurityDate"
              value-format="yyyy-MM-dd"
              placeholder="选择社保办理日期"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="办理医保" prop="hasHealthInsurance">
            <el-radio-group v-model="data.hasHealthInsurance">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理日期" prop="healthInsuranceDate" v-if="data.hasHealthInsurance">
            <el-date-picker
              v-model="data.healthInsuranceDate"
              value-format="yyyy-MM-dd"
              placeholder="选择医保办理日期"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="评估表上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
    <dep-dialog ref="depDialog" in-dialog select @select="setDep" />
    <employee-dialog title="试用员工档案列表" ref="employeeDialog" in-dialog select @select="setEmployee" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import depDialog from "@/components/hr/department/treeDialog";
import employeeDialog from "@/components/hr/employee/listDialog";
import api from "@/api/hr/regularRecord";
import postSelect from "@/components/sys/baseData/post/select";
import jobSelect from "@/components/sys/baseData/job/select";
import uploadList from "@/components/common/attach/uploadList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    depDialog,
    employeeDialog,
    postSelect,
    jobSelect,
    uploadList
  },
  data() {
    let nowDate = this.$commonJs.getNowDateString();
    return {
      data: {
        id: 0,
        guid: null,
        employeeId: null,
        depId: null,
        regularDate: nowDate,
        regularPostId: null,
        regularJobId: null,
        passSafetyTest: true,
        hasHealthInsurance: true,
        healthInsuranceDate: "",
        hasSocialSecurity: true,
        socialSecurityDate: "",
        combinedScore: 80,

        employeeName: "",
        trialPostName: "",
        trialJobName: ""
      },
      api,
      unit: "员工转正记录",
      rules: {
        employeeId: [{ required: true, message: "请选择要转正的员工" ,trigger:"change"}],
        regularPostId: [{ required: true, message: "请选择员工转正职务" }],
        regularJobId: [{ required: true, message: "请选择员工转正岗位" }],
        regularDate: [{ required: true, message: "请选择员工转正日期" }],
        socialSecurityDate: [
          { required: true, message: "请选择员工办理社保日期" }
        ],
        healthInsuranceDate: [
          { required: true, message: "请选择员工办理医保日期" }
        ]
      }
    };
  },
  methods: {
    onOpenEdit() {
      this.$refs.uploadList.getData();
    },
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        let params = { status: 0 };
        if (this.data.depId) {
          params.depId = this.data.depId;
        }
        that.getData(params);
      });
    },
    setDep(dep) {
      this.data.depId = dep.id;
      this.data.depName = dep.name;
    },
    setEmployee(employee) {
      this.data.depId = employee.depId;
      this.data.depName = employee.depName;
      this.data.employeeId = employee.id;
      this.data.employeeName = employee.name;
      this.data.trialPostName = employee.postName;
      this.data.trialJobName = employee.jobName;
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
        this.$message.warning("请删除已上传的评估表附件");
        return;
      }
      done();
    }
  }
};
</script>