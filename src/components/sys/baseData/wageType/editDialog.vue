<template>
  <common-dialog
    ref="dialog"
    width="500px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.saveWageType"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.name" placeholder="填写工资类型名称"></el-input>
      </el-form-item>
      <el-form-item label="序号" prop="order">
        <el-input-number v-model="data.order" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="禁用" prop="isDisabled">
        <el-switch v-model="data.isDisabled"></el-switch>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/sys/baseData";
export default {
  mixins: [editDialogMixin],
  components: { commonDialog },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        order: 99,
        isDisabled: false
      },
      api,
      unit: "岗位",
      rules: {
        name: [{ required: true, message: "请填写岗位名称" }],
        order: [{ required: true, message: "请填写排序值" }]
      }
    };
  },
  computed: {},
  mounted() {}
};
</script>