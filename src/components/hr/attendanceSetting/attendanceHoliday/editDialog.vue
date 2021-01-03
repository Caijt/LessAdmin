<template>
  <common-dialog
    ref="dialog"
    width="400px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    form-label-width="100px"
    :form-rules="rules"
    :save-func="api.save"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="节假日名称" prop="name">
        <el-input v-model="data.name" placeholder="填写节假日名称" />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="data.date"
          value-format="yyyy-MM-dd"
          placeholder="选择节假日日期"
          style="width:100%;"
        ></el-date-picker>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/attendanceHoliday";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog
  },
  data() {
    let validator = (rule, value, callback) => {
      if (value) {
        this.api.checkExistByDate(value, this.data.id).then(res => {
          if (res.data) {
            callback(new Error("此节假日日期已存在"));
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        name: "",
        date: ""
      },
      api,
      unit: "节假日",
      rules: {
        name: [{ required: true, message: "请选择要转正的员工" }],
        date: [{ required: true, message: "请选择节假日日期" }, { validator }]
      }
    };
  }
};
</script>