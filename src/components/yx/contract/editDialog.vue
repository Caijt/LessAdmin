<template>
  <common-Dialog
    @open="initDialog"
    ref="dialog"
    width="800px"
    right
    show-save-button
    confirm-on-close-change
    :title="title"
    :inDialog="inDialog"
    :data="data"
    form-label-width="110px"
    :form-rules="rules"
    :save-func="api.save"
    :get-data-func="api.getById"
    :before-save="onBeforeSave"
    @saved="onSaved"
    @closed="onClosed"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectName">
            <!-- <el-input v-model="data.projectName" placeholder="填写项目名称"></el-input> -->
            <select-input
              :label="data.projectName"
              v-model="data.businessId"
              placeholder="点击选择项目"
              @click="openBusinessDialog()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务类型" prop="businessType">
            <el-select v-model="data.businessType" style="width:100%" clearable>
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="客户名称" prop="customerId">
            <select-input
              :label="data.customerName"
              v-model="data.customerId"
              placeholder="点击选择客户"
              @click="openCustomerDialog()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电　　话" prop="customerPhone">
            <el-input v-model="data.customerPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="联 系 人" prop="customerContact">
            <el-input v-model="data.customerContact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户类型" prop="customerTypeId">
            <customer-type v-model="data.customerTypeId"></customer-type>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="服务地址" prop="customerAddress">
        <el-input v-model="data.customerAddress"></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="灭害种类" prop="metacilTypeIds">
            <el-select
              v-model="metacilTypeIdArr"
              multiple
              placeholder="请选择灭害种类"
              style="width:100%;"
            >
              <el-option
                v-for="item in metacilTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实施频率" prop="frequency">
            <template>
              <el-radio v-model="data.frequency" :label="true">单次</el-radio>
              <el-radio v-model="data.frequency" :label="false">多次</el-radio>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="合同形式" prop="contractForm">
            <el-select v-model="data.contractForm" style="width:100%" clearable>
              <el-option label="口头" :value="0"></el-option>
              <el-option label="书面" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额" prop="amount">
            <el-input v-model="data.amount" placeholder="填写合同金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="合同开始时间" prop="contractDateBegin">
            <el-date-picker
              v-model="data.contractDateBegin"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束时间" prop="contractDateEnd">
            <el-date-picker
              v-model="data.contractDateEnd"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item v-show="data.contractForm==1" label="状　　态" prop="status">
            <el-select v-model="data.status" style="width:100%" clearable>
              <el-option label="书面合同未完成" :value="0"></el-option>
              <el-option label="书面合同已完成" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>实施明细</el-divider>
      <implement-item-list ref="implementItemList" in-dialog></implement-item-list>
      <el-divider>收款明细</el-divider>
      <receipt-item-list ref="receiptItemList" in-dialog></receipt-item-list>
    </template>
    <customer-dialog ref="customerDialog" in-dialog select @select="setCustomer"></customer-dialog>
    <business-dialog
      ref="businessDialog"
      in-dialog
      :showSelect="false"
      select
      @select="setBusiness"
    ></business-dialog>
  </common-Dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

import customerDialog from "@/components/yx/customer/listDialog";
import businessDialog from "@/components/yx/business/listDialog";
import customerType from "@/components/sys/baseData/customerType/select";

import metacilTypeApi from "@/api/sys/baseData";

