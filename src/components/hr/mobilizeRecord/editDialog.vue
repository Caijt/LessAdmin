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
    save-button-text="提交调动"
    confirm-save-text="您确定要提交该员工调动记录吗？成功保存后将无法修改。"
    :before-close="onBeforeClose"
    :before-save="onBeforeSave"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>员工调动信息</el-divider>

      <el-form-item label="调动员工" prop="employeeId">
        <select-input
          :label="data.employeeName"
          v-model="data.employeeId"
          placeholder="选择调动的员工"
          @click="openEmployeeDialog"
        />
      </el-form-item>

      <el-row :gutter="10" v-show="data.employeeId">
        <el-col :span="24">
          <el-form-item label="调动前部门" class="c-form-text-item">
            <span>{{data.oldDepName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调动前职务" class="c-form-text-item">
            <span>{{data.oldPostName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调动前岗位" class="c-form-text-item">
            <span>{{data.oldJobName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="调动后部门" prop="newDepId">
        <select-input :label="data.newDepName" v-model="data.newDepId" @click="openDepDialog" />
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="调动后职务" prop="newPostId">
            <post-select v-model="data.newPostId" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调动后岗位" prop="newJobId">
            <job-select v-model="data.newJobId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="调动日期" prop="mobilizeDate">
        <el-date-picker v-model="data.mobilizeDate" value-format="yyyy-MM-dd" placeholder="选择调动日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="调动类型" prop="type">
        <el-select v-model="data.type">
          <el-option label="晋升" :value="0"></el-option>
          <el-option label="降职" :value="1"></el-option>
          <el-option label="换岗" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调动原因" prop="reason">
        <el-input type="textarea" v-model="data.reason" placeholder="选择转正日期"></el-input>
      </el-form-item>
      <el-form-item label="附件上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
    <dep-dialog ref="depDialog" in-dialog select @select="setDep" />
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import depDialog from "@/components/hr/department/treeDialog";
import employeeDialog from "@/components/hr/employee/listDialog";
import api from "@/api/hr/mobilizeRecord";
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
        mobilizeDate: nowDate,
        newPostId: null,
        newJobId: null,
        newDepId: null,
        type: 0,
        reason: "",

        oldDepId: null,
        oldPostId: null,
        oldJobId: null,
        employeeName: "",
        oldDepName: "",
        oldPostName: "",
        oldJobName: "",
        newDepName: ""
      },
      api,
      unit: "员工调动记录",
      rules: {
        employeeId: [{ required: true, message: "请选择要调动的员工" }],
        newDepId: [{ required: true, message: "请选择员工调动后部门" }],
        newPostId: [{ required: true, message: "请选择员工调动后职务" }],
        newJobId: [{ required: true, message: "请选择员工调动后岗位" }],
        mobilizeDate: [{ required: true, message: "请选择员工调动日期" }]
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
        that.getData();
      });
    },
    setDep(dep) {
      this.data.newDepId = dep.id;
      this.data.newDepName = dep.name;
    },
    setEmployee(employee) {
      this.data.oldDepName = employee.depName;
      this.data.oldPostName = employee.postName;
      this.data.oldJobName = employee.jobName;

      this.data.oldDepId = employee.depId;
      this.data.oldPostId = employee.postId;
      this.data.oldJobId = employee.jobId;

      this.data.newDepId = employee.depId;
      this.data.newDepName = employee.depName;
      this.data.newPostId = employee.postId;
      this.data.newJobId = employee.jobId;

      this.data.employeeId = employee.id;
      this.data.employeeName = employee.name;
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
    },
    onBeforeSave() {
      if (
        this.data.newDepId == this.data.oldDepId &&
        this.data.newPostId == this.data.oldPostId &&
        this.data.newJobId == this.data.oldJobId
      ) {
        this.$message.warning("调动部门、职务、岗位与调动前均没有变化！");
        return Promise.reject();
      }
      return Promise.resolve();
    }
  }
};
</script>