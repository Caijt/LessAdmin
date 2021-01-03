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
      <el-form-item label="客户名称" prop="customerId">
        <select-input
          :label="data.customerName"
          v-model="data.customerId"
          placeholder="点击选择客户"
          @click="openCustomerDialog()"
        />
      </el-form-item>
      <el-form-item label="投诉类型" prop="typeId">
        <complain-type v-model="data.typeId"></complain-type>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <select-input
          :label="data.projectName"
          v-model="data.projectName"
          placeholder="点击选择项目"
          @click="openContractDialog()"
        />
        <!-- <el-input v-model="data.projectName" placeholder="填写项目名称"></el-input> -->
      </el-form-item>
      <el-form-item label="投诉时间" prop="complainTime">
        <el-date-picker
          type="datetime"
          v-model="data.complainTime"
          placeholder="选择投诉时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="投诉内容" prop="content">
        <el-input type="textarea" :rows="5" v-model="data.content" placeholder="填写投诉内容"></el-input>
      </el-form-item>
      <el-form-item label="处理情况" prop="situation">
        <el-input type="textarea" v-model="data.situation" placeholder="填写处理情况"></el-input>
      </el-form-item>
      <el-form-item label="处理结果" prop="result">
        <el-select v-model="data.result" clearable>
          <el-option label="未处理" :value="0"></el-option>
          <el-option label="已处理" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理时间" prop="disposeTime">
        <el-date-picker
          type="datetime"
          v-model="data.disposeTime"
          placeholder="选择处理时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </template>
    <customer-dialog ref="customerDialog" in-dialog select @select="setCustomer"></customer-dialog>
    <contract-dialog ref="contractDialog" in-dialog selectable @select="setContract"></contract-dialog>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

import customerDialog from "@/components/yx/customer/listDialog";
import contractDialog from "@/components/yx/contract/listDialog";
import complainType from "@/components/sys/baseData/complainType/select";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    contractDialog,
    customerDialog,
    complainType
  },
  data() {
    return {
      data: {
        id: 0,
        customerId: null,
        customerName: "",
        typeId: null,
        contractId: null,
        projectName: "",
        complainTime: null,
        content: "",
        situation: "",
        result: null,
        disposeTime: null
      },
      api: require("@/api/yx/complain").default,
      unit: "登记投诉信息",
      rules: {
        customerId: [{ required: true, message: "请选择客户" }],
        typeId: [{ required: true, message: "请选择类型" }],
        projectName: [{ required: true, message: "请填写项目名称" }],
        complainTime: [{ required: true, message: "请选择投诉时间" }],
        content: [{ required: true, message: "请填写投诉内容" }],
        result: [{ required: true, message: "请选择处理结果" }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    openCustomerDialog() {
      this.$refs.customerDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setCustomer(customer) {
      this.data.customerId = customer.id;
      this.data.customerName = customer.name;
      this.$refs.customerDialog.close();
    },
    openContractDialog() {
      if (this.data.customerId == null) {
        this.$message({
          message: '请先选择客户',
          type: 'warning'
        });
        return;
      }
      this.$refs.contractDialog.open().then(that => {
        that.getData({
          customerId: this.data.customerId,
          isReceive: false
        });
      });
    },
    setContract(contract) {
      // console.log(contract);
      this.data.contractId = contract.id;
      this.data.projectName = contract.projectName;
      // console.log(this.data)
      this.$refs.contractDialog.close();
    }
  }
};
</script>