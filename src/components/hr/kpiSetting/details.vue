<template>
  <common-dialog
    ref="dialog"
    width="700px"
    form-label-width="100px"
    form-text
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>员工信息</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="员工姓名">{{data.name}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工状态" class="no-border">
            <el-tag v-if="data.status==0" type="warning">试用员工</el-tag>
            <el-tag v-if="data.status==1" type="success">试用员工</el-tag>
            <el-tag v-if="data.status==2" type="danger">离职员工</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="年龄">{{data.age}} 岁</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender" class="no-border">
            <el-tag v-if="data.gender" type="danger">女</el-tag>
            <el-tag v-else>男</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="所属部门" prop="depId">{{data.depName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职日期" prop="entryDate">{{data.entryDate|toDateString}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="当前职务" prop="postId">{{data.postName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前岗位" prop="jobId">{{data.jobName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="婚否">{{data.isMarried?"已婚":"未婚"}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthDate">{{data.birthDate | toDateString}}</el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="身份证" prop="idCard">{{data.idCard}}</el-form-item>
      <el-form-item label="户口所在地" prop="registeredPlace">{{data.registeredPlace}}</el-form-item>
      <el-form-item label="通讯地址" prop="address">{{data.address}}</el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">{{data.phone}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系邮箱" prop="mail">{{data.mail}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="身份级别" prop="isLeader">{{data.isLeader?"领导":"普通员工"}}</el-form-item>
        </el-col>
        <el-col :span="12" v-show="data.isLeader">
          <el-form-item label="管理部门" prop="depIds"></el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-model="tabName">
        <el-tab-pane label="教育信息" name="education">
          <el-form-item label="毕业学校" prop="school">{{data.school}}</el-form-item>
          <el-form-item label="学历" prop="education">{{data.education}}</el-form-item>
          <el-form-item label="专业" prop="major">{{data.major}}</el-form-item>
        </el-tab-pane>
        <el-tab-pane label="紧急联系人" name="contactMan">
          <el-form-item label="紧急联系人" prop="contactMan">{{data.contractMan}}</el-form-item>
          <el-form-item label="紧急人电话" prop="contactManPhone">{{data.contractManPhone}}</el-form-item>
          <el-form-item label="联系人关系" prop="contactManRelationship">{{data.contactManRelationship}}</el-form-item>
        </el-tab-pane>
        <el-tab-pane label="相关附件" name="attach">
          <el-form-item label="照片上传" class="no-border">
            <attach-list ref="photoAttachList" card :guid="data.guid" type="Photo" />
          </el-form-item>
          <el-form-item label="身份证上传" class="no-border">
            <attach-list ref="idCardAttachList" card :guid="data.guid" type="IdCard" />
          </el-form-item>
          <el-form-item label="应聘表上传" class="no-border">
            <attach-list ref="applicationAttachList" card :guid="data.guid" type="Application" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template slot="footer">
      <el-button @click="openRegularDialog">转正信息</el-button>
      <el-button @click="openContractDialog">合同信息</el-button>
      <el-button @click="openMobilizeDialog">调动信息</el-button>
      <el-button type="danger" @click="openDimissionDialog">离职信息</el-button>
    </template>
    <contract-dialog in-dialog ref="contractDialog" />
    <mobilize-dialog in-dialog ref="mobilizeDialog" />
    <regular-dialog in-dialog ref="regularDialog" />
    <dimission-dialog in-dialog ref="dimissionDialog" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/hr/kpiSetting";
import attachList from "@/components/common/attach/list";
import contractDialog from "@/components/hr/contract/listDialog";
import mobilizeDialog from "@/components/hr/mobilizeRecord/listDialog";
import regularDialog from "@/components/hr/regularRecord/listDialog";
import dimissionDialog from "@/components/hr/dimissionRecord/listDialog";
export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    attachList,
    contractDialog,
    mobilizeDialog,
    regularDialog,
    dimissionDialog
  },
  data() {
    return {
      data: {
        id: 0,
        guid: "",
        name: "",
        age: 24,
        gender: false,
        isMarried: false,
        birthDate: "",
        idCard: "",
        registeredPlace: "",
        address: "",
        phone: "",
        mail: "",
        entryDate: "",
        status: 0,
        depId: null,
        depName: "",
        isLeader: false,
        contactMan: "",
        contactManPhone: "",
        contactManRelationship: "",
        school: "",
        education: "",
        major: "",
        postName: "",
        jobName: ""
      },
      tabName: "education",
      api,
      unit: "员工档案"
    };
  },
  methods: {
    onDetailsOpened() {
      this.$refs.photoAttachList.getData();
      this.$refs.idCardAttachList.getData();
      this.$refs.applicationAttachList.getData();
    },
    onClosed() {
      this.tabName = "education";
      this.$refs.photoAttachList.clear();
      this.$refs.idCardAttachList.clear();
      this.$refs.applicationAttachList.clear();
    },
    openContractDialog() {
      this.$refs.contractDialog.open().then(that => {
        that.getData({ employeeId: this.data.id });
      });
    },
    openMobilizeDialog() {
      this.$refs.mobilizeDialog.open().then(that => {
        that.getData({ employeeId: this.data.id });
      });
    },
    openRegularDialog() {
      this.$refs.regularDialog.open().then(that => {
        that.getData({ employeeId: this.data.id });
      });
    },
    openDimissionDialog() {
      this.$refs.dimissionDialog.open().then(that => {
        that.getData({ employeeId: this.data.id });
      });
    }
  }
};
</script>