<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="勘察调配管理"
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
            <el-input v-model.trim="queryParams.customerName" clearable placeholder="填写客户名称"></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input v-model.trim="queryParams.customerPhone" clearable placeholder="填写客户电话"></el-input>
          </el-form-item>
          <el-form-item label="服务地址" label-width="100px">
            <el-input v-model.trim="queryParams.customerAddress" clearable placeholder="填写服务地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model.trim="queryParams.customerContact" clearable placeholder="填写联系人"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="客户类型">
            <customer-type v-model="queryParams.customerTypeId"></customer-type>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="queryParams.businessType" clearable>
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需完成勘察时间" label-width="100px">
            <el-date-picker
              v-model.trim="queryParams.finishDate"
              placeholder="填选择时间"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="待执行" :value="1"></el-option>
              <el-option label="待审核" :value="2"></el-option>
              <el-option label="已审核" :value="3"></el-option>
              <el-option label="退回" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="灭害种类">
            <el-select
              v-model="queryParams.metacilTypeIds"
              multiple
              placeholder="请选择灭害种类（可多选）"
              style="width:610px;"
              class="c-remove-max-width"
              :clearable="true"
            >
              <el-option
                v-for="item in metacilTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </template>
      <template slot="column">
        <el-table-column prop="businessCustomerName" label="客户名称" min-width="150" />
        <el-table-column prop="businessCustomerTypeName" label="客户类型" min-width="150" />
        <el-table-column prop="businessCustomerContact" label="联系人" min-width="150" />
        <el-table-column prop="businessCustomerPhone" label="电话" min-width="150" />
        <el-table-column
          prop="businessCustomerAddress"
          label="服务地址"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column prop="businessType" label="业务类型" min-width="100">
          <template slot-scope="{row}">
            <el-col v-if="row.businessType == 0">普通项目</el-col>
            <el-col v-else>应急项目</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="businessMetacilTypeName" label="灭害种类" min-width="150" />
        <el-table-column prop="businessProjectName" label="项目名称" min-width="150" />
        <el-table-column prop="status" label="状态" min-width="150">
          <template slot-scope="{row}">
            <el-tag v-if="row.status == 0">待分派</el-tag>
            <el-tag v-else-if="row.status == 1">待执行</el-tag>
            <el-tag v-else-if="row.status == 2">待审核</el-tag>
            <el-tag v-else-if="row.status == 3" type="success">已审核</el-tag>
            <el-tag v-else type="danger">退回</el-tag>
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
import metacilTypeApi from "@/api/sys/baseData";

import customerType from "@/components/sys/baseData/customerType/select";

export default {
  mixins: [listMixin],
  components: {
    list,
    customerType
  },
  props: {},
  data() {
    return {
      queryParams: {
        isDeploy: false,
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        customerContact: "",
        customerTypeId: null,
        metacilTypeIds: [],
        businessType: null,
        finishDate: null,
        status: 1
      },
      metacilTypes: [],
      api: require("@/api/yx/prospectDeploy").default
    };
  },
  created() {
    metacilTypeApi.getMetacilTypeList().then(res => {
      this.metacilTypes = res.data;
    });
  },
  methods: {}
};
</script>