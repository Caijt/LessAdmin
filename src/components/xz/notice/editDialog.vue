<template>
  <common-dialog
    ref="dialog"
    width="800px"
    right
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    confirm-on-close-change
    get-guid-on-create
    :confirm-on-save="data.isSubmit"
    confirm-save-text="您确定要发布此公告吗？发布后不能再修改。"
    :close-on-saved="data.isSubmit"
    :get-data-func="api.getEditById"
    @edit-opened="onEditOpened"
    :before-close="onBeforeClose"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="data.title" />
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <editor v-model="data.content" />
      </el-form-item>
      <el-form-item label="附件上传">
        <upload-list ref="uploadList" multiple card :guid="data.guid" />
      </el-form-item>
    </template>
    <template slot="footer" slot-scope="{loading}">
      <el-button type="danger" @click="submit" :loading="loading">发布</el-button>
      <el-button type="primary" @click="save" :loading="loading">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/notice";
import uploadList from "@/components/common/attach/uploadList";
import editor from "@/components/common/editor";
export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    uploadList,
    editor
  },
  data() {
    return {
      data: {
        id: 0,
        guid: null,
        title: "",
        content: "",
        isSubmit: false
      },
      api,
      unit: "通知公告",
      rules: {
        title: [{ required: true, message: "请填写公告标题" }],
        content: [{ required: true, message: "请填写公告内容" }]
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
    },
    submit() {
      this.data.isSubmit = true;
      return this.$refs.dialog.save();
    },
    save() {
      this.data.isSubmit = false;
      return this.$refs.dialog.save();
    }
  }
};
</script>