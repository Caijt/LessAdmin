<template>
  <common-dialog
    ref="dialog"
    width="800px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    form-text
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
    @closed="onClosed"
  >
    <h1 style="text-align:center">{{data.title}}</h1>
    <div>发布时间：{{data.submitTime || "未发布"}}</div>
    <el-divider >公告内容</el-divider>
    <div style="margin-bottom:30px"></div>
    <div v-html="data.content"></div>
    <el-divider>相关附件</el-divider>
    <attach-list ref="attachList" card :guid="data.guid" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/xz/notice";
import attachList from "@/components/common/attach/list";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    attachList
  },
  data() {
    return {
      data: {
        id: 0,
        guid: null,
        title: "",
        isTop: false,
        content: "",
        submitTime:""
      },
      api,
      unit: "通知公告"
    };
  },
  methods: {
    onDetailsOpened() {
      this.$refs.attachList.getData();
    },
    onClosed() {
      this.$refs.attachList.clear();
    },
    submit() {
      this.isSubmit = true;
      return this.$refs.dialog.save();
    },
    save() {
      this.isSubmit = false;
      return this.$refs.dialog.save();
    }
  }
};
</script>