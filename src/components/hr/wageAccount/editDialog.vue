<template>
  <common-dialog
    ref="dialog"
    width="700px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :get-data-func="api.getEditById"
    :before-save="onBeforeSave"
    @edit-opened="onEditOpened"
    @saved="reload"
    @closed="onClosed"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="账套名称" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="状态" prop="isDisabled">
        <el-radio-group v-model="data.isDisabled">
          <el-radio :label="false">启用</el-radio>
          <el-radio :label="true">屏蔽</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序值" prop="order">
        <el-input-number v-model="data.order" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="data.remarks" />
      </el-form-item>
      <el-form-item label="工资项目" required>
        <item-list ref="itemList" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/wageAccount";
import itemList from "./item/editList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    itemList
  },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        remarks: "",
        isDisabled: false,
        order: 99,
        wageAccountItems: null
      },
      api,
      unit: "工资账套",
      rules: {
        name: [{ required: true, message: "请填写账套名称" }],
        isDisabled: [{ required: true, message: "请选择账套状态" }],
        order: [{ required: true, message: "请填写排序值" }]
      }
    };
  },
  methods: {
    onEditOpened(data){
      this.$refs.itemList.setData(data.wageAccountItems);
    },
    onBeforeSave() {
      let data = this.$refs.itemList.refList.data.map(item => {
        return {
          wageItemId: item.wageItemId,
          isPay: item.isPay,
          wageAccountId: this.data.id
        };
      });
      if (data.length == 0) {
        this.$message.warning("请添加工资项目");
        return false;
      }
      if (data.some(item => !item.wageItemId)) {
        this.$message.warning("请完善工资项目明细");
        return false;
      }
      for (let item of data) {
        for (let item2 of data) {
          if (item == item2) {
            continue;
          }
          if (item.wageItemId == item2.wageItemId) {
            this.$message.warning("工资项目中有重复项，请删除重复项");
            return false;
          }
        }
      }
      this.data.wageAccountItems = data;
    },
    onClosed(){
      this.$refs.itemList.clear()
    }
  }
};
</script>