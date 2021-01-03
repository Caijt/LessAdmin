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
            <el-input v-model.trim="queryParams.customerName" clearable placeholder="填写客户名称"></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input v-model.trim="queryParams.customerPhone" clearable placeholder="填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="服务地址">
            <el-input v-model.trim="queryParams.customerAddress" clearable placeholder="填写客户地址"></el-input>
          </el-form-item>
          <el-form-item label="业务来源">
            <business-source v-model="queryParams.businessSourceId" />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="客户类型">
            <customer-type v-model="queryParams.customerTypeId" />
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="queryParams.businessType" clearable>
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内部人员">
            <select-input
              ref="insiderSelectInput"
              v-model="queryParams.insiderId"
              placeholder="点击选择内部人员"
              @click="openEmployeeDialog()"
            />
          </el-form-item>
          <el-form-item label="状　　态">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="达成" :value="1"></el-option>
              <el-option label="跟进" :value="2"></el-option>
              <el-option label="失败" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="灭害种类">
            <el-select
              v-model="queryParams.metacilTypeIds"
              multiple
              placeholder="请选择灭害种类（可多选）"
              style="width:580px;"
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
        <employee-dialog ref="employeeDialog" in-dialog select @select="setEmployee"></employee-dialog>
      </template>
      <template slot="column">
        <el-table-column prop="customerName" label="客户名称" width="100" show-overflow-tooltip />
        <el-table-column prop="customerTypeName" label="客户类型" width="100" />
        <el-table-column prop="customerContact" label="联系人" width="100" show-overflow-tooltip />
        <el-table-column prop="customerPhone" label="电话" width="100" show-overflow-tooltip />
        <el-table-column prop="customerAddress" label="服务地址" width="150" show-overflow-tooltip />
        <el-table-column prop="businessType" label="业务类型" width="100">
          <template slot-scope="{row}">
            <el-col v-if="row.businessType == 0">普通项目</el-col>
            <el-col v-else>应急项目</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="metacilTypeName" label="灭害种类" width="100" />
        <el-table-column prop="projectName" label="项目名称" width="150" show-overflow-tooltip />
        <el-table-column prop="prospect" label="勘察" width="100">
          <template slot-scope="{row}">
            <el-col v-if="row.prospect">勘察</el-col>
            <el-col v-else>无需勘察</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="program" label="方案" width="100">
          <template slot-scope="{row}">
            <el-col v-if="row.program">方案</el-col>
            <el-col v-else>无需方案</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="businessSourceName" label="业务来源" width="100" />
        <el-table-column label="来源渠道" width="100">
          <template slot-scope="{row}">
            <el-col v-if="row.channel == 0">网络推广</el-col>
            <el-col v-else-if="row.channel == 1">老客户介绍</el-col>
            <el-col v-else-if="row.channel == 2">内部人员</el-col>
            <el-col v-else>自增</el-col>
          </template>
        </el-table-column>
        <el-table-column label="具体来源" width="200" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-col v-if="row.channel == 2">{{row.insiderName}}</el-col>
            <el-col v-else>{{row.specificSource}}</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="salesmanName" label="业务人员" width="150" />
        <el-table-column prop="createTime" label="登记时间" width="150" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="{row}">
            <el-col v-if="row.status==0">失败</el-col>
            <el-col v-else-if="row.status==1">达成</el-col>
            <el-col v-else>继续跟进</el-col>
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
import employeeDialog from "@/components/hr/employee/listDialog";
import businessSource from "@/components/sys/baseData/businessSource/select";

export default {
  mixins: [listMixin],
  components: {
    list,
    customerType,
    employeeDialog,
    businessSource
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        customerTypeId: null,
        metacilTypeIds: [],
        businessType: null,
        businessSourceId: null,
        status: 2,
        insiderId: null
      },
      metacilTypes: [],
      api: require("@/api/yx/business").default
    };
  },
  created() {
    metacilTypeApi.getMetacilTypeList().then(res => {
      this.metacilTypes = res.data;
    });
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