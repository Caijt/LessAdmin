<template>
  <common-Dialog
    ref="dialog"
    width="500px"
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
          ref="customerSelectInput"
          :label="data.customerName"
          v-model="data.customerId"
          placeholder="点击选择客户"
          @click="openCustomerDialog()"
        />
      </el-form-item>
      <el-form-item label="回访类型" prop="type">
        <el-select v-model="data.type" clearable placeholder="点击选择回访类型">
          <el-option label="日常回访" :value="0"></el-option>
          <el-option label="项目回访" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <select-input
          :label="data.projectName"
          v-model="data.contractId"
          placeholder="点击选择项目"
          @click="openContractDialog()"
        />
      </el-form-item>
      <el-form-item label="回访时间" prop="returnVisitTime">
        <el-date-picker
          v-model="data.returnVisitTime"
          placeholder="选择回访时间"
          value-format="yyyy-MM-dd"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="满意度" prop="satisfaction">
        <el-select v-model="data.satisfaction" clearable placeholder="点击选择满意度">
          <el-option label="满意" :value="0"></el-option>
          <el-option label="一般" :value="1"></el-option>
          <el-option label="不满意" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访内容" prop="content">
        <el-input type="textarea" v-model="data.content" placeholder="填写回访内容"></el-input>
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
    <customer-dialog ref="customerDialog" in-dialog select @select="setCustomer"></customer-dialog>
    <contract-dialog ref="contractDialog" in-dialog selectable @select="setContract"></contract-dialog>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/yx/returnvisit";

import customerDialog from "@/components/yx/customer/listDialog";
import contractDialog from "@/components/yx/contract/listDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    customerDialog,
    contractDialog
  },
  data() {
    return {
      data: {
        id: 0,
        customerId: null,
        customerName: "",
        type: null,
        projectName: "",
        contractId: 0,
        satisfaction: null,
        returnVisitTime: null,
        content: ""
      },
      api,
      unit: "登记回访信息",
      rules: {
        customerId: [{ required: true, message: "请选择客户" }],
        type: [{ required: true, message: "请选择类型" }],
        projectName: [{ required: true, message: "请选择项目名称" }],
        satisfaction: [{ required: true, message: "请选择满意度" }],
        returnVisitTime: [{ required: true, message: "请选择回访时间" }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    save() {
      if (this.data.contractId != 0) {
        if (this.data.type == 1 && !this.isEdit) {
          console.log(this.data.contractId);
          api.verifyContract(this.data.contractId).then(res => {
            console.log(res.data);
            if (res.data) {
              this.$message.warning("所选项目已存在项目回访记录");
            } else {
              return this.$refs.dialog.save();
            }
          });
        } else {
          return this.$refs.dialog.save();
        }
      } else {
        return this.$refs.dialog.save();
      }
    },
    openCustomerDialog() {
      this.$refs.customerDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    openContractDialog() {
      this.$refs.contractDialog.open().then(that => {
        that.getData();
      });
    },
    setCustomer(customer) {
      this.data.customerId = customer.id;
      this.data.customerName = customer.name;
      this.$refs.customerDialog.close();
    },
    setContract(contract) {
      this.data.contractId = contract.id;
      this.data.projectName = contract.projectName;
      this.$refs.contractDialog.close();
    }
  }
};
</script>