import implementItemList from "./implementItem/editList";
import receiptItemList from "./receiptItem/editList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    customerDialog,
    businessDialog,
    customerType,
    implementItemList,
    receiptItemList
  },
  data() {
    let validator = (rule, value, callback) => {
      if (!this.data.beginDate || !this.data.endDate) {
        callback();
      } else {
        let duration = this.$moment(this.data.endDate).diff(
          this.data.beginDate,
          "months"
        );
        this.data.duration = duration;
        if (duration >= 0) {
          callback();
        } else {
          callback(new Error("合同开始日期应在结束日期之前"));
        }
      }
    };
    let statusValidator = (rule, value, callback) => {
      if (this.data.contractForm == 1) {
        if (this.data.status === null || this.data.status === "") {
          callback(new Error("请选择状态"));
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
        customerId: null,
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        customerContact: "",
        customerTypeId: null,
        metacilTypeIds: "",
        businessId: null,
        businessType: null,
        projectName: "",
        frequency: true,
        amount: null,
        contractDateBegin: null,
        contractDateEnd: null,
        contractForm: null,
        status: null,
        summarize: "",
        contractImplementItems: [],
        contractReceiptItems: []
      },
      metacilTypes: [],
      api: require("@/api/yx/contract").default,
      unit: "合同信息",
      rules: {
        customerId: [{ required: true, message: "请选择客户" }],
        metacilTypeIds: [{ required: true, message: "请选择灭害种类" }],
        businessType: [{ required: true, message: "请选择业务类型" }],
        projectName: [{ required: true, message: "请填写项目名称" }],
        amount: [
          { required: true, message: "请填写合同金额" },
          { validator: this.$commonJs.validateRules.num }
        ],
        contractDateBegin: [
          { required: true, message: "请选择合同开始时间" },
          {
            validator
          }
        ],
        contractDateEnd: [
          { required: true, message: "请选择合同结束时间" },
          {
            validator
          }
        ],
        contractForm: [{ required: true, message: "请选择合同形式" }],
        status: [{ validator: statusValidator }]
      }
    };
  },
  computed: {
    metacilTypeIdArr: {
      get() {
        if (this.data.metacilTypeIds != "") {
          return this.data.metacilTypeIds.split(",").map(Number);
        } else {
          return [];
        }
      },
      set(val) {
        this.data.metacilTypeIds = val.join(",");
      }
    }
  },
  mounted() {},
  methods: {
    initDialog() {
      metacilTypeApi.getMetacilTypeList().then(res => {
        this.metacilTypes = res.data;
      });
    },
    onBeforeSave() {
      let implementItems = this.$refs.implementItemList.data;
      this.data.contractImplementItems = implementItems.map(item => {
        let temp = {
          ...item,
          contractId: this.data.id
        };
        return temp;
      });
      let receiptItems = this.$refs.receiptItemList.data;
      this.data.contractReceiptItems = receiptItems.map(item => {
        let temp = {
          ...item,
          contractId: this.data.id
        };
        return temp;
      });
      return true;
    },
    onEditOpened(data) {
      // console.log(data);
      this.$refs.implementItemList.setData(data.contractImplementItems);
      this.$refs.receiptItemList.setData(data.contractReceiptItems);
    },
    //刷新关联表
    onSaved() {
      this.reload();
    },
    onClosed() {
      console.log("close");
      this.$refs.implementItemList.clear();
      this.$refs.receiptItemList.clear();
    },
    openCustomerDialog() {
      this.$refs.customerDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setCustomer(customer) {
      this.data.customerId = customer.id;
      this.data.customerName = customer.name;
      this.data.customerPhone = customer.phone;
      this.data.customerAddress = customer.address;
      this.data.customerContact = customer.contact;
      this.data.customerTypeId = customer.customerTypeId;
      this.$refs.customerDialog.close();
    },
    openBusinessDialog() {
      this.$refs.businessDialog.open().then(that => {
        that.getData({
          status: 1,
          sign: false
        });
      });
    },
    setBusiness(business) {
      this.data.businessId = business.id;
      this.data.projectName = business.projectName;
      this.data.businessType = business.businessType;
      this.data.customerId = business.customerId;
      this.data.customerName = business.customerName;
      this.data.customerPhone = business.customerPhone;
      this.data.customerAddress = business.customerAddress;
      this.data.customerContact = business.customerContact;
      this.data.customerTypeId = business.customerTypeId;
      this.$refs.businessDialog.close();
    }
  }
};
</script>