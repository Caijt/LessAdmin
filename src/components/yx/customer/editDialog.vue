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
    @saved="onSaved"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="客户名称" prop="name">
        <el-input v-model="data.name" placeholder="填写客户名称"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="customerTypeId">
        <customer-type v-model="data.customerTypeId" />
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="data.contact" placeholder="填写联系人"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="data.phone" placeholder="填写联系人电话"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="data.address" placeholder="填写联系人地址"></el-input>
      </el-form-item>
      <el-form-item label="客户来源" prop="customerSource">
        <el-select
          v-model="data.customerSource"
          style="width:100%"
          clearable
          @click.native="changeSource()"
        >
          <el-option label="网络推广" :value="0"></el-option>
          <el-option label="老客户介绍" :value="1"></el-option>
          <el-option label="内部人员" :value="2"></el-option>
          <el-option label="自增" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体来源" prop="insiderId" v-show="data.customerSource == 2">
        <select-input
          ref="insiderSelectInput"
          :label="data.insiderName"
          v-model="data.insiderId"
          placeholder="点击选择内部人员"
          @click="openEmployeeDialog()"
        />
      </el-form-item>
      <el-form-item label="具体来源" prop="specificSource" v-show="data.customerSource != 2">
        <el-input v-model="data.specificSource" placeholder="填写具体来源"></el-input>
      </el-form-item>
    </template>
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

import customerType from "@/components/sys/baseData/customerType/select";
import employeeDialog from "@/components/hr/employee/listDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    customerType,
    employeeDialog
  },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        customerTypeId: null,
        contact: "",
        phone: "",
        address: "",
        customerSource: null,
        insiderId: null,
        insiderName: "",
        specificSource: "",
        status: 0
      },
      api: require("@/api/yx/customer").default,
      unit: "客户档案",
      rules: {
        name: [{ required: true, message: "请填写客户名称" }],
        customerTypeId: [{ required: true, message: "请填选择客户类型" }],
        contact: [{ required: true, message: "请填写联系人" }],
        phone: [{ required: true, message: "请填写联系人电话" }],
        address: [{ required: true, message: "请填写联系人地址" }],
        customerSource: [{ required: true, message: "请选择客户来源" }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSaved() {
      this.$emit("save-customer", this.data);
    },
    changeSource() {
      this.data.insiderId = null;
      this.data.specificSource = null;
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setEmployee(employee) {
      this.data.insiderId = employee.id;
      this.data.insiderName = employee.name;
      // this.$refs.insiderSelectInput.setName(employee.name);
      this.$refs.employeeDialog.close();
    }
  }
};
</script>