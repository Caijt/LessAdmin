<template>
  <div>
    <common-dialog
      ref="dialog"
      width="500px"
      show-save-button
      :title="title"
      :inDialog="inDialog"
      :data="data"
      :form-rules="rules"
      :save-func="api.save"
      save-button-text="下一步"
      :before-save="onBeforeSave"
      @edit-opened="onEditOpened"
      @close-saved="$emit('close-saved')"
    >
      <template slot="form">
        <el-form-item label="工资类型" prop="type">
          <el-select v-model="data.type">
            <el-option label="月份工资" value="月份工资"></el-option>
            <el-option label="绩效奖金" value="绩效奖金"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放月份" prop="date">
          <el-date-picker type="month" v-model="data.date" value-format="yyyy-MM"/>
        </el-form-item>
        <el-form-item label="工资账套" prop="wageAccountId">
          <wage-account-select v-model="data.wageAccountId" />
        </el-form-item>
      </template>
    </common-dialog>
    <edit-dialog ref="editDialog2" @close-saved="$emit('close-saved')"/>
  </div>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/wage";
import wageAccountSelect from "@/components/hr/wageAccount/select";
import editDialog from "./editDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    wageAccountSelect,
    editDialog
  },
  data() {
    return {
      data: {
        id: 0,
        type:"",
        date:"",
        wageAccountId: null
      },
      api,
      unit: "工资单",
      rules: {
        type: [{ required: true, message: "请填写账套名称" }],
        date: [{ required: true, message: "请填写账套名称" }],
        wageAccountId: [{ required: true, message: "请选择账套状态" }]
      }
    };
  },
  methods: {
    onEditOpened(data) {},
    onBeforeSave() {
      this.$refs.editDialog2.openCreate(this.data).then(that=>{
        this.close();
      })
      return false;
    }
  }
};
</script>