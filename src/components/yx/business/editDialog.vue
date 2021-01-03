<template>
  <common-Dialog
    ref="dialog"
    width="800px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    form-label-width="110px"
    :form-rules="rules"
    :save-func="api.save"
    show-save-button
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="客户名称" prop="customerName">
            <select-input
              :label="data.customerName"
              v-model="data.customerId"
              placeholder="点击选择客户"
              style="width:80%;float:left;"
              @click="openCustomerDialog()"
            />
            <el-button
              style="width:20%;float:left;margin-top:1px;"
              icon="el-icon-plus"
              @click="addCustomer()"
              :disabled="!$permission.canWrite('/yx/customer')"
            ></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户类型" prop="customerTypeId">
            <customer-type v-model="data.customerTypeId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联系人" prop="customerContact">
            <el-input v-model="data.customerContact" placeholder="填写联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="customerPhone">
            <el-input v-model="data.customerPhone" placeholder="填写联系人电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="服务地址" prop="customerAddress">
        <el-input v-model="data.customerAddress" placeholder="填写联系人地址"></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="data.projectName" placeholder="填写项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务员" prop="salesmanId">
            <select-input
              :label="data.salesmanName"
              v-model="data.salesmanId"
              placeholder="点击选择业务员"
              @click="openEmployeeDialog(true)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="灭害种类" prop="metacilTypeId">
            <metacil-type v-model="data.metacilTypeId" ref="metacilType" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务类型" prop="businessType">
            <el-select v-model="data.businessType" clearable style="width:100%">
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="需要勘察" prop="prospect">
            <el-radio-group v-model="data.prospect">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="data.prospect">
          <el-form-item
            label="预约勘察时间"
            prop="prospectDate"
            :rules="[{required: data.prospect, message: '请选择预约完成时间'}]"
          >
            <el-date-picker
              v-model="data.prospectDate"
              value-format="yyyy-MM-dd"
              placeholder="选择勘察时间"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="需要方案" prop="program">
            <el-radio-group v-model="data.program">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="data.program">
          <el-form-item
            label="预计完成时间"
            prop="programDate"
            :rules="[{required: data.program, message: '请选择预计完成时间'}]"
          >
            <el-date-picker
              v-model="data.programDate"
              value-format="yyyy-MM-dd"
              placeholder="选择完成时间"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="业务来源" prop="businessSourceId">
            <business-source v-model="data.businessSourceId" style="width:100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源渠道" prop="channel">
            <el-select
              v-model="data.channel"
              clearable
              @click.native="changeSource()"
              style="width:100%"
            >
              <el-option label="网络推广" :value="0"></el-option>
              <el-option label="老客户介绍" :value="1"></el-option>
              <el-option label="内部人员" :value="2"></el-option>
              <el-option label="自增" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="具体来源" prop="insiderId" v-show="data.channel == 2">
        <select-input
          :label="data.insiderName"
          v-model="data.insiderId"
          placeholder="点击选择内部人员"
          @click="openEmployeeDialog(false)"
        />
      </el-form-item>
      <el-form-item label="具体来源" prop="specificSource" v-show="data.channel != 2">
        <el-input v-model="data.specificSource" placeholder="填写具体来源"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="data.status">
          <el-radio :label="1">达成</el-radio>
          <el-radio :label="2">跟进</el-radio>
          <el-radio :label="0">失败</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
    <customer-dialog ref="customerDialog" in-dialog select @select="setCustomer"></customer-dialog>
    <customer-edit-dialog ref="customerEditDialog" in-dialog @save-customer="setCustomer" />
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import customerApi from "@/api/yx/customer";

import customerType from "@/components/sys/baseData/customerType/select";
import employeeDialog from "@/components/hr/employee/common/listDialog";
import customerDialog from "@/components/yx/customer/listDialog";
import businessSource from "@/components/sys/baseData/businessSource/select";
import metacilType from "@/components/sys/baseData/metacilType/select";

import customerEditDialog from "@/components/yx/customer/editDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    customerType,
    employeeDialog,
    customerDialog,
    businessSource,
    metacilType,
    customerEditDialog
  },
  data() {
    let prospectValidator = (rule, value, callback) => {
      if (this.data.prospect) {
        if (!this.data.prospectDate) {
          callback(new Error("请选择勘察时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    let programValidator = (rule, value, callback) => {
      if (this.data.program) {
        if (!this.data.programDate) {
          callback(new Error("请选择完成时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    let insiderValidator = (rule, value, callback) => {
      if (this.data.channel == 2) {
        if (!this.data.insiderId) {
          callback(new Error("请选择内部人员"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        customerId: 0,
        customerName: null,
        customerPhone: "",
        customerAddress: "",
        customerContact: "",
        customerTypeId: null,
        projectName: "",
        metacilTypeId: null,
        businessType: null,
        businessSourceId: null,
        prospect: true,
        prospectDate: null,
        program: true,
        programDate: null,
        channel: null,
        specificSource: "",
        insiderId: null,
        insiderName: "",
        salesmanId: null,
        salesmanName: "",
        status: 2
      },
      dialogSource: false,
      api: require("@/api/yx/business").default,
      unit: "商机信息",
      rules: {
        customerName: [{ required: true, message: "请填写客户" }],
        customerPhone: [{ required: true, message: "请填写联系电话" }],
        customerAddress: [{ required: true, message: "请填写客户地址" }],
        customerContact: [{ required: true, message: "请填写客户联系人" }],
        customerTypeId: [{ required: true, message: "请选择客户类型" }],
        projectName: [{ required: true, message: "请填写项目名称" }],
        metacilTypeId: [{ required: true, message: "请选择灭害种类" }],
        businessType: [{ required: true, message: "请选择业务类型" }],
        businessSourceId: [{ required: true, message: "请选择业务来源" }],
        prospectDate: [{ validator: prospectValidator }],
        programDate: [{ validator: programValidator }],
        channel: [{ required: true, message: "请选择来源渠道" }],
        insiderId: [{ validator: insiderValidator }]
        // salesmanId: [{ required: true, message: "请选择业务员" }]
      }
    };
  },
  computed: {
    prospect() {
      return this.data.prospect;
    },
    program() {
      return this.data.program;
    }
  },
  mounted() {},
  watch: {
    prospect() {
      this.data.prospectDate = null;
    },
    program() {
      this.data.programDate = null;
    }
  },
  methods: {
    changeSource() {
      this.data.insiderId = null;
      this.data.specificSource = null;
    },
    openEmployeeDialog(source) {
      this.dialogSource = source;
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setEmployee(employee) {
      if (this.dialogSource) {
        this.data.salesmanId = employee.id;
        this.data.salesmanName = employee.name;
      } else {
        this.data.insiderId = employee.id;
        this.data.insiderName = employee.name;
      }
      this.$refs.employeeDialog.close();
    },
    addCustomer() {
      this.$refs.customerEditDialog.openCreate();
    },
    openCustomerDialog() {
      this.$refs.customerDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setCustomer(customer) {
      // console.log(customer);
      this.data.customerId = customer.id;
      this.data.customerName = customer.name;
      this.data.customerPhone = customer.phone;
      this.data.customerAddress = customer.address;
      this.data.customerContact = customer.contact;
      this.data.customerTypeId = customer.customerTypeId;
      this.data.channel = customer.customerSource;
      this.data.specificSource = customer.specificSource;
      this.data.insiderId = customer.insiderId;
      this.data.insiderName = customer.insiderName;
      this.$refs.customerDialog.close();
    }
  }
};
</script>