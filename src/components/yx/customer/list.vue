<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="客户档案"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="客户名称">
            <el-input v-model.trim="queryParams.name" clearable placeholder="填写客户名称"></el-input>
          </el-form-item>
          <el-form-item label="电    话">
            <el-input v-model.trim="queryParams.phone" clearable placeholder="填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="地    址">
            <el-input v-model.trim="queryParams.address" clearable placeholder="填写客户地址"></el-input>
          </el-form-item>
          <el-form-item label="客户类型" style="text-align:center;">
            <customer-type v-model="queryParams.customerTypeId" />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="客户性质">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="建档客户" :value="0"></el-option>
              <el-option label="正式客户" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-select
              v-model="queryParams.customerSource"
              clearable
              @click.native="changeSource()"
            >
              <el-option label="网络推广" :value="0"></el-option>
              <el-option label="老客户介绍" :value="1"></el-option>
              <el-option label="内部人员" :value="2"></el-option>
              <el-option label="自增" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体来源">
            <select-input
              ref="insiderSelectInput"
              v-model="queryParams.insiderId"
              placeholder="点击选择内部人员"
              @click="openEmployeeDialog()"
              v-if="queryParams.customerSource == 2"
            />
            <el-input
              v-model.trim="queryParams.specificSource"
              clearable
              v-else
              placeholder="填写具体来源"
            ></el-input>
          </el-form-item>
        </div>
        <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
      </template>
      <template slot="column">
        <el-table-column prop="name" label="客户名称" width="150" show-overflow-tooltip />
        <el-table-column prop="customerTypeName" label="客户类型" width="150" show-overflow-tooltip />
        <el-table-column prop="contact" label="联系人" width="150" show-overflow-tooltip />
        <el-table-column prop="phone" label="电话" width="150" show-overflow-tooltip />
        <el-table-column prop="address" label="地址" width="150" show-overflow-tooltip />
        <el-table-column label="客户来源" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-col v-if="row.customerSource == 0">网络推广</el-col>
            <el-col v-else-if="row.customerSource == 1">老客户介绍</el-col>
            <el-col v-else-if="row.customerSource == 2">内部人员</el-col>
            <el-col v-else>自增</el-col>
          </template>
        </el-table-column>
        <el-table-column label="具体来源" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-col v-if="row.customerSource == 2">{{row.insiderName}}</el-col>
            <el-col v-else>{{row.specificSource}}</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="客户性质" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-col v-if="row.status == 0">建档客户</el-col>
            <el-col v-else>正式客户</el-col>
          </template>
        </el-table-column>
        <slot name="table"></slot>
        <slot name="column"></slot>
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";

import customerType from "@/components/sys/baseData/customerType/select";
import employeeDialog from "@/components/hr/employee/listDialog";

export default {
  mixins: [listMixin],
  components: {
    list,
    customerType,
    employeeDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        phone: "",
        address: "",
        customerSource: null,
        customerTypeId: "",
        insiderId: null,
        specificSource: "",
        status: ""
      },
      api: require("@/api/yx/customer").default
    };
  },
  methods: {
    changeSource() {
      this.queryParams.insiderId = null;
      this.queryParams.specificSource = null;
    },
    openEmployeeDialog() {
      this.$refs.employeeDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setEmployee(employee) {
      this.queryParams.insiderId = employee.id;
      this.$refs.insiderSelectInput.setName(employee.name);
      this.$refs.employeeDialog.close();
    }
  }
};
</script>