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
    :save-func="api.saveReimbursementApplication"
    confirm-on-close-change
    get-guid-on-create
    @edit-opened="onEditOpened"
    confirm-on-save
    close-on-saved
    save-button-text="提交"
    confirm-save-text="您确定要提交该报销申请单吗？"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>报销申请单</el-divider>
      <el-form-item prop="suffix" label="申请标题">
        <el-input v-model="data.suffix" placeholder="标题后缀">
          <template slot="prepend">报销申请单_[员工名]_YYYYMM0001</template>
        </el-input>
      </el-form-item>
      <el-form-item label="报销金额" prop="price">
        <el-input-number v-model="data.price" :precision="2"></el-input-number>
      </el-form-item>
      <el-form-item label="报销类型" prop="type">
        <el-input v-model="data.type"></el-input>
      </el-form-item>
      <el-form-item label="报销原因" prop="reason">
        <el-input type="textarea" v-model="data.reason"></el-input>
      </el-form-item>
      <el-form-item label="附件上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/workflow";
import uploadList from "@/components/common/attach/uploadList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    uploadList
  },
  data() {
    return {
      data: {
        id: 0,
        guid: null,
        suffix: "",
        price:0,
        type: "",
        reason: ""
      },
      api,
      unit: "报销申请单",
      rules: {
        price: [{ required: true, message: "请填写报销的金额" }]
      }
    };
  },
  methods: {
    onEditOpened() {
      this.$refs.uploadList.getData();
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
    }
  }
};
</script>