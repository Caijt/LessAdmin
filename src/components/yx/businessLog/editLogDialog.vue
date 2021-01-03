<template>
  <common-Dialog
    ref="dialog"
    width="500px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="跟进日期" prop="followUpDate">
        <el-date-picker
          v-model="data.followUpDate"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择跟进日期"
        />
      </el-form-item>
      <el-form-item label="跟进方式" prop="method">
        <el-select v-model="data.method" clearable>
          <el-option label="电话" :value="0"></el-option>
          <el-option label="上门" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="情况描述" prop="description">
        <el-input type="textarea" v-model="data.description" placeholder="填写情况描述"></el-input>
      </el-form-item>
      <el-form-item label="跟进结果" prop="result">
        <el-select v-model="data.result" clearable>
          <el-option label="失败" :value="0"></el-option>
          <el-option label="达成" :value="1"></el-option>
          <el-option label="继续跟进" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </template>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog
  },
  data() {
    return {
      data: {
        id: 0,
        businessId: null,
        followUpDate: null,
        method: null,
        description: "",
        result: 2
      },
      api: require("@/api/yx/businessLog").default,
      unit: "跟进日志",
      rules: {
        followUpDate: [{ required: true, message: "请选择跟进日期" }],
        method: [{ required: true, message: "请选择跟进方式" }],
        result: [{ required: true, message: "请选择跟进结果" }]
      }
    };
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>