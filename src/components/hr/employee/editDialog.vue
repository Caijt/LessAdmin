<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    show-save-button
    form-label-width="100px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    confirm-on-close-change
    get-guid-on-create
    @edit-opened="onEditOpened"
    :confirm-on-save="!isEdit"
    :save-button-text="isEdit?'保存':'提交入职'"
    confirm-save-text="您确定要提交该员工入职档案吗？请确认入职信息无误，成功保存后将无法修改，只能通过调用、转正等操作进行变更。"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>员工基本信息</el-divider>
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="data.name" placeholder="填写员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="data.idCard" placeholder="填写员工身份证号" @blur="onIdCardBlur"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="data.age" placeholder="员工年龄" :min="1"></el-input-number>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="data.gender">
              <el-radio :label="false">男</el-radio>
              <el-radio :label="true">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚否" prop="isMarried">
            <el-radio-group v-model="data.isMarried">
              <el-radio :label="false">未婚</el-radio>
              <el-radio :label="true">已婚</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="出生日期" prop="birthDate">
        <el-date-picker v-model="data.birthDate" value-format="yyyy-MM-dd" placeholder="填写员工出生日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="户口所在地" prop="registeredPlace">
        <el-input v-model="data.registeredPlace" placeholder="填写员工户口所在地"></el-input>
      </el-form-item>
      <el-form-item label="通讯地址" prop="address">
        <el-input v-model="data.address" placeholder="填写员工通讯地址"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="data.phone" placeholder="填写员工联系电话号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系邮箱" prop="mail">
            <el-input v-model="data.mail" placeholder="填写员工电子邮箱地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="身份级别" prop="isLeader">
            <el-radio-group v-model="data.isLeader">
              <el-radio :label="false">普通员工</el-radio>
              <el-radio :label="true">领导</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="data.isLeader">
          <!-- <el-form-item label="管理部门" prop="depIds">
            <select-input placeholder="选择员工管理的部门" />
          </el-form-item>-->
        </el-col>
      </el-row>
      <div v-show="!isEdit">
        <el-divider>入职信息</el-divider>
        <el-alert
          title="入职信息仅在员工创建时可以进行编辑，创建后如需修改可在人员调动中进行调整"
          type="warning"
          style="margin-bottom:10px"
        ></el-alert>
        <el-form-item label="入职日期" prop="entryDate">
          <el-date-picker v-model="data.entryDate" value-format="yyyy-MM-dd" placeholder="填写员工入职日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="入职职务" prop="postId">
          <post-select v-model="data.postId" />
        </el-form-item>
        <el-form-item label="入职岗位" prop="jobId">
          <job-select v-model="data.jobId" />
        </el-form-item>
        <el-form-item label="入职状态" prop="status">
          <el-radio-group v-model="data.status">
            <el-radio :label="0">试用员工</el-radio>
            <el-radio :label="1">正式员工</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入职部门" prop="depId">
          <select-input :label="data.depName" v-model="data.depId" @click="openDepDialog" />
        </el-form-item>
      </div>
      <el-tabs v-model="tabName">
        <el-tab-pane label="教育信息" name="education">
          <el-form-item label="毕业学校" prop="school">
            <el-input v-model="data.school" placeholder="填写员工毕业学校"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-input v-model="data.education" placeholder="填写员工最高学历"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="data.major" placeholder="填写员工专业"></el-input>
          </el-form-item>
          <!-- <el-divider>紧急联系人</el-divider> -->
        </el-tab-pane>
        <el-tab-pane label="紧急联系人" name="contactMan">
          <el-form-item label="紧急联系人" prop="contactMan">
            <el-input v-model="data.contactMan" placeholder="填写员工紧急联系人"></el-input>
          </el-form-item>
          <el-form-item label="紧急人电话" prop="contactManPhone">
            <el-input v-model="data.contactManPhone" placeholder="填写员工紧急联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="联系人关系" prop="contactManRelationship">
            <el-input v-model="data.contactManRelationship" placeholder="填写员工与该紧急联系人关系"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="相关附件" name="attach">
          <el-form-item label="照片上传">
            <upload-list ref="photoUploadList" multiple card :guid="data.guid" type="Photo" />
          </el-form-item>
          <el-form-item label="身份证上传">
            <upload-list ref="idCardUploadList" multiple card :guid="data.guid" type="IdCard" />
          </el-form-item>
          <el-form-item label="应聘表上传">
            <upload-list
              ref="applicationUploadList"
              multiple
              card
              :guid="data.guid"
              type="Application"
            />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </template>
    <dep-dialog ref="depDialog" in-dialog select @select="setDep" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import depDialog from "@/components/hr/department/listDialog";
