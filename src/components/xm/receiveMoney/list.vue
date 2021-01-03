<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="质量监督记录"
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
      <template slot="toolbar-right">
        <slot name="toolbar-right"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="客户名称">
            <el-input v-model.trim="queryParams.customerName" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model.trim="queryParams.projectName" clearable></el-input>
          </el-form-item>
          <el-form-item label="款项类别">
            <el-input v-model.trim="queryParams.type" clearable></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="收款时间">
            <el-date-picker
              v-model.trim="queryParams.receiveDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.receiveDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="收款金额">
            <el-input v-model="queryParams.receiveMoneyBegin" clearable placeholder="最小值"></el-input>
          </el-form-item>
          <el-form-item label="至">
            <el-input v-model="queryParams.receiveMoneyEnd" clearable placeholder="最大值"></el-input>
          </el-form-item>
        </div>
      </template>
      <template slot="table">
        <el-table-column prop="customerName" label="客户名称" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="projectName" min-width="150" label="项目名称" show-overflow-tooltip />
        <el-table-column prop="moneyTypeName" width="100" label="款项类别" show-overflow-tooltip />
        <el-table-column
          prop="receiveMoney"
          width="140"
          sortable="custom"
          label="收款金额"
          align="right"
        >
          <template slot-scope="{row}">￥{{row.receiveMoney}}</template>
        </el-table-column>
        <el-table-column prop="receiveTime" width="140" sortable="custom" label="收款时间">
          <template slot-scope="{row}">{{row.receiveTime|toShortDatetimeString}}</template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xm/receiveMoney";
export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        receiveDateBegin: "",
        receiveDateEnd: "",
        receiveMoneyBegin: "",
        receiveMoneyEnd: ""
      },
      api
    };
  },
  methods: {
    openDetails(row) {
      this.$refs.employeeDetails.openDetailsById(row.id);
    }
  }
};
</script>