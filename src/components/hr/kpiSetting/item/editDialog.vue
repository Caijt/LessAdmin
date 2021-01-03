<template>
  <common-dialog
    ref="dialog"
    width="500px"
    form-label-width="110px"
    close-on-saved
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :before-save="onBeforeSave"
    :save-func="()=>{}"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="考核类型" prop="type">
        <el-input v-model="data.type" />
      </el-form-item>
      <el-form-item label="考核描述" prop="description">
        <el-input v-model="data.description" />
      </el-form-item>
      <el-form-item label="考核分数" prop="score">
        <el-input-number v-model="data.score" />
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button @click="close">关 闭</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog },
  data() {
    return {
      data: {
        id: 0,
        type: "",
        description: "",
        score: 60
      },
      unit: "绩效考核明细",
      rules: {
        type: [{ required: true, message: "请填写考核类型" }],
        description: [{ required: true, message: "请填写考核描述" }],
        score: [{ required: true, message: "请填写考核分数" }]
      }
    };
  },
  methods: {   
    onBeforeSave() {
      this.$emit("saved", { ...this.data });
      this.close();
      return false;
    }
  }
};
</script>