import api from "@/api/hr/employee";
import postSelect from "@/components/sys/baseData/post/select";
import jobSelect from "@/components/sys/baseData/job/select";
import uploadList from "@/components/common/attach/uploadList";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, depDialog, postSelect, jobSelect, uploadList },
  data() {
    // let now = new Date();
    // now.setFullYear(now.getFullYear() - 24);
    // let initBirthDate = this.$commonJs.toDateString(now);
    let initEntryDate = this.$commonJs.getNowDateString();
    return {
      data: {
        id: 0,
        guid: "",
        name: "",
        age: 0,
        gender: false,
        isMarried: false,
        birthDate: "",
        idCard: "",
        registeredPlace: "",
        address: "",
        phone: "",
        mail: "",
        entryDate: initEntryDate,
        postId: null,
        jobId: null,
        status: 0,
        depId: null,
        depName: "",
        isLeader: false,
        contactMan: "",
        contactManPhone: "",
        contactManRelationship: "",
        school: "",
        education: "",
        major: ""
      },
      tabName: "education",
      api,
      unit: "员工档案",
      rules: {
        name: [{ required: true, message: "请填写员工姓名" }],
        phone: [{ required: true, message: "请填写员工手机号" }],
        idCard: [{ required: true, message: "请填写员工身份证号码" }],
        depId: [{ required: true, message: "请选择员工所属部门" }],
        age: [{ required: true, message: "请填写员工年龄" }],
        birthDate: [{ required: true, message: "请选择员工出生日期" }],
        entryDate: [{ required: true, message: "请选择员工入职日期" }],
        postId: [{ required: true, message: "请选择员工入职职务" }],
        jobId: [{ required: true, message: "请选择员工入职岗位" }],
        status: [{ required: true, message: "请选择员工入职状态" }]
      }
    };
  },
  methods: {
    onEditOpened() {
      this.$refs.photoUploadList.getData();
      this.$refs.idCardUploadList.getData();
      this.$refs.applicationUploadList.getData();
    },
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setDep(dep) {
      this.data.depId = dep.id;
      this.data.depName = dep.name;
    },
    onIdCardBlur(e) {
      if (this.data.idCard.length >= 14) {
        let date = this.$commonJs.toDateString(
          this.data.idCard.substr(6, 8)
        );
        if(date){
          this.data.birthDate = date;
          this.data.age = new Date().getFullYear() - date.split("-")[0];
        }
      }
    },
    onClosed() {
      this.tabName = "education";
      this.$refs.photoUploadList.clear();
      this.$refs.idCardUploadList.clear();
      this.$refs.applicationUploadList.clear();
    },
    onBeforeClose(done) {
      if (this.isEdit) {
        done();
        return;
      }
      if (this.$refs.photoUploadList.count() > 0) {
        this.$message.warning("请删除已上传的照片附件");
        return;
      }

      if (this.$refs.idCardUploadList.count() > 0) {
        this.$message.warning("请删除已上传的身份证附件！");
        return;
      }
      if (this.$refs.applicationUploadList.count() > 0) {
        this.$message.warning("请删除已上传的应聘表附件！");
        return;
      }
      done();
    }
  }
};
</script>