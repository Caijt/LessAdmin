<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="工资账套"
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
        <el-form-item label="类型">
          <el-input v-model.trim="queryParams.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="发放月份">
          <el-date-picker
            v-model.trim="queryParams.date"
            type="month"
            value-format="yyyy-MM"
            clearable
          ></el-date-picker>
        </el-form-item>
      </template>
      <template slot="column">
        <el-table-column prop="type" label="工资类型" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="date" label="发放月份" sortable="custom" min-width="100">
          <template slot-scope="{row}">{{$commonJs.toDateStringByFormat(row.date,"YYYY-MM")}}</template>
        </el-table-column>
        <el-table-column prop="amount" width="100" label="发放人数" sortable="custom" align="center" />
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/wage";

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
        date: ""
      },
      api
    };
  },
  methods: {}
};
</script>