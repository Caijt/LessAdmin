<template>
  <common-dialog
    ref="dialog"
    width="500px"
    :title="title"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="资质标题" prop="title">
        <el-input v-model="data.title" />
      </el-form-item>
      <el-form-item label="资质类型" prop="type">
        <el-input v-model="data.type" />
      </el-form-item>
      <el-form-item label="有效时间" prop="validTime">
        <el-date-picker
          v-model="data.validTime"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/qualification";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog
  },
  data() {
    return {
      data: {
        id: 0,
        title: "",
        type: "",
        validTime: ""
      },
      api,
      unit: "资质",
      rules: {
        title: [{ required: true, message: "请填写资质标题" }],
        validTime: [{ required: true, message: "请选择资质有效时间" }]
      }
    };
  },
  methods: {

  }
};
</script>