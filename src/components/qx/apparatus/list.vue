<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="器械档案"
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
      <div slot="query">
        <div>
          <el-form-item label="器械类型">
            <el-input v-model.trim="queryParams.type" clearable></el-input>
          </el-form-item>
          <el-form-item label="器械名称">
            <el-input v-model.trim="queryParams.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="器械编号">
            <el-input v-model.trim="queryParams.no" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="在库" :value="1"></el-option>
              <el-option label="领用" :value="2"></el-option>
              <el-option label="报废" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="购入日期">
          <el-date-picker
            v-model.trim="queryParams.buyDateBegin"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            v-model.trim="queryParams.buyDateEnd"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="type" label="器械类型" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="name" label="器械名称" min-width="180" show-overflow-tooltip />
        <el-table-column prop="no" label="器械编号" width="180" show-overflow-tooltip />
        <el-table-column prop="statusName" label="状态" width="100" show-overflow-tooltip />
        <el-table-column label="领用人" width="120" align="center">
          <template v-slot="{row}">
            <span v-if="row.useEmployeeName">{{row.useEmployeeName}} / {{row.useDepName}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="buyTime" width="140" label="购入时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.buyTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>        
        <!-- slot[column] -->
        <slot name="table"></slot>
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";

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
        type: "",
        name: "",
        status: "",
        buyDateBegin: "",
        buyDateEnd: ""
      },
      api: require("@/api/qx/apparatus").default
    };
  },
  methods: {}
};
</script>