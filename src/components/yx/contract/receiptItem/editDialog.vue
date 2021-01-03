<template>
  <common-dialog
    ref="dialog"
    width="500px"
    close-on-saved
    :title="title"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :before-save="onBeforeSave"
    :save-func="()=>{}"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="收款时间" prop="receiptDate">
        <el-date-picker
          v-model.trim="data.receiptDate"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="收款类型" prop="receiptTypeId">
        <receipt-type v-model="data.receiptTypeId" />
      </el-form-item>
      <el-form-item label="收款金额" prop="receiptAmount">
        <el-input v-model="data.receiptAmount" />
      </el-form-item>
      <el-form-item label="收款方式" prop="receiptMethodId">
        <receipt-method v-model="data.receiptMethodId" ref="receiptMethod" @input="selectMethod" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

import receiptType from "@/components/sys/baseData/moneyType/select";
import receiptMethod from "@/components/sys/baseData/receiptMethod/select";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    receiptType,
    receiptMethod
  },
  data() {
    return {
      data: {
        id: 0,
        contractId: null,
        receiptDate: null,
        receiptTypeId: null,
        receiptTypeName: "",
        receiptAmount: null,
        receiptMethodId: null,
        receiptMethodName: ""
      },
      unit: "收款明细",
      rules: {
        receiptDate: [{ required: true, message: "请选择收款时间" }],
        receiptTypeId: [{ required: true, message: "请选择收款类型" }],
        receiptAmount: [
          { required: true, message: "请填写收款金额" },
          { validator: this.$commonJs.validateRules.num }
        ],
        receiptMethodId: [{ required: true, message: "请选择收款方式" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      this.$emit("saved", { ...this.data });
      this.close();
      return false;
    },
    selectMethod(data) {
      this.data.receiptMethodId = data.id;
      this.data.receiptMethodName = data.name;
    }
  }
};
</